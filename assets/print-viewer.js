/* Synergy Assist PDF preview + accessible reading companions.
   Source PDF remains unchanged; reading content is from approved lesson
   material and is NOT a verbatim PDF transcript. Only matching PDFs offer
   Reading View. All dynamic content is rendered via textContent. */
(function(){
  'use strict';
  const byId=id=>document.getElementById(id);
  const params=new URLSearchParams(location.search);
  const frame=byId('viewerFrame'), error=byId('viewerError');
  const title=byId('viewerTitle'), back=byId('viewerBack');
  const print=byId('viewerPrint'), open=byId('viewerOpen');
  const fallback=byId('viewerFallback'), reading=byId('readingView');
  const tools=byId('viewerTools'), panel=byId('accessPanel');
  const status=byId('accessStatus');
  const showPdf=byId('showPdf'), showReading=byId('showReading');
  const font=byId('readingFont'), spacing=byId('readingSpacing');
  const colour=byId('readingColour'), focus=byId('readingFocus');
  const vocab=byId('showVocabulary'), memory=byId('showMemory');
  const rate=byId('listenRate'), play=byId('listenPlay');
  const voiceSelect=byId('listenVoice'), voicePreview=byId('listenVoicePreview');
  const sharedVoice=window.SynergyVoice;
  const pause=byId('listenPause'), stop=byId('listenStop');
  const sizeDisplay=byId('fontSizeValue');
  const speechAvailable=typeof window.speechSynthesis!=='undefined'&&typeof window.SpeechSynthesisUtterance==='function';
  let readerData=null, mode='pdf', focusTarget=null;
  let guideDocument=null,guideLoading=null,guidePage=1;
  let ttsQueue=[],ttsIndex=0,ttsToken=0,ttsActive=false,ttsPaused=false,ttsCurrent=null;
  const storeKey='synergy-assist-reading-preferences-v1';
  const defaults={font:'system',spacing:'comfortable',colour:'white',size:100,focus:false,rate:'1'};
  let prefs={...defaults};
  const allowed={font:['system','arial','verdana','atkinson'],spacing:['normal','comfortable','wide'],colour:['white','cream','blue','green','dark'],rate:['0.8','1','1.2']};
  function localUrl(raw,ext){
    if(typeof raw!=='string'||!raw.startsWith('/')||raw.startsWith('//')||raw.length>1400)return null;
    try{
      const url=new URL(raw,location.origin);
      if(url.origin!==location.origin||url.username||url.password)return null;
      if(ext&&!url.pathname.toLowerCase().endsWith(ext))return null;
      return url;
    }catch(_){return null;}
  }
  const file=localUrl(params.get('file'),'.pdf');
  const from=localUrl(params.get('from'),null);
  if(from&&from.pathname!=='/print-viewer.html')back.href=from.pathname+from.search+from.hash;
  else back.href='/';
  let label=(params.get('title')||'Printable resource').trim().slice(0,110);
  if(!label)label='Printable resource';
  title.textContent=label;
  document.title=label+' · Synergy Assist';
  if(!file){
    error.textContent='This print link is invalid. Return to your resource hub and use its Print link.';
    error.hidden=false;
    return;
  }
  const guidePdf=/^\/revision\/(?:j277|h446)\/guides\/(?:units\/)?[^/]+\.pdf$/i.test(file.pathname);
  const pdf=file.pathname+file.search;
  frame.src=pdf;
  frame.hidden=false;
  open.href=pdf;
  fallback.hidden=false;
  print.disabled=false;
  // Make Tools visible immediately for revision guides, even if the
  // accessibility catalogue is unavailable or slow to load.
  if(guidePdf){tools.hidden=false;panel.hidden=true;}
  // Print the original document using the browser PDF viewer. Some browsers
  // cannot programmatically print an embedded PDF; open the original as backup.
  print.addEventListener('click',()=>{
    if(mode==='reading'){window.open(pdf,'_blank','noopener');return;}
    try{
      if(frame.contentWindow&&typeof frame.contentWindow.print==='function'){
        frame.contentWindow.focus();
        frame.contentWindow.print();
        return;
      }
    }catch(_){}
    window.open(pdf,'_blank','noopener');
  });

  const el=(tag,className,content)=>{
    const node=document.createElement(tag);
    if(className)node.className=className;
    if(content!==undefined)node.textContent=String(content);
    return node;
  };
  function notice(msg){status.textContent=msg||'';}
  function loadPrefs(){
    try{
      const loaded=JSON.parse(localStorage.getItem(storeKey)||'{}');
      if(loaded&&typeof loaded==='object'){
        for(const key of ['font','spacing','colour','rate']){
          if(allowed[key].includes(loaded[key]))prefs[key]=loaded[key];
        }
        if(Number.isFinite(loaded.size)&&loaded.size>=90&&loaded.size<=160)prefs.size=Math.round(loaded.size/10)*10;
        if(typeof loaded.focus==='boolean')prefs.focus=loaded.focus;
      }
    }catch(_){}
  }
  function savePrefs(){
    try{localStorage.setItem(storeKey,JSON.stringify(prefs));}catch(_){}
  }
  function applyPrefs(){
    font.value=prefs.font; spacing.value=prefs.spacing;
    colour.value=prefs.colour; focus.checked=prefs.focus;rate.value=prefs.rate;
    reading.dataset.font=prefs.font;
    reading.dataset.spacing=prefs.spacing;
    reading.dataset.colour=prefs.colour;
    reading.style.setProperty('--reader-size',(17*prefs.size/100)+'px');
    reading.classList.toggle('focus-on',prefs.focus);
    sizeDisplay.textContent=prefs.size+'%';
    if(!prefs.focus)clearFocus();
    else if(!focusTarget&&mode==='reading')selectFocus(reading.querySelector('.reader-highlight-target'),false);
  }
  function setMode(next){
    if(next==='reading'&&!readerData)return;
    stopSpeech();
    mode=next;
    reading.hidden=mode!=='reading';
    frame.hidden=mode==='reading';
    fallback.hidden=mode==='reading';
    showPdf.setAttribute('aria-pressed',String(mode==='pdf'));
    showReading.setAttribute('aria-pressed',String(mode==='reading'));
    if(mode==='reading'){reading.focus({preventScroll:true});}
    notice(mode==='reading'?'Reading View is on. Print still uses the original PDF.':'Original PDF is on.');
  }
  function togglePanel(opened){
    panel.hidden=!opened;
    tools.setAttribute('aria-expanded',String(opened));
    if(opened){byId('toolsClose').focus();}
    else tools.focus();
  }
  function clearFocus(){
    if(focusTarget)focusTarget.classList.remove('is-focused');
    focusTarget=null;
  }
  function selectFocus(node,scroll){
    if(!node)return;
    clearFocus();
    focusTarget=node;
    node.classList.add('is-focused');
    if(scroll)node.scrollIntoView({block:'center',behavior:'auto'});
  }
  function renderQuestion(block){
    const article=el('div','reader-question');
    article.append(el('p','reader-highlight-target',block.prompt));
    if(Array.isArray(block.options)&&block.options.length){
      const options=el('ol','reader-choices');
      options.type='A';
      block.options.forEach(option=>options.append(el('li','reader-highlight-target',option)));
      article.append(options);
    }
    const details=el('details','');
    details.append(el('summary','', 'Check model answer after attempting'));
    const answer=el('p','reader-highlight-target',block.answer||'');
    details.append(answer);
    article.append(details);
    return article;
  }
  function renderBlock(block){
    if(block.type==='paragraph')return el('p','reader-highlight-target',block.text);
    if(block.type==='instruction')return el('p','reader-instruction reader-highlight-target',block.text);
    if(block.type==='code')return el('pre','',block.text);
    if(block.type==='question')return renderQuestion(block);
    if(block.type==='place-values'){
      const wrap=el('div','reader-example');
      wrap.append(el('p','reader-highlight-target',block.caption));
      const list=el('ol','reader-places');list.setAttribute('aria-label',block.caption);
      block.labels.forEach(item=>list.append(el('li','',item)));
      wrap.append(list);return wrap;
    }
    if(block.type==='worked'){
      const wrap=el('div','reader-example');
      wrap.append(el('h3','reader-highlight-target',block.heading));
      const list=el('ol','');
      (block.steps||[]).forEach(step=>list.append(el('li','reader-highlight-target',step)));
      wrap.append(list);
      wrap.append(el('p','reader-result reader-highlight-target',block.result));
      return wrap;
    }
    return null;
  }
  function renderVocabulary(section,entries){
    section.replaceChildren(el('h2','', 'Key vocabulary'));
    section.append(el('p','', 'Open a term when you want a definition and example.'));
    for(const entry of entries){
      const detail=el('details','');
      detail.append(el('summary','',entry.term));
      detail.append(el('p','reader-highlight-target',entry.meaning));
      detail.append(el('p','reader-highlight-target',entry.example));
      section.append(detail);
    }
  }
  function renderMemory(section,entries,statusText){
    section.replaceChildren(el('h2','', 'Remember It — optional memory aids'));
    section.append(el('p','reader-source-note',statusText));
    for(const entry of entries){
      const detail=el('details','');
      detail.append(el('summary','',entry.title));
      detail.append(el('p','reader-highlight-target',entry.text));
      section.append(detail);
    }
  }
  function renderReader(data){
    const inner=el('div','reader-inner');
    inner.append(el('h1','reader-highlight-target',data.title));
    inner.append(el('p','reader-subtitle reader-highlight-target',data.qualification));
    inner.append(el('p','reader-source-note',data.source_note));
    const source=el('p','');
    const link=el('a','', 'Open the classroom lesson');
    const url=localUrl(data.source_lesson,null);
    link.href=url?url.pathname:'/j277-hub.html?year=10';
    source.append(link);inner.append(source);
    const objectives=el('section','reader-section');
    objectives.append(el('h2','','Learning objectives'));
    const ul=el('ul','');(data.learning_objectives||[]).forEach(t=>ul.append(el('li','reader-highlight-target',t)));
    objectives.append(ul);inner.append(objectives);
    for(const sec of (data.sections||[])){
      const group=el('section','reader-section');
      group.id='reading-'+sec.id;
      group.append(el('h2','reader-highlight-target',sec.label));
      (sec.blocks||[]).forEach(block=>{const node=renderBlock(block);if(node)group.append(node);});
      inner.append(group);
    }
    const voc=el('section','reader-study-aids');
    voc.id='readerVocabulary';voc.hidden=!vocab.checked;
    renderVocabulary(voc,data.vocabulary||[]);
    inner.append(voc);
    // Future phase: Remember It memory aids remain excluded from student
    // reading content until specifically enabled and teacher-approved.
    const aidPolicy=data.aid_policy||{};
    if(aidPolicy.memory_aids_enabled===true&&aidPolicy.teacher_approved===true){
      const mem=el('section','reader-study-aids');
      mem.id='readerMemory';mem.hidden=!memory.checked;
      renderMemory(mem,data.memory_aids||[],data.memory_aids_status||'Teacher-approved memory aids');
      inner.append(mem);
    }
    reading.replaceChildren(inner);
    reading.tabIndex=-1;
    applyPrefs();
  }
  function stopSpeech(){
    ttsToken++;
    ttsActive=false;ttsPaused=false;ttsCurrent=null;ttsQueue=[];ttsIndex=0;
    try{if(speechAvailable)window.speechSynthesis.cancel();}catch(_){}
    reading.querySelectorAll('.tts-speaking').forEach(n=>n.classList.remove('tts-speaking'));
    pause.disabled=true;stop.disabled=true;pause.textContent='Pause';
    play.disabled=!speechAvailable;
  }
  function currentSpeechNodes(){
    return Array.from(reading.querySelectorAll('.reader-highlight-target'))
      .filter(node=>!node.closest('[hidden],details:not([open])'))
      .filter(node=>node.textContent.trim().length>0);
  }
  function speakNext(token){
    if(token!==ttsToken||!ttsActive)return;
    if(ttsIndex>=ttsQueue.length){
      ttsActive=false;stopSpeech();notice('Read aloud finished.');return;
    }
    const node=ttsQueue[ttsIndex];
    const utterance=new SpeechSynthesisUtterance(node.textContent.trim());
    if(sharedVoice)sharedVoice.apply(utterance);
    else utterance.lang='en-GB';
    utterance.rate=Number(prefs.rate);
    ttsCurrent=node;
    node.classList.add('tts-speaking');
    if(prefs.focus)selectFocus(node,true);
    utterance.onend=()=>{
      node.classList.remove('tts-speaking');
      if(token!==ttsToken)return;
      ttsIndex++;speakNext(token);
    };
    utterance.onerror=()=>{
      node.classList.remove('tts-speaking');
      if(token!==ttsToken)return;
      ttsIndex++;speakNext(token);
    };
    window.speechSynthesis.speak(utterance);
  }

  /* Automatic, page-at-a-time text extraction for revision-guide PDFs.
     Not a teacher-reviewed transcript; diagrams/tables/equations remain in
     the original PDF. Does not change or re-save the guide document. */
  function enableGuideReader(){
    if(!guidePdf)return;
    tools.hidden=false;
    const note=panel.querySelector('.view-switch + .access-note');
    if(note)note.textContent='Reading View extracts selectable text from this PDF automatically. The order of tables, algorithms, equations and diagrams may be inaccurate or incomplete. Use Original PDF to check them. Printing uses the original document.';
    notice('The original revision guide is open. Select Reading View to prepare text and listening tools.');
  }
  async function renderGuidePage(requested){
    if(!guideDocument)return;
    stopSpeech();
    const n=Math.max(1,Math.min(guideDocument.numPages,Math.round(Number(requested)||1)));
    guidePage=n;
    notice('Reading guide page '+n+' of '+guideDocument.numPages+'…');
    const page=await guideDocument.getPage(n);
    const content=await page.getTextContent();
    const lines=[];
    let line='';
    for(const part of content.items){
      if(typeof part.str!=='string')continue;
      const word=part.str;
      if(word){
        if(line&&!/\s$/.test(line)&&!word.startsWith(' ')&&!/^[.,!?;:%)\]]/.test(word))line+=' ';
        line+=word;
      }
      if(part.hasEOL){
        if(line.trim())lines.push(line.trim());
        line='';
      }
    }
    if(line.trim())lines.push(line.trim());
    const inner=el('div','reader-inner guide-reader-inner');
    inner.append(el('h1','',label));
    inner.append(el('p','reader-source-note','Automatically extracted reading aid. Text order and technical notation may be inaccurate; pictures and diagrams may be omitted. Refer to the Original PDF for authoritative content.'));
    const nav=el('nav','guide-reader-pages');
    nav.setAttribute('aria-label','Revision guide page navigation');
    const prev=el('button','', 'Previous page');
    prev.type='button';prev.disabled=n===1;
    const pageLabel=el('label','', 'Page');
    const pageInput=el('input','');
    pageInput.type='number';pageInput.min='1';pageInput.max=String(guideDocument.numPages);
    pageInput.value=String(n);pageInput.setAttribute('aria-label','PDF page number');
    pageLabel.append(pageInput);
    const total=el('span','guide-page-total','of '+guideDocument.numPages);
    const go=el('button','','Go');go.type='button';
    const next=el('button','','Next page');next.type='button';next.disabled=n===guideDocument.numPages;
    const changePage=num=>renderGuidePage(num).then(()=>{byId('preview').scrollTop=0;reading.querySelector('h2')?.scrollIntoView({block:'start'});}).catch(()=>notice('Could not extract that page. The original PDF remains available.'));
    prev.addEventListener('click',()=>changePage(n-1));
    next.addEventListener('click',()=>changePage(n+1));
    go.addEventListener('click',()=>changePage(pageInput.value));
    pageInput.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();changePage(pageInput.value);}});
    nav.append(prev,pageLabel,total,go,next);
    inner.append(nav);
    const heading=el('h2','', 'Page '+n);
    inner.append(heading);
    if(!lines.length){
      inner.append(el('p','', 'No selectable text was found on this page. View the original PDF for illustrations or scanned content.'));
    }else{
      const section=el('section','guide-extracted-lines');
      section.setAttribute('aria-label','Automatically extracted page text');
      for(const item of lines)section.append(el('p','reader-highlight-target guide-extracted-line',item));
      inner.append(section);
    }
    reading.replaceChildren(inner);
    reading.tabIndex=-1;applyPrefs();
    notice('Page '+n+' of '+guideDocument.numPages+' ready. Select Play to listen to this page.');
  }
  function loadGuideReader(){
    if(!guidePdf)return Promise.resolve();
    if(guideLoading)return guideLoading;
    notice('Preparing reading text from the original guide…');
    showReading.disabled=true;
    guideLoading=(async()=>{
      // PDF.js runs in the browser; the PDF itself is fetched only from our domain.
      const pdfjs=await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.min.mjs');
      pdfjs.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.worker.min.mjs';
      guideDocument=await pdfjs.getDocument({url:pdf,withCredentials:false}).promise;
      if(!guideDocument||guideDocument.numPages<1)throw Error('No pages in PDF');
      readerData={type:'automatically-extracted-guide'};
      await renderGuidePage(1);
      setMode('reading');
      notice('Reading View ready: automatically extracted text, page 1 of '+guideDocument.numPages+'. Check technical content against the Original PDF.');
      return true;
    })().catch(()=>{
      guideDocument=null;readerData=null;guideLoading=null;
      notice('Reading View could not load on this device or network. The original PDF remains available.');
      return false;
    }).finally(()=>{showReading.disabled=false;});
    return guideLoading;
  }

  loadPrefs();
  if(sharedVoice)prefs.rate=String(sharedVoice.getRate());
  applyPrefs();
  if(sharedVoice){
    sharedVoice.subscribe(()=>sharedVoice.populate(voiceSelect));
    voiceSelect.addEventListener('change',()=>{
      stopSpeech();sharedVoice.selectVoice(voiceSelect.value);
      notice('Voice selected. Choose Preview voice or Play.');
    });
    voicePreview.addEventListener('click',()=>{
      stopSpeech();sharedVoice.preview(notice);
    });
  }else{
    voiceSelect.disabled=true;voicePreview.disabled=true;
  }
  if(!speechAvailable){
    play.disabled=true;
    notice('Read aloud is not supported by this browser. Screen reader support remains available.');
  }
  tools.addEventListener('click',()=>togglePanel(panel.hidden));
  byId('toolsClose').addEventListener('click',()=>togglePanel(false));
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&!panel.hidden){togglePanel(false);return;}
    if(!prefs.focus||mode!=='reading'||!event.target.closest||event.target.closest('button,summary,input,select,a,textarea'))return;
    if(event.key!=='ArrowDown'&&event.key!=='ArrowUp')return;
    const nodes=currentSpeechNodes();
    if(!nodes.length)return;
    event.preventDefault();
    const idx=nodes.indexOf(focusTarget);
    const next=event.key==='ArrowDown'?Math.min(nodes.length-1,idx+1):Math.max(0,idx<0?0:idx-1);
    selectFocus(nodes[next],true);
  });
  document.addEventListener('pointerdown',event=>{
    if(!panel.hidden&&!panel.contains(event.target)&&!tools.contains(event.target))togglePanel(false);
  });
  reading.addEventListener('click',event=>{
    if(!prefs.focus)return;
    const target=event.target.closest('.reader-highlight-target');
    if(target)selectFocus(target,false);
  });
  showPdf.addEventListener('click',()=>setMode('pdf'));
  showReading.addEventListener('click',()=>{if(guidePdf&&!readerData)loadGuideReader();else setMode('reading');});
  font.addEventListener('change',()=>{prefs.font=font.value;savePrefs();applyPrefs();});
  spacing.addEventListener('change',()=>{prefs.spacing=spacing.value;savePrefs();applyPrefs();});
  colour.addEventListener('change',()=>{prefs.colour=colour.value;savePrefs();applyPrefs();});
  focus.addEventListener('change',()=>{prefs.focus=focus.checked;savePrefs();applyPrefs();});
  rate.addEventListener('change',()=>{prefs.rate=rate.value;savePrefs();if(sharedVoice)sharedVoice.setRate(rate.value);if(ttsActive){stopSpeech();notice('Speech speed updated. Select Play to restart.');}});
  byId('fontUp').addEventListener('click',()=>{prefs.size=Math.min(160,prefs.size+10);savePrefs();applyPrefs();});
  byId('fontDown').addEventListener('click',()=>{prefs.size=Math.max(90,prefs.size-10);savePrefs();applyPrefs();});
  vocab.addEventListener('change',()=>{const node=byId('readerVocabulary');if(node)node.hidden=!vocab.checked;});
  memory.addEventListener('change',()=>{const node=byId('readerMemory');if(node)node.hidden=!memory.checked;});
  play.addEventListener('click',()=>{
    if(guidePdf&&!readerData){loadGuideReader();return;}
    if(mode!=='reading')setMode('reading');
    if(!speechAvailable){notice('Read aloud is not supported by this browser.');return;}
    if(ttsPaused){window.speechSynthesis.resume();ttsPaused=false;pause.textContent='Pause';notice('Reading resumed.');return;}
    stopSpeech();
    ttsQueue=currentSpeechNodes();ttsIndex=0;
    if(!ttsQueue.length){notice('No readable lesson text is available.');return;}
    ttsActive=true;const token=ttsToken;pause.disabled=false;stop.disabled=false;
    notice('Reading the lesson aloud.');speakNext(token);
  });
  pause.addEventListener('click',()=>{
    if(!ttsActive||!speechAvailable)return;
    if(ttsPaused){window.speechSynthesis.resume();ttsPaused=false;pause.textContent='Pause';notice('Reading resumed.');}
    else {window.speechSynthesis.pause();ttsPaused=true;pause.textContent='Resume';notice('Reading paused.');}
  });
  stop.addEventListener('click',()=>{stopSpeech();notice('Reading stopped.');});
  window.addEventListener('pagehide',stopSpeech);

  // Only show an accessibility menu for PDFs with a reviewed, source-bound
  // reading companion. Other printable resources retain their existing viewer.
  fetch('/assets/accessible/catalogue.json',{cache:'no-store'}).then(response=>{
    if(!response.ok)throw Error('No accessibility catalogue');
    return response.json();
  }).then(catalogue=>{
    if(catalogue.schema_version!==1||!catalogue.entries){enableGuideReader();return;}
    const source=catalogue.entries[file.pathname];
    const dataUrl=localUrl(source,'.json');
    if(!dataUrl){enableGuideReader();return;}
    return fetch(dataUrl.pathname,{cache:'no-store'}).then(response=>{
      if(!response.ok)throw Error('Reading companion unavailable');
      return response.json();
    }).then(data=>{
      if(data.schema_version!==1||!Array.isArray(data.sections)||!Array.isArray(data.vocabulary))throw Error('Invalid reading companion');
      readerData=data;
      // Trust editors control whether either aid family is offered, using
      // lesson data. This is an editorial flag, not student authentication.
      const policy=data.aid_policy||{};
      vocab.disabled=policy.vocabulary_enabled===false;
      memory.disabled=!(policy.memory_aids_enabled===true&&policy.teacher_approved===true);
      vocab.checked=false;memory.checked=false;
      const memoryField=memory.closest('label');
      if(memoryField)memoryField.hidden=memory.disabled;
      renderReader(data);
      tools.hidden=false;
      notice('Reading View is available for this lesson.');
      if(params.get('reading')==='1')setMode('reading');
    });
  }).catch(()=>{
    // Fail safely to the original PDF, without pretending it is accessible text.
    if(guidePdf)enableGuideReader();else tools.hidden=true;
  });
})();
