#!/usr/bin/env node
'use strict';

// Read-only content check of the source lesson for each proposed H446 Q2.
// Produces a teacher-facing GitHub report; does not connect the bank to lessons
// or claim to establish that a concept was taught correctly.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const bank = JSON.parse(fs.readFileSync(path.join(root,'data/do-now/q2-drafts/h446.json'),'utf8'));
const migration = JSON.parse(fs.readFileSync(path.join(root,'data/do-now/migration/h446-source.json'),'utf8'));
const reportPath = path.join(root,'docs/h446-do-now-q2-source-audit.md');

const decode = s => s
  .replace(/&amp;/gi,'&').replace(/&lt;/gi,'<').replace(/&gt;/gi,'>')
  .replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'")
  .replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)));
const stripped = html => decode(html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
  // A Do Now is retrieval rather than teaching evidence for its host lesson.
  .replace(/<section\b[^>]*id=["']do-now["'][^>]*>[\s\S]*?<\/section>/gi,' ')
  .replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').toLowerCase();
function containsToken(text,token){
  const escaped=token.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  return new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`,'u').test(text);
}
const rows=[];
const counts={diagnostic:0,keyword:0,check:0};
for(const [id,lesson] of Object.entries(bank.lessons).sort((a,b)=>Number(a[0])-Number(b[0]))){
  const draft=lesson.draft;
  const answer=draft.options[draft.correctIndex];
  const source=draft.taughtIn?.[0];
  if(source==='GCSE'){
    counts.diagnostic++;
    rows.push({id,source,title:'Prior GCSE learning',answer,question:draft.question,status:'Entry diagnostic'});
    continue;
  }
  const sourceId=source.slice(1);
  const taught=migration.lessons[sourceId];
  if(!taught)throw Error(`Unknown proposed source ${source} for L${id}`);
  if(Number(sourceId)>=Number(id)-1)throw Error(`Invalid chronology ${source} -> L${id}`);
  if(Number(id)<=160&&Number(sourceId)>=181)throw Error(`Year 13 source used by Year 12 L${id}`);
  const htmlPath=path.join(root,taught.source);
  if(!fs.existsSync(htmlPath))throw Error(`Missing source lesson HTML ${taught.source}`);
  const text=stripped(fs.readFileSync(htmlPath,'utf8'));
  const hit=containsToken(text,answer);
  counts[hit?'keyword':'check']++;
  rows.push({id,source,title:taught.title.replace(/^.*?Lesson \d+ · /,'').replace(/ · Ready$/,''),
    answer,question:draft.question,status:hit?'Keyword present':'Check content'});
}
const lines=[
  '# H446 Do Now Q2 — source-lesson evidence audit',
  '',
  '> GitHub teacher-review document only. **This is not a published question bank or teacher approval.**',
  '',
  `- Total Q2 drafts: **${rows.length}**.`,
  `- Earlier-lesson pages containing the proposed answer as a separate token: **${counts.keyword}**.`,
  `- Source pages without a direct answer-token match: **${counts.check}** (manual check).`,
  `- GCSE-entry diagnostics: **${counts.diagnostic}** (L001–L002).`,
  '',
  'A keyword hit is **only a quick evidence screen**, not proof of good teaching',
  'or of the question’s correctness. It may occur in vocabulary or other content.',
  'The automated check excludes Do Now sections and executable scripts.',
  'Each source must still be checked against the content actually taught.',
  'The existing H446 Q1, Q3 and Q4, shared CSS, and all live lessons are unchanged.',
  '',
  '## Questions needing a closer source-content check',
  '',
  '| Q2 lesson | Proposed source | Question | Answer | Source lesson title |',
  '|---|---|---|---|---|',
  ...rows.filter(r=>r.status==='Check content').map(r=>
    `| L${r.id} | [${r.source}](../lessons/h446/lesson-${r.source.slice(1)}/index.html) | ${r.question.replace(/\|/g,'\\|')} | ${r.answer.replace(/\|/g,'\\|')} | ${r.title.replace(/\|/g,'\\|')} |`),
  '',
  '## Complete source-reference checklist',
  '',
  '| Q2 lesson | Proposed taught-in lesson | Topic | Correct answer | Evidence screen |',
  '|---|---|---|---|---|',
  ...rows.map(r=>`| L${r.id} | ${r.source==='GCSE'?'GCSE entry':`[${r.source}](../lessons/h446/lesson-${r.source.slice(1)}/index.html)`} | ${r.title.replace(/\|/g,'\\|')} | ${r.answer.replace(/\|/g,'\\|')} | ${r.status} |`),
  '',
  'After manual checking, record individual teacher decisions in GitHub.',
  'Do not equate this automated evidence screen with sign-off for publication.',
  ''
];
fs.writeFileSync(reportPath,lines.join('\n'));
console.log(JSON.stringify({total:rows.length,...counts,report:path.relative(root,reportPath)}));
