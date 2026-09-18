"""Make the first-page thumbnails shown next to each publication at /docs/research/publications.

HAL puts an anti-robot check in front of its files, so the PDFs cannot be fetched by a script: you
download them in a browser, into any folder, and this script renders their first page. For every
publication kept by update_publications.py that has a PDF on HAL it looks in that folder for the
file, resizes the first page and writes static/img/publications/<HAL id>.png. It also writes
src/data/publication-thumbnails.json, the map {HAL id: image path} the page reads. A publication
without a file gets no entry and the page shows a neutral frame.

A PDF is recognised by its name: it contains the HAL id (2024-models_hal-04617492.pdf, or simply
hal-04617492.pdf), or it is the name the file has on HAL (the last part of the address printed by
--list, which is also the name a browser gives the download). A publication that is not on HAL, or
has no file there, gets a thumbnail too when its PDF is in the folder under a name with its HAL id.

Rendering uses PDFKit, the PDF framework of macOS, through `osascript` (nothing to install). On
another system, install `pdftoppm` (poppler) or `mutool` and adapt render_first_page(). Pillow is
required. Nothing here touches npm.

Run from the website repo root, after update_publications.py:

    python3 scripts/update_publication_thumbnails.py --list                  # what to download
    python3 scripts/update_publication_thumbnails.py --pdf-dir ~/Downloads/publications
    python3 scripts/update_publication_thumbnails.py --pdf-dir ... --refresh # render all again

Without --refresh, only the missing thumbnails are rendered: to add a new publication, run
update_publications.py, download its PDF, and run this script again.
"""
import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

sys.dont_write_bytecode = True
sys.path.insert(0, str(Path(__file__).resolve().parent))
import update_publications  # noqa: E402  (IDHAL and EXCLUDE are shared, so the two lists never differ)

ROOT = Path(__file__).resolve().parents[1]
THUMBS_DIR = ROOT / "static" / "img" / "publications"
MAP_PATH = ROOT / "src" / "data" / "publication-thumbnails.json"
WIDTH = 240  # pixels; shown at half that width so that it stays sharp on high-density screens


def publications() -> dict:
    """{HAL id: (title, URL of the PDF on HAL)} of the publications the page lists, PDF or not."""
    found = {}
    for idhal in update_publications.IDHAL:
        for doc in update_publications.fetch(idhal):
            if doc["halId_s"] in update_publications.EXCLUDE:
                continue
            bibtex = doc["label_bibtex"]
            pdf = re.search(r"PDF = \{([^}]+)\}", bibtex)
            title = re.search(r"TITLE = \{\{(.*?)\}\}", bibtex, re.S)
            found[doc["halId_s"]] = (update_publications.decode_latex(title.group(1)) if title else doc["halId_s"], pdf.group(1) if pdf else None)
    return found


def find_pdf(directory: Path, hal_id: str, url):
    hal_name = url.rsplit("/", 1)[-1].lower() if url else None
    for candidate in sorted(directory.iterdir()):
        name = candidate.name.lower()
        if name.endswith(".pdf") and (hal_id.lower() in name or name == hal_name):
            return candidate
    return None


# PDFKit (macOS) draws the page on white. HAL adds a cover page ("To cite this version...") to some
# files: the thumbnail is then taken from the next page, the real first one.
JXA = """
ObjC.import('Quartz'); ObjC.import('AppKit');
function run(argv) {
  var doc = $.PDFDocument.alloc.initWithURL($.NSURL.fileURLWithPath(argv[0]));
  if (!doc) { return 'unreadable'; }
  var index = 0;
  var first = String(ObjC.unwrap(doc.pageAtIndex(0).string) || '').slice(0, 1500);
  if (doc.pageCount > 1 && /HAL is a multi-disciplinary|To cite this version|HAL Id:/i.test(first)) { index = 1; }
  var page = doc.pageAtIndex(index);
  var box = page.boundsForBox(0);
  var width = Number(argv[2]);
  var size = $.NSMakeSize(width, Math.round(width * box.size.height / box.size.width));
  var rep = $.NSBitmapImageRep.imageRepWithData(page.thumbnailOfSizeForBox(size, 0).TIFFRepresentation);
  rep.representationUsingTypeProperties($.NSBitmapImageFileTypePNG, $()).writeToFileAtomically(argv[1], true);
  return 'page ' + (index + 1);
}
"""


def render_first_page(pdf: Path, png: Path) -> str:
    if shutil.which("osascript") is None:
        sys.exit("error: `osascript` (macOS) not found; see the docstring to use another renderer")
    result = subprocess.run(["osascript", "-l", "JavaScript", "-e", JXA, str(pdf), str(png), str(WIDTH)],
                            capture_output=True, text=True)
    if result.returncode != 0 or not png.exists():
        raise RuntimeError(result.stderr.strip() or "PDFKit could not render the file")
    return result.stdout.strip()


def make_thumbnail(pdf: Path, out: Path) -> str:
    with tempfile.TemporaryDirectory() as tmp:
        rendered = Path(tmp) / "page.png"
        which = render_first_page(pdf, rendered)
        Image.open(rendered).convert("RGB").save(out, optimize=True)
        return which


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--pdf-dir", type=Path, help="folder holding the PDFs downloaded from HAL")
    parser.add_argument("--list", action="store_true", help="list the PDFs to download and which ones are already done")
    parser.add_argument("--refresh", action="store_true", help="render every thumbnail again, not only the missing ones")
    args = parser.parse_args()

    found = publications()
    with_pdf = {hal_id: (title, url) for hal_id, (title, url) in found.items() if url}
    THUMBS_DIR.mkdir(parents=True, exist_ok=True)

    if args.list or not args.pdf_dir:
        print(f"{len(found)} publications, {len(with_pdf)} with a PDF on HAL:\n")
        for hal_id, (title, url) in sorted(with_pdf.items()):
            done = "done   " if (THUMBS_DIR / f"{hal_id}.png").exists() else "MISSING"
            print(f"{done} {hal_id}  {title[:70]}\n        {url}")
        for hal_id, (title, url) in sorted(found.items()):
            if not url:
                print(f"no PDF  {hal_id}  {title[:70]}")
        return
    if not args.pdf_dir.is_dir():
        sys.exit(f"error: {args.pdf_dir} is not a folder")

    mapping, absent = {}, []
    for hal_id, (title, url) in sorted(found.items()):
        out = THUMBS_DIR / f"{hal_id}.png"
        if out.exists() and not args.refresh:
            mapping[hal_id] = f"/img/publications/{hal_id}.png"
            continue
        pdf = find_pdf(args.pdf_dir, hal_id, url)
        if pdf is None:
            if url:  # only a publication that HAL holds a file for is expected in the folder
                absent.append((hal_id, url))
            continue
        which = make_thumbnail(pdf, out)
        mapping[hal_id] = f"/img/publications/{hal_id}.png"
        print(f"{hal_id}: {which}, {out.stat().st_size // 1024} KB")

    for stale in THUMBS_DIR.glob("*.png"):
        if stale.stem not in found:
            stale.unlink()
    MAP_PATH.write_text(json.dumps(dict(sorted(mapping.items())), indent=2) + "\n")
    print(f"{len(mapping)} thumbnails, {len(found) - len(mapping)} publications without one")
    for hal_id, url in absent:
        print(f"not found in {args.pdf_dir}: {hal_id} ({url.rsplit('/', 1)[-1]})", file=sys.stderr)


if __name__ == "__main__":
    main()
