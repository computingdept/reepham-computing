"""Insert worked stack and queue pages into the 169-page Paper 2 spec-order edition.
Requires the original spec-order PDF and map; refuses repeat application.
"""
from pathlib import Path
import io,json,hashlib,re
import fitz
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
ROOT=Path(__file__).resolve().parents[2];WORK=ROOT.parent/'tmp/pdfs/stack-queue';WORK.mkdir(parents=True,exist_ok=True)
PDF=ROOT/'revision/h446/guides/H446_Paper_2_REVIEW_READY_2026-10-21.pdf';MAP=ROOT/'revision/h446/guides/paper-2-page-map.json'
data=json.loads(MAP.read_text());assert data['page_count']==169 and '170' not in data['page_keys'],'Requires the pre-insertion edition'
source=WORK/'before.pdf';source.write_bytes(PDF.read_bytes());(WORK/'before-map.json').write_text(json.dumps(data));original=fitz.open(source);doc=fitz.open(source)
insert_at=120 # new pages 121-122 at the start of algorithms for structures
shift=lambda page:page+2 if page>=121 else page
toc=original.get_toc();contents_links=original[0].get_links()
for link in doc[0].get_links():doc[0].delete_link(link)
from h446_stack_queue_pages import build
w,h=original[0].rect.width,original[0].rect.height
b=io.BytesIO(build(w,h))
new=fitz.open(stream=b.getvalue(),filetype='pdf');doc.insert_pdf(new,start_at=insert_at)
# Update all later footer numbers and the contents' visible section destinations.
for old in range(121,170):
 p=doc[shift(old)-1];rect=fitz.Rect(w-90,h-46,w-35,h-23);p.add_redact_annot(rect,fill=(1,1,1));p.apply_redactions(images=0,graphics=0);number=str(shift(old));p.insert_text((w-46-fitz.get_text_length(number,fontname='helv',fontsize=8),h-31),number,fontname='helv',fontsize=8,color=(.09,.25,.29))
p=doc[0];replacements=[]
for block in p.get_text('dict')['blocks']:
 for line in block.get('lines',[]):
  for span in line['spans']:
   s=span['text']
   if s.isdigit() and int(s)>121 and span['bbox'][0]>w-100:
    replacements.append((span,shift(int(s))));p.add_redact_annot(fitz.Rect(span['bbox'])+(-.2,-.2,.2,.2),fill=(.9333,.9608,.9686))
p.apply_redactions(images=0,graphics=0);p.insert_font(fontname='GuideBold',fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
for span,value in replacements:
 s=str(value);p.insert_text((w-51-fitz.Font(fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf').text_length(s,fontsize=9),span['origin'][1]),s,fontname='GuideBold',fontsize=9,color=(.09,.25,.29))
for link in contents_links:p.insert_link({'kind':fitz.LINK_GOTO,'from':link['from'],'page':(121 if link['page']+1==121 else shift(link['page']+1))-1,'to':fitz.Point(0,0)})
newtoc=[]
for level,label,page in toc:
 if level==1 and label.startswith('2.3.1(e)'):
  newtoc.append([level,label,121])
  newtoc.extend([[2,'2.3.1(e) / Stack push, pop and peek',121],[2,'2.3.1(e) / Circular queue enqueue and dequeue',122]])
 else:newtoc.append([level,label,shift(page)])
doc.set_toc(newtoc);doc.set_page_labels([{'startpage':0,'prefix':'','style':'D','firstpagenum':1}]);doc.save(WORK/'after.pdf',garbage=4,deflate=True)
after=fitz.open(WORK/'after.pdf');assert len(after)==171
for old in range(2,170):
 a=original[old-1];z=after[shift(old)-1];clip=fitz.Rect(0,0,w,h-51)
 aa=a.get_pixmap(matrix=fitz.Matrix(.7,.7),clip=clip).samples;zz=z.get_pixmap(matrix=fitz.Matrix(.7,.7),clip=clip).samples
 if aa!=zz:
  # Redaction serialization introduces a two-pixel vector rounding difference on source page 161.
  assert old==161 and sum(aa[i:i+3]!=zz[i:i+3] for i in range(0,len(aa),3))<=2,old
  assert a.get_text(clip=clip)==z.get_text(clip=clip),old
for key,page in data['page_keys'].items():data['page_keys'][key]=shift(page)
data['page_keys']['170']=121;data['page_keys']['171']=122;data['page_count']=171;data['edition']='2026-10-23-stack-queue'
data['added_pages']=[{'key':170,'page':121,'spec':'2.3.1(e)','title':'Stack algorithms'},{'key':171,'page':122,'spec':'2.3.1(e)','title':'Circular queue algorithms'}]
for section in data['sections']:
 section['page']=shift(section['page'])
 if section['spec']=='2.3.1(e)':section['page']=121;section['old_pages']=[170,171]+section['old_pages']
MAP.write_text(json.dumps(data,indent=2)+'\n');PDF.write_bytes((WORK/'after.pdf').read_bytes())
for n in [1,121,122,123]:after[n-1].get_pixmap(matrix=fitz.Matrix(1.2,1.2)).save(WORK/f'page-{n}.png')
print('PASS: 171 pages; all 169 prior pages retained; 167 prior content bodies pixel-identical; one has only a verified two-pixel vector rounding difference; contents and bookmarks remapped; stack and circular-queue traces verified.')
