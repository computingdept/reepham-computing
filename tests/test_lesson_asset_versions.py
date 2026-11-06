"""Offline safety tests for the four-classroom-lesson versioning pilot."""
import importlib.util
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "version_lesson_assets.py"
spec = importlib.util.spec_from_file_location("version_lesson_assets", SCRIPT)
versioning = importlib.util.module_from_spec(spec)
spec.loader.exec_module(versioning)


class TestPilotVersioning(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)

        def put(path, content):
            p = self.root / path
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_text(content, encoding="utf-8")

        put(versioning.CORE_CSS, ".phase-nav {display:grid}")
        put(versioning.CORE_JS, "const next = true;")
        css = '../../../' + versioning.CORE_CSS + '?v=old'
        js = '../../../' + versioning.CORE_JS + '?v=old'
        for path in versioning.PILOT_DIRECT:
            put(path, f'<link href="{css}"><script src="{js}"></script>')
        for path in (versioning.ADAPTER, versioning.GENERATOR):
            put(path, f'head = "{css}"; answers = "{css}"; engine = "{js}";')
        for entry, (filename, _) in versioning.PILOT_ENTRIES.items():
            put(entry, f'<script src="../{filename}?v=old"></script>')
        put('lessons/j277/lesson-002/index.html', 'Leave this other lesson unchanged')

    def apply(self):
        updates = versioning.compute_updates(self.root)
        for path, content in updates.items():
            (self.root / path).write_text(content, encoding="utf-8")
        return updates

    def test_pilot_refresh_then_idempotence(self):
        result = self.apply()
        self.assertEqual(len(result), 6)
        self.assertEqual(versioning.compute_updates(self.root), {})
        self.assertEqual((self.root / 'lessons/j277/lesson-002/index.html').read_text(),
                         'Leave this other lesson unchanged')

    def test_changed_css_propagates_to_entry_pages(self):
        self.apply()
        p = self.root / versioning.CORE_CSS
        p.write_text('.phase-nav{display:flex}', encoding='utf-8')
        result = versioning.compute_updates(self.root)
        self.assertEqual(len(result), 6)
        self.assertIn('lessons/j277/lesson-003/index.html', result)
        self.assertIn('lessons/j277/lesson-020/index.html', result)

    def test_refuses_missing_or_unexpected_references_before_writing(self):
        target = self.root / versioning.GENERATOR
        target.write_text('unexpected generator markup', encoding='utf-8')
        with self.assertRaisesRegex(ValueError, 'expected 2 versioned links'):
            versioning.compute_updates(self.root)
        self.assertIn('?v=old', (self.root / versioning.PILOT_DIRECT[0]).read_text())


if __name__ == '__main__':
    unittest.main()
