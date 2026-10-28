#!/usr/bin/env python3
"""Generate and audit independent booklet PDF DRAFTS for both OCR courses.

Run from repository root:
  python tools/independent_booklets/generate.py --smoke --out build/booklets
  python tools/independent_booklets/generate.py --course both --out build/booklets

This deliberately does not write to lessons/, hub pages or published guides.
"""
from __future__ import annotations

import argparse
import csv
from collections import Counter
from datetime import datetime, timezone
import json
from pathlib import Path
import re
import traceback
import signal
import time

from source_model import ROOT, hub_map, j277_source, h446_source
from render_pdf import build_a4, impose_a3
from review_index import build_review_index

SMOKE = {"j277": {5, 19, 96, 164}, "h446": {1, 25, 181, 200, 320}}


def lesson_timebox_expired(signum, frame):
    raise TimeoutError("Five-minute per-lesson generation limit exceeded; deferred for diagnosis")


def classify_generation_failure(exc):
    name = type(exc).__name__
    if isinstance(exc, TimeoutError):
        return "five_minute_timebox_exceeded"
    if isinstance(exc, FileNotFoundError):
        return "missing_source_file"
    if name == "LayoutError" or "flowable" in str(exc).lower():
        return "pdf_layout_overflow"
    if isinstance(exc, (ValueError, KeyError)):
        return "source_data_or_pdf_validation"
    return "generation_exception"


def status_for(lesson):
    if lesson.is_assessment:
        return "assessment_staff_only"
    if lesson.missing:
        return "draft_incomplete_source_review"
    if lesson.visual_count or any("teacher-dependent" in w for w in lesson.warnings):
        return "draft_needs_visual_or_independence_review"
    return "draft_ready_for_teacher_audit"


def audit_existing(path: Path):
    html = path.read_text(encoding="utf-8")
    tests = {
        "black_pen_instruction": "BLACK PEN" in html and "Answer all questions first" in html,
        "green_pen_instruction": "GREEN PEN" in html and "rewrite mistakes" in html,
        "five_stage_footer": "booklet-purpose-footer" in html and "Review &amp; Improve" in html,
        "full_question_reattempt": "Copy the whole question" in html,
        "four_page_structure": len(re.findall(r'<section\b[^>]*class="[^"]*\bpage\b', html)) == 4,
        "exit_before_answer_page": "Exit Ticket" in html and
            html.find("Exit Ticket") < html.find('data-page="4"'),
    }
    return [name for name, ok in tests.items() if not ok]


def existing_record(course, number, route):
    independent = ROOT / f"lessons/{course}/lesson-{number:03d}/independent.html"
    failed = audit_existing(independent) if independent.exists() else ["independent_file_missing"]
    return {
        "course": course, "lesson": number, "label": f"{course.upper()}-{number:03d}",
        "title": "Existing independent HTML — inspect original",
        "spec": "", "teach_url": "/" + route,
        "sources": [route, str(independent.relative_to(ROOT))],
        "status": "existing_html_needs_audit" if failed else "existing_html_passes_static_checks",
        "missing_data": [], "failed_checks": failed,
        "warnings": ["Static HTML checks only; print and content QA still required"],
        "priority": "P0" if number <= 4 else "P2",
        "a4_pages": 0, "a3_spreads": 0,
        "a4_pdf": "", "a3_pdf": "", "colour_a4_pdf": "", "colour_a3_pdf": "",
        "independent_html": "/" + str(independent.relative_to(ROOT)),
        "visual_count": 0, "is_assessment": False,
    }


def generate_one(course, number, route, donow, code_master, out, large=False, skip_a3=False):
    lesson = j277_source(number, donow, code_master) if course == "j277" else h446_source(number)
    stem = f"{course.upper()}_Lesson_{number:03d}_DRAFT"
    if large:
        stem += "_LARGE_PRINT"
    folder = out / course
    folder.mkdir(parents=True, exist_ok=True)
    outputs = {}
    for mode in ("bw", "colour"):
        a4 = folder / (stem + f"_{mode.upper()}_A4.pdf")
        a3 = folder / (stem + f"_{mode.upper()}_A3_Booklet.pdf")
        pages = build_a4(a4, lesson, large=large, mode=mode)
        spreads = impose_a3(a4, a3) if not skip_a3 else 0
        outputs[mode] = (pages, spreads, a4, a3)
    pages, spreads, a4, a3 = outputs["bw"]
    if outputs["colour"][0] != pages:
        raise RuntimeError("Colour/B&W page counts differ")
    warnings = list(dict.fromkeys(lesson.warnings))
    if pages > 4:
        warnings.append(f"Expanded to {pages} A4 pages to preserve legibility and writing space")
    record = {
        "course": course, "lesson": number, "label": lesson.label,
        "title": lesson.title, "spec": lesson.spec,
        "teach_url": "/" + route, "sources": lesson.sources,
        "status": status_for(lesson),
        "missing_data": lesson.missing,
        "failed_checks": [],
        "warnings": warnings,
        "priority": "P0" if course == "j277" and number <= 18 or course == "h446" and number in (1, 181) else "P1",
        "a4_pages": pages, "a3_spreads": spreads,
        "a4_pdf": str(a4.relative_to(out)),
        "a3_pdf": str(a3.relative_to(out)) if spreads else "",
        "colour_a4_pdf": str(outputs["colour"][2].relative_to(out)),
        "colour_a3_pdf": str(outputs["colour"][3].relative_to(out)) if spreads else "",
        "independent_html": "",
        "visual_count": lesson.visual_count,
        "is_assessment": lesson.is_assessment,
    }
    return record


