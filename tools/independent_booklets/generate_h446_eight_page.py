#!/usr/bin/env python3
"""OCR H446 print: EIGHT A4 PAGES, designed from lesson source not website screenshots.

Student pages: Do Now / New Learning / Apply & vocabulary / I Do /
We Do / You Do part 1 / You Do part 2 / Exit.
Select only representative teaching figures, but include a source diagram with
EVERY independent question that requires one. Detailed model answers in a
separate, unlinked teacher-review PDF. Nothing edits the teaching lesson or the
live print catalogue. Fail if content or source figures cannot fit legibly.
"""
from __future__ import annotations
import html, io, json, re, textwrap, sys
from collections import Counter
from pathlib import Path
from bs4 import BeautifulSoup
from PIL import Image,ImageDraw
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader, simpleSplit
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import fitz

HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[1]
sys.path.insert(0,str(HERE))
from source_model import h446_source,HROOT,blocks
from publish_h446_visual_pilot import png_bytes
from render_pdf import impose_a3

OUT=ROOT/"offline/booklets/h446"
CAT=ROOT/"offline/booklets/catalogue.json"
NUMBERS=(29,106,218)
W,H=A4
LEFT,RIGHT=43,W-43
WIDTH=RIGHT-LEFT
TOP=752
BOTTOM=64
FORE="#1e3430"
GREEN="#195b47"
GRAY="#586562"
REG="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
MONO="/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
pdfmetrics.registerFont(TTFont("Eight",REG))
pdfmetrics.registerFont(TTFont("EightBold",BOLD))
pdfmetrics.registerFont(TTFont("EightMono",MONO))
pdfmetrics.registerFontFamily("Eight",normal="Eight",bold="EightBold")
STAGES=[
  "Do Now · retrieval",
  "New Learning · key ideas",
  "New Learning · use the knowledge",
  "I Do · worked example",
  "We Do · Try → Discuss → Improve",
  "You Do · independent practice",
  "You Do · extended practice",
  "Exit Ticket · check learning",
]


# Purpose-built, answer-free application prompts. These replace the generic
# page-3 reflection for early lessons where Q1 + final-Q selection misses a
# central skill. Each prompt is accompanied by a short teacher-review key;
# neither changes the live classroom lesson nor the student Print catalogue.
# Keep wording brief enough to retain full-size print and handwriting space.
SKILL_CHECKS={
    1: ("Convert 37 to unsigned 8-bit binary; convert 01101001 to denary. Show the place values in both directions.",
        "37 = 32 + 4 + 1, so 00100101. 01101001 = 64 + 32 + 8 + 1 = 105."),
    2: ("Using 8-bit two's complement, calculate 23 + 19 and 18 - 29. Show the binary working and signed results.",
        "23 + 19: 00010111 + 00010011 = 00101010 (+42). 18 - 29: 00010010 + 11100011 = 11110101 (-11)."),
    3: ("Starting with 10100101, calculate (a) a logical shift right by 2 and (b) AND with 00001111. Explain each result.",
        "Logical >>2 gives 00101001 (discard two rightmost bits, fill with zeros). AND 00001111 gives 00000101 (clear upper four bits)."),
    4: ("Represent -0.375 in normalised floating-point form using an 8-bit two's-complement mantissa and 4-bit exponent. Show each step.",
        "-0.375 = -0.11 binary = -0.75 x 2^-1. Mantissa 10100000; exponent 1111. Normalised sign bits are 10."),
    5: ("Decode 01110000 0010 to denary (8-bit mantissa, 4-bit exponent). Is 00011010 0101 normalised? Justify.",
        "01110000 = +0.875, exponent 0010 = +2, so 3.5. 00011010 is not normalised: its first two mantissa bits are 00."),
    6: ("Add -5 and +3 with a 6-bit two's-complement mantissa and 4-bit exponent. Show alignment, signed addition and normalisation.",
        "-5 + 3 = -2. With common exponent 3, working sum is 1111000 in 7-bit working width. Normalised result: 100000 0001."),
    7: ("Calculate 5 - (-1.5) with a 6-bit two's-complement mantissa and 4-bit exponent. Show align, negate, add and normalise.",
        "5 - (-1.5) = +6.5. Common exponent 3; aligned mantissas 0010100 and 1111010; negate second to 0000110; sum 0011010; normalised result 011010 0011."),
    8: ("Compare standard ASCII with Unicode for a multilingual app. Then encode the character C as an 8-bit ASCII byte (A = 65).",
        "Standard ASCII has 128 codes (7-bit), unsuitable for Chinese characters; Unicode has a far wider repertoire. C = 67 = 01000011 in an 8-bit byte."),
    9: ("Write C# if / else if / else to label ages 0-11 Child, 12-17 Teen, 18+ Adult. Test 11, 12, 17 and 18.",
        "Assuming age >= 0: if (age < 12) Child; else if (age < 18) Teen; else Adult. Boundary outputs: Child, Teen, Teen, Adult."),
   10: ("Write a C# while loop that asks for an age until it is between 0 and 120 inclusive. Test -1, 121 and 0.",
        "Use do-once input before while OR initialise age to -1: while (age < 0 || age > 120) { age = int.Parse(Console.ReadLine()); }. The first two entries are rejected; 0 is accepted."),
}
# Zero-based indices. The remaining 278 booklets retain their previous
# source-question policy until individually revised.
EXAM_SELECTION_OVERRIDES={
    8: (1,4),  # ASCII/Unicode comparison + variable-width UTF-8 capacity
    9: (0,2),  # basic selection + compound AND application
   10: (1,3),  # useful count-controlled loop + do/while challenge
}


