"""Offline invariants for reviewed J277/H446 classroom version-only batches."""
import importlib.util
import tempfile
import unittest
from pathlib import Path

SOURCE = Path(__file__).resolve().parents[1] / "scripts" / "version_course_classroom_batch.py"
spec = importlib.util.spec_from_file_location("version_course_classroom_batch", SOURCE)
version = importlib.util.module_from_spec(spec)
spec.loader.exec_module(version)


class BatchClassroomAssetVersionsTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        for name in version.DIRECT:
            self.put(f"{version.CORE_DIR}/{name}", name + " source")
        for name in version.GENERATORS:
            self.put(f"{version.GENERATOR_DIR}/{name}", name + " generator source")

    def put(self, path, content):
        file = self.root / path
        file.parent.mkdir(parents=True, exist_ok=True)
        file.write_text(content, encoding="utf-8")
        return file

    def test_h446_versions_only_including_unversioned_asset(self):
        page = "lessons/h446/lesson-011/index.html"
        original = ('<h1>Model answer: Do not change</h1>' +
                    ''.join(f'<link href="../../../assets/h446-lesson/{n}" />' for n in version.DIRECT))
        self.put(page, original)
        updates = version.compute_updates(self.root, "h446", 11, 11)
        self.assertEqual(len(updates), 1)
        next_content = updates[page]
        self.assertIn("<h1>Model answer: Do not change</h1>", next_content)
        for asset in version.DIRECT:
            self.assertIn(f"{asset}?v={version.digest(self.root / version.CORE_DIR / asset)}", next_content)
        self.put(page, next_content)
        self.assertEqual(version.compute_updates(self.root, "h446", 11, 11), {})

    def test_j277_generator_hash_changes_when_generator_changes(self):
        page = "lessons/j277/lesson-019/index.html"
        self.put(page, '<script src="../autumn2-rebuilt.js?v=old"></script>')
        updates = version.compute_updates(self.root, "j277", 19, 19)
        self.put(page, updates[page])
        self.assertEqual(version.compute_updates(self.root, "j277", 19, 19), {})
        self.put(f"{version.GENERATOR_DIR}/autumn2-rebuilt.js", "generator changed")
        self.assertIn(page, version.compute_updates(self.root, "j277", 19, 19))

    def test_unrecognised_entry_aborts_batch_before_any_write(self):
        first = "lessons/h446/lesson-011/index.html"
        original = ''.join(f'../../../assets/h446-lesson/{n}?v=old ' for n in version.DIRECT)
        self.put(first, original)
        self.put("lessons/h446/lesson-012/index.html", "nonstandard lesson")
        with self.assertRaisesRegex(ValueError, "unusual classroom assets"):
            version.compute_updates(self.root, "h446", 11, 12)
        self.assertEqual((self.root / first).read_text(), original)

    def test_j277_adapter_preserves_markup(self):
        page = "lessons/j277/lesson-012/index.html"
        original = '<title>Keep</title><script src="../h446-adapter.js?v=old"></script>'
        self.put(page, original)
        updated = version.compute_updates(self.root, "j277", 12, 12)[page]
        self.assertIn('<title>Keep</title>', updated)
        self.assertIn("h446-adapter.js?v=" + version.digest(self.root / version.GENERATOR_DIR / version.GENERATORS[0]), updated)


if __name__ == "__main__":
    unittest.main()
