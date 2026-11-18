// Mark the existing J277 revision sets as ten-question teacher assignments.
// All bank questions and independent five-question rounds stay unchanged.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const file = join(root, 'assets/j277-assignment-catalog.json');
const data = JSON.parse(readFileSync(file, 'utf8'));
const revision = data.items.filter(item => item.id.startsWith('j277-practice-'));
if (revision.length !== 70) throw new Error('Expected 70 J277 revision topics');
for (const item of revision) {
  item.subtitle = '10 questions when assigned · score saved on completion';
  item.tracking = 'completion';
}
data.description = 'Assignable J277 and H446 Skills and ten-question revision MCQs. Completed assigned quizzes save first-check scores; some Skills remain link-only.';
writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
console.log('Updated 70 J277 MCQ labels and completion-tracking metadata.');
