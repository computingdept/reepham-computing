#!/usr/bin/env python3
"""Four-page J277 independent-print booklet batch, lessons 011–015.

Source: live Autumn 1 J277 lesson JSON, plus topic visualisations aligned with
the published J277 Paper 1 V4 / Paper 2 V3 skill index. Only PDF assets are
generated; no changes to Teach lessons, Catch up lessons or revision guides.
The original Lesson 002 master retains the black/green pen header and five-stage
footer. No classroom behaviour or response badges appear in the PDF body.
"""
from pathlib import Path
import json
import re
import fitz
import build_j277_lesson001_gold_pdf as B
import build_j277_gold_batch_006_008 as G

ROOT = Path(__file__).resolve().parents[2]
MASTER = ROOT / "offline/booklets/j277/J277_Lesson_002_Gold_Standard_4_Page.pdf"
OUT = ROOT / "offline/booklets/j277"
IDX = ROOT / "revision/j277/guides/skill-index.json"
BLUE, PALE, EDGE, GREEN, WHITE = G.BLUE, G.BLUE_LIGHT, G.EDGE, G.GREEN, B.WHITE
t, sec, rules, tick, card = G.t, G.sec, G.rules, G.tick, G.card

# Supplement the exact, source-provided Exit Ticket with two small retrieval
# checks whose answers are directly supported by the same lesson's new learning.
EXIT_EXTRA = {
    11: [
        ("A larger cache may reduce time spent accessing RAM.", True,
         "True: useful data can be available closer to the CPU."),
        ("Twice the cores always doubles a single-threaded program's speed.", False,
         "False: a single thread may not use extra cores.")],
    12: [
        ("Abstraction means keeping every detail of a problem.", False,
         "False: keep only relevant information."),
        ("Input-Process-Output can help decompose a problem.", True,
         "True: IPO organises smaller input, process and output tasks.")],
    13: [
        ("A decision is usually shown with a diamond.", True,
         "True: the diamond contains a condition and branches."),
        ("Iteration means repeating a set of instructions.", True,
         "True: a loop repeats instructions.")],
    14: [
        ("Index 0 refers to the first item of an array.", True,
         "True: the source uses zero-based indices."),
        ("A linear search can inspect unsorted data.", True,
         "True: linear search checks items sequentially.")],
    15: [
        ("Insertion sort grows a sorted section.", True,
         "True: the next value is inserted into the correct place."),
        ("Bubble sort compares neighbouring items.", True,
         "True: adjacent values are compared and may be swapped.")],
}
GUIDE = {
    11: ("1", "11-performance"),
    12: ("2", "21-thinking"),
    13: ("2", "21-design"),
    14: ("2", "21-linear"),
    15: ("2", "21-bubble"),
}


def source(n):
    folder = "autumn1-009-013.json" if n <= 13 else "autumn1-014-018.json"
    obj = json.loads((ROOT / "lessons/j277" / folder).read_text(encoding="utf-8"))
    d = obj[f"{n:03d}"]
    assert len(d["r"]) == 4 and len(d["e"]) == 3 and len(d["w"]) >= 1
    assert len(d["k"]["p"]) == 3 and len(d["v"]) >= 4
    ix = json.loads(IDX.read_text(encoding="utf-8"))
    paper, skill = GUIDE[n]
    assert ix["skills"][skill]["paper"] == paper
    assert n in ix["skills"][skill]["lessons"]
    return d, paper, ix["skills"][skill]["page"]


def label_page(p, n, d, paper, guide_page):
    # Remove original lesson number, teaching content, and *old specification*
    # from master. Preserve pen routine and five-stage purpose footer.
    G.header(p, n)
    p.add_redact_annot(fitz.Rect(40, 13, 468, 33), fill=WHITE)
    p.apply_redactions(images=0, graphics=0, text=0)
    t(p, "RHS COMPUTING / OCR J277 / " + d["s"], 45, 26, 8.0, True)
    t(p, f"P{paper} GUIDE p.{guide_page}", 373, 43, 7.2)


