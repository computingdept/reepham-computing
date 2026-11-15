const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = path.join(__dirname, '..');
const adapter = fs.readFileSync(path.join(root, 'lessons/j277/h446-adapter.js'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'assets/h446-lesson/lesson-classroom.css'), 'utf8');
const lesson003 = fs.readFileSync(path.join(root, 'lessons/j277/lesson-003/index.html'), 'utf8');

test('the shared Objectives focus is piloted only on J277 Lesson 003', () => {
  const start = adapter.indexOf('<section id="overview"');
  const end = adapter.indexOf('>', start);
  assert.ok(start !== -1 && end > start, 'Objectives section exists');
  const tagTemplate = adapter.slice(start, end + 1);
  const renderTag = new Function('n', `return \`${tagTemplate}\`;`);
  assert.match(renderTag('003'), /data-vocab-display="focus"/);
  for (const other of ['002', '019', '020', '113']) {
    assert.doesNotMatch(renderTag(other), /data-vocab-display="focus"/);
  }
});

test('the pilot reuses the approved central brush and reveal styles', () => {
  assert.match(styles, /#overview\[data-vocab-display="focus"\] \.vocab-intro\{display:none\}/);
  assert.match(styles, /background-image:var\(--rhsc-central-ink-a\)/);
  assert.match(styles, /#overview\[data-vocab-display="focus"\] \.objective-vocab-definition/);
  assert.match(adapter, /data-objective-vocab-definition hidden/);
});

test('the single pilot entry bypasses stale generator cache', () => {
  const version = crypto.createHash('sha256').update(adapter).digest('hex').slice(0, 12);
  assert.ok(lesson003.includes(`../h446-adapter.js?v=${version}`));
});
