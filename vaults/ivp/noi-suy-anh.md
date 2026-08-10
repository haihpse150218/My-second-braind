---
slug: noi-suy-anh
title: Nội suy ảnh
vault: ivp
type: concept
branch: C
order: 5
status: learning
tags: [ivp, hinh-hoc]
prev: [bien-doi-affine]
next: [bien-doi-diem]
related: [aliasing-anh, lay-mau-anh]
sources: ["L5 — Arithmetic, Logic & Geometric Operations"]
created: 2026-08-10
---

# Nội suy ảnh

> Tóm tắt 1 câu: khi toạ độ tính ra là số lẻ, phải **đoán** giá trị pixel ở đó — và ba cách đoán phổ biến là một thang đánh đổi nét ↔ mượt ↔ chi phí.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #5 ← cần [[bien-doi-affine]] · → kế tiếp [[bien-doi-diem]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #hinh-hoc

---

## 💡 Ý chính

Bài toán: cần giá trị tại `(10.4, 7.8)` — nhưng ảnh chỉ có giá trị ở toạ độ **nguyên**.

| Cách | Dùng bao nhiêu pixel | Bậc | Kết quả | Chi phí |
|---|---|---|---|---|
| **Nearest neighbor** | **1** (gần nhất) | 0 | Sắc nhưng **răng cưa**, khối vuông | Rẻ nhất |
| **Bilinear** | **4** (ô vuông bao quanh) | 1 | Mượt, hơi mềm | Vừa |
| **Bicubic** | **16** (lưới 4×4) | 3 | Mượt và nét nhất | Đắt nhất |

Đây gần như là mặc định của mọi thư viện: **bilinear** cho công việc thường ngày, **bicubic** khi cần chất lượng, **nearest** khi bắt buộc không được bịa giá trị mới.

## 🧩 Bilinear hoạt động thế nào

Nội suy tuyến tính **hai lần**, đúng như tên gọi:

```
Q11 ─────── Q21        1. Nội suy theo trục x  → được R1 (trên) và R2 (dưới)
 │    ·P     │         2. Nội suy R1–R2 theo y → được P
Q12 ─────── Q22
```

Kết quả là **trung bình có trọng số** của 4 pixel, trọng số theo khoảng cách — pixel càng gần đóng góp càng nhiều.

## ⚠️ Khi nào BẮT BUỘC dùng nearest

Đây là trường hợp quan trọng nhất và hay bị làm sai:

> 🚨 **Ảnh nhãn (label/mask) phải nội suy bằng nearest, không bao giờ dùng bilinear.**

Mask phân đoạn có giá trị `1 = mèo`, `2 = chó`. Bilinear giữa hai vùng cho ra `1.5` — một lớp **không tồn tại**. Với ảnh nhị phân thì nó tạo ra giá trị `0.5` ở biên, biến mask thành ảnh xám.

Cùng lý do: nội suy ảnh **chỉ số màu** (indexed) bằng bilinear cũng vô nghĩa — trung bình của chỉ số `3` và `7` không phải màu nằm giữa hai màu đó, xem [[kieu-anh-va-do-sau-bit]].

**Quy tắc:** dữ liệu **liên tục** (độ sáng) → bilinear/bicubic. Dữ liệu **rời rạc/phân loại** (nhãn, chỉ số) → nearest.

## ⚙️ Nội suy không tạo ra thông tin mới

Phóng to ảnh `2×` bằng bicubic **không** làm ảnh nét hơn — chỉ làm các bậc thang bớt gồ ghề. Chi tiết chưa từng được cảm biến ghi lại thì không có phép nội suy nào tìm ra được.

Đây chính là ranh giới giữa nội suy cổ điển và **siêu phân giải học sâu**: mạng SR *bịa* ra chi tiết hợp lý dựa trên hàng triệu ảnh đã học, còn nội suy chỉ làm trơn cục bộ. Xem [[../../projects/image-super-resolution|📦 image-super-resolution]].

## ⚠️ Điều dễ nhầm

- **Nội suy nhiều lần liên tiếp làm mờ tích luỹ.** Lý do phải gộp ma trận affine, xem [[bien-doi-affine]].
- **Thu nhỏ ảnh không cứu được bằng nội suy tốt.** Thu nhỏ cần [[loc-lam-min]] trước để tránh [[aliasing-anh]]; đây là vấn đề khác hẳn với phóng to.
- **Bicubic có thể cho giá trị ngoài `[0,255]`** (overshoot ở biên sắc, gọi là ringing) → dính [[tran-so-anh]] nếu không kẹp cẩn thận.

---

## 🔗 Liên kết
- **Tiền đề:** [[bien-doi-affine]] · [[lay-mau-anh]]
- **Dẫn tới:** [[bien-doi-diem]]
- **Liên quan:** [[aliasing-anh]] · [[loc-lam-min]] · [[tran-so-anh]]

## ❓ Câu hỏi mở
- Lanczos dùng cửa sổ sinc rộng hơn bicubic — đổi lấy gì và mất gì?

## 📚 Nguồn
- Lecture 5 — Arithmetic, Logic & Geometric Operations
