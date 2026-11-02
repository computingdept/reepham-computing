#!/usr/bin/env python3
"""H446 visual-print pilot: source-faithful instructional SVGs beside their lesson stages.

Never edit classroom lessons, revision guides or the existing print PDFs. Build
replacement print drafts for 020 / 026 / 030 / 031 / 181 by inserting visual
explanation pages immediately AFTER the corresponding New Learning, I Do, We Do
page in the existing student booklet. Use the real inline SVG and its accessible
description, without inventing diagrams or model answers.
"""
from __future__ import annotations
from pathlib import Path
from collections import defaultdict
import io, json, re, hashlib, sys
from bs4 import BeautifulSoup
import cairosvg
from PIL import Image, ImageOps, ImageEnhance, ImageStat
import fitz
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader, simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
OUT=ROOT/'offline/booklets/h446'
CATALOGUE=ROOT/'offline/booklets/catalogue.json'
sys.path.insert(0,str(HERE))
from render_pdf import impose_a3

LESSONS=(20,26,30,31,181)
STAGES=(('new-learning',2,'New Learning'),('i-do',3,'I Do'),('we-do',4,'We Do'))
# The pilot includes representative, nonduplicate instructional figures.
# Lesson 031 uses a deliberate core subset; other 031 SVGs stay on the audit queue.
# Lesson 031 now includes both I Do worked diagrams (indices 11 and 12).
# Source uses a JS-controlled timing sequence for some other SVGs.
SELECT={20:None,26:None,30:None,31:[0,1,2,3,4,5,10,11,12,13],181:None}
FONT_REG='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
FONT_BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
pdfmetrics.registerFont(TTFont('RHSV',FONT_REG))
pdfmetrics.registerFont(TTFont('RHSV-Bold',FONT_BOLD))
W,H=A4
PAGE_LEFT=49
TEXTWIDTH=W-98

def label_of(node):
    label=node.get('aria-label') or node.get('alt')
    if not label:
        p=node.find_parent('figure')
        if p:
            cap=p.select_one('figcaption')
            if cap:label=cap.get_text(' ',strip=True)
    if not label:
        title=node.find('title')
        if title:label=title.get_text(' ',strip=True)
    return re.sub(r'\s+',' ',label or '').strip() or 'Instructional diagram from the classroom lesson'

def context_of(node, stage):
    # Heading and short source explanation from the same card/reveal stage.
    classes=['nl-stage','nl-reference','ff-panel','adder-reveal-panel',
             'ido-reference','ido-step','ido-example','wedo-example',
             'wedo-step','algorithm-panel','nl-explanation','lesson-concept']
    found=None
    for par in node.parents:
        if getattr(par,'name',None) in ('section','body'):break
        cls=par.get('class',[])
        if any(c in cls for c in classes):
            found=par
            break
    if found is None:found=node.find_parent('figure') or node.parent
    head=found.find(['h2','h3']) if found else None
    p=found.find('p') if found else None
    heading=head.get_text(' ',strip=True) if head else stage
    blurb=p.get_text(' ',strip=True) if p else ''
    return re.sub(r'\s+',' ',heading).strip()[:110], re.sub(r'\s+',' ',blurb).strip()[:200]

def source_diagrams(n):
    html=(ROOT/f'lessons/h446/lesson-{n:03d}/index.html').read_text(encoding='utf-8')
    soup=BeautifulSoup(html,'html.parser')
    diagrams=[]
    seen=set()
    for section_id,index,display in STAGES:
        section=soup.select_one('#'+section_id)
        if not section:continue
        for svg in section.select('svg'):
            # Some classroom diagrams are drawn by JavaScript at runtime.
            # An empty <svg> placeholder cannot be safely restored from HTML.
            if not svg.select('path,rect,line,circle,ellipse,polygon,polyline,text,use'):
                continue
            raw=str(svg)
            identity=hashlib.sha256(raw.encode()).hexdigest()
            if identity in seen:continue
            seen.add(identity)
            h,description=context_of(svg,display)
            diagrams.append(dict(stage=section_id,base_page=index,
                label=label_of(svg),heading=h,explanation=description,
                svg=raw,sha=identity[:14]))
    if SELECT[n] is not None:
        diagrams=[diagrams[i] for i in SELECT[n] if i<len(diagrams)]
    return diagrams

