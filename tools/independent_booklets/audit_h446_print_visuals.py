#!/usr/bin/env python3
"""Read-only source diagram inventory and PDF quality preflight for H446."""
from pathlib import Path
from datetime import datetime,timezone
from collections import Counter
import json,re,hashlib
from bs4 import BeautifulSoup
import fitz

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'offline/booklets/h446'
SCOPE=('new-learning','i-do','we-do')
IMPORTANT=re.compile(r'(?i)(flip|clock|logic|gate|adder|karnaugh|k.map|circuit|tree|graph|stack|queue|linked|flowchart|recurs|sort|bit|binary|wave|array|memory|diagram|trace|noughts and crosses|CPU)')
def main():
    cat=json.loads((ROOT/'offline/booklets/catalogue.json').read_text())
    records=[]
    for raw,entry in sorted(cat['lessons']['h446'].items(),key=lambda x:int(x[0])):
        n=int(raw)
        if not (1<=n<=160 or 181<=n<=320):continue
        source=ROOT/f'lessons/h446/lesson-{n:03d}/index.html'
        if not source.exists():continue
        soup=BeautifulSoup(source.read_text(encoding='utf-8'),'html.parser')
        diagrams=[];seen=set()
        for phase in SCOPE:
            section=soup.select_one('#'+phase)
            if section is None:continue
            for el in section.select('svg, img'):
                h=hashlib.sha256(str(el).encode()).hexdigest()[:10]
                if h in seen:continue
                seen.add(h)
                cap=el.find_parent('figure')
                caption=cap.select_one('figcaption') if cap else None
                label=(el.get('aria-label') or el.get('alt') or
                    (caption.get_text(' ',strip=True) if caption else '') or
                    '[unlabelled source figure]')
                label=re.sub(r'\s+',' ',label).strip()
                diagrams.append({'stage':phase,'description':label[:200]})
        priority='P0' if any(IMPORTANT.search(z['description']) for z in diagrams) else 'P1' if diagrams else 'none'
        pdfpath=ROOT/entry.get('print_bw','')
        pdfrec={'exists':False}
        if pdfpath.is_file() and pdfpath.suffix=='.pdf':
            with fitz.open(pdfpath) as pdf:
                pdfrec={'exists':True,'pages':len(pdf),
                'embedded_raster_images':sum(len(p.get_images()) for p in pdf),
                'short_pages':[i+1 for i,p in enumerate(pdf) if len(p.get_text().strip())<40]}
        records.append({'lesson':n,'title':entry.get('title',''),
            'priority':priority,'diagrams':diagrams,'pdf':pdfrec,
            'teacher_approved':bool(entry.get('teacher_approved'))})
    count=Counter(x['priority'] for x in records)
    audit={'generated_utc':datetime.now(timezone.utc).isoformat(),
           'total':len(records),'priority_counts':dict(count),'records':records}
    (OUT/'H446_VISUAL_AUDIT.json').write_text(json.dumps(audit,indent=2,ensure_ascii=False)+'\n')
    lines=['# H446 printable booklets — source visual preflight','',
       f"Generated {audit['generated_utc']}",
       f"**PDF catalogue entries inspected:** {len(records)}",
       f"**Teaching-stage diagrams identified:** {sum(bool(x['diagrams']) for x in records)} booklets",
       f"**High-priority source diagram candidates:** {count['P0']} booklets",
       '',
       'This is a source-to-PDF preflight, not a completed visual inspection. The current text-first generator does not import SVG diagrams.',
       'Some figures may be decorative. Priority classification is provisional.',
       '',
       '| Lesson | Title | Source diagrams | Priority | Description |',
       '|---|---|---:|---|---|']
    for n in (16,20,26,28,30,31,181,184,185):
        r=next((x for x in records if x['lesson']==n),None)
        if r is None:continue
        description='; '.join(x['description'] for x in r['diagrams'][:2])[:160].replace('|','/')
        lines.append(f"| {n:03d} | {r['title'].replace('|','/')} | {len(r['diagrams'])} | {r['priority']} | {description} |")
    lines += ['','## Recommended quality-gate sequence','',
       '1. Pilot visual restoration on 020 (stacks/queues), 026 (logic gates), 030 (adders), 031 (flip-flops), and 181 (recursion).',
       '2. Put the relevant diagrams adjacent to their explanations, with high-contrast printable labels.',
       '3. Permit additional A4 pages where necessary; do not remove technical content or writing space.',
       '4. Render and inspect each pilot PDF in black/white and colour before changing live Print links.',
       '5. Apply the improved shared generator to remaining priority lessons. Check all lesson links again.',
       '6. Teacher reviews diagrams, OCR terminology, worked answers and code prior to classroom delivery.',
       '',
       'No lesson or revision-guide content was changed by this audit.',
       'The accompanying JSON lists every diagram by source phase and accessible description.']
    (OUT/'H446_VISUAL_AUDIT.md').write_text('\n'.join(lines)+'\n')
    print(json.dumps({'audited':len(records),'priority':dict(count)},indent=2))
if __name__=='__main__':main()
