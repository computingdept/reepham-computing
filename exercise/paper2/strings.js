/* OCR J277/02 · String Handling · 30 independently marked challenges.
   Hard programs are interpreted in a small bounded ERL subset; student code
   is never evaluated as JavaScript. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.J277Paper2Strings=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const LEVELS=['easy','medium','hard'];
  const VOWELS='AEIOU';
  const EASY=[
    ['COMPUTER',2],['NETWORK',4],['ALGORITHM',0],['DATABASE',5],['KEYBOARD',7],
    ['VARIABLE',3],['PYTHON',1],['BINARY',5],['BOOLEAN',6],['PROGRAM',4]
  ];
  const MEDIUM=[
    {word:'NETWORK',expected:'Long',code:['word = "NETWORK"','if word.length > 6 then','    print("Long")','else','    print("Short")','endif'],why:'NETWORK has 7 characters, so the IF condition is True.'},
    {word:'DATABASE',expected:'Starts D',code:['word = "DATABASE"','if word.left(1) == "D" then','    print("Starts D")','else','    print("Other")','endif'],why:'The first character is D, so the IF branch runs.'},
    {word:'COMPUTER',expected:'Match',code:['word = "COMPUTER"','if word.right(2) == "ER" then','    print("Match")','else','    print("No match")','endif'],why:'The last two letters are ER, so the condition is True.'},
    {word:'ALGORITHM',expected:'GO',code:['word = "ALGORITHM"','if word.substring(2,2) == "GO" then','    print("GO")','else','    print("Other")','endif'],why:'Starting at index 2 and taking 2 characters gives GO.'},
    {word:'school',expected:'Yes',code:['word = "school"','if word.upper == "SCHOOL" then','    print("Yes")','else','    print("No")','endif'],why:'.upper changes school to SCHOOL, so the IF branch runs.'},
    {word:'BINARY',expected:'Not upper',code:['word = "BINARY"','if word.lower == "BINARY" then','    print("Upper")','else','    print("Not upper")','endif'],why:'.lower gives binary, which is not equal to BINARY. The ELSE branch runs.'},
    {word:null,expected:'Asha Khan',code:['first = "Asha"','last = "Khan"','if first.length == 4 then','    print(first + " " + last)','else','    print(last)','endif'],why:'Asha has 4 characters, so the full name is joined with a space.'},
    {word:'NETWORK',expected:'NET!',code:['word = "NETWORK"','if word.substring(0,3) == "NET" then','    print(word.left(3) + "!")','else','    print("Wrong")','endif'],why:'The first three characters are NET, so NET! is printed.'},
    {word:'VARIABLE',expected:'Different',code:['word = "VARIABLE"','if word.left(2) == word.right(2) then','    print("Same")','else','    print("Different")','endif'],why:'VA and LE are different, so the ELSE branch runs.'},
    {word:'PYTHON',expected:'Medium',code:['word = "PYTHON"','if word.length < 5 then','    print("Short")','elseif word.length <= 7 then','    print("Medium")','else','    print("Long")','endif'],why:'PYTHON has 6 characters; the ELSEIF condition is True.'}
  ];

  const letter='word.substring(i,1)';
  const upper=letter+'.upper';
  const vowels=['A','E','I','O','U'].map(v=>upper+' == "'+v+'"').join(' OR ');
  const consonants=['A','E','I','O','U'].map(v=>upper+' != "'+v+'"').join(' AND ');
  const HARD=[
    {kind:'each',word:'NETWORK',task:'Print every character on a separate line.',needIf:false,
      model:['for i = 0 to word.length - 1','    print('+letter+')','next i']},
    {kind:'vowels',word:'BANANA',task:'Print only the vowels, one per line.',needIf:true,
      model:['for i = 0 to word.length - 1','    if '+vowels+' then','        print('+letter+')','    endif','next i']},
    {kind:'upper',word:'school',task:'Print every character in uppercase, one per line.',needIf:false,
      model:['for i = 0 to word.length - 1','    print('+letter+'.upper)','next i']},
    {kind:'everySecond',word:'COMPUTER',task:'Print characters at indexes 0, 2, 4, ... only.',needIf:true,
      model:['for i = 0 to word.length - 1','    if i MOD 2 == 0 then','        print('+letter+')','    endif','next i']},
    {kind:'countE',word:'GREENHOUSE',task:'Count how many times the letter E appears, then print the total.',needIf:true,
      model:['count = 0','for i = 0 to word.length - 1','    if '+upper+' == "E" then','        count = count + 1','    endif','next i','print(count)']},
    {kind:'reverse',word:'NETWORK',task:'Build and print the word backwards.',needIf:false,
      model:['backwards = ""','for i = 0 to word.length - 1','    backwards = '+letter+' + backwards','next i','print(backwards)']},
    {kind:'consonants',word:'ALGORITHM',task:'Build and print a new word containing only the consonants.',needIf:true,
      model:['result = ""','for i = 0 to word.length - 1','    if '+consonants+' then','        result = result + '+letter,'    endif','next i','print(result)']},
    {kind:'afterTwo',word:'PYTHON',task:'Print each character after the first two, one per line.',needIf:false,
      model:['for i = 2 to word.length - 1','    print('+letter+')','next i']},
    {kind:'dashed',word:'DATABASE',task:'Build and print the word with a hyphen between its characters (for example, C-A-T).',needIf:true,
      model:['result = ""','for i = 0 to word.length - 1','    result = result + '+letter,'    if i < word.length - 1 then','        result = result + "-"','    endif','next i','print(result)']},
    {kind:'countVowels',word:'EDUCATION',task:'Count all the vowels and print the total.',needIf:true,
      model:['count = 0','for i = 0 to word.length - 1','    if '+vowels+' then','        count = count + 1','    endif','next i','print(count)']}
  ];

  // A small expression reader for OCR ERL: strings, integers, string methods,
  // arithmetic, comparisons and Boolean AND/OR. No eval or Function calls.
  function readExpression(source,env){
    const raw=String(source??'').trim();
    if(!raw||raw.length>420)return null;
    const regex=/\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|(?:<=|>=|==|!=)|[A-Za-z_]\w*|\d+|[.+(),*\/\-<>])\s*/gy;
    const tokens=[];let pos=0;
    while(pos<raw.length){regex.lastIndex=pos;const m=regex.exec(raw);if(!m)return null;tokens.push(m[1]);pos=regex.lastIndex;if(tokens.length>220)return null;}
    let at=0,joined=false;
    const methods=new Set(),variables=new Set();
    const peek=()=>tokens[at],is=v=>String(peek()||'').toUpperCase()===v;
    const take=v=>is(v)?(at++,true):false;
    const requireToken=v=>{if(!take(v))throw Error('Expected '+v);};
    const asNumber=v=>{if(typeof v!=='number'||!Number.isFinite(v))throw Error('Number expected');return v;};
    const asIndex=v=>{const n=asNumber(v);if(!Number.isInteger(n)||n<0||n>1000)throw Error('Index');return n;};
    function primary(){
      let value,token=tokens[at++];
      if(token==='('){value=orExpr();requireToken(')');}
      else if(/^\d+$/.test(token||''))value=Number(token);
      else if(/^(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')$/s.test(token||'')){
        value=token.slice(1,-1).replace(/\\([\\"'])/g,'$1');
      } else if(token&&Object.prototype.hasOwnProperty.call(env,token.toLowerCase())){
        variables.add(token.toLowerCase());value=env[token.toLowerCase()];
      } else if(/^(?:true|false)$/i.test(token||''))value=token.toLowerCase()==='true';
      else throw Error('Unknown variable');
      while(take('.')){
        const method=String(tokens[at++]||'').toLowerCase();methods.add(method);
        if(method==='length'){value=String(value).length;continue;}
        if(method==='upper'){value=String(value).toUpperCase();continue;}
        if(method==='lower'){value=String(value).toLowerCase();continue;}
        if(!['left','right','substring'].includes(method))throw Error('Unsupported string operation');
        requireToken('(');const n=asIndex(orExpr());let count=n;
        if(method==='substring'){requireToken(',');count=asIndex(orExpr());}
        requireToken(')');const str=String(value);
        if(n>str.length||count>str.length||(method==='substring'&&n+count>str.length))throw Error('Out of bounds');
        value=method==='left'?str.slice(0,count):method==='right'?(count?str.slice(-count):''):str.slice(n,n+count);
      }
      return value;
    }
    function unary(){if(take('-'))return -asNumber(unary());return primary();}
    function multiplication(){
      let a=unary();while(['*','/','DIV','MOD'].includes(String(peek()||'').toUpperCase())){
        const op=String(tokens[at++]).toUpperCase(),b=asNumber(unary());a=asNumber(a);
        if(b===0&&op!=='*')throw Error('Divide by zero');
        a=op==='*'?a*b:op==='/'?a/b:op==='DIV'?Math.trunc(a/b):a%b;
      }return a;
    }
    function addition(){
      let a=multiplication();while(peek()==='+'||peek()==='-'){
        const op=tokens[at++],b=multiplication();
        if(op==='+'){joined=true;a=typeof a==='string'||typeof b==='string'?String(a)+String(b):asNumber(a)+asNumber(b);}
        else a=asNumber(a)-asNumber(b);
      }return a;
    }
    function comparison(){
      let a=addition();while(['==','!=','<','>','<=','>='].includes(peek())){
        const op=tokens[at++],b=addition();
        a=op==='=='?a===b:op==='!='?a!==b:op==='<'?a<b:op==='>'?a>b:op==='<='?a<=b:a>=b;
      }return a;
    }
    function andExpr(){let a=comparison();while(take('AND'))a=Boolean(a)&Boolean(comparison())?true:false;return a;}
    function orExpr(){let a=andExpr();while(take('OR'))a=Boolean(a)|Boolean(andExpr())?true:false;return a;}
    try{const value=orExpr();if(at!==tokens.length||typeof value==='number'&&!Number.isFinite(value))return null;
      return {value,methods,variables,joined};}
    catch{return null;}
  }

  function parseProgram(source){
    const lines=String(source??'').replace(/\r/g,'').split('\n').map(x=>x.trim()).filter(Boolean);
    if(lines.length<3||lines.length>45)return null;
    let position=0,seen=0;
    function block(depth,closer){
      if(depth>5)return null;
      const body=[];
      while(position<lines.length){
        const line=lines[position];
        if(closer&&closer.test(line))break;
        if(++seen>55)return null;
        const forMatch=/^for\s+([a-z_]\w*)\s*(?:=|←|:=)\s*(.+?)\s+to\s+(.+?)(?:\s+step\s+(-?\d+))?$/i.exec(line);
        if(forMatch){
          position++;const nested=block(depth+1,/^next(?:\s+[a-z_]\w*)?$/i);
          const end=/^next(?:\s+([a-z_]\w*))?$/i.exec(lines[position]||'');
          if(!nested||!nested.length||!end||end[1]&&end[1].toLowerCase()!==forMatch[1].toLowerCase())return null;
          position++;body.push({type:'for',name:forMatch[1].toLowerCase(),from:forMatch[2],to:forMatch[3],step:forMatch[4]?Number(forMatch[4]):1,body:nested});continue;
        }
        const ifMatch=/^if\s+(.+?)\s+then$/i.exec(line);
        if(ifMatch){
          position++;const branches=[];
          let inner=block(depth+1,/^(?:elseif\b|else$|endif$)/i);
          if(!inner||!inner.length)return null;
          branches.push({test:ifMatch[1],body:inner});
          while(/^elseif\s+.+\s+then$/i.test(lines[position]||'')){
            const other=/^elseif\s+(.+?)\s+then$/i.exec(lines[position++]);
            inner=block(depth+1,/^(?:elseif\b|else$|endif$)/i);
            if(!inner||!inner.length)return null;
            branches.push({test:other[1],body:inner});
          }
          let alternative=[];
          if(/^else$/i.test(lines[position]||'')){
            position++;alternative=block(depth+1,/^endif$/i);
            if(!alternative||!alternative.length)return null;
          }
          if(!/^endif$/i.test(lines[position]||''))return null;
          position++;body.push({type:'if',branches,alternative});continue;
        }
        const print=/^print\s*\((.+)\)$/i.exec(line);
        if(print){body.push({type:'print',expr:print[1]});position++;continue;}
        const assign=/^([a-z_]\w*)\s*(?:=|←|:=)\s*(.+)$/i.exec(line);
        if(assign){body.push({type:'assign',name:assign[1].toLowerCase(),expr:assign[2]});position++;continue;}
        return null;
      }
      return body;
    }
    const program=block(0,null);
    return program&&position===lines.length&&program.length?program:null;
  }

  function runProgram(program,word){
    if(!Array.isArray(program)||typeof word!=='string')return null;
    const env=Object.create(null);env.word=word;
    const output=[];let operations=0,iterations=0;
    const evaluate=expr=>{const parsed=readExpression(expr,env);if(!parsed)throw Error('Invalid ERL expression');return parsed.value;};
    function execute(nodes){
      for(const node of nodes){
        if(++operations>1400)throw Error('Execution limit');
        if(node.type==='assign'){
          if(node.name==='word')throw Error('Given word cannot be overwritten');
          env[node.name]=evaluate(node.expr);continue;
        }
        if(node.type==='print'){
          if(output.length>=250)throw Error('Output limit');
          output.push(String(evaluate(node.expr)));continue;
        }
        if(node.type==='if'){
          let chosen=node.alternative;
          for(const branch of node.branches){
            const result=evaluate(branch.test);
            if(typeof result!=='boolean')throw Error('IF requires a Boolean');
            if(result){chosen=branch.body;break;}
          }
          execute(chosen);continue;
        }
        if(node.type==='for'){
          const start=evaluate(node.from),end=evaluate(node.to),step=node.step;
          if(!Number.isInteger(start)||!Number.isInteger(end)||!Number.isInteger(step)||step===0||Math.abs(step)>20)throw Error('Invalid FOR');
          for(let i=start;step>0?i<=end:i>=end;i+=step){
            if(++iterations>250)throw Error('Iteration limit');
            env[node.name]=i;execute(node.body);
          }
          continue;
        }
        throw Error('Unknown instruction');
      }
    }
    try{execute(program);return output;}catch{return null;}
  }

  function expectedOutput(kind,word){
    const chars=[...word],isVowel=char=>VOWELS.includes(char.toUpperCase());
    if(kind==='each')return chars;
    if(kind==='vowels')return chars.filter(isVowel);
    if(kind==='upper')return chars.map(char=>char.toUpperCase());
    if(kind==='everySecond')return chars.filter((_,i)=>i%2===0);
    if(kind==='countE')return [String(chars.filter(c=>c.toUpperCase()==='E').length)];
    if(kind==='reverse')return [chars.reverse().join('')];
    if(kind==='consonants')return [chars.filter(c=>!isVowel(c)).join('')];
    if(kind==='afterTwo')return chars.slice(2);
    if(kind==='dashed')return [chars.join('-')];
    if(kind==='countVowels')return [String(chars.filter(isVowel).length)];
    return null;
  }
  function hasNode(nodes,type){return nodes.some(n=>n.type===type||n.body&&hasNode(n.body,type)||
    n.branches&&n.branches.some(b=>hasNode(b.body,type))||n.alternative&&hasNode(n.alternative,type));}

  function makeQuestion(level,index,seed){
    if(!LEVELS.includes(level)||!Number.isInteger(index)||index<0||index>=10)throw Error('Invalid String Handling question');
    if(level==='easy'){
      const [word,target]=EASY[index];return {level,index,type:'tap',word,expected:String(target),
        prompt:'Tap character at index '+target+'.',context:'The first character is index 0.',
        code:['word = "'+word+'"','print(word.substring('+target+',1))'],model:word[target],
        hint:'Count along the boxes starting at index 0.',explanation:'Index '+target+' holds '+word[target]+'.'};
    }
    if(level==='medium'){
      const q=MEDIUM[index];return {...q,level,index,type:'value',
        prompt:'What will this IF statement print?',context:'Read the string operation, test the condition, then follow the correct branch.',
        model:q.expected,hint:'Check whether the IF condition is True or False. Only one branch runs.',
        explanation:q.why+' Output: '+q.expected+'.'};
    }
    const q=HARD[index];return {...q,level,index,type:'program',env:{word:q.word},
      code:['word = "'+q.word+'"'],prompt:'Write the OCR ERL program.',
      context:q.task+' The word variable is already given above; write the remaining code.',
      model:q.model.join('\n'),
      hint:'Loop through indexes using for i = 0 to word.length - 1. Use word.substring(i,1) for a character.'+
        (q.needIf?' Put an IF test inside the loop.':''),
      explanation:'Your program worked on several different words, not just the example.'};
  }

  function checkAnswer(q,response){
    const raw=String(response??'').trim();if(!raw)return {complete:false,correct:false};
    if(q.type==='tap'||q.type==='value')return {complete:true,correct:raw===q.expected};
    if(q.type!=='program')return {complete:true,correct:false};
    const program=parseProgram(raw);
    if(!program||!hasNode(program,'for')||q.needIf&&!hasNode(program,'if')||
      !/\.(?:substring|left|right)\s*\(/i.test(raw))return {complete:true,correct:false};
    const words=[q.word,'COMPUTER','BANANA','HELLO','aeiou','SCHOOL','XYZ','NETWORK','A',''];
    const correct=words.every(word=>{
      const actual=runProgram(program,word),expected=expectedOutput(q.kind,word);
      return actual!==null&&expected!==null&&actual.length===expected.length&&
        actual.every((value,i)=>value===expected[i]);
    });
    return {complete:true,correct};
  }

  function makeDemo(q){
    if(!q||!LEVELS.includes(q.level))throw Error('Invalid demo level');
    if(q.level==='easy')return {title:'String Handling',task:'Similar example: locate a character in a different word.',
      codeLabel:'Indices start at zero',traceTitle:'Count each character',columns:['Index','Character'],
      lines:['word = "CODING"','print(word.substring(3,1))'],
      steps:[[1,'0–5','C O D I N G','Count C at 0, O at 1, D at 2 and I at 3.'],[2,'3','I','The character at index 3 is I.']],
      end:'Output: I. substring(3,1) starts at index 3 and takes one character.',progressive:true};
    if(q.level==='medium')return {title:'String Handling',task:'Similar example: use a string slice in an IF decision.',
      codeLabel:'Selection + substring(start, count)',traceTitle:'Follow the correct branch',columns:['Test / action','Result'],
      lines:['word = "COMPUTER"','if word.substring(0,3) == "COM" then','    print("Match")','else','    print("No match")','endif'],
      steps:[[1,'word','COMPUTER','Store the text; C is at index 0.'],
        [2,'substring(0,3)','COM','Start at 0 and take three characters. COM == COM is True.'],
        [3,'IF branch','Match','Print Match. The ELSE branch is skipped.'],
        [6,'ENDIF','Finished','Selection ends.']],
      skippedLines:[5],end:'Output: Match. Only the True branch runs.',progressive:true,showAllCode:true};
    return {title:'String Handling',task:'Similar example: use FOR and IF to print vowels from MAP.',
      codeLabel:'Iteration + selection + string slicing',traceTitle:'Trace each character',columns:['Index / test','Output'],
      lines:['word = "MAP"','for i = 0 to word.length - 1','    letter = word.substring(i,1)',
        '    if letter == "A" then','        print(letter)','    endif','next i'],
      steps:[[1,'word','MAP','Store the word.'],[2,'i = 0','—','Start at index 0.'],
        [3,'i = 0','M','Take M, the first character.'],[4,'M == A','False','Skip PRINT because M is not A.'],
        [7,'i → 1','—','NEXT advances the loop.'],[2,'i = 1','—','Loop continues.'],
        [3,'i = 1','A','Take A from index 1.'],[4,'A == A','True','Run the IF body.'],
        [5,'i = 1','A','Print A.'],[6,'ENDIF','—','End the IF branch.'],
        [7,'i → 2','—','NEXT advances the loop.'],[2,'i = 2','—','Loop continues.'],
        [3,'i = 2','P','Take P from index 2.'],[4,'P == A','False','Skip PRINT because P is not A.'],
        [7,'i → 3','—','NEXT advances the loop.'],[2,'i = 3','—','3 is outside indexes 0 to 2. Stop.']],
      loopBack:{from:7,to:2},end:'Output: A. The FOR loop visits each index, and IF chooses what to print.',
      progressive:true,showAllCode:true};
  }
  return {makeQuestion,checkAnswer,readExpression,parseProgram,runProgram,expectedOutput,makeDemo};
});
