"""Insert a character-sets teaching page into the 249-page specification-order edition.
Requires the original spec-order PDF and map; refuses repeat application.
"""
from pathlib import Path
import io,json,hashlib,re
import fitz
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
ROOT=Path(__file__).resolve().parents[2];WORK=ROOT.parent/'tmp/pdfs/character-sets';WORK.mkdir(parents=True,exist_ok=True)
PDF=ROOT/'revision/h446/guides/H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf';MAP=ROOT/'revision/h446/guides/paper-1-page-map.json'
data=json.loads(MAP.read_text());assert data['page_count']==249 and '250' not in data['page_keys'],'Requires the pre-insertion edition'
source=WORK/'before.pdf';source.write_bytes(PDF.read_bytes());(WORK/'before-map.json').write_text(json.dumps(data));original=fitz.open(source);doc=fitz.open(source)
insert_at=177 # new physical page 178, at the end of 1.4.1 before data structures
shift=lambda page:page+1 if page>=178 else page
toc=original.get_toc();contents_links=original[0].get_links()
for link in doc[0].get_links():doc[0].delete_link(link)
pdfmetrics.registerFont(TTFont('Body','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'));pdfmetrics.registerFont(TTFont('Bold','/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'));pdfmetrics.registerFont(TTFont('Mono','/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))
w,h=original[0].rect.width,original[0].rect.height;b=io.BytesIO();c=canvas.Canvas(b,pagesize=(w,h));ink=HexColor('#173f4a');blue=HexColor('#327b99');pale=HexColor('#eef5f7');orange=HexColor('#a35417')
def text(x,y,s,font='Body',size=9.4):c.setFont(font,size);c.setFillColor(ink);c.drawString(x,y,s)
def lines(y,items,leading=14):
 for item in items:text(48,y,item);y-=leading
 return y
c.setFillColor(blue);c.rect(0,h-27,w,10,fill=1,stroke=0)
text(42,h-52,'OCR H446 / PAPER 1 / 1.4.1(j)',size=9)
text(42,h-80,'Character sets: ASCII and Unicode','Bold',20)
text(42,h-101,'A character has a code; an encoding decides how that code becomes bytes.',size=9.4)
y=h-130
text(42,y,'KNOW IT PRECISELY','Bold',10);y-=21
y=lines(y,[
 'Character set: a repertoire of characters with assigned numeric codes.',
 'Code point: a numeric identifier for a character, such as U+0041 for A.',
 'Encoding: rules for representing code points as bytes, for example UTF-8.',
 'The receiver needs the correct encoding to interpret the stored bytes.'
]);y-=12
c.setFillColor(pale);c.roundRect(42,y-101,w-84,112,5,fill=1,stroke=0)
text(52,y-8,'ASCII: 7 bits, 128 possible codes','Bold',10)
for j,s in enumerate(['Standard ASCII has codes 0-127, including letters, digits and control characters.',
 'It covers a limited repertoire; it cannot represent all writing systems.',
 'A 7-bit ASCII code can be stored in an 8-bit byte with a leading zero.',
 'That extra zero does not increase the standard ASCII repertoire.']):text(52,y-29-j*16,s,size=9)
y-=128
text(42,y,'I DO / Encode "AB" - the same method as Lesson 008','Bold',10);y-=22
y=lines(y,['1. Find codes: A = 65 and B = 66.', '2. Convert to 7-bit binary: A = 1000001; B = 1000010.', '3. Store in 8-bit bytes: 01000001 01000010.', '4. Storage: 2 bytes = 16 bits (ignore metadata).'])
y-=12;text(42,y,'UNICODE / Separate the repertoire from its encoding','Bold',10);y-=22
y=lines(y,[
 'Unicode supports many writing systems and symbols. Its first 128 code points',
 'match ASCII, but Unicode text does not have one universal byte width.',
 'UTF-8 uses 1-4 bytes per code point; ASCII code points use one byte.',
 'UTF-16 uses one or two 16-bit code units per code point.',
 'A displayed character can consist of more than one code point.'
]);y-=12
text(42,y,'WE DO / Use the stated byte widths','Bold',10);y-=22
y=lines(y,[
 'A UTF-8 message contains 8 ASCII code points and 2 euro-sign code points.',
 'Use 1 byte per ASCII code point and 3 per euro sign. Ignore metadata.',
 'Calculate its storage before checking: ______________________________',
 'Check: (8 x 1) + (2 x 3) = 14 bytes; 14 x 8 = 112 bits.'
]);y-=12
text(42,y,'EXAM PRECISION','Bold',10);y-=21
y=lines(y,[
 'Both ASCII and Unicode assign numeric codes to characters. Unicode has a',
 'much larger repertoire. Do not claim that Unicode is always 16 bits per character.',
 'Capacity: n bits give 2^n codes. For 300 codes, 8 bits give only 256;',
 '9 bits give 512, so a fixed-width code needs at least 9 bits.'
]);assert y>53,y
text(42,45,'Revisit Lesson 008: New Learning and I Do.',size=8);text(w-63,31,'178',size=8);c.save()
new=fitz.open(stream=b.getvalue(),filetype='pdf');doc.insert_pdf(new,start_at=insert_at)
# Update all later footer numbers and the contents' visible section destinations.
for old in range(178,250):
 p=doc[shift(old)-1];rect=fitz.Rect(w-90,h-46,w-35,h-23);p.add_redact_annot(rect,fill=(1,1,1));p.apply_redactions(images=0,graphics=0);number=str(shift(old));p.insert_text((w-46-fitz.get_text_length(number,fontname='helv',fontsize=8),h-31),number,fontname='helv',fontsize=8,color=(.09,.25,.29))
p=doc[0];replacements=[]
for block in p.get_text('dict')['blocks']:
 for line in block.get('lines',[]):
  for span in line['spans']:
   s=span['text']
   if s.isdigit() and int(s)>=178 and span['bbox'][0]>w-100:
    replacements.append((span,shift(int(s))));p.add_redact_annot(fitz.Rect(span['bbox'])+(-.2,-.2,.2,.2),fill=(.9333,.9608,.9686))
p.apply_redactions(images=0,graphics=0);p.insert_font(fontname='GuideBold',fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf')
for span,value in replacements:
 s=str(value);p.insert_text((w-51-fitz.Font(fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf').text_length(s,fontsize=9),span['origin'][1]),s,fontname='GuideBold',fontsize=9,color=(.09,.25,.29))
for link in contents_links:p.insert_link({'kind':fitz.LINK_GOTO,'from':link['from'],'page':shift(link['page']+1)-1,'to':fitz.Point(0,0)})
# Four existing printed cross-references were separate numeric spans after the previous reorder.
for old,targets,expected in [(222,{218},1),(237,{234,238},3)]:
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
 if level==1 and label.startswith('1.4.2'):newtoc.append([2,'1.4.1(j) / Character sets: ASCII and Unicode',178])
 newtoc.append([level,label,shift(page)])
doc.set_toc(newtoc);doc.set_page_labels([{'startpage':0,'prefix':'','style':'D','firstpagenum':1}]);doc.save(WORK/'after.pdf',garbage=4,deflate=True)
after=fitz.open(WORK/'after.pdf');assert len(after)==250
for old in range(2,250):
 if old in [222,237]:continue
 a=original[old-1];z=after[shift(old)-1];clip=fitz.Rect(0,0,w,h-51);assert a.get_pixmap(matrix=fitz.Matrix(.7,.7),clip=clip).samples==z.get_pixmap(matrix=fitz.Matrix(.7,.7),clip=clip).samples,old
for key,page in data['page_keys'].items():data['page_keys'][key]=shift(page)
data['page_keys']['250']=178;data['page_count']=250;data['edition']='2026-10-23-character-sets';data['added_pages']=[{'key':250,'page':178,'spec':'1.4.1(j)','title':'Character sets: ASCII and Unicode'}]
for section in data['sections']:
 section['page']=shift(section['page'])
 if section['spec']=='1.4.1':section['old_pages'].append(250)
MAP.write_text(json.dumps(data,indent=2)+'\n');PDF.write_bytes((WORK/'after.pdf').read_bytes())
for n in [1,178,179,223,238]:after[n-1].get_pixmap(matrix=fitz.Matrix(1.2,1.2)).save(WORK/f'page-{n}.png')
print('PASS: 250 pages; all 249 originals retained; 246 unchanged content bodies pixel-identical; 4 printed cross-references updated; contents and bookmarks remapped.')
