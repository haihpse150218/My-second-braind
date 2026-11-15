---
slug: mqtt-luu-tru-va-dlq
title: Broker MQTT lưu gì — realtime, stream, hàng đợi, dead-letter
vault: iot
type: concept
branch: G
order: 4
status: learning
tags: [iot, giao-thuc, mqtt, kien-truc]
prev: [mosquitto-broker]
next: []
related: [mqtt, pub-sub, co-so-du-lieu-iot, dashboard-flask-sqlite]
sources: ["Thí nghiệm Mosquitto 2.0.18 + paho-mqtt 2.1.0, 2026-11-15"]
created: 2026-11-15
---

# Broker MQTT lưu gì — realtime, stream, hàng đợi, dead-letter

> Tóm tắt 1 câu: broker MQTT là **người đưa thư, không phải kho**: đẩy bản tin đi ngay, chỉ giữ tạm **retained (1 bản/topic)**, **hàng đợi riêng của client phiên bền** và **bản tin đang chờ ack**; không có lịch sử để đọc lại, và **không có dead-letter queue**.

**Ngày tạo:** 2026-11-15
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh G · #4 ← cần [[mosquitto-broker]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #giao-thuc #mqtt #kien-truc

**🎞️ Mô phỏng tương tác:** [mqtt-broker-explorer.html](mqtt-broker-explorer.html) — 3 Pi gửi qua broker tới Dashboard, App phiên bền, 2 worker shared subscription; bật/tắt QoS, retain, clean session, `max_queued_messages`, persistence, restart; mở file bằng trình duyệt

---

## 💡 Ý chính

| Câu hỏi | Trả lời | Bằng chứng (🔎 đã chạy) |
|---|---|---|
| Realtime? | **Có, kiểu push ngay**; không phải hard real-time | 10 bản tin QoS 0: cùng máy median **1 ms**, qua Internet tới `test.mosquitto.org` median **203 ms** |
| Stream? | Dòng bản tin đẩy tới, **không phải log** như Kafka: không offset, không đọc lại | publish `r0, r1, r2` có retain rồi mới subscribe → chỉ nhận `r2` |
| Store vào pool? | Chỉ 3 chỗ lưu tạm, riêng từng client; không có pool chung | xem bảng dưới |
| Dead-letter queue? | **Không có trong chuẩn** | hàng đầy → bỏ bản tin mới, log 1 dòng |

**Ba chỗ broker giữ bản tin:**

| Chỗ | Giữ gì | Giới hạn (mặc định Mosquitto) |
|---|---|---|
| Retained | 1 bản cuối mỗi topic, bản sau ghi đè | không |
| Hàng đợi phiên bền | bản tin QoS 1/2 cho client `clean_session=False` đang offline | `max_queued_messages 1000`, `queue_qos0_messages false` |
| In-flight | QoS 1/2 đã gửi, chờ PUBACK / PUBCOMP | `max_inflight_messages 20` |

Mặc định **chỉ trong RAM** (`persistence false`). Bật `persistence true` thì ghi `mosquitto.db` khi tắt đúng cách và mỗi `autosave_interval` (1800 s).

## 🧩 Trực giác / Ví dụ

**Kể bằng chuyện bưu điện xã** (giải thích cho người không học kỹ thuật): **Pi** = người gửi thư · **broker** = bưu điện · **Dashboard, điện thoại, máy tính** = các nhà nhận thư.

| # | Chuyện bưu điện | Tên kỹ thuật |
|---:|---|---|
| 1 | Máy nhỏ gắn nhiệt kế, 10 giây đọc một lần: "29 độ" | Pi đọc DHT11 |
| 2 | Viết vào thư, ngoài phong bì chỉ ghi **chủ đề** ("nhiệt độ nhóm 1"), không ghi người nhận | publish lên topic |
| 3 | Ai muốn biết thì ra bưu điện đăng ký theo chủ đề, như đặt báo; "nhóm nào cũng được", "mọi thứ" | subscribe, wildcard `+` `#` |
| 4 | Thư tới là đem đi liền: trong nhà ~1 phần nghìn giây, đi xa ~1/5 giây; đường tắc vẫn có thể muộn | push, không phải hard real-time |
| 5 | Thư thường rơi là mất; thư bảo đảm phải ký nhận, chưa ký thì gửi lại, có khi nhận 2 lá | QoS 0 · QoS 1 |
| 6 | Bảng tin đầu ngõ: mỗi chủ đề một chỗ dán, tờ mới đè tờ cũ | retained |
| 7 | Nhà vắng: không dặn thì mất thư; có dặn thì cất vào túi nhỏ, chỉ cất thư bảo đảm, túi đầy vứt thư mới | clean session · phiên bền · `max_queued_messages` |
| 8 | Thư bị vứt không cất vào đâu, bưu điện chỉ ghi một dòng sổ | không có DLQ |
| 9 | Bưu điện mất điện: không có sổ thì mất sạch, có sổ thì còn đủ | `persistence` |
| 10 | Hai người làm chung việc: chia lần lượt A, B, A… | shared subscription |
| 11 | Máy dặn trước "tôi biến mất thì báo mọi người"; chào tạm biệt đàng hoàng thì không báo | last will |
| 12 | Bưu điện không giữ bản sao; muốn xem lại thì tự chép sổ | database |

