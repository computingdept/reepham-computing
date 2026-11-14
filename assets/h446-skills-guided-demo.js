/* One teaching interaction for the nine live H446 Skills. Each Demo is a
   separate analogous example; existing questions, marking and storage remain
   under the original skill engines. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.RHSCH446GuidedDemo=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const examples={
    convert:()=>({title:'Conversion grid',task:'Convert the different denary value 45.',steps:[
      ['Choose place values','32 + 8 + 4 + 1 = 45','Use the 32, 8, 4 and 1 columns. Other columns are zero.'],
      ['Write eight bits','00101101','Eight columns are retained, including leading zeroes.'],
      ['Split into four-bit groups','0010 | 1101','The left nibble is 2 and the right is 13.'],
      ['Write hexadecimal','2D','13 is D in hexadecimal. Check 2 × 16 + 13 = 45.']]}),
    shift:(c)=>c.level==='easy'?({title:'Logical shift',task:'Shift the unsigned number 00001101 left two places.',steps:[
      ['Original','00001101 = 13','Keep an eight-bit boundary.'],
      ['Move both places','001101__','Bits leaving the left edge would be discarded.'],
      ['Fill new gaps with zero','00110100 = 52','Logical left shift fills two zeros on the right.'],
      ['Check','13 × 4 = 52','A left shift of two places multiplies by 2² if no important bit is lost.']]}):({title:'Arithmetic right shift',task:'Shift a different negative two’s-complement value 10010000 right two places.',steps:[
      ['Read the sign','10010000 = −112','The first bit is 1, so this eight-bit signed value is negative.'],
      ['Shift once','11001000','Arithmetic right shift copies the original sign bit into the new leftmost position.'],
      ['Shift twice','11100100','Fill with 1 again, not 0. Bits leaving the right edge are lost.'],
      ['Check','11100100 = −28','The signed value is divided by four here; the sign was preserved.']]}),
    triple:()=>({title:'Three-number addition',task:'Add three different eight-bit values: 7 + 7 + 7.',steps:[
      ['Align columns','00000111 + 00000111 + 00000111','Write the three rows directly above one another.'],
      ['Rightmost column','1 + 1 + 1 = 3 → write 1, carry 1','Divide the column total by two: remainder is the written bit.'],
      ['Next column','1 + 1 + 1 + 1 = 4 → write 0, carry 2','A three-row sum can carry 2; do not assume carries are only 0 or 1.'],
      ['Next two columns','1 + 1 + 1 + 2 = 5 → 1 carry 2; then 0 + 2 = 2 → 0 carry 1','Carry every total into the column to its left.'],
      ['Finish and check','00010101 = 21','7 + 7 + 7 = 21. All eight result bits fit.']]}),
    borrow:()=>({title:'Binary subtraction',task:'Subtract 3 from 32 using eight-bit columns.',steps:[
      ['Line up numbers','00100000 − 00000011','Start at the units column on the right.'],
      ['Borrow across zeroes','32 → two 16s → two 8s → two 4s → two 2s → two 1s','A higher place gives two of the next lower place. Record every exchange.'],
      ['Subtract the low columns','Units: 2 − 1 = 1 · Twos: 1 − 1 = 0','Do not treat a borrowed 1 as a decimal ten; it is binary 10.'],
      ['Write the result','00011101 = 29','Check in denary: 32 − 3 = 29.']]}),
    twos:()=>({title:'Two’s complement',task:'Represent −13 in eight-bit two’s complement.',steps:[
      ['Write positive 13','00001101','Keep all eight positions.'],
      ['Invert every bit','11110010','Change every 0 into 1 and every 1 into 0.'],
      ['Add one','11110011','This is the eight-bit two’s-complement representation of −13.'],
      ['Check','00001101 + 11110011 = 1 00000000','The eight low bits are zero; the extra carry is discarded.']]}),
    fixed:()=>({title:'Signed fixed point',task:'Encode −2.75 in signed eight-bit Q4.4.',steps:[
      ['Locate binary point','4 bits . 4 bits','Q4.4 here has four integer/sign positions and four fractional places.'],
      ['Encode positive 2.75','0010.1100','2 is 0010; 0.75 is 0.11, then add trailing zeroes.'],
      ['Take two’s complement','00101100 → 11010011 → 11010100','Remove the point to flip all eight bits and add one.'],
      ['Put the point back','1101.0100','Interpret as a signed Q4.4 value: −2.75.']]}),
    floating:(c)=>{
      const six=c.width===6;
      return {title:'Floating-point arithmetic',task:'A different addition which needs alignment and normalisation ('+(six?'6':'8')+'-bit mantissa).',steps:[
        ['Decode exponents','A exponent 0011 = 3; B exponent 0010 = 2','The larger exponent is 3. Do not add the exponents together.'],
        ['Align B',six?'A 011000 @ 3  |  B 010000 @ 2 → 001000 @ 3':'A 01100000 @ 3  |  B 01000000 @ 2 → 00100000 @ 3','Arithmetic shift the smaller-exponent mantissa right one place and increase its exponent.'],
        ['Add aligned mantissas',six?'011000 + 001000 = 0100000 (7-bit working)':'01100000 + 00100000 = 010000000 (9-bit working)','Keep an extra sign bit: the positive result is too large for the original signed mantissa.'],
        ['Normalise',six?'010000 @ exponent 0100':'01000000 @ exponent 0100','Shift right one place and increase the exponent from 3 to 4. The leading bits are now 01.'],
        ['Check decimal meaning','6 + 2 = 8','0.75 × 2³ + 0.5 × 2² = 8. The final 0.5 × 2⁴ also equals 8.']]};
    },
    kmap:(c)=>c.level==='easy'?({title:'Three-variable Karnaugh map',task:'Simplify a different expression: F = (¬A ∧ B) ∨ (A ∧ B).',steps:[
      ['Find the outputs','F = 1 whenever B = 1','Both terms require B. A can be either 0 or 1; C does not matter.'],
      ['Populate the Gray-code map','BC columns 00 | 01 | 11 | 10\nA=0        0  | 0  | 1  | 1\nA=1        0  | 0  | 1  | 1','The right two columns contain four adjacent 1s, including the two rows.'],
      ['Group four 1s','One group of 4','Groups contain powers of two; all four cells share B = 1.'],
      ['Simplify','F = B','A and C change inside the group, so they disappear from the term.']]}):({title:'Four-variable Karnaugh map',task:'Simplify a different four-variable expression: F = (¬A ∧ B) ∨ (A ∧ B).',steps:[
      ['Identify the rule','F = 1 whenever B = 1','C and D do not affect the output.'],
      ['Populate the Gray-code map','CD →     00  01  11  10\nAB = 00    0   0   0   0\nAB = 01    1   1   1   1\nAB = 11    1   1   1   1\nAB = 10    0   0   0   0','The middle two rows are adjacent in Gray-code order.'],
      ['Choose a maximal group','One group of 8 adjacent 1s','A group of eight removes three changing variables.'],
      ['Simplify','F = B','Only B stays at 1 throughout the group.']]}),
    quicksort:(c)=>c.level==='hard'?({title:'Quicksort with duplicate values',task:'Sort the different list [7, 2, 9, 7, 5, 3] using the first pivot.',steps:[
      ['Choose first pivot','Pivot 7','Use this lab’s rule, not an arbitrary alternative pivot.'],
      ['Partition','Smaller [2, 5, 3] · Equal-or-larger [9, 7]','Equal values go into the Larger group, preserving their original relative order.'],
      ['Recurse on smaller','Pivot 2 → [] and [5, 3]; pivot 5 → [3] and []','Stop when a sublist has zero or one value.'],
      ['Recurse on larger','Pivot 9 → [7] and []','Apply exactly the same method to each sublist.'],
      ['Combine results','[2, 3, 5] + [7] + [7, 9] = [2, 3, 5, 7, 7, 9]','Sorted smaller list, pivot, sorted larger list.']]}):({title:'Quicksort partitioning',task:'Sort the different list [7, 2, 9, 5, 3] with the first element as pivot.',steps:[
      ['Choose pivot','Pivot 7','The lab always uses the first value of each current sublist.'],
      ['Partition','Smaller [2, 5, 3] · Larger [9]','Keep the original order of values within each group.'],
      ['Recurse','Pivot 2 on [2, 5, 3] → [] and [5, 3]','A single-item list is already sorted.'],
      ['Finish the smaller side','Pivot 5 on [5, 3] → [3] and []','This sublist becomes [3, 5], so the smaller side becomes [2, 3, 5].'],
      ['Combine','[2, 3, 5] + [7] + [9] = [2, 3, 5, 7, 9]','Combine sorted smaller, pivot, sorted larger.']]})
  };
  const layouts={
    binary:{anchor:'#practice .bar',hide:['#practice .panels']},
    floating:{anchor:'.bar',hide:['.steps','.question','.grid','footer']},
    kmap:{anchor:'.topcontrols',hide:['.steps','.question','.workspace','.bottomhint']},
    quicksort:{anchor:'.difficulty-bar',hide:['.difficulty-note','.meter','.layout','footer']}
  };
  function identify(path){
    if(path.includes('/exercise/h446/binary-skills/'))return 'binary';
    if(path.includes('/exercise/h446/floating-point/'))return 'floating';
    if(path.includes('/revision/h446/section-2-3/quicksort-lab.html'))return 'quicksort';
    if(path.replace(/\/index\.html$/,'/').endsWith('/exercise/h446/'))return 'kmap';
    return null;
  }
  function context(doc,win,mode){
    const pressed=mode==='quicksort'?doc.querySelector('[data-difficulty][aria-pressed="true"]'):doc.querySelector('[data-level][aria-pressed="true"]');
    const level=(pressed&&(pressed.dataset.level||pressed.dataset.difficulty))||'easy';
    const width=Number(doc.querySelector('[data-width][aria-pressed="true"]')?.dataset.width)||8;
    return {skill:mode==='binary'?new URLSearchParams(win.location.search).get('skill'):mode,level,width};
  }
  function get(skill,ctx){return examples[skill]?examples[skill](ctx||{level:'easy',width:8}):null;}
  function mount(doc,win,mode){
    mode=mode||identify(win.location.pathname);
    const layout=layouts[mode];if(!layout)return null;
    const anchor=doc.querySelector(layout.anchor);if(!anchor)return null;
    const make=(tag,cls,t)=>{const e=doc.createElement(tag);if(cls)e.className=cls;if(t!==undefined)e.textContent=t;return e;};
    const openButton=make('button','rhsc-h446-demo-button','▶ Demo');openButton.type='button';openButton.title='See a different worked example, step by step. Marks stay unchanged.';
    anchor.append(openButton);
    const panel=make('section','rhsc-h446-demo');panel.setAttribute('aria-label','Independent worked demonstration');panel.hidden=true;
    const back=make('button','rhsc-h446-demo-back','← Back to practice');back.type='button';
    const title=make('h2','rhsc-h446-demo-title','Worked demonstration');
    const prompt=make('p','rhsc-h446-demo-prompt');
    const list=make('ol','rhsc-h446-demo-steps');
    const controls=make('div','rhsc-h446-demo-controls');
    const next=make('button','rhsc-h446-demo-next','⏭ Next step');next.type='button';
    const reset=make('button','rhsc-h446-demo-reset','↺ Start again');reset.type='button';
    controls.append(next,reset);panel.append(back,title,prompt,list,controls);anchor.after(panel);
    let current=null,revealed=0,scroll=0;
    const hidden=layout.hide.map(s=>doc.querySelector(s)).filter(Boolean);
    function draw(){
      list.replaceChildren();
      current.steps.forEach((step,i)=>{
        const item=make('li','rhsc-h446-demo-step'+(i<revealed?' shown':' pending'));
        item.append(make('b','rhsc-h446-demo-number',String(i+1).padStart(2,'0')),
          make('strong','rhsc-h446-demo-label',i<revealed?step[0]:'Step '+(i+1)));
        if(i<revealed)item.append(make('pre','rhsc-h446-demo-work',step[1]),make('p','rhsc-h446-demo-why',step[2]));
        list.append(item);
      });
      next.disabled=revealed>=current.steps.length;
      next.textContent=next.disabled?'✓ Example complete':'⏭ Next step';
    }
    function open(){
      const ctx=context(doc,win,mode);current=get(ctx.skill,ctx);if(!current)return;
      revealed=0;scroll=win.scrollY;
      title.textContent=current.title+' · Demo';
      prompt.textContent='Similar question: '+current.task+' Your current answers and marks are kept.';
      hidden.forEach(el=>el.classList.add('rhsc-h446-demo-activity-hidden'));
      panel.hidden=false;draw();panel.scrollIntoView({block:'start'});back.focus({preventScroll:true});
    }
    function close(){panel.hidden=true;hidden.forEach(el=>el.classList.remove('rhsc-h446-demo-activity-hidden'));openButton.focus({preventScroll:true});win.scrollTo(0,scroll);}
    openButton.addEventListener('click',open);back.addEventListener('click',close);
    next.addEventListener('click',()=>{if(current&&revealed<current.steps.length){revealed++;draw();}});
    reset.addEventListener('click',()=>{revealed=0;draw();});
    doc.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)close();});
    return {openButton,panel,open,close,context:()=>context(doc,win,mode)};
  }
  if(typeof document!=='undefined'&&typeof window!=='undefined')mount(document,window);
  return {get,mount,identify,skills:Object.keys(examples)};
});
