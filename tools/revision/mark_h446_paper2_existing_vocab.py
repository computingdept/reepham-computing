"""Apply shared lesson marker styling to the five pre-existing Paper 2 vocab tables.

Preserve existing PDF pages, page keys, textual definitions, quiz feedback, and links.
"""
from pathlib import Path
import fitz,cairosvg,json
R=Path(__file__).resolve().parents[2]
G=R/'revision/h446/guides'
PDF=G/'H446_Paper_2_REVIEW_READY_2026-10-21.pdf'
MAP=G/'paper-2-page-map.json'
HUB=R/'h446-hub.html'
REPORT=R/'docs/audits/h446-paper2-legacy-marker-20261027.md'
OLD='2026-10-27-theory-examples-terms'
NEW='2026-10-27-all-keywords'
data=json.loads(MAP.read_text())
assert data['edition']==OLD and data['page_count']==179
doc=fitz.open(PDF)
assert len(doc)==179
orig_toc=doc.get_toc()
old_text=[p.get_text() for p in doc]
old_links=[[(l['kind'],l.get('page')) for l in p.get_links()] for p in doc]
pages=[21,42,83,122,165]
patterns=[
 ('#FFF44F','.86','M3 14 Q55 10 103 13 T200 11 Q255 13 309 11 T397 13 L399 43 Q339 47 274 44 Q208 47 138 45 T3 46Z'),
 ('#FFF557','.87','M0 16 Q66 11 121 14 Q173 10 230 13 T397 10 L399 46 Q336 43 280 47 T140 45 Q70 48 2 44Z'),
 ('#FFF14B','.82','M3 12 Q76 14 133 10 T262 13 Q333 9 396 14 L397 44 Q333 48 262 44 T126 46 Q55 43 2 46Z')]
sources=[]
for color,alpha,d in patterns:
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="400" height="56" viewBox="0 0 400 56" preserveAspectRatio="none"><path d="{d}" fill="{color}" fill-opacity="{alpha}"/></svg>'
    sources.append(fitz.open(stream=cairosvg.svg2pdf(bytestring=svg.encode()),filetype='pdf'))
report=['# H446 Paper 2 — existing vocabulary highlighting','']
total=0
for n in pages:
    page=doc[n-1]
    spans=[s for b in page.get_text('dict')['blocks'] for line in b.get('lines',[]) for s in line['spans']]
    headers=[s for s in spans if s['text'].strip()=='Keyword']
    assert len(headers)==1,(n,[s['text'] for s in spans if 'keyword' in s['text'].lower()])
    hd=headers[0];hx=hd['bbox'][0]
    right=[s for s in spans if 'Exam-accurate meaning' in s['text']]
    assert len(right)==1,(n,right)
    dx=right[0]['bbox'][0]
    terms=[]
    for s in spans:
        bb=fitz.Rect(s['bbox'])
        if (abs(bb.x0-hx)<4 and bb.y0>hd['bbox'][3]+8
                and bb.y0<page.rect.height-70
                and bb.x1<dx-5 and 7<=s['size']<=11
                and len(s['text'].strip())>=2):
            terms.append(s)
    assert 4<=len(terms)<=9,(n,[(s['text'],s['bbox']) for s in terms])
    for s in terms:
        page.add_redact_annot(fitz.Rect(s['bbox'])+(-.35,-.35,.35,.35),fill=False)
    page.apply_redactions(images=0,graphics=0)
    page.insert_font(fontname='RevVocab',fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
    for i,s in enumerate(terms):
        bb=fitz.Rect(s['bbox'])
        mr=fitz.Rect(bb.x0-4,bb.y0-5,bb.x1+6,bb.y1+5)
        page.show_pdf_page(mr,sources[i%3],0,keep_proportion=False,overlay=True)
        col=tuple(((s['color']>>k)&255)/255 for k in (16,8,0))
        page.insert_text(s['origin'],s['text'],fontname='RevVocab',fontsize=s['size'],color=col)
        assert mr.y0+mr.height*(9/56)<=bb.y0+1 and mr.y0+mr.height*(48/56)>=bb.y1-1
    total+=len(terms)
    txt=' '.join(page.get_text().split())
    for s in terms:assert s['text'] in txt,(n,s['text'])
    report.append(f'- Page {n}: {len(terms)} words — '+', '.join(s['text'] for s in terms))
assert doc.get_toc()==orig_toc
assert [[(l['kind'],l.get('page')) for l in p.get_links()] for p in doc]==old_links
for i,p in enumerate(doc):
    if i+1 not in pages:assert p.get_text()==old_text[i],i+1
tmp=PDF.with_suffix('.marker.tmp.pdf')
doc.save(tmp,garbage=4,deflate=True)
doc.close()
updated=fitz.open(tmp)
assert len(updated)==179
assert updated.get_toc()==orig_toc
for n in pages:
    assert 'Keyword' in updated[n-1].get_text() and 'Exam-accurate meaning' in updated[n-1].get_text()
    assert updated[n-1].get_pixmap(matrix=fitz.Matrix(1.2,1.2)).width>600
updated.close()
data['edition']=NEW
MAP.write_text(json.dumps(data,indent=2)+'\n')
h=HUB.read_text()
assert OLD in h
HUB.write_text(h.replace(OLD,NEW))
PDF.write_bytes(tmp.read_bytes())
tmp.unlink()
REPORT.write_text('\n'.join(report)+f'\n\n{total} original terms restyled; all 179 pages and feedback keys retained.\n')
print('PASS: Paper 2 old glossary terms',total,'pages',pages)
