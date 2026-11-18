// Rebuild just the H446 entries from existing, published Skills and MCQ banks.
// J277 entries and the source learning activities are deliberately untouched.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { runInNewContext } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const file = resolve(root, 'assets/j277-assignment-catalog.json');
const existing = JSON.parse(readFileSync(file, 'utf8'));
const sections = {
  '1-1': 'Processors, Input, Output and Storage',
  '1-2': 'Software and Software Development',
  '1-3': 'Exchanging Data',
  '1-4': 'Data Types, Data Structures and Boolean Algebra',
  '1-5': 'Legal, Moral, Cultural and Ethical Issues',
  '2-1': 'Computational Thinking',
  '2-2-1': 'Programming Techniques',
  '2-2-2': 'Computational Methods',
  '2-3': 'Algorithms'
};

const skill = (id, paper, group, title, subtitle, spec, url, tracking = 'link-only') => ({
  id: `h446-skill-${id}`, type: 'skill', paper, group, title, subtitle,
  spec, url, levels: id === 'p1-convert' ? ['easy','medium','hard'] : [], tracking,
  ...(id === 'p1-convert' ? { sourceKey: 'convert', workType: 'classwork' } : {})
});

// Exact links and titles from exercise/h446/tools.html. A link-only Skill can
// be set as work, but must not imply that an automatic score is recorded.
const skills = [
  skill('p1-convert',1,'Data Representation','Conversion grid','Denary · Binary · Hex','1.4.1(b, e, f)','/exercise/paper1/?skill=convert&course=h446','question'),
  skill('p1-shift',1,'Data Representation','Bit shifting','Logical · Arithmetic','1.4.1','/exercise/h446/binary-skills/?skill=shift'),
  skill('p1-triple',1,'Data Representation','Three-number addition','Columns · Carries of 2','1.4.1','/exercise/h446/binary-skills/?skill=triple'),
  skill('p1-borrow',1,'Data Representation','Binary subtraction','Borrow across zeros','1.4.1','/exercise/h446/binary-skills/?skill=borrow'),
  skill('p1-twos',1,'Data Representation','Two’s complement','Flip bits · Add 1','1.4.1','/exercise/h446/binary-skills/?skill=twos'),
  skill('p1-fixed',1,'Data Representation','Fixed-point numbers','Signed fractions · Q4.4','1.4.1 support','/exercise/h446/binary-skills/?skill=fixed'),
  skill('p1-floating',1,'Data Representation','Floating-point arithmetic','Align · Add · Normalise','1.4.1','/exercise/h446/floating-point/'),
  skill('p1-kmap',1,'Boolean Algebra','Karnaugh maps','Populate · Group · Simplify','1.4.3','/exercise/h446/'),
  skill('p2-bigo',2,'Algorithms','Big O: Complexity Lab','Recognise · Calculate · Compare · Justify','2.3.1(c–d)','/revision/h446/section-2-3/big-o-lab.html'),
  skill('p2-quicksort',2,'Algorithms','Quicksort: Algorithm Lab','Easy · Medium · Hard','2.3.1(f)','/revision/h446/section-2-3/quicksort-lab.html'),
  skill('p2-quicksort-code',2,'Algorithms','Quicksort: Code Lab','Trace · Fix · Test','2.3.1(f)','/revision/h446/section-2-3/quicksort-code-lab.html'),
  skill('p2-shortest-path',2,'Algorithms','Shortest Paths Lab','Graph · Code · Route','2.3.1(f)','/revision/h446/section-2-3/dijkstra-lab.html?mode=graph'),
  skill('p2-astar',2,'Algorithms','A*: Heuristic Lab','Graph · Heuristics · Route','2.3.1(f)','/revision/h446/section-2-3/astar-lab.html?mode=graph'),
  skill('p1-bitwise',1,'Bitwise Operations','Bitwise Mask Lab','AND · OR · XOR','1.4.1(i)','/exercise/skills-review/?skill=bitwise-mask'),
  skill('p1-stack-queue',1,'Data Structures','Stack & Queue Tracer','LIFO · FIFO operations','1.4.2','/exercise/skills-review/?skill=stack-queue'),
  skill('p2-traversal',2,'Algorithms','Tree Traversal Lab','BFS · DFS post-order','2.3.1(e)','/exercise/skills-review/?skill=tree-traversal')
];

const revision = [];
const sourceFiles = [];
for (const [section, group] of Object.entries(sections)) {
  const source = `revision/h446/section-${section}/bank.js`;
  sourceFiles.push('/' + source);
  const text = readFileSync(resolve(root, source), 'utf8');
  const topics = runInNewContext(text + '\nSKILLS', {}, { timeout: 2000 });
  if (!Array.isArray(topics) || !topics.length) throw Error('Empty H446 bank: ' + source);
  for (const topic of topics) {
    const id = `h446-practice-${topic.id}`;
    if (!/^h446-practice-[a-z0-9-]{1,80}$/.test(id)) throw Error('Invalid H446 id: ' + id);
    if (!Array.isArray(topic.questions) || topic.questions.length < 5) throw Error('Incomplete questions: ' + id);
    const isPilot = id === 'h446-practice-141-a';
    revision.push({ id, type: 'practice', paper: section.startsWith('1-') ? 1 : 2,
      group, title: topic.title, spec: topic.spec,
      subtitle: isPilot ? '10-question MCQ · saved as answers are checked' : '10 questions when assigned · score saved on completion',
      url: `/revision/h446/section-${section}/index.html#${topic.section}/${topic.id}`,
      levels: [], tracking: isPilot ? 'question' : 'completion',
      ...(isPilot ? { workType: 'classwork' } : {})
    });
  }
}

const h446 = [...skills, ...revision];
const ids = h446.map(item => item.id);
if (new Set(ids).size !== ids.length) throw Error('Duplicate H446 activity IDs');
if (skills.length !== 16 || revision.length !== 157) throw Error('Unexpected H446 resource count');
const j277 = existing.items.filter(item => item.id.startsWith('j277-'));
if (j277.length !== 95) throw Error('Unexpected J277 catalogue change');
existing.description = 'Assignable J277 activities and published H446 Skills and revision MCQs. H446 scores are tracked per completed quiz where indicated; other Skills are links only.';
existing.generatedFrom = [
  '/exercise/paper1/', '/exercise/paper2/', '/exercise/h446/tools.html',
  ...sourceFiles, '/revision/j277/section-*/bank.js'
];
existing.items = [...h446, ...j277];
writeFileSync(file, JSON.stringify(existing, null, 2) + '\n');
console.log(`Catalogued ${skills.length} H446 Skills, ${revision.length} H446 MCQ sets, ${j277.length} existing J277 activities.`);
