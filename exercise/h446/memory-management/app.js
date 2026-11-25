'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);let prompt,code,headers,rows,resultRows;
 if(focus==="paging"){
 const size=[100,256,1024][l],p=1+n%4,offset=(13+n*17)%size,virtual=p*size+offset,frames=[3,7,1,6,2].map(x=>(x+n)%8),frame=frames[p],physical=frame*size+offset;
 prompt="Translate the virtual address into a physical address.";code=`Page and frame size = ${size} bytes\nVirtual byte address = ${virtual}\nAll listed pages are present. Numbering starts at 0.`;
 headers=["Virtual page","Physical frame"];rows=frames.map((x,i)=>[String(i),String(x)]);
 add("Page number",p);add("Offset within page",offset);if(l>=1)add("Frame number",frame);add("Physical byte address",physical);
 ex("Divide",`${virtual} DIV ${size} = ${p}`, "The quotient identifies the virtual page.");ex("Remainder",`${virtual} MOD ${size} = ${offset}`,"The byte offset stays unchanged.");ex("Look up frame",String(frame),"Use the page table.");ex("Translate",`${frame} × ${size} + ${offset} = ${physical}`,"The frame base plus offset is the physical address.");
 }else if(focus==="segmentation"){
 const limits=[80,150,220],bases=[1000,2500,4000].map(x=>x+20*(n%8)),s=n%3,offset=l===0?20+n%30:l===1?limits[s]-1:n%2?limits[s]:limits[s]-2,valid=offset<limits[s];
 prompt="Check the segment limit, then translate the logical address.";code=`Logical address = (segment ${s}, offset ${offset})\nLimit is segment length in bytes.\nValid offsets are 0 to length − 1.`;
 headers=["Segment","Base address","Length"];rows=bases.map((x,i)=>[String(i),String(x),String(limits[i])]);
 add("Valid access?",valid?"Yes":"No",["Yes","No"]);add("Physical byte address (or invalid)",valid?bases[s]+offset:"invalid");if(l>=1)add("Largest valid offset",limits[s]-1);
 ex("Look up segment",`Base ${bases[s]}; length ${limits[s]}`,"Segments can have different lengths.");ex("Bounds check",`${offset} < ${limits[s]}: ${valid?"true":"false"}`,"Reject an out-of-bounds offset before accessing memory.");ex("Translate",valid?`${bases[s]} + ${offset} = ${bases[s]+offset}`:"Invalid access","A valid offset is added to the segment base.");
 }else if(focus==="virtual"){
 const cap=l===0?2:3,refs=l===0?[0,1,0,2,1]:l===1?[0,1,2,0,3,1,4]:[0,1,2,3,0,4,1,2,3,0],seq=refs.map(v=>(v+n)%6),resident=[],faults=[],states=[];
 seq.forEach((p,i)=>{const hit=resident.includes(p);let removed=null;if(!hit){if(resident.length===cap)removed=resident.shift();resident.push(p);}faults.push(!hit);states.push(resident.slice());ex(`Access ${i+1}: page ${p}`,`${hit?"Hit":"Page fault"}; frames [${resident.join(", ")}]`,hit?"Already resident; FIFO order is unchanged.":removed===null?"Load the missing page into a free frame.":`Evict oldest loaded page ${removed}, then load the requested page.`);});
 prompt="Trace page faults using the stated FIFO policy.";code=`RAM has ${cap} frames, initially empty.\nPage requests: ${seq.join(", ")}\nFIFO replacement: evict the oldest loaded page. A hit does not change its position.\nAssume every page is valid and available on backing storage.`;
 add("Access results (H = hit, F = fault; letters only)",faults.map(f=>f?"F":"H").join(""));add("Total page faults",faults.filter(Boolean).length);if(l>=1)add("Final resident pages (oldest first, comma-separated)",resident.join(", "));if(l===2)add("Effect of excessive page transfers","Thrashing",["Thrashing","Pipelining","Segmentation"]);
 ex("Count faults",String(faults.filter(Boolean).length),"Repeated transfers between RAM and backing storage may dominate runtime.");
 }else throw Error("Focus");
 return {prompt,code,headers,rows,resultRows,labels,answers,options,steps,hint:focus==="paging"?"Divide by page size, retain the remainder, then use the frame number.":focus==="segmentation"?"Check offset < length before adding the base address.":"Check whether the requested page is already resident before loading or evicting.",model:steps.map(x=>x.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"paging":"Paging & address translation","segmentation":"Segmentation","virtual":"Virtual memory & page faults"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"paging",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
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
