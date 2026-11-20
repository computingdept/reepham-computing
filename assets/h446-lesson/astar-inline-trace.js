/* Student A* exam trace: students complete cells in the OCR-style table.
   Classroom examples and Dijkstra use the original shared trace renderer. */
(function(){
  'use strict';
  const instances=new WeakMap();
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt=n=>Number.isFinite(n)?String(n):'∞';

  // The first five Easy questions introduce different routes before larger graphs.
  const warmups=[
    {id:'warmup-robot',scene:'Warehouse robot · Two conveyor routes',
      premise:'A is the charging dock and G is the packing station. Compare both routes.',
      unit:'seconds',height:240,v:[['A',50,120],['B',185,50],['C',185,195],['G',355,120]],
      e:[['A','B',3],['A','C',6],['B','G',9],['C','G',4]],h:{A:7,B:4,C:2,G:0}},
    {id:'warmup-car',scene:'Car navigation · Two turnings',
      premise:'A is home and G is school. Find the quicker of the two routes.',
      unit:'minutes',height:240,v:[['A',50,120],['B',185,50],['C',185,195],['G',355,120]],
      e:[['A','B',4],['A','C',3],['B','G',5],['C','G',8]],h:{A:6,B:4,C:6,G:0}},
    {id:'warmup-game',scene:'Adventure game · Check a shortcut',
      premise:'A is the entrance and G is the exit. Does the path through B help?',
      unit:'seconds',height:240,v:[['A',50,120],['B',185,50],['C',185,195],['G',355,120]],
      e:[['A','B',4],['A','C',5],['B','C',2],['C','G',4]],h:{A:7,B:3,C:3,G:0}},
    {id:'warmup-hospital',scene:'Hospital porter · Better corridor',
      premise:'A is the supply room and G is the ward. Update D when you find a faster route.',
      unit:'minutes',height:260,v:[['A',45,128],['B',150,50],['C',150,205],['D',275,128],['G',385,128]],
      e:[['A','B',4],['A','C',6],['B','D',8],['C','D',3],['D','G',5]],
      h:{A:9,B:3,C:2,D:4,G:0}},
    {id:'warmup-network',scene:'Network routing · Short exam trace',
      premise:'A sends a packet to G. Trace the routes and keep the lower cost.',
      unit:'milliseconds',height:260,v:[['A',45,128],['B',150,50],['C',150,205],['D',275,128],['G',385,128]],
      e:[['A','B',4],['A','C',7],['B','C',3],['B','D',4],['C','D',3],['D','G',4]],
      h:{A:8,B:5,C:4,D:3,G:0}}
  ].map(g=>({...g,start:'A',goal:'G'}));

  // Two larger, clearly positioned challenges complement the seven-node bank.
  const largeChallenges=[
    {id:'hard-airport',scene:'Airport baggage routing · Terminal transfer',
      premise:'Move baggage from A to G through the airport conveyors at minimum cost.',
      unit:'seconds',v:[['A',35,140],['B',130,55],['C',130,225],['D',225,55],['E',225,225],['F',320,55],['H',320,225],['G',398,140]],
      e:[['A','B',7],['A','C',8],['B','D',8],['C','E',7],['D','F',7],['E','H',6],
        ['F','G',9],['H','G',8],['D','E',6],['B','C',5],['F','H',6]]},
    {id:'hard-rescue',scene:'Rescue drone · Nine waypoints',
      premise:'Find the fastest flight route from the launch pad A to the rescue point G.',
      unit:'minutes',width:520,height:300,
      v:[['A',32,150],['B',125,52],['C',125,248],['D',225,52],['E',225,248],['F',320,52],['H',320,248],['I',415,150],['G',495,150]],
      e:[['A','B',8],['A','C',9],['B','D',6],['C','E',8],['B','C',7],['D','F',7],
        ['E','H',6],['D','E',9],['F','I',8],['H','I',7],['I','G',5],['F','H',11],['E','F',13]]}
  ].map(g=>{
    const d=Object.fromEntries(g.v.map(([n])=>[n,Infinity]));d.G=0;
    const visited=new Set();
    while(visited.size<g.v.length){
      const n=g.v.map(([name])=>name).filter(name=>!visited.has(name))
        .sort((a,b)=>d[a]-d[b])[0];
      visited.add(n);
      for(const [a,b,w] of g.e){
        if(a===n)d[b]=Math.min(d[b],d[n]+w);
        if(b===n)d[a]=Math.min(d[a],d[n]+w);
      }
    }
    return {...g,start:'A',goal:'G',h:Object.fromEntries(g.v.map(([n])=>[n,Math.floor(d[n]*0.65)]))};
  });

  function question(level,index,ocr){
    const bank=window.RHSCAStarQuestions.all();
    let order;
    if(level==='easy'){
      // Each warm-up has at least two routes: 4, 4, 4, 5, 5 nodes.
      order=[...warmups,...bank.sort((a,b)=>a.v.length-b.v.length||a.e.length-b.e.length)];
    }else if(level==='medium'){
      // Begin with six-node questions; the real OCR DancerGold trace comes fourth.
      order=bank.filter(g=>g.v.length>=6);
      order.splice(3,0,ocr);
    }else{
      order=[ocr,...bank.filter(g=>g.v.length>=7)];
      order.splice(4,0,...largeChallenges);
    }
    const position=index%order.length;
    return {...structuredClone(order[position]),questionNumber:position+1,questionTotal:order.length};
  }
  function neighbours(graph,node){
    return graph.e.filter(([a,b])=>a===node||b===node).map(([a,b,cost])=>({to:a===node?b:a,cost}));
  }
  function initialise(graph,level){
    const g=Object.fromEntries(graph.v.map(([n])=>[n,Infinity]));g[graph.start]=0;
    const s={graph,level,g,from:{},edge:{},open:new Set([graph.start]),closed:new Set(),selected:[],
      phase:'pick',current:null,pending:[],focus:null,entry:{},feedback:'',error:false,mistakes:0,changes:{},
      path:[],total:'',scored:false};
    // Starting at A is given in the question, so the first useful action is
    // completing a cost, not clicking the only available node.
    choose(s,graph.start);
    return s;
  }
  function bestOpen(s){
    return [...s.open].sort((a,b)=>(s.g[a]+s.graph.h[a])-(s.g[b]+s.graph.h[b])||
      s.g[a]-s.g[b]||a.localeCompare(b))[0];
  }
  function nextEdge(s){
    s.entry={};s.feedback='';s.error=false;
    while(s.pending.length){
      const edge=s.pending[0],trial=s.g[s.current]+edge.cost;
      if(s.closed.has(edge.to)&&trial>=s.g[edge.to]){s.pending.shift();continue;}
      break;
    }
    if(s.pending.length){s.phase='edge';s.focus=s.pending[0].to;}
    else{
      s.phase='pick';s.focus=null;s.current=null;
      // This is an exam table exercise: follow the A* selection rule automatically,
      // so each learner action is a table entry or a genuine route comparison.
      if(s.open.size)choose(s,bestOpen(s));
    }
  }
  function choose(s,node){
    const expected=bestOpen(s);
    if(node!==expected){s.feedback=s.level==='easy'?'Choose the lowest f: '+expected+'.':'Choose the open node with the smallest f = g + h.';s.error=true;s.mistakes++;return;}
    s.open.delete(node);s.closed.add(node);s.selected.push(node);s.feedback='';s.error=false;
    if(node===s.graph.goal){s.phase='route';s.current=null;s.focus=null;return;}
    s.current=node;s.pending=neighbours(s.graph,node);nextEdge(s);
  }
  function resolveEdge(s,decision){
    const edge=s.pending[0],candidate=s.g[s.current]+edge.cost,old=s.g[edge.to],inp=s.entry;
    const update=candidate<old;
    if(!update){
      if(decision!=='keep'){s.feedback='The existing distance is lower. Keep the current row.';s.error=true;s.mistakes++;return;}
      s.pending.shift();nextEdge(s);return;
    }
    if(decision!=='update'){s.feedback='This route is cheaper. Complete the highlighted row.';s.error=true;s.mistakes++;return;}
    if(inp.g===''||Number(inp.g)!==candidate){s.feedback=`g(${edge.to}) is cumulative from ${s.graph.start}: g(${s.current}) ${s.g[s.current]} + edge ${edge.cost} = ${candidate}.`;s.error=true;s.mistakes++;return;}
    const rowIndex=s.graph.v.findIndex(([n])=>n===edge.to);
    if(!easyGivenF(s,rowIndex)&&(inp.f===''||Number(inp.f)!==candidate+s.graph.h[edge.to])){s.feedback=`f(${edge.to}) = new g(${edge.to}) ${candidate} + h(${edge.to}) ${s.graph.h[edge.to]} = ${candidate+s.graph.h[edge.to]}. Use h from ${edge.to}, not from ${s.current}.`;s.error=true;s.mistakes++;return;}
    if(s.level==='hard'&&(inp.h===''||Number(inp.h)!==s.graph.h[edge.to])){s.feedback='Read the heuristic beneath '+edge.to+' on the graph.';s.error=true;s.mistakes++;return;}
    if(s.level!=='easy'&&inp.from!==s.current){s.feedback='Previous node is the node this route came from.';s.error=true;s.mistakes++;return;}
    if(update){
      if(Number.isFinite(old))s.changes[edge.to]=old+' → '+candidate;
      s.g[edge.to]=candidate;s.from[edge.to]=s.current;s.edge[edge.to]=edge.cost;
      s.open.add(edge.to);s.closed.delete(edge.to);
    }
    s.pending.shift();nextEdge(s);
  }
  function finalRoute(s){
    const route=[],seen=new Set();let n=s.graph.goal;
    while(n&&!seen.has(n)){route.unshift(n);if(n===s.graph.start)break;seen.add(n);n=s.from[n];}
    return route[0]===s.graph.start?route:[];
  }
  function checkRoute(s,config){
    const correct=s.path.join('|')===finalRoute(s).join('|')&&s.total!==''&&Number(s.total)===s.g[s.graph.goal];
    if(!s.scored){s.scored=true;config.onFirstAttempt(correct&&s.mistakes===0);}
    if(correct){s.phase='complete';s.feedback='Correct — shortest path and total cost.';s.error=false;}
    else{s.mistakes++;s.feedback='Follow the Previous column backwards from the goal, then add each edge cost.';s.error=true;}
  }


  function graphSvg(s){
    const p=Object.fromEntries(s.graph.v.map(([n,x,y])=>[n,{x,y}]));
    const width=s.graph.width||420,height=s.graph.height||280;
    const active=s.phase==='edge'?s.pending[0]:null;
    const lines=s.graph.e.map(([a,b])=>{
      const on=active&&((a===s.current&&b===active.to)||(b===s.current&&a===active.to));
      return `<line x1="${p[a].x}" y1="${p[a].y}" x2="${p[b].x}" y2="${p[b].y}" stroke="${on?'#d6a02f':'#9fbca9'}" stroke-width="${on?5:3}" stroke-linecap="round"/>`;
    }).join('');
    const weights=s.graph.e.map(([a,b,w])=>{
      const x=(p[a].x+p[b].x)/2,y=(p[a].y+p[b].y)/2;
      const on=active&&((a===s.current&&b===active.to)||(b===s.current&&a===active.to));
      return `<rect x="${x-13}" y="${y-12}" width="26" height="23" rx="6" fill="${on?'#ffe59e':'#fff'}" stroke="#bdcfc3"/><text x="${x}" y="${y+4}" text-anchor="middle" font-size="14" font-weight="800" fill="#1e513b">${w}</text>`;
    }).join('');
    const route=s.phase==='complete'?finalRoute(s):[];
    const nodes=s.graph.v.map(([n,x,y])=>{
      const focused=active&&(n===s.current||n===active.to),chosen=s.closed.has(n),open=s.open.has(n);
      const fill=focused?'#e6b04a':chosen||route.includes(n)?'#167149':open?'#d6f0df':'#e7f1ea';
      return `<circle cx="${x}" cy="${y}" r="22" fill="${fill}" stroke="#fff" stroke-width="4"/><text x="${x}" y="${y+6}" text-anchor="middle" font-size="17" font-weight="900" fill="${chosen?'#fff':'#214d37'}">${esc(n)}</text><text x="${x}" y="${y+38}" text-anchor="middle" font-size="13" font-weight="800" fill="#365e4a">h=${s.graph.h[n]}</text>`;
    }).join('');
    return `<svg class="a-trace-graph" viewBox="0 0 ${width} ${height}" style="aspect-ratio:${width}/${height}" role="img" aria-label="A* graph from ${s.graph.start} to ${s.graph.goal}. Yellow indicates the active edge.">${lines}${weights}${nodes}</svg>`;
  }
  // Easy supplies the heuristic and previous node, plus some calculated f values.
  // Medium asks for distance, f and predecessor. Hard asks for every value.
  function easyGivenF(s,rowIndex){return s.level==='easy'&&rowIndex%2===0;}
  function tableInput(id,node,label,value){
    return `<input id="${id}" class="a-trace-cell-input" type="number" inputmode="numeric" autocomplete="off" aria-label="${esc(label)} for ${esc(node)}" value="${esc(value??'')}" placeholder="?" />`;
  }
  function tableFrom(s,node){
    return `<select id="a-from" class="a-trace-cell-input" aria-label="Previous node for ${esc(node)}"><option value="">?</option>${s.graph.v.map(([n])=>`<option value="${esc(n)}"${s.entry.from===n?' selected':''}>${esc(n)}</option>`).join('')}</select>`;
  }
  function traceTable(s){
    const rows=s.graph.v.map(([n],i)=>{
      const active=s.phase==='edge'&&s.focus===n;
      const g=fmt(s.g[n]),f=fmt(s.g[n]+s.graph.h[n]);
      const improving=active&&s.g[s.current]+s.pending[0].cost<s.g[n];
      const before=improving&&Number.isFinite(s.g[n])?`<small class="a-trace-prior">Current: ${g}</small>`:'';
      const gCell=improving?`${before}${tableInput('a-g',n,'Distance travelled',s.entry.g)}`:`<strong>${g}</strong>${s.changes[n]?`<small class="a-trace-change"><s>${s.changes[n].split(' → ')[0]}</s> → ${g}</small>`:''}`;
      const hCell=improving&&s.level==='hard'?tableInput('a-h',n,'Heuristic',s.entry.h):s.graph.h[n];
      const fCell=improving&&!easyGivenF(s,i)?tableInput('a-f',n,'Distance plus heuristic',s.entry.f):improving?`<span class="a-trace-given">${s.g[s.current]+s.pending[0].cost+s.graph.h[n]}</span>`:f;
      const fromCell=improving&&s.level!=='easy'?tableFrom(s,n):esc(improving?s.current:(s.from[n]||'—'));
      return `<tr class="${active?'a-trace-current':''}${improving?' a-trace-editing':''}" data-node="${esc(n)}"><th scope="row">${esc(n)}${s.closed.has(n)?'<span class="a-trace-tick">✓</span>':''}</th><td>${gCell}</td><td>${hCell}</td><td>${fCell}</td><td>${fromCell}</td></tr>`;
    }).join('');
    return `<div class="a-trace-table-wrap"><table class="a-trace-table"><thead><tr><th>Node</th><th>Distance from<br>start <span>(g)</span></th><th>Remaining<br>estimate <span>(h)</span></th><th>Total estimate<br><span>(f = g + h)</span></th><th>Previous<br>node</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }


  function routePanel(s){
    const route=s.path.join(' → ')||'—';
    const chips=s.graph.v.map(([n])=>{
      const pos=s.path.indexOf(n);
      return `<button type="button" data-route="${esc(n)}" class="${pos>=0?'active':''}"><span>${pos>=0?pos+1:'○'}</span>${esc(n)}</button>`;
    }).join('');
    return `<section class="a-trace-route"><strong>Goal reached. Select the shortest path in order.</strong><p>Follow the Previous column backwards from ${s.graph.goal}.</p><div class="a-trace-path-chips">${chips}<button type="button" id="a-clear" class="a-trace-light">Clear</button></div><div class="a-trace-route-check"><span>Path: <strong>${esc(route)}</strong></span><label>Total cost (${esc(s.graph.unit||'units')}) <input id="a-total" type="number" inputmode="numeric" value="${esc(s.total)}" placeholder="?" /></label><button type="button" class="a-trace-primary" id="a-check">Check route</button></div></section>`;
  }
  function resultPanel(s){
    const route=finalRoute(s),costs=route.slice(1).map(n=>s.edge[n]);
    return `<section class="a-trace-result"><strong>Shortest path: ${esc(route.join(' → '))}</strong><span>${costs.join(' + ')} = <b>${s.g[s.graph.goal]} ${esc(s.graph.unit||'')}</b></span><span>Nodes expanded: ${esc(s.selected.join(' → '))}</span><button type="button" class="a-trace-primary" id="a-next">Next graph →</button></section>`;
  }
  function draw(s,config){
    const graph=s.graph;
    const active=s.phase==='edge',item=active?s.pending[0]:null;
    const improving=active&&s.g[s.current]+item.cost<s.g[item.to];
    const step=active?'COMPLETE THE HIGHLIGHTED TABLE ROW':'FINAL SHORTEST PATH';
    const instruction=active?`${esc(s.current)} → ${esc(item.to)} · Edge cost ${item.cost}. ${improving?`g(${esc(item.to)}) = g(${esc(s.current)}) + ${item.cost} = ${fmt(s.g[s.current])} + ${item.cost}. Then f(${esc(item.to)}) = g(${esc(item.to)}) + h(${esc(item.to)}).`:`Compare the new cumulative g (${fmt(s.g[s.current])} + ${item.cost}) with the existing g(${esc(item.to)}) = ${fmt(s.g[item.to])}. Keep the smaller value.`}`:
      'Use the table to select the final route and calculate its total cost.';
    const actions=active?`<div class="a-trace-row-actions">${improving?`<button type="button" id="a-update" class="a-trace-primary">Check ${esc(item.to)} row</button>`:`<span>Current distance to ${esc(item.to)}: <strong>${fmt(s.g[item.to])}</strong></span><button type="button" id="a-keep" class="a-trace-primary">Keep existing row</button>`}</div>`:
      s.phase==='route'?routePanel(s):s.phase==='complete'?resultPanel(s):'';
    config.workspace.innerHTML=`<div class="a-trace-root"><div class="a-trace-header"><div><span class="a-trace-kicker">${s.level.toUpperCase()} · QUESTION ${graph.questionNumber} OF ${graph.questionTotal}</span><h2>A* · Exam Trace</h2></div><span class="a-trace-goal">${graph.start} → ${graph.goal}</span></div><div class="a-trace-scenario"><strong>${esc(graph.scene||'A* graph')}</strong><span>${esc(graph.premise||'Find the shortest path.')}</span></div><div class="a-trace-columns"><section class="a-trace-visual"><p class="a-trace-caption">Edge costs in ${esc(graph.unit||'units')} · Values beneath nodes are h estimates</p>${graphSvg(s)}<details class="a-trace-help"><summary>How do I complete the table?</summary><p><strong>g is cumulative from ${esc(graph.start)}.</strong> Add the edge cost to the g of the node you came from. Then calculate f = new g + h of the <strong>destination node</strong> (the row you are completing). A route to ${esc(graph.goal)} is provisional: if another path has a smaller g, update the row.</p></details></section><section class="a-trace-work"><div class="a-trace-step"><span>${step}</span><strong>${instruction}</strong></div><p class="a-trace-caption">g = total from ${esc(graph.start)} · f = g + h of this row’s node. ${Number.isFinite(s.g[graph.goal])&&!s.closed.has(graph.goal)?`Current g(${esc(graph.goal)}) = ${fmt(s.g[graph.goal])} is provisional.`:"A better route can update a row."}</p>${traceTable(s)}${s.feedback?`<p class="a-trace-feedback ${s.error?'error':'success'}" role="status">${esc(s.feedback)}</p>`:''}${actions}<div class="a-trace-footer"><button type="button" id="a-restart" class="a-trace-light">Start again</button><small>✓ Expanded node · Yellow = row to complete</small></div></section></div></div>`;
    const submit=decision=>{
      for(const field of ['g','f','h'])s.entry[field]=config.workspace.querySelector('#a-'+field)?.value.trim()||'';
      s.entry.from=config.workspace.querySelector('#a-from')?.value||'';
      resolveEdge(s,decision);draw(s,config);
    };
    config.workspace.querySelector('#a-keep')?.addEventListener('click',()=>submit('keep'));
    config.workspace.querySelector('#a-update')?.addEventListener('click',()=>submit('update'));
    config.workspace.querySelectorAll('[data-route]').forEach(b=>b.addEventListener('click',()=>{
      s.total=config.workspace.querySelector('#a-total')?.value||s.total;
      const n=b.dataset.route,pos=s.path.indexOf(n);
      if(pos>=0)s.path=s.path.slice(0,pos);else s.path.push(n);
      draw(s,config);
    }));
    config.workspace.querySelector('#a-clear')?.addEventListener('click',()=>{s.path=[];draw(s,config);});
    config.workspace.querySelector('#a-check')?.addEventListener('click',()=>{
      s.total=config.workspace.querySelector('#a-total')?.value.trim()||'';
      checkRoute(s,config);draw(s,config);
    });
    config.workspace.querySelector('#a-next')?.addEventListener('click',config.onNext);
    config.workspace.querySelector('#a-restart')?.addEventListener('click',()=>{
      const fresh=initialise(graph,s.level);instances.set(config.workspace,fresh);draw(fresh,config);
    });
  }
  window.RHSCAStarInline={
    question,
    render(config){
      let s=instances.get(config.workspace);
      if(!s||s.graph!==config.graph||s.level!==config.level){
        s=initialise(config.graph,config.level);instances.set(config.workspace,s);
      }
      draw(s,config);
    }
  };
})();
