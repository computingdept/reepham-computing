/* Shared Do Now question sources and published-bank rendering for J277 and H446.
   Preserve authored fallback content, validation, fetch policies and initialization order. */

/* J277 Year 10: each question and answer names the lesson in which
   its underlying knowledge was previously taught, with KS3 for L001. */
function prepareJ277DoNowSourceLabels(){
  if(!/\/lessons\/j277\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname))return;
  const questions=[...document.querySelectorAll('#do-now .donow-questions .donow-question > strong')];
  const reviews=[...document.querySelectorAll('#do-now .donow-review-question .review-number')];
  if(questions.length!==4||reviews.length!==4)return;
  const labels=['LAST LESSON','MCQ','RETRIEVAL','CHALLENGE'];
  for(let i=0;i<4;i++){
    // Use the source already rendered from the active bank (or authored static card).
    // Do not infer a source from the lesson number or the superseded legacy map.
    const source=questions[i].textContent.split(' · ').pop().trim();
    if(!/^(?:L\d{3}|KS3)(?:\s*[,/+–-]\s*(?:L\d{3}|KS3))*$/.test(source))continue;
    const ref=[...new Set(source.split(/\s*,\s*/).filter(Boolean))].join(' + ');
    for(const [heading,answerView] of [[questions[i],false],[reviews[i],true]]){
      heading.classList.add('j277-origin-heading');
      heading.textContent=(answerView?'QUESTION '+(i+1)+' OF 4':String(i+1))+' · '+labels[i]+' · '+ref;
    }
  }
}


/* OCR H446 – progressive spaced retrieval from previously taught lessons.
   Year 12 and Year 13 are mapped separately. Stage cards and answer views
   both display identical prior-teaching references. Non-question Do Nows
   (revision, assessment and feedback) remain unchanged. */
