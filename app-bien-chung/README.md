# ⚖️ Bàn biện chứng — app xét duyệt có giám sát

App tĩnh một file, **mở bằng cách double-click `index.html`**. Không cần Node.js, không cần server, không cần mạng.

> Máy này không có Node.js nên app cũ ở `../app/` (Node server, cổng 5173) không chạy được. App này cố ý làm theo hướng khác: **HTML tĩnh + `data.js` nhúng sẵn**, rebuild bằng **Python**.

---

## Nó làm gì

Biến **11 điểm neo của phép biện chứng duy vật** thành một quy trình xét duyệt có giám sát, chạy được trên một vấn đề thật:

1. **Nhập vấn đề** — mô tả bằng *hiện tượng trần*, không đưa sẵn kết luận.
2. **Sơ đồ đường đi** — 15 lăng kính xếp theo 6 pha: `0 đặt vấn đề → 1 hai nguyên lý → 2 sáu phạm trù → 3 ba quy luật → 4 kiểm nghiệm → 5 phản biện`.
3. **Bấm một node** → xem system prompt của lăng kính đó, bấm **Copy prompt + vấn đề**, dán vào Claude/ChatGPT.
4. **Dán kết quả trả về**, chấm độ tin cậy **🟢 / 🟡 / 🔴**, ghi chú chỗ mình không đồng ý.
5. Node **đổi màu viền theo trạng thái** → nhìn sơ đồ là biết đã soi tới đâu, chỗ nào còn 🔴.
6. **Xuất báo cáo `.md`** để dán vào note hoặc nộp bài.

Mọi thứ lưu trong `localStorage` của trình duyệt — không gửi đi đâu, không có API key, không có dữ liệu nào rời khỏi máy.

---

## 15 node

| Pha | Node | Món |
|---|---|---|
| 0 | `tbc-dat-van-de` | Đặt vấn đề · tìm điểm nghẽn |
| 1 | `tbc-toan-dien` · `tbc-phat-trien` | **2 nguyên lý** |
| 2 | `tbc-hien-tuong` · `tbc-chung-rieng` · `tbc-tat-nhien` · `tbc-noi-dung-hinh-thuc` · `tbc-nhan-qua` · `tbc-kha-nang` | **6 cặp phạm trù** |
| 2 | `tbc-xa-hoi` | bổ trợ — xã hội, lịch sử, lợi ích |
| 3 | `tbc-mau-thuan` ⭐ · `tbc-luong-chat` · `tbc-phu-dinh` | **3 quy luật** |
| 4 | `tbc-thuc-tien` | trọng tài — chấm 🟢🟡🔴 |
| 5 | `tbc-phan-bien` | đối thủ — chỉ tìm chỗ sai |

**Quy tắc dùng:** pha 0, 1, 3 luôn chạy; **pha 2 chỉ chọn 2–4 cái** hợp câu hỏi. Chạy hết 15 node cho mọi việc là hình thức chủ nghĩa — vi phạm đúng cái *tính cụ thể* mà phép biện chứng đòi hỏi.

---

## Dữ liệu lấy từ đâu

`data.js` **tự sinh**, không sửa tay:

```
.claude/agents/tbc-*.md   ──┐
                            ├──►  build.py  ──►  data.js  ──►  index.html
vaults/triet/*.md         ──┘
```

- **System prompt** của mỗi node = nguyên văn body file agent tương ứng → app và Claude Code **dùng chung một prompt**, không bao giờ lệch.
- **Tiêu đề + tóm tắt 1 câu** của note lấy từ vault `triet`; mỗi node có link mở thẳng file `.md`.

Sửa một agent hoặc một note xong thì chạy lại:

```bash
cd app-bien-chung
python build.py
```

Kết quả: `OK -> app-bien-chung\data.js (15 node, ~109 KB)`. Script sẽ báo nếu thiếu agent hoặc thiếu note.

---

## ⚠️ Giới hạn phải nhớ

- App **không gọi AI**. Nó sinh prompt để mình tự dán — có chủ ý: không có API key nằm trong file tĩnh, và **người dán là người chịu trách nhiệm**.
- Bốn bộ lọc (**Phản biện · Pháp lý · Hệ thống · Thực tế**) là **checklist nhắc việc**, không phải bộ kiểm tự động. Xem `../vaults/triet/bon-bo-loc-kiem-ket-qua-ai.md`.
- Phần pháp lý trong app chỉ nêu **nhóm vấn đề cần kiểm**, không phải tư vấn pháp lý. Số hiệu văn bản do AI đưa ra luôn phải đối chiếu bản hiện hành; quyết định pháp lý cần người có thẩm quyền chuyên môn duyệt.
- `localStorage` gắn với **một trình duyệt trên một máy**. Đổi máy, đổi trình duyệt hoặc xoá dữ liệu site là mất phiên → muốn giữ thì **Xuất báo cáo .md**.

---

## Liên quan

- Trang neo 11 món: `../vaults/triet/diem-neo-11-noi-dung.md`
- Bốn bộ lọc AI: `../vaults/triet/bon-bo-loc-kiem-ket-qua-ai.md`
- Skill chạy tự động trong Claude Code: `../.claude/skills/truy-ban-chat/SKILL.md` — cùng bộ agent, nhưng chạy song song và tự đối chất thay vì copy tay.
