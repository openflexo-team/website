---
sidebar_position: 2
title: Repository map
---

# Repository map

<!-- Generated 2026-09-18 by scripts/generate_repository_map.py from
     openflexo-dev/settings.gradle, cross-referenced against src/data/technology-adapters.json.
     Do not hand-edit -- re-run the script instead. -->

`GIT-2.99` (see the workspace root `CLAUDE.md`) is a set of independently-cloned repositories, not
one monorepo. `openflexo-dev`'s `settings.gradle` is the aggregate composite build used for
cross-project development — every repository below is one `includeBuild` line there, grouped as
that file groups them. A repository marked "not in the default composite build" is commented out
there: present in the ecosystem, but not included by default (a research prototype, or a technology
not built locally by everyone).

Layering is strict bottom-up — `connie` → `pamela` → `gina`/`diana` → `openflexo-core` → UI →
technology adapters → server → applications — a lower layer never depends on a higher one; a
technology adapter never depends on another one. See the workspace `CLAUDE.md` for the invariant,
[Set up your workspace](./setup) for how to check these out and build them together, and
[Component versions](/docs/get-started/versions) for which version of each goes with a given
Openflexo release.

## Core & frameworks

| Repository | Status |
|---|---|
| [openflexo-buildplugin](https://github.com/openflexo-team/openflexo-buildplugin) | in the default composite build |
| [connie](https://github.com/openflexo-team/connie) | in the default composite build |
| [diana](https://github.com/openflexo-team/diana) | in the default composite build |
| [gina](https://github.com/openflexo-team/gina) | in the default composite build |
| [pamela](https://github.com/openflexo-team/pamela) | in the default composite build |
| [pamela-editor](https://github.com/openflexo-team/pamela-editor) | in the default composite build |
| [openflexo-utils](https://github.com/openflexo-team/openflexo-utils) | in the default composite build |
| [openflexo-core](https://github.com/openflexo-team/openflexo-core) | in the default composite build |
| [openflexo-ui](https://github.com/openflexo-team/openflexo-ui) | in the default composite build |
| [modelers](https://github.com/openflexo-team/modelers) | in the default composite build |
| [openflexo-integration-tests](https://github.com/openflexo-team/openflexo-integration-tests) | in the default composite build |
| [openflexo-packaging](https://github.com/openflexo-team/openflexo-packaging) | in the default composite build |
| [pimca](https://github.com/openflexo-team/pimca) | not in the default composite build |
| [cta](https://github.com/openflexo-team/cta) | not in the default composite build |
| [formod](https://github.com/openflexo-team/formod) | not in the default composite build |

## Technology adapters

| Repository | Status |
|---|---|
| [openflexo-technology-adapters](https://github.com/openflexo-team/openflexo-technology-adapters) | in the default composite build |
| [openflexo-diagram](https://github.com/openflexo-team/openflexo-diagram) | stabilised |
| [openflexo-docx](https://github.com/openflexo-team/openflexo-docx) | stabilised |
| [openflexo-emf](https://github.com/openflexo-team/openflexo-emf) | stabilised |
| [openflexo-gina](https://github.com/openflexo-team/openflexo-gina) | retired |
| [openflexo-http](https://github.com/openflexo-team/openflexo-http) | retired |
| [openflexo-rest](https://github.com/openflexo-team/openflexo-rest) | migration-in-progress |
| [openflexo-java](https://github.com/openflexo-team/openflexo-java) | limited-support |
| [openflexo-jdbc](https://github.com/openflexo-team/openflexo-jdbc) | migration-in-progress |
| [openflexo-kafka](https://github.com/openflexo-team/openflexo-kafka) | limited-support |
| [openflexo-owl](https://github.com/openflexo-team/openflexo-owl) | stabilised |
| [openflexo-opc-ua](https://github.com/openflexo-team/openflexo-opc-ua) | active-development |
| [openflexo-capella](https://github.com/openflexo-team/openflexo-capella) | active-development |
| [openflexo-obp2](https://github.com/openflexo-team/openflexo-obp2) | not in the default composite build |
| [openflexo-odt](https://github.com/openflexo-team/openflexo-odt) | unclassified |
| [openflexo-oslc](https://github.com/openflexo-team/openflexo-oslc) | retired |
| [openflexo-pdf](https://github.com/openflexo-team/openflexo-pdf) | limited-support |
| [openflexo-pptx](https://github.com/openflexo-team/openflexo-pptx) | migration-in-progress |
| [openflexo-rhapsody](https://github.com/openflexo-team/openflexo-rhapsody) | retired |
| [openflexo-xlsx](https://github.com/openflexo-team/openflexo-xlsx) | stabilised |
| [openflexo-xml](https://github.com/openflexo-team/openflexo-xml) | stabilised |
| [openflexo-json](https://github.com/openflexo-team/openflexo-json) | active-development |
| [openflexo-markdown](https://github.com/openflexo-team/openflexo-markdown) | limited-support |
| [openflexo-mcp](https://github.com/openflexo-team/openflexo-mcp) | active-development |
| [openflexo-csv](https://github.com/openflexo-team/openflexo-csv) | active-development |

## Server

| Repository | Status |
|---|---|
| [openflexo-server](https://github.com/openflexo-team/openflexo-server) | in the default composite build |

## Application modules

| Repository | Status |
|---|---|
| [openflexo-modules](https://github.com/openflexo-team/openflexo-modules) | in the default composite build |
| [openflexo-modeller](https://github.com/openflexo-team/openflexo-modeller) | in the default composite build |
| [free-modelling-editor](https://github.com/openflexo-team/free-modelling-editor) | in the default composite build |
| [enterprise-architecture-editor](https://github.com/openflexo-team/enterprise-architecture-editor) | in the default composite build |
