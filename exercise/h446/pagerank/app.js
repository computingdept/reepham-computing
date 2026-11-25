'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]),f=x=>x.toFixed(4);
 let prompt,code,headers,rows,resultRows,graph;
 if(focus==="index"){
 const words=["binary","search","tree","graph","sort","data"],names=["A","B","C","D","E"].slice(0,3+l),docs=names.map((_,i)=>[words[(i+n)%6],words[(i+n+1)%6],words[(i+n+3)%6]]),term=words[n%6],term2=words[(n+1)%6],list=t=>names.filter((_,i)=>docs[i].includes(t)),a=list(term),b=list(term2),both=a.filter(x=>b.includes(x));
 prompt="Build an inverted index and retrieve matching pages.";code=`Treat words as exact tokens, case-insensitive.\nQuery terms: ${term}, ${term2}.`;headers=["Page","Text"];rows=names.map((x,i)=>[x,docs[i].join(" ")]);
 add(`Pages containing ${term} (alphabetical, comma-separated)`,a.join(", ")||"none");add(`Pages containing ${term2} (alphabetical, comma-separated)`,b.join(", ")||"none");
 ex("Index first term",`${term} → ${a.join(", ")||"none"}`,"An inverted index maps terms to matching pages.");ex("Index second term",`${term2} → ${b.join(", ")||"none"}`,"Find all pages with the term.");
 if(l>=1){add("AND query result",both.join(", ")||"none");ex("Intersect postings",both.join(", ")||"none","Both terms must occur.");}
 if(l===2){const union=[...new Set([...a,...b])].sort();add("OR query result",union.join(", "));ex("Union postings",union.join(", "),"At least one query term must occur.");}
 }else if(focus==="shares"){
 const out=2+n%4,rank=(20+5*(n%9))/100,share=rank/out;
 prompt="Calculate PageRank contributions before damping.";code=`Page A has rank ${rank.toFixed(2)} and ${out} outgoing links. Split its rank evenly between its outgoing links. Give decimals to 4 places.`;
 add("Contribution per link",f(share));ex("Divide",`${rank.toFixed(2)} / ${out} = ${f(share)}`,"A source distributes its rank across its outgoing links.");
 if(l>=1){add("Contribution if outgoing link count doubles",f(rank/(2*out)));ex("Double out-degree",f(rank/(2*out)),"Each link now receives half its former share.");}
 if(l===2){add("Damped contribution per original link (d = 0.85)",f(.85*share));ex("Damping",`0.85 × ${f(share)} = ${f(.85*share)}`,"Apply the damping multiplier; teleportation and other incoming links are separate.");}
 }else if(focus==="iteration"){
 const size=l===2?4:3,names="ABCD".slice(0,size).split(""),shift=n%size,out=Array.from({length:size},()=>[]);
 // Each page has at least one outgoing link; no self-links or dangling pages.
 for(let i=0;i<size;i++){let from=(i+shift)%size;out[from].push((i+shift+1)%size);if(i===1||l===2&&i===2)out[from].push((i+shift+2)%size);}
 const d=.85,initial=Array(size).fill(1/size),iterate=r=>r.map((_,i)=>(1-d)/size+d*out.reduce((sum,links,j)=>sum+(links.includes(i)?r[j]/links.length:0),0)),first=iterate(initial),second=iterate(first);
 graph={names,out};
 prompt="Calculate one synchronous PageRank update.";code=`Initial rank = 1/${size} per page. d = 0.85.\nNew rank(P) = (1−d)/${size} + d × sum of incoming shares.\nUse previous-iteration values for every page. Keep full precision until rounding to 4 decimal places.\nNo dangling pages.`;
 headers=["Page","Outgoing links","Initial rank"];rows=names.map((x,i)=>[x,out[i].map(j=>names[j]).join(", "),f(initial[i])]);
 first.forEach((x,i)=>{add(`New rank of ${names[i]} (4 d.p.)`,f(x));let incoming=out.flatMap((links,j)=>links.includes(i)?[`${names[j]}: ${f(initial[j]/links.length)}`]:[]);ex(`Update ${names[i]}`,`${incoming.join(" + ")} → ${f(x)}`,"Add the base term and damp the incoming total.");});
 const max=Math.max(...first),top=names.filter((_,i)=>Math.abs(first[i]-max)<1e-10).join(", ");
 if(l>=1)add("Highest ranked page(s), alphabetical",top);
 if(l===2){const p=n%size;add(`Iteration 2 rank of ${names[p]} (4 d.p.)`,f(second[p]));ex("Second iteration",`${names[p]} = ${f(second[p])}`,"Use all unrounded first-iteration ranks as the previous vector.");}
 resultRows=names.map((x,i)=>[x,out[i].map(j=>names[j]).join(", "),f(first[i])]);
 if(Math.abs(first.reduce((a,b)=>a+b,0)-1)>1e-9)throw Error("Rank not conserved");
 }else throw Error("Focus");
 return {prompt,code,headers,rows,resultRows,graph,labels,answers,options,steps,hint:"Use previous-iteration ranks and divide each incoming source by its outgoing link count. For an index, intersect postings for AND.",model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function linkGraph(g,doc){
 const ns="http://www.w3.org/2000/svg",svg=doc.createElementNS(ns,"svg");svg.setAttribute("viewBox","0 0 380 235");svg.setAttribute("role","img");svg.setAttribute("aria-label",g.names.map((a,i)=>a+" links to "+g.out[i].map(j=>g.names[j]).join(", ")).join("; "));
 const s=(tag,a,t,parent=svg)=>{let e=doc.createElementNS(ns,tag);Object.entries(a).forEach(([k,x])=>e.setAttribute(k,x));if(t!==undefined)e.textContent=t;parent.append(e);return e;};
 const defs=s("defs",{}),marker=s("marker",{id:"pr-arrow",viewBox:"0 0 10 10",refX:9,refY:5,markerWidth:6,markerHeight:6,orient:"auto"},undefined,defs);s("path",{d:"M0 0 L10 5 L0 10Z",fill:"#52866a"},undefined,marker);
 const pos=g.names.map((_,i)=>{let a=-Math.PI/2+i*2*Math.PI/g.names.length;return [190+133*Math.cos(a),117+87*Math.sin(a)];});
 g.out.forEach((links,i)=>links.forEach(j=>{let [x,y]=pos[i],[xx,yy]=pos[j],dx=xx-x,dy=yy-y,len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len,off=g.out[j].includes(i)?7:0;s("line",{x1:x+ux*24-uy*off,y1:y+uy*24+ux*off,x2:xx-ux*26-uy*off,y2:yy-uy*26+ux*off,stroke:"#52866a","stroke-width":2.5,"marker-end":"url(#pr-arrow)"});}));
 pos.forEach(([x,y],i)=>{s("circle",{cx:x,cy:y,r:23,fill:"#e5f2e8",stroke:"#52866a","stroke-width":2});s("text",{x,y:y+6,"text-anchor":"middle","font-size":18,"font-weight":700,fill:"#285348"},g.names[i]);});return svg;
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"index":"Search engine indexing","shares":"Link contributions","iteration":"PageRank iterations"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"index",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the given example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.graph)$("visual").append(linkGraph(question.graph,document));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){$("demo-table").replaceChildren();if(example.graph)$("demo-table").append(linkGraph(example.graph,document));if(example.rows)$("demo-table").append(table(example.rows,example.headers));if(step>=example.steps.length&&example.resultRows)$("demo-table").append(table(example.resultRows,["Page","Outgoing links","Rank after update"]));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>(question.labels[i].includes("4 d.p.")||question.labels[i].includes("Contribution")||question.labels[i].includes("contribution")?e.value.trim()!==""&&Number.isFinite(Number(e.value))&&Math.abs(Number(e.value)-Number(question.answers[i]))<0.00005001:normal(e.value).toLowerCase()===normal(question.answers[i]).toLowerCase()));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
