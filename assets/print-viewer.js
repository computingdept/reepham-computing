/* Synergy Assist PDF viewer.
   Shared KS3, J277 and H446 booklets: show the exact source PDF page (paper-first), with
   PDF-derived speech text only. No duplicate lesson or answers are authored.
   Revision guides retain their existing text-extraction reading mode.
   Other approved, catalogued companions retain their legacy code path. */
(function(){
  'use strict';
  const byId=id=>document.getElementById(id);
  const params=new URLSearchParams(location.search);
  const frame=byId('viewerFrame'), error=byId('viewerError');
  const title=byId('viewerTitle'), back=byId('viewerBack');
  const print=byId('viewerPrint'), open=byId('viewerOpen');
  const fallback=byId('viewerFallback'), reading=byId('readingView');
  const mobileBox=byId('mobilePdfOptions'),mobileRead=byId('mobileReadingBtn'),mobileOriginal=byId('mobileOriginal');
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
  let bookletZoom=1,bookletRenderToken=0;
  let ttsQueue=[],ttsIndex=0,ttsToken=0,ttsActive=false,ttsPaused=false,ttsCurrent=null;
  const storeKey='synergy-assist-reading-preferences-v1';
  const defaults={font:'system',spacing:'comfortable',colour:'white',size:100,focus:false,rate:'1'};
  let prefs={...defaults};
  const allowed={font:['system','arial','verdana','atkinson'],spacing:['normal','comfortable','wide'],colour:['white','cream','blue','green','dark'],rate:['0.8','0.9','1','1.1','1.2']};
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
  // Paper-first reading for J277/H446 revision guides and KS3/J277/H446
  // booklets. The visual page, read-aloud text and Print use ONE source PDF.
  const paperFirstBooklet=
    /^\/offline\/booklets\/(?:j277|h446)\/[^/]+\.pdf$/i.test(file.pathname)||
    /^\/lessons\/year[789]\/year[789]-lesson-upload\/Y[789]-L\d{2}-print\.pdf$/i.test(file.pathname)||
    /^\/assets\/year8\/[^/]*booklet\.pdf$/i.test(file.pathname);
  const paperFirstDocument=guidePdf||paperFirstBooklet;
  const pdfTextReader=paperFirstDocument;
  if(paperFirstDocument){
    document.body.classList.add('paper-first-booklet');
    // The original page is always shown, so settings which only reflow HTML
    // text must not misleadingly promise to change the printed page.
    [font,spacing,colour].forEach(control=>{
      const field=control.closest('.access-field');
      if(field)field.hidden=true;
    });
    [focus,vocab,memory].forEach(control=>{
      const field=control.closest('label');
      if(field)field.hidden=true;
    });
    [byId('fontUp'),byId('fontDown')].forEach(control=>{
      const field=control.closest('.access-field');
      if(field)field.hidden=true;
    });
  }
  const pdf=file.pathname+file.search;
  const mobileDevice=window.matchMedia('(max-width: 540px)').matches;
  const loading=byId('viewerLoading');
  // Reading View is the default on every device wherever the resource has
  // an available companion. The explicit reading=0 URL option can still show
  // the original PDF. A previous PDF preference cannot override the default.
  const preferReading=params.get('reading')!=='0';
  // Avoid triggering Android's generic PDF file-opening screen while the
  // accessible reader is being resolved. Load the PDF only if requested.
  if(!preferReading)frame.src=pdf;
  frame.hidden=preferReading;
  if(loading)loading.hidden=!preferReading;
  open.href=pdf;
  if(mobileOriginal)mobileOriginal.href=pdf;
  if(mobileBox)mobileBox.hidden=true;
  // No PDF overlay on top of the reader while its accessible content loads.
  fallback.hidden=preferReading;
  // Print always opens the original, unchanged PDF as a normal link.
  // This lets the school's browser or Adobe Acrobat extension handle it.
  // A website cannot force desktop Acrobat to start.
  print.href=pdf;
  print.hidden=false;
  // Make Tools visible immediately for revision guides, even if the
  // accessibility catalogue is unavailable or slow to load.
  if(paperFirstDocument){tools.hidden=false;panel.hidden=true;}
  if(paperFirstDocument)showReading.disabled=true;

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
    // The PDF reader and lesson tools own different preferences under one key.
    // Preserve lesson Reading View state (enabled) and any later shared fields.
    try{
      const previous=JSON.parse(localStorage.getItem(storeKey)||'{}');
      const shared=previous&&typeof previous==='object'&&!Array.isArray(previous)?previous:{};
      localStorage.setItem(storeKey,JSON.stringify({...shared,...prefs}));
    }catch(_){}
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
    if(mode==='pdf'&&frame.getAttribute('src')!==pdf)frame.src=pdf;
    if(loading)loading.hidden=true;
    reading.hidden=mode!=='reading';
    frame.hidden=mode==='reading';
    fallback.hidden=mode==='reading';
    if(mobileBox){
      mobileBox.hidden=mode==='reading'||!mobileDevice;
      if(mode==='pdf'){
        const mobileHint=mobileBox.querySelector('p');
        if(mobileHint)mobileHint.textContent=readerData?
          'Original PDF selected. Use Tools to return to Reading View, or open the PDF directly.':
          'Reading View is not available for this resource right now. Open the original PDF directly.';
      }
    }
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

  /* Extract selectable text directly from the source PDF, one page at a
     time. The pilot keeps an exact visual reproduction available for any
     diagrams, tables, maths notation, and extraction-order ambiguities. */
  function enableGuideReader(){
    if(!pdfTextReader)return;
    tools.hidden=false;
    const note=panel.querySelector('.view-switch + .access-note');
    if(note)note.textContent=guidePdf
      ?'Reading View shows the exact revision guide pages, including diagrams and worked examples. Navigate by page or zoom in. Listen uses selectable text from the same PDF; complicated layouts may be read out of order. Print opens the original PDF.'
      :'Reading View shows the actual paper booklet page. Use page arrows and Zoom to inspect it; write answers in the printed booklet. Listen reads selectable PDF text and may not handle complex layouts perfectly. Print opens the unchanged PDF.';
    notice('Preparing Reading View from the original PDF.');
  }
  // Paper-first guide/booklet: render the actual PDF page, however many
  // pages it contains. Extraction serves speech only, never a visible text dump.
  async function renderBookletPage(requested){
    if(!guideDocument)return;
    const token=++bookletRenderToken;
    const n=Math.max(1,Math.min(guideDocument.numPages,Math.round(Number(requested)||1)));
    guidePage=n;
    stopSpeech();
    const page=await guideDocument.getPage(n);
    if(token!==bookletRenderToken)return;
    const inner=el('div','reader-inner booklet-page-inner');
    const heading=el('h2','booklet-page-heading',label);
    inner.append(heading);
    const instructions=el('p','booklet-paper-instruction',guidePdf
      ?'Original revision guide · Use the arrows to turn pages, or zoom to inspect diagrams.'
      :'Read or listen on screen. Write your answers in the printed booklet.');
    inner.append(instructions);
    const controls=el('nav','booklet-page-controls');
    controls.setAttribute('aria-label',guidePdf?'Revision guide page navigation':'Booklet page navigation');
    const prev=el('button','booklet-page-prev','← Previous');
    const count=el('strong','booklet-page-count','Page '+n+' of '+guideDocument.numPages);
    count.setAttribute('aria-live','polite');
    const next=el('button','booklet-page-next','Next →');
    prev.type=next.type='button';
    prev.disabled=n===1;next.disabled=n===guideDocument.numPages;
    prev.addEventListener('click',()=>renderBookletPage(n-1));
    next.addEventListener('click',()=>renderBookletPage(n+1));
    // Revision guides may be much longer than four-page lesson booklets.
    // Keep random access to any original PDF page without scroll hunting.
    if(guidePdf){
      const jump=el('div','booklet-page-jump');
      const jumpLabel=el('label','', 'Go to');
      const jumpInput=el('input','');
      jumpInput.type='number';
      jumpInput.min='1';jumpInput.max=String(guideDocument.numPages);
      jumpInput.value=String(n);
      jumpInput.setAttribute('aria-label','Go to revision guide page number');
      jumpInput.setAttribute('inputmode','numeric');
      jumpLabel.append(jumpInput);
      const jumpButton=el('button','','Go');
      jumpButton.type='button';
      const go=()=>{
        const pageNo=Number(jumpInput.value);
        if(!Number.isInteger(pageNo)||pageNo<1||pageNo>guideDocument.numPages){
          notice('Choose a page between 1 and '+guideDocument.numPages+'.');
          jumpInput.focus();
          return;
        }
        renderBookletPage(pageNo);
      };
      jumpButton.addEventListener('click',go);
      jumpInput.addEventListener('keydown',event=>{
        if(event.key==='Enter'){event.preventDefault();go();}
      });
      jump.append(jumpLabel,jumpButton);
      controls.append(jump);
    }
    const zoomRow=el('div','booklet-zoom');
    const zoomOut=el('button','','−');
    zoomOut.type='button';zoomOut.disabled=bookletZoom<=1;
    zoomOut.setAttribute('aria-label','Zoom out of booklet page');
    const zoomLabel=el('span','booklet-zoom-label',Math.round(bookletZoom*100)+'%');
    const zoomIn=el('button','','+');
    zoomIn.type='button';zoomIn.disabled=bookletZoom>=2.5;
    zoomIn.setAttribute('aria-label','Zoom in on booklet page');
    zoomOut.addEventListener('click',()=>{bookletZoom=Math.max(1,Math.round((bookletZoom-.25)*100)/100);renderBookletPage(n);});
    zoomIn.addEventListener('click',()=>{bookletZoom=Math.min(2.5,Math.round((bookletZoom+.25)*100)/100);renderBookletPage(n);});
    zoomRow.append(zoomOut,zoomLabel,zoomIn);
    controls.append(prev,count,next,zoomRow);
    inner.append(controls);
    const holder=el('div','booklet-page-scroll');
    holder.setAttribute('role','region');
    holder.setAttribute('aria-label','Original PDF page '+n+' — scroll horizontally when zoomed');
    holder.tabIndex=0;
    const canvas=document.createElement('canvas');
    canvas.setAttribute('role','img');
    canvas.setAttribute('aria-label',(guidePdf?'Original revision guide':'Original printed booklet')+', page '+n+' of '+guideDocument.numPages);
    holder.append(canvas);
    inner.append(holder);
    const speech=el('div','booklet-page-speech');
    speech.setAttribute('aria-label','Text extracted from the current PDF page for assistive reading');
    inner.append(speech);
    reading.replaceChildren(inner);
    reading.tabIndex=-1;
    applyPrefs();
    const viewportBase=page.getViewport({scale:1});
    const container=byId('preview');
    // Fit to the viewport at 100%. Zoom enlarges the SAME page, not its text
    // in a separate layout; the page can then be panned horizontally.
    const fitWidth=Math.min(840,Math.max(260,(container?.clientWidth||window.innerWidth||950)-38));
    const displayWidth=Math.round(fitWidth*bookletZoom);
    const displayScale=displayWidth/viewportBase.width;
    // Cap raster pixels to avoid large, high-DPI revision guides exhausting
    // mobile memory at maximum zoom; the CSS page remains zoomed to scale.
    const displayHeight=displayWidth*viewportBase.height/viewportBase.width;
    const pixelRatio=Math.min(2,window.devicePixelRatio||1,
      Math.sqrt(12000000/Math.max(1,displayWidth*displayHeight)));
    const viewport=page.getViewport({scale:displayScale*pixelRatio});
    canvas.width=Math.round(viewport.width);
    canvas.height=Math.round(viewport.height);
    canvas.style.width=displayWidth+'px';
    canvas.style.height=Math.round(displayWidth*viewportBase.height/viewportBase.width)+'px';
    holder.setAttribute('aria-busy','true');
    try{
      const ctx=canvas.getContext('2d',{alpha:false});
      if(!ctx)throw Error('Canvas not supported');
      // Rendering the source PDF means diagrams, writing lines and exact
      // question/answer positions remain identical to the paper booklet.
      await page.render({canvasContext:ctx,viewport}).promise;
      if(token!==bookletRenderToken)return;
      holder.setAttribute('aria-busy','false');
      // Source PDF text is not displayed as a separate, confusing text dump.
      // Extraction failure must NEVER prevent the intact PDF page being shown.
      let lines=[];
      try{
        const content=await page.getTextContent();
        if(token!==bookletRenderToken)return;
        const items=content.items.filter(item=>typeof item.str==='string'&&item.str.trim());
        const placed=items.map((item,i)=>({text:item.str.trim(),x:item.transform?.[4]||0,y:item.transform?.[5]||0,i}));
        placed.sort((a,b)=>Math.abs(b.y-a.y)>3?b.y-a.y:a.x-b.x||a.i-b.i);
        for(const item of placed){
          const last=lines[lines.length-1];
          if(!last||Math.abs(last.y-item.y)>3)lines.push({y:item.y,text:item.text});
          else last.text+=' '+item.text;
        }
      }catch(_){lines=[];}
      if(token!==bookletRenderToken)return;
      for(const line of lines)speech.append(el('span','reader-highlight-target',line.text));
      if(!lines.length){
        play.disabled=true;
        speech.append(el('span','', 'Read-aloud text is unavailable on this PDF page.'));
      }else play.disabled=!speechAvailable;
      notice((guidePdf?'Showing revision guide page ':'Showing the original PDF page ')+n+
        ' of '+guideDocument.numPages+(guidePdf?'.':' · Write answers on paper.'));
    }catch(_){
      if(token!==bookletRenderToken)return;
      holder.replaceChildren(el('p','', 'This page could not be drawn on your device.'));
      const pdfLink=el('a','', 'Open original PDF');
      pdfLink.href=pdf;pdfLink.target='_blank';pdfLink.rel='noopener';
      holder.append(pdfLink);
      notice('Page preview unavailable. Open the original PDF to continue.');
    }
  }

  async function renderGuidePage(requested){
    if(paperFirstDocument)return renderBookletPage(requested);
    if(!guideDocument)return;
    stopSpeech();
    const n=Math.max(1,Math.min(guideDocument.numPages,Math.round(Number(requested)||1)));
    guidePage=n;
    notice('Reading PDF page '+n+' of '+guideDocument.numPages+'…');
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
    inner.append(el('p','reader-source-note',paperFirstBooklet?'Content extracted from this same printable PDF. Write answers on your paper booklet. Check the exact PDF page below for diagrams, equations and layout.':'Automatically extracted reading aid. Text order and technical notation may be inaccurate; pictures and diagrams may be omitted. Refer to the Original PDF for authoritative content.'));
    const nav=el('nav','guide-reader-pages');
    nav.setAttribute('aria-label','PDF page navigation');
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
      inner.append(el('p','reader-source-note', 'No selectable text was found on this PDF page. Use its original-page image for the questions and diagrams.'));
    }else{
      const section=el('section','guide-extracted-lines');
      section.setAttribute('aria-label','Automatically extracted page text');
      for(const item of lines)section.append(el('p','reader-highlight-target guide-extracted-line',item));
      inner.append(section);
    }
    if(paperFirstBooklet){
      // The page image is rendered from the SAME PDF, on demand. It preserves
      // diagrams, tables, maths symbols and the original exact layout without
      // introducing a second source or any model-answer reveal controls.
      const exact=el('details','reader-exact-page');
      const exactLabel=el('summary','','View original PDF page '+n+' (diagrams and exact layout)');
      const exactBody=el('div','reader-exact-body');
      exact.append(exactLabel,exactBody);
      inner.append(exact);
      let imageLoaded=false,imageLoading=false;
      exact.addEventListener('toggle',async()=>{
        if(!exact.open||imageLoaded||imageLoading)return;
        imageLoading=true;
        exactBody.replaceChildren(el('p','', 'Loading original PDF page…'));
        try{
          const viewport=page.getViewport({scale:1.6});
          const canvas=document.createElement('canvas');
          canvas.width=Math.ceil(viewport.width);
          canvas.height=Math.ceil(viewport.height);
          canvas.setAttribute('role','img');
          canvas.setAttribute('aria-label','Original PDF page '+n+' including its diagrams and layout');
          const context=canvas.getContext('2d',{alpha:false});
          if(!context)throw Error('Canvas unavailable');
          await page.render({canvasContext:context,viewport}).promise;
          exactBody.replaceChildren(canvas);
          imageLoaded=true;
        }catch(_){
          const link=el('a','', 'Open the original PDF');
          link.href=pdf;link.target='_blank';link.rel='noopener';
          exactBody.replaceChildren(el('p','', 'This device could not display the original page here.'),link);
        }finally{imageLoading=false;}
      });
      if(!lines.length){
        // On image-only pages the exact original page is necessary: extractable
        // text cannot provide an accessible equivalent without a reviewed OCR.
        exact.open=true;
        exact.dispatchEvent(new Event('toggle'));
      }
    }
    reading.replaceChildren(inner);
    reading.tabIndex=-1;applyPrefs();
    notice('Page '+n+' of '+guideDocument.numPages+' ready. Select Play to listen to this page.');
  }
  function loadGuideReader(){
    if(!pdfTextReader)return Promise.resolve();
    if(guideLoading)return guideLoading;
    notice('Preparing reading text from the original PDF…');
    showReading.disabled=true;
    guideLoading=(async()=>{
      // PDF.js runs in the browser; the PDF itself is fetched only from our domain.
      const pdfjs=await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.min.mjs');
      pdfjs.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.149/pdf.worker.min.mjs';
      guideDocument=await pdfjs.getDocument({url:pdf,withCredentials:false}).promise;
      if(!guideDocument||guideDocument.numPages<1)throw Error('No pages in PDF');
      readerData={type:'automatically-extracted-pdf'};
      if(mobileRead)mobileRead.hidden=false;
      await renderGuidePage(1);
      setMode('reading');
      notice(guidePdf
        ?'Original revision guide page 1 of '+guideDocument.numPages+' ready.'
        :'Original booklet page 1 of '+guideDocument.numPages+' ready. Write answers on paper.');
      return true;
    })().catch(()=>{
      guideDocument=null;readerData=null;guideLoading=null;
      setMode('pdf');
      notice('Reading View could not load on this device or network. Open the original PDF instead.');
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
  showReading.addEventListener('click',()=>{
    if(pdfTextReader&&!readerData)loadGuideReader();
    else if(readerData)setMode('reading');
  });
  if(mobileRead)mobileRead.addEventListener('click',()=>showReading.click());
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
    if(pdfTextReader&&!readerData){loadGuideReader();return;}
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

  // The source-PDF reader is the only lesson content source for booklets.
  // No separately maintained lesson transcript is needed for booklet PDFs.
  if(pdfTextReader){
    enableGuideReader();
    if(preferReading)loadGuideReader();
    else setMode('pdf');
    return;
  }
  fetch('/assets/accessible/catalogue.json',{cache:'no-store'}).then(response=>{
    if(!response.ok)throw Error('No accessibility catalogue');
    return response.json();
  }).then(catalogue=>{
    if(catalogue.schema_version!==1||!catalogue.entries){
      setMode('pdf');
      return;
    }
    const source=catalogue.entries[file.pathname];
    const dataUrl=localUrl(source,'.json');
    if(!dataUrl){
      setMode('pdf');
      if(paperFirstBooklet)notice('Reading View is temporarily unavailable. You can still open the original PDF.');
      return;
    }
    return fetch(dataUrl.pathname,{cache:'no-store'}).then(response=>{
      if(!response.ok)throw Error('Reading companion unavailable');
      return response.json();
    }).then(data=>{
      if(data.schema_version!==1||!Array.isArray(data.sections)||!Array.isArray(data.vocabulary))throw Error('Invalid reading companion');
      readerData=data;
      showReading.disabled=false;
      if(mobileRead)mobileRead.hidden=false;
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
      if(preferReading)setMode('reading');
      else setMode('pdf');
    });
  }).catch(()=>{
    // If the reader cannot load, show the original document rather than
    // leaving a blank screen or an indefinite loading state.
    setMode('pdf');
    if(paperFirstBooklet){
      notice('Reading View could not be loaded. Open the original PDF instead.');
      showReading.disabled=true;
      if(mobileRead)mobileRead.hidden=true;
    }else tools.hidden=true;
  });
})();
