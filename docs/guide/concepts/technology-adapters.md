---
sidebar_position: 3
---

# Technology adapters

A **Technology Adapter** (TA) is what lets a VirtualModel federate a given kind of external
resource — a spreadsheet, an XML document, an EMF metamodel, a database, an OWL ontology, and so
on. From a modeler's point of view, a TA is a contract: it offers one or several **ModelSlots** to
connect a resource to a VirtualModel, and each ModelSlot in turn offers the roles, fetch requests
and behaviours you can use in FML to read, create, update and delete data in that resource, and to
be notified when it changes outside Openflexo.

Which ModelSlot a TA offers depends on how the resource's structure is described: a **Free**
ModelSlot when the structure is an external meta-model defined as a Java API, a **Type-aware**
ModelSlot when it is described in a non-Java format such as an XML Schema, and a **Reflected**
ModelSlot when there is no external meta-model at all — the FML VirtualModel itself defines the
structure. The [technology adapter authoring guide](/docs/develop/guides/write-a-technology-adapter)
covers the same distinction from the other side, for whoever is writing a new TA.

Every TA follows the same module template, found at run time through Java's `ServiceLoader`:

![Technology adapter template](/img/architecture/05-ta-template.png)

The `-ta` module is the adapter core: the technology model (what the technology contains), the
resources it loads and saves, and the FML integration — the model slots, roles and edition actions
described above. `-ta-ui` is its user interface, and `-ta-test` its `.fmlscript` tests, the same
kind of test every FML example on this site is proved by.
