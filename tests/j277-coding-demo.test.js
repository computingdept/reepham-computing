const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'assets', 'j277-coding-demo.js'), 'utf8');

function mountDemo(skill) {
  class Node {
    constructor(tag = 'div') {
      this.tagName = tag.toUpperCase();
      this.children = [];
      this.attributes = {};
      this.listeners = {};
      this.className = '';
      this.hidden = false;
      this.disabled = false;
      this.textContent = '';
      this.scrollTop = 0;
      this.scrollHeight = 1000;
      this.classList = {
        toggle: (name, enabled) => {
          const names = new Set(this.className.split(' ').filter(Boolean));
          if (enabled) names.add(name); else names.delete(name);
          this.className = [...names].join(' ');
        },
        add: name => { this.className += ' ' + name; }
      };
    }
    append(...nodes) { this.children.push(...nodes); }
    replaceChildren(...nodes) { this.children = [...nodes]; }
    after(node) { this.insertedSibling = node; }
    setAttribute(name, value) { this.attributes[name] = value; }
    removeAttribute(name) { delete this.attributes[name]; }
    addEventListener(name, callback) { this.listeners[name] = callback; }
    click() { if (this.listeners.click) this.listeners.click(); }
    focus() { this.focused = true; }
    querySelector(selector) { return selector === '.practice-name' ? title : null; }
  }
  const title = new Node();
  const practice = new Node();
  const listeners = {};
  const document = {
    createElement: tag => new Node(tag),
    querySelector: selector => selector === 'main .practice' ? practice : null,
    addEventListener: (key, callback) => { listeners[key] = callback; }
  };
  const window = { scrollY: 370, scrollTo: (_, y) => { window.scrollY = y; } };
  const timers = new Map();
  let timerId = 0;
  const context = {
    document, window, location: { pathname: '/exercise/paper2/' + skill + '/' },
    setInterval: callback => { timers.set(++timerId, callback); return timerId; },
    clearInterval: id => { timers.delete(id); }
  };
  vm.runInNewContext(source, context);
  return { title, practice, listeners, window, timers };
}

function find(root, name) {
  if (root.className.split(' ').includes(name)) return root;
  for (const child of root.children) {
    const found = find(child, name);
    if (found) return found;
  }
  return null;
}

for (const skill of ['variables', 'data-types', 'casting', 'operators', 'comparisons', 'sequence', 'selection', 'for-loops', 'while-until', 'array-1d', 'array-2d', 'records', 'files', 'sql', 'strings', 'functions']) {
  test(`${skill}: always-available demo opens, traces correct code lines, and returns without losing practice`, () => {
    const ui = mountDemo(skill);
    const launch = find(ui.title, 'skill-demo-open');
    assert.ok(launch, 'a demo launch button is visible on the skill');
    assert.equal(launch.hidden, false);
    const demo = ui.practice.insertedSibling;
    assert.equal(demo.hidden, true);
    const traceTable = find(demo, 'skill-demo-table');
    const code = find(demo, 'skill-demo-source');
    const status = find(demo, 'skill-demo-status');
    const controls = find(demo, 'skill-demo-controls');
    const [play, step, reset] = controls.children;
    const back = find(demo, 'skill-demo-back');

    ui.practice.studentAnswer = 'in progress';
    launch.click();
    assert.equal(ui.practice.hidden, true);
    assert.equal(demo.hidden, false);
    assert.equal(ui.window.scrollY, 0);
    assert.equal(launch.attributes['aria-expanded'], 'true');
    step.click();
    assert.ok(traceTable.children[1].children.length >= 1);
    const firstRow = traceTable.children[1].children[0];
    const firstLine = Number(firstRow.children[0].textContent);
    assert.equal(code.children[firstLine - 1].attributes['aria-current'], 'step');
    assert.match(status.textContent, /^Line \d\d/);
    reset.click();
    assert.equal(traceTable.children[1].children.length, 0);
    play.click();
    assert.ok(ui.timers.size === 0 || ui.timers.size === 1);
    back.click();
    assert.equal(ui.timers.size, 0, 'leaving a playing demo pauses it');
    assert.equal(ui.practice.hidden, false);
    assert.equal(demo.hidden, true);
    assert.equal(ui.window.scrollY, 370);
    assert.equal(ui.practice.studentAnswer, 'in progress');
    assert.equal(launch.attributes['aria-expanded'], 'false');
    launch.click();
    assert.equal(traceTable.children[1].children.length, 0, 'demo starts at step zero on reopening');
    let count = 0;
    while (!step.disabled && count++ < 100) step.click();
    assert.ok(count < 100, 'demo reaches a final step');
    assert.ok(traceTable.children[1].children.length > 1);
    for (const row of traceTable.children[1].children) {
      const line = Number(row.children[0].textContent);
      assert.ok(line > 0 && line <= code.children.length, 'every trace row points at a real source line');
    }
    assert.equal(find(demo, 'skill-demo-result').hidden, false);
  });
}

