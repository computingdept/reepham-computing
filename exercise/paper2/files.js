/* OCR J277/02 Skill 13: file handling using OCR's published reference language.
   Simulated text files only: no student files are read or created. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.J277Paper2Files = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const LEVELS = ['easy', 'medium', 'hard'];
  const OPTIONS = [
    {id: 'open', label: 'Open', code: 'myFile = open("names.txt")'},
    {id: 'read', label: 'Read line', code: 'myFile.readLine()'},
    {id: 'write', label: 'Write line', code: 'myFile.writeLine("Kai")'},
    {id: 'close', label: 'Close', code: 'myFile.close()'},
    {id: 'eof', label: 'End of file?', code: 'myFile.endOfFile()'},
    {id: 'new', label: 'New file', code: 'newFile("names.txt")'}
  ];
  const NAME_SETS = [
    ['Asha', 'Ben', 'Mia'], ['Ella', 'Noor', 'Sam'],
    ['Zara', 'Leo', 'Pia'], ['Kai', 'Ida', 'Tom']
  ];
  function randomFor(seed, level, index) {
    let n = (Number(seed) || 1) | 0;
    for (const ch of level + ':' + index) n = (Math.imul(n, 31) + ch.charCodeAt(0)) | 0;
    return function () {
      n = (n + 0x6D2B79F5) | 0;
      let t = Math.imul(n ^ (n >>> 15), 1 | n);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const pick = (r, n) => Math.floor(r() * n);
  function choicesFor(expected, r) {
    const others = OPTIONS.filter(option => option.id !== expected)
      .map(option => ({option, rank: r()})).sort((a,b) => a.rank-b.rank)
      .slice(0,3).map(item => item.option);
    return [...others, OPTIONS.find(option => option.id === expected)]
      .map(option => ({option, rank: r()})).sort((a,b) => a.rank-b.rank)
      .map(item => item.option);
  }
  function easy(index, r) {
    const tasks = [
      ['open', 'Which command opens an existing text file?', 'The returned file must be stored in a variable.'],
      ['read', 'Which command returns the next line of text?', 'Reading moves on to the next line.'],
      ['write', 'Which command adds a line at the end?', 'Writing does not replace the existing lines.'],
      ['close', 'Which command closes the file after use?', 'Close the file when you have finished.'],
      ['eof', 'Which command checks whether all lines have been read?', 'Use this in a WHILE loop to stop at the end.'],
      ['new', 'Which command creates a new text file?', 'Creating a new file is different from opening an existing one.'],
      ['write', 'Which command appends the name "Kai"?', 'An appended line goes after the last existing line.'],
      ['read', 'Which command reads just one more line?', 'Use the file variable followed by the read command.'],
      ['close', 'Which command should finish your file-handling code?', 'After reading or writing, release the file.'],
      ['open', 'Which command returns a file to store as myFile?', 'The file variable lets later commands refer to the file.']
    ];
    const [expected, prompt, context] = tasks[index];
    const model = OPTIONS.find(option => option.id === expected);
    return {level:'easy', type:'operation', filename:'names.txt', lines:[], code:[],
      prompt, context, choices: choicesFor(expected,r), expected, hint: context,
      model: model.code, explanation: model.label + ': ' + context};
  }
  function medium(index, r) {
    const lines = NAME_SETS[pick(r, NAME_SETS.length)].slice();
    const open = 'myFile = open("names.txt")';
    const read = 'myFile.readLine()';
    const write = word => 'myFile.writeLine("' + word + '")';
    let code, prompt, expected, explanation;
    const hints = [
      'The first readLine() takes line 1. Look at the file before the code runs.',
      'Each readLine() advances to the following line, even if its result is not printed.',
      'writeLine() adds a new final line without removing existing lines.',
      'Count the original lines, then add one for each writeLine().',
      'Count how many times readLine() is called before print().',
      'endOfFile() is only True once no unread lines remain.',
      'Check whether every original line has already been read.',
      'The last writeLine() determines the final line.',
      'A loop using NOT endOfFile() runs once for each unread line.',
      'The second readLine() takes line 2. Follow the value stored in second.'
    ];
    switch(index) {
      case 0:
        code=[open,'print('+read+')']; prompt='What is printed?'; expected=lines[0];
        explanation='The first readLine() returns line 1: '+lines[0]+'.'; break;
      case 1:
        code=[open,'first = '+read,'print('+read+')']; prompt='What is printed?'; expected=lines[1];
        explanation='The first read consumes line 1, so the next read returns line 2.'; break;
      case 2:
        code=[open,write('Ruby'),'myFile.close()']; prompt='What is the final line in the file?'; expected='Ruby';
        explanation='writeLine() appends Ruby after the existing lines.'; break;
      case 3:
        code=[open,write('Ruby'),write('Omar'),'myFile.close()']; prompt='How many lines are in the file now?'; expected='5';
        explanation='Three starting lines plus two new lines = five.'; break;
      case 4:
        code=[open,'a = '+read,'b = '+read,'print('+read+')']; prompt='What is printed?'; expected=lines[2];
        explanation='The third readLine() reaches line 3.'; break;
      case 5:
        code=[open,'a = '+read,'print(myFile.endOfFile())']; prompt='What is printed?'; expected='False';
        explanation='Two unread lines remain, so endOfFile() is False.'; break;
      case 6:
        code=[open,'a = '+read,'b = '+read,'c = '+read,'print(myFile.endOfFile())'];
        prompt='What is printed?'; expected='True';
        explanation='All three lines have been read, so endOfFile() is True.'; break;
      case 7:
        code=[open,write('Ruby'),write('Omar'),'myFile.close()'];
        prompt='What is the last line in the file?'; expected='Omar';
        explanation='Each writeLine() appends; Omar was written last.'; break;
      case 8:
        code=[open,'count = 0','while NOT myFile.endOfFile()',
          '    name = myFile.readLine()','    count = count + 1','endwhile','print(count)','myFile.close()'];
        prompt='What number is printed?'; expected='3';
        explanation='The loop reads each of the three lines once.'; break;
      default:
        code=[open,'first = '+read,'second = '+read,'print(second)','myFile.close()'];
        prompt='What is printed?'; expected=lines[1];
        explanation='The second read stores the second line in second.';
    }
    return {level:'medium',type:'value',filename:'names.txt',lines,code,prompt,
      context:'Trace the starting file, one command at a time.', expected,
      hint:hints[index],
      model:'Answer: '+expected,explanation:explanation+' Answer: '+expected+'.'};
  }
  function hard(index) {
    const tasks = [
      ['Open the existing file names.txt and store its file reference in a variable of your choice.', ['myFile = open("names.txt")']],
      ['Read the next line from myFile into a variable of your choice.', ['name = myFile.readLine()']],
      ['Print the next line from myFile.', ['print(myFile.readLine())']],
      ['Add the line "Ruby" to the end of myFile.', ['myFile.writeLine("Ruby")']],
      ['Close myFile after use.', ['myFile.close()']],
      ['Read and print every line of myFile. Stop at the end.', [
        'while NOT myFile.endOfFile()','    print(myFile.readLine())','endwhile']],
      ['Create a new text file called results.txt.', ['newFile("results.txt")']],
      ['Write the text "Pass" as a new line in myFile.', ['myFile.writeLine("Pass")']],
      ['Read one line from myFile into a variable of your choice, then close myFile.', ['first = myFile.readLine()','myFile.close()']],
      ['Open names.txt using a file variable of your choice, read its first line into another variable, then close the file.', [
        'myFile = open("names.txt")','name = myFile.readLine()','myFile.close()']]
    ];
    // Prompt-specific reminders, deliberately using placeholders instead of
    // handing students the complete statement for this particular question.
    const supports = [
      [['Store a value','variable = expression'],['Open a file','open("filename")']],
      [['Store a value','variable = expression'],['Read a line','file.readLine()']],
      [['Print a value','print(value)'],['Read a line','file.readLine()']],
      [['Add a line','file.writeLine("text")']],
      [['Finish with a file','file.close()']],
      [['Repeat until finished','while NOT condition … endwhile'],
        ['Check the end','file.endOfFile()'],['Read a line','file.readLine()']],
      [['Create a file','newFile("filename")']],
      [['Add a line','file.writeLine("text")']],
      [['Store the next line','variable = file.readLine()'],['Close afterwards','file.close()']],
      [['Open and store','variable = open("filename")'],
        ['Read and store','value = file.readLine()'],['Close afterwards','file.close()']]
    ];
    const tips = [
      'Use an assignment to save the file returned by open().',
      'The left side of = is the variable that should store the next line.',
      'Put the expression that reads a line inside print().',
      'writeLine() needs the text to add inside its brackets.',
      'Use the file variable followed by the close command.',
      'Repeat while the end has NOT been reached; read and print inside the loop.',
      'newFile() takes the new filename as a string.',
      'Place the text to append between quotation marks.',
      'Read into your chosen variable first, then close the file on a second line.',
      'First open, then read into a different variable, then close. Use the same file variable throughout.'
    ];
    const [task, statements] = tasks[index];
    return {level:'hard',type:'write',filename:'names.txt',lines:[],code:[],
      hardIndex:index, prompt:'Write the file-handling statement'+(statements.length>1?'s':'')+'.',
      context:task, expected:statements.join('\n'), model:statements.join('\n'),
      lineCount:statements.length, helpers:supports[index].map(([label,syntax])=>({label,syntax})),
      hint:tips[index],
      explanation:'One correct solution is shown in the model.'};
  }
  function makeQuestion(level,index,seed) {
    if(!LEVELS.includes(level)||!Number.isInteger(index)||index<0||index>9) throw new Error('Invalid file-handling question');
    const r=randomFor(seed,level,index);
    const question=level==='easy'?easy(index,r):level==='medium'?medium(index,r):hard(index);
    return {...question,index};
  }
  // Stable reference demonstrations: imaginary files only. Easy models basic
  // commands; Medium/Hard begin with an executed WHILE trace. No demo changes
  // the student's practice answer or marks.
  function makeDemo(q) {
    if(!q||!LEVELS.includes(q.level)||!Number.isInteger(q.index)||q.index<0||q.index>9)
      throw new Error('Invalid File Handling demo question');
    function demo({filename,task,code,actions,states,end}) {
      return {
        title:'File Handling',codeLabel:'OCR Exam Reference Language',
        traceTitle:'Watch each command',columns:['Action','Effect'],
        task,end,progressive:false,
        lines:code,placeholders:actions.map(([action])=>action+' …'),
        steps:actions.map(([action,effect,why],i)=>[i+1,action,effect,why]),
        fileView:{filename,states}
      };
    }
    const snapshot=(exists,open,lines,note,highlightIndex=-1)=>({
      exists,open,lines,note,highlightIndex
    });
    const names=['Ivy','Owen','Finn'];
    const existing=demo({
      filename:'scores.txt',
      task:'Worked example: Open, read, check, append and close one text file.',
      code:[
        'myFile = open("scores.txt")',
        'first = myFile.readLine()',
        'atEnd = myFile.endOfFile()',
        'myFile.writeLine("Tara")',
        'myFile.close()'
      ],
      actions:[
        ['Open','Ready to read','open() returns a file reference stored in myFile.'],
        ['Read','first = Ivy','readLine() returns Ivy; Owen and Finn are still unread.'],
        ['Check end','atEnd = False','endOfFile() is False because Owen and Finn remain unread.'],
        ['Append','Tara added','writeLine() adds Tara after Finn without replacing earlier lines.'],
        ['Close','File closed','close() finishes work with this file.']
      ],
      states:[
        snapshot(true,false,names,'Before: scores.txt already contains three lines.'),
        snapshot(true,true,names,'Opened. The next read takes line 1.'),
        snapshot(true,true,names,'Read Ivy. Next unread line: Owen.',0),
        snapshot(true,true,names,'Not at end: two unread lines remain.',0),
        snapshot(true,true,[...names,'Tara'],'Tara is appended after Finn.',3),
        snapshot(true,false,[...names,'Tara'],'Closed. All four lines remain saved.',3)
      ],
      end:'scores.txt contains Ivy, Owen, Finn, Tara. The file is closed.'
    });
    const created=demo({
      filename:'results.txt',
      task:'Worked example: Create a new file, open it, write a line and close it.',
      code:[
        'newFile("results.txt")',
        'myFile = open("results.txt")',
        'myFile.writeLine("Passed")',
        'myFile.close()'
      ],
      actions:[
        ['Create','Empty file','newFile() creates the file, but does not open it.'],
        ['Open','Ready to write','Store the reference from open() before using writeLine().'],
        ['Write','Passed added','writeLine() adds the first line to the empty file.'],
        ['Close','File closed','close() finishes writing while keeping the text.']
      ],
      states:[
        snapshot(false,false,[],'Before: results.txt does not exist.'),
        snapshot(true,false,[],'Created, but not yet opened.'),
        snapshot(true,true,[],'Opened. The file is still empty.'),
        snapshot(true,true,['Passed'],'Passed is the first line.',0),
        snapshot(true,false,['Passed'],'Closed. The line remains in the file.',0)
      ],
      end:'results.txt contains one line: Passed. The file is closed.'
    });
    const pupilNames=['Ada','Leo','Mia'];
    const loopLines=[
      'myFile = open("pupils.txt")',
      'while NOT myFile.endOfFile()',
      '    name = myFile.readLine()',
      '    print(name)',
      'endwhile',
      'myFile.close()'
    ];
    const loopSteps=[
      [1,'Open','Ready to read','Open pupils.txt and start with the first unread line.']
    ];
    const loopStates=[
      snapshot(true,false,pupilNames,'Before: three pupils are saved in this file.'),
      snapshot(true,true,pupilNames,'Open. The next unread line is Ada.')
    ];
    pupilNames.forEach((name,index)=>{
      const upcoming=pupilNames[index+1];
      loopSteps.push([2,'Check end','False','An unread line remains, so NOT endOfFile() is True.']);
      loopStates.push(snapshot(true,true,pupilNames,'The WHILE condition is True. Read '+name+' next.'));
      loopSteps.push([3,'Read','name = '+name,'readLine() gets line '+(index+1)+' and advances the reading position.']);
      loopStates.push(snapshot(true,true,pupilNames,'Read '+name+'. '+(upcoming?'Next unread: '+upcoming+'.':'No unread lines remain.'),index));
      loopSteps.push([4,'Print',name,'Output the name just read, not a different line.']);
      loopStates.push(snapshot(true,true,pupilNames,'Printed '+name+'. '+(upcoming?'Next unread: '+upcoming+'.':'The reading position is now at the end.'),index));
      loopSteps.push([5,'Repeat','Back to WHILE','ENDWHILE returns to line 02 to check for another unread line.']);
      loopStates.push(snapshot(true,true,pupilNames,'Return to line 02 and test endOfFile() again.',index));
    });
    loopSteps.push([2,'Check end','True','No lines remain. NOT endOfFile() is now False, so skip the loop body.']);
    loopStates.push(snapshot(true,true,pupilNames,'At end of file. Leave the WHILE loop.',2));
    loopSteps.push([6,'Close','File closed','Close the file after the loop finishes.']);
    loopStates.push(snapshot(true,false,pupilNames,'Closed. The three original lines are unchanged.'));
    const loopExample={
      title:'File Handling',codeLabel:'OCR Exam Reference Language',
      traceTitle:'Follow each read and end-of-file check',columns:['Action','Effect'],
      task:'Worked example: Read and print every line using WHILE NOT endOfFile().',
      end:'Output: Ada, Leo, Mia. Each line was read once; the file is closed.',
      progressive:false,lines:loopLines,
      steps:loopSteps,fileView:{filename:'pupils.txt',states:loopStates}
    };
    const variants=[
      {label:'Existing file',example:existing},
      {label:'New file',example:created}
    ];
    if(q.level==='easy') return {...existing,variants};
    return {...loopExample,variants:[{label:'Read all (WHILE)',example:loopExample},...variants]};
  }
  function normaliseStatements(value) {
    return String(value??'').replace(/\r/g,'').split('\n')
      .map(line=>line.trim().replace(/[‘’']/g,'"').replace(/\s*(?:←|:=)\s*/g,'=')
        .replace(/\s+/g,'').replace(/;$/,'').toLowerCase())
      .filter(Boolean).join('\n');
  }
  // These ten prompts have narrow, checkable semantics. Check the structure of
  // a solution rather than requiring the model's incidental variable names.
  // Do not execute student code.
  const IDENTIFIER='[a-z_][a-z0-9_]*';
  const validIdentifier=name=>new RegExp('^'+IDENTIFIER+'$').test(name)
    && !['while','endwhile','if','else','for','print','open','newfile','not'].includes(name);
  function hardLines(value) {
    return String(value).replace(/\r/g,'').split('\n').map(line=>line.trim()
      .replace(/[“”]/g,'"').replace(/[‘’]/g,"'")
      .replace(/'([^']*)'/g,'"$1"').replace(/\s*(?:←|:=)\s*/g,'=')
      .replace(/\s*([=().,])\s*/g,'$1').replace(/;\s*$/,'').toLowerCase())
      .filter(Boolean);
  }
  function matchAssign(line,expression) {
    if(!line)return null;
    const match=line.match(new RegExp('^('+IDENTIFIER+')='+expression+'$'));
    return match&&validIdentifier(match[1])?match[1]:null;
  }
  function checkHard(q,value) {
    const lines=hardLines(value), n=q.hardIndex;
    const same=(index,expected)=>lines[index]===expected;
    const open='open\\("names\\.txt"\\)';
    const read='myfile\\.readline\\(\\)';
    let correct=false;
    if(n===0) correct=lines.length===1&&!!matchAssign(lines[0],open);
    else if(n===1) {const name=matchAssign(lines[0],read);correct=lines.length===1&&!!name&&name!=='myfile';}
    else if(n===2) correct=lines.length===1&&same(0,'print(myfile.readline())');
    else if(n===3) correct=lines.length===1&&same(0,'myfile.writeline("ruby")');
    else if(n===4) correct=lines.length===1&&same(0,'myfile.close()');
    else if(n===5) correct=lines.length===3&&same(0,'while not myfile.endoffile()')
      &&same(1,'print(myfile.readline())')&&same(2,'endwhile');
    else if(n===6) correct=lines.length===1&&same(0,'newfile("results.txt")');
    else if(n===7) correct=lines.length===1&&same(0,'myfile.writeline("pass")');
    else if(n===8) {const name=matchAssign(lines[0],read);correct=lines.length===2&&!!name
      &&name!=='myfile'&&same(1,'myfile.close()');}
    else if(n===9&&lines.length===3) {
      const handle=matchAssign(lines[0],open);
      const readMatch=lines[1].match(new RegExp('^('+IDENTIFIER+')=('+IDENTIFIER+')\\.readline\\(\\)$'));
      const closeMatch=lines[2].match(new RegExp('^('+IDENTIFIER+')\\.close\\(\\)$'));
      correct=!!handle&&!!readMatch&&!!closeMatch&&validIdentifier(readMatch[1])
        &&readMatch[1]!==handle&&readMatch[2]===handle&&closeMatch[1]===handle;
    }
    if(correct)return {complete:true,correct:true};
    const code=lines.join('\n');
    let message='Check the command, brackets and order of the statements.';
    if(/(?:open|newfile)\([^"']*\.txt\)/.test(code))
      message='Put quotation marks around the filename because it is a string, for example "'+(n===6?'results.txt':'names.txt')+'".';
    else if(/\.writeline\((?:ruby|pass)\)/.test(code))
      message='Put quotation marks around the text inside writeLine().';
    else if(n===0&&/^open\(/.test(code))
      message='Store the file returned by open() in a variable, for example file = open("names.txt").';
    else if(n===9&&/\.readline\(\)/.test(code))
      message='Use the same file variable for opening, reading and closing. Store the line in a different variable.';
    else if([0,1,8,9].includes(n))
      message='Choose a valid variable name and use = to store the value. Keep the file reference separate from text read from it.';
    return {complete:true,correct:false,feedback:message};
  }
  function checkAnswer(q,response) {
    const value=String(response??'').trim();
    if(!value) return {complete:false,correct:false};
    if(q.type==='operation') return {complete:true,correct:value===q.expected};
    if(q.type==='value') return {complete:true,correct:value.replace(/^[\s'"“”]+|[\s'"“”]+$/g,'').toLowerCase()===q.expected.toLowerCase()};
    if(q.type==='write') return checkHard(q,value);
    return {complete:true,correct:false};
  }
  return {OPTIONS, makeQuestion,makeDemo,checkAnswer,normaliseStatements};
});
