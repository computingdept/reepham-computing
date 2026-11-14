'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');

const root = path.resolve(__dirname, '..');
const bank = require('../data/do-now/h446-q34-sources.json');
const corrections = require('../data/do-now/h446-q34-corrections.json');
const legacy = require('../data/do-now/migration/h446-source.json');

test('all 300 H446 lessons have a reviewed source for Q3 and Q4', () => {
  assert.equal(bank.course, 'h446');
  assert.equal(bank.status, 'reviewed');
  assert.deepEqual(Object.keys(bank.lessons).sort(),
    Object.keys(legacy.lessons).sort());
  assert.equal(Object.keys(bank.lessons).length, 300);
  for (const [lessonId, entry] of Object.entries(bank.lessons)) {
    for (const slot of ['q3', 'q4']) {
      const provenance = entry[slot];
      assert.ok(provenance, `L${lessonId} ${slot} missing`);
      if (provenance.priorStage === 'GCSE') {
        assert.equal(provenance.sourceRefs, undefined);
      } else {
        assert.ok(Array.isArray(provenance.sourceRefs) &&
          provenance.sourceRefs.length > 0, `L${lessonId} ${slot} missing source`);
        for (const ref of provenance.sourceRefs) {
          assert.match(ref, /^L\d{3}$/);
          assert.ok(Number(ref.slice(1)) < Number(lessonId),
            `L${lessonId} ${slot} is not earlier: ${ref}`);
          assert.ok(legacy.lessons[ref.slice(1)], `Missing earlier lesson: ${ref}`);
        }
      }
    }
  }
});

test('source-bank generation is deterministic and 209–226 published pilot labels are retained', () => {
  execFileSync('node', ['scripts/do-now/build-h446-q34-sources.cjs', '--check'],
    {cwd: root, stdio: 'pipe'});
  for (const file of ['h446-209-217.json', 'h446-218-226.json']) {
    const old = require('../data/do-now/q34-pilot/' + file);
    for (const [id, entry] of Object.entries(old.lessons)) {
      for (const slot of ['q3', 'q4']) {
        assert.deepEqual(bank.lessons[id][slot].sourceRefs, entry[slot].sourceRefs);
      }
    }
  }
});

test('audited corrections cannot alter Q1/Q2 or the four-card structure', () => {
  const all = Object.keys(corrections);
  assert.ok(all.length >= 30);
  for (const [id, slots] of Object.entries(corrections)) {
    assert.ok(legacy.lessons[id]);
    for (const [slot, replacement] of Object.entries(slots)) {
      assert.ok(['q3', 'q4'].includes(slot));
      assert.ok(replacement.question.length >= 15);
      assert.ok(replacement.answer.length >= 2);
      assert.deepEqual(bank.lessons[id][slot].replacement, replacement);
      assert.notEqual(replacement.question,
        legacy.lessons[id].questions[Number(slot[1])-1].originalQuestion);
    }
  }
  for (const id of Object.keys(legacy.lessons)) {
    if (id === '036' || id === '037') continue;
    const html = fs.readFileSync(path.join(root,
      `lessons/h446/lesson-${id}/index.html`), 'utf8');
    assert.equal((html.match(/<article class="donow-question">/g)||[]).length, 4,
      `L${id} does not retain four Do Now cards`);
  }
});

test('both guided A3 lessons retain dedicated rendering and load the shared bank', () => {
  const presentation = fs.readFileSync(path.join(root,
    'assets/h446-mindmap/presentation.js'), 'utf8');
  assert.match(presentation, /applyReviewedH446MindMapQ34\(\)/);
  for (const id of ['036', '037']) {
    const html = fs.readFileSync(path.join(root,
      `lessons/h446/lesson-${id}/guided.html`), 'utf8');
    assert.match(html, /presentation\.js\?v=20261114-q34-all/);
    for (const slot of ['q3','q4']) assert.ok(bank.lessons[id][slot]);
  }
});
