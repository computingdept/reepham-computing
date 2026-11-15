/* OCR J277/02 · Functions (sub programs): ten questions per level.
   The Hard marker interprets a bounded subset of OCR ERL; it never executes
   a learner's program as JavaScript. */
(function(root,factory){
  const api=factory(typeof module==='object'&&module.exports?require('./strings.js'):root.J277Paper2Strings);
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.J277Paper2Functions=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(strings){
  'use strict';
  if(!strings)throw Error('String expression reader is required');
  const easyCases=[
    {code:['function double(number)','    return number * 2','endfunction','print(double(4))'],prompt:'What will this function print?',options:['8','4','2','Nothing'],answer:'8',why:'The call passes 4 into number. RETURN sends 8 back to PRINT.'},
    {code:['function addThree(value)','    return value + 3','endfunction','result = addThree(5)','print(result)'],prompt:'What is the value of result?',options:['8','5','3','15'],answer:'8',why:'The function returns 5 + 3, which is stored in result.'},
    {code:['function triple(number)','    return number * 3','endfunction','print(triple(2))'],prompt:'Which line calls the function?',options:['print(triple(2))','function triple(number)','return number * 3','endfunction'],answer:'print(triple(2))',why:'A call uses the function name and an argument. Here PRINT uses the returned value.'},
    {code:['function square(n)','    return n * n','endfunction','print(square(5))'],prompt:'Which value is the argument?',options:['5','n','square','25'],answer:'5',why:'5 is supplied at the call. n is the parameter in the heading.'},
    {code:['function square(n)','    return n * n','endfunction','print(square(5))'],prompt:'Which name is the parameter?',options:['n','5','25','square'],answer:'n',why:'n is the named placeholder in the function heading.'},
    {code:['function welcome(name)','    return "Hi " + name','endfunction','print(welcome("Mia"))'],prompt:'What will be printed?',options:['Hi Mia','Mia','Hi name','Nothing'],answer:'Hi Mia',why:'The return value is the string "Hi Mia", and PRINT displays it.'},
    {code:['function half(n)','    return n DIV 2','endfunction','print(half(9))'],prompt:'What will the function return?',options:['4','4.5','9','2'],answer:'4',why:'DIV performs whole-number division, so 9 DIV 2 is 4.'},
    {code:['function larger(a, b)','    if a > b then','        return a','    else','        return b','    endif','endfunction','print(larger(3, 7))'],prompt:'What will be printed?',options:['7','3','10','Nothing'],answer:'7',why:'The ELSE branch returns the greater argument, 7.'},
    {code:['function isAdult(age)','    return age >= 18','endfunction','print(isAdult(16))'],prompt:'What value is returned?',options:['False','True','16','18'],answer:'False',why:'16 >= 18 evaluates to False, which is returned and printed.'},
    {code:['function double(n)','    return n * 2','endfunction','answer = double(6)','print(answer)'],prompt:'What does RETURN do?',options:['Sends a value back to the caller','Prints immediately','Ends the whole program','Changes n to 0'],answer:'Sends a value back to the caller',why:'RETURN ends the function and provides a result. The caller can store or print it.'}
  ];
  const range=n=>Array.from({length:Math.min(80,Math.max(0,Number(n)||0))},(_,i)=>i+1);
  const cases=[
    {name:'sumEvens',params:['limit'],sample:[8],goal:'add the even numbers from 1 to limit and return their sum',hint:'Start total at 0. Add i when i MOD 2 == 0.',
      body:['total = 0','for i = 1 to limit','    if i MOD 2 == 0 then','        total = total + i','    endif','next i','return total'],expected:([n])=>range(n).filter(i=>i%2===0).reduce((a,b)=>a+b,0)},
    {name:'countOdds',params:['limit'],sample:[9],goal:'count the odd numbers from 1 to limit and return the count',hint:'Increase count when i MOD 2 != 0.',
      body:['count = 0','for i = 1 to limit','    if i MOD 2 != 0 then','        count = count + 1','    endif','next i','return count'],expected:([n])=>range(n).filter(i=>i%2!==0).length},
    {name:'sumMultiples',params:['limit','divisor'],sample:[10,3],goal:'add numbers from 1 to limit that are multiples of divisor and return the total',hint:'A multiple has i MOD divisor == 0.',
      body:['total = 0','for i = 1 to limit','    if i MOD divisor == 0 then','        total = total + i','    endif','next i','return total'],expected:([n,d])=>range(n).filter(i=>d&&i%d===0).reduce((a,b)=>a+b,0)},
    {name:'countAbove',params:['limit','threshold'],sample:[9,5],goal:'count numbers from 1 to limit that are greater than threshold and return the count',hint:'Test i > threshold inside the FOR loop.',
      body:['count = 0','for i = 1 to limit','    if i > threshold then','        count = count + 1','    endif','next i','return count'],expected:([n,t])=>range(n).filter(i=>i>t).length},
    {name:'sumOddSquares',params:['limit'],sample:[5],goal:'add the squares of odd numbers from 1 to limit and return the sum',hint:'Test i MOD 2 and add i * i.',
      body:['total = 0','for i = 1 to limit','    if i MOD 2 != 0 then','        total = total + i * i','    endif','next i','return total'],expected:([n])=>range(n).filter(i=>i%2!==0).reduce((a,b)=>a+b*b,0)},
    {name:'largestEven',params:['limit'],sample:[9],goal:'find the largest even number from 1 to limit and return it (or 0 if none)',hint:'Keep updating largest whenever i is even.',
      body:['largest = 0','for i = 1 to limit','    if i MOD 2 == 0 then','        largest = i','    endif','next i','return largest'],expected:([n])=>range(n).filter(i=>i%2===0).at(-1)||0},
    {name:'passCount',params:['limit','passMark'],sample:[7,40],goal:'count scores 10, 20, ... up to limit × 10 that meet passMark and return the count',hint:'Each score is i * 10; compare it with passMark.',
      body:['count = 0','for i = 1 to limit','    if i * 10 >= passMark then','        count = count + 1','    endif','next i','return count'],expected:([n,m])=>range(n).filter(i=>i*10>=m).length},
    {name:'smallSquareSum',params:['limit','maximum'],sample:[7,25],goal:'add squares from 1 to limit only when the square is at most maximum, then return the total',hint:'Compare i * i with maximum.',
      body:['total = 0','for i = 1 to limit','    if i * i <= maximum then','        total = total + i * i','    endif','next i','return total'],expected:([n,m])=>range(n).filter(i=>i*i<=m).reduce((a,b)=>a+b*b,0)},
    {name:'countFactors',params:['limit'],sample:[12],goal:'count positive factors of limit and return the count',hint:'A factor divides limit with no remainder: limit MOD i == 0.',
      body:['count = 0','for i = 1 to limit','    if limit MOD i == 0 then','        count = count + 1','    endif','next i','return count'],expected:([n])=>range(n).filter(i=>n%i===0).length},
    {name:'passesTarget',params:['limit','passMark'],sample:[6,40],goal:'return "Pass" if at least three scores (10, 20, ... limit × 10) meet passMark; otherwise return "Retry"',hint:'Count the passes inside FOR, then use a final IF to RETURN one string.',
      body:['passes = 0','for i = 1 to limit','    if i * 10 >= passMark then','        passes = passes + 1','    endif','next i','if passes >= 3 then','    return "Pass"','else','    return "Retry"','endif'],expected:([n,m])=>range(n).filter(i=>i*10>=m).length>=3?'Pass':'Retry'}
  ];
  const callText=(name,args)=>name+'('+args.join(', ')+')';
  const fullProgram=(c,args)=>['function '+callText(c.name,c.params),...c.body.map(line=>'    '+line),'endfunction','print('+callText(c.name,args)+')'];
  function makeQuestion(level,index,seed){
    if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0||index>=10)throw Error('Invalid Functions question');
    if(level==='easy'){
      const q=easyCases[index];return {...q,level,index,type:'choose',expected:q.answer,model:q.answer,
        context:'Start at the function call. Follow RETURN back to where it was called.',
        hint:'The parameter appears in the heading. The argument appears in the call. RETURN supplies a result.',explanation:q.why};
    }
    const c=cases[level==='medium'?(index+3)%10:index];
    const args=level==='medium'?c.sample.map((v,i)=>i===0?Math.max(1,v-2):v):c.sample;
    const code=fullProgram(c,args),expected=c.expected(args);
    if(level==='medium')return {level,index,type:'trace',prompt:'What will this function return?',context:'Start at the call, follow the FOR loop and IF, then find the RETURN value.',code,
      expected:String(expected),model:String(expected),hint:'The argument fills the matching parameter. A function RETURN sends a value back to the caller.',
      explanation:'The function returns '+expected+' with arguments '+args.join(', ')+'.'};
    return {level,index,type:'program',...c,args,code:['print('+callText(c.name,args)+')'],expected:String(expected),expectedFor:c.expected,
      prompt:'Write an OCR ERL function called '+callText(c.name,c.params)+' that uses a FOR loop and IF statement to '+c.goal+'. Then call it using print('+callText(c.name,args)+').',context:'',
      model:code.join('\n'),hint:'Start with function '+callText(c.name,c.params)+'. '+c.hint+' Finish with RETURN and ENDFUNCTION, then print the function call.',
      explanation:'Your function returned the right value for the example and several unseen arguments.'};
  }
  const hasNode=(nodes,type)=>nodes.some(node=>node.type===type||node.body&&hasNode(node.body,type)||node.branches&&node.branches.some(branch=>hasNode(branch.body,type))||node.alternative&&hasNode(node.alternative,type));
  function parseFunction(source){
    const lines=String(source??'').replace(/\r/g,'').split('\n').map(x=>x.trim()).filter(Boolean);
    if(lines.length<6||lines.length>48)return null;
    const head=/^function\s+([a-z_]\w*)\s*\(([^()]*)\)$/i.exec(lines[0]);if(!head)return null;
    const params=head[2].trim()?head[2].split(',').map(x=>x.trim().toLowerCase()):[];
    if(params.length<1||params.length>3||params.some(p=>!/^[_a-z]\w*$/i.test(p))||new Set(params).size!==params.length)return null;
    const end=lines.findIndex((line,i)=>i>0&&/^endfunction$/i.test(line));
    if(end<4)return null;
    const original=lines.slice(1,end);
    if(!original.some(line=>/^return\s+.+$/i.test(line))||original.some(line=>/^print\s*\(/i.test(line)))return null;
    const converted=original.map(line=>line.replace(/^return\s+(.+)$/i,'print($1)'));
    const body=strings.parseProgram(converted.join('\n'));if(!body)return null;
    function markReturns(nodes){for(const node of nodes){if(node.type==='print')node.type='return';if(node.body)markReturns(node.body);if(node.branches)node.branches.forEach(b=>markReturns(b.body));if(node.alternative)markReturns(node.alternative);}}
    markReturns(body);
    if(!hasNode(body,'return'))return null;
    const outside=lines.slice(end+1);
    let call,variable=null;
    if(outside.length===1)call=/^print\s*\(\s*([a-z_]\w*)\s*\(([^()]*)\)\s*\)$/i.exec(outside[0]);
    else if(outside.length===2){
      const assign=/^([a-z_]\w*)\s*=\s*([a-z_]\w*)\s*\(([^()]*)\)$/i.exec(outside[0]);
      const print=/^print\s*\(\s*([a-z_]\w*)\s*\)$/i.exec(outside[1]);
      if(assign&&print&&assign[1].toLowerCase()===print[1].toLowerCase()){
        variable=assign[1].toLowerCase();call=[null,assign[2],assign[3]];
      }
    }
    if(!call||call[1].toLowerCase()!==head[1].toLowerCase())return null;
    const args=call[2].trim()?call[2].split(',').map(x=>x.trim()):[];
    if(args.length!==params.length||args.some(x=>!x))return null;
    return {name:head[1],params,body,callArgs:args,storedIn:variable};
  }
  function runFunction(ast,args){
    if(!ast||!Array.isArray(args)||ast.params.length!==args.length)return null;
    const env=Object.create(null);ast.params.forEach((p,i)=>env[p]=args[i]);
    let operations=0,iterations=0;
    const evaluate=raw=>{const value=strings.readExpression(raw,env);if(!value)throw Error('Invalid expression');return value.value;};
    function execute(nodes){
      for(const node of nodes){
        if(++operations>1600)throw Error('Operation limit');
        if(node.type==='assign'){env[node.name]=evaluate(node.expr);continue;}
        if(node.type==='return')return {returned:true,value:evaluate(node.expr)};
        if(node.type==='if'){
          let chosen=node.alternative;
          for(const branch of node.branches){const pass=evaluate(branch.test);if(typeof pass!=='boolean')throw Error('IF must be Boolean');if(pass){chosen=branch.body;break;}}
          const outcome=execute(chosen);if(outcome.returned)return outcome;continue;
        }
        if(node.type==='for'){
          const from=evaluate(node.from),to=evaluate(node.to),step=node.step;
          if(!Number.isInteger(from)||!Number.isInteger(to)||!Number.isInteger(step)||step===0||Math.abs(step)>20)throw Error('Invalid FOR');
          for(let i=from;step>0?i<=to:i>=to;i+=step){if(++iterations>260)throw Error('Iteration limit');env[node.name]=i;const outcome=execute(node.body);if(outcome.returned)return outcome;}
          continue;
        }
        throw Error('Unexpected statement');
      }
      return {returned:false};
    }
    try{const out=execute(ast.body);return out.returned?{returned:true,value:out.value}:null;}catch{return null;}
  }
  function checkAnswer(q,response){
    const raw=String(response??'').trim();if(!raw)return {complete:false,correct:false};
    if(q.type==='choose')return {complete:true,correct:raw===q.expected};
    if(q.type==='trace')return {complete:true,correct:raw.replace(/^["']|["']$/g,'')===q.expected};
    if(q.type!=='program')return {complete:true,correct:false};
    const ast=parseFunction(raw);
    if(!ast||ast.name.toLowerCase()!==q.name.toLowerCase()||ast.params.length!==q.params.length||
      !hasNode(ast.body,'for')||!hasNode(ast.body,'if')||!hasNode(ast.body,'return'))return {complete:true,correct:false};
    const supplied=ast.callArgs.map(x=>strings.readExpression(x,Object.create(null)));
    if(supplied.some(x=>!x)||supplied.some((x,i)=>x.value!==q.args[i]))return {complete:true,correct:false};
    const testArgs=q.params.length===1?[[0],[1],[2],[3],[4],[5],[7],[8],[9],[12],[15],[20]]:
      [q.args,[0,2],[1,3],[2,5],[4,2],[5,4],[7,3],[8,5],[9,2],[10,7],[12,40],[15,10],[20,4]];
    const correct=testArgs.every(args=>{const out=runFunction(ast,args);return out&&out.returned&&out.value===q.expectedFor(args);});
    return {complete:true,correct:!!correct};
  }
  function makeDemo(q){
    if(q.level==='easy')return {title:'Functions',task:'Similar example: a function returns a value which the caller prints.',codeLabel:'Sub programs · function and return',traceTitle:'Follow the returned value',columns:['Action','Value'],entryLine:4,
      lines:['function double(number)','    return number * 2','endfunction','print(double(4))'],
      steps:[[4,'START HERE','double(4)','PRINT calls the function with argument 4.'],[1,'Jump to function','number = 4','The argument 4 fills the parameter number.'],[2,'RETURN','8','The function calculates 4 × 2 and returns 8; RETURN itself does not print.'],[4,'Back to PRINT','8','The caller receives 8 and prints it.']],
      end:'Output: 8. The function returns a value; the calling code decides how to use it.',progressive:true,showAllCode:true};
    if(q.level==='medium')return {title:'Functions',task:'Similar example: a function counts matching numbers and returns the total.',codeLabel:'Sub programs · call + FOR + IF + RETURN',traceTitle:'Trace the return',columns:['Action / i','Value'],entryLine:10,
      lines:['function countOverTwo(limit)','    count = 0','    for i = 1 to limit','        if i > 2 then','            count = count + 1','        endif','    next i','    return count','endfunction','print(countOverTwo(4))'],
      steps:[[10,'START HERE','countOverTwo(4)','The function call begins here.'],[1,'Jump to function','limit = 4','The caller passes 4 into limit.'],[2,'count','0','Start at zero.'],[3,'i = 1','—','The FOR loop begins.'],[4,'1 > 2','False','Do not increase count.'],[4,'2 > 2','False','Do not increase count.'],[4,'3 > 2','True','Run the IF body.'],[5,'count','1','Increase count.'],[4,'4 > 2','True','Run the IF body again.'],[5,'count','2','Increase count again.'],[8,'RETURN','2','Send the count back to the caller.'],[10,'Back to PRINT','2','PRINT displays the returned value.']],
      end:'Output: 2. RETURN sends the count to the caller, which prints it.',progressive:true,showAllCode:true};
    return {title:'Functions',task:'Similar full-program example: sum numbers greater than 2 and return the total.',codeLabel:'Sub programs · call + iteration + selection + return',traceTitle:'Follow the result',columns:['Step / i','Value'],entryLine:10,
      lines:['function sumOverTwo(limit)','    total = 0','    for i = 1 to limit','        if i > 2 then','            total = total + i','        endif','    next i','    return total','endfunction','result = sumOverTwo(4)','print(result)'],
      steps:[[10,'START HERE','sumOverTwo(4)','Execution enters the function from this call.'],[1,'Jump to function','limit = 4','The argument becomes parameter limit.'],[2,'total','0','Start the running total.'],[3,'i = 1','—','Begin the FOR loop.'],[4,'1 > 2','False','Skip addition.'],[4,'2 > 2','False','Skip addition.'],[4,'3 > 2','True','Add this number.'],[5,'total','3','Total is now 3.'],[4,'4 > 2','True','Add again.'],[5,'total','7','Total is now 7.'],[8,'RETURN','7','The function returns 7, without printing it.'],[10,'Back to caller','result = 7','Store the returned value in result.'],[11,'PRINT','7','The calling code prints result.']],
      end:'Output: 7. RETURN is different from PRINT: the caller can store or use the value.',progressive:true,showAllCode:true};
  }
  return {makeQuestion,checkAnswer,parseFunction,runFunction,makeDemo,hardCases:cases};
});
