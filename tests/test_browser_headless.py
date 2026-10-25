#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Headless Microsoft Edge Browser Integration & CDP Automated Test Suite
- Pure Python standard library implementation (zero 3rd-party dependencies like 'websockets')
- Validates index.html and study.html
- Verifies mode switching, live keyword search, regex special character resilience, answer toggles, and 0 console errors
"""

import subprocess
import time
import json
import urllib.request
import tempfile
import shutil
import os
import sys
import threading
import functools
import http.server
import socket
import struct
import base64

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass


class SimpleWebSocket:
    """Minimal RFC 6455 WebSocket client using standard library socket."""
    def __init__(self, host, port, path, timeout=10):
        self.sock = socket.create_connection((host, port), timeout=timeout)
        self.sock.settimeout(timeout)
        key = base64.b64encode(os.urandom(16)).decode("ascii")
        req = (
            f"GET {path} HTTP/1.1\r\n"
            f"Host: {host}:{port}\r\n"
            f"Upgrade: websocket\r\n"
            f"Connection: Upgrade\r\n"
            f"Sec-WebSocket-Key: {key}\r\n"
            f"Sec-WebSocket-Version: 13\r\n\r\n"
        )
        self.sock.sendall(req.encode("utf-8"))
        resp = b""
        while b"\r\n\r\n" not in resp:
            chunk = self.sock.recv(1024)
            if not chunk:
                break
            resp += chunk
        if b" 101 " not in resp:
            raise ConnectionError(f"WebSocket handshake failed: {resp}")

    def send_text(self, text):
        payload = text.encode("utf-8")
        mask_key = os.urandom(4)
        n = len(payload)
        if n < 126:
            header = struct.pack("!BB", 0x81, 0x80 | n)
        elif n <= 0xffff:
            header = struct.pack("!BBH", 0x81, 0x80 | 126, n)
        else:
            header = struct.pack("!BBQ", 0x81, 0x80 | 127, n)
        masked = bytes(b ^ mask_key[i % 4] for i, b in enumerate(payload))
        self.sock.sendall(header + mask_key + masked)

    def recv_text(self, timeout=None):
        if timeout is not None:
            self.sock.settimeout(timeout)
        try:
            head = self.sock.recv(2)
        except (socket.timeout, BlockingIOError):
            return None
        if len(head) < 2:
            return None
        b1, b2 = head
        masked = bool(b2 & 0x80)
        length = b2 & 0x7f
        if length == 126:
            length = struct.unpack("!H", self.sock.recv(2))[0]
        elif length == 127:
            length = struct.unpack("!Q", self.sock.recv(8))[0]
        mask = self.sock.recv(4) if masked else None
        data = b""
        while len(data) < length:
            chunk = self.sock.recv(length - len(data))
            if not chunk:
                break
            data += chunk
        if masked:
            data = bytes(b ^ mask[i % 4] for i, b in enumerate(data))
        return data.decode("utf-8", errors="replace")

    def close(self):
        try:
            self.sock.close()
        except Exception:
            pass


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


class QuietServer(http.server.HTTPServer):
    def handle_error(self, request, client_address):
        exc = sys.exc_info()[1]
        if isinstance(exc, (ConnectionResetError, BrokenPipeError)):
            return
        super().handle_error(request, client_address)


def run_tests():
    edge_paths = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
    ]
    edge_bin = None
    for p in edge_paths:
        if os.path.exists(p):
            edge_bin = p
            break
            
    if not edge_bin:
        print("[SKIP] Edge binary not found, skipping headless browser test.")
        return True

    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    
    # 1. Start local HTTP server on port 8769
    server_port = 8769
    httpd = QuietServer(("127.0.0.1", server_port), functools.partial(QuietHandler, directory=base_dir))
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"Local test HTTP server running at http://127.0.0.1:{server_port}")

    user_data_dir = tempfile.mkdtemp(prefix="edge_headless_")
    cdp_port = 9223
    cmd = [
        edge_bin,
        "--headless=new",
        "--disable-gpu",
        "--window-size=1400,900",
        "--allow-file-access-from-files",
        f"--remote-debugging-port={cdp_port}",
        f"--user-data-dir={user_data_dir}",
        "about:blank"
    ]
    
    print(f"Launching Edge headless: {edge_bin} on port {cdp_port}")
    proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    ws = None
    try:
        # Wait for CDP debug endpoint
        ws_url = None
        for _ in range(30):
            time.sleep(0.5)
            try:
                with urllib.request.urlopen(f"http://127.0.0.1:{cdp_port}/json") as resp:
                    data = json.loads(resp.read().decode())
                    page_targets = [t for t in data if t.get("type") == "page"]
                    if page_targets:
                        ws_url = page_targets[0].get("webSocketDebuggerUrl")
                        if ws_url:
                            break
            except Exception:
                pass
                
        if not ws_url:
            raise RuntimeError(f"Could not connect to Edge DevTools port {cdp_port}")
            
        print(f"Connected to CDP WebSocket: {ws_url}")
        path = "/" + ws_url.split("/", 3)[3]
        ws = SimpleWebSocket("127.0.0.1", cdp_port, path, timeout=10)

        msg_id = 0
        errors = []

        def send_cmd(method, params=None):
            nonlocal msg_id
            msg_id += 1
            payload = {"id": msg_id, "method": method, "params": params or {}}
            ws.send_text(json.dumps(payload))
            while True:
                resp_raw = ws.recv_text(timeout=5)
                if not resp_raw:
                    raise TimeoutError(f"Timed out waiting for response to {method}")
                resp = json.loads(resp_raw)
                
                # Check for runtime errors/console messages
                m = resp.get("method")
                if m == "Runtime.exceptionThrown":
                    details = resp.get("params", {}).get("exceptionDetails", {})
                    errors.append(f"JS Exception: {details.get('text')} - {details.get('exception', {}).get('description')}")
                elif m == "Console.messageAdded":
                    msg = resp.get("params", {}).get("message", {})
                    if msg.get("level") == "error":
                        errors.append(f"Console Error: {msg.get('text')}")
                
                if resp.get("id") == msg_id:
                    return resp

        def drain_events(timeout=0.3):
            while True:
                resp_raw = ws.recv_text(timeout=timeout)
                if not resp_raw:
                    break
                try:
                    resp = json.loads(resp_raw)
                    m = resp.get("method")
                    if m == "Runtime.exceptionThrown":
                        details = resp.get("params", {}).get("exceptionDetails", {})
                        errors.append(f"JS Exception: {details.get('text')} - {details.get('exception', {}).get('description')}")
                    elif m == "Console.messageAdded":
                        msg = resp.get("params", {}).get("message", {})
                        if msg.get("level") == "error":
                            errors.append(f"Console Error: {msg.get('text')}")
                except Exception:
                    pass

        def navigate_and_wait(url):
            send_cmd("Page.navigate", {"url": url})
            for _ in range(50):
                time.sleep(0.2)
                resp = send_cmd("Runtime.evaluate", {
                    "expression": "document.readyState === 'complete' && window.location.href !== 'about:blank'",
                    "returnByValue": True
                })
                if resp.get("result", {}).get("result", {}).get("value") is True:
                    break
            time.sleep(0.5)

        # Enable runtime & console
        send_cmd("Runtime.enable")
        send_cmd("Console.enable")
        send_cmd("Page.enable")

        # -------------------------------------------------------------
        # Test 1: index.html
        # -------------------------------------------------------------
        index_url = f"http://127.0.0.1:{server_port}/index.html"
        print(f"\n[1] Testing index.html: {index_url}")
        navigate_and_wait(index_url)
        drain_events(0.3)
        
        eval_resp = send_cmd("Runtime.evaluate", {
            "expression": "({ href: window.location.href, examCatalogCount: (window.EXAM_CATALOG ? window.EXAM_CATALOG.length : 0), totalRounds: (window.EXAM_ROUNDS ? Object.keys(window.EXAM_ROUNDS).length : 0), keys: Object.keys(window.EXAM_ROUNDS || {}), hasStudyBtn: !!document.querySelector('.btn-study-link'), studyHref: document.querySelector('.btn-study-link') ? document.querySelector('.btn-study-link').getAttribute('href') : '' })",
            "returnByValue": True
        })
        val = eval_resp.get("result", {}).get("result", {}).get("value", {})
        print("  index.html evaluation result:", val)
        assert val.get("examCatalogCount") == 27, f"Expected 27 catalog items, got {val.get('examCatalogCount')}"
        assert val.get("totalRounds") == 27, f"Expected 27 rounds loaded, got {val.get('totalRounds')}"
        assert val.get("hasStudyBtn") is True, "btn-study-link missing in index.html"
        assert val.get("studyHref") == "study.html", f"Expected href 'study.html', got {val.get('studyHref')}"

        # Font Typography Verification for index.html
        print("  Verifying LG EI fonts on index.html...")
        font_resp = send_cmd("Runtime.evaluate", {
            "expression": """(async () => {
                await document.fonts.ready;
                // Force-verify that all 5 woff2 font assets can be loaded over HTTP and decoded
                await Promise.all([
                    document.fonts.load('700 20px "LG EI Headline"'),
                    document.fonts.load('400 20px "LG EI Headline"'),
                    document.fonts.load('400 16px "LG EI Text"'),
                    document.fonts.load('600 16px "LG EI Text"'),
                    document.fonts.load('700 16px "LG EI Text"')
                ]);
                const getFont = (sel) => {
                    const el = document.querySelector(sel);
                    return el ? window.getComputedStyle(el).fontFamily : '';
                };
                return {
                    bodyFont: getFont('body'),
                    topHeaderFont: getFont('header.top-header'),
                    logoFont: getFont('.header-logo'),
                    timerFont: getFont('.timer-val'),
                    promptFont: getFont('.question-prompt'),
                    submitBtnFont: getFont('.btn-submit'),
                    modalTitleFont: getFont('.modal-title'),
                    scoreBigFont: getFont('.score-big-number'),
                    catStatFont: getFont('.cat-stat-title'),
                    scoreJudgmentFont: getFont('.score-judgment'),
                    expAnswerFont: getFont('.exp-correct-answer'),
                    hasHeadlineBold: document.fonts.check('700 20px "LG EI Headline"'),
                    hasHeadlineRegular: document.fonts.check('400 20px "LG EI Headline"'),
                    hasTextRegular: document.fonts.check('400 16px "LG EI Text"'),
                    hasTextSemiBold: document.fonts.check('600 16px "LG EI Text"'),
                    hasTextBold: document.fonts.check('700 16px "LG EI Text"')
                };
            })()""",
            "awaitPromise": True,
            "returnByValue": True
        })
        font_val = font_resp.get("result", {}).get("result", {}).get("value", {})
        print("  index.html font verification:", font_val)
        assert "LG EI Text" in font_val.get("bodyFont", ""), f"Body font should include 'LG EI Text', got {font_val.get('bodyFont')}"
        assert "LG EI Headline" in font_val.get("topHeaderFont", ""), f"Top header should include 'LG EI Headline', got {font_val.get('topHeaderFont')}"
        assert "LG EI Headline" in font_val.get("logoFont", ""), f"Logo font should include 'LG EI Headline', got {font_val.get('logoFont')}"
        assert "LG EI Headline" in font_val.get("timerFont", ""), f"Timer font should include 'LG EI Headline', got {font_val.get('timerFont')}"
        assert "LG EI Headline" in font_val.get("promptFont", ""), f"Question prompt font should include 'LG EI Headline', got {font_val.get('promptFont')}"
        assert "LG EI Headline" in font_val.get("submitBtnFont", ""), f"Submit button font should include 'LG EI Headline', got {font_val.get('submitBtnFont')}"
        assert "LG EI Headline" in font_val.get("modalTitleFont", ""), f"Modal title font should include 'LG EI Headline', got {font_val.get('modalTitleFont')}"
        assert "LG EI Headline" in font_val.get("scoreBigFont", ""), f"Score big number font should include 'LG EI Headline', got {font_val.get('scoreBigFont')}"
        assert "LG EI Headline" in font_val.get("catStatFont", ""), f"Category stat title font should include 'LG EI Headline', got {font_val.get('catStatFont')}"
        assert "LG EI Headline" in font_val.get("scoreJudgmentFont", ""), f"Score judgment font should include 'LG EI Headline', got {font_val.get('scoreJudgmentFont')}"
        assert "LG EI Text" in font_val.get("expAnswerFont", ""), f"Answer text font should include 'LG EI Text', got {font_val.get('expAnswerFont')}"
        assert font_val.get("hasHeadlineBold") is True, "LG EI Headline Bold (700) failed document.fonts.check"
        assert font_val.get("hasHeadlineRegular") is True, "LG EI Headline Regular (400) failed document.fonts.check"
        assert font_val.get("hasTextRegular") is True, "LG EI Text Regular (400) failed document.fonts.check"
        assert font_val.get("hasTextSemiBold") is True, "LG EI Text SemiBold (600) failed document.fonts.check"
        assert font_val.get("hasTextBold") is True, "LG EI Text Bold (700) failed document.fonts.check"

        # Verify body font-size and paragraph font-sizes on index.html
        size_resp = send_cmd("Runtime.evaluate", {
            "expression": """({
                bodySize: window.getComputedStyle(document.body).fontSize,
                passageSize: window.getComputedStyle(document.getElementById('passageBox')).fontSize,
                expBodySize: window.getComputedStyle(document.getElementById('expBodyText')).fontSize
            })""",
            "returnByValue": True
        })
        size_val = size_resp.get("result", {}).get("result", {}).get("value", {})
        print("  index.html font size verification:", size_val)
        assert size_val.get("bodySize") == "15px", f"Expected body font-size 15px, got {size_val.get('bodySize')}"
        assert size_val.get("passageSize") == "15.5px", f"Expected passage font-size 15.5px, got {size_val.get('passageSize')}"
        assert size_val.get("expBodySize") == "15px", f"Expected expBodyText font-size 15px, got {size_val.get('expBodySize')}"

        # Verify typography computed styles (text-align, word-break, overflow-wrap) on index.html
        typo_resp = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                const docEl = document.documentElement;
                const bodyStyle = window.getComputedStyle(document.body);
                const passageEl = document.getElementById('passageBox');
                const passageStyle = window.getComputedStyle(passageEl);
                const expBodyEl = document.getElementById('expBodyText');
                const expBodyStyle = window.getComputedStyle(expBodyEl);
                const expTrapEl = document.getElementById('expTrapBox');
                const expTrapStyle = expTrapEl ? window.getComputedStyle(expTrapEl) : null;
                const promptEl = document.getElementById('questionPrompt');
                const promptStyle = window.getComputedStyle(promptEl);
                const codeEl = document.getElementById('codeBlock');
                const codeStyle = window.getComputedStyle(codeEl);

                return {
                    desktopScrollWidth: docEl.scrollWidth,
                    windowInnerWidth: window.innerWidth,
                    bodyWordBreak: bodyStyle.wordBreak,
                    bodyOverflowWrap: bodyStyle.overflowWrap,
                    passageTextAlign: passageStyle.textAlign,
                    passageWordBreak: passageStyle.wordBreak,
                    passageOverflowWrap: passageStyle.overflowWrap,
                    expBodyTextAlign: expBodyStyle.textAlign,
                    expBodyWordBreak: expBodyStyle.wordBreak,
                    expBodyOverflowWrap: expBodyStyle.overflowWrap,
                    expTrapTextAlign: expTrapStyle ? expTrapStyle.textAlign : '',
                    expTrapWordBreak: expTrapStyle ? expTrapStyle.wordBreak : '',
                    expTrapOverflowWrap: expTrapStyle ? expTrapStyle.overflowWrap : '',
                    promptTextAlign: promptStyle.textAlign,
                    promptWordBreak: promptStyle.wordBreak,
                    codeTextAlign: codeStyle.textAlign,
                    codeWordBreak: codeStyle.wordBreak
                };
            })()""",
            "returnByValue": True
        })
        typo_val = typo_resp.get("result", {}).get("result", {}).get("value", {})
        print("  index.html typography computed style verification:", typo_val)
        assert typo_val.get("bodyWordBreak") == "keep-all", f"Expected body word-break keep-all, got {typo_val.get('bodyWordBreak')}"
        assert typo_val.get("bodyOverflowWrap") == "break-word", f"Expected body overflow-wrap break-word, got {typo_val.get('bodyOverflowWrap')}"
        assert typo_val.get("passageTextAlign") == "justify", f"Expected passage text-align justify, got {typo_val.get('passageTextAlign')}"
        assert typo_val.get("passageWordBreak") == "keep-all", f"Expected passage word-break keep-all, got {typo_val.get('passageWordBreak')}"
        assert typo_val.get("passageOverflowWrap") == "break-word", f"Expected passage overflow-wrap break-word, got {typo_val.get('passageOverflowWrap')}"
        assert typo_val.get("expBodyTextAlign") == "justify", f"Expected expBodyText text-align justify, got {typo_val.get('expBodyTextAlign')}"
        assert typo_val.get("expBodyWordBreak") == "keep-all", f"Expected expBodyText word-break keep-all, got {typo_val.get('expBodyWordBreak')}"
        assert typo_val.get("expBodyOverflowWrap") == "break-word", f"Expected expBodyText overflow-wrap break-word, got {typo_val.get('expBodyOverflowWrap')}"
        if typo_val.get("expTrapTextAlign"):
            assert typo_val.get("expTrapTextAlign") == "justify", f"Expected expTrapBox text-align justify, got {typo_val.get('expTrapTextAlign')}"
            assert typo_val.get("expTrapWordBreak") == "keep-all", f"Expected expTrapBox word-break keep-all, got {typo_val.get('expTrapWordBreak')}"
            assert typo_val.get("expTrapOverflowWrap") == "break-word", f"Expected expTrapBox overflow-wrap break-word, got {typo_val.get('expTrapOverflowWrap')}"
        assert typo_val.get("promptTextAlign") in ("left", "start"), f"Expected prompt text-align left/start, got {typo_val.get('promptTextAlign')}"
        assert typo_val.get("promptWordBreak") == "keep-all", f"Expected prompt word-break keep-all, got {typo_val.get('promptWordBreak')}"
        assert typo_val.get("codeTextAlign") in ("left", "start"), f"Expected code text-align left/start, got {typo_val.get('codeTextAlign')}"
        assert typo_val.get("codeWordBreak") == "normal", f"Expected code word-break normal, got {typo_val.get('codeWordBreak')}"
        assert typo_val.get("desktopScrollWidth") <= typo_val.get("windowInnerWidth"), f"Desktop horizontal overflow on index.html: scrollWidth {typo_val.get('desktopScrollWidth')} > innerWidth {typo_val.get('windowInnerWidth')}"

        # Verify index.html favicon and initial mode toggle buttons
        init_ui_resp = send_cmd("Runtime.evaluate", {
            "expression": """({
                hasFavicon: !!document.querySelector('link[rel*="icon"]'),
                faviconHref: document.querySelector('link[rel*="icon"]') ? document.querySelector('link[rel*="icon"]').getAttribute('href') : '',
                practiceBtnText: document.getElementById('modePractice') ? document.getElementById('modePractice').textContent.trim() : '',
                realBtnText: document.getElementById('modeReal') ? document.getElementById('modeReal').textContent.trim() : '',
                practiceBtnDisplay: document.getElementById('modePractice') ? window.getComputedStyle(document.getElementById('modePractice')).display : '',
                realBtnDisplay: document.getElementById('modeReal') ? window.getComputedStyle(document.getElementById('modeReal')).display : ''
            })""",
            "returnByValue": True
        })
        init_ui_val = init_ui_resp.get("result", {}).get("result", {}).get("value", {})
        assert init_ui_val.get("hasFavicon") is True and "svg+xml" in init_ui_val.get("faviconHref", ""), "Missing or invalid favicon in index.html"
        assert init_ui_val.get("practiceBtnText") == "실전 모드로 전환", f"Unexpected practiceBtnText: {init_ui_val.get('practiceBtnText')}"
        assert init_ui_val.get("realBtnText") == "연습 모드로 전환", f"Unexpected realBtnText: {init_ui_val.get('realBtnText')}"
        assert init_ui_val.get("practiceBtnDisplay") != "none", "Expected #modePractice visible initially"
        assert init_ui_val.get("realBtnDisplay") == "none", "Expected #modeReal hidden initially"

        # -------------------------------------------------------------
        # Cheatsheet Modal Verification on index.html
        # -------------------------------------------------------------
        save_screenshots_enabled = bool(os.environ.get("SAVE_SCREENSHOTS"))
        screenshots_dir = os.path.join(base_dir, "docs", "screenshots")
        if save_screenshots_enabled:
            os.makedirs(screenshots_dir, exist_ok=True)

        def save_screenshot(filename):
            if not save_screenshots_enabled:
                return
            resp = send_cmd("Page.captureScreenshot", {"format": "png"})
            raw_b64 = resp.get("result", {}).get("data", "")
            if raw_b64:
                with open(os.path.join(screenshots_dir, filename), "wb") as f:
                    f.write(base64.b64decode(raw_b64))

        # 1. Open Cheatsheet Modal
        send_cmd("Runtime.evaluate", {"expression": "document.getElementById('btnOpenCheatsheet').click()"})
        time.sleep(0.3)
        drain_events(0.2)

        cs_open_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                isShown: document.getElementById('cheatsheetModal').classList.contains('show'),
                modalDisplay: window.getComputedStyle(document.getElementById('cheatsheetModal')).display,
                modalBoxWidth: window.getComputedStyle(document.querySelector('.cheatsheet-modal-box')).width,
                tabsCount: document.querySelectorAll('.cs-tab-btn').length,
                activeTabKey: document.querySelector('.cs-tab-btn.active') ? document.querySelector('.cs-tab-btn.active').dataset.tab : '',
                cardsCount: document.querySelectorAll('#csBody .cs-section-card').length,
                mnemonicBanners: document.querySelectorAll('#csBody .cs-mnemonic-banner').length,
                stepBadges: document.querySelectorAll('#csBody .cs-step-badge').length,
                mnemonicPills: document.querySelectorAll('#csBody .cs-mnemonic-pill').length,
                tabBtnColor: window.getComputedStyle(document.querySelector('.cs-tab-btn.active')).color,
                tabBtnBorder: window.getComputedStyle(document.querySelector('.cs-tab-btn.active')).borderBottomColor,
                card1ContentHtml: document.querySelectorAll('#csBody .cs-sec-content')[0] ? document.querySelectorAll('#csBody .cs-sec-content')[0].innerHTML : '',
                card1Height: document.querySelectorAll('#csBody .cs-section-card')[0] ? document.querySelectorAll('#csBody .cs-section-card')[0].offsetHeight : 0,
                csSecTextAlign: document.querySelector('.cs-sec-content') ? window.getComputedStyle(document.querySelector('.cs-sec-content')).textAlign : '',
                csSecWordBreak: document.querySelector('.cs-sec-content') ? window.getComputedStyle(document.querySelector('.cs-sec-content')).wordBreak : '',
                csItemTextAlign: document.querySelector('.cs-item-text') ? window.getComputedStyle(document.querySelector('.cs-item-text')).textAlign : '',
                csItemWordBreak: document.querySelector('.cs-item-text') ? window.getComputedStyle(document.querySelector('.cs-item-text')).wordBreak : '',
                csItemOverflowWrap: document.querySelector('.cs-item-text') ? window.getComputedStyle(document.querySelector('.cs-item-text')).overflowWrap : '',
                csMnemonicWordBreak: document.querySelector('.cs-mnemonic-text') ? window.getComputedStyle(document.querySelector('.cs-mnemonic-text')).wordBreak : '',
                csMnemonicOverflowWrap: document.querySelector('.cs-mnemonic-text') ? window.getComputedStyle(document.querySelector('.cs-mnemonic-text')).overflowWrap : '',
                csHeadingTextWrap: document.querySelector('.cs-sec-heading') ? window.getComputedStyle(document.querySelector('.cs-sec-heading')).textWrap : ''
            })""",
            "returnByValue": True
        })
        cs_val = cs_open_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Cheatsheet part1 eval:", cs_val)
        assert cs_val.get("isShown") is True, "Cheatsheet modal did not get .show class"
        assert cs_val.get("modalDisplay") == "flex", f"Expected modal display flex, got {cs_val.get('modalDisplay')}"
        assert cs_val.get("tabsCount") == 4, f"Expected 4 tabs, got {cs_val.get('tabsCount')}"
        assert cs_val.get("activeTabKey") == "part1", f"Expected active tab part1, got {cs_val.get('activeTabKey')}"
        assert cs_val.get("cardsCount") == 4, f"Expected 4 section cards in part1, got {cs_val.get('cardsCount')}"
        assert cs_val.get("mnemonicBanners") >= 2, f"Expected at least 2 mnemonic banners in part1, got {cs_val.get('mnemonicBanners')}"
        assert cs_val.get("stepBadges") >= 13, f"Expected at least 13 numbered steps in part1 (6 coupling + 7 cohesion), got {cs_val.get('stepBadges')}"
        assert cs_val.get("mnemonicPills") == 6, f"Expected exactly 6 mnemonic pills in part1 (Card1: 2, Card2: banner+heading, Card3: banner+heading), got {cs_val.get('mnemonicPills')}"
        assert cs_val.get("card1Height", 0) >= 140, f"Expected card1 to be uncrushed (>= 140px), got {cs_val.get('card1Height')}"
        assert cs_val.get("csSecTextAlign") == "justify", f"Expected .cs-sec-content text-align justify, got {cs_val.get('csSecTextAlign')}"
        assert cs_val.get("csSecWordBreak") == "keep-all", f"Expected .cs-sec-content word-break keep-all, got {cs_val.get('csSecWordBreak')}"
        assert cs_val.get("csItemTextAlign") == "justify", f"Expected .cs-item-text text-align justify, got {cs_val.get('csItemTextAlign')}"
        assert cs_val.get("csItemWordBreak") == "keep-all", f"Expected .cs-item-text word-break keep-all, got {cs_val.get('csItemWordBreak')}"
        assert cs_val.get("csItemOverflowWrap") == "break-word", f"Expected .cs-item-text overflow-wrap break-word, got {cs_val.get('csItemOverflowWrap')}"
        if cs_val.get("csMnemonicWordBreak"):
            assert cs_val.get("csMnemonicWordBreak") == "keep-all", f"Expected .cs-mnemonic-text word-break keep-all, got {cs_val.get('csMnemonicWordBreak')}"
            assert cs_val.get("csMnemonicOverflowWrap") == "break-word", f"Expected .cs-mnemonic-text overflow-wrap break-word, got {cs_val.get('csMnemonicOverflowWrap')}"
        if cs_val.get("csHeadingTextWrap"):
            assert cs_val.get("csHeadingTextWrap") == "balance", f"Expected .cs-sec-heading text-wrap balance, got {cs_val.get('csHeadingTextWrap')}"

        # Verify heading pill transformation in Card 2 and Card 3
        headings_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                card2HeadingHtml: document.querySelectorAll('#csBody .cs-sec-heading')[1] ? document.querySelectorAll('#csBody .cs-sec-heading')[1].innerHTML : '',
                card3HeadingHtml: document.querySelectorAll('#csBody .cs-sec-heading')[2] ? document.querySelectorAll('#csBody .cs-sec-heading')[2].innerHTML : ''
            })""",
            "returnByValue": True
        })
        h_val = headings_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Cheatsheet headings eval:", h_val)
        assert "cs-mnemonic-pill" in h_val.get("card2HeadingHtml", ""), f"Card 2 heading missing pill: {h_val.get('card2HeadingHtml')}"
        assert "→" in h_val.get("card2HeadingHtml", "") and "->" not in h_val.get("card2HeadingHtml", "") and "-&gt;" not in h_val.get("card2HeadingHtml", "")
        assert "cs-mnemonic-pill" in h_val.get("card3HeadingHtml", ""), f"Card 3 heading missing pill: {h_val.get('card3HeadingHtml')}"
        assert "→" in h_val.get("card3HeadingHtml", "") and "->" not in h_val.get("card3HeadingHtml", "") and "-&gt;" not in h_val.get("card3HeadingHtml", "")

        save_screenshot("cheatsheet_part1.png")

        # 2. Switch to part2 (DB & SQL)
        send_cmd("Runtime.evaluate", {"expression": "document.querySelector('.cs-tab-btn[data-tab=\"part2\"]').click()"})
        time.sleep(0.2)
        drain_events(0.1)
        part2_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                activeTabKey: document.querySelector('.cs-tab-btn.active').dataset.tab,
                cardsCount: document.querySelectorAll('#csBody .cs-section-card').length,
                mnemonicBanners: document.querySelectorAll('#csBody .cs-mnemonic-banner').length,
                subitemRows: document.querySelectorAll('#csBody .cs-subitem-row').length,
                stepBadges: document.querySelectorAll('#csBody .cs-step-badge').length
            })""",
            "returnByValue": True
        })
        p2_val = part2_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Cheatsheet part2 eval:", p2_val)
        assert p2_val.get("activeTabKey") == "part2"
        assert p2_val.get("cardsCount") == 3
        assert p2_val.get("mnemonicBanners") >= 1
        assert p2_val.get("subitemRows") >= 5
        save_screenshot("cheatsheet_part2.png")

        # 3. Switch to part3 (Security & Network)
        send_cmd("Runtime.evaluate", {"expression": "document.querySelector('.cs-tab-btn[data-tab=\"part3\"]').click()"})
        time.sleep(0.2)
        drain_events(0.1)
        part3_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                activeTabKey: document.querySelector('.cs-tab-btn.active').dataset.tab,
                cardsCount: document.querySelectorAll('#csBody .cs-section-card').length,
                subitemRows: document.querySelectorAll('#csBody .cs-subitem-row').length
            })""",
            "returnByValue": True
        })
        p3_val = part3_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Cheatsheet part3 eval:", p3_val)
        assert p3_val.get("activeTabKey") == "part3"
        assert p3_val.get("cardsCount") == 3
        assert p3_val.get("subitemRows") >= 5
        save_screenshot("cheatsheet_part3.png")

        # 4. Switch to tips (Exam tips & Strategy)
        send_cmd("Runtime.evaluate", {"expression": "document.querySelector('.cs-tab-btn[data-tab=\"tips\"]').click()"})
        time.sleep(0.2)
        drain_events(0.1)
        tips_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                activeTabKey: document.querySelector('.cs-tab-btn.active').dataset.tab,
                cardsCount: document.querySelectorAll('#csBody .cs-section-card').length,
                summaryCallout: document.querySelectorAll('#csBody .cs-summary-callout').length,
                calloutText: document.querySelector('#csBody .cs-summary-callout') ? document.querySelector('#csBody .cs-summary-callout').innerText : ''
            })""",
            "returnByValue": True
        })
        tips_val = tips_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Cheatsheet tips eval:", tips_val)
        assert tips_val.get("activeTabKey") == "tips"
        assert tips_val.get("cardsCount") == 3
        assert tips_val.get("summaryCallout") >= 1
        assert "70점 안정 합격" in tips_val.get("calloutText", "")
        save_screenshot("cheatsheet_tips.png")

        # 5. Close cheatsheet modal via close icon
        send_cmd("Runtime.evaluate", {"expression": "document.getElementById('btnCloseCheatsheet').click()"})
        time.sleep(0.2)
        drain_events(0.1)
        close_eval = send_cmd("Runtime.evaluate", {
            "expression": "document.getElementById('cheatsheetModal').classList.contains('show')",
            "returnByValue": True
        })
        assert close_eval.get("result", {}).get("result", {}).get("value") is False, "Modal did not close on #btnCloseCheatsheet click"

        # 6. Reopen and close via bottom button
        send_cmd("Runtime.evaluate", {"expression": "document.getElementById('btnOpenCheatsheet').click()"})
        time.sleep(0.2)
        send_cmd("Runtime.evaluate", {"expression": "document.getElementById('btnCloseCheatsheetBottom').click()"})
        time.sleep(0.2)
        close_bottom_eval = send_cmd("Runtime.evaluate", {
            "expression": "document.getElementById('cheatsheetModal').classList.contains('show')",
            "returnByValue": True
        })
        assert close_bottom_eval.get("result", {}).get("result", {}).get("value") is False, "Modal did not close on #btnCloseCheatsheetBottom click"

        # 7. Reopen and close via backdrop click
        send_cmd("Runtime.evaluate", {"expression": "document.getElementById('btnOpenCheatsheet').click()"})
        time.sleep(0.2)
        send_cmd("Runtime.evaluate", {"expression": "document.getElementById('cheatsheetModal').dispatchEvent(new MouseEvent('click', { bubbles: true }))"})
        time.sleep(0.2)
        close_backdrop_eval = send_cmd("Runtime.evaluate", {
            "expression": "document.getElementById('cheatsheetModal').classList.contains('show')",
            "returnByValue": True
        })
        assert close_backdrop_eval.get("result", {}).get("result", {}).get("value") is False, "Modal did not close on backdrop click"

        # 8. Reopen and close via Escape key
        send_cmd("Runtime.evaluate", {"expression": "document.getElementById('btnOpenCheatsheet').click()"})
        time.sleep(0.2)
        send_cmd("Runtime.evaluate", {"expression": "window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"})
        time.sleep(0.2)
        close_esc_eval = send_cmd("Runtime.evaluate", {
            "expression": "document.getElementById('cheatsheetModal').classList.contains('show')",
            "returnByValue": True
        })
        assert close_esc_eval.get("result", {}).get("result", {}).get("value") is False, "Modal did not close on Escape key"

        # 9. Test Memo Pad drawing, per-question persistence, and clear
        print("  Testing Memo Pad drawing and per-question persistence...")
        memo_eval = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                const canvas = document.getElementById('memoCanvas');
                const clearBtn = document.getElementById('btnClear');
                if (!canvas) return { error: 'No memoCanvas' };

                // Draw on Q1
                const rect = canvas.getBoundingClientRect();
                canvas.dispatchEvent(new MouseEvent('mousedown', { clientX: rect.left + 50, clientY: rect.top + 50, bubbles: true }));
                canvas.dispatchEvent(new MouseEvent('mousemove', { clientX: rect.left + 150, clientY: rect.top + 150, bubbles: true }));
                window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));

                const dataQ1 = canvas.toDataURL();

                // Navigate to Q2
                const boxes = document.querySelectorAll('.q-box');
                if (boxes.length < 2) return { error: 'Not enough q-boxes' };
                boxes[1].click();
                const dataQ2 = canvas.toDataURL();

                // Navigate back to Q1
                boxes[0].click();
                const dataQ1Restored = canvas.toDataURL();

                // Clear Q1
                if (clearBtn) clearBtn.click();
                const dataQ1Cleared = canvas.toDataURL();

                return {
                    drewSomething: dataQ1.length > 1000,
                    q2IsBlank: dataQ2 !== dataQ1,
                    q1Restored: dataQ1Restored === dataQ1,
                    q1Cleared: dataQ1Cleared !== dataQ1
                };
            })()""",
            "returnByValue": True
        })
        m_val = memo_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Memo pad eval:", m_val)
        assert m_val.get("drewSomething") is True, "Failed to draw on memoCanvas"
        assert m_val.get("q2IsBlank") is True, "Q2 memo was not blank/cleared upon navigation"
        assert m_val.get("q1Restored") is True, "Q1 memo was not properly restored upon returning to Q1"
        assert m_val.get("q1Cleared") is True, "Memo was not cleared after clearBtn click"

        # 10. Test Answer check status message styling and colors
        print("  Testing Answer check status message styling...")
        status_eval = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                const input = document.querySelector('.answer-input') || document.querySelector('input[type=\"text\"]');
                const checkBtn = document.getElementById('btnCheckAnswer');
                const statusMsg = document.getElementById('answerStatusMsg');

                // 1. Enter incorrect answer
                if (input) input.value = '999999_WRONG';
                if (checkBtn) checkBtn.click();

                const incorrectClass = statusMsg ? statusMsg.className : '';
                const incorrectColor = statusMsg ? window.getComputedStyle(statusMsg).color : '';

                // 2. Enter correct answer ('90')
                if (input) input.value = '90';
                if (checkBtn) checkBtn.click();

                const correctClass = statusMsg ? statusMsg.className : '';
                const correctColor = statusMsg ? window.getComputedStyle(statusMsg).color : '';

                return {
                    incorrectClass,
                    incorrectColor,
                    correctClass,
                    correctColor
                };
            })()""",
            "returnByValue": True
        })
        st_val = status_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Answer check status eval:", st_val)
        assert "status-incorrect" in st_val.get("incorrectClass", ""), f"Expected status-incorrect class, got {st_val.get('incorrectClass')}"
        assert st_val.get("incorrectColor") == "rgb(220, 38, 38)", f"Expected status-incorrect color rgb(220, 38, 38), got {st_val.get('incorrectColor')}"
        assert "status-correct" in st_val.get("correctClass", ""), f"Expected status-correct class, got {st_val.get('correctClass')}"
        assert st_val.get("correctColor") == "rgb(22, 163, 74)", f"Expected status-correct color rgb(22, 163, 74), got {st_val.get('correctColor')}"

        # 11. Test scoreModal rendering, fonts, review grid pass/fail styles, and dismissal
        score_eval = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                // Trigger score modal directly
                window.submitExamDirect = function() {
                    const originalConfirm = window.confirm;
                    window.confirm = () => true;
                    document.getElementById('btnSubmitExam').click();
                    window.confirm = originalConfirm;
                };
                window.submitExamDirect();
                const sm = document.getElementById('scoreModal');
                const titleStyle = window.getComputedStyle(document.getElementById('scoreTitle'));
                const bigStyle = window.getComputedStyle(document.getElementById('scoreBigNumber'));
                const judgStyle = window.getComputedStyle(document.getElementById('scoreJudgment'));
                const items = document.querySelectorAll('#reviewGrid .review-item');
                const passItems = document.querySelectorAll('#reviewGrid .review-item.pass');
                const failItems = document.querySelectorAll('#reviewGrid .review-item.fail');
                return {
                    isShown: sm.classList.contains('show'),
                    display: window.getComputedStyle(sm).display,
                    scoreTitleFontSize: titleStyle.fontSize,
                    scoreBigFontSize: bigStyle.fontSize,
                    scoreJudgmentFontSize: judgStyle.fontSize,
                    catStatsCols: window.getComputedStyle(document.querySelector('.category-stats-grid')).gridTemplateColumns.split(' ').length,
                    totalReviewItems: items.length,
                    passItemsCount: passItems.length,
                    failItemsCount: failItems.length,
                    passBg: passItems[0] ? window.getComputedStyle(passItems[0]).backgroundColor : '',
                    passColor: passItems[0] ? window.getComputedStyle(passItems[0]).color : '',
                    failBg: failItems[0] ? window.getComputedStyle(failItems[0]).backgroundColor : '',
                    failColor: failItems[0] ? window.getComputedStyle(failItems[0]).color : '',
                    timerPaused: document.getElementById('btnToggleTimer').textContent.trim() === '▶'
                };
            })()""",
            "returnByValue": True
        })
        s_val = score_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Score modal eval:", s_val)
        assert s_val.get("isShown") is True, "Score modal did not open on exam submit"
        assert s_val.get("timerPaused") is True, "Timer was not paused on exam submit"
        assert s_val.get("display") == "flex"
        assert s_val.get("scoreTitleFontSize") == "14px"
        assert s_val.get("scoreBigFontSize") == "34px"
        assert s_val.get("scoreJudgmentFontSize") == "16px"
        assert s_val.get("catStatsCols") == 3
        assert s_val.get("totalReviewItems") == 20, f"Expected 20 review items, got {s_val.get('totalReviewItems')}"
        assert s_val.get("passItemsCount") >= 1, "Expected at least 1 pass item (Q1 was answered correctly)"
        assert s_val.get("failItemsCount") >= 1, "Expected fail items for unanswered questions"
        assert s_val.get("passBg") == "rgb(220, 252, 231)", f"Expected pass item bg rgb(220, 252, 231), got {s_val.get('passBg')}"
        assert s_val.get("passColor") == "rgb(21, 128, 61)", f"Expected pass item color rgb(21, 128, 61), got {s_val.get('passColor')}"
        assert s_val.get("failBg") == "rgb(254, 226, 226)", f"Expected fail item bg rgb(254, 226, 226), got {s_val.get('failBg')}"
        assert s_val.get("failColor") == "rgb(185, 28, 28)", f"Expected fail item color rgb(185, 28, 28), got {s_val.get('failColor')}"

        # Close scoreModal via Escape key
        send_cmd("Runtime.evaluate", {"expression": "window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))"})
        time.sleep(0.2)
        score_close_eval = send_cmd("Runtime.evaluate", {
            "expression": "document.getElementById('scoreModal').classList.contains('show')",
            "returnByValue": True
        })
        assert score_close_eval.get("result", {}).get("result", {}).get("value") is False, "Score modal did not close on Escape key"

        # 12. Responsive viewport test (600px mobile viewport & Galaxy S24 Ultra 412 x 915px viewport)
        send_cmd("Emulation.setDeviceMetricsOverride", {
            "width": 600,
            "height": 800,
            "deviceScaleFactor": 1,
            "mobile": True
        })
        time.sleep(0.2)
        send_cmd("Runtime.evaluate", {"expression": "document.getElementById('btnOpenCheatsheet').click()"})
        time.sleep(0.2)
        responsive_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                boxWidth: document.querySelector('.cheatsheet-modal-box').offsetWidth,
                windowWidth: window.innerWidth
            })""",
            "returnByValue": True
        })
        r_val = responsive_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Mobile 600px viewport eval:", r_val)
        assert r_val.get("boxWidth", 999) <= 600 * 0.96 + 2, f"Expected cheatsheet modal box width <= 96vw ({600*0.96}), got {r_val.get('boxWidth')}"
        send_cmd("Runtime.evaluate", {"expression": "document.getElementById('btnCloseCheatsheet').click()"})
        time.sleep(0.15)

        # 13. Galaxy S24 Ultra (412 x 915px, DPR 3.5, mobile=True) Test on index.html
        print("  Testing Galaxy S24 Ultra (412 x 915px, DPR 3.5) layout on index.html...")
        send_cmd("Emulation.setDeviceMetricsOverride", {
            "width": 412,
            "height": 915,
            "deviceScaleFactor": 3.5,
            "mobile": True
        })
        time.sleep(0.25)
        s24_index_eval = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                const docEl = document.documentElement;
                const bodyStyle = window.getComputedStyle(document.body);
                const wrapperStyle = window.getComputedStyle(document.querySelector('.exam-wrapper'));
                const timerStyle = window.getComputedStyle(document.querySelector('.header-center-timer'));
                const logoRect = document.querySelector('.header-logo').getBoundingClientRect();
                const timerRect = document.querySelector('.header-center-timer').getBoundingClientRect();
                const selectRect = document.getElementById('examSelect').getBoundingClientRect();
                const qBarStyle = window.getComputedStyle(document.querySelector('.question-boxes-bar'));
                const qBoxRect = document.querySelector('.q-box').getBoundingClientRect();
                const workspaceStyle = window.getComputedStyle(document.querySelector('.main-workspace'));
                const inputRect = document.querySelector('.exam-input-text').getBoundingClientRect();
                const toolsRect = document.querySelector('.tools-column').getBoundingClientRect();
                const problemRect = document.querySelector('.problem-section').getBoundingClientRect();
                const canvasRect = document.getElementById('memoCanvas').getBoundingClientRect();
                const studyBtnRect = document.querySelector('.btn-study-link').getBoundingClientRect();
                const csBtnRect = document.getElementById('btnOpenCheatsheet').getBoundingClientRect();
                const submitBtnRect = document.getElementById('btnSubmitExam').getBoundingClientRect();

                // Check timer does not overlap logo
                const timerOverlapsLogo = !(timerRect.left >= logoRect.right || timerRect.right <= logoRect.left || timerRect.top >= logoRect.bottom || timerRect.bottom <= logoRect.top);

                return {
                    windowWidth: window.innerWidth,
                    windowHeight: window.innerHeight,
                    scrollWidth: docEl.scrollWidth,
                    bodyMinWidth: bodyStyle.minWidth,
                    wrapperWidth: document.querySelector('.exam-wrapper').offsetWidth,
                    timerPosition: timerStyle.position,
                    timerOverlapsLogo,
                    selectWidth: Math.round(selectRect.width),
                    qGridCols: qBarStyle.gridTemplateColumns.split(' ').length,
                    qBoxHeight: Math.round(qBoxRect.height),
                    workspaceDir: workspaceStyle.flexDirection,
                    inputWidth: Math.round(inputRect.width),
                    toolsTopBelowProblem: toolsRect.top >= problemRect.bottom - 2,
                    toolsWidth: Math.round(toolsRect.width),
                    canvasWidth: Math.round(canvasRect.width),
                    canvasHeight: Math.round(canvasRect.height),
                    canvasTouchAction: window.getComputedStyle(document.getElementById('memoCanvas')).touchAction,
                    studyAndCsEqualHeight: Math.abs(studyBtnRect.height - csBtnRect.height) <= 1 && Math.abs(studyBtnRect.width - csBtnRect.width) <= 2,
                    submitFullWidth: Math.round(submitBtnRect.width) >= 380,
                    bodyWordBreak: bodyStyle.wordBreak,
                    bodyOverflowWrap: bodyStyle.overflowWrap,
                    passageTextAlign: window.getComputedStyle(document.getElementById('passageBox')).textAlign,
                    passageWordBreak: window.getComputedStyle(document.getElementById('passageBox')).wordBreak,
                    passageOverflowWrap: window.getComputedStyle(document.getElementById('passageBox')).overflowWrap,
                    expBodyTextAlign: window.getComputedStyle(document.getElementById('expBodyText')).textAlign,
                    expBodyWordBreak: window.getComputedStyle(document.getElementById('expBodyText')).wordBreak,
                    expBodyOverflowWrap: window.getComputedStyle(document.getElementById('expBodyText')).overflowWrap,
                    expTrapTextAlign: window.getComputedStyle(document.getElementById('expTrapBox')).textAlign,
                    expTrapWordBreak: window.getComputedStyle(document.getElementById('expTrapBox')).wordBreak,
                    expTrapOverflowWrap: window.getComputedStyle(document.getElementById('expTrapBox')).overflowWrap,
                    promptTextAlign: window.getComputedStyle(document.getElementById('questionPrompt')).textAlign,
                    promptWordBreak: window.getComputedStyle(document.getElementById('questionPrompt')).wordBreak,
                    codeTextAlign: window.getComputedStyle(document.getElementById('codeBlock')).textAlign,
                    codeWordBreak: window.getComputedStyle(document.getElementById('codeBlock')).wordBreak
                };
            })()""",
            "returnByValue": True
        })
        s24_idx = s24_index_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Galaxy S24 Ultra index.html eval:", s24_idx)
        assert s24_idx.get("windowWidth") == 412 and s24_idx.get("windowHeight") == 915
        assert s24_idx.get("scrollWidth", 9999) <= 412, f"Horizontal overflow on index.html at 412px! scrollWidth={s24_idx.get('scrollWidth')}"
        assert s24_idx.get("bodyMinWidth") == "0px", f"Expected body min-width 0px, got {s24_idx.get('bodyMinWidth')}"
        assert s24_idx.get("bodyWordBreak") == "keep-all", f"Expected mobile body word-break keep-all, got {s24_idx.get('bodyWordBreak')}"
        assert s24_idx.get("bodyOverflowWrap") == "break-word", f"Expected mobile body overflow-wrap break-word, got {s24_idx.get('bodyOverflowWrap')}"
        assert s24_idx.get("passageTextAlign") == "justify", f"Expected mobile passage text-align justify, got {s24_idx.get('passageTextAlign')}"
        assert s24_idx.get("passageWordBreak") == "keep-all", f"Expected mobile passage word-break keep-all, got {s24_idx.get('passageWordBreak')}"
        assert s24_idx.get("passageOverflowWrap") == "break-word", f"Expected mobile passage overflow-wrap break-word, got {s24_idx.get('passageOverflowWrap')}"
        assert s24_idx.get("expBodyTextAlign") == "justify", f"Expected mobile expBodyText text-align justify, got {s24_idx.get('expBodyTextAlign')}"
        assert s24_idx.get("expBodyWordBreak") == "keep-all", f"Expected mobile expBodyText word-break keep-all, got {s24_idx.get('expBodyWordBreak')}"
        assert s24_idx.get("expBodyOverflowWrap") == "break-word", f"Expected mobile expBodyText overflow-wrap break-word, got {s24_idx.get('expBodyOverflowWrap')}"
        assert s24_idx.get("expTrapTextAlign") == "justify", f"Expected mobile expTrapBox text-align justify, got {s24_idx.get('expTrapTextAlign')}"
        assert s24_idx.get("expTrapWordBreak") == "keep-all", f"Expected mobile expTrapBox word-break keep-all, got {s24_idx.get('expTrapWordBreak')}"
        assert s24_idx.get("promptTextAlign") in ("left", "start"), f"Expected mobile prompt text-align left/start, got {s24_idx.get('promptTextAlign')}"
        assert s24_idx.get("promptWordBreak") == "keep-all", f"Expected mobile prompt word-break keep-all, got {s24_idx.get('promptWordBreak')}"
        assert s24_idx.get("codeTextAlign") in ("left", "start"), f"Expected mobile code text-align left/start, got {s24_idx.get('codeTextAlign')}"
        assert s24_idx.get("codeWordBreak") == "normal", f"Expected mobile code word-break normal, got {s24_idx.get('codeWordBreak')}"
        assert s24_idx.get("wrapperWidth") <= 412, f"Expected exam-wrapper width <= 412, got {s24_idx.get('wrapperWidth')}"
        assert s24_idx.get("timerPosition") == "static", f"Expected static timer on mobile, got {s24_idx.get('timerPosition')}"
        assert s24_idx.get("timerOverlapsLogo") is False, "Timer overlaps logo on Galaxy S24 Ultra!"
        assert s24_idx.get("qGridCols") == 10, f"Expected 10-column question grid on mobile, got {s24_idx.get('qGridCols')}"
        assert s24_idx.get("qBoxHeight") == 34, f"Expected 34px q-box touch target height, got {s24_idx.get('qBoxHeight')}"
        assert s24_idx.get("workspaceDir") == "column", f"Expected main-workspace flex-direction column, got {s24_idx.get('workspaceDir')}"
        assert s24_idx.get("toolsTopBelowProblem") is True, "Expected tools-column (memo pad) stacked below problem-section"
        assert abs(s24_idx.get("canvasWidth", 0) - s24_idx.get("canvasHeight", 999)) <= 1, f"Expected 1:1 square memoCanvas on Galaxy S24 Ultra, got {s24_idx.get('canvasWidth')}x{s24_idx.get('canvasHeight')}"
        assert s24_idx.get("canvasTouchAction") == "none", f"Expected touch-action none on memoCanvas, got {s24_idx.get('canvasTouchAction')}"
        assert s24_idx.get("studyAndCsEqualHeight") is True, "Expected equal height/width for paired header buttons on Galaxy S24 Ultra"
        assert s24_idx.get("submitFullWidth") is True, f"Expected full-width submit button on Galaxy S24 Ultra, got {s24_idx}"
        save_screenshot("s24_ultra_index_cbt.png")

        # Verify Practice/Real Mode Toggle & Multi-Blank + Passage Table (Q5) on Galaxy S24 Ultra
        s24_edge_eval = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                // Toggle Practice -> Real -> Practice
                const pBtn = document.getElementById('modePractice');
                const rBtn = document.getElementById('modeReal');
                const initialPracticeLabel = pBtn.textContent.trim();
                const initialRealLabel = rBtn.textContent.trim();
                pBtn.click();
                const inRealMode = window.getComputedStyle(rBtn).display !== 'none' && window.getComputedStyle(pBtn).display === 'none' && window.getComputedStyle(document.getElementById('btnCheckAnswer')).display === 'none';
                rBtn.click();
                const backInPractice = window.getComputedStyle(pBtn).display !== 'none' && window.getComputedStyle(rBtn).display === 'none' && window.getComputedStyle(document.getElementById('btnCheckAnswer')).display !== 'none';

                // Navigate to Q5 (multi_blank + passage table)
                const boxes = document.querySelectorAll('.q-box');
                if (boxes[4]) boxes[4].click();
                const blankInputs = document.querySelectorAll('.exam-input-text[data-blank-key]');
                const blankInputsCount = blankInputs.length;
                const blankInput1Width = blankInputs[0] ? Math.round(blankInputs[0].getBoundingClientRect().width) : 0;
                const passageTable = document.querySelector('.passage-text table');
                const passageTableDisplay = passageTable ? window.getComputedStyle(passageTable).display : '';
                const passageTableTh = passageTable ? passageTable.querySelector('th') : null;
                const passageTableThWordBreak = passageTableTh ? window.getComputedStyle(passageTableTh).wordBreak : '';
                const passageTableTd = passageTable ? passageTable.querySelector('td') : null;
                const passageTableTdWordBreak = passageTableTd ? window.getComputedStyle(passageTableTd).wordBreak : '';
                const scrollWidthQ5 = document.documentElement.scrollWidth;

                // Return to Q1
                if (boxes[0]) boxes[0].click();

                return {
                    initialPracticeLabel,
                    initialRealLabel,
                    inRealMode,
                    backInPractice,
                    blankInputsCount,
                    blankInput1Width,
                    passageTableDisplay,
                    passageTableThWordBreak,
                    passageTableTdWordBreak,
                    scrollWidthQ5
                };
            })()""",
            "returnByValue": True
        })
        s24_ed = s24_edge_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Galaxy S24 Ultra mode toggle & Q5 multi_blank/table eval:", s24_ed)
        assert s24_ed.get("initialPracticeLabel") == "실전 모드로 전환", f"Unexpected initialPracticeLabel: {s24_ed.get('initialPracticeLabel')}"
        assert s24_ed.get("initialRealLabel") == "연습 모드로 전환", f"Unexpected initialRealLabel: {s24_ed.get('initialRealLabel')}"
        assert s24_ed.get("inRealMode") is True, "Clicking #modePractice failed to switch to Real mode"
        assert s24_ed.get("backInPractice") is True, "Clicking #modeReal failed to switch back to Practice mode"
        assert s24_ed.get("blankInputsCount") == 2, f"Expected 2 multi_blank inputs on Q5, got {s24_ed.get('blankInputsCount')}"
        assert s24_ed.get("blankInput1Width", 0) >= 320, f"Expected expanded multi_blank input width on 412px, got {s24_ed.get('blankInput1Width')}"
        assert s24_ed.get("passageTableDisplay") == "block", f"Expected passage table display block on mobile, got {s24_ed.get('passageTableDisplay')}"
        if s24_ed.get("passageTableThWordBreak"):
            assert s24_ed.get("passageTableThWordBreak") == "normal", f"Expected passage table th word-break normal, got {s24_ed.get('passageTableThWordBreak')}"
        if s24_ed.get("passageTableTdWordBreak"):
            assert s24_ed.get("passageTableTdWordBreak") == "normal", f"Expected passage table td word-break normal, got {s24_ed.get('passageTableTdWordBreak')}"
        assert s24_ed.get("scrollWidthQ5", 999) <= 412, f"Horizontal overflow on Q5 multi_blank/table view: {s24_ed.get('scrollWidthQ5')}"

        # Verify Cheatsheet & Score Modals on Galaxy S24 Ultra (412 x 915px)
        send_cmd("Runtime.evaluate", {"expression": "document.getElementById('btnOpenCheatsheet').click()"})
        time.sleep(0.2)
        s24_cs_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                csWidth: document.querySelector('.cheatsheet-modal-box').offsetWidth,
                csHeight: document.querySelector('.cheatsheet-modal-box').offsetHeight,
                scrollWidth: document.documentElement.scrollWidth
            })""",
            "returnByValue": True
        })
        s24_cs = s24_cs_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Galaxy S24 Ultra cheatsheet modal eval:", s24_cs)
        assert s24_cs.get("csWidth", 999) <= 412, f"Cheatsheet modal exceeds 412px width: {s24_cs.get('csWidth')}"
        assert s24_cs.get("scrollWidth", 999) <= 412, f"Horizontal overflow with cheatsheet modal open: {s24_cs.get('scrollWidth')}"
        save_screenshot("s24_ultra_cheatsheet_modal.png")
        send_cmd("Runtime.evaluate", {"expression": "document.getElementById('btnCloseCheatsheet').click()"})
        time.sleep(0.15)

        send_cmd("Runtime.evaluate", {"expression": "window.submitExamDirect()"})
        time.sleep(0.2)
        s24_score_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                modalWidth: document.querySelector('#scoreModal .modal-container').offsetWidth,
                catStatsCols: window.getComputedStyle(document.querySelector('.category-stats-grid')).gridTemplateColumns.split(' ').length,
                reviewGridCols: window.getComputedStyle(document.querySelector('.review-grid')).gridTemplateColumns.split(' ').length,
                scrollWidth: document.documentElement.scrollWidth
            })""",
            "returnByValue": True
        })
        s24_sc = s24_score_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Galaxy S24 Ultra score modal eval:", s24_sc)
        assert s24_sc.get("modalWidth", 999) <= 412, f"Score modal exceeds 412px width: {s24_sc.get('modalWidth')}"
        assert s24_sc.get("catStatsCols") == 1, f"Expected 1 column for category-stats-grid on 412px, got {s24_sc.get('catStatsCols')}"
        assert s24_sc.get("reviewGridCols") == 4, f"Expected 4 columns for review-grid on 412px, got {s24_sc.get('reviewGridCols')}"
        assert s24_sc.get("scrollWidth", 999) <= 412
        send_cmd("Runtime.evaluate", {"expression": "document.getElementById('btnCloseModal').click()"})
        send_cmd("Emulation.clearDeviceMetricsOverride")
        time.sleep(0.2)

        # Test mode reset to practice on btnRestartFull
        restart_eval = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                // Switch to Real mode
                document.getElementById('modePractice').click();
                // Submit exam to open score modal
                window.submitExamDirect();
                // Click restart full
                document.getElementById('btnRestartFull').click();
                const pBtn = document.getElementById('modePractice');
                const rBtn = document.getElementById('modeReal');
                const timerRunning = document.getElementById('btnToggleTimer').textContent.trim() === '⏸';
                return {
                    pBtnDisplay: window.getComputedStyle(pBtn).display,
                    rBtnDisplay: window.getComputedStyle(rBtn).display,
                    timerRunning
                };
            })()""",
            "returnByValue": True
        })
        rst_val = restart_eval.get("result", {}).get("result", {}).get("value", {})
        assert rst_val.get("pBtnDisplay") != "none", "Expected modePractice visible after btnRestartFull"
        assert rst_val.get("rBtnDisplay") == "none", "Expected modeReal hidden after btnRestartFull"
        assert rst_val.get("timerRunning") is True, "Expected timer restarted with ⏸ on btnRestartFull"

        # Test retake mode: points normalization and practice mode reset
        retake_eval = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                // Submit exam to open score modal
                window.submitExamDirect();
                const origConfirm = window.confirm;
                window.confirm = () => true;
                document.getElementById('btnRetakeWrong').click();
                window.confirm = origConfirm;
                const ptBadge20 = document.getElementById('qPointsBadge').textContent.trim();
                const checkBtnDisplay = window.getComputedStyle(document.getElementById('btnCheckAnswer')).display;
                const pBtnDisplay = window.getComputedStyle(document.getElementById('modePractice')).display;

                // Exit retake mode
                window.confirm = () => true;
                document.getElementById('btnExitRetake').click();
                window.confirm = origConfirm;

                // Select a 15-question theme exam (c_special)
                window.confirm = () => true;
                const select = document.getElementById('examSelect');
                select.value = 'c_special';
                select.dispatchEvent(new Event('change'));
                window.confirm = origConfirm;

                const normalPtBadge15 = document.getElementById('qPointsBadge').textContent.trim();
                window.submitExamDirect();
                window.confirm = () => true;
                document.getElementById('btnRetakeWrong').click();
                window.confirm = origConfirm;
                const retakePtBadge15 = document.getElementById('qPointsBadge').textContent.trim();

                // Restore back to 2026_1
                window.confirm = () => true;
                select.value = '2026_1';
                select.dispatchEvent(new Event('change'));
                window.confirm = origConfirm;

                return {
                    ptBadge20,
                    checkBtnDisplay,
                    pBtnDisplay,
                    normalPtBadge15,
                    retakePtBadge15
                };
            })()""",
            "returnByValue": True
        })
        rt_val = retake_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Retake evaluation result:", rt_val)
        assert rt_val.get("ptBadge20") == "배점 5점", f"Expected '배점 5점' in 20-question retake, got '{rt_val.get('ptBadge20')}'"
        assert rt_val.get("checkBtnDisplay") != "none", "Expected btnCheckAnswer visible in retake mode"
        assert rt_val.get("pBtnDisplay") != "none", "Expected modePractice button visible in retake mode"
        assert rt_val.get("normalPtBadge15") == "배점 6.7점", f"Expected '배점 6.7점' for 15-question exam, got '{rt_val.get('normalPtBadge15')}'"
        assert rt_val.get("retakePtBadge15") == "배점 6.7점", f"Expected '배점 6.7점' in 15-question retake, got '{rt_val.get('retakePtBadge15')}'"

        # -------------------------------------------------------------
        # Test 2: study.html (Concept Mode)
        # -------------------------------------------------------------
        study_url = f"http://127.0.0.1:{server_port}/study.html"
        print(f"\n[2] Testing study.html: {study_url}")
        navigate_and_wait(study_url)
        drain_events(0.3)

        eval_resp = send_cmd("Runtime.evaluate", {
            "expression": "({ href: window.location.href, totalQuestions: (window.CONCEPT_BOOK ? window.CONCEPT_BOOK.questions.length : 0), unitKeys: (window.CONCEPT_BOOK ? Object.keys(window.CONCEPT_BOOK.units).length : 0), cardsRendered: document.querySelectorAll('.question-card').length, hasBackLink: !!document.querySelector('.btn-action-cbt'), formulaCards: document.querySelectorAll('.formula-card').length, hasRawLatex: /\\$[^\\$\\n]+\\$/.test(document.getElementById('theoryBodyContainer') ? document.getElementById('theoryBodyContainer').innerText : ''), hasFavicon: !!document.querySelector('link[rel*=\"icon\"]') })",
            "returnByValue": True
        })
        val = eval_resp.get("result", {}).get("result", {}).get("value", {})
        print("  study.html concept mode result:", val)
        assert val.get("hasFavicon") is True, "Missing favicon in study.html"
        assert val.get("totalQuestions") == 525, f"Expected 525 questions in concept-data, got {val.get('totalQuestions')}"
        assert val.get("unitKeys") == 5, f"Expected 5 units in concept-data, got {val.get('unitKeys')}"
        assert val.get("cardsRendered") > 0, "No question cards rendered in study.html"
        assert val.get("hasBackLink") is True, "CBT return button missing in study.html"
        assert val.get("formulaCards", 0) > 0, "Expected .formula-card elements rendered in Unit 1 theory"
        assert val.get("hasRawLatex") is False, "Found unrendered raw LaTeX ($...$) in study.html theory container"

        # Font Typography Verification for study.html
        print("  Verifying LG EI fonts on study.html...")
        study_font_resp = send_cmd("Runtime.evaluate", {
            "expression": """(async () => {
                await document.fonts.ready;
                // Force-verify that all 5 woff2 font assets can be loaded over HTTP and decoded
                await Promise.all([
                    document.fonts.load('700 20px "LG EI Headline"'),
                    document.fonts.load('400 20px "LG EI Headline"'),
                    document.fonts.load('400 16px "LG EI Text"'),
                    document.fonts.load('600 16px "LG EI Text"'),
                    document.fonts.load('700 16px "LG EI Text"')
                ]);
                const getFont = (sel) => {
                    const el = document.querySelector(sel);
                    return el ? window.getComputedStyle(el).fontFamily : '';
                };
                return {
                    bodyFont: getFont('body'),
                    studyHeaderFont: getFont('.study-header'),
                    logoFont: getFont('.header-logo'),
                    modeTabFont: getFont('.btn-mode-tab'),
                    heroTitleFont: getFont('.unit-hero-title'),
                    countTextFont: getFont('.questions-count-text'),
                    promptFont: getFont('.q-prompt-text'),
                    h3Font: getFont('.theory-body-container h3'),
                    correctLabelFont: getFont('.exp-correct-label'),
                    hasHeadlineBold: document.fonts.check('700 20px "LG EI Headline"'),
                    hasHeadlineRegular: document.fonts.check('400 20px "LG EI Headline"'),
                    hasTextRegular: document.fonts.check('400 16px "LG EI Text"'),
                    hasTextSemiBold: document.fonts.check('600 16px "LG EI Text"'),
                    hasTextBold: document.fonts.check('700 16px "LG EI Text"')
                };
            })()""",
            "awaitPromise": True,
            "returnByValue": True
        })
        study_font_val = study_font_resp.get("result", {}).get("result", {}).get("value", {})
        print("  study.html font verification:", study_font_val)
        assert "LG EI Text" in study_font_val.get("bodyFont", ""), f"Body font should include 'LG EI Text', got {study_font_val.get('bodyFont')}"
        assert "LG EI Headline" in study_font_val.get("studyHeaderFont", ""), f"Study header font should include 'LG EI Headline', got {study_font_val.get('studyHeaderFont')}"
        assert "LG EI Headline" in study_font_val.get("logoFont", ""), f"Logo font should include 'LG EI Headline', got {study_font_val.get('logoFont')}"
        assert "LG EI Headline" in study_font_val.get("modeTabFont", ""), f"Mode tab font should include 'LG EI Headline', got {study_font_val.get('modeTabFont')}"
        assert "LG EI Headline" in study_font_val.get("heroTitleFont", ""), f"Unit hero title should include 'LG EI Headline', got {study_font_val.get('heroTitleFont')}"
        assert "LG EI Headline" in study_font_val.get("countTextFont", ""), f"Questions count font should include 'LG EI Headline', got {study_font_val.get('countTextFont')}"
        assert "LG EI Headline" in study_font_val.get("promptFont", ""), f"Question prompt font should include 'LG EI Headline', got {study_font_val.get('promptFont')}"
        assert "LG EI Headline" in study_font_val.get("h3Font", ""), f"H3 heading font should include 'LG EI Headline', got {study_font_val.get('h3Font')}"
        assert "LG EI Headline" in study_font_val.get("correctLabelFont", ""), f"Answer label font should include 'LG EI Headline', got {study_font_val.get('correctLabelFont')}"
        assert study_font_val.get("hasHeadlineBold") is True, "LG EI Headline Bold (700) failed document.fonts.check in study.html"
        assert study_font_val.get("hasHeadlineRegular") is True, "LG EI Headline Regular (400) failed document.fonts.check in study.html"
        assert study_font_val.get("hasTextRegular") is True, "LG EI Text Regular (400) failed document.fonts.check in study.html"
        assert study_font_val.get("hasTextSemiBold") is True, "LG EI Text SemiBold (600) failed document.fonts.check in study.html"
        assert study_font_val.get("hasTextBold") is True, "LG EI Text Bold (700) failed document.fonts.check in study.html"

        # Font size verification for study.html
        study_size_resp = send_cmd("Runtime.evaluate", {
            "expression": """({
                bodySize: window.getComputedStyle(document.body).fontSize,
                passageSize: window.getComputedStyle(document.querySelector('.q-passage-box')).fontSize,
                theorySize: window.getComputedStyle(document.querySelector('.theory-body-container')).fontSize,
                heroSummarySize: window.getComputedStyle(document.querySelector('.unit-hero-summary')).fontSize
            })""",
            "returnByValue": True
        })
        study_size_val = study_size_resp.get("result", {}).get("result", {}).get("value", {})
        print("  study.html font size verification:", study_size_val)
        assert study_size_val.get("bodySize") == "15px", f"Expected study.html body font-size 15px, got {study_size_val.get('bodySize')}"
        assert study_size_val.get("passageSize") == "15.5px", f"Expected study.html passage font-size 15.5px, got {study_size_val.get('passageSize')}"
        assert study_size_val.get("theorySize") == "15px", f"Expected study.html theory font-size 15px, got {study_size_val.get('theorySize')}"
        assert study_size_val.get("heroSummarySize") == "15px", f"Expected study.html hero summary font-size 15px, got {study_size_val.get('heroSummarySize')}"

        # Typography verification for study.html
        study_typo_resp = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                const docEl = document.documentElement;
                const bodyStyle = window.getComputedStyle(document.body);
                const passageEl = document.querySelector('.q-passage-box');
                const passageStyle = window.getComputedStyle(passageEl);
                const theoryEl = document.querySelector('.theory-body-container');
                const theoryStyle = window.getComputedStyle(theoryEl);
                const heroEl = document.querySelector('.unit-hero-summary');
                const heroStyle = window.getComputedStyle(heroEl);
                const expEl = document.querySelector('.q-exp-text');
                const expStyle = expEl ? window.getComputedStyle(expEl) : null;
                const trapEl = document.querySelector('.q-trap-box');
                const trapStyle = trapEl ? window.getComputedStyle(trapEl) : null;
                const promptEl = document.querySelector('.q-prompt-text');
                const promptStyle = window.getComputedStyle(promptEl);

                return {
                    desktopScrollWidth: docEl.scrollWidth,
                    windowInnerWidth: window.innerWidth,
                    bodyWordBreak: bodyStyle.wordBreak,
                    bodyOverflowWrap: bodyStyle.overflowWrap,
                    passageTextAlign: passageStyle.textAlign,
                    passageWordBreak: passageStyle.wordBreak,
                    passageOverflowWrap: passageStyle.overflowWrap,
                    theoryTextAlign: theoryStyle.textAlign,
                    theoryWordBreak: theoryStyle.wordBreak,
                    theoryOverflowWrap: theoryStyle.overflowWrap,
                    heroTextAlign: heroStyle.textAlign,
                    heroWordBreak: heroStyle.wordBreak,
                    heroOverflowWrap: heroStyle.overflowWrap,
                    expTextAlign: expStyle ? expStyle.textAlign : '',
                    expWordBreak: expStyle ? expStyle.wordBreak : '',
                    expOverflowWrap: expStyle ? expStyle.overflowWrap : '',
                    trapTextAlign: trapStyle ? trapStyle.textAlign : '',
                    trapWordBreak: trapStyle ? trapStyle.wordBreak : '',
                    trapOverflowWrap: trapStyle ? trapStyle.overflowWrap : '',
                    promptTextAlign: promptStyle.textAlign,
                    promptWordBreak: promptStyle.wordBreak
                };
            })()""",
            "returnByValue": True
        })
        study_typo_val = study_typo_resp.get("result", {}).get("result", {}).get("value", {})
        print("  study.html typography computed style verification:", study_typo_val)
        assert study_typo_val.get("bodyWordBreak") == "keep-all", f"Expected body word-break keep-all, got {study_typo_val.get('bodyWordBreak')}"
        assert study_typo_val.get("bodyOverflowWrap") == "break-word", f"Expected body overflow-wrap break-word, got {study_typo_val.get('bodyOverflowWrap')}"
        assert study_typo_val.get("passageTextAlign") == "justify", f"Expected passage text-align justify, got {study_typo_val.get('passageTextAlign')}"
        assert study_typo_val.get("passageWordBreak") == "keep-all", f"Expected passage word-break keep-all, got {study_typo_val.get('passageWordBreak')}"
        assert study_typo_val.get("passageOverflowWrap") == "break-word", f"Expected passage overflow-wrap break-word, got {study_typo_val.get('passageOverflowWrap')}"
        assert study_typo_val.get("theoryTextAlign") == "justify", f"Expected theory text-align justify, got {study_typo_val.get('theoryTextAlign')}"
        assert study_typo_val.get("theoryWordBreak") == "keep-all", f"Expected theory word-break keep-all, got {study_typo_val.get('theoryWordBreak')}"
        assert study_typo_val.get("theoryOverflowWrap") == "break-word", f"Expected theory overflow-wrap break-word, got {study_typo_val.get('theoryOverflowWrap')}"
        assert study_typo_val.get("heroTextAlign") == "justify", f"Expected hero summary text-align justify, got {study_typo_val.get('heroTextAlign')}"
        assert study_typo_val.get("heroWordBreak") == "keep-all", f"Expected hero summary word-break keep-all, got {study_typo_val.get('heroWordBreak')}"
        assert study_typo_val.get("heroOverflowWrap") == "break-word", f"Expected hero summary overflow-wrap break-word, got {study_typo_val.get('heroOverflowWrap')}"
        if study_typo_val.get("expTextAlign"):
            assert study_typo_val.get("expTextAlign") == "justify", f"Expected exp text-align justify, got {study_typo_val.get('expTextAlign')}"
            assert study_typo_val.get("expWordBreak") == "keep-all", f"Expected exp word-break keep-all, got {study_typo_val.get('expWordBreak')}"
            assert study_typo_val.get("expOverflowWrap") == "break-word", f"Expected exp overflow-wrap break-word, got {study_typo_val.get('expOverflowWrap')}"
        if study_typo_val.get("trapTextAlign"):
            assert study_typo_val.get("trapTextAlign") == "justify", f"Expected trap text-align justify, got {study_typo_val.get('trapTextAlign')}"
            assert study_typo_val.get("trapWordBreak") == "keep-all", f"Expected trap word-break keep-all, got {study_typo_val.get('trapWordBreak')}"
            assert study_typo_val.get("trapOverflowWrap") == "break-word", f"Expected trap overflow-wrap break-word, got {study_typo_val.get('trapOverflowWrap')}"
        assert study_typo_val.get("promptTextAlign") in ("left", "start"), f"Expected prompt text-align left/start, got {study_typo_val.get('promptTextAlign')}"
        assert study_typo_val.get("promptWordBreak") == "keep-all", f"Expected prompt word-break keep-all, got {study_typo_val.get('promptWordBreak')}"
        assert study_typo_val.get("desktopScrollWidth") <= study_typo_val.get("windowInnerWidth"), f"Desktop horizontal overflow on study.html: scrollWidth {study_typo_val.get('desktopScrollWidth')} > innerWidth {study_typo_val.get('windowInnerWidth')}"


        # Test all 5 units in Concept Mode for clean rendering (0 raw LaTeX, 0 raw blockquote '>' prefixes)
        # Also verify DOM-preserving sidebar animation (.sidebar-subtopics-wrapper.open toggling without destroying DOM nodes)
        send_cmd("Runtime.evaluate", {"expression": "window.__unit1BtnRef = document.querySelector('.sidebar-item-btn[data-unit=\"1\"]');"})
        for u_num in range(1, 6):
            send_cmd("Runtime.evaluate", {"expression": f"selectUnit({u_num})"})
            time.sleep(0.15)
            u_eval = send_cmd("Runtime.evaluate", {
                "expression": f"""({{
                    text: document.getElementById('theoryBodyContainer').innerText,
                    formulaCards: document.querySelectorAll('.formula-card').length,
                    quotes: document.querySelectorAll('blockquote.theory-quote').length,
                    domPreserved: window.__unit1BtnRef === document.querySelector('.sidebar-item-btn[data-unit="1"]'),
                    openWrappers: Array.from(document.querySelectorAll('.sidebar-subtopics-wrapper.open')).map(el => Number(el.dataset.subtopicsFor)),
                    activeUnits: Array.from(document.querySelectorAll('.sidebar-item-btn.active[data-unit]')).map(el => Number(el.dataset.unit)),
                    sidebarText: document.getElementById('appSidebar').innerText
                }})""",
                "returnByValue": True
            })
            u_val = u_eval.get("result", {}).get("result", {}).get("value", {})
            u_text = u_val.get("text", "")
            assert "$" not in u_text, f"Unit {u_num} theory still contains '$' symbol!"
            assert "\\frac" not in u_text and "\\rightarrow" not in u_text, f"Unit {u_num} theory still contains raw LaTeX commands!"
            assert not any(line.strip().startswith(">") for line in u_text.splitlines()), f"Unit {u_num} theory has unrendered blockquote '>' line!"
            assert u_val.get("domPreserved") is True, f"Sidebar DOM was destroyed on selectUnit({u_num}) instead of preserving nodes for CSS transition!"
            assert u_val.get("openWrappers") == [u_num], f"Expected open accordion wrapper [{u_num}], got {u_val.get('openWrappers')}"
            assert u_val.get("activeUnits") == [u_num], f"Expected active unit button [{u_num}], got {u_val.get('activeUnits')}"
            assert "5대" not in u_val.get("sidebarText", ""), "Sidebar still contains '5대'!"
            if u_num == 2:
                assert "*(*(p + 1) + 2)" in u_text and "*(p + 2)" in u_text, "Unit 2 C pointer asterisks were corrupted by Markdown italic parser!"
                assert "s1 < s2" in u_text and "p->val" in u_text, "Unit 2 C operators (<, ->) were corrupted by unescaped HTML in inline code!"
            print(f"  Unit {u_num} theory DOM & accordion verified: formulaCards={u_val.get('formulaCards')}, openWrappers={u_val.get('openWrappers')}, domPreserved={u_val.get('domPreserved')}.")

        # Test subtopic selection preserves sidebar DOM, scopes theory, and updates active chip
        send_cmd("Runtime.evaluate", {"expression": "selectUnit(1); selectTopic('GoF 디자인 패턴');"})
        time.sleep(0.1)
        topic_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                domPreserved: window.__unit1BtnRef === document.querySelector('.sidebar-item-btn[data-unit="1"]'),
                activeChipText: document.querySelector('.subtopic-chip.active') ? document.querySelector('.subtopic-chip.active').textContent.trim() : '',
                cardsCount: document.querySelectorAll('.question-card').length,
                hasBanner: !!document.querySelector('.topic-context-banner'),
                pillText: document.querySelector('.topic-context-pill') ? document.querySelector('.topic-context-pill').textContent.trim() : '',
                theoryText: document.getElementById('theoryBodyContainer') ? document.getElementById('theoryBodyContainer').innerText : '',
                u1Chips: Array.from(document.querySelectorAll('.sidebar-subtopics-wrapper[data-subtopics-for="1"] .subtopic-chip')).map(el => el.textContent.trim())
            })""",
            "returnByValue": True
        })
        topic_val = topic_eval.get("result", {}).get("result", {}).get("value", {})
        assert topic_val.get("domPreserved") is True, "Sidebar DOM was destroyed on selectTopic!"
        assert "GoF 디자인 패턴" in topic_val.get("activeChipText", ""), f"Expected GoF 디자인 패턴 active chip, got {topic_val.get('activeChipText')}"
        assert topic_val.get("cardsCount", 0) > 0, "Expected filtered question cards for subtopic"
        assert topic_val.get("hasBanner") is True, "Expected .topic-context-banner to be rendered when topic is selected"
        assert "1.4 GoF 디자인 패턴" in topic_val.get("pillText", ""), f"Expected 1.4 GoF 디자인 패턴 in pill, got {topic_val.get('pillText')}"
        assert "Singleton" in topic_val.get("theoryText", ""), "Scoped theory missing GoF design pattern content"
        assert "1.1 개발 방법론" not in topic_val.get("theoryText", ""), "Scoped theory unexpectedly contains 1.1 SDLC content"

        # Verify sidebar chip ordering for Unit 1: 1.1 -> 1.2 -> ... -> 1.8
        u1_chips = topic_val.get("u1Chips", [])
        assert len(u1_chips) == 9, f"Expected 1 '전체 보기' + 8 subtopic chips for Unit 1, got {len(u1_chips)}"
        for i in range(1, 9):
            prefix = f"• 1.{i}"
            assert any(chip.startswith(prefix) for chip in u1_chips), f"Expected subtopic with prefix '{prefix}' in Unit 1 chips, got: {u1_chips}"

        # Test clicking reset button restores full unit theory
        send_cmd("Runtime.evaluate", {"expression": "document.querySelector('.btn-reset-topic-view').click();"})
        time.sleep(0.1)
        reset_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                cardsCount: document.querySelectorAll('.question-card').length,
                hasBanner: !!document.querySelector('.topic-context-banner'),
                theoryText: document.getElementById('theoryBodyContainer') ? document.getElementById('theoryBodyContainer').innerText : '',
                activeChipText: document.querySelector('.subtopic-chip.active') ? document.querySelector('.subtopic-chip.active').textContent.trim() : ''
            })""",
            "returnByValue": True
        })
        reset_val = reset_eval.get("result", {}).get("result", {}).get("value", {})
        assert reset_val.get("cardsCount") == 61, f"Expected full unit 1 questions (61), got {reset_val.get('cardsCount')}"
        assert reset_val.get("hasBanner") is False, "Expected .topic-context-banner to be removed after reset"
        assert "1.1 개발 방법론" in reset_val.get("theoryText", ""), "Full unit theory missing 1.1 content after reset"
        assert "전체 보기" in reset_val.get("activeChipText", ""), f"Expected '전체 보기' chip to be active after reset, got {reset_val.get('activeChipText')}"

        # Test Search-Topic Resilience: Clicking a subtopic chip while a live search query is active
        send_cmd("Runtime.evaluate", {"expression": """
            document.getElementById('liveSearchInput').value = '포인터';
            handleSearchInput();
        """})
        time.sleep(0.05)
        search_active_eval = send_cmd("Runtime.evaluate", {
            "expression": "({ isSearching: Boolean(state.searchQuery), inputVal: document.getElementById('liveSearchInput').value })",
            "returnByValue": True
        })
        s_val = search_active_eval.get("result", {}).get("result", {}).get("value", {})
        assert s_val.get("isSearching") is True and s_val.get("inputVal") == "포인터", "Failed to initiate search for '포인터'"

        # Click subtopic chip while search is active
        send_cmd("Runtime.evaluate", {"expression": """
            const chip = document.querySelector('.subtopic-chip[data-topic*="1.4 GoF 디자인 패턴"]');
            if (chip) chip.click();
        """})
        time.sleep(0.05)
        search_chip_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                searchQuery: state.searchQuery,
                inputVal: document.getElementById('liveSearchInput').value,
                activeTopic: state.activeTopic,
                hasBanner: !!document.querySelector('.topic-context-banner'),
                pillText: document.querySelector('.topic-context-pill') ? document.querySelector('.topic-context-pill').textContent.trim() : '',
                isChipActive: document.querySelector('.subtopic-chip[data-topic*="GoF"]') ? document.querySelector('.subtopic-chip[data-topic*="GoF"]').classList.contains('active') : false,
                cardsCount: document.querySelectorAll('.question-card').length
            })""",
            "returnByValue": True
        })
        sc_val = search_chip_eval.get("result", {}).get("result", {}).get("value", {})
        assert sc_val.get("searchQuery") == "", f"Expected searchQuery to be cleared on subtopic click, got {sc_val.get('searchQuery')}"
        assert sc_val.get("inputVal") == "", f"Expected search input to be cleared, got {sc_val.get('inputVal')}"
        assert sc_val.get("hasBanner") is True, "Expected .topic-context-banner after clicking subtopic from search"
        assert sc_val.get("isChipActive") is True, "Expected subtopic chip to be highlighted as active"
        assert "1.4 GoF 디자인 패턴" in sc_val.get("pillText", ""), f"Expected 1.4 GoF in pill, got {sc_val.get('pillText')}"
        assert sc_val.get("cardsCount") > 0, "Expected question cards filtered to selected subtopic"

        # Test Cross-Unit Navigation: Calling selectTopic for Unit 3 while on Unit 1
        send_cmd("Runtime.evaluate", {"expression": "selectTopic('3.3 정규화 6단계 & 이상현상');"})
        time.sleep(0.05)
        cross_unit_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                activeUnit: state.activeUnit,
                activeTopic: state.activeTopic,
                u3WrapperOpen: document.querySelector('.sidebar-subtopics-wrapper[data-subtopics-for="3"]').classList.contains('open'),
                hasBanner: !!document.querySelector('.topic-context-banner'),
                pillText: document.querySelector('.topic-context-pill') ? document.querySelector('.topic-context-pill').textContent.trim() : '',
                theoryText: document.getElementById('theoryBodyContainer') ? document.getElementById('theoryBodyContainer').innerText : '',
                cardsCount: document.querySelectorAll('.question-card').length
            })""",
            "returnByValue": True
        })
        cu_val = cross_unit_eval.get("result", {}).get("result", {}).get("value", {})
        assert cu_val.get("activeUnit") == 3, f"Expected activeUnit to switch to 3, got {cu_val.get('activeUnit')}"
        assert cu_val.get("u3WrapperOpen") is True, "Expected Unit 3 subtopics wrapper to be opened"
        assert "3.3 정규화 6단계" in cu_val.get("pillText", ""), f"Expected 3.3 in pill, got {cu_val.get('pillText')}"
        assert "도 - 부 - 이 - 결 - 다 - 조" in cu_val.get("theoryText", ""), "Unit 3 scoped theory missing normalization mnemonic"
        assert "3.1 데이터 모델링" not in cu_val.get("theoryText", ""), "Scoped theory unexpectedly contains 3.1 modeling text"
        assert cu_val.get("cardsCount") > 0, "Expected Unit 3 question cards filtered to 3.3 subtopic"

        # Verify chip ordering and scoping for all units (Unit 2, 3, 4, 5)
        unit_expected_chips = {
            2: (7, ["• 2.1", "• 2.2", "• 2.3", "• 2.4", "• 2.5", "• 2.6"]),
            3: (7, ["• 3.1", "• 3.2", "• 3.3", "• 3.4", "• 3.5", "• 3.6"]),
            4: (7, ["• 4.1", "• 4.2", "• 4.3", "• 4.4", "• 4.5", "• 4.6"]),
            5: (9, ["• 5.1", "• 5.2", "• 5.3", "• 5.4", "• 5.5", "• 5.6", "• 5.7", "• 5.8"]),
        }
        for u_chk, (exp_count, prefixes) in unit_expected_chips.items():
            u_chips_eval = send_cmd("Runtime.evaluate", {
                "expression": f"Array.from(document.querySelectorAll('.sidebar-subtopics-wrapper[data-subtopics-for=\"{u_chk}\"] .subtopic-chip')).map(el => el.textContent.trim())",
                "returnByValue": True
            })
            chips_list = u_chips_eval.get("result", {}).get("result", {}).get("value", [])
            assert len(chips_list) == exp_count, f"Unit {u_chk} expected {exp_count} chips, got {len(chips_list)}"
            for pfx in prefixes:
                assert any(chip.startswith(pfx) for chip in chips_list), f"Unit {u_chk} chips missing prefix '{pfx}': {chips_list}"

        # Reset back to Unit 1 for subsequent tests
        send_cmd("Runtime.evaluate", {"expression": "selectUnit(1);"})
        time.sleep(0.05)

        # Test Theory Drawer smooth CSS Grid toggle (toggleTheoryDrawer)
        drawer_eval = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                const wrapper = document.getElementById('theoryDrawerWrapper');
                const initialOpen = wrapper && wrapper.classList.contains('open');
                toggleTheoryDrawer();
                const afterClose = wrapper && wrapper.classList.contains('open');
                const closedBtnText = document.querySelector('.theory-drawer-toggle span').textContent.trim();
                toggleTheoryDrawer();
                const afterReopen = wrapper && wrapper.classList.contains('open');
                const openBtnText = document.querySelector('.theory-drawer-toggle span').textContent.trim();
                return { initialOpen, afterClose, closedBtnText, afterReopen, openBtnText };
            })()""",
            "returnByValue": True
        })
        drawer_val = drawer_eval.get("result", {}).get("result", {}).get("value", {})
        assert drawer_val.get("initialOpen") is True, "Expected theoryDrawerWrapper initially open"
        assert drawer_val.get("afterClose") is False, "Expected theoryDrawerWrapper .open removed after toggleTheoryDrawer()"
        assert drawer_val.get("closedBtnText") == "이론 요약 펼치기 ▼", f"Unexpected closed button text: {drawer_val.get('closedBtnText')}"
        assert drawer_val.get("afterReopen") is True, "Expected theoryDrawerWrapper .open restored after second toggleTheoryDrawer()"
        assert drawer_val.get("openBtnText") == "이론 요약 접기 ▲", f"Unexpected open button text: {drawer_val.get('openBtnText')}"

        # Test rapid mode/unit/search switching and mobile responsive layout (<= 900px)
        rapid_eval = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                switchMode('round');
                selectRound('2024_2');
                selectRound('2026_1');
                switchMode('concept');
                selectUnit(3);
                document.getElementById('liveSearchInput').value = '정규화';
                handleSearchInput();
                clearSearch();
                selectUnit(1);
                return {
                    mode: state.mode,
                    activeUnit: state.activeUnit,
                    openWrappers: Array.from(document.querySelectorAll('.sidebar-subtopics-wrapper.open')).map(el => Number(el.dataset.subtopicsFor)),
                    enteringClass: document.getElementById('mainContent').classList.contains('content-entering')
                };
            })()""",
            "returnByValue": True
        })
        rapid_val = rapid_eval.get("result", {}).get("result", {}).get("value", {})
        assert rapid_val.get("mode") == "concept" and rapid_val.get("activeUnit") == 1
        assert rapid_val.get("openWrappers") == [1]
        assert rapid_val.get("enteringClass") is True

        # Test mobile viewport (<= 900px) via Emulation.setDeviceMetricsOverride
        send_cmd("Emulation.setDeviceMetricsOverride", {"width": 768, "height": 900, "deviceScaleFactor": 1, "mobile": True})
        time.sleep(0.15)
        mobile_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                layoutDir: window.getComputedStyle(document.querySelector('.app-layout')).flexDirection,
                sidebarPos: window.getComputedStyle(document.querySelector('.sidebar')).position,
                tocToggleDisplay: window.getComputedStyle(document.getElementById('mobileTocToggleBtn')).display
            })""",
            "returnByValue": True
        })
        mobile_val = mobile_eval.get("result", {}).get("result", {}).get("value", {})
        assert mobile_val.get("layoutDir") == "column", f"Expected flex-direction column at 768px, got {mobile_val.get('layoutDir')}"
        assert mobile_val.get("sidebarPos") == "static", f"Expected static sidebar at 768px, got {mobile_val.get('sidebarPos')}"
        assert mobile_val.get("tocToggleDisplay") == "none", f"Expected mobileTocToggleBtn hidden at 768px (>600px), got {mobile_val.get('tocToggleDisplay')}"

        # Test Galaxy S24 Ultra (412 x 915px, DPR 3.5, mobile=True) on study.html
        print("  Testing Galaxy S24 Ultra (412 x 915px, DPR 3.5) layout on study.html...")
        send_cmd("Emulation.setDeviceMetricsOverride", {"width": 412, "height": 915, "deviceScaleFactor": 3.5, "mobile": True})
        time.sleep(0.25)
        s24_study_eval = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                const docEl = document.documentElement;
                const tocBtn = document.getElementById('mobileTocToggleBtn');
                const sidebar = document.getElementById('appSidebar');
                const modeTabs = document.querySelectorAll('.btn-mode-tab');
                const tab1Rect = modeTabs[0].getBoundingClientRect();
                const tab2Rect = modeTabs[1].getBoundingClientRect();
                const initialSidebarDisplay = window.getComputedStyle(sidebar).display;
                const tocBtnDisplay = window.getComputedStyle(tocBtn).display;

                // Open mobile TOC drawer
                tocBtn.click();
                const openSidebarDisplay = window.getComputedStyle(sidebar).display;
                const openHasClass = sidebar.classList.contains('mobile-open');

                return {
                    windowWidth: window.innerWidth,
                    windowHeight: window.innerHeight,
                    scrollWidth: docEl.scrollWidth,
                    tocBtnDisplay,
                    initialSidebarDisplay,
                    openSidebarDisplay,
                    openHasClass,
                    tab1Width: Math.round(tab1Rect.width),
                    tab2Width: Math.round(tab2Rect.width),
                    tocLabelText: document.getElementById('mobileTocLabel').textContent.trim(),
                    bodyWordBreak: window.getComputedStyle(document.body).wordBreak,
                    bodyOverflowWrap: window.getComputedStyle(document.body).overflowWrap,
                    passageTextAlign: document.querySelector('.q-passage-box') ? window.getComputedStyle(document.querySelector('.q-passage-box')).textAlign : '',
                    passageWordBreak: document.querySelector('.q-passage-box') ? window.getComputedStyle(document.querySelector('.q-passage-box')).wordBreak : '',
                    passageOverflowWrap: document.querySelector('.q-passage-box') ? window.getComputedStyle(document.querySelector('.q-passage-box')).overflowWrap : '',
                    theoryTextAlign: document.querySelector('.theory-body-container') ? window.getComputedStyle(document.querySelector('.theory-body-container')).textAlign : '',
                    theoryWordBreak: document.querySelector('.theory-body-container') ? window.getComputedStyle(document.querySelector('.theory-body-container')).wordBreak : '',
                    theoryOverflowWrap: document.querySelector('.theory-body-container') ? window.getComputedStyle(document.querySelector('.theory-body-container')).overflowWrap : '',
                    heroTextAlign: document.querySelector('.unit-hero-summary') ? window.getComputedStyle(document.querySelector('.unit-hero-summary')).textAlign : '',
                    heroWordBreak: document.querySelector('.unit-hero-summary') ? window.getComputedStyle(document.querySelector('.unit-hero-summary')).wordBreak : '',
                    heroOverflowWrap: document.querySelector('.unit-hero-summary') ? window.getComputedStyle(document.querySelector('.unit-hero-summary')).overflowWrap : '',
                    promptTextAlign: document.querySelector('.q-prompt-text') ? window.getComputedStyle(document.querySelector('.q-prompt-text')).textAlign : '',
                    promptWordBreak: document.querySelector('.q-prompt-text') ? window.getComputedStyle(document.querySelector('.q-prompt-text')).wordBreak : ''
                };
            })()""",
            "returnByValue": True
        })
        s24_st = s24_study_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Galaxy S24 Ultra study.html eval:", s24_st)
        assert s24_st.get("windowWidth") == 412 and s24_st.get("windowHeight") == 915
        assert s24_st.get("scrollWidth", 9999) <= 412, f"Horizontal overflow on study.html at 412px! scrollWidth={s24_st.get('scrollWidth')}"
        assert s24_st.get("bodyWordBreak") == "keep-all", f"Expected mobile study body word-break keep-all, got {s24_st.get('bodyWordBreak')}"
        assert s24_st.get("bodyOverflowWrap") == "break-word", f"Expected mobile study body overflow-wrap break-word, got {s24_st.get('bodyOverflowWrap')}"
        if s24_st.get("passageTextAlign"):
            assert s24_st.get("passageTextAlign") == "justify", f"Expected mobile study passage text-align justify, got {s24_st.get('passageTextAlign')}"
            assert s24_st.get("passageWordBreak") == "keep-all", f"Expected mobile study passage word-break keep-all, got {s24_st.get('passageWordBreak')}"
            assert s24_st.get("passageOverflowWrap") == "break-word", f"Expected mobile study passage overflow-wrap break-word, got {s24_st.get('passageOverflowWrap')}"
        assert s24_st.get("theoryTextAlign") == "justify", f"Expected mobile study theory text-align justify, got {s24_st.get('theoryTextAlign')}"
        assert s24_st.get("theoryWordBreak") == "keep-all", f"Expected mobile study theory word-break keep-all, got {s24_st.get('theoryWordBreak')}"
        assert s24_st.get("theoryOverflowWrap") == "break-word", f"Expected mobile study theory overflow-wrap break-word, got {s24_st.get('theoryOverflowWrap')}"
        assert s24_st.get("heroTextAlign") == "justify", f"Expected mobile study hero text-align justify, got {s24_st.get('heroTextAlign')}"
        assert s24_st.get("heroWordBreak") == "keep-all", f"Expected mobile study hero word-break keep-all, got {s24_st.get('heroWordBreak')}"
        assert s24_st.get("heroOverflowWrap") == "break-word", f"Expected mobile study hero overflow-wrap break-word, got {s24_st.get('heroOverflowWrap')}"
        assert s24_st.get("promptTextAlign") in ("left", "start"), f"Expected mobile study prompt text-align left/start, got {s24_st.get('promptTextAlign')}"
        assert s24_st.get("promptWordBreak") == "keep-all", f"Expected mobile study prompt word-break keep-all, got {s24_st.get('promptWordBreak')}"
        assert s24_st.get("tocBtnDisplay") == "flex", f"Expected mobileTocToggleBtn display flex at 412px, got {s24_st.get('tocBtnDisplay')}"
        assert s24_st.get("initialSidebarDisplay") == "none", f"Expected sidebar initially collapsed (none) at 412px, got {s24_st.get('initialSidebarDisplay')}"
        assert s24_st.get("openSidebarDisplay") == "flex" and s24_st.get("openHasClass") is True, "Expected sidebar to open when mobileTocToggleBtn clicked"
        assert abs(s24_st.get("tab1Width", 0) - s24_st.get("tab2Width", 100)) <= 4, f"Expected 50:50 mode tabs on 412px, got {s24_st.get('tab1Width')} vs {s24_st.get('tab2Width')}"
        save_screenshot("s24_ultra_study_toc_open.png")

        # Select a subtopic in mobile drawer and verify auto-close + label update + 0 overflow
        s24_topic_eval = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                const chip = document.querySelector('.subtopic-chip[data-topic*="1.5"]');
                if (chip) chip.click();
                const sidebar = document.getElementById('appSidebar');
                return {
                    drawerClosed: !sidebar.classList.contains('mobile-open') && window.getComputedStyle(sidebar).display === 'none',
                    tocLabelText: document.getElementById('mobileTocLabel').textContent.trim(),
                    scrollWidth: document.documentElement.scrollWidth
                };
            })()""",
            "returnByValue": True
        })
        s24_tp = s24_topic_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Galaxy S24 Ultra subtopic auto-close eval:", s24_tp)
        assert s24_tp.get("drawerClosed") is True, "Expected mobile TOC drawer to auto-close upon selecting a subtopic"
        assert "1.5" in s24_tp.get("tocLabelText", ""), f"Expected mobile TOC label to reflect selected subtopic 1.5, got {s24_tp.get('tocLabelText')}"
        assert s24_tp.get("scrollWidth", 9999) <= 412, f"Horizontal overflow on study.html subtopic view: {s24_tp.get('scrollWidth')}"
        save_screenshot("s24_ultra_study_concept.png")

        # Verify mobile TOC drawer auto-closes when typing in #liveSearchInput or switching mode
        s24_search_toc_eval = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                const tocBtn = document.getElementById('mobileTocToggleBtn');
                const sidebar = document.getElementById('appSidebar');
                // 1. Open drawer, then type into search
                tocBtn.click();
                const openBeforeSearch = sidebar.classList.contains('mobile-open');
                document.getElementById('liveSearchInput').value = '정규화';
                handleSearchInput();
                const closedAfterSearch = !sidebar.classList.contains('mobile-open') && window.getComputedStyle(sidebar).display === 'none';
                clearSearch();

                // 2. Open drawer, then switch mode to 'round'
                tocBtn.click();
                const openBeforeMode = sidebar.classList.contains('mobile-open');
                switchMode('round');
                const closedAfterMode = !sidebar.classList.contains('mobile-open') && window.getComputedStyle(sidebar).display === 'none';
                switchMode('concept');

                return { openBeforeSearch, closedAfterSearch, openBeforeMode, closedAfterMode };
            })()""",
            "returnByValue": True
        })
        s24_stoc = s24_search_toc_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Galaxy S24 Ultra search/mode TOC auto-close eval:", s24_stoc)
        assert s24_stoc.get("openBeforeSearch") is True and s24_stoc.get("closedAfterSearch") is True, "Expected mobile TOC drawer to auto-close when typing into #liveSearchInput"
        assert s24_stoc.get("openBeforeMode") is True and s24_stoc.get("closedAfterMode") is True, "Expected mobile TOC drawer to auto-close when switching modes"

        # Reset back to full Unit 1 and clear device metrics override
        send_cmd("Runtime.evaluate", {"expression": "selectUnit(1);"})
        send_cmd("Emulation.clearDeviceMetricsOverride")
        time.sleep(0.1)

        # Test switching to Round mode
        print("  Testing switchMode('round')...")
        send_cmd("Runtime.evaluate", {"expression": "switchMode('round')"})
        time.sleep(0.4)
        drain_events(0.2)
        
        eval_resp = send_cmd("Runtime.evaluate", {
            "expression": "({ mode: state.mode, cardsRendered: document.querySelectorAll('.question-card').length, sidebarText: document.getElementById('appSidebar').innerText })",
            "returnByValue": True
        })
        val = eval_resp.get("result", {}).get("result", {}).get("value", {})
        print("  Round mode evaluation result:", {k: v for k, v in val.items() if k != 'sidebarText'})
        assert val.get("mode") == "round"
        assert val.get("cardsRendered") == 20, f"Expected 20 cards for active round, got {val.get('cardsRendered')}"
        assert "주제별 기출 모음" in val.get("sidebarText", ""), "Round mode sidebar missing '주제별 기출 모음'!"
        assert "6대" not in val.get("sidebarText", "") and "킬러" not in val.get("sidebarText", ""), "Round mode sidebar still contains exaggerated words!"

        # Test study.html Markdown Passage Table rendering (renderMarkdownPassage)
        print("  Testing study.html passage markdown table rendering into <table class='q-trace-table'>...")
        passage_table_eval = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                selectRound('2021_1');
                const card14 = document.getElementById('card_2021_1_14');
                const passageTable = card14 ? card14.querySelector('.q-passage-box table') : null;
                const thCount = passageTable ? passageTable.querySelectorAll('th').length : 0;
                const trCount = passageTable ? passageTable.querySelectorAll('tr').length : 0;
                const hasClass = passageTable ? passageTable.classList.contains('q-trace-table') : false;
                const thWordBreak = passageTable && passageTable.querySelector('th') ? window.getComputedStyle(passageTable.querySelector('th')).wordBreak : '';
                const tdWordBreak = passageTable && passageTable.querySelector('td') ? window.getComputedStyle(passageTable.querySelector('td')).wordBreak : '';
                // Test search query highlight inside passage table
                document.getElementById('liveSearchInput').value = '김한국';
                handleSearchInput();
                const mark = document.querySelector('.q-passage-box table mark.highlight');
                const markText = mark ? mark.textContent.trim() : '';
                clearSearch();
                selectRound('2026_1');
                return {
                    hasTable: !!passageTable,
                    hasClass,
                    thCount,
                    trCount,
                    markText,
                    thWordBreak,
                    tdWordBreak
                };
            })()""",
            "returnByValue": True
        })
        pt_val = passage_table_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Passage table eval (2021_1 Q14):", pt_val)
        assert pt_val.get("hasTable") is True, "Failed to render passage markdown table in study.html"
        assert pt_val.get("hasClass") is True, "Passage table missing 'q-trace-table' class"
        assert pt_val.get("thCount") == 4, f"Expected 4 <th> in passage table, got {pt_val.get('thCount')}"
        assert pt_val.get("trCount") == 6, f"Expected 6 <tr> in passage table, got {pt_val.get('trCount')}"
        assert pt_val.get("markText") == "김한국", f"Expected search highlight on '김한국', got '{pt_val.get('markText')}'"
        assert pt_val.get("thWordBreak") == "normal", f"Expected passage table th word-break normal, got {pt_val.get('thWordBreak')}"
        assert pt_val.get("tdWordBreak") == "normal", f"Expected passage table td word-break normal, got {pt_val.get('tdWordBreak')}"

        # Test passage table <br> line break rendering and escaped pipe handling
        passage_edge_eval = send_cmd("Runtime.evaluate", {
            "expression": """(() => {
                const sampleTable = renderMarkdownPassage('| 헤더1 | 헤더2 |\\n| --- | --- |\\n| 항목1<br>항목2 | 특수 \\\\| 파이프 |');
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = sampleTable;
                const thCount = tempDiv.querySelectorAll('th').length;
                const tdCount = tempDiv.querySelectorAll('td').length;
                const hasBr = tempDiv.querySelector('td br') !== null;
                const rawBrText = tempDiv.innerHTML.includes('&lt;br&gt;');
                const cellText = tempDiv.querySelectorAll('td')[1] ? tempDiv.querySelectorAll('td')[1].textContent.trim() : '';
                return {
                    thCount,
                    tdCount,
                    hasBr,
                    rawBrText,
                    cellText
                };
            })()""",
            "returnByValue": True
        })
        pe_val = passage_edge_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Passage table edge case eval:", pe_val)
        assert pe_val.get("thCount") == 2, f"Expected 2 <th>, got {pe_val.get('thCount')}"
        assert pe_val.get("tdCount") == 2, f"Expected 2 <td>, got {pe_val.get('tdCount')}"
        assert pe_val.get("hasBr") is True, "Expected <br> element inside table cell"
        assert pe_val.get("rawBrText") is False, "Found unescaped &lt;br&gt; text in rendered table HTML"
        assert pe_val.get("cellText") == "특수 | 파이프", f"Expected '특수 | 파이프', got '{pe_val.get('cellText')}'"

        # Test Syntax Highlighting in code blocks (Round mode 2026_1 Q1 & Unit 2 C/Java/Python)
        print("  Testing code syntax highlighting tokens and line numbers...")
        code_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                codeBlocksCount: document.querySelectorAll('.q-code-block').length,
                codeTextAlign: window.getComputedStyle(document.querySelector('.q-code-block')).textAlign,
                codeWordBreak: window.getComputedStyle(document.querySelector('.q-code-block')).wordBreak,
                hasKw: document.querySelectorAll('.q-code-block .c-kw').length > 0,
                hasFn: document.querySelectorAll('.q-code-block .c-fn').length > 0,
                hasStr: document.querySelectorAll('.q-code-block .c-str').length > 0,
                hasNum: document.querySelectorAll('.q-code-block .c-num').length > 0,
                hasLineNum: document.querySelectorAll('.q-code-block .code-line-num').length > 0,
                kwTokens: Array.from(document.querySelectorAll('#card_2026_1_1 .q-code-block .c-kw')).map(el => el.textContent.trim()),
                strTokens: Array.from(document.querySelectorAll('#card_2026_1_1 .q-code-block .c-str')).map(el => el.textContent.trim()),
                fnTokens: Array.from(document.querySelectorAll('#card_2026_1_1 .q-code-block .c-fn')).map(el => el.textContent.trim()),
                numTokens: Array.from(document.querySelectorAll('#card_2026_1_1 .q-code-block .c-num')).map(el => el.textContent.trim()),
                firstLineNum: document.querySelector('#card_2026_1_1 .q-code-block .code-line-num') ? document.querySelector('#card_2026_1_1 .q-code-block .code-line-num').textContent.trim() : null
            })""",
            "returnByValue": True
        })
        code_val = code_eval.get("result", {}).get("result", {}).get("value", {})
        print("  Code syntax highlighting evaluation result:", code_val)
        assert code_val.get("codeBlocksCount", 0) > 0, "Expected .q-code-block elements in Round mode"
        assert code_val.get("codeTextAlign") in ("left", "start"), f"Expected .q-code-block text-align left/start, got {code_val.get('codeTextAlign')}"
        assert code_val.get("codeWordBreak") == "normal", f"Expected .q-code-block word-break normal, got {code_val.get('codeWordBreak')}"
        assert code_val.get("hasKw") is True, "Expected .c-kw elements in code blocks"
        assert code_val.get("hasFn") is True, "Expected .c-fn elements in code blocks"
        assert code_val.get("hasStr") is True, "Expected .c-str elements in code blocks"
        assert code_val.get("hasNum") is True, "Expected .c-num elements in code blocks"
        assert code_val.get("hasLineNum") is True, "Expected .code-line-num elements in code blocks"
        assert code_val.get("firstLineNum") == "1", f"Expected first line number '1', got {code_val.get('firstLineNum')}"
        kw_set = set(code_val.get("kwTokens", []))
        assert "#include" in kw_set, f"Expected '#include' token in .c-kw, found: {kw_set}"
        assert "int" in kw_set, f"Expected 'int' token in .c-kw, found: {kw_set}"
        str_set = set(code_val.get("strTokens", []))
        assert "<stdio.h>" in str_set, f"Expected '<stdio.h>' token in .c-str, found: {str_set}"
        fn_set = set(code_val.get("fnTokens", []))
        assert "main" in fn_set or "printf" in fn_set, f"Expected 'main' or 'printf' in .c-fn, found: {fn_set}"
        num_set = set(code_val.get("numTokens", []))
        assert "10" in num_set or "5" in num_set, f"Expected numeric token '10' or '5' in .c-num, found: {num_set}"

        # Test fenced code block in Markdown parser (including $ sign preservation and trailing fence space)
        md_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                standard: parseMarkdownToHtml('```c\\n#include <stdio.h>\\nint main() {\\n    return 0;\\n}\\n```'),
                dollarPreserved: parseMarkdownToHtml('```sh\\necho $1 $&\\n```'),
                trailingSpace: parseMarkdownToHtml('```c  \\nint a = 1;\\n```')
            })""",
            "returnByValue": True
        })
        md_res = md_eval.get("result", {}).get("result", {}).get("value", {})
        md_html = md_res.get("standard", "")
        assert 'class="c-kw">#include</span>' in md_html, "parseMarkdownToHtml failed to highlight #include as .c-kw"
        assert 'class="c-str">&lt;stdio.h&gt;</span>' in md_html, "parseMarkdownToHtml failed to highlight <stdio.h> as .c-str"
        assert 'class="c-kw">int</span>' in md_html, "parseMarkdownToHtml failed to highlight int as .c-kw"
        assert 'class="code-line-num">1</span>' in md_html, "parseMarkdownToHtml failed to generate .code-line-num"
        
        dollar_html = md_res.get("dollarPreserved", "")
        assert '$<span class="c-num">1</span>' in dollar_html and '$&amp;' in dollar_html, f"Dollar signs were corrupted in code block: {dollar_html}"
        assert "__CODE_BLOCK_" not in dollar_html, f"Placeholder leaked into dollar block output: {dollar_html}"
        
        space_html = md_res.get("trailingSpace", "")
        assert 'class="c-kw">int</span>' in space_html, "Failed to parse code block with trailing space on fence line"
        print("  Fenced code block in parseMarkdownToHtml verified successfully.")

        # Test edge cases: empty strings, nulls, multiline block comments, preprocessor #define, Python, and SQL
        print("  Testing syntax highlighter edge cases...")
        edge_eval = send_cmd("Runtime.evaluate", {
            "expression": """({
                emptyCode: formatCodeWithSyntax('', 'c'),
                nullCode: formatCodeWithSyntax(null, 'c'),
                undefinedCode: formatCodeWithSyntax(undefined, 'c'),
                emptyLine: highlightSyntaxLine('', 'c', false),
                nullLine: highlightSyntaxLine(null, 'c', false),
                undefinedLine: highlightSyntaxLine(undefined, 'c', false),
                blockCommentStart: highlightSyntaxLine('/* start comment', 'c', false),
                blockCommentCont: highlightSyntaxLine('still comment', 'c', true),
                blockCommentEnd: highlightSyntaxLine('end */ int val = 10;', 'c', true),
                pythonHighlight: highlightSyntaxLine('# python comment', 'python', false),
                sqlHighlight: highlightSyntaxLine('-- sql comment', 'sql', false),
                sqlKeywords: formatCodeWithSyntax('SELECT id, name FROM users WHERE score >= 100;', 'sql'),
                defineHighlight: highlightSyntaxLine('#define MAX_SIZE 10', 'c', false),
                includeComment: highlightSyntaxLine('#include <stdio.h> // stdio header', 'c', false),
                javaTypeHighlight: highlightSyntaxLine('catch (Exception e) {}', 'java', false)
            })""",
            "returnByValue": True
        })
        e_val = edge_eval.get("result", {}).get("result", {}).get("value", {})
        assert e_val.get("emptyCode") == "", "Expected empty string from formatCodeWithSyntax('')"
        assert e_val.get("nullCode") == "", "Expected empty string from formatCodeWithSyntax(null)"
        assert e_val.get("undefinedCode") == "", "Expected empty string from formatCodeWithSyntax(undefined)"
        assert e_val.get("emptyLine", {}).get("html") == "", "Expected empty html for empty line"
        assert e_val.get("nullLine", {}).get("html") == "", "Expected empty html for null line"
        assert e_val.get("undefinedLine", {}).get("html") == "", "Expected empty html for undefined line"
        assert e_val.get("blockCommentStart", {}).get("inBlockComment") is True, "Expected inBlockComment true on open block comment"
        assert e_val.get("blockCommentCont", {}).get("inBlockComment") is True, "Expected inBlockComment true on continued block comment"
        assert e_val.get("blockCommentEnd", {}).get("inBlockComment") is False, "Expected inBlockComment false on closed block comment"
        assert 'class="c-kw">int</span>' in e_val.get("blockCommentEnd", {}).get("html", ""), "Expected int to be highlighted after block comment closes"
        assert 'class="c-com"># python comment</span>' in e_val.get("pythonHighlight", {}).get("html", ""), "Expected python comment highlighted"
        assert 'class="c-com">-- sql comment</span>' in e_val.get("sqlHighlight", {}).get("html", ""), "Expected sql comment highlighted"
        assert 'class="c-kw">SELECT</span>' in e_val.get("sqlKeywords", ""), "Expected SELECT keyword in SQL"
        assert 'class="c-kw">FROM</span>' in e_val.get("sqlKeywords", ""), "Expected FROM keyword in SQL"
        assert 'class="c-kw">WHERE</span>' in e_val.get("sqlKeywords", ""), "Expected WHERE keyword in SQL"
        assert 'class="c-num">100</span>' in e_val.get("sqlKeywords", ""), "Expected 100 number in SQL"
        assert 'class="c-kw">#define</span>' in e_val.get("defineHighlight", {}).get("html", ""), "Expected #define to be .c-kw"
        assert 'class="c-num">10</span>' in e_val.get("defineHighlight", {}).get("html", ""), "Expected 10 in #define to be .c-num"
        assert 'class="c-str">&lt;stdio.h&gt;</span>' in e_val.get("includeComment", {}).get("html", ""), "Expected <stdio.h> in #include to be .c-str"
        assert 'class="c-com">// stdio header</span>' in e_val.get("includeComment", {}).get("html", ""), "Expected // stdio header to be .c-com"
        assert 'class="c-type">Exception</span>' in e_val.get("javaTypeHighlight", {}).get("html", ""), "Expected Exception in Java to be .c-type"
        print("  All edge cases verified successfully.")

        # Test live search with normal keyword
        print("  Testing live search for '포인터'...")
        send_cmd("Runtime.evaluate", {
            "expression": "document.getElementById('liveSearchInput').value = '포인터'; handleSearchInput();"
        })
        time.sleep(0.4)
        drain_events(0.2)
        
        eval_resp = send_cmd("Runtime.evaluate", {
            "expression": "({ query: state.searchQuery, cardsRendered: document.querySelectorAll('.question-card').length, highlights: document.querySelectorAll('mark.highlight').length })",
            "returnByValue": True
        })
        val = eval_resp.get("result", {}).get("result", {}).get("value", {})
        print("  Search result for '포인터':", val)
        assert val.get("cardsRendered") > 0, "Search for '포인터' should return matching cards"
        assert val.get("highlights") > 0, "Search should highlight matches"

        # Test live search with regex special characters (escapeRegex robustness)
        print("  Testing search resilience with special characters: '(', '[', '*', '\\'...")
        for query in ['(', '[', '*', '\\', '<']:
            send_cmd("Runtime.evaluate", {
                "expression": f"document.getElementById('liveSearchInput').value = {json.dumps(query)}; handleSearchInput();"
            })
            time.sleep(0.2)
            drain_events(0.1)

        # Test toggle all answers
        print("  Testing toggleAllAnswers()...")
        send_cmd("Runtime.evaluate", {"expression": "toggleAllAnswers()"})
        time.sleep(0.3)
        drain_events(0.2)

        eval_resp = send_cmd("Runtime.evaluate", {
            "expression": "({ allAnswersExpanded: state.allAnswersExpanded, visibleDrawers: Array.from(document.querySelectorAll('.q-solution-drawer')).filter(d => d.style.display !== 'none').length })",
            "returnByValue": True
        })
        val = eval_resp.get("result", {}).get("result", {}).get("value", {})
        print("  Toggle answers result:", val)
        assert val.get("allAnswersExpanded") is True
        assert val.get("visibleDrawers") > 0

        # Check total errors
        if errors:
            print("\n[ERROR] Found console errors or exceptions during test:")
            for err in errors:
                print("  -", err)
            raise AssertionError(f"Found {len(errors)} browser errors during test")
            
        print("\n[SUCCESS] 0 Console errors or exceptions! Headless Edge validation passed cleanly.")
        return True

    finally:
        if ws:
            ws.close()
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except Exception:
            proc.kill()
        httpd.shutdown()
        shutil.rmtree(user_data_dir, ignore_errors=True)


if __name__ == "__main__":
    success = run_tests()
    if not success:
        sys.exit(1)
