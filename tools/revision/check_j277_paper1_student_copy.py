#!/usr/bin/env python3
"""Gate J277 Paper 1 review editions against student-facing editorial leaks.

Exit nonzero if source-production vocabulary remains. This is an additional
gate, NOT a technical accuracy or visual-diagram certification.
Usage: python tools/revision/check_j277_paper1_student_copy.py path/to/digital.pdf path/to/print.pdf
"""
import re
import sys
from pathlib import Path
import fitz

PATTERNS = {
 "review-only language": r"unpublished review candidate|review.only|not (yet )?published",
 "source-production comparison": r"(same artwork as|published J277 guide|original (number.line|hex examples|pictures|diagrams)|missing from the original|preserving the source|source (illustration|diagram))",
 "authoring-process instructions": r"(?i)(in the original guide|previous version of (the|this) guide|as (we|I) (rebuilt|revised)|editorial note|production note)",
}
def scan(path):
    doc=fitz.open(path)
    failures=[]
    for i,p in enumerate(doc):
        t=" ".join(p.get_text().split())
        for label,pattern in PATTERNS.items():
            for hit in re.finditer(pattern,t,re.I):
                failures.append((i+1,label,t[max(0,hit.start()-65):min(len(t),hit.end()+95)]))
    return len(doc), failures

def main():
    if len(sys.argv)!=3:
        raise SystemExit("Usage: check_j277_paper1_student_copy.py DIGITAL.pdf PRINT.pdf")
    results=[]
    for name in sys.argv[1:]:
        pages, failures=scan(name)
        print(f"{Path(name).name}: {pages} pages, {len(failures)} student-copy language flags")
        for pg,typ,snippet in failures:
            print(f"  p.{pg}: {typ} | {snippet}")
        if pages!=291:
            print("  ERROR: candidate pagination changed; remap all MCQ destinations before release.")
        results.append((pages,failures))
    if results[0][0]!=results[1][0] or any(n!=291 or flags for n,flags in results):
        raise SystemExit("FAIL: editorial/pagination gate. Review each hit in context and correct in source.")
    print("PASS: targeted student-copy editorial gate (not full subject sign-off)")

if __name__=="__main__":
    main()