def page_one(p, d, paper, guide_page):
    # Reuse the approved four-question retrieval, student-details and
    # accessible ruled-writing-space structure, not a newly invented layout.
    adapted = {
        "title": d["t"],
        "goal": " ".join(d["o"][:2]),
        "retrieval": d["r"],
        "vocab": d["v"][:4],
    }
    G.p1(p, adapted)
    if len(d["v"]) > 4:
        # The fifth ADA term is introduced explicitly in the concept page.
        assert d["v"][4][0] == "IPO"


def line_arrow(p, xa, ya, xb, yb):
    p.draw_line((xa, ya), (xb, yb), color=BLUE, width=1.25)
    if abs(xb-xa) >= abs(yb-ya):
        m = -1 if xb < xa else 1
        p.draw_line((xb, yb), (xb-5*m, yb-3), color=BLUE, width=1.25)
        p.draw_line((xb, yb), (xb-5*m, yb+3), color=BLUE, width=1.25)
    else:
        m = -1 if yb < ya else 1
        p.draw_line((xb, yb), (xb-3, yb-5*m), color=BLUE, width=1.25)
        p.draw_line((xb, yb), (xb+3, yb-5*m), color=BLUE, width=1.25)


def diagram(p, n):
    """Print-friendly source-aligned instructional visual, not decoration."""
    card(p, 45, 293, 501, 130, PALE)
    if n == 11:
        t(p, "Which processor is faster? Compare the workload.", 57, 313, 9.0, True)
        for i, (name, clock, cores, cache) in enumerate([
            ("CPU A", "2 GHz", "4 cores", "4 MB cache"),
            ("CPU B", "3 GHz", "2 cores", "8 MB cache")]):
            x = 63 + i*250
            B.box(p, x, 326, 226, 59, WHITE, EDGE)
            t(p, name, x+8, 342, 9.1, True)
            t(p, clock + "   |   " + cores, x+8, 360, 8.4)
            t(p, cache, x+8, 377, 8.3)
        t(p, "Clock, core count and cache favour different workloads.", 57, 407, 8.5)
    elif n == 12:
        labels = [
            ("ABSTRACTION", "Keep distance + speed"),
            ("DECOMPOSITION", "Input | check | calculate | output"),
            ("ALGORITHM", "Read -> validate -> divide -> print")]
        for i, (name, desc) in enumerate(labels):
            x = 57 + i*164
            B.box(p,x,309,153,59,WHITE,EDGE)
            t(p,name,x+6,326,8.2,True)
            t(p,desc,x+6,347,7.3,maxw=141)
            if i < 2: line_arrow(p,x+153,341,x+163,341)
        t(p, "IPO: 60 km, 30 km/h  ->  60 / 30  ->  2 hours", 57, 391,9.1,True)
        t(p, "IPO supports decomposition; it does not replace ordered steps.",57,409,8.0)
    elif n == 13:
        # Explicit shape-based flowchart: start, I/O, decision and branches.
        p.draw_oval(fitz.Rect(57,326,119,361),color=BLUE,fill=WHITE)
        t(p,"Start",75,347,8.5,True)
        line_arrow(p,119,344,139,344)
        B.box(p,140,326,97,35,WHITE,BLUE)
        t(p,"Input mark",153,347,8.5,True)
        line_arrow(p,237,344,256,344)
        p.draw_polyline([(296,314),(337,344),(296,375),(255,344),(296,314)],
                        color=BLUE,fill=WHITE,width=1.2)
        t(p,"mark >= 50?",271,346,7.8,True)
        line_arrow(p,337,338,371,338)
        B.box(p,373,316,102,30,WHITE,EDGE)
        t(p,"Print Pass",390,335,8.1,True)
        line_arrow(p,338,357,372,376)
        B.box(p,373,361,102,31,WHITE,EDGE)
        t(p,"Try again",390,381,8.1,True)
        t(p,"True",345,331,7.0)
        t(p,"False",345,372,7.0)
        t(p,"Sequence follows arrows; the diamond chooses a branch.",57,410,8.0)
    elif n == 14:
        t(p,"Linear search for target 8: unsorted data is fine",57,312,9.0,True)
        values = [3, 9, 1, 8, 5]
        for i,val in enumerate(values):
            x = 72 + i*92
            B.box(p,x,331,64,47,WHITE, GREEN if val==8 else EDGE,1.15)
            t(p,str(i),x+27,345,8.1,True)
            t(p,str(val),x+26,366,11.0,True)
        t(p,"Index",57,347,7.2)
        t(p,"Value",57,368,7.2)
        t(p,"3 -> 9 -> 1 -> 8:  found at index 3 (four checks).",57,408,8.6,True)
    elif n == 15:
        t(p,"Bubble: one pass",57,313,8.9,True)
        t(p,"[5,1,4,2] -> [1,5,4,2] -> [1,4,5,2] -> [1,4,2,5]",57,335,8.0)
        p.draw_line((57,351),(527,351),color=EDGE,width=.8)
        t(p,"Insertion: grow the sorted section",57,374,8.9,True)
        t(p,"[6,2,5] -> [2,6,5] -> [2,5,6]",57,397,8.5)
        t(p,"Show intermediate swaps or insertions, not just the result.",57,413,7.9)
    else:
        raise AssertionError(n)


