#!/usr/bin/env python3
"""Publish clearly labelled DRAFT PDF resources and a verified hub catalogue.

Only copies real generated files. Never publishes assessment papers or lessons
with missing grounded source/model-answer fields. Original Teach lessons and
revision guides are not touched.
"""
from __future__ import annotations

import argparse
import json
import shutil
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

import fitz

PDF_KEYS = ("a4_pdf", "colour_a4_pdf", "a3_pdf", "colour_a3_pdf")


def inspect_pdf(path: Path, expected_size: str) -> tuple[bool, str]:
    if not path.is_file():
        return False, "file_missing"
    try:
        with fitz.open(path) as pdf:
            if not len(pdf):
                return False, "empty_pdf"
            first = pdf[0]
            if expected_size == "A4":
                if abs(first.rect.width - 595.28) > 2 or abs(first.rect.height - 841.89) > 2:
                    return False, "wrong_A4_geometry"
            elif abs(first.rect.width - 1190.55) > 3 or abs(first.rect.height - 841.89) > 3:
                return False, "wrong_A3_geometry"
            # The A3 imposition may put the first logical page on the right.
            if not any("DRAFT" in page.get_text() for page in list(pdf)[:2]):
                return False, "draft_label_missing"
            return True, ""
    except Exception as exc:
        return False, f"pdf_invalid:{type(exc).__name__}"


def publish(source: Path, destination: Path) -> dict:
    manifest = json.loads((source / "manifest.json").read_text(encoding="utf-8"))
    destination.mkdir(parents=True, exist_ok=True)
    catalogue = {"schema_version": 1, "release_state": "unapproved_staff_preview",
                 "teacher_approved": False,
                 "generated_utc": datetime.now(timezone.utc).isoformat(),
                 "lessons": {"j277": {}, "h446": {}}}
    audit = []
    counts = Counter()
    for record in manifest["records"]:
        course, number = record["course"], int(record["lesson"])
        reason = ""
        if record.get("is_assessment") or record.get("status") == "assessment_staff_only":
            reason = "staff_only_assessment"
        elif record.get("missing_data"):
            reason = "missing_source_or_model_answer"
        elif record.get("failed_checks") or record.get("status") == "generation_failed":
            reason = "generation_or_validation_failed"
        elif not all(record.get(key) for key in PDF_KEYS):
            reason = "pdf_variant_missing"
        verified = {}
        if not reason:
            for key in PDF_KEYS:
                relative = Path(record[key])
                if relative.is_absolute() or ".." in relative.parts:
                    reason = "unsafe_pdf_path"
                    break
                src = source / relative
                good, detail = inspect_pdf(src, "A3" if "a3" in key else "A4")
                if not good:
                    reason = key + ":" + detail
                    break
                verified[key] = (src, relative)
        if reason:
            counts["deferred"] += 1
            audit.append({"course": course, "lesson": number, "title": record.get("title"),
                          "status": "deferred", "root_cause": reason,
                          "warnings": record.get("warnings", []),
                          "missing_data": record.get("missing_data", []),
                          "next_action": "Review source and correct central generator or model answers"})
            continue
        paths = {}
        for key, (src, relative) in verified.items():
            target = destination / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, target)
            paths[key] = "offline/booklets/" + relative.as_posix()
            counts["pdf_files"] += 1
        catalogue["lessons"][course][str(number)] = {
            "title": record.get("title", ""),
            "status": record.get("status", ""),
            "teacher_approved": False,
            "warnings": record.get("warnings", []),
            "a4_pages": record.get("a4_pages", 0),
            "a3_spreads": record.get("a3_spreads", 0),
            "print_bw": paths["a4_pdf"],
            "learn_colour": paths["colour_a4_pdf"],
            "booklet_bw": paths["a3_pdf"],
            "booklet_colour": paths["colour_a3_pdf"],
        }
        counts[course + "_published_draft"] += 1
        if record.get("visual_count"):
            counts["needs_diagram_audit"] += 1
        if any("teacher-dependent" in w for w in record.get("warnings", [])):
            counts["needs_independence_audit"] += 1
        audit.append({"course": course, "lesson": number, "title": record.get("title"),
                      "status": "published_unapproved_draft",
                      "root_cause": "visuals_missing" if record.get("visual_count") else "",
                      "warnings": record.get("warnings", []),
                      "missing_data": [], "next_action": "Teacher content, diagram and print review"})
    catalogue["counts"] = dict(counts)
    (destination / "catalogue.json").write_text(json.dumps(catalogue, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (destination / "audit.json").write_text(json.dumps({"created_utc": catalogue["generated_utc"],
           "records": audit}, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    report = ["# Independent booklet publication audit", "",
              "**All public PDFs are marked DRAFT and are NOT teacher-approved.**",
              "No original Teach lessons or revision guides are changed.", "",
              "## Verified copy results", ""]
    report.extend(f"- {key}: {value}" for key, value in sorted(counts.items()))
    report += ["", "## Deferred lessons", ""]
    report.extend(f"- {r['course'].upper()} {r['lesson']:03d}: {r['root_cause']}"
                  for r in audit if r["status"] == "deferred")
    report += ["", "## Priority improvement patterns", "",
               "1. Restore diagrams and verify every diagram-dependent model.",
               "2. Verify the four retrieval questions and answers are from prior learning.",
               "3. Replace teacher-dependent prompts with genuinely independent tasks.",
               "4. Check Code First syntax, expected outputs, worked examples and trace tables.",
               "5. Print A4 B&W and colour at 100%; inspect A3 folded/duplex copies.",
               "6. Review longer explanations, ruled answer space and readable font sizes.",
               "7. Compare with the actual OCR revision guide; referenced is not cross-checked.",
               "8. Do not promote DRAFT to approved until lesson-by-lesson sign-off."]
    (destination / "AUDIT.md").write_text("\n".join(report) + "\n", encoding="utf-8")
    return dict(counts)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--source", default="build/booklet-publish")
    ap.add_argument("--dest", default="offline/booklets")
    args = ap.parse_args()
    print(json.dumps(publish(Path(args.source), Path(args.dest)), indent=2))


if __name__ == "__main__":
    main()
