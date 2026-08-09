---
slug: cac-loai-gradient-descent
title: 3 loại Gradient Descent
vault: dl
type: concept
branch: A
order: 8
status: done
tags: [dl, training]
prev: [gradient-descent-dl]
next: [backpropagation]
created: 2026-08-02
---

# 3 loại Gradient Descent

> Tóm tắt 1 câu: Batch · Stochastic · Mini-batch — khác nhau ở chỗ **dùng bao nhiêu mẫu cho mỗi lần update**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh A · #8 ← cần [[gradient-descent-dl]] · → kế tiếp [[backpropagation]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #training

---

## 💡 Bảng so sánh

| | Mẫu / update | Ưu | Nhược |
|---|---|---|---|
| **Batch GD** | **Toàn bộ** tập | Gradient chính xác, mượt | **Rất chậm**, không vừa RAM |
| **Stochastic (SGD)** | **1 mẫu** | Cập nhật liên tục, thoát local min | Nhiễu mạnh, khó hội tụ |
| **Mini-batch** ⭐ | **32–256 mẫu** | Cân bằng cả hai, **tận dụng GPU** | Phải chọn batch size |

**Thực tế gần như luôn dùng mini-batch.** Khi nói "SGD" trong DL, thường là mini-batch.

## 🔢 Đếm số update

```
số update = ⌈N / batch_size⌉ × epochs
```

📌 **Model to mà ít update là chắc chắn underfit.** Bằng chứng: AlexNet 30M param chỉ **170 update** → thua CNN nhỏ có **8.440 update**. Xem [[underfit-vs-overfit]].

## ⚠️ Lỗi thường gặp

⚠️ **Tăng batch size mà giữ nguyên LR → ít update hơn → acc tụt.** Phải tăng LR theo (*linear scaling rule*) → [[batch-size-va-learning-rate]].

---

## 🔗 Liên kết
- **Tiền đề:** [[gradient-descent-dl]]
- **Dẫn tới:** [[backpropagation]]
- **Liên quan tới:** [[batch-size-va-learning-rate]]
