---
slug: bluetooth-hc-05
title: Module Bluetooth HC-05
vault: iot
type: concept
branch: D
order: 1
status: learning
tags: [iot, bluetooth, giao-tiep, phan-cung]
prev: [nhiet-ke-lm35]
next: [uart-crossover-va-chia-ap]
related: [uart-serial-monitor, bon-thanh-phan-iot]
sources: ["IAD_MSA33_Part_1_2.pdf"]
created: 2026-10-24
---

# Module Bluetooth HC-05

> Tóm tắt 1 câu: HC-05 là module Bluetooth chuẩn **SPP (Serial Port Protocol)** — với Arduino nó **trông hệt một cổng UART**, chỉ khác là dây nối tiếp giờ chạy qua sóng 2,4 GHz tới điện thoại.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #1 ← cần [[nhiet-ke-lm35]] · → kế tiếp [[uart-crossover-va-chia-ap]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #bluetooth #giao-tiep #phan-cung

---

## 🔢 Thông số

| | |
|---|---|
| Chuẩn | Bluetooth v2.0 + EDR, profile SPP |
| Tần số | 2,4 GHz (băng ISM — chung với Wi-Fi, lò vi sóng) |
| Khoảng cách | ~10 m |
| Nguồn | 3,3 – 5 V (module có ổn áp 3,3 V sẵn) |
| **Mức logic** | **3,3 V** — chân RX không chịu 5 V |
| Chip | CSR BC417 + flash + thạch anh 26 MHz |
| Chân | EN/KEY · VCC · GND · TXD · RXD · STATE |

## 💡 Ý chính

Với Arduino, HC-05 **không phải thiết bị mạng** — nó là **cáp serial không dây**. Code gửi nhận y hệt [[uart-serial-monitor]]: `Serial.print` đi ra ăng-ten, `Serial.read` đọc thứ điện thoại gõ. Mọi phức tạp của Bluetooth (ghép đôi, mã hoá, kênh) module tự lo.

Hai chế độ hoạt động, chọn bằng chân KEY lúc cấp nguồn → [[hc05-data-mode-vs-at-mode]].

| Chân | Nối với | Ghi chú |
|---|---|---|
| VCC | 5 V | |
| GND | GND | **chung GND** với mọi thứ |
| TXD | RX Arduino (vd D10 với SoftwareSerial) | module ra 3,3 V, Arduino đọc được là HIGH |
| RXD | TX Arduino (vd D11) **qua cầu chia áp** | → [[uart-crossover-va-chia-ap]] |
| KEY/EN | 3,3 V khi muốn vào AT mode | để trống khi dùng bình thường |
| STATE | (tuỳ chọn) chân digital | HIGH khi đã kết nối — dùng để code biết có điện thoại |

## 🧩 Trực giác

Hãy nghĩ HC-05 là **một sợi dây dài 10 m vô hình** cắm vào cổng serial. Bên kia sợi dây là điện thoại chạy app terminal. Dây không hiểu nội dung — chỉ chuyển byte ([[giao-tiep-hai-chieu-bang-chuoi]]).

## ⚙️ Khi nào dùng

- Điều khiển / giám sát **cự ly ngắn, không cần Internet**: smart home mini, robot, bảng hiển thị.
- Cần Internet hoặc nhiều thiết bị cùng lúc → Wi-Fi (ESP8266/ESP32) + MQTT ở nhánh G.

## ⚠️ Điều dễ nhầm

- HC-05 ≠ HC-06: HC-05 làm được **cả master và slave** ([[bluetooth-master-slave]]); HC-06 chỉ slave.
- Bluetooth 2.0 Classic — **iPhone không ghép đôi được** (iOS chỉ mở BLE cho app bên thứ ba). Android dùng được.
- LED trên module là công cụ chẩn đoán số 1 → [[hc05-led-trang-thai]].

---

## 🔗 Liên kết
- **Tiền đề:** [[nhiet-ke-lm35]] · [[uart-serial-monitor]]
- **Dẫn tới:** [[uart-crossover-va-chia-ap]] · [[hc05-data-mode-vs-at-mode]]
- **Liên quan:** [[bon-thanh-phan-iot]] — khối *Connectivity*

## ❓ Câu hỏi mở
- Cùng tiền ấy, ESP32 có Bluetooth + Wi-Fi + mạnh hơn Uno — tại sao môn vẫn dạy HC-05 trước? (gợi ý: tách bạch "giao tiếp serial" khỏi "mạng")

## 📚 Nguồn
- Slide Part 1.2 — *Giới thiệu Module HC-05*, *Bluetooth HC-05*
