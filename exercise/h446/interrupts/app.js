'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);let prompt,code,headers,rows;
 const devices=["Printer","Disk controller","Network adapter","Keyboard"],device=devices[n%4];
 if(focus==="sequence"){
 const seq=["Accept interrupt at instruction boundary","Save processor context","Locate and execute ISR","Acknowledge device and update status","Restore context and resume"];
 const rotate=(a,k)=>a.slice(k).concat(a.slice(0,k));
 prompt="Place the interrupt handling stages in order.";code=`${device} signals completion or input.\nAssume the interrupt is enabled and accepted, and the same task resumes.`;
 const count=l===0?3:5,chosen=l===0?[seq[1],seq[2],seq[4]]:seq;chosen.forEach((s,i)=>add(`Stage ${i+1}`,s,rotate(chosen,(n+i)%count)));
 chosen.forEach((s,i)=>ex(`Stage ${i+1}`,s,s===seq[1]?"Preserve the interrupted task's register state and return address.":s===seq[4]?"Continue using the saved state.":"Follow the accepted interrupt handling sequence."));
 if(l===2)add("Reason to use interrupts rather than repeated polling","CPU can do other work",["CPU can do other work","Device never needs an ISR","All interrupts execute simultaneously"]);
 }else if(focus==="context"){
 const pc=40+n%30,acc=10+n%15,isr=200+n%20,isrAcc=acc+3,mar=80+n%20;
 prompt="Trace context saving and restoration.";code=`Next instruction PC = ${pc}\nACC = ${acc}; MAR = ${mar}\nThe interrupt is accepted between instructions.\nISR begins at ${isr} and changes ACC to ${isrAcc}.\nAssume the ISR preserves all interrupted register state, and no context switch occurs.`;
 add("Saved return PC",pc);add("PC at ISR entry",isr);add("ACC after ISR returns",acc);if(l>=1)add("PC after restoration",pc);if(l===2)add("MAR after restoration",mar);
 ex("Save context",`PC=${pc}, ACC=${acc}, MAR=${mar}`,"The interrupted task must retain its state.");ex("Run ISR",`PC=${isr}; ACC becomes ${isrAcc}`,"ISR execution uses the processor.");ex("Restore",`PC=${pc}, ACC=${acc}, MAR=${mar}`,"The original task resumes at the next instruction, not at the ISR address.");
 }else if(focus==="priority"){
 const jobs=devices.slice(0,3+l%2).map((name,i)=>({name,priority:1+(i+n)%4,masked:l===2&&i===n%3}));
 if(l===1)jobs[1].priority=jobs[0].priority;
 const pending=jobs.filter(j=>!j.masked).sort((a,b)=>b.priority-a.priority||a.name.localeCompare(b.name));
 prompt="Select interrupts using the stated priority rule.";code="All requests are pending at an instruction boundary.\nLarger number = higher priority.\nEqual priorities: alphabetical device name first.\nMasked interrupts remain pending but are not serviced.\nAssume no new requests, no nesting; each ISR clears its own request.";
 headers=["Device","Priority","Masked?"];rows=jobs.map(j=>[j.name,String(j.priority),j.masked?"Yes":"No"]);
 add("First ISR",pending[0].name,jobs.map(j=>j.name));if(l>=1)add("Second ISR",pending[1].name,jobs.map(j=>j.name));if(l===2)add("Device still pending after eligible ISRs",jobs.find(j=>j.masked).name,jobs.map(j=>j.name));
 pending.forEach((j,i)=>ex("Service "+(i+1),j.name,`Eligible priority ${j.priority}; resolve ties using the stated rule.`));if(l===2)ex("Masked request",jobs.find(j=>j.masked).name,"Not eligible until unmasked.");
 }else throw Error("Focus");
 return {prompt,code,headers,rows,labels,answers,options,steps,hint:"Accept an eligible interrupt, save state, execute the ISR, then restore state. Priority depends on the specified system policy.",model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"sequence":"ISR sequence","context":"Save & restore context","priority":"Interrupt priority"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"sequence",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the scenario before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>(question.labels[i].includes("bits")?e.value.replace(/[\s,]/g,"")===question.answers[i]:normal(e.value).toLowerCase()===normal(question.answers[i]).toLowerCase()));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
