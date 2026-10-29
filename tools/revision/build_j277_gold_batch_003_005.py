#!/usr/bin/env python3
"""Reproducible gold-standard J277 003-005: online lessons + Paper 1 V4 (pp.91-98,103).
Four A4 pages each; preserves approved L002 header, pen instructions and phase footer.
No classroom lesson or Catch up modifications.
"""
from pathlib import Path
import fitz
import build_j277_lesson001_gold_pdf as B
R=Path(__file__).resolve().parents[2]
MASTER=R/"offline/booklets/j277/J277_Lesson_002_Gold_Standard_4_Page.pdf"
DEST=R/"offline/booklets/j277"
D={
3:dict(title="Hexadecimal",goal="Convert between binary, denary and hex; split a byte into two nibbles.",
 vocab=[("hexadecimal","Base 16: digits 0-9 and A-F"),("nibble","Four binary bits"),("digit","One symbol in a number"),("conversion","Writing a value in another base")],
 retrieval=[("Previous lesson: what is 1 + 1 in binary?","10 in binary."),("How many bits make one byte?","8 bits."),("Convert 10110000 to denary. Show place values.","128 + 32 + 16 = 176."),("Why is 255 the highest unsigned eight-bit value?","256 patterns numbered 0 through 255.")],
 code=["Predict: What does print(11 * 16 + 0) output?","Write code to display the denary value of hex A3.","Change the starter to display the denary value of C7."],
 codeans=["176","print(10 * 16 + 3) gives 163","value = 12 * 16 + 7; print(value) gives 199"],
 qs=["Convert 10110000 from binary to hex. Show nibbles.","Convert hexadecimal A3 to denary with working.","Convert denary 98 to hexadecimal. Show two nibbles.","Thinking: A pupil says hex 1E = 15. Explain why that is wrong."],
 ans=["1011 | 0000 = B0","10 x 16 + 3 = 163","0110 | 0010 = 62","The left digit counts 16s: 16 + 14 = 30"],
 exit=["One hex digit represents four bits.","E represents 15 in hexadecimal.","Hex reduces the number of stored bits."],
 exitans=["True","False: E = 14; F = 15","False: only notation is shorter"],
 guided="Convert 01101101 to hex: 0110 | 1101 = ____ | ____ = ______."),
4:dict(title="Characters and Data Units",goal="Compare ASCII and Unicode; explain character sets and bits-to-bytes conversion.",
 vocab=[("character set","Maps characters to numerical codes"),("ASCII","A smaller character repertoire"),("Unicode","Supports many writing systems"),("byte","Eight bits")],
 retrieval=[("Previous lesson: convert hexadecimal 3C to denary.","3 x 16 + 12 = 60"),("What is denary 42 in hex? 2B / 29 / A2 / 2A","2A"),("Convert binary 00101010 to hex.","0010 | 1010 = 2A"),("Convert hex 2A to eight-bit binary.","00101010")],
 code=["Predict the output of the starter code.","Write both lines after changing 65 to 66.","Explain why the code displays 66, not the letter B."],
 codeans=["65","characterCode = 66; print(characterCode)","It prints a numeric value, not a character."],
 qs=["State how many bits are in a byte and a nibble. [2]","Explain an advantage of Unicode over ASCII. [2]","80 characters use 16 bits each. Calculate bytes. [3]","Thinking: Why is 'each Unicode character always uses one byte' wrong?"],
 ans=["Byte = 8 bits; nibble = 4 bits","Unicode supports more languages and symbols","80 x 16 = 1280 bits / 8 = 160 bytes","Encoding determines the number of bytes."],
 exit=["A byte contains eight bits.","Unicode supports fewer characters than ASCII.","Every Unicode character uses exactly one byte."],
 exitans=["True","False: Unicode supports more","False: encodings vary"],
 guided="18 characters at 8 bits each: work out the bits and bytes."),
5:dict(title="Images, Pixels and File Sizes",goal="Explain pixels and colour depth; calculate raw bitmap size in bits and bytes.",
 vocab=[("pixel","One bitmap picture element"),("resolution","Width and height in pixels"),("colour depth","Bits for each pixel's colour"),("metadata","Information about a file")],
 retrieval=[("Previous lesson: which standard supports many writing systems?","Unicode"),("Convert 48 bits into bytes.","48 / 8 = 6 bytes"),("Convert binary 00010101 to denary.","16 + 4 + 1 = 21"),("150 characters use eight bits each. Find bits and bytes.","1200 bits = 150 bytes")],
 code=["Predict the number of bits printed by the starter.","Change depth to 8. Predict the new bits.","Add a print expression to display bytes, not bits."],
 codeans=["10 x 8 x 4 = 320 bits","10 x 8 x 8 = 640 bits","print(width * height * depth / 8) = 80 bytes"],
 qs=["Define pixel and colour depth. [2]","A 12 x 5 bitmap has 4-bit depth. Find bits and bytes. [3]","A 1000 x 800 bitmap has 8-bit depth. Find raw MB. [4]","Thinking: Why might the real file size differ?"],
 ans=["A pixel is an individual element; depth is bits per pixel","12 x 5 x 4 = 240 bits = 30 bytes","6,400,000 bits = 800,000 bytes = 0.8 MB","Headers, metadata or compression affect actual size."],
 exit=["Image resolution describes the number of pixels.","Doubling only colour depth doubles raw pixel data.","The raw pixel calculation includes metadata."],
 exitans=["True","True if dimensions do not change","False: metadata is extra"],
 guided="10 x 6 pixels at 4 bits each: find pixels, bits and bytes.")
}
# Central, reusable print palette (matching the classroom icon language).
# Blue = learning phase; green = working/checking routine;
# orange = active response routine. Writing spaces stay white.
WHITE = B.WHITE
BLUE = (.20, .44, .72)
BLUE_LIGHT = (.91, .95, .99)
GREEN = (.18, .52, .34)
GREEN_LIGHT = (.92, .97, .93)
ORANGE = (.77, .39, .10)
ORANGE_LIGHT = (1.0, .95, .88)
NEUTRAL = (.98, .985, .99)
EDGE = (.76, .81, .85)

