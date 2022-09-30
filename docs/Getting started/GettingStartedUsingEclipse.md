---
sidebar_position: 1
---

# Setup the development environment for Openflexo using Eclipse

In this article, you will learn how to get started in setting up a development environment for __Openflexo__ infrastructure, using __Eclipse IDE__.

__Gradle__ is now used as production tool for the whole __Openflexo__ infrastructure.

### 1. Get eclipse, and configure your enviroment

As a preliminary phase, you should:

* Get a recent __Eclipse__ (https://eclipse.org/downloads/) (__Eclipse Neon 3__ or above recommanded)
* Get a recent __JVM__ (a __JVM 8__ or above is recommanded. Check the version compatibility here: https://support.openflexo.org/support/contribute/developers/ComponentsAndVersionsManagement.html) 
*For the sake of this guide, we are going to use componenets version __2.0.1.__*

![1-OpenflexoComponentsCompatibility](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/1-OpenflexoComponentsCompatibility.png)

Because of the use of __Gradle__ as a build tool, you should verify if "BuildShip" comes with your __Eclipse__ release.

Otherwise, you should install "BuildShip 2.0" or above.

To do that,

* Launch __Eclipse__
* In the help menu, choose "eclipse marketplace..."
* In the search field type "BuildShip" and press enter
* Select "Buildship Gradle Integration", and click install (if it is not already installed)

![1-InstallBuildShip](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/1-InstallBuildShip.png)

### 2. Import Openflexo Developement Component

Switch to Git repository perspective.

Click on "Clone a Git repository", to import source code from __github__ (where openflexo source code is available)

![2-ImportOpenflexoDevelopement1](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/2-ImportOpenflexoDevelopement1.png)

At this step you must to fill the URI of the __openflexo-dev__ repository which is https://github.com/openflexo-team/openflexo-dev or ssh://git@github.com/openflexo-team/openflexo-dev.git
When you have filled the URI, the Host and Repository path are automatically setup, so just click on __Next__.

The next wizard presents the different branches associated with openflexo-dev project. Click __Next__

![2-ImportOpenflexoDevelopement2](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/2-ImportOpenflexoDevelopement2.png)

Select a local GIT directory, and click __Finish__

![2-ImportOpenflexoDevelopement3](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/2-ImportOpenflexoDevelopement3.png)

Switch back to "Java perspective", right-click and select __Import...__

![2-ImportOpenflexoDevelopement4](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/2-ImportOpenflexoDevelopement4.png)

Select "Existing Gradle Project", and click __Next__

![2-ImportOpenflexoDevelopement5](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/2-ImportOpenflexoDevelopement5.png)

Select __Next__ on the following wizard.

![2-ImportOpenflexoDevelopement6](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/2-ImportOpenflexoDevelopement6.png)

Select your project root directory: here _/Users/mac/GIT/openflexo-dev_, and click __Next__

![2-ImportOpenflexoDevelopement7](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/2-ImportOpenflexoDevelopement7.png)

Select "Gradle wrapper" and click __Next__.

![2-ImportOpenflexoDevelopement8](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/2-ImportOpenflexoDevelopement8.png)

Click __Finish__.

![2-ImportOpenflexoDevelopement9](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/2-ImportOpenflexoDevelopement9.png)

Open "settings.gradle" file and comment all the "includeBuild" lines then save it.

![2-ImportOpenflexoDevelopement10](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/2-ImportOpenflexoDevelopement10.png)

Right click on __openflexo-dev__ project, choose __Gradle__ then __Refresh Gradle Project__.

Your project should be shown without errors. Contained projects should be visible in your workspace.

### 3. Import Connie component.

Do the same for __Connie__ component, using https://github.com/openflexo-team/connie _(branch/version 1.5.0.1)_

![3-ImportConnie](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/3-ImportConnie.png)

After having imported the project in your workspace, you may experience some compilation issues, caused by some problems with __gradle/eclipse__ integration.

You must first run "build" task for __connie-parser__, to generate and compile __sablecc grammar__.

![3-BuildConnie](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/3-BuildConnie.png)

Open a terminal in __Connie__ repository folder then run this command: “ ./gradlew build “

![3-BuildConnie2](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/3-BuildConnie2.png)

Right click on __openflexo-dev__ and from "Gradle" choose "refresh Gradle project". 

An other small issue might also appear: compilation issues in flexoutils project, in src/test/resources. In fact, those files are resources and should not be compiled. To exclude them from java build path, select those folders, right-click and select Build Path > Exclude.

![5-ConnieIssues3](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/5-ConnieIssues3.png)

Your __Connie__ projects should all compile now.

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

__Warning__: When importing __OpenFlexoCore__ you will have to build a parser. Do as for __Connie__: 
* You must first run "build" task for fml-parser (in the gradle task view), to generate and compile sablecc grammar.
* Then, refresh fml-parser project (Gradle>Refresh Gradle Project), and select build/generated-sources/sablecc folder. In needed, Right-click and select Build Path > Use as source folder.

__Warning__: Some errors may remain (We use some special Java features). You may have to change the eclipse preferences for the Java:Compiler:Errors/Warnings see below.

![4-CompilerPrefsWarning](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/4-CompilerPrefsWarning.png)

Finally your workspace should contains your set of imported projects.

### 5. Run Openflexo packaging

To run on __Eclipse__ an __Openflexo packaging__ from __openflexo-packaging__ project (both __openflexo-packaging__ and __openflexo-modules__ must be imported first), create a new __Eclise Run Configuration__.
Set the project to one of the existing packagings(_flexomaintainer, flexosemantics, flexosemanticsplus..._) and the main class "org.openflexo.Flexo"
(depending on the __Eclipse__ version, searching feature does not find "org.openflexo.Flexo" class, so you have to enter it manually)

![5-LaunchConfig](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/5-LaunchConfig.png)

Set "dev" as a program arguments.

![5-LaunchConfig2](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/5-LaunchConfig2.png)

### 6. Configure Push to Upstream

Open the "git perspective", and right click on the project for which you want to push your commits, and select properties.

* Set the autocrlf property to true
* Set the push properties
* Check the github url(should be ssh).

![6-PushPullConfig](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/6-PushPullConfig.png)

### 7. Resolving dependancies using eclise

Depending on components you have downloaded on your environement, you may experience issues with __Eclipse__ production, where dependancies are resolved using __jars__, and not projects that are checkouted in your environment.

__Building 2.0__ supports now this as composite builds.

To enable this, you should edit file "settings.gradle" located in __openflexo-packaging__ project, and uncomment following lines:

    file('../').listFiles().each { File otherProject ->
        if (!otherProject.equals(file('.')) && new File(otherProject, "build.gradle").exists()) {
            includeBuild otherProject
        }
    }

Then right click on "openflexo-packaging" project, and right click: Gradle > Refresh gradle project

All dependancies to projects located in your environment should now be correctely resolved.

### 8. Recommandations to develop on Openflexo infrastructure

* Please use the code conventions defined here: https://developers.openflexo.org/developers/contribute/developers/DevelopmentGuidelines.html
* Please use the eclipse code formatter available on openflexo-production component, on ToolsConfiguration (EclipseCodeFormatter.xml)
* Please configure your save actions to automatically format source code using code formatter.

Here are the standard configuration for save actions that are to be used in __Openflexo developers team__:

![8-SaveActions](/images/getting_started/SetupDevelopmentEnvironmentUsingGradle/new/8-SaveActions.png)
