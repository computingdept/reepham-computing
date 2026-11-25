'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),labels=[],answers=[],options=[],steps=[],add=(k,v,o)=>{labels.push(k);answers.push(String(v));options.push(o);},ex=(a,b,c)=>steps.push([a,b,c]),seed=501+n*17,idx=n%10;
 let prompt="Trace the C# operations.",code,rows,headers;
 const values=J277Paper2Array1D.makeQuestion("easy",idx,seed).values;
 if(focus==="array"){
 let a=values.slice(),i=n%a.length,j=(i+2)%a.length,original=a.slice(),k=l+2;
 code=`int[] a = { ${a.join(", ")} };\na[${i}] += ${k};`;
 a[i]+=k;ex("Update",`a[${i}] = ${a[i]}`,"Change the selected cell only.");
 if(l>=1){code+=`\na[${j}] = a[${i}] * 2;`;a[j]=a[i]*2;ex("Use updated value",`a[${j}] = ${a[j]}`,"The earlier assignment has already happened.");}
 if(l===2){code+="\nint total = 0;\nfor (int p = 0; p < a.Length; p++)\n    total += a[p];";add("total",a.reduce((s,v)=>s+v,0));ex("Accumulate",a.join(" + ")+" = "+a.reduce((s,v)=>s+v,0),"Visit every cell exactly once.");}
 add("Final array (comma-separated)",a.join(", "));headers=["Index",...original.map((_,i)=>String(i))];rows=[["Value",...original.map(String)]];
 }else if(focus==="matrix"){
 const m=J277Paper2Array2D.makeQuestion("easy",idx,seed).values, r=n%3,c=n%4;
 headers=["Row / Col","0","1","2","3"];rows=m.map((a,i)=>[String(i),...a.map(String)]);
 if(l===0){code=`int[,] a = /* given grid */;\nConsole.WriteLine(a[${r}, ${c}]);`;add("Output",m[r][c]);ex("Locate cell",`a[${r},${c}] = ${m[r][c]}`,"Row first, then column.");}
 else if(l===1){code=`int total = 0;\nfor (int col = 0; col < 4; col++)\n    total += a[${r}, col];`;add("total",m[r].reduce((a,b)=>a+b,0));ex("Fixed row",m[r].join(" + "),"Only the column index changes.");}
 else{code=`int count = 0;\nfor (int row = 0; row < 3; row++)\n    for (int col = 0; col < 4; col++)\n        if (a[row,col] >= ${m[r][c]}) count++;`;let count=0;m.forEach((row,i)=>{count+=row.filter(x=>x>=m[r][c]).length;ex("Row "+i,`count = ${count}`,"Check all columns in the row.");});add("Cells inspected",12);add("Final count",count);}
 }else if(focus==="3d"){
 const a=values.slice(0,4),b=a.map(x=>x+10),layers=[[a.slice(0,2),a.slice(2)],[b.slice(0,2),b.slice(2)]],x=n%2,y=(n>>1)%2,z=(n>>2)%2;
 code=`int[,,] a = /* 2 layers, 2 rows, 2 columns */;\n// a[layer,row,column]\nConsole.WriteLine(a[${x},${y},${z}]);`;
 headers=["Layer","Row","Col 0","Col 1"];rows=layers.flatMap((layer,i)=>layer.map((row,j)=>[String(i),String(j),...row.map(String)]));add("Printed value",layers[x][y][z]);ex("Locate",`Layer ${x}, row ${y}, column ${z} = ${layers[x][y][z]}`,"Apply the indices in order.");
 if(l>=1){code+=`\na[${x},${y},${z}] += 5;`;layers[x][y][z]+=5;add("Updated value",layers[x][y][z]);ex("Update",String(layers[x][y][z]),"Only one cell changes.");}
 if(l===2){add("Total elements",8);ex("Size","2 × 2 × 2 = 8","Multiply the dimension lengths.");}
 }else if(focus==="lists"){
 let a=values.slice(0,4),v=40+n%9;code=`var a = new List<int> { ${a.join(", ")} };\na.Insert(1, ${v});`;a.splice(1,0,v);ex("Insert",a.join(", "),"Insert at index 1; later elements shift right.");
 if(l>=1){code+="\na.RemoveAt(2);";a.splice(2,1);ex("RemoveAt",a.join(", "),"Remove by index, then close the gap.");}
 if(l===2){code+=`\na.Add(${v});\na.Remove(${v});`;a.push(v);a.splice(a.indexOf(v),1);ex("Add then Remove",a.join(", "),"Remove(value) removes the first matching item.");}
 add("Final list (comma-separated)",a.join(", "));add("a.Count",a.length);
 }else if(focus==="records"){
 const q=J277Paper2Records.makeQuestion("easy",idx,seed),r=n%4;headers=["Index","Forename","Surname","House"];rows=q.values.map((v,i)=>[String(i),...v]);
 code=`// Each row is a Pupil record with named fields.\nConsole.WriteLine(pupils[${r}].Surname);`;add("Output",q.values[r][1]);ex("Read field",q.values[r][1],"Select the record by index, then the named field.");
 if(l>=1){code+=`\npupils[${r}].House = "${q.values[(r+1)%4][2]}";`;add("Updated House",q.values[(r+1)%4][2]);ex("Update field",q.values[(r+1)%4][2],"The other fields are unchanged.");}
 if(l===2){add("Suitable structure for mixed named fields","Record",["Record","Integer array","Boolean"]);ex("Choose a structure","Record","A record groups related named fields, potentially of different types.");}
 }else if(focus==="tuples"){
 const a=values[0],b=values[1];code=`var pair = (Name: "Alex", Score: ${a});\nConsole.WriteLine(pair.Score);`;add("Output",a);ex("Read tuple",String(a),"The named element Score holds an integer.");
 if(l>=1){code+=`\nvar next = (Name: pair.Name, Score: pair.Score + ${b});`;add("next.Score",a+b);add("pair.Score",a);ex("Create new tuple",`(${a+b})`,"Creating next does not change pair.");}
 if(l===2){add("Typical immutable tuple permits changing an element in place","No",["Yes","No"]);ex("Language distinction","Immutable tuple vs C# ValueTuple","OCR often contrasts immutable tuples with mutable lists; C# ValueTuple itself is mutable.");}
 }else throw Error("Focus");
 return {prompt,code:code.split("\n").map((s,i)=>String(i+1).padStart(2,"0")+"  "+s).join("\n"),rows,headers,labels,answers,options,steps,hint:"Trace each operation in order. Indices begin at zero; distinguish named fields and indexed elements.",model:steps.map(x=>x.join("\n")).join("\n\n")};
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={"array":"1D arrays","matrix":"2D arrays","3d":"3D arrays","lists":"Lists","records":"Records","tuples":"Tuples"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"array",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Work through the given example before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN EXAMPLE"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
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
