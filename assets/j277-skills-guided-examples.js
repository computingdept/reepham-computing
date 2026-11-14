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
  function worked(skill, task, lines, notes, end, labels) {
    if (lines.length !== notes.length) throw new Error('Every demo line needs its own explanation.');
    return {
      title:titles[skill], task:'Similar example: ' + task,
      codeLabel:'OCR ERL · DIFFERENT EXAMPLE FROM YOUR QUESTION',
      traceTitle:'Build and understand the method',
      columns:labels || ['Action','Why / result'],
      lines, progressive:true,
      placeholders:lines.map((_,i)=>'Step '+(i+1)+' …'),
      steps:notes.map((note,i)=>[i+1,note[0],note[1],note[2]]),end
    };
  }
  const d=(skill,task,lines,notes,end)=>worked(skill,task,lines,notes,end);
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
      [['mark','52','Store the mark.'],['IF','False','52 is not at least 75.'],['Skip','High','Do not print from a failed branch.'],['ELSEIF','True','52 is at least 40.'],['Output','Pass','Run only the first matching branch.'],['End','—','Selection finishes.']],
      'Output: Pass. Check IF before ELSEIF, and stop at the first True condition.');
    return d('selection',q.level==='hard'?'write a different IF/ELSE algorithm.':'trace a different IF/ELSE choice.',
      ['age = 14','if age >= 16 then','    print("Eligible")','else','    print("Wait")','endif'],
      [['age','14','Start with the current value.'],['IF','False','14 is below 16.'],['Skip','Eligible','This branch does not run.'],['ELSE','Chosen','The condition was False.'],['Output','Wait','Print only from ELSE.'],['End','—','ENDIF closes the decision.']],
      'Output: Wait. One IF/ELSE decision runs one branch.');
  }
  function forLoops(q) {
    if(q.level==='easy')return d('for-loops','count a different inclusive FOR loop.',
      ['for counter = 2 to 6','    print(counter)','next counter'],
      [['Counter','2,3,4,5,6','TO includes the ending value.'],['Output','2 3 4 5 6','The body runs once per counter value.'],['NEXT','Stop after 6','The loop finishes when the counter passes 6.']],
      'There are 5 iterations, not 4.');
    if(q.level==='medium')return d('for-loops','trace another running total.',
      ['total = 0','for i = 1 to 3','    total = total + i','next i','print(total)'],
      [['total','0','Begin at zero.'],['i','1,2,3','The counter takes 1, 2 and 3.'],['total','1→3→6','Add each counter value to the previous total.'],['NEXT','Finish','After i=3 the loop ends.'],['Output','6','Print the accumulated total.']],
      'Output: 6 because 1 + 2 + 3 = 6.');
    return d('for-loops','print from 1 to a different entered limit.',
      ['limit = int(input("Limit"))','for i = 1 to limit','    print(i)','next i'],
      [['Input','limit','Read the limit before the loop.'],['FOR','1 to limit','Run from 1 up to and including the input.'],['Output','i','Print the changing counter.'],['NEXT','i grows','Continue to the next value and then stop.']],
      'The same algorithm handles limit 2, 5 or 10.');
  }
  function whileUntil(q) {
    const until=q.mode==='do';
    if(until)return d('while-until','trace a different DO UNTIL loop.',
      ['i = 1','do','    print(i)','    i = i + 1','until i > 3'],
      [['i','1','Start the counter at 1.'],['DO','First run','DO always runs the body before testing.'],['Output','1,2,3','Print during each repetition.'],['Update','2,3,4','Increase i, so the loop can finish.'],['UNTIL','4 > 3','Stop when this condition becomes True.']],
      'Outputs: 1, 2, 3. DO UNTIL checks after the body.');
    return d('while-until','trace a different WHILE loop.',
      ['i = 1','while i < 4','    print(i)','    i = i + 1','endwhile'],
      [['i','1','Set a starting value.'],['WHILE','True for 1,2,3','Check the condition before each repetition.'],['Output','1,2,3','Print only while the test is True.'],['Update','2,3,4','Move towards the stopping value.'],['ENDWHILE','Stop at 4','At 4 the condition becomes False.']],
      'Outputs: 1, 2, 3. WHILE checks before the body.');
  }
  function arrays1d(q) {
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
