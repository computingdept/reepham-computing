/* Central Learning Hub lesson navigation: shared across KS3, J277 and H446.
   Course pages provide lesson numbers, titles, routes and specification colours.
   This file owns Options, hover/tap, keyboard dismissal and viewport placement. */
(function(){
  'use strict';
  const selector='.central-lesson[data-menu-open="true"]';
  function closeAll(except){
    document.querySelectorAll(selector).forEach(function(entry){
      if(entry===except)return;
      entry.dataset.menuOpen='false';
      const button=entry.querySelector('.lesson-options-toggle');
      if(button)button.setAttribute('aria-expanded','false');
    });
  }
  function position(entry){
    if(entry.dataset.menuOpen!=='true')return;
    const menu=entry.querySelector('.lesson-scenarios');
    if(!menu)return;
    menu.style.left='0px';
    menu.style.top='calc(100% + 4px)';
    menu.style.bottom='auto';
    const anchor=entry.getBoundingClientRect();
    const rect=menu.getBoundingClientRect();
    const x=Math.max(12,Math.min(anchor.left,window.innerWidth-12-rect.width));
    menu.style.left=Math.round(x-anchor.left)+'px';
    if(window.innerHeight-anchor.bottom<rect.height+12 && anchor.top>rect.height+12){
      menu.style.top='auto';
      menu.style.bottom='calc(100% + 4px)';
    }
  }
  function action(label,icon,href){
    const link=document.createElement('a');
    link.className='lesson-scenario-action';
    link.href=href;
    const symbol=document.createElement('span');
    symbol.className='scenario-symbol';
    symbol.setAttribute('aria-hidden','true');
    symbol.textContent=icon;
    const name=document.createElement('span');
    name.className='scenario-copy';
    name.textContent=label;
    link.append(symbol,name);
    return link;
  }
  function createTile(options){
    const o=options||{};
    const number=String(o.number||'');
    const title=String(o.title||'');
    const routes=[
      ['Open lesson','▣',o.openHref],
      ['Learn independently','◇',o.learnHref],
      ['Print lesson','▤',o.printHref]
    ].filter(function(item){return typeof item[2]==='string' && item[2].trim().length>0;});
    const entry=document.createElement('article');
    entry.className='lesson-entry lesson-choice central-lesson'+(o.openHref?'':' is-planned');
    entry.dataset.menuOpen='false';
    if(o.color)entry.style.setProperty('--spec-colour',o.color);
    const tile=document.createElement(o.openHref?'a':'div');
    tile.className='lesson-tile-open'+(o.openHref?'':' lesson-tile-unavailable');
    if(o.openHref)tile.href=o.openHref;
    tile.setAttribute('aria-label',(o.openHref?'Open lesson ':'Lesson ')+number+(title?': '+title:'')+(o.openHref?'':' — not published'));
    const num=document.createElement('span');
    num.className='lesson-tile-number';
    num.textContent=number;
    const shortTitle=document.createElement('span');
    shortTitle.className='lesson-tile-title';
    shortTitle.textContent=title;
    shortTitle.title=title;
    tile.append(num,shortTitle);
    entry.append(tile);
    if(!routes.length)return entry;
    const button=document.createElement('button');
    button.type='button';
    button.className='lesson-options-toggle';
    button.textContent='Options';
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-label','Options for lesson '+number);
    const menu=document.createElement('div');
    menu.className='lesson-scenarios';
    menu.setAttribute('role','group');
    menu.setAttribute('aria-label','Ways to use lesson '+number);
    const menuId='hub-options-'+Math.random().toString(36).slice(2,10);
    menu.id=menuId;
    button.setAttribute('aria-controls',menuId);
    routes.forEach(function(item){menu.append(action(item[0],item[1],item[2]));});
    function setOpen(state){
      if(state)closeAll(entry);
      entry.dataset.menuOpen=String(state);
      button.setAttribute('aria-expanded',String(state));
      if(state)requestAnimationFrame(function(){position(entry);});
    }
    button.addEventListener('click',function(event){
      event.stopPropagation();
      setOpen(entry.dataset.menuOpen!=='true');
    });
    button.addEventListener('pointerenter',function(event){
      if(event.pointerType==='mouse')setOpen(true);
    });
    entry.addEventListener('pointerleave',function(event){
      if(event.pointerType==='mouse')setOpen(false);
    });
    entry.addEventListener('focusout',function(event){
      if(!entry.contains(event.relatedTarget))setOpen(false);
    });
    entry.append(button,menu);
    return entry;
  }
  document.addEventListener('pointerdown',function(event){
    if(!event.target.closest('.central-lesson'))closeAll();
  });
  document.addEventListener('keydown',function(event){
    if(event.key==='Escape'){
      const current=document.querySelector(selector);
      if(current){
        const button=current.querySelector('.lesson-options-toggle');
        closeAll();
        if(button)button.focus({preventScroll:true});
      }
    }
  });
  window.addEventListener('resize',function(){
    document.querySelectorAll(selector).forEach(position);
  });
  window.LearningHubNavigation={createTile:createTile,closeAll:closeAll};
})();
