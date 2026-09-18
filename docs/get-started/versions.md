---
sidebar_position: 2
title: Component versions
---

# Component versions

<!-- Generated 2026-09-18 by scripts/generate_version_table.py from
     openflexo-buildplugin's buildconfig (branches: origin/2.0.1, 2.99, 3.0).
     Do not hand-edit -- re-run the script instead. -->

Each Openflexo release ties together a compatible set of component versions, defined in one place:
`openflexo-buildplugin`'s `buildconfig`. This table is generated from that source, one column per
maintained branch, so it cannot drift the way a hand-written table does.

| Component | 2.0.1 (last stable release) | 2.99 (current development branch) | 3.0 (next major, early development) |
|---|---|---|---|
| Openflexo | 2.0.1 | 2.99 | 3.0.0 |
| Connie | 1.5.0.1 | 2.0.0 | 2.1.0 |
| Pamela | 1.5.0.1 | 1.6 | 1.7 |
| Gina | 2.2.0.1 | 2.3 | 2.4 |
| Diana | 1.5.0.1 | 1.6 | 1.7 |
| Utils | 1.5.0.1 | 1.6 | 1.7 |

Java requirement: **2.99 needs Java 8** (it freezes at startup on newer JVMs — see
[Installing and running Openflexo](/downloads#install)); 3.0's requirement is not settled yet.
