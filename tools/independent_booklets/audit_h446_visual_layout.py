#!/usr/bin/env python3
"""Rendered-page layout audit for visual print pilots 020 and 031.

This does not change teaching content or student Print links. Produces contact
sheets for human visual inspection plus an objective geometry audit.
"""
import fitz, json, io
from PIL import Image, ImageDraw, ImageFont, ImageOps
from pathlib import Path
from datetime import datetime,timezone

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'offline/booklets/h446/qa'
OUT.mkdir(parents=True,exist_ok=True)
BASE=ROOT/'offline/booklets/h446'
CAT=json.loads((ROOT/'offline/booklets/catalogue.json').read_text())
TARGETS=[20,31]
def contact_sheet(n,mode,filename):
    doc=fitz.open(filename)
    width,height=380,535
    cols=3
    rows=(len(doc)+cols-1)//cols
    image=Image.new('RGB',(cols*(width+20)+22,rows*(height+35)+44),'#e4e9e6')
    draw=ImageDraw.Draw(image)
    draw.text((16,12),f'H446 Lesson {n:03d} - {mode.upper()} - {len(doc)} A4 pages',fill='#1c3329')
    records=[]
    for i,page in enumerate(doc):
        pix=page.get_pixmap(matrix=fitz.Matrix(.72,.72),alpha=False,colorspace=fitz.csRGB)
        pimg=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
        pimg.thumbnail((width,height),Image.Resampling.LANCZOS)
        x=20+(i%cols)*(width+20)
        y=38+(i//cols)*(height+35)
        # Place page in white frame for consistent visual comparison.
        draw.rectangle((x-2,y-2,x+width+1,y+height+1),fill='white',outline='#bdc9c2',width=1)
        image.paste(pimg,(x+(width-pimg.width)//2,y+(height-pimg.height)//2))
        blocks=page.get_text('blocks')
        textblocks=[b for b in blocks if (b[6] if len(b)>6 else 0)==0 and isinstance(b[4],str)]
        bad=[{'x0':round(b[0],1),'y0':round(b[1],1),'x1':round(b[2],1),'y1':round(b[3],1)} for b in textblocks if b[0]<30 or b[2]>page.rect.width-30 or b[1]<18 or b[3]>page.rect.height-18]
        inkpix=page.get_pixmap(matrix=fitz.Matrix(.25,.25),colorspace=fitz.csGRAY,alpha=False)
        values=list(inkpix.samples)
        nonwhite=sum(1 for v in values if v<238)/max(1,len(values))
        records.append({
          'page':i+1,'chars':len(page.get_text().strip()),
          'images':len(page.get_images(full=True)),
          'nonwhite_ratio':round(nonwhite,4),
          'edge_text_blocks':bad,
          'text_y_top':round(min((b[1] for b in textblocks),default=0),1),
          'text_y_bottom':round(max((b[3] for b in textblocks),default=0),1)})
        draw.text((x+4,y+height+6),f'Page {i+1:02d}  |  {records[-1]["images"]} images',fill='#203c30')
    output=OUT/f'H446_{n:03d}_{mode.upper()}_CONTACT_SHEET.png'
    image.save(output,optimize=True)
    return output,records
report={'created_utc':datetime.now(timezone.utc).isoformat(),'lessons':{}}
lines=['# H446 visual print pilot — rendered page QA','','Read the contact sheets at 100% before releasing these booklets.','Lesson 031 uses integrated theory and diagrams (11 learning stages), rather than a dense single theory page.','','| Lesson | Edition | Pages | Diagram pages | Text block edge warnings |','|---|---|---:|---:|---:|']
for n in TARGETS:
    e=CAT['lessons']['h446'][str(n)]
    report['lessons'][str(n)]={}
    for mode,key in [('bw','print_bw'),('colour','learn_colour')]:
        f=ROOT/e[key]
        sheet,records=contact_sheet(n,mode,f)
        margin=sum(len(r['edge_text_blocks']) for r in records)
        if margin:
            raise ValueError(f'Lesson {n:03d} {mode}: {margin} text blocks extend beyond safe margins')
        diagram_count=sum(p['images'] for p in records)
        if n==31:
            if diagram_count<10:
                raise ValueError(f'Lesson 031 expected 10 restored diagram images, found {diagram_count}')
            if len(records)>14:
                raise ValueError('Lesson 031 should not exceed 14 A4 pages after integrating diagrams')
            dense=[p['page'] for p in records if p['chars']>2000]
            if dense:
                raise ValueError(f'Lesson 031 still has dense pages: {dense}')
        report['lessons'][str(n)][mode]={
            'source_pdf':e[key],'contact_sheet':sheet.relative_to(ROOT).as_posix(),
            'pages':records,'text_edge_warnings':margin,
            'image_objects':diagram_count,
            'dense_text_pages':[p['page'] for p in records if p['chars']>2000]}
        lines.append(f'| {n:03d} | {mode} | {len(records)} | {sum(bool(x["images"]) for x in records)} | {margin} |')
lines += ['', '## Specific teacher review flags', '']
for n in TARGETS:
    entry=report['lessons'][str(n)]['bw']
    dense=entry['dense_text_pages']
    if dense:
        lines.append(f'- **Lesson {n:03d}**: page(s) {", ".join(map(str,dense))} contain over 2,000 text characters; check font size and consider splitting explanation before classroom delivery.')
    else:
        lines.append(f'- Lesson {n:03d}: no text-dense pages above the 2,000-character threshold.')
lines.append('- Lesson 031 restores ten source diagrams; the remaining interactive or supplementary visual stages require separate review.')
lines+=['','**Notes**: Lesson 031 pairs New Learning text with related diagrams; its I Do and We Do diagrams remain on phase-adjacent pages. '
        'Low nonwhite-ratio or very short text pages should be visually checked. '
        'Automated edge-warning counts are conservative because the header/footer approaches the paper edge.',
        'Contact sheets are for human print review; no lesson source, guide or print navigation changed.']
(OUT/'H446_TWO_PILOT_LAYOUT_AUDIT.json').write_text(json.dumps(report,indent=2)+'\n')
(OUT/'H446_TWO_PILOT_LAYOUT_AUDIT.md').write_text('\n'.join(lines)+'\n')
print('\n'.join(lines))
