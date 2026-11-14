#!/usr/bin/env node
'use strict';

// Preview-only projection of the teacher-review Q2 bank. Never mark it published.
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'../..');
const bank=JSON.parse(fs.readFileSync(path.join(root,'data/do-now/q2-drafts/h446.json'),'utf8'));
if(bank.status!=='draft-never-loaded-by-classroom')throw Error('Not an H446 Q2 draft bank');
const preview={course:'h446',status:'review-preview-not-published',lessons:{}};
for(const [id,{draft}] of Object.entries(bank.lessons)){
  if(!draft.question||!draft.explanation||draft.options?.length!==4
     ||!Number.isInteger(draft.correctIndex)||draft.teacherApproved!==false)
    throw Error('Invalid preview entry L'+id);
  preview.lessons[id]={question:draft.question,options:draft.options,
    correctIndex:draft.correctIndex,explanation:draft.explanation,
    taughtIn:draft.taughtIn[0]};
}
const out=path.join(root,'data/do-now/q2-preview/h446.json');
fs.mkdirSync(path.dirname(out),{recursive:true});
fs.writeFileSync(out,JSON.stringify(preview,null,2)+'\n');
console.log('Prepared '+Object.keys(preview.lessons).length+' preview-only H446 Q2 questions; not live.');
