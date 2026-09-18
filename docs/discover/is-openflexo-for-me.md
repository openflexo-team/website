---
sidebar_position: 5
title: Is Openflexo for me?
description: Who Openflexo suits, and who should look elsewhere.
---

# Is Openflexo for me?

Openflexo is an infrastructure, not an off-the-shelf tool. This page helps you decide quickly, and
says plainly when the answer is no.

## Openflexo is a good fit if

* **Your information is spread over several technologies** (spreadsheets, XML files, ontologies,
  databases, diagrams, services) and you need to see it, check it or work on it as a whole,
  without moving it all into a single format.
* **You need models to stay consistent** while the teams that own them keep their own tools.
* **You want a graphical editor for your own domain-specific language**, and to refine the language
  as you use it, without writing an editor by hand.
* **You work on model-based engineering**, in a research or engineering context, and are ready to
  learn a modeling language (FML) to describe how your models relate.
* **A technology adapter exists for your sources**, or you are ready to write one. The
  [repository map](/docs/develop/repository-map) shows what exists and how mature it is.

## Look elsewhere if

* **You need a guaranteed level of support.** Support is best effort: see
  [maturity, licensing and support](./maturity-licensing-support).
* **You only need to convert a file from one format to another, once.** Federation pays off when
  models live on and change; a one-off conversion does not need it.
* **Your sources have no adapter and you cannot write one.** An adapter is a Java component; the
  [guide to writing one](/docs/develop/guides/write-a-technology-adapter) is aimed at developers.
* **You need Java 11 or later today.** Openflexo 2.99 runs on Java 8 only and freezes at startup on
  newer versions; Java 17 or later is planned for 3.0 (see the [roadmap](./roadmap)).
* **You need a web application.** The applications are desktop applications. The
  [HTTP server](./tools) exposes the infrastructure through a REST API, but it is not a web
  interface.

## Two questions to ask yourself

1. *Which sources do I need to connect?* Check each of them against the
   [technology adapters](/docs/develop/repository-map) and their status.
2. *Who will write the FML?* Building a graphical model or a diagram editor needs no programming.
   Federating your own sources means writing FML, which is closer to programming.

If both answers are clear, [get started](/docs/get-started).
