---
slug: forward-pass
title: Forward pass
vault: dl
type: concept
branch: A
order: 5
status: done
tags: [dl, nen-tang]
prev: [relu-vs-sigmoid]
next: [loss-function-dl]
created: 2026-08-02
---

# Forward pass

> Tóm tắt 1 câu: Dữ liệu chảy **xuôi** qua từng tầng để ra dự đoán — nửa đầu của một vòng huấn luyện.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh A · #5 ← cần [[relu-vs-sigmoid]] · → kế tiếp [[loss-function-dl]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nen-tang

---

## 💡 Ý chính

```
x → [tầng 1: z=Wx+b, a=f(z)] → [tầng 2] → … → ŷ
```

Một **vòng huấn luyện** đầy đủ:
```
forward → tính loss → backward (backprop) → cập nhật weight
```

## ⚙️ Kiểm tra shape — việc phải làm mỗi lần dựng model

`print(model.summary())` và **đọc cột Output Shape** — kiểm tra shape teo đúng như tính.

## ⚠️ Lỗi thường gặp

- **Quên `/255`** trước khi đưa vào mạng → pixel 0–255 làm gradient lớn, hội tụ chậm/không ổn định. `print(x.min(), x.max())` phải ra `[0,1]`.
- Shape input/output không khớp → xem [[hai-chot-dung-train]].
- 📌 **Huấn luyện vs suy luận khác nhau**: lúc `predict`/`evaluate`, dropout **tắt** và BatchNorm dùng **moving stats**. Không tự làm — Keras tự xử lý nếu đặt layer đúng chỗ.

---

## 🔗 Liên kết
- **Tiền đề:** [[relu-vs-sigmoid]] · [[perceptron]]
- **Dẫn tới:** [[loss-function-dl]] · [[backpropagation]]
