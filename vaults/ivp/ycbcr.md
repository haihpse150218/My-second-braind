---
slug: ycbcr
title: YCbCr & YIQ — không gian màu của video
vault: ivp
type: concept
branch: I
order: 4
status: learning
tags: [ivp, mau, video]
prev: [mo-hinh-mau-hsv]
next: [gamut-va-quan-ly-mau]
related: [mo-hinh-mau-hsv, kieu-anh-va-do-sau-bit]
sources: ["L11 — Color Image Processing"]
created: 2026-08-10
---

# YCbCr & YIQ — không gian màu của video

> Tóm tắt 1 câu: tách **độ chói (Y)** khỏi **thông tin màu (Cb, Cr)** — ra đời để tương thích TV đen trắng, ở lại vì nó cho phép **nén màu mạnh mà mắt không thấy**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh I · #4 ← cần [[mo-hinh-mau-hsv]] · → kế tiếp [[gamut-va-quan-ly-mau]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #mau #video

---

## 💡 Ý chính

$$
Y = 0.299R + 0.587G + 0.114B
$$

| Kênh | Là gì |
|---|---|
| **Y** — luminance | **Độ chói** — chính là ảnh xám |
| **Cb** | Hiệu màu lam `≈ B − Y` |
| **Cr** | Hiệu màu đỏ `≈ R − Y` |

Trọng số `0.299 / 0.587 / 0.114` **không tuỳ tiện**: chúng phản ánh độ nhạy của mắt người — nhạy nhất với lục, kém nhất với lam. Đây cũng chính là công thức chuyển RGB sang ảnh xám ở [[kieu-anh-va-do-sau-bit]].

## 🧩 Nguồn gốc lịch sử — và vì sao nó vẫn còn

TV màu ra đời khi hàng triệu TV **đen trắng** đang dùng. Yêu cầu: tín hiệu mới phải để TV cũ xem được.

Lời giải: phát **Y** như tín hiệu chính (TV đen trắng nhận đúng cái nó cần), rồi **chèn thêm** Cb, Cr cho TV màu. Tương thích ngược hoàn hảo.

Đó là lý do **ra đời**. Nhưng lý do **ở lại** quan trọng hơn:

> 📌 **Mắt người nhạy với chi tiết ĐỘ SÁNG hơn nhiều so với chi tiết MÀU.**

Nên có thể **giảm độ phân giải kênh màu** mà mắt gần như không nhận ra — gọi là **chroma subsampling**:

| Ký hiệu | Nghĩa | Tiết kiệm |
|---|---|---|
| `4:4:4` | Không giảm | 0% |
| `4:2:2` | Cb, Cr giảm **một nửa theo chiều ngang** | ~33% |
| `4:2:0` | Cb, Cr giảm **nửa cả hai chiều** | **~50%** |

`4:2:0` là chuẩn của **JPEG, MPEG, H.264, H.265** — tức là gần như mọi ảnh và video bạn từng xem. Một nửa dữ liệu màu bị vứt bỏ trước cả khi nén, và không ai nhận ra.

Không gian RGB **không cho phép làm điều này**, vì cả ba kênh đều chứa thông tin độ sáng — giảm bất kỳ kênh nào cũng làm mất chi tiết thấy được. Đây là lợi ích thực tế lớn nhất của việc tách chói khỏi màu.

**YIQ** là bản analog cũ hơn (chuẩn NTSC), cùng nguyên lý.

## ⚙️ Ứng dụng trong xử lý ảnh

- **Xử lý trên kênh Y** như xử lý ảnh xám, rồi ghép lại → giữ nguyên màu. Cùng lợi ích như kênh V của [[mo-hinh-mau-hsv]], nhưng chuyển đổi là **tuyến tính** nên nhanh hơn và đảo ngược chính xác.
- **Phát hiện da người** — vùng da tụ thành cụm chặt trong mặt phẳng `(Cb, Cr)`, khá độc lập với sắc tộc và độ sáng. Đây là một trong những phương pháp phát hiện da cổ điển đơn giản mà hiệu quả nhất.
- **Nén** — bước đầu tiên của JPEG là chuyển RGB → YCbCr.

## ⚠️ Điều dễ nhầm

- **Nhiều chuẩn YCbCr khác nhau** (BT.601 cho SD, BT.709 cho HD, BT.2020 cho UHD) với hệ số khác nhau. Dùng sai chuẩn thì màu lệch nhẹ — nguyên nhân kinh điển của video "hơi ngả xanh".
- **Có "full range" (`0..255`) và "limited range" (`16..235`)**. Nhầm hai loại thì ảnh mất tương phản hoặc bị kẹp đen/trắng.
- **YCbCr tuyến tính với RGB, HSV thì không.** Điều đó làm YCbCr dễ tính hơn nhưng **kém trực quan hơn** khi mô tả màu bằng lời.
- **Chroma subsampling làm hỏng cạnh màu sắc nét** — chữ đỏ trên nền lam trong video nén trông nhoè viền. Đây là artifact thật, không phải cảm giác.

---

## 🔗 Liên kết
- **Tiền đề:** [[mo-hinh-mau-hsv]] · [[mo-hinh-mau-rgb]]
- **Dẫn tới:** [[gamut-va-quan-ly-mau]]
- **Liên quan:** [[kieu-anh-va-do-sau-bit]] · [[lay-mau-anh]]

## ❓ Câu hỏi mở
- Chroma subsampling `4:2:0` có làm giảm độ chính xác của model phân loại ảnh không?

## 📚 Nguồn
- Lecture 11 — Color Image Processing
