---
sidebar_position: 3
---

# Components and versions management


### 1. Components

Here are the main projects composing Openflexo infrastructure.

Repositories and project URIs are available:

* __OpenflexoBuildPlugin__ : https://github.com/openflexo-team/openflexo-buildplugin
* __Connie__ : https://github.com/openflexo-team/connie
* __Pamela__ : https://github.com/openflexo-team/pamela
* __Gina__ : https://github.com/openflexo-team/gina
* __Diana__ : https://github.com/openflexo-team/diana
* __OpenflexoUtils__ : https://github.com/openflexo-team/openflexo-utils
* __OpenflexoCore__ : https://github.com/openflexo-team/openflexo-core
* __TechnologyAdapters__ : https://github.com/openflexo-team/openflexo-technology-adapters
* __OpenflexoDiagram__ : https://github.com/openflexo-team/openflexo-diagram
* __OpenflexoOWL__ : https://github.com/openflexo-team/openflexo-owl
* __OpenflexoEMF__ : https://github.com/openflexo-team/openflexo-emf
* __OpenflexoJDBC__ : https://github.com/openflexo-team/openflexo-jdbc
* __OpenflexoHTTP__ : https://github.com/openflexo-team/openflexo-http
* __OpenflexoKafka__ : https://github.com/openflexo-team/openflexo-kafka
* __OpenflexoOBP2__ : https://github.com/openflexo-team/openflexo-obp2
* __OpenflexoRhapsody__ : https://github.com/openflexo-team/openflexo-rhapsody
* __OpenflexoModules__ : https://github.com/openflexo-team/openflexo-modules
* __Packaging__ : https://github.com/openflexo-team/openflexo-packaging
* __Modelers__ : https://github.com/openflexo-team/modelers
* __Modelers__ : https://github.com/openflexo-team/openflexo-integration-tests

### 2. Versionning

Branches to use should be consistent such as :

* 1.9.1 infrastructure has been released on 2019
* 2.0.0 infrastructure has been released on june 2020
* 2.0.1 infrastructure is a stabilized evolution of 2.0.0 with bug fixes (under active development)
* 2.1.0 infrastructure is beeing under active development (FML textual syntax)
* 2.1.1 infrastructure is beeing under active development (same as 2.1.0 with java11 compatibility)
* 2.2.0 infrastructure is a future version

| Components (development versions)| &nbsp; &nbsp; 1.9.1 &nbsp; &nbsp; | &nbsp; &nbsp; 2.0.0 &nbsp; &nbsp; | &nbsp; &nbsp; 2.0.1 &nbsp; &nbsp;  | &nbsp; &nbsp; 2.99 &nbsp; &nbsp;  | &nbsp; &nbsp; 3.0.0 &nbsp; &nbsp;  | &nbsp; &nbsp; 2.2.0 &nbsp; &nbsp;  |
| -------------------------- |:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
| __Java version__           | Java 8        | Java 8        | Java 8        | Java 8        | Java 11       | Java 11       |
| __OpenflexoBuildConfig__   | 0.2           | 0.2           | 0.2           | 0.3           | 0.3           | 0.4 ? (modules) |
| __OpenflexoBuildPlugin__   | 1.9.1         | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoProduction__    | 0.5           | 0.5           | 0.5           | 0.5           | 0.5           | 0.5           |
| __Connie__                 | 1.4.2         | 1.5           | 1.5.0.1       | 2.0.0         | 2.1.0         | 2.2.0         |
| __Pamela__                 | 1.4.2         | 1.5           | 1.5.0.1       | 1.6           | 1.6.1         | 1.7 ?         |
| __Gina__                   | 2.1.2         | 2.2           | 2.2.0.1       | 2.3           | 2.4           | 2.5 ?         |
| __Diana__                  | 1.4.2         | 1.5           | 1.5.0.1       | 1.6           | 1.7           | 1.8 ?         |
| __OpenflexoUtils__         | 1.4.2         | 1.5           | 1.5.0.1       | 1.6           | 1.7           | 1.8 ?         |
| __OpenflexoCore__          | 1.9.1         | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |
| __TechnologyAdapters__     | 1.9.1         | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoDiagram__       | N/A           | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoOWL__           | N/A           | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoEMF__           | N/A           | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoHTTP__          | 1.9.1         | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoJDBC__          | 1.9.1         | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoKafka__         | 1.9.1         | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoOBP2__          | N/A           | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoRhapsody__      | N/A           | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoModules__       | 1.9.1         | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |
| __OpenflexoPackaging__     | 1.9.1         | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |
| __Modelers__ (optional)    | 1.9.1         | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |
| __IntegrationTests__ (opt) | 1.9.1         | 2.0.0         | 2.0.1         | 2.99         | 3.0.0         | 2.2.0         |

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

