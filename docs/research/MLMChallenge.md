---
sidebar_position: 3
---
# Multi-Level Modelling Challenge

This challenge is intended to allow the demonstration of multi-level modeling techniques and enable the comparison of submissions, and hence framework/language capabilities. The multi-level modeling community is invited to respond to this challenge with submissions describing solutions to the challenge expressed in a technology of their choosing. Authors should emphasize the merits and limitations of their solution according to the criteria defined in this challenge description. This challenge closely follows the MULTI 2019/2020 Process Challenge with minor changes to Sections 1 and 3, and adds more specific presentation requirements.

We present a solution based on model federation and discuss the advantages and limitation of this approach. You will find here the demonstrator implemented in the context of our response.

## 1. The MULTI challenge

Multi-level modeling (MLM) represents a significant extension to the traditional two-level object-oriented paradigm with the potential to improve upon the utility, reliability and complexity of models. In contrast to conventional approaches, MLM allows for an arbitrary number of classification levels and introduces further concepts that foster expressiveness, reuse and adaptability.

The modeling challenge described here is intended as a basis for demonstrating MLM capabilities and enabling the comparison of MLM alternatives. The challenge description closely follows the MULTI 2019/2020 Process Challenge which in turn was inspired by the MULTI Bicycle Challenge used in MULTI 2017 & MULTI 2018. Despite similarities in the criteria between the bicycle and process challenges, the subject domain has been changed entirely and new criteria have been added which are intended to increase opportunities for languages and tools to exercise their capabilities.

This challenge concerns the domain of process management, a domain in which one is not only interested in particular occurrences (i.e., “processes” = “process instances”, “tasks” = “task occurrences”), but also in universal aspects of classes of occurrences (“process types”, “task types”) and their relations to actor types and artifact types. Furthermore, so-called process metamodelling can be used to classify this universal level in turn.

This challenge is intended to elicit submissions which demonstrate how MLM technology can deal with such a multi-level domain. For example, domain-specific concepts may be defined in their dedicated branches of a hierarchy of models without polluting the general terminology of process management, allowing domain-specific behaviour to be defined for each branch of the hierarchy while allowing for the reuse/enforcement of common structure/behaviour.

[Download MULTI Process Challenge](/images/research/MLMChallenge/EMISAJ_Process_Modeling_Challenge.pdf)

## 2. The solution demonstrator

### 2.1 Overview of our solution: submitted abstract

Model federation is a multi-model management approach based on the use of virtual models and loosely coupled links. The models in a federation remain autonomous and represented in their original technological spaces whereas virtual models and links (which are not level bounded) serve as control components used to present different views to the users and maintain synchronization. In this paper we tackle the MULTI process modeling challenge, which consists in providing a solution to the problem of specifying and enacting processes. Solutions must fulfill a number of requirements for a process representation defined at an abstract process-definition level and at various more concrete domain-specific levels, resulting in a multi-level hierarchy of related models. We present a solution based on model federation and discuss the advantages and limitations of using this approach for multi-level modeling. Concretely, we use virtual models and more precisely the Flexo Modeling Language (FML) that serves to describe them as the main building block in order to solve the process modeling challenge whereas the federation aspect is used as a means to provide editing tooling for the resulting process language. Our solution is fully implemented with the Openflexo framework. It fulfills all the challenge requirements.

### 2.2 The ProcessType graphical editor

<img src="/images/research/MLMChallenge/ScreenshotProcessTypeEditor.png" alt="ProcessType Editor" width="800px;"/>

[Play demo](https://vimeo.com/625196097)

### 2.3 The Enacted process graphical editor

<img src="/images/research/MLMChallenge/ScreenshotEnactedProcessEditor.png" alt="Enacted Process Editor" width="800px;"/>

[Play demo](https://vimeo.com/625198211)

## 3. Download and installation instruction

Important notes:

- Our toolset is not yet fully compatible with modern versions of Java, therefore Java 8 is needed.
- For Mac users who encounter the error "unable to load JRE", we recommend to download the Linux version and to launch it from command line after configuring the current Java version.

### 3.1 MULTI Process Challenge ported to Openflexo v2.99

[Download Openflexo 2.99](https://downloads.openflexo.org/openflexo/2.99SNAPSHOT/2023-03-24/)

[Download MULTI Process Challenge Prototype](/images/research/MLMChallenge/MULTIProcessChallenge.prj.zip)

The code has been commented in order to clearly show which snippet of code
implements which requirement.

### 3.2 Original version of the Challenge (Openflexo v2.0.1)

[Download Openflexo 2.0.1](https://downloads.openflexo.org/openflexo/2.0.1SNAPSHOT/2021-06-01/)

[Download MULTI Process Challenge Prototype](/images/research/MLMChallenge/orig_MULTIProcessChallenge.prj.zip)



