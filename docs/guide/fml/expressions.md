---
sidebar_position: 9
title: Expressions
description: The operators and values of FML expressions, and the places where they differ from Java, numbers and null above all.
---

# Expressions

An expression computes a value. It appears in conditions, assignments, arguments, `return`
statements, `values` properties and `where` clauses. FML expressions are evaluated by **Connie**,
the expression language of the platform: they look like Java expressions, and they mostly behave
like them, with a few differences that matter. This page lists the operators, then the differences.
The examples come from a model `Calc`.

## Values

An expression works with numbers (`7`, `1.5`), strings (`"a"`), booleans (`true`, `false`),
`null`, and the instances of concepts. A **path** designates a value by following properties and
calls: `guest.name`, `fiction.books.size`, `this.container.label`. The names a path can start from
are the local variables, the properties of the concept, and `this`, `container` and `parameters`
(see the [language tour](/docs/guide/fml/language-tour)). Inside a `listen`, `evt` is the event.

![FML bindings](/img/architecture/11-fml-bindings.png)

Resolving a path is: parse the text into an expression, find its first name in the binding model
in scope, resolve each further step against the type found so far, then evaluate it. The binding
model in scope inside a control graph is itself a chain — a `VirtualModel`'s, then its
`FlexoConcept`'s, then a `FlexoBehaviour`'s, then the control graph's own — each adding its names
to those of the one before it. The [language tour](/docs/guide/fml/language-tour#how-a-name-is-resolved)
measures the resulting lookup order for a bare name inside a behaviour.

## Operators

| Kind | Operators |
|---|---|
| arithmetic | `+` `-` `*` `/` `%`, and `-` before a value |
| comparison | `==` `!=` `<` `<=` `>` `>=` |
| logic | `&&` `||` `!` |
| conditional | `condition ? a : b` |
| type | `instanceof`, and a cast `(type) value` |

Precedence is the usual one, and parentheses group:

```
public int precedence() {
	return 2 + 3 * 4;
}

public int parens() {
	return (2 + 3) * 4;
}
```

```
assert calc.precedence() == 14;
assert calc.parens() == 20;
```

Conditional expressions can be nested:

```
public String ternary(int n) {
	return parameters.n > 0 ? "pos" : (parameters.n < 0 ? "neg" : "zero");
}
```

```
assert calc.ternary(5) == "pos";
assert calc.ternary(-1) == "neg";
assert calc.ternary(0) == "zero";
```

`&&` and `||` evaluate both operands, as the [control flow](/docs/guide/fml/control-flow) page
shows.

## Numbers

**Division and remainder give decimal numbers, even between integers.** `7 / 2` is `3.5`, not `3`,
`6 / 3` is `2.0`, and `7 % 2` is `1.0`. The declared type of the behaviour does not change that:

```
public double intDiv() {
	return 7 / 2;
}

public double evenDiv() {
	return 6 / 3;
}

public double intMod() {
	return 7 % 2;
}
```

```
assert calc.intDiv() == 3.5;
assert calc.evenDiv() == 2.0;
assert calc.intMod() == 1.0;
```

Addition, subtraction and multiplication between integers stay integers, and mixing an integer with
a decimal gives a decimal:

```
public double mixed() {
	return 3 * 1.5;
}
```

```
assert calc.mixed() == 4.5;
```

To get an integer from a decimal, use a **cast**, which drops the decimals:

```
public int castInt() {
	double d = 3.7;
	return (int) d;
}
```

```
assert calc.castInt() == 3;
```

**A string is never a number.** `"4.5" * 1.0` is an error. To convert, call a Java method: import
the class, and use its simple name.

```
import java.lang.Double;
```

```
public double parsed() {
	return Double.parseDouble("4.5") * 2;
}
```

```
assert calc.parsed() == 9.0;
```

## Strings

`+` concatenates when its left operand is a string, and a number or `null` on the right is
written as text; `null` is written `null`:

```
public String concatNumber() {
	return "a" + 1;
}

public String nullConcat() {
	String n = null;
	return "x" + n;
}
```

```
assert calc.concatNumber() == "a1";
assert calc.nullConcat() == "xnull";
```

The other way round, `1 + "a"`, is a type error and stops the behaviour.

`==` compares the contents of two strings, not their identity:

```
public boolean stringEq() {
	String a = "ab";
	String b = "a" + "b";
	return a == b;
}
```

```
assert calc.stringEq();
```

The Java methods of a string are available on a variable or a parameter. `null` is tested with
`== null`:

```
public String upperLocal() {
	String s = "abc";
	return s.toUpperCase();
}

public String replaceLocal() {
	String s = "EQ-12-3";
	return s.replace("EQ-", "").replace("-", "");
}

public int lengthOf(String s) {
	return parameters.s.length();
}

public boolean isNull() {
	String n = null;
	return n == null;
}
```

```
assert calc.upperLocal() == "ABC";
assert calc.replaceLocal() == "123";
assert calc.lengthOf("hello") == 5;
assert calc.isNull();
```

:::caution
A method called directly on a string literal, `"hello".length()`, gives `null`, with no message.
Put the literal in a variable first, as `upperLocal` does.
:::

## Lists

A Java list is created with `new ArrayList<Type>()` and used with its Java methods:

```
public int listSize() {
	List<String> l = new ArrayList<String>();
	l.add("a");
	l.add("b");
	return l.size();
}

public String listGet() {
	List<String> l = new ArrayList<String>();
	l.add("a");
	l.add("b");
	return l.get(1);
}

public boolean listContains() {
	List<String> l = new ArrayList<String>();
	l.add("a");
	return l.contains("a");
}
```

```
assert calc.listSize() == 2;
assert calc.listGet() == "b";
assert calc.listContains();
```

## When a path does not resolve

A path that cannot be resolved is not always an error: in a behaviour it gives `null`, and the
behaviour goes on. Several mistakes end this way, and are covered on the pages where they arise:

| The mistake | Instead |
|---|---|
| a parameter read by its bare name, `who` | `parameters.who` |
| a behaviour of the same instance called bare, `twin()` | `this.twin()` |
| a concept of another model used without importing it | `import [uri];` |
| a concept that is not nested created with a bare `new` | `container.new` |
| `super.name()` in a concept with several parents | a helper behaviour called on `this` |
| a method called on a string literal | a variable |

When a value is `null` and should not be, look for one of these first, and validate the model, which
reports unresolved paths.

## What you have seen

Expressions read like Java, with the usual precedence and a conditional operator. Division and
remainder give decimal numbers, a string is never converted to a number, `+` with a string on the
left concatenates, and both sides of `&&` and `||` are evaluated. A path that does not resolve gives
`null` rather than an error, which is the first thing to suspect when a value is missing.

The model and script (`Calc.fml` and `TestCalc.fmlscript`) are tests of the platform, in the
`openflexo-core` repository.
