/* RHS Computing Learning Hub — Cloudflare Web Analytics.
   This module is intentionally inactive until the school has created its
   Cloudflare Web Analytics site and completed any required privacy review.
   Set SITE_TOKEN to the site's *public web analytics beacon token* (never
   a Cloudflare API token or account credential).
   No visible UI, custom events, identity fields, or query-string capture.
*/
(function () {
  'use strict';
  const SITE_TOKEN = '';
  const hosts = ['rhsccs.org', 'www.rhsccs.org'];
  if (!hosts.includes(window.location.hostname)) return;
  if (!/^[a-f0-9]{32}$/i.test(SITE_TOKEN.replace(/-/g, ''))) return;
  if (document.querySelector('script[src*="static.cloudflareinsights.com/beacon.min.js"]')) return;

  const beacon = document.createElement('script');
  beacon.defer = true;
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.setAttribute('data-cf-beacon', JSON.stringify({ token: SITE_TOKEN }));
  beacon.setAttribute('data-rhsc-analytics', 'cloudflare');
  document.head.appendChild(beacon);
})();
