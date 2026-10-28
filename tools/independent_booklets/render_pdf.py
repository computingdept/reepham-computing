"""Shared ReportLab PDF layout and A3 imposition for unapproved lesson drafts.

Every PDF is explicitly DRAFT. Overflow creates additional A4 pages instead
of reducing font size. No source lesson HTML/CSS/JS is modified.
"""
from __future__ import annotations

from pathlib import Path
import html
import re
import textwrap

import fitz
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A3, A4, landscape
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, PageBreak,
    NextPageTemplate, Spacer, Table, TableStyle, HRFlowable,
)

INK = colors.HexColor("#182A28")
GREEN = colors.HexColor("#14543E")
BLUE = colors.HexColor("#E7F0F5")
RULE = colors.HexColor("#C3CDD0")
GREY = colors.HexColor("#4B575B")
WHITE = colors.white
FONT = "Helvetica"
BOLD = "Helvetica-Bold"
MONO = "Courier"
FONTS_READY = False


def set_palette(mode):
    """Use real monochrome inks for B&W; never communicate meaning by colour alone."""
    global GREEN, BLUE
    if mode == "bw":
        GREEN = colors.HexColor("#303030")
        BLUE = colors.HexColor("#F5F5F5")
    else:
        GREEN = colors.HexColor("#14543E")
        BLUE = colors.HexColor("#E7F0F5")


def register_fonts():
    global FONT, BOLD, MONO, FONTS_READY
    if FONTS_READY:
        return
    options = [
        ("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
         "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
         "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"),
        ("/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf",
         "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf",
         "/usr/share/fonts/truetype/liberation2/LiberationMono-Regular.ttf"),
    ]
    for regular, bold, mono in options:
        if all(Path(x).exists() for x in (regular, bold, mono)):
            pdfmetrics.registerFont(TTFont("BookletSans", regular))
            pdfmetrics.registerFont(TTFont("BookletSans-Bold", bold))
            pdfmetrics.registerFont(TTFont("BookletMono", mono))
            pdfmetrics.registerFontFamily("BookletSans", normal="BookletSans", bold="BookletSans-Bold")
            FONT, BOLD, MONO = "BookletSans", "BookletSans-Bold", "BookletMono"
            break
    FONTS_READY = True


def styles(large=False):
    register_fonts()
    body = 14 if large else 12
    return {
        "title": ParagraphStyle("LessonTitle", fontName=BOLD, fontSize=18 if not large else 20,
                                leading=24 if not large else 27, textColor=GREEN, spaceAfter=9),
        "h1": ParagraphStyle("PhaseHeading", fontName=BOLD, fontSize=15 if not large else 17,
                             leading=20 if not large else 23, textColor=GREEN, spaceBefore=8, spaceAfter=9),
        "h2": ParagraphStyle("Subheading", fontName=BOLD, fontSize=12.2 if not large else 15,
                             leading=17 if not large else 20, textColor=INK, spaceBefore=7, spaceAfter=5),
        "body": ParagraphStyle("StudentBody", fontName=FONT, fontSize=body, leading=body*1.42,
                               textColor=INK, spaceAfter=7, splitLongWords=1),
        "question": ParagraphStyle("Question", fontName=FONT, fontSize=body, leading=body*1.44,
                                   textColor=INK, spaceBefore=3, spaceAfter=6, splitLongWords=1),
        "answer": ParagraphStyle("ModelAnswer", fontName=FONT, fontSize=body, leading=body*1.43,
                                 textColor=INK, leftIndent=9, spaceAfter=7, splitLongWords=1),
        "code": ParagraphStyle("CodeBlock", fontName=MONO, fontSize=10 if not large else 12,
                               leading=15 if not large else 18, textColor=INK,
                               leftIndent=7, spaceBefore=5, spaceAfter=8,
                               splitLongWords=1, allowWidows=0, allowOrphans=0),
        "small": ParagraphStyle("Small", fontName=FONT, fontSize=10 if not large else 12,
                                leading=14 if not large else 17, textColor=GREY, spaceAfter=7),
        "label": ParagraphStyle("Label", fontName=BOLD, fontSize=11 if not large else 13,
                                leading=16 if not large else 18, textColor=GREEN, spaceBefore=5, spaceAfter=5),
    }


def esc(text):
    return html.escape(str(text or ""), quote=False)


