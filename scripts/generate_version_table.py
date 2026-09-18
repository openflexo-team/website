#!/usr/bin/env python3
"""Regenerate docs/get-started/versions.md from openflexo-buildplugin's buildconfig.

Source of truth (per CLAUDE.md / .claude/rules/gradle-build.md): each maintained branch of
openflexo-buildplugin sets every component's version in one file,
buildconfig/src/main/groovy/org/openflexo/buildplugin/plugin.groovy. This script reads that file
at a fixed set of git refs (no checkout needed — `git show <ref>:<path>`) and writes a plain
Markdown table. No npm dependency, no JS: this repo's package-lock.json cannot be regenerated, so
generation happens here and only its output is committed.

Run from the website repo root:

    python3 scripts/generate_version_table.py

Requires openflexo-buildplugin to be cloned as a sibling of this repo (the normal GIT-2.99
workspace layout) — pass --buildplugin-dir to point elsewhere.
"""
import argparse
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

PLUGIN_PATH = "buildconfig/src/main/groovy/org/openflexo/buildplugin/plugin.groovy"

# (column label, git ref, note). Per the 2026-09-18 decision: one column per maintained branch,
# 2.0.1 frozen as history. After the 2.99 release this set changes (2.99 -> stable, 3.0 appears as
# snapshot) -- edit this list by hand when that happens, everything else regenerates.
REFS = [
    ("2.0.1", "origin/2.0.1", "last stable release"),
    ("2.99", "2.99", "current development branch"),
    ("3.0", "3.0", "next major, early development"),
]

FIELDS = [
    ("Openflexo", r'project\.openflexo\.openflexoVersion\s*=\s*"([^"]+)"'),
    ("Connie", r'project\.(?:ext|openflexo)\.connieVersion\s*=\s*"([^"]+)"'),
    ("Pamela", r'project\.openflexo\.pamelaVersion\s*=\s*"([^"]+)"'),
    ("Gina", r'project\.openflexo\.ginaVersion\s*=\s*"([^"]+)"'),
    ("Diana", r'project\.openflexo\.dianaVersion\s*=\s*"([^"]+)"'),
    ("Utils", r'project\.openflexo\.utilsVersion\s*=\s*"([^"]+)"'),
]


def read_plugin_groovy(buildplugin_dir: Path, ref: str) -> str:
    result = subprocess.run(
        ["git", "-C", str(buildplugin_dir), "show", f"{ref}:{PLUGIN_PATH}"],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        sys.exit(f"error: could not read {PLUGIN_PATH} at ref {ref!r}: {result.stderr.strip()}")
    return result.stdout


def extract_versions(content: str) -> dict:
    versions = {}
    for label, pattern in FIELDS:
        match = re.search(pattern, content)
        if not match:
            sys.exit(f"error: pattern for {label!r} not found -- plugin.groovy's shape has changed, update FIELDS")
        # Groovy source keeps the bare version; the "-SNAPSHOT"/"" suffix is added at build time.
        versions[label] = match.group(1)
    return versions


def render_markdown(columns_with_notes: list) -> str:
    """columns_with_notes: [(label, versions_dict, note), ...]"""
    header = "| Component | " + " | ".join(f"{label} ({note})" for label, _data, note in columns_with_notes) + " |"
    sep = "|---|" + "|".join(["---"] * len(columns_with_notes)) + "|"
    rows = [header, sep]
    for row_label, _pattern in FIELDS:
        cells = [data[row_label] for _label, data, _note in columns_with_notes]
        rows.append(f"| {row_label} | " + " | ".join(cells) + " |")
    return "\n".join(rows)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--buildplugin-dir", type=Path, default=Path(__file__).resolve().parents[2] / "openflexo-buildplugin")
    parser.add_argument("--out", type=Path, default=Path(__file__).resolve().parents[1] / "docs" / "get-started" / "versions.md")
    args = parser.parse_args()

    if not args.buildplugin_dir.is_dir():
        sys.exit(f"error: {args.buildplugin_dir} does not exist -- pass --buildplugin-dir")

    columns_with_notes = [
        (label, extract_versions(read_plugin_groovy(args.buildplugin_dir, ref)), note)
        for label, ref, note in REFS
    ]
    table = render_markdown(columns_with_notes)

    page = f"""---
sidebar_position: 2
title: Component versions
---

# Component versions

<!-- Generated {date.today().isoformat()} by scripts/generate_version_table.py from
     openflexo-buildplugin's buildconfig (branches: {", ".join(ref for _, ref, _ in REFS)}).
     Do not hand-edit -- re-run the script instead. -->

Each Openflexo release ties together a compatible set of component versions, defined in one place:
`openflexo-buildplugin`'s `buildconfig`. This table is generated from that source, one column per
maintained branch, so it cannot drift the way a hand-written table does.

{table}

Java requirement: **2.99 needs Java 8** (it freezes at startup on newer JVMs — see
[Installing and running Openflexo](/downloads#install)); 3.0's requirement is not settled yet.
"""
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(page)
    print(f"wrote {args.out}")


if __name__ == "__main__":
    main()
