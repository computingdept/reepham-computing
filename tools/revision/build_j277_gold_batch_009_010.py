#!/usr/bin/env python3
"""J277 gold-standard four-page PDFs for lessons 009 and 010.

Teaching sequence and task answers derive from lessons/j277/autumn1-009-013.json.
Visual explanations follow the published Paper 1 V4 guide (secondary storage,
the FDE cycle, four registers and the kitchen memory aid).
Reuse the approved Lesson 002 PDF header, five-stage footer, pen rules and layout.
Classroom behaviour/response badges must not be duplicated in the page body.
DO NOT modify classroom lessons, Catch up or revision guides.
"""
from pathlib import Path
import fitz
import build_j277_lesson001_gold_pdf as B
import build_j277_gold_batch_006_008 as G

R=Path(__file__).resolve().parents[2]
MASTER=R/"offline/booklets/j277/J277_Lesson_002_Gold_Standard_4_Page.pdf"
DEST=R/"offline/booklets/j277"
DATA={
9:dict(title="Secondary Storage and Device Choice",
 goal="Compare magnetic, optical and solid-state storage; justify a suitable choice.",
 vocab=[("magnetic","Bits recorded using magnetism"),("optical","Disc read using laser light"),
        ("solid-state","Memory chips without moving heads"),("secondary","Stores files without power")],
 retrieval=[("Previous lesson: which memory is volatile, RAM or ROM?","RAM."),
            ("Why does a CPU use cache?","Fast access to often-needed data."),
            ("Convert 6400 bits into bytes.","800 bytes."),
            ("Why does a saved SSD file survive power-off but unsaved RAM data may not?",
             "SSD is non-volatile; RAM is volatile.")],
 code=["Predict how many 8 GB files fit into 64 GB.",
       "Change fileGB to 16 and find the new answer.",
       "Why does capacity alone not decide the best device?"],
 codeans=["64 / 8 = 8 files","64 / 16 = 4 files","Also consider speed, cost, portability and durability"],
 qs=["Name two secondary storage technologies. [2]",
     "A travelling photographer drops their bag: choose and justify a device. [3]",
     "Why may an HDD suit a large low-cost school archive? [3]",
     "Thinking: explain why a fast SSD is not the best option for every task."],
 ans=["Any two: magnetic, optical, solid-state.",
      "Portable SSD: no moving heads; faster transfers; less knock damage.",
      "HDD: high capacity and relatively low cost per GB.",
      "It may cost more per GB; some tasks prioritise capacity or price."],
 exit=["Secondary storage retains data after power is removed.",
       "An SSD needs a moving read/write head.",
       "Storage is chosen using more than speed alone."],
 exitans=["True","False: SSD uses memory chips","True"],
 guided="Choose storage for an archive, a portable drive and an optical disc."),
10:dict(title="CPU Architecture, Registers and FDE",
 goal="Explain CU and ALU roles; trace a fetch using PC, MAR, MDR and ACC.",
 vocab=[("PC","Address of next instruction"),("MAR","Address being accessed"),
        ("MDR","Data or instruction transferred"),("ACC","Holds calculation results")],
 retrieval=[("Previous lesson: which storage has no moving read/write head?",
             "Solid-state storage."),
            ("Why might schools use an HDD for a large archive?",
             "High capacity at lower cost per GB."),
            ("Why is RAM not permanent file storage?","RAM is volatile."),
            ("Why choose an SSD for a portable laptop?","Fast access and resistance to knocks.")],
 code=["Predict the displayed output of the program.",
       "Change b from 5 to 9. What is printed?",
       "Which CPU unit calculates the sum?"],
 codeans=["7 + 5 = 12","7 + 9 = 16","ALU; the code is not a hardware simulation"],
 qs=["State what MAR and MDR each store. [2]",
     "Explain the role of the Program Counter in fetch. [2]",
     "What does the ALU do, and where may a result be held? [2]",
     "Thinking: describe why the CU and ALU have different jobs."],
 ans=["MAR: address; MDR: transferred data or instruction.",
      "PC holds the next instruction address, used for fetching.",
      "ALU performs arithmetic/logic; ACC can hold the result.",
      "CU controls/decodes; ALU carries out calculations and logic."],
 exit=["The Program Counter holds the next instruction address.",
       "MDR holds the address of the next instruction.",
       "The ALU carries out arithmetic and logical operations."],
 exitans=["True","False: the PC holds that address","True"],
 guided="Match PC, MAR, MDR and ACC with their roles in fetching and executing.")
}
WHITE=G.WHITE; BLUE=G.BLUE; GREEN=G.GREEN; ORANGE=G.ORANGE
BLUE_LIGHT=G.BLUE_LIGHT; ORANGE_LIGHT=G.ORANGE_LIGHT; EDGE=G.EDGE
t=G.t; sec=G.sec; rules=G.rules; tick=G.tick; card=G.card

