import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  SYNOPTIC_BANKS, synopticBankPaths, parseSynopticBank,
  buildSynopticCatalog, loadSynopticCatalog, selectSynopticHomework
} from '../src/synoptic-selection.mjs';

function sourcesFor(course, questionsPerGroup = 12) {
  const sources = new Map();
  for (const { path, paper } of synopticBankPaths(course)) {
    const section = path.match(/section-([\d-]+)/)[1].replaceAll('-', '.');
    const skills = Array.from({ length: 3 }, (_, index) => ({
      id: `${course}-${section}-skill-${index}`,
      section,
      spec: section + '(a)',
      title: 'Example topic',
      lessons: [101],
      questions: Array.from({ length: questionsPerGroup / 3 }, (_, number) => ({
        id: `${course}-${paper}-${section}-${index}-${number}`,
        prompt: `Question ${index} ${number}?`, options: ['A', 'B', 'C', 'D'],
        answer: 'A', explanation: 'Worked explanation.'
      }))
    }));
    // J277 banks include unrelated consts before SKILLS; neither those nor
    // strings containing ] or escaped quotes may confuse the safe parser.
    sources.set(path, `'use strict';\nconst SECTION={"code":"${section}"};\nconst SKILLS=${JSON.stringify(skills)};`);
  }
  return sources;
}

test('knows all 20 original GitHub bank paths and required groups', () => {
  assert.equal(synopticBankPaths('h446').length, 9);
  assert.equal(synopticBankPaths('j277').length, 11);
  assert.deepEqual(SYNOPTIC_BANKS.j277.paper1, ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6']);
  assert.throws(() => synopticBankPaths('unknown'), /Unknown/);
});

test('parses JSON SKILLS without running bank code', () => {
  const code = `globalThis.DO_NOT_RUN = true; const SKILLS=[{"id":"a","questions":[{"prompt":"quote \\\" and ] works"}]}];`;
  assert.equal(parseSynopticBank(code)[0].questions[0].prompt, 'quote " and ] works');
  assert.equal(globalThis.DO_NOT_RUN, undefined);
  assert.throws(() => parseSynopticBank('const SKILLS = [{"id": '), /incomplete/);
});

test('loads all sources, retaining correct course, paper, spec, Skill and lesson', async () => {
  const sources = sourcesFor('h446');
  const catalog = await loadSynopticCatalog('h446', path => sources.get(path));
  assert.equal(catalog.length, 9 * 12);
  const first = catalog[0];
  assert.equal(first.course, 'h446');
  assert.equal(first.paper, 'paper1');
  assert.equal(first.group, '1.1');
  assert.equal(first.spec, '1.1(a)');
  assert.deepEqual(first.lessons, [101]);
  assert.ok(first.sourcePath.endsWith('/bank.js'));
});

test('Year 13 draws 10 from each paper across all 1.x and 2.x groups', () => {
  const catalog = buildSynopticCatalog('h446', sourcesFor('h446'));
  const selected = selectSynopticHomework({ course: 'h446', catalog, random: () => 0.12 });
  assert.equal(selected.paper1.length, 10);
  assert.equal(selected.paper2.length, 10);
  assert.deepEqual(selected.coverage.paper1, { '1.1': 2, '1.2': 2, '1.3': 2, '1.4': 2, '1.5': 2 });
  assert.deepEqual(Object.values(selected.coverage.paper2).sort(), [3, 3, 4]);
  assert.equal(new Set([...selected.paper1, ...selected.paper2].map(q => q.id)).size, 20);
});

test('Year 11 covers all 6 Paper 1 groups and all 5 Paper 2 groups', () => {
  const catalog = buildSynopticCatalog('j277', sourcesFor('j277'));
  const selected = selectSynopticHomework({ course: 'j277', catalog, random: () => 0.55 });
  assert.equal(Object.keys(selected.coverage.paper1).length, 6);
  assert.deepEqual(Object.values(selected.coverage.paper1).sort(), [1, 1, 2, 2, 2, 2]);
  assert.deepEqual(Object.values(selected.coverage.paper2).sort(), [2, 2, 2, 2, 2]);
});

test('second homework never reuses questions from first published homework', () => {
  const catalog = buildSynopticCatalog('j277', sourcesFor('j277'));
  const first = selectSynopticHomework({ course: 'j277', catalog, random: () => 0.19 });
  const usedIds = [...first.paper1, ...first.paper2].map(q => q.id);
  const second = selectSynopticHomework({ course: 'j277', catalog, usedIds, random: () => 0.19 });
  assert.equal([...second.paper1, ...second.paper2].filter(q => usedIds.includes(q.id)).length, 0);
  assert.equal([...second.paper1, ...second.paper2].length, 20);
});

test('exhausted specification group is skipped without reusing an old question', () => {
  const catalog = buildSynopticCatalog('h446', sourcesFor('h446'));
  const usedIds = catalog.filter(q => q.group === '1.1').map(q => q.id);
  const selected = selectSynopticHomework({ course: 'h446', catalog, usedIds, random: () => 0.3 });
  assert.equal(selected.coverage.paper1['1.1'], undefined);
  assert.equal(selected.paper1.length, 10);
  assert.ok(selected.paper1.every(q => !usedIds.includes(q.id)));
});

test('fails safely when not enough unused questions remain', () => {
  const catalog = buildSynopticCatalog('j277', sourcesFor('j277'));
  const usedIds = catalog.filter(q => q.paper === 'paper2').slice(0, -9).map(q => q.id);
  assert.throws(() => selectSynopticHomework({ course: 'j277', catalog, usedIds }), /Only 9 unused paper2/);
});

test('rejects mixed courses, duplicate IDs and malformed bank questions', () => {
  const catalog = buildSynopticCatalog('j277', sourcesFor('j277'));
  assert.throws(() => selectSynopticHomework({ course: 'h446', catalog }), /Mixed-course/);
  assert.throws(() => selectSynopticHomework({ course: 'j277', catalog: [catalog[0], catalog[0]] }), /duplicate/);
  const sources = sourcesFor('j277');
  const path = synopticBankPaths('j277')[0].path;
  sources.set(path, sources.get(path).replace('"answer":"A"', '"answer":"WRONG"'));
  assert.throws(() => buildSynopticCatalog('j277', sources), /Invalid question contents/);
});
