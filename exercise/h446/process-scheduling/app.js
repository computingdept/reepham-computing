'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),names="ABCD".slice(0,l===2?4:3).split(""),burst=names.map((_,i)=>i===0?4+n%3:1+(n+i*2)%4),arr=names.map((_,i)=>l===0?0:i===0?0:i===1?1:i===2?2:4);
 const jobs=names.map((id,i)=>({id,arrival:arr[i],burst:burst[i],remaining:burst[i],done:null,queue:0,used:0})),ticks=[],segments=[],ready=[],queues=[[],[]];let time=0,running=null,slice=0;
 const unfinished=()=>jobs.some(j=>j.remaining>0),order=(a,b)=>a.arrival-b.arrival||a.id.localeCompare(b.id);
 while(unfinished()&&time<100){
 const incoming=jobs.filter(j=>j.arrival===time).sort(order);
 if(focus==="rr"){incoming.forEach(j=>ready.push(j));if(running&&slice===2){ready.push(running);running=null;}if(!running&&ready.length){running=ready.shift();slice=0;}}
 else if(focus==="mlfq"){incoming.forEach(j=>queues[0].push(j));if(running&&running.used===(running.queue===0?1:3)){running.queue=1;running.used=0;queues[1].push(running);running=null;}if(running&&running.queue===1&&queues[0].length){queues[1].unshift(running);running=null;}if(!running)running=queues[0].shift()||queues[1].shift()||null;}
 else if(focus==="srt"||!running){let candidates=jobs.filter(j=>j.arrival<=time&&j.remaining>0);candidates.sort((a,b)=>focus==="fcfs"?order(a,b):focus==="sjf"?a.burst-b.burst||order(a,b):a.remaining-b.remaining||(a===running?-1:b===running?1:order(a,b)));running=candidates[0]||null;}
 const id=running?.id||"idle";ticks.push(id);if(segments.length&&segments.at(-1).id===id)segments.at(-1).end=time+1;else segments.push({id,start:time,end:time+1});
 if(running){running.remaining--;slice++;running.used++;if(running.remaining===0){running.done=time+1;running=null;}}time++;
 }
 if(unfinished())throw Error("Schedule timeout");
 const labels=["CPU sequence by time unit (letters only; use - for idle)"],answers=[ticks.map(x=>x==="idle"?"-":x).join("")],steps=segments.map(x=>[`${x.start}–${x.end}`,x.id,"CPU executes this process for the shown interval."]);
 const wait=jobs.map(j=>j.done-j.arrival-j.burst);
 if(l>=1){jobs.forEach((j,i)=>{labels.push(`Waiting time for ${j.id}`);answers.push(String(wait[i]));});}
 if(l===2){labels.push("Total waiting time");answers.push(String(wait.reduce((a,b)=>a+b,0)));}
 jobs.forEach((j,i)=>steps.push([`Process ${j.id}`,`Wait = ${j.done} − ${j.arrival} − ${j.burst} = ${wait[i]}`,"Completion minus arrival minus CPU burst."]));
 const rules={fcfs:"FCFS: non-preemptive; earliest arrival first.",sjf:"SJF: non-preemptive; shortest total burst among ready jobs.",srt:"SRT: preemptive; shortest remaining burst. Keep current process on a tie.",rr:"Round Robin: quantum 2. New arrivals join the ready queue before an expired process is requeued.",mlfq:"Two feedback queues: new jobs enter high priority (quantum 1), then unfinished jobs move to low priority (quantum 3, round robin). High priority preempts low; a preempted low job keeps its remaining quantum and resumes before other low jobs. No promotion."};
 const code=rules[focus]+"\nOther ties: earlier arrival, then alphabetical.\nNo context-switch overhead. One CPU; no I/O.";
 return {prompt:"Schedule the processes and trace CPU execution.",code,headers:["Process","Arrival","CPU burst"],rows:jobs.map(j=>[j.id,String(j.arrival),String(j.burst)]),labels,answers,steps,segments,hint:"At every selection, consider only arrived, unfinished jobs and apply the stated rule. Waiting = completion − arrival − burst.",model:steps.map(x=>x.join("\n")).join("\n\n")};
}
function gantt(segments,doc){
 const ns="http://www.w3.org/2000/svg",svg=doc.createElementNS(ns,"svg");svg.setAttribute("viewBox","0 0 620 100");svg.setAttribute("role","img");svg.setAttribute("aria-label",segments.map(s=>`${s.id} ${s.start} to ${s.end}`).join("; "));
 const add=(tag,a,t)=>{let e=doc.createElementNS(ns,tag);Object.entries(a).forEach(([k,v])=>e.setAttribute(k,v));if(t!==undefined)e.textContent=t;svg.append(e);};
 const width=580/segments.at(-1).end;segments.forEach((s,i)=>{let x=20+s.start*width,w=(s.end-s.start)*width;add("rect",{x,y:15,width:w,height:45,fill:s.id==="idle"?"#eee":["#dcefe1","#e9f1eb","#e1eadf","#f0f4e8"]["ABCD".indexOf(s.id)],stroke:"#52866a"});add("text",{x:x+w/2,y:43,"text-anchor":"middle","font-size":14,fill:"#285348","font-weight":700},s.id);add("text",{x,y:80,"text-anchor":"middle","font-size":12,fill:"#285348"},String(s.start));});add("text",{x:600,y:80,"text-anchor":"middle","font-size":12,fill:"#285348"},String(segments.at(-1).end));return svg;
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"fcfs":"First Come First Served","sjf":"Shortest Job First","srt":"Shortest Remaining Time","rr":"Round Robin","mlfq":"Multi-level Feedback Queue"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"fcfs",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(example.rows,example.headers));if(step>=example.steps.length)$("demo-table").append(gantt(example.segments,document));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>(i===0?e.value.replace(/[\s,]/g,"").toUpperCase()===question.answers[i]:normal(e.value)===normal(question.answers[i])));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
