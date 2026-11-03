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
        result.append((prompt,answer,visuals[0] if visuals else None))
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
        paper.rules(2 if len(prompt)>125 else 1)

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

    paper.new("New Learning · applying the ideas")
    for k,item in enumerate(new[3:],4):
        paper.section(f"Core idea {k}")
        paper.line(item,10.4)
    if lesson.vocab:
        paper.section("Vocabulary · use the correct technical terms")
        for term,definition in lesson.vocab[:4]:
            paper.line(f"{term} — {definition}",10.0)
    paper.section("Check your understanding")
    paper.line("Explain one key process in your own words using two of the terms above.",10.4)
    paper.rules(4)
    paper.line("More animated examples are available in the original online lesson.",9.0)

    paper.new("I Do · worked example")
    paper.section("Problem")
    paper.line(lesson.model_question,10.5)
    paper.section("Follow the worked method")
    for k,step in enumerate(pick(lesson.model_steps,3),1):
        paper.line(f"{k}. {step}",10.1)
    model_fig=source_svg(soup,"#i-do svg")
    if model_fig:paper.figure(model_fig[-1],"Source model · final illustrated step",maxw=385,maxh=153)
    paper.section("Why this method works")
    paper.line("Identify the decision, rule or invariant that makes the method correct.",10.3)
    paper.rules(3)

    paper.new("We Do · Try → Discuss → Improve")
    paper.line("TRY independently in BLACK PEN; compare methods with a partner; improve your reasoning.",10.0)
    task=model_and_guided(lesson,soup,n)
    paper.section("Guided problem · TRY")
    paper.line(task,10.7)
    # Only an input state is permitted, never a worked/reveal SVG.
    if n==29:
        v=source_svg(soup,"#we-do .wedo-example svg")
        if not v:raise ValueError("K-map guided question needs a diagram")
        paper.figure(v[0],"Guided K-map · mark the pair",maxw=380,maxh=142)
    paper.rules(5)
    paper.section("DISCUSS")
    paper.line("Compare how you reached the answer. Where could someone make an error?",10.1)
    paper.rules(2)
    paper.section("IMPROVE")
    paper.line("Add one precise correction or a stronger reason. Answers are not printed here.",10.0)
    paper.rules(2)

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
            # Each page uses no smaller than 10-point text; preserve room.
            # A K-map carries its own workspace for circling cells; three
            # ruled lines below preserve space for a Boolean expression and
            # annotated gate plan. Never shrink the diagram or text.
            paper.rules(3 if svg else (7 if page_no==7 and len(items)==1 else 4))
        if paper.y>155:
            paper.line("Check that you have used the technical terms and explained your decisions.",9.4)

    paper.new("Exit Ticket · reflect and retrieve")
    paper.section("Exit Ticket")
    paper.line(lesson.exit_question,10.9)
    paper.rules(3)
    paper.section("Use key vocabulary from memory")
    for i,(term,_) in enumerate(lesson.vocab[:3],1):
        paper.line(f"{i}. Explain {term} in your own words.",10.1)
        paper.rules(2)
    paper.section("Confidence and next step")
    paper.line("How confident are you?   Thumbs up / side / down",10.3)
    paper.line("Which question would you improve after checking the classroom model?",10.3)
    paper.rules(3)
    paper.line("Check answers after the lesson using the teacher-guided source models.",9.4)
    paper.close()
    return paper.figures

def build_staff(n,lesson,out):
    """A separate unlinked source-answer PDF for the teacher, not the pupil PDF."""
    doc=SimpleDocTemplate(str(out),pagesize=A4,leftMargin=45,rightMargin=45,
        topMargin=48,bottomMargin=49,title=f"OCR H446 {n:03d} unapproved source-model key")
    heading=ParagraphStyle("Head",fontName="EightBold",fontSize=15.2,leading=21,spaceAfter=11)
    sub=ParagraphStyle("Sub",fontName="EightBold",fontSize=11.1,leading=17,spaceBefore=12,spaceAfter=6)
    body=ParagraphStyle("Body",fontName="Eight",fontSize=9.8,leading=15,spaceAfter=8)
    flow=[Paragraph(f"STAFF REVIEW · H446 {n:03d} source models",heading),
          Paragraph("Separate from the eight-page pupil workbook. This copy is in a public repository and is NOT access controlled. Check technical correctness before use.",body)]
    def add(name,answers):
        flow.append(Paragraph(name,sub))
        for i,answer in enumerate(answers,1):
            v=html.escape(str(answer or "[No safely extracted source model: staff must check]"))
            v=v.replace("\n","<br/>")
            flow.append(Paragraph(f"{i}. {v}",body))
    add("Do Now — source answers",[v for _,v in lesson.do_now])
    add("I Do — source worked steps",lesson.model_steps)
    add("We Do — guided CHECK",[v for _,v in lesson.guided])
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
        if not any("Discuss" in p for p in ptext):
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
            questions=[all_questions[0],all_questions[-1]] if len(all_questions)>3 else all_questions
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
            build_staff(n,lesson,teacher)
            created.append(teacher)
            preview=render_preview(n,OUT/f"H446_Lesson_{n:03d}_8PAGE_REDESIGN_BW_A4.pdf")
            created.append(ROOT/preview)
            row.update({"preview_png":preview,"status":"pilot_generated","a4_pages":8,"sheets_per_student":4,
                        "was_pages":original[str(n)]["a4_pages"],
                        "versions":versions,"teacher_key":teacher.relative_to(ROOT).as_posix(),
                        "selection_policy":"representative source-based diagrams and all diagrams belonging to the selected independent questions; remaining online exam tasks accessible in the lesson",
                        "source_exam_questions":len(all_questions),
                        "printed_exam_questions":len(questions),
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
           "**Safety:** no models or marking guidance printed within pupil booklet; teacher source model key remains a separate unlinked public-repository draft.",
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
