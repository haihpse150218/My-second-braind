---
slug: he-thong-nhung
title: Hệ thống nhúng
vault: iot
type: concept
branch: A
order: 2
status: learning
tags: [iot, tong-quan, phan-cung]
prev: [iot-la-gi]
next: [bon-thanh-phan-iot]
related: [arduino-la-gi]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# Hệ thống nhúng

> Tóm tắt 1 câu: hệ điều khiển **chuyên dụng** làm một việc cụ thể, thường nằm **bên trong** một hệ thống lớn hơn — và là "thân xác" của mọi thiết bị IoT.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #2 ← cần [[iot-la-gi]] · → kế tiếp [[bon-thanh-phan-iot]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #tong-quan #phan-cung

---

## 💡 Ý chính

Khác máy tính đa dụng, hệ thống nhúng được thiết kế để chạy **một chương trình, mãi mãi**: máy giặt, ECU ô tô, máy đo huyết áp. Ba thành phần tối thiểu:

| Thành phần | Vai trò | Trên Arduino Uno |
|---|---|---|
| Vi điều khiển / vi xử lý | "bộ não", thực thi lệnh | ATmega328P |
| Bộ nhớ | chứa mã và dữ liệu | Flash 32 KB · SRAM 2 KB · EEPROM 1 KB |
| Giao diện vào/ra | nối cảm biến, chấp hành, module truyền thông | 14 chân digital · 6 chân analog · UART · I2C · SPI |

IoT = hệ thống nhúng **+ kết nối mạng + dữ liệu đi lên**. Vì thế môn học bắt đầu bằng Arduino: học hệ nhúng trần trụi trước, thêm Bluetooth/Wi-Fi sau.

## 🧩 Trực giác / Ví dụ

Ứng dụng slide liệt kê: điện tử tiêu dùng · ô tô · máy móc công nghiệp · thiết bị y tế. Điểm chung: người dùng **không thấy máy tính** ở đó, chỉ thấy chức năng.

## ⚙️ Khi nào dùng

- Cần phản ứng **thời gian thực, tin cậy, rẻ, ít điện** → vi điều khiển (Arduino).
- Cần hệ điều hành, xử lý ảnh, chạy Python/web → máy tính nhúng (Raspberry Pi, nhánh E).

## ⚠️ Điều dễ nhầm

- **Vi điều khiển ≠ vi xử lý.** Vi điều khiển gói CPU + RAM + Flash + I/O trong một chip; vi xử lý (Raspberry Pi) cần RAM, lưu trữ ngoài và chạy hệ điều hành.
- Tài nguyên rất nhỏ: 2 KB SRAM nghĩa là một mảng `int[1024]` đã chiếm hết bộ nhớ.

---

## 🔗 Liên kết
- **Tiền đề:** [[iot-la-gi]]
- **Dẫn tới:** [[bon-thanh-phan-iot]] · [[arduino-la-gi]]

## ❓ Câu hỏi mở
- Khi nào nên dừng ở vi điều khiển và khi nào phải lên Raspberry Pi? Ngưỡng là ở tính toán hay ở nhu cầu kết nối?

## 📚 Nguồn
- Slide Part 1 — *Embedded Systems*, *Components*
