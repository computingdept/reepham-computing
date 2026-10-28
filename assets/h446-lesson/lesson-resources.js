/* Shared lesson-resource links. Opt-in by explicit published booklet route.
   Never replace classroom lesson phases or create links to missing files. */
(function(){
  'use strict';
  const match=location.pathname.match(/\/lessons\/(j277|h446)\/lesson-(\d{3})\/(?:index\.html)?$/i);
  if(!match)return;
  const routeKey=match[1].toLowerCase()+'-'+match[2];
  const booklets={
    'j277-004':'independent.html?version=bw'
  };
  const href=booklets[routeKey];
  if(!href)return;
  const back=document.querySelector('.navwrap .course-back');
  if(!back||document.getElementById('lesson-print-resource'))return;
  const link=document.createElement('a');
  link.id='lesson-print-resource';
  link.className='lesson-resource-print';
  link.href=href;
  link.setAttribute('aria-label','Print lesson — open the printable booklet');
  link.title='Print lesson — choose black and white or colour, then print or save as PDF';
  const icon=document.createElementNS('http://www.w3.org/2000/svg','svg');
  icon.setAttribute('viewBox','0 0 24 24');
  icon.setAttribute('width','18');
  icon.setAttribute('height','18');
  icon.setAttribute('fill','none');
  icon.setAttribute('stroke','currentColor');
  icon.setAttribute('stroke-width','1.8');
  icon.setAttribute('stroke-linejoin','round');
  icon.setAttribute('aria-hidden','true');
  icon.innerHTML='<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 15h12v6H6zM18 12h.01"/>';
  const label=document.createElement('span');
  label.textContent='Print lesson';
  link.append(icon,label);
  back.after(link);
  function place(){
    const status=document.getElementById('mobile-lesson-status');
    if(window.matchMedia('(max-width:700px)').matches&&status){
      status.append(link);
    }else if(back.nextElementSibling!==link){
      back.after(link);
    }
  }
  place();
  const media=window.matchMedia('(max-width:700px)');
  if(media.addEventListener)media.addEventListener('change',place);
  else if(media.addListener)media.addListener(place);
  const sheet=document.createElement('link');
  sheet.rel='stylesheet';
  sheet.href='../../../assets/h446-lesson/lesson-resources.css?v=20261028-lesson004';
  document.head.appendChild(sheet);
})();