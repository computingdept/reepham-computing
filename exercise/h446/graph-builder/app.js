'use strict';
function make(focus,level,n){
 const l=["easy","medium","hard"].indexOf(level),size=4+l,directed=l===1||(l===2&&n%2===1),names="ABCDEF".slice(0,size).split("");
 const shift=n%size,order=Array.from({length:size},(_,i)=>(i+shift)%size);
 if(Math.floor(n/size)%2)order.reverse();
 const pairs=[[0,1],[1,2],[2,3],...(l>=1?[[3,4],[0,3]]:[]),...(l===2?[[4,5],[1,4],[5,0]]:[])];
 if(n%3===0)pairs.push([0,2]);else if(n%3===1)pairs.push([1,3]);else pairs.push([0,size-1]);
 const edges=[],matrix=Array.from({length:size},()=>Array(size).fill(0));
 function connect(a,b){if(a===b||matrix[a][b])return;matrix[a][b]=1;if(!directed)matrix[b][a]=1;edges.push([a,b]);}
 pairs.forEach(([a,b])=>connect(order[a],order[b]));
 const original=matrix.map(r=>r.slice()),initialEdges=edges.map(e=>e.slice()),labels=[],answers=[],steps=[];
 const add=(label,a)=>{labels.push(label);answers.push(String(a));},explain=(title,work,why)=>steps.push([title,work,why]);
 const neighbours=(m,i)=>names.filter((_,j)=>m[i][j]===1).join(", ")||"none";
 const rows=m=>m.map((r,i)=>[names[i],...r.map(String)]),headers=["From / To",...names];
 let prompt,hint,showMatrix=false,resultRows,resultGraph;
 let code=`${directed?"Directed":"Undirected"} graph · ${size} vertices\n${directed?"Follow arrows in their indicated direction.":"Every edge connects both endpoints."}\nUse vertex order ${names.join(", ")}.`;
 const chosen=order[n%size],graph={names,edges:initialEdges,directed};
 if(focus==="neighbours"){
  prompt="Identify directly connected neighbours.";
  add(`Neighbours reachable directly from ${names[chosen]} (alphabetical, or none)`,neighbours(matrix,chosen));
  explain(`Inspect vertex ${names[chosen]}`,`${names[chosen]}: ${neighbours(matrix,chosen)}`,directed?"Follow outgoing arrows only.":"Follow each incident edge in either direction.");
  if(l>=1){const other=order[(n+2)%size];add(`Neighbours reachable directly from ${names[other]} (alphabetical, or none)`,neighbours(matrix,other));explain(`Inspect ${names[other]}`,`${names[other]}: ${neighbours(matrix,other)}`,"A path through another vertex is not a direct connection.");}
  if(l===2){add("Total number of edges",edges.length);explain("Count edges",String(edges.length),"Count each drawn edge once.");}
  hint="A neighbour is one edge away. In directed graphs, only arrows leaving the vertex count.";
 }else if(focus==="matrix"){
  prompt="Complete the adjacency matrix from the graph.";
  code+="\n1 = edge exists; 0 = no edge.\nRows = from; columns = to.";
  const selected=l===0?[order[0],order[2]]:l===1?order.slice(0,3):names.map((_,i)=>i);
  selected.forEach(i=>{add(`Row ${names[i]} (enter ${size} bits in order)`,matrix[i].join(""));explain(`Row ${names[i]}`,`${names.join(" ")}\n${matrix[i].join(" ")}`,`Direct neighbours: ${neighbours(matrix,i)}.`);});
  resultRows=rows(matrix);hint="For each row, write 1 under a directly connected destination, otherwise 0. Undirected matrices are symmetric.";
 }else if(focus==="lists"){
  prompt="Convert the adjacency matrix into adjacency lists.";
  showMatrix=true;code+="\nRows = from; columns = to.\nWrite neighbours in alphabetical order, or none.";
  const selected=l===0?order.slice(0,2):l===1?order.slice(0,3):names.map((_,i)=>i);
  selected.forEach(i=>{add(`Adjacency list for ${names[i]}`,neighbours(matrix,i));explain(`Read row ${names[i]}`,`${names[i]}: ${neighbours(matrix,i)}`,"Every 1 identifies a destination to include.");});
  hint="Read across a row and list the column labels containing a 1. A row with all zeros has no outgoing neighbours.";
 }else if(focus==="edit"){
  showMatrix=true;
  const remove=edges[n%edges.length],candidates=[];for(let i=0;i<size;i++)for(let j=0;j<size;j++)if(i!==j&&!matrix[i][j]&&(directed||i<j))candidates.push([i,j]);
  const addition=candidates[n%candidates.length],edgeLabel=([a,b])=>names[a]+(directed?" → ":" — ")+names[b];
  prompt=l===0?`Add edge ${edgeLabel(addition)}.`:l===1?`Remove edge ${edgeLabel(remove)}.`:`Remove ${edgeLabel(remove)}, then add ${edgeLabel(addition)}.`;
  code+="\nRows = from; columns = to.\n1 = edge exists; 0 = no edge.";
  const changes=l===0?[[addition,1]]:l===1?[[remove,0]]:[[remove,0],[addition,1]];
  changes.forEach(([[a,b],v])=>{matrix[a][b]=v;if(!directed)matrix[b][a]=v;add(`New value at [${names[a]}, ${names[b]}]`,v);add(`New value at [${names[b]}, ${names[a]}]`,matrix[b][a]);explain(v?"Add edge":"Remove edge",`[${names[a]}, ${names[b]}] = ${v}; [${names[b]}, ${names[a]}] = ${matrix[b][a]}`,directed?"Only the specified direction changes.":"Update both symmetric cells.");});
  if(l===2){add(`New row ${names[addition[0]]} (${size} bits)`,matrix[addition[0]].join(""));}
  resultRows=rows(matrix);resultGraph={names,directed,edges:matrix.flatMap((r,i)=>r.flatMap((v,j)=>v&&(directed||i<j)?[[i,j]]:[]))};
  hint=directed?"Only change the cell from the source to the destination.":"An undirected edge requires changing two mirrored cells.";
 }else throw Error("Unknown focus");
 return {prompt,code,graph,rows:showMatrix?rows(original):null,headers,resultRows,resultGraph,labels,answers,hint,steps,model:steps.map(s=>s.join("\n")).join("\n\n")};
}
function graphDiagram(g,doc){
 const ns="http://www.w3.org/2000/svg",svg=doc.createElementNS(ns,"svg");
 svg.setAttribute("viewBox","0 0 520 330");svg.setAttribute("class","tree-diagram");svg.setAttribute("role","img");svg.setAttribute("aria-label",`${g.directed?"Directed":"Undirected"} graph: `+g.edges.map(([a,b])=>g.names[a]+(g.directed?" to ":" connected to ")+g.names[b]).join("; "));
 function shape(tag,attrs,text,parent=svg){const e=doc.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));if(text!==undefined)e.textContent=text;parent.append(e);return e;}
 const defs=shape("defs",{}),marker=shape("marker",{id:"edge-arrow",viewBox:"0 0 10 10",refX:9,refY:5,markerWidth:5,markerHeight:5,orient:"auto-start-reverse"},undefined,defs);shape("path",{d:"M 0 0 L 10 5 L 0 10 z",fill:"#52866a"},undefined,marker);
 const pos=g.names.map((_,i)=>{let a=-Math.PI/2+2*Math.PI*i/g.names.length;return [260+200*Math.cos(a),165+123*Math.sin(a)];});
 g.edges.forEach(([a,b])=>{let [x,y]=pos[a],[xx,yy]=pos[b],dx=xx-x,dy=yy-y,len=Math.hypot(dx,dy),ux=dx/len,uy=dy/len;const reciprocal=g.directed&&g.edges.some(([p,q])=>p===b&&q===a),off=reciprocal?8:0;const attrs={x1:x+ux*24-uy*off,y1:y+uy*24+ux*off,x2:xx-ux*27-uy*off,y2:yy-uy*27+ux*off,stroke:"#52866a","stroke-width":3};if(g.directed)attrs["marker-end"]="url(#edge-arrow)";shape("line",attrs);});
 pos.forEach(([x,y],i)=>{shape("circle",{cx:x,cy:y,r:23});shape("text",{x,y},g.names[i]);});return svg;
}
function mount(){
 const $=id=>document.getElementById(id),el=(tag,cls,t)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
 const topics={neighbours:"Direct neighbours",matrix:"Adjacency matrix",lists:"Adjacency lists",edit:"Add & remove edges"};
 const params=new URLSearchParams(location.search);let focus=Object.hasOwn(topics,params.get("focus"))?params.get("focus"):"neighbours",level=["easy","medium","hard"].includes(params.get("level"))?params.get("level"):"easy",n=0,question,step=0,example;
 const select=$("focus");Object.entries(topics).forEach(([v,t])=>{let o=el("option","",t);o.value=v;select.append(o);});select.value=focus;
 const levels=[...document.querySelectorAll("[data-level]")],normal=v=>String(v).trim().replace(/\s+/g," ").replace(/\s*([,=;])\s*/g,"$1");
 function table(rows,headers){const t=el("table","trace-table"),head=el("tr");headers.forEach(s=>head.append(el("th","",s)));t.append(head);rows.forEach(r=>{const tr=el("tr");r.forEach(s=>tr.append(el("td","",s)));t.append(tr);});return t;}
 function render(){question=make(focus,level,n);$("question-number").textContent="Question "+(n+1);$("prompt").textContent=question.prompt;$("instruction").textContent="Follow the edges and use the stated vertex order."; $("visual").replaceChildren(el("div","data-label","GIVEN GRAPH / REPRESENTATION"),el("pre","review-code",question.code));if(question.rows)$("visual").append(table(question.rows,question.headers));else $("visual").append(graphDiagram(question.graph,document));$("entry").replaceChildren();question.labels.forEach((t,i)=>{let w=el("label","review-field"),opts=question.options?.[i],input=el(opts?"select":"input");if(opts){let blank=el("option","","Choose…");blank.value="";input.append(blank);opts.forEach(s=>input.append(el("option","",s)));}else{input.type="text";input.autocomplete="off";input.spellcheck=false;}w.append(el("span","",t),input);$("entry").append(w);});$("feedback").textContent="";$("explainer").hidden=true;$("hint").textContent="Show hint";levels.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));}
 function openDemo(){example=make(focus,level,n+1,true);step=0;$("activity").hidden=true;$("demo").hidden=false;$("demo-title").textContent=topics[focus]+" · Demo";$("demo-prompt").textContent="Worked example · "+example.prompt;$("demo-code").textContent=example.code;$("demo-table").replaceChildren();draw();}
 function draw(){const complete=step>=example.steps.length;$("demo-table").replaceChildren();if(example.rows||complete&&example.resultRows)$("demo-table").append(table(complete&&example.resultRows?example.resultRows:example.rows,example.headers));if(!example.rows||complete)$("demo-table").append(graphDiagram(complete&&example.resultGraph?example.resultGraph:example.graph,document));$("demo-steps").replaceChildren();example.steps.forEach((s,i)=>{let item=el("li",i<step?"shown":"pending");item.append(el("span","num",String(i+1).padStart(2,"0")),el("strong","",i<step?s[0]:"Step "+(i+1)));if(i<step)item.append(el("code","",s[1]),el("p","",s[2]));$("demo-steps").append(item);});$("demo-step").disabled=step>=example.steps.length;$("demo-step").textContent=$("demo-step").disabled?"✓ Example complete":"⏭ Next step";}
 function back(){$("demo").hidden=true;$("activity").hidden=false;}
 function reset(){back();n=0;render();}
 select.onchange=()=>{focus=select.value;reset();};levels.forEach(b=>b.onclick=()=>{level=b.dataset.level;reset();});
 $("check").onclick=()=>{let inputs=[...$("entry").querySelectorAll("input,select")],correct=inputs.map((e,i)=>(question.labels[i].includes("bits")?e.value.replace(/[\s,]/g,"")===question.answers[i]:normal(e.value).toUpperCase()===normal(question.answers[i]).toUpperCase()));inputs.forEach((e,i)=>{e.style.borderColor=correct[i]?"#23754c":"#ad5949";});$("feedback").className="feedback "+(correct.every(Boolean)?"good":"bad");$("feedback").textContent=correct.every(Boolean)?"Correct — well done.":`${correct.filter(Boolean).length} of ${correct.length} correct. Check the highlighted answers.`;};
 $("hint").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.hint;};
 $("model").onclick=()=>{$("explainer").hidden=false;$("explainer").textContent=question.model;};
 $("next").onclick=()=>{n++;render();};$("demo-launch").onclick=openDemo;$("demo-back").onclick=back;$("demo-step").onclick=()=>{step++;draw();};$("demo-reset").onclick=()=>{step=0;draw();};render();
}
if(typeof module==='object'&&module.exports){module.exports={make};}else{mount();}
