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
    return P.plain(str(s)).replace("•","-").replace("’","'")
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

def second(p,n,d,issues):
    P.t(p,"Learn and practise",45,76,15.2,True)
    sec(p,"New learning - Key ideas",100)
    concepts=d["c"][:5]
    rowstep=27 if len(concepts)==5 else 33
    for i,(title,description) in enumerate(concepts):
        y=119+i*rowstep
        G.card(p,45,y-12,501,rowstep-2,WHITE)
        textblock(p,title,52,y,140,rowstep-5,8.0,7.05,True,issues,"concept title "+str(i+1))
        textblock(p,description,198,y,335,rowstep-2,7.65,6.85,False,issues,"concept "+str(i+1))
    if len(d["c"])>5:issues.append({"type":"content-overflow","stage":"more than five New Learning steps","count":len(d["c"])-5})
    sec(p,"I Do - One worked example",260)
    question=d["m"].get("q") or d["m"].get("title") or d["t"]
    textblock(p,question,45,282,498,37,8.15,7.05,True,issues,"i-do-question")
    steps=d["m"].get("st",[])
    if len(steps)>5:issues.append({"type":"pedagogical-review","stage":"more than 5 I Do steps","count":len(steps)})
    steps=steps[:5]
    if steps:
        y=334
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

def third(p,n,d,issues):
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
    slots=[(385,461),(474,568),(582,656)]
    for i,item in enumerate(d["e"][:3]):
        q=item[0].split("\n\nSource:")[0].strip()
        top,bottom=slots[i]
        # Code First is Q1, three exam questions are Q2-Q4.
        available=bottom-top
        textblock(p,"Q"+str(i+2)+". "+q,45,top,493,available-25,
                  8.0,6.95,False,issues,"exam-question-"+str(i+2))
        marks=re.search(r"\[(\d+)\s+marks?\]",q,re.I)
        if marks and int(marks.group(1))>=6:
            issues.append({"type":"pedagogical-review","stage":"6-mark writing space","question":i+2,
                           "note":"Use separate answer paper if needed"})
        rule(p,bottom-23,2,step=15)
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
    sec(p,"Exit Ticket - Check",471)
    truth=["TRUE" if z[1] else "FALSE" for z in d["printExits"]]
    P.t(p,"  ".join(str(i+1)+". "+v for i,v in enumerate(truth)),48,491,8.0,True)
    sec(p,"You Do - Self-mark",510)
    for i,item in enumerate(d["e"][:3]):
        y=531+i*49
        P.t(p,"Q"+str(i+2),48,y,8.0,True)
        textblock(p,item[1],78,y,456,44,7.6,6.7,False,issues,"exam-answer-"+str(i+2))
        P.tick(p,535,y-8)
    sec(p,"Try the question again",685)
    P.t(p,"1. Copy the FULL question you found most difficult:",45,704,7.9,True)
    rule(p,722,1)
    P.t(p,"2. In GREEN PEN, write a complete new answer:",45,741,7.9,True)
    rule(p,759,1)

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
        if d.get("isAssessment"):
            issues.append({"type":"assessment","stage":"separate assessment paper required",
                           "href":d.get("assessmentHref")})
        # Lists commonly contain null slots; only actual mandated visuals
        # are exceptions. Do not flag 67 Year 11 lessons for null placeholders.
        required=[v for v in (d.get("requiredVisuals") or []) if isinstance(v,dict) and v.get("required")]
        if required:
            issues.append({"type":"pedagogical-review","stage":"source-required SVGs",
                           "count":len(required)})
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
