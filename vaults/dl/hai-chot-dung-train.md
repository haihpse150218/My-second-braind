---
slug: hai-chot-dung-train
title: 2 chốt dừng khi train
vault: dl
type: concept
branch: G
order: 5
status: done
tags: [dl, training, thuc-chien]
prev: [group-leakage]
next: [error-chart]
created: 2026-08-02
---

# 2 chốt dừng khi train

> Tóm tắt 1 câu: Đừng ngồi chờ hết epoch — có 2 thời điểm phải dừng lại kiểm tra.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #5 ← cần [[group-leakage]] · → kế tiếp [[error-chart]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #training #thuc-chien

---

## 💡 Ý chính

| Chốt | Khi nào | Kiểm tra | Nếu fail |
|---|---|---|---|
| **1** | Hết **epoch 1** | RAM/VRAM đủ không → **kỹ thuật (OOM)** | Giảm batch (chia đôi) → resize nhỏ → mixed precision → gradient accumulation |
| **2** | **2–3 epoch** đầu | Error có **giảm** không → **học được không** | Dừng ngay, chạy checklist chẩn đoán 👇 |

📌 Qua chốt 1 rồi mới đi ngủ / mới thuê GPU.

## 🩺 Chốt 2 — bảng chẩn đoán khi error không giảm

| Triệu chứng | Nguyên nhân |
|---|---|
| Loss **đứng im** / dao động quanh giá trị đầu | Model không học được gì |
| Loss **NaN** / bùng lên | LR **quá lớn**, **quên normalize**, hoặc [[exploding-gradient-clipnorm]] |
| Loss giảm **nhỏ giọt** | LR **quá nhỏ** |
| Accuracy ≈ `1/số lớp` | Đang **đoán bừa** |

## ⚙️ Checklist sửa — xếp theo tần suất mắc lỗi

1. Quên `/255`?
2. Loss khớp dạng nhãn chưa? (`categorical` ↔ `sparse_categorical`)
3. Learning rate? Thử `1e-3 ↔ 1e-4`
4. Activation cuối đúng chưa? (đa lớp `softmax`, nhị phân `sigmoid`)
5. Shape input/output khớp không?
6. Label có bị lệch/xáo so với ảnh không?

---

## 🔗 Liên kết
- **Tiền đề:** [[group-leakage]]
- **Dẫn tới:** [[error-chart]] · [[callbacks-keras]]
- **Liên quan tới:** [[bay-am-tham]]
