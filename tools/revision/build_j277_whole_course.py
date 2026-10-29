#!/usr/bin/env python3
"""J277 print production pipeline. Lesson 002 is the immutable 4-page master.
Built outputs are PROVISIONAL until teacher-approved. Never silently truncate.
Only finished, structurally verified booklets go into the generated folder.
"""
from pathlib import Path
import json,re,traceback,fitz
import build_j277_lesson001_gold_pdf as B
ROOT=Path(__file__).resolve().parents[2]
MASTER=ROOT/"offline/booklets/j277/J277_Lesson_002_Gold_Standard_4_Page.pdf"
OUT=ROOT/"offline/booklets/j277/generated"
REPORT=ROOT/"offline/booklets/j277/whole-course-audit.json"
OUT.mkdir(exist_ok=True,parents=True)
DONOW=json.loads((ROOT/"lessons/j277/donow-bank-20261020.json").read_text())["lessons"]
CODE=json.loads((ROOT/"lessons/j277/code-first-master-20261021.json").read_text())["lessons"]
INK=B.INK
def clean(s):
    return str(s).replace("→"," -> ").replace("≥",">=").replace("≤","<=").replace("×"," x ").replace("÷"," / ").replace("—","-").replace("–","-").replace("’","'").replace("‘","'").replace("“",'"').replace("”",'"')
def label(p,s,y):
    B.box(p,45,y-10,2.5,15,B.BLUE)
    B.text(p,s,54,y,10.2,True)
def wrapped(s,width=500,sz=8.3,bold=False):
    font="hebo" if bold else "helv"
    lines=[]
    for para in clean(s).splitlines():
        part=""
        for word in para.split():
            test=(part+" "+word).strip()
            if part and fitz.get_text_length(test,fontname=font,fontsize=sz)>width:
                lines.append(part);part=word
            else:part=test
        lines.append(part)
    return lines
def put(p,s,x,y,w=495,size=8.2,lead=11,bold=False,stop=777):
    lines=wrapped(s,w,size,bold)
    if y+max(0,len(lines)-1)*lead>stop:raise ValueError(f"content overflow: y={y}, lines={len(lines)}, stop={stop}")
    for line in lines:
        if line:B.text(p,line,x,y,size,bold)
        y+=lead
    return y
def rule(p,y,n=1,step=17):
    for i in range(n):B.line(p,45,y+i*step)
def source(n):
    path=ROOT/f"lessons/j277/autumn2-{n:03d}.json"
    d=json.loads(path.read_text(encoding="utf8"))[f"{n:03d}"]
    bank=DONOW.get(f"{n:03d}",{}).get("questions")
    if bank and len(bank)==4:
        d["r"]=[(q["question"],q["answer"]) for q in bank]
        d["_mcq"]=bank[1]["options"]
    c=CODE.get(f"{n:03d}")
    if c:
        d["k"]={**d["k"],"q":c["task"],"code":c["starter"],"a":c["model"]+"\nExpected output: "+c["expected"]}
    return d
def page(p):
    p.add_redact_annot(fitz.Rect(40,54,571,782),fill=B.WHITE)
    p.apply_redactions(images=0,graphics=0,text=0)