test('FOR Demo visibly returns from NEXT to FOR before repeating the body',()=>{
  const guided=require('../assets/j277-skills-guided-examples.js');
  const ui=mountDemo('for-loops');
  ui.window.RHSSkillsDemoProvider=()=>guided.make('for-loops',{level:'medium'});
  find(ui.title,'skill-demo-open').click();
  const demo=ui.practice.insertedSibling;
  const button=find(demo,'skill-demo-controls').children[1];
  const badge=find(demo,'skill-demo-loop-back');
  const code=find(demo,'skill-demo-source');
  for(let i=0;i<4;i++)button.click();
  assert.equal(badge.hidden,false);
  assert.match(badge.textContent,/NEXT returns to FOR · line 02/);
  assert.match(code.children[1].className,/is-loop-target/);
  button.click();
  assert.equal(badge.hidden,true);
  assert.equal(code.children[1].attributes['aria-current'],'step');
});

test('Selection demo highlights only the executed branch and shows skipped line clearly',()=>{
  const guided=require('../assets/j277-skills-guided-examples.js');
  for(const level of ['easy','medium','hard']){
    const ui=mountDemo('selection');
    ui.window.RHSSkillsDemoProvider=()=>guided.make('selection',{level});
    find(ui.title,'skill-demo-open').click();
    const demo=ui.practice.insertedSibling;
    const code=find(demo,'skill-demo-source');
    const [play,step,reset]=find(demo,'skill-demo-controls').children;
    assert.match(code.children[2].children[1].textContent,/print/,'full code visible before tracing');
    step.click();step.click();
    assert.match(code.children[2].className,/is-skipped/,'false branch visibly skipped');
    assert.ok(!code.children[2].attributes['aria-current'],'skipped line is never active');
    step.click();
    assert.equal(code.children[3].attributes['aria-current'],'step','control jumps from IF to ELSE/ELSEIF');
    assert.ok(!code.children[2].attributes['aria-current']);
    reset.click();
    assert.ok(!code.children[2].className.includes('is-skipped'),'reset removes skip marking');
    assert.equal(code.children[2].children[1].textContent,level==='medium'?'    print("High")':'    print("Eligible")');
    assert.equal(play.disabled,false);
  }
});

test('WHILE and UNTIL demos highlight the return only when another check is due',()=>{
  const guided=require('../assets/j277-skills-guided-examples.js');
  for(const mode of ['while','do']){
    const ui=mountDemo('while-until');
    ui.window.RHSSkillsDemoProvider=()=>guided.make('while-until',{level:'medium',mode});
    find(ui.title,'skill-demo-open').click();
    const demo=ui.practice.insertedSibling;
    const step=find(demo,'skill-demo-controls').children[1];
    const cue=find(demo,'skill-demo-loop-back');
    for(let i=0;i<5;i++)step.click();
    assert.equal(cue.hidden,false,mode);
    assert.match(cue.textContent,/line 02/);
    step.click();assert.equal(cue.hidden,true,mode);
    while(!step.disabled)step.click();
    assert.equal(cue.hidden,true,'completed loop has no return cue');
    assert.match(find(demo,'skill-demo-result').textContent,/1, 2, 3/);
  }
});

