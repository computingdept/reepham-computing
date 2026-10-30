"""Create standalone H446 unit PDFs from currently published full guides.

Original chapter pages are copied, never reauthored. A clickable local contents
page is prefixed; OCR supplements stay with the relevant programming/algorithms unit.
Stop on unexpected source boundaries rather than publish an incorrect split.
"""
from pathlib import Path
import re, math
import fitz

ROOT = Path(__file__).resolve().parents[1] / "revision/h446/guides"
OUT = ROOT / "units"
FILES = {
  1: "H446_Paper_1_FINAL_Student_Revision_Guide.pdf",
  2: "H446_Paper_2_FINAL_Student_Revision_Guide.pdf",
}
UNITS = [
 (1,"1.1","Processors, input/output and storage","H446_Unit_1-1_Processors_IO_and_Storage.pdf"),
 (1,"1.2","Software and software development","H446_Unit_1-2_Software_and_Development.pdf"),
 (1,"1.3","Exchanging data","H446_Unit_1-3_Exchanging_Data.pdf"),
 (1,"1.4","Data types, data structures and Boolean algebra","H446_Unit_1-4_Data_Types_Structures_and_Boolean_Algebra.pdf"),
 (1,"1.5","Legal, moral, cultural and ethical issues","H446_Unit_1-5_Legal_Moral_and_Ethical_Issues.pdf"),
 (2,"2.1","Computational thinking","H446_Unit_2-1_Computational_Thinking.pdf"),
 (2,"2.2.1","Programming techniques","H446_Unit_2-2-1_Programming_Techniques.pdf"),
 (2,"2.2.2","Computational methods","H446_Unit_2-2-2_Computational_Methods.pdf"),
 (2,"2.3","Algorithms","H446_Unit_2-3_Algorithms.pdf"),
]

def find_unique(toc, pattern):
    hits=[p for level,t,p in toc if level==1 and re.match(pattern,t,re.I)]
    if len(hits)!=1:raise RuntimeError(f"Expected one chapter matching {pattern}: {hits}")
    return hits[0]

def spans(doc,paper):
    toc=doc.get_toc()
    if paper==1:
        codes=["1.1","1.2","1.3","1.4","1.5"]
        starts=[find_unique(toc,r"^Section\s+"+re.escape(code)+r"(?![\d.])") for code in codes]
        later=[p for lev,t,p in toc if lev==1 and p>starts[-1]]
        ends=starts[1:]+[min(later) if later else len(doc)+1]
        return {code:[(a,b)] for code,a,b in zip(codes,starts,ends)}
    a=find_unique(toc,r"^2\.1\s+(?!-)")
    b=find_unique(toc,r"^2\.2\s+(?!-)")
    c=find_unique(toc,r"^2\.2\s*-\s*OCR")
    d=find_unique(toc,r"^2\.3\s+(?!-)")
    e=find_unique(toc,r"^Original exam practice")
    methods=[p for p in range(b,c) if re.search(r"2\.2\.2\([a-z]",doc[p-1].get_text()[:350],re.I)
             and "Understand" in doc[p-1].get_text()[:350]]
    if not methods:raise RuntimeError("Could not find start of 2.2.2")
    m=min(methods)
    if not (1<=a<b<m<c<d<e<=len(doc)+1):raise RuntimeError("Bad Paper 2 boundaries")
    return {"2.1":[(a,b)],"2.2.1":[(b,m),(c,d)],"2.2.2":[(m,c)],"2.3":[(d,e)]}

