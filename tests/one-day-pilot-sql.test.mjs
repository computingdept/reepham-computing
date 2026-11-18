import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { workSetIsCurrent } from '../cloudflare/my-work-worker/src/index.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(root, 'cloudflare/my-work-worker/pilots/2026-11-19');
const stages = ['y11','y12','y13'].map(year => readFileSync(join(path,`stage-${year}.sql`),'utf8'));

test('one-day pilot scripts are staged inactive and automatically expire on 19 November', () => {
  for (const sql of stages) {
    assert.match(sql, /'classwork', 'cohort', NULL, '2026-11-19', 0, '2026-11-12 23:59:59'/);
    assert.doesNotMatch(sql, /\bDELETE\b|\bDROP\b|\bTRUNCATE\b|\bREPLACE INTO\b/i);
  }
  const inactive = { kind:'classwork', active:0, createdAt:'2026-11-12 23:59:59' };
  assert.equal(workSetIsCurrent(inactive,new Date('2026-11-19T12:00:00Z')),false);
  const active = { ...inactive, active:1 };
  assert.equal(workSetIsCurrent(active,new Date('2026-11-19T08:30:00Z')),true);
  assert.equal(workSetIsCurrent(active,new Date('2026-11-19T23:59:58Z')),true);
  assert.equal(workSetIsCurrent(active,new Date('2026-11-20T00:00:00Z')),false);
});

test('D1 staging scripts keep old assignments/results and create exactly three pilot sets', async t => {
  const sqlite = await import('node:sqlite').catch(() => null);
  if (!sqlite?.DatabaseSync) return t.skip('SQLite in Node is unavailable');
  const db = new sqlite.DatabaseSync(':memory:');
  try {
    db.exec('PRAGMA foreign_keys = ON');
    db.exec(readFileSync(join(root,'cloudflare/my-work-worker/schema.sql'),'utf8'));
    db.prepare("INSERT INTO practice_codes (code, cohort) VALUES ('P-ABCDEFGHJK','Y11')").run();
    db.prepare("INSERT INTO assignments (assignment_key,cohort,item_id,level,active) VALUES ('11|j277-practice-11-components|','Y11','j277-practice-11-components','',1)").run();
    db.prepare("INSERT INTO attempts (attempt_id,code,assignment_key,score,level,source) VALUES ('old-result-1','P-ABCDEFGHJK','11|j277-practice-11-components|',80,'','practice')").run();
    for (const stage of stages) db.exec(stage);
    db.exec(stages[0]); // safe retry cannot duplicate memberships or overwrite anything
    const sets = db.prepare('SELECT id, title, cohort, active, created_at AS createdAt FROM work_sets ORDER BY cohort').all();
    assert.deepEqual(sets.map(set=>[set.title,set.cohort,set.active]),[
      ['Pilot Year 11','Y11',0],['Pilot Year 12','Y12',0],['Pilot Year 13','Y13',0]
    ]);
    const counts = db.prepare('SELECT s.cohort,COUNT(*) AS items FROM work_sets s JOIN work_set_items i ON i.work_set_id=s.id GROUP BY s.cohort ORDER BY s.cohort').all();
    assert.deepEqual(counts.map(row=>[row.cohort,row.items]),[['Y11',95],['Y12',173],['Y13',173]]);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM assignments').get().n,441);
    assert.equal(db.prepare('SELECT COUNT(*) AS n FROM attempts').get().n,1);
    assert.equal(db.prepare("SELECT active FROM assignments WHERE assignment_key='11|j277-practice-11-components|'").get().active,1);
    const reports = readFileSync(join(path,'results.sql'),'utf8');
    db.exec('CREATE TABLE login_profiles(username_key TEXT PRIMARY KEY, code TEXT NOT NULL)');
    db.prepare("INSERT INTO login_profiles (username_key, code) VALUES ('bubbleyak', 'P-ABCDEFGHJK')").run();
    db.exec(reports);
    const username = db.prepare(`SELECT COALESCE(l.username_key, a.code) AS username
      FROM attempts a LEFT JOIN login_profiles l ON l.code = a.code LIMIT 1`).get();
    assert.equal(username.username,'bubbleyak');
  } finally { db.close(); }
});
