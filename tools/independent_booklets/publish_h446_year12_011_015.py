#!/usr/bin/env python3
"""Source-grounded H446 Year 12 print booklet batch 011–015.

Reads ONLY existing classroom lesson HTML. Does not modify lessons, guides
or central navigation. Eight A4 pages per student draft, with separate pages
for retrieval, learning, modelling, guidance, practice and exit reflection.
Answer reveals in the You Do HTML are excluded from student questions.
"""
from pathlib import Path
import json, math, re, sys
from collections import Counter
from bs4 import BeautifulSoup
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import fitz

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
sys.path.insert(0,str(HERE))
from source_model import h446_source, clean
from render_pdf import impose_a3

FONT_FILE='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD_FILE='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
MONO_FILE='/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'
for f in (FONT_FILE,BOLD_FILE,MONO_FILE):
    if not Path(f).exists():raise FileNotFoundError(f)
pdfmetrics.registerFont(TTFont('RHS',FONT_FILE))
pdfmetrics.registerFont(TTFont('RHSBold',BOLD_FILE))
pdfmetrics.registerFont(TTFont('RHSMono',MONO_FILE))
A4W,A4H=A4
M=48
INK=HexColor('#23342D')
GREY=HexColor('#52675E')
LINE=HexColor('#C8D5CF')
NAVY=HexColor('#3B6380')
WHIT=HexColor('#FFFFFF')

def tone(mode):
    if mode=='bw':return {'accent':HexColor('#303030'),'light':HexColor('#F4F4F4')}
    return {'accent':HexColor('#0D624D'),'light':HexColor('#EDF5F0')}

def tidy(t):
    t=str(t or '').replace('\xa0',' ').replace('\u200b','')
    t=t.replace('\u2011','-').replace('\u00ad','').replace('\t','    ')
    t=t.replace('\u2022','•')
    return t.strip()

def obj(t,kind='body',rule=0):
    return dict(text=tidy(t),kind=kind,rule=rule)

def objectives(soup):
    return [clean(n.get_text(' ',strip=True)) for n in soup.select('#overview .objectives li')]

def new_learning(soup):
    out=[]
    ref=soup.select_one('#new-learning .nl-reference')
    if ref:
        title=ref.select_one('h2')
        details=[tidy(x.get_text('\n' if x.name=='pre' else ' ',strip=True)) for x in ref.select('pre,p,.nl-reference-note')]
        if title:out.append(obj(title.get_text(' ',strip=True),'sub'))
        out.extend(obj(x,'code' if re.fullmatch(r'[01 \n|½¼⅛−¹⁄₂₆₄]+',x or '') else 'body') for x in details if x)
    for node in soup.select('#new-learning .nl-stage'):
        title=node.select_one('h2')
        if title:out.append(obj(title.get_text(' ',strip=True),'sub'))
        for p in node.select('p'):
            if p.find_parent('.nl-stage-count'):continue
            val=clean(p.get_text(' ',strip=True))
            if val:out.append(obj(val,'body'))
    return out

def model(soup,lesson):
    out=[obj(lesson.model_question,'sub')]
    steps=soup.select('#i-do .ido-step')
    if steps:
        for step in steps:
            heading=step.select_one('h2')
            if heading:out.append(obj(heading.get_text(' ',strip=True),'sub'))
            content=step.select('pre,p')
            for el in content:
                if el.find_parent('.ido-step-count'):continue
                value=tidy(el.get_text('\n' if el.name=='pre' else ' ',strip=True))
                if value:out.append(obj(value,'code' if el.name=='pre' else 'body'))
    else:
        for item in lesson.model_steps:out.append(obj(item,'body'))
    return out

def guided(soup):
    out=[]
    for node in soup.select('#we-do .wedo-example'):
        ref=node.select_one('.wedo-reference')
        if not ref:continue
        title=ref.select_one('h2')
        description=[clean(p.get_text(' ',strip=True)) for p in ref.select('p')]
        titleval=clean(title.get_text(' ',strip=True)) if title else 'Guided practice'
        textval=' '.join(description)
        step=node.select_one('.wedo-step:not([hidden])')
        code=step.select_one('pre') if step else None
        out.append((titleval,textval,tidy(code.get_text('\n',strip=True)) if code else ''))
    return out

