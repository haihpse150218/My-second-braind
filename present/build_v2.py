#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Dựng bản V2 — cấu trúc "bày từ khoá trước, rồi gỡ từng cái".
16 slide + 5 dự phòng = 21.

    python build_v2.py          # pdf + png + notes
    powershell -ExecutionPolicy Bypass -File make_pptx.ps1 -Ver v2
"""
import io, os, re, sys, subprocess
sys.stdout.reconfigure(encoding="utf-8")

HERE = os.path.dirname(os.path.abspath(__file__))
SLIDES = os.path.join(HERE, "slides")
PNG = os.path.join(HERE, "png-v2")
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
W, H, N, SCALE = 1280, 720, 21, 2

SRC = "file:///" + os.path.join(SLIDES, "index-v2.html").replace("\\", "/")


def pdf():
    out = os.path.join(HERE, "viec-lam-tri-thuc-v2.pdf")
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
                    "--run-all-compositor-stages-before-draw",
                    "--virtual-time-budget=15000",
                    "--print-to-pdf=" + out, SRC], capture_output=True, timeout=240)
    print(f"  → viec-lam-tri-thuc-v2.pdf  {os.path.getsize(out):,} byte")


def render():
    os.makedirs(PNG, exist_ok=True)
    full = os.path.join(PNG, "_full.png")
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
                    f"--force-device-scale-factor={SCALE}",
                    f"--window-size={W},{H*N}", "--screenshot=" + full,
                    "--virtual-time-budget=20000", SRC], capture_output=True, timeout=300)
    from PIL import Image
    im = Image.open(full)
    print(f"  ảnh gốc: {im.size[0]}×{im.size[1]}")
    sw, sh = W * SCALE, H * SCALE
    for i in range(N):
        im.crop((0, i * sh, sw, (i + 1) * sh)).save(
            os.path.join(PNG, f"slide{i+1:02d}.png"), optimize=True)
    os.remove(full)
    print(f"  → {N} PNG {sw}×{sh}")


# ánh xạ slide v2 → mục **Lời nói** trong file nguồn (S1..S15 của bản md)
MAP = {1: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8,
       10: 9, 11: 10, 12: 11, 13: 12, 14: 13, 15: 14, 16: 15}
# Mục **Lời nói** trong file md viết cho thứ tự v1 nên tham chiếu chéo còn
# đánh số v1. Khoá theo slide V2; neo dài để khỏi trúng nhầm chỗ khác.
# ("Slide trước" / "các slide sau" là tương đối — để yên.)
SUA_THAM_CHIEU = {
    7:  [("câu hỏi ở slide hai",          "câu hỏi ở slide ba")],
    9:  [("ở slide năm chính chúng tôi",  "ở slide sáu chính chúng tôi"),
         ("ống dẫn ở slide sáu vẽ sai",   "ống dẫn ở slide bảy vẽ sai")],
    15: [("trả lời vội ở slide hai",      "trả lời vội ở slide ba")],
}

RIENG = {
    2: "Trước khi vào phân tích, xin bày ra tám từ khoá của cả bài — và slide nào gỡ cái nào. "
       "Làm vậy để mọi người luôn biết đang ở đâu trong mạch, thay vì nghe xong mới ghép lại. "
       "Lưu ý từ khoá số một, PHẦN DÔI: nó mở bài ở slide ba và quay lại ở slide mười ba — "
       "vì cả bài khép về đúng câu hỏi đó.",
    17: "DỰ PHÒNG — bảng độ tin cậy. Bật khi bị hỏi \"nhóm chắc tới mức nào\". 🟢 4 · 🟡 8 · 🔴 1 · đã bỏ 4.",
    18: "DỰ PHÒNG — bốn thứ đã bỏ kèm lý do.",
    19: "DỰ PHÒNG — bản đối chiếu lăng kính.",
    20: "DỰ PHÒNG — phiếu ca ngành 8 câu.",
    21: "DỰ PHÒNG — nguồn đầy đủ.",
}


def notes():
    md = io.open(os.path.join(HERE, "de-tai-viec-lam-tri-thuc.md"), encoding="utf-8").read()
    kh = re.split(r"\n## S(\d+) · ", md)
    goc = {}
    for i in range(1, len(kh), 2):
        m = re.search(r"\*\*Lời nói\*\*\n(.*?)(?=\n\*\*Neo\*\*|\n\*\*🟢|\n---)", kh[i + 1], re.S)
        if not m:
            continue
        t = re.sub(r"^> ?", "", m.group(1), flags=re.M)
        t = re.sub(r"\*\*(.+?)\*\*", r"\1", t)
        t = re.sub(r"\*(.+?)\*", r"\1", t)
        t = re.sub(r"`(.+?)`", r"\1", t)
        goc[int(kh[i])] = re.sub(r"\n{3,}", "\n\n", t).strip()

    ra = []
    for n in range(1, N + 1):
        ra.append(f"@@SLIDE{n}@@")
        t = RIENG.get(n, goc.get(MAP.get(n, -1), "")).strip()
        for cu, moi in SUA_THAM_CHIEU.get(n, []):
            assert cu in t, f"S{n}: không thấy '{cu}'"
            t = t.replace(cu, moi)
        ra.append(t)
    io.open(os.path.join(PNG, "notes.txt"), "w", encoding="utf-8", newline="\n").write("\n".join(ra))
    co = sum(1 for n in range(1, N + 1) if RIENG.get(n) or goc.get(MAP.get(n, -1)))
    print(f"  → notes.txt · {co}/{N} slide có ghi chú")


if __name__ == "__main__":
    print("V2 — xuất PDF…");  pdf()
    print("V2 — render PNG…"); render()
    print("V2 — bóc notes…");  notes()
