---
slug: pi-nut-nhan-va-pwm
title: Nút nhấn và PWM trên Pi — Practice 4.2, 4.3
vault: iot
type: concept
branch: E
order: 5
status: learning
tags: [iot, raspberry-pi, python, pwm, bai-tap]
prev: [gpio-python]
next: [hc-sr04-sieu-am]
related: [chan-digital-vs-analog, pi-gpio-pinout, mach-noi-tiep-song-song]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# Nút nhấn và PWM trên Pi — Practice 4.2, 4.3

> Tóm tắt 1 câu: nút nhấn là chiều **Receive** (Pi đọc), LED là chiều **Control** (Pi xuất); `when_pressed` gọi hàm khi có sự kiện, còn `PWMLED` chỉnh độ sáng bằng `value` từ 0.0 đến 1.0.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #5 ← cần [[gpio-python]] · → kế tiếp [[hc-sr04-sieu-am]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #python #pwm #bai-tap

---

## 💡 Ý chính

Mạch chung: **LED đỏ GPIO 17 (Board 11)**, **nút GPIO 2 (Board 3)**.

- **Practice 4.2 — Button Blink:** đọc nút rồi đổi kiểu sáng của đèn.
- **Practice 4.3 — PWM:** mỗi lần nhấn, duty cycle tăng 10%; ở 100%, nhấn thêm thì về 0% (đèn tắt).

## 🧩 Trực giác / Ví dụ

PWM như **bật tắt công tắc thật nhanh**: mắt không kịp thấy nhấp nháy, chỉ thấy đèn mờ đi. `led.value = 0.3` nghĩa là 30% thời gian đèn sáng, xem [[chan-digital-vs-analog]].

## 🔢 Công thức / Định nghĩa

Code mẫu Practice 4.3:

```python
from gpiozero import PWMLED, Button
from time import sleep

led = PWMLED(17)      # GPIO 17 (Board Pin 11)
button = Button(2)    # GPIO 2  (Board Pin 3)

brightness = 0.0
step = 0.1            # tăng 10% mỗi lần nhấn

def adjust_brightness():
    global brightness
    brightness += step
    if brightness > 1.0:
        brightness = 0.0
    led.value = brightness
    print(f"LED brightness: {brightness:.1f}")

button.when_pressed = adjust_brightness   # gán hàm, không có ()

while True:           # giữ chương trình chạy
    sleep(0.1)
```

🔎 Đã mô phỏng logic: cộng dồn `0.1` cho ra `0.9999999999999999` ở lần 10 chứ không phải đúng `1.0`, lần 11 mới vượt 1.0 và về 0. Code vẫn đúng ý đề, vì độ sáng in ra là `1.0`.

## ⚙️ Khi nào dùng / Ứng dụng

- `when_pressed` hợp với thao tác người dùng vì không phải dò nút liên tục.
- `PWMLED` dùng được cho cảnh báo tăng dần ở [[hc-sr04-sieu-am]].

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- ⚠️ **Slide tự mâu thuẫn ở Practice 4.2.** Tr. 17: không nhấn → nhấp nháy, nhấn → sáng liên tục. Tr. 18: không nhấn → tắt, nhấn → nhấp nháy. Cần hỏi lại giảng viên yêu cầu nào đúng.
- Tr. 18–19 ghi "Practice 2" nhưng chính là Practice 4.2.
- Viết `when_pressed = adjust_brightness()` thì hàm chạy ngay một lần và gán `None`.
- Thiếu vòng `while` ở cuối thì chương trình kết thúc và sự kiện không còn được xử lý.
- `Button(2)` mặc định dùng kéo lên, nên nút nối **GPIO ↔ GND** *(ngoài slide)*.

## 🔗 Liên kết

- **Tiền đề:** [[gpio-python]] · [[chan-digital-vs-analog]]
- **Dẫn tới:** [[hc-sr04-sieu-am]] · [[giao-dien-iot]]

## ❓ Câu hỏi mở

- Nút cơ học bị dội (bounce): một lần nhấn có thể tăng hai nấc không? `Button(2, bounce_time=0.05)` có đủ không?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 16–22, 29
