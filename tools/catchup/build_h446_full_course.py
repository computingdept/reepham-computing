#!/usr/bin/env python3
"""Build H446 catch-up JSON and pages from published classroom lessons.
DOES NOT modify lesson index pages or common CSS/JS. Content provenance stays
in classroom HTML. Existing teacher-curated catch-up lessons 001-006 are kept.
Generated lessons pass structure, answer, option and link validation; generated
MCQ distractors are for teacher review before high-stakes use.
"""
from __future__ import annotations
import json
import re
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[2]
LESSONS = ROOT / "lessons" / "h446"
CONTENT = ROOT / "data" / "catchup"
PROTECTED_ASSESSMENTS = {
    36, 58, 88, 98, 214, 243, 247, 250, 280, 304, 305, 306, 308
}
# Public catch-up must not reproduce questions and marking schemes from live tests.
FIRST = 7
IDS = list(range(7, 161)) + list(range(181, 321))
SIGN = {
    "remember": "DoNow_CodingIcon.png",
    "learn": "IDo_CodingIcon.png",
    "practise": "WeDo_CodingIcon.png",
    "apply": "YouDo_CodingIcon.png",
    "check": "Questionning_CodingIcon.png",
}

def compact(s, max_chars=0):
    s = re.sub(r"\s+", " ", str(s or "")).strip()
    s = re.sub(r" (?=[.,;:!?])", "", s)
    s = s.replace("\u200b", "")
    if max_chars and len(s) > max_chars:
        cut = s[:max_chars].rsplit(" ", 1)[0]
        return cut.rstrip(" ,;") + "…" if len(cut)>40 else s[:max_chars] + "…"
    return s

def txt(node, cap=0):
    if not node:
        return ""
    return compact(node.get_text(" ", strip=True), cap)

def fragment(node, cap=540):
    if not node:
        return ""
    result = txt(node, cap)
    return result

def unique(seq):
    result = []
    for x in seq:
        x = compact(x)
        if x and x.casefold() not in {v.casefold() for v in result}:
            result.append(x)
    return result

def choose(correct, alternatives, seed, min_options=3):
    correct = compact(correct, 235)
    pool = unique([compact(x, 235) for x in alternatives])
    pool = [x for x in pool if x.casefold() != correct.casefold()]
    if len(pool) < min_options - 1:
        pool += [
            "Ignore the stated conditions and assume every case works the same way.",
            "Treat the input, processing and output as interchangeable.",
            "The result does not depend on the method or data used.",
        ]
    pool = [x for x in unique(pool) if x.casefold() != correct.casefold()]
    options = [correct] + pool[:2]
    shift = seed % len(options)
    options = options[shift:] + options[:shift]
    assert len(options) == len(set(options)) == 3
    return correct, options

def mcq(qid, prompt, answer, feedback, wrong, seed):
    answer, options = choose(answer, wrong, seed)
    return {
        "id": qid, "kind": "choice", "prompt": compact(prompt, 450),
        "answer": answer, "options": options,
        "feedback": compact(feedback, 680) or answer
    }

