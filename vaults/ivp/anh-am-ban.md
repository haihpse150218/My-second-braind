---
slug: anh-am-ban
title: Ảnh âm bản
vault: ivp
type: concept
branch: D
order: 2
status: learning
tags: [ivp, enhancement]
prev: [bien-doi-diem]
next: [bien-doi-log]
related: [lut-bang-tra]
sources: ["L6 — Gray-Level Transformations, Histogram, Neighborhood"]
created: 2026-08-10
---

# Ảnh âm bản

> Tóm tắt 1 câu: đảo `s = 255 − r` — phép biến đổi tầm thường nhất, nhưng lại là cách rẻ nhất để làm lộ chi tiết đang ẩn trong **vùng tối**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #2 ← cần [[bien-doi-diem]] · → kế tiếp [[bien-doi-log]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #enhancement

---

## 💡 Ý chính

$$
s = (L-1) - r \quad\text{(với ảnh 8-bit: } s = 255 - r\text{)}
$$

Đen ↔ trắng, xám nhạt ↔ xám đậm. Hàm `T` là **đường thẳng dốc xuống**, hệ số góc `−1`.

## 🧩 Vì sao lại hữu ích

Ảnh **không** thay đổi một chút thông tin nào — chênh lệch giữa các pixel giữ nguyên tuyệt đối. Cái thay đổi là **mắt người**.

Mắt phân biệt sắc độ ở vùng **sáng** tốt hơn hẳn vùng tối. Nên khi chi tiết quan trọng nằm trong một **vùng tối rộng**, âm bản kéo nó lên vùng sáng và bỗng nhiên nhìn thấy được — dù dữ liệu y hệt.

**Ví dụ kinh điển:** ảnh X-quang / chụp mạch máu. Mạch máu là những sợi mảnh sẫm trên nền tối; đảo âm bản thành sợi sáng trên nền sáng → bác sĩ đọc dễ hơn nhiều.

## ⚙️ Khi nào dùng

- Chi tiết cần xem nằm trong vùng **tối chiếm diện tích lớn** — ảnh y tế, ảnh thiên văn.
- **Ảnh bản vẽ / blueprint** — chữ trắng nền xanh đảo lại thành đen trên trắng, dễ đọc và dễ [[nguong-hoa]] hơn.
- **Tiền xử lý cho hình thái học**: [[hinh-thai-hoc]] quy ước vật thể là phần **trắng**. Nếu vật là chữ đen trên nền trắng thì phải đảo trước, không thì dilation/erosion tác dụng ngược hoàn toàn.

## ⚠️ Điều dễ nhầm

- **Âm bản không phải là "tăng cường".** Nó không thêm thông tin, không tăng tương phản — chỉ đổi cách trình bày. Histogram bị **lật gương** chứ không giãn ra.
- Là phép **đối hợp**: làm hai lần thì về ảnh gốc **chính xác từng bit** (khác với xoay hay co giãn, vốn mất mát qua nội suy).
- Trên **ảnh màu**, đảo cả 3 kênh cho ra màu bù — đỏ thành lục lam. Trông rất lạ mắt và thường không phải ý bạn muốn; nếu chỉ cần đảo độ sáng thì đảo **kênh V của HSV**, xem [[mo-hinh-mau-hsv]].
- Cài bằng phép trừ trên `uint8` thì để ý [[tran-so-anh]] — dù phép này an toàn vì kết quả luôn nằm trong `[0,255]`.

---

## 🔗 Liên kết
- **Tiền đề:** [[bien-doi-diem]]
- **Dẫn tới:** [[bien-doi-log]]
- **Liên quan:** [[lut-bang-tra]] · [[hinh-thai-hoc]] · [[mo-hinh-mau-hsv]]

## ❓ Câu hỏi mở
- Nếu âm bản không thêm thông tin, vì sao model học sâu huấn luyện trên ảnh âm bản lại cho kết quả khác?

## 📚 Nguồn
- Lecture 6 — Gray-Level Transformations, Histogram, Neighborhood
