---
slug: loc-lam-min
title: Lọc làm mịn (thông thấp)
vault: ivp
type: concept
branch: E
order: 2
status: learning
tags: [ivp, loc]
prev: [tich-chap-2d]
next: [loc-trung-vi]
related: [loc-trung-vi, nhieu-anh]
sources: ["L6 — Gray-Level Transformations, Histogram, Neighborhood", "L7 — Image Restoration"]
created: 2026-08-10
---

# Lọc làm mịn (thông thấp)

> Tóm tắt 1 câu: lấy trung bình lân cận để triệt nhiễu — nhưng vì **cạnh cũng là biến thiên mạnh**, bộ lọc không phân biệt được nhiễu với cạnh và làm mờ cả hai.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #2 ← cần [[tich-chap-2d]] · → kế tiếp [[loc-trung-vi]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #loc

---

## 💡 Ý chính

| Bộ lọc | Kernel | Đặc điểm |
|---|---|---|
| **Trung bình cộng** (box) | Mọi ô `= 1/k²` | Đơn giản nhất; gây **artifact ngang/dọc** vì đối xử mọi hàng xóm như nhau |
| **Gaussian** | Trọng số giảm theo `e^{-d²/2σ²}` | Mượt và **đẳng hướng**; tiêu chuẩn thực tế |
| **Trung bình hình học** | `(∏ pixel)^{1/k²}` | Giữ chi tiết tốt hơn trung bình cộng |
| **Trung bình điều hoà** | `k² / Σ(1/pixel)` | Tốt với nhiễu **salt**; ❌ hỏng hoàn toàn với **pepper** |

Điểm chung: đều là [[tich-chap-2d]] với kernel **tổng bằng 1**, mọi hệ số **không âm**.

## 🧩 Vì sao làm mịn khử được nhiễu

Nhiễu là thành phần **ngẫu nhiên, độc lập giữa các pixel**. Lấy trung bình `n` giá trị độc lập thì độ lệch chuẩn giảm theo `1/√n`, còn tín hiệu thật (vốn tương quan mạnh giữa các pixel kề nhau) thì gần như giữ nguyên.

→ Kernel `3×3` giảm nhiễu khoảng **3 lần**, `5×5` khoảng **5 lần**.

**Nhưng:** giả định "pixel kề nhau thì giống nhau" **sai ở đúng chỗ có cạnh**. Ở biên vật thể, hai bên chênh nhau rất nhiều — trung bình chúng lại tạo ra giá trị **không thuộc về bên nào**. Đó là lý do ảnh bị mờ biên.

> 📌 Đây là **đánh đổi cơ bản** không tránh được của bộ lọc tuyến tính: khử nhiễu và giữ cạnh là hai mục tiêu mâu thuẫn. Muốn thoát khỏi đánh đổi này phải rời khỏi họ tuyến tính — xem [[loc-trung-vi]] và bộ lọc thích nghi.

## ⚙️ Gaussian vs trung bình — chọn cái nào

**Gaussian gần như luôn tốt hơn**, vì:
- Trọng số giảm dần theo khoảng cách → hàng xóm xa ảnh hưởng ít, hợp trực giác hơn.
- **Đẳng hướng** — mờ đều mọi hướng; box filter làm mờ theo phương ngang/dọc mạnh hơn phương chéo, để lại artifact hình vuông.
- **Khả tách** → chi phí `2k` thay vì `k²`.
- Trong miền tần số, Gaussian **không có ringing**; box filter thì có, xem [[loc-tan-so]].

Tham số `σ` (không phải kích thước kernel) mới là thứ quyết định độ mờ. Quy tắc thực dụng: kernel rộng `≈ 6σ` để không cắt cụt đuôi Gaussian.

## ⚙️ Khi nào dùng

- **Khử nhiễu Gaussian / uniform / Erlang** — đúng loại nhiễu mà trung bình xử lý tốt nhất.
- **Trước khi thu nhỏ ảnh** — bắt buộc, để tránh [[aliasing-anh]].
- **Trước khi dò biên** — bước 1 của quy trình chuẩn; đạo hàm khuếch đại nhiễu rất mạnh nên phải làm mịn trước. Đây chính là ý tưởng của [[laplacian-va-log|LoG]] và [[canny]].
- **Ước lượng nền sáng** — làm mờ rất mạnh để lấy thành phần chiếu sáng rồi chia, xem [[phep-toan-so-hoc-anh]].

## ⚠️ Điều dễ nhầm

- **❌ Không dùng cho nhiễu muối tiêu.** Một pixel `255` giữa vùng tối kéo cả trung bình lên — nhiễu **không biến mất mà loang ra** thành đốm mờ. Phải dùng [[loc-trung-vi]].
- **Trung bình điều hoà chết với nhiễu pepper**: pixel `0` làm `1/pixel → ∞`, cả cửa sổ về 0.
- **Làm mịn không đảo ngược được** một cách ổn định. Có thể thử khử mờ bằng [[loc-nguoc]] hay [[wiener-filter]] nhưng luôn kèm khuếch đại nhiễu.

---

## 🔗 Liên kết
- **Tiền đề:** [[tich-chap-2d]]
- **Dẫn tới:** [[loc-trung-vi]] · [[lam-sac-net]]
- **Liên quan:** [[nhieu-anh]] · [[aliasing-anh]] · [[loc-tan-so]]

## ❓ Câu hỏi mở
- Bộ lọc song phương (bilateral) khử nhiễu mà giữ cạnh — nó phá vỡ đánh đổi trên bằng cách nào?

## 📚 Nguồn
- Lecture 6 — Gray-Level Transformations, Histogram, Neighborhood
- Lecture 7 — Image Restoration
