#!/usr/bin/env python3
"""Batch diagnostic audit for every J277/H446 independent booklet draft.

This is a machine audit, not a teacher content approval. Records evidence and
root causes per lesson, with five-minute fail-forward handling.
"""
from __future__ import annotations

import argparse
from collections import Counter, defaultdict
from datetime import datetime, timezone
import json
from pathlib import Path
import time

import fitz

REQUIRED_BODY = (
    "Do Now · Recall previous learning",
    "I Do · Read new knowledge",
    "We Do · Practise with guidance",
    "You Do · Work independently",
    "Exit Ticket · Answer before checking",
    "Review & Improve · GREEN PEN",
    "Try the question again",
    "Copy the whole original question",
)


def inspect(record, folder: Path) -> dict:
    issues = []
    evidence = []
    label = record["label"]
    warnings = record.get("warnings") or []
    missing = record.get("missing_data") or []
    if missing:
        issues.append("source_or_model_answer_missing")
        evidence.append(", ".join(missing))
    if record.get("is_assessment"):
        issues.append("staff_only_assessment")
    if record.get("visual_count"):
        issues.append("diagram_or_image_not_embedded")
        evidence.append(f"{record['visual_count']} original visual elements")
    if any("teacher-dependent" in w for w in warnings):
        issues.append("teacher_dependent_activity")
    if any("retrieval_bank_missing" in w for w in warnings):
        issues.append("retrieval_fallback_needs_prior_learning_check")
    if any("Code First master unavailable" in w for w in warnings):
        issues.append("code_first_unverified")
    if any("condensed" in w.lower() for w in warnings):
        issues.append("source_explanation_condensed")
    if any("not automatically cross-verified" in w for w in warnings):
        issues.append("revision_guide_not_cross_checked")
    if record.get("a4_pages", 0) > 8:
        issues.append("long_booklet_print_review")
        evidence.append(f"{record['a4_pages']} A4 pages")
    if record.get("failed_checks"):
        issues.append("generator_or_html_static_failure")
        evidence.extend(record["failed_checks"])
    path = folder / (record.get("a4_pdf") or "")
    if record.get("a4_pdf") and path.is_file():
        try:
            with fitz.open(path) as pdf:
                texts = [page.get_text() for page in pdf]
                joined = "\n".join(texts)
                for phrase in REQUIRED_BODY:
                    if phrase not in joined:
                        issues.append("required_independent_stage_missing")
                        evidence.append(f"Missing: {phrase}")
                if record["course"] == "j277" and "Code First" not in joined:
                    issues.append("code_first_stage_missing")
                exit_index = next((i for i,t in enumerate(texts) if "Exit Ticket · Answer before checking" in t), -1)
                review_index = next((i for i,t in enumerate(texts) if "Review & Improve · GREEN PEN" in t), -1)
                if exit_index < 0 or review_index < 0 or exit_index >= review_index:
                    issues.append("answer_reveal_sequence_wrong")
                    evidence.append(f"Exit page={exit_index+1}; review page={review_index+1}")
                if "[No source model answer" in joined or "[Source has no Exit Ticket" in joined:
                    issues.append("missing_answer_placeholder_in_pdf")
                if "BLACK PEN" not in joined or "GREEN PEN" not in joined:
                    issues.append("pen_routine_missing")
                # Test logical text bounding boxes in the student content area.
                off_page = 0
                tiny_body = 0
                for page in pdf:
                    for block in page.get_text("dict").get("blocks", []):
                        if block.get("type") != 0:
                            continue
                        for line in block.get("lines", []):
                            for span in line.get("spans", []):
                                x0,y0,x1,y1 = span["bbox"]
                                if x0 < -1 or y0 < -1 or x1 > page.rect.width+1 or y1 > page.rect.height+1:
                                    off_page += 1
                                if 78 < y0 < page.rect.height-78 and span.get("size",12) < 9.5:
                                    tiny_body += 1
                if off_page:
                    issues.append("text_outside_page")
                    evidence.append(f"{off_page} text spans beyond A4")
                if tiny_body:
                    issues.append("small_student_body_text")
                    evidence.append(f"{tiny_body} body spans under 9.5pt")
                if record.get("a4_pages") != len(pdf):
                    issues.append("manifest_page_count_mismatch")
        except Exception as exc:
            issues.append("pdf_inspection_failed")
            evidence.append(type(exc).__name__ + ": " + str(exc)[:140])
    elif record.get("a4_pdf"):
        issues.append("generated_pdf_missing")
    elif record["course"] == "j277" and record["lesson"] <= 4:
        issues.append("existing_html_requires_print_and_content_review")
    else:
        issues.append("no_generated_pdf")
    issues = list(dict.fromkeys(issues))
    if "source_or_model_answer_missing" in issues or "missing_answer_placeholder_in_pdf" in issues or "answer_reveal_sequence_wrong" in issues:
        priority = "P0"
    elif any(x in issues for x in ("diagram_or_image_not_embedded", "teacher_dependent_activity",
                                  "required_independent_stage_missing", "text_outside_page",
                                  "generator_or_html_static_failure")):
        priority = "P1"
    else:
        priority = "P2"
    return {"course":record["course"], "lesson":record["lesson"], "label":label,
            "title":record.get("title",""), "priority":priority,
            "source_status":record.get("status",""), "issues":issues,
            "evidence":evidence, "warnings":warnings,
            "a4_pages":record.get("a4_pages",0), "teacher_approved":False}


