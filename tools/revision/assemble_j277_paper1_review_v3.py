#!/usr/bin/env python3
"""Assemble original J277 Paper 1 V3 PDFs into a GitHub review branch ONLY.

Do not modify j277-hub.html, published PDFs, skill-index.json or guide-links.js.
Check original SHA-256 hashes before touching source pieces.
"""
import hashlib
import json
import os
import shutil
import sys
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / "review/j277-paper1-v3-20261028"
IN = BASE / "incoming"
OUT = BASE / "verified"
MANIFEST = json.loads((BASE / "manifest.json").read_text(encoding="utf-8"))
PROPOSALS = json.loads((ROOT / "revision/j277/guides/candidate-paper1-page-map-20261028.json").read_text(encoding="utf-8"))
LIVE = json.loads((ROOT / "revision/j277/guides/skill-index.json").read_text(encoding="utf-8"))

def status(ready):
    print("REVIEW_READY=" + str(ready).lower())
    output = os.environ.get("GITHUB_OUTPUT")
    if output:
        with open(output, "a", encoding="utf-8") as handle:
            handle.write("ready=" + str(ready).lower() + "\n")

def sha(data):
    return hashlib.sha256(data).hexdigest()

parts = MANIFEST["digital_pdf"]["parts"]
files = [IN / part["file"] for part in parts] + [IN / MANIFEST["print_pdf"]["file"]]
missing = [str(x.relative_to(ROOT)) for x in files if not x.exists()]
if missing:
    print("Review files incomplete — no publication or index changes.")
    print("Missing:\n" + "\n".join(missing))
    status(False)
    sys.exit(0)

assert MANIFEST["status"] == "REVIEW_ONLY_NOT_LIVE"
for item in parts:
    data = (IN / item["file"]).read_bytes()
    assert len(data) == item["size"], "Part size changed: " + item["file"]
    assert sha(data) == item["sha256"], "Part SHA mismatch: " + item["file"]
digital = b"".join((IN / x["file"]).read_bytes() for x in parts)
print_bytes = (IN / MANIFEST["print_pdf"]["file"]).read_bytes()

for raw,record in [(digital,MANIFEST["digital_pdf"]),(print_bytes,MANIFEST["print_pdf"])]:
    assert raw.startswith(b"%PDF-"),"PDF header missing"
    assert len(raw)==record["size"],"Size mismatch"
    assert sha(raw)==record["sha256"],"Original PDF hash mismatch"

assert len(LIVE["skills"]) == MANIFEST["paper1_mcq_skills"] + 28
assert LIVE["guides"]["1"]["totalPages"] == 94
assert LIVE["guides"]["2"]["totalPages"] == 97
targets = PROPOSALS["Paper_1_skill_proposals"]
assert len(targets) == MANIFEST["paper1_mcq_skills"] == 33
assert PROPOSALS['candidate_page_count'] == MANIFEST['expected_pages']  # candidate layout remains identical
for key,item in targets.items():
    assert key in LIVE["skills"] and str(LIVE["skills"][key]["paper"])=="1"
    assert LIVE["skills"][key]["page"]==item["live_page"]
    assert 1<=item["candidate_page"]<=291

# Validate in memory before writing anything to the repository.
a = fitz.open(stream=digital, filetype="pdf")
b = fitz.open(stream=print_bytes, filetype="pdf")
assert len(a)==len(b)==MANIFEST["expected_pages"]==291
assert len(a.get_toc())==len(b.get_toc())==MANIFEST["expected_bookmarks"]==103
assert sum(len(p.get_links()) for p in a)==sum(len(p.get_links()) for p in b)==MANIFEST["expected_toc_links"]==20
assert all(a[i].get_text()==b[i].get_text() for i in range(291)), "Colour/print text mismatch"
for key,item in targets.items():
    page_num=item["candidate_page"]
    text=a[page_num-1].get_text().strip()
    assert len(text)>50,(key,page_num,"empty/near-empty mapped page")
a.close()
b.close()

OUT.mkdir(parents=True,exist_ok=True)
(OUT / MANIFEST["digital_pdf"]["file"]).write_bytes(digital)
(OUT / MANIFEST["print_pdf"]["file"]).write_bytes(print_bytes)
report={
 "status":"REVIEW_ONLY_NOT_LIVE",
 "checks":"PASS",
 "source_sha256":{k:MANIFEST[k]["sha256"] for k in ["digital_pdf","print_pdf"]},
 "page_count":291,
 "bookmarks":103,
 "navigation_links":20,
 "paper1_proposed_mcq_targets":33,
 "live_skill_index_unchanged":True,
 "live_paper1_page_count":94,
 "live_paper2_page_count":97,
 "release_blockers":["Full technical/mark-scheme sign-off","Real mobile PDF loading","Physical greyscale sample","Controlled release with index and feedback regression"]
}
(OUT/"REVIEW_VERIFICATION.json").write_text(json.dumps(report,indent=2)+"\n",encoding="utf-8")
for file in files:
    file.unlink()
print("PASS: original colour and print bytes reassembled; 291 pages, 103 bookmarks, 20 links, 33 candidate page targets.")
status(True)
