#!/usr/bin/env python3
"""H446 We Do safety regression: source prompts before Exit; models after Exit.

Run from the repository root: python tools/independent_booklets/test_h446_wedo_review.py
Never publishes PDFs or approves lessons.
"""
from __future__ import annotations

from pathlib import Path
from tempfile import TemporaryDirectory

import fitz
from bs4 import BeautifulSoup

from render_pdf import build_a4
from publish_h446_y12_exceptions import make_pdf_flexible
from source_model import HROOT, h446_source

SAMPLES = (10, 20, 30, 181, 185, 260)
PDF_PILOTS = (10, 181, 185)


def run() -> None:
    for number in SAMPLES:
        lesson = h446_source(number)
        assert lesson.guided, f"{number:03d}: missing guided prompts"
        assert all(prompt.strip() for prompt, _ in lesson.guided), f"{number:03d}: empty Try prompt"
        assert any(answer.strip() for _, answer in lesson.guided), f"{number:03d}: no source CHECK model"
        assert all("\\n" not in prompt for prompt, _ in lesson.guided), f"{number:03d}: literal slash-n"
        assert not lesson.is_assessment, f"{number:03d}: protected assessment"
        print(f"SOURCE {number:03d}: {len(lesson.guided)} guided tasks, "
              f"{sum(bool(a) for _,a in lesson.guided)} source checks", flush=True)

    with TemporaryDirectory() as temp:
        for number in PDF_PILOTS:
            lesson = h446_source(number)
            for mode in ("bw", "colour"):
                filename = Path(temp) / f"H446_{number:03d}_{mode}_QA.pdf"
                count = build_a4(filename, lesson, mode=mode)
                with fitz.open(filename) as pdf:
                    pages = [page.get_text() for page in pdf]
                    joined = "\n".join(pages)
                    positions = {
                        key: next((i for i, page in enumerate(pages) if needle in page), -1)
                        for key, needle in (
                            ("try", "Guided 1 · TRY"),
                            ("exit", "Exit Ticket · Answer before checking"),
                            ("check", "Guided 1 · CHECK"),
                        )
                    }
                    assert min(positions.values()) >= 0, (number, mode, positions)
                    assert positions["try"] < positions["exit"] < positions["check"], (
                        number, mode, positions)
                    assert "Try → Check → Improve" in joined, (number, mode)
                    assert "We Do · Check and improve" in joined, (number, mode)
                    assert all(page.strip() for page in pages), (number, mode, "blank page")
                    assert count == len(pdf), (number, mode, count, len(pdf))
                    assert count < 25, (number, mode, "excessive page count", count)
                print(f"PDF {number:03d} {mode}: {count} pages; "
                      f"TRY {positions['try']+1}, EXIT {positions['exit']+1}, "
                      f"CHECK {positions['check']+1}", flush=True)
    with TemporaryDirectory() as temp:
        for number in (10, 181, 185, 260):
            lesson = h446_source(number)
            source = HROOT / f"lesson-{number:03d}" / "index.html"
            soup = BeautifulSoup(source.read_text(encoding="utf-8"), "html.parser")
            for mode in ("bw", "colour"):
                filename = Path(temp) / f"H446_{number:03d}_{mode}_FLEX_QA.pdf"
                count = make_pdf_flexible(lesson, soup, mode, filename)
                with fitz.open(filename) as pdf:
                    pages = [page.get_text() for page in pdf]
                    labels = {
                        "try": "Guided 1 — TRY",
                        "exit": "Exit Ticket / Reflection",
                        "check": "Guided 1 — CHECK",
                    }
                    positions = {
                        key: next((i for i, page in enumerate(pages) if needle in page), -1)
                        for key, needle in labels.items()
                    }
                    assert min(positions.values()) >= 0, (number, mode, positions)
                    assert positions["try"] < positions["exit"] < positions["check"], (
                        number, mode, positions)
                    assert count < 17, (number, mode, "excessive flexible page count", count)
                    assert count == len(pdf), (number, mode, "page count mismatch")
                    assert all(len(page.strip()) >= 40 for page in pages), (number, mode, "blank page")
                print(f"FLEX {number:03d} {mode}: {count} pages; "
                      f"TRY {positions['try']+1}, EXIT {positions['exit']+1}, "
                      f"CHECK {positions['check']+1}", flush=True)
    print("PASS: Guided source answers stay after student attempts and Exit Ticket.")


if __name__ == "__main__":
    run()
