# Archived H446 Year 13 Lesson 311 original You Do
Original GitHub blob SHA e9ceb1985ead97ebeed0e6a234245172c6330811

```html
<section id="you-do" class="page phase-youdo" data-phase-time="18 minutes" data-window-size="3"><div class="youdo-deck"><div class="youdo-questions"><article class="youdo-question"><div class="youdo-question-prompt"><span class="phase-tag">FOUNDATION · QUESTION 1 OF 3</span><h2>Trace CountRuns for [3,3,4,4,3,5,5]. State where runs increment. [6]</h2></div><div class="youdo-solution" hidden><strong>MARK SCHEME / WORKED ANSWER</strong><p>Start runs1 [1]; change to4 makes2 [2]; change to3 makes3 [1]; change to5 makes4 [1]; return4 [1].</p></div></article><article class="youdo-question"><div class="youdo-question-prompt"><span class="phase-tag">CORE · QUESTION 2 OF 3</span><h2>Write a valid C# CountRuns(int[] a) returning runs and handling empty input. [8]</h2></div><div class="youdo-solution" hidden><strong>MARK SCHEME / WORKED ANSWER</strong><p>Mark scheme [8]: an int-returning method accepting int[] [1]; detect an empty array and return 0 [2]; initialise the run count to 1 [1]; loop from index 1 [1]; compare neighbouring values [1]; increment on change [1]; return the result [1]. Equivalent correct C# earns the same marks.</p><pre class="h13-code"><code>static int CountRuns(int[] a)
{
    if (a.Length == 0) return 0;
    int runs = 1;
    for (int i = 1; i &lt; a.Length; i++)
    {
        if (a[i] != a[i - 1]) runs++;
    }
    return runs;
}</code></pre></div></article><article class="youdo-question"><div class="youdo-question-prompt"><span class="phase-tag">CHALLENGE · QUESTION 3 OF 3</span><h2>For [1,2,1], compare runs and distinct counts, and assess time/extra-space complexity of CountRuns. [6]</h2></div><div class="youdo-solution" hidden><strong>MARK SCHEME / WORKED ANSWER</strong><p>Runs3 [1], distinct2 [1]; adjacency explains difference [1]; O(n) time [2]; O(1) auxiliary storage [1].</p></div></article></div></div></section>
```