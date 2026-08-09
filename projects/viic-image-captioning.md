---
slug: viic-image-captioning
title: ViIC — Sinh mô tả ảnh tiếng Việt (UIT-ViIC)
type: project
domain: dl
status: done
period: 2026-06 → 2026-08
stack: [pytorch, clip, resnet50, lstm, gru, bahdanau-attention, transformer, gradio]
repo_path: "D:\\MSA-FPT\\DeepLearning\\DoAn-ViIC"
artifacts: [docs/BAO-CAO.md, paper/fisat2026-vi.md, app/gradio_demo.py]
tags: [dl, image-captioning, attention, do-an]
related: [dl/attention-qkv, dl/lstm-cell-state, dl/kien-truc-cnn-4-tang, dl/word2vec]
created: 2026-08-09
---

# 📦 ViIC — Sinh mô tả ảnh tiếng Việt (UIT-ViIC)

> So sánh **có kiểm soát 4 encoder × 5 decoder** cho bài toán image captioning tiếng Việt trên bộ dữ liệu thể thao UIT-ViIC (3.850 ảnh / 19.256 caption).

**Môn:** Deep Learning (FSB/FPT) · **Loại:** Đồ án cuối kỳ · **Thời gian:** 2026-06 → 2026-08
**Thư mục gốc:** `D:\MSA-FPT\DeepLearning\DoAn-ViIC`
**Quay lại:** [[INDEX|📦 Tất cả project]]

> ⚠️ Thẻ tham chiếu — code/checkpoint/dataset vẫn nằm ở `repo_path`.

---

## 🎯 Vấn đề

Sinh câu mô tả **tiếng Việt** cho ảnh thể thao. Khó hơn tiếng Anh vì: bộ dữ liệu nhỏ (3.850 ảnh), tiếng Việt tách từ khác tiếng Anh, và không có pretrained caption model tiếng Việt để so.

## 🛠️ Cách làm

Thiết kế **ma trận so sánh có kiểm soát** — cố định một chiều để đo chiều còn lại:
- **5 decoder** (encoder cố định ResNet50): LSTM · GRU · Bahdanau attention · Transformer 1 lớp · ViT+gpt2-vi fine-tune
- **Ablation encoder** trên decoder tốt nhất (M3): ResNet50 → CLIP ViT-B/16

## 📊 Kết quả

**Tốt nhất: M3 (Bahdanau attention) × CLIP ViT-B/16 — test CIDEr 119.95, BLEU-4 42.91** (sàn ngẫu nhiên BLEU-4 = 11.01).

| Decoder (encoder ResNet50, test, greedy) | BLEU-4 | CIDEr |
|---|---|---|
| M1 LSTM | 34.37 | 93.84 |
| M2 GRU | 33.06 | 90.22 |
| **M3 Bahdanau attention** | **36.99** | **100.22** |
| M4 Transformer (1 layer) | 32.53 | 82.76 |
| M5 ViT + gpt2-vi fine-tune | 33.99 | 85.64 |

Đổi encoder ResNet50 → CLIP ViT-B/16 trên cùng M3: **+22 CIDEr**.

## 💡 Bài học

- **Encoder quan trọng hơn decoder.** Đổi encoder được +22 CIDEr; đổi decoder từ LSTM sang attention chỉ được +6.4. Chất lượng đặc trưng đầu vào là trần của cả hệ thống.
- **Transformer 1 lớp thua LSTM** trên dữ liệu nhỏ — kiến trúc mạnh hơn không tự động tốt hơn khi thiếu dữ liệu.
- Bug thật gặp phải: **double-shift trong `transformers` 4.57** (thư viện đã tự dịch nhãn, code dịch thêm lần nữa) — dạng lỗi im lặng, chỉ lộ ra khi thấy loss giảm mà chất lượng không lên.
- Val không phân tầng làm số đo dao động → phải phân tầng khi chia dữ liệu.

## 🔗 Khái niệm đã dùng

- [[dl/attention-qkv]] — cơ chế attention là thứ tạo ra bước nhảy lớn nhất về chất lượng
- [[dl/lstm-cell-state]] — decoder nền M1
- [[dl/kien-truc-cnn-4-tang]] — encoder ResNet50 trích đặc trưng ảnh
- [[dl/beam-search]] — so sánh beam vs greedy khi sinh câu
- [[ml/danh-gia-mo-hinh]] — vì sao cần sàn ngẫu nhiên để số đo có nghĩa

## 📁 Sản phẩm

| Loại | Đường dẫn |
|---|---|
| Báo cáo | `D:\MSA-FPT\DeepLearning\DoAn-ViIC\docs\BAO-CAO.md` |
| Bài báo | `D:\MSA-FPT\DeepLearning\DoAn-ViIC\paper\fisat2026-vi.md` |
| Demo | `D:\MSA-FPT\DeepLearning\DoAn-ViIC\app\gradio_demo.py` |
| Notebook | `D:\MSA-FPT\DeepLearning\DoAn-ViIC\notebooks` (01 trích đặc trưng → 06 v2) |
| Kết quả | `D:\MSA-FPT\DeepLearning\DoAn-ViIC\results` |
