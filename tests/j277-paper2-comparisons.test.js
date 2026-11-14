/* Run with: node --test tests/j277-paper2-comparisons.test.js */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const engine = require('../exercise/paper2/comparisons.js');

test('all 30 comparison models are correct and repeatable for different seeds', () => {
  for (const seed of [1,79,20261114]) {
    for (const level of ['easy','medium','hard']) {
      for (let index = 0; index < 10; index++) {
        const q = engine.makeQuestion(level,index,seed);
        assert.deepEqual(q,engine.makeQuestion(level,index,seed));
        const answer = q.type === 'write' ? q.model : q.expected;
        assert.equal(engine.checkAnswer(q,answer).correct,true,`${level} ${index} seed ${seed}`);
      }
    }
  }
});

test('easy teaches all six unique OCR comparison operators', () => {
  const q = Array.from({length:10},(_,i)=>engine.makeQuestion('easy',i,77));
  assert.deepEqual([...new Set(q.map(x=>x.expected))].sort(),engine.OPERATORS.slice().sort());
  q.forEach(item=>{
    assert.deepEqual(engine.checkAnswer(item,''),{complete:false,correct:false});
    assert.equal(engine.checkAnswer(item,item.options.find(x=>x!==item.expected)).correct,false);
  });
});

test('medium has five True and five False with correct evaluated comparisons', () => {
  const answers = Array.from({length:10},(_,i)=>engine.makeQuestion('medium',i,8).expected);
  assert.equal(answers.filter(x=>x==='True').length,5);
  assert.equal(answers.filter(x=>x==='False').length,5);
  const q = engine.makeQuestion('medium',4,8);
  assert.equal(engine.checkAnswer(q,q.expected==='True'?'False':'True').correct,false);
});

test('OCR symbols distinguish equality and inequality', () => {
  assert.equal(engine.compare(5,'==',5),true);
  assert.equal(engine.compare(5,'!=',5),false);
  assert.equal(engine.compare(5,'<=',5),true);
  assert.equal(engine.compare(5,'<',5),false);
  assert.equal(engine.compare(5,'>=',5),true);
  assert.equal(engine.compare(5,'>',5),false);
  assert.equal(engine.evaluateCondition('score >= 40',{score:40}),true);
  assert.equal(engine.evaluateCondition('40 <= score',{score:40}),true);
  assert.equal(engine.evaluateCondition('score = 40',{score:40}),null);
});

test('hard allows equivalent reversed comparisons and accessible symbols', () => {
  for (let index=0;index<10;index++) {
    const q=engine.makeQuestion('hard',index,43);
    const other=q.other??String(q.constant);
    const reversed={'>=':'<=','<=':'>=','>':'<','<':'>','==':'==','!=':'!='}[q.op];
    assert.equal(engine.checkAnswer(q,`${other} ${reversed} ${q.variable}`).correct,true,`reversed ${index}`);
    const unicode=q.model.replace('>=','≥').replace('<=','≤').replace('!=','≠');
    assert.equal(engine.checkAnswer(q,unicode).correct,true,`unicode ${index}`);
  }
});

test('hard rejects the wrong boundary, hardcoded truth and unknown variable', () => {
  const q=engine.makeQuestion('hard',0,7);
  assert.equal(engine.checkAnswer(q,'').complete,false);
  assert.equal(engine.checkAnswer(q,'score > 40').correct,false);
  assert.equal(engine.checkAnswer(q,'40 == 40').correct,false);
  assert.equal(engine.checkAnswer(q,'anyScore >= 40').correct,false);
  assert.equal(engine.checkAnswer(q,'true').correct,false);
});

test('invalid levels and indices fail',()=>{
  assert.throws(()=>engine.makeQuestion('extreme',0,1));
  assert.throws(()=>engine.makeQuestion('easy',-1,1));
});
