"use strict";

/* Validate staged Q1 rewrites against their preserved source snapshots.
   Draft content is never published or injected into live lessons by this script. */
const fs = require('node:fs');
const path = require('node:path');

const nonBlank = value => typeof value === 'string' && value.trim().length > 0;
function validateQ1DraftBank(bank, source) {
  if (bank.schemaVersion !== 1 || bank.status !== 'draft' || bank.slot !== 1 || !nonBlank(bank.course))
    throw new Error('Q1 bank must be an unpublished v1 draft for slot 1');
  if (source.course !== bank.course || !source.lessons)
    throw new Error(`${bank.course}: course does not match its legacy source snapshot`);
  if (bank.course !== 'j277' && bank.sequenceStatus !== 'provisional-unverified')
    throw new Error(`${bank.course}: teaching sequence must remain flagged for verification`);
  if (!bank.lessons || !Object.keys(bank.lessons).length)
    throw new Error(`${bank.course}: Q1 draft bank has no lessons`);

  const ids = new Set();
  let trueCount = 0, falseCount = 0;
  for (const [lessonId, q] of Object.entries(bank.lessons)) {
    const loc = `${bank.course} ${lessonId} Q1`;
    const original = source.lessons[lessonId]?.questions?.[0];
    if (!original || !nonBlank(original.originalQuestion) || !nonBlank(original.originalAnswer))
      throw new Error(`${loc}: missing preserved source question or answer`);
    if (!nonBlank(q.id) || ids.has(q.id)) throw new Error(`${loc}: missing/duplicate stable question ID`);
    ids.add(q.id);
    if (!Array.isArray(q.sourceRefs) || !q.sourceRefs.length || !q.sourceRefs.every(nonBlank))
      throw new Error(`${loc}: requires sourceRefs for taught content`);
    if (q.diagnostic && !lessonId.endsWith('001'))
      throw new Error(`${loc}: only an entry lesson can be diagnostic`);
    if (!nonBlank(q.statement) || typeof q.correct !== 'boolean' || !nonBlank(q.explanation))
      throw new Error(`${loc}: requires a True/False statement, Boolean answer and explanation`);
    if (!q.correct && !nonBlank(q.correction))
      throw new Error(`${loc}: false statement requires a corrected fact`);
    if (q.correct) trueCount++; else falseCount++;
  }
  const ratio = trueCount / (trueCount + falseCount);
  if (ids.size >= 10 && (ratio < .3 || ratio > .7))
    throw new Error(`${bank.course}: Q1 true/false distribution needs review (${trueCount}/${ids.size} true)`);
  return {course: bank.course, draftQ1: ids.size, trueCount, falseCount};
}

function validateFiles(root = path.resolve(__dirname, '../..')) {
  const directory = path.join(root, 'data/do-now/q1-drafts');
  const files = fs.readdirSync(directory).filter(file => file.endsWith('.json'));
  if (!files.length) throw new Error('No Q1 draft banks found');
  return files.map(file => {
    const bank = JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8'));
    if (file !== `${bank.course}.json`) throw new Error(`${file}: filename must match course`);
    const sourcePath = path.join(root, 'data/do-now/migration', `${bank.course}-source.json`);
    if (bank.sourceSnapshot !== `data/do-now/migration/${bank.course}-source.json`)
      throw new Error(`${file}: expected the canonical preserved course snapshot`);
    const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
    return validateQ1DraftBank(bank, source);
  });
}

if (require.main === module) {
  for (const summary of validateFiles()) console.log(`DO_NOW_Q1_DRAFT_OK ${JSON.stringify(summary)}`);
}

module.exports = {validateQ1DraftBank, validateFiles};
