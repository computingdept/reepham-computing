#!/usr/bin/env python3
"""Publish OCR J277 four-page printable lessons 016-020.

All questions and solutions derive from the live lesson JSON. The approved
Lesson 002 master preserves the black-pen / green-pen instructions and the
five-stage footer. No classroom behaviour boxes in the body. The lesson
teaching pages and revision guides are not modified.
"""
import json, re
from pathlib import Path
import fitz
import build_j277_lesson001_gold_pdf as B
import build_j277_gold_batch_006_008 as G

ROOT=Path(__file__).resolve().parents[2]
MASTER=ROOT/"offline/booklets/j277/J277_Lesson_002_Gold_Standard_4_Page.pdf"
OUT=ROOT/"offline/booklets/j277"
INDEX=ROOT/"revision/j277/guides/skill-index.json"
BLUE,PALE,EDGE,GREEN,WHITE=G.BLUE,G.BLUE_LIGHT,G.EDGE,G.GREEN,B.WHITE
t,sec,rules,tick=G.t,G.sec,G.rules,G.tick

GUIDE={16:("2","22-array1","P2 pp.58,94"),
       17:("2","23-defensive","P2 pp.118,129"),
       18:("1+2",None,"P1 + P2 review"),
       19:("1","11-performance","P1 p.22"),
       20:("1","11-embedded","P1 p.33")}