def p(text, style, preserve=False):
    text = str(text or "")
    if preserve:
        lines = []
        for raw in text.splitlines() or [""]:
            # Long code lines wrap rather than overflow the print area.
            code_width = 65 if style.fontSize >= 12 else 78
            parts = textwrap.wrap(raw, width=code_width, subsequent_indent="  ",
                                  replace_whitespace=False, drop_whitespace=False,
                                  break_long_words=True, break_on_hyphens=False) or [""]
            for part in parts:
                lines.append(esc(part).replace(" ", "&nbsp;"))
        markup = "<br/>".join(lines)
    else:
        markup = "<br/>".join(esc(line) for line in text.splitlines())
    return Paragraph(markup or " ", style)


def append_text(story, text, st):
    if not text:
        return
    if str(text).startswith("CODE:\n"):
        story.append(p(str(text)[6:], st["code"], preserve=True))
    else:
        story.append(p(text, st["body"]))


def ruled_lines(story, width, count, large=False):
    height = 22 if large else 19
    rows = [[" "] for _ in range(max(1, count))]
    table = Table(rows, colWidths=[width], rowHeights=[height] * len(rows), hAlign="LEFT", splitByRow=1)
    rules = [("LINEBELOW", (0, i), (0, i), 0.55, RULE) for i in range(len(rows))]
    table.setStyle(TableStyle(rules + [("LEFTPADDING", (0,0),(-1,-1), 0),
                                       ("RIGHTPADDING", (0,0),(-1,-1), 0),
                                       ("TOPPADDING", (0,0),(-1,-1), 0),
                                       ("BOTTOMPADDING", (0,0),(-1,-1), 0)]))
    story.append(table)
    story.append(Spacer(1, 7))


def header_footer(canvas, doc, lesson, phase):
    canvas.saveState()
    w, h = A4
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(.6)
    canvas.setFont(BOLD, 8.4)
    canvas.setFillColor(GREEN)
    canvas.drawString(37, h-27, f"RHS COMPUTING  /  OCR {lesson.course.upper()}  /  {lesson.spec or 'SPEC TO CHECK'}")
    canvas.setFillColor(GREY)
    canvas.drawRightString(w-37, h-27, f"LESSON {lesson.number:03d}   ·   DRAFT")
    canvas.line(37, h-34, w-37, h-34)
    # Two different pictograms: writing pen and pen with a tick. Never rely on colour alone.
    canvas.setStrokeColor(INK)
    canvas.setLineWidth(1.5)
    canvas.line(40, h-50, 49, h-41)
    canvas.line(44, h-54, 53, h-45)
    canvas.setFont(BOLD, 8.6)
    canvas.setFillColor(INK)
    canvas.drawString(59, h-47, "BLACK PEN")
    canvas.setFont(FONT, 8.2)
    canvas.drawString(121, h-47, "Answer all questions first.")
    canvas.line(330, h-50, 339, h-41)
    canvas.line(334, h-54, 343, h-45)
    canvas.line(343, h-50, 346, h-53)
    canvas.line(346, h-53, 352, h-44)
    canvas.setFont(BOLD, 8.6)
    canvas.drawString(357, h-47, "GREEN PEN")
    canvas.setFont(FONT, 7.5)
    canvas.drawString(419, h-47, "Then: tick and rewrite mistakes.")
    canvas.setStrokeColor(RULE)
    canvas.line(37, h-62, w-37, h-62)

    stages = [
        ("Do Now", "Recall previous learning", "recall"),
        ("I Do", "Read new knowledge", "learn"),
        ("We Do", "Practise with guidance", "learn"),
        ("You Do", "Work independently", "practice"),
        ("Review & Improve", "Check understanding", "review"),
    ]
    left, right = 37, w-37
    tile_w = (right-left)/5
    for i, (label, purpose, target) in enumerate(stages):
        x = left + i*tile_w
        active = target == phase
        canvas.setFillColor(BLUE if active else WHITE)
        canvas.setStrokeColor(GREEN if active else RULE)
        canvas.roundRect(x+2, 35, tile_w-4, 27, 4, stroke=1, fill=1)
        canvas.setFillColor(INK)
        canvas.setFont(BOLD, 7.8 if len(label)<13 else 7.2)
        canvas.drawCentredString(x+tile_w/2, 51, label)
        canvas.setFont(FONT, 6.3)
        canvas.drawCentredString(x+tile_w/2, 40, purpose)
    canvas.setFont(FONT, 7.5)
    canvas.setFillColor(GREY)
    canvas.drawString(37, 22, "DRAFT · Teacher review required before pupil use")
    canvas.drawRightString(w-37, 22, f"Page {doc.page}")
    canvas.restoreState()


