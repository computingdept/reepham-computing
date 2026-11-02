#!/usr/bin/env python3
"""Compact, integrated New Learning sheets for H446 Lesson 031.

Uses the live lesson's eleven ff-panel stages and selected authentic SVGs.
Keeps the wording with the relevant diagram instead of putting dense theory
on one page and visuals on separate pages.
"""
from pathlib import Path
import io,re,hashlib
from bs4 import BeautifulSoup
import fitz
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import simpleSplit
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from publish_h446_visual_pilot import png_bytes, label_of, ROOT, W, H

LEFT=48
RIGHT=W-48
BODY_WIDTH=W-96
TOP=H-128
BOTTOM=78
STAGE_GAP=12

def wrapped(text,font,size,width):
    result=[]
    for line in text.split('\n'):
        result.extend(simpleSplit(line,font,size,width) if line else [''])
    return result

def make_integrated_new_learning_031(mode,allowed_figures):
    """Return (PDF bytes, page count, number of images, source headings)."""
    path=ROOT/'lessons/h446/lesson-031/index.html'
    soup=BeautifulSoup(path.read_text(encoding='utf-8'),'html.parser')
    panels=soup.select('#new-learning .ff-panel')
    if len(panels)!=11:
        raise ValueError(f'Expected eleven classroom New Learning steps, got {len(panels)}')
    chosen={x['sha'] for x in allowed_figures if x['stage']=='new-learning'}
    cards=[];embedded=0
    for index,panel in enumerate(panels):
        heading=panel.find('h2')
        if heading is None:
            raise ValueError(f'Missing source title for panel {index}')
        heading=heading.get_text(' ',strip=True)
        texts=[]
        # Include source text from the active step, avoiding nested/duplicate narration.
        for p in panel.find_all('p'):
            if p.find_parent('svg'):continue
            txt=re.sub(r'\s+',' ',p.get_text(' ',strip=True))
            if txt:texts.append(txt)
        image_data=None
        figlabel=''
        for svg in panel.find_all('svg'):
            digest=hashlib.sha256(str(svg).encode()).hexdigest()[:14]
            if digest in chosen:
                image_data,_,ink=png_bytes(str(svg),mode)
                figlabel=label_of(svg)
                if ink<.002:raise ValueError(f'Nearly blank illustration: {heading}')
                embedded+=1
                break
        card={'heading':heading,'texts':texts,'image':image_data,'label':figlabel,'step':index+1}
        cards.append(card)
    if embedded!=len(chosen):
        raise ValueError(f'Could not match all source diagrams: {embedded}/{len(chosen)}')
    # Natural steps and source text are never truncated. Calculate actual height.
    for card in cards:
        card['headlines']=wrapped(f"{card['step']:02d}  {card['heading']}",'RHSV-Bold',10.9,BODY_WIDTH)
        card['paragraph_lines']=[wrapped(p,'RHSV',9.4,BODY_WIDTH) for p in card['texts']]
        card['label_lines']=wrapped(card['label'],'RHSV',8.0,BODY_WIDTH) if card['image'] else []
        if card['image']:
            import PIL.Image
            from PIL import Image
            img=Image.open(io.BytesIO(card['image']))
            ratio=img.height/img.width
            card['figure_width']=min(475.0,BODY_WIDTH)
            card['figure_height']=min(150.0,card['figure_width']*ratio)
            card['figure_width']=card['figure_height']/ratio
        else:
            card['figure_width']=0
            card['figure_height']=0
        card['height']=(len(card['headlines'])*15+5+
             sum(len(lines)*13.6+5 for lines in card['paragraph_lines'])+
             (card['figure_height']+5+len(card['label_lines'])*10.3+9 if card['image'] else 0)+
             STAGE_GAP)
    pages=[];group=[];height=0
    for card in cards:
        if card['height']>TOP-BOTTOM:
            raise ValueError(f'Source step too tall for one printed page: {card["step"]}')
        if group and height+card['height']>TOP-BOTTOM:
            pages.append(group);group=[];height=0
        group.append(card);height+=card['height']
    if group:pages.append(group)
    if len(pages)>7:
        raise ValueError(f'Integrated new learning still takes too many pages: {len(pages)}')
    output=io.BytesIO()
    c=canvas.Canvas(output,pagesize=A4,pageCompression=1)
    for page_number,group in enumerate(pages,1):
        accent=HexColor('#292929') if mode=='bw' else HexColor('#136347')
        c.setFillColor(accent);c.rect(0,H-11,W,11,fill=1,stroke=0)
        c.setFont('RHSV-Bold',9.1);c.drawString(LEFT,H-37,'RHS COMPUTING')
        c.setFont('RHSV',8.5);c.drawRightString(RIGHT,H-37,'H446  ·  LESSON 031  ·  REVIEW DRAFT')
        c.setStrokeColor(HexColor('#bac4bf'));c.line(LEFT,H-51,RIGHT,H-51)
        c.setFillColor(accent);c.setFont('RHSV-Bold',14.2)
        c.drawString(LEFT,H-82,'New Learning · D-type flip-flops')
        c.setFillColor(HexColor('#526359'));c.setFont('RHSV',8.8)
        c.drawString(LEFT,H-104,f'Original lesson explanations and diagrams · part {page_number} of {len(pages)}')
        y=TOP
        for card in group:
            c.setFillColor(accent);c.setFont('RHSV-Bold',10.9)
            for line in card['headlines']:
                c.drawString(LEFT,y,line);y-=15
            y-=5
            c.setFillColor(HexColor('#263630'));c.setFont('RHSV',9.4)
            for para in card['paragraph_lines']:
                for line in para:
                    c.drawString(LEFT,y,line);y-=13.6
                y-=5
            if card['image']:
                w=card['figure_width'];h=card['figure_height']
                x=(W-w)/2
                c.drawImage(ImageReader(io.BytesIO(card['image'])),x,y-h,w,h,
                            mask='auto',preserveAspectRatio=True)
                y-=h+5
                c.setFont('RHSV',8.0)
                for line in card['label_lines']:
                    c.drawString(LEFT,y,line);y-=10.3
                y-=9
            y-=STAGE_GAP
        if y<BOTTOM-2:
            raise ValueError(f'Printed New Learning page {page_number} overflows: {y}')
        c.setStrokeColor(HexColor('#b9c6be'));c.line(LEFT,49,RIGHT,49)
        c.setFont('RHSV',7.9);c.setFillColor(HexColor('#526359'))
        c.drawString(LEFT,34,'BLACK PEN: add annotations    GREEN PEN: correct explanations')
        c.showPage()
    c.save()
    data=output.getvalue()
    with fitz.open(stream=data,filetype='pdf') as doc:
        if len(doc)!=len(pages):raise ValueError('Page mismatch')
        full=' '.join(p.get_text() for p in doc)
        for card in cards:
            # The full source explanation must be present, line wraps allowed.
            for para in card['texts']:
                # Compare joined alphanumerics to avoid PDF hyphen and line breaks.
                needle=re.sub(r'\W+','',para)
                if len(needle)>35 and needle not in re.sub(r'\W+','',full):
                    raise ValueError(f'Lost source paragraph in printed {card["heading"]}')
        if sum(len(p.get_images(full=True)) for p in doc)!=embedded:
            raise ValueError('Image count mismatch')
    return data,len(pages),embedded,[c['heading'] for c in cards]
