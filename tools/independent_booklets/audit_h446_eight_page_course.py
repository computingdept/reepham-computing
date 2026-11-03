#!/usr/bin/env python3
"""OCR H446 288-booklet EIGHT-PAGE DRAFT QA.

Read-only: checks all generated pupil PDFs and paired A3 imposition,
tracks selected exam questions, teacher-model separation and print costs.
Does not change the live catalogue or approve any resource.
"""
from __future__ import annotations
import json,re,math
from collections import Counter
from datetime import datetime,timezone
from pathlib import Path
import fitz

ROOT=Path(__file__).resolve().parents[2]
DEST=ROOT/"offline/booklets/h446"
CAT=ROOT/"offline/booklets/catalogue.json"
STEM="H446_EIGHT_PAGE_COURSE_QA_2026-11-03"
STAGES=("Do Now","New Learning","New Learning","I Do","We Do","You Do","You Do","Exit Ticket")
REPORT_STEMS=[
"H446_EIGHT_PAGE_REDESIGN_PILOT",
"H446_EIGHT_PAGE_REDESIGN_BATCH01",
"H446_EIGHT_PAGE_REDESIGN_RECOVERY01",
"H446_EIGHT_PAGE_REDESIGN_RECOVERY02",
"H446_EIGHT_PAGE_REDESIGN_RECOVERY03",
"H446_EIGHT_PAGE_REDESIGN_BATCH02",
"H446_EIGHT_PAGE_REDESIGN_LAYOUT_V2",
"H446_EIGHT_PAGE_REDESIGN_BATCH03",
"H446_EIGHT_PAGE_REDESIGN_BATCH04",
"H446_EIGHT_PAGE_REDESIGN_BATCH05",
"H446_EIGHT_PAGE_REDESIGN_BATCH06",
"H446_EIGHT_PAGE_REDESIGN_BATCH07",
"H446_EIGHT_PAGE_REDESIGN_REFRESH_V2",
]

def most_recent_source_results():
    result={}
    for stem in REPORT_STEMS:
        file=DEST/f"{stem}.json"
        if not file.is_file():continue
        report=json.loads(file.read_text(encoding="utf-8"))
        for lesson in report["lessons"]:
            if lesson["status"]=="pilot_generated":
                result[int(lesson["lesson"])]=lesson
    return result

