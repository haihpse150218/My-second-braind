---
slug: mqtt
title: MQTT — topic, wildcard, QoS, retain, last will
vault: iot
type: concept
branch: G
order: 2
status: learning
tags: [iot, giao-thuc, mqtt]
prev: [pub-sub]
next: [mosquitto-broker]
related: [http-post-json, dashboard-flask-sqlite, cda-gda]
sources: ["Programming the Internet of Things (Andy King) — ch. 6"]
created: 2026-11-15
---

# MQTT — topic, wildcard, QoS, retain, last will

> Tóm tắt 1 câu: MQTT là giao thức pub/sub nhẹ chạy trên TCP (cổng **1883**): client nối tới broker, publish/subscribe theo **topic phân cấp bằng `/`**, chọn **QoS 0/1/2** cho độ chắc chắn, dùng **retain** để giữ giá trị cuối và **last will** để báo thiết bị chết.

**Ngày tạo:** 2026-11-15
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh G · #2 ← cần [[pub-sub]] · → kế tiếp [[mosquitto-broker]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #giao-thuc #mqtt

---

## 💡 Ý chính

- Ra đời 1999 để giám sát **đường ống dầu**; chuẩn OASIS 3.1.1 (2013), ISO (2016); bản mới là 5.0. Sách và đa số cloud dùng **3.1.1**.
- Mọi kết nối là TCP tới broker. **MQTT không tự mã hóa**; muốn mã hóa phải bật TLS (cổng 8883) → `tls-dtls-cho-iot`.
- Gói tin rất nhỏ: header cố định chỉ **2–5 byte**.

## 🧩 Trực giác / Ví dụ

| Tính năng | Ví von |
|---|---|
| Topic `lab/group1/dht11` | đường dẫn thư mục |
| QoS 0 / 1 / 2 | thư thường / thư bảo đảm có thể đến 2 lần / thư bảo đảm ký nhận 2 chiều |
| Retain | **bảng tin**: chỉ dán tờ mới nhất, ai đi qua cũng đọc được ngay |
| Last will | **di chúc** gửi broker giữ hộ, chỉ mở khi mình "chết" bất thường |
| Keep alive | điểm danh định kỳ; quá hạn không thấy mặt thì broker coi như đã chết |

## 🔢 Công thức / Định nghĩa

**Topic và wildcard** (sách tr. 172–173; 🔎 đã thử trên Mosquitto thật):

| Mẫu subscribe | Khớp | Không khớp |
|---|---|---|
| `lab/+/dht11` (`+` = đúng **một** mức) | `lab/group1/dht11` | `lab/a/b/dht11`, `lab/group1/led` |
| `lab/#` (`#` = mọi mức phía sau, đặt cuối) | `lab/group1/dht11`, `lab/x/y/z` | `Lab/group1/dht11` |

- Topic **phân biệt hoa thường**: `Lab` ≠ `lab`.
- **Chỉ subscriber được dùng wildcard.** 🔎 `paho` từ chối ngay: `Publish topic cannot contain wildcards.`
- Không bắt đầu topic bằng `/` (sẽ thành một mức rỗng). Dùng `#` vừa phải: nhận cả đống bản tin không cần.

**QoS** (sách tr. 176):

| QoS | Tên đúng theo chuẩn | Bắt tay | Rủi ro |
|---|---|---|---|
| 0 | **at most once** — bắn rồi quên | PUBLISH | có thể mất |
| 1 | **at least once** | PUBLISH → PUBACK, gửi lại tới khi có PUBACK | có thể **trùng** |
| 2 | **exactly once** | PUBLISH → PUBREC → PUBREL → PUBCOMP | chậm nhất, tốn nhất |

QoS là **riêng từng chặng**: Pi → broker một mức, broker → subscriber theo mức subscriber xin. Thực tế mức giao tới = mức **thấp hơn** trong hai mức.

