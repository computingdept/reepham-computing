'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),size=3+l,capacity=size+1,shift=n%capacity;
 const order=Array.from({length:capacity},(_,j)=>(capacity-1-j+shift)%capacity);
 const active=order.slice(0,size),spare=order[size],head=active[0],next=Array(capacity).fill(-1),data=Array(capacity).fill("—");
 const labels="ABCDEFGHJKLMNPQRSTUVWXYZ",offset=n%labels.length;
 active.forEach((idx,j)=>{next[idx]=active[j+1]??-1;data[idx]=labels[(offset+j*3)%labels.length];});
 const fresh=labels[(offset+size*3)%labels.length],seq=indices=>indices.map(idx=>data[idx]==="—"?fresh:data[idx]).join(", ");
 const rows=data.map((v,i)=>[String(i),v,String(next[i])]);
 const code=`start = ${head}\n-1 = end of list\nUnused slot = ${spare}`;
 const steps=[],answers=[],fields=[];
 const add=(label,answer)=>{fields.push(label);answers.push(String(answer));};
 const explain=(title,working,reason)=>steps.push([title,working,reason]);
 const tableText=()=>["Index | Data | Next",...rows.map(r=>r.join(" | "))].join("\n");
 let prompt="",hint="",options;
 if(focus==="traverse"){
  prompt="Follow the links, not the physical array order.";
  add("Index of second node",active[1]);add("Data in logical order (comma-separated)",seq(active));
  if(l>=1)add("Index of final node",active.at(-1));
  if(l===2)add("Indices in traversal order (comma-separated)",active.join(", "));
  hint="Begin at start. Read the data, then use next[current] to locate the following node.";
  explain("Start",`current = ${head}`,`The first item is ${data[head]}.`);
  active.forEach((idx,j)=>explain(`Visit node ${idx}`,`data[${idx}] = ${data[idx]}; next[${idx}] = ${next[idx]}`,j===size-1?"-1 marks the end; stop.":"Follow the next pointer."));
  explain("Logical order",seq(active),"Array indices need not be in ascending order.");
 }else if(focus==="insert"){
  const pos=l===0?-1:l===1?0:1+n%(size-2),pred=pos<0?null:active[pos],successor=active[pos+1]??-1,newOrder=[...active];newOrder.splice(pos+1,0,spare);
  prompt=pos<0?`Insert ${fresh} at the front using slot ${spare}.`:`Insert ${fresh} after ${data[pred]} (index ${pred}) using slot ${spare}.`;
  add(`New next[${spare}]`,successor);
  add(pos<0?"New start":`New next[${pred}]`,spare);
  if(l>=1)add("Final start pointer",head);
  if(l===2)add("Data in new logical order (comma-separated)",seq(newOrder));
  hint="First point the new node at its successor. Only then change start or the preceding node's next pointer.";
  explain("Preserve the rest of the list",`data[${spare}] = '${fresh}'; next[${spare}] = ${successor}`,"Store the new item and save the existing successor.");
  explain("Connect the new node",pos<0?`start = ${spare}`:`next[${pred}] = ${spare}`,"Change the incoming link after the new node points to its successor.");
  explain("Final list",seq(newOrder),"All existing nodes remain reachable.");
 }else if(focus==="delete"){
  const pos=l===0?0:l===1?1:(n%2?size-1:2),target=active[pos],pred=pos?active[pos-1]:null,succ=next[target],newOrder=active.filter(x=>x!==target);
  prompt=`Remove ${data[target]} at index ${target}. Update the links; memory reclamation is not required.`;
  add(pos===0?"New start":`New next[${pred}]`,succ);
  add("Index of removed node",target);
  if(l>=1)add("Data in new logical order (comma-separated)",seq(newOrder));
  if(l===2)add("Final start pointer",head);
  hint="Bypass the target by making its predecessor point to its successor. For the first node, update start instead.";
  explain("Find the node",`target = ${target}; next[${target}] = ${succ}`,"Remember the successor before unlinking.");
  explain("Bypass the node",pos===0?`start = ${succ}`:`next[${pred}] = ${succ}`,pos===0?"Deleting the first node moves start.":"The previous node now skips the deleted node.");
  explain("Final list",seq(newOrder),"The removed node is no longer reachable from start.");
 }else if(focus==="objects"){
  const a=active.map((_,j)=>2+n+j*4),newVal=99+n,pos=l===0?0:1,variables=a.map(v=>"node"+v),previous=variables[pos],successor=variables[pos+1],chain=a.join(" → ")+" → null";
  rows.length=0;const lines=["class Node {","    public int Value;","    public Node Next;","}", "// Existing objects and links:",...variables.map((v,j)=>`${v}.Next = ${variables[j+1]??"null"};`),`Node head = ${variables[0]};`];
  if(l!==2){
   prompt=`Insert newNode (value ${newVal}) after ${previous}.`;
   lines.push(`// newNode already exists with Value = ${newVal}`);
   add("First assignment",`newNode.Next = ${previous}.Next;`);add("Second assignment",`${previous}.Next = newNode;`);
   if(l===1)add("New logical order (comma-separated)",[...a.slice(0,pos+1),newVal,...a.slice(pos+1)].join(", "));
   hint="Preserve the old successor in newNode.Next before overwriting the previous link.";
   options=[[`newNode.Next = ${previous}.Next;`,`${previous}.Next = newNode;`,`newNode.Next = null;`],[`newNode.Next = ${previous};`,`${previous}.Next = newNode;`,`head = newNode;`]];
   explain("Initial chain",chain,"Each variable refers to an existing Node object.");
   explain("Preserve successor",`newNode.Next = ${previous}.Next;`,`newNode now refers to ${successor}.`);
   explain("Connect",`${previous}.Next = newNode;`,"The previous node now points to the new object.");
   explain("Result",[...a.slice(0,pos+1),newVal,...a.slice(pos+1)].join(" → ")+" → null","Every original node is still reachable.");
  }else{
   const target=variables[pos+1];prompt=`Remove ${target} by updating the preceding node's Next reference.`;
   add("Replacement assignment",`${previous}.Next = ${previous}.Next.Next;`);
   add("New logical order (comma-separated)",a.filter((_,j)=>j!==pos+1).join(", "));
   options=[[`${previous}.Next = ${target};`,`${previous}.Next = ${previous}.Next.Next;`,`${target}.Next = null;`]];
   hint="The previous node must point to the node after the target.";
   explain("Initial chain",chain,"Find the preceding node.");
   explain("Bypass",`${previous}.Next = ${previous}.Next.Next;`,"The target is skipped; the rest of the list is preserved.");
   explain("Result",a.filter((_,j)=>j!==pos+1).join(" → ")+" → null","The target is no longer reachable.");
  }
  return {prompt,code:lines.map((s,j)=>String(j+1).padStart(2,"0")+"  "+s).join("\n"),labels:fields,answers,hint,steps,options,model:steps.map(s=>s.join("\n")).join("\n\n")};
 }else throw Error("Unknown focus");
 return {prompt,code,rows,demoTable:tableText(),labels:fields,answers,hint,steps,model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={traverse:"Follow pointers",insert:"Insert a node",delete:"Delete a node",objects:"Object references in C#"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"traverse",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows){const t=el("table","trace-table"),head=el("tr");["Index","Data","Next"].forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Follow the current pointers and predict the result before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN LIST / CODE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows));draw();}
 function draw(){$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>normal(e.value)===normal(question.answers[i]));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