def p1(p,d):
    put(p,d["t"],45,77,500,15.0,17,True,94)
    for x,name,dx in [(45,"Name",80),(194,"Class",65),(300,"Date",70),(402,"Time",59),(488,"Teacher",75)]:
        B.text(p,name,x,99,8,True)
        B.line(p,x+dx*.53,101,x+dx)
    label(p,"Do Now - Four retrieval questions",124)
    y=148
    if len(d["r"])!=4:raise ValueError("Do Now must have 4 questions")
    for i,(q,_) in enumerate(d["r"],1):
        y=put(p,f"{i}. {q}",45,y,495,8.1,10.2,False,390)
        if i==2 and d.get("_mcq"):
            for idx,opt in enumerate(d["_mcq"]):
                y=put(p,f"{'ABCD'[idx]}) {opt}",58,y+1,470,7.7,9.5,False,390)
        rule(p,y+4,1);y+=25 if i!=4 else 8
    if y>397:raise ValueError(f"retrieval does not fit cleanly: {y}")
    label(p,"Today's objectives",408)
    B.panel(p,45,425,500,57)
    put(p," ".join(d["o"][:2]),54,443,481,8.2,10.8,False,476)
    label(p,"Key vocabulary - Read, cover, recall",505)
    for i,(term,meaning) in enumerate(d["v"][:4]):
        x=45+257*(i%2); yy=527+52*(i//2)
        B.box(p,x,yy,245,47,B.WHITE,B.EDGE)
        put(p,term,x+7,yy+14,231,8.1,9.5,True,yy+19)
        put(p,meaning,x+7,yy+29,231,7.4,9.3,False,yy+45)
    B.text(p,"BLACK PEN: Write one definition in your own words.",45,652,8.1,True)
    rule(p,671,4,20)
def p2(p,d):
    put(p,"Learn and practise",45,77,480,15,17,True,88)
    label(p,"New Learning - Key ideas",102)
    y=126
    for heading,body in d["c"]:
        y=put(p,heading,45,y,485,8.5,11,True,321)
        y=put(p,body,49,y+1,487,7.9,10.3,False,321)+8
    label(p,"I Do - Worked model",y+8);y+=29
    y=put(p,d["m"]["q"],45,y,491,8.3,11,True,574)+10
    for st in d["m"]["st"]:
        y=put(p,"- "+st,49,y,485,7.9,10.4,False,574)+3
    if y>562:raise ValueError("Worked model crowds We Do")
    label(p,"We Do - Guided practice",589)
    y=609
    for i,w in enumerate(d["w"],1):
        question=w[0] if len(w)==2 else w[1]
        y=put(p,f"{i}. {question}",45,y,493,8,10.5,False,758)+8
        rule(p,y,1);y+=22
    if y>769:raise ValueError("We Do needs more space; do not drop activities")
def p3(p,d):
    put(p,"Think and write",45,77,490,15,17,True,88)
    label(p,"Code First - Predict > Write > Test > Improve",103)
    k=d["k"]
    y=126
    y=put(p,"YOUR TASK: "+k["q"],45,y,495,8.25,10.7,True,190)+7
    for line in k["code"].splitlines():
        y=put(p,line,54,y,480,7.7,10,False,280)
    if y>253:raise ValueError("Code First too long for fixed page")
    rule(p,272,2,18)
    label(p,"You Do - Independent exam questions",329)
    y=350
    if not d.get("e"):raise ValueError("No exam questions")
    if d.get("isAssessment") or len(d["e"])!=3:raise ValueError("Assessment requires a dedicated assessment print layout")
    for i,ent in enumerate(d["e"],2):
        q=ent[0].split("\n\nSource:")[0]
        y=put(p,f"Q{i}. {q}",45,y,493,8.1,10.6,False,676)
        rule(p,y+4,2,17); y+=61
    if y>685:raise ValueError("Exam practice does not fit")
    label(p,"Exit Ticket - True or False?",701)
    put(p,d["x"][0],45,723,478,8.0,10,False,749)
    B.text(p,"TRUE [ ]      FALSE [ ]",47,757,8.2,True)
def p4(p,d):
    put(p,"Review & improve",45,77,487,15,17,True,90)
    B.text(p,"GREEN PEN: Tick each correct point; correct mistakes.",45,100,8.0)
    label(p,"Do Now - Model answers",123)
    y=146
    for i,(_,a) in enumerate(d["r"],1):
        y=put(p,f"{i}. {a}",45,y,493,7.65,9.6,False,285)+7
    if y>290:raise ValueError("Do Now answer space exceeded")
    label(p,"I Do - Explain the model",301)
    y=321
    for st in d["m"]["st"]:
        y=put(p,st,45,y,493,7.45,9.35,False,401)+4
    if y>402:raise ValueError("I Do review too long")
    label(p,"We Do - Model answers",411)
    y=431
    for i,w in enumerate(d["w"],1):
        answer=w[1] if len(w)==2 else w[2]
        y=put(p,f"{i}. {answer}",45,y,493,7.45,9.4,False,526)+5
    if y>525:raise ValueError("Guided answer review too long")
    label(p,"Code First - Answer",537)
    y=552
    y=put(p,kanswer(d),45,y,492,7.35,9.2,False,616)
    label(p,"You Do - Self-mark",627)
    y=647
    # Full marking schemes cannot be silently omitted.
    for i,e in enumerate(d["e"],2):
        y=put(p,f"Q{i}: {e[1]}",45,y,493,7.4,9.1,False,742)+4
    if y>748:raise ValueError("Answer space exceeded")
    B.text(p,"GREEN PEN: Choose the hardest answer. Correct it on lined paper.",45,761,7.8,True)
def kanswer(d):return d["k"].get("a","No model answer available")
def build(n):
    d=source(n)
    if len(d.get("w",[]))==0:raise ValueError("No guided activities")
    if len(d.get("v",[]))<4:raise ValueError("Fewer than four vocabulary terms")
    doc=fitz.open(MASTER)
    for i,p in enumerate(doc):
        page(p)
        if i==0:p1(p,d)
        elif i==1:p2(p,d)
        elif i==2:p3(p,d)
        else:p4(p,d)
        p.add_redact_annot(fitz.Rect(489,16,575,33),fill=B.WHITE)
        p.apply_redactions(images=0,graphics=0,text=0)
        B.text(p,f"LESSON {n:03d}",497,26,8.1,True)
    target=OUT/f"J277_Lesson_{n:03d}_Provisional_4_Page.pdf"
    doc.save(target,garbage=4,deflate=True);doc.close()
    with fitz.open(target) as test:
        if len(test)!=4:raise ValueError("Not four pages")
        for i,p in enumerate(test):
            for b in p.get_text("dict")["blocks"]:
                if b["type"]!=0:continue
                x0,y0,x1,y1=b["bbox"]
                if x0<-1 or x1>596 or y0<-1 or y1>842:raise ValueError(f"Text outside page {i+1}")
        if clean(d["t"]) not in clean(test[0].get_text()):raise ValueError("Title missing")
        for ent in d["e"]:
            if clean(ent[0].split("\n\nSource:")[0]) not in clean(test[2].get_text()):
                # Wrapped text is allowed.
                if re.sub(r"\s+"," ",clean(ent[0].split("\n\nSource:")[0])) not in re.sub(r"\s+"," ",clean(test[2].get_text())):raise ValueError("Exam question mismatch")
    return {"number":n,"status":"generated_unapproved","file":str(target.relative_to(ROOT)),"title":d["t"]}
def main():
    results=[]
    for n in range(21,165):
        try: results.append(build(n))
        except Exception as e: results.append({"number":n,"status":"needs_layout_exception","reason":str(e)[:300]})
    REPORT.write_text(json.dumps({"master":"J277 Lesson 002","total":len(results),"generated":sum(x["status"]=="generated_unapproved" for x in results),"exceptions":sum(x["status"]=="needs_layout_exception" for x in results),"lessons":results},indent=2),encoding="utf8")
    print("RESULT generated",sum(x["status"]=="generated_unapproved" for x in results),"exceptions",sum(x["status"]=="needs_layout_exception" for x in results))
    for item in results:
        if item["status"]!="generated_unapproved":print("EXCEPTION",item["number"],item.get("reason"))
if __name__=="__main__":main()
