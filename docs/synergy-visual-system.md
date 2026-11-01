# Synergy Assist visual system (2026-11-01)

## Purpose
One restrained, economical visual identity across the public Learning Hub, KS3,
J277 and H446 navigation and their shared lesson foundations. This is a styling
change, not a curriculum, navigation, assessment or interaction change.

## Single sources of truth
- `assets/synergy-tokens.css`: shared colour and surface tokens.
- `assets/synergy-shell.css`: hub-level appearance only; loaded **after**
  `hub-monochrome.css` on `index.html`, `ks3-computing.html`,
  `j277-hub.html` and `h446-hub.html`.
- `assets/synergy-print.css`: low-ink *browser printing* of hubs only.
- `assets/h446-lesson/lesson-base.css`: consumes tokens; shared by H446,
  rebuilt J277 and KS3 classroom lessons.
- `lessons/j277/lesson.css`: legacy GCSE slides consume neutral tokens.

## Visual rules
White surfaces, charcoal text, restrained Synergy green (#285348), fine green
header divider, low-ink print. Typography, spacing and navigation dimensions
are intentionally unchanged. Year and paper labels retain meaning independently
of colour. The real Synergy Assist logo belongs in the PDF-generator asset
pipeline, not as inaccessible CSS-generated text.

## Protected behaviour
Do not modify lesson phase signs (blue), classroom routine signs (green),
response signs (orange), yellow keyword emphasis, answer-reveal logic, Q/A
content, lesson sequencing, hub links or keyboard focus behaviour.

## Printable booklets
Existing PDFs do not read site CSS. The booklet generator must independently
consume the approved palette and authentic Synergy Assist logo. This change does
not rebuild or republish any PDF or alter student-facing Print links.

## Rollback
Remove the single `synergy-shell.css` link from each of the four hub
entrypoints to restore their prior navigation appearance. In shared lesson
base CSS, revert the eight mapped root variables and the `@import` line to
restore the previous classroom colours. No JavaScript rollback is required.

## Validation
Inspect desktop/mobile navigation and the Do Now, I Do, We Do, You Do and Exit
phases for one lesson from each key stage. Compare answer-reveal behaviour and
contrast. Print one hub page in monochrome; confirm no unnecessary large fills.
