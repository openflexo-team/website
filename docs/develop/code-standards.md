---
sidebar_position: 7
title: Code standards
---

# Code standards

## Code Style
Code style follows Sun's convention (Code Conventions for the Java Programming Language) with the following exceptions:

* Max line length is set to 140 characters

Moreover, the following rules shall apply:

* Imports shall be ordered: java.*, javax.*, org.*, com.*, then alphabetical order shall apply.
* Unnecessary imports shall be removed
* Each line shall contain only a single instruction (excepted for "for-loops")
* Blocks should always be used (if/while/for/do)
* @Override should be placed everywhere as necessary (including implementations of interface methods)
* Typing should be enforced as much as possible

You can find [here](https://github.com/openflexo-team/openflexo-production/tree/0.4/tools-configuration/src/main/resources) the Eclipse formatter configuration file (feel free to provide equivalent formatters for other IDE).
