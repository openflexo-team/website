---
sidebar_position: 2
title: Language tour
description: How an FML file is laid out, how it refers to other models and to types, and how a name is resolved inside a behaviour.
---

# Language tour

[FML in ten minutes](/docs/guide/fml/fml-in-ten-minutes) read one model. This page looks at what
surrounds a model and at the rules the language follows to give a name its meaning: where the file
lives, what it may declare before the model, how it reaches other models, which types it can use,
and how a name is resolved inside a behaviour.

## Files and addresses

An FML resource is a **directory** named after the model, with the extension `.fml`, that holds a
file with the same name: the model `People` is stored in `People.fml/People.fml`. A file is a
*compilation unit*, and holds exactly one top-level model.

A model can contain other models. A contained model is stored inside the directory of its
container, and its address is computed from the container's: the model `Catalog` contained in
`Library` is stored in `Library.fml/Catalog.fml/Catalog.fml` and has the address
`http://openflexo.org/test/TestResourceCenter/Library.fml/Catalog.fml` when `Library` has the
address `http://openflexo.org/test/TestResourceCenter/Library.fml`. The examples of this guide give
the address of their top-level model with `@URI(…)`.

## What comes before the model

A compilation unit is made of four parts, always in this order:

1. **namespace declarations**, `namespace "…" as NS;`
2. **use declarations**, `use <class> as ID;`
3. **imports**, `import …;`
4. **the model**, `model Name { … }`

Each of the first three may be absent or repeated. A `use`
declaration gives a short identifier to the model slot type of a technology adapter, as in
`use org.openflexo.foundation.fml.rt.FMLRTModelSlot as FMLRT;`; the identifier then prefixes what
that adapter brings to the model.

## Namespaces

A namespace gives a short name to the beginning of an address, so that the address of another
model is not repeated in full:

```
namespace "http://openflexo.org/test/TestResourceCenter/" as TRC;

import [TRC+"People.fml"];
```

The alias is used in the `import` declaration, where it is concatenated with `+` to the end of the
address. The rest of this page uses it.

## Imports

An `import` puts something in reach of the unit. There are two forms you will use everywhere:

| Import | Meaning |
|---|---|
| `import java.util.List;` | a Java type |
| `import ["http://…/People.fml"];` | the concepts of the FML model at that address |

The grammar also accepts named forms (`import java.util.List as name;` and
`import <Type> name from [uri];`).

Here is a model `People`, with one concept:

```
@URI("http://openflexo.org/test/TestResourceCenter/People.fml")
public model People {

	public Person newPerson(String name) {
		return new Person(parameters.name);
	}

	public concept Person {

		String name;

		create(String name) {
			name = parameters.name;
		}
	}
}
```

and a model `Reception`, which uses `Person` as the type of one of its properties:

```
namespace "http://openflexo.org/test/TestResourceCenter/" as TRC;

import [TRC+"People.fml"];

@URI("http://openflexo.org/test/TestResourceCenter/Reception.fml")
public model Reception {

	Person guest;

	public String guestName() {
		return guest.name;
	}
}
```

The property `guest` has the type `Person`, so a path such as `guest.name` can go through it. Here is
what a script observes:

```
directory = new People() with (name="directory");
ann = directory.newPerson("Ann");

desk = new Reception() with (name="desk");
desk.guest = ann;
assert desk.guestName() == "Ann";
```

### A missing import gives null

Remove the `import` line from `Reception`, and keep everything else: the model still loads and the
script runs to the end, with no error. But `Person` is no longer a type the unit knows, so the
path `guest.name` gives nothing:

```
oldDesk = new ReceptionWithoutImport() with (name="oldDesk");
oldDesk.guest = ann;
assert oldDesk.guestName() == null;
```

When a path that should give a value gives `null`, check that the unit imports the model that
declares the concepts on the path.

## The typing space

The types a unit can name form its **typing space**. It is made of:

- the primitive types (`int`, `boolean`, `float`…), and `String`;
- the Java types, imported with `import`, generic ones included (`List<Task>`);
- the concepts of the unit itself, nested ones included: they are named by their simple name from
  anywhere in the unit (for example, in the platform's test model `Library`, a concept declared at the
  model level has a property typed `Book`, a concept nested in `Shelf`);
- the concepts of the models the unit imports;
- the types brought by the technology adapters the unit uses: a spreadsheet cell, an XML element,
  an EMF class…

The last item is what lets a path go through an external resource: `guest.name` above and a path
into a spreadsheet are resolved by the same rules, each step being looked up in the type of the
previous one.

![FML typing](/img/architecture/12-fml-typing.png)

A bare type name is resolved in this order, and the first match wins: a concept declared in the
compilation unit, then the class brought by a model slot the unit uses, then a keyword or a
`typedef`, then a plain Java type.

## How a name is resolved

Inside a behaviour, a bare name such as `name` is looked up outward: first among the local
variables, then the properties of the concept, then the properties of the model that contains it.
Three qualified forms reach a specific scope. The model below has a `label` in the model and another
in its concept, so it exercises each rule:

```
public model NameLookup {

	String owner;
	String label;

	create() {
		owner = "Ann";
		label = "of the model";
	}

	public Item addItem(String name) {
		return new Item(parameters.name);
	}

	public concept Item {

		String name;
		String label;

		create(String name) {
			name = parameters.name;
			label = "of the item";
		}

		// …the behaviours of the table below
	}
}
```

| In a behaviour of `Item`, with an item named `Pen` | Gives |
|---|---|
| `return name;` | `"Pen"`, the property of the concept |
| `return this.name;` | `"Pen"`, the same property, explicitly |
| `return owner;` | `"Ann"`, the property of the model that contains the item |
| `return container.label;` | `"of the model"`, through the container |
| `return label;` | `"of the item"`: the property of the concept wins over that of the model |
| `String name = "local"; return name;` | `"local"`: a local variable hides the property |
| `String name = "local"; return name + "/" + this.name;` | `"local/Pen"`: `this` still reaches the property |
| `parameter(String name)`: `return parameters.name + "/" + this.name;` | `"Arg/Pen"` when called with `"Arg"` |
| `bareParameter(String other)`: `return other;` | `null`: a parameter is not read by its bare name |
| `return twin();`, where `twin()` is another behaviour of `Item` | `null`: a behaviour is called on `this`, as `this.twin()`, which gives `"twin"` |

The last two lines are the ones to remember: a parameter must be read as `parameters.other`, and a
behaviour of the same instance called on `this`. A bare parameter name, or a bare call, is not an
error: it gives `null`.

## What you have seen

A file holds one model, preceded by namespaces, `use` declarations and imports. Imports are what puts
other models in the typing space, and a missing one gives `null` with no error. Inside a behaviour,
names are looked up from the innermost scope outward, and parameters are read through `parameters`.

The models and scripts on this page are tests of the platform, in the `openflexo-core` repository.
