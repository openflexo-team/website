---
sidebar_position: 6
title: The tools
description: The applications built on the Openflexo infrastructure, and which package contains which.
---

# The tools

The applications below are built on the same infrastructure. Each package on the
[Downloads page](/downloads) bundles some of them with a set of technology adapters.

## FreeModellingEditor

A metamodelling tool: you start from a simple drawing, or from a PowerPoint slide, and let the
concepts emerge as you go, without choosing a modeling language first. It is the smallest package
and the natural first step; see the first [tutorial](/docs/guide/tutorials/first-free-model).

## Openflexo Modeller

The tool to build model federations with FML and to run them through generic interfaces. This is
where virtual models are written, connected to resources through technology adapters and executed.

## Enterprise Architecture module

A module to design with out-of-the-box enterprise architecture models.

## Modelers

Graphical modelers for BPMN, UML, statecharts and OWL, themselves defined with Openflexo. They live
in the `modelers` repository (see the [repository map](/docs/develop/repository-map)).

## FML command line

A headless interpreter of FML: a terminal in which you load resources, run behaviours and execute
FML scripts, with no graphical interface. It is what automated tests and scripted use rely on.

## Openflexo Server

An HTTP server that exposes the infrastructure through a REST API. It is delivered as a Linux
archive only.

## Which package contains what

| Package | Contains |
|---|---|
| FreeModellingEditor | the FreeModellingEditor |
| Openflexo Designer | the three applications above (FreeModellingEditor, Openflexo Modeller, Enterprise Architecture module) and the most common technology adapters |
| Openflexo Headless | the FML command line and the most common technology adapters |
| Openflexo Maintainer | everything, for developers of the infrastructure |
| Openflexo Server | the HTTP server |

If you are not sure which one to pick, choose **Openflexo Designer**. The exact list of
technology adapters of each package, per version, is on the [Downloads page](/downloads).
