---
slug: pub-sub
title: Publish/Subscribe — gửi qua broker thay vì gọi thẳng
vault: iot
type: concept
branch: G
order: 1
status: learning
tags: [iot, giao-thuc, mqtt, kien-truc]
prev: [dashboard-flask-sqlite]
next: [mqtt]
related: [http-post-json, giao-tiep-hai-chieu-bang-chuoi, cda-gda]
sources: ["Programming the Internet of Things (Andy King) — ch. 6"]
created: 2026-11-15
---

# Publish/Subscribe — gửi qua broker thay vì gọi thẳng

> Tóm tắt 1 câu: bên gửi **publish** bản tin lên một **topic** ở **broker**, bên nhận **subscribe** topic đó; hai bên không cần biết địa chỉ của nhau, không cần online cùng lúc theo một thứ tự nào, và một bản tin có thể tới nhiều người nhận.

**Ngày tạo:** 2026-11-15
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh G · #1 ← cần [[dashboard-flask-sqlite]] · → kế tiếp [[mqtt]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #giao-thuc #mqtt #kien-truc

---

## 💡 Ý chính

So sánh với cách Practice 6.5 đang làm:

| | HTTP POST ([[dashboard-flask-sqlite]]) | Pub/Sub (MQTT) |
|---|---|---|
| Ai biết ai | Pi phải biết IP của server | Pi và server **chỉ biết broker** |
| Quan hệ | 1 gửi → 1 nhận | nhiều gửi ↔ nhiều nhận |
| Thêm người nhận (ví dụ app điện thoại) | sửa code Pi để POST thêm chỗ nữa | app chỉ cần subscribe, **Pi không đổi gì** |
| Chiều ngược lại (bật LED từ xa) | Pi phải chạy thêm web server | Pi subscribe một topic lệnh |
| Kết nối | mở và đóng mỗi lần gửi | giữ một kết nối TCP lâu dài |

```text
     publish lab/group1/dht11                   subscribe lab/+/dht11
Pi nhóm 1 ───────────────┐                 ┌──────────────► Server dashboard
Pi nhóm 2 ───────────────┼──► BROKER ──────┼──────────────► App điện thoại
Pi nhóm 6 ───────────────┘   (Mosquitto)   └──────────────► Máy ghi log
```

Broker là **một chương trình riêng**, không nằm trong app gửi hay app nhận. Nó có thể chạy trên cùng máy hoặc một máy khác (sách tr. 178).

## 🧩 Trực giác / Ví dụ

Pub/Sub như **nhóm chat theo chủ đề**: mình nhắn vào kênh `#nhiet-do`, ai tham gia kênh thì đọc được. Mình không cần biết có bao nhiêu người đọc, cũng không cần số điện thoại của họ. Broker là ứng dụng chat đứng giữa.

HTTP thì như **gọi điện**: phải có số của từng người, gọi lần lượt, họ phải đang nghe máy.

## 🔢 Công thức / Định nghĩa

| Từ | Nghĩa |
|---|---|
| **Publisher** | bên gửi bản tin |
| **Subscriber** | bên đăng ký nhận |
| **Topic** | tên "kênh", ví dụ `lab/group1/dht11` |
| **Broker** | server trung gian nhận và phân phối; trong MQTT gọi broker hay server đều được |

Cùng một client có thể vừa publish vừa subscribe: Pi publish số đo **và** subscribe topic lệnh LED.

## ⚙️ Khi nào dùng / Ứng dụng

- Nhiều thiết bị gửi về, nhiều nơi muốn nhận: đúng cảnh 6 nhóm của Practice 6.5.
- Thiết bị cần nhận lệnh từ xa mà không muốn mở cổng web server.
- Vẫn dùng HTTP khi chỉ cần hỏi–đáp đơn lẻ, ví dụ trình duyệt mở dashboard.

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- **Subscriber vào sau thì không nhận lại bản tin cũ** (sách tr. 171), trừ khi bản tin được gửi kèm cờ **retain** → [[mqtt]].
- Broker là **điểm chết duy nhất**: broker tắt thì không ai nói chuyện được với ai.
- Bên gửi không biết có ai đang nghe. Pub/Sub không thay được "đã lưu vào database chưa"; muốn biết thì bên nhận phải tự publish xác nhận.
- Chuỗi tự đặt `TEMP:27.5` qua HC-05 ([[giao-tiep-hai-chieu-bang-chuoi]]) là 1–1, không có broker, nên không phải pub/sub.

## 🔗 Liên kết

- **Tiền đề:** [[dashboard-flask-sqlite]] · [[http-post-json]]
- **Dẫn tới:** [[mqtt]] · [[mosquitto-broker]]
- **Liên quan:** [[cda-gda]] — trong sách, CDA và GDA nói chuyện với nhau qua broker MQTT

## ❓ Câu hỏi mở

- Với NullPet ([[du-an-esp32-mcp]]), laptop là GDA: nên đặt broker ngay trên laptop hay trên Pi?

## 📚 Nguồn

- *Programming the Internet of Things* (Andy King) — ch. 6, tr. 169–171, 177–178
