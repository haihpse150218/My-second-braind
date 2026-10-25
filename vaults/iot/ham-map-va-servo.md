---
slug: ham-map-va-servo
title: Hàm map() và điều khiển servo
vault: iot
type: concept
branch: C
order: 7
status: learning
tags: [iot, arduino, actuator]
prev: [uart-serial-monitor]
next: [giao-tiep-i2c]
related: [adc-analogread, co-cau-chap-hanh]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# Hàm map() và điều khiển servo

> Tóm tắt 1 câu: `map()` đổi một số từ thang này sang thang kia theo tỉ lệ tuyến tính — cách ngắn nhất để biến **0…1023 của ADC** thành **0…180° của servo**.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #7 ← cần [[uart-serial-monitor]] · → kế tiếp [[giao-tiep-i2c]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #arduino #actuator

---

## 🔢 Công thức

`map(x, in_min, in_max, out_min, out_max)` tính:

$$
y = (x - in_{min}) \cdot \frac{out_{max} - out_{min}}{in_{max} - in_{min}} + out_{min}
$$

với **số nguyên** (phép chia nguyên, không làm tròn). Ví dụ `map(512, 0, 1023, 0, 180) = 90`.

```cpp
#include <Servo.h>
Servo servo;
void setup() { servo.attach(9); }          // chân PWM ~
void loop() {
  int reading = analogRead(A0);            // 0..1023 (biến trở)
  int angle   = map(reading, 0, 1023, 0, 180);
  servo.write(angle);                      // quay tới góc
}
```
Đây là Practice 2c *Analog Control Servo*: vặn biến trở → servo quay theo.

## 💡 Ý chính

Servo là actuator **theo vị trí**: lệnh `write(90)` nghĩa là "đứng ở 90°", không phải "quay 90° nữa". Bên trong servo đã có mạch phản hồi; Arduino chỉ gửi xung PWM mã hoá góc (1–2 ms mỗi 20 ms), thư viện `Servo` lo việc đó.

`map()` là mắt xích **"xử lý dữ liệu"** nhỏ nhất có thể trong [[bon-thanh-phan-iot]]: cảm biến → đổi thang → chấp hành.

## ⚙️ Khi nào dùng

- Đổi thang bất kỳ: ADC → %, ADC → góc, nhiệt độ → độ sáng LED (`analogWrite` 0…255).
- Cần số thực → tự nhân chia với `float` thay vì `map()`.

## ⚠️ Điều dễ nhầm

- `map()` **không kẹp** giá trị: `map(1100, 0, 1023, 0, 180)` ra 193 → servo cố quay quá giới hạn, kêu rít và nóng. Dùng `constrain(x, 0, 180)` sau `map`.
- Servo nhỏ (SG90) ăn tới 500 mA lúc khởi động — nuôi từ chân 5 V của Uno qua USB thường **reset bo**. Dùng nguồn riêng, **GND chung**.
- `servo.attach()` chiếm timer → `analogWrite` trên chân 9 và 10 **ngừng hoạt động**.

---

## 🔗 Liên kết
- **Tiền đề:** [[uart-serial-monitor]] · [[adc-analogread]]
- **Dẫn tới:** [[giao-tiep-i2c]]
- **Liên quan:** [[co-cau-chap-hanh]]

## ❓ Câu hỏi mở
- Servo 180° không quay vòng — muốn bánh xe robot thì dùng *continuous rotation servo* hay DC + driver?

## 📚 Nguồn
- Slide Part 1 — *Điều khiển servo motor*, *Practice 2b/2c*
