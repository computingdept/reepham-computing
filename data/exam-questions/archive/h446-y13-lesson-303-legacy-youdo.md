# H446 Year 13 lesson 303 — original You Do archived
Original SHA: 679d36be00fb824ffac71e67a3eca0d842d9c318

```html
<section id="you-do" class="page phase-youdo" data-phase-time="18 minutes" data-window-size="3" data-compact-window-size="1"><div class="youdo-deck"><div class="youdo-questions"><article class="youdo-question"><div class="youdo-question-prompt"><span class="phase-tag">PRACTICE · Q1/3</span><h2>Trace the OCR reference-language array below. State the output and explain why accessing a[3] would be invalid. [5]</h2><pre class="h13-code"><code>array a[3]
a[0] = 4
a[1] = 8
a[2] = 12
print(a[2])</code></pre></div><div class="youdo-solution" hidden><strong>MARK SCHEME / MODEL ANSWER</strong><p>Outputs 12 [2]; valid indexes are 0, 1 and 2 [2]; a[3] is out of range [1].</p></div></article><article class="youdo-question"><div class="youdo-question-prompt"><span class="phase-tag">PRACTICE · Q2/3</span><h2>Write OCR exam reference language to read and print every line of the file scores.txt, and then close it. [7]</h2></div><div class="youdo-solution" hidden><strong>MARK SCHEME / MODEL ANSWER</strong><p>Marking: openRead with the correct filename [2]; loop until endOfFile() [2]; readLine() and print each line [2]; close the loop and file [1].</p><pre class="h13-code"><code>f = openRead(&quot;scores.txt&quot;)
while NOT f.endOfFile()
    print(f.readLine())
endwhile
f.close()</code></pre></div></article><article class="youdo-question"><div class="youdo-question-prompt"><span class="phase-tag">PRACTICE · Q3/3</span><h2>Compare procedure addTwo(x:byVal) with addTwo(x:byRef), each executing x=x+2, for caller n=5. [6]</h2></div><div class="youdo-solution" hidden><strong>MARK SCHEME / MODEL ANSWER</strong><p>byVal called with n=5 uses copy and n remains5 [3]; byRef updates n to7 [3].</p></div></article></div></div></section>
```