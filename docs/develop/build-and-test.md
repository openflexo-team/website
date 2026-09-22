---
sidebar_position: 5
title: Build and test
description: The Gradle tasks of the Openflexo build, and the traps to know before trusting a green build.
---

# Build and test

Openflexo is built with **Gradle**, through a custom plugin that adds global tasks to the standard
ones. Stray `pom.xml` files in some repositories are not the build. Prefer the global tasks to raw
Gradle lifecycle tasks.

## Tasks

Run them from the root of a repository, or of [`openflexo-dev`](./setup) to act on all the
repositories you have included.

| Task | What it does |
|---|---|
| `./gradlew compile` | compiles every module |
| `./gradlew test` | runs the **non-UI** tests, headless (`java.awt.headless=true`), on 4 parallel forks |
| `./gradlew uiTest` | runs only the UI tests, on a single fork; **needs a display** |
| `./gradlew testAll` | runs `test` and `uiTest` |
| `./gradlew clean` | cleans every module |
| `./gradlew dep` | reports the dependencies across modules |
| `./gradlew tasksAll` | lists the tasks of every module |
| `./gradlew sableccParser` | generates the parsers from the SableCC grammars |

To run a single test, name its module and filter by class:

```bash
./gradlew :default-expression-language:test --tests '*TestExpression'
```

## A green build does not mean the tests passed

`test` and `uiTest` are configured with `ignoreFailures = true`: **`BUILD SUCCESSFUL` is printed
even when tests fail.** Read the summary box the build prints after each test task:

```
--------------------------------------------------------------------
|  Results: SUCCESS (6 tests, 6 successes, 0 failures, 0 skipped)  |
--------------------------------------------------------------------
```

A non-zero number of failures is a real failure, whatever the last line says. A continuous
integration job must therefore inspect the test reports, not the exit status alone.

## UI tests and headless tests

Tests are split by a JUnit category. A test that needs a display must be annotated
`@Category(org.openflexo.test.UITest.class)`: it is then excluded from `test`, which runs headless,
and run by `uiTest`. A test that does not need one must **not** carry the category, or it never runs
in `test`.

## Generated parsers

Several projects generate a parser from a SableCC grammar in `src/main/sablecc/*.sablecc`:
`connie`, `openflexo-core` (`fml-parser` and `fml-cli`) and a few technology adapters. The generated
sources land in `build/generated-sources/` and are neither committed nor edited: change the grammar,
then regenerate. Run `./gradlew sableccParser` before the first build of such a project, or before
importing it in an IDE, and again after changing a grammar: it is the reliable way to have the
parsers in place, and without them the classes the rest of the code needs are missing.

Not everything under a `parser/` directory is generated: the factories and analyzers committed
there are hand-written code over the generated syntax tree, and they are yours to edit.

## Java version

Openflexo 2.99 is built and run with **Java 8**: the core still uses `java.xml.bind`, removed from
the JDK in version 11, so compilation fails on 11 and 17. This limit disappears with 3.0, which
requires Java 17 or later (see [Component versions](./component-versions)).

## Versions and dependencies

Dependencies between Openflexo components are declared with helpers of the build plugin
(`connie()`, `pamela()`, `flexoUtils()`, one `xxxConnector()` per technology adapter…), never with a
literal `group:name:version`. The version of every component is defined in one place, the
`buildconfig` of `openflexo-buildplugin`: bumping a version means editing that map, not the
`build.gradle` files that use it. A hard-coded `-SNAPSHOT` in a `build.gradle` would make a release
depend silently on a snapshot.

Adding a technology adapter means adding its helper to the build plugin, which must then be
published before a repository that uses the helper can be built on the continuous integration
server; the local composite build hides that ordering.
