---
slug: ivp-enhancement-suite
title: IVP — Bài thực hành & Image Enhancement Suite
type: project
domain: ivp
status: paused
period: 2026-03 → 2026-05
stack: [python, opencv, numpy, jupyter]
repo_path: "D:\\MSA-FPT\\Image and video processing"
repo_url: "https://github.com/haihpse150218/img_video_processing"
repo_visibility: public
artifacts: [HPH_25MS23323, image-enhancement-suite]
tags: [ivp, thuc-hanh, thu-vien]
related: [image-super-resolution]
created: 2026-08-09
---

# 📦 IVP — Bài thực hành & Image Enhancement Suite

> 9 notebook thực hành theo buổi + một thư viện tăng cường ảnh (đã dừng, chuyển hướng sang siêu phân giải).

**Môn:** Image & Video Processing · **Thời gian:** 2026-03 → 2026-05
**Thư mục gốc:** `D:\MSA-FPT\Image and video processing`
**Repo GitHub:** [img_video_processing](https://github.com/haihpse150218/img_video_processing) — public
**Quay lại:** [[INDEX|📦 Tất cả project]]

---

## 🎯 Nội dung

**a) Bài thực hành theo buổi** — `HPH_25MS23323\session1.ipynb` … `session9.ipynb`, mỗi notebook kèm một bản `.py` xuất ra. Ảnh đầu vào/kết quả nằm ở `session3/` … `session9/`.

**b) `image-enhancement-suite`** — thư viện Python có cấu trúc module (`classical/` · `modern/` · `dl/` · `eval/` · `routing/`), thiết kế để tự chọn thuật toán tăng cường phù hợp theo loại suy giảm. **Đã dừng**, thay bằng [[image-super-resolution]] (phạm vi hẹp hơn, đo được rõ hơn).

## 💡 Bài học

- **Thu hẹp phạm vi là quyết định đúng.** `image-enhancement-suite` ôm quá rộng (mọi loại tăng cường + tự động định tuyến) nên không bao giờ có tiêu chí "xong". `image-super-resolution` chỉ làm x4 SR, có benchmark chuẩn, có chỉ số → hoàn thành được.
- Ảnh ở `session*/` **không được note nào tham chiếu** — đây chính là dạng tài sản chết mà `projects/` sinh ra để chống lại: có thẻ chỉ đường thì mới tìm lại được.

## 🔗 Khái niệm đã dùng

- `ivp/loc-lam-min` · `ivp/phat-hien-bien` · `ivp/histogram-anh` *(chưa viết — xem [[../vaults/ivp/SECOND_BRAIN_IVP|hub IVP]])*
- [[image-super-resolution]] — project kế nhiệm

## 📁 Sản phẩm

| Loại | Đường dẫn |
|---|---|
| Notebook thực hành | `…\Image and video processing\HPH_25MS23323` (session1–9) |
| Ảnh bài tập | `…\session3` … `…\session9`, `…\exam-final` |
| Thư viện (dừng) | `…\image-enhancement-suite` |
| Bài giảng | `…\Lecture 0-12 *.pdf` + `…\_txt` (bản text grep được) |
| Ghi chú thô | đã đưa vào `vaults\ivp\_inbox` |
