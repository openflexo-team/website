---
sidebar_position: 5
title: Component versions
---

# Component versions

<!-- Generated 2026-09-20 by scripts/generate_version_table.py from
     openflexo-buildplugin's buildconfig (refs: origin/2.0.0, origin/2.0.1, origin/2.0.2, 2.99, 3.0, origin/1.8.1, origin/1.9.0, origin/1.9.1).
     Do not hand-edit -- re-run the script instead. -->

Each Openflexo release ties together a compatible set of component versions. They are defined in
one place, the `buildconfig` of `openflexo-buildplugin`, and this page is generated from it, one
column per release branch. The core, the technology adapters, the modules, the packaging and the
modelers all carry the version of the Openflexo platform itself; the generic frameworks
(Connie, Pamela, Gina, Diana) and the utilities are versioned independently.

## Recent versions

* **2.0.0**: released in June 2020
* **2.0.1**: released in March 2023, the last stable release
* **2.0.2**: bug-fix evolution of 2.0.1
* **2.99**: development branch, introduces the textual FML syntax
* **3.0**: next major version, in development

| Component | 2.0.0 | 2.0.1 | 2.0.2 | 2.99 | 3.0 |
|---|---|---|---|---|---|
| Java version | Java 8 | Java 8 | Java 8 | Java 8 | Java 17+ |
| Openflexo platform (core, technology adapters, modules, packaging, modelers, build plugin) | 2.0.0 | 2.0.1 | 2.0.2 | 2.99 | 3.0.0 |
| Connie | 1.5 | 1.5.0.1 | 1.5.0.2 | 2.0.0 | 2.1.0 |
| Pamela | 1.5 | 1.5.0.1 | 1.5.0.2 | 1.6 | 1.7 |
| Gina | 2.2 | 2.2.0.1 | 2.2.0.2 | 2.3 | 2.4 |
| Diana | 1.5 | 1.5.0.1 | 1.5.0.2 | 1.6 | 1.7 |
| Utils | 1.5 | 1.5.0.1 | 1.5.0.2 | 1.6 | 1.7 |

Openflexo 2.99 does not run on a Java newer than 8: it freezes at startup (see
[Installing and running Openflexo](/downloads#install)).

## Former versions

* **1.8.1**: released in 2017, mostly deprecated
* **1.9.0**: released in October 2018
* **1.9.1**: released in 2019

| Component | 1.8.1 | 1.9.0 | 1.9.1 |
|---|---|---|---|
| Java version | Java 8 | Java 8 | Java 8 |
| Openflexo platform (core, technology adapters, modules, packaging, modelers, build plugin) | 1.8.1 | 1.9.0 | 1.9.1 |
| Connie | 1.4 | 1.4.1 | 1.4.2 |
| Pamela | 1.4 | 1.4.1 | 1.4.2 |
| Gina | 2.1 | 2.1.1 | 2.1.2 |
| Diana | 1.4 | 1.4.1 | 1.4.2 |
| Utils | 1.4 | 1.4.1 | 1.4.2 |
