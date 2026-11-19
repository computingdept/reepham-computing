import { loadSynopticCatalog, selectSynopticHomework } from '../cloudflare/my-work-worker/src/synoptic-selection.mjs';

const API = 'https://rhsccs-my-work-api.jeromedthompson.workers.dev';
const $ = id => document.getElementById(id);
let token = '';
let skillCatalog = [];
let selectedSkills = new Set();
let bankCatalog = [];
let usedIds = new Set();
let draft = null;
let bankRevision = '';
let busy = false;

function status(id, message, kind = '') {
  const element = $(id);
  element.textContent = message;
  element.className = `status${kind ? ` ${kind}` : ''}`;
}

function course() { return $('cohort').value === 'Y13' ? 'h446' : 'j277'; }

function todayUK() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const part = type => parts.find(item => item.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

function defaultDueDate() {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + 7);
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(date);
  const part = type => parts.find(item => item.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

async function api(path, { method = 'GET', body } = {}) {
  if (!token) throw new Error('Connect with your teacher token first.');
  const response = await fetch(API + path, {
    method, cache: 'no-store',
    headers: { authorization: 'Bearer ' + token, ...(body ? { 'content-type': 'application/json' } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.error || `Request failed (${response.status}).`);
    error.code = response.status;
    throw error;
  }
  return result;
}

function clearDraft() {
  draft = null;
  bankRevision = '';
  bankCatalog = [];
  $('review-card').hidden = true;
  $('save-card').hidden = true;
  $('save-result').hidden = true;
  $('approval').checked = false;
  $('save-button').disabled = true;
  status('review-status', '');
  status('save-status', '');
}

function availableSkills() {
  return skillCatalog.filter(item => item.type === 'skill' && item.id.startsWith(course() + '-'));
}

function renderSkills() {
  const list = $('skill-list');
  list.replaceChildren();
  const query = $('skill-search').value.trim().toLowerCase();
  const filtered = availableSkills().filter(item =>
    `${item.title} ${item.spec} ${item.group}`.toLowerCase().includes(query));
  for (const skill of filtered) {
    const label = document.createElement('label');
    label.className = 'skill-choice';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = selectedSkills.has(skill.id);
    input.disabled = selectedSkills.size >= 2 && !input.checked;
    input.addEventListener('change', () => {
      if (input.checked) selectedSkills.add(skill.id);
      else selectedSkills.delete(skill.id);
      clearDraft();
      renderSkills();
    });
    const content = document.createElement('span');
    content.textContent = skill.title;
    const note = document.createElement('small');
    note.textContent = `Paper ${skill.paper} · ${skill.spec || skill.group}`;
    content.append(note);
    label.append(input, content);
    list.append(label);
  }
  if (!filtered.length) list.textContent = 'No matching Skills.';
  $('skill-count').textContent = String(selectedSkills.size);
}

function setPaper(paper) {
  for (const value of ['paper1', 'paper2']) {
    $(value + '-tab').setAttribute('aria-selected', String(value === paper));
    $(value + '-list').hidden = value !== paper;
  }
}

function addText(tag, text, parent, className = '') {
  const item = document.createElement(tag);
  item.textContent = text;
  if (className) item.className = className;
  parent.append(item);
  return item;
}

function addContext(question, parent) {
  if (typeof question.model === 'string' && question.model.trim()) {
    addText('p', question.model, parent);
  }
  if (typeof question.code === 'string' && question.code.trim()) {
    if (question.language) addText('small', question.language, parent);
    addText('pre', question.code, parent);
  }
  if (question.diagram && typeof question.diagram.src === 'string' && question.diagram.src.startsWith('/revision/')) {
    const image = document.createElement('img');
    image.src = question.diagram.src;
    image.alt = question.diagram.alt || 'Diagram for this question';
    image.loading = 'lazy';
    parent.append(image);
  }
  if (question.table && Array.isArray(question.table.headers) && Array.isArray(question.table.rows)) {
    if (question.table.caption) addText('small', question.table.caption, parent);
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const top = document.createElement('tr');
    for (const heading of question.table.headers) addText('th', String(heading), top);
    thead.append(top);
    const tbody = document.createElement('tbody');
    for (const row of question.table.rows) {
      const tr = document.createElement('tr');
      for (const value of row) addText('td', String(value), tr);
      tbody.append(tr);
    }
    table.append(thead, tbody);
    parent.append(table);
  }
}

function replaceQuestion(paper, index) {
  const old = draft[paper][index];
  const selected = new Set([...draft.paper1, ...draft.paper2].map(question => question.id));
  const replacements = bankCatalog.filter(question => question.paper === paper &&
    question.group === old.group && !usedIds.has(question.id) && !selected.has(question.id));
  if (!replacements.length) {
    status('review-status', `No other unused ${old.group} questions are available. You can regenerate the whole preview.`, 'error');
    return;
  }
  draft[paper][index] = replacements[Math.floor(Math.random() * replacements.length)];
  renderQuestions();
  status('review-status', `Replaced Paper ${paper === 'paper1' ? '1' : '2'} question ${index + 1}. Review the new question before saving.`, 'good');
  $('approval').checked = false;
  $('save-button').disabled = true;
}

function renderQuestions() {
  for (const paper of ['paper1', 'paper2']) {
    const coverage = $('' + paper + '-coverage');
    coverage.replaceChildren();
    const counts = {};
    for (const question of draft[paper]) counts[question.group] = (counts[question.group] || 0) + 1;
    for (const [group, count] of Object.entries(counts).sort(([a], [b]) => a.localeCompare(b))) {
      addText('span', `${group} · ${count}`, coverage);
    }
    const list = $('' + paper + '-questions');
    list.replaceChildren();
    for (const [index, question] of draft[paper].entries()) {
      const details = document.createElement('details');
      details.className = 'question';
      const summary = document.createElement('summary');
      summary.className = 'qrow';
      const qbody = document.createElement('span');
      qbody.className = 'qbody';
      addText('span', `${index + 1} / 10 · ${question.spec} · ${question.skillTitle || question.skillId}`, qbody, 'qmeta');
      addText('strong', question.prompt, qbody);
      summary.append(qbody);
      const content = document.createElement('div');
      content.className = 'qcontent';
      addContext(question, content);
      const options = document.createElement('ol');
      options.type = 'A';
      for (const option of question.options) {
        const item = addText('li', option, options, option === question.answer ? 'correct' : '');
        if (option === question.answer) item.setAttribute('aria-label', `Correct answer: ${option}`);
      }
      content.append(options);
      addText('p', question.explanation, content, 'explain');
      const replace = addText('button', 'Replace with another question from ' + question.group, content, 'button secondary small');
      replace.type = 'button';
      replace.addEventListener('click', () => replaceQuestion(paper, index));
      details.append(summary, content);
      list.append(details);
    }
  }
}

async function currentBankRevision() {
  const response = await fetch('https://api.github.com/repos/computingdept/reepham-computing/commits/main', {
    cache: 'no-store', headers: { Accept: 'application/vnd.github+json' }
  });
  if (!response.ok) throw new Error('Could not verify the latest GitHub question-bank revision. Please retry.');
  const info = await response.json();
  if (typeof info.sha !== 'string' || !/^[a-f0-9]{40}$/i.test(info.sha))
    throw new Error('Question-bank revision could not be verified.');
  return info.sha;
}

async function generate() {
  if (busy) return;
  if (selectedSkills.size < 1 || selectedSkills.size > 2)
    return status('generate-status', 'Choose one or two Skills first.', 'error');
  if (!$('assignment-title').value.trim() || $('assignment-title').value.trim().length < 3)
    return status('generate-status', 'Enter a homework title of at least three characters.', 'error');
  if (!$('due-date').value || $('due-date').value < todayUK())
    return status('generate-status', 'Choose today or a later deadline.', 'error');
  busy = true;
  $('generate-button').disabled = true;
  $('regenerate-button').disabled = true;
  clearDraft();
  status('generate-status', 'Checking used questions and loading the existing GitHub banks…');
  try {
    const chosenCourse = course();
    const [usage, catalog, revision] = await Promise.all([
      api(`/v1/teacher/synoptic/used?cohort=${$('cohort').value}`),
      loadSynopticCatalog(chosenCourse, async path => {
        const response = await fetch('/' + path, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Could not load question bank ${path}.`);
        return response.text();
      }),
      currentBankRevision()
    ]);
    if (course() !== chosenCourse) throw new Error('Class changed while loading. Please generate again.');
    usedIds = new Set(usage.usedIds);
    bankCatalog = catalog;
    bankRevision = revision;
    const selected = selectSynopticHomework({ course: chosenCourse, catalog, usedIds });
    draft = { paper1: selected.paper1, paper2: selected.paper2 };
    renderQuestions();
    setPaper('paper1');
    $('review-card').hidden = false;
    $('save-card').hidden = false;
    $('approval').checked = false;
    $('save-button').disabled = true;
    $('save-result').hidden = true;
    status('generate-status', `Ready to review: 20 new questions. ${usedIds.size} questions have already been reserved for this year group.`, 'good');
    $('review-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    clearDraft();
    status('generate-status', error.message, 'error');
  } finally {
    busy = false;
    $('generate-button').disabled = false;
    $('regenerate-button').disabled = false;
  }
}

async function save() {
  if (!draft || busy || !$('approval').checked) return;
  busy = true;
  $('save-button').disabled = true;
  $('regenerate-button').disabled = true;
  status('save-status', 'Reserving the 20 question IDs in Cloudflare…');
  try {
    const result = await api('/v1/teacher/synoptic/publish', { method: 'POST', body: {
      confirm: true, cohort: $('cohort').value, title: $('assignment-title').value.trim(),
      dueDate: $('due-date').value, skills: [...selectedSkills], bankRevision,
      papers: { paper1: draft.paper1, paper2: draft.paper2 }
    } });
    draft = null;
    $('save-result').hidden = false;
    $('save-result').replaceChildren();
    addText('strong', `Saved: ${result.title}`, $('save-result'));
    addText('p', `Year ${result.cohort.slice(1)} · ${result.questionCount} questions · due ${result.dueDate}. Teacher-only: not yet available to pupils.`, $('save-result'));
    status('save-status', 'Assignment saved. These questions will not be reused in later homework.', 'good');
    $('approval').checked = false;
  } catch (error) {
    if (error.code === 409) {
      clearDraft();
      status('generate-status', error.message + ' Generate a new preview before saving.', 'error');
      $('generate-button').focus();
    } else {
      status('save-status', error.message, 'error');
    }
  } finally {
    busy = false;
    $('regenerate-button').disabled = false;
    $('save-button').disabled = true;
  }
}

function disconnect() {
  token = '';
  selectedSkills = new Set();
  usedIds = new Set();
  skillCatalog = [];
  $('teacher-token').value = '';
  $('connect-form').hidden = false;
  $('disconnect-button').hidden = true;
  $('workspace').hidden = true;
  clearDraft();
  status('access-status', 'Disconnected.');
}

async function connect(event) {
  event.preventDefault();
  if (busy) return;
  const candidate = $('teacher-token').value.trim();
  if (!candidate) return;
  busy = true;
  token = candidate;
  $('connect-button').disabled = true;
  status('access-status', 'Verifying teacher access…');
  try {
    const [usage, catalogResponse] = await Promise.all([
      api('/v1/teacher/synoptic/used?cohort=Y13'),
      fetch('/assets/j277-assignment-catalog.json', { cache: 'no-store' })
    ]);
    if (!catalogResponse.ok) throw new Error('Skills list could not be loaded.');
    const catalogue = await catalogResponse.json();
    skillCatalog = Array.isArray(catalogue.items) ? catalogue.items : [];
    if (!availableSkills().length) throw new Error('No Skills found for Year 13.');
    usedIds = new Set(usage.usedIds);
    $('connect-form').hidden = true;
    $('teacher-token').value = '';
    $('disconnect-button').hidden = false;
    $('workspace').hidden = false;
    renderSkills();
    status('access-status', 'Connected. Teacher access verified.', 'good');
  } catch (error) {
    disconnect();
    status('access-status', error.code === 401 ? 'Teacher token not recognised.' : error.message, 'error');
  } finally {
    busy = false;
    $('connect-button').disabled = false;
  }
}

$('due-date').min = todayUK();
$('due-date').value = defaultDueDate();
$('connect-form').addEventListener('submit', connect);
$('disconnect-button').addEventListener('click', disconnect);
$('cohort').addEventListener('change', () => {
  selectedSkills = new Set();
  $('skill-search').value = '';
  clearDraft();
  renderSkills();
  status('generate-status', '');
});
$('skill-search').addEventListener('input', renderSkills);
$('generate-button').addEventListener('click', generate);
$('regenerate-button').addEventListener('click', generate);
$('save-button').addEventListener('click', save);
$('approval').addEventListener('change', () => { $('save-button').disabled = !draft || !$('approval').checked || busy; });
for (const paper of ['paper1', 'paper2']) $(paper + '-tab').addEventListener('click', () => setPaper(paper));
