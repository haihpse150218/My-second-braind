#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Dựng deck thuyết trình GK Triết.

    python build.py img     # tải 6 ảnh Wikimedia (PD/CC0) + ghi NGUON.md
    python build.py chart   # sinh biểu đồ cột chồng tỷ trọng lao động
    python build.py pdf     # gọi Chrome xuất 2 PDF
    python build.py all

Ràng buộc đã kiểm trên máy này — đọc trước khi sửa:
  · Wikimedia chặn theo NHỊP, không theo nội dung.
    UA chứa "Bot" → 429 toàn bộ. Gửi dồn → 429 ở 15/18 request.
  · Phải dùng Special:FilePath + ?width=1600.
    File gốc 8,4 MB timeout >120s; bản resize 1,86 MB mất 9,2s.
    Tự ghép tay upload.wikimedia.org/.../thumb/... → HTTP 400.
  · matplotlib tra font THEO TÊN là hỏng: "Arial" → ARIALN.TTF (Arial
    Narrow, 8/43 dấu tiếng Việt). Bắt buộc truyền fname= đường dẫn tuyệt đối.
"""
import io
import os
import sys
import time
import subprocess

sys.stdout.reconfigure(encoding="utf-8")

HERE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(HERE, "img")
SLIDES = os.path.join(HERE, "slides")

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36")

# (tên file lưu, tên file trên Commons, giấy phép, tác giả/nguồn, dùng ở slide)
ANH = [
    ("punch-clock.jpg",
     "LM_Ericsson_tidkontroll_-_old_punch_clock_1.jpg",
     "CC0", "W.carter", "S1 — máy chấm công"),
    ("motorman-time-clock.jpg",
     "Motorman_using_time_clock_to_report_to_Control_Office_from_the_end_of_a_remote_streetcar_line.jpg",
     "Public domain", "US federal government", "S2 — người bấm giờ"),
    ("payroll-1947.jpg",
     "Coffee_pickers_payroll_1947.jpg",
     "CC0", "—", "S11 — sổ lương viết tay"),
    ("planning-department.jpg",
     "Alien_Property_Custodian_-_Property_Seized_-_Production_Planning_Department,_Bosch_Magneto_Co_-_NARA_-_17342495.jpg",
     "Public domain", "NARA", "S10 — lao động tri thức tổ chức như dây chuyền"),
    ("blacksmith.jpg",
     "G.M.D._Hill_in_his_blacksmith_shop_on_Main_Street,_1900_(83a878a4-388c-4398-9804-3a58152ce6fe).jpg",
     "Public domain", "National Park Service", "S13 — thợ sở hữu công cụ của chính mình"),
    ("server-racks.jpg",
     "Front_of_server_racks_at_NERSC.jpg",
     "CC0", "Derrick Coetzee", "S8 — tư liệu sản xuất mới"),
]


def tai_anh():
    import requests
    from urllib.parse import quote

    os.makedirs(IMG, exist_ok=True)
    ses = requests.Session()
    ses.headers["User-Agent"] = UA

    ok, loi = [], []
    for i, (ten, commons, gp, tacgia, dung) in enumerate(ANH):
        dich = os.path.join(IMG, ten)
        if os.path.exists(dich) and os.path.getsize(dich) > 10_000:
            print(f"  [{i+1}/6] bỏ qua, đã có: {ten}")
            ok.append((ten, commons, gp, tacgia, dung))
            continue

        url = ("https://commons.wikimedia.org/wiki/Special:FilePath/"
               + quote(commons) + "?width=1600")
        for lan in range(4):
            try:
                r = ses.get(url, timeout=90)
                if r.status_code == 429:
                    cho = 5 * (lan + 1)
                    print(f"  [{i+1}/6] 429, chờ {cho}s rồi thử lại…")
                    time.sleep(cho)
                    continue
                r.raise_for_status()
                if not r.content.startswith(b"\xff\xd8"):
                    raise ValueError("không phải JPEG hợp lệ")
                with open(dich, "wb") as f:
                    f.write(r.content)
                print(f"  [{i+1}/6] {ten}  {len(r.content):,} byte")
                ok.append((ten, commons, gp, tacgia, dung))
                break
            except Exception as e:
                if lan == 3:
                    print(f"  [{i+1}/6] LỖI {ten}: {e}")
                    loi.append((ten, str(e)))
                else:
                    time.sleep(3)
        time.sleep(2.5)  # giãn nhịp — bắt buộc

    ghi_nguon(ok)
    print(f"\nTải được {len(ok)}/6 ảnh." + (f" Lỗi: {len(loi)}" if loi else ""))
    return len(loi) == 0


def ghi_nguon(ds):
    dong = [
        "# Nguồn hình ảnh",
        "",
        "> Toàn bộ hình trong bài là **ảnh chụp thật**, thuộc **phạm vi công cộng (PD)**",
        "> hoặc **CC0**. **Không dùng ảnh do AI sinh ra.**",
        ">",
        "> Lý do không dùng ảnh AI: bài này hỏi *\"năng suất tăng lên đã đi đâu?\"*.",
        "> Minh hoạ bằng ảnh AI là tự trình diễn đúng cơ chế đang phê phán — giá trị",
        "> do lao động tích luỹ bị hấp thu vào một mô hình mà người tạo ra nó không",
        "> nhận được gì.",
        "",
        "| File | Giấy phép | Tác giả / Nguồn | Dùng ở | Trang gốc |",
        "|---|---|---|---|---|",
    ]
    for ten, commons, gp, tacgia, dung in ds:
        url = "https://commons.wikimedia.org/wiki/File:" + commons
        dong.append(f"| `{ten}` | **{gp}** | {tacgia} | {dung} | [Commons]({url}) |")
    dong += [
        "",
        "**Biểu đồ** `chart-labor-share.png` do nhóm tự dựng bằng matplotlib từ số liệu",
        "Korinek, Jones, Sacher, Cotter & McCrory (2026), *Economic Scenarios for",
        "Transformative AI*, Anthropic Institute WP 2026-02 — **là kịch bản, không phải",
        "dự báo; dữ liệu Mỹ; so với đường không-AI năm 2030**.",
        "",
    ]
    with io.open(os.path.join(IMG, "NGUON.md"), "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(dong))
    print("  → đã ghi img/NGUON.md")


def sinh_bieu_do():
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from matplotlib.font_manager import FontProperties

    # BẮT BUỘC đường dẫn tuyệt đối — tra theo tên sẽ trúng ARIALN.TTF
    fp = FontProperties(fname=r"C:\Windows\Fonts\segoeui.ttf")
    fpb = FontProperties(fname=r"C:\Windows\Fonts\segoeuib.ttf")

    os.makedirs(IMG, exist_ok=True)
    CAM, XAM, DEN = "#E8641A", "#C9C9C9", "#1A1A1A"

    nhan = ["Không AI", "Substantial", "Extreme"]
    lao_dong = [60.0, 56.1, 45.2]
    von = [40.0, 43.9, 54.8]
    x = range(3)

    fig, ax = plt.subplots(figsize=(9.2, 5.0), dpi=200)
    ax.bar(x, lao_dong, 0.5, color=XAM, edgecolor="white", linewidth=2)
    ax.bar(x, von, 0.5, bottom=lao_dong, color=CAM, edgecolor="white", linewidth=2)

    for i in x:
        ax.text(i, lao_dong[i] / 2, f"{lao_dong[i]:.1f}".replace(".", ","),
                ha="center", va="center", fontproperties=fpb, fontsize=19, color=DEN)
        ax.text(i, lao_dong[i] + von[i] / 2, f"{von[i]:.1f}".replace(".", ","),
                ha="center", va="center", fontproperties=fpb, fontsize=19, color="white")

    ax.text(-0.62, 30, "LAO ĐỘNG", ha="center", va="center", rotation=90,
            fontproperties=fpb, fontsize=12, color="#666666")
    ax.text(-0.62, 80, "VỐN", ha="center", va="center", rotation=90,
            fontproperties=fpb, fontsize=12, color=CAM)

    ax.set_xticks(list(x))
    ax.set_xticklabels(nhan, fontproperties=fp, fontsize=14, color=DEN)
    ax.set_ylim(0, 100)
    ax.set_yticks([])
    for c in ("top", "right", "left", "bottom"):
        ax.spines[c].set_visible(False)
    ax.tick_params(length=0)
    ax.set_title("Tỷ trọng thu nhập, năm 2030 (%)",
                 fontproperties=fpb, fontsize=15, color=DEN, pad=16, loc="left")

    fig.tight_layout()
    out = os.path.join(IMG, "chart-labor-share.png")
    fig.savefig(out, facecolor="white", bbox_inches="tight")
    plt.close(fig)
    print(f"  → {out}")
    return True


CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


def xuat_pdf():
    if not os.path.exists(CHROME):
        print(f"  KHÔNG thấy Chrome tại {CHROME}")
        return False
    viec = [("index.html", "viec-lam-tri-thuc.pdf"),
            ("notes.html", "viec-lam-tri-thuc-notes.pdf")]
    for src, dst in viec:
        p_src = os.path.join(SLIDES, src)
        if not os.path.exists(p_src):
            print(f"  bỏ qua, chưa có {src}")
            continue
        p_dst = os.path.join(HERE, dst)
        cmd = [CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
               "--run-all-compositor-stages-before-draw",
               "--virtual-time-budget=10000",
               f"--print-to-pdf={p_dst}",
               "file:///" + p_src.replace("\\", "/")]
        subprocess.run(cmd, capture_output=True, timeout=180)
        n = os.path.getsize(p_dst) if os.path.exists(p_dst) else 0
        print(f"  → {dst}  {n:,} byte")
    return True


if __name__ == "__main__":
    lenh = sys.argv[1] if len(sys.argv) > 1 else "all"
    if lenh in ("img", "all"):
        print("Tải ảnh Wikimedia (PD/CC0)…")
        tai_anh()
    if lenh in ("chart", "all"):
        print("Sinh biểu đồ…")
        sinh_bieu_do()
    if lenh in ("pdf", "all"):
        print("Xuất PDF bằng Chrome…")
        xuat_pdf()
