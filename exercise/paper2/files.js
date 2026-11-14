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
  // A separate, analogous file scenario for the shared Skills Demo. None of
  // these statements is executed or written back to the student's answer.
  function makeDemo(q) {
    if(!q||!LEVELS.includes(q.level)||!Number.isInteger(q.index)||q.index<0||q.index>9)
      throw new Error('Invalid File Handling demo question');
    const rows=[];
    const add=(line,action,effect,explanation)=>rows.push({line,action,effect,explanation});
    let task='',end='',source='scores.txt · starting lines: Ivy, Owen, Finn';
    const open='demoFile = open("scores.txt")',read='demoFile.readLine()';
    const append=word=>'demoFile.writeLine("'+word+'")';
    if(q.level==='easy') {
      const easyTasks={
        open:'Similar example: Open scores.txt and store a file reference.',
        read:'Similar example: Read the next line from an open file.',
        write:'Similar example: Add Tara as a new line at the end of a file.',
        close:'Similar example: Close a file when you have finished.',
        eof:'Similar example: Check whether an open file has unread lines.',
        new:'Similar example: Create a new file called log.txt.'
      };
      const examples={
        open:['store = open("scores.txt")','Open','File reference','open() returns a file reference; any valid variable name can store it.','A file reference is now saved in store.'],
        read:['entry = demoFile.readLine()','Read','Ivy','readLine() returns the next unread line and advances the reading position.','The first unread line was Ivy.'],
        write:[append('Tara'),'Append','Tara','writeLine() places new text after the existing lines.','The last line is now Tara.'],
        close:['demoFile.close()','Close','Finished','close() releases the open file when the work is finished.','The file has been closed.'],
        eof:['demoFile.endOfFile()','Check','False','Three lines remain unread, so endOfFile() returns False.','The file has unread lines.'],
        new:['newFile("log.txt")','Create','log.txt','newFile() creates a new file; open() uses an existing one.','A new file called log.txt is created.']
      };
      const e=examples[q.expected];
      add(e[0],e[1],e[2],e[3]);
      task=easyTasks[q.expected];
      end=e[4];
    } else if(q.level==='medium') {
      const mediumTasks=[
        'Similar example: Find the line printed by the first read.',
        'Similar example: Find the line printed after an earlier read.',
        'Similar example: Identify the new final line after appending.',
        'Similar example: Count lines after two append operations.',
        'Similar example: Find the third line read and printed.',
        'Similar example: Check endOfFile() after reading one line.',
        'Similar example: Check endOfFile() after every line has been read.',
        'Similar example: Identify the last of two appended lines.',
        'Similar example: Count how many lines a file-reading loop processes.',
        'Similar example: Trace a line saved in a variable and printed.'
      ];
      task=mediumTasks[q.index];
      if([3,7,8].includes(q.index)) source='scores.txt · starting lines: Ivy, Owen';
      add(open,'Open','scores.txt','Open the file; its reading position starts at line 1.');
      switch(q.index) {
        case 0:
          add('print('+read+')','Read + print','Ivy','The first readLine() returns line 1: Ivy.');
          end='Prints Ivy.';break;
        case 1:
          add('skip = '+read,'Read','Ivy','The first line is consumed, even though it is not printed.');
          add('print('+read+')','Read + print','Owen','The next readLine() returns line 2.');
          end='Prints Owen.';break;
        case 2:
          add(append('Tara'),'Append','Tara','A new line is added after Finn.');
          add('demoFile.close()','Close','Finished','Close the file after writing.');
          end='The new final line is Tara.';break;
        case 3:
          add(append('Tara'),'Append','3 lines','Two starting lines plus one new line.');
          add(append('Eli'),'Append','4 lines','The second writeLine() adds another line.');
          add('demoFile.close()','Close','Finished','The file keeps all four lines.');
          end='2 starting lines + 2 appended lines = 4 lines.';break;
        case 4:
          add('a = '+read,'Read','Ivy','The first read moves to line 2.');
          add('b = '+read,'Read','Owen','The second read moves to line 3.');
          add('print('+read+')','Read + print','Finn','The third read returns Finn.');
          end='Prints Finn.';break;
        case 5:
          add('a = '+read,'Read','Ivy','The first line is consumed.');
          add('print(demoFile.endOfFile())','Check end','False','Two unread lines remain.');
          end='Prints False: the end has not been reached.';break;
        case 6:
          for(const [i,name] of ['Ivy','Owen','Finn'].entries())
            add('item'+(i+1)+' = '+read,'Read',name,'Read the next line and move the cursor forward.');
          add('print(demoFile.endOfFile())','Check end','True','No unread lines remain.');
          end='Prints True: every line has been read.';break;
        case 7:
          add(append('Tara'),'Append','Tara','Add a line after Owen.');
          add(append('Eli'),'Append','Eli','The newest line is now Eli.');
          add('demoFile.close()','Close','Finished','Close the file.');
          end='The final line is Eli.';break;
        case 8:
          add('count = 0','Start count','0','Nothing has been read yet.');
          add('while NOT demoFile.endOfFile()','Loop','Read next','Repeat while there are unread lines.');
          add('    item = '+read,'Read','Next line','Read one new line per repetition.');
          add('    count = count + 1','Count','+1','Add one for each read line.');
          add('endwhile','Repeat','Stop at end','The loop ends after both starting lines.');
          add('print(count)','Print','2','Two original lines were read.');
          end='Prints 2 because this example started with two lines.';break;
        default:
          add('first = '+read,'Read','Ivy','The first variable stores line 1.');
          add('second = '+read,'Read','Owen','The second variable stores line 2.');
          add('print(second)','Print','Owen','The stored second line is printed.');
          add('demoFile.close()','Close','Finished','Close the file after reading.');
          end='Prints Owen.';
      }
    } else {
      const cases=[
        ['Similar example: Open scores.txt and save its file reference.','saved = open("scores.txt")','Open','saved','You can choose a valid name such as saved; open() returns the reference.','The file reference is stored in saved.'],
        ['Similar example: Read a line from demoFile into a chosen variable.','entry = demoFile.readLine()','Read','entry','Read the next line and store it in entry.','entry contains the next unread line.'],
        ['Similar example: Print the next line of demoFile.','print(demoFile.readLine())','Print','Next line','Place the readLine() call inside print().','One line is read and printed.'],
        ['Similar example: Append Tara to demoFile.','demoFile.writeLine("Tara")','Append','Tara','The text to write goes in quotation marks.','Tara is appended to the file.'],
        ['Similar example: Finish using demoFile.','demoFile.close()','Close','Finished','close() is called on the file reference.','demoFile is closed.'],
        ['Similar example: Print all the lines in demoFile until it ends.','while NOT demoFile.endOfFile()\n    print(demoFile.readLine())\nendwhile','Loop','One line each time','NOT endOfFile() repeats while there are unread lines.','Every original line is printed once.'],
        ['Similar example: Create a new file called log.txt.','newFile("log.txt")','Create','log.txt','Use newFile() rather than open() for a new file.','A new file called log.txt is created.'],
        ['Similar example: Append Ready to demoFile.','demoFile.writeLine("Ready")','Append','Ready','writeLine() adds a new line without replacing earlier ones.','Ready becomes the new final line.'],
        ['Similar example: Read a line into entry, then close demoFile.','entry = demoFile.readLine()\ndemoFile.close()','Read then close','entry','Read first, then close the same file.','entry stores one line and demoFile is closed.'],
        ['Similar example: Open scores.txt, read a line, then close it.','saved = open("scores.txt")\nentry = saved.readLine()\nsaved.close()','Open, read, close','saved','Reuse the same file variable for every command; use another variable for the line.','The file is opened, one line is saved, and then it is closed.']
      ];
      const [prompt,code,action,effect,reason,result]=cases[q.index];
      task=prompt;end=result;
      for(const [i,line] of code.split('\n').entries()) {
        const descriptions=q.index===5
          ? [['Check end','Unread?','NOT keeps the loop running until no lines remain.'],
            ['Read + print','One line','Each repetition prints the next line.'],
            ['Repeat','Until end','The loop returns to its condition and eventually stops.']]
          : q.index===8
            ? [['Read','entry','Store one line in any valid variable.'],['Close','Finished','Close the file afterwards.']]
          : q.index===9
            ? [['Open','saved','Store the file reference.'],['Read','entry','Read using saved and store the line separately.'],['Close','Finished','Close the same saved reference.']]
            : [[action,effect,reason]];
        const [label,value,detail]=descriptions[i];add(line,label,value,detail);
      }
    }
    return {title:'File Handling',codeLabel:source,traceTitle:q.level==='medium'?'Trace the file':'Build the command',
      columns:['Action','Effect'], task,end,progressive:true,
      lines:rows.map(row=>row.line),
      placeholders:rows.map(row=>row.action+' …'),
      steps:rows.map((row,i)=>[i+1,row.action,row.effect,row.explanation])};
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
