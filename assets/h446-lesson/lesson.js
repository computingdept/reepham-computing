const order=['do-now','overview','new-learning','i-do','we-do','you-do','vocabulary','exit'];
const signalMap={
  'do-now':['Do Now','Silent Working','MWBs'],
  overview:['Objectives','Listening','Hands Up'],
  'new-learning':['New Learning','Listening','Cold Calling'],
  'i-do':['I Do','Listening','MWBs'],
  'we-do':['We Do','Quiet Working','MWBs'],
  'you-do':['You Do','Quiet Working','Turn & Talk'],
  'catch-up':['Catch Up','Quiet Working','Independent'],
  'exam-practice':['Exam Practice','Quiet Working','Independent'],
  vocabulary:['Questioning','Listening','Cold Calling'],
  exit:['Exit Questioning','Silence','Thumbs Up/Down']
};
const youDoIndependentSignals=['You Do','Silence','Independent'];
const pages=[...document.querySelectorAll('.page')];
const nav=[...document.querySelectorAll('[data-page]')];
const advance=document.getElementById('advance');
const previous=document.getElementById('previous');
/* Classroom displays only: contextual caption for the NEXT arrow. The button's
   existing text and event listeners stay intact for phone, screen readers and
   lesson reveal logic. CSS hides this caption on phone/tablet layouts. */
const teacherNextAction=document.createElement('span');
teacherNextAction.className='teacher-next-action';
teacherNextAction.setAttribute('aria-hidden','true');
advance.insertAdjacentElement('afterend',teacherNextAction);
let current='do-now';

/* H446 Do Now now uses the approved compact J277 card layout. Course-gated
   here because this classroom engine also serves J277; no question data or
   reveal behaviour changes. */
if(/^\/lessons\/h446\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname)){
  document.body.classList.add('h446-donow-layout-parity');
}

/* Shared H446/J277 lesson identity: badge is drawn once from the URL, so
   a pupil sees the same lesson number on TV, laptop and the phone header. */
function lessonIdFromUrl(){
  const match=window.location.pathname.match(/\/lessons\/(?:h446|j277)\/lesson-(\d{3})(?:\/|\.html|$)/i);
  return match ? match[1] : null;
}
function createLessonIdBadge(){
  const number=lessonIdFromUrl();
  if(!number)return null;
  const namespace='http://www.w3.org/2000/svg';
  const badge=document.createElement('span');
  badge.className='lesson-id-badge';
  const svg=document.createElementNS(namespace,'svg');
  svg.setAttribute('class','lesson-id-svg');
  svg.setAttribute('viewBox','0 0 120 52');
  svg.setAttribute('role','img');
  svg.setAttribute('aria-label','Lesson '+number);
  const rect=document.createElementNS(namespace,'rect');
  rect.setAttribute('x','1');rect.setAttribute('y','1');
  rect.setAttribute('width','118');rect.setAttribute('height','50');
  rect.setAttribute('rx','9');rect.setAttribute('fill','#1d2421');
  const accent=document.createElementNS(namespace,'rect');
  accent.setAttribute('x','2');accent.setAttribute('y','9');
  accent.setAttribute('width','6');accent.setAttribute('height','34');
  accent.setAttribute('rx','3');accent.setAttribute('fill','#64b58c');
  const text=document.createElementNS(namespace,'text');
  text.setAttribute('x','62');text.setAttribute('y','34');
  text.setAttribute('text-anchor','middle');text.setAttribute('font-family','Arial,Helvetica,sans-serif');
  text.setAttribute('font-weight','800');text.setAttribute('font-size','26');text.setAttribute('fill','#fff');
  text.textContent='L'+number;
  svg.append(rect,accent,text);
  badge.appendChild(svg);
  return badge;
}
function prepareLessonIdBadge(){
  const meta=document.querySelector('.signal-meta');
  const label=meta?.querySelector('.lesson-label');
  if(!meta||!label||meta.querySelector('.lesson-id-row'))return;
  const number=lessonIdFromUrl();
  if(!number)return;
  const badge=createLessonIdBadge();
  if(!badge)return;
  const row=document.createElement('div');
  row.className='lesson-id-row';
  label.before(row);
  row.append(badge,label);

  /* Decorative header cleanup must be simple, exact and non-critical.
     Only remove the redundant OCR/lesson text when the badge matches it. */
  const first=label.firstChild;
  const match=first?.nodeType===Node.TEXT_NODE
    ? /^\s*OCR\s+(?:J277|H446)\s*[·•]\s*Lesson\s*(\d{3})\s*$/i.exec(first.textContent)
    : null;
  if(match?.[1]===number){
    first.remove();
    if(label.firstChild?.nodeName==='BR')label.firstChild.remove();
  }
}


function visibleIndex(items){
  return Math.max(0,items.findIndex(x=>!x.hidden));
}
function showOnly(items,index){
  items.forEach((item,i)=>item.hidden=i!==index);
}
// Generic stage-deck navigation: the phase supplies its selector and labels.
function createStageNavigator(selector,labels){
  const stages=page=>[...page.querySelectorAll(selector)];
  return {
    reset(page){
      const items=stages(page);
      if(items.length)showOnly(items,0);
    },
    nextLabel(page){
      const items=stages(page),i=visibleIndex(items);
      return !items.length&&labels.empty!==undefined?labels.empty:i===0&&items.length>1?labels.first:i<items.length-1?labels.next:labels.last;
    },
    canBack(page){return visibleIndex(stages(page))>0;},
    step(page,direction){
      const items=stages(page),i=visibleIndex(items),target=i+direction;
      if(target<0||target>=items.length)return false;
      showOnly(items,target);
      return true;
    }
  };
}
// Synchronous fallback for existing KS3 pages and delayed/unavailable module loading.
// No lesson loses working stage navigation because of an optional module request.
let doNowNavigation=createStageNavigator('.donow-stage',{
  first:'Reveal answer 1 →',next:'Next answer →',last:'Continue → Objectives'
});
let newLearningNavigation=createStageNavigator('.nl-stage',{first:'Next step →',next:'Next step →',last:'Continue → I Do',empty:'Continue →'});
// Shared staged prompt/response mechanics: a phase supplies its DOM contract.
function createDefinitionNavigator(config){
  const stages=page=>[...page.querySelectorAll(config.stage)];
  const response=stage=>stage?.querySelector(config.response);
  return {
    reset(page){
      if(!config.active(page))return;
      const items=stages(page);
      if(items.length){
        showOnly(items,0);
        items.forEach(item=>{const answer=response(item);if(answer)answer.hidden=true;});
      }
    },
    nextLabel(page){
      if(!config.active(page))return config.labels.inactive;
      const items=stages(page),i=visibleIndex(items),answer=response(items[i]);
      return answer&&answer.hidden?config.labels.reveal:i<items.length-1?config.labels.next:config.labels.last;
    },
    skip(page){return config.active(page)&&config.skip(page);},
    next(page){
      if(!config.active(page))return false;
      const items=stages(page),i=visibleIndex(items),answer=response(items[i]);
      if(answer&&answer.hidden){answer.hidden=false;return true;}
      if(i<items.length-1){
        showOnly(items,i+1);
        const following=response(items[i+1]);if(following)following.hidden=true;
        return true;
      }
      return false;
    },
    previous(page){
      if(!config.active(page))return false;
      const items=stages(page),i=visibleIndex(items),answer=response(items[i]);
      if(answer&&!answer.hidden){answer.hidden=true;return true;}
      if(i>0){
        showOnly(items,i-1);
        const preceding=response(items[i-1]);if(preceding)preceding.hidden=false;
        return true;
      }
      return false;
    }
  };
}
let objectivesNavigation=createDefinitionNavigator({
  stage:'.objective-vocab-stage',response:'[data-objective-vocab-definition]',
  active:page=>page.dataset.objectivesVocab==='true',
  skip:page=>page.dataset.ks3VocabIntro!=='true'&&window.matchMedia('(max-width:700px)').matches,
  labels:{inactive:'Next step →',reveal:'Reveal definition →',next:'Next term →',last:'Continue →'}
});
// -1 means the starting problem is visible and no modelled step is revealed.
// Reading from the end also supports opt-in cumulative examples.
function modellingStepIndex(steps){
  for(let i=steps.length-1;i>=0;i--)if(!steps[i].hidden)return i;
  return -1;
}
function resetModelSteps(steps){steps.forEach(step=>{step.hidden=true;});}
// Generic model-deck mechanics. I Do supplies its phase contract; We Do is unchanged.
function createModelNavigator(config){
  function reveal(steps,index,page){
    if(!config.cumulative(page)){showOnly(steps,index);return;}
    steps.forEach((step,i)=>{step.hidden=i>index;});
  }
  return {
    reset(page){
    const examples=[...page.querySelectorAll(config.example)];
    if(examples.length){
      showOnly(examples,0);
      examples.forEach(example=>{
        const steps=[...example.querySelectorAll(config.step)];
        if(steps.length)resetModelSteps(steps);
      });
    }else{
      const stages=[...page.querySelectorAll(config.legacy)];
      if(stages.length)showOnly(stages,0);
    }
    },
    nextLabel(page){
      let label=config.labels.legacyLast;
    const examples=[...page.querySelectorAll(config.example)];
    if(examples.length){
      const exampleIndex=visibleIndex(examples);
      const example=examples[exampleIndex];
      const steps=[...example.querySelectorAll(config.step)];
      const stepIndex=modellingStepIndex(steps);
      if(steps.length && stepIndex<0)label=config.labels.first;
      else if(stepIndex<steps.length-1)label=config.labels.next;
      else if(exampleIndex<examples.length-1)label=config.labels.example;
      else label=config.labels.last;
    }else{
      const stages=[...page.querySelectorAll(config.legacy)];
      const i=visibleIndex(stages);
      label=i<stages.length-1?config.labels.legacyNext:config.labels.legacyLast;
    }
      return label;
    },
    next(page){
    const examples=[...page.querySelectorAll(config.example)];
    if(examples.length){
      const exampleIndex=visibleIndex(examples);
      const example=examples[exampleIndex];
      const steps=[...example.querySelectorAll(config.step)];
      const stepIndex=modellingStepIndex(steps);
      if(steps.length && stepIndex<steps.length-1){
        reveal(steps,stepIndex+1,page);return true;
      }
      if(exampleIndex<examples.length-1){
        showOnly(examples,exampleIndex+1);
        const nextSteps=[...examples[exampleIndex+1].querySelectorAll(config.step)];
        if(nextSteps.length)resetModelSteps(nextSteps);
        return true;
      }
    }else{
      const stages=[...page.querySelectorAll(config.legacy)];
      const i=visibleIndex(stages);
      if(i<stages.length-1){showOnly(stages,i+1);return true;}
    }
      return false;
    },
    previous(page){
    const examples=[...page.querySelectorAll(config.example)];
    if(examples.length){
      const exampleIndex=visibleIndex(examples);
      const example=examples[exampleIndex];
      const steps=[...example.querySelectorAll(config.step)];
      const stepIndex=modellingStepIndex(steps);

      if(stepIndex>=0){
        if(stepIndex===0)resetModelSteps(steps);
        else reveal(steps,stepIndex-1,page);
        return true;
      }

      if(exampleIndex>0){
        showOnly(examples,exampleIndex-1);
        const previousSteps=[...examples[exampleIndex-1].querySelectorAll(config.step)];
        if(previousSteps.length)reveal(previousSteps,previousSteps.length-1,page);
        return true;
      }
    }else{
      const stages=[...page.querySelectorAll(config.legacy)];
      const i=visibleIndex(stages);
      if(i>0){
        showOnly(stages,i-1);
        return true;
      }
    }
      return false;
    }
  };
}
// Keep navigation usable on older lessons and while the phase module loads.
let idoNavigation=createModelNavigator({example:'.ido-example',step:'.ido-step',legacy:'.model-stage',cumulative:page=>page?.dataset.idoReveal==='cumulative',labels:{first:'Reveal Step 1 →',next:'Reveal next step →',example:'Next example →',last:'Continue → We Do',legacyNext:'Next worked example →',legacyLast:'Continue →'}});

/* Opt-in J277 Welcome review only: Code First, then Q2–Q4 together on TV
   or one at a time on mobile. Numbered lessons remain unchanged. */
function welcomeReviewPrepare(page){
  if(page?.dataset.welcomeGroupedReview!=='true')return false;
  if(page.querySelector('.welcome-marking-screen'))return true;
  const questions=[...page.querySelectorAll('.youdo-rolling > .youdo-question')];
  if(questions.length!==4||questions.some(q=>!q.querySelector('.youdo-solution')||!q.querySelector('.question-text')))return false;
  const screen=document.createElement('div');
  screen.className='welcome-marking-screen';screen.hidden=true;
  const stages=['code','exam'].map(type=>{
    const stage=document.createElement('section');
    stage.className='welcome-review-stage welcome-review-'+type;
    stage.hidden=type==='exam';return stage;
  });
  questions.forEach((q,i)=>{
    const card=document.createElement('article');card.className='welcome-review-card';
    const title=document.createElement('h3');
    title.textContent=i===0?'Code First · check and improve':'Question '+(i+1)+' · model response';
    const prompt=q.querySelector('.question-text').cloneNode(true);
    prompt.classList.add('welcome-review-question');
    const answer=q.querySelector('.youdo-solution').cloneNode(true);
    answer.hidden=false;answer.className='welcome-review-answer';
    card.append(title,prompt,answer);stages[i===0?0:1].append(card);
  });
  screen.append(...stages);
  page.querySelector('.youdo-deck').append(screen);
  return true;
}
function welcomeReviewShow(page,index){
  if(!welcomeReviewPrepare(page))return false;
  const phone=window.matchMedia('(max-width:700px)').matches;
  const step=Math.min(phone?3:1,Math.max(0,index));
  const screen=page.querySelector('.welcome-marking-screen');
  const code=screen.querySelector('.welcome-review-code');
  const exam=screen.querySelector('.welcome-review-exam');
  code.hidden=step!==0;exam.hidden=step===0;
  [...exam.querySelectorAll('.welcome-review-card')].forEach((card,i)=>{
    card.hidden=phone?(step!==i+1):false;
  });
  screen.hidden=false;
  page.querySelector('.youdo-rolling').hidden=true;
  page.dataset.answerMode='true';page.dataset.reviewIndex=String(step);
  const progress=page.querySelector('.youdo-window-progress');
  if(progress)progress.textContent=step===0?'SELF-MARK · CODE FIRST':
    phone?'SELF-MARK · Q'+(step+1)+' OF 4':'SELF-MARK · Q2–Q4';
  return true;
}
/* H446 standard You Do: question, then its own model answer.
   Do not apply to J277, timed assessments, rich/grouped marking, or Code First. */
