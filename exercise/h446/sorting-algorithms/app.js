'use strict';
function make(focus,level,n){
 const engines={bubble:J277BubbleSort,insertion:J277InsertionSort,merge:J277MergeSort},engine=engines[focus],l=["easy","medium","hard"].indexOf(level),q=engine.makeQuestion(level,n%engine.cases.length);
 const labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);
 let prompt,code=`Initial array: [${q.values.join(", ")}]\nSort ascending. Indices start at 0.`;
 if(focus==="bubble"){
 prompt="Trace bubble sort. Use fixed passes with a shrinking inner loop (no early exit).";
 const passes=l===0?q.passes.slice(0,1):q.passes;
 passes.forEach(p=>{add(`Array after pass ${p.pass+1} (comma-separated)`,p.after.join(", "));if(l>=1)add(`Swaps during pass ${p.pass+1}`,p.swaps);q.events.filter(e=>e.pass===p.pass).forEach(e=>ex(`Pass ${e.pass+1}, index ${e.i}`,`${e.left} vs ${e.right}: [${e.after.join(", ")}]`,e.swap?"Out of order: swap.":"Already ordered: keep."));});
 if(l===2){add("Total adjacent comparisons",q.events.length);add("Correct comparison for ascending order","a[i] > a[i + 1]",["a[i] < a[i + 1]","a[i] > a[i + 1]","a[i] == a[i + 1]"]);code+="\nC# comparison: if (________) swap adjacent values;";ex("Count comparisons",String(q.events.length),"Fixed shrinking passes compare n−1, n−2, …, 1 adjacent pairs.");}
 }else if(focus==="insertion"){
 prompt="Trace insertion sort. Move larger values right before inserting the key.";
 const rounds=l===0?q.rounds.slice(0,2):q.rounds;
 rounds.forEach(r=>{add(`Insertion ${r.i}: array (comma-separated)`,r.after.join(", "));if(l>=1)add(`Insertion ${r.i}: shifts`,r.shifts);ex(`Insert key ${r.key}`,`Position ${r.position}; shifts ${r.shifts}\n[${r.after.join(", ")}]`,"Shift only values greater than the key; equal values retain their order.");});
 if(l===2){add("Total shifts",q.rounds.reduce((s,r)=>s+r.shifts,0));add("Correct C# condition","j >= 0 && a[j] > key",["j >= 0 && a[j] > key","j > 0 && a[j] > key","j >= 0 && a[j] < key"]);code+="\nC#: while (________) shift a[j] right;";ex("Loop guard","j >= 0 && a[j] > key","Check the bound before accessing the array.");}
 }else{
 prompt="Split, sort the halves, then merge in ascending order.";
 add("Sorted left half",q.left.join(", "));add("Sorted right half",q.right.join(", "));
 ex("Split into halves",`[${q.values.slice(0,2).join(", ")}] | [${q.values.slice(2).join(", ")}]`,"Split each half again into singletons, then combine.");
 ex("Merge pairs",`[${q.left.join(", ")}] | [${q.right.join(", ")}]`,"The two sorted halves are ready for the final merge.");
 if(l>=1)add("Source of each item in final merge (L/R, letters only)",q.actions.map(a=>a.from[0].toUpperCase()).join(""));
 q.actions.forEach(a=>ex("Take "+a.from,`Append ${a.value}: [${a.after.join(", ")}]`,"Choose the smaller front value, preferring the left when equal; copy the remaining tail."));
 add("Final sorted array",q.sorted.join(", "));
 if(l===2){let comparisons=0,i=0,j=0;for(const a of q.actions){if(i<q.left.length&&j<q.right.length)comparisons++;if(a.from==="left")i++;else j++;}add("Value comparisons in final merge",comparisons);add("Base case for recursive MergeSort","a.Length <= 1",["a.Length == 0","a.Length <= 1","a.Length >= 2"]);code+="\nC#: if (________) return a;\nCount only comparisons where both halves still have a front item.";ex("Base case","a.Length <= 1","An empty or singleton array is already sorted.");ex("Final-merge comparisons",String(comparisons),"Copying the remaining tail requires no further comparisons between values.");}
 }
 return {prompt,code,labels,answers,options,steps,hint:q.hint,model:steps.map(x=>x.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"bubble":"Bubble sort","insertion":"Insertion sort","merge":"Merge sort"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"bubble",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Trace the algorithm before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>(question.labels[i].includes("letters only")?e.value.replace(/[\s,]/g,"").toUpperCase()===question.answers[i]:normal(e.value)===normal(question.answers[i])));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
