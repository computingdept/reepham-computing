#!/usr/bin/env python3
"""Refresh shared J277/H446 classroom asset references across standard lessons.

This is an asset-reference-only rollout. It never edits questions, answers,
teaching styles, navigation code or specialist lessons. It is safe to rerun:
unchanged assets produce the same content hashes and therefore no file changes.

Usage:
  python3 scripts/rollout_classroom_nav.py --write
  python3 scripts/rollout_classroom_nav.py --check
"""
from __future__ import annotations

import argparse
import hashlib
import re
from collections import Counter
from pathlib import Path

CSS = "assets/h446-lesson/lesson-classroom.css"
JS = "assets/h446-lesson/lesson.js"
ADAPTER = "lessons/j277/h446-adapter.js"
GENERATOR = "lessons/j277/autumn2-rebuilt.js"
SUFFIXES = {"css": CSS, "js": JS, "adapter": "h446-adapter.js",
            "generator": "autumn2-rebuilt.js"}
# Require a relative path, so the replacement never touches unrelated text.
EXPRESSIONS = {
    name: re.compile(
        r"(?P<path>(?:\.\./){1,6}" + re.escape(suffix)
        + r")(?:\?v=[a-zA-Z0-9_.-]+)?"
    )
    for name, suffix in SUFFIXES.items()
}


def fingerprint(body: str) -> str:
    return hashlib.sha256(body.encode("utf-8")).hexdigest()[:12]


def replace(body: str, key: str, version: str, expected: int, path: str) -> str:
    rx = EXPRESSIONS[key]
    found = list(rx.finditer(body))
    if len(found) != expected:
        raise ValueError(
            f"{path}: expected {expected} {key} references; found {len(found)}"
        )
    return rx.sub(lambda m: m.group("path") + "?v=" + version, body)


def compute_updates(root: Path) -> tuple[dict[str, str], Counter]:
    """Validate everything before returning ANY edits (no partial writes)."""
    originals: dict[str, str] = {}
    edited: dict[str, str] = {}
    counts: Counter = Counter()

    def read(path: str) -> str:
        if path not in originals:
            originals[path] = (root / path).read_text(encoding="utf-8")
        return originals[path]

    css_version = fingerprint(read(CSS))
    js_version = fingerprint(read(JS))

    # Shared generators each render their own HTML, so update both their
    # classroom and answer templates before fingerprinting the generators.
    for path in (ADAPTER, GENERATOR):
        body = read(path)
        css_count = len(EXPRESSIONS["css"].findall(body))
        js_count = len(EXPRESSIONS["js"].findall(body))
        if css_count != 2 or js_count != 1:
            raise ValueError(
                f"{path}: unexpected generator asset structure "
                f"(CSS={css_count}, JS={js_count})"
            )
        body = replace(body, "css", css_version, 2, path)
        body = replace(body, "js", js_version, 1, path)
        edited[path] = body
        counts["generator"] += 1

    versions = {
        "adapter": fingerprint(edited[ADAPTER]),
        "generator": fingerprint(edited[GENERATOR]),
    }

    for course in ("j277", "h446"):
        for entry in sorted((root / "lessons" / course).glob("lesson-*/index.html")):
            path = entry.relative_to(root).as_posix()
            original = read(path)
            css_count = len(EXPRESSIONS["css"].findall(original))
            js_count = len(EXPRESSIONS["js"].findall(original))
            adapter_count = len(EXPRESSIONS["adapter"].findall(original))
            gen_count = len(EXPRESSIONS["generator"].findall(original))

            if css_count or js_count:
                # Standard directly authored lessons always use the shared
                # stylesheet and lesson engine exactly once each.
                if (css_count, js_count, adapter_count, gen_count) != (1, 1, 0, 0):
                    raise ValueError(f"{path}: unexpected direct lesson links "
                                     f"(CSS={css_count}, JS={js_count}, "
                                     f"adapter={adapter_count}, gen={gen_count})")
                body = replace(original, "css", css_version, 1, path)
                body = replace(body, "js", js_version, 1, path)
                edited[path] = body
                counts["direct_" + course] += 1
            elif adapter_count or gen_count:
                if course != "j277" or adapter_count + gen_count != 1:
                    raise ValueError(f"{path}: unexpected generated lesson links")
                kind = "adapter" if adapter_count else "generator"
                edited[path] = replace(original, kind, versions[kind], 1, path)
                counts[kind + "_entries"] += 1
            else:
                # Redirects, completely different teaching systems, bespoke
                # revision and specialist layouts must remain untouched.
                counts["special_" + course] += 1

    counts["entry_total"] = sum(
        value for key, value in counts.items()
        if key.startswith(("direct_", "special_")) or key.endswith("_entries")
    )
    if counts["entry_total"] < 20:
        raise ValueError("Too few lessons found; refusing a partial rollout")
    updates = {
        path: body for path, body in edited.items()
        if body != originals[path]
    }
    counts["changed_files"] = len(updates)
    return updates, counts


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--write", action="store_true")
    group.add_argument("--check", action="store_true")
    parser.add_argument("--root", type=Path,
                        default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    updates, counts = compute_updates(args.root)
    print("Classroom asset rollout:", ", ".join(
        f"{key}={value}" for key, value in sorted(counts.items())
    ))
    if args.check and updates:
        print(f"{len(updates)} stale asset-reference files")
        return 1
    if args.write:
        for path, body in updates.items():
            (args.root / path).write_text(body, encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
