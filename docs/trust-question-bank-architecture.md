# Synergy Learning Hub — centrally mapped question banks

**Architecture direction, not a live You Do migration.** Approved in principle
for KS3 Computing, J277 GCSE and H446 A Level, with an extensible design for
future subjects and schools. Teachers continue to own and review curriculum
content. A shared platform supplies the structure and presentation.

## One curriculum map, purpose-specific banks

| Layer | Shared across the Trust | Owned by subject/course |
| --- | --- | --- |
| Curriculum map | Stable concept/skill IDs, prerequisites, lesson sequence, review status | OCR spec points or KS3 subject objectives and actual teaching order |
| Do Now bank | Four retrieval slots, answer types, source validation, reveal behaviour | Prior-taught statements, distractors, explanations, challenge content |
| You Do bank | Task metadata, response/marking contract, difficulty, print/catch-up availability | Independent activities, code, diagrams, worked methods, assessment criteria |
| Delivery | Classroom, phone, Catch Up, accessible reading, Print | Teacher-approved adaptations for age, task and subject |

**Do Now is not You Do.** Retrieval questions are selected using the taught
sequence. Independent You Do tasks practise today's *already explained* new
learning. Both map to the same curriculum concepts, but their pedagogical
purpose and answer/reveal behaviour are different. We should not indiscriminately
reuse a You Do question as a Do Now before the knowledge has been taught.

## Minimum fields for each future You Do task

- A stable question/activity ID and course/subject/lesson mapping.
- Specification or KS3 objective, skill and taught prerequisite references.
- Task type (programming, trace, calculation, explanation, diagram, multiple
  choice, extended exam response or other subject-approved type).
- Difficulty and estimated working time appropriate to the learner.
- Pupil prompt, necessary resources, response format, marks/rubric and a model
  answer or verified marking guidance. Code tasks include runnable language and
  expected outputs where appropriate.
- Scaffolding and independently attempted version, with separate reveal content.
- Provenance, teacher approval and version; intended classroom, Catch Up and
  printable availability. No unavailable Print links.

**J277-specific:** preserve the existing Code First mini-whiteboard sequence
(Predict → Write → Test → Improve) at the start of You Do. **H446-specific:**
allow substantial C# and pseudocode, OCR symbol notation and multi-stage exam
answers. **KS3-specific:** keep accessible language and outputs appropriate to
the actual taught lesson. Other Trust subjects must be able to define suitable
task types without imitating a Computing coding task.

## Sequencing and safe rollout

1. Complete the shared Do Now contract and the read-only source inventory first.
2. Map each published course's curriculum sequence and existing You Do tasks
   before deciding how to represent their different activity types centrally.
3. Pilot one You Do task family per course using a single content schema and
   subject-configurable renderer; audit classroom, mobile and print outcomes.
4. When approved, let lesson pages reference stable task IDs. Keep answers in
   the reviewed bank and prevent an unreviewed change from reaching pupils.
5. Invite subject AI leads to test the model before wider Trust rollout; allow
   documented pedagogical exceptions rather than imposing one task style.

The active Do Now standard is described separately in
[do-now-central-standard.md](do-now-central-standard.md). Building the initial
Do Now bank does **not** silently rewrite or publish any You Do material.
