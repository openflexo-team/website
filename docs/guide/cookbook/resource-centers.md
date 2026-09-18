---
sidebar_position: 2
---

# Set up and share a resource center

A **Resource Center** is where Openflexo looks for resources and models: a directory on disk, or a
jar on the classpath. Every project, VirtualModel and technology-specific artefact (an Excel
workbook, an EMF metamodel, a diagram…) Openflexo can see comes from a resource center that has
been registered with it.

A jar-based resource center declares itself under
`META-INF/resourceCenters/org.openflexo.foundation.resource.FlexoResourceCenter`, with a
`defaultBaseURI` that must be unique across the whole classpath: `DefaultResourceCenterService`
silently skips any resource center whose base URI is already registered, so two resource centers
sharing a URI mask one another with no error. A directory-based resource center is simply pointed
at from the application's information space, and can be shared between users the same way any
folder can — by version control, a network share, or a synced drive.
