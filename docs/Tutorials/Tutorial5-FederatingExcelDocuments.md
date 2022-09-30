---
sidebar_position: 5
---

# Tutorial 5 : Federating Excel Documents

### 1. Purpose of this tutorial

This tutorial gives an overview of the Excel technology adapter and presents how to use it .

### 2. Introduction

Before starting the tutorial it is important to present Excel concepts that can be used within Openflexo. The main concept is an __ExcelWorkbook__, it is generally stored as an Excel file with the extension .xls and .xlsx, notice that Openflexo supports these two. An __ExcelWorkbook__ contains a set of __ExcelSheets__, which has a name and a position within the __ExcelWorkbook__, and is made of __ExcelRows__. An __ExcelRow__ has an index in the __ExcelSheet__ and owns a set of __ExcelCells__. An __ExcelCell__ is associated to an __ExcelRow__ and a column index. It has a value which can be a String, an Integer, a Formula, or a Boolean. Both __ExcelRow__ and __ExcelSheet__ have some __Graphical styles__(background styles, foreground styles, Font etc...).
<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/excel_model.png" alt="Excel Model" />

The tutorial is composed will present the following scenario:

* Part I: Setup the project
  * Download Openflexo
  * Load Excel resources within Openflexo
  * Create a Project and a Viewpoint
* Part II: Working with Excel
  * Working with Excel concepts
    * Create a Virtual model that relies on an Excel sheet listing information about customers
    * Create the Flexo concept of Customer that relies on an Excel row in this listing
  * Working with Excel behaviors
    * Create action to retrieve and create customers wihtin Openflexo from rows in the sheet.
    * Create action to add new customers
* Part III: Federating Excel workbooks
  * Create Company Sheet
  * Create Company concept
  * Federate sheets
* Part IV: Advanced Features
  * Working with Styles
     *  Style of a row
     *  Style of a cell
  * Working with formulas

The main elements are illustrated below, at the end of the tutorial you will obtain two separated __Excel sheets__ one with customers information and the other with companies information. Of course these information are described as cells, openflexo provides to you a support to re-interpret as bussiness concepts, __Customers__ and __Companies__. As a result you can manipulate together these clear defined concepts through different actions like coloring rows representing particular __Customers__, or adding new __Customers__ and therefore adding new rows in __Excel sheet__ etc...

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/overview.png" alt="Overview" />

### 3. Part I : Setup the project

#### 3.1 Download Openflexo
As a preliminary phase, you should get a recent Openflexo distribution (Openflexo Maintainer 1.8.x)

Download it on:

