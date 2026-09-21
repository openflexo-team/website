---
sidebar_position: 6
title: Control flow and instructions
description: The statements of a behaviour body, the conditions and loops FML offers, and the instructions that act on models.
---

# Control flow and instructions

The body of a behaviour is a **control graph**: a sequence of statements that run in order, some of
which contain other statements. This page lists them, then the instructions that act on models and
resources. The examples come from a model `Flow`, and from `Library` for the instructions.

## The statements

A statement is one of:

| Statement | Example |
|---|---|
| a **variable declaration** | `int total = 0;` |
| an **assignment** | `total = total + i;` |
| a **condition** | `if (…) { … } else { … }` |
| a **loop** | `while (…) { … }`, `for (…; …; …) { … }`, `for (T x : list) { … }` |
| a **return** | `return total;` |
| an **instruction** on a model | `new`, `delete`, `fire`, `select`, `log`… |
| a call | `words.add(parameters.word);` |

FML has no `break`, `continue` or `switch`: a loop ends when its condition does, or with `return`.

## Variables and assignments

A local variable is declared with its type, and lives in the block where it is declared:

```
public int scoped() {
	int x = 0;
	if (true) {
		int y = 5;
		x = y;
	}
	return x;
}
```

```
assert flow.scoped() == 5;
```

An assignment to a name that is not a local variable is an assignment to the property of that name,
as in `touched = touched + 1;`.

## Conditions

```
public String grade(int score) {
	if (parameters.score >= 90) {
		return "A";
	}
	else if (parameters.score >= 50) {
		return "B";
	}
	else {
		return "C";
	}
}
```

```
assert flow.grade(95) == "A";
assert flow.grade(60) == "B";
assert flow.grade(10) == "C";
```

:::caution
`&&` and `||` evaluate **both** operands, even when the first one decides the result, as Java does
not. In `if (false && this.touch() == 1)`, `touch()` is called. In a guard such as
`x != null && x.foo == 1`, `x.foo` is evaluated even when `x` is null.
:::

```
public int andOperands() {
	touched = 0;
	if (false && this.touch() == 1) {
		touched = touched + 100;
	}
	return touched;
}
```

```
assert flow.andOperands() == 1;
assert flow.orOperands() == 101;
```

## Loops

A `while` loop repeats while its condition holds, a classic `for` has an initialisation, a condition
and an update, and the enhanced `for` goes through the elements of a list, including the list a
query returns:

```
public int sumWhile(int n) {
	int i = 0;
	int total = 0;
	while (i < parameters.n) {
		i = i + 1;
		total = total + i;
	}
	return total;
}

public int sumFor(int n) {
	int total = 0;
	for (int i = 1; i <= parameters.n; i++) {
		total = total + i;
	}
	return total;
}

public String joinWords() {
	String all = "";
	for (String w : words) {
		all = all + w + ",";
	}
	return all;
}
```

```
assert flow.sumWhile(4) == 10;
assert flow.sumFor(4) == 10;
assert flow.joinWords() == "kiwi,banana,";
```

A `return` inside a loop ends the behaviour, and this is how a search stops early:

```
public String firstLong(int size) {
	for (String w : words) {
		if (w.length() >= parameters.size) {
			return w;
		}
	}
	return null;
}
```

```
assert flow.firstLong(5) == "banana";
assert flow.firstLong(10) == null;
```

## Instructions that act

Besides the control structures, a body holds **instructions** (the platform calls them *edition
actions*) that create, query, change or delete things. Several have a keyword of their own:

| Instruction | What it does | Example |
|---|---|---|
| `new` | creates an instance | `Shelf shelf = new Shelf(parameters.label, 20);` |
| `delete` | deletes an instance | `delete parameters.book;` |
| `fire` | raises an event | `fire new ShelfCreated(parameters.label);` |
| `select … from …` | finds instances; it can be the value of an assignment, of a `return` or the list of a `for` | `List<Shelf> shelves = select Shelf from this;` |
| `log` | writes a message to the log | `log "text is " + parameters.text;` |

```
public String logged(String text) {
	log "text is " + parameters.text;
	return parameters.text;
}
```

```
assert flow.logged("hello") == "hello";
```

Instructions from a technology adapter are written `Adapter::Action(…)`, and are described with
the [technology adapters](/docs/guide/concepts/technology-adapters). The instructions `match` and
`end match`, which keep a set of instances in step with a source, work together and need a page of
their own.

## Known limits

These constructs are accepted by the language, and give a wrong result without any message:

- **`do { … } while (…);`** executes its body once, whatever the condition. Use `while`.
- **`x += 2;`** and the other compound assignments used as a statement assign the right-hand side:
  `n += 2;` on `n = 5` leaves `n` equal to `2`. Write `n = n + 2;`.
- **`n++;`, `++n;`, `n--;` and `--n;` used as a statement** make the behaviour return `null`. They
  work in the update part of a `for`, as in `i++` above. Write `n = n + 1;`.
- **A `for` loop without a condition**, `for (int i = 0; ; i++)`, makes the behaviour disappear.
  Write the condition, or `while (true)`.
- **A condition that does not resolve**, for instance a misspelled variable, is taken as true by an
  `if`: the `then` branch runs. Validate the model to get the error.

## What you have seen

A body is a sequence of statements: declarations, assignments, conditions, loops, returns and
instructions. There is no `break` or `continue`, and the boolean operators evaluate both operands.
A few constructs that look standard do not behave as in Java, and the list above says which.

The model and script that check the values above (`Flow.fml` and `TestFlow.fmlscript`, and
`Library.fml` for the instructions) are tests of the platform, in the `openflexo-core` repository.
