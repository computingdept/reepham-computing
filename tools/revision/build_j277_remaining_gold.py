#!/usr/bin/env python3
"""J277 full-course *provisional* printable production, lessons 021-164.

Actual classroom source: autumn2-NNN.json, overridden Do Now central bank
and Code First central bank, as performed by autumn2-rebuilt.js.  This is a
deterministic four-page adaptation of the Lesson 002 approved PDF shell.
No rewriting online lessons, revision guides, or existing 001-020 booklets.

A visible per-lesson manifest distinguishes validated editions from lessons
needing attention. Do NOT offer a Print link for a failed preflight edition.
"""
import argparse, json, math, re, sys
from collections import Counter
from pathlib import Path
import fitz
import build_j277_gold_batch_016_020 as P

ROOT=P.ROOT
MASTER=P.MASTER
OUT=ROOT/"offline/booklets/j277"
STATUS=ROOT/"offline/booklets/j277/full-course-audit.json"
B=P.B
G=P.G
INK=B.INK
WHITE=B.WHITE
PALE=B.PALE
EDGE=B.EDGE
RULE=B.RULE
EXCEPTION_TAGS={"assessment","content-overflow","source-mismatch","non-printable-code"}

def normal(s):
    return P.plain(str(s)).replace("•","-").replace("’","'").replace("−","-")
def lines_for(s,width,sz=7.8,bold=False):
    font="hebo" if bold else "helv"
    lines=[]
    for para in normal(s).splitlines():
        if not para.strip():
            lines.append("");continue
        buf=""
        for word in para.split():
            test=(buf+" "+word).strip()
            if buf and fitz.get_text_length(test,fontname=font,fontsize=sz)>width:
                lines.append(buf);buf=word
            else:buf=test
        lines.append(buf)
    return lines

