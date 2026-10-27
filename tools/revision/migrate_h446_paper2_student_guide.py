"""Create student-facing H446 Paper 2 guide with glossary and worked examples.

Guarded from the 171-page 23 October edition. Keeps every original page and
every existing stable quiz-feedback page key, retargeting their destinations.
"""
from pathlib import Path
import io,re,json,copy
import fitz,cairosvg

ROOT=Path(__file__).resolve().parents[2]
G=ROOT/'revision/h446/guides'
PDF=G/'H446_Paper_2_REVIEW_READY_2026-10-21.pdf'
MAP=G/'paper-2-page-map.json'
TERMS=ROOT/'tools/revision/h446_paper2_terms.json'
HUB=ROOT/'h446-hub.html'
REPORT=ROOT/'docs/audits/h446-paper2-student-revision-20261027.md'
OLD='2026-10-23-stack-queue'
NEW='2026-10-27-theory-examples-terms'
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
data=json.loads(MAP.read_text())
vocab=json.loads(TERMS.read_text())
assert data['edition']==OLD and data['page_count']==171
assert len(vocab)==8 and all(5<=len(t['terms'])<=8 for t in vocab)
assert len({t['old_page'] for t in vocab})==8
source=fitz.open(PDF)
assert len(source)==171
assert all(t['old_page'] in {s['page'] for s in data['sections']} for t in vocab)
assert data['page_keys'] and len(data['page_keys'])==171
orig_toc=source.get_toc()
orig_links={i+1:p.get_links() for i,p in enumerate(source) if p.get_links()}
starts=sorted(t['old_page'] for t in vocab)
records={t['old_page']:t for t in vocab}
new_keys={n:172+i for i,n in enumerate(starts)}
def shifted(n):
    return n+sum(x<n for x in starts)

marker=[
 ('#FFF44F','.86','M3 14 Q55 10 103 13 T200 11 Q255 13 309 11 T397 13 L399 43 Q339 47 274 44 Q208 47 138 45 T3 46Z'),
 ('#FFF557','.87','M0 16 Q66 11 121 14 Q173 10 230 13 T397 10 L399 46 Q336 43 280 47 T140 45 Q70 48 2 44Z'),
 ('#FFF14B','.82','M3 12 Q76 14 133 10 T262 13 Q333 9 396 14 L397 44 Q333 48 262 44 T126 46 Q55 43 2 46Z')]
sources=[]
for color,opacity,path in marker:
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="400" height="56" viewBox="0 0 400 56" preserveAspectRatio="none"><path d="{path}" fill="{color}" fill-opacity="{opacity}"/></svg>'
    sources.append(fitz.open(stream=cairosvg.svg2pdf(bytestring=svg.encode()),filetype='pdf'))

