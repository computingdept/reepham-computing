"""Read-only H446 guide inspection for terminology and Paper 2 revision structure."""
from pathlib import Path
import fitz,re,json
R=Path(__file__).resolve().parents[2];G=R/'revision/h446/guides'
p1=fitz.open(G/'H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf')
p2=fitz.open(G/'H446_Paper_2_REVIEW_READY_2026-10-21.pdf')
m1=json.loads((G/'paper-1-page-map.json').read_text())
m2=json.loads((G/'paper-2-page-map.json').read_text())
out=['# H446 guide structural inspection','',f'Paper 1: {len(p1)} pages; Paper 2: {len(p2)} pages','']
out+=['## Paper 1: Existing dedicated terminology tables','']
candidates=[]
for i,page in enumerate(p1):
  s=page.get_text()
  if ('THEORY / KEY TERMINOLOGY' in s or 'Essential key vocabulary' in s) and i+1 not in {p['page'] for p in m1['added_pages'] if p.get('key',0)>=254}:
    candidates.append(i+1)
out+=['Legacy terminology pages: '+repr(candidates),'']
for n in candidates:
  page=p1[n-1]
  out += [f'### Page {n}',page.get_text()[:2450],'','Relevant spans:']
  for b in page.get_text('dict')['blocks']:
    for line in b.get('lines',[]):
      for span in line['spans']:
        s=span['text'].strip()
        if 30 < span['bbox'][0] < 260 and len(s)<80 and 90<span['bbox'][1]<750:
          out.append(f'- {s!r}: {tuple(round(x,1) for x in span["bbox"])} font={span["font"]} size={span["size"]:.1f}')
  out+=['']
out+=['## Paper 2 sections and labels','']
for ix,s in enumerate(m2['sections']):
  n=s['page']
  end=m2['sections'][ix+1]['page'] if ix+1<len(m2['sections']) else len(p2)+1
  body='\n'.join(p.get_text() for p in [p2[i] for i in range(n-1,end-1)])
  counts={q:len(re.findall(q,body,re.I)) for q in [r'\bI\s*DO\b',r'\bWE\s*DO\b',r'\bYOU\s*DO\b',r'KEY\s+(?:WORDS|TERMS|VOCABULARY|TERMINOLOGY)',r'EXAM\s+PRACTICE',r'WORKED\s+EXAMPLE',r'GUIDED\s+(?:CHECK|RESPONSE|EXPLANATION)']}
  out+=[f'### {s["spec"]} — {s["title"]}, pp.{n}–{end-1}', 'Counts: '+str(counts), 'First-page text:',p2[n-1].get_text()[:2300],'']
out+=['## Paper 2: all current classroom label occurrences','']
for i,p in enumerate(p2):
  for block in p.get_text('dict')['blocks']:
    for line in block.get('lines',[]):
      for sp in line['spans']:
        t=sp['text']
        if re.search(r'\b(I\s*DO|WE\s*DO|YOU\s*DO)\b',t,re.I):
          out.append(f"- page {i+1}, box {tuple(round(q,1) for q in sp['bbox'])}, font {sp['font']} {sp['size']:.1f}: {t!r}")
out+=['','## Paper 2: vocabulary page candidates','']
for i,p in enumerate(p2):
  if re.search(r'key\s+(?:words|terms|vocabulary|terminology)',p.get_text(),re.I):
    out+= [f'- Page {i+1}: {p.get_text()[:700]!r}']
path=R/'docs/audits/h446-guide-terminology-paper2-inspection-20261027.md'
path.write_text('\n'.join(out)+'\n')
print(f'PASS inspection: Paper 1 {len(candidates)} legacy tables; Paper 2 {len(p2)} pages; {len(out)} report lines')