function prepareH446DoNowSourceLabels(){
  const match=location.pathname.match(/\/lessons\/h446\/lesson-(\d{3})(?:\/|\.html|$)/i);
  if(!match)return;
  // Remove legacy source-lesson navigation from Do Now only; keep taught badges.
  document.querySelectorAll('#do-now .year12-reference').forEach(node=>node.remove());
  const n=Number(match[1]);
  const origins={"1":["GCSE","GCSE","GCSE","GCSE"],"2":["L001","L001","L001","L001"],"3":["L001","L001","L002","L002"],"4":["L001","L003","L002","L003"],"5":["L004","L003","L002","L003"],"6":["L005","L004","L002","L003"],"7":["L006","L005","L003","L002"],"8":["L001","L003","L003","L007"],"9":["L008","L005","L003","L002"],"10":["L009","L008","L005","L009"],"11":["L010","L009","L001","L009 + L010"],"12":["L011","L010","L009","L011"],"13":["L012","L010","L011","L009 + L010"],"14":["L013","L010","L011","L013"],"15":["L014","L013","L014","L013 + L014"],"16":["L015","L015","L015","L013 + L015"],"17":["L014","L011","L003","L013"],"18":["L017","L017","L017","L017"],"19":["L018","L017","L018","L017 + L018"],"20":["L017","L018","L019","L019"],"21":["L020","L020","L019","L019"],"22":["L017","L019","L020","L021"],"23":["L022","L019","L021 + L022","L022"],"24":["L020","L020","L022","L019–L023"],"25":["L017","L019","L017","L017"],"26":["L020","L025","L017","L025"],"27":["L004","L025","GCSE","L026"],"28":["L002","L027","GCSE","L004"],"29":["L028","GCSE","L017","L006"],"30":["L026","L027","L028","L027"],"31":["L026","L026","L002","L002"],"32":["L030","L030","L031","L031"],"33":["L027","L031","L030","L026"],"35":["L003","L023","L027","L031"],"181":["L020","L027","L002","L013 + L017"],"182":["L012","GCSE","L012","L181"],"183":["L181","L010","GCSE","L181 + L182"],"184":["L017","L010","GCSE","GCSE"],"185":["L184","L184","L017","L184"],"186":["L181","L185","L017","L185"],"187":["L186","L181","L186","L181 + L186"],"188":["L187","L186","L025","L025"],"189":["L021","L021","L020","L021"],"190":["L189","L189","L189","L189"],"191":["L184","L187","L025 + L188","L190"]};
  const updates={"13":{"0":["What is the difference between a parameter and an argument in C#?","A parameter is named in a method declaration; an argument is the value supplied when calling it."],"1":["Which type of C# loop is suitable when you know how many repetitions are required?","A for loop is appropriate for a known number of repetitions."],"2":["What is the difference between a function and a void method?","A function returns a value; a void method does not return a value."],"3":["A program repeatedly prints three lines. Which previously taught programming construct reduces repeated statements, and why?","A loop: it repeats the same instructions without writing them out each time."]},"14":{"0":["On the 3 × 3 board from L013, which square is board[1,2] (zero-based rows and columns)?","Square 6: row 1, column 2 in the board shown in L013."],"1":["Name the three parts of a C# for loop header.","Initialisation, condition and update."],"2":["What is the difference between a C# function and a void method?","A function returns a value; a void method does not."],"3":["Why is a 2D array more suitable for a 3 × 3 board than nine unrelated variables?","It keeps related squares together and lets code access each square by its row and column."]},"16":{"3":["A player selects square 8. Give its zero-based row and column, and explain why an occupied square must be rejected.","Square 8 is row 2, column 1. An occupied square must be rejected to avoid overwriting a previous move."]},"18":{"3":["A 3D C# array has dimensions [2,3,4]. How many values can it hold and what does GetLength(2) return?","It can store 2 × 3 × 4 = 24 values; GetLength(2) returns 4."]},"19":{"2":["Give one advantage of grouping a student's name, candidate number and score into a record.","The related values can be represented and handled together as one structured item."],"3":["A program must frequently add items to the beginning of a collection. Is a C# fixed-size array or a List<T> more suitable, and why?","List<T>, because its size can change and elements can be inserted without manually creating a new fixed-size array."]},"21":{"3":["In an array-based linked list, why can the logical next item be at a non-adjacent array index?","The next pointer stores the next item's index, so the logical order does not have to match the physical array order."]},"23":{"2":["State one difference between a tree and a general graph.","A tree has a hierarchy and no cycles; a general graph may contain cycles."],"3":["A binary search tree contains 15 at its root, with 9 on the left and 21 on the right. Where would 12 be inserted?","12 belongs to the right of 9, because 12 is less than 15 but greater than 9."]},"25":{"1":["How is moving to the next item in a linked list different from accessing the next item of an array?","A linked list follows the next pointer; an array normally uses the next numeric index."],"3":["For int[] numbers = {3, 7, 12, 18, 24}, give the first and last valid indexes. Explain why numbers[5] is invalid.","Valid indexes are 0 to 4. numbers[5] is outside the array's bounds."]},"30":{"1":["What does ¬¬A simplify to in Boolean algebra?","A — double negation cancels out."],"2":["In a Karnaugh-map group, what happens to an input that changes between 0 and 1?","The changing input is removed from the simplified term."],"3":["Use De Morgan's law to simplify ¬(A ∧ B), and explain why the expressions are equivalent.","¬A ∨ ¬B. Both expressions give the same output for every input combination."]},"186":{"3":["An insertion sort has a sorted section [4, 7, 9] and must insert 6. Where should 6 go, and which values move?","Insert 6 between 4 and 7; shift 7 and 9 one position right."]},"187":{"2":["When merging the sorted halves [2, 8] and [3, 7], what is the combined sorted order?","[2, 3, 7, 8]."],"3":["Why must a recursive sorting algorithm include a base case?","It stops recursion on a sufficiently small input and prevents calls from continuing indefinitely."]},"189":{"2":["Which previously studied structure removes items in first-in-first-out order, and how is it different from a stack?","A queue uses FIFO; a stack removes the most recently added item first (LIFO)."],"3":["For a directed edge A → B, can you assume B → A also exists? Explain.","No. A directed edge permits travel from A to B only unless a reverse edge is also specified."]},"190":{"3":["Why does Dijkstra's algorithm select the unvisited node with the smallest tentative distance next?","With non-negative edge weights, this is the nearest unsettled node; its shortest distance can then be finalised."]}};
  const taught=origins[n];
  if(!taught)return;
  // Lessons 030–034 define their own sequenced retrieval questions and worked answers.
  // Do not overwrite them or relabel their actual topic sources with legacy metadata.
  if([30,31,32,33,34].includes(n))return;
  const section=document.querySelector('#do-now');
  if(!section)return;
  const questions=[...section.querySelectorAll('.donow-questions .donow-question')];
  if(questions.length!==4)return;
  const deck=section.querySelector('.donow-deck');
  if(!deck)return;
  let reviews=[...section.querySelectorAll('.donow-review-question')];
  if(n===33&&reviews.length===0){
    /* The pre-existing L033 Do Now had questions but no model answer screens. */
    const answers=['A (double negation).','XOR.','It stores one bit of state, updated at a triggering clock edge.','2³ = 8 rows.'];
    questions.forEach((q,i)=>{
      const stage=document.createElement('div');stage.className='donow-stage';stage.hidden=true;
      const layout=document.createElement('div');layout.className='donow-review';
      const lhs=document.createElement('article');lhs.className='donow-review-question';
      const num=document.createElement('span');num.className='review-number';num.textContent='QUESTION '+(i+1)+' OF 4';
      const title=document.createElement('h2');title.textContent='Retrieve earlier learning';
      const prompt=document.createElement('p');prompt.className='review-question';
      prompt.textContent=q.querySelector('p')?.textContent||'';
      lhs.append(num,title,prompt);
      const rhs=document.createElement('article');rhs.className='donow-review-answer';
      const label=document.createElement('span');label.className='review-label';label.textContent='MODEL ANSWER';
      const answer=document.createElement('p');answer.className='review-answer';answer.textContent=answers[i];
      rhs.append(label,answer);layout.append(lhs,rhs);stage.append(layout);deck.append(stage);
    });
    reviews=[...section.querySelectorAll('.donow-review-question')];
  }
  if(reviews.length!==4)return;
  const edits=updates[n]||{};
  for(let i=0;i<4;i++){
    const card=questions[i],review=reviews[i],source=taught[i];
    if(edits[i]){
      const [questionText,answerText]=edits[i];
      const paragraphs=[...card.querySelectorAll('p')];
      if(paragraphs.length){
        paragraphs[paragraphs.length-1].textContent=questionText;
        paragraphs.slice(0,-1).forEach(p=>p.remove());
      }else{
        const p=document.createElement('p');p.textContent=questionText;card.append(p);
      }
      const answerPrompt=review.querySelector('.review-question');
      if(answerPrompt)answerPrompt.textContent=questionText;
      const rhs=review.parentElement?.querySelector('.review-answer');
      if(rhs)rhs.textContent=answerText;
      review.parentElement?.querySelectorAll('.review-explain').forEach(note=>note.remove());
    }
    const style=n===1?(i===3?'CHALLENGE':'PRIOR KNOWLEDGE'):(i===0?'LAST LESSON':i===3?'CHALLENGE':'RETRIEVAL');
    const headings=[card.querySelector(':scope > strong'),review.querySelector('.review-number')];
    for(let k=0;k<headings.length;k++){
      const heading=headings[k];
      if(!heading)continue;
      heading.classList.add('h446-origin-heading');
      heading.textContent=(k===0?String(i+1):'QUESTION '+(i+1)+' OF 4')+' · '+style+' · '+source;
    }
  }
}


