/* OCR J277/02 Skill 18: random integers, inclusive bounds, and cumulative
   practice with IF, FOR and subprograms. No learner code is evaluated as JS. */
(function(root,factory){
  const api=factory(typeof module==='object'&&module.exports?require('./strings.js'):root.J277Paper2Strings);
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.J277Paper2Random=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(strings){
  'use strict';
  if(!strings)throw Error('The shared OCR ERL expression reader is required.');
  const easy=[
    {code:['roll = random(1,6)'],prompt:'Which value could roll contain?',options:['6','0','7','-1'],answer:'6',why:'Both boundaries are included: 1, 2, 3, 4, 5 or 6.'},
    {code:['number = random(4,9)'],prompt:'What is the smallest possible number?',options:['4','3','5','9'],answer:'4',why:'The first argument sets the inclusive lower limit.'},
    {code:['number = random(4,9)'],prompt:'What is the largest possible number?',options:['9','8','10','4'],answer:'9',why:'The second argument sets the inclusive upper limit.'},
    {code:['number = random(10,15)'],prompt:'Which result is impossible?',options:['16','10','12','15'],answer:'16',why:'16 is larger than the upper limit, 15.'},
    {code:['number = random(3,3)'],prompt:'What value will always be chosen?',options:['3','0','6','Any integer'],answer:'3',why:'With equal limits there is only one possible outcome.'},
    {code:['number = random(-2,2)'],prompt:'Which negative number is possible?',options:['-2','-3','-5','-10'],answer:'-2',why:'Negative integers are allowed; -2 is the inclusive lower bound.'},
    {code:['score = random(1,6)','print(score)'],prompt:'What can you definitely predict?',options:['A value from 1 to 6','It prints 6','It prints 1','It always prints 3'],answer:'A value from 1 to 6',why:'Random selects one of the possible values. Its exact result is not known beforehand.'},
    {code:['// Choose an integer between 5 and 10'],prompt:'Which OCR ERL statement is correct?',options:['n = random(5,10)','n = random(10,5)','n = random(0,10)','n = random(5,9)'],answer:'n = random(5,10)',why:'Write random(lower,upper) and include both endpoints.'},
    {code:['fraction = random(0.0,1.0)'],prompt:'What type of number can this produce?',options:['A real number','Only whole numbers','Only negative numbers','Only 0 or 1'],answer:'A real number',why:'Decimal limits allow random real numbers, including fractions.'},
    {code:['number = random(2,7)'],prompt:'How many different integers are possible?',options:['6','5','7','8'],answer:'6',why:'2, 3, 4, 5, 6 and 7 are all included.'}
  ];
  const medium=[
    {draws:[2,6,3,6,1],sides:6,test:'roll == 6',change:'count = count + 1',label:'count',start:0,goal:'Count the sixes'},
    {draws:[1,4,5,2,6],sides:6,test:'roll MOD 2 == 0',change:'count = count + 1',label:'count',start:0,goal:'Count even rolls'},
    {draws:[3,6,5,1,4],sides:6,test:'roll > 3',change:'total = total + roll',label:'total',start:0,goal:'Add rolls above 3'},
    {draws:[2,1,7,2,5,1],sides:8,test:'roll <= 2',change:'count = count + 1',label:'count',start:0,goal:'Count values of 1 or 2'},
    {draws:[4,1,6,3,2],sides:6,test:'roll > highest',change:'highest = roll',label:'highest',start:0,goal:'Find the highest roll'},
    {draws:[9,3,8,2,7],sides:10,test:'roll >= 7',change:'count = count + 1',label:'count',start:0,goal:'Count high scores'},
    {draws:[1,5,2,5],sides:5,test:'roll == 5',change:'count = count + 1',label:'count',start:0,goal:'Count fives',sub:'function'},
    {draws:[2,3,4,5,6],sides:6,test:'roll MOD 2 != 0',change:'total = total + roll',label:'total',start:0,goal:'Add odd rolls',sub:'procedure'},
    {draws:[4,1,4,3,4,2],sides:4,test:'roll == 4',change:'count = count + 1',label:'count',start:0,goal:'Count fours',sub:'function'},
    {draws:[3,8,1,9,2],sides:10,test:'roll < 5',change:'count = count + 1',label:'count',start:0,goal:'Count rolls below 5',sub:'procedure'}
  ];
  const hard=[
    {kind:'function',name:'countMaximum',goal:'count how many rolls equal the highest possible value',test:'roll == sides',change:'count = count + 1',result:'count'},
    {kind:'procedure',name:'printEvenCount',goal:'print how many rolls are even',test:'roll MOD 2 == 0',change:'count = count + 1',result:'count'},
    {kind:'function',name:'sumHighRolls',goal:'return the sum of rolls greater than half of sides',test:'roll > sides DIV 2',change:'count = count + roll',result:'count'},
    {kind:'procedure',name:'printLowCount',goal:'print how many rolls are 1 or 2',test:'roll <= 2',change:'count = count + 1',result:'count'},
    {kind:'function',name:'highestRoll',goal:'return the highest roll (or 0 when there are no rolls)',test:'roll > count',change:'count = roll',result:'count'},
    {kind:'procedure',name:'printEvenTotal',goal:'print the sum of all even rolls',test:'roll MOD 2 == 0',change:'count = count + roll',result:'count'},
    {kind:'function',name:'countOnes',goal:'return how many rolls equal 1',test:'roll == 1',change:'count = count + 1',result:'count'},
    {kind:'procedure',name:'printOddCount',goal:'print how many rolls are odd',test:'roll MOD 2 != 0',change:'count = count + 1',result:'count'},
    {kind:'function',name:'sumLowRolls',goal:'return the sum of rolls at most half of sides',test:'roll <= sides DIV 2',change:'count = count + roll',result:'count'},
    {kind:'procedure',name:'printNearMax',goal:'print how many rolls are at least sides - 1',test:'roll >= sides - 1',change:'count = count + 1',result:'count'}
  ];
  const fractions=[
    [0,0.999999,0.24,0.51,0.78,0.12,0.89,0.36,0.66,0.97,0.02,0.44],
    [0.999999,0,0.83,0.17,0.45,0.99,0.04,0.61,0.28,0.75,0.92,0.08],
    [0.38,0.38,0.38,0.38,0.38,0.38,0.38,0.38,0.38,0.38,0.38,0.38],
    [0.01,0.99,0.01,0.99,0.01,0.99,0.01,0.99,0.01,0.99,0.01,0.99]
  ];
  const tests=[[10,6],[0,6],[1,6],[2,3],[5,4],[7,9],[12,6],[9,2],[3,10],[15,5]];
  const call=(name,args)=>name+'('+args.join(', ')+')';
  function modelLines(c,args){
    const lines=[
      c.kind+' '+call(c.name,['rolls','sides']),
      '    count = 0',
      '    for i = 1 to rolls',
      '        roll = random(1,sides)',
      '        if '+c.test+' then',
      '            '+c.change,
      '        endif',
      '    next i',
      '    '+(c.kind==='function'?'return ':'print(')+c.result+(c.kind==='function'?'':')'),
      'end'+c.kind
    ];
    lines.push(c.kind==='function'?'print('+call(c.name,args)+')':call(c.name,args));
    return lines;
  }
  function sampleRolls(rolls,sides,series){
    return Array.from({length:rolls},(_,i)=>1+Math.floor(series[i%series.length]*sides));
  }
  function expected(c,args,series){
    let count=0;
    for(const roll of sampleRolls(args[0],args[1],series)){
      const env={roll,sides:args[1],count};
      const check=strings.readExpression(c.test,env);
      if(!check||typeof check.value!=='boolean')throw Error('Invalid model test');
      if(check.value){
        const assign=c.change.split('=');
        const updated=strings.readExpression(assign.slice(1).join('='),env);
        if(!updated)throw Error('Invalid model calculation');
        count=updated.value;
      }
    }
    return count;
  }
  function makeQuestion(level,index,seed){
    if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0||index>=10)throw Error('Invalid Random Numbers question');
    if(level==='easy'){
      const q=easy[index];return {...q,level,index,type:'choose',expected:q.answer,model:q.answer,
        context:'OCR ERL: random(lower,upper) includes both limits.',
        hint:'List the integers from the first argument to the second, including both.',explanation:q.why};
    }
    if(level==='medium'){
      const c=medium[index],n=c.draws.length;
      let lines=[''+c.label+' = '+c.start,'for i = 1 to '+n,'    roll = random(1,'+c.sides+')',
        '    if '+c.test+' then','        '+c.change,'    endif','next i','print('+c.label+')'];
      if(c.sub){
        const inner=lines.slice(0,-1).map(line=>'    '+line);
        lines=[c.sub+' evaluate(rolls)',...inner.map(line=>line.replace('for i = 1 to '+n,'for i = 1 to rolls')),
          '    '+(c.sub==='function'?'return '+c.label:'print('+c.label+')'),'end'+c.sub,
          c.sub==='function'?'print(evaluate('+n+'))':'evaluate('+n+')'];
      }
      let answer=c.start;
      for(const roll of c.draws){
        const env={roll,count:answer,total:answer,highest:answer};
        if(strings.readExpression(c.test,env).value)answer=strings.readExpression(c.change.split('=').slice(1).join('='),env).value;
      }
      return {level,index,type:'trace',code:lines,expected:String(answer),model:String(answer),
        prompt:'What number will this program print?',context:'For this trace, random returns '+c.draws.join(', ')+' in that order.',
        hint:'Start at the '+(c.sub?'subprogram call':'first assignment')+'. Test each of the given random values against IF.',
        explanation:c.goal+': the given rolls produce '+answer+'. These values are supplied for tracing, not predicted.'};
    }
    const c=hard[index],args=[index%3===0?10:index%3===1?7:8,index%4===0?6:index%4===1?8:index%4===2?5:10],
      series=fractions[0],rolls=sampleRolls(args[0],args[1],series),value=expected(c,args,series);
    return {level,index,type:'program',...c,params:['rolls','sides'],args,code:[c.kind==='function'?'print('+call(c.name,args)+')':call(c.name,args)],
      example:'Test rolls: '+rolls.join(', ')+' → output '+value,expected:String(value),
      prompt:'Write '+c.kind+' '+call(c.name,['rolls','sides'])+' to '+c.goal+'.',
      context:'Use random(1,sides) inside a FOR loop, test each roll with IF, then '+(c.kind==='function'?'RETURN':'PRINT')+' the result. Include the call shown below.',
      model:modelLines(c,args).join('\n'),
      hint:'Start with '+c.kind+' '+call(c.name,['rolls','sides'])+'. Set a running value to 0; FOR i = 1 TO rolls; roll = random(1,sides); use IF. End with '+(c.kind==='function'?'RETURN':'PRINT')+' and the call.',
      explanation:'Your '+c.kind+' passed several unseen roll sequences, including minimum and maximum values.'};
  }
  const hasNode=(nodes,type)=>nodes.some(n=>n.type===type||n.body&&hasNode(n.body,type)||n.branches&&n.branches.some(b=>hasNode(b.body,type))||n.alternative&&hasNode(n.alternative,type));
  const hasRandomInLoop=nodes=>nodes.some(n=>n.type==='for'&&JSON.stringify(n.body).toLowerCase().includes('random(')||
    n.body&&hasRandomInLoop(n.body)||n.branches&&n.branches.some(b=>hasRandomInLoop(b.body))||n.alternative&&hasRandomInLoop(n.alternative));
  function parseSubprogram(source){
    const lines=String(source??'').replace(/\r/g,'').split('\n').map(l=>l.trim()).filter(Boolean);
    if(lines.length<9||lines.length>55)return null;
    const head=/^(function|procedure)\s+([a-z_]\w*)\s*\(([^()]*)\)$/i.exec(lines[0]);if(!head)return null;
    const kind=head[1].toLowerCase(),name=head[2].toLowerCase();
    const params=head[3].split(',').map(x=>x.trim().toLowerCase());
    if(params.length!==2||params.some(p=>!/^[_a-z]\w*$/i.test(p))||new Set(params).size!==2)return null;
    const end=lines.findIndex((l,i)=>i>0&&l.toLowerCase()==='end'+kind);
    if(end<6||end>lines.length-2)return null;
    const bodyLines=lines.slice(1,end);
    if(kind==='function'&&(!bodyLines.some(l=>/^return\s+.+$/i.test(l))||bodyLines.some(l=>/^print\s*\(/i.test(l))))return null;
    if(kind==='procedure'&&(bodyLines.some(l=>/^return\b/i.test(l))||!bodyLines.some(l=>/^print\s*\(/i.test(l))))return null;
    const parseLines=kind==='function'?bodyLines.map(l=>l.replace(/^return\s+(.+)$/i,'print($1)')):bodyLines;
    const body=strings.parseProgram(parseLines.join('\n'));if(!body)return null;
    if(kind==='function'){
      const toReturn=nodes=>{for(const n of nodes){if(n.type==='print')n.type='return';if(n.body)toReturn(n.body);if(n.branches)n.branches.forEach(b=>toReturn(b.body));if(n.alternative)toReturn(n.alternative);}};
      toReturn(body);
    }
    const rest=lines.slice(end+1);if(rest.length!==1)return null;
    const pattern=kind==='function'?/^print\s*\(\s*([a-z_]\w*)\s*\(([^()]*)\)\s*\)$/i:/^([a-z_]\w*)\s*\(([^()]*)\)$/i;
    const outer=pattern.exec(rest[0]);if(!outer||outer[1].toLowerCase()!==name)return null;
    const args=outer[2].split(',').map(x=>x.trim());
    if(args.length!==2||args.some(x=>!x))return null;
    return {kind,name,params,body,callArgs:args};
  }
  function runSubprogram(ast,args,series){
    if(!ast||!Array.isArray(args)||args.length!==2)return null;
    const env=Object.create(null);ast.params.forEach((p,i)=>env[p]=args[i]);
    let operations=0,iterations=0,drawIndex=0;
    function evaluate(raw){
      let text=String(raw),failed=false;
      // Only literal, parameter or arithmetic bounds are accepted; no JS execution.
      text=text.replace(/\brandom\s*\(\s*([^(),]+)\s*,\s*([^(),]+)\s*\)/gi,(_,left,right)=>{
        const a=strings.readExpression(left,env),b=strings.readExpression(right,env);
        if(!a||!b||!Number.isInteger(a.value)||!Number.isInteger(b.value)||
          a.value>b.value||a.value < -100||b.value>100){failed=true;return '0';}
        const sample=series[drawIndex++%series.length];
        return String(a.value+Math.floor(sample*(b.value-a.value+1)));
      });
      if(failed||/\brandom\s*\(/i.test(text))throw Error('Unrecognised random call');
      const out=strings.readExpression(text,env);if(!out)throw Error('Invalid expression');return out.value;
    }
    function execute(nodes){
      for(const n of nodes){
        if(++operations>1300)throw Error('Execution limit');
        if(n.type==='assign'){env[n.name]=evaluate(n.expr);continue;}
        if(n.type==='print'){outputs.push(String(evaluate(n.expr)));continue;}
        if(n.type==='return')return {returned:true,value:evaluate(n.expr)};
        if(n.type==='if'){
          let selected=n.alternative;
          for(const branch of n.branches){
            const pass=evaluate(branch.test);if(typeof pass!=='boolean')throw Error('Non Boolean condition');
            if(pass){selected=branch.body;break;}
          }
          const result=execute(selected);if(result.returned)return result;
          continue;
        }
        if(n.type==='for'){
          const from=evaluate(n.from),to=evaluate(n.to),step=n.step;
          if(!Number.isInteger(from)||!Number.isInteger(to)||step!==1)throw Error('FOR limits');
          for(let i=from;i<=to;i++){
            if(++iterations>120)throw Error('Iteration limit');
            env[n.name]=i;const result=execute(n.body);if(result.returned)return result;
          }
          continue;
        }
        throw Error('Unsupported statement');
      }
      return {returned:false};
    }
    const outputs=[];
    try{
      const result=execute(ast.body);
      if(ast.kind==='function')return result.returned?String(result.value):null;
      return outputs.length===1?outputs[0]:null;
    }catch{return null;}
  }
  function checkAnswer(q,response){
    const raw=String(response??'').trim();if(!raw)return {complete:false,correct:false};
    if(q.type==='choose'||q.type==='trace')return {complete:true,correct:raw===q.expected};
    const ast=parseSubprogram(raw);
    if(!ast||ast.name!==q.name.toLowerCase()||ast.kind!==q.kind||
      !hasNode(ast.body,'for')||!hasNode(ast.body,'if')||
      !hasNode(ast.body,ast.kind==='function'?'return':'print')||
      !hasRandomInLoop(ast.body))return {complete:true,correct:false};
    const callArgs=ast.callArgs.map(s=>strings.readExpression(s,Object.create(null)));
    if(callArgs.some(x=>!x)||callArgs.some((x,i)=>x.value!==q.args[i]))return {complete:true,correct:false};
    const correct=tests.every(args=>fractions.every(series=>
      runSubprogram(ast,args,series)===String(expected(q,args,series))));
    return {complete:true,correct};
  }
  function makeDemo(q){
    if(q.level==='easy')return {title:'Random Numbers',task:'Similar example: select a random integer and read its inclusive limits.',
      codeLabel:'OCR ERL · inclusive range',traceTitle:'Possible values',columns:['Step','Value'],entryLine:1,
      lines:['number = random(2,5)','print(number)'],
      steps:[[1,'START HERE','2 to 5','The random call can choose 2, 3, 4 or 5. Both endpoints count.'],
        [1,'Example draw','4','For this worked example, suppose random selects 4.'],
        [2,'PRINT','4','PRINT displays the value stored in number.']],
      end:'The actual number can change each run, but it can never be below 2 or above 5.',progressive:true,showAllCode:true};
    if(q.level==='medium')return {title:'Random Numbers',task:'Similar example: use FOR and IF to count sixes. The test rolls are provided.',
      codeLabel:'Random + iteration + selection',traceTitle:'Count matching rolls',columns:['Action','Value'],entryLine:1,
      lines:['count = 0','for i = 1 to 4','    roll = random(1,6)','    if roll == 6 then','        count = count + 1','    endif','next i','print(count)'],
      steps:[[1,'START HERE','count = 0','Prepare the counter.'],[2,'FOR','4 rolls','The loop repeats exactly four times.'],
        [3,'Roll 1','2','The first supplied random result is 2.'],[4,'IF','False','2 is not 6; keep count at 0.'],
        [3,'Roll 2','6','The next supplied result is 6.'],[4,'IF','True','6 matches the condition.'],
        [5,'Count','1','Increase the counter by one.'],[3,'Roll 3','5','This roll is not 6.'],
        [3,'Roll 4','6','The fourth roll is 6.'],[5,'Count','2','Increase the counter again.'],
        [8,'PRINT','2','Two of the four rolls were sixes.']],
      end:'Given the rolls 2, 6, 5, 6, the program prints 2.',progressive:true,showAllCode:true};
    return {title:'Random Numbers',task:'Similar full program: call a function that counts how many rolls are even.',
      codeLabel:'Subprogram + random + FOR + IF + RETURN',traceTitle:'Trace the function',columns:['Action','Value'],entryLine:11,
      lines:['function countEvens(rolls,sides)','    count = 0','    for i = 1 to rolls','        roll = random(1,sides)','        if roll MOD 2 == 0 then','            count = count + 1','        endif','    next i','    return count','endfunction','print(countEvens(4,6))'],
      steps:[[11,'START HERE','countEvens(4,6)','Execution begins at the function call, not at its definition.'],
        [1,'Jump to function','rolls=4, sides=6','Arguments 4 and 6 fill the two parameters.'],
        [2,'Counter','0','Start at zero.'],[3,'FOR','4 repeats','The loop generates four rolls.'],
        [4,'Roll 1','2','Assume the first random result is 2.'],[5,'IF','True','2 MOD 2 equals 0.'],
        [6,'Counter','1','Increase the counter.'],[4,'Roll 2','5','5 is odd: no increase.'],
        [4,'Roll 3','6','6 is even: increase count to 2.'],[4,'Roll 4','3','3 is odd: keep count at 2.'],
        [9,'RETURN','2','The function sends 2 back to its caller.'],
        [11,'Back to PRINT','2','PRINT displays the returned result.']],
      end:'Example output: 2 from rolls 2, 5, 6, 3. Different rolls can produce a different count.',progressive:true,showAllCode:true};
  }
  return {makeQuestion,checkAnswer,makeDemo,parseSubprogram,runSubprogram,hardCases:hard,expected,sampleRolls,fractions};
});
