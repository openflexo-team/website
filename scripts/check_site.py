#!/usr/bin/env python3
"""Local consistency checks for the website. Run from the website repo root:

    python3 scripts/check_site.py            # everything, including the network checks
    python3 scripts/check_site.py --offline  # skip every check that needs the network

Exit status 1 if any check reports an error (warnings never fail the run). Python standard
library only: nothing here may add an npm dependency.

What it checks
  routes       every internal link (docs, pages, navbar, footer, sidebars) and every static asset
               reference resolves to a page the build will really produce, with the URL Docusaurus
               would give it (number prefixes stripped, generated category pages included)
  redirects    every target of the redirect map exists, no source shadows a real page, no chains
  external     every external URL answers, including each download URL (network)
  registry     technology-adapters.json is well formed, its logos exist, ids are unique
  downloads    every technology adapter used by downloads.json is in the registry, and the
               modules / adapters of each 2.99 package match openflexo-packaging
  snapshot     the snapshot date is the same everywhere in downloads.json, and is the latest one
               published on downloads.openflexo.org (a newer one is only a warning) (network)
  generated    docs/develop/component-versions.md and repository-map.md are what their generators
               would write today (needs the sibling openflexo-buildplugin / openflexo-dev clones)
  placeholders leftover placeholder text and empty sections
  structure    number prefixes in file names, duplicate sidebar positions, invalid category files
  publications src/data/papers.js is what the build rebuilds from src/publis/
"""
import argparse
import json
import posixpath
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

sys.dont_write_bytecode = True  # importing the generators must not leave __pycache__ in the repo
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

DOCS = ROOT / "docs"
STATIC = ROOT / "static"
REGISTRY_PATH = ROOT / "src" / "data" / "technology-adapters.json"
DOWNLOADS_PATH = ROOT / "src" / "data" / "downloads.json"
CONFIG_PATH = ROOT / "docusaurus.config.js"

STATUSES = {"stabilised", "migration-in-progress", "active-development", "limited-support", "retired", "unclassified"}
PLACEHOLDER_RE = re.compile(
    r"coming soon|lorem ipsum|\bTODO\b|\bTBD\b|wonderfull|\bsome text\b|this is a (?:test|placeholder)|\bnot not\b|under construction",
    re.IGNORECASE,
)
NUMBER_PREFIX_RE = re.compile(r"^(\d+)(\s*[-_.]+\s*)([^-_.\s].*)$")
IGNORED_HOSTS = {"www.w3.org", "localhost", "127.0.0.1"}

# openflexo-packaging helper name (`<name>Connector()`) -> technology adapter id of the registry.
PACKAGING_TA_HELPERS = {
    "diagram": "diagram", "emf": "emf", "xml": "xml", "owl": "owl", "excel": "xlsx",
    "powerpoint": "pptx", "docx": "docx", "odt": "odt", "pdf": "pdf", "gina": "gina",
    "jdbc": "jdbc", "kafka": "kafka", "java": "java", "opcUa": "opc-ua", "rest": "rest",
    "oslc": "oslc", "json": "json", "rhapsody": "rhapsody",
    "markdown": "markdown", "http": "http", "obp2": "obp2",
}
# Technology adapter archetypes (templates to copy): shipped by the Maintainer package, but not
# adapters, so neither in the registry nor anywhere on the site.
PACKAGING_ARCHETYPE_HELPERS = {"xx", "dsl"}
# openflexo-packaging package directory -> package name in downloads.json.
PACKAGING_PACKAGES = {
    "flexomaintainer": "Openflexo Maintainer", "freemodelling": "FreeModellingEditor",
    "openflexo-designer": "Openflexo Designer", "openflexo-headless": "Openflexo Headless",
    "openflexo-server-package": "Openflexo Server",
}
# module helper (`openflexo("<id>")`) -> (module name in downloads.json, repository holding it).
PACKAGING_MODULES = {
    "fme-module": ("FreeModellingEditor", "free-modelling-editor"),
    "om-module": ("OpenflexoModeller", "openflexo-modeller"),
    "ea-module": ("EAModule", "enterprise-architecture-editor"),
}


