#!/usr/bin/env python3
"""Fix outstanding Year 12 print booklet cases; retain the protected assessment exceptions."""
import json,sys
from pathlib import Path
from datetime import datetime,timezone
from bs4 import BeautifulSoup
import fitz
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
sys.path.insert(0,str(HERE))
from source_model import h446_source
from render_pdf import impose_a3
from publish_h446_year12_011_015 import make_pdf

def main():
    base=ROOT/'offline/booklets/h446'
    catpath=ROOT/'offline/booklets/catalogue.json'
    audpath=base/'Y12_EIGHT_PAGE_BATCHES.json'
    cat=json.loads(catpath.read_text())
    audit=json.loads(audpath.read_text())
    recovered=[]
    for n in [17,19,25,31]:
        files=[]
        try:
            lesson=h446_source(n)
            if lesson.is_assessment:raise ValueError('Protected assessment')
            missing=[k for k in lesson.missing if k not in ('you_do_model_answers','exit_ticket_and_answer')]
            if missing:raise ValueError('Incomplete source: '+str(missing))
            if 'you_do_model_answers' in lesson.missing:
                lesson.warnings.append('Model solutions unavailable in original: pupil questions only; teacher to supply answers before delivery')
            if not lesson.exit_answer:
                lesson.warnings.append('Exit solution unavailable; teacher check required')
            soup=BeautifulSoup((ROOT/f'lessons/h446/lesson-{n:03d}/index.html').read_text(),'html.parser')
            pages=9 if n in (19,31) else 8
            a3pages=6 if pages==9 else 4
            variants={}
            for mode in ('bw','colour'):
                base_name=f'H446_Lesson_{n:03d}_{pages}PAGE_REVIEW_{mode.upper()}'
                a4=base/(base_name+'_A4.pdf')
                a3=base/(base_name+'_A3_Booklet.pdf')
                files.extend((a4,a3))
                make_pdf(lesson,soup,mode,a4)
                if impose_a3(a4,a3)!=a3pages:raise ValueError('A3 page count mismatch')
                for path,count in ((a4,pages),(a3,a3pages)):
                    if not path.is_file() or path.stat().st_size<10000:raise ValueError('PDF missing or small')
                    with fitz.open(path) as pdf:
                        if len(pdf)!=count:raise ValueError('PDF count mismatch')
                        if path==a4 and not all(len(p.get_text().strip())>40 for p in pdf):
                            raise ValueError('A4 blank page')
                variants[mode]=(a4,a3)
            entry={
              'title':lesson.title,'a4_pages':pages,'a3_spreads':a3pages,
              'status':'draft_needs_teacher_content_review','teacher_approved':False,
              'warnings':list(dict.fromkeys(lesson.warnings+['Teacher to check models, diagrams and code before issue'])),
              'print_bw':variants['bw'][0].relative_to(ROOT).as_posix(),
              'learn_colour':variants['colour'][0].relative_to(ROOT).as_posix(),
              'booklet_bw':variants['bw'][1].relative_to(ROOT).as_posix(),
              'booklet_colour':variants['colour'][1].relative_to(ROOT).as_posix()}
            cat['lessons']['h446'][str(n)]=entry
            audit['deferred']=[x for x in audit['deferred'] if x['lesson']!=n]
            audit['generated'].append({'lesson':n,'title':lesson.title,'page_count':pages,
              'question_count':len(lesson.you_do),'retrieval_count':len(lesson.do_now),
              'visual_count':lesson.visual_count,'status':entry['status'],'warnings':entry['warnings']})
            for b in audit['batches']:
                if n in b['deferred']:
                    b['deferred'].remove(n);b['passed'].append(n);b['passed'].sort()
            recovered.append((n,pages))
            print('RECOVERED',n,pages,flush=True)
        except Exception as exc:
            for p in files:
                if p.is_file():p.unlink()
            print('DEFERRED',n,str(exc),flush=True)
    cat['counts']['h446_published_draft']=len(cat['lessons']['h446'])
    cat['counts']['pdf_files']=4*sum(map(len,cat['lessons'].values()))
    catpath.write_text(json.dumps(cat,indent=2,ensure_ascii=False)+'\n')
    audit['exception_check_utc']=datetime.now(timezone.utc).isoformat()
    audpath.write_text(json.dumps(audit,indent=2,ensure_ascii=False)+'\n')
    lines=['# H446 Year 12 print production report','',
      'Lessons 001–160; generated in five-lesson batches.',
      f"New eight/nine-page drafts: **{len(audit['generated'])} / 145**",
      'First 15 booklets retained from earlier approved-format batches.',
      f"Outstanding exceptions: **{len(audit['deferred'])}**", '',
      '| Batch | Generated | Deferred |','|---|---:|---:|']
    for b in audit['batches']:
        lines.append(f"| {b['range']} | {len(b['passed'])} | {len(b['deferred'])} |")
    lines.extend(['','## Longer booklets to preserve the model', ''])
    for n,pages in recovered:
        if pages>8:lines.append(f'- Lesson {n:03d}: {pages} A4 pages')
    lines.extend(['','## Protected or incomplete lessons',''])
    for x in audit['deferred']:
        lines.append(f"- Lesson {x['lesson']:03d}: {x['reason']}. Existing Print link preserved where available.")
    lines+=['','## Review requirements','',
      'Automated page counts, PDF page content and A3 imposition passed for published new resources.',
      'Diagrams, examples and exam-question accuracy still require teacher review before classroom delivery.',
      'All files are marked DRAFT (teacher_approved=false).',
      'No classroom lesson, guide or navigation source was modified.',
      'See Y12_EIGHT_PAGE_BATCHES.json for every lesson and exception.']
    (base/'Y12_FINAL_PRODUCTION_REPORT.md').write_text('\n'.join(lines)+'\n')
    print(json.dumps({'recovered':recovered,'remaining':audit['deferred']},indent=2))
if __name__=='__main__':main()
