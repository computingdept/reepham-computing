// Mechanical, idempotent addition of ten-question assigned sessions.
// Standalone revision continues to deliver alternating five-question sets.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
function change(path, oldText, newText) {
  const full = join(root,path);
  let text = readFileSync(full,'utf8');
  if (text.includes(newText)) return;
  if (!text.includes(oldText)) throw new Error(`Cannot find expected source in ${path}`);
  text = text.replace(oldText,newText);
  writeFileSync(full,text);
}

const h446Sections = ['1-1','1-2','1-3','1-4','1-5','2-1','2-2-1','2-2-2','2-3'];
for (const section of h446Sections) {
  const path = `revision/h446/section-${section}/app.js`;
  if (section === '1-4') {
    change(path,
      "const assignedDataTypes=t.id==='141-a'&&new URLSearchParams(location.search).has('workKey');",
      'const assignedDataTypes=window.RHSCMyWorkH446?.isAssigned(t.id);');
  } else if (section === '1-5') {
    change(path,
      'const selected=t.questions.slice(currentSet*5,currentSet*5+5);',
      'const selected=window.RHSCMyWorkH446?.isAssigned(t.id)?t.questions:t.questions.slice(currentSet*5,currentSet*5+5);');
  } else {
    change(path,
      'questions=shuffled(t.questions.slice(a%2===0?0:5,a%2===0?5:10));',
      'questions=shuffled(window.RHSCMyWorkH446?.isAssigned(t.id)?t.questions:t.questions.slice(a%2===0?0:5,a%2===0?5:10));');
  }
}

const j277App = 'revision/j277/shared/app.js';
change(j277App,
  'questions=shuffled(t.questions.slice(a%2===0?0:5,a%2===0?5:10));',
  'questions=shuffled(window.RHSCMyWorkH446?.isAssigned(t.id)?t.questions:t.questions.slice(a%2===0?0:5,a%2===0?5:10));');
change(j277App,
  'workSaved=reportAssignedRevision(correct,questions.length);',
  'workSaved=reportAssignedRevision(correct,questions.length);window.RHSCMyWorkH446?.reportCompletedQuiz(active.id,correct,questions.length);');

const j277Sections = ['1-1','1-2','1-3','1-4','1-5','1-6','2-1','2-2','2-3','2-4','2-5'];
for (const section of j277Sections) {
  const path = `revision/j277/section-${section}/index.html`;
  const html = readFileSync(join(root,path),'utf8');
  const match = html.match(/<script src="\/revision\/j277\/shared\/app\.js[^\"]*"><\/script>/);
  if (!match) throw new Error(`J277 quiz script not found in ${path}`);
  change(path,match[0],`<script src="/assets/h446-work-report.js?v=20261118-pilot-ten1"></script>\n${match[0]}`);
}
console.log('Ten questions for assigned J277/H446 MCQs; independent rounds still use five.');
