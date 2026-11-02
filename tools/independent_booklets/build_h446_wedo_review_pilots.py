#!/usr/bin/env python3
"""Build unlinked teacher-only H446 Try-Check-Improve PDF review pilots.

All published Print links and approval flags remain unchanged.
"""
from __future__ import annotations

import json
from pathlib import Path
from bs4 import BeautifulSoup
import fitz

from source_model import ROOT, HROOT, h446_source
from publish_h446_y12_exceptions import make_pdf_flexible
from render_pdf import impose_a3

OUT = ROOT / "build" / "h446-wedo-review-pilots"
LESSONS = (10, 181, 185, 260)


def run():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = []
    for n in LESSONS:
        lesson = h446_source(n)
        assert not lesson.is_assessment, f"Protected assessment: {n}"
        assert lesson.guided, f"Missing guided source: {n}"
        source = HROOT / f"lesson-{n:03d}" / "index.html"
        soup = BeautifulSoup(source.read_text(encoding="utf-8"), "html.parser")
        variants = {}
        for mode in ("bw", "colour"):
            prefix = f"H446_Lesson_{n:03d}_WE_DO_REVIEW_{mode.upper()}"
            a4 = OUT / f"{prefix}_A4.pdf"
            a3 = OUT / f"{prefix}_A3_Booklet.pdf"
            pages = make_pdf_flexible(lesson, soup, mode, a4)
            spreads = impose_a3(a4, a3)
            with fitz.open(a4) as doc:
                texts = [page.get_text() for page in doc]
                try_page = next((i for i,t in enumerate(texts) if "Guided 1 — TRY" in t), -1)
                exit_page = next((i for i,t in enumerate(texts) if "EXIT TICKET / REFLECTION" in t), -1)
                check_page = next((i for i,t in enumerate(texts) if "Guided 1 — CHECK" in t), -1)
                assert 0 <= try_page < exit_page < check_page, (n, mode, try_page, exit_page, check_page)
                assert len(doc) == pages and pages <= 16, (n, mode, pages)
                assert all(len(page.strip()) >= 40 for page in texts), (n,mode,"empty page")
            with fitz.open(a3) as doc:
                assert len(doc) == spreads == ((pages+3)//4)*2, (n,mode,"A3 count")
            variants[mode] = {"a4": a4.name, "a3": a3.name,
                              "a4_pages": pages, "a3_sheets": spreads}
        assert variants["bw"]["a4_pages"] == variants["colour"]["a4_pages"]
        manifest.append({"lesson": n, "title": lesson.title, "source_checks":sum(bool(a) for _,a in lesson.guided),
                         "a4_pages":variants["bw"]["a4_pages"], "variants": variants,
                         "teacher_approved":False, "needs_diagram_review": bool(lesson.visual_count)})
        print(f"REVIEW {n:03d}: {variants['bw']['a4_pages']} A4 pages; "
              f"{len(lesson.guided)} tasks; published Print links unchanged", flush=True)
    (OUT / "manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    report = ["# H446 We Do — teacher-only review pilots", "",
      "Generated from live H446 source lessons; these files are NOT connected to the public Print buttons.",
      "All PDFs are drafts pending individual teacher approval. Original interactive lessons and "
      "diagram-restored PDFs are unchanged.", "",
      "| Lesson | Guided checks | A4 pages | Source diagrams? |",
      "|---|---:|---:|---|"]
    for r in manifest:
        report.append(f"| {r['lesson']:03d} — {r['title']} | {r['source_checks']} | "
                      f"{r['a4_pages']} | {'Needs diagram comparison' if r['needs_diagram_review'] else 'None flagged'} |")
    report += ["", "## Individual review checklist", "",
      "- Verify all guided questions and their original source-based check explanations.",
      "- Ensure the Check section follows the Exit Ticket and students have writing space.",
      "- Compare circuit diagrams, traces and other visuals with the illustrated lesson; "
      "a text-only review copy must not replace a diagram-restored PDF.",
      "- Check paper size, legibility, OCR H446 technical accuracy and code.",
      "- Do not approve or distribute until checked individually.", ""]
    (OUT / "README.md").write_text("\n".join(report), encoding="utf-8")


if __name__ == "__main__":
    run()
