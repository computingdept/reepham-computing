#!/usr/bin/env node
'use strict';

// Snapshot H446's existing Q2 for every active lesson before proposing any
// central-bank MCQ. This is a draft migration tool: no lesson reads its output.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const original = JSON.parse(read('data/do-now/migration/h446-source.json'));
const lessonJs = read('assets/h446-lesson/lesson.js');

function extractJsonObject(label, tail) {
  const start = lessonJs.indexOf('const ' + label + '=');
  if (start < 0) throw Error('Missing H446 origin metadata: ' + label);
  const body = lessonJs.slice(start + ('const ' + label + '=').length);
  const end = body.indexOf(tail);
  if (end < 0) throw Error('Cannot locate end of ' + label);
  return JSON.parse(body.slice(0, end).replace(/;\s*$/, ''));
}
const origins = extractJsonObject('origins', ';\n  const updates=');
const updates = extractJsonObject('updates', ';\n  const taught=');

// These are examples of the agreed short-answer 2x2 style, not a bulk,
// unreviewed rewrite of the 300 authored questions.
const examples = {
  '019': {
    sourceRefs: ['L017'],
    question: 'Which structure groups related named fields?',
    options: ['Record', 'Array', 'Stack', 'Queue'],
    correctIndex: 0,
    explanation: 'A record groups fields by name; an array uses indexed elements.'
  },
  '020': {
    sourceRefs: ['L018'],
    question: 'Which C# collection can grow or shrink?',
    options: ['Array', 'Record', 'List', 'Tuple'],
    correctIndex: 2,
    explanation: 'A List can change length; an array has a fixed length after creation.'
  },
  '024': {
    sourceRefs: ['L020'],
    question: 'Which structure removes its oldest item first?',
    options: ['Stack', 'Queue', 'Tree', 'Graph'],
    correctIndex: 1,
    explanation: 'A queue is FIFO: the first item added is removed first.'
  },
  '026': {
    sourceRefs: ['L017'],
    question: 'Which structure stores values in named fields?',
    options: ['Queue', 'Array', 'Record', 'Stack'],
    correctIndex: 2,
    explanation: 'A record groups related values into named fields.'
  },
  '036': {
    sourceRefs: ['L016'],
    question: 'What identifies an array element’s position?',
    options: ['Value', 'Index', 'Type', 'Size'],
    correctIndex: 1,
    explanation: 'The index identifies the position; the element stores the value.'
  },
  '037': {
    sourceRefs: ['L030'],
    question: 'Which output reports a carry from addition?',
    options: ['Clock', 'Sum', 'State', 'Carry'],
    correctIndex: 3,
    explanation: 'A full adder outputs a Sum bit and a Carry-out bit.'
  },
  '216': {
    sourceRefs: ['L181'],
    question: 'Which case stops a recursive algorithm?',
    options: ['Worst', 'Base', 'General', 'Recursive'],
    correctIndex: 1,
    explanation: 'A base case stops a recursive algorithm from calling itself indefinitely.'
  }
};
const lessonEntries = Object.entries(original.lessons).sort((a, b) => Number(a[0]) - Number(b[0]));
const bank = {
  schemaVersion: 1,
  course: 'h446',
  status: 'draft-never-loaded-by-classroom',
  slot: 2,
  scope: '300 active lessons: Year 12 L001–L160 and Year 13 L181–L320',
  rule: 'Four short 2x2 choices, preferably one word each; retrieves a taught lesson earlier than Q1’s immediate predecessor.',
  originalSource: 'data/do-now/migration/h446-source.json',
  teacherReviewRequired: true,
  lessons: {}
};

for (const [id, lesson] of lessonEntries) {
  const originalQ2 = lesson.questions?.[1];
  if (!originalQ2) throw Error('No original Q2 for L' + id);
  const n = Number(id);
  const origin = origins[n]?.[1] || ({ '036': 'L016', '037': 'L030' })[id] || null;
  const preservedQuestion = updates[n]?.['1']?.[0] && ![30,31,32,33,34].includes(n)
    ? updates[n]['1'][0] : originalQ2.originalQuestion;
  const preservedAnswer = updates[n]?.['1']?.[1] && ![30,31,32,33,34].includes(n)
    ? updates[n]['1'][1] : originalQ2.originalAnswer;
  const existingRefs = origin && /^L\d{3}$/.test(origin) ? [origin] : [];
  const sample = examples[id];
  const draftRefs = sample?.sourceRefs || existingRefs;
  const predecessor = 'L' + String(n - 1).padStart(3, '0');
  const draftHasEarlierSource = draftRefs.some(ref => Number(ref.slice(1)) < n - 1
    && !(n >= 181 && Number(ref.slice(1)) >= 161 && Number(ref.slice(1)) < 181));
  const sourceStatus = sample
    ? 'proposed-source-to-review'
    : !origin ? 'source-not-recorded'
      : origin === 'GCSE' ? 'prior-stage-diagnostic-to-review'
        : origin === predecessor ? 'existing-q2-repeats-immediately-previous-lesson'
          : 'existing-lesson-label-to-review';
  bank.lessons[id] = {
    id: 'H446-L' + id + '-Q2',
    currentLesson: 'L' + id,
    originalLessonFile: lesson.source,
    originalQ2: {
      question: originalQ2.originalQuestion,
      answer: originalQ2.originalAnswer
    },
    effectiveQ2BeforeMigration: {
      question: preservedQuestion,
      answer: preservedAnswer
    },
    existingTaughtIn: origin,
    existingSourceProvenance: origin ? (id === '036' || id === '037'
      ? 'mindmap Q2 label' : 'shared H446 retrieval-origin mapping') : null,
    draft: {
      status: sample ? 'example-needs-teacher-review' : 'mcq-to-author',
      question: sample?.question || '',
      options: sample?.options || [],
      correctIndex: sample?.correctIndex ?? null,
      explanation: sample?.explanation || '',
      taughtIn: draftRefs,
      sourceStatus,
      earlierThanPreviousLesson: draftHasEarlierSource,
      teacherApproved: false
    }
  };
}
if (lessonEntries.length !== 300) throw Error('Expected 300 H446 lessons, found ' + lessonEntries.length);
const out = path.join(root, 'data/do-now/q2-drafts/h446.json');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(bank, null, 2) + '\n');
console.log('Created 300 H446 Q2 draft rows; ' + Object.keys(examples).length +
  ' example MCQs; no classroom files changed.');
