---
sidebar_position: 7
title: Maturity, licensing and support
description: How mature each part of Openflexo is, under which licence it is available, and what support to expect.
---

# Maturity, licensing and support

## Maturity

Openflexo is an infrastructure made of components that do not all evolve at the same pace.

* **Releases and snapshots.** A release is cut at the end of a QA cycle, once a version is considered
  stable; before it, release candidates (`-RCx`) are built. Snapshot builds (`-SNAPSHOT`) are the
  daily development builds: they change from one day to the next. The
  [Downloads page](/downloads) says which kind each package is. The
  [roadmap](./roadmap) explains what each version means.
* **Technology adapters** each carry a status, decided by the architecture board: *stabilised*,
  *migration in progress*, *active development*, *limited support* or *retired*. The
  [repository map](/docs/develop/repository-map) gives the status of every adapter with its
  definition, and the [components page](/docs/develop/components) shows them by group.
* **Research origin.** Openflexo grew out of research work on model federation, and some
  components are research prototypes: the repository map marks them as such.

Before relying on a component, look at its status. A *stabilised* adapter is complete and stable; an
adapter in *migration* or *active development* may change.

## Licensing

Openflexo is available under a **dual licence**: you may use it, at your choice, under the
**GNU General Public License version 3 (GPLv3)** or the **European Union Public Licence (EUPL)**.

Third-party components that Openflexo uses keep their own licences.

## Support

Support is **best effort**. Openflexo is maintained by a small team and by contributors, and there
is no service level or guaranteed response time.

* Report a problem or ask a question on **GitHub**, in the repository of the component concerned
  (the [repository map](/docs/develop/repository-map) links each of them), or in the
  [website repository](https://github.com/openflexo-team/website/issues) for anything about this
  site. Say which version you use and how to reproduce the problem.
* For anything else, [contact us](mailto:contact@openflexo.org).
* You can also [get involved](/docs/community/get-involved): documentation, testing and code
  contributions are the fastest way to see a problem fixed.
