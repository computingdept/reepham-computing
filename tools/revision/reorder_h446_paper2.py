"""Reorder the approved 169-page Paper 2 edition without dropping page content.
Page keys in guide-links.js are stable IDs from the pre-reorder edition.
"""
from pathlib import Path
import io,json,re,csv,hashlib
import fitz
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
ROOT=Path(__file__).resolve().parents[2]
PDF=ROOT/'revision/h446/guides/H446_Paper_2_REVIEW_READY_2026-10-21.pdf'
SOURCE=ROOT.parent/'tmp/pdfs/paper2-spec-order/original.pdf'
TARGET=ROOT.parent/'tmp/pdfs/paper2-spec-order/reordered.pdf'
R=lambda a,b:list(range(a,b+1))
GROUPS=[
 ('2.1.1-2.1.4','Abstractly, ahead, procedurally and logically',R(2,6)+R(111,117)),
 ('2.1.5','Thinking concurrently',R(101,105)),
 ('2.2.1(a)','Constructs and integrated programming practice',R(7,20)+R(118,124)),
 ('2.2.1(b)','Recursion and the call stack',R(49,57)),
 ('2.2.1(c)','Global and local scope',R(35,37)),
 ('2.2.1(d)','Subroutines, parameters, files and modularity',R(21,34)),
 ('2.2.1(e)','Debugging with an IDE',R(43,48)),
 ('2.2.1(f)','Object-oriented programming',R(38,42)),
 ('2.2.2','Computational methods and worked applications',R(58,62)+R(125,139)),
 ('2.3.1(a)-(d)','Algorithm design, tracing and complexity',R(106,110)+R(140,153)+R(63,67)),
 ('2.3.1(e)','Algorithms for data structures and trees',R(95,100)+R(83,94)),
 ('2.3.1(f)','Searching and sorting',R(68,77)+R(154,159)),
 ('2.3.1(f)','Dijkstra and A* pathfinding',R(78,82)+R(160,165)),
 ('RECALL','Mixed memory banks',R(166,169)),
]
order=[1]+[n for _,_,pages in GROUPS for n in pages]
assert len(order)==169 and sorted(order)==R(1,169)
page_map={old:new for new,old in enumerate(order,1)}
if not SOURCE.exists():
 assert 'Specification Order' not in fitz.open(PDF).metadata.get('title',''), 'Provide the pre-reorder PDF at tmp/pdfs/spec-order/original.pdf; do not reorder this edition again.'
 SOURCE.parent.mkdir(parents=True,exist_ok=True);SOURCE.write_bytes(PDF.read_bytes())
original=fitz.open(SOURCE);assert len(original)==169
old_toc=original.get_toc();doc=fitz.open(SOURCE)
# No numeric internal page references occur in this source edition.
ref_changes={}
doc.select([n-1 for n in order])
# Continuous footer numbers match PDF page destinations, replacing old local booklet numbers.
for i,page in enumerate(doc):
 if i==0:continue
 candidates=[]
 for block in page.get_text('dict')['blocks']:
  for line in block.get('lines',[]):
   for span in line['spans']:
    if span['bbox'][1]>page.rect.height-48 and (span['bbox'][0]>page.rect.width*.7 or re.fullmatch(r'\d+',span['text'].strip())):candidates.append(fitz.Rect(span['bbox']))
 for r in candidates:page.add_redact_annot(r+(-.5,-.5,.5,.5),fill=(1,1,1))
 if candidates:page.apply_redactions(images=0,graphics=0)
 page.insert_text((page.rect.width-46-fitz.get_text_length(str(i+1),fontname='helv',fontsize=8),page.rect.height-31),str(i+1),fontname='helv',fontsize=8,color=(.09,.25,.29))