class Report:
    def __init__(self):
        self.items = []

    def error(self, check, message):
        self.items.append(("ERROR", check, message))

    def warn(self, check, message):
        self.items.append(("WARN", check, message))

    def count(self, level):
        return sum(1 for item in self.items if item[0] == level)


# ---------------------------------------------------------------------------------------------
# Reading the site sources

def split_front_matter(text: str):
    if text.startswith("---\n"):
        end = text.find("\n---", 4)
        if end != -1:
            return text[4:end], text[end + 4:]
    return "", text


def front_matter_value(front_matter: str, key: str):
    match = re.search(rf"^{key}:\s*(.+?)\s*$", front_matter, re.MULTILINE)
    return match.group(1).strip("\"'") if match else None


def strip_number_prefix(segment: str) -> str:
    match = NUMBER_PREFIX_RE.match(segment)
    return match.group(3) if match else segment


def slugify(label: str) -> str:
    return re.sub(r"[^\w\- ]", "", label.lower()).replace(" ", "-")


def strip_code_and_comments(body: str) -> str:
    body = re.sub(r"```.*?```", "", body, flags=re.DOTALL)
    body = re.sub(r"<!--.*?-->", "", body, flags=re.DOTALL)
    return re.sub(r"`[^`\n]*`", "", body)


def load_category(directory: Path, report: Report):
    path = directory / "_category_.json"
    if not path.is_file():
        return None
    try:
        return json.loads(path.read_text())
    except json.JSONDecodeError as exc:
        report.error("structure", f"{path.relative_to(ROOT)}: invalid JSON ({exc})")
        return None


def collect_routes(report: Report):
    """{route: source} for everything the build will serve, mirroring Docusaurus' naming rules."""
    routes = {}
    file_routes = {}  # docs file -> route, for links written with a .md extension
    for md in sorted(list(DOCS.rglob("*.md")) + list(DOCS.rglob("*.mdx"))):
        rel = md.relative_to(DOCS).with_suffix("")
        parts = [strip_number_prefix(p) for p in rel.parts]
        front_matter, _ = split_front_matter(md.read_text())
        slug = front_matter_value(front_matter, "slug")
        if slug:
            route = "/docs" + (slug if slug.startswith("/") else "/" + "/".join(parts[:-1] + [slug]))
        elif parts[-1] in ("index", "README") or (len(parts) > 1 and parts[-1] == parts[-2]):
            route = "/docs" + ("/" + "/".join(parts[:-1]) if len(parts) > 1 else "")
        else:
            route = "/docs/" + "/".join(parts)
        routes[route.rstrip("/") or "/docs"] = str(md.relative_to(ROOT))
        file_routes[md] = route.rstrip("/")
    sidebar_roots = {DOCS / d for d in re.findall(r"dirName:\s*'([^']+)'", (ROOT / "sidebars.js").read_text())}
    for directory in sorted(p for p in DOCS.rglob("*") if p.is_dir()):
        category = load_category(directory, report)
        link = (category or {}).get("link") or {}
        if directory in sidebar_roots:
            continue  # the root of an autogenerated sidebar is not a category of that sidebar: no page
        if link.get("type") == "generated-index":
            label = category.get("label") or directory.name
            slug = link.get("slug") or "/category/" + slugify(label)
            routes["/docs" + slug.rstrip("/")] = f"generated index of {directory.relative_to(ROOT)}"
    pages = ROOT / "src" / "pages"
    for page in sorted(pages.rglob("*")):
        if page.suffix not in (".js", ".jsx", ".tsx", ".md", ".mdx") or page.name.startswith("_"):
            continue
        rel = page.relative_to(pages).with_suffix("")
        parts = list(rel.parts)
        if parts[-1] == "index":
            parts = parts[:-1]
        routes["/" + "/".join(parts) if parts else "/"] = str(page.relative_to(ROOT))
    return routes, file_routes


