#!/usr/bin/env python3
"""Publish preflight for J277 Paper 1 V4; change ONLY the J277 Paper 1 files.

Called by the scoped GitHub Actions release workflow. No source PDFs or Paper 2
skills are modified. A failed assertion prevents the commit/push.
"""
import hashlib
import json
import re
import shutil
import sys
from pathlib import Path
import fitz

work = Path(sys.argv[1]).resolve()
dest = Path(sys.argv[2]).resolve()
old_ref = Path(__file__).resolve().parents[2]
map_data = json.loads((old_ref / "revision/j277/guides/candidate-paper1-page-map-20261028.json").read_text())
proposals = map_data["Paper_1_skill_proposals"]
assert len(proposals) == 33
digital = work / "J277_Paper_1_Colour_V4_REVIEW.pdf"
print_ready = work / "J277_Paper_1_Print_V4_REVIEW.pdf"
assert digital.is_file() and print_ready.is_file()
a, b = fitz.open(digital), fitz.open(print_ready)
assert len(a) == len(b) == 291
assert len(a.get_toc()) == len(b.get_toc()) == 103
assert sum(len(p.get_links()) for p in a) == sum(len(p.get_links()) for p in b) == 20
assert all(a[i].get_text() == b[i].get_text() for i in range(291)), "Digital/print text differs"
assert all(len(p.get_text().strip()) >= 40 for p in a), "A page has too little text"
for p in [33, 71, 166]:
    assert a[p - 1].get_images(), f"Diagram missing at {p}"
for issue in [
    "unpublished review candidate",
    "same artwork as the published",
    "original number-line picture",
    "star and mesh · original diagrams",
    "preserving the source",
]:
    assert all(issue not in p.get_text().lower() for p in a), f"Legacy editorial text: {issue}"
for key, item in proposals.items():
    page = item["candidate_page"]
    assert 1 <= page <= 291
    text = a[page - 1].get_text().strip()
    assert len(text) >= 80, f"MCQ guide page has insufficient text: {key} p{page}"
    assert item["spec"] in text, f"MCQ guide page lacks spec number: {key} p{page}"

path = dest / "revision/j277/guides"
index_path = path / "skill-index.json"
index = json.loads(index_path.read_text(encoding="utf-8"))
assert index["guides"]["1"]["totalPages"] == 94
assert index["guides"]["2"]["totalPages"] == 97
assert len(index["skills"]) == 61
original_paper2 = {k:v for k,v in index["skills"].items() if v["paper"] == "2"}
assert len(original_paper2) == 28
changed = set()
for skill_id, item in proposals.items():
    skill = index["skills"][skill_id]
    assert skill["paper"] == "1"
    assert skill["page"] == item["live_page"]
    assert skill["spec"] == item["spec"]
    skill["page"] = item["candidate_page"]
    changed.add(skill_id)
assert len(changed) == 33
assert {k:v for k,v in index["skills"].items() if v["paper"] == "2"} == original_paper2
version = "V4-2026-10-28"
index["version"] = "2026-10-28-j277-paper1-v4"
index["guides"]["1"]["totalPages"] = 291
index["guides"]["1"]["edition"] = version
index_path.write_text(json.dumps(index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

js_path = path / "guide-links.js"
js = js_path.read_text(encoding="utf-8")
pfx, rest = js.split(" const source=", 1)
old_source, suffix = rest.split(";\n const entries=", 1)
old_index = json.loads(old_source)
assert old_index["guides"]["2"] == index["guides"]["2"]
assert len(old_index["skills"]) == 61
js_new = pfx + " const source=" + json.dumps(index, ensure_ascii=False, separators=(",", ":")) + ";\n const entries=" + suffix
js_path.write_text(js_new, encoding="utf-8")

hub_path = dest / "j277-hub.html"
hub = hub_path.read_text(encoding="utf-8")
old = "revision/j277/guides/J277_Paper_1_Revision_Guide_AP1_Aligned.pdf?v=AP1-aligned-2026-10-27-uploaded"
colour_link = "revision/j277/guides/J277_Paper_1_Revision_Guide_AP1_Aligned.pdf?v=" + version
print_link = "revision/j277/guides/J277_Paper_1_Revision_Guide_Print_V4.pdf?v=" + version
assert hub.count(old) == 2
hub = hub.replace(old, colour_link, 1).replace(old, print_link, 1)
assert hub.count(colour_link) == 1 and hub.count(print_link) == 1
hub = hub.replace("Download J277 Paper 1 revision guide", "Download printer-friendly J277 Paper 1 revision guide", 1)
hub_path.write_text(hub, encoding="utf-8")

shutil.copyfile(digital, path / "J277_Paper_1_Revision_Guide_AP1_Aligned.pdf")
shutil.copyfile(print_ready, path / "J277_Paper_1_Revision_Guide_Print_V4.pdf")
assert (path / "J277_Paper_1_Revision_Guide_AP1_Aligned.pdf").stat().st_size > 20000000
assert (path / "J277_Paper_1_Revision_Guide_Print_V4.pdf").stat().st_size > 10000000

report = {
    "edition": version, "paper_1_pages": 291, "paper_2_unchanged": True,
    "paper_1_mapped_skills": len(changed), "paper_2_mapped_skills": len(original_paper2),
    "internal_links": 20, "bookmarks": 103,
    "colour_sha256": hashlib.sha256(digital.read_bytes()).hexdigest(),
    "print_sha256": hashlib.sha256(print_ready.read_bytes()).hexdigest(),
    "scope": "Paper 1 only; excludes lesson content",
}
(path / "paper1-v4-release.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
a.close()
b.close()
print(json.dumps(report, indent=2))