def png_bytes(svg_text,mode):
    soup=BeautifulSoup(svg_text,'xml')
    svg=soup.find('svg')
    if svg is None:raise ValueError('Invalid SVG')
    # BeautifulSoup's HTML parser lowercases SVG viewBox to viewbox.
    # Restore the case-sensitive SVG attribute and set explicit dimensions.
    view=svg.get('viewBox') or svg.get('viewbox')
    if view:
        vals=re.split(r'[ ,]+',view.strip())
        if len(vals)==4:
            svg['viewBox']=' '.join(vals)
            svg['width']=str(max(1,float(vals[2])))
            svg['height']=str(max(1,float(vals[3])))
        if svg.has_attr('viewbox'):del svg['viewbox']
    if not svg.get('width') or not svg.get('height'):
        raise ValueError('Original SVG lacks a usable viewBox and dimensions')
    if not svg.get('xmlns'):svg['xmlns']='http://www.w3.org/2000/svg'
    # Browser responsive styles (height:auto, max-height:48vh) can reduce
    # an otherwise valid print render to a 0-height blank SVG in Cairo.
    # Explicit viewBox-derived dimensions remain authoritative.
    if svg.has_attr('style'):del svg['style']
    for bad in svg.find_all(['script','foreignObject']):
        bad.decompose()
    # The gate lessons define their stroke classes in classroom CSS. Supply
    # print-safe versions so paths are visible even without a browser.
    style=soup.new_tag('style')
    style.string=(
       '.wire {fill:none; stroke:#182523; stroke-width:3.3;} '
       '.gate-body {fill:#ffffff; stroke:#182523; stroke-width:3.3;} '
       '.gate-text {fill:#182523; font-family:DejaVu Sans; font-size:17px; font-weight:700;} '
       '.nac-stroke {stroke:#182523; stroke-width:2.8;} '
       '.logic-svg text {fill:#182523;} '
       'svg {color:#1d2724;}'
    )
    svg.insert(0,style)
    raw=str(svg).replace('currentColor','#1d2724')
    data=cairosvg.svg2png(bytestring=raw.encode('utf-8'),output_width=1100)
    im=Image.open(io.BytesIO(data)).convert('RGBA')
    bg=Image.new('RGB',im.size,'white')
    bg.paste(im,mask=im.getchannel('A'))
    if mode=='bw':
        bg=ImageOps.grayscale(bg)
        bg=ImageOps.autocontrast(bg,cutoff=1)
        bg=ImageEnhance.Contrast(bg).enhance(1.25)
        bg=bg.convert('RGB')
    # Fail, rather than publishing a blank or near-empty diagram.
    import numpy as np
    grey=np.asarray(ImageOps.grayscale(bg))
    ink=(grey<225).sum()/grey.size
    if ink<.002:
        raise ValueError(f'Blank SVG after rasterisation: ink ratio={ink:.4f}')
    output=io.BytesIO()
    bg.save(output,format='PNG',optimize=True)
    return output.getvalue(),bg.size,round(float(ink),4)

def figure_blocks(visuals,mode):
    blocks=[]
    for d in visuals:
        try:
            data,size,ink=png_bytes(d['svg'],mode)
        except Exception as exc:
            raise ValueError(f'Failed SVG [{d["stage"]}] [{d["label"][:125]}]: {exc}') from exc
        # Sized for print; high-res original remains embedded.
        aspect=size[0]/size[1]
        w=min(TEXTWIDTH,465.0,270.0*aspect)
        h=w/aspect
        if h>268:
            h=268
            w=h*aspect
        label_lines=simpleSplit(d['label'],'RHSV',9.1,TEXTWIDTH)
        head_lines=simpleSplit(d['heading'],'RHSV-Bold',10.3,TEXTWIDTH)
        expl_lines=simpleSplit(d['explanation'],'RHSV',8.8,TEXTWIDTH)[:3]
        # Maximum of 3 explanatory lines, never long orphan captions.
        height=(len(head_lines)*15+len(label_lines)*13+len(expl_lines)*12+h+28)
        blocks.append({**d,'image':data,'width':w,'height':h,
                       'head_lines':head_lines,'label_lines':label_lines,
                       'expl_lines':expl_lines,'block_height':height,
                       'ink_ratio':ink})
    return blocks