def textblock(p,value,x,y,width,height,size=8.2,minimum=7.1,bold=False,record=None,tag="",measure=False):
    """Fit *complete* source content, otherwise flag and show legible abbreviated preview.
    Never silently declare content-complete when a span could not be printed."""
    size0=size
    while size>=minimum-.001:
        arr=lines_for(value,width,size,bold)
        lead=size*1.31
        if len(arr)*lead<=height+.5:
            if measure:return size,len(arr)
            for j,line in enumerate(arr):
                if line:p.insert_text((x,y+j*lead),line,fontname="hebo" if bold else "helv",fontsize=size,color=INK)
            return y+len(arr)*lead
        size-=.2
    if record is not None:
        record.append({"type":"content-overflow","stage":tag,"chars":len(str(value)),
                       "height":round(height,1),"required_lines":len(lines_for(value,width,minimum,bold))})
    arr=lines_for(value,width,minimum,bold)
    lead=minimum*1.31
    maxlines=max(1,int(height//lead))
    for j,line in enumerate(arr[:maxlines]):
        if line:p.insert_text((x,y+j*lead),line,fontname="hebo" if bold else "helv",fontsize=minimum,color=INK)
    # The *exception manifest* holds the full source, and this edition is not released.
    return y+min(len(arr),maxlines)*lead

def sec(p,label,y):
    P.sec(p,label,y)

def rule(p,y,count=1,step=14):
    for k in range(count):B.line(p,45,y+k*step,546)

def source(n):
    path=ROOT/f"lessons/j277/autumn2-{n:03d}.json"
    raw=json.loads(path.read_text(encoding="utf-8"))
    lesson=raw[f"{n:03d}"]
    bank=json.loads((ROOT/"lessons/j277/donow-bank-20261020.json").read_text(encoding="utf-8"))
    entry=bank["lessons"][f"{n:03d}"]
    assert len(entry["questions"])==4
    lesson["printDoNow"]=entry["questions"]
    lesson["r"]=[(q["question"],q["answer"]) for q in entry["questions"]]
    lesson["c"]=lesson["c"]+entry.get("teachingAdditions",[])
    code=json.loads((ROOT/"lessons/j277/code-first-master-20261021.json").read_text(encoding="utf-8")).get("lessons",{}).get(f"{n:03d}")
    if code:
        lesson["printCode"]={"q":code["task"],"code":code["starter"],
                             "model":code["model"],"expected":code["expected"]}
    else:
        lesson["printCode"]={"q":lesson["k"]["q"],"code":lesson["k"]["code"],
                             "model":lesson["k"]["a"],"expected":""}
    assert lesson["e"] and lesson["m"] and lesson["w"] and lesson["x"] and lesson["v"]
    return lesson

def header(p,n,d):
    P.header(p,n,d,None)
    # Print the actual spec in the approved header; no overlay next to GREEN PEN.

def first(p,n,d,issues):
    textblock(p,d["t"],45,76,501,31,15.1,13.0,True,issues,"title")
    for label,x,w in [("Name",45,125),("Class",194,72),("Date",300,69),("Time",403,64),("Teacher",490,76)]:
        P.t(p,label,x,99,8,True);B.line(p,x+len(label)*5+6,99,x+w)
    sec(p,"Do Now - Four retrieval questions",124)
    P.t(p,"BLACK PEN: answer four questions before checking the answers.",45,144,8.0)
    slots=[(160,205),(215,294),(308,348),(362,414)]
    for i,q in enumerate(d["printDoNow"]):
        top,bottom=slots[i]
        area=bottom-top
        body=normal(q["question"])
        ans=7 if i==3 else (11 if i==1 else 14)
        if i==1:
            textblock(p,str(i+1)+". "+body,45,top,490,27,8.2,7.5,False,issues,"do-now-q2")
            options=q.get("options",[])
            if len(options)!=4:
                issues.append({"type":"source-mismatch","stage":"do-now-MCQ","detail":"Q2 lacks four choices"})
            for j,opt in enumerate(options[:4]):
                x=49+(j%2)*252
                y=top+29+(j//2)*13.6
                textblock(p,"ABCD"[j]+") "+opt,x,y,238,13,7.65,7.0,False,issues,"MCQ choice")
            rule(p,top+64,1)
        else:
            textblock(p,str(i+1)+". "+body,45,top,495,area-ans,8.15,7.1,False,issues,"do-now-q"+str(i+1))
            rule(p,bottom-ans,1 if i==3 else 2,step=12)
    sec(p,"Today's objectives",426)
    G.card(p,45,445,501,51,PALE)
    textblock(p," ".join(d.get("o",[])[:2]),54,458,482,31,8.1,7.2,False,issues,"objectives")
    sec(p,"Key vocabulary - Read, cover, recall",513)
    for i,pair in enumerate(d["v"][:4]):
        x=45+(i%2)*255;y=535+(i//2)*53
        G.card(p,x,y,244,48,WHITE)
        term,definition=pair
        textblock(p,term,x+7,y+12,230,12,8.0,7.1,True,issues,"vocab-term")
        textblock(p,definition,x+7,y+28,230,23,7.5,6.9,False,issues,"vocab-meaning")
    P.t(p,"Write one key term and its meaning in your own words:",45,659,8.3,True)
    rule(p,682,4,step=20)

# Compact only the eight *extra* teaching-bank additions (not the four core
# New Learning steps). Each summary was checked against its actual source note.
SUPPLEMENTARY_BRIEFS={
 26:"Ethernet is wired. Wi-Fi is wireless and mobile, but may suffer interference. Bluetooth suits short-range links. Compare speed and range.",
 29:"Protocol layers separate jobs through agreed interfaces, making changes and troubleshooting easier. OCR J277 does not require all TCP/IP layer names.",
 34:"Physical security uses locked rooms and controlled entry to reduce theft or tampering. Combine this with digital protection such as passwords.",
 48:"Structure diagrams show decomposition and subproblem hierarchy, such as Quiz > Play > Input/Scoring. Flowcharts show the order of decisions.",
 52:"A constant stays fixed (MAX_CLASS_SIZE=30); a variable may change. Integer=whole number; real=fraction; character=one; string=several.",
 54:"Boolean values are true or false, not text strings. Comparisons such as score>=50 also yield Boolean results and combine with AND/OR/NOT.",
 70:"Local variables/constants belong to local scope; global ones have wider scope. Too much mutable global state makes bugs harder to trace.",
 71:"A function can receive an array argument, process it and return a result. Input and return are separate; the caller must use the result."
}

def second(p,n,d,issues):
    P.t(p,"Learn and practise",45,76,15.2,True)
    sec(p,"New learning - Key ideas",100)
    concepts=d["c"][:5]
    rowstep=27 if len(concepts)==5 else 33
    # Long fifth explanations come from the classroom's central teaching bank.
    # Expand that ONE concept cell; do not abbreviate or reduce the font.
    extended_fifth=(len(concepts)==5 and len(str(concepts[4][1]))>190)
    for i,(title,description) in enumerate(concepts):
        y=119+i*rowstep
        height=47 if extended_fifth and i==4 else rowstep-2
        G.card(p,45,y-12,501,height,WHITE)
        textblock(p,title,52,y,140,31 if extended_fifth and i==4 else rowstep-5,
                  8.0,7.05,True,issues,"concept title "+str(i+1))
        # Keep the original classroom explanation: never substitute a manually shortened summary.
        textblock(p,description,198,y,335,45 if extended_fifth and i==4 else rowstep-2,
                  7.65,6.85,False,issues,"concept "+str(i+1))
    if len(d["c"])>5:issues.append({"type":"content-overflow","stage":"more than five New Learning steps","count":len(d["c"])-5})
    sec(p,"I Do - One worked example",273 if extended_fifth else 260)
    question=d["m"].get("q") or d["m"].get("title") or d["t"]
    textblock(p,question,45,295 if extended_fifth else 282,498,37,8.15,7.05,True,issues,"i-do-question")
    steps=d["m"].get("st",[])
    if len(steps)>5:issues.append({"type":"content-overflow","stage":"more than 5 I Do steps","count":len(steps)})
    steps=steps[:5]
    if steps:
        y=345 if extended_fifth else 334
        budget=(448-y)/len(steps)
        for i,step in enumerate(steps):
            textblock(p,str(i+1)+". "+step,49,y+i*budget,493,budget-4,
                      8.0,6.85,False,issues,"i-do-step-"+str(i+1))
    sec(p,"We Do - Guided questions",470)
    P.t(p,"BLACK PEN: use the model, then explain your answer.",45,489,8.0)
    activities=d["w"]
    if len(activities)>3:
        issues.append({"type":"content-overflow","stage":"We Do count over 3","count":len(activities)})
    usable=min(len(activities),3)
    if usable:
        y0=505
        available=255
        space=available/usable
        for i,item in enumerate(activities[:3]):
            q=next((v for v in item if isinstance(v,str) and len(v)>40),str(item[0]))
            # Most Y10 use (short title, full question, answer); Y11 use (full question, answer).
            if len(item)>=3:q=item[1]
            elif len(item)>=2:q=item[0]
            y=y0+i*space
            textblock(p,str(i+1)+". "+q,45,y,495,space-32,8.05,7.0,False,issues,"we-do-"+str(i+1))
            rule(p,y+space-27,2 if space>=78 else 1,step=14)


# The eleven Year 11 exception lessons have REQUIRED question-data visuals.
# Draw these from each original requiredVisuals specification, never a generic
# decorative diagram. Data-only, NO worked answers. The source SVG is embedded
# as vector PDF artwork, so it remains sharp when printed at A4.
from html import escape as xml_escape

def required_visual(d):
    return next((v for v in (d.get("requiredVisuals") or [])
                 if isinstance(v,dict) and v.get("required")),None)

def source_svg(n,d):
    visual=required_visual(d)
    if not visual:return None
    kind=str(visual.get("y11") or visual.get("year11") or "").lower()
    vals=[str(x) for x in visual.get("values",[]) if x is not None]
    if kind in ("table","sql","filter"):
        # The interactive worked and guided questions share the same dataset.
        # In particular, do not substitute the 130 Code First example's Eli/Jo/Sam.
        vals=["ID","Name","Mark","101","Ada","72","102","Ben","43","103","Mia","81"]
    allowed={"binary","addition","hex","linear","binarysearch","bubble",
             "insertion","merge","table","sql","filter"}
    if kind not in allowed:raise ValueError(f"required vector type unsupported: {n}: {kind}")
    blue="#285d79";ink="#152e3b";soft="#edf4f7";edge="#90a9b8"
    parts=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 88" width="560" height="88">']
    parts.append(f'<rect x="0.7" y="0.7" width="558.6" height="86.6" rx="4" fill="white" stroke="{edge}" stroke-width="1.4"/>')
    def txt(x,y,value,size=13,weight=400,anchor="start"):
        parts.append(f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-family="Arial,sans-serif" font-size="{size}" font-weight="{weight}" fill="{ink}">{xml_escape(str(value))}</text>')
    def box(x,y,w,h,label,size=13):
        parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{soft}" stroke="{blue}" stroke-width="1.2"/>')
        txt(x+w/2,y+h*.65,label,size,700,"middle")
    if kind=="binary":
        txt(12,17,"UNSIGNED BINARY - write the contribution of each 1",10,700)
        digits="".join(vals)[:8]
        assert re.fullmatch(r"[01]{8}",digits),(n,vals)
        for i,(digit,power) in enumerate(zip(digits,[128,64,32,16,8,4,2,1])):
            x=12+i*57;box(x,25,56,26,digit,15);txt(x+28,67,str(power),11,400,"middle")
        txt(481,40,"bits",11);txt(481,58,"place values",9)
    elif kind=="addition":
        assert len(vals)>=2 and all(re.fullmatch("[01]{8}",v) for v in vals[:2]),(n,vals)
        txt(12,18,"BINARY ADDITION - align bits, include carries",11,700)
        txt(15,36,"carry:",10)
        txt(15,56,"+",13,700)
        for row,bits in enumerate(vals[:2]):
            for i,digit in enumerate(bits):
                x=87+i*49;box(x,23+row*28,47,25,digit,14)
        txt(492,42,"result:",11);parts.append(f'<path d="M85 79 H475" stroke="{blue}" stroke-width="1.5"/>')
    elif kind=="hex":
        digits=vals[0] if vals else ""
        assert re.fullmatch("[01]{8}",digits),(n,vals)
        txt(12,18,"HEXADECIMAL - split binary into two 4-bit nibbles",11,700)
        box(28,31,186,36,digits[:4],21);box(224,31,186,36,digits[4:],21)
        txt(421,42,"Hex:",12,700);txt(421,62,"__  __",12)
    elif kind in ("linear","binarysearch","bubble","insertion","merge"):
        title={"linear":"LINEAR SEARCH","binarysearch":"BINARY SEARCH",
               "bubble":"BUBBLE SORT","insertion":"INSERTION SORT",
               "merge":"MERGE SORT"}[kind]
        txt(12,17,title+" - use the data shown; do not assume the result",10,700)
        width=min(60,430/max(len(vals),1)); width=max(34,width)
        x0=12
        for i,value in enumerate(vals):
            x=x0+i*(width+3)
            box(x,29,width,31,value,12);txt(x+width/2,74,str(i),10,400,"middle")
        txt(449,41,"Target: "+(str(visual.get("target")) or "-") if kind in ("linear","binarysearch") else "Trace:",11,700)
        txt(449,59,"________",11)
        if kind=="binarysearch":txt(449,74,"must be sorted",9)
    else:
        # Question dataset, not the worked solution or a decorative blank table.
        txt(12,16,"PUPILS TABLE - use the same rows for the question",11,700)
        for row in range(4):
            for col in range(3):
                x=16+col*141;y=23+row*15
                parts.append(f'<rect x="{x}" y="{y}" width="140" height="15" fill="{soft if row==0 else "white"}" stroke="{edge}" stroke-width=".8"/>')
                txt(x+7,y+11,vals[row*3+col],10,700 if row==0 else 400)
        txt(450,45,"Use indexes",10);txt(450,62,"or SQL rules",10)
    parts.append("</svg>")
    return "".join(parts)

def draw_svg_question_data(p,n,d,issues):
    markup=source_svg(n,d)
    if markup is None:return False
    svgdoc=fitz.open(stream=markup.encode("utf-8"),filetype="svg")
    rendered=fitz.open(stream=svgdoc.convert_to_pdf(),filetype="pdf")
    p.show_pdf_page(fitz.Rect(45,301,546,382),rendered,0,keep_proportion=False)
    rendered.close();svgdoc.close()
    d["_required_svg_rendered"]=True
    return True

def third_required(p,n,d,issues):
    """Lesson-002 four-page booklet; fitted question-only SVG ahead of Q2-Q4."""
    P.t(p,"Think and write",45,76,15.2,True)
    sec(p,"Code First - Predict > Write > Test > Improve",101)
    G.card(p,45,128,501,126,WHITE)
    k=d["printCode"]
    textblock(p,"YOUR TASK: "+k["q"],54,145,481,28,8.0,6.9,True,issues,"code-task")
    textblock(p,k["code"],55,177,480,70,7.15,6.7,False,issues,"code-first")
    P.t(p,"BLACK PEN: Predict or write code; test, then improve.",45,269,7.8)
    sec(p,"Question data - complete the working",291)
    assert draw_svg_question_data(p,n,d,issues)
    sec(p,"You Do - Independent exam questions",398)
    # Keep the source-required diagram. Adapt the exam boxes to reserve
    # four actual writing lines for an extended (6-mark) answer.
    extended=any(re.search(r"\[6\s+marks?\]",v[0],re.I) for v in d["e"])
    slots=[(419,476),(485,551),(560,662)] if extended else [
        (419,482),(493,570),(580,656)]
    if len(d["e"])!=3:raise ValueError("required-visual lesson has unexpected exam count")
    for i,item in enumerate(d["e"]):
        q=item[0].split("\n\nSource:")[0].strip()
        top,bottom=slots[i]
        match=re.search(r"\[(\d+)\s+marks?\]",q,re.I)
        six=bool(match and int(match.group(1))>=6)
        count=4 if six else 2
        start=bottom-(count*14+9)
        height=start-top-6
        if height<19:issues.append({"type":"content-overflow","stage":"exam-writing-space",
                                    "question":i+2})
        textblock(p,"Q"+str(i+2)+". "+q,45,top,493,max(15,height),
                  7.9,6.95,False,issues,"exam-question-"+str(i+2))
        rule(p,start,count,step=14)
    sec(p,"Exit Ticket - True or False?",675)
    P.t(p,"Circle T or F before reviewing Page 4.",45,694,7.8)
    exits=[(d["x"][0],bool(d["x"][1]))]
    for pair in d["c"][:2]:
        fact=normal(pair[1]).split(". ")[0].strip()
        if len(fact)>105:fact=fact[:104]+"..."
        exits.append((fact,True))
    d["printExits"]=exits
    for i,(fact,truth) in enumerate(exits):
        y=712+i*21
        textblock(p,str(i+1)+". "+fact,45,y,441,12,7.5,6.8,False,issues,"exit-"+str(i+1))
        P.tick(p,495,y-7);P.t(p,"T",506,y,7.7,True)
        P.tick(p,525,y-7);P.t(p,"F",536,y,7.7,True)

def third(p,n,d,issues):
    if required_visual(d):
        return third_required(p,n,d,issues)
    P.t(p,"Think and write",45,76,15.2,True)
    sec(p,"Code First - Predict > Write > Test > Improve",101)
    G.card(p,45,129,501,166,WHITE)
    k=d["printCode"]
    textblock(p,"YOUR TASK: "+k["q"],54,147,483,31,8.15,7.05,True,issues,"code-task")
    textblock(p,k["code"],55,182,479,104,7.7,6.85,False,issues,"code-first")
    P.t(p,"BLACK PEN: predict or complete the code; test, then improve.",45,298,8.0)
    rule(p,320,2,step=16)
    P.t(p,"For extended answers, continue on lined paper if needed.",45,352,7.6)
    sec(p,"You Do - Independent exam questions",364)
    # Preserve the actual three lesson exam questions.  Reserve at least four
    # ruled lines for a six-marker rather than treating two lines as a pass.
    # Reflow the first two shorter tasks to free an expanded Q4 slot.
    slots=[(385,448),(459,537),(548,663)] if any(
        re.search(r"\[6\s+marks?\]",item[0],re.I) for item in d["e"][:3]
    ) else [(385,461),(474,568),(582,656)]
    for i,item in enumerate(d["e"][:3]):
        q=item[0].split("\n\nSource:")[0].strip()
        top,bottom=slots[i]
        marks=re.search(r"\[(\d+)\s+marks?\]",q,re.I)
        six=bool(marks and int(marks.group(1))>=6)
        line_count=4 if six else 2
        line_gap=14
        # The question must end before the first writing line.
        rule_start=bottom-(line_count*line_gap+9)
        height=rule_start-top-6
        if height<19:
            issues.append({"type":"content-overflow","stage":"exam-space-"+str(i+2),
                           "detail":"insufficient space for source question and handwriting"})
        textblock(p,"Q"+str(i+2)+". "+q,45,top,493,max(15,height),
                  8.0,6.95,False,issues,"exam-question-"+str(i+2))
        rule(p,rule_start,line_count,step=line_gap)
        if six and line_count < 4:
            issues.append({"type":"content-overflow","stage":"6-mark answer space",
                           "question":i+2})
    if len(d["e"])!=3:
        issues.append({"type":"source-mismatch","stage":"you-do-count","count":len(d["e"])})
    sec(p,"Exit Ticket - True or False?",675)
    P.t(p,"Circle T or F before reviewing Page 4.",45,694,7.8)
    exits=[(d["x"][0],bool(d["x"][1]))]
    # Additional statements are verbatim conceptual facts from the interactive New Learning.
    for pair in d["c"][:2]:
        text=normal(pair[1]).split(". ")[0].strip()
        if len(text)>105:text=text[:104]+"..."
        exits.append((text,True))
    d["printExits"]=exits
    for i,(statement,truth) in enumerate(exits):
        y=712+i*21
        textblock(p,str(i+1)+". "+statement,45,y,441,12,7.5,6.8,False,issues,"exit-"+str(i+1))
        P.tick(p,495,y-7);P.t(p,"T",506,y,7.7,True)
        P.tick(p,525,y-7);P.t(p,"F",536,y,7.7,True)

def fourth(p,n,d,issues):
    P.t(p,"Review & improve",45,76,15.2,True)
    P.t(p,"GREEN PEN: tick correct marking points, then correct errors.",45,98,8.1)
    P.t(p,"Choose your hardest question to rewrite in full below.",45,113,8.0)
    sec(p,"Do Now - Answers",132)
    B.box(p,298,144,1,184,B.RULE)
    for i,q in enumerate(d["printDoNow"]):
        y=153+i*42
        P.t(p,"Q"+str(i+1),48,y,7.9,True)
        textblock(p,q["answer"],71,y,213,36,7.5,6.8,False,issues,"retrieval-answer-"+str(i+1))
        P.tick(p,282,y-8)
    P.t(p,"Code First - Model",309,143,9.4,True)
    k=d["printCode"]
    textblock(p,k["model"],310,166,227,128,7.45,6.7,False,issues,"code-answer")
    if k["expected"]:textblock(p,"Output: "+k["expected"],310,297,221,37,7.5,6.65,True,issues,"code-output")
    sec(p,"We Do - Check the model",342)
    answers=[]
    for item in d["w"][:3]:
        if len(item)>=3:answers.append(item[2])
        else:answers.append(item[1])
    d["printWeAnswers"]=answers
    if answers:
        h=97/len(answers)
        for i,a in enumerate(answers):
            textblock(p,str(i+1)+". "+a,48,362+i*h,488,h-3,7.5,6.7,False,issues,"we-do-answer-"+str(i+1))
            P.tick(p,534,360+i*h)
    sec(p,"Exit Ticket - Check",466)
    truth=["TRUE" if z[1] else "FALSE" for z in d["printExits"]]
    P.t(p,"  ".join(str(i+1)+". "+v for i,v in enumerate(truth)),48,485,8.0,True)
    sec(p,"You Do - Self-mark",498)
    for i,item in enumerate(d["e"][:3]):
        y=518+i*44
        P.t(p,"Q"+str(i+2),48,y,8.0,True)
        textblock(p,item[1],78,y,456,41,7.6,6.7,False,issues,"exam-answer-"+str(i+2))
        P.tick(p,535,y-8)
    sec(p,"Try the question again",657)
    P.t(p,"1. Copy the FULL question you found most difficult:",45,674,7.9,True)
    rule(p,688,2,step=14)
    P.t(p,"2. In GREEN PEN, write a complete new answer:",45,720,7.9,True)
    rule(p,737,4,step=14)

def validate(file,n,d,issues):
    with fitz.open(file) as pdf:
        assert len(pdf)==4
        for page in pdf:
            assert round(page.rect.width)==595 and round(page.rect.height)==842
            body=page.get_text()
            for label in [f"LESSON {n:03d}","BLACK PEN","GREEN PEN","Review & Improve"]:
                assert label in body,(n,"missing master field",label)
            for block in page.get_text("dict")["blocks"]:
                if block["type"]!=0:continue
                rect=fitz.Rect(block["bbox"])
                if rect.x0<0 or rect.x1>595 or rect.y0<0 or rect.y1>842:
                    issues.append({"type":"content-overflow","stage":"page boundary","rect":str(rect)})
        texts=[page.get_text() for page in pdf]
        for phrase in [d["t"],d["printDoNow"][0]["question"],d["printDoNow"][2]["question"]]:
            if re.sub(r"\s+"," ",normal(phrase)).strip() not in re.sub(r"\s+"," ",normal(texts[0])):
                issues.append({"type":"source-mismatch","stage":"page 1 source","phrase":phrase[:100]})
        for phrase in [d["printCode"]["q"],*d["printCode"]["code"].splitlines()]:
            if phrase.strip() and re.sub(r"\s+"," ",normal(phrase)).strip() not in re.sub(r"\s+"," ",normal(texts[2])):
                issues.append({"type":"source-mismatch","stage":"Code First","phrase":phrase[:90]})
        for i,q in enumerate(d["printDoNow"][1]["options"]):
            if q not in texts[0]:
                issues.append({"type":"source-mismatch","stage":"MCQ","option":i})
        for i,item in enumerate(d["e"][:3]):
            if re.sub(r"\s+"," ",normal(item[0].split("\n\nSource:")[0])).strip() not in re.sub(r"\s+"," ",normal(texts[2])).strip():
                issues.append({"type":"source-mismatch","stage":"exam","question":i+2})
        # Contract with the real interactive lesson, including the final
        # Do Now/Code First banks used by the classroom renderer. A PDF must
        # contain ALL activities and their model answers, not merely Q1.
        def present(value, text):
            return re.sub(r"\s+", " ", normal(value)).strip() in re.sub(
                r"\s+", " ", normal(text))
        for i,item in enumerate(d["printDoNow"],1):
            if not present(item["question"],texts[0]):
                issues.append({"type":"source-mismatch","stage":"do-now-question",
                               "question":i})
            if not present(item["answer"],texts[3]):
                issues.append({"type":"source-mismatch","stage":"do-now-answer",
                               "question":i})
        for i,item in enumerate(d["w"][:3],1):
            question=item[1] if len(item)>=3 else item[0]
            answer=item[2] if len(item)>=3 else item[1]
            if not present(question,texts[1]):
                issues.append({"type":"source-mismatch","stage":"we-do-question",
                               "question":i})
            if not present(answer,texts[3]):
                issues.append({"type":"source-mismatch","stage":"we-do-answer",
                               "question":i})
        for i,item in enumerate(d["e"][:3],2):
            question=item[0].split("\n\nSource:")[0].strip()
            if not present(question,texts[2]):
                issues.append({"type":"source-mismatch","stage":"you-do-question",
                               "question":i})
            if not present(item[1],texts[3]):
                issues.append({"type":"source-mismatch","stage":"you-do-model",
                               "question":i})
        if not present(d["x"][0],texts[2]):
            issues.append({"type":"source-mismatch","stage":"exit-source"})
        if "Copy the FULL question" not in texts[3] or "GREEN PEN" not in texts[3]:
            issues.append({"type":"source-mismatch","stage":"green-pen-retry"})
        if d.get("isAssessment"):
            paper=f"lessons/j277/lesson-{n:03d}/assessment.html"
            if not (ROOT/paper).exists():
                issues.append({"type":"source-mismatch","stage":"assessment paper missing",
                               "href":paper})
            else:
                # The 4-page booklet is an optional revision companion, NOT
                # a substitute for an independently printable exam paper.
                if n in (120,143):
                    assessment=ROOT/f"lessons/j277/assessment-{n}.json"
                    scheme=ROOT/f"lessons/j277/assessment-{n}-scheme.json"
                    assert assessment.is_file() and scheme.is_file(),(n,"assessment dataset missing")
                    raw=json.loads(assessment.read_text(encoding="utf8"))
                    marks=sum(part["marks"] for sec in raw["sections"]
                              for q in sec["questions"] for part in q["parts"])
                    assert marks==int(raw["marks"] if "marks" in raw else raw["totalMarks"]),(n,"assessment mark total")
                issues.append({"type":"assessment","stage":"separate assessment paper required",
                               "href":paper,
                               "note":"Full question paper is available separately; 4-page booklet is a revision companion."})
        # Lists commonly contain null slots; only actual mandated visuals
        # are exceptions. Do not flag 67 Year 11 lessons for null placeholders.
        required=[v for v in (d.get("requiredVisuals") or []) if isinstance(v,dict) and v.get("required")]
        if required and not d.get("_required_svg_rendered"):
            issues.append({"type":"pedagogical-review","stage":"source-required SVGs",
                           "count":len(required)})
        if required and d.get("_required_svg_rendered"):
            assert "Question data" in texts[2] and len(pdf[2].get_drawings())>10,(n,"required diagram missing")
    assert file.stat().st_size>20000

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument("--start",type=int,default=21)
    parser.add_argument("--end",type=int,default=164)
    args=parser.parse_args()
    manifest={"generator":"full-course-1","source":"final classroom JSON + central Do Now and Code First banks",
              "master":"J277 Lesson 002, 4 A4 pages","editions":{}, "summary":{}}
    allissues=Counter()
    OUT.mkdir(parents=True,exist_ok=True)
    for n in range(args.start,args.end+1):
        issues=[]
        try:
            d=source(n)
            pdf=fitz.open(MASTER)
            assert len(pdf)==4
            for i,page in enumerate(pdf):
                header(page,n,d)
                (first,second,third,fourth)[i](page,n,d,issues)
            dest=OUT/f"J277_Lesson_{n:03d}_Gold_Standard_4_Page.pdf"
            pdf.set_metadata({"title":f"J277 Lesson {n:03d} - {d['t']}",
                              "subject":"Provisional independently printable 4-page lesson; see audit"})
            pdf.save(dest,garbage=4,deflate=True);pdf.close()
            validate(dest,n,d,issues)
            # Teacher review advisories are retained in the manifest, but
            # don't imply a missing question or broken PDF. The printed item
            # is still explicitly provisional until inspected before teaching.
            blockers={"source-mismatch","content-overflow","generation-failure","assessment"}
            critical_visual=any(e.get("stage")=="source-required SVGs" for e in issues)
            grade="needs-review" if critical_visual or any(e["type"] in blockers for e in issues) else "automated-checks-passed"
            allissues.update(item["type"] for item in issues)
            manifest["editions"][str(n)]={"title":d["t"],"spec":d["s"],
                "year":11 if n>=96 else 10,"state":grade,"pages":4,
                "pdf":str(dest.relative_to(ROOT)),"issues":issues}
            print(f'{n:03d} {grade} issues={len(issues)} {dest.stat().st_size} bytes')
        except Exception as err:
            import traceback
            print(f'{n:03d} FAILED {type(err).__name__}: {err}',file=sys.stderr)
            issues.append({"type":"generation-failure","message":str(err)})
            manifest["editions"][str(n)]={"state":"failed","issues":issues}
            allissues["generation-failure"]+=1
    manifest["summary"]={"planned":args.end-args.start+1,
       "generated":sum(row["state"]!="failed" for row in manifest["editions"].values()),
       "automated_checks_passed":sum(row["state"]=="automated-checks-passed" for row in manifest["editions"].values()),
       "needs_review":sum(row["state"]=="needs-review" for row in manifest["editions"].values()),
       "failed":sum(row["state"]=="failed" for row in manifest["editions"].values()),
       "issues_by_type":dict(allissues)}
    STATUS.write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+"\n",encoding="utf8")
    print("SUMMARY",json.dumps(manifest["summary"],sort_keys=True))
    assert manifest["summary"]["generated"]>0

if __name__=="__main__":main()
