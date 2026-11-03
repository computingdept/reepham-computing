/* Synergy Assist shared Listen service for the Learning Hub, lessons, Catch Up,
   practice and PDF Reading View. One speech/voice implementation, opt-in only.
   Uses voices exposed by the browser; does not require an account or API key. */
(function(){
 'use strict';
 if(window.SynergyVoice)return;
 const synth=window.speechSynthesis;
 const supported=!!(synth&&window.SpeechSynthesisUtterance);
 const key='synergy-assist-voice-v1';
 let prefs={uri:'',rate:0.9},voices=[],subscribers=new Set();
 let token=0,queue=[],index=0,active=false,paused=false,current=null,announce=()=>{};
 try{
  const saved=JSON.parse(localStorage.getItem(key)||'{}');
  if(typeof saved.uri==='string'&&saved.uri.length<250)prefs.uri=saved.uri;
  if([0.8,0.9,1,1.1,1.2].includes(Number(saved.rate)))prefs.rate=Number(saved.rate);
 }catch(_){}
 const persist=()=>{try{localStorage.setItem(key,JSON.stringify(prefs));}catch(_){}};
 const locale=voice=>String(voice.lang||'').replace('_','-').toLowerCase();
 const rank=voice=>{
  const english=locale(voice)==='en-gb'?0:locale(voice).startsWith('en-')?2:4;
  return english+(voice.localService?0:1);
 };
 const quality=voice=>/natural|enhanced|premium/i.test(voice.name)?0:1;
 const sorted=items=>items.slice().sort((a,b)=>rank(a)-rank(b)||quality(a)-quality(b)||a.name.localeCompare(b.name));
 function reload(){
  if(!supported)return;
  try{voices=sorted(synth.getVoices()||[]);}catch(_){voices=[];}
  subscribers.forEach(callback=>callback());
 }
 if(supported){
  reload();
  if(synth.addEventListener)synth.addEventListener('voiceschanged',reload);
  else synth.onvoiceschanged=reload;
 }
 function choice(){
  return voices.find(v=>v.voiceURI===prefs.uri)||voices.find(v=>locale(v)==='en-gb'&&v.localService)||
   voices.find(v=>locale(v).startsWith('en')&&v.localService)||
   voices.find(v=>locale(v)==='en-gb')||voices.find(v=>locale(v).startsWith('en'))||voices.find(v=>v.default)||null;
 }
 function apply(utterance){
  const voice=choice();
  if(voice){utterance.voice=voice;utterance.lang=voice.lang;}
  else utterance.lang='en-GB';
  utterance.rate=prefs.rate;
  return utterance;
 }
 function selectVoice(uri){
  if(typeof uri!=='string')return;
  prefs.uri=uri;persist();subscribers.forEach(callback=>callback());
 }
 function setRate(rate){
  rate=Number(rate);
  if(![0.8,0.9,1,1.1,1.2].includes(rate))return;
  prefs.rate=rate;persist();
 }
 function subscribe(callback){subscribers.add(callback);callback();return()=>subscribers.delete(callback);}
 function populate(select){
  if(!select)return;
  const existing=document.activeElement===select?select.value:null;
  const items=document.createDocumentFragment();
  const auto=document.createElement('option');
  auto.value='';auto.textContent=voices.length?'Automatic · best English available':'System default (loading voices)';
  items.append(auto);
  voices.forEach(v=>{
   const option=document.createElement('option');
   option.value=v.voiceURI;option.textContent=v.name+' · '+v.lang+(v.localService?' · on device':' · may use online processing');
   items.append(option);
  });
  select.replaceChildren(items);
  select.value=voices.some(v=>v.voiceURI===prefs.uri)?prefs.uri:'';
  if(existing&&select.querySelector('option[value="'+CSS.escape(existing)+'"]'))select.value=existing;
 }
 function stop(){
  token++;queue=[];index=0;active=false;paused=false;
  if(current){current.classList.remove('synergy-voice-reading');current=null;}
  if(supported){try{synth.cancel();}catch(_){}}
  announce('Stopped reading.');
 }
 function readNext(myToken){
  if(!active||myToken!==token)return;
  if(index>=queue.length){stop();announce('Finished reading.');return;}
  const item=queue[index++];
  const text=(typeof item==='string'?item:item.textContent||'').trim();
  if(!text){readNext(myToken);return;}
  if(current)current.classList.remove('synergy-voice-reading');
  current=typeof item==='string'?null:item;
  if(current)current.classList.add('synergy-voice-reading');
  const utterance=apply(new SpeechSynthesisUtterance(text.slice(0,1500)));
  utterance.onend=()=>{if(myToken===token)readNext(myToken);};
  utterance.onerror=()=>{if(myToken===token)readNext(myToken);};
  try{synth.speak(utterance);}catch(_){stop();announce('Speech could not start on this device.');}
 }
 function speak(items,notify){
  if(!supported)return false;
  stop();
  announce=typeof notify==='function'?notify:()=>{};
  queue=Array.isArray(items)?items.filter(Boolean):[items];
  if(!queue.length){announce('Nothing available to read on this screen.');return false;}
  active=true;paused=false;
  announce('Reading aloud.');readNext(token);
  return true;
 }
 function togglePause(){
  if(!supported||!active)return false;
  try{
   if(paused){synth.resume();paused=false;}
   else{synth.pause();paused=true;}
  }catch(_){return false;}
  announce(paused?'Paused.':'Reading resumed.');
  return paused;
 }
 function preview(notify){
  if(!supported)return;
  speak(['Hello. Binary uses zero and one. Eight bits make one byte.'],notify);
 }
 function nodeVisible(node){
  if(!node||!node.isConnected)return false;
  if(node.closest('[hidden],[inert],[aria-hidden="true"],template,script,style,noscript,nav,header,footer,aside,button,select,option,input,textarea,[role="navigation"],.synergy-voice-tool,[data-synergy-voice-ignore],.teacher-only,.answer-key,.mark-scheme,.model-answer,.catchup-feedback,.donow-review-answer,.review-answer,.j277-mark-scheme,.self-mark-answer,.youdo-solution,.answer-result,.correct-answer,.marking-scheme,.assessment-feedback'))return false;
  let p=node;
  while(p&&p.nodeType===1){
   const style=getComputedStyle(p);
   if(style.display==='none'||style.visibility==='hidden'||style.visibility==='collapse'||style.opacity==='0')return false;
   if(p.tagName==='DETAILS'&&!p.open&&p!==node)return false;
   p=p.parentElement;
  }
  return node.getClientRects().length>0;
 }
 function visibleText(node){
  const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT);
  const chunks=[];
  while(walker.nextNode()){
   const text=walker.currentNode;
   if(!text.nodeValue.trim()||!nodeVisible(text.parentElement))continue;
   chunks.push(text.nodeValue.trim());
  }
  return chunks.join(' ').replace(/\s+/g,' ').trim();
 }
 function readingRoot(){
  return document.querySelector('main .page.active')||
   document.querySelector('main .screen.active')||
   document.querySelector('#catchup-stage')||
   document.querySelector('main .panel.active')||
   document.querySelector('#catchup-app .catchup-stage')||
   document.querySelector('main')||document.querySelector('[role="main"]');
 }
 function readVisibleContent(){
  const root=readingRoot();
  if(!root)return [];
  const elements=root.querySelectorAll('h1,h2,h3,h4,p,li,blockquote,pre,summary,.donow-question,.catchup-question,.lesson-tile-open,.term-head strong');
  const out=[];
  for(const el of elements){
   if(!nodeVisible(el))continue;
   // Exclude nested textual elements already captured by their parent.
   if(out.some(parent=>parent.contains(el)))continue;
   const text=visibleText(el);
   if(text&&text.length<=1500)out.push(el);
   if(out.length>=100)break;
  }
  return out;
 }
 function navigationLabels(){
  const nodes=document.querySelectorAll('header a,header button,.rhsc-site-nav a,.phase-nav button,#catchup-progress button,#catchup-nav button,.course-nav .tab,.year-switch .year-btn,.rhsc-site-nav-button');
  const output=[];
  for(const node of nodes){
   if(node.closest('[hidden],[aria-hidden="true"]'))continue;
   const style=getComputedStyle(node);
   if(style.display==='none'||style.visibility==='hidden'||!node.getClientRects().length)continue;
   const text=(node.getAttribute('aria-label')||node.textContent||'').trim().replace(/\s+/g,' ');
   if(text&&!output.includes(text))output.push(text);
   if(output.length>=20)break;
  }
  return output;
 }
 function icon(){
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 9a5 5 0 0 1 0 6M18 6a9 9 0 0 1 0 12"/></svg>';
 }

 /* One shared set of Reading View preferences, also understood by the PDF viewer.
    Visual adjustments never modify the underlying lesson or answer states. */
 const readerKey='synergy-assist-reading-preferences-v1';
 const readerPrefs={font:'system',spacing:'normal',colour:'white',size:100,focus:false};
 let readingMode=false,readingFocus=null;
 const readerChoices={font:['system','arial','verdana','atkinson'],spacing:['normal','comfortable','wide'],colour:['white','cream','blue','green','dark']};
 try{
   const stored=JSON.parse(localStorage.getItem(readerKey)||'{}');
   for(const name of ['font','spacing','colour'])if(readerChoices[name].includes(stored[name]))readerPrefs[name]=stored[name];
   if(Number.isFinite(stored.size)&&stored.size>=90&&stored.size<=160)readerPrefs.size=Math.round(stored.size/10)*10;
   if(typeof stored.focus==='boolean')readerPrefs.focus=stored.focus;
    if(typeof stored.enabled==='boolean')readingMode=stored.enabled;
 }catch(_){}
 function saveReader(){
   try{const previous=JSON.parse(localStorage.getItem(readerKey)||'{}');
     localStorage.setItem(readerKey,JSON.stringify({...previous,...readerPrefs,enabled:readingMode}));}catch(_){}
 }
 function clearReadingFocus(){
   if(readingFocus)readingFocus.classList.remove('synergy-reading-focus-target');
   readingFocus=null;
 }
 function applyReader(){
   const body=document.body;if(!body)return;
   body.classList.toggle('synergy-reading-active',readingMode);
   body.classList.toggle('synergy-reading-zoom',readerPrefs.size!==100);
   body.dataset.synergyReaderFont=readerPrefs.font;
   body.dataset.synergyReaderSpacing=readerPrefs.spacing;
   body.dataset.synergyReaderColour=readerPrefs.colour;
   body.style.setProperty('--synergy-reader-zoom',String(readerPrefs.size/100));
   if(!readingMode||!readerPrefs.focus)clearReadingFocus();
 }
 function makeReaderControls(){
   const section=document.createElement('section');
   section.className='synergy-reading-controls synergy-voice-tool';
   section.setAttribute('aria-label','Visual reading tools');
   section.innerHTML=[
    '<div class="synergy-reading-heading">Reading View</div>',
    '<button type="button" data-reading-view aria-pressed="false">Turn Reading View on</button>',
    '<p class="synergy-voice-note">Adjusts only what is shown on screen. Lesson reveals, questions and navigation still work normally.</p>',
    '<div class="synergy-reading-heading">Text zoom</div>',
    '<div class="synergy-reading-inline"><button type="button" data-reading-smaller aria-label="Make page text smaller">A−</button>',
    '<output data-reading-size aria-live="polite">100%</output>',
    '<button type="button" data-reading-larger aria-label="Make page text bigger">A+</button></div>',
    '<label>Font<select data-reading-font><option value="system">System</option><option value="arial">Arial</option>',
    '<option value="verdana">Verdana</option><option value="atkinson">Atkinson Hyperlegible (if installed)</option></select></label>',
    '<label>Spacing<select data-reading-spacing><option value="normal">Normal</option>',
    '<option value="comfortable">Comfortable</option><option value="wide">Wide</option></select></label>',
    '<label>Page colour<select data-reading-colour><option value="white">White</option>',
    '<option value="cream">Warm cream</option><option value="blue">Soft blue</option>',
    '<option value="green">Soft green</option><option value="dark">Dark</option></select></label>',
    '<label class="synergy-reading-check"><input type="checkbox" data-reading-focus> Highlight selected paragraph</label>',
    '<button type="button" data-reading-reset>Reset reading settings</button>',
    '<p class="synergy-voice-note">Changing a reading setting turns Reading View on. Your choices stay in place on this device until you switch it off or reset them.</p>'
   ].join('');
   const find=name=>section.querySelector('[data-reading-'+name+']');
   const view=find('view'),size=find('size'),font=find('font'),
     spacing=find('spacing'),colour=find('colour'),focus=find('focus');
   function sync(){
     view.setAttribute('aria-pressed',String(readingMode));
     view.textContent=readingMode?'Turn Reading View off':'Turn Reading View on';
     size.textContent=readerPrefs.size+'%';
     font.value=readerPrefs.font;spacing.value=readerPrefs.spacing;
     colour.value=readerPrefs.colour;focus.checked=readerPrefs.focus;
     find('smaller').disabled=readerPrefs.size<=90;
     find('larger').disabled=readerPrefs.size>=160;
   }
   function change(activate=false){if(activate)readingMode=true;saveReader();applyReader();sync();}
   view.addEventListener('click',()=>{readingMode=!readingMode;change();});
   find('smaller').addEventListener('click',()=>{readerPrefs.size=Math.max(90,readerPrefs.size-10);change(true);});
   find('larger').addEventListener('click',()=>{readerPrefs.size=Math.min(160,readerPrefs.size+10);change(true);});
   font.addEventListener('change',()=>{readerPrefs.font=font.value;change(true);});
   spacing.addEventListener('change',()=>{readerPrefs.spacing=spacing.value;change(true);});
   colour.addEventListener('change',()=>{readerPrefs.colour=colour.value;change(true);});
   focus.addEventListener('change',()=>{readerPrefs.focus=focus.checked;change(true);});
   find('reset').addEventListener('click',()=>{
     Object.assign(readerPrefs,{font:'system',spacing:'normal',colour:'white',size:100,focus:false});
     readingMode=false;change();
   });
   document.addEventListener('click',event=>{
     if(!readingMode||!readerPrefs.focus||event.target.closest('.synergy-voice-tool,button,a,input,select,textarea'))return;
     const root=readingRoot(),target=event.target.closest('p,li,blockquote,h1,h2,h3');
     if(!root||!target||!root.contains(target)||!nodeVisible(target))return;
     clearReadingFocus();readingFocus=target;target.classList.add('synergy-reading-focus-target');
   });
   sync();applyReader();return section;
 }

 function mount(){
  if(location.pathname.endsWith('/print-viewer.html')||document.getElementById('synergyListenLaunch')||document.body.classList.contains('print-reader'))return;
  const launch=document.createElement('button');
  launch.id='synergyListenLaunch';launch.className='synergy-voice-launch synergy-voice-tool';
  launch.type='button';launch.title='Reading tools';launch.setAttribute('aria-label','Reading tools: listen, zoom and reading view');
  launch.setAttribute('aria-expanded','false');launch.setAttribute('aria-controls','synergyListenPanel');
  launch.innerHTML=icon()+'<span class="synergy-voice-launch-label" aria-hidden="true">Tools</span>';
  const panel=document.createElement('section');
  panel.id='synergyListenPanel';panel.className='synergy-voice-panel synergy-voice-tool';panel.hidden=true;
  panel.setAttribute('aria-label','Listen settings');
  const head=document.createElement('div');head.className='synergy-voice-head';
  const label=document.createElement('strong');label.textContent='Reading tools';
  const close=document.createElement('button');close.type='button';close.textContent='×';close.setAttribute('aria-label','Close Listen settings');
  head.append(label,close);
  const voiceLabel=document.createElement('label');voiceLabel.textContent='Listen · Voice';
  const voiceSelect=document.createElement('select');voiceSelect.setAttribute('aria-label','Reading voice');
  voiceLabel.append(voiceSelect);
  const speedLabel=document.createElement('label');speedLabel.textContent='Speed';
  const speedSelect=document.createElement('select');speedSelect.setAttribute('aria-label','Speaking speed');
  for(const n of [0.8,0.9,1,1.1,1.2]){
   const option=document.createElement('option');option.value=String(n);option.textContent=n.toFixed(1)+'×';speedSelect.append(option);
  }
  speedSelect.value=String(prefs.rate);speedLabel.append(speedSelect);
  const actions=document.createElement('div');actions.className='synergy-voice-actions';
  function button(text){const b=document.createElement('button');b.type='button';b.textContent=text;return b;}
  const start=button('Play page'),navRead=button('Read navigation'),pauseButton=button('Pause'),stopButton=button('Stop'),tryVoice=button('Preview voice');
  pauseButton.disabled=true;stopButton.disabled=true;
  if(!supported){start.disabled=true;navRead.disabled=true;tryVoice.disabled=true;voiceSelect.disabled=true;speedSelect.disabled=true;}
  actions.append(start,navRead,pauseButton,stopButton);
  const privacy=document.createElement('p');privacy.className='synergy-voice-note';
  privacy.textContent='On-device voices are preferred. Online voices may send spoken text to their provider.';
  const status=document.createElement('p');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  status.className='synergy-voice-status';status.textContent=supported?'Reads the currently visible page. Answers stay hidden until revealed.':'Speech is unavailable on this browser. Visual reading tools still work.';
  const readerControls=makeReaderControls();
  panel.append(head,readerControls,voiceLabel,speedLabel,tryVoice,actions,privacy,status);
  // The same central Reading Tools control sits in the header on
  // both Catch Up and J277/H446 Practice. No second launcher is created.
  const catchupHeader=document.querySelector('.catchup-top-inner');
  const practiceHeader=document.querySelector('header.practice-nav');
  const toolsHeader=catchupHeader||practiceHeader;
  if(toolsHeader){
   launch.classList.add('synergy-voice-header-launch');
   panel.classList.add('synergy-voice-header-panel');
   if(practiceHeader){
    launch.classList.add('synergy-voice-practice-launch');
    panel.classList.add('synergy-voice-practice-panel');
    const mark=practiceHeader.querySelector(':scope > .synergy-corner-mark');
    if(mark)practiceHeader.insertBefore(launch,mark);
    else practiceHeader.append(launch);
   }else catchupHeader.append(launch);
   document.body.append(panel);
  }else{
   document.body.append(launch,panel);
  }
  const notify=message=>{
   status.textContent=message;
   pauseButton.disabled=!active;
   stopButton.disabled=!active;
   pauseButton.textContent=paused?'Resume':'Pause';
  };
  const unsubscribe=subscribe(()=>populate(voiceSelect));
  voiceSelect.addEventListener('change',()=>{stop();selectVoice(voiceSelect.value);notify('Voice selected. Choose Preview or Play page.');});
  speedSelect.addEventListener('change',()=>{stop();setRate(speedSelect.value);notify('Speed changed.');});
  start.addEventListener('click',()=>{
   const chosen=String(window.getSelection?.()?.toString()||'').trim();
   if(chosen&&chosen.length<1501)return speak([chosen],notify);
   return speak(readVisibleContent(),notify);
  });
  navRead.addEventListener('click',()=>speak(navigationLabels(),notify));
  pauseButton.addEventListener('click',()=>togglePause());
  stopButton.addEventListener('click',stop);
  tryVoice.addEventListener('click',()=>preview(notify));
  function show(opened){panel.hidden=!opened;launch.setAttribute('aria-expanded',String(opened));if(opened)voiceSelect.focus();else launch.focus();}
  launch.addEventListener('click',()=>show(panel.hidden));
  close.addEventListener('click',()=>show(false));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)show(false);});
  document.addEventListener('pointerdown',e=>{
   if(!panel.hidden&&!panel.contains(e.target)&&e.target!==launch&&!launch.contains(e.target)){panel.hidden=true;launch.setAttribute('aria-expanded','false');}
  });
  document.addEventListener('click',e=>{
   if(e.target.closest('.phase-nav,.catchup-nav,.course-nav,.year-switch,.nav-tools,#advance,#previous,.control-btn,.back-btn,[data-page],.lesson-tile-open,.lesson-grid a,[data-tab]'))stop();
  },true);
  window.addEventListener('pagehide',()=>{stop();unsubscribe();});
 }
 const api={supported,populate,subscribe,selectVoice,setRate,getRate:()=>prefs.rate,apply,choice,stop,speak,togglePause,preview,mount,readVisibleContent};
 window.SynergyVoice=api;
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();