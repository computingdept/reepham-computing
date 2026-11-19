import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../../../synoptic-homework-builder.html', import.meta.url), 'utf8');
const script = readFileSync(new URL('../../../assets/synoptic-homework-builder.js', import.meta.url), 'utf8');
const teacherPage = readFileSync(new URL('../../../my-work-teacher-assign-pilot.html', import.meta.url), 'utf8');

test('teacher preview has accessible steps, both papers and an explicit save acknowledgement', () => {
  for (const id of ['connect-form', 'cohort', 'due-date', 'skill-list', 'generate-button',
    'paper1-list', 'paper2-list', 'approval', 'save-button', 'save-result']) {
    assert.match(page, new RegExp(`id="${id}"`));
  }
  assert.match(page, /Year 13 · H446/);
  assert.match(page, /Year 11 · J277/);
  assert.match(page, /not.*yet.*visible to students/i);
  assert.match(page, /@media\(max-width:680px\)/);
  assert.match(teacherPage, /synoptic-homework-builder\.html/);
});

test('browser selection uses authoritative bank URLs, prior used IDs and no automatic publication', () => {
  assert.match(script, /loadSynopticCatalog\(/);
  assert.match(script, /selectSynopticHomework\(/);
  assert.match(script, /\/v1\/teacher\/synoptic\/used/);
  assert.match(script, /\/v1\/teacher\/synoptic\/publish/);
  assert.match(script, /confirm: true/);
  assert.match(script, /if \(!draft \|\| busy \|\| !\$\('approval'\)\.checked\) return/);
  assert.doesNotMatch(script, /localStorage|sessionStorage|document\.cookie/);
  assert.match(script, /cache: 'no-store'/);
});
