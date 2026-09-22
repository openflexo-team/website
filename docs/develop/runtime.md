---
sidebar_position: 2
title: Runtime
description: What happens when Openflexo starts, when a compilation unit is loaded, when a behaviour runs, and when a model change is applied.
---

# Runtime

[Architecture overview](./architecture) is the static map: layers and repositories. This page is
about what happens while Openflexo runs — start-up, the FML processing chain, executing a
behaviour, and applying a model change.

## Service manager start-up

![Service manager start-up](/img/architecture/08-service-manager-startup.png)

Services are registered one after the other, in a fixed order: the base services (localization,
editing, tasks, resources, projects), then the resource centers found on the classpath, then the
technology adapters — registered, but not yet activated — and the VirtualModel library, which
activates the FML adapter. The other services and the application editor follow.

**Technology adapters are activated on demand.** Once activated, an adapter scans every resource
center for the resources it knows how to read (see [Resources and their life
cycle](/docs/guide/concepts/resources)).

## The FML processing chain

![FML processing chain](/img/architecture/07-fml-processing-chain.png)

Loading a `.fml` file runs it through a **parser** and then a **semantic analysis** pass, which
resolves imports and types once every compilation unit's dependencies are parsed, giving the
in-memory FML model. Saving reverses it: a **pretty print** step turns the model back into `.fml`
text.

A compilation unit that fails to parse is not the same as one that fails validation: a
`ParserException` leaves an **empty** model behind, and that empty model then reports zero
validation errors. A clean validation report is not on its own proof that a `.fml` file parsed.

## FML execution engine

![FML execution engine](/img/architecture/09-fml-execution-engine.png)

Calling a behaviour builds a `FlexoBehaviourAction`, which runs the behaviour's control graph and
gives back the returned value. Firing an event goes through `FMLRunTimeEngine` to whatever listens
for it. **The engine runs in the calling thread**, and it registers every `VirtualModelInstance` it
creates along the way.

## The action layer

![The action layer](/img/architecture/13-action-layer.png)

Every change to a model made through the desktop application — as opposed to an FML behaviour
running its own edition actions — is an **action**: a `FlexoActionFactory` builds a `FlexoAction`
and says whether it is currently enabled, and a `FlexoEditor` performs it and records the undo. In
the interactive editor, performing an action starts an undo transaction, asks for the action's
parameters, executes it, then ends the transaction. **The headless editor only checks the factory,
then executes**: it has no undo to record.
