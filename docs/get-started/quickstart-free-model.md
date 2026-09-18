---
sidebar_position: 3
title: "Quickstart: your first free model"
description: Create a project in the FreeModellingEditor, draw a model, and turn shapes into concepts.
---

# Quickstart: your first free model

In about fifteen minutes you will draw a small model, declare two concepts from it, and get a
graphical editor for them, with no code and no modeling language chosen in advance. You need the
**FreeModellingEditor** or **Openflexo Designer** package
([download and install](./download-and-install)).

:::note

This walkthrough condenses [Tutorial 1](/docs/guide/tutorials/first-free-model), which was written
for Openflexo 2.0.x and has the screenshots. Menus may differ slightly in 2.99.

:::

## 1. Create a project

Launch Openflexo. On the welcome screen, choose the **FreeModellingEditor**, then **New project**,
and pick a name and a directory. A wizard asks for the project's name, URI and description, then
for a virtual model: choose an existing one or create a new one. The FreeModellingEditor opens with
your project in the explorer on the left.

## 2. Create a free model

Right-click the project and choose **Create diagram free model**, then give it a name. It opens in
a new tab. (You can also start from a PowerPoint slide with **Create ppt free model**: the shapes of
the slide are imported.)

Right-click the free model and choose **Instantiate diagram free model**, name the diagram, and you
are in the drawing area.

## 3. Draw

The window has an explorer of your free models, the list of instances in the drawing, the list of
declared concepts, the drawing area in the middle, three palettes of shapes, and the graphical
properties of the selected shape. Drag shapes from the **Free shapes** palette into the drawing
area, and change their look from the properties pane. What you draw is a model, not yet a language.

## 4. Turn shapes into concepts

Right-click a shape and choose **Create new concept**; give it a name and a description. Do it for a
second shape. Your concepts appear in the concepts pane, and the shapes you have not classified stay
under the *None* concept.

To say that another shape is an instance of an existing concept, right-click it and choose
**declare as an instance of existing concept**, then pick the concept and how the shape should be
represented: take the concept's shape, redefine the concept's shape with this one, or keep its own.
Changing a concept then changes all its instances.

## 5. Use your new editor

Open the concepts palette at the top right: you can now drag your concepts into the drawing like in
any graphical editor. You have just built a small graphical editor by drawing.

## Next

* Go further with [Tutorial 2](/docs/guide/tutorials/diagram-editor-without-code), which builds a
  diagram editor without writing code.
* Not sure where to go? [Choose your track](./choose-your-track).
