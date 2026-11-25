'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),cap=3+l,letters=Array.from({length:8},(_,i)=>String.fromCharCode(65+(n+i)%26)),[a,b,c,d,e,f,g]=letters,labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);
 let prompt,code,headers,rows,resultRows;
 if(focus==="stack"||focus==="queue"){
 const circular=focus==="queue",storage=Array(cap).fill(null),removed=[],errors=[],states=[];let top=-1,front=0,rear=0,count=0;
 const ops=l===0?[a,b,c,null,d]:l===1?[a,b,c,d,e,null,f,null,g]:[null,a,b,c,d,e,f,null,g,null,null,null,null,null,null];
 const logical=()=>circular?Array.from({length:count},(_,i)=>storage[(front+i)%cap]):storage.slice(0,top+1);
 ops.forEach((v,i)=>{
  const action=v===null?(circular?"DEQUEUE":"POP"):(circular?"ENQUEUE ":"PUSH ")+v;
  let outcome;
  if(v!==null){if((circular?count:top+1)===cap){errors.push(i+1);outcome="Overflow: reject";}
   else if(circular){storage[rear]=v;rear=(rear+1)%cap;count++;outcome="Inserted "+v;}
   else{storage[++top]=v;outcome="Pushed "+v;}}
  else if((circular?count:top+1)===0){errors.push(i+1);outcome="Underflow: reject";}
  else if(circular){let x=storage[front];removed.push(x);storage[front]=null;front=(front+1)%cap;count--;outcome="Removed "+x;}
  else{let x=storage[top];removed.push(x);storage[top--]=null;outcome="Removed "+x;}
  states.push([String(i+1),action,...(circular?[String(front),String(rear),String(count)]:[String(top)]),logical().join(", ")||"empty"]);
  ex(`${i+1}. ${action}`,`${outcome}; ${circular?`front=${front}, rear=${rear}, count=${count}`:`top=${top}`}; [${logical().join(", ")}]`,"Rejected operations leave the state unchanged. Successful operations update the appropriate pointer.");
 });
 prompt=circular?"Trace the circular queue.":"Trace the bounded array stack.";
 code=`Capacity ${cap}; initially empty.\n${circular?"front = rear = count = 0; rear means next free slot. Wrap indices using MOD capacity.":"top = -1; push increments top before storing; pop reads then decrements top."}\nReject overflow/underflow without changing state.\nCleared slots are shown as empty.`;
 headers=["Step","Operation",...(circular?["front","rear","count"]:["top"]),"Logical order"];rows=states.map(r=>[...r.slice(0,2),...r.slice(2).map(()=>"?")]);resultRows=states;
 add("Removed items in order (comma-separated, or none)",removed.join(", ")||"none");add(circular?"Final FIFO order (comma-separated, or none)":"Final bottom-to-top order (comma-separated, or none)",logical().join(", ")||"none");
 if(circular){add("Final front",front);add("Final rear (next free)",rear);add("Final count",count);}else add("Final top",top);
 if(l>=1)add("Rejected operation numbers (comma-separated, or none)",errors.join(", ")||"none");
 if(l===2){add("Physical slots 0 onwards (use - for empty; comma-separated)",storage.map(x=>x??"-").join(", "));ex("Physical array",storage.map(x=>x??"-").join(", "),"The physical arrangement can differ from the logical order.");}
 }else if(focus==="code"){
 const circular=n%2===1;prompt="Complete the array implementation.";code=circular?`// Circular queue, rear = next free, count tracks size\nif (count == capacity) return false;\nq[rear] = value;\nrear = ____;\ncount++;\n// Dequeue: after checking count > 0\nvalue = q[front];\nfront = ____;\ncount--;`:`// Bounded stack, top starts at -1\nif (top == capacity - 1) return false;\ntop = ____;\ns[top] = value;\n// Pop: after checking top >= 0\nvalue = s[top];\ntop = ____;`;
 const choices=circular?["(rear + 1) % capacity","rear + 1","rear - 1"]:["top + 1","top - 1","top"];add("First blank",choices[0],choices);
 const second=circular?["(front + 1) % capacity","front + 1","front - 1"]:["top - 1","top + 1","top"];add("Second blank",second[0],second);
 ex("Insert pointer",choices[0],"Advance to the correct next location.");ex("Remove pointer",second[0],"Update the removal index after accessing the item.");
 if(l>=1){add("Empty condition",circular?"count == 0":"top == -1",circular?["count == 0","front == rear","count == capacity"]:["top == -1","top == 0","top == capacity - 1"]);ex("Empty test",circular?"count == 0":"top == -1","In a circular queue, equal pointers can also indicate a full queue.");}
 if(l===2)add("Full condition",circular?"count == capacity":"top == capacity - 1",circular?["count == capacity","count == 0","front == rear"]:["top == capacity - 1","top == capacity","top == -1"]);
 }else throw Error("Focus");
 return {prompt,code,headers,rows,resultRows,labels,answers,options,steps,hint:"Use the specified pointer convention. Reject invalid operations; MOD wraps circular indices, and count distinguishes full from empty.",model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"stack":"Bounded stack","queue":"Circular queue","code":"Complete pointer code"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"stack",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Trace the given example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
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