# Guided practice written for a learner working ALONE with the booklet.
# Use progressive, topic-specific CLUES rather than a partner/teacher prompt.
# Answers are kept off page 5 and appear at the END of the booklet.
SOLO_WE_DO = {
    1: {
      "clues": ("Is 0042 an amount to calculate with, or an identifier?",
                "What would happen to its leading zeros if it were stored as an integer?",
                "Choose a type that preserves the exact sequence of characters."),
      "steps": ("State the value's purpose.", "Choose the most suitable data type.",
                "Explain why a different type would change the identifier."),
      "answer": 'Use a string: "0042" is an identifier, and an integer would discard the leading zeros.'
    },
    2: {
      "clues": ("For 8-bit two's complement, the leftmost place has weight -128.",
                "Write the weights of every bit set to 1 in 11100110.",
                "Add those signed place values; the final number should be negative."),
      "steps": ("List the signed place values.", "Add the signed values.",
                "State the denary value and check the sign."),
      "answer": "11100110 = -128 + 64 + 32 + 4 + 2 = -26."
    },
    3: {
      "clues": ("Three hexadecimal digits have place values 256, 16 and 1.",
                "The hexadecimal digit F represents denary 15.",
                "Multiply each digit by its place value before adding."),
      "steps": ("Write the three place values.", "Calculate each weighted contribution.",
                "Add to give the denary result."),
      "answer": "2F3 = (2 x 256) + (15 x 16) + (3 x 1) = 755."
    },
    4: {
      "clues": ("0.15625 is 1/8 + 1/32. Write this as a binary fraction.",
                "For a normalised positive two's-complement mantissa, the first two bits are 01.",
                "If the binary point moves left, compensate using a negative exponent."),
      "steps": ("Convert the fraction to binary.", "Normalise the fraction.",
                "Encode the 8-bit mantissa and signed 4-bit exponent."),
      "answer": "0.15625 = 0.00101 (binary) = 0.101 x 2^-2; mantissa 01010000, exponent 1110."
    },
    5: {
      "clues": ("For an 8-bit two's-complement mantissa, weights begin -1, 1/2, 1/4, 1/8.",
                "Decode the four-bit exponent as a signed integer.",
                "Multiply the signed mantissa by 2 to the power of the exponent."),
      "steps": ("Decode the mantissa.", "Decode the exponent.",
                "Scale and calculate the final denary value."),
      "answer": "10110000 = -0.625; 0010 = +2; -0.625 x 2^2 = -2.5."
    },
    6: {
      "clues": ("Express 6 and 5 with 6-bit mantissas and a common exponent of 3.",
                "Keep an extra sign bit for the working sum before storing a 6-bit mantissa.",
                "If the mantissa is too large, shift it right and increase the exponent."),
      "steps": ("Align the two operands.", "Add the widened signed mantissas.",
                "Normalise and state both final fields."),
      "answer": "At exponent 3, 0011000 + 0010100 = 0101100 (working width); normalised 010110 0100 = 11."
    },
    7: {
      "clues": ("Rewrite 1.5 - 5 as 1.5 + (-5).",
                "Align to the same exponent BEFORE negating the second mantissa.",
                "Keep an extra sign bit in the working sum; then normalise."),
      "steps": ("Align the mantissas.", "Negate the second and add.",
                "Normalise the signed result and check its value."),
      "answer": "Aligned at exponent 3: 0000110 + 1101100 = 1110010; normalised 100100 0010 = -3.5."
    },
    8: {
      "clues": ("The ASCII code for character '0' is 48.",
                "The code for character '7' is seven more than the code for '0'.",
                "An integer with value 7 is not the same as the ASCII code for '7'."),
      "steps": ("Find the ASCII code for the digit character.", "Convert that code to an 8-bit byte.",
                "Convert the integer 7 and explain the difference."),
      "answer": "Character '7' has code 55 = 00110111; integer 7 is 00000111 as an 8-bit unsigned value."
    },
    9: {
      "clues": ("The operator % gives the remainder after division.",
                "An even number has remainder 0 when divided by 2.",
                "Use if for the even case and else for the remaining case."),
      "steps": ("Write the Boolean condition.", "Write the two output branches.",
                "Test one even and one odd input."),
      "answer": 'if (number % 2 == 0) { Console.WriteLine("Even"); } else { Console.WriteLine("Odd"); }'
    },
    10: {
      "clues": ("The counter starts at 1 and increases by 1 each time.",
                "The loop must include 5 but must not run when i becomes 6.",
                "The value printed each time is the counter multiplied by itself."),
      "steps": ("Complete the loop start and condition.", "Complete the counter update.",
                "Write the output statement and test the five results."),
      "answer": "for (int i = 1; i <= 5; i++) { Console.WriteLine(i * i); }  Output: 1, 4, 9, 16, 25."
    },
}