/* H446 classroom Q1: one published question per lesson, retrieved from the
   immediately preceding taught lesson (course/year entries are diagnostic).
   The four-card layout, answer-stage order and Q2-Q4 stay untouched. */
function applyPublishedH446Q1(){
  const match=location.pathname.match(/\/lessons\/h446\/lesson-(\d{3})(?:\/|\.html|$)/i);
  if(!match)return;
  const id=match[1],number=Number(id);
  const section=document.querySelector('#do-now');
  const first=section?.querySelector('.donow-questions .donow-question');
  const reviewStage=section?.querySelectorAll('.donow-stage')[1];
  const review=reviewStage?.querySelector('.donow-review-question');
  const answerPanel=reviewStage?.querySelector('.donow-review-answer');
  const prompt=first?.querySelector('p');
  const answerPrompt=review?.querySelector('.review-question')||review?.querySelector('p');
  if(!prompt||!answerPrompt||!answerPanel)return;
  fetch('../../../data/do-now/q1-published/h446.json',{cache:'force-cache'})
    .then(response=>{
      if(!response.ok)throw Error('Published H446 Q1 bank unavailable');
      return response.json();
    }).then(bank=>{
      if(bank.status!=='published'||bank.course!=='h446')return;
      const entry=bank.lessons?.[id];
      if(!entry||typeof entry.statement!=='string'||typeof entry.correct!=='boolean'
        ||!entry.explanation||(!entry.correct&&!entry.correction))return;
      const diagnostic=number===1||number===181;
      const predecessor='L'+String(number-1).padStart(3,'0');
      if(diagnostic!==Boolean(entry.diagnostic))return;
      if(!diagnostic&&(entry.previousTaughtLesson!==predecessor
        ||!entry.sourceRefs?.includes(predecessor)))return;
      const question='True or false? '+entry.statement;
      const cardHeading=first.querySelector(':scope > strong');
      [...first.children].forEach(node=>{if(node!==cardHeading&&node!==prompt)node.remove();});
      prompt.textContent=question;
      answerPrompt.textContent=question;
      for(const [heading,title] of [
        [cardHeading,'1 · TRUE / FALSE · '+(diagnostic?(number===1?'GCSE':'YEAR 12'):entry.previousTaughtLesson)],
        [review.querySelector('.review-number'),'QUESTION 1 OF 4 · TRUE / FALSE · '+(diagnostic?(number===1?'GCSE':'YEAR 12'):entry.previousTaughtLesson)]
      ]){
        if(!heading)continue;
        heading.classList.add('h446-origin-heading');
        heading.textContent=title;
      }
      const label=answerPanel.querySelector('.review-label');
      const verdict=document.createElement('p');
      verdict.className='review-answer';
      verdict.textContent=entry.correct?'TRUE':'FALSE';
      const explanation=document.createElement('p');
      explanation.className='review-explain';
      explanation.textContent=entry.correct?entry.explanation:entry.correction;
      const parts=[verdict,explanation];
      if(!entry.correct&&entry.explanation!==entry.correction){
        const detail=document.createElement('p');
        detail.className='review-explain';
        detail.textContent=entry.explanation;
        parts.push(detail);
      }
      answerPanel.replaceChildren(...(label?[label]:[]),...parts);
    }).catch(error=>console.warn('H446 Q1 kept authored fallback:',error));
}