test('SQL demo uses a question-specific similar example and hides forthcoming lines', () => {
  const ui = mountDemo('sql');
  ui.window.RHSSkillsDemoProvider = () => ({
    title: 'SQL Builder', codeLabel: 'Books table',
    task: 'Similar example: Show the Title of every book.',
    columns: ['Clause', 'What it does'],
    lines: ['SELECT Title', 'FROM Books'],
    steps: [[1, 'SELECT', 'Title', 'Pick the column.'], [2, 'FROM', 'Books', 'Pick the table.']],
    end: 'No WHERE is needed because every row is included.'
  });
  find(ui.title, 'skill-demo-open').click();
  const demo = ui.practice.insertedSibling;
  const code = find(demo, 'skill-demo-source');
  assert.equal(code.children.length, 2);
  assert.ok(code.children[0].className.includes('is-upcoming'));
  assert.equal(code.children[0].children[1].textContent, 'SELECT …');
  assert.match(find(demo, 'skill-demo-heading').children[1].textContent, /every book/);
  const controls = find(demo, 'skill-demo-controls');
  controls.children[1].click();
  assert.ok(!code.children[0].className.includes('is-upcoming'));
  assert.equal(code.children[0].children[1].textContent, 'SELECT Title');
  assert.ok(code.children[1].className.includes('is-upcoming'));
  assert.equal(code.children[1].children[1].textContent, 'FROM …');
  controls.children[1].click();
  assert.ok(!code.children[1].className.includes('is-upcoming'));
});

test('File Handling demo swaps in a guided example without changing practice', () => {
  const ui=mountDemo('files');
  ui.practice.studentAnswer='myChosenFile = open("names.txt")';
  ui.window.RHSSkillsDemoProvider=()=>({
    title:'File Handling',codeLabel:'scores.txt',traceTitle:'Build the command',
    task:'Similar example: Open scores.txt and save its reference.',
    columns:['Action','Effect'],progressive:true,
    lines:['saved = open("scores.txt")'],placeholders:['Open …'],
    steps:[[1,'Open','saved','Any valid variable name can store the file reference.']],
    end:'saved contains the file reference.'
  });
  find(ui.title,'skill-demo-open').click();
  const demo=ui.practice.insertedSibling,code=find(demo,'skill-demo-source');
  assert.equal(code.children[0].children[1].textContent,'Open …');
  assert.equal(find(demo,'skill-demo-trace-title').textContent,'Build the command');
  assert.equal(find(demo,'skill-demo-table').children[0].children[0].children[2].textContent,'Effect');
  find(demo,'skill-demo-controls').children[1].click();
  assert.equal(code.children[0].children[1].textContent,'saved = open("scores.txt")');
  find(demo,'skill-demo-back').click();
  assert.equal(ui.practice.studentAnswer,'myChosenFile = open("names.txt")');
});

test('File Handling reference shows all source lines and file changes in two selectable demos',()=>{
  const engine=require('../exercise/paper2/files.js');
  const ui=mountDemo('files');
  ui.practice.studentAnswer='draft answer';
  ui.window.RHSSkillsDemoProvider=()=>engine.makeDemo(engine.makeQuestion('easy',3,31));
  find(ui.title,'skill-demo-open').click();
  const demo=ui.practice.insertedSibling;
  const tabs=find(demo,'skill-demo-variants');
  const code=find(demo,'skill-demo-source');
  const file=find(demo,'skill-demo-file-preview');
  const contents=find(demo,'skill-demo-file-lines');
  const state=find(demo,'skill-demo-file-heading');
  const [play,step,reset]=find(demo,'skill-demo-controls').children;
  assert.equal(tabs.hidden,false);
  assert.equal(tabs.children.length,2);
  assert.equal(tabs.children[0].attributes['aria-pressed'],'true');
  assert.equal(code.children.length,5);
  assert.equal(code.children[0].children[1].textContent,'myFile = open("scores.txt")',
    'the whole reusable program remains visible');
  assert.equal(contents.children.length,3);
  assert.equal(state.children[1].textContent,'Closed');
  step.click();step.click();step.click();step.click();
  assert.equal(contents.children.length,4);
  assert.equal(contents.children[3].textContent,'Tara');
  assert.match(contents.children[3].className,/is-changed/);
  step.click();
  assert.equal(state.children[1].textContent,'Closed');
  reset.click();
  assert.equal(contents.children.length,3);
  tabs.children[1].click();
  assert.equal(tabs.children[0].attributes['aria-pressed'],'false');
  assert.equal(tabs.children[1].attributes['aria-pressed'],'true');
  assert.equal(code.children.length,4);
  assert.equal(state.children[1].textContent,'Not created');
  assert.equal(contents.children[0].textContent,'(no file yet)');
  step.click();
  assert.equal(state.children[1].textContent,'Closed');
  step.click();step.click();step.click();
  assert.equal(contents.children[0].textContent,'Passed');
  assert.equal(state.children[1].textContent,'Closed');
  play.click();
  find(demo,'skill-demo-back').click();
  assert.equal(ui.practice.studentAnswer,'draft answer');
  assert.equal(ui.timers.size,0);
});

