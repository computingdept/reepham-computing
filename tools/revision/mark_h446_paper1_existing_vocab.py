"""Apply lesson-style pen strokes to four existing Paper 1 glossary tables.

Edit only keyword glyphs, not definitions or page structure. Guard against
repeat application and preserve 263 pages, all 263 stable page keys.
"""
from pathlib import Path
import json,io
import fitz,cairosvg
ROOT=Path(__file__).resolve().parents[2]
GUIDES=ROOT/'revision/h446/guides'
PDF=GUIDES/'H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf'
MAP=GUIDES/'paper-1-page-map.json'
HUB=ROOT/'h446-hub.html'
REPORT=ROOT/'docs/audits/h446-paper1-legacy-marker-audit-20261027.md'
OLD='2026-10-27-marker-centred'
NEW='2026-10-27-all-keywords'
data=json.loads(MAP.read_text())
assert data['edition']==OLD and data['page_count']==263
doc=fitz.open(PDF)
assert len(doc)==263
toc=doc.get_toc()
old_text=[p.get_text() for p in doc]
old_links=[[{k:x[k] for k in ['kind','page'] if k in x} for x in p.get_links()] for p in doc]
target=[36,74,112,121]
marker=[
 ('#FFF44F','.86','M3 14 Q55 10 103 13 T200 11 Q255 13 309 11 T397 13 L399 43 Q339 47 274 44 Q208 47 138 45 T3 46Z'),
 ('#FFF557','.87','M0 16 Q66 11 121 14 Q173 10 230 13 T397 10 L399 46 Q336 43 280 47 T140 45 Q70 48 2 44Z'),
 ('#FFF14B','.82','M3 12 Q76 14 133 10 T262 13 Q333 9 396 14 L397 44 Q333 48 262 44 T126 46 Q55 43 2 46Z')]
sources=[]
for color,alpha,path in marker:
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="400" height="56" viewBox="0 0 400 56" preserveAspectRatio="none"><path d="{path}" fill="{color}" fill-opacity="{alpha}"/></svg>'
 sources.append(fitz.open(stream=cairosvg.svg2pdf(bytestring=svg.encode()),filetype='pdf'))

report=['# Paper 1 existing terminology — lesson-style marker audit','',
        'Changed only the keyword text positions in existing vocabulary tables on pages 36, 74, 112 and 121.','']
for n in target:
 p=doc[n-1]
 spans=[sp for b in p.get_text('dict')['blocks'] for line in b.get('lines',[]) for sp in line['spans']]
 headers=[sp for sp in spans if sp['text'].strip()=='Keyword' and 60<sp['bbox'][0]<95]
 assert len(headers)==1,(n,headers)
 header=headers[0]
 terms=[]
 for sp in spans:
  bb=fitz.Rect(sp['bbox'])
  if (70<bb.x0<95 and bb.y0>header['bbox'][3]+8
        and bb.y0<header['bbox'][3]+160 and 7.4<sp['size']<8.2
        and bb.x1<180 and len(sp['text'].strip())>=2):
   terms.append(sp)
 assert len(terms)==6,(n,[x['text'] for x in terms])
 for sp in terms:
  p.add_redact_annot(fitz.Rect(sp['bbox'])+(-.35,-.35,.35,.35),fill=False)
 p.apply_redactions(images=0,graphics=0)
 for i,sp in enumerate(terms):
  bb=fitz.Rect(sp['bbox'])
  r=fitz.Rect(bb.x0-4,bb.y0-5,bb.x1+6,bb.y1+5)
  p.show_pdf_page(r,sources[i%3],0,keep_proportion=False,overlay=True)
  font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
  p.insert_font(fontname='RevisionGlossary',fontfile=font)
  rgb=tuple(((sp['color']>>bit)&255)/255 for bit in (16,8,0))
  p.insert_text(sp['origin'],sp['text'],fontsize=sp['size'],fontname='RevisionGlossary',color=rgb)
  ink_y0=r.y0+r.height*(9/56)
  ink_y1=r.y0+r.height*(48/56)
  assert ink_y0<=bb.y0+1 and ink_y1>=bb.y1-1,(n,sp['text'],bb,r)
  report.append(f"- p.{n}: {sp['text'].strip()}")
 newtext=' '.join(p.get_text().split())
 for sp in terms:
  assert sp['text'] in newtext,(n,sp['text'])
 # Important: definition text must remain present, unchanged in spelling.
 assert 'Exam-accurate meaning' in newtext and 'THEORY / KEY TERMINOLOGY' in newtext,n
 report+=['']
assert doc.get_toc()==toc
assert [[{k:x[k] for k in ['kind','page'] if k in x} for x in p.get_links()] for p in doc]==old_links
for i,p in enumerate(doc):
 if i+1 not in target:assert p.get_text()==old_text[i],i+1
tmp=PDF.with_suffix('.legacy-marker.tmp.pdf')
doc.save(tmp,garbage=4,deflate=True)
doc.close()
fresh=fitz.open(tmp)
assert len(fresh)==263
for n in target:
 assert 'THEORY / KEY TERMINOLOGY' in fresh[n-1].get_text()
 assert fresh[n-1].get_pixmap(matrix=fitz.Matrix(1.3,1.3)).width>700
fresh.close()
data['edition']=NEW
MAP.write_text(json.dumps(data,indent=2)+'\n')
hub=HUB.read_text()
assert OLD in hub
HUB.write_text(hub.replace(OLD,NEW))
PDF.write_bytes(tmp.read_bytes())
tmp.unlink()
REPORT.write_text('\n'.join(report)+'\n')
print('PASS Paper 1: four original terminology tables now have SVG marker highlighting; 263 pages and existing links retained')
