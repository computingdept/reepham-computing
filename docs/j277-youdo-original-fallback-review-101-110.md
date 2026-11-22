# J277 original lesson fallbacks — Lessons 101–110

**Teacher review only, 22 November 2026.** Questions and answers copied directly from the original lesson `e` array. No student-facing overrides or approval changes.

## 101 — Binary Addition and Shifts

### Slot 3, original e[0]

**Question**

> Add 00011001 and 00000111 as eight-bit unsigned binary. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> 00011001 (25) + 00000111 (7) = 00100000 (32) [3].

*Source/marking/projector approval pending.*

### Slot 4, original e[1]

**Question**

> Apply a logical left shift of two places to 00001011. [2]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> 00101100 [2].

*Source/marking/projector approval pending.*

**Still unfilled:** 0.

## 102 — Hexadecimal

### Slot 1, original e[0]

**Question**

> Convert binary 10010110 to hexadecimal. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> 1001=9 [1], 0110=6 [1], combined hex 96 [1].

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> Convert hexadecimal B4 into eight-bit binary. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> B=1011 [1], 4=0100 [1], so 10110100 [1].

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> Convert hexadecimal 7D to denary. [4]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> 7×16 [1] +13 [1] =112+13 [1] =125 [1].

*Source/marking/projector approval pending.*

**Still unfilled:** 1.

## 104 — Sound and Compression

### Slot 2, original e[0]

**Question**

> A mono recording lasts 4 seconds, with 4000 samples/second and 8 bits/sample. Calculate the uncompressed size in bytes. [4]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> 4000×4=16,000 samples [1]; ×8=128,000 bits [2]; ÷8=16,000 bytes [1].

*Source/marking/projector approval pending.*

### Slot 3, original e[1]

**Question**

> Explain one effect of increasing bit depth while sample rate and duration stay the same. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> More amplitude levels [1] can improve quantisation precision [1], while increasing uncompressed file size [1].

*Source/marking/projector approval pending.*

### Slot 4, original e[2]

**Question**

> Explain why lossless compression is more suitable than lossy compression for an original master recording. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Lossless preserves all original data [1], so the original can be reconstructed exactly [1], avoiding irreversible quality loss [1].

*Source/marking/projector approval pending.*

**Still unfilled:** 0.

## 105 — Abstraction and Decomposition

### Slot 1, original e[0]

**Question**

> Define abstraction in computational thinking. [2]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Focusing on relevant detail [1] and ignoring unnecessary information [1].

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> A school creates an attendance app. Suggest THREE suitable subproblems. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Accept/register pupil status [1], store attendance record [1], calculate/generate an attendance report [1]. Accept valid equivalents.

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> Explain how decomposition and abstraction differ. [4]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Decomposition splits a large problem into smaller parts [1] to manage complexity [1]. Abstraction hides/removes irrelevant detail [1] to focus on what matters [1].

*Source/marking/projector approval pending.*

**Still unfilled:** 1.

## 106 — Algorithm Design and Flowcharts

### Slot 1, original e[0]

**Question**

> A flowchart checks whether mark is from 0 to 100 inclusive. Explain what should happen if the input is -2. [2]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> -2 fails the range decision, so the No branch is followed [1] and input is requested again [1].

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> An algorithm must accept an integer from 1 to 10. Describe the paths for 0 followed by 6. [4]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> 0 fails validity [1] and loops to input [1]; 6 passes [1] and algorithm continues/exits [1].

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> A flowchart incorrectly sends mark = 150 straight to End after failing validation for 0–100. Identify the mistake and its correction. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> 150 is invalid [1]; No should loop back to input instead of End [1] so a replacement value can be checked [1].

*Source/marking/projector approval pending.*

**Still unfilled:** 1.

## 107 — Trace Tables

### Slot 1, original e[0]

**Question**

> Trace x=2; x=x*3; x=x-1; print(x). Give x after each update and the output. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> After multiplication x=6 [1]; after subtraction x=5 [1]; output 5 [1].

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> Trace total=0; for i=1 to 3; total=total+i; next i. Record three totals. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> 1 [1], 3 [1], 6 [1].

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> Explain why a trace must record a variable only after the relevant assignment has executed. [2]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Before the assignment the old value is held [1]; recording afterwards shows the new program state correctly [1].

*Source/marking/projector approval pending.*

**Still unfilled:** 1.

## 108 — Linear Search

### Slot 1, original e[0]

**Question**

> A linear search looks for 11 in [4,11,6,18,2]. State the index and number of comparisons. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Index 1 [1], following checks of 4 then 11 [1], total 2 comparisons [1].

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> Explain why linear search can find a target in an unsorted list. [2]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Checks elements in order [1] without requiring sorting [1].

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> A linear search fails to find 5 in [1,4,8,9]. How many elements are checked and why? [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Four elements [1], because each item is compared [1] before concluding target absent [1].

*Source/marking/projector approval pending.*

**Still unfilled:** 1.

## 109 — Binary Search

### Slot 1, original e[0]

**Question**

> A sorted array is [1,5,9,13,17,21,25]. Trace the mid indexes when searching for 21 and give its final index. [4]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Start low0 high6 mid3 value13 [1]; low4 high6 mid5 value21 [1]; target found [1] at index5 [1].

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> State the prerequisite for binary search and explain its importance. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Sorted/ordered array [1]; comparisons with midpoint determine safe half to discard [1], without sorting the target could be excluded incorrectly [1].

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> Give the condition that shows binary search failed to locate an absent value. [2]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> low > high [1], meaning no active elements remain [1].

*Source/marking/projector approval pending.*

**Still unfilled:** 1.

## 110 — Bubble Sort

### Slot 1, original e[0]

**Question**

> Give the array after one complete left-to-right bubble-sort pass on [7,2,5,1]. [4]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> 7/2 swap [2,7,5,1] [1]; 7/5 swap [2,5,7,1] [1]; 7/1 swap [2,5,1,7] [1]; final [2,5,1,7] [1].

*Source/marking/projector approval pending.*

### Slot 2, original e[1]

**Question**

> Explain why bubble sort compares adjacent items. [3]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> It checks whether each neighbouring pair is in order [1]; swaps an out-of-order pair [1]; repeated passes gradually put values into sorted positions [1].

*Source/marking/projector approval pending.*

### Slot 3, original e[2]

**Question**

> State one way to detect that a bubble sort can finish early. [2]
> 
> Source: Original OCR J277-style practice question.

**Answer**

> Complete a pass with zero swaps [1]; array is already sorted [1].

*Source/marking/projector approval pending.*

**Still unfilled:** 1.
