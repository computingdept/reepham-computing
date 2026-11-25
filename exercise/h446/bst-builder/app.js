'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),offset=(n%13)*3;
 const shapes=[[40,20,60],[40,20,60,10,30,50],[40,20,70,10,30,60,80,25],[40,15,65,25,50,75,20,55]];
 const values=shapes[l===2?2+n%2:l].map(v=>v+offset),nodes=[];
 function add(v){let id=nodes.length;nodes.push({v,left:-1,right:-1});if(id===0)return {id,parent:-1,side:"root",path:[]};let p=0,path=[];while(true){path.push(nodes[p].v);const side=v<nodes[p].v?"left":"right";if(nodes[p][side]===-1){nodes[p][side]=id;return{id,parent:p,side,path};}p=nodes[p][side];}}
 values.forEach(add);
 const initial=nodes.map(x=>({...x})),labels=[],answers=[],steps=[];
 const field=(label,answer)=>{labels.push(label);answers.push(String(answer));};
 const explain=(title,working,reason)=>steps.push([title,working,reason]);
 function search(v){let i=0,path=[];while(i!==-1){const x=nodes[i];path.push(x.v);if(x.v===v)return {index:i,path};i=x[v<x.v?"left":"right"];}return {index:-1,path};}
 let prompt="",hint="",code="Smaller values go left. Larger values go right.\nAll keys are unique. -1 = no child.",options;
 if(focus==="insert"){
  const choices=[25,55,5,90,35,45,67].map(x=>x+offset).filter(x=>!values.includes(x));
  const target=choices[(n+l)%choices.length],res=add(target);
  prompt=`Insert ${target} into the binary search tree.`;
  field("Parent value",nodes[res.parent].v);field("Child side (left or right)",res.side);
  if(l>=1)field("Values compared, in order (comma-separated)",res.path.join(", "));
  if(l===2)field("Index of new node (next free index)",res.id);
  hint="Start at the root. At each node compare the new value, then follow the correct child until an empty link is reached.";
  res.path.forEach(v=>explain(`Compare with ${v}`,`${target} ${target<v?"<":">"} ${v}`,`Go ${target<v?"left":"right"}.`));
  explain("Insert",`${nodes[res.parent].v} → ${res.side} → ${target}`,"The child link is now occupied by the new leaf.");
  explain("Array representation",`${res.side}[${res.parent}] = ${res.id}`,"The new node uses the next free index; both its child pointers are -1.");
 }else if(focus==="search"){
  const target=l===0?values[1+n%(values.length-1)]:l===1?values.at(-1):n%2?values.at(-1):99+offset;
  const res=search(target);prompt=`Search the BST for ${target}.`;
  field("Values visited, in order (comma-separated)",res.path.join(", "));
  field("Result index (-1 if not found)",res.index);
  if(l===2)field("Number of value comparisons",res.path.length);
  hint="Compare against the current node once. Stop on equality or when the chosen child pointer is -1.";
  res.path.forEach(v=>explain(`Visit ${v}`,target===v?`${target} = ${v}`:`${target} ${target<v?"<":">"} ${v}`,target===v?"Found the target.":`Follow the ${target<v?"left":"right"} child.`));
  explain("Result",res.index===-1?"-1 — not found":`Found at index ${res.index}`,`${res.path.length} node-value comparisons.`);
 }else if(focus==="table"){
  prompt="Complete the Left / Data / Right pointer table using the tree.";
  code="Root index = 0\n-1 = no child\nChild pointers store indices, not data values.";
  const selected=l===0?[0,1+n%(nodes.length-1)]:l===1?[0,1+n%(nodes.length-1),nodes.length-1]:Array.from({length:nodes.length},(_,j)=>j);
  selected.forEach(i=>{field(`Index ${i} (${nodes[i].v}): Left pointer`,nodes[i].left);field(`Index ${i} (${nodes[i].v}): Right pointer`,nodes[i].right);});
  selected.forEach(i=>explain(`Index ${i}`,`${nodes[i].left} | ${nodes[i].v} | ${nodes[i].right}`,"Record each child index; an absent child is -1."));
  hint="Read the small index beside each node. Do not enter the child's key as its pointer.";
 }else if(focus==="delete"){
  let eligible=nodes.map((x,i)=>({x,i})).filter(({x,i})=>i!==0&&(l===2?(x.left===-1||x.right===-1):x.left===-1&&x.right===-1));
  if(l===2&&eligible.some(({x})=>x.left!==-1||x.right!==-1))eligible=eligible.filter(({x})=>x.left!==-1||x.right!==-1);
  const {x,i}=eligible[n%eligible.length],p=nodes.findIndex(a=>a.left===i||a.right===i),side=nodes[p].left===i?"left":"right",replacement=x.left!==-1?x.left:x.right;
  prompt=`Remove node ${x.v}${replacement!==-1?" (one child)":" (a leaf)"}. Update the parent's link.`;
  field("Parent index",p);field("Pointer to update (left or right)",side);field("New pointer value",replacement);
  if(l===2)field("Value of promoted child (-1 if none)",replacement===-1?-1:nodes[replacement].v);
  hint="For a leaf use -1. For a node with one child, link its parent directly to that child.";
  explain("Locate",`Index ${i}, parent index ${p}`,"Follow the search comparisons from the root.");
  explain("Update link",`${side}[${p}] = ${replacement}`,replacement===-1?"The leaf has no children.":"The sole child replaces the deleted node.");
  explain("Remove",`Index ${i} is no longer reachable`,"Reclaim storage separately if required.");
  nodes[p][side]=replacement;
 }else throw Error("Unknown focus");
 return {prompt,code,tree:initial,resultTree:focus==="insert"||focus==="delete"?nodes:null,labels,answers,hint,steps,options,model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function treeDiagram(nodes,doc){
 const NS="http://www.w3.org/2000/svg",svg=doc.createElementNS(NS,"svg");
 svg.setAttribute("viewBox","0 0 560 330");svg.setAttribute("class","tree-diagram");svg.setAttribute("role","img");svg.setAttribute("aria-label",nodes.map((x,i)=>`Index ${i}, value ${x.v}, left ${x.left}, right ${x.right}`).join("; "));
 let coords={},ordered=[],maxDepth=0;
 function walk(i,d){if(i<0)return;walk(nodes[i].left,d+1);ordered.push(i);coords[i]={d};maxDepth=Math.max(maxDepth,d);walk(nodes[i].right,d+1);}
 walk(0,0);ordered.forEach((i,j)=>{coords[i].x=35+j*(490/Math.max(1,ordered.length-1));coords[i].y=38+coords[i].d*(248/Math.max(1,maxDepth));});
 function shape(tag,attrs,txt){let e=doc.createElementNS(NS,tag);for(let [k,v] of Object.entries(attrs))e.setAttribute(k,v);if(txt!==undefined)e.textContent=txt;svg.append(e);return e;}
 ordered.forEach(i=>{for(const side of ["left","right"]){const child=nodes[i][side];if(child<0)continue;let a=coords[i],b=coords[child];shape("line",{x1:a.x,y1:a.y,x2:b.x,y2:b.y});}});
 ordered.forEach(i=>{let a=coords[i];shape("circle",{cx:a.x,cy:a.y,r:23});shape("text",{x:a.x,y:a.y},String(nodes[i].v));const t=shape("text",{x:a.x,y:a.y+34},`[${i}]`);t.style.fontSize="12px";t.style.fontWeight="600";});
 return svg;
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={insert:"Insert a node",search:"Search a BST",table:"Array pointer table",delete:"Delete a node"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"insert",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows){const t=el("table","trace-table"),head=el("tr");["Index","Data","Next"].forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Use the tree and its node indices before checking."; $("visual").replaceChildren(el("div","data-label","GIVEN TREE"),el("pre","review-code",question.code));$("visual").append(treeDiagram(question.tree,document));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();$("demo-table").append(treeDiagram(example.tree,document));draw();}
 function draw(){$("demo-table").replaceChildren(treeDiagram(step>=example.steps.length&&example.resultTree?example.resultTree:example.tree,document));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>normal(e.value)===normal(question.answers[i]));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
