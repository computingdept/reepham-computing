"""Update the H446 Paper 1 PDF for independent revision, preserving stable feedback keys.

Purpose: replace classroom labels with worked-example / practice labels, add terminology
for specification sections that do not already have a glossary, and remap PDF page links.
Guarded migration: run once only from the 253-page, 23 October edition.
"""
from pathlib import Path
import json,re,copy,os
import fitz

ROOT=Path(__file__).resolve().parents[2]
GUIDES=ROOT/'revision/h446/guides'
PDF=GUIDES/'H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf'
MAP=GUIDES/'paper-1-page-map.json'
TERMS=ROOT/'tools/revision/h446_paper1_terms.json'
HUB=ROOT/'h446-hub.html'
REPORT=ROOT/'docs/audits/h446-paper1-terminology-migration-20261027.md'
OLD='2026-10-23-shifts-masks'
NEW='2026-10-27-revision-terminology'
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'

data=json.loads(MAP.read_text())
terms=json.loads(TERMS.read_text())
assert data['edition']==OLD and data['page_count']==253, 'Requires the approved 253-page edition: refusing repeat application'
assert len(terms)==10, 'Expected 10 sections without an existing dedicated terminology table'
assert set(terms).issubset({s['spec'] for s in data['sections']})
assert all(4<=len(v)<=8 for v in terms.values())
old=fitz.open(PDF)
assert len(old)==253
old_toc=old.get_toc()
old_links={i+1:p.get_links() for i,p in enumerate(old) if p.get_links()}
all_specs={s['spec']:s for s in data['sections']}
term_entry={spec:all_specs[spec]['page'] for spec in terms}
term_sorted=sorted(term_entry.values())
newkey_by_spec={spec:254+i for i,spec in enumerate(sorted(terms,key=lambda t:term_entry[t]))}

def shifted(n):
    return n+sum(v<n for v in term_sorted)

def glossary_page(n, spec):
    p=doc.new_page(pno=n,width=old[0].rect.width,height=old[0].rect.height)
    w,h=p.rect.width,p.rect.height
    p.insert_font(fontname='GuideBody',fontfile=FONT)
    p.insert_font(fontname='GuideBold',fontfile=BOLD)
    dark=(.10,.24,.29);blue=(.14,.38,.50);muted=(.34,.43,.48)
    p.draw_rect(fitz.Rect(0,0,w,27),color=None,fill=blue)
    p.insert_text((43,54),'OCR H446 / PAPER 1 / '+spec,fontname='GuideBold',fontsize=9,color=muted)
    p.insert_text((43,88),'Theory / Key terminology',fontname='GuideBold',fontsize=21,color=dark)
    p.insert_textbox(fitz.Rect(43,101,w-43,139),
        'Use these precise terms when explaining concepts and constructing examination answers.',
        fontname='GuideBody',fontsize=10,color=muted,align=0)
    y=158
    for word,definition in terms[spec]:
        row=fitz.Rect(43,y,w-43,y+62)
        p.draw_rect(row,color=(.85,.88,.90),fill=(.987,.992,.995),width=.6)
        p.draw_rect(fitz.Rect(55,y+15,211,y+42),color=None,fill=(1,.965,.72))
        if p.insert_textbox(fitz.Rect(61,y+17,208,y+40),word,fontname='GuideBold',fontsize=9.6,color=dark)<0:
            raise ValueError(f'Keyword clipped in {spec}: {word}')
        if p.insert_textbox(fitz.Rect(225,y+8,w-56,y+54),definition,fontname='GuideBody',
                            fontsize=9.6,lineheight=1.22,color=dark)<0:
            raise ValueError(f'Definition clipped in {spec}: {word}')
        y+=67
    assert y<h-90, (spec,y,h)
    p.insert_text((43,h-70),'REVISION ROUTINE / Read the theory, follow worked examples, then practise.',fontname='GuideBody',fontsize=8.5,color=muted)
    return p

doc=fitz.open(PDF)
# Reverse insertions keep earlier source positions unchanged during insertion.
for spec,firstpage in sorted(term_entry.items(),key=lambda x:x[1],reverse=True):
    glossary_page(firstpage,spec) # zero-based insertion after the existing first topic page

