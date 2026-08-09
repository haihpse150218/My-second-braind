---
slug: image-super-resolution
title: Siêu phân giải ảnh x4 — cổ điển vs học sâu
type: project
domain: ivp
status: done
period: 2026-05 → 2026-07
stack: [pytorch, srcnn, swinir, esrgan, real-esrgan, lpips, basicsr]
repo_path: "D:\\MSA-FPT\\Image Super-Resolution for Low-Quality Images"
artifacts: [report/report.md, report/report.vi.md, results/benchmark_final.md, registry.json]
tags: [ivp, super-resolution, benchmark, danh-gia]
related: [ivp/nen-mat-mat-vs-khong, dl/kien-truc-cnn-4-tang, ml/danh-gia-mo-hinh]
created: 2026-08-09
---

# 📦 Siêu phân giải ảnh x4 — cổ điển vs học sâu

> **8 phương pháp × 4 benchmark × 3 chỉ số.** So nội suy cổ điển với SR học sâu, và chỉ ra **đánh đổi perception–distortion**: PSNR/SSIM cao **không** đồng nghĩa ảnh nhìn đẹp.

**Môn:** Image & Video Processing (FPT — Master AI), đề tài #2 · **Thời gian:** 2026-05 → 2026-07
**Thư mục gốc:** `D:\MSA-FPT\Image Super-Resolution for Low-Quality Images`
**Bản trong môn IVP:** `D:\MSA-FPT\Image and video processing\image-super-resolution`
**Quay lại:** [[INDEX|📦 Tất cả project]]

---

## 🎯 Vấn đề

Ảnh độ phân giải thấp → phóng to x4 mà vẫn nét. Câu hỏi thật: **học sâu hơn nội suy cổ điển bao nhiêu, và đo bằng chỉ số nào mới đúng?**

## 🛠️ Cách làm

- **Cổ điển (không cần train):** nearest · bilinear · bicubic · lanczos
- **Học sâu:** SRCNN · SwinIR · ESRGAN · Real-ESRGAN
- **Benchmark:** Set5 · Set14 · BSD100 · Urban100
- **Chỉ số:** PSNR + SSIM (méo dạng) và **LPIPS** (cảm nhận thị giác) — dùng cả hai mới thấy được đánh đổi
- Quản lý phiên bản model bằng `registry.json` + `checkpoints/<model>/vN/` (weights + config + metrics + log)

## 📊 Kết quả

| Phương pháp | Set5 PSNR | Set5 SSIM | Set5 **LPIPS** ↓ | Urban100 PSNR |
|---|---|---|---|---|
| nearest | 26.26 | 0.7380 | 0.3965 | 22.17 |
| bicubic | 28.43 | 0.8111 | 0.3397 | 23.14 |
| lanczos | 28.81 | 0.8181 | 0.3436 | 23.32 |
| srcnn@v2 | 28.97 | 0.8236 | 0.3233 | 23.50 |
| **swinir@v1** | **32.76** | **0.9021** | 0.1687 | **27.08** |
| esrgan@v1 | 30.50 | 0.8523 | **0.0752** | 24.36 |
| realesrgan@v1 | 26.62 | 0.8068 | 0.1693 | 22.67 |

## 💡 Bài học

- **Đây là ví dụ sách giáo khoa của "chọn sai chỉ số là kết luận sai".** SwinIR thắng PSNR (32.76) nhưng ESRGAN thắng LPIPS gấp hơn 2 lần (0.0752 vs 0.1687). GAN sinh chi tiết *nhìn thật* nhưng *sai so với ảnh gốc* → bị PSNR phạt, được LPIPS thưởng. Không có "phương pháp tốt nhất", chỉ có tốt nhất **theo mục tiêu nào**.
- Real-ESRGAN có PSNR thấp nhất trong nhóm học sâu (26.62) vì nó được huấn luyện cho **suy giảm thực tế**, không phải bicubic-downsample của benchmark → **lệch phân phối suy giảm** (`degradation_mismatch.md` đo riêng chuyện này).
- SRCNN chỉ hơn lanczos ~0.16 dB — mô hình học sâu nông gần như không ăn được nội suy tốt.

## 🔗 Khái niệm đã dùng

- [[dl/kien-truc-cnn-4-tang]] — nền của SRCNN/ESRGAN
- [[ml/danh-gia-mo-hinh]] — chọn chỉ số quyết định kết luận
- [[ml/generative-ai]] — ESRGAN sinh chi tiết bằng huấn luyện đối kháng (GAN)
- `ivp/nen-mat-mat-vs-khong` *(chưa viết)* — PSNR/SSIM cũng là chỉ số của bài toán nén

## 📁 Sản phẩm

| Loại | Đường dẫn |
|---|---|
| Báo cáo (EN/VI) | `…\report\report.md` · `…\report\report.vi.md` |
| Bảng kết quả | `…\results\benchmark_final.md` · `…\results\degradation_mismatch.md` |
| Sổ đăng ký model | `…\registry.json` |
| Notebook | `…\notebooks\01_data_and_degradation.ipynb` → `05_degradation_mismatch.ipynb` |
| Demo | `…\app.py` |
