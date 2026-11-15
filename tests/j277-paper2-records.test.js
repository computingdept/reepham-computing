/* Run: node --test tests/j277-paper2-records.test.js */
const {test}=require('node:test');
const assert=require('node:assert/strict');
const engine=require('../exercise/paper2/records.js');

test('All 30 tasks are deterministic and accept their model answers',()=>{
  for(const seed of [1,17,20261115,98765]){
    for(const level of ['easy','medium','hard']){
      for(let i=0;i<10;i++){
        const q=engine.makeQuestion(level,i,seed);
        assert.deepEqual(q,engine.makeQuestion(level,i,seed));
        assert.equal(engine.checkAnswer(q,String(q.expected)).correct,true,`${seed}/${level}/${i}`);
        assert.deepEqual(q.fields,['forename','surname','house']);
        assert.equal(q.values.length,4);
        assert.ok(q.values.every(row=>row.length===3&&row.every(value=>typeof value==='string')));
        assert.ok(q.code.every(line=>!line.includes('player.')),'Use official array-style indexing');
      }
    }
  }
});

test('Easy identifies the row and the field within a record',()=>{
  for(let i=0;i<10;i++){
    const q=engine.makeQuestion('easy',i,34);
    assert.equal(q.type,'cell');
    const [row,col]=q.expected.split(',').map(Number);
    assert.ok(row>=0&&row<4&&col>=0&&col<3);
    assert.match(q.code[1],/print\(pupils\[\d,\d\]\)/);
    assert.equal(engine.checkAnswer(q,`${(row+1)%4},${col}`).correct,false);
    assert.match(q.explanation,new RegExp('column '+col));
  }
});

test('Medium traces named fields through OCR-style indexed updates',()=>{
  for(let i=0;i<10;i++){
    const q=engine.makeQuestion('medium',i,72);
    assert.equal(q.type,'value');
    assert.equal(q.code[0],'array pupils[4,3]');
    assert.ok(q.code.some(line=>line.includes('print(')));
    assert.match(q.explanation,/Output:/);
  }
  assert.equal(engine.makeQuestion('medium',2,72).expected,'Moore');
  assert.equal(engine.makeQuestion('medium',3,72).expected,'Purple');
  assert.equal(engine.makeQuestion('medium',7,72).expected,'Hill');
  const transfer=engine.makeQuestion('medium',5,72);
  assert.equal(transfer.expected,transfer.values[0][1]);
  assert.equal(engine.checkAnswer(transfer,'"'+transfer.expected+'"').correct,true);
});

test('Hard uses genuine iteration over records, with tolerant index-variable marking',()=>{
  for(let i=0;i<10;i++){
    const q=engine.makeQuestion('hard',i,19);
    assert.equal(q.type,'write');
    assert.match(q.model,/for row =/);
    assert.match(q.model,/next row/);
    assert.match(q.model,/pupils\[row,/);
    assert.equal(engine.checkAnswer(q,q.model.toUpperCase()).correct,true);
    assert.equal(engine.checkAnswer(q,q.model.replace(/ = /g,' ← ')).correct,true);
    assert.equal(engine.checkAnswer(q,q.model.replace(/"/g,"'")).correct,true);
    const equivalent=q.model.replace(/\brow\b/g,'i').replace(/pupils\[i,(\d+)\]/g,'pupils[i][$1]');
    assert.equal(engine.checkAnswer(q,equivalent).correct,true,'consistent loop variable and bracket form');
    assert.equal(engine.checkAnswer(q,q.model.replace(/pupils\[row,1\]/g,'pupils[row,2]')).correct,
      q.model.includes('pupils[row,1]')?false:true);
  }
  const allSurnames=engine.makeQuestion('hard',0,1);
  assert.deepEqual(allSurnames.expected.split('\n'),[
    'for row = 0 to 3','    print(pupils[row,1])','next row'
  ]);
  const fullNames=engine.makeQuestion('hard',3,1);
  assert.equal(engine.checkAnswer(fullNames,
    fullNames.model.replace(' + " " + ',' + "" + ')).correct,false,
    'a full-name answer must keep the separating space');
});

test('Invalid questions and missing responses are rejected safely',()=>{
  const q=engine.makeQuestion('easy',0,1);
  assert.deepEqual(engine.checkAnswer(q,''),{complete:false,correct:false});
  assert.throws(()=>engine.makeQuestion('unknown',0,1));
  assert.throws(()=>engine.makeQuestion('easy',-1,1));
  assert.throws(()=>engine.makeQuestion('easy',10,1));
});
