'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);
 let prompt,code,headers,rows,resultRows;
 const q=J277AlgorithmRepair.makeQuestion(level,n%J277AlgorithmRepair.cases.length);
 if(focus==="repair"){
 prompt=q.goal+" Identify and repair the error.";code=q.code.map((x,i)=>String(i+1).padStart(2,"0")+"  "+x).join("\n");
 add("Faulty line number",q.line);if(l>=1)add("Correct replacement",q.fix,q.choices);if(l===2)add("Output after correction",q.expected);
 ex("Original output",q.actual,"Trace the faulty version first.");ex("Locate and repair",`Line ${q.line}: ${q.fix}`,q.why);ex("Retest",q.expected,"Check the corrected result against the goal.");
 }else if(focus==="trace"){
 const a=[4+n%4,2,7,3+n%5,1],limit=4+n%3;
 prompt="Complete the trace table. Record values after each loop iteration.";
 const lines=["int count = 0, total = 0;",`int[] a = { ${a.join(", ")} };`,"for (int i = 0; i < a.Length; i++) {",`    if (a[i] < ${limit}) {`,"        count++;","        total += a[i];","    }","}","Console.WriteLine(total);"];
 code=lines.map((x,i)=>String(i+1).padStart(2,"0")+"  "+x).join("\n");headers=["Line","i","a[i]","count","total"];let count=0,total=0;resultRows=a.map((v,i)=>{if(v<limit){count++;total+=v;}ex(`Iteration ${i}`,`count=${count}, total=${total}`,v<limit?"Condition true: increment and accumulate.":"Condition false: keep both values.");return ["08",String(i),String(v),String(count),String(total)];});rows=resultRows.map(r=>[...r.slice(0,3),"?","?"]);
 if(l>=1)add("count after each iteration",resultRows.map(r=>r[3]).join(", "));if(l===2)add("total after each iteration",resultRows.map(r=>r[4]).join(", "));add("Printed total",total);add("Final count",count);
 }else if(focus==="frequency"){
 const a=[2+n%3,7,2+n%3,4,7,2+n%3],distinct=[],counts=[];
 prompt="Trace the frequency-count algorithm.";code=`numbers = [${a.join(", ")}]\ndistinct = []\ncounts = []\nfor each target in numbers\n    match = index of target in distinct, or -1\n    if match == -1 then\n        append target to distinct\n        append 1 to counts\n    else\n        counts[match] = counts[match] + 1\n    endif\nnext target`;
 a.forEach((x,i)=>{const j=distinct.indexOf(x);if(j<0){distinct.push(x);counts.push(1);}else counts[j]++;ex(`Item ${i}: ${x}`,`distinct=[${distinct.join(", ")}]; counts=[${counts.join(", ")}]`,j<0?"New key: append a count of 1.":"Existing key: increment its count.");});
 add("distinct (comma-separated)",distinct.join(", "));add("counts (comma-separated)",counts.join(", "));if(l>=1)add("Total of counts",counts.reduce((a,b)=>a+b,0));if(l===2)add("First count when a new key is added",1);
 }else throw Error("Focus");
 return {prompt,code,rows,headers,resultRows,labels,answers,options,steps,hint:"Follow the statements in execution order, record changed variables, and test the result against the intended outcome.",model:steps.map(x=>x.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"trace":"Trace tables","repair":"Algorithm repair","frequency":"Frequency counting"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"trace",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the given example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>normal(e.value).toLowerCase()===normal(question.answers[i]).toLowerCase());inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