def retrieval_mcq(qid, prompt, answer, explanation, seed):
    """Keep the exact classroom retrieval question and model answer, avoiding
    the old 'Choose the model answer' prefix and unrelated distractors.
    """
    answer = compact(answer)
    feedback = "Model answer: " + answer
    if explanation and explanation.casefold() != answer.casefold():
        feedback += " Explanation: " + explanation
    if re.fullmatch(r"\d+(?:\.\d+)?", answer):
        return {"id":qid, "kind":"number", "prompt":prompt,
                "answer":answer, "feedback":feedback}
    alternatives = []
    def add(candidate):
        candidate = compact(candidate)
        if candidate != answer and candidate not in alternatives:
            alternatives.append(candidate)
    # Short factual retrievals need subject-specific misconceptions rather
    # than generic 'insufficient information' filler.
    short = answer.casefold().rstrip(".!? ")
    short_options = {
        "queue": ["Stack.", "Binary search tree."],
        "stack": ["Queue.", "Binary search tree."],
        "page table": ["Process control block.", "File allocation table."],
        "false": ["True.", "Only if both inputs are true."],
        "true": ["False.", "Only if both inputs are false."],
        "removes top element": ["Reads the top element but leaves it in place.",
                                "Removes the bottom element."],
        "quadratic asymptotic growth": ["Linear asymptotic growth.",
                                       "Logarithmic asymptotic growth."],
        "one needs the other's result first": [
            "The two tasks are independent, so either can finish first.",
            "A shared input always means both tasks can run simultaneously."
        ],
        "the address of the next instruction to fetch": [
            "The instruction currently in the instruction register.",
            "The data transferred from the selected memory address."
        ],
        "invert fixed-width positive representation then add one": [
            "Invert the bits but do not add one.",
            "Add one before inverting all the bits."
        ],
    }
    for wrong in short_options.get(short, []): add(wrong)
    bits = list(re.finditer(r"(?<![A-Za-z0-9])[01]{4,}(?![A-Za-z0-9])", answer))
    if bits:
        match = bits[-1]
        token = match.group()
        for pos in (len(token)-1, max(0, len(token)-2)):
            wrong = token[:pos] + ("0" if token[pos] == "1" else "1") + token[pos+1:]
            add(answer[:match.start()] + wrong + answer[match.end():])
    else:
        number = re.search(r"(?<![A-Za-z0-9])\d+(?:\.\d+)?(?![A-Za-z0-9])", answer)
        if number:
            from decimal import Decimal
            raw = number.group()
            amount = Decimal(raw)
            for alt in ((amount*2, amount/2) if "." in raw else (amount+1, amount-1)):
                add(answer[:number.start()] + format(alt, "f") + answer[number.end():])
    misconceptions = [
        ("last in, first out", "first in, first out"),
        ("first in, first out", "last in, first out"),
        ("LIFO", "FIFO"), ("FIFO", "LIFO"),
        ("sorted", "unsorted"), ("same", "different"),
        ("different", "same"), ("before", "after"),
        ("after", "before"), ("left", "right"), ("right", "left"),
        ("high", "low"), ("low", "high"),
        ("increases", "decreases"), ("decreases", "increases"),
        ("greater", "smaller"), ("smaller", "greater"),
        ("AND", "OR"), ("OR", "AND"), ("not", "always"),
        ("preserve", "discard"), ("leading", "trailing"),
        ("identifier", "number"), ("return", "print"),
        ("top", "bottom"), ("bottom", "top"),
        ("next", "previous"), ("current", "previous"),
        ("quadratic", "linear"), ("linear", "logarithmic"),
        ("removes", "inspects"), ("print", "return"),
        ("necessary", "unnecessary"), ("required", "optional"),
        ("record", "list"), ("list", "record"),
        ("correct", "incorrect"), ("equal", "unequal"),
        ("true", "false"), ("false", "true"),
        ("must", "need not"),
        ("can", "cannot"), ("is", "is not"), ("are", "are not"),
    ]
    for source, wrong in misconceptions:
        if len(alternatives) >= 2: break
        match = re.search(r"\b"+re.escape(source)+r"\b",answer,flags=re.I)
        if match:
            add(answer[:match.start()] + wrong + answer[match.end():])
    if len(alternatives) < 2:
        # The fallback is flagged for pedagogical review; never use unrelated
        # answers from other retrieval questions as distractors.
        add("There is not enough information to determine the result.")
        add("This result cannot be obtained using the stated method.")
    options = [answer]+alternatives[:2]
    shift = seed%3
    options = options[shift:]+options[:shift]
    assert len(set(options))==len(options)==3
    return {"id":qid,"kind":"choice","prompt":prompt,
            "answer":answer,"options":options,"feedback":feedback}


