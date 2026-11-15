/* OCR J277/02 · String Handling · 30 independently marked challenges. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.J277Paper2Strings=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const LEVELS=['easy','medium','hard'];
  const EASY=[
    ['COMPUTER',2],['NETWORK',4],['ALGORITHM',0],['DATABASE',5],['KEYBOARD',7],
    ['VARIABLE',3],['PYTHON',1],['BINARY',5],['BOOLEAN',6],['PROGRAM',4]
  ];
  const MEDIUM=[
    {kind:'length',text:'NETWORK',code:['word = "NETWORK"','print(word.length)'],expected:'7'},
    {kind:'left',text:'DATABASE',code:['word = "DATABASE"','print(word.left(3))'],expected:'DAT',range:[0,3]},
    {kind:'right',text:'COMPUTER',code:['word = "COMPUTER"','print(word.right(3))'],expected:'TER',range:[5,8]},
    {kind:'substring',text:'ALGORITHM',code:['word = "ALGORITHM"','print(word.substring(2,4))'],expected:'GORI',range:[2,6]},
    {kind:'upper',text:'school',code:['word = "school"','print(word.upper)'],expected:'SCHOOL'},
    {kind:'lower',text:'BINARY',code:['word = "BINARY"','print(word.lower)'],expected:'binary'},
    {kind:'join',text:'Asha + Khan',code:['first = "Asha"','last = "Khan"','print(first + " " + last)'],expected:'Asha Khan'},
    {kind:'slice-join',text:'NETWORK',code:['word = "NETWORK"','print(word.substring(0,3) + "!")'],expected:'NET!',range:[0,3]},
    {kind:'ends',text:'VARIABLE',code:['word = "VARIABLE"','print(word.left(2) + word.right(2))'],expected:'VALE'},
    {kind:'slice-right',text:'PYTHON',code:['word = "PYTHON"','print(word.substring(1,2) + word.right(2))'],expected:'YTON',range:[1,3]}
  ];
  const HARD=[
    {prompt:'Extract the first 3 characters.',env:{word:'NETWORK'},model:'word.left(3)',kind:'slice'},
    {prompt:'Extract the final 2 characters.',env:{word:'NETWORK'},model:'word.right(2)',kind:'slice'},
    {prompt:'Extract 4 characters starting at index 2.',env:{word:'ALGORITHM'},model:'word.substring(2,4)',kind:'slice'},
    {prompt:'Join first and last with one space between.',env:{first:'Asha',last:'Khan'},model:'first + " " + last',kind:'join'},
    {prompt:'Convert word to uppercase.',env:{word:'network'},model:'word.upper',kind:'upper'},
    {prompt:'Convert word to lowercase.',env:{word:'NETWORK'},model:'word.lower',kind:'lower'},
    {prompt:'Find the number of characters in word.',env:{word:'COMPUTER'},model:'word.length',kind:'length'},
    {prompt:'Join the first 2 and final 2 characters.',env:{word:'VARIABLE'},model:'word.left(2) + word.right(2)',kind:'slice-join'},
    {prompt:'Extract 3 characters starting at index 1, then add !',env:{word:'PYTHON'},model:'word.substring(1,3) + "!"',kind:'slice-join'},
    {prompt:'Join the first character and last 3 characters.',env:{word:'COMPUTER'},model:'word.left(1) + word.right(3)',kind:'slice-join'}
  ];

  // A small, non-executing reader for the relevant OCR ERL expressions.
  // Student text never runs as JavaScript. Equivalent valid slices are accepted.
  function readExpression(source,env){
    const raw=String(source??'').trim();
    if(!raw||raw.length>180)return null;
    const regex=/\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|[A-Za-z_]\w*|\d+|[.+(),])\s*/gy;
    const tokens=[];let pos=0;
    while(pos<raw.length){regex.lastIndex=pos;const m=regex.exec(raw);if(!m)return null;tokens.push(m[1]);pos=regex.lastIndex;}
    let at=0,joined=false;
    const methods=new Set(),variables=new Set();
    const take=token=>tokens[at]===token?(at++,true):false;
    const required=token=>{if(!take(token))throw Error('Invalid expression');};
    const number=()=>{const token=tokens[at++];if(!/^\d+$/.test(token??''))throw Error('Number expected');return Number(token);};
    function term(){
      let value,token=tokens[at++];
      if(token==='('){value=expression();required(')');}
      else if(/^(["']).*\1$/s.test(token??'')){value=token.slice(1,-1);}
      else if(Object.prototype.hasOwnProperty.call(env,token)){variables.add(token);value=env[token];}
      else throw Error('Unknown value');
      while(take('.')){
        const method=tokens[at++];methods.add(method);
        if(method==='length'){value=String(value).length;continue;}
        if(method==='upper'){value=String(value).toUpperCase();continue;}
        if(method==='lower'){value=String(value).toLowerCase();continue;}
        if(!['left','right','substring'].includes(method))throw Error('Unsupported method');
        required('(');const start=number();let count=start;
        if(method==='substring'){required(',');count=number();}
        required(')');const text=String(value);
        if(start<0||count<0||count>text.length||method==='substring'&&start+count>text.length)
          throw Error('Out of range');
        value=method==='left'?text.slice(0,count):method==='right'?(count?text.slice(-count):''):text.slice(start,start+count);
      }
      return value;
    }
    function expression(){let value=term();while(take('+')){joined=true;value=String(value)+String(term());}return value;}
    try {const value=expression();if(at!==tokens.length)return null;
      return {value,methods,variables,joined};
    } catch {return null;}
  }
  function makeQuestion(level,index,seed){
    if(!LEVELS.includes(level)||!Number.isInteger(index)||index<0||index>9)throw Error('Invalid String Handling question');
    if(level==='easy'){
      const [word,target]=EASY[index];
      return {level,index,type:'tap',word,expected:String(target),range:[target,target+1],
        prompt:'Tap character at index '+target+'.',context:'The first character is index 0.',
        code:['word = "'+word+'"','print(word.substring('+target+',1))'],
        model:word[target],hint:'Count along the boxes starting at index 0.',
        explanation:'Index '+target+' holds '+word[target]+'.'};
    }
    if(level==='medium'){
      const q=MEDIUM[index];return {...q,level,index,type:'value',word:q.text,
        prompt:'What is printed?',context:'Follow the OCR ERL string operation. Remember: substring(start, count).',
        model:q.expected,hint:'Read the string and count from index 0. The second substring argument is a number of characters.',
        explanation:'The output is '+q.expected+'.'};
    }
    const q=HARD[index],word=q.env.word||null;
    return {...q,level,index,type:'expression',word,expected:readExpression(q.model,q.env).value,
      code:Object.entries(q.env).map(([name,value])=>name+' = "'+value+'"'),
      context:q.prompt,prompt:'Write the OCR ERL expression.',
      hint:'Use the variable names shown. substring(start, count) starts at 0; + joins strings.',
      explanation:'This expression produces '+readExpression(q.model,q.env).value+'.'};
  }
  function checkAnswer(q,response){
    const raw=String(response??'').trim();
    if(!raw)return {complete:false,correct:false};
    if(q.type==='tap')return {complete:true,correct:raw===q.expected};
    if(q.type==='value')return {complete:true,correct:raw===q.expected};
    if(q.type!=='expression')return {complete:true,correct:false};
    const read=readExpression(raw,q.env);
    if(!read)return {complete:true,correct:false};
    const necessary=Object.keys(q.env).every(v=>read.variables.has(v));
    const sliced=['left','right','substring'].some(m=>read.methods.has(m));
    const operation=q.kind==='slice'?sliced:q.kind==='join'?read.joined:
      q.kind==='slice-join'?read.joined&&sliced:read.methods.has(q.kind);
    return {complete:true,correct:necessary&&operation&&read.value===q.expected};
  }
  function makeDemo(q){
    if(!q||!LEVELS.includes(q.level))throw Error('Invalid demo level');
    if(q.level==='easy')return {title:'String Handling',task:'Similar example: locate a character in a different word.',
      codeLabel:'Indices start at zero',traceTitle:'Count each character',columns:['Index','Character'],
      lines:['word = "CODING"','print(word.substring(3,1))'],
      steps:[[1,'0–5','C O D I N G','Count C at 0, O at 1, D at 2 and I at 3.'],[2,'3','I','The character at index 3 is I.']],
      end:'Output: I. substring(3,1) starts at index 3 and takes one character.',progressive:true};
    if(q.level==='medium')return {title:'String Handling',task:'Similar example: extract a different substring.',
      codeLabel:'substring(start, count)',traceTitle:'Start, then count',columns:['Index','Result'],
      lines:['word = "COMPUTER"','part = word.substring(2,3)','print(part)'],
      steps:[[1,'0–7','COMPUTER','Index 0 is C. The index of M is 2.'],[2,'2,3','MPU','Start at index 2; take exactly 3 characters: M, P, U.'],[3,'Output','MPU','Print the substring, not the whole word.']],
      end:'Output: MPU. The second argument counts characters, not the ending index.',progressive:true};
    return {title:'String Handling',task:'Similar example: combine slices from a different word.',
      codeLabel:'Use left, right and +',traceTitle:'Build the new string',columns:['Expression','Value'],
      lines:['word = "PROGRAM"','start = word.left(2)','finish = word.right(2)','code = start + "-" + finish','print(code)'],
      steps:[[1,'word','PROGRAM','Store the original word.'],[2,'left(2)','PR','Take the first two characters.'],[3,'right(2)','AM','Take the last two characters.'],[4,'+','PR-AM','Join both pieces with a hyphen between.'],[5,'Output','PR-AM','Print the completed string.']],
      end:'Output: PR-AM. The + operator joins text in order.',progressive:true};
  }
  return {makeQuestion,checkAnswer,readExpression,makeDemo};
});
