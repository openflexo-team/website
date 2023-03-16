---
sidebar_position: 1
title: Overview
description: An overview of the current research is available here
---

# Model federation

## Context and motivation

### Multiple views

From requirements to implementation, the development of complex systems involves the
realization of several design and analysis activities relying on various domain
expertises.

<img src="/images/research/img-1.svg" width="700"/>


Every concern is analysed and studied by domain experts using specific tools to design and
produce their point of view on a solution. Their work results in a set of models (text,
graphics, program, etc) with various formalisms and paradigms well-fitted to their concern
[<a href="#Xamaral_recent_2010">1</a>]. For example, the
previous image illustrates this multiplicity of viewpoints on the example of a house
project. Four examples of specific models are presented on the left of the image
illustrating: 

- the fact that they all model (denoted &mu; in the image) the same system
- the diversity of their form (3D image, plan, text, map in the image)
- the diversity of their intention (denoted *<span style={{color : 'blue'}}>I<sub>i</sub></span>* in the image),  imagining for *<span style={{color : 'blue'}}>I<sub>1</sub></span>*, designing for *<span style={{color : 'blue'}}>I<sub>2</sub></span>*,  selling for *<span style={{color : 'blue'}}>I<sub>3</sub></span>* and locating for *<span style={{color : 'blue'}}>I<sub>5</sub></span>*

Moreover, each field of expertise use a set of specific
Domain-Specific Modeling Languages, tools, methods, practices and
conventions.

<img src="/images/research/img-2.svg" width="700"/>

As everyone is working on the same system, collaboration is
unavoidable and requires to share languages, metamodels, tools, data
formats...
### Complex processes

<img src="/images/research/img-3.svg" width="700"/>

Design processes generally follow complex flow of activities where
models are results of tasks and inputs of other tasks. Moreover, each
actor wants its own language, tool, ... fitting its own requirements.

With this wide range of tools and models, the challenge is to ensure a
global consistency in order to produce a correct-by-construction
system. It is the responsibility of architects to integrate every
expert's and stakeholder's viewpoints [<a href="#Xmaier_art_2002">2</a>].

Moreover, this highly collaborative process need to support agile
methodologies to manage the co-evolution and reconciliation of the
various modeling concerns as they evolve.

### Problematics

Whatever the system under study might be, from pure technical [<a href="#XiFestRoles">3</a>],&#x00A0;[<a href="#Xvoirin_method_2008">4</a>] to socio-technical [<a href="#Xschekkerman_comparative_2004">5</a>]
systems, the same observations can be made. From embedded system
design to enterprise architecture modeling, the situation is the same:

  1. **multiplicity of views**: any stakeholder of the system needs a set of custom views, expressing his viewpoint;
  2. **multiplicity of concerns**: the space of functional and non-functional concerns often does not fit with the organization of views, as any view on the system might address several concerns;
  3. **multiplicity of models**: depending on the modeling intention, one has to choose the right formalisms and representations;
  4. **heterogeneity of modeling artifacts**: those can come in the form of structured diagrams or text (requirements), drawings, spreadsheets, process-flow data,...
## Our proposal

### Free modeling

Our first proposal is to help in the construction of collaborative models.

The usual process for modeling is to first choose a (modeling)
language and then to design the model using this chosen language.

What happens when:
* the language lack one concept,
* there is no way to represent an important information,
* a new practice emerge.

The common practice is to twist the language or the tools (it is
easier on a whiteboard, in a drawing program...) but it requires to
modify the tools and maintain these modifications.

<img src="/images/research/dislikeemoticon.jpg" width="100"/>

> **_The note content.Free modeling: co-construction of the model and its definition language._**

This approach rely on the separation of the language (or metamodel)
layer in two concern: the **logical** (or business) concern and the
**representation / interaction** concern.

<img src="/images/research/img-4.svg" width="700"/>

In the image, elements of the model (the *instances*) may be
built as instances of logical concepts, may be created without any
reference to a concept. At any moment, an instance can be declared as
instance of an existing concept or can be used to create a concept
from. Furthermore the representation / interaction aspects of an
instance can be defined through its concepts but it may also be
defined directly.

### Model federation

Our second proposal is to help in the consistency of a set of models.

The traditional approach is to rely on traces and verifications
(sometimes done by human).

What happens when:

- the number of models and metamodels grows,
- the models (and the metamodels) are frequently updated (in a agile context for example).

> **_Model federation: models are no more isolated but are bound to others._**

In the usual approach to modeling, the concrete artefact corresponding to a model encapsulates all the **values** of its elements reifying it in a certain technology (*e.g.* an excel file, a XMI serialization of a UML model). Following the model federation approach [<a href="#Xguychard:hal-00905036">6</a>], a (federated) model is not required to **own** all its elements. Instead of containing the **value** of an element, it may define mechanisms to get it from another accessible model when it is needed.  In general, these mechanisms must cross technological frontiers between models (*e.g.* between excel and UML) and support exchange in both way.

