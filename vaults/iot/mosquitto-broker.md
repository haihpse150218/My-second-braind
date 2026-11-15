---
slug: mosquitto-broker
title: Broker Mosquitto trên Pi + Practice 6.5 phiên bản MQTT
vault: iot
type: concept
branch: G
order: 3
status: learning
tags: [iot, giao-thuc, mqtt, raspberry-pi, python, bai-tap]
prev: [mqtt]
next: [mqtt-luu-tru-va-dlq]
related: [dashboard-flask-sqlite, co-so-du-lieu-iot, pi-lam-cda-gda, du-an-esp32-mcp]
sources: ["Programming the Internet of Things (Andy King) — ch. 6"]
created: 2026-11-15
---

# Broker Mosquitto trên Pi + Practice 6.5 phiên bản MQTT

> Tóm tắt 1 câu: **Mosquitto** là broker MQTT mã nguồn mở của Eclipse. Cài lên Pi, mở cổng 1883 cho mạng lab, rồi viết lại Practice 6.5: Pi **publish** số đo lên `iad591/<nhóm>/dht11`, server **subscribe** `iad591/+/dht11` và ghi vào cùng file SQLite.

**Ngày tạo:** 2026-11-15
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh G · #3 ← cần [[mqtt]] · → kế tiếp [[mqtt-luu-tru-va-dlq]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #giao-thuc #mqtt #raspberry-pi #python #bai-tap

---

## 💡 Ý chính

```text
Pi nhóm k ── publish iad591/groupk/dht11 (QoS 1, retain) ──►  Mosquitto :1883  ──► server_sub.py ──► data/data.db ──► dashboard /
          └─ will    iad591/groupk/status = offline ───────►                    (subscribe iad591/+/dht11, +/status)
```

So với bản HTTP ([[dashboard-flask-sqlite]]): đổi **đường vận chuyển**, giữ nguyên database và dashboard. Server **lấy tên nhóm từ topic**, nên JSON không cần `group_id` nữa.

## 🧩 Trực giác / Ví dụ

Mosquitto là **bưu cục** của lab: không đọc nội dung thư, chỉ nhìn địa chỉ (topic) để chuyển cho đúng người đã đăng ký.

## 🔢 Công thức / Định nghĩa

**1. Cài và chạy** (lệnh apt chuẩn của Raspberry Pi OS, *chưa chạy trên Pi lab*):

```bash
sudo apt install mosquitto mosquitto-clients
sudo systemctl enable --now mosquitto      # chạy nền, tự bật khi khởi động
pip3 install paho-mqtt                     # thư viện client cho Python
```

**2. Mở cho máy khác trong mạng** — ⚠️ Mosquitto **từ bản 2.0** mặc định *chỉ nghe localhost*; sách dùng 1.4.8 nên không nhắc. 🔎 Đã thử với 2.0.18 trong WSL: chạy không có cấu hình thì log in `Starting in local only mode`; thêm 2 dòng dưới thì Windows kết nối vào được. Tạo `/etc/mosquitto/conf.d/lab.conf` (*chưa thử trên Pi lab*):

```text
listener 1883 0.0.0.0
allow_anonymous true
```

```bash
sudo systemctl restart mosquitto
hostname -I                        # IP của máy broker, ví dụ 192.168.1.50
ss -ltn | grep 1883                # phải thấy 0.0.0.0:1883, không phải 127.0.0.1:1883
```

🔎 Lúc thử, dịch vụ Mosquitto cài bằng apt đang nghe `127.0.0.1:1883`: mọi lệnh dùng IP đều báo `Error: Connection refused`, còn `localhost` thì chạy.

`allow_anonymous true` chỉ để học trong mạng lab. Hệ thật: `password_file` + TLS.

**3. Thử bằng dòng lệnh** (🔎 chạy thật trên Mosquitto 2.0.18 trong WSL; output dưới là thật, còn IP `192.168.1.x` là **ví dụ**, ở lab thay bằng IP thật và không ghi IP lab vào repo này):

```text
   Pi nhóm 1 (publisher)            Laptop (subscriber)
   192.168.1.51                      192.168.1.100
         │ mosquitto_pub -h 192.168.1.50   │ mosquitto_sub -h 192.168.1.50
         └──────────────►  BROKER  ◄───────┘
                   Pi chạy Mosquitto 192.168.1.50:1883
```

**Cả bên gửi lẫn bên nhận đều chỉ dùng IP của máy broker.** Hai bên không cần biết IP của nhau. `localhost` chỉ dùng khi lệnh chạy trên chính máy broker.

Bên nhận, subscribe trước (lệnh chạy treo để chờ; Ctrl+C để dừng):

