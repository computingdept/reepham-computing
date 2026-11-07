"""Browser regression: actual lesson HTML, shared CSS/JS and dynamic site navigation.

Run locally from repository root:
  python -m pip install playwright
  python -m playwright install chromium webkit
  python -m unittest tests.test_classroom_nav_browser -v

Screenshots and run results remain in CI, never in student-facing pages.
"""
from __future__ import annotations

import functools
import http.server
import threading
import unittest
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
LESSONS = (
    "/lessons/j277/lesson-001/index.html",
    "/lessons/j277/lesson-002/index.html",
    "/lessons/j277/lesson-003/index.html",
    "/lessons/j277/lesson-005/index.html",
    "/lessons/j277/lesson-020/index.html",
    "/lessons/h446/lesson-002/index.html",
    "/lessons/h446/lesson-007/index.html",
    "/lessons/h446/lesson-038/index.html",
)
PHASES = ("do-now", "overview", "new-learning", "i-do", "we-do",
          "you-do", "vocabulary", "exit")


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


class ClassroomNavigationBrowserTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        handler = functools.partial(QuietHandler, directory=str(ROOT))
        cls.server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
        cls.port = cls.server.server_port
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.playwright = sync_playwright().start()

    @classmethod
    def tearDownClass(cls):
        cls.playwright.stop()
        cls.server.shutdown()
        cls.server.server_close()

    def open_lesson(self, page, path):
        errors = []
        page.on("pageerror", lambda exc: errors.append(str(exc)))
        page.goto(f"http://127.0.0.1:{self.port}{path}#do-now",
                  wait_until="networkidle", timeout=45000)
        page.locator("#do-now.page.active").wait_for(timeout=30000)
        self.assertTrue(page.locator(".donow-question").count() >= 4,
                        f"{path}: missing Do Now content")
        self.assertIn("Do Now", page.locator("#phase-logo").inner_text())
        self.assertEqual(page.locator(".phase-nav > button").count(), 8)
        self.assertFalse(errors, f"{path}: browser runtime exceptions: {errors}")
        return errors

    def positions(self, page):
        return page.evaluate("""() => [...document.querySelectorAll(
            '.navwrap > .phase-nav > button'
        )].map(el => {
            const r = el.getBoundingClientRect();
            return {x: r.x, y: r.y, width: r.width, right: r.right};
        })""")

    def test_desktop_j277_001_fixed_coordinates(self):
        for engine in ("chromium", "webkit"):
            with self.subTest(engine=engine):
                browser = getattr(self.playwright, engine).launch(headless=True)
                try:
                    for width in (1024, 1050, 1280, 1440):
                        with self.subTest(width=width):
                            page = browser.new_page(viewport={"width": width, "height": 768})
                            try:
                                self.open_lesson(page, LESSONS[0])
                                page.wait_for_selector(".navwrap .rhsc-site-nav", timeout=12000)
                                initial = self.positions(page)
                                self.assertEqual(len(initial), 8)
                                self.assertLessEqual(initial[-1]["right"], width - 95)
                                self.assertGreater(initial[0]["width"], 0)
                                # Do Now answer transitions update Next Action repeatedly.
                                for _ in range(4):
                                    page.locator("#advance").click()
                                    after = self.positions(page)
                                    for a, b in zip(initial, after):
                                        self.assertAlmostEqual(a["x"], b["x"], delta=0.5)
                                        self.assertAlmostEqual(a["width"], b["width"], delta=0.5)
                                # Objectives, term definition and next term.
                                page.locator('.phase-nav button[data-page="overview"]').click()
                                for _ in range(3):
                                    page.locator("#advance").click()
                                    after = self.positions(page)
                                    for a, b in zip(initial, after):
                                        self.assertAlmostEqual(a["x"], b["x"], delta=0.5)
                                self.assertTrue(page.locator(".teacher-next-action").is_visible())
                            finally:
                                page.close()
                finally:
                    browser.close()

    def test_standard_lesson_templates_initialise(self):
        browser = self.playwright.chromium.launch(headless=True)
        try:
            for path in LESSONS:
                with self.subTest(lesson=path):
                    page = browser.new_page(viewport={"width": 1366, "height": 768})
                    try:
                        self.open_lesson(page, path)
                        label = page.locator(".signal-meta .lesson-label").inner_text()
                        self.assertNotIn(" · Lesson ", label)
                        self.assertTrue(label.strip(), f"{path}: topic title missing")
                    finally:
                        page.close()
        finally:
            browser.close()

    def test_phone_phase_content_unchanged(self):
        browser = self.playwright.webkit.launch(headless=True)
        try:
            page = browser.new_page(viewport={"width": 390, "height": 844},
                                    is_mobile=True, has_touch=True)
            self.open_lesson(page, LESSONS[0])
            self.assertTrue(page.locator("#do-now").is_visible())
            self.assertTrue(page.locator("#mobile-lesson-status").is_visible())
            page.locator("#advance").evaluate("(el) => el.click()")
            self.assertTrue(page.locator("#do-now").is_visible())
            page.close()
        finally:
            browser.close()


if __name__ == "__main__":
    unittest.main()
