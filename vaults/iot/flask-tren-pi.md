---
slug: flask-tren-pi
title: Flask trên Pi — điều khiển Arduino từ trình duyệt
vault: iot
type: concept
branch: F
order: 4
status: learning
tags: [iot, raspberry-pi, web, python, bai-tap]
prev: [co-so-du-lieu-iot]
next: [http-post-json]
related: [uart-pi-arduino, giao-dien-iot, pi-lam-cda-gda]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# Flask trên Pi — điều khiển Arduino từ trình duyệt

> Tóm tắt 1 câu: Flask biến **một URL thành một hàm Python**: mở `/10/on` thì hàm đó gửi lệnh Serial cho Arduino, nên điện thoại hay laptop cùng mạng đều bật được đèn.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F · #4 ← cần [[co-so-du-lieu-iot]] · → kế tiếp [[http-post-json]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #web #python #bai-tap

---

## 💡 Ý chính

**Exercise 3 (tr. 61):** trang "Arduino Web Server" có khối cho PIN 10 và PIN 11, hiện trạng thái *đang bật / đang tắt* kèm link đổi trạng thái, và danh sách lệnh BẬT / TẮT từng chân. Địa chỉ trên ảnh là `localhost/10/on`.

Đường đi của lệnh:

```text
trình duyệt → GET /10/on → Flask trên Pi → Serial → Arduino → LED
```

## 🧩 Trực giác / Ví dụ

Flask là **lễ tân**: mỗi địa chỉ khách gọi tới được chuyển cho đúng một người xử lý. `<pin>` và `<action>` trong URL là phần khách tự điền.

## 🔢 Công thức / Định nghĩa

```bash
sudo apt install python3-flask
```

Khung Exercise 3 (slide **không có code**, chỉ có ảnh kết quả; 🔎 route đã chạy với cổng serial giả, **chưa nối Arduino thật**). Slide chỉ có lệnh `'1'` và `'2'` cho một LED; `'3'` và `'4'` là mình tự đặt cho chân 11, và Arduino phải xử lý thêm hai lệnh này:

```python
from flask import Flask
import serial

ser = serial.Serial('/dev/ttyS0', 9600, timeout=1)
app = Flask(__name__)

CMD = {("10", "on"): b"1", ("10", "off"): b"2",
       ("11", "on"): b"3", ("11", "off"): b"4"}

@app.route("/<pin>/<action>")
def control(pin, action):
    cmd = CMD.get((pin, action))
    if cmd is None:
        return "Lệnh không hợp lệ", 404
    ser.write(cmd)
    return f"PIN {pin}: {action}"

app.run(host="0.0.0.0", port=5000)
```

## ⚙️ Khi nào dùng / Ứng dụng

- Điều khiển từ máy khác trong mạng, không cần cài gì trên máy đó.
- Nhận dữ liệu cảm biến gửi lên → [[http-post-json]].
- Về sau nối với MQTT, cloud ở nhánh G, H.

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- Không đặt `host="0.0.0.0"` thì chỉ chính Pi mở được trang.
- Ảnh dùng `localhost/10/on` **không có cổng**, tức server chạy cổng 80 và thường cần `sudo`. Mặc định của Flask là 5000.
- Dùng GET để thay đổi trạng thái chỉ hợp với bài lab. Trình duyệt có thể tự gọi lại URL; hệ thật nên dùng POST.
- Không có đăng nhập: ai cùng mạng cũng bật tắt được.
- Trạng thái *đang bật / đang tắt* phải tự lưu ở server, vì lệnh Serial một chiều không xác nhận Arduino đã làm.

## 🔗 Liên kết

- **Tiền đề:** [[uart-pi-arduino]]
- **Dẫn tới:** [[http-post-json]]
- **Liên quan:** [[giao-dien-iot]]

## ❓ Câu hỏi mở

- Exercise 3 có phải là Bài tập 3 tính điểm 15% không, và ai giữ code mẫu?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 59–61