```bash
mosquitto_sub -h 192.168.1.50 -t 'iad591/#' -v
```

Bên gửi (Pi), terminal khác:

```bash
mosquitto_pub -h 192.168.1.50 -t iad591/group1/dht11 -q 1 -m '{"temperature": 29.4, "humidity": 70.2}'
mosquitto_pub -h 192.168.1.50 -t iad591/group2/dht11 -q 1 -m '{"temperature": 27.1, "humidity": 65.0}'
mosquitto_pub -h 192.168.1.50 -t iad591/group1/status -q 1 -r -m online
```

Bên nhận hiện ngay:

```text
iad591/group1/dht11 {"temperature": 29.4, "humidity": 70.2}
iad591/group2/dht11 {"temperature": 27.1, "humidity": 65.0}
iad591/group1/status online
```

| Tuỳ chọn | Nghĩa |
|---|---|
| `-h` | IP của **broker** |
| `-p` | cổng, mặc định 1883 |
| `-t` | topic; để `'…/#'` trong nháy đơn kẻo shell hiểu `#` là chú thích |
| `-m` | nội dung bản tin |
| `-q 1` | QoS 1 |
| `-r` | retain; `-r -n` = gửi bản rỗng để **xoá** retained |
| `-v` | (sub) in cả tên topic |
| `-W 2` | (sub) chờ 2 giây rồi thoát |

Ba thử nghiệm thêm, output thật:

| Lệnh | Kết quả | Vì sao |
|---|---|---|
| Subscriber đến sau: `mosquitto_sub -h … -t 'iad591/#' -v -W 2` | `iad591/group1/status online` rồi `Timed out` | chỉ bản có `-r` còn lại; 2 bản `dht11` đã qua |
| Chỉ nhóm 2: `-t 'iad591/group2/#'`, rồi gửi cả nhóm 1 và 2 | chỉ `iad591/group2/dht11 {"temperature": 26.8}` | topic lọc ở broker |
| Sai cổng: `-p 1884` | `Error: Connection refused` | không có gì nghe ở cổng đó |

| Hiện ra | Nguyên nhân | Sửa |
|---|---|---|
| `Connection refused` khi dùng IP, `localhost` thì chạy | broker chỉ nghe máy nội bộ | `listener 1883 0.0.0.0`, restart |
| `Connection refused` ở mọi chỗ | broker chưa chạy hoặc sai cổng | `systemctl status mosquitto` |
| Chờ mãi rồi timeout | sai IP, khác mạng Wi-Fi, tường lửa | `ping 192.168.1.50` |
| Kết nối được mà không nhận gì | topic sai hoặc sai hoa thường | subscribe `'#'` để xem hết |
| Windows không có `mosquitto_sub` | chưa cài | cài Mosquitto cho Windows, hoặc app MQTT Explorer |

Sang Python giống hệt: trong code bên dưới chỉ cần điền `BROKER = "192.168.1.50"`.

**4. Pi publish** (🔎 đã chạy với `paho-mqtt` 2.1.0 tới `test.mosquitto.org`, số đo giả):

```python
import json
import time
from datetime import datetime, timezone

import paho.mqtt.client as mqtt

BROKER = "<IP-broker>"
GROUP = "group1"
DATA = f"iad591/{GROUP}/dht11"
STATUS = f"iad591/{GROUP}/status"


def read_dht():
    """Thay bằng parse(ser.readline()) của Practice 6.5."""
    return 29.4, 70.2


c = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id=f"rpi-{GROUP}")
c.will_set(STATUS, "offline", qos=1, retain=True)     # broker tự báo khi Pi chết
c.connect(BROKER, 1883, keepalive=30)
c.loop_start()                                         # luồng nền lo PINGREQ, gửi lại QoS 1
c.publish(STATUS, "online", qos=1, retain=True)

while True:
    t, h = read_dht()
    msg = json.dumps({"device_id": f"rpi-{GROUP}", "temperature": t, "humidity": h,
                      "timestamp": datetime.now(timezone.utc).isoformat()})
    c.publish(DATA, msg, qos=1, retain=True)
    time.sleep(10)
```

**5. Server subscribe → SQLite** (🔎 đã chạy cùng broker trên):