CONCEPTS={
 16:[("VARIABLE","A named value can change using assignment."),
     ("INPUT / OUTPUT","Read data from a user; display or send the result."),
     ("1D ARRAY","Related values stored at numbered indexes."),
     ("INDEXES","The first element has index 0, not index 1.")],
 17:[("DEFENSIVE DESIGN","Anticipate unsuitable input; handle it safely."),
     ("VALIDATION","Check data against a type, range or length rule."),
     ("AUTHENTICATION","Check an identity. This is not validation."),
     ("TESTING","Try normal, boundary, invalid and erroneous data.")],
 18:[("PAPER 1","Recall CPU, storage, binary, images and sound."),
     ("PAPER 2","Recall ADA, flowcharts, searching, sorting and validation."),
     ("SHOW WORKING","Write formula, values, bits, then bytes."),
     ("REVIEW & IMPROVE","Find one strength and one topic to revisit.")],
 19:[("CLOCK SPEED","Clock cycles each second, measured in Hz."),
     ("CACHE","Frequently used data/instructions near the CPU."),
     ("CORES","More cores can handle multiple tasks at once."),
     ("COMPARE","Use all three features; real speed depends on the task.")],
 20:[("DEDICATED JOB","A computer built into a larger device for one purpose."),
     ("INPUT > PROCESS > OUTPUT","Sensor -> controller decision -> motor or signal."),
     ("SOFTWARE / MEMORY","Firmware in non-volatile memory; RAM for working data."),
     ("SUITABLE FEATURES","Often low power; some require a timely response.")],
}
WORKED={
 16:["Start: marks = [4, 7, 9]. Index 0 contains 4.",
     "Read marks[0] + marks[1] = 4 + 7 = 11.",
     "Change marks[0] to 5; indexes stay the same.",
     "Recalculate: 5 + 7 = 12. Output 12."],
 17:["The valid mark range is 0 to 100 inclusive.",
     "Normal: 56 -> accept. Boundaries: 0 and 100 -> accept.",
     "Invalid numeric values: -1 and 101 -> reject.",
     "Erroneous type: 'hello' -> reject or handle safely."],
 18:["50 x 40 = 2,000 pixels.",
     "2,000 x 8 = 16,000 raw bits.",
     "16,000 / 8 = 2,000 bytes.",
     "Choose an SSD for a knocked laptop: no moving heads.",
     "Drawback: SSDs often cost more per GB than HDDs."],
 19:["CPU A: higher clock speed. CPU B: more cores and cache.",
     "More cores can run several programs concurrently.",
     "More cache can reduce slower RAM accesses.",
     "Explain each feature's benefit: two developed points.",
     "Neither CPU is guaranteed fastest for all workloads."],
 20:["The washing-machine controller has a dedicated job.",
     "It is a computer built into a larger device.",
     "Input: water-level or temperature sensor.",
     "Output: switch the drum motor on or off."]
}
GUIDED={
 16:("Write the assignment to put 12 into score.","score = 12."),
 17:("Classify 100 and 101 for a 0-100 mark rule.","100 is valid upper boundary; 101 is invalid."),
 18:("Find the raw size of a 5 x 4 bitmap at 8 bits per pixel.",
     "5 x 4 x 8 = 160 bits = 20 bytes."),
 19:("Compare CPU C (3.6 GHz, 2 cores, 4 MB) and CPU D (3.0 GHz, 6 cores, 12 MB). Why may D help multitasking?",
     "D has 6 vs 2 cores [2]: more tasks concurrently. 12 vs 4 MB cache [2]: more frequently used data nearby. C has the higher clock speed."),
 20:("Thermostat: why embedded, and what input and output?",
     "Built into heating controller [1], dedicated purpose [1], temperature-sensor input [1], heating switch output [1]."),
}
CODE_TASKS={
 16:["Predict the total in MB.",
     "Change fileMB[1] to 6; predict the new total.",
     "Convert the revised 8 MB into KB (1 MB = 1000 KB)."],
 17:["Predict whether 260 fits in unsigned 8-bit binary.",
     "Change value to 255 and predict the result.",
     "Explain why the allowed range is 0-255."],
 18:["Predict the raw bitmap size in bits.",
     "Change depth to 4 and predict again.",
     "Show how to convert the second result to bytes."],
 19:["Predict the exact clock-speed message.",
     "Set clockJ = 3.8; predict the changed message.",
     "Write an IF comparing coresJ=6 with coresK=4."],
 20:["Predict the result at temperature = 29.",
     "Change temperature to 22 and predict again.",
     "Use limit = 28 and test at temperature = 28."],
}
CODE_ANS={
 16:["Initial output: 7 MB (2 + 5).",
     "After change: 8 MB (2 + 6).",
     "8 MB = 8,000 KB at 1000 KB per MB."],
 17:['260 -> "Out of range".',
     '255 -> "Fits".',
     "Unsigned 8-bit values: 2^8 = 256; 0 through 255."],
 18:["10 x 5 x 8 = 400 bits.",
     "With depth 4: 200 bits.",
     "200 / 8 = 25 bytes."],
 19:['Initial: "CPU K has an equal or higher clock speed".',
     'After clockJ=3.8: "CPU J has a higher clock speed".',
     'With coresJ=6, coresK=4: "CPU J has more cores".'],
 20:['At 29: "Ventilation on".',
     'At 22: "Ventilation off".',
     "At 28, condition 28 > 28 is false: Ventilation off."],
}
ANSWER={
 16:["Variable stores a value [1]; array stores indexed values [1].",
     "Index 0 = 7 [1]; index 2 = 5 [1].",
     "total=0 [1]; add values[0] [1]; add values[1] [1]; print(total) [1]."],
 17:["Check input against rules [1]; reject unsuitable data [1].",
     "0 and 100: valid boundaries [2]; 101 or -1: invalid [1].",
     "Authentication checks identity [1]; validation checks data [1]; iterative tests find faults early [2]."],
 18:["100 x 20 = 2000 pixels [1]; x 4 = 8000 bits [1]; / 8 = 1000 bytes [1].",
     "Ignore irrelevant detail [1]; retain important detail [1]; device colour need not affect storage [1].",
     "Validate mark between 0 and 100 inclusive [2]; test 0 or 100 [1] and accept it [1]."],
 19:["Clock speed [1]; cache size [1]; number of cores [1].",
     "H: 8 vs 2 cores -> better parallel tasks [2]; 16 vs 6 MB cache -> fewer slow RAM accesses [2].",
     "Clock: cycles per second + faster processing [2]. Cache: fast frequent data + less RAM [2]. Cores: concurrent tasks + multitasking [2]."],
 20:["Two features: built into a larger device [1] and a specific job [1].",
     "Barrier system has a dedicated controller [2]; vehicle sensor is input [1]; motor is output [1].",
     "Smoke alarm: dedicated smoke detection [2]; low power for battery [2]; real-time response for safety [2]."],
}
EXITS={
 16:[("Index 0 is the first array item.",True),
     ("Arrays and variables always store exactly the same number of values.",False)],
 17:[("Validation checks data against a rule.",True),
     ("An invalid mark of 101 must be accepted in the range 0-100.",False)],
 18:[("To turn raw bits into bytes, divide by eight.",True),
     ("An SSD has moving magnetic read/write heads.",False)],
 19:[("Cache can reduce time accessing RAM.",True),
     ("More cores always make every single task run faster.",False)],
 20:[("A thermostat may contain an embedded controller.",True),
     ("A sensor provides an input, not a physical output.",True)],
}

