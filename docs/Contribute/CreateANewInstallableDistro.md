---
sidebar_position: 3
title: Creating new installer
---

# HowTo: Create a new installable distribution of Openflexo softwares

Openflexo provides tools to package software distribution including:

* a full set of Openflexo components,
* required dependencies,
* an installer (when relevant).

Those tools can be used to build packages for several platforms: MacOS, linux, Windows.

The __packaging-tools__ maven project contains all the tooling that has been capitalized to do the job.
It is possible to create either:

* a pure _distribution project_ that does not contain any additional resource or source file (e.g., look at the projects in _/openflexo-packaging/packages_), 
* to configure any _standard project_ , containing some source code to be compiled and packaged as a jar, so that it can be distribute as a set of installable packages (one per platform).

## Naming scheme of distribution packages

Installable packages of Openflexo software use the following name scheme: __${product.name} ${productSuffix} ${flexo_version}__
with following extension:

* Linux: _.tar.gz_
* MacOs: _.dmg_
* Windows: _Setup.exe_

Naming elements come from the configuration files:

* __product.name__ is defined in _pom.xml_, and might be inherited from parent pom
* __productSuffix__ is defined in _packaging.properties_
* __flexo_____version__ is computed in  _build___packaging.xml_ using _project.version_ from _pom.xml_ in order to be compatible with file naming scheme of each platform (e.g. _1.8.0.18-SNAPHSOT_ will be translated to _1.8.0SNAPSHOT_)

## Requirements

### Before you start:

1. you must know the name and location of the _Main class_ of the java application (e.g. _org.openflexo.Flexo_ for a distribution containing only a set of standard modules)
2. you must ensure that the _mvn package_ command generates the jar file containing everything that you want to package as a part of the distribution  (i.e. class files, property files, resources,... ), __except dependencies__
3. if you want to make to distribution available on the download server, you must know the name and path of the directory where your files will be deployed, and ensure that it exists on the download server


Also, to be able to test your configuration, you will probably need to be able to use _Maven_ on the command line. 
Required versions are:
* Maven: 3.x
* JdK: 1.7.xx

### Files needed in the project 

All the files listed here must be present in your project before you start the customization of the distribution building process.
Samples can be found in the __packaging-tests__ project of the __openflexo-production__ Github repository [here](https://github.com/openflexo-team/openflexo-production).

You can copy any missing file from __packaging-tests__ to your own project before customizing them.

#### Files that drive the build & packaging process

Files not specific to a distribution project, that exist in any _standard project_:

* __pom.xml__: the maven project configuration file that also contains information about the standard build process

Files specific to a distribution project:

* __build-packaging.xml__:  the _Ant_ tooling used to generate software distribution _(customization needed for each distribution project)_
* __packaging.properties__: contains the parameters for the tooling that builds installers, launchers and distribution assembly 
* __packaging.xml__: contains the parameters for the packaging of the current project, typically it is used to separate jars produced from Openflexo owned source code from external dependencies


#### Resources needed for the installers & splash screen

Those directories and files need to be in the _src/main/resources_ of the project.
Locations and names of sub-directory may change but must be specified in _build-packaging.xml_.

* __Icons__ sub-directory should contain:
	* _Icons/IconOpenflexo.icns_: MacOS icon, name may change and must be identical in _packaging.properties_ file
	* _Icons/Openflexo.ico_: Windows & Linux icon, name may change and must be identical in _packaging.properties_ file
	* _Icons/SplashPanel.bmp_:  (72x72 ppp en 128 couleurs indexs 580x300 pixels max)
* __License__ sub-directory:
	* must contain a rtf file containing License text that will be displayed during installation (Windows installer)
	* naming schema must be  _&lt;license subdir name&gt;\&lt;version Type&gt;\License.rtf_, e.g. _License/Tests/License.rtf_
	* _version type_ is specified in _packaging.properties_ file

## Step by step: configure a project to build a software distribution

### 1. Ensure your project meets the requirements

As documented earlier....

### 2. Add dependency to __packaging tools__

Edit the _pom.xml_ file to add a dependency:

```xml
		
		<!-- PACKAGING�DEPENDENCIES -->
		<dependency>
			<groupId>org.openflexo</groupId>
			<artifactId>packaging-tools</artifactId>
			<version>${packagingtools.version}</version>
			<scope>compile</scope>
		</dependency> 
```

### 3. Update properties in pom.xml

As in the following example, all the following properties need to be set in _pom.xml_ file.

One of the most important is the __main.class__ property as it is needed to build the programs and scripts that will enable users
to use the application packaged in the distribution.

``` xml

	<artifactId>packaging-tests</artifactId> <!-- name of the artifact to be packaged, will be also set in packaging.properties -->

	<name>Packaging :: Build Test Installers</name>
	<description>This project is a way to test packaging tools used to create software distribution for Openflexo.</description>
	<version>0.0.1-SNAPSHOT</version>

	<properties>
		<packagingtools.version>0.4-SNAPSHOT</packagingtools.version>
		<product.name>Your product name</product.name>
		<main.class>org.openflexo.TestApplication</main.class> <!-- main class of the application -->
	</properties>

```
### 4. Update parameters in build-packaging.xml

Depending on your configuration, you might need to tweak some of the parameters in _ant_ config file.

Most of the time, if you did not chose to put Icons and License files in another place than the default one, the only
thing you'll have to change is the deployment directory: i.e., the place where the packages for the distribution will
be uploaded if they have been successfully built.

```xml

	<!-- ./target/../Icons -->
	<property name="icons.dir" value="${resources.dir}/Icons" />
	<!-- ./target/../License -->
	<property name="license.dir" value="${resources.dir}/License" />
	<!-- deployment dir for packagings -->
		<property name="deployment.root.folder" value="~/downloads/somedirectory" />

```

### 5. Update packaging.properties

__Note__: deprecated parameters are still needed as we need to do some cleaning in tooling to not rely on them anymore

* _versionType=Tests_, MacOS specific parameter to name the directory where distribution is build (TODO: should be deprecated)
* _productSuffix=TestApplication_, used to name the package (see naming scheme)
* _productDescription=A test application_, description used by the installer
* _Copyright=Openflexo_, Copyright specified on Installer screen
* _icon_mac_name=IconOpenflexo.icns_, icon for MacOS distribution
* _logCount=0_
* _keepLogTrace=false_
* _default.logging.level=SEVERE_, default log-level
* _maven.artifact.id=packaging-tests_, maven artifact to be packaged, should be the same as the one specified in _pom.xml_
* _maven.group.id=org.openflexo_, group_id of the maven artifact (jar) to be packaged in the distribution, with all its dependencies
* _wizard.setup.icon=Openflexo.ico_, icon of the Windows installer without path
* _launcher.splash=SplashPanel.bmp_, name of the image used for SplashPanel of the windows launcher (without path,see requirements)



### 6. Test and validate


To test your configuration you can use the following maven target:
__mvn -Pbuild-installers package__
  
To deploy the built package on the download server: 
__mvn -Pbuild-installers deploy__

