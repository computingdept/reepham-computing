const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = path.join(__dirname, '..');
const adapter = fs.readFileSync(path.join(root, 'lessons/j277/h446-adapter.js'), 'utf8');
const autumn1 = fs.readFileSync(path.join(root, 'lessons/j277/autumn1-rebuilt.js'), 'utf8');
const autumn2 = fs.readFileSync(path.join(root, 'lessons/j277/autumn2-rebuilt.js'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'assets/h446-lesson/lesson-classroom.css'), 'utf8');
const lessonHtml = number => fs.readFileSync(path.join(root, `lessons/j277/lesson-${String(number).padStart(3, '0')}/index.html`), 'utf8');
const digest = content => crypto.createHash('sha256').update(content).digest('hex').slice(0, 12);

test('standard J277 Objectives use the approved focus layout', () => {
  for (const generator of [adapter, autumn1, autumn2]) {
    assert.match(generator, /<section id="overview"[^>]*data-vocab-display="focus"/);
  }
  for (const number of [1, 2]) {
    assert.match(lessonHtml(number), /<section id="overview"[^>]*data-vocab-display="focus"/);
  }
  assert.doesNotMatch(lessonHtml(113), /data-vocab-display="focus"/, 'custom synoptic revision is unchanged');
});

test('J277 reuses the approved central brush and reveal styles', () => {
  assert.match(styles, /#overview\[data-vocab-display="focus"\] \.vocab-intro\{display:none\}/);
  assert.match(styles, /background-image:var\(--rhsc-central-ink-a\)/);
  assert.match(styles, /#overview\[data-vocab-display="focus"\] \.objective-vocab-definition/);
  assert.match(adapter, /data-objective-vocab-definition hidden/);
  assert.match(autumn1, /data-objective-vocab-definition hidden/);
  assert.match(autumn2, /data-objective-vocab-definition hidden/);
});

test('all standard lesson entries bypass stale generator caches', () => {
  assert.ok(adapter.includes(`../autumn1-rebuilt.js?v=${digest(autumn1)}`));
  const adapterVersion = digest(adapter);
  const autumn2Version = digest(autumn2);
  for (let number = 3; number <= 164; number++) {
    if (number === 113) continue;
    const expected = number <= 18
      ? `../h446-adapter.js?v=${adapterVersion}`
      : `../autumn2-rebuilt.js?v=${autumn2Version}`;
    assert.ok(lessonHtml(number).includes(expected), `Lesson ${number} must load ${expected}`);
  }
  const classroomVersion = digest(fs.readFileSync(path.join(root, 'assets/h446-lesson/lesson-classroom.css')));
  for (const number of [1, 2]) {
    assert.ok(lessonHtml(number).includes(`lesson-classroom.css?v=${classroomVersion}`));
  }
});
