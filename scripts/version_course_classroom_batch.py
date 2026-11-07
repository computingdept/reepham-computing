#!/usr/bin/env python3
"""Safely propose refreshed J277/H446 classroom asset URL versions in small batches.

Only version query parameters in known lesson entry points are changed. No
questions, classroom behaviour, assessment answers or lesson navigation code
are edited. All source pages are validated before --write changes any file.
"""
from __future__ import annotations

import argparse
import hashlib
import re
from pathlib import Path

CORE_DIR = "assets/h446-lesson"
DIRECT = ("lesson-base.css", "lesson-classroom.css", "lesson-print.css", "lesson.js")
GENERATOR_DIR = "lessons/j277"
GENERATORS = ("h446-adapter.js", "autumn2-rebuilt.js")
DIRECT_RE = re.compile(
    r"(?P<url>(?:\.\./){3}assets/h446-lesson/"
    r"(?P<name>lesson-base\.css|lesson-classroom\.css|lesson-print\.css|lesson\.js))"
    r"(?:\?v=[A-Za-z0-9_.-]+)?"
)
GENERATOR_RE = re.compile(
    r"(?P<url>\.\./(?P<name>h446-adapter\.js|autumn2-rebuilt\.js))"
    r"(?:\?v=[A-Za-z0-9_.-]+)?"
)


def digest(file: Path) -> str:
    if not file.is_file():
        raise FileNotFoundError(f"Missing asset: {file}")
    return hashlib.sha256(file.read_bytes()).hexdigest()[:12]


def edit_entry(content: str, course: str, number: int, hashes: dict[str, str]) -> str:
    if course == "j277" and number >= 3:
        matches = list(GENERATOR_RE.finditer(content))
        if len(matches) != 1:
            raise ValueError(f"{course}-{number:03d}: expected one versioned generator URL, found {len(matches)}")
        return GENERATOR_RE.sub(lambda m: m.group("url") + "?v=" + hashes[m.group("name")], content)

    matches = list(DIRECT_RE.finditer(content))
    counts = {name: sum(m.group("name") == name for m in matches) for name in DIRECT}
    if counts != {name: 1 for name in DIRECT}:
        raise ValueError(f"{course}-{number:03d}: unusual classroom assets {counts}; review separately")
    return DIRECT_RE.sub(lambda m: m.group("url") + "?v=" + hashes[m.group("name")], content)


def compute_updates(root: Path, course: str, start: int, end: int, skip: set[int] | None = None) -> dict[str, str]:
    if course not in ("j277", "h446") or not 1 <= start <= end <= 300:
        raise ValueError("Use course j277/h446 and an ascending lesson number range 1–300")
    skip = skip or set()
    hashes = {name: digest(root / CORE_DIR / name) for name in DIRECT}
    hashes.update({name: digest(root / GENERATOR_DIR / name) for name in GENERATORS})
    proposals = {}
    for number in range(start, end + 1):
        if number in skip:
            continue
        path = f"lessons/{course}/lesson-{number:03d}/index.html"
        target = root / path
        if not target.is_file():
            raise FileNotFoundError(f"Classroom entry missing: {path}")
        original = target.read_text(encoding="utf-8")
        updated = edit_entry(original, course, number, hashes)
        # Changes MUST be URL versions only. If a file's structure is not
        # recognised we abort the entire batch without writing anything.
        strip = lambda s: re.sub(r"\?v=[A-Za-z0-9_.-]+", "", s)
        if strip(original) != strip(updated):
            raise ValueError(f"Non-version change detected: {path}")
        if updated != original:
            proposals[path] = updated
    return proposals


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--course", choices=("j277", "h446"), required=True)
    parser.add_argument("--start", type=int, required=True)
    parser.add_argument("--end", type=int, required=True)
    parser.add_argument("--skip", default="", help="Comma-separated exceptional lesson IDs")
    parser.add_argument("--write", action="store_true", help="Apply approved query-parameter changes")
    parser.add_argument("--check", action="store_true", help="Exit 1 when proposed changes remain")
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    if args.write and args.check:
        parser.error("Choose --write or --check, not both")
    skip = set(int(x) for x in args.skip.split(",") if x.strip())
    updates = compute_updates(args.root, args.course, args.start, args.end, skip)
    for path in updates:
        print(("UPDATE " if args.write else "STALE ") + path)
    print(f"{len(updates)} lesson entries with stale URL versions")
    if args.check:
        return 1 if updates else 0
    if args.write:
        for path, content in updates.items():
            (args.root / path).write_text(content, encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
