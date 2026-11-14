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
    {id: 'open', label: 'Open', code: 'open("names.txt")'},
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
      hint:'readLine() takes the next unread line. writeLine() appends to the end.',
      model:'Answer: '+expected,explanation:explanation+' Answer: '+expected+'.'};
  }
  function hard(index) {
    const tasks = [
      ['Open the existing file names.txt and store it as myFile.', ['myFile = open("names.txt")']],
      ['Read the next line from myFile into a variable called name.', ['name = myFile.readLine()']],
      ['Print the next line from myFile.', ['print(myFile.readLine())']],
      ['Add the line "Ruby" to the end of myFile.', ['myFile.writeLine("Ruby")']],
      ['Close myFile after use.', ['myFile.close()']],
      ['Read and print every line of myFile. Stop at the end.', [
        'while NOT myFile.endOfFile()','    print(myFile.readLine())','endwhile']],
      ['Create a new text file called results.txt.', ['newFile("results.txt")']],
      ['Write the text "Pass" as a new line in myFile.', ['myFile.writeLine("Pass")']],
      ['Read one line into first, then close myFile.', ['first = myFile.readLine()','myFile.close()']],
      ['Open names.txt as myFile, read the first line into name, then close it.', [
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
      'Read into the named variable first, then close the file on a second line.',
      'First open, then read into name, then close. Use three separate lines.'
    ];
    const [task, statements] = tasks[index];
    return {level:'hard',type:'write',filename:'names.txt',lines:[],code:[],
      prompt:'Write the file-handling statement'+(statements.length>1?'s':'')+'.',
      context:task, expected:statements.join('\n'), model:statements.join('\n'),
      lineCount:statements.length, helpers:supports[index].map(([label,syntax])=>({label,syntax})),
      hint:tips[index],
      explanation:'One correct solution is shown in the model.'};
  }
  function makeQuestion(level,index,seed) {
    if(!LEVELS.includes(level)||!Number.isInteger(index)||index<0||index>9) throw new Error('Invalid file-handling question');
    const r=randomFor(seed,level,index);
    return level==='easy'?easy(index,r):level==='medium'?medium(index,r):hard(index);
  }
  function normaliseStatements(value) {
    return String(value??'').replace(/\r/g,'').split('\n')
      .map(line=>line.trim().replace(/[‘’']/g,'"').replace(/\s*(?:←|:=)\s*/g,'=')
        .replace(/\s+/g,'').replace(/;$/,'').toLowerCase())
      .filter(Boolean).join('\n');
  }
  function checkAnswer(q,response) {
    const value=String(response??'').trim();
    if(!value) return {complete:false,correct:false};
    if(q.type==='operation') return {complete:true,correct:value===q.expected};
    if(q.type==='value') return {complete:true,correct:value.replace(/^[\s'"“”]+|[\s'"“”]+$/g,'').toLowerCase()===q.expected.toLowerCase()};
    if(q.type==='write') return {complete:true,correct:normaliseStatements(value)===normaliseStatements(q.expected)};
    return {complete:true,correct:false};
  }
  return {OPTIONS, makeQuestion,checkAnswer,normaliseStatements};
});
