#!/usr/bin/env python3
"""Final structural audit: all H446 Print PDFs and the source-derived We Do sequence.

Never modifies booklet content, catalogue links or teacher approval.
Records all structural issues without claiming OCR/content sign-off.
"""
from __future__ import annotations

import json
import re
from collections import Counter
from datetime import datetime,timezone
from pathlib import Path

import fitz

ROOT=Path(__file__).resolve().parents[2]
CAT=ROOT/"offline/booklets/catalogue.json"
JSON_REPORT=ROOT/"offline/booklets/h446/H446_WEDO_FINAL_QA.json"
REPORT=ROOT/"offline/booklets/h446/H446_WEDO_FINAL_QA.md"
FIELDS=("print_bw","learn_colour","booklet_bw","booklet_colour")

def find(pages,pattern,start=0):
    re_pat=re.compile(pattern,re.I)
    return next((i for i,t in enumerate(pages[start:],start) if re_pat.search(t)), -1)

def main():
    cat=json.loads(CAT.read_text(encoding="utf-8"))
    entries=cat["lessons"]["h446"]
    records=[]
    mode_counts=Counter()
    for key in sorted(entries,key=int):
        lesson=int(key)
        record=entries[key]
        issues=[]
        kind=record["print_bw"]
        if "WEDO_DEDUP_" in kind:family="unique-source-diagrams"
        elif "WEDO_ALTERNATE_" in kind:family="alternate-two-pane"
        elif "WEDO_VISUAL_DISCUSS_" in kind:family="visual-augmentation"
        elif "WEDO_DISCUSS_REVIEW_" in kind:family="source-guided-flexible"
        elif "WEDO_REVIEW_" in kind:family="legacy-discussion-review"
        else:family="unrecognised"
        mode_counts[family]+=1
        if family=="unrecognised":issues.append("unknown current Print format")
        if record.get("teacher_approved") is not False:
            issues.append("teacher-approval flag unexpectedly true or absent")
        pdfs={}
        page_text={}
        for field in FIELDS:
            path=ROOT/record.get(field,"")
            if not path.is_file():
                issues.append(f"missing PDF {field}: {path}")
                continue
            try:
                with fitz.open(path) as doc:
                    pdfs[field]=len(doc)
                    if field in ("print_bw","learn_colour"):
                        if any(abs(p.rect.width-595.3)>2 or abs(p.rect.height-841.9)>2
                               for p in doc):
                            issues.append(f"non-A4 sheet in {field}")
                        page_text[field]=[p.get_text() for p in doc]
                        if family in ("unique-source-diagrams","alternate-two-pane","visual-augmentation") and \
                           not any(p.get_images(full=True) for p in doc):
                            issues.append(f"no visual images in illustrated {field}")
                    if len(doc)!=record["a4_pages" if field in ("print_bw","learn_colour") else "a3_spreads"]:
                        issues.append(f"PDF page-count mismatch {field}")
            except Exception as exc:
                issues.append(f"cannot read {field}: {exc}")
        if pdfs.get("print_bw")!=pdfs.get("learn_colour"):
            issues.append("colour and black-and-white A4 pages differ")
        if pdfs.get("booklet_bw")!=pdfs.get("booklet_colour"):
            issues.append("colour and monochrome A3 imposition differ")
        for field,pages in page_text.items():
            discussion=find(pages,r"Try\s*[→>·-]\s*Discuss\s*[→>·-]\s*Improve")
            if discussion<0:
                # Headings in the source-based supplements use an uppercase
                # variant with centred dots, which is equivalent in meaning.
                discussion=find(pages,r"TRY\s*[·→> -]+\s*DISCUSS\s*[·→> -]+\s*IMPROVE")
            if discussion<0:
                issues.append(f"{field}: Try/Discuss/Improve sequence missing")
            attempt=find(pages,r"\b(?:Guided\s*1\s*[-—·:]\s*TRY|WE\s+DO\s*[-—·]\s*TRY)\b")
            independent=find(pages,r"\bYOU DO\b")
            exit_at=find(pages,r"\bEXIT TICKET\b")
            check=find(pages,r"Guided\s*1\s*[-—·:]\s*CHECK|WE DO\s*[-—·]\s*SOURCE CHECK")
            if attempt<0 or independent<0 or exit_at<0 or check<0:
                issues.append(f"{field}: guided/independent/exit/source-check marker missing")
            elif not (attempt < independent <= exit_at < check):
                issues.append(f"{field}: source model or student work out of order")
            if any(len(t.strip())<35 for t in pages):
                issues.append(f"{field}: nearly blank A4 page")
        records.append({
            "lesson":lesson,"title":record.get("title",""),
            "family":family,"a4_pages":record.get("a4_pages",0),
            "teacher_approved":record.get("teacher_approved"),
            "issues":list(dict.fromkeys(issues))
        })
    if len(records)!=len(entries)==288:
        raise RuntimeError("H446 catalogue record count changed")
    total_issues=sum(bool(r["issues"]) for r in records)
    long=[r for r in records if r["a4_pages"]>16]
    report={"audit_utc":datetime.now(timezone.utc).isoformat(),
            "catalogue_records":len(records),
            "family_counts":dict(sorted(mode_counts.items())),
            "lessons_with_automated_issues":total_issues,
            "longer_than_16_pages":len(long),
            "longest_a4_pages":max(r["a4_pages"] for r in records),
            "teacher_approved":sum(r["teacher_approved"] is True for r in records),
            "records":records}
    JSON_REPORT.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    lines=[
        "# H446 We Do final structural QA — all published Print booklets","",
        f"Verified {report['audit_utc']}.", "",
        f"- **Catalogued Print booklets:** {len(records)}",
        f"- **Lessons flagged by automated structural QA:** {total_issues}",
        f"- **Drafts over 16 A4 pages:** {len(long)} (maximum {report['longest_a4_pages']} pages)",
        f"- **Teacher-approved:** {report['teacher_approved']}",
        "",
        "## Print implementation groups","",
        "| Format | Lessons |","|---|---:|",
    ]
    for name,count in sorted(mode_counts.items()):lines.append(f"| {name} | {count} |")
    lines+=["","## Structural concerns","",
        "These are machine checks only. They do not prove that the pedagogical prompt is challenging, source answers are correct, that a diagram is accurate, or that printing is fully legible.",
        "Earlier tests confirmed every accepted PDF's A3 imposition and source diagram count. Teacher inspection is required for correctness and SEND-friendly layout.",
        "","| Lesson | Current pages | Format | Issues |",
        "|---|---:|---|---|"]
    for row in records:
        if not row["issues"] and row["a4_pages"]<=16:continue
        issue="; ".join(row["issues"]).replace("|","/") if row["issues"] else "Layout review: exceeds 16 A4 pages"
        lines.append(f"| {row['lesson']:03d} | {row['a4_pages']} | {row['family']} | {issue} |")
    lines+=["","Zero automatic flags is not a teacher content approval.", ""]
    REPORT.write_text("\n".join(lines)+"\n",encoding="utf-8")
    print(json.dumps({k:v for k,v in report.items() if k!="records"},indent=2))
    if total_issues:
        print("ISSUES",[(r["lesson"],r["issues"][:2]) for r in records if r["issues"]][:30])
    return report

if __name__=="__main__":
    main()