/* Published H446 Q2 bank. Only the second Do Now card and its answer are
   replaced. On load failure the authored question stays available. A teacher
   may temporarily use ?h446-q2-original=1 to inspect that authored fallback.
   Q1, Q3, Q4, all J277 lessons and lesson navigation are untouched. */
function applyPublishedH446Q2(){
  if(new URLSearchParams(location.search).get('h446-q2-original')==='1')return;
  const match=location.pathname.match(/\/lessons\/h446\/lesson-(\d{3})(?:\/|\.html|$)/i);
  if(!match)return;
  const id=match[1];
  const section=document.querySelector('#do-now');
  const cards=section?.querySelectorAll('.donow-questions .donow-question');
  const stages=section?.querySelectorAll('.donow-stage');
  const card=cards?.[1],reviewStage=stages?.[2];
  const review=reviewStage?.querySelector('.donow-review-question');
  const answerPanel=reviewStage?.querySelector('.donow-review-answer');
  const cardQuestion=card?.querySelector(':scope > p');
  const reviewQuestion=review?.querySelector('.review-question')
    ||review?.querySelector(':scope > p');
  if(!cardQuestion||!reviewQuestion||!answerPanel)return;
  fetch('../../../data/do-now/q2-published/h446.json',{cache:'no-store'})
    .then(response=>{
      if(!response.ok)throw Error('Published H446 Q2 bank unavailable');
      return response.json();
    }).then(bank=>{
      if(bank.course!=='h446'||bank.status!=='published')return;
      const entry=bank.lessons?.[id];
      if(!entry||typeof entry.question!=='string'||!entry.explanation
        ||!Array.isArray(entry.options)||entry.options.length!==4
        ||new Set(entry.options).size!==4
        ||!Number.isInteger(entry.correctIndex)
        ||entry.correctIndex<0||entry.correctIndex>3)return;
      const source=entry.taughtIn;
      const sourceNumber=Number(source?.slice(1));
      const diagnostic=source==='GCSE';
      if(!diagnostic&&(!/^L\d{3}$/.test(source)
        ||sourceNumber>=Number(id)-1
        ||(Number(id)<=160&&sourceNumber>=181)))return;
      const makeChoices=showCorrect=>{
        const list=document.createElement('ol');
        list.className='h446-q2-options'+(showCorrect?' h446-q2-options--review':'');
        list.setAttribute('aria-label','Four multiple-choice answers');
        entry.options.forEach((option,index)=>{
          const item=document.createElement('li');
          if(showCorrect&&index===entry.correctIndex)item.classList.add('h446-q2-correct');
          const letter=document.createElement('span');
          letter.className='h446-q2-letter';
          letter.textContent='ABCD'[index];
          const choice=document.createElement('span');
          choice.textContent=option;
          item.append(letter,choice);
          list.append(item);
        });
        return list;
      };
      const cardHeading=card.querySelector(':scope > strong');
      const reviewHeading=review.querySelector('.review-number');
      const reviewTitle=review.querySelector(':scope > h2');
      if(cardHeading)cardHeading.textContent='2 · MCQ · '+source;
      if(reviewHeading)reviewHeading.textContent='QUESTION 2 OF 4 · MCQ · '+source;
      if(reviewTitle)reviewTitle.textContent='Retrieval';
      cardQuestion.textContent=entry.question;
      reviewQuestion.textContent=entry.question;
      // Replace all authored Q2 content only after the central entry is validated.
      // Legacy cards may have a title paragraph followed by the original prompt.
      card.replaceChildren(...(cardHeading?[cardHeading]:[]),cardQuestion,makeChoices(false));
      review.replaceChildren(...(reviewHeading?[reviewHeading]:[]),...(reviewTitle?[reviewTitle]:[]),reviewQuestion,makeChoices(true));
      const label=answerPanel.querySelector('.review-label');
      const verdict=document.createElement('p');
      verdict.className='review-answer';
      verdict.textContent='ABCD'[entry.correctIndex]+' — '+entry.options[entry.correctIndex];
      const explanation=document.createElement('p');
      explanation.className='h446-q2-explain';
      explanation.textContent=entry.explanation;
      answerPanel.replaceChildren(...(label?[label]:[]),verdict,explanation);
      if(!document.getElementById('h446-q2-style')){
        const style=document.createElement('link');
        style.id='h446-q2-style';
        style.rel='stylesheet';
        style.href='../../../assets/h446-lesson/h446-q2.css';
        document.head.append(style);
      }
      section.dataset.h446Q2Published='true';
    }).catch(error=>console.warn('H446 Q2 bank unavailable; authored fallback retained:',error));
}

