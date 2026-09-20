#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Sinh slides/notes-v2.html từ slides/notes.html — giữ nguyên nội dung lời nói,
chỉ đánh số lại theo thứ tự v2 và gắn nhãn từ khoá.

    python build_notes_v2.py
"""
import io, os, re, sys, subprocess
sys.stdout.reconfigure(encoding="utf-8")

HERE = os.path.dirname(os.path.abspath(__file__))
SLIDES = os.path.join(HERE, "slides")
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# (slide v2, slide v1 nguồn, tiêu đề, nhãn chip)
THU_TU = [
    (1,  1,  "Mở đề",                          None),
    (3,  2,  "Một thứ biết, một thứ chưa ai đo", "TỪ KHOÁ ① · PHẦN DÔI"),
    (4,  3,  "N ngành, một câu hỏi",           "PHƯƠNG PHÁP"),
    (5,  4,  "Ba quy luật, ba câu hỏi",        "KHUNG PHÂN TÍCH"),
    (6,  5,  "Mua thời gian, không mua kết quả", "TỪ KHOÁ ② · THỜI GIAN"),
    (7,  6,  "Hình thức không có ô cho yếu tố mới", "TỪ KHOÁ ③ · MỘT Ô"),
    (8,  7,  "Gà không gáy thì trời vẫn sáng", "TỪ KHOÁ ④ · NGUYÊN CỚ"),
    (9,  8,  "Chỉnh thể có ba bên",            "TỪ KHOÁ ⑤ · QUY KẾT"),
    (10, 9,  "Kịch bản nói gì",                "SỐ LIỆU"),
    (11, 10, "Ai được lợi, ai chống",          "TỪ KHOÁ ⑥ · QUYỀN HÃM"),
    (12, 11, "Khoảng lệch giữa hai đầu hợp đồng", "TỪ KHOÁ ⑦ · KHOẢNG LỆCH"),
    (13, 12, "Bốn ứng viên",                   "TỪ KHOÁ ① · PHẦN DÔI — khép vòng"),
    (14, 13, "Phủ định của phủ định",          "TỪ KHOÁ ⑧ · KẾ THỪA"),
    (15, 14, "Đo trước đã",                    "KIẾN NGHỊ"),
    (16, 15, "Chốt · Hạn chế · Q&amp;A",       None),
]

# Lời nói viết cho bản v1 nên tham chiếu chéo còn đánh số v1.
# Khoá theo slide V2; neo dài để khỏi trúng nhầm chỗ khác.
SUA_THAM_CHIEU = {
    3: [("quyết định S14 có nghĩa",
         "quyết định S15 có nghĩa")],
    7: [("câu hỏi ở slide hai",
         "câu hỏi ở slide ba"),
        ("Khác gì slide 5?",
         "Khác gì slide 6?")],
    9: [("ở slide năm chính chúng tôi",
         "ở slide sáu chính chúng tôi"),
        ("ống dẫn ở slide sáu vẽ sai",
         "ống dẫn ở slide bảy vẽ sai")],
}
# Để yên: "slide 87" · "slide 93" · "slide 89" · "slide 112" là số slide
# GIÁO TRÌNH, không phải slide của deck.

S2_MOI = """<div class="s">
<h2>S2 <span>· Bản đồ tám từ khoá</span> <b class="tk-chip">BẢN ĐỒ</b></h2>
<div class="neo">N1 · người nghe luôn biết đang ở đâu</div>
<p>Trước khi vào phân tích, xin bày ra <b>tám từ khoá</b> của cả bài — và slide nào gỡ cái nào. Làm vậy để mọi người luôn biết đang ở đâu trong mạch, thay vì nghe xong mới ghép lại.</p>
<p>Đọc lướt một vòng: <b class="cam">phần dôi</b> là cái chưa ai đo — đó là câu hỏi của bài. <b class="cam">Thời gian</b> là đơn vị mua bán, không phải thước đo. <b class="cam">Một ô</b> là chỗ cấu trúc trả công chỉ chừa đúng một chỗ cho lao động. <b class="cam">Nguyên cớ</b> là cái được nói ra, khác nguyên nhân thật. <b class="cam">Quy kết</b> là điểm nghẽn: tách phần giá trị của ai. <b class="cam">Quyền hãm</b> giải thích vì sao bên thiệt nhất không phải bên chống nhất. <b class="cam">Khoảng lệch</b> nằm giữa hai đầu hợp đồng. Và <b class="cam">kế thừa</b> là câu hỏi cái mới giữ lại gì.</p>
<p>Xin chú ý từ khoá số một. Nó mở bài ở slide ba, rồi <b>quay lại ở slide mười ba</b> — vì cả bài khép về đúng câu hỏi đó. Khi thấy dải chỉ vị trí sáng lại ở vạch một, nghĩa là chúng ta đã đi hết vòng.</p>
<div class="hoi"><b>Mẹo trình bày</b> → Đừng đọc cả tám ô. Chỉ trỏ vào ô ① và ô ⑤, nói rằng hai cái đó là trục; sáu cái còn lại là đường đi giữa chúng. Slide này nên mất 45 giây, không hơn.</div>
</div>