def page_two(p, n, d, paper, guide_page):
    t(p, "Learn and practise",45,76,15.2,True)
    sec(p, "New learning - " + d["s"],103)
    for i, (name, desc) in enumerate(d["c"][:4]):
        y=133+i*38
        B.box(p, 45, y-13, 501, 35, WHITE, EDGE, .65)
        t(p,name,52,y,8.3,True)
        t(p,desc,180,y,7.8,maxw=351)
    diagram(p,n)
    sec(p,"I Do - Worked example",444)
    t(p,d["m"]["q"],45,464,8.25,True,maxw=490)
    for i,step in enumerate(d["m"]["st"][:5],1):
        y=510+(i-1)*27
        t(p,str(i)+".",48,y,8.0,True)
        t(p,step,67,y,7.85,maxw=475)
    sec(p,"We Do - Guided practice",648)
    t(p,d["w"][0][0],45,677,8.4,maxw=492)
    t(p,"Use the model. Write your answer in BLACK PEN:",45,707,8.0,True)
    rules(p,730,3,step=18)


def page_three(p, n, d):
    t(p,"Think and write",45,76,15.2,True)
    sec(p,"Code First - Predict > Write > Test > Improve",104)
    code = d["k"]["code"].splitlines()
    assert len(code) <= 9, (n,"Code First cannot fit")
    B.box(p,45,137,501,119,PALE,EDGE)
    t(p,"Read the code before you write or test anything.",55,151,7.7)
    for i,line in enumerate(code):
        # monospaced code from source. Keep ERL line breaks and indentation.
        t(p,line.replace("    ","  "),55,168+i*11.1,8.05)
    t(p,d["k"]["q"],45,271,8.15,maxw=493)
    for i,step in enumerate(d["k"]["p"],1):
        y=296+(i-1)*27
        t(p,str(i)+". "+step,45,y,8.25,maxw=490)
        rules(p,y+9,1,step=15)
    sec(p,"You Do - Independent exam questions",384)
    for i, (q,_) in enumerate(d["e"]):
        y=406+i*81
        t(p,f"Q{i+1}. "+q,45,y,8.45,maxw=487)
        rules(p,y+36,2,step=18)
    sec(p,"Exit Ticket - True or False?",668)
    t(p,"Answer each statement before turning to the answers.",45,689,8.0)
    checks=[(d["x"][0], bool(d["x"][1]))] + [
        (q,answer) for q,answer,_ in EXIT_EXTRA[n]]
    for i,(q,_) in enumerate(checks,1):
        y=711+(i-1)*22
        t(p,str(i)+". "+q,45,y,7.8,maxw=430)
        tick(p,496,y-7);t(p,"T",507,y,7.7,True)
        tick(p,526,y-7);t(p,"F",537,y,7.7,True)


