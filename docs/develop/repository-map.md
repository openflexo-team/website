---
sidebar_position: 2
title: Repository map
---

# Repository map

<!-- Generated 2026-09-18 by scripts/generate_repository_map.py.
     Do not hand-edit -- re-run the script instead. -->

Openflexo is not a single repository: the infrastructure is made of independent repositories,
each with its own history and its own version. They are listed below, grouped by role.

Layering is strict, bottom-up: Connie, then Pamela, then Gina and Diana, then the core
(`openflexo-core`), the user interface, the technology adapters, the server and finally the
applications. A layer never depends on a higher one, and a technology adapter never depends on
another one. See [Set up your workspace](./setup) to check them out and build them together, and
[Component versions](/docs/get-started/versions) for which version of each goes with a release.

## Core and frameworks

| Repository | Description | Status |
|---|---|---|
| [openflexo-buildplugin](https://github.com/openflexo-team/openflexo-buildplugin) | Gradle build plugin and version configuration shared by every repository | Active |
| [connie](https://github.com/openflexo-team/connie) | Expression language and binding framework | Active |
| [diana](https://github.com/openflexo-team/diana) | Diagramming and 2D drawing framework | Active |
| [gina](https://github.com/openflexo-team/gina) | Generic user-interface framework: widgets, panels, inspectors | Active |
| [pamela](https://github.com/openflexo-team/pamela) | Modeling framework: annotated interfaces woven into stateful model objects | Active |
| [pamela-editor](https://github.com/openflexo-team/pamela-editor) | Editor for Pamela metamodels | Active |
| [openflexo-utils](https://github.com/openflexo-team/openflexo-utils) | Shared utility classes | Active |
| [openflexo-core](https://github.com/openflexo-team/openflexo-core) | Model federation engine and FML, the Flexo Modeling Language | Active |
| [openflexo-ui](https://github.com/openflexo-team/openflexo-ui) | Shared user-interface components of the Openflexo applications | Active |
| [modelers](https://github.com/openflexo-team/modelers) | BPMN, UML, statecharts and OWL modelers | Active |
| [openflexo-integration-tests](https://github.com/openflexo-team/openflexo-integration-tests) | Regression tests and example federation use cases | Active |
| [openflexo-packaging](https://github.com/openflexo-team/openflexo-packaging) | Assembles modules and technology adapters into downloadable packages | Active |
| [pimca](https://github.com/openflexo-team/pimca) | Domain-specific systems modeling language for cyber threat analysis | Research prototype |
| [cta](https://github.com/openflexo-team/cta) | Cyber Threat Application, built on Pimca (see [Research](/docs/research/projects/cta)) | Research prototype |
| [formod](https://github.com/openflexo-team/formod) | Formose application: the B technology adapter, its module and its tests | Research prototype |

## Technology adapters

| Repository | Description | Status |
|---|---|---|
| [openflexo-technology-adapters](https://github.com/openflexo-team/openflexo-technology-adapters) | Historical container of technology adapters, now holding only the `xx-ta` template | Legacy |
| [openflexo-diagram](https://github.com/openflexo-team/openflexo-diagram) | Openflexo's native diagramming technology | Stabilised |
| [openflexo-docx](https://github.com/openflexo-team/openflexo-docx) | Microsoft Word documents (.doc, .docx) | Stabilised |
| [openflexo-emf](https://github.com/openflexo-team/openflexo-emf) | EMF-based metamodels and models | Stabilised |
| [openflexo-gina](https://github.com/openflexo-team/openflexo-gina) | GINA user-interface components, as a federated resource | Retired |
| [openflexo-http](https://github.com/openflexo-team/openflexo-http) | Generic HTTP endpoints | Retired |
| [openflexo-rest](https://github.com/openflexo-team/openflexo-rest) | REST web services | Migration in progress |
| [openflexo-java](https://github.com/openflexo-team/openflexo-java) | Java source code | Limited support |
| [openflexo-jdbc](https://github.com/openflexo-team/openflexo-jdbc) | Relational databases via JDBC | Migration in progress |
| [openflexo-kafka](https://github.com/openflexo-team/openflexo-kafka) | Apache Kafka streams | Limited support |
| [openflexo-owl](https://github.com/openflexo-team/openflexo-owl) | OWL2 ontologies | Stabilised |
| [openflexo-opc-ua](https://github.com/openflexo-team/openflexo-opc-ua) | OPC-UA industrial automation servers | Active development |
| [openflexo-capella](https://github.com/openflexo-team/openflexo-capella) | Capella / Arcadia system models | Active development |
| [openflexo-obp2](https://github.com/openflexo-team/openflexo-obp2) | Connector for the OBP2 tool | Retired |
| [openflexo-odt](https://github.com/openflexo-team/openflexo-odt) | OpenDocument Text documents (.odt) | Not yet classified |
| [openflexo-oslc](https://github.com/openflexo-team/openflexo-oslc) | OSLC-linked resources | Retired |
| [openflexo-pdf](https://github.com/openflexo-team/openflexo-pdf) | PDF documents | Limited support |
| [openflexo-pptx](https://github.com/openflexo-team/openflexo-pptx) | Microsoft PowerPoint presentations (.ppt, .pptx) | Migration in progress |
| [openflexo-rhapsody](https://github.com/openflexo-team/openflexo-rhapsody) | IBM Rational Rhapsody models | Retired |
| [openflexo-xlsx](https://github.com/openflexo-team/openflexo-xlsx) | Microsoft Excel spreadsheets (.xls, .xlsx) | Stabilised |
| [openflexo-xml](https://github.com/openflexo-team/openflexo-xml) | XML documents, typed against an XSD or freely structured | Stabilised |
| [openflexo-json](https://github.com/openflexo-team/openflexo-json) | JSON documents | Active development |
| [openflexo-markdown](https://github.com/openflexo-team/openflexo-markdown) | Markdown documents | Limited support |
| [openflexo-mcp](https://github.com/openflexo-team/openflexo-mcp) | Model Context Protocol servers | Active development |
| [openflexo-csv](https://github.com/openflexo-team/openflexo-csv) | CSV files | Active development |

## Server

| Repository | Description | Status |
|---|---|---|
| [openflexo-server](https://github.com/openflexo-team/openflexo-server) | HTTP server exposing the Openflexo infrastructure through a REST API | Active |

## Application modules

| Repository | Description | Status |
|---|---|---|
| [openflexo-modules](https://github.com/openflexo-team/openflexo-modules) | Template (`xxxmodule`) for building a new application module | Active |
| [openflexo-modeller](https://github.com/openflexo-team/openflexo-modeller) | Openflexo Modeller application: define and run model federations | Active |
| [free-modelling-editor](https://github.com/openflexo-team/free-modelling-editor) | FreeModellingEditor application: build free graphical models | Active |
| [enterprise-architecture-editor](https://github.com/openflexo-team/enterprise-architecture-editor) | Enterprise Architecture editor application | Active |

## Statuses

Technology adapters follow the review made by the architecture board on 2026-04-03:

* **Stabilised**: complete and stable.
* **Migration in progress**: being migrated to the current architecture.
* **Active development**: new adapter, still being developed.
* **Limited support**: still available, with limited maintenance.
* **Retired**: no longer maintained nor shipped.

Other repositories are **Active** (maintained, part of the current platform), a **Research
prototype** (built for a research project), **Legacy** (kept for history) or **Retired**.