def static_exists(path: str) -> bool:
    return (STATIC / path.lstrip("/")).is_file()


# ---------------------------------------------------------------------------------------------
# Link collection

MD_LINK_RE = re.compile(r"\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
HTML_ATTR_RE = re.compile(r"""\b(?:href|src)="([^"]+)\"""")
CODE_INTERNAL_RE = re.compile(r"""\b(?:to|href|src)\s*[=:]\s*["'`](/[^"'`$]*)["'`]""")
URL_RE = re.compile(r"""https?://[^\s"'`()<>\\\]\[{}]+""")


def clean_url(url: str) -> str:
    return url.rstrip(".,;:").split("#")[0]


def check_internal(target, source, page_route, routes, file_routes, page_file, report):
    target = target.split("#")[0].split("?")[0]
    if not target:
        return
    if target.endswith((".md", ".mdx")) and not target.startswith("/") and page_file is not None:
        resolved = (page_file.parent / target).resolve()
        if resolved in file_routes:
            return
        report.error("routes", f"{source}: link to {target} which is not a doc")
        return
    if not target.startswith("/"):
        target = posixpath.join(posixpath.dirname(page_route or "/"), target)
    normalized = posixpath.normpath(target).rstrip("/") or "/"
    if normalized in routes or static_exists(normalized):
        return
    report.error("routes", f"{source}: broken internal link {target}")


def collect_links(routes, file_routes, report):
    """Returns {external url: [sources]}. Reports broken internal links on the way."""
    external = {}

    def note_external(url, source):
        url = clean_url(url)
        host = re.sub(r"^https?://([^/:]+).*$", r"\1", url)
        if host in IGNORED_HOSTS or "$" in url:
            return
        external.setdefault(url, []).append(source)

    for md, route in sorted(file_routes.items()):
        source = str(md.relative_to(ROOT))
        body = strip_code_and_comments(split_front_matter(md.read_text())[1])
        for target in MD_LINK_RE.findall(body) + HTML_ATTR_RE.findall(body):
            if target.startswith(("http://", "https://")):
                note_external(target, source)
            elif not target.startswith(("mailto:", "#", "tel:", "data:")):
                check_internal(target, source, route, routes, file_routes, md, report)

    code_files = [p for p in (ROOT / "src").rglob("*") if p.suffix in (".js", ".jsx", ".json")]
    code_files += [CONFIG_PATH, ROOT / "sidebars.js"]
    for path in sorted(code_files):
        source = str(path.relative_to(ROOT))
        text = path.read_text()
        for target in CODE_INTERNAL_RE.findall(text):
            if not target.startswith("//"):
                check_internal(target, source, "/", routes, file_routes, None, report)
        for url in URL_RE.findall(text):
            note_external(url, source)
    return external


# ---------------------------------------------------------------------------------------------
# Checks

def check_redirects(routes, report):
    text = CONFIG_PATH.read_text()
    pairs = re.findall(r"\{\s*from:\s*'([^']+)'\s*,\s*to:\s*'([^']+)'\s*,?\s*\}", text)
    sources = {p[0].rstrip("/") for p in pairs}
    if not pairs:
        report.warn("redirects", "no redirect found in docusaurus.config.js (pattern changed?)")
    for source, target in pairs:
        normalized = target.rstrip("/") or "/"
        if normalized not in routes:
            report.error("redirects", f"{source} -> {target}: the target is not a page")
        if source.rstrip("/") in routes:
            report.error("redirects", f"{source}: a real page lives there, the redirect would shadow it")
        if normalized in sources:
            report.error("redirects", f"{source} -> {target}: the target is itself redirected")
    return len(pairs)


def probe_once(url):
    request_headers = {"User-Agent": "Mozilla/5.0 (compatible; openflexo-site-check)"}
    for method in ("HEAD", "GET"):
        try:
            request = urllib.request.Request(url, method=method, headers=request_headers)
            with urllib.request.urlopen(request, timeout=20) as response:
                return response.status
        except urllib.error.HTTPError as exc:
            if method == "HEAD" and exc.code in (400, 403, 405, 501):
                continue
            return exc.code
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            return str(getattr(exc, "reason", exc))
    return 0


def probe(url):
    """Status code, or an error string. A server error or a network hiccup gets one more try."""
    status = probe_once(url)
    if not isinstance(status, int) or status >= 500:
        time.sleep(1)
        status = probe_once(url)
    return status


def check_external(external, report):
    with ThreadPoolExecutor(max_workers=6) as pool:
        results = list(pool.map(probe, external))
    for url, status in zip(external, results):
        where = ", ".join(sorted(set(external[url])))
        if isinstance(status, int) and 200 <= status < 400:
            continue
        if status in (401, 403, 429) or (isinstance(status, str) and ("reset" in status or "timed out" in status)):
            report.warn("external", f"{url}: {status}, cannot tell ({where})")
        else:
            report.error("external", f"{url}: {status} ({where})")


def load_registry(report):
    try:
        data = json.loads(REGISTRY_PATH.read_text())
    except (OSError, json.JSONDecodeError) as exc:
        report.error("registry", f"cannot read {REGISTRY_PATH.relative_to(ROOT)}: {exc}")
        return {}, {}
    by_id, by_name = {}, {}
    for entry in data.get("adapters", []):
        ident = entry.get("id", "?")
        missing = [k for k in ("id", "name", "description", "logo", "repository", "status") if k not in entry]
        if missing:
            report.error("registry", f"{ident}: missing field(s) {', '.join(missing)}")
            continue
        if ident in by_id:
            report.error("registry", f"{ident}: duplicate id")
        by_id[ident] = entry
        if entry["status"] not in STATUSES:
            report.error("registry", f"{ident}: unknown status {entry['status']!r}")
        if not entry["repository"].startswith("https://github.com/openflexo-team/"):
            report.error("registry", f"{ident}: repository is not under github.com/openflexo-team")
        if entry["logo"] is None:
            report.warn("registry", f"{ident}: no logo yet")
        elif not static_exists(entry["logo"]):
            report.error("registry", f"{ident}: logo {entry['logo']} does not exist under static/")
        for name in [entry["name"], *entry.get("aliases", [])]:
            by_name[name.lower()] = ident
    return by_id, by_name


def git_show(repo: Path, ref: str, path: str):
    """A committed file with its commented-out lines removed (build files toggle lines with //)."""
    result = subprocess.run(["git", "-C", str(repo), "show", f"{ref}:{path}"], capture_output=True, text=True)
    if result.returncode != 0:
        return None
    return "\n".join(line for line in result.stdout.splitlines() if not line.lstrip().startswith("//"))


def packaging_contents(workspace: Path, report):
    """{package name: {"ta": {ids}, "modules": {names}}} of openflexo-packaging at branch 2.99."""
    packaging = workspace / "openflexo-packaging"
    if not packaging.is_dir():
        report.warn("downloads", "openflexo-packaging is not next to this repository: packages not checked")
        return None
    ref = "2.99"
    listing = subprocess.run(["git", "-C", str(packaging), "ls-tree", "-d", "--name-only", ref, "packages/"],
                             capture_output=True, text=True)
    if listing.returncode != 0:
        report.warn("downloads", "openflexo-packaging has no branch 2.99: packages not checked")
        return None
    directories = {line.split("/")[-1] for line in listing.stdout.split()}

    def parse(directory, seen=()):
        text = git_show(packaging, ref, f"packages/{directory}/build.gradle") or ""
        adapters, modules = set(), set()
        for helper in re.findall(r"runtimeOnly\s+(\w+)Connector\(\)", text):
            if helper in PACKAGING_ARCHETYPE_HELPERS:
                continue
            if helper not in PACKAGING_TA_HELPERS:
                report.error("downloads", f"packages/{directory}: {helper}Connector() is not mapped in check_site.py")
            else:
                adapters.add(PACKAGING_TA_HELPERS[helper])
        for module in re.findall(r'openflexo\("([\w-]+)"\)', text):
            if module in PACKAGING_MODULES:
                name, repo = PACKAGING_MODULES[module]
                modules.add(name)
                module_text = git_show(workspace / repo, ref, f"{module}/build.gradle") or ""
                for helper in re.findall(r"(?:implementation|api|runtimeOnly)\s+(\w+)Connector\(\)", module_text):
                    if helper in PACKAGING_TA_HELPERS:
                        adapters.add(PACKAGING_TA_HELPERS[helper])
        for included in re.findall(r"project\(':packages:([\w-]+)'\)", text):
            if included not in seen:
                sub_adapters, sub_modules = parse(included, seen + (directory,))
                adapters |= sub_adapters
                modules |= sub_modules
        return adapters, modules

    contents = {}
    for directory in sorted(directories):
        if directory in PACKAGING_PACKAGES:
            adapters, modules = parse(directory)
            contents[PACKAGING_PACKAGES[directory]] = {"ta": adapters, "modules": modules}
        elif directory not in ("build",):
            report.warn("downloads", f"packages/{directory} is not mapped to a download package in check_site.py")
    return contents


def check_downloads(workspace, by_id, by_name, report):
    try:
        data = json.loads(DOWNLOADS_PATH.read_text())
    except (OSError, json.JSONDecodeError) as exc:
        report.error("downloads", f"cannot read downloads.json: {exc}")
        return
    listed = {entry["name"] for entry in data["technology_adapters"]}
    used = set()
    for version in data["versions"]:
        for package in version["packages"]:
            used |= set(package.get("ta", []))
    for name in sorted(listed | used):
        if name.lower() not in by_name:
            report.error("downloads", f"technology adapter {name!r} is used by downloads.json but absent from the registry")
    for name in sorted(used - listed):
        report.error("downloads", f"{name!r} is in a package but has no row in technology_adapters: the page would not show it")
    for name in sorted(listed - used):
        report.warn("downloads", f"technology_adapters row {name!r} is not in any package")

    def key(name):
        return by_name.get(name.lower(), name.lower())

    contents = packaging_contents(workspace, report)
    if contents is None:
        return
    for version in data["versions"]:
        if "2.99" not in version["version"]:
            continue
        for package in version["packages"]:
            expected = contents.get(package["name"])
            if expected is None:
                report.error("downloads", f"{version['version']}: package {package['name']!r} does not exist in openflexo-packaging")
                continue
            if "ta" in package:
                declared = {key(n) for n in package["ta"]}
                for ident in sorted(expected["ta"] - declared):
                    report.error("downloads", f"{package['name']}: openflexo-packaging ships {ident} but downloads.json does not list it")
                for ident in sorted(declared - expected["ta"]):
                    report.error("downloads", f"{package['name']}: downloads.json lists {ident} but openflexo-packaging does not ship it")
            declared_modules = set(package.get("modules", []))
            for name in sorted(expected["modules"] - declared_modules):
                report.error("downloads", f"{package['name']}: openflexo-packaging ships module {name} but downloads.json does not list it")
            for name in sorted(declared_modules - expected["modules"]):
                report.error("downloads", f"{package['name']}: downloads.json lists module {name} but openflexo-packaging does not ship it")
        for name in contents:
            if name not in {p["name"] for p in version["packages"]}:
                report.error("downloads", f"{version['version']}: openflexo-packaging has package {name!r}, absent from downloads.json")


MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]


