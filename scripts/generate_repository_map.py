#!/usr/bin/env python3
"""Regenerate docs/develop/repository-map.md from openflexo-dev's settings.gradle.

Per CLAUDE.md: "The repo map ... [is] derivable from each settings.gradle." openflexo-dev's is the
aggregate one: every repository anyone works across is one `includeBuild '../<repo>'` line there,
grouped under its own comments, with the ones deliberately left out of the composite commented out
(`//includeBuild`). This script parses that file — no npm dependency, no JS, Python stdlib only —
and writes a plain Markdown page. Cross-references the technology-adapters.json registry for a
status badge where the two overlap.

Run from the website repo root:

    python3 scripts/generate_repository_map.py

Requires openflexo-dev to be cloned as a sibling of this repo (the normal GIT-2.99 workspace
layout) — pass --openflexo-dev-dir to point elsewhere.
"""
import argparse
import json
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

INCLUDE_RE = re.compile(r"^(//)?\s*includeBuild\s*'\.\./([\w.-]+)'\s*$")
# Real section headers in this file are short titles ("Technology adapters", "Server"), not the
# multi-sentence explanatory comments at the top of the file -- cap word count to tell them apart.
SECTION_RE = re.compile(r"^//\s*([A-Z][^.]*)$")
SECTION_MAX_WORDS = 4
# Explanatory prose ("The root project name", "The list of projects...") always starts with one of
# these; real section titles ("Technology adapters", "Server") never do.
SECTION_STOPWORDS = {"the", "for", "each", "you"}


def read_committed_settings_gradle(openflexo_dev_dir: Path) -> str:
    """The committed HEAD version, not the working tree: a contributor's own uncommitted
    includeBuild toggles (which repos *they* happen to have checked out right now) must not leak
    into a page meant to describe the shared, canonical default."""
    result = subprocess.run(
        ["git", "-C", str(openflexo_dev_dir), "show", "HEAD:settings.gradle"],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        sys.exit(f"error: could not read settings.gradle at HEAD: {result.stderr.strip()}")
    return result.stdout


def parse_settings_gradle(content: str) -> list:
    """Returns [(section_title, [(repo_name, active), ...]), ...] in file order."""
    sections = [("Core & frameworks", [])]
    for line in content.splitlines():
        stripped = line.strip()
        include_match = INCLUDE_RE.match(stripped)
        if include_match:
            commented, name = include_match.groups()
            sections[-1][1].append((name, commented is None))
            continue
        section_match = SECTION_RE.match(stripped)
        if section_match:
            title = section_match.group(1).strip()
            words = title.split()
            # Ignore the file's leading explanatory comments (they don't look like a short title).
            if len(words) <= SECTION_MAX_WORDS and words[0].lower() not in SECTION_STOPWORDS:
                sections.append((title, []))
    return [s for s in sections if s[1]]


def load_registry(path: Path) -> dict:
    if not path.is_file():
        return {}
    data = json.loads(path.read_text())
    return {a["id"]: a for a in data["adapters"]}


def render_markdown(sections: list, registry: dict) -> str:
    parts = []
    for title, repos in sections:
        parts.append(f"## {title}\n")
        parts.append("| Repository | Status |")
        parts.append("|---|---|")
        for name, active in repos:
            repo_url = f"https://github.com/openflexo-team/{name}"
            # Registry ids are derived only from "openflexo-<id>" repos. Do NOT strip a bare name
            # (e.g. "gina", the GUI framework) down to an id that collides with an unrelated
            # "openflexo-<id>" adapter (e.g. "openflexo-gina", the technology adapter) -- see
            # jenkins-api.md's warning: those two are different repositories.
            ta_id = name[len("openflexo-"):] if name.startswith("openflexo-") else None
            adapter = registry.get(ta_id) if ta_id else None
            if adapter:
                status = adapter["status"]
            elif active:
                status = "in the default composite build"
            else:
                status = "not in the default composite build"
            parts.append(f"| [{name}]({repo_url}) | {status} |")
        parts.append("")
    return "\n".join(parts)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--openflexo-dev-dir", type=Path, default=Path(__file__).resolve().parents[2] / "openflexo-dev")
    parser.add_argument("--out", type=Path, default=Path(__file__).resolve().parents[1] / "docs" / "develop" / "repository-map.md")
    args = parser.parse_args()

    if not args.openflexo_dev_dir.is_dir():
        sys.exit(f"error: {args.openflexo_dev_dir} does not exist -- pass --openflexo-dev-dir")

    content = read_committed_settings_gradle(args.openflexo_dev_dir)
    sections = parse_settings_gradle(content)
    registry_path = Path(__file__).resolve().parent.parent / "src" / "data" / "technology-adapters.json"
    registry = load_registry(registry_path)
    table = render_markdown(sections, registry)

    page = f"""---
sidebar_position: 2
title: Repository map
---

# Repository map

<!-- Generated {date.today().isoformat()} by scripts/generate_repository_map.py from
     openflexo-dev/settings.gradle, cross-referenced against src/data/technology-adapters.json.
     Do not hand-edit -- re-run the script instead. -->

`GIT-2.99` (see the workspace root `CLAUDE.md`) is a set of independently-cloned repositories, not
one monorepo. `openflexo-dev`'s `settings.gradle` is the aggregate composite build used for
cross-project development — every repository below is one `includeBuild` line there, grouped as
that file groups them. A repository marked "not in the default composite build" is commented out
there: present in the ecosystem, but not included by default (a research prototype, or a technology
not built locally by everyone).

Layering is strict bottom-up — `connie` → `pamela` → `gina`/`diana` → `openflexo-core` → UI →
technology adapters → server → applications — a lower layer never depends on a higher one; a
technology adapter never depends on another one. See the workspace `CLAUDE.md` for the invariant,
[Set up your workspace](./setup) for how to check these out and build them together, and
[Component versions](/docs/get-started/versions) for which version of each goes with a given
Openflexo release.

{table}"""
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(page)
    print(f"wrote {args.out}")


if __name__ == "__main__":
    main()