def source_html(n):
    return BeautifulSoup((HROOT/f"lesson-{n:03d}"/"index.html").read_text(encoding="utf-8"),"html.parser")

def clean(s):
    return re.sub(r"\s+"," ",str(s or "")).strip()

def pick(seq,maxn):
    seq=list(seq)
    if len(seq)<=maxn:return seq
    if maxn==1:return [seq[-1]]
    loc=[int(round(i*(len(seq)-1)/(maxn-1))) for i in range(maxn)]
    return [seq[i] for i in dict.fromkeys(loc)]

def source_svg(soup,selector):
    result=[]
    for node in soup.select(selector):
        if node.select("path,rect,line,circle,ellipse,polygon,polyline,text,use"):
            result.append(node)
    return result

def source_vocabulary(soup):
    """Use actual OCR terms, not the interactive heading 'Recall the term'."""
    result=[]
    for stage in soup.select("#vocabulary .vocab-stage"):
        term=stage.select_one(".vocab-answer-value")
        clue=stage.select_one(".vocab-question")
        if term and clue:
            word=clean(term.get_text(" ",strip=True))
            definition=clean(clue.get_text(" ",strip=True))
        else:
            term=stage.select_one("h2")
            clue=stage.select_one("p")
            word=clean(term.get_text(" ",strip=True)) if term else ""
            definition=clean(clue.get_text(" ",strip=True)) if clue else ""
        if word and definition and word.lower() not in ("recall the term","recall the syntax"):
            if (word,definition) not in result:
                result.append((word,definition))
    return result

def exam_questions(soup,lesson):
    nodes=soup.select("#you-do article.youdo-question, #you-do article.exam-card")
    if len(nodes)!=len(lesson.you_do):
        raise ValueError(f"You Do question mismatch: {len(nodes)} HTML vs {len(lesson.you_do)} extracted")
    result=[]
    for i,(node,(prompt,answer)) in enumerate(zip(nodes,lesson.you_do),1):
        if not prompt:raise ValueError(f"You Do {i} missing original prompt")
        # These are attached to their corresponding source question, not
        # generic instructional figures selected from the web lesson.
        # Keep original *question* diagrams, never the second SVG inside
        # a hidden answer/solution <details> element. An entire rolling
        # question article may be hidden initially by the classroom UI;
        # that does NOT mean its independent source question is omitted.
        visuals=[]
        for svg in source_svg(node,"svg"):
            parents=[]
            for parent in svg.parents:
                if parent is node:break
                parents.append(parent)
            if any(p.name=="details" or p.has_attr("hidden") or
                   any("model" in cls.lower() or "solution" in cls.lower()
                       for cls in p.get("class",[]))
                   for p in parents):
                continue
            visuals.append(svg)
        if node.select("img"):
            raise ValueError(f"You Do Q{i}: external image requires manual print design")
        if len(visuals)>1:
            raise ValueError(f"You Do Q{i} has {len(visuals)} unsolved diagrams; needs manual layout")
        # In the booklet a source Q4 selected as the second printed
        # question must not still be labelled "4." inside its prompt.
        shown=re.sub(r"^\s*(?:(?:Question|Q)\s*)?\d+[.)]\s+","",prompt,flags=re.I)
        result.append((shown,answer,visuals[0] if visuals else None))
    if len(result)<2:
        raise ValueError("Insufficient independent practice for eight-page design")
    return result

def model_and_guided(lesson,soup,n):
    if not lesson.model_question or not lesson.model_steps:
        raise ValueError("Original I Do modelling incomplete")
    if not lesson.guided or any(not x[0].strip() for x in lesson.guided):
        raise ValueError("Original guided questions incomplete")
    # First guided exercise is an actual scaffold (remaining are on website).
    examples=soup.select("#we-do .wedo-example")
    if not examples:
        raise ValueError("Source We Do examples unavailable")
    first=examples[0]
    # Find unattempted student task without the hidden CHECK or any
    # adjacent worked model; source_model.guided remains source of answer.
    task=first.select_one(".wedo-step:not([hidden])")
    if task:
        task_copy=BeautifulSoup(str(task),"html.parser")
        for node in task_copy.select("[hidden],svg,.answer,.worked-answer"):
            node.decompose()
        parts=blocks(task_copy)
        task_text="\n".join(parts)
    else:
        # Alternative layouts: only question-side h2 and input code.
        head=first.select_one(".h13-pane h2,.h446-panel h2,.y13-left h2,.wedo-reference h2")
        task_text=clean(head.get_text(" ",strip=True)) if head else ""
        code=first.select_one(".y13-left pre,.h13-pane pre,.h446-panel pre")
        if code and n in (218,):
            task_text+="\n"+code.get_text("\n",strip=True)
    if not task_text:
        raise ValueError("Cannot isolate answer-free We Do task")
    return task_text

def ink(mode):
    return colors.HexColor("#292929" if mode=="bw" else GREEN)

