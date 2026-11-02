#!/usr/bin/env python3
"""Print alternative H446 We Do templates without leaking worked models.

Only side-by-side .h13-grid/.h446-grid source layouts are supported here.
We regenerate an unapproved booklet from source to remove answers present on
the original We Do page, then restore *all* static SVGs. The We Do worked
figures are printed AFTER the Exit Ticket. Existing PDFs stay linked on error.
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

import fitz
from bs4 import BeautifulSoup

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
sys.path.insert(0,str(HERE))
from source_model import HROOT,h446_source
from publish_h446_y12_exceptions import make_pdf_flexible
from render_pdf import impose_a3
from publish_h446_visual_pilot import SELECT,source_diagrams,figure_blocks,render_visual_pages
from publish_h446_wedo_visual_safe import stamp_page_numbers, phase_start

DEST=ROOT/"offline/booklets/h446"
CAT=ROOT/"offline/booklets/catalogue.json"
REPORT=DEST/"H446_WEDO_ALTERNATE_BATCH.json"
MD=DEST/"H446_WEDO_ALTERNATE_BATCH.md"

def audit_phases(pdf,n):
    pages=[p.get_text() for p in pdf]
    positions={k:phase_start(pages,label) for k,label in (
        ("new","NEW LEARNING"),("i","I DO"),
        ("we","WE DO"),("you","YOU DO"),("exit","EXIT TICKET"))}
    if not (0<=positions["new"]<positions["i"]<positions["we"]<positions["you"]<positions["exit"]):
        raise ValueError(f"Stage order uncertain: {positions}")
    source_checks=[i for i,text in enumerate(pages) if "Guided 1 — CHECK" in text]
    if not source_checks or min(source_checks)<=positions["exit"]:
        raise ValueError(f"Worked CHECK is missing or before Exit: {source_checks}")
    if "Try → Discuss → Improve" not in "\n".join(pages):
        raise ValueError("Pedagogical guided-practice stages missing")
    if len(pdf)>27:
        raise ValueError(f"{n:03d}: overlong source layout ({len(pdf)} pages), manual design needed")
    return positions

def make_one(n,mode,lesson,soup,diagrams):
    base_file=DEST/f"H446_Lesson_{n:03d}_ALT_WEDO_{mode.upper()}_base_tmp.pdf"
    output=DEST/f"H446_Lesson_{n:03d}_WEDO_ALTERNATE_{mode.upper()}_A4.pdf"
    booklet=DEST/f"H446_Lesson_{n:03d}_WEDO_ALTERNATE_{mode.upper()}_A3_Booklet.pdf"
    generated=[]
    try:
        count=make_pdf_flexible(lesson,soup,mode,base_file)
        with fitz.open(base_file) as base:
            ph=audit_phases(base,n)
            groups=defaultdict(list)
            for item in diagrams:
                # The original alternate layout frequently draws the completed
                # answer in its We Do SVG. These images must NOT be before Exit.
                key="after-exit" if item["stage"]=="we-do" else item["stage"]
                groups[key].append(item)
            injected=defaultdict(list)
            plan={
                "new-learning":ph["i"]-1,
                "i-do":ph["we"]-1,
                "after-exit":len(base)-1,
            }
            for key,figures in groups.items():
                blocks=figure_blocks(figures,mode)
                pdf_bytes,_=render_visual_pages(
                    n,"We Do source CHECK" if key=="after-exit" else key.replace("-"," ").title(),
                    blocks,mode)
                piece=fitz.open(stream=pdf_bytes,filetype="pdf")
                injected[plan[key]].append(piece)
                generated.append(piece)
            merged=fitz.open()
            try:
                for index in range(len(base)):
                    merged.insert_pdf(base,from_page=index,to_page=index)
                    for piece in injected.get(index,[]):
                        merged.insert_pdf(piece)
                revised=audit_phases(merged,n)
                text=[p.get_text() for p in merged]
                we_pos=revised["we"]
                exit_pos=revised["exit"]
                # Every image in source phase We Do is inserted *after* all
                # worked CHECK text; none can pre-answer the guided question.
                for index,page in enumerate(merged):
                    if we_pos<=index<=exit_pos and page.get_images(full=True):
                        raise ValueError("Worked diagram would appear before the Exit Ticket")
                if sum(len(p.get_images(full=True)) for p in merged)<len(diagrams):
                    raise ValueError("Original source diagrams missing from output")
                if len(merged)>27:
                    raise ValueError(f"Overlong illustrated document: {len(merged)} pages")
                stamp_page_numbers(merged)
                merged.save(output,garbage=4,deflate=True)
                pages=len(merged)
            finally:
                merged.close()
        sheets=impose_a3(output,booklet)
        if sheets!=((pages+3)//4)*2:
            raise ValueError("A3 imposition failed")
        with fitz.open(output) as q,fitz.open(booklet) as b:
            if len(q)!=pages or len(b)!=sheets:
                raise ValueError("A4/A3 count mismatch")
            if any(len(p.get_text().strip())<35 for p in q):
                raise ValueError("Nearly blank A4 page")
        return {"a4":output.relative_to(ROOT).as_posix(),
                "a3":booklet.relative_to(ROOT).as_posix(),
                "pages":pages,"spreads":sheets}
    finally:
        for doc in generated:doc.close()
        if base_file.exists():base_file.unlink()

def run(numbers):
    doc=json.loads(CAT.read_text(encoding="utf-8"))
    entries=doc["lessons"]["h446"]
    rows=[]
    for n in numbers:
        item={"lesson":n,"status":"deferred"}
        old=entries.get(str(n))
        if not old:
            item["reason"]="No published Print lesson";rows.append(item);continue
        try:
            if old.get("teacher_approved"):
                raise ValueError("Approved booklet must not be overwritten")
            if "WEDO_ALTERNATE_" in old.get("print_bw",""):
                item["status"]="already_revised"
            elif "WEDO_VISUAL_DISCUSS_" in old.get("print_bw",""):
                raise ValueError("Already visual-reviewed; do not replace")
            else:
                lesson=h446_source(n)
                if lesson.is_assessment or len(lesson.do_now)!=4:
                    raise ValueError("Assessment or incomplete retrieval source")
                source=HROOT/f"lesson-{n:03d}"/"index.html"
                soup=BeautifulSoup(source.read_text(encoding="utf-8"),"html.parser")
                if not soup.select("#we-do .h13-grid, #we-do .h446-grid"):
                    raise ValueError("Not the alternate two-pane We Do template")
                if len(lesson.guided)!=len(soup.select("#we-do .wedo-example")):
                    raise ValueError("Some guided examples not extracted")
                if not lesson.guided or any(not q.strip() or not a.strip() for q,a in lesson.guided):
                    raise ValueError("Source guided question or worked method missing")
                if any("We Do supplementary exam cards" in w for w in lesson.warnings):
                    raise ValueError("Supplementary guided exam tasks require teacher comparison")
                SELECT[n]=None
                figures=source_diagrams(n)
                if len(figures)!=lesson.visual_count:
                    raise ValueError(
                        f"Source SVGs not all restorable ({len(figures)}/{lesson.visual_count})")
                # Do not silently discard any pre-existing embedded figure.
                for mode in ("bw","colour"):
                    with fitz.open(ROOT/old["print_bw" if mode=="bw" else "learn_colour"]) as previous:
                        if any(p.get_images(full=True) for p in previous):
                            raise ValueError("Original PDF already illustrated: requires visual comparison")
                variants={}
                created=[]
                try:
                    for mode in ("bw","colour"):
                        variant=make_one(n,mode,lesson,soup,figures)
                        variants[mode]=variant
                        created.extend((ROOT/variant["a4"],ROOT/variant["a3"]))
                    if variants["bw"]["pages"]!=variants["colour"]["pages"]:
                        raise ValueError("B&W and colour page lengths differ")
                except Exception:
                    for f in created:
                        if f.exists():f.unlink()
                    raise
                entry=dict(old)
                entry.update({
                    "print_bw":variants["bw"]["a4"],
                    "booklet_bw":variants["bw"]["a3"],
                    "learn_colour":variants["colour"]["a4"],
                    "booklet_colour":variants["colour"]["a3"],
                    "a4_pages":variants["bw"]["pages"],
                    "a3_spreads":variants["bw"]["spreads"],
                    "print_page_count_corrected":True,
                    "status":"visual_wedo_draft_needs_teacher_review",
                    "teacher_approved":False,
                    "warnings":list(dict.fromkeys(old.get("warnings",[])+[
                        "Alternate two-pane We Do: question separated from visible source model",
                        "Worked-state figures from We Do occur only after the Exit Ticket",
                        "Check answer-bearing starter code, diagram accuracy, print length and OCR content before student delivery"
                    ]))
                })
                entries[str(n)]=entry
                item.update({"status":"published_review_draft",
                            "pages":entry["a4_pages"],"source_figures":len(figures)})
        except Exception as error:
            item["reason"]=f"{type(error).__name__}: {str(error)[:220]}"
        rows.append(item)
        print(f"{n:03d} {item['status']} {item.get('reason','')}",flush=True)
    CAT.write_text(json.dumps(doc,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    report={"lessons":numbers,"counts":dict(Counter(x["status"] for x in rows)),
            "results":rows,"teacher_approved":False}
    REPORT.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    lines=["# H446 alternate We Do PDF conversion — teacher review batch","",
           "No original classroom lessons, guides or navigation were changed.",
           "All resources remain unapproved. Worked code and We Do figures require content review.",
           "","| Lesson | Outcome | A4 pages | Note |","|---|---|---:|---|"]
    for r in rows:
        lines.append(f"| {r['lesson']:03d} | {r['status']} | {r.get('pages','—')} | {r.get('reason','')} |")
    MD.write_text("\n".join(lines)+"\n",encoding="utf-8")
    return report

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("lessons",nargs="+",type=int)
    run(p.parse_args().lessons)
