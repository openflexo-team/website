# Known defects — website

Prefix `WEB-D-<n>`, never reused. Status: `TODO` · `IN PROGRESS` · `BLOCKED` · `DONE` · `DEFERRED`.

## WEB-D-1 — dead downloadable inputs on the EMF cookbook page

**Status:** TODO

`docs/guide/cookbook/package-emf-metamodel.md` originally linked two downloadable inputs
(`universe.ecore`, `emf.properties`) served by the project's old TikiWiki site
(`tiki-download_file.php?fileId=…`). Both are gone; the links were already dead (commented out) in
the source before this move. The walkthrough itself is otherwise accurate. **Fix:** re-host the two
files (or produce fresh equivalents) and restore the links.

## WEB-D-2 — mini-site pipeline: skeletons not in any repository

**Status:** DEFERRED (mini-sites are out of scope for the main-site rebuild)

The 15 Docusaurus skeleton projects (config, theme, navbar, `versioned_docs`) that the Jenkins
`website` job's `WEBSITE` switch builds from live only on a build agent's local disk, in no git
repository. A rebuilt agent loses all 14 mini-sites (the main site is separately in this repo); the
published `versioned_docs` for 1.5.0.1 and 1.6 exist nowhere else. Last located 2026-09-10 on
`of-runner-1-vm`, which is no longer a Jenkins agent — whether they still exist is unverified.

## WEB-D-3 — mini-site pipeline: 8 of 14 build cases copy from deleted source directories

**Status:** DEFERRED (same scope note as WEB-D-2)

The `openflexo-technology-adapters` case in the `website` job's switch copies from
`docxconnector/`, `excelconnector/`, `odtconnector/`, `oslcconnector/`, `powerpointconnector/`,
`xmlconnector/`, `dsl-ta/` — that repository now contains exactly one module, `xx-ta`. The `-emf`,
`-jdbc`, `-kafka`, `-pdf` cases point at source directories removed from their repos years ago.

## WEB-D-4 — mini-site pipeline: hard-coded SNAPSHOT constants have drifted

**Status:** DEFERRED (same scope note as WEB-D-2)

13 of the 14 `SNAPSHOT` constants in the `website` job's switch (deciding whether a copy also lands
in the unversioned `docs/`) no longer match any real Jenkins job version — e.g. `1.6.1-java-11` for
pamela, `2.1.0` for the technology adapters, while Jenkins actually builds those repos at other
versions today.

## WEB-D-5 — mini-site pipeline: publication is additive, deleted pages are immortal

**Status:** DEFERRED (same scope note as WEB-D-2)

The `website` job's `rsync -r` to `www-test` has no `--delete`; a page removed from source stays on
staging forever and is then promoted to production by `website-production`, which does use
`--delete` and faithfully copies the accumulated debris.

## WEB-D-6 — reference-documentation generator's entry point does not exist

**Status:** DEFERRED (blocks per-component reference documentation, not the main site)

`openflexo-packaging/doc-generator` declares `mainClassName = "org.openflexo.util.GenerateAll"`,
which is not in the module (only `GenerateReferenceDocumentation` and
`GenerateLatexDocumentation` exist). `gradlew run` fails outright. `GenerateReferenceDocumentation`
also wires exactly three technology adapters by hand, with several others commented out.
