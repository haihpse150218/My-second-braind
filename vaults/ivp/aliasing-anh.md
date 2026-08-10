---
slug: aliasing-anh
title: Aliasing trong ảnh
vault: ivp
type: concept
branch: B
order: 4
status: learning
tags: [ivp, so-hoa, bay]
prev: [luong-tu-hoa-anh]
next: [phep-toan-so-hoc-anh]
related: [lay-mau-anh, loc-lam-min, noi-suy-anh]
sources: ["L4 — Image Sensing & Acquisition"]
created: 2026-08-10
---

# Aliasing trong ảnh

> Tóm tắt 1 câu: lấy mẫu thưa hơn `2×` tần số cao nhất thì chi tiết nhỏ **không mờ đi mà hoá trang thành chi tiết to giả** — và không có cách nào gỡ ra sau đó.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B · #4 ← cần [[luong-tu-hoa-anh]] · → kế tiếp [[phep-toan-so-hoc-anh]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #so-hoa #bay

---

## 💡 Ý chính

**Điều kiện Nyquist–Shannon:**

$$
f_s \;\ge\; 2 f_{\max}
$$

| Ký hiệu | Ý nghĩa trong ảnh |
|---|---|
| `f_s` | Tần số lấy mẫu = **mật độ pixel** |
| `f_max` | Chi tiết **mảnh nhất** có trong cảnh |

Vi phạm điều kiện này → **aliasing**: tần số cao bị "gập" xuống và **giả dạng thành tần số thấp**.

Chữ *alias* nghĩa là **bí danh** — chi tiết thật đội lốt một chi tiết khác. Đó là lý do lỗi này nguy hiểm hơn mờ ảnh: **mờ thì biết là mất, aliasing thì tưởng là có.**

## 🧩 Nhận ra bằng mắt

| Hiện tượng | Ở đâu |
|---|---|
| **Vân moiré** — sóng màu cầu vồng | Chụp áo kẻ sọc nhỏ, màn hình, mái ngói xa |
| Hàng rào/lưới hoá thành **sọc to** hoàn toàn khác | Ảnh thu nhỏ |
| Bánh xe quay **ngược chiều** trong phim | Aliasing theo **thời gian** — cùng một hiện tượng |

Vụ bánh xe quay ngược là ví dụ dễ thấm nhất: bánh xe quay nhanh hơn tốc độ ghi hình, mắt (và máy) suy ra một chuyển động chậm hoàn toàn sai — nhưng **hoàn toàn nhất quán**, nên không ai nghi ngờ.

## ⚠️ Hệ quả thực hành quan trọng nhất

> 🚨 **Thu nhỏ ảnh phải LỌC THÔNG THẤP TRƯỚC khi bỏ bớt pixel.**

Bỏ pixel trực tiếp (lấy 1 giữ 1 bỏ 1) = lấy mẫu lại ở tần số thấp mà không hạ `f_max` → aliasing chắc chắn xảy ra. Làm mờ trước chính là **hạ `f_max` xuống** cho thoả Nyquist.

Đây là lý do mọi hàm `imresize` nghiêm túc đều tự làm mờ khi thu nhỏ. Còn tự viết `A(1:2:end, 1:2:end)` là tự rước aliasing.

Ở phía phần cứng, camera tốt có **anti-aliasing filter** (kính mờ nhẹ trước cảm biến) — hi sinh một chút độ nét để đổi lấy việc không bao giờ dính moiré.

## ⚠️ Điều dễ nhầm

- **Aliasing không sửa được ở hậu kỳ.** Khi hai tần số đã chồng lên nhau thì không có thuật toán nào tách chúng ra — thông tin thật sự mất. Khác hẳn nhiễu hay mờ, vốn còn cứu vãn được phần nào bằng [[wiener-filter]].
- **Làm mờ trước là "hi sinh có chủ đích"**, không phải làm hỏng ảnh: bạn chọn mất chi tiết mà **đằng nào cũng không giữ được**, để đổi lấy việc không sinh chi tiết giả.
- Aliasing cũng xảy ra khi **xoay** hoặc **biến đổi hình học** ảnh, không riêng lúc thu nhỏ — xem [[bien-doi-affine]].

---

## 🔗 Liên kết
- **Tiền đề:** [[lay-mau-anh]] · [[luong-tu-hoa-anh]]
- **Dẫn tới:** [[phep-toan-so-hoc-anh]]
- **Liên quan:** [[loc-lam-min]] · [[noi-suy-anh]] · [[loc-tan-so]]
- **Liên môn:** `dsp/dinh-ly-lay-mau` — cùng một định lý Nyquist, ở DSP là trục thời gian còn ở đây là hai trục không gian.

## ❓ Câu hỏi mở
- Mạng siêu phân giải học sâu có "khôi phục" được chi tiết đã aliasing không, hay chỉ đang bịa ra chi tiết hợp lý?

## 📚 Nguồn
- Lecture 4 — Image Sensing & Acquisition
