#!/usr/bin/env python3
"""Integrated lesson-source New Learning for H446 026 (gates) / 030 (adders).

Compose print pages from the actual teaching stage text and its original SVG,
keeping diagrams close to their explanations without altering class lessons.
No independent questions or model-answer pages are modified.
"""
from pathlib import Path
import io,hashlib,re
from bs4 import BeautifulSoup
import fitz
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import simpleSplit,ImageReader
from publish_h446_visual_pilot import ROOT,png_bytes,label_of

W,H=A4
LEFT=48
WIDTH=W-96
TOP=H-126
BOTTOM=76
PANEL_GAP=12

def lines(text,font,size):
    out=[]
    for para in str(text).split('\n'):
        out.extend(simpleSplit(para,font,size,WIDTH) if para else [''])
    return out

def stage_cards(n,soup,diagrams,mode):
    new=soup.select_one('#new-learning')
    if new is None:raise ValueError('Missing New Learning')
    nodes=new.select('.nl-explanation .nl-stage') if n==26 else new.select('.nl-reference .adder-reveal-panel')
    required=7 if n==26 else 9
    if len(nodes)!=required:raise ValueError(f'Expected {required} New Learning stages; found {len(nodes)}')
    known={x['sha'] for x in diagrams if x['stage']=='new-learning'}
    found=set()
    cards=[]
    if n==26:
        ref=new.select_one('.nl-reference')
        if ref is None:raise ValueError('Missing introductory reference')
        heading=ref.select_one('h2')
        paras=[p.get_text(' ',strip=True) for p in ref.select('p')]
        key=ref.select('.logic-key > div')
        paras+=['; '.join(x.get_text(' ',strip=True) for x in key)]
        note=ref.select_one('.nl-reference-note')
        if note:paras.append(note.get_text(' ',strip=True))
        cards.append({'heading':heading.get_text(' ',strip=True) if heading else 'Logic gates',
                      'paragraphs':paras,'number':0,'image':None,'label':''})
    for index,node in enumerate(nodes,1):
        h=node.select_one('h2')
        if h is None:raise ValueError(f'Missing title for stage {index}')
        para=[]
        for p in node.select('p'):
            if p.find_parent('svg'):continue
            t=p.get_text(' ',strip=True)
            if t:para.append(t)
        # Preserve non-P visual teaching content: truth-table rows and
        # the starter binary-addition equations.
        equation=node.select_one('.adder-big-equation')
        if equation:
            para.append('Binary sums: '+equation.get_text('; ',strip=True))
        for table in node.select('table'):
            for tr in table.select('tr'):
                vals=[c.get_text(' ',strip=True) for c in tr.select('th,td')]
                if vals:para.append('  |  '.join(vals))
        icon=None;caption=''
        for svg in node.select('svg'):
            digest=hashlib.sha256(str(svg).encode()).hexdigest()[:14]
            if digest in known:
                icon=svg
                caption=label_of(svg)
                found.add(digest)
                break
        cards.append({'heading':h.get_text(' ',strip=True),'paragraphs':para,
                      'number':index,'image':icon,'label':caption})
    if found!=known:raise ValueError(f'Unmatched source images: {sorted(known-found)}')
    for card in cards:
        card['heading_lines']=lines((str(card['number']).zfill(2)+' · ' if card['number'] else '')+card['heading'],
                                     'RHSV-Bold',10.8)
        card['body_lines']=[lines(p,'RHSV',9.15) for p in card['paragraphs']]
        if card['image'] is not None:
            raw,pixels,ink=png_bytes(str(card['image']),mode)
            if ink<.002:raise ValueError(f'Blank SVG: {card["heading"]}')
            card['image_data']=raw
            ratio=pixels[1]/pixels[0]
            card['image_height']=min(142,WIDTH*ratio)
            card['image_width']=card['image_height']/ratio
            card['caption_lines']=lines(caption,'RHSV',7.8)
        else:
            card['image_data']=None
            card['image_height']=0
            card['image_width']=0
            card['caption_lines']=[]
        card['required_height']=(
          15*len(card['heading_lines'])+5+
          sum(len(ls)*13.1+4 for ls in card['body_lines'])+
          (card['image_height']+6+len(card['caption_lines'])*10.5+7
               if card['image_data'] else 0)+PANEL_GAP)
    return cards,len(known)

