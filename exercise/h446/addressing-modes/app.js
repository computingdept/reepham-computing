'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),base=40+n%20,x=1+n%3,values=[7+n%9,base+4,13+n%6,19+n%7,25+n%8],mem=Object.fromEntries(values.map((v,i)=>[base+i,v])),literal=3+n%12;
 const cases=[["Immediate",`#${literal}`,null,literal,`Literal ${literal}`],["Direct",`[${base}]`,base,mem[base],`M[${base}] = ${mem[base]}`],["Indirect",`[[${base+1}]]`,mem[base+1],mem[mem[base+1]],`M[${base+1}] = ${mem[base+1]}; M[${mem[base+1]}] = ${mem[mem[base+1]]}`],["Indexed",`[${base}+X]`,base+x,mem[base+x],`${base} + ${x} = ${base+x}; M[${base+x}] = ${mem[base+x]}`]];
 const labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);let prompt,code=`X = ${x}\nNotation: #literal; [address]; [[pointer address]]; [base+X].\nOne byte per address in this model.`;
 const headers=["Memory address","Contents"],rows=values.map((v,i)=>[String(base+i),String(v)]);
 if(focus==="identify"){
 prompt="Identify the addressing mode used by each operand.";const selected=l===0?[cases[n%4]]:l===1?[cases[n%4],cases[(n+1)%4]]:cases;
 selected.forEach(([mode,operand,ea,v,work])=>{add(`Mode for ${operand}`,mode,cases.map(c=>c[0]));ex(operand,mode,work);});
 }else if(focus==="operand"){
 prompt="Find the effective address and operand value.";const selected=l===0?[cases[n%4]]:l===1?[cases[2],cases[3]]:cases;
 selected.forEach(([mode,operand,ea,v,work])=>{if(l>=1)add(`${operand}: effective address (none if literal)`,ea===null?"none":ea);add(`${operand}: operand value`,v);ex(mode,work,"Follow the addressing rule before reading the operand.");});
 }else if(focus==="execute"){
 const selected=l===0?[cases[n%4]]:l===1?[cases[1],cases[3]]:[cases[2],cases[0],cases[3]],initial=30+n%10;let acc=initial;
 prompt="Trace the accumulator as instructions execute.";code+=`\nInitial ACC = ${initial}\n`+selected.map((c,i)=>`${i+1}. ${i%2?"SUB":"ADD"} ${c[1]}`).join("\n");
 selected.forEach(([mode,operand,ea,v,work],i)=>{const old=acc;acc+=i%2?-v:v;add(`ACC after instruction ${i+1}`,acc);ex(`${i%2?"SUB":"ADD"} ${operand}`,`${work}; ${old} ${i%2?"−":"+"} ${v} = ${acc}`,"Resolve the operand before performing the arithmetic.");});
 }else throw Error("Focus");
 return {prompt,code,headers,rows,labels,answers,options,steps,hint:"Immediate uses the literal; direct reads one location; indirect follows a stored pointer; indexed adds X to the base before reading.",model:steps.map(x=>x.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"identify":"Identify modes","operand":"Effective addresses & values","execute":"Trace instructions"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"identify",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
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
