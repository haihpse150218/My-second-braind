---
slug: cda-gda
title: CDA và GDA — hai ứng dụng của Edge Tier
vault: iot
type: concept
branch: H
order: 3
status: learning
tags: [iot, kien-truc, textbook, edge]
prev: [edge-tier-cloud-tier]
next: [du-an-esp32-mcp]
related: [he-thong-nhung, giao-tiep-hai-chieu-bang-chuoi, arduino-la-gi]
sources: ["Programming the Internet of Things — Andy King, ch. 1 (tr. 9–13)"]
created: 2026-10-24
---

# CDA và GDA — hai ứng dụng của Edge Tier

> Tóm tắt 1 câu: textbook xây **đúng hai chương trình** xuyên suốt 12 chương — **CDA** (Constrained Device App) chạy trên thiết bị nhỏ, lo *cảm biến và chấp hành*; **GDA** (Gateway Device App) chạy trên gateway, lo *dữ liệu, cấu hình, và nói chuyện với cloud* — thiết bị nhỏ **không bao giờ** ra Internet trực tiếp.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh H · #3 ← cần [[edge-tier-cloud-tier]] · → kế tiếp [[du-an-esp32-mcp]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #kien-truc #textbook #edge

---

## 💡 Ý chính

| | **CDA** — Constrained Device App | **GDA** — Gateway Device App | Cloud services |
|---|---|---|---|
| Chạy trên | thiết bị ràng buộc (thật hoặc giả lập) | thiết bị gateway (Pi, laptop…) | cloud |
| Nhóm hành động | **data collection · system triggers** | **data management · analytics · configuration management** | tất cả **trừ data collection** |
| Việc cụ thể | đọc cảm biến, điều khiển actuator, gửi/nhận tin với GDA | nhận telemetry, lưu cục bộ, phân tích sơ bộ, giữ dải "bình thường", **ra lệnh ngược** cho CDA kích hoạt actuator, nối lên cloud | lưu trữ và phân tích nặng, scale, báo người dùng, có thể sinh trigger xuống Edge |
| Ngôn ngữ trong sách | Python | Java | — |

Luồng: `cảm biến → CDA → GDA → cloud` và ngược lại `cloud → GDA → CDA → actuator`. Mọi chương sau chỉ **thêm tính năng** vào hai app này (MQTT ở ch. 6–7, CoAP ch. 8–9, TLS ch. 10, cloud ch. 11).

### "Ràng buộc" là ràng buộc cỡ nào — RFC 7228

| Class | Mức | Chạy được CDA của sách? |
|---|---|---|
| 0 | rất ràng buộc (vài KB RAM, không IP) | ❌ |
| 1 | ràng buộc (~10 KB RAM, CoAP được, HTTP khó) | ❌ |
| **2** | hơi ràng buộc (~50 KB RAM, **full IP stack**) | ✅ — mốc tối thiểu của sách |

Arduino Uno (2 KB SRAM, [[arduino-la-gi]]) là **Class 0** → không chạy CDA kiểu sách được; nó chỉ là "cảm biến có dây" cho một CDA ở trên. ESP32 (520 KB RAM, Wi-Fi) ≥ Class 2.

### Ba cách triển khai

| Cách | CDA ở đâu | GDA ở đâu | Dùng khi |
|---|---|---|---|
| **Integrated simulated** | laptop | laptop | mọi bài tập trong sách — cảm biến **giả lập** bằng code |
| **Separated physical** | thiết bị thật (Pi, ESP32) | laptop | có phần cứng; ⟵ [[du-an-esp32-mcp]] |
| **Blended physical** | SBC | cùng SBC đó | một Pi làm cả hai |

## 🧩 Trực giác

CDA là **tay chân**, GDA là **người quản lý ca**. Tay chân chỉ biết "đo và bật"; quản lý ca ghi sổ, biết dải bình thường, ra lệnh, và là người duy nhất gọi điện lên "trụ sở" (cloud). Trụ sở không bao giờ nói chuyện thẳng với tay chân.

So với Part 1: [[giao-tiep-hai-chieu-bang-chuoi]] (Arduino ↔ điện thoại qua HC-05) chính là **CDA ↔ GDA** phiên bản thô — `TEMP:27.5` là telemetry đi lên, `LED_ON` là trigger đi xuống.

## ⚙️ Khi nào dùng

- Khi thiết kế project: vẽ hai hộp CDA/GDA trước, điền từng nhóm hành động vào đúng hộp, rồi mới chọn giao thức giữa chúng (UART, Bluetooth, MQTT).
- Khi thiết bị không ra được Internet (Class 0/1, hoặc không muốn lộ) → **bắt buộc** có GDA.

## ⚠️ Điều dễ nhầm

- Cho thiết bị ràng buộc nối thẳng cloud "vì ESP32 có Wi-Fi". Kỹ thuật được, nhưng sách cố ý **không làm thế**: gateway là lớp bảo mật và nơi gom luồng.
- Gán *analytics* cho CDA: thiết bị nhỏ chỉ nên có **trigger đơn giản**; phân tích để GDA/cloud.
- Nhầm "gateway" với router Wi-Fi. GDA là **phần mềm** chạy trên một máy có thể là laptop.

---

## 🔗 Liên kết
- **Tiền đề:** [[edge-tier-cloud-tier]] · [[he-thong-nhung]]
- **Dẫn tới:** [[du-an-esp32-mcp]] — ánh xạ CDA/GDA vào phần cứng của mình
- **Liên quan:** [[giao-tiep-hai-chieu-bang-chuoi]] · [[arduino-la-gi]]

## ❓ Câu hỏi mở
- Sách viết CDA bằng Python, GDA bằng Java. Với ESP32 thì CDA là C/MicroPython — giữ "tinh thần" CDA (chỉ data collection + triggers) có đủ, hay phải bám cấu trúc module của sách?

## 📚 Nguồn
- Andy King, *Programming the Internet of Things*, ch. 1 tr. 9–13, hình 1-3, 1-4; RFC 7228 (Bormann et al., 2014)
