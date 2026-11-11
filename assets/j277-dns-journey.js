/* RHS Computing — OCR J277 DNS & Web Request Journey.
   Original offline simulations. All .example names and 203.0.113.x addresses
   are fictional documentation examples; no network requests are performed. */
(function(root){
'use strict';
const sites=[
 {name:'library.example',ip:'203.0.113.18'},
 {name:'museum.example',ip:'203.0.113.42'},
 {name:'school.example',ip:'203.0.113.67'},
 {name:'sports.example',ip:'203.0.113.90'},
 {name:'portal.example',ip:'203.0.113.125'},
 {name:'theatre.example',ip:'203.0.113.144'},
 {name:'weather.example',ip:'203.0.113.173'},
 {name:'archive.example',ip:'203.0.113.206'}
];
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;}}
function shuffle(original,seed){
 const a=original.slice(),rand=rng(seed);
 for(let i=a.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));const v=a[i];a[i]=a[j];a[j]=v}
 return a;
}
function make(level,index,previous=null){
 if(!['easy','medium','hard'].includes(level))throw new RangeError('Unknown difficulty');
 const site=sites[(index*3+(level==='medium'?1:level==='hard'?2:0))%sites.length];
 const p={
  type:'dnsjourney',level,index,domain:site.name,ip:site.ip,
  context:'Offline simulation · Fictional domain and IP address · OCR J277 1.3',
  hint:'DNS translates a domain name into an IP address. The web browser—not DNS—requests the page from the web server.'
 };
 if(level==='hard'){
  const faults=['dns','route','web'],fault=faults[index%3];
  const repairs={dns:'repair-dns',route:'repair-route',web:'repair-web'};
  p.mode='diagnose';p.fault=fault;p.fix=repairs[fault];
  p.prompt='The browser cannot load '+site.name+'. Run diagnostic checks, identify the failure and select a repair.';
  p.tests=[
   {id:'dns',label:'DNS lookup',
    outcome:fault==='dns'?'No response from the DNS server.':'DNS returned '+site.ip+'.'},
   {id:'route',label:'Reachability to known IP',
    outcome:fault==='route'?'Traffic cannot reach '+site.ip+'.':'The network can reach '+site.ip+'.'},
   {id:'web',label:'HTTPS at known IP',
    outcome:fault==='route'?'Cannot connect: destination unreachable.':
     fault==='web'?'Web server responds: 503 Service Unavailable.':'Web service responds successfully.'}
  ];
  p.why=fault==='dns'?
    'DNS did not answer, but the server works using its known IP address. Repair: check the DNS service or client DNS settings.':
    fault==='route'?
    'DNS returned the correct IP, but traffic cannot reach it. Repair: check the router or network connection.':
    'DNS and network reachability work, but the HTTPS service is unavailable. Repair: restore the web server or HTTPS service.';
  return p;
 }
 const steps=[
  {id:'enter',title:'Enter '+site.name+' in the browser'},
  {id:'query',title:'Browser asks DNS for the IP address'},
  {id:'answer',title:'DNS returns '+site.ip},
  {id:'https',title:'Browser sends an HTTPS request to '+site.ip},
  {id:'router',title:'Router forwards request packets towards the server'},
  {id:'response',title:'Web server sends the page response'}
 ];
 p.mode='sequence';
 const chosen=level==='easy'?steps.slice(1,4).concat(steps[5]):steps;
 p.steps=chosen;
 p.correctIds=chosen.map(x=>x.id);
 p.extras=level==='easy'?[]:[
  {id:'wrong-dns',title:'DNS sends the full webpage to the browser'},
  {id:'wrong-smtp',title:'SMTP fetches the website from the server'}
 ];
 p.options=shuffle(chosen.concat(p.extras),index*917+(level==='easy'?11:41)+site.ip.length);
 p.guides=level==='easy'?['Find the address','Receive the address','Request the page','Receive the page']:null;
 p.prompt='Build the web request journey for '+site.name+'.';
 p.why='Correct journey: '+chosen.map(x=>x.title).join(' → ')+'. DNS returns an IP address; it does not deliver webpage content.';
 return p;
}
function isComplete(p,s){
 return p.mode==='sequence'?s.sequence.length===p.correctIds.length:
  s.tests.length>=2&&!!s.fault&&!!s.fix;
}
function isCorrect(p,s){
 if(!isComplete(p,s))return false;
 return p.mode==='sequence'?
  s.sequence.every((id,i)=>id===p.correctIds[i]):
  s.fault===p.fault&&s.fix===p.fix;
}
function feedback(p,s){
 if(!isComplete(p,s))return p.mode==='sequence'?
  'Complete every step of the journey before checking.':
  'Run at least two tests, choose the faulty stage and select a repair.';
 if(isCorrect(p,s))return p.why;
 return p.mode==='sequence'?
  'Check the order: DNS resolves the name to an IP; the browser uses that address to request the website. DNS never sends the webpage.':
  'Read the test results again. Can DNS resolve the name, can the network reach the known IP, and does HTTPS work?';
}
function node(tag,className,content){
 const n=document.createElement(tag);if(className)n.className=className;
 if(content!==undefined)n.textContent=content;return n;
}
function render(p,host,isLocked){
 const state={sequence:[],tests:[],fault:'',fix:''};
 const board=node('div','dns-board');
 board.setAttribute('role','group');board.setAttribute('aria-label','DNS web request interactive practice');
 const intro=node('div','dns-scenario');
 intro.append(node('strong','','Website: '+p.domain),node('span','','Example server IP: '+p.ip));
 board.append(intro);
 if(p.mode==='sequence'){
  const hint=node('p','dns-instruction',p.level==='easy'?
    'Tap the cards in the order they happen. The four numbered slots help you build the journey.':
    'Choose the six real stages in order. Two cards are distractors. Tap a filled slot to remove it.');
  board.append(hint);
  const slots=node('div','dns-slots');slots.setAttribute('aria-label','Your selected journey');
  const bank=node('div','dns-bank');bank.setAttribute('aria-label','Available stages');
  const slotHeading=node('div','dns-heading','YOUR JOURNEY');
  const bankHeading=node('div','dns-heading','AVAILABLE STAGES');
  board.append(slotHeading,slots,bankHeading,bank);
  function redraw(){
   slots.replaceChildren();bank.replaceChildren();
   for(let i=0;i<p.correctIds.length;i++){
    const btn=node('button','dns-slot'+(state.sequence[i]?' filled':''),'');
    btn.type='button';btn.disabled=!state.sequence[i]||!!isLocked();
    const number=node('b','dns-slot-number',String(i+1));
    const content=node('span','dns-slot-text',state.sequence[i]?
      p.steps.concat(p.extras).find(x=>x.id===state.sequence[i]).title:
      (p.guides?p.guides[i]:'Choose step '+(i+1)));
    btn.append(number,content);
    if(state.sequence[i])btn.setAttribute('aria-label','Remove step '+(i+1)+': '+content.textContent);
    else btn.setAttribute('aria-label','Empty step '+(i+1));
    if(state.sequence[i])btn.addEventListener('click',()=>{
     if(isLocked())return;state.sequence.splice(i,1);redraw();
    });
    slots.append(btn);
   }
   for(const step of p.options){
    if(state.sequence.includes(step.id))continue;
    const btn=node('button','dns-option',step.title);
    btn.type='button';btn.disabled=state.sequence.length>=p.correctIds.length||!!isLocked();
    btn.addEventListener('click',()=>{
     if(isLocked()||state.sequence.length>=p.correctIds.length)return;
     state.sequence.push(step.id);redraw();
    });
    bank.append(btn);
   }
  }
  redraw();
 }else{
  const msg=node('p','dns-instruction','Run at least two checks. The known server IP lets you test connectivity even if DNS is failing.');
  board.append(msg);
  const tests=node('div','dns-tests');
  for(const test of p.tests){
   const card=node('div','dns-test');
   const name=node('strong','',test.label);
   const button=node('button','dns-test-run','Run test');
   button.type='button';
   const outcome=node('span','dns-test-outcome','Not tested');
   outcome.setAttribute('aria-live','polite');
   button.addEventListener('click',()=>{
    if(isLocked())return;
    if(!state.tests.includes(test.id))state.tests.push(test.id);
    outcome.textContent=test.outcome;
    outcome.classList.add('tested');
    button.textContent='Test run';button.disabled=true;
   });
   card.append(name,button,outcome);tests.append(card);
  }
  board.append(node('div','dns-heading','DIAGNOSTIC CHECKS'),tests);
  function choices(title,choices,key){
   const heading=node('div','dns-heading',title),group=node('div','dns-diagnostic-choices');
   for(const [value,label] of choices){
    const btn=node('button','dns-option dns-diagnostic-option',label);
    btn.type='button';btn.setAttribute('aria-pressed','false');
    btn.addEventListener('click',()=>{
     if(isLocked())return;
     state[key]=value;
     group.querySelectorAll('button').forEach(b=>{
      b.setAttribute('aria-pressed',String(b===btn));
     });
    });
    group.append(btn);
   }
   board.append(heading,group);
  }
  choices('WHERE IS THE FAILURE?',[
   ['dns','DNS resolution'],['route','Router / network'],['web','Web server / HTTPS']
  ],'fault');
  choices('CHOOSE THE REPAIR',[
   ['repair-dns','Check DNS service/settings'],
   ['repair-route','Check router and network link'],
   ['repair-web','Restore the web/HTTPS service']
  ],'fix');
 }
 const foot=node('p','dns-note','Simulated network · No real DNS lookups or website requests');
 board.append(foot);host.append(board);
 return state;
}
root.J277DnsJourney=Object.freeze({make,render,isComplete,isCorrect,feedback});
})(window);
