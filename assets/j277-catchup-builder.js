/* J277 draft Catch Up generator for lessons 031–164.
   Source = the matching classroom lesson's actual JSON and audited Do Now bank.
   Central enhancement, not a rewrite of a teacher-led lesson.
   Automatically generated MCQ distractors require teacher review before approval. */
(function(){
  'use strict';
  const pad=n=>String(n).padStart(3,'0');
  const clean=s=>String(s==null?'':s).replace(/\s+/g,' ').trim();
  const unique=xs=>[...new Set(xs.map(clean).filter(Boolean))];
  function rotate(xs,n){return xs.slice(n%xs.length).concat(xs.slice(0,n%xs.length));}
  function makeChoice(id,prompt,correct,distractors,seed,feedback){
    const options=unique([clean(correct),...distractors.filter(s=>clean(s)!==clean(correct))]);
    if(options.length<4)throw Error('Not enough unique choices for '+id);
    const chosen=options.slice(0,4);
    return {id,kind:'choice',prompt,answer:clean(correct),options:rotate(chosen,seed%4),feedback:clean(feedback||correct)};
  }
  function questionFromBank(q,i,qs,lesson){
    if(q.format==='MCQ'&&Array.isArray(q.options)&&q.options.length===4){
      const answer=q.options['ABCD'.indexOf(q.correct_option)];
      if(!answer)throw Error('Missing source MCQ answer: '+q.question_id);
      return {id:'dn'+(i+1),kind:'choice',prompt:q.question,options:q.options,answer,
        feedback:q.explanation||q.answer,source_question_id:q.question_id};
    }
    // Source answers remain untouched; alternatives are conservative draft
    // misconceptions / other learning statements and will be audited later.
    const alternatives=[
      ...qs.filter(other=>other!==q).map(other=>other.answer),
      ...(lesson.c||[]).map(pair=>pair[1]),
      ...(lesson.v||[]).map(pair=>pair[1]),
      'This statement is always true for any input, regardless of the conditions.',
      'The two concepts have exactly the same purpose and can always be exchanged.'
    ];
    return {...makeChoice('dn'+(i+1),q.question,q.answer,alternatives,i*2+Number(q.lesson||0),q.explanation),
      source_question_id:q.question_id,draft_options:true};
  }
  function makeConcept(id,pair,concepts,seed){
    const term=clean(pair[0]), definition=clean(pair[1]);
    const others=concepts.filter(x=>clean(x[0])!==term).map(x=>x[1]);
    return makeChoice(id,'Which description best matches '+term+'?',definition,
      [...rotate(others,seed%Math.max(1,others.length)),'It has no purpose in a computer system.'],
      seed,definition);
  }
  async function build(id){
    const num=Number(id), n=pad(num);
    if(!Number.isInteger(num)||num<31||num>164)throw Error('Not a generated Catch Up lesson');
    const [lessonResult,bankResult]=await Promise.all([
      fetch('../autumn2-'+n+'.json',{cache:'no-store'}),
      fetch('../donow-bank-20261020.json',{cache:'no-store'})
    ]);
    if(!lessonResult.ok||!bankResult.ok)throw Error('Classroom material unavailable');
    const lesson=(await lessonResult.json())[n];
    const entry=(await bankResult.json()).lessons[n];
    if(!lesson||!entry||!Array.isArray(entry.questions)||entry.questions.length!==4)throw Error('Missing original lesson or Do Now');
    if(!Array.isArray(lesson.c)||lesson.c.length<3||!Array.isArray(lesson.v)||lesson.v.length<3||!lesson.m||!lesson.k||!lesson.e?.length)throw Error('Lesson does not meet the Catch Up source requirement');
    const concepts=lesson.c, vocab=lesson.v;
    const pool=unique([...concepts.map(a=>a[1]),...vocab.map(a=>a[1])]);
    const pair=(a,b)=>[clean(a),clean(b)];
    const stageDoNow={
      label:'Do Now',minutes:3,lead:'The four retrieval questions are the same as the classroom lesson. Choose an answer to each, then check all four.',
      sign:'DoNow_CodingIcon.png',blocks:[],
      questions:entry.questions.map((q,i)=>questionFromBank(q,i,entry.questions,lesson))
    };
    const worked=(lesson.m.st||[]).map((text,i)=>({
      type:'paragraph',title:clean(lesson.m.headings?.[i]||'Worked step '+(i+1)),text:clean(text)
    }));
    const idoQuestions=Array.from({length:3},(_,i)=>makeConcept('l'+(i+1),concepts[i%concepts.length],concepts,i+num));
    const stageI={
      label:'I Do',minutes:4,lead:'Read the new knowledge and follow the same worked model as the classroom lesson.',
      sign:'IDo_CodingIcon.png',
      blocks:[
        ...concepts.slice(0,4).map(([term,meaning])=>({type:'paragraph',title:clean(term),text:clean(meaning)})),
        {type:'prompt',title:'I Do · '+clean(lesson.m.title||'Worked example'),text:clean(lesson.m.q)},
        ...worked
      ],
      questions:idoQuestions
    };
    const practice=Array.isArray(lesson.w)&&lesson.w.length?lesson.w[0]:null;
    const matchPairs=vocab.slice(0,Math.min(3,vocab.length)).map(([term,meaning])=>pair(term,meaning));
    const methods=unique(lesson.m.headings||[]);
    const questionPractice=[
      {id:'p1',kind:'match',prompt:'Match each technical term to its correct meaning.',pairs:matchPairs,feedback:'Check each matched definition against the new knowledge.'},
      makeConcept('p2',vocab[0],vocab,5+num),
      makeConcept('p3',vocab[1],vocab,6+num),
      makeConcept('p4',concepts[concepts.length-1],concepts,7+num)
    ];
    const stageWe={
      label:'We Do',minutes:4,lead:'Use the guided classroom example and check your understanding.',
      sign:'WeDo_CodingIcon.png',
      blocks:[
        {type:'prompt',title:'We Do · guided question',text:clean(practice?.[0]||lesson.m.q)},
        {type:'hint',title:'First step',text:clean(lesson.wSteps?.[0]?.[0]?.[1]||lesson.m.st?.[0]||'Identify the information provided in the question.')},
        ...(methods.length>1?[{type:'facts',title:'Method to follow',items:methods}]:[])
      ],
      questions:questionPractice
    };
    const code=lesson.k.code||'';
    const applyQuestions=[
      makeConcept('a1',vocab[2],vocab,8+num),
      makeConcept('a2',concepts[1],concepts,9+num),
      makeConcept('a3',vocab[vocab.length-1],vocab,10+num)
    ];
    const writingPair=lesson.e[0];
    const stageYou={
      label:'You Do',minutes:5,lead:'Code First: predict the output before checking. Then complete independent exam-style practice.',
      sign:'YouDo_CodingIcon.png',
      blocks:[
        {type:'prompt',title:'Code First · predict, write, test, improve',text:clean(lesson.k.q)},
        {type:'code',title:'OCR exam reference language',lines:String(code).split('\n'),caption:'Predict what this code does before looking at the answer.'},
        {type:'facts',title:'Try these steps',items:(lesson.k.p||[]).map(clean)},
        {type:'paragraph',title:'Code First · model answer (check afterwards)',text:clean(lesson.k.a)}
      ],
      questions:applyQuestions,
      writing:{prompt:clean(writingPair[0]),model:clean(writingPair[1]),checklist:['Answer every part of the question.','Use the correct Computing terminology.','Compare with the model, then improve your response.']}
    };
    const exit=lesson.x||['You can use technical vocabulary to explain the topic.',true];
    const checkQuestions=[
      {id:'c1',kind:'truefalse',prompt:clean(exit[0]),answer:String(Boolean(exit[1])),feedback:clean(exit[1]?'True. ':'False. ')+clean(lesson.memoryCue||vocab[0][1])},
      makeConcept('c2',vocab[1],vocab,11+num),
      makeConcept('c3',concepts[0],concepts,12+num)
    ];
    return {
      schema_version:1,id:'j277-'+n,title:clean(lesson.t||entry.questions[0].lesson_title),
      year:lesson.year11?11:10,estimated_minutes:18,pass_percent:80,
      intro:'Independent Catch Up based on the classroom lesson. Draft questions are awaiting teacher approval.',
      draft:true,
      stages:[stageDoNow,stageI,stageWe,stageYou,{
        label:'Review & Improve',minutes:2,lead:'Review your answers, correct misconceptions and check the learning score.',
        sign:'Questionning_CodingIcon.png',blocks:[{
          type:'paragraph',title:'Remember',text:clean(lesson.memoryCue||vocab[0][1])
        }],questions:checkQuestions
      }]
    };
  }
  window.J277CatchupBuilder={build};
})();