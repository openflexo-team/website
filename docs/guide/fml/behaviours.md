---
sidebar_position: 5
title: Behaviours
description: How behaviours are declared, called and overloaded, how instances are created and deleted, and how a model reacts to events.
---

# Behaviours

A behaviour is what an instance can do: a name, arguments, an optional return type and a body.
Behaviours are declared in a model or in a concept. The examples use a model `Talker` and, for
creation and events, the `Library` model of the previous pages.

## Declaring a behaviour

```
public String greet() {
	return "hello";
}

public String greet(String who) {
	return "hello " + parameters.who;
}

public remember(String text) {
	last = parameters.text;
}
```

A behaviour may start with a visibility, then a **return type**, then its name and its arguments.
`remember` has no return type: it acts on the instance and gives nothing back. A script calls a
behaviour on an instance:

```
assert talker.greet() == "hello";
assert talker.greet("Ann") == "hello Ann";
talker.remember("x");
assert talker.last == "x";
```

Two behaviours may have the same name when their arguments differ, as the two `greet` do.

## Parameters

A behaviour reads its arguments through `parameters`: `parameters.who`. There can be several, of
any type:

```
public int add(int a, int b) {
	return parameters.a + parameters.b;
}
```

```
assert talker.add(2, 3) == 5;
```

A bare parameter name, `who` instead of `parameters.who`, is not an error: it gives `null`.

## Conditions and recursion

The body may hold conditions and `return` statements, and a behaviour may call itself:

```
public int fact(int n) {
	if (parameters.n <= 1) {
		return 1;
	}
	return parameters.n * this.fact(parameters.n - 1);
}

public String pick(int n) {
	if (parameters.n > 0) {
		return "positive";
	}
	else {
		return "not positive";
	}
}
```

```
assert talker.pick(2) == "positive";
assert talker.pick(0) == "not positive";
assert talker.fact(5) == 120;
```

## Calling a behaviour from a behaviour

**A behaviour of the same instance is called on `this`.** A bare call does not resolve, and gives
`null` without an error:

```
public String twin() {
	return "twin";
}

public String bareCall() {
	return twin();
}

public String thisCall() {
	return this.twin();
}
```

```
assert pen.thisCall() == "twin";
assert pen.bareCall() == null;
```

This is the same rule as for `parameters`, and it also applies inside a model: a behaviour of the
model calls another one of the model with `this.chorus()`, not `chorus()`.

## Creating instances

A `create` behaviour, a **creation scheme**, runs when an instance is created with `new`. Inside a
behaviour of a model, `new Shelf(…)` creates an instance of the concept `Shelf` in the model
instance.

Inside a behaviour of a concept, `new` creates a concept **nested in that concept**, inside the
current instance: `Shelf.newBook` creates a `Book`, declared in `Shelf`. A concept declared
elsewhere, at the model level for instance, is created with `container.new`, and a bare `new` gives
`null`:

```
public Tool bareTool(String name) {
	return new Tool(parameters.name);
}

public Tool containerTool(String name) {
	return container.new Tool(parameters.name);
}

public Slot newSlot(String code) {
	return new Slot(parameters.code);
}
```

```
assert bin.bareTool("saw") == null;
hammer = bin.containerTool("hammer");
assert hammer.container == depot;
```

Here `Bin` declares `Slot` and the model declares `Tool`, and `bin.newSlot("s1")` returns a `Slot`
contained in `bin`.

A concept may have several creation schemes. At most one is anonymous; the others are named, with
`create::name`, and are chosen by the name in the `new`:

```
create(required String label, int capacity=10) {
	label = parameters.label;
	capacity = parameters.capacity;
}

create::withDefaultCapacity(String label) {
	label = parameters.label;
	capacity = 10;
}
```

```
public Shelf newShelf(String label) {
	Shelf shelf = new Shelf(parameters.label, 20);
	fire new ShelfCreated(parameters.label);
	return shelf;
}

public Shelf newSmallShelf(String label) {
	return new Shelf::withDefaultCapacity(parameters.label);
}
```

A parameter may declare a default value, as `capacity=10` does, but a call must still give every
argument: `new Shelf(parameters.label)` does not resolve. When a shorter call is wanted, declare a
named creation scheme, as `withDefaultCapacity` does.

A creation scheme reaches the one of its parent concept with `super(…)`, or `super.name(…)` for a
named one (see [Declaring models and concepts](/docs/guide/fml/declaring-models-and-concepts)).

A model is instantiated from a script with `new`, and given its name with `with`:

```
talker = new Talker() with (name="talker");
```

## Deleting instances

The `delete` instruction deletes an instance. It runs the `delete` behaviour of its concept, if it
has one:

```
public removeNote(Note note) {
	delete parameters.note;
}

public concept Note {

	String text;

	create(String text) {
		text = parameters.text;
	}

	delete() {
		container.last = "note deleted";
	}
}
```

```
note = talker.addNote("milk");
talker.removeNote(note);
assert talker.last == "note deleted";
```

Deleting an instance does not remove it from the properties that hold it: take it out of them
first, as `Shelf.removeBook` does with `books.remove(parameters.book)`.

## Reacting to events

A behaviour can be triggered by an **event** instead of being called. An event is declared with
`event`, has properties and a creation scheme like a concept, and is raised with `fire`. A
`listen` behaviour runs when an event of that type is fired by the source it names:

```
public Shelf newShelf(String label) {
	Shelf shelf = new Shelf(parameters.label, 20);
	fire new ShelfCreated(parameters.label);
	return shelf;
}

listen ShelfCreated from this {
	lastCreatedShelf = evt.label;
}

event ShelfCreated {
	String label;
	create(String label) {
		label = parameters.label;
	}
}
```

```
fiction = library.newShelf("Fiction");
assert library.lastCreatedShelf == "Fiction";
```

Inside a `listen`, `evt` is the event that was fired.

## Behaviours offered by technology adapters

A behaviour can also be declared with `with` and a kind offered by a technology adapter:
`name(arguments) with Kind(parameters) { … }`. Such behaviours are how a model hooks into what
happens in a federated resource, for instance when an element is added to it. What each adapter
offers is described with the [technology adapters](/docs/guide/concepts/technology-adapters).

## What you have seen

A behaviour has a name, arguments read through `parameters`, and a body; two behaviours can share a
name when their arguments differ. Behaviours of the same instance are called on `this`. Creation and
deletion are behaviours too, `create` and `delete`, and a model reacts to events with `listen`.
Four silent traps to keep in mind: a bare parameter name, a bare call of a behaviour, a `new` of a
concept that is not nested in the current one, and a creation call that omits an argument with a
default value.

The models and scripts on this page (`Talker.fml`, `NameLookup.fml`, `Depot.fml` and `Library.fml`) are tests of the
platform, in the `openflexo-core` repository.
