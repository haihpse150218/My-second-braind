---
slug: iot-la-gi
title: IoT là gì
vault: iot
type: concept
branch: A
order: 1
status: learning
tags: [iot, tong-quan]
prev: []
next: [he-thong-nhung]
related: [bon-thanh-phan-iot]
sources: ["IAD_MSA33_Part_1.pdf", "Syllabus IAD591"]
created: 2026-10-24
---

# IoT là gì

> Tóm tắt 1 câu: Internet of Things là mạng các **vật thể vật lý** có cảm biến, phần mềm và kết nối, để chúng **thu thập dữ liệu từ môi trường và hành động ngược lại** mà không cần người đứng giữa.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #1 · → kế tiếp [[he-thong-nhung]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #tong-quan

---

## 💡 Ý chính

Một hệ IoT luôn là một **vòng kín**: cảm biến đo → dữ liệu đi qua mạng → xử lý ra quyết định → cơ cấu chấp hành tác động trở lại thế giới thật. Thiếu một mắt xích thì chỉ là "thiết bị có Wi-Fi", chưa phải IoT. Chi tiết bốn mắt xích ở [[bon-thanh-phan-iot]].

Môn IAD591 nhìn IoT từ **phía người xây ứng dụng**: học từ mạch điện → vi điều khiển (Arduino) → máy tính nhúng (Raspberry Pi) → web/database → giao thức (MQTT) → cloud. Tức là đi **từ dưới lên** theo đúng đường dữ liệu.

## 🧩 Trực giác / Ví dụ

Sáu miền ứng dụng được nêu trong slide, đều là cùng một vòng kín với cảm biến khác nhau:

| Miền | Cảm biến đo gì | Hành động ngược lại |
|---|---|---|
| Smart home | nhiệt độ, chuyển động, ánh sáng | bật đèn, điều hoà, khoá cửa |
| Smart city | lưu lượng xe, chất lượng không khí | điều tiết đèn giao thông |
| Smart car / xe tự lái | camera, lidar, GPS, gia tốc | lái, phanh |
| Industrial IoT | rung, nhiệt máy | dừng máy trước khi hỏng |
| Healthcare | nhịp tim, SpO₂ | cảnh báo bác sĩ |
| Agriculture | độ ẩm đất, mưa | mở van tưới |

Câu hỏi thảo luận trên lớp: *xe tự lái cần dữ liệu gì?* — trả lời được bằng cách liệt kê cảm biến rồi hỏi mỗi cảm biến dẫn tới quyết định nào.

## ⚙️ Khi nào dùng / Ứng dụng

- Khi bài toán cần **đo liên tục ở nhiều điểm** mà con người không đứng đó được.
- Khi quyết định phải xảy ra **gần nơi đo** (độ trễ thấp) hoặc cần **gom dữ liệu nhiều nơi** lên một chỗ (cloud).

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- Nhầm IoT với "thiết bị thông minh" đơn lẻ. Giá trị nằm ở **kết nối và dữ liệu gom lại**, không ở từng thiết bị.
- Bỏ quên bảo mật ngay từ đầu — textbook nhấn mạnh đây là nguyên nhân đổ vỡ của nhiều hệ IoT.

---

## 🔗 Liên kết
- **Dẫn tới:** [[he-thong-nhung]] · [[bon-thanh-phan-iot]]
- **Liên môn:** [[dsp/tin-hieu-roi-rac]] — dữ liệu cảm biến chính là tín hiệu rời rạc theo thời gian

## ❓ Câu hỏi mở
- Ranh giới giữa "hệ thống nhúng có mạng" và "IoT" nằm ở đâu — ở quy mô, hay ở việc dữ liệu được gom lên cloud?

## 📚 Nguồn
- Slide Part 1, Session 1 — *Introduction to IoT and Embedded Systems*
- Syllabus IAD591 — mục I, II
