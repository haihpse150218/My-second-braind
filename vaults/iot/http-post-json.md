---
slug: http-post-json
title: Gửi dữ liệu cảm biến bằng HTTP POST — Practice 6_4
vault: iot
type: concept
branch: F
order: 5
status: learning
tags: [iot, raspberry-pi, web, python, bai-tap]
prev: [flask-tren-pi]
next: [pi-lam-cda-gda]
related: [dht11-dht22, co-so-du-lieu-iot, giao-tiep-hai-chieu-bang-chuoi]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# Gửi dữ liệu cảm biến bằng HTTP POST — Practice 6_4

> Tóm tắt 1 câu: đọc cảm biến → đóng gói **JSON** → **POST** lên server → xem **mã trạng thái** để biết đã gửi được chưa; hai đầu phải thống nhất mã thành công, ở đây là `201`.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F · #5 ← cần [[flask-tren-pi]] · → kế tiếp [[pi-lam-cda-gda]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #web #python #bai-tap

---

## 💡 Ý chính

```text
DHT11/22 → {"temperature": .., "humidity": ..} → POST /post-data → kiểm tra phản hồi
```

Đây là bước tiến của chuỗi tự đặt `TEMP:27.5` ở [[giao-tiep-hai-chieu-bang-chuoi]]: JSON có tên trường rõ ràng, HTTP có sẵn mã trạng thái, không cần tự nghĩ giao thức.

## 🧩 Trực giác / Ví dụ

POST như **gửi thư bảo đảm**: JSON là nội dung, URL là địa chỉ, mã trạng thái là phiếu báo phát. Không nhận được phiếu thì chưa thể coi là đã gửi.

## 🔢 Công thức / Định nghĩa

**Phía gửi**, Practice 6_4 đã sửa (`timeout` và `RequestException` là phần mình thêm; đổi DHT22 thành DHT11 nếu dùng bộ của lab):

```python
import time
import requests
import board
import adafruit_dht

dhtDevice = adafruit_dht.DHT22(board.D4)
server_url = "http://<server_ip>:5000/post-data"

while True:
    try:
        temperature = dhtDevice.temperature
        humidity = dhtDevice.humidity
        data = {"temperature": temperature, "humidity": humidity}

        response = requests.post(server_url, json=data, timeout=5)
        if response.status_code == 201:
            print("Data sent successfully")
        else:
            print(f"Failed to send data. Status code: {response.status_code}")

    except RuntimeError as error:                       # lỗi đọc cảm biến
        print(error.args[0])
    except requests.exceptions.RequestException as error:   # lỗi mạng
        print(f"Network error: {error}")

    time.sleep(10.0)
```

**Phía nhận** (slide bảo xem `Practice 6_5.py` nhưng **file này không có trong PDF**; đây là bản mình tự viết, 🔎 đã chạy với Flask test client):

```python
import sqlite3
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/post-data", methods=["POST"])
def post_data():
    data = request.get_json()
    conn = sqlite3.connect("sensor.db")      # bảng readings ở co-so-du-lieu-iot
    conn.execute("INSERT INTO readings (temperature, humidity) VALUES (?, ?)",
                 (data["temperature"], data["humidity"]))
    conn.commit()
    conn.close()
    return jsonify(status="ok"), 201         # phải ghi rõ 201

app.run(host="0.0.0.0", port=5000)
```

| Mã | Nghĩa |
|---:|---|
| 200 | OK, mặc định của Flask |
| 201 | Created, đã tạo bản ghi mới |

## ⚙️ Khi nào dùng / Ứng dụng

- Thiết bị gửi định kỳ lên gateway hoặc cloud, số lượng không lớn.
- Tần suất cao, nhiều thiết bị hay mạng chập chờn thì MQTT hợp hơn (nhánh G).

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- ⚠️ **Code slide chờ `201`, nhưng Flask trả `200` nếu không ghi gì.** 🔎 Đã thử: route thường trả 200, nên client in "Failed" dù dữ liệu đã lưu.
- ⚠️ **Code slide chỉ bắt `RuntimeError`.** 🔎 Lỗi mạng của `requests` không phải `RuntimeError`, nên server tắt là script dừng hẳn. Không có `timeout` thì có thể treo mãi.
- `import json` ở tr. 69 không dùng tới, vì `json=data` đã tự chuyển đổi. Bản trên đã bỏ.
- Tr. 69–70 thiếu ký hiệu `#` ở các dòng chú thích, chép nguyên sẽ lỗi.
- HTTP không mã hóa; TLS để sau → nhánh G.
- Gửi hỏng là mất số đo: có thể ghi tạm vào [[luu-csv-tren-pi]] rồi gửi lại.

## 🔗 Liên kết

- **Tiền đề:** [[flask-tren-pi]] · [[dht11-dht22]]
- **Dẫn tới:** [[pi-lam-cda-gda]]
- **Liên quan:** [[co-so-du-lieu-iot]]

## ❓ Câu hỏi mở

- Cần xin Practice 6_5.py của giảng viên để đối chiếu: v2 khác v1 ở đâu?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 67–72
