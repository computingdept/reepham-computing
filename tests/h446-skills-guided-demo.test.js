const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const demo=require('../assets/h446-skills-guided-demo.js');

test('all nine live H446 Skills have a separate readable worked example',()=>{
  const ids=['convert','shift','triple','borrow','twos','fixed','floating','kmap','quicksort'];
  assert.deepEqual(demo.skills.sort(),ids.sort());
  for(const id of ids)for(const level of ['easy','medium','hard']){
    for(const width of id==='floating'?[6,8]:[8]){
      const example=demo.get(id,{level,width});
      assert.ok(example.title&&example.task);
      assert.ok(example.steps.length>=3,`${id} ${level} ${width}`);
      for(const step of example.steps){
        assert.equal(step.length,3);
        assert.ok(step.every((x,i)=>typeof x==='string'&&x.length>(i===1?0:4)),`${id}: ${step}`);
      }
    }
  }
});

test('example content checks mathematical and OCR conventions',()=>{
  const examples=['convert','shift','triple','borrow','twos','fixed','floating','kmap','quicksort'];
  const all=examples.map(x=>demo.get(x,{level:'hard',width:8}).steps.flat().join(' ')).join(' ');
  assert.match(all,/11100100 = −28/);
  assert.match(all,/00010101 = 21/);
  assert.match(all,/00011101 = 29/);
  assert.match(all,/11110011/);
  assert.match(all,/1101\.0100/);
  assert.match(all,/6 \+ 2 = 8/);
  assert.match(all,/F = B/);
  assert.match(all,/\[2, 3, 5, 7, 7, 9\]/);
  const six=demo.get('floating',{level:'hard',width:6});
  assert.match(six.steps.flat().join(' '),/011000 \+ 001000 = 0100000 \(7-bit working\)/);
});

test('one shared component selects each of the four H446 source pages',()=>{
  assert.equal(demo.identify('/exercise/h446/binary-skills/'),'binary');
  assert.equal(demo.identify('/exercise/h446/floating-point/'),'floating');
  assert.equal(demo.identify('/exercise/h446/'),'kmap');
  assert.equal(demo.identify('/exercise/h446/index.html'),'kmap');
  assert.equal(demo.identify('/revision/h446/section-2-3/quicksort-lab.html'),'quicksort');
  const code=fs.readFileSync(path.join(root,'assets/h446-skills-guided-demo.js'),'utf8');
  assert.ok(!/localStorage|setItem|\.check\(|\.submit\(|recordCorrect\(/.test(code));
});
