# RHSC Computing Hub

GitHub Pages homepage for the Computing Department at **Reepham High School & College (RHSC)**.

## Included

- RHSC-style utility bar with Staff Area, school-site search, Facebook and Instagram.(update)
- Responsive Computing navigation.
- **Choose your pathway** cards: six across on wide screens, three across on tablets, swipeable on phones.
- KS3 Computing, GCSE OCR J277, ITJ836 and A Level OCR H446.
- Direct links to the existing J277 and H446 lesson hubs.
- Accessible keyboard focus, reduced-motion support and a mobile menu.

## GitHub Pages

Publish from **main** and **/ (root)** in Settings → Pages.

Once Pages is enabled, commits to `main` will update the website automatically.

## Structure

- `index.html` — homepage
- `assets/site.css` — responsive desktop/mobile styling
- `assets/site.js` — mobile navigation and section highlighting
- The Computing Department logo is embedded in `index.html` for a self-contained deploy.

## Current lesson hubs

- GCSE OCR J277: https://computingdept.github.io/reepham-j277-lesson/
- A Level OCR H446: https://computingdept.github.io/reepham-h446-lessons/

Year 7 and Year 8 have separate hubs with 35 lesson placeholders each (L01–L35):

- [Year 7 Hub](year-7-hub.html)
- [Year 8 Hub](year-8-hub.html)

Year 9 and ITJ836 remain **Lessons coming soon**.

## Project requirement: mobile friendly

All future pages and updates must work well on mobile, especially Apple iPhones and Safari. Keep layouts compact, use the shared RHSC stylesheet and branding, avoid horizontal page overflow, support browser zoom, and provide touch targets of at least 44px. Check phone-width layouts and keyboard focus when changing navigation or layout.

Every lesson hub must include a visible **Back to Computing** link to `index.html#pathways`; do not rely on the browser Back button or the mobile menu. Keep lesson content separate for each year group even where lesson numbers match.

