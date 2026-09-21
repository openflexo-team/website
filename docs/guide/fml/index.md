---
sidebar_position: 0
title: The FML language
description: What FML is, what it is for, and how this part of the guide is organised.
---

# The FML language

**FML** (Flexo Modeling Language) is the language in which you describe a virtual model: the
concepts it defines, what they know, what they can do, and which resources it federates. It is an
object-oriented modeling language: a **concept** plays the part of a class, its **properties** are
the attributes of the class and its **behaviours** are its methods. FML is also *interpreted*:
a model is executed by the Openflexo runtime, which creates instances of its concepts and runs
their behaviours.

Two things set FML apart from a general-purpose language:

- **It is statically typed, and the types reach outside the language.** Every property, parameter and
  behaviour has a type, and the types offered by the technology adapters you use (a spreadsheet cell,
  an XML element, an EMF class…) are types of FML like any other.
- **Its instructions can act on external resources.** Technology adapters bring their own
  operations, which you compose with ordinary control structures to read, create, update and delete
  data in the resources you federate.

## Where to start

- [Virtual models and concepts](/docs/guide/concepts/virtual-models-and-concepts) explains what a
  virtual model, a concept, a property and a behaviour are, without the syntax.
- [FML in ten minutes](/docs/guide/fml/fml-in-ten-minutes) writes a complete, runnable model of about thirty
  lines, and explains each line.
- [Language tour](/docs/guide/fml/language-tour) follows a file from the top: its layout, namespaces
  and imports, the types it can name, and how a name is resolved inside a behaviour.
- [Declaring models and concepts](/docs/guide/fml/declaring-models-and-concepts) covers annotations,
  nested and contained models, abstract concepts and inheritance.
- [Properties](/docs/guide/fml/properties) covers the kinds of properties, their initial values and
  how they are read and written.
- [Behaviours](/docs/guide/fml/behaviours) covers parameters, calls, creation and deletion, and events.
- [Control flow and instructions](/docs/guide/fml/control-flow) covers the statements of a body,
  conditions, loops, the instructions that act on models, and the constructs that do not behave as
  in Java.

## FML and FML-script

Two textual forms share the same grammar:

- **FML** (`.fml` files) *defines* a model: the concepts, their properties and their behaviours.
- **FML-script** (`.fmlscript` files) *drives* the runtime: it loads resources, creates instances,
  calls behaviours and checks values.

This part of the guide is about the first one. FML-script only appears where an example needs it,
to show the model at work.

## About the examples

Every example of this guide is a file that the automated tests of the platform load and run,
checking each value the text states. A model shown on a page is the content of that file, without
its header comment.
