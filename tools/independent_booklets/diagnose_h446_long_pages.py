#!/usr/bin/env python3
"""Measure H446 Print overlength, page roles, diagram footprints and available space.

Read-only inspection of PDF bytes. Never rewrites student booklet files.
"""
from __future__ import annotations
import json,re
from collections import Counter
from datetime import datetime,timezone
from pathlib import Path
import fitz
ROOT=Path(__file__).resolve().parents[2]
CAT=ROOT/"offline/booklets/catalogue.json"
OUT=ROOT/"offline/booklets/h446"

def stage_kind(text,images):
    t=text.casefold()
    if "original lesson diagrams" in t or "original source diagram" in t or "we do check · original lesson diagrams" in t:
        if "we do" in t[:300]:return "we-do diagram pages"
        if "new learning" in t[:300]:return "new-learning diagram pages"
        if "i do" in t[:300]:return "i-do diagram pages"
        return "other source diagram pages"
    if "we do — source check" in t:return "post-exit source check"
    if "we do — try" in t:return "discussion supplement"
    if images:return "other illustrated page"
    for name,pattern in (("do-now",r"do now"),("new-learning",r"new learning"),("i-do",r"i do"),("we-do",r"we do"),("you-do",r"you do"),("exit",r"exit ticket")):
        if re.search(pattern,t[:450]):return name
    return "other text"

def page_stats(page):
    text=page.get_text()
    blocks=page.get_text("dict")["blocks"]
    image_blocks=[b for b in blocks if b.get("type")==1]
    text_blocks=[b for b in blocks if b.get("type")==0]
    img_area=sum((b["bbox"][2]-b["bbox"][0])*(b["bbox"][3]-b["bbox"][1]) for b in image_blocks)
    chars=len(text)
    top=max((b["bbox"][1] for b in text_blocks),default=0)
    bottom=max((b["bbox"][3] for b in text_blocks),default=0)
    images=page.get_images(full=True)
    return {"kind":stage_kind(text,images),"chars":chars,"images":len(images),
            "image_area_pct":round(100*img_area/(page.rect.width*page.rect.height),1),
            "image_bboxes":len(image_blocks),
            "used_to_y":round(bottom),"bottom_whitespace_pt":round(page.rect.height-bottom),
            "first_lines":" / ".join(text.splitlines()[:4])[:170]}

def main():
    catalogue=json.loads(CAT.read_text(encoding="utf-8"))["lessons"]["h446"]
    rows=[]
    for n,entry in sorted(catalogue.items(),key=lambda x:int(x[0])):
        if entry["a4_pages"]<=16:continue
        path=ROOT/entry["print_bw"]
        with fitz.open(path) as doc:
            pages=[page_stats(p) for p in doc]
            assert len(pages)==entry["a4_pages"],n
        kinds=Counter(p["kind"] for p in pages)
        img_pages=[p for p in pages if p["images"]>0]
        sparse=[i+1 for i,p in enumerate(pages) if p["images"]>0 and p["chars"]<350]
        # Exact counts are only a triage proxy: never imply that an image
        # can be removed just because it is on a sparse page.
        rows.append({"lesson":int(n),"title":entry["title"],"a4_pages":len(pages),
                    "family":entry["print_bw"].split("_WEDO_")[-1].split("_BW")[0],
                    "page_types":dict(sorted(kinds.items())),
                    "image_pages":len(img_pages),
                    "source_diagram_pages":sum(v for k,v in kinds.items() if "diagram pages" in k),
                    "low_text_image_pages":sparse,
                    "pages":pages})
    report={"generated_at":datetime.now(timezone.utc).isoformat(),
            "overlong_records":len(rows),"by_length":dict(Counter(r["a4_pages"] for r in rows)),
            "results":rows}
    (OUT/"H446_PRINT_LONG_PAGES_DIAGNOSTIC.json").write_text(json.dumps(report,indent=2,ensure_ascii=False)+"\n")
    lines=["# H446 Print — why 33 booklets exceed 16 A4 pages","",
        "Read-only investigation of **published PDFs**, not a change to lesson content.",
        "This diagnostic distinguishes essential original workbook pages from additional source-figure and We Do discussion pages.",
        "A low-text diagram page is **not** permission to remove it.",
        "","| Lesson | Pages | Images on pages | Diagram-only-style pages | Low-text image-page numbers |",
        "|---|---:|---:|---:|---|"]
    for r in rows:
        lines.append(f"| {r['lesson']:03d} — {r['title'].replace('|','/')} | {r['a4_pages']} | {r['image_pages']} | {r['source_diagram_pages']} | {', '.join(map(str,r['low_text_image_pages'])) or '—'} |")
    lines+=["","## How to interpret","",
        "- If most excess pages are standalone diagrams, first test placing **multiple original graphics on one print page**, maintaining legibility and stage labels.",
        "- Preserve the step-by-step source order and keep all answer-bearing We Do drawings **after the Exit Ticket**.",
        "- If a lesson needs several large graphs, truth tables, timing diagrams or trace tables, keep it longer rather than reducing them to unreadable thumbnails.",
        "- Do not delete writing space or authentic model answers to chase an arbitrary page count.",
        "","## Page-by-page breakdown","","Each entry reports the document's PDF pages, content categories and image density.",
        ""]
    for r in rows:
        lines.extend([f"### Lesson {r['lesson']:03d} — {r['title']}", "",
              f"**{r['a4_pages']} pages.** Page types: "+", ".join(f"{k} × {v}" for k,v in r["page_types"].items()),
              "", "| PDF page | Identified role | Images | Image page area | Text chars | Top lines |",
              "|---:|---|---:|---:|---:|---|"])
        for i,p in enumerate(r["pages"],1):
            line=p["first_lines"].replace("|","/").replace("\n"," ")
            lines.append(f"| {i} | {p['kind']} | {p['images']} | {p['image_area_pct']}% | {p['chars']} | {line} |")
        lines.append("")
    (OUT/"H446_PRINT_LONG_PAGES_DIAGNOSTIC.md").write_text("\n".join(lines)+"\n",encoding="utf-8")
    print("Long booklets:",len(rows),"page lengths:",report["by_length"])
    for r in rows:
        print(f"{r['lesson']:03d} pages={r['a4_pages']} images={r['image_pages']} source_figure_pages={r['source_diagram_pages']} sparse={len(r['low_text_image_pages'])}")

if __name__=="__main__":main()
