/* OCR J277 Skill 19: computational thinking (abstraction, decomposition,
   algorithmic thinking). Deterministic answer checking; no learner code runs. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.J277Paper2Thinking=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const easy=[
    {example:'A shopping app ignores the colour of the shop walls when working out a bill.',prompt:'Which thinking principle is being used?',answer:'Abstraction',why:'Abstraction removes details that are not needed to solve the problem.'},
    {example:'A game is divided into movement, scoring and collision detection.',prompt:'Which thinking principle is being used?',answer:'Decomposition',why:'Decomposition breaks one large problem into smaller manageable parts.'},
    {example:'A teacher writes exact steps to calculate the class average.',prompt:'Which thinking principle is being used?',answer:'Algorithmic thinking',why:'Algorithmic thinking develops a clear sequence of steps to solve the problem.'},
    {example:'A bus timetable tool keeps route numbers and times but ignores seat fabric.',prompt:'Which principle helps decide what information matters?',answer:'Abstraction',why:'The seat fabric is irrelevant to finding a bus time.'},
    {example:'A website project is split into login, search, results and payments.',prompt:'Which principle is shown?',answer:'Decomposition',why:'Smaller tasks can be planned, tested and improved separately.'},
    {example:'A student describes a recipe using precise instructions in the right order.',prompt:'Which principle is shown?',answer:'Algorithmic thinking',why:'Each action is an ordered instruction that could be followed.'},
    {example:'A weather app represents each day using only temperature and rain chance.',prompt:'What principle removes the unnecessary details?',answer:'Abstraction',why:'A simplified representation keeps only information needed for the task.'},
    {example:'A library system has separate tasks for borrowing, returning and searching.',prompt:'Which principle makes the system easier to manage?',answer:'Decomposition',why:'The main problem is divided into smaller subproblems.'},
    {example:'A program repeats a check for every score, then reports the total.',prompt:'Which principle makes the steps precise and repeatable?',answer:'Algorithmic thinking',why:'A clear sequence with repetition gives a repeatable solution.'},
    {example:'A school map shows classrooms and corridors but not every wall decoration.',prompt:'Which principle is illustrated?',answer:'Abstraction',why:'The map keeps essential features while leaving out irrelevant detail.'}
  ];
  const names=['Abstraction','Decomposition','Algorithmic thinking','Testing'];
  const medium=[
    {kind:'abstraction',problem:'Calculate the price of five cinema tickets.',prompt:'Choose the THREE details needed for this calculation.',
      options:['Number of tickets','Price per ticket','Any discount','Colour of the cinema seats','Poster on the entrance wall'],correct:[0,1,2],
      why:'The calculation needs quantity, price and discount. Seat colours and posters are irrelevant.'},
    {kind:'decomposition',problem:'Create a lunch ordering system.',prompt:'Choose the THREE useful smaller tasks.',
      options:['Collect the meal choices','Calculate the total price','Confirm the order','Choose a colour for every plate','Count the classroom windows'],correct:[0,1,2],
      why:'A useful breakdown handles choices, totals and confirmation.'},
    {kind:'abstraction',problem:'Find the quickest bus journey to school.',prompt:'Choose the THREE relevant details.',
      options:['Bus routes','Departure times','Journey durations','Colour of the bus seats','Driver favourite music'],correct:[0,1,2],
      why:'Routes and times matter to journey planning; seat colours and music do not.'},
    {kind:'decomposition',problem:'Design a quiz game.',prompt:'Choose the THREE sensible subproblems.',
      options:['Show a question','Check the answer','Update the score','Paint the classroom door','Ask for a shoe size'],correct:[0,1,2],
      why:'The quiz can be built from separate display, checking and scoring tasks.'},
    {kind:'abstraction',problem:'Calculate a student attendance percentage.',prompt:'Choose the THREE details that matter.',
      options:['Sessions attended','Sessions possible','Whether the register is complete','Colour of the exercise book','Student favourite football team'],correct:[0,1,2],
      why:'Attendance data is relevant. Personal preferences are not.'},
    {kind:'decomposition',problem:'Make a digital library borrowing system.',prompt:'Choose the THREE manageable parts.',
      options:['Find the book','Check availability','Record the loan','Choose the librarian coffee','Measure shelf paint'],correct:[0,1,2],
      why:'Searching, checking and recording form useful separate tasks.'},
    {kind:'abstraction',problem:'Work out the average score from ten tests.',prompt:'Choose the THREE useful details.',
      options:['The ten scores','Number of scores','Any missing scores to exclude','Colour of the test paper','Pen brand used'],correct:[0,1,2],
      why:'The scores, count and missing-value rule determine the average.'},
    {kind:'decomposition',problem:'Create a cinema booking system.',prompt:'Choose the THREE sensible subproblems.',
      options:['Pick a showing','Choose available seats','Take payment','Change the lobby wallpaper','Write a song for the seats'],correct:[0,1,2],
      why:'Showing, seats and payment are separable booking tasks.'},
    {kind:'abstraction',problem:'Build a simple weather warning alert.',prompt:'Choose the THREE details that matter.',
      options:['Temperature','Wind speed','Rainfall forecast','Weather presenter clothing','Shape of the studio desk'],correct:[0,1,2],
      why:'The alert uses weather measurements, not the TV studio.'},
    {kind:'decomposition',problem:'Build a school trip registration page.',prompt:'Choose the THREE useful subproblems.',
      options:['Collect student details','Check remaining places','Confirm registration','Choose the teacher lunch','Sort the pencils by colour'],correct:[0,1,2],
      why:'Collection, capacity checking and confirmation divide the work sensibly.'}
  ];
  const hard=[
    ['Late arrivals','number of late marks from attendance records','attendance records','countLate(records)','lateCount','a record shows a late mark','increase lateCount by 1','return and display lateCount'],
    ['Quiz scores','number of quiz scores at or above the pass mark','scores and pass mark','countPasses(scores,passMark)','passes','a score meets passMark','increase passes by 1','return and display passes'],
    ['Shop basket','sum of basket prices above the discount threshold','prices and threshold','sumHighPrices(prices,threshold)','total','a price is greater than threshold','add the price to total','return and display total'],
    ['Sports results','number of wins in the match results','match results','countWins(results)','wins','a result equals "Win"','increase wins by 1','return and display wins'],
    ['Library loans','number of books that are overdue','book loan records','countOverdue(loans)','overdue','a due date is before today','increase overdue by 1','return and display overdue'],
    ['Temperature checks','number of temperatures above the warning limit','temperatures and warning limit','countWarnings(temps,limit)','warnings','a temperature is above limit','increase warnings by 1','return and display warnings'],
    ['Bus passengers','number of buses with more than 30 passengers','passenger counts','countBusyBuses(counts)','busy','a count is over 30','increase busy by 1','return and display busy'],
    ['Exam grades','number of grades at or above the target grade','grades and target','countTargets(grades,target)','matches','a grade meets the target','increase matches by 1','return and display matches'],
    ['Game points','sum of positive scores from all rounds','round scores','sumPositive(scores)','total','a round score is positive','add the score to total','return and display total'],
    ['Sports day','number of race times faster than the target','race times and target','countFast(times,target)','fast','a time is below target','increase fast by 1','return and display fast']
  ];
  function plan(c){
    const [title,goal,inputs,subprogram,variable,test,change,result]=c;
    return [
      'Keep only '+inputs+' as inputs',
      'Split out a subprogram: '+subprogram,
      'Set '+variable+' = 0',
      'Repeat through every relevant record',
      'IF '+test+', '+change,
      'Finish the loop, then '+result
    ];
  }
  const irrelevant=[
    'Store the colour of the screen border',
    'Repeat the whole program forever',
    'Choose a background photograph',
    'Ignore all the input values',
    'Ask for an unrelated favourite food',
    'Print a result before processing any records',
    'Measure the classroom furniture',
    'Skip every record after the first',
    'Choose a new logo for each record',
    'Ignore the condition and count everything'
  ];
  function mix(items,seed){
    // Stable question-specific order, so a replay is varied without changing the answer.
    const arr=items.map((value,i)=>({id:i,label:value}));let n=((seed>>>0)||1);
    for(let i=arr.length-1;i>0;i--){n=(Math.imul(n,1664525)+1013904223)>>>0;const j=n%(i+1);[arr[i],arr[j]]=[arr[j],arr[i]];}
    return arr;
  }
  function makeQuestion(level,index,seed=1){
    if(!['easy','medium','hard'].includes(level)||!Number.isInteger(index)||index<0||index>=10)throw Error('Invalid thinking question');
    if(level==='easy'){
      const q=easy[index];return {level,index,type:'choose',prompt:q.prompt,context:q.example,
        options:mix(names,seed+index*41),expected:q.answer,model:q.answer,
        hint:'Abstraction removes detail. Decomposition divides a task. Algorithmic thinking orders the steps.',
        explanation:q.why};
    }
    if(level==='medium'){
      const q=medium[index];return {level,index,type:'multi',prompt:q.prompt,context:q.problem,
        options:mix(q.options,seed+index*41),expected:q.correct,model:q.correct.map(i=>q.options[i]).join('\n'),
        hint:q.kind==='abstraction'?'Ignore details that do not affect the answer.':'Think about the main parts that need their own job.',
        explanation:q.why};
    }
    const q=hard[index],steps=plan(q);
    return {level,index,type:'order',prompt:'Design a plan: '+q[0]+'.',context:'Goal: work out the '+q[1]+'. Choose SIX useful steps in the correct design order. Two cards are unnecessary.',
      options:mix([...steps,irrelevant[index],irrelevant[(index+3)%10]],seed+index*41),
      expected:[0,1,2,3,4,5],model:steps.map((x,i)=>(i+1)+'. '+x).join('\n'),
      hint:'Start with abstraction (inputs), then decomposition (subprogram), then an algorithm with initialisation, repetition, selection and output.',
      explanation:'Your plan keeps relevant data, separates a subproblem and orders the processing steps.'};
  }
  function checkAnswer(q,response){
    if(q.type==='choose')return {complete:typeof response==='string'&&response.length>0,correct:response===q.expected};
    if(!Array.isArray(response)||response.length<(q.type==='multi'?3:6))return {complete:false,correct:false};
    if(q.type==='multi')return {complete:true,correct:response.length===3&&
      response.every(id=>q.expected.includes(id))&&new Set(response).size===3};
    return {complete:true,correct:response.length===6&&
      response.every((id,i)=>id===q.expected[i])};
  }
  function makeDemo(q){
    if(q.level==='easy')return {title:'Computational Thinking',task:'Similar example: plan a journey app using the three thinking principles.',
      codeLabel:'Three ways to think',traceTitle:'Reasoning steps',columns:['Principle','Purpose'],entryLine:1,
      lines:['START: plan a journey app','Keep routes and times; ignore bus colours','Split into search, compare, display','Order the actions into a repeatable plan'],
      steps:[[1,'START HERE','Journey app','Understand the problem first.'],[2,'Abstraction','Routes and times','Keep the data that affects the answer.'],
        [3,'Decomposition','Three jobs','Break the solution into smaller tasks.'],[4,'Algorithmic thinking','Ordered plan','Describe steps that someone can follow.']],
      end:'Abstraction, decomposition and algorithmic thinking work together.',progressive:true,showAllCode:true};
    if(q.level==='medium')return {title:'Computational Thinking',task:'Similar example: break a library checkout into useful parts.',
      codeLabel:'Abstraction + decomposition',traceTitle:'Useful information',columns:['Choice','Reason'],entryLine:1,
      lines:['START: lend a library book','Keep book ID, borrower and due date','Ignore shelf paint and cover colour','Split into find, check and record','Order the checks before confirming the loan'],
      steps:[[1,'START HERE','Library loan','Understand what needs to happen.'],
        [2,'Keep','Essential data','These details affect the loan.'],[3,'Ignore','Decoration','These do not change the decision.'],
        [4,'Decompose','Three jobs','Find, check and record can be planned separately.'],[5,'Sequence','Check then confirm','A clear order avoids an invalid loan.']],
      end:'Relevant data and manageable parts make the solution easier to design.',progressive:true,showAllCode:true};
    return {title:'Computational Thinking',task:'Similar example: design a plan for counting passing scores before writing code.',
      codeLabel:'Inputs → subprogram → repetition → selection → result',traceTitle:'Build the plan',columns:['Step','Decision'],entryLine:1,
      lines:['START: count passing quiz scores','Keep scores and passMark; ignore decoration','Separate countPasses(scores,passMark)','Set passes to 0','Repeat for every score','If score >= passMark, add 1 to passes','Return passes and display the result'],
      steps:[[1,'START HERE','Pass counter','Read the goal: how many scores meet the pass mark?'],
        [2,'Abstraction','scores + passMark','Keep only data needed for the answer.'],
        [3,'Decomposition','countPasses','Give the counting job its own subprogram.'],
        [4,'Initialise','passes = 0','Start the accumulator.'],
        [5,'Iteration','FOR each score','Apply the same check to every item.'],
        [6,'Selection','IF score >= passMark','Count only matching scores.'],
        [7,'Result','Return and display','Use the subprogram output to answer the problem.']],
      end:'A clear design can be checked before writing OCR ERL code.',progressive:true,showAllCode:true};
  }
  return {makeQuestion,checkAnswer,makeDemo,hardCases:hard};
});
