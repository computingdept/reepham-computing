"""Complete Paper 1 specification-section terminology by adding logic glossary.

A guarded 263->264-page migration. Preserves every old quiz stable key;
remaps contents links, bookmarks, printed page labels and cross-references.
"""
from pathlib import Path
import fitz,cairosvg,json,re,copy
R=Path(__file__).resolve().parents[2];G=R/'revision/h446/guides'
PDF=G/'H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf'
MAP=G/'paper-1-page-map.json';HUB=R/'h446-hub.html'
REPORT=R/'docs/audits/h446-paper1-logic-vocabulary-20261027.md'
OLD='2026-10-27-all-keywords'
NEW='2026-10-27-complete-vocabulary'
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
data=json.loads(MAP.read_text())
assert data['edition']==OLD and data['page_count']==263 and '264' not in data['page_keys']
old=fitz.open(PDF)
assert len(old)==263
links={i+1:p.get_links() for i,p in enumerate(old) if p.get_links()}
toc=old.get_toc()
INSERT_AFTER=224
def shift(n):return n+int(n>INSERT_AFTER)
terms=[
 ("AND","Produces 1 only when both binary inputs are 1."),
 ("OR","Produces 1 when at least one binary input is 1."),
 ("NOT","Inverts a single binary input."),
 ("XOR","Produces 1 when exactly one of two inputs is 1."),
 ("De Morgan's laws","Rules for distributing NOT across AND and OR expressions."),
 ("Karnaugh map","Gray-code grid used to group adjacent 1s and simplify logic."),
 ("Half/full adders","Combinational circuits generating sum and carry outputs."),
 ("D-type flip-flop","Stores one bit and captures D at the selected clock event.")
]
marker=[
 ('#FFF44F','.86','M3 14 Q55 10 103 13 T200 11 Q255 13 309 11 T397 13 L399 43 Q339 47 274 44 Q208 47 138 45 T3 46Z'),
 ('#FFF557','.87','M0 16 Q66 11 121 14 Q173 10 230 13 T397 10 L399 46 Q336 43 280 47 T140 45 Q70 48 2 44Z'),
 ('#FFF14B','.82','M3 12 Q76 14 133 10 T262 13 Q333 9 396 14 L397 44 Q333 48 262 44 T126 46 Q55 43 2 46Z')]
sources=[]
for color,alpha,path in marker:
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="400" height="56" viewBox="0 0 400 56" preserveAspectRatio="none"><path d="{path}" fill="{color}" fill-opacity="{alpha}"/></svg>'
 sources.append(fitz.open(stream=cairosvg.svg2pdf(bytestring=svg.encode()),filetype='pdf'))
doc=fitz.open(PDF)
p=doc.new_page(pno=INSERT_AFTER,width=old[0].rect.width,height=old[0].rect.height)
w,h=p.rect.width,p.rect.height
p.insert_font(fontname='RevBody',fontfile=FONT)
p.insert_font(fontname='RevBold',fontfile=BOLD)
ink=(.10,.24,.29);muted=(.34,.43,.48)
p.draw_rect(fitz.Rect(0,0,w,27),color=None,fill=(.14,.38,.50))
p.insert_text((43,54),'OCR H446 / PAPER 1 / 1.4.3',fontname='RevBold',fontsize=9,color=muted)
p.insert_text((43,88),'Theory / Key terminology',fontname='RevBold',fontsize=21,color=ink)
assert p.insert_textbox(fitz.Rect(43,101,w-43,140),
    'Use these exam-accurate terms when explaining logic hardware and Boolean algebra.',
    fontname='RevBody',fontsize=10,color=muted)>=0
bold=fitz.Font(fontfile=BOLD)
y=158
for i,(word,definition) in enumerate(terms):
 p.draw_rect(fitz.Rect(43,y,w-43,y+62),color=(.85,.88,.90),fill=(.987,.992,.995),width=.6)
 x=61
 width=min(150,bold.text_length(word,fontsize=9.6)+10)
 mr=fitz.Rect(x-5,y+12,x-5+width,y+34)
 p.show_pdf_page(mr,sources[i%3],0,keep_proportion=False,overlay=True)
 assert p.insert_textbox(fitz.Rect(x,y+17,208,y+40),word,fontname='RevBold',fontsize=9.6,color=ink)>=0,word
 assert p.insert_textbox(fitz.Rect(225,y+8,w-56,y+54),definition,fontname='RevBody',fontsize=9.6,lineheight=1.22,color=ink)>=0,word
 ss=[s for b in p.get_text('dict')['blocks'] for ln in b.get('lines',[]) for s in ln['spans'] if s['text']==word and x-1<=s['bbox'][0]<=208 and y+14<=s['bbox'][1]<=y+41]
 assert len(ss)==1,(word,ss)
 b=ss[0]['bbox']
 assert mr.y0+mr.height*(9/56)<=b[1]+1 and mr.y0+mr.height*(48/56)>=b[3]-1,(word,b)
 y+=67
assert y<h-90
p.insert_text((43,h-70),'REVISION / Theory → Worked examples → Exam practice → Answers',
              fontname='RevBody',fontsize=8.5,color=muted)
p.insert_text((w-46-fitz.get_text_length('225',fontname='helv',fontsize=8),h-31),
              '225',fontname='helv',fontsize=8,color=(.09,.25,.29))
assert len(doc)==264