function h446SequentialQuestions(page){
  const match=location.pathname.match(/^\/lessons\/h446\/lesson-(\d{3})(?:\/|\.html|$)/i);
  if(!page||!match)return [];
  // Timed papers must NEVER expose their mark schemes between independent questions.
  // Several historical assessment lessons have no data-assessment-mode flag, so
  // protect them by the established lesson ID and the printed phase-time label.
  const timedPapers=new Set([212,213,214,222,243,247,250,280,305,306,308]);
  const phaseTime=String(page.dataset.phaseTime||'').toLowerCase();
  if(timedPapers.has(Number(match[1]))||
     /closed.?book|original timed|timed assessment|mock|45 minutes|35 minutes/.test(phaseTime))return [];
  if(page.dataset.assessmentMode==='true'||page.dataset.codingFirst==='true'||page.dataset.youDoMode==='coding'||
    page.dataset.selfMarking==='rich'||page.dataset.selfMarking==='grouped'||page.dataset.j277SeparateReview==='true'||
    page.querySelector('.youdo-stage'))return [];
  const questions=[...page.querySelectorAll('.youdo-question')];
  return questions.length&&questions.every(q=>q.querySelector('.youdo-solution'))?questions:[];
}
function isH446SequentialYouDo(page){return h446SequentialQuestions(page).length>0;}
function showH446SequentialStage(page,n,answer){
  const qs=h446SequentialQuestions(page);
  if(!qs.length)return false;
  const i=Math.max(0,Math.min(n,qs.length-1));
  page.dataset.answerMode=answer?'true':'false';
  page.dataset.answerIndex=String(i);
  page.dataset.windowStart=String(i);
  page.dataset.workMode='independent';
  page.dataset.h446Sequential='true';
  qs.forEach((q,k)=>{q.hidden=k!==i;q.querySelector('.youdo-solution').hidden=k!==i||!answer;});
  const p=page.querySelector('.youdo-window-progress');
  if(p){
    const tag=qs[i].querySelector('.phase-tag')?.textContent||'';
    const heading=qs[i].querySelector('h2,h3')?.textContent||'';
    const markText=(tag+' '+heading).match(/\b(\d{1,2})\s*marks?\b|\[(\d{1,2})\]/i);
    const minutes=markText?Number(markText[1]||markText[2]):0;
    p.textContent=(answer?'ANSWER ':'QUESTION ')+(i+1)+' OF '+qs.length+
      (minutes?' · '+minutes+' '+(minutes===1?'MINUTE':'MINUTES'):'');
  }
  qs[i].scrollTop=0;
  const prompt=qs[i].querySelector('.youdo-question-prompt');
  if(prompt)prompt.scrollTop=0;
  return true;
}


/* Year 13 H446 exam practice: one question sheet (up to four), followed
 * by one model answer at a time. Specialist labs and assessments use their
 * existing controllers. Group sizes are limited by reading complexity. */
function isH446BankQuestionSheet(page){
  return !!page && (page.dataset.h446Y13Bank==='true'||page.dataset.y13ExamPractice==='true')
    && isH446SequentialYouDo(page);
}
function h446QuestionSheetGroups(page){
  const questions=h446SequentialQuestions(page);
  const groups=[];
  // Four questions per sheet is the normal Year 13 classroom pattern.
  // A lesson with fewer authored questions displays all of those together,
  // rather than turning each question into a separate screen.
  const size=page.dataset.h446TwoPagePilot==='true'?2:4;
  for(let start=0;start<questions.length;start+=size){
    groups.push({start,end:Math.min(start+size,questions.length)});
  }
  return groups;
}
function h446QuestionSheetGroupFor(page,n){
  const groups=h446QuestionSheetGroups(page);
  return groups.find(g=>n>=g.start&&n<g.end)||groups[0]||null;
}
function h446AppendSourceAnswerSvg(question){
  const id=question.dataset.rhsBankId;
  const diagrams={
    'RHS-H446-025':{
      file:'half-adder-model-desktop.svg',
      alt:'Worked half-adder circuit and complete four-row truth table for Sum and Carry.'
    },
    'RHS-H446-027':{
      file:'full-adder-two-half-adders-model-desktop.svg',
      alt:'Worked full-adder wiring: two half-adders and an OR gate producing Sum and Carry-out.'
    }
  };
  const artwork=diagrams[id];
  if(!artwork)return;
  const solution=question.querySelector('.youdo-solution');
  if(!solution||solution.querySelector('img,svg'))return;
  const img=document.createElement('img');
  img.className='rhs-y13-answer-diagram';
  img.src='../../../assets/exam-questions/h446/'+artwork.file;
  img.alt=artwork.alt;
  img.loading='lazy';
  img.decoding='async';
  solution.appendChild(img);
}
function h446ShowQuestionSheet(page,requestedStart){
  const questions=h446SequentialQuestions(page);
  const group=h446QuestionSheetGroupFor(page,requestedStart);
  if(!group)return false;
  page.dataset.h446QuestionSheet='true';
  page.dataset.h446GroupStart=String(group.start);
  page.dataset.h446GroupCount=String(group.end-group.start);
  page.dataset.windowStart=String(group.start);
  page.dataset.answerIndex=String(group.start);
  page.dataset.answerMode='false';
  page.dataset.workMode='independent';
  questions.forEach((q,i)=>{
    q.hidden=i<group.start||i>=group.end;
    const answer=q.querySelector('.youdo-solution');
    if(answer)answer.hidden=true;
    // Context remains optional on the question sheet: do not expand a long scenario automatically.
    // Students may open it when needed without crowding out the exam task.
  });
  const progress=page.querySelector('.youdo-window-progress');
  if(progress){
    const text=questions.reduce((list,q,i)=>{
      if(i<group.start||i>=group.end)return list;
      const tag=q.querySelector('.phase-tag')?.textContent||'';
      const m=tag.match(/\b(\d{1,2})\s*marks?\b/i);
      return list+(m?Number(m[1]):0);
    },0);
    const label=group.end-group.start===1?'QUESTION '+(group.start+1):
      'QUESTIONS '+(group.start+1)+'–'+group.end;
    progress.textContent=label+' OF '+questions.length+(text?' · '+text+' MARKS / MINUTES':'');
  }
  return true;
}
function h446ShowSingleAnswer(page,index){
  const questions=h446SequentialQuestions(page);
  const group=h446QuestionSheetGroupFor(page,index);
  if(!group)return false;
  const i=Math.max(group.start,Math.min(index,group.end-1));
  page.dataset.h446QuestionSheet='true';
  page.dataset.h446GroupStart=String(group.start);
  page.dataset.h446GroupCount='1';
  page.dataset.windowStart=String(group.start);
  page.dataset.answerIndex=String(i);
  page.dataset.answerMode='true';
  page.dataset.workMode='independent';
  questions.forEach((q,k)=>{
    q.hidden=k!==i;
    const answer=q.querySelector('.youdo-solution');
    if(answer)answer.hidden=k!==i;
  });
  h446AppendSourceAnswerSvg(questions[i]);
  const progress=page.querySelector('.youdo-window-progress');
  if(progress){
    const heading=questions[i].querySelector('.phase-tag')?.textContent||'';
    const m=heading.match(/\b(\d{1,2})\s*marks?\b/i);
    progress.textContent='ANSWER '+(i+1)+' OF '+questions.length+(m?' · '+m[1]+' MARKS':'');
  }
  const q=questions[i];q.scrollTop=0;
  const prompt=q.querySelector('.youdo-question-prompt');
  const solution=q.querySelector('.youdo-solution');
  if(prompt)prompt.scrollTop=0;
  if(solution)solution.scrollTop=0;
  return true;
}

function showYouDoAnswer(page,index){
  const questions=[...page.querySelectorAll('.youdo-question')];
  if(!questions.length)return;
  page.dataset.answerIndex=String(index);
  questions.forEach(q=>{
    if(q.querySelector('.youdo-question-prompt'))return;
    const prompt=document.createElement('div');
    prompt.className='youdo-question-prompt';
    [...q.children].filter(el=>!el.classList.contains('youdo-solution')).forEach(el=>prompt.appendChild(el));
    q.insertBefore(prompt,q.firstChild);
  });
  questions.forEach((q,i)=>{
    q.hidden=i!==index;
    const solution=q.querySelector('.youdo-solution');
    if(solution)solution.hidden=i!==index;
    if(i===index){
      const prompt=q.querySelector('.youdo-question-prompt');
      if(prompt)prompt.scrollTop=0;
      if(solution)solution.scrollTop=0;
    }
  });
  const progress=page.querySelector('.youdo-window-progress');
  if(progress)progress.textContent='ANSWER '+(index+1)+' OF '+questions.length;
}

/* Opt-in H446 You Do self-marking for explicitly flagged lessons only.
   Independent questions and model answers must never occupy the same screen. */
function isH446GroupedMarking(page){
  return page?.dataset.selfMarking==='grouped'
    && /^\/lessons\/h446\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname);
}
function prepareH446GroupedMarking(page){
  if(!isH446GroupedMarking(page))return;
  if(page.querySelector('.h446-marking-screen'))return;
  const questions=[...page.querySelectorAll('.youdo-questions > .youdo-question')];
  if(!questions.length||questions.some(q=>!q.querySelector('.youdo-solution')))return;
  const screen=document.createElement('div');
  screen.className='h446-marking-screen';
  screen.hidden=true;
  const heading=document.createElement('h2');
  heading.className='h446-marking-heading';
  heading.textContent='Self-marking · Model answers';
  const cards=document.createElement('div');
  cards.className='h446-marking-cards';
  cards.setAttribute('aria-label','You Do model answers');
  questions.forEach((q,i)=>{
    const card=document.createElement('article');
    card.className='h446-marking-card';
    const phaseTag=q.querySelector('.phase-tag')?.textContent||'';
    const phaseMarks=phaseTag.match(/\b(\d+)\s*marks?\b/i);
    const originalScheme=q.querySelector('.youdo-solution p')?.textContent||'';
    const schemeMarks=originalScheme.match(/^\s*\[(\d+)\]/);
    const markCount=phaseMarks?.[1]||schemeMarks?.[1]||'';
    if(markCount)card.dataset.reviewMarks=markCount;
    const sourcePrompt=q.querySelector('.youdo-question-prompt');
    const questionText=sourcePrompt?.querySelector('h2')?.textContent?.trim()||'';
    // One review screen by default, regardless of question wording length.
    // Use two only for substantial structured content (code blocks, diagrams,
    // figures, tables) or an explicit teacher-authored "two" override.
    // Inline code, e.g. a single variable name, is not a reason to split.
    const override=q.dataset.reviewLayout;
    const richQuestion=!!sourcePrompt?.querySelector(
      'pre,svg,img,table,figure,canvas,iframe,.code-block,.trace-table'
    );
    const twoScreens=override==='two'||(override!=='one'&&richQuestion);
    card.dataset.reviewLayout=twoScreens?'two':'one';
    if(twoScreens&&sourcePrompt){
      const questionStage=document.createElement('div');
      questionStage.className='h446-review-question-stage';
      const fullPrompt=sourcePrompt.cloneNode(true);
      fullPrompt.querySelector('.phase-tag')?.remove();
      questionStage.append(fullPrompt);
      questionStage.hidden=true;
      card.append(questionStage);
    }
    const prompt=document.createElement('p');
    prompt.className='h446-marking-question';
    // A two-screen answer may use an authored, complete one-line recap.
    // Without one, retain the full question rather than cutting it mid-sentence.
    const recap=twoScreens?(q.dataset.reviewRecap||'').trim():'';
    prompt.textContent=recap?'Question focus: '+recap:questionText;
    const solution=q.querySelector('.youdo-solution').cloneNode(true);
    solution.hidden=false;
    const body=document.createElement('div');
    body.className='h446-marking-body';
    body.append(prompt,solution);

    // Present the existing authored mark scheme as discrete marking points.
    // Leave the original paragraph in the DOM, without changing its wording.
    const original=solution.querySelector('p');
    const raw=original?.textContent?.trim()||'';
    const total=raw.match(/^\[(\d+)\]\s*/);
    if(total){
      const rest=raw.slice(total[0].length);
      const matches=[...rest.matchAll(/([\s\S]*?)\s*\[(\d+)\]/g)];
      const entries=matches.map(match=>({
        text:match[1].replace(/^[,;:\s]+/,'').trim(),
        marks:Number(match[2])
      }));
      const last=matches[matches.length-1];
      const tail=last?rest.slice(last.index+last[0].length):rest;
      const valid=entries.length>0
        && entries.reduce((n,part)=>n+part.marks,0)===Number(total[1])
        && entries.every(part=>part.text&&part.marks>0)
        && /^[.;\s]*$/.test(tail);
      if(valid){
        const points=document.createElement('div');
        points.className='h446-marking-points';
        points.setAttribute('aria-label','Marking points');
        entries.forEach(entry=>{
          const item=document.createElement('div');
          item.className='h446-mark-point';
          const criterion=document.createElement('span');
          criterion.className='h446-mark-criterion';
          criterion.textContent=entry.text;
          const credit=document.createElement('span');
          credit.className='h446-mark-credit';
          credit.textContent=entry.marks+' '+(entry.marks===1?'mark':'marks');
          item.append(criterion,credit);
          if(/^(?:[AB]\s*=\s*\d+|x remains \d+)/i.test(entry.text)){
            item.classList.add('h446-mark-result');
          }
          points.append(item);
        });
        original.hidden=true;
        solution.append(points);
      }
    }
    card.append(body);
    cards.append(card);
  });
  const header=document.createElement('div');
  header.className='h446-marking-header';
  const marks=document.createElement('span');
  marks.className='h446-marking-total';
  header.append(heading,marks);
  screen.append(header,cards);
  page.querySelector('.youdo-deck')?.after(screen);
  page.querySelectorAll('.youdo-questions .youdo-solution').forEach(a=>a.hidden=true);
}
function showH446GroupedMarking(page,visible,index=0,requestedStep){
  const screen=page.querySelector('.h446-marking-screen');
  const deck=page.querySelector('.youdo-deck');
  if(!screen||!deck)return false;
  const cards=[...screen.querySelectorAll('.h446-marking-card')];
  if(!cards.length)return false;
  const safe=Math.min(cards.length-1,Math.max(0,index));
  const active=cards[safe];
  const step=active.dataset.reviewLayout==='two'&&requestedStep!=='answer'?'question':'answer';
  page.dataset.answerMode=visible?'true':'false';
  page.dataset.answerIndex=String(safe);
  page.dataset.reviewStep=step;
  deck.hidden=!!visible;
  screen.hidden=!visible;
  cards.forEach((card,i)=>{
    card.classList.toggle('is-active',i===safe);
    card.hidden=!visible||i!==safe;
    const fullQuestion=card.querySelector('.h446-review-question-stage');
    const answer=card.querySelector('.h446-marking-body');
    if(fullQuestion)fullQuestion.hidden=!visible||i!==safe||step!=='question';
    if(answer)answer.hidden=!visible||i!==safe||step!=='answer';
  });
  const heading=screen.querySelector('.h446-marking-heading');
  if(heading)heading.textContent='Self-marking · Question '+(safe+1)+' of '+cards.length+
    (step==='answer'?' · Model answer':'');
  const marks=screen.querySelector('.h446-marking-total');
  if(marks){
    const count=active.dataset.reviewMarks;
    marks.hidden=!count;
    marks.textContent=count?count+' '+(count==='1'?'mark':'marks'):'';
  }
  if(!visible)page.querySelectorAll('.youdo-questions .youdo-solution').forEach(a=>a.hidden=true);
  return true;
}