def make_doc(path, lesson, large=False):
    width, height = A4
    frame = Frame(38, 77, width-76, height-151, leftPadding=0, rightPadding=0,
                  topPadding=0, bottomPadding=0, showBoundary=0)
    doc = BaseDocTemplate(str(path), pagesize=A4, pageTemplates=[],
                          title=f"DRAFT OCR {lesson.course.upper()} Lesson {lesson.number:03d} {lesson.title}",
                          author="RHS Computing · automatically sourced draft", allowSplitting=1,
                          pageCompression=1)
    for phase in ("recall", "learn", "practice", "review"):
        doc.addPageTemplates(PageTemplate(id=phase, frames=[frame],
                             onPage=lambda c, d, phase=phase: header_footer(c, d, lesson, phase)))
    return doc


def phase(story, name, st):
    story.append(NextPageTemplate(name))
    story.append(PageBreak())


def question(story, number, prompt, st, width, lines=2, large=False):
    story.append(p(f"Q{number}. {prompt}", st["question"]))
    ruled_lines(story, width, lines, large)


def model_answer(story, number, answer, st):
    story.append(p(f"Q{number}. {answer}", st["answer"]))
    story.append(HRFlowable(width="100%", thickness=.4, color=RULE, spaceBefore=1, spaceAfter=6))


