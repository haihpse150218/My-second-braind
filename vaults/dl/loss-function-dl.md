---
slug: loss-function-dl
title: Loss function trong DL
vault: dl
type: concept
branch: A
order: 6
status: done
tags: [dl, nen-tang, loss]
prev: [forward-pass]
next: [gradient-descent-dl]
created: 2026-08-02
---

# Loss function trong DL

> Tóm tắt 1 câu: Chọn loss theo **dạng nhãn** — chọn sai thì accuracy đứng im mà không báo lỗi.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh A · #6 ← cần [[forward-pass]] · → kế tiếp [[gradient-descent-dl]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nen-tang #loss

---

## 💡 Bảng tra theo dạng nhãn

| `y` là gì | Loss | Activation cuối |
|---|---|---|
| Số thực (regression) | **MSE / MAE** | không có |
| 0/1 một cột | **`binary_crossentropy`** | `sigmoid` |
| **One-hot** | **`categorical_crossentropy`** | `softmax` |
| Số nguyên 0..N | **`sparse_categorical_crossentropy`** | `softmax` |

## ⚠️ Lỗi thường gặp — lỗi shape hay gặp nhất

🚩 **`categorical` vs `sparse_categorical`**: dùng sai → lỗi shape `(10,)` vs `(1,)`, **hoặc tệ hơn: accuracy đứng im** mà không báo lỗi.

⚠️ **Loss ≠ metric.** Loss là thứ để **tối ưu**; metric là thứ để **đánh giá**. Với bài sinh chuỗi thì 2 cái **không cùng chiều** → xem [[metric-sinh-chuoi]].

⚠️ **Metrics phải khai ngay ở `compile`** thì `evaluate()` mới trả về.

⚠️ Bài **mất cân bằng** → thêm `Precision`, `Recall`, `AUC`, đừng chỉ `accuracy`.

## 🧩 Loss cho bài đặc thù

- Detection: [[multitask-loss]] · [[focal-loss]]
- Metric learning: [[contrastive-loss]] · [[triplet-loss]]

---

## 🔗 Liên kết
- **Tiền đề:** [[forward-pass]]
- **Dẫn tới:** [[gradient-descent-dl]]
