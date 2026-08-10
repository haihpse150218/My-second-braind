---
slug: luong-tu-hoa-anh
title: Lượng tử hoá ảnh
vault: ivp
type: concept
branch: B
order: 3
status: learning
tags: [ivp, so-hoa]
prev: [lay-mau-anh]
next: [aliasing-anh]
related: [kieu-anh-va-do-sau-bit, histogram-anh]
sources: ["L4 — Image Sensing & Acquisition"]
created: 2026-08-10
---

# Lượng tử hoá ảnh

> Tóm tắt 1 câu: rời rạc hoá **giá trị** — ép độ sáng liên tục về `L = 2^m` mức, và mức càng ít thì càng lộ những **dải màu giả** không có ngoài đời.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B · #3 ← cần [[lay-mau-anh]] · → kế tiếp [[aliasing-anh]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #so-hoa

---

## 💡 Ý chính

$$
L = 2^{m}
$$

| `m` (bit) | `L` (số mức) | Nhìn ra sao |
|---|---|---|
| 1 | 2 | Ảnh nhị phân — chỉ đen/trắng |
| 4 | 16 | Thấy rõ **dải màu bậc thang** ở vùng chuyển sáng |
| **8** | **256** | Mắt người gần như không phân biệt được với liên tục |
| 12–14 | 4096–16384 | Ảnh RAW, ảnh y tế — dư địa để chỉnh sáng mà không vỡ |

8 bit là chuẩn phổ biến vì mắt người chỉ phân biệt được khoảng **vài chục mức xám** trong một cảnh — 256 là đã dư.

## 🧩 False contouring — triệu chứng đặc trưng

Giảm mức xám quá tay thì vùng **chuyển sáng mượt** (bầu trời, da người, bóng đổ) biến thành các **mảng phẳng có viền rõ** — như bản đồ đường đồng mức. Gọi là **false contouring** (đường viền giả).

Mấu chốt để nhận ra: viền này **không tồn tại trong cảnh thật**, nó do lượng tử hoá đẻ ra. Cùng lỗi này còn xuất hiện khi [[can-bang-histogram]] kéo giãn quá mạnh một dải hẹp.

Vùng chi tiết rối (cỏ, tóc, texture) thì **không** lộ contouring, vì nhiễu tự nhiên đóng vai trò dithering che đi.

## ⚙️ Khi nào cần quan tâm

- **Ảnh y tế / vệ tinh** giữ 12–16 bit vì thông tin chẩn đoán nằm ở chênh lệch rất nhỏ mà 8 bit gộp mất.
- **Chỉnh sáng mạnh** (gamma, kéo giãn tương phản) nên làm trên ảnh nhiều bit rồi mới hạ xuống 8 bit — làm ngược lại là kéo giãn chính những khoảng trống do lượng tử hoá tạo ra.
- **Giảm số mức có chủ đích** dùng để phân đoạn thô hoặc tạo hiệu ứng poster.

## ⚠️ Điều dễ nhầm

- **Lượng tử hoá ≠ lấy mẫu.** Giảm pixel làm ảnh *vỡ hạt*; giảm mức xám làm ảnh *phân dải*. Nhìn triệu chứng là biết đã mất cái gì.
- **Ảnh 8-bit không "chính xác tới 1/255".** Sai số lượng tử hoá là `±0,5` mức — cộng dồn qua nhiều phép biến đổi liên tiếp sẽ thành thấy được. Đây là lý do phải tính ở `double` như [[kieu-du-lieu-anh]] nói.
- **Số mức xám của file ≠ số mức thực tế có trong ảnh.** Ảnh chụp thiếu sáng lưu 8-bit nhưng thực chất chỉ dùng mức `0..60` — histogram sẽ cho thấy điều đó ngay, xem [[histogram-anh]].

---

## 🔗 Liên kết
- **Tiền đề:** [[lay-mau-anh]]
- **Dẫn tới:** [[aliasing-anh]] · [[histogram-anh]]
- **Liên quan:** [[kieu-anh-va-do-sau-bit]] · [[can-bang-histogram]]

## ❓ Câu hỏi mở
- Thêm một chút nhiễu **trước** khi lượng tử hoá (dithering) lại làm ảnh trông đẹp hơn — vì sao thêm nhiễu lại cải thiện?

## 📚 Nguồn
- Lecture 4 — Image Sensing & Acquisition
