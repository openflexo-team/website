---
sidebar_position: 1
title: Virtual models and concepts
description: What a virtual model, a concept, a property and a behaviour are, how they contain one another, and how they come to life at run time.
---

# Virtual models and concepts

A federation in Openflexo is described by a **virtual model**. This page explains what it is made of:
**concepts**, which have **properties** (what an instance knows) and **behaviours** (what it can
do), and how those descriptions become objects when the model runs. It uses the vocabulary of the
[FML language](/docs/guide/fml/); the examples are excerpts of a small library model, `Library`,
that the platform's automated tests load and run.

## Two levels: describing and running

Everything on this page exists at two levels.

- **The model level** is what you write in FML: virtual models and concepts. They are *types*.
- **The run-time level** is what exists when the model runs: **virtual model instances** and
  **concept instances**, created from the types. They hold the values.

The names follow each other: a virtual model has instances, a **concept** (formally a *flexo
concept*) has instances. And a virtual model *is* a concept: it can do everything a concept does,
and it is also the unit that groups concepts and that you instantiate to start using them. A
virtual model instance is, likewise, a concept instance.

If you know an object-oriented language, a concept plays the part of a class, its properties are the
attributes and its behaviours are the methods. Three things go beyond that: concepts *contain*
other concepts, properties can point at data that lives outside the model, and behaviours can react
to what happens in the resources a model federates.

## Containment

Every concept is declared inside a container: the virtual model, or another concept. At run time,
the instances follow the same nesting: an instance of a concept lives inside an instance of its
container.

In `Library`, the concept `Shelf` is declared in the virtual model, and the concepts `Book` and
`Novel` are declared in `Shelf`:

```
public model Library {
	// …
	public concept Shelf {
		// …
		public concept Book extends Publication {
			// …
		}

		public concept Novel extends Book {
			// …
		}
	}
}
```

The nesting shows in the address of a concept, `…/Library.fml#Shelf#Book`, and in the instances:
a book created by a shelf is contained in that shelf.

```
fiction = library.newShelf("Fiction");
emma = fiction.newBook("Emma");
assert emma.container == fiction;
```

## Properties

A property describes something an instance knows. `Shelf` declares five of the kinds a concept can
have:

```
public concept Shelf {

	String label;
	int capacity;
	Book[0,*] books;
	int bookCount values books.size;
	private String notes;

	String displayName {
		String get() {
			return "Shelf " + label;
		}
		set(String value) {
			label = value;
		}
	};
	// …
}
```

| Kind | Declaration | What it is |
|---|---|---|
| **Stored** | `String label;`, `int capacity;` | a value the instance holds, of a primitive or Java type |
| **Reference to concept instances** | `Book[0,*] books;` | instances of a concept; the cardinality tells how many, `[0,*]` meaning any number |
| **Computed** | `int bookCount values books.size;` | read-only, evaluated from an expression each time it is read |
| **Get and set** | `String displayName { … };` | a value computed by a `get()` and, optionally, changed by a `set(…)` |
| **Abstract** | `abstract String code;` | declared by a concept, given its value by the concepts that extend it |

A visibility keyword (`private`, `protected`, `public`) precedes the type; without one, the property
has the default visibility.

At run time these give, for a shelf `fiction` holding two books:

```
assert fiction.books.size == 2;
assert fiction.bookCount == 2;
assert fiction.displayName == "Shelf Fiction";
fiction.rename("Classics");
assert fiction.label == "Classics";
```

A property can also be bound to an element of an **external resource**: a cell of a spreadsheet,
an XML element, a class of an EMF model. This is what connects a virtual model to the data it
federates, and it is described with the [technology adapters](/docs/guide/concepts/technology-adapters).

## Behaviours

A behaviour describes what an instance can do. Its body is a sequence of instructions (assignments,
conditions, loops, and the *edition actions* that create, query or delete things). `Shelf` shows
the main kinds.

**Creation.** A `create` behaviour runs when an instance is created with `new`. A concept may have
several; all but one are named:

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

`new Shelf("Fiction", 20)` runs the first one, and `new Shelf::withDefaultCapacity("Poetry")` the
second.

**Deletion.** A `delete` behaviour runs when an instance is deleted, with the `delete` instruction:

```
public removeBook(Book book) {
	books.remove(parameters.book);
	delete parameters.book;
}
```

**Ordinary behaviours.** Any other behaviour has a name, arguments and possibly a return type. It
is called on an instance, like a method:

```
public int countNovels() {
	int count = 0;
	for (Book book : books) {
		if (book instanceof Novel) {
			count = count + 1;
		}
	}
	return count;
}
```

**Reactions.** A behaviour can also be triggered by an event instead of being called. `Library`
declares an event and reacts to it:

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

After `library.newShelf("Fiction")`, `library.lastCreatedShelf` is `"Fiction"`. Events are not
limited to the model itself: technology adapters can offer events of their own, fired when the
federated resource changes, and a model listens to them the same way.

A behaviour reads its arguments through `parameters`, as in `parameters.label`. Writing the bare
name gives `null`, without an error (see the [language tour](/docs/guide/fml/language-tour)).

## Inheritance

A concept can extend one or several other concepts, and can be abstract. In `Library`, `Publication`
is abstract and declares that every publication has a `code`; `Book` extends it and computes the
code from its title; `Novel` extends `Book`:

```
public abstract concept Publication {

	abstract String code;
}
```

```
public concept Book extends Publication {

	String title;
	String code values "B-" + title;
	// …
}

public concept Novel extends Book {

	String author;

	create(String title, String author) {
		super(parameters.title);
		author = parameters.author;
	}
	// …
}
```

A novel is a book and a publication: the checks below hold, and `Shelf.countNovels()` above counts
novels among the books with `instanceof`.

```
dune = fiction.newNovel("Dune", "Frank Herbert");
assert dune.code == "B-Dune";
assert fiction.countNovels() == 1;
```

## What you have seen

A virtual model groups concepts, and is itself a concept. Concepts nest, and their instances nest the
same way. A concept declares properties, which can be stored, referenced, computed or abstract, and
behaviours, which can create, delete, compute or react. The model is a description: the values
exist only in the instances the runtime creates from it.

The model `Library` and the script that checks every value above (`Library.fml` and
`TestLibrary.fmlscript`) are part of the automated tests of the `openflexo-core` repository.
