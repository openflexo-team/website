#!/usr/bin/env python3
"""Refresh src/data/papers.js, the publications shown at /papers, from HAL.

HAL (hal.science) is the reference list of the team's publications. This script queries its public
API for the given HAL author identifiers, keeps the BibTeX record HAL exports for each document,
decodes the LaTeX accents to Unicode and writes them as the JavaScript module the page reads.
Python standard library only: this repository's package-lock.json cannot be regenerated, so
nothing here may add an npm dependency.

Run from the website repo root:

    python3 scripts/update_publications.py

Add an author to IDHAL to include their documents too. A document that is not about the work
presented on this site goes in EXCLUDE (with the reason), not in the data file by hand.
"""
import argparse
import json
import re
import sys
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

IDHAL = ["sylvain-guerin"]

# HAL identifier -> why it is not listed.
EXCLUDE = {
    "hal-00083035": "2004 paper on reconfigurable accelerators, unrelated to model federation",
    "hal-05154399": "2025 community challenge document on dynamic adaptation, not an Openflexo publication",
}

API = "https://api.archives-ouvertes.fr/search/"

ACCENTS = {"'": "́", "`": "̀", "^": "̂", '"': "̈", "~": "̃", "c": "̧", "v": "̌", "u": "̆", "H": "̋"}
LETTERS = {r"\ss": "ß", r"\o": "ø", r"\O": "Ø", r"\ae": "æ", r"\AE": "Æ", r"\l": "ł", r"\L": "Ł", r"\i": "i"}
PLAIN = {r"\&": "&", r"\_": "_", r"\%": "%", r"\$": "$", r"\#": "#"}


def decode_latex(text: str) -> str:
    def accent(match):
        return unicodedata.normalize("NFC", match.group(2) + ACCENTS[match.group(1)])

    # {\'e}  {\'{e}}  {\'\i}  {\c c}  {\c{c}}
    text = re.sub(r"\{\\([`'^\"~cvuH])\s*\{?\\?([A-Za-z])\}?\}", accent, text)
    for macro, char in LETTERS.items():
        text = re.sub(r"\{" + re.escape(macro) + r"\}", char, text)
    text = text.replace(r"$\rightarrow$", "→")
    for macro, char in PLAIN.items():
        text = text.replace(macro, char)
    return text


def js_template(text: str) -> str:
    return text.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def fetch(idhal: str) -> list:
    query = urllib.parse.urlencode({
        "q": f"authIdHal_s:{idhal}", "rows": 500, "wt": "json",
        "fl": "halId_s,producedDateY_i,label_bibtex", "sort": "producedDateY_i desc",
    })
    request = urllib.request.Request(f"{API}?{query}", headers={"User-Agent": "openflexo-website-publications"})
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)["response"]["docs"]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", type=Path, default=Path(__file__).resolve().parents[1] / "src" / "data" / "papers.js")
    args = parser.parse_args()

    documents = {}
    for idhal in IDHAL:
        for doc in fetch(idhal):
            documents[doc["halId_s"]] = doc
    kept = [d for hal_id, d in documents.items() if hal_id not in EXCLUDE]
    unknown = [hal_id for hal_id in EXCLUDE if hal_id not in documents]
    if unknown:
        print(f"note: excluded ids no longer returned by HAL: {', '.join(unknown)}", file=sys.stderr)
    kept.sort(key=lambda d: (-d["producedDateY_i"], d["halId_s"]))

    entries = [decode_latex(d["label_bibtex"]).strip() for d in kept]
    leftover = [e.splitlines()[0] for e in entries if re.search(r"\\[A-Za-z]", e)]
    if leftover:
        print("warning: LaTeX macros left undecoded in:\n  " + "\n  ".join(leftover), file=sys.stderr)

    args.out.write_text("export const data_papers = `" + js_template("\n".join(entries)) + "\n`\n")
    print(f"wrote {len(entries)} publications to {args.out} ({len(documents) - len(kept)} excluded)")


if __name__ == "__main__":
    main()
