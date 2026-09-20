#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sinh data.js cho app Bàn biện chứng.

Đọc:
  .claude/agents/tbc-*.md   -> system prompt của từng node
  vaults/triet/*.md         -> tiêu đề + tóm tắt 1 câu của note tương ứng

Ghi:
  app-bien-chung/data.js    -> window.TBC = {...}

Chạy:  python build.py        (từ thư mục app-bien-chung)
Máy này không có Node.js nên toàn bộ khâu build dùng Python 3.
"""

import io
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AGENTS = os.path.join(ROOT, ".claude", "agents")
NOTES = os.path.join(ROOT, "vaults", "triet")
OUT = os.path.join(ROOT, "app-bien-chung", "data.js")

# ---------------------------------------------------------------- định nghĩa node
# phase: 0 đặt vấn đề · 1 hai nguyên lý · 2 sáu phạm trù · 3 ba quy luật
#        4 kiểm nghiệm · 5 phản biện · 2.5 bổ trợ
# filters: bộ lọc AI mà node này neo vào (1 phản biện · 2 pháp lý · 3 hệ thống · 4 thực tế)
NODES = [
    dict(id="tbc-dat-van-de", num="0", phase=0, group="meta",
         label="Đặt vấn đề", sub="Điểm nghẽn",
         question="Câu hỏi đã đúng chưa? Nó có cài sẵn câu trả lời không?",
         core="Đặt sai vấn đề thì mọi phân tích phía sau đều vô ích. Tách quan sát / suy luận / kết luận, bới tiền đề ngầm, chạy phép thử đảo chiều, chốt toạ độ, tìm điểm nghẽn.",
         slide="7, 121, 127, 139", note=None, filters=[1]),

    dict(id="tbc-toan-dien", num="①", phase=1, group="nguyen-ly",
         label="Mối liên hệ phổ biến", sub="Nguyên lý 1 — toàn diện",
         question="Nó dính với cái gì? Mối dính nào quyết định?",
         core="Mối liên hệ = liên kết TẠO RA HỆ QUẢ. Toàn diện = nhìn đủ + xếp hạng tất yếu/thứ yếu + theo bối cảnh. Thiếu xếp hạng là bệnh dàn đều.",
         slide="79–82", note="nguyen-ly-moi-lien-he-pho-bien", filters=[3]),

    dict(id="tbc-phat-trien", num="②", phase=1, group="nguyen-ly",
         label="Sự phát triển", sub="Nguyên lý 2 — phát triển",
         question="Nó đang đi về đâu? Đổi chất hay chỉ to hơn?",
         core="Phát triển = ĐỔI CHẤT, khác tăng trưởng. Động lực nằm bên trong. Đường đi quanh co, có lùi tạm thời. Kế thừa có chọn lọc.",
         slide="83–85", note="nguyen-ly-ve-su-phat-trien", filters=[4]),

    dict(id="tbc-hien-tuong", num="③", phase=2, group="pham-tru",
         label="Bản chất – Hiện tượng", sub="Phạm trù 1",
         question="Cái thấy được có phải cái thật?",
         core="Bản chất: bên trong, ổn định, quyết định. Hiện tượng: bên ngoài, dễ đổi. Cả hai đều khách quan. Muốn cải tạo phải cải tạo từ bản chất.",
         slide="87–88", note="ban-chat-va-hien-tuong", filters=[3, 1]),

    dict(id="tbc-chung-rieng", num="④", phase=2, group="pham-tru",
         label="Chung – Riêng – Đơn nhất", sub="Phạm trù 2",
         question="Kết luận này áp được sang chỗ khác không?",
         core="Cái chung dẫn đường nhưng chỉ tồn tại TRONG cái riêng. Vận dụng phải cụ thể hoá. Chống giáo điều lẫn cục bộ. Chung ↔ đơn nhất chuyển hoá được.",
         slide="89–90", note="cai-rieng-cai-chung-cai-don-nhat", filters=[2, 4]),

    dict(id="tbc-tat-nhien", num="⑤", phase=2, group="pham-tru",
         label="Tất nhiên – Ngẫu nhiên", sub="Phạm trù 3",
         question="Đây là quy luật hay chỉ trùng hợp?",
         core="Tất nhiên: điều kiện như nhau → kết quả như nhau, do nguyên nhân bên trong. Ngẫu nhiên: nguyên nhân hỗn hợp, hoặc chưa biết quy luật.",
         slide="91–92", note="tat-nhien-va-ngau-nhien", filters=[1]),

    dict(id="tbc-noi-dung-hinh-thuc", num="⑥", phase=2, group="pham-tru",
         label="Nội dung – Hình thức", sub="Phạm trù 4",
         question="Vấn đề nằm ở ruột hay ở khung?",
         core="Nội dung = thuộc tính (các yếu tố). Hình thức = CẤU TRÚC, phương thức tồn tại. Không tuỳ tiện đổi cấu trúc khi nội dung đang chạy tốt.",
         slide="93–94", note="noi-dung-va-hinh-thuc", filters=[2]),

    dict(id="tbc-nhan-qua", num="⑦", phase=2, group="pham-tru",
         label="Nguyên nhân – Kết quả", sub="Phạm trù 5",
         question="Nguyên nhân thật nằm ở đâu?",
         core="Tách nguyên nhân · điều kiện · nguyên cớ. Xảy ra trước không có nghĩa là gây ra — gà không gáy thì trời vẫn sáng.",
         slide="95–96", note="nguyen-nhan-va-ket-qua", filters=[1]),

    dict(id="tbc-kha-nang", num="⑧", phase=2, group="pham-tru",
         label="Khả năng – Hiện thực", sub="Phạm trù 6",
         question="Cái này đang có thật, hay mới là có thể?",
         core="Hiện thực = đang có. Khả năng = chưa có nhưng theo quy luật sẽ có. Dựa hiện thực để hành động; đếm cả khả năng XẤU.",
         slide="97–98", note="hien-thuc-va-kha-nang", filters=[4, 2]),

    dict(id="tbc-xa-hoi", num="＋", phase=2.5, group="bo-tro",
         label="Xã hội – Lịch sử", sub="Bổ trợ",
         question="Ai được lợi, ai chịu thiệt, và vì sao người ta nghĩ vậy?",
         core="Soi bằng LLSX–QHSX, cơ sở hạ tầng – kiến trúc thượng tầng, tồn tại xã hội – ý thức xã hội, lợi ích giai cấp.",
         slide="144–204", note=None, filters=[2, 4]),

    dict(id="tbc-mau-thuan", num="⑨", phase=3, group="quy-luat",
         label="Mâu thuẫn", sub="Quy luật 1 — NGUỒN GỐC ⭐",
         question="VÌ SAO nó vận động?",
         core="Hai mặt đối lập vừa nương tựa vừa loại trừ. Động lực nằm BÊN TRONG. Đối chọi là bản chất, thống nhất là hiện tượng. Được điều phối, KHÔNG được điều hoà.",
         slide="106–111", note="quy-luat-mau-thuan", filters=[1]),

    dict(id="tbc-luong-chat", num="⑩", phase=3, group="quy-luat",
         label="Lượng – Chất", sub="Quy luật 2 — CÁCH THỨC",
         question="KHI NÀO nó lật?",
         core="Độ → điểm nút → bước nhảy. Trong Độ thì chất vẫn là chất cũ. Chất mới áp đặt tiêu chuẩn lượng mới. Chống nóng vội lẫn bảo thủ.",
         slide="102–105", note="quy-luat-luong-chat", filters=[4]),

    dict(id="tbc-phu-dinh", num="⑪", phase=3, group="quy-luat",
         label="Phủ định của phủ định", sub="Quy luật 3 — KHUYNH HƯỚNG",
         question="Rồi nó đi về đâu?",
         core="Phủ định có KẾ THỪA → đường xoáy ốc, không phải vòng tròn. Chất mới thích nghi tốt hơn. Tránh phủ định sạch trơn.",
         slide="112–116", note="quy-luat-phu-dinh-cua-phu-dinh", filters=[1, 4]),

    dict(id="tbc-thuc-tien", num="✓", phase=4, group="meta",
         label="Kiểm nghiệm thực tiễn", sub="Trọng tài — chấm 🟢🟡🔴",
         question="Lấy gì chứng minh? Kiểm bằng cách nào?",
         core="Thực tiễn là tiêu chuẩn của chân lý. Chỉ ra cách kiểm CỤ THỂ bằng ba hình thức thực tiễn rồi chấm độ tin cậy xanh/vàng/đỏ.",
         slide="129–131", note="vai-tro-cua-thuc-tien", filters=[4, 2]),

    dict(id="tbc-phan-bien", num="✗", phase=5, group="meta",
         label="Phản biện", sub="Đối thủ — chỉ tìm chỗ sai",
         question="Kết luận vừa dựng sai ở đâu?",
         core="Săn giáo điều, kinh nghiệm chủ nghĩa, tư duy siêu hình, khung bất khả bác bỏ, nguỵ biện nhân quả. Không khen, không cân bằng.",
         slide="139–140", note="chan-ly", filters=[1]),
]

PHASES = [
    dict(id=0, title="PHA 0 · ĐẶT VẤN ĐỀ", note="Chạy một mình, trước tất cả. Đòn bẩy cao nhất."),
    dict(id=1, title="PHA 1 · HAI NGUYÊN LÝ", note="Luôn chạy cả hai."),
    dict(id=2, title="PHA 2 · SÁU CẶP PHẠM TRÙ", note="Chọn 2–4 cái hợp câu hỏi — không chạy hết."),
    dict(id=3, title="PHA 3 · BA QUY LUẬT", note="Chạy đúng thứ tự: vì sao → khi nào → về đâu."),
    dict(id=4, title="PHA 4 · KIỂM NGHIỆM", note="Không có pha này thì mọi kết luận chỉ là suy luận hợp lý."),
    dict(id=5, title="PHA 5 · PHẢN BIỆN", note="Đập lại kết luận vừa dựng."),
]

FILTERS = [
    dict(id=1, name="Phản biện", desc="Giả định kết quả SAI rồi đi tìm bằng chứng. Đòi nguồn, mở nguồn ra đọc. Kết quả AI là chánh đề — phải dựng phản đề."),
    dict(id=2, name="Pháp lý", desc="Áp vào Việt Nam có vướng gì? Dữ liệu cá nhân, lao động, sở hữu trí tuệ, hình thức văn bản bắt buộc. Số hiệu văn bản AI đưa ra luôn coi là CHƯA CHẮC, phải mở bản hiện hành. Quyết định pháp lý cần người có thẩm quyền duyệt."),
    dict(id=3, name="Hệ thống", desc="Hỏi lại bằng cách khác, giải lại bằng phương pháp khác, kiểm mâu thuẫn nội bộ, kiểm biên. AI là hộp đen nên chỉ kiểm được ở đầu ra."),
    dict(id=4, name="Thực tế", desc="Dữ liệu tới thời điểm nào? Quy mô có khớp? Nguồn lực có tới? Thời điểm đã chín? Ai làm, đo bằng gì?"),
]


def read_text(path):
    with io.open(path, encoding="utf-8") as f:
        return f.read()


def split_frontmatter(raw):
    """Trả về (dict frontmatter phẳng, body). Không ném lỗi — hỏng thì trả {}."""
    if not raw.startswith("---"):
        return {}, raw
    end = raw.find("\n---", 3)
    if end == -1:
        return {}, raw
    head = raw[3:end]
    body = raw[end + 4:].lstrip("\n")
    meta = {}
    for line in head.splitlines():
        m = re.match(r"^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$", line)
        if m:
            key, val = m.group(1), m.group(2).strip()
            if val.startswith('"') and val.endswith('"') and len(val) > 1:
                val = val[1:-1]
            meta[key] = val
    return meta, body


def note_info(slug):
    """Lấy title + tóm tắt 1 câu của note trong vault triet."""
    if not slug:
        return None
    path = os.path.join(NOTES, slug + ".md")
    if not os.path.isfile(path):
        return dict(slug=slug, title=slug, summary="", missing=True)
    meta, body = split_frontmatter(read_text(path))
    summary = ""
    m = re.search(r"^>\s*Tóm tắt 1 câu:\s*(.+)$", body, re.M)
    if m:
        summary = re.sub(r"\*\*(.+?)\*\*", r"\1", m.group(1)).strip()
    return dict(slug=slug, title=meta.get("title", slug), summary=summary,
                status=meta.get("status", ""), missing=False)


def agent_prompt(agent_id):
    path = os.path.join(AGENTS, agent_id + ".md")
    if not os.path.isfile(path):
        return dict(missing=True, description="", prompt="")
    meta, body = split_frontmatter(read_text(path))
    return dict(missing=False, description=meta.get("description", ""),
                model=meta.get("model", ""), prompt=body.strip())


def main():
    out_nodes = []
    missing = []
    for n in NODES:
        ag = agent_prompt(n["id"])
        if ag["missing"]:
            missing.append(n["id"])
        item = dict(n)
        item["agentDescription"] = ag["description"]
        item["systemPrompt"] = ag["prompt"]
        item["agentMissing"] = ag["missing"]
        item["noteInfo"] = note_info(n.get("note"))
        out_nodes.append(item)

    data = dict(
        generated=True,
        source="`.claude/agents/tbc-*.md` + `vaults/triet/*.md`",
        phases=PHASES,
        filters=FILTERS,
        nodes=out_nodes,
    )

    payload = "// TỰ SINH bằng build.py — đừng sửa tay, sửa agent/note rồi chạy lại.\n"
    payload += "window.TBC = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
    with io.open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write(payload)

    size_kb = os.path.getsize(OUT) / 1024.0
    print("OK  ->  %s  (%d node, %.1f KB)" % (os.path.relpath(OUT, ROOT), len(out_nodes), size_kb))
    if missing:
        print("THIEU agent: " + ", ".join(missing))
    no_note = [n["id"] for n in out_nodes if n["noteInfo"] and n["noteInfo"].get("missing")]
    if no_note:
        print("THIEU note : " + ", ".join(no_note))


if __name__ == "__main__":
    sys.exit(main())
