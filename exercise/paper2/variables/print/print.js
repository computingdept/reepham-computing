(function () {
  'use strict';
  const engine = window.J277Paper2Variables;
  const core = window.RHSCSkills;
  if (!engine || !core) return;
  const params = new URLSearchParams(window.location.search);
  const level = core.levelFromUrl();
  const answerMode = params.get('answers') === '1';
  // Stable seed means the teacher's separate key always matches the worksheet.
  const seed = /^[1-9]\d{0,8}$/.test(params.get('seed') || '') ? Number(params.get('seed')) : 4127;
  const qs = Array.from({length:10}, (_, i) => engine.makeQuestion(level, i, seed));
  const $ = id => document.getElementById(id);
  function make(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function questionText(q) {
    if (q.type === 'identify') return q.prompt.replace('Tap', 'Circle');
    if (q.type === 'tap-value') return 'Calculate the final value of ' + q.name + '.';
    return q.prompt;
  }
  function makeSheet(index, total) {
    const sheet = make('section', 'print-sheet');
    const head = make('header', 'print-head');
    const brand = make('div', 'print-brand');
    brand.append(make('span', '', 'RHS COMPUTING'), make('span', '', 'OCR J277 · PAPER 2 · SKILL 01'));
    head.append(brand, make('h1', '', 'Variables & Constants'));
    const meta = make('div', 'print-meta');
    meta.append(make('span', '', level[0].toUpperCase() + level.slice(1) + (answerMode ? ' · ANSWERS' : ' · PRACTICE')),
      make('span', '', 'OCR 2.2.1–2.2.2'));
    head.append(meta);
    if (!answerMode) head.append(make('div', 'print-student', 'Name: __________________________   Class: __________   Date: __________'));
    sheet.append(head);
    const main = make('div', 'print-main'); sheet.append(main);
    const foot = make('footer', 'print-foot');
    foot.append(make('span', '', 'rhsccs.org · Original classroom practice'),
      make('span', '', 'Page ' + (index + 1) + ' / ' + total));
    sheet.append(foot);
    $('pages').append(sheet);
    return main;
  }
  const perPage = answerMode ? (level === 'hard' ? 5 : 5) : (level === 'hard' ? 3 : 5);
  const total = Math.ceil(qs.length / perPage);
  for (let page = 0; page < total; page++) {
    const body = makeSheet(page, total);
    qs.slice(page * perPage, (page + 1) * perPage).forEach((q, index) => {
      const item = make('section', 'print-question');
      const n = page * perPage + index + 1;
      item.append(make('h2', '', n + '. ' + questionText(q)));
      if (q.code && q.code.length) item.append(make('pre', '', q.code.join('\n')));
      if (answerMode) {
        item.append(make('div', 'print-answer', q.model));
      } else if (q.type === 'identify') {
        item.append(make('div', 'print-work', 'Circle one name in the code above.'));
      } else if (q.type === 'write') {
        item.append(make('div', 'print-work lines'));
      } else {
        item.append(make('div', 'print-work', 'Answer: ________________________'));
      }
      body.append(item);
    });
  }
  function link(answers) {
    const q = new URLSearchParams({level, seed:String(seed)});
    if (answers) q.set('answers','1');
    return '?' + q.toString();
  }
  const linkNode = $('variant-link');
  linkNode.textContent = answerMode ? 'Student worksheet' : 'Answer key';
  linkNode.href = link(!answerMode);
  $('difficulty').value = level;
  $('difficulty').addEventListener('change', e => {
    const next = core.validLevel(e.target.value);
    const q = new URLSearchParams({level:next,seed:String(seed)});
    if (answerMode) q.set('answers','1');
    window.location.assign('?' + q.toString());
  });
  $('print').addEventListener('click', () => window.print());
})();