assert len(doc)==len(old)+len(terms)
changes=[]
repl_pat=re.compile(r'\b(I\s+DO|WE\s+DO|YOU\s+DO)\b',re.I)
regular_font=fitz.Font(fontfile=FONT);bold_font=fitz.Font(fontfile=BOLD)
for source_no in range(1,len(old)+1):
    page=doc[shifted(source_no)-1]
    original=old[source_no-1].get_text('dict')
    replacements=[]
    for block in original['blocks']:
        for line in block.get('lines',[]):
            for span in line['spans']:
                txt=span['text']
                newer=txt
                if re.search(r'Understand it\s*/\s*I Do\s*/\s*We Do',txt,re.I):
                    newer=re.sub(r'Understand it\s*/\s*I Do\s*/\s*We Do','Theory / Worked Examples',newer,flags=re.I)
                else:
                    newer=re.sub(r'\bI\s+DO\b','WORKED EXAMPLE 1',newer,flags=re.I)
                    newer=re.sub(r'\bWE\s+DO\b','WORKED EXAMPLE 2',newer,flags=re.I)
                    newer=re.sub(r'\bYOU\s+DO\b','EXAM PRACTICE',newer,flags=re.I)
                newer=re.sub('Essential key vocabulary','THEORY / KEY TERMINOLOGY',newer,flags=re.I)
                if newer==txt:
                    continue
                x,y=span['origin'];bb=fitz.Rect(span['bbox'])
                size=span['size']
                is_bold='bold' in span['font'].lower()
                ft=bold_font if is_bold else regular_font
                available=page.rect.width-x-34
                if ft.text_length(newer,fontsize=size)>available:
                    size=size*available/ft.text_length(newer,fontsize=size)
                if size<7.3:
                    raise ValueError(f'Unsafe tiny replacement at page {source_no}: {txt!r} -> {newer!r} ({size:.1f}pt)')
                rgb=tuple(((span['color']>>bit)&255)/255 for bit in (16,8,0))
                replacements.append((bb,x,y,newer,size,is_bold,rgb,txt))
    if replacements:
        page.insert_font(fontname='GuideBody',fontfile=FONT)
        page.insert_font(fontname='GuideBold',fontfile=BOLD)
        for bb,*rest in replacements:
            page.add_redact_annot(bb,fill=False)
        page.apply_redactions(images=0,graphics=0)
        for bb,x,y,newer,size,is_bold,rgb,before in replacements:
            page.insert_text((x,y),newer,fontname='GuideBold' if is_bold else 'GuideBody',fontsize=size,color=rgb)
            changes.append((source_no,before,newer,round(size,1)))

# Remap every original embedded link (PDF contents and internal navigation).
for original_no,links in old_links.items():
    p=doc[shifted(original_no)-1]
    for existing in p.get_links():
        p.delete_link(existing)
    for item in links:
        li=copy.deepcopy(item)
        li.pop('xref',None);li.pop('id',None)
        if li['kind']==fitz.LINK_GOTO:
            li['page']=shifted(li['page']+1)-1
        p.insert_link(li)

# Update the visible contents destinations, which are rendered PDF text rather than annotations.
contents=doc[0]
w,h=contents.rect.width,contents.rect.height
content_numbers=[]
for block in contents.get_text('dict')['blocks']:
    for line in block.get('lines',[]):
        for span in line['spans']:
            if span['text'].strip().isdigit() and span['bbox'][0]>w-100 and span['bbox'][1]<h-55:
                number=int(span['text'].strip())
                if number>=2:
                    content_numbers.append((span,shifted(number)))
                    contents.add_redact_annot(fitz.Rect(span['bbox'])+(-.1,-.1,.1,.1),fill=(.933,.961,.969))
if content_numbers:
    contents.apply_redactions(images=0,graphics=0)
    contents.insert_font(fontname='GuideBold',fontfile=BOLD)
    for span,to in content_numbers:
        x=span['bbox'][2]-bold_font.text_length(str(to),fontsize=span['size'])
        contents.insert_text((x,span['origin'][1]),str(to),fontname='GuideBold',
                             fontsize=span['size'],color=(.09,.25,.29))