def plain(v):
    return (str(v).replace("×"," x ").replace("÷"," / ").replace("→"," -> ")
            .replace("–","-").replace("—","-").replace("≥",">=")
            .replace("≤","<=").replace("‘","'").replace("’","'")
            .replace("“",'"').replace("”",'"').replace("£","GBP "))

def render_wrap(p,value,x,y,width=482,size=8.2,lead=11.4,bold=False,limit=None):
    """Insert a complete text block with measurable height and no clipping."""
    font="hebo" if bold else "helv"
    lines=[]
    for paragraph in plain(value).split("\n"):
        if not paragraph.strip():
            lines.append("");continue
        part=""
        for word in paragraph.split():
            cand=(part+" "+word).strip()
            if part and fitz.get_text_length(cand,fontname=font,fontsize=size)>width:
                lines.append(part);part=word
            else: part=cand
        lines.append(part)
    if limit is not None:
        assert y+(len(lines)-1)*lead<=limit, (value,len(lines),y,limit)
    for line in lines:
        if line:p.insert_text((x,y),line,fontname=font,fontsize=size,color=B.INK)
        y+=lead
    return y

def topic(n):
    if n<=18:
        src=ROOT/"lessons/j277/autumn1-014-018.json"
    else:
        src=ROOT/f"lessons/j277/autumn2-{n:03d}.json"
    d=json.loads(src.read_text(encoding="utf8"))[f"{n:03d}"]
    assert len(d["r"])==4 and len(d["e"])==3 and len(d["w"])>=1
    assert len(d["k"]["p"])==3 and len(d["v"])>=4
    ix=json.loads(INDEX.read_text(encoding="utf8"))
    paper,skill,note=GUIDE[n]
    if skill:
        assert ix["skills"][skill]["paper"]==paper
        assert ix["skills"][skill]["spec"] in d["s"] or n==16
        if n>=19:assert n in ix["skills"][skill]["lessons"]
    # The classroom renderer replaces legacy JSON retrieval and Code First
    # with central banks. Match its final on-screen content in print.
    # Lesson 016 was approved separately; leave its teaching content intact.
    if n>=17:
        bank=json.loads((ROOT/"lessons/j277/donow-bank-20261020.json").read_text(encoding="utf8"))
        qs=bank["lessons"][f"{n:03d}"]["questions"]
        assert len(qs)==4 and len(qs[1]["options"])==4
        d["r"]=[(q["question"],q["answer"]) for q in qs]
        d["print_retrieval"]=qs
        code_bank=json.loads((ROOT/"lessons/j277/code-first-master-20261021.json").read_text(encoding="utf8"))
        cm=code_bank["lessons"].get(f"{n:03d}")
        if cm:
            d["print_code_master"]=cm
            d["k"]={**d["k"],"q":cm["task"],"code":cm["starter"],
                     "a":"MODEL "+cm["language"]+"\n"+cm["model"]+"\nEXPECTED RESULT: "+cm["expected"]}
    return d,note

def header(p,n,d,note):
    G.header(p,n)
    p.add_redact_annot(fitz.Rect(40,13,468,33),fill=WHITE)
    p.apply_redactions(images=0,graphics=0,text=0)
    t(p,"RHS COMPUTING / OCR J277 / "+d["s"],45,26,7.7,True)
    # Lesson 002 master has GREEN PEN instructions through y=45.
    # Do not add a guide reference in that space.