def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--source",default="build/booklet-publish")
    ap.add_argument("--dest",default="offline/booklets")
    args=ap.parse_args()
    source=Path(args.source)
    dest=Path(args.dest)
    records=json.loads((source/"manifest.json").read_text(encoding="utf-8"))["records"]
    results=[]
    for record in records:
        started=time.monotonic()
        try:
            item=inspect(record,source)
        except Exception as exc:
            item={"course":record["course"],"lesson":record["lesson"],
                  "label":record["label"],"title":record.get("title",""),
                  "priority":"P0","issues":["audit_exception_deferred"],
                  "evidence":[str(exc)[:240]],"teacher_approved":False}
        item["audit_seconds"]=round(time.monotonic()-started,2)
        if item["audit_seconds"]>300:
            item["issues"].append("five_minute_timebox_exceeded")
            item["priority"]="P0"
        results.append(item)
    counts=Counter(issue for r in results for issue in r["issues"])
    priorities=Counter(r["priority"] for r in results)
    by_course=Counter(r["course"] for r in results)
    payload={"created_utc":datetime.now(timezone.utc).isoformat(),
             "scope":"Automated source/PDF checks only; no teacher approval",
             "total_records":len(results),"by_course":dict(by_course),
             "priority_counts":dict(priorities),"issue_counts":dict(counts),
             "records":results}
    dest.mkdir(parents=True,exist_ok=True)
    (dest/"QUALITY_AUDIT.json").write_text(json.dumps(payload,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    lines=["# J277 / H446 offline booklet improvement audit","",
           "**Automated audit only. All PDF drafts still need teacher content and print approval.**","",
           f"Lessons inspected: **{len(results)}** (J277 {by_course['j277']}, H446 {by_course['h446']}).",
           f"Priorities: P0 {priorities['P0']}; P1 {priorities['P1']}; P2 {priorities['P2']}.","",
           "## Ranked recurring problems",""]
    lines.extend(f"{i}. **{name.replace('_',' ')}** — {count} lesson(s)"
                 for i,(name,count) in enumerate(counts.most_common(),1))
    lines += ["","## P0 — correct or defer before approval",""]
    lines.extend(f"- **{r['label']}** {r['title']}: {', '.join(r['issues'])}; evidence: {'; '.join(r.get('evidence',[])) or 'see source'}"
                 for r in results if r["priority"]=="P0")
    lines += ["","## P1 — visual/independence and formatting review",""]
    lines.extend(f"- **{r['label']}**: {', '.join(r['issues'])}"
                 for r in results if r["priority"]=="P1")
    lines += ["","## Morning review order","",
              "1. J277 Lesson 002 (approved layout reference): verify A4/A3 overflow and working space.",
              "2. J277 Lesson 005 and H446 Lesson 001: compare every stage with original Teach and revision guide.",
              "3. One H446 diagram-heavy lesson, one programming/code lesson and one extended-answer lesson.",
              "4. Review P0 answer/source failures first, then central SVG and teacher-dependency patterns.",
              "5. Do not mark any draft approved based solely on this automated report."]
    (dest/"QUALITY_AUDIT.md").write_text("\n".join(lines)+"\n",encoding="utf-8")
    print(json.dumps({"lessons":len(results),"priorities":dict(priorities),
                      "top_issues":counts.most_common(12)},indent=2))


if __name__=="__main__":
    main()
