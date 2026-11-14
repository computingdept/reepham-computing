/* OCR J277/02 Skill 09: WHILE (check first) and DO ... UNTIL (check after). */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.J277Paper2WhileUntil=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  function seededRandom(seed,level,index){
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
  function shuffled(items,r){const xs=items.slice();for(let i=xs.length-1;i>0;i--){const j=int(r,0,i);[xs[i],xs[j]]=[xs[j],xs[i]];}return xs;}
  function comparison(a,operator,b){
    if(operator==='<')return a<b;
    if(operator==='<=')return a<=b;
    if(operator==='>')return a>b;
    if(operator==='>=')return a>=b;
    if(operator==='==')return a===b;
    if(operator==='!=')return a!==b;
    return null;
  }
  function loopValues(plan){
    const result=[];let i=plan.start;
    if(!Number.isInteger(i)||!Number.isInteger(plan.bound)||!Number.isInteger(plan.delta)||!plan.delta)return null;
    for(let safety=0;safety<150;safety++){
      const test=comparison(i,plan.operator,plan.bound);
      if(test===null)return null;
      if(plan.mode==='while'&&!test)return result;
      result.push(i);i+=plan.delta;
      if(plan.mode==='do'&&comparison(i,plan.operator,plan.bound))return result;
    }
    return null;
  }
  function loopCode(plan,body){
    const assignment='i = '+plan.start;
    const update='i = i '+(plan.delta>0?'+ '+plan.delta:'- '+(-plan.delta));
    return plan.mode==='while'?
      [assignment,'while i '+plan.operator+' '+plan.bound,'    '+body,'    '+update,'endwhile']:
      [assignment,'do','    '+body,'    '+update,'until i '+plan.operator+' '+plan.bound];
  }
  const EASY_PLANS=[
    off=>({mode:'while',start:1,bound:5+off,operator:'<',delta:1}),
    off=>({mode:'while',start:5+off,bound:5+off,operator:'<',delta:1}),
    off=>({mode:'do',start:1,bound:4+off,operator:'>=',delta:1}),
    off=>({mode:'do',start:5+off,bound:5+off,operator:'>=',delta:1}),
    off=>({mode:'while',start:0,bound:4+off,operator:'<=',delta:1}),
    off=>({mode:'while',start:8+off,bound:3,operator:'>',delta:-1}),
    off=>({mode:'do',start:7+off,bound:2,operator:'<=',delta:-1}),
    off=>({mode:'while',start:1,bound:4+off,operator:'!=',delta:1}),
    off=>({mode:'do',start:0,bound:4+off,operator:'==',delta:1}),
    off=>({mode:'do',start:10+off*2,bound:2,operator:'<=',delta:-2})
  ];
  function easy(index,r){
    const plan=EASY_PLANS[index%10](int(r,0,3));
    const values=loopValues(plan);
    if(!values)throw Error('Invalid WHILE/UNTIL generated question');
    const n=values.length;
    const alternatives=n===0?[0,1,2,3]:n===1?[1,0,2,3]:[n,n-1,n+1,n+2];
    const kind=plan.mode==='while'?'WHILE':'DO UNTIL';
    const code=loopCode(plan,'print("Tick")');
    return {level:'easy',type:'choose',mode:plan.mode,
      prompt:'How many times will "Tick" print?',
      context:plan.mode==='while'?'WHILE checks before running. It can run zero times.':
        'DO UNTIL checks after running. It always runs at least once.',
      code,options:shuffled(alternatives.map(String),r),expected:String(n),model:n+' times',
      hint:plan.mode==='while'?'Check the WHILE condition before the first print, then after every change to i.':
        'Run the DO body once first. Check the UNTIL condition only after updating i.',
      explanation:kind+' visits '+(values.length?values.join(', '):'no counter values')+'. That is '+n+' iteration'+(n===1?'':'s')+'.'
    };
  }
  const MEDIUM_PLANS=[
    off=>({mode:'while',start:1,bound:5+off,operator:'<',delta:1,initial:0,operation:'sum',expr:'total + i'}),
    off=>({mode:'while',start:5+off,bound:5+off,operator:'<',delta:1,initial:0,operation:'sum',expr:'total + i'}),
    off=>({mode:'do',start:5+off,bound:5+off,operator:'>=',delta:1,initial:0,operation:'sum',expr:'total + i'}),
    off=>({mode:'do',start:1,bound:5+off,operator:'>',delta:1,initial:0,operation:'sum',expr:'total + i'}),
    off=>({mode:'while',start:8+off,bound:3,operator:'>=',delta:-1,initial:0,operation:'sum',expr:'total + i'}),
    off=>({mode:'do',start:8+off,bound:3,operator:'<',delta:-1,initial:0,operation:'sum',expr:'total + i'}),
    off=>({mode:'while',start:1,bound:5+off,operator:'<=',delta:1,initial:0,operation:'double',expr:'total + i * 2'}),
    off=>({mode:'do',start:1,bound:4+off,operator:'>=',delta:1,initial:1,operation:'product',expr:'total * i'}),
    off=>({mode:'while',start:2,bound:8+off*2,operator:'<=',delta:2,initial:0,operation:'sum',expr:'total + i'}),
    off=>({mode:'do',start:0,bound:4+off,operator:'>',delta:1,initial:0,operation:'count',expr:'total + 1'})
  ];
  function medium(index,r){
    const plan=MEDIUM_PLANS[index%10](int(r,0,3));
    const values=loopValues(plan);
    if(!values)throw Error('Invalid tracing question');
    let total=plan.initial;
    for(const i of values){
      if(plan.operation==='double')total+=i*2;
      else if(plan.operation==='product')total*=i;
      else if(plan.operation==='count')total+=1;
      else total+=i;
    }
    return {level:'medium',type:'number',mode:plan.mode,
      prompt:'What number will be printed?',
      context:plan.mode==='while'?'WHILE: check the condition first, then update total.':
        'DO UNTIL: update total once before the first condition check.',
      code:[`total = ${plan.initial}`,...loopCode(plan,'total = '+plan.expr),'print(total)'],
      expected:total,model:'Output: '+total,
      hint:'Trace each i and total in a table. WHILE checks first; DO UNTIL checks after the body.',
      explanation:'The loop visits '+(values.length?values.join(', '):'no counter values')+'. Final total = '+total+'.'
    };
  }
  const HARD_TASKS=[
    {mode:'while',kind:'up',prompt:'Using WHILE, print the numbers 1 to the entered number.',lines:['i = 1','while i <= n','    print(i)','    i = i + 1','endwhile']},
    {mode:'do',kind:'up',prompt:'Using DO UNTIL, print the numbers 1 to the entered number.',lines:['i = 1','do','    print(i)','    i = i + 1','until i > n']},
    {mode:'while',kind:'up-zero',prompt:'Using WHILE, print the numbers 0 to the entered number.',lines:['i = 0','while i <= n','    print(i)','    i = i + 1','endwhile']},
    {mode:'do',kind:'down',prompt:'Using DO UNTIL, print from the entered number down to 1.',lines:['i = n','do','    print(i)','    i = i - 1','until i < 1']},
    {mode:'while',kind:'sum',prompt:'Using WHILE, calculate and print the sum from 1 to the entered number.',lines:['i = 1','total = 0','while i <= n','    total = total + i','    i = i + 1','endwhile','print(total)']},
    {mode:'do',kind:'sum',prompt:'Using DO UNTIL, calculate and print the sum from 1 to the entered number.',lines:['i = 1','total = 0','do','    total = total + i','    i = i + 1','until i > n','print(total)']},
    {mode:'while',kind:'even',prompt:'Using WHILE, print every even number from 2 up to the entered number.',lines:['i = 2','while i <= n','    print(i)','    i = i + 2','endwhile']},
    {mode:'do',kind:'first-even',prompt:'Using DO UNTIL, print the first n positive even numbers (where n is the input).',lines:['i = 2','count = 0','do','    print(i)','    i = i + 2','    count = count + 1','until count >= n']},
    {mode:'while',kind:'factorial',prompt:'Using WHILE, calculate and print the product of the whole numbers from 1 to the input.',lines:['i = 1','product = 1','while i <= n','    product = product * i','    i = i + 1','endwhile','print(product)']},
    {mode:'do',kind:'down-zero',prompt:'Using DO UNTIL, print from the entered number down to 0.',lines:['i = n','do','    print(i)','    i = i - 1','until i < 0']}
  ];
  function hard(index){
    const task=HARD_TASKS[index%10];
    return {level:'hard',type:'write',mode:task.mode,kind:task.kind,
      prompt:'Ask for a positive whole number. '+task.prompt,
      context:'Use OCR ERL with '+(task.mode==='while'?'WHILE and ENDWHILE.':'DO and UNTIL.'),
      model:['n = int(input("Number"))',...task.lines].join('\n'),
      hint:task.mode==='while'?'Start the counter, check WHILE before the body, update it and close with ENDWHILE.':
        'Start the counter, use DO, change the counter inside, then put the stopping test after UNTIL.',
      explanation:'Your '+(task.mode==='while'?'WHILE':'DO UNTIL')+' algorithm passed several different input values.'
    };
  }
  function makeQuestion(level,index,seed){
    if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0)throw Error('Invalid WHILE/UNTIL question');
    const r=seededRandom(seed,level,index);
    return level==='easy'?easy(index,r):level==='medium'?medium(index,r):hard(index);
  }
  function expectedOutput(q,n){
    if(!Number.isInteger(n)||n<1)return null;
    const seq=(a,b,s)=>{const values=[];for(let i=a;s>0?i<=b:i>=b;i+=s){values.push(i);if(values.length>200)return null;}return values;};
    if(q.kind==='up')return seq(1,n,1);
    if(q.kind==='up-zero')return seq(0,n,1);
    if(q.kind==='down')return seq(n,1,-1);
    if(q.kind==='down-zero')return seq(n,0,-1);
    if(q.kind==='even')return seq(2,n,2);
    if(q.kind==='first-even')return seq(2,2*n,2);
    if(q.kind==='sum')return [n*(n+1)/2];
    if(q.kind==='factorial'){let value=1;for(let i=1;i<=n;i++)value*=i;return [value];}
    return null;
  }

  // Parse a small, bounded subset of OCR ERL without running arbitrary JS.
  function parseProgram(source){
    const lines=String(source??'').replace(/\r/g,'').split('\n')
      .map(s=>s.replace(/\/\/.*$/,'').trim()).filter(Boolean);
    if(lines.length<4||lines.length>40)return null;
    let pos=0,statements=0;
    function block(depth,closing){
      if(depth>4)return null;
      const body=[];
      while(pos<lines.length){
        const line=lines[pos];
        if(closing&&closing.test(line))break;
        if(++statements>60)return null;
        const whileMatch=line.match(/^while\s+(.+)$/i);
        if(whileMatch){
          pos++;const inside=block(depth+1,/^endwhile$/i);
          if(!inside||!inside.length||!/^endwhile$/i.test(lines[pos]||''))return null;
          pos++;body.push({type:'while',condition:whileMatch[1],body:inside});continue;
        }
        if(/^do$/i.test(line)){
          pos++;const inside=block(depth+1,/^until\s+.+$/i);
          const until=(lines[pos]||'').match(/^until\s+(.+)$/i);
          if(!inside||!inside.length||!until)return null;
          pos++;body.push({type:'do',condition:until[1],body:inside});continue;
        }
        const printed=line.match(/^print\s*\(\s*(.+?)\s*\)$/i);
        if(printed){body.push({type:'print',expr:printed[1]});pos++;continue;}
        const assigned=line.match(/^([A-Za-z_]\w*)\s*(?:=|:=|←)\s*(.+)$/);
        if(assigned){body.push({type:'assign',name:assigned[1].toLowerCase(),expr:assigned[2]});pos++;continue;}
        return null;
      }
      return body;
    }
    const ast=block(0,null);
    return ast&&ast.length&&pos===lines.length?ast:null;
  }
  function tokensOf(expr){
    const tokens=[];let pos=0;
    while(pos<expr.length){
      const match=expr.slice(pos).match(/^\s*(DIV\b|MOD\b|[A-Za-z_]\w*|\d+(?:\.\d+)?|[()+*\/\-^])\s*/i);
      if(!match)return null;
      tokens.push(match[1]);pos+=match[0].length;
    }
    return tokens;
  }
  function evaluateExpression(expr,env){
    const tokens=tokensOf(String(expr).trim());if(!tokens||!tokens.length)return null;
    let k=0;
    function atom(){
      const t=tokens[k++];if(!t)return null;
      if(t==='('){const x=add();if(tokens[k++]!==')')return null;return x;}
      if(/^\d/.test(t))return Number(t);
      return Object.prototype.hasOwnProperty.call(env,t.toLowerCase())?env[t.toLowerCase()]:null;
    }
    function power(){const a=atom();if(a===null)return null;if(tokens[k]!=='^')return a;k++;const b=signed();return b===null?null:a**b;}
    function signed(){if(tokens[k]==='+'||tokens[k]==='-'){const s=tokens[k++],x=signed();return x===null?null:s==='-'?-x:x;}return power();}
    function multiply(){
      let a=signed();if(a===null)return null;
      while(k<tokens.length&&['*','/','DIV','MOD'].includes(tokens[k].toUpperCase())){
        const op=tokens[k++].toUpperCase(),b=signed();if(b===null||(b===0&&op!=='*'))return null;
        a=op==='*'?a*b:op==='/'?a/b:op==='DIV'?Math.trunc(a/b):a%b;
      }
      return a;
    }
    function add(){let a=multiply();if(a===null)return null;while(k<tokens.length&&['+','-'].includes(tokens[k])){const s=tokens[k++],b=multiply();if(b===null)return null;a=s==='+'?a+b:a-b;}return a;}
    const result=add();return k===tokens.length&&Number.isFinite(result)?result:null;
  }
  function evaluateCondition(expression,env){
    const parts=String(expression).trim().match(/^(.+?)\s*(<=|>=|==|!=|<|>)\s*(.+)$/);
    if(!parts)return null;
    const left=evaluateExpression(parts[1],env),right=evaluateExpression(parts[3],env);
    return left===null||right===null?null:comparison(left,parts[2],right);
  }
  function runProgram(ast,input){
    if(!Array.isArray(ast)||!Number.isInteger(input)||input<1||input>20)return null;
    const env=Object.create(null),output=[];
    let inputCount=0,operations=0,iterations=0;
    function execute(body){
      for(const node of body){
        if(++operations>1000)return false;
        if(node.type==='assign'){
          if(/^(?:int\s*\(\s*)?input\s*\(\s*(?:"[^"]*"|'[^']*')?\s*\)\s*\)?$/i.test(node.expr)){
            if(inputCount!==0)return false;
            inputCount++;env[node.name]=input;continue;
          }
          const val=evaluateExpression(node.expr,env);if(val===null)return false;
          env[node.name]=val;continue;
        }
        if(node.type==='print'){
          const val=evaluateExpression(node.expr,env);if(val===null||output.length>=200)return false;
          output.push(val);continue;
        }
        if(node.type==='while'){
          for(;;){
            const cond=evaluateCondition(node.condition,env);if(cond===null)return false;
            if(!cond)break;
            if(++iterations>200||!execute(node.body))return false;
          }
          continue;
        }
        if(node.type==='do'){
          for(;;){
            if(++iterations>200||!execute(node.body))return false;
            const stop=evaluateCondition(node.condition,env);if(stop===null)return false;
            if(stop)break;
          }
          continue;
        }
        return false;
      }
      return true;
    }
    return execute(ast)&&inputCount===1?output:null;
  }
  function containsLoopKind(nodes,kind){
    return nodes.some(node=>node.type===kind||(node.body&&containsLoopKind(node.body,kind)));
  }
  function checkAnswer(q,response){
    const text=String(response??'').trim();
    if(q.type==='choose')return {complete:!!text,correct:!!text&&text===q.expected};
    if(q.type==='number')return {complete:!!text,correct:!!text&&Number.isFinite(Number(text))&&Number(text)===q.expected};
    const ast=text?parseProgram(text):null;
    const correct=!!ast&&containsLoopKind(ast,q.mode)&&[1,2,3,4,5,6,7,8,9,10,12,15].every(n=>{
      const actual=runProgram(ast,n),expected=expectedOutput(q,n);
      return actual&&expected&&actual.length===expected.length&&actual.every((value,i)=>Math.abs(value-expected[i])<1e-9);
    });
    return {complete:!!text,correct};
  }
  return {makeQuestion,checkAnswer,comparison,loopValues,expectedOutput,parseProgram,evaluateExpression,evaluateCondition,runProgram};
});
