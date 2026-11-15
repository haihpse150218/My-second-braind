---
slug: dashboard-flask-sqlite
title: Dashboard Flask + SQLite cho 6 nhóm — Practice 6.5
vault: iot
type: concept
branch: F
order: 6
status: learning
tags: [iot, raspberry-pi, web, python, sql, bai-tap]
prev: [http-post-json]
next: [pi-lam-cda-gda]
related: [uart-pi-arduino, dht11-dht22, co-so-du-lieu-iot, flask-tren-pi]
sources: ["Practice 6_5.pdf"]
created: 2026-11-15
---

# Dashboard Flask + SQLite cho 6 nhóm — Practice 6.5

> Tóm tắt 1 câu: mỗi nhóm nối **DHT11 → Arduino → Serial → Pi → JSON → `POST /api/data`** về **một server chung**; server ghi vào SQLite `data/data.db` và trang `/` hiện số đo mới nhất của `group1`…`group6`.

**Ngày tạo:** 2026-11-15
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F · #6 ← cần [[http-post-json]] · → kế tiếp [[pi-lam-cda-gda]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #web #python #sql #bai-tap

---

## 💡 Ý chính

Bài này **nối mọi mảnh của Part 2 thành một đường ống**:

```text
DHT11 ─▶ Arduino ─Serial─▶ Pi ─JSON / HTTP POST─▶ Flask server ─▶ SQLite data/data.db
 (dht11-dht22)   (uart-pi-arduino)   (http-post-json)      (flask-tren-pi)  (co-so-du-lieu-iot)
                                                                  │
                                                         GET / ──▶ dashboard 6 nhóm, tự làm mới
```

| Thành phần | Ai làm | Theo đề |
|---|---|---|
| Arduino + DHT11 | mỗi nhóm | đọc cảm biến, gửi qua Serial |
| Pi | mỗi nhóm | đọc Serial, đóng JSON, POST |
| Server "Cloud" | **một máy chung** (đề gọi là Cloud) | `POST /api/data`, `data/data.db`, dashboard `/` |

So với Practice 6_4 ([[http-post-json]]): endpoint đổi từ `/post-data` thành `/api/data`, và JSON có thêm **`group_id`, `device_id`, `timestamp`**. Ba trường này là cái giúp một server phân biệt được 6 nhóm và biết số đo lúc nào.

## 🧩 Trực giác / Ví dụ

Server như **bảng điểm chung của lớp**: 6 nhóm cùng nộp phiếu vào một hộp. Phiếu không ghi tên nhóm (`group_id`) thì không biết ghi điểm cho ai; không ghi giờ (`timestamp`) thì không biết phiếu nào mới nhất.

## 🔢 Công thức / Định nghĩa

**JSON gửi lên** (theo đề):

| Trường | Kiểu | Ý nghĩa |
|---|---|---|
| `group_id` | chuỗi | `group1` … `group6` |
| `device_id` | chuỗi | tên Pi, ví dụ `rpi-group1` |
| `temperature` | số | °C |
| `humidity` | số | % |
| `timestamp` | chuỗi ISO 8601 | thời điểm **gửi**, ví dụ `2026-03-14T09:40:00Z` (`Z` = giờ UTC) |

**① Arduino** — đề không có code. Định dạng dòng `T:..,H:..` là **mình tự đặt** (⚠️ chưa chạy trên mạch thật; thư viện *DHT sensor library* của Adafruit):

```cpp
#include <DHT.h>
DHT dht(2, DHT11);            // chân DATA ở D2

void setup() { Serial.begin(9600); dht.begin(); }

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  Serial.print("T:"); Serial.print(t, 1);
  Serial.print(",H:"); Serial.println(h, 1);   // lỗi đọc thì in "nan"
  delay(10000);                                 // DHT11 đọc tối đa 1 lần/giây
}
```

**② Pi** — đề chỉ có ví dụ gửi **số cố định**, không đọc Serial. Bản đầy đủ của mình (🔎 hàm `parse` đã chạy thử; cổng serial thật **chưa thử**):

```python
import math
import time
from datetime import datetime, timezone

import requests
import serial

SERVER_URL = "http://<IP-server>:5000/api/data"
GROUP_ID = "group1"


def parse(line):
    """'T:29.4,H:70.2' -> (29.4, 70.2); dòng hỏng -> None."""
    try:
        parts = dict(p.split(":") for p in line.strip().split(","))
        t, h = float(parts["T"]), float(parts["H"])
    except (ValueError, KeyError):
        return None
    if not (math.isfinite(t) and math.isfinite(h)):   # Arduino in "nan" khi DHT lỗi
        return None
    return t, h


ser = serial.Serial("/dev/ttyS0", 9600, timeout=2)
while True:
    reading = parse(ser.readline().decode(errors="ignore"))
    if reading is None:
        continue                                      # dòng rỗng hoặc lỗi DHT
    payload = {
        "group_id": GROUP_ID,
        "device_id": f"rpi-{GROUP_ID}",
        "temperature": reading[0],
        "humidity": reading[1],
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }
    try:
        r = requests.post(SERVER_URL, json=payload, timeout=10)
        print(r.status_code, r.text)
    except requests.exceptions.RequestException as e:
        print("Lỗi mạng:", e)
    time.sleep(10)
```

**③ Server** — đề mô tả chức năng nhưng **không đưa code**; nhiều khả năng giảng viên chạy sẵn. Bản tự viết để thử ở nhà (🔎 đã chạy với Flask test client: POST hợp lệ trả 201, `group7` hoặc thiếu trường trả 400, dashboard chỉ hiện bản ghi mới nhất mỗi nhóm):

