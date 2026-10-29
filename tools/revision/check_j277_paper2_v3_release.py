#!/usr/bin/env python3
"""Fail closed until BOTH Paper 2 V3 PDFs and all 28 page remaps are committed.
This is a release-safety check, not a substitute for content sign-off.
"""
from pathlib import Path
import hashlib
import json
import re
import sys
import fitz

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / "revision/j277/guides"
MANIFEST = json.loads((ROOT / "review/j277-paper2-v3-20261028/release-manifest.json").read_text())
INDEX = json.loads((BASE / "skill-index.json").read_text())
JS = (BASE / "guide-links.js").read_text(encoding="utf-8")
HUB = (ROOT / "j277-hub.html").read_text(encoding="utf-8")

def assert_file(record):
    path = BASE / record["file"]
    assert path.is_file(), "MISSING BINARY: upload " + str(path.relative_to(ROOT))
    data = path.read_bytes()
    assert len(data) == record["bytes"], "Incorrect PDF size: " + record["file"]
    assert hashlib.sha256(data).hexdigest() == record["sha256"], "PDF SHA-256 differs: " + record["file"]
    return fitz.open(stream=data, filetype="pdf")

def comparable(s):
    return re.sub(r"\s+", " ", s.replace("\u2019", "'").replace("\u2018", "'")).strip()

assert MANIFEST["edition"] == "V3-2026-10-28"
a = assert_file(MANIFEST["colour"])
b = assert_file(MANIFEST["print"])
assert len(a) == len(b) == MANIFEST["expected_pages"] == 193
assert len(a.get_toc()) == len(b.get_toc()) == MANIFEST["expected_bookmarks"] == 73
assert sum(len(p.get_links()) for p in a) == sum(len(p.get_links()) for p in b) == MANIFEST["expected_navigation_links"] == 12
for i in range(193):
    assert comparable(a[i].get_text()) == comparable(b[i].get_text()), "Text mismatch on PDF page " + str(i+1)
    assert a[i].get_text().strip() and b[i].get_text().strip(), "Blank PDF page " + str(i+1)
assert INDEX["guides"]["1"]["totalPages"] == 291, "Paper 1 guide was unexpectedly modified"
assert INDEX["guides"]["1"]["edition"] == "V4-2026-10-28", "Paper 1 edition unexpectedly modified"
assert INDEX["guides"]["2"]["totalPages"] == 193
assert INDEX["guides"]["2"]["file"] == MANIFEST["colour"]["file"]
assert INDEX["guides"]["2"]["edition"] == MANIFEST["edition"]

paper2 = {k:v for k,v in INDEX["skills"].items() if v["paper"] == "2"}
paper1 = {k:v for k,v in INDEX["skills"].items() if v["paper"] == "1"}
assert len(paper2) == 28 and len(paper1) == 33, "Expected 28 Paper 2 and 33 Paper 1 skills"
assert len(MANIFEST["Paper_2_skill_map"]) == 28
for item in MANIFEST["Paper_2_skill_map"]:
    skill, page, answer = item["skill"], item["page"], item["answer_page"]
    assert skill in paper2 and paper2[skill]["page"] == page, "Wrong MCQ page: " + skill
    question_text = a[page - 1].get_text()
    answer_text = a[answer - 1].get_text()
    assert "YOU DO" in question_text and "EXAM PRACTICE" in question_text, "Wrong practice page: " + skill
    assert "MARK SCHEME" in answer_text and "MODEL ANSWER" in answer_text, "Wrong answer page: " + skill
match = re.search(r" const source=(.+?);\n const entries=", JS, flags=re.S)
assert match, "Cannot parse guide-links.js"
assert json.loads(match.group(1)) == INDEX, "guide-links.js does not match skill-index.json"
assert MANIFEST["colour"]["file"] in HUB and MANIFEST["print"]["file"] in HUB
assert "J277_Paper_1_Revision_Guide_AP1_Aligned.pdf" in HUB
print("PASS: both 193-page PDFs, hashes, 73 bookmarks, 12 links, 28 mapped practice/answer pairs, unchanged Paper 1, generated JS, hub.")
