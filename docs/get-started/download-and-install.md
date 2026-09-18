---
sidebar_position: 2
title: Download and install
description: Which Openflexo package to download, and how to run it on Windows, macOS and Linux.
---

# Download and install

## 1. Choose a package

You do not download Openflexo's components one by one: they come in ready-to-run **packages**.

| If you want to… | Take |
|---|---|
| draw a first model and see how it works | **FreeModellingEditor**, the smallest package |
| build model federations with FML and run them (most users) | **Openflexo Designer** |
| run FML from a command line, with no graphical interface | **Openflexo Headless** |
| work on the infrastructure itself | **Openflexo Maintainer**, which contains everything |
| expose the infrastructure over HTTP | **Openflexo Server** (Linux archive only) |

If you are not sure, choose **Openflexo Designer**. [The tools](/docs/discover/tools) describe what
each package contains, and the [Downloads page](/downloads) lists the exact technology adapters of
each package, for each version.

## 2. Install Java 8

Openflexo 2.99 needs **Java 8** and does not run on more recent versions: on Java 11, 17 or 21 the
application freezes at startup. No package bundles a Java runtime, so install one first.

## 3. Run it

* **Windows**: install a Java 8 runtime *with an installer* (a Java that was only unzipped is not
  found), download the `.zip`, extract it and run `Openflexo <Package> 2.99SNAPSHOT.exe`. The
  variant ending with `- Console.exe` also opens a console showing the logs, useful when reporting
  a problem.
* **macOS**: either use the `.dmg`, which needs Oracle's Java 8 and asks you to *control-click ▸
  Open* on first launch because the application is not signed, or run the Linux archive from a
  terminal with any Java 8.
* **Linux**: check that `java -version` prints `1.8`, extract the `.tar.gz` into a directory of its
  own, and run `start.sh`.

The step-by-step instructions for each system, with the exact commands, are in
[Installing and running Openflexo](/downloads#install) on the Downloads page.

## Next

[Draw your first free model](./quickstart-free-model).