def choices(lesson):
    out=[]
    for q,_ in lesson.you_do:
        val=tidy(q)
        # Remove non-question classroom instructions; preserve the task itself.
        val=re.sub(r'(?im)^Open \.NET Fiddle\s*→\s*','',val)
        if val:out.append(val)
    return out

def split_lines(text,font,fs,width):
    pieces=[]
    for raw in str(text).split('\n'):
        if raw=='':
            pieces.append('')
        elif font=='RHSMono':
            # Wrap long code lines rather than clipping at the right margin.
            maxchars=max(24,int(width/(pdfmetrics.stringWidth('M',font,fs))))
            while len(raw)>maxchars:
                pieces.append(raw[:maxchars]);raw='  '+raw[maxchars:]
            pieces.append(raw)
        else:
            pieces.extend(simpleSplit(raw,font,fs,width) or [''])
    return pieces

def write_lines(c,lines,y,font,fs,leading,color,accent):
    c.setFillColor(color);c.setFont(font,fs)
    for line in lines:
        if line:c.drawString(M,y,line)
        y-=leading
    return y

def dims(items,scale=1):
    y=0.0
    for a in items:
        kind=a['kind']
        if kind=='sub':fs=10.4*scale;leading=15*scale;font='RHSBold';gap=10*scale
        elif kind=='code':fs=8.25*scale;leading=12*scale;font='RHSMono';gap=10*scale
        elif kind=='note':fs=9.2*scale;leading=14*scale;font='RHS';gap=12*scale
        elif kind=='prompt':fs=10.15*scale;leading=15.5*scale;font='RHSBold';gap=7*scale
        else:fs=9.65*scale;leading=15*scale;font='RHS';gap=9*scale
        lines=split_lines(a['text'],font,fs,A4W-2*M)
        y+=len(lines)*leading+gap+a['rule']*19*scale
    return y

def render_items(c,items,y,palette,maxheight=None,scale=1):
    if maxheight:
        # Scale whitespace first, then text. Do not silently drop source content.
        needed=dims(items,scale)
        while needed>maxheight and scale>0.88:
            scale=round(scale-.025,3);needed=dims(items,scale)
        if needed>maxheight:
            raise ValueError(f'Content does not fit A4 page ({needed:.0f}pt > {maxheight:.0f}pt).')
    for a in items:
        k=a['kind'];color=INK
        if k=='sub':fs=10.4*scale;leading=15*scale;font='RHSBold';gap=10*scale;color=palette['accent']
        elif k=='code':fs=8.25*scale;leading=12*scale;font='RHSMono';gap=10*scale
        elif k=='note':fs=9.2*scale;leading=14*scale;font='RHS';gap=12*scale;color=GREY
        elif k=='prompt':fs=10.15*scale;leading=15.5*scale;font='RHSBold';gap=7*scale
        else:fs=9.65*scale;leading=15*scale;font='RHS';gap=9*scale
        y=write_lines(c,split_lines(a['text'],font,fs,A4W-2*M),y,font,fs,leading,color,palette['accent'])-gap
        if a['rule']:
            c.setStrokeColor(LINE);c.setLineWidth(.6)
            for i in range(a['rule']):
                yy=y-i*19*scale
                c.line(M,yy,A4W-M,yy)
            y-=a['rule']*19*scale
    return y

def begin(c,lesson,number,stage,title,mode):
    palette=tone(mode)
    c.setFillColor(palette['accent']);c.rect(0,A4H-10,A4W,10,stroke=0,fill=1)
    c.setFillColor(palette['accent']);c.setFont('RHSBold',9.2)
    c.drawString(M,A4H-34,'RHS COMPUTING')
    c.setFillColor(GREY);c.setFont('RHS',8.3)
    c.drawRightString(A4W-M,A4H-34,f'OCR H446 · LESSON {lesson.number:03d} · DRAFT')
    c.setStrokeColor(LINE);c.line(M,A4H-49,A4W-M,A4H-49)
    c.setFillColor(palette['accent']);c.setFont('RHSBold',9.2);c.drawString(M,A4H-72,stage.upper())
    c.setFont('RHSBold',17.3);c.drawString(M,A4H-99,tidy(title)[:58])
    c.setStrokeColor(LINE);c.line(M,48,A4W-M,48)
    c.setFont('RHS',7.8);c.setFillColor(GREY)
    c.drawString(M,33,'BLACK PEN · complete your work    GREEN PEN · check, correct and explain')
    c.drawRightString(A4W-M,33,f'{number} / 8')
    return A4H-127,palette

