'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const {
  extractPhaseSections, changedParts, parseScopes, checkScopes
} = require('../scripts/quality/check-lesson-phase-changes.cjs');

const page = (doNow = 'Recall', iDo = 'Explain', weDo = 'Try', title = 'Lesson') =>
  `<html><head><title>${title}</title></head><body>` +
  `<section id="do-now"><article>${doNow}</article></section>` +
  `<section id="i-do"><div><section class="nested">${iDo}</section></div></section>` +
  `<section id="we-do">${weDo}</section></body></html>`;

test('extracts whole phases even when they contain nested sections', () => {
  const phases = extractPhaseSections(page());
  assert.deepEqual([...phases.keys()], ['do-now', 'i-do', 'we-do']);
  assert.match(phases.get('i-do').html, /<section class="nested">Explain<\/section>/);
});

test('changing I Do never counts as a Do Now change', () => {
  assert.deepEqual(changedParts(page(), page('Recall', 'Different model')), ['i-do']);
  assert.deepEqual(changedParts(page(), page('Different recall')), ['do-now']);
});

test('outside-of-phase edits must declare the lesson shell', () => {
  assert.deepEqual(changedParts(page(), page('Recall', 'Explain', 'Try', 'New title')), ['shell']);
  assert.deepEqual(changedParts(page(), page('Recall', 'New', 'Try', 'New title')),
    ['i-do', 'shell']);
});

test('new and removed lesson pages require deliberate scope', () => {
  assert.deepEqual(changedParts(null, page()), ['new-lesson']);
  assert.deepEqual(changedParts(page(), null), ['delete-lesson']);
  // A generated lesson wrapper has no inline phases, so changing it is a shell edit.
  assert.deepEqual(changedParts('<script src="a.js"></script>', '<script src="b.js"></script>'),
    ['shell']);
});

test('declarations allow only named phase changes', () => {
  const scopes = parseScopes('Phase-Scope: h446/219=i-do,we-do; shared/h446=engine');
  const changed = new Map([
    ['h446/219', new Set(['i-do', 'we-do', 'you-do'])],
    ['shared/h446', new Set(['engine'])]
  ]);
  assert.equal(checkScopes(changed, scopes).length, 1);
  assert.match(checkScopes(changed, scopes)[0], /unexpected you-do/);
  changed.get('h446/219').delete('you-do');
  assert.deepEqual(checkScopes(changed, scopes), []);
});

test('invalid, duplicate and overly broad declarations fail closed', () => {
  assert.throws(() => parseScopes('Phase-Scope: h446/219=everything'), /Invalid phase/);
  assert.throws(() => parseScopes('Phase-Scope: all=do-now'), /Invalid Phase-Scope target/);
  assert.throws(() => parseScopes('Phase-Scope: h446/219=i-do; h446/219=we-do'), /Duplicate/);
});
