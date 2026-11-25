'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);let prompt,code,headers,rows,resultRows;
 if(focus==="fde"){
 const pc=20+n%50,addr=100+n%20,val=2+n%9,acc=15+n%11,op=l===2&&n%3===0?"JMP":n%2?"ADD":"SUB",instr=op+" "+addr,final=op==="JMP"?acc:op==="ADD"?acc+val:acc-val;
 prompt="Trace registers through fetch, decode and execute.";code=`Initial PC = ${pc}; ACC = ${acc}\nMemory[${pc}] = ${instr}\nMemory[${addr}] = ${val}\nOne address per instruction; sequential PC increments by 1.\nADD and SUB use direct memory operands; JMP uses the target address.`;
 add("MAR during instruction fetch",pc);add("MDR after instruction read",instr);add("CIR after fetch",instr);add("PC after fetch",pc+1);
 ex("Fetch address",`MAR ← PC = ${pc}`,"Address bus carries instruction address.");ex("Read instruction",`MDR ← Memory[${pc}] = ${instr}`,"Control bus signals READ; data bus carries the instruction.");ex("Store and increment",`CIR ← MDR; PC ← ${pc+1}`,"Control unit decodes CIR.");
 if(l>=1){if(op!=="JMP"){add("MAR during operand read",addr);add("MDR after operand read",val);ex("Read operand",`MAR=${addr}, MDR=${val}`,"The operand address is different from the instruction address.");}else ex("Branch","No operand memory read","The target address is encoded in the instruction.");add("ACC after execute",final);add("PC after execute",op==="JMP"?addr:pc+1);ex("Execute",`ACC=${final}; PC=${op==="JMP"?addr:pc+1}`,op==="JMP"?"Jump replaces the next instruction address.":"ALU calculates; ACC holds the result.");}
 }else if(focus==="buses"){
 const address=30+n%40,value=75+n%32,write=n%2===1;
 prompt="Identify signals during a memory transfer.";code=`CPU ${write?"writes":"reads"} value ${value} ${write?"to":"from"} memory address ${address}.`;
 add("Address bus value",address);add("Data bus value",value);add("Control signal",write?"WRITE":"READ",["READ","WRITE"]);if(l>=1)add("Data bus direction",write?"CPU to memory":"Memory to CPU",["CPU to memory","Memory to CPU"]);if(l===2)add("Register holding the selected address","MAR",["MAR","MDR","CIR","ACC"]);
 ex("Address",String(address),"MAR holds the selected memory address.");ex("Control",write?"WRITE":"READ","Control signals determine the transfer.");ex("Data",String(value),write?"The data travels to memory.":"The data travels from memory to the CPU.");
 }else if(focus==="pipeline"){
 const stages=l===0?3:4+(n%2),count=3+l+n%3,cycles=stages+count-1,serial=stages*count,stall=l===2?1+n%3:0;
 prompt="Calculate the pipeline timing under the given assumptions.";code=`${count} independent instructions, ${stages} stages each.\nEach stage takes one clock cycle; a new instruction starts every cycle.\nIdeal pipeline: no hazards or stalls.`;
 if(l===2)code+=`\nA separate scenario adds ${stall} cycles of total stall overhead to the ideal schedule.`;
 headers=["Instruction",...Array.from({length:cycles},(_,i)=>String(i+1))];resultRows=Array.from({length:count},(_,i)=>["I"+(i+1),...Array.from({length:cycles},(_,j)=>j>=i&&j<i+stages?"S"+(j-i+1):"—")]);rows=resultRows.map((r,i)=>i===0?r:r.map((v,j)=>j===0?v:"?"));
 add("Final instruction starts in cycle",count);add("Ideal completion cycle",cycles);if(l>=1)add("Serial completion cycles",serial);if(l===2)add("Completion with stated stall overhead",cycles+stall);
 ex("Start instructions",`I1 starts cycle 1; I${count} starts cycle ${count}`,"Overlap different stages of different instructions.");ex("Ideal finish",`${stages} + ${count} − 1 = ${cycles}`,"The last instruction needs all stages.");ex("Serial finish",`${stages} × ${count} = ${serial}`,"No overlap in serial execution.");if(l===2)ex("Stalls",`${cycles} + ${stall} = ${cycles+stall}`,"Stalls reduce throughput.");
 }else if(focus==="architecture"){
 const scenarios=[["Shared instruction and data memory and transfer pathway","Von Neumann"],["Separate instruction and data memories and pathways","Harvard"],["Separate instruction and data caches with shared main memory","Modified Harvard"]];
 const [scenario,answer]=scenarios[n%(l===0?2:3)];prompt="Identify the architecture and its performance implications.";code=scenario+".";
 add("Architecture",answer,["Von Neumann","Harvard","Modified Harvard"]);ex("Organisation",answer,"Identify whether instruction and data pathways and storage are shared or separate.");
 if(l>=1){const issue=answer==="Von Neumann"?"Shared-path contention":"Independent instruction and data access can overlap";add("Relevant consequence",issue,["Shared-path contention","Independent instruction and data access can overlap","Every program runs twice as fast"]);ex("Performance",issue,"The effect depends on workload and hardware design.");}
 if(l===2){add("Guaranteed speedup for every workload?","No",["Yes","No"]);ex("Qualification","No universal speedup","Caches, dependencies and access patterns also matter.");}
 }else throw Error("Focus");
 return {prompt,code,headers,rows,resultRows,labels,answers,options,steps,hint:focus==="pipeline"?"Ideal completion = stages + instructions − 1.":focus==="architecture"?"Distinguish instruction storage and pathways from data storage and pathways.":"Distinguish a memory address from the contents stored at that address.",model:steps.map(x=>x.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"fde":"Fetch–decode–execute","buses":"Memory buses","pipeline":"Pipelining","architecture":"Von Neumann & Harvard"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"fde",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>(question.labels[i].includes("letters only")?e.value.replace(/[\s,]/g,"").toUpperCase()===question.answers[i]:normal(e.value).toLowerCase()===normal(question.answers[i]).toLowerCase()));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
