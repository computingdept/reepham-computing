/* J277 My Work pilot: display-only independent-study hours, not secure authentication. */
(function () {
  'use strict';
  const clock = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  });
  function ukMinutes(now = new Date()) {
    const parts = clock.formatToParts(now);
    const hour = Number(parts.find(part => part.type === 'hour').value);
    const minute = Number(parts.find(part => part.type === 'minute').value);
    return hour * 60 + minute;
  }
  function isOpen(now = new Date()) {
    const minute = ukMinutes(now);
    return (minute >= 750 && minute < 800) || minute >= 930;
  }
  window.RHSIndependentWorkHours = Object.freeze({
    isOpen,
    label: '12:30–13:20 and 15:30–midnight (UK time)'
  });
})();
