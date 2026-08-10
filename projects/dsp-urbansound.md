---
slug: dsp-urbansound
title: DSP501 — Tiền xử lý DSP có giúp phân loại âm thanh tốt hơn không?
type: project
domain: dsp
status: done
period: 2026-03 → 2026-05
stack: [python, librosa, scipy-signal, scikit-learn, pytorch, torchaudio]
repo_path: "D:\\MSA-FPT\\Digital Signal Processing\\workspaces\\final\\DSP501"
repo_url: "https://github.com/haihpse150218/DSP501"
repo_visibility: public
artifacts: [report.md, presentation.md, docs/SIGNAL_ANALYSIS.md, notebooks]
tags: [dsp, audio, classification, do-an-nhom]
related: [ml/danh-gia-mo-hinh, ml/cross-validation, dl/cnn]
created: 2026-08-09
---

# 📦 DSP501 — Tiền xử lý DSP có giúp phân loại âm thanh tốt hơn không?

> Đồ án nhóm: so **Pipeline A (tín hiệu thô → AI)** với **Pipeline B (tiền xử lý DSP → trích đặc trưng → AI)** trên bộ UrbanSound8K.

**Môn:** Digital Signal Processing · **Loại:** Đồ án nhóm cuối kỳ · **Thời gian:** 2026-03 → 2026-05
**Thư mục gốc:** `D:\MSA-FPT\Digital Signal Processing\workspaces\final\DSP501`
**Repo GitHub:** [DSP501](https://github.com/haihpse150218/DSP501) — public
**Bản làm việc (superset):** `…\workspaces\project\DSP501`
**Quay lại:** [[INDEX|📦 Tất cả project]]

---

## 🎯 Vấn đề

> *Áp tiền xử lý DSP cổ điển (lọc dải thông, pre-emphasis, chuẩn hoá) lên tín hiệu âm thanh có làm tăng độ chính xác phân loại âm thanh môi trường so với dùng thẳng audio thô không?*

Đây là câu hỏi **có/không đo được**, không phải "làm một cái classifier" — điểm mạnh nhất của thiết kế đồ án này.

## 🛠️ Cách làm

| Thành phần | Lựa chọn |
|---|---|
| Dữ liệu | UrbanSound8K — 10 lớp âm thanh đô thị, **chia sẵn 10 fold** |
| Tiền xử lý (Pipeline B) | lọc FIR/IIR bằng `scipy.signal` · pre-emphasis · chuẩn hoá |
| Đặc trưng | MFCC · mel-spectrogram · ZCR · RMS (`librosa`) |
| Mô hình | SVM · Random Forest (`scikit-learn`) · CNN-1D · CNN-2D (`pytorch`) |
| Đánh giá | Accuracy + **F1 macro** · cross-validation theo fold có sẵn |

## 📊 Kết quả

- **ML cổ điển trên đặc trưng DSP cho độ chính xác cao hơn CNN-2D** trên bộ dữ liệu này.
- CNN-2D dao động giữa các fold mạnh nhất (**CI = 5.2%**) — đúng như dự đoán khi chạy học sâu trên dữ liệu nhỏ.
- Kết luận: **tiền xử lý DSP + đặc trưng thủ công vẫn ăn được học sâu khi dữ liệu ít.**

## 💡 Bài học

- **Không được tự shuffle UrbanSound8K.** Bộ này chia fold theo *file nguồn*; shuffle ngẫu nhiên làm các lát cắt của cùng một đoạn ghi âm rơi vào cả train lẫn test → **rò rỉ dữ liệu**, điểm số đẹp giả. Đây là bài học chuyển thẳng sang [[ml/xu-ly-du-lieu]].
- Phương sai giữa các fold quan trọng ngang giá trị trung bình. Báo mỗi accuracy trung bình mà giấu CI 5.2% là báo cáo thiếu trung thực.
- "Mô hình xịn hơn" ≠ "kết quả tốt hơn" khi dữ liệu nhỏ — cùng bài học với [[viic-image-captioning]] (Transformer thua LSTM).

## 🔗 Khái niệm đã dùng

- [[ml/cross-validation]] — vì sao chia theo fold có sẵn mới đúng
- [[ml/danh-gia-mo-hinh]] — F1 macro cho bài toán nhiều lớp
- [[ml/xu-ly-du-lieu]] — rò rỉ dữ liệu
- [[dl/kien-truc-cnn-4-tang]] — CNN-2D chạy trên ảnh phổ
- `dsp/mfcc` · `dsp/spectrogram-stft` · `dsp/bo-loc-so` *(chưa viết — nguyên liệu trong `vaults/dsp/_inbox/`)*

## 📁 Sản phẩm

| Loại | Đường dẫn |
|---|---|
| Báo cáo | `…\workspaces\final\DSP501\report.md` |
| Kịch bản thuyết trình | `…\workspaces\project\DSP501\presentation_script_v3.md` |
| Phân tích tín hiệu | `…\workspaces\final\DSP501\docs\SIGNAL_ANALYSIS.md` |
| Notebook | `…\notebooks\01_signal_analysis.ipynb` → `06_comparative_analysis.ipynb` |
| Nhật ký tiến độ | `…\progress.md` (Sprint Log · Decision Log · Experiment Results) |