def check_snapshots(offline, report):
    data = json.loads(DOWNLOADS_PATH.read_text())
    for version in data["versions"]:
        urls = [u for p in version["packages"] for u in p.get("downloadUrl", {}).values()]
        dated = [re.search(r"/openflexo/([^/]+)/(\d{4}-\d{2}-\d{2})/", u) for u in urls]
        dated = [m for m in dated if m]
        if not dated:
            continue
        dates = {m.group(2) for m in dated}
        directories = {m.group(1) for m in dated}
        if len(dates) > 1:
            report.error("snapshot", f"{version['version']}: several snapshot dates in the download URLs: {sorted(dates)}")
            continue
        date = dates.pop()
        label = re.search(r"([A-Za-z]+) (\d{1,2}), (\d{4})", version.get("label", ""))
        if label and label.group(1).lower() in MONTHS:
            label_date = f"{label.group(3)}-{MONTHS.index(label.group(1).lower()) + 1:02d}-{int(label.group(2)):02d}"
            if label_date != date:
                report.error("snapshot", f"{version['version']}: the label says {label_date} but the URLs use {date}")
        directory = directories.pop()
        if offline or "SNAPSHOT" not in directory:
            continue
        try:
            request = urllib.request.Request(f"https://downloads.openflexo.org/openflexo/{directory}/",
                                             headers={"User-Agent": "Mozilla/5.0 (compatible; openflexo-site-check)"})
            with urllib.request.urlopen(request, timeout=20) as response:
                published = re.findall(r'href="(\d{4}-\d{2}-\d{2})/"', response.read().decode("utf-8", "replace"))
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            report.warn("snapshot", f"cannot list downloads.openflexo.org/openflexo/{directory}/: {exc}")
            continue
        if published and max(published) > date:
            report.warn("snapshot", f"{version['version']}: the page uses {date} but {max(published)} is published")


