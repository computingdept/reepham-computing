/* RHS Computing · OCR J277 1.3.2 Protocol Paths
   Original tap-based simulation for application protocols.
   All actions are simulated; no network request or email is sent. */
(function(root){
'use strict';
const named={
 SMTP:'Send outgoing email',
 IMAP:'Read and keep email in sync',
 POP:'Download email to one device',
 FTP:'Transfer files using FTP',
 HTTP:'Open an ordinary webpage',
 HTTPS:'Open a secure webpage'
};
const protocols=Object.keys(named);
const steps={
 send:{activity:'Send an email',from:'Email app',fromType:'laptop',to:'Outgoing mail server',toType:'server',protocol:'SMTP',
  why:'SMTP is used to send outgoing email.'},
 sync:{activity:'Read the same inbox on two devices',from:'Phone email app',fromType:'phone',to:'Mail server',toType:'server',protocol:'IMAP',
  why:'IMAP keeps the inbox synchronised between the mail server and devices.'},
 download:{activity:'Download email to this computer',from:'Computer email app',fromType:'laptop',to:'Mail server',toType:'server',protocol:'POP',
  why:'POP retrieves messages from the mail server to a device.'},
 upload:{activity:'Upload website files using an FTP client',from:'FTP client',fromType:'laptop',to:'File server',toType:'server',protocol:'FTP',
  why:'FTP is designed for transferring files. Traditional FTP does not provide encryption.'},
 public:{activity:'Open an ordinary (non-secure) webpage',from:'Web browser',fromType:'browser',to:'Web server',toType:'server',protocol:'HTTP',
  why:'HTTP transfers webpages without HTTPS encryption.'},
 secure:{activity:'Open a secure webpage or sign-in page',from:'Web browser',fromType:'browser',to:'Web server',toType:'server',protocol:'HTTPS',
  why:'HTTPS protects communication between the browser and web server using encryption.'}
};
const stories={
 easy:[
  {name:'Send and read an email',description:'A pupil sends a message and later checks their inbox on a phone.',keys:['send','sync']},
  {name:'Publish and view a website',description:'A teacher uploads website files, then a pupil opens the secure site.',keys:['upload','secure']},
  {name:'Download and reply to an email',description:'A pupil downloads email to a computer and sends a reply.',keys:['download','send']},
  {name:'Visit two webpages',description:'A pupil opens an ordinary webpage, then opens a secure sign-in page.',keys:['public','secure']}
 ],
 medium:[
  {name:'School message journey',description:'Follow a school update from sending to reading and opening a secure link.',keys:['send','sync','secure']},
  {name:'Website update journey',description:'A technician publishes files, checks a public webpage and sends a message.',keys:['upload','public','send']},
  {name:'Student work journey',description:'A student downloads email, replies and opens a secure learning portal.',keys:['download','send','secure']},
  {name:'Library computer journey',description:'A librarian visits a public site, uploads files and checks a synced mailbox.',keys:['public','upload','sync']}
 ],
 hard:[
  {name:'Email will not send',description:'One protocol in this journey is wrong.',keys:['send','sync','secure'],
   broken:0,wrong:'IMAP',effect:'The outgoing email cannot be sent using that email-retrieval protocol.'},
  {name:'Inbox will not sync',description:'A pupil wants changes to stay in sync between a phone and laptop.',keys:['send','sync','secure'],
   broken:1,wrong:'POP',effect:'The mailbox may not stay synchronised across the two devices.'},
  {name:'Website sign-in is not secure',description:'A student is about to enter a password on a school site.',keys:['upload','public','secure'],
   broken:2,wrong:'HTTP',effect:'The sign-in connection would not have HTTPS encryption.'},
  {name:'Website file upload fails',description:'The technician is using an FTP client to transfer website files.',keys:['upload','secure','send'],
   broken:0,wrong:'IMAP',effect:'The FTP client cannot perform its file transfer using an email protocol.'},
  {name:'Email cannot be downloaded',description:'An email app needs to download stored messages.',keys:['download','send','public'],
   broken:0,wrong:'SMTP',effect:'The email app cannot retrieve its stored messages using a sending protocol.'},
  {name:'Public webpage will not load',description:'The browser is requesting an ordinary webpage.',keys:['public','send','sync'],
   broken:0,wrong:'FTP',effect:'The browser is not using the web protocol for that webpage request.'}
 ]
};
function make(level,index){
 if(!Object.prototype.hasOwnProperty.call(stories,level))throw new RangeError('Invalid difficulty');
 const src=stories[level][index%stories[level].length];
 const path=src.keys.map(k=>Object.freeze({...steps[k]}));
 const p={type:'protocolpaths',level,index,title:src.name,description:src.description,path,
  prompt:src.name+': '+src.description,
  context:'OCR J277 1.3.2 · Simulated networks · No real communication',
  hint:'Think about the action: sending email, getting email, transferring a file, or requesting a web page.',
  choices:protocols,
  mode:level==='hard'?'repair':'build'
 };
 if(level==='hard'){
  p.broken=src.broken;p.wrong=src.wrong;p.expected=path[src.broken].protocol;
  p.effect=src.effect;
  p.impactOptions=stories.hard.map(x=>x.effect);
  p.why='Step '+(p.broken+1)+' needs '+p.expected+'. '+path[p.broken].why+' '+src.effect;
 }else{
  p.why=path.map((step,i)=>'Step '+(i+1)+': '+step.protocol+'. '+step.why).join(' ');
 }
 return p;
}
function node(tag,klass,content){
 const el=document.createElement(tag);if(klass)el.className=klass;
 if(content!==undefined)el.textContent=content;return el;
}
function icon(type){
 const el=document.createElementNS('http://www.w3.org/2000/svg','svg');
 el.setAttribute('viewBox','0 0 24 24');el.setAttribute('fill','none');
 el.setAttribute('stroke','currentColor');el.setAttribute('stroke-width','1.7');
 el.setAttribute('stroke-linecap','round');el.setAttribute('stroke-linejoin','round');
 el.setAttribute('aria-hidden','true');el.classList.add('protocol-icon');
 const art={
  laptop:'<rect x="4" y="4" width="16" height="13" rx="2"/><path d="M2 20h20M8 20l1-3m7 3-1-3"/>',
  browser:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
  phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  server:'<rect x="4" y="3" width="16" height="8" rx="2"/><rect x="4" y="13" width="16" height="8" rx="2"/><path d="M8 7h.01M8 17h.01M12 7h5M12 17h5"/>'
 };
 el.innerHTML=art[type]||art.server;return el;
}
function endpoint(label,type){
 const cell=node('div','protocol-endpoint');
 cell.append(icon(type),node('span','',label));return cell;
}
function render(p,host,isLocked,setReady){
 const state={
  phase:p.level==='easy'?'watch':p.mode,
  selected:p.path.map(()=>''),broken:null,repair:'',effect:''
 };
 const wrapper=node('div','protocol-board');
 wrapper.setAttribute('role','group');wrapper.setAttribute('aria-label','Build the communication path');
 wrapper.append(node('div','protocol-intro',p.description));
 const model=node('div','protocol-model');
 const modelHeading=node('div','protocol-heading','I DO · WATCH A PROTOCOL IN ACTION');
 const modelPath=node('div','protocol-model-path');
 const modelText=node('p','protocol-model-text');
 modelText.setAttribute('aria-live','polite');
 const next=node('button','protocol-primary','Next step');
 next.type='button';
 model.append(modelHeading,modelPath,modelText,next);
 const practice=node('div','protocol-practice');
 practice.append(node('div','protocol-heading',p.mode==='repair'?'FIND AND REPAIR THE INCORRECT STEP':'YOUR TURN · COMPLETE EACH ARROW'));
 const pathRows=node('div','protocol-rows');
 practice.append(pathRows);
 const footer=node('p','protocol-note','TCP/IP supports communication across networks. The cards show application protocols.');
 function displayStep(step,protocol,number){
  const box=node('div','protocol-row');
  box.append(node('div','protocol-task',number+'. '+step.activity));
  const link=node('div','protocol-link');
  const badge=node('div','protocol-badge',protocol||'Choose protocol');
  link.append(endpoint(step.from,step.fromType),node('span','protocol-arrow','→'),badge,node('span','protocol-arrow','→'),endpoint(step.to,step.toType));
  box.append(link);return {box,badge};
 }
 function renderBuild(){
  pathRows.replaceChildren();
  p.path.forEach((step,i)=>{
   const output=displayStep(step,state.selected[i],i+1),row=output.box;
   const picker=node('select','protocol-picker');picker.setAttribute('aria-label','Protocol for step '+(i+1)+': '+step.activity);
   const placeholder=node('option','','Choose protocol');placeholder.value='';picker.append(placeholder);
   for(const proto of p.choices){const opt=node('option','',proto+' — '+named[proto]);opt.value=proto;picker.append(opt)}
   picker.value=state.selected[i]||'';
   picker.disabled=!!isLocked();
   picker.addEventListener('change',()=>{
    if(isLocked())return;
    state.selected[i]=picker.value;output.badge.textContent=picker.value||'Choose protocol';
    output.badge.classList.toggle('selected',!!picker.value);
   });
   row.append(picker);pathRows.append(row);
  });
 }
 function renderRepair(){
  pathRows.replaceChildren();
  p.path.forEach((step,i)=>{
   const proto=i===p.broken?p.wrong:step.protocol;
   const output=displayStep(step,proto,i+1),row=output.box;
   const choose=node('button','protocol-repair-step'+(state.broken===i?' selected':''),state.broken===i?'Selected for repair':'This step is incorrect');
   choose.type='button';choose.disabled=!!isLocked();
   choose.setAttribute('aria-pressed',String(state.broken===i));
   choose.addEventListener('click',()=>{if(isLocked())return;state.broken=i;renderRepair()});
   row.append(choose);pathRows.append(row);
  });
  repairOptions.replaceChildren();
  for(const proto of p.choices){
   const b=node('button','protocol-choice'+(state.repair===proto?' selected':''),proto);
   b.type='button';b.setAttribute('aria-pressed',String(state.repair===proto));
   b.disabled=!!isLocked();
   b.addEventListener('click',()=>{if(isLocked())return;state.repair=proto;renderRepair()});
   repairOptions.append(b);
  }
  resultOptions.replaceChildren();
  const indices=[p.index%p.impactOptions.length,(p.index+2)%p.impactOptions.length,(p.index+4)%p.impactOptions.length];
  if(!indices.includes(p.index%p.impactOptions.length))throw Error('Effect index');
  // Always include this question's actual consequence plus two alternatives.
  const effects=[p.effect];
  for(const offset of [1,3,5]){
   const alt=p.impactOptions[(p.index+offset)%p.impactOptions.length];
   if(alt!==p.effect&&!effects.includes(alt)&&effects.length<3)effects.push(alt);
  }
  effects.forEach(text=>{
   const b=node('button','protocol-effect'+(state.effect===text?' selected':''),text);
   b.type='button';b.setAttribute('aria-pressed',String(state.effect===text));
   b.disabled=!!isLocked();
   b.addEventListener('click',()=>{if(isLocked())return;state.effect=text;renderRepair()});
   resultOptions.append(b);
  });
 }
 let repairOptions,resultOptions;
 if(p.mode==='repair'){
  const fixLabel=node('div','protocol-heading','REPLACE THE WRONG PROTOCOL WITH');
  repairOptions=node('div','protocol-choices');
  const effectLabel=node('div','protocol-heading','WHAT GOES WRONG?');
  resultOptions=node('div','protocol-effects');
  practice.append(fixLabel,repairOptions,effectLabel,resultOptions);
 }
 wrapper.append(model,practice,footer);host.append(wrapper);
 if(p.level==='easy'){
  let modelIndex=0;
  practice.hidden=true;setReady(false);
  function reveal(){
   const step=p.path[modelIndex];
   modelHeading.textContent='I DO · STEP '+(modelIndex+1)+' OF '+p.path.length;
   modelPath.replaceChildren(displayStep(step,step.protocol,modelIndex+1).box);
   modelText.textContent=step.why;
   next.textContent=modelIndex===p.path.length-1?'Now you try →':'Next step →';
  }
  reveal();
  next.addEventListener('click',()=>{
   if(isLocked())return;
   if(modelIndex<p.path.length-1){modelIndex++;reveal();}
   else{state.phase='build';model.hidden=true;practice.hidden=false;renderBuild();setReady(true)}
  });
 }else{
  model.hidden=true;state.phase=p.mode;
  if(p.mode==='repair')renderRepair();else renderBuild();
  setReady(true);
 }
 return state;
}
function isComplete(p,s){
 if(!s)return false;
 return p.mode==='repair'?(s.broken!==null&&!!s.repair&&!!s.effect):
  s.phase==='build'&&s.selected.length===p.path.length&&s.selected.every(Boolean);
}
function isCorrect(p,s){
 if(!isComplete(p,s))return false;
 return p.mode==='repair'?
  s.broken===p.broken&&s.repair===p.expected&&s.effect===p.effect:
  s.selected.every((proto,i)=>proto===p.path[i].protocol);
}
function feedback(p,s){
 if(!isComplete(p,s))return p.mode==='repair'?
  'Choose the incorrect step, select a replacement protocol and explain its consequence.':
  s&&s.phase==='watch'?'Watch each example before building the path.':
  'Choose a protocol for every arrow, then check your path.';
 if(p.mode==='repair')return 'Read the action at each step. Check the direction of the communication and what the incorrect protocol would prevent.';
 const errors=p.path.map((step,i)=>s.selected[i]===step.protocol?null:(i+1)).filter(Boolean);
 return 'Check step'+(errors.length===1?' ':'s ')+errors.join(', ')+'. '+errors.map(i=>p.path[i-1].why).join(' ');
}
root.J277ProtocolPaths=Object.freeze({make,render,isComplete,isCorrect,feedback,protocols});
})(window);
