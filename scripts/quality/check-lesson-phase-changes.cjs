'use strict';

// Run in PRs and on main pushes. A lesson edit must declare precisely which
// classroom phases may change; a shared renderer edit must be declared too.
const {execFileSync} = require('node:child_process');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const phases = [
  'do-now', 'overview', 'new-learning', 'i-do', 'we-do',
  'you-do', 'vocabulary', 'exit'
];
const phaseNames = new Set([...phases, 'shell', 'new-lesson', 'delete-lesson', 'engine', 'style']);
const lessonPath = /^lessons\/(h446|j277)\/lesson-(\d{3})\/(index|guided)\.html$/;
const sharedEngines = new Map([
  ['assets/h446-lesson/lesson.js', 'shared/h446'],
  ['assets/h446-mindmap/presentation.js', 'shared/h446'],
  ['lessons/j277/autumn2-rebuilt.js', 'shared/j277']
]);

function sharedStyle(file) {
  if (/^assets\/h446-lesson\/[^/]+\.css$/.test(file)) return 'shared/h446';
  if (/^lessons\/j277\/[^/]+\.css$/.test(file)) return 'shared/j277';
  return null;
}

function extractPhaseSections(html) {
  const found = new Map();
  const stack = [];
  const tags = /<\/?section\b[^>]*>/gi;
  for (const match of html.matchAll(tags)) {
    const tag = match[0];
    if (/^<\/section/i.test(tag)) {
      const start = stack.pop();
      if (!start) throw Error('Unbalanced section closing tag');
      if (phases.includes(start.id)) {
        if (found.has(start.id)) throw Error(`Duplicate phase: ${start.id}`);
        found.set(start.id, {start: start.start, end: match.index + tag.length,
          html: html.slice(start.start, match.index + tag.length)});
      }
    } else {
      const id = tag.match(/\bid\s*=\s*(["'])([^"']+)\1/i)?.[2];
      stack.push({id, start: match.index});
    }
  }
  if (stack.length) throw Error('Unbalanced section opening tag');
  return found;
}

function withoutPhaseMarkup(html, sections) {
  const ordered = [...sections].sort((a, b) => a[1].start - b[1].start);
  let result = '', offset = 0;
  for (const [id, block] of ordered) {
    result += html.slice(offset, block.start) + `[CLASSROOM-PHASE:${id}]`;
    offset = block.end;
  }
  return result + html.slice(offset);
}

function changedParts(before, after) {
  if (before === null) return ['new-lesson'];
  if (after === null) return ['delete-lesson'];
  if (before === after) return [];
  const oldSections = extractPhaseSections(before);
  const newSections = extractPhaseSections(after);
  const changed = phases.filter(id => oldSections.get(id)?.html !== newSections.get(id)?.html);
  if (withoutPhaseMarkup(before, oldSections) !== withoutPhaseMarkup(after, newSections)) {
    changed.push('shell');
  }
  return changed;
}

// One or more lines, for example:
// Phase-Scope: h446/219=i-do,we-do; h446/220=do-now; shared/h446=engine
function parseScopes(message) {
  const scopes = new Map();
  for (const line of String(message || '').split(/\r?\n/)) {
    const content = line.match(/^\s*Phase-Scope\s*:\s*(.+?)\s*$/i)?.[1];
    if (!content) continue;
    for (const item of content.split(';').filter(Boolean)) {
      const assignment = item.trim().match(/^([a-z0-9/-]+)\s*=\s*([a-z0-9, -]+)$/i);
      if (!assignment) throw Error(`Invalid Phase-Scope entry: ${item.trim()}`);
      const key = assignment[1].toLowerCase();
      if (!/^(?:h446|j277)\/\d{3}$|^shared\/(?:h446|j277)$/.test(key)) {
        throw Error(`Invalid Phase-Scope target: ${key}`);
      }
      if (scopes.has(key)) throw Error(`Duplicate Phase-Scope target: ${key}`);
      const allowed = new Set(assignment[2].split(',').map(x => x.trim().toLowerCase()));
      if ([...allowed].some(x => !phaseNames.has(x))) {
        throw Error(`Invalid phase for ${key}. Use: ${[...phaseNames].join(', ')}`);
      }
      scopes.set(key, allowed);
    }
  }
  return scopes;
}

function git(args) {
  return execFileSync('git', args, {cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024});
}

function fileAt(revision, file) {
  try { return git(['show', `${revision}:${file}`]); }
  catch { return null; }
}

function changesBetween(base, head) {
  const output = git(['diff', '--name-status', '--no-renames', '-z', base, head]);
  const fields = output.split('\0').filter(Boolean);
  const affected = new Map();
  for (let i = 0; i < fields.length; i += 2) {
    const file = fields[i + 1];
    if (!file) throw Error('Invalid git diff output');
    const match = file.match(lessonPath);
    if (match) {
      const key = `${match[1]}/${match[2]}`;
      const actual = changedParts(fileAt(base, file), fileAt(head, file));
      if (!affected.has(key)) affected.set(key, new Set());
      actual.forEach(part => affected.get(key).add(part));
    } else if (sharedEngines.has(file) || sharedStyle(file)) {
      const key = sharedEngines.get(file) || sharedStyle(file);
      if (!affected.has(key)) affected.set(key, new Set());
      affected.get(key).add(sharedEngines.has(file) ? 'engine' : 'style');
    }
  }
  return affected;
}

function checkScopes(changed, scopes) {
  const errors = [];
  for (const [key, actual] of changed) {
    if (!actual.size) continue;
    const declared = scopes.get(key) || new Set();
    const unexpected = [...actual].filter(part => !declared.has(part));
    if (unexpected.length) {
      errors.push(`${key}: unexpected ${unexpected.join(', ')}. ` +
        `Actual: ${[...actual].join(', ')}. ` +
        `Declared: ${[...declared].join(', ') || '(none)'}.`);
    }
  }
  return errors;
}

function main(argv = process.argv.slice(2)) {
  const flag = name => argv[argv.indexOf(name) + 1];
  const base = flag('--base'), head = flag('--head');
  if (!base || !head) throw Error('Usage: --base BASE_SHA --head HEAD_SHA');
  const changed = changesBetween(base, head);
  if (![...changed.values()].some(parts => parts.size)) {
    console.log('No classroom phase or shared renderer changes.');
    return;
  }
  // GitHub PR descriptions take precedence; pushes can declare scope in their
  // commit message(s) so direct commits also receive an audit trail.
  const description = process.env.PHASE_SCOPE?.trim() || git(['log', '--format=%B', `${base}..${head}`]);
  const errors = checkScopes(changed, parseScopes(description));
  for (const [key, parts] of changed) {
    if (parts.size) console.log(`${key}: changed ${[...parts].join(', ')}`);
  }
  if (errors.length) {
    for (const error of errors) console.error('PHASE GUARD:', error);
    console.error('Declare intended edits in the PR description, for example:');
    console.error('Phase-Scope: h446/219=i-do,we-do; shared/h446=engine');
    process.exitCode = 1;
  } else {
    console.log('Phase scope verified; no undeclared lesson changes.');
  }
}

if (require.main === module) {
  try { main(); } catch (error) { console.error('PHASE GUARD:', error.message); process.exitCode = 1; }
}
module.exports = {phases, extractPhaseSections, changedParts, parseScopes, checkScopes, changesBetween};
