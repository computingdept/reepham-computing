'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),w=l===2?12:8,max=2**w-1,word=(n*57+0xB6)&max,bit=i=>1<<i,positions=[n%w,(n+3)%w,(n+5)%w].slice(0,l+1),mask=positions.reduce((s,i)=>s|bit(i),0),bin=x=>(x&max).toString(2).padStart(w,"0"),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);let prompt,code,headers,rows;
 const setup=`${w}-bit unsigned register: ${bin(word)}\nBit 0 is the rightmost (least significant) bit.`;
 if(focus==="apply"){
 const op=["AND","OR","XOR"][n%3],result=op==="AND"?word&mask:op==="OR"?word|mask:word^mask;
 prompt="Apply the selected bitwise operation.";code=setup+`\nMask: ${bin(mask)}\nOperation: ${op}`;
 headers=["Bit",...Array.from({length:w},(_,i)=>String(w-1-i))];rows=[["Register",...bin(word)],["Mask",...bin(mask)]];
 add(`Result (${w} bits)`,bin(result));ex(op,`${bin(word)} ${op} ${bin(mask)} = ${bin(result)}`,op==="AND"?"A result bit is 1 only when both bits are 1.":op==="OR"?"A result bit is 1 when either input bit is 1.":"A result bit is 1 when inputs differ.");
 if(l>=1)add("Result as unsigned denary",result);if(l===2){add("Mask as hexadecimal (no prefix)",mask.toString(16).toUpperCase());ex("Hexadecimal",mask.toString(16).toUpperCase(),"Each group of four bits represents one hexadecimal digit.");}
 }else if(focus==="design"){
 const action=["Set","Clear","Toggle","Keep"][n%4],op={Set:"OR",Clear:"AND",Toggle:"XOR",Keep:"AND"}[action],m=action==="Clear"?max^mask:mask,result=op==="AND"?word&m:op==="OR"?word|m:word^m;
 prompt="Design a mask and use it on the register.";code=setup+`\n${action} bit(s) ${positions.join(", ")}. ${action==="Keep"?"Clear every other bit.":"Leave all other bits unchanged."}`;
 add("Bitwise operation",op,["AND","OR","XOR"]);add(`Mask (${w} bits)`,bin(m));add(`Result (${w} bits)`,bin(result));ex("Choose operation",op,"Set with OR; clear or keep with AND; toggle with XOR.");ex("Construct mask",bin(m),action==="Clear"?"Put 0 at cleared positions and 1 everywhere else.":"Put 1 at the selected positions.");ex("Apply",bin(result),"Apply the operation to each corresponding pair of bits.");
 if(l===2)add("Result as unsigned denary",result);
 }else if(focus==="flags"){
 const names=["Ready","Busy","Error","Online","Warning","Locked","Updated","Enabled"],i=n%8,j=(i+3)%8,test=bit(i)|bit(j),read=word&test,any=read!==0,all=read===test;
 prompt="Interpret the status register and test its flags.";code=setup+"\n"+names.map((x,i)=>`Bit ${i}: ${x}`).join("\n")+`\nTest ${names[i]} and ${names[j]}.`;
 add(`${names[i]} set?`,word&bit(i)?"Yes":"No",["Yes","No"]);add(`${names[j]} set?`,word&bit(j)?"Yes":"No",["Yes","No"]);ex("Test individual bits",`${names[i]}=${word&bit(i)?1:0}; ${names[j]}=${word&bit(j)?1:0}`,"AND with a one-bit mask isolates the selected flag.");
 if(l>=1){add(`Combined test mask (${w} bits)`,bin(test));add("At least one selected flag set?",any?"Yes":"No",["Yes","No"]);ex("Any flag",`(register & mask) != 0 → ${any}`,"A nonzero masked result means at least one selected bit is set.");}
 if(l===2){add("Both selected flags set?",all?"Yes":"No",["Yes","No"]);ex("All flags",`(register & mask) == mask → ${all}`,"All selected positions must survive the AND.");}
 }else if(focus==="sequence"){
 const a=positions[0],b=(a+2)%w,c=(a+4)%w,s1=word|bit(a),s2=s1&(max^bit(b)),s3=s2^bit(c);
 prompt="Trace successive bitwise updates.";code=setup+`\n1. Set bit ${a}.\n2. Clear bit ${b}.`+(l>=1?`\n3. Toggle bit ${c}.`:"");
 add(`After setting (${w} bits)`,bin(s1));add(`After clearing (${w} bits)`,bin(s2));ex("Set",bin(s1),`OR with ${bin(bit(a))}.`);ex("Clear",bin(s2),`AND with ${bin(max^bit(b))}.`);
 if(l>=1){add(`After toggling (${w} bits)`,bin(s3));ex("Toggle",bin(s3),`XOR with ${bin(bit(c))}.`);}
 if(l===2){add("Final value as unsigned denary",s3);add("Number of set bits in final register",[...bin(s3)].filter(x=>x==="1").length);}
 }else throw Error("Focus");
 return {prompt,code,headers,rows,labels,answers,options,steps,hint:"OR sets selected bits, AND clears or isolates bits, XOR toggles bits. Remember bit 0 is on the right.",model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"apply":"Apply a mask","design":"Design a mask","flags":"Status register flags","sequence":"Successive updates"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"apply",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){if(example.rows)$("demo-table").replaceChildren(table(step>=example.steps.length&&example.resultRows?example.resultRows:example.rows,example.headers));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>(question.labels[i].includes("bits)")?e.value.replace(/\s/g,"")===question.answers[i]:normal(e.value).toLowerCase()===normal(question.answers[i]).toLowerCase()));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
