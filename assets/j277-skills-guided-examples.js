/* Question-aware, separate worked examples for OCR J277 coding Skills.
   The active question is used only to select the concept, never as the
   worked answer. All examples are revealed a step at a time. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.J277SkillsGuidedExamples = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const titles = {
    variables:'Variables & Constants','data-types':'Data Types',casting:'Casting',operators:'Operators',
    comparisons:'Comparisons',sequence:'Sequence',selection:'Selection',
    'for-loops':'FOR Loops','while-until':'WHILE / UNTIL',
    'array-1d':'1D Arrays','array-2d':'2D Arrays',records:'Records'
  };
  function worked(skill, task, lines, notes, end, labels, executionPath) {
    if (!executionPath && lines.length !== notes.length) throw new Error('Every demo line needs its own explanation.');
    if (executionPath && (executionPath.length !== notes.length ||
      executionPath.some(line => !Number.isInteger(line) || line < 1 || line > lines.length))) {
      throw new Error('Every executed step must point to a real code line.');
    }
    return {
      title:titles[skill], task:'Similar example: ' + task,
      codeLabel:'OCR ERL · DIFFERENT EXAMPLE FROM YOUR QUESTION',
      traceTitle:'Build and understand the method',
      columns:labels || ['Action','Why / result'],
      lines, progressive:true,
      // Conditional branches can jump past source lines which do not execute.
      showAllCode:!!executionPath,
      skippedLines:executionPath ? lines.map((_,i)=>i+1).filter(n=>!executionPath.includes(n)) : [],
      placeholders:lines.map((_,i)=>'Step '+(i+1)+' …'),
      steps:notes.map((note,i)=>[executionPath ? executionPath[i] : i+1,note[0],note[1],note[2]]),end
    };
  }
  const d=(skill,task,lines,notes,end,executionPath)=>worked(skill,task,lines,notes,end,undefined,executionPath);
  const typeValues={
    Integer:['pupils = 23','23','Integer','A whole number with no decimal point.'],
    Real:['temperature = 18.75','18.75','Real','A decimal number.'],
    Boolean:['ready = False','False','Boolean','Only True or False.'],
    Character:["initial = 'K'","'K'",'Character','One character in quotes.'],
    String:['colour = "Green"','"Green"','String','Several characters of text in quotes.']
  };
  function variables(q) {
    if(q.level==='easy' && q.type==='identify')return d('variables',
      'tell a fixed constant from a changing variable.',
      ['MAX_AGE = 18    // constant','age = 12    // variable','age = age + 1'],
      [['MAX_AGE','18','The constant stays at 18.'],['age','12','A variable holds a value that may change.'],['age','13','Only the variable changes; the constant remains 18.']],
      'MAX_AGE is the constant. age is the variable.');
    if(q.level==='hard')return d('variables',
      'store a value and change it using one chosen variable name.',
      ['tickets = 6','tickets = tickets + 3'],
      [['tickets','6','Store the initial value.'],['tickets','9','Read the old tickets value on the right, then store the new value on the left.']],
      'Final value: 9. You can choose a different valid variable name.');
    return d('variables','trace a different changing variable.',
      ['lives = 5','lives = lives - 2','lives = 7'],
      [['lives','5','Store the starting value.'],['lives','3','Use the old value: 5 − 2.'],['lives','7','The last assignment replaces 3 with 7.']],
      'Final value: 7. Each assignment updates what is stored.');
  }
  function dataTypes(q) {
    if(q.level==='medium')return d('data-types','classify three different values.',
      ['count = 8','wet = False','city = "York"'],
      [['count','Integer','8 has no decimal point.'],['wet','Boolean','False is a Boolean value.'],['city','String','"York" is text, not a number.']],
      'Types: Integer, Boolean, String. Look at the value, not the variable name.');
    const key=q.level==='easy'?q.expected:(q.expected||'Character');
    const v=typeValues[key]||typeValues.Character;
    if(q.level==='hard')return d('data-types','store a different value with a meaningful variable name.',
      [v[0]],[[v[1],v[2],v[3]+' The name on the left is chosen by the programmer.']],
      'Use variable = value. A suitable name is not fixed.');
    return d('data-types','identify the type of a different value.',
      [v[0]],[[v[1],v[2],v[3]]],'Type: '+v[2]+'.');
  }
  function casting(q) {
    const kind=q.cast || (q.level==='medium'?'int':'int');
    const forms={
      int:['whole = int("14")','14 · Integer','int() changes number-shaped text into a whole number.'],
      real:['price = real("6.5")','6.5 · Real','real() makes a decimal number.'],
      str:['label = str(42)','"42" · String','str() changes a number into text.'],
      bool:['flag = bool(1)','True · Boolean','bool() converts a truth-like value into a Boolean.']
    };
    const a=forms[kind]||forms.int;
    if(q.level==='medium')return d('casting','trace how text and numbers behave differently.',
      ['a = "4"','b = int(a)','total = b + 3','print(total)'],
      [['a','"4"','Quotes make this text.'],['b','4','int() changes the type to Integer.'],['total','7','The + now adds two numbers.'],['Output','7','The Integer result is printed.']],
      'Output: 7. Without int(), adding text could join strings instead.');
    return d('casting','convert a different value using the same kind of function.',
      [a[0]],[[kind+'()',a[1],a[2]]],
      'The cast wraps the value in brackets. Store the converted result if the task requires it.');
  }
  function operators(q) {
    const op=q.level==='easy'?q.expected:(q.level==='medium'?(q.code.join(' ').match(/\s(DIV|MOD|\^|[+*/−-])\s/i)||[])[1]:null);
    const cases={
      '+':['a = 8 + 6','14','Add the operands.'],
      '-':['a = 15 - 7','8','Subtract the second number.'],
      '−':['a = 15 - 7','8','Subtract the second number.'],
      '×':['a = 5 * 4','20','Multiply the operands.'],
      '*':['a = 5 * 4','20','Multiply the operands.'],
      '/':['a = 15 / 4','3.75','Ordinary division can leave a decimal.'],
      'DIV':['a = 19 DIV 4','4','DIV keeps the whole-number quotient.'],
      'MOD':['a = 19 MOD 4','3','MOD finds the remainder.'],
      '^':['a = 2 ^ 4','16','2 to the power of 4 is 2 × 2 × 2 × 2.']
    };
    let a=cases[String(op||'DIV').toUpperCase()]||cases[op]||cases.DIV;
    if(q.level==='hard')return d('operators','read a number, calculate with it, then print.',
      ['n = int(input("Number"))','result = n DIV 4','print(result)'],
      [['n','Input','Store a whole-number input first.'],['result','Calculation','Choose the operator and use the variable, not a fixed input.'],['Output','result','Print the calculated value.']],
      'Input → calculate → output. Test with several inputs.');
    return d('operators','work out a different calculation.',[a[0],'print(a)'],
      [['a',a[1],a[2]],['Output',a[1],'Print the calculated value.']],
      'Output: '+a[1]+'.');
  }
  function comparisons(q) {
    if(q.level==='hard')return d('comparisons','express an age rule as a Boolean condition.',
      ['allowed = age >= 16','print(allowed)'],
      [['Comparison','age >= 16','>= includes age 16 as well as ages above 16.'],['Output','True / False','A comparison produces a Boolean.']],
      'If age is 16, the condition is True; at 15 it is False.');
    if(q.level==='medium')return d('comparisons','compare two other values and trace True or False.',
      ['a = 9','b = 4','same = a == b','print(same)'],
      [['a','9','Store the first number.'],['b','4','Store the second number.'],['same','False','9 == 4 is False. == checks equality.'],['Output','False','Print the Boolean, not a number.']],
      'Output: False. Check both values before evaluating the comparison.');
    const op=q.expected||'==';
    const examples={'==':['a == b','Equal','True only when both values match.'],
      '!=':['a != b','Not equal','True when the values differ.'],
      '<':['a < b','Less than','True when a is smaller than b.'],
      '<=':['a <= b','At most','True for smaller or equal.'],
      '>':['a > b','Greater than','True when a is larger.'],
      '>=':['a >= b','At least','True for larger or equal.']};
    const a=examples[op]||examples['=='];
    return d('comparisons','read another comparison and what its symbol means.',
      [a[0]],[[a[1],op,a[2]]],a[2]);
  }
  function sequence(q) {
    if(q.level==='easy')return d('sequence','put the stages of a different algorithm in order.',
      ['age = int(input("Age"))','future = age + 2','print(future)'],
      [['Input','age','Get a starting value before using it.'],['Process','age + 2','Do the calculation with the input.'],['Output','future','Print the processed value last.']],
      'The order is Input → Process → Output.');
    if(q.level==='medium')return d('sequence','trace a different three-line program with input 5.',
      ['number = 5','double = number * 2','print(double)'],
      [['number','5','Read the supplied input.'],['double','10','5 multiplied by 2 equals 10.'],['Output','10','Print the latest value.']],
      'Output: 10. Update your trace after each assignment.');
    return d('sequence','write a complete algorithm that triples a number.',
      ['number = int(input("Number"))','answer = number * 3','print(answer)'],
      [['Input','number','Read and store the input.'],['Process','number * 3','Use the input variable for the calculation.'],['Output','answer','Print the result, not the original number.']],
      'A correct algorithm works for any number entered.');
  }
  function selection(q) {
    if(q.level==='medium')return d('selection','trace an ELSEIF chain with a different mark.',
      ['mark = 52','if mark >= 75 then','    print("High")','elseif mark >= 40 then','    print("Pass")','endif'],
      [['mark','52','Store the mark.'],['IF','False','52 is not at least 75, so line 03 is skipped.'],['ELSEIF','True','52 is at least 40.'],['Output','Pass','Run only the first matching branch.'],['End','—','Selection finishes.']],
      'Output: Pass. Line 03 never runs; only the matching branch prints.',[1,2,4,5,6]);
    return d('selection',q.level==='hard'?'write a different IF/ELSE algorithm.':'trace a different IF/ELSE choice.',
      ['age = 14','if age >= 16 then','    print("Eligible")','else','    print("Wait")','endif'],
      [['age','14','Start with the current value.'],['IF','False','14 is below 16, so line 03 is skipped.'],['ELSE','Chosen','The condition was False.'],['Output','Wait','Print only from ELSE.'],['End','—','ENDIF closes the decision.']],
      'Output: Wait. Line 03 never runs; only the ELSE branch prints.',[1,2,4,5,6]);
  }
  function forLoops(q) {
    const easy=q.level==='easy',hard=q.level==='hard';
    const lines=easy?['for i = 2 to 4','    print(i)','next i']:
      hard?['limit = int(input("Limit"))','for i = 1 to limit','    print(i)','next i']:
      ['total = 0','for i = 1 to 3','    total = total + i','next i','print(total)'];
    const steps=[],values=easy?[2,3,4]:[1,2,3];
    let total=0;
    if(!easy)steps.push([1,hard?'3':'—',hard?'limit = 3':'0',hard?'Use the example input 3.':'Start total at zero.']);
    const forLine=easy?1:2,bodyLine=easy?2:3,nextLine=easy?3:4;
    for(const i of values){
      steps.push([forLine,String(i),easy?'Check':'Continue','FOR checks that '+i+' is within the limit.']);
      if(!easy&&!hard)total+=i;
      steps.push([bodyLine,String(i),hard||easy?'Print '+i:String(total),hard||easy?'Run the PRINT statement with i = '+i+'.':'Add '+i+' to the running total.']);
      steps.push([nextLine,String(i+1),hard||easy?'Repeat':String(total),'NEXT increases i, then returns to FOR to check the next value.']);
    }
    steps.push([forLine,String(values.at(-1)+1),'Stop','The counter is beyond the limit, so do not run the body again.']);
    if(!easy&&!hard)steps.push([5,'—','6','Print the final running total.']);
    return {
      title:'FOR Loops',task:'Similar example: '+(easy?'count the iterations from 2 to 4.':hard?'print numbers for a different input of 3.':'trace another running total from 1 to 3.'),
      codeLabel:'OCR ERL · DIFFERENT EXAMPLE FROM YOUR QUESTION',traceTitle:'Follow each loop and return',
      columns:['i','total / output'],lines,steps,
      loopBack:{from:nextLine,to:forLine},
      end:easy?'Outputs: 2, 3, 4. Three complete iterations.':hard?'With limit = 3, output: 1, 2, 3.':'Output: 6 because 1 + 2 + 3 = 6.'
    };
  }
  function whileUntil(q) {
    const until=q.mode==='do';
    const lines=until?['i = 1','do','    print(i)','    i = i + 1','until i > 3']:
      ['i = 1','while i < 4','    print(i)','    i = i + 1','endwhile'];
    const steps=[[1,'1','Start','Set i to 1 before entering the loop.']];
    for(let i=1;i<=3;i++){
      steps.push([2,String(i),until?'DO body':'True','Begin the body.'+(until?' DO does not test first.':' The WHILE condition is True.')]);
      steps.push([3,String(i),'Print '+i,'Print the current value of i.']);
      steps.push([4,String(i+1),'Update','Increase i so the loop can finish.']);
      steps.push([5,String(i+1),until?(i===3?'True · stop':'False · repeat'):'Repeat',until?
        'UNTIL checks i > 3 after the body; '+(i===3?'it is True, so stop.':'it is False, so repeat.'):
        'ENDWHILE goes back to the WHILE condition.']);
    }
    if(!until)steps.push([2,'4','False · stop','WHILE checks 4 < 4 before the body. It is False, so stop.']);
    return {
      title:'WHILE / UNTIL',task:'Similar example: trace a different '+(until?'DO UNTIL':'WHILE')+' loop.',
      codeLabel:'OCR ERL · DIFFERENT EXAMPLE FROM YOUR QUESTION',traceTitle:'Follow each repetition and condition',
      columns:['i / check','Output / effect'],lines,steps,loopBack:{from:5,to:2},
      end:'Outputs: 1, 2, 3. '+(until?'UNTIL stops when its after-body condition becomes True.':'WHILE stops when its before-body condition becomes False.')
    };
  }
  function arrays1d(q) {
    if(q.level==='medium'&&q.code.some(line=>/^for i\s*=/i.test(line))){
      const skip= q.code.some(line=>/\bstep 2\b/i.test(line));
      const data=[3,6,4,2,5], visited=skip?[0,2,4]:[0,1,2,3,4];
      const lines=['array marks = [3, 6, 4, 2, 5]','total = 0',
        'for i = 0 to 4'+(skip?' step 2':''),
        '    total = total + marks[i]','next i','print(total)'];
      const steps=[[1,'Indices','0–4','The five values are stored in order, beginning at index 0.'],
        [2,'total','0','Start the running total at zero.']];
      let total=0;
      visited.forEach(i=>{
        steps.push([3,'i = '+i,'Continue','Index '+i+' is within the loop range.']);
        total+=data[i];
        steps.push([4,'marks['+i+'] = '+data[i],String(total),'Read this array element and add it to total.']);
        steps.push([5,'i → '+(i+(skip?2:1)),String(total),'NEXT advances the index and returns to FOR.']);
      });
      steps.push([3,'i = '+(skip?6:5),'Stop','The index is beyond 4, so the loop body is skipped.']);
      steps.push([6,'Output',String(total),'Print the running total after the loop finishes.']);
      return {title:'1D Arrays',task:'Similar example: '+(skip?'visit every second array index.':'add every value using a FOR loop.'),
        codeLabel:'OCR ERL · DIFFERENT ARRAY FROM YOUR QUESTION',traceTitle:'Follow the array index',
        columns:['Index / action','total'],lines,steps,loopBack:{from:5,to:3},
        end:'Output: '+total+'. The loop stops without reading a cell beyond index 4.'};
    }
    if(q.level==='medium')return d('array-1d','trace another array change before printing.',
      ['array marks = [5, 8, 3]','marks[1] = marks[0] + 4','print(marks[1])'],
      [['Array','[5,8,3]','Indices are 0, 1, 2.'],['Update','marks[1] = 9','Change the second cell using 5 + 4.'],['Output','9','Print the updated value, not 8.']],
      'Output: 9. Assignments overwrite the old cell value.');
    return d('array-1d',q.level==='hard'?'write a statement for a different array index.':'find a different zero-based array position.',
      ['array marks = [5, 8, 3, 6]','print(marks[1])'],
      [['Array','4 cells','The positions are indexed 0,1,2,3.'],['Output','8','Index 1 is the second cell.']],
      'Output: 8. Array indices start at zero.');
  }
  function arrays2d(q) {
    if(q.level==='medium'&&q.code.some(line=>/^for [rc]\s*=/i.test(line))){
      // The practice activity already supplies a starting grid. Model a
      // different, smaller grid without pretending the declaration fills it.
      const grid=[[2,4,6],[3,5,7]];
      const nested=q.code.some(line=>/^\s+for c\s*=/i.test(line));
      const byRow=q.code.some(line=>/^for c\s*=/i.test(line));
      const lines=nested?['total = 0','for r = 0 to 1','    for c = 0 to 2',
        '        total = total + grid[r,c]','    next c','next r','print(total)']:
        ['total = 0',byRow?'for c = 0 to 2':'for r = 0 to 1',
        byRow?'    total = total + grid[1,c]':'    total = total + grid[r,2]',
        byRow?'next c':'next r','print(total)'];
      const steps=[[1,'total','0','Begin with total = 0. The grid values are given above the code.']];
      let total=0;
      if(nested){
        for(let r=0;r<2;r++){
          steps.push([2,'r = '+r,String(total),'The outer loop selects row '+r+'.']);
          for(let c=0;c<3;c++){
            steps.push([3,'c = '+c,String(total),'The inner loop selects column '+c+'.']);
            total+=grid[r][c];
            steps.push([4,'grid['+r+','+c+'] = '+grid[r][c],String(total),'Add the selected cell to total.']);
            steps.push([5,'c → '+(c+1),String(total),'NEXT c returns to the inner loop condition.']);
          }
          steps.push([3,'c = 3',String(total),'Column 3 is out of range, so leave the inner loop.']);
          steps.push([6,'r → '+(r+1),String(total),'NEXT r returns to the outer loop.']);
        }
        steps.push([2,'r = 2',String(total),'Row 2 is out of range, so the outer loop stops.']);
      }else{
        const visits=byRow?[[1,0],[1,1],[1,2]]:[[0,2],[1,2]];
        visits.forEach(([r,c],n)=>{
          steps.push([2,(byRow?'c = '+c:'r = '+r),String(total),'The loop selects the next '+(byRow?'column':'row')+'.']);
          total+=grid[r][c];
          steps.push([3,'grid['+r+','+c+'] = '+grid[r][c],String(total),'Add only the selected cell.']);
          steps.push([4,(byRow?'c':'r')+' → '+(n+1),String(total),'NEXT returns to the loop condition.']);
        });
        steps.push([2,(byRow?'c = 3':'r = 2'),String(total),'The counter is past the last '+(byRow?'column':'row')+', so stop.']);
      }
      steps.push([lines.length,'Output',String(total),'Print the total after every required cell has been visited.']);
      return {title:'2D Arrays',task:'Similar example: '+(nested?'visit every cell using nested FOR loops.':
        byRow?'add one row of a different grid.':'add one column of a different grid.'),
        codeLabel:'Given grid: row 0 [2, 4, 6] · row 1 [3, 5, 7]',
        traceTitle:'Follow row and column indices',columns:['Cell / action','total'],lines,steps,
        loopBack: nested?undefined:{from:4,to:2},
        end:'Output: '+total+'. Row comes first in grid[row,column].'};
    }
    if(q.level==='medium')return d('array-2d','trace a different grid-cell update.',
      ['array grid[2,3]','grid[0,1] = 6','grid[1,2] = grid[0,1] + 2','print(grid[1,2])'],
      [['Grid','2 × 3','Rows 0,1 and columns 0,1,2.'],['Set','[0,1] = 6','The first index names a row.'],['Update','[1,2] = 8','Use 6 + 2 in another cell.'],['Output','8','Print the new value at row 1 column 2.']],
      'Output: 8. Row first, column second.');
    return d('array-2d',q.level==='hard'?'write a statement for another row and column.':'locate another zero-based row and column.',
      ['array grid[2,3]','grid[1,2] = 9','print(grid[1,2])'],
      [['Grid','2 rows, 3 columns','Rows 0–1 and columns 0–2.'],['Position','row 1, column 2','Move to the second row and third column.'],['Output','9','Read grid[1,2].']],
      'Output: 9. The first index is always the row.');
  }
  function records(q) {
    if(q.level==='medium')return d('records','trace a change to one field in a different record.',
      ['book.title = "Dune"','book.pages = 300','book.pages = book.pages + 20','print(book.pages)'],
      [['title','Dune','A String field is stored in the book record.'],['pages','300','A separate Integer field is stored.'],['pages','320','Only pages changes: 300 + 20.'],['Output','320','Print the updated pages field.']],
      'Output: 320. Other fields remain unchanged.');
    return d('records',q.level==='hard'?'write a statement using a different record field.':'identify a different record field.',
      ['book.title = "Dune"','book.pages = 300','print(book.title)'],
      [['title','Dune','The dot identifies the title field.'],['pages','300','One record holds related fields of different types.'],['Output','Dune','book.title reads only the title field.']],
      'Output: Dune. Use recordName.fieldName.');
  }
  const makers={
    variables,'data-types':dataTypes,casting,operators,comparisons,sequence,selection,
    'for-loops':forLoops,'while-until':whileUntil,
    'array-1d':arrays1d,'array-2d':arrays2d,records
  };
  function make(skill,q) {
    if(!makers[skill] || !q || !['easy','medium','hard'].includes(q.level))
      throw new Error('Unknown demo skill or level.');
    return makers[skill](q);
  }
  return {make};
});
