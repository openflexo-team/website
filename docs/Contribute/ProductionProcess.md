---
sidebar_position: 4
title: Production Process
---

# Production Process for Openflexo Infrastructure

## Versioning scheme and components lifecycle

We use the following versioning schemes:

 -	*major.minor.revision-qualifier*
 -  *major.minor-qualification*

qualifier might be:

 - -SNAPSHOT for everyday development releases
 - -RCx for release candidates built at the beginning of a QA cycle.

Releases are built at the end of the QA cycle, when version is considered stable enough 

## Jobs in jenkins

There are 3 kinds of jobs, mirroring the 3 kind of releases:

 - `-SNAPSHOT`, continuous build, triggered on VersionControl change
 - `-Release Candidate`, manual jobs
 - `releases`, manual jobs

All builds have at least one parameter, pointing at the releaseVersion to be produced. 
This parameter, *releaseVersion*, is used to select the right branch of the source code, and
sets some parameters for maven and sonar.

## How to do a 'release candidate' build

A release candidate is a version marked with `RC[0-9]+` that can be download from the [OpenFlexo download page](https://downloads.openflexo.org/openflexo/). 
It will also produce the artifacts in the [OpenFlexo artifactory](https://maven.openflexo.org/artifactory/openflexo-release/). 

The build of a release candidate is done using the job `Openflexo-Packaging-Release-Candidate` but it relies on all OpenFlexo components to build. 
It needs the job following in order to be correctly build:

 - `Openflexo-Production-Release-Candidate` that build the git repository `openflexo-production`,
 - `Connie-Release-Candidate` that build the git repository `connie`,
 - `Pamela-Production-Release-Candidate` that build the git repository `pamela`,
 - `Gina-Production-Release-Candidate` that build the git repository `gina`,
 - `Diana-Production-Release-Candidate` that build the git repository `diana`,
 - `Openflexo-Utils-Production-Release-Candidate` that build the git repository `openflexo-utils`,
 - `OpenFlexo-Core-Release-Candidate` that build the git repository `openflexo-core`,
 - `OpenFlexo-Technology-Adapters-Release-Candidate` that build the git repository `openflexo-technology-adapters`,
 - `OpenFlexo-Modules-Release-Candidate` that build the git repository `openflexo-modules`,
 - `OpenFlexo-Packaging-Release-Candidate` that build the git repository `openflexo-packaging`.

For **each of these projects** in order, here are the steps to follow:

 - adapt the root module `pom.xml` file by replacing `[VERSION]-SNAPSHOT` to `[VERSION]-RC[0-9]+` for the parent project.
 - for each OpenFlexo dependency, replace the version to the release candidate as the previous line.

> For instance for the project Pamela here the changes to make:
>
> - `pamela/pom.xml` line 6 change `<version>0.4-SNAPSHOT</version>` to `<version>0.4-RC2</version>`
> - `pamela/pom.xml` line 34 change `<connie.version>1.3-SNAPSHOT</connie.version>` to `<connie.version>1.3-RC2</connie.version>`
   
 - run the `Release-Candidate` job the current project on Jenkins settings the right version and release candidate version
    - the job will create two git commit and a git tag
 - update the project using `git pull`
 - undo your changes on the first and second items to allow the development in `SNAPSHOT` to continue
 
 
**Note**: If a project has a test that fails, the `Release-Candidate` job will fail to produce the release.

## How to do a 'release' build

###Prepare the Release

1. Check that you have the latest version pulled from the branch to release, and no checkout remaining on the branch
2. check the dependencies, there should not remain any *-SNAPSHOT* version in dependencies (DO  NOT UPDATE THE VERSION OF THE PROJECT YOU ARE BUILDING)

###Do the release

1.  Go to Jenkins, select the job corresponding to the component your are building in the *Releases* view
2. Click on *Build with parameters* update the releaseVersion and nextVersion parameters and build.
3. Check that everything went ok: you should have a new release version (releaseVersion, current branch) & new branch (nextVersion, branch to come)


###After a Release build, you must:

1. Update the continuous/Sites and Documentation/release candidate/release build  job in Jenkins,so that continuous build points at the right branch on Github (next release version) and that default parameters for **Release Candidate** and **Release** jobs are pointing at the next production version by default (parameters are releaseVersion and nextDevelopmentVersion or releaseCandidateRevision)
2. Update the default branch in github so that future developers get the new development version by default
3. Merge the branch that is been released with *master* branch
4. update Github to point by default on the new Github branch
5. Update the versions in Jira for the Component (publish the released version and prepare the next one)

