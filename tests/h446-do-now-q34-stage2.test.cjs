const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const bank = JSON.parse(fs.readFileSync(
  path.join(root, 'data/do-now/q34-pilot/h446-218-226.json'), 'utf8'
));

test('H446 stage-two Q3/Q4 source bank covers lessons 218–226', () => {
  assert.equal(bank.course, 'h446');
  assert.equal(bank.status, 'pilot');
  assert.deepEqual(Object.keys(bank.lessons).sort(),
    Array.from({length: 9}, (_, i) => String(218 + i)));
});

test('Stage-two retrieval sources exist, precede their lesson and preserve the four cards', () => {
  for (const [lessonId, entry] of Object.entries(bank.lessons)) {
    const page = path.join(root, `lessons/h446/lesson-${lessonId}/index.html`);
    const html = fs.readFileSync(page, 'utf8');
    assert.equal((html.match(/<article class="donow-question">/g) || []).length, 4,
      `L${lessonId} must retain its four Do Now cards`);
    assert.match(html, /lesson\.js\?v=20261114-q34-pilot2/,
      `L${lessonId} must load the new shared source labelling`);
    for (const slot of ['q3', 'q4']) {
      const refs = entry[slot]?.sourceRefs;
      assert.ok(Array.isArray(refs) && refs.length > 0,
        `L${lessonId} ${slot} must name an earlier lesson`);
      for (const ref of refs) {
        assert.match(ref, /^L\d{3}$/);
        assert.ok(Number(ref.slice(1)) < Number(lessonId),
          `L${lessonId} ${slot} must retrieve earlier teaching: ${ref}`);
        assert.ok(fs.existsSync(path.join(root,
          `lessons/h446/lesson-${ref.slice(1)}/index.html`)),
        `L${lessonId} ${slot} source ${ref} does not exist`);
      }
    }
  }
});

test('Stage-two questions retrieve earlier teaching and answer reveals match', () => {
  const lesson220 = fs.readFileSync(path.join(root,
    'lessons/h446/lesson-220/index.html'), 'utf8');
  assert.equal((lesson220.match(/A route has edge costs 2, 3 and 2\. What is the total path cost\?/g) || []).length, 2);
  assert.match(lesson220, /<p class="review-answer">7\.<\/p>/);

  const lesson224 = fs.readFileSync(path.join(root,
    'lessons/h446/lesson-224/index.html'), 'utf8');
  assert.equal((lesson224.match(/What is a base case in recursion\?/g) || []).length, 2);
  assert.match(lesson224, /A stopping condition that returns a result without making another recursive call\./);

  const lesson219 = fs.readFileSync(path.join(root,
    'lessons/h446/lesson-219/index.html'), 'utf8');
  assert.doesNotMatch(lesson219, /OLDER · BST/);
});
