---
slug: dht11-dht22
title: Cảm biến DHT11 và DHT22 — nhiệt độ, độ ẩm trên Pi
vault: iot
type: concept
branch: E
order: 11
status: learning
tags: [iot, raspberry-pi, cam-bien, python, bai-tap]
prev: [uart-pi-arduino]
next: [giao-dien-iot]
related: [cam-bien, pi-lam-cda-gda, luu-csv-tren-pi]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# Cảm biến DHT11 và DHT22 — nhiệt độ, độ ẩm trên Pi

> Tóm tắt 1 câu: DHT gửi **số digital qua một dây** nên Pi đọc được dù không có ADC; DHT22 chính xác hơn DHT11, nhưng cả hai đều **đôi khi đọc lỗi** nên code luôn phải có `try/except` và đọc lại.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #11 ← cần [[uart-pi-arduino]] · → kế tiếp [[giao-dien-iot]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #cam-bien #python #bai-tap

---

## 💡 Ý chính

| Pi | DHT |
|---|---|
| 3,3 V | VCC |
| GPIO 4 (`board.D4`) | Signal / DAT |
| GND | GND |

| | DHT11 | DHT22 |
|---|---|---|
| Nhiệt độ | 0–50 °C, ±2 °C | −40–80 °C, ±0,5 °C |
| Độ ẩm | 20–90%, ±5% | 0–100%, ±2% |
| Độ phân giải | 1 °C, 1% | 0,1 °C, 0,1% |
| Điện áp | 3–5,5 V | 3–6 V |
| Dòng | 0,5–2,5 mA | 1–1,5 mA |
| Chu kỳ lấy mẫu | 1 s | 2 s |
| Giá | $1–5 | $4–10 |

## 🧩 Trực giác / Ví dụ

So với LM35 ở [[nhiet-ke-lm35]]: LM35 trả về **điện áp** nên cần ADC, còn DHT tự đo rồi **nói ra con số** qua chân data.

## 🔢 Công thức / Định nghĩa

```bash
pip3 install requests RPi.GPIO adafruit-circuitpython-dht
```

```python
import time
import board
import adafruit_dht

dhtDevice = adafruit_dht.DHT11(board.D4)     # DHT22: adafruit_dht.DHT22(board.D4)

while True:
    try:
        temperature = dhtDevice.temperature
        humidity = dhtDevice.humidity
        print(f"Temp: {temperature:.1f} C  Humidity: {humidity:.1f} %")
    except RuntimeError as error:
        print(error.args[0])                 # DHT đôi khi lỗi do chất lượng tín hiệu
    time.sleep(5.0)                          # đọc lại sau 5 giây
```

Code trên đã đổi `//` của slide thành `#`.

## ⚙️ Khi nào dùng / Ứng dụng

- Practice 6.1: thu dữ liệu, in ra màn hình.
- Lưu lại → [[luu-csv-tren-pi]]; gửi đi → [[http-post-json]].

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- ⚠️ **Slide không thống nhất về nguồn.** Tr. 49 ghi 3V3, tr. 50 ghi 3,3 / 5 V và cảnh báo 5 V thì phải giảm áp Signal, tr. 51 ghi 5 Volt. **Dùng 3,3 V** là an toàn và không cần mạch giảm áp.
- ⚠️ Tr. 51–52 dùng `//` để chú thích. Đó là cú pháp C, Python sẽ báo `SyntaxError`.
- Tr. 52 chú thích "DHT22" nhưng code khởi tạo DHT11.
- Đọc nhanh hơn chu kỳ lấy mẫu thì lỗi nhiều hơn.
- Từ Debian 12, `pip3 install` vào Python hệ thống có thể báo `externally-managed-environment`, cần dùng `venv` *(ngoài slide)*. Ảnh trong slide là Debian 11.

## 🔗 Liên kết

- **Tiền đề:** [[cam-bien]] · [[pi-gpio-pinout]]
- **Dẫn tới:** [[luu-csv-tren-pi]] · [[pi-lam-cda-gda]]

## ❓ Câu hỏi mở

- Thư viện đọc DHT bằng cách đếm thời gian xung trên Linux: đó có phải lý do lỗi xuất hiện thường xuyên hơn trên Pi không?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 48–52
