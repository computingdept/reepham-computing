"""Insert a shifts and masks teaching page into the 252-page logic-gates edition.
Requires the original spec-order PDF and map; refuses repeat application.
"""
from pathlib import Path
import io,json,hashlib,re
import fitz
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
ROOT=Path(__file__).resolve().parents[2];WORK=ROOT.parent/'tmp/pdfs/shifts-masks';WORK.mkdir(parents=True,exist_ok=True)
PDF=ROOT/'revision/h446/guides/H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf';MAP=ROOT/'revision/h446/guides/paper-1-page-map.json'
data=json.loads(MAP.read_text());assert data['page_count']==252 and '253' not in data['page_keys'],'Requires the pre-insertion edition'
source=WORK/'before.pdf';source.write_bytes(PDF.read_bytes());(WORK/'before-map.json').write_text(json.dumps(data));original=fitz.open(source);doc=fitz.open(source)
insert_at=171 # new page 172, after the complete binary question/answer block
shift=lambda page:page+1 if page>=172 else page
toc=original.get_toc();contents_links=original[0].get_links()
for link in doc[0].get_links():doc[0].delete_link(link)
w,h=original[0].rect.width,original[0].rect.height
for name,file in [('Body','DejaVuSans.ttf'),('Bold','DejaVuSans-Bold.ttf'),('Mono','DejaVuSansMono.ttf')]:pdfmetrics.registerFont(TTFont(name,'/usr/share/fonts/truetype/dejavu/'+file))
b=io.BytesIO();c=canvas.Canvas(b,pagesize=(w,h));ink=HexColor('#173f4a');blue=HexColor('#327b99');pale=HexColor('#eef5f7')
def text(x,y,s,font='Body',size=9.5):c.setFillColor(ink);c.setFont(font,size);c.drawString(x,y,s)
def lines(y,items,leading=15):
 for s in items:text(46,y,s);y-=leading
 return y
c.setFillColor(blue);c.rect(0,h-27,w,10,fill=1,stroke=0)
text(42,h-52,'OCR H446 / PAPER 1 / 1.4.1(i)',size=9)
text(42,h-82,'Shifts and bitwise masks','Bold',21)
y=h-112;y=lines(y,['Use a fixed width: all examples below retain exactly 8 bits.', 'Bit 0 is the rightmost bit; bit 7 is the leftmost. A mask selects positions.'])
y-=12;text(42,y,'I DO / Move the bits, then interpret the result','Bold',11);y-=25
for s in ['Original:       10100101 = 165 (unsigned)', 'Logical left 1: 01001010 =  74   [leftmost 1 lost; 0 enters right]', 'Logical right 1:01010010 =  82   [rightmost 1 lost; 0 enters left]']:
 text(46,y,s,'Mono',9);y-=21
y-=3;y=lines(y,['A logical shift fills vacated positions with zeros; bits leaving the width are lost.', 'Left by k multiplies an unsigned value by 2^k only if significant bits are not lost.', 'Here 165 x 2 = 330 does not fit in 8 bits, so the retained result is 74.', 'Right by k gives the unsigned integer quotient by 2^k: 165 divided by 2 gives 82.', 'Arithmetic right shift repeats the sign bit instead; do not confuse the two.'])
y-=14;text(42,y,'MASKS / Apply the operation separately to each bit','Bold',11);y-=24
xs=[52,164,307,441]
for x,label in zip(xs,['Operation','Mask bit 1','Mask bit 0','Use']):text(x,y,label,'Bold',9)
for row in [('AND','preserves data','clears data','isolate / clear'),('OR','sets data to 1','preserves data','set flags'),('XOR','toggles data','preserves data','flip flags')]:
 y-=24
 for x,label in zip(xs,row):text(x,y,label,size=9)
