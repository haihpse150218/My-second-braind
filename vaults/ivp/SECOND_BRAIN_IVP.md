# 🧠 Second Brain — Image & Video Processing

> Trang trung tâm (Map of Content) cho môn Xử lý ảnh và video.
> ⚠️ **Vault này mới dựng khung** — chưa có atomic note nào. Nguyên liệu đang nằm trong `_inbox/`.

**Cập nhật lần cuối:** 2026-08-09
**Trạng thái:** 🌱 Mới dựng khung — 0 atomic note / 4 note thô chờ chưng cất
**Nguồn:** `D:\MSA-FPT\Image and video processing` — Lecture 0→12 (PDF + bản `.txt`), 9 notebook thực hành
**Quay lại:** [[../../hub/MASTER|🏠 MASTER]]

> 🎯 **Kim chỉ nam:** ảnh chỉ là **ma trận số**. Mọi phép xử lý cổ điển đều là: đổi từng điểm (miền không gian), hoặc đổi từng tần số (miền tần số). Nắm được hai hướng đó thì phần còn lại chỉ là biến thể.

---

## 🧭 Lộ trình đọc (dự kiến)

> Danh sách dưới đây là **kế hoạch**, chưa có note thật.
> Chưng cất xong khái niệm nào thì tạo `<slug>.md` ở gốc vault rồi đổi `` `slug` `` → `[[slug]]`.

**Nhánh A · Điểm ảnh & biểu diễn ảnh**
1. `diem-anh-kenh-mau` — pixel, độ sâu bit, RGB / grayscale / HSV
2. `histogram-anh` — phân bố mức xám: công cụ chẩn đoán rẻ nhất
3. `can-bang-histogram` — histogram equalization: kéo giãn tương phản
4. `nhieu-anh` — Gaussian · muối tiêu · Poisson: biết loại nhiễu mới chọn đúng bộ lọc

**Nhánh B · Xử lý miền không gian**
1. `bien-doi-muc-xam` — âm bản, log, gamma: ánh xạ từng điểm
2. `tich-chap-2d` — kernel trượt trên ảnh
   → 🌉 cùng phép toán với `dsp/tich-chap` (1D) và [[dl/vi-sao-can-cnn]] (học ra kernel)
3. `loc-lam-min` — trung bình · Gaussian · **trung vị** (khử muối tiêu tốt nhất)
4. `phat-hien-bien` — Sobel · Prewitt · Laplacian · **Canny**
5. `lam-sac-net` — unsharp masking, high-boost

**Nhánh C · Xử lý miền tần số**
1. `fourier-2d` — DFT hai chiều: ảnh trong miền tần số trông thế nào
   → 🌉 nền tảng ở `dsp/bien-doi-fourier`
2. `loc-tan-so` — thông thấp (mờ) vs thông cao (sắc nét)
3. `dinh-ly-tich-chap` — tích chập trong không gian = nhân trong tần số (vì sao FFT nhanh hơn)

**Nhánh D · Phân đoạn & hình thái học**
1. `nguong-hoa` — thresholding, **Otsu** tự chọn ngưỡng
2. `hinh-thai-hoc` — giãn · co · mở · đóng
3. `phan-doan-vung` — region growing, watershed
   → 🌉 so với hướng học sâu: [[dl/mask-rcnn]]

**Nhánh E · Nén ảnh**
1. `du-thua-anh` — dư thừa mã hoá / không gian / thị giác
2. `dct-jpeg` — DCT + lượng tử hoá + mã hoá entropy
3. `nen-mat-mat-vs-khong` — đánh đổi tỉ lệ nén ↔ chất lượng (PSNR / SSIM)

**Nhánh F · Video & chuyển động**
1. `video-la-gi` — chuỗi khung hình + dư thừa theo thời gian
2. `uoc-luong-chuyen-dong` — block matching, vector chuyển động
3. `optical-flow` — Lucas–Kanade, Horn–Schunck

---

## 📥 Inbox — chờ chưng cất

> App **không đọc** `_inbox/`. Note ở đây là nguyên liệu thô, chưa lên graph.

| File | Dự kiến tách ra | Ưu tiên |
|---|---|---|
| `_inbox/ivp-tom-tat-lectures.md` | bảng thuật ngữ L0–L12 — **mỗi dòng ≈ 1 atomic note** | 🔴 cao — có cấu trúc sẵn, tách nhanh nhất |
| `_inbox/ivp-mindmap-mo-rong.md` | đã cấu trúc theo chủ đề → khớp thẳng vào nhánh A–C | 🔴 cao |
| `_inbox/ivp-mindmap.md` | sơ đồ mermaid Lecture 0→6 | 🟡 vừa — dùng để đối chiếu |
| `_inbox/ivp-note-tho.md` | brain-dump gốc, câu cụt, ký hiệu `=>` | 🟢 thấp — đọc để không sót ý |

## ❓ Câu hỏi mở

- Bộ lọc trung vị khử muối tiêu tốt hơn trung bình — chứng minh trực giác thế nào?
- Canny gồm 4 bước; bỏ bước non-maximum suppression thì hỏng ra sao?
- Kernel học được của CNN có tự tìm lại Sobel/Gaussian không?

## 🔗 Tài nguyên khác

| Tài nguyên | Mô tả |
|---|---|
| `D:\MSA-FPT\Image and video processing` | Lecture 0→12 PDF + thư mục `_txt` (bản text để grep) |
| `D:\MSA-FPT\Image and video processing\HPH_25MS23323` | 9 notebook thực hành `session1..9.ipynb` |
| `D:\MSA-FPT\Image and video processing\image-super-resolution` | Sub-project siêu phân giải |
| [[../../projects/image-super-resolution\|📦 Project Image Super-Resolution]] | Thẻ project |

## 🔗 Quy ước liên kết

- `[[slug]]` — note cùng vault · ``dsp/tich-chap`` — note vault khác (xem `CONVENTIONS.md` §6)
- Trạng thái: ⬜ Chưa học · 🟡 Đang học · ✅ Đã nắm · 🔁 Cần ôn
