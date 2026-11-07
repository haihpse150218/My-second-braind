---
slug: pi-lam-cda-gda
title: Raspberry Pi vừa làm CDA vừa làm GDA — góc nhìn của slide
vault: iot
type: concept
branch: H
order: 5
status: learning
tags: [iot, kien-truc, raspberry-pi, edge]
prev: [http-post-json]
next: []
related: [cda-gda, du-an-esp32-mcp, raspberry-pi-la-gi, dht11-dht22, co-so-du-lieu-iot]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# Raspberry Pi vừa làm CDA vừa làm GDA — góc nhìn của slide

> Tóm tắt 1 câu: CDA **thu dữ liệu và gửi đi**, GDA **đứng giữa CDA và cloud** để xử lý, lưu tạm rồi truyền tiếp; bài lab cho Pi đóng cả hai vai, tức kiểu *blended physical* của [[cda-gda]].

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh H · #5 ← cần [[http-post-json]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #kien-truc #raspberry-pi #edge

---

## 💡 Ý chính

| | **CDA** (tr. 46–47) | **GDA** (tr. 58) |
|---|---|---|
| Định nghĩa | thiết bị thu thập dữ liệu cảm biến và gửi đến GDA | thiết bị trung gian giữa CDA và Cloud Server |
| Vai trò | mô hình yêu cầu/phản hồi giữa các điểm cuối; tương tác giữa nhiều loại thiết bị | thu thập, xử lý sơ bộ, lưu tạm và truyền dữ liệu |
| Ví dụ | Arduino; cảm biến nhiệt độ, độ ẩm, ánh sáng | Raspberry Pi, máy chủ trung gian |
| Thách thức | tài nguyên hạn chế, độ tin cậy, bảo mật | dữ liệu lớn, bảo mật, tính liên tục |

## 🧩 Trực giác / Ví dụ

Ánh xạ bài lab vào hai vai:

| Việc | Vai | Note |
|---|---|---|
| Đọc DHT, ghi `NA` khi lỗi | CDA | [[dht11-dht22]] |
| Điều khiển LED, 7 đoạn | CDA | [[led-4-so-3641as]] |
| POST JSON | CDA gửi đi | [[http-post-json]] |
| Flask nhận dữ liệu | GDA | [[flask-tren-pi]] |
| Lưu SQLite | GDA | [[co-so-du-lieu-iot]] |
| POST tiếp lên Cloud Server | GDA | tr. 67 |

## 🔢 Công thức / Định nghĩa

Ba luồng trong Part 2:

```text
Arduino + LM35 ── UART ──► Pi (GDA)                    Arduino là CDA
Pi + DHT ── HTTP POST ──► Flask + DB                   Pi là CDA, server là GDA
Pi (GDA) ── HTTP POST ──► Cloud Server                 cửa ra cloud
```

## ⚙️ Khi nào dùng / Ứng dụng

- Lab có một Pi: chạy cả hai chương trình trên một máy, `server_ip` chính là Pi.
- NullPet tách đôi: ESP32-S3 là CDA, laptop là GDA → [[du-an-esp32-mcp]]. Cách đóng gói JSON và kiểm tra phản hồi ở đây dùng lại được.

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- **Slide và textbook dùng chữ CDA khác nhau.** Slide lấy Arduino làm ví dụ, còn [[cda-gda]] (theo Andy King) yêu cầu thiết bị từ Class 2 có IP stack, và Uno chỉ là "cảm biến có dây". Khi làm bài theo slide, khi đọc sách theo sách.
- CDA và GDA là **vai của phần mềm**, không phải loại phần cứng: một Pi đóng cả hai vai được.
- Slide nói CDA "cung cấp mô hình yêu cầu/phản hồi", còn sách mô tả CDA qua data collection và system triggers.

## 🔗 Liên kết

- **Tiền đề:** [[cda-gda]] · [[http-post-json]]
- **Liên quan:** [[du-an-esp32-mcp]] · [[raspberry-pi-la-gi]]

## ❓ Câu hỏi mở

- Slide chưa nêu Cloud Server cụ thể. Part 3 có dùng Ubidots hay AWS IoT như chương 11 của sách không?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 46–47, 51, 58, 67
