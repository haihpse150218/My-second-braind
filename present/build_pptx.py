#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Dựng bản .pptx từ deck HTML.

    python build_pptx.py render   # 20 slide → PNG 2560×1440 (2x)
    python build_pptx.py notes    # bóc kịch bản nói → notes.txt
    python build_pptx.py all

Sau đó chạy tiếp:  powershell -File make_pptx.ps1

Vì sao ảnh chứ không phải text box: sơ đồ trong deck là SVG inline, không có
đường nào chuyển thẳng sang DrawingML mà giữ được nét. Ảnh 2x giữ đúng bố cục,
và Speaker Notes vẫn là text thật nên người trình bày dùng Presenter View được.
Bản sửa nội dung là present/slides/index.html — pptx là bản xuất.
"""
import io
import os
import re
import sys
import subprocess

sys.stdout.reconfigure(encoding="utf-8")

HERE = os.path.dirname(os.path.abspath(__file__))
SLIDES = os.path.join(HERE, "slides")
PNG = os.path.join(HERE, "png")
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

W, H, N = 1280, 720, 20
SCALE = 2


def render():
    os.makedirs(PNG, exist_ok=True)
    full = os.path.join(PNG, "_full.png")
    src = "file:///" + os.path.join(SLIDES, "index.html").replace("\\", "/")
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
                    f"--force-device-scale-factor={SCALE}",
                    f"--window-size={W},{H * N}",
                    "--screenshot=" + full,
                    "--virtual-time-budget=20000", src],
                   capture_output=True, timeout=300)
    if not os.path.exists(full):
        print("  LỖI: Chrome không chụp được")
        return False

    from PIL import Image
    im = Image.open(full)
    print(f"  ảnh gốc: {im.size[0]}×{im.size[1]}")
    sw, sh = W * SCALE, H * SCALE
    for i in range(N):
        im.crop((0, i * sh, sw, (i + 1) * sh)).save(
            os.path.join(PNG, f"slide{i+1:02d}.png"), optimize=True)
    os.remove(full)
    print(f"  → {N} file PNG {sw}×{sh} trong png/")
    return True


def boc_notes():
    """Bóc mục **Lời nói** của từng slide từ file nguồn markdown."""
    md = io.open(os.path.join(HERE, "de-tai-viec-lam-tri-thuc.md"),
                 encoding="utf-8").read()

    khoi = re.split(r"\n## S(\d+) · ", md)
    ghi = {}
    for i in range(1, len(khoi), 2):
        so = int(khoi[i])
        than = khoi[i + 1]
        m = re.search(r"\*\*Lời nói\*\*\n(.*?)(?=\n\*\*Neo\*\*|\n\*\*🟢|\n---)",
                      than, re.S)
        if not m:
            continue
        txt = m.group(1)
        txt = re.sub(r"^> ?", "", txt, flags=re.M)      # bỏ dấu blockquote
        txt = re.sub(r"\*\*(.+?)\*\*", r"\1", txt)      # bỏ đậm
        txt = re.sub(r"\*(.+?)\*", r"\1", txt)          # bỏ nghiêng
        txt = re.sub(r"`(.+?)`", r"\1", txt)
        txt = re.sub(r"\n{3,}", "\n\n", txt).strip()
        ghi[so] = txt

    duphong = {
        16: "DỰ PHÒNG — bảng độ tin cậy. Bật khi bị hỏi \"nhóm chắc tới mức nào\". "
            "🟢 4 · 🟡 8 · 🔴 1 · đã bỏ 4.",
        17: "DỰ PHÒNG — bốn thứ đã bỏ kèm lý do. Bật khi bị hỏi vì sao không nói "
            "về điểm nút, chỉ số gãy thước, hay sức mặc cả.",
        18: "DỰ PHÒNG — bản đối chiếu lăng kính. Bật khi bị hỏi nhóm kiểm chéo bằng gì.",
        19: "DỰ PHÒNG — phiếu ca ngành 8 câu. Bật khi bị hỏi dữ liệu sơ cấp thu thế nào.",
        20: "DỰ PHÒNG — nguồn đầy đủ. Bật khi bị hỏi nguồn của hãng AI thì tin được không.",
    }
    ghi.update(duphong)

    ra = []
    for n in range(1, N + 1):
        ra.append(f"@@SLIDE{n}@@")
        ra.append(ghi.get(n, "").strip())
    out = os.path.join(HERE, "png", "notes.txt")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    io.open(out, "w", encoding="utf-8", newline="\n").write("\n".join(ra))
    co = sum(1 for n in range(1, N + 1) if ghi.get(n))
    print(f"  → notes.txt · có ghi chú cho {co}/{N} slide")
    return True


if __name__ == "__main__":
    lenh = sys.argv[1] if len(sys.argv) > 1 else "all"
    if lenh in ("render", "all"):
        print("Render 20 slide…")
        render()
    if lenh in ("notes", "all"):
        print("Bóc kịch bản nói…")
        boc_notes()
