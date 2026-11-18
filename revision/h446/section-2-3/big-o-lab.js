/* H446 2.3.1(c–d): one lab for recognising, calculating, comparing and justifying Big O.
   All worked examples and marking explanations are original. */
(() => {
  'use strict';
  const KEY = 'rhsc-h446-big-o-skill-lab-v1';
  const complexity = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'];
  const levels = {
    easy: [
      {stage:'Recognise',title:'Read one item',instruction:'The array has n items. How does the work grow as n increases?',kind:'code',example:'int first = numbers[0];',type:'single',prompt:'Choose the time complexity.',options:complexity,answer:'O(1)',hint:'The code reads one known position. It does not visit the other items.',why:'One array access takes a constant number of operations, regardless of n. Therefore the time complexity is O(1).'},
      {stage:'Calculate',title:'Count one full loop',instruction:'Start with n = 8. Each pass prints one number.',kind:'code',example:'for (int i = 0; i < n; i++)\n{\n    Console.WriteLine(i);\n}',type:'dual',prompt:'Find the number of prints and the growth order.',countLabel:'How many prints when n = 8?',answerCount:8,answer:'O(n)',hint:'List the values of i: 0, 1, 2, ... 7.',why:'There are 8 prints when n is 8. In general, the loop runs n times, so the time complexity is O(n).'},
      {stage:'Calculate',title:'Count a loop inside a loop',instruction:'Both loops run from 0 to n − 1. Take n = 4.',kind:'code',example:'for (int i = 0; i < n; i++)\n{\n    for (int j = 0; j < n; j++)\n        Console.WriteLine(i + j);\n}',type:'dual',prompt:'Count the prints and classify the growth.',countLabel:'How many prints when n = 4?',answerCount:16,answer:'O(n²)',hint:'For every one of the 4 outer passes, the inner loop prints 4 times.',why:'4 × 4 = 16 prints. For input size n the two full nested loops perform n × n = n² prints, giving O(n²).'},
      {stage:'Compare',title:'Choose a search method',instruction:'A sorted list is doubling in size. Which algorithm grows more slowly in the worst case?',kind:'scenario',example:'Linear search checks items one by one.\nBinary search repeatedly halves the remaining sorted list.',type:'single',prompt:'Which has the better growth order?',options:['Linear search: O(n)','Binary search: O(log n)','They always do the same work','Neither can search a sorted list'],answer:'Binary search: O(log n)',hint:'Which search removes roughly half the possibilities at each step?',why:'Binary search is O(log n) in the worst case because each step halves the search space. Linear search is O(n) in the worst case.'},
      {stage:'Justify',title:'Explain why binary search is quicker',instruction:'Select the TWO statements that correctly justify its efficiency for a sorted list.',kind:'scenario',example:'An array contains thousands of items in ascending order.\nA linear search and a binary search are both available.',type:'multi',prompt:'Choose exactly two correct reasons.',options:['Binary search removes about half the remaining candidates each step.','The list must be sorted for ordinary binary search.','Binary search always uses only one comparison.','Linear search cannot be used with sorted data.'],answer:[0,1],hint:'Think about what happens after each comparison, and what the data must look like before searching.',why:'Binary search requires sorted data and roughly halves the remaining candidates. It is not always a single comparison, and linear search can still scan sorted data.'}
    ],
    medium: [
      {stage:'Recognise',title:'Two loops, one after the other',instruction:'The loops are consecutive, not nested. Take n = 30.',kind:'code',example:'for (int i = 0; i < n; i++)\n    total++;\nfor (int j = 0; j < n; j++)\n    total++;',type:'dual',prompt:'How many increments, and what is the Big O?',countLabel:'Total increments when n = 30',answerCount:60,answer:'O(n)',hint:'Add the two loop counts. Do not multiply them.',why:'There are n + n = 2n increments, so 60 when n = 30. Big O ignores the constant factor 2: O(n).'},
      {stage:'Calculate',title:'Nested loop with half the work',instruction:'The inner loop runs n/2 times for each outer pass. Take n = 8.',kind:'code',example:'for (int i = 0; i < n; i++)\n{\n    for (int j = 0; j < n / 2; j++)\n        total++;\n}',type:'dual',prompt:'Count the increments and classify the growth.',countLabel:'Increments when n = 8',answerCount:32,answer:'O(n²)',hint:'Eight outer passes × four inner passes. For general n this is n × (n / 2).',why:'8 × 4 = 32. In general n × (n/2) = n²/2, and ignoring the constant factor gives O(n²).'},
      {stage:'Calculate',title:'Keep halving the value',instruction:'The number begins at 64. Count every execution of the loop body.',kind:'code',example:'int size = 64;\nwhile (size > 1)\n{\n    size = size / 2;\n}',type:'dual',prompt:'Count the halvings and identify the growth.',countLabel:'Number of loop passes',answerCount:6,answer:'O(log n)',hint:'Write the sequence: 64 → 32 → 16 → ... → 1.',why:'64 → 32 → 16 → 8 → 4 → 2 → 1 takes six halvings. For general input n, repeatedly halving has O(log n) time.'},
      {stage:'Compare',title:'Compare two sorting methods',instruction:'Use simplified growth counts for n = 128, where log₂ 128 = 7.',kind:'table',example:[['Bubble sort worst case','n²','16,384'],['Merge sort worst case','n × log₂ n','896']],type:'single',prompt:'Which has the lower asymptotic growth as n increases?',options:['Bubble sort: O(n²)','Merge sort: O(n log n)','Both are O(n)','Cannot compare growth rates'],answer:'Merge sort: O(n log n)',hint:'Compare n² with n multiplied by the number of times n can be halved.',why:'O(n log n) grows more slowly than O(n²) for large n. These are illustrative growth counts, not promised exact comparisons or run times.'},
      {stage:'Justify',title:'Explain Dijkstra’s O(V²)',instruction:'This implementation scans all V vertices to find the smallest unvisited distance, repeating that selection up to V times.',kind:'scenario',example:'ChooseMinUnvisited(): scan V vertices\nRepeat until all V vertices are settled',type:'multi',prompt:'Select TWO reasons for O(V²) selection time.',options:['A full selection scan can examine V vertices.','The scan may be repeated V times.','Every edge must have the same weight.','The graph has to contain V² edges.'],answer:[0,1],hint:'Count the work in one scan, then count the number of scans.',why:'Scanning up to V vertices on each of up to V selections costs O(V²). It does not require V² edges or equal edge weights.'}
    ],
    hard: [
      {stage:'Calculate',title:'Combine quadratic and linear work',instruction:'The first pair of loops is nested; the final loop is separate. Take n = 10.',kind:'code',example:'for (int i = 0; i < n; i++)\n    for (int j = 0; j < n; j++)\n        total++;\nfor (int k = 0; k < n; k++)\n    total++;',type:'dual',prompt:'How many increments, and what is the overall Big O?',countLabel:'Increments when n = 10',answerCount:110,answer:'O(n²)',hint:'There are n² increments followed by another n. Keep the fastest-growing term.',why:'10² + 10 = 110 increments. In general n² + n is dominated by n² for large n, giving O(n²).'},
      {stage:'Recognise',title:'Two recursive branches',instruction:'Every call with depth greater than zero makes TWO further calls. At depth 5, how many base-case calls occur?',kind:'code',example:'void Branch(int depth)\n{\n    if (depth == 0) return;\n    Branch(depth - 1);\n    Branch(depth - 1);\n}',type:'dual',prompt:'Calculate the leaf calls and classify the growth.',countLabel:'Base-case calls at depth 5',answerCount:32,answer:'O(2ⁿ)',hint:'Each level doubles the leaves: 1, 2, 4, 8, 16, 32.',why:'At depth n there are 2ⁿ leaf calls, so 32 at depth 5. The total number of calls also grows as O(2ⁿ).'},
      {stage:'Calculate',title:'Work out n log n',instruction:'Assume an algorithm has illustrative work n × log₂ n. Set n = 64.',kind:'scenario',example:'n = 64\nlog₂ 64 = 6\nEstimated work = n × log₂ n',type:'dual',prompt:'Calculate the illustrative work and the order.',countLabel:'Value of 64 × log₂ 64',answerCount:384,answer:'O(n log n)',hint:'64 can be halved six times before reaching 1. Multiply 64 by 6.',why:'64 × 6 = 384. O(n log n) arises when there is linear work across logarithmically many levels, as in merge sort.'},
      {stage:'Compare',title:'Time and extra memory differ',instruction:'Compare iterative and recursive binary search on a sorted array. Select TWO true statements.',kind:'scenario',example:'Both methods halve the search range.\nIterative version: loops and index variables.\nRecursive version: a new call for each half.',type:'multi',prompt:'Choose exactly two true statements.',options:['Both have O(log n) worst-case time.','The iterative version uses O(1) auxiliary space.','The recursive version always uses O(1) auxiliary space.','Binary search needs O(n²) time.'],answer:[0,1],hint:'Distinguish the number of comparisons from the number of active call frames.',why:'Both methods take O(log n) worst-case time. Iterative binary search uses O(1) auxiliary space; the ordinary recursive form uses O(log n) call-stack space.'},
      {stage:'Justify',title:'Defend a data structure choice',instruction:'A large collection supports many searches. Keys are held either in an unsorted list or in a balanced binary search tree.',kind:'scenario',example:'Unsorted list: scan entries until key is found.\nBalanced BST: compare with node and choose one branch.',type:'multi',prompt:'Select TWO claims you can justify.',options:['The balanced BST can search in O(log n) worst-case time.','An unsorted list may need O(n) time to find a key.','Any binary tree always gives O(log n) search.','An unsorted list always searches in O(1) time.'],answer:[0,1],hint:'Balanced means the tree stays shallow. Unsorted linear search may inspect every item.',why:'A balanced BST has O(log n) worst-case search, while a linear scan of an unsorted list has O(n) worst-case search. An unbalanced tree can still become linear.'}
    ]
  };

  const $ = id => document.getElementById(id);
  const stored = (() => { try { const v = JSON.parse(localStorage.getItem(KEY) || '{}'); return v && typeof v === 'object' ? v : {}; } catch { return {}; } })();
  const records = ['easy','medium','hard'].reduce((acc, level) => {acc[level] = Array.isArray(stored[level]) ? stored[level].slice(0,5) : [];return acc;}, {});
  let level = 'easy', index = 0, hintUsed = false, modelUsed = false, checkedCorrect = false, demoStep = 0;
  const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function save() { try { localStorage.setItem(KEY, JSON.stringify(records)); } catch { /* private browsing may block saving */ } }
  function answerMarkup(task) {
    if (task.type === 'single' || task.type === 'multi') return '<fieldset class="choice-list"><legend>' + escape(task.prompt) + '</legend>' + task.options.map((opt, i) => '<label class="choice"><input type="' + (task.type === 'multi' ? 'checkbox' : 'radio') + '" name="choice" value="' + i + '"><span>' + escape(opt) + '</span></label>').join('') + '</fieldset>';
    return '<label class="field">' + escape(task.countLabel) + '<input id="numeric-answer" type="number" step="1" inputmode="numeric" autocomplete="off" placeholder="Enter a number"></label><label class="field">Time complexity<select id="complexity-answer"><option value="">Choose one...</option>' + complexity.map(c => '<option value="' + escape(c) + '">' + escape(c) + '</option>').join('') + '</select></label><p class="field-note">Give both answers before checking.</p>';
  }
  function exampleMarkup(task) {
    if (task.kind === 'table') return '<p class="example-label">Simplified growth comparison</p><table class="growth"><thead><tr><th>Algorithm</th><th>Expression</th><th>When n = 128</th></tr></thead><tbody>' + task.example.map(r => '<tr>' + r.map(c => '<td>' + escape(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table>';
    if (task.kind === 'code') return '<p class="example-label">C# code</p><pre><code>' + escape(task.example) + '</code></pre>';
    return '<p class="example-label">Situation</p><p class="scenario">' + escape(task.example).replace(/\n/g, '<br>') + '</p>';
  }
  function stats() {
    const rs = records[level];
    const attempted = rs.filter(r => r && r.attempted).length;
    const first = rs.filter(r => r && r.firstCorrect).length;
    $('score').textContent = 'Independent first checks: ' + first + ' / 5';
    $('progress').value = attempted;
    $('completion').textContent = attempted + ' checked';
    return {attempted,first};
  }
  function render() {
    hintUsed = false;modelUsed = false;checkedCorrect = false;
    const task = levels[level][index];
    $('stage').textContent = String(index+1).padStart(2,'0') + ' · ' + task.stage.toUpperCase();
    $('position').textContent = 'Challenge ' + (index+1) + ' of 5';
    $('task-title').textContent = task.title;
    $('instruction').textContent = task.instruction;
    $('example').innerHTML = exampleMarkup(task);
    $('response').innerHTML = answerMarkup(task);
    $('feedback').hidden = true;$('feedback').textContent = '';
    $('explanation').hidden = true;$('explanation').innerHTML = '';
    $('check').disabled = false;
    $('next').textContent = index===4 ? 'Start again ↻' : 'Next →';
    document.querySelectorAll('[data-level]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.level===level)));
    stats();
  }
  function currentAnswer(task) {
    if(task.type==='single') {const checked=document.querySelector('input[name="choice"]:checked');return checked ? task.options[Number(checked.value)] : null;}
    if(task.type==='multi') return [...document.querySelectorAll('input[name="choice"]:checked')].map(e=>Number(e.value));
    const num=$('numeric-answer').value.trim(), comp=$('complexity-answer').value;
    if(num==='' || comp==='')return null;
    return {count:Number(num),complexity:comp};
  }
  function correctAnswer(task, answer) {
    if(task.type==='single')return answer===task.answer;
    if(task.type==='multi')return answer.length===task.answer.length && task.answer.every(v=>answer.includes(v));
    return answer.count===task.answerCount && answer.complexity===task.answer;
  }
  function displayFeedback(message, success) {
    const box=$('feedback');box.hidden=false;box.className='feedback '+(success?'correct':'retry');box.textContent=message;
  }
  function reveal(label, text) {const box=$('explanation');box.hidden=false;box.innerHTML='<strong>'+escape(label)+'</strong><p>'+escape(text)+'</p>';}
  $('check').addEventListener('click', () => {
    const task=levels[level][index], answer=currentAnswer(task);
    if(answer===null || (task.type==='multi' && answer.length!==2)) {displayFeedback(task.type==='multi'?'Select exactly two statements before checking.':'Enter both answers or choose an option first.',false);return;}
    const passed=correctAnswer(task,answer), prior=records[level][index];
    if(!prior || !prior.attempted) records[level][index]={attempted:true,firstCorrect:passed&&!hintUsed&&!modelUsed,solved:passed};
    else if(passed) records[level][index]={...prior,solved:true};
    save();stats();checkedCorrect=passed;
    if(passed) {displayFeedback((hintUsed||modelUsed?'Correct with support. ':'Correct. ')+task.why,true);reveal('Why this is correct',task.why);}
    else {displayFeedback('Not quite. Try again, or use Hint for the next step.',false);}
  });
  $('hint').addEventListener('click', () => {hintUsed=true;reveal('Hint',levels[level][index].hint);});
  $('model').addEventListener('click', () => {
    modelUsed=true;const task=levels[level][index];
    const model=task.type==='single'?task.answer:task.type==='multi'?task.answer.map(i=>task.options[i]).join(' · '):task.answerCount+'; '+task.answer;
    reveal('Model answer: '+model,task.why);
  });
  $('next').addEventListener('click',()=>{index=(index+1)%5;render();});
  document.querySelectorAll('[data-level]').forEach(button=>button.addEventListener('click',()=>{level=button.dataset.level;index=0;render();}));

  const demoSteps=[
    {chips:['32 items'],text:'Start with a sorted list containing 32 items. A linear search might examine all 32. Binary search looks at the middle and rules out one half.'},
    {chips:['32','16'],text:'After one comparison, keep at most half the candidates: from 32 down to 16.'},
    {chips:['32','16','8','4','2','1'],text:'Keep halving: 32 → 16 → 8 → 4 → 2 → 1. It takes five halvings to reduce 32 items to one.'},
    {chips:['32 → 5','64 → 6','128 → 7'],text:'Doubling the input adds only one extra halving. This is logarithmic time, O(log n), rather than O(n). The list must be sorted.'}
  ];
  function renderDemo(){
    const step=demoSteps[demoStep];$('demo-intro').textContent='Follow one change at a time. This demonstration uses different numbers from your challenge.';
    $('demo-visual').innerHTML='<div class="demo-chain">'+step.chips.map((chip,i)=>'<span class="demo-chip'+(i===step.chips.length-1?' current':'')+'">'+escape(chip)+'</span>').join('')+'</div><p>'+escape(step.text)+'</p>';
    $('demo-count').textContent='Step '+(demoStep+1)+' of '+demoSteps.length;
    $('demo-next').textContent=demoStep===demoSteps.length-1?'↺ Replay':'Next step →';
  }
  $('demo-open').addEventListener('click',()=>{demoStep=0;renderDemo();$('demo-dialog').showModal();});
  $('demo-close').addEventListener('click',()=>$('demo-dialog').close());
  $('demo-reset').addEventListener('click',()=>{demoStep=0;renderDemo();});
  $('demo-next').addEventListener('click',()=>{demoStep=(demoStep+1)%demoSteps.length;renderDemo();});
  render();
})();
