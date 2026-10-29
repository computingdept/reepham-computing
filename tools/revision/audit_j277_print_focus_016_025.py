#!/usr/bin/env python3
"""Focused J277 016-025 PDF/source quality gate.

This is a STAFF-review gate, never a teacher-approval mechanism. It reads
existing PDFs and the live lesson data; it never changes Teach, revisions,
hubs or PDF binaries.
"""
import json
import os
import re
from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / "lessons/j277"
PDFS = ROOT / "offline/booklets/j277"
BANK = json.loads((BASE / "donow-bank-20261020.json").read_text(encoding="utf-8"))
CODE = json.loads((BASE / "code-first-master-20261021.json").read_text(encoding="utf-8"))

def norm(value):
    s = str(value)
    for a, b in [("’", "'"), ("‘", "'"), ("“", '"'), ("”", '"'),
                 ("–", "-"), ("—", "-"), ("×", " x "), ("÷", " / "),
                 ("≥", ">="), ("≤", "<=")]:
        s = s.replace(a,b)
    return re.sub(r"\s+", " ", s).strip().lower()

def lesson(n):
    path = BASE / ("autumn1-014-018.json" if n <= 18 else f"autumn2-{n:03d}.json")
    return json.loads(path.read_text(encoding="utf-8"))[f"{n:03d}"]

def horizontal_rules(page, start, end):
    ys = set()
    for drawing in page.get_drawings():
        for item in drawing["items"]:
            if item[0] != "l":
                continue
            a, b = item[1], item[2]
            if (abs(a.y - b.y) <= 0.4 and abs(a.x-b.x) >= 375
                    and start <= a.y <= end):
                ys.add(round(a.y, 1))
    return sorted(ys)

report = ["# J277 PDF 016-025 – repeatable source and writing-space check", "",
          "Automated structural check. NOT teacher approval. The committed "
          "four-page PDFs remain review editions.", "",
          "| Lesson | Pages | Retrieval | Code First | You Do questions | Generator correction lines (not visually verified) | Release gate |",
          "|---|---:|---|---|---|---|---|"]
failures = []
for n in range(16, 26):
    d = lesson(n)
    file = PDFS / f"J277_Lesson_{n:03d}_Gold_Standard_4_Page.pdf"
    checks = []
    with fitz.open(file) as pdf:
        pages = len(pdf)
        p = [x.get_text() for x in pdf]
        if pages != 4:
            failures.append(f"{n:03d}: PDF has {pages} pages")
        if n == 16:
            expected_retrieval = [r[0] for r in d["r"]]
        else:
            expected_retrieval = [
                r["question"] for r in BANK["lessons"][f"{n:03d}"]["questions"]]
        retrieval = sum(norm(q) in norm(p[0]) for q in expected_retrieval)
        if retrieval != 4:
            failures.append(f"{n:03d}: only {retrieval}/4 retrieval questions found")
        if n == 16:
            code_task = d["k"]["q"]
        else:
            model = CODE["lessons"].get(f"{n:03d}")
            code_task = model["task"] if model else d["k"]["q"]
        code_present = norm(code_task) in norm(p[2])
        if not code_present:
            checks.append("Code First source task differs or is omitted")
        qpresent = 0
        for q, answer in d["e"][:3]:
            q = q.split("\n\nSource:")[0].strip()
            if norm(q) in norm(p[2]):
                qpresent += 1
        if qpresent != 3:
            failures.append(f"{n:03d}: {qpresent}/3 source You Do questions present")
        # Read the source's deliberate ruled-line calls. PDF vector shapes can
        # include covered-up lines inherited from the Lesson 002 master; simply
        # counting page.get_drawings() would overstate visible writing space.
        if n <= 20:
            renderer = (ROOT / "tools/revision/build_j277_gold_batch_016_020.py").read_text(encoding="utf-8")
            stage = renderer.split("def p4(p,n,d):", 1)[1].split("def validate(", 1)[0]
            # These are source-declared counts, not a substitute for print inspection.
            counts = re.findall(r"rules\(p,\d+,(\d+),step=\d+\)", stage)
            copies = int(counts[0]) if counts else 0
            rewrites = int(counts[-1]) if len(counts) >= 2 else 0
        else:
            renderer = (ROOT / "tools/revision/build_j277_remaining_gold.py").read_text(encoding="utf-8")
            stage = renderer.split("def fourth(p,n,d,issues):", 1)[1].split("def validate(", 1)[0]
            copies = int(re.search(r"rule\(p,722,(\d+)\)", stage).group(1))
            rewrites = int(re.search(r"rule\(p,759,(\d+)\)", stage).group(1))
        if copies < 2 or rewrites < 4:
            checks.append("correction space below 2+4 lines")
        # Six-mark exam responses must have appropriate space, or an
        # explicitly supplied separate writing insert.
        if any(re.search(r"\[6\s+marks?\]", item[0], re.I) for item in d["e"]):
            checks.append("6-mark exam answer space requires physical sign-off")
        if n == 18:
            checks.append("AP1 review: check separate assessment paper")
        if n <= 20:
            checks.append("page-4 You Do answer models manually shortened")
        release = "NEEDS REVIEW" if checks or failures else "structure pass only"
        report.append(
            f"| {n:03d} | {pages} | {retrieval}/4 | "
            f"{'task matched' if code_present else 'task differs'} | {qpresent}/3 | "
            f"{copies} copy + {rewrites} rewrite | {release} |")
        print(f"{n:03d}: pages={pages}, retrieval={retrieval}/4, "
              f"code_task={code_present}, youdo={qpresent}/3, "
              f"correction={copies}+{rewrites}, notes={'; '.join(checks)}")
        if checks:
            report.append(f"\n  - **{n:03d} review points:** " + "; ".join(checks) + ".")
report += ["", "This is not a visual or classroom-ready endorsement.",
           "The teacher must inspect each finished PDF at 100% A4 size and "
           "verify the revision guide, diagrams, worked answers and writing space."]
out = ROOT / "offline/booklets/j277/focus-016-025-machine-audit.md"
out.write_text("\n".join(report)+"\n", encoding="utf-8")
print(f"REPORT: {out.relative_to(ROOT)}")
if os.environ.get("GITHUB_STEP_SUMMARY"):
    with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as f:
        f.write("\n".join(report) + "\n")
if failures:
    raise SystemExit("Hard source/page mismatch: " + "; ".join(failures))
