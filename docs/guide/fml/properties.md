---
sidebar_position: 4
title: Properties
description: The kinds of properties a concept can declare, their initial values, and how they are read and written.
---

# Properties

A property is something an instance of a concept knows. It is declared as a type, an optional
cardinality and a name, and it comes in several kinds that differ in where the value comes from. The
examples use the concept `Gadget` of a small model, `Widgets`.

## Typed properties

The simplest property has a type and a name:

```
int count;
boolean flag;
String text;
double ratio;
Gadget other;
```

The type may be a primitive type, a Java type, or a concept, as in `Gadget other;`, which holds an
instance of `Gadget` or nothing.

**A property with no initial value has no value.** This includes the primitive types: a new
instance has `null` for `count`, `flag` and `text`, not `0`, `false` or an empty string.

```
g = widgets.newGadget();
assert g.count == null;
assert g.flag == null;
assert g.text == null;
g.count = 5;
assert g.count == 5;
```

If a value must exist from the start, give the property an initial value.

## Initial values

An expression after `=` gives the value an instance starts with:

```
int preset = 7;
String greeting = "hi";
List<String> tags = new ArrayList<String>();
```

```
assert g.preset == 7;
assert g.greeting == "hi";
assert g.tags.size == 0;
g.addTag("a");
assert g.tags.size == 1;
```

## Several values

A cardinality after the type makes the property hold a list of values. `[0,*]` means any number of
values, and `...` after the type is another way to declare it:

```
String[0,*] many;
String... labels;
```

A property with a cardinality is a list from the start, empty until values are added:

```
assert g.many.size == 0;
assert g.labels.size == 0;
g.labels.add("x");
assert g.labels.size == 1;
```

The same notation is used with concepts, as in `Book[0,*] books;` of the
[virtual models and concepts](/docs/guide/concepts/virtual-models-and-concepts) page. The bounds of a cardinality are
written `[min,max]`, with `*` for no upper bound.

## Computed properties

A property whose value is an expression is declared with `values`. It has no setter: the value is
what the expression gives, and it follows the properties that expression reads.

```
Book[0,*] books;
int bookCount values books.size;
```

```
assert fiction.books.size == 2;
assert fiction.bookCount == 2;
```

:::caution
When an element is removed from the property that a computed property reads, and the computed
property has already been read, the computed property may still give its earlier value. Inside a
behaviour, read the value directly (`books.size`) instead of through the computed property.
:::

## Properties with a getter and a setter

A property can also be defined by a `get()` behaviour and, optionally, a `set(…)` behaviour:

```
String displayName {
	String get() {
		return "Shelf " + label;
	}
	set(String value) {
		label = value;
	}
};
```

```
assert fiction.displayName == "Shelf Fiction";
fiction.rename("Classics");
assert fiction.label == "Classics";
assert fiction.displayName == "Shelf Classics";
```

Without a `set`, the property cannot be changed. Assigning to it is ignored, and no error is
reported:

```
String fixed {
	String get() {
		return "constant";
	}
};
```

```
assert g.fixed == "constant";
g.fixed = "changed";
assert g.fixed == "constant";
```

## Abstract properties

An abstract property is declared by a concept and given its value by the concepts that extend it,
which can do it with a computed property:

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
```

```
assert emma.code == "B-Emma";
assert dune.code == "B-Dune";
```

## Properties bound to a resource

A property can be bound to an element of an external resource, and this is what connects a model to
the data it federates. It is declared with `with`, the role offered by a technology adapter and its
parameters. What each adapter offers is described with the
[technology adapters](/docs/guide/concepts/technology-adapters).

## Visibility

`public`, `protected` and `private` may precede the type. Without one, the property has the default
visibility:

```
private String notes;
```

A script is not held back by the visibility: it can read and write a `private` property.

```
g.secret = "s";
assert g.secret == "s";
assert g.secretValue() == "s";
```

## What you have seen

A property has a type, and possibly a cardinality and an initial value. It is stored, computed with
`values`, or defined by a getter and a setter; it may be abstract, and it may be bound to a resource.
Without an initial value it has no value at all, even for a primitive type.

The models and scripts on this page (`Widgets.fml` and `Library.fml`) are tests of the platform, in
the `openflexo-core` repository.
