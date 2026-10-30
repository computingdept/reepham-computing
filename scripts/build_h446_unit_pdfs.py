#!/usr/bin/env python3
"""Extract OCR H446 unit PDFs from the published complete guides without rewriting content.

Preserves every original chapter page; adds a short clickable local contents index.
Stops instead of publishing if any boundary, input PDF or output check is doubtful.
Run: python scripts/build_h446_unit_pdfs.py
"""
from __future__ import annotations

import math
import re
from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "revision/h446/guides"
OUT = SRC / "units"
SOURCES = {
    1: SRC / "H446_Paper_1_FINAL_Student_Revision_Guide.pdf",
    2: SRC / "H446_Paper_2_FINAL_Student_Revision_Guide.pdf",
}
UNITS = {
    1: [
        ("1.1", "Processors, input/output and storage"),
        ("1.2", "Software and software development"),
        ("1.3", "Exchanging data"),
        ("1.4", "Data types, data structures and Boolean algebra"),
        ("1.5", "Legal, moral, cultural and ethical issues"),
    ],
    2: [
        ("2.1", "Elements of computational thinking"),
        ("2.2.1", "Programming techniques"),
        ("2.2.2", "Computational methods"),
        ("2.3", "Algorithms"),
    ],
}
SLUGS = {
    "1.1": "H446_Unit_1-1_Processors_IO_and_Storage.pdf",
    "1.2": "H446_Unit_1-2_Software_and_Development.pdf",
    "1.3": "H446_Unit_1-3_Exchanging_Data.pdf",
    "1.4": "H446_Unit_1-4_Data_Types_Structures_and_Boolean_Algebra.pdf",
    "1.5": "H446_Unit_1-5_Legal_Moral_and_Ethical_Issues.pdf",
    "2.1": "H446_Unit_2-1_Computational_Thinking.pdf",
    "2.2.1": "H446_Unit_2-2-1_Programming_Techniques.pdf",
    "2.2.2": "H446_Unit_2-2-2_Computational_Methods.pdf",
    "2.3": "H446_Unit_2-3_Algorithms.pdf",
}


def match_section(title: str, code: str) -> bool:
    return bool(re.search(r"\bSection\s+" + re.escape(code) + r"(?![\d.])", title, re.I))


def locate_boundaries(source: fitz.Document, paper: int):
    toc = source.get_toc()
    if not toc:
        raise RuntimeError(f"Paper {paper}: no bookmarks: refusing a blind page split")
    top = [(page, title) for level, title, page in toc if level == 1]
    def section(code: str) -> int:
        hits = [page for page, title in top if match_section(title, code)]
        if len(hits) != 1:
            raise RuntimeError(f"Paper {paper}: Section {code} found {len(hits)} times, expected exactly 1")
        return hits[0]

    if paper == 1:
        starts = {code: section(code) for code, _ in UNITS[paper]}
        # The material after 1.5 is a cross-unit appendix and remains in the full guide.
        later = [page for page, _ in top if page > starts["1.5"]]
        end = min(later) if later else len(source) + 1
        ends = {a: starts[b] for (a, _), (b, _) in zip(UNITS[paper][:-1], UNITS[paper][1:])}
        ends["1.5"] = end
    else:
        start21, start22, start23 = section("2.1"), section("2.2"), section("2.3")
        # The 2.2.2 chapter starts at its first actual learning cycle,
        # not merely where 2.2.2 is mentioned on a 2.2 specification checklist.
        within = [(level, title, page) for level, title, page in toc
                  if start22 < page < start23]
        methods = [(page, title) for level, title, page in within
                   if re.search(r"(?<![\d.])2\.2\.2(?:\(|\s|/)", title)
                   and re.search(r"Understand|See it|Computational methods", title, re.I)]
        if not methods:
            # Bookmark structures vary between editions; a topic-level 2.2.2 entry is valid.
            methods = [(page, title) for level, title, page in within
                       if re.match(r"\s*2\.2\.2(?:\(|\s|/)", title)]
        if not methods:
            raise RuntimeError("Paper 2: cannot identify first 2.2.2 content page: no PDFs published")
        split222 = min(page for page, _ in methods)
        if not (start21 < start22 < split222 < start23):
            raise RuntimeError("Paper 2: unexpected boundaries: refusing a blind split")
        later = [page for page, _ in top if page > start23]
        ends = {
            "2.1": start22, "2.2.1": split222,
            "2.2.2": start23, "2.3": min(later) if later else len(source) + 1,
        }
        starts = {
            "2.1": start21, "2.2.1": start22,
            "2.2.2": split222, "2.3": start23,
        }

    for code, _ in UNITS[paper]:
        start, end = starts[code], ends[code]
        if not (1 <= start < end <= len(source) + 1):
            raise RuntimeError(f"Paper {paper}, {code}: invalid chapter boundary {start}..{end}")
        first_text = source[start - 1].get_text().lower()
        # The 2.2.2 segment begins at the start of the first learning cycle.
        if code != "2.2.2" and code not in first_text:
            raise RuntimeError(f"Paper {paper}, {code}: first page does not mention the unit code")
    return starts, ends, toc


