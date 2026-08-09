---
slug: data-augmentation
title: Data Augmentation
vault: dl
type: concept
branch: B
order: 14
status: done
tags: [dl, cnn, data]
prev: [transfer-learning]
created: 2026-08-02
---

# Data Augmentation

> Tóm tắt 1 câu: Dạy model **bất biến** với đúng những thay đổi bạn chọn mô phỏng — và phải hỏi từng phép: *"cái này có ĐỔI NHÃN không?"*

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh B · #14 ← cần [[transfer-learning]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #cnn #data

---

## ⚙️ Chọn phép augment theo BIẾN THIÊN THẬT ở môi trường deploy

| Biến thiên thật | Phép augment |
|---|---|
| Vật quay trái/phải | `RandomFlip('horizontal')` |
| Camera nghiêng | `RandomRotation` |
| Vật gần/xa | `RandomZoom` |
| Vật không giữa khung | `RandomTranslation` |
| Ánh sáng, ngày/đêm | `RandomContrast`, `RandomBrightness` |
| Camera rung | Blur, noise |

**Khoảng khuyến nghị**: rotation **≤ 0.1** · zoom **≤ 0.15** · translation **≤ 0.1**. Mạnh quá → ảnh vô nghĩa.

## 🚩 Câu hỏi bắt buộc: *"biến đổi này có ĐỔI NHÃN không?"*

- `RandomFlip` **đúng cho rác** — chai nhựa lật ngang vẫn là chai nhựa
- `RandomFlip` **SAI cho chữ số** — `2` lật ngang không còn là `2`; xoay 180° thì `6` → `9`

📌 **Đổi nhãn = dạy model điều sai.** **Không có bộ augmentation dùng chung cho mọi bài.**

## ⚠️ Lỗi thường gặp

- 🚩 **Đặt augmentation TRONG model** (`x = data_augmentation(inputs)`) → Keras tự tắt khi `predict`/`evaluate`. Áp cả val/test là [[chong-ro-ri-du-lieu]].
- ✅ **Vẽ 9 ảnh sau augment để mắt kiểm tra.**
- 🚩 **Bài DETECTION/SEGMENTATION: augment phải biến đổi CẢ box/mask.** Layer augment của Keras **chỉ đụng ảnh, không đụng nhãn** → flip ảnh mà box đứng yên = **dạy sai 100%**. Dùng **Albumentations** (`bbox_params` / `mask`).
- Mask phải nội suy **NEAREST** — bilinear sẽ đẻ ra nhãn không tồn tại.

## ⚠️ Augmentation ≠ Data Synthesis

| | **Augmentation** | **Data Synthesis** |
|---|---|---|
| Làm gì | Biến đổi ảnh **CÓ SẴN** | Sinh ảnh **MỚI** (GAN · VAE · Diffusion) |
| Chi phí | Rẻ, vài dòng | Train riêng một model sinh |

Ở giữa: **Mixup / CutMix** — trộn 2 ảnh **và** trộn nhãn theo cùng tỉ lệ.
📌 **Cả hai đều KHÔNG thay thế được data thật.**

---

## 🔗 Liên kết
- **Tiền đề:** [[transfer-learning]]
- **Liên quan tới:** [[chong-ro-ri-du-lieu]] · [[bon-muc-bai-toan-thi-giac]] · [[underfit-vs-overfit]]
