#!/usr/bin/env python3
"""Regenerate docs/develop/repository-map.md.

The list and grouping of repositories come from the committed `settings.gradle` of the
`openflexo-dev` aggregate build (one `includeBuild '../<repo>'` line per repository, grouped under
its own comments). Descriptions and statuses of technology adapters come from
src/data/technology-adapters.json; those of every other repository from CORE_REPOS below.
Python standard library only: this repository's package-lock.json cannot be regenerated, so
nothing here may add an npm dependency, and only the generated page is committed.

Run from the website repo root:

    python3 scripts/generate_repository_map.py

Requires a clone of openflexo-dev next to this repository -- pass --openflexo-dev-dir to point
elsewhere. A repository absent from both tables makes the script fail rather than guess.
"""
import argparse
import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

INCLUDE_RE = re.compile(r"^(//)?\s*includeBuild\s*'\.\./([\w.-]+)'\s*$")
# Real section headers in settings.gradle are short titles ("Technology adapters", "Server"), not
# the explanatory sentences at the top of the file: cap the word count and reject sentence openers.
SECTION_RE = re.compile(r"^//\s*([A-Z][^.]*)$")
SECTION_MAX_WORDS = 4
SECTION_STOPWORDS = {"the", "for", "each", "you"}

# Every repository that is not a technology adapter: (description, status).
CORE_REPOS = {
    "openflexo-buildplugin": ("Gradle build plugin and version configuration shared by every repository", "Active"),
    "connie": ("Expression language and binding framework", "Active"),
    "diana": ("Diagramming and 2D drawing framework", "Active"),
    "gina": ("Generic user-interface framework: widgets, panels, inspectors", "Active"),
    "pamela": ("Modeling framework: annotated interfaces woven into stateful model objects", "Active"),
    "pamela-editor": ("Editor for Pamela metamodels", "Active"),
    "openflexo-utils": ("Shared utility classes", "Active"),
    "openflexo-core": ("Model federation engine and FML, the Flexo Modeling Language", "Active"),
    "openflexo-ui": ("Shared user-interface components of the Openflexo applications", "Active"),
    "modelers": ("BPMN, UML, statecharts and OWL modelers", "Active"),
    "openflexo-integration-tests": ("Regression tests and example federation use cases", "Active"),
    "openflexo-packaging": ("Assembles modules and technology adapters into downloadable packages", "Active"),
    "pimca": ("Domain-specific systems modeling language for cyber threat analysis", "Research prototype"),
    "cta": ("Cyber Threat Application, built on Pimca (see [Research](/docs/research/projects/cta))", "Research prototype"),
    "formod": ("Formose application: the B technology adapter, its module and its tests", "Research prototype"),
    "openflexo-technology-adapters": ("Historical container of technology adapters, now holding only the `xx-ta` template", "Legacy"),
    "openflexo-server": ("HTTP server exposing the Openflexo infrastructure through a REST API", "Active"),
    "openflexo-modules": ("Template (`xxxmodule`) for building a new application module", "Active"),
    "openflexo-modeller": ("Openflexo Modeller application: define and run model federations", "Active"),
    "free-modelling-editor": ("FreeModellingEditor application: build free graphical models", "Active"),
    "enterprise-architecture-editor": ("Enterprise Architecture editor application", "Active"),
    "openflexo-obp2": ("Connector for the OBP2 tool", "Retired"),
}

# Listed in settings.gradle but not reachable on GitHub (404): shown without a link.
NO_PUBLIC_REPOSITORY = {"pimca", "cta"}

STATUS_LABELS = {
    "stabilised": "Stabilised",
    "migration-in-progress": "Migration in progress",
    "active-development": "Active development",
    "limited-support": "Limited support",
    "retired": "Retired",
    "unclassified": "Not yet classified",
}

LEGEND = """## Statuses

Technology adapters follow the review made by the architecture board on 2026-04-03:

* **Stabilised**: complete and stable.
* **Migration in progress**: being migrated to the current architecture.
* **Active development**: new adapter, still being developed.
* **Limited support**: still available, with limited maintenance.
* **Retired**: no longer maintained nor shipped.

Other repositories are **Active** (maintained, part of the current platform), a **Research
prototype** (built for a research project), **Legacy** (kept for history) or **Retired**.
"""