def make_integrated_learning(n,mode,diagrams):
    if n not in (26,30):raise ValueError('Supported lesson 026 or 030')
    src=ROOT/f'lessons/h446/lesson-{n:03d}/index.html'
    soup=BeautifulSoup(src.read_text(encoding='utf-8'),'html.parser')
    cards,count=stage_cards(n,soup,diagrams,mode)
    groups=[];current=[];occupied=0
    for card in cards:
        if card['required_height']>TOP-BOTTOM:
            raise ValueError(f'Cannot print stage intact: {card["heading"]}')
        if current and occupied+card['required_height']>TOP-BOTTOM:
            groups.append(current);current=[];occupied=0
        current.append(card);occupied+=card['required_height']
    if current:groups.append(current)
    if len(groups)>6:raise ValueError(f'Too many New Learning pages: {len(groups)}')
    result=io.BytesIO()
    pdf=canvas.Canvas(result,pagesize=A4,pageCompression=1)
    for pg,items in enumerate(groups,1):
        accent=HexColor('#262626') if mode=='bw' else HexColor('#126749')
        pdf.setFillColor(accent)
        pdf.rect(0,H-11,W,11,stroke=0,fill=1)
        pdf.setFont('RHSV-Bold',9.1)
        pdf.drawString(LEFT,H-36,'RHS COMPUTING')
        pdf.setFont('RHSV',8.5)
        pdf.drawRightString(W-LEFT,H-36,f'OCR H446 · LESSON {n:03d} · PRINT DRAFT')
        pdf.setStrokeColor(HexColor('#bbc6bf'))
        pdf.line(LEFT,H-50,W-LEFT,H-50)
        pdf.setFillColor(accent)
        pdf.setFont('RHSV-Bold',14.2)
        pdf.drawString(LEFT,H-79,'New Learning · '+ ('Boolean logic gates' if n==26 else 'Half and full adders'))
        pdf.setFillColor(HexColor('#526359'))
        pdf.setFont('RHSV',8.6)
        pdf.drawString(LEFT,H-99,f'Original explanation and illustration · part {pg} of {len(groups)}')
        y=TOP
        for card in items:
            pdf.setFillColor(accent)
            pdf.setFont('RHSV-Bold',10.8)
            for line in card['heading_lines']:
                pdf.drawString(LEFT,y,line);y-=15
            y-=5
            pdf.setFillColor(HexColor('#263630'))
            pdf.setFont('RHSV',9.15)
            for ls in card['body_lines']:
                for line in ls:
                    pdf.drawString(LEFT,y,line);y-=13.1
                y-=4
            if card['image_data']:
                width,height=card['image_width'],card['image_height']
                pdf.drawImage(ImageReader(io.BytesIO(card['image_data'])),(W-width)/2,y-height,width,height,
                              mask='auto',preserveAspectRatio=True)
                y-=height+6
                pdf.setFont('RHSV',7.8)
                for line in card['caption_lines']:
                    pdf.drawString(LEFT,y,line);y-=10.5
                y-=7
            y-=PANEL_GAP
        if y<BOTTOM-2:raise ValueError(f'Page {pg} extends too low: {y:.1f}')
        pdf.setStrokeColor(HexColor('#bbc6bf'))
        pdf.line(LEFT,49,W-LEFT,49)
        pdf.setFont('RHSV',8)
        pdf.setFillColor(HexColor('#526359'))
        pdf.drawString(LEFT,33,'BLACK PEN: complete work    GREEN PEN: check and improve')
        pdf.showPage()
    pdf.save()
    with fitz.open(stream=result.getvalue(),filetype='pdf') as doc:
        if len(doc)!=len(groups):raise ValueError('Page count mismatch')
        if sum(len(p.get_images(full=True)) for p in doc)!=count:raise ValueError('Original SVG count mismatch')
        # Every genuine explanation must appear in the PDF.
        printed=re.sub(r'\W+','', ''.join(page.get_text() for page in doc))
        for c in cards:
            for para in c['paragraphs']:
                needle=re.sub(r'\W+','',para)
                # Glyphs from source text may be rendered inconsistently
                # in different PDF readers; check long prose explicitly.
                if len(needle)>55 and needle not in printed:
                    raise ValueError('Missing source explanation in '+c['heading']+': '+para[:55])
    return result.getvalue(),len(groups),count,[x['heading'] for x in cards]
