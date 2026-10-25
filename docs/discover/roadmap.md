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
* **2.99** is the latest stable release, published in October 2026. It replaces the former XML
  serialization of virtual models with the textual FML syntax. It needs Java 8.
* **3.0** follows 2.99 and is under development. It requires **Java 17 or later** to build and run
  from the sources. Its snapshot builds are published on the [Downloads page](/downloads#snapshot):
  their installers embed their own Java runtime, so a snapshot needs no Java installed. They are
  development builds, not signed.

The order is therefore: 2.99, now released, then 3.0.

## What is not promised

This page describes direction, not commitments: dates and contents of future versions are decided as
the work progresses. Support for every version is [best effort](./maturity-licensing-support).
