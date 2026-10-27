"""Match Paper 1 PDF terminology highlighting to the shared H446/J277 lesson SVG marker.

A guarded, visual-only vertical-position correction on the 263-page revision edition.
Keeps every PDF page number, legacy stable key and quiz/lesson destination.
"""
from pathlib import Path
import io,json
import fitz
import cairosvg

ROOT=Path(__file__).resolve().parents[2]
GUIDES=ROOT/'revision/h446/guides'
PDF=GUIDES/'H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf'
MAP=GUIDES/'paper-1-page-map.json'
HUB=ROOT/'h446-hub.html'
TERMS=ROOT/'tools/revision/h446_paper1_terms.json'
REPORT=ROOT/'docs/audits/h446-paper1-marker-alignment-20261027.md'
OLD='2026-10-27-lesson-marker'
NEW='2026-10-27-marker-centred'
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

data=json.loads(MAP.read_text())
terms=json.loads(TERMS.read_text())
assert data['edition']==OLD and data['page_count']==263, 'Not the 263-page pre-marker revision edition; refuse repeat'
doc=fitz.open(PDF)
assert len(doc)==263
original_toc=doc.get_toc()
old_texts=[p.get_text() for p in doc]
old_links=[[ (l.get('kind'),l.get('page')) for l in p.get_links()] for p in doc]
new_pages=[p for p in data['added_pages'] if isinstance(p.get('key'),int) and p['key']>=254]
assert len(new_pages)==len(terms)==10
assert {p['spec'] for p in new_pages}==set(terms)

# Literal paths and fills from assets/h446-lesson/keyword-highlighter.css.
# SVG is only converted to a vector PDF used as a small background under each word.
marker_data=[
 ('#FFF44F','.86',
  'M3 14 Q55 10 103 13 T200 11 Q255 13 309 11 T397 13 '
  'L399 43 Q339 47 274 44 Q208 47 138 45 T3 46Z'),
 ('#FFF557','.87',
  'M0 16 Q66 11 121 14 Q173 10 230 13 T397 10 '
  'L399 46 Q336 43 280 47 T140 45 Q70 48 2 44Z'),
 ('#FFF14B','.82',
  'M3 12 Q76 14 133 10 T262 13 Q333 9 396 14 '
  'L397 44 Q333 48 262 44 T126 46 Q55 43 2 46Z'),
]
sources=[]
for color,opacity,path in marker_data:
    svg=(f'<svg xmlns="http://www.w3.org/2000/svg" width="400" height="56" '
         f'viewBox="0 0 400 56" preserveAspectRatio="none">'
         f'<path d="{path}" fill="{color}" fill-opacity="{opacity}"/></svg>')
    sources.append(fitz.open(stream=cairosvg.svg2pdf(bytestring=svg.encode()),filetype='pdf'))

