"""Audit quiz feedback destinations against checked-out lesson and PDF sources.
Run with Node.js and PyMuPDF installed. This does not replace a browser journey
or certify the pedagogical quality of every destination.
"""
from pathlib import Path
import subprocess,json,re,csv
import fitz
ROOT=Path(__file__).resolve().parents[2]
js=r'''
const fs=require('fs'),vm=require('vm');let rows=[];
for(const dir of fs.readdirSync('revision/h446').filter(d=>/^section-[12]-/.test(d))){
 const p='revision/h446/'+dir+'/',c={};vm.createContext(c);
 vm.runInContext(fs.readFileSync(p+'bank.js','utf8')+';globalThis.skills=SKILLS;',c);
 const app=fs.readFileSync(p+'app.js','utf8');
 const names=vm.runInNewContext('('+app.match(/const LESSONS=(.*);/)[1]+')');
 for(const t of c.skills)rows.push({app:dir,id:t.id,spec:t.spec,title:t.title,key:t.page,lessons:t.lessons,names});
}
console.log(JSON.stringify(rows));
'''
rows=json.loads(subprocess.check_output(['node','-e',js],cwd=ROOT))
notes={
 '141-j':'Resolved 23 October: dedicated ASCII/Unicode teaching page 178, key 250, aligned with Lesson 008.',
 '143-gates':'Resolved 23 October: dedicated gate symbols, rules and truth tables on page 214, key 251.',
 '143-model':'Resolved 23 October: secure-door problem-to-expression model with a complete 16-row truth table on page 215, key 252.',
 '23-stack':'Priority 2: guide destination introduces the data structures; a dedicated push/pop algorithm example would better match this quiz.',
 '23-queue':'Priority 2: guide destination introduces the data structures; a dedicated enqueue/dequeue algorithm example would better match this quiz.',
 '141-i':'Priority 2: guide destination is an exam-practice page; consider a direct worked example for shifts and each mask operation.',
}
fields=['quiz_app','topic_id','specification','topic','stable_page_key','current_pdf_page','guide_url','lesson_numbers','lesson_phase_urls','example_phase_urls','structural_result','review_note']
audit=[];errors=[];lesson_ids=set();pairs=0
for t in rows:
 paper=int(t['app'].split('-')[1]);data=json.loads((ROOT/f'revision/h446/guides/paper-{paper}-page-map.json').read_text());page=data['page_keys'].get(str(t['key']))
 filename='H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf' if paper==1 else 'H446_Paper_2_REVIEW_READY_2026-10-21.pdf'
 doc=fitz.open(ROOT/'revision/h446/guides'/filename);problems=[]
 if not isinstance(page,int) or not 1<=page<=len(doc):problems.append('Invalid PDF destination')
 lesson_urls=[];example_urls=[]
 for number in t['lessons']:
  lesson_ids.add(number);pairs+=1;base=f'/lessons/h446/lesson-{number:03}/index.html';p=ROOT/base.lstrip('/');s=p.read_text() if p.exists() else ''
  if not s:problems.append(f'Missing lesson {number}')
  for anchor in ['new-learning','i-do']:
   if not re.search(r'''id=["']'''+anchor+r'''["']''',s):problems.append(f'Missing {number}#{anchor}')
  if str(number) not in t['names']:problems.append(f'Missing accessible lesson label {number}')
  lesson_urls.append(base+'#new-learning');example_urls.append(base+'#i-do')
 appdir=ROOT/'revision/h446'/t['app'];html=(appdir/'index.html').read_text();app=(appdir/'app.js').read_text()
 if not 0<=html.find('guide-links.js')<html.find('app.js'):problems.append('Missing lookup script dependency')
 if f'RHSC_GUIDE_LINKS.paper{paper}(active.page)' not in app:problems.append('Feedback bypasses lookup')
 if problems:errors.append((t['id'],problems))
 audit.append([t['app'],t['id'],t['spec'],t['title'],t['key'],page,f'/revision/h446/guides/{filename}?v={data["edition"]}#page={page}',','.join(map(str,t['lessons'])),';'.join(lesson_urls),';'.join(example_urls),'PASS' if not problems else '; '.join(problems),notes.get(t['id'],'No targeted content finding recorded; structural pass is not a teaching-quality rating.')])
path=ROOT/'docs/audits/h446-feedback-destinations-20261023.csv'
with path.open('w',newline='') as f:
 w=csv.writer(f,lineterminator='\n');w.writerow(fields);w.writerows(audit)
print(json.dumps({'topics':len(rows),'paper1':sum(t['app'].startswith('section-1-') for t in rows),'paper2':sum(t['app'].startswith('section-2-') for t in rows),'unique_lessons':len(lesson_ids),'topic_lesson_pairs':pairs,'phase_destinations':pairs*2,'errors':errors,'targeted_content_findings':len(notes)}))
assert not errors,errors
