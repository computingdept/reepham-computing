const assert=require('node:assert/strict');
const test=require('node:test');
const {parseNumberedLines}=require('../assets/h446-lesson/exit-three-statements.js');

test('preserves three authored True/False prompts',()=>{
  assert.deepEqual(parseNumberedLines([
    '1. Quicksort chooses a pivot.',
    '2. Both sublists are always sorted after one partition.',
    '3. Quicksort can call itself recursively.'
  ]),[
    'Quicksort chooses a pivot.',
    'Both sublists are always sorted after one partition.',
    'Quicksort can call itself recursively.'
  ]);
});

test('preserves three numbered model answers',()=>{
  assert.deepEqual(parseNumberedLines([
    '1. True — a pivot is chosen.',
    '2. False — the sublists may still need sorting.',
    '3. True — it recursively sorts the sublists.'
  ]),[
    'True — a pivot is chosen.',
    'False — the sublists may still need sorting.',
    'True — it recursively sorts the sublists.'
  ]);
});

test('does not transform incomplete, ambiguous or non-numbered content',()=>{
  assert.equal(parseNumberedLines(['1. One','2. Two']),null);
  assert.equal(parseNumberedLines(['1. One','3. Three','2. Two']),null);
  assert.equal(parseNumberedLines(['One','Two','Three']),null);
});
