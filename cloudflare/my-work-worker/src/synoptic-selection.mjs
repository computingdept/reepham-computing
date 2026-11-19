// Shared, side-effect-free selection rules for the Year 11/13 synoptic pilot.
// Existing GitHub bank.js files remain the source of truth. Neither this file
// nor the selection process changes the original topic quizzes.

export const SYNOPTIC_BANKS = Object.freeze({
  h446: Object.freeze({
    paper1: ['1-1', '1-2', '1-3', '1-4', '1-5'],
    paper2: ['2-1', '2-2-1', '2-2-2', '2-3']
  }),
  j277: Object.freeze({
    paper1: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6'],
    paper2: ['2-1', '2-2', '2-3', '2-4', '2-5']
  })
});

export function synopticBankPaths(course) {
  const papers = SYNOPTIC_BANKS[course];
  if (!papers) throw new Error('Unknown synoptic course');
  return Object.entries(papers).flatMap(([paper, sections]) =>
    sections.map(section => ({ course, paper, path: `revision/${course}/section-${section}/bank.js` })));
}

// The published bank.js files contain a JSON array assigned to `const SKILLS`.
// Parse only that JSON; never eval/execute the source scripts in a teacher UI.
export function parseSynopticBank(source) {
  if (typeof source !== 'string') throw new Error('Question bank must be text');
  const match = /\bconst\s+SKILLS\s*=\s*\[/.exec(source);
  if (!match) throw new Error('Question bank has no SKILLS array');
  const start = source.indexOf('[', match.index);
  let quoted = false;
  let escaped = false;
  let depth = 0;
  for (let i = start; i < source.length; i++) {
    const char = source[i];
    if (quoted) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') quoted = false;
      continue;
    }
    if (char === '"') quoted = true;
    else if (char === '[') depth++;
    else if (char === ']') {
      depth--;
      if (depth === 0) {
        const skills = JSON.parse(source.slice(start, i + 1));
        if (!Array.isArray(skills)) throw new Error('SKILLS must be a JSON array');
        return skills;
      }
    }
  }
  throw new Error('Question bank SKILLS array is incomplete');
}

function specificationGroup(section) {
  const match = /^(\d+\.\d+)(?:\.\d+)?$/.exec(section || '');
  if (!match) throw new Error(`Invalid specification section: ${section}`);
  return match[1];
}

export function buildSynopticCatalog(course, bankSources) {
  const paths = synopticBankPaths(course);
  const questions = [];
  const ids = new Set();
  for (const { paper, path } of paths) {
    const source = bankSources instanceof Map ? bankSources.get(path) : bankSources?.[path];
    if (typeof source !== 'string') throw new Error(`Missing source: ${path}`);
    for (const skill of parseSynopticBank(source)) {
      if (typeof skill.id !== 'string' || !skill.id || !Array.isArray(skill.questions))
        throw new Error(`Invalid Skill in ${path}`);
      const group = specificationGroup(skill.section);
      for (const question of skill.questions) {
        if (typeof question.id !== 'string' || !question.id || ids.has(question.id))
          throw new Error(`Duplicate or missing question ID: ${question.id}`);
        if (typeof question.prompt !== 'string' || !question.prompt.trim() ||
            !Array.isArray(question.options) || question.options.length !== 4 ||
            !question.options.every(option => typeof option === 'string' && option.trim()) ||
            !question.options.includes(question.answer) ||
            typeof question.explanation !== 'string' || !question.explanation.trim())
          throw new Error(`Invalid question contents: ${question.id}`);
        ids.add(question.id);
        questions.push(Object.freeze({
          ...question, course, paper, group, spec: skill.spec || skill.section,
          skillId: skill.id, skillTitle: skill.title, lessons: skill.lessons || [],
          sourcePath: path
        }));
      }
    }
  }
  return Object.freeze(questions);
}

export async function loadSynopticCatalog(course, fetchSource) {
  if (typeof fetchSource !== 'function') throw new Error('A bank fetcher is required');
  const pairs = await Promise.all(synopticBankPaths(course).map(async ({ path }) =>
    [path, await fetchSource(path)]));
  return buildSynopticCatalog(course, new Map(pairs));
}

function pickIndex(size, random) {
  const value = random();
  if (typeof value !== 'number' || value < 0 || value >= 1)
    throw new Error('Random source must return a number in [0, 1)');
  return Math.floor(value * size);
}

function selectPaper(candidates, paper, used, count, random) {
  const available = candidates.filter(question => question.paper === paper && !used.has(question.id));
  if (available.length < count)
    throw new Error(`Only ${available.length} unused ${paper} questions remain; ${count} required. No questions were reused.`);
  const groups = new Map();
  for (const question of available) {
    if (!groups.has(question.group)) groups.set(question.group, []);
    groups.get(question.group).push(question);
  }
  const groupCount = new Map();
  const skillCount = new Map();
  const chosen = [];
  while (chosen.length < count) {
    // Every non-exhausted specification group receives its first question
    // before any group receives its second, etc. (1.1, 1.2, 1.3 ...).
    const eligibleGroups = [...groups].filter(([, items]) => items.length);
    const smallest = Math.min(...eligibleGroups.map(([group]) => groupCount.get(group) || 0));
    const tiedGroups = eligibleGroups.filter(([group]) => (groupCount.get(group) || 0) === smallest);
    const [group, items] = tiedGroups[pickIndex(tiedGroups.length, random)];
    // Within a specification group, spread across Skills/spec points too.
    const minSkill = Math.min(...items.map(item => skillCount.get(item.skillId) || 0));
    const tiedQuestions = items.filter(item => (skillCount.get(item.skillId) || 0) === minSkill);
    const item = tiedQuestions[pickIndex(tiedQuestions.length, random)];
    items.splice(items.indexOf(item), 1);
    groupCount.set(group, (groupCount.get(group) || 0) + 1);
    skillCount.set(item.skillId, (skillCount.get(item.skillId) || 0) + 1);
    chosen.push(item);
  }
  return chosen;
}

// usedIds is the union of previously PUBLISHED assignment question IDs from
// D1 for this cohort. Preview is read-only; publishing must atomically reserve
// the final 20 IDs using a D1 UNIQUE(cohort, question_id) constraint.
export function selectSynopticHomework({ course, catalog, usedIds = [], countPerPaper = 10, random = Math.random }) {
  if (!SYNOPTIC_BANKS[course]) throw new Error('Unknown synoptic course');
  if (!Array.isArray(catalog) || !Number.isInteger(countPerPaper) || countPerPaper < 1 || countPerPaper > 10)
    throw new Error('Invalid synoptic catalogue or paper length');
  if (catalog.some(question => question.course !== course)) throw new Error('Mixed-course catalogue');
  const seen = new Set();
  for (const question of catalog) {
    if (!question.id || seen.has(question.id) || !['paper1', 'paper2'].includes(question.paper) || !question.group)
      throw new Error('Invalid or duplicate catalogue question');
    seen.add(question.id);
  }
  const used = new Set(usedIds);
  const paper1 = selectPaper(catalog, 'paper1', used, countPerPaper, random);
  for (const question of paper1) used.add(question.id);
  const paper2 = selectPaper(catalog, 'paper2', used, countPerPaper, random);
  return { course, paper1, paper2,
    coverage: {
      paper1: Object.fromEntries([...new Set(paper1.map(q => q.group))].sort().map(group => [group, paper1.filter(q => q.group === group).length])),
      paper2: Object.fromEntries([...new Set(paper2.map(q => q.group))].sort().map(group => [group, paper2.filter(q => q.group === group).length]))
    }
  };
}
