---
sidebar_position: 2
---

# Setup the development environment for Openflexo using Intellij IDEA

In this article, you will learn how to get started in setting up a development environment for __Openflexo__ infrastructure, using __Intellij IDEA__.

__Gradle__ is now used as production tool for the whole __Openflexo__ infrastructure.

### 1. Get Intellij, and configure your enviroment

As a preliminary phase, you should:

* Get a recent __Intellij IDEA__ (https://www.jetbrains.com/idea/download)
* Get a recent __JVM__ (a __JVM 8__ or above is recommanded. Check the version compatibility here: https://support.openflexo.org/support/contribute/developers/ComponentsAndVersionsManagement.html) 
*For the sake of this guide, we are going to use componenets version __2.0.1.__*

| Components (development versions)| &nbsp; &nbsp; 1.9.1 &nbsp; &nbsp; | &nbsp; &nbsp; 2.0.0 &nbsp; &nbsp; | &nbsp; &nbsp; 2.0.1 &nbsp; &nbsp;  | &nbsp; &nbsp; 2.0.2 &nbsp; &nbsp;  | &nbsp; &nbsp; 2.99 &nbsp; &nbsp;  | &nbsp; &nbsp; 3.0.0 &nbsp; &nbsp;  | &nbsp; &nbsp; 2.2.0 &nbsp; &nbsp;  |
| -------------------------- |:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
| __Java version__           | Java 8        | Java 8        | Java 8        | Java 8        | Java 8        | Java 11       | Java 11       |
| __OpenflexoBuildConfig__   | 0.2           | 0.2           | 0.2           | 0.2           | 0.3           | 0.3           | 0.4 ? (modules) |
| __OpenflexoBuildPlugin__   | 1.9.1         | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoProduction__    | 0.5           | 0.5           | 0.5           | 0.5           | 0.5           | 0.5           | 0.5           |
| __Connie__                 | 1.4.2         | 1.5           | 1.5.0.1       | 1.5.0.2       | 2.0.0         | 2.1.0         | 2.2.0         |
| __Pamela__                 | 1.4.2         | 1.5           | 1.5.0.1       | 1.5.0.2       | 1.6           | 1.6.1         | 1.7 ?         |
| __Gina__                   | 2.1.2         | 2.2           | 2.2.0.1       | 2.2.0.2       | 2.3           | 2.4           | 2.5 ?         |
| __Diana__                  | 1.4.2         | 1.5           | 1.5.0.1       | 1.5.0.2       | 1.6           | 1.7           | 1.8 ?         |
| __OpenflexoUtils__         | 1.4.2         | 1.5           | 1.5.0.1       | 1.5.0.2       | 1.6           | 1.7           | 1.8 ?         |
| __OpenflexoCore__          | 1.9.1         | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |
| __TechnologyAdapters__     | 1.9.1         | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoDiagram__       | N/A           | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoOWL__           | N/A           | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoEMF__           | N/A           | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoHTTP__          | 1.9.1         | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoJDBC__          | 1.9.1         | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoKafka__         | 1.9.1         | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoOBP2__          | N/A           | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoRhapsody__      | N/A           | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoModules__       | 1.9.1         | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoPackaging__     | 1.9.1         | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |
| __Modelers__ (optional)    | 1.9.1         | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |
| __IntegrationTests__ (opt) | 1.9.1         | 2.0.0         | 2.0.1         | 2.0.2         | 2.99         | 3.0.0         | 2.2.0         |

&nbsp;

### 2. Import Openflexo Developement Component

Click on __File__ > __New__ then choose __Project from version control (VCS)__

![2-ImportOpenflexoDevelopement1](/images/getting_started/SetupDevelopmentEnvironmentUsingGradleAndIntellij/2-ImportOpenflexoDevelopement1.png)

Fill the URI of the __openflexo-dev__ repository which is: https://github.com/openflexo-team/openflexo-dev or ssh://git@github.com/openflexo-team/openflexo-dev.git and then click on __Clone__

![2-ImportOpenflexoDevelopement2](/images/getting_started/SetupDevelopmentEnvironmentUsingGradleAndIntellij/2-ImportOpenflexoDevelopement2.png)

Once the project is cloned on your local machine, open "settings.gradle" file then comment all the "includeBuild" lines then save it.

Open the build tab at the bottom of your __Intellij__, then click on the __Reload Gradle Project__ icon on the left.

### 3. Import Connie component.

To import Connie project, we need to clone this repository: https://github.com/openflexo-team/connie

![3-ImportConnie](/images/getting_started/SetupDevelopmentEnvironmentUsingGradleAndIntellij/3-ImportConnie.png)

A small window will pop, choose "Gradle project" then click __OK__

![3-ImportConnie2](/images/getting_started/SetupDevelopmentEnvironmentUsingGradleAndIntellij/3-ImportConnie2.png)

Another pop-up will ask you if you want to open the __Connie__ project in your current __Intellij__ window, or you can just choose "new window".

Now after you Connie project, you need to make sure you are using a compatible version with openflexo-dev.

![3-ImportConnie3](/images/getting_started/SetupDevelopmentEnvironmentUsingGradleAndIntellij/3-ImportConnie3.png)

From "Git" menu choose __Branches..__

![3-ImportConnie4](/images/getting_started/SetupDevelopmentEnvironmentUsingGradleAndIntellij/3-ImportConnie4.png)

Then choose the correct version *(we are using 1.5.0.1 in this guide)* then choose __checkout__

![3-ImportConnie5](/images/getting_started/SetupDevelopmentEnvironmentUsingGradleAndIntellij/3-ImportConnie5.png)

Once we perform a __git checkout__, __Intellij__ should build our __Connie__ project automatically.

![3-ImportConnie6](/images/getting_started/SetupDevelopmentEnvironmentUsingGradleAndIntellij/3-ImportConnie6.png)

Go to openflexo-dev "settings.gradle" file and uncomment "includeBuild '../connie'"

Go back to __openflexo-dev__ project and perform a __Reload Gradle project__ like we did earlier.

### 4. Import other components

In the same way you can import any other __openflexo__ projects from the _openflexo_ git repository. Project URIs are:

* __OpenflexoBuildPlugin__: https://github.com/openflexo-team/openflexo-buildplugin
* __Connie__: https://github.com/openflexo-team/connie
* __Pamela__: https://github.com/openflexo-team/pamela
* __Gina__: https://github.com/openflexo-team/gina
* __Diana__: https://github.com/openflexo-team/diana
* __OpenflexoUtils__: https://github.com/openflexo-team/openflexo-utils
* __OpenflexoCore__: https://github.com/openflexo-team/openflexo-core
* __TechnologyAdapters__: https://github.com/openflexo-team/openflexo-technology-adapters
* __OpenflexoDiagram__: https://github.com/openflexo-team/openflexo-diagram
* __OpenflexoOWL__: https://github.com/openflexo-team/openflexo-owl
* __OpenflexoEMF__: https://github.com/openflexo-team/openflexo-emf
* __OpenflexoJDBC__: https://github.com/openflexo-team/openflexo-jdbc
* __OpenflexoHTTP__: https://github.com/openflexo-team/openflexo-http
* __OpenflexoKafka__: https://github.com/openflexo-team/openflexo-kafka
* __OpenflexoOBP2__: https://github.com/openflexo-team/openflexo-obp2
* __OpenflexoRhapsody__: https://github.com/openflexo-team/openflexo-rhapsody
* __OpenflexoModules__: https://github.com/openflexo-team/openflexo-modules
* __Packaging__: https://github.com/openflexo-team/openflexo-packaging
* __Modelers__: https://github.com/openflexo-team/modelers
* __Modelers__: https://github.com/openflexo-team/openflexo-integration-tests

Note that the projects to import only depend on your needs. It is really rare that you need to modify all components of __Openflexo__ infrastructure. You may develop on only one project. In this case, all other projects will be imported as jars from __Openflexo artifactory__.

Please also note that you always need to import __OpenflexoBuildPlugin__ to be able to build any __Openflexo component__.

Branches to use should be consistent such as:

* 1.9.1 infrastructure has been released on 2019
* 2.0.0 infrastructure has been released on june 2020
* 2.1.0 infrastructure is beeing under active development (FML textual syntax)

| Components (development versions)| &nbsp; &nbsp; Branch 1.9.1 &nbsp; &nbsp; | &nbsp; &nbsp; Branch 2.0.0 &nbsp; &nbsp;  | &nbsp; &nbsp; Branch 2.1.0 &nbsp; &nbsp;  |
| -------------------------- |:-------------:|:-------------:|:-------------:|
| __OpenflexoBuildPlugin__   | 1.9.1         | 2.0.0         | 2.1.0         |
| __OpenflexoProduction__    | 0.5           | 0.5           | 0.5           |
| __Connie__                 | 1.4.2         | 1.5           | 1.5.1         |
| __Pamela__                 | 1.4.2         | 1.5           | 1.6           |
| __Gina__                   | 2.1.2         | 2.2           | 2.2.1         |
| __Diana__                  | 1.4.2         | 1.5           | 1.5.1         |
| __OpenflexoUtils__         | 1.4.2         | 1.5           | 1.5.1         |
| __OpenflexoCore__          | 1.9.1         | 2.0.0         | 2.1.0         |
| __TechnologyAdapters__     | 1.9.1         | 2.0.0         | 2.1.0         |
| __OpenflexoDiagram__       | N/A           | 2.0.0         | 2.1.0         |
| __OpenflexoOWL__           | N/A           | 2.0.0         | 2.1.0         |
| __OpenflexoEMF__           | N/A           | 2.0.0         | 2.1.0         |
| __OpenflexoHTTP__          | 1.9.1         | 2.0.0         | 2.1.0         |
| __OpenflexoJDBC__          | 1.9.1         | 2.0.0         | 2.1.0         |
| __OpenflexoKafka__         | 1.9.1         | 2.0.0         | 2.1.0         |
| __OpenflexoOBP2__          | N/A           | 2.0.0         | 2.1.0         |
| __OpenflexoRhapsody__      | N/A           | 2.0.0         | 2.1.0         |
| __OpenflexoModules__       | 1.9.1         | 2.0.0         | 2.1.0         |
| __OpenflexoPackaging__     | 1.9.1         | 2.0.0         | 2.1.0         |
| __Modelers__ (optional)    | 1.9.1         | 2.0.0         | 2.1.0         |
| __IntegrationTests__ (opt) | 1.9.1         | 2.0.0         | 2.1.0         |

&nbsp;

Here are the former versions of infrastructure:

* 1.9.0 infrastructure, released on october 2018
* 1.8.1 released on 2017 (mostly deprecated)

| Components (stable versions) | &nbsp; &nbsp; Branch 1.8.1 &nbsp; &nbsp; | &nbsp; &nbsp; Branch 1.9.0 &nbsp; &nbsp; |
| ----------------------- |:-------------:|:-------------:|
| __OpenflexoProduction__ | 0.5           | 0.5           |
| __Connie__              | 1.4           | 1.4.1         |
| __Pamela__              | 1.4           | 1.4.1         |
| __Gina__                | 2.1           | 2.1.1         |
| __Diana__               | 1.4           | 1.4.1         |
| __OpenflexoUtils__      | 1.4           | 1.4.1         |
| __OpenflexoCore__       | 1.8.1         | 1.9.0         |
| __TechnologyAdapters__  | 1.8.1         | 1.9.0         |
| __OpenflexoModules__    | 1.8.1         | 1.9.0         |
| __OpenflexoPackaging__  | 1.8.1         | 1.9.0         |
| __Modelers__ (optional) | 1.8.1         | 1.9.0         |

&nbsp;

### 5. Run Openflexo packaging

![5-LaunchConfig](/images/getting_started/SetupDevelopmentEnvironmentUsingGradleAndIntellij/5-LaunchConfig.png)

To run on __Intellij IDEA__ an __Openflexo packaging__ from __openflexo-packaging__ project, click on "Add Configuration.." then click on the plus sign then choose "Application"

![5-LaunchConfig2](/images/getting_started/SetupDevelopmentEnvironmentUsingGradleAndIntellij/5-LaunchConfig2.png)

Give the configuration a name like: “maintainer” and set the __JRE__ to "Java 8", set the module to one of the existing packaging(openflexo-packaging.packages.flexomaintainer.main openflexo-packaging.packages.flexosemantics.main, openflexo-packaging.packages.main.flexosemanticsplus.main...) and for the main class put "org.openflexo.Flexo" and put "dev" as a Program arguments.

Set "dev" as a program arguments.

### 6. Configure Push to Upstream

![6-PushPullConfig](/images/getting_started/SetupDevelopmentEnvironmentUsingGradleAndIntellij/6-PushPullConfig.png)

from "Git" menu select __Manage remotes...__

![6-PushPullConfig2](/images/getting_started/SetupDevelopmentEnvironmentUsingGradleAndIntellij/6-PushPullConfig2.png)

Click on the plus sign

![6-PushPullConfig3](/images/getting_started/SetupDevelopmentEnvironmentUsingGradleAndIntellij/6-PushPullConfig3.png)

Fill in the remote name and the github uri then click __OK__
