"use strict";
const {test} = require('node:test');
const assert = require('node:assert/strict');
const {validateQ1DraftBank, validateFiles} = require('../scripts/do-now/validate-q1-drafts.cjs');

const makePair = () => [
  {schemaVersion:1, course:'test', status:'draft', slot:1, sequenceStatus:'provisional-unverified', lessons:{'002':{
    id:'TEST-L002-Q1', sourceRefs:['TEST-L001'], statement:'Two bits can represent four patterns.',
    correct:true, explanation:'00, 01, 10 and 11.'
  }}},
  {course:'test', lessons:{'002':{questions:[{originalQuestion:'How many patterns in two bits?', originalAnswer:'Four.'}]}}}
];

test('all central Q1 pilot drafts validate against original source', () => {
  const result = validateFiles();
  assert.deepEqual(result.map(item => item.course), ['h446','j277','ks3']);
  assert.deepEqual(result.map(item => item.draftQ1), [25,25,3]);
});
test('Q1 answers must be Booleans', () => {
  const [bank, source] = makePair(); bank.lessons['002'].correct = 'True';
  assert.throws(() => validateQ1DraftBank(bank, source), /Boolean/);
});
test('false Q1 rewrites must correct the claim', () => {
  const [bank, source] = makePair(); bank.lessons['002'].correct = false;
  assert.throws(() => validateQ1DraftBank(bank, source), /corrected fact/);
});
test('the source question must still exist in the preserved snapshot', () => {
  const [bank, source] = makePair(); delete source.lessons['002'];
  assert.throws(() => validateQ1DraftBank(bank, source), /missing preserved source/);
});
test('a mid-course question cannot silently become a diagnostic', () => {
  const [bank, source] = makePair(); bank.lessons['002'].diagnostic = true;
  assert.throws(() => validateQ1DraftBank(bank, source), /entry lesson/);
});
