---
slug: gpio-python
title: Điều khiển GPIO bằng Python — gpiozero và RPi.GPIO
vault: iot
type: concept
branch: E
order: 4
status: learning
tags: [iot, raspberry-pi, python, gpio, bai-tap]
prev: [pi-truy-cap-tu-xa]
next: [pi-nut-nhan-va-pwm]
related: [sketch-setup-loop, pi-gpio-pinout, led-7-doan-5161as]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# Điều khiển GPIO bằng Python — gpiozero và RPi.GPIO

> Tóm tắt 1 câu: `gpiozero` cho mình làm việc với **đồ vật** (`LED(17)`, `Button(2)`), còn `RPi.GPIO` làm việc với **chân** (`setup`, `output`, `cleanup`) — cùng một Blink, Python trên Pi thay cho `setup()`/`loop()` của Arduino.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #4 ← cần [[pi-truy-cap-tu-xa]] · → kế tiếp [[pi-nut-nhan-va-pwm]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #python #gpio #bai-tap

---

## 💡 Ý chính

| | `gpiozero` | `RPi.GPIO` |
|---|---|---|
| Mức | đồ vật: `LED`, `PWMLED`, `Button` | chân: `GPIO.setup`, `GPIO.output` |
| Đánh số | BCM | phải chọn: `GPIO.setmode(GPIO.BCM)` |
| Dọn dẹp | tự động | gọi `GPIO.cleanup()` |
| Cài đặt | thường có sẵn | có thể phải cài |
| Dùng trong slide | Blink, PWM | LED 7 đoạn → [[led-7-doan-5161as]] |

## 🧩 Trực giác / Ví dụ

Blink trên hai nền tảng:

```cpp
// Arduino
void setup() { pinMode(LED_BUILTIN, OUTPUT); }
void loop() {
  digitalWrite(LED_BUILTIN, HIGH); delay(1000);
  digitalWrite(LED_BUILTIN, LOW);  delay(1000);
}
```

```python
# Raspberry Pi
from gpiozero import LED
from time import sleep

led = LED(17)          # phần trên while = setup()

while True:            # while True = loop()
    led.on()
    sleep(1)
    led.off()
    sleep(1)
```

Cùng cấu trúc với [[sketch-setup-loop]]: chỉ khác là `while True` do mình tự viết.

## 🔢 Công thức / Định nghĩa

```bash
sudo apt-get install python3-gpiozero
sudo apt-get install rpi.gpio        # slide; tên gói thường gặp là python3-rpi.gpio
```

**Practice 4.1 — Blink:** LED đỏ ở GPIO 17 (Board 11), nhấp nháy 1 s, viết bằng `gpiozero` hoặc `RPi.GPIO`.

## ⚙️ Khi nào dùng / Ứng dụng

- Mặc định dùng `gpiozero` vì code ngắn và có sẵn sự kiện như `when_pressed`.
- Cần ghi nhiều chân theo mảng, như bảng mã 7 đoạn: `RPi.GPIO` tiện hơn.

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- Với `RPi.GPIO`, quên `cleanup()` thì chân giữ trạng thái cũ và lần chạy sau có cảnh báo. Hãy đặt nó trong `finally:`.
- Không trộn hai thư viện trên cùng một chân.
- `sleep()` cũng **chặn** chương trình như `delay()` của Arduino.

## 🔗 Liên kết

- **Tiền đề:** [[sketch-setup-loop]] · [[pi-gpio-pinout]]
- **Dẫn tới:** [[pi-nut-nhan-va-pwm]] · [[led-7-doan-5161as]]

## ❓ Câu hỏi mở

- Python trên Linux không chạy thời gian thực: khi hệ thống bận, nhịp `sleep(1)` lệch bao nhiêu?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 13–15
