---
slug: giao-dien-iot
title: Giao diện IoT trên Pi — Tkinter, guizero, Easygui
vault: iot
type: concept
branch: F
order: 1
status: learning
tags: [iot, raspberry-pi, gui, python, bai-tap]
prev: [dht11-dht22]
next: [luu-csv-tren-pi]
related: [bon-thanh-phan-iot, led-7-doan-5161as, led-4-so-3641as, gpio-python]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# Giao diện IoT trên Pi — Tkinter, guizero, Easygui

> Tóm tắt 1 câu: đây là khối **UI** trong [[bon-thanh-phan-iot]]: thay vì LCD, Pi có cửa sổ thật; slide khuyên dùng **guizero**, vì nó bọc Tkinter nên code ngắn gọn.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F · #1 ← cần [[dht11-dht22]] · → kế tiếp [[luu-csv-tren-pi]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #gui #python #bai-tap

---

## 💡 Ý chính

| Thư viện | Là gì | Dùng khi |
|---|---|---|
| **Tkinter** | thư viện chuẩn của Python, mạnh, tùy biến cao, code dài | cần giao diện phức tạp |
| **guizero** ✅ | wrapper của Tkinter, dễ học, code ngắn, hợp IoT | mặc định của môn |
| **Easygui** | hộp thoại đơn giản | chỉ hỏi đáp nhanh |

## 🧩 Trực giác / Ví dụ

GUI và phần cứng nối nhau bằng **hàm**: nút trên màn hình gọi cùng một hàm mà nút nhấn thật gọi ở [[pi-nut-nhan-va-pwm]].

Khung Practice 5.1, cửa sổ "Điều Khiển LED" có 4 nút (slide không có code; 🔎 đã chạy phần guizero trên Windows, **chưa chạy trên Pi** với LED thật):

```python
from guizero import App, PushButton
from gpiozero import LED

led = LED(17)
app = App(title="Điều Khiển LED", width=200, height=240)

PushButton(app, text="BẬT LED", command=led.on)
PushButton(app, text="TẮT LED", command=led.off)
PushButton(app, text="Nháy LED", command=led.blink)   # chạy nền, không chặn GUI
PushButton(app, text="Đóng", command=app.destroy)

app.display()
```

## 🔢 Công thức / Định nghĩa

```bash
sudo apt-get install python3-tk
sudo apt-get install python3-guizero
sudo apt-get install python3-pip     # slide ghi "pip3": gói đó không tồn tại trên Debian
pip install easygui
```

| Bài | Yêu cầu | Trang |
|---|---|---:|
| Practice 5.1 — Button LED | GUI có 4 nút: Bật, Tắt, Nháy, Đóng | 30 |
| Practice 5.1 — số 0–9 | click số trên GUI → hiện trên [[led-7-doan-5161as]] | 38 |
| Practice 5.2 — dữ liệu cảm biến | GUI hiện nhiệt độ hoặc khoảng cách từ Arduino | 31 |
| Practice 5.2 — HC-SR04 | START / STOP, hiện trên [[led-4-so-3641as]] | 45 |

## ⚙️ Khi nào dùng / Ứng dụng

- Cập nhật số liệu định kỳ: dùng `app.repeat(1000, ham_doc_cam_bien)`.
- Điều khiển từ máy khác thì chuyển sang web → [[flask-tren-pi]].

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- **Không đặt `while True` hay `sleep()` dài trong hàm của nút**: `app.display()` đang chạy vòng lặp riêng, chặn nó là cửa sổ bị treo.
- Slide có **hai bài 5.1 và hai bài 5.2** khác nội dung. Khi nộp bài, nhớ ghi rõ số trang.
- Chạy qua SSH thuần thì không có màn hình để mở cửa sổ; hãy dùng VNC → [[pi-truy-cap-tu-xa]].

## 🔗 Liên kết

- **Tiền đề:** [[gpio-python]] · [[bon-thanh-phan-iot]]
- **Dẫn tới:** [[flask-tren-pi]]
- **Liên quan:** [[uart-pi-arduino]] · [[hc-sr04-sieu-am]]

## ❓ Câu hỏi mở

- Tiêu đề phần này có "đa giao thức", nhưng slide chỉ nêu UART, USB, Bluetooth. Phần MQTT có nằm ở Part 3 không?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 26–31, 38, 45
