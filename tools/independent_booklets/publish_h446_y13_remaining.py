#!/usr/bin/env python3
"""H446 Year 13 student print draft production, five lessons per checked batch.

Keep the eight-page standard where possible; add pages for long technical
content instead of truncating examples or shrinking code. Do not publish
assessments/feedback tasks as student worksheets.
"""
import json,sys
from pathlib import Path
from datetime import datetime,timezone
from bs4 import BeautifulSoup
import fitz
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
sys.path.insert(0,str(HERE))
from publish_h446_y12_remaining import process as process_eight
from publish_h446_y12_exceptions import make_pdf_flexible
from source_model import h446_source
from render_pdf import impose_a3

FIRST,LAST=181,320

def recover(n,dest,first_reason):
    lesson=h446_source(n)
    if lesson.is_assessment:raise ValueError('Protected assessment / feedback lesson')
    required=[x for x in lesson.missing if x not in ('you_do_model_answers','exit_ticket_and_answer')]
    if required:raise ValueError('Incomplete lesson fields: '+', '.join(required))
    if not lesson.exit_question:raise ValueError('Exit question absent')
    if 'you_do_model_answers' in lesson.missing:
        lesson.warnings.append('Original model solutions incomplete; teacher to supply before delivery')
    if not lesson.exit_answer:
        lesson.warnings.append('Exit answer unavailable: teacher to check')
    if 'Content does not fit' in first_reason:
        lesson.warnings.append('Long content automatically paginated over additional A4 pages')
    soup=BeautifulSoup((ROOT/f'lessons/h446/lesson-{n:03d}/index.html').read_text(encoding='utf-8'),'html.parser')
    pairs={};files=[];pages=None
    try:
        for mode in ('bw','colour'):
            # Flexible model calculates its actual page count before opening the PDF.
            # Use a safe temporary basename; final filenames contain the page count.
            temp=dest/f'H446_Lesson_{n:03d}_FLEX_{mode.upper()}_A4.pdf'
            files.append(temp)
            actual=make_pdf_flexible(lesson,soup,mode,temp)
            if pages is not None and pages!=actual:raise ValueError('Colour/B&W page-count mismatch')
            pages=actual
            a4=dest/f'H446_Lesson_{n:03d}_{pages}PAGE_REVIEW_{mode.upper()}_A4.pdf'
            a3=dest/f'H446_Lesson_{n:03d}_{pages}PAGE_REVIEW_{mode.upper()}_A3_Booklet.pdf'
            temp.replace(a4)
            files.extend((a4,a3))
            spreads=impose_a3(a4,a3)
            expected=((pages+3)//4)*2
            if spreads!=expected:raise ValueError('A3 imposition mismatch')
            for f,count in ((a4,pages),(a3,spreads)):
                if not f.is_file() or f.stat().st_size<10000:raise ValueError('Empty/small PDF')
                with fitz.open(f) as pdf:
                    if len(pdf)!=count:raise ValueError('Page-count mismatch')
                    if f==a4 and not all(len(p.get_text().strip())>=40 for p in pdf):raise ValueError('Blank page')
            pairs[mode]=(a4,a3)
    except Exception:
        for f in files:
            if f.is_file():f.unlink()
        raise
    warnings=list(dict.fromkeys(lesson.warnings+[
        'Teacher to audit diagrams, worked examples and exam syntax before delivering',
        'OCR guide comparison not automated']))
    entry={'title':lesson.title,'status':'draft_needs_teacher_content_review',
           'teacher_approved':False,'warnings':warnings,
           'a4_pages':pages,'a3_spreads':((pages+3)//4)*2,
           'print_bw':pairs['bw'][0].relative_to(ROOT).as_posix(),
           'learn_colour':pairs['colour'][0].relative_to(ROOT).as_posix(),
           'booklet_bw':pairs['bw'][1].relative_to(ROOT).as_posix(),
           'booklet_colour':pairs['colour'][1].relative_to(ROOT).as_posix()}
    return entry,{'title':lesson.title,'page_count':pages,'status':entry['status'],
                  'question_count':len(lesson.you_do),'visual_count':lesson.visual_count,
                  'warnings':warnings}

def main():
    folder=ROOT/'offline/booklets/h446'
    catalogue_file=ROOT/'offline/booklets/catalogue.json'
    cat=json.loads(catalogue_file.read_text())
    existing={str(n):cat['lessons']['h446'].get(str(n),{}).get('print_bw') for n in range(FIRST,LAST+1)}
    audit={'generated_utc':datetime.now(timezone.utc).isoformat(),
           'scope':[FIRST,LAST],'batch_size':5,'generated':[],'deferred':[],
           'batches':[],'teacher_approved':False}
    for start in range(FIRST,LAST+1,5):
        stop=min(start+4,LAST)
        b={'range':f'{start:03d}–{stop:03d}','generated':[],'deferred':[]}
        print('BATCH',b['range'],flush=True)
        for n in range(start,stop+1):
            try:
                try:entry,metadata=process_eight(n,folder)
                except Exception as exc:
                    if 'Assessment/feedback' in str(exc):
                        raise
                    entry,metadata=recover(n,folder,str(exc))
                cat['lessons']['h446'][str(n)]=entry
                b['generated'].append(n)
                audit['generated'].append({'lesson':n,**metadata})
                print(' GENERATED',n,entry['a4_pages'],'pages',flush=True)
            except Exception as exc:
                reason=f'{type(exc).__name__}: {exc}'
                b['deferred'].append(n)
                audit['deferred'].append({
                    'lesson':n,'reason':reason,'prior_print_link':existing.get(str(n)),
                    'retained_old_link':bool(existing.get(str(n)))})
                print(' DEFER',n,reason,flush=True)
        audit['batches'].append(b)
        (folder/'Y13_EIGHT_PAGE_BATCHES.json').write_text(
            json.dumps(audit,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    cat['counts']['h446_published_draft']=len(cat['lessons']['h446'])
    cat['counts']['pdf_files']=4*sum(map(len,cat['lessons'].values()))
    catalogue_file.write_text(json.dumps(cat,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    lines=['# H446 Year 13 — print booklet production report','',
           f'Production UTC: {audit["generated_utc"]}',
           f'Lesson range: {FIRST}–{LAST}; sequential groups of five.',
           '',
           f"**Generated and checked: {len(audit['generated'])}** of {LAST-FIRST+1} lesson slots.",
           f"**Deferred / protected: {len(audit['deferred'])}**",
           '',
           'All new resources are unapproved PRINT DRAFTS. Final teacher review is required.',
           '',
           '| Batch | Generated | Deferred |','|---|---:|---:|']
    for b in audit['batches']:
        lines.append(f"| {b['range']} | {len(b['generated'])} | {len(b['deferred'])} |")
    expanded=[x for x in audit['generated'] if x['page_count']>8]
    lines+=['','## Longer booklets', f'{len(expanded)} lessons needed additional pages to preserve original content.']
    for x in expanded:lines.append(f"- Lesson {x['lesson']:03d}: {x['page_count']} pages")
    lines+=['','## Deferred / assessment exclusions','']
    for x in audit['deferred']:
        lines.append(f"- Lesson {x['lesson']:03d}: {x['reason']}. Existing Print link retained where available.")
    lines+=['','## Quality and publication','',
      'Both A4 editions and both A3 booklet editions verified for page count and nonblank pupil content.',
      'Source-based Do Now, New Learning, I Do, We Do, You Do and Exit Ticket retained.',
      'No alterations to the original interactive lessons, revision guides or central navigation.',
      'Visuals are not automatically redrawn; diagram-dependent tasks need individual review.',
      'Generated does not mean teacher approved. Mark each booklet approved only after classroom review.',
      'See Y13_EIGHT_PAGE_BATCHES.json for machine-readable detail.']
    (folder/'Y13_PRINT_PRODUCTION_REPORT.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print(json.dumps({'generated':len(audit['generated']),'deferred':len(audit['deferred']),
      'expanded':len(expanded),'batches':len(audit['batches'])},indent=2),flush=True)

if __name__=='__main__':main()