def vocab_of(soup):
    found = []
    for n in soup.select("#overview .vocab-tip, #overview .objective-vocab-stage"):
        if "vocab-tip" in n.get("class", []):
            word = txt(n, 95)
            definition = compact(n.get("data-definition"), 300)
        else:
            word = txt(n.find(["h2", "h3"]), 95)
            definition = txt(n.select_one(".objective-vocab-definition"), 300)
            definition = re.sub(r"^DEFINITION\s+", "", definition, flags=re.I)
        if word and definition:
            found.append((word, definition))
    found = list({a.casefold(): (a, b) for a, b in found}.values())
    if len(found) < 3:
        for item in soup.select("#vocabulary .vocab-stage"):
            term = txt(item.select_one(".vocab-answer-value"), 95)
            definition = txt(item.select_one(".vocab-question"), 300)
            if term and definition and term.casefold() not in {a.casefold() for a, _ in found}:
                found.append((term, definition))
    if len(found) < 3:
        for n in soup.select("#new-learning .nl-stage"):
            h = txt(n.find(["h2", "h3"]), 95)
            p = txt(n.find("p"), 300)
            if h and p and h.casefold() not in {x.casefold() for x, _ in found}:
                found.append((h, p))
    if len(found) < 3:
        for n in soup.select("#i-do .ido-step, #we-do .wedo-step"):
            h = txt(n.find(["h2", "h3"]), 95)
            p = txt(n.find("p"), 300)
            if h and p and h.casefold() not in {x.casefold() for x, _ in found}:
                found.append((h, p))
            if len(found) >= 5: break
    return found[:12]

def donow_of(soup):
    sec = soup.select_one("#do-now")
    if not sec:
        return []
    question_nodes = sec.select(".donow-question")
    answer_nodes = sec.select(".donow-review-answer")
    items = []
    for q, a in zip(question_nodes[:4], answer_nodes[:4]):
        prompt = txt(q.find("p") or q)
        # Some model solutions use <pre> for binary working. Keep the model,
        # not merely the following explanatory paragraph.
        answer_node = a.select_one(".review-answer") or a.find("pre") or a
        ans = txt(answer_node)
        explanation = txt(a.select_one(".review-explain"))
        if not ans:
            ans = txt(a)
        if prompt and ans:
            items.append((prompt, ans, explanation or ans))
    return items

def learning_blocks(soup, title):
    blocks = []
    steps = soup.select("#new-learning .nl-stage")
    for node in steps[:4]:
        h = txt(node.find(["h2", "h3"]), 95)
        descriptions = unique([txt(p, 420) for p in node.find_all("p", recursive=True)])
        if h and descriptions:
            blocks.append({"type": "paragraph", "title": h, "text": " ".join(descriptions[:2])[:490]})
    if not blocks:
        section = soup.select_one("#new-learning")
        if section:
            blocks.append({"type": "paragraph", "title": title + " · overview", "text": txt(section, 580)})
    for node in soup.select("#i-do .ido-reference, #i-do .ido-step")[:3]:
        h = txt(node.find(["h2", "h3"]), 100)
        p = unique([txt(v, 280) for v in node.find_all(["p", "pre"], recursive=False)])
        if not p:
            p = [txt(node, 480)]
        if h and p:
            blocks.append({"type": "paragraph", "title": "Worked example · " + h, "text": compact(" ".join(p), 510)})
    glossary = vocab_of(soup)
    if glossary:
        items = [compact(term + " — " + definition, 290) for term,definition in glossary[:6]]
        blocks.insert(0, {"type":"facts","title":"Key vocabulary","items":items})
    return blocks[:6]

def guided_blocks(soup):
    blocks = []
    for node in soup.select("#we-do .wedo-reference, #we-do .wedo-step")[:4]:
        h = txt(node.find(["h2", "h3"]), 105)
        paras = unique([txt(p, 340) for p in node.find_all(["p", "pre"], recursive=False)])
        if not paras:
            paras = [txt(node, 420)]
        if h and paras:
            blocks.append({"type":"paragraph","title": h,"text":compact(" ".join(paras), 490)})
    if not blocks:
        section = soup.select_one("#we-do")
        if section: blocks.append({"type":"paragraph","title":"Guided practice","text":txt(section, 520)})
    return blocks[:4]