* https://developers.openflexo.org/developers/download.html
* Alternatively take the current 1.8.x snapshot (https://downloads.openflexo.org/openflexo/1.8.0SNAPSHOT/)

#### 3.2 Load excel resources within Openflexo 

Launch Openflexo, and choose the __Information Space__.
Select the __Excel technology adapter__ perspective.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/excel_ta.png" alt="Excel TA Perspective" />

Then add a new resource center that will be a container for Excel resources.
Click on __Tool->Manage Resource Center__, Add the folder __"ExcelFiles"__ from the zip [ExcelFiles.zip](/resources/tutorial5/ExcelFiles.zip) attached to the tutorial.
Save and quit, normally these files are now visible in the left browser panel, click twice on the file customer.xlsx to open it, you should have something like this:

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/customers_file_0.png" alt="Excel Customer File 0" />

Excel files cannot be edited directly here but it gives a short overview of what the content of the file is.
The customers sheet is made of 5 colums, a name, an occupation, a company, an address and a salary, and each row correspond to a customer. 
Well done you can access to you excel resource, now let's go for federation!

#### 3.3 Create a Project/Viewpoint
To begin choose the __ViewPointModeller__, click on __New project__, choose a name, here TutoExcel.prj, create a new __Viewpoint__, give a name, an uri and a description.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_vp_popup.png" alt="VP Popup" /> <img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_vp_wizard.png" alt="VP Wizard" />

Create a __Virtual model__, right click on the Viewpoint > New > Create Basic Virtual Model. Double click on the __Virtual model__ created to open its view.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_vm_popup.png" alt="VM Popup" />
<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_vm_wizard.png" alt="VM Wizard" />

Now create a __ModelSlot__ for this __Virtual model__ that will later reference a customers Excel file. To do that right click on the __Structural folder__ in the __Virtual model__ view and select New > Propety > Create Model Slot.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_ms_popup.png" alt="MS Popup" />

Here we can choose between two kind of __Excel ModelSlots__. As a remainder an __Excel ModelSlot__ represents a connection point for a real Excel resource (generally it is an Excel file). Each kind of __ModelSlot__ provides its own interpretation for an Excel resource. In the one hand a __Basic Excel ModelSlot__ interpret Excel file in its most simple form, as a set of sheets containing cells organized in rows and columns. In the other hand Excel files can be interpreted with a business structure, for instance rows can be clients or bills... In that case one must provide this structure.
This tutorial focuses only on the __Basic ModelSlot__. Select this kind of __ModelSlot__ that represent a workbook and set its name and a description.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_ms_wizard.png" alt="MS Wizard" />

A workbook is made of sheets, a sheet has a name and a position within this Workbook. Thererefore the first thing we have to do is to retrieve the customers sheet from the workbook. To simplify the future __VirtualModel__ design, define a property to return this sheet, to do that right click on the __Structure folder__, then __new > Property >Get/Set property__. When the Get operation of this property will be invoked, a graph of actions will be executed and a value will be returned(here we expect an excel sheet). Give a name like "customer_sheet".

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_role_sheet_popup.png" alt="Role Sheet popup" />
<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_role_sheet_wizard.png" alt="Role Sheet wizard" />

Program the GET behavior of this property, to do that right click on the __+__ and __add action in Get control Graph__. Then select __Expression Action__, check __return__ (to return the Sheet) and set the expression __customers_workbook.getExcelSheetByName("CustomersSheet")__ , which means you select the first Excel sheet named "CustomerSheet" in the customers_workook. This expression is available in the binding selector if you select the __extended expression__ button. An alternative is to select a sheet using its position(represented as an integer value) in the workbook, for instance using the expression: __customers_workbook.getExcelSheetAtPosition(0)__, be careful 0 is the index of the first sheet in the list.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/action_get_set_popup.png" alt="Get Set Popup" />
<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/action_setcustomersheet.png" alt="Set customersheet" />

Now whenever you need to access the Excel sheet related to customers use the property __customers_sheet__ .

### 4 Part II: Working with Excel
In this part we will learn how to create a new flexo concept that relies on an excel row. Then we will see how to give it some behaviors.

#### 4.1 Working with Excel concepts

##### 4.1.2 New Customer Concept
Create a new __Flexo Concept__ (either right click on the __virtualmodel > new >flexo concept__, or select __(+)__ in the inner concept folder within virtual model view). Give a name __Customer__ , and a description.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_fc_wizard.png" alt="FC wizard" />

##### 4.1.2 New Customer Roles
Once it is created open the __Flexo concept__ . Now we have to associate it to a row within the Excel customers sheet. To do that right click on the __structure folder__ , __new >property >create_technology_role__ .

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_fc_role_popup.png" alt="FCRole popup" />

In the wizard panel set the name of the role __customer_row__ , set the technology adapter __Excel__ , the type __a row__ and a description. 

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_fc_role_wizard.png" alt="FCRole  wizard" />

#### 4.2 Working with Excel behaviors
A Customer is a row in the Excel sheet. Now let's see how to create a new instance of Customer Flexo Concept. There may be different scenarios, either instanciate a new Customer from an existing row and therefore link the Customer to the existing row, or instanciate a new Customer and add a new row.

#### 4.2.1 New concept instance from a row
Let's create an action that instanciate a new Customer from an existing row. For that we must use a __Creation Scheme__ which role consists in a new Customer instantiation.
Normally a default __Creation Scheme__ is created when you declare the Customer Flexo concept, so just modify it.
Select this scheme. A Scheme has a set of parameters, and execute a set of sequential actions. Our creation action requires only one parameter, an existing row. Then the sequence of actions consists to assign this row parameter to the row role. To do so create the parameter by right clicking on the action __new > create_behavior_parameter__ .

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_bp_popup.png" alt="Create BP popup" />

Select the type of parameter, in our case this is an __Excel row__ , and set its name for instance __row_parameter__ .
 
<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/set_row_parameter.png" alt="Set row parameter" />

Now assign the parameter value to the row role, to do that select the __Creation Scheme__ and __(+) > Expression action__. Fill the expression __parameters.row_parameter__ (the value to be assigned), and assign it to the customer_row role.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/set_row_parameter_2.png" alt="Set row parameter" />

#### 4.2.2 Add new customers
The second action instanciates a new Customer and creates a new row in the sheet. Compared to the last Creation Scheme, there is one main difference, the row doesn't exist yet. Therefore the user have to provide some information ie. the name, the occupation, the company, the address and the salary. To do that create a new __Creation Sheme__ , right click on __Behavioral folder > New > flexo_behavior__ . Then select __Creation scheme__ and give a name for instance __addNewCustomer__ .

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/new_customer_wizard.png" alt="New Customer wizard" />

This action requires 5 parameters. First create the name parameter, its type is a __String__ and the widget is a Text field. The widget is a graphical UI the user will use to set the value. Do the same for the occupation and the company parameters. The address parameter widget can be a Text area that because there may be differents lines. Finnaly the salary parameter is an Integer and can be assigned through an Integer widget.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/new_customer_wizard_2.png" alt="New Customer wizard" />

#### 4.2.3 Call these action from the virual model
#### 4.2.3.1 Add new customer

Define a call for these schemes directly in the virtual model, for that open the __Virtual Model__ and in the __Behavioral folder__ create a new __ActionScheme__ .

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/vm_add_customer_1.png" alt="Add customer" />

Create 5 parameters, name_parameter, occupation_parameter, company_parameter, address_parameter of type String and salary_parameter of type Integer. Select the same widgets as before and set the __required__ checkox for each ones.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/vm_add_customer_2.png" alt="Add customer" />

Then when this Scheme will be invoked ones would like a new Customer to be instantiated with a new corresponding row. For that create an __AddFlexoConceptInstance__ action within the __ActionScheme__ which purpose is to call a CreationScheme anf thus instanciate a Concept. Select the __addCustomer__ __CreationScheme__ and set the parameters like illustrated above. 

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/vm_add_customer_3.png" alt="Add customer" />

#### 4.2.3.2 Retrieve existing customers
When you will load an excel sheet that already contains customers you will expect new Customers to be created for each relevant row, this can done by invoking the first Customer __CreationScheme__ with a row parameter.
For a __Virtual Model__ ,  __Synchonization Schemes__ are kind of Schemes that are automatically executed at __Virtual model__ creation or loading . 
To create a __Synchonization scheme__ right click on __Behavioral Folder > new >Flexo behaviour__ , and select __Synchonization Scheme__ .

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/retrieve_customer_1.png" alt="Retrieve customer" />
<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/retrieve_customer_2.png" alt="Retrieve customer" />

Then browse over each row by using an __Iteration action > Fetchrequest > Select Excel row __ . For this action you have to choose the __ModelSlot__ here __customers_workbook__ and Excel sheet, here __sheet _customers_sheet__ . Set also the name of the iterator for instance __row__ . Do not forget to put a condition __select.rowIndex!=0__ to not include the first row that is not a customer, but the name of the column.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/retrieve_customer_3.png" alt="Retrieve customer" />

Once this is created, add an internal action to the __Iterator action__ in order to instanciate a Customer for each row found. Of course we want to avoid duplicated Customers, and therefore we can use the MatchFlexoConceptInstance action that role is to instanciate a Flexo Concept based on matching criteria. To do that select the __Iteration action__ and click on the __(+)__ and add action in Iteration. Set the __Virtual Model Instance__ , the concept, and the CreationScheme ("Creation"). In the matching citeria select the row, which means that if an existing Customer is alrady assigned to this row then it will not be created again. Assigne the row to the parameter value.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/retrieve_customer_5.png" alt="Retrieve customer" />

At this point of the tutorial, you dispose of a tool to load and retrieve Customers from an excel sheet, and to create new Customers. Let's try it!

### 5 Test customer management tool
In order to test the viewpoint, switch to view editor, select a project(create one if required) and right __click > New > Create View__ .

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_view_1.png" alt="Retrieve customer" />

Give a name and select its viewpoint(here TutoExcel) and set the __configure all model slot manually__ , then __Finish__ .

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_view_2.png" alt="Retrieve customer" />

Once created instanciate a virtual model in it, to do so right click on the __view > instanciate new virtual model instance__ .

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_view_3.png" alt="Retrieve customer" />

Giva a name and select the __ExcelVirtualModel__ virtual model as a reference. Like before choose __configure all model slots manually__ and __Next__ .

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_vmi_1.png" alt="Retrieve customer" />

Now configure the excel model slot with a real excel resource, either an xls or xlsx file. Select the resource named customers.xlsx and finish.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_vmi_2.png" alt="Retrieve customer" />

Once __Virtual model instance__ is created the __Synchonization Scheme__ is executed. As you remember we programmed this scheme in order to browse all rows of CustomersSheet excepted the first one, and instanciate a new Customer for each row. If you unfold the __Virtual model instance__ you will see several Customer instances.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/vmi_part_1.png" alt="Retrieve customer" />

Now try to add a new Customer, to do that right click on the __Virtual model instance__ and __AddNewCustomer__.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/vmi_part_1_2.png" alt="Retrieve customer" />

Fill the different informations, and finish.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/vmi_part_1_3.png" alt="Retrieve customer" />

A new Customer instance is created, save Excel files(CTRL+S) and normally a new row appeared in customers.xlsx.
Check it by either switching to the information space and open the file, or open it in from your file system. If you see the new customer then congratulation you finish the Part I!

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/vmi_part_1_4.png" alt="Retrieve customer" />

In this part you had a first overview of Excel concepts and built a basic tool to manage an excel sheet. You should have a minimal but usefull knowledge to start using the Excel technology adapter.
However how to federate different Excel workbooks, how to create new workbooks, or how to manage cells instead of rows? These are the purposes of Part II.

### 6 Part III: Federating Excel workbooks

In the Part II we have tooled an excel sheet containing a customers listing. Customers are described with many information, a name, an occupation, a company, an address and a salary.
In the third part of this tutorial we will learn how to create a new __Excel Workbook__ with a sheet, federate two workbooks and manipulate cells instead of rows.
If you have not done the Part I, you can download the viewpoint of Part II from here : [Tuto_Excel_RC2.prj.zip](/resources/tutorial5/TutoExcel_RC2_PartII.prj.zip)

#### 6.1 Create Company Sheet
The second workbook will list the companies in which customers are employed. In the __Virtual Model__ create a new __BasicExcelModelSlot__ for the new companies workbook.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_ms_popup.png" alt="MS Popup" /> 
<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_ms_wizard_2.png" alt="MS Wizard" />

In the same way as Part II, create a property that references a sheet related to Companies named "companies_sheet" (see 3.3 for more details). In the screenshot below we used __companies_workbook.getExcelSheetAtPosition(0)__ expression assuming that the sheet of interest is the first one.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/companies_sheet_property.png" alt="MS Wizard" />

#### 6.2 Create Company concept
Then similarily to Part II, 4.1.1, create the __Company__ Flexo concept. While for __Customer__ we defined a reference to a row, here we will only define a reference to an __Excel cell__ . Thus create a role relying on an __Excel cell__ .
<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_company_concept.png" alt="Retrieve customer" />
<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/company_roles_2.png" alt="Retrieve customer" />

Create a list of customers which are employed within this company. This list is a set of flexo concept instance of Customer flexo concept type. In order to create a list set the cardinality to __0.*__.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_company_customers_1.png" alt="Retrieve customer" />

When finish, select it and change the type of Flexo Concept to Customer.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_company_customers_2.png" alt="Retrieve customer" />

Create a reference to the name of the company, using for instance an __Expression__. Right click on __Structural > New > Property > create expression property__.
<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/new_expression_property.png" alt="Retrieve customer" />

Set the expression : __name_cell.cellValueAsString__  and a name like __company_name__ .

#### 6.2.1 Company Creation Scheme
Now define a creation scheme(you can reuse the default create scheme already present) in order to instanciate a new Company from a name. Therefore, define a new String parameter called name_parameter for this __Creation Scheme__ (see 4.2.1).

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_bp_popup.png" alt="MS Wizard" />

Create an AddExcelCell action. Its role is to instanciate a new cell in a specified workbook.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/create_company_1.png" alt="MS Wizard" />

#### 6.3 Update companies workbook

Now open the _Virtual Model__ and create a new __Action Scheme__ named __updateCompanies__. Its purpose is to browse all Customers, instanciate a new Company or retrieve it if already present, and add for the Company instance the Customer. 

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/update_companies_scheme.png" alt="MS Wizard" />

Inside create a new __Iteration action__ to browser over all current Customers.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/update_companies_scheme_1.png" alt="MS Wizard" />

Select the __Iteration Action__ and select (+) > __Add action inside iteration__.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/add_comp_1.png" alt="MS Wizard" />

Create a new __MatchFlexoConceptInstance__ action in order to either retrieve or instanciate a Company.
Select the __company_name__ matching criteria to __customer.customer_row.getCellAt(2).cellValueAsString__.
The criteria indiquates that a new Company is instanciated only if there are no existing Companies with a __company_name__ equals to company name of the Customer. If a Company already exists with that name, the action just retrieve it. 
Set a variable name like __company__ and set the parameter value for name as __customer.customer_row.getCellAt(2).cellValueAsString__. Note that __cellValueAsString__ is not mandatory in our case because we are manipulating strings.
Click on __Finish__ to create the action.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/add_comp_c.png" alt="MS Wizard" />

Finnaly add the Customer to the Company's customers list, thus create an __Assignation Action__ and set the checkbox __add to list__. The list is __company.customers__ and the object to add(expression) is __customer__.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/add_comp_d.png" alt="MS Wizard" />

Now the action is ready and can be invoked from the __Virtual Model Instance__, however to call it during the synchonization, select the __Synchonization Scheme__ created in Part II and add a new __Expression Action__.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/add_comp_e.png" alt="MS Wizard" />

Now let's try it.

#### 6.4 Test company viewpoint
In the same way as in the section 5, switch to __View editor__ and create a new __View__ from this __Viewpoint__. Then create a new __Virtual Model Instance__, and for the first __Excel Model slot__ select again the customers file. However now you also have to fill the second __Excel Model slot__ related to companies. It is not created yet, so select __create new resource__. Give a name and a path for this new Excel file and select __Finish__.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/part3_view_2.png" alt="MS Wizard" />

If everything had gone smouthly you should have now a set of Customers and a set of Companies Flexo concept instances. If you select a Company then you may see it is related to a set of Customers (bottom right panel).

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/part3_view_3.png" alt="MS Wizard" />

Now save the companies Excel file:

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/part3_view_4.png" alt="MS Wizard" />

And open it from the __Infomation Space__ or from you file system:

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/part3_view_5.png" alt="MS Wizard" />

### 7 Part IV: Advanced features

You can download the viewpoint of Part III from here : [TutoExcel_RC2_PartIII.prj.zip](/resources/tutorial5/TutoExcel_RC2_PartIII.prj.zip).
In this Part we will learn to use styles, and formulas.

#### 7.1: Working with Styles

#### 7.1.1: Style of a row

Create an action that fills a row with a color. For now all the row style is affected, it is not possible yet to set e begin/end cell. Open the virtual model, and in structural part, create a new Action Scheme name __changeRowStyle__. 

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/change_row_style_1.png" alt="MS Wizard" />

Give a name and provide a parameter which is a Customer (Flexo Concept).

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/change_row_style_2.png" alt="MS Wizard" />

Give a name to the parameter like for instance __customer__.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/change_row_style_3.png" alt="MS Wizard" />

Then you have to create two __CellStyleAction__ , the first one sets the style to a Solid Foreground:

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/change_row_style_5.png" alt="MS Wizard" />

Set the subject (the row you want to be modified, here it is the given parameter), set the __Cell Style__ as __Pattern__, and set the __Pattern Style__ to __SOLID_FOREGROUND__.

Set also the __Assign value__ which is the same as the __Subject__ (this should change in futher versions).

Click on Finish and create a new __CellStyle Action__ with these information:

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/change_row_style_6.png" alt="MS Wizard" />

Click on __Finish__.

To check if it runs, switch to the __View Editor__, if you have not created a __View__ and a __Virtual Model Instance__ then you need to create them, see Part II or III. Otherwize right click on the __Virtual Model Instance__ and select the action __ChangeRowStyle__. Select a Customer to be colored and __Validate__.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/change_row_style_7.png" alt="MS Wizard" />

Then save the customers.xlsx file, and open it in the file system. 

#### 7.1.2: Style of a cell

Styles can be also applied on particular cells. Let's try to change the style of a cell.
Create a new action within the __Virtual Model__ called __changeCellStyle__.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/change_cell_style_1.png" alt="MS Wizard" />

Add a parameter for this action name __cell_name__ of type String. It will be formatted like this: "ROW_ID" + "COL_ID". For instance "B15", "AA10" etc...
Don't forget to set the checkbox "required". 

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/change_cell_style_2.png" alt="MS Wizard" />

Create a new __Expression Action__ as illustrated below to retrieve the corresponding cell, using the expession __getCellFromName(String param)__ where parame is in the format explained previously. 

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/change_cell_style_3.png" alt="MS Wizard" />

Create 2 __CellStyleAction__ on the cell to modify its style:

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/change_cell_style_4.png" alt="MS Wizard" />
<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/change_cell_style_5.png" alt="MS Wizard" />

Finnaly try it in the __View Editor__. On the __VirtualModelInstance__ right click > ChangeCellStyle. Change the style of cell B15 for instance, click __Validate__, and save the Excel file.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/change_cell_style_6.png" alt="MS Wizard" />

#### 7.2: Working with Formulas

Create a new action in the __Virtual Model__ named __computeAverageSalary__.
Inside this action create an __AddCellAction__ in which we will compute the average salary. Fill the information as below:

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/formula_1.png" alt="MS Wizard" />

Test the action in the __View Editor__, and check you see the average salary in you Excel sheet.

<img src="/images/tutorials/resources/tutorial5-FederatingExcelDocuments/formula_2.png" alt="MS Wizard" />

The final viewpoint is available here: [TutoExcel_RC2_PartIV.prj.zip](/resources/tutorial5/TutoExcel_RC2_PartIV.prj.zip).