---
sidebar_position: 4
title: Release engineering
---

# Release engineering

## Versioning scheme and component lifecycle

Versions follow one of two schemes:

* *major.minor.revision-qualifier*
* *major.minor-qualifier*

where the qualifier is `-SNAPSHOT` for everyday development builds, or `-RCx` for a release
candidate cut at the start of a QA cycle. A release is cut at the end of that cycle, once the
candidate is considered stable. Components version independently — `connie`, `pamela`, `gina`,
`diana` and the rest each carry their own version — and a `buildconfig` (in
`openflexo-buildplugin`) ties a compatible set of them together under one platform version, such as
2.99.

## Building and publishing

Builds run entirely on **Gradle**, through Jenkins jobs, one family of jobs per repository:
continuous/`SNAPSHOT` builds triggered on a push, manual release-candidate builds, and manual
release builds. Each publishes to the Openflexo Artifactory
([maven.openflexo.org](https://maven.openflexo.org/artifactory)); a release candidate or release
also lands on the [download server](https://downloads.openflexo.org/openflexo/). Because components
version independently, a release wave builds them in dependency order — the platform-wide packages
(the editors, `openflexo-packaging`) come last, once everything they depend on has published.

This page intentionally stops here rather than listing exact job names or a click-by-click
procedure: both have drifted before and are maintained as living, checked state rather than
prose — see the CI/CD job listing on Jenkins itself for what exists today.
