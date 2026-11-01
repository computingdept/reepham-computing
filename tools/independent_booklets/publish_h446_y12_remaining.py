#!/usr/bin/env python3
"""Build reviewed-format H446 Year 12 booklets in sequential batches of five.

Fails safely per lesson: never replace a working Print link with an unverified PDF.
Publishes the generated PDFs and a JSON/Markdown audit; preserves teacher review.
The eight-page layout and source extraction are shared with lessons 011–015.
"""
import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from collections import Counter

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
sys.path.insert(0,str(HERE))
from bs4 import BeautifulSoup
import fitz
from source_model import h446_source
from render_pdf import impose_a3
from publish_h446_year12_011_015 import make_pdf

def process(n,dest):
    lesson=h446_source(n)
    if lesson.is_assessment:
        raise ValueError("Assessment/feedback lesson — protected from student booklet publication")
    missing=[k for k in lesson.missing if k!='exit_ticket_and_answer' or not lesson.exit_question]
    if missing:
        raise ValueError("Source incomplete: "+", ".join(missing))
    if not lesson.exit_answer:
        lesson.warnings.append("Exit model answer unavailable; review before delivery")
    path=ROOT/f'lessons/h446/lesson-{n:03d}/index.html'
    if not path.is_file():raise ValueError("Classroom lesson missing")
    soup=BeautifulSoup(path.read_text(encoding='utf-8'),'html.parser')
    variants={}
    files=[]
    try:
        for mode in ('bw','colour'):
            a4=dest/f'H446_Lesson_{n:03d}_8PAGE_REVIEW_{mode.upper()}_A4.pdf'
            a3=dest/f'H446_Lesson_{n:03d}_8PAGE_REVIEW_{mode.upper()}_A3_Booklet.pdf'
            files.extend((a4,a3))
            make_pdf(lesson,soup,mode,a4)
            spreads=impose_a3(a4,a3)
            if spreads!=4:raise ValueError(f'Expected 4 A3 booklet pages, got {spreads}')
            for f,pages in ((a4,8),(a3,4)):
                if not f.is_file() or f.stat().st_size<10000:
                    raise ValueError(f'PDF missing or very small: {f}')
                with fitz.open(f) as pdf:
                    if len(pdf)!=pages:raise ValueError(f'{f.name}: {len(pdf)} pages, expected {pages}')
                    if pages==8 and not all(len(p.get_text().strip())>40 for p in pdf):
                        raise ValueError(f'{f.name}: blank page')
            variants[mode]=(a4,a3)
    except Exception:
        for f in files:
            if f.exists():f.unlink()
        raise
    warning=list(dict.fromkeys(lesson.warnings+
      ["Teacher must approve the diagrams, C# tasks and learning sequence before classroom issue.",
       "OCR guide coverage referenced but not automatically cross-verified."]))
    status="draft_needs_teacher_content_review" if (lesson.visual_count or any(
      "teacher-dependent" in x.lower() or "model answer unavailable" in x.lower() for x in warning)) else "draft_ready_for_teacher_audit"
    record={
       "title":lesson.title,"status":status,"teacher_approved":False,
       "warnings":warning,"a4_pages":8,"a3_spreads":4,
       "print_bw":variants['bw'][0].relative_to(ROOT).as_posix(),
       "learn_colour":variants['colour'][0].relative_to(ROOT).as_posix(),
       "booklet_bw":variants['bw'][1].relative_to(ROOT).as_posix(),
       "booklet_colour":variants['colour'][1].relative_to(ROOT).as_posix(),
    }
    return record,{"title":lesson.title,"page_count":8,"question_count":len(lesson.you_do),
                   "retrieval_count":len(lesson.do_now),"visual_count":lesson.visual_count,
                   "status":status,"warnings":warning}