def render_visual_pages(n,stage,blocks,mode):
    # Separate phase-adjacent pages avoid covering independent questions or
    # the worked text of the existing PDF. Each original page stays intact.
    pages=[]
    current=[];height=0
    for b in blocks:
        if height+b['block_height']>590 and current:
            pages.append(current);current=[];height=0
        if b['block_height']>590:
            raise ValueError(f'Figure cannot fit on A4 ({n}: {b["label"]})')
        current.append(b)
        height+=b['block_height']+12
    if current:pages.append(current)
    output=io.BytesIO()
    pdf=canvas.Canvas(output,pagesize=A4,pageCompression=1)
    for k,group in enumerate(pages,1):
        pdf.setFillColor(HexColor('#202d29') if mode=='bw' else HexColor('#12624d'))
        pdf.rect(0,H-12,W,12,fill=1,stroke=0)
        pdf.setFont('RHSV-Bold',9.3)
        pdf.drawString(PAGE_LEFT,H-38,'RHS COMPUTING · OCR H446')
        pdf.setFont('RHSV',8.8)
        pdf.drawRightString(W-PAGE_LEFT,H-38,f'LESSON {n:03d} · PRINT DRAFT')
        pdf.setStrokeColor(HexColor('#b1b8b4'))
        pdf.line(PAGE_LEFT,H-49,W-PAGE_LEFT,H-49)
        pdf.setFont('RHSV-Bold',15.2)
        pdf.drawString(PAGE_LEFT,H-78,f'{stage} · original lesson diagrams')
        pdf.setFont('RHSV',8.8)
        pdf.drawString(PAGE_LEFT,H-96,'Diagrams appear after the related explanation. Annotate the original source visual.')
        y=H-120
        for b in group:
            pdf.setFillColor(HexColor('#202d29'))
            pdf.setFont('RHSV-Bold',10.3)
            for line in b['head_lines']:
                pdf.drawString(PAGE_LEFT,y,line);y-=15
            pdf.setFont('RHSV',8.8)
            for line in b['expl_lines']:
                pdf.drawString(PAGE_LEFT,y,line);y-=12
            y-=5
            x=(W-b['width'])/2
            pdf.drawImage(ImageReader(io.BytesIO(b['image'])),x,y-b['height'],b['width'],b['height'],
                          mask='auto',preserveAspectRatio=True)
            y-=b['height']+7
            pdf.setFont('RHSV',9.1)
            pdf.setFillColor(HexColor('#32443d'))
            for line in b['label_lines']:
                pdf.drawString(PAGE_LEFT,y,line);y-=13
            y-=17
        if y<70:
            raise ValueError(f'Figure {n} {stage} spilled into footer ({y:.0f})')
        pdf.setStrokeColor(HexColor('#b1b8b4'))
        pdf.line(PAGE_LEFT,49,W-PAGE_LEFT,49)
        pdf.setFont('RHSV',8)
        pdf.setFillColor(HexColor('#506159'))
        pdf.drawString(PAGE_LEFT,33,'PRINT PILOT · original classroom diagram · teacher visual review required')
        pdf.showPage()
    pdf.save()
    return output.getvalue(),len(pages)

