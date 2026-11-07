---
slug: raspberry-pi-la-gi
title: Raspberry Pi là gì — máy tính Linux có chân GPIO
vault: iot
type: concept
branch: E
order: 1
status: learning
tags: [iot, raspberry-pi, phan-cung]
prev: [go-loi-hc05]
next: [pi-gpio-pinout]
related: [arduino-la-gi, he-thong-nhung, cda-gda]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# Raspberry Pi là gì — máy tính Linux có chân GPIO

> Tóm tắt 1 câu: Raspberry Pi là **máy tính đơn bo chạy hệ điều hành** có sẵn Wi-Fi, Ethernet và 40 chân GPIO — thứ Arduino làm rất tốt là *một việc mãi mãi*, còn Pi làm được *nhiều việc cùng lúc*: đọc cảm biến, chạy web server, lưu database.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #1 ← cần [[go-loi-hc05]] · → kế tiếp [[pi-gpio-pinout]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #phan-cung

---

## 💡 Ý chính

Môn dùng **Raspberry Pi 3 Model B+**. Khác biệt lớn nhất với [[arduino-la-gi]] không nằm ở tốc độ, mà ở chỗ Pi **có hệ điều hành**: chương trình của mình chỉ là một tiến trình giữa nhiều tiến trình khác.

| | Arduino Uno | Raspberry Pi 3B+ |
|---|---|---|
| Bản chất | vi điều khiển, [[he-thong-nhung]] | máy tính đơn bo |
| Chạy gì | một sketch mãi mãi | Linux + nhiều chương trình |
| Ngôn ngữ trong môn | C/C++ | Python |
| Logic GPIO | 5 V | **3,3 V** |
| Đọc analog | có ADC | **không có ADC** *(ngoài slide)* |
| Mạng | phải gắn thêm module | Wi-Fi, Ethernet, Bluetooth sẵn |

## 🧩 Trực giác / Ví dụ

Arduino là **công tắc thông minh**: bật lên là chạy ngay, chỉ làm đúng một việc. Pi là **laptop tí hon có chân cắm**: phải khởi động, có desktop, cài được phần mềm, nhưng vì vậy mới làm được [[flask-tren-pi]] hay [[co-so-du-lieu-iot]].

## 🔢 Công thức / Định nghĩa

| Thành phần | Thông số Pi 3B+ |
|---|---|
| CPU | Broadcom BCM2837B, 4 nhân 64-bit, 1,4 GHz |
| GPU · RAM | VideoCore IV · 1 GB |
| Không dây | Wi-Fi 802.11 b/g/n/ac (2,4 + 5 GHz), Bluetooth 4.2 & BLE |
| Mạng dây | Ethernet tối đa 300 Mbps, có header PoE |
| Cổng | 4× USB 2.0 · HDMI · jack 3,5 mm (audio + composite) · CSI camera · DSI display |
| Lưu trữ | microSD ở mặt dưới, chứa luôn hệ điều hành |
| Nguồn | USB micro-B **chỉ để cấp nguồn** |
| Đèn | đỏ = nguồn 5 V · xanh = activity |
| GPIO | 40 chân hàn sẵn → [[pi-gpio-pinout]] |

## ⚙️ Khi nào dùng / Ứng dụng

- Cần **mạng, lưu trữ, giao diện**: dùng Pi làm gateway, xem [[pi-lam-cda-gda]].
- Cần đọc analog hoặc phản ứng thời gian thực: để Arduino đo rồi gửi qua [[uart-pi-arduino]].
- Hệ điều hành cài bằng Raspberry Pi Imager; xem [[pi-truy-cap-tu-xa]].

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- Mang thói quen 5 V từ Arduino sang: tín hiệu 5 V cắm thẳng vào GPIO có thể hỏng Pi.
- Rút điện đột ngột khi Linux đang ghi thẻ nhớ có thể hỏng thẻ *(ngoài slide)*; nên `sudo shutdown now` trước.

## 🔗 Liên kết

- **Tiền đề:** [[arduino-la-gi]] · [[he-thong-nhung]]
- **Dẫn tới:** [[pi-gpio-pinout]] · [[pi-truy-cap-tu-xa]]
- **Liên quan:** [[cda-gda]] · [[pi-lam-cda-gda]]

## ❓ Câu hỏi mở

- Với NullPet, Pi có thay được laptop làm gateway không, hay 1 GB RAM là quá ít cho MCP server?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 1–2
