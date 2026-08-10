---
slug: lut-bang-tra
title: LUT — bảng tra
vault: ivp
type: concept
branch: D
order: 6
status: learning
tags: [ivp, thuc-hanh, toi-uu]
prev: [bien-doi-tung-khuc]
next: [histogram-anh]
related: [bien-doi-diem, pseudocolor]
sources: ["L6 — Gray-Level Transformations, Histogram, Neighborhood"]
created: 2026-08-10
---

# LUT — bảng tra

> Tóm tắt 1 câu: ảnh 8-bit chỉ có **256 giá trị đầu vào khả dĩ** — nên tính trước 256 kết quả rồi tra bảng, thay vì tính lại cho từng pixel trong hàng triệu pixel.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #6 ← cần [[bien-doi-tung-khuc]] · → kế tiếp [[histogram-anh]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #thuc-hanh #toi-uu

---

## 💡 Ý chính

Mọi [[bien-doi-diem]] `s = T(r)` đều có thể **nén thành một mảng 256 phần tử**:

```
LUT[r] = T(r)   với r = 0..255
```

Sau đó xử lý cả ảnh chỉ còn là: `output[i] = LUT[input[i]]`.

| | Không LUT | Có LUT |
|---|---|---|
| Ảnh `4000×3000` | **12 triệu** lần tính `r^0.45` | **256** lần tính + 12 triệu lần **tra mảng** |
| Chi phí mỗi pixel | Một phép luỹ thừa (chậm) | Một phép truy cập bộ nhớ (rất nhanh) |

Tăng tốc thực tế **hàng chục đến hàng trăm lần**, mà kết quả **giống hệt** — đây là tối ưu hiếm hoi không phải đánh đổi gì.

## 🧩 Vì sao trick này chạy được

Điều kiện duy nhất: **miền đầu vào phải hữu hạn và nhỏ**. Ảnh 8-bit có đúng 256 giá trị → bảng 256 dòng là đủ **phủ hết mọi trường hợp**.

Ngược lại, ảnh `double` hay 16-bit thì miền quá lớn (65.536 dòng còn được, còn số thực thì vô hạn) → LUT không dùng được trực tiếp.

Và LUT **chỉ áp dụng cho biến đổi điểm**. Phép lân cận như [[tich-chap-2d]] có đầu vào là cả một cửa sổ pixel → không có bảng nào phủ nổi.

## ⚙️ Ứng dụng

- **Chồng nhiều phép thành một.** Negative → gamma → kéo giãn tương phản: thay vì quét ảnh 3 lần, **gộp cả 3 vào một LUT** rồi quét 1 lần. Vừa nhanh gấp 3 vừa tránh kẹp giá trị ở các bước trung gian, xem [[tran-so-anh]].
- **Colormap** — LUT `256×3` biến ảnh xám thành ảnh màu giả. Chính là [[pseudocolor]] và cũng chính là cơ chế ảnh indexed ở [[kieu-anh-va-do-sau-bit]].
- **Chỉnh màu thời gian thực.** Bộ lọc trên điện thoại, bảng màu trong phần mềm dựng phim (color grading LUT 3D) — cùng ý tưởng, mở rộng lên 3 chiều RGB.
- Phần cứng màn hình có LUT riêng → đổi gamma màn hình **không cần đụng tới dữ liệu ảnh**.

## ⚠️ Điều dễ nhầm

- **LUT không làm thay đổi kết quả, chỉ đổi tốc độ.** Nếu ảnh sau khi dùng LUT khác với tính trực tiếp thì là **lỗi làm tròn khi dựng bảng**, không phải bản chất của LUT.
- **Dựng bảng phải kẹp ngay trong bảng.** Tính `LUT[r]` ở `double` rồi kẹp về `[0,255]` **một lần lúc dựng** — sạch hơn nhiều so với kẹp ở từng pixel.
- LUT là ánh xạ **một-một theo giá trị**, nên **không đảo ngược được** nếu `T` dồn nhiều `r` về cùng một `s`.

---

## 🔗 Liên kết
- **Tiền đề:** [[bien-doi-diem]] · [[bien-doi-tung-khuc]]
- **Dẫn tới:** [[histogram-anh]]
- **Liên quan:** [[pseudocolor]] · [[kieu-anh-va-do-sau-bit]] · [[gamma-correction]]

## ❓ Câu hỏi mở
- LUT 3D cho color grading có `256³` ô — quá lớn, thực tế người ta nén thế nào?

## 📚 Nguồn
- Lecture 6 — Gray-Level Transformations, Histogram, Neighborhood
