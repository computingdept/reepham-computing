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
  if(node.closest('[hidden],[inert],[aria-hidden="true"],template,script,style,noscript,nav,header,footer,aside,button,select,option,input,textarea,[role="navigation"],.synergy-voice-tool,[data-synergy-voice-ignore],.teacher-only,.answer-key,.mark-scheme,.model-answer,.catchup-feedback,.donow-review-answer,.review-answer,.j277-mark-scheme,.self-mark-answer'))return false;
  let p=node;
  while(p&&p.nodeType===1){
   const style=getComputedStyle(p);
   if(style.display==='none'||style.visibility==='hidden'||style.visibility==='collapse')return false;
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
  const elements=root.querySelectorAll('h1,h2,h3,h4,p,li,blockquote,pre,summary,.donow-question,.catchup-question');
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
 function icon(){
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path d="M15 9a5 5 0 0 1 0 6M18 6a9 9 0 0 1 0 12"/></svg>';
 }
 function mount(){
  if(!supported||location.pathname.endsWith('/print-viewer.html')||document.getElementById('synergyListenLaunch')||document.body.classList.contains('print-reader'))return;
  const launch=document.createElement('button');
  launch.id='synergyListenLaunch';launch.className='synergy-voice-launch synergy-voice-tool';
  launch.type='button';launch.title='Listen to this page';launch.setAttribute('aria-label','Listen to this page');
  launch.setAttribute('aria-expanded','false');launch.setAttribute('aria-controls','synergyListenPanel');
  launch.innerHTML=icon();
  const panel=document.createElement('section');
  panel.id='synergyListenPanel';panel.className='synergy-voice-panel synergy-voice-tool';panel.hidden=true;
  panel.setAttribute('aria-label','Listen settings');
  const head=document.createElement('div');head.className='synergy-voice-head';
  const label=document.createElement('strong');label.textContent='Listen';
  const close=document.createElement('button');close.type='button';close.textContent='×';close.setAttribute('aria-label','Close Listen settings');
  head.append(label,close);
  const voiceLabel=document.createElement('label');voiceLabel.textContent='Voice';
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
  const start=button('Play page'),pauseButton=button('Pause'),stopButton=button('Stop'),tryVoice=button('Preview voice');
  pauseButton.disabled=true;stopButton.disabled=true;
  actions.append(start,pauseButton,stopButton);
  const privacy=document.createElement('p');privacy.className='synergy-voice-note';
  privacy.textContent='On-device voices are preferred. Online voices may send spoken text to their provider.';
  const status=document.createElement('p');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  status.className='synergy-voice-status';status.textContent='Reads the currently visible page. Answers stay hidden until revealed.';
  panel.append(head,voiceLabel,speedLabel,tryVoice,actions,privacy,status);
  document.body.append(launch,panel);
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
   if(e.target.closest('.phase-nav,.catchup-nav,.course-nav,.year-switch,[data-page],.lesson-tile-open,.lesson-grid a,[data-tab]'))stop();
  },true);
  window.addEventListener('pagehide',()=>{stop();unsubscribe();});
 }
 const api={supported,populate,subscribe,selectVoice,setRate,getRate:()=>prefs.rate,apply,choice,stop,speak,togglePause,preview,mount,readVisibleContent};
 window.SynergyVoice=api;
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();