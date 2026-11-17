## Purpose

Describe the change and the pupils or teachers it affects.

## Allowed lesson-phase changes

If this PR changes classroom lesson HTML, explicitly name the affected phases.
Use one line starting `Phase-Scope:` (no bullet prefix). Examples:

`Phase-Scope: h446/219=i-do,we-do`

`Phase-Scope: j277/021=do-now; shared/h446=engine`

Write the actual line below, with your lesson numbers and intended phases. The
automated check will reject changes to undeclared phases. For a new lesson use
`new-lesson`; for navigation, metadata or stylesheet links use `shell`.

## Classroom checks

- [ ] Do Now retrieval and separate answers are unchanged unless authorised.
- [ ] I Do / We Do reveals still work.
- [ ] You Do and Exit Ticket are intact.
- [ ] Projector layout and phone navigation have been checked where affected.