doc=fitz.open(PDF)
def add_glossary(at,rec):
    p=doc.new_page(pno=at,width=source[0].rect.width,height=source[0].rect.height)
    p.insert_font(fontname='RevBody',fontfile=FONT)
    p.insert_font(fontname='RevBold',fontfile=BOLD)
    w,h=p.rect.width,p.rect.height
    ink=(.10,.24,.29);muted=(.34,.43,.48)
    p.draw_rect(fitz.Rect(0,0,w,27),color=None,fill=(.14,.38,.50))
    p.insert_text((43,54),'OCR H446 / PAPER 2 / '+rec['spec'],fontname='RevBold',fontsize=9,color=muted)
    p.insert_text((43,88),'Theory / Key terminology',fontname='RevBold',fontsize=21,color=ink)
    assert p.insert_textbox(fitz.Rect(43,101,w-43,140),
        'Use these exam-accurate terms when explaining algorithms and programming.',
        fontname='RevBody',fontsize=10,color=muted)>=0
    bold=fitz.Font(fontfile=BOLD)
    y=158
    for i,(word,definition) in enumerate(rec['terms']):
        p.draw_rect(fitz.Rect(43,y,w-43,y+62),color=(.85,.88,.90),fill=(.987,.992,.995),width=.6)
        x=61
        width=min(150,bold.text_length(word,fontsize=9.6)+10)
        mr=fitz.Rect(x-5,y+12,x-5+width,y+34)
        p.show_pdf_page(mr,sources[i%3],0,keep_proportion=False,overlay=True)
        assert p.insert_textbox(fitz.Rect(x,y+17,208,y+40),word,fontname='RevBold',fontsize=9.6,color=ink)>=0,(rec['spec'],word)
        assert p.insert_textbox(fitz.Rect(225,y+8,w-56,y+54),definition,fontname='RevBody',fontsize=9.6,lineheight=1.22,color=ink)>=0,(rec['spec'],word)
        # Highlighter stroke crosses the word's glyph region, not its baseline.
        ss=[s for b in p.get_text('dict')['blocks'] for l in b.get('lines',[]) for s in l['spans'] if s['text']==word and x-1<=s['bbox'][0]<=208 and y+14<=s['bbox'][1]<=y+41]
        assert len(ss)==1,(word,ss)
        bb=ss[0]['bbox']
        assert mr.y0+mr.height*9/56<=bb[1]+1 and mr.y0+mr.height*48/56>=bb[3]-1,(word,bb)
        y+=67
    assert y<h-90,(rec['spec'],y,h)
    p.insert_text((43,h-70),'REVISION / Theory → Worked examples → Exam practice → Answers',
                   fontname='RevBody',fontsize=8.5,color=muted)

for n in sorted(starts,reverse=True):
    add_glossary(n,records[n])
assert len(doc)==179

# Replace classroom process labels only; do not change example questions, solutions or marks.
changes=[]
repl_pat=re.compile(r'\b(?:I\s+DO|WE\s+DO|YOU\s+DO)\b',re.I)
regfont=fitz.Font(fontfile=FONT)
boldfont=fitz.Font(fontfile=BOLD)
for old_n in range(1,172):
    p=doc[shifted(old_n)-1]
    repl=[]
    for b in source[old_n-1].get_text('dict')['blocks']:
        for ln in b.get('lines',[]):
            for sp in ln['spans']:
                before=sp['text']
                after=before
                if re.search(r'Understand it\s*/\s*I Do\s*/\s*We Do',after,re.I):
                    after=re.sub(r'Understand it\s*/\s*I Do\s*/\s*We Do','Theory / Worked Examples',after,flags=re.I)
                else:
                    after=re.sub(r'\bI\s+DO\b','WORKED EXAMPLE 1',after,flags=re.I)
                    after=re.sub(r'\bWE\s+DO\b','WORKED EXAMPLE 2',after,flags=re.I)
                    after=re.sub(r'\bYOU\s+DO\b','EXAM PRACTICE',after,flags=re.I)
                after=re.sub(r'\bEssential key vocabulary\b','THEORY / KEY TERMINOLOGY',after,flags=re.I)
                if old_n==40 and re.search('Code first - what does it do',after,re.I):
                    after=re.sub(r'01\s*/\s*Code first - what does it do\?','Theory / Trace a recursive function',after,flags=re.I)
                if after==before:continue
                bb=fitz.Rect(sp['bbox']);x,y=sp['origin']
                f=boldfont if 'bold' in sp['font'].lower() else regfont
                size=sp['size']
                avail=p.rect.width-x-34
                if f.text_length(after,fontsize=size)>avail:
                    size*=avail/f.text_length(after,fontsize=size)
                assert size>=7.2,(old_n,before,after,size)
                col=tuple(((sp['color']>>bit)&255)/255 for bit in (16,8,0))
                repl.append((bb,x,y,after,size,'bold' in sp['font'].lower(),col,before))
    if repl:
        for bb,*_ in repl:p.add_redact_annot(bb,fill=False)
        p.apply_redactions(images=0,graphics=0)
        p.insert_font(fontname='RevBody',fontfile=FONT)
        p.insert_font(fontname='RevBold',fontfile=BOLD)
        for bb,x,y,after,size,is_bold,col,before in repl:
            p.insert_text((x,y),after,fontname='RevBold' if is_bold else 'RevBody',fontsize=size,color=col)
            changes.append((old_n,before,after))