class Paper:
    def __init__(self,n,lesson,mode,path):
        self.n,self.lesson,self.mode=n,lesson,mode
        self.doc=canvas.Canvas(str(path),pagesize=A4,pageCompression=1)
        self.doc.setTitle(f"RHS H446 lesson {n:03d} · eight-page student booklet · draft")
        self.page=0
        self.y=TOP
        self.limits=[]
        self.figures=[]
    def new(self,title):
        if self.page:self.doc.showPage()
        self.page+=1
        if self.page>8:raise ValueError("More than eight pages")
        self.doc.setFillColor(ink(self.mode))
        self.doc.rect(0,H-9,W,9,stroke=0,fill=1)
        self.doc.setStrokeColor(colors.HexColor("#d4ded9"))
        self.doc.line(LEFT,H-43,RIGHT,H-43)
        self.doc.setFont("EightBold",8.7)
        self.doc.drawString(LEFT,H-31,f"RHS COMPUTING  /  OCR H446  /  LESSON {self.n:03d}")
        self.doc.setFont("Eight",8.3)
        self.doc.drawRightString(RIGHT,H-31,"DRAFT · TEACHER REVIEW")
        self.doc.setFont("EightBold",15.8)
        self.doc.setFillColor(ink(self.mode))
        self.doc.drawString(LEFT,H-75,title)
        self.doc.setStrokeColor(colors.HexColor("#b7c9c2"))
        self.doc.line(LEFT,49,RIGHT,49)
        self.doc.setFillColor(colors.HexColor("#586562"))
        self.doc.setFont("Eight",8.3)
        self.doc.drawString(LEFT,34,"BLACK PEN: answer first  ·  GREEN PEN: review afterwards")
        self.doc.drawRightString(RIGHT,34,f"{self.page} / 8")
        self.y=TOP
    def safe(self,y):
        if y<BOTTOM:
            raise ValueError(f"Page {self.page} overflow y={y:.1f}; no automatic shrinking permitted")
        return y
    def line(self,text,size=10.6,bold=False,spacing=5,leading=None,font=None):
        font=font or ("EightBold" if bold else "Eight")
        leading=leading or size*1.49
        value=str(text or "").strip()
        if not value:return
        for source_line in value.splitlines():
            wrapped=simpleSplit(clean(source_line),font,size,WIDTH) or [""]
            for row in wrapped:
                self.safe(self.y-leading)
                self.doc.setFont(font,size)
                self.doc.setFillColor(colors.HexColor(FORE if self.mode=="bw" else "#1c3e36"))
                self.doc.drawString(LEFT,self.y,row)
                self.y-=leading
        self.y-=spacing
        self.safe(self.y)
    def section(self,label):
        self.y-=5
        self.safe(self.y-23)
        self.doc.setFont("EightBold",11.8)
        self.doc.setFillColor(ink(self.mode))
        self.doc.drawString(LEFT,self.y,label)
        self.y-=22
    def rules(self,n=2):
        for _ in range(n):
            self.safe(self.y-19)
            self.y-=19
            self.doc.setStrokeColor(colors.HexColor("#a1aca8"))
            self.doc.setLineWidth(.5)
            self.doc.line(LEFT,self.y,RIGHT,self.y)
        self.y-=8
    def figure(self,node,tag,maxw=390,maxh=165):
        if node is None:return
        png,(iw,ih),ink_ratio=png_bytes(str(node),self.mode)
        aspect=iw/ih
        w=min(maxw,maxh*aspect)
        h=w/aspect
        if h>maxh:
            h=maxh;w=h*aspect
        # Do not shrink a visual below the minimum legibility envelope:
        # source image must remain meaningful in the student print version.
        # Slightly narrow figures (e.g. an 184pt Noughts & Crosses
        # board) may be enlarged 3-8% without shrinking labels or taking
        # over the page. This is a genuine print-size increase.
        if 175<=w<190:
            factor=190/w
            if h*factor<=maxh+16:
                w=190
                h*=factor
        if w<190 or h<49:
            raise ValueError(f"Figure too small in student print: {tag} {w:.0f}×{h:.0f}")
        self.safe(self.y-h-29)
        self.doc.setFont("EightBold",9.1)
        self.doc.setFillColor(ink(self.mode))
        self.doc.drawString(LEFT,self.y,tag)
        self.y-=14
        x=(W-w)/2
        self.doc.drawImage(ImageReader(io.BytesIO(png)),x,self.y-h,w,h,mask="auto")
        self.figures.append({"page":self.page,"tag":tag,"width":round(w,1),"height":round(h,1),"ink":ink_ratio})
        self.y-=h+14
    def close(self):
        if self.page!=8:raise ValueError(f"Expected 8 pages, got {self.page}")
        self.doc.save()

def extract_prompts(soup,lesson):
    # Exclude model answers and hidden content from student pages.
    if len(lesson.do_now)!=4:raise ValueError("Do Now must have four original questions")
    if not lesson.new_learning:raise ValueError("No New Learning source paragraphs")
    if not lesson.exit_question:raise ValueError("Exit Ticket missing")
    return exam_questions(soup,lesson)

