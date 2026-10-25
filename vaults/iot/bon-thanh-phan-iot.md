---
slug: bon-thanh-phan-iot
title: Bốn thành phần của một hệ IoT
vault: iot
type: concept
branch: A
order: 3
status: learning
tags: [iot, tong-quan, kien-truc]
prev: [he-thong-nhung]
next: [cam-bien]
related: [iot-la-gi, co-cau-chap-hanh, uart-serial-monitor, bluetooth-hc-05]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# Bốn thành phần của một hệ IoT

> Tóm tắt 1 câu: **cảm biến/chấp hành → kết nối → xử lý dữ liệu → giao diện người dùng** — mọi dự án IoT, từ nhiệt kế LM35 tới smart city, đều có đủ bốn khối này.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #3 ← cần [[he-thong-nhung]] · → kế tiếp [[cam-bien]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #tong-quan #kien-truc

---

## 💡 Ý chính

| Khối | Làm gì | Trong môn này học ở đâu |
|---|---|---|
| **Sensors & Actuators** | cảm biến thu dữ liệu từ môi trường; chấp hành tác động ngược lại | [[cam-bien]] · [[co-cau-chap-hanh]] |
| **Connectivity & Transmission** | Wi-Fi, Bluetooth, mạng di động, UART | [[uart-serial-monitor]] · [[bluetooth-hc-05]] · nhánh G (MQTT) |
| **Data Processing** | phân tích, ra quyết định | code Arduino (`if nhiệt độ > 25`), rồi backend/cloud |
| **User Interface** | tương tác, điều khiển, giám sát | LCD → web → app Android (nhánh F) |

Lộ trình 30 session của môn thực chất đi qua **từng khối một**, từ trái sang phải.

## 🧩 Trực giác / Ví dụ

Bài tập 1 — nhiệt kế điện tử ([[nhiet-ke-lm35]]) — đã có đủ bốn khối trên một bo mạch:
LM35 (cảm biến) → dây tín hiệu A0 (kết nối) → `if (temp > 25)` (xử lý) → LCD + LED (giao diện + chấp hành).

Mô hình smart home ở slide Bluetooth cũng vậy: DHT11 → HC-05 → Arduino → relay/điện thoại.

## ⚙️ Khi nào dùng

Dùng bảng này làm **checklist thiết kế**: với một đề bài, điền từng ô. Ô nào trống thì đề bài chưa thành hệ IoT được.

## ⚠️ Điều dễ nhầm

- Khối "xử lý dữ liệu" không nhất thiết ở cloud — với Arduino nó là vài dòng `if`. Đẩy xử lý **gần cảm biến** (edge) hay **lên cloud** là quyết định kiến trúc, học ở nhánh H.

---

## 🔗 Liên kết
- **Tiền đề:** [[he-thong-nhung]]
- **Dẫn tới:** [[cam-bien]] · [[co-cau-chap-hanh]]
- **Liên quan:** [[iot-la-gi]]

## ❓ Câu hỏi mở
- Textbook tách thêm tầng *edge/gateway* giữa thiết bị và cloud. Tầng đó thuộc khối "kết nối" hay "xử lý"?

## 📚 Nguồn
- Slide Part 1 — *Main components of IoT*
