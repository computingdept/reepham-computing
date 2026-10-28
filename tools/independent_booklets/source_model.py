"""Grounded, conservative source extraction for independent booklet DRAFTS.

No generated model answers, invented questions, or automatic lesson rewrites.
Original Teach lessons are read-only inputs. This module never publishes files.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
import json
import re
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[2]
JROOT = ROOT / "lessons" / "j277"
HROOT = ROOT / "lessons" / "h446"

GUIDES = {
    "j277": {
        "1": "revision/j277/guides/J277_Paper_1_Revision_Guide_AP1_Aligned.pdf",
        "2": "revision/j277/guides/J277_Paper_2_Revision_Guide_AP1_Aligned.pdf",
    },
    "h446": {
        "1": "revision/h446/guides/H446_Paper_1_CORRECTED_DRAFT_2026-10-21.pdf",
        "2": "revision/h446/guides/H446_Paper_2_REVIEW_READY_2026-10-21.pdf",
    },
}


@dataclass
class Lesson:
    course: str
    number: int
    title: str = ""
    spec: str = ""
    sources: list[str] = field(default_factory=list)
    do_now: list[tuple[str, str]] = field(default_factory=list)
    vocab: list[tuple[str, str]] = field(default_factory=list)
    new_learning: list[str] = field(default_factory=list)
    model_question: str = ""
    model_steps: list[str] = field(default_factory=list)
    guided: list[tuple[str, str]] = field(default_factory=list)
    code_first: dict = field(default_factory=dict)
    you_do: list[tuple[str, str]] = field(default_factory=list)
    exit_question: str = ""
    exit_answer: str = ""
    warnings: list[str] = field(default_factory=list)
    missing: list[str] = field(default_factory=list)
    visual_count: int = 0
    is_assessment: bool = False

    @property
    def label(self):
        return f"{self.course.upper()}-{self.number:03d}"

    def source(self, path: Path):
        self.sources.append(str(path.relative_to(ROOT)).replace("\\", "/"))

    def validate(self):
        checks = [
            (len(self.do_now) == 4, "four_do_now_questions"),
            (len(self.do_now) == 4 and all(q and a for q, a in self.do_now), "four_do_now_model_answers"),
            (len(self.vocab) >= 3, "at_least_three_vocabulary_terms"),
            (bool(self.new_learning), "new_learning"),
            (bool(self.model_question and self.model_steps), "i_do_worked_model"),
            (bool(self.guided), "we_do_guided_practice"),
            (bool(self.you_do), "you_do_questions"),
            (bool(self.you_do) and all(q and a for q, a in self.you_do), "you_do_model_answers"),
            (bool(self.exit_question and self.exit_answer), "exit_ticket_and_answer"),
        ]
        if self.course == "j277":
            checks.append((bool(self.code_first.get("question") and self.code_first.get("answer")), "code_first_and_model"))
        self.missing = [name for ok, name in checks if not ok]
        if self.visual_count:
            self.warnings.append(f"{self.visual_count} original diagram/image element(s) require visual teacher audit; not embedded")
        return self


def clean(value) -> str:
    return re.sub(r"\s+", " ", str(value or "")).strip()


def blocks(node, limit=0):
    """Extract real text and code in source order, without SVG labels or UI furniture."""
    if node is None:
        return []
    allowed = {"h2", "h3", "p", "li", "pre"}
    ignored = {"teacher-cue", "phase-tag", "success-check", "ready-badge", "classroom-marks",
               "exit-confidence-choice", "nl-stage-count", "ido-example-count", "wedo-example-count",
               "vocab-test-label", "answer-heading", "review-number", "step-count"}
    out = []
    for el in node.descendants:
        if getattr(el, "name", None) not in allowed:
            continue
        if el.find_parent(["svg", "script", "style", "pre"]):
            continue
        if el.name == "p" and el.find_parent("li"):
            continue
        if any(cls in ignored for cls in el.get("class", [])):
            continue
        if any(any(cls in ignored for cls in p.get("class", [])) for p in el.parents if getattr(p, "name", None)):
            continue
        value = el.get_text("\n" if el.name == "pre" else " ", strip=True)
        value = value.strip() if el.name == "pre" else clean(value)
        if not value or value in out:
            continue
        if el.name == "pre":
            value = "CODE:\n" + value
        out.append(value)
    return out[:limit] if limit else out


def pair_items(raw):
    out = []
    for row in raw or []:
        if isinstance(row, (list, tuple)) and len(row) >= 2:
            out.append((clean(row[0]), clean(row[1])))
        elif isinstance(row, dict):
            out.append((clean(row.get("question") or row.get("q")), clean(row.get("answer") or row.get("a"))))
    return out


def j277_source(number: int, donow: dict, code_master: dict) -> Lesson:
    lesson = Lesson("j277", number)
    if 4 <= number <= 18:
        group = "004-008" if number <= 8 else "009-013" if number <= 13 else "014-018"
        source = JROOT / f"autumn1-{group}.json"
    else:
        source = JROOT / f"autumn2-{number:03d}.json"
    lesson.source(source)
    data = json.loads(source.read_text(encoding="utf-8"))[f"{number:03d}"]
    lesson.title = clean(data.get("t")) or f"Lesson {number:03d}"
    lesson.is_assessment = bool(data.get("isAssessment"))
    if lesson.is_assessment:
        lesson.warnings.append("ASSESSMENT: teacher-only draft; do not distribute model answers with a pupil paper")
    lesson.spec = clean(data.get("s"))
    lesson.source(JROOT / f"lesson-{number:03d}" / "index.html")

    bank = (donow.get("lessons") or {}).get(f"{number:03d}", {})
    questions = bank.get("questions", [])
    lesson.source(JROOT / "donow-bank-20261020.json")
    if len(questions) == 4:
        lesson.do_now = []
        for q in questions:
            prompt = clean(q.get("question"))
            if q.get("options"):
                prompt += "\n" + "\n".join(f"{chr(65+i)}. {clean(opt)}" for i, opt in enumerate(q["options"]))
            answer = clean(q.get("answer") or q.get("explanation"))
            lesson.do_now.append((prompt, answer))
    else:
        lesson.do_now = pair_items(data.get("r"))
        lesson.warnings.append("retrieval_bank_missing_or_incomplete: source lesson questions used")

    lesson.vocab = pair_items(data.get("v"))
    lesson.new_learning = [
        (clean(x[0]) + ": " + clean(x[1])).strip(": ")
        for x in (data.get("c") or [])
        if isinstance(x, (list, tuple)) and len(x) >= 2
    ]
    m = data.get("m") or {}
    lesson.model_question = clean(m.get("q") or m.get("title"))
    lesson.model_steps = [clean(s) for s in m.get("st", []) if clean(s)]
    lesson.guided = pair_items(data.get("w"))

    master = (code_master.get("lessons") or {}).get(f"{number:03d}")
    if master and master.get("starter") and master.get("model"):
        lesson.source(JROOT / "code-first-master-20261021.json")
        lesson.code_first = {
            "question": clean(master.get("task")),
            "starter": master.get("starter", ""),
            "steps": [clean(master.get("focus_stage"))] if master.get("focus_stage") else [],
            "answer": clean(master.get("expected")),
            "model": master.get("model", ""),
        }
    else:
        k = data.get("k") or {}
        lesson.code_first = {
            "question": clean(k.get("q")),
            "starter": k.get("code", ""),
            "steps": [clean(s) for s in k.get("p", []) if clean(s)],
            "answer": clean(k.get("a")),
            "model": "",
        }
        lesson.warnings.append("Code First master unavailable; original lesson task used")

    lesson.you_do = pair_items(data.get("e"))
    x = data.get("x")
    if isinstance(x, (list, tuple)) and len(x) >= 2:
        lesson.exit_question = clean(x[0])
        lesson.exit_answer = ("True" if x[1] else "False") if isinstance(x[1], bool) else clean(x[1])
    elif isinstance(x, dict):
        lesson.exit_question = clean(x.get("question"))
        lesson.exit_answer = clean(x.get("answer"))
    if data.get("vis") or data.get("visuals") or data.get("idoVisual") or data.get("wVisuals"):
        lesson.visual_count = 1
    if data.get("year11") and data.get("challenge"):
        lesson.warnings.append("Year 11 challenge activities may require manual addition from source")
    guide = GUIDES["j277"].get(lesson.spec[:1])
    if guide:
        lesson.sources.append(guide)
        lesson.warnings.append("Revision guide referenced, not automatically cross-verified")
    return lesson.validate()


def h446_source(number: int) -> Lesson:
    lesson = Lesson("h446", number)
    source = HROOT / f"lesson-{number:03d}" / "index.html"
    lesson.source(source)
    soup = BeautifulSoup(source.read_text(encoding="utf-8"), "html.parser")
    title = soup.select_one("#overview h1")
    if title:
        lesson.title = clean(title.get_text(" ", strip=True))
    if not lesson.title:
        raw = clean(soup.title.get_text(" ", strip=True)) if soup.title else ""
        lesson.title = re.sub(r"^Lesson\s+\d+\s*[·:—-]\s*", "", raw)
        lesson.title = re.sub(r"\s*[·:—-]\s*Ready.*$", "", lesson.title, flags=re.I)
    lesson.title = lesson.title or f"Lesson {number:03d}"
    lesson.is_assessment = bool(re.search(r"\b(?:synoptic test|assessment|mock examination|test feedback)\b", lesson.title, re.I))
    if lesson.is_assessment:
        lesson.warnings.append("ASSESSMENT/FEEDBACK: teacher-only source; not an independent pupil booklet")
    footer = soup.select_one(".lesson-footer")
    info = clean(footer.get_text(" ", strip=True)) if footer else ""
    meta = soup.select_one('meta[name="description"]')
    description = clean(meta.get("content", "")) if meta else ""
    matches = re.findall(r"\b[12]\.\d+\.\d+(?:\([a-z]\))?", info + " " + description)
    lesson.spec = matches[0] if matches else "mixed"

    dn = soup.select("#do-now .donow-questions article.donow-question")
    ans = soup.select("#do-now .donow-review .donow-review-answer")
    for i, node in enumerate(dn):
        prompt = node.select_one("p")
        q = clean(prompt.get_text(" ", strip=True)) if prompt else clean(node.get_text(" ", strip=True))
        if i < len(ans):
            a = clean(ans[i].get_text(" ", strip=True))
            a = re.sub(r"^(?:MODEL )?ANSWER\s*", "", a, flags=re.I)
        else:
            a = ""
        lesson.do_now.append((q, a))
    if len(dn) != 4 or len(ans) != 4:
        lesson.warnings.append(f"Do Now source has {len(dn)} questions and {len(ans)} answer panels")

    for node in soup.select("#vocabulary .vocab-stage"):
        term = node.select_one("h2")
        definition = node.select_one(".vocab-answer-value") or node.select_one("p")
        if term and definition:
            pair = (clean(term.get_text(" ", strip=True)), clean(definition.get_text(" ", strip=True)))
            if pair not in lesson.vocab:
                lesson.vocab.append(pair)
    if len(lesson.vocab) < 3:
        for node in soup.select("#overview .vocab-card, #overview .vocab-item"):
            parts = blocks(node)
            if len(parts) >= 2 and (parts[0], parts[1]) not in lesson.vocab:
                lesson.vocab.append((parts[0], parts[1]))

    stages = soup.select("#new-learning .nl-stage")
    for node in stages:
        parts = blocks(node)
        if parts:
            lesson.new_learning.append(" — ".join(parts[:3]))
    if not lesson.new_learning:
        lesson.new_learning = blocks(soup.select_one("#new-learning"), limit=8)
    if len(lesson.new_learning) > 8:
        lesson.new_learning = lesson.new_learning[:8]
        lesson.warnings.append("New learning condensed to first eight source steps")

    ido = soup.select_one("#i-do")
    qnode = ido.select_one(".ido-reference h2") if ido else None
    qnode = qnode or (ido.select_one("h2") if ido else None)
    lesson.model_question = clean(qnode.get_text(" ", strip=True)) if qnode else ""
    step_nodes = ido.select(".ido-step") if ido else []
    if step_nodes:
        for node in step_nodes:
            text = " — ".join(blocks(node))
            if text:
                lesson.model_steps.append(text)
    else:
        lesson.model_steps = blocks(ido, limit=13)
    if len(lesson.model_steps) > 13:
        lesson.model_steps = lesson.model_steps[:13]
        lesson.warnings.append("I Do condensed to thirteen source steps")
    if not lesson.model_question and lesson.model_steps:
        lesson.model_question = lesson.model_steps[0]

    wedo = soup.select_one("#we-do")
    guided_parts = blocks(wedo, limit=18)
    if guided_parts:
        lesson.guided = [(part, "") for part in guided_parts]
    if len(blocks(wedo)) > 18:
        lesson.warnings.append("We Do condensed to eighteen source blocks")

    question_nodes = soup.select("#you-do article.youdo-question")
    if not question_nodes:
        question_nodes = soup.select("#you-do article.exam-card")
    for node in question_nodes:
        prompt = node.select_one(".youdo-question-prompt") or node
        # Some newer lessons place the correct answer inside a <details>
        # reveal, rather than a .youdo-solution. Never leak that answer into
        # the pupil-facing question before the Exit Ticket.
        answer = ""
        sol = node.select_one(".youdo-solution")
        if sol:
            answer = "\n".join(blocks(sol))
        if not answer:
            for detail in node.select("details"):
                summary = detail.select_one("summary")
                heading = clean(summary.get_text(" ", strip=True)) if summary else ""
                if not re.search(r"\b(?:model answer|reveal.*answer|solution)\b", heading, re.I):
                    continue
                answer_copy = BeautifulSoup(str(detail), "html.parser")
                for heading_node in answer_copy.select("summary"):
                    heading_node.decompose()
                answer = "\n".join(blocks(answer_copy))
                if answer:
                    break
        prompt_copy = BeautifulSoup(str(prompt), "html.parser")
        for hidden_solution in prompt_copy.select(".youdo-solution, .answer-reveal, .answer-content"):
            hidden_solution.decompose()
        for detail in prompt_copy.select("details"):
            summary = detail.select_one("summary")
            heading = clean(summary.get_text(" ", strip=True)) if summary else ""
            if re.search(r"\b(?:model answer|reveal.*answer|solution)\b", heading, re.I):
                detail.decompose()
        qparts = blocks(prompt_copy, limit=0)
        q = "\n".join(qparts)
        if q:
            lesson.you_do.append((q, answer))
        if re.search(r"teacher approval|teacher check|\.NET Fiddle|Turn & Talk|mini-whiteboard", q, re.I):
            lesson.warnings.append("teacher-dependent You Do prompt: adapt before independent use")

    if lesson.you_do and any(not a for _, a in lesson.you_do):
        answer_path = HROOT / f"lesson-{number:03d}" / "answers.html"
        if answer_path.exists():
            lesson.source(answer_path)
            answers = BeautifulSoup(answer_path.read_text(encoding="utf-8"), "html.parser")
            stages = answers.select(".answer-stage")
            found = []
            for stage in stages:
                solution = (stage.select_one(".answer-solution") or stage.select_one(".solution-card")
                            or stage.select_one(".answer-card"))
                found.append("\n".join(blocks(solution)) if solution else "")
            if len(found) == len(lesson.you_do) and all(found):
                lesson.you_do = [(q, a or found[i]) for i, (q, a) in enumerate(lesson.you_do)]
            else:
                lesson.warnings.append(f"Separate answers page not safely aligned ({len(found)} answer stages; {len(lesson.you_do)} questions)")

    exit_section = soup.select_one("#exit")
    if exit_section:
        question = exit_section.select_one(".exit-check-question")
        if not question:
            first_stage = exit_section.select_one(".exit-stage")
            question = first_stage.select_one("p") if first_stage else None
        if question:
            lesson.exit_question = clean(question.get_text(" ", strip=True))
        correct = exit_section.get("data-exit-correct")
        explanation = clean(exit_section.get("data-exit-explanation", ""))
        if correct in ("yes", "no", "true", "false"):
            lesson.exit_answer = ("True" if correct in ("yes", "true") else "False") + (". " + explanation if explanation else "")
        if not lesson.exit_answer:
            feedback = exit_section.select_one(".exit-feedback p")
            if feedback:
                lesson.exit_answer = clean(feedback.get_text(" ", strip=True))
        if not lesson.exit_answer:
            stages = exit_section.select(".exit-stage")
            if len(stages) > 1:
                second = stages[1].select_one("p")
                if second:
                    lesson.exit_answer = clean(second.get_text(" ", strip=True))
    lesson.visual_count = len(soup.select("#new-learning svg, #i-do svg, #we-do svg, #new-learning img, #i-do img, #we-do img"))
    guide = GUIDES["h446"].get(lesson.spec[:1])
    if guide:
        lesson.sources.append(guide)
        lesson.warnings.append("Revision guide referenced, not automatically cross-verified")
    return lesson.validate()


def hub_map(course: str):
    """Only student-facing lesson routes actually linked by the relevant hub."""
    html = (ROOT / f"{course}-hub.html").read_text(encoding="utf-8")
    match = re.search(r"const\s+liveMap\s*=\s*\{(.*?)\}\s*;", html, re.S)
    if not match:
        raise ValueError(f"No liveMap found in {course} hub")
    result = {}
    for m in re.finditer(r"(?:(?:\"(\d+)\")|(\d+))\s*:\s*['\"](lessons/[^'\"]+/index\.html)['\"]", match.group(1)):
        number = int(m.group(1) or m.group(2))
        result[number] = m.group(3)
    if not result:
        raise ValueError(f"No student-facing lessons found in {course} hub")
    return result