# Remove two source text-line blocks that contain a teacher-facing
# direction. They are separate PDF blocks even though they form one paragraph.
p=doc[shifted(40)-1]
teacher_blocks=[]
for b in p.get_text('dict')['blocks']:
    if 'lines' not in b:continue
    joined=' '.join(sp['text'] for ln in b['lines'] for sp in ln['spans'])
    if ('In your Year 13 teaching' in joined
            or 'concept. Keep the code visible while tracing it' in joined):
        teacher_blocks.append((b,joined))
assert len(teacher_blocks)==2,teacher_blocks
joined=' '.join(s for b,s in teacher_blocks)
assert 'In your Year 13 teaching' in joined and 'Keep the code visible while tracing it' in joined
bb=fitz.Rect(teacher_blocks[0][0]['bbox'])
for b,_ in teacher_blocks:
    bb|=fitz.Rect(b['bbox'])
    p.add_redact_annot(fitz.Rect(b['bbox']),fill=False)
p.apply_redactions(images=0,graphics=0)
p.insert_font(fontname='RevBody',fontfile=FONT)
new_instruction=('Trace the short C# function below. Follow each recursive call and return '
                 'while keeping the code visible.')
rc=p.insert_textbox(fitz.Rect(bb.x0,bb.y0-2,p.rect.width-42,bb.y1+14),
                    new_instruction,fontname='RevBody',fontsize=10,lineheight=1.25,
                    color=(.12,.25,.29))
assert rc>=0,rc

# Update printed page numbers in the contents index without changing its topic labels.
contents=doc[0]
w,h=contents.rect.width,contents.rect.height
replacements=[]
for b in contents.get_text('dict')['blocks']:
    for ln in b.get('lines',[]):
        for sp in ln['spans']:
            t=sp['text'].strip()
            if t.isdigit() and sp['bbox'][0]>w-110 and sp['bbox'][1]<h-53 and int(t)>=2:
                replacements.append((sp,shifted(int(t))))
                contents.add_redact_annot(fitz.Rect(sp['bbox'])+(-.25,-.25,.25,.25),fill=(.933,.961,.969))
assert len(replacements)>=12,('Contents page numbers',len(replacements))
contents.apply_redactions(images=0,graphics=0)
contents.insert_font(fontname='RevBold',fontfile=BOLD)
for sp,newnum in replacements:
    size=sp['size']
    x=sp['bbox'][2]-boldfont.text_length(str(newnum),fontsize=size)
    contents.insert_text((x,sp['origin'][1]),str(newnum),fontname='RevBold',fontsize=size,color=(.09,.25,.29))

# Restore all hyperlinks AFTER contents-number redactions, which can remove overlapping links.
# Remap every original link including the contents page.
for old_n,links in orig_links.items():
    p=doc[shifted(old_n)-1]
    for link in p.get_links():p.delete_link(link)
    for it in links:
        copy_link=copy.deepcopy(it)
        copy_link.pop('xref',None);copy_link.pop('id',None)
        if copy_link['kind']==fitz.LINK_GOTO:
            copy_link['page']=shifted(copy_link['page']+1)-1
        p.insert_link(copy_link)

# Refresh all original printed footer numbers. Glossary-page footers are added below.
for old_n in range(1,172):
    p=doc[shifted(old_n)-1]
    w,h=p.rect.width,p.rect.height
    number=str(shifted(old_n))
    # The old footer is only in the bottom-right corner of each page.
    if old_n>1:
        p.add_redact_annot(fitz.Rect(w-90,h-48,w-24,h-16),fill=(1,1,1))
        p.apply_redactions(images=0,graphics=0)
        p.insert_text((w-46-fitz.get_text_length(number,fontname='helv',fontsize=8),h-31),
                      number,fontname='helv',fontsize=8,color=(.09,.25,.29))
