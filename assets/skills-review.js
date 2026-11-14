/* Teacher-review Skills. None of these activities writes a mastery score.
   The six generators are independent of the existing J277/H446 engines. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else {root.RHSCSkillsReview=api; if(typeof document!=='undefined')api.mount(document,root);}
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const names={
    'cpu-cycle':{title:'CPU Cycle Simulator',course:'j277',spec:'J277 · 1.1.1',sub:'Fetch, decode and execute with registers'},
    'trace-table':{title:'Trace Table Lab',course:'j277',spec:'J277 · 2.1.2',sub:'Record variable values after every statement'},
    'binary-search':{title:'Binary Search Decisions',course:'j277',spec:'J277 · 2.1.3',sub:'Choose the middle, then narrow the search'},
    'bitwise-mask':{title:'Bitwise Mask Lab',course:'h446',spec:'H446 · 1.4.1(i)',sub:'Apply AND, OR and XOR to binary masks'},
    'stack-queue':{title:'Stack & Queue Tracer',course:'h446',spec:'H446 · 1.4.2',sub:'Follow LIFO and FIFO operations'},
    'tree-traversal':{title:'Tree Traversal Lab',course:'h446',spec:'H446 · 2.3.1(e)',sub:'Breadth-first and depth-first post-order'}
  };
  const demos={
    'cpu-cycle':{task:'Trace a different instruction fetched from address 100.',steps:[
      ['Fetch begins','PC = 100','The Program Counter points to the next instruction.'],
      ['Move the address','MAR ← PC','The Memory Address Register receives 100.'],
      ['Read the instruction','MDR ← Memory[MAR]','The Memory Data Register holds the fetched instruction.'],
      ['Load and advance','CIR ← MDR; PC ← 101','The Current Instruction Register holds the instruction and the PC moves on.'],
      ['Decode and execute','Control Unit decodes; CPU executes','The instruction is understood, then carried out.'] ]},
    'trace-table':{task:'Trace a different three-line program.',steps:[
      ['First statement','x = 2  →  x: 2','Record the value after the statement.'],
      ['Second statement','x = x + 4  →  x: 6','Use the previous value, then update x.'],
      ['Third statement','x = x * 3  →  x: 18','Multiply the current value, not the original value.'] ]},
    'binary-search':{task:'Find 21 in a different sorted list: [2, 5, 8, 12, 17, 21, 26].',steps:[
      ['Set bounds','low = 0, high = 6','The list is sorted and indexed from zero.'],
      ['First middle','(0 + 6) DIV 2 = 3 → 12','12 is too small, so discard its position and everything to the left.'],
      ['New bounds','low = 4, high = 6','Only [17, 21, 26] remains.'],
      ['Next middle','(4 + 6) DIV 2 = 5 → 21','Found: 21 matches the target.'] ]},
    'bitwise-mask':{task:'Apply a different AND mask.',steps:[
      ['Write both rows','Value 11001100\nMask  11110000','Align bits by position.'],
      ['Apply AND','1 AND 1 = 1; otherwise 0','Only columns where both inputs are 1 produce a 1.'],
      ['Read the result','11000000','The lower nibble is cleared and the upper nibble kept.'] ]},
    'stack-queue':{task:'Trace a different queue, with its front on the left.',steps:[
      ['Start empty','[]','There are no items waiting.'],
      ['Enqueue two','ENQUEUE K; ENQUEUE L → [K, L]','New items join the back of a queue.'],
      ['Remove one','DEQUEUE → K; queue [L]','FIFO: the oldest item leaves first.'],
      ['Enqueue again','ENQUEUE M → [L, M]','M joins the back; L is still at the front.'] ]},
    'tree-traversal':{task:'Traverse a different small tree with root P and children Q, R.',steps:[
      ['Breadth-first','P, Q, R','Visit the root, then the next level from left to right.'],
      ['Depth-first post-order','Q, R, P','Visit the left subtree, then right subtree, then root.'],
      ['Remember','Left → Right → Root','In post-order, the parent is output after its children.'] ]}
  };
  function clean(v){return String(v||'').toUpperCase().match(/[A-Z0-9]+/g)?.join(',')||'';}
  function bits(n){return (n&255).toString(2).padStart(8,'0');}
  function traceQuestion(level,n){
    const a=2+(n%6),b=2+(n%4);
    if(level==='easy'){
      return {type:'trace',prompt:'Complete x after each statement.',instruction:'One trace-table row for every executed statement.',
        code:['x = '+a,'x = x + '+b,'x = x * 2'].join('\n'),columns:['x'],
        rows:[{line:'x = '+a,values:[a]},{line:'x = x + '+b,values:[a+b]},{line:'x = x * 2',values:[(a+b)*2]}],
        hint:'Write the new x immediately after each line. Use the updated value on the next line.',
        model:'x values: '+[a,a+b,(a+b)*2].join(' → ')+'.'};
    }
    if(level==='medium'){
      const x=a,y=b;
      return {type:'trace',prompt:'Trace x and y after each statement.',instruction:'Write both current values on each row.',
        code:['x = '+x,'y = '+y,'x = x + y','y = x - y','x = x * 2'].join('\n'),
        columns:['x','y'],rows:[
          {line:'x = x + y',values:[x+y,y]},
          {line:'y = x - y',values:[x+y,x]},
          {line:'x = x * 2',values:[2*(x+y),x]}],
        hint:'After x = x + y, x changes but y does not. Record both variables after every statement.',
        model:'After x = x + y: ('+(x+y)+', '+y+'); after y = x - y: ('+(x+y)+', '+x+'); final: ('+(2*(x+y))+', '+x+').'};
    }
    const limit=3+(n%2),start=n%3;let v=start;const rows=[];
    for(let i=1;i<=limit;i++){v+=i;rows.push({line:'i = '+i+' · x = x + i',values:[i,v]});}
    return {type:'trace',prompt:'Trace this FOR loop, including every iteration.',instruction:'The i column is shown; fill in x after the body runs.',
      code:'x = '+start+'\nFOR i = 1 TO '+limit+'\n  x = x + i\nNEXT i',
      columns:['i','x'],given:[true,false],rows,hint:'Start with x = '+start+'. Add i on each iteration, carrying forward the previous x.',
      model:'x progresses: '+rows.map(r=>r.values[1]).join(' → ')+'. Final x = '+v+'.'};
  }
  function cpuQuestion(level,n){
    if(level==='easy')return {type:'order',prompt:n%2?'Which CPU stage happens first, second and third?':'Put the three CPU stages in the correct order.',
      instruction:'Choose a stage for each numbered position.',code:n%2?'Fetch: get the instruction\nDecode: work out its meaning\nExecute: carry out the instruction':'The processor needs to run its next instruction.',
      options:['Decode','Execute','Fetch'],labels:['Stage 1','Stage 2','Stage 3'],
      answers:['Fetch','Decode','Execute'],
      hint:'First obtain the instruction, then understand it, then carry it out.',
      model:'1. Fetch → 2. Decode → 3. Execute.'};
    if(level==='medium')return {type:'order',prompt:'Put these five fetch-cycle actions in order.',
      instruction:'Use the PC, MAR, MDR and CIR in a typical simplified fetch sequence.',
      code:'PC = address of next instruction\nMemory = instructions and data',
      options:['Decode instruction','MDR ← Memory[MAR]','PC ← PC + 1','MAR ← PC','CIR ← MDR'],
      labels:['Action 1','Action 2','Action 3','Action 4','Action 5'],
      answers:['MAR ← PC','MDR ← Memory[MAR]','CIR ← MDR','PC ← PC + 1','Decode instruction'],
      hint:'Copy the address from PC to MAR; fetch into MDR; load CIR; advance PC; then decode.',
      model:'MAR ← PC → MDR ← Memory[MAR] → CIR ← MDR → PC ← PC + 1 → Decode. This is a simplified model; implementations may overlap some operations.'};
    const addr=120+7*n,inst='LOAD '+(40+n*3);
    return {type:'fields',prompt:'Trace the registers during a fetch.',
      instruction:'The PC starts at '+addr+'. Memory['+addr+'] holds '+inst+'. The PC increments once after fetching.',
      code:'PC = '+addr+'\nMemory['+addr+'] = '+inst,
      labels:['MAR after address transfer','PC after increment','CIR after fetch'],
      answers:[String(addr),String(addr+1),inst],
      hint:'MAR copies the OLD PC address; PC then increments; CIR receives the instruction.',
      model:'MAR = '+addr+'; PC = '+(addr+1)+'; CIR = '+inst+'.'};
  }
  function searchQuestion(level,n){
    const len=level==='easy'?7:level==='medium'?9:15;
    const base=2+(n%5),arr=Array.from({length:len},(_,i)=>base+i*3);
    const absent=level==='hard'&&n%3===2,at=(n*5+2)%len;
    const target=absent?arr[len-1]+2:arr[at];
    return {type:'search',prompt:'Find '+target+' using binary search.',instruction:'Click the middle item of the CURRENT search range, then Check. Indices start at zero.',
      arr,target,low:0,high:len-1,selected:null,visited:[],found:false,done:false,
      hint:'middle index = (low + high) DIV 2. Compare that element with '+target+'.',
      model:searchTrace(arr,target).join('\n')};
  }
  function searchTrace(arr,target){
    let lo=0,hi=arr.length-1;const lines=[];
    while(lo<=hi){const mid=Math.floor((lo+hi)/2),val=arr[mid];
      lines.push('low='+lo+', high='+hi+' → middle '+mid+' = '+val+(val===target?' (FOUND)':val<target?' (search right)':' (search left)'));
      if(val===target)return lines;
      if(val<target)lo=mid+1;else hi=mid-1;
    }
    lines.push('low > high → not found');return lines;
  }
  function maskQuestion(level,n){
    const value=(75+n*29)&255,m1=(level==='easy'?240:level==='medium'?170:204),m2=24;
    const op=level==='easy'?'AND':level==='medium'?(n%2?'OR':'XOR'):'AND then OR';
    const result=level==='easy'?(value&m1):level==='medium'?(op==='OR'?(value|m1):(value^m1)):((value&m1)|m2);
    return {type:'bits',prompt:'Calculate the output of this bitwise mask.',
      instruction:'Click each output bit to toggle it. Work in eight bits from left to right.',
      value,m1,m2,op,result,answer:bits(result),
      code:bits(value)+'  VALUE\n'+bits(m1)+'  MASK'+(level==='hard'?' 1\n'+bits(m2)+'  MASK 2':'')+'\n'+op,
      hint:level==='hard'?'Calculate value AND mask 1 first, then OR that result with mask 2.':'AND needs two 1s; OR needs at least one 1; XOR needs exactly one 1.',
      model:level==='hard'?bits(value)+' AND '+bits(m1)+' = '+bits(value&m1)+'; OR '+bits(m2)+' = '+bits(result)+'.':
        bits(value)+' '+op+' '+bits(m1)+' = '+bits(result)+'.'};
  }
  function stackQuestion(level,n){
    const type=level==='medium'?'queue':level==='hard'?(n%2?'queue':'stack'):'stack';
    const letters='ABCDEFGHJKLMNPQRSTUVWXYZ'.split(''),a=letters[(n*3)%letters.length],
      b=letters[(n*3+1)%letters.length],c=letters[(n*3+2)%letters.length],
      d=letters[(n*3+3)%letters.length],e=letters[(n*3+4)%letters.length];
    const add=type==='stack'?'PUSH':'ENQUEUE',remove=type==='stack'?'POP':'DEQUEUE';
    const cmds=level==='easy'?[add+' '+a,add+' '+b,add+' '+c,remove,add+' '+d,remove]:
      level==='medium'?[add+' '+a,add+' '+b,remove,add+' '+c,add+' '+d,remove,add+' '+e]:
      [add+' '+a,add+' '+b,add+' '+c,remove,add+' '+d,remove,add+' '+e,remove,add+' '+a];
    const states=simulate(type,cmds);
    return {type:'fields',prompt:'Trace this '+(type==='stack'?'stack (LIFO).':'queue (FIFO).'),
      instruction:'Start empty. Type comma-separated values, in removal order and then '+(type==='stack'?'bottom-to-top':'front-to-back')+' order.',
      code:cmds.join('\n'),labels:['Items removed, in order','Items remaining, '+(type==='stack'?'bottom → top':'front → back')],
      answers:[states.removed.join(', ')||'none',states.items.join(', ')||'none'],
      hint:type==='stack'?'PUSH adds to the top; POP removes the newest item first.':'ENQUEUE adds at the back; DEQUEUE removes the oldest item at the front.',
      model:states.log.join('\n')+'\nRemoved: '+(states.removed.join(', ')||'none')+'; left: '+(states.items.join(', ')||'none')+'.'};
  }
  function simulate(type,cmds){
    const items=[],removed=[],log=[];
    for(const cmd of cmds){
      const [action,value]=cmd.split(' ');
      if(value)items.push(value);
      else {const item=type==='stack'?items.pop():items.shift();removed.push(item);}
      log.push(cmd+(value?'':' → '+removed[removed.length-1])+' · ['+items.join(', ')+']');
    }
    return {items,removed,log};
  }
  function treeQuestion(level,n){
    const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ'.split(''),offset=(n*3)%alphabet.length;
    const nodes=Array.from({length:7},(_,i)=>alphabet[(i+offset)%alphabet.length]);
    const mode=level==='easy'?'breadth-first':level==='medium'?'post-order':'both';
    const bfs=[0,1,2,3,4,5,6].map(i=>nodes[i]).join(', ');
    const post=[3,4,1,5,6,2,0].map(i=>nodes[i]).join(', ');
    return {type:'fields',prompt:mode==='both'?'Write BOTH traversals of this tree.':'Write the '+(mode==='breadth-first'?'breadth-first':'depth-first post-order')+' traversal.',
      instruction:'Follow each branch from left to right. Enter node letters in order, separated by commas or spaces.',
      nodes,mode,labels:mode==='both'?['Breadth-first order','Depth-first post-order']:['Visiting order'],
      answers:mode==='both'?[bfs,post]:[mode==='breadth-first'?bfs:post],
      hint:mode==='both'?'Breadth-first: level by level. Post-order: left subtree, right subtree, THEN the root.':mode==='breadth-first'?'Visit each level, left to right, before the next level.':'Post-order means left subtree, right subtree, THEN the root.',
      model:mode==='both'?'Breadth-first: '+bfs.replaceAll(', ',' → ')+'.\nPost-order: '+post.replaceAll(', ',' → ')+'.':'Order: '+(mode==='breadth-first'?bfs:post).replaceAll(', ',' → ')+'.'};
  }
  const makers={'cpu-cycle':cpuQuestion,'trace-table':traceQuestion,'binary-search':searchQuestion,
    'bitwise-mask':maskQuestion,'stack-queue':stackQuestion,'tree-traversal':treeQuestion};
  function make(id,level,n){return makers[id]?makers[id](level,n):null;}
  function mount(doc,win){
    const params=new URLSearchParams(win.location.search),id=params.get('skill'),meta=names[id];
    if(!meta)return null;
    const $=x=>doc.getElementById(x),el=(tag,cls,text)=>{const e=doc.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
    let level='easy',n=0,q=null,answered=false,step=0,chosen=null,notes=[];
    $('title').textContent=meta.title;$('subtitle').textContent=meta.sub;$('spec').textContent=meta.spec;
    $('qualification').textContent=meta.course==='h446'?'A Level Computer Science':'GCSE Computer Science';
    $('back').href=meta.course==='h446'?'/exercise/h446/tools.html':id==='cpu-cycle'?'/exercise/paper1/':'/exercise/paper2/';
    const setText=(id,text)=>{$(id).textContent=text;};
    function addField(parent,label,options){
      const wrap=el('label','review-field'),head=el('span','',label);wrap.append(head);
      const input=el(options?'select':'input');input.setAttribute('aria-label',label);
      if(options){input.append(el('option','', 'Choose…'));input.firstChild.value='';options.forEach(o=>{const item=el('option','',o);item.value=o;input.append(item);});}
      else {input.type='text';input.autocomplete='off';input.spellcheck=false;}
      wrap.append(input);parent.append(wrap);return input;
    }
    function renderTree(parent){
      const svg=doc.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 520 280');svg.setAttribute('class','tree-diagram');svg.setAttribute('role','img');svg.setAttribute('aria-label','Binary tree with node labels '+q.nodes.join(', '));
      const coords=[[260,35],[145,110],[375,110],[70,220],[210,220],[305,220],[450,220]];
      const child=(tag,attrs,text)=>{const e=doc.createElementNS('http://www.w3.org/2000/svg',tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(text)e.textContent=text;svg.append(e);};
      for(let i=1;i<7;i++){const parentIndex=Math.floor((i-1)/2);child('line',{x1:coords[parentIndex][0],y1:coords[parentIndex][1],x2:coords[i][0],y2:coords[i][1]});}
      coords.forEach((p,i)=>{child('circle',{cx:p[0],cy:p[1],r:24});child('text',{x:p[0],y:p[1]+1},q.nodes[i]);});
      parent.append(svg);
    }
    function renderSearch(){
      const v=$('visual');v.replaceChildren();v.append(el('div','data-label','SORTED LIST · ZERO-BASED INDICES'));
      const row=el('div','search-row');
      q.arr.forEach((num,i)=>{
        const b=el('button','',String(num));b.type='button';b.setAttribute('aria-label','Index '+i+', value '+num);
        if(i<q.low||i>q.high)b.classList.add('outside');
        if(q.visited.includes(i))b.classList.add('visited');
        if(q.selected===i)b.classList.add('selected');
        b.addEventListener('click',()=>{if(!q.done){q.selected=i;renderSearch();}});
        row.append(b);
      });
      v.append(row,el('p','small-note','Current range: low = '+q.low+', high = '+q.high+'. Target = '+q.target+'.'));
      const log=el('ol','search-steps');q.visited.forEach(i=>log.append(el('li','', 'Checked index '+i+' → '+q.arr[i])));v.append(log);
      $('entry').replaceChildren(el('p','small-note',q.done?'Search complete.':q.selected===null?'Choose the next middle value on the left.':'Selected index '+q.selected+' (value '+q.arr[q.selected]+').'));
    }
    function render(){
      q=make(id,level,n);answered=false;step=0;chosen=null;notes=[];
      setText('question-number','Question '+(n+1));setText('prompt',q.prompt);setText('instruction',q.instruction);setText('feedback','');
      $('explainer').hidden=true;$('visual').replaceChildren();$('entry').replaceChildren();
      if(q.code)$('visual').append(el('div','data-label','GIVEN / ALGORITHM'),el('pre','review-code',q.code));
      if(q.type==='trace'){
        const table=el('table','trace-table'),head=el('tr');['Executed statement',...q.columns].forEach(c=>head.append(el('th','',c)));table.append(head);
        q.rows.forEach((r,i)=>{
          const row=el('tr');row.append(el('td','',r.line));
          r.values.forEach((v,j)=>{
            const cell=el('td');
            if(q.given?.[j])cell.textContent=String(v);
            else {const input=el('input');input.type='text';input.inputMode='numeric';input.setAttribute('aria-label','Row '+(i+1)+', '+q.columns[j]);input.dataset.row=i;input.dataset.col=j;cell.append(input);}
            row.append(cell);
          });table.append(row);
        });$('entry').append(table);
      }else if(q.type==='bits'){
        const label=el('div','data-label','CLICK YOUR RESULT BITS');$('entry').append(label);
        const grid=el('div','bit-grid');for(let i=0;i<8;i++){const b=el('button','', '0');b.type='button';b.dataset.bit=i;b.setAttribute('aria-label','Bit '+(7-i)+': 0');b.addEventListener('click',()=>{const one=b.textContent==='0';b.textContent=one?'1':'0';b.classList.toggle('on',one);b.setAttribute('aria-label','Bit '+(7-i)+': '+b.textContent);});grid.append(b);} $('entry').append(grid);
      }else if(q.type==='search'){renderSearch();}
      else {
        if(q.nodes)renderTree($('visual'));
        const fields=q.labels.map((label)=>addField($('entry'),label,q.options));
        fields[0]?.focus({preventScroll:true});
      }
      if(!q.code&&!q.nodes&&q.type==='search'){}else if(!q.code&&!q.nodes)$('visual').append(el('p','small-note','Work through the method carefully. Use Demo for a similar worked example.'));
      $('model').disabled=false;$('hint').textContent='Show hint';$('check').disabled=false;
    }
    function check(){
      let success=false,detail='';
      if(q.type==='search'){
        if(q.done){setText('feedback','Already complete. Try the next question.');return;}
        const mid=Math.floor((q.low+q.high)/2);
        if(q.selected===null){detail='Choose one of the numbers first.';}
        else if(q.selected!==mid){detail='Not that position. Calculate (low + high) DIV 2 using the current indices.';}
        else {
          q.visited.push(mid);const value=q.arr[mid];q.selected=null;
          if(value===q.target){q.found=true;q.done=true;detail='Correct. Found '+value+' at index '+mid+'.';}
          else {if(value<q.target)q.low=mid+1;else q.high=mid-1;
            q.done=q.low>q.high;
            detail=q.done?'Correct. Search range is empty: value not found.':('Correct. '+(value<q.target?'Keep the right half.':'Keep the left half.')+' Choose the next middle.');}
          success=true;renderSearch();
        }
      }else{
        const expected=q.type==='trace'?q.rows.flatMap((r,i)=>r.values.map((v,j)=>q.given?.[j]?null:String(v)).filter(v=>v!==null)):
          q.type==='bits'?[q.answer]:q.answers;
        const actual=q.type==='trace'?[...$('entry').querySelectorAll('input')].map(x=>x.value):
          q.type==='bits'?[ [...$('entry').querySelectorAll('[data-bit]')].map(x=>x.textContent).join('') ]:
          [...$('entry').querySelectorAll('input,select')].map(x=>x.value);
        success=actual.length===expected.length&&actual.every((v,i)=>clean(v)===clean(expected[i]));
        detail=success?'Correct. You have followed the process.':'Not quite. Check the current values and use Hint or Demo if needed.';
      }
      $('feedback').className='feedback '+(success?'good':'bad');setText('feedback',detail);
    }
    function showHint(){
      $('explainer').hidden=false;setText('explainer',q.type==='search'?'low = '+q.low+', high = '+q.high+'. Next middle index = ('+q.low+' + '+q.high+') DIV 2.':q.hint);
      $('hint').textContent='Hint shown';
    }
    function showModel(){
      $('explainer').hidden=false;setText('explainer',q.model);
      $('model').disabled=true;
    }
    function drawDemo(){
      $('demo-steps').replaceChildren();
      demos[id].steps.forEach((line,i)=>{
        const item=el('li',i<step?'shown':'pending'),num=el('span','num',String(i+1).padStart(2,'0'));
        item.append(num,el('strong','',i<step?line[0]:'Step '+(i+1)));
        if(i<step)item.append(el('code','',line[1]),el('p','',line[2]));
        $('demo-steps').append(item);
      });
      $('demo-step').disabled=step>=demos[id].steps.length;
      $('demo-step').textContent=$('demo-step').disabled?'✓ Example complete':'⏭ Next step';
    }
    function openDemo(){
      step=0;$('activity').hidden=true;$('demo').hidden=false;
      setText('demo-title',meta.title+' · Demo');setText('demo-prompt','Different example: '+demos[id].task+' Your question stays unchanged.');
      drawDemo();$('demo-back').focus({preventScroll:true});
    }
    $('demo-launch').addEventListener('click',openDemo);
    $('demo-back').addEventListener('click',()=>{$('demo').hidden=true;$('activity').hidden=false;$('demo-launch').focus({preventScroll:true});});
    $('demo-step').addEventListener('click',()=>{if(step<demos[id].steps.length){step++;drawDemo();}});
    $('demo-reset').addEventListener('click',()=>{step=0;drawDemo();});
    $('hint').addEventListener('click',showHint);$('model').addEventListener('click',showModel);
    $('check').addEventListener('click',check);
    $('next').addEventListener('click',()=>{n++;render();});
    [...doc.querySelectorAll('[data-level]')].forEach(b=>b.addEventListener('click',()=>{level=b.dataset.level;n=0;doc.querySelectorAll('[data-level]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render();}));
    doc.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('demo').hidden)$('demo-back').click();});
    render();return {id,render,make};
  }
  return {names,make,demos,bits,clean,simulate,searchTrace,mount};
});