"""


def main():
    src = io.open(os.path.join(SLIDES, "notes.html"), encoding="utf-8").read()

    # bóc từng khối .s theo số slide v1
    khoi = {}
    for m in re.finditer(r'<div class="s">\s*<h2>S(\d+)\s(.*?)</div>\s*(?=<div class="s">|<div class="canh">)',
                         src, re.S):
        khoi[int(m.group(1))] = m.group(0)

    ra = []
    for v2, v1, ten, chip in THU_TU:
        k = khoi.get(v1)
        if not k:
            print(f"  ⚠ thiếu S{v1} trong notes.html")
            continue
        nhan = f' <b class="tk-chip">{chip}</b>' if chip else ""
        k = re.sub(r"<h2>S\d+\s*<span>·[^<]*</span></h2>",
                   f"<h2>S{v2} <span>· {ten}</span>{nhan}</h2>", k, count=1)
        # tham chiếu chéo trong lời nói đang đánh số theo v1 → dịch sang v2.
        # Thứ tự quan trọng: đổi số LỚN trước, không thì lần đổi sau ăn vào
        # chính chuỗi vừa tạo ra.
        for cu, moi in SUA_THAM_CHIEU.get(v2, []):
            assert cu in k, f"S{v2}: không thấy '{cu}'"
            k = k.replace(cu, moi)
        ra.append(k)
        if v2 == 1:
            ra.append(S2_MOI)

    than = "".join(ra)

    dau = src[:src.index('<div class="s">')]
    dau = dau.replace("Kịch bản nói</h1>", "Kịch bản nói — bản V2</h1>")
    dau = dau.replace("15 slide + 5 dự phòng", "16 slide + 5 dự phòng")
    dau = dau.replace("sơ đồ S8</b>", "sơ đồ S9</b>")
    dau = dau.replace("</style>",
                      "b.tk-chip{float:right;font-size:8.5pt;letter-spacing:1.2px;color:#E8641A;"
                      "border:1px solid #E8641A;padding:2px 8px;border-radius:2px;font-weight:400;}\n</style>")

    cuoi = ('<div class="canh">\n<b>Năm slide dự phòng sau S16</b> — không trình chiếu, chỉ bật khi bị hỏi: '
            'B1 bảng độ tin cậy · B2 bốn thứ đã bỏ kèm lý do · B3 bản đối chiếu lăng kính · '
            'B4 phiếu ca ngành 8 câu · B5 nguồn đầy đủ.\n</div>\n\n</body>\n</html>\n')

    out = os.path.join(SLIDES, "notes-v2.html")
    io.open(out, "w", encoding="utf-8", newline="\n").write(dau + than + cuoi)
    print(f"  → notes-v2.html · {len(ra)} khối")

    pdf = os.path.join(HERE, "viec-lam-tri-thuc-v2-notes.pdf")
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
                    "--virtual-time-budget=12000", "--print-to-pdf=" + pdf,
                    "file:///" + out.replace("\\", "/")], capture_output=True, timeout=180)
    print(f"  → viec-lam-tri-thuc-v2-notes.pdf  {os.path.getsize(pdf):,} byte")


if __name__ == "__main__":
    main()
