/* Shared opt-in Today / Next pilot; no lesson-local layout or scripts.
   Today's recap is read from the existing objectives, not a duplicate bank.
   Next topics are verified against the curriculum and next authored lesson. */
const pilots={
  '/lessons/j277/lesson-002/':{
    next:'Hexadecimal',
    detail:'Convert between binary, denary and hexadecimal.'
  },
  '/lessons/h446/lesson-046/':{
    next:'Two- and Three-dimensional Arrays in C#',
    detail:'Use rows, columns and layers to access array elements.'
  }
};
export function prepareExitSummary(){
  const key=location.pathname.replace(/index\.html$/i,'');
  const content=pilots[key];
  const page=document.getElementById('exit');
  const overview=document.getElementById('overview');
  if(!content||!page||!overview||page.dataset.exitSummary==='true')return false;
  const objectives=[...overview.querySelectorAll('.objectives li')].map(li=>{
    const text=li.textContent.trim().replace(/[;.]$/,'');
    return text?text[0].toUpperCase()+text.slice(1):'';
  }).filter(Boolean);
  if(objectives.length<1||objectives.length>5)return false;
  const make=(tag,cls,text)=>{
    const node=document.createElement(tag);
    if(cls)node.className=cls;
    if(text!==undefined)node.textContent=text;
    return node;
  };
  const panel=make('article','exit-summary-panel');
  const today=make('div','exit-summary-today');
  today.append(make('h2','','Today we learned…'));
  const list=make('ul','exit-summary-objectives');
  objectives.forEach(objective=>list.append(make('li','',objective+'.')));
  today.append(list);
  const next=make('div','exit-summary-next');
  const nextTitle=make('h3');
  nextTitle.append(make('mark','rhsc-shared-keyword',content.next));
  next.append(make('h2','','Next lesson…'),nextTitle,make('p','',content.detail));
  panel.append(today,next);
  // Load styling before replacing the legacy ticket. A failed request leaves it intact.
  const style=make('link');
  style.rel='stylesheet';
  style.href=new URL('./exit-summary.css?v=20261127-pilot1',import.meta.url).href;
  return new Promise(resolve=>{
    style.onload=()=>{
      page.replaceChildren(panel);
      page.classList.remove('exit-yesno','exit-yesno-generated');
      page.dataset.exitSummary='true';
      page.dataset.phaseTime='1 minute';
      resolve(true);
    };
    style.onerror=()=>{style.remove();resolve(false);};
    document.head.append(style);
  });
}
