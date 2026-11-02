#!/usr/bin/env python3
"""Three source-faithful H446 print compaction pilots; live links never change.

Repack consecutive figure-only PDF pages at 1:1 original scale, by cropping
repeated generic header/footer. Original questions and models are retained.
"""
from __future__ import annotations
import io,json,re,hashlib
from collections import Counter
from pathlib import Path
import fitz
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/"offline/booklets/h446"
CAT=ROOT/"offline/booklets/catalogue.json"
NUMBERS=(106,218,29)
H=842.0
W=595.3

def stage(text):
    m=re.search(r"(?im)^\s*(New Learning|I Do|We Do(?: Check)?)\s*·\s*original lesson diagrams",text)
    if not m:return None
    s=m.group(1).lower()
    return "we-do-check" if "check" in s else "new-learning" if "new" in s else "i-do" if "i do" in s else "we-do"

def phasepositions(doc):
    texts=[p.get_text() for p in doc]
    def first(pattern):
        return next((i for i,t in enumerate(texts) if re.search(pattern,t,re.M|re.I)),-1)
    return {"try":first(r"^\s*(?:Guided\s*1\s*[-—·:]\s*TRY|WE DO\s*[—·-]\s*TRY)"),
            "you":first(r"^\s*YOU DO\s*[-—·/]"),
            "exit":first(r"^\s*EXIT TICKET\s*(?:[/·—-]|$)"),
            "check":first(r"^\s*(?:Guided\s*1\s*[-—·:]\s*CHECK|WE DO\s*[—·-]\s*SOURCE CHECK)")}

def image_sig(doc):
    signatures=Counter()
    for p in doc:
        for entry in p.get_images(full=True):
            xref=entry[0]
            pix=fitz.Pixmap(doc,xref)
            sha=hashlib.sha256(pix.samples).hexdigest()
            for box in p.get_image_rects(xref):
                signatures[(sha,round(box.width,1),round(box.height,1))]+=1
    return signatures

def panel_crop(page):
    """Find source artwork/captions; skip repetitive print title and footer."""
    cutoff=H-78
    lower=[]
    for block in page.get_text("dict")["blocks"]:
        x0,y0,x1,y1=block["bbox"]
        if y1>112 and y0<cutoff:
            lower.append(min(cutoff,y1))
    for image in page.get_images(full=True):
        for box in page.get_image_rects(image[0]):
            if box.y0<cutoff:
                lower.append(min(cutoff,box.y1))
    if not lower:raise ValueError("No figure/caption region found")
    bottom=min(cutoff,max(lower)+12)
    if bottom<=130:raise ValueError("Empty panel crop")
    return fitz.Rect(0,108,page.rect.width,bottom)

def compact(source,number):
    old=fitz.open(source)
    captions=[p.get_text() for p in old]
    runs=[]
    index=0
    while index<len(old):
        phase=stage(captions[index])
        if not phase:
            index+=1;continue
        end=index+1
        while end<len(old) and stage(captions[end])==phase:
            end+=1
        runs.append((index,end,phase))
        index=end
    original_images=image_sig(old)
    replacement={}
    notes=[]
    for start,end,phase in runs:
        panels=[(i,panel_crop(old[i])) for i in range(start,end)]
        chunks=[];current=[];height=0
        for i,rect in panels:
            extent=rect.height+12
            if current and height+extent>695:
                chunks.append(current);current=[];height=0
            current.append((i,rect))
            height+=extent
        if current:chunks.append(current)
        # One source panel must always fit. Larger ones stay original.
        if any(sum(rect.height+12 for _,rect in group)>695 for group in chunks):
            notes.append({"phase":phase,"original":end-start,"compact":end-start,"reason":"panel too tall"})
            continue
        if len(chunks)>=end-start:
            notes.append({"phase":phase,"original":end-start,"compact":end-start,"reason":"no safe two-panel fit"})
            continue
        result=fitz.open()
        for group in chunks:
            sheet=result.new_page(width=old[0].rect.width,height=old[0].rect.height)
            sheet.draw_rect(fitz.Rect(0,0,sheet.rect.width,9),color=None,fill=(.12,.26,.21))
            sheet.insert_text((49,33),f"RHS COMPUTING · OCR H446 · LESSON {number:03d}",
                              fontsize=9.0,fontname="helv")
            sheet.insert_text((49,53),f"{phase.upper().replace('-',' ')} · original source diagrams",
                              fontsize=11.4,fontname="hebo")
            cursor=68
            for source_index,clip in group:
                target=fitz.Rect(0,cursor,clip.width,cursor+clip.height)
                sheet.show_pdf_page(target,old,source_index,clip=clip,
                                    keep_proportion=False,overlay=True)
                cursor+=clip.height+12
            if cursor>780:raise ValueError(f"Source diagram clipping risk: {phase} y={cursor}")
        replacement[start]=(end,result)
        notes.append({"phase":phase,"original":end-start,"compact":len(result),
                      "saved":end-start-len(result),"panel_heights":[round(v.height) for _,v in panels]})
    merged=fitz.open()
    try:
        idx=0
        while idx<len(old):
            if idx in replacement:
                end,pdf=replacement[idx]
                merged.insert_pdf(pdf)
                idx=end
            else:
                merged.insert_pdf(old,from_page=idx,to_page=idx)
                idx+=1
        if len(merged)>=len(old):
            raise ValueError("No unscaled page saving; original remains best")
        # Verify every old non-diagram page copied verbatim and in original order.
        expected=[text for text in captions if stage(text) is None]
        actual=[p.get_text() for p in merged if stage(p.get_text()) is None and
                "original source diagrams" not in p.get_text().lower()]
        if expected!=actual:
            raise ValueError(f"Non-figure page text mismatch: old={len(expected)} new={len(actual)}")
        before,after=image_sig(old),image_sig(merged)
        if before!=after:
            raise ValueError(f"Embedded figure raster or printed dimensions changed: "+
                             f"missing={sum((before-after).values())},added={sum((after-before).values())}")
        phases=phasepositions(merged)
        if not (0<=phases["try"]<phases["you"]<phases["exit"]<phases["check"]):
            raise ValueError(f"Source CHECK sequence changed: {phases}")
        # Rewriting page number in the reserved footer does not touch content.
        for i,page in enumerate(merged):
            sheet=page.rect
            page.draw_rect(fitz.Rect(sheet.width-120,sheet.height-52,sheet.width-32,sheet.height-17),
                           color=None,fill=(1,1,1),overlay=True)
            page.insert_text((sheet.width-98,sheet.height-32),f"{i+1} / {len(merged)}",
                             fontsize=8,fontname="helv",overlay=True)
        return merged,len(old),notes
    finally:
        old.close()
        for end,pdf in replacement.values():pdf.close()

