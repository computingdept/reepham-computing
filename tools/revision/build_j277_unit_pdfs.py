#!/usr/bin/env python3
"""Split approved J277 V4/V3 PDFs into 11 unit-only PDFs.

The originals and their existing skill-page mappings are never modified.
Chapter boundaries are verified against the source PDFs' own bookmarks.
"""
import hashlib
import json
from pathlib import Path
import pymupdf

ROOT = Path(__file__).resolve().parents[2]
BASE = ROOT / "revision/j277/guides"
UNIT_DIR = BASE / "units"
PAPERS = {
    "1": {
        "source": "J277_Paper_1_Revision_Guide_AP1_Aligned.pdf",
        "edition": "V4-2026-10-28",
        "pages": 291,
        "units": [
            ("1.1", "Systems Architecture", 4, 44),
            ("1.2", "Memory and Storage", 45, 122),
            ("1.3", "Computer Networks", 123, 164),
            ("1.4", "Network Security", 165, 198),
            ("1.5", "Systems Software", 199, 232),
            ("1.6", "Ethical, Legal and Environmental Impacts", 233, 268),
        ],
        "appendix": 269,
    },
    "2": {
        "source": "J277_Paper_2_Revision_Guide_V3.pdf",
        "edition": "V3-2026-10-28",
        "pages": 193,
        "units": [
            ("2.1", "Algorithms", 3, 49),
            ("2.2", "Programming Fundamentals", 50, 109),
            ("2.3", "Producing Robust Programs", 110, 134),
            ("2.4", "Boolean Logic", 135, 147),
            ("2.5", "Programming Languages and IDEs", 148, 167),
        ],
        "appendix": 168,
    },
}
NAMES = {
    "1.1": "J277_Unit_1-1_Systems_Architecture.pdf",
    "1.2": "J277_Unit_1-2_Memory_and_Storage.pdf",
    "1.3": "J277_Unit_1-3_Computer_Networks.pdf",
    "1.4": "J277_Unit_1-4_Network_Security.pdf",
    "1.5": "J277_Unit_1-5_Systems_Software.pdf",
    "1.6": "J277_Unit_1-6_Ethical_Legal_and_Environmental_Impacts.pdf",
    "2.1": "J277_Unit_2-1_Algorithms.pdf",
    "2.2": "J277_Unit_2-2_Programming_Fundamentals.pdf",
    "2.3": "J277_Unit_2-3_Producing_Robust_Programs.pdf",
    "2.4": "J277_Unit_2-4_Boolean_Logic.pdf",
    "2.5": "J277_Unit_2-5_Languages_and_IDEs.pdf",
}

def sha256(path):
    h = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

def build():
    UNIT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = {"version": "2026-10-29-j277-unit-pdfs", "status": "published",
                "source_policy": "Exact page extracts from approved source editions; synoptic practice remains in complete guides.",
                "units": {}}
    for paper, config in PAPERS.items():
        source_path = BASE / config["source"]
        with pymupdf.open(source_path) as original:
            assert len(original) == config["pages"], "Unexpected number of pages in " + config["source"]
            toc = original.get_toc()
            level_one = [(title, page) for level, title, page in toc if level == 1]
            assert len(level_one) >= len(config["units"])
            for index, (code, title, start, end) in enumerate(config["units"]):
                assert code in NAMES
                assert 0 < start <= end < len(original)
                source_headings = [(name, p) for name, p in level_one if name.startswith(code+".")]
                assert source_headings, "Missing source chapter for " + code
                assert min(p for _, p in source_headings) == start, "Chapter start mismatch for "+code
                next_start = (config["units"][index+1][2] if index + 1 < len(config["units"]) else config["appendix"])
                assert end + 1 == next_start, "Chapter end mismatch for " + code
                # Extract original PDF pages rather than regenerating text, figures or diagrams.
                out = UNIT_DIR / NAMES[code]
                with pymupdf.open() as unit_pdf:
                    unit_pdf.insert_pdf(original, from_page=start-1, to_page=end-1, links=True, annots=True)
                    unit_toc = [
                        [level, name, page - start + 1]
                        for level, name, page in toc if start <= page <= end
                    ]
                    if unit_toc:
                        unit_pdf.set_toc(unit_toc)
                    unit_pdf.set_metadata({"title": "OCR J277 "+code+" "+title,
                                           "author": "RHSC Computing",
                                           "subject": "Extracted from the approved Paper "+paper+" revision guide"})
                    unit_pdf.save(out, garbage=4, deflate=True)
                with pymupdf.open(out) as test:
                    assert len(test) == end - start + 1, "Extract page count mismatch for "+code
                    assert test[0].get_text().strip(), "Missing selectable text for "+code
                    assert test[-1].get_text().strip(), "Missing last page text for "+code
                    assert len(test.get_toc()) > 0, "Missing PDF bookmarks for "+code
                manifest["units"][code] = {
                    "paper": paper, "title": title, "file": "units/" + out.name,
                    "original": config["source"], "edition": config["edition"],
                    "source_pages": [start, end], "pages": end-start+1,
                    "bytes": out.stat().st_size, "sha256": sha256(out),
                }
                print(code, "pages", end-start+1, "bytes", out.stat().st_size)
    assert len(manifest["units"]) == 11
    path = BASE / "unit-pdfs.json"
    path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False)+"\n", encoding="utf-8")
    print("Validated all 11 unit PDFs; manifest:", path)

if __name__ == "__main__":
    build()
