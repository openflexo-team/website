---
sidebar_position: 2
title: Resources and their life cycle
description: What a FlexoResource is, the states it goes through from discovery to save, and who notifies whom.
---

# Resources and their life cycle

A **resource** is anything Openflexo can read and, when the technology allows it, write: an Excel
workbook, an XML document, an FML model itself. Every resource goes through the same states,
whichever technology it belongs to.

![Life cycle of a resource](/img/architecture/04-resource-lifecycle.png)

## From discovery to save

A **technology adapter** scans every registered **resource center** for the resources it knows how
to read, and registers each one it finds. A registered resource is known but not yet read: its
data is not in memory. From there:

- **load** reads the data into memory — the resource is now **loaded**;
- **edit** changes it in memory — the resource is now **modified**, with unsaved changes;
- **save** writes it back and returns the resource to **loaded**;
- **unload** frees the data in memory and returns the resource to **registered**, without saving.

**Every step notifies the observers of the resource** — `notifyResourceWillLoad`,
`notifyResourceLoaded`, `notifyResourceModified`, `notifyResourceSaved`,
`notifyResourceUnloaded`. A resource center, an inspector, or a model that federates the resource
is told when it changes state, and can react — this is what lets a virtual model stay in step with
a resource edited outside Openflexo.

## Where this matters when writing FML

A property [bound to a resource](/docs/guide/fml/properties#properties-bound-to-a-resource) reads
and writes through this same life cycle: reading it may load the resource it comes from, and
writing it marks that resource modified. Setting up a resource center in practice — a directory or
a jar declaring one — is covered in the
[cookbook](/docs/guide/cookbook/resource-centers).

## What you have seen

A resource is registered by the technology adapter that scans the resource center holding it, then
moves between loaded, modified and back to loaded as it is read, edited and saved, and back to
registered when unloaded. Every transition notifies the resource's observers.
