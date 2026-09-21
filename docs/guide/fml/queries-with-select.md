---
sidebar_position: 7
title: Queries with select
description: How to find the instances of a concept with select, how to filter them, and what the source of the query changes.
---

# Queries with select

`select` finds instances of a concept. It is an instruction, not a method call, and it is written
the same way wherever the instances live. The examples use a model `Stock`, with articles and crates,
and four articles created in this order:

```
apple = stock.newArticle("apple", "fruit", 5);
pear = stock.newArticle("pear", "fruit", 1);
leek = stock.newArticle("leek", "vegetable", 3);
salt = stock.newArticle("salt", "mineral", 9);
```

## The form

```
return select Article from this;
return select Article from (this) where (selected.kind == parameters.kind);
return select unique Article from (this) where (selected.name == parameters.name);
```

The parts are:

- the **concept** to look for;
- `from` and the **source** the search starts from, usually `this`, in parentheses when a `where`
  follows;
- an optional `where` with the conditions;
- an optional `unique`, when at most one instance is expected.

A query is a value: it can be returned, assigned to a variable, or be the list of a `for`:

```
public List<Article> allArticles() {
	return select Article from this;
}
```

```
assert stock.allArticles().size == 4;
assert stock.allArticles().get(0) == apple;
assert stock.allArticles().get(3) == salt;
```

The result is a list, and it follows the order in which the instances were created.

## Conditions

In a `where`, the instance being examined is `selected`. A condition is a comparison, and an
argument of the behaviour is read through `parameters`:

```
public List<Article> ofKind(String kind) {
	return select Article from (this) where (selected.kind == parameters.kind);
}
```

```
assert stock.ofKind("fruit").size == 2;
assert stock.ofKind("zzz").size == 0;
```

A query that finds nothing returns an empty list.

Several conditions are combined either by separating them with commas, which means *and*, or with
the operators `&&` and `||`:

```
public List<Article> ofKindAndAtLeast(String kind, int quantity) {
	return select Article from (this) where (selected.kind == parameters.kind, selected.quantity >= parameters.quantity);
}

public List<Article> ofKindAndAtLeastOperator(String kind, int quantity) {
	return select Article from (this) where (selected.kind == parameters.kind && selected.quantity >= parameters.quantity);
}

public List<Article> fruitOrVegetable() {
	return select Article from (this) where (selected.kind == "fruit" || selected.kind == "vegetable");
}
```

```
assert stock.ofKindAndAtLeast("fruit", 3).size == 1;
assert stock.ofKindAndAtLeast("fruit", 3).get(0) == apple;
assert stock.ofKindAndAtLeastOperator("fruit", 3).size == 1;
assert stock.fruitOrVegetable().size == 3;
```

## One instance: unique

`select unique` gives the instance itself instead of a list, or `null` when nothing matches:

```
public Article named(String name) {
	return select unique Article from (this) where (selected.name == parameters.name);
}
```

```
assert stock.named("leek") == leek;
assert stock.named("zzz") == null;
```

When several instances match, `unique` gives one of them, without an error. In the test below it is
the first created, but the language does not promise which:

```
public Article firstOfKind(String kind) {
	return select unique Article from (this) where (selected.kind == parameters.kind);
}
```

```
assert stock.firstOfKind("fruit") == apple;
```

If several matches would be a mistake in your model, select the list and check its size.

## The source

The source is the instance the search starts from, and the search covers what it **contains**,
including the instances nested in other instances. In `Stock`, a crate contains parts:

```
public List<Part> allParts() {
	return select Part from this;
}
```

```
public concept Crate {

	String label;

	create(String label) {
		label = parameters.label;
	}

	public Part newPart(String code) {
		return new Part(parameters.code);
	}

	public List<Part> parts() {
		return select Part from this;
	}

	public concept Part {

		String code;

		create(String code) {
			code = parameters.code;
		}
	}
}
```

From the model, `select Part from this` finds the parts of every crate. From a crate, the same
instruction finds the parts of that crate only:

```
assert stock.allParts().size == 3;
assert crate1.parts().size == 2;
assert crate2.parts().size == 1;
```

## Concepts and sub-concepts

A query on a concept also returns the instances of the concepts that extend it. This is what the
`chorus()` behaviour of the [previous pages](/docs/guide/fml/declaring-models-and-concepts) relies on:
`select Creature from this` finds dogs and cats.

## Deleted instances

A deleted instance is not found any more:

```
public removeArticle(Article article) {
	delete parameters.article;
}
```

```
stock.removeArticle(pear);
assert stock.allArticles().size == 3;
assert stock.ofKind("fruit").size == 1;
```

## Queries on resources

The same instruction queries what a technology adapter offers, for instance the rows of a
spreadsheet or the elements of an XML document, with the source being the resource or one of its
elements. The
[technology adapters](/docs/guide/concepts/technology-adapters) describe what each one can be asked.

## What you have seen

`select Type from (source) where (conditions)` gives a list, in creation order. `selected` is the
candidate in the conditions, commas mean *and*, and `unique` gives an instance or `null`. The search
covers what the source contains, sub-concepts included, and skips deleted instances.

The model and script (`Stock.fml` and `TestStock.fmlscript`) are tests of the platform, in the
`openflexo-core` repository.
