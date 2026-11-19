/* Extra A* exam questions: 40 reproducible, mathematically checked scenarios.
   Loaded only by the A* skills lab; classroom samples and heuristic tasks stay intact. */
(function () {
  'use strict';

  const layouts = [
    {v:[['A',36,142],['B',132,50],['C',132,232],['D',263,49],['E',263,233],['G',388,142]],
      e:[['A','B',5],['A','C',7],['B','C',6],['B','D',7],['C','E',4],['D','E',8],['D','G',7],['E','G',6],['B','E',10,1],['C','D',9,2]]},
    {v:[['A',35,139],['B',129,69],['C',126,216],['D',254,64],['E',265,214],['G',388,141]],
      e:[['A','B',6],['A','C',4],['B','D',4],['B','E',8],['C','D',9],['C','E',7],['D','G',6],['E','G',7],['D','E',5],['B','C',6,1]]},
    {v:[['A',36,140],['B',125,44],['C',125,232],['D',221,46],['E',220,233],['F',310,139],['G',390,139]],
      e:[['A','B',6],['A','C',4],['B','D',5],['C','E',4],['D','F',5],['E','F',5],['F','G',5],['B','C',4],['D','E',5],['C','D',8,1]]},
    {v:[['A',37,141],['B',143,50],['C',143,231],['D',274,141],['G',388,141]],
      e:[['A','B',5],['A','C',5],['B','D',5],['C','D',5],['B','C',4],['D','G',5],['B','G',14,1],['C','G',14,2]]},
    {v:[['A',35,141],['B',125,46],['C',125,234],['D',222,48],['E',220,233],['F',307,141],['G',391,141]],
      e:[['A','B',5],['A','C',6],['B','D',5],['C','E',5],['D','F',6],['E','F',4],['F','G',5],['B','C',5],['C','D',8],['D','E',6],['B','F',12,1]]},
    {v:[['A',36,141],['B',132,46],['C',133,235],['D',261,69],['E',261,213],['G',388,141]],
      e:[['A','B',5],['A','C',6],['B','D',4],['C','E',5],['D','G',6],['E','G',6],['B','C',5],['D','E',5],['B','E',8,1],['C','D',9,2]]},
    {v:[['A',35,141],['B',142,58],['C',142,222],['D',275,141],['G',388,141]],
      e:[['A','B',5],['A','C',4],['B','C',4],['B','D',5],['C','D',7],['D','G',4],['B','G',13,1],['C','G',13,2]]},
    {v:[['A',35,141],['B',125,46],['C',125,233],['D',224,102],['E',224,231],['F',312,141],['G',390,141]],
      e:[['A','B',5],['A','C',5],['B','D',4],['C','D',7],['C','E',4],['D','E',5],['D','F',5],['E','F',5],['F','G',5],['B','C',5,1],['E','G',10,2]]}
  ];

  const settings = [
    {id:'satnav',title:'Car navigation',unit:'minutes',scale:1,
      premise:'A is your home and G is your destination. Find the fastest driving route.',
      versions:['Morning commute','Roadworks diversion','Evening journey','Weekend trip','School-run traffic']},
    {id:'deliveries',title:'Delivery driver',unit:'kilometres',scale:2,
      premise:'A is the parcel depot and G is the final delivery address. Find the shortest distance.',
      versions:['City deliveries','Rural delivery','New delivery zone','Busy route','Depot relocation']},
    {id:'robot',title:'Warehouse robot',unit:'seconds',scale:3,
      premise:'A is the charging dock and G is the packing station. Find the quickest robot route.',
      versions:['Morning stock run','Blocked aisle','Evening shift','New shelf layout','Urgent order']},
    {id:'game',title:'Adventure game',unit:'seconds',scale:4,
      premise:'A is the entrance and G is the exit portal. Find the fastest route for the player.',
      versions:['Forest level','Castle level','Underground level','Desert level','Final challenge']},
    {id:'network',title:'Computer network routing',unit:'milliseconds',scale:2,
      premise:'A is the sending router and G is the destination server. Find the least-latency route.',
      versions:['Office network','Gaming server','Data-centre link','Campus network','Backup connection']},
    {id:'themepark',title:'Theme park navigation',unit:'minutes',scale:1,
      premise:'A is the park entrance and G is the roller coaster. Find the fastest walking route.',
      versions:['Opening time','Afternoon crowds','Parade diversion','Quiet morning','Closing-time visit']},
    {id:'drone',title:'Drone flight planning',unit:'minutes',scale:2,
      premise:'A is the launch pad and G is the landing area. Find the flight path requiring the least time.',
      versions:['Coastal survey','Farm inspection','Rooftop delivery','Nature reserve','Emergency survey']},
    {id:'hospital',title:'Hospital porter',unit:'minutes',scale:1,
      premise:'A is the supply room and G is the destination ward. Find the quickest corridor route.',
      versions:['Morning supplies','Urgent equipment','New hospital wing','Evening handover','Ward delivery']}
  ];
  const usedRoutes=Array.from({length:settings.length},()=>new Set());

  function randomFrom(seed) {
    let value = seed >>> 0;
    return () => {
      value = (Math.imul(value,1664525) + 1013904223) >>> 0;
      return value / 4294967296;
    };
  }

  function near(graph,node) {
    return graph.e.filter(([a,b]) => a===node || b===node)
      .map(([a,b,cost]) => [a===node?b:a,cost]);
  }

  function distances(graph,target) {
    const dist = Object.fromEntries(graph.v.map(([name]) => [name,Infinity]));
    const remaining = new Set(graph.v.map(([name]) => name));
    dist[target] = 0;
    while (remaining.size) {
      const node = [...remaining].sort((a,b) => dist[a]-dist[b])[0];
      remaining.delete(node);
      if (!Number.isFinite(dist[node])) break;
      for(const [next,cost] of near(graph,node)) {
        if (dist[node]+cost < dist[next]) dist[next] = dist[node]+cost;
      }
    }
    return dist;
  }

  // Independently enumerate simple routes to reject questions with tied optimal paths.
  function shortestRoutes(graph) {
    let best = Infinity, ties = 0, route = [];
    const visit = (node,cost,path,seen) => {
      if (cost>best) return;
      if (node===graph.goal) {
        if (cost<best) {best=cost;ties=0;route=[...path];}
        if (cost===best) ties++;
        return;
      }
      for(const [next,weight] of near(graph,node)) {
        if (!seen.has(next)) {
          seen.add(next);path.push(next);
          visit(next,cost+weight,path,seen);
          path.pop();seen.delete(next);
        }
      }
    };
    visit(graph.start,0,[graph.start],new Set([graph.start]));
    return {best,ties,route};
  }

  function makeQuestion(settingIndex,variant) {
    const setting = settings[settingIndex],layout=layouts[settingIndex];
    let graph,result;
    const earlier = usedRoutes[settingIndex];
    for(let attempt=0;attempt<350;attempt++) {
      const rand = randomFrom((settingIndex+1)*1000003 + (variant+1)*7331 + attempt*104729);
      const edges = layout.e.filter(([, , ,optional]) =>
        !optional || (optional===1 ? variant%2===0 : variant%2===1));
      graph={v:layout.v.map(p=>[...p]),e:edges.map(([a,b,cost]) =>
        [a,b,Math.max(1,Math.round(cost*setting.scale*(0.55+rand()*1.12)))]),start:'A',goal:'G'};
      result=shortestRoutes(graph);
      if (result.ties!==1) continue;
      if (attempt<90 && result.route.length<4) continue;
      if (attempt<160 && earlier.has(result.route.join('→'))) continue;
      break;
    }
    if (result.ties!==1) throw new Error('Question has no unique shortest path');
    earlier.add(result.route.join('→'));
    const trueRemaining=distances(graph,graph.goal);
    const factor=0.50+(variant%5)*0.08;
    if (Object.values(trueRemaining).some(x=>!Number.isFinite(x))) throw new Error('Disconnected question');
    graph.h=Object.fromEntries(graph.v.map(([name]) => [name,Math.floor(trueRemaining[name]*factor)]));
    graph.id=`astar-${setting.id}-${variant+1}`;
    graph.scene=`${setting.title} · ${setting.versions[variant]}`;
    graph.unit=setting.unit;
    graph.premise=setting.premise;
    graph.questionTotal=41;
    return graph;
  }

  const questionList=[];
  // Alternate contexts so students never get five almost-identical questions in a row.
  for(let variant=0;variant<5;variant++) {
    for(let setting=0;setting<settings.length;setting++) {
      questionList.push(makeQuestion(setting,variant));
    }
  }

  // Reproducible questions; each difficulty level changes how many table cells are blank.
  window.RHSCAStarQuestions = {
    count:questionList.length,
    get(index) {
      const question=questionList[(index-1)%questionList.length];
      return {...question,v:question.v.map(v=>[...v]),e:question.e.map(e=>[...e]),h:{...question.h},
        questionNumber:1+((index-1)%questionList.length)+1};
    },
    all:() => questionList.map(q=>({...q,v:q.v.map(v=>[...v]),e:q.e.map(e=>[...e]),h:{...q.h}}))
  };
})();