def t(p,s,x,y,size=8.7,bold=False,maxw=None): return B.text(p,s,x,y,size,bold,maxw)

def sec(p,s,y):
    """Print headings are simple; behaviour and response boxes are not repeated in the page body."""
    feedback = ("Answers" in s or "Self-mark" in s
                or s.startswith("Try the question again"))
    marker = GREEN if feedback else BLUE
    B.box(p,45,y-9,3,15,marker)
    t(p,s,54,y+1,10.4,True)


def rules(p,y,n=2,step=17): B.rules(p,y,n,step)
def tick(p,x,y): B.tick(p,x,y)
def card(p,x,y,w,h,shade=WHITE):
    # White or lightly tinted surfaces, not the former blanket pale-green fill.
    B.panel(p,x,y,w,h,shade,EDGE)
def header(p,n):
 p.add_redact_annot(fitz.Rect(40,54,573,782),fill=B.WHITE)
 p.add_redact_annot(fitz.Rect(488,16,574,32),fill=B.WHITE)
 p.apply_redactions(images=0,graphics=0,text=0)
 t(p,"LESSON %03d"%n,496,26,8,True)
def p1(p,d):
 t(p,d["title"],45,76,15.1,True)
 for label,x,w in [("Name",45,125),("Class",194,72),("Date",300,69),("Time",403,64),("Teacher",490,76)]:
  t(p,label,x,99,8,True); B.line(p,x+len(label)*5+6,99,x+w)
 sec(p,"Do Now - Four retrieval questions",124)
 t(p,"BLACK PEN: Answer all four before looking at the model answers.",45,145,8.2)
 y=167
 for i,(q,ans) in enumerate(d["retrieval"]):
  t(p,str(i+1)+". "+q,45,y,8.7,maxw=493)
  rules(p,y+22,2 if i>=2 else 1)
  y+=57
 sec(p,"Today's objectives",420);card(p,45,442,501,48,BLUE_LIGHT)
 t(p,d["goal"],54,463,8.6,maxw=482)
 sec(p,"Key vocabulary - Read, cover, recall",518)
 for i,(term,definition) in enumerate(d["vocab"]):
  x=45+(i%2)*257;y=540+(i//2)*49
  card(p,x,y,245,43,WHITE)
  t(p,term,x+8,y+15,8.8,True)
  t(p,definition,x+8,y+29,7.7,maxw=230)
 t(p,"Write one definition in your own words:",45,656,8.8,True)
 rules(p,674,4,step=21)
def p2(p,n,d):
 t(p,"Learn and practise",45,76,15.2,True)
 if n==3:
  sec(p,"New learning - Four bits make one hex digit",103)
  t(p,"Hexadecimal uses 0-9 and A-F. A=10, B=11, C=12, D=13, E=14, F=15.",45,127,8.7)
  t(p,"A byte becomes two nibbles. Each nibble uses the 8, 4, 2, 1 values.",45,145,8.5)
  for i,(bits,value) in enumerate([("1111","F"),("1110","E")]):
   x=45+i*256;card(p,x,168,245,69,BLUE_LIGHT)
   t(p,"Nibble "+str(i+1),x+10,186,8.5,True)
   t(p,bits+"  =  "+value,x+10,220,12,True)
  t(p,"11111110 becomes FE. Hex is shorter to read; bits are unchanged.",45,260,8.8)
  sec(p,"Revision-guide example - RGB colour #00FF00",290)
  for i,(lab,val,col) in enumerate([("RED","00",WHITE),("GREEN","FF",(.75,.91,.78)),("BLUE","00",WHITE)]):
   x=45+i*169;card(p,x,310,157,55,col);t(p,lab,x+9,329,8.5,True);t(p,val,x+106,348,11,True)
  sec(p,"I Do - Convert binary to hex",398)
  t(p,"11000111 = 1100 | 0111. Use 8,4,2,1 within each nibble.",45,424,8.8)
  t(p,"1100 = 8+4 = 12 = C;  0111 = 4+2+1 = 7;  Answer = C7.",45,448,9,True)
  sec(p,"I Do - Hex to denary",481)
  t(p,"A3 = (10 x 16) + 3 = 163. The left digit counts sixteens.",45,509,8.75)
  sec(p,"We Do - Guided practice",556)
  t(p,d["guided"],45,582,8.8,maxw=485)
  t(p,"Left nibble = ________       Right nibble = ________",45,630,8.7)
  t(p,"Complete hexadecimal = __________________",45,669,8.7)
  rules(p,711,2,step=22)
 elif n==4:
  sec(p,"New learning - From character to binary",103)
  t(p,"A character set maps a written character to a code, represented in bits.",45,128,8.7)
  for i,(head,val) in enumerate([("Character","A"),("ASCII code","65"),("8-bit binary","01000001")]):
   x=45+i*170;card(p,x,153,161,63,BLUE_LIGHT if i%2==0 else WHITE)
   t(p,head,x+10,172,8.1,True);t(p,val,x+10,200,11.5,True)
  t(p,"B is code 66 (01000010); codes follow an ordered sequence.",45,238,8.7)
  sec(p,"ASCII versus Unicode",274)
  card(p,45,296,245,79,BLUE_LIGHT);card(p,302,296,244,79,WHITE)
  t(p,"ASCII",57,314,9.2,True);t(p,"A smaller character repertoire",57,339,8.5)
  t(p,"Unicode",315,314,9.2,True);t(p,"Supports many languages and scripts",315,339,8.3)
  t(p,"Unicode encodings may use different numbers of bytes per character.",45,400,8.6)
  sec(p,"I Do - Worked calculation",445)
  t(p,"12 characters use 8 bits each. Find the raw data size.",45,469,8.7)
  card(p,45,487,501,50,BLUE_LIGHT)
  t(p,"12 x 8 = 96 bits;   96 / 8 = 12 bytes.",55,514,9.6,True)
  sec(p,"We Do - Guided practice",565)
  t(p,d["guided"],45,590,8.8)
  t(p,"Bits = 18 x 8 = ___________________________",45,626,8.8)
  t(p,"Bytes = __________ / 8 = ___________________",45,668,8.8)
  t(p,"Why is Unicode useful for a multilingual website?",45,705,8.7)
  rules(p,727,2,step=22)
 else:
  sec(p,"New learning - Pixels, resolution and depth",103)
  t(p,"A bitmap is a grid of pixels. Resolution is width x height in pixels.",45,128,8.5)
  cols=[(.90,.95,.99),(.70,.83,.94),(.45,.65,.83),(.25,.44,.66)]
  for row in range(8):
   for col in range(8):
    B.box(p,52+17*col,155+17*row,17,17,cols[(row//2+col//2)%4],B.EDGE,.4)
  t(p,"8 x 8 = 64 pixels",225,174,10,True)
  t(p,"Each square is one pixel.",225,202,8.7)
  t(p,"Colour depth is bits per pixel.",225,230,8.7)
  t(p,"More pixels or more bits usually",225,258,8.5)
  t(p,"means more raw image data.",225,273,8.5)
  sec(p,"I Do - Raw bitmap file-size method",322)
  t(p,"Paper 1 guide example: 8 x 8 bitmap, 2-bit colour depth.",45,349,8.7)
  card(p,45,364,501,91,BLUE_LIGHT)
  t(p,"WIDTH x HEIGHT x COLOUR DEPTH = BITS",55,386,9.6,True)
  t(p,"8 x 8 = 64 pixels;  64 x 2 = 128 bits.",55,411,9.0)
  t(p,"128 / 8 = 16 bytes (uncompressed pixel data only).",55,437,9,True)
  t(p,"Headers, metadata and compression can change actual file size.",45,486,8.6)
  sec(p,"We Do - Guided practice",525)
  t(p,d["guided"],45,554,8.7)
  t(p,"Pixels: ______ x ______ = _________",45,609,8.8)
  t(p,"Bits: __________ x 4 = ___________",45,650,8.8)
  t(p,"Bytes: _________ / 8 = ___________",45,692,8.8)
  rules(p,728,1)
def p3(p,n,d):
 t(p,"Think and write",45,76,15.2,True)
 sec(p,"Code First - Predict > Write > Test > Improve",103)
 t(p,"Start on paper. Do not look at model answers until page 4.",45,126,8.4)
 if n==3: code=["value = 6 * 16 + 2","print(value)"]
 elif n==4:code=["characterCode = 65","print(characterCode)"]
 else:code=["width = 10    height = 8    depth = 4","print(width * height * depth)"]
 card(p,45,143,501,56,ORANGE_LIGHT)
 for i,s in enumerate(code):t(p,s,56,163+19*i,9.2,True)
 for i,q in enumerate(d["code"]):
  y=218+46*i;t(p,q,45,y,8.55,maxw=495);rules(p,y+17,1)
 sec(p,"You Do - Independent work",372)
 for i,q in enumerate(d["qs"]):
  y=396+i*66;t(p,q,45,y,8.5,maxw=492);rules(p,y+23,2,step=15)
 sec(p,"Exit Ticket - True or False?",671)
 t(p,"Answer before you turn to the green-pen page.",45,694,8.2)
 for i,q in enumerate(d["exit"]):
  y=716+20*i;t(p,str(i+1)+". "+q,45,y,8.0,maxw=432)
  tick(p,495,y-7);t(p,"T",507,y,8,True)
  tick(p,527,y-7);t(p,"F",538,y,8,True)
def p4(p,n,d):
 t(p,"Review & improve",45,76,15.2,True)
 t(p,"GREEN PEN: Tick correct answers. For a mistake, use the model answer",45,99,8.35)
 t(p,"then copy the FULL question and write a fresh answer below.",45,112,8.35)
 sec(p,"Do Now - Answers",136)
 for i,(q,a) in enumerate(d["retrieval"]):
  y=158+30*i;t(p,"Q"+str(i+1),48,y,8,True);t(p,a,75,y,7.8,maxw=208);tick(p,284,y-7)
 sec(p,"We Do - Guided practice",280)
 worked={3:"0110 | 1101 = 6 | D = 6D",4:"18 x 8 = 144 bits; / 8 = 18 bytes",5:"60 pixels; 240 bits; 30 bytes"}[n]
 t(p,worked,45,305,8.05,maxw=245)
 sec(p,"Key vocabulary",340)
 for i,(k,v) in enumerate(d["vocab"]):
  y=361+26*i;t(p,k,48,y,7.9,True);t(p,v,48,y+11,7.5,maxw=241);tick(p,284,y-8)
 B.box(p,304,131,1,330,B.RULE)
 t(p,"Code First - Answers",319,145,9.7,True)
 for i,a in enumerate(d["codeans"]):
  y=170+64*i;t(p,["Predict","Write","Improve"][i],319,y,8.1,True)
  t(p,a,319,y+14,7.8,maxw=219);tick(p,537,y-7)
 t(p,"Exit Ticket - Explanations",319,370,9.3,True)
 for i,a in enumerate(d["exitans"]):t(p,str(i+1)+". "+a,319,393+23*i,7.65,maxw=221)
 sec(p,"You Do - Self-mark",483)
 for i,a in enumerate(d["ans"]):
  y=504+22*i
  t(p,["Q1","Q2","Q3","Thinking"][i],53,y,8,True)
  t(p,a,120,y,7.75,maxw=407)
  tick(p,535,y-7);B.line(p,51,y+10,545)
 sec(p,"Try the question again",607)
 t(p,"1. Copy the FULL question you got wrong (or the hardest):",45,633,8.25,True)
 rules(p,652,3,step=19)
 t(p,"2. In GREEN PEN, write a NEW answer. Show working:",45,715,8.25,True)
 rules(p,734,3,step=19)
def build(n):
 d=D[n];doc=fitz.open(MASTER)
 assert len(doc)==4
 for i,page in enumerate(doc):
  header(page,n)
  [lambda:p1(page,d),lambda:p2(page,n,d),lambda:p3(page,n,d),lambda:p4(page,n,d)][i]()
 out=DEST/("J277_Lesson_%03d_Gold_Standard_4_Page.pdf"%n)
 doc.set_metadata({"title":"J277 Lesson %03d - %s"%(n,d["title"]),"creator":"RHSC Computing gold print standard"})
 doc.save(out,garbage=4,deflate=True);doc.close()
 with fitz.open(out) as r:
  assert len(r)==4
  for p in r:
   txt=p.get_text()
   assert "LESSON %03d"%n in txt and "BLACK PEN" in txt and "GREEN PEN" in txt
   assert "Review & Improve" in txt
   assert round(p.rect.width)==595 and round(p.rect.height)==842
  # Routine/response behaviour boxes are only for classroom delivery, not these print pages.
  body_words = {w[4].upper() for page in r for w in page.get_text("words")
                if 54 <= w[1] < 780}
  assert not body_words.intersection({"SILENT","LISTEN","MWBS","THUMBS"}), (n, body_words)
  whole="\n".join(p.get_text() for p in r)
  assert all(word in whole for word in ("Do Now","Code First","You Do","Try the question again"))
 print("PASS",n,out.stat().st_size)
if __name__=="__main__":
 for n in (3,4,5):build(n)

# Publication trigger: approved small-batch PDF generation and link validation.
