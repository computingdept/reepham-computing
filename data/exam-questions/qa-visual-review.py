#!/usr/bin/env python3
"""Visual regression inspection for isolated RHS H446 November 2021 QA previews.

Run from the repository root:
  python -m pip install playwright
  python -m playwright install chromium
  python data/exam-questions/qa-visual-review.py --output /tmp/h446-visual-review

Screenshots and JSON are local; this script never publishes lessons or changes QA approval.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

PREVIEWS = [
    "qa-2021-nov-q7-preview.html",
    "qa-2021-nov-q3c-q5c-preview.html",
    "qa-2021-nov-q1d-preview.html",
    "qa-2021-nov-q6-preview.html",
    "qa-2021-nov-paper2-astar-preview.html",
    "qa-2021-nov-paper2-q1d-q2-preview.html",
    "qa-2021-nov-paper2-q5-oop-preview.html",
    "qa-2021-nov-paper2-q6-q8-preview.html",
]
VIEWPORTS = [(1280, 720), (1366, 768)]


def inspect(page):
    return page.evaluate("""() => {
      const visible = el => !!el && !!(el.getClientRects().length) &&
         getComputedStyle(el).visibility !== 'hidden' && getComputedStyle(el).display !== 'none';
      const section = [...document.querySelectorAll('section.page')].find(visible);
      const images = section ? [...section.querySelectorAll('img')].filter(visible) : [];
      const sw = document.documentElement.scrollWidth, sh = document.documentElement.scrollHeight;
      const bad = images.filter(i => !i.complete || i.naturalWidth === 0);
      const clipped = [];
      if (section) {
        for (const el of section.querySelectorAll('h1,h2,p,pre,code,img,svg')) {
          if (!visible(el)) continue;
          const r = el.getBoundingClientRect();
          if (r.width && (r.left < -1 || r.right > innerWidth + 1))
            clipped.push({tag:el.tagName, text:(el.textContent||'').slice(0,90),
                          left:Math.round(r.left), right:Math.round(r.right)});
        }
      }
      return {
        viewport: [innerWidth,innerHeight],
        horizontalOverflowPx: Math.max(0,sw-innerWidth),
        verticalOverflowPx: Math.max(0,sh-innerHeight),
        imageCount: images.length,
        brokenImages: bad.map(x=>x.getAttribute('src')),
        clippedElements: clipped,
        headings: section ? [...section.querySelectorAll('h1')].filter(visible).map(e=>e.textContent.trim()) : [],
        answerVisible: section ? [...section.querySelectorAll('.answer,.reveal,.answer-state')].some(visible) : false,
        pageHasCode: section ? !!section.querySelector('pre') : false
      };
    }""")


def run(root: Path, output: Path):
    missing = [p for p in PREVIEWS if not (root / p).is_file()]
    if missing:
        raise FileNotFoundError("Missing QA preview files: " + ", ".join(missing))
    output.mkdir(parents=True, exist_ok=True)
    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for w, h in VIEWPORTS:
            context = browser.new_context(viewport={"width":w, "height":h}, device_scale_factor=1)
            for filename in PREVIEWS:
                page = context.new_page()
                errors = []
                page.on("pageerror", lambda err: errors.append(str(err)))
                page.goto((root / filename).as_uri(), wait_until="load")
                page_count = page.locator("section.page").count()
                for i in range(page_count):
                    if i:
                        page.locator("#next").click()
                    page.wait_for_timeout(80)
                    name = filename.replace(".html","")
                    base = output / f"{name}-q{i+1:02d}-{w}x{h}"
                    before = inspect(page)
                    page.screenshot(path=str(base) + "-question.png", full_page=False)
                    page.locator("#toggle, #reveal").first.click()
                    page.wait_for_timeout(60)
                    after = inspect(page)
                    page.screenshot(path=str(base) + "-answer.png", full_page=False)
                    page.locator("#toggle, #reveal").first.click()
                    reset = inspect(page)
                    record = {
                        "preview": filename, "questionIndex": i+1,
                        "viewport": f"{w}x{h}",
                        "question": before, "answer": after,
                        "resetHidesAnswer": not reset["answerVisible"],
                        "javascriptErrors": list(errors),
                    }
                    record["blockingFailures"] = (
                        (["answer_leaked_before_reveal"] if before["answerVisible"] else []) +
                        (["answer_not_visible_after_reveal"] if not after["answerVisible"] else []) +
                        (["answer_did_not_reset"] if not record["resetHidesAnswer"] else []) +
                        (["broken_image"] if before["brokenImages"] or after["brokenImages"] else []) +
                        (["horizontal_overflow"] if before["horizontalOverflowPx"]>1 or after["horizontalOverflowPx"]>1 else []) +
                        (["clipped_element"] if before["clippedElements"] or after["clippedElements"] else []) +
                        (["javascript_error"] if errors else [])
                    )
                    record["reviewWarnings"] = (
                        (["vertical_scroll_question"] if before["verticalOverflowPx"]>1 else []) +
                        (["vertical_scroll_answer"] if after["verticalOverflowPx"]>1 else [])
                    )
                    results.append(record)
                page.close()
            context.close()
        browser.close()
    report = {
        "scope":"isolated November 2021 teacher QA previews only",
        "approval":"NOT_APPROVED_AUTOMATICALLY",
        "screensReviewed":len(results),
        "blockingCases":sum(bool(x["blockingFailures"]) for x in results),
        "scrollWarningCases":sum(bool(x["reviewWarnings"]) for x in results),
        "results":results,
    }
    (output / "report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    summary = [
        "# RHS H446 November 2021 automated screenshot review",
        "",
        "This is an automated layout screen capture, NOT teacher or classroom projector approval.",
        f"Question-and-answer pairs: {len(results)}",
        f"Blocking cases: {report['blockingCases']}",
        f"Vertical-scroll warning cases: {report['scrollWarningCases']}",
        "",
        "| Preview | Question | Viewport | Failures | Scroll warnings |",
        "| --- | --- | --- | --- | --- |",
    ]
    for x in results:
        summary.append("| " + " | ".join([
            x["preview"], str(x["questionIndex"]), x["viewport"],
            ", ".join(x["blockingFailures"]) or "none",
            ", ".join(x["reviewWarnings"]) or "none",
        ]) + " |")
    (output / "report.md").write_text("\n".join(summary)+"\n", encoding="utf-8")
    print(json.dumps({k:v for k,v in report.items() if k!="results"}, indent=2))
    print("Screenshots and report:", output)
    return 1 if report["blockingCases"] else 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parent)
    parser.add_argument("--output", type=Path, default=Path("/tmp/h446-nov-2021-visual-review"))
    args = parser.parse_args()
    raise SystemExit(run(args.root.resolve(), args.output.resolve()))
