# rhsccs.org traffic analytics — activation checklist

The learning hub has a central analytics loader in `assets/site-nav.js`.
The module `assets/site-analytics.js` is intentionally disabled until a
site-specific Cloudflare Web Analytics **beacon token** is supplied.

1. Confirm the school/trust's privacy review is complete.
2. In [Cloudflare Web Analytics](https://dash.cloudflare.com/?to=/:account/analytics/web-analytics), select **Add a site**, register `rhsccs.org`, then open **Manage site** and copy its JavaScript beacon token. The exact Cloudflare account remains private.
3. In `assets/site-analytics.js`, set `SITE_TOKEN` to the token from the beacon snippet. This is a public site identifier; **never** paste a Cloudflare API token, password, or recovery code into the repository.
4. GitHub Pages deploys the updated file. Visit the homepage and a J277/H446 lesson, then check the Cloudflare Web Analytics dashboard. The dashboard is not embedded on the pupil site.
5. To disable future browser tracking, set `SITE_TOKEN` back to an empty string. Existing Cloudflare dashboard history follows Cloudflare's retention rules.

Tracking starts after activation; existing historic visits cannot be backfilled.
The loader activates only for `rhsccs.org` or `www.rhsccs.org`, and avoids
inserting a duplicate beacon. No custom events or student identifiers are added.

The shared navigation script is loaded by the homepage, J277/H446 hubs,
KS3 Computing hub, regular J277/H446 lessons, and revision practice pages.
The binary classroom clock and PDF print viewer also load the central module.
Other independent standalone pages may need separate coverage checks.
