---
sidebar_position: 1
title: Write a technology adapter
---

# Write a technology adapter

## Introduction to TAs

A **Resource** is an external source of information, such as a file, a database, or a server. It is managed by OpenFlexo but does not store data internally. Rather, it provides access to the data through a structured interface.

A **ModelSlot** bridges the gap between a Resource and the OpenFlexo modeling framework (specifically, FML Flexo Modeling Language). Depending on how we want to interact with a *Resource*, different types of *ModelSlots* may be available for the same *Resource* type.

In that context, a **Technology Adapter (TA)** is defined for a *Resource* type and offers various *ModelSlots* to interact with that *Resource* type.

A **ResourceData** represents the content of a *Resource* as interpreted by OpenFlexo when structured according to an external meta-model, which defines its format and constraints. Some external meta-models are defined as annotated Java APIs that can be used as types in FML, while others may exist in external formats (e.g., XML Schemas, JSON Schemas).

#### **The three main types of ModelSlots:**

- **Free ModelSlot** – Directly links a *Resource* to its *ResourceData* based on an **external meta-model defined as a Java API**. The structure and constraints of the data are dictated by the Java API, which serves as the meta-model.  

- **Type-Aware ModelSlot** – Links a *Resource* to its *ResourceData* based on an **external meta-model defined in a non-Java format** (e.g., XML Schema, JSON Schema). The *ModelSlot* interprets the external schema to enforce structure and constraints.  

- **Reflected ModelSlot** – Links a *Resource* **directly** to a **VirtualModelInstance**, where an FML-based representation (instead of an external meta-model) defines how the data is structured and manipulated within OpenFlexo.  

## Where a technology adapter sits in FML

FML defines concepts, with properties and behaviours, gathered in models (VirtualModels); at run time, instances of
concepts reference each other. A technology adapter adds what links these instances to external data: the **model
slots** it defines, which are roles of a VirtualModel, and their **model slot instances**, which connect a model
instance to a resource.

![FML concepts, and in orange what a technology adapter adds](/img/develop/technology-adapter-in-fml.png)

Conceptually, a technology adapter provides:

1. the abstractions of the external data (the *technology objects*: a line of a text file, a cell of a workbook…);
2. the *roles*, *edition actions* and *fetch requests* through which FML behaviours play, change and select these objects;
3. the *model slot types* that connect a VirtualModel instance to the data.

## Getting started

Every technology adapter follows the same multi-module template. Start from the XX template of the repository
[openflexo-technology-adapters](https://github.com/openflexo-team/openflexo-technology-adapters): copy its four
`xx-ta*` modules and rename `xx`/`XX`. The template connects FML to a plain text file whose lines are played by a role,
read by fetch requests and inserted by an edition action, and it ships the tests every adapter is expected to have.

| Module | Content |
|---|---|
| `xx-ta` | the adapter, its model slots, resources and domain model, its dictionaries |
| `xx-ta-ui` | the controller, icons, module views and inspectors |
| `xx-ta-test` | the tests |
| `xx-ta-test-rc` | the test resource center |

A technology whose files are read by a grammar of its own adds an `xx-ta-parser` module: the `dsl-ta` template of the same
repository shows it.

## The packages of an adapter

| Package | Content |
|---|---|
| `org.openflexo.technologyadapter.xx` | the adapter class `XXTechnologyAdapter` and the model slots |
| `….xx.model` | the technology objects, as PAMELA entities, and the factory that builds them for one resource |
| `….xx.rm` | resource management: the resource, its factory (which recognizes the files of a resource center), its repository |
| `….xx.fml` | the roles, and the actor references that a concept instance keeps to a technology object |
| `….xx.fml.editionaction` | the edition actions and fetch requests |
| `….xx.fml.binding` | the binding factory, where a technology customizes the path elements of its objects in FML expressions |

## The adapter class

The adapter extends `TechnologyAdapter<XXTechnologyAdapter>`, is registered as a Java service (file
`META-INF/services/org.openflexo.foundation.technologyadapter.TechnologyAdapter`), and declares with annotations its model
slots (`@DeclareModelSlots`), its resource factories (`@DeclareResourceFactories`) and, when the technology defines types of its
own for FML, those types (`@DeclareTechnologySpecificTypes`). It implements:

- `getName()`, the name shown to users, and `getIdentifier()`, the identifier of the technology in FML;
- `getLocalizationDirectory()`, the directory of its dictionaries, usually `"FlexoLocalization/XXTechnologyAdapter"`;
- `isIgnorable(resourceCenter, contents)`, which hides some contents of a resource center (usually `false`);
- `getTechnologyAdapterBindingFactory()`, its binding factory, usually a constant of the class;
- `ensureAllRepositoriesAreCreated(resourceCenter)`, overridden to create the repository of its resources in each resource
  center (the XX template does it).

## Model slots

A **free** model slot (`FreeModelSlot`) connects to any resource of its type; a **type-aware** one (`TypeAwareModelSlot`)
connects to a model that conforms to a given metamodel (the EMF and OWL adapters define one). A model slot is a PAMELA
interface whose implementation is an abstract inner class, and it declares the FML surface of the technology:

```java
@DeclareFlexoRoles({ XXLineRole.class })
@DeclareEditionActions({ AddXXLine.class })
@DeclareFetchRequests({ SelectUniqueXXLine.class, SelectXXLine.class })
@DeclareActorReferences({ XXLineActorReference.class })
@ModelEntity
@ImplementationClass(XXModelSlot.XXModelSlotImpl.class)
@FML("XXModelSlot")
public interface XXModelSlot extends FreeModelSlot<XXText, XXTextResource> {

	public static abstract class XXModelSlotImpl extends FreeModelSlotImpl<XXText, XXTextResource> implements XXModelSlot {

		@Override
		public Class<XXTechnologyAdapter> getTechnologyAdapterClass() {
			return XXTechnologyAdapter.class;
		}

		@Override
		public <PR extends FlexoRole<?>> String defaultFlexoRoleName(Class<PR> patternRoleClass) {
			if (XXLineRole.class.isAssignableFrom(patternRoleClass)) {
				return "line";
			}
			return null;
		}

		@Override
		public Type getType() {
			return XXText.class;
		}
	}
}
```

Each argument of an edition action is a PAMELA property whose getter carries `@FMLAttribute`: without it, the argument
written in FML (`XX::AddXXLine(lineNumber=2, value="new line") in (text)`) is parsed but never reaches the action. An action
reports a failure of the FML or of its data with a typed error (`FMLNullReferenceError`, `FMLTechnologyError`…), never by
returning null.

## Testing an adapter

The tests exercise the technology through FML, the way users reach it. In the XX template:

- `AutomatedTests` runs every FML script of `TestResourceCenter/AutomatedTests`: each script loads a resource and a
  VirtualModel, runs behaviours and asserts the results;
- `TestXXErrorKinds` runs one script per typed error and asserts its type and the FML line where it happened;
- `TestXXRoundTrip` saves a resource, reloads it from its file and compares;
- the inspectors are validated without a display (`TestXXInspectors`).

Tests run with `ignoreFailures = true`: read the `Results:` line of the build, not its exit status.

## Going further

A technology that keeps state across its resources (a cache of the known documents, a connection pool) defines a
*technology context manager*, a subclass of `TechnologyContextManager<XXTechnologyAdapter>`: the Word adapter, for instance,
keeps its known documents there (`DocXTechnologyContextManager`). The other adapters show the variants: typed models
(XML, EMF, OWL), live services (JDBC, OPC UA), reflected model slots (Excel, JDBC).