#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Kịch bản nói bản V3 — chia vai cho BẢY người.

Thứ tự slide của V3 y hệt V2, lời nói không đổi. Việc của script này:
  1. chép kịch bản từ notes-v2.html
  2. đánh lại số vai N1–N5 (cho 5 người) thành N1–N7
  3. gắn mốc giây vào từng slide để người nói tự bấm giờ
  4. chèn bảng phân vai lên đầu

    python build_notes_v3.py
"""
import io, os, re, subprocess, sys
sys.stdout.reconfigure(encoding="utf-8")

HERE = os.path.dirname(os.path.abspath(__file__))
SLIDES = os.path.join(HERE, "slides")
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# slide v3 → (người, giây, có phải slide lõi tính điểm không)
#   Mốc giây lấy từ luật "mỗi slide 60–90 giây" trong notes.html, trừ
#   S2 mà chính ghi chú của nó đã chốt "45 giây, không hơn".
#   ⭐ = nằm trong S6–S9 và S13–S15 — đề cương ghi "4.0/10 điểm, không được cắt".
LICH = {
    1:  ("N1", 30,  ""),
    2:  ("N1", 45,  ""),
    3:  ("N1", 90,  ""),
    4:  ("N2", 45,  ""),
    5:  ("N2", 45,  ""),
    6:  ("N2", 75,  "⭐"),
    7:  ("N3", 90,  "⭐"),
    8:  ("N3", 75,  "⭐"),
    9:  ("N4", 105, "⭐⭐"),
    10: ("N4", 75,  ""),
    11: ("N5", 75,  ""),
    12: ("N5", 60,  ""),
    13: ("N6", 105, "⭐⭐"),
    14: ("N6", 75,  "⭐"),
    15: ("N7", 75,  "⭐"),
    16: ("N7", 75,  ""),
}

# người → (slide, tên phần, thứ phải mang tới, chỗ dễ bị hỏi nhất)
VAI = [
    ("N1", "S1 · S2 · S3", "Mở đề · bản đồ tám từ khoá · câu hỏi của bài",
     "Phiếu ca ngành của mình",
     "“Chưa đo được thì bàn làm gì?” — trả lời: biết mình chưa biết gì cũng là kết quả, và nó quyết định kiến nghị ở S15."),
    ("N2", "S4 · S5 · S6", "Phương pháp · khung ba quy luật · bản chất–hiện tượng",
     "Phiếu ca ngành + tổng hợp bảng N ngành trên S4",
     "“Khung này có tự chứng minh không?” — phải tự khai trước: chọn Lực lượng sản xuất – Quan hệ sản xuất thì “quan hệ lạc hậu phải đổi” là định lý của khung."),
    ("N3", "S7 · S8", "Nội dung–hình thức (một ô) · nguyên cớ khác nguyên nhân",
     "Phiếu ca ngành",
     "“Đan Mạch có kênh chia phần mà vẫn không đổi thì sao?” — ống có, dòng chảy không đủ; vấn đề ở áp suất."),
    ("N4", "S9 · S10", "Chỉnh thể ba bên (sơ đồ mâu thuẫn) · số liệu kịch bản",
     "Phiếu + vẽ lại được sơ đồ S9 trên giấy",
     "“Sao biết khách không lấy mất?” — KHÔNG biết. Đó là biến thứ ba chưa loại trừ, để ngay trên hình."),
    ("N5", "S11 · S12", "Quyền hãm · khoảng lệch hai đầu hợp đồng",
     "Phiếu + bảng các bên được lợi / chịu thiệt",
     "“Căn cứ đâu nói quản lý cấp trung chống?” — chưa có bằng chứng nào, mới là giả thuyết, chờ phiếu câu 8."),
    ("N6", "S13 · S14", "Bốn ứng viên H1–H4 · phủ định của phủ định",
     "Phiếu + thuộc hai phép đo phân biệt H1/H2/H3",
     "“Bốn giả thuyết thì kết luận là gì?” — kết luận là dữ liệu chưa phân biệt được, và đây là hai phép đo rẻ để phân biệt."),
    ("N7", "S15 · S16", "Kiến nghị · chốt · bốn lần tự bác bỏ · điều phối hỏi đáp",
     "Phiếu + thuộc bốn lần nhóm tự bác bỏ",
     "“Doanh nghiệp áp dụng từ phòng nào?” — ban giám đốc quyết, nhân sự dựng thước đo, quản lý dự án thí điểm, bắt đầu ở hợp đồng trọn gói."),
]


def bang_vai():
    tong = sum(g for _, g, _ in LICH.values())
    h = ['<div class="vai">',
         "<h2>Phân vai — bảy người</h2>",
         '<table><tr><th>Người</th><th>Slide</th><th>Nói về</th><th>Giây</th>'
         "<th>Mang gì tới</th><th>Câu dễ bị hỏi nhất</th></tr>"]
    for ma, sl, noi, mang, hoi in VAI:
        giay = sum(g for n, (p, g, _) in LICH.items() if p == ma)
        h.append(f"<tr><td><b>{ma}</b></td><td>{sl}</td><td>{noi}</td>"
                 f"<td><b>{giay // 60}&#8242;{giay % 60:02d}&#8243;</b></td>"
                 f"<td>{mang}</td><td>{hoi}</td></tr>")
    h.append(f'<tr class="tong"><td colspan="3">Tổng</td>'
             f'<td><b>{tong // 60}&#8242;{tong % 60:02d}&#8243;</b></td>'
             f'<td colspan="2">cộng ~1&#8242; chuyển người giữa 6 lần đổi vai '
             f'&#8594; <b>sát trần 20 phút</b></td></tr>')
    h.append("</table>")
    h.append('<div class="canh" style="margin-top:14px">'
             "<b>Quá giờ thì cắt theo thứ tự này:</b> S1 xuống 20 giây · S5 xuống 35 giây · "
             "S12 xuống 45 giây. <b>Không được cắt S6–S9 và S13–S15</b> — đề cương ghi đó là "
             "4.0/10 điểm.<br>"
             "<b>Hỏi chéo:</b> mỗi người đỡ câu thuộc slide mình. Câu vắt qua nhiều phần thì "
             "N4 đỡ, vì sơ đồ ba bên ở S9 là chỗ cả bài quy về. "
             "<b>Ai cũng phải vẽ lại được sơ đồ S9.</b></div>")
    h.append("</div>\n\n")
    return "\n".join(h)


CSS_VAI = """
div.vai{border:1.5px solid #E8641A;padding:14px 16px 16px;margin-bottom:20px;page-break-after:always;}
div.vai h2{margin:0 0 10px;font-size:15pt;color:#E8641A;}
div.vai table{width:100%;border-collapse:collapse;font-size:9pt;}
div.vai th{text-align:left;font-size:7.5pt;letter-spacing:.6px;text-transform:uppercase;
  color:#6E6E6E;border-bottom:1px solid #D0D0D0;padding:4px 7px;}
div.vai td{padding:6px 7px;border-bottom:1px solid #ECECEC;vertical-align:top;}
div.vai tr.tong td{border-top:1.5px solid #E8641A;border-bottom:none;background:#FEF8F4;}
"""


def main():
    goc = os.path.join(SLIDES, "notes-v2.html")
    t = io.open(goc, encoding="utf-8").read()
    t = t.replace("Kịch bản nói — bản V2", "Kịch bản nói — bản V3 · bảy người")
    t = t.replace("<title>", "<title>V3 · ")
    t = t.replace("</style>", CSS_VAI + "</style>")

    # đánh lại số vai + gắn mốc giây cho từng khối
    def sua_khoi(m):
        n = int(m.group(1))
        nguoi, giay, sao = LICH[n]
        nhan = f"{nguoi} · {giay} giây{' · ' + sao if sao else ''} · "
        return re.sub(r'(<div class="neo">)N\d+\s*·\s*',
                      lambda k: k.group(1) + nhan, m.group(0), count=1)

    # neo của S9 có thẻ lồng bên trong nên không dùng [^<]* được
    t, so = re.subn(r'<h2>S(\d+)\s.*?<div class="neo">.*?</div>', sua_khoi, t, flags=re.S)
    assert so == 16, f"đánh lại được {so} khối, phải là 16"

    # chèn bảng phân vai ngay sau khối tiêu đề đầu trang
    moc = '<div class="s">'
    t = t.replace(moc, bang_vai() + moc, 1)

    out = os.path.join(SLIDES, "notes-v3.html")
    io.open(out, "w", encoding="utf-8", newline="\n").write(t)

    pdf = os.path.join(HERE, "viec-lam-tri-thuc-v3-notes.pdf")
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
                    "--virtual-time-budget=12000", "--print-to-pdf=" + pdf,
                    "file:///" + out.replace("\\", "/")],
                   capture_output=True, timeout=180)
    tong = sum(g for _, g, _ in LICH.values())
    print(f"  → notes-v3.html · 16 khối đánh lại vai · tổng {tong // 60}'{tong % 60:02d}\"")
    print(f"  → viec-lam-tri-thuc-v3-notes.pdf  {os.path.getsize(pdf):,} byte")


if __name__ == "__main__":
    main()