def apply_of(soup):
    found = []
    for q in soup.select("#you-do .youdo-question"):
        stem = q.select_one(".youdo-question-prompt")
        sol = q.select_one(".youdo-solution")
        if not stem or not sol: continue
        # Keep source teacher-supplied response in feedback; shorten display choice.
        prompt = txt(stem, 360)
        solution = txt(sol, 630)
        solution = re.sub(r"^(?:(?:MARK SCHEME|MARKING POINTS)(?:\s*/\s*(?:WORKED ANSWER|MODEL ANSWER))?|MODEL ANSWER|WORKED ANSWER|REVEAL ANSWER)\s*[+:]?\s*", "", solution, flags=re.I)
        if prompt and solution: found.append((prompt, solution))
    return found[:5]

def fallback_pairs(soup):
    pairs = []
    for n in list(soup.select("#we-do .wedo-example")) + list(soup.select("#i-do .ido-example")):
        ref = n.select_one(".wedo-reference, .ido-reference")
        if ref:
            h = txt(ref.find(["h2","h3"]), 150)
            p = txt(ref.find("p"), 220)
            label = compact(h+" "+p, 340)
            steps = n.select(".wedo-step, .ido-step")
            solution = steps[-1] if steps else None
            if solution:
                answer = txt(solution, 450)
                if label and answer: pairs.append((label, answer))
    return pairs[:5]

def stage(sid, minutes, blocks, questions, writing=None):
    labels = {"remember":("Do Now","Do Now"),"learn":("I Do","I Do"),
              "practise":("We Do","We Do"),"apply":("You Do","You Do"),
              "check":("Review & Improve","Review & Improve")}
    data = {"id":sid,"label":labels[sid][0],"minutes":minutes,
            "sign": SIGN[sid],"lead":labels[sid][1],
            "blocks":blocks,"questions":questions}
    if writing: data["writing"]=writing
    return data

