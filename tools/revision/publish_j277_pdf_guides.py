#!/usr/bin/env python3
"""Publish both OCR J277 PDFs and enable indexed feedback only after verification.

Safe to run after uploading both original files to revision/j277/guides/.
Never publishes missing/mismatched PDFs and does not edit quiz banks or lessons.
"""
from __future__ import annotations
from pathlib import Path
import hashlib, json, re, subprocess, sys
import fitz

ROOT=Path(__file__).resolve().parents[2]
GUIDES=ROOT/"revision/j277/guides"
INDEX=GUIDES/"skill-index.json"
HUB=ROOT/"j277-hub.html"
README=GUIDES/"README.md"
AUDIT=ROOT/"docs/audits/j277-guide-publication-20261027.md"

FILES={
    "1":("J277_Paper_1_Revision_Guide_AP1_Aligned.pdf",94,"Computer Systems"),
    "2":("J277_Paper_2_Revision_Guide_AP1_Aligned.pdf",97,"Computational Thinking, Algorithms and Programming"),
}
original=json.loads(INDEX.read_text(encoding="utf-8"))
checks=[]
missing=[]
for key,(filename,expected,subject) in FILES.items():
    path=GUIDES/filename
    if not path.exists():
        missing.append(filename)
        continue
    assert path.stat().st_size>100_000,(filename,"PDF unexpectedly small")
    with path.open("rb") as f: assert f.read(5)==b"%PDF-",(filename,"bad PDF header")
    pdf=fitz.open(path)
    assert not pdf.is_encrypted,(filename,"locked")
    assert len(pdf)==expected,(filename,len(pdf),expected)
    for n in [1,min(4,expected),min(14,expected),min(28,expected)]:
        assert len(pdf[n-1].get_text().strip())>40,(filename,"empty page",n)
    checks.append((key,filename,expected,path.stat().st_size,
                   hashlib.sha256(path.read_bytes()).hexdigest()))

if missing:
    print("J277 PDFs not yet published; nothing changed. Missing: "+", ".join(missing))
    raise SystemExit(0)

assert original["guides"]["1"]["file"]==FILES["1"][0]
assert original["guides"]["2"]["file"]==FILES["2"][0]
assert original["guides"]["1"]["totalPages"]==94
assert original["guides"]["2"]["totalPages"]==97
assert original["skills"],"No existing quiz-to-guide map"
for skill,item in original["skills"].items():
    key=str(item["paper"])
    assert key in FILES,(skill,key)
    assert 1<=item["page"]<=FILES[key][1],(skill,item["page"])
    assert item["lessons"],skill

old=HUB.read_text(encoding="utf-8")
placeholder='''<section class="panel" id="booklet">
  <div class="cards">
    <article class="card">
      <p class="kicker">REVISION BOOKLET</p>
      <h3>GCSE Computer Science</h3>
      <p>Revision booklet coming soon.</p>
      <span class="badge">COMING SOON</span>
    </article>
  </div>
</section>'''
assert placeholder in old or 'id="booklet" data-j277-guides="published"' in old, (
    "Unknown J277 booklet markup; do not risk overwriting a newer design")

if not all(original["guides"][p]["published"] for p in FILES):
    for paper,(fn,expected,subject) in FILES.items():
        original["guides"][paper]["published"]=True
        # Bump only the URL cache query, not skill page numbers.
        original["guides"][paper]["edition"]="AP1-aligned-2026-10-27-uploaded"
    INDEX.write_text(json.dumps(original,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")

def card(paper):
    filename,pages,subject=FILES[paper]
    label=("Paper 1 · Computer Systems" if paper=="1" else "Paper 2 · Computational Thinking and Programming")
    href=("revision/j277/guides/"+filename+"?v="+original["guides"][paper]["edition"])
    return f'''    <article class="card">
      <p class="kicker">{label}</p>
      <h3>Revision Guide · Paper {paper}</h3>
      <p>{pages} pages · theory, worked examples and examination practice.</p>
      <a class="action" href="{href}" target="_blank" rel="noopener" aria-label="Read J277 Paper {paper} revision guide">Read revision guide</a>
      <a href="{href}" download aria-label="Download J277 Paper {paper} revision guide" style="margin-top:10px;color:var(--green-dark);font-weight:700">Download PDF</a>
    </article>'''
newpanel='''<section class="panel" id="booklet" data-j277-guides="published">
  <div class="cards" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));max-width:860px">
'''+card("1")+"\n"+card("2")+'''
  </div>
</section>'''
if placeholder in old:
    HUB.write_text(old.replace(placeholder,newpanel),encoding="utf-8")
elif 'id="booklet" data-j277-guides="published"' in old:
    assert all(x in old for _,(x,_,_) in FILES.items()),"Already published panel lacks a PDF"
else: raise AssertionError("Neither expected J277 hub state was found")

# Generate and verify the only intended resolver from the central skill index.
subprocess.run([sys.executable,str(ROOT/"tools/revision/build_j277_guide_links.py")],cwd=ROOT,check=True)
subprocess.run([sys.executable,str(ROOT/"tools/revision/build_j277_guide_links.py"),"--check"],cwd=ROOT,check=True)
AUDIT.parent.mkdir(parents=True,exist_ok=True)
AUDIT.write_text(
    "# J277 guide publication verification\n\n"
    +"Both original AP1-aligned guides validated before enabling student links.\n\n"
    +"\n".join(
      f"- Paper {p}: {name}, {n} pages, {size} bytes, SHA256 \`{sha}\`."
      for p,name,n,size,sha in checks)
    +f"\n\n- Existing indexed skill destinations: {len(original['skills'])}; all mapped within confirmed PDF page counts.\n"
    +"- Original J277 questions, scoring, feedback thresholds and lesson URLs unchanged.\n"
    +"- Both published flags set together, and the generated resolver checked.\n",
    encoding="utf-8")
print("PASS: both J277 PDFs verified and linked in hub and quiz feedback.")
