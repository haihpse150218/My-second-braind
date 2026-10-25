---
slug: arduino-la-gi
title: Arduino là gì — board, IDE, shield, cộng đồng
vault: iot
type: concept
branch: C
order: 1
status: learning
tags: [iot, arduino, phan-cung]
prev: [so-do-nguyen-ly]
next: [arduino-toolchain]
related: [he-thong-nhung, chan-digital-vs-analog]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# Arduino là gì — board, IDE, shield, cộng đồng

> Tóm tắt 1 câu: Arduino là **nền tảng** gồm bo mạch vi điều khiển rẻ + IDE đơn giản + shield cắm chồng + cộng đồng mở — thứ làm cho lập trình phần cứng dễ như viết một hàm `loop()`.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #1 ← cần [[so-do-nguyen-ly]] · → kế tiếp [[arduino-toolchain]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #arduino #phan-cung

---

## 💡 Ý chính

Bốn thứ tạo nên "Arduino" theo slide:

| Thành phần | Là gì |
|---|---|
| **Arduino board** | bo mạch có vi điều khiển, chân I/O, cổng USB để nạp code và cấp nguồn |
| **IDE** | trình soạn thảo + trình biên dịch + nạp, một nút bấm → [[arduino-toolchain]] |
| **Shield** | bo mở rộng cắm chồng lên board (Ethernet, motor, LCD) |
| **Cộng đồng mở** | phần cứng và phần mềm mở, thư viện cho hầu hết cảm biến |

## 🔢 Arduino Uno Rev3 — bo mạch dùng trong môn

| Phần | Thông số |
|---|---|
| Vi điều khiển | ATmega328P, 16 MHz, 8-bit |
| Bộ nhớ | Flash 32 KB (chứa sketch) · SRAM 2 KB · EEPROM 1 KB |
| Digital I/O | 14 chân (D0–D13), 6 chân có PWM (~) |
| Analog in | 6 chân A0–A5, ADC 10-bit → [[adc-analogread]] |
| Giao tiếp | UART (D0/D1 + USB), I2C (A4 SDA / A5 SCL), SPI |
| Nguồn | USB 5 V hoặc jack 7–12 V; ra 5 V và 3.3 V |
| Dòng ra mỗi chân | ~20 mA khuyến nghị, 40 mA tối đa |

Ba khối của [[he-thong-nhung]] đều có mặt: vi điều khiển (não) · bộ nhớ · giao diện vào/ra.

## 🧩 Trực giác

Arduino là "Raspberry Pi không có hệ điều hành": không boot, không file, không đa nhiệm — cắm điện là chạy **đúng một chương trình** từ đầu, mãi mãi. Vì thế nó khởi động tức thì và gần như không bao giờ treo vì phần mềm nền.

## ⚙️ Khi nào dùng

- Đọc cảm biến, bật tắt thiết bị, phản ứng theo ngưỡng: **Arduino**.
- Cần web server, xử lý ảnh, Python, database: **Raspberry Pi** (nhánh E). Hai thứ thường **phối hợp**: Arduino đo, Pi gom và đẩy lên cloud.

## ⚠️ Điều dễ nhầm

- Chân D0/D1 **dùng chung với UART USB** — cắm thiết bị serial vào đó thì không nạp code được; đó là lý do HC-05 nối chân 10/11 ([[uart-crossover-va-chia-ap]]).
- Chân 3.3 V của Uno chỉ ra ~50 mA — không đủ nuôi module Wi-Fi.

---

## 🔗 Liên kết
- **Tiền đề:** [[so-do-nguyen-ly]] · [[he-thong-nhung]]
- **Dẫn tới:** [[arduino-toolchain]] · [[chan-digital-vs-analog]]

## ❓ Câu hỏi mở
- Với dự án cuối kỳ cần Wi-Fi, nên dùng Uno + module hay chuyển hẳn sang ESP32 (có Wi-Fi/Bluetooth tích hợp, lập trình bằng cùng IDE)?

## 📚 Nguồn
- Slide Part 1 — *Giới thiệu về Arduino*, *Components*, *Arduino Uno Rev3*, *Key components of an Arduino board*