def compose(n,mode,entry,diagrams):
    # Idempotent publishing: never use a prior visual pilot as the new
    # "source" PDF or diagrams would duplicate on every rerun.
    if entry.get('status')=='visual_pilot_draft_needs_teacher_review':
        original=OUT/f'H446_Lesson_{n:03d}_{9 if n==31 else 8}PAGE_REVIEW_{mode.upper()}_A4.pdf'
    else:
        original=ROOT/entry['print_bw' if mode=='bw' else 'learn_colour']
    if not original.is_file():raise FileNotFoundError(original)
    pdf=fitz.open(original)
    base_pages=len(pdf)
    if base_pages not in (8,9) or (base_pages==9 and n!=31):
        raise ValueError(f'Unexpected source page count {base_pages} for {n}')
    groups=defaultdict(list)
    integrated=None
    integrated_count=0
    if n==31:
        # Replace the dense, diagram-free page three with compact steps
        # combining each theory explanation and its source diagram.
        from integrated_031_new_learning import make_integrated_new_learning_031
        data,integrated_count,figure_count,headings=make_integrated_new_learning_031(mode,diagrams)
        integrated=fitz.open(stream=data,filetype='pdf')
        assert figure_count==sum(d['stage']=='new-learning' for d in diagrams)
    for d in diagrams:
        if n==31 and d['stage']=='new-learning':
            continue  # Already included alongside its New Learning explanation.
        # Lesson 031 has TWO I Do model pages: diagrams for that phase
        # belong after page 5, while We Do is after page 6.
        index=d['base_page']+(1 if n==31 and d['stage'] in ('i-do','we-do') else 0)
        groups[(index,d['stage'])].append(d)
    additions={}
    quality=[]
    for (index,stage),figures in groups.items():
        blocks=figure_blocks(figures,mode)
        data,count=render_visual_pages(n,stage.replace('-',' ').title(),blocks,mode)
        visual=fitz.open(stream=data,filetype='pdf')
        additions.setdefault(index,[]).append(visual)
        quality.extend([{'stage':stage,'label':b['label'],'ink_ratio':b['ink_ratio'],
                         'source_sha':b['sha']} for b in blocks])
    merged=fitz.open()
    visual_pages=0
    for i in range(base_pages):
        if n==31 and i==2:
            merged.insert_pdf(integrated)
        else:
            merged.insert_pdf(pdf,from_page=i,to_page=i)
        for segment in additions.get(i,[]):
            merged.insert_pdf(segment)
            visual_pages+=len(segment)
    total=len(merged)
    assert total==base_pages+visual_pages+(integrated_count-1 if n==31 else 0)
    # Rewrite only the page number in bottom right, leaving the source
    # text and answer placements unchanged.
    for i,page in enumerate(merged,1):
        rect=fitz.Rect(W-102,H-53,W-36,H-17)
        page.draw_rect(rect,color=None,fill=(1,1,1),overlay=True)
        page.insert_text((W-74,H-31),f'{i} / {total}',fontsize=8.5,
                         fontname='helv',color=(.29,.36,.32),overlay=True)
    output=OUT/f'H446_Lesson_{n:03d}_VISUAL_PILOT_{mode.upper()}_A4.pdf'
    merged.save(output,garbage=4,deflate=True)
    merged.close()
    # Check old pages survive in order and newly inserted pages include
    # high-resolution embedded figures.
    with fitz.open(output) as after:
        original_text=[p.get_text() for p in pdf]
        new_text=[p.get_text() for p in after]
        cursor=0
        for old_index,old in enumerate(original_text):
            if n==31 and old_index==2:continue
            while cursor<len(new_text) and old[:160] not in new_text[cursor]:
                cursor+=1
            if cursor==len(new_text):
                raise ValueError(f'Existing page text lost in output lesson {n}: original {old_index+1}')
            cursor+=1
        embedded=sum(len(p.get_images(full=True)) for p in after)
        if embedded < len(diagrams):
            raise ValueError(f'Expected {len(diagrams)} embedded diagrams, found {embedded}')
        if any(abs(p.rect.width-W)>1 or abs(p.rect.height-H)>1 for p in after):
            raise ValueError('Non-A4 page')
    pdf.close()
    if integrated is not None:integrated.close()
    return output,total,visual_pages+(integrated_count-1 if n==31 else 0),quality

