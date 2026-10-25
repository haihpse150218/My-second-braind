---
slug: giao-tiep-i2c
title: Giao tiếp I2C — hai dây, nhiều thiết bị
vault: iot
type: concept
branch: C
order: 8
status: learning
tags: [iot, arduino, giao-tiep]
prev: [ham-map-va-servo]
next: [lcd-1602-i2c]
related: [uart-serial-monitor, cam-bien]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# Giao tiếp I2C — hai dây, nhiều thiết bị

> Tóm tắt 1 câu: I2C dùng **đúng hai dây** — SDA (dữ liệu) và SCL (xung đồng bộ) — cho **nhiều thiết bị cùng lúc**, mỗi thiết bị phân biệt bằng **địa chỉ**; nó thay 6 dây của LCD bằng 2.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #8 ← cần [[ham-map-va-servo]] · → kế tiếp [[lcd-1602-i2c]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #arduino #giao-tiep

---

## 💡 Ý chính

| Dây | Tên | Vai trò | Chân Uno | Chân Mega |
|---|---|---|---|---|
| SDA | Serial Data | gửi **và** nhận dữ liệu (một dây, hai chiều) | **A4** | D20 |
| SCL | Serial Clock | master phát nhịp để đồng bộ | **A5** | D21 |

Khác UART ([[uart-serial-monitor]]):

| | UART | I2C |
|---|---|---|
| Clock | không — phải khớp baud | có — SCL, không cần thoả thuận tốc độ |
| Số thiết bị | 1–1 | 1 master – tới 127 slave trên cùng 2 dây |
| Nhận diện | theo dây | theo **địa chỉ 7-bit** (vd `0x27`) |
| Dùng cho | PC, Bluetooth, GPS | LCD, cảm biến (BMP180, SHT3x), RTC, EEPROM |

## ⚙️ Quy trình bắt buộc — quét địa chỉ trước

Module I2C **không in địa chỉ lên thân**; cùng một LCD có thể là `0x27` hoặc `0x3F`. Slide chỉ cách:
1. IDE → *File → Examples → Wire → i2c_scanner*
2. Compile & Upload
3. Mở Serial Monitor → ghi lại địa chỉ in ra (`I2C device found at address 0x27`)
4. Dùng địa chỉ đó trong `LiquidCrystal_I2C lcd(0x27, 16, 2);` ([[lcd-1602-i2c]])

Thư viện nền: `Wire.h` (có sẵn trong IDE).

## 🧩 Trực giác

I2C là **lớp học một giáo viên**: giáo viên (master = Arduino) gõ nhịp (SCL) và gọi tên (địa chỉ) ai được nói; học sinh (slave) chỉ trả lời khi được gọi. Vì thế hai dây đủ cho cả lớp, miễn không hai học sinh trùng tên.

## ⚠️ Điều dễ nhầm

- Hai thiết bị **trùng địa chỉ** trên cùng bus → cả hai câm. Nhiều module có jumper A0/A1/A2 để đổi địa chỉ.
- I2C cần **điện trở kéo lên** trên SDA/SCL; module LCD đã có sẵn, nhưng tự nối cảm biến trần thì phải thêm 4,7 kΩ.
- Dây I2C dài (> 1 m) hoặc nhiều thiết bị → tín hiệu méo, scanner không thấy gì. I2C sinh ra cho **trong bo mạch**, không cho đi xa.
- Cắm LCD vào A4/A5 thì hai chân này không còn đọc analog được ([[chan-digital-vs-analog]]).

---

## 🔗 Liên kết
- **Tiền đề:** [[ham-map-va-servo]] · [[uart-serial-monitor]]
- **Dẫn tới:** [[lcd-1602-i2c]]
- **Liên quan:** [[cam-bien]] — BMP180, SHT3x đều là I2C

## ❓ Câu hỏi mở
- SPI nhanh hơn I2C nhiều lần nhưng tốn 4 dây + 1 dây CS mỗi thiết bị — ranh giới chọn SPI/I2C nằm ở tốc độ hay ở số thiết bị?

## 📚 Nguồn
- Slide Part 1 — *LCD 1602 + I2C*, *Scan địa chỉ LCD*, *Libraries*
