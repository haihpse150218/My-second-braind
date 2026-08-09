---
slug: batch-size-va-learning-rate
title: Batch size & Learning rate
vault: dl
type: concept
branch: G
order: 8
status: done
tags: [dl, training, hyperparameter]
prev: [underfit-vs-overfit]
next: [callbacks-keras]
created: 2026-08-02
---

# Batch size & Learning rate

> Tóm tắt 1 câu: Tăng batch size mà giữ nguyên LR → **ít update hơn** → acc tụt; phải tăng LR theo.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #8 ← cần [[underfit-vs-overfit]] · → kế tiếp [[callbacks-keras]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #training #hyperparameter

---

## 💡 Ý chính

- Batch size **cơ số 2** (16/32/64/128/256), chọn **to nhất mà VRAM chịu được**
- Ảnh to → batch nhỏ. `VRAM ≈ batch × kích thước 1 mẫu × số activation giữ để backprop`
- **Biết trước số update**: `⌈N / batch⌉ × epochs`
- ⚠️ **Tăng batch mà giữ nguyên LR → ít update → acc tụt.** Phải **tăng LR theo** (*linear scaling rule*)

## 📋 Khoảng khuyến nghị

| Hyperparameter | Khoảng | Ghi chú |
|---|---|---|
| `batch_size` | **32–256**, cơ số 2 | To nhất VRAM chịu |
| `learning_rate` (Adam) | **1e-3** mặc định · **1e-4 khi model > 10M param** | ⭐ Núm chính |
| `epochs` | Đặt **cao** (20–100) + EarlyStopping | Đừng đoán số epoch |
| `dropout` | **0.2–0.5** ở FC · **0.1–0.25** sau conv | Cao quá + train ngắn → underfit |
| Conv filter | **3×3**, nhân đôi mỗi block `32→64→128` | |
| FC head | **GAP → 1 Dense nhỏ → n_classes** | ⚠️ Tránh `4096→4096` |
| Image size | **128** (thử nghiệm) → **224** (chuẩn pretrain) | Ảnh to gấp đôi ⇒ tính toán gấp ~4 |

🔁 Bài **chuỗi/RNN** → thêm **`clipnorm=1.0`**, xem [[exploding-gradient-clipnorm]].

## 📊 Bằng chứng — LR quan trọng hơn tưởng

AlexNet 30M param trên MNIST:

| Cấu hình | Test Acc |
|---|---|
| Baseline Adam `1e-3` | 0.9318 |
| **Adam `1e-4`** | **0.9543** |

⚠️ **Bài học suýt sai:** từng phán *"đang underfit thì hạ LR sẽ phản tác dụng"* — **sai**. `1e-4` thắng, train_acc **+11 điểm**. `1e-3` quá cao cho mạng 30M param không chuẩn hoá — **bước lớn ≠ học nhanh**.

---

## 🔗 Liên kết
- **Tiền đề:** [[underfit-vs-overfit]]
- **Dẫn tới:** [[callbacks-keras]]
