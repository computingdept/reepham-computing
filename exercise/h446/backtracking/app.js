'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);let prompt,code,headers,rows;
 if(focus==="subset"||focus==="repair"){
 const k=1+n%4,a=l===0?[k,k+2,k+3]:l===1?[k,k+3,k+5,k+1]:[k,k+2,k+5,k+1,k+7],target=l===0?a[0]+a[2]:l===1?a[0]+a[2]:n%3===0?a.reduce((s,v)=>s+v,0)+1:a[0]+a[2]+a[4];
 let visited=0,pruned=0,solution=null;
 function find(i,total,chosen){visited++;if(total===target){solution=chosen.slice();ex("Success",`[${chosen.join(", ")}] = ${total}`,"Return true and stop searching.");return true;}
 if(total>target){pruned++;ex("Prune",`[${chosen.join(", ")}] = ${total}`,"All inputs are positive; adding more cannot reduce the sum.");return false;}
 if(i===a.length){ex("Dead end",`[${chosen.join(", ")}] = ${total}`,"No items remain; return false.");return false;}
 ex("Include "+a[i],`total = ${total+a[i]}`,"Try the include branch first.");
 if(find(i+1,total+a[i],[...chosen,a[i]]))return true;
 ex("Backtrack / exclude "+a[i],`restore total = ${total}`,"The include branch failed; try excluding this item.");
 return find(i+1,total,chosen);}
 const found=find(0,0,[]);
 if(focus==="subset"){
 prompt="Trace include-first backtracking for subset sum.";code=`Values: [${a.join(", ")}]; target = ${target}\nStart search(0, 0).\nCheck success first, then prune if total > target, then fail at end of input. Try include before exclude; stop at first success.`;
 add("First solution (comma-separated, or none)",solution?solution.join(", "):"none");if(l>=1)add("Return value",found?"true":"false",["true","false"]);if(l===2){add("Number of pruned calls",pruned);add("Number of calls including initial call",visited);}
 }else{
 prompt="Complete the recursive subset-sum algorithm.";code=`Values: [${a.join(", ")}]; target = ${target}\n\nbool Search(int i, int total) {\n    if (total == target) return ____;\n    if (total > target || i == a.Length) return ${l>=1?"____":"false"};\n    return Search(i+1, total+a[i]) ${l===2?"____":"||"} Search(i+1, total);\n}`;
 add("Success return value","true",["true","false"]);if(l>=1)add("Failure return value","false",["true","false"]);if(l===2)add("Operator joining branches","||",["||","&&","+"]);add("Result of Search(0, 0)",found?"true":"false",["true","false"]);steps.unshift(["Base cases and branching","return true on success; false on prune/end; combine with ||","Either valid branch is sufficient; advance index in each recursive call."]);
 }
 }else if(focus==="queens"){
 prompt="Check safe placements in a 4-queens backtracking search.";const existing=l===0?[[0,n%4]]:l===1?[[0,1],[1,3]]:[[0,2],[1,0]];const row=existing.length,legal=[0,1,2,3].filter(c=>existing.every(([r,col])=>c!==col&&Math.abs(c-col)!==Math.abs(row-r)));
 code=`Board: 4 × 4. Rows and columns numbered 0–3.\nPlace at most one queen per row. Existing queens: ${existing.map(x=>`(${x.join(", ")})`).join("; ")}.\nFind legal columns in row ${row}.`;
 headers=["Row","0","1","2","3"];rows=Array.from({length:4},(_,r)=>[String(r),...Array.from({length:4},(_,c)=>existing.some(([rr,cc])=>rr===r&&cc===c)?"Q":r===row?"?":"—")]);
 add("Legal columns (ascending, comma-separated, or none)",legal.join(", ")||"none");if(l>=1)add("If all candidates fail, next action","Undo previous choice",["Undo previous choice","Ignore diagonal conflicts","Stop and claim success"]);if(l===2)add("Worst-case search guaranteed polynomial?","No",["Yes","No"]);
 [0,1,2,3].forEach(c=>ex(`Check (${row}, ${c})`,legal.includes(c)?"Safe":"Conflict","Reject same-column or diagonal attacks."));if(l>=1)ex("Backtrack","Undo the last placement if no continuation succeeds.","Try the next available alternative.");
 }else throw Error("Focus");
 return {prompt,code,headers,rows,labels,answers,options,steps,hint:"Try a choice, check success or failure, recurse if viable, and undo failed choices. Prune overshoots only for non-negative input values.",model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"subset":"Subset-sum search","repair":"Complete recursive code","queens":"4-queens placements"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"subset",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
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
