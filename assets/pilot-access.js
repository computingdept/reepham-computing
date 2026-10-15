/* Temporary staff NAVIGATION preview, not secure authentication.
   Source code and individual resource URLs remain publicly discoverable. */
(function(){
  'use strict';
  const key='rhscPilotStaffSession';
  const expected='RHSC-PILOT-26';
  let local=false;
  window.RHSCPilot={
    isStaff(){
      if(local)return true;
      try{return sessionStorage.getItem(key)==='yes'}catch(e){return false}
    },
    unlock(value){
      if(String(value||'').trim()!==expected)return false;
      local=true;
      try{sessionStorage.setItem(key,'yes')}catch(e){}
      return true;
    },
    lock(){
      local=false;
      try{sessionStorage.removeItem(key)}catch(e){}
    }
  };
})();