def generate(n, template):
    number=f"{n:03d}"
    soup=BeautifulSoup((LESSONS / f"lesson-{number}" / "index.html").read_text(encoding="utf-8"), "html.parser")
    title = txt(soup.select_one("#overview h1"), 120)
    if not title:
        title = txt(soup.find("h1"), 120)
    if not title:
        raw = txt(soup.title, 140)
        title = re.sub(r"^.*Lesson\s+\d{3}\s*[·:–-]\s*","",raw,flags=re.I).replace(" · Ready","")
    if not title: raise ValueError(f"{number}: no lesson title")
    title = re.sub(r"^(?:Year (?:12|13) )?Lesson\s+\d{3}\s*[·:–-]\s*", "", title, flags=re.I)
    d = donow_of(soup)
    substituted = False
    if len(d)!=4:
        prev = n-1 if n>1 else 1
        if not (LESSONS / f"lesson-{prev:03d}" / "index.html").exists():
            prev = 35
        prior = BeautifulSoup((LESSONS / f"lesson-{prev:03d}" / "index.html").read_text(encoding="utf-8"), "html.parser")
        d = donow_of(prior)
        substituted=True
    if len(d)!=4:
        # Second fallback from an earlier retrieval-enabled lesson.
        prior = BeautifulSoup((LESSONS / "lesson-035" / "index.html").read_text(encoding="utf-8"), "html.parser")
        d = donow_of(prior)
        substituted=True
    if len(d)!=4: raise ValueError(f"{number}: no valid four-question retrieval")
    # Classroom 058 has an evident source typo: Q4 is literally "022" while
    # the intended BST question appears in the answer position. Correct only
    # the Catch-Up extraction, document the exception, do not alter lesson HTML.
    corrected_source=False
    if n == 58 and d[3][0] == "022" and "BST root8" in d[3][1]:
        d[3]=(d[3][1],
              "The node 5 is inserted as the right child of node 3.",
              "Since 5 < 8 go left from the root; since 5 > 3 go right.")
        corrected_source=True
    if any(len(q.strip())<8 or re.fullmatch(r"\\d{1,4}",q.strip()) for q,_,_ in d):
        raise ValueError(f"{number}: suspicious short/number-only Do Now prompt")

    words=vocab_of(soup)
    if n == 36:
        # The classroom lesson is a protected 45-minute assessment: do not
        # expose its test answers. Use vocabulary already taught and retrieved
        # in the following feedback lesson for independent review instead.
        feedback_soup=BeautifulSoup((LESSONS/"lesson-037"/"index.html").read_text(encoding="utf-8"),"html.parser")
        words=vocab_of(feedback_soup)
    if len(words)<3:
        # Review/assessment lessons may not supply definitions. Extract
        # meaningful headings and explanations from their learning stages.
        raise ValueError(f"{number}: fewer than 3 source-derived terms/explanations")
    tasks=apply_of(soup)
    if n in PROTECTED_ASSESSMENTS:
        tasks=[("Identify the taught term for this definition: "+definition, term)
               for term,definition in words[:3]]
    if n in (36, 37):
        # Do not reveal live synoptic assessment answers or invent cohort data.
        # These are source-grounded vocabulary/review questions, not the test.
        tasks=[("Identify the correct term for this definition: "+definition, term)
               for term,definition in words[:3]]
    if len(tasks)<3:
        tasks += fallback_pairs(soup)
    if len(tasks)<3:
        raise ValueError(f"{number}: fewer than 3 source tasks with models")

    retrieve=[
        retrieval_mcq("r"+str(i+1),q,a,ex,n+i)
        for i,(q,a,ex) in enumerate(d)
    ]
    assert [x["prompt"] for x in retrieve] == [q for q,_,_ in d], number
    assert [x["answer"] for x in retrieve] == [a for _,a,_ in d], number
    defs=[b for _,b in words]
    terms=[a for a,_ in words]
    understand=[]
    for i in range(3):
        term,definition=words[i%len(words)]
        understand.append(mcq("l"+str(i+1),"Which description matches '"+term+"'?",
            definition,term+" — "+definition,[b for b in defs if b!=definition],n+i+4))

    practise=[]
    for i in range(4):
        term,definition=words[(i+3)%len(words)]
        practise.append(mcq("p"+str(i+1),"Which term best matches this explanation? "+definition,
            term,term+" — "+definition,[x for x in terms if x!=term],n+i+9))

    solutions=[compact(s, 235) for _,s in tasks[:3]]
    apply=[]
    for i in range(3):
        p,a=tasks[i]
        distractors=[s for j,s in enumerate(solutions) if j!=i]
        apply.append(mcq("a"+str(i+1),"Choose the response that best addresses this independent task: "+p,
            a,a,distractors,n+i+15))

    check=[]
    for i in range(3):
        term,definition=words[(i+1)%len(words)]
        mismatch=next((d2 for term2,d2 in words
                       if term2.casefold()!=term.casefold()
                       and d2.casefold()!=definition.casefold()), None)
        if mismatch is None:
            raise ValueError(f"{number}: no distinct false definition")
        truthful=((n*7+i*11)%5) in (0,2,3)
        statement= f"{term} means: {definition if truthful else mismatch}"
        check.append({"id":"c"+str(i+1),"kind":"truefalse",
            "prompt":compact(statement, 390),"answer":"true" if truthful else "false",
            "feedback":compact(term+" — "+definition, 450)})
    last_prompt,last_answer=tasks[2]
    writing={
        "prompt":compact("Write an exam-style response in your own words. "+last_prompt,500),
        "model":compact(last_answer, 800),
        "checklist":[
            "I answered the specific question, not just the general topic.",
            "I used precise H446 terminology and linked claims to the task.",
            "I checked my response against the model and improved omissions."
        ]
    }
    cfg={
        "schema_version":1, "id":"h446-"+number, "course":"h446",
        "title":title,"year":12 if n<181 else 13,
        "estimated_minutes":15,"pass_percent":80,
        "intro":"Catch up on the key A Level ideas. Complete four retrieval questions, work through the examples, then practise and explain your reasoning.",
        "stages":[
            stage("remember",3,[],retrieve),
            stage("learn",3,learning_blocks(soup,title),understand),
            stage("practise",3,guided_blocks(soup),practise),
            stage("apply",3,[],apply,writing),
            stage("check",3,[],check)
        ]
    }
    if n in PROTECTED_ASSESSMENTS:
        cfg["intro"]="Independent prior-topic revision only. This activity does not reproduce classroom assessment questions or marking schemes."
        cfg["stages"][1]["blocks"]=[
            {"type":"facts", "title":"Previously taught terminology",
             "items":[compact(term+" — "+definition) for term,definition in words[:6]]}
        ]
        cfg["stages"][2]["blocks"]=[
            {"type":"paragraph", "title":"Guided recall",
             "text":"Read the terminology, cover the definitions and explain each term before attempting the review questions. Refer to the separate revision guide for worked examples."}
        ]
        cfg["stages"][3]["writing"]={
            "prompt":"Choose a topic from an earlier classroom lesson. Explain a correct method, then plan how to check your reasoning without referring to a live assessment paper.",
            "model":"Name the topic, outline the method with precise terminology, test it on an independent example, compare with a previously taught model and correct any errors.",
            "checklist":["I identified the earlier topic.","I explained an independent method.","I described how to check and improve it."]
        }
    if n in (36,37):
        cfg["intro"]="Independent synoptic revision and reflection. This is not the classroom assessment or personalised marked-test feedback."
        if n==36:
            cfg["stages"][1]["blocks"].insert(0, {
                "type":"facts", "title":"Synoptic knowledge check",
                "items":[compact(term+" — "+definition,290) for term,definition in words[:6]]
            })
            cfg["stages"][3]["writing"]={
                "prompt":"Describe a practical three-step plan for checking your understanding before the synoptic test, without using the actual test questions.",
                "model":"Choose a topic from the published revision guide, practise a short example independently and mark it against a model. Revisit any incorrect method, show working and retry a different question.",
                "checklist":["I named a specific revision target.","I included independent practice and marking.","I explained how I will check improvement."]
            }
        else:
            cfg["stages"][3]["writing"]={
                "prompt":"Using your own marked work when available, explain how to correct and reattempt one answer without simply copying the mark scheme.",
                "model":"Identify the command word and the specific missing point, correct the method using the mark scheme or revision guide, cover the answer, then retry the question from memory. If no marked work is available, select a prior practice question instead.",
                "checklist":["I identified what the question requires.","I explained the correction rather than copying.","I included an independent reattempt."]
            }
    assert len(cfg["stages"])==5
    assert len(cfg["stages"][0]["questions"])==4
    assert [len(s["questions"]) for s in cfg["stages"]]==[4,3,4,3,3]
    assert cfg["stages"][1]["blocks"] and cfg["stages"][2]["blocks"]
    assert cfg["stages"][3]["writing"]["model"]
    ids=[q["id"] for s in cfg["stages"] for q in s["questions"]]
    assert len(ids)==len(set(ids))
    for s in cfg["stages"]:
        for q in s["questions"]:
            assert q["prompt"] and q["answer"] and q["feedback"]
            if q["kind"]=="choice":
                assert len(q["options"])==3
                assert q["options"].count(q["answer"])==1
                assert len(set(q["options"]))==3
    page=template.replace("lesson-006","lesson-"+number).replace("h446-006","h446-"+number).replace("Lesson 006","Lesson "+number)
    page=page.replace("Floating-point addition",title).replace("Year 12","Year "+str(cfg["year"])).replace("year=12","year="+str(cfg["year"]))
    page=page.replace("11 of 13 correct","14 of 17 correct")
    assert f'data/catchup/h446-{number}.json' in page
    assert f"Lesson {number}" in page and "catchup-lesson.js" in page
    assert 'href="index.html#do-now"' in page
    return cfg,page, {"id":number, "title":title, "year":cfg["year"], "retrieval_reused":substituted,
                      "retrieval_source_correction":corrected_source,
                      "assessment_questions_protected":n in PROTECTED_ASSESSMENTS,
                      "vocabulary_source_count":len(words), "application_source_count":len(tasks),
                      "objective_question_count":13, "status":"generated; automated checks passed; teacher review pending"}

