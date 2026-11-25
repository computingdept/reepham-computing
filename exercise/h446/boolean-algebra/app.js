'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),a="ABC"[n%3],b="ABC"[(n+1)%3],c="ABC"[(n+2)%3],flip=n%2;
 const N=x=>["NOT",x],A=(x,y)=>["AND",x,y],O=(x,y)=>["OR",x,y],F=flip?O:A,G=flip?A:O;
 let t,r,w,rule;
 if(focus==="demorgan"){
 if(l===0){t=N(F(a,b));r=G(N(a),N(b));w=[F(N(a),N(b)),G(a,b)];}
 else if(l===1){t=N(F(a,N(b)));r=G(N(a),b);w=[F(N(a),b),G(N(a),N(b))];}
 else{t=N(F(N(a),G(b,c)));r=G(a,F(N(b),N(c)));w=[F(a,G(N(b),N(c))),G(a,G(N(b),N(c)))];}rule="Negate both operands and swap AND/OR. Cancel double NOT.";
 }else if(focus==="identities"){
 if(l===0){t=flip?N(N(a)):F(a,a);r=a;w=[N(a),b];}else if(l===1){t=F(a,flip?"0":"1");r=a;w=[flip?"1":"0",N(a)];}else{t=G(F(a,b),F(a,N(b)));r=a;w=[b,N(a)];}rule="Use double negation, idempotence, identity or complement as applicable.";
 }else if(focus==="distribution"){
 if(l===0){t=F(a,G(b,c));r=G(F(a,b),F(a,c));w=[F(G(a,b),G(a,c)),G(F(a,b),c)];}else if(l===1){t=G(F(a,b),F(a,c));r=F(a,G(b,c));w=[G(a,F(b,c)),F(a,F(b,c))];}else{t=F(G(a,b),G(a,c));r=G(a,F(b,c));w=[F(a,G(b,c)),G(a,G(b,c))];}rule="Distribute over a group or factor out the repeated operand.";
 }else{if(l===0){t=F(a,G(a,b));r=a;w=[b,N(a)];}else if(l===1){t=G(a,F(a,N(b)));r=a;w=[N(b),G(a,b)];}else{t=F(G(a,F(a,b)),G(a,c));r=a;w=[G(a,b),F(a,c)];}rule="Absorption: A OR (A AND B) = A; A AND (A OR B) = A.";}
 const fmt=x=>typeof x==="string"?x:x[0]==="NOT"?"¬"+(typeof x[1]==="string"?x[1]:"("+fmt(x[1])+")"):"("+fmt(x[1])+(x[0]==="AND"?" ∧ ":" ∨ ")+fmt(x[2])+")";
 const ev=(x,v)=>typeof x==="string"?x==="0"?0:x==="1"?1:v[x]:x[0]==="NOT"?1-ev(x[1],v):x[0]==="AND"?ev(x[1],v)&ev(x[2],v):ev(x[1],v)|ev(x[2],v);
 const truth=x=>Array.from({length:8},(_,i)=>ev(x,{A:i>>2,B:i>>1&1,C:i&1})).join("");
 if(truth(t)!==truth(r)||w.some(x=>truth(x)===truth(r)))throw Error("Bad Boolean options "+focus+level+n);
 const choices=[r,...w].map(fmt);choices.push(...choices.splice(0,n%3));
 const labels=["Equivalent expression"],answers=[fmt(r)];if(l===2){labels.push("Outputs for ABC = 000 to 111 (8 bits)");answers.push(truth(r));}
 const steps=[["Identify the transformation",fmt(t),rule],["Apply the rule",fmt(r),"This preserves every output."],["Verify using a truth table",truth(r),"Both expressions have the same eight output bits."]];
 return {prompt:focus==="distribution"&&l===0?"Expand the expression.":"Choose the equivalent expression.",code:"Q = "+fmt(t)+"\n¬ = NOT   ∧ = AND   ∨ = OR",labels,answers,options:[choices],hint:rule,steps,model:steps.map(x=>x.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"demorgan":"De Morgan’s laws","identities":"Identities","distribution":"Distribution","absorption":"Absorption"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"demorgan",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>(question.labels[i].includes("bits")?e.value.replace(/[\s,]/g,"")===question.answers[i]:normal(e.value).toUpperCase()===normal(question.answers[i]).toUpperCase()));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