<img src="/images/research/img-5.svg" width="700"/>

## Reading guide

1. The motivation for model federation is more detailled in [<a href="#Xguychard:hal-00905036">6</a>] or in french in [<a href="#Xkoudry:hal-00904995">7</a>].

2. The state of a pseudo method for modeling in the context of free modeling and model federation is presented in french in [<a href="#Xbeugnard:hal-01015893">8</a>] and is much more detailed (again in french) in [<a href="#Xbeugnard:isi">9</a>]. We are still working on an english presentation on the subject.

3. The open source framework [Openflexo](http://openflexo.org) implements the two notions and some part of the previously described work.

## Bibliography

[1] <a id="Xamaral_recent_2010"></a>V. Amaral,   C. Hardebolle,   G. Karsai,   L. Lengyel,   and   T. Levendovszky. Recent   advances   in   multi-paradigm   modeling. In Models in Software Engineering,  ser.  Lecture  Notes  in  Computer  Science.     Springer  Berlin  Heidelberg,  2010,  vol.  6002,  pp.  220&#8211;224.  [Online].  Available: [http://dx.doi.org/10.1007/978-3-642-12261-3_21](http://dx.doi.org/10.1007/978-3-642-12261-3_21)

[2] <a id="Xmaier_art_2002"></a>M. W. Maier and E. Rechtin. The Art of Systems Architecting. CRC Press, 2002. [https://www.crcpress.com/product/isbn/9781420079135](https://www.crcpress.com/product/isbn/9781420079135)

[3] <a id="XiFestRoles"></a>W. Zhang, V. Leilde, B. Moller-Pedersen, J. Champeau, and C. Guychard. Towards tool integration through artifacts and roles. In the 19th Asia-Pacific Software Engineering Conference (APSEC), 2012, vol. 1, Dec., pp. 603&#8211;613.

[4] <a id="Xvoirin_method_2008"></a>J.-L. Voirin. Method &amp; tools for constrained system architecting. In 18th Annual International Symposium of the INCOSE 2008, Jun. 2008.

[5] <a id="Xschekkerman_comparative_2004"></a>J. Schekkerman. A comparative survey of enterprise architecture frameworks. Institute For Enterprise Architecture Development/Capgemini, Tech. Rep., 2004. [Online]. Available: [http://www.enterprise-architecture.info](http://www.enterprise-architecture.info)

[5] <a id="Xsevision2020"></a>Systems Engineering Vision 2020, sept 2007, iNCOSE-TP-2004-004-02. [Online]. Available: [http://www.incose.org/ProductsPubs/products/sevision2020.aspx](http://www.incose.org/ProductsPubs/products/sevision2020.aspx)

[6] <a id="Xguychard:hal-00905036"></a>C. Guychard, S. Guerin, A. Koudri, A. Beugnard, and F. Dagnat.  Conceptual interoperability through Models Federation.  In Semantic Information Federation Community Workshop, Miami, USA, Oct. 2013.

[7] <a id="Xkoudry:hal-00904995"></a>A. Koudri, C. Guychard, S. Guerin, F. Dagnat, A. Beugnard, and J. Champeau.  De la n&eacute;cessit&eacute; de f&eacute;d&eacute;rer des mod&egrave;les dans une cha&icirc;ne d'outils. G&eacute;nie logiciel, C&amp;S, 2013, pp.18-23.

[8] <a id="Xbeugnard:hal-01015893"></a>A. Beugnard, F. Dagnat, S. Guerin, and C. Guychard. Des situations de mod&eacute;lisation pour &eacute;valuer les outils de mod&eacute;lisation. INFORSID 2014 : 32&egrave;me congr&egrave;s de l'INFormatique des ORganisations et Syst&egrave;mes d'Information et de D&eacute;cision, May 2014, Lyon, France. pp.181-196, 2014. [Online]. Available: [http://inforsid.fr/Lyon2014/wp-content/uploads/papiers/11_paper_15.pdf](http://inforsid.fr/Lyon2014/wp-content/uploads/papiers/11_paper_15.pdf)

[9] <a id="Xbeugnard:isi"></a>A. Beugnard, F. Dagnat, S. Guerin, and C. Guychard. Des situations de mod&eacute;lisation pour d&eacute;crire un processus de mod&eacute;lisation. M&eacute;thodes, langages et outils de mod&eacute;lisation pour l'ing&eacute;nierie des SI. RTSI S&eacute;rie ISI, Vol. 20, Num. 2/2015, pp. 41-66. [Online]. Available: [http://dx.doi.org/10.3166/isi.20.2.41-66](http://dx.doi.org/10.3166/isi.20.2.41-66)