# Cross-reference targets were already remapped by the earlier 253->263 migration.
# Their printed numbers require one further increment because this insertion is before them.
for original,targets,expected in [(235,{231},1),(251,{248,252},3)]:
 q=doc[shift(original)-1]
 found=[]
 for block in q.get_text('dict')['blocks']:
  for line in block.get('lines',[]):
   for span in line['spans']:
    if span['text'].strip() in {str(v) for v in targets} and span['bbox'][1]<q.rect.height-52:
     found.append(span)
     q.add_redact_annot(fitz.Rect(span['bbox'])+(-.1,-.1,.1,.1),fill=False)
 assert len(found)==expected,('printed references',original,[(x['text'],x['bbox']) for x in found])
 q.apply_redactions(images=0,graphics=0)
 q.insert_font(fontname='RevBody',fontfile=FONT)
 q.insert_font(fontname='RevBold',fontfile=BOLD)
 for sp in found:
  text=str(shift(int(sp['text'].strip())))
  fn='RevBold' if 'bold' in sp['font'].lower() else 'RevBody'
  rgb=tuple(((sp['color']>>k)&255)/255 for k in (16,8,0))
  q.insert_text(sp['origin'],text,fontname=fn,fontsize=sp['size'],color=rgb)

# Rewrite printed page numbers on the contents page.
contents=doc[0];W,H=contents.rect.width,contents.rect.height
nums=[]
for b in contents.get_text('dict')['blocks']:
 for ln in b.get('lines',[]):
  for sp in ln['spans']:
   t=sp['text'].strip()
   if t.isdigit() and sp['bbox'][0]>W-110 and sp['bbox'][1]<H-53 and int(t)>=2:
    nums.append((sp,shift(int(t))))
    contents.add_redact_annot(fitz.Rect(sp['bbox'])+(-.25,-.25,.25,.25),fill=(.933,.961,.969))
assert len(nums)>=12,len(nums)
contents.apply_redactions(images=0,graphics=0)
contents.insert_font(fontname='RevBold',fontfile=BOLD)
for sp,target in nums:
 x=sp['bbox'][2]-bold.text_length(str(target),fontsize=sp['size'])
 contents.insert_text((x,sp['origin'][1]),str(target),fontname='RevBold',fontsize=sp['size'],color=(.09,.25,.29))

# Restore links after the contents redaction so no annotation is lost.
for n,old_links in links.items():
 q=doc[shift(n)-1]
 for link in q.get_links():q.delete_link(link)
 for link in old_links:
  item=copy.deepcopy(link)
  item.pop('xref',None);item.pop('id',None)
  if item['kind']==fitz.LINK_GOTO:item['page']=shift(item['page']+1)-1
  q.insert_link(item)

# Update footers without disturbing diagrams, examples or tables.
for n in range(2,264):
 q=doc[shift(n)-1]
 w,h=q.rect.width,q.rect.height
 number=str(shift(n))
 q.add_redact_annot(fitz.Rect(w-90,h-48,w-24,h-16),fill=(1,1,1))
 q.apply_redactions(images=0,graphics=0)
 q.insert_text((w-46-fitz.get_text_length(number,fontname='helv',fontsize=8),h-31),
               number,fontname='helv',fontsize=8,color=(.09,.25,.29))
ntoc=[]
for level,title,oldno in toc:
 ntoc.append([level,title,shift(oldno)])
 if oldno==INSERT_AFTER:
  ntoc.append([min(3,level+1),'1.4.3 / Key terminology',INSERT_AFTER+1])
doc.set_toc(ntoc)
doc.set_page_labels([{'startpage':0,'prefix':'','style':'D','firstpagenum':1}])
tmp=PDF.with_suffix('.logic-vocab.tmp.pdf')
doc.save(tmp,garbage=4,deflate=True)
doc.close()
check=fitz.open(tmp)
assert len(check)==264
assert len(check[0].get_links())==len(links.get(1,[]))
assert len(check.get_toc())==len(toc)+1
assert all(1<=row[2]<=264 for row in check.get_toc())
text=' '.join(check[224].get_text().split())
for term,definition in terms:
 assert term in text and ' '.join(definition.split()) in text,term
assert check[224].get_pixmap(matrix=fitz.Matrix(1.25,1.25)).width>600
check.close()

for key,page in data['page_keys'].items():data['page_keys'][key]=shift(page)
data['page_keys']['264']=225
for row in data['added_pages']:row['page']=shift(row['page'])
data['added_pages'].append({'key':264,'page':225,'spec':'1.4.3','title':'Theory / Key terminology'})
for s in data['sections']:
 s['page']=shift(s['page'])
 if s['spec']=='1.4.3':s['old_pages'].append(264)
data['page_count']=264;data['edition']=NEW
assert len(data['page_keys'])==264 and set(data['page_keys'].values())==set(range(1,265))
MAP.write_text(json.dumps(data,indent=2)+'\n')
hub=HUB.read_text()
old_path='H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf?v='+OLD
new_path='H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf?v='+NEW
assert hub.count(old_path)==2,hub.count(old_path)
HUB.write_text(hub.replace(old_path,new_path))
PDF.write_bytes(tmp.read_bytes());tmp.unlink()
REPORT.write_text(
 '# H446 Paper 1 / Final section terminology\n\n'
 '- Added a dedicated 1.4.3 Boolean logic glossary on PDF page 225.\n'
 '- Eight OCR-aligned terms with the same yellow marker strokes as lessons.\n'
 '- 263 prior pages retained; total 264 pages; old stable page keys unchanged.\n'
 '- Renumbered contents, footers, bookmarks, four internal references and legacy feedback destinations.\n'
 '- Original question banks, saved scores and classroom lessons untouched.\n'
)
print('PASS: Paper 1 complete, 264 pages; logic terminology key 264, old 263 feedback keys preserved')
