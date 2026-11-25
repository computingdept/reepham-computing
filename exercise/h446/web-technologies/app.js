'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]);let prompt,code,preview;
 if(focus==="html"){
 const target=n%2?"https://example.test/guide":"guide.html",text=n%2?"Read guide":"Open guide";
 prompt="Complete the HTML markup.";code=`Create a link to ${target} with visible text "${text}".\n<a ____="${target}">${text}</a>`;
 add("Missing attribute","href",["href","src","id"]);ex("Link destination","href",`<a href="${target}">${text}</a>`);
 if(l>=1){code+='\n\n<label ____="email">Email</label>\n<input id="email" name="email" type="email">';add("Label attribute","for",["for","href","class"]);ex("Associate label","for=\"email\"","The label's for value matches the input id.");}
 if(l===2){code+="\n\nAdd a form submit control.";add("Correct control",'<button type="submit">Send</button>',['<button type="submit">Send</button>','<button type="button">Send</button>','<div>Send</div>']);ex("Submit control",'<button type="submit">Send</button>',"A submit button submits its associated form.");}
 }else if(focus==="css"){
 const w=140+10*(n%8),p=5+n%9,b=1+n%3,margin=3+n%7,borderBox=l===2&&n%2===0,outer=borderBox?w:w+2*p+2*b;
 prompt="Calculate the dimensions of the CSS box.";code=`.card {\n  box-sizing: ${borderBox?"border-box":"content-box"};\n  width: ${w}px;\n  padding: ${p}px;\n  border: ${b}px solid;\n  margin: ${margin}px;\n}`;
 add("Border-box width in px (exclude margin)",outer);if(l>=1)add("Total horizontal footprint including margins",outer+2*margin);if(l===2)add("Content width",borderBox?w-2*p-2*b:w);
 ex("Content and border box",String(outer)+"px",borderBox?"Declared width already includes padding and border.":`${w} + 2×${p} + 2×${b}`);ex("Margins",String(outer+2*margin)+"px","Margins are outside the border box.");preview={kind:"box",w,p,b,margin,borderBox,outer};
 }else if(focus==="selectors"){
 prompt="Predict which CSS rule applies.";code='<p id="message" class="notice">Hello</p>\n\np { color: green; }\n.notice { color: blue; }'+(l>=1?"\n#message { color: red; }":"")+(l===2?"\n.notice { color: purple; }":"");
 add("Final text colour",l===0?"blue":"red",["green","blue","red","purple"]);ex("Specificity",l===0?".notice":"#message","ID selectors outrank class selectors, which outrank type selectors, assuming equal origin, importance and layer.");if(l>=1)add("Most specific selector","#message",["p",".notice","#message"]);if(l===2)add("Does the later class rule override the ID rule?","No",["Yes","No"]);
 }else if(focus==="javascript"){
 const name=["Alex","Sam","Mia","Kai"][n%4],num=2+n%6;
 prompt="Trace JavaScript DOM operations after a click.";code=`<!-- Given inputs -->\n<input id="name" value="${name}">\n<input id="qty" value="${num}">\n<button id="go">Go</button>\n<p id="result"></p>\n\n// Script runs after the elements exist.\ndocument.querySelector("#go").addEventListener("click", () => {\n  const name = document.querySelector("#name").value;`;
 if(l===0){code+='\n  document.querySelector("#result").textContent = "Hello " + name;\n});';add("Displayed text","Hello "+name);ex("Read input",name,".value reads the input's current string.");ex("Update result","Hello "+name,"textContent sets literal text.");}
 else{code+=`\n  const qty = ${l===2?"Number(document.querySelector('#qty').value)":"document.querySelector('#qty').value"};\n  document.querySelector("#result").textContent = qty + 2;\n});`;add("Displayed text",l===2?num+2:String(num)+"2");add("Type of qty",l===2?"number":"string",["number","string","boolean"]);ex("Read value",String(num),"Input.value returns a string.");ex("Evaluate +",l===2?String(num+2):String(num)+"2",l===2?"Number converts the string, so + adds numerically.":"A string plus a number concatenates.");}
 }else if(focus==="placement"){
 const scenarios=[["Show instant feedback in a public practice quiz without storing marks","Client side","No private state is required."],["Check a student's permissions before returning private records","Server side","Authorisation must be enforced by the trusted server."],["Recalculate checkout price using trusted product data","Server side","The browser's submitted price cannot be trusted."],["Show a friendly warning while typing into a form","Client side","Immediate feedback improves usability; server must still validate submitted data."]];
 const selected=Array.from({length:l+1},(_,i)=>scenarios[(n+i)%4]);prompt="Decide where each operation must or can run.";code=selected.map((x,i)=>`${i+1}. ${x[0]}`).join("\n\n");selected.forEach((x,i)=>{add("Operation "+(i+1),x[1],["Client side","Server side"]);ex("Operation "+(i+1),x[1],x[2]);});
 }else throw Error("Focus");
 return {prompt,code,preview,labels,answers,options,steps,hint:"HTML gives structure, CSS controls presentation, JavaScript controls behaviour. The server must enforce trusted checks.",model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function boxDiagram(g,doc){
 const ns="http://www.w3.org/2000/svg",svg=doc.createElementNS(ns,"svg");svg.setAttribute("viewBox","0 0 460 210");svg.setAttribute("role","img");svg.setAttribute("aria-label","CSS box model: margin, border, padding, content");
 function s(t,a,v){let e=doc.createElementNS(ns,t);Object.entries(a).forEach(([k,x])=>e.setAttribute(k,x));if(v!==undefined)e.textContent=v;svg.append(e);}
 [["Margin",8,8,444,194,"#f4eee0"],["Border",38,32,384,146,"#e3d6ac"],["Padding",64,53,332,104,"#d6e9d7"],["Content",105,79,250,52,"#fff"]].forEach(([name,x,y,w,h,fill])=>{s("rect",{x,y,width:w,height:h,rx:4,fill,stroke:"#789b87"});s("text",{x:230,y:y+17,"text-anchor":"middle","font-size":13,fill:"#285348","font-weight":600},name);});s("text",{x:230,y:118,"text-anchor":"middle","font-size":13,fill:"#285348"},`width: ${g.w}px (${g.borderBox?"border":"content"}-box)`);return svg;
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"html":"HTML markup & forms","css":"CSS box model","selectors":"CSS selectors & cascade","javascript":"JavaScript DOM & events","placement":"Client & server processing"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"html",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the given example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));if(question.preview)$("visual").append(boxDiagram(question.preview,document));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();if(example.rows)$("demo-table").append(table(example.rows,example.headers));draw();}
 function draw(){$("demo-table").replaceChildren();if(example.preview)$("demo-table").append(boxDiagram(example.preview,document));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>normal(e.value)===normal(question.answers[i]));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