def build_student(n,mode,lesson,soup,questions,out):
    paper=Paper(n,lesson,mode,out)
    paper.new("Do Now · retrieval")
    paper.line(lesson.title,size=12.3,bold=True)
    paper.line("Name: ____________________   Class: _________   Date: __________",size=9.8)
    paper.line("Answer four retrieval questions before reviewing earlier learning.",size=9.7)
    for i,(prompt,_) in enumerate(lesson.do_now,1):
        paper.section(f"Q{i}")
        paper.line(prompt,10.6)
        paper.rules(3 if i==4 else (2 if len(prompt)>125 else 1))

    new=pick(lesson.new_learning,5)
    new_figure=source_svg(soup,"#new-learning svg")
    # Two pages for selected core concepts; not all website reveal states.
    paper.new("New Learning · key ideas")
    paper.line("The important knowledge from today's lesson. Read, annotate, and explain it.",9.8)
    for k,item in enumerate(new[:3],1):
        paper.section(f"Core idea {k}")
        paper.line(item,10.4)
    if new_figure:
        # A square state-grid needs an A4 footprint large enough for the
        # labels: do not reject or thumbnail it to save a few centimetres.
        selected=new_figure[-1]
        # BeautifulSoup's HTML parser canonicalises SVG 'viewBox' to
        # lowercase 'viewbox', so check both spellings.
        vb=selected.get("viewbox") or selected.get("viewBox") or ""
        parts=[float(v) for v in vb.replace(","," ").split()]
        aspect=parts[2]/parts[3] if len(parts)==4 and parts[3]>0 else 2
        paper.figure(selected,"Key visual · complete concept",maxw=370,
                     maxh=190 if aspect<=1.15 else 137)

    if paper.y>330:
        paper.section("Annotate the key visual")
        paper.line("Explain which labels or features show the main process.",9.8)
        paper.rules(4)
    paper.new("New Learning · applying the ideas")
    for k,item in enumerate(new[3:],4):
        paper.section(f"Core idea {k}")
        paper.line(item,10.4)
    vocab=source_vocabulary(soup)
    if vocab:
        paper.section("Vocabulary · use the correct technical terms")
        for term,definition in vocab[:4]:
            paper.line(f"{term} — {definition}",10.0)
    if n in SKILL_CHECKS:
        paper.section("Independent skill check · apply the lesson")
        paper.line(SKILL_CHECKS[n][0],10.1)
        paper.rules(7 if n in (9,10) else 6)
    else:
        paper.section("Check your understanding")
        paper.line("Explain one key process in your own words using two of the terms above.",10.4)
        paper.rules(7)
    paper.line("More animated examples are available in the original online lesson.",9.0)

    paper.new("I Do · worked example")
    paper.section("Problem")
    paper.line(lesson.model_question,10.5)
    paper.section("Follow the worked method")
    for k,step in enumerate(pick(lesson.model_steps,3),1):
        paper.line(f"{k}. {step}",10.1)
    model_fig=source_svg(soup,"#i-do svg")
    if model_fig:
        worked=model_fig[-1]
        vb=worked.get("viewbox") or worked.get("viewBox") or ""
        parts=[float(v) for v in vb.replace(","," ").split()]
        aspect=parts[2]/parts[3] if len(parts)==4 and parts[3]>0 else 2
        paper.figure(worked,"Source model · final illustrated step",maxw=385,
                     maxh=190 if aspect<=1.15 else 153)
    paper.section("Why this method works")
    paper.line("Identify the decision, rule or invariant that makes the method correct.",10.3)
    paper.rules(3)

    task=model_and_guided(lesson,soup,n)
    if n in SOLO_WE_DO:
        support=SOLO_WE_DO[n]
        paper.new("We Do · solo guided practice")
        paper.line("Work ALONE. Try first; read the clues one at a time if you get stuck.",9.8)
        paper.line("Complete the steps below. Check your answer only on page 8.",9.6)
        paper.section("YOUR TASK")
        paper.line(task,10.3)
        paper.section("CLUES · uncover one at a time")
        for i,clue in enumerate(support["clues"],1):
            paper.line(f"Clue {i}: {clue}",9.8,spacing=2)
        paper.section("BUILD YOUR ANSWER · in BLACK PEN")
        for i,step in enumerate(support["steps"],1):
            paper.line(f"Step {i}: {step}",9.7,spacing=1)
            paper.rules(2)
        paper.section("CHECK BEFORE TURNING THE PAGE")
        paper.line("Have you shown every step? The worked self-check is at the END on page 8.",9.3)
    else:
        paper.new("We Do · Try → Discuss → Improve")
        paper.line("TRY independently in BLACK PEN; compare methods with a partner; improve your reasoning.",10.0)
        paper.section("Guided problem · TRY")
        paper.line(task,10.7)
        # Only an input state is permitted, never a worked/reveal SVG.
        if n==29:
            v=source_svg(soup,"#we-do .wedo-example svg")
            if not v:raise ValueError("K-map guided question needs a diagram")
            paper.figure(v[0],"Guided K-map · mark the pair",maxw=380,maxh=142)
        paper.rules(8)
        paper.section("DISCUSS")
        paper.line("Compare how you reached the answer. Where could someone make an error?",10.1)
        paper.rules(4)
        paper.section("IMPROVE")
        paper.line("Add one precise correction or a stronger reason. Answers are not printed here.",10.0)
        paper.rules(4)

    split=2 if len(questions)>=3 else 1
    for page_no,items in ((6,questions[:split]),(7,questions[split:])):
        paper.new("You Do · independent practice" if page_no==6 else "You Do · extended practice")
        paper.line("Answer these selected original questions in BLACK PEN. Other exam tasks remain online.",9.8)
        for index,(prompt,_answer,svg) in enumerate(items,1 if page_no==6 else split+1):
            paper.section(f"Question {index}")
            paper.line(prompt,10.45)
            if svg:
                # The last independent question gets a dedicated page in the
                # two-question K-map selection; print its four-variable grid
                # appreciably larger without reducing the response area.
                visual_height=190 if page_no==7 and len(items)==1 else 152
                paper.figure(svg,f"Question {index} · original source diagram",
                             maxw=392,maxh=visual_height)
            # Allocate actual handwriting space to an extended exam answer.
            # Six-mark responses need far more than four short ruled lines.
            # Preserve printed diagrams and stop on any A4 overflow.
            m=re.search(r"\[(\d{1,2})\]|\b(\d{1,2})\s+marks?\b",prompt,re.I)
            marks=int(next((v for v in m.groups() if v),0)) if m else 0
            if svg:
                lines=7 if len(items)==1 else 5
            elif len(items)==1:
                lines=max(14,min(20,marks*2+2)) if marks else 15
            else:
                lines=max(7,min(12,marks*2)) if marks else 9
            paper.rules(lines)
        if paper.y>155:
            paper.line("Check that you have used the technical terms and explained your decisions.",9.4)

    paper.new("Exit Ticket · reflect and retrieve")
    paper.section("Exit Ticket")
    paper.line(lesson.exit_question,10.9)
    paper.rules(3)
    paper.section("Use key vocabulary from memory")
    for i,(term,_) in enumerate(vocab[:3],1):
        paper.line(f"{i}. Explain {term} in your own words.",10.1)
        paper.rules(2)
    if n in SOLO_WE_DO:
        paper.section("Confidence and next step")
        paper.line("How confident are you?  Thumbs up / side / down",10.0)
        paper.rules(1)
        paper.section("END SELF-CHECK · only after you have attempted the work")
        paper.line("PAGE 5 · Guided We Do solution:",9.2,bold=True,spacing=2)
        paper.line(SOLO_WE_DO[n]["answer"],9.25,spacing=3)
        paper.line("PAGE 3 · Independent skill check:",9.2,bold=True,spacing=2)
        paper.line(SKILL_CHECKS[n][1],9.1,spacing=2)
        paper.line("Correct any errors in GREEN PEN. Write one improvement.",9.2)
        paper.rules(1)
        paper.line(f"YOU DO ANSWERS: rhsccs.org/lessons/h446/lesson-{n:03d}/answers.html",8.8)
    else:
        paper.section("Confidence and next step")
        paper.line("How confident are you?   Thumbs up / side / down",10.3)
        paper.line("Which question would you improve after checking the classroom model?",10.3)
        paper.rules(3)
        paper.line("Check answers after the lesson using the teacher-guided source models.",9.4)
    paper.close()
    return paper.figures