/* All H446 Do Now Q3/Q4 sources and reviewed retrieval corrections.
   Q1/Q2, lesson presentation and navigation are not changed here.
   If the bank is unavailable the authored Do Now remains functional. */
function applyReviewedH446Q34Sources(){
  const match=location.pathname.match(/\/lessons\/h446\/lesson-(\d{3})(?:\/|\.html|$)/i);
  if(!match)return;
  const id=match[1],number=Number(id);
  const section=document.querySelector('#do-now');
  const cards=[...(section?.querySelectorAll('.donow-questions .donow-question')||[])];
  const reviews=[...(section?.querySelectorAll('.donow-review-question')||[])];
  if(cards.length!==4||reviews.length!==4)return;
  const answerCards=[...(section.querySelectorAll('.donow-review-answer')||[])];
  if(answerCards.length!==4)return;
  fetch('../../../data/do-now/h446-q34-sources.json',{cache:'no-store'})
    .then(response=>{
      if(!response.ok)throw Error('H446 Q3/Q4 source bank unavailable');
      return response.json();
    }).then(async bank=>{
      if(bank.course!=='h446'||bank.status!=='reviewed')return;
      const entry=bank.lessons?.[id];
      if(!entry)return;
      const {validReplacement,replaceDoNowText}=await import('./h446-do-now-q34.js');
      for(const position of [2,3]){
        const source=entry['q'+(position+1)];
        if(!source)continue;
        const refs=source.sourceRefs;
        const prior=source.priorStage==='GCSE';
        if(!prior&&(!Array.isArray(refs)||!refs.length||!refs.every(ref=>
          /^L\d{3}$/.test(ref)&&Number(ref.slice(1))<number)))continue;
        const headingText=position===2?'RETRIEVAL':'CHALLENGE';
         const sourceLabel=prior?'GCSE':refs.join(' + ');
        const headings=[cards[position].querySelector(':scope > strong'),
          reviews[position].querySelector('.review-number')];
        for(const [index,heading] of headings.entries()){
          if(!heading)continue;
          heading.classList.add('h446-origin-heading');
          heading.textContent=(index===0?String(position+1):'QUESTION '+(position+1)+' OF 4')
            +' · '+headingText+' · '+sourceLabel;
        }
        const replacement=validReplacement(source);
        if(replacement){
          const applied=replaceDoNowText(cards[position],reviews[position],answerCards[position],replacement,headingText);
          if(!applied)console.warn('H446 Q'+(position+1)+' replacement retained authored media or unsupported markup:',id);
        }
      }
      section.dataset.h446Q34Reviewed='true';
    }).catch(error=>console.warn('H446 Q3/Q4 authored headings retained:',error));
}

