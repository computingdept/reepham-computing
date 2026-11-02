#!/usr/bin/env python3
"""Illustrated H446 Print We Do — lossless original-PDF augmentation.

Preserves every original PDF page and figure. Adds question-specific guided
discussion BEFORE independent practice and original source CHECK models AFTER
the Exit Ticket. Never changes source lessons or teacher-approved records.
If a source visual cannot be accounted for, do not replace the live link.
"""
from __future__ import annotations

import argparse
import hashlib
import html
import io
import json
import re
import sys
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

import fitz
from bs4 import BeautifulSoup
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
sys.path.insert(0, str(HERE))
from source_model import h446_source, HROOT
from render_pdf import impose_a3
from publish_h446_visual_pilot import (
    SELECT, source_diagrams, figure_blocks, render_visual_pages
)

OUT = ROOT / "offline/booklets/h446"
CAT = ROOT / "offline/booklets/catalogue.json"
REPORT = OUT / "H446_WEDO_VISUAL_SAFE_BATCH.md"
REPORT_JSON = OUT / "H446_WEDO_VISUAL_SAFE_BATCH.json"

pdfmetrics.registerFont(TTFont("WDRegular", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("WDBold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFontFamily("WDRegular", normal="WDRegular", bold="WDBold")

def normal(text):
    return " ".join(str(text or "").split())

def phase_start(pages, phrase, start=0, end=None):
    stop = len(pages) if end is None else end
    pat = re.compile(r"\b"+re.escape(phrase)+r"\b", re.I)
    for i in range(start, stop):
        if pat.search(pages[i][:330]):
            return i
    return -1

def discussion_for(prompt: str) -> str:
    s = prompt.lower()
    if any(word in s for word in ("trace", "sort", "travers", "iteration", "stack", "queue")):
        return "Compare the sequence of steps or states. Identify the first difference in your methods and justify which step is correct."
    if any(word in s for word in ("code", "program", "algorithm", "function", "procedure", "pseudocode")):
        return "Compare approaches, walk through one test input, and explain how you would detect or correct a mistake."
    if any(word in s for word in ("logic", "gate", "truth table", "karnaugh", "binary", "adder", "bit")):
        return "Compare intermediate values and your reasoning. Justify one step using the relevant rule, representation or truth table."
    if any(word in s for word in ("graph", "tree", "linked list", "hash", "array", "record")):
        return "Compare the representation or steps you used. Explain one decision and challenge one possible misconception."
    return "Compare your methods. Justify one important decision, identify one difference, and agree a specific improvement."

def make_supplement(n: int, lesson, mode: str, kind: str) -> fitz.Document:
    """Render answer-free discussion or post-Exit source checks as flowing A4 pages."""
    col = "#292929" if mode == "bw" else "#14543e"
    heading = ParagraphStyle("Head", fontName="WDBold", fontSize=16,
                             leading=23, textColor=colors.HexColor(col), spaceAfter=12)
    body = ParagraphStyle("Body", fontName="WDRegular", fontSize=10.5,
                          leading=16.5, spaceAfter=10, splitLongWords=True)
    task = ParagraphStyle("Task", fontName="WDBold", fontSize=11,
                          leading=17, spaceBefore=9, spaceAfter=5)
    source = ParagraphStyle("Source", parent=body, fontSize=9.2,
                            leading=14, textColor=colors.HexColor("#333333"))
    story=[]
    if kind=="discussion":
        story.append(Paragraph("WE DO — TRY · DISCUSS · IMPROVE",heading))
        story.append(Paragraph("TRY: Use the original guided questions and diagrams in the preceding We Do pages. "
                               "DISCUSS: Explain and challenge methods before independent practice. "
                               "IMPROVE: Note one change now; compare with the source model only AFTER the Exit Ticket.",body))
        for i,(q,_) in enumerate(lesson.guided,1):
            summary = normal(q)
            if len(summary)>190:summary=summary[:187].rsplit(" ",1)[0]+"…"
            question=f"Guided {i}: {html.escape(summary)}"
            block=[Paragraph(question,task),
                   Paragraph("DISCUSS — "+html.escape(discussion_for(q)),body),
                   Paragraph("IMPROVE — Write one precise correction or stronger explanation in your own answer.",source),
                   HRFlowable(width="100%",thickness=.45,color=colors.HexColor("#a9b4ac")),
                   Spacer(1,7)]
            story.extend(block)
    else:
        story.append(Paragraph("WE DO — SOURCE CHECK / IMPROVE",heading))
        story.append(Paragraph("Only use this section AFTER attempting the We Do, You Do and Exit Ticket. "
                               "Compare with the original classroom lesson's CHECK explanation. "
                               "Correct errors in GREEN PEN and explain why.",body))
        for i,(_,a) in enumerate(lesson.guided,1):
            if not a.strip():raise ValueError(f"Guided {i} missing original CHECK")
            story.append(Paragraph(f"Guided {i} — original CHECK",task))
            for part in [p for p in a.strip().split("\n") if p.strip()]:
                story.append(Paragraph(html.escape(part),source))
            story.append(Paragraph("IMPROVE: Explain one correction to your own reasoning.",body))
    def decorate(canvas,doc):
        canvas.saveState()
        width,height=A4
        canvas.setFont("WDBold",8.3)
        canvas.setFillColor(colors.HexColor(col))
        canvas.drawString(44,height-28,f"RHS COMPUTING  /  OCR H446  /  LESSON {n:03d}")
        canvas.setFont("WDRegular",7.9)
        canvas.drawRightString(width-44,height-28,"DRAFT · TEACHER REVIEW")
        canvas.setStrokeColor(colors.HexColor("#a6b5ad"))
        canvas.line(44,48,width-44,48)
        canvas.setFont("WDRegular",8)
        canvas.drawString(44,33,"BLACK PEN: try and discuss   ·   GREEN PEN: check and improve")
        canvas.drawRightString(width-44,33,f"Supplement {doc.page}")
        canvas.restoreState()
    buf=io.BytesIO()
    doc=SimpleDocTemplate(buf,pagesize=A4,leftMargin=44,rightMargin=44,
                          topMargin=70,bottomMargin=62,title=f"H446 {n:03d} We Do {kind}")
    doc.build(story,onFirstPage=decorate,onLaterPages=decorate)
    buf.seek(0)
    return fitz.open(stream=buf.read(),filetype="pdf")

def hidden_wedo_sha(n):
    soup=BeautifulSoup((HROOT/f"lesson-{n:03d}"/"index.html").read_text(encoding="utf-8"),"html.parser")
    bad=set()
    for svg in soup.select("#we-do svg"):
        if any(p.has_attr("hidden") for p in [svg,*list(svg.parents)] if getattr(p,"name",None)):
            bad.add(hashlib.sha256(str(svg).encode("utf-8")).hexdigest()[:14])
    return bad

def source_figures(n, lesson, existing_img_count):
    """Restore every unique static source SVG where earlier PDF is text-only.

    If any source <img>, JS-only SVG, or unrepresented figure remains,
    safely defer instead of claiming complete diagram restoration.
    """
    if existing_img_count:
        return {}, 0, "Original embedded PDF visuals preserved"
    SELECT[n]=None
    drawings=source_diagrams(n)
    if len(drawings)!=lesson.visual_count:
        raise ValueError(f"Source diagrams not fully restorable: {len(drawings)} static unique SVG(s) vs {lesson.visual_count} figures")
    hidden=hidden_wedo_sha(n)
    grouped=defaultdict(list)
    for d in drawings:
        phase="after-exit" if d["stage"]=="we-do" and d["sha"] in hidden else d["stage"]
        grouped[phase].append(d)
    return grouped, len(drawings), "All static source SVGs included, hidden We Do reveals after Exit"

def build(n: int, old: dict, mode: str, lesson) -> tuple[str,str,int,int,dict]:
    filename=ROOT/old["print_bw" if mode=="bw" else "learn_colour"]
    if not filename.exists():raise FileNotFoundError(filename)
    base=fitz.open(filename)
    pages=[p.get_text() for p in base]
    idx_i=phase_start(pages,"I DO")
    idx_w=phase_start(pages,"WE DO")
    idx_y=phase_start(pages,"YOU DO")
    idx_e=phase_start(pages,"EXIT TICKET")
    if min(idx_i,idx_w,idx_y,idx_e)<0 or not idx_i<idx_w<idx_y<idx_e:
        raise ValueError(f"Cannot prove I Do/We Do/You Do/Exit order: {(idx_i,idx_w,idx_y,idx_e)}")
    if any("GUIDED 1" in normal(t.upper()) and "CHECK" in normal(t.upper())
           for t in pages[:idx_e]):
        raise ValueError("A CHECK/model may be exposed before Exit Ticket")
    source_imgs=sum(len(p.get_images(full=True)) for p in base)
    figures,restored,figure_note=source_figures(n,lesson,source_imgs)
    original_models=any(re.search(r"Guided\s+1\s*[-—·]\s*CHECK",t,re.I)
                        for t in pages[idx_e+1:])
    proposed={"new-learning": idx_i-1,"i-do": idx_w-1,
              "we-do": idx_y-1,"after-exit":len(base)-1}
    supplements=defaultdict(list)
    for phase,drawings in figures.items():
        page_index=proposed[phase]
        blocks=figure_blocks(drawings,mode)
        data,_=render_visual_pages(n,("We Do Check" if phase=="after-exit" else phase.replace("-"," ").title()),blocks,mode)
        supplements[page_index].append(fitz.open(stream=data,filetype="pdf"))
    discuss=make_supplement(n,lesson,mode,"discussion")
    models=None if original_models else make_supplement(n,lesson,mode,"check")
    combined=fitz.open()
    for i in range(len(base)):
        combined.insert_pdf(base,from_page=i,to_page=i)
        for item in supplements.get(i,[]):
            combined.insert_pdf(item)
        if i==idx_y-1: combined.insert_pdf(discuss)
    if models is not None:combined.insert_pdf(models)
    expected=len(base)+sum(len(d) for group in supplements.values() for d in group)+len(discuss)+(len(models) if models else 0)
    if len(combined)!=expected or len(combined)>36:
        raise ValueError(f"Unexpected or excessive A4 page count: {len(combined)}")
    old_positions=[]
    cursor=0
    for original in pages:
        while cursor<len(combined) and combined[cursor].get_text()!=original:
            cursor+=1
        if cursor==len(combined):raise ValueError("Original page content not preserved in order")
        old_positions.append(cursor)
        cursor+=1
    if sum(len(p.get_images(full=True)) for p in combined)<source_imgs+restored:
        raise ValueError("Original or restored diagrams missing")
    # All original pages are retained before new CHECK pages; discuss before You Do.
    text=[p.get_text() for p in combined]
    first_discuss=next((i for i,t in enumerate(text) if "WE DO — TRY" in t),-1)
    first_you=next((i for i,t in enumerate(text) if "YOU DO" in t[:330]),-1)
    first_exit=next((i for i,t in enumerate(text) if "EXIT TICKET" in t[:330]),-1)
    if not 0<=first_discuss<first_you<first_exit:
        raise ValueError("Discussion/independent/Exit pages in wrong order")
    if models and not any("WE DO — SOURCE CHECK" in t for t in text[first_exit+1:]):
        raise ValueError("Source CHECK not safely separated")
    target=OUT/f"H446_Lesson_{n:03d}_WEDO_VISUAL_DISCUSS_{mode.upper()}_A4.pdf"
    combined.save(target,garbage=4,deflate=True)
    count=len(combined)
    base.close();combined.close();discuss.close()
    if models:models.close()
    for group in supplements.values():
        for doc in group:doc.close()
    a3=OUT/f"H446_Lesson_{n:03d}_WEDO_VISUAL_DISCUSS_{mode.upper()}_A3_Booklet.pdf"
    sheets=impose_a3(target,a3)
    if sheets!=((count+3)//4)*2:
        raise ValueError("A3 imposition mismatch")
    with fitz.open(a3) as pdf:
        if len(pdf)!=sheets:raise ValueError("A3 sheet count incorrect")
    return (target.relative_to(ROOT).as_posix(),a3.relative_to(ROOT).as_posix(),
            count,sheets,{"original_pages":len(pages),"original_images":source_imgs,
                          "restored_source_figures":restored,"figure_note":figure_note,
                          "original_check_already_present":original_models})

def run(numbers):
    doc=json.loads(CAT.read_text(encoding="utf-8"))
    entries=doc["lessons"]["h446"]
    output=[]
    for n in numbers:
        old=entries.get(str(n))
        row={"lesson":n,"status":"deferred"}
        if not old:
            row["reason"]="No print catalogue entry";output.append(row);continue
        made=[]
        try:
            lesson=h446_source(n)
            if lesson.is_assessment or old.get("teacher_approved",False):
                raise ValueError("Protected assessment or teacher-approved resource")
            if "WEDO_VISUAL_DISCUSS" in old.get("print_bw",""):
                row["status"]="already_revised"
            elif not lesson.visual_count:
                raise ValueError("No source visuals; use figure-free We Do generator")
            elif not lesson.guided or any(not q.strip() or not a.strip() for q,a in lesson.guided):
                raise ValueError("Original We Do question/model stages incomplete")
            else:
                variants={}
                for mode in ("bw","colour"):
                    a4,a3,pages,spreads,meta=build(n,old,mode,lesson)
                    made.extend((ROOT/a4,ROOT/a3))
                    variants[mode]=(a4,a3,pages,spreads,meta)
                if variants["bw"][2]!=variants["colour"][2]:
                    raise ValueError("B&W and colour page count mismatch")
                entry=dict(old)
                entry.update({
                    "print_bw":variants["bw"][0],
                    "booklet_bw":variants["bw"][1],
                    "learn_colour":variants["colour"][0],
                    "booklet_colour":variants["colour"][1],
                    "a4_pages":variants["bw"][2],
                    "a3_spreads":variants["bw"][3],
                    "status":"visual_wedo_draft_needs_teacher_review",
                    "teacher_approved":False,
                    "warnings":list(dict.fromkeys(old.get("warnings",[])+[
                        "Original source PDF pages and embedded figures retained",
                        "We Do Try Discuss Improve and source CHECK after the Exit Ticket",
                        "Requires individual teacher inspection for OCR accuracy, diagrams and pedagogy"
                    ]))
                })
                entries[str(n)]=entry
                row.update({"status":"published_review_draft","pages":entry["a4_pages"],
                            "models":len(lesson.guided),**variants["bw"][4]})
        except Exception as exc:
            for f in made:
                if f.is_file():f.unlink()
            row["reason"]=f"{type(exc).__name__}: {str(exc)[:240]}"
        output.append(row)
        print(n,row["status"],row.get("reason",""),flush=True)
    doc["counts"]["h446_published_draft"]=len(entries)
    CAT.write_text(json.dumps(doc,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    report={"generated_at":datetime.now(timezone.utc).isoformat(),
            "numbers":numbers,"results":output,
            "status_counts":dict(Counter(r["status"] for r in output))}
    REPORT_JSON.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    lines=["# H446 We Do — lossless illustrated print batch","",
           "All resources remain unapproved teacher-review drafts. Original lesson HTML is not edited.",
           "No original booklet pages, diagrams or source CHECK explanations are intentionally removed.",
           "",f"Batch: {', '.join(f'{n:03d}' for n in numbers)}","",
           "| Lesson | Status | A4 pages | Note |","|---|---|---:|---|"]
    for r in output:
        lines.append(f"| {r['lesson']:03d} | {r['status']} | {r.get('pages','—')} | {r.get('reason',r.get('figure_note',''))} |")
    lines+=["","Source-backed model content must still be checked for correctness by the teacher.",
            "Only published_review_draft entries have updated Print links. Deferred PDFs retain previous links.",""]
    REPORT.write_text("\n".join(lines),encoding="utf-8")
    return output

if __name__=="__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("lessons",type=int,nargs="+")
    args=parser.parse_args()
    run(args.lessons)
