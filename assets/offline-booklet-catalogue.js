/* Shared catalogue of actual published independent DRAFT PDFs.
   Hub actions appear only when the public catalogue was fetched successfully.
   No guessed filenames and no links to temporary GitHub Actions artifacts. */
(function(){
  'use strict';
  let catalogue=null;
  const ready=fetch('offline/booklets/catalogue.json',{cache:'no-store'})
    .then(function(response){
      if(!response.ok)throw new Error('No published booklet catalogue');
      return response.json();
    })
    .then(function(data){
      if(!data||data.schema_version!==1||!data.lessons)throw new Error('Invalid booklet catalogue');
      catalogue=data;
      window.dispatchEvent(new Event('offline-booklets-loaded'));
      return data;
    })
    .catch(function(){return null;});
  function get(course,number){
    if(!catalogue||!catalogue.lessons||!catalogue.lessons[course])return null;
    const entry=catalogue.lessons[course][String(Number(number))];
    if(!entry||!entry.print_bw||!entry.learn_colour)return null;
    const prefix='offline/booklets/';
    if(!entry.print_bw.startsWith(prefix)||!entry.learn_colour.startsWith(prefix))return null;
    return entry;
  }
  window.OfflineBooklets={get:get,ready:ready};
})();