def page_end(c,y,n):
    if y<57:raise ValueError(f'Lesson page {n}: content overlaps footer at y={y:.0f}')
    c.showPage()

def make_pdf(lesson,soup,mode,outfile):
    c=canvas.Canvas(str(outfile),pagesize=A4,pageCompression=1)
    c.setTitle(f'H446 Lesson {lesson.number:03d}: {lesson.title} — eight-page reviewed draft')
    c.setAuthor('RHS Computing')
    l=lesson.number
    # 1 — retrieval. Exactly four authentic source questions.
    y,p=begin(c,lesson,1,'Do Now — Recall',lesson.title,mode)
    c.setFont('RHS',9);c.setFillColor(GREY)
    c.drawString(M,y,'Name: ______________________________    Class: __________    Date: __________')
    y-=30
    items=[]
    for i,(q,a) in enumerate(lesson.do_now,1):
        items.extend([obj(f'{i}. {q}','prompt',rule=3)])
    y=render_items(c,items,y,p,maxheight=y-60)
    page_end(c,y,1)

    # 2 — separate retrieval answers, objectives, glossary.
    y,p=begin(c,lesson,2,'Do Now — Check / Objectives','Correct and improve',mode)
    items=[obj('Check page 1 in GREEN PEN. Write corrections in full.','note')]
    for i,(q,a) in enumerate(lesson.do_now,1):
        items.extend([obj(f'{i}. Model answer','sub'),obj(a,'body')])
    goals=objectives(soup)
    if goals:
        items.append(obj('By the end, you can…','sub'))
        items.extend(obj('• '+a,'body') for a in goals[:4])
    if lesson.vocab:
        items.append(obj('Vocabulary — know these terms','sub'))
        items.extend(obj(f'{t} — {d}','body') for t,d in lesson.vocab[:8])
    y=render_items(c,items,y,p,maxheight=y-62)
    page_end(c,y,2)

    # 3 — explicitly source-grounded small steps.
    y,p=begin(c,lesson,3,'New Learning','Read, annotate and explain',mode)
    items=new_learning(soup)
    items.append(obj('Explain one step in your own words, using the correct technical terms.','prompt',rule=5))
    y=render_items(c,items,y,p,maxheight=y-60)
    page_end(c,y,3)

    # 4 — full I Do steps.
    y,p=begin(c,lesson,4,'I Do — Worked example','Follow the worked method',mode)
    items=model(soup,lesson)
    items.append(obj('Repeat the method with different inputs in your notebook. Check every intermediate value.','note'))
    y=render_items(c,items,y,p,maxheight=y-60)
    page_end(c,y,4)

    # 5 — guided practice: real prompts and optional starter code, no reveal.
    y,p=begin(c,lesson,5,'We Do — Guided practice','Try → Discuss → Improve',mode)
    cases=guided(soup)
    items=[]
    for i,(title,desc,code) in enumerate(cases,1):
        items.append(obj(f'{i}. {title}','prompt'))
        if desc:items.append(obj(desc,'body'))
        if code:items.append(obj(code,'code'))
        items.append(obj('Method / working:','note',rule=2 if len(cases)>=5 else 3))
    y=render_items(c,items,y,p,maxheight=y-60)
    page_end(c,y,5)

    # 6+7 — exact original independent questions, without source answer reveals.
    qs=choices(lesson)
    if len(qs)<3:raise ValueError(f'Lesson {l}: insufficient original You Do questions ({len(qs)})')
    middle=(len(qs)+1)//2
    for pn,group,start in [(6,qs[:middle],0),(7,qs[middle:],middle)]:
        y,p=begin(c,lesson,pn,'You Do — Independent practice',
                   'Questions · Part 1' if pn==6 else 'Questions · Part 2',mode)
        items=[obj('Answer independently. Show code, calculations, a trace or justified reasoning as appropriate.','note')]
        lines=6 if len(group)<=2 else 4
        for j,q in enumerate(group,start+1):
            items.append(obj(f'Question {j}','sub'))
            items.append(obj(q,'body',rule=lines))
        y=render_items(c,items,y,p,maxheight=y-60)
        page_end(c,y,pn)

    # 8 — original exit ticket, student reflection and correction.
    y,p=begin(c,lesson,8,'Exit Ticket / Reflection','Check your understanding',mode)
    items=[
      obj('Complete the actual lesson Exit Ticket before checking the answer.','note'),
      obj(lesson.exit_question,'prompt',rule=4),
      obj('How confident are you? Circle one:  Confident / Getting there / Need help','prompt'),
      obj('Explain your choice, identifying one concept you can now use independently.','body',rule=3),
      obj('GREEN PEN — Correct and explain','sub'),
      obj('Choose one mistake from your independent work. Write the correct method and explain precisely why your original answer was wrong.','body',rule=7),
      obj('Next step: revisit the model or a relevant revision-guide section if needed.','note'),
    ]
    y=render_items(c,items,y,p,maxheight=y-60)
    page_end(c,y,8)
    c.save()
    with fitz.open(str(outfile)) as doc:
        if len(doc)!=8:raise ValueError(f'{outfile} created {len(doc)} pages')
        text='\n'.join(page.get_text() for page in doc)
        for term in ('Do Now','I Do','We Do','You Do','Exit Ticket','BLACK PEN','GREEN PEN'):
            if term.casefold() not in text.casefold():raise ValueError(f'Missing {term} from {outfile}')
        for i,page in enumerate(doc):
            if len(page.get_text().strip())<40:raise ValueError(f'Near blank page {i+1}')
            if abs(page.rect.width-A4W)>1 or abs(page.rect.height-A4H)>1:raise ValueError('Not A4')
    return outfile

