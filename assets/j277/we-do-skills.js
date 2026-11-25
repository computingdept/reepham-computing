/* J277 We Do Skills pilot. Only operates inside #we-do, using existing lesson controller. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.J277WeDoSkills=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const pilots={
 "p1:netperformance":{"task":"Several pupils use the school network. Some connect by cable and others by Wi-Fi. Compare the factors that affect their connection.","predict":"Which connection is more suitable for a moving tablet? What may slow a shared connection?","focus":[0,1,2],"questions":["What is bandwidth?","What may happen when more devices transfer data at the same time?","How do wired and wireless connections differ in stability and mobility?"],"check":"Explain why a wireless device may have a slower transfer rate when moved farther from an access point.","answer":"Distance, obstacles and interference can weaken the wireless signal, reducing its achievable data rate."},
 "p1:address":{"task":"Identify the three address formats and explain the jobs of MAC and IP addresses.","predict":"Look for the difference between decimal numbers separated by dots and hexadecimal groups.","focus":[0,1,2,3],"questions":["What kind of address identifies a network interface locally?","Which address uses four decimal groups separated by dots?","Which IP version uses hexadecimal groups separated by colons?","Why do we need both MAC and IP addresses?"],"check":"Explain the difference between a MAC address and an IP address.","answer":"A MAC address identifies a network interface on the local link. An IP address is a logical network address used to deliver packets between networks."},
 "p1:protocol":{"task":"A pupil opens a secure school webpage. Identify the protocols that help find the server, transfer data and protect the connection.","predict":"Which protocol protects communication with the web server?","focus":[0,1,2,3],"questions":["What service resolves the website name?","Which transport protocol provides reliable ordered delivery?","Which protocol protects the web request?","Which protocol provides packet addressing for routing?"],"check":"What is the difference between HTTP and HTTPS?","answer":"Both transfer web content. HTTPS uses encryption to protect the connection between the browser and web server."},
 "p1:protocol:standards":{"task":"Devices from different manufacturers connect to the school network. Explain why agreed standards and layers matter.","predict":"How can different devices understand one another when they communicate?","focus":[1,3,4],"questions":["Which transport protocol provides reliable ordered delivery?","What is IP responsible for?","Which shared standards support wired and wireless local links?"],"check":"Why are agreed network standards important?","answer":"Standards define compatible rules and formats, allowing devices and software from different manufacturers to communicate. Layers separate responsibilities such as transport, addressing and local links."},

 "p1:hardware":{"task":"A laptop connects to a school network and requests a webpage hosted on another network. Identify the hardware that carries and protects its traffic.","predict":"Which device connects the laptop to the network? Which device connects different networks?","focus":[0,1,2,3],"questions":["Which component connects the laptop to the network?","Which device forwards frames within the LAN?","Which device forwards packets between networks?","Which device filters traffic using rules?"],"check":"Explain the difference between a switch and a router.","answer":"A switch forwards frames within a local network using MAC addresses. A router forwards IP packets between networks."},
 "p1:dns":{"task":"A pupil enters library.example in a browser, then accesses a saved file held online. Follow the requests.","predict":"What information must the browser obtain before it can contact the website?","focus":[0,1,2,3,4],"questions":["What does the browser initially know?","What does DNS return?","What does the browser send after resolving the address?","What does the server return?","Where is a cloud file stored, and what is needed to access it?"],"check":"Does DNS return the webpage itself?","answer":"No. DNS resolves the domain name to an IP address. The browser requests the webpage from a web server. Cloud storage holds files on remote servers."},
 "p1:topology":{"task":"A school compares a star network with a partial mesh. Think about connections, failures and cost.","predict":"What happens if a connection fails? What if the central switch fails?","focus":[0,1,2],"questions":["How are devices connected in a star?","How might a mesh provide another route if a link fails?","What is the trade-off between resilience and cost?"],"check":"Why can a mesh be more resilient than a star?","answer":"Alternative paths may allow communication to continue after a link fails. A star relies on its central switch, while a mesh usually requires more links."},
 "p2:while-until":{"task":"Trace the WHILE loop. Predict whether each condition is true and what the program prints.","predict":"Write the output on your mini-whiteboard. What must change for the loop to stop?","check":"Why does the loop stop when i reaches 4?","answer":"The condition i < 4 is False when i = 4. A WHILE loop checks the condition before executing its body."},

 'p1:netmodels':{
  task:'A school shares files using a central server. A small club shares files directly between four laptops. Compare the two models.',
  predict:'Which group benefits from central management? What happens if the device holding a file is switched off?',
  focus:[2,3,4],
  questions:['Which model lets a central computer provide files and manage accounts?','What is different when laptops share files directly?','Does the geographical size of a network determine its sharing model?'],
  check:'Why might a school choose client-server rather than peer-to-peer?',
  answer:'Central management of accounts, permissions and backups is easier. A server needs maintenance and may become a point of failure without redundancy.'
 },
 'p2:for-loops':{
  task:'Trace the FOR loop. Predict the next value of i and what is printed.',
  predict:'Write the predicted output on your mini-whiteboard. Be ready to explain how many times the loop runs.',
  check:'How many iterations does FOR i = 2 TO 4 perform?',
  answer:'Three iterations: i = 2, 3, 4. The upper bound is included.'
 }
};
function prepare(config,paper1,paper2){
 const rule=pilots[config.variant?config.id+':'+config.variant:config.id];if(!rule)return null;
 if(config.id.startsWith('p1:')){
  const d=paper1?.get(config.id.slice(3));if(!d)return null;
  return {...rule,steps:rule.focus.map((i,j)=>({title:d.steps[i][0],value:d.steps[i][1],explanation:d.steps[i][2],question:rule.questions[j]}))};
 }
 const d=paper2?.make(config.id.slice(3),{level:'easy'});if(!d)return null;
 return {...rule,lines:d.lines,columns:d.columns,steps:d.steps.map((s,i)=>({line:s[0],value:s[1],result:s[2],explanation:s[3],question:config.id==='p2:while-until'?(s[0]===1?'What is the initial value of i?':s[0]===2?'Is the condition true?':s[0]===3?'What value is printed now?':s[0]===4?'What is the new value of i?':'Which line runs next?'):(i===0?'What value does i start with?':s[0]===2?'What is printed now?':s[0]===3?'What is the next counter value?':'Will the loop body run again?')}))};
}
function install(config,doc=document,win=window){
 const page=doc.getElementById('we-do');if(!page||page.dataset.skillPilot==='true')return false;
 let model;try{model=prepare(config,win.RHSCPaper1GuidedDemo,win.J277SkillsGuidedExamples);}catch(e){return false;}
 if(!model?.steps?.length)return false;
 const deck=page.querySelector('.wedo-focus-deck');if(!deck)return false;
 const el=(tag,cls,txt)=>{const n=doc.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n;};
 const panel=(name)=>el('div',name);
 function example(hidden=false){const a=el('article','wedo-example skill-wedo-example');a.hidden=hidden;const reference=panel('wedo-reference'),practice=panel('wedo-practice');a.append(reference,practice);return{a,reference,practice};}
 const first=example();
 first.reference.append(el('span','phase-tag','WE DO · '+config.title.toUpperCase()),el('h2','','Work it out together'),el('p','skill-wedo-task',model.task));
 const codeLines=[];
 if(model.lines){
  const code=el('div','skill-wedo-code');code.setAttribute('aria-label','OCR Exam Reference Language');
  model.lines.forEach((line,i)=>{const row=el('div','skill-wedo-code-line');row.append(el('span','skill-wedo-line-no',String(i+1)),el('code','',line));code.append(row);codeLines.push(row);});first.reference.append(code);
 }
 first.reference.append(el('p','skill-wedo-predict',model.predict));
 const prompt=el('div','skill-wedo-before');
 prompt.append(el('span','wedo-step-label','PREDICT · MINI-WHITEBOARDS'),el('h2','','Your prediction'),el('p','',model.steps[0].question));first.practice.append(prompt);
 const steps=[];
 model.steps.forEach((s,i)=>{
  const step=el('div','wedo-step skill-wedo-step');step.hidden=true;
  step.append(el('span','wedo-step-label','STEP '+(i+1)+' OF '+model.steps.length));
  if(model.lines){
   step.append(el('h2','','Trace the current line'));
   const table=el('table','skill-wedo-trace'),head=el('tr'),body=el('tr');
   model.columns.forEach(c=>head.append(el('th','',c)));body.append(el('td','',s.value),el('td','',s.result));table.append(head,body);step.append(table);
  }else{step.append(el('h2','',s.title),el('div','skill-wedo-result',s.value));}
  step.append(el('p','',s.explanation));
  if(i<model.steps.length-1)step.append(el('p','skill-wedo-next-prediction','Predict next: '+model.steps[i+1].question));
  first.practice.append(step);steps.push(step);
 });
 const yourTurn=example(true);
 yourTurn.reference.append(el('span','phase-tag','YOUR TURN · SKILL PRACTICE'),el('h2','',config.title),el('p','','Open the Skill on your device. Choose the level your teacher sets, and practise the method independently.'));
 const link=el('a','skill-wedo-launch','Practise '+config.title+' →');link.href=config.url;link.target='_blank';link.rel='noopener';yourTurn.reference.append(link);
 const original=el('a','skill-wedo-original','Original guided practice');original.href='?we-do=original#we-do';yourTurn.reference.append(original);
 yourTurn.practice.append(el('span','phase-tag','CLASS CHECK'),el('h2','','Before we move on'),el('p','',model.check));
 const check=el('div','wedo-step skill-wedo-step');check.hidden=true;check.append(el('span','wedo-step-label','MODEL ANSWER'),el('p','skill-wedo-result',model.answer));yourTurn.practice.append(check);
 // Original lesson remains available with ?we-do=original; preserve it on failure.
 deck.replaceChildren(first.a,yourTurn.a);page.dataset.skillPilot='true';page.dataset.guidedSteps='true';page.classList.remove('j277-code-model-phase');
 function sync(){const active=steps.findIndex(s=>!s.hidden);prompt.hidden=active>=0;codeLines.forEach((r,i)=>r.classList.toggle('active',active>=0&&model.steps[active].line===i+1));}
 const obs=new win.MutationObserver(sync);steps.forEach(s=>obs.observe(s,{attributes:true,attributeFilter:['hidden']}));sync();
 return true;
}
return {prepare,install};
});
