#!/usr/bin/env node
'use strict';

/* Reviewed Q3/Q4 provenance is kept outside lesson pages so every lesson
   can display a consistent TAUGHT label without per-lesson layout changes. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const sourcePath = path.join(root, 'data/do-now/h446-q34-provenance.tsv');
const snapshotPath = path.join(root, 'data/do-now/migration/h446-source.json');
const outputPath = path.join(root, 'data/do-now/h446-q34-sources.json');
const correctionsPath = path.join(root, 'data/do-now/h446-q34-corrections.json');
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
const corrections = JSON.parse(fs.readFileSync(correctionsPath, 'utf8'));
const rows = fs.readFileSync(sourcePath, 'utf8').split(/\r?\n/)
  .map(row => row.trim()).filter(row => row && !row.startsWith('#'));
const lessons = {};
for (const row of rows) {
  const cols = row.split(/\s+/);
  if (cols.length !== 3 || !/^\d{3}$/.test(cols[0])) {
    throw Error(`Invalid provenance row: ${row}`);
  }
  const [id, q3, q4] = cols;
  if (lessons[id] || !snapshot.lessons[id]) throw Error(`Invalid/duplicate H446 lesson ${id}`);
  const entry = {};
  for (const [slot, source] of [['q3', q3], ['q4', q4]]) {
    if (source === 'GCSE') {
      entry[slot] = { priorStage: 'GCSE' };
      continue;
    }
    if (!/^\d{3}$/.test(source) || Number(source) >= Number(id) ||
        !snapshot.lessons[source]) {
      throw Error(`Invalid ${slot} source for H446 ${id}: ${source}`);
    }
    entry[slot] = { sourceRefs: [`L${source}`] };
  }
  lessons[id] = entry;
}
const intended = Object.keys(snapshot.lessons).sort();
const actual = Object.keys(lessons).sort();
if (JSON.stringify(intended) !== JSON.stringify(actual)) {
  throw Error(`Missing or extra H446 lessons; expected ${intended.length}, got ${actual.length}`);
}
for (const [id, slots] of Object.entries(corrections)) {
  if (!lessons[id]) throw Error(`Correction references missing lesson ${id}`);
  for (const [slot, replacement] of Object.entries(slots)) {
    if (!['q3', 'q4'].includes(slot) || !replacement ||
        typeof replacement.question !== 'string' || !replacement.question.trim() ||
        typeof replacement.answer !== 'string' || !replacement.answer.trim()) {
      throw Error(`Invalid correction for H446 ${id} ${slot}`);
    }
    lessons[id][slot].replacement = replacement;
  }
}
const data = {
  schemaVersion: 1,
  course: 'h446',
  status: 'reviewed',
  scope: 'Do Now Q3/Q4 source labels and audited retrieval corrections. Q1, Q2, navigation and lesson styles remain independently authored.',
  source: 'data/do-now/h446-q34-provenance.tsv',
  corrections: 'data/do-now/h446-q34-corrections.json',
  lessons
};
const json = JSON.stringify(data, null, 2) + '\n';
if (process.argv.includes('--check')) {
  if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, 'utf8') !== json) {
    throw Error('H446 Q3/Q4 bank is stale; regenerate with build-h446-q34-sources.cjs');
  }
} else {
  fs.writeFileSync(outputPath, json);
}
const prior = Object.values(lessons).flatMap(x => [x.q3, x.q4])
  .filter(x => x.priorStage).length;
console.log(`H446_Q34_SOURCE_OK ${JSON.stringify({lessons:intended.length, sources:intended.length * 2, priorGCSE:prior})}`);
