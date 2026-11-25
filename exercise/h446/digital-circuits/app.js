'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);let code,prompt,rows,headers,resultRows,diagram;
 if(focus==="flipflop"){
 const count=6+2*l,d=Array.from({length:count},(_,i)=>(i*3+n+(i>>1))>>1&1),clk=[0,1,0,1,0,1,1,0,0,1].slice(0,count),initial=n%2,q=[],rises=[];let prev=0,v=initial;
 clk.forEach((c,i)=>{let rise=prev===0&&c===1;if(rise){v=d[i];rises.push(i+1);}q.push(v);ex("Sample "+(i+1),`D=${d[i]}, CLK=${c}, Q=${v}`,rise?"Rising edge: copy D.":"Hold Q.");prev=c;});
 prompt="Trace the rising-edge-triggered D-type flip-flop.";code=`Q initially ${initial}, CLK initially 0.\nD is stable before each clock transition.\nSample D on rising edges only.`;
 headers=["Sample","D","CLK","Q"];rows=d.map((v,i)=>[String(i+1),String(v),String(clk[i]),"?"]);resultRows=d.map((v,i)=>[String(i+1),String(v),String(clk[i]),String(q[i])]);diagram={d,clk,q};
 add("Q column ("+count+" bits)",q.join(""));if(l>=1)add("Rising-edge sample numbers (comma-separated)",rises.join(", "));if(l===2)add("Number of actual Q changes",q.filter((x,i)=>x!==(i?q[i-1]:initial)).length);
 }else{
 const full=focus==="full",names=full?["A","B","Cin"]:["A","B"],all=Array.from({length:2**names.length},(_,i)=>names.map((_,j)=>i>>(names.length-1-j)&1)),calc=v=>{let s=v.reduce((a,b)=>a+b,0);return [s%2,s>>1];},v=all[n%all.length],[sum,carry]=calc(v);
 code=full?"Full adder: A + B + Cin":"Half adder: A + B";
 if(l===1){prompt="Complete the truth table.";headers=[...names,"Sum","Carry"];rows=all.map(x=>[...x.map(String),"?","?"]);resultRows=all.map(x=>[...x.map(String),...calc(x).map(String)]);add("Sum column ("+all.length+" bits)",resultRows.map(r=>r.at(-2)).join(""));add("Carry column ("+all.length+" bits)",resultRows.map(r=>r.at(-1)).join(""));all.forEach(x=>ex(x.join(" + "),calc(x).join(", "),"Sum then carry."));}
 else{prompt="Calculate the adder outputs.";code+="\n"+names.map((x,i)=>x+" = "+v[i]).join("   ");
 if(l===2&&full){let s1=v[0]^v[1],c1=v[0]&v[1],c2=s1&v[2];code+="\nS1 = A XOR B; C1 = A AND B\nSum = S1 XOR Cin; C2 = S1 AND Cin\nCarryOut = C1 OR C2";add("S1",s1);add("C1",c1);add("C2",c2);ex("Half adder 1",`S1=${s1}, C1=${c1}`,"XOR for sum and AND for carry.");ex("Half adder 2",`C2=${c2}`,"Combine S1 and Cin.");}
 if(l===2&&!full){add("Sum gate","XOR",["AND","OR","XOR"]);add("Carry gate","AND",["AND","OR","XOR"]);ex("Gates","Sum = A XOR B; Carry = A AND B","Use the correct gate for each output.");}
 add("Sum",sum);add("Carry",carry);ex("Add input bits",v.join(" + ")+" = "+(sum+2*carry),"The low bit is Sum, high bit is Carry.");ex("Outputs",`Sum=${sum}, Carry=${carry}`,"Check the two-bit binary result.");}
 }
 return {prompt,code,rows,headers,resultRows,diagram,labels,answers,options,steps,hint:focus==="flipflop"?"Only a 0-to-1 clock transition copies D. Otherwise Q holds.":"Add the input bits. Sum is the low bit, Carry is the high bit.",model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function wave(g,doc,reveal=false){
 const ns="http://www.w3.org/2000/svg",svg=doc.createElementNS(ns,"svg");svg.setAttribute("viewBox","0 0 600 210");svg.setAttribute("role","img");svg.setAttribute("aria-label","Clock and data timing diagram");
 const s=(t,a,v)=>{let e=doc.createElementNS(ns,t);Object.entries(a).forEach(([k,x])=>e.setAttribute(k,x));if(v!==undefined)e.textContent=v;svg.append(e);};
 const w=520/g.d.length;
 for(let i=0;i<g.d.length;i++){s("line",{x1:65+i*w,y1:8,x2:65+i*w,y2:185,stroke:"#d4dfd8","stroke-dasharray":"3 4"});s("text",{x:65+(i+.5)*w,y:203,"text-anchor":"middle","font-size":13,fill:"#285348"},String(i+1));}
 [["D",g.d],["CLK",g.clk],["Q",reveal?g.q:null]].forEach(([k,arr],j)=>{let y=18+j*58;s("text",{x:6,y:y+18,"font-size":15,fill:"#285348"},k);if(!arr){s("text",{x:65,y:y+18,"font-size":15,fill:"#285348"},"Predict Q");return;}let d=`M65 ${y+25*(1-arr[0])}`;arr.forEach((v,i)=>d+=` V${y+25*(1-v)} H${65+(i+1)*w}`);s("path",{d,fill:"none",stroke:"#285348","stroke-width":3});});return svg;
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"half":"Half adders","full":"Full adders","flipflop":"D-type flip-flops"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"half",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.diagram)$("visual").append(wave(question.diagram,document));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();draw();}
 function draw(){$("demo-table").replaceChildren();if(example.diagram)$("demo-table").append(wave(example.diagram,document,step>=example.steps.length));if(example.rows)$("demo-table").append(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>(question.labels[i].includes("bits")?e.value.replace(/[\s,]/g,"")===question.answers[i]:normal(e.value).toUpperCase()===normal(question.answers[i]).toUpperCase()));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