def build_a4(path: Path, lesson, large=False, mode="colour"):
    set_palette(mode)
    st = styles(large)
    width = A4[0] - 76
    story = []

    # PAGE GROUP 1 — RETRIEVAL
    story.append(p(f"LESSON {lesson.number:03d} · {lesson.title}", st["title"]))
    story.append(p("Name: _____________________   Class: __________   Date: __________", st["small"]))
    story.append(p("Work through the pages in order. Answer in BLACK PEN first. Check in GREEN PEN only after the Exit Ticket.", st["body"]))
    story.append(p("Do Now · Recall previous learning", st["h1"]))
    for i, (prompt, _) in enumerate(lesson.do_now, 1):
        question(story, i, prompt, st, width, lines=1 if len(prompt)<115 else 2, large=large)

    # PAGE GROUP 2 — LEARN + GUIDED
    phase(story, "learn", st)
    story.append(p("I Do · Read new knowledge", st["h1"]))
    if lesson.vocab:
        story.append(p("Key vocabulary", st["h2"]))
        for term, definition in lesson.vocab[:7]:
            append_text(story, f"{term} — {definition}", st)
    story.append(p("New learning", st["h2"]))
    for item in lesson.new_learning:
        append_text(story, item, st)
    story.append(p("Worked example", st["h2"]))
    append_text(story, lesson.model_question, st)
    for i, item in enumerate(lesson.model_steps, 1):
        append_text(story, f"{i}. {item}", st)
    story.append(p("We Do · Practise with guidance", st["h1"]))
    if lesson.course == "j277":
        for i, (prompt, answer) in enumerate(lesson.guided, 1):
            story.append(p(f"Guided {i}", st["label"]))
            append_text(story, prompt, st)
            if answer:
                append_text(story, f"Worked method: {answer}", st)
    else:
        for item, answer in lesson.guided:
            append_text(story, item, st)
            if answer:
                append_text(story, answer, st)

    # PAGE GROUP 3 — INDEPENDENT + EXIT, ALL BEFORE ANSWERS
    phase(story, "practice", st)
    story.append(p("You Do · Work independently", st["h1"]))
    story.append(p("BLACK PEN: Write your own answers. Do not look at the Review & Improve pages yet.", st["small"]))
    if lesson.course == "j277" and lesson.code_first:
        story.append(p("Code First · Predict → Write → Test → Improve", st["h2"]))
        append_text(story, lesson.code_first.get("question", ""), st)
        if lesson.code_first.get("starter"):
            story.append(p(lesson.code_first["starter"], st["code"], preserve=True))
        for step in lesson.code_first.get("steps", []):
            append_text(story, step, st)
        ruled_lines(story, width, 3, large)
    for i, (prompt, _) in enumerate(lesson.you_do, 1):
        story.append(p(f"Question {i}", st["h2"]))
        append_text(story, prompt, st)
        nlines = 4 if len(prompt) > 240 or "explain" in prompt.lower() else 3
        ruled_lines(story, width, nlines, large)
    story.append(p("Exit Ticket · Answer before checking", st["h1"]))
    append_text(story, lesson.exit_question or "[Source has no Exit Ticket question]", st)
    ruled_lines(story, width, 2, large)

    # PAGE GROUP 4 — ANSWERS, NEVER BEFORE EXIT
    phase(story, "review", st)
    story.append(p("Review & Improve · GREEN PEN", st["h1"]))
    story.append(p("Now change to GREEN PEN. Find each original question. Tick correct answers; read the model and rewrite mistakes.", st["body"]))
    story.append(p("Page 1 onwards · Do Now", st["h2"]))
    for i, (_, answer) in enumerate(lesson.do_now, 1):
        model_answer(story, i, answer or "[No source model answer — teacher review required]", st)
    if lesson.course == "j277" and lesson.guided:
        story.append(p("I Do / We Do pages · Guided practice", st["h2"]))
        for i, (_, answer) in enumerate(lesson.guided, 1):
            if answer:
                model_answer(story, i, answer, st)
    if lesson.course == "j277" and lesson.code_first:
        story.append(p("You Do pages · Code First", st["h2"]))
        if lesson.code_first.get("model"):
            story.append(p(lesson.code_first["model"], st["code"], preserve=True))
        append_text(story, "Expected result: " + lesson.code_first.get("answer", ""), st)
    story.append(p("You Do pages · Independent questions", st["h2"]))
    for i, (_, answer) in enumerate(lesson.you_do, 1):
        model_answer(story, i, answer or "[No source model answer — teacher review required]", st)
    story.append(p("Exit Ticket · Model answer", st["h2"]))
    append_text(story, lesson.exit_answer or "[No source model answer — teacher review required]", st)
    story.append(p("Try the question again", st["h1"]))
    append_text(story, "Choose one question you got wrong. All correct? Choose the hardest.", st)
    story.append(p("1. Copy the whole original question:", st["label"]))
    ruled_lines(story, width, 2, large)
    story.append(p("2. Write a complete new answer in GREEN PEN. Show working if needed:", st["label"]))
    ruled_lines(story, width, 5, large)

    doc = make_doc(path, lesson, large)
    doc.build(story)
    with fitz.open(str(path)) as pdf:
        pages = len(pdf)
        if pages < 4:
            raise RuntimeError(f"Only {pages} pages: missing required page groups")
        all_text = "\n".join(page.get_text() for page in pdf)
        required = ["BLACK PEN", "GREEN PEN", "Do Now", "I Do", "We Do", "You Do", "Exit Ticket", "Review & Improve"]
        absent = [token for token in required if token not in all_text]
        if absent:
            raise RuntimeError(f"PDF extraction missing {absent}")
        for page in pdf:
            if abs(page.rect.width - A4[0]) > 1 or abs(page.rect.height - A4[1]) > 1:
                raise RuntimeError("Incorrect A4 page size")
    return pages


def impose_a3(a4_path: Path, a3_path: Path):
    """2-up A3 landscape, fold/duplex booklet order, padded to a multiple of four."""
    with fitz.open(str(a4_path)) as source:
        count = len(source)
        padded = list(range(count)) + [None] * ((-count) % 4)
        n = len(padded)
        sheet_pdf = fitz.open()
        a3w, a3h = landscape(A3)
        half = a3w / 2
        for sheet in range(n // 4):
            front = (padded[n - 1 - 2 * sheet], padded[2 * sheet])
            back = (padded[2 * sheet + 1], padded[n - 2 - 2 * sheet])
            for pair in (front, back):
                page = sheet_pdf.new_page(width=a3w, height=a3h)
                for index, rect in zip(pair, (fitz.Rect(0, 0, half, a3h),
                                               fitz.Rect(half, 0, a3w, a3h))):
                    if index is not None:
                        page.show_pdf_page(rect, source, index)
        sheet_pdf.set_metadata({"title": f"DRAFT A3 booklet · {a4_path.stem}",
                                "subject": "Print A3 landscape, duplex, flip short edge; fold"})
        sheet_pdf.save(str(a3_path), garbage=3, deflate=True)
        spreads = len(sheet_pdf)
        sheet_pdf.close()
    return spreads
