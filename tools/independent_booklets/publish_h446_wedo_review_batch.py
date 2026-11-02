#!/usr/bin/env python3
"""Publish five H446 teacher-review We Do PDFs with original CHECK after the Exit Ticket.

This first batch deliberately excludes visual-dependent lessons. It never
modifies original lessons or revision guides, and never approves a booklet.
"""
from __future__ import annotations
import json
import sys
from pathlib import Path
from bs4 import BeautifulSoup
import fitz

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
sys.path.insert(0,str(HERE))
from source_model import h446_source, HROOT
from publish_h446_y12_exceptions import make_pdf_flexible
from render_pdf import impose_a3

LESSONS=(8,9,10,11,12)
DEST=ROOT/'offline/booklets/h446'
CATALOGUE=ROOT/'offline/booklets/catalogue.json'


def check_a4(path,expected,n):
    with fitz.open(path) as doc:
        texts=[page.get_text() for page in doc]
        positions={key:next((i for i,page in enumerate(texts) if label in page),-1)
                   for key,label in (('try','Guided 1 — TRY'),
                                     ('exit','EXIT TICKET / REFLECTION'),
                                     ('check','Guided 1 — CHECK'))}
        assert len(doc)==expected and 8<=expected<=16,(n,'unexpected page count',expected)
        assert 0<=positions['try']<positions['exit']<positions['check'],(n,positions)
        assert all(len(page.strip())>=40 for page in texts),(n,'near-blank page')


def publish():
    cat=json.loads(CATALOGUE.read_text(encoding='utf-8'))
    entries=cat['lessons']['h446']
    originals={str(n):dict(entries[str(n)]) for n in LESSONS}
    revised={}
    for n in LESSONS:
        old=originals[str(n)]
        assert not old['teacher_approved'],(n,'Unexpected teacher approval')
        assert 'VISUAL_PILOT' not in old['print_bw'],(n,'Do not overwrite illustrated PDFs')
        lesson=h446_source(n)
        assert not lesson.is_assessment,(n,'protected assessment')
        assert lesson.visual_count==0,(n,'source diagram must be preserved')
        assert lesson.guided and all(a.strip() for _,a in lesson.guided),(n,'missing CHECK model')
        soup=BeautifulSoup((HROOT/f'lesson-{n:03d}'/'index.html').read_text(encoding='utf-8'),'html.parser')
        variants={};pages=None
        for mode in ('bw','colour'):
            prefix=f'H446_Lesson_{n:03d}_WEDO_REVIEW_{mode.upper()}'
            a4=DEST/f'{prefix}_A4.pdf'
            a3=DEST/f'{prefix}_A3_Booklet.pdf'
            count=make_pdf_flexible(lesson,soup,mode,a4)
            check_a4(a4,count,n)
            spreads=impose_a3(a4,a3)
            with fitz.open(a3) as doc:
                assert len(doc)==spreads==((count+3)//4)*2,(n,'A3 spreads')
            if pages is not None:
                assert pages==count,(n,'B&W vs colour page counts')
            pages=count
            variants[mode]=(a4.relative_to(ROOT).as_posix(),a3.relative_to(ROOT).as_posix())
        entry=dict(old)
        entry.update({
            'print_bw':variants['bw'][0],
            'learn_colour':variants['colour'][0],
            'booklet_bw':variants['bw'][1],
            'booklet_colour':variants['colour'][1],
            'a4_pages':pages,
            'a3_spreads':((pages+3)//4)*2,
            'status':'draft_needs_teacher_content_review',
            'teacher_approved':False,
            'warnings':list(dict.fromkeys(old.get('warnings',[])+[
                'We Do Try-Check-Improve: original source checks appear after Exit Ticket',
                'Teacher must individually verify guided models, page layout and OCR accuracy before pupils receive this resource']))
        })
        revised[str(n)]=entry
        print('PASS',n,pages,'pages; guided tasks',len(lesson.guided),flush=True)
    assert len(revised)==len(LESSONS),'Cannot publish incomplete batch'
    for key,entry in revised.items():entries[key]=entry
    CATALOGUE.write_text(json.dumps(cat,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    lines=['# H446 printed We Do — teacher-review pilot batch','','**2 November 2026 — all student-approval flags remain false.**',
           'Generated using original H446 lesson prompts and hidden source CHECK stages.',
           'Original interactive lesson HTML, shared navigation, revision guides and existing illustrated PDFs were not modified.',
           '','| Lesson | A4 pages | Status |','|---|---:|---|']
    for n in LESSONS:lines.append(f'| {n:03d} | {revised[str(n)]["a4_pages"]} | Teacher review required |')
    lines+=['','Checks: source diagrams absent for these five lessons; both A4 modes and A3 impositions verified;',
            'guided TRY section precedes Exit Ticket, and model CHECK section follows it.',
            'The original PDF filenames remain in the repository for rollback. No booklets are teacher-approved.',
            '']
    (DEST/'H446_WEDO_REVIEW_PILOT_BATCH.md').write_text('\n'.join(lines),encoding='utf-8')
    print('BATCH PASS',list(LESSONS),flush=True)


if __name__=='__main__':
    publish()
