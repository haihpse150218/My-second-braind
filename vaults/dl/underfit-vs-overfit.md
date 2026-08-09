---
slug: underfit-vs-overfit
title: Underfit vs Overfit — chữa NGƯỢC nhau
vault: dl
type: concept
branch: G
order: 7
status: done
tags: [dl, training]
prev: [error-chart]
next: [batch-size-va-learning-rate]
created: 2026-08-02
---

# Underfit vs Overfit — chữa NGƯỢC nhau

> Tóm tắt 1 câu: Underfit thêm **năng lực**, overfit thêm **ràng buộc** — đoán sai phía là làm tệ thêm.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #7 ← cần [[error-chart]] · → kế tiếp [[batch-size-va-learning-rate]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #training

---

## 💡 Ý chính

| **UNDERFIT** → thêm **năng lực** | **OVERFIT** → thêm **ràng buộc** |
|---|---|
| Tăng complexity | L1/L2 |
| Train lâu hơn | Dropout |
| Feature engineering | Early Stopping |
| **GIẢM** regularization | Augmentation · Cross-Validation |

⚠️ Chú ý dòng cuối bên trái: underfit thì phải **giảm** regularization — đúng ngược với phản xạ thông thường.

## 💡 Triết lý tune đổi theo CỠ MODEL

| Cỡ model | Lo gì trước | Làm gì trước |
|---|---|---|
| **Nhỏ** (< 1M param) | **Underfit** | Tăng năng lực |
| **To** (> 10M param) | **Overfit + khó tối ưu** | Hạ LR, siết regularization |

## 📊 Bằng chứng tự chạy — nhiều param ≠ tốt hơn

| Model | Dataset | Param | Test Acc |
|---|---|---|---|
| CNN nhỏ | MNIST 60k × 10ep | **225.034** | **0.9918** |
| AlexNet | MNIST 6k × 2ep | 29.987.530 | 0.9564 |

→ AlexNet nhiều hơn **133 lần** param mà **tệ hơn**. Nguyên nhân: chỉ **170 lần update** cho 30M param (CNN nhỏ: **8.440**).
📌 **Model to mà ít update là chắc chắn underfit.**

## ⚠️ Lỗi thường gặp

⚠️ **Chênh lệch nhỏ hơn nhiễu run-to-run thì không kết luận được.** Cùng config baseline chạy 2 seed khác nhau cho `0.9318` và `0.9564` — **nhiễu ~2,5 điểm**.

---

## 🔗 Liên kết
- **Tiền đề:** [[error-chart]]
- **Dẫn tới:** [[batch-size-va-learning-rate]] · [[callbacks-keras]]