test('Medium File Handling demo revisits WHILE and stops reading at end of file',()=>{
  const engine=require('../exercise/paper2/files.js');
  const ui=mountDemo('files');
  ui.practice.studentAnswer='my answer';
  ui.window.RHSSkillsDemoProvider=()=>engine.makeDemo(engine.makeQuestion('medium',8,31));
  find(ui.title,'skill-demo-open').click();
  const demo=ui.practice.insertedSibling;
  const tabs=find(demo,'skill-demo-variants');
  const code=find(demo,'skill-demo-source');
  const lines=find(demo,'skill-demo-file-lines');
  const controls=find(demo,'skill-demo-controls');
  assert.equal(tabs.children.length,3);
  assert.equal(tabs.children[0].textContent,'Read all (WHILE)');
  assert.equal(code.children.length,6);
  assert.equal(lines.children.length,3);
  assert.equal(code.children[1].children[1].textContent,'while NOT myFile.endOfFile()');
  for(let i=0;i<15;i++) controls.children[1].click();
  assert.equal(lines.children.length,3,'reading does not alter the file');
  assert.equal(find(demo,'skill-demo-table').children[1].children.length,15);
  assert.equal(controls.children[1].disabled,true,'demo finishes after false WHILE condition and close');
  find(demo,'skill-demo-back').click();
  assert.equal(ui.practice.studentAnswer,'my answer');
});

test('The other 12 J277 coding skills reveal the appropriate guided example',()=>{
  const guided=require('../assets/j277-skills-guided-examples.js');
  const skills=['variables','data-types','casting','operators','comparisons','sequence',
    'selection','for-loops','while-until','array-1d','array-2d','records'];
  for(const skill of skills){
    const ui=mountDemo(skill);
    const q={level:'medium',type:'trace',mode:'while',cast:'int',code:['a = 9','b = 3','answer = a DIV b']};
    ui.window.RHSSkillsDemoProvider=()=>guided.make(skill,q);
    const button=find(ui.title,'skill-demo-open');
    ui.practice.studentAnswer='unsaved work';
    button.click();
    const demo=ui.practice.insertedSibling,code=find(demo,'skill-demo-source');
    const controls=find(demo,'skill-demo-controls');
    assert.ok(code.children.length>0,skill);
    if(skill==='for-loops'||skill==='while-until')assert.match(code.children[0].children[1].textContent,skill==='for-loops'?/total = 0/:/i = 1/);
    else if(skill==='selection')assert.equal(code.children[0].children[1].textContent,'mark = 52',
      'the complete IF/ELSEIF structure is visible before the trace');
    else{
      assert.ok(code.children[0].className.includes('is-upcoming'),skill);
      assert.equal(code.children[0].children[1].textContent,'Step 1 …',skill);
    }
    controls.children[1].click();
    assert.ok(!code.children[0].className.includes('is-upcoming'),skill);
    find(demo,'skill-demo-back').click();
    assert.equal(ui.practice.studentAnswer,'unsaved work',skill);
  }
});
