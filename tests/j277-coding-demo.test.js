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

for (const skill of ['data-types', 'casting', 'operators', 'comparisons', 'sequence', 'selection', 'for-loops', 'while-until', 'array-1d', 'array-2d', 'records', 'files', 'sql']) {
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
