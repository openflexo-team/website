---
sidebar_position: 10
title: Annotations
description: How annotations are written and kept, which ones the platform interprets, and how a technology adapter defines its own.
---

# Annotations

An annotation attaches information to a declaration without changing its behaviour: the address of
a model, the label of a parameter, the table a concept is stored in. Annotations are written before
the element they describe, and they are how FML carries everything that is not structure.

## Four shapes

An annotation is `@` and a name, followed by nothing, a value, named values, or other annotations:

```
@Marker
@Note("hello")
@Owner(name="Ann", team="core")
@Groups(
	@Member("a")
	@Member("b")
)
```

- `@Marker` is a **flag**: it says something by being there.
- `@Note("hello")` has a **value**.
- `@Owner(name="Ann", team="core")` has **named values**.
- `@Groups(…)` contains **annotations**, which is how a group of related annotations is written.

A value is an expression: a string, a number, or a path such as `name`.

## Where they go

Annotations go before a model, a concept, an event, a property or a behaviour:

```
@URI("http://openflexo.org/test/TestResourceCenter/Tagged.fml")
@Version("2")
@Marker
@Note("hello")
@Owner(name="Ann", team="core")
@Groups(
	@Member("a")
	@Member("b")
)
public model Tagged {
```

```
@Renderer(name + "!")
public concept Card {

	@Hint("on a property")
	String name;

	create(String name) {
		name = parameters.name;
	}

	@Hint("on a behaviour")
	public String greet() {
		return "hi";
	}
}
```

## Kept, whatever the name

The platform keeps every annotation it reads on the element it precedes, and writes it back as it
was written, whether it knows the name or not. Here `@Marker`, `@Note`, `@Owner`, `@Groups`, `@Member`
and `@Hint` mean nothing to the platform, and are all kept:

```
assert virtualModel.hasMetaData("Marker");
assert virtualModel.hasMetaData("Note");
assert virtualModel.hasMetaData("Owner");
assert virtualModel.hasMetaData("Groups");
assert virtualModel.hasMetaData("Nope") == false;
card = virtualModel.getFlexoConcept("Card");
assert card.hasMetaData("Renderer");
assert card.getDeclaredProperty("name").hasMetaData("Hint");
```

This makes annotations a way to carry your own information: a tool that reads the model can look for
its annotations. The other side is that **a misspelled annotation is not an error**: `@Discription`
is kept like any other, and does nothing.

## Annotations the platform reads

| Annotation | On | What it does |
|---|---|---|
| `@URI("…")` | a model | gives the address of the model |
| `@Version("…")` | a model | gives its version |
| `@Description("…")` | a model | a short text |
| `@Renderer(expression)` | a concept | gives the string representation of its instances |
| `@UI(…)` | a behaviour | describes how the application asks for its arguments |

**`@URI`, `@Version` and `@Description`.** They are read back when the model is loaded. A version is
normalised: `@Version("2")` gives the version `2.0`.

```
assert virtualModel.version.toString() == "2.0";
```

**`@Renderer`.** The expression is evaluated on each instance of the concept to give its string
representation, the text obtained when the instance is concatenated to a string. It follows the
properties it reads, and it applies to the concepts that extend the concept:

```
first = "" + c1;
assert first == "x!";
c1.name = "y";
second = "" + c1;
assert second == "y!";
```

```
public concept Gold extends Card {

	create(String name) {
		super(parameters.name);
	}
}
```

```
g1 = tagged.newGold("z");
third = "" + g1;
assert third == "z!";
```

**`@UI`.** It holds one annotation per argument of a behaviour, to choose the widget the application
uses in the dialog that asks for the arguments. `value` names the argument and `label` gives the
label of the widget:

```
@UI(
	@TextField(value="title", label="book_title")
)
public Book newBook(required String title) {
```

The dialog exists only in the application: the examples of this guide check that the annotation is
loaded, not the dialog.

## Annotations of a technology adapter

A technology adapter defines annotations for its own needs. The JDBC adapter maps the concepts of a
model onto a relational schema with `@Table` on a concept and `@Property` on its properties:

```
@Table("CLIENT")
public concept Client {
   @Property(column="ID", id="true")
   int id;
   @Property(column="NAME")
   String name;
   @Property(column="SALESMAN", fk="ID")
   Salesman salesman with ConceptInstance();
}
```

`@Table` names the table, and `@Property` gives the column (`column`), marks the identifier (`id`)
and describes a reference to another table (`fk`, or `mappedBy` for the other side). The adapters
document their own annotations. The model above is loaded by the tests of the JDBC adapter, in the
`openflexo-jdbc` repository.

## What you have seen

An annotation is `@Name`, `@Name(value)`, `@Name(key=value, …)` or `@Name(other annotations)`, placed
before a model, a concept, a property or a behaviour. The platform keeps every one and prints it back;
it interprets `@URI`, `@Version`, `@Description`, `@Renderer` and `@UI`, and the technology adapters
interpret theirs. Nothing checks the name of an annotation, so a misspelling passes silently.

The model and script (`Tagged.fml` and `TestTagged.fmlscript`, and `Library.fml` for `@UI`) are tests
of the platform, in the `openflexo-core` repository.
