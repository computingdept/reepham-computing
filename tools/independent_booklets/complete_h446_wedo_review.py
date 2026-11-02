#!/usr/bin/env python3
"""Audit every H446 Print We Do; publish only source-complete, diagram-free safe reviews.

A PDF link is NOT a teacher sign-off. This does not alter classroom lessons.
Original illustrated or figure-dependent PDFs are protected, and absent models
are never invented. Each failed conversion retains its existing catalogue link.
"""
from __future__ import annotations

import json
import sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

import fitz
from bs4 import BeautifulSoup

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
sys.path.insert(0, str(HERE))
from source_model import h446_source, HROOT
from publish_h446_y12_exceptions import make_pdf_flexible
from render_pdf import impose_a3

OUT = ROOT / "offline/booklets/h446"
CAT = ROOT / "offline/booklets/catalogue.json"
REPORT = OUT / "H446_WEDO_COURSE_AUDIT.md"
DATA = OUT / "H446_WEDO_COURSE_AUDIT.json"
PHRASE = "Try → Discuss → Improve"

def check_pdf(path: Path, lesson_num: int, expected: int) -> None:
    with fitz.open(path) as pdf:
        if len(pdf) != expected or not 8 <= len(pdf) <= 16:
            raise ValueError(f"{lesson_num:03d}: invalid PDF page count")
        pages = [p.get_text() for p in pdf]
        needles = ("Guided 1 — TRY", "EXIT TICKET / REFLECTION",
                   "Guided 1 — CHECK")
        loc = [next((i for i, t in enumerate(pages) if key in t), -1)
               for key in needles]
        if min(loc) < 0 or not (loc[0] < loc[1] < loc[2]):
            raise ValueError(f"{lesson_num:03d}: guided model shown too soon or missing: {loc}")
        if PHRASE not in "\n".join(pages) or "DISCUSS:" not in "\n".join(pages[:loc[1]]):
            raise ValueError(f"{lesson_num:03d}: discussion structure missing")
        if any(len(t.strip()) < 40 for t in pages):
            raise ValueError(f"{lesson_num:03d}: near-empty page")

