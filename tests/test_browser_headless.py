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
    httpd = http.server.HTTPServer(("127.0.0.1", server_port), functools.partial(QuietHandler, directory=base_dir))
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"Local test HTTP server running at http://127.0.0.1:{server_port}")

    user_data_dir = tempfile.mkdtemp(prefix="edge_headless_")
    cdp_port = 9223
    cmd = [
        edge_bin,
        "--headless=new",
        "--disable-gpu",
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
            "expression": "({ href: window.location.href, examCatalogCount: (window.EXAM_CATALOG ? window.EXAM_CATALOG.length : 0), totalRounds: (window.EXAM_ROUNDS ? Object.keys(window.EXAM_ROUNDS).length : 0), hasStudyBtn: !!document.querySelector('.btn-study-link'), studyHref: document.querySelector('.btn-study-link') ? document.querySelector('.btn-study-link').getAttribute('href') : '' })",
            "returnByValue": True
        })
        val = eval_resp.get("result", {}).get("result", {}).get("value", {})
        print("  index.html evaluation result:", val)
        assert val.get("examCatalogCount") == 27, f"Expected 27 catalog items, got {val.get('examCatalogCount')}"
        assert val.get("totalRounds") == 27, f"Expected 27 rounds loaded, got {val.get('totalRounds')}"
        assert val.get("hasStudyBtn") is True, "btn-study-link missing in index.html"
        assert val.get("studyHref") == "study.html", f"Expected href 'study.html', got {val.get('studyHref')}"

        # -------------------------------------------------------------
        # Test 2: study.html (Concept Mode)
        # -------------------------------------------------------------
        study_url = f"http://127.0.0.1:{server_port}/study.html"
        print(f"\n[2] Testing study.html: {study_url}")
        navigate_and_wait(study_url)
        drain_events(0.3)

        eval_resp = send_cmd("Runtime.evaluate", {
            "expression": "({ href: window.location.href, totalQuestions: (window.CONCEPT_BOOK ? window.CONCEPT_BOOK.questions.length : 0), unitKeys: (window.CONCEPT_BOOK ? Object.keys(window.CONCEPT_BOOK.units).length : 0), cardsRendered: document.querySelectorAll('.question-card').length, hasBackLink: !!document.querySelector('.btn-action-cbt'), formulaCards: document.querySelectorAll('.formula-card').length, hasRawLatex: /\\$[^\\$\\n]+\\$/.test(document.getElementById('theoryBodyContainer') ? document.getElementById('theoryBodyContainer').innerText : '') })",
            "returnByValue": True
        })
        val = eval_resp.get("result", {}).get("result", {}).get("value", {})
        print("  study.html concept mode result:", val)
        assert val.get("totalQuestions") == 525, f"Expected 525 questions in concept-data, got {val.get('totalQuestions')}"
        assert val.get("unitKeys") == 5, f"Expected 5 units in concept-data, got {val.get('unitKeys')}"
        assert val.get("cardsRendered") > 0, "No question cards rendered in study.html"
        assert val.get("hasBackLink") is True, "CBT return button missing in study.html"
        assert val.get("formulaCards", 0) > 0, "Expected .formula-card elements rendered in Unit 1 theory"
        assert val.get("hasRawLatex") is False, "Found unrendered raw LaTeX ($...$) in study.html theory container"

        # Test all 5 units in Concept Mode for clean rendering (0 raw LaTeX, 0 raw blockquote '>' prefixes)
        for u_num in range(1, 6):
            send_cmd("Runtime.evaluate", {"expression": f"selectUnit({u_num})"})
            time.sleep(0.15)
            u_eval = send_cmd("Runtime.evaluate", {
                "expression": "({ text: document.getElementById('theoryBodyContainer').innerText, formulaCards: document.querySelectorAll('.formula-card').length, quotes: document.querySelectorAll('blockquote.theory-quote').length })",
                "returnByValue": True
            })
            u_val = u_eval.get("result", {}).get("result", {}).get("value", {})
            u_text = u_val.get("text", "")
            assert "$" not in u_text, f"Unit {u_num} theory still contains '$' symbol!"
            assert "\\frac" not in u_text and "\\rightarrow" not in u_text, f"Unit {u_num} theory still contains raw LaTeX commands!"
            assert not any(line.strip().startswith(">") for line in u_text.splitlines()), f"Unit {u_num} theory has unrendered blockquote '>' line!"
            if u_num == 2:
                assert "*(*(p + 1) + 2)" in u_text and "*(p + 2)" in u_text, "Unit 2 C pointer asterisks were corrupted by Markdown italic parser!"
                assert "s1 < s2" in u_text and "p->val" in u_text, "Unit 2 C operators (<, ->) were corrupted by unescaped HTML in inline code!"
            print(f"  Unit {u_num} theory DOM verified: formulaCards={u_val.get('formulaCards')}, quotes={u_val.get('quotes')}, 0 raw LaTeX.")

        # Test switching to Round mode
        print("  Testing switchMode('round')...")
        send_cmd("Runtime.evaluate", {"expression": "switchMode('round')"})
        time.sleep(0.4)
        drain_events(0.2)
        
        eval_resp = send_cmd("Runtime.evaluate", {
            "expression": "({ mode: state.mode, cardsRendered: document.querySelectorAll('.question-card').length })",
            "returnByValue": True
        })
        val = eval_resp.get("result", {}).get("result", {}).get("value", {})
        print("  Round mode evaluation result:", val)
        assert val.get("mode") == "round"
        assert val.get("cardsRendered") == 20, f"Expected 20 cards for active round, got {val.get('cardsRendered')}"

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
