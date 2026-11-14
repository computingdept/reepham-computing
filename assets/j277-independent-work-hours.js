/* J277 My Work pilot: browser-only display gate, not secure authentication.
   Reepham High School 2026–27 term dates:
   https://www.reephamhigh.org.uk/for-parents-carers/term-dates/
   Update 2027–28 holidays once the school publishes the next calendar. */
(function () {
  'use strict';
  const timeFormat = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
  });
  const dateFormat = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', year: 'numeric', month: '2-digit',
    day: '2-digit', weekday: 'short'
  });
  // Both dates are inclusive. INSET days and the May bank holiday are pupil-free.
  const pupilHolidays = Object.freeze([
    ['2026-09-01', '2026-09-02'],
    ['2026-10-23', '2026-10-30'],
    ['2026-12-19', '2027-01-05'],
    ['2027-02-15', '2027-02-19'],
    ['2027-03-26', '2027-04-11'],
    ['2027-05-03', '2027-05-03'],
    ['2027-05-31', '2027-06-04'],
    ['2027-07-01', '2027-07-02'],
    ['2027-07-21', '2027-08-31']
  ]);
  const value = (parts, name) => parts.find(part => part.type === name).value;
  function isNonSchoolDay(now = new Date()) {
    const parts = dateFormat.formatToParts(now);
    const weekday = value(parts, 'weekday');
    if (weekday === 'Sat' || weekday === 'Sun') return true;
    const date = [value(parts, 'year'), value(parts, 'month'), value(parts, 'day')].join('-');
    return pupilHolidays.some(([start, end]) => date >= start && date <= end);
  }
  function isOpen(now = new Date()) {
    if (isNonSchoolDay(now)) return true;
    const parts = timeFormat.formatToParts(now);
    const minute = Number(value(parts, 'hour')) * 60 + Number(value(parts, 'minute'));
    return (minute >= 750 && minute < 800) || minute >= 930;
  }
  window.RHSIndependentWorkHours = Object.freeze({
    isOpen,
    isNonSchoolDay,
    label: 'School days: 12:30–13:20 and 15:30–midnight. Weekends and school holidays: all day (UK time).'
  });
})();
