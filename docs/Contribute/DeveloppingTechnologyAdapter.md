# Developping Technological Adapter for Openflexo

## Introduction to TAs

A **Resource** is an external source of information, such as a file, a database, or a server. It is managed by OpenFlexo but does not store data internally. Rather, it provides access to the data through a structured interface.

A **ModelSlot** bridges the gap between a Resource and the OpenFlexo modeling framework (specifically, FML Flexo Modeling Language). Depending on how we want to interact with a *Resource*, different types of *ModelSlots* may be available for the same *Resource* type.

In that context, a **Technology Adapter (TA)** is defined for a *Resource* type and offers various *ModelSlots* to interact with that *Resource* type.

A **ResourceData** represents the content of a *Resource* as interpreted by OpenFlexo when structured according to an external meta-model, which defines its format and constraints. Some external meta-models are defined as annotated Java APIs that can be used as types in FML, while others may exist in external formats (e.g., XML Schemas, JSON Schemas).

#### **The three main types of ModelSlots:**

- **Free ModelSlot** – Directly links a *Resource* to its *ResourceData* based on an **external meta-model defined as a Java API**. The structure and constraints of the data are dictated by the Java API, which serves as the meta-model.  

- **Type-Aware ModelSlot** – Links a *Resource* to its *ResourceData* based on an **external meta-model defined in a non-Java format** (e.g., XML Schema, JSON Schema). The *ModelSlot* interprets the external schema to enforce structure and constraints.  

- **Reflected ModelSlot** – Links a *Resource* **directly** to a **VirtualModelInstance**, where an FML-based representation (instead of an external meta-model) defines how the data is structured and manipulated within OpenFlexo.  

## Basic structure

## Examples

## Testing & Debugging

## Best Practices & Common Pitfalls