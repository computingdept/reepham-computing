// Add the same optional assignment-result hook to the nine existing H446
// revision apps, without changing their questions, marking or presentation.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sections = ['1-1','1-2','1-3','1-4','1-5','2-1','2-2-1','2-2-2','2-3'];
const oldEnd = "save();}$('result-spec')";
const newEnd = "save();window.RHSCMyWorkH446?.reportCompletedQuiz(active.id,correct,questions.length);}$('result-spec')";
const bridge = '<script src="/assets/h446-work-report.js?v=20261118-h446-work1"></script>';
for (const section of sections) {
  const directory = resolve(root, `revision/h446/section-${section}`);
  const jsFile = resolve(directory, 'app.js');
  const htmlFile = resolve(directory, 'index.html');
  const app = readFileSync(jsFile, 'utf8');
  const html = readFileSync(htmlFile, 'utf8');
  if (!app.includes(newEnd)) {
    if (app.split(oldEnd).length !== 2) throw Error('Unexpected quiz completion code: ' + section);
    writeFileSync(jsFile, app.replace(oldEnd, newEnd));
  }
  if (!html.includes(bridge)) {
    if (html.split('<script src="app.js').length !== 2) throw Error('Unexpected quiz script tags: ' + section);
    writeFileSync(htmlFile, html.replace('<script src="app.js', bridge + '<script src="app.js'));
  }
}
console.log('Wired nine H446 revision apps to optional completed-quiz reporting.');
