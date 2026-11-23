---
sidebar_position: 11
title: Issues and planning
---

# Issues and planning

How defects and features are reported, labelled, planned and closed across the Openflexo repositories. It
applies to every repository of the [openflexo-team organisation](https://github.com/openflexo-team).

## Where things live

| What | Where | Role |
|---|---|---|
| An issue | the GitHub repository of the component concerned | the single record of a defect or a feature, with its discussion |
| The planning board | the organisation Project [OpenFlexo](https://github.com/orgs/openflexo-team/projects/4) | one view over the issues of all repositories: status, priority, size, target |
| Shared templates, labels and contribution guide | the repository [`.github`](https://github.com/openflexo-team/.github) | what every repository inherits |
| A rough idea not tied to a repository | a *draft issue* in the Project | converted into a real issue once it matures |

An issue belongs to exactly one repository: report it where the problem lives (`openflexo-core` for the FML
language and the platform, `pamela`, `gina`, a technology adapter…). If you are unsure, choose the closest one;
it can be transferred afterwards.

## Reporting an issue

Open **New issue** in the repository and pick a form:

* **Defect** — what happens and what you expected, how to reproduce it (steps, an FML script or a test), the
  version or branch, and a workaround if you know one.
* **Feature or evolution** — the problem to solve, the options you considered, and what would make it done.

Blank issues are disabled so that every report carries this minimum. A defect that a script or a test reproduces
is far quicker to fix: attach it.

### Identifiers

Defects and features that the team tracks carry an identifier in their title, `<PREFIX>-D-<n>: summary` for a
defect and `<PREFIX>-F-<n>: summary` for a feature, where the prefix is short and specific to the component
(`CORE` for `openflexo-core`, `PAMELA` for `pamela`…). The identifier is stable and never reused; commits and
other issues refer to it. A report from outside the team does not need one: the maintainers add it when they
take the issue in.

## Labels

Every repository has the same set of labels. They describe the issue; the Project describes its planning.

| Family | Labels | Meaning |
|---|---|---|
| Type | `bug`, `enhancement`, `refactoring`, `question`, `breaking-change`, `dependencies`, `workaround` | the nature of the issue |
| Area | `area:fml`, `parser`, `persistence`, `resources`, `ui`, `gina`, `technology-adapter`, `build-ci`, `localization`, `docs` | the part of the platform concerned |
| Reproduction | `repro:confirmed`, `repro:not-reproduced`, `repro:script` | whether the defect was reproduced, and whether a script or a test does it |
| State | `status:in-progress`, `status:blocked`, `status:deferred`, `status:needs-info` | work has started, waits for something, is postponed, or lacks information |
| Resolution | `resolved:fixed-in-3.0`, `resolved:obsolete`, `duplicate`, `wontfix`, `invalid` | why a closed issue was closed |
| Meetings | `to-be-discussed` | to be taken up at the next development planning meeting |
| Welcome | `good first issue`, `help wanted` | small, well delimited, reproducible — a good way to start |

An issue with no `status:*` label is simply waiting to be taken in (*To do*).

## The planning Project

The Project [OpenFlexo](https://github.com/orgs/openflexo-team/projects/4) gathers the open issues of all the
repositories, and the closed ones that were fixed in 3.0. Its fields:

| Field | Values | Set by |
|---|---|---|
| Status | To do, In Progress, Blocked, Deferred, Needs info, Done | derived from the `status:*` label; *Done* when the issue is closed |
| Priority | High, Medium, Low | the maintainers |
| Size | S, M, L, XL | the maintainers |
| Target | 3.0, 3.1, Later | the maintainers |

| Label of the issue | Status in the Project |
|---|---|
| none of the `status:*` labels | To do |
| `status:in-progress` | In Progress |
| `status:blocked` | Blocked |
| `status:deferred` | Deferred |
| `status:needs-info` | Needs info |
| the issue is closed | Done |

The Project has a board plus saved views that filter on labels: issues still to reproduce
(`repro:not-reproduced`), the others, and `good first issue` for newcomers. A view for `to-be-discussed` serves
the planning meetings.

The Project is brought in line with the repositories **on demand**, not continuously: a new issue appears in it
the next time the maintainers synchronise it, or when someone adds it by hand. The label stays
the reference for the state of an issue, the Project the reference for its priority, size and target.

## From the issue to the fix

1. **Triage.** A maintainer checks that the issue is clear, reproduces it when it is a defect (`repro:*`), and
   adds the area and, if needed, `status:needs-info`.
2. **Planning.** The issue is given a priority, a size and a target in the Project. Something that needs a
   decision is labelled `to-be-discussed` and settled at the planning meeting.
3. **Work.** Fork the repository, create a branch (`bugfix/<short-name>` or `feature/<short-name>`), write or
   update a test that fails without the change, then fix. Mark the issue `status:in-progress`.
4. **Commit.** The subject is `LEVEL / <ID>: summary`, where `LEVEL` is `LOW`, `MEDIUM` or `IMPORTANT` according
   to the weight of the change, e.g. `MEDIUM / CORE-D-45: validating a VirtualModel does not mark it modified`.
   Lines are wrapped at 70 columns.
5. **Pull request.** Describe the change, mention `Fixes #<number>` so that the issue closes with the merge, and
   say how it was tested.
6. **Closing.** Closing the issue moves it to *Done*. A fix released in 3.0 carries `resolved:fixed-in-3.0`;
   an issue closed without a fix carries the label that says why (`duplicate`, `wontfix`, `invalid`,
   `resolved:obsolete`).

## Adding to the shared set

A label, a template or a section of this guide that every repository should have is added in the repository
[`.github`](https://github.com/openflexo-team/.github): issue forms are inherited by every repository without
forms of its own. Labels are *not* inherited by GitHub: after a label is added to the reference list, the
maintainers create it in each repository (a script reads the list and creates what is missing, without deleting
anything).
