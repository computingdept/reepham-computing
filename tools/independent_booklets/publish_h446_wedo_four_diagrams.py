#!/usr/bin/env python3
"""Resolve final four H446 We Do source SVG duplicate-count exceptions.

Validate that source contains no inaccessible dynamic placeholder or <img> and
that every unique static SVG is rendered. All We Do diagrams and worked models
are after the Exit Ticket. No original lesson or approved PDF is modified.
"""
from __future__ import annotations

import hashlib
import json
import sys
from collections import Counter
from pathlib import Path

from bs4 import BeautifulSoup

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
sys.path.insert(0,str(HERE))
from source_model import h446_source,HROOT
from publish_h446_visual_pilot import SELECT,source_diagrams
from publish_h446_wedo_alternate import make_one

NUMBERS=(16,28,31,205)
CAT=ROOT/"offline/booklets/catalogue.json"
REPORT=ROOT/"offline/booklets/h446/H446_WEDO_FOUR_DIAGRAM_EXCEPTIONS.json"
MD=ROOT/"offline/booklets/h446/H446_WEDO_FOUR_DIAGRAM_EXCEPTIONS.md"

def checked_visuals(number,lesson,soup):
    # Count all source SVGs before image de-duplication, and prove all drawings
    # in the source are static and available. Removing only byte-identical
    # repeats doesn't lose a distinct visual concept.
    nodes=soup.select("#new-learning svg, #i-do svg, #we-do svg")
    other=soup.select("#new-learning img, #i-do img, #we-do img")
    if other or len(nodes)!=lesson.visual_count:
        raise ValueError(f"Static SVG accounting fails: {len(nodes)} SVG, {len(other)} img, source reports {lesson.visual_count}")
    for svg in nodes:
        if not svg.select("path,rect,line,circle,ellipse,polygon,polyline,text,use"):
            raise ValueError("Dynamic or empty SVG placeholder must be checked manually")
    unique={hashlib.sha256(str(svg).encode("utf-8")).hexdigest()[:14] for svg in nodes}
    SELECT[number]=None
    figures=source_diagrams(number)
    hashes={f["sha"] for f in figures}
    if len(figures)!=len(unique) or hashes!=unique:
        raise ValueError(f"Unique diagram extraction mismatch: {len(figures)} rendered vs {len(unique)} source")
    if len(nodes)==len(figures):
        raise ValueError("Not a duplicate-SVG exception; use standard source-aware renderer")
    return figures,len(nodes)-len(figures)

def main():
    doc=json.loads(CAT.read_text(encoding="utf-8"))
    entries=doc["lessons"]["h446"]
    results=[]
    for number in NUMBERS:
        prior=entries.get(str(number))
        r={"lesson":number,"status":"deferred"}
        if not prior:
            r["reason"]="No Print record";results.append(r);continue
        made=[]
        try:
            if prior.get("teacher_approved"):
                raise ValueError("Previously approved; never overwrite")
            if "WEDO_DEDUP" in prior.get("print_bw",""):
                r["status"]="already_revised"
            else:
                lesson=h446_source(number)
                if lesson.is_assessment or len(lesson.do_now)!=4:
                    raise ValueError("Protected lesson or incomplete Do Now")
                if not lesson.guided or any(not q.strip() or not a.strip() for q,a in lesson.guided):
                    raise ValueError("Source guided problem/CHECK incomplete")
                soup=BeautifulSoup((HROOT/f"lesson-{number:03d}"/"index.html").read_text(encoding="utf-8"),"html.parser")
                figures,repeats=checked_visuals(number,lesson,soup)
                variants={}
                try:
                    for mode in ("bw","colour"):
                        variant=make_one(number,mode,lesson,soup,figures)
                        variants[mode]=variant
                        made.extend([ROOT/variant["a4"],ROOT/variant["a3"]])
                    if variants["bw"]["pages"]!=variants["colour"]["pages"]:
                        raise ValueError("Page count differs between monochrome and colour")
                except Exception:
                    for p in made:
                        if p.exists():p.unlink()
                    raise
                entry=dict(prior)
                renamed={}
                # Keep unique output names so this exceptional source path
                # doesn't get confused with the alternative-layout rollout.
                for mode in ("bw","colour"):
                    for kind in ("a4","a3"):
                        source=ROOT/variants[mode][kind]
                        dest=Path(str(source).replace("_WEDO_ALTERNATE_","_WEDO_DEDUP_"))
                        if not source.exists():raise FileNotFoundError(source)
                        source.rename(dest)
                        renamed[(mode,kind)]=dest.relative_to(ROOT).as_posix()
                entry.update({
                    "print_bw":renamed[("bw","a4")],
                    "booklet_bw":renamed[("bw","a3")],
                    "learn_colour":renamed[("colour","a4")],
                    "booklet_colour":renamed[("colour","a3")],
                    "a4_pages":variants["bw"]["pages"],
                    "a3_spreads":variants["bw"]["spreads"],
                    "print_page_count_corrected":True,
                    "status":"visual_wedo_draft_needs_teacher_review",
                    "teacher_approved":False,
                    "warnings":list(dict.fromkeys(prior.get("warnings",[])+[
                        f"Verified {len(figures)} unique static SVGs and {repeats} exact source duplicates; no distinct diagrams discarded",
                        "All answer-bearing We Do SVGs follow Exit Ticket; original source models remain post-Exit",
                        "Check technical diagrams and page layout individually before giving to students"
                    ]))
                })
                entries[str(number)]=entry
                r.update({"status":"published_review_draft","pages":entry["a4_pages"],
                          "unique_figures":len(figures),"exact_repeats":repeats})
        except Exception as exc:
            r["reason"]=f"{type(exc).__name__}: {str(exc)[:220]}"
        results.append(r)
        print(f"{number:03d} {r['status']} {r.get('reason','')}",flush=True)
    CAT.write_text(json.dumps(doc,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    audit={"results":results,"status_counts":dict(Counter(x["status"] for x in results)),
           "all_teacher_approved":False}
    REPORT.write_text(json.dumps(audit,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    lines=["# H446 We Do — original source diagram duplicates","",
           "Only exact duplicate SVG source fragments may be de-duplicated. Every unique figure must be preserved.",
           "All results remain teacher-review drafts; no classroom lessons changed.",
           "","| Lesson | Result | A4 pages | Unique SVGs | Duplicates | Note |",
           "|---|---|---:|---:|---:|---|"]
    for x in results:
        lines.append(f"| {x['lesson']:03d} | {x['status']} | {x.get('pages','—')} | {x.get('unique_figures','—')} | {x.get('exact_repeats','—')} | {x.get('reason','')} |")
    MD.write_text("\n".join(lines)+"\n",encoding="utf-8")
    return audit

if __name__=="__main__":
    main()
