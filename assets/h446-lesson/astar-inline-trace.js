/* Student A* trace: each tested edge expands its destination row in one table.
   Classroom examples and Dijkstra use the original shared trace renderer. */
(function(){
  'use strict';
  const instances=new WeakMap();
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt=n=>Number.isFinite(n)?String(n):'∞';

  // The first five Easy questions teach one new decision at a time. Graph size
  // alone is not difficulty: these also deliberately limit routes and edges.
  const warmups=[
    {id:'warmup-robot',scene:'Warehouse robot · Straight corridor',
      premise:'A is the charging dock. Follow the corridor to G, the packing station.',
      unit:'seconds',height:200,v:[['A',52,97],['B',205,97],['G',358,97]],
      e:[['A','B',3],['B','G',4]],h:{A:6,B:3,G:0}},
    {id:'warmup-car',scene:'Car navigation · First junction',
      premise:'A is home and G is school. Which turning should the driver try first?',
      unit:'minutes',height:240,v:[['A',50,120],['B',185,50],['C',185,195],['G',355,50]],
      e:[['A','B',4],['A','C',3],['B','G',5]],h:{A:8,B:4,C:9,G:0}},
    {id:'warmup-game',scene:'Adventure game · Two routes',
      premise:'A is the entrance and G is the exit. Compare the two possible routes.',
      unit:'seconds',height:240,v:[['A',50,120],['B',185,50],['C',185,195],['G',355,120]],
      e:[['A','B',3],['A','C',6],['B','G',9],['C','G',4]],h:{A:7,B:4,C:2,G:0}},
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
      // 3, 4, 4, 5, 5 nodes; then varied five-, six- and seven-node practice.
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
    return {graph,level,g,from:{},edge:{},open:new Set([graph.start]),closed:new Set(),selected:[],
      phase:'pick',current:null,pending:[],focus:null,entry:{},feedback:'',error:false,mistakes:0,changes:{},
      path:[],total:'',scored:false};
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
    else{s.phase='pick';s.focus=null;s.current=null;}
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
    if(inp.g===''||Number(inp.g)!==candidate){s.feedback='Calculate the distance from '+s.current+' plus the edge cost.';s.error=true;s.mistakes++;return;}
    if(s.level!=='easy'&&(inp.f===''||Number(inp.f)!==candidate+s.graph.h[edge.to])){s.feedback='Calculate f = candidate g + h.';s.error=true;s.mistakes++;return;}
    if(s.level==='hard'&&(inp.h===''||Number(inp.h)!==s.graph.h[edge.to])){s.feedback='Read h from the destination node.';s.error=true;s.mistakes++;return;}
    const update=candidate<old;
    if((decision==='update')!==update){s.feedback=update?'The new cost is lower, so update '+edge.to+'.':'This route is not cheaper. Keep the previous value.';s.error=true;s.mistakes++;return;}
    if(s.level==='hard'&&update&&inp.from!==s.current){s.feedback='Choose the node that this new route came from.';s.error=true;s.mistakes++;return;}
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
  function field(id,label,value){
    return `<label class="a-trace-field"><span>${esc(label)}</span><input id="${id}" type="number" inputmode="numeric" autocomplete="off" value="${esc(value||'')}" placeholder="?" /></label>`;
  }
  function expandedRow(s){
    const item=s.pending[0],previous=s.g[item.to],candidate=s.g[s.current]+item.cost;
    const more=s.level==='easy'?'':field('a-f','New f = g + h',s.entry.f);
    const hard=s.level==='hard'?field('a-h','h from graph',s.entry.h)+`<label class="a-trace-field"><span>Previous node</span><select id="a-from"><option value="">Choose</option>${s.graph.v.map(([n])=>`<option value="${esc(n)}"${s.entry.from===n?' selected':''}>${esc(n)}</option>`).join('')}</select></label>`:'';
    const keep=Number.isFinite(previous)?`<button type="button" id="a-keep" class="a-trace-light">Keep ${fmt(previous)}</button>`:'';
    return `<tr class="a-trace-expanded"><td colspan="6"><div class="a-trace-active"><div class="a-trace-active-heading"><strong>Checking ${esc(s.current)} → ${esc(item.to)}</strong><span>Current ${esc(item.to)}: <b>${fmt(previous)}</b>${s.from[item.to]?' via '+esc(s.from[item.to]):' (not reached)'}</span></div><div class="a-trace-calc"><span class="a-trace-equation">${fmt(s.g[s.current])} + ${item.cost} =</span>${field('a-g','New g',s.entry.g)}${more}${hard}</div><div class="a-trace-decision"><span>${Number.isFinite(previous)?'Is the alternative cheaper?':'This is the first route to the node.'}</span><div>${keep}<button type="button" id="a-update" class="a-trace-primary">Update ${esc(item.to)}</button></div></div></div></td></tr>`;
  }
  function traceTable(s){
    const rows=s.graph.v.map(([n])=>{
      const active=s.phase==='edge'&&s.focus===n;
      const g=fmt(s.g[n]),f=fmt(s.g[n]+s.graph.h[n]);
      return `<tr class="${active?'a-trace-current':''}"><th scope="row">${esc(n)}${s.closed.has(n)?'<span class="a-trace-tick">✓</span>':''}</th><td><strong>${g}</strong>${s.changes[n]?`<small class="a-trace-change">${s.changes[n]}</small>`:''}</td><td>${s.graph.h[n]}</td><td>${f}</td><td>${s.edge[n]===undefined?'—':s.edge[n]}</td><td>${esc(s.from[n]||'—')}</td></tr>${active?expandedRow(s):''}`;
    }).join('');
    return `<div class="a-trace-table-wrap"><table class="a-trace-table"><thead><tr><th>Node</th><th>g</th><th>h</th><th>f</th><th>Edge</th><th>From</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }


  function choosePanel(s){
    const beginning=s.selected.length===0;
    return `<div class="a-trace-choose"><strong>${beginning?'Start at '+esc(s.graph.start)+' (g = 0).':'Choose the open node with the smallest f = g + h.'}</strong><div class="a-trace-options">${[...s.open].sort().map(n=>`<button type="button" data-choose="${esc(n)}">${esc(n)} <span>f=${fmt(s.g[n]+s.graph.h[n])}</span></button>`).join('')}</div></div>`;
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
    const step=s.phase==='pick'?'SELECT NEXT NODE':s.phase==='edge'?
      (Number.isFinite(s.g[s.focus])?'COMPARE ROUTES':'CALCULATE NEW ROUTE'):'TRACE FINAL PATH';
    const instruction=s.phase==='edge'?`Yellow edge: ${esc(s.current)} → ${esc(s.focus)}. Complete the yellow row.`:
      s.phase==='pick'?'Select the next node to expand.':'Use the completed table to identify the route.';
    const actions=s.phase==='pick'?choosePanel(s):s.phase==='route'?routePanel(s):s.phase==='complete'?resultPanel(s):'';
    config.workspace.innerHTML=`<div class="a-trace-root"><div class="a-trace-header"><div><span class="a-trace-kicker">${s.level.toUpperCase()} · QUESTION ${graph.questionNumber} OF ${graph.questionTotal}</span><h2>A* · Exam Trace</h2></div><span class="a-trace-goal">${graph.start} → ${graph.goal}</span></div><div class="a-trace-scenario"><strong>${esc(graph.scene||'A* graph')}</strong><span>${esc(graph.premise||'Find the shortest path.')}</span></div><div class="a-trace-columns"><section class="a-trace-visual"><p class="a-trace-caption">Edge costs in ${esc(graph.unit||'units')} · Values beneath nodes are h estimates</p>${graphSvg(s)}<details class="a-trace-help"><summary>How does A* work?</summary><p>Start with g = 0 at ${graph.start}. Choose the open node with lowest f = g + h. Calculate a new g for each neighbour. Update it if the new route is cheaper. Stop when you select ${graph.goal}.</p></details></section><section class="a-trace-work"><div class="a-trace-step"><span>${step}</span><strong>${instruction}</strong></div>${traceTable(s)}${s.feedback?`<p class="a-trace-feedback ${s.error?'error':'success'}" role="status">${esc(s.feedback)}</p>`:''}${actions}<div class="a-trace-footer"><button type="button" id="a-restart" class="a-trace-light">Start again</button><small>✓ Expanded node · Yellow = current edge</small></div></section></div></div>`;
    config.workspace.querySelectorAll('[data-choose]').forEach(b=>b.addEventListener('click',()=>{
      choose(s,b.dataset.choose);draw(s,config);
    }));
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
