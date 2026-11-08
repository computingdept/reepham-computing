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
    "/lessons/j277/lesson-012/index.html",
    "/lessons/j277/lesson-020/index.html",
    "/lessons/j277/lesson-028/index.html",
    "/lessons/h446/lesson-002/index.html",
    "/lessons/h446/lesson-007/index.html",
    "/lessons/h446/lesson-016/index.html",
    "/lessons/h446/lesson-029/index.html",
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
        phase_ids = page.locator(".phase-nav > button").evaluate_all(
            "(buttons) => buttons.map(button => button.dataset.page)"
        )
        self.assertEqual([name for name in phase_ids if name in PHASES], list(PHASES),
                         f"{path}: standard teaching phases changed")
        self.assertIn(len(phase_ids), (8, 9))
        self.assertTrue(set(phase_ids).issubset(set(PHASES) | {"exam-practice"}),
                        f"{path}: unexpected teaching phase: {phase_ids}")
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

    def test_desktop_voice_controls_do_not_cover_exit_ticket(self):
        """Desktop Play/Pause/Stop/Tools must not cover the last phase button.

        The quick toolbar always occupies 96px, both idle (2 controls) and
        while speaking (3 controls). Its visible text is hidden only on
        classroom desktops; accessible button names must remain intact.
        """
        for engine in ("chromium", "webkit"):
            browser = getattr(self.playwright, engine).launch(headless=True)
            try:
                for width in (901, 950, 985, 1024, 1042, 1043, 1100, 1280):
                    with self.subTest(engine=engine, width=width):
                        page = browser.new_page(viewport={"width": width, "height": 768})
                        try:
                            self.open_lesson(page, LESSONS[0])
                            toolbar = page.locator("body > .synergy-voice-toolbar")
                            toolbar.wait_for(timeout=20000)
                            exit_button = page.locator('.phase-nav button[data-page="exit"]')
                            self.assertTrue(exit_button.is_visible())
                            # A clipped button can still return is_visible=True.
                            strip = page.locator(".navwrap > .phase-nav")
                            size = strip.evaluate(
                                "(el) => ({scroll: el.scrollWidth, client: el.clientWidth})"
                            )
                            self.assertLessEqual(
                                size["scroll"], size["client"] + 1,
                                "All eight phase buttons must fit without clipping",
                            )
                            self.assertTrue(toolbar.locator(".synergy-voice-quick-play")
                                            .get_attribute("aria-label"))
                            self.assertTrue(toolbar.locator("#synergyListenLaunch")
                                            .get_attribute("aria-label"))
                            for stopped in (True, False):
                                # Force visible Stop without invoking browser speech.
                                toolbar.locator(".synergy-voice-quick-stop").evaluate(
                                    "(button, isHidden) => {button.hidden = isHidden}",
                                    stopped,
                                )
                                voice = toolbar.bounding_box()
                                exit_rect = exit_button.bounding_box()
                                phase_rect = page.locator(".navwrap > .phase-nav").bounding_box()
                                self.assertIsNotNone(voice)
                                self.assertIsNotNone(exit_rect)
                                self.assertIsNotNone(phase_rect)
                                self.assertLessEqual(voice["width"], 97)
                                self.assertLessEqual(
                                    exit_rect["x"] + exit_rect["width"],
                                    phase_rect["x"] + phase_rect["width"] + 1,
                                    "Exit Ticket must remain inside the phase strip",
                                )
                                self.assertLessEqual(
                                    exit_rect["x"] + exit_rect["width"],
                                    voice["x"] - 1,
                                    "Play/Tools must never cover Exit Ticket",
                                )
                                # The floating Play/Tools bar must not intercept
                                # a real click at the centre of Exit Ticket.
                                hit = exit_button.evaluate("""(el) => {
                                    const r = el.getBoundingClientRect();
                                    const target = document.elementFromPoint(
                                        r.left + r.width / 2, r.top + r.height / 2
                                    );
                                    return target === el || el.contains(target);
                                }""")
                                self.assertTrue(
                                    hit,
                                    "Exit Ticket is covered by another element",
                                )
                        finally:
                            page.close()
            finally:
                browser.close()

    def test_shared_read_aloud_play_pause_resume_stop(self):
        """Functional quick-control check without playing audio in CI.

        A browser speech stub lets us verify the *real* lesson toolbar state
        transitions in Chromium and WebKit, on desktop and mobile, while
        keeping every lesson answer and phase-navigation engine unchanged.
        """
        stub = r"""
          (() => {
            const mock = {
              getVoices: () => [{voiceURI:'test-british',name:'Test British',lang:'en-GB',localService:true}],
              addEventListener: () => {},
              speak: (utterance) => {
                window.__ttsStarted = (window.__ttsStarted || 0) + 1;
                window.__ttsText = utterance.text;
              },
              pause: () => { window.__ttsPaused = true; },
              resume: () => { window.__ttsPaused = false; },
              cancel: () => { window.__ttsCancelled = true; }
            };
            Object.defineProperty(window, 'speechSynthesis', {
              configurable: true, value: mock
            });
            Object.defineProperty(window, 'SpeechSynthesisUtterance', {
              configurable: true, value: class { constructor(text) { this.text = text; } }
            });
          })();
        """
        cases = (
            ("chromium", 1366, 768, "/lessons/j277/lesson-001/index.html"),
            ("webkit", 390, 844, "/lessons/h446/lesson-038/index.html"),
        )
        for engine, width, height, path in cases:
            with self.subTest(browser=engine, width=width, lesson=path):
                browser = getattr(self.playwright, engine).launch(headless=True)
                try:
                    page = browser.new_page(viewport={"width": width, "height": height})
                    try:
                        page.add_init_script(stub)
                        self.open_lesson(page, path)
                        toolbar = page.locator(".synergy-voice-toolbar")
                        toolbar.wait_for(timeout=15000)
                        self.assertEqual(toolbar.count(), 1)
                        quick = toolbar.locator(".synergy-voice-quick-play")
                        stop = toolbar.locator(".synergy-voice-quick-stop")
                        self.assertEqual(quick.get_attribute("aria-label"), "Play reading aloud")
                        self.assertFalse(stop.is_visible())
                        quick.click()
                        self.assertEqual(quick.get_attribute("aria-label"), "Pause reading aloud")
                        self.assertTrue(stop.is_visible())
                        self.assertGreater(page.evaluate("window.__ttsStarted || 0"), 0)
                        quick.click()
                        self.assertEqual(quick.get_attribute("aria-label"), "Resume reading aloud")
                        self.assertTrue(page.evaluate("window.__ttsPaused"))
                        quick.click()
                        self.assertEqual(quick.get_attribute("aria-label"), "Pause reading aloud")
                        self.assertFalse(page.evaluate("window.__ttsPaused"))
                        stop.click()
                        self.assertEqual(quick.get_attribute("aria-label"), "Play reading aloud")
                        self.assertFalse(stop.is_visible())

                        # Student navigation must stop speech, including on
                        # phones where the desktop phase strip is hidden.
                        quick.click()
                        page.locator("#advance").evaluate("(button) => button.click()")
                        self.assertEqual(quick.get_attribute("aria-label"), "Play reading aloud")
                        self.assertFalse(stop.is_visible())
                    finally:
                        page.close()
                finally:
                    browser.close()

    def test_accessibility_toolbar_across_pages(self):
        """No missing or covered Play / Tools controls in main page families."""
        samples = (
            ("/", False),
            ("/ks3-computing.html?year=7", False),
            ("/j277-hub.html?year=10", False),
            ("/h446-hub.html?year=12", False),
            ("/lessons/j277/lesson-001/index.html", False),
            ("/lessons/h446/lesson-038/index.html", False),
            ("/lessons/j277/lesson-001/learn.html", False),
            ("/revision/j277/section-1-1/index.html", False),
            ("/print-viewer.html?file=%2Frevision%2Fj277%2Fguides%2F"
             "J277_Paper_1_Revision_Guide_AP1_Aligned.pdf&reading=0", True),
        )
        for engine, width, height in (("chromium", 390, 844),
                                      ("webkit", 1366, 768)):
            browser = getattr(self.playwright, engine).launch(headless=True)
            try:
                for path, pdf in samples:
                    with self.subTest(engine=engine, path=path):
                        page = browser.new_page(viewport={"width": width, "height": height})
                        try:
                            page.goto(f"http://127.0.0.1:{self.port}{path}",
                                      wait_until="domcontentloaded", timeout=45000)
                            group = page.locator(".viewer-actions" if pdf else ".synergy-voice-toolbar")
                            group.wait_for(state="visible", timeout=15000)
                            play = group.locator("#viewerQuickPlay" if pdf else ".synergy-voice-quick-play")
                            tools = group.locator("#viewerTools" if pdf else "#synergyListenLaunch")
                            stop = group.locator("#viewerQuickStop" if pdf else ".synergy-voice-quick-stop")
                            play.wait_for(state="visible", timeout=15000)
                            tools.wait_for(state="visible", timeout=15000)
                            self.assertTrue(stop.is_hidden())
                            for label, button in (("Play", play), ("Tools", tools)):
                                box = button.bounding_box()
                                self.assertIsNotNone(box, f"{path}: {label} box missing")
                                self.assertGreaterEqual(box["x"], -1, path)
                                self.assertGreaterEqual(box["y"], -1, path)
                                self.assertLessEqual(box["x"] + box["width"], width + 1, path)
                                self.assertLessEqual(box["y"] + box["height"], height + 1, path)
                                self.assertTrue(button.evaluate("""(el) => {
                                  const r = el.getBoundingClientRect();
                                  const top = document.elementFromPoint(
                                    r.left + r.width / 2, r.top + r.height / 2);
                                  return top === el || el.contains(top);
                                }"""), f"{path}: {label} is covered")
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

    def test_j277_020_mcq_grid_is_two_by_two(self):
        browser = self.playwright.chromium.launch(headless=True)
        try:
            for width, height in ((1366, 768), (390, 844)):
                with self.subTest(viewport=width):
                    page = browser.new_page(viewport={"width": width, "height": height})
                    try:
                        self.open_lesson(page, "/lessons/j277/lesson-020/index.html")
                        card = page.locator("#do-now .donow-question").nth(1)
                        self.assertIn("Which shape shows flowchart input/output?",
                                      card.locator("p").inner_text())
                        options = card.locator("ol.j277-mcq > li")
                        self.assertEqual(options.all_inner_texts(),
                                         ["Diamond", "Rectangle", "Parallelogram", "Oval"])
                        boxes = [options.nth(i).bounding_box() for i in range(4)]
                        self.assertTrue(all(boxes))
                        a, b, c, d = boxes
                        self.assertAlmostEqual(a["y"], b["y"], delta=3)
                        self.assertAlmostEqual(c["y"], d["y"], delta=3)
                        self.assertAlmostEqual(a["x"], c["x"], delta=3)
                        self.assertAlmostEqual(b["x"], d["x"], delta=3)
                        self.assertGreater(b["x"], a["x"] + 10)
                        self.assertGreater(c["y"], a["y"] + 10)
                        self.assertLessEqual(b["x"] + b["width"], width + 1)
                    finally:
                        page.close()
        finally:
            browser.close()

    def test_j277_mcq_standard_static_and_special_pages(self):
        """The adopted grid retains A/B on row 1 and C/D on row 2."""
        browser = self.playwright.chromium.launch(headless=True)
        try:
            pages = (
                ("/lessons/j277/lesson-001/index.html",
                 "#do-now .donow-question ol.j277-mcq > li"),
                ("/lessons/j277/lesson-002/index.html",
                 "#do-now .donow-question ol.j277-mcq > li"),
                ("/lessons/j277/lesson-113/index.html",
                 ".do-now-question ol.j277-mcq > li"),
            )
            for lesson, selector in pages:
                for width, height in ((1366, 768), (390, 844)):
                    with self.subTest(lesson=lesson, viewport=width):
                        page = browser.new_page(viewport={"width": width, "height": height})
                        try:
                            page.goto(f"http://127.0.0.1:{self.port}{lesson}",
                                      wait_until="networkidle", timeout=45000)
                            options = page.locator(selector)
                            self.assertEqual(options.count(), 4)
                            a, b, c, d = [options.nth(i).bounding_box() for i in range(4)]
                            self.assertTrue(all((a, b, c, d)))
                            self.assertAlmostEqual(a["y"], b["y"], delta=3)
                            self.assertAlmostEqual(c["y"], d["y"], delta=3)
                            self.assertAlmostEqual(a["x"], c["x"], delta=3)
                            self.assertAlmostEqual(b["x"], d["x"], delta=3)
                            self.assertGreater(b["x"], a["x"] + 10)
                            self.assertGreater(c["y"], a["y"] + 10)
                            self.assertLessEqual(b["x"] + b["width"], width + 1)
                        finally:
                            page.close()
        finally:
            browser.close()

    def test_j277_generated_mcq_grid_across_years(self):
        """Versioned J277 lesson wrappers must render MCQs in a 2×2 grid."""
        samples = (19, 31, 80, 140, 164)
        browser = self.playwright.chromium.launch(headless=True)
        try:
            for lesson in samples:
                for width, height in ((1366, 768), (390, 844)):
                    with self.subTest(lesson=lesson, width=width):
                        page = browser.new_page(viewport={"width": width, "height": height})
                        try:
                            page.goto(
                                f"http://127.0.0.1:{self.port}/lessons/j277/lesson-{lesson:03d}/index.html#do-now",
                                wait_until="networkidle", timeout=45000,
                            )
                            options = page.locator(
                                "#do-now .donow-questions .donow-question:nth-child(2) ol.j277-mcq > li"
                            )
                            options.first.wait_for(timeout=20000)
                            self.assertEqual(options.count(), 4)
                            a, b, c, d = [options.nth(i).bounding_box() for i in range(4)]
                            self.assertTrue(all((a, b, c, d)))
                            self.assertAlmostEqual(a["y"], b["y"], delta=3)
                            self.assertAlmostEqual(c["y"], d["y"], delta=3)
                            self.assertAlmostEqual(a["x"], c["x"], delta=3)
                            self.assertAlmostEqual(b["x"], d["x"], delta=3)
                            self.assertGreater(b["x"], a["x"] + 10)
                            self.assertGreater(c["y"], a["y"] + 10)
                            self.assertLessEqual(b["x"] + b["width"], width + 1)
                            self.assertEqual(
                                page.locator("#do-now .donow-stage[hidden]").count(), 4,
                                "Answer screens must stay hidden until revealed",
                            )
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