def page_four(p,n,d):
    t(p,"Review & improve",45,76,15.2,True)
    t(p,"GREEN PEN: Tick what is correct, then use the model to fix mistakes.",45,99,8.3)
    t(p,"Do not just copy answers; explain what you changed.",45,112,8.2)
    sec(p,"Do Now - Answers",133)
    B.box(p,301,145,1,194,B.RULE)
    for i,(q,a) in enumerate(d["r"],1):
        y=158+(i-1)*42
        t(p,"Q"+str(i),49,y,7.7,True)
        t(p,a,71,y,7.4,maxw=218)
        tick(p,283,y-8)
    t(p,"Code First - Model",317,149,9.6,True)
    t(p,d["k"]["a"],317,173,7.7,maxw=221)
    sec(p,"We Do - Model answer",347)
    t(p,d["w"][0][1],45,373,8.0,maxw=491)
    sec(p,"Exit Ticket - Check",415)
    checks = [(d["x"][0],bool(d["x"][1]),d["x"][2] if len(d["x"])>2 else
               ("True." if d["x"][1] else "False: revise the new learning."))] + EXIT_EXTRA[n]
    for i,(_,v,why) in enumerate(checks,1):
        y=436+(i-1)*18
        t(p,f"{i}. {'TRUE' if v else 'FALSE'} - "+why,48,y,7.4,maxw=483)
    sec(p,"You Do - Self-mark your exam answers",501)
    for i,(_,a) in enumerate(d["e"],1):
        y=523+(i-1)*39
        t(p,f"Q{i}",50,y,7.8,True)
        t(p,a,80,y,7.7,maxw=456)
        tick(p,533,y-8)
    sec(p,"Try the question again",636)
    t(p,"1. Copy the FULL question you got wrong (or found hardest):",45,656,8.1,True)
    rules(p,675,2,step=20)
    t(p,"2. In GREEN PEN, write a NEW complete answer. Show working:",45,722,8.1,True)
    rules(p,740,2,step=22)


def validate(path,n,d):
    with fitz.open(path) as pdf:
        assert len(pdf)==4, (n,"not four pages")
        sections=[p.get_text() for p in pdf]
        assert all(round(p.rect.width)==595 and round(p.rect.height)==842 for p in pdf)
        for i,txt in enumerate(sections,1):
            for term in [f"LESSON {n:03d}","BLACK PEN","GREEN PEN","Review & Improve",d["s"]]:
                assert term in txt,(n,i,"missing",term)
            for block in pdf[i-1].get_text("dict")["blocks"]:
                if block["type"]!=0:continue
                box=fitz.Rect(block["bbox"])
                assert box.x0 >= 0 and box.x1<=595.8 and box.y0>=0 and box.y1<=842.8,(n,i,"overflow",box)
        norm = lambda value: re.sub(r"\s+", " ", value).strip()
        assert norm(d["t"]) in norm(sections[0]),(n,"title")
        for q,_ in d["r"]: assert norm(q) in norm(sections[0]),(n,"Do Now missing",q)
        for token in ["I Do","We Do","New learning"]:assert token in sections[1],(n,token)
        for q,_ in d["e"]: assert norm(q) in norm(sections[2]),(n,"exam missing",q)
        for token in ["Code First","You Do","Exit Ticket"]:assert token in sections[2],(n,token)
        for token in ["Self-mark","Try the question again"]:assert token in sections[3],(n,token)
        body_words={w[4].upper() for page in pdf for w in page.get_text("words") if 53 <= w[1]<780}
        assert not body_words.intersection({"SILENT","LISTEN","MWBS","THUMBS"}),(n,"behaviour box",body_words)
        assert len([v for v in pdf if "Review & Improve" in v.get_text()])==4
        assert path.stat().st_size>32000,(n,"unexpectedly small")
    print(f"PASS {n:03d}: four pages, sourced questions/answers, no behaviour boxes, footer intact; {path.stat().st_size} bytes")


def build(n):
    d,paper,guide_page=source(n)
    OUT.mkdir(parents=True, exist_ok=True)
    doc=fitz.open(MASTER)
    assert len(doc)==4
    for i,p in enumerate(doc):
        label_page(p,n,d,paper,guide_page)
        [lambda:page_one(p,d,paper,guide_page),
         lambda:page_two(p,n,d,paper,guide_page),
         lambda:page_three(p,n,d),
         lambda:page_four(p,n,d)][i]()
    path=OUT/f"J277_Lesson_{n:03d}_Gold_Standard_4_Page.pdf"
    doc.set_metadata({"title":f"OCR J277 Lesson {n:03d} - {d['t']}",
                      "subject":"Independent learning booklet - four A4 pages",
                      "creator":"RHS Computing - J277 central print standard"})
    doc.save(path, garbage=4, deflate=True)
    doc.close()
    validate(path,n,d)

if __name__=="__main__":
    for number in range(11,16):
        build(number)