```python
import json
import os
import sqlite3

import paho.mqtt.client as mqtt

BROKER = "<IP-broker>"
os.makedirs("data", exist_ok=True)
conn = sqlite3.connect("data/data.db", check_same_thread=False)
conn.execute("""CREATE TABLE IF NOT EXISTS readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT, group_id TEXT, device_id TEXT,
    temperature REAL, humidity REAL, timestamp TEXT,
    received_at TEXT DEFAULT CURRENT_TIMESTAMP)""")


def on_connect(client, userdata, flags, reason_code, properties):
    print("Kết nối:", reason_code)
    client.subscribe("iad591/+/dht11", qos=1)          # đăng ký lại mỗi lần nối lại
    client.subscribe("iad591/+/status", qos=1)


def on_message(client, userdata, msg):
    group = msg.topic.split("/")[1]                    # nhóm lấy từ topic
    if msg.topic.endswith("/status"):
        print(group, "→", msg.payload.decode())
        return
    try:
        d = json.loads(msg.payload)
        t, h = float(d["temperature"]), float(d["humidity"])
    except (ValueError, KeyError, TypeError):
        print("Bỏ bản tin hỏng:", msg.payload[:50])
        return
    with conn:
        conn.execute("INSERT INTO readings (group_id, device_id, temperature, humidity, timestamp)"
                     " VALUES (?, ?, ?, ?, ?)", (group, d.get("device_id"), t, h, d.get("timestamp")))


c = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id="server-dashboard")
c.on_connect = on_connect
c.on_message = on_message
c.connect(BROKER, 1883, keepalive=30)
c.loop_forever()
```

Kết quả lần chạy thử: nhóm 1 publish 2 bản tin **trước** khi server bật → server nhận 1 bản (bản retained cuối); nhóm 2 publish 2 bản khi server đang chạy → nhận đủ 2; một bản tin `hong` không phải JSON → bị bỏ, server không chết. Dashboard `/` của [[dashboard-flask-sqlite]] dùng lại nguyên vẹn vì bảng `readings` giống hệt.

## ⚙️ Khi nào dùng / Ứng dụng

- Lab 6 nhóm: một Pi (hoặc máy giảng viên) chạy Mosquitto, các Pi khác chỉ cần IP broker.
- Điều khiển ngược: Pi subscribe `iad591/group1/led`, app nào publish `ON` thì Pi bật đèn, không cần Flask trên Pi.
- NullPet ([[du-an-esp32-mcp]]): ESP32-S3 có Wi-Fi, chạy client MQTT (thư viện `PubSubClient`) tới Mosquitto trên laptop GDA.

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- ⚠️ **Mosquitto 2.x không nhận kết nối từ máy khác** nếu thiếu `listener 1883`. Triệu chứng: `mosquitto_sub` trên chính Pi chạy được, Pi khác báo `Connection refused`.
- ⚠️ **`paho-mqtt` 2.x đổi API:** code trong sách viết theo 1.x (`mqtt.Client(client_id=...)`). 🔎 Bản 2.1 vẫn chạy nhưng in `DeprecationWarning`, và `on_connect` kiểu mới có thêm tham số (`flags, reason_code, properties`). Viết code mới thì luôn truyền `CallbackAPIVersion.VERSION2`.
- **Subscribe trong `on_connect`**, không phải sau `connect()`. Mất mạng rồi nối lại với Clean Session thì subscription cũ mất; `on_connect` chạy lại sẽ đăng ký lại.
- Quên `loop_start()` / `loop_forever()` thì không có gì được gửi đi hay nhận về, và keep-alive không chạy nên broker ngắt kết nối.
- `on_message` chạy trên **luồng nền** của paho. Dùng SQLite trong đó phải `check_same_thread=False` (hoặc mở kết nối trong callback).
- Topic lệnh không có xác thực: ai trong mạng cũng publish được `ON`.
- Broker công khai `test.mosquitto.org` chỉ để thử: **ai cũng đọc được mọi topic**. Không gửi dữ liệu thật hay IP lab lên đó.

## 🔗 Liên kết

- **Tiền đề:** [[mqtt]] · [[dashboard-flask-sqlite]]
- **Dẫn tới:** [[mqtt-luu-tru-va-dlq]] — broker lưu gì, có DLQ không (kèm mô phỏng HTML)
- **Liên quan:** [[co-so-du-lieu-iot]] · [[pi-lam-cda-gda]] · [[du-an-esp32-mcp]]

## ❓ Câu hỏi mở

- Lab dùng chung một broker cho 6 nhóm hay mỗi nhóm tự dựng? Broker chạy ở máy nào?
- Giảng viên có yêu cầu username/password hay TLS cho broker không?

## 📚 Nguồn

- *Programming the Internet of Things* (Andy King) — ch. 6, tr. 177–179 (Mosquitto 1.4.8, cổng 1883, cấu hình mặc định)
- Code và kết quả chạy: tự kiểm tra 2026-11-15 với `paho-mqtt` 2.1.0 và `test.mosquitto.org`