def check_generated(workspace, report):
    import generate_repository_map
    import generate_version_table

    def normalize(text):
        return re.sub(r"Generated \d{4}-\d{2}-\d{2}", "Generated DATE", text)

    jobs = [
        ("component-versions.md", generate_version_table, workspace / "openflexo-buildplugin"),
        ("repository-map.md", generate_repository_map, workspace / "openflexo-dev"),
    ]
    for filename, module, source_dir in jobs:
        committed = DOCS / "develop" / filename
        if not source_dir.is_dir():
            report.warn("generated", f"{source_dir.name} is not next to this repository: {filename} not checked")
            continue
        try:
            expected = module.build_page(source_dir)
        except SystemExit as exc:
            report.error("generated", f"{filename}: the generator fails: {exc}")
            continue
        if not committed.is_file() or normalize(committed.read_text()) != normalize(expected):
            report.error("generated", f"docs/develop/{filename} is out of date: re-run scripts/{module.__name__}.py")


def check_publications(report):
    """The build rebuilds src/data/papers.js from src/publis/ (write_papers.js): they must agree."""
    def entries(text):
        return sorted(e.strip() for e in re.split(r"(?m)^(?=@)", text.replace("export const data_papers = `", "\n").rstrip("`\n")) if e.strip())

    publis = "".join(f.read_text() for f in sorted((ROOT / "src" / "publis").glob("*.bib")))
    data = (ROOT / "src" / "data" / "papers.js").read_text()
    thumbnails = json.loads((ROOT / "src" / "data" / "publication-thumbnails.json").read_text())
    known = set(re.findall(r"(?:HAL_ID|LOCAL_ID) = \{([^}]+)\}", data))
    for hal_id, image in thumbnails.items():
        if hal_id not in known:
            report.error("publications", f"publication-thumbnails.json: {hal_id} is not a listed publication")
        if not static_exists(image):
            report.error("publications", f"publication-thumbnails.json: {image} does not exist under static/")
    if entries(publis) != entries(data):
        report.error("publications", "src/data/papers.js differs from src/publis/*.bib, which the build uses to rebuild it: run scripts/update_publications.py")