def local_contents(toc, code: str, start: int, end: int):
    entries = []
    for level, title, page in toc:
        if not (start < page < end):
            continue
        name = re.sub(r"\s+", " ", title).strip()
        if "checklist" in name.lower() or "contents" in name.lower():
            continue
        if code == "2.2.2":
            valid = bool(re.match(r"\s*2\.2\.2\b", name))
        elif code == "2.2.1":
            valid = bool(re.match(r"\s*2\.2\.1\b", name))
        elif code == "2.3":
            valid = bool(re.match(r"\s*2\.3\.\d+\b", name))
        else:
            valid = bool(re.match(r"\s*" + re.escape(code) + r"\.\d+\b", name))
        if not valid:
            continue
        # New Paper 2 PDFs have an explicit bookmark for each stage; list the first only.
        if re.search(r"/\s*(Model|Try|Check)\s*:", name, re.I):
            continue
        name = re.sub(r"\s*/\s*Understand\s*:", " / ", name, flags=re.I)
        # No duplicate entries from mirrored links/bookmarks.
        if entries and entries[-1][1] == page:
            continue
        entries.append((name, page))
    if not entries:
        raise RuntimeError(f"Unit {code}: zero clickable topic bookmarks")
    return entries


def new_index_page(doc, code, title, paper, topics, part=0, index_pages=1):
    page = doc.new_page(width=595, height=842)
    blue = (0.15, .38, .53) if paper == 1 else (.60, .37, .15)
    dark = (.09, .20, .17)
    muted = (.35, .43, .39)
    page.draw_rect(fitz.Rect(0, 0, 595, 10), color=blue, fill=blue)
    page.insert_text((48, 42), "REEPHAM HIGH SCHOOL & COLLEGE  /  COMPUTING",
                     fontsize=9, fontname="hebo", color=muted)
    page.insert_text((48, 82), f"OCR H446  /  PAPER {paper}  /  UNIT {code}",
                     fontsize=11, fontname="hebo", color=blue)
    title_text = f"{code}  {title}"
    box = fitz.Rect(48, 101, 555, 185)
    n = page.insert_textbox(box, title_text, fontsize=26, lineheight=1.13,
                            fontname="hebo", color=dark)
    if n < 0:
        page.insert_textbox(box, title_text, fontsize=21, lineheight=1.15,
                            fontname="hebo", color=dark)
    page.draw_line((48, 198), (548, 198), color=(.85, .89, .87), width=1)
    page.insert_text((48, 225), f"CHAPTER CONTENTS{f'  /  PART {part+1}' if index_pages>1 else ''}",
                     fontsize=13, fontname="hebo", color=dark)
    page.insert_text((48, 249), "Choose a topic to jump to its original worked pages.",
                     fontsize=10, color=muted)
    return page


