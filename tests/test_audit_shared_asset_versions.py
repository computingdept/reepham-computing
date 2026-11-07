"""Offline, read-only tests for the full-course shared-asset version report."""
import importlib.util
import hashlib
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "audit_shared_asset_versions.py"
spec = importlib.util.spec_from_file_location("audit_shared_asset_versions", SCRIPT)
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)


class SharedAssetAuditTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.put("assets/h446-lesson/lesson.js", "const current = true;")
        self.put("assets/h446-lesson/lesson-classroom.css", ".nav{}")
        self.put("assets/catchup-lesson.js", "// catchup")
        self.put("assets/site-nav.js", "// site nav")

    def put(self, name, content):
        file = self.root / name
        file.parent.mkdir(parents=True, exist_ok=True)
        file.write_text(content, encoding="utf-8")

    def test_current_legacy_and_unversioned_are_distinguished(self):
        digest = hashlib.sha256(b"const current = true;").hexdigest()[:12]
        self.put("lessons/h446/lesson-001/index.html", (
            f'<script src="../../../assets/h446-lesson/lesson.js?v={digest}"></script>'
            '<link href="../../../assets/h446-lesson/lesson-classroom.css?v=old">'))
        self.put("lessons/j277/lesson-001/learn.html",
                 '<script src="../../../assets/catchup-lesson.js"></script>')
        out = audit.inventory(self.root)
        self.assertEqual(out["totals"], {"current": 1, "legacy_version": 1, "no_version": 1})
        self.assertEqual(out["pages_needing_version_review"], 2)

    def test_nested_generator_urls_are_resolved_against_lesson(self):
        self.put("lessons/j277/lesson-003/index.html",
                 '<script src="../h446-adapter.js?v=old"></script>')
        self.put("lessons/j277/h446-adapter.js",
                 "const url='../../../assets/h446-lesson/lesson.js?v=old';")
        out = audit.inventory(self.root)
        self.assertEqual(out["totals"], {"legacy_version": 2})
        self.assertIn("lessons/j277/h446-adapter.js", out["by_asset"])
        self.assertIn("assets/h446-lesson/lesson.js", out["by_asset"])

    def test_audit_never_rewrites_lesson_content(self):
        page = "lessons/h446/lesson-001/index.html"
        original = '<script src="../../../assets/h446-lesson/lesson.js?v=old"></script>'
        self.put(page, original)
        audit.inventory(self.root)
        self.assertEqual((self.root / page).read_text(), original)


if __name__ == "__main__":
    unittest.main()