// Opt-in teacher review for older H446 lessons that contain a diagram or
// worked C# solution. This is separate from the modern 3-question review.
function isH446RichReview(page){
  return page?.dataset.selfMarking==='rich'
    && /^\/lessons\/h446\/lesson-(020|029)(?:\/|\.html|$)/i.test(location.pathname);
}
function prepareH446RichReview(page){
  if(!isH446RichReview(page))return;
  if(page.querySelector('.h446-rich-review'))return;
  const deck=page.querySelector('.youdo-deck');
  const tasks=[...page.querySelectorAll('.youdo-deck .youdo-rolling > .youdo-question')];
  if(!deck||tasks.length!==4)return;
  if(tasks.some(q=>!q.querySelector('.youdo-solution,.k29-model-answer')))return;
  const review=document.createElement('div');
  review.className='h446-rich-review';
  review.hidden=true;
  tasks.forEach((q,i)=>{
    const map=!!q.querySelector('.k29-model-answer');
    const heading=q.querySelector('h3')?.textContent?.trim()||'Review your work';
    const question=map?q.querySelector('.k29-independent'):q.querySelector('.question-text');
    const answer=map?q.querySelector('.k29-model-answer .k29-independent'):q.querySelector('.youdo-solution');
    if(!question||!answer)return;
    for(const kind of ['question','answer']){
      const stage=document.createElement('article');
      stage.className='h446-rich-stage';
      stage.dataset.kind=kind;
      stage.dataset.question=String(i);
      stage.hidden=true;
      const eyebrow=document.createElement('div');
      eyebrow.className='h446-rich-kicker';
      eyebrow.textContent='SELF-MARKING · QUESTION '+(i+1)+' OF '+tasks.length+
        ' · '+(kind==='question'?'REVIEW QUESTION':'MODEL ANSWER');
      const panel=document.createElement('div');
      panel.className='h446-rich-panel';
      const title=document.createElement('h2');
      title.textContent=heading.replace(/^\d+\.\s*/,'');
      const content=(kind==='question'?question:answer).cloneNode(true);
      content.hidden=false;
      content.classList.add('h446-rich-content');
      if(kind==='answer'){
        content.querySelector(':scope > strong')?.remove();
      }
      panel.append(title,content);
      stage.append(eyebrow,panel);
      review.append(stage);
    }
  });
  if(review.querySelectorAll('.h446-rich-stage').length!==tasks.length*2)return;
  deck.after(review);
}
function showH446RichReview(page,visible,stepIndex=0){
  const review=page.querySelector('.h446-rich-review');
  const deck=page.querySelector('.youdo-deck');
  if(!review||!deck)return false;
  const stages=[...review.querySelectorAll('.h446-rich-stage')];
  if(!stages.length)return false;
  const safe=Math.max(0,Math.min(stepIndex,stages.length-1));
  page.dataset.answerMode=visible?'true':'false';
  page.dataset.richStepIndex=String(safe);
  deck.hidden=!!visible;
  review.hidden=!visible;
  stages.forEach((stage,i)=>stage.hidden=!visible||i!==safe);
  if(visible)window.scrollTo({top:0,behavior:'instant'});
  return true;
}

function prepareYouDoAnswers(page){
  const questions=[...page.querySelectorAll('.youdo-question')];
  if(!questions.length)return;
  const missing=questions.map((q,i)=>({q,i})).filter(({q})=>!q.querySelector('.youdo-solution'));
  if(!missing.length||page.dataset.modelAnswersLoading==='true')return;

  // Never label a success-check hint as a complete model answer.
  // Reuse the authored worked solutions from the lesson's answers.html.
  missing.forEach(({q,i})=>{
    const panel=document.createElement('div');
    panel.className='youdo-solution';
    panel.hidden=true;
    panel.innerHTML='<strong>WORKED ANSWER '+(i+1)+' OF '+questions.length+'</strong><p>Loading the model answer…</p>';
    q.appendChild(panel);
  });

  page.dataset.modelAnswersLoading='true';
  fetch('answers.html',{cache:'no-cache'}).then(response=>{
    if(!response.ok)throw Error('Model answers unavailable');
    return response.text();
  }).then(html=>{
    const doc=new DOMParser().parseFromString(html,'text/html');
    const stages=[...doc.querySelectorAll('.answer-stage')];
    if(stages.length!==questions.length)throw Error('Answer count differs from question count');
    missing.forEach(({q,i})=>{
      const source=stages[i].querySelector('.answer-solution,.solution-card,.answer-card');
      if(!source)throw Error('Worked answer '+(i+1)+' is missing');
      const panel=q.querySelector('.youdo-solution');
      if(!panel)return;
      panel.innerHTML='<strong>WORKED ANSWER '+(i+1)+' OF '+questions.length+'</strong>'+source.innerHTML;
    });
  }).catch(()=>{
    // A genuine missing answer must be reported, not invented from an answer hint.
    missing.forEach(({q,i})=>{
      const panel=q.querySelector('.youdo-solution');
      if(!panel)return;
      panel.innerHTML='<strong>WORKED ANSWER '+(i+1)+' OF '+questions.length+'</strong><p>The worked answer could not be loaded on this screen.</p><p><a href="answers.html" target="_blank" rel="noopener">Open the full answer booklet →</a></p>';
    });
  }).finally(()=>{page.dataset.modelAnswersLoading='false';});
}
/* The three-question classroom window becomes a single question on phones.
   Keep question, mark scheme and source order unchanged across both courses. */
function youDoWindowSize(page,total){
  const requested=Math.max(1,Number(page.dataset.windowSize||3));
  if(window.matchMedia('(max-width:700px)').matches)return 1;
  // Explicit formatting opt-in only: a full-width question window for
  // unusually long Year 13 written/ERL questions on short classroom screens.
  // Standard 1080p TV continues using the approved three-question grouping.
  if(page.dataset.compactWindowSize
     && window.matchMedia('(min-width:901px) and (max-height:700px)').matches){
    return Math.min(requested,total,Math.max(1,Number(page.dataset.compactWindowSize)));
  }
  return Math.min(requested,total);
}
function setYouDoWindow(page,start){
  const questions=[...page.querySelectorAll('.youdo-question')];
  if(!questions.length)return;
  const size=youDoWindowSize(page,questions.length);
  const maxStart=Math.max(0,questions.length-size);
  const safe=Math.max(0,Math.min(start,maxStart));
  page.dataset.windowStart=String(safe);
  // Opt-in: begin with one full-width coding challenge, then return to
  // the normal three-question window for exam practice. Other lessons unchanged.
  const codingFirst=page.dataset.codingFirst==='true';
  questions.forEach((q,i)=>q.hidden=codingFirst&&safe===0 ? i!==0 : !(i>=safe&&i<safe+size));
  const progress=page.querySelector('.youdo-window-progress');
  if(progress){
    // RHS J277 Lesson 134 is opt-in. Keep its stage labels distinct from
    // the older source-link exam pilot and every normal lesson.
    if(page.dataset.rhsExamPilot==='true'){
      const stage=questions[safe];
      if(safe===0)progress.textContent='CODE FIRST · PREDICT / WRITE';
      else if(safe===1)progress.textContent='CODE FIRST · CHECK / IMPROVE';
      else if(safe===2)progress.textContent='EXAM PRACTICE · 4 QUESTIONS · 10 MARKS';
      else{
        const match=stage?.querySelector('.j277-ec-intro h2')?.textContent||'';
        const phase=stage?.classList.contains('j277-rhs-mark-stage')?'SELF-MARK':
          stage?.classList.contains('j277-rhs-examiner-stage')?'EXAMINER INSIGHT':'IMPROVE';
        progress.textContent=phase+(match?' · '+match.toUpperCase():'');
      }
      return;
    }
    if(page.dataset.j277SeparateReview==='true'){
      // RHS bank previews keep Code First first, followed by one or more
      // question screens, then one marking answer per screen. No new phase.
      if(page.dataset.rhsBankPreview==='true'){
        const bankStart=Number(page.dataset.rhsBankStart||2);
        const bankPages=Number(page.dataset.rhsBankQuestionPages||1);
        const bankCount=Number(page.dataset.rhsBankCount||4);
        progress.textContent=safe===0?'CODE FIRST · PREDICT':
          safe===1?'CODE FIRST · CHECK & IMPROVE':
          safe>=bankStart&&safe<bankStart+bankPages
            ?'EXAM QUESTIONS · PAGE '+(safe-bankStart+1)+' OF '+bankPages:
          'EXAM ANSWER '+(safe-bankStart-bankPages+1)+' OF '+bankCount;
        return;
      }
      const reviewStart=Number(page.dataset.j277ReviewStart||4);
      const originalAnswerCount=page.dataset.rhsBankPreview==='true'
        ?bankStart-reviewStart:questions.length-reviewStart;
      progress.textContent=safe===0?'':safe<reviewStart
        ?'QUESTION '+safe+' OF '+(reviewStart-1)
        :'ANSWER '+(safe-reviewStart+1)+' OF '+originalAnswerCount;
      return;
    }
    if(codingFirst&&safe===0){
      progress.textContent='CODE FIRST · THEN EXAM PRACTICE';
    }else{
      const first=safe+1;
      const last=Math.min(safe+size,questions.length);
      const noun=page.dataset.youDoMode==='coding'?'Challenges':'Questions';
      progress.textContent=isH446RichReview(page)&&size===1
        ?'Question '+first+' of '+questions.length
        :noun+' '+first+'–'+last+' of '+questions.length;
    }
  }
}

function prepareObjectiveVocabularySupport(){
  const lessonSupportLabel=document.querySelector('meta[name="lesson-vocabulary-support-label"]')?.content.trim();
  document.querySelectorAll('.objective-vocab-stage').forEach(stage=>{
    const definition=stage.querySelector('[data-objective-vocab-definition]');
    if(!definition)return;

    const existing=definition.querySelector('.objective-vocab-support');
    const support=(stage.dataset.support||existing?.textContent||'').trim();

    if(!support){
      if(existing)existing.remove();
      return;
    }

    const p=existing||document.createElement('p');
    p.className='objective-vocab-support';
    p.textContent=support;
    // Preserve the author's distinction between an example, thinking prompt,
    // reminder and an unlabelled note. A lesson or term may override the label
    // as content metadata, without introducing lesson-specific behaviour.
    if(stage.closest('#overview[data-vocab-display="focus"]')){
      const prefix=support.match(/^(Example|Think|Remember)\s*:\s*/i);
      const labelText=(stage.dataset.supportLabel||lessonSupportLabel||prefix?.[1]||'Note').trim();
      p.textContent=prefix?support.slice(prefix[0].length).trim():support;
      const label=document.createElement('strong');
      label.className='objective-vocab-support-label';
      label.textContent=labelText.toUpperCase();
      p.prepend(label);
    }
    if(!existing)definition.appendChild(p);
  });
}

function prepareVocabulary(){
  const page=document.getElementById('vocabulary');
  if(!page||page.dataset.vocabPrepared==='true')return;
  const stages=[...page.querySelectorAll('.vocab-stage')];
  if(!stages.length)return;


  // H446 vocabulary uses definition-first retrieval, matching Lesson 001.
  // Older generated pages store term and definition together; build the same
  // prompt/hidden-answer markup before the normal phase controller runs.
  if(document.querySelector('.course-back[href*="h446-hub"]')){
    if(stages.every(stage=>stage.querySelector('.vocab-prompt')&&stage.querySelector('[data-vocab-answer]'))){
      page.dataset.vocabFlow='retrieval';
    }else if(stages.every(stage=>stage.querySelector('h2')&&stage.querySelector('p'))){
      const entries=stages.map(stage=>({
        term:stage.querySelector('h2').textContent.trim(),
        definition:stage.querySelector('p').textContent.trim()
      }));
      const deck=document.createElement('div');
      deck.className='vocab-deck';
      const make=(tag,cls,text)=>{const el=document.createElement(tag);el.className=cls;if(text!==undefined)el.textContent=text;return el;};
      entries.forEach((entry,i)=>{
        const stage=make('article','vocab-stage');stage.hidden=i!==0;
        const prompt=make('div','vocab-prompt');
        prompt.append(make('span','vocab-test-label','QUESTION '+(i+1)+' OF '+entries.length),
          make('h2','','Recall the term'),make('p','vocab-question',entry.definition),
          make('span','vocab-stage-count',(i+1)+' of '+entries.length));
        const answer=make('div','vocab-answer');answer.setAttribute('data-vocab-answer','');answer.hidden=true;
        answer.append(make('span','vocab-test-label','ANSWER'),make('div','vocab-answer-value',entry.term));
        stage.append(prompt,answer);deck.append(stage);
      });
      page.replaceChildren(deck);
      page.dataset.vocabFlow='retrieval';
    }
    if(page.dataset.vocabFlow==='retrieval'){page.dataset.vocabPrepared='true';return;}
  }

  if(page.dataset.vocabFlow==='retrieval'){
    page.dataset.vocabPrepared='true';
    return;
  }

  if(page.dataset.vocabFlow==='term-definition'){
    const entries=stages.map((stage,i)=>({
      term:(stage.querySelector('.vocab-term-heading')?.textContent||('Term '+(i+1))).trim(),
      definition:(stage.querySelector('.vocab-definition-value')?.textContent||'').trim()
    }));
    const byTerm=new Map(entries.map(entry=>[entry.term.toLowerCase(),entry]));
    document.querySelectorAll('.vocab-intro-list .vocab-tip').forEach((chip,i)=>{
      const entry=byTerm.get(chip.textContent.trim().toLowerCase())||entries[i];
      if(!entry?.definition)return;
      if(!chip.dataset.definition)chip.dataset.definition=entry.definition;
      chip.tabIndex=0;
      chip.setAttribute('aria-label',entry.term+': '+entry.definition);
    });
    page.dataset.vocabPrepared='true';
    return;
  }

  const entries=[];
  stages.forEach((stage,i)=>{
    const prompt=stage.querySelector('.vocab-prompt');
    const answer=stage.querySelector('[data-vocab-answer]');
    const promptLabel=prompt?.querySelector('.vocab-test-label');
    const heading=prompt?.querySelector('h2');
    const question=prompt?.querySelector('.vocab-question');
    const answerLabel=answer?.querySelector('.vocab-test-label');
    const answerValue=answer?.querySelector('.vocab-answer-value');
    const note=answer?.querySelector('p');

    const term=(answerValue?.textContent||heading?.textContent||('Term '+(i+1))).trim();
    const definition=(question?.textContent||note?.textContent||'').trim();
    const noteText=(note?.textContent||'').trim();

    stage.dataset.vocabTerm=term;
    stage.dataset.vocabDefinition=definition;
    if(prompt)prompt.classList.add('vocab-term-mode');
    if(promptLabel)promptLabel.textContent='TERM '+(i+1)+' OF '+stages.length;
    if(heading){
      heading.textContent=term;
      heading.classList.add('vocab-term-heading');
    }
    if(question)question.hidden=true;
    if(answerLabel)answerLabel.textContent='DEFINITION';
    if(answerValue){
      answerValue.textContent=definition;
      answerValue.classList.add('vocab-definition-value');
    }
    if(note){
      if(!noteText||noteText.toLowerCase()===definition.toLowerCase())note.hidden=true;
      else note.classList.add('vocab-definition-note');
    }
    entries.push({term,definition});
  });

  const byTerm=new Map(entries.map(entry=>[entry.term.toLowerCase(),entry]));
  const chips=[...document.querySelectorAll('.vocab-intro-list span')];
  chips.forEach((chip,i)=>{
    const entry=byTerm.get(chip.textContent.trim().toLowerCase())||entries[i];
    if(!entry?.definition)return;
    chip.classList.add('vocab-tip');
    chip.tabIndex=0;
    chip.dataset.definition=entry.definition;
    chip.setAttribute('aria-label',entry.term+': '+entry.definition);
  });

  page.dataset.vocabPrepared='true';
}
function resetPhaseState(id){
  const page=document.getElementById(id);
  if(!page)return;
  document.querySelectorAll('details.answers').forEach(d=>d.open=false);
  if(id==='overview')objectivesNavigation.reset(page);
  if(id==='do-now')doNowNavigation.reset(page);
  if(id==='new-learning')newLearningNavigation.reset(page);
  if(id==='i-do')idoNavigation.reset(page);
  if(id==='we-do'){
    const examples=[...page.querySelectorAll('.wedo-example')];
    if(examples.length){
      showOnly(examples,0);
      examples.forEach(example=>{
        const steps=[...example.querySelectorAll('.wedo-step')];
        if(steps.length)resetModelSteps(steps);
      });
    }else{
      page.querySelectorAll('[data-reveal-answer]').forEach(el=>el.hidden=true);
      page.querySelectorAll('[data-reveal-prompt]').forEach(el=>el.hidden=false);
    }
  }
  if(id==='you-do'){
    if(page.dataset.welcomeGroupedReview==='true'){
      const screen=page.querySelector('.welcome-marking-screen');
      if(screen)screen.hidden=true;
      const rolling=page.querySelector('.youdo-rolling');
      if(rolling)rolling.hidden=false;
      page.dataset.reviewIndex='0';
    }
    page.dataset.answerMode='false';
    page.dataset.answerIndex='0';
    // Returning to You Do must not expose answers from the previous review.
    // Reset original question panels in every course, leaving cloned review
    // panels alone so their guided self-marking stages still work.
    page.querySelectorAll('.youdo-question .youdo-solution').forEach(answer=>{answer.hidden=true;});
    if(isH446RichReview(page)){
      prepareH446RichReview(page);
      showH446RichReview(page,false);
    }else if(page.dataset.j277SeparateReview!=='true'){
      prepareYouDoAnswers(page);
    }
    if(isH446GroupedMarking(page)){
      prepareH446GroupedMarking(page);
      showH446GroupedMarking(page,false);
    }
    page.dataset.workMode=page.dataset.assessmentMode==='true'||page.dataset.j277SeparateReview==='true'?'independent':'discuss';
    const questions=[...page.querySelectorAll('.youdo-question')];
    if(questions.length){
      setYouDoWindow(page,0);
      if(isH446BankQuestionSheet(page))h446ShowQuestionSheet(page,0);
      else if(isH446SequentialYouDo(page))showH446SequentialStage(page,0,false);
    }else{
      const stages=[...page.querySelectorAll('.youdo-stage')];
      if(stages.length)showOnly(stages,0);
    }
  }
  if(id==='catch-up'||id==='exam-practice')window.H446Optional?.reset?.(id);
  if(id==='exit'){
    const stages=[...page.querySelectorAll('.exit-stage')];
    if(stages.length)showOnly(stages,0);
  }
  if(id==='vocabulary'){
    const stages=[...page.querySelectorAll('.vocab-stage')];
    if(stages.length){
      showOnly(stages,0);
      stages.forEach(stage=>{
        const answer=stage.querySelector('[data-vocab-answer]');
        if(answer)answer.hidden=true;
      });
    }else{
      page.querySelectorAll('.vocab-card').forEach((card,i)=>{
        const term=card.querySelector('dt');
        const definition=card.querySelector('dd');
        const blank=card.querySelector('.vocab-blank');
        if(!term||!definition||!blank)return;
        term.hidden=false;definition.hidden=false;
        term.removeAttribute('data-answer');definition.removeAttribute('data-answer');
        const missing=i%2===0?definition:term;
        missing.hidden=true;missing.setAttribute('data-answer','');
        blank.hidden=false;
        blank.textContent=i%2===0?'Definition: __________':'Keyword: __________';
        card.insertBefore(blank,missing);
      });
    }
  }
}
/* Mobile: compact behaviour + response symbols within the existing lesson title.
   Values are the same ones displayed in the full-size Classroom TV tiles. */
