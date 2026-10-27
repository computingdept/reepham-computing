"""Inspect H446 Paper 1 before changing headings or adding terminology."""
from pathlib import Path
import json,re
import fitz
ROOT=Path(__file__).resolve().parents[2]
PDF=ROOT/'revision/h446/guides/H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf'
mapping=json.loads((ROOT/'revision/h446/guides/paper-1-page-map.json').read_text())
doc=fitz.open(PDF)
lines=['# H446 Paper 1 layout inspection — 27 October 2026','',f'Pages: {len(doc)}','']
patterns=[r'\bI\s*DO\b',r'\bWE\s*DO\b',r'\bYOU\s*DO\b',r'KEY\s+(?:TERMS|WORD|VOCAB)',r'WORKED\s+(?:EXAMPLE|SOLUTION)',r'EXAM\s+PRACTICE']
for pat in patterns:
 pages=[i+1 for i,p in enumerate(doc) if re.search(pat,p.get_text(),re.I)]
 lines.append(f'- `{pat}`: {len(pages)} pages; first 35: {pages[:35]}')
lines+=['','## First page of every specification section','']
for s in mapping['sections']:
 n=s['page'];p=doc[n-1];t=p.get_text()
 blocks=[b for b in p.get_text('blocks') if len(b)>4 and str(b[4]).strip() and b[1]>52 and b[3]<p.rect.height-49]
 lowest=max([b[3] for b in blocks],default=0)
 lines+= [f'### {s["spec"]}: {s["title"]} (page {n})',f'Text ends at y={lowest:.0f} of {p.rect.height:.0f}; links={len(p.get_links())}','```text',*t[:1700].replace('```','').splitlines()[:45],'```','']
for n in range(2,27):
 p=doc[n-1]
 lines+= [f'### Detail of page {n}','```text',*p.get_text()[:2100].replace('```','').splitlines()[:62],'```','']
lines+=['## First 45 classroom-label spans']
total=0
for i,p in enumerate(doc):
 for b in p.get_text('dict')['blocks']:
  for l in b.get('lines',[]):
   for span in l['spans']:
    value=span.get('text','')
    if re.search(r'\b(I\s*DO|WE\s*DO|YOU\s*DO)\b',value,re.I):
     lines.append(f'page {i+1}; box {tuple(round(v,1) for v in span["bbox"])}; font {span["font"]} {span["size"]:.1f}; `{value}`');total+=1
     if total>=45:break
   if total>=45:break
  if total>=45:break
 if total>=45:break
out=ROOT/'docs/audits/h446-paper1-layout-inspection-20261027.md'
out.parent.mkdir(parents=True,exist_ok=True);out.write_text('\n'.join(lines)+'\n')
print('Inspected',len(doc),'pages, wrote',out)
