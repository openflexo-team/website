# Scripts

Everything here uses the Python standard library (plus Pillow for the thumbnails) and never touches
npm: the site's `package.json` and `package-lock.json` must stay as they are. Run every script from
the root of this repository.

| Script | Purpose | Needs |
|---|---|---|
| `check_site.py` | consistency checks of the whole site; exit status 1 on any error | network (`--offline` to skip); sibling clones of `openflexo-packaging`, `openflexo-buildplugin`, `openflexo-dev` for two checks |
| `generate_version_table.py` | rewrites `docs/develop/component-versions.md` from the `buildconfig` of `openflexo-buildplugin` | the sibling clone `openflexo-buildplugin` |
| `generate_repository_map.py` | rewrites `docs/develop/repository-map.md` from the `settings.gradle` of `openflexo-dev` | the sibling clone `openflexo-dev` |
| `update_publications.py` | refreshes the publications from HAL | network |
| `update_publication_thumbnails.py` | first-page thumbnails of the publications | PDFs downloaded by hand, macOS (PDFKit through `osascript`), Pillow |

The generated pages carry a "do not hand-edit" comment: change the script or its data, then run it
again. `check_site.py` fails when a generated page is out of date.

## Updating the publications

The list of publications comes from HAL (`IDHAL` and `EXCLUDE` at the top of
`update_publications.py`).

1. Refresh the references:

       python3 scripts/update_publications.py

   This writes one BibTeX file per document in `src/publis/` and `src/data/papers.js`. The site build
   (step "Update papers" of `build.gradle`) rebuilds `papers.js` from `src/publis/`, which is
   therefore the real source: never edit `papers.js` alone. To list a publication that is not on
   HAL, add a `.bib` file in `src/publis/` with a name that does not look like `2020-hal-123456.bib`;
   the script leaves it alone.

2. Refresh the thumbnails. HAL puts an anti-robot check in front of its files, so a script cannot
   download the PDFs: get them in a browser.

       python3 scripts/update_publication_thumbnails.py --list

   prints, for each publication, its state (`done`, `MISSING`, or `no PDF` when HAL has no file) and
   the address of the PDF. Open the addresses of the missing ones, save the files in a folder (a
   browser keeps the name they have on HAL, which is what the script looks for; any name that contains
   the HAL id, such as `2024-models_hal-04617492.pdf`, also works), then:

       python3 scripts/update_publication_thumbnails.py --pdf-dir <that folder>

   A publication that has no file on HAL still gets a thumbnail when its PDF is in the folder under a
   name with its HAL id. When HAL added a cover page to a file, the thumbnail is taken from the next
   page. Only the missing thumbnails are rendered (`--refresh` renders them all again). The images go to
   `static/img/publications/`, and the map `{HAL id: image}` to `src/data/publication-thumbnails.json`.
   A publication with no PDF on HAL shows an empty frame; uploading its PDF to HAL, when the
   publisher allows it, gives it a thumbnail at the next run.

3. Check, then commit `src/publis/`, `src/data/papers.js`, `src/data/publication-thumbnails.json`
   and `static/img/publications/`:

       python3 scripts/check_site.py --offline

## Adding a technology adapter or a repository

The generated pages are kept up to date by their scripts: a new technology adapter goes in
`src/data/technology-adapters.json`, a repository that is not an adapter in `CORE_REPOS` of
`generate_repository_map.py` (the script stops on a repository it has no description for), and a new
release branch in `CURRENT_REFS` and `JAVA_VERSIONS` of `generate_version_table.py`.