function updateMobileRoutineSignals(values){
  const group=document.getElementById('mobile-lesson-signals');
  const key=document.getElementById('mobile-lesson-key');
  if(!group&&!key)return;
  // The very same symbols appear in the top-right header and the bottom key.
  // Colours and full labels match the three Classroom TV signal tiles.
  const symbols={
    quiet:'<path d="M5 8H3v8h3l5 4V4L6 8Z"/><path d="M16 9l5 6M21 9l-5 6"/>',
    listen:'<path d="M6 11a6 6 0 0 1 12 0c0 5-5 5-5 9a3 3 0 0 1-6 0"/><path d="M10 11a2 2 0 0 1 4 0c0 3-3 3-3 6"/>',
    working:'<path d="M4 20l4.5-1 11-11-3.5-3.5-11 11L4 20Z"/><path d="M14.5 6.5 18 10"/>',
    board:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M7 21h10M12 17v4M7 9h10M7 12h6"/>',
    hand:'<path d="M8 13V6a1.5 1.5 0 0 1 3 0v5-7a1.5 1.5 0 0 1 3 0v7-6a1.5 1.5 0 0 1 3 0v7-4a1.5 1.5 0 0 1 3 0v8c0 4-3 6-7 6h-2c-3 0-5-2-7-6l-1-3a1.5 1.5 0 0 1 3-1l2 3"/>',
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
    talk:'<path d="M4 5h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/><path d="M20 9h1a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2h-5"/>',
    person:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
    choral:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="3"/><path d="M2 20v-2a7 7 0 0 1 13-4M14 14a7 7 0 0 1 8 6"/>',
    recall:'<path d="M4 5h16v14H4z"/><path d="M8 9h8M8 13h5"/>',
    overview:'<path d="M5 4h14v16H5z"/><path d="M9 9l2 2 4-4M9 16h6"/>',
    learn:'<path d="M3 5h8a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H3zM21 5h-6a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h6z"/>',
    model:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    together:'<circle cx="8" cy="7" r="3"/><circle cx="17" cy="8" r="2.5"/><path d="M2 21v-3a6 6 0 0 1 12 0v3M15 15a5 5 0 0 1 7 5v1"/>',
    independent:'<path d="m4 20 4.5-1 11-11-3.5-3.5-11 11L4 20Z"/><path d="M14.5 6.5 18 10"/>',
    vocabulary:'<path d="M4 5h16v15H4z"/><path d="M7 9h10M7 13h7M7 17h5"/>',
    exit:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>'
  };
  const kind=(label,type)=>{
    if(type==='phase'){
      if(current==='do-now')return 'recall';
      if(current==='overview')return 'overview';
      if(current==='new-learning')return 'learn';
      if(current==='i-do')return 'model';
      if(current==='we-do')return 'together';
      if(current==='vocabulary')return 'vocabulary';
      if(current==='exit')return 'exit';
      return 'independent';
    }
    if(type==='routine'){
      if(/listen/i.test(label))return 'listen';
      if(/quiet work/i.test(label))return 'working';
      return 'quiet';
    }
    if(/MWB|whiteboard/i.test(label))return 'board';
    if(/hands up|thumbs up\/down/i.test(label))return 'hand';
    if(/cold call/i.test(label))return 'target';
    if(/turn.*talk/i.test(label))return 'talk';
    if(/choral/i.test(label))return 'choral';
    return 'person';
  };
  const svg=(type,label)=>'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+symbols[kind(label,type)]+'</svg>';
  const keys=['phase','routine','response'];
  keys.forEach((type,i)=>{
    const label=(values[i]||'—').trim();
    const item=group?.querySelector('.mobile-signal-'+type);
    const keyItem=key?.querySelector('.mobile-key-'+type);
    if(item){
      item.setAttribute('aria-label',(type==='phase'?'Learning phase: ':type==='routine'?'Working expectation: ':'Response: ')+label);
      item.title=label;
      item.innerHTML=svg(type,label);
    }
    if(keyItem){
      const icon=keyItem.querySelector('.mobile-key-icon');
      const text=keyItem.querySelector('.mobile-key-label');
      if(icon)icon.innerHTML=svg(type,label);
      if(text)text.textContent=label;
    }
  });
}

function updateSignals(id){
  const page=document.getElementById(id);
  let values=id==='you-do'&&(page?.dataset.workMode==='independent'||page?.dataset.assessmentMode==='true')
    ?youDoIndependentSignals
    :(signalMap[id]||['','','']);
  const kinds=['phase','routine','response'];

  ['phase-logo','behaviour-logo','response-logo'].forEach((key,i)=>{
    let slot=document.getElementById(key);
    if(!slot)return;

    if(slot.tagName==='IMG'){
      const replacement=document.createElement('span');
      replacement.id=key;
      slot.replaceWith(replacement);
      slot=replacement;
    }

    slot.hidden=false;
    slot.className='signal-tile signal-'+kinds[i];
    slot.textContent=values[i]||'—';
    slot.setAttribute('aria-label',values[i]||'');
  });

  const phaseTime=document.getElementById('phase-time');
  if(phaseTime){
    phaseTime.textContent=page?.dataset.phaseTime||'';
  }

  const exitSignal=document.getElementById('exit-ticket-signal');
  if(exitSignal)exitSignal.hidden=true;
  updateMobileRoutineSignals(values);
}

function updateMobileLessonStatus(){
  const status=document.getElementById('mobile-lesson-status');
  if(!status)return;

  const title=status.querySelector('.mobile-lesson-title');
  const phase=status.querySelector('.mobile-phase-status');
  const activeNav=nav.find(button=>button.dataset.page===current);
  const phaseName=(activeNav?.textContent||current).trim();
  const phaseIndex=Math.max(0,order.indexOf(current))+1;

  if(title){
    const raw=document.title.replace(/^OCR (?:H446|J277) · /,'');
    title.textContent=lessonIdFromUrl()?raw.replace(/^Lesson \d{3} · /,''):raw;
  }
  if(phase)phase.textContent=phaseName+' · '+phaseIndex+' / '+order.length;
}

/* Shared I Do / We Do classroom focus. Opt-in during the Year 7 003 pilot.
   Read the existing hidden/revealed state; do not advance, reveal, re-order or
   inject any lesson content. Later rollout needs only the body feature flag. */
function syncClassroomFocus(){
  if(document.body.dataset.classroomFocus!=='pilot'&&
     document.body.dataset.classroomFocus!=='on')return;
  for(const phase of ['i-do','we-do']){
    const page=document.getElementById(phase);
    if(!page)continue;
    page.querySelectorAll('.classroom-focus-active').forEach(el=>
      el.classList.remove('classroom-focus-active'));
    page.querySelectorAll('.classroom-focus-visual-active').forEach(el=>
      el.classList.remove('classroom-focus-visual-active'));
    page.querySelectorAll('[data-classroom-focus-stage]').forEach(el=>
      el.removeAttribute('data-classroom-focus-stage'));
    if(current!==phase)continue;
    const example=page.querySelector(phase==='i-do'
      ?'.ido-example:not([hidden])':'.wedo-example:not([hidden])');
    if(!example)continue;
    const visibleSteps=[...example.querySelectorAll(phase==='i-do'
      ?'.ido-step:not([hidden])':'.wedo-step:not([hidden])')];
    const step=visibleSteps[visibleSteps.length-1];
    const panel=example.querySelector('.method-panel,.ido-method,.wedo-practice');
    if(step){
      step.classList.add('classroom-focus-active');
      if(panel)panel.dataset.classroomFocusStage='step';
      // Optional visual-to-model mapping: author a matching step number on
      // diagram parts only where the relationship is educationally accurate.
      // Unannotated lessons work with the same focus typography automatically.
      const steps=[...example.querySelectorAll(phase==='i-do'?'.ido-step':'.wedo-step')];
      const activeNumber=String(steps.indexOf(step)+1);
      example.querySelectorAll('[data-classroom-focus-step]').forEach(visual=>{
        const mapped=(visual.dataset.classroomFocusStep||'').split(/[\s,]+/);
        if(mapped.includes(activeNumber))visual.classList.add('classroom-focus-visual-active');
      });
    }else{
      const prompt=example.querySelector('.prompt-panel,.ido-reference,.wedo-reference');
      if(prompt)prompt.classList.add('classroom-focus-active');
      if(panel)panel.dataset.classroomFocusStage='question';
    }
  }
}