def preview(number,old_path,new_path):
    def get(pdf_path):
        previews=[]
        with fitz.open(pdf_path) as pdf:
            sel=[i for i,p in enumerate(pdf) if stage(p.get_text())]
            for i in sel[:4]:
                pix=pdf[i].get_pixmap(matrix=fitz.Matrix(.6,.6),alpha=False)
                im=Image.frombytes("RGB",(pix.width,pix.height),pix.samples)
                previews.append((i+1,im))
        return previews
    a=get(old_path);b=get(new_path)
    output=Image.new("RGB",(1100,1200),"#eeeeeb")
    draw=ImageDraw.Draw(output)
    draw.text((22,12),f"Current H446 {number:03d} PDF",fill="#111111")
    draw.text((558,12),f"Compact pilot H446 {number:03d} PDF",fill="#111111")
    for offset,panels in ((0,a),(550,b)):
        for i,(num,im) in enumerate(panels):
            im.thumbnail((260,510))
            x=15+offset+(i%2)*270;y=40+(i//2)*580
            output.paste(im,(x,y))
            draw.text((x,y+im.height+5),f"Page {num}",fill="#222222")
    path=OUT/f"H446_Lesson_{number:03d}_WEDO_COMPACT_PILOT_comparison.png"
    output.save(path)
    return path.relative_to(ROOT).as_posix()

def main():
    cat=json.loads(CAT.read_text(encoding="utf-8"))["lessons"]["h446"]
    report={"scope":"PDF pilot only; no live Print links changed","results":[]}
    for n in NUMBERS:
        entry=cat[str(n)]
        row={"lesson":n,"status":"deferred","original":entry["a4_pages"]}
        artifacts=[]
        try:
            variants={}
            for mode in ("bw","colour"):
                old=ROOT/entry["print_bw" if mode=="bw" else "learn_colour"]
                result,original,notes=compact(old,n)
                path=OUT/f"H446_Lesson_{n:03d}_WEDO_COMPACT_PILOT_{mode.upper()}_A4.pdf"
                result.save(path,garbage=4,deflate=True)
                total=len(result);result.close()
                artifacts.append(path)
                variants[mode]={"old":original,"pages":total,"notes":notes,
                                "a4":path.relative_to(ROOT).as_posix()}
            if variants["bw"]["pages"]!=variants["colour"]["pages"]:
                raise ValueError("Colour and B&W page lengths disagree")
            from render_pdf import impose_a3
            for mode in ("bw","colour"):
                a4=OUT/f"H446_Lesson_{n:03d}_WEDO_COMPACT_PILOT_{mode.upper()}_A4.pdf"
                a3=OUT/f"H446_Lesson_{n:03d}_WEDO_COMPACT_PILOT_{mode.upper()}_A3_Booklet.pdf"
                sheets=impose_a3(a4,a3);artifacts.append(a3)
                assert sheets==((variants[mode]["pages"]+3)//4)*2
                variants[mode]["a3"]=a3.relative_to(ROOT).as_posix()
                variants[mode]["sheets"]=sheets
            png=preview(n,ROOT/entry["print_bw"],OUT/f"H446_Lesson_{n:03d}_WEDO_COMPACT_PILOT_BW_A4.pdf")
            artifacts.append(ROOT/png)
            row.update({"status":"pilot_generated","pages":variants["bw"]["pages"],
                        "saved":variants["bw"]["old"]-variants["bw"]["pages"],
                        "variants":variants,"preview":png})
        except Exception as e:
            for path in artifacts:
                if path.is_file():path.unlink()
            row["reason"]=f"{type(e).__name__}: {str(e)[:260]}"
        print(row,flush=True)
        report["results"].append(row)
    dest=OUT/"H446_WEDO_COMPACT_THREE_PILOTS.json"
    dest.write_text(json.dumps(report,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    md=["# H446 print · three compact diagram pilots","",
        "These are **teacher-review experiments**, not replacements for live Print links.",
        "Every successful experiment must keep identical figure raster pixels and printed dimensions, all original non-diagram pages, and the existing guided-question/Exit/CHECK sequence.",
        "","| Lesson | Original | Compact | Saving | Outcome |","|---|---:|---:|---:|---|"]
    for r in report["results"]:
        md.append(f"| {r['lesson']:03d} | {r['original']} | {r.get('pages','—')} | {r.get('saved','—')} | {r['status']} {r.get('reason','')} |")
    md+=["","No original PDF, GitHub catalogue, lesson, or teacher-approval flag is modified.",""]
    (OUT/"H446_WEDO_COMPACT_THREE_PILOTS.md").write_text("\n".join(md),encoding="utf-8")

if __name__=="__main__":
    main()
