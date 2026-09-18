---
sidebar_position: 8
title: Roadmap and release policy
description: What the versions of Openflexo mean, and where the project is going.
---

# Roadmap and release policy

## What a version means

Versions follow the scheme *major.minor.revision*, with a qualifier: `-SNAPSHOT` for daily
development builds and `-RCx` for release candidates. A release is cut when the version is
considered stable at the end of a QA cycle. Components are versioned independently, and each
platform version fixes a compatible set of them: the
[component versions](/docs/develop/component-versions) page lists them per version.

## Where the project stands

* **2.0.1** is the last stable release, published in March 2023. It needs Java 8.
* **2.99** is the next release. It replaces the former XML serialization of virtual models with the
  textual FML syntax, and it is the version the current work targets: the technology adapters are
  being stabilised on it. It needs Java 8.
* **3.0** follows 2.99. Snapshot builds of 3.0 are published on the download server. It requires
  **Java 17 or later**.

The order is therefore: 2.99 first, then 3.0. Once 2.99 is released, it becomes the stable version
on the [Downloads page](/downloads), 2.0.1 moves to history, and snapshots of 3.0 appear.

## What is not promised

This page describes direction, not commitments: dates and contents of future versions are decided as
the work progresses. Support for every version is [best effort](./maturity-licensing-support).
