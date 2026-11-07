#!/usr/bin/env python3
"""Read-only J277/H446 shared-asset freshness inventory.

This reports URL version labels, not whether an individual browser's HTTP cache
is warm. No lesson markup or student-visible status is changed by this audit.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import posixpath
import re
from collections import Counter, defaultdict
from pathlib import Path

# Central UI/behaviour assets, not lesson-specific content or published PDFs.
TARGETS = frozenset({
    "assets/h446-lesson/lesson-base.css",
    "assets/h446-lesson/lesson-classroom.css",
    "assets/h446-lesson/lesson.js",
    "assets/h446-lesson/lesson-print.css",
    "assets/site-nav.css",
    "assets/site-nav.js",
    "assets/synergy-voice.css",
    "assets/synergy-voice.js",
    "assets/catchup-lesson.css",
    "assets/catchup-lesson.js",
    "assets/hub.css",
    "assets/hub-navigation.js",
    "assets/synergy-shell.css",
    "assets/synergy-brand.css",
    "assets/synergy-course-bar.css",
    "assets/synergy-tokens.css",
    "lessons/j277/h446-adapter.js",
    "lessons/j277/autumn2-rebuilt.js",
    "revision/shared/revision-ui.css",
    "revision/shared/revision-ui.js",
})

REF = re.compile(
    r"(?P<path>(?:/|(?:\.\./)+|\./|(?:assets|revision|lessons)/)"
    r"[A-Za-z0-9_./-]+\.(?:js|css))(?P<query>\?v=[A-Za-z0-9_.-]+)?"
)
# These scripts create markup inside a lesson URL, not their own directory.
GENERATED_CONTEXT = {
    "lessons/j277/h446-adapter.js": "lessons/j277/lesson-003/index.html",
    "lessons/j277/autumn2-rebuilt.js": "lessons/j277/lesson-020/index.html",
    "assets/h446-lesson/lesson.js": "lessons/h446/lesson-001/index.html",
}
GENERATOR_SOURCES = (
    *GENERATED_CONTEXT,
    "assets/site-nav.js",
    "assets/catchup-lesson.js",
    "assets/hub-navigation.js",
    "assets/synergy-shell.css",
)


def files_to_scan(root: Path):
    lesson_pages = [*root.glob("lessons/j277/**/*.html"), *root.glob("lessons/h446/**/*.html")]
    revision_pages = [*root.glob("revision/j277/**/*.html"), *root.glob("revision/h446/**/*.html")]
    hub_pages = [root / n for n in ("j277-hub.html", "h446-hub.html", "print-viewer.html")]
    script_sources = [root / n for n in GENERATOR_SOURCES]
    return sorted({p for p in [*lesson_pages, *revision_pages, *hub_pages, *script_sources] if p.is_file()})


def classify(rel: str) -> str:
    if rel.startswith("lessons/j277/"):
        return "J277 lesson / Catch Up"
    if rel.startswith("lessons/h446/"):
        return "H446 lesson / Catch Up"
    if rel.startswith("revision/j277/"):
        return "J277 revision"
    if rel.startswith("revision/h446/"):
        return "H446 revision"
    if rel in {"j277-hub.html", "h446-hub.html"}:
        return "Course hubs"
    return "Shared runtime / print"


def inventory(root: Path) -> dict:
    root = root.resolve()
    references: list[dict] = []
    per_asset: dict[str, Counter] = defaultdict(Counter)
    per_section: dict[str, Counter] = defaultdict(Counter)
    checked = files_to_scan(root)
    hashes = {}
    for name in TARGETS:
        target = root / name
        hashes[name] = hashlib.sha256(target.read_bytes()).hexdigest()[:12] if target.is_file() else None

    for path in checked:
        rel = path.relative_to(root).as_posix()
        context = GENERATED_CONTEXT.get(rel, rel)
        base = posixpath.dirname(context)
        content = path.read_text(encoding="utf-8", errors="replace")
        for match in REF.finditer(content):
            url = match.group("path")
            target = (url.lstrip("/") if url.startswith("/") else posixpath.normpath(posixpath.join(base, url)))
            if target not in TARGETS:
                continue
            label = match.group("query")
            version = label[3:] if label else None
            current = hashes[target]
            status = ("missing_file" if current is None else
                      "no_version" if version is None else
                      "current" if version == current else "legacy_version")
            entry = {"page": rel, "asset": target, "status": status,
                     "version": version, "expected": current}
            references.append(entry)
            per_asset[target][status] += 1
            per_section[classify(rel)][status] += 1

    totals = dict(Counter(x["status"] for x in references))
    affected = sorted({x["page"] for x in references if x["status"] != "current"})
    return {
        "purpose": "Read-only shared UI asset cache-version audit; no pupil-facing changes",
        "files_scanned": len(checked),
        "references_checked": len(references),
        "pages_needing_version_review": len(affected),
        "totals": totals,
        "by_section": {key: dict(val) for key, val in sorted(per_section.items())},
        "by_asset": {key: dict(val) for key, val in sorted(per_asset.items())},
        "examples": [x for x in references if x["status"] != "current"][:40],
        "all_findings": references,
    }


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    p.add_argument("--output", type=Path, help="Write a JSON report (local/CI only)")
    p.add_argument("--fail-on-stale", action="store_true", help="Optional strict mode for later rollout")
    args = p.parse_args()
    result = inventory(args.root)
    data = json.dumps(result, indent=2, ensure_ascii=False) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(data, encoding="utf-8")
    else:
        print(data, end="")
    if args.fail_on_stale and result["pages_needing_version_review"]:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
