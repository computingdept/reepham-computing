const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const bank = JSON.parse(fs.readFileSync(
  path.join(root, 'data/do-now/q34-pilot/h446-209-217.json'), 'utf8'
));

test('H446 Q3/Q4 pilot source bank covers the intended nine lessons', () => {
  assert.equal(bank.course, 'h446');
  assert.equal(bank.status, 'pilot');
  assert.deepEqual(Object.keys(bank.lessons).sort(),
    Array.from({length: 9}, (_, i) => String(209 + i)));
});

test('Every Q3/Q4 source exists and precedes its retrieval lesson', () => {
  for (const [lessonId, entry] of Object.entries(bank.lessons)) {
    const page = path.join(root, `lessons/h446/lesson-${lessonId}/index.html`);
    const html = fs.readFileSync(page, 'utf8');
    assert.equal((html.match(/<article class="donow-question">/g) || []).length, 4,
      `L${lessonId} must retain its four Do Now cards`);
    assert.match(html, /lesson\.js\?v=20261114-q34-pilot1/,
      `L${lessonId} must load the updated shared source labelling`);
    for (const slot of ['q3', 'q4']) {
      const refs = entry[slot]?.sourceRefs;
      assert.ok(Array.isArray(refs) && refs.length > 0,
        `L${lessonId} ${slot} must name a taught lesson`);
      for (const ref of refs) {
        assert.match(ref, /^L\d{3}$/, `Invalid source ${ref}`);
        assert.ok(Number(ref.slice(1)) < Number(lessonId),
          `L${lessonId} ${slot} refers to a lesson not yet taught: ${ref}`);
        assert.ok(fs.existsSync(path.join(root,
          `lessons/h446/lesson-${ref.slice(1)}/index.html`)),
        `L${lessonId} ${slot} refers to a missing lesson: ${ref}`);
      }
    }
  }
});
