---
slug: bluetooth-master-slave
title: Bluetooth Master và Slave
vault: iot
type: concept
branch: D
order: 7
status: learning
tags: [iot, bluetooth, kien-truc]
prev: [hc05-led-trang-thai]
next: [giao-tiep-hai-chieu-bang-chuoi]
related: [hc05-lenh-at, bluetooth-hc-05]
sources: ["IAD_MSA33_Part_1_2.pdf"]
created: 2026-10-24
---

# Bluetooth Master và Slave

> Tóm tắt 1 câu: trong mỗi kết nối Bluetooth Classic có đúng **một bên chủ động quét và gọi (Master)** và **một bên nằm im phát tên, chờ được gọi (Slave)** — HC-05 mặc định là Slave, và điện thoại đóng vai Master.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #7 ← cần [[hc05-led-trang-thai]] · → kế tiếp [[giao-tiep-hai-chieu-bang-chuoi]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #bluetooth #kien-truc

---

## 💡 Ý chính

| | **Master** (trạm chủ) | **Slave** (trạm tớ) |
|---|---|---|
| Vai trò | chủ động **quét** không gian, tìm thiết bị, **yêu cầu** ghép nối | nằm im **phát tên**, chờ kết nối |
| Ứng dụng | tay cầm điều khiển, điện thoại, gateway | cảm biến, robot, bảng LCD — thứ "bị" điều khiển |
| Lệnh | `AT+ROLE=1` | `AT+ROLE=0` (**mặc định** HC-05) |

Trong mọi bài thực hành của môn: **điện thoại = Master, HC-05 trên Arduino = Slave**. Không phải cấu hình gì.

## ⚙️ Khi nào đổi role — nối hai Arduino với nhau

Hai HC-05 tự nối với nhau được nếu một Master, một Slave:

```
Slave:   AT+ROLE=0  ·  AT+ADDR?  → ghi lại MAC, vd 98d3:31:fc1234
Master:  AT+ROLE=1  ·  AT+CMODE=0  ·  AT+BIND=98d3,31,fc1234  ·  AT+PAIR=98d3,31,fc1234,20
```
(`AT+PAIR` tới địa chỉ MAC của Slave, dấu `:` đổi thành `,`). Sau RESET hai module tự tìm nhau mỗi lần cấp nguồn — thành **cáp serial không dây giữa hai Arduino**, không cần điện thoại. Dùng cho: robot + bộ điều khiển cầm tay, cảm biến ngoài vườn + bảng hiển thị trong nhà.

## 🧩 Trực giác

Master là **người gọi điện**, Slave là **người có số điện thoại công khai và ngồi chờ chuông**. Một cuộc gọi chỉ có một người bấm số. Slave không bao giờ "gọi" ai — nên muốn hai HC-05 nói chuyện, **phải** có một cái làm Master.

## ⚠️ Điều dễ nhầm

- Hai HC-05 đều `ROLE=0` → cả hai nháy nhanh mãi, chờ nhau cả đời.
- Master với `AT+CMODE=1` sẽ nối với **bất kỳ** Slave nào tìm thấy — trong lớp có 20 nhóm cùng tên `HC-05` thì nối nhầm. Dùng `CMODE=0` + `BIND` đúng MAC.
- Master ≠ "bên gửi dữ liệu". Role chỉ nói ai **khởi tạo kết nối**; sau đó dữ liệu đi **hai chiều** như nhau ([[giao-tiep-hai-chieu-bang-chuoi]]).

---

## 🔗 Liên kết
- **Tiền đề:** [[hc05-led-trang-thai]] · [[hc05-lenh-at]]
- **Dẫn tới:** [[giao-tiep-hai-chieu-bang-chuoi]]
- **Liên quan:** [[bluetooth-hc-05]]

## ❓ Câu hỏi mở
- Một Master nối tối đa 7 Slave (piconet) trong lý thuyết Bluetooth Classic — HC-05 có làm được không, hay chỉ 1–1?

## 📚 Nguồn
- Slide Part 1.2 — *Kiến trúc mạng: Master vs. Slave Mode*
