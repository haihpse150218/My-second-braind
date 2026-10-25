---
slug: cam-bien
title: Cảm biến
vault: iot
type: concept
branch: A
order: 4
status: learning
tags: [iot, phan-cung, cam-bien]
prev: [bon-thanh-phan-iot]
next: [co-cau-chap-hanh]
related: [adc-analogread, nhiet-ke-lm35, chan-digital-vs-analog]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# Cảm biến

> Tóm tắt 1 câu: cảm biến biến một **đại lượng vật lý** (nhiệt, sáng, chuyển động, áp suất) thành **tín hiệu điện** mà vi điều khiển đọc được — analog (điện áp liên tục) hoặc digital (xung/giao thức).

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #4 ← cần [[bon-thanh-phan-iot]] · → kế tiếp [[co-cau-chap-hanh]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #phan-cung #cam-bien

---

## 💡 Ý chính

Danh sách trong slide, kèm **cách nối vào Arduino** — đây là thứ quyết định code:

| Loại | Ví dụ | Đầu ra | Đọc bằng |
|---|---|---|---|
| Nhiệt độ | LM35, DHT11 | LM35: analog 10 mV/°C · DHT11: digital 1 dây | `analogRead` / thư viện DHT |
| Ánh sáng | photodiode, quang trở (LDR) | analog (điện trở đổi theo sáng) | `analogRead` qua cầu chia áp |
| Chuyển động | PIR, siêu âm (HC-SR04) | PIR: digital HIGH/LOW · siêu âm: đo độ rộng xung | `digitalRead` / `pulseIn` |
| Tiệm cận | IR, cảm biến điện dung | digital | `digitalRead` |
| Độ ẩm | DHT22, SHT3x | digital 1 dây / I2C | thư viện |
| Áp suất | BMP180, MPL3115A2 | I2C | thư viện + [[giao-tiep-i2c]] |

Quy tắc: **analog → [[adc-analogread]]**, **digital → `digitalRead` hoặc giao thức (I2C/1-wire)**. Xem [[chan-digital-vs-analog]].

## 🧩 Trực giác / Ví dụ

Điện thoại là một bộ cảm biến di động: app *Sensors Toolbox* (iOS) / *Sensor Box* (Android) cho thấy light sensor, accelerometer, magnetometer, gyroscope. Bài thảo luận trên lớp: chọn 1–2 cảm biến, nêu hướng ứng dụng — ví dụ gia tốc kế → phát hiện ngã ở người già; từ kế → la bàn; con quay → ổn định gimbal.

## ⚙️ Khi nào dùng

- Chọn cảm biến theo **đại lượng cần đo** trước, rồi mới xem giao tiếp. Cảm biến I2C/digital đã có số sẵn, ít nhiễu; cảm biến analog rẻ nhưng phải tự quy đổi và lọc.

## ⚠️ Điều dễ nhầm

- **Datasheet quyết định công thức quy đổi.** LM35 cho 10 mV/°C, nhưng quang trở không có công thức tuyến tính — chỉ dùng để so sánh ngưỡng.
- Cảm biến 3.3 V cắm thẳng 5 V sẽ hỏng; bài học giống [[uart-crossover-va-chia-ap]].

---

## 🔗 Liên kết
- **Tiền đề:** [[bon-thanh-phan-iot]]
- **Dẫn tới:** [[co-cau-chap-hanh]] · [[adc-analogread]] · [[nhiet-ke-lm35]]
- **Liên môn:** [[ivp/cam-bien-anh]] — camera cũng là cảm biến: CCD/CMOS đổi photon thành số, cùng nguyên lý lượng tử hoá

## ❓ Câu hỏi mở
- Với cảm biến analog nhiễu, nên lọc bằng phần cứng (tụ) hay phần mềm (trung bình trượt)? Bao nhiêu mẫu là đủ?

## 📚 Nguồn
- Slide Part 1 — *Sensors / Cảm biến*, *Interfacing Sensors*
