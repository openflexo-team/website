---
sidebar_position: 3
description: Build a domain-specific language for Petri nets end to end, from an informal sketch to a graphical editor that executes and animates its models.
---

# Tutorial 4 : Build a Petri net language with the FreeModellingEditor

Most modelling languages are built one layer at a time, with a different tool for each layer: a notation, a metamodel, an editor, then some code that gives the models a meaning. In this tutorial you build all of them, end to end, in Openflexo. You start from an informal drawing and finish with a domain-specific language (DSL) for Petri nets, with its graphical editor and its execution, animated in that same editor.

1. **Sketch.** Draw a first Petri net with plain shapes ([steps 3 to 5](#step-3) and [7 to 9](#step-7)).
2. **Metamodel.** Turn the shapes into concepts, properties and relations, then refactor them ([steps 6 to 13](#step-6)).
3. **Graphical editor.** Each concept gets its own representation and its palette entry, built along the way.
4. **Instantiation.** Drop concepts from the palette to edit new Petri nets ([step 14](#step-14)).
5. **Semantics.** Write in FML what it means to fire a transition ([steps 15 and 16](#step-15)).
6. **Execution.** Fire transitions from the diagram ([step 18](#step-18)).
7. **Animation.** Show tokens and weights on the diagram while it runs ([steps 17 and 18](#step-17)).

Nothing here needs code until the semantics step. The first fourteen steps are done with the mouse: you draw, and the editor writes the model for you. Then you open the model, read the FML it produced, and add the behaviour by hand.

### What you will have at the end

* a conceptual model of Petri nets: places, transitions, and input and output edges with a weight;
* a graphical editor for it, with a palette, inspectors and example diagrams;
* an execution engine: a transition fires when its input places hold enough tokens;
* the finished project, `PetriNet.prj`, to compare with yours, in the [`tutorials-rc` module of openflexo-integration-tests](https://github.com/openflexo-team/openflexo-integration-tests/tree/2.99/tutorials-rc/src/main/resources/PetriNet.prj).

### Before you start

Install an Openflexo 2.99 distribution from the [download page](https://www.openflexo.org/download.html). Nothing else is required.

## 1. Create the project {#step-1}

Launch **Openflexo Designer**. The welcome panel lists the available modules. Select **FreeModellingEditor**, then click **New project**.

![Openflexo welcome panel with the Free Modelling Editor module selected](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/1-WelcomePanel.png)

*The welcome panel, with the Free Modelling Editor module selected.*

Choose any directory and create a project named `PetriNet`. In the wizard, set:

- **Project name**: `PetriNet`
- **Project uri**: `http://www.openflexo.org/test/PetriNet.prj`

![Create openflexo project wizard filled with PetriNet](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/2-CreateOpenflexoProject.png)

*The Create openflexo project wizard.*

Click **Finish**. The project opens in the module.

## 2. Give the project the Free Modelling nature {#step-2}

The project exists, but it is still a plain Openflexo project. Click **Gives your project the "Free Modelling" nature**.

![Project page offering to give the project the Free Modelling nature](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/3-WelcomePanel2.png)

*The project page before it has the nature.*

A two-step wizard opens.

### Step 1 of 2: the conceptual model

This is the model that will hold the Petri net concepts. Keep **CreateNewVirtualModel** and name it `PetriNet`. Click **Next**.

![Wizard step 1: create a new virtual model named PetriNet](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/4-DefineConceptualModel.png)

*Step 1: the conceptual model to feed.*

### Step 2 of 2: the sample data

The sample data are instances of the conceptual model. You will create them from a first example. Keep **CreateNewVirtualModelInstance** and name it `MyPetriNet`. Click **Finish**.

![Wizard step 2: create a new virtual model instance named MyPetriNet](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/5-DefineSampleData.png)

*Step 2: the sample data.*

You are now editing a new conceptual model, `PetriNet`, whose instances you will create from a first example, `MyPetriNet`. The project browser shows both resources:

```text
PetriNet
├─ PetriNet.fml  conceptual model
└─ MyPetriNet.fml.rt  sample data
```

## 3. Create a diagram {#step-3}

The project page now lists the conceptual model, the sample data and the free models, with three ways to start: **New diagram**, **Import ppt slide** and **Import excel**. Select **New diagram**.

![Project page with New diagram, Import ppt slide and Import excel buttons](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/6-WelcomePanel3.png)

*The project page after the wizard.*

Name the free model `FreeModel` and click **Finish**.

![Instantiate free model with a diagram wizard](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/7-InstantiateFreeModelWithADiagram.png)

*The free model wizard.*

## 4. Find your way around the editor {#step-4}

The *Free Modelling Editor* opens on a blank diagram named `Example`. The window has six areas.

![The Free Modelling Editor on a blank diagram, with six areas outlined in red](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/8-BlankDiagram.png)

*The editor on the blank `Example` diagram. The red frames match the list below.*

1. **Diagram.** The central window, where you draw.
2. **Main browser.** The project and its resources.
3. **Represented concepts.** The concepts shown in this diagram, with their instances.
4. **All concepts.** The model, or metamodel, you are building.
5. **Palettes.** Represented concepts, available concepts and free shapes, used to edit the diagram.
6. **Inspectors.** Conceptual and graphical properties of the selection.

## 5. Draw the first place {#step-5}

A Petri net has *places*, drawn as circles, and *transitions*, drawn as bars. Start with a place: drag a circle from the palette and drop it on the diagram.

![The diagram with a circle labelled P](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/9-FirstPlace.png)

*A circle dropped on the diagram. Double-click its label to rename it.*

Double-click the label `unnamed` and change it to `P`. Then change the background colour in the **Background** inspector.

![The place P with a pink background and the Background inspector open](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/10-FirstPlaceChangeBackground.png)

*The place with its new background colour. In Represented concepts, `P` is still Unclassified.*

## 6. Turn the shape into a concept {#step-6}

So far `P` is only a drawing. To give it a meaning, make a concept out of it: select the shape `P`, right-click and choose **Create new concept**.

Name the concept `Place` and give it a description, for example *Represent a place in a Petri Net*. Click **Finish**.

![Create new concept wizard filled with Place](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/11-CreatePlace.png)

*The Create new concept wizard.*

The shape is no longer *Unclassified*: it is now an instance of the new concept `Place`. The concept has a property `name`, whose value is `P` for this instance.

![P is now an instance of the Place concept](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/12-PlaceHasBeenCreated.png)

*`P` is an instance of `Place`, listed under the concept in Represented concepts. The concept appears in All concepts.*

## 7. Draw a transition {#step-7}

Now add a shape for the transition. Choose a rectangle with a label above it, fill it in black, remove its shadow, and label it `t` (for transition).

![A black rectangle labelled t next to the place P](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/13-DrawFirstTransition.png)

*The transition shape, still Unclassified.*

Conceptualise this shape too: right-click it, choose **Create new concept** and create the concept `Transition`.

![Create new concept wizard filled with Transition](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/14-CreateNewTransition.png)

*The wizard, filled in for `Transition`.*

![t is now an instance of the Transition concept](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/15-TransitionHasBeenCreated.png)

*`t` is an instance of `Transition`, with a `name` property whose value is `t`.*

The *Concepts* palette on the right now offers a `Place` and a `Transition`.

## 8. Add a second place {#step-8}

Switch to the **Concepts** palette and drop a new place on the diagram. Name it `P2`. Rename the first place from `P` to `P1`, either in the inspector or directly on the diagram.

![The diagram with P1, the transition t and P2](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/16-NewPlaceP2.png)

*Two instances of `Place` and one `Transition`.*

## 9. Draw an edge {#step-9}

Create an edge from `P1` to `t`. Hold the **CTRL** key, press on `P1`, and with the button still down, release on `t`.

A line is drawn. You can inspect it, for instance to change its shape: choose **curve** and put an arrow at its end.

![A curved arrow from P1 to t and the Connector inspector](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/17-DrawNewEdge.png)

*The new connector and its inspector.*

Conceptualise it the same way: select the edge, right-click and choose **Create new concept**.

![Create new relational concept wizard for Edge](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/18-CreateEdge.png)

*For a connector, the wizard offers a relational concept, with a source concept (`Place`) and a destination concept (`Transition`).*

![The edge is now an instance of the Edge concept](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/19-EdgeHasBeenCreated.png)

*The edge has been created as an instance of the concept `Edge`.*

## 10. Give the edge a weight {#step-10}

A Petri net edge has a weight. Select the edge, right-click and choose **Create new property**.

Create the property `weight`, of type *Integer*: the number of tokens needed for the edge to be triggered. Its default value is 1.

![Define new property wizard for weight](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/20-CreateWeightProperty.png)

*The Define new property wizard.*

![The edge now has a weight property](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/21-EdgeHasAWeight.png)

*The edge instance now has a `weight` property.*

## 11. Split edges into input and output edges {#step-11}

You now want an edge from the transition `t` to the place `P2`. But the concept `Edge` links a place to a transition, and this one goes the other way. Two kinds of edges are needed: rename `Edge` into `InputEdge` and create a new concept `OutputEdge`.

Select the concept `Edge`, right-click and choose **Refactor > Rename concept**.

![Rename concept wizard showing InputEdge](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/22-RenameEdge.png)

*The Rename concept wizard.*

Then draw an edge from `t` to `P2`. First draw the shape, then promote it to a concept called `OutputEdge`.

![Create new relational concept wizard for OutputEdge](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/23-CreateOutputEdge.png)

*Creating the concept `OutputEdge`, from a transition to a place.*

Define the property `weight` on `OutputEdge` as well (right-click > **Create new property**). This time its meaning is the number of tokens created when the edge is activated.

![Define new property wizard for weight on OutputEdge](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/24-CreateWeightProperty2.png)

*The property `weight` on `OutputEdge`.*

You get this screen:

![Diagram with P1, t and P2 linked by an InputEdge and an OutputEdge](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/25-BothEdgesCreated.png)

*Both kinds of edges exist now, with their own concepts in All concepts.*

## 12. Add the tokens {#step-12}

A place holds tokens. Select a place, right-click and choose **Create new property**. Name it `tokens`, type *Integer*, with a default value of 0.

![Define new property wizard for tokens](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/26-CreateTokensProperty.png)

*The property `tokens` on `Place`.*

## 13. Generalise the edges {#step-13}

`InputEdge` and `OutputEdge` have a lot in common. Select both (hold the **command** key for a multiple selection), right-click and choose **Refactor > Generalize…**.

In the first page, name the common super concept `Edge` and keep it abstract. Click **Next**.

![Generalize wizard, step 1: name the common super concept](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/27-Generalize1.png)

*Step 1: the common super concept.*

In the second page, choose the properties to move up to the super concept. Keep `weight` checked.

![Generalize wizard, step 2: choose properties to move](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/28-Generalize2.png)

*Step 2: the property `weight` is factored into `Edge`.*

![Diagram after generalisation, with Edge as parent of InputEdge and OutputEdge](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/29-AfterGeneralization.png)

*After the generalisation, `InputEdge` and `OutputEdge` inherit from `Edge`.*

This ends a first modelling phase. You now have a Petri net model, an example of a Petri net, and a graphical representation of it.

## 14. Edit a new Petri net with the editor {#step-14}

You also have a graphical editor. Build a new Petri net to see it. Select `FreeModel` in the main browser, right-click and choose **Instantiate Diagram Free Model**. Name it `Example2`.

![Instantiate free model with a diagram wizard for Example2](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/30-NewExample.png)

*The wizard for the second example.*

An empty diagram opens.

![An empty diagram Example2 with the Concepts palette](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/31-StartEditNewPetriNet.png)

*The empty diagram `Example2`.*

Drag and drop elements from the **Concepts** palette. To draw links, hover a place: a small palette appears, from which you can pull a new shape and/or a link.

You get a new Petri net:

![Example2 with three places, three transitions and several edges](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/32-NewPetriNetHasBeenEdited.png)

*A Petri net edited in `Example2`. The labels still show the default text of each concept.*

## 15. Open the Openflexo Modeller {#step-15}

You would now like to program the execution semantics of this model. Switch to the **Openflexo Modeller** module, with the third icon at the top left of the window.

![Openflexo Modeller welcome page, with the module icon outlined in red](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/33-OpenOpenflexoModeller.png)

*The red frame shows where to click to open the Modeller.*

Open the model `PetriNet.fml`.

![PetriNet.fml opened in the Modeller](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/34-EditPetriNet.fml.png)

*`PetriNet.fml` as generated by the Free Modelling Editor. The outline on the right lists the five concepts.*

The editor has written the concepts for you in FML, the Flexo Modeling Language. You are going to add behaviours to it. The full file is part of the project `PetriNet.prj`.

## 16. Describe the behaviour of each concept {#step-16}

The semantics fits in a few methods. We go through the concepts in this order: `Edge`, `InputEdge`, `OutputEdge` and `Transition`.

### Edge

An edge can be *triggered*. The super concept declares it as an abstract method, and each kind of edge gives it a meaning.

```text
@Description("Common super concept for edges")
public abstract concept Edge {
    @Description("This is the weight of the edge which corresponds to the number of tokens beeing created when the edge is triggered")
    int weight = 1;

    // Abstract method used to trigger an edge
    abstract trigger();
}
```

### InputEdge

An input edge is triggerable if its source place holds at least as many tokens as its weight. Triggering it removes that many tokens from the place.

```text
@Inspector("Edge.inspector")
public concept InputEdge extends Edge {

    Place place with ConceptInstance(virtualModelInstance=container);
    Transition transition with ConceptInstance(virtualModelInstance=container);

    // This edge is triggerable if the number of tokens in source place exceed required weight
    boolean isTriggerable() {
        return place.tokens >= this.weight;
    }

    // Trigger that edge : remove required tokens from source place
    trigger() {
        place.tokens = place.tokens - this.weight;
    }
}
```

### OutputEdge

An output edge adds tokens to its destination place.

```text
@Inspector("OutputEdge.inspector")
public concept OutputEdge extends Edge {

    Transition transition with ConceptInstance(virtualModelInstance=container);
    Place place with ConceptInstance(virtualModelInstance=container);

    // Trigger that edge : add tokens to destination place
    trigger() {
        place.tokens = place.tokens + this.weight;
    }
}
```

### Transition

A transition needs to know its incoming and outgoing edges. These two lists are computed on demand: they select the edges of the model that point to this transition.

A transition is *fireable* if all its input edges are triggerable. Firing it triggers every input edge, then every output edge.

```text
@Description("Represent a transition in a Petri Net")
public concept Transition {

    String name;
    String description;

    List<InputEdge> inputEdges {
        List<InputEdge> get() {
            return select InputEdge from container where (selected.transition == this);
        }
    };
    List<OutputEdge> outputEdges {
        List<OutputEdge> get() {
            return select OutputEdge from container where (selected.transition == this);
        }
    };

    boolean isFireable() {
        for (InputEdge e : inputEdges) {
            if (!e.isTriggerable()) {
                return false;
            }
        }
        return true;
    }

    @Enable(this.isFireable())
    public fireTransition() {
        if (this.isFireable()) {
            for (InputEdge e : inputEdges) {
                e.trigger();
            }
            for (OutputEdge e : outputEdges) {
                e.trigger();
            }
        }
        else {
            log "This transition is not fireable";
        }
    }
}
```

The annotation `@Enable(this.isFireable())` on `fireTransition()` enables the action only when the transition is fireable.

Make sure the places start empty by giving `tokens` its default value: `int tokens = 0;`.

## 17. Show the tokens and weights on the diagram {#step-17}

To make the net more visual, change the `@Renderer` of the concepts. The renderer is the text displayed for an instance in the diagram.

```text
@Renderer(instance.tokens.toString)
public concept Place { ... }

@Renderer((this.weight != 1 ? this.weight.toString : ""))
public concept InputEdge extends Edge { ... }

@Renderer((this.weight != 1 ? this.weight.toString : ""))
public concept OutputEdge extends Edge { ... }
```

A place now shows its number of tokens, and an edge shows its weight only when it differs from 1.

## 18. Run the Petri net {#step-18}

Go back to the Free Modelling Editor and to the second diagram. You can now animate and execute the Petri net.

![Example2 showing tokens in the places and weights on the edges](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/35-RunAndExecutePetriNet.png)

*`Example2` with token counts in the places and weights on the edges.*

Right-click a transition and choose **FireTransition**. The entry is available only when the transition is fireable.

![Context menu of a transition with the FireTransition entry](/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/36-RightClickToExecuteTransition.png)

*The context menu of a transition, with `FireTransition`.*

The finished project, `PetriNet.prj`, is available in the [`tutorials-rc` module of openflexo-integration-tests](https://github.com/openflexo-team/openflexo-integration-tests/tree/2.99/tutorials-rc/src/main/resources/PetriNet.prj).