def check_placeholders(report):
    files = list(DOCS.rglob("*.md")) + [p for p in (ROOT / "src").rglob("*") if p.suffix in (".js", ".json", ".md")]
    for path in sorted(files):
        source = str(path.relative_to(ROOT))
        text = path.read_text()
        body = strip_code_and_comments(text) if path.suffix == ".md" else text
        for number, line in enumerate(body.splitlines(), 1):
            match = PLACEHOLDER_RE.search(line)
            if match:
                report.error("placeholders", f"{source}: {match.group(0)!r} in: {line.strip()[:70]}")
        if path.suffix != ".md":
            continue
        no_comments = re.sub(r"<!--.*?-->", "", split_front_matter(text)[1], flags=re.DOTALL)
        lines = re.sub(r"```.*?```", "CODE", no_comments, flags=re.DOTALL).splitlines()
        for index, line in enumerate(lines):
            heading = re.match(r"^(#{1,6})\s+(\S.*)$", line)
            if not heading:
                continue
            following = next((l for l in lines[index + 1:] if l.strip()), None)
            following_heading = re.match(r"^(#{1,6})\s+(\S.*)$", following) if following else None
            if following is not None and not (following_heading and len(following_heading.group(1)) <= len(heading.group(1))):
                continue
            # "7.1 Styles" directly followed by "7.1.1 Row style" is a numbered parent, not an empty section.
            number = re.match(r"^\D*(\d+(?:\.\d+)*)", heading.group(2))
            if number and following_heading and re.match(rf"^\D*{re.escape(number.group(1))}\.\d", following_heading.group(2)):
                continue
            report.error("placeholders", f"{source}: empty section {line.strip()!r}")


