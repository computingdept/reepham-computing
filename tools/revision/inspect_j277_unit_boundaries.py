#!/usr/bin/env python3
"""Extract source-guide outline and candidate section headings for teacher review.

Does not modify approved J277 revision PDFs, linked page indices or lessons.
"""
import json
import re
from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / "revision/j277/guides"
OUT = ROOT / "review/j277-unit-navigation/guide-outline.json"
FILES = {
    "1": "J277_Paper_1_Revision_Guide_AP1_Aligned.pdf",
    "2": "J277_Paper_2_Revision_Guide_V3.pdf",
}

def sample(doc, page_number):
    if not (1 <= page_number <= len(doc)):
        return ""
    text = doc[page_number - 1].get_text().splitlines()
    return " | ".join(x.strip() for x in text[:8])[:360]

data = {"status": "outline audit only; no individual PDF files or student links yet", "papers": {}}
for paper, filename in FILES.items():
    with fitz.open(BASE / filename) as doc:
        toc = doc.get_toc()
        entries = [{"level": lvl, "title": title, "page": page} for lvl, title, page in toc]
        unit_rx = re.compile(r"(?<!\d)"+re.escape(paper)+r"\.[1-6](?!\d)")
        hints = [e for e in entries if unit_rx.search(e["title"])]
        data["papers"][paper] = {
            "source": filename,
            "pages": len(doc),
            "toc": entries,
            "candidate_unit_bookmarks": hints,
            "candidate_page_previews": [
               {"page": p, "lines": sample(doc, p)}
               for p in sorted(set([1,2,3,4,5] + [e["page"] for e in hints]))
            ]
        }
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(data, indent=2, ensure_ascii=False)+"\n", encoding="utf-8")
print("Wrote", OUT)
for p, d in data["papers"].items():
    print("Paper",p,"pages",d["pages"],"bookmarks",len(d["toc"]),"unit hints",len(d["candidate_unit_bookmarks"]))
