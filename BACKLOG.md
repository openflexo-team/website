# Backlog — website

Prefix `WEB-F-<n>`, never reused. Status: `TODO` · `IN PROGRESS` · `BLOCKED` · `DONE` · `DEFERRED`.
Full target content plan: `.claude/epics/WebSiteRefactoring/Plan.md` §4 (in the workspace root, not
this repo).

## WEB-F-1 — write the Oneway research project page

**Status:** TODO

`docs/research/projects/oneway.md` was deleted during the 2026-09 IA move rather than left with
fabricated content — the site's sources held nothing about the project beyond its name ("Some
text" as a placeholder). Needs a real problem statement, contribution and links, the same shape as
`docs/research/projects/cta.md`.

## WEB-F-2 — write the Formose research project page

**Status:** TODO

Formose exists today only as two footer links (project site, prototype download). Plan §6.5 calls
for an actual page alongside the other research projects.

## WEB-F-3 — TA registry, generated version table, Components page warning

**Status:** DONE (2026-09-18), one follow-up open — see WEB-F-7

Built: `src/data/technology-adapters.json` (23 adapters, id/name/description/logo/repository/status)
feeding the Components page, grouped and badged by status; `scripts/generate_version_table.py`
(stdlib-only, `git show`s `openflexo-buildplugin`'s buildconfig at three branches, no npm/Node
involved) regenerating `docs/get-started/versions.md`; the "content dates from 2023–2024" warning
on the Components page, naming exactly the 7 adapters (Diagram, EMF, OWL, HTTP, JDBC, PDF, Kafka)
that ever had a mini-site built — every other card links to its GitHub repository instead of a
fabricated mini-site URL. **Not done**: wiring the registry into `downloads.json`/`downloads.js` —
that page is explicitly hand-maintained by decision, so the registry instead becomes something the
check script (WEB-F-4) cross-references it against, not something it renders from at runtime.

## WEB-F-7 — confirm status of three unclassified technology adapters

**Status:** TODO — needs the user

`src/data/technology-adapters.json` has three repositories present on disk (`openflexo-http`,
`openflexo-odt`, `openflexo-gina`) that the 2026-04-03 architecture board minutes, as captured in
`Plan.md` §4.4 section 10, never classified into any of the five status buckets. Marked
`"unclassified"` for now rather than guessed. Needs the user to say which bucket each belongs in
(or confirm "unclassified" is fine to keep showing as-is).

## WEB-F-4 — local, dependency-free check script

**Status:** TODO (phase 1, step 4)

Python or shell, no npm dependency, non-zero exit on error: dead internal/external links (incl. the
redirect map and every download URL), package↔TA drift vs `openflexo-packaging`, registry entries
missing a logo or TAs absent from the registry, a stale version table, leftover placeholder text,
and a downloads snapshot date older than the latest on `downloads.openflexo.org` (warning only).

## WEB-F-5 — Discover and Get started content

**Status:** TODO (phase 1, step 5 — one reviewable batch at a time)

The `[new]` items of Plan §4.3 groups 1–3: Home, Discover, Get started. Several pages already exist
as placeholders in the new IA (`docs/get-started/index.md`, `docs/discover/faq.md`) pending this
pass.

## WEB-F-6 — decide where adapter user documentation lives

**Status:** BLOCKED (open decision, Plan §4.2 — ask before scheduling)

Catalogue on the main site vs. everything in each adapter's mini-site. Affects `docs/guide/`
§4.3 (technology adapters) once mini-sites are back in scope.
