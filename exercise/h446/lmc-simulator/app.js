'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),a=2+n%7,b=1+(n*3)%8,labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);};
 let source,input=[],prompt="Trace the program and predict the output.",missing=null;
 if(focus==="instructions"){
 source=l===0?["INP","ADD K","OUT","HLT",`K DAT ${b}`]:l===1?["INP","STA A","INP","ADD A","OUT","HLT","A DAT 0"]:["INP","STA A","INP","STA B","LDA A","SUB B","STA A","LDA A","ADD K","OUT","HLT","A DAT 0","B DAT 0",`K DAT ${b}`];
 input=l===0?[a]:l===1?[a,b]:[a+b,b];
 }else if(focus==="branch"){
 source=l===0?["INP","BRZ ZERO","OUT","HLT","ZERO LDA ONE","OUT","HLT","ONE DAT 1"]:["INP","STA A","SUB LIMIT","BRP BIG","LDA A","OUT","HLT","BIG LDA A","ADD BONUS","OUT","HLT","A DAT 0",`LIMIT DAT ${b}`,`BONUS DAT ${l+2}`];
 input=[l===0?(n%2?a:0):l===1?a:(n%3===0?b:n%3===1?b-1:b+2)];
 }else if(focus==="loops"){
 source=["INP","STA COUNT","LOOP LDA COUNT","BRZ DONE","OUT","SUB ONE","STA COUNT","BRA LOOP","DONE HLT","COUNT DAT 0","ONE DAT 1"];input=[2+l+n%3];
 }else if(focus==="repair"){
 if(l===0){source=["INP","STA A","INP","ADD A","OUT","HLT","A DAT 0"];input=[a,b];missing={index:3,options:["ADD A","STA A","LDA A"]};prompt="Complete the missing instruction to add the two inputs.";}
 else if(l===1){source=["INP","STA A","INP","STA B","LDA A","SUB B","OUT","HLT","A DAT 0","B DAT 0"];input=[a+b,b];missing={index:4,options:["LDA A","LDA B","STA A"]};prompt="Complete the missing instruction to output first input minus second.";}
 else{source=["INP","STA COUNT","LOOP LDA COUNT","BRZ DONE","OUT","SUB ONE","STA COUNT","BRA LOOP","DONE HLT","COUNT DAT 0","ONE DAT 1"];input=[2+n%3];missing={index:3,options:["BRZ DONE","BRP DONE","BRA DONE"]};prompt="Complete the instruction to stop the countdown before outputting zero.";}
 const correct=source[missing.index];const choices=missing.options;choices.push(...choices.splice(0,n%3));add("Missing instruction",correct,choices);
 }else throw Error("Unknown focus");
 const ops=new Set(["INP","OUT","LDA","STA","ADD","SUB","BRA","BRZ","BRP","HLT","DAT"]),map={},program=source.map((line,i)=>{let t=line.split(/\s+/);if(!ops.has(t[0]))map[t.shift()]=i;return {op:t[0],arg:t[1]};});
 let mem=program.map(x=>x.op==="DAT"?Number(x.arg):0),acc=0,pc=0,ip=0,out=[],history=[],halt=false;
 for(let count=0;count<150;count++){const old=pc,ins=program[pc];if(!ins||ins.op==="DAT")throw Error("Invalid execution");pc++;const addr=map[ins.arg];let reason="";
 switch(ins.op){case "INP":acc=input[ip++];reason="Read input into ACC.";break;case "OUT":out.push(acc);reason="Output the accumulator.";break;case "LDA":acc=mem[addr];reason="Load mailbox "+ins.arg+".";break;case "STA":mem[addr]=acc;reason="Store ACC in "+ins.arg+".";break;case "ADD":acc+=mem[addr];reason="Add mailbox "+ins.arg+".";break;case "SUB":acc-=mem[addr];reason="Subtract mailbox "+ins.arg+".";break;case "BRA":pc=addr;reason="Unconditional branch.";break;case "BRZ":case "BRP":{let take=ins.op==="BRZ"?acc===0:acc>=0;if(take)pc=addr;reason=take?"Branch taken.":"Continue sequentially.";break;}case "HLT":halt=true;reason="Stop.";break;}
 if(!Number.isFinite(acc)||Math.abs(acc)>999)throw Error("ACC invalid");history.push({old,acc,pc,mem:mem.slice(),out:out.slice(),ins:source[old],reason,halt});steps.push([String(old).padStart(2,"0")+" · "+source[old],`ACC = ${acc}; ${halt?"HALT":"next PC = "+String(pc).padStart(2,"0")}${out.length?"; output = "+out.join(", "):""}`,reason]);if(halt)break;
 }
 if(!halt||ip!==input.length)throw Error("Invalid LMC trace");
 add("Output in order (comma-separated)",out.join(", "));if(l>=1&&focus!=="loops")add("Accumulator at halt",acc);if(focus==="loops"&&l>=1)add("Number of OUT instructions executed",out.length);if(l===2&&focus!=="repair")add("Number of executed instructions including HLT",history.length);
 const code="Inputs: "+input.join(", ")+"\n\n"+source.map((s,i)=>String(i).padStart(2,"0")+"  "+(missing?.index===i?"________":s)).join("\n");
 return {prompt,code,labels,answers,options,steps,history,source,input,hint:"Follow the program counter. BRZ branches on zero; BRP on zero or positive. For small signed intermediate results this lab displays ACC as a signed integer.",model:steps.map(x=>x.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"instructions":"Instructions & memory","branch":"Conditional branches","loops":"Loops","repair":"Debug & complete code"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"instructions",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 let runStep=0;function showMachine(h){const t=el("div","small-note");t.textContent=h?`ACC: ${h.acc} · PC: ${h.halt?"HALT":h.pc} · OUT: ${h.out.join(", ")||"—"}`:"ACC: 0 · PC: 0 · OUT: —";const r=el("div","small-note");r.textContent=h?h.reason+" Executed: "+h.ins:"Ready to execute.";return [t,r];}
 function render(){runStep=0;question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));const sim=el("div","review-card");sim.style.minHeight="0";const run=el("button","secondary","Step instruction"),resetRun=el("button","secondary","Reset machine"),state=el("div");state.replaceChildren(...showMachine(null));run.type=resetRun.type="button";run.onclick=()=>{if(runStep<question.history.length){state.replaceChildren(...showMachine(question.history[runStep++]));run.disabled=runStep>=question.history.length;}};resetRun.onclick=()=>{runStep=0;run.disabled=false;state.replaceChildren(...showMachine(null));};if(focus!=="repair"){$("visual").append(sim);sim.append(state,run,resetRun);}$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){ $("demo-table").replaceChildren(...showMachine(step?example.history[Math.min(step-1,example.history.length-1)]:null));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>normal(e.value)===normal(question.answers[i]));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