def read_committed_settings_gradle(openflexo_dev_dir: Path) -> str:
    """The committed HEAD version, not the working tree: local, uncommitted includeBuild toggles
    must not leak into a page describing the shared project."""
    result = subprocess.run(
        ["git", "-C", str(openflexo_dev_dir), "show", "HEAD:settings.gradle"],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        sys.exit(f"error: could not read settings.gradle at HEAD: {result.stderr.strip()}")
    return result.stdout


def parse_settings_gradle(content: str) -> list:
    """Returns [(section_title, [repo_name, ...]), ...] in file order."""
    sections = [("Core and frameworks", [])]
    for line in content.splitlines():
        stripped = line.strip()
        include_match = INCLUDE_RE.match(stripped)
        if include_match:
            sections[-1][1].append(include_match.group(2))
            continue
        section_match = SECTION_RE.match(stripped)
        if section_match:
            title = section_match.group(1).strip()
            words = title.split()
            if len(words) <= SECTION_MAX_WORDS and words[0].lower() not in SECTION_STOPWORDS:
                sections.append((title, []))
    return [s for s in sections if s[1]]


def load_registry(path: Path) -> dict:
    data = json.loads(path.read_text())
    return {a["id"]: a for a in data["adapters"]}


def describe(name: str, registry: dict) -> tuple:
    """(description, status) of a repository. Registry ids come only from "openflexo-<id>"
    repositories: a bare name such as "gina" (the GUI framework) must never be matched to
    "openflexo-gina" (a different repository, the technology adapter)."""
    if name in CORE_REPOS:
        return CORE_REPOS[name]
    if name.startswith("openflexo-") and name[len("openflexo-"):] in registry:
        adapter = registry[name[len("openflexo-"):]]
        return adapter["description"], STATUS_LABELS[adapter["status"]]
    sys.exit(f"error: repository {name!r} is in settings.gradle but has no description: add it to CORE_REPOS")


def render_markdown(sections: list, registry: dict) -> str:
    parts = []
    for title, repos in sections:
        parts.append(f"## {title}\n")
        parts.append("| Repository | Description | Status |")
        parts.append("|---|---|---|")
        for name in repos:
            description, status = describe(name, registry)
            label = name if name in NO_PUBLIC_REPOSITORY else f"[{name}](https://github.com/openflexo-team/{name})"
            parts.append(f"| {label} | {description} | {status} |")
        parts.append("")
    return "\n".join(parts)


def build_page(openflexo_dev_dir: Path) -> str:
    """The full generated page. Exits (SystemExit) if a repository has no description."""
    if not openflexo_dev_dir.is_dir():
        sys.exit(f"error: {openflexo_dev_dir} does not exist -- pass --openflexo-dev-dir")

    sections = parse_settings_gradle(read_committed_settings_gradle(openflexo_dev_dir))
    registry = load_registry(Path(__file__).resolve().parent.parent / "src" / "data" / "technology-adapters.json")
    tables = render_markdown(sections, registry)

    return f"""---
sidebar_position: 2
title: Repository map
---

# Repository map

<!-- Generated {date.today().isoformat()} by scripts/generate_repository_map.py.
     Do not hand-edit -- re-run the script instead. -->

Openflexo is not a single repository: the infrastructure is made of independent repositories,
each with its own history and its own version. They are listed below, grouped by role.

Layering is strict, bottom-up: Connie, then Pamela, then Gina and Diana, then the core
(`openflexo-core`), the user interface, the technology adapters, the server and finally the
applications. A layer never depends on a higher one, and a technology adapter never depends on
another one. See [Set up your workspace](./setup) to check them out and build them together, and
[Component versions](/docs/develop/component-versions) for which version of each goes with a release.

{tables}
{LEGEND}"""


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--openflexo-dev-dir", type=Path, default=Path(__file__).resolve().parents[2] / "openflexo-dev")
    parser.add_argument("--out", type=Path, default=Path(__file__).resolve().parents[1] / "docs" / "develop" / "repository-map.md")
    args = parser.parse_args()

    page = build_page(args.openflexo_dev_dir)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(page)
    print(f"wrote {args.out}")


if __name__ == "__main__":
    main()
