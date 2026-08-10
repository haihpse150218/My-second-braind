---
slug: mo-hinh-mau-hsv
title: HSV / HSI — tách màu khỏi độ sáng
vault: ivp
type: concept
branch: I
order: 3
status: learning
tags: [ivp, mau]
prev: [cmyk-va-mau-tru]
next: [ycbcr]
related: [mo-hinh-mau-rgb, can-bang-histogram]
sources: ["L11 — Color Image Processing"]
created: 2026-08-10
---

# HSV / HSI — tách màu khỏi độ sáng

> Tóm tắt 1 câu: mô tả màu theo cách **con người nói về màu** — "đỏ, hơi nhạt, khá sáng" — và quan trọng hơn: nó **tách độ sáng ra một kênh riêng**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh I · #3 ← cần [[cmyk-va-mau-tru]] · → kế tiếp [[ycbcr]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #mau

---

## 💡 Ba thành phần

| Kênh | Tên | Ý nghĩa | Miền |
|---|---|---|---|
| **H** | Hue — tông màu | *Màu gì*: đỏ, cam, lục… | `0°..360°` (**vòng tròn**) |
| **S** | Saturation — độ bão hoà | *Đậm hay nhạt*: `0` = xám, `1` = rực | `0..1` |
| **V** | Value — độ sáng | *Sáng hay tối* | `0..1` |

Biến thể: **HSI** (Intensity `= (R+G+B)/3`), **HSL** (Lightness). Cùng ý tưởng, khác cách định nghĩa kênh sáng.

## 🧩 Vì sao đây là mô hình đáng dùng nhất trong xử lý ảnh

Nhớ nhược điểm cốt lõi của [[mo-hinh-mau-rgb]]: ba kênh **tương quan mạnh**, sáng lên thì cả ba cùng tăng.

HSV giải quyết dứt điểm: **thông tin màu nằm ở H và S, thông tin sáng nằm ở V** — độc lập nhau.

| Việc | RGB | HSV |
|---|---|---|
| Tìm "mọi pixel màu cam" | Phải liệt kê **hàng nghìn** bộ `(R,G,B)` cho mọi mức sáng | **Một khoảng H** duy nhất, bất kể sáng tối |
| Tăng sáng giữ nguyên màu | Chỉnh 3 kênh, dễ lệch tông | Chỉ chỉnh **V** |
| Equalize ảnh màu | Từng kênh RGB → **phá màu** | Equalize **V**, giữ nguyên H và S ✅ |
| Bỏ qua bóng đổ | Bóng làm RGB đổi mạnh | Bóng chủ yếu đổi **V**, H gần như giữ nguyên |

> 📌 **Quy tắc thực hành:** mọi phép tăng cường độ sáng/tương phản trên ảnh màu ([[can-bang-histogram]], [[clahe]], [[gamma-correction]]) nên làm trên **kênh V (hoặc L)**, rồi ghép lại. Áp thẳng lên từng kênh RGB gần như luôn làm lệch màu.

## ⚠️ Hue là góc — hệ quả quan trọng

`H` nằm trên **vòng tròn**: `0°` và `359°` là hai màu đỏ **gần như giống hệt nhau**, dù chênh nhau 359 đơn vị.

Hệ quả thực tế:

- **Không lấy trung bình H theo cách thông thường.** Trung bình của `10°` và `350°` bằng `180°` — ra **màu lục lam**, trong khi cả hai đều là đỏ. Phải dùng trung bình vòng (qua vector đơn vị).
- **Dò màu đỏ cần HAI khoảng** `[0°,10°]` và `[350°,360°]`, vì đỏ nằm vắt qua điểm nối.
- Làm mờ trực tiếp kênh H sinh màu giả ở chỗ vòng qua `0°`.

## ⚠️ Điều dễ nhầm khác

- **H vô nghĩa khi S ≈ 0.** Pixel xám không có tông màu; giá trị H lúc đó là **nhiễu thuần tuý**. Lọc theo H phải luôn kèm điều kiện `S > ngưỡng`, nếu không sẽ bắt nhầm hàng loạt pixel xám.
- **H cũng không ổn định khi V ≈ 0** (quá tối) hoặc `V ≈ 1` (cháy sáng).
- **HSV không phải không gian đồng đều cảm nhận.** Cách nhau `10°` ở vùng lục mắt gần như không thấy, ở vùng đỏ-cam thì thấy rõ. Muốn **đo khác biệt màu** đúng thì dùng CIELAB, xem [[gamut-va-quan-ly-mau]].
- **Chuyển đổi RGB↔HSV có chi phí** và không hoàn toàn không mất mát khi làm tròn về `uint8`.

---

## 🔗 Liên kết
- **Tiền đề:** [[mo-hinh-mau-rgb]] · [[cmyk-va-mau-tru]]
- **Dẫn tới:** [[ycbcr]] · [[gamut-va-quan-ly-mau]]
- **Liên quan:** [[can-bang-histogram]] · [[clahe]] · [[nguong-hoa]]

## ❓ Câu hỏi mở
- Phân đoạn theo màu da dùng HSV hay YCbCr tốt hơn, và vì sao?

## 📚 Nguồn
- Lecture 11 — Color Image Processing
