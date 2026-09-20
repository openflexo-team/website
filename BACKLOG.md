# Backlog — website

Prefix `WEB-F-<n>`, never reused. Status: `TODO` · `IN PROGRESS` · `BLOCKED` · `DONE` · `DEFERRED`.

## WEB-F-1 — write the Oneway research project page

**Status:** TODO

`docs/research/projects/oneway.md` was deleted when the site was reorganised: it only held a
placeholder ("Some text") and nothing else in the site's sources describes the project. Needs a
problem statement, the contribution and links, in the same shape as `docs/research/projects/cta.md`.

## WEB-F-2 — write the Formose research project page

**Status:** TODO

Formose only exists as two footer links (project site, prototype download). It deserves a page
alongside the other research projects.

## WEB-F-3 — technology adapter registry, version table, Components page warning

**Status:** DONE

* `src/data/technology-adapters.json`: one registry of the technology adapters (id, name,
  description, logo, repository, status). The Components page renders from it, grouped by status.
  `downloads.json` stays hand-maintained; the check script (WEB-F-4) cross-references it against
  the registry.
* `scripts/generate_version_table.py`: regenerates `docs/develop/component-versions.md` from the
  `buildconfig` of `openflexo-buildplugin`, one column per release branch (Python standard library
  only, nothing runs at site build time). Re-run it when a branch's `buildconfig` changes or a
  release branch is added.
* The Components page warns that the per-component mini-sites date from 2023–2024. Only the seven
  adapters that ever had a mini-site (Diagram, EMF, OWL, HTTP, JDBC, PDF, Kafka) link to one; every
  other card links to its GitHub repository.

## WEB-F-4 — local check script

**Status:** DONE

`python3 scripts/check_site.py` (standard library only, `--offline` to skip the network) exits with
status 1 on any error. It checks: internal links, static assets and the redirect map against the
routes the build really produces; every external URL, download URLs included; the registry (fields,
statuses, logos); technology adapters used by `downloads.json` against the registry and, for 2.99,
each package's modules and adapters against `openflexo-packaging`; the snapshot date (consistent in
`downloads.json`, and warning when a newer one is published); that the two generated pages are what
their generators would write today; leftover placeholder text and empty sections; number prefixes in
file names and duplicate sidebar positions. The packaging and generated-page checks need
`openflexo-packaging`, `openflexo-buildplugin` and `openflexo-dev` cloned next to this repository
(`--workspace` to point elsewhere) and are skipped with a warning otherwise.

## WEB-F-9 — run the check in the Jenkins `website` job

**Status:** DEFERRED

The job only checks out this repository, so it could run `--offline` as is; the packaging and
generated-page checks need the sibling clones.

## WEB-F-10 — XX and DSL are archetypes, not adapters

**Status:** DONE

`XX` and `DSL` are templates to copy when writing an adapter. They are shipped by the Maintainer
package but appear nowhere on the site: removed from `downloads.json`, and ignored by the check
when it compares packages with `openflexo-packaging`.

## WEB-F-5 — Discover and Get started content

**Status:** IN PROGRESS, written in reviewable batches

* Batch 1 (done): Discover — what Openflexo is, model federation (terminology fixed), vocabulary,
  what you can build, the tools; FAQ corrected.
* Batch 2 (done): Discover — is Openflexo for me, maturity/licensing/support (dual GPLv3 or EUPL,
  best-effort support), roadmap (2.99 then 3.0), FAQ entries.
* Batch 3 (done): Get started — landing, download and install (with the choice of package), quickstart
  "first free model" (condensed from tutorial 1, not re-run on 2.99), choose your track. Caution banners
  added to the two tutorials written for 1.x.
* Batch 3b (postponed by the maintainers, to resume later — needs a current 2.99 Headless package to run
  against): quickstart "federate a spreadsheet" and quickstart "run an FML script from the command
  line". Both need to be written from a run on the current 2.99 packages: the spreadsheet tutorial is
  a 1.x tutorial (Viewpoint, ViewPointModeller) and the CLI has not been verified.
* Batch 4 (done): home page — slider kept, hero ("Federate, don't transform") with Download and Get
  started, latest release read from `downloads.json` (the version flagged `expanded`), three doors, the
  problem in one diagram, "See it at work", partners strip. Not done: latest news (the blog plugin is
  already used for the Downloads page, see below).
* Waiting for input: comparison with other tools, and the case studies (only the MULTI Process
  Challenge and the Cyber Threat Application have a page today).

## WEB-F-6 — where the user documentation of an adapter lives

**Status:** BLOCKED (open decision)

A catalogue on the main site, or everything in each adapter's own mini-site. Affects the technology
adapter section of the user guide once mini-sites are rebuilt.

## WEB-F-7 — confirm the status of the ODT adapter

**Status:** TODO

`openflexo-odt` was not classified by the architecture board review of 2026-04-03: it is marked
`unclassified` in `src/data/technology-adapters.json` until its status is confirmed.

## WEB-F-8 — repository map

**Status:** DONE

