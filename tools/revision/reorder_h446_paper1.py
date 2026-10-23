"""Reorder the approved 249-page Paper 1 edition without dropping page content.
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
PDF=ROOT/'revision/h446/guides/H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf'
SOURCE=ROOT/'tmp/pdfs/spec-order/original.pdf'
TARGET=ROOT/'tmp/pdfs/spec-order/reordered.pdf'
R=lambda a,b:list(range(a,b+1))
GROUPS=[
 ('1.1.1','Processor structure and architecture',R(2,13)+[24]+R(14,16)+[25]),
 ('1.1.2','Types of processor',R(17,23)),
 ('1.1.3','Input, output and storage',R(193,199)),
 ('1.2.1','Systems software and operating systems',R(26,32)+R(49,56)+R(38,48)+R(33,37)+R(57,63)),
 ('1.2.2','Applications generation',R(64,74)),
 ('1.2.3','Software development',R(200,207)),
 ('1.2.4','Types of programming language',R(223,234)+R(218,222)),
 ('1.3.1','Compression, encryption and hashing',R(75,79)+R(235,238)),
 ('1.3.2','Databases',R(80,84)+R(92,101)+R(85,91)+[103,104,102]+R(105,109)),
 ('1.3.3','Networks',R(110,121)),
 ('1.3.4','Web technologies',R(122,127)),
 ('1.4.1','Data types and representation',R(139,141)+R(128,138)),
 ('1.4.2','Data structures',R(142,172)+R(239,242)),
 ('1.4.3','Boolean algebra and logic hardware',R(173,183)+R(190,192)+R(184,189)),
 ('1.5','Legal, moral, cultural and ethical issues',R(208,217)),
 ('RECALL','Mixed memory banks',R(243,249)),
]
order=[1]+[n for _,_,pages in GROUPS for n in pages]
assert len(order)==249 and sorted(order)==R(1,249)
page_map={old:new for new,old in enumerate(order,1)}
if not SOURCE.exists():
 assert 'Specification Order' not in fitz.open(PDF).metadata.get('title',''), 'Provide the pre-reorder PDF at tmp/pdfs/spec-order/original.pdf; do not reorder this edition again.'
 SOURCE.parent.mkdir(parents=True,exist_ok=True);SOURCE.write_bytes(PDF.read_bytes())
original=fitz.open(SOURCE);assert len(original)==249
old_toc=original.get_toc();doc=fitz.open(SOURCE)
# Repair the four true PDF page references. Virtual-memory page numbers are data and are untouched.
ref_changes={182:{178:page_map[178]},212:{209:page_map[209],213:page_map[213]}}
for oldnum,targets in ref_changes.items():
 page=doc[oldnum-1];replacements=[]
 for block in page.get_text('dict')['blocks']:
  for line in block.get('lines',[]):
   for span in line['spans']:
    for match in re.finditer(r'\b(?:PDF )?page (\d+)\b',span['text']):
     old=int(match[1])
     if old not in targets:continue
     # Locate the numeral within this exact span and retain the original baseline.
     spanrect=fitz.Rect(span['bbox']);rects=[r for r in page.search_for(str(old)) if spanrect.intersects(r)]
     assert len(rects)==1,(oldnum,old,rects)
     r=rects[0];replacements.append((r,span,targets[old]));page.add_redact_annot(fitz.Rect(r.x0+.1,r.y0+.1,r.x1-.1,r.y1-.1),fill=(1,1,1))
 page.apply_redactions(images=0,graphics=0)
 for r,span,new in replacements:
  font='helv' if span['font']=='Helvetica' else 'guideBody'
  if font=='guideBody':page.insert_font(fontname=font,fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
  rgb=tuple(((span['color']>>shift)&255)/255 for shift in [16,8,0])
  page.insert_text((r.x0,span['origin'][1]),str(new),fontname=font,fontsize=span['size'],color=rgb)
 assert len(replacements)==(1 if oldnum==182 else 3)
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
c.setFillColor(blue);c.rect(0,h-27,w,10,fill=1,stroke=0);c.setFillColor(ink);c.setFont('GuideBold',21);c.drawString(42,h-64,'Paper 1 / Computer Systems');c.setFont('GuideBody',9);c.drawString(42,h-84,'OCR H446/01 / Specification order');c.setFont('GuideBody',9);c.drawString(42,h-108,'Choose a topic. Page numbers match the PDF viewer.');y=h-137
links=[]
for idx,(spec,title,pages) in enumerate(GROUPS):
 if idx in [0,3,7,11,14,15]:
  if idx:y-=7
  group={0:'1.1 / Processors, input, output and storage',3:'1.2 / Software and software development',7:'1.3 / Exchanging data',11:'1.4 / Data types, data structures and algorithms',14:'1.5 / Legal, moral, cultural and ethical issues',15:'Mixed revision'}[idx]
  c.setFillColor(ink);c.setFont('GuideBold',10);c.drawString(42,y,group);y-=15
 start=page_map[pages[0]];label=(spec+' / '+title) if spec not in ['1.5','RECALL'] else ('1.5.1–1.5.2 / Legislation and ethical argument' if spec=='1.5' else title)
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
doc.set_toc(toc);doc.set_page_labels([{'startpage':0,'prefix':'','style':'D','firstpagenum':1}]);meta=doc.metadata;meta['title']='OCR H446 Paper 1 Computer Systems - Specification Order';meta['subject']='RHSC revision guide: complete topic blocks, continuous page numbers and remapped destinations';doc.set_metadata(meta);doc.save(TARGET,garbage=4,deflate=True)
# Audit retention independently of visual footer changes.
final=fitz.open(TARGET);assert len(final)==len(original)==249
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
MAP=ROOT/'revision/h446/guides/paper-1-page-map.json';MAP.write_text(json.dumps({'edition':'2026-10-23-spec-order','source_sha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'page_count':249,'page_keys':page_map,'sections':[{'spec':s,'title':t,'page':page_map[p[0]],'old_pages':p} for s,t,p in GROUPS]},indent=2)+'\n')
AUDIT=ROOT/'docs/audits/h446-paper1-page-order-20261023.csv';AUDIT.parent.mkdir(parents=True,exist_ok=True)
with AUDIT.open('w',newline='') as f:
 writer=csv.writer(f);writer.writerow(['stable_page_key','new_pdf_page','specification_section']);writer.writerow([1,1,'contents'])
 for spec,_,pages in GROUPS:
  for old in pages:writer.writerow([old,page_map[old],spec])
for old in [1,193,200,223,235,139,239,173,209,212,213,214,217]:
 new=page_map[old];final[new-1].get_pixmap(matrix=fitz.Matrix(1.1,1.1)).save(ROOT/f'tmp/pdfs/spec-order/check-old-{old}-new-{new}.png')
print('PASS: all 249 page keys used once; all 246 non-reference content bodies pixel-identical; four internal reference numbers remapped; continuous footers; 16 contents links and 53 bookmarks checked.')
print('Sections:',[(s,page_map[p[0]]) for s,_,p in GROUPS]);print('PDF:',TARGET)