def new_learning(p,n,d):
 t(p,"Learn and practise",45,76,15.2,True)
 if n==9:
  sec(p,"New learning - Non-volatile secondary storage",103)
  t(p,"Saved files remain when the computer is switched off.",45,130,8.7)
  t(p,"Compare technologies using the needs of the actual user.",45,146,8.5)
  technologies=[
    ("MAGNETIC HDD","Magnetic patterns","Moving parts","Low cost per GB"),
    ("OPTICAL DISC","Laser reads disc","Removable media","Useful for distribution"),
    ("SOLID-STATE","Memory chips","No moving heads","Fast, portable")
  ]
  for i,(heading,method,structure,advantage) in enumerate(technologies):
   x=45+i*170
   card(p,x,163,160,132,BLUE_LIGHT if i==2 else WHITE)
   t(p,heading,x+9,181,8.65,True)
   t(p,method,x+9,211,8,maxw=142)
   t(p,structure,x+9,235,8,maxw=142)
   t(p,advantage,x+9,270,7.95,True,maxw=142)
  t(p,"No one technology is best for every use.",45,319,8.5,True)
  sec(p,"I Do - Recommend with evidence",347)
  card(p,45,370,501,139,BLUE_LIGHT)
  t(p,"Scenario: A travelling photographer moves large files.",55,390,8.65,True)
  t(p,"Need 1: fast transfers. Need 2: resistance to knocks.",55,414,8.45)
  t(p,"Recommendation: portable solid-state drive (SSD).",55,445,9,True)
  t(p,"Reason: no moving heads; generally quick file transfers.",55,471,8.5)
  t(p,"Trade-off: SSDs may cost more per GB than HDDs.",55,493,8.2)
  sec(p,"We Do - Match requirements",536)
  t(p,"Choose a suitable type of secondary storage, then justify it.",45,563,8.35)
  t(p,"Large school archive, low cost: ___________________",45,611,8.5)
  t(p,"Portable storage for homework: ___________________",45,657,8.5)
  t(p,"Disc read using a laser: ________________________",45,701,8.5)
  rules(p,732,1)
 else:
  sec(p,"New learning - CPU units and registers",103)
  t(p,"Control Unit (CU): coordinates and decodes instructions.",45,130,8.55)
  t(p,"Arithmetic Logic Unit (ALU): arithmetic and logic.",45,148,8.55)
  registers=[
   ("PC","Next instruction","Recipe bookmark"),
   ("MAR","Memory address","Shelf location"),
   ("MDR","Data / instruction","Ingredient fetched"),
   ("ACC","Result of work","Mixing bowl")
  ]
  for i,(name,meaning,aid) in enumerate(registers):
   x=45+i*127
   card(p,x,169,117,101,BLUE_LIGHT)
   t(p,name,x+11,189,10.0,True)
   t(p,meaning,x+11,211,7.6,maxw=97)
   t(p,aid,x+11,252,7.4,maxw=98)
  sec(p,"I Do - Follow the fetch, decode, execute cycle",302)
  t(p,"PC names the next address; MAR sends it to memory.",45,328,8.5)
  labels=[("PC","next address"),("MAR","address"),("MEMORY","instruction"),("MDR","transfer"),("CU","decode")]
  for i,(name,desc) in enumerate(labels):
   x=45+i*101
   card(p,x,352,93,61,BLUE_LIGHT if i%2==0 else WHITE)
   t(p,name,x+8,372,8.5,True)
   t(p,desc,x+8,396,7.2,maxw=83)
   if i<4:
    p.draw_line((x+93,380),(x+100,380),color=BLUE,width=1.5)
  t(p,"The PC is updated. The CU decodes the fetched instruction.",45,440,8.4)
  t(p,"For an addition, the ALU calculates and ACC may hold the result.",45,458,8.35)
  card(p,45,481,501,45,WHITE)
  t(p,"Memory aid: PC = bookmark; MAR = shelf;",55,499,8.2)
  t(p,"MDR = fetched ingredient; ACC = mixing bowl.",55,516,8.2)
  sec(p,"We Do - Explain each register",551)
  t(p,"Use the model above. Complete each role in BLACK PEN.",45,577,8.5)
  t(p,"PC tells us: __________________________________",45,611,8.5)
  t(p,"MAR stores: __________________________________",45,653,8.5)
  t(p,"MDR holds: ___________________________________",45,695,8.5)
  rules(p,729,1)

