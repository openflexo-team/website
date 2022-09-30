---
sidebar_position: 6
---

# Using Maven Archetype to create a new TechnologyAdapter in Openflexo

In this article, you will learn how to get started with using a Maven Archetype to develop a new Technology Adapter within openflexo infrastructure, using eclipse IDE.

### Configure Maven

As a preliminary phase, you should checkout openflexo-production project (0.4 version).

This project contains a file called archetype-catalog.xml, located in tools-configuration/src/main/resources/archetype-catalog.xml

Here is the contents of `archetype-catalog.xml` file

```<?xml version="1.0" encoding="UTF-8"?>
<archetype-catalog xsi:schemaLocation="http://maven.apache.org/plugins/maven-archetype-plugin/archetype-catalog/1.0.0 http://maven.apache.org/xsd/archetype-catalog-1.0.0.xsd"
    xmlns="http://maven.apache.org/plugins/maven-archetype-plugin/archetype-catalog/1.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<archetypes>
  <archetype>
    <groupId>org.openflexo.archetypes</groupId>
    <artifactId>technologyadapter-archetype</artifactId>
    <version>1.8.0-SNAPSHOT</version>
    <description>Provides technologyadapter development generator for Openflexo</description>
  </archetype>
  <archetype>
    <groupId>org.openflexo.archetypes</groupId>
    <artifactId>technologyadapter-archetype-simplemodel</artifactId>
    <version>1.8.0-SNAPSHOT</version>
    <description>Provides technologyadapter development generator for Openflexo with no metamodel</description>
  </archetype>
  <archetype>
    <groupId>org.openflexo.archetypes</groupId>
    <artifactId>openflexo-module-archetype</artifactId>
    <version>1.8.0-SNAPSHOT</version>
    <description>Provides module development generator for Openflexo</description>
  </archetype>
</archetypes>
</archetype-catalog>
```

Copy this file to your `.m2/repository`

Alternatively your might ask maven to build this catalog file:

```mvn archetype:crawl
```

### Setting-up Maven preferences

First open preferences in Eclipse, and lookup Maven preferences:

![MavenPreferences](/images/support/UsingModuleCreationArchetype/MavenPreferences.png)

Click on __Add Local Catalog__

![AddLocalArchetypeCatalog](/images/support/UsingModuleCreationArchetype/AddLocalArchetypeCatalog.png)

Select local catalog file and provide a description. Click on OK.
 

### Choose archetype

Two differents archetypes are provided by Openflexo infrastructure:
 
* `technologyadapter-archetype`: this archetype provides a base implementation for a technology adapter managing a technology handling models conform to a given metamodel
* `technologyadapter-archetype-simplemodel`: this archetype provides a base implementation for any technology adapter (model conformance is not handled)
 
### Create a new project using Archetype

In Eclipse, perform New > Project.
Select Maven and Maven Project.
Click Next

![CreateProjectWizard1](/images/support/UsingTechnologyAdapterCreationArchetype/CreateProjectWizard1.png)

Provide a location for your new module.
Openflexo modules are generally build under openflexo-technology-adapters.
For private project you might use another strategy.
Click Next

![CreateProjectWizard2](/images/support/UsingTechnologyAdapterCreationArchetype/CreateProjectWizard2.png)

Select desired archetype (here technologyadapter-archetype-simplemodel)
(you might be required to include snapshot archetypes when needed)
Click Next

![CreateProjectWizard3](/images/support/UsingTechnologyAdapterCreationArchetype/CreateProjectWizard3.png)

Finally set all configuration data for new project, then click on finish.

![CreateProjectWizard4](/images/support/UsingTechnologyAdapterCreationArchetype/CreateProjectWizard4.png)

Your new project should be created at desired location.