def p1(p,n,d):
    render_wrap(p,d["t"],45,76,501,15.1,17,True,92)
    for label,x,w in [("Name",45,125),("Class",194,72),("Date",300,69),
                      ("Time",403,64),("Teacher",490,76)]:
        t(p,label,x,99,8,True);B.line(p,x+len(label)*5+6,99,x+w)
    sec(p,"Do Now - Four retrieval questions",124)
    t(p,"BLACK PEN: Answer all four before turning to the answers.",45,145,8.1)
    # Four retrieval questions from the actual lesson. The online Q2 is MCQ.
    if n==16:
        # Previously approved teaching content and spacing.
        for i,(question,_) in enumerate(d["r"]):
            y=164+i*61
            final=render_wrap(p,f"{i+1}. {question}",45,y,494,8.5,11.0,limit=y+44)
            rules(p,max(y+28,final+1),2,step=15)
    else:
        y=162
        for i,(question,_) in enumerate(d["r"]):
            final=render_wrap(p,f"{i+1}. {question}",45,y,494,8.3,10.5,limit=y+44)
            if i==1:
                opts=d["print_retrieval"][i]["options"]
                for k,opt in enumerate(opts):
                    x=49+(k%2)*256
                    oy=final+2+(k//2)*12.5
                    render_wrap(p,"ABCD"[k]+") "+opt,x,oy,237,7.85,9.3,limit=oy+10)
                line_y=final+30
                rules(p,line_y,1,step=14.5)
                y=line_y+24
            else:
                line_y=final+4
                rules(p,line_y,2,step=14.5)
                y=line_y+42
        assert y<418,(n,"Do Now needs a compact line layout",y)
    sec(p,"Today's objectives",418)
    G.card(p,45,439,501,54,PALE)
    render_wrap(p," ".join(d["o"][:2]),54,457,477,8.6,11.0,limit=484)
    sec(p,"Key vocabulary - Read, cover, recall",516)
    for i,(term,meaning) in enumerate(d["v"][:4]):
        x=45+(i%2)*257;y=538+(i//2)*51
        G.card(p,x,y,245,47,WHITE)
        render_wrap(p,term,x+8,y+14,230,8.6,10,True,limit=y+22)
        render_wrap(p,meaning,x+8,y+28,230,7.8,9.5,limit=y+46)
    t(p,"Write one definition in your own words:",45,657,8.5,True)
    rules(p,676,4,step=20)

def diagram(p,n):
    """Custom topic illustrations; vector artwork stays sharp in B&W print."""
    G.card(p,45,298,501,119,PALE)
    if n==16:
        t(p,"ARRAY ELEMENTS - INDEX AND VALUE ARE DIFFERENT",57,316,8.7,True)
        for i,v in enumerate([4,7,9]):
            x=115+i*125
            B.box(p,x,330,96,43,WHITE,EDGE,1.1)
            t(p,"Index "+str(i),x+18,344,8,True)
            t(p,"Value "+str(v),x+18,363,9,True)
        t(p,"total = marks[0] + marks[1] = 4 + 7 = 11",57,404,8.5,True)
    elif n==17:
        t(p,"MARK VALIDATION - ACCEPT 0 TO 100 INCLUSIVE",57,316,8.7,True)
        for i,(v,label,ok) in enumerate([("-1","Reject",False),
                ("0","Accept",True),("56","Accept",True),
                ("100","Accept",True),("101","Reject",False)]):
            x=59+i*97;B.box(p,x,330,86,47,WHITE,EDGE,1)
            t(p,v,x+25,347,9.6,True)
            t(p,label,x+15,366,8.2,True)
        t(p,"'hello' is erroneous (wrong type); it must be handled safely.",57,404,8.0)
    elif n==18:
        t(p,"SHOW EACH STEP - IMAGE SIZE CALCULATION",57,316,9,True)
        for i,(main,sub) in enumerate([("PIXELS","50 x 40 = 2000"),
                         ("BITS","2000 x 8 = 16000"),
                         ("BYTES","16000 / 8 = 2000")]):
            x=60+i*163;B.box(p,x,329,153,60,WHITE,EDGE)
            t(p,main,x+8,348,8.6,True)
            t(p,sub,x+8,369,7.6)
        t(p,"For calculations: formula -> working -> unit.",57,408,8.4,True)
    elif n==19:
        t(p,"COMPARE THE SPECS, THEN EXPLAIN THE WORKLOAD",57,316,8.8,True)
        for i,(name,clock,cores,cache) in enumerate([
           ("CPU C","3.6 GHz","2 cores","4 MB cache"),
           ("CPU D","3.0 GHz","6 cores","12 MB cache")]):
            x=61+245*i;B.box(p,x,328,230,60,WHITE,EDGE)
            t(p,name,x+9,343,9.3,True)
            t(p,clock+"  |  "+cores,x+9,363,8.2)
            t(p,cache,x+9,380,8.2,True)
        t(p,"CPU D may suit several concurrent programs; no blanket winner.",57,406,8.0)
    elif n==20:
        t(p,"EMBEDDED CONTROLLER: INPUT -> PROCESS -> OUTPUT",57,316,8.5,True)
        for i,(label,detail) in enumerate([("INPUT","Water sensor"),
                ("PROCESS","Wash program"),("OUTPUT","Drum motor")]):
            x=59+i*165;B.box(p,x,333,151,57,WHITE,EDGE,1)
            t(p,label,x+8,350,8.8,True)
            t(p,detail,x+8,373,8.3)
            if i<2:
                p.draw_line((x+152,357),(x+163,357),color=BLUE,width=1.6)
        t(p,"The controller is built into a larger washing machine.",57,407,8.4)
    else:raise AssertionError(n)

def p2(p,n,d):
    t(p,"Learn and practise",45,76,15.2,True)
    sec(p,"New learning - Four key ideas",103)
    for i,(term,expl) in enumerate(CONCEPTS[n]):
        y=130+i*40
        B.box(p,45,y-12,501,36,WHITE,EDGE,.65)
        t(p,term,53,y,8.3,True)
        render_wrap(p,expl,195,y,338,7.75,10.2,limit=y+13)
    diagram(p,n)
    sec(p,"I Do - Worked example",439)
    render_wrap(p,d["m"]["q"],45,459,490,8.45,11.6,True,limit=486)
    y=506
    for i,step in enumerate(WORKED[n],1):
        final=render_wrap(p,str(i)+". "+step,49,y,487,8.0,10.8,limit=y+22)
        y=max(y+25,final+3)
    assert y<653,(n,"worked model overruns",y)
    sec(p,"We Do - Guided practice",657)
    final=render_wrap(p,GUIDED[n][0],45,680,495,8.45,11,limit=723)
    t(p,"BLACK PEN - complete your explanation:",45,max(718,final+5),7.9,True)
    rules(p,746,2,step=18)

def exam_question(q):
    # Source attributions are metadata; keep the full question and marks.
    return q.split("\n\nSource:")[0].strip()

def p3(p,n,d):
    t(p,"Think and write",45,76,15.2,True)
    sec(p,"Code First - Predict > Write > Test > Improve",103)
    # Lesson 002 uses a white, high-contrast working surface rather than a large colour fill.
    B.box(p,45,134,501,111,WHITE,EDGE,.75)
    if n>=17 and d.get("print_code_master"):
        render_wrap(p,"YOUR TASK: "+d["k"]["q"],55,150,480,8.0,10.4,True,limit=170)
    else:
        t(p,"Read the OCR Exam Reference Language code before testing it.",55,150,7.8)
    code=d["k"]["code"].splitlines()
    assert len(code)<=9,(n,"Code First more than 9 lines")
    for i,line in enumerate(code):
        render_wrap(p,line.replace("    ","  "),58,166+i*10.8,471,7.9,10.1,limit=239)
    if n>=17 and d.get("print_code_master"):
        render_wrap(p,"BLACK PEN: complete the ONE short task on paper first.",45,259,493,8.4,10.6,True,limit=276)
        t(p,"TEST by tracing. IMPROVE by checking the full model on Page 4.",45,284,7.9)
        rules(p,309,2,step=20)
    else:
        for i,prompt in enumerate(CODE_TASKS[n],1):
            y=267+(i-1)*29
            render_wrap(p,str(i)+". "+prompt,45,y,493,8.0,10.5,limit=y+13)
            rules(p,y+14,1,step=16)
    sec(p,"You Do - Independent exam questions",363)
    # Follow the approved Lesson 002 typography; vary ruled space by
    # the actual length and marks of each question. A six-marker needs more
    # than the two tiny lines from the original 016-020 generator.
    slots={
        16:(75,80,111), 17:(75,85,106), 18:(78,83,105),
        19:(75,91,100), 20:(74,90,102),
    }[n]
    y=387
    for i,(raw,_) in enumerate(d["e"]):
        val=exam_question(raw)
        slot=slots[i]
        qn=i+2 if n>=17 else i+1
        final=render_wrap(p,f"Q{qn}. "+val,45,y,494,8.4,11.4,limit=y+slot-38)
        line_y=max(y+30,final+5)
        target_lines=4 if ("[6 marks]" in val) else (3 if i==2 else 2)
        actual_lines=0
        for k in range(target_lines):
            yy=line_y+17*k
            if yy>=y+slot-8:break
            B.line(p,45,yy,546)
            actual_lines+=1
        assert actual_lines >= 2,(n,i,"insufficient writing space")
        if "[6 marks]" in val:
            assert actual_lines >= 3,(n,i,"six-mark response space")
        y+=slot
    assert y<=663,(n,"questions overlap Exit Ticket")
    sec(p,"Exit Ticket - True or False?",673)
    t(p,"Answer before checking Page 4.",45,695,8.0)
    checks=[(d["x"][0],bool(d["x"][1]))]+EXITS[n]
    for i,(statement,_) in enumerate(checks,1):
        y=714+(i-1)*21
        render_wrap(p,f"{i}. {statement}",45,y,440,7.65,9.8,limit=y+9)
        tick(p,499,y-7);t(p,"T",510,y,7.7,True)
        tick(p,527,y-7);t(p,"F",538,y,7.7,True)

def p4(p,n,d):
    t(p,"Review & improve",45,76,15.2,True)
    t(p,"GREEN PEN: Mark fairly. Tick correct points and fix any mistakes.",45,99,8.1)
    t(p,"Use the mark allocations; then rewrite one answer in full.",45,113,8.0)
    sec(p,"Do Now - Answers",133)
    B.box(p,300,145,1,194,B.RULE)
    for i,(_,answer) in enumerate(d["r"],1):
        y=157+(i-1)*45
        t(p,"Q"+str(i),49,y,7.8,True)
        render_wrap(p,answer,70,y,215,7.5,9.2,limit=y+36)
        tick(p,285,y-8)
    t(p,"Code First - Model",315,149,9.4,True)
    if n>=17 and d.get("print_code_master"):
        cm=d["print_code_master"]
        render_wrap(p,cm["model"],315,175,223,7.8,10.3,limit=271)
        render_wrap(p,"EXPECTED: "+cm["expected"],315,280,221,8.2,10.5,True,limit=305)
        tick(p,534,306)
    else:
        for i,line in enumerate(CODE_ANS[n],1):
            y=175+(i-1)*46
            render_wrap(p,str(i)+". "+line,315,y,223,7.75,10.2,limit=y+31)
            tick(p,534,y-8)
    sec(p,"We Do - Check the model",337)
    render_wrap(p,GUIDED[n][1],45,362,488,7.8,10.4,limit=409)
    sec(p,"Exit Ticket - Check",416)
    outcome=["TRUE" if z[1] else "FALSE" for z in
             [(d["x"][0],bool(d["x"][1]))]+EXITS[n]]
    t(p,"1. "+outcome[0]+"     2. "+outcome[1]+"     3. "+outcome[2],48,443,8.3,True)
    render_wrap(p,"Explain one false statement using the key ideas.",48,461,484,7.9)
    sec(p,"You Do - Self-mark",488)
    for i,a in enumerate(ANSWER[n],1):
        y=512+(i-1)*45
        t(p,"Q"+str(i+1 if n>=17 else i),50,y,7.8,True)
        render_wrap(p,a,79,y,457,8.0,10.3,limit=y+39)
        tick(p,535,y-8)
    sec(p,"Try the question again",641)
    t(p,"1. Copy the FULL question you got wrong (or found hardest):",45,661,8.0,True)
    rules(p,679,2,step=18)
    t(p,"2. In GREEN PEN, write a NEW answer. Include working if needed:",45,719,7.95,True)
    rules(p,737,3,step=19)

def validate(path,n,d):
    with fitz.open(path) as pdf:
        assert len(pdf)==4
        for i,page in enumerate(pdf,1):
            assert round(page.rect.width)==595 and round(page.rect.height)==842
            alltext=page.get_text()
            for token in [f"LESSON {n:03d}","BLACK PEN","GREEN PEN","Review & Improve",d["s"]]:
                assert token in alltext,(n,i,token)
            for block in page.get_text("dict")["blocks"]:
                if block["type"]!=0:continue
                rect=fitz.Rect(block["bbox"])
                assert rect.x0>=0 and rect.x1<=596 and rect.y0>=0 and rect.y1<=843,(n,i,rect)
            body_words={w[4].upper() for w in page.get_text("words") if 54<=w[1]<780}
            assert not body_words.intersection({"SILENT","LISTEN","MWBS","THUMBS"}),(n,i)
        texts=[x.get_text() for x in pdf]
        norm=lambda s:re.sub(r"\s+"," ",plain(s)).strip()
        assert norm(d["t"]) in norm(texts[0]),(n,"title")
        for q,_ in d["r"]:
            assert norm(q) in norm(texts[0]),(n,"retrieval",q)
        assert all(x in texts[1] for x in ["New learning","I Do","We Do"])
        assert "Code First" in texts[2] and "You Do" in texts[2]
        for q,_ in d["e"]:
            assert norm(exam_question(q)) in norm(texts[2]),(n,"question",q)
        assert "Try the question again" in texts[3] and "Self-mark" in texts[3]
        assert path.stat().st_size>30000
    # A PDF that simply has four pages is NOT necessarily equivalent to
    # the live classroom lesson or visually safe to print.
    if n>=17:
        with fitz.open(path) as test:
            for page in test:
                assert not any("pp." in block[4] and block[1]<54
                               for block in page.get_text("blocks") if len(block)>4),(n,"header overlay")
            text1=test[0].get_text()
            for item in d["print_retrieval"]:
                assert re.sub(r"\s+"," ",plain(item["question"])).strip() in re.sub(r"\s+"," ",plain(text1)).strip(),(n,"missing live Do Now",item["question"])
            for option in d["print_retrieval"][1]["options"]:
                assert option in text1,(n,"missing MCQ choice",option)
            cm=d.get("print_code_master")
            if cm:
                text3=test[2].get_text()
                assert cm["task"] in text3,(n,"Code First task differs from live lesson")
                for line in cm["starter"].splitlines():
                    assert line.strip() in text3,(n,"Code First starter missing",line)
                assert cm["expected"] in test[3].get_text(),(n,"Code First model missing")
    print("PASS",n,"4 pages",path.stat().st_size,"bytes")

def build(n):
    d,note=topic(n)
    pdf=fitz.open(MASTER)
    assert len(pdf)==4
    for i,page in enumerate(pdf):
        header(page,n,d,note)
        if i==0:p1(page,n,d)
        elif i==1:p2(page,n,d)
        elif i==2:p3(page,n,d)
        else:p4(page,n,d)
    out=OUT/f"J277_Lesson_{n:03d}_Gold_Standard_4_Page.pdf"
    pdf.set_metadata({"title":f"J277 Lesson {n:03d} - {d['t']}",
                      "creator":"RHS Computing - Gold Standard independent print"})
    pdf.save(out,garbage=4,deflate=True);pdf.close()
    validate(out,n,d)

if __name__=="__main__":
    for n in range(16,21):build(n)
