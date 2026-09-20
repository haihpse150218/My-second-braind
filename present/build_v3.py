#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Dựng bản V3 từ V2 — giữ nguyên sơ đồ, TRẢ PHẦN CHỮ VỀ.

Ba việc V3 làm khác V2:
  1. Mỗi slide lăng kính có thêm khối chữ giải thích (bản v2 chỉ 28–42 chữ).
  2. Viết đủ chữ, không viết tắt  (LLSX–QHSX · TFP · JD · n=1 · man-day…).
  3. Bỏ chữ nghiêng làm ghi chú — thay bằng nhãn chữ hoa có màu.

    python build_v3.py
    powershell -ExecutionPolicy Bypass -File make_pptx.ps1 -Ver v3
"""
import io, os, re, sys, subprocess
sys.stdout.reconfigure(encoding="utf-8")

HERE = os.path.dirname(os.path.abspath(__file__))
SLIDES = os.path.join(HERE, "slides")
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# ─────────────────────────────────────────────────────────────
# 1. Tên từ khoá — viết đủ nghĩa, đứng một mình cũng hiểu
# ─────────────────────────────────────────────────────────────
TU_KHOA = [
    ("①", "PHẦN NĂNG SUẤT DÔI RA",
     "Năng suất tăng thêm nhờ công cụ AI. Chưa nguồn nào đo được nó lớn bao nhiêu.", "S3 · S13"),
    ("②", "TRẢ THEO THỜI GIAN",
     "Thời gian là đơn vị mua bán sức lao động — không phải thước đo kết quả.", "S6"),
    ("③", "CHỈ MỘT Ô CHO LAO ĐỘNG",
     "Cấu trúc trả công chỉ chừa đúng một ô cho lao động: giờ nhân đơn giá.", "S7"),
    ("④", "NGUYÊN CỚ KHÁC NGUYÊN NHÂN",
     "Lý do được nói ra khi cắt giảm — khác với nguyên nhân thật sự.", "S8"),
    ("⑤", "QUY KẾT PHẦN GIÁ TRỊ",
     "Tách phần giá trị tăng thêm là của ai. Đây là điểm nghẽn của cả bài.", "S9"),
    ("⑥", "QUYỀN HÃM",
     "Khả năng làm chậm hoặc chặn một thay đổi. Giải thích vì sao bên thiệt nhất không phải bên chống nhất.", "S11"),
    ("⑦", "KHOẢNG LỆCH HAI ĐẦU HỢP ĐỒNG",
     "Đơn vị tính lúc trả cho người làm khác đơn vị tính lúc bán cho khách.", "S12"),
    ("⑧", "CÁI MỚI KẾ THỪA GÌ",
     "Hình thức trả công mới giữ lại gì của hình thức cũ, bỏ gì.", "S14"),
]

CHIP = {
    3:  "TỪ KHOÁ ① — PHẦN NĂNG SUẤT DÔI RA",
    6:  "TỪ KHOÁ ② — TRẢ THEO THỜI GIAN, KHÔNG THEO KẾT QUẢ",
    7:  "TỪ KHOÁ ③ — BẢNG LƯƠNG CHỈ CÓ MỘT Ô CHO LAO ĐỘNG",
    8:  "TỪ KHOÁ ④ — NGUYÊN CỚ KHÁC NGUYÊN NHÂN",
    9:  "TỪ KHOÁ ⑤ — QUY KẾT PHẦN GIÁ TRỊ CHO AI",
    11: "TỪ KHOÁ ⑥ — QUYỀN HÃM QUYẾT ĐỊNH SỨC CHỐNG",
    12: "TỪ KHOÁ ⑦ — KHOẢNG LỆCH GIỮA HAI ĐẦU HỢP ĐỒNG",
    13: "TỪ KHOÁ ① — PHẦN NĂNG SUẤT DÔI RA &nbsp;·&nbsp; KHÉP VÒNG",
    14: "TỪ KHOÁ ⑧ — CÁI MỚI KẾ THỪA GÌ CỦA CÁI CŨ",
}

# ─────────────────────────────────────────────────────────────
# 2. Khối chữ trả về từng slide — lấy từ mục "Chữ trên slide"
#    trong de-tai-viec-lam-tri-thuc.md, viết lại cho đủ chữ.
#    (nhãn, nội dung, có_nhấn)
# ─────────────────────────────────────────────────────────────
GIAI = {
 3: ("ba", [
    ("ĐÃ BIẾT — ĐAN MẠCH", "Dữ liệu hành chính, 25.000 lao động. Người dùng <b>tự báo</b> tiết kiệm khoảng 3% thời gian. Nhưng thu nhập và giờ công ghi nhận được là <b>NULL — không thấy thay đổi nào</b>, đủ chặt để loại trừ mọi hiệu ứng lớn hơn 2%.", 0),
    ("ĐÃ BIẾT — MỸ", "Bảng lương ADP tới tháng 6 năm 2026. Điều chỉnh <b>có</b> xảy ra, nhưng ở <b>biên số lượng</b>: doanh nghiệp tuyển ít người đi. Không xảy ra ở <b>biên giá</b>: lương cơ bản đứng yên.", 0),
    ("CHƯA AI ĐO — ĐÂY LÀ CÂU HỎI CỦA BÀI", "<b>Phần năng suất dôi ra đang tranh chấp lớn bao nhiêu, và ai đang giữ nó?</b> Không một nguồn nào trong bài đo được đại lượng này.", 1),
 ], None),

 5: ("ba", [
    ("QUY LUẬT MÂU THUẪN", "Trả lời câu <b>vì sao nó vận động?</b> Tìm động lực bên trong sự việc, thay vì đổ cho một tác nhân bên ngoài. Gỡ ở slide 9.", 0),
    ("QUY LUẬT LƯỢNG – CHẤT", "Trả lời câu <b>khi nào thì đổi chất?</b> Xác định Độ, điểm nút và bước nhảy. Gỡ ở slide 13.", 0),
    ("PHỦ ĐỊNH CỦA PHỦ ĐỊNH", "Trả lời câu <b>rồi sẽ đi về đâu?</b> Cái mới kế thừa gì của cái cũ. Gỡ ở slide 14.", 0),
 ], "<b>KHUNG NÀY CÓ THIÊN KIẾN — CHÚNG TÔI TỰ KHAI.</b> Chọn cặp Lực lượng sản xuất – Quan hệ sản xuất thì câu \"quan hệ lạc hậu phải đổi\" là <b>định lý của khung</b>, không phải phát hiện từ dữ liệu. Vì vậy khung chỉ dùng làm <b>ngôn ngữ sắp xếp</b>, không dùng làm bằng chứng."),

 6: ("hai", [
    ("HIỆN TƯỢNG — AI CŨNG THẤY", "Xong sớm vẫn ngồi đủ giờ. Giấu việc dùng AI. Mô tả công việc thêm dòng \"biết dùng AI\" nhưng thang lương không thêm dòng nào. Khách ép giá vì \"AI làm được mà\". Tranh cãi \"AI có thay người không\".", 0),
    ("CÁI IM LẶNG BÊN DƯỚI — BẢN CHẤT", "Quan hệ làm công <b>mua thời gian, không mua kết quả</b>. Hợp đồng không có điều khoản nào nói phần chênh lệch giữa hai thứ đó thuộc về ai.", 1),
 ], "<b>HIỆN TƯỢNG ĐÁNH LỪA NHẤT: \"AI CƯỚP VIỆC LÀM\".</b> Nó kéo câu hỏi từ <b>AI nhận bao nhiêu</b> sang <b>còn lại bao nhiêu việc</b> — hai câu hoàn toàn khác nhau."),

 7: ("hai", [
    ("NỘI DUNG — ĐÃ ĐỔI, MỌC THÊM MỘT YẾU TỐ", "Lao động sống nay làm ba việc khác nhau: thực hiện, thẩm định, chịu trách nhiệm. Xuất hiện <b>một yếu tố mới trước đây không có: tư bản dưới dạng công cụ AI</b>. Thêm tri thức tích luỹ của tổ chức, và câu hỏi ai gánh rủi ro khi kết quả sai.", 0),
    ("HÌNH THỨC — CHƯA ĐỔI", "Vẫn đơn vị đo là giờ, thang bậc theo thâm niên, thể thức hợp đồng cũ, báo giá tính theo thời gian. Cấu trúc này có <b>đúng một ô cho lao động: giờ nhân đơn giá</b>. Giá trị do yếu tố mới tạo ra không có ô nào để ghi.", 1),
 ], "<b>CHỖ CHÚNG TÔI KHÔNG KHẲNG ĐỊNH ĐƯỢC.</b> Đan Mạch có thị trường lao động linh hoạt, thương lượng lương phi tập trung — tức <b>kênh chia phần có tồn tại</b> — mà kết quả vẫn không thấy gì. Vậy ống thì có, dòng chảy thì không đủ. Vấn đề nằm ở <b>áp suất</b>, không nằm ở <b>ống</b>."),

 8: ("ba", [
    ("NGUYÊN CỚ — CÁI ĐƯỢC NÓI RA", "\"Kinh tế khó khăn, phải cắt giảm chi phí.\" Đây là lý do doanh nghiệp công bố, và là thứ dễ thu thập nhất.", 0),
    ("ĐIỀU KIỆN — CÓ THẬT, NHƯNG KHÔNG PHẢI NGUYÊN NHÂN", "Lãi suất cao, ngân sách co lại, dư cung lao động. Những thứ này làm sự việc dễ xảy ra hơn, nhưng tự chúng không gây ra nó.", 0),
    ("NGUYÊN NHÂN — CHƯA TÁCH ĐƯỢC", "Chưa tách được, vì <b>chưa đo được phần năng suất dôi ra</b>. Phép kiểm khả thi: đối chứng trong <b>cùng một doanh nghiệp, cùng một năm</b>, so nghề phơi nhiễm AI cao với nghề phơi nhiễm thấp — khi đó yếu tố kinh tế vĩ mô bị triệt tiêu.", 1),
 ], "<b>GIỚI HẠN CỦA PHÉP KIỂM — CHÚNG TÔI TỰ NÊU.</b> Hai giả thuyết \"chu kỳ kinh tế giảm đều\" và \"AI giảm lệch theo nghề\" <b>không phân biệt được</b> bằng phép kiểm này, vì suy thoái chưa bao giờ giảm đều theo nghề — và biên tuyển người mới vốn là biên nhạy với chu kỳ nhất."),

 9: ("ba", [
    ("BÊN A — LAO ĐỘNG SỐNG", "Bán thời gian, nhận thu nhập chắc chắn. Sự chắc chắn đó tồn tại được <b>chỉ vì</b> bên B đứng ra hấp thụ rủi ro.", 0),
    ("BÊN B — QUYỀN SỞ HỮU VỐN", "Gánh rủi ro, và vì gánh rủi ro nên có cơ sở đòi phần dôi ra. Hai bên nương tựa nhau chứ không đơn thuần đối kháng.", 0),
    ("BÊN THỨ BA — NGƯỜI TRẢ TIỀN CUỐI", "Bản trước của bài chỉ vẽ hai bên, và <b>đó là một lỗi</b>. Nếu khách ép giá thành công thì phần dôi <b>chưa từng vào tổ chức</b> — nó bị cạnh tranh giá đẩy thẳng sang bên mua.", 1),
 ], "<b>ĐIỂM NGHẼN CỦA CẢ BÀI.</b> Giả thuyết \"khách hàng lấy mất\" giải thích hiện tượng lương không đổi <b>không kém gì</b> giả thuyết của chúng tôi. Đó là một biến thứ ba chưa bị loại trừ, nên chúng tôi để nó ngay trên hình thay vì giấu đi."),

 12: ("ba", [
    ("CÁI CHUNG — ÁP ĐƯỢC CHO MỌI NGÀNH", "<b>Khoảng lệch giữa đơn vị tính ở hai đầu hợp đồng.</b> Đầu vào, tổ chức trả cho người làm theo tháng hoặc theo giờ. Đầu ra, tổ chức bán cho khách theo giờ, theo ngày công, theo gói hoặc theo sản phẩm.", 1),
    ("CÁI RIÊNG — MỖI NGÀNH MỘT DẤU", "Cùng một khoảng lệch nhưng mỗi ngành mang dấu khác nhau, nên kết luận của ngành này không bê thẳng sang ngành kia được.", 0),
    ("KHUNG KHÔNG ÁP ĐƯỢC KHI", "Một là AI bị cấm đưa dữ liệu ra ngoài — rào cản thể chế, không phải kỹ thuật. Hai là nghề bán \"rủi ro đã được gánh\" như kiểm toán, tuân thủ: thời gian ở đó đo sự cẩn trọng, chưa bao giờ nhận là đo sản lượng. Ba là hai đầu hợp đồng chỉ là một người.", 0),
 ], None),

 13: ("ba", [
    ("CÁI LƯỢNG CẦN ĐO", "<b>Kích thước phần năng suất dôi ra.</b> Chưa nguồn nào đo. Ba con số duy nhất đang có: khoảng 3% thời gian do người dùng <b>tự báo</b>; thu nhập <b>không thấy thay đổi</b>; và năng suất tổng hợp của nền kinh tế tăng <b>không quá 0,66% trong một thập kỷ</b>.", 1),
    ("BỐN ỨNG VIÊN — DỮ LIỆU CHƯA PHÂN BIỆT ĐƯỢC", "<b>H1</b> phần dôi vào bên mua sức lao động, vì hợp đồng mặc định giao phần chênh cho bên đó. <b>H2</b> phần dôi vốn còn nhỏ, chưa có gì đáng để tranh chấp. <b>H3</b> khách hàng lấy qua ép giá, nên nó chưa từng vào tổ chức. <b>H4</b> có độ trễ, chưa kịp lên sổ sách.", 0),
    ("HAI PHÉP ĐO PHÂN BIỆT ĐƯỢC — KHÔNG CẦN KHẢO SÁT", "Phân biệt H1 với H3: đo biên lợi nhuận gộp trước và sau khi dùng AI, cùng khách, cùng kỳ. Không tăng thì là H3; tăng mà lương không đổi thì là H1. Phân biệt H1 với H2: đo sức mặc cả <b>độc lập với lương</b> — số lời mời cạnh tranh, thời gian tuyển người thay thế, tỷ lệ nghỉ tự nguyện.", 0),
 ], None),

 14: ("hai", [
    ("BA CHẶNG", "<b>[1] Trả theo kết quả</b> — khoán, thợ tự sở hữu công cụ. <b>[2] Trả theo thời gian</b> — phủ định lần một, vì đầu ra không đo được. <b>[3] Trả theo đầu ra</b> — phủ định lần hai, <b>chưa xảy ra</b>. Chặng [3] sẽ giống [1] ở nguyên tắc nhưng khác hẳn ở <b>quyền sở hữu công cụ</b>: thợ có búa không giống người dùng có mô hình. Vì vậy là xoáy ốc, không phải vòng tròn.", 0),
    ("CƠ CHẾ CŨ CỦA CHÚNG TÔI ĐÃ SAI", "Bản trước nói \"khi đầu ra để lại vết thì phủ định lần hai xảy ra\". Nhưng nhật ký thao tác, quản lý phiên bản, phiếu công việc đã có <b>hàng chục năm</b>. Nếu vết đầu ra là ràng buộc thì phủ định lần hai đã xảy ra từ lâu. Nó không xảy ra, nên <b>vết không phải là ràng buộc</b>.", 1),
 ], "<b>HAI THƯỚC ĐO ĐANG SONG SONG TỒN TẠI</b> — lương tháng và khoán theo kết quả. Còn song song thì chưa phải phủ định, mới chỉ là cạnh tranh. <b>KẾ THỪA BẮT BUỘC:</b> chia rủi ro, sàn thu nhập, và tiền nuôi người học nghề."),

 # S15: sơ đồ đã nói đủ việc số 0, ba việc và hai ràng buộc — khối chữ ở
 # đây CHỈ thêm phần sơ đồ không có, là câu đề bài hỏi thẳng:
 # "đơn vị nào sẽ áp dụng?"
 15: ("hai", [
    ("ĐƠN VỊ NÀO ÁP DỤNG — ĐỀ BÀI HỎI THẲNG CÂU NÀY", "<b>Ban giám đốc</b> quyết có làm hay không. <b>Phòng nhân sự phụ trách lương thưởng</b> dựng thước đo và thang chia. <b>Quản lý dự án</b> chạy thí điểm trên một nhóm. <b>Công đoàn cơ sở</b> giám sát phần chia rủi ro.", 1),
    ("BẮT ĐẦU Ở ĐÂU CHO RẺ NHẤT", "Ở <b>hợp đồng trọn gói</b>. Vì đơn vị bán ra đã là sản phẩm chứ không phải giờ, nên nếu AI rút ngắn thời gian thì phần dôi lộ ra <b>trong nội bộ ngay kỳ đầu</b>, chưa kịp bị khách ép giá. Đó là chỗ phép đo ở việc số 0 rẻ nhất và sạch nhất.", 0),
 ], None),
}

# ─────────────────────────────────────────────────────────────
# 3. Bỏ viết tắt — áp cho toàn bộ file
# ─────────────────────────────────────────────────────────────
BO_VIET_TAT = [
    ("LLSX–QHSX", "Lực lượng sản xuất – Quan hệ sản xuất"),
    ("LLSX", "Lực lượng sản xuất"),
    ("QHSX", "Quan hệ sản xuất"),
    ("TFP", "năng suất tổng hợp"),
    ("man-day", "ngày công"),
    ("· slide 87–88", "· Giáo trình slide 87–88"),
    ("· slide 93–94", "· Giáo trình slide 93–94"),
    ("· slide 106–111", "· Giáo trình slide 106–111"),
    ("· slide 89–90", "· Giáo trình slide 89–90"),
    ("· slide 112–116", "· Giáo trình slide 112–116"),
    ("n = 1 mỗi ngành · tự thuật", "Mỗi ngành một ca, do người trong ngành tự thuật"),
    # "null" là tiếng nghề thống kê — trên slide viết bằng tiếng Việt.
    # Giữ đúng MỘT chỗ có giải nghĩa (ở khối chữ slide 3) làm mốc.
    ("lương null", "lương KHÔNG ĐỔI"),
    ("thu nhập: NULL", "thu nhập: KHÔNG ĐỔI"),
    ('thu nhập <tspan fill="#6E6E6E">null', 'thu nhập <tspan fill="#6E6E6E">không đổi'),
    ("null chính xác", "không đổi — đo chính xác"),
    ("mà vẫn null", "mà vẫn không đổi"),
    ("JD thêm", "Mô tả công việc thêm"),
    ("ITviec n=846", "ITviec, khảo sát 846 người"),
    ("P90/P50 sản lượng cá nhân", "sản lượng từng người theo phân vị"),
    ("① Phản biện", "Kiểm bằng key word ① Phản biện"),
    ("② Pháp lý", "Kiểm bằng key word ② Pháp lý"),
    ("③ Hệ thống", "Kiểm bằng key word ③ Hệ thống"),
    ("④ Thực tế", "Kiểm bằng key word ④ Thực tế"),
]


def khoi_giai(spec):
    cot, o, tukhai = spec
    h = [f'    <div class="giai {cot}">']
    for nhan, chu, nhan_manh in o:
        h.append(f'      <div class="o{" nhan" if nhan_manh else ""}"><h4>{nhan}</h4><p>{chu}</p></div>')
    h.append("    </div>")
    if tukhai:
        h.append(f'    <div class="tukhai">{tukhai}</div>')
    return "\n".join(h) + "\n  "


def ban_do():
    """S2 — bản đồ tám từ khoá, tên đã viết đủ chữ."""
    h = ['    <div class="bando v3">']
    for i, (so, ten, y, s) in enumerate(TU_KHOA):
        dam = " dam" if i == 0 else ""
        h.append(f'      <div class="tk{dam}"><div class="so">{so}</div>'
                 f'<div class="ten">{ten}</div><div class="y">{y}</div>'
                 f'<div class="s">{s}</div></div>')
    h.append("    </div>")
    return "\n".join(h)


def main():
    src = io.open(os.path.join(SLIDES, "index-v2.html"), encoding="utf-8").read()
    phan = re.split(r"(?=<section)", src)
    dau, sec = phan[0], phan[1:]
    ra = []

    for i, x in enumerate(sec, 1):
        # 1. đánh dấu là slide v3
        x = x.replace('class="slide v2"', 'class="slide v3"', 1)

        # 2. chip viết đủ chữ
        if i in CHIP:
            x = re.sub(r'<span class="chip">[^<]*</span>',
                       f'<span class="chip">{CHIP[i]}</span>', x, count=1)

        # 4. bản đồ từ khoá
        if i == 2:
            x = re.sub(r'<div class="bando">.*?</div>\n(?=\s*<div class="canhbao")',
                       ban_do() + "\n", x, count=1, flags=re.S)
            x = x.replace("Tám từ khoá — và slide nào gỡ cái nào",
                          "Tám từ khoá của cả bài — và slide nào gỡ cái nào")

        # Nhiều sơ đồ có dòng chữ cuối nằm sát đáy khung vẽ nên bị cụt chân
        # chữ (SVG cắt theo viewBox). Nới đáy 16 đơn vị cho mọi sơ đồ —
        # chỉ thêm khoảng trắng, không đụng gì tới nội dung bên trong.
        def noi_day(m):
            w, h = int(m.group(1)), int(m.group(2))
            return f'<svg width="{w}" height="{h + 16}" viewBox="0 0 {w} {h + 16}">'

        x = re.sub(r'<svg width="(\d+)" height="(\d+)" viewBox="0 0 \1 \2">',
                   noi_day, x)

        # Slide nào đã có khối chữ mới thì bỏ ô cảnh báo cũ của bản v2 —
        # nội dung đó nay nằm trong khối tự khai, giữ lại là vừa lặp vừa
        # đẩy chữ tràn xuống chân slide. (Không đụng ô cảnh báo của S2,
        # vì S2 không có khối chữ mới.)
        if i in GIAI:
            x = re.sub(r'\s*<div class="canhbao"[^>]*>.*?</div>\n', "\n",
                       x, count=1, flags=re.S)

        # 5. trả khối chữ về, chèn ngay trước chân slide
        if i in GIAI:
            moc = '  <div class="chan">'
            assert moc in x, f"S{i}: không thấy chân slide"
            x = x.replace(moc, khoi_giai(GIAI[i]) + moc, 1)

        ra.append(x)

    out = dau + "".join(ra)

    # 6. bỏ chữ nghiêng — giữ chữ, bỏ thẻ <em>
    out = re.sub(r"</?em>", "", out)

    # 7. bỏ viết tắt
    for cu, moi in BO_VIET_TAT:
        out = out.replace(cu, moi)

    out = out.replace("<title>", "<title>V3 · ")
    p = os.path.join(SLIDES, "index-v3.html")
    io.open(p, "w", encoding="utf-8", newline="\n").write(out)
    print(f"  → index-v3.html · {len(ra)} section · còn {out.count('<em>')} chữ nghiêng")
    return p



# ─────────────────────────────────────────────────────────────
# 4. Xuất PDF + PNG + ghi chú  (dùng lại đúng đường của bản V2)
# ─────────────────────────────────────────────────────────────
W, H, N, SCALE = 1280, 720, 21, 2
PNG = os.path.join(HERE, "png-v3")
SRC = "file:///" + os.path.join(SLIDES, "index-v3.html").replace("\\", "/")


def pdf():
    out = os.path.join(HERE, "viec-lam-tri-thuc-v3.pdf")
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
                    "--run-all-compositor-stages-before-draw",
                    "--virtual-time-budget=15000",
                    "--print-to-pdf=" + out, SRC], capture_output=True, timeout=240)
    print(f"  → viec-lam-tri-thuc-v3.pdf  {os.path.getsize(out):,} byte")


def render():
    os.makedirs(PNG, exist_ok=True)
    full = os.path.join(PNG, "_full.png")
    subprocess.run([CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
                    f"--force-device-scale-factor={SCALE}",
                    f"--window-size={W},{H*N}", "--screenshot=" + full,
                    "--virtual-time-budget=20000", SRC], capture_output=True, timeout=300)
    from PIL import Image
    im = Image.open(full)
    sw, sh = W * SCALE, H * SCALE
    for i in range(N):
        im.crop((0, i * sh, sw, (i + 1) * sh)).save(
            os.path.join(PNG, f"slide{i+1:02d}.png"), optimize=True)
    os.remove(full)
    print(f"  → {N} PNG {sw}×{sh}")


def notes():
    """Ghi chú giống V2 — thứ tự slide không đổi, chỉ chữ trên slide đổi."""
    goc = os.path.join(HERE, "png-v2", "notes.txt")
    chu = io.open(goc, encoding="utf-8").read()
    io.open(os.path.join(PNG, "notes.txt"), "w",
            encoding="utf-8", newline=chr(10)).write(chu)
    print("  → notes.txt · chép từ png-v2 (thứ tự slide y hệt)")


if __name__ == "__main__":
    main()
    print("V3 — xuất PDF…");  pdf()
    print("V3 — render PNG…"); render()
    print("V3 — ghi chú…");    notes()
