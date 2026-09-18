---
sidebar_position: 1
---

# Tutorial 1 : Getting started with the FreeModellingEditor

This article will introduce you to the _FreeModelingEditor_. It is a basic editor that allow you to develop modeling diagrams without any constraint of a specific modeling language. It is during the development of the model that you will enrich the modeling language (meta-model) and its associated tool.

The purpose of this tutorial is:

* To present the main concepts of the Openflexo FreeModellingEditor tool.
* To show how to develop and edit modeling diagrams composed from scratch and from existing powerpoint slides.
* To identify and declare some new business concepts from a modeling diagram (meta-model enrichment).
* To reference and declare some instances of identified business concepts.

### Pre-requisites

This tutorial assumes that you have already downloaded and installed an Openflexo distribution (Openflexo Semantics+ 2.0.x recommended).  If this is not the case, then download it from:

* https://www.openflexo.org/download.html
<!-- * Alternatively take the current 1.8.x snapshot (https://downloads.openflexo.org/openflexo/1.8.0SNAPSHOT/) -->

### 1. Creating a project

Launch Openflexo. On the welcome screen, choose the FreeModellingEditor as shown by the red square in the next Figure.

![WelcomePanel](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/2.0.x/FME1.png)

Click on ***New project*** then choose a project name and directory.  We choose _Tutorial1.prj_  in our example.

![CreateOpenflexoProject](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/2.0.x/FME1.1.png)

In the opened wizard, you can specify your project name, uri and description then click __Finish__.

![CreateVirtualModel](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/2.0.x/FME1.2.png)

Another wizard will appear, choose your existing VirtualModel or create new one then click __Finish__.

![CreateVirtualModelInstance](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/2.0.x/FME1.3.png)

This should launch the FreeModellingEditor (FME) module.

![FreeModelingModule](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/2.0.x/FME2.png)

### 2a. Creating a Free Model from Scratch

Once the FME module is launched, we can see it in the project explorer in the left pane. You can see an item that has the name of your project (Tutorial1 in our case). Right click on it and choose _**Create diagram free model**_.

![NewFreeModel](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/2.0.x/FME3.png)

This shall open a wizard for the creation of a FreeModel. Give it a name and a description.

![FreeModelWizard](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/2.0.x/FME4.png)

This created FreeModel should open in a new tab.

![FreeModelWizard1](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/2.0.x/FME4.1.png)

### 2b. Creating a Free Model from a Powerpoint slide

A FreeModel can be developed from an existing Powerpoint slide, where it will extract graphical representations from the file.  In this case, right click on the name of your project in the project explorer (left pane of the tool interface) and choose _**Create ppt free model**_.

![FreeModelFromPowerpoint](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/FME5.png)

This shall open a wizard for the creation of a FreeModel.  Give it a name, a description and you can set a Diagram specification folder then click __Next__.

![FreeModelWizard2](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/2.0.x/FME6.png)

In the following screen, choose **UseGeneralConceptualModel** then click __Next__.

![FreeModelWizard2](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/2.0.x/FME6.1.png)

Next, choose **UseGeneralSampleData** then click __Next__.


It requires a Powerpoint slide file.  Once it gets the file, it will populate the name and title field automatically.  For the moment, we only support .ppt files, so your .pptx files won't work currently.

![FreeModelWizard2](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/FME7.png)

This shall open the modeling interface with graphics imported from the Powerpoint slide.  Adjust the size of different panes, according to your liking.

![FreeModelWizard2](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/FME8.png)

### 3. Populating the Model

In order to populate the model we need first to instantiate a diagram from our FreeModel. To do that right click on the FreeModel then choose __Instantiate diagram free model__.

![FreeModelDiagram](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/2.0.x/FME8.1.png)

Give your diagram a name then click finish.

![FreeModelDiagram](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/2.0.x/FME8.2.png)

Before starting to populate the model with graphical items, it is important to understand the interface of the tool. 

_Free modeling view_ interface is organized in the following panes (numbers corresponds to appropriate pane in the figure) :  

1.   This pane is a project explorer, which indicates the _free models_ contained in current project.
2.   This pane shows the set of graphic instances in the drawing pane.  These instances can be from a declared _concept_. In this case, they will be listed under that concept name.  Instances that do not relate to any declared _concept_ are listed under _None_ concept.
3.   It displays a set of already declared _concepts_. _None concept_ is used to gather all elements whose concept has not been identified yet. 
4.   The drawing area is displayed in the center.  Models are developed in this area.
5.   This zone displays three palettes:
    *   _Used shapes_ palette offers all the shapes that are already used in the drawing area, either associated to a _concept_ or not.
    *   _Concept shapes_ palette presents all the shapes that are related to a declared _concept_, excepted for the _None concept_.
    *   _Free shapes_ palette represents the shapes without any relations with a _concept_.  They are used as building blocks for developing new models.
6.   This pane provides graphical properties that can be applied to shapes.

![FreeModelingInterface](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/2.0.x/FME9.png)

Once you know the interface, you can drag and drop shapes from the palettes to the drawing area for creating new models.  This models serve as instance models.  Once can identify different concepts from these shapes, so as to develop the language for our models (meta-models).  

We are taking the _FreeModel2_ that we developed in the last step (2b) from an existing Powerpoint slide.  We drop a circle and rectangle in the drawing zone from the _Free shapes_ palette, so as to introduce new shapes to our model.  We changed the background color of the rectangle to blue from the graphical properties pane. The resulting model is shown in the following figure.

![FreeModel2withAddedConcepts](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/FME10.png)

### 4. Declaring new concepts

This tool allows the identification of new concepts from existing models.  To declare a concept from an instance shape means to add a concept to the modeling language.  To do this, we right click on the 'computer shape' and choose _Create new concept_.

![CreateConcept](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/FME11.png)

This opens a dialog box, where you enter the name and description of the concept  Once this is done, we do the same creating an _Employee_ concept from one of existing blue circles.  This results in the following figure, where you can see the concepts in the left lower pane of the interface.

![FreeModel2withIdentifiedConcepts](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/FME13.png)

### 5. Declaring new concept instances

To declare a shape as an instance of an existing _concept_, we need to declare it as an instance of an existing concept.  We _right click_ on the blue rectangle and choose _declare as an instance of existing concept_.

![CreateConceptInstance](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/FME14.png)

This opens a dialog box, where we can select the chosen concept from the drop down list. We also need to choose a strategy for its representation.  _GetConceptShape_ takes the shape of the declare concept, _RedefineShapeOfConcept_ overrides the shape of the identified concept by current shape and _KeepShape_ allows this instance to have existing shape despite being the instance of the selected concept. 

We choose _Post_ concept and select _GetConceptShape_. 

![CreateConceptInstance](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/FME15.png)

After validation a new instance should be visible in the _concept/instance browser_. We do the same process with the circle shape to identify it as an instance of _Employee_.  The resulting model is shown in the figure below.

![DeclaredConceptInstances](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/FME16.png)

Once done, we can verify which instances are declared to be the instances of _None_ and which are from _Post_ or _Employee_ from the _represented concepts_ pane.  Affecting a change to the concept, would apply that change to all its instances automatically.


### 6. Using the new editor

We have just created a graphical editor by playing with two concepts in the drawing zone.  Ofcourse this is a very basic editor with only two concepts that we identified.  It is just the start :)

You can select the concepts tab from the right top palette and it will bring the following interface.  Now you can drag and drop the employees and posts like any other graphical editor.  

![FreeEditor](/images/tutorials/Tutorial1-StartingWithFreeModelingEditor/FME17.png)

Final Note: After going through other tutorials, you will be able to use free modeling with other views provided by the tool to develop complex editors.  