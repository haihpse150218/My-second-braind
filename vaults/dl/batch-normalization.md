---
slug: batch-normalization
title: Batch Normalization
vault: dl
type: concept
branch: B
order: 12
status: done
tags: [dl, cnn, training]
prev: [resnet]
next: [transfer-learning]
created: 2026-08-02
---

# Batch Normalization

> Tóm tắt 1 câu: Chuẩn hoá **activation giữa mạng** theo mini-batch — cực hữu ích, nhưng **sập thảm nếu train quá ngắn**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh B · #12 ← cần [[resnet]] · → kế tiếp [[transfer-learning]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #cnn #training

---

## 🔢 Công thức

```
x̂ᵢⱼ = (xᵢⱼ − μⱼ) / √(σⱼ² + ε)        rồi scale-shift:   y = γx̂ + β
```
`γ, β` là tham số **học được**.

- `μ, σ` tính theo **mini-batch** lúc **train**
- Lúc **inference** dùng **moving average** đã tích luỹ

## ⚙️ Tác dụng

- Train **nhanh & ổn định** hơn, cho phép **LR lớn** hơn
- Có tác dụng **regularize nhẹ**
- Thứ tự chuẩn: **`Conv → BN → ReLU`**
- 📌 **BN + residual block** chính là 2 mảnh ghép giúp [[resnet]] train nổi **152 layer**

⚠️ **Đừng nhầm với normalize dữ liệu đầu vào**: cái đó làm **một lần trước khi train**; BN chuẩn hoá **activation giữa mạng, mỗi mini-batch**.

## 🚩 Bẫy chết người — BN sập ở test

| Cấu hình | Test Acc | train_acc |
|---|---|---|
| Baseline | 0.9318 | 0.8383 |
| **+ BatchNorm** | **0.2533** 💥 | 0.9233 |

**Nguyên nhân**: moving average **chưa hội tụ**. Với `momentum=0.99` và chỉ **170 update**:
```
0.99¹⁷⁰ ≈ 0.18   →  moving stats còn 18% GIÁ TRỊ KHỞI TẠO
```

⇒ **BN cần đủ số update thì thống kê inference mới dùng được.**

**Chữa**: đảm bảo đủ update · hạ `momentum` xuống **0.9** · hoặc **bỏ BN** khi train ngắn.

## ⚠️ Lỗi thường gặp

- 🚩 **Không bao giờ truyền `training=True` lúc eval** → leakage, xem [[chong-ro-ri-du-lieu]]
- 🚩 **BN hoạt động kém trên RNN** (thống kê theo batch không ổn định qua các bước thời gian) → dùng **LayerNorm**. Slide 24 của S05 liệt kê BN là **gây hiểu nhầm**.

---

## 🔗 Liên kết
- **Tiền đề:** [[resnet]]
- **Dẫn tới:** [[transfer-learning]]
- **Liên quan tới:** [[sau-noi-so-ao-tuong]] · [[vanishing-gradient-rnn]]