def main():
    catalogue=json.loads(CATALOGUE.read_text(encoding='utf-8'))
    audit={'pilot':list(LESSONS),'status':'draft_teacher_review',
           'base_booklets_preserved':True,'changes':[]}
    # All five pilots must pass before the catalogue is written.
    new_records={}
    for n in LESSONS:
        entry=catalogue['lessons']['h446'][str(n)]
        diagrams=source_diagrams(n)
        if not diagrams:raise ValueError(f'No source instructional SVG for {n}')
        outputs={}
        for mode in ('bw','colour'):
            out,pages,extra,details=compose(n,mode,entry,diagrams)
            a3=OUT/f'H446_Lesson_{n:03d}_VISUAL_PILOT_{mode.upper()}_A3_Booklet.pdf'
            sheets=impose_a3(out,a3)
            expected=((pages+3)//4)*2
            if sheets!=expected:raise ValueError('A3 booklet imposition mismatch')
            with fitz.open(a3) as doc:
                if len(doc)!=expected:raise ValueError('A3 page count mismatch')
            outputs[mode]={'a4':out,'a3':a3,'pages':pages,'a3_sheets':sheets,
                           'extra_pages':extra,'diagrams':details}
        if outputs['bw']['pages']!=outputs['colour']['pages']:
            raise ValueError('Colour and B&W page count mismatch')
        new_entry=dict(entry)
        new_entry.update({
          'print_bw':outputs['bw']['a4'].relative_to(ROOT).as_posix(),
          'learn_colour':outputs['colour']['a4'].relative_to(ROOT).as_posix(),
          'booklet_bw':outputs['bw']['a3'].relative_to(ROOT).as_posix(),
          'booklet_colour':outputs['colour']['a3'].relative_to(ROOT).as_posix(),
          'a4_pages':outputs['bw']['pages'],
          'a3_spreads':outputs['bw']['a3_sheets'],
          'status':'visual_pilot_draft_needs_teacher_review',
          'teacher_approved':False,
          'warnings':list(dict.fromkeys([w for w in entry.get('warnings',[])
              if not (n==31 and ('New learning condensed to first eight source steps' in w or
                   'Lesson 031 contains a representative subset' in w))]+[
            'All eleven New Learning stages restored with their original explanations' if n==31 else 'Original source explanations preserved',
            'Original instructional SVGs restored on phase-adjacent visual pages',
            'Teacher must visually check printed diagram sizes and answer accuracy before use',
            'Lesson 031 restores ten selected diagrams; supplementary figures need review' if n==31 else 'Visual-pilot draft, not final teacher approval']))
        })
        new_records[str(n)]=new_entry
        audit['changes'].append({
          'lesson':n,'original_a4_pages':9 if n==31 else 8,
          'new_a4_pages':outputs['bw']['pages'],
          'added_visual_pages':outputs['bw']['extra_pages'],
          'figures':len(diagrams),'bw_ink_ratios':[x['ink_ratio'] for x in outputs['bw']['diagrams']],
          'labels':[x['label'] for x in outputs['bw']['diagrams']],
          'bw_path':new_entry['print_bw'],'colour_path':new_entry['learn_colour']})
        print(f'PILOT {n:03d}: {len(diagrams)} authentic diagrams, {outputs["bw"]["pages"]} A4 pages',flush=True)
    catalogue['lessons']['h446'].update(new_records)
    CATALOGUE.write_text(json.dumps(catalogue,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    (OUT/'H446_VISUAL_PILOT_AUDIT.json').write_text(json.dumps(audit,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
    lines=['# H446 illustrated print-pilot audit','','Five source-preserving pilot booklet drafts.',
      'All files remain draft and require teacher visual approval before classroom delivery.','',
      '| Lesson | Diagrams | A4 pages | Added pages |',
      '|---|---:|---:|---:|']
    for r in audit['changes']:
        lines.append(f"| {r['lesson']:03d} | {r['figures']} | {r['new_a4_pages']} | {r['added_visual_pages']} |")
    lines += ['','## Approach','',
      'Original classroom text pages and answer placement remain unchanged.',
      'Relevant original SVG diagrams have been rendered at print resolution and inserted immediately after their New Learning / I Do / We Do page.',
      'Black-and-white uses contrast-enhanced greyscale and colour retains source colours.',
      'Each figure has the source accessible description and nearby lesson heading or explanation.',
      'B&W and colour A4 outputs and A3 booklet imposition passed automated checks.',
      'Lesson 031 is a representative pilot subset; its other diagrams remain on the audit queue.',
      'No classroom lesson, revision guide, shared CSS or site navigation was edited.',
      '',
      '## Final teacher checks','',
      'Check actual print-size readability and diagram correctness, especially gate wires and waveform traces.',
      'Verify OCR H446 terminology and the worked solutions with the revision guide.',
      'Revisit longer diagram-heavy booklets for overall pacing and writing space.',
      'Do not mark teacher-approved until the independent visual check is complete.']
    (OUT/'H446_VISUAL_PILOT_REPORT.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print(json.dumps({'pilot_count':len(audit['changes']),
                      'visuals':sum(x['figures'] for x in audit['changes'])},indent=2))
if __name__=='__main__':
    main()