def build_staff(n,lesson,out,selected_indices):
    """A separate unlinked source-answer PDF for the teacher, not the pupil PDF."""
    doc=SimpleDocTemplate(str(out),pagesize=A4,leftMargin=45,rightMargin=45,
        topMargin=48,bottomMargin=49,title=f"OCR H446 {n:03d} unapproved source-model key")
    heading=ParagraphStyle("Head",fontName="EightBold",fontSize=15.2,leading=21,spaceAfter=11)
    sub=ParagraphStyle("Sub",fontName="EightBold",fontSize=11.1,leading=17,spaceBefore=12,spaceAfter=6)
    body=ParagraphStyle("Body",fontName="Eight",fontSize=9.8,leading=15,spaceAfter=8)
    flow=[Paragraph(f"STAFF REVIEW · H446 {n:03d} source models",heading),
          Paragraph("Separate from the eight-page pupil workbook. This copy is in a public repository and is NOT access controlled. Check technical correctness before use.",body),
          Paragraph("Printed question mapping: "+"; ".join(
              f"Booklet Q{i} = original online Q{source_i+1}"
              for i,source_i in enumerate(selected_indices,1)),body)]
    def add(name,answers):
        flow.append(Paragraph(name,sub))
        for i,answer in enumerate(answers,1):
            v=html.escape(str(answer or "[No safely extracted source model: staff must check]"))
            v=v.replace("\n","<br/>")
            flow.append(Paragraph(f"{i}. {v}",body))
    add("Do Now — source answers",[v for _,v in lesson.do_now])
    add("I Do — source worked steps",lesson.model_steps)
    add("We Do — guided CHECK",[v for _,v in lesson.guided])
    if n in SKILL_CHECKS:
        add("Page 3 — independent skill check, teacher-review model",[SKILL_CHECKS[n][1]])
    add("You Do — source mark schemes",[v for _,v in lesson.you_do])
    add("Exit Ticket — source answer",[lesson.exit_answer])
    doc.build(flow)

