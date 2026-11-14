/* OCR J277/02 Skill 08: count-controlled loops, inclusive TO, STEP and NEXT. */
(function (root, factory) {
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.J277Paper2ForLoops=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function randomFor(seed,level,index) {
    let n=(Number(seed)||1)|0;
    for(const c of level+':'+index)n=(Math.imul(n,31)+c.charCodeAt(0))|0;
    return function(){
      n=(n+0x6D2B79F5)|0;
      let t=Math.imul(n^(n>>>15),1|n);
      t^=t+Math.imul(t^(t>>>7),61|t);
      return ((t^(t>>>14))>>>0)/4294967296;
    };
  }
  const int=(r,a,b)=>a+Math.floor(r()*(b-a+1));
  function shuffle(xs,r){const a=xs.slice();for(let i=a.length-1;i>0;i--){const j=int(r,0,i);[a[i],a[j]]=[a[j],a[i]];}return a;}
  function range(start,end,step){
    if(!Number.isInteger(start)||!Number.isInteger(end)||!Number.isInteger(step)||step===0)return null;
    const result=[];
    for(let i=start;step>0?i<=end:i>=end;i+=step){result.push(i);if(result.length>150)return null;}
    return result;
  }
  function easy(index,r){
    const descending=index===8||index===9;
    const step=index===6||index===7?2:descending?-1:1;
    const count=int(r,3,8);
    const start=descending?int(r,8,14):int(r,0,5);
    const end=start+(count-1)*step;
    const values=range(start,end,step);
    const options=shuffle([count,count-1,count+1,count+2].map(String),r);
    return {
      level:'easy',type:'choose',prompt:'How many times does this loop run?',
      context:'OCR ERL counts both the starting and ending values.',
      code:['for i = '+start+' to '+end+(step===1?'':' step '+step),'    print("Hello")','next i'],
      expected:String(count),options,model:String(count)+' times',
      hint:'List the counter values from start to end. TO includes the final number. STEP says how much i changes.',
      explanation:'i takes '+values.join(', ')+'. That is '+count+' iterations.'
    };
  }
  function medium(index,r){
    const offset=int(r,0,3);
    const cases=[
      {start:1,end:4+offset,step:1,initial:0,expr:'total + i',type:'sum',why:'Add each loop counter to the running total.'},
      {start:0,end:3+offset,step:1,initial:0,expr:'total + 1',type:'count',why:'Add 1 on every iteration. TO includes both ends.'},
      {start:2,end:8+offset*2,step:2,initial:0,expr:'total + i',type:'even',why:'STEP 2 visits only the even counters.'},
      {start:8+offset,end:3,step:-1,initial:0,expr:'total + i',type:'down',why:'STEP -1 counts down, including the ending value.'},
      {start:1,end:4+offset,step:1,initial:1,expr:'total * i',type:'product',why:'Multiply the running total by each counter.'},
      {start:1,end:5+offset,step:2,initial:0,expr:'total + i',type:'odd',why:'Only 1, 3, 5, ... are visited.'},
      {start:10+offset*2,end:2,step:-2,initial:0,expr:'total + i',type:'down-two',why:'Subtract 2 from the counter after each iteration.'},
      {start:1,end:4+offset,step:1,initial:0,expr:'total + i * 2',type:'double',why:'Multiply i by 2, then add to total each time.'},
      {start:3,end:5+offset,step:1,initial:20,expr:'total - i',type:'subtract',why:'Subtract each counter value from the starting total.'},
      {start:2,end:4+offset,step:1,initial:0,expr:'total + i ^ 2',type:'squares',why:'Square i before adding it to total.'}
    ];
    const q=cases[index%10];
    const values=range(q.start,q.end,q.step);
    let total=q.initial;
    for(const i of values){
      if(q.type==='count')total+=1;
      else if(q.type==='product')total*=i;
      else if(q.type==='double')total+=i*2;
      else if(q.type==='subtract')total-=i;
      else if(q.type==='squares')total+=i*i;
      else total+=i;
    }
    return {
      level:'medium',type:'number',prompt:'What number will be printed?',
      context:'Trace every iteration, updating total each time.',
      code:['total = '+q.initial,'for i = '+q.start+' to '+q.end+(q.step===1?'':' step '+q.step),
        '    total = '+q.expr,'next i','print(total)'],
      expected:total,model:'Output: '+total,
      hint:'Write down each value of i, then update total. The ending number counts if STEP reaches it.',
      explanation:q.why+' The loop visits '+values.join(', ')+', giving '+total+'.'
    };
  }
  const hardTasks=[
    {prompt:'Print every whole number from 1 to the entered number (inclusive).',model:['for i = 1 to n','    print(i)','next i'],kind:'up'},
    {prompt:'Print every whole number from 0 to the entered number (inclusive).',model:['for i = 0 to n','    print(i)','next i'],kind:'up-zero'},
    {prompt:'Print each even number from 2 up to the entered number (inclusive if even).',model:['for i = 2 to n step 2','    print(i)','next i'],kind:'even'},
    {prompt:'Print numbers from the entered number down to 1, using STEP -1.',model:['for i = n to 1 step -1','    print(i)','next i'],kind:'down'},
    {prompt:'Calculate and print the sum of all numbers from 1 to the entered number.',model:['total = 0','for i = 1 to n','    total = total + i','next i','print(total)'],kind:'sum'},
    {prompt:'Calculate and print the sum of all even numbers from 2 to the entered number.',model:['total = 0','for i = 2 to n step 2','    total = total + i','next i','print(total)'],kind:'even-sum'},
    {prompt:'Print every whole number from the entered number down to 0, using STEP -1.',model:['for i = n to 0 step -1','    print(i)','next i'],kind:'down-zero'},
    {prompt:'Print multiples of 3 from 3 up to the entered number (inclusive if a multiple).',model:['for i = 3 to n step 3','    print(i)','next i'],kind:'threes'},
    {prompt:'Print the square of each number from 1 to the entered number.',model:['for i = 1 to n','    print(i ^ 2)','next i'],kind:'squares'},
    {prompt:'Calculate and print the product of all numbers from 1 to the entered number.',model:['product = 1','for i = 1 to n','    product = product * i','next i','print(product)'],kind:'factorial'}
  ];
  function hard(index){
    const q=hardTasks[index%10];
    return {
      level:'hard',type:'write',kind:q.kind,
      prompt:'Ask for a positive whole number. '+q.prompt,
      context:'Write the input, FOR loop and NEXT line in OCR ERL.',
      model:['n = int(input("Number"))',...q.model].join('\n'),
      hint:'Use for i = start to end, add step 2 or step -1 when needed, and finish with next i. TO includes the end.',
      explanation:'Your loop was checked with several input values, including smaller and larger limits.'
    };
  }
  function makeQuestion(level,index,seed){
    if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0)throw new Error('Invalid FOR-loop question');
    const r=randomFor(seed,level,index);
    return level==='easy'?easy(index,r):level==='medium'?medium(index,r):hard(index);
  }
  function expectedOutput(q,n){
    const seq=kind=>{
      if(kind==='up')return range(1,n,1);
      if(kind==='up-zero')return range(0,n,1);
      if(kind==='even'||kind==='even-sum')return range(2,n,2);
      if(kind==='down')return range(n,1,-1);
      if(kind==='down-zero')return range(n,0,-1);
      if(kind==='threes')return range(3,n,3);
      return range(1,n,1);
    };
    const values=seq(q.kind);
    if(!values)return null;
    if(['up','up-zero','even','down','down-zero','threes'].includes(q.kind))return values;
    if(q.kind==='squares')return values.map(x=>x*x);
    if(q.kind==='sum'||q.kind==='even-sum')return [values.reduce((s,x)=>s+x,0)];
    if(q.kind==='factorial')return [values.reduce((p,x)=>p*x,1)];
    return null;
  }

  // Restrict input to assignment, print and FOR/NEXT, with no eval or arbitrary JS.
  function parseProgram(source){
    const lines=String(source??'').replace(/\r/g,'').split('\n').map(x=>x.replace(/\/\/.*$/,'').trim()).filter(Boolean);
    if(lines.length<4||lines.length>30)return null;
    let pos=0,steps=0;
    function block(depth){
      if(depth>5)return null;
      const body=[];
      while(pos<lines.length){
        const line=lines[pos];
        if(/^next\b/i.test(line))break;
        if(++steps>50)return null;
        const loop=line.match(/^for\s+([A-Za-z_]\w*)\s*(?:=|←|:=)\s*(.+?)\s+to\s+(.+?)(?:\s+step\s+(.+))?$/i);
        if(loop){
          pos++;const inside=block(depth+1);
          if(!inside||!inside.length)return null;
          const end=lines[pos]&&lines[pos].match(/^next\s+([A-Za-z_]\w*)$/i);
          if(!end||end[1].toLowerCase()!==loop[1].toLowerCase())return null;
          pos++;
          body.push({type:'for',counter:loop[1].toLowerCase(),start:loop[2],end:loop[3],step:loop[4]||'1',body:inside});
          continue;
        }
        const printed=line.match(/^print\s*\(\s*(.+?)\s*\)$/i);
        if(printed){body.push({type:'print',expr:printed[1]});pos++;continue;}
        const assign=line.match(/^([A-Za-z_]\w*)\s*(?:=|:=|←)\s*(.+)$/);
        if(assign){body.push({type:'assign',name:assign[1].toLowerCase(),expr:assign[2]});pos++;continue;}
        return null;
      }
      return body;
    }
    const ast=block(0);
    return ast&&ast.length&&pos===lines.length?ast:null;
  }

  function tokenize(expr){
    const result=[];let pos=0;
    while(pos<expr.length){
      const m=expr.slice(pos).match(/^\s*(DIV\b|MOD\b|[A-Za-z_]\w*|\d+(?:\.\d+)?|[()+*\/\-^])\s*/i);
      if(!m)return null;
      result.push(m[1]);pos+=m[0].length;
    }
    return result;
  }
  function evaluateExpression(expr,env){
    const tokens=tokenize(String(expr).trim());if(!tokens||!tokens.length)return null;
    let k=0;
    function primary(){
      const t=tokens[k++];if(!t)return null;
      if(t==='('){const x=add();if(tokens[k++]!==')')return null;return x;}
      if(/^\d/.test(t))return Number(t);
      return Object.prototype.hasOwnProperty.call(env,t.toLowerCase())?env[t.toLowerCase()]:null;
    }
    function power(){
      const a=primary();if(a===null)return null;
      if(tokens[k]!=='^')return a;
      k++;const b=signed();if(b===null)return null;
      const v=a**b;return Number.isFinite(v)?v:null;
    }
    function signed(){
      if(tokens[k]==='+'||tokens[k]==='-'){
        const sign=tokens[k++],x=signed();return x===null?null:sign==='-'?-x:x;
      }
      return power();
    }
    function multiply(){
      let a=signed();if(a===null)return null;
      while(k<tokens.length&&['*','/','DIV','MOD'].includes(tokens[k].toUpperCase())){
        const op=tokens[k++].toUpperCase(),b=signed();
        if(b===null||(b===0&&op!=='*'))return null;
        a=op==='*'?a*b:op==='/'?a/b:op==='DIV'?Math.trunc(a/b):a%b;
      }
      return a;
    }
    function add(){
      let a=multiply();if(a===null)return null;
      while(k<tokens.length&&['+','-'].includes(tokens[k])){
        const op=tokens[k++],b=multiply();if(b===null)return null;
        a=op==='+'?a+b:a-b;
      }
      return a;
    }
    const value=add();return k===tokens.length&&Number.isFinite(value)?value:null;
  }

  function runProgram(ast,input){
    if(!Array.isArray(ast)||!Number.isInteger(input)||input<1||input>30)return null;
    const env=Object.create(null),output=[];
    let inputCount=0,operations=0,loops=0;
    function execute(statements){
      for(const node of statements){
        if(++operations>600)return false;
        if(node.type==='assign'){
          if(/^(?:int\s*\(\s*)?input\s*\(\s*(?:"[^"]*"|'[^']*')?\s*\)\s*\)?$/i.test(node.expr)){
            if(inputCount>=1)return false;
            env[node.name]=input;inputCount++;continue;
          }
          const val=evaluateExpression(node.expr,env);if(val===null)return false;
          env[node.name]=val;continue;
        }
        if(node.type==='print'){
          const val=evaluateExpression(node.expr,env);
          if(val===null||output.length>=150)return false;
          output.push(val);continue;
        }
        if(node.type==='for'){
          const start=evaluateExpression(node.start,env),end=evaluateExpression(node.end,env),step=evaluateExpression(node.step,env);
          const values=range(start,end,step);if(!values||++loops>40)return false;
          for(const val of values){env[node.counter]=val;if(!execute(node.body))return false;}
          continue;
        }
        return false;
      }
      return true;
    }
    return execute(ast)&&inputCount===1?output:null;
  }
  function checkAnswer(q,response){
    const text=String(response??'').trim();
    if(q.type==='choose')return {complete:!!text,correct:!!text&&text===q.expected};
    if(q.type==='number')return {complete:!!text,correct:!!text&&Number.isFinite(Number(text))&&Number(text)===q.expected};
    const ast=text?parseProgram(text):null;
    const testInputs=[1,2,3,4,5,6,7,8,9,10,12,15];
    const correct=!!ast&&testInputs.every(n=>{
      const actual=runProgram(ast,n),expected=expectedOutput(q,n);
      return actual&&expected&&actual.length===expected.length&&actual.every((x,i)=>Math.abs(x-expected[i])<1e-9);
    });
    return {complete:!!text,correct};
  }
  return {makeQuestion,checkAnswer,range,expectedOutput,parseProgram,evaluateExpression,runProgram};
});