def run(first=16,last=160):
    dest=ROOT/'offline/booklets/h446'
    dest.mkdir(parents=True,exist_ok=True)
    catalogue_file=ROOT/'offline/booklets/catalogue.json'
    data=json.loads(catalogue_file.read_text(encoding='utf-8'))
    lesson_catalogue=data['lessons']['h446']
    prior={str(n):lesson_catalogue.get(str(n),{}).get('print_bw') for n in range(first,last+1)}
    audit={"generated_utc":datetime.now(timezone.utc).isoformat(),"first":first,"last":last,
           "batch_size":5,"generated":[],"deferred":[],"batches":[],"teacher_approved":False}
    for start in range(first,last+1,5):
        nums=list(range(start,min(last+1,start+5)))
        b={"range":f'{nums[0]:03d}–{nums[-1]:03d}',"passed":[],"deferred":[]}
        print("BATCH",b["range"],flush=True)
        for n in nums:
            try:
                record,meta=process(n,dest)
                lesson_catalogue[str(n)]=record
                audit['generated'].append({"lesson":n,**meta})
                b['passed'].append(n)
                print(" PASS",f'{n:03d}',record["title"],flush=True)
            except Exception as exc:
                reason=f"{type(exc).__name__}: {exc}"
                item={"lesson":n,"reason":reason,
                      "old_print_link_kept":bool(prior.get(str(n))),
                      "old_print_link":prior.get(str(n))}
                audit['deferred'].append(item)
                b['deferred'].append(n)
                print(" DEFER",f'{n:03d}',reason,flush=True)
        audit['batches'].append(b)
        # Persist a checkpoint report after every five, even if no PDF passed.
        (dest/'Y12_EIGHT_PAGE_BATCHES.json').write_text(
            json.dumps(audit,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    data['counts']['h446_published_draft']=len(lesson_catalogue)
    data['counts']['pdf_files']=4*sum(map(len,data['lessons'].values()))
    catalogue_file.write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    before=first-1
    lines=[
        "# H446 Year 12 — eight-page print booklet production report",
        "",
        f"Generated: {audit['generated_utc']}",
        f"Scope: Lessons {first:03d}–{last:03d}, groups of five.",
        "**Status: PRINT DRAFT — not teacher approved for delivery.**",
        "",
        f"- Eight-page A4 booklets generated and PDF-checked: **{len(audit['generated'])}**",
        f"- Deferred because of incomplete material or layout: **{len(audit['deferred'])}**",
        f"- Earlier reviewed lessons 001–015 preserved: **{before}**" if first==16 else "",
        "- Existing Print links retained for deferred lessons; no broken placeholder links are created.",
        "- No changes to classroom lessons, revision guides, or central website navigation.",
        "- All new PDFs have B&W/colour A4 editions and A3 imposed booklet editions.",
        "- Manual visual inspection and OCR specification checking are still required before use.",
        "",
        "## Five-lesson batch results",
        "",
        "| Lessons | New drafts | Deferred |",
        "|---|---:|---:|"
    ]
    for b in audit['batches']:
        lines.append(f"| {b['range']} | {len(b['passed'])} | {len(b['deferred'])} |")
    lines+=["","## Deferred — requires correction",""]
    if not audit['deferred']:lines.append("No deferred lessons.")
    for x in audit['deferred']:
        lines.append(f"- **Lesson {x['lesson']:03d}** — {x['reason']}. "
                     + ("Previous Print link preserved." if x['old_print_link_kept'] else "No new Print link published."))
    lines+=["","## Teacher review and next step","",
            "Check diagrams, code examples, printed line lengths and answer key accuracy.",
            "All generated items remain drafts. Record teacher approval separately before delivery.",
            "The accompanying JSON contains source exception reasons, page counts, and QA warnings."]
    (dest/'Y12_EIGHT_PAGE_BATCH_REPORT.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print(json.dumps({"generated":len(audit['generated']),"deferred":len(audit['deferred']),
                      "batches":len(audit['batches'])},indent=2),flush=True)
    return audit

if __name__=='__main__':
    p=argparse.ArgumentParser()
    p.add_argument('--first',type=int,default=16)
    p.add_argument('--last',type=int,default=160)
    args=p.parse_args()
    run(args.first,args.last)
