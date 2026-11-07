---
slug: led-7-doan-5161as
title: LED 7 đoạn 5161AS — vẽ chữ số bằng 7 chân GPIO
vault: iot
type: concept
branch: E
order: 7
status: learning
tags: [iot, raspberry-pi, hien-thi, python, bai-tap]
prev: [hc-sr04-sieu-am]
next: [ic-74hc595]
related: [gpio-python, diode-anode-cathode, lcd-emoji-ky-tu-tu-tao]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# LED 7 đoạn 5161AS — vẽ chữ số bằng 7 chân GPIO

> Tóm tắt 1 câu: 5161AS là 7 LED ghép thành hình số 8, **cathode chung** nối GND; muốn hiện một chữ số thì đặt 7 chân theo một **bảng mẫu** `[a,b,c,d,e,f,g]`, với 1 là sáng.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #7 ← cần [[hc-sr04-sieu-am]] · → kế tiếp [[ic-74hc595]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #hien-thi #python #bai-tap

---

## 💡 Ý chính

Cathode chung ([[diode-anode-cathode]]) nghĩa là cực âm của cả 7 LED nối với nhau: chân chung vào GND, GPIO mức cao thì đoạn đó sáng.

| Đoạn | GPIO (BCM) | Chân Board | Chân 5161AS |
|---|---|---:|---:|
| a | 15 | 10 | 7 |
| b | 2 | 3 | 6 |
| c | 21 | 40 | 4 |
| d | 20 | 38 | 2 |
| e | 16 | 36 | 1 |
| f | 17 | 11 | 9 |
| g | 27 | 13 | 10 |
| dp | — | — | 5 |
| chung | GND | GND | 3, 8 |

## 🧩 Trực giác / Ví dụ

Giống [[lcd-emoji-ky-tu-tu-tao]]: một chữ số chỉ là **bảng bit**. Chữ số 7 là `[1,1,1,0,0,0,0]`, tức sáng a, b, c.

## 🔢 Công thức / Định nghĩa

```python
import RPi.GPIO as GPIO
import time

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

led_pins = [15, 2, 21, 20, 16, 17, 27]   # a, b, c, d, e, f, g
for pin in led_pins:
    GPIO.setup(pin, GPIO.OUT)

digit_patterns = [
    [1,1,1,1,1,1,0],  # 0
    [0,1,1,0,0,0,0],  # 1
    [1,1,0,1,1,0,1],  # 2
    [1,1,1,1,0,0,1],  # 3
    [0,1,1,0,0,1,1],  # 4
    [1,0,1,1,0,1,1],  # 5
    [1,0,1,1,1,1,1],  # 6
    [1,1,1,0,0,0,0],  # 7
    [1,1,1,1,1,1,1],  # 8
    [1,1,1,0,0,1,1]   # 9
]

def display_digit(pattern):
    for i in range(7):
        GPIO.output(led_pins[i], pattern[i])

try:
    while True:
        for pattern in digit_patterns:
            display_digit(pattern)
            time.sleep(1)
except KeyboardInterrupt:
    print("Đã dừng chương trình")
finally:
    GPIO.cleanup()
```

🔎 Đã giải mã cả 10 mẫu ra tên đoạn: đều đúng. Riêng số **9 không có đoạn d** (`abcfg`), nên là kiểu "9 không đuôi".

## ⚙️ Khi nào dùng / Ứng dụng

**Practice 5.1 (tr. 38):** làm GUI có các số 0–9, click số nào thì LED hiện số đó → [[giao-dien-iot]].

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- **Mỗi đoạn cần điện trở hạn dòng riêng**: ảnh mạch có điện trở, nhưng bảng chân không nhắc tới. Dùng một điện trở chung ở cathode thì độ sáng đổi theo số đoạn đang bật *(ngoài slide)*.
- Bảng chân chiếm GPIO 15 (RXD) và GPIO 2 (SDA): không chạy cùng [[uart-pi-arduino]].
- Nếu mua nhầm loại **anode chung**, logic đảo ngược: 0 mới sáng.

## 🔗 Liên kết

- **Tiền đề:** [[gpio-python]] · [[diode-anode-cathode]]
- **Dẫn tới:** [[ic-74hc595]] · [[led-4-so-3641as]]
- **Liên quan:** [[lcd-emoji-ky-tu-tu-tao]]

## ❓ Câu hỏi mở

- 7 chân GPIO cho một chữ số là quá tốn. Bốn chữ số thì sao? → [[ic-74hc595]]

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 34–40
