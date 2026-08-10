---
slug: pm-nhom4-tai-cau-truc
title: PM Nhóm 4 — Tái cấu trúc dự án phần mềm (case study)
type: project
domain: pm
status: done
period: 2026-06 → 2026-07
stack: [5-whys, root-cause-analysis, marp]
repo_path: "D:\\MSA-FPT\\Project Manager\\final"
repo_url: null
artifacts: [Nhom4-Bao-cao-tai-cau-truc-du-an.md, Nhom4-Slides.md, Nhom4-Top15-Van-de-Giai-phap.csv]
tags: [project-manager, case-study, root-cause, bai-tap-nhom]
related: []
created: 2026-08-09
---

# 📦 PM Nhóm 4 — Tái cấu trúc dự án phần mềm (case study)

> Phân tích một dự án phần mềm hướng AI đang trục trặc, truy **nguyên nhân gốc** bằng 5 Whys, rồi đề xuất phương án tái cấu trúc.

**Môn:** Quản lý dự án phần mềm nâng cao · **Loại:** Bài tập nhóm cuối kỳ · **Thời gian:** 2026-06 → 2026-07
**Thư mục gốc:** `D:\MSA-FPT\Project Manager\final`
**Repo GitHub:** — chưa có. Bài nộp dạng tài liệu (case study), không có mã nguồn.
**Quay lại:** [[INDEX|📦 Tất cả project]]

---

## 🎯 Vấn đề

Từ đề bài case study (`Case Study - Quan ly du an phan mem nang cao dinh huong AI.pdf`): dự án chậm tiến độ, chất lượng kém, đội mất tinh thần. Yêu cầu: **tìm nguyên nhân gốc, không dừng ở triệu chứng.**

## 🛠️ Cách làm

- Liệt kê triệu chứng → gom thành **bảng mã nguyên nhân gốc** (`RCn | mô tả | nhóm`)
- Mỗi nguyên nhân truy bằng **bảng 5 Whys**: Hiện tượng → Why 1–5 → Root Cause → Tác động
- Xuất ra 3 file CSV: toàn bộ vấn đề · vấn đề–giải pháp · **Top 15 ưu tiên**
- Báo cáo 16 chương có mục lục neo trong file; slide làm bằng **Marp** (Markdown → PPTX)

## 📊 Kết quả

| Sản phẩm | Nội dung |
|---|---|
| Báo cáo | 16 chương, mỗi nguyên nhân gốc có bảng 5 Whys riêng |
| Top 15 | Bảng vấn đề–giải pháp xếp theo mức ưu tiên |
| Slide | Marp deck 16:9, xuất `.pptx` |

## 💡 Bài học

- **5 Whys là công cụ chống "sửa triệu chứng".** Ép đi đủ 5 tầng thì gần như luôn chạm tới nguyên nhân *quy trình* hoặc *tổ chức*, chứ hiếm khi là nguyên nhân kỹ thuật.
- **Marp:** viết slide bằng Markdown, `---` ngăn slide, YAML frontmatter cấu hình theme/CSS. Nội dung diff được bằng git, không kẹt trong file nhị phân PowerPoint. Đây là **định dạng frontmatter DUY NHẤT tồn tại trong kho trước khi dựng Second Brain** — xem `CONVENTIONS.md`.
- Xuất bảng ra CSV bên cạnh báo cáo Markdown giúp lọc/sắp xếp lại mà không phải sửa văn bản.

## 🔗 Khái niệm đã dùng

- Chưa có note lý thuyết PM trong kho — nếu sau này viết, đặt ở vault mới `pm` (phân tích nguyên nhân gốc, quản lý rủi ro, agile ceremony).
- Liên quan gần nhất: [[coursera-agile]] (cùng chủ đề quy trình).

## 📁 Sản phẩm

| Loại | Đường dẫn |
|---|---|
| Báo cáo | `…\Project Manager\final\Nhom4-Bao-cao-tai-cau-truc-du-an.md` |
| Phân tích vấn đề | `…\final\Nhom4-Phan-tich-van-de.md` |
| Slide (Marp) | `…\final\Nhom4-Slides.md` → `…\slide\TH1-Slides.pptx` |
| Bảng CSV | `…\final\Nhom4-Top15-Van-de-Giai-phap.csv` |
| Đề bài | `…\final\Case Study - Quan ly du an phan mem nang cao dinh huong AI.pdf` |
| Ghi chú thô | `…\Project Manager\Note.md` → `Note-mindmap.md` (mermaid mindmap + glossary) |
