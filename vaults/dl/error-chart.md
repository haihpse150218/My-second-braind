---
slug: error-chart
title: Error chart — train xong là vẽ
vault: dl
type: concept
branch: G
order: 6
status: done
tags: [dl, training, danh-gia]
prev: [hai-chot-dung-train]
next: [underfit-vs-overfit]
created: 2026-08-02
---

# Error chart — train xong là vẽ

> Tóm tắt 1 câu: Một con số accuracy **không nói được** underfit hay overfit — mà 2 cái đó chữa **ngược nhau**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #6 ← cần [[hai-chot-dung-train]] · → kế tiếp [[underfit-vs-overfit]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #training #danh-gia

---

## 💡 Ý chính

- Vẽ `history.history['loss']` và `['val_loss']` theo epoch
- Đánh dấu epoch có `val_loss` **thấp nhất**

| Dấu hiệu | Chẩn đoán | Chữa |
|---|---|---|
| Cả 2 đường **còn đang xuống** ở epoch cuối | **UNDERFIT** — dừng sớm | Train thêm epoch · thêm data · mạng to hơn |
| Train **xuống**, val **đi lên** | **OVERFIT** | EarlyStopping → Dropout → L1/L2 → Augmentation → giảm model → thêm data |
| Cả 2 **đi ngang** mà còn **cao** | Underfit do **thiếu năng lực** | Mạng sâu/rộng hơn, feature tốt hơn |
| Val chạm **đáy** rồi ngóc lên | Đáy = **sweet spot** | `restore_best_weights=True` |

## 🎯 Mẹo 2 giây

**`train_acc < test_acc` ⇒ gần như chắc chắn UNDERFIT.**
Bình thường train phải **cao hơn** test. Thấp hơn = chưa học xong.

## ⚠️ Lỗi thường gặp

Nhìn mỗi con số accuracy cuối rồi kết luận. Không vẽ chart thì **không biết đang ở phía nào của chữ U** → chọn thuốc bừa, và [[underfit-vs-overfit]] chữa ngược nhau nên đoán sai là **làm tệ thêm**.

---

## 🔗 Liên kết
- **Tiền đề:** [[hai-chot-dung-train]]
- **Dẫn tới:** [[underfit-vs-overfit]]
