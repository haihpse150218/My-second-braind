---
slug: gamma-correction
title: Gamma correction (power-law)
vault: ivp
type: concept
branch: D
order: 4
status: learning
tags: [ivp, enhancement]
prev: [bien-doi-log]
next: [bien-doi-tung-khuc]
related: [bien-doi-log, lut-bang-tra]
sources: ["L6 — Gray-Level Transformations, Histogram, Neighborhood"]
created: 2026-08-10
---

# Gamma correction (power-law)

> Tóm tắt 1 câu: `s = c·r^γ` — **một** con số `γ` điều khiển toàn bộ đường cong sáng/tối, và nó có mặt trong mọi màn hình bạn đang nhìn.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #4 ← cần [[bien-doi-log]] · → kế tiếp [[bien-doi-tung-khuc]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #enhancement

---

## 💡 Ý chính

$$
s = c \cdot r^{\gamma}
$$

Với `r` đã chuẩn hoá về `[0,1]`:

| `γ` | Đường cong | Ảnh trở nên | Dùng khi |
|---|---|---|---|
| `γ < 1` (vd 0,4) | **Cong lên** trên đường chéo | **Sáng hơn**, giãn vùng tối | Ảnh thiếu sáng (underexposed) |
| `γ = 1` | Đường chéo | Không đổi | — |
| `γ > 1` (vd 2,2) | **Cong xuống** | **Tối hơn**, giãn vùng sáng | Ảnh dư sáng (overexposed) |

Mẹo nhớ: `0.5^0.4 ≈ 0.76` (sáng lên) còn `0.5^2.2 ≈ 0.22` (tối đi). **`γ` nhỏ → ảnh sáng.**

## 🧩 Vì sao gọi là "correction" — hai chữ gamma khác nhau

Đây là chỗ hay rối:

**1. Gamma của thiết bị.** Màn hình CRT có quan hệ **phi tuyến** giữa điện áp vào và độ sáng ra, xấp xỉ `L ∝ V^2.2`. Đưa tín hiệu tuyến tính vào thì ảnh hiện ra **tối hơn thực tế**.

**2. Gamma correction.** Để bù, người ta mã hoá ảnh sẵn với `γ ≈ 1/2.2 ≈ 0.45`. Hai cái nhân nhau ra `≈ 1` → màn hình hiển thị đúng.

> 📌 Hệ quả rất đáng nhớ: **ảnh JPEG bạn có trong máy KHÔNG tuyến tính với ánh sáng thật.** Giá trị `128` không phải "một nửa số photon của 255", mà khoảng **22%**. Nên mọi phép tính vật lý nghiêm túc (trộn ánh sáng, tính phơi sáng) phải **khử gamma về tuyến tính trước**.

Màn LCD ngày nay không có đặc tính vật lý đó nữa nhưng vẫn **giả lập gamma 2.2** để tương thích ngược với toàn bộ kho ảnh của thế giới.

## ⚙️ Vì sao gamma lại hợp với mắt người

Ngẫu nhiên may mắn: mắt người cũng nhạy phi tuyến theo kiểu gần luỹ thừa. Nên mã hoá gamma **vừa bù thiết bị vừa phân bổ bit hợp lý** — dành nhiều mức lượng tử cho vùng tối (nơi mắt tinh) và ít mức cho vùng sáng (nơi mắt kém tinh).

Đây là lý do 8 bit là đủ cho ảnh thường: nếu lưu tuyến tính thì 8 bit sẽ lộ [[luong-tu-hoa-anh|false contouring]] ngay ở vùng tối.

## ⚠️ Điều dễ nhầm

- **Phải chuẩn hoá `r` về `[0,1]` trước khi luỹ thừa.** Làm trên `[0,255]` thì `200^0.4 ≈ 8` — ảnh đen kịt. Đây là lỗi cài đặt phổ biến nhất; hệ số `c` phải chọn lại cho khớp dải, xem [[tran-so-anh]].
- **`γ` nhỏ làm sáng — dễ nhớ ngược.** Cứ nhớ `γ < 1` là "căn bậc", mà căn của số nhỏ hơn 1 thì lớn hơn chính nó.
- **Gamma khuếch đại nhiễu vùng tối** giống [[bien-doi-log]], chỉ nhẹ hơn.
- Trên ảnh màu, áp gamma **cho cả 3 kênh với cùng `γ`** thì giữ được tông màu; áp khác nhau từng kênh là đang chỉnh **cân bằng trắng**, việc khác.

---

## 🔗 Liên kết
- **Tiền đề:** [[bien-doi-log]] · [[bien-doi-diem]]
- **Dẫn tới:** [[bien-doi-tung-khuc]]
- **Liên quan:** [[lut-bang-tra]] · [[luong-tu-hoa-anh]] · [[tran-so-anh]]

## ❓ Câu hỏi mở
- Nếu ảnh sRGB phi tuyến, thì CNN huấn luyện trên ảnh sRGB đang học trên thang đo nào — và điều đó có quan trọng không?

## 📚 Nguồn
- Lecture 6 — Gray-Level Transformations, Histogram, Neighborhood
