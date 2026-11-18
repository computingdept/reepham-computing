# One-day My Work pilot — Thursday 19 November 2026

**Do not run the activation script before Thursday.** This is a one-off D1
workaround for the existing 25-activities-per-assignment API limit. The Worker
code and existing pupil attempts are untouched.

| Whole-year assignment | Specification | Skills | Revision MCQs | Total |
| --- | --- | ---: | ---: | ---: |
| Pilot Year 11 | OCR J277 | 25 | 70 | **95** |
| Pilot Year 12 | OCR H446 | 16 | 157 | **173** |
| Pilot Year 13 | OCR H446 | 16 | 157 | **173** |

## Before the pilot — Wednesday 18 November

1. Confirm that the latest student website version is published. The pupil
   address is `https://rhsccs.org/my-work-login-pilot.html`.
2. Open **Cloudflare → Workers & Pages → D1 SQL database → Console** for the
   **production My Work** database. Do not choose the Worker service or a
   separate test database.
3. Paste/run `preflight.sql` and check the required tables exist:
   `practice_codes`, `assignments`, `attempts`, and `login_profiles`.
   The `work_sets`/`work_set_items` tables may already exist, or the stage
   queries will create them.
4. Paste/run `stage-y11.sql`, then `stage-y12.sql`, then `stage-y13.sql`,
   **one file at a time**. Read the output of each file: it must show exactly
   95, 173, 173 activities and **active = 0**.
5. **Do not paste `activate.sql` yet.** Inactive work sets do not appear in
   pupils' My Work.

## Pilot day — Thursday 19 November

1. In the **same** D1 database Console, paste/run `activate.sql` **after
   midnight UK time**, ideally before the first lesson.
2. It only activates on 19 November 2026, and should return the three sets
   with **active = 1** and activity counts 95/173/173.
3. Ask Y11, Y12 and Y13 pupils to sign in at
   `https://rhsccs.org/my-work-login-pilot.html` using their existing
   anonymous username and 4-digit PIN. Under their named pilot assignment,
   they see separate **Skills** and **Revision MCQs** lists.
4. Suggest one Skill and one 10-question revision topic each before they
   explore more. Completed assigned quizzes save an automatically marked score.
   H446 Conversion Grid and its primitive-data-types quiz also record checked
   answers as they go. The other 15 H446 Skills are presently link-only;
   opening them cannot yet produce a My Work score. This trial will show where
   the gaps are.
5. Ask three quick feedback questions in class: **Can you find a topic? Can
   you complete it? What is confusing or missing?** No feedback form is
   installed in the D1 system; record verbal/teacher feedback separately.

## How the one-day cutoff works

The current Worker has no single-day classwork option: it offers **seven days
from `created_at`**. To end the pilot automatically at the end of Thursday,
the staged inactive sets have `created_at = 2026-11-12 23:59:59`. After you
activate them on Thursday, the Worker calculates the seven-day end as
`2026-11-19 23:59:59 UTC` (= UK GMT that evening). This deliberate technical
backdate is safe only as a short-lived, known-date workaround. The `due_date`
field is an identifier here, **not** the enforcement mechanism.

This does not delete existing assignments, sign-ins, or attempts. Existing
activity scores can appear on the student page; `results.sql` reports only
**attempts actually recorded on Thursday 19 November**.

## Closing and evaluating

- Automatic: the pilot stops being available at **23:59:59 UK time on
  Thursday 19 November**; no SQL is needed.
- Optional emergency stop: run `close-early.sql` in the same D1 Console.
- The next day: run `results.sql` to see anonymous usernames, completed quiz
  attempts and topic-level uptake. Preserve the report for the evaluation.

If any stage count differs or another assignment conflicts, **do not
activate**. The scripts are idempotent and additive, but they cannot resolve
unknown existing assignments or a misconfigured production database safely.
