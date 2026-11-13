"use strict";

/* Reproducible *source snapshots*, never a lesson rewrite or live bank update.
   Preserve legacy Q1–Q4 and model answers for teacher-led migration. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const out = path.join(root, 'data/do-now/migration');
const checkOnly = process.argv.includes('--check');

const entities = {
  amp:'&', lt:'<', gt:'>', quot:'"', apos:"'", nbsp:' ', times:'×',
  ndash:'–', mdash:'—', hellip:'…', le:'≤', ge:'≥', ne:'≠', rarr:'→',
  larr:'←', rsquo:'’', lsquo:'‘', ldquo:'“', rdquo:'”', bull:'•', deg:'°'
};
function decode(value) {
  return value.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (full, code) => {
    if (code[0] === '#') {
      const num = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2),16) : Number(code.slice(1));
      return Number.isInteger(num) && num >= 0 && num <= 0x10ffff ? String.fromCodePoint(num) : full;
    }
    return entities[code.toLowerCase()] ?? full;
  });
}
const clean = value => decode(String(value)
  .replace(/<(?:br|hr)\b[^>]*\/?\s*>/gi, ' ')
  .replace(/<\/(?:p|div|pre|li|h\d)>/gi, ' ')
  .replace(/<[^>]*>/g, ' '))
  .replace(/\s+/g, ' ').trim();

function getDoNow(html) {
  const start = html.search(/<section\b[^>]*\bid=["']do-now["'][^>]*>/i);
  if (start < 0) return null;
  const opener = html.slice(start).match(/^<section\b[^>]*>/i)[0];
  const rest = html.slice(start + opener.length);
  const end = rest.search(/<\/section\s*>/i);
  return end < 0 ? null : rest.slice(0, end);
}
function extractArticles(section, name) {
  const re = new RegExp(`<article\\b[^>]*class=["'][^"']*\\b${name}\\b[^"']*["'][^>]*>([\\s\\S]*?)<\\/article\\s*>`, 'gi');
  return [...section.matchAll(re)].map(match => match[1]);
}
function getTitle(html, fallback) {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return match ? clean(match[1]) : fallback;
}
function extractLegacyLesson(file, id, course) {
  const html = fs.readFileSync(file, 'utf8');
  const section = getDoNow(html);
  if (!section) return {error:'No Do Now section'};
  const cards = extractArticles(section, 'donow-question');
  const reviews = extractArticles(section, 'donow-review-answer');
  if (cards.length !== 4 || reviews.length !== 4)
    return {error:`Expected four question/answer pairs; found ${cards.length}/${reviews.length}`};
  const questions = cards.map((card, index) => {
    const heading = card.match(/<strong\b[^>]*>([\s\S]*?)<\/strong>/i);
    const body = heading ? card.replace(heading[0], '') : card;
    const answer = reviews[index].match(/<p\b[^>]*class=["'][^"']*\breview-answer\b[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
    const explanation = reviews[index].match(/<p\b[^>]*class=["'][^"']*\breview-explain\b[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
    const fallback = reviews[index].replace(/<span\b[^>]*class=["'][^"']*\breview-label\b[^"']*["'][^>]*>[\s\S]*?<\/span>/i, '');
    return {
      id:`${course.toUpperCase()}-${id}-Q${index+1}`,
      label:heading ? clean(heading[1]) : `Question ${index+1}`,
      originalQuestion:clean(body),
      originalQuestionHtml:body.trim(),
      originalAnswer:clean(answer ? answer[1] : fallback),
      originalExplanation:explanation ? clean(explanation[1]) : '',
      originalAnswerHtml:reviews[index].trim()
    };
  });
  return {title:getTitle(html, `${course} ${id}`), source:path.relative(root,file), questions};
}
function writeSnapshot(course, lessons, exceptions, input) {
  const output = {
    schemaVersion:'synergy-do-now-source-snapshot/1', course,
    status:'unpublished-extraction-for-teacher-review', input,
    warning:'Not a reviewed bank. Do not load in classroom, Catch Up or Print.',
    lessons, exceptions
  };
  const target = path.join(out, `${course}-source.json`);
  const content=JSON.stringify(output,null,2)+'\n';
  if (checkOnly) {
    if (!fs.existsSync(target) || fs.readFileSync(target,'utf8')!==content)
      throw new Error(`${path.relative(root,target)} is out of date; rerun collect-legacy.cjs`);
  } else {
    fs.mkdirSync(out,{recursive:true});
    fs.writeFileSync(target,content);
  }
  console.log(`DO_NOW_SOURCE ${JSON.stringify({course,lessons:Object.keys(lessons).length,exceptions:exceptions.length,file:path.relative(root,target)})}`);
}

const j277 = require('../../lessons/j277/donow-bank-20261020.json');
const j277Lessons = {};
for (const [id, lesson] of Object.entries(j277.lessons)) {
  j277Lessons[id] = {
    title:lesson.questions[0]?.lesson_title || `J277 lesson ${id}`,
    source:'lessons/j277/donow-bank-20261020.json',
    questions:lesson.questions.map(q=>({
      id:q.question_id, label:q.role, originalQuestion:q.question,
      originalOptions:q.options, originalAnswer:q.answer,
      originalExplanation:q.explanation,
      sourceRefs:q.source_lesson ? [q.source_lesson] : [],
      specPoints:q.spec_points || []
    }))
  };
}
writeSnapshot('j277',j277Lessons,[], 'Existing reviewed retrieval bank, captured without changes');

const h446Lessons = {};
const h446Issues = [];
const h446Dir = path.join(root,'lessons/h446');
for (const dir of fs.readdirSync(h446Dir,{withFileTypes:true}).filter(d=>d.isDirectory() && /^lesson-\d{3}$/.test(d.name)).sort((a,b)=>a.name.localeCompare(b.name))) {
  const file=path.join(h446Dir,dir.name,'index.html');
  if (!fs.existsSync(file)) continue;
  const result=extractLegacyLesson(file,dir.name.slice(-3),'h446');
  if (result.error)h446Issues.push({lesson:dir.name.slice(-3),reason:result.error,source:path.relative(root,file)});
  else h446Lessons[dir.name.slice(-3)]=result;
}
writeSnapshot('h446',h446Lessons,h446Issues,'Extracted from live lesson HTML; taught-sequence references need teacher review');

const ks3Lessons = {};
const ks3Issues = [];
for (const year of [7,8,9]) {
  const folder = path.join(root,`lessons/year${year}`);
  if (!fs.existsSync(folder)) continue;
  for (const dir of fs.readdirSync(folder,{withFileTypes:true}).filter(d=>d.isDirectory() && /^lesson-\d{3}$/.test(d.name)).sort((a,b)=>a.name.localeCompare(b.name))) {
    const file=path.join(folder,dir.name,'index.html');
    if (!fs.existsSync(file)) continue;
    const key=`y${year}-${dir.name.slice(-3)}`;
    const result=extractLegacyLesson(file,key,'ks3');
    if (result.error)ks3Issues.push({lesson:key,reason:result.error,source:path.relative(root,file)});
    else ks3Lessons[key]=result;
  }
}
writeSnapshot('ks3',ks3Lessons,ks3Issues,'Canonical KS3 lessons only; do not treat legacy previews as approved');