# One clear contents page: whole subsections in specification order, without truncated labels.
pdfmetrics.registerFont(TTFont('GuideBody','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('GuideBold','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
w,h=doc[0].rect.width,doc[0].rect.height;b=io.BytesIO();c=canvas.Canvas(b,pagesize=(w,h));ink=HexColor('#173f4a');blue=HexColor('#327b99');pale=HexColor('#eef5f7')
c.setFillColor(blue);c.rect(0,h-27,w,10,fill=1,stroke=0);c.setFillColor(ink);c.setFont('GuideBold',21);c.drawString(42,h-64,'Paper 2 / Algorithms and Programming');c.setFont('GuideBody',9);c.drawString(42,h-84,'OCR H446/02 / Specification order');c.setFont('GuideBody',9);c.drawString(42,h-108,'Choose a topic. Page numbers match the PDF viewer.');y=h-137
links=[]
for idx,(spec,title,pages) in enumerate(GROUPS):
 if idx in [0,2,8,9,13]:
  if idx:y-=7
  group={0:'2.1 / Elements of computational thinking',2:'2.2.1 / Programming techniques',8:'2.2.2 / Computational methods',9:'2.3.1 / Algorithms',13:'Mixed revision'}[idx]
  c.setFillColor(ink);c.setFont('GuideBold',10);c.drawString(42,y,group);y-=15
 start=page_map[pages[0]];label=(spec+' / '+title) if spec!='RECALL' else title
 c.setFillColor(pale);c.roundRect(42,y-22,w-84,27,3,fill=1,stroke=0);c.setFillColor(ink);c.setFont('GuideBody',9);assert pdfmetrics.stringWidth(label,'GuideBody',9)<w-160,label;c.drawString(51,y-12,label);c.setFont('GuideBold',9);c.drawRightString(w-51,y-12,str(start));links.append((fitz.Rect(42,h-(y+5),w-42,h-(y-22)),start));y-=29
assert y>75,y
c.setFont('GuideBody',8);c.setFillColor(ink);c.drawString(42,48,'Worked examples, practice and answers stay within each topic.');c.drawRightString(w-46,31,'1');c.save();tocdoc=fitz.open(stream=b.getvalue(),filetype='pdf')
page=doc[0]
for l in page.get_links():page.delete_link(l)
page.add_redact_annot(page.rect,fill=(1,1,1));page.apply_redactions(images=2,graphics=2);page.show_pdf_page(page.rect,tocdoc,0)
for rect,target in links:page.insert_link({'kind':fitz.LINK_GOTO,'from':rect,'page':target-1,'to':fitz.Point(0,0)})
# Retain the old detailed bookmarks under their reordered subsection headings.
toc=[]
for spec,title,pages in GROUPS:
 toc.append([1,spec+' / '+title,page_map[pages[0]]])
 for _,label,old in sorted((t for t in old_toc if t[2] in pages),key=lambda t:page_map[t[2]]):toc.append([2,label,page_map[old]])
doc.set_toc(toc);doc.set_page_labels([{'startpage':0,'prefix':'','style':'D','firstpagenum':1}]);meta=doc.metadata;meta['title']='OCR H446 Paper 2 Algorithms and Programming - Specification Order';meta['subject']='RHSC revision guide: complete topic blocks, continuous page numbers and remapped destinations';doc.set_metadata(meta);doc.save(TARGET,garbage=4,deflate=True)
# Audit retention independently of visual footer changes.
final=fitz.open(TARGET);assert len(final)==len(original)==169
for new,old in enumerate(order,1):
 if old==1:continue
 a=original[old-1];z=final[new-1];assert a.rect==z.rect
 clip=fitz.Rect(0,0,a.rect.width,a.rect.height-51)
 if old not in ref_changes:assert a.get_pixmap(matrix=fitz.Matrix(.7,.7),clip=clip).samples==z.get_pixmap(matrix=fitz.Matrix(.7,.7),clip=clip).samples,('Body changed',old,new)
 assert re.search(r'\b'+str(new)+r'\b',z.get_text(clip=fitz.Rect(z.rect.width-80,z.rect.height-46,z.rect.width,z.rect.height))),('Footer',old,new)
assert len(final[0].get_links())==len(GROUPS)
for link,(_,_,pages) in zip(final[0].get_links(),GROUPS):assert link['page']+1==page_map[pages[0]]
assert len(final.get_toc())==len(GROUPS)+len(old_toc)
# Test every pre-existing detailed bookmark now lands on the same topic page.
for _,label,old in old_toc:assert any(t[1]==label and t[2]==page_map[old] for t in final.get_toc())
MAP=ROOT/'revision/h446/guides/paper-2-page-map.json';MAP.write_text(json.dumps({'edition':'2026-10-23-spec-order','source_sha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'page_count':169,'page_keys':page_map,'sections':[{'spec':s,'title':t,'page':page_map[p[0]],'old_pages':p} for s,t,p in GROUPS]},indent=2)+'\n')
AUDIT=ROOT/'docs/audits/h446-paper2-page-order-20261023.csv';AUDIT.parent.mkdir(parents=True,exist_ok=True)
with AUDIT.open('w',newline='') as f:
 writer=csv.writer(f,lineterminator='\n');writer.writerow(['stable_page_key','new_pdf_page','specification_section']);writer.writerow([1,1,'contents'])
 for spec,_,pages in GROUPS:
  for old in pages:writer.writerow([old,page_map[old],spec])
for old in [1,101,111,118,49,21,125,106,95,154,160]:
 new=page_map[old];final[new-1].get_pixmap(matrix=fitz.Matrix(1.1,1.1)).save(TARGET.parent/f'check-old-{old}-new-{new}.png')
print('PASS: all 169 page keys used once; all 168 content bodies pixel-identical; continuous footers; contents links and all original bookmarks checked.')
print('Sections:',[(s,page_map[p[0]]) for s,_,p in GROUPS]);print('PDF:',TARGET)