# Repaint the printed footer numbers on original pages; inserted pages get them below.
for original_no in range(1,len(old)+1):
    p=doc[shifted(original_no)-1]
    w,h=p.rect.width,p.rect.height
    number=str(shifted(original_no))
    footer=fitz.Rect(w-92,h-47,w-24,h-13)
    p.add_redact_annot(footer,fill=(1,1,1))
    p.apply_redactions(images=0,graphics=0)
    p.insert_text((w-45-fitz.get_text_length(number,fontname='helv',fontsize=8),h-31),
                  number,fontname='helv',fontsize=8,color=(.10,.25,.30))
for spec in terms:
    pageno=shifted(term_entry[spec])+1
    p=doc[pageno-1];w,h=p.rect.width,p.rect.height
    p.insert_text((w-45-fitz.get_text_length(str(pageno),fontname='helv',fontsize=8),h-31),
                  str(pageno),fontname='helv',fontsize=8,color=(.10,.25,.30))

toc=[]
for level,title,original_page in old_toc:
    toc.append([level,title,shifted(original_page)])
    for spec,entry in term_entry.items():
        if entry==original_page:
            toc.append([level+1,spec+' / Key terminology',shifted(entry)+1])
doc.set_toc(toc)
doc.set_page_labels([{'startpage':0,'prefix':'','style':'D','firstpagenum':1}])
tmp=PDF.with_suffix('.migration.tmp.pdf')
doc.save(tmp,garbage=4,deflate=True)
doc.close()
newdoc=fitz.open(tmp)
assert len(newdoc)==263
remaining=[]
for i,p in enumerate(newdoc):
    if repl_pat.search(p.get_text()):
        remaining.append(i+1)
assert not remaining, f'Classroom model labels still visible on pages: {remaining}'
assert len(changes)>=100, f'Too few headings replaced: {len(changes)}'
assert all(spec in newdoc[shifted(page)+0].get_text() for spec,page in term_entry.items())
assert len(newdoc.get_toc())>=len(old_toc)
newdoc.close()

for k,original_page in data['page_keys'].items():
    data['page_keys'][k]=shifted(original_page)
for spec,entry in term_entry.items():
    data['page_keys'][str(newkey_by_spec[spec])]=shifted(entry)+1
for s in data['sections']:
    s['page']=shifted(s['page'])
    if s['spec'] in terms:
        s['old_pages'].append(newkey_by_spec[s['spec']])
for item in data['added_pages']:
    item['page']=shifted(item['page'])
for spec,entry in term_entry.items():
    data['added_pages'].append({'key':newkey_by_spec[spec],'page':shifted(entry)+1,
                                'spec':spec,'title':'Theory / Key terminology'})
data['page_count']=263
data['edition']=NEW
MAP.write_text(json.dumps(data,indent=2)+'\n')
HUB.write_text(HUB.read_text().replace('2026-10-23-shifts-masks',NEW))
PDF.write_bytes(tmp.read_bytes())
tmp.unlink()

REPORT.parent.mkdir(parents=True,exist_ok=True)
REPORT.write_text('# Paper 1 revision-guide terminology migration — 27 October 2026\n\n'
                  f'- Original pages: {len(old)}; updated pages: 263.\n'
                  f'- New terminology pages: {len(terms)}; existing dedicated tables: 5.\n'
                  f'- Classroom-label spans revised: {len(changes)}.\n'
                  f'- Old stable page keys retained: 253; new independent terminology page keys: {len(terms)}.\n'
                  f'- Original question banks, scoring rules, saved results and lesson files not changed.\n'
                  '- All bookmarks and PDF contents links remapped; feedback audit required before publishing.\n\n'
                  '## Changed label examples\n\n'+
                  '\n'.join(f'- Original p.{n}: {bef} → {aft} ({size}pt)' for n,bef,aft,size in changes[:45])+
                  '\n')
print(f'PASS source PDF migration: {len(old)} -> 263 pages, {len(changes)} heading spans; 10 glossary pages.')
