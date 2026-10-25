---
slug: chan-digital-vs-analog
title: Chân digital và chân analog
vault: iot
type: concept
branch: C
order: 4
status: learning
tags: [iot, arduino, phan-cung]
prev: [sketch-setup-loop]
next: [adc-analogread]
related: [cam-bien, co-cau-chap-hanh]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# Chân digital và chân analog

> Tóm tắt 1 câu: chân digital chỉ biết **hai mức** HIGH/LOW; chân analog đọc được **1024 mức** điện áp — chọn chân theo việc thiết bị nói chuyện bằng "bật/tắt" hay bằng "bao nhiêu".

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #4 ← cần [[sketch-setup-loop]] · → kế tiếp [[adc-analogread]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #arduino #phan-cung

---

## 💡 Ý chính

| | Digital (D2–D13) | Analog (A0–A5) |
|---|---|---|
| Tín hiệu | HIGH (1, 5 V) hoặc LOW (0, 0 V) | 0…1023 — độ phân giải **10-bit** |
| Hướng | vào **và** ra | vào (đọc); muốn "ra analog" dùng PWM trên chân `~` |
| Đọc | `digitalRead(pin)` | `analogRead(A#)` → [[adc-analogread]] |
| Ghi | `digitalWrite(pin, HIGH/LOW)` | `analogWrite(pin~, 0..255)` (PWM, không phải điện áp thật) |
| Thiết bị | LED, nút bấm, relay, PIR, buzzer | quang trở, LM35, biến trở, cảm biến khí |

Ghép cảm biến theo đúng loại — xem bảng ở [[cam-bien]]:
- cảm biến analog → A0–A5, `analogRead`
- cảm biến digital → D2, D3…, `digitalRead`

## 🧩 Trực giác

Digital là **công tắc**; analog là **núm vặn**. Một nút bấm không có "bấm 37%", nhưng ánh sáng trong phòng thì có vô số mức — nên quang trở cần chân analog.

## ⚙️ Khi nào dùng

- Chân analog A0–A5 **cũng dùng được như digital** (`pinMode(A0, OUTPUT)`) khi thiếu chân.
- A4/A5 là **SDA/SCL** của I2C — cắm LCD I2C vào đó thì mất hai chân analog ([[giao-tiep-i2c]]).
- Chân có dấu `~` (3, 5, 6, 9, 10, 11) phát PWM — mờ LED, tốc độ motor.

## ⚠️ Điều dễ nhầm

- `analogWrite` **không** ra điện áp 0–5 V liên tục; nó bật/tắt rất nhanh (PWM). Đèn LED thấy "mờ" vì mắt lấy trung bình; motor chạy chậm hơn; nhưng đo bằng đồng hồ thấy xung.
- Chân digital để INPUT mà **không nối gì** sẽ đọc giá trị ngẫu nhiên (floating). Dùng `INPUT_PULLUP` hoặc điện trở kéo xuống cho nút bấm.
- 10-bit → mỗi bậc ≈ 4,9 mV. Tín hiệu đổi nhỏ hơn thế thì ADC **không thấy**.

---

## 🔗 Liên kết
- **Tiền đề:** [[sketch-setup-loop]]
- **Dẫn tới:** [[adc-analogread]]
- **Liên quan:** [[cam-bien]] · [[co-cau-chap-hanh]]
- **Liên môn:** [[ivp/luong-tu-hoa-anh]] — ảnh 8-bit có 256 mức xám, ADC 10-bit có 1024 mức: cùng là lượng tử hoá giá trị

## ❓ Câu hỏi mở
- Nếu cần đọc 8 cảm biến analog mà Uno chỉ có 6 chân — dùng multiplexer hay đổi sang Mega?

## 📚 Nguồn
- Slide Part 1 — *Digital vs. Analog pins (1), (2)*, *Interfacing Sensors*