function updateControl(){
  const page=document.getElementById(current);
  let label='Continue →';
  if(current==='overview'){
    label=objectivesNavigation.nextLabel(page);
  }else if(current==='do-now'){
    label=doNowNavigation.nextLabel(page);
  }else if(current==='new-learning'){
    label=newLearningNavigation.nextLabel(page);
  }else if(current==='i-do'){
    label=idoNavigation.nextLabel(page);
  }else if(current==='we-do'){
    const examples=[...page.querySelectorAll('.wedo-example')];
    if(examples.length){
      const exampleIndex=visibleIndex(examples);
      const example=examples[exampleIndex];
      const steps=[...example.querySelectorAll('.wedo-step')];
      const stepIndex=modellingStepIndex(steps);
      if(steps.length && stepIndex<0)label='Reveal Step 1 →';
      else if(stepIndex<steps.length-1)label=page.dataset.guidedSteps==='true'?'Reveal next step →':'Next check →';
      else if(exampleIndex<examples.length-1)label='Next example →';
      else label='Continue → You Do';
    }else if(page.querySelector('[data-reveal-answer][hidden]')){
      label='Reveal model response';
    }
  }else if(current==='you-do'){
    if(isH446BankQuestionSheet(page)){
      const count=h446SequentialQuestions(page).length;
      const start=Number(page.dataset.h446GroupStart||0);
      const group=h446QuestionSheetGroupFor(page,start);
      const i=Number(page.dataset.answerIndex||start);
      if(page.dataset.h446TwoPagePilot==='true'){
        label=page.dataset.answerMode!=='true'?(group.end<count?'Next questions →':'Begin self-marking →'):
          i<count-1?'Next answer →':'Continue → Key Vocabulary';
      }else{
        label=page.dataset.answerMode!=='true'?'Begin self-marking →':
          i<group.end-1?'Next answer →':
          group.end<count?'Next questions →':'Continue → Key Vocabulary';
      }
    }else if(isH446SequentialYouDo(page)){
      const i=Number(page.dataset.answerIndex||0),count=h446SequentialQuestions(page).length;
      label=page.dataset.answerMode==='true'?(i<count-1?'Next question →':'Continue → Key Vocabulary'):'Reveal answer →';
    }else if(page.dataset.welcomeGroupedReview==='true'){
      if(page.dataset.answerMode==='true'){
        const index=Number(page.dataset.reviewIndex||0);
        const max=window.matchMedia('(max-width:700px)').matches?3:1;
        label=index===max?'Continue → Key Vocabulary':
          index===0?'Self-mark Q2–Q4 →':'Next marking scheme →';
      }else if(page.dataset.workMode!=='independent'){
        label='Begin independent work →';
      }else{
        const index=Number(page.dataset.windowStart||0);
        const mobile=window.matchMedia('(max-width:700px)').matches;
        label=index===0?(mobile?'Next question →':'Continue → Q2–Q4'):
          mobile&&index<3?'Next question →':'Begin self-marking →';
      }
    }else if(page.dataset.rhsExamPilot==='true'){
      const i=Number(page.dataset.windowStart||0);
      const stages=[...page.querySelectorAll('.youdo-question')];
      if(i===0)label='Check Code First →';
      else if(i===1)label='Start 10-mark challenge →';
      else if(i===2)label='Begin self-marking →';
      else if(i>=stages.length-1)label='Continue → Key Vocabulary';
      else if(stages[i+1].classList.contains('j277-rhs-mark-stage'))label='Mark next question →';
      else if(stages[i+1].classList.contains('j277-rhs-examiner-stage'))label='Examiner insight →';
      else label='Improve answer →';
    }else if(page.dataset.j277SeparateReview==='true'){
      const i=Number(page.dataset.windowStart||0);
      const reviewStart=Number(page.dataset.j277ReviewStart||4);
      const count=page.querySelectorAll('.youdo-question').length;
      const bankStart=Number(page.dataset.rhsBankStart||2);
      if(page.dataset.rhsBankPreview==='true'){
        const questionPages=Number(page.dataset.rhsBankQuestionPages||1);
        label=i===0?'Check Code First →':
          i===1?'Begin exam questions →':
          i<bankStart+questionPages-1?'Next exam questions →':
          i===bankStart+questionPages-1?'Begin self-marking →':
          i<count-1?'Next marking answer →':'Continue → Key Vocabulary';
      }else{
        label=i===0?'Continue → Q2':i<reviewStart-1?'Continue → Q'+(i+2):
          i===reviewStart-1?'Begin self-marking →':
          i<count-1?'Next marking scheme →':'Continue → Key Vocabulary';
      }
    }else if(isH446RichReview(page)&&page.querySelector('.h446-rich-review')){
      const all=page.querySelectorAll('.h446-rich-stage');
      const index=Number(page.dataset.richStepIndex||0);
      if(page.dataset.answerMode==='true'){
        label=index>=all.length-1?'Continue → Key Vocabulary':
          index%2===0?'Show model answer →':'Next review question →';
      }else if(page.dataset.workMode!=='independent'){
        label='Begin silent work →';
      }else{
        const count=page.querySelectorAll('.youdo-question').length;
        const size=Math.min(count,Math.max(1,Number(page.dataset.windowSize||1)));
        const maxStart=Math.max(0,count-size);
        label=Number(page.dataset.windowStart||0)<maxStart?'Next challenges →':'Begin teacher review →';
      }
    }else if(isH446GroupedMarking(page)&&page.querySelector('.h446-marking-screen')){
      const count=page.querySelectorAll('.h446-marking-card').length;
      const index=Number(page.dataset.answerIndex||0);
      if(page.dataset.answerMode==='true')label=page.dataset.reviewStep==='question'?'Show model answer →':
        index<count-1?'Next question →':'Continue → Key Vocabulary';
      else label=page.dataset.workMode==='independent'?'Self-mark answers →':'Begin silent work →';
    }else if(page.dataset.answerMode==='true'){
      const count=page.querySelectorAll('.youdo-question').length;
      const index=Number(page.dataset.answerIndex||0);
      label=index<count-1?'Next answer →':'Continue → Key Vocabulary';
    }else if(page.dataset.assessmentMode==='true'){
      label='Test in progress';
    }else if(page.dataset.workMode!=='independent'){
      label='Begin silent work →';
    }else{
      const questions=[...page.querySelectorAll('.youdo-question')];
      if(questions.length){
        const requestedSize=Math.max(1,Number(page.dataset.windowSize||3));
        const size=Math.min(requestedSize,questions.length);
        const maxStart=Math.max(0,questions.length-size);
        const start=Number(page.dataset.windowStart||0);
        if(page.dataset.codingFirst==='true'&&start===0){
          label='Continue → Exam questions';
        }else if(page.dataset.youDoMode==='coding'){
          label=start<maxStart?'Next challenges →':'Continue → Key Vocabulary';
        }else{
          label=start<maxStart?'Next questions →':
            /^\/lessons\/j277\/lesson-\d{3}\//i.test(location.pathname)
              ?'Begin self-marking →':'Continue → Key Vocabulary';
        }
      }else{
        const stages=[...page.querySelectorAll('.youdo-stage')];
        const i=visibleIndex(stages);
        label=i<stages.length-1?'Next independent questions →':'Continue → Key Vocabulary';
      }
    }
  }else if(current==='catch-up'||current==='exam-practice'){
    label=window.H446Optional?.nextLabel?.(current)||'Continue → Key Vocabulary';
  }else if(current==='vocabulary'){
    const stages=[...page.querySelectorAll('.vocab-stage')];
    if(stages.length){
      const i=visibleIndex(stages);
      const answer=stages[i].querySelector('[data-vocab-answer]');
      if(page.dataset.vocabFlow==='retrieval'){
        if(answer&&answer.hidden)label='Reveal term →';
        else if(i<stages.length-1)label='Next definition →';
        else label='Continue → Exit Ticket';
      }else if(answer&&answer.hidden)label='Reveal definition →';
      else if(i<stages.length-1)label='Next term →';
      else label='Continue → Exit Ticket';
    }else if(page.querySelector('.vocab-card [data-answer][hidden]')){
      label='Reveal next answer';
    }
  }else if(page.querySelector('details.answers:not([open])')){
    label='Reveal answers';
  }else if(current==='exit'){
    const stages=[...page.querySelectorAll('.exit-stage')];
    if(stages.length){
      const i=visibleIndex(stages);
      if(i===0)label=page.classList.contains('exit-yesno')?'Reveal answer →':'Reveal answers →';
      else if(i===1)label=page.classList.contains('exit-yesno')?'Next → Confidence':'How did the lesson go? →';
      else label='Back to Do Now';
    }else{
      label='Back to Do Now';
    }
  }
  advance.textContent=label;
  teacherNextAction.textContent=label.replace(/[←→]/g,'').trim();
  teacherNextAction.title=teacherNextAction.textContent;
  advance.title=teacherNextAction.textContent;
  const canStepBackInDoNow=current==='do-now'&&doNowNavigation.canBack(page);
  previous.disabled=(order.indexOf(current)===0&&!canStepBackInDoNow)||(current==='you-do'&&page?.dataset.assessmentMode==='true');
  document.getElementById('page-count').textContent=(order.indexOf(current)+1)+' / '+order.length;
  syncClassroomFocus();
  updateMobileLessonStatus();
}
function showPage(id){
  if(!order.includes(id))id='do-now';
  current=id;
  pages.forEach(p=>p.classList.toggle('active',p.id===id));
  nav.forEach(b=>{
    const active=b.dataset.page===id;
    b.classList.toggle('active',active);
    if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');
  });
  resetPhaseState(id);
  updateSignals(id);
  history.replaceState(null,'','#'+id);
  updateControl();
  window.scrollTo({top:0,behavior:'instant'});
}
function next(){
  const page=document.getElementById(current);
  // Phone objectives show the key terms as a reference list; do not require
  // twelve separate reveal swipes before the student can reach New Learning.
  if(current==='overview'&&objectivesNavigation.skip(page)){
    showPage(order[order.indexOf('overview')+1]||'new-learning');
    return;
  }
  if(current==='overview'&&objectivesNavigation.next(page)){updateControl();return;}
  if(current==='do-now'&&doNowNavigation.step(page,1)){updateControl();return;}
  if(current==='new-learning'&&newLearningNavigation.step(page,1)){updateControl();return;}
  if(current==='i-do'&&idoNavigation.next(page)){updateControl();return;}
  if(current==='we-do'){
    const examples=[...page.querySelectorAll('.wedo-example')];
    if(examples.length){
      const exampleIndex=visibleIndex(examples);
      const example=examples[exampleIndex];
      const steps=[...example.querySelectorAll('.wedo-step')];
      const stepIndex=modellingStepIndex(steps);
      if(steps.length && stepIndex<steps.length-1){
        showOnly(steps,stepIndex+1);
        updateControl();
        return;
      }
      if(exampleIndex<examples.length-1){
        showOnly(examples,exampleIndex+1);
        const nextSteps=[...examples[exampleIndex+1].querySelectorAll('.wedo-step')];
        if(nextSteps.length)resetModelSteps(nextSteps);
        updateControl();
        return;
      }
    }else{
      const answer=page.querySelector('[data-reveal-answer][hidden]');
      if(answer){
        page.querySelectorAll('[data-reveal-prompt]').forEach(el=>el.hidden=true);
        answer.hidden=false;updateControl();return;
      }
    }
  }
  if(current==='you-do'){
    if(isH446BankQuestionSheet(page)){
      const count=h446SequentialQuestions(page).length;
      const start=Number(page.dataset.h446GroupStart||0);
      const group=h446QuestionSheetGroupFor(page,start);
      const index=Number(page.dataset.answerIndex||start);
      if(page.dataset.h446TwoPagePilot==='true'){
        if(page.dataset.answerMode!=='true'){
          if(group.end<count)h446ShowQuestionSheet(page,group.end);
          else h446ShowSingleAnswer(page,0);
        }else if(index<count-1)h446ShowSingleAnswer(page,index+1);
        else{showPage('vocabulary');return;}
      }else{
        if(page.dataset.answerMode!=='true')h446ShowSingleAnswer(page,group.start);
        else if(index<group.end-1)h446ShowSingleAnswer(page,index+1);
        else if(group.end<count)h446ShowQuestionSheet(page,group.end);
        else{showPage('vocabulary');return;}
      }
      updateSignals('you-do');updateControl();return;
    }
    if(isH446SequentialYouDo(page)){
      const i=Number(page.dataset.answerIndex||0),count=h446SequentialQuestions(page).length;
      if(page.dataset.answerMode!=='true')showH446SequentialStage(page,i,true);
      else if(i<count-1)showH446SequentialStage(page,i+1,false);
      else{showPage('vocabulary');return;}
      updateSignals('you-do');updateControl();return;
    }
    if(page.dataset.welcomeGroupedReview==='true'&&page.dataset.answerMode==='true'){
      const index=Number(page.dataset.reviewIndex||0);
      const max=window.matchMedia('(max-width:700px)').matches?3:1;
      if(index<max){welcomeReviewShow(page,index+1);updateControl();return;}
      showPage('vocabulary');return;
    }
    if(page.dataset.j277SeparateReview==='true'){
      const items=page.querySelectorAll('.youdo-question');
      const i=Number(page.dataset.windowStart||0);
      if(i<items.length-1){setYouDoWindow(page,i+1);updateControl();return;}
      showPage(order[order.indexOf('you-do')+1]||'vocabulary');return;
    }
    if(isH446RichReview(page)&&page.dataset.answerMode==='true'){
      const index=Number(page.dataset.richStepIndex||0);
      const total=page.querySelectorAll('.h446-rich-stage').length;
      if(index<total-1){showH446RichReview(page,true,index+1);updateControl();return;}
      showPage(order[order.indexOf('you-do')+1]||'vocabulary');return;
    }
    if(isH446GroupedMarking(page)&&page.querySelector('.h446-marking-screen')&&page.dataset.answerMode==='true'){
      const count=page.querySelectorAll('.h446-marking-card').length;
      const index=Number(page.dataset.answerIndex||0);
      if(page.dataset.reviewStep==='question'){
        showH446GroupedMarking(page,true,index,'answer');updateControl();return;
      }
      if(index<count-1){showH446GroupedMarking(page,true,index+1);updateControl();return;}
      showPage(order[order.indexOf('you-do')+1]||'vocabulary');return;
    }
    if(page.dataset.answerMode==='true'){
      const count=page.querySelectorAll('.youdo-question').length;
      const index=Number(page.dataset.answerIndex||0);
      if(index<count-1){showYouDoAnswer(page,index+1);updateControl();return;}
      showPage(order[order.indexOf('you-do')+1]||'vocabulary');return;
    }
    if(page.dataset.assessmentMode==='true'){
      updateSignals('you-do');
      updateControl();
      return;
    }
    if(page.dataset.workMode!=='independent'){
      page.dataset.workMode='independent';
      updateSignals('you-do');
      updateControl();
      return;
    }
    const questions=[...page.querySelectorAll('.youdo-question')];
    if(questions.length){
      const size=youDoWindowSize(page,questions.length);
      const maxStart=Math.max(0,questions.length-size);
      const start=Number(page.dataset.windowStart||0);
      if(start<maxStart){
        // Rich-review coding/diagram lessons advance complete question windows.
        // Lesson 020: Q1–Q2 → Q3–Q4; Lesson 029: one diagram at a time.
        setYouDoWindow(page,start+(isH446RichReview(page)?size:1));updateControl();return;
      }
      if(isH446RichReview(page)&&showH446RichReview(page,true,0)){
        updateControl();return;
      }
      if(isH446GroupedMarking(page)&&showH446GroupedMarking(page,true,0)){
        updateControl();window.scrollTo({top:0,behavior:'instant'});return;
      }
      if(page.dataset.welcomeGroupedReview==='true'&&welcomeReviewShow(page,0)){
        updateControl();return;
      }
      page.dataset.answerMode='true';
      showYouDoAnswer(page,0);updateControl();return;
    }
    const stages=[...page.querySelectorAll('.youdo-stage')];
    const i=visibleIndex(stages);
    if(i<stages.length-1){showOnly(stages,i+1);updateControl();return;}
    showPage(order[order.indexOf('you-do')+1]||'vocabulary');return;
  }
  if(current==='catch-up'||current==='exam-practice'){
    if(window.H446Optional?.step?.(current,1)){updateControl();return;}
    showPage(order[order.indexOf(current)+1]||'vocabulary');return;
  }
  if(current==='exit'){
    const stages=[...page.querySelectorAll('.exit-stage')];
    if(stages.length){
      const i=visibleIndex(stages);
      if(i<stages.length-1){
        showOnly(stages,i+1);
        updateControl();
        return;
      }
    }
  }
  if(current==='vocabulary'){
    const stages=[...page.querySelectorAll('.vocab-stage')];
    if(stages.length){
      const i=visibleIndex(stages);
      const answer=stages[i].querySelector('[data-vocab-answer]');
      if(answer&&answer.hidden){
        answer.hidden=false;
        updateControl();return;
      }
      if(i<stages.length-1){
        showOnly(stages,i+1);
        const nextAnswer=stages[i+1].querySelector('[data-vocab-answer]');
        if(nextAnswer)nextAnswer.hidden=true;
        updateControl();return;
      }
    }else{
      const answer=page.querySelector('.vocab-card [data-answer][hidden]');
      if(answer){
        answer.hidden=false;
        const blank=answer.parentElement.querySelector('.vocab-blank');
        if(blank)blank.hidden=true;
        updateControl();return;
      }
    }
  }
  const answers=[...page.querySelectorAll('details.answers:not([open])')];
  if(answers.length){answers.forEach(d=>d.open=true);updateControl();return;}
  showPage(order[(order.indexOf(current)+1)%order.length]);
}
function previousAction(){
  const page=document.getElementById(current);
  if(current==='do-now'){
    if(doNowNavigation.step(page,-1))updateControl();
    return;
  }
  if(current==='catch-up'||current==='exam-practice'){
    if(window.H446Optional?.step?.(current,-1)){updateControl();return;}
    const prior=order[Math.max(0,order.indexOf(current)-1)];
    showPage(prior);
    if(prior==='you-do'){
      const yp=document.getElementById('you-do');
      if(yp?.dataset.assessmentMode!=='true'){
        const qs=[...yp.querySelectorAll('.youdo-question')];
        yp.dataset.workMode='independent';
        if(qs.length){
          if(isH446BankQuestionSheet(yp))h446ShowSingleAnswer(yp,qs.length-1);
          else if(isH446SequentialYouDo(yp))showH446SequentialStage(yp,qs.length-1,true);
          else if(isH446RichReview(yp)&&showH446RichReview(yp,true,
              yp.querySelectorAll('.h446-rich-stage').length-1)){
            // Restore the final model answer when returning from an optional phase.
          }else{
            yp.dataset.answerMode='true';
            showYouDoAnswer(yp,qs.length-1);
          }
        }
        updateSignals('you-do');updateControl();
      }
    }
    return;
  }
  if(current==='overview'&&objectivesNavigation.previous(page)){updateControl();return;}
  if(current==='exit'){
    const stages=[...page.querySelectorAll('.exit-stage')];
    if(stages.length){
      const i=visibleIndex(stages);
      if(i>0){
        showOnly(stages,i-1);
        updateControl();
        return;
      }
    }
  }
  if(current==='vocabulary'){
    const stages=[...page.querySelectorAll('.vocab-stage')];
    if(stages.length){
      const i=visibleIndex(stages);
      const answer=stages[i].querySelector('[data-vocab-answer]');
      if(answer&&!answer.hidden){
        answer.hidden=true;
        updateControl();
        return;
      }
      if(i>0){
        showOnly(stages,i-1);
        const previousAnswer=stages[i-1].querySelector('[data-vocab-answer]');
        if(previousAnswer)previousAnswer.hidden=false;
        updateControl();
        return;
      }
    }
  }
  // Optional phases belong between You Do and Key Vocabulary when populated.
  if(current==='vocabulary'&&order[order.indexOf('vocabulary')-1]!=='you-do'){
    const prior=order[order.indexOf('vocabulary')-1];
    showPage(prior);
    window.H446Optional?.showLast?.(prior);
    updateControl();
    return;
  }
  // When returning from the first vocabulary term, restore the final You Do task,
  // rather than restarting pupils at the first question.
  if(current==='vocabulary'){
    showPage('you-do');
    const youPage=document.getElementById('you-do');
    if(youPage?.dataset.welcomeGroupedReview==='true'){
      youPage.dataset.workMode='independent';
      welcomeReviewShow(youPage,window.matchMedia('(max-width:700px)').matches?3:1);
      updateSignals('you-do');updateControl();return;
    }
    if(youPage?.dataset.assessmentMode!=='true'){
      youPage.dataset.workMode='independent';
      const questions=[...youPage.querySelectorAll('.youdo-question')];
      if(questions.length&&isH446RichReview(youPage)
          &&showH446RichReview(youPage,true,Math.max(0,youPage.querySelectorAll('.h446-rich-stage').length-1))){
        // Back from vocabulary returns to the final rich model-answer screen.
      }else if(questions.length&&isH446GroupedMarking(youPage)&&showH446GroupedMarking(youPage,true,Math.max(0,questions.length-1),'answer')){
        // Back from vocabulary returns to the final teacher-led review screen.
      }else if(questions.length&&isH446BankQuestionSheet(youPage)){
        h446ShowSingleAnswer(youPage,questions.length-1);
      }else if(questions.length&&isH446SequentialYouDo(youPage)){
        showH446SequentialStage(youPage,questions.length-1,true);
      }else if(questions.length){
        const requestedSize=Math.max(1,Number(youPage.dataset.windowSize||3));
        const size=Math.min(requestedSize,questions.length);
        setYouDoWindow(youPage,questions.length-size);
      }else{
        const stages=[...youPage.querySelectorAll('.youdo-stage')];
        if(stages.length)showOnly(stages,stages.length-1);
      }
      updateSignals('you-do');
      updateControl();
    }
    return;
  }
  if(current==='you-do'){
    if(isH446BankQuestionSheet(page)){
      const start=Number(page.dataset.h446GroupStart||0);
      const group=h446QuestionSheetGroupFor(page,start);
      const index=Number(page.dataset.answerIndex||start);
      if(page.dataset.h446TwoPagePilot==='true'){
        if(page.dataset.answerMode==='true'){
          if(index>0)h446ShowSingleAnswer(page,index-1);
          else h446ShowQuestionSheet(page,h446SequentialQuestions(page).length-1);
        }else if(group.start>0)h446ShowQuestionSheet(page,group.start-1);
        else{showPage('we-do');return;}
      }else{
        if(page.dataset.answerMode==='true'){
          if(index>group.start)h446ShowSingleAnswer(page,index-1);
          else h446ShowQuestionSheet(page,group.start);
        }else if(group.start>0)h446ShowSingleAnswer(page,group.start-1);
        else{showPage('we-do');return;}
      }
      updateSignals('you-do');updateControl();return;
    }
    if(isH446SequentialYouDo(page)){
      const i=Number(page.dataset.answerIndex||0);
      if(page.dataset.answerMode==='true')showH446SequentialStage(page,i,false);
      else if(i>0)showH446SequentialStage(page,i-1,true);
      else{showPage('we-do');return;}
      updateSignals('you-do');updateControl();return;
    }
    if(page.dataset.welcomeGroupedReview==='true'&&page.dataset.answerMode==='true'){
      const i=Number(page.dataset.reviewIndex||0);
      if(i>0){welcomeReviewShow(page,i-1);updateControl();return;}
      page.dataset.answerMode='false';
      page.dataset.reviewIndex='0';
      page.querySelector('.welcome-marking-screen').hidden=true;
      page.querySelector('.youdo-rolling').hidden=false;
      const count=page.querySelectorAll('.youdo-question').length;
      const size=youDoWindowSize(page,count);
      setYouDoWindow(page,Math.max(0,count-size));
      updateControl();return;
    }
    if(page.dataset.j277SeparateReview==='true'){
      const i=Number(page.dataset.windowStart||0);
      if(i>0){setYouDoWindow(page,i-1);updateControl();return;}
      showPage(order[Math.max(0,order.indexOf('you-do')-1)]);return;
    }
    if(isH446RichReview(page)&&page.dataset.answerMode==='true'){
      const index=Number(page.dataset.richStepIndex||0);
      if(index>0){showH446RichReview(page,true,index-1);updateControl();return;}
      showH446RichReview(page,false);
      page.dataset.workMode='independent';
      const count=page.querySelectorAll('.youdo-question').length;
      const size=Math.min(count,Math.max(1,Number(page.dataset.windowSize||1)));
      setYouDoWindow(page,Math.max(0,count-size));
      updateSignals('you-do');updateControl();return;
    }
    if(isH446GroupedMarking(page)&&page.dataset.answerMode==='true'){
      const index=Number(page.dataset.answerIndex||0);
      if(page.dataset.reviewStep==='answer'&&page.querySelectorAll('.h446-marking-card')[index]?.dataset.reviewLayout==='two'){
        showH446GroupedMarking(page,true,index,'question');updateControl();return;
      }
      if(index>0){showH446GroupedMarking(page,true,index-1,'answer');updateControl();return;}
      showH446GroupedMarking(page,false);
      page.dataset.workMode='independent';
      updateSignals('you-do');updateControl();return;
    }
    if(page.dataset.assessmentMode==='true'){
      updateSignals('you-do');
      updateControl();
      return;
    }
    if(page.dataset.answerMode==='true'){
      const index=Number(page.dataset.answerIndex||0);
      if(index>0){showYouDoAnswer(page,index-1);updateControl();return;}
      page.dataset.answerMode='false';
      const questions=[...page.querySelectorAll('.youdo-question')];
      setYouDoWindow(page,Math.max(0,questions.length-Math.max(1,Number(page.dataset.windowSize||3))));
      questions.forEach(q=>{const a=q.querySelector('.youdo-solution');if(a)a.hidden=true;});
      updateControl();return;
    }
    const questions=[...page.querySelectorAll('.youdo-question')];
    if(questions.length){
      const start=Number(page.dataset.windowStart||0);
      if(start>0){
        const windowSize=Math.max(1,Number(page.dataset.windowSize||3));
        setYouDoWindow(page,start-(isH446RichReview(page)?windowSize:1));
        updateControl();
        return;
      }
      if(page.dataset.workMode==='independent'){
        page.dataset.workMode='discuss';
        updateSignals('you-do');
        updateControl();
        return;
      }
    }else{
      const stages=[...page.querySelectorAll('.youdo-stage')];
      const i=visibleIndex(stages);
      if(i>0){
        showOnly(stages,i-1);
        updateControl();
        return;
      }
      if(page.dataset.workMode==='independent'){
        page.dataset.workMode='discuss';
        updateSignals('you-do');
        updateControl();
        return;
      }
    }
  }
  if(current==='new-learning'&&newLearningNavigation.step(page,-1)){updateControl();return;}
  if(current==='we-do'){
    const examples=[...page.querySelectorAll('.wedo-example')];
    if(examples.length){
      const exampleIndex=visibleIndex(examples);
      const example=examples[exampleIndex];
      const steps=[...example.querySelectorAll('.wedo-step')];
      const stepIndex=modellingStepIndex(steps);

      if(stepIndex>=0){
        if(stepIndex===0)resetModelSteps(steps);
        else showOnly(steps,stepIndex-1);
        updateControl();
        return;
      }

      if(exampleIndex>0){
        showOnly(examples,exampleIndex-1);
        const previousSteps=[...examples[exampleIndex-1].querySelectorAll('.wedo-step')];
        if(previousSteps.length)showOnly(previousSteps,previousSteps.length-1);
        updateControl();
        return;
      }
    }
  }
  if(current==='i-do'&&idoNavigation.previous(page)){updateControl();return;}

  showPage(order[Math.max(0,order.indexOf(current)-1)]);
}



