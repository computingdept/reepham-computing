#!/usr/bin/env python3
"""Reproducible gold-standard J277 006-008: online lessons + Paper 1 V4 (sound / compression / primary storage).
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
6:dict(title="Sound, Sampling and File Sizes",goal="Explain how sound is sampled and calculate uncompressed audio file sizes.",
 vocab=[("sample rate","Number of samples taken each second"),("bit depth","Bits used to record one sample"),("duration","How long the recording lasts"),("analogue","Continuous, changing signal")],
 retrieval=[("Previous lesson: what does colour depth measure?","Bits used for each pixel."),
            ("What is the relationship between bits and bytes?","8 bits make one byte."),
            ("Find the bits in a 10 x 5 image with 4-bit colour depth.","10 x 5 x 4 = 200 bits."),
            ("Why may an image file exceed its raw pixel size?","Headers and metadata add data.")],
 code=["Predict the number of bits printed by the code.","Change the code to display bytes instead of bits.","Improve the code to calculate bytes for 3 seconds."],
 codeans=["8000 x 2 x 8 = 128000 bits","print(rate * duration * depth / 8) = 16000","Set duration = 3: 24000 bytes"],
 qs=["Define sample rate and bit depth. [2]","8,000 Hz for 2 seconds at 8 bits: calculate bytes. [3]","16,000 Hz for 3 seconds at 16 bits: calculate bytes. [3]","Thinking: What changes if the sound is recorded in stereo?"],
 ans=["Rate = samples/second; depth = bits/sample","8000 x 2 x 8 / 8 = 16000 bytes","16000 x 3 x 16 / 8 = 96000 bytes","Stereo doubles the size if both channels use the same settings."],
 exit=["A higher sample rate records more samples each second.","Bit depth is measured in seconds.","A longer recording needs more raw data at the same settings."],
 exitans=["True","False: bit depth is bits per sample","True"],
 guided="8,000 samples/sec x 3 seconds x 8 bits/sample: calculate bytes."),
7:dict(title="Compression and Storage Calculations",goal="Compare lossy and lossless methods; calculate storage saved by compression.",
 vocab=[("compression","Reducing the number of bits in a file"),("lossless","Original data can be restored exactly"),("lossy","Some original information is discarded"),("ratio","Comparison of original and new sizes")],
 retrieval=[("Previous lesson: what does sample rate mean?","Samples taken every second."),
            ("How many bits make a byte?","8 bits."),
            ("Calculate bytes: 8,000 samples/sec for 2 sec at 8 bits.","16000 bytes."),
            ("Why does doubling recording duration increase file size?","Twice as many samples are stored.")],
 code=["Predict how many kilobytes the program says were saved.","Write a print instruction to show the percent saved.","Change compressed to 2500. Predict the new saving."],
 codeans=["5000 - 3000 = 2000 KB","print((original - compressed) / original * 100) gives 40","5000 - 2500 = 2500 KB"],
 qs=["State the difference between lossy and lossless. [2]","An image shrinks from 5000 KB to 3000 KB. How much is saved? [2]","Calculate the percentage saved when 5 MB becomes 3 MB. [3]","Thinking: Which compression should be used for source code? Why?"],
 ans=["Lossless is reversible; lossy discards information","5000 - 3000 = 2000 KB saved","(5 - 3) / 5 x 100 = 40%","Lossless: every character must be recoverable exactly."],
 exit=["Lossless compression can reproduce the original file exactly.","Lossy compression always keeps every original detail.","Compressed files can take less storage space."],
 exitans=["True","False: lossy discards some data","True"],
 guided="A 2,000 KB file becomes 1,250 KB. Find KB and percentage saved."),
8:dict(title="Primary Storage: RAM, ROM and Cache",goal="Distinguish the roles of RAM, ROM and cache, including volatility.",
 vocab=[("RAM","Volatile store for running programs"),("ROM","Non-volatile store for firmware"),("cache","Small, fast storage near the CPU"),("volatile","Loses contents without power")],
 retrieval=[("Previous lesson: what is lossless compression?","The original data can be restored exactly."),
            ("How much is saved if 2000 KB becomes 1500 KB?","500 KB."),
            ("Convert 32 bits into bytes.","32 / 8 = 4 bytes."),
            ("Why must executable code be restored without lost data?","Missing or changed bits may break the program.")],
 code=["Predict the number of gigabytes available.","Change used to 5. What does the program display?","Improve the code to show how much remains when used is 7."],
 codeans=["8 - 3 = 5 GB","8 - 5 = 3 GB","Set used = 7: output is 1 GB"],
 qs=["Explain why RAM is called volatile. [2]","Name the primary store commonly used for firmware. [1]","Give one way cache differs from RAM. [2]","Thinking: Why can more RAM help someone running many apps?"],
 ans=["Its stored contents are lost when power is removed","ROM","Cache is smaller and faster; it holds frequently needed data","More working data can remain in RAM instead of slower storage."],
 exit=["RAM normally loses its contents when power is switched off.","ROM usually stores firmware and retains its contents.","CPU cache is generally larger and slower than RAM."],
 exitans=["True","True","False: cache is smaller and faster"],
 guided="Match each task: a running app, start-up firmware and frequently used CPU data.")
}

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
    # Phase is identified by a blue marker, never a solid green heading.
    # Answer/feedback sections use green to identify correction, not teaching.
    feedback = ("Answers" in s or "Self-mark" in s
                or s.startswith("Try the question again"))
    marker = GREEN if feedback else BLUE
    B.box(p,45,y-9,3,15,marker)
    t(p,s,54,y+1,10.4,True)
    # Classroom routine / response badge on the same line as the phase.
    if s.startswith("Do Now") and not feedback:
        routine,kind="SILENT", "green"
    elif s.startswith("I Do"):
        routine,kind="LISTEN", "green"
    elif s.startswith("We Do"):
        routine,kind="MWBs", "orange"
    elif s.startswith("Code First"):
        routine,kind="MWBs", "orange"
    elif s.startswith("You Do") and not feedback:
        routine,kind="SILENT", "green"
    elif s.startswith("Exit Ticket"):
        routine,kind="THUMBS", "orange"
    elif feedback:
        routine,kind="GREEN PEN", "green"
    else:
        return
    accent = GREEN if kind=="green" else ORANGE
    tint = GREEN_LIGHT if kind=="green" else ORANGE_LIGHT
    x,w=462,84
    B.box(p,x,y-10,w,18,tint,accent,.75)
    p.insert_text((x+8,y+2.5),routine,fontsize=7.8,fontname="hebo",color=accent)

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
 if n==6:
  sec(p,"New learning - Sound becomes digital samples",103)
  t(p,"A microphone receives analogue sound. A computer takes regular samples.",45,130,8.7)
  t(p,"Sample rate = readings each second. Bit depth = bits per reading.",45,148,8.6)
  card(p,45,168,501,125,BLUE_LIGHT)
  t(p,"Digital readings of a changing sound signal",57,188,8.4,True)
  p.draw_line((60,240),(525,240),color=EDGE,width=.8)
  levels=[0,24,42,25,0,-25,-39,-19,0]
  for i,v in enumerate(levels):
   x=65+i*55; y=237-v
   p.draw_line((x,240),(x,y),color=BLUE,width=1)
   p.draw_circle((x,y),3,color=BLUE,fill=BLUE)
  t(p,"More samples per second record the changing signal in more detail.",57,282,8.1)
  sec(p,"I Do - Calculate an uncompressed file size",326)
  t(p,"For MONO audio, calculate the raw number of bits first.",45,353,8.7)
  card(p,45,372,501,89,BLUE_LIGHT)
  t(p,"RATE x DURATION x BIT DEPTH = BITS",56,396,9.5,True)
  t(p,"8000 x 2 x 8 = 128000 bits",56,425,9,True)
  t(p,"128000 / 8 = 16000 bytes",56,448,9,True)
  t(p,"Stereo adds a second channel, so raw size is twice as large.",45,493,8.6)
  sec(p,"We Do - Guided practice",537)
  t(p,d["guided"],45,563,8.6)
  t(p,"Samples: ________ x ________ = ___________",45,611,8.7)
  t(p,"Bits: __________ x ________ = ___________",45,658,8.7)
  t(p,"Bytes: __________ / 8 = ________________",45,704,8.7)
  rules(p,731,1)
 elif n==7:
  sec(p,"New learning - Reversible or discarded?",103)
  t(p,"Compression stores a file with fewer bits. The method matters.",45,130,8.7)
  card(p,45,152,245,100,BLUE_LIGHT);card(p,301,152,245,100)
  t(p,"LOSSLESS",57,173,10,True);t(p,"All original data can",57,198,8.6)
  t(p,"be restored exactly.",57,217,8.6)
  t(p,"LOSSY",313,173,10,True);t(p,"Some information is lost",313,198,8.6)
  t(p,"to reduce file size.",313,217,8.6)
  t(p,"Example: programming files need lossless compression.",45,282,8.7)
  sec(p,"I Do - Compare file sizes",324)
  t(p,"Original 5000 KB; compressed 3000 KB.",45,350,8.8)
  card(p,45,369,501,112,BLUE_LIGHT)
  t(p,"ORIGINAL",55,389,8.1,True);B.box(p,140,377,370,17,BLUE)
  t(p,"COMPRESSED",55,421,8.1,True);B.box(p,140,409,222,17,GREEN)
  t(p,"Saving = 5000 - 3000 = 2000 KB",55,451,9.1,True)
  t(p,"Percentage saved = 2000 / 5000 x 100 = 40%",55,470,8.5)
  sec(p,"We Do - Guided practice",528)
  t(p,d["guided"],45,556,8.55)
  t(p,"KB saved = ________ - ________ = __________",45,610,8.7)
  t(p,"Fraction saved = __________ / __________",45,655,8.7)
  t(p,"Percentage saved = __________ x 100 = ________%",45,698,8.7)
  rules(p,729,1)
 else:
  sec(p,"New learning - Three kinds of primary storage",103)
  t(p,"Primary storage supports the CPU and the programs it runs.",45,130,8.7)
  for i,(name,detail,property) in enumerate([
   ("RAM","Running apps and data","Volatile"),
   ("ROM","Start-up instructions","Non-volatile"),
   ("CACHE","Frequently used CPU data","Small and very fast")]):
   x=45+i*170
   card(p,x,154,160,124,BLUE_LIGHT if i!=1 else WHITE)
   t(p,name,x+10,177,10.2,True)
   t(p,detail,x+10,208,8.0,maxw=142)
   t(p,property,x+10,253,8.0,True)
  t(p,"Volatile means stored contents are lost when electrical power stops.",45,308,8.5)
  sec(p,"I Do - Choose the right memory",354)
  card(p,45,374,501,130,BLUE_LIGHT)
  t(p,"Opening a game: instructions/data are loaded into RAM.",55,396,8.8)
  t(p,"Starting the computer: firmware is retained in ROM.",55,433,8.8)
  t(p,"Repeated CPU instructions: small fast cache helps access.",55,470,8.5)
  sec(p,"We Do - Guided practice",542)
  t(p,d["guided"],45,567,8.4,maxw=493)
  t(p,"A running app belongs in: __________________",45,612,8.7)
  t(p,"Start-up firmware belongs in: ______________",45,653,8.7)
  t(p,"Repeated CPU data belongs in: _____________",45,695,8.7)
  rules(p,730,1)
def p3(p,n,d):
 t(p,"Think and write",45,76,15.2,True)
 sec(p,"Code First - Predict > Write > Test > Improve",103)
 t(p,"Start on paper. Do not look at model answers until page 4.",45,126,8.4)
 if n==6: code=["rate = 8000    duration = 2    depth = 8","print(rate * duration * depth)"]
 elif n==7:code=["original = 5000    compressed = 3000","print(original - compressed)"]
 else:code=["capacity = 8    used = 3","print(capacity - used)"]
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
 worked={6:"8000 x 3 x 8 / 8 = 24000 bytes",7:"750 KB saved; 750 / 2000 x 100 = 37.5%",8:"App: RAM; firmware: ROM; often-used CPU data: cache"}[n]
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
  # Verify all three teaching/routine/response colours render on every booklet.
  drawings=[drawing for page in r for drawing in page.get_drawings()]
  # Phase bars are solid fills; response badges use orange borders, so test both.
  colours=[c for drawing in drawings for c in (drawing.get("fill"),drawing.get("color")) if c]
  def has_colour(target):
   return any(len(colour)==3 and all(abs(a-b)<.035 for a,b in zip(colour,target)) for colour in colours)
  present={"blue":has_colour(BLUE),"green":has_colour(GREEN),"orange":has_colour(ORANGE)}
  assert all(present.values()), "Missing phase/routine colours: "+str(present)
  whole="\n".join(p.get_text() for p in r)
  assert all(word in whole for word in ("Do Now","Code First","You Do","Try the question again"))
 print("PASS",n,out.stat().st_size)
if __name__=="__main__":
 for n in (6,7,8):build(n)

# Publication trigger: batch 006-008: shared phase and routine palette plus direct Print PDF publication.
