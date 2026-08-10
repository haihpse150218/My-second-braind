---
slug: bien-doi-diem
title: Biến đổi điểm — s = T(r)
vault: ivp
type: concept
branch: D
order: 1
status: learning
tags: [ivp, enhancement]
prev: [noi-suy-anh]
next: [anh-am-ban]
related: [lut-bang-tra, histogram-anh]
sources: ["L6 — Gray-Level Transformations, Histogram, Neighborhood"]
created: 2026-08-10
---

# Biến đổi điểm — s = T(r)

> Tóm tắt 1 câu: giá trị mới của một pixel **chỉ phụ thuộc giá trị cũ của chính nó** — không nhìn hàng xóm, không quan tâm nó nằm ở đâu.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #1 ← cần [[noi-suy-anh]] · → kế tiếp [[anh-am-ban]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #enhancement

---

## 💡 Ý chính

$$
s = T(r)
$$

`r` = mức xám vào, `s` = mức xám ra, `T` = một hàm bất kỳ từ `[0,255]` sang `[0,255]`.

**Đây là họ phép xử lý đơn giản nhất, và đặc điểm định nghĩa nó là chữ "điểm":**

| Nhóm phép | Nhìn vào bao nhiêu pixel | Ví dụ |
|---|---|---|
| **Điểm** (point) | **1** — chính nó | Gamma, negative, ngưỡng hoá |
| **Lân cận** (neighborhood/local) | Một cửa sổ nhỏ | Làm mờ, dò biên — xem [[tich-chap-2d]] |
| **Nhiều ảnh** | Nhiều ảnh cùng toạ độ | Trừ frame, trung bình — xem [[phep-toan-so-hoc-anh]] |

Ba nhóm này phủ hết mọi phép xử lý miền không gian.

## 🧩 Hệ quả của "chỉ nhìn chính nó"

Vì `T` không biết pixel nằm ở đâu, biến đổi điểm **không thể**:
- làm mờ hay làm sắc nét (cần biết hàng xóm),
- khử nhiễu muối tiêu (một pixel trắng giữa vùng đen vẫn hợp lệ với `T`),
- phát hiện biên (biên là chuyện **chênh lệch giữa** các pixel).

Đổi lại nó **cực nhanh** (mỗi pixel một phép tra bảng) và **hoàn toàn tra cứu được** — xem [[lut-bang-tra]].

## 🔢 Dạng tuyến tính

$$
s = c \cdot r + b
$$

| Tham số | Điều khiển | Tác dụng lên histogram |
|---|---|---|
| `c` (hệ số) | **Tương phản** | Kéo **giãn** hoặc nén bề rộng |
| `b` (offset) | **Độ sáng** | **Dịch** trái/phải |

Đây chính là cách nhìn thứ hai về [[phep-toan-so-hoc-anh]]: cộng scalar = chỉnh `b`, nhân scalar = chỉnh `c`.

**Autocontrast** (kéo giãn tương phản) là trường hợp riêng: chọn `c`, `b` sao cho `r_min → 0` và `r_max → 255`:

$$
s = \frac{L-1}{r_{\max} - r_{\min}}\,(r - r_{\min})
$$

## ⚙️ Vì sao hàm phi tuyến lại cần

Mắt người cảm nhận độ sáng theo kiểu **gần logarit** — phân biệt `10` với `20` dễ hơn nhiều so với `200` với `210` dù chênh lệch tuyệt đối bằng nhau. Nên hàm `T` tuyến tính "công bằng về số học" lại **không công bằng về thị giác**. Đó là lý do có [[bien-doi-log]] và [[gamma-correction]].

## ⚠️ Điều dễ nhầm

- **Biến đổi điểm không đảo ngược được nếu `T` không đơn ánh.** Ngưỡng hoá dồn cả trăm mức xám về `0` → không có đường về.
- **Cùng một `T` cho kết quả khác nhau trên hai ảnh khác nhau.** Vì thế nên đọc [[histogram-anh]] trước rồi mới chọn `T`, thay vì áp một công thức cố định.
- `T` được áp **độc lập cho từng pixel** nên song song hoá hoàn hảo — nhưng cũng có nghĩa nó **không thể** sửa được lỗi mang tính cục bộ như chiếu sáng không đều. Cái đó cần [[clahe]] hoặc [[top-hat]].

---

## 🔗 Liên kết
- **Tiền đề:** [[noi-suy-anh]] · [[phep-toan-so-hoc-anh]]
- **Dẫn tới:** [[anh-am-ban]] · [[bien-doi-log]] · [[gamma-correction]]
- **Liên quan:** [[lut-bang-tra]] · [[histogram-anh]] · [[tich-chap-2d]]

## ❓ Câu hỏi mở
- Có phép biến đổi điểm nào mà mắt người coi là "trung tính" (không thấy ảnh bị chỉnh) không?

## 📚 Nguồn
- Lecture 6 — Gray-Level Transformations, Histogram, Neighborhood
