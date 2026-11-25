'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),size=[5,7,11][l],b=(n+size-2)%size,start=size*(2+n%6)+b;
 const labels=[],answers=[],steps=[],add=(label,value)=>{labels.push(label);answers.push(String(value));},explain=(title,work,why)=>steps.push([title,work,why]);
 const bucket=key=>key%size;
 const list=a=>a.map(x=>x===null?"—":x).join(", ");
 let code=`Table size = ${size}\nh(key) = key MOD ${size}\nIndices start at 0.`,prompt,hint,rows,headers,resultRows;
 if(focus==="hash"){
  const keys=[start,start+size,start+1,start+2*size+1].slice(0,2+l);
  prompt="Calculate the initial hash index for each key.";
  code+="\nKeys: "+keys.join(", ");
  keys.forEach(k=>{add(`h(${k})`,bucket(k));explain(`Hash ${k}`,`${k} MOD ${size} = ${bucket(k)}`,`${k} = ${Math.floor(k/size)} × ${size} + ${bucket(k)}.`);});
  if(l===2){add("Number of distinct starting buckets",new Set(keys.map(bucket)).size);explain("Compare indices",keys.map(bucket).join(", "),"Keys with identical indices collide.");}
  hint="MOD gives the remainder after integer division. Different keys can share a hash index.";
 }else if(focus==="buckets"){
  const width=3,table=Array.from({length:size},()=>[]),keys=[start,start+1,start+size];
  if(l===2)keys.push(start+2*size);
  keys.forEach(k=>table[bucket(k)].push(k));
  headers=["Bucket","Column 0","Column 1","Column 2","Count"];
  const toRows=t=>t.map((a,i)=>[String(i),...Array.from({length:width},(_,j)=>String(a[j]??"—")),String(a.length)]);
  rows=toRows(table);const target=l===2?start+size:start+2*size;
  if(l===2){
   prompt=`Remove key ${target} from the bucket. Shift later keys left to close the gap.`;
   const row=table[bucket(target)],col=row.indexOf(target);
   add("Bucket index",bucket(target));add("Column containing the key",col);
   row.splice(col,1);add("Keys remaining in that bucket (comma-separated)",row.join(", "));add("New count",row.length);
   explain("Hash the key",`${target} MOD ${size} = ${bucket(target)}`,"Only search this bucket.");
   explain("Remove and shift",`Remove column ${col}; shift later keys left.`, "Decrease the count by one so the next free column is correct.");
  }else{
   prompt=`Insert key ${target} into its bucket. Use the next free column.`;
   const row=table[bucket(target)],col=row.length;
   add("Bucket index",bucket(target));add("Column index",col);if(l===1)add("New count",col+1);
   row.push(target);
   explain("Hash the key",`${target} MOD ${size} = ${bucket(target)}`,"The key shares a bucket with existing keys.");
   explain("Append",`table[${bucket(target)}, ${col}] = ${target}`,"The current count gives the next free column.");
   explain("Update count",`${col} + 1 = ${col+1}`,"The count now includes the inserted key.");
  }
  resultRows=toRows(table);hint="Use key MOD table size to find the bucket. Its count tells you the next available column.";
  code+="\nEach bucket has capacity 3.\n— = empty. Columns are zero-based.";
 }else if(focus==="probe"||focus==="search"){
  let table=Array(size).fill(null);
  function probe(key,t){let path=[];for(let j=0;j<size;j++){const i=(bucket(key)+j)%size;path.push(i);if(t[i]===null||t[i]===key)return {index:i,path,found:t[i]===key};}return{index:-1,path,found:false};}
  const base=l===2?size-1:b,key0=size*(2+n%6)+base;
  const existing=Array.from({length:l+1},(_,j)=>key0+j*size);
  existing.forEach(k=>{let p=probe(k,table);table[p.index]=k;});
  headers=["Index","Key"];const toRows=t=>t.map((x,i)=>[String(i),String(x??"—")]);
  rows=toRows(table);
  const key=focus==="probe"?key0+(l+1)*size:(l===2&&n%2===0?key0+(l+1)*size:existing.at(-1));
  const p=probe(key,table);
  prompt=focus==="probe"?`Insert ${key} using linear probing.`:`Search for ${key} using linear probing.`;
  add("Initial hash index",bucket(key));add("Indices checked in order (comma-separated)",p.path.join(", "));
  if(focus==="probe"){
   add("Final insertion index",p.index);
   if(l===2)add("Number of collisions",p.path.length-1);
  }else{
   add("Result index (-1 if not found)",p.found?p.index:-1);
   if(l===2)add("Number of indices inspected",p.path.length);
  }
  explain("Calculate hash",`${key} MOD ${size} = ${bucket(key)}`,"Start probing at this index.");
  p.path.forEach((idx,j)=>explain(`Inspect index ${idx}`,table[idx]===null?"Empty":`Key ${table[idx]}`,table[idx]===key?"Key found; stop.":table[idx]===null?(focus==="probe"?"Insert here.":"Empty slot; key not found."): `Different key; try (${idx} + 1) MOD ${size} = ${(idx+1)%size}.`));
  if(focus==="probe"){table[p.index]=key;resultRows=toRows(table);explain("Result",`table[${p.index}] = ${key}`,"All earlier entries remain unchanged.");}
  else explain("Result",p.found?`Found at index ${p.index}`:"-1 (not found)","Stop when the key is found or a genuinely empty slot is reached.");
  hint="If an occupied slot contains a different key, advance one index and wrap to 0 after the last slot.";
  code+="\n— = empty (no deleted markers).\nResolve collisions with (index + 1) MOD size.";
 }else throw Error("Unknown focus");
 return {prompt,code,rows,headers,resultRows,labels,answers,hint,steps,model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={hash:"Calculate hash indices",buckets:"Bucket insertion & deletion",probe:"Linear probing",search:"Search a hash table"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"hash",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Calculate the hash index and follow the stated collision rule."; $("visual").replaceChildren(el("div","data-label","GIVEN HASH TABLE / RULE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>normal(e.value)===normal(question.answers[i]));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