def run():
    dest=ROOT/'offline/booklets/h446'
    dest.mkdir(parents=True,exist_ok=True)
    catalogue_path=ROOT/'offline/booklets/catalogue.json'
    catalogue=json.loads(catalogue_path.read_text(encoding='utf-8'))
    meta={}
    for n in range(11,16):
        lesson=h446_source(n)
        outstanding=[x for x in lesson.missing if x!='exit_ticket_and_answer' or not lesson.exit_question]
        if lesson.is_assessment or outstanding:
            raise ValueError(f'Lesson {n} cannot publish: {outstanding} {lesson.warnings}')
        if 'exit_ticket_and_answer' in lesson.missing:
            lesson.warnings.append('Exit model answer unavailable in the source; teacher check required')
        soup=BeautifulSoup((ROOT/f'lessons/h446/lesson-{n:03d}/index.html').read_text(encoding='utf-8'),'html.parser')
        variants={}
        for mode in ('bw','colour'):
            a4=dest/f'H446_Lesson_{n:03d}_8PAGE_REVIEW_{mode.upper()}_A4.pdf'
            a3=dest/f'H446_Lesson_{n:03d}_8PAGE_REVIEW_{mode.upper()}_A3_Booklet.pdf'
            make_pdf(lesson,soup,mode,a4)
            spread=impose_a3(a4,a3)
            if spread!=4:raise ValueError(f'{n}: expected 4 A3 spread pages, got {spread}')
            variants[mode]=(a4,a3)
        # Publish only source-grounded, page-verified student drafts.
        entry=catalogue['lessons']['h446'].get(str(n),{})
        entry.update({
          'title':lesson.title,
          'status':'draft_needs_teacher_content_review' if lesson.visual_count else 'draft_ready_for_teacher_audit',
          'teacher_approved':False,
          'warnings':list(dict.fromkeys(lesson.warnings+['Source-grounded eight-page layout; teacher to approve diagrams/code before classroom issue'])),
          'a4_pages':8,'a3_spreads':4,
          'print_bw':variants['bw'][0].relative_to(ROOT).as_posix(),
          'learn_colour':variants['colour'][0].relative_to(ROOT).as_posix(),
          'booklet_bw':variants['bw'][1].relative_to(ROOT).as_posix(),
          'booklet_colour':variants['colour'][1].relative_to(ROOT).as_posix(),
        })
        catalogue['lessons']['h446'][str(n)]=entry
        meta[str(n)]={'title':lesson.title,'pages':8,'diagram_count':lesson.visual_count,
                      'questions':len(lesson.you_do),'do_now':len(lesson.do_now),
                      'files':[str(x) for v in variants.values() for x in v]}
    catalogue['counts']['h446_published_draft']=len(catalogue['lessons']['h446'])
    catalogue['counts']['pdf_files']=sum(4*len(x) for x in catalogue['lessons'].values())
    catalogue_path.write_text(json.dumps(catalogue,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    (dest/'H446_011_015_BATCH_AUDIT.json').write_text(json.dumps(meta,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    print(json.dumps(meta,indent=2,ensure_ascii=False))

if __name__=='__main__':
    run()
