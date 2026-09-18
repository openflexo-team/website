---
sidebar_position: 4
---

# Translate the interface

Openflexo's user-facing text — menus, labels, messages — is localized through dictionaries of
key/value pairs, one language per file. Inside a VirtualModel, the same mechanism is available for
the concepts you author yourself: a `Localized` sub-resource, created on demand from the editor's
*Localize…* action, holds the translations for that VirtualModel's own labels, so a FlexoConcept or
a behaviour you write can be translated the same way the platform's own interface is. Until that
resource is created, Openflexo falls back to an in-memory localizer built from the default text.
