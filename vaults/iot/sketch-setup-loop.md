---
slug: sketch-setup-loop
title: Cấu trúc sketch — setup() và loop()
vault: iot
type: concept
branch: C
order: 3
status: learning
tags: [iot, arduino, lap-trinh]
prev: [arduino-toolchain]
next: [chan-digital-vs-analog]
related: [co-cau-chap-hanh, so-do-nguyen-ly]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# Cấu trúc sketch — setup() và loop()

> Tóm tắt 1 câu: mọi chương trình Arduino chỉ có hai hàm bắt buộc — `setup()` chạy **một lần** khi cấp điện, `loop()` chạy **mãi mãi** — và "Blink LED" là *Hello World* của phần cứng.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #3 ← cần [[arduino-toolchain]] · → kế tiếp [[chan-digital-vs-analog]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #arduino #lap-trinh

---

## 💡 Ý chính

```cpp
void setup() {                 // 1 lần: khai báo vai trò chân, mở Serial
  pinMode(13, OUTPUT);         // chân 13 xuất tín hiệu ra
}
void loop() {                  // lặp vô hạn
  digitalWrite(13, HIGH);      // 5 V → LED sáng
  delay(1000);                 // chờ 1000 ms
  digitalWrite(13, LOW);       // 0 V → tắt
  delay(1000);
}
```

| Lệnh | Vai trò |
|---|---|
| `pinMode(pin, OUTPUT / INPUT)` | quy ước chân là ra hay vào — **phải làm trong `setup()`** |
| `digitalWrite(pin, HIGH / LOW)` | đặt chân ra 5 V hoặc 0 V |
| `delay(ms)` | dừng toàn bộ chương trình `ms` mili giây |

Không có `main()` — toolchain tự sinh `main()` gọi `setup()` rồi `while(1) loop()` ([[arduino-toolchain]]).

## 🧩 Ví dụ mở rộng từ slide — mảng chân

```cpp
int ledPins[] = {2, 3, 4, 5, 6, 7, 8, 9};
void setup() {
  for (int i = 0; i < 8; i++) pinMode(ledPins[i], OUTPUT);
}
void loop() {
  for (int i = 0; i < 8; i++) {
    digitalWrite(ledPins[i], HIGH); delay(100);
    digitalWrite(ledPins[i], LOW);
  }
}
```
Hiệu ứng "đèn chạy" — cùng một ý với blink, chỉ thêm vòng lặp. Practice 1b: *LED Blink with pushButton* — thêm `pinMode(12, INPUT)` và `if (digitalRead(12) == HIGH)`.

## ⚙️ Khi nào dùng

- `setup()`: `pinMode`, `Serial.begin`, `lcd.init`, `servo.attach` — mọi thứ **khởi tạo**.
- `loop()`: đọc cảm biến → quyết định → tác động. Đây là vòng kín của [[bon-thanh-phan-iot]] thu nhỏ.

## ⚠️ Điều dễ nhầm

- `delay()` **chặn tất cả**: trong lúc `delay(1000)` Arduino không đọc nút bấm, không nhận Serial. Với nhiều việc song song dùng `millis()` để đếm thời gian không chặn.
- Quên `pinMode(..., OUTPUT)`: chân mặc định là INPUT, `digitalWrite(HIGH)` chỉ bật điện trở kéo lên yếu → LED sáng mờ, tưởng LED hỏng.
- Biến khai báo trong `loop()` **mất giá trị mỗi vòng**; cần nhớ qua các vòng thì khai báo toàn cục hoặc `static`.

---

## 🔗 Liên kết
- **Tiền đề:** [[arduino-toolchain]]
- **Dẫn tới:** [[chan-digital-vs-analog]]
- **Liên quan:** [[co-cau-chap-hanh]] · [[so-do-nguyen-ly]]

## ❓ Câu hỏi mở
- Viết lại blink bằng `millis()` để vừa nháy LED vừa đọc Serial — khác gì về cấu trúc code?

## 📚 Nguồn
- Slide Part 1 — *Arduino sketch*, *Example 1: Blink LED*, *Các lệnh điều khiển cơ bản / Digital Pins*, *Simulation 1a*, *Practice 1b*
