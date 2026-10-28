/* Shared independent-learning navigation.
   Enhances existing printable lessons without changing their source content.
   The print spreads remain untouched and continue to make the A3 booklet. */
(function(){
  'use strict';
  function init(){
    const toolbar=document.querySelector('.screen-toolbar');
    const viewer=document.getElementById('viewer');
    const instructions=document.querySelector('.instructions');
    if(!toolbar||!viewer||!instructions)return;
    const pages=[...viewer.querySelectorAll(':scope > .page')];
    if(!pages.length)return;

    const params=new URLSearchParams(location.search);
    const lessonNumber=(location.pathname.match(/lesson-(\d{3})/)||[])[1]||'';
    const topic=(instructions.querySelector('h1')?.textContent||document.title)
      .replace(/\s*[—–-]\s*independent lesson\s*$/i,'').trim();
    const year=Number((pages[0].querySelector('header')?.textContent||'').match(/YEAR\s*(10|11)/i)?.[1]||'10');
    const hub='../../../j277-hub.html?year='+year+'#lessons';
    const labels=pages.length===4?['Start','Learn','Practise','Check & improve']
      :pages.map((_,i)=>'Page '+(i+1));

    const element=function(tag,cls,text){
      const el=document.createElement(tag);
      if(cls)el.className=cls;
      if(text!==undefined)el.textContent=text;
      return el;
    };

    // Reuse the original monochrome/colour links; never duplicate controls.
    const bw=toolbar.querySelector('#bw-option');
    const colour=toolbar.querySelector('#colour-option');
    const back=element('a','independent-back','← Lessons');
    back.href=hub;
    const title=element('strong','independent-name',
      (lessonNumber?lessonNumber+' · ':'')+topic);
    const printButton=element('button','independent-print','Print / save');
    printButton.type='button';
    printButton.addEventListener('click',()=>window.print());

    toolbar.replaceChildren(back,title);
    if(bw&&colour){
      const display=element('details','independent-display');
      display.append(element('summary','', 'Display'));
      const choices=element('div','independent-display-choices');
      bw.textContent='Black & white';
      colour.textContent='Colour';
      choices.append(bw,colour);
      display.append(choices);
      toolbar.append(display);
    }
    toolbar.append(printButton);
    toolbar.setAttribute('aria-label','Independent learning navigation');

    // Printing and usage guidance is available, not a permanent large banner.
    const help=element('details','independent-guidance');
    help.append(element('summary','','How to use / print the booklet'));
    instructions.before(help);
    help.append(instructions);

    const progress=element('nav','independent-progress');
    progress.setAttribute('aria-label','Independent learning steps');
    const summary=element('span','independent-step-count');
    const list=element('ol','independent-step-list');
    const items=labels.map(name=>{
      const li=element('li','independent-step',name);
      list.append(li);
      return li;
    });
    progress.append(summary,list);
    viewer.before(progress);

    const footer=element('nav','independent-stepnav');
    footer.setAttribute('aria-label','Move through independent learning');
    const previous=element('button','independent-previous','← Previous');
    const indicator=element('span','independent-page-indicator');
    const next=element('button','independent-next','Next →');
    previous.type=next.type='button';
    footer.append(previous,indicator,next);
    viewer.after(footer);

    // Enhancement is opt-in: if JS is unavailable all four original
    // printable pages and the original print toolbar remain accessible.
    document.body.classList.add('independent-paged');
    let index=0;
    function show(i,focus){
      index=Math.max(0,Math.min(pages.length-1,i));
      pages.forEach((page,n)=>{
        page.hidden=n!==index;
        page.setAttribute('aria-hidden',String(n!==index));
      });
      summary.textContent='Step '+(index+1)+' of '+pages.length;
      indicator.textContent=(index+1)+' / '+pages.length;
      previous.disabled=index===0;
      next.textContent=index===pages.length-1?'Finish':'Next →';
      items.forEach((item,n)=>{
        item.classList.toggle('is-current',n===index);
        if(n===index)item.setAttribute('aria-current','step');
        else item.removeAttribute('aria-current');
      });
      if(focus){
        progress.scrollIntoView({block:'start'});
        // Move focus with the step so keyboard and screen-reader users
        // know the new content is ready.
        const heading=pages[index].querySelector('h2,h3')||pages[index];
        heading.tabIndex=-1;
        heading.focus({preventScroll:true});
      }
    }
    previous.addEventListener('click',()=>show(index-1,true));
    next.addEventListener('click',()=>{
      if(index===pages.length-1)location.assign(hub);
      else show(index+1,true);
    });
    show(0,false);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
