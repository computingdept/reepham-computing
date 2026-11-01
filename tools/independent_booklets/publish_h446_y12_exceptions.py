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


from publish_h446_year12_011_015 import (
    begin,page_end,render_items,obj,objectives,new_learning,model,guided,choices,dims,split_lines
)
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

def split_overlong_item(item,capacity=575):
    """Split a source paragraph when it cannot fit even with adjusted spacing."""
    text=item['text']
    tokens=text.split(' ') if '\n' not in text else text.split('\n')
    separator=' ' if '\n' not in text else '\n'
    parts=[]
    current=''
    for token in tokens:
        candidate=(current+separator+token).lstrip(separator) if current else token
        test=obj(candidate,item['kind'])
        if dims([test],.90,.48)>capacity and current:
            parts.append(obj(current,item['kind']))
            current=token
        else:
            current=candidate
    if current:parts.append(obj(current,item['kind']))
    if not parts:raise ValueError('Could not divide source paragraph')
    parts[-1]['rule']=item['rule']
    return parts

def divide_into_pages(items,available):
    """Greedy pagination at natural block boundaries; no dropped lesson text."""
    queue=list(items)
    pages=[]
    while queue:
        chunk=[]
        while queue:
            item=queue[0]
            if dims(chunk+[item],.90,.48)<=available:
                chunk.append(queue.pop(0))
            else:
                if chunk:break
                queue=split_overlong_item(queue.pop(0),available-15)+queue
                # If the single item still cannot fit, this is a genuine error.
                if dims([queue[0]],.90,.48)>available:
                    raise ValueError('A source block could not be paginated')
        if not chunk:raise ValueError('Pagination produced an empty page')
        pages.append(chunk)
    return pages

def make_pdf_flexible(lesson,soup,mode,outfile):
    """Eight pages normally; additional A4 sheets only where complete content requires them."""
    pages=[]
    # A page descriptor is (stage, title, blocks, name_line).
    def add(stage,title,blocks,name_line=False):
        allowance=625 if name_line else 655
        for i,chunk in enumerate(divide_into_pages(blocks,allowance)):
            label=title if i==0 else title+' · continued'
            pages.append((stage,label,chunk,name_line and i==0))
    add('Do Now — Recall',lesson.title,[obj(f'{i}. {q}','prompt',3)
            for i,(q,_) in enumerate(lesson.do_now,1)],True)
    checks=[obj('Check page 1 in GREEN PEN. Write corrections in full.','note')]
    for i,(_,a) in enumerate(lesson.do_now,1):
        checks.extend((obj(f'{i}. Model answer','sub'),obj(a,'body')))
    goals=objectives(soup)
    if goals:
        checks.append(obj('By the end, you can…','sub'))
        checks.extend(obj('• '+g,'body') for g in goals[:4])
    if lesson.vocab:
        checks.append(obj('Vocabulary — know these terms','sub'))
        checks.extend(obj(f'{t} — {d}','body') for t,d in lesson.vocab[:8])
    add('Do Now — Check / Objectives','Correct and improve',checks)
    learning=new_learning(soup)+[obj(
         'Explain one step in your own words, using the correct technical terms.','prompt',5)]
    add('New Learning','Read, annotate and explain',learning)
    add('I Do — Worked example','Follow the worked method',model(soup,lesson))
    group=guided(soup);g=[]
    for i,(title,desc,code) in enumerate(group,1):
        g.append(obj(f'{i}. {title}','prompt'))
        if desc:g.append(obj(desc,'body'))
        if code:g.append(obj(code,'code'))
        g.append(obj('Method / working:','note',2 if len(group)>=5 else 3))
    add('We Do — Guided practice','Try, discuss and improve',g)
    qs=choices(lesson)
    if len(qs)<3:raise ValueError('Not enough You Do source questions')
    mid=(len(qs)+1)//2
    for ix,group in enumerate((qs[:mid],qs[mid:])):
        blocks=[obj('Answer independently. Show code, calculations or a justified explanation.','note')]
        for qn,q in enumerate(group,1+ix*mid):
            blocks.extend((obj(f'Question {qn}','sub'),obj(q,'body',6 if len(group)<=2 else 4)))
        add('You Do — Independent practice',f'Questions · Part {ix+1}',blocks)
    add('Exit Ticket / Reflection','Check your understanding',[
        obj('Complete the actual lesson Exit Ticket before checking.','note'),
        obj(lesson.exit_question,'prompt',4),
        obj('Circle: Confident / Getting there / Need help','prompt'),
        obj('Explain what you can now do independently.','body',3),
        obj('GREEN PEN — Correct and explain','sub'),
        obj('Choose one error. Write the correct method and explain precisely why your first response was wrong.','body',7)])
    # No arbitrary page limit, but flag extreme cases for teacher inspection.
    if len(pages)>16:raise ValueError(f'{len(pages)} sheets would be excessive; manual page design required')
    c=canvas.Canvas(str(outfile),pagesize=A4,pageCompression=1)
    c.setTitle(f'H446 Lesson {lesson.number:03d}: {lesson.title} — {len(pages)}-page print draft')
    for i,(stage,title,items,nameline) in enumerate(pages,1):
        y,palette=begin(c,lesson,i,stage,title,mode,len(pages))
        if nameline:
            c.setFillColor(palette['accent']);c.setFont('RHS',9)
            from publish_h446_year12_011_015 import M
            c.drawString(M,y,'Name: __________________________  Class: _________  Date: _________')
            y-=30
        y=render_items(c,items,y,palette,maxheight=y-60)
        page_end(c,y,i)
    c.save()
    with fitz.open(outfile) as doc:
        if len(doc)!=len(pages):raise ValueError('PDF page count mismatch')
        for page in doc:
            if len(page.get_text().strip())<40:raise ValueError('Blank or clipped PDF page')
    return len(pages)

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
            pages=None
            a3pages=None
            variants={}
            for mode in ('bw','colour'):
                base_name=f'H446_Lesson_{n:03d}_{pages}PAGE_REVIEW_{mode.upper()}'
                a4=base/(base_name+'_A4.pdf')
                a3=base/(base_name+'_A3_Booklet.pdf')
                files.extend((a4,a3))
                built=make_pdf_flexible(lesson,soup,mode,a4)
                if pages is None:
                    pages=built
                    a3pages=((pages+3)//4)*2
                elif built!=pages:raise ValueError('Colour/B&W page counts differ')
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
