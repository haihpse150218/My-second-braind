---
slug: uart-pi-arduino
title: Nối UART giữa Pi và Arduino — /dev/ttyS0
vault: iot
type: concept
branch: E
order: 10
status: learning
tags: [iot, raspberry-pi, arduino, uart, bai-tap]
prev: [led-4-so-3641as]
next: [dht11-dht22]
related: [uart-serial-monitor, uart-crossover-va-chia-ap, giao-tiep-hai-chieu-bang-chuoi, nhiet-ke-lm35]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# Nối UART giữa Pi và Arduino — /dev/ttyS0

> Tóm tắt 1 câu: Pi không có ADC nên để Arduino đọc cảm biến rồi gửi chuỗi qua UART; với Linux, cổng đó chỉ là một **file** `/dev/ttyS0`, đọc được ngay bằng `cat`.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #10 ← cần [[led-4-so-3641as]] · → kế tiếp [[dht11-dht22]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #arduino #uart #bai-tap

---

## 💡 Ý chính

**Practice 5.2 (tr. 31):** GUI hiển thị dữ liệu cảm biến từ Arduino, chọn một trong ba đường:

| Đường | Ghi chú trong slide |
|---|---|
| GPIO (UART) | làm trong bài này |
| Serial qua USB | bài kế tiếp |
| Bluetooth | tự chọn → [[bluetooth-hc-05]] |

| Pi | Chân Board | Nối với Arduino |
|---|---:|---|
| GND | 6 | GND |
| TXD (GPIO 14) | 8 | RX |
| RXD (GPIO 15) | 10 | TX **qua cầu chia áp** |

Vẫn là luật nối chéo và hạ áp ở [[uart-crossover-va-chia-ap]]: Arduino TX 5 V không được vào thẳng Pi RX.

## 🧩 Trực giác / Ví dụ

Vẫn là [[giao-tiep-hai-chieu-bang-chuoi]], chỉ thay Bluetooth bằng dây: Arduino vẫn in chuỗi, còn người nghe là một máy Linux chứ không phải Serial Monitor.

## 🔢 Công thức / Định nghĩa

Kiểm tra nhận dữ liệu:

```bash
cat /dev/ttyS0
```

Kết quả trong slide, từ mạch LM35 ([[nhiet-ke-lm35]]):

```text
Voltage: 0.28 V
Temperature: 27.86 °C
```

Chiều ngược lại, Arduino nhận lệnh một ký tự:

```cpp
if (Serial.available() > 0) {
  int data = Serial.read();
  if (data == '1') {
    digitalWrite(ledPin1, HIGH);  // Bật đèn LED 1
  } else if (data == '2') {
    digitalWrite(ledPin1, LOW);   // Tắt đèn LED 1
  }
}
```

Slide cắt code ở giữa khối `else if`; hai dấu `}` cuối là mình thêm cho đủ.

## ⚙️ Khi nào dùng / Ứng dụng

- Cảm biến analog như LM35: Arduino đọc rồi gửi lên Pi.
- Điều khiển Arduino từ web → [[flask-tren-pi]].

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

*Các mục dưới đây ngoài slide, chưa chạy thử trên Pi của lớp:*

- `cat` im lặng: vào `sudo raspi-config` → Interface → Serial Port, tắt login shell và bật phần cứng serial.
- Ra ký tự lạ: baud của Pi và `Serial.begin()` lệch nhau; slide không ghi baud. Đặt bằng `stty -F /dev/ttyS0 9600`.
- Dùng Python thì cần gói `pyserial`: `serial.Serial('/dev/ttyS0', 9600, timeout=1)`.
- Cáp USB thay vì GPIO: cổng thường là `/dev/ttyACM0` hoặc `/dev/ttyUSB0`, và không cần chia áp.
- Tr. 32 đánh dấu thêm chân 3,3 V, nhưng ảnh không cho thấy rõ dây này nối đâu; cần xem mạch thật ở lab.

## 🔗 Liên kết

- **Tiền đề:** [[uart-serial-monitor]] · [[uart-crossover-va-chia-ap]]
- **Dẫn tới:** [[giao-dien-iot]] · [[flask-tren-pi]]

## ❓ Câu hỏi mở

- `/dev/ttyS0` là mini UART của Pi 3: tốc độ của nó có phụ thuộc xung CPU không, và có ảnh hưởng đến baud không?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 31–32, 60, 63
