#!/usr/bin/env python3
"""Check generated independent booklet PDF files before teacher review.

This detects page count, missing text and files, but is NOT a substitute
for content audit, screen-reader/PDF-UA validation or student approval.
"""
import argparse
import json
from pathlib import Path
import sys

import fitz

parser = argparse.ArgumentParser()
parser.add_argument("--directory", default="draft-booklets/j277")
parser.add_argument("--strict", action="store_true")
args = parser.parse_args()
directory = Path(args.directory)
report_file = directory / "generation-report.json"
if not report_file.exists():
    sys.exit("FAIL: missing generation-report.json")
report = json.loads(report_file.read_text(encoding="utf-8"))
failures = []
warnings = []
for item in report["results"]:
    lesson = item["lesson"]
    for error in item.get("errors", []):
        failures.append("Lesson " + lesson + ": " + error)
    for warning in item.get("warnings", []):
        warnings.append("Lesson " + lesson + ": " + warning)
    if not item["files"]:
        failures.append("Lesson " + lesson + ": no PDF files")
    for filename in item["files"]:
        pdf = directory / Path(filename).name
        if not pdf.is_file() or pdf.stat().st_size < 1000:
            failures.append("Missing/empty " + str(pdf))
            continue
        expected = 2 if "_A3_spreads.pdf" in pdf.name else 4
        try:
            with fitz.open(pdf) as doc:
                if len(doc) != expected:
                    failures.append(pdf.name + ": " + str(len(doc)) +
                                    " pages, expected " + str(expected))
                for page_no, page in enumerate(doc, 1):
                    text = page.get_text().strip()
                    if len(text) < 80:
                        failures.append(pdf.name + ": page " + str(page_no) +
                                        " has too little extractable text")
                if not doc.metadata.get("producer"):
                    warnings.append(pdf.name + ": missing PDF producer metadata")
        except Exception as exc:
            failures.append(pdf.name + ": unreadable PDF: " + str(exc))
result = {
    "status": "failed" if failures else "draft-export-pass-needs-teacher-review",
    "pdf_files_checked": sum(len(x["files"]) for x in report["results"]),
    "failures": failures,
    "warnings": warnings,
    "limitations": [
        "Cannot certify subject accuracy, curriculum coverage or model answers.",
        "Cannot certify accessible tag structure or screen-reader reading order.",
        "Must inspect the 4 A4 pages AND duplex A3 imposition at 100% before publishing.",
        "No draft PDF is student-approved or automatically linked from a live hub.",
    ],
}
(directory / "validation-report.json").write_text(
    json.dumps(result, indent=2) + "\n", encoding="utf-8")
print(json.dumps(result, indent=2))
if failures and args.strict:
    sys.exit(1)
