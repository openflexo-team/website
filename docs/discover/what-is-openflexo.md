---
sidebar_position: 1
title: What Openflexo is
description: Openflexo is an open-source infrastructure to federate models that live in different tools and formats, without converting them.
---

# What Openflexo is

**Openflexo is an open-source infrastructure for model federation.** It lets you connect models that
live in different technologies (spreadsheets, XML files, ontologies, databases, diagrams…) and work
with them together, without exporting them or converting them into a common format first.

## The problem it addresses

A complex system is never described by one model. Requirements, architecture, safety analyses,
schedules, costs and maintenance records each live in their own tool, in their own format, owned by
a different team. Keeping them consistent usually means writing and maintaining chains of
transformations, or checking by hand.

Openflexo takes another route. Each model **stays where it is**, in its original technology, and
remains autonomous. A *federated* model does not have to own the values of its elements: it declares
how to get them from the models that hold them, when they are needed, and how to send changes back.

## How it works, in short

1. A **technology adapter** gives Openflexo access to one kind of resource: reading it, and, where
   the adapter supports it, creating, updating and deleting its content, and being notified when it
   changes outside Openflexo.
2. A **virtual model**, written in **FML** (the Flexo Modeling Language), describes the concepts you
   care about and, for each property of each concept, which source it comes from.
3. Openflexo runs the virtual model: it retrieves, combines, computes and propagates information
   between the sources, and it can drive graphical editors on top of it.

The [model federation](./model-federation) page explains the idea with figures, and the
[vocabulary](./vocabulary) page defines each term.

## What the platform contains

Openflexo is not a single application but a set of components that stack on one another:

* **Generic frameworks**, useful outside model federation: Connie (expression language), Pamela
  (modeling framework), Gina (user interfaces) and Diana (diagrams).
* **The federation core**, which runs FML.
* **Technology adapters**, one per kind of resource: Excel, Word, PowerPoint, XML, EMF, OWL, JDBC,
  REST and others.
* **Applications** built on all of the above, such as the FreeModellingEditor and the Openflexo
  Modeller (see [the tools](./tools)), a command-line interpreter and an HTTP server.

Each of these lives in its own repository and has its own version; the
[repository map](/docs/develop/repository-map) lists them. You do not download them one by one: they
come in ready-to-run [packages](/downloads).

## What Openflexo is not

* **Not a replacement for your modeling tools.** Your spreadsheet stays a spreadsheet and your UML
  model stays in its UML tool. Openflexo connects them.
* **Not a single fixed language or method.** FML describes how models relate; the models themselves
  keep their own languages.
* **Not a finished, closed product.** It is an infrastructure that grew out of research work (see
  [Research](/docs/research)). The core and the frameworks are released under the GNU General
  Public License version 3, and the components are at different levels of maturity: each
  [technology adapter](/docs/develop/repository-map) carries a status.

## Where to go next

* Try it: [download a package](/downloads) and start with [Get started](/docs/get-started).
* See what it can do: [what you can build](./what-you-can-build).
* Understand the science behind it: [Research](/docs/research).
