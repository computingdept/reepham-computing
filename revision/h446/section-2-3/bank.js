// Original RHSC MCQ practice aligned to OCR H446 2.3.1(a–f).
const SKILLS = [
  {
    "id": "23-design",
    "section": "2.3",
    "spec": "2.3.1(a)",
    "title": "Algorithm design and tracing",
    "lessons": [
      72,
      73
    ],
    "page": 146,
    "questions": [
      {
        "id": "23-design-1",
        "prompt": "An algorithm must count negative values in a list. Which initial count is correct?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "-1",
          "The first value"
        ],
        "explanation": "Before any values are examined, zero negative values have been found. Initialising to 1 would overcount.",
        "skill": "Algorithm design and tracing"
      },
      {
        "id": "23-design-2",
        "prompt": "What does the algorithm print?",
        "answer": "2",
        "options": [
          "2",
          "0",
          "3",
          "4"
        ],
        "explanation": "Only 7 and 9 satisfy value > 5, so the count increases twice.",
        "skill": "Algorithm design and tracing",
        "code": "values = [2, 7, 5, 9]\ncount = 0\nfor i = 0 to 3\n  if values[i] > 5 then\n    count = count + 1\n  endif\nnext i\nprint(count)",
        "language": "OCR pseudocode"
      },
      {
        "id": "23-design-3",
        "prompt": "A maximum-finding algorithm must work when every value is negative. For a nonempty list, which initial maximum is safest?",
        "answer": "The first element",
        "options": [
          "The first element",
          "0",
          "1",
          "The length of the list"
        ],
        "explanation": "Starting with an actual element works for negative-only lists. Starting at zero can return a value that is not even present.",
        "skill": "Algorithm design and tracing"
      },
      {
        "id": "23-design-4",
        "prompt": "A search specification says return the first matching index, or -1 if absent. What should happen when no element matches?",
        "answer": "Return -1",
        "options": [
          "Return -1",
          "Return 0",
          "Return the last element",
          "Print the target only"
        ],
        "explanation": "The absent case is part of the required contract. Index 0 is a valid location and cannot also unambiguously mean absent.",
        "skill": "Algorithm design and tracing"
      },
      {
        "id": "23-design-5",
        "prompt": "A zero-indexed array has length n. Which is its last valid index when n > 0?",
        "answer": "n - 1",
        "options": [
          "n - 1",
          "n",
          "n + 1",
          "1 - n"
        ],
        "explanation": "Zero indexing gives indexes 0 through n − 1. Accessing index n is outside the array.",
        "skill": "Algorithm design and tracing"
      },
      {
        "id": "23-design-6",
        "prompt": "A sum algorithm has just processed the first k elements. Which statement is a useful loop invariant?",
        "answer": "total equals their sum",
        "options": [
          "total equals their sum",
          "total always equals zero",
          "k never changes",
          "All elements are positive"
        ],
        "explanation": "A loop invariant describes a property maintained as the loop progresses. The partial total should match the elements processed so far.",
        "skill": "Algorithm design and tracing"
      },
      {
        "id": "23-design-7",
        "prompt": "A function must return 0 for an empty list. Which test specifically checks that requirement?",
        "answer": "[] → 0",
        "options": [
          "[] → 0",
          "[0, 1] → 1",
          "[3] → 3",
          "[-2, 2] → 0"
        ],
        "explanation": "An empty-list test directly exercises the special empty-input case. A nonempty list whose sum is zero does not test the same path.",
        "skill": "Algorithm design and tracing"
      },
      {
        "id": "23-design-8",
        "prompt": "A running total should include every element exactly once. Which loop condition is correct for zero-based indexing?",
        "answer": "i < values.length",
        "options": [
          "i < values.length",
          "i <= values.length",
          "i > values.length",
          "i == values.length"
        ],
        "explanation": "With i starting at zero and increasing by one, i < length visits the valid indexes without accessing values[length].",
        "skill": "Algorithm design and tracing"
      },
      {
        "id": "23-design-9",
        "prompt": "What final value is printed?",
        "answer": "10",
        "options": [
          "10",
          "4",
          "6",
          "12"
        ],
        "explanation": "total begins at 1, then becomes 3, 6 and 10 after adding 2, 3 and 4.",
        "skill": "Algorithm design and tracing",
        "code": "total = 1\nfor i = 2 to 4\n  total = total + i\nnext i\nprint(total)",
        "language": "OCR pseudocode"
      },
      {
        "id": "23-design-10",
        "prompt": "A loop must terminate after examining every element. Which feature establishes progress?",
        "answer": "The index moves towards its limit",
        "options": [
          "The index moves towards its limit",
          "The variable names are short",
          "The output is coloured",
          "The source file is small"
        ],
        "explanation": "The loop needs a changing state that eventually makes its continuation condition false, such as an index increasing towards the array length.",
        "skill": "Algorithm design and tracing"
      }
    ]
  },
  {
    "id": "23-choice",
    "section": "2.3",
    "spec": "2.3.1(b)",
    "title": "Choosing algorithms: time and space",
    "lessons": [
      76,
      85
    ],
    "page": 140,
    "questions": [
      {
        "id": "23-choice-1",
        "prompt": "An unsorted list will be searched once. No sorting is otherwise needed. Which is a reasonable direct choice?",
        "answer": "Linear search",
        "options": [
          "Linear search",
          "Binary search immediately",
          "Dijkstra",
          "A*"
        ],
        "explanation": "Linear search works without sorting. Binary search requires ordered data, and sorting solely for one search adds preparation work.",
        "skill": "Choosing algorithms: time and space"
      },
      {
        "id": "23-choice-2",
        "prompt": "A large sorted array will be searched many times. Which usually gives fewer worst-case comparisons per search?",
        "answer": "Binary search",
        "options": [
          "Binary search",
          "Linear search",
          "Bubble sort",
          "Insertion sort"
        ],
        "explanation": "Binary search halves the remaining range, giving logarithmic worst-case comparisons. Linear search may inspect every element.",
        "skill": "Choosing algorithms: time and space"
      },
      {
        "id": "23-choice-3",
        "prompt": "A device has very little spare memory. Which property is especially relevant when choosing an algorithm?",
        "answer": "Auxiliary space requirement",
        "options": [
          "Auxiliary space requirement",
          "Number of comments",
          "Identifier length alone",
          "Source-file colour scheme"
        ],
        "explanation": "Auxiliary space is the extra working storage used by the algorithm. It matters when spare memory is limited.",
        "skill": "Choosing algorithms: time and space"
      },
      {
        "id": "23-choice-4",
        "prompt": "A small list is already nearly sorted. Which sort can benefit strongly from that order?",
        "answer": "Insertion sort",
        "options": [
          "Insertion sort",
          "Linear search",
          "Dijkstra",
          "A*"
        ],
        "explanation": "Insertion sort can need few shifts on nearly sorted data. The input’s existing order matters when choosing an algorithm.",
        "skill": "Choosing algorithms: time and space"
      },
      {
        "id": "23-choice-5",
        "prompt": "Why can an O(n²) algorithm beat an O(n log n) algorithm on a tiny input?",
        "answer": "Constant costs may dominate",
        "options": [
          "Constant costs may dominate",
          "Big O measures exact seconds",
          "Quadratic always scales better",
          "Input size has no effect"
        ],
        "explanation": "Big O describes growth, not a fixed timing prediction. Setup costs and implementation constants can dominate for small inputs.",
        "skill": "Choosing algorithms: time and space"
      },
      {
        "id": "23-choice-6",
        "prompt": "A system must find shortest routes with non-negative edge weights and has no useful goal heuristic. Which standard method fits?",
        "answer": "Dijkstra",
        "options": [
          "Dijkstra",
          "Bubble sort",
          "Binary search",
          "Insertion sort"
        ],
        "explanation": "Dijkstra finds shortest paths using known path costs without requiring a heuristic estimate to a goal.",
        "skill": "Choosing algorithms: time and space"
      },
      {
        "id": "23-choice-7",
        "prompt": "Two algorithms return the same correct result. What should an evaluation compare for the intended use?",
        "answer": "Time, space and input properties",
        "options": [
          "Time, space and input properties",
          "Only the number of lines",
          "Only the developer’s preference",
          "Only the longest variable name"
        ],
        "explanation": "Suitability depends on execution time, memory use, data properties and requirements, rather than code length alone.",
        "skill": "Choosing algorithms: time and space"
      },
      {
        "id": "23-choice-8",
        "prompt": "Binary search is proposed for a list that changes frequently and is kept unsorted. What extra cost must be considered?",
        "answer": "Maintaining the required order",
        "options": [
          "Maintaining the required order",
          "Printing every result twice",
          "Removing all duplicates first",
          "Converting all values to strings"
        ],
        "explanation": "Binary search’s ordering requirement has a cost. Updates may require maintaining sorted order or sorting before searches.",
        "skill": "Choosing algorithms: time and space"
      },
      {
        "id": "23-choice-9",
        "prompt": "A predictable O(n log n) worst-case sort is required, and an extra O(n) buffer is acceptable. Which standard array sort fits?",
        "answer": "Conventional merge sort",
        "options": [
          "Conventional merge sort",
          "Ordinary bubble sort",
          "Ordinary insertion sort",
          "Basic quicksort in every case"
        ],
        "explanation": "Conventional merge sort has O(n log n) worst-case time and typically uses O(n) auxiliary array storage. Basic quicksort can degrade to quadratic time.",
        "skill": "Choosing algorithms: time and space"
      },
      {
        "id": "23-choice-10",
        "prompt": "A comparison benchmark uses different data sizes and hardware for each implementation. What is the main weakness?",
        "answer": "Relevant conditions differ",
        "options": [
          "Relevant conditions differ",
          "Both programs use arrays",
          "The outputs are identical",
          "The source code is readable"
        ],
        "explanation": "Different hardware and workloads make it harder to attribute timing differences to the algorithms or implementations themselves.",
        "skill": "Choosing algorithms: time and space"
      }
    ]
  },
  {
    "id": "23-complexity",
    "section": "2.3",
    "spec": "2.3.1(c,d)",
    "title": "Big O and complexity comparisons",
    "lessons": [
      74,
      75
    ],
    "page": 63,
    "questions": [
      {
        "id": "23-complexity-1",
        "prompt": "Under the usual array model, accessing a known index has which complexity?",
        "answer": "O(1)",
        "options": [
          "O(1)",
          "O(n)",
          "O(n²)",
          "O(2ⁿ)"
        ],
        "explanation": "Direct indexing does not require a number of steps that grows with the array length, assuming a fixed-size element and standard memory access.",
        "skill": "Big O and complexity comparisons"
      },
      {
        "id": "23-complexity-2",
        "prompt": "A loop visits each of n elements once, doing constant work per visit. What is its time complexity?",
        "answer": "O(n)",
        "options": [
          "O(n)",
          "O(1)",
          "O(log n)",
          "O(n²)"
        ],
        "explanation": "The number of visits grows in direct proportion to the input size.",
        "skill": "Big O and complexity comparisons"
      },
      {
        "id": "23-complexity-3",
        "prompt": "An algorithm repeatedly halves its candidate range until at most one remains. Which growth class fits the number of halvings?",
        "answer": "O(log n)",
        "options": [
          "O(log n)",
          "O(n²)",
          "O(n³)",
          "O(2ⁿ)"
        ],
        "explanation": "Each halving removes a constant proportion of the remaining range. Doubling the starting range adds only about one extra halving.",
        "skill": "Big O and complexity comparisons"
      },
      {
        "id": "23-complexity-4",
        "prompt": "Two nested loops each run n times, with constant work in the inner body. What is the time complexity?",
        "answer": "O(n²)",
        "options": [
          "O(n²)",
          "O(n)",
          "O(log n)",
          "O(1)"
        ],
        "explanation": "The inner body runs n × n times, giving quadratic growth, which is a polynomial growth class.",
        "skill": "Big O and complexity comparisons"
      },
      {
        "id": "23-complexity-5",
        "prompt": "An exhaustive subset search considers all subsets of n items. How does the number of subsets grow?",
        "answer": "O(2ⁿ)",
        "options": [
          "O(2ⁿ)",
          "O(n)",
          "O(log n)",
          "O(1)"
        ],
        "explanation": "Each item can be included or excluded, creating 2ⁿ subsets. This grows exponentially.",
        "skill": "Big O and complexity comparisons"
      },
      {
        "id": "23-complexity-6",
        "prompt": "Ignoring lower-order terms and constants, how is 3n² + 8n + 2 classified?",
        "answer": "O(n²)",
        "options": [
          "O(n²)",
          "O(n)",
          "O(n³)",
          "O(2ⁿ)"
        ],
        "explanation": "The quadratic term dominates the growth for large n. Big O omits constant multipliers and lower-order terms.",
        "skill": "Big O and complexity comparisons"
      },
      {
        "id": "23-complexity-7",
        "prompt": "If n doubles, how does n² change?",
        "answer": "Multiplies by 4",
        "options": [
          "Multiplies by 4",
          "Multiplies by 2",
          "Adds 2",
          "Stays the same"
        ],
        "explanation": "(2n)² = 4n². This is a growth comparison, rather than a guarantee about exact measured runtime.",
        "skill": "Big O and complexity comparisons"
      },
      {
        "id": "23-complexity-8",
        "prompt": "Which listed function grows slowest as n becomes very large?",
        "answer": "log n",
        "options": [
          "log n",
          "n",
          "n²",
          "2ⁿ"
        ],
        "explanation": "Logarithmic growth is slower than linear, quadratic and exponential growth for sufficiently large n.",
        "skill": "Big O and complexity comparisons"
      },
      {
        "id": "23-complexity-9",
        "prompt": "An algorithm allocates a second array of n elements. What is its auxiliary space complexity?",
        "answer": "O(n)",
        "options": [
          "O(n)",
          "O(1)",
          "O(log n)",
          "O(n²)"
        ],
        "explanation": "The extra array grows in proportion to the input size. Auxiliary space counts extra working memory rather than just the input itself.",
        "skill": "Big O and complexity comparisons"
      },
      {
        "id": "23-complexity-10",
        "prompt": "Which worst-case growth is asymptotically better for large n: n log n or n²?",
        "answer": "n log n",
        "options": [
          "n log n",
          "n²",
          "They are identical",
          "Neither depends on n"
        ],
        "explanation": "n log n grows more slowly than n² for sufficiently large inputs. Exact timings still depend on constants and implementation.",
        "skill": "Big O and complexity comparisons"
      }
    ]
  },
  {
    "id": "23-stack",
    "section": "2.3",
    "spec": "2.3.1(e)",
    "title": "Stack algorithms",
    "lessons": [
      20,
      49
    ],
    "page": 170,
    "questions": [
      {
        "id": "23-stack-1",
        "prompt": "An empty stack receives push(4), push(9), then pop(). Which value is removed?",
        "answer": "9",
        "options": [
          "9",
          "4",
          "0",
          "Both values"
        ],
        "explanation": "A stack is last-in, first-out, so pop removes the most recently pushed remaining item.",
        "skill": "Stack algorithms"
      },
      {
        "id": "23-stack-2",
        "prompt": "A stack’s top index is -1 when empty. Which condition detects an empty stack?",
        "answer": "top == -1",
        "options": [
          "top == -1",
          "top == 0",
          "top == capacity",
          "top > capacity"
        ],
        "explanation": "Under the stated representation, -1 means no occupied element is at the top. Index 0 would contain the first pushed item.",
        "skill": "Stack algorithms"
      },
      {
        "id": "23-stack-3",
        "prompt": "A stack array has capacity 5 and top is the last occupied zero-based index. When is the stack full?",
        "answer": "top == 4",
        "options": [
          "top == 4",
          "top == 5",
          "top == -1",
          "top == 1"
        ],
        "explanation": "Valid indexes run from 0 to 4. A top index of 4 means all five positions are occupied.",
        "skill": "Stack algorithms"
      },
      {
        "id": "23-stack-4",
        "prompt": "With top initially -1, a push increments top before storing the item. Where is the first item stored?",
        "answer": "Index 0",
        "options": [
          "Index 0",
          "Index -1",
          "Index 1",
          "Index 2"
        ],
        "explanation": "Incrementing -1 produces 0, which is the first valid array position.",
        "skill": "Stack algorithms"
      },
      {
        "id": "23-stack-5",
        "prompt": "What must a pop operation check before accessing an empty-stack representation?",
        "answer": "Underflow",
        "options": [
          "Underflow",
          "Sorted order",
          "A graph heuristic",
          "Whether items are even"
        ],
        "explanation": "Popping an empty stack causes underflow. An implementation must detect and handle it rather than reading an invalid entry.",
        "skill": "Stack algorithms"
      },
      {
        "id": "23-stack-6",
        "prompt": "An empty stack receives push(A), push(B), pop(), push(C). What is at the top?",
        "answer": "C",
        "options": [
          "C",
          "A",
          "B",
          "Nothing"
        ],
        "explanation": "B is popped, leaving A. Pushing C then places C above A.",
        "skill": "Stack algorithms"
      },
      {
        "id": "23-stack-7",
        "prompt": "Which operation reads the top item without removing it?",
        "answer": "peek",
        "options": [
          "peek",
          "push",
          "enqueue",
          "dequeue"
        ],
        "explanation": "peek observes the top while pop also removes it. A suitable empty check is still needed.",
        "skill": "Stack algorithms"
      },
      {
        "id": "23-stack-8",
        "prompt": "A fixed-capacity stack is already full. What should another push detect?",
        "answer": "Overflow",
        "options": [
          "Overflow",
          "Underflow",
          "A successful search",
          "A completed traversal"
        ],
        "explanation": "A push beyond the available capacity would overflow the stack, so the full condition must be handled.",
        "skill": "Stack algorithms"
      },
      {
        "id": "23-stack-9",
        "prompt": "In a conventional array stack, push and pop each change only the top and one array entry. What is their time complexity?",
        "answer": "O(1)",
        "options": [
          "O(1)",
          "O(n)",
          "O(n²)",
          "O(2ⁿ)"
        ],
        "explanation": "Each operation performs a fixed amount of work, regardless of how many items are already stored.",
        "skill": "Stack algorithms"
      },
      {
        "id": "23-stack-10",
        "prompt": "A pop routine saves stack[top] as result. Which update should follow to remove that entry logically?",
        "answer": "top = top - 1",
        "options": [
          "top = top - 1",
          "top = top + 1",
          "top = capacity",
          "top = result"
        ],
        "explanation": "Decrementing top makes the preceding item the new top. The old array contents need not be shifted.",
        "skill": "Stack algorithms"
      }
    ]
  },
  {
    "id": "23-queue",
    "section": "2.3",
    "spec": "2.3.1(e)",
    "title": "Queue algorithms",
    "lessons": [
      20,
      50
    ],
    "page": 171,
    "questions": [
      {
        "id": "23-queue-1",
        "prompt": "An empty queue receives enqueue(A), enqueue(B), then dequeue(). Which item is removed?",
        "answer": "A",
        "options": [
          "A",
          "B",
          "Both items",
          "No item"
        ],
        "explanation": "A queue is first-in, first-out, so the earliest remaining enqueued item is removed first.",
        "skill": "Queue algorithms"
      },
      {
        "id": "23-queue-2",
        "prompt": "What does enqueue do in a queue?",
        "answer": "Adds at the rear",
        "options": [
          "Adds at the rear",
          "Removes from the front",
          "Removes from the rear",
          "Reverses every item"
        ],
        "explanation": "enqueue adds a new item at the rear, preserving the arrival order of earlier items.",
        "skill": "Queue algorithms"
      },
      {
        "id": "23-queue-3",
        "prompt": "What does dequeue do in a queue?",
        "answer": "Removes from the front",
        "options": [
          "Removes from the front",
          "Adds at the rear",
          "Sorts all queued items",
          "Reads every item twice"
        ],
        "explanation": "dequeue removes the oldest remaining item from the front, after a suitable empty check.",
        "skill": "Queue algorithms"
      },
      {
        "id": "23-queue-4",
        "prompt": "A circular queue has capacity 5. The rear index is 4. Which index follows it using modulo wraparound?",
        "answer": "0",
        "options": [
          "0",
          "5",
          "-1",
          "3"
        ],
        "explanation": "(4 + 1) MOD 5 = 0. Circular indexing reuses array positions when the index reaches the end.",
        "skill": "Queue algorithms"
      },
      {
        "id": "23-queue-5",
        "prompt": "A count-based circular queue has capacity 6 and count 6. Which state is it in?",
        "answer": "Full",
        "options": [
          "Full",
          "Empty",
          "Exactly half full",
          "Necessarily corrupt"
        ],
        "explanation": "With this representation, count equals the number of occupied positions. count == capacity means no free slot remains.",
        "skill": "Queue algorithms"
      },
      {
        "id": "23-queue-6",
        "prompt": "A count-based queue has count 0. What should dequeue detect?",
        "answer": "Underflow",
        "options": [
          "Underflow",
          "Overflow",
          "A sorted prefix",
          "A hash collision"
        ],
        "explanation": "There is no item to remove. Reading and returning a queue entry would not be a valid dequeue.",
        "skill": "Queue algorithms"
      },
      {
        "id": "23-queue-7",
        "prompt": "A queue contains A, B, C from front to rear. After dequeue() then enqueue(D), what is the order?",
        "answer": "B, C, D",
        "options": [
          "B, C, D",
          "D, B, C",
          "A, B, D",
          "C, B, D"
        ],
        "explanation": "A is removed from the front. D joins at the rear, after B and C.",
        "skill": "Queue algorithms"
      },
      {
        "id": "23-queue-8",
        "prompt": "Why use a circular queue instead of shifting every item after each removal?",
        "answer": "Reuse slots without shifting",
        "options": [
          "Reuse slots without shifting",
          "Guarantee infinite capacity",
          "Remove the need for state",
          "Make FIFO become LIFO"
        ],
        "explanation": "Updating indexes with wraparound lets freed positions be reused without moving all the remaining entries.",
        "skill": "Queue algorithms"
      },
      {
        "id": "23-queue-9",
        "prompt": "In a conventional count-based circular queue, which update follows a successful enqueue?",
        "answer": "count = count + 1",
        "options": [
          "count = count + 1",
          "count = count - 1",
          "count = 0",
          "count = capacity + 1"
        ],
        "explanation": "A successful enqueue adds exactly one occupied entry. Full and empty checks must follow the chosen representation.",
        "skill": "Queue algorithms"
      },
      {
        "id": "23-queue-10",
        "prompt": "With no resizing or shifting, what is the usual time complexity of circular-queue enqueue and dequeue?",
        "answer": "O(1)",
        "options": [
          "O(1)",
          "O(n)",
          "O(n²)",
          "O(2ⁿ)"
        ],
        "explanation": "Each changes a fixed number of entries, indexes or counters, so the work does not grow with the number of items.",
        "skill": "Queue algorithms"
      }
    ]
  },
  {
    "id": "23-linked",
    "section": "2.3",
    "spec": "2.3.1(e)",
    "title": "Linked-list algorithms",
    "lessons": [
      19,
      51,
      223
    ],
    "page": 97,
    "questions": [
      {
        "id": "23-linked-1",
        "prompt": "A singly linked list stores a head reference. What does head identify?",
        "answer": "The first node",
        "options": [
          "The first node",
          "The largest value",
          "The final array index",
          "The number of nodes"
        ],
        "explanation": "head provides the entry point for traversal. It need not refer to the smallest or largest value.",
        "skill": "Linked-list algorithms"
      },
      {
        "id": "23-linked-2",
        "prompt": "A singly linked list is A then B then C. Which reference does A.next contain?",
        "answer": "B",
        "options": [
          "B",
          "A",
          "C",
          "null"
        ],
        "explanation": "Each node’s next reference points to its successor, so A.next identifies B.",
        "skill": "Linked-list algorithms"
      },
      {
        "id": "23-linked-3",
        "prompt": "In a conventional non-circular singly linked list, what is stored in the final node’s next reference?",
        "answer": "null",
        "options": [
          "null",
          "The head always",
          "Its own value",
          "The list length"
        ],
        "explanation": "null marks the absence of a successor and gives traversal a stopping condition.",
        "skill": "Linked-list algorithms"
      },
      {
        "id": "23-linked-4",
        "prompt": "To insert node X at the head, which operation must precede head = X?",
        "answer": "X.next = head",
        "options": [
          "X.next = head",
          "head.next = null",
          "head = null",
          "X.next = X"
        ],
        "explanation": "Preserve the reference to the old first node by assigning it to X.next before changing head to X.",
        "skill": "Linked-list algorithms"
      },
      {
        "id": "23-linked-5",
        "prompt": "A list is A then B then C. To remove B while retaining the rest, which link is changed?",
        "answer": "A.next = C",
        "options": [
          "A.next = C",
          "C.next = A",
          "B.next = A",
          "A.next = null"
        ],
        "explanation": "The predecessor must bypass B and point to B’s successor C. That retains the remaining chain.",
        "skill": "Linked-list algorithms"
      },
      {
        "id": "23-linked-6",
        "prompt": "A singly linked-list search begins at head and follows next references. What is its worst-case search time for n nodes?",
        "answer": "O(n)",
        "options": [
          "O(n)",
          "O(1)",
          "O(log n)",
          "O(n²)"
        ],
        "explanation": "Without an additional index or special structure, the target may be at the end or absent, requiring up to n node visits.",
        "skill": "Linked-list algorithms"
      },
      {
        "id": "23-linked-7",
        "prompt": "How can an ordinary singly linked list be tested for emptiness?",
        "answer": "head == null",
        "options": [
          "head == null",
          "head.next == head always",
          "The first value is zero",
          "Every node has two children"
        ],
        "explanation": "With no nodes, the head reference is null. A zero value in a node would still be valid data.",
        "skill": "Linked-list algorithms"
      },
      {
        "id": "23-linked-8",
        "prompt": "A nonempty list’s first node is to be removed. Which update makes its successor the new first node?",
        "answer": "head = head.next",
        "options": [
          "head = head.next",
          "head.next = head",
          "head = head + 1",
          "head.next = null"
        ],
        "explanation": "The head reference moves to the next node. In an object-based list, nodes are followed by references rather than arithmetic indexes.",
        "skill": "Linked-list algorithms"
      },
      {
        "id": "23-linked-9",
        "prompt": "Node P currently links to Q. To insert X between them, which pair of steps is safe?",
        "answer": "X.next = Q; P.next = X",
        "options": [
          "X.next = Q; P.next = X",
          "P.next = X; X.next = X",
          "P.next = null; X.next = P",
          "Q.next = X; X.next = P"
        ],
        "explanation": "Save the onward link to Q in X.next, then redirect P.next to X. Replacing the link without preserving Q can lose the rest of the list.",
        "skill": "Linked-list algorithms"
      },
      {
        "id": "23-linked-10",
        "prompt": "An algorithm inserts after a known node by changing a fixed number of references. Ignoring allocation costs, what is its time complexity?",
        "answer": "O(1)",
        "options": [
          "O(1)",
          "O(n)",
          "O(n log n)",
          "O(n²)"
        ],
        "explanation": "With the predecessor already known, insertion changes a fixed number of links. Searching for that position can still cost O(n).",
        "skill": "Linked-list algorithms"
      }
    ]
  },
  {
    "id": "23-trees",
    "section": "2.3",
    "spec": "2.3.1(e)",
    "title": "Binary-search-tree algorithms",
    "lessons": [
      22,
      52
    ],
    "page": 90,
    "questions": [
      {
        "id": "23-trees-1",
        "prompt": "A BST uses smaller keys on the left and larger keys on the right, with distinct keys. Where is 30 inserted when the root is 40 and its left position is empty?",
        "answer": "Left child of 40",
        "options": [
          "Left child of 40",
          "Right child of 40",
          "Above the root",
          "It cannot be inserted"
        ],
        "explanation": "30 < 40, so insertion follows the left branch and uses the empty child position.",
        "skill": "Binary-search-tree algorithms"
      },
      {
        "id": "23-trees-2",
        "prompt": "A BST has root 40 and right child 60. Its other positions are empty. Where is 50 inserted?",
        "answer": "Left child of 60",
        "options": [
          "Left child of 60",
          "Left child of 40",
          "Right child of 60",
          "Above 40"
        ],
        "explanation": "50 > 40 sends the search right to 60. Then 50 < 60 sends it to the empty left position there.",
        "skill": "Binary-search-tree algorithms"
      },
      {
        "id": "23-trees-3",
        "prompt": "During a BST search, target is smaller than the current key. Which branch is followed?",
        "answer": "Left",
        "options": [
          "Left",
          "Right",
          "Both branches always",
          "The parent always"
        ],
        "explanation": "Under the stated BST ordering rule, smaller keys belong in the left subtree.",
        "skill": "Binary-search-tree algorithms"
      },
      {
        "id": "23-trees-4",
        "prompt": "A BST search reaches null without finding the target. What does that establish?",
        "answer": "The target is absent",
        "options": [
          "The target is absent",
          "The target is at the root",
          "The tree must be balanced",
          "The target is the largest key"
        ],
        "explanation": "The search has exhausted the only branch that could contain the target under the BST ordering rule.",
        "skill": "Binary-search-tree algorithms"
      },
      {
        "id": "23-trees-5",
        "prompt": "A leaf node is removed from a BST. What happens to its parent’s link to that node?",
        "answer": "It becomes null",
        "options": [
          "It becomes null",
          "It points to the root",
          "It points to the leaf itself",
          "It must swap all keys"
        ],
        "explanation": "A leaf has no children to preserve, so its parent can simply stop referencing it.",
        "skill": "Binary-search-tree algorithms"
      },
      {
        "id": "23-trees-6",
        "prompt": "A BST node has exactly one child and is deleted. What should its parent’s relevant link point to?",
        "answer": "That child",
        "options": [
          "That child",
          "The deleted node",
          "An unrelated leaf",
          "null in every case"
        ],
        "explanation": "Promoting the sole child preserves the rest of the subtree without breaking its ordering.",
        "skill": "Binary-search-tree algorithms"
      },
      {
        "id": "23-trees-7",
        "prompt": "A BST node has two children. Which value can replace its key in the usual successor-based deletion?",
        "answer": "Smallest key in its right subtree",
        "options": [
          "Smallest key in its right subtree",
          "Largest key anywhere",
          "Any left descendant",
          "The root key always"
        ],
        "explanation": "The inorder successor is the smallest key greater than the deleted key. After copying it, its original node must also be removed correctly.",
        "skill": "Binary-search-tree algorithms"
      },
      {
        "id": "23-trees-8",
        "prompt": "Distinct keys 1, 2, 3, 4, 5 are inserted into an initially empty, unbalanced BST in that order. What is the shape?",
        "answer": "A right-leaning chain",
        "options": [
          "A right-leaning chain",
          "A perfectly balanced tree",
          "A left-leaning chain",
          "A circular list"
        ],
        "explanation": "Each new key is larger than all previous keys and is inserted along the rightmost path.",
        "skill": "Binary-search-tree algorithms"
      },
      {
        "id": "23-trees-9",
        "prompt": "A balanced BST has n nodes. What is the usual worst-case search growth?",
        "answer": "O(log n)",
        "options": [
          "O(log n)",
          "O(1)",
          "O(n²)",
          "O(2ⁿ)"
        ],
        "explanation": "A balanced tree has logarithmic height, so a root-to-leaf search follows O(log n) nodes.",
        "skill": "Binary-search-tree algorithms"
      },
      {
        "id": "23-trees-10",
        "prompt": "A badly unbalanced BST forms a chain of n nodes. What can its worst-case search time become?",
        "answer": "O(n)",
        "options": [
          "O(n)",
          "O(1)",
          "O(log n)",
          "O(n²)"
        ],
        "explanation": "A search can follow the entire chain, so the balance of the tree affects its performance.",
        "skill": "Binary-search-tree algorithms"
      }
    ]
  },
  {
    "id": "23-traversal",
    "section": "2.3",
    "spec": "2.3.1(e)",
    "title": "Post-order and breadth-first traversal",
    "lessons": [
      56,
      226
    ],
    "page": 83,
    "questions": [
      {
        "id": "23-traversal-1",
        "prompt": "Which order defines post-order traversal of a binary tree?",
        "answer": "Left, right, root",
        "options": [
          "Left, right, root",
          "Root, left, right",
          "Left, root, right",
          "Every level first"
        ],
        "explanation": "Post-order completes the left subtree, then the right subtree, then visits the current node.",
        "skill": "Post-order and breadth-first traversal"
      },
      {
        "id": "23-traversal-2",
        "prompt": "What is the post-order traversal of the displayed tree?",
        "answer": "D, E, B, C, A",
        "options": [
          "D, E, B, C, A",
          "A, B, C, D, E",
          "D, B, E, A, C",
          "A, B, D, E, C"
        ],
        "explanation": "Visit B’s children D then E, then B. Visit C next, and finally root A.",
        "skill": "Post-order and breadth-first traversal",
        "table": {
          "caption": "Binary tree · blank child means no child",
          "headers": [
            "Node",
            "Left",
            "Right"
          ],
          "rows": [
            [
              "A",
              "B",
              "C"
            ],
            [
              "B",
              "D",
              "E"
            ],
            [
              "C",
              "—",
              "—"
            ],
            [
              "D",
              "—",
              "—"
            ],
            [
              "E",
              "—",
              "—"
            ]
          ]
        }
      },
      {
        "id": "23-traversal-3",
        "prompt": "Which structure is used by a standard iterative breadth-first tree traversal?",
        "answer": "Queue",
        "options": [
          "Queue",
          "Stack only",
          "Hash function",
          "Sorted array only"
        ],
        "explanation": "A FIFO queue keeps earlier-discovered nodes ahead of their children, producing level order.",
        "skill": "Post-order and breadth-first traversal"
      },
      {
        "id": "23-traversal-4",
        "prompt": "Visiting left children before right children, what is the breadth-first order of the displayed tree?",
        "answer": "A, B, C, D, E",
        "options": [
          "A, B, C, D, E",
          "D, E, B, C, A",
          "A, B, D, E, C",
          "D, B, E, A, C"
        ],
        "explanation": "Visit A, then the next level B and C, then D and E.",
        "skill": "Post-order and breadth-first traversal",
        "table": {
          "caption": "Binary tree · blank child means no child",
          "headers": [
            "Node",
            "Left",
            "Right"
          ],
          "rows": [
            [
              "A",
              "B",
              "C"
            ],
            [
              "B",
              "D",
              "E"
            ],
            [
              "C",
              "—",
              "—"
            ],
            [
              "D",
              "—",
              "—"
            ],
            [
              "E",
              "—",
              "—"
            ]
          ]
        }
      },
      {
        "id": "23-traversal-5",
        "prompt": "A breadth-first traversal visits root A and enqueues its left child B then right child C. Which node is dequeued next?",
        "answer": "B",
        "options": [
          "B",
          "C",
          "A again",
          "The deepest leaf"
        ],
        "explanation": "FIFO order removes B first because it was enqueued before C.",
        "skill": "Post-order and breadth-first traversal"
      },
      {
        "id": "23-traversal-6",
        "prompt": "Where does the root appear in a complete post-order traversal of a nonempty tree?",
        "answer": "Last",
        "options": [
          "Last",
          "First",
          "Always second",
          "At a random position"
        ],
        "explanation": "A post-order visit happens only after both subtrees have been traversed, so the overall root is visited last.",
        "skill": "Post-order and breadth-first traversal"
      },
      {
        "id": "23-traversal-7",
        "prompt": "A tree has only root R. What do both post-order and breadth-first traversal output?",
        "answer": "R",
        "options": [
          "R",
          "Nothing",
          "R, R",
          "null"
        ],
        "explanation": "The single existing node is visited exactly once by either traversal.",
        "skill": "Post-order and breadth-first traversal"
      },
      {
        "id": "23-traversal-8",
        "prompt": "A recursive post-order function reaches a null child. What should it do?",
        "answer": "Return without visiting a node",
        "options": [
          "Return without visiting a node",
          "Visit the parent immediately twice",
          "Create a new child",
          "Restart at the root"
        ],
        "explanation": "A null child represents an empty subtree and forms a stopping case for the recursive traversal.",
        "skill": "Post-order and breadth-first traversal"
      },
      {
        "id": "23-traversal-9",
        "prompt": "Which output pattern does breadth-first traversal guarantee in a tree?",
        "answer": "Increasing depth levels",
        "options": [
          "Increasing depth levels",
          "Increasing key values",
          "Decreasing key values",
          "Children before every parent"
        ],
        "explanation": "Breadth-first explores nodes level by level from the root, rather than following a sorting order.",
        "skill": "Post-order and breadth-first traversal"
      },
      {
        "id": "23-traversal-10",
        "prompt": "A complete traversal visits each of n tree nodes once and does constant work per visit. What is its time complexity?",
        "answer": "O(n)",
        "options": [
          "O(n)",
          "O(1)",
          "O(log n)",
          "O(n²)"
        ],
        "explanation": "Every node is visited once. The traversal order changes, but the total number of visits remains proportional to n.",
        "skill": "Post-order and breadth-first traversal"
      }
    ]
  },
  {
    "id": "23-linear",
    "section": "2.3",
    "spec": "2.3.1(f)",
    "title": "Linear search",
    "lessons": [
      77
    ],
    "page": 68,
    "questions": [
      {
        "id": "23-linear-1",
        "prompt": "Linear search checks [8, 3, 6, 2] from left to right for 6. How many comparisons find it?",
        "answer": "3",
        "options": [
          "3",
          "1",
          "2",
          "4"
        ],
        "explanation": "The search compares 8, then 3, then 6. The third comparison succeeds.",
        "skill": "Linear search"
      },
      {
        "id": "23-linear-2",
        "prompt": "What is the key input-order requirement for ordinary linear search?",
        "answer": "No sorted order is needed",
        "options": [
          "No sorted order is needed",
          "Ascending order is required",
          "Descending order is required",
          "All values must be distinct"
        ],
        "explanation": "Linear search can inspect each element in turn without relying on the list being sorted.",
        "skill": "Linear search"
      },
      {
        "id": "23-linear-3",
        "prompt": "A linear search returns the first matching zero-based index. Searching [4, 7, 4] for 4 returns what?",
        "answer": "0",
        "options": [
          "0",
          "1",
          "2",
          "4"
        ],
        "explanation": "The first matching item is at index 0. The item’s value and its index are different.",
        "skill": "Linear search"
      },
      {
        "id": "23-linear-4",
        "prompt": "A linear search checks every element of a five-item list and finds no match. How many element-to-target comparisons were made?",
        "answer": "5",
        "options": [
          "5",
          "0",
          "1",
          "4"
        ],
        "explanation": "The unsuccessful search must rule out all five entries under the stated method.",
        "skill": "Linear search"
      },
      {
        "id": "23-linear-5",
        "prompt": "What is the best-case time complexity when the first element matches?",
        "answer": "O(1)",
        "options": [
          "O(1)",
          "O(n)",
          "O(log n)",
          "O(n²)"
        ],
        "explanation": "Only one comparison is needed, regardless of the full list length.",
        "skill": "Linear search"
      },
      {
        "id": "23-linear-6",
        "prompt": "What is the worst-case time complexity for linear search over n entries?",
        "answer": "O(n)",
        "options": [
          "O(n)",
          "O(1)",
          "O(log n)",
          "O(n²)"
        ],
        "explanation": "The target may be last or absent, requiring up to n element-to-target comparisons.",
        "skill": "Linear search"
      },
      {
        "id": "23-linear-7",
        "prompt": "A function returns -1 when no match exists. What should searching an empty array return?",
        "answer": "-1",
        "options": [
          "-1",
          "0",
          "The target",
          "An arbitrary element"
        ],
        "explanation": "An empty array has no valid matching index, so the absent marker should be returned without accessing an element.",
        "skill": "Linear search"
      },
      {
        "id": "23-linear-8",
        "prompt": "Which line returns the index when a match is found?",
        "answer": "return i",
        "options": [
          "return i",
          "return values[i]",
          "return target",
          "return -1"
        ],
        "explanation": "The contract asks for the matching index. values[i] would return the element’s value instead.",
        "skill": "Linear search",
        "code": "for i = 0 to values.length - 1\n  if values[i] == target then\n    // missing line\n  endif\nnext i\nreturn -1",
        "language": "OCR pseudocode"
      },
      {
        "id": "23-linear-9",
        "prompt": "How should a search that must find every matching index behave after its first match?",
        "answer": "Continue checking later elements",
        "options": [
          "Continue checking later elements",
          "Return immediately",
          "Delete the array",
          "Sort only the matched element"
        ],
        "explanation": "Returning at the first match is suitable for a first-occurrence contract, but finding all matches requires continuing the scan.",
        "skill": "Linear search"
      },
      {
        "id": "23-linear-10",
        "prompt": "An iterative linear search keeps just an index and a result marker. What is its auxiliary space complexity?",
        "answer": "O(1)",
        "options": [
          "O(1)",
          "O(n)",
          "O(n²)",
          "O(log n)"
        ],
        "explanation": "The number of extra fixed-size variables does not grow with the array length.",
        "skill": "Linear search"
      }
    ]
  },
  {
    "id": "23-binary",
    "section": "2.3",
    "spec": "2.3.1(f)",
    "title": "Binary search",
    "lessons": [
      78
    ],
    "page": 69,
    "questions": [
      {
        "id": "23-binary-1",
        "prompt": "Which precondition is required for ordinary binary search on an ascending array?",
        "answer": "Values are sorted ascending",
        "options": [
          "Values are sorted ascending",
          "Values are all positive",
          "The length is even",
          "Every value has one digit"
        ],
        "explanation": "Binary search chooses a side based on ordering. Without the required order, discarding half the range is not valid.",
        "skill": "Binary search"
      },
      {
        "id": "23-binary-2",
        "prompt": "Using zero-based inclusive bounds low=0 and high=6, and mid=(low+high) DIV 2, what is mid?",
        "answer": "3",
        "options": [
          "3",
          "2",
          "4",
          "6"
        ],
        "explanation": "(0 + 6) DIV 2 = 3. The midpoint is an index within the current candidate range.",
        "skill": "Binary search"
      },
      {
        "id": "23-binary-3",
        "prompt": "In ascending binary search, target is greater than values[mid]. How should low change?",
        "answer": "low = mid + 1",
        "options": [
          "low = mid + 1",
          "low = mid",
          "low = mid - 1",
          "low = 0"
        ],
        "explanation": "All indexes at or below mid can be excluded because their values are no greater than values[mid], which is too small.",
        "skill": "Binary search"
      },
      {
        "id": "23-binary-4",
        "prompt": "In ascending binary search, target is less than values[mid]. How should high change?",
        "answer": "high = mid - 1",
        "options": [
          "high = mid - 1",
          "high = mid",
          "high = mid + 1",
          "high = values.length"
        ],
        "explanation": "The midpoint and the higher side can be excluded. Moving to mid − 1 also ensures progress with inclusive bounds.",
        "skill": "Binary search"
      },
      {
        "id": "23-binary-5",
        "prompt": "Using floor midpoint and inclusive bounds, which value is checked first when searching [2, 5, 9, 12, 18, 24, 31] for 24?",
        "answer": "12",
        "options": [
          "12",
          "9",
          "18",
          "24"
        ],
        "explanation": "The starting midpoint is index 3, whose value is 12. Only then does the search move to the higher half.",
        "skill": "Binary search"
      },
      {
        "id": "23-binary-6",
        "prompt": "The same search for 24 checks 12 first. Which value is checked next?",
        "answer": "24",
        "options": [
          "24",
          "18",
          "31",
          "5"
        ],
        "explanation": "After 24 > 12, low becomes 4 and high stays 6. The next midpoint is index 5, holding 24.",
        "skill": "Binary search"
      },
      {
        "id": "23-binary-7",
        "prompt": "With inclusive bounds, which condition means no candidate indexes remain?",
        "answer": "low > high",
        "options": [
          "low > high",
          "low == high",
          "low < high",
          "mid == 0"
        ],
        "explanation": "A single candidate remains when low == high. The range becomes empty only when low exceeds high.",
        "skill": "Binary search"
      },
      {
        "id": "23-binary-8",
        "prompt": "What is ordinary iterative binary search’s worst-case time complexity on an array?",
        "answer": "O(log n)",
        "options": [
          "O(log n)",
          "O(n)",
          "O(n²)",
          "O(2ⁿ)"
        ],
        "explanation": "Each unsuccessful comparison discards about half of the remaining candidates.",
        "skill": "Binary search"
      },
      {
        "id": "23-binary-9",
        "prompt": "Why can low = mid cause an infinite loop with inclusive bounds?",
        "answer": "The range may stop shrinking",
        "options": [
          "The range may stop shrinking",
          "The list becomes unsorted",
          "Every value becomes zero",
          "It always skips the target"
        ],
        "explanation": "When mid equals low and the target is greater, assigning low = mid leaves low unchanged. Excluding mid with mid + 1 ensures progress.",
        "skill": "Binary search"
      },
      {
        "id": "23-binary-10",
        "prompt": "A sorted array contains duplicate targets. What does an ordinary binary search that returns immediately on equality guarantee?",
        "answer": "A matching index",
        "options": [
          "A matching index",
          "Always the first matching index",
          "Always the last matching index",
          "Every matching index"
        ],
        "explanation": "Immediate return finds one occurrence. Finding the first or last duplicate requires extra logic to continue searching the appropriate side.",
        "skill": "Binary search"
      }
    ]
  },
  {
    "id": "23-bubble",
    "section": "2.3",
    "spec": "2.3.1(f)",
    "title": "Bubble sort",
    "lessons": [
      79
    ],
    "page": 74,
    "questions": [
      {
        "id": "23-bubble-1",
        "prompt": "Ascending bubble sort makes a full left-to-right pass through [5, 1, 4, 2], swapping adjacent values when needed. What is the result?",
        "answer": "1, 4, 2, 5",
        "options": [
          "1, 4, 2, 5",
          "1, 2, 4, 5",
          "5, 4, 2, 1",
          "1, 5, 2, 4"
        ],
        "explanation": "Swap 5 with 1, then with 4, then with 2. The largest value reaches the end, but the remaining prefix is not yet fully sorted.",
        "skill": "Bubble sort"
      },
      {
        "id": "23-bubble-2",
        "prompt": "Which elements does ordinary bubble sort compare directly?",
        "answer": "Adjacent elements",
        "options": [
          "Adjacent elements",
          "Only the first and last",
          "Every element with a pivot",
          "Only middle elements"
        ],
        "explanation": "Bubble sort compares neighbouring entries and swaps them when they are in the wrong order.",
        "skill": "Bubble sort"
      },
      {
        "id": "23-bubble-3",
        "prompt": "After one complete left-to-right ascending bubble-sort pass, which value is guaranteed to be at the final position?",
        "answer": "A largest value",
        "options": [
          "A largest value",
          "A smallest value",
          "The original first value always",
          "A random pivot"
        ],
        "explanation": "The largest encountered value is repeatedly moved right by adjacent swaps until it reaches the end.",
        "skill": "Bubble sort"
      },
      {
        "id": "23-bubble-4",
        "prompt": "An optimised bubble sort makes a pass with no swaps. What can it conclude?",
        "answer": "The list is sorted",
        "options": [
          "The list is sorted",
          "The list is empty",
          "Another swap is required",
          "All values are distinct"
        ],
        "explanation": "If every adjacent comparison is already in order, no later inversion remains and the algorithm can stop.",
        "skill": "Bubble sort"
      },
      {
        "id": "23-bubble-5",
        "prompt": "What is ordinary bubble sort’s worst-case time complexity?",
        "answer": "O(n²)",
        "options": [
          "O(n²)",
          "O(1)",
          "O(log n)",
          "O(n log n)"
        ],
        "explanation": "Many passes may each perform a linear number of adjacent comparisons, producing quadratic worst-case growth.",
        "skill": "Bubble sort"
      },
      {
        "id": "23-bubble-6",
        "prompt": "Starting from [1, 4, 2, 5], another ascending left-to-right pass is made over the unsorted prefix. What is the result?",
        "answer": "1, 2, 4, 5",
        "options": [
          "1, 2, 4, 5",
          "1, 4, 2, 5",
          "2, 1, 4, 5",
          "5, 4, 2, 1"
        ],
        "explanation": "The comparison of 4 and 2 swaps them. Other relevant neighbours are already ordered.",
        "skill": "Bubble sort"
      },
      {
        "id": "23-bubble-7",
        "prompt": "Which condition triggers a swap in ascending bubble sort?",
        "answer": "values[i] > values[i + 1]",
        "options": [
          "values[i] > values[i + 1]",
          "values[i] < values[i + 1]",
          "i == values.length",
          "values[i] == i"
        ],
        "explanation": "Swap when the left neighbour is larger than the right neighbour to move the pair towards ascending order.",
        "skill": "Bubble sort"
      },
      {
        "id": "23-bubble-8",
        "prompt": "A four-element sorted list is checked by an early-exit bubble sort. How many adjacent comparisons are needed in its first full pass?",
        "answer": "3",
        "options": [
          "3",
          "0",
          "4",
          "6"
        ],
        "explanation": "The pass checks pairs at indexes (0,1), (1,2) and (2,3). No swaps means it can then stop.",
        "skill": "Bubble sort"
      },
      {
        "id": "23-bubble-9",
        "prompt": "Why can bubble sort reduce the unsorted range after each ascending left-to-right pass?",
        "answer": "The largest remaining value is placed",
        "options": [
          "The largest remaining value is placed",
          "The entire array is always sorted",
          "The first element is always fixed",
          "All duplicate values are removed"
        ],
        "explanation": "The final value of that pass is in its sorted position, so later passes do not need to compare it again.",
        "skill": "Bubble sort"
      },
      {
        "id": "23-bubble-10",
        "prompt": "An array bubble sort uses one temporary swap value and fixed-size loop variables. What is its auxiliary space complexity?",
        "answer": "O(1)",
        "options": [
          "O(1)",
          "O(n)",
          "O(n²)",
          "O(log n)"
        ],
        "explanation": "The extra working storage does not grow with the number of array elements.",
        "skill": "Bubble sort"
      }
    ]
  },
  {
    "id": "23-insertion",
    "section": "2.3",
    "spec": "2.3.1(f)",
    "title": "Insertion sort",
    "lessons": [
      80
    ],
    "page": 154,
    "questions": [
      {
        "id": "23-insertion-1",
        "prompt": "What is the main invariant of insertion sort as it processes an array from left to right?",
        "answer": "The processed prefix is sorted",
        "options": [
          "The processed prefix is sorted",
          "The whole array is always sorted",
          "The suffix is always sorted",
          "Every value is a pivot"
        ],
        "explanation": "Each iteration inserts the next key into its correct position within the already sorted prefix.",
        "skill": "Insertion sort"
      },
      {
        "id": "23-insertion-2",
        "prompt": "The sorted prefix is [2, 5, 7] and the next key is 4. What is the new prefix?",
        "answer": "2, 4, 5, 7",
        "options": [
          "2, 4, 5, 7",
          "2, 5, 7, 4",
          "4, 2, 5, 7",
          "7, 5, 4, 2"
        ],
        "explanation": "7 and 5 shift right to open the position between 2 and 5, where 4 belongs.",
        "skill": "Insertion sort"
      },
      {
        "id": "23-insertion-3",
        "prompt": "In that insertion of 4 into [2, 5, 7], how many existing values shift right?",
        "answer": "2",
        "options": [
          "2",
          "0",
          "1",
          "3"
        ],
        "explanation": "Both 7 and 5 are larger than 4 and shift right. The value 2 remains where it is.",
        "skill": "Insertion sort"
      },
      {
        "id": "23-insertion-4",
        "prompt": "Insertion sort begins with [6, 2, 5, 1]. After inserting the second value into the first-element prefix, what is the array?",
        "answer": "2, 6, 5, 1",
        "options": [
          "2, 6, 5, 1",
          "1, 2, 5, 6",
          "6, 2, 1, 5",
          "2, 5, 6, 1"
        ],
        "explanation": "The key 2 is inserted before 6. Values 5 and 1 have not yet been inserted.",
        "skill": "Insertion sort"
      },
      {
        "id": "23-insertion-5",
        "prompt": "What is the usual best-case time complexity of insertion sort on an already sorted array?",
        "answer": "O(n)",
        "options": [
          "O(n)",
          "O(1)",
          "O(n²)",
          "O(2ⁿ)"
        ],
        "explanation": "Each key needs only a small constant amount of comparison work, but the algorithm still processes the array.",
        "skill": "Insertion sort"
      },
      {
        "id": "23-insertion-6",
        "prompt": "What is insertion sort’s worst-case time complexity?",
        "answer": "O(n²)",
        "options": [
          "O(n²)",
          "O(1)",
          "O(log n)",
          "O(n log n)"
        ],
        "explanation": "On reverse-sorted input, successive keys may each require shifting most of the existing prefix.",
        "skill": "Insertion sort"
      },
      {
        "id": "23-insertion-7",
        "prompt": "Why save the key before shifting existing array values?",
        "answer": "Shifting can overwrite its slot",
        "options": [
          "Shifting can overwrite its slot",
          "The key must always become zero",
          "Every key is the final element",
          "It makes the array immutable"
        ],
        "explanation": "The original key value must be retained while its old array position may be overwritten by a shifted value.",
        "skill": "Insertion sort"
      },
      {
        "id": "23-insertion-8",
        "prompt": "A key is smaller than every value in the sorted prefix. Where is it inserted?",
        "answer": "At the start of the prefix",
        "options": [
          "At the start of the prefix",
          "At the end of the array",
          "In a new duplicate array always",
          "At a random midpoint"
        ],
        "explanation": "All larger prefix values shift right, leaving the first position free for the new smallest key.",
        "skill": "Insertion sort"
      },
      {
        "id": "23-insertion-9",
        "prompt": "What auxiliary space does conventional in-place array insertion sort need?",
        "answer": "O(1)",
        "options": [
          "O(1)",
          "O(n)",
          "O(n²)",
          "O(2ⁿ)"
        ],
        "explanation": "A temporary key and a fixed number of indexes are sufficient; it does not require a second n-element array.",
        "skill": "Insertion sort"
      },
      {
        "id": "23-insertion-10",
        "prompt": "Why can insertion sort suit data that is nearly sorted?",
        "answer": "Few values may need shifting",
        "options": [
          "Few values may need shifting",
          "It never compares values",
          "It sorts only positive numbers",
          "It always runs in constant time"
        ],
        "explanation": "When keys are already near their correct positions, insertion requires relatively little shifting. The amount of disorder matters.",
        "skill": "Insertion sort"
      }
    ]
  },
  {
    "id": "23-merge",
    "section": "2.3",
    "spec": "2.3.1(f)",
    "title": "Merge sort",
    "lessons": [
      81
    ],
    "page": 154,
    "questions": [
      {
        "id": "23-merge-1",
        "prompt": "Merging ascending sorted runs [2, 8] and [1, 7] produces which result?",
        "answer": "1, 2, 7, 8",
        "options": [
          "1, 2, 7, 8",
          "2, 8, 1, 7",
          "1, 7, 2, 8",
          "8, 7, 2, 1"
        ],
        "explanation": "Repeatedly select the smaller available front value. The merged output remains ascending.",
        "skill": "Merge sort"
      },
      {
        "id": "23-merge-2",
        "prompt": "What must be true of the two input runs for an ordinary ascending merge operation?",
        "answer": "Each run is already sorted",
        "options": [
          "Each run is already sorted",
          "Every value is distinct",
          "The runs have equal lengths",
          "All values are positive"
        ],
        "explanation": "The merge relies on each front entry being the smallest remaining value in its own run. Equal run lengths and distinct values are not required.",
        "skill": "Merge sort"
      },
      {
        "id": "23-merge-3",
        "prompt": "In bottom-up merge sort, which run widths are processed successively?",
        "answer": "1, 2, 4, 8",
        "options": [
          "1, 2, 4, 8",
          "1, 3, 5, 7",
          "8, 7, 6, 5",
          "1, 1, 1, 1"
        ],
        "explanation": "Single elements are sorted runs of width 1. Merging neighbouring runs doubles the width at each stage.",
        "skill": "Merge sort"
      },
      {
        "id": "23-merge-4",
        "prompt": "Bottom-up merge sort starts with [7, 3, 6, 2]. After merging adjacent single-element runs, what is the array?",
        "answer": "3, 7, 2, 6",
        "options": [
          "3, 7, 2, 6",
          "2, 3, 6, 7",
          "7, 3, 2, 6",
          "3, 6, 7, 2"
        ],
        "explanation": "Merge [7] with [3] to get [3,7], and [6] with [2] to get [2,6]. Those two runs are merged at the next width.",
        "skill": "Merge sort"
      },
      {
        "id": "23-merge-5",
        "prompt": "What is conventional merge sort’s worst-case time complexity?",
        "answer": "O(n log n)",
        "options": [
          "O(n log n)",
          "O(1)",
          "O(log n)",
          "O(n²)"
        ],
        "explanation": "Each merge level processes O(n) elements and there are O(log n) balanced splitting or run-width levels.",
        "skill": "Merge sort"
      },
      {
        "id": "23-merge-6",
        "prompt": "After one input run is exhausted during merging, what happens to the other run’s remaining values?",
        "answer": "They are copied in order",
        "options": [
          "They are copied in order",
          "They are discarded",
          "They are reversed",
          "They are all replaced by zero"
        ],
        "explanation": "The remaining run is already sorted, so its remaining entries can be copied directly to the output.",
        "skill": "Merge sort"
      },
      {
        "id": "23-merge-7",
        "prompt": "What is the time complexity of merging two sorted runs with n values in total?",
        "answer": "O(n)",
        "options": [
          "O(n)",
          "O(1)",
          "O(log n)",
          "O(n²)"
        ],
        "explanation": "Each value is selected or copied once, so the work grows in proportion to the total number of values.",
        "skill": "Merge sort"
      },
      {
        "id": "23-merge-8",
        "prompt": "A conventional array merge sort uses an n-element temporary buffer. What is its auxiliary space complexity?",
        "answer": "O(n)",
        "options": [
          "O(n)",
          "O(1)",
          "O(n²)",
          "O(2ⁿ)"
        ],
        "explanation": "The buffer grows linearly with the input. This storage cost is a trade-off alongside merge sort’s predictable running time.",
        "skill": "Merge sort"
      },
      {
        "id": "23-merge-9",
        "prompt": "Does bottom-up merge sort require recursive calls?",
        "answer": "No",
        "options": [
          "No",
          "Yes, for every merge",
          "Only for odd values",
          "Only when inputs are sorted"
        ],
        "explanation": "Bottom-up merge sort can use loops over doubling run widths and iterative merging, avoiding recursive splitting.",
        "skill": "Merge sort"
      },
      {
        "id": "23-merge-10",
        "prompt": "In top-down merge sort, which input can be returned without further splitting?",
        "answer": "A list with one element",
        "options": [
          "A list with one element",
          "Any unsorted list",
          "Any list of even length",
          "Only a list of positive values"
        ],
        "explanation": "A zero- or one-element list is already sorted and provides a base case for recursive merge sort.",
        "skill": "Merge sort"
      }
    ]
  },
  {
    "id": "23-quick",
    "section": "2.3",
    "spec": "2.3.1(f)",
    "title": "Quicksort",
    "lessons": [
      82
    ],
    "page": 156,
    "questions": [
      {
        "id": "23-quick-1",
        "prompt": "What is the purpose of partitioning around a pivot in quicksort?",
        "answer": "Separate values by pivot comparison",
        "options": [
          "Separate values by pivot comparison",
          "Fully sort every value at once",
          "Merge two sorted runs",
          "Remove duplicate values"
        ],
        "explanation": "Partitioning places smaller and larger values on appropriate sides according to the chosen scheme. The side regions may still need sorting.",
        "skill": "Quicksort"
      },
      {
        "id": "23-quick-2",
        "prompt": "Using Lomuto partitioning with the final value as pivot, what is the pivot for [8, 1, 7, 3, 6]?",
        "answer": "6",
        "options": [
          "6",
          "8",
          "1",
          "7"
        ],
        "explanation": "The question specifies that the final element is chosen as the pivot, so its value is 6.",
        "skill": "Quicksort"
      },
      {
        "id": "23-quick-3",
        "prompt": "Lomuto partition scans [8, 1, 7, 3, 6] left to right, moving smaller values left and placing final pivot 6. What array results?",
        "answer": "1, 3, 6, 8, 7",
        "options": [
          "1, 3, 6, 8, 7",
          "1, 3, 6, 7, 8",
          "6, 1, 3, 8, 7",
          "8, 7, 6, 3, 1"
        ],
        "explanation": "1 moves left, then 3 moves left. Swapping pivot 6 into its boundary position gives [1,3,6,8,7]. The right partition is not yet sorted.",
        "skill": "Quicksort"
      },
      {
        "id": "23-quick-4",
        "prompt": "What is the zero-based pivot index after that partition?",
        "answer": "2",
        "options": [
          "2",
          "0",
          "1",
          "4"
        ],
        "explanation": "Two values, 1 and 3, are smaller than 6, so pivot 6 occupies index 2 after partitioning.",
        "skill": "Quicksort"
      },
      {
        "id": "23-quick-5",
        "prompt": "After the pivot is placed at its final sorted position by Lomuto partitioning, which regions need recursive sorting?",
        "answer": "The regions on either side",
        "options": [
          "The regions on either side",
          "The pivot alone",
          "Only the entire array unchanged",
          "No regions ever"
        ],
        "explanation": "The pivot is excluded from later subproblems. Each side is sorted separately when it contains more than one element.",
        "skill": "Quicksort"
      },
      {
        "id": "23-quick-6",
        "prompt": "What is ordinary quicksort’s average time complexity under suitable pivot behaviour?",
        "answer": "O(n log n)",
        "options": [
          "O(n log n)",
          "O(1)",
          "O(log n)",
          "O(2ⁿ)"
        ],
        "explanation": "Reasonably balanced partitions give logarithmic recursion depth with linear partition work per level on average.",
        "skill": "Quicksort"
      },
      {
        "id": "23-quick-7",
        "prompt": "What can quicksort’s worst-case time complexity be?",
        "answer": "O(n²)",
        "options": [
          "O(n²)",
          "O(1)",
          "O(log n)",
          "O(n)"
        ],
        "explanation": "Repeatedly creating one empty side and one nearly full side leads to quadratic total partition work.",
        "skill": "Quicksort"
      },
      {
        "id": "23-quick-8",
        "prompt": "Basic quicksort always chooses the last element on already ascending distinct data. What can happen?",
        "answer": "Repeated highly unbalanced splits",
        "options": [
          "Repeated highly unbalanced splits",
          "Every split is balanced",
          "No comparisons are required",
          "The algorithm becomes merge sort"
        ],
        "explanation": "The pivot is repeatedly the largest value, leaving n−1 values on one side. This can produce the quadratic worst case.",
        "skill": "Quicksort"
      },
      {
        "id": "23-quick-9",
        "prompt": "Why can a random pivot help quicksort?",
        "answer": "Reduce repeated bad-split risk",
        "options": [
          "Reduce repeated bad-split risk",
          "Guarantee equal partitions",
          "Remove all comparisons",
          "Guarantee constant time"
        ],
        "explanation": "Random choice makes consistently poor pivots less likely for a fixed input, but it does not make the worst case impossible.",
        "skill": "Quicksort"
      },
      {
        "id": "23-quick-10",
        "prompt": "Does in-place partitioning guarantee O(1) total auxiliary space for a recursive quicksort implementation?",
        "answer": "No, calls also use stack space",
        "options": [
          "No, calls also use stack space",
          "Yes, recursion uses no memory",
          "Yes, every pivot has one bit",
          "Only for negative values"
        ],
        "explanation": "Partitioning may use constant local storage, but pending recursive calls consume stack space. Its size depends on recursion depth and implementation.",
        "skill": "Quicksort"
      }
    ]
  },
  {
    "id": "23-dijkstra",
    "section": "2.3",
    "spec": "2.3.1(f)",
    "title": "Dijkstra’s shortest-path algorithm",
    "lessons": [
      83
    ],
    "page": 160,
    "questions": [
      {
        "id": "23-dijkstra-1",
        "prompt": "Which edge-weight condition is required by standard Dijkstra?",
        "answer": "All weights are non-negative",
        "options": [
          "All weights are non-negative",
          "All weights are negative",
          "Every weight is identical",
          "Every weight is an integer"
        ],
        "explanation": "The settling rule relies on non-negative weights. A later path through unsettled vertices must not reduce a settled shortest distance.",
        "skill": "Dijkstra’s shortest-path algorithm"
      },
      {
        "id": "23-dijkstra-2",
        "prompt": "What initial tentative distance is assigned to the start vertex?",
        "answer": "0",
        "options": [
          "0",
          "Infinity",
          "1",
          "-1"
        ],
        "explanation": "The empty path from the start to itself has cost zero. Other vertices normally begin at infinity unless already known otherwise.",
        "skill": "Dijkstra’s shortest-path algorithm"
      },
      {
        "id": "23-dijkstra-3",
        "prompt": "After processing start A, which vertex is settled next?",
        "answer": "C",
        "options": [
          "C",
          "B",
          "D",
          "A again"
        ],
        "explanation": "A’s neighbours have tentative distances C=1 and B=4. The smallest unsettled tentative distance is C=1.",
        "skill": "Dijkstra’s shortest-path algorithm",
        "table": {
          "caption": "Undirected graph · all edges and weights shown",
          "headers": [
            "From",
            "To",
            "Weight"
          ],
          "rows": [
            [
              "A",
              "B",
              "4"
            ],
            [
              "A",
              "C",
              "1"
            ],
            [
              "C",
              "B",
              "2"
            ],
            [
              "B",
              "D",
              "1"
            ],
            [
              "C",
              "D",
              "5"
            ]
          ]
        }
      },
      {
        "id": "23-dijkstra-4",
        "prompt": "What does relaxing an edge from U to V do?",
        "answer": "Test for a shorter route via U",
        "options": [
          "Test for a shorter route via U",
          "Always add one to every distance",
          "Mark every vertex settled",
          "Delete the edge"
        ],
        "explanation": "Compute dist[U] + weight(U,V), then update dist[V] and its predecessor if that route is shorter.",
        "skill": "Dijkstra’s shortest-path algorithm"
      },
      {
        "id": "23-dijkstra-5",
        "prompt": "dist[U] is 5, edge U–V has weight 3, and dist[V] is 10. What is V’s updated distance?",
        "answer": "8",
        "options": [
          "8",
          "3",
          "5",
          "10"
        ],
        "explanation": "The proposed route costs 5 + 3 = 8, which improves on 10, so V’s tentative distance becomes 8.",
        "skill": "Dijkstra’s shortest-path algorithm"
      },
      {
        "id": "23-dijkstra-6",
        "prompt": "How is the next unsettled vertex selected in standard Dijkstra?",
        "answer": "Lowest tentative distance",
        "options": [
          "Lowest tentative distance",
          "Largest edge weight",
          "Alphabetical name always",
          "Smallest heuristic alone"
        ],
        "explanation": "Dijkstra chooses the unsettled reachable vertex with the smallest known distance from the start. It does not use a heuristic.",
        "skill": "Dijkstra’s shortest-path algorithm"
      },
      {
        "id": "23-dijkstra-7",
        "prompt": "What is the shortest distance from A to D?",
        "answer": "4",
        "options": [
          "4",
          "5",
          "6",
          "8"
        ],
        "explanation": "A–C–B–D costs 1 + 2 + 1 = 4. A–B–D costs 5, and A–C–D costs 6.",
        "skill": "Dijkstra’s shortest-path algorithm",
        "table": {
          "caption": "Undirected graph · all edges and weights shown",
          "headers": [
            "From",
            "To",
            "Weight"
          ],
          "rows": [
            [
              "A",
              "B",
              "4"
            ],
            [
              "A",
              "C",
              "1"
            ],
            [
              "C",
              "B",
              "2"
            ],
            [
              "B",
              "D",
              "1"
            ],
            [
              "C",
              "D",
              "5"
            ]
          ]
        }
      },
      {
        "id": "23-dijkstra-8",
        "prompt": "Which path achieves that shortest distance from A to D?",
        "answer": "A, C, B, D",
        "options": [
          "A, C, B, D",
          "A, B, D",
          "A, C, D",
          "A, D"
        ],
        "explanation": "The given edges support A–C–B–D with total cost 4. There is no direct A–D edge.",
        "skill": "Dijkstra’s shortest-path algorithm",
        "table": {
          "caption": "Undirected graph · all edges and weights shown",
          "headers": [
            "From",
            "To",
            "Weight"
          ],
          "rows": [
            [
              "A",
              "B",
              "4"
            ],
            [
              "A",
              "C",
              "1"
            ],
            [
              "C",
              "B",
              "2"
            ],
            [
              "B",
              "D",
              "1"
            ],
            [
              "C",
              "D",
              "5"
            ]
          ]
        }
      },
      {
        "id": "23-dijkstra-9",
        "prompt": "Why store predecessor references when improving tentative distances?",
        "answer": "To reconstruct the shortest path",
        "options": [
          "To reconstruct the shortest path",
          "To sort vertex names",
          "To avoid all weight calculations",
          "To make negative edges safe"
        ],
        "explanation": "Distances supply costs. Following the predecessor chain backwards from the destination reconstructs the corresponding route.",
        "skill": "Dijkstra’s shortest-path algorithm"
      },
      {
        "id": "23-dijkstra-10",
        "prompt": "A destination remains at infinity after all reachable vertices are processed. What does that mean?",
        "answer": "No path from the start exists",
        "options": [
          "No path from the start exists",
          "Its shortest path costs zero",
          "It must be the start vertex",
          "Its name must be incorrect"
        ],
        "explanation": "An unchanged infinite distance means no route from the chosen start has been discovered because the destination is unreachable in the graph.",
        "skill": "Dijkstra’s shortest-path algorithm"
      }
    ]
  },
  {
    "id": "23-astar",
    "section": "2.3",
    "spec": "2.3.1(f)",
    "title": "A* search",
    "lessons": [
      84
    ],
    "page": 162,
    "questions": [
      {
        "id": "23-astar-1",
        "prompt": "In A*, what does g represent for a vertex?",
        "answer": "Known path cost from the start",
        "options": [
          "Known path cost from the start",
          "Estimated remaining cost",
          "The largest graph edge",
          "The number of vertex labels"
        ],
        "explanation": "g is the best currently known cost of reaching that vertex from the start. It is combined with h to rank candidates.",
        "skill": "A* search"
      },
      {
        "id": "23-astar-2",
        "prompt": "In A*, what does h estimate?",
        "answer": "Remaining cost to the goal",
        "options": [
          "Remaining cost to the goal",
          "Cost already travelled",
          "Number of sorted values",
          "Exact total cost always"
        ],
        "explanation": "h is a heuristic estimate of the cost still needed to reach the goal from the current vertex.",
        "skill": "A* search"
      },
      {
        "id": "23-astar-3",
        "prompt": "A* uses f = g + h. If g = 4 and h = 6, what is f?",
        "answer": "10",
        "options": [
          "10",
          "2",
          "4",
          "24"
        ],
        "explanation": "The estimated total cost is the known cost so far plus the estimate of the remaining cost: 4 + 6 = 10.",
        "skill": "A* search"
      },
      {
        "id": "23-astar-4",
        "prompt": "Which open vertex has the lowest A* f score?",
        "answer": "Q",
        "options": [
          "Q",
          "P",
          "R",
          "All tie"
        ],
        "explanation": "P has f=10, Q has f=8 and R has f=11. The lowest estimated total cost is Q’s.",
        "skill": "A* search",
        "table": {
          "caption": "Open vertices · f = g + h",
          "headers": [
            "Vertex",
            "g",
            "h"
          ],
          "rows": [
            [
              "P",
              "4",
              "6"
            ],
            [
              "Q",
              "7",
              "1"
            ],
            [
              "R",
              "3",
              "8"
            ]
          ]
        }
      },
      {
        "id": "23-astar-5",
        "prompt": "What is the defining property of an admissible heuristic?",
        "answer": "Never overestimates minimum cost",
        "options": [
          "Never overestimates minimum cost",
          "Always equals zero",
          "Always overestimates",
          "Always chooses the nearest vertex"
        ],
        "explanation": "An admissible heuristic never exceeds the true minimum remaining cost. It may underestimate or equal that cost.",
        "skill": "A* search"
      },
      {
        "id": "23-astar-6",
        "prompt": "The true minimum remaining cost is 7, but h is 9. What is wrong if admissibility is required?",
        "answer": "h overestimates",
        "options": [
          "h overestimates",
          "h is too small",
          "g must be zero",
          "f cannot be calculated"
        ],
        "explanation": "Since 9 exceeds the actual minimum cost of 7, this estimate violates admissibility.",
        "skill": "A* search"
      },
      {
        "id": "23-astar-7",
        "prompt": "A cheaper route reduces g from 9 to 6, while h stays 4. What is the updated f?",
        "answer": "10",
        "options": [
          "10",
          "13",
          "15",
          "4"
        ],
        "explanation": "Use the improved g when calculating f: 6 + 4 = 10. The corresponding predecessor should also be updated.",
        "skill": "A* search"
      },
      {
        "id": "23-astar-8",
        "prompt": "With h = 0 everywhere, which algorithm’s distance-based priority does A* use?",
        "answer": "Dijkstra’s",
        "options": [
          "Dijkstra’s",
          "Bubble sort’s",
          "Binary search’s",
          "Insertion sort’s"
        ],
        "explanation": "Then f = g, so candidate priority is based only on known path cost from the start, as in Dijkstra.",
        "skill": "A* search"
      },
      {
        "id": "23-astar-9",
        "prompt": "With non-negative costs and heuristic, h(goal)=0 and correct reopening on improved routes, when can admissible A* accept the goal as optimal?",
        "answer": "When selected at lowest open f",
        "options": [
          "When selected at lowest open f",
          "As soon as first discovered",
          "Before the start is expanded",
          "Whenever its name sorts first"
        ],
        "explanation": "A goal merely discovered may have a worse cost than a later route. Under the stated conditions, selecting it as the lowest-f open node supports optimal termination.",
        "skill": "A* search"
      },
      {
        "id": "23-astar-10",
        "prompt": "A* is minimising travel time. Which units should its heuristic use to be directly added to g?",
        "answer": "Time units",
        "options": [
          "Time units",
          "Distance units without conversion",
          "Vertex-name lengths",
          "A colour scale"
        ],
        "explanation": "g and h must represent the same kind of cost. A distance needs a suitable conversion or time-based bound before it can be added to a time cost.",
        "skill": "A* search"
      }
    ]
  }
];
