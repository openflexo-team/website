---
sidebar_position: 3
title: Vocabulary
description: The terms used across the Openflexo documentation, and how they relate to the words you already use.
---

# Vocabulary

Openflexo has its own words for ideas you probably already know. This table maps them.

| Usual name | Openflexo name | What it is |
|---|---|---|
| model | **virtual model** | a model made of concepts whose properties come from other models |
| concept | **flexo concept** | a concept of a virtual model, with its properties and behaviours |
| port | **model slot** | the connection between a virtual model and a resource |
| connector | **technology adapter** | the component giving access to one kind of resource |

## Federation

**Model.** Any source of information is a model: a spreadsheet, an XML document, a database, a
drawing. How its content is interpreted can be explicit (a schema) or implicit; technology adapters
are there to give it meaning.

**Technology adapter (TA).** The contract Openflexo has with one kind of resource (Excel files, XML
documents, EMF models…). It offers one or several model slots, and through them the operations to
read the resource and, where supported, create, update and delete its content and be notified of
changes. Adapters are also called connectors. Each one has a status, see the
[repository map](/docs/develop/repository-map).

**Resource.** An external source of information managed by Openflexo but not stored by it: a file, a
database, a server.

**Resource center.** A place Openflexo looks for resources and models: a directory, or a jar on the
classpath. Everything Openflexo can see comes from a registered resource center.

**Model slot.** The port through which a virtual model reaches a resource. There are three kinds:

* a **free** model slot, when the structure of the data is an external meta-model written as a Java
  API;
* a **type-aware** model slot, when the structure is described in another format, such as an XML
  Schema or a JSON Schema;
* a **reflected** model slot, when there is no external meta-model and an FML virtual model itself
  defines the structure.

**Virtual model.** The model in which federation happens. It is made of flexo concepts and declares
its model slots.

**Flexo concept.** A concept of a virtual model. Its **properties** can be plain values, links to
other concepts, or values read from a model slot, or computed. Its **behaviours** describe what can
be done with it: creating and deleting an instance, running an action, navigating.

**Virtual model instance.** The running side of a virtual model: the concrete instances of its
concepts, bound to actual resources. It can be saved and loaded again.

## Languages

**FML** (Flexo Modeling Language). The textual language in which virtual models and flexo concepts
are written (`.fml` files). It is the language that connects the models.

**FML script.** The imperative side of FML (`.fmlscript` files): commands and scripts to load
resources, run behaviours and check results, used from the command line and in tests.

## The frameworks underneath

**Connie.** The expression language and binding framework: the expressions you write in FML are
evaluated by Connie.

**Pamela.** The modeling framework on which Openflexo's own model objects are built.

**Gina.** The framework for user interfaces, used by the Openflexo applications.

**Diana.** The framework for diagrams and 2D drawings.

The [repository map](/docs/develop/repository-map) lists the repository of each of them.
