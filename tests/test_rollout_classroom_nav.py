"""Fail-closed safety tests for site-wide lesson cache versioning."""
import importlib.util
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "rollout_classroom_nav.py"
spec = importlib.util.spec_from_file_location("rollout_classroom_nav", SCRIPT)
rollout = importlib.util.module_from_spec(spec)
spec.loader.exec_module(rollout)


class TestClassroomRollout(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)

        def put(path, body):
            destination = self.root / path
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_text(body, encoding="utf-8")

        self.put = put
        put(rollout.CSS, ".phase-nav {display:grid}")
        put(rollout.JS, "const order = ['do-now', 'exit'];")
        css = "../../../" + rollout.CSS + "?v=old"
        js = "../../../" + rollout.JS + "?v=old"
        put(rollout.ADAPTER, f'lessonCss="{css}"; answerCss="{css}"; lessonJs="{js}"')
        put(rollout.GENERATOR, f'lessonCss="{css}"; answerCss="{css}"; lessonJs="{js}"')
        for i in range(1, 13):
            number = str(i).zfill(3)
            put(f"lessons/h446/lesson-{number}/index.html",
                f'<h1>Teaching content {number}</h1><link href="{css}"><script src="{js}"></script>')
        for i in range(1, 7):
            number = str(i).zfill(3)
            put(f"lessons/j277/lesson-{number}/index.html",
                f'<h1>Do Now {number}</h1><link href="{css}"><script src="{js}"></script>')
        for i in range(7, 9):
            put(f"lessons/j277/lesson-{i:03d}/index.html",
                '<script src="../h446-adapter.js?v=old" data-mode="lesson"></script>')
        for i in range(9, 13):
            put(f"lessons/j277/lesson-{i:03d}/index.html",
                '<script src="../autumn2-rebuilt.js?v=old"></script>')
        put("lessons/h446/lesson-037/index.html",
            '<meta http-equiv="refresh" content="0;url=guided.html">')

    def write(self):
        updates, counts = rollout.compute_updates(self.root)
        for path, body in updates.items():
            (self.root / path).write_text(body, encoding="utf-8")
        return updates, counts

    def test_refresh_all_templates_without_touching_special_lessons(self):
        before = (self.root / "lessons/h446/lesson-037/index.html").read_text()
        updates, counts = self.write()
        self.assertEqual(counts["entry_total"], 25)
        self.assertEqual(counts["direct_h446"], 12)
        self.assertEqual(counts["direct_j277"], 6)
        self.assertEqual(counts["adapter_entries"], 2)
        self.assertEqual(counts["generator_entries"], 4)
        self.assertEqual(counts["special_h446"], 1)
        self.assertEqual(len(updates), 26)
        self.assertEqual((self.root / "lessons/h446/lesson-037/index.html").read_text(), before)
        self.assertIn("Teaching content 001",
                      (self.root / "lessons/h446/lesson-001/index.html").read_text())
        self.assertIn("Do Now 001", (self.root / "lessons/j277/lesson-001/index.html").read_text())
        self.assertEqual(rollout.compute_updates(self.root)[0], {})

    def test_css_update_propagates_through_generators(self):
        self.write()
        (self.root / rollout.CSS).write_text(".phase-nav{display:flex}", encoding="utf-8")
        updates, _ = rollout.compute_updates(self.root)
        self.assertIn(rollout.ADAPTER, updates)
        self.assertIn(rollout.GENERATOR, updates)
        self.assertIn("lessons/j277/lesson-007/index.html", updates)
        self.assertIn("lessons/j277/lesson-012/index.html", updates)
        self.assertIn("lessons/h446/lesson-001/index.html", updates)

    def test_invalid_direct_reference_fails_without_partial_write(self):
        original = (self.root / "lessons/h446/lesson-001/index.html").read_text()
        target = self.root / "lessons/j277/lesson-003/index.html"
        target.write_text('<link href="../../../assets/h446-lesson/lesson-classroom.css?v=old">',
                          encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "unexpected direct lesson links"):
            rollout.compute_updates(self.root)
        self.assertEqual((self.root / "lessons/h446/lesson-001/index.html").read_text(),
                         original)

    def test_special_lesson_remains_untouched(self):
        self.write()
        self.assertNotIn("lessons/h446/lesson-037/index.html",
                         rollout.compute_updates(self.root)[0])


if __name__ == "__main__":
    unittest.main()
