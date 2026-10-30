#!/usr/bin/env python3
"""Read-only gate for H446 Paper 1 V4.1 skill/page-key migration.

Run from any directory:
    python revision/h446/guides/review-20261030/validate_staged_skill_map.py
    python revision/h446/guides/review-20261030/validate_staged_skill_map.py \
        --pdf /path/to/H446_Paper1_Appendix_Review_v4_1_392_pages.pdf --require-pdf

This script never edits a bank, the live guide map, or guide-links.js.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[3]
PROPOSAL = HERE / "V4_1_STAGED_SKILL_KEY_MIGRATION.json"
SOURCE_MAP = ROOT / "revision/h446/guides/paper-1-page-map.json"
BANKS = [ROOT / f"revision/h446/section-1-{n}/bank.js" for n in range(1, 6)]
EXPECTED_PDF_SHA256 = "e351cc1c7b0a6b49ca0cbaf82eb06624b08dd36d685bbfb2c5f789f54575986d"

# Capture each skill's id, title and PAGE from the current generated JS banks.
# This is deliberately constrained to current bank structures; if syntax changes,
# the count check fails rather than silently producing an incomplete mapping.
SKILL_RE = re.compile(
    r'"(?:id|key)"\s*:\s*"([^"]+)"[\s\S]{0,300}?"title"\s*:\s*"([^"]+)"'
    r'[\s\S]{0,180}?"page"\s*:\s*(\d+)'
)


def verify(pdf_path: Path | None, require_pdf: bool) -> None:
    candidate = json.loads(PROPOSAL.read_text(encoding="utf-8"))
    live_map = json.loads(SOURCE_MAP.read_text(encoding="utf-8"))
    proposal_rows = candidate["mappings"]
    page_targets = {int(k): int(v) for k, v in candidate["proposed_destinations_by_active_key"].items()}

    assert candidate["status"] == "REVIEW_ONLY_NOT_DEPLOYABLE"
    assert len(live_map["page_keys"]) == 264, "Unexpected live key count: review before regenerating"
    assert len(proposal_rows) == 108, "Candidate must account for all 108 known skills"

    live_skills = {}
    for index, bank in enumerate(BANKS, 1):
        matches = SKILL_RE.findall(bank.read_text(encoding="utf-8"))
        for skill_id, title, old_page in matches:
            key = (f"section-1-{index}", skill_id)
            assert key not in live_skills, f"Duplicate skill in banks: {key}"
            live_skills[key] = (title, int(old_page))
    assert len(live_skills) == 108, f"Expected 108 live skills, got {len(live_skills)}"

    seen, new_keys = set(), set()
    for row in proposal_rows:
        token = (row["bank"], row["skill_id"])
        assert token not in seen and token in live_skills, f"Missing/duplicate candidate: {token}"
        seen.add(token)
        title, old_page = live_skills[token]
        assert title == row["title"], f"Skill title changed: {token}"
        assert old_page == row["old_key"], f"Published skill page changed: {token}"
        assert live_map["page_keys"][str(old_page)] == row["current_page"], f"Live mapping changed: {token}"
        assert 1 <= row["candidate_page"] <= 392, f"Outside candidate PDF: {token}"
        assert page_targets[row["proposed_key"]] == row["candidate_page"], f"Collision: {token}"
        if row["proposed_key"] > 264:
            new_keys.add(row["proposed_key"])

    assert len(seen) == len(live_skills), "Some bank skills not represented"
    assert len(page_targets) == 96 and len(new_keys) == 23, "Key-split count drift"
    assert len(set(page_targets)) == 96, "Duplicate proposed keys"
    assert len(candidate["reserved_legacy_keys_not_audited"]) == 191
    assert len(set(candidate["reserved_legacy_keys_not_audited"]).intersection(
        {r["old_key"] for r in proposal_rows})) == 0

    print("PASS: 108 bank skills; 73 reused original keys; 23 new split keys")
    print("PASS: all proposed destination pages are in 1..392")
    print("BLOCKED: 191 legacy keys remain unverified; NO files are deployable")

    if pdf_path is None:
        if require_pdf:
            raise AssertionError("--require-pdf requested but no --pdf path provided")
        print("SKIP: candidate PDF bytes were not provided; use --pdf and --require-pdf")
        return

    assert pdf_path.exists(), f"PDF missing: {pdf_path}"
    digest = hashlib.sha256(pdf_path.read_bytes()).hexdigest()
    assert digest == EXPECTED_PDF_SHA256, "PDF SHA-256 differs from audited v4.1"
    try:
        import fitz
    except ImportError as exc:
        raise RuntimeError("Install PyMuPDF to check the PDF page contents") from exc
    doc = fitz.open(pdf_path)
    assert len(doc) == 392, f"Expected 392 pages; got {len(doc)}"
    for page_no in set(page_targets.values()):
        txt = doc[page_no - 1].get_text().lower()
        assert txt.strip(), f"Empty destination page: {page_no}"
        if page_no >= 343:
            assert "understand" in txt or "visual memory bridge" in txt, (
                f"Appendix destination doesn't start at an explanation: {page_no}")
        assert "self-marking / indicative answers" not in txt, (
            f"Destination is a marking page: {page_no}")
    print(f"PASS: {len(set(page_targets.values()))} unique teaching-page targets in exact v4.1 PDF")
    print("HOLD: This only verifies structure, NOT content preservation or subject accuracy")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--pdf", type=Path)
    parser.add_argument("--require-pdf", action="store_true")
    args = parser.parse_args()
    try:
        verify(args.pdf, args.require_pdf)
    except (AssertionError, FileNotFoundError, KeyError, ValueError, RuntimeError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        raise SystemExit(1)
