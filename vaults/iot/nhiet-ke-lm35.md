---
slug: nhiet-ke-lm35
title: Bài tập 1 — Nhiệt kế điện tử với LM35
vault: iot
type: concept
branch: C
order: 10
status: learning
tags: [iot, arduino, bai-tap, cam-bien]
prev: [lcd-1602-i2c]
next: [bluetooth-hc-05]
related: [adc-analogread, bon-thanh-phan-iot, co-cau-chap-hanh]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# Bài tập 1 — Nhiệt kế điện tử với LM35

> Tóm tắt 1 câu: đọc LM35 qua ADC, đổi **10 mV/°C** thành nhiệt độ, hiện lên LCD 1602 và bật LED/còi khi **> 25 °C** — bài đầu tiên gom trọn cả bốn khối IoT trên một bo.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #10 ← cần [[lcd-1602-i2c]] · → kế tiếp [[bluetooth-hc-05]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #arduino #bai-tap #cam-bien

---

## 🎯 Đề bài (Practice 3 / Assignment 1)

- Hiển thị nhiệt độ từ cảm biến **LM35** trên màn hình **LCD 1602**.
- Điều khiển **LED** dựa trên nhiệt độ đo được: đèn / còi báo khi nhiệt độ **> 25 °C**.
- Thông số: `Vout = 10 mV/°C` (0 °C → 0 V, 25 °C → 0,25 V, 100 °C → 1 V).

## 🔢 Chuỗi quy đổi

$$
T(^\circ C) = \frac{\text{analogRead} \times 5{,}0}{1023} \times 100
$$

| Bước | Công thức | Ví dụ 25 °C |
|---|---|---|
| ADC → điện áp | `V = raw × 5 / 1023` | raw ≈ 51 → 0,249 V |
| điện áp → nhiệt độ | `T = V / 0,010` = `V × 100` | 24,9 °C |

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 16, 2);
const int lm35Pin = A0, ledPin = 8, buzzerPin = 9;
const float THRESHOLD = 25.0;

void setup() {
  pinMode(ledPin, OUTPUT); pinMode(buzzerPin, OUTPUT);
  lcd.init(); lcd.backlight();
  Serial.begin(9600);
}
void loop() {
  long sum = 0;
  for (int i = 0; i < 10; i++) { sum += analogRead(lm35Pin); delay(10); }
  float voltage = (sum / 10.0) * 5.0 / 1023.0;
  float tempC   = voltage * 100.0;

  lcd.setCursor(0, 0); lcd.print("Temp: "); lcd.print(tempC, 1); lcd.print(" C  ");
  lcd.setCursor(0, 1); lcd.print(tempC > THRESHOLD ? "HOT! LED ON    " : "Normal         ");

  bool hot = tempC > THRESHOLD;
  digitalWrite(ledPin, hot); digitalWrite(buzzerPin, hot);
  Serial.println(tempC);                  // để vẽ Serial Plotter
  delay(500);
}
```

## 💡 Ý chính — bốn khối trên một bo

| Khối ([[bon-thanh-phan-iot]]) | Ở đây |
|---|---|
| Cảm biến | LM35 → A0 |
| Kết nối | dây tín hiệu + I2C tới LCD + UART tới PC |
| Xử lý | quy đổi + `if (tempC > 25)` |
| Giao diện / chấp hành | LCD + LED + còi |

## ⚠️ Điều dễ nhầm

- LM35 có 3 chân **+Vs, Vout, GND** nhìn từ mặt phẳng chữ: cắm ngược thì nóng lên rất nhanh và đọc ~ 100 °C.
- Ở 25 °C chỉ ~51 bậc ADC → mỗi bậc ≈ 0,5 °C, số nhảy. Trung bình 10 mẫu (như code) hoặc đổi `analogReference(INTERNAL)` (1,1 V → 0,1 °C/bậc) và sửa công thức `V = raw × 1,1 / 1023`.
- So sánh `float` với ngưỡng cứng làm LED **nhấp nháy** quanh 25,0 °C → thêm **hysteresis**: bật ở 25,5, tắt ở 24,5. Textbook (ch. 3) gọi đúng tên bài toán này.
- Nếu LM35 nằm cạnh Arduino, nhiệt bo mạch làm số cao hơn phòng 1–2 °C.

---

## 🔗 Liên kết
- **Tiền đề:** [[lcd-1602-i2c]] · [[adc-analogread]]
- **Dẫn tới:** [[bluetooth-hc-05]] — bước tiếp theo: gửi nhiệt độ này qua không dây
- **Liên quan:** [[co-cau-chap-hanh]] · [[cam-bien]]

## ❓ Câu hỏi mở
- Nếu thay LM35 bằng DHT11 (digital, có cả độ ẩm) thì mất gì? (độ phân giải 1 °C, chậm 1 Hz) — đổi có đáng không?

## 📚 Nguồn
- Slide Part 1 — *Practice 3 / Assgm 1: Nhiệt kế điện tử*
