---
slug: sem-hoi-thao
title: SEM501 — Bài thu hoạch hội thảo
type: project
domain: sem
status: done
period: 2026-04 → 2026-06
stack: [markdown, python-pdf]
repo_path: "D:\\MSA-FPT\\Report-Hội-Thảo"
artifacts: [output/SEM501_BaiThuHoach02_BuildWithAI2026.md, output/SEM501_BaiThuHoach03_QuantumComputing.md]
tags: [seminar, bao-cao, pipeline]
related: []
created: 2026-08-09
---

# 📦 SEM501 — Bài thu hoạch hội thảo

> Dự khán hội thảo → ghi chép thô → viết bài thu hoạch theo mẫu → xuất PDF/DOCX nộp.

**Môn:** SEM501 · **Loại:** Bài thu hoạch · **Thời gian:** 2026-04 → 2026-06
**Thư mục gốc:** `D:\MSA-FPT\Report-Hội-Thảo`
**Quay lại:** [[INDEX|📦 Tất cả project]]

---

## 🎯 Vấn đề

Mỗi hội thảo phải nộp một bài thu hoạch có ràng buộc số từ (Câu 1: 300–400 từ, Câu 2: ≥700 từ). Việc lặp lại nhiều lần → cần **quy trình**, không phải viết lại từ đầu mỗi lần.

## 🛠️ Cách làm — pipeline `record/` → `output/`

Đây là **mẫu input→output sạch nhất trong cả kho**, và nó tự mô tả chính nó trong `idea.md`:

```
record/          ← ghi chép thô, 1 file / 1 hội thảo (mẫu cố định)
   Meeting-notes-1.md · hoi-thao-1..3.md
       ↓ viết theo mẫu bài thu hoạch
output/          ← sản phẩm nộp
   SEM501_BaiThuHoach0N_<ChuDe>.md  →  _build_pdf.py  →  .pdf / .docx
```

**Mẫu ghi chép** (`record/`): Tên hội thảo · Ngày giờ · Đơn vị tổ chức · Diễn giả → `## Nội dung chính` → `## Ghi chú cá nhân` (điểm ấn tượng · liên quan CNTT/chuyển đổi số · ý tưởng thực tế).

**Mẫu bài nộp** (`output/`): `## Câu 1: Mô tả nội dung` → `## Câu 2: Liên hệ thực tế` (2.1 liên hệ ngành · 2.2 kết luận · 2.3 giải pháp tương lai).

## 📊 Kết quả

| Bài | Chủ đề |
|---|---|
| BaiThuHoach02 | Build With AI 2026 |
| BaiThuHoach03 | AI cho SME & Chuyển đổi số |
| BaiThuHoach03 | Quantum Computing |

## 💡 Bài học

- **Tách nơi ghi (`record/`) khỏi nơi nộp (`output/`).** Ghi chép thô được tự do lộn xộn; sản phẩm được ràng buộc theo mẫu. Trộn hai thứ vào một file là làm hỏng cả hai.
- **Kế hoạch kiêm luôn kho mẫu.** `idea.md` chứa checklist việc + mẫu note + mẫu bài nộp nhúng thẳng trong khối ```` ```markdown ```` — mở một file là biết phải làm gì và làm theo khuôn nào.
- Mẫu này chính là mô hình cho `_inbox/` → note nguyên tử của Second Brain (xem [[../hub/nguon-chua-xu-ly]]).

## 🔗 Khái niệm đã dùng

- Không có note lý thuyết — đây là project **quy trình**, giá trị nằm ở pipeline chứ không ở nội dung kỹ thuật.

## 📁 Sản phẩm

| Loại | Đường dẫn |
|---|---|
| Kế hoạch + mẫu | `D:\MSA-FPT\Report-Hội-Thảo\idea.md` |
| Ghi chép thô | `…\Report-Hội-Thảo\record` |
| Bài nộp | `…\Report-Hội-Thảo\output` |
| Script xuất PDF | `…\output\_build_pdf.py` |