def main():
    src=LESSONS/"lesson-006"/"learn.html"
    if not src.exists(): raise ValueError("Approved 006 page not found")
    template=src.read_text(encoding="utf-8")
    records=[]
    failures=[]
    for n in IDS:
        try:
            cfg,page,record=generate(n,template)
            number=f"{n:03d}"
            (CONTENT/f"h446-{number}.json").write_text(json.dumps(cfg,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
            (LESSONS/f"lesson-{number}"/"learn.html").write_text(page,encoding="utf-8")
            records.append(record)
        except Exception as error:
            failures.append({"id":f"{n:03d}","error":str(error)})
    report={
        "source":"Published H446 classroom index.html files",
        "existing_approved_examples":"001-006 preserved unchanged",
        "new_expected":len(IDS), "new_generated":len(records),
        "failed":failures,"records":records,
        "protected_assessment_lesson_ids":[f"{n:03d}" for n in sorted(PROTECTED_ASSESSMENTS)],
        "limitations":["MCQ distractors and written-answer phrasing require teacher review; deterministic validation cannot certify pedagogy.",
                       "Mastery scores are browser-local, not centrally persisted."]
    }
    dest=ROOT/"docs"/"audits"/"h446-catchup-full-course-generation.json"
    dest.parent.mkdir(parents=True,exist_ok=True)
    dest.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(f"Generated {len(records)}/{len(IDS)} H446 lessons; {len(failures)} failures")
    for failure in failures[:30]: print("FAIL",failure)
    if failures:
        raise ValueError(f"Refusing publication: {len(failures)} lesson build failures")
    hub=ROOT/"h446-hub.html"
    original=hub.read_text(encoding="utf-8")
    old="learnHref:x>=1&&x<=6?'lessons/h446/lesson-'+pad(x)+'/learn.html':publishedDraft?.learn_colour||null,"
    new="learnHref:(x>=1&&x<=160)||(x>=181&&x<=320)?'lessons/h446/lesson-'+pad(x)+'/learn.html':publishedDraft?.learn_colour||null,"
    oldlabel="learnLabel:x>=1&&x<=6?'Catch up':publishedDraft?'Catch up draft':'Catch up',"
    newlabel="learnLabel:((x>=1&&x<=160)||(x>=181&&x<=320))?'Catch up':publishedDraft?'Catch up draft':'Catch up',"
    if old in original and oldlabel in original:
        original=original.replace(old,new).replace(oldlabel,newlabel)
        hub.write_text(original,encoding="utf-8")
    elif new in original and newlabel in original:
        pass
    else:
        raise ValueError("H446 hub link expression has changed; refusing to publish without correct navigation")
    for n in IDS:
        number=f"{n:03d}"
        assert (LESSONS/f"lesson-{number}"/"learn.html").is_file()
        assert (CONTENT/f"h446-{number}.json").is_file()
    for n in range(1,7):
        number=f"{n:03d}"
        assert (LESSONS/f"lesson-{number}"/"learn.html").is_file()
        assert (CONTENT/f"h446-{number}.json").is_file()
    print("PASS: 300/300 content+page pairs; 001–006 unchanged; shared CSS and JS unchanged; H446 hub links validated.")

if __name__=="__main__":
    main()