/* Single published J277 Q1 source. Only Q1 is replaced; Q2–Q4, lesson
   navigation and H446 are untouched. If the bank cannot load, the authored
   lesson remains usable rather than displaying an invented answer. */
function applyPublishedJ277Q1(){
  const match=location.pathname.match(/\/lessons\/j277\/lesson-(\d{3})(?:\/|\.html|$)/i);
  if(!match)return;
  const first=document.querySelector('#do-now .donow-questions .donow-question');
  const review=document.querySelectorAll('#do-now .donow-stage')[1];
  const prompt=first?.querySelector('p');
  const reviewPrompt=review?.querySelector('.donow-review-question .review-question')
    ||review?.querySelector('.donow-review-question p');
  const reviewAnswer=review?.querySelector('.donow-review-answer');
  if(!prompt||!reviewPrompt||!reviewAnswer)return;
  fetch('../../../data/do-now/q1-published/j277.json',{cache:'force-cache'})
    .then(response=>{
      if(!response.ok)throw Error('Published Q1 bank unavailable');
      return response.json();
    }).then(bank=>{
      if(bank.status!=='published')return;
      const entry=bank.lessons?.[match[1]];
      if(!entry||typeof entry.statement!=='string'||typeof entry.correct!=='boolean'
         ||!entry.explanation||(!entry.correct&&!entry.correction))return;
      const question='True or false? '+entry.statement;
      prompt.textContent=question;
      reviewPrompt.textContent=question;
      const refs=entry.sourceRefs;
      if(Array.isArray(refs)&&refs.length&&refs.every(ref=>/^(?:L\d{3}|KS3)$/.test(ref))){
        const source=[...new Set(refs)].join(' + ');
        const cardHeading=first.querySelector(':scope > strong');
        const reviewHeading=review.querySelector('.review-number');
        if(cardHeading)cardHeading.textContent='1 · TRUE / FALSE · '+source;
        if(reviewHeading)reviewHeading.textContent='QUESTION 1 OF 4 · TRUE / FALSE · '+source;
      }
      const label=reviewAnswer.querySelector('.review-label');
      const answer=document.createElement('p');
      answer.className='review-answer';
      answer.textContent=entry.correct?'True':'False';
      const parts=[answer];
      if(entry.correction){
        const correction=document.createElement('p');
        correction.className='j277-q1-correction';
        correction.textContent=entry.correction;
        parts.push(correction);
      }
      const explanation=document.createElement('p');
      explanation.className='j277-q1-explanation';
      explanation.textContent=entry.explanation;
      parts.push(explanation);
      reviewAnswer.replaceChildren(...(label?[label]:[]),...parts);
    }).catch(error=>console.warn('J277 Q1 unchanged:',error));
}
export function prepareDoNow(){
  /* Do Now source badges are informational, not navigation links.
     Remove only legacy Year 12 source-link wrappers in the Do Now phase,
     independently of the question-bank fetch or any replacement. */
  if(/^\/lessons\/h446\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname)){
    document.querySelectorAll('#do-now .year12-reference').forEach(node=>{
      if(node.querySelector('a')&&!node.querySelector('svg,img,figure,table,pre')){
        node.remove();
      }
    });
  }
  prepareJ277DoNowSourceLabels();
  applyPublishedJ277Q1();
  prepareH446DoNowSourceLabels();
  applyPublishedH446Q1();
  applyPublishedH446Q2();
  applyReviewedH446Q34Sources();
}

// The phase owns its stage contract; the platform owns generic button/keyboard/swipe mechanics.
export function createDoNowNavigation(createStageNavigator){
  return createStageNavigator('.donow-stage',{
    first:'Reveal answer 1 →',next:'Next answer →',last:'Continue → Objectives'
  });
}