def save_reports(out, records, mode):
    out.mkdir(parents=True, exist_ok=True)
    records.sort(key=lambda x: (x["course"], x["lesson"]))
    (out / "manifest.json").write_text(
        json.dumps({
            "schema_version": "1.0",
            "created_utc": datetime.now(timezone.utc).isoformat(),
            "mode": mode,
            "unapproved_drafts_only": True,
            "records": records,
        }, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    columns = [
        "course", "lesson", "label", "title", "spec", "teach_url", "status",
        "priority", "a4_pages", "a3_spreads", "a4_pdf", "a3_pdf", "colour_a4_pdf", "colour_a3_pdf",
        "independent_html", "sources", "missing_data", "failed_checks", "warnings",
        "visual_count", "is_assessment", "root_cause", "time_seconds", "next_action",
    ]
    with (out / "manifest.csv").open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=columns)
        writer.writeheader()
        for r in records:
            writer.writerow({key: json.dumps(r[key], ensure_ascii=False) if isinstance(r.get(key), list)
                             else r.get(key, "") for key in columns})

    counts = Counter(r["status"] for r in records)
    by_course = Counter(r["course"] for r in records)
    made = [r for r in records if r["a4_pdf"]]
    failures = [r for r in records if r["failed_checks"]]
    missing = [r for r in records if r["missing_data"]]
    total_pages = sum(r["a4_pages"] for r in made)
    top = sorted(records, key=lambda r: (r["priority"], r["course"] != "j277", r["lesson"]))[:18]
    lines = [
        "# OCR J277 and H446 independent booklet draft production",
        "",
        "**NOT PUBLISHED · NOT APPROVED FOR PUPILS.** Original Teach lessons, hubs, guides and shared CSS/JS remain unchanged.",
        "",
        "## Verified outputs",
        "",
        f"- Hub-linked lessons processed: **{len(records)}** (J277 {by_course['j277']}; H446 {by_course['h446']}).",
        f"- A4 draft PDFs actually created: **{2*len(made)}** (B&W and colour); total pages across both editions: **{2*total_pages}**.",
        f"- A3 imposed draft PDFs actually created: **{2*sum(bool(r['a3_pdf']) for r in records)}** (B&W and colour).",
        f"- Existing J277 HTML drafts audited without replacing: **{sum(bool(r['independent_html']) for r in records)}**.",
        f"- Lessons with missing grounded content or model answers: **{len(missing)}**.",
        f"- Assessment/feedback lessons kept STAFF ONLY: **{sum(r.get('is_assessment') for r in records)}**.",
        f"- Generation failures: **{sum(r['status']=='generation_failed' for r in records)}**; existing HTML static-check findings: **{len(failures)-sum(r['status']=='generation_failed' for r in records)}**.",
        "",
        "## Status breakdown",
        "",
    ]
    lines.extend(f"- {key}: {value}" for key, value in sorted(counts.items()))
    lines += [
        "",
        "## What these files are (and are not)",
        "",
        "All PDFs are marked DRAFT. They use sourced lesson questions, retrieval-bank answers,",
        "model steps and available mark schemes. The source guides are referenced but have",
        "**not** been automatically cross-checked page by page. Rich SVG diagrams and some",
        "interactive teaching reveals are **not embedded** in the text-first PDF output;",
        "affected lessons are explicitly flagged for visual reconstruction. Source extraction",
        "and PDF text checks are not a substitute for teacher content and SEND review.",
        "",
        "Print A4 drafts at 100% scale. A3 versions are already in booklet imposition order:",
        "**A3 landscape, duplex, flip on short edge, fold**. Extra blank pages may be inserted",
        "to make page counts divisible by four. Some lessons exceed four A4 pages deliberately",
        "rather than shrinking the writing space or font.",
        "",
        "Large print is an optional CLI output, not a published or PDF/UA-certified edition.",
        "",
        "## Review first",
        "",
        "| Lesson | Status | A4 pages | Main issue |",
        "| --- | --- | ---: | --- |",
    ]
    for r in top:
        issue = "; ".join((r["failed_checks"] or r["missing_data"] or r["warnings"])[:2])
        lines.append(f"| {r['label']} | {r['status']} | {r['a4_pages']} | {issue[:150].replace('|', '/')} |")
    if failures:
        lines += ["", "## Failed checks and exceptions", ""]
        for r in failures[:30]:
            lines.append(f"- **{r['label']}**: {'; '.join(r['failed_checks'])[:240]}")
    lines += [
        "",
        "## Next steps",
        "",
        "1. Open a real A4 and A3 draft from each qualification; print at 100% and inspect all pages.",
        "2. Compare against the linked Teach lesson and current OCR revision guide; check answers and diagram-dependent reasoning.",
        "3. Correct the shared extractor/renderer for recurring layout problems; do not patch hundreds of PDFs.",
        "4. Mark approved lessons explicitly before making any hub Print action available.",
        "",
        "The machine-readable manifest lists every source path, warning, missing item and generated PDF filename.",
        "",
    ]
    (out / "SUMMARY.md").write_text("\n".join(lines), encoding="utf-8")
    build_review_index(out, records)
    return {"total": len(records), "pdfs": 2*len(made), "failures": len(failures),
            "missing": len(missing), "a3": 2*sum(bool(r["a3_pdf"]) for r in records)}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="build/independent-booklets")
    ap.add_argument("--course", choices=("j277", "h446", "both"), default="both")
    ap.add_argument("--smoke", action="store_true", help="Representative content and layout cases")
    ap.add_argument("--limit", type=int, default=0, help="Maximum number of new PDFs per course")
    ap.add_argument("--skip-a3", action="store_true")
    ap.add_argument("--large-print", action="store_true", help="Experimental larger-print drafts; not certified")
    ap.add_argument("--fail-on-errors", action="store_true")
    args = ap.parse_args()
    out = Path(args.out).resolve()
    courses = ("j277", "h446") if args.course == "both" else (args.course,)
    donow = json.loads((ROOT / "lessons/j277/donow-bank-20261020.json").read_text(encoding="utf-8"))
    code_master = json.loads((ROOT / "lessons/j277/code-first-master-20261021.json").read_text(encoding="utf-8"))
    records = []
    for course in courses:
        done = 0
        for number, route in sorted(hub_map(course).items()):
            if args.smoke and number not in SMOKE[course]:
                continue
            if course == "j277" and number <= 4:
                records.append(existing_record(course, number, route))
                continue
            if args.limit and done >= args.limit:
                break
            done += 1
            started = time.monotonic()
            previous_handler = signal.getsignal(signal.SIGALRM)
            signal.signal(signal.SIGALRM, lesson_timebox_expired)
            signal.alarm(300)
            try:
                r = generate_one(course, number, route, donow, code_master, out,
                                 large=args.large_print, skip_a3=args.skip_a3)
                r['time_seconds'] = round(time.monotonic()-started, 2)
                records.append(r)
                print(f"OK {r['label']}: {r['a4_pages']} A4 pages, {r['a3_spreads']} A3 spreads; {r['status']}", flush=True)
            except Exception as exc:
                label = f"{course.upper()}-{number:03d}"
                print(f"FAILED {label}: {exc}", flush=True)
                records.append({
                    "course": course, "lesson": number, "label": label, "title": "",
                    "spec": "", "teach_url": "/" + route,
                    "sources": [route], "status": "generation_failed",
                    "missing_data": [], "failed_checks": [f"{type(exc).__name__}: {str(exc)[:300]}"],
                    "warnings": [], "priority": "P0", "root_cause": classify_generation_failure(exc),
                    "time_seconds": round(time.monotonic()-started, 2),
                    "next_action": "Diagnose source or shared renderer; defer and continue",
                    "a4_pages": 0, "a3_spreads": 0,
                    "a4_pdf": "", "a3_pdf": "", "colour_a4_pdf": "", "colour_a3_pdf": "", "independent_html": "", "visual_count": 0, "is_assessment": False,
                })
            finally:
                signal.alarm(0)
                signal.signal(signal.SIGALRM, previous_handler)
    result = save_reports(out, records, "smoke" if args.smoke else "batch")
    print(json.dumps(result, indent=2), flush=True)
    if args.fail_on_errors and result["failures"]:
        raise SystemExit(1)
    if not result["pdfs"]:
        raise SystemExit("No PDF drafts were generated")


if __name__ == "__main__":
    main()
