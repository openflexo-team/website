---
sidebar_position: 1
---

# Openflexo's web sites

## About
Openflexo's web documentations is made of several websites:

* one main site at https://www.openflexo.org
* many *tools* website, such as:
	- Jira for bug database: https://bugs.openflexo.org
 	- jenkins for automated software production: https://jenkins.openflexo.org
* *mini* , *thematic* or community websites for any specific concern, such as:
	- research: https://research.openflexo.org
	- method (diatomee): https://diatomee.openflexo.org
	- a site per software component ([Connie](https://connie.openflexo.org), [Pamela](https://pamela.openflexo.org),...

Every site should apply the same base layout, based on the same images, CSS and JavaScript libraries. That's why those are
deployed in a single directory mapped to a single url (*/css/, /inc/, /images/*) for every sub-domain.

## Storage of websites sources & resources

Everything that is produced and published, except maven sites, is hosted in a git repository which URL is:
- gitlab@server-one.openflexo.org:/home/gitlab/repositories/website.git

You might clone the whole repository using the following git command: *git clone gitlab@server-one.openflexo.org:/home/gitlab/repositories/website.git*.

Two branches are used:
	- *webtest*, is used for work in progress
	- *webprod* is used for content in production.

I.e., when you commit & push something on *webtest* it is only visible on *(http://www-test.openflexo.org)*

Standard process should be:
	- work on *webtest*, commit & push
	- validate your work using a production and visulization on *www-test*
	- merge on *webprod*, commit & push
	- jenkins (see next section) produces & deploys the *production* content.

To be able to clone the repository and push any modification, your public ssh key must be known from the Git Server.... Ask your favourite Openflexo's admin (!).

## Production Process

The websites production process uses **Maven** build system so that everything can be automated using **Jenkins**, in the
same way any other software component is produced.

We use the same tooling that is used to produce the classical *maven sites* for software components. That means that one
can write documentation to be published in any of the following format:

* pure *html*, files must end with *.html* and will be un-modified during production process
* *markdown*, files must end with *.md*, and be stored  in *markdown* subdirectory, in the same subtree where it will be deployed. E.g., *xxx/research/markdown/pub/conf/models.md* will be produced and published in *xxx/research/pub/conf/models/models.html*. Markdown syntax to use can be found [here](http://daringfireball.net/projects/markdown/syntax)
* *Twiki*,  files must end with *.twiki*, same rules apply for storage;
* *xhtml*, files must end with *.xhtml*, same rules apply for storage;
* *apt*, files must end with *.apt*, same rules apply for storage;
* *xdoc*, files must end with *.xdoc*, same rules apply for storage;

**some more to come if needed**

The maven targets to use when producing the sites are: *mvn clean site resources:resources*

The mini-site are produced according to *Maven Site* configuration file (*site.xml*) that is stored in the directory containing minisite sourcecode. It may use some *Maven Skin* that
are developed to fit Openflexo's theme (**TODO**).

Details about sourcecode organization is given below.

## Openflexo's WebSites layout

(**TODO**).


## Directory architecture

### Directories in the Git repository

Everything that is in the following directory (aliases):

* *inc*, contains common libraries, common javascript programs;
* *css*, contains common stylesheets, including *openflexo.css*, which is the master one;
* *images*, contains guess what!
is common to any mini-site.

The source files for each site (either [Main one](https://www.openflexo.org), or any mini-site) are stored in
a subdirectory of *sites* directory. E.g.:
* the directory *sites/pamela*, contains files that will be produced and published on the *https://pamela.openflexo.org* minisite;
* the directory *sites/www*, contains files hat will be produced and published on the main openflexo website
* the directory *sites/developers/markdown*, contains *.md* files (markdown syntax) that will be transformed to html to be published on *http://developers.openflexo.org*
* ...
The production process used the *sites-deployed* directory to store the resulting files that are

WARNING::  I will have to find a way to manage generic header inclusion (from main website, and avoid cross-site issues)

### Directories on the file system (**server-one**)

## Some Useful commands

* Clean everything in your git repo: *find . -iname '*~' -exec rm {} \;;git clean -f -d; mvn clean*
* Produce sources in your local repository(you can then have a look at the result in the *sites-deployed* directory): *mvn clean site resources:resource* 
