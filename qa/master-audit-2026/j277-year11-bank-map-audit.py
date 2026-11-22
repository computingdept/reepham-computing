#!/usr/bin/env python3
"""Read-only coverage audit for Year 11 J277 add-on exam-practice mapping.

This checks mapping integrity, not question originality, visual correctness,
marking accuracy, teacher approval, or live student delivery.
"""
import csv
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BANK = ROOT / "data/exam-questions/j277-rhs-practice-drafts.csv"
MAPPING = ROOT / "data/exam-questions/j277-youdo-lesson-map.json"
PROTECTED = {"113", "120", "121", "143", "144", "156", "157"}


def check(condition, message):
    if not condition:
        raise AssertionError(message)


def main():
    with BANK.open(encoding="utf-8-sig", newline="") as file:
        questions = list(csv.DictReader(file))
    mapping = json.loads(MAPPING.read_text(encoding="utf-8"))
    bank = {q["rhs_question_id"]: q for q in questions}
    check(len(bank) == len(questions), "Duplicate RHS IDs in question bank")
    check(questions, "Question bank is empty")

    year11 = [row for row in mapping["lessons"] if int(row["lesson_id"]) >= 96]
    ordinary = [row for row in year11 if row["lesson_id"] not in PROTECTED]
    check(len(year11) == 69, f"Year 11 has {len(year11)} rather than 69 lessons")
    check(len(ordinary) == 62, "Unexpected Year 11 protected/ordinary split")
    check(all(not row.get("additional_exam_practice") for row in mapping["lessons"]
              if int(row["lesson_id"]) < 96), "Year 10 add-on mapping changed")

    used = Counter()
    visual_pending = 0
    for row in year11:
        lesson = row["lesson_id"]
        slots = row.get("additional_exam_practice", [])
        check(row.get("published_bank_override_enabled") is False,
              f"{lesson}: existing You Do override must stay off")
        if lesson in PROTECTED:
            check(not slots, f"{lesson}: protected lesson has add-on questions")
            continue
        check(slots, f"{lesson}: no mapped add-on bank questions")
        check(not row["exam_questions"], f"{lesson}: original You Do mapping was replaced")
        for slot in slots:
            qid = slot["rhs_question_id"]
            check(qid in bank, f"{lesson}: unknown bank ID {qid}")
            q = bank[qid]
            used[qid] += 1
            check(slot.get("ocr_reference") == q["ocr_reference"],
                  f"{lesson}: OCR source mismatch for {qid}")
            check(slot.get("marks") == int(q["marks"]),
                  f"{lesson}: mark mismatch for {qid}")
            for field in ("rhs_question_text", "rhs_verified_answer_points",
                          "rhs_verified_marking_rule"):
                check(q.get(field), f"{lesson}: missing {field} for {qid}")
            expected_visual = ("no_visual_needed" if q["visual_status"] == "not_required"
                               else "requires_source_figure_review")
            check(slot.get("visual_decision") == expected_visual,
                  f"{lesson}: visual review decision mismatch for {qid}")
            visual_pending += expected_visual == "requires_source_figure_review"

    missing = sorted(set(bank).difference(used))
    duplicates = sorted(qid for qid, n in used.items() if n != 1)
    check(not missing, "Bank IDs without Year 11 destination: " + ", ".join(missing))
    check(not duplicates, "Bank IDs assigned more than once: " + ", ".join(duplicates))
    meta = mapping.get("year11_additional_practice_policy", {})
    check(meta.get("questions_mapped_once") == len(questions),
          "Saved coverage snapshot does not match question bank")
    check(meta.get("ordinary_lessons_with_mappings") == len(ordinary),
          "Saved lesson count does not match mapping")

    print(f"PASS: {len(questions)} unique RHS questions mapped once across "
          f"{len(ordinary)} Year 11 ordinary lessons.")
    print(f"Protected lessons untouched: {', '.join(sorted(PROTECTED))}.")
    print(f"Visual review still pending on {visual_pending} mapped items.")
    print("CANDIDATE MAPPING ONLY: no teacher approval or live display verified.")


if __name__ == "__main__":
    main()
