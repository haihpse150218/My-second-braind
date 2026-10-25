---
slug: co-cau-chap-hanh
title: Cơ cấu chấp hành (actuator)
vault: iot
type: concept
branch: A
order: 5
status: learning
tags: [iot, phan-cung, actuator]
prev: [cam-bien]
next: [co-cau-doi-huong-chuyen-dong]
related: [ham-map-va-servo, sketch-setup-loop, giao-tiep-hai-chieu-bang-chuoi]
sources: ["IAD_MSA33_Part_1.pdf", "IAD_MSA33_Part_1_2.pdf"]
created: 2026-10-24
---

# Cơ cấu chấp hành (actuator)

> Tóm tắt 1 câu: actuator làm ngược cảm biến — nhận **tín hiệu điện** từ vi điều khiển và tạo ra **tác động vật lý**: sáng, quay, đóng/mở, kêu.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #5 ← cần [[cam-bien]] · → kế tiếp [[co-cau-doi-huong-chuyen-dong]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #phan-cung #actuator

---

## 💡 Ý chính

| Actuator | Tác động | Điều khiển từ Arduino | Lưu ý điện |
|---|---|---|---|
| LED | sáng | `digitalWrite` HIGH/LOW | cần điện trở hạn dòng → [[dinh-luat-ohm]] |
| Buzzer | kêu | `digitalWrite` / `tone()` | |
| Động cơ DC | quay liên tục | PWM qua driver (L298N) | **không** cấp thẳng từ chân Arduino |
| Động cơ bước (stepper) | quay từng bước chính xác | driver + xung | |
| Servo | quay tới **góc** 0–180° | `servo.write(angle)` → [[ham-map-va-servo]] | |
| Relay | đóng/mở mạch **điện áp lớn** (220 V) | `digitalWrite` vào module relay | cách ly điện |
| Solenoid | đẩy/kéo tuyến tính (van, khoá) | qua transistor/relay | |

Nguyên tắc chung: chân Arduino chỉ ra **5 V, ~20–40 mA**. Thứ gì ăn dòng hơn LED đều phải đi qua **transistor, driver hoặc relay**.

## 🧩 Trực giác / Ví dụ

Mô hình smart home ở slide Bluetooth: Arduino không bật đèn bàn 220 V trực tiếp — nó bật **relay**, relay mới đóng mạch 220 V. Arduino là "ngón tay bấm công tắc", không phải nguồn điện.

## ⚙️ Khi nào dùng

- Cần ON/OFF → LED, relay, solenoid.
- Cần **góc** → servo. Cần **tốc độ** → DC + PWM. Cần **vị trí chính xác nhiều vòng** → stepper.

## ⚠️ Điều dễ nhầm

- Nối động cơ thẳng vào chân digital: dòng khởi động vượt mức → chết chân hoặc reset bo.
- Tải cảm (motor, relay cuộn dây) sinh xung ngược khi tắt → cần diode bảo vệ; module relay thương mại đã có sẵn.

---

## 🔗 Liên kết
- **Tiền đề:** [[cam-bien]]
- **Dẫn tới:** [[co-cau-doi-huong-chuyen-dong]] · [[dinh-luat-ohm]] · [[ham-map-va-servo]]
- **Liên quan:** [[giao-tiep-hai-chieu-bang-chuoi]] — lệnh `LED_ON` từ điện thoại kết thúc ở một actuator

## ❓ Câu hỏi mở
- Với relay cơ, số lần đóng/mở có giới hạn tuổi thọ — khi nào nên chuyển sang relay bán dẫn (SSR)?

## 📚 Nguồn
- Slide Part 1 — *Actuators / Bộ điều khiển – truyền động*
- Slide Part 1.2 — *Mở rộng: mô hình Smart Home*
