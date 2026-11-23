/* RHS Computing · OCR J277 1.6.1 Legislation and Licences · original scenarios */
(function(root){
'use strict';
const label={
 dpa:'Data Protection Act 2018',cma:'Computer Misuse Act 1990',
 cdpa:'Copyright, Designs and Patents Act 1988',
 oss:'Open-source licence',prop:'Proprietary licence',lic:'Software licence (general)'
};
const E=[["A gym stores members’ names and addresses. Which law governs the way it uses this personal information?","dpa","Data protection law covers personal information about identifiable living people."],["A pupil guesses someone’s password and enters their account without permission.","cma","Unauthorised access may be a crime even when files are not altered."],["A designer copies protected artwork into an advert without permission or a relevant exception.","cdpa","Copyright generally controls copying of original creative work."],["A club wants to inspect and adapt a program’s source code under its licence terms.","oss","Open-source licences provide source access and permit modifications subject to conditions."],["A supplier sells a ready-made program but does not make its source code available to customers.","prop","Proprietary software generally restricts source-code access."],["A clinic accidentally publishes identifiable patient records.","dpa","Personal data must be processed securely and lawfully."],["A student deliberately installs malware on another user’s computer without authorisation.","cma","Unauthorised interference with computer systems is covered by the Computer Misuse Act."],["Someone distributes unauthorised copies of a protected computer game.","cdpa","Software is copyright-protected; copying and distributing it usually needs permission."],["An organisation wants to know how many computers it may install an application on.","lic","The software licence states permitted installations and uses."],["A school collects far more personal details than it needs to enrol pupils.","dpa","Data minimisation requires organisations to limit personal data to what is necessary."]],M=[["A sports club asks for passport numbers although it only needs emergency contacts.","dpa","Which principle matters most?",["Collect everything for possible future use","Collect only what is necessary for the stated purpose","Keep every record permanently","Publish the register"],1,"Data minimisation limits collection to information needed for a particular purpose."],["An employee opens a colleague’s private payroll account without permission, but changes nothing.","cma","What makes this a concern?",["The law applies only when money is stolen","Access without authorisation may itself be an offence","Only posting files online can be unlawful","The law applies only to malware"],1,"Unauthorised access can be an offence without theft or modification."],["A studio copies another artist’s original game sprites and publishes them without permission or a relevant exception.","cdpa","What is the most appropriate response?",["Credit the author; permission is unnecessary","Use anything found online","Seek permission or choose appropriately licensed/original sprites","Rename every file"],2,"Attribution is not a substitute for a licence or applicable legal exception."],["A school needs to adapt software to work with an unusual accessibility device.","oss","What is a likely advantage?",["It guarantees free maintenance","It can allow the source code to be modified","Nobody owns the copyright","It bans all redistribution"],1,"Open-source licensing normally allows inspection and modification subject to conditions."],["A small clinic needs a ready-to-use booking system and has no programmers on staff.","prop","Which factor supports this choice?",["Proprietary products cannot fail","A supplier may provide maintenance and support","Customers automatically own the code","All proprietary products are free"],1,"An off-the-shelf proprietary product may offer support, but real contracts and costs need checking."],["A company collected emails for receipts and now wants to use them for unrelated adverts.","dpa","What should the company check?",["A valid lawful basis, transparency and any relevant marketing requirements","Only the length of the email address","Whether printers are installed","Whether the advert uses a logo"],0,"A change of purpose requires careful assessment; consent is not the only possible lawful basis under data-protection law."],["A student uses a program to deliberately disrupt school computers without authorisation.","cma","Which statement is most accurate?",["Only logging in can be unlawful","The law also covers unauthorised acts impairing computers","The law applies only to images","Any disruptive code is always legal"],1,"The Computer Misuse Act covers unauthorised interference as well as unauthorised access."],["An illustrator finds their original artwork copied and sold without authorisation or an exception.","cdpa","Which right is most relevant?",["Control of restricted uses such as copying the work","Ownership of every similar idea","Ability to prevent anyone viewing art","Control of all public opinions"],0,"Copyright protects original expression, not all general ideas."],["A pupil changes code under an open-source licence and wants to redistribute the result.","oss","What should the pupil do?",["Assume open source has no conditions","Check notices, attribution and any redistribution conditions","Avoid reading the licence","Only change the file extension"],1,"Open-source licences often include conditions that apply when modified software is shared."],["A firm buys twenty software seats but installs the application on fifty devices.","lic","What must the firm check?",["The colour of the application icon","The allowed users, devices and licensing terms","The screen size","Whether the internet is fast"],1,"A software licence defines the extent of permission to install and use a program."]],H=[["A hospital app tracks users’ locations all day although it only needs locations when appointments are booked.","dpa","Which design is best justified?",["Keep all tracking because storage is cheap","Collect location when needed, explain the purpose and use an appropriate lawful basis","Publish locations to be transparent","Disable all security"],1,"Purpose limitation, transparency, lawful processing and data minimisation support only collecting what is needed."],["A technician is authorised to test School A’s network and decides to run the same tests on School B.","cma","Which conclusion is sound?",["Permission to test A also covers B","Using standard tools makes it legal","School B needs to authorise tests of its own systems","It is legal whenever no files are copied"],2,"Authorisation for one network does not transfer to another; unauthorised access can still be an offence."],["A film club streams a song legally, then adds it to its public promotional video without checking permission.","cdpa","What should it do?",["Assume listening rights include reuse rights","Assume short clips are always free","Obtain the necessary permission or use music licensed for the video","Change the music’s filename"],2,"Lawful listening does not automatically allow copying music into a public video."],["A charity has volunteer developers and must adapt booking software to an unusual workflow.","oss","What is the strongest recommendation?",["Consider open source for customisation while budgeting for support and licence compliance","Open source has no maintenance costs","Open source is never protected by copyright","Customisation always requires proprietary software"],0,"Open source may allow adaptation, but security, maintenance and licence obligations still matter."],["A surgery has no internal programming team, but can afford supported appointment software.","prop","Which is most defensible?",["Choose it because proprietary software never fails","Choose supported proprietary software if features, costs and vendor terms fit","Choose it because it has freely modifiable source code","Assume all open-source products are unusable"],1,"Supplier support can be valuable, but licensing costs and vendor dependence are trade-offs."],["A school claims privacy rules apply only to names in databases, not identifying photographs.","dpa","What is the correct response?",["Identifiable photographs may be personal data","Images are always exempt","Only information printed on paper is protected","Every school photo must be published"],0,"Personal data can include images that identify living people, not only names."],["A developer knowingly supplies malware intended to impair another organisation’s systems.","cma","What is the best legal explanation?",["Only physically opening a computer is covered","Unauthorised impairment and certain tools used for computer misuse can be covered","It is always only a copyright problem","Any connected program is malware"],1,"The Computer Misuse Act includes offences concerning unauthorised interference and certain tools for misuse."],["A competitor makes a different maze game using its own code and artwork, but a similar general idea.","cdpa","Which conclusion is strongest?",["Every similar game infringes copyright","Copyright protects original expression rather than every broad idea","Original game ideas can never be reused","Using a maze proves source code was copied"],1,"Code, art and other original expression can be protected; a broad game idea alone is not the same thing."],["A council plans to share modified software under an open-source licence that imposes redistribution conditions.","oss","What should it assess?",["Open source means no legal obligations","Whether those conditions match its redistribution and maintenance plans","Whether the program has a colourful icon","Whether the code is longer than fifty lines"],1,"Different open-source licences have different conditions; check the actual terms before redistributing."],["A business subscribes to closed-source graphics software, then wants to copy it onto every freelancer’s device.","prop","What should the manager do?",["Assume one account permits unlimited users","Check user and device permissions; buy more licences if needed","Copy it because the company owns computers","Ignore supplier terms"],1,"A proprietary subscription normally gives limited permissions governed by its terms, not unlimited copying rights."]];
const el=(tag,cls,content)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(content!==undefined)x.textContent=content;return x;};
function make(level,i){
 const r=(level==='easy'?E:level==='medium'?M:H)[i%10];
 const p={type:'legislationbuilder',level,index:i,prompt:r[0],a:r[1],context:'OCR J277 · 1.6.1 · '+(level==='easy'?'Recall':level==='medium'?'Apply':'Exam challenge')};
 if(level==='easy'){p.why=r[2];p.hint='Identify whether the issue concerns personal data, unauthorised access, creative work or a software licence.';}
 else{p.second={question:r[2],options:r[3],correct:r[4]};p.why=r[5];p.hint='Which explanation actually applies to the specific scenario?';}
 return p;
}
const facts=[
 ['DATA PROTECTION ACT 2018','Personal data · UK GDPR','Protects identifiable people’s data under the UK GDPR and DPA 2018. Key principles: lawfulness/fairness/transparency, purpose limitation, data minimisation, accuracy, storage limitation, security and accountability.','Consent is not always required; other lawful bases exist.'],
 ['COMPUTER MISUSE ACT 1990','Access · interference','Addresses unauthorised computer access and unauthorised acts that impair operation. Permission matters even without theft.','Permission to test one network does not authorise another.'],
 ['COPYRIGHT, DESIGNS AND PATENTS ACT 1988','Original creative work','Protects original expression such as artwork, music, writing and source code. Copying or distribution can require permission or a lawful exception.','Finding work online, or crediting the author, does not automatically grant reuse rights.'],
 ['SOFTWARE LICENCES','Open source · proprietary','A licence sets permitted use, copying, modification and sharing. Open source normally permits source access and changes; proprietary software typically restricts them.','Open source can impose licence conditions and require support costs; proprietary products may include vendor support.']
];
function knowledge(){
 const d=el('details','law-knowledge');
 d.append(el('summary','law-knowledge-toggle','Knowledge first · Four key areas'));
 const grid=el('div','law-knowledge-grid');
 facts.forEach(f=>{const c=el('section','law-knowledge-card');
 c.append(el('h3','',f[0]),el('strong','law-mini',f[1]),el('p','',f[2]),el('p','law-caution',f[3]));grid.append(c);});
 d.append(grid);return d;
}
function isComplete(p,s){return !!s&&s.a!==''&&(!p.second||s.b>=0);}
function isCorrect(p,s){return isComplete(p,s)&&s.a===p.a&&(!p.second||s.b===p.second.correct);}
function render(p,host,isLocked,setReady){
 host.classList.add('law-answer-host');
 const board=el('div','law-board'),s={a:'',b:-1};
 const k=knowledge();k.open=false;board.append(k);
 board.append(el('p','law-step-label','STEP 1 · Identify the most relevant law or licence'));
 const options=el('div','law-options'),aButtons=[];
 const ids=Object.keys(label);
 ids.push(...ids.splice(0,(p.index*2+(p.level==='hard'?1:0))%ids.length));
 ids.forEach(id=>{
  const b=el('button','law-option',label[id]);b.type='button';b.setAttribute('aria-pressed','false');
  b.addEventListener('click',()=>{if(isLocked())return;s.a=id;
   aButtons.forEach(x=>{const selected=x.id===id;x.b.classList.toggle('selected',selected);x.b.setAttribute('aria-pressed',String(selected));});
   setReady(isComplete(p,s));});
  aButtons.push({id,b});options.append(b);
 });board.append(options);
 if(p.second){
  const title=el('div','law-step-two');
  title.append(el('strong','law-step-label','STEP 2 · '+(p.level==='hard'?'Justify your judgement':'Apply the knowledge')),el('p','',p.second.question));
  board.append(title);
  const reasons=el('div','law-options law-reasons'),buttons=[];
  const choices=p.second.options.map((t,id)=>({t,id}));
  choices.push(...choices.splice(0,(p.index*3+(p.level==='hard'?2:1))%choices.length));
  choices.forEach(o=>{
   const b=el('button','law-option',o.t);b.type='button';b.setAttribute('aria-pressed','false');
   b.addEventListener('click',()=>{if(isLocked())return;s.b=o.id;
    buttons.forEach(x=>{const yes=x.id===o.id;x.b.classList.toggle('selected',yes);x.b.setAttribute('aria-pressed',String(yes));});
    setReady(isComplete(p,s));});
   buttons.push({id:o.id,b});reasons.append(b);
  });board.append(reasons);
 }
 board.append(el('p','law-footnote','Check your answer to see a worked explanation. In Easy and Medium you can retry once.'));
 host.append(board);setReady(false);return s;
}
function feedback(p,s){
 if(!isComplete(p,s))return 'Choose an answer for every step first.';
 if(s.a!==p.a)return 'Reconsider the main issue: personal data, unauthorised access, original work or a software licence?';
 return 'You have identified the area. Now find the explanation that fits these particular facts.';
}
function reveal(p,s,host){
 const board=host.querySelector('.law-board'),box=el('section','law-model');
 box.setAttribute('aria-label','Model answer');
 box.append(el('strong','law-step-label','MODEL ANSWER'),el('h3','',label[p.a]));
 if(p.second)box.append(el('p','law-reason',p.second.options[p.second.correct]));
 box.append(el('p','',p.why));
 if(!isCorrect(p,s))box.append(el('small','','Compare this explanation with your choices before continuing.'));
 board.append(box);
 host.querySelectorAll('.law-option').forEach(b=>b.disabled=true);
}
const rules=[
 '.law-answer-host{max-width:850px!important;width:100%;min-height:0!important;display:block!important}',
 '.law-board{width:100%}.law-knowledge{border:1px solid #cbded4;border-radius:12px;background:#f3f9f5;margin:0 0 17px;overflow:hidden}',
 '.law-knowledge-toggle{cursor:pointer;font-size:14px;font-weight:850;color:#265847;padding:12px 14px}',
 '.law-knowledge-grid{padding:0 10px 10px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}',
 '.law-knowledge-card{background:white;border:1px solid #d6e5da;border-radius:9px;padding:11px}',
 '.law-knowledge-card h3{font-size:12px;letter-spacing:.04em;color:#285348;margin:0 0 5px}',
 '.law-knowledge-card p{font-size:12px;line-height:1.43;margin:8px 0;color:#435d52}',
 '.law-knowledge-card .law-caution{color:#785a36;border-top:1px solid #eee4d4;padding-top:7px}',
 '.law-step-label{font-size:12px!important;letter-spacing:.04em;font-weight:850;color:#246449;margin:0 0 9px}',
 '.law-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}',
 '.law-option{min-height:50px;background:white;color:#254a68;border:1px solid #c9d8e9;border-radius:11px;padding:12px 13px;text-align:left;font-size:13px;font-weight:750;line-height:1.42}',
 '.law-option.selected{background:#e7f2ff;border:2px solid #2464a9;padding:11px 12px}',
 '.law-option:hover:not(:disabled){background:#f4f9ff;border-color:#799dc4}',
 '.law-option:disabled{opacity:1;cursor:default}',
 '.law-step-two{border-top:1px solid #dbe6e0;margin:18px 0 10px;padding-top:14px}',
 '.law-step-two p{font-size:17px;font-weight:800;line-height:1.4;color:#173e59;margin:4px 0 0}',
 '.law-reasons .law-option{min-height:70px}',
 '.law-footnote{font-size:12px;color:#607484;margin:13px 0 0}',
 '.law-model{background:#edf8f1;border:1px solid #b5dac3;border-radius:12px;padding:14px 15px;margin-top:16px}',
 '.law-model h3{font-size:18px;color:#16513a;margin:5px 0}',
 '.law-model p{font-size:14px;line-height:1.5;color:#355a45;margin:7px 0}',
 '.law-model .law-reason{font-weight:850;color:#24614a}',
 '.law-model small{display:block;color:#586d5d;margin-top:7px}',
 '@media(max-width:700px){.law-knowledge-grid,.law-options{grid-template-columns:1fr}.law-step-two p{font-size:16px}}'
];
const style=document.createElement('style');style.textContent=rules.join('\n');document.head.append(style);
root.J277LegislationSkill=Object.freeze({make,render,isComplete,isCorrect,feedback,reveal});
})(window);
