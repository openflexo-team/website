---
sidebar_position: 2
title: Contributions
description: The scientific contributions behind Openflexo, by theme, with the publications that present them.
---

# Contributions

Openflexo is both a software infrastructure and the vehicle of a research programme on model
federation. This page groups the contributions by theme; each links to the publications where it is
presented. The full list is on the [publications page](/docs/research/publications).

## Model federation

The starting point is the observation that complex systems are described by many models, in
different technical spaces, formalisms and paradigms, and that ensuring global consistency,
traceability and cross-concern views is hard.
[*Conceptual interoperability through Models Federation*](https://hal.science/hal-00905036) (2013,
with a French companion article, [*De la nécessité de fédérer des modèles dans une chaîne
d'outils*](https://hal.science/hal-00904995)) introduces the approach: models stay autonomous in
their original technological spaces, and correspondences between their elements are made explicit
and given a behaviour, instead of gathering everything in one space through transformations.

Later work applies and examines it:
* modularity of heterogeneous multi-model systems, as an alternative to transformations
  between models ([2016](https://hal.science/hal-01298547));
* continuous requirements engineering, keeping a dynamic link between requirement models and their
  sources ([2016](https://hal.science/hal-01487055));
* traceability between informal requirements and formal specifications
  ([2018](https://hal.science/hal-01853610));
* the consistency of multi-model systems that evolve, with a focus on security requirements
  ([2023](https://hal.science/hal-04254748), by other members of the team).

In 2024, [*10 years of Model Federation with Openflexo: Challenges and Lessons
Learned*](https://hal.science/hal-04617492) reports over a decade of practice, in close
collaboration between a small software engineering company and academia: five use cases stemming
from real industrial and academic needs, the lessons learned, the challenges of developing and
maintaining a model-driven federation tool, and a road map. It received the Best Paper Award of the
Practice Track of MODELS 2024. The same year, [*A Survey of Federative Approaches for Model
Management in MBSE*](https://hal.science/hal-04721128) reviewed 23 papers selected from 59
contributions and classified them.

## FML, a language for model federation

FML (the Flexo Modeling Language) is the language in which federations are written. It makes it
possible to conceptualise and to reify the interpretation of a source of information, and it has a
designation mechanism to establish federation links to heterogeneous data sources. It can react to
the behaviour and evolution of the federated models and program behaviours acting on them. It is
formalised and validated on four use cases in the thesis
[*FML: un langage de fédération de modèles pour l'interopérabilité sémantique de sources
d'information hétérogènes*](https://theses.hal.science/tel-04555528) (2023).
[*Multi-Level Modeling with Openflexo/FML*](https://hal.science/hal-03692372) (2022) applies it to a
multi-level process modeling challenge and discusses the advantages and limits of federation for
multi-level modeling: see the [MULTI Process Challenge](/docs/research/challenges/multi-process-challenge).

## Free modeling

Free modeling lets modelers build models and their modeling language together, instead of choosing
a language first. The poster *Free The Modeling!* (MiSE 2013) presents an agile way of building
conceptual views expanding upon existing models and tools. Two papers on *modeling situations* (elementary actions on models and
metamodels) present the idea and Openflexo as a free modeling tool
([2014](https://hal.science/hal-01015893), [2015](https://hal.science/hal-01164480)), and
[*Using free modeling as an Agile method for developing domain specific modeling
languages*](https://hal.science/hal-01393781) (2016) applies it to a local government project,
Brest Métropole.

## PAMELA and model-oriented programming

PAMELA is the annotation-based Java modeling framework on which Openflexo's model objects are
built. It blends programming and modeling: Java developers work at the conceptual level and at the
source-code level, without code transformation or generation and without round-trip issues
([*PAMELA: an annotation-based Java Modeling Framework*](https://hal.science/hal-03217126), 2021).
[*Monitoring Association Constraints in Model-Oriented Programming*](https://hal.science/hal-04240673)
(2023) uses it to reify complex association constraints so that they can be specified at
development time and monitored at runtime.

## Security

The team also applies its modeling work to security:
* [Pimca](https://hal.science/hal-02502387), a domain-specific modeling language that captures the
  attacker's point of view of a system and its attack surface (2020, see the
  [Cyber Threat Application](/docs/research/projects/cta));
* the specification of security patterns with Design by Contract
  ([2020](https://hal.science/hal-02958111)) and with Security Contracts, which monitor them at
  runtime ([2024](https://hal.science/hal-04578756));
* the automatic synchronisation of a PAMELA security pattern with its formal specification in Alloy,
  through model federation with Openflexo, so that a correctness check runs whenever a deployed
  pattern evolves ([2026](https://hal.science/hal-05715009), by other members of the team);
* an approach to analyse a cyber-physical system while taking the attacker's interests into
  account ([2022](https://hal.science/hal-03866297));
* a framework for the secure systems engineering of space missions, developed in response to a
  European Space Agency tender ([2023](https://hal.science/hal-04045293)).

## Design evolution

[*The Design Multiverse*](https://hal.science/hal-05503862) (2026) calls for a scientific model of
design evolution, with its branching, rework and context sensitivity, and proposes a research
agenda to validate it experimentally.