// Keep the normal phase order: You Do → Key Vocabulary → Exit.
// Solutions remain a separate, optional self-marking action after the exit check.
function prepareYouDoSolutionsLink(){
  if(isH446GroupedMarking(document.getElementById('you-do'))||
    isH446RichReview(document.getElementById('you-do')))return;
  const createLink=()=>{
    const anchor=document.createElement('a');
    anchor.className='answer-cta youdo-solutions-link';
    anchor.href='answers.html';
    anchor.target='_blank';
    anchor.rel='noopener';
    anchor.textContent='Self-mark You Do answers →';
    anchor.setAttribute('aria-label','Open the You Do answers in a separate tab');
    return anchor;
  };
  const card=document.getElementById('exit')?.querySelector('.exit-check-card');
  if(card&&!card.querySelector('.youdo-solutions-link'))card.append(createLink());
}

function prepareMobileSwipeNavigation(){
  const phone=window.matchMedia('(max-width: 700px)');

  const navwrap=document.querySelector('.navwrap');
  if(navwrap&&!document.getElementById('mobile-lesson-status')){
    const status=document.createElement('div');
    status.id='mobile-lesson-status';
    status.className='mobile-lesson-status';
    status.setAttribute('aria-live','polite');
    const badge=createLessonIdBadge();
    const copy=document.createElement('span');
    copy.className='mobile-lesson-copy';
    copy.innerHTML='<span class="mobile-lesson-title"></span><span class="mobile-phase-status"></span>';
    if(badge)status.append(badge,copy);else status.append(copy);
    // Blue phase, green working behaviour and orange response.
    const mini=document.createElement('span');
    mini.id='mobile-lesson-signals';
    mini.className='mobile-lesson-signals';
    mini.setAttribute('aria-label','Classroom expectations');
    for(const type of ['phase','routine','response']){
      const item=document.createElement('span');
      item.className='mobile-signal-icon mobile-signal-'+type;
      item.setAttribute('role','img');
      mini.appendChild(item);
    }
    status.appendChild(mini);
    /* Keep lesson status outside the site-nav/Home/Independent link flex
       group. When nested there it can shrink to zero width on phones,
       hiding all three expectation icons. The navwrap owns its grid cell. */
    navwrap.appendChild(status);
  }
  // A legend after the actual lesson content; never fixed over questions.
  const main=document.getElementById('main')||document.querySelector('main');
  if(main&&!document.getElementById('mobile-lesson-key')){
    const key=document.createElement('div');
    key.id='mobile-lesson-key';
    key.className='mobile-lesson-key';
    key.setAttribute('role','note');
    key.setAttribute('aria-label','Current classroom signals');
    for(const type of ['phase','routine','response']){
      const cell=document.createElement('span');
      cell.className='mobile-key-item mobile-key-'+type;
      const pic=document.createElement('span');pic.className='mobile-key-icon';pic.setAttribute('aria-hidden','true');
      const label=document.createElement('span');label.className='mobile-key-label';
      cell.append(pic,label);key.appendChild(cell);
    }
    main.appendChild(key);
  }
  updateMobileLessonStatus();

  // Touch-friendly definitions: tap a term to reveal; tap again to dismiss.
  // This avoids depending on mobile browsers' inconsistent :hover/:focus.
  document.querySelectorAll('.vocab-intro-list .vocab-tip').forEach(chip=>{
    chip.setAttribute('role','button');
    chip.setAttribute('aria-expanded','false');
    chip.addEventListener('click',()=>{
      const open=chip.classList.contains('is-definition-open');
      document.querySelectorAll('.vocab-intro-list .vocab-tip.is-definition-open').forEach(other=>{
        other.classList.remove('is-definition-open');
        other.setAttribute('aria-expanded','false');
      });
      if(!open){chip.classList.add('is-definition-open');chip.setAttribute('aria-expanded','true');}
    });
    chip.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){event.preventDefault();chip.click();}
    });
  });

  let startX=0;
  let startY=0;
  let tracking=false;
  let direction=null;

  const interactiveSelector='button,a,input,textarea,select,summary,[contenteditable="true"]';

  function startsInHorizontalScroller(target){
    let el=target instanceof Element?target:null;
    while(el&&el!==document.body){
      const style=getComputedStyle(el);
      const overflowX=style.overflowX;
      if((overflowX==='auto'||overflowX==='scroll')&&el.scrollWidth>el.clientWidth+4){
        return true;
      }
      el=el.parentElement;
    }
    return false;
  }

  function hideHint(){
    const hint=document.querySelector('.mobile-swipe-hint');
    if(hint)hint.remove();
  }

  function showHint(){
    try{
      if(sessionStorage.getItem('h446-swipe-hint-seen')==='1')return;
      sessionStorage.setItem('h446-swipe-hint-seen','1');
    }catch(e){}
    const hint=document.createElement('div');
    hint.className='mobile-swipe-hint';
    hint.textContent='Swipe left: next · right: back · scroll to read';
    hint.setAttribute('role','status');
    hint.setAttribute('aria-live','polite');
    document.body.appendChild(hint);
    window.setTimeout(()=>hint.classList.add('is-fading'),4200);
    window.setTimeout(()=>hint.remove(),5000);
  }

  // On phones the reference sits above the changing panel. Bring the newly
  // revealed answer/step into view instead of returning to the unchanged title.
  const changeSelector='.h446-rich-stage,.h446-review-question-stage,.h446-marking-body,.donow-stage,.objective-vocab-stage,[data-objective-vocab-definition],.nl-stage,.ido-example,.ido-step,.model-stage,.wedo-example,.wedo-step,[data-reveal-answer],.youdo-question,.youdo-stage,.vocab-stage,[data-vocab-answer],.vocab-card [data-answer],.exit-stage,details.answers';
  function isVisible(element){
    return !element.closest('[hidden]')&&(!element.closest('.page')||element.closest('.page').classList.contains('active'));
  }
  function navigate(action){
    const oldPage=current;
    const elements=[...document.querySelectorAll(changeSelector)];
    const before=new Map(elements.map(element=>[element,isVisible(element)&&(element.tagName!=='DETAILS'||element.open)]));
    action();
    const revealed=elements.find(element=>isVisible(element)&&!before.get(element)&&(element.tagName!=='DETAILS'||element.open));
    window.requestAnimationFrame(()=>{
      if(oldPage!==current){
        window.scrollTo({top:0,behavior:'instant'});
      }else if(revealed){
        const header=document.querySelector('.navwrap');
        const inset=(header?.getBoundingClientRect().height||0)+12;
        const top=window.scrollY+revealed.getBoundingClientRect().top-inset;
        window.scrollTo({top:Math.max(0,top),behavior:'instant'});
      }
    });
  }

  document.addEventListener('touchstart',e=>{
    tracking=false;
    direction=null;
    if(!phone.matches||e.touches.length!==1)return;
    const target=e.target instanceof Element?e.target:null;
    // Allow a lesson swipe to begin over ordinary links/buttons inside content;
    // only editable fields and genuine horizontal scrollers should intercept it.
    if(target?.closest('input,textarea,select,[contenteditable="true"]')||startsInHorizontalScroller(target))return;
    startX=e.touches[0].clientX;
    startY=e.touches[0].clientY;
    // Let the browser own edge gestures such as back/forward.
    if(startX<24||startX>window.innerWidth-24)return;
    tracking=true;
  },{passive:true});

  document.addEventListener('touchmove',e=>{
    if(!tracking)return;
    if(e.touches.length!==1){tracking=false;return;}
    const dx=Math.abs(e.touches[0].clientX-startX);
    const dy=Math.abs(e.touches[0].clientY-startY);
    if(!direction&&Math.max(dx,dy)>=12){
      if(dy>=dx){tracking=false;return;}
      if(dx>dy*1.25)direction='horizontal';
    }
    // Prevent the browser from cancelling a recognised lesson swipe.
    if(direction==='horizontal'&&e.cancelable)e.preventDefault();
  },{passive:false});

  document.addEventListener('touchend',e=>{
    if(!tracking||!phone.matches||e.changedTouches.length!==1)return;
    tracking=false;
    const dx=e.changedTouches[0].clientX-startX;
    const dy=e.changedTouches[0].clientY-startY;
    if(Math.abs(dx)<48||Math.abs(dx)<=Math.abs(dy)*1.25)return;
    hideHint();
    navigate(dx<0?next:previousAction);
  },{passive:true});

  document.addEventListener('touchcancel',()=>{tracking=false;direction=null;},{passive:true});
  if(phone.matches)showHint();
}


