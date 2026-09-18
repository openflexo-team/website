#!/usr/bin/env python3
"""Regenerate docs/get-started/versions.md from openflexo-buildplugin's buildconfig.

Source of truth: each branch of openflexo-buildplugin sets the version of every independently
versioned component in one file,
buildconfig/src/main/groovy/org/openflexo/buildplugin/plugin.groovy. This script reads that file
at a fixed list of git refs (no checkout needed: `git show <ref>:<path>`) and writes plain
Markdown tables. Python standard library only: this repository's package-lock.json cannot be
regenerated, so nothing here may add an npm dependency, and only the generated page is committed.

Run from the website repo root:

    python3 scripts/generate_version_table.py

Requires a clone of openflexo-buildplugin next to this repository -- pass --buildplugin-dir to
point elsewhere. Re-run it whenever a branch's buildconfig changes or a new release branch appears
(then add it to CURRENT_REFS below).
"""
import argparse
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

PLUGIN_PATH = "buildconfig/src/main/groovy/org/openflexo/buildplugin/plugin.groovy"

# (column label, git ref, one-line note). Recent branches first table, older ones second.
CURRENT_REFS = [
    ("2.0.0", "origin/2.0.0", "released in June 2020"),
    ("2.0.1", "origin/2.0.1", "released in March 2023, the last stable release"),
    ("2.0.2", "origin/2.0.2", "bug-fix evolution of 2.0.1"),
    ("2.99", "2.99", "development branch, introduces the textual FML syntax"),
    ("3.0", "3.0", "next major version, in development"),
]
FORMER_REFS = [
    ("1.8.1", "origin/1.8.1", "released in 2017, mostly deprecated"),
    ("1.9.0", "origin/1.9.0", "released in October 2018"),
    ("1.9.1", "origin/1.9.1", "released in 2019"),
]

# Java version required by each release. Hard-coded: buildconfig does not carry it. Java 8 up to
# and including 2.99, Java 17 or later from 3.0 on -- update by hand when a new branch is added.
JAVA_ROW = "Java version"
JAVA_VERSIONS = {
    "1.8.1": "Java 8", "1.9.0": "Java 8", "1.9.1": "Java 8",
    "2.0.0": "Java 8", "2.0.1": "Java 8", "2.0.2": "Java 8", "2.99": "Java 8",
    "3.0": "Java 17+",
}

# Row label -> pattern. The first row is the platform version, shared by the core, the technology
# adapters, the modules, the packaging, the modelers and the build plugin itself.
FIELDS = [
    ("Openflexo platform (core, technology adapters, modules, packaging, modelers, build plugin)",
     r'project\.openflexo\.openflexoVersion\s*=\s*"([^"]+)"'),
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


def extract_versions(content: str, ref: str) -> dict:
    versions = {}
    for label, pattern in FIELDS:
        match = re.search(pattern, content)
        if not match:
            sys.exit(f"error: no version found for {label!r} at {ref!r} -- plugin.groovy's shape has changed, update FIELDS")
        # The bare version is written in the source; the "-SNAPSHOT"/release suffix is added at build
        # time (the oldest branch hard-codes it, hence the strip).
        versions[label] = match.group(1).removesuffix("-SNAPSHOT")
    return versions


def render_table(columns: list) -> str:
    """columns: [(label, versions_dict), ...]"""
    header = "| Component | " + " | ".join(label for label, _ in columns) + " |"
    sep = "|---|" + "|".join(["---"] * len(columns)) + "|"
    rows = [header, sep]
    rows.append(f"| {JAVA_ROW} | " + " | ".join(JAVA_VERSIONS[label] for label, _ in columns) + " |")
    for row_label, _pattern in FIELDS:
        rows.append(f"| {row_label} | " + " | ".join(data[row_label] for _, data in columns) + " |")
    return "\n".join(rows)


def load(buildplugin_dir: Path, refs: list) -> list:
    return [(label, extract_versions(read_plugin_groovy(buildplugin_dir, ref), ref)) for label, ref, _note in refs]


def render_notes(refs: list) -> str:
    return "\n".join(f"* **{label}**: {note}" for label, _ref, note in refs)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--buildplugin-dir", type=Path, default=Path(__file__).resolve().parents[2] / "openflexo-buildplugin")
    parser.add_argument("--out", type=Path, default=Path(__file__).resolve().parents[1] / "docs" / "get-started" / "versions.md")
    args = parser.parse_args()

    if not args.buildplugin_dir.is_dir():
        sys.exit(f"error: {args.buildplugin_dir} does not exist -- pass --buildplugin-dir")

    current_table = render_table(load(args.buildplugin_dir, CURRENT_REFS))
    former_table = render_table(load(args.buildplugin_dir, FORMER_REFS))
    all_refs = ", ".join(ref for _, ref, _ in CURRENT_REFS + FORMER_REFS)

    page = f"""---
sidebar_position: 2
title: Component versions
---

# Component versions

<!-- Generated {date.today().isoformat()} by scripts/generate_version_table.py from
     openflexo-buildplugin's buildconfig (refs: {all_refs}).
     Do not hand-edit -- re-run the script instead. -->

Each Openflexo release ties together a compatible set of component versions. They are defined in
one place, the `buildconfig` of `openflexo-buildplugin`, and this page is generated from it, one
column per release branch. The core, the technology adapters, the modules, the packaging and the
modelers all carry the version of the Openflexo platform itself; the generic frameworks
(Connie, Pamela, Gina, Diana) and the utilities are versioned independently.

## Recent versions

{render_notes(CURRENT_REFS)}

{current_table}

Openflexo 2.99 does not run on a Java newer than 8: it freezes at startup (see
[Installing and running Openflexo](/downloads#install)).

## Former versions

{render_notes(FORMER_REFS)}

{former_table}
"""
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(page)
    print(f"wrote {args.out}")


if __name__ == "__main__":
    main()
