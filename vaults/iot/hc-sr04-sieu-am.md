---
slug: hc-sr04-sieu-am
title: Cảm biến siêu âm HC-SR04 — đo khoảng cách bằng tiếng vọng
vault: iot
type: concept
branch: E
order: 6
status: learning
tags: [iot, raspberry-pi, cam-bien, bai-tap]
prev: [pi-nut-nhan-va-pwm]
next: [led-7-doan-5161as]
related: [cam-bien, uart-crossover-va-chia-ap, pi-gpio-pinout]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# Cảm biến siêu âm HC-SR04 — đo khoảng cách bằng tiếng vọng

> Tóm tắt 1 câu: phát một xung siêu âm, đo thời gian tiếng vọng quay về rồi **chia đôi**; HC-SR04 chạy 5 V nên chân **Echo phải qua cầu chia áp** trước khi vào Pi.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #6 ← cần [[pi-nut-nhan-va-pwm]] · → kế tiếp [[led-7-doan-5161as]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #cam-bien #bai-tap

---

## 💡 Ý chính

| Chân HC-SR04 | Nối vào Pi |
|---|---|
| VCC | 5 V |
| GND | GND |
| Trig | GPIO 23 |
| Echo | **cầu chia áp** → GPIO 24 |

Trig là Pi xuất 3,3 V ra nên nối thẳng được. Echo là cảm biến xuất **5 V** vào Pi, đó là chiều nguy hiểm.

## 🧩 Trực giác / Ví dụ

Hét vào vách núi rồi đếm giây tới khi nghe tiếng vọng. Âm thanh đi **cả đi lẫn về**, nên khoảng cách chỉ bằng một nửa quãng đường.

## 🔢 Công thức / Định nghĩa

$$
\text{Distance (cm)} = \frac{\text{Time (s)} \times \text{Speed of Sound (cm/s)}}{2}
$$

Với tốc độ âm thanh khoảng 34 300 cm/s, vật cách 50 cm cho Echo cao khoảng **2,9 ms**.

| Thông số | Giá trị |
|---|---|
| Điện áp · dòng | 5 V · 15 mA |
| Tần số | 40 kHz |
| Tầm đo · phân giải | 2–400 cm · 3 mm |
| Góc đo | 15° |
| Trigger | xung cao 10 µs |

**Cầu chia áp 5 V → 3 V** (slide để trống phần "Kết quả"):

$$
\frac{V_{out}}{R_2} = \frac{V_{in}}{R_1 + R_2}
\qquad
R_2 = \frac{V_{out}}{V_{in} - V_{out}} R_1
$$

| Ký hiệu | Ý nghĩa |
|---|---|
| $V_{in}$ | tín hiệu 5 V từ cảm biến hoặc Arduino |
| $V_{out}$ | tín hiệu vào Pi, lấy ở điểm giữa $R_1$ và $R_2$ |

🔎 Tự tính: $R_2 = 1{,}5 R_1$. Bộ **1 kΩ + 1,5 kΩ cho đúng 3,0 V**. Bộ 1 kΩ + 2 kΩ ở [[uart-crossover-va-chia-ap]] cho 3,33 V, sát trần 3,3 V hơn.

## ⚙️ Khi nào dùng / Ứng dụng

**Practice 4.4:** đo khoảng cách, cảnh báo bằng LED và còi ở GPIO 17. Ngưỡng cảnh báo 100% tùy chọn (slide gợi ý 0,5 m). Cảnh báo tăng theo độ gần: đèn sáng dần, âm thanh to dần hoặc nhanh dần.

Practice 5.2 đưa kết quả đo lên [[led-4-so-3641as]].

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- Cắm thẳng Echo vào GPIO: đưa 5 V vào chân chỉ chịu 3,3 V.
- Quên chia đôi: kết quả gấp đôi thực tế.
- Trên Linux, thời gian đo bị lệch khi hệ thống bận, nên số đo dao động; có thể lấy trung bình vài lần *(ngoài slide)*.
- `gpiozero` có sẵn lớp `DistanceSensor(echo=24, trigger=23)` *(ngoài slide, chưa chạy thử)*.

## 🔗 Liên kết

- **Tiền đề:** [[cam-bien]] · [[uart-crossover-va-chia-ap]]
- **Dẫn tới:** [[led-4-so-3641as]] · [[giao-dien-iot]]

## ❓ Câu hỏi mở

- Slide ghi "LED và buzzer **nối tiếp** tại GPIO 17". Ở [[nhiet-ke-lm35]] mình mắc song song. Nối tiếp thì LED và còi có đủ áp ở 3,3 V không?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 23–25, 33