y-=27;c.setFillColor(pale);c.roundRect(42,y-102,w-84,117,4,fill=1,stroke=0)
text(52,y-3,'Same data, same mask, three different results','Bold',10)
for j,s in enumerate(['Data: 10100101     Mask: 00001111', 'AND:  00000101     keep only the low four data bits', 'OR:   10101111     set the low four bits to 1', 'XOR:  10101010     flip the low four data bits']):text(52,y-27-j*20,s,'Mono',9)
y-=133;text(42,y,'SELECT A SINGLE BIT / Change only the intended flag','Bold',10);y-=23
y=lines(y,['Set bit 3:     10100101 OR  00001000 = 10101101.', 'Clear bit 5:   10100101 AND 11011111 = 10000101.', 'Toggle bit 0:  10100101 XOR 00000001 = 10100100.'])
y-=13;text(42,y,'WE DO / Use a different value before checking','Bold',10);y-=23
y=lines(y,['Start from 11001010. Apply AND 00001111. Which bits have been preserved?', 'Then, starting again from 11001010, perform a logical right shift by 2.', 'Check: AND gives 00001010; the low four bits are preserved.', 'Right shift gives 00110010 (50); two rightmost bits are discarded.'])
assert y>55,y
text(42,43,'Aligned with Lesson 003: logical shifts, AND/OR masks and XOR toggling.',size=8);text(w-63,31,'172',size=8);c.save()
# Calculate every displayed example independently of the page text.
x=0b10100101;assert ((x<<1)&255,x>>1)==(74,82)
assert (x&15,x|15,x^15)==(5,175,170)
assert (x|8,x&0b11011111,x^1)==(173,133,164)
assert (0b11001010&15,0b11001010>>2)==(10,50)
new=fitz.open(stream=b.getvalue(),filetype='pdf');doc.insert_pdf(new,start_at=insert_at)
# Update all later footer numbers and the contents' visible section destinations.
for old in range(172,253):
 p=doc[shift(old)-1];rect=fitz.Rect(w-90,h-46,w-35,h-23);p.add_redact_annot(rect,fill=(1,1,1));p.apply_redactions(images=0,graphics=0);number=str(shift(old));p.insert_text((w-46-fitz.get_text_length(number,fontname='helv',fontsize=8),h-31),number,fontname='helv',fontsize=8,color=(.09,.25,.29))
p=doc[0];replacements=[]
for block in p.get_text('dict')['blocks']:
 for line in block.get('lines',[]):
  for span in line['spans']:
   s=span['text']
   if s.isdigit() and int(s)>=172 and span['bbox'][0]>w-100:
    replacements.append((span,shift(int(s))));p.add_redact_annot(fitz.Rect(span['bbox'])+(-.2,-.2,.2,.2),fill=(.9333,.9608,.9686))
p.apply_redactions(images=0,graphics=0);p.insert_font(fontname='GuideBold',fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
for span,value in replacements:
 s=str(value);p.insert_text((w-51-fitz.Font(fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf').text_length(s,fontsize=9),span['origin'][1]),s,fontname='GuideBold',fontsize=9,color=(.09,.25,.29))
for link in contents_links:p.insert_link({'kind':fitz.LINK_GOTO,'from':link['from'],'page':shift(link['page']+1)-1,'to':fitz.Point(0,0)})
# Four existing printed cross-references were separate numeric spans after the previous reorder.
for old,targets,expected in [(225,{221},1),(240,{237,241},3)]:
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
 if level==2 and page>=172 and (not any(t[1].startswith('1.4.1(i) / Logical shifts') for t in newtoc)):
  newtoc.append([2,'1.4.1(i) / Logical shifts and bitwise masks',172])
 newtoc.append([level,label,shift(page)])
doc.set_toc(newtoc);doc.set_page_labels([{'startpage':0,'prefix':'','style':'D','firstpagenum':1}]);doc.save(WORK/'after.pdf',garbage=4,deflate=True)
after=fitz.open(WORK/'after.pdf');assert len(after)==253
for old in range(2,253):
 if old in [225,240]:continue
 a=original[old-1];z=after[shift(old)-1];clip=fitz.Rect(0,0,w,h-51);assert a.get_pixmap(matrix=fitz.Matrix(.7,.7),clip=clip).samples==z.get_pixmap(matrix=fitz.Matrix(.7,.7),clip=clip).samples,old
for key,page in data['page_keys'].items():data['page_keys'][key]=shift(page)
data['page_keys']['253']=172;data['page_count']=253;data['edition']='2026-10-23-shifts-masks'
for page in data['added_pages']:page['page']=shift(page['page'])
data['added_pages'].append({'key':253,'page':172,'spec':'1.4.1(i)','title':'Logical shifts and bitwise masks'})
for section in data['sections']:
 section['page']=shift(section['page'])
 if section['spec']=='1.4.1':section['old_pages'].append(253)
MAP.write_text(json.dumps(data,indent=2)+'\n');PDF.write_bytes((WORK/'after.pdf').read_bytes())
for n in [1,172,179,215,226,241]:after[n-1].get_pixmap(matrix=fitz.Matrix(1.2,1.2)).save(WORK/f'page-{n}.png')
print('PASS: 253 pages; all 252 prior pages retained; 249 unchanged content bodies pixel-identical; cross-references, contents and bookmarks remapped; worked bit operations verified.')
