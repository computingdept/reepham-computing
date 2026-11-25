'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);let prompt,code,headers,rows;
 if(focus==="clock"){
 const ghz=2+n%3,cycles=ghz*(2+n%5)*1e9,other=ghz*2;prompt="Calculate ideal processor execution time.";code=`Processor A: ${ghz} GHz.\nWorkload: ${cycles/1e9} billion clock cycles.\nAssume constant clock speed and the same cycle count on both processors.`;
 add("A: billions of cycles per second",ghz);add("A: time in seconds",cycles/(ghz*1e9));ex("Clock rate",`${ghz} × 10^9 cycles/s`,"GHz means billions of cycles per second.");ex("Execution time",String(cycles/(ghz*1e9))+" s","Divide required cycles by cycles per second.");
 if(l>=1){code+=`\nProcessor B: ${other} GHz.`;add("B: time in seconds",cycles/(other*1e9));ex("Compare B",String(cycles/(other*1e9))+" s","The equal-cycle assumption is essential.");}if(l===2)add("Does twice the clock rate always halve real runtime?","No",["Yes","No"]);
 }else if(focus==="cores"){
 const cores=2+n%4,jobs=cores*(2+l)+(l===0?0:1+n%2),duration=2+n%4,waves=Math.ceil(jobs/cores);
 prompt="Schedule equal independent jobs on identical cores.";code=`${jobs} jobs, ${duration} seconds each, ${cores} identical cores.\nOne job occupies one core. All jobs ready at time zero; no overhead or shared-resource contention.`;
 headers=["Core",...Array.from({length:waves},(_,i)=>"Wave "+(i+1))];rows=Array.from({length:cores},(_,i)=>["Core "+(i+1),...Array.from({length:waves},(_,j)=>j*cores+i<jobs?"Job "+(j*cores+i+1):"Idle")]);
 add("Number of waves",waves);add("Ideal parallel time (seconds)",waves*duration);ex("Waves",`ceil(${jobs}/${cores}) = ${waves}`,"A partial final wave still takes one job duration.");ex("Time",`${waves} × ${duration} = ${waves*duration}`,"Jobs within one wave overlap.");
 if(l>=1)add("One-core time (seconds)",jobs*duration);if(l===2){add("Unused job slots",waves*cores-jobs);ex("Unused capacity",String(waves*cores-jobs),"The final wave may not fill every core.");}
 }else if(focus==="cache"){
 const accesses=20+l*10,misses=2+n%7,hits=accesses-misses,hitTime=2,missTime=20+n%5;
 prompt="Compare memory access costs in a simplified cache model.";code=`${accesses} accesses: ${misses} misses, all others hits.\nEach hit takes ${hitTime} cycles. Each miss takes ${missTime} cycles total (including lookup).\nAssume accesses are serial.`;
 add("Number of cache hits",hits);add("Total access cycles",hits*hitTime+misses*missTime);ex("Hits",`${accesses} − ${misses} = ${hits}`,"A hit finds the requested data in cache.");ex("Total",`${hits} × ${hitTime} + ${misses} × ${missTime} = ${hits*hitTime+misses*missTime}`,"Use the stated total miss cost.");
 if(l>=1)add("Cycles if every access were a miss",accesses*missTime);if(l===2)add("Cycles saved compared with all misses",hits*(missTime-hitTime));
 }else if(focus==="isa"){
 const a=3+n%7,b=4+n%6,ciscCycles=4+n%3,riscCycles=4;prompt="Trace a simplified load/store instruction sequence.";code=`Memory[A]=${a}; Memory[B]=${b}.\nLOAD R1,A\nLOAD R2,B\nADD R3,R1,R2\nSTORE C,R3\nAssume each of these instructions takes one cycle. A separate complex instruction ADDMEM C,A,B takes ${ciscCycles} cycles.`;
 add("R3 after ADD",a+b);add("Memory[C] after STORE",a+b);ex("Load",`R1=${a}; R2=${b}`,"Move operands to registers.");ex("Operate and store",String(a+b),"The ALU adds the values; store writes the result.");
 if(l>=1){add("Load/store sequence cycles",riscCycles);add("Complex instruction cycles",ciscCycles);ex("Compare cycles",`${riscCycles} vs ${ciscCycles}`,"Instruction count alone does not determine time.");}if(l===2)add("Does a smaller instruction count guarantee faster execution?","No",["Yes","No"]);
 }else if(focus==="gpu"){
 const scenarios=[["Apply the same filter to millions of independent pixels","GPU","Many similar independent operations suit throughput-oriented parallel hardware."],["Execute a strictly sequential chain of dependent operations","CPU","Extra parallel lanes cannot remove dependencies."],["Run several independent general-purpose applications","Multicore CPU","Multiple CPU cores may execute independent threads."],["Coordinate device I/O and program control while a GPU renders images","CPU","The CPU coordinates general-purpose control and I/O."]];
 const sel=Array.from({length:l+1},(_,i)=>scenarios[(n+i)%4]);prompt="Choose the most appropriate processing hardware.";code=sel.map((c,i)=>`${i+1}. ${c[0]}`).join("\n\n");sel.forEach((c,i)=>{add("Scenario "+(i+1),c[1],["GPU","CPU","Multicore CPU"]);ex("Scenario "+(i+1),c[1],c[2]);});
 }else throw Error("Focus");
 return {prompt,code,headers,rows,labels,answers,options,steps,hint:"Separate clock rate, cycle count, cache access cost, instruction set and available parallelism.",model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"clock":"Clock rate & time","cores":"Multicore timing","cache":"Cache calculations","isa":"RISC & CISC","gpu":"GPU & processor choice"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"clock",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the given example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows.map(r=>[r[0],...r.slice(1).map(()=>"?")]),question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length?example.rows:example.rows.map(r=>[r[0],...r.slice(1).map(()=>"?")]),example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>normal(e.value).toLowerCase()===normal(question.answers[i]).toLowerCase());inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