def main():
    cat=json.loads(CAT.read_text(encoding="utf-8"))["lessons"]["h446"]
    records=most_recent_source_results()
    rows=[]
    total_original_sheets=0
    total_new_sheets=0
    for id_,entry in sorted(cat.items(),key=lambda x:int(x[0])):
        n=int(id_)
        prefix=DEST/f"H446_Lesson_{n:03d}_8PAGE_REDESIGN"
        paths={
          "bw_a4":Path(str(prefix)+"_BW_A4.pdf"),
          "colour_a4":Path(str(prefix)+"_COLOUR_A4.pdf"),
          "bw_a3":Path(str(prefix)+"_BW_A3_Booklet.pdf"),
          "colour_a3":Path(str(prefix)+"_COLOUR_A3_Booklet.pdf"),
          "preview":Path(str(prefix)+"_eight_page_preview.png"),
          "source_key":Path(str(prefix)+"_SOURCE_MARK_SCHEME_STAFF_REVIEW.pdf")
        }
        issues=[]
        if n not in records:issues.append("No successful source-generation report")
        if any(not f.is_file() for f in paths.values()):
            issues.extend("missing "+label for label,f in paths.items() if not f.is_file())
        if entry.get("teacher_approved") is not False:
            issues.append("Teacher approval unexpectedly granted")
        if any("8PAGE_REDESIGN" in entry.get(k,"") for k in
               ("print_bw","learn_colour","booklet_bw","booklet_colour")):
            issues.append("Live Print link was replaced without review")
        previous_pages=int(entry.get("a4_pages") or 0)
        if previous_pages<1:issues.append("Existing booklet page length missing")
        checked=0
        figs=0
        for variant in ("bw","colour"):
            pdf_file=paths[variant+"_a4"]
            a3_file=paths[variant+"_a3"]
            if not pdf_file.is_file() or not a3_file.is_file():continue
            try:
                with fitz.open(pdf_file) as pdf:
                    if len(pdf)!=8:issues.append(f"{variant}: {len(pdf)} instead of 8 A4 pages")
                    content=[p.get_text() for p in pdf]
                    if len(content)==8:
                        for i,(text,stage) in enumerate(zip(content,STAGES),1):
                            if stage.lower() not in text[:650].lower():
                                issues.append(f"{variant}: page {i} wrong phase")
                            if len(text.strip())<150:
                                issues.append(f"{variant}: page {i} underfilled or missing")
                            if f"{i} / 8" not in text:
                                issues.append(f"{variant}: page {i} wrong page count footer")
                            if any(word[0]<16 or word[2]>pdf[i-1].rect.width-16 or word[1]<10
                                   or word[3]>pdf[i-1].rect.height-10
                                   for word in pdf[i-1].get_text("words")):
                                issues.append(f"{variant}: page {i} text outside safe paper edge")
                            if re.search(r"(?m)^\s*Recall the term\s*[—–:]\s*",text):
                                issues.append(f"{variant}: unresolved interactive vocabulary placeholder")
                        if "DISCUSS" not in content[4] or "IMPROVE" not in content[4]:
                            issues.append(f"{variant}: incomplete guided-practice sequence")
                        if re.search(r"(?im)^\s*(?:SOURCE CHECK|MODEL ANSWER|MARK SCHEME)\s*[:—]", "\n".join(content[:7])):
                            issues.append(f"{variant}: model or marking section before Exit")
                    for p in pdf:
                        if abs(p.rect.width-595.28)>1 or abs(p.rect.height-841.89)>1:
                            issues.append(f"{variant}: non-A4 PDF page")
                    figs=sum(len(p.get_images(full=True)) for p in pdf)
                    checked+=1
                with fitz.open(a3_file) as booklet:
                    if len(booklet)!=4:issues.append(f"{variant}: A3 imposition not 4 PDF faces")
                    if any(p.rect.width<1100 or p.rect.height<800 for p in booklet):
                        issues.append(f"{variant}: unexpected A3 paper geometry")
            except Exception as exc:
                issues.append(f"{variant}: PDF parse error {type(exc).__name__}: {exc}")
        source=records.get(n,{})
        source_count=source.get("source_exam_questions")
        printed=source.get("printed_exam_questions")
        indices=source.get("printed_to_source_question_numbers")
        if source_count is not None and printed is not None and not 2<=printed<=source_count:
            issues.append("Unexpected number of original examination questions")
        if indices is not None and (len(indices)!=printed or max(indices)>source_count):
            issues.append("Printed/original question index mapping mismatch")
        original_sheets=math.ceil(previous_pages/2)
        new_sheets=4
        total_original_sheets+=original_sheets
        total_new_sheets+=new_sheets
        rows.append({
          "lesson":n,
          "title":entry.get("title",""),
          "original_a4_pages":previous_pages,
          "new_a4_pages":8 if checked==2 else None,
          "original_double_sided_a4_sheets":original_sheets,
          "new_double_sided_a4_sheets":new_sheets,
          "source_question_count":source_count,
          "printed_question_count":printed,
          "printed_to_original_question_numbers":indices,
          "figures":figs,
          "issues":list(dict.fromkeys(issues))
        })
    problems=[x for x in rows if x["issues"]]
    result={
      "audit_utc":datetime.now(timezone.utc).isoformat(),
      "catalogued_print_resources":len(cat),
      "eight_page_student_drafts":sum(r["new_a4_pages"]==8 for r in rows),
      "a4_and_a3_variants_expected_per_lesson":4,
      "structural_issue_count":len(problems),
      "teacher_approved":sum(x.get("teacher_approved") is True for x in cat.values()),
      "live_print_links_unchanged":not any("Live Print link" in e for x in rows for e in x["issues"]),
      "old_booklets_over_16_pages":sum(r["original_a4_pages"]>16 for r in rows),
      "old_booklets_over_8_pages":sum(r["original_a4_pages"]>8 for r in rows),
      "hypothetical_a4_sheets_one_student_originals":total_original_sheets,
      "hypothetical_a4_sheets_one_student_eight_page":total_new_sheets,
      "hypothetical_a4_sheets_saved_one_student_if_all_288_printed":total_original_sheets-total_new_sheets,
      "records":rows
    }
    (DEST/f"{STEM}.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    lines=[
      "# OCR H446 eight-page student Print — whole-course structural QA","",
      f"Checked {result['audit_utc']}. **Student Print catalogue not modified.**",
      "","| Test | Verified |","|---|---:|",
      f"| Existing catalogue | {result['catalogued_print_resources']} |",
      f"| Eight-page draft sets with A4, A3, colour and B&W | {result['eight_page_student_drafts']} |",
      f"| Structural QA exceptions | {result['structural_issue_count']} |",
      f"| Original print booklets longer than 16 A4 | {result['old_booklets_over_16_pages']} |",
      f"| Original print booklets longer than eight A4 | {result['old_booklets_over_8_pages']} |",
      f"| Teacher-approved | {result['teacher_approved']} |",
      "",
      "## Printing costs and scope","",
      "Eight A4 pages require **four double-sided A4 sheets per pupil** or **two double-sided A3 sheets folded as a booklet**.",
      "For a class of 30, that is **120 A4 sheets per lesson** when all pupils receive a copy; the existing 18-page version uses **270 A4 sheets**.",
      f"If every one of the {len(cat)} different booklets were printed once for one pupil, the theoretical sheet total would change from **{total_original_sheets}** to **{total_new_sheets}**, a saving of **{total_original_sheets-total_new_sheets} sheets**. This is an illustration of sheet quantities, not a school cost forecast.",
      "",
      "## Pedagogical status","",
      "- Each eight-page draft is **source-derived**, not a miniaturisation of the old PDF. The online classroom lesson retains additional examples, reveals and exam questions.",
      "- The two selected exam questions in some booklets map to original online questions as shown in the per-lesson record; a longer online question list has not been silently reproduced in print.",
      "- Detailed marking guidance is in separate **publicly accessible GitHub review-key files**, which are NOT secured teacher-only material; do not rely on file names for student access control.",
      "- The original published **Print buttons still point to the earlier PDFs**. No booklet has been personally checked or teacher-approved. Human inspection of OCR accuracy, question value, diagram labels, writable space and readability is essential before changing links.",
      "",
      "## Structural exceptions",""
    ]
    if problems:
        lines+=["| Lesson | Problem |","|---|---|"]
        for row in problems:
            lines.append(f"| {row['lesson']:03d} | {'; '.join(row['issues']).replace('|','/')} |")
    else:
        lines+=["None reported by automated file and PDF checks.",""]
    lines+=["","## Per-lesson catalogue (source print vs redesigned draft)","",
            "| Lesson | Current A4 | Draft A4 | Online questions | Printed questions | QA |",
            "|---|---:|---:|---:|---:|---|"]
    for row in rows:
        lines.append(f"| {row['lesson']:03d} | {row['original_a4_pages']} | {row['new_a4_pages'] or '—'} | {row['source_question_count'] or '—'} | {row['printed_question_count'] or '—'} | {'CHECK' if row['issues'] else 'Automated pass'} |")
    lines+=["","**Do not infer teacher sign-off from an automated pass.**", ""]
    (DEST/f"{STEM}.md").write_text("\n".join(lines)+"\n",encoding="utf-8")
    print(json.dumps({k:v for k,v in result.items() if k!="records"},indent=2))
    if problems:print("EXCEPTIONS",[(x["lesson"],x["issues"]) for x in problems])
    if len(cat)!=288:raise SystemExit("Unexpected catalogue size; audit may be incomplete")
    return result

if __name__=="__main__":main()