def make_page(p,spec,n):
    w,h=p.rect.width,p.rect.height
    assert not p.get_links(), f'Glossary page {n} must not contain pre-existing links'
    p.add_redact_annot(p.rect,fill=(1,1,1))
    p.apply_redactions(images=0,graphics=1)
    assert not p.get_text().strip(), f'Page {n} not cleared'
    p.insert_font(fontname='GuideBody',fontfile=FONT)
    p.insert_font(fontname='GuideBold',fontfile=BOLD)
    dark=(.10,.24,.29)
    blue=(.14,.38,.50)
    muted=(.34,.43,.48)
    p.draw_rect(fitz.Rect(0,0,w,27),color=None,fill=blue)
    p.insert_text((43,54),'OCR H446 / PAPER 1 / '+spec,
                  fontname='GuideBold',fontsize=9,color=muted)
    p.insert_text((43,88),'Theory / Key terminology',
                  fontname='GuideBold',fontsize=21,color=dark)
    assert p.insert_textbox(
        fitz.Rect(43,101,w-43,139),
        'Use these precise terms when explaining concepts and constructing examination answers.',
        fontname='GuideBody',fontsize=10,color=muted)>=0

    bold=fitz.Font(fontfile=BOLD)
    y=158
    for i,(word,definition) in enumerate(terms[spec]):
        # Neutral cards retain the legibility and rhythm of the previous guide.
        # Only the keyword gets the lesson-style translucent hand-drawn highlight.
        row=fitz.Rect(43,y,w-43,y+62)
        p.draw_rect(row,color=(.85,.88,.90),fill=(.987,.992,.995),width=.6)
        tx=61
        # A hand-drawn translucent pen stroke crosses the keyword, not below it.
        width=min(150,bold.text_length(word,fontsize=9.6)+10)
        # The painted SVG interior is 9..48 of its 56 SVG units. Centre that paint
        # vertically around the actual glyphs (roughly y+17..y+28), not below them.
        marker_rect=fitz.Rect(tx-5,y+12,tx-5+width,y+34)
        p.show_pdf_page(marker_rect,sources[i%3],0,keep_proportion=False,overlay=True)
        assert p.insert_textbox(fitz.Rect(tx,y+17,208,y+40),word,
                fontname='GuideBold',fontsize=9.6,color=dark)>=0,word
        glyphs=[
            s for b in p.get_text('dict')['blocks']
            for ln in b.get('lines',[]) for s in ln['spans']
            if s['text']==word and tx-1<=s['bbox'][0]<=208
            and y+14<=s['bbox'][1]<=y+41
        ]
        assert len(glyphs)==1,(spec,word,glyphs)
        glyph=glyphs[0]['bbox']
        ink_top=marker_rect.y0+marker_rect.height*(9/56)
        ink_bottom=marker_rect.y0+marker_rect.height*(48/56)
        assert ink_top<=glyph[1]+1 and ink_bottom>=glyph[3]-1, (
            spec,word,'Yellow ink misses letters',ink_top,ink_bottom,glyph)
        assert p.insert_textbox(fitz.Rect(225,y+8,w-56,y+54),definition,
                fontname='GuideBody',fontsize=9.6,lineheight=1.22,color=dark)>=0,definition
        y+=67
    assert y<h-90
    p.insert_text((43,h-70),
        'REVISION ROUTINE / Read the theory, follow worked examples, then practise.',
        fontname='GuideBody',fontsize=8.5,color=muted)
    footer=str(n)
    p.insert_text((w-45-fitz.get_text_length(footer,fontname='helv',fontsize=8),h-31),
                  footer,fontname='helv',fontsize=8,color=(.10,.25,.30))
    after=' '.join(p.get_text().split())
    for word,definition in terms[spec]:
        assert word in after and ' '.join(definition.split()) in after,(n,word)
    return y

for record in new_pages:
    make_page(doc[record['page']-1],record['spec'],record['page'])
assert doc.get_toc()==original_toc
assert all(p.get_text()==old_texts[i] for i,p in enumerate(doc) if i+1 not in {a['page'] for a in new_pages})
assert old_links==[[ (l.get('kind'),l.get('page')) for l in p.get_links()] for p in doc]

tmp=PDF.with_suffix('.marker.tmp.pdf')
doc.save(tmp,garbage=4,deflate=True)
doc.close()
reloaded=fitz.open(tmp)
assert len(reloaded)==263
assert reloaded.get_toc()==original_toc
for record in new_pages:
    p=reloaded[record['page']-1]
    assert 'Theory / Key terminology' in p.get_text()
    # Render the final vector PDF at a screen-friendly resolution.
    pix=p.get_pixmap(matrix=fitz.Matrix(1.25,1.25),alpha=False)
    assert pix.width>500 and pix.height>800
for i,p in enumerate(reloaded):
    if i+1 not in {a['page'] for a in new_pages}:
        assert p.get_text()==old_texts[i]
reloaded.close()

data['edition']=NEW
MAP.write_text(json.dumps(data,indent=2)+'\n')
hub=HUB.read_text()
assert OLD in hub
HUB.write_text(hub.replace(OLD,NEW))
PDF.write_bytes(tmp.read_bytes())
tmp.unlink()
REPORT.parent.mkdir(parents=True,exist_ok=True)
REPORT.write_text(
    '# H446 Paper 1 / Lesson-marker alignment\n\n'
    '- Kept all 263 pages and all 263 stable page keys.\n'
    '- Repositioned the exact shared lesson SVG strokes behind the full height of each keyword on all 10 new glossary pages (rather than underneath the text).\n'
    '- Kept selectable words, accessible definitions, grey terminology rows and font sizing.\n'
    '- Kept PDF bookmarks and non-glossary pages unchanged in extracted content.\n'
    '- Existing 5 vocabulary tables were not restyled in this pass; their labels remain consistent.\n'
    '- Revision quiz feedback destinations must be reaudited before publication.\n\n'
    '- A geometry assertion confirms that the painted SVG area intersects the full keyword glyph height.\n'\n    'Keyword pages: '+', '.join(f"{p['spec']} p.{p['page']}" for p in new_pages)+'\n'
)
print('PASS: 263 pages, 10 lesson-style SVG-stroke terminology pages; no page shifts.')
