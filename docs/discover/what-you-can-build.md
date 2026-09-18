---
sidebar_position: 4
title: What you can build
description: Five things model federation is used for, with the examples that come with Openflexo.
---

# What you can build

Model federation is a way to reuse models and make them interact, while controlling what propagates
between models, slots and concepts. The propagation can be automatic, triggered by the user, or
controlled through dialogs. In practice, this gives five kinds of results.

## Dashboards over heterogeneous sources

Collect data from a spreadsheet, a database, an XML file and a service into one virtual model, and
present it in one place. Values are retrieved from their sources when needed rather than copied into
a new format, so the dashboard reflects the sources as they are.

## Synchronised models

Two models that describe overlapping things, in two tools or two formats, can be kept in step by
defining the synchronisation rules as a model between them. The rules say what corresponds to what
and what happens when one side changes.

*Example.* The test suite of Openflexo includes a use case that synchronises two EMF models, with
scripts that load them, generate a counterpart, synchronise, and undo the federation. An older tutorial,
[Working on model mapping](/docs/guide/tutorials/model-mapping-and-sync), walks through the idea.

## Consistency checking

Checking properties among models is a generalisation of synchronisation: instead of making two
models agree, the federation is used to verify that they do. It is an alternative to traces between
tools and to verification by hand.

## New models computed from existing ones

A virtual model can select information from several models, point of view by point of view, and
compute new information that exists in none of them.

*Example.* The digital-twin demonstration federates two files owned by two teams that do not talk to
each other: an XML description of a packaging line (a subset of AutomationML) and a maintenance
workbook (an Excel file with an asset register, timestamped readings and interventions). Which
equipment is critical, which one is drifting, and which one to fix first are properties computed by
the virtual model. They are written in neither file, and the workbook contains no formula.

## Graphical editors without writing code

Because Openflexo separates a concept from the way it is drawn, you can build a graphical
editor for your own domain-specific language and refine the language while you use it.

*Examples.* The tutorials build a
[diagram editor](/docs/guide/tutorials/diagram-editor-without-code) and a
[Petri net editor](/docs/guide/tutorials/petri-net-editor) with the FreeModellingEditor. The
[MULTI Process Challenge](/docs/research/challenges/multi-process-challenge) solution provides a
graphical editor for process types and another for enacted processes, both built with Openflexo.

## Where to go from here

* The [tools](./tools) you would use to build these.
* [Get started](/docs/get-started), then the [tutorials](/docs/guide/tutorials/first-free-model).
* The [vocabulary](./vocabulary), if the words above are new.
