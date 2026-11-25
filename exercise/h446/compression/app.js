'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);let prompt,code,headers,rows;
 if(focus==="rle"){
 const chars=n%2?["W","B","W","B","W"]:["A","B","A","C","A"],lengths=Array.from({length:3+l},(_,i)=>l===2&&n%3===0?1:1+(n+i*3)%6),runs=lengths.map((len,i)=>[chars[i],len]),plain=runs.map(([c,k])=>c.repeat(k)).join(""),encoded=runs.map(([c,k])=>k+c).join(" ");
 const bytes=runs.length*2;
 if(n%2===0){prompt="Encode the sequence using run-length encoding.";code=`Original: ${plain}\nUse count then symbol, e.g. 3A 2B. Keep separated runs separate.`;add("Encoded runs",encoded);}
 else{prompt="Decode the run-length encoded sequence.";code=`Encoded: ${encoded}\nEach pair is count then symbol.`;add("Decoded sequence (no spaces)",plain);}
 runs.forEach(([c,k],i)=>ex("Run "+(i+1),`${c.repeat(k)} ↔ ${k}${c}`,"Count consecutive identical symbols only."));
 if(l>=1){code+="\nAssume one byte per original symbol and one byte each for count and symbol; ignore headers.";add("Original bytes",plain.length);add("Encoded bytes",bytes);ex("Size comparison",`${plain.length} → ${bytes} bytes`,"Each encoded run costs two bytes.");}
 if(l===2){add("Bytes saved (negative means expansion)",plain.length-bytes);add("Result",bytes<plain.length?"Smaller":bytes===plain.length?"Same size":"Larger",["Smaller","Same size","Larger"]);ex("Evaluate",String(plain.length-bytes)+" bytes saved","Short alternating runs may make RLE larger than the original.");}
 }else if(focus==="dictionary"){
 const words=n%2?["RED","BLUE","GREEN"]:["CAT","DOG","BIRD"],tokens=["1","2","3"],parts=Array.from({length:4+l},(_,i)=>(n+i*2)%3),plain=parts.map(i=>words[i]).join(" "),encoded=parts.map(i=>tokens[i]).join(" ");
 headers=["Token","Substring"];rows=tokens.map((x,i)=>[x,words[i]]);
 prompt=n%2?"Decode the dictionary references.":"Encode the text using the dictionary.";code=`${n%2?"Encoded: "+encoded:"Original: "+plain}\nSpaces are literal separators. Digits are reserved tokens; they cannot occur as literal text.`;
 add(n%2?"Decoded text":"Encoded tokens separated by spaces",n%2?plain:encoded);
 parts.forEach((i,j)=>ex("Word "+(j+1),`${words[i]} ↔ ${tokens[i]}`,"Use the agreed dictionary entry; preserve spaces."));
 if(l>=1){const overhead=words.reduce((s,w)=>s+w.length+1,0);code+=`\nEach character/token/space = 1 byte. Dictionary overhead = ${overhead} bytes when transmitted.`;add("Original bytes",plain.length);add("Encoded bytes excluding dictionary",encoded.length);ex("Payload size",`${plain.length} → ${encoded.length}`,"Count the spaces as well as the tokens.");if(l===2){add("Encoded bytes including dictionary",encoded.length+overhead);add("Net bytes saved including dictionary",plain.length-encoded.length-overhead);ex("Include dictionary",`${encoded.length} + ${overhead} = ${encoded.length+overhead}`,"Dictionary overhead can outweigh short-message savings.");}}
 }else if(focus==="choice"){
 const cases=[["Source code archive; must restore every byte","Lossless","Exact reconstruction required"],["Text containing names and dates; no changes allowed","Lossless","Exact reconstruction required"],["Small web thumbnail; acceptable quality reduction permitted","Lossy","Discarding detail can reduce transfer size"],["Video stream; lower quality acceptable to avoid buffering","Lossy","Discarding detail can reduce transfer size"],["Backup of a database; exact recovery required","Lossless","Exact reconstruction required"]];
 const [scenario,answer,reason]=cases[n%cases.length];prompt="Choose a compression method for the requirement.";code=scenario;
 add("Compression type",answer,["Lossless","Lossy"]);ex("Requirement",reason,"Match the method to the purpose of the data.");
 if(l>=1){add("Can discarded information be recovered from a lossy copy alone?","No",["Yes","No"]);ex("Reversibility","Lossy discards information","Retain originals where exact recovery matters.");}
 if(l===2){const old=200+20*(n%5),now=old/2;code+=`\nA file of ${old} KB becomes ${now} KB.`;add("Percentage reduction",50);ex("Reduction",`(${old} − ${now}) / ${old} × 100 = 50%`,"Compare saved size with original size.");}
 }else throw Error("Focus");
 return {prompt,code,headers,rows,labels,answers,options,steps,hint:focus==="rle"?"Start a new run whenever the symbol changes.":focus==="dictionary"?"Replace only exact dictionary entries; preserve separators and count overhead.":"Choose lossless when exact restoration is required.",model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"rle":"Run-length encoding","dictionary":"Dictionary compression","choice":"Lossy & lossless"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"rle",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the scenario before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>(question.labels[i].includes("bits")?e.value.replace(/[\s,]/g,"")===question.answers[i]:normal(e.value).toLowerCase()===normal(question.answers[i]).toLowerCase()));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
