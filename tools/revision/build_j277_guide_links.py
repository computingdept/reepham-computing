#!/usr/bin/env python3
"""Build the J277 revision-guide link resolver from the only editable skill index.

Usage:
    python tools/revision/build_j277_guide_links.py
    python tools/revision/build_j277_guide_links.py --check
The current PDF page and lesson numbers belong in skill-index.json, never in quiz banks.
"""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
SOURCE = ROOT / "revision/j277/guides/skill-index.json"
TARGET = ROOT / "revision/j277/guides/guide-links.js"


def generate(data):
    source = json.dumps(data, separators=(",", ":"), ensure_ascii=False)
    return (
        "'use strict';\n"
        "// Generated from /revision/j277/guides/skill-index.json.\n"
        "// Quiz banks retain stable skill IDs; only this index changes when guide pages move.\n"
        "(function(){\n"
        f" const source={source};\n"
        " const entries=Object.freeze(source.skills);\n"
        " function lookup(skillId){const entry=entries[skillId];if(!entry)throw new RangeError('Unmapped J277 revision skill: '+skillId);return entry;}\n"
        " function pageLabel(skillId){const r=lookup(skillId);return 'Paper '+r.paper+' · page '+r.page;}\n"
        " function guideLink(skillId){const r=lookup(skillId),g=source.guides[r.paper];if(!g||!g.published)return null;return '/revision/j277/guides/'+encodeURIComponent(g.file)+'?v='+encodeURIComponent(g.edition)+'#page='+r.page;}\n"
        " function lessonLinks(skillId){return lookup(skillId).lessons.map(n=>({number:String(n).padStart(3,'0'),lesson:'/lessons/j277/lesson-'+String(n).padStart(3,'0')+'/index.html#new-learning',example:'/lessons/j277/lesson-'+String(n).padStart(3,'0')+'/index.html#i-do'}));}\n"
        " window.J277_RESOURCE_INDEX=Object.freeze({version:source.version,guides:source.guides,skills:entries,lookup,pageLabel,guideLink,lessonLinks});\n"
        "})();\n"
    )


def validate(data):
    for paper_id, guide in data["guides"].items():
        if guide.get("published"):
            pdf = ROOT / "revision/j277/guides" / guide["file"]
            if not pdf.is_file() or pdf.stat().st_size < 10000:
                raise ValueError(f"Paper {paper_id} guide is marked published but PDF is missing or empty: {pdf}")
            with pdf.open("rb") as stream:
                if stream.read(5) != b"%PDF-":
                    raise ValueError(f"Paper {paper_id} guide has an invalid PDF header: {pdf}")
    assert isinstance(data["skills"], dict) and data["skills"], "No J277 skills indexed"
    for skill_id, item in data["skills"].items():
        paper = data["guides"][item["paper"]]
        assert 1 <= item["page"] <= paper["totalPages"], f"Invalid page for {skill_id}"
        assert item["spec"].startswith(item["paper"]+"."), f"Invalid spec for {skill_id}"
        assert item["lessons"] and all(1 <= n <= 164 for n in item["lessons"]), f"Invalid lesson for {skill_id}"


def main():
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    validate(data)
    expected = generate(data)
    if "--check" in sys.argv:
        if not TARGET.exists() or TARGET.read_text(encoding="utf-8") != expected:
            raise SystemExit("J277 guide-links.js is outdated: run build_j277_guide_links.py")
        print(f"J277 guide index is synced ({len(data['skills'])} skills)")
    else:
        TARGET.write_text(expected, encoding="utf-8")
        print(f"Generated J277 guide-links.js ({len(data['skills'])} skills)")


if __name__ == "__main__":
    main()
