/* RHS Computing · GCSE J277 DNS and Web Request Journey (offline).
   Simplified four-stage teaching model. DNS returns an address, not a webpage. */
(function(root){
'use strict';
const sites=['www.library.example','www.school.example','www.museum.example','www.sports.example','www.theatre.example','www.archive.example','www.weather.example','www.club.example'];
const base=[
 {id:'ask',title:'Browser asks DNS for the website’s IP address',short:'Find the address',focus:'dns',
  explain:'Your browser knows the website name. It asks DNS to find the IP address for that name.'},
 {id:'found',title:'DNS returns the IP address',short:'Get the address',focus:'dns',
  explain:'DNS replies with the IP address. DNS does not send the webpage.'},
 {id:'request',title:'Browser sends a secure web request (HTTPS)',short:'Request the page',focus:'browser',
  explain:'The browser uses the IP address to send an HTTPS request for the webpage.'},
 {id:'forward',title:'Router forwards the request towards the web server',short:'Forward the request',focus:'router',
  explain:'Routers help the request travel across networks towards the website’s web server.'},
 {id:'page',title:'Web server sends the webpage back to the browser',short:'Receive the page',focus:'server',
  explain:'The web server returns the webpage data. The browser can display the page.'}
];
const issues=[
 {fault:'dns',title:'DNS is not responding',
  impact:'The browser cannot find the IP address for the website name.',
  repair:'Check the DNS service or DNS settings.',
  explain:'DNS finds the address. If DNS does not reply, the browser may not know where to send the web request.'},
 {fault:'router',title:'The router has lost its network connection',
  impact:'The web request cannot travel to the web server.',
  repair:'Restore the router or network connection.',
  explain:'The browser has the address, but the network cannot carry its request to the web server.'},
 {fault:'server',title:'The web server is not responding',
  impact:'The requested webpage cannot be sent back.',
  repair:'Restore the web server or website service.',
  explain:'DNS and routing can work, but if the web server is unavailable the page cannot be returned.'}
];
function seed(n){return function(){n|=0;n=n+0x6D2B79F5|0;let t=Math.imul(n^n>>>15,1|n);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
function mixed(items,index){
 const xs=items.slice(),r=seed(997*index+919);
 for(let i=xs.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[xs[i],xs[j]]=[xs[j],xs[i]];}
 if(xs.length>1&&xs.every((x,i)=>x.id===items[i].id))xs.push(xs.shift());
 return xs;
}
function make(level,index){
 if(!['easy','medium','hard'].includes(level))throw new RangeError('Invalid difficulty');
 const domain=sites[(index*3+(level==='medium'?1:level==='hard'?2:0))%sites.length];
 const p={type:'dnsjourney',mode:level,domain,
  context:'How the internet works · GCSE J277 1.3 · Simplified journey',
  hint:'DNS finds the IP address. The browser requests the page. Routers forward packets. The web server sends the page back.'};
 if(level==='hard'){
  p.issue=issues[index%issues.length];
  p.impacts=issues.map(x=>({id:x.fault,title:x.impact}));
  p.repairs=issues.map(x=>({id:x.fault,title:x.repair}));
  p.prompt='A student cannot load '+domain+'. Follow the journey and explain what happens.';
  p.why=p.issue.explain+' A suitable repair is: '+p.issue.repair;
 }else{
  p.steps=level==='easy'?[base[0],base[1],base[2],base[4]]:base.slice();
  p.options=mixed(p.steps.concat(level==='medium'?[
   {id:'wrong-page',title:'DNS sends the whole webpage to the browser'},
   {id:'wrong-email',title:'The browser uses email to request the webpage'}
  ]:[]),index+(level==='easy'?80:170));
  p.prompt='What happens when you enter '+domain+' in a browser?';
  p.why=p.steps.map((x,i)=>(i+1)+'. '+x.title).join(' → ')+'. DNS finds an address; it does not send the webpage.';
 }
 return p;
}
function node(type,cls,words){
 const e=document.createElement(type);if(cls)e.className=cls;
 if(words!==undefined)e.textContent=words;return e;
}
function icon(name){
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');
 svg.setAttribute('stroke-width','1.7');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');
 svg.setAttribute('aria-hidden','true');svg.classList.add('dns-visual-icon');
 const drawings={
  browser:'<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 21h8M12 18v3"/>',
  dns:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a17 17 0 0 1 0 18M12 3a17 17 0 0 0 0 18"/>',
  router:'<rect x="3" y="10" width="18" height="9" rx="2"/><path d="M7 7l4-4m0 0L9 4m2-1v5M17 7l-4-4m0 0 2 1m-2-1v5M7 15h.01M11 15h.01"/>',
  server:'<rect x="4" y="3" width="16" height="8" rx="2"/><rect x="4" y="13" width="16" height="8" rx="2"/><path d="M8 7h.01M8 17h.01M12 7h5M12 17h5"/>'
 };
 svg.innerHTML=drawings[name];return svg;
}
function renderMap(board,focus,failed){
 const graphic=node('div','dns-visual');
 const line1=node('div','dns-visual-line');
 const line2=node('div','dns-visual-line');
 function card(name,label){
  const e=node('div','dns-visual-node'+(focus===name?' active':'')+(failed===name?' failed':''));
  e.append(icon(name),node('strong','',label));return e;
 }
 line1.append(card('browser','Browser'),node('span','dns-visual-arrow','↔'),card('dns','DNS server'));
 line2.append(card('browser','Browser'),node('span','dns-visual-arrow','→'),card('router','Router'),node('span','dns-visual-arrow','→'),card('server','Web server'));
 graphic.append(line1,node('div','dns-visual-divider','Find address · then request webpage'),line2);
 board.append(graphic);
 return function setFocus(which,broken){
  for(const c of graphic.querySelectorAll('.dns-visual-node')){
   const isFocus=c.querySelector('strong').textContent===({dns:'DNS server',router:'Router',server:'Web server',browser:'Browser'}[which]||'');
   c.classList.toggle('active',!!which&&isFocus);
   c.classList.toggle('failed',!!broken&&isFocus);
  }
 };
}
function render(p,target,isLocked,setReady){
 const state={phase:p.mode==='easy'?'watch':'build',sequence:[],impact:'',repair:''};
 const board=node('div','dns-learning-board');
 board.setAttribute('role','group');board.setAttribute('aria-label','How a website loads');
 const site=node('div','dns-website');
 site.append(node('span','dns-website-label','YOU TYPE IN THE BROWSER'),node('strong','',p.domain));
 board.append(site);
 const diagram=node('div','dns-visual-wrap');board.append(diagram);
 const setFocus=renderMap(diagram,'',p.mode==='hard'?p.issue.fault:'');
 if(p.mode==='hard'){
  setReady(true);
  const problem=node('div','dns-problem');
  problem.append(node('strong','','Problem: '+p.issue.title),node('span','','Think: what happens next, and what would you fix?'));
  board.append(problem);
  function pickBlock(title,choices,key){
   const heading=node('div','dns-section-title',title);
   const row=node('div','dns-reason-options');
   for(const item of choices){
    const btn=node('button','dns-reason-btn',item.title);
    btn.type='button';btn.setAttribute('aria-pressed','false');
    btn.addEventListener('click',()=>{
     if(isLocked())return;
     state[key]=item.id;
     for(const b of row.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b===btn));
    });
    row.append(btn);
   }
   board.append(heading,row);
  }
  pickBlock('1. What happens because of this fault?',p.impacts,'impact');
  pickBlock('2. What is the best next action?',p.repairs,'repair');
 }else{
  let modelStep=0;
  const watch=node('div','dns-model');
  const label=node('div','dns-model-label','I DO · WATCH THE JOURNEY');
  const explanation=node('p','dns-model-explain');
  explanation.setAttribute('aria-live','polite');
  const next=node('button','dns-main-button');
  next.type='button';
  watch.append(label,explanation,next);board.append(watch);
  const activity=node('div','dns-build');
  const instructions=node('p','dns-build-instructions',p.mode==='easy'?
    'YOUR TURN · Tap each step in the correct order. Tap a numbered box to undo it.':
    'YOU DO · Choose the real steps in order. Two cards do not belong in the journey.');
  const slots=node('div','dns-learning-slots');
  const available=node('div','dns-learning-options');
  activity.append(instructions,slots,node('div','dns-section-title','CHOOSE THE NEXT STEP'),available);
  board.append(activity);
  function draw(){
   slots.replaceChildren();available.replaceChildren();
   const expected=p.steps.length;
   for(let i=0;i<expected;i++){
    const selected=state.sequence[i],e=node('button','dns-learning-slot'+(selected?' chosen':''));e.type='button';
    const number=node('b','',String(i+1));
    const line=node('span','',selected?p.steps.concat(p.options).find(x=>x.id===selected).title:
      (p.mode==='easy'?['Ask DNS','Get IP address','Request webpage','Receive webpage'][i]:'Tap a step'));
    e.append(number,line);
    e.setAttribute('aria-label',selected?'Remove step '+(i+1)+': '+line.textContent:'Empty step '+(i+1));
    e.disabled=!selected||!!isLocked();
    if(selected)e.addEventListener('click',()=>{
     if(isLocked())return;state.sequence.splice(i,1);draw();
    });
    slots.append(e);
   }
   for(const step of p.options){
    if(state.sequence.includes(step.id))continue;
    const b=node('button','dns-learning-choice',step.title);b.type='button';
    b.disabled=state.sequence.length>=expected||!!isLocked();
    b.addEventListener('click',()=>{if(isLocked()||state.sequence.length>=expected)return;state.sequence.push(step.id);draw();});
    available.append(b);
   }
  }
  function reveal(){
   label.textContent='I DO · STEP '+(modelStep+1)+' OF '+p.steps.length;
   explanation.textContent=p.steps[modelStep].explain;
   setFocus(p.steps[modelStep].focus,false);
   next.textContent=modelStep===p.steps.length-1?'Now you try →':'Next step →';
  }
  if(p.mode==='easy'){
   activity.hidden=true;
   setReady(false);
   reveal();
   next.addEventListener('click',()=>{
    if(isLocked())return;
    if(modelStep<p.steps.length-1){modelStep++;reveal();}
    else{
     state.phase='build';watch.hidden=true;activity.hidden=false;setFocus('',false);setReady(true);draw();
    }
   });
  }else{
   watch.hidden=true;state.phase='build';setReady(true);draw();
  }
 }
 board.append(node('p','dns-learning-note','DNS finds the IP address. Your browser requests the webpage.'));
 target.append(board);
 return state;
}
function isComplete(p,s){
 if(!s)return false;
 if(p.mode==='hard')return !!s.impact&&!!s.repair;
 return s.phase==='build'&&s.sequence.length===p.steps.length;
}
function isCorrect(p,s){
 if(!isComplete(p,s))return false;
 if(p.mode==='hard')return s.impact===p.issue.fault&&s.repair===p.issue.fault;
 return s.sequence.every((x,i)=>x===p.steps[i].id);
}
function feedback(p,s){
 if(!isComplete(p,s))return p.mode==='hard'?
   'Choose what happens because of the fault and how to fix it.':
   s&&s.phase==='watch'?'Watch each step first, then build the journey.':'Fill all the numbered steps before checking.';
 return p.mode==='hard'?
  'Think about the role of the highlighted component: DNS finds the address, the router forwards packets, and the web server sends back the page.':
  'Try again: DNS finds the IP address before the browser requests the page. The webpage comes from the web server, not DNS.';
}
root.J277DnsJourney=Object.freeze({make,render,isComplete,isCorrect,feedback});
})(window);
