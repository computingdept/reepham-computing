const S = [{"p":1,"t":4,"s":"DO NOW","fixed":true},{"p":1,"t":2,"s":"ANSWERS","fixed":true},{"p":1,"t":2,"s":"OBJECTIVES","fixed":true},{"p":1,"t":2,"s":"START"},{"p":1,"t":4,"s":"1.1"},{"p":1,"t":4,"s":"1.2"},{"p":1,"t":5,"s":"1.2"},{"p":1,"t":3,"s":"1.2"},{"p":1,"t":5,"s":"1.3"},{"p":1,"t":4,"s":"1.3"},{"p":1,"t":3,"s":"1.4"},{"p":1,"t":5,"s":"1.5"},{"p":1,"t":4,"s":"1.5"},{"p":1,"t":5,"s":"1.6"},{"p":1,"t":4,"s":"1.6"},{"p":1,"t":5,"s":"MAP 1"},{"p":2,"t":1,"s":"START"},{"p":2,"t":5,"s":"2.1"},{"p":2,"t":6,"s":"2.1"},{"p":2,"t":6,"s":"2.1"},{"p":2,"t":5,"s":"2.2"},{"p":2,"t":4,"s":"2.2"},{"p":2,"t":6,"s":"2.2"},{"p":2,"t":6,"s":"2.2"},{"p":2,"t":6,"s":"2.3"},{"p":2,"t":3,"s":"2.4"},{"p":2,"t":3,"s":"2.5"},{"p":2,"t":4,"s":"MAP 2"},{"p":2,"t":2,"s":"VOCAB","fixed":true},{"p":2,"t":2,"s":"EXIT","fixed":true}];
let slide=0,phase=0;
function fixed(i=slide){return Boolean(S[i]&&S[i].fixed)}
function setSlide(n){if(n<0||n>=S.length)return;slide=n;phase=0;paint();}
function setPhase(n){if(fixed()||n<0||n>2)return;phase=n;paint();}
function paint(){
 const all=document.querySelectorAll('.slide'); all.forEach((el,j)=>el.classList.toggle('active',j===slide));
 const cur=all[slide]; if(!cur)return;
 cur.querySelectorAll('.phasetab').forEach((el,j)=>{el.classList.toggle('active',j===phase);el.setAttribute('aria-selected',String(j===phase));});
 cur.querySelectorAll('.phase').forEach((el,j)=>el.classList.toggle('active',j===phase));
 document.querySelectorAll('.navitem').forEach((el,j)=>{el.classList.toggle('active',j===slide);el.classList.toggle('purple',j===slide&&S[slide].p===2)});
 const p=S[slide].p,pc=document.getElementById('paperchip');pc.className='chip '+(p===1?'blue':'purple');pc.textContent='PAPER '+p;
 const st=document.getElementById('stagechip');st.className='chip '+['green','orange','green'][phase];st.textContent=fixed()?({ 'DO NOW':'DO NOW · RETRIEVAL','ANSWERS':'DO NOW · ANSWERS','OBJECTIVES':'OBJECTIVES','VOCAB':'KEY VOCABULARY','EXIT':'EXIT TICKET'}[S[slide].s]||S[slide].s):['I DO · EXPLAIN','WE DO · WHITEBOARDS','YOU DO · A3 MAP'][phase];
 const m=S.slice(0,slide).reduce((a,b)=>a+b.t,0);
 document.getElementById('clocklabel').textContent=m+'–'+(m+S[slide].t)+' / 120 min';
 document.getElementById('progressbar').style.width=(100*(slide+(fixed()?1:(phase+1)/3))/S.length)+'%';
 document.getElementById('where').textContent=(slide+1)+' / '+S.length+' · '+S[slide].s;
 document.getElementById('prev').disabled=(slide===0&&phase===0);
 document.getElementById('next').disabled=(slide===S.length-1);
 const x=document.querySelector('.navitem.active');if(x && window.innerWidth>730)x.scrollIntoView({block:'nearest'});
 window.scrollTo({top:0,behavior:'instant'});
}
function next(){if(!fixed()&&phase<2)setPhase(phase+1);else setSlide(slide+1)}
function prev(){if(!fixed()&&phase>0)setPhase(phase-1);else if(slide>0){slide--;phase=fixed()?0:2;paint()}}
function swapVisual(b,n){const v=b.closest('.visual');v.querySelectorAll('.visfigure').forEach((e,i)=>e.hidden=i!==n);v.querySelectorAll('.vis-switch button').forEach((e,i)=>e.classList.toggle('chosen',i===n));}
function toggleAnswer(b){const x=b.nextElementSibling;const show=x.hasAttribute('hidden');if(show)x.removeAttribute('hidden');else x.setAttribute('hidden','');b.textContent=show?'Hide answer':'Answer';b.setAttribute('aria-expanded',String(show));}
function printMaps(){document.body.classList.add('print-maps');window.setTimeout(()=>window.print(),150)}
window.addEventListener('afterprint',()=>document.body.classList.remove('print-maps'));
function toggleMenu(){document.body.classList.toggle('menuopen')}
function closeMenu(){document.body.classList.remove('menuopen')}
window.addEventListener('keydown',e=>{if(e.target.closest('textarea,input,button,select'))return;if(e.key==='ArrowRight'){e.preventDefault();next()}else if(e.key==='ArrowLeft'){e.preventDefault();prev()}else if(e.key==='Escape')closeMenu()});
paint();