/* Optional H446 phases: same L-number badge, routine tiles and lesson controls.
   Resources are discovered from same-folder JSON; no empty phase is registered. */
window.H446OptionalBridge={
  register(type,section,button){
    if(!['catch-up','exam-practice'].includes(type)||order.includes(type))return false;
    const before=type==='catch-up'
      ?(order.includes('exam-practice')?'exam-practice':'vocabulary')
      :'vocabulary';
    const pos=order.indexOf(before);
    if(pos<0)return false;
    order.splice(pos,0,type);
    pages.splice(pos,0,section);
    nav.splice(pos,0,button);
    const nextButton=document.querySelector('[data-page="'+before+'"]');
    nextButton?.before(button);
    const nextSection=document.getElementById(before);
    nextSection?.before(section);
    button.addEventListener('click',()=>showPage(type));
    const afterHash=window.location.hash.slice(1);
    if(afterHash===type)showPage(type);
    else updateControl();
    return true;
  },
  go(id){showPage(id);},
  state(){return current;},
  refresh(){updateControl();}
};

nav.forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
advance.addEventListener('click',next);
previous.addEventListener('click',previousAction);
document.querySelectorAll('details.answers').forEach(d=>d.addEventListener('toggle',updateControl));
document.addEventListener('keydown',e=>{
  if(e.target.closest('button,a,input,textarea,select,summary')||e.altKey||e.ctrlKey||e.metaKey)return;
  if(e.key==='ArrowRight'){e.preventDefault();next();}
  if(e.key==='ArrowLeft'){e.preventDefault();previousAction();}
});
/* KS3 vocabulary introduction: reuse the existing teacher-authored
   definition-first retrieval deck as the ONE source of truth. Keep the original
   objectives and assessment markup intact; only move existing Objectives
   elements into a shared presentation wrapper and add a generated intro. */
function prepareKS3VocabularyIntroduction(){
  if(!/^\/lessons\/year[789]\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname))return;
  const overview=document.getElementById('overview');
  const vocabulary=document.getElementById('vocabulary');
  if(!overview||!vocabulary||overview.dataset.ks3VocabIntro==='true')return;
  if(overview.dataset.objectivesVocab==='true')return; // authored layout takes priority
  if(vocabulary.dataset.vocabFlow!=='retrieval')return;
  const entries=[...vocabulary.querySelectorAll('.vocab-stage')].map(stage=>({
    term:(stage.querySelector('[data-vocab-answer] .vocab-answer-value')?.textContent||'').trim(),
    definition:(stage.querySelector('.vocab-prompt .vocab-question')?.textContent||'').trim()
  })).filter(item=>item.term&&item.definition);
  if(!entries.length||entries.length>24)return;

  const el=(tag,cls,value)=>{
    const node=document.createElement(tag);
    if(cls)node.className=cls;
    if(value!==undefined)node.textContent=value;
    return node;
  };
  const layout=el('div','objectives-vocab-layout');
  const left=el('div','objectives-vocab-left');
  left.classList.add('ks3-vocab-objectives');
  // Move, never rewrite, the existing lesson objectives and content.
  while(overview.firstChild)left.appendChild(overview.firstChild);
  const intro=el('div','vocab-intro yellow-vocab');
  intro.append(el('strong','', 'KEY VOCABULARY'));
  const list=el('div','vocab-intro-list');
  list.setAttribute('aria-label','Lesson key vocabulary; select a term for its definition');
  entries.forEach(entry=>{
    const chip=el('span','vocab-tip',entry.term);
    chip.tabIndex=0;chip.dataset.definition=entry.definition;
    chip.setAttribute('role','button');
    chip.setAttribute('aria-label',entry.term+': '+entry.definition);
    list.appendChild(chip);
  });
  intro.append(list);
  left.appendChild(intro);

  const right=el('div','objectives-vocab-right');
  right.setAttribute('aria-live','polite');
  entries.forEach((entry,i)=>{
    const stage=el('article','objective-vocab-stage');
    stage.hidden=i!==0;
    stage.append(el('span','objective-vocab-count','TERM '+(i+1)+' OF '+entries.length));
    stage.append(el('h2','',entry.term));
    const definition=el('div','objective-vocab-definition');
    definition.dataset.objectiveVocabDefinition='';
    definition.hidden=true;
    definition.append(el('span','','DEFINITION'),el('p','',entry.definition));
    stage.append(definition);
    right.append(stage);
  });
  layout.append(left,right);
  overview.appendChild(layout);
  overview.dataset.objectivesVocab='true';
  overview.dataset.ks3VocabIntro='true';
  document.body.dataset.ks3VocabReady='true';

  // Existing prepareMobileSwipeNavigation() owns all chip interactions.
  // Never install duplicate tap or keyboard handlers here.
}

prepareKS3VocabularyIntroduction();
/* Approved shared Objectives vocabulary presentation for legacy H446 layouts.
   Read existing term definitions, including earlier flat and plain-text layouts.
   Retain assessment-specific Objectives screens and all other lesson phases. */
function prepareH446LegacyObjectives(){
  if(!/^\/lessons\/h446\/lesson-\d{3}\/index\.html$/i.test(location.pathname))return;
  if(document.querySelector('meta[name="lesson-vocabulary-display"][content="classic"]'))return;
  const overview=document.getElementById('overview');
  if(!overview||overview.dataset.objectivesVocab==='true')return;
  const original=overview.firstElementChild;
  const panels=original&&[...original.children];
  const twoPane=panels?.length===2&&Boolean(panels[1].querySelector('.vocab-intro-list, p > strong'));
  const flat=Boolean(overview.querySelector(':scope > .objectives')&&overview.querySelector(':scope > .vocab-intro .vocab-intro-list'));
  if(!twoPane&&!flat)return;
  const authoredList=twoPane?panels[1].querySelector('.vocab-intro-list'):
    overview.querySelector(':scope > .vocab-intro .vocab-intro-list');
  const chips=[...(authoredList?.querySelectorAll('span')||[])];
  let entries=chips.map(chip=>({
    term:chip.textContent.trim(),definition:(chip.dataset.definition||'').trim()
  }));
  // Some older lessons contain the definitions only in their unchanged
  // Key Vocabulary phase. Reuse that authored source without rewriting terms.
  if(!entries.length||entries.some(entry=>!entry.definition)){
    entries=[...document.querySelectorAll('#vocabulary .vocab-stage')].map(stage=>({
      term:(stage.querySelector('h2')?.textContent||'').trim(),
      definition:(stage.querySelector('.vocab-question, p')?.textContent||'').trim()
    }));
    if(chips.length&&(chips.length!==entries.length||chips.some((chip,i)=>
      chip.textContent.trim().toLowerCase()!==entries[i].term.toLowerCase())))return;
  }
  if(entries.length<2||entries.some(entry=>!entry.term||!entry.definition))return;

  const make=(tag,className,text)=>{
    const node=document.createElement(tag);
    if(className)node.className=className;
    if(text!==undefined)node.textContent=text;
    return node;
  };
  const layout=make('div','objectives-vocab-layout');
  const left=make('article','objectives-vocab-left');
  if(twoPane){
    while(panels[0].firstChild)left.append(panels[0].firstChild);
  }else{
    while(overview.firstChild)left.append(overview.firstChild);
  }
  const objectives=left.querySelector('ul');
  if(objectives&&!objectives.parentElement.closest('.objectives'))objectives.classList.add('objectives');

  let intro=flat?left.querySelector('.vocab-intro'):null;
  if(!intro){
    intro=make('div','vocab-intro');
    intro.append(make('strong','','Key vocabulary for today'));
    left.append(intro);
  }
  let list=intro.querySelector('.vocab-intro-list');
  if(!list){
    list=authoredList||make('div','vocab-intro-list');
    intro.append(list);
  }
  if(!chips.length)entries.forEach(entry=>list.append(make('span','vocab-tip',entry.term)));
  [...list.querySelectorAll('span')].forEach((chip,i)=>{
    chip.classList.add('vocab-tip');
    chip.tabIndex=0;
    chip.dataset.definition=entries[i].definition;
    chip.setAttribute('aria-label',entries[i].term+': '+entries[i].definition);
  });

  const right=make('div','objectives-vocab-right');
  right.setAttribute('aria-live','polite');
  entries.forEach((entry,i)=>{
    const stage=make('article','objective-vocab-stage');
    stage.hidden=i!==0;
    stage.append(make('span','objective-vocab-count',`TERM ${i+1} OF ${entries.length}`));
    stage.append(make('h2','',entry.term));
    const definition=make('div','objective-vocab-definition');
    definition.dataset.objectiveVocabDefinition='';
    definition.hidden=true;
    definition.append(make('span','','DEFINITION'),make('p','',entry.definition));
    stage.append(definition);
    right.append(stage);
  });
  layout.append(left,right);
  if(twoPane)original.replaceWith(layout);
  else overview.append(layout);
  overview.dataset.objectivesVocab='true';
  overview.dataset.legacyObjectivesShared='true';
}
prepareH446LegacyObjectives();
// One shared Objectives presentation for H446 lessons that already use the
// staged vocabulary renderer, including eligible older two-pane layouts.
// An authored 'classic' mode remains available for exceptional layouts.
const objectivesVocabularyMode=document.querySelector('meta[name="lesson-vocabulary-display"]')?.content;
const objectivesOverview=document.getElementById('overview');
if(objectivesVocabularyMode==='focus'||(
  objectivesVocabularyMode!=='classic'&&
  document.querySelector('.course-back[href*="h446-hub"]')&&
  objectivesOverview?.dataset.objectivesVocab==='true'
)){
  objectivesOverview?.setAttribute('data-vocab-display','focus');
}
prepareObjectiveVocabularySupport();
prepareVocabulary();
/* H446-only: publication status belongs in source and the staff workflow,
   not in the student-facing Classroom TV heading, footer or browser tab. */
function hideH446PublicationStatus(){
  if(!/^\/lessons\/h446\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname))return;
  document.querySelectorAll('.lesson-label .ready-badge, .lesson-label .h13-draft, .lesson-label .draft-pill')
    .forEach(badge=>{if(badge.textContent.trim().toUpperCase()==='READY')badge.remove();});
  document.querySelectorAll('.lesson-label, .lesson-footer').forEach(container=>{
    container.childNodes.forEach(node=>{
      if(node.nodeType!==Node.TEXT_NODE || !/\bREADY\b/.test(node.textContent))return;
      node.textContent=node.textContent
        .replace(/\bREADY\b\s*(?:·\s*)?/g,'')
        .replace(/\s*[·•]\s*$/,'')
        .replace(/^\s*[·•]\s*/,'')
        .replace(/\s{2,}/g,' ');
    });
  });
  document.title=document.title.replace(/\s*[·|—–-]\s*Ready\s*$/i,'');
}

/* Answer-verified Exit Ticket conversion.
   Preserves the original question and recorded confidence choices; only lessons
   with an explicit yes/no answer opt in. Never infer correctness from a question. */
