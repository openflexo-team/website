---
title: Model federation
hide_table_of_contents: true
---

# Model federation ?

Every days we use models. Maps are probably the most common, but plans of a house or a building are another daylife model. Scientific, engineers also use models. Models are elaborated for dedicated purposes: locate yourself in space, prepare the building of a house, solve a problem with an equation, etc.

In complex systems, many models are useful for (1) describing or (2) defining the system as shows in the figure bellow. 

![House models](/images/site/ModelFederation/house-aspects.png)

The house in the center can be modeled by many models: energy consumption, location, plans, prices, etc.

OpenFlexo proposes a support for "composing" models. We call it *Model Federation*. In a word, we consider models as components with ports that can be linked in order to define larger models. Models contains basic concepts (see below) or other models.

### 1. The Big Picture

A model is defined by a source of information. We consider digital sources of information such as documents from openoffice, office, pdf, text, XML, database, etc. In fact any format of data is potentially a source of information. The bottom on the next figure gives some examples of such data. 

![OpenFlexo big picture](/images/site/ModelFederation/OF-BigPicture.png)

OpenFlexo allows the federation of theses sources in order to build new models and new representations of these models. The upper part of the figure shows different users viewing different drawings.

### 2. Extracting information, building models

Models are defined with concepts. Concepts have properties that can be defined from different sources.

The figure below shows the example of Actor that has First name and Name coming from a spreadsheet source, a function coming from a database and a role from a [BPMN](http://www.bpmn.org) description of a process. 

![Example 1](/images/site/ModelFederation/Example1.png)

Information is retrieved and managed thanks to a connection. This connection is a **Technical Adpater** (TA). A TA is specifically made for a source of information and allows features such as:

* Openflexo reading
* Openflexo writing/updating
* Openflexo creating
* Openflexo deleting
* Openflexo notified when the environment changes the content of the source 

At this point, models are merged at the level of a **concept**. The next figure shows a model (called MyVirtualModel) composed of 3 concepts: Actor, Activity and Process. As you can see, the port of models are named **slots**.

![Example 2](/images/site/ModelFederation/Example2.png)

We consider any source of information as a model. The way the information is interpreted can be explicit or implicit. Technological Adapters are there to give sense to (*interpret*) data.

### 3. Drawings are models too

Concepts are the way information is organized. In the search of good modularity and for the sake of reusability, we naturally consider drawings as dedicated models. Hence, a model may be connected with many representation models. 

The next figure shows the three stages of information:
1. Data (upper left) ; since it must be seen, we draw it as a table, but it is bits stored in a file system
1. Concept (middle) -- Business model ; since it must be seen, we draw it, but it is a binary thing in a computer memory
1. Representation (bottom right) ; as it is displayed

![Example 3](/images/site/ModelFederation/Example3.png)

The next section describes the federation with the connection of a business model with its drawing.

### 4. Federation as model composition

Models offers **slots** that allows models to be interconnected. In fact, **concepts** are interconnected through **slots**. Concepts can be source of information, can maintain consistency among concepts of a model, or thanks to interconnection, maintain properties among concepts of different models.

The following figure shows an interconnection of a business model with actors and a model of representation with different shapes. When the content of a business model concept changes, the shape representing it may be updated, and vice-versa from the shape to the concept. The updates can then be stored in the right source of information. It is also possible that a change in the external source is propagated to the representations via the business model.

![Example 4](/images/site/ModelFederation/Example4.png)

### 5. Example of uses, use cases

Model federation can be used for:

* Building dashboard, collecting data from various sources
* Synchronising models, defining synchronising rules as a model between models to be synchronised   
* Checking properties (consistency) among models, a generalisation of the previous case
* Defining new models, selecting information from various models (point of views), and computing new information
* ... 

### 6. Summary and glossary

Model Federation is a way to reuse models, make different models interacting, while controlling the propagation of data among models, slots and concept. The propagation of modifications can be automatic if needing, triggered by the user, or even controlled with dialogs.

| Usual Name. | Openflexo Name. | Implementation. |
|:------------:|:--------------:|:-------------------:|
| model | virtual model | VirtualModel |
| concept | flexo concept | FlexoConcept |
| port | slot | ModelSlot |
| connector | technological adapter | require many classes |

