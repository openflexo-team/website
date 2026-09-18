---
sidebar_position: 4
---

# Tutorial 4 : Create Petri Model editor using the FreeModellingEditor

In this article, you will learn how to get started in creating a basic Petri Model Editor while using the FreeModellingEditor

### 1. Purpose of this tutorial

The purpose of this tutorial is:

* to discover how to elicit concepts from example use cases with the Openflexo FreeModellingEditor tool
* to build a basic graphical editor (diagram-based) of those concepts
* to be able to use FML language to define specific business logic for those concepts

### 2. About Petri Nets

https://en.wikipedia.org/wiki/Petri_net

A Petri net, also known as a place/transition (PT) net, is one of several mathematical modeling languages for the description of distributed systems. It is a class of discrete event dynamic system. A Petri net is a directed bipartite graph, in which the nodes represent transitions (i.e. events that may occur, represented by bars) and places (i.e. conditions, represented by circles). The directed arcs describe which places are pre- and/or post-conditions for which transitions (signified by arrows). Some sources[1] state that Petri nets were invented in August 1939 by Carl Adam Petri—at the age of 13—for the purpose of describing chemical processes. 

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/Detailed_petri_net.png" alt="Petri Nets" />

### 3. Download Openflexo

As a preliminary phase, you should get a recent Openflexo distribution

Download it on:

