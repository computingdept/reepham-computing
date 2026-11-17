'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const sourceBank = require('../data/do-now/h446-q34-sources.json');
const exceptions = require('../data/do-now/h446-spacing-exceptions.json');

function previousOnly(refs, lessonId) {
  const previous = 'L' + String(Number(lessonId) - 1).padStart(3, '0');
  return Array.isArray(refs) && refs.length > 0 && refs.every(ref => ref === previous);
}

test('new H446 Q3s must retrieve older learning than the previous lesson', () => {
  assert.equal(sourceBank.status, 'reviewed');
  assert.equal(Object.keys(sourceBank.lessons).length, 300);
  const allowed = new Set(exceptions.q3PreviousOnly);
  for (const [id, entry] of Object.entries(sourceBank.lessons)) {
    if (previousOnly(entry.q3?.sourceRefs, id)) {
      assert.ok(allowed.has(id),
        `L${id} Q3 retrieves only the previous lesson; use older learning or record teacher review`);
    }
  }
  // Keep the exception registry minimal, not a permanent allowance for all time.
  for (const id of allowed) assert.ok(sourceBank.lessons[id], `Unknown exception L${id}`);
});

test('new H446 lessons may not source both Q3 and Q4 solely from last lesson', () => {
  const allowed = new Set(exceptions.q3AndQ4BothPreviousOnly);
  for (const [id, entry] of Object.entries(sourceBank.lessons)) {
    const both = previousOnly(entry.q3?.sourceRefs, id) &&
      previousOnly(entry.q4?.sourceRefs, id);
    if (both) assert.ok(allowed.has(id),
      `L${id} Q3 and Q4 both use the previous lesson; spread retrieval across prior teaching`);
  }
  for (const id of allowed) {
    assert.ok(exceptions.q3PreviousOnly.includes(id),
      `L${id} cannot be a both-previous exception without a Q3 exception`);
  }
});
