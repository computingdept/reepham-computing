/* OCR J277/02 Skill 12: a 2D array used as a table of pupil records.
   Each row is one record; columns 0, 1 and 2 are fields. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.J277Paper2Records = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const LEVELS=['easy','medium','hard'];
  const FIELD_NAMES=['forename','surname','house'];
  const FORENAMES=['Asha','Ben','Mia','Sam','Leo','Zara','Noor','Ella'];
  const SURNAMES=['Khan','Smith','Jones','Patel','Brown','Wells','Green','Clarke'];
  const HOUSES=['Red','Blue','Green','Yellow'];
  const DECLARATION='array pupils[4,3]';
  const address=(row,col)=>'pupils['+row+','+col+']';
  const quote=value=>'"'+value+'"';
  function randomFor(seed,level,index) {
    let n=(Number(seed)||1)|0;
    for(const ch of level+':'+index)n=(Math.imul(n,31)+ch.charCodeAt(0))|0;
    return function(){
      n=(n+0x6D2B79F5)|0;
      let t=Math.imul(n^(n>>>15),1|n);
      t^=t+Math.imul(t^(t>>>7),61|t);
      return ((t^(t>>>14))>>>0)/4294967296;
    };
  }
  function startingTable(random) {
    const start=Math.floor(random()*FORENAMES.length);
    return Array.from({length:4},(_,row)=>{
      const p=(start+row)%FORENAMES.length;
      return [FORENAMES[p],SURNAMES[p],HOUSES[p%HOUSES.length]];
    });
  }
  function easy(index,random) {
    const values=startingTable(random);
    let row,col,prompt;
    if(index<4){row=index;col=1;prompt='Tap '+values[row][0]+'’s surname.';}
    else if(index<7){row=index-4;col=2;prompt='Tap the house field in record '+row+'.';}
    else {row=index-7;col=index===7?0:index===8?1:2;
      prompt='Tap the value at row '+row+', column '+col+'.';}
    return {level:'easy',type:'cell',values,fields:FIELD_NAMES,
      code:[DECLARATION,'print('+address(row,col)+')'],
      expected:row+','+col,prompt,
      context:'Each row is one pupil record. Each numbered column is a field.',
      hint:'Find record '+row+', then the '+FIELD_NAMES[col]+' field in column '+col+'.',
      model:address(row,col),
      explanation:'Record '+row+', '+FIELD_NAMES[col]+' (column '+col+') holds '+values[row][col]+'.'};
  }
  function medium(index,random) {
    const values=startingTable(random);
    let lines,expected,why;
    switch(index) {
      case 0:lines=['print(pupils[1,1])'];expected=values[1][1];
        why='Row 1 is the second pupil; column 1 is surname.';break;
      case 1:lines=['print(pupils[3,0])'];expected=values[3][0];
        why='Row 3 is the fourth pupil; column 0 is forename.';break;
      case 2:lines=['pupils[0,1] = "Moore"','print(pupils[0,1])'];expected='Moore';
        why='The surname in record 0 changes before it is printed.';break;
      case 3:lines=['pupils[2,2] = "Purple"','print(pupils[2,2])'];expected='Purple';
        why='Column 2 holds house; the assignment replaces its old value.';break;
      case 4:lines=['r = 2','print(pupils[r,1])'];expected=values[2][1];
        why='r is 2, so the surname in record 2 is read.';break;
      case 5:lines=['pupils[3,1] = pupils[0,1]','print(pupils[3,1])'];expected=values[0][1];
        why='The surname from record 0 is copied into record 3.';break;
      case 6:lines=['pupils[1,0] = "Kai"','print(pupils[1,0])'];expected='Kai';
        why='Only the forename of record 1 is changed.';break;
      case 7:lines=['pupils[0,1] = "Stone"','pupils[0,1] = "Hill"','print(pupils[0,1])'];
        expected='Hill';why='The second assignment replaces Stone with Hill.';break;
      case 8:lines=['saved = pupils[1,1]','pupils[1,1] = pupils[2,1]','print(pupils[1,1])'];
        expected=values[2][1];why='The new surname comes from record 2.';break;
      default:lines=['if pupils[3,2] == '+quote(values[3][2])+' then',
        '    print(pupils[3,1])','else','    print("Other")','endif'];
        expected=values[3][1];why='The house matches, so the IF branch prints the surname.';
    }
    return {level:'medium',type:'value',values,fields:FIELD_NAMES,
      code:[DECLARATION,...lines],expected,prompt:'What is printed?',
      context:'Read pupils[row,column]. Here the first index is the row.',
      hint:'Follow each assignment. Read the current value in the numbered field.',
      model:'Output: '+expected,explanation:why+' Output: '+expected+'.'};
  }
  function hard(index,random) {
    const values=startingTable(random);
    const loop=(start,end,statement)=>[
      'for row = '+start+' to '+end,'    '+statement,'next row'
    ];
    const tasks=[
      ['Print every surname in record order.',loop(0,3,'print(pupils[row,1])')],
      ['Print every forename in record order.',loop(0,3,'print(pupils[row,0])')],
      ['Print the house for every pupil.',loop(0,3,'print(pupils[row,2])')],
      ['Print each pupil’s full name (forename, a space, then surname).',
        loop(0,3,'print(pupils[row,0] + " " + pupils[row,1])')],
      ['Print surnames of pupils in the Red house only.',[
        'for row = 0 to 3','    if pupils[row,2] == "Red" then',
        '        print(pupils[row,1])','    endif','next row']],
      ['Count pupils in the Red house, then print the count.',[
        'count = 0','for row = 0 to 3','    if pupils[row,2] == "Red" then',
        '        count = count + 1','    endif','next row','print(count)']],
      ['Change every pupil’s house to Blue.',loop(0,3,'pupils[row,2] = "Blue"')],
      ['Print the surname of pupils whose surname is '+values[1][1]+'.',[
        'for row = 0 to 3','    if pupils[row,1] == '+quote(values[1][1])+' then',
        '        print(pupils[row,1])','    endif','next row']],
      ['Print the forenames in records 1, 2 and 3 only.',loop(1,3,'print(pupils[row,0])')],
      ['Print the surnames in records 0, 1 and 2 only.',loop(0,2,'print(pupils[row,1])')]
    ];
    const [task,lines]=tasks[index];
    return {level:'hard',type:'write',values,fields:FIELD_NAMES,code:[DECLARATION],
      prompt:'Write the OCR ERL statements.',
      context:task+' Use a FOR loop and a row index.',
      expected:lines.join('\n'),model:lines.join('\n'),
      hint:'Use for row = … to … and next row. Columns: 0 forename, 1 surname, 2 house.',
      explanation:'Use the FOR index to access each relevant field in pupils[row,column].'};
  }
  function makeQuestion(level,index,seed) {
    if(!LEVELS.includes(level)||!Number.isInteger(index)||index<0||index>9)
      throw new Error('Invalid records question');
    const random=randomFor(seed,level,index);
    return level==='easy'?easy(index,random):level==='medium'?medium(index,random):hard(index,random);
  }
  function normaliseLines(source) {
    let value=String(source??'').replace(/\r/g,'');
    // Accept any consistent name for the FOR counter (row, i, r, etc.).
    const counter=/\bfor\s+([a-z][a-z0-9_]*)\s*=/i.exec(value);
    if(counter&&counter[1].toLowerCase()!=='row')
      value=value.replace(new RegExp('\\b'+counter[1]+'\\b','gi'),'row');
    return value.split('\n').map(line=>{
      const cleaned=line.trim().replace(/[‘’']/g,'"')
        .replace(/\s*(?:←|:=)\s*/g,'=')
        .replace(/pupils\[([^\],]+)\]\[([^\]]+)\]/gi,'pupils[$1,$2]');
      // Ignore code spacing, but preserve literal spaces inside strings.
      let quoted=false,result='';
      for(const character of cleaned){
        if(character==='"')quoted=!quoted;
        if(quoted||character==='"'||!(/\s/.test(character)))result+=character;
      }
      return result.toLowerCase();
    }).filter(Boolean).join('\n');
  }
  function checkAnswer(q,response) {
    const input=String(response??'').trim();
    if(!input)return {complete:false,correct:false};
    if(q.type==='cell')return {complete:true,correct:input===q.expected};
    if(q.type==='value')return {complete:true,
      correct:input.replace(/^[\s'"“”]+|[\s'"“”]+$/g,'').toLowerCase()===q.expected.toLowerCase()};
    if(q.type==='write')return {complete:true,
      correct:normaliseLines(input)===normaliseLines(q.expected)};
    return {complete:true,correct:false};
  }
  return {FIELD_NAMES,makeQuestion,checkAnswer,normaliseLines};
});