def check_structure(report):
    for path in sorted(DOCS.rglob("*")):
        if NUMBER_PREFIX_RE.match(path.stem if path.is_file() else path.name):
            report.error("structure", f"{path.relative_to(ROOT)}: Docusaurus strips the number prefix from the URL; order with sidebar_position")
    for directory in [DOCS] + sorted(p for p in DOCS.rglob("*") if p.is_dir()):
        positions = {}
        for child in directory.iterdir():
            position = None
            if child.is_file() and child.suffix in (".md", ".mdx"):
                position = front_matter_value(split_front_matter(child.read_text())[0], "sidebar_position")
            elif child.is_dir():
                category = load_category(child, report)
                position = (category or {}).get("position")
            if position is not None:
                positions.setdefault(str(position), []).append(child.name)
        for position, names in positions.items():
            if len(names) > 1:
                report.warn("structure", f"{directory.relative_to(ROOT)}: sidebar position {position} is shared by {', '.join(sorted(names))}")


# ---------------------------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--offline", action="store_true", help="skip the checks that need the network")
    parser.add_argument("--workspace", type=Path, default=ROOT.parent,
                        help="directory holding the sibling clones (openflexo-packaging, openflexo-buildplugin, ...)")
    args = parser.parse_args()

    report = Report()
    routes, file_routes = collect_routes(report)
    external = collect_links(routes, file_routes, report)
    redirects = check_redirects(routes, report)
    by_id, by_name = load_registry(report)
    check_downloads(args.workspace, by_id, by_name, report)
    check_generated(args.workspace, report)
    check_placeholders(report)
    check_structure(report)
    check_publications(report)
    if args.offline:
        print("offline: external links and snapshot not checked")
    else:
        check_external(external, report)
        check_snapshots(False, report)

    for level, check, message in report.items:
        print(f"{level:5} [{check}] {message}")
    print(f"\n{len(routes)} routes, {redirects} redirects, {len(external)} external URLs, "
          f"{len(by_id)} technology adapters: {report.count('ERROR')} error(s), {report.count('WARN')} warning(s)")
    sys.exit(1 if report.count("ERROR") else 0)


if __name__ == "__main__":
    main()