`docs/develop/repository-map.md` lists every repository with a one-line description, its GitHub
link and its status. It is generated by `scripts/generate_repository_map.py` from the committed
`settings.gradle` of `openflexo-dev` (grouping) and `src/data/technology-adapters.json` (adapter
descriptions and statuses); descriptions of all other repositories live in the script. The script
fails on a repository it has no description for.

## WEB-F-11 — switch the site when 2.99 is released

**Status:** TODO (at the 2.99 release)

2.99 becomes the stable version, 2.0.1 moves to history, snapshots of 3.0 appear. One pass over:
`src/data/downloads.json` (labels, `expanded`, new 3.0 version, snapshot date),
`docs/discover/roadmap.md`, `docs/discover/faq.md`, `docs/discover/maturity-licensing-support.md`,
`docs/discover/is-openflexo-for-me.md` (Java statements), `scripts/generate_version_table.py`
(notes, `JAVA_VERSIONS`), then regenerate the two generated pages and run
`python3 scripts/check_site.py`.

## WEB-F-12 — news / blog

**Status:** TODO — needs a decision

The site has no news, so nothing shows the project is alive. The single blog plugin instance is
configured as `blogTitle: 'Downloads'` in `docusaurus.config.js`. A real news feed needs either a
second blog instance with its own id and route, or moving Downloads off the blog plugin.

## WEB-F-13 — update the list of partners

**Status:** TODO — needs the current list

`src/data/partners.json` and the logos under `static/img/partners/` date from the early years of the
project. The page now lives at `/partners`, linked from the Community section and the footer, and is
no longer on the home page. Replace the list with the partners of today.

## WEB-F-14 — rebuild the tutorials for 2.99

**Status:** BLOCKED — waiting for a fresh set of screenshots

The tutorials show the interface of Openflexo 1.x and 2.0.x. Rebuild them for 2.99, starting with
tutorial 1, then 2 and 3; the spreadsheet and synchronisation tutorials must be rewritten, not only
re-illustrated (they still speak of Viewpoints). Screenshots: one window size, one theme, one
version (2.99, Java 8), sequential PNG files per tutorial, together with the list of actions
performed. Illustrations are then cropped, annotated and named consistently, and the text rewritten
around them.

## WEB-F-15 — research section

**Status:** IN PROGRESS

* Done: publications synchronised from HAL (`python3 scripts/update_publications.py` regenerates
  `src/publis/*.bib`, which the build turns into `src/data/papers.js` (`write_papers.js`), and that
  file itself; 20 documents, 2013–2026; two HAL records are excluded on purpose, listed with
  their reason in the script); the publications page shows PDF, DOI and BibTeX links and awards;
  contributions by theme; how to cite; reading guide of the overview updated.
* Publication thumbnails: page and script done (`update_publication_thumbnails.py`, process in
  `scripts/README.md`); all 23 thumbnails are done. HAL blocks scripts with an anti-robot check, so the PDFs of new
  publications are added by hand (see `scripts/README.md`).
* To do: publications grouped by theme as well as by year; project pages (Formose, Oneway, the ESA
  secure systems engineering framework, the Brest Métropole free-modeling project, others); the five
  use cases of the MODELS 2024 experience report as case studies; theses, internships and open
  positions; reproducibility (artefacts, datasets); teaching material. Needs input from the team.

## WEB-F-16 — Develop section

**Status:** IN PROGRESS

* Done: architecture overview, build and test (the commands and the `Results:` summary were run on
  `connie`), repository map, component versions, setup, code standards.
* Postponed: the technology adapter guides. There will be several, one per kind of adapter: the
  document adapters (the file is parsed into an object tree, `load` and `save` symmetric) and the
  service adapters (the resource only holds a connection, data is queried live), and within them the
  typed or metamodel-based, native PAMELA, office read/write and small document cases, each with its
  reference adapter. `docs/develop/guides/write-a-technology-adapter.md` stays the introduction and
  will link to them.
* The PAMELA guide belongs to the PAMELA mini-site, not to this section.
* To do later: the testing strategy page (unit and UI tests, the `.fmlscript` methodology with its
  `AutomatedTests` runner and test resource centers, the use-case projects and how to add one).
* To do, from the content plan: continuous integration, contribution workflow and a
  first-contribution walkthrough (need the real channels and starter issues), guides for Connie, Gina,
  Diana and for adding a construct to FML, API reference.

## WEB-F-17 — user guide: core concepts and the FML language

**Status:** IN PROGRESS

The user guide only had one concept page, the cookbook and the tutorials. It gains a section on
the FML language (`docs/guide/fml/`) and the core concepts, written in reviewable batches. Every
model and script shown is a test of the platform that runs each `assert` (in `openflexo-core` for
examples without a technology adapter, in the repository of the adapter for one adapter, in
`openflexo-integration-tests` for several).

* Batch 1 (in progress): the section index, "FML in ten minutes" and the language tour (file
  structure, namespaces, imports, typing space, name resolution) are written; the concept page
  "virtual model, flexo concept, properties, behaviours" remains.
* Next, in this order: declaring virtual models and concepts (inheritance, containment),
  properties, behaviours, the control graph and edition actions, queries (`select`), matching and
  synchronisation, expressions, annotations, FML-script, migrating `.fml.xml`.
* Later: grammar reference generated from the grammar, error catalogue, style guide.
