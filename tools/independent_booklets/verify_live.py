#!/usr/bin/env python3
"""HTTP smoke test for the deployed prototype, not merely GitHub repository files."""
from __future__ import annotations

import json
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = "https://rhsccs.org/"
KEYS = ("print_bw", "learn_colour", "booklet_bw", "booklet_colour")


def fetch(path, limit=2_000_000):
    url = ROOT + path.lstrip("/")
    req = Request(url, headers={"User-Agent": "RHS-offline-booklet-live-audit/1.0",
                                "Cache-Control": "no-cache"})
    with urlopen(req, timeout=30) as response:
        data = response.read(limit)
        if response.status != 200:
            raise RuntimeError(f"HTTP {response.status}: {url}")
        return data


def main():
    catalogue = None
    last_error = ""
    for attempt in range(36):
        try:
            raw = fetch("offline/booklets/catalogue.json")
            catalogue = json.loads(raw)
            if sum(map(len, catalogue["lessons"].values())) < 400:
                raise RuntimeError("Too few published draft lessons")
            index = fetch("offline/booklets/REVIEW_INDEX.html")
            if b"Independent booklet drafts" not in index:
                raise RuntimeError("Review index not yet deployed")
            break
        except (HTTPError, URLError, RuntimeError, ValueError, KeyError) as exc:
            last_error = str(exc)
            print(f"Waiting for current GitHub Pages deployment: {attempt+1}/36: {last_error}", flush=True)
            time.sleep(10)
    if catalogue is None or b"Independent booklet drafts" not in index:
        raise RuntimeError("Current site did not deploy within six minutes: " + last_error)
    lessons = catalogue["lessons"]
    samples = []
    for course in ("j277", "h446"):
        keys = sorted(lessons[course], key=int)
        picks = [keys[0], keys[len(keys)//4], keys[len(keys)//2],
                 keys[3*len(keys)//4], keys[-1]]
        samples.extend((course, k, lessons[course][k]) for k in dict.fromkeys(picks))
    verified = 0
    for course, number, record in samples:
        for field in KEYS:
            path = record[field]
            data = fetch(path, limit=6)
            if not data.startswith(b"%PDF-"):
                raise RuntimeError(f"Not a PDF: {course} {number} {field} {path}")
            verified += 1
    for page in ("j277-hub.html", "h446-hub.html"):
        html = fetch(page, limit=1_000_000)
        if b"offline-booklet-catalogue.js" not in html:
            raise RuntimeError("Hub missing dynamic catalogue loader: " + page)
    print(json.dumps({"result":"LIVE_SITE_PASS",
          "draft_lessons":sum(map(len,lessons.values())),
          "by_course":{k:len(v) for k,v in lessons.items()},
          "sample_pdf_http_gets":verified,
          "hub_pages":2,
          "teacher_approved":catalogue.get("teacher_approved")},indent=2))


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print("LIVE_SITE_FAIL:",exc,file=sys.stderr)
        raise
