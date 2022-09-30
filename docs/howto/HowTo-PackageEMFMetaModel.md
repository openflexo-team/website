---
sidebar_position: 5
---

# Import an EMF Metamodel in Openflexo

In this tutorial you will learn how to import an EMF metamodel stored as an ecore file into Openflexo. Before you start, you must read the fisrt tutorial(How to install Openflexo). The prerequisite are:  

*   Minimum 1.6 Openflexo distribution(with the EMF technology adaptor)
*   Eclipse with EMF installed (download Eclipse Modeling Tool distribution, or install EMF plugin in you own eclipse distribution)

### 1. Introduction

Openflexo is able to use your EMF metamodel and CRUD models conforms to it. All EMF Resources available in defined resource centers are scanned.  

In this tutorial we will learn how to export an ecore metamodel to a .jar, and how to import it in Openflexo.  

### 2. Generate Java Classes from a Metamodel

In this tutorial we will use an ecore metamodel representing the "Universe", but of course you can try on your own ecore metamodel.  

*   Import this ecore metamodel : 
<!-- [universe.ecore](tiki-download_file.php?fileId=261) -->
*   Open your Eclipse with the EMF plugin
*   Create a new project and copy the metamodel inside.

![Image](/images/tutorials/article7-Tutorial-3a-Import-an-EMF-Metamodel-in-Openflexo/display260.png)  
First you have to create a genmodel file to generate java classes from this metamodel.  

*   Right click on your metamodel and select new->other.
*   Select the EMF generator Model (in Eclipse Modeling Framework folder) as depicted below:

![Image](/images/tutorials/article7-Tutorial-3a-Import-an-EMF-Metamodel-in-Openflexo/display254.png)  

*   Follow the wizard, click next and select a file name, then next again.
*   Chose the Ecore model importer, and select next.
*   As depicted by the picture below, select load to load your metamodel, then next and finish.

![Image](/images/tutorials/article7-Tutorial-3a-Import-an-EMF-Metamodel-in-Openflexo/display255.png)  

Then GenModel file is now created and you can open it.  

![Image](/images/tutorials/article7-Tutorial-3a-Import-an-EMF-Metamodel-in-Openflexo/display256.png)  

In the genmodel select the package and edit its generation properties. Change the base package property has depicted by the screenshot below:  

![Image](/images/tutorials/article7-Tutorial-3a-Import-an-EMF-Metamodel-in-Openflexo/display262.png)  

Now generate the java classes, to do this right click on the root element in the genmodel and "Generate Model".  
![Image](/images/tutorials/article7-Tutorial-3a-Import-an-EMF-Metamodel-in-Openflexo/display258.png)  

If the generation has been successfull, a set of java classes are generated in you project without any errors.  
If you got errors, then right click on you ecore metamodel and select validate to check your metamodel design consistency.  

### 3. Export as a .jar

In your computer create a new folder named "Universe" where you will put your exported metamodel as well as an attached property file. In order to be scanned by Open flexo you should put this folder in an Openflexo Resource center. You can also set later your resource center while using Openflexo.  

To export your metamodel as a .jar:  

*   Right click on your project and "Export"

![Image](/images/tutorials/article7-Tutorial-3a-Import-an-EMF-Metamodel-in-Openflexo/display263.png)  

*   Select Next and choose your destination folder ("Universe").

### 4. Property File

In addition to the metamodel, the Openflexo EMF technology adaptor requires a simple property file name "emf.property". This file must be placed in the same directory as the emf metamodel .jar. It consists of 4 key/value pairs. If your metamodel is visible in the information space but cannot be opened, one of these properties is probably not correctly filled.  

*   URI = The uri of you ecore metamodel
*   EXTENSION= An extension for the models
*   PACKAGE = The Package Class (Be carreful, this is the name of the Package Class generated previously with EMF, if you are not sure, check your generated classes)
*   RESOURCE_FACTORY = The serialization factory.

As an example, for our metamodel, the properties are:  

URI=http://org.openflexo.emf.universe  
EXTENSION=universe  
PACKAGE=org.openflexo.emf.universe.UniversePackage  
RESOURCE_FACTORY=org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl  

You can download this property file here: <!--[emf.properties](tiki-download_file.php?fileId=264) -->, and place it in the same directory as your .jar.  

## Enjoy in Openflexo !

Now start Openflexo, and open the Information Space perspective.  

![Image](/images/tutorials/article7-Tutorial-3a-Import-an-EMF-Metamodel-in-Openflexo/display265.png)  

You should be able to find your metamodel, and also browse it!  