```python
import os
import sqlite3
from flask import Flask, jsonify, request

DB = "data/data.db"
GROUPS = [f"group{i}" for i in range(1, 7)]
app = Flask(__name__)


def db():
    os.makedirs("data", exist_ok=True)
    conn = sqlite3.connect(DB)
    conn.execute("""CREATE TABLE IF NOT EXISTS readings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        group_id TEXT NOT NULL, device_id TEXT,
        temperature REAL, humidity REAL,
        timestamp TEXT,                                   -- giờ Pi gửi
        received_at TEXT DEFAULT CURRENT_TIMESTAMP)""")   # giờ server nhận
    return conn


@app.post("/api/data")
def receive():
    d = request.get_json(silent=True) or {}
    if d.get("group_id") not in GROUPS:
        return jsonify(error="group_id phải là group1..group6"), 400
    try:
        t, h = float(d["temperature"]), float(d["humidity"])
    except (KeyError, TypeError, ValueError):
        return jsonify(error="thiếu hoặc sai temperature/humidity"), 400
    with db() as conn:
        conn.execute("INSERT INTO readings (group_id, device_id, temperature, humidity, timestamp)"
                     " VALUES (?, ?, ?, ?, ?)",
                     (d["group_id"], d.get("device_id"), t, h, d.get("timestamp")))
    return jsonify(status="ok"), 201


@app.get("/")
def dashboard():
    with db() as conn:
        rows = conn.execute("""SELECT group_id, temperature, humidity, timestamp
            FROM readings r WHERE id = (SELECT MAX(id) FROM readings WHERE group_id = r.group_id)
            ORDER BY group_id""").fetchall()
    latest = {r[0]: r for r in rows}
    cells = "".join(
        f"<tr><td>{g}</td><td>{latest[g][1]} °C</td><td>{latest[g][2]} %</td><td>{latest[g][3]}</td></tr>"
        if g in latest else f"<tr><td>{g}</td><td colspan=3>chưa có dữ liệu</td></tr>"
        for g in GROUPS)
    return ('<meta http-equiv="refresh" content="5">'      # tự làm mới 5 s
            f"<table border=1><tr><th>Nhóm</th><th>Nhiệt độ</th><th>Độ ẩm</th><th>Lúc gửi</th></tr>{cells}</table>")


app.run(host="0.0.0.0", port=5000)
```

"Mới nhất" lấy theo `id` (thứ tự server nhận), **không** theo `timestamp` của Pi, vì đồng hồ Pi có thể lệch.

## ⚙️ Khi nào dùng / Ứng dụng

- Mẫu chung cho mọi bài "nhiều thiết bị gửi về một chỗ": thêm trường định danh thiết bị và thời gian vào mỗi bản tin.
- Đây đúng là vai GDA gom dữ liệu từ nhiều CDA → [[pi-lam-cda-gda]], [[cda-gda]].
- NullPet ([[du-an-esp32-mcp]]) có thể dùng lại khung JSON này cho log cảm biến gửi về laptop.

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- ⚠️ **Đề tự mâu thuẫn về địa chỉ server:** phần JSON ghi `<IP-server>`, phần "Server" ghi `<IP-raspberry>`. Nếu server chung của lớp thì dùng IP **máy server**, không phải IP Pi của nhóm mình. Hỏi lại giảng viên trước khi chạy.
- ⚠️ **`print(response.json())` trong code mẫu sẽ báo lỗi** nếu server trả HTML hoặc trang lỗi không phải JSON. In `response.text` an toàn hơn.
- ⚠️ **Code mẫu không có `try/except` cho lỗi mạng**: server chưa bật là script dừng. Bài 6_4 cũng đã gặp → [[http-post-json]].
- **Arduino in `nan` khi DHT11 đọc lỗi**, và 🔎 `float("nan")` trong Python **không báo lỗi**, nên phải lọc bằng `math.isfinite`, nếu không dashboard hiện `nan`.
- `timestamp` là **giờ gửi**, không phải giờ đo. Nếu Pi chưa đồng bộ giờ (không có mạng lúc khởi động), dashboard có thể hiện năm 1970 hoặc giờ sai.
- Nhớ `datetime.now(timezone.utc)`: `datetime.now()` không có múi giờ sẽ cho chuỗi không có `Z` hay `+00:00`, server không biết đó là giờ nào.
- Đặt sai `group_id` là ghi đè lên ô của nhóm khác trên dashboard, vì server chỉ biết nhóm qua trường này. Không có xác thực.
- Đề không nói server trả mã nào. Kiểm tra `200 <= status_code < 300` thay vì so đúng `201` như bài 6_4.
- `data/data.db` là **đường dẫn tương đối**: chạy server từ thư mục khác thì nó tạo database mới ở chỗ khác, dashboard trống.

## 🔗 Liên kết

- **Tiền đề:** [[http-post-json]] · [[uart-pi-arduino]] · [[dht11-dht22]]
- **Dẫn tới:** [[pi-lam-cda-gda]] · [[pub-sub]] → [[mosquitto-broker]] (cùng bài này nhưng gửi qua MQTT)
- **Liên quan:** [[co-so-du-lieu-iot]] · [[flask-tren-pi]] · [[luu-csv-tren-pi]]

## ❓ Câu hỏi mở

- Server chung chạy ở máy nào trong lab, IP bao nhiêu? (Không ghi IP lab vào repo public.)
- "Hiển thị lịch sử dữ liệu gần nhất" là bao nhiêu bản ghi mỗi nhóm?
- Pi có cần gửi lại các bản tin đã mất khi mạng rớt không, hay bỏ qua?

## 📚 Nguồn

- `Practice 6_5.pdf` — 3 trang (tài liệu bài thực hành, nhận 2026-11-15); bản chép ở `_inbox/iot-practice-6-5-dashboard.md`
