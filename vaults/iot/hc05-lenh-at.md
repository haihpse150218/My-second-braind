---
slug: hc05-lenh-at
title: Tập lệnh AT của HC-05
vault: iot
type: concept
branch: D
order: 5
status: learning
tags: [iot, bluetooth, cau-hinh]
prev: [hc05-sketch-cau-noi-at]
next: [hc05-led-trang-thai]
related: [bluetooth-master-slave, go-loi-hc05]
sources: ["IAD_MSA33_Part_1_2.pdf"]
created: 2026-10-24
---

# Tập lệnh AT của HC-05

> Tóm tắt 1 câu: bảy lệnh AT đủ cho cả môn — kiểm tra, đặt tên, đặt PIN, đặt baud, chọn vai trò, về mặc định, khởi động lại — mỗi lệnh **phải kết thúc bằng CR+LF**.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #5 ← cần [[hc05-sketch-cau-noi-at]] · → kế tiếp [[hc05-led-trang-thai]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #bluetooth #cau-hinh

---

## 🔢 Cheat sheet

| Lệnh | Ý nghĩa | Mặc định |
|---|---|---|
| `AT` | kiểm tra giao tiếp → `OK` | |
| `AT+NAME=TenNhom_Arduino` | tên phát sóng Bluetooth | `HC-05` |
| `AT+PSWD=1234` | mã PIN ghép đôi (một số firmware cần `AT+PSWD="1234"`) | `1234` |
| `AT+UART=9600,0,0` | baud, **stop bit** (0 = 1 bit), **parity** (0 = none) cho Data Mode | 9600,0,0 (có lô 38400) |
| `AT+ROLE=0` / `=1` | 0 = **Slave** (chờ) · 1 = **Master** (chủ động quét) → [[bluetooth-master-slave]] | 0 |
| `AT+ORGL` | khôi phục toàn bộ về mặc định nhà sản xuất | |
| `AT+RESET` | khởi động lại, thoát AT mode, về Data Mode | |

Lệnh đọc giá trị hiện tại: thêm `?` — `AT+NAME?`, `AT+UART?`, `AT+ROLE?`, `AT+ADDR?` (địa chỉ MAC, cần khi ghép master–slave), `AT+VERSION?`.

## ⚙️ Kịch bản cấu hình chuẩn cho bài tập (slide RESET)

```
1. Upload hc05_at_config.ino      ← code: hc05-sketch-cau-noi-at
2. Giữ KEY, cấp nguồn → LED chậm          ← hc05-data-mode-vs-at-mode
3. Serial Monitor: 38400, Both NL & CR
4. AT                → OK ✓
5. AT+NAME=TenNhom_Arduino
6. AT+PSWD=1234
7. AT+UART=9600,0,0
8. AT+ROLE=0
9. AT+RESET          → quay về Data Mode
```
Mỗi lệnh trả `OK`. Không thấy `OK` → dừng, tra [[go-loi-hc05]] trước khi gõ tiếp.

## 💡 Ý chính

"AT" là di sản của modem Hayes thập niên 1980 (*ATtention*). Mọi module truyền thông rẻ tiền — HC-05, ESP8266 (AT firmware), SIM800 (GSM), GPS — đều dùng cùng kiểu: **chuỗi văn bản qua UART, trả `OK`/`ERROR`**. Học một lần, dùng cho cả nhánh G khi gặp module Wi-Fi/4G.

## ⚠️ Điều dễ nhầm

- Thiếu CR+LF: module im lặng. Trong code Arduino gửi lệnh AT phải dùng `bt.print("AT\r\n")`, không phải `println` nếu đã chỉnh line ending.
- Đặt tên có khoảng trắng hoặc dấu tiếng Việt: nhiều firmware từ chối hoặc hiện rác trên điện thoại. Dùng `A-Za-z0-9_`.
- `AT+UART` đổi baud Data Mode **ngay sau RESET** — nhớ sửa `bt.begin(...)` trong sketch cho khớp.
- `AT+ORGL` xoá cả tên và PIN đã đặt — dùng khi "không biết module đang ở trạng thái gì".

---

## 🔗 Liên kết
- **Tiền đề:** [[hc05-data-mode-vs-at-mode]]
- **Dẫn tới:** [[hc05-led-trang-thai]] · [[bluetooth-master-slave]]
- **Liên quan:** [[go-loi-hc05]]

## ❓ Câu hỏi mở
- `AT+UART=115200,0,0` có giúp gửi dữ liệu cảm biến nhanh hơn thực sự không, khi Bluetooth 2.0 SPP giới hạn ~ vài chục kB/s và SoftwareSerial không ổn định trên 57600?

## 📚 Nguồn
- Slide Part 1.2 — *Từ điển tập lệnh AT cốt lõi (Command Cheat Sheet)*, *Một số lệnh AT*, *RESET*