def build_unit(source, toc, paper, code, title, start, end):
    topics = local_contents(toc, code, start, end)
    rows = 17
    num_index_pages = math.ceil(len(topics) / rows)
    if num_index_pages > 4:
        raise RuntimeError(f"{code}: unusually large contents list ({len(topics)})")
    chapter_length = end - start
    if chapter_length < 4 or chapter_length > 250:
        raise RuntimeError(f"{code}: suspicious chapter length {chapter_length}")
    doc = fitz.open()
    index_pages = []
    for p in range(num_index_pages):
        index_pages.append(new_index_page(doc, code, title, paper, topics, p, num_index_pages))
    doc.insert_pdf(source, from_page=start-1, to_page=end-2, links=True, annots=True)
    rewritten_toc = [[1, f"{code} / Contents", 1]]
    for n, (topic_title, original_page) in enumerate(topics):
        local_target = num_index_pages + original_page - start + 1  # 1-based PDF page
        if not (2 <= local_target <= len(doc)):
            raise RuntimeError(f"{code}: bad local target for {topic_title}")
        page_index, row_index = divmod(n, rows)
        page = index_pages[page_index]
        y = 281 + row_index * 28
        box = fitz.Rect(48, y - 14, 548, y + 8)
        page.draw_rect(box, color=(.88,.91,.89), fill=(.985,.992,.987), width=.5)
        label = topic_title if len(topic_title) <= 65 else topic_title[:62] + "..."
        page.insert_text((59, y), label, fontname="helv", fontsize=10.3, color=(.10,.31,.25))
        page.insert_text((517, y), str(local_target), fontname="hebo", fontsize=9, color=(.28,.4,.35))
        page.insert_link({"kind":fitz.LINK_GOTO,"from":box,"page":local_target-1})
        rewritten_toc.append([2, topic_title, local_target])
    for i, page in enumerate(index_pages):
        page.draw_line((48,770),(548,770),color=(.82,.87,.83),width=.7)
        page.insert_text((48,794),"UNDERSTAND  >  MODEL  >  TRY  >  CHECK",
                         fontname="hebo",fontsize=9,color=(.32,.43,.38))
        page.insert_text((48,810),"Full-paper guide includes cross-unit appendices and further exam practice.",
                         fontsize=8,color=(.39,.48,.44))
    doc.set_toc(rewritten_toc)
    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / SLUGS[code]
    doc.save(str(dest), garbage=4, deflate=True)
    doc.close()
    check = fitz.open(str(dest))
    if len(check) != num_index_pages + chapter_length:
        raise RuntimeError(f"{code}: output PDF missing pages")
    if len(check.get_toc()) != len(rewritten_toc):
        raise RuntimeError(f"{code}: output bookmarks failed")
    expected = [source[p].get_text().strip() for p in range(start-1,end-1)]
    actual = [check[p + num_index_pages].get_text().strip() for p in range(chapter_length)]
    if expected != actual:
        raise RuntimeError(f"{code}: original chapter text changed")
    links = sum(len(check[p].get_links()) for p in range(num_index_pages))
    if links != len(topics):
        raise RuntimeError(f"{code}: contents links {links} != {len(topics)}")
    check.close()
    print(f"PASS {code}: {dest.name}, {num_index_pages+chapter_length} pages, {len(topics)} topic links")


def main():
    for paper in (1, 2):
        path = SOURCES[paper]
        if not path.is_file():
            raise RuntimeError(f"Published guide missing: {path}")
        src = fitz.open(str(path))
        starts, ends, toc = locate_boundaries(src, paper)
        print(f"Paper {paper}: {len(src)} pages; unit spans " +
              ", ".join(f"{code} {starts[code]}-{ends[code]-1}" for code, _ in UNITS[paper]))
        for code, title in UNITS[paper]:
            build_unit(src, toc, paper, code, title, starts[code], ends[code])
        src.close()
    generated = list(OUT.glob("H446_Unit_*.pdf"))
    if len(generated) < 9:
        raise RuntimeError(f"Only {len(generated)} unit PDFs: expected 9")
    print("SUCCESS: all nine unit PDFs generated and independently validated")


if __name__ == "__main__":
    main()
