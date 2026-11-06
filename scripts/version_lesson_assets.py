#!/usr/bin/env python3
"""Version only the small, reviewed classroom-lesson pilot using content hashes.

Run --check to detect stale URLs (no writes), or --write to update the allowlist.
No student-facing status or site deployment code is created by this script.
"""
from __future__ import annotations

import argparse
import hashlib
import re
from pathlib import Path

CORE_CSS = "assets/h446-lesson/lesson-classroom.css"
CORE_JS = "assets/h446-lesson/lesson.js"
ADAPTER = "lessons/j277/h446-adapter.js"
GENERATOR = "lessons/j277/autumn2-rebuilt.js"
PILOT_DIRECT = (
    "lessons/j277/lesson-001/index.html",
    "lessons/h446/lesson-038/index.html",
)
PILOT_ENTRIES = {
    "lessons/j277/lesson-003/index.html": ("h446-adapter.js", ADAPTER),
    "lessons/j277/lesson-020/index.html": ("autumn2-rebuilt.js", GENERATOR),
}


def fingerprint(content: str) -> str:
    return hashlib.sha256(content.encode("utf-8")).hexdigest()[:12]


def replace_versions(content: str, suffix: str, version: str, count: int, owner: str) -> str:
    # Require existing, explicit relative asset references. Never rewrite random
    # ?v parameters, external URLs, lesson links, exam questions or HTML content.
    regex = re.compile(r"(?P<path>(?:\.\./){1,6}" + re.escape(suffix) + r")\?v=[a-zA-Z0-9_.-]+")
    found = list(regex.finditer(content))
    if len(found) != count:
        raise ValueError(f"{owner}: expected {count} versioned links to {suffix}; found {len(found)}")
    return regex.sub(lambda m: m.group("path") + "?v=" + version, content)


def compute_updates(root: Path) -> dict[str, str]:
    """Read first, validate *all* replacements, then return proposed edits."""
    files = [CORE_CSS, CORE_JS, ADAPTER, GENERATOR, *PILOT_DIRECT, *PILOT_ENTRIES]
    originals = {p: (root / p).read_text(encoding="utf-8") for p in files}
    css_version, js_version = fingerprint(originals[CORE_CSS]), fingerprint(originals[CORE_JS])
    proposed = dict(originals)

    for path in (*PILOT_DIRECT, ADAPTER, GENERATOR):
        css_count = 2 if path in (ADAPTER, GENERATOR) else 1
        content = replace_versions(proposed[path], CORE_CSS, css_version, css_count, path)
        content = replace_versions(content, CORE_JS, js_version, 1, path)
        proposed[path] = content

    # The generated adapter's hash changes whenever its nested asset references
    # change. The entry point must then reference the *new adapter URL* too.
    for entry, (filename, dependency) in PILOT_ENTRIES.items():
        proposed[entry] = replace_versions(
            proposed[entry], filename, fingerprint(proposed[dependency]), 1, entry
        )
    return {p: body for p, body in proposed.items() if body != originals[p]}


def main() -> int:
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument("--check", action="store_true", help="check freshness, never write")
    cli.add_argument("--write", action="store_true", help="update allowlisted references")
    cli.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    args = cli.parse_args()
    if args.check == args.write:
        cli.error("Choose exactly one of --check or --write")
    updates = compute_updates(args.root)
    if not updates:
        print("Classroom pilot references are up to date.")
        return 0
    for path in updates:
        print(("UPDATE" if args.write else "STALE") + " " + path)
    if args.check:
        return 1
    for path, text in updates.items():
        (args.root / path).write_text(text, encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
