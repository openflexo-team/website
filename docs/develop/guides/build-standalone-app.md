---
sidebar_position: 3
---

# Build a standalone application on the infrastructure

Openflexo's own applications — the Free Modelling Editor, the Openflexo Modeller, the Enterprise
Architecture editor, the four modelers — are not special-cased: each is a **package**, assembling
the modules and technology adapters it needs on top of the same `openflexo-core` federation engine,
and launched through the single entry point `org.openflexo.Flexo`. Building your own standalone
application means defining a new package the same way, in `openflexo-packaging`, choosing which
modules and technology adapters it bundles. There is no project wizard for this yet; the existing
packages under `openflexo-packaging/packages/` are the reference to read and copy from.
