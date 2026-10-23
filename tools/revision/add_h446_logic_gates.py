"""Insert two logic foundation pages into the 250-page character-sets edition.
Requires the original spec-order PDF and map; refuses repeat application.
"""
from pathlib import Path
import io,json,hashlib,re
import fitz
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
ROOT=Path(__file__).resolve().parents[2];WORK=ROOT.parent/'tmp/pdfs/logic-gates';WORK.mkdir(parents=True,exist_ok=True)
PDF=ROOT/'revision/h446/guides/H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf';MAP=ROOT/'revision/h446/guides/paper-1-page-map.json'
data=json.loads(MAP.read_text());assert data['page_count']==250 and '251' not in data['page_keys'],'Requires the pre-insertion edition'
source=WORK/'before.pdf';source.write_bytes(PDF.read_bytes());(WORK/'before-map.json').write_text(json.dumps(data));original=fitz.open(source);doc=fitz.open(source)
insert_at=213 # new pages 214-215, before the existing 1.4.3 block
shift=lambda page:page+2 if page>=214 else page
toc=original.get_toc();contents_links=original[0].get_links()
for link in doc[0].get_links():doc[0].delete_link(link)
from h446_logic_gate_pages import build
w,h=original[0].rect.width,original[0].rect.height
b=io.BytesIO(build(w,h))
new=fitz.open(stream=b.getvalue(),filetype='pdf');doc.insert_pdf(new,start_at=insert_at)
# Update all later footer numbers and the contents' visible section destinations.
for old in range(214,251):
 p=doc[shift(old)-1];rect=fitz.Rect(w-90,h-46,w-35,h-23);p.add_redact_annot(rect,fill=(1,1,1));p.apply_redactions(images=0,graphics=0);number=str(shift(old));p.insert_text((w-46-fitz.get_text_length(number,fontname='helv',fontsize=8),h-31),number,fontname='helv',fontsize=8,color=(.09,.25,.29))
p=doc[0];replacements=[]
for block in p.get_text('dict')['blocks']:
 for line in block.get('lines',[]):
  for span in line['spans']:
   s=span['text']
   if s.isdigit() and int(s)>214 and span['bbox'][0]>w-100:
    replacements.append((span,shift(int(s))));p.add_redact_annot(fitz.Rect(span['bbox'])+(-.2,-.2,.2,.2),fill=(.9333,.9608,.9686))
p.apply_redactions(images=0,graphics=0);p.insert_font(fontname='GuideBold',fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
for span,value in replacements:
 s=str(value);p.insert_text((w-51-fitz.Font(fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf').text_length(s,fontsize=9),span['origin'][1]),s,fontname='GuideBold',fontsize=9,color=(.09,.25,.29))
for link in contents_links:p.insert_link({'kind':fitz.LINK_GOTO,'from':link['from'],'page':(214 if link['page']+1==214 else shift(link['page']+1))-1,'to':fitz.Point(0,0)})
# Four existing printed cross-references were separate numeric spans after the previous reorder.
for old,targets,expected in [(223,{219},1),(238,{235,239},3)]:
 p=doc[shift(old)-1];found=[]
 for block in p.get_text('dict')['blocks']:
  for line in block.get('lines',[]):
   for span in line['spans']:
    if span['text'] in {str(n) for n in targets} and span['bbox'][1]<h-51:
     found.append(span);p.add_redact_annot(fitz.Rect(span['bbox'])+(-.05,-.05,.05,.05),fill=(1,1,1))
 assert len(found)==expected,(old,found)
 p.apply_redactions(images=0,graphics=0)
 for span in found:
  font='helv' if span['font']=='Helvetica' else 'GuideBody'
  if font=='GuideBody':p.insert_font(fontname=font,fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
  rgb=tuple(((span['color']>>k)&255)/255 for k in [16,8,0]);p.insert_text(span['origin'],str(shift(int(span['text']))),fontname=font,fontsize=span['size'],color=rgb)
newtoc=[]
for level,label,page in toc:
 if level==1 and label.startswith('1.4.3'):
  newtoc.append([level,label,214])
  newtoc.extend([[2,'1.4.3(d) / Logic gates and truth tables',214],[2,'1.4.3(a), (d) / From a problem to a truth table',215]])
 else:newtoc.append([level,label,shift(page)])
doc.set_toc(newtoc);doc.set_page_labels([{'startpage':0,'prefix':'','style':'D','firstpagenum':1}]);doc.save(WORK/'after.pdf',garbage=4,deflate=True)
after=fitz.open(WORK/'after.pdf');assert len(after)==252
for old in range(2,251):
 if old in [223,238]:continue
 a=original[old-1];z=after[shift(old)-1];clip=fitz.Rect(0,0,w,h-51);assert a.get_pixmap(matrix=fitz.Matrix(.7,.7),clip=clip).samples==z.get_pixmap(matrix=fitz.Matrix(.7,.7),clip=clip).samples,old
for key,page in data['page_keys'].items():data['page_keys'][key]=shift(page)
data['page_keys']['251']=214;data['page_keys']['252']=215;data['page_count']=252;data['edition']='2026-10-23-logic-gates'
data['added_pages'] += [{'key':251,'page':214,'spec':'1.4.3(d)','title':'Logic gates and truth tables'},{'key':252,'page':215,'spec':'1.4.3(a), (d)','title':'From a problem to a truth table'}]
for section in data['sections']:
 section['page']=shift(section['page'])
 if section['spec']=='1.4.3':section['page']=214;section['old_pages']=[251,252]+section['old_pages']
MAP.write_text(json.dumps(data,indent=2)+'\n');PDF.write_bytes((WORK/'after.pdf').read_bytes())
for n in [1,214,215,216,225,240]:after[n-1].get_pixmap(matrix=fitz.Matrix(1.2,1.2)).save(WORK/f'page-{n}.png')
print('PASS: 252 pages; all 250 prior pages retained; 247 unchanged content bodies pixel-identical; 4 printed cross-references updated; contents and bookmarks remapped.')
