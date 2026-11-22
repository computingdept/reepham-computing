# Year 13 H446 Lesson 223 — retired You Do questions

Archived from `lessons/h446/lesson-223/index.html` on 22 November 2026 before the source-linked 2025 exam practice replaced them.

- Original lesson: [Lesson 223](https://rhsccs.org/lessons/h446/lesson-223/index.html#you-do)
- Previous lesson source GitHub blob SHA: `c6e846c3b6c93bc57c8fb3665b5ac5ac68b1d5f9`
- Question count: 3 (Foundation, Core, Stretch).
- This archival file is **not imported by the live lesson** and must not be used by a student scoring/assignment runtime.

## Exact original question and answer HTML

```html
<article class="youdo-question"><div class="youdo-question-prompt"><span class="phase-tag">Foundation · 3 marks · QUESTION 1 OF 3</span><h2>For 3→5→8, identify head, 5.Next.Value and 8.Next.</h2></div><div class="youdo-solution" hidden><strong>WORKED ANSWER</strong><p>[3] Head is the node containing 3 [1]; 5.Next.Value is 8 [1]; 8.Next is null [1].</p></div></article><article class="youdo-question"><div class="youdo-question-prompt"><span class="phase-tag">Core · 5 marks · QUESTION 2 OF 3</span><h2>Write two C# statements to insert a node with value 12 after node8 in 8→20→30. Give the new traversal.</h2></div><div class="youdo-solution" hidden><strong>WORKED ANSWER</strong><p>[5] Node inserted = new(12,node8.Next); [2]; node8.Next = inserted; [1]; 8→12→20→30 [2].</p></div></article><article class="youdo-question"><div class="youdo-question-prompt"><span class="phase-tag">Stretch · 6 marks · QUESTION 3 OF 3</span><h2>Describe how to delete node 20 from 10→20→30 if you hold a reference to node10. Explain the complexity of reaching the deletion point and changing the link.</h2></div><div class="youdo-solution" hidden><strong>WORKED ANSWER</strong><p>[6] Set node10.Next=node10.Next!.Next [2] to bypass 20 [1], leaving 10→30 [1]; finding node10 from head may take O(n) [1], but changing the link once identified is O(1) [1].</p></div></article>
```