**Tóm lại:** bưu điện MQTT đưa thư rất nhanh nhưng là **người đưa thư, không phải nhà kho**. Phần này cũng có trên trang mô phỏng.

## 🔢 Công thức / Định nghĩa

Các thí nghiệm, Mosquitto 2.0.18 chạy trong WSL Ubuntu, client `paho-mqtt` 2.1.0:

| # | Thử | Kết quả |
|---|---|---|
| A | App phiên bền offline; gửi 3 bản QoS 1 + 2 bản QoS 0; App online lại | nhận `q1-0, q1-1, q1-2`; **mất cả 2 bản QoS 0**; `session_present=True` |
| B | Như A nhưng clean session | nhận `[]` |
| C | 3 bản retained `r0..r2`, rồi subscriber mới | nhận `['r2']` |
| D | MQTT 5 `$share/g/topic`, 2 worker + 1 subscriber thường, 6 job | Worker A `0,2,4` · Worker B `1,3,5` · subscriber thường nhận đủ 6 |
| E | MQTT 5 message expiry: bản hạn 60 s và bản hạn 2 s, App offline 5 s | chỉ nhận bản 60 s; bản hết hạn bị xoá, không đi đâu |
| F | `max_queued_messages 3`, gửi `m0..m5` lúc App offline | nhận `m0, m1, m2`; log: `Outgoing messages are being dropped for client ov.` |
| G | Restart broker, `persistence false` | mất cả hàng đợi lẫn retained |
| H | Restart broker, `persistence true` | còn đủ hàng đợi và retained (`mosquitto.db` 451 byte) |

Mosquitto 2.x không có file cấu hình: log in `Starting in local only mode` → đã kiểm chứng cảnh báo ở [[mosquitto-broker]].

## ⚙️ Khi nào dùng / Ứng dụng

- **Cần lịch sử** → subscriber ghi vào database ([[co-so-du-lieu-iot]], `data/data.db` của [[dashboard-flask-sqlite]]). Broker không thay được database.
- **Cần chia việc cho nhiều worker** → MQTT 5 shared subscription; MQTT 3.1.1 thì mọi subscriber đều nhận bản sao.
- **Cần DLQ** → tự làm ở subscriber: xử lý lỗi thì ghi vào bảng `failed` hoặc publish sang `lab/deadletter`; hoặc bridge sang RabbitMQ (có dead-letter exchange) hay Kafka.
- Kiến trúc thường gặp: thiết bị → MQTT ở biên → một subscriber đẩy vào database / Kafka trên cloud.

| | MQTT broker | Kafka | RabbitMQ |
|---|---|---|---|
| Giữ bản tin | tới khi giao; retained 1 bản | theo thời hạn, kể cả đã đọc | tới khi consumer ack |
| Đọc lại | không | có (offset) | không |
| Chia tải | shared subscription (v5) | consumer group | nhiều consumer / queue |
| Dead-letter | không | tự làm | có (DLX) |

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- ⚠️ **"QoS 1 thì chắc chắn không mất"**: sai khi client dùng clean session, khi hàng đợi đầy, hoặc khi broker restart không persistence.
- ⚠️ **QoS 0 gửi cho client offline bị bỏ** dù client có phiên bền (`queue_qos0_messages false`).
- **Retained không phải lịch sử**: chỉ 1 bản cuối.
- Thứ tự chỉ được giữ trong cùng topic (spec 3.1.1 mục 4.6), không giữ giữa các topic.
- Subscriber nhận xong mà ghi database lỗi thì broker vẫn coi là đã giao; mất là mất.
- `persistence true` vẫn có thể mất phần chưa kịp lưu nếu broker bị kill đột ngột giữa hai lần autosave *(theo cấu hình, chưa thử)*.
- `test.mosquitto.org` giữ phiên (`session_present=True`) nhưng **không giao bản tin đã xếp hàng** khi thử: đừng dùng broker công khai để kiểm tra hành vi hàng đợi.
- Broker Python `amqtt` giao retained **2 lần**: không dùng để học hành vi chuẩn.

## 🔗 Liên kết

- **Tiền đề:** [[mosquitto-broker]] · [[mqtt]]
- **Liên quan:** [[pub-sub]] · [[co-so-du-lieu-iot]] · [[dashboard-flask-sqlite]]

## ❓ Câu hỏi mở

- Lab có cần MQTT 5 (shared subscription, message expiry) không, hay chỉ 3.1.1?
- Với NullPet ([[du-an-esp32-mcp]]): lệnh điều khiển servo gửi qua MQTT nên dùng phiên bền hay không? Một lệnh cũ đến muộn có thể nguy hiểm hơn là mất lệnh.

## 📚 Nguồn

- Tự chạy thí nghiệm 2026-11-15: Mosquitto 2.0.18 (WSL Ubuntu), `paho-mqtt` 2.1.0
- Giá trị mặc định: `/usr/share/doc/mosquitto/examples/mosquitto.conf`
- *Programming the Internet of Things* (Andy King) — ch. 6, tr. 176–177 (QoS, retain)
