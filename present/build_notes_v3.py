#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Kịch bản nói bản V3.

Thứ tự slide của V3 y hệt V2 (16 slide + 5 dự phòng), chỉ chữ TRÊN SLIDE
đổi — lời nói không đổi. Nên kịch bản chép nguyên từ notes-v2.html, chỉ
đổi nhãn bản. Mọi tham chiếu chéo đã được build_notes_v2.py vá sẵn.

    python build_notes_v3.py
"""
import io, os, subprocess, sys
sys.stdout.reconfigure(encoding="utf-8")

HERE = os.path.dirname(os.path.abspath(__file__))
SLIDES = os.path.join(HERE, "slides")
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


def main():
    goc = os.path.join(SLIDES, "notes-v2.html")
    t = io.open(goc, encoding="utf-8").read()
    t = t.replace("Kịch bản nói — bản V2", "Kịch bản nói — bản V3")
    t = t.replace("<title>", "<title>V3 · ")

    out = os.path.join(SLIDES, "notes-v3.html")
    io.open(out, "w", encoding="utf-8", newline="\n").write(t)

    pdf = os.path.join(HERE, "viec-lam-tri-thuc-v3-notes.pdf")
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
                    "--virtual-time-budget=12000", "--print-to-pdf=" + pdf,
                    "file:///" + out.replace("\\", "/")],
                   capture_output=True, timeout=180)
    print(f"  → notes-v3.html")
    print(f"  → viec-lam-tri-thuc-v3-notes.pdf  {os.path.getsize(pdf):,} byte")


if __name__ == "__main__":
    main()