def inspect_pdf(n,student,questions,figures):
    with fitz.open(student) as pdf:
        if len(pdf)!=8:raise ValueError("Not exactly eight A4 pages")
        ptext=[p.get_text() for p in pdf]
        expected=["Do Now","New Learning","New Learning","I Do","We Do","You Do","You Do","Exit Ticket"]
        for i,(text,marker) in enumerate(zip(ptext,expected),1):
            if marker not in text:raise ValueError(f"Page {i} missing {marker}")
            if len(text.strip())<170:raise ValueError(f"Page {i} nearly empty")
            if abs(pdf[i-1].rect.width-W)>1 or abs(pdf[i-1].rect.height-H)>1:
                raise ValueError("Non-A4 page")
        if n in SKILL_CHECKS and "Independent skill check" not in ptext[2]:
            raise ValueError("Page 3 missing the required independent skill check")
        if n in SOLO_WE_DO:
            for expected in ("CLUES", "Step 1:", "Step 2:", "Step 3:"):
                if expected not in ptext[4]:
                    raise ValueError(f"Page 5 missing solo scaffold: {expected}")
            if "END SELF-CHECK" not in ptext[7] or "Guided We Do solution" not in ptext[7]:
                raise ValueError("Page 8 lacks the end-of-booklet We Do self-check")
            if SOLO_WE_DO[n]["answer"][:35] in ptext[4]:
                raise ValueError("We Do solution appears before the end of the booklet")
        for i,question in enumerate(questions,1):
            if not question[0][:65].strip() in "\n".join(ptext):
                # Line wrapping may intervene; compare normalized text.
                prompt=re.sub(r"\s+"," ",question[0][:60])
                whole=re.sub(r"\s+"," "," ".join(ptext))
                if prompt not in whole:
                    raise ValueError(f"Original independent Q{i} not found in student booklet")
        for prompt,_ in h446_source(n).do_now:
            if clean(prompt)[:40] not in clean(" ".join(ptext)):
                raise ValueError("Original Do Now prompt missing")
        for answer in [ans for _,ans in h446_source(n).you_do]:
            if len(clean(answer))>80 and clean(answer)[:75] in clean(" ".join(ptext)):
                raise ValueError("A You Do model answer appears in pupil version")
        count=sum(len(p.get_images(full=True)) for p in pdf)
        expected_count=sum(bool(q[2]) for q in questions)
        if count < len(figures) or count < expected_count:
            raise ValueError("Missing a source figure or independent-question diagram")
        if n not in SOLO_WE_DO and not any("Discuss" in p for p in ptext):
            raise ValueError("Discuss phase missing")
    return count

def render_preview(n,a4):
    """Full eight-page overview for human layout and SEND readability checks."""
    out=Image.new("RGB",(810,2100),"#eeeeec")
    draw=ImageDraw.Draw(out)
    draw.text((20,14),f"OCR H446 Lesson {n:03d} · all eight pupil pages",fill="#202a27")
    with fitz.open(a4) as doc:
        if len(doc)!=8:raise ValueError("Cannot preview non-eight-page candidate")
        for i,page in enumerate(doc):
            pm=page.get_pixmap(matrix=fitz.Matrix(.65,.65),alpha=False)
            im=Image.frombytes("RGB",(pm.width,pm.height),pm.samples)
            im.thumbnail((372,485))
            col=i%2;row=i//2
            x=20+col*398;y=47+row*506
            out.paste(im,(x,y))
            draw.text((x,y+im.height+6),f"Page {i+1}: {STAGES[i]}",fill="#222222")
    dest=OUT/f"H446_Lesson_{n:03d}_8PAGE_REDESIGN_eight_page_preview.png"
    out.save(dest)
    return dest.relative_to(ROOT).as_posix()