**14 loại Control Packet** (tr. 175–176), nhớ theo cặp: `CONNECT/CONNACK` · `PUBLISH/PUBACK` · `PUBREC/PUBREL/PUBCOMP` · `SUBSCRIBE/SUBACK` · `UNSUBSCRIBE/UNSUBACK` · `PINGREQ/PINGRESP` · `DISCONNECT`.

**Cờ trong CONNECT** (tr. 185–188):

| Cờ | Ý nghĩa |
|---|---|
| Username / Password | xác thực đơn giản; có user không cần pass, **không** được có pass mà không có user |
| Will flag, Will QoS, Will Retain | đăng ký last will |
| Clean Session | `True` = mỗi lần nối là phiên mới, broker quên subscription cũ |
| Keep Alive (giây) | quá khoảng này không có gói nào thì client gửi `PINGREQ`; broker không nghe gì thì ngắt |
| Client ID | tên phiên; để trống thì broker tự sinh, nhưng khi đó **bắt buộc** Clean Session = True |

**Retain và Last Will** — 🔎 đã thử trên `test.mosquitto.org`:
- Publish `retain=True` rồi mới có client subscribe: client đó nhận **đúng 1 bản tin, bản cuối cùng**, cờ `retain` = True. Bản tin không retain thì client vào sau không nhận.
- Client đặt will `status = offline` rồi **đóng socket không gửi DISCONNECT** (giống rút điện): người đang theo dõi nhận `offline`.
- Client gọi `disconnect()` đàng hoàng: **will không được phát**.
- Xoá retained: publish **payload rỗng** với `retain=True` lên topic đó.

## ⚙️ Khi nào dùng / Ứng dụng

- Mẫu chuẩn cho trạng thái thiết bị: will `offline` + retain, khi nối xong publish `online` + retain → dashboard luôn biết Pi nào đang sống.
- Số đo định kỳ: QoS 0 hoặc 1. Lệnh điều khiển (mở khoá, bật bơm): QoS 1 kèm xử lý trùng, hoặc QoS 2.
- Code thật → [[mosquitto-broker]].

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- ⚠️ **Sách in sai tên QoS 2** là "At most once" (tr. 176), dù phần giải thích ngay dưới lại viết "exactly once". Theo chuẩn: QoS 0 = *at most once*, QoS 2 = *exactly once*.
- ⚠️ **Hai client trùng Client ID** thì broker ngắt client cũ. 🔎 Đã thử: với `loop_start()` thì `paho` tự nối lại, nên hai bên **đá nhau qua lại liên tục**, log chỉ ghi `Unspecified error`. 6 nhóm copy chung code `client_id="rpi"` sẽ gặp đúng lỗi này. Đặt ID theo nhóm.
- 🔎 `paho` báo lỗi `A client id must be provided if clean session is False` khi để trống ID mà tắt Clean Session (khớp sách tr. 187).
- QoS 1 có thể nhận trùng: lưu vào database thì nên chịu được bản ghi lặp.
- Wildcard không dùng được khi publish.
- Retain chỉ giữ **một** bản tin cuối mỗi topic, không phải lịch sử. Lịch sử vẫn phải lưu ở database → [[co-so-du-lieu-iot]].
- Will **không** phát khi client tự `disconnect()`, nên trước khi tắt có chủ đích hãy tự publish `offline`.

## 🔗 Liên kết

- **Tiền đề:** [[pub-sub]]
- **Dẫn tới:** [[mosquitto-broker]] · `coap` · `tls-dtls-cho-iot`
- **Liên quan:** [[http-post-json]] · [[dashboard-flask-sqlite]] · [[cda-gda]]

## ❓ Câu hỏi mở

- Môn có dùng MQTT 5.0 không, hay chỉ 3.1.1 như sách?
- Khi lên cloud (Ubidots, AWS IoT Core ở ch. 11), topic và QoS có bị giới hạn gì?

## 📚 Nguồn

- *Programming the Internet of Things* (Andy King) — ch. 6, tr. 170–177, 185–188
- Hành vi retain, will, wildcard, client ID: tự kiểm tra bằng `paho-mqtt` 2.1.0 với `test.mosquitto.org`, 2026-11-15
