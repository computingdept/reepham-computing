const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const bank = JSON.parse(read('lessons/j277/code-first-master-20261021.json'));
const renderer = read('assets/j277/code-first-rollout.js');
const styles = read('assets/j277/code-first-rollout.css');

test('every standard J277 Code First has one reviewed task and starter', () => {
  const excluded = new Set(bank.exceptions);
  const eligible = Object.values(bank.lessons).filter(lesson => !excluded.has(lesson.lesson));
  assert.ok(eligible.length >= 140);
  for (const lesson of eligible) {
    assert.match(lesson.lesson, /^\d{3}$/);
    assert.ok(typeof lesson.task === 'string' && lesson.task.trim(), `${lesson.lesson}: task`);
    assert.ok(typeof lesson.starter === 'string' && lesson.starter.trim(), `${lesson.lesson}: starter`);
    assert.ok(typeof lesson.model === 'string' && lesson.model.trim(), `${lesson.lesson}: separate answer`);
    assert.ok(lesson.starter.split('\n').length <= 11, `${lesson.lesson}: line fit`);
  }
});

test('one shared renderer owns the label, prompt, code and highlighted routine', () => {
  assert.match(renderer, /entry\.task/);
  assert.match(renderer, /entry\.starter/);
  assert.match(renderer, /CODE FIRST · MWB/);
  assert.match(renderer, /\['predict','Predict'\],\['write','Write'\],\['test','Test'\],\['iterate','Improve'\]/);
  assert.match(renderer, /key===entry\.focus_stage/);
  assert.match(renderer, /aria-current','step'/);
  assert.match(renderer, /make\(active\?'mark':'span'/);
  assert.match(styles, /mark\.j277-cf-stage\.is-active/);
  assert.match(styles, /--rhsc-central-ink-a/);
  assert.match(renderer, /card\.replaceChildren/);
  assert.doesNotMatch(renderer, /j277-shared-instruction|j277-apple-step|j277-114-pilot-focus/);
  assert.doesNotMatch(styles, /114-compact|WRITE.*pill/);
});

test('Lesson 114 returns to the same shared Code First pipeline', () => {
  const lesson = read('lessons/j277/autumn2-rebuilt.js');
  const loader = read('assets/h446-lesson/lesson.js');
  const html = read('lessons/j277/lesson-114/index.html');
  assert.doesNotMatch(lesson, /compactPilot|114-compact-pilot/);
  assert.doesNotMatch(html, /114-compact/);
  assert.match(loader, /code-first-rollout\.js\?v=20261115-focus-highlight1/);
  assert.match(html, /autumn2-rebuilt\.js\?v=20261115-focus1/);
  for (const file of ['lessons/j277/autumn1-rebuilt.js','lessons/j277/autumn2-rebuilt.js','lessons/j277/h446-adapter.js']) {
    assert.match(read(file), /lesson\.js\?v=20261115-codefirst-focus1/, `${file}: cache-busted shared loader`);
  }
  assert.equal(fs.existsSync(path.join(root,'assets/j277/code-first-114-compact-pilot.css')),false);
});

test('the pilot examples exercise short prediction, medium writing and long code', () => {
  assert.equal(bank.lessons['002'].focus_stage, 'predict');
  assert.equal(bank.lessons['002'].starter.split('\n').length, 1);
  assert.equal(bank.lessons['114'].focus_stage, 'write');
  assert.equal(bank.lessons['114'].starter.split('\n').length, 5);
  assert.equal(bank.lessons['071'].starter.split('\n').length, 11);
  assert.match(bank.lessons['114'].starter, /code = _+/);
  assert.doesNotMatch(bank.lessons['114'].starter, /first\.upper \+/);
  const stages = new Set(['predict','write','test','iterate']);
  for (const [id, lesson] of Object.entries(bank.lessons)) {
    assert.ok(stages.has(lesson.focus_stage), `${id}: highlighted Code First stage`);
  }
});