function prepareVerifiedExitTicket(){
  const page=document.getElementById('exit');
  if(!page || page.classList.contains('exit-yesno'))return;
  let answer=String(page.dataset.exitCorrect||'').trim().toLowerCase();
  let compact=page.querySelector('.exit-compact');
  let question=page.dataset.exitQuestion?.trim()||compact?.querySelector('.exit-check-question')?.textContent?.trim()||'';
  let authoredExplanation=page.dataset.exitExplanation?.trim()||'';
  let reflection=compact?[...compact.querySelectorAll('.exit-confidence-choice')].map(item=>({
    title:item.querySelector('strong')?.textContent?.trim()||'',
    detail:item.querySelector('span')?.textContent?.trim()||''
  })).filter(item=>item.title):[];
  let legacyConfidencePrompt='';
  const h446Path=/\/lessons\/h446\/lesson-\d{3}\//.test(location.pathname);
  const explicitTruth=text=>{
    // Only a clearly AUTHORED answer, never merely a YES/NO choice.
    // Do not infer correctness from question wording or a topic classifier.
    const match=String(text||'').trim().match(/^(True|False)(?:\s*[.:–—-]\s*|\s*$)([\s\S]*)$/i);
    return match?{answer:match[1].toLowerCase()==='true'?'yes':'no',why:match[2].trim()}:null;
  };
  if(answer!=='yes'&&answer!=='no'&&h446Path&&compact){
    // Early H446 compact tickets sometimes print the answer inside the
    // response choices (e.g. "False."). Remove that premature answer leak.
    const statements=[...compact.querySelectorAll('.exit-check-response .exit-key-item')];
    const authored=statements.length===1?explicitTruth(statements[0].textContent):null;
    if(authored){
      answer=authored.answer;
      authoredExplanation=authoredExplanation||authored.why;
      page.dataset.exitSource='h446-authored-compact';
    }
  }
  if(answer!=='yes'&&answer!=='no'&&h446Path&&!compact){
    // Legacy H446 Y12/Y13: QUESTION -> AUTHORED ANSWER -> CONFIDENCE,
    // sometimes with ANSWER and CONFIDENCE combined in a second stage.
    const stages=[...page.querySelectorAll(':scope > .exit-stage')];
    const firstHeading=stages[0]?.querySelector('h2')?.textContent?.trim()||'';
    const second=stages[1];
    const answerLine=second?.querySelector('.exit-feedback p,p')?.textContent?.trim()||'';
    const authored=stages.length>=2&&stages.length<=3&&/true\s+or\s+false/i.test(firstHeading)
      ?explicitTruth(answerLine):null;
    if(authored){
      const firstQuestion=stages[0].querySelector('p')?.textContent?.trim();
      if(firstQuestion){
        answer=authored.answer;
        question=firstQuestion;
        authoredExplanation=authoredExplanation||authored.why;
        const final=stages.length===3?stages[2]:second;
        const confidenceP=[...final.querySelectorAll('p')].filter(el=>!el.closest('.exit-feedback'));
        legacyConfidencePrompt=confidenceP.at(-1)?.textContent?.trim()||'';
        page.dataset.exitSource='h446-authored-stages';
      }
    }
  }
  if((answer!=='yes'&&answer!=='no')||!question||( !compact&&!page.dataset.exitSource))return;
  // The phase heading already asks YES/NO; don't repeat "True or false:".
  question=question.replace(/^true\s+or\s+false\s*[:?]\s*/i,'').trim();
  if(!question)return;
  page.dataset.exitCorrect=answer;
  if(authoredExplanation)page.dataset.exitExplanation=authoredExplanation;
  const escaped=value=>String(value??'').replace(/[&<>"']/g,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[char]));
  const questionHTML=escaped(question);
  const options=correct=>'<div class="exit-yn-choices" aria-label="'+(correct?'Correct answer: '+answer.toUpperCase():'Response choices: Yes or No')+'">'+
    '<span class="exit-yn-option'+(correct?(answer==='yes'?' is-correct':' is-incorrect'):'')+'">YES</span>'+
    '<span class="exit-yn-option'+(correct?(answer==='no'?' is-correct':' is-incorrect'):'')+'">NO</span></div>';
  // An explicit True/False is not itself an explanation. Keep "WHY?"
  // exclusively for authored reasoning; never invent a model explanation.
  const explanation=authoredExplanation||'Explain your choice using one idea from today’s lesson.';
  const confidence=reflection.length?reflection:legacyConfidencePrompt
    ?[{title:'Reflect',detail:legacyConfidencePrompt}]
    :[
      {title:'👍 Confident',detail:'I can explain today’s learning.'},
      {title:'↔ Nearly there',detail:'I need another example.'},
      {title:'👎 Help needed',detail:'I need more practice.'}
    ];
  const confidenceHTML=confidence.map(item=>
    '<div class="exit-yn-confidence-choice"><strong>'+escaped(item.title)+'</strong><span>'+escaped(item.detail)+'</span></div>'
  ).join('');
  page.classList.add('exit-yesno','exit-yesno-generated');
  page.innerHTML=
    '<div class="exit-deck">'+
      '<article class="exit-stage"><div class="exit-yn-panel">'+
        '<p class="exit-yn-kicker">EXIT TICKET · YES OR NO?</p>'+
        '<h2 class="exit-yn-question">'+questionHTML+'</h2>'+
        '<div class="exit-yn-choice-zone"><p class="exit-yn-instruction">Think silently. On my signal, show thumbs up for YES or thumbs down for NO.</p>'+
        options(false)+'</div>'+
      '</div></article>'+
      '<article class="exit-stage" hidden><div class="exit-yn-panel">'+
        '<p class="exit-yn-kicker">EXIT TICKET · CHECK YOUR ANSWER</p>'+
        '<h2 class="exit-yn-question">'+questionHTML+'</h2>'+
        '<div class="exit-yn-choice-zone exit-yn-answer-zone">'+
        '<p class="exit-yn-answer-kicker" aria-live="polite">✓ CORRECT ANSWER: '+answer.toUpperCase()+'</p>'+
        options(true)+
        '<div class="exit-yn-reason"><h3>'+ (authoredExplanation?'WHY?':'EXPLAIN YOUR THINKING') +'</h3>'+
        '<p class="exit-yn-explain">'+escaped(explanation)+'</p></div></div>'+
      '</div></article>'+
      '<article class="exit-stage" hidden><div class="exit-yn-panel">'+
        '<p class="exit-yn-kicker">EXIT TICKET · YOUR CONFIDENCE</p>'+
        '<h2 class="exit-yn-question">How confident are you with today’s learning?</h2>'+
        '<div class="exit-yn-choice-zone"><div class="exit-yn-confidence">'+confidenceHTML+'</div></div>'+
      '</div></article>'+
    '</div>';
}

hideH446PublicationStatus();
// Versioned standalone CSS ensures the new exit style even when a lesson
// references an older, cached lesson-base.css.
if(document.getElementById('exit')&&!document.getElementById('exit-answer-rollout-style')){
  const link=document.createElement('link');
  link.id='exit-answer-rollout-style';
  link.rel='stylesheet';
  link.href='../../../assets/h446-lesson/exit-answer-rollout.css?v=20261025-complete1';
  document.head.appendChild(link);
}
prepareVerifiedExitTicket();
/* Do Now sources and phase navigation configuration are maintained in the
   shared phase module. The platform retains the synchronous stage engine. */
if(document.getElementById('do-now')&&/^\/lessons\/(?:h446|j277)\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname)){
  import('./do-now.js?v=20261127-navigation1')
    .then(({prepareDoNow,createDoNowNavigation})=>{
      doNowNavigation=createDoNowNavigation(createStageNavigator);
      prepareDoNow();
    })
    .catch(error=>console.warn('Do Now source module unavailable; authored content retained:',error));
}
prepareMobileSwipeNavigation();
/* Responsive binary place-value scaffold, generated from the SVG's actual
   eight column labels and eight bits: no question or answer data is rewritten. */
function prepareResponsivePlaceValues(){
  const placeValues=['128','64','32','16','8','4','2','1'];
  document.querySelectorAll('#you-do svg[aria-label^="Binary place value diagram"]').forEach(svg=>{
    if(svg.closest('.j277-place-value-shell'))return;
    const values=[...svg.querySelectorAll('text')].map(t=>t.textContent.trim());
    if(values.length!==16)return;
    const headers=values.filter((_,i)=>i%2===0);
    const bits=values.filter((_,i)=>i%2===1);
    if(headers.some((v,i)=>v!==placeValues[i])||bits.some(v=>v!=='0'&&v!=='1'))return;
    const shell=document.createElement('div');
    shell.className='j277-place-value-shell';
    const responsive=document.createElement('div');
    responsive.className='j277-place-value-responsive';
    responsive.setAttribute('role','img');
    responsive.setAttribute('aria-label',svg.getAttribute('aria-label')||'Binary place-value table');
    headers.forEach((label,i)=>{
      const cell=document.createElement('div');
      cell.className='j277-place-value-cell';
      const place=document.createElement('span');
      place.className='j277-place-value-label';
      place.textContent=label;
      const digit=document.createElement('strong');
      digit.className='j277-place-value-bit';
      digit.textContent=bits[i];
      cell.append(place,digit);
      responsive.appendChild(cell);
    });
    svg.classList.add('j277-place-value-original');
    svg.before(shell);
    shell.append(svg,responsive);
  });
}
prepareResponsivePlaceValues();
prepareYouDoSolutionsLink();
/* H446-only question sheet styling. Loaded centrally rather than adding
   another stylesheet link manually to every existing lesson. */
(function(){
  const p=document.getElementById('you-do');
  if(!p||!isH446BankQuestionSheet(p)||
     document.querySelector('link[data-h446-question-sheet-css]'))return;
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href='/assets/h446-y13/h446-youdo-question-sheet.css?v=20261123-group4-v1';
  link.dataset.h446QuestionSheetCss='true';
  document.head.appendChild(link);
})();
/* I Do phase module; generic navigation remains available during loading. */
if(document.getElementById('i-do')&&/^\/lessons\/(?:h446|j277)\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname)){
  import('./i-do.js?v=20261127-extract1')
    .then(({prepareIdoLabels,createIdoNavigation})=>{
      idoNavigation=createIdoNavigation(createModelNavigator);
      prepareIdoLabels();
    })
    .catch(error=>console.warn('I Do phase module unavailable; original labels and navigation retained:',error));
}
/* We Do phase presentation, scoped to numbered J277 and H446 lessons. */
if(document.getElementById('we-do')&&/^\/lessons\/(?:h446|j277)\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname)){
  import('./we-do.js?v=20261127-labels1')
    .then(({prepareWedoLabels})=>prepareWedoLabels())
    .catch(error=>console.warn('We Do presentation module unavailable; original labels retained:',error));
}
/* New Learning phase module; synchronous generic navigation remains available. */
if(document.getElementById('new-learning')&&/^\/lessons\/(?:h446|j277)\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname)){
  import('./new-learning.js?v=20261127-navigation1')
    .then(({prepareNewLearningLabels,createNewLearningNavigation})=>{
      newLearningNavigation=createNewLearningNavigation(createStageNavigator);
      prepareNewLearningLabels();
    })
    .catch(error=>console.warn('New Learning phase module unavailable; original labels and navigation retained:',error));
}
/* Objectives navigation: keep synchronous behaviour available for every course. */
if(document.getElementById('overview')&&/^\/lessons\/(?:h446|j277)\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname)){
  import('./objectives.js?v=20261127-navigation1')
    .then(({createObjectivesNavigation})=>{
      objectivesNavigation=createObjectivesNavigation(createDefinitionNavigator);
    })
    .catch(error=>console.warn('Objectives phase module unavailable; original navigation retained:',error));
}
showPage(location.hash.slice(1)||'do-now');
/* Identity is non-essential presentation. A badge/label problem must never
   interrupt lesson content, classroom signals, or phase navigation. */
try { prepareLessonIdBadge(); }
catch (error) { console.error('Lesson identity decoration:', error); }

/* One shared marker module for KS3, GCSE J277 and A Level H446 lessons.
   It respects authored vocabulary, teacher reveals, and Code First. */
if(/^\/lessons\/(?:j277|h446|year[789])\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname)){
  const markerModule=document.createElement('script');
  markerModule.src='../../../assets/h446-lesson/keyword-highlighter.js?v=20261115-keyterms-typography1';
  markerModule.async=true;
  document.body.appendChild(markerModule);
}
if(/^\/lessons\/h446\/lesson-\d{3}(?:\/|\.html|$)/i.test(location.pathname)){
  const optionalModule=document.createElement('script');
  optionalModule.src='../../../assets/h446-lesson/optional-resources.js?v=20261015-optionalh4461';
  optionalModule.async=true;
  document.body.appendChild(optionalModule);
}


/* J277-only Code First visual rollout. H446 pages never load this module. */
if(/^\/lessons\/j277\/lesson-\d{3}\//i.test(location.pathname)){
  const j277Cycle=document.createElement('script');
  const rhs134Trial=/\/lessons\/j277\/lesson-134\//i.test(location.pathname)
    && new URLSearchParams(location.search).get('exam-pilot')==='2';
  j277Cycle.src='../../../assets/j277/code-first-rollout.js?v='+
    (rhs134Trial?'20261121-rhs-codefirst-isolated-v10':'20261115-brush2');
  j277Cycle.defer=true;
  document.body.appendChild(j277Cycle);
}

/* One centrally maintained lesson-to-booklet route. The resources module
   inserts a link only for lessons with a published independent booklet. */
if(/^\/lessons\/(?:j277|h446)\/lesson-\d{3}\//i.test(location.pathname)){
  const resources=document.createElement('script');
  resources.src='../../../assets/h446-lesson/lesson-resources.js?v=20261028-j277-001-004';
  document.body.appendChild(resources);
}


/* One shared, presentation-only website navigation. Safe when other systems also load it. */
(function(){
  if(document.querySelector('script[data-rhsc-site-nav]'))return;
  const script=document.createElement('script');
  script.src='/assets/site-nav.js?v=20261108-classroom-compact1';
  script.dataset.rhscSiteNav='1';
  document.head.appendChild(script);
})();


/* One shared diagram viewer for A Level and modern KS3 lesson pages.
   J277 already includes this viewer directly; do not load it twice there. */
if(/^\/lessons\/(?:h446|year[789])\/lesson-\d{3}\//i.test(location.pathname)){
  const zoomStyle=document.createElement('link');
  zoomStyle.rel='stylesheet';
  zoomStyle.href='/assets/classroom-visual-zoom.css?v=20261114-shared-stage1';
  document.head.appendChild(zoomStyle);
  const zoomScript=document.createElement('script');
  zoomScript.src='/assets/classroom-visual-zoom.js?v=20261114-shared-stage1';
  zoomScript.async=true;
  document.body.appendChild(zoomScript);
}


/* Shared mark-scheme presentation: only clearly marked You Do answers change. */
if(/^\/lessons\/(?:h446|j277|year[789])\/lesson-\d{3}\//i.test(location.pathname)){
  const answerStyle=document.createElement('link');
  answerStyle.rel='stylesheet';
  answerStyle.href='/assets/h446-lesson/model-answer-marks.css?v=20261114-marklist1';
  document.head.appendChild(answerStyle);
  const answerScript=document.createElement('script');
  answerScript.src='/assets/h446-lesson/model-answer-marks.js?v=20261114-marklist1';
  answerScript.async=true;
  document.body.appendChild(answerScript);
}

/* Adapt only legacy three-statement True/False tickets to the shared TV layout.
   The authored question/answer/reflection stages and navigation are retained. */
if(/^\/lessons\/(?:h446|j277|year[789])\/lesson-\d{3}\//i.test(location.pathname)
  &&document.getElementById('exit')){
  const exitStyle=document.createElement('link');
  exitStyle.rel='stylesheet';
  exitStyle.href='/assets/h446-lesson/exit-three-statements.css?v=20261114-exit3-1';
  document.head.appendChild(exitStyle);
  const exitScript=document.createElement('script');
  exitScript.src='/assets/h446-lesson/exit-three-statements.js?v=20261114-exit3-1';
  exitScript.async=true;
  document.body.appendChild(exitScript);
}
