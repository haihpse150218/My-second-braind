#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Cầu nối LOCAL giữa app Bàn biện chứng và Claude Code CLI.

    python serve.py            ->  http://127.0.0.1:8787

Nguyên tắc:
  * Chỉ bind 127.0.0.1 — không bao giờ nghe trên cổng ra ngoài mạng.
  * Không có API key nào ở đây. Gọi thẳng `claude` CLI đã đăng nhập sẵn trên máy.
  * Claude chạy với --allowedTools "" nên nó KHÔNG đọc/ghi file, không chạy lệnh:
    mỗi lăng kính chỉ nhận prompt và trả về văn bản.
  * Không lưu session (--no-session-persistence), không ghi gì ra repo.

Dừng server: Ctrl+C.
"""

import io
import json
import os
import re
import subprocess
import sys
import threading
import time
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

HERE = os.path.dirname(os.path.abspath(__file__))
HOST, PORT = "127.0.0.1", 8787
CLAUDE = "claude"
CALL_TIMEOUT = 420          # giây cho mỗi lăng kính
MAX_PARALLEL = 3            # số lăng kính chạy song song tối đa
DEFAULT_MODEL = "sonnet"

_sem = threading.Semaphore(MAX_PARALLEL)
_stats = {"calls": 0, "cost": 0.0, "errors": 0}
_lock = threading.Lock()


# ------------------------------------------------------------------ dữ liệu
def load_nodes():
    """Đọc data.js (do build.py sinh) lấy system prompt của từng node."""
    path = os.path.join(HERE, "data.js")
    raw = io.open(path, encoding="utf-8").read()
    data = json.loads(raw[raw.index("{"):raw.rindex("}") + 1])
    return {n["id"]: n for n in data["nodes"]}


NODES = load_nodes()


def claude_version():
    try:
        out = subprocess.run([CLAUDE, "--version"], capture_output=True, text=True,
                             timeout=30, encoding="utf-8", errors="replace")
        return (out.stdout or out.stderr).strip()
    except Exception as e:
        return "KHÔNG GỌI ĐƯỢC: %s" % e


# ------------------------------------------------------------------ gọi Claude
def build_user_message(node, problem, context):
    parts = []
    parts.append("## Hiện tượng cần soi\n\n" + (problem or "(chưa có mô tả)"))
    if context:
        parts.append(
            "## Kết quả của các lăng kính đã chạy trước\n\n"
            "Đây là **đầu vào để đối chất**, không phải kết luận đã chốt — "
            "bạn được phép bác lại bất cứ phần nào.\n\n" + context)
    parts.append(
        "## Việc của bạn\n\n"
        "Soi hiện tượng trên bằng **đúng lăng kính của bạn**, trả lời theo **khuôn trả lời** "
        "đã quy định trong phần hướng dẫn hệ thống. Không kết luận ngoài phạm vi lăng kính. "
        "Phần nào không đủ căn cứ thì nói rõ là không đủ — thà thiếu còn hơn bịa. "
        "Trả lời bằng tiếng Việt.")
    return "\n\n---\n\n".join(parts)


def run_lens(node_id, problem, context, model):
    node = NODES.get(node_id)
    if not node:
        return {"ok": False, "error": "Không có node: %s" % node_id}

    cmd = [CLAUDE, "-p",
           "--output-format", "json",
           "--no-session-persistence",
           "--allowedTools", "",
           "--model", model or DEFAULT_MODEL,
           "--append-system-prompt", node["systemPrompt"]]

    t0 = time.time()
    with _sem:
        try:
            proc = subprocess.run(
                cmd,
                input=build_user_message(node, problem, context),
                capture_output=True, text=True, encoding="utf-8", errors="replace",
                timeout=CALL_TIMEOUT, cwd=HERE,
            )
        except subprocess.TimeoutExpired:
            return {"ok": False, "error": "Quá %ds — lăng kính chạy lâu bất thường." % CALL_TIMEOUT}
        except FileNotFoundError:
            return {"ok": False, "error": "Không tìm thấy lệnh `claude` trong PATH."}

    ms = int((time.time() - t0) * 1000)
    if proc.returncode != 0:
        return {"ok": False, "error": (proc.stderr or "claude thoát mã %d" % proc.returncode).strip()[:900]}

    try:
        res = json.loads(proc.stdout)
    except Exception:
        text = (proc.stdout or "").strip()
        if not text:
            return {"ok": False, "error": "claude không trả về gì."}
        return {"ok": True, "text": text, "ms": ms, "cost": 0.0}

    if res.get("is_error"):
        return {"ok": False, "error": str(res.get("result"))[:900]}

    cost = float(res.get("total_cost_usd") or 0.0)
    with _lock:
        _stats["calls"] += 1
        _stats["cost"] += cost

    return {"ok": True, "text": res.get("result", ""), "ms": ms, "cost": cost,
            "model": model or DEFAULT_MODEL}


# ------------------------------------------------------------------ HTTP
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=HERE, **kw)

    def log_message(self, fmt, *args):
        if "/api/" in (args[0] if args else ""):
            sys.stderr.write("  %s\n" % (fmt % args))

    def _local_only(self):
        """Chặn mọi thứ không phải localhost — kể cả khi máy lỡ mở cổng ra ngoài."""
        host = (self.headers.get("Host") or "").split(":")[0]
        if host not in ("127.0.0.1", "localhost", "[::1]"):
            self.send_error(403, "chi phuc vu localhost")
            return False
        origin = self.headers.get("Origin")
        if origin and not re.match(r"^https?://(127\.0\.0\.1|localhost)(:\d+)?$", origin):
            self.send_error(403, "origin la")
            return False
        return True

    def _json(self, obj, code=200):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if not self._local_only():
            return
        if self.path.startswith("/api/health"):
            return self._json({
                "ok": True,
                "claude": claude_version(),
                "nodes": len(NODES),
                "model": DEFAULT_MODEL,
                "parallel": MAX_PARALLEL,
                "stats": dict(_stats),
            })
        return super().do_GET()

    def do_POST(self):
        if not self._local_only():
            return
        if not self.path.startswith("/api/run"):
            return self.send_error(404)
        try:
            n = int(self.headers.get("Content-Length") or 0)
            req = json.loads(self.rfile.read(n).decode("utf-8"))
        except Exception as e:
            return self._json({"ok": False, "error": "body hỏng: %s" % e}, 400)

        node_id = req.get("nodeId", "")
        sys.stderr.write("  ▶ %-24s model=%s\n" % (node_id, req.get("model") or DEFAULT_MODEL))
        out = run_lens(node_id, req.get("problem", ""), req.get("context", ""), req.get("model"))
        if out.get("ok"):
            sys.stderr.write("  ✓ %-24s %5dms  $%.4f\n" % (node_id, out.get("ms", 0), out.get("cost", 0)))
        else:
            with _lock:
                _stats["errors"] += 1
            sys.stderr.write("  ✗ %-24s %s\n" % (node_id, out.get("error", "")[:120]))
        out["stats"] = dict(_stats)
        return self._json(out)


def main():
    ver = claude_version()
    print("=" * 66)
    print(" Bàn biện chứng — cầu nối local")
    print(" claude CLI : %s" % ver)
    print(" node       : %d lăng kính (từ data.js)" % len(NODES))
    print(" model      : %s · tối đa %d lăng kính song song" % (DEFAULT_MODEL, MAX_PARALLEL))
    print("-" * 66)
    print(" MỞ TRÌNH DUYỆT:  http://%s:%d" % (HOST, PORT))
    print(" Dừng: Ctrl+C")
    print("=" * 66)
    if "KHÔNG GỌI ĐƯỢC" in ver:
        print(" ⚠ Chưa gọi được `claude`. App vẫn mở được nhưng chỉ chạy chế độ copy tay.")
    try:
        ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
    except KeyboardInterrupt:
        print("\n Đã dừng. Tổng: %d lượt gọi · $%.4f" % (_stats["calls"], _stats["cost"]))


if __name__ == "__main__":
    main()
