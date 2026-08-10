---
slug: dac-ta-histogram
title: Đặc tả histogram (matching)
vault: ivp
type: concept
branch: D
order: 10
status: learning
tags: [ivp, enhancement]
prev: [clahe]
next: [tich-chap-2d]
related: [can-bang-histogram]
sources: ["L6 — Gray-Level Transformations, Histogram, Neighborhood"]
created: 2026-08-10
---

# Đặc tả histogram (matching)

> Tóm tắt 1 câu: thay vì ép histogram về **phẳng**, ép nó về **một dáng bạn chỉ định** — tổng quát hoá của cân bằng histogram.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #10 ← cần [[clahe]] · → kế tiếp [[tich-chap-2d]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #enhancement

---

## 💡 Ý chính

[[can-bang-histogram]] luôn nhắm tới histogram phẳng — nhưng phẳng **không phải lúc nào cũng là điều mong muốn**. Ảnh chân dung đẹp thường có histogram hơi lệch, không phẳng.

Đặc tả histogram cho phép chỉ định **phân phối đích `p_z(z)` bất kỳ**.

**Thuật toán — mẹo "đi qua trung gian":**

```
1. Equalize ảnh nguồn:  s = T(r)          ← CDF của ảnh nguồn
2. Equalize ảnh đích:   s = G(z)          ← CDF của phân phối đích
3. Ghép ngược:          z = G⁻¹(T(r))
```

Cả hai đường đều dẫn về **phân phối đều** — nên phân phối đều đóng vai trò **trạm trung chuyển**. Đi tới đó rồi đi ngược ra theo đường của đích.

## 🧩 Trực giác

Giống đổi tiền không có tỉ giá trực tiếp: VND → **USD** → JPY. Không cần biết tỉ giá VND/JPY, chỉ cần cả hai đều quy đổi được qua USD.

Ở đây "USD" là **phân phối đều**, và `G⁻¹` là chiều ngược lại.

## ⚙️ Khi nào dùng

**1. Chuẩn hoá giữa nhiều ảnh** — ứng dụng giá trị nhất. Bộ ảnh y tế chụp từ nhiều máy khác nhau, mỗi máy một đặc tính sáng. Chọn một ảnh làm chuẩn rồi **match toàn bộ ảnh còn lại về histogram của nó** → mọi ảnh cùng "tông", model học sau đó không phải vật lộn với khác biệt thiết bị.

Đây chính là một dạng chuẩn hoá dữ liệu, cùng tinh thần với [[ml/chuan-hoa-du-lieu]] — chỉ khác là chuẩn hoá cả **phân phối** chứ không chỉ trung bình/phương sai.

**2. Chuyển tông màu (color transfer)** — match histogram từng kênh của ảnh này sang ảnh kia để "mượn" không khí màu. Cơ chế nền của nhiều bộ lọc ảnh.

**3. Khi phẳng là quá tay** — chỉ định một phân phối gần Gauss thay vì đều, cho ảnh trông tự nhiên hơn.

## ⚠️ Điều dễ nhầm

- **`G⁻¹` thường không tồn tại chính xác** vì `G` rời rạc và không đơn điệu ngặt. Cài đặt thực tế phải **tra ngược gần đúng** (tìm `z` nhỏ nhất sao cho `G(z) ≥ s`) — nên kết quả chỉ **xấp xỉ** phân phối đích, không khớp tuyệt đối.
- **Không tạo được thông tin mới.** Nếu ảnh nguồn đã kẹp mất vùng sáng thì match cách nào cũng không lấy lại được, xem [[tran-so-anh]].
- **Chọn ảnh chuẩn sai là hỏng cả bộ.** Lấy một ảnh chụp lỗi làm chuẩn thì kéo toàn bộ dataset theo nó.
- Cân bằng histogram là **trường hợp riêng** của đặc tả, với phân phối đích = phân phối đều.

---

## 🔗 Liên kết
- **Tiền đề:** [[can-bang-histogram]] · [[histogram-anh]]
- **Dẫn tới:** [[tich-chap-2d]]
- **Liên quan:** [[clahe]] · [[tran-so-anh]]
- **Liên môn:** [[ml/chuan-hoa-du-lieu]] — cùng mục đích: đưa các mẫu về một thang chung trước khi so sánh hay huấn luyện.

## ❓ Câu hỏi mở
- Match histogram từng kênh RGB có làm hỏng tương quan giữa các kênh (ra màu lạ) không?

## 📚 Nguồn
- Lecture 6 — Gray-Level Transformations, Histogram, Neighborhood
