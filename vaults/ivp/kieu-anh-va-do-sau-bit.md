---
slug: kieu-anh-va-do-sau-bit
title: Kiểu ảnh & độ sâu bit
vault: ivp
type: concept
branch: A
order: 2
status: learning
tags: [ivp, co-ban]
prev: [anh-so-la-gi]
next: [kieu-du-lieu-anh]
related: [luong-tu-hoa-anh, mo-hinh-mau-rgb]
sources: ["L2 — Image Processing Basics"]
created: 2026-08-10
---

# Kiểu ảnh & độ sâu bit

> Tóm tắt 1 câu: bốn kiểu ảnh (nhị phân · xám · màu · indexed) khác nhau ở **số bit dành cho mỗi pixel**, và chọn sai kiểu là tự tay vứt thông tin hoặc phí bộ nhớ.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #2 ← cần [[anh-so-la-gi]] · → kế tiếp [[kieu-du-lieu-anh]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #co-ban

---

## 💡 Ý chính

| Kiểu | Bit/pixel | Giá trị | Dùng khi |
|---|---|---|---|
| **Nhị phân** (binary) | 1 | `0` hoặc `1` | Sau [[nguong-hoa]]; đầu vào bắt buộc của [[hinh-thai-hoc]] |
| **Xám** (grayscale) | 8 | `0..255` | Hầu hết xử lý cổ điển — hình dạng quan trọng hơn màu |
| **Màu RGB** | 24 (3×8) | 3 kênh `0..255` | Khi màu mang thông tin (da, biển báo, y tế) |
| **Indexed** | 8 + bảng màu | chỉ số → LUT | Ảnh ≤256 màu (GIF), pseudocolor |

**Indexed** là ý tưởng đáng chú ý nhất: thay vì lưu 3 byte màu ở mỗi pixel, ta lưu **1 byte chỉ số** trỏ vào một **bảng màu (colormap/LUT)** 256 dòng. Ảnh nhẹ đi 3 lần, đổi lại chỉ dùng được 256 màu khác nhau.

## 🧩 Trực giác

Indexed image giống **tranh tô màu theo số**: bức tranh chỉ ghi "vùng này số 7", còn số 7 là màu gì thì tra ở bảng chú thích bên cạnh. Đổi bảng chú thích → cả bức tranh đổi màu mà không đụng tới một pixel nào. Đây chính là cơ chế của [[pseudocolor]].

## 🔢 Kích thước bộ nhớ

$$
\text{Bytes} = M \times N \times \frac{\text{bpp}}{8}
$$

Ảnh `1024×768`: nhị phân ≈ **96 KB** · xám ≈ **768 KB** · RGB ≈ **2,25 MB**. Đúng tỉ lệ 1 : 8 : 24.

## ⚙️ Khi nào dùng

- **Chuyển sang xám trước** khi làm edge detection / morphology — vừa nhanh gấp 3, vừa tránh chuyện "biên ở kênh R lệch biên ở kênh B".
- **Giữ màu** khi màu chính là đặc trưng phân biệt (phân loại quả chín/xanh, phát hiện da người).
- **Nhị phân hoá** chỉ khi hình dạng quan trọng hơn texture — xem [[nguong-hoa]].

## ⚠️ Điều dễ nhầm

- **Nén (lossy/lossless) không phải kiểu ảnh.** JPEG/PNG là *định dạng file*; khi đã `imread` vào bộ nhớ thì cả hai đều thành ma trận `uint8` như nhau. Mất mát của JPEG xảy ra lúc **ghi file**, không phải lúc xử lý.
- **Raster vs Vector** là chuyện khác nữa: raster (bitmap) là lưới pixel — phóng to thì vỡ; vector là **lệnh vẽ** — phóng to bao nhiêu cũng nét. Ảnh chụp luôn là raster; DIP chỉ làm việc trên raster.
- Chuyển RGB → xám **không phải trung bình 3 kênh**. Công thức chuẩn có trọng số theo cảm nhận của mắt (xanh lá sáng nhất): `0.299R + 0.587G + 0.114B`.

---

## 🔗 Liên kết
- **Tiền đề:** [[anh-so-la-gi]]
- **Dẫn tới:** [[kieu-du-lieu-anh]]
- **Liên quan:** [[luong-tu-hoa-anh]] · [[mo-hinh-mau-rgb]] · [[pseudocolor]] · [[lut-bang-tra]]

## ❓ Câu hỏi mở
- Vì sao hệ số kênh xanh lá (0.587) lớn hơn hẳn hai kênh còn lại?

## 📚 Nguồn
- Lecture 2 — Image Processing Basics