def code_page(p,n,d):
 t(p,"Think and write",45,76,15.2,True)
 sec(p,"Code First - Predict > Write > Test > Improve",103)
 t(p,"Start on paper. Check the model answers only on page 4.",45,126,8.4)
 code=(["capacityGB = 64    fileGB = 8","print(capacityGB / fileGB)"] if n==9
       else ["a = 7    b = 5","print(a + b)"])
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

def answers_page(p,n,d):
 t(p,"Review & improve",45,76,15.2,True)
 t(p,"GREEN PEN: Tick correct answers. For a mistake, use the model answer",45,99,8.35)
 t(p,"then copy the FULL question and write a fresh answer below.",45,112,8.35)
 sec(p,"Do Now - Answers",136)
 for i,(q,a) in enumerate(d["retrieval"]):
  y=158+30*i;t(p,"Q"+str(i+1),48,y,8,True);t(p,a,75,y,7.8,maxw=208);tick(p,284,y-7)
 sec(p,"We Do - Guided practice",280)
 worked={9:"Archive: HDD; portable: SSD/USB; optical: disc",
         10:"PC: next instruction; MAR: address; MDR: data/instruction"}[n]
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
  t(p,a,120,y,7.65,maxw=407)
  tick(p,535,y-7);B.line(p,51,y+10,545)
 sec(p,"Try the question again",607)
 t(p,"1. Copy the FULL question you got wrong (or the hardest):",45,633,8.25,True)
 rules(p,652,3,step=19)
 t(p,"2. In GREEN PEN, write a NEW answer. Show working:",45,715,8.25,True)
 rules(p,734,3,step=19)

def build(n):
 d=DATA[n]
 doc=fitz.open(MASTER)
 assert len(doc)==4
 for i,page in enumerate(doc):
  G.header(page,n)
  if i==0:G.p1(page,d)
  elif i==1:new_learning(page,n,d)
  elif i==2:code_page(page,n,d)
  else:answers_page(page,n,d)
 outfile=DEST/("J277_Lesson_%03d_Gold_Standard_4_Page.pdf"%n)
 doc.set_metadata({"title":"OCR J277 Lesson %03d - %s"%(n,d["title"]),
                   "creator":"RHS Computing - approved gold four-page print layout"})
 doc.save(outfile,garbage=4,deflate=True)
 doc.close()
 with fitz.open(outfile) as test:
  assert len(test)==4
  for page in test:
   assert round(page.rect.width)==595 and round(page.rect.height)==842
   alltext=page.get_text()
   assert "LESSON %03d"%n in alltext
   assert "BLACK PEN" in alltext and "GREEN PEN" in alltext
  joined="\n".join(page.get_text() for page in test)
  for term in ["Do Now","Code First","You Do","Try the question again",
               d["title"],"Review & Improve"]:
   assert term in joined,(n,term)
  body_words = {w[4].upper() for page in test for w in page.get_text("words")
                if 54 <= w[1] < 780}
  assert not body_words.intersection({"SILENT","LISTEN","MWBS","THUMBS"}), (n, body_words)
 print("PASS gold PDF",n,outfile.stat().st_size,"bytes")
if __name__=="__main__":
 for n in (9,10):build(n)