def run(numbers, report_stem="H446_EIGHT_PAGE_REDESIGN_PILOT"):
    if not re.fullmatch(r"H446_EIGHT_PAGE_[A-Z0-9_]+",report_stem):
        raise ValueError("Unsafe report name")
    original=json.loads(CAT.read_text(encoding="utf-8"))["lessons"]["h446"]
    rows=[]
    for n in numbers:
        row={"lesson":n,"status":"deferred","title":original.get(str(n),{}).get("title",f"Lesson {n:03d}")}
        created=[]
        try:
            lesson=h446_source(n)
            if lesson.is_assessment or original[str(n)].get("teacher_approved"):
                raise ValueError("Protected assessment or teacher-approved lesson")
            soup=source_html(n)
            all_questions=extract_prompts(soup,lesson)
            # The print resource complements, rather than duplicates, every
            # interactive exam task. For long multi-diagram sequences, keep
            # a foundation and stretch question with their original diagrams.
            # The remaining original questions stay accessible on the lesson.
            selected_indices=list(EXAM_SELECTION_OVERRIDES[n]) if n in EXAM_SELECTION_OVERRIDES else ([0,len(all_questions)-1] if len(all_questions)>3 else list(range(len(all_questions))))
            if max(selected_indices)>=len(all_questions):
                raise ValueError("Selected question index missing in live lesson")
            questions=[all_questions[i] for i in selected_indices]
            versions={}
            for mode in ("bw","colour"):
                a4=OUT/f"H446_Lesson_{n:03d}_8PAGE_REDESIGN_{mode.upper()}_A4.pdf"
                a3=OUT/f"H446_Lesson_{n:03d}_8PAGE_REDESIGN_{mode.upper()}_A3_Booklet.pdf"
                figures=build_student(n,mode,lesson,soup,questions,a4)
                created.append(a4)
                images=inspect_pdf(n,a4,questions,figures)
                sheets=impose_a3(a4,a3)
                created.append(a3)
                if sheets!=4:raise ValueError(f"Expected four A3 PDF spreads, got {sheets}")
                versions[mode]={"a4":a4.relative_to(ROOT).as_posix(),
                                "a3":a3.relative_to(ROOT).as_posix(),
                                "figures":figures,"embedded_image_count":images}
            teacher=OUT/f"H446_Lesson_{n:03d}_8PAGE_REDESIGN_SOURCE_MARK_SCHEME_STAFF_REVIEW.pdf"
            build_staff(n,lesson,teacher,selected_indices)
            created.append(teacher)
            preview=render_preview(n,OUT/f"H446_Lesson_{n:03d}_8PAGE_REDESIGN_BW_A4.pdf")
            created.append(ROOT/preview)
            row.update({"preview_png":preview,"status":"pilot_generated","a4_pages":8,"sheets_per_student":4,
                        "was_pages":original[str(n)]["a4_pages"],
                        "versions":versions,"teacher_key":teacher.relative_to(ROOT).as_posix(),
                        "selection_policy":"representative source-based exam questions; lessons 001-010 also include a targeted application check on page 3, with source diagrams preserved where selected",
                        "source_exam_questions":len(all_questions),
                        "printed_exam_questions":len(questions),
                        "printed_to_source_question_numbers":[i+1 for i in selected_indices],
                        "teacher_approved":False})
        except Exception as exc:
            for path in created:
                if path.exists():path.unlink()
            row["reason"]=f"{type(exc).__name__}: {str(exc)[:500]}"
        rows.append(row)
        print(f"{n:03d} {row['status']} {row.get('reason','')} ",flush=True)
    result={"purpose":"PILOT, not an automatic replacement of live Print links",
            "catalogue_unchanged":True,"lessons":rows,
            "counts":dict(Counter(x["status"] for x in rows)),
            "eight_pages_required":True,"teacher_approval_required":True}
    dest=OUT/f"{report_stem}.json"
    dest.write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    table=["# H446 Eight-Page Student Print — redesigned source-first pilots","",
           "**Aim:** exactly eight A4 pages (four double-sided sheets), not miniaturised 18-page PDFs.",
           "**Policy:** select useful essential source figures, show a foundation and challenge task where the online lesson contains four exam questions, and preserve the matching task diagrams. Remaining questions and progressive reveals stay available online.",
           "**Self-check:** for Lessons 001–010, We Do and page-three practice answers appear only on the final pupil page, after the tasks. Detailed You Do source-model files remain separate PUBLIC review drafts, not confidential staff resources.",
           "**Current student-facing Print links are unchanged.** Nothing is approved for pupil use.","",
           "| Lesson | Current | Pilot | Outcome |","|---|---:|---:|---|"]
    for row in rows:
        table.append(f"| {row['lesson']:03d} | {row.get('was_pages','—')} | {row.get('a4_pages','—')} | {row['status']}: {row.get('reason','')} |")
    table.append("")
    for row in rows:
        if row["status"]!="pilot_generated":continue
        n=row["lesson"]
        table+= [f"## Lesson {n:03d}", "",
            f"[Eight-page visual overview](H446_Lesson_{n:03d}_8PAGE_REDESIGN_eight_page_preview.png)", "",
            f"[A4 black-and-white booklet](H446_Lesson_{n:03d}_8PAGE_REDESIGN_BW_A4.pdf) · "+
            f"[A4 colour booklet](H446_Lesson_{n:03d}_8PAGE_REDESIGN_COLOUR_A4.pdf)",
            f"[A3 black-and-white imposition](H446_Lesson_{n:03d}_8PAGE_REDESIGN_BW_A3_Booklet.pdf) · "+
            f"[Separate teacher-model draft](H446_Lesson_{n:03d}_8PAGE_REDESIGN_SOURCE_MARK_SCHEME_STAFF_REVIEW.pdf)", ""]
    (OUT/f"{report_stem}.md").write_text("\n".join(table),encoding="utf-8")
    return result

if __name__=="__main__":
    import argparse
    a=argparse.ArgumentParser()
    a.add_argument("numbers",type=int,nargs="*",default=list(NUMBERS))
    a.add_argument("--report-stem",default="H446_EIGHT_PAGE_REDESIGN_PILOT")
    opts=a.parse_args()
    run(opts.numbers, report_stem=opts.report_stem)
