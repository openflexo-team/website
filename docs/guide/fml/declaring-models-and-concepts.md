---
sidebar_position: 3
title: Declaring models and concepts
description: The declaration of a virtual model and of its concepts, nested or contained, abstract, and related by inheritance.
---

# Declaring models and concepts

This page is about the declarations themselves: how a virtual model and its concepts are written,
how they are nested, and how one concept builds on another. The properties and behaviours inside a
concept are the subject of the next two pages.

## A virtual model

```
@URI("http://openflexo.org/test/TestResourceCenter/Kennel.fml")
@Version("1.0")
@Description("A kennel")
public model Kennel {
	// concepts, properties, behaviours
}
```

The **annotations** before the declaration describe the model: `@URI` gives its address,
`@Version` its version, `@Description` a short text. Once the model is loaded they are read back:

```
virtualModel = load -r ["http://openflexo.org/test/TestResourceCenter/Kennel.fml"];
assert virtualModel.version.toString() == "1.0";
assert virtualModel.description == "A kennel";
```

A visibility (`public`) may precede `model`, and so may `abstract`.

## Concepts, nested and contained

A concept is declared with `concept`, inside a virtual model or inside another concept. Nesting is
containment: an instance of the inner concept lives inside an instance of the outer one, and the
address of the inner concept has the outer one's name in it, as in `…/Library.fml#Shelf#Book` for
the concept `Book` declared in `Shelf` (see [Virtual models and
concepts](/docs/guide/concepts/virtual-models-and-concepts)).

A **virtual model can also be contained in another**. It is then stored in the directory of its
container and does not need an `@URI`: its address is computed from the container's. The model
`Library` has a contained model `Catalog`:

```
public model Catalog {

	create() {
	}

	public concept Entry {

		String reference;

		create(String reference) {
			reference = parameters.reference;
		}

		delete() {
		}
	}
}
```

The container declares a property typed with the contained model and creates it from one of its
behaviours, like a concept:

```
Catalog catalog;

public Catalog createCatalog() {
	catalog = new Catalog() with (name="catalog");
	return catalog;
}
```

```
libraryCatalog = library.createCatalog();
assert libraryCatalog.containerVirtualModelInstance == library;
assert library.catalog == libraryCatalog;
```

## Abstract concepts and abstract behaviours

`abstract` makes a concept a description to complete. A concept may also declare an **abstract
behaviour**: a signature followed by `;` instead of a body. Each concept that extends it gives the
body, and a call goes to the body of the concept of the instance:

```
public abstract concept Creature {

	String name;

	create(String name) {
		name = parameters.name;
	}

	abstract String sound();

	public String describe() {
		return name + " says " + this.sound();
	}
}
```

```
public concept Dog extends Creature {

	create(String name) {
		super(parameters.name);
	}

	public String sound() {
		return "Woof";
	}
}

public concept Cat extends Creature {

	create(String name) {
		super(parameters.name);
	}

	public String sound() {
		return "Meow";
	}
}
```

```
assert rex.describe() == "Rex says Woof";
assert tom.describe() == "Tom says Meow";
```

`describe()` is written once, in `Creature`, and calls `this.sound()`: the body it runs depends on
the instance. The same holds for a query on the parent concept, which returns the instances of every
concept that extends it, each answering with its own `sound()`:

```
public String chorus() {
	String all = "";
	for (Creature c : select Creature from this) {
		all = all + c.sound() + ";";
	}
	return all;
}
```

```
assert kennel.chorus() == "Woof;Meow;Woof;Alert Woof;";
```

## Inheritance

`extends` names the concept to build on. An extending concept has the properties and behaviours of
its parent, and may **override** a behaviour by declaring one with the same signature. Inheritance
chains: `Guard` extends `Dog`, which extends `Creature`.

Two ways to reach the parent:

- in a creation behaviour, `super(…)` runs the creation behaviour of the parent, as in `Dog` above;
- in any other behaviour, `super.<name>(…)` calls the parent's version:

```
public concept Guard extends Dog {

	create(String name) {
		super(parameters.name);
	}

	public String sound() {
		return "Alert " + super.sound();
	}
}
```

```
assert rin.sound() == "Alert Woof";
assert rin.describe() == "Rin says Alert Woof";
```

The two spellings are not interchangeable when the parent's creation behaviour is **named**
(`create::init(…)`): `super(…)` reaches only an anonymous one, and the named one is reached with
`super.init(…)`.

```
public concept NamedBase {
	String label;
	create::init(String label) {
		label = parameters.label;
	}
	delete() {
	}
}

public concept NamedDerived extends NamedBase {
	create(String label) {
		super.init(parameters.label);
	}
	delete() {
	}
}
```

A concept can extend **several concepts**, and it has the properties of all of them:

```
public concept Trained {

	String trick;
}

public concept ServiceDog extends Dog, Trained {

	create(String name, String trick) {
		super(parameters.name);
		trick = parameters.trick;
	}
}
```

```
assert max.name == "Max";
assert max.trick == "sit";
```

:::caution
With several parents, `super.<name>()` gives `null` instead of the parent's result, and nothing
reports it. To reuse a parent's behaviour from a concept that has several parents, put the logic in
a separate behaviour of the parent and call it on `this`.
:::

## What you have seen

A model carries annotations (`@URI`, `@Version`, `@Description`). Concepts nest, and models can be
contained in models. `abstract` leaves a body to the concepts that extend it, and a call always runs
the body of the instance's concept. `super(…)` reaches a parent's creation, `super.name(…)` its
behaviours; a concept can have several parents, with the limit above.

The models and scripts on this page are tests of the platform, in the `openflexo-core` repository
(`Kennel.fml`, `Library.fml`, and `TestSuperCallToNamedScheme.fml`).