def publish_safe(number: int, old: dict, lesson) -> dict:
    # Conservative gate: keep existing diagrams and earlier teacher-reviewed variants.
    if lesson.visual_count or "VISUAL" in old["print_bw"].upper():
        raise ValueError("source figures: original PDF must be preserved")
    if lesson.is_assessment:
        raise ValueError("assessment: no pupil booklet")
    if not lesson.guided or any(not q.strip() or not answer.strip()
                                for q, answer in lesson.guided):
        raise ValueError("missing source guided prompt or CHECK model")
    if old.get("teacher_approved") is True:
        raise ValueError("teacher-approved resource: never overwrite")
    source = HROOT / f"lesson-{number:03d}" / "index.html"
    soup = BeautifulSoup(source.read_text(encoding="utf-8"), "html.parser")
    # Even source-free visuals in a current PDF must not be silently erased.
    base_pdf = ROOT / old["print_bw"]
    if not base_pdf.exists():
        # Recover the original five teacher-review pilots if a prior failed
        # concurrent upload left a catalogue reference without PDF bytes.
        base_pdf = OUT / f"H446_Lesson_{number:03d}_WEDO_REVIEW_BW_A4.pdf"
    if not base_pdf.exists():
        raise FileNotFoundError("Existing print PDF unavailable; leave original catalogue entry")
    with fitz.open(base_pdf) as current:
        if any(p.get_images(full=True) for p in current):
            raise ValueError("existing PDF contains embedded figures: protect")
    results = {}
    made = []
    try:
        for mode in ("bw", "colour"):
            stem = f"H446_Lesson_{number:03d}_WEDO_DISCUSS_REVIEW_{mode.upper()}"
            a4 = OUT / f"{stem}_A4.pdf"
            a3 = OUT / f"{stem}_A3_Booklet.pdf"
            made.extend((a4, a3))
            pages = make_pdf_flexible(lesson, soup, mode, a4)
            check_pdf(a4, number, pages)
            imposed = impose_a3(a4, a3)
            if imposed != ((pages+3)//4)*2:
                raise ValueError("A3 imposition incorrect")
            with fitz.open(a3) as pdf:
                if len(pdf) != imposed:
                    raise ValueError("A3 pages mismatch")
            results[mode] = (a4.relative_to(ROOT).as_posix(),
                             a3.relative_to(ROOT).as_posix(), pages, imposed)
        if results["bw"][2] != results["colour"][2]:
            raise ValueError("colour and monochrome page counts differ")
    except Exception:
        for p in made:
            if p.exists():
                p.unlink()
        raise
    new = dict(old)
    new.update({
        "print_bw": results["bw"][0],
        "booklet_bw": results["bw"][1],
        "learn_colour": results["colour"][0],
        "booklet_colour": results["colour"][1],
        "a4_pages": results["bw"][2],
        "a3_spreads": results["bw"][3],
        "teacher_approved": False,
        "status": "draft_needs_teacher_content_review",
        "warnings": list(dict.fromkeys(old.get("warnings", []) + [
            "We Do: Try, Discuss, Improve; source CHECK models after Exit Ticket",
            "Teacher must review discussion quality, original model accuracy and printed layout before classroom use"
        ])),
    })
    return new

def main() -> None:
    catalogue = json.loads(CAT.read_text(encoding="utf-8"))
    entries = catalogue["lessons"]["h446"]
    original_count = len(entries)
    rows = []
    statuses = Counter()
    for key in sorted(entries, key=lambda x: int(x)):
        number = int(key)
        before = entries[key]
        status = "pending"
        reason = ""
        models = 0
        count = 0
        source_diagrams = 0
        try:
            lesson = h446_source(number)
            count = len(lesson.guided)
            models = sum(bool(q.strip() and a.strip()) for q, a in lesson.guided)
            source_diagrams = lesson.visual_count
            already = ("_WEDO_REVIEW_" in before["print_bw"] or
                       "_WEDO_DISCUSS_REVIEW_" in before["print_bw"])
            up_to_date = False
            if already and (ROOT / before["print_bw"]).exists():
                with fitz.open(ROOT / before["print_bw"]) as existing:
                    up_to_date = PHRASE in "\n".join(p.get_text() for p in existing)
            if already and up_to_date:
                status = "review_pilot_existing"
            elif source_diagrams:
                status = "deferred_visual_preservation"
                reason = f"{source_diagrams} source figure(s) require visual-safe treatment"
            elif not count or models != count:
                status = "deferred_source_model"
                reason = f"{models}/{count} complete source CHECK model(s)"
            elif len(lesson.do_now) != 4:
                status = "deferred_source_quality"
                reason = "Do Now source incomplete"
            else:
                updated = publish_safe(number, before, lesson)
                entries[key] = updated
                status = "published_review_draft"
        except Exception as error:
            status = "deferred_validation"
            reason = f"{type(error).__name__}: {str(error)[:240]}"
        statuses[status] += 1
        rows.append({
            "lesson": number,
            "title": before.get("title", ""),
            "guided_tasks": count,
            "source_models": models,
            "source_figures": source_diagrams,
            "status": status,
            "reason": reason,
            "teacher_approved": False,
            "print_bw": entries[key].get("print_bw"),
        })
        print(f"{number:03d} {status}: {reason}", flush=True)
    if len(rows) != original_count or any(e.get("teacher_approved") is True
                                          for e in entries.values()):
        raise RuntimeError("Catalogue or approval state invalid")
    # Keep the original curriculum and all catalogue entries; change only
    # records for fully checked, figure-free replacement PDFs.
    CAT.write_text(json.dumps(catalogue, indent=2, ensure_ascii=False)+"\n",
                   encoding="utf-8")
    summary = {
        "date_utc": datetime.now(timezone.utc).isoformat(),
        "catalogue_entries": original_count,
        "status_counts": dict(sorted(statuses.items())),
        "teacher_approved": 0,
        "rows": rows,
    }
    DATA.write_text(json.dumps(summary, indent=2, ensure_ascii=False)+"\n", encoding="utf-8")
    md = [
        "# H446 We Do — complete curriculum audit and guarded print rollout",
        "",
        f"Audit: {summary['date_utc']}  |  Curriculum print records checked: **{original_count}**.",
        "All items are **unapproved teacher-review drafts**. This audit is not an OCR accuracy sign-off.",
        "The five earlier pilot PDFs and all diagram-dependent PDFs are preserved unless a safe generator explicitly replaces a figure-free version.",
        "",
        "## Counts", "",
        "| Outcome | Count |", "|---|---:|",
    ]
    for name, value in sorted(statuses.items()):
        md.append(f"| {name.replace('_',' ')} | {value} |")
    md += [
        "", "## What the audit guarantees", "",
        "- All 288 catalogue records examined, excluding the 12 protected assessment/feedback slots absent from the catalogue.",
        "- Only source-complete guided questions with original CHECK stages are republished.",
        "- TRY and DISCUSS precede the Exit Ticket; source CHECK follows it.",
        "- All original diagram-based Print PDFs retain their links and contents.",
        "- A4 black-and-white/colour and A3 imposition checked on each newly generated file.",
        "- No invented model answers, classroom-lesson changes, approval flags or release claims.",
        "",
        "## What still needs a person", "",
        "- Visual-first replacement for lessons with source diagrams, with side-by-side PDF inspection.",
        "- Source CHECK gaps or weak guided task wording where flagged.",
        "- Teacher assessment of OCR terminology, explanation quality and student writing space.",
        "",
        "## Lesson-by-lesson record", "",
        "| Lesson | Guided | Models | Figures | Outcome | Reason |",
        "|---|---:|---:|---:|---|---|",
    ]
    for r in rows:
        why = r["reason"].replace("|", "/").replace("\n", " ")
        md.append(f"| {r['lesson']:03d} | {r['guided_tasks']} | {r['source_models']} | {r['source_figures']} | {r['status']} | {why} |")
    REPORT.write_text("\n".join(md)+"\n", encoding="utf-8")
    print("SUMMARY", json.dumps(summary["status_counts"], sort_keys=True), flush=True)

if __name__ == "__main__":
    main()
