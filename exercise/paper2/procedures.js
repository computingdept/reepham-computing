/* OCR J277/02 · Procedures. Behavioural checking runs a bounded ERL subset;
   student code is parsed as data and never executed as JavaScript. */
(function(root,factory){
  const api=factory(typeof module==='object'&&module.exports?require('./strings.js'):root.J277Paper2Strings);
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.J277Paper2Procedures=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(strings){
  'use strict';
  if(!strings)throw Error('String expression reader is required');
  const easyCases=[
    {prompt:'What will the procedure print?',code:['procedure greet(name)','    print("Hello " + name)','endprocedure','greet("Asha")'],options:['Hello Asha','Hello name','Asha Hello','Nothing'],expected:'Hello Asha',why:'The argument "Asha" is passed into the parameter name.'},
    {prompt:'What will this procedure print?',code:['procedure addTwo(number)','    print(number + 2)','endprocedure','addTwo(6)'],options:['8','6','2','12'],expected:'8',why:'number receives 6, so 6 + 2 = 8.'},
    {prompt:'Which is the parameter?',code:['procedure showDouble(value)','    print(value * 2)','endprocedure','showDouble(4)'],options:['value','4','showDouble','print'],expected:'value',why:'A parameter is the named variable in the procedure heading.'},
    {prompt:'Which value is the argument?',code:['procedure printAge(age)','    print(age)','endprocedure','printAge(14)'],options:['14','age','printAge','print'],expected:'14',why:'14 is the value supplied when the procedure is called.'},
    {prompt:'What will the procedure print?',code:['procedure fullName(first, last)','    print(first + " " + last)','endprocedure','fullName("Ben", "Lee")'],options:['Ben Lee','first last','Lee Ben','BenLee'],expected:'Ben Lee',why:'Both arguments are passed into the matching parameters in order.'},
    {prompt:'Which line calls the procedure?',code:['procedure showScore(score)','    print(score)','endprocedure','showScore(7)'],options:['showScore(7)','procedure showScore(score)','print(score)','endprocedure'],expected:'showScore(7)',why:'A call uses the procedure name with arguments, without the keyword procedure.'},
    {prompt:'What will the procedure print?',code:['procedure describe(age)','    if age >= 18 then','        print("Adult")','    else','        print("Young")','    endif','endprocedure','describe(16)'],options:['Young','Adult','16','Nothing'],expected:'Young',why:'16 is below 18, so ELSE prints Young.'},
    {prompt:'What will these two calls print?',code:['procedure show(number)','    print(number)','endprocedure','show(3)','show(5)'],options:['3 then 5','5 then 3','8','3 then 3'],expected:'3 then 5',why:'Each call runs the procedure again with its own argument.'},
    {prompt:'How many parameters are declared?',code:['procedure displaySum(first, second)','    print(first + second)','endprocedure','displaySum(4, 6)'],options:['2','1','3','0'],expected:'2',why:'first and second are both parameters.'},
    {prompt:'What is the purpose of this procedure?',code:['procedure showMessage()','    print("Ready")','endprocedure','showMessage()'],options:['Print a message','Return a number','Store a file','Sort an array'],expected:'Print a message',why:'A procedure performs a task; this one displays text and returns no value.'}
  ];
  const cases=[
    {name:'showEvens',params:['limit'],sample:[8],hint:'Use i MOD 2 == 0.',task:'Print every even number from 1 to limit, one per line.',
      body:['for i = 1 to limit','    if i MOD 2 == 0 then','        print(i)','    endif','next i'],expected:([limit])=>range(limit).filter(i=>i%2===0).map(String)},
    {name:'showOdds',params:['limit'],sample:[7],hint:'Use i MOD 2 != 0.',task:'Print every odd number from 1 to limit, one per line.',
      body:['for i = 1 to limit','    if i MOD 2 != 0 then','        print(i)','    endif','next i'],expected:([limit])=>range(limit).filter(i=>i%2!==0).map(String)},
    {name:'showMultiples',params:['limit'],sample:[10],hint:'Use i MOD 3 == 0.',task:'Print multiples of 3 from 1 to limit, one per line.',
      body:['for i = 1 to limit','    if i MOD 3 == 0 then','        print(i)','    endif','next i'],expected:([limit])=>range(limit).filter(i=>i%3===0).map(String)},
    {name:'showSize',params:['limit'],sample:[5],hint:'Use IF i >= 4 THEN ... ELSE ... ENDIF inside a loop.',task:'For numbers 1 to limit, print "Big" when the number is at least 4; otherwise print "Small".',
      body:['for i = 1 to limit','    if i >= 4 then','        print("Big")','    else','        print("Small")','    endif','next i'],expected:([limit])=>range(limit).map(i=>i>=4?'Big':'Small')},
    {name:'oddCountdown',params:['limit'],sample:[7],hint:'Count down with STEP -1, then test MOD 2.',task:'Count backwards from limit to 1, printing only odd numbers.',
      body:['for i = limit to 1 step -1','    if i MOD 2 == 1 then','        print(i)','    endif','next i'],expected:([limit])=>range(limit).filter(i=>i%2).reverse().map(String)},
    {name:'showResults',params:['limit','passMark'],sample:[6,40],hint:'Calculate i * 10 and compare with passMark inside IF.',task:'For scores 10, 20, ... up to limit × 10, print "Pass" when a score meets passMark; otherwise print "Retry".',
      body:['for i = 1 to limit','    if i * 10 >= passMark then','        print("Pass")','    else','        print("Retry")','    endif','next i'],expected:([limit,mark])=>range(limit).map(i=>i*10>=mark?'Pass':'Retry')},
    {name:'countOdds',params:['limit'],sample:[9],hint:'Start count at 0, add 1 inside IF, and PRINT once after NEXT.',task:'Count odd numbers from 1 to limit and print the final total once.',
      body:['count = 0','for i = 1 to limit','    if i MOD 2 != 0 then','        count = count + 1','    endif','next i','print(count)'],expected:([limit])=>[String(range(limit).filter(i=>i%2).length)]},
    {name:'sumEvens',params:['limit'],sample:[8],hint:'Start total at 0. Add i whenever i MOD 2 == 0.',task:'Add all even numbers from 1 to limit and print their sum once.',
      body:['total = 0','for i = 1 to limit','    if i MOD 2 == 0 then','        total = total + i','    endif','next i','print(total)'],expected:([limit])=>[String(range(limit).filter(i=>i%2===0).reduce((a,b)=>a+b,0))]},
    {name:'fizzThrees',params:['limit'],sample:[7],hint:'Use i MOD 3 == 0. PRINT "Fizz" in IF, otherwise PRINT i.',task:'From 1 to limit, print "Fizz" instead of each multiple of 3; print the number otherwise.',
      body:['for i = 1 to limit','    if i MOD 3 == 0 then','        print("Fizz")','    else','        print(i)','    endif','next i'],expected:([limit])=>range(limit).map(i=>i%3===0?'Fizz':String(i))},
    {name:'smallSquares',params:['limit','maximum'],sample:[7,25],hint:'Test i * i <= maximum inside the FOR loop.',task:'For numbers 1 to limit, print each square only if it is at most maximum.',
      body:['for i = 1 to limit','    if i * i <= maximum then','        print(i * i)','    endif','next i'],expected:([limit,max])=>range(limit).filter(i=>i*i<=max).map(i=>String(i*i))}
  ];
  function range(limit){return Array.from({length:Math.min(Math.max(Number(limit)||0,0),100)},(_,i)=>i+1);}
  function model(c,args){return ['procedure '+c.name+'('+c.params.join(', ')+')',...c.body.map(s=>'    '+s),'endprocedure',c.name+'('+args.join(', ')+')'];}
  function makeQuestion(level,index,seed){
    if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0||index>=10)throw Error('Invalid Procedures question');
    if(level==='easy')return {...easyCases[index],level,index,type:'choose',context:'Read the procedure heading and follow the call.',hint:'Parameter = named placeholder in the heading. Argument = value supplied in a call.',model:easyCases[index].expected,explanation:easyCases[index].why};
    const c=cases[level==='medium'?(index+3)%10:index];
    const args=level==='medium'?c.sample.map((v,i)=>i===0?Math.max(1,v-2):v):c.sample;
    const code=model(c,args),expectedLines=c.expected(args);
    if(level==='medium')return {level,index,type:'trace',prompt:'What will this procedure print?',context:'Follow the call, trace the FOR loop and IF, then write each output on its own line.',code,expectedLines,model:expectedLines.join('\n')||'(no output)',
      hint:'The first argument fills the first parameter. Check the IF condition on every loop pass.',explanation:'The procedure runs with arguments '+args.join(', ')+'.'};
    return {level,index,type:'program',...c,args,code:[c.name+'('+args.join(', ')+')'],expectedLines,
      prompt:c.task,context:'Write the complete procedure '+c.name+'('+c.params.join(', ')+') and its call. Use a FOR loop and IF selection.',
      model:code.join('\n'),hint:'Start with procedure '+c.name+'('+c.params.join(', ')+'). '+c.hint+' Finish with endprocedure and call it.',
      explanation:'Your procedure passed several unseen argument values, not just the example.'};
  }
  function parseProcedure(source){
    const lines=String(source??'').replace(/\r/g,'').split('\n').map(s=>s.trim()).filter(Boolean);
    if(lines.length<5||lines.length>45)return null;
    const head=/^procedure\s+([A-Za-z_]\w*)\s*\(([^()]*)\)$/i.exec(lines[0]);
    if(!head)return null;
    const params=head[2].trim()?head[2].split(',').map(s=>s.trim().toLowerCase()):[];
    if(params.length>3||params.some(p=>!/^[_a-z]\w*$/i.test(p))||new Set(params).size!==params.length)return null;
    const end=lines.findIndex((s,i)=>i>0&&/^endprocedure$/i.test(s));
    if(end<3)return null;
    const body=strings.parseProgram(lines.slice(1,end).join('\n'));
    if(!body)return null;
    const calls=lines.slice(end+1);
    if(calls.length!==1)return null;
    const call=/^([A-Za-z_]\w*)\s*\(([^()]*)\)$/i.exec(calls[0]);
    if(!call||call[1].toLowerCase()!==head[1].toLowerCase())return null;
    const args=call[2].trim()?call[2].split(',').map(s=>s.trim()):[];
    if(args.length!==params.length||args.some(s=>!/^\d+$/.test(s)))return null;
    return {name:head[1],params,body,callArgs:args.map(Number)};
  }
  function hasType(nodes,type){return nodes.some(n=>n.type===type||n.body&&hasType(n.body,type)||n.branches&&n.branches.some(b=>hasType(b.body,type))||n.alternative&&hasType(n.alternative,type));}
  function runProcedure(ast,args){
    if(!ast||args.length!==ast.params.length)return null;
    const env=Object.create(null),output=[];let steps=0,loopCount=0;
    ast.params.forEach((p,i)=>{env[p]=args[i];});
    const val=expr=>{const v=strings.readExpression(expr,env);if(!v)throw Error('Invalid expression');return v.value;};
    function exec(nodes){for(const node of nodes){
      if(++steps>1200)throw Error('Step limit');
      if(node.type==='assign'){if(ast.params.includes(node.name))throw Error('Do not change the caller argument');env[node.name]=val(node.expr);}
      else if(node.type==='print'){if(output.length>=150)throw Error('Output limit');output.push(String(val(node.expr)));}
      else if(node.type==='for'){
        const a=val(node.from),b=val(node.to),s=node.step;
        if(!Number.isInteger(a)||!Number.isInteger(b)||!Number.isInteger(s)||s===0||Math.abs(s)>10)throw Error('Invalid FOR');
        for(let i=a;s>0?i<=b:i>=b;i+=s){if(++loopCount>160)throw Error('Loop limit');env[node.name]=i;exec(node.body);}
      }else if(node.type==='if'){
        let chosen=node.alternative;
        for(const branch of node.branches){const test=val(branch.test);if(typeof test!=='boolean')throw Error('Invalid IF');if(test){chosen=branch.body;break;}}
        exec(chosen);
      }else throw Error('Unsupported instruction');
    }}
    try{exec(ast.body);return output;}catch{return null;}
  }
  function checkAnswer(q,response){
    const raw=String(response??'').trim();if(!raw)return {complete:false,correct:false};
    if(q.type==='choose')return {complete:true,correct:raw===q.expected};
    if(q.type==='trace'){
      const input=raw.replace(/\r/g,'').split('\n').map(s=>s.trim()).filter(Boolean);
      return {complete:true,correct:input.length===q.expectedLines.length&&input.every((v,i)=>v===q.expectedLines[i])};
    }
    const ast=parseProcedure(raw);
    if(!ast||ast.name.toLowerCase()!==q.name.toLowerCase()||ast.params.length!==q.params.length||!hasType(ast.body,'for')||!hasType(ast.body,'if'))return {complete:true,correct:false};
    const tests=[q.args,[0,...q.args.slice(1)],[1,...q.args.slice(1)],[2,...q.args.slice(1)],[3,...q.args.slice(1)],
      [4,...q.args.slice(1)],[5,...q.args.slice(1)],[6,...q.args.slice(1)],[9,...q.args.slice(1)],[12,...q.args.slice(1)]];
    if(q.params.length===2)tests.push([8,15],[8,50],[5,32],[2,100],[10,5]);
    return {complete:true,correct:tests.every(args=>{
      const got=runProcedure(ast,args),want=q.expected(args);
      return got!==null&&got.length===want.length&&got.every((s,i)=>s===want[i]);
    })};
  }
  function makeDemo(q){
    if(q.level==='easy')return {title:'Procedures',task:'Similar example: a sub program is called with an argument and prints a message.',codeLabel:'Sub programs · parameters and arguments',traceTitle:'Follow the call',columns:['Action','Value'],entryLine:4,
      lines:['procedure welcome(person)','    print("Hi " + person)','endprocedure','welcome("Mia")'],
      steps:[[4,'START HERE','welcome("Mia")','The call starts the procedure. The argument is "Mia".'],[1,'Jump to header','person = "Mia"','Execution enters the sub program. The argument fills the parameter person.'],[2,'Output','Hi Mia','The PRINT statement uses the passed value.'],[3,'Return','—','The procedure ends, so control returns to the caller.']],end:'Output: Hi Mia. A procedure does not return a value.',progressive:true,showAllCode:true};
    if(q.level==='medium')return {title:'Procedures',task:'Similar example: call a sub program, pass a value, loop, then test an IF condition.',codeLabel:'Sub programs · parameter + FOR + IF',traceTitle:'Trace the argument',columns:['i / test','Output'],entryLine:8,
      lines:['procedure multiplesOfTwo(limit)','    for i = 1 to limit','        if i MOD 2 == 0 then','            print(i)','        endif','    next i','endprocedure','multiplesOfTwo(4)'],
      steps:[[8,'START HERE','multiplesOfTwo(4)','The call starts the sub program.'],[1,'Jump to header','limit = 4','The argument 4 fills the parameter limit.'],[2,'i = 1','—','Start the loop.'],[3,'1 MOD 2','1','Not even: skip PRINT.'],[3,'2 MOD 2','0','Even: IF is True.'],[4,'i = 2','2','Print 2.'],[3,'3 MOD 2','1','Not even.'],[3,'4 MOD 2','0','Even: IF is True.'],[4,'i = 4','4','Print 4.'],[7,'Return','—','The sub program finishes and returns to its caller.']],end:'Output: 2, then 4. Each loop pass tests the current value of i.',progressive:true,showAllCode:true};
    return {title:'Procedures',task:'Similar full-program example: call a sub program to print only numbers greater than 2.',codeLabel:'Sub programs · call + iteration + selection',traceTitle:'Trace the full procedure',columns:['Step / i','Output'],entryLine:8,
      lines:['procedure showOverTwo(limit)','    for i = 1 to limit','        if i > 2 then','            print(i)','        endif','    next i','endprocedure','showOverTwo(4)'],
      steps:[[8,'START HERE','showOverTwo(4)','The call starts this sub program; its definition above has not run its body.'],[1,'Jump to header','limit = 4','Control jumps to the procedure. The argument 4 fills the parameter limit.'],[2,'i = 1','—','Start at 1.'],[3,'1 > 2','False','Skip PRINT.'],[3,'2 > 2','False','Skip PRINT.'],[3,'3 > 2','True','The IF condition is True.'],[4,'i = 3','3','Print 3.'],[3,'4 > 2','True','The IF condition is True.'],[4,'i = 4','4','Print 4.'],[6,'NEXT','Stop','The loop ends after 4.'],[7,'Return','—','The sub program ends and control returns to the caller.']],
      end:'Expected output: 3, then 4. The procedure works for any positive limit.',progressive:true,showAllCode:true};
  }
  return {makeQuestion,checkAnswer,parseProcedure,runProcedure,makeDemo,hardCases:cases};
});
