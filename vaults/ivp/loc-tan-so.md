---
slug: loc-tan-so
title: Lọc trong miền tần số
vault: ivp
type: concept
branch: E
order: 11
status: learning
tags: [ivp, tan-so, loc]
prev: [dinh-ly-tich-chap]
next: [loc-nguoc]
related: [fourier-2d, nhieu-anh]
sources: ["L7 — Image Restoration"]
created: 2026-08-10
---

# Lọc trong miền tần số

> Tóm tắt 1 câu: nhân phổ ảnh với một mặt nạ — và **hình dạng cạnh của mặt nạ** quan trọng ngang với việc nó cắt ở đâu.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #11 ← cần [[dinh-ly-tich-chap]] · → kế tiếp [[loc-nguoc]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #tan-so #loc

---

## 💡 Bốn họ bộ lọc

| Họ | Giữ lại | Dùng để |
|---|---|---|
| **Thông thấp** (low-pass) | Tần số **thấp** | Làm mờ, khử nhiễu |
| **Thông cao** (high-pass) | Tần số **cao** | Làm nét, làm nổi cạnh |
| **Band-reject** | Mọi thứ **trừ** một vành tần số | Khử nhiễu tuần hoàn phân bố đều mọi hướng |
| **Notch** | Mọi thứ **trừ** vài điểm cụ thể | ⭐ Khử nhiễu tuần hoàn **chính xác nhất** |

`H(u,v)` chỉ phụ thuộc **khoảng cách tới tâm** `D(u,v) = √(u²+v²)`, nên bộ lọc là các **vành tròn đồng tâm**.

## 🧩 Ba dạng cạnh — và vì sao "lý tưởng" lại tệ nhất

| Dạng | `H(u,v)` | Kết quả |
|---|---|---|
| **Ideal** | `1` nếu `D ≤ D₀`, `0` nếu không | ⚠️ **Ringing** rất nặng |
| **Butterworth** bậc `n` | `1 / (1 + (D/D₀)^{2n})` | Chuyển tiếp mượt, **kiểm soát được** bằng `n` |
| **Gaussian** | `e^{-D²/2D₀²}` | Mượt nhất, **không ringing** |

> 🚨 **Bộ lọc "lý tưởng" cho kết quả tệ nhất** — cái tên chỉ nói nó lý tưởng về mặt *cắt tần số*, không phải về mặt *ảnh đẹp*.

**Vì sao ringing:** cắt dứt khoát trong miền tần số ⇔ tích chập với hàm **sinc** trong miền không gian. Sinc dao động và có đuôi dài vô hạn → mỗi cạnh trong ảnh sinh ra **các gợn sóng sáng-tối lan ra xung quanh**.

Đây là hệ quả trực tiếp của [[dinh-ly-tich-chap]], và là bài học tổng quát: **chuyển tiếp gắt ở miền này = dao động ở miền kia.**

Butterworth với `n` nhỏ thì rất mượt; `n → ∞` thì tiến về ideal và ringing quay lại. Núm `n` chính là núm chỉnh mức đánh đổi giữa "cắt dứt khoát" và "không gợn".

## ⚙️ Notch filter — khử nhiễu tuần hoàn

Ứng dụng đắt giá nhất của miền tần số, vì miền không gian **hoàn toàn bó tay** với loại nhiễu này.

1. Xem phổ (đã lấy log) → nhiễu tuần hoàn hiện thành **vài đốm sáng rời rạc**, luôn **đối xứng từng cặp qua tâm**.
2. Đặt `H = 0` tại đúng các đốm đó (và cặp đối xứng của chúng), `H = 1` ở mọi nơi khác.
3. Biến đổi ngược → sọc nhiễu biến mất, ảnh gần như không bị đụng tới.

Hiệu quả gần như hoàn hảo vì nhiễu tuần hoàn **gom toàn bộ năng lượng vào vài điểm**, trong khi ảnh thật trải năng lượng khắp phổ.

⚠️ Phải xoá **cả cặp đối xứng** — bỏ sót một nửa thì kết quả ra ảnh phức, phần ảo không triệt tiêu.

## ⚠️ Điều dễ nhầm

- **`D₀` nhỏ = mờ nhiều.** Giữ ít tần số hơn nghĩa là bỏ nhiều chi tiết hơn. Dễ nhớ ngược.
- **Lọc tần số và lọc không gian là cùng một việc.** Không có phép nào chỉ làm được ở một miền — trừ khi phi tuyến. Chọn miền là chọn theo **tiện lợi và tốc độ**, không phải theo khả năng.
- **Phải đệm 0 trước khi FFT**, nếu không dính tích chập vòng và có viền lạ ở bốn mép.
- Nhìn phổ mà thấy **hình chữ thập sáng** đi qua tâm thì thường là **artifact do mép ảnh không liền**, không phải cấu trúc thật trong ảnh.

---

## 🔗 Liên kết
- **Tiền đề:** [[dinh-ly-tich-chap]] · [[fourier-2d]]
- **Dẫn tới:** [[loc-nguoc]] · [[wiener-filter]]
- **Liên quan:** [[nhieu-anh]] · [[loc-lam-min]] · [[lam-sac-net]]

## ❓ Câu hỏi mở
- Với nhiễu tuần hoàn không hoàn toàn tuần hoàn (tần số trôi theo thời gian), notch còn dùng được không?

## 📚 Nguồn
- Lecture 7 — Image Restoration