for n in starts:
    page_no=shifted(n)+1
    p=doc[page_no-1];w,h=p.rect.width,p.rect.height
    p.insert_text((w-46-fitz.get_text_length(str(page_no),fontname='helv',fontsize=8),h-31),
                  str(page_no),fontname='helv',fontsize=8,color=(.09,.25,.29))

toc=[]
for level,title,oldnum in orig_toc:
    toc.append([level,title,shifted(oldnum)])
    if oldnum in records:
        toc.append([min(3,level+1),records[oldnum]['spec']+' / Key terminology',shifted(oldnum)+1])
doc.set_toc(toc)
doc.set_page_labels([{'startpage':0,'prefix':'','style':'D','firstpagenum':1}])

temp=PDF.with_suffix('.revision.tmp.pdf')
doc.save(temp,garbage=4,deflate=True)
doc.close()
updated=fitz.open(temp)
assert len(updated)==179
assert len(changes)>=70,len(changes)
unwanted=[i+1 for i,page in enumerate(updated) if repl_pat.search(page.get_text())]
assert not unwanted,('Remaining classroom labels',unwanted)
assert 'In your Year 13 teaching' not in updated[shifted(40)-1].get_text()
assert all(t[2] in range(1,180) for t in updated.get_toc())
assert len(updated[0].get_links())==len(orig_links.get(1,[]))
for rec in vocab:
    p=updated[shifted(rec['old_page'])] # glossary after first page
    txt=' '.join(p.get_text().split())
    assert 'Theory / Key terminology' in txt
    for word,definition in rec['terms']:
        assert word in txt and ' '.join(definition.split()) in txt
    assert p.get_pixmap(matrix=fitz.Matrix(1.25,1.25)).width>600
updated.close()

for key,page in data['page_keys'].items():
    data['page_keys'][key]=shifted(page)
for s in data['sections']:
    old_page=s['page']
    s['page']=shifted(old_page)
    if old_page in records:
        s['old_pages'].append(new_keys[old_page])
for row in data.get('added_pages',[]):
    row['page']=shifted(row['page'])
for n in starts:
    rec=records[n]
    data.setdefault('added_pages',[]).append({'key':new_keys[n],'page':shifted(n)+1,
                        'spec':rec['spec'],'title':'Theory / Key terminology'})
    data['page_keys'][str(new_keys[n])]=shifted(n)+1
data['page_count']=179
data['edition']=NEW
assert set(data['page_keys'].values())==set(range(1,180))
MAP.write_text(json.dumps(data,indent=2)+'\n')
hub=HUB.read_text()
assert OLD in hub
HUB.write_text(hub.replace(OLD,NEW))
PDF.write_bytes(temp.read_bytes())
temp.unlink()
REPORT.write_text('# H446 Paper 2 student revision edition — 27 October 2026\n\n'
                  '- 171 original pages retained; 8 new terminology pages added; 179 pages total.\n'
                  '- 81 or more classroom label instances migrated to Worked Example language.\n'
                  f'- {len(changes)} heading/text spans rewritten without changing question content.\n'
                  '- Updated teacher-facing recursion instruction into a student-facing trace task.\n'
                  '- All 171 old page keys preserved; new keys 172–179 identify terminology pages.\n'
                  '- Contents links, bookmarks, printed footers and guide lookup must be audited before publication.\n'
                  '- Five pre-existing vocabulary pages remain intact for later marker styling.\n\n'
                  '## New vocabulary pages\n\n'+
                  '\n'.join(f"- {records[n]['spec']}: p.{shifted(n)+1}" for n in starts)+'\n')
print(f'PASS H446 Paper 2: 171 to 179 pages; {len(changes)} spans relabelled; eight glossary pages; stable keys retained.')