def create(doc,toc,paper,code,title,filename,ranges):
    entries=[]
    for level,label,page in toc:
        if level!=2 or not any(start<=page<end for start,end in ranges):continue
        if paper==1 and not re.match(re.escape(code)+r"\.\d+\b",label):continue
        if "checklist" in label.lower():continue
        entries.append((label,page))
    if not entries:raise RuntimeError(f"No contents entries for {code}")
    ncover=math.ceil(len(entries)/17)
    output=fitz.open()
    for i in range(ncover):
        p=output.new_page(width=595,height=842)
        accent=(.16,.40,.56) if paper==1 else (.65,.40,.20)
        p.draw_rect(fitz.Rect(0,0,595,10),color=accent,fill=accent)
        p.insert_text((45,42),"REEPHAM HIGH SCHOOL & COLLEGE  /  COMPUTING",fontname="hebo",fontsize=9,color=(.3,.42,.38))
        p.insert_text((45,82),f"OCR H446  /  PAPER {paper}  /  UNIT {code}",fontname="hebo",fontsize=11,color=accent)
        if p.insert_textbox((45,101,550,185),title,fontname="hebo",fontsize=24,lineheight=1.15,color=(.08,.20,.16))<0:
            p.insert_textbox((45,101,550,185),title,fontname="hebo",fontsize=19,lineheight=1.15,color=(.08,.20,.16))
        p.draw_line((45,200),(548,200),color=(.83,.87,.85))
        p.insert_text((45,230),"CHAPTER CONTENTS",fontname="hebo",fontsize=13,color=(.08,.20,.16))
        p.insert_text((45,254),"Select a topic to jump to its original worked pages.",fontsize=10,color=(.32,.41,.37))
        p.draw_line((45,768),(548,768),color=(.83,.87,.85))
        p.insert_text((45,794),"UNDERSTAND  >  MODEL  >  TRY  >  CHECK",fontname="hebo",fontsize=9,color=(.25,.36,.31))
        p.insert_text((45,810),"Full-paper guide retains further synoptic practice and reference appendices.",fontsize=8,color=(.32,.43,.38))
    mapping={}
    index=ncover
    for start,end in ranges:
        if not (1<=start<end<=len(doc)+1):raise RuntimeError(f"{code}: invalid span {start}-{end}")
        output.insert_pdf(doc,from_page=start-1,to_page=end-2,links=True,annots=True)
        for original in range(start,end):
            mapping[original]=index
            index+=1
    newtoc=[[1,code+" / Contents",1]]
    for i,(title_,page_) in enumerate(entries):
        ip,row=divmod(i,17);p=output[ip];y=286+row*28
        r=fitz.Rect(45,y-14,550,y+8)
        p.draw_rect(r,color=(.86,.9,.87),fill=(.98,.99,.98),width=.5)
        label=title_ if len(title_)<=65 else title_[:62]+"..."
        p.insert_text((54,y),label,fontname="helv",fontsize=10.2,color=(.07,.28,.22))
        p.insert_text((521,y),str(mapping[page_]+1),fontname="hebo",fontsize=9,color=(.31,.43,.37))
        p.insert_link({"kind":fitz.LINK_GOTO,"from":r,"page":mapping[page_]})
        newtoc.append([2,title_,mapping[page_]+1])
    output.set_toc(newtoc)
    OUT.mkdir(parents=True,exist_ok=True)
    dest=OUT/filename
    output.save(dest,garbage=4,deflate=True)
    output.close()
    check=fitz.open(dest)
    if len(check)!=len(mapping)+ncover:raise RuntimeError(f"{code}: output page count wrong")
    if len(check.get_toc())!=len(newtoc):raise RuntimeError(f"{code}: bookmark count wrong")
    if sum(len(check[i].get_links()) for i in range(ncover))!=len(entries):raise RuntimeError(f"{code}: contents links missing")
    for original,idx in mapping.items():
        if doc[original-1].get_text()!=check[idx].get_text():raise RuntimeError(f"{code}: changed source page {original}")
    check.close()
    print(f"PASS {code}: {filename}: {len(mapping)+ncover} pages, {len(entries)} contents links, spans {ranges}")

def main():
    for paper in [1,2]:
        doc=fitz.open(ROOT/FILES[paper])
        toc=doc.get_toc()
        bounds=spans(doc,paper)
        for pp,code,title,name in UNITS:
            if pp==paper:create(doc,toc,paper,code,title,name,bounds[code])
        doc.close()
    assert all((OUT/name).is_file() for _,_,_,name in UNITS)
    print("SUCCESS: nine checked H446 unit PDFs")

if __name__=="__main__":
    main()