* https://www.openflexo.org/download.html
* Alternatively take the current 2.0.x snapshot (https://downloads.openflexo.org/openflexo/2.0.0SNAPSHOT/)

### 4. Launch Openflexo FreeModellingEditor and create a project

Launch Openflexo, and choose the FreeModellingEditor.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/1-WelcomePanel.png" alt="Welcome panel" />

Select FreeModellingEditor icon.

Click on "New project", enter name, here "PetriNet".

The FreeModellingEditor module will be launched.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/2-CreateProject.png" alt="Create project" />

A windows opens, allowing to choose a URI and a description of project. Click on "Finish"

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/3-GivesNature1.png" alt="Gives project FreeModelling nature" />

We choose to create new VirtualModel. This indicates that we would like to create a new Conceptual Model encoding Petri Net Model.

Click then on "Next"

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/4-GivesNature2.png" alt="Gives project FreeModelling nature" />

We choose to create new VirtualModelInstance: we would like to encode our own sample data.

Click then on "Finish"

The FreeModellingEditor module finally opens.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/5-WelcomeInFME.png" alt="Welcome in FreeModelling editor" />

### 5. Create a FreeDiagram

We would like to elicit our Petri Net concepts from an example diagram.

Then click on "New diagram" to create a new example diagram.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/6-InstanciateFreeDiagram1.png" alt="Instantiate free diagram" />

Type name of free model (keep same) and choose "Next".

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/7-InstanciateFreeDiagram2.png" alt="Instantiate free diagram" />

Type name of example (keep same) and choose "Finish".

You should see this FreeDiagram panel.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/8-WelcomeInFreeDiagramEditor.png" alt="Welcome in free diagram" />

### 6. Create a place

Drag an oval shape from the right palette, and name it "place".

Use graphical inspectors to set dimensions (40x40 pixels for example) foreground, background, text properties.

You should obtain this.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/9-DrawPlaceShape.png" alt="Draw place shape" />

The place is here a pure shape, and has no particular meaning. Lets decide that we will elicit a concept from that shape.

Right-click on the 'place' shape, and select "Create new concept"

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/10-CreateNewConcept.png" alt="Create new concept" />

Concept 'Place' has been created in the conceptual model, with two default properties 'name' and 'description'.
'place' instance, represented as a shape, is now an instance of 'Place' concept.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/11-InstanceOfPlaceConcept.png" alt="Instance of Place concept" />

We would like now to create a new property to 'Place' concept, as the number of tokens present in this place.

Right-click on 'place' instance and select 'Create new property'

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/12-DefineNewProperty.png" alt="Define new property" />

Property has been added to concept 'Place'. 'place' instance has now this property, and we can assign a value to that property (here the default number of tokens is '0').

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/13-SetNumberOfTokensInPlace.png" alt="Instance of Place concept" />

### 7. Create a transition

Now create a transition using the same scheme. Drag a rectangular shape from the right palette.

Use graphical inspectors to set dimensions (10x30 pixels for example) foreground (black color), background (black color), shadow (no shadow) and text properties.

In 'Text' inspector panel, you should check 'Is floating label'. Then you can move the label.

You should obtain something like this:

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/14-DrawTransitionShape.png" alt="Draw transition shape" />

Then create a new concept Transition:

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/15-CreateTransitionConcept.png" alt="Create Transition concept" />

A new instance of Transition called 'transition' has been created:

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/16-InstanceOfTransitionConcept.png" alt="Instance of Transition concept" />

### 8. Instantiate an other Place

Select the 'Concept' palette on the right side, and drag a new Place on the diagram.

You should see an other instance of 'Place' concept appearing in the diagram.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/17-NewInstanceOfPlaceConcept.png" alt="New instance of Place concept" />

### 9. Create edges

It's time now to define some edges linking places to transitions, and transitions to places.

To do so, CTRL-click on first place, and draw an edge to 'transition'.

Select newly drawn connector, open 'Connector' inspector, and set terminal of edge to be a 'arrow' connector

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/18-DrawEdge.png" alt="Draw edge" />

Then right-click on connector, and select 'Create new concept'

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/19-CreatePlaceToTransitionEdgeConcept.png" alt="Create PlaceToTransitionEdge concept" />

Leave default configuration.

This creates a new concept called PlaceToTransitionEdge, with a unique instance linking 'place' to 'transition'.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/20-NewInstanceOfPlaceToTransitionEdge.png" alt="New instance of PlaceToTransition concept" />

Do the same for the TransitionToPlace concept: draw a connector, and create related concept.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/21-NewInstanceOfTransitionToPlaceEdge.png" alt="New instance of TransitionToPlace concept" />

### 10. Create a new example diagram

A first graphical editor is now ready to use.

To test it, right-click on 'FreeModel' above 'PetriNet' project on the top-left browser, and select 'Instantiate diagram free model' to instantiate a new example. Call it 'Example2' as suggested.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/22-InstantiateNewExampleDiagram.png" alt="Instantiate new example diagram" />

A new editor opens.

Select the 'Concepts' palette, and drag 3 places 'place3', 'place4' and 'place5'. Also drag transitions 'transition2' and 'transition3'. Connect those places and transitions (let the cursor stay on a shape, and drag using floating palette).

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/23-EditANewPetriNet.png" alt="Edit a new Petri Net" />
 
### 11. Start to edit conceptual model

The FreeModelling Editor is a good starting point to elicit concepts and build a new graphical editor.

We may now use the Openflexo Modeller to refine our models and graphical representations.

Right on the 'Openflexo Modeller' module icon on the top-left panel, to open Openflexo Modeller.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/24-WelcomeInOpenflexoModeller.png" alt="Welcome in Openflexo Modeller" />

The left browser shows all resources that have been created/edited through the FreeModelling design process:

* **ConceptualModel.fml**: the conceptual model of Petri Net, with 'Place' and 'Transition' concepts
* **SampleData.fml.rt**: an instance of that conceptual model: our sample data
* **FreeModel.fml**: the meta-model of graphical editor encoding a Petri Net as a diagram
* **Example.fml.rt** and **Example2.fml.rt**: instances of that graphical editor (Petri Nets diagrams)
* **FreeModel.diagramspecification**: specification of a Petri Net diagram
* **Example.diagram** and **Example2.diagram**: pure diagrams encoding graphical representations

Lets double-click on ConceptualModel.fml to discover Petri Net meta-model just being created.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/25-ConceptualModel.fml.png" alt="PetriNet conceptual model" />

We see the 4 concepts that have been created. Double-clinking on concepts allows to edit them.

Lets double click on SampleData.fml.rt to discover our sample data.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/26-SampleData.fml.rt.png" alt="PetriNet sample data" />

Lets double click on FreeModel.fml to discover diagram FreeModel.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/27-FreeModel.fml.png" alt="FreeModel.fml" />

Concepts in that free model are federated concepts linking a concept to a graphical representation.

Double-click on PlaceGR for example. Then click on 'Diagram perspective' on the top-right panel.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/28-PlaceGR.png" alt="PlaceGR concept" />

This concept has mainly two properties (roles):
* **fmeConcept** which is an instance of 'Place' concept (in the conceptual model)
* **shape** which is the graphical representation of a 'Place' in the diagram

Select 'shape', edit a new example value (eg 'place').

Open 'Text' inspector. Check 'Is floating label'. The label may be moved in the preview panel.

Edit bound label property of that shape.

First check read-only to declare it as a read-only label. Then instead of

> fmeConcept.name

also display number of tokens inside the place. Label should be for example:

> fmeConcept.name + "/" + fmeConcept.tokenNb

When reopening **Example2** you see that labels of places are now something than: place3/null

It means that the tokenNb was never initialized.

To do so, open the conceptual model, double-click on Place concept. Expand create(conceptName) behavior. Select unique statement:

> name = parameters.conceptName

Then click on the '+' button in the bottom left of the browser to add a new statement.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/29-CreateAssignment.png" alt="Create new assignment" />

Select 'ExpressionAction', check 'Assign to' and fill in with 'tokenNb', then set expression to 0 and click 'Finish' to add that assignment expression:

> tokenNb = 0

Then test this while going back to the FreeModellingEditor.

Create a new ExampleDiagram, called 'Example3', and drag a new Place. The place is well instantiated with the right number of tokens, and with a floating label displaying 'place6/0'

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/30-Example3FreeModel.png" alt="Example3 free model" />

Using the same scheme, you can change the label rendering of edges to have a lighter display.

### 12. Abstract edges in conceptual model

We want now to define a 'weight' property on edges (PlaceToTransitionEdge and TransitionToPlaceEdge).

Instead of doing it twice, we would like to define a inheriting scheme.

To do so, switch back to Openflexo Modeller, and open ConceptualModel.fml

Right-click on ConceptualModel.fml, and select New > FlexoConcept

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/31-CreateEdgeConcept.png" alt="Create abstract Edge concept" />

Abstract Edge concept has been created.

We should now declare Edge as parent concept for PlaceToTransitionEdge and TransitionToPlaceEdge

Double-click on PlaceToTransitionEdge. Click on '+' icon beside parent concepts and declare Edge as parent concept. 

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/32-DeclareParentConcept.png" alt="Declare parent concept" />

Do the same for TransitionToPlaceEdge.

Then double-click again on Edge concept, select 'Structural' facet, and select New Property > Create primitive role

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/33-DeclareWeightProperty.png" alt="Declare weight property" />

Select default constructor and add assignment to default value:

> weight = 1

You should finally obtain this:

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/34-EdgeConcept.png" alt="Edge concept" />

### 13. Declare references for edges in Transition

Edit Transition concept.

We must now declare references to incoming and outgoing Edges

Right-click on Transition structural facet, and select New Property > Select FlexoConceptInstance role

Create 'incomings' property with multiple cardinality storing references to all incoming edges

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/35-CreateIncomingEdgeReferences.png" alt="Create incoming edges references" />

Do the same for outgoings property.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/36-CreateIncomingAndOutgoingReferences.png" alt="Transition concept" />

Now, go to PlaceToTransitionEdge constructor, and add to statements:

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/37-SetIncomingsReference.png" alt="Sets incoming edges references" />

Do the same in TransitionToPlaceEdge:

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/38-SetOutgoingsReference.png" alt="Sets outgoing edges references" />

All the transitions now "know" about their incoming and outgoing edges

### 14. Define PlaceToTransitionEdge activation

This edge can be activated if the number of tokens in source concept is greater or equal to the weight of the edge.

To implement this, declare those two behaviors in PlaceToTransitionEdge (as ActionScheme):

> isActivable() \{
>   return (sourceConcept.tokensNb >= weight);
> }

and:

> activate() \{
>   sourceConcept.tokensNb = (sourceConcept.tokensNb-weight);
> }

You should obtain this:

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/39-DefinePlaceToTransitionEdgeActivation.png" alt="Define PlaceToTransitionEdge activation" />


### 15. Implement activation for TransitionToPlaceEdge

Define an activate() behavior for PlaceToTransitionEdge

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/40-DefineTransitionToPlaceEdgeActivation.png" alt="Define TransitionToPlaceEdge activation" />

### 16. Finalize Transition behavior

Define now Transition behavior:

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/41-DefineTransitionBehaviour.png" alt="Define Transition behaviour" />

Finally expose behavior in an ActionScheme in TransitionGR.

It is really important to set visibility to public to have action available in graphical editor.

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/42-ExposeBehaviour.png" alt="Expose Transition behaviour" />

### 17. Test final editor

Switch back to FreeModelling editor to instantiate a new example.

Draw this Petri Net:

<img src="/images/tutorials/Tutorial4-CreatePetriModelEditorUsingFreeModellingEditor/43-FinalEditorTest.png" alt="Final test" />

Transitions may be executed using right-click on transitions.















