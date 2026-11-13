"use strict";

const {test} = require('node:test');
const assert = require('node:assert/strict');
const {validateLessonBank} = require('../scripts/do-now/validate-standard.cjs');

const makeBank = () => ({
  schemaVersion:1, course:'test-subject', status:'draft', lessons:{'001':{
    title:'Starting point', questions:[
      {id:'001-Q1', type:'true_false', role:'previous_lesson', diagnostic:true,
        sourceRefs:['KS2'], statement:'Two values can be represented by one bit.', correct:true,
        explanation:'A single bit represents 0 or 1.'},
      {id:'001-Q2', type:'mcq', role:'earlier_learning', sourceRefs:['KS2'],
        stem:'Which symbol means addition?', options:['+','-','×','÷'], correctIndex:0,
        explanation:'+ is the addition operator.'},
      {id:'001-Q3', type:'short_answer', role:'earlier_learning', sourceRefs:['KS2'],
        prompt:'How many bits make a byte?', modelAnswer:'8 bits.'},
      {id:'001-Q4', type:'challenge', role:'challenge', sourceRefs:['KS2'],
        prompt:'How many patterns can two bits make?', modelAnswer:'4.'}
    ]
  }}}
);

test('valid reviewed-format draft is accepted without changing live lessons', () => {
  assert.equal(validateLessonBank(makeBank()).questions, 4);
});
test('Q1 must be a Boolean True/False statement', () => {
  const bank = makeBank(); bank.lessons['001'].questions[0].correct = 'True';
  assert.throws(() => validateLessonBank(bank), /Boolean/);
});
test('false statements require an actual correction', () => {
  const bank = makeBank(); bank.lessons['001'].questions[0].correct = false;
  assert.throws(() => validateLessonBank(bank), /correction/);
});
test('MCQ requires four distinct options and a valid answer index', () => {
  const bank = makeBank(); bank.lessons['001'].questions[1].options = ['+', '+', '×', '÷'];
  assert.throws(() => validateLessonBank(bank), /distinct/);
  bank.lessons['001'].questions[1].options = ['+', '-', '×', '÷'];
  bank.lessons['001'].questions[1].correctIndex = 4;
  assert.throws(() => validateLessonBank(bank), /correctIndex/);
});
test('all lessons retain four ordered retrieval roles', () => {
  const bank = makeBank();bank.lessons['001'].questions[2].role = 'challenge';
  assert.throws(() => validateLessonBank(bank), /role earlier_learning/);
});
test('publishing without teacher approval is refused', () => {
  const bank = makeBank();bank.status = 'published';
  assert.throws(() => validateLessonBank(bank), /teacher approval/);
});
