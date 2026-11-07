---
slug: pi-gpio-pinout
title: GPIO Raspberry Pi — 40 chân, số BCM và số Board
vault: iot
type: concept
branch: E
order: 2
status: learning
tags: [iot, raspberry-pi, gpio, dien-tu]
prev: [raspberry-pi-la-gi]
next: [pi-truy-cap-tu-xa]
related: [chan-digital-vs-analog, uart-crossover-va-chia-ap, giao-tiep-i2c]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# GPIO Raspberry Pi — 40 chân, số BCM và số Board

> Tóm tắt 1 câu: mỗi chân GPIO có **hai số** (số BCM trong code, số Board theo vị trí vật lý), chỉ làm việc ở **0–3,3 V** và tối đa **16 mA** — nhầm số thì sai chân, quá áp thì hỏng Pi.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #2 ← cần [[raspberry-pi-la-gi]] · → kế tiếp [[pi-truy-cap-tu-xa]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #gpio #dien-tu

---

## 💡 Ý chính

- **OUTPUT:** mức cao 3,3 V, mức thấp 0 V, dòng tối đa **16 mA** mỗi chân.
- **INPUT:** đọc điện áp 0–3,3 V. Mọi chân đều chọn được điện trở kéo lên hoặc kéo xuống.
- **GPIO 2 và 3 (chân 3 và 5) mặc định có điện trở kéo lên.** Vì vậy slide dùng GPIO 2 làm chân nút nhấn.
- **Tín hiệu 5 V từ ngoài phải qua mạch hạ áp** → [[uart-crossover-va-chia-ap]], [[hc-sr04-sieu-am]].

## 🧩 Trực giác / Ví dụ

Số BCM giống **tên người**, số Board giống **số ghế**. LED của Practice 4.1 có tên GPIO 17 và ngồi ghế 11: code `LED(17)` gọi tên, còn tay cắm dây phải đếm ghế.

## 🔢 Công thức / Định nghĩa

| Trái | Chân | Chân | Phải |
|---|---:|---:|---|
| 3V3 | 1 | 2 | 5V |
| GPIO 2 (SDA) | 3 | 4 | 5V |
| GPIO 3 (SCL) | 5 | 6 | GND |
| GPIO 4 (GPCLK0) | 7 | 8 | GPIO 14 (TXD) |
| GND | 9 | 10 | GPIO 15 (RXD) |
| GPIO 17 | 11 | 12 | GPIO 18 (PCM_CLK) |
| GPIO 27 | 13 | 14 | GND |
| GPIO 22 | 15 | 16 | GPIO 23 |
| 3V3 | 17 | 18 | GPIO 24 |
| GPIO 10 (MOSI) | 19 | 20 | GND |
| GPIO 9 (MISO) | 21 | 22 | GPIO 25 |
| GPIO 11 (SCLK) | 23 | 24 | GPIO 8 (CE0) |
| GND | 25 | 26 | GPIO 7 (CE1) |
| GPIO 0 (ID_SD) | 27 | 28 | GPIO 1 (ID_SC) |
| GPIO 5 | 29 | 30 | GND |
| GPIO 6 | 31 | 32 | GPIO 12 (PWM0) |
| GPIO 13 (PWM1) | 33 | 34 | GND |
| GPIO 19 (PCM_FS) | 35 | 36 | GPIO 16 |
| GPIO 26 | 37 | 38 | GPIO 20 (PCM_DIN) |
| GND | 39 | 40 | GPIO 21 (PCM_DOUT) |

Chân 1 là chân có **đế vuông**, nằm gần khe thẻ nhớ *(ngoài slide)*.

## ⚙️ Khi nào dùng / Ứng dụng

- `gpiozero` và `GPIO.setmode(GPIO.BCM)` dùng **số BCM** → [[gpio-python]].
- Bật/tắt I2C, SPI, Serial bằng `sudo raspi-config` → [[pi-truy-cap-tu-xa]].

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- Nhầm `LED(17)` thành chân vật lý 17: chân 17 là nguồn 3V3, không phải GPIO.
- Chân 2 và 4 là **5 V**: chạm nhầm vào GPIO có thể hỏng Pi.
- Bài 7 đoạn dùng GPIO 2 và 15, trùng chân I2C và UART: không dùng chung với [[uart-pi-arduino]] trong cùng một mạch.
- 16 mA là giới hạn **từng chân**; nhiều chân cùng kéo dòng còn bị giới hạn tổng *(ngoài slide)*.

## 🔗 Liên kết

- **Tiền đề:** [[raspberry-pi-la-gi]] · [[chan-digital-vs-analog]]
- **Dẫn tới:** [[gpio-python]] · [[uart-pi-arduino]]
- **Liên quan:** [[giao-tiep-i2c]] · [[uart-crossover-va-chia-ap]]

## ❓ Câu hỏi mở

- Slide viết "trừ chân 2 và 3": đó là số GPIO, tức chân Board 3 và 5. Trong code có tắt được điện trở kéo lên này không?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 3–4, 11
