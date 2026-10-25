---
slug: uart-serial-monitor
title: UART và Serial Monitor
vault: iot
type: concept
branch: C
order: 6
status: learning
tags: [iot, arduino, giao-tiep]
prev: [adc-analogread]
next: [ham-map-va-servo]
related: [bluetooth-hc-05, uart-crossover-va-chia-ap, giao-tiep-hai-chieu-bang-chuoi]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# UART và Serial Monitor

> Tóm tắt 1 câu: UART là giao tiếp **nối tiếp, không đồng bộ, hai dây** (TX/RX) giữa Arduino và PC; Serial Monitor là cửa sổ nhìn vào nó — vừa là **công cụ debug duy nhất**, vừa là cầu nối sang Python, Node-RED và cả Bluetooth.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #6 ← cần [[adc-analogread]] · → kế tiếp [[ham-map-va-servo]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #arduino #giao-tiep

---

## 💡 Ý chính

**UART** = Universal Asynchronous Receiver/Transmitter. "Không đồng bộ" nghĩa là **không có dây clock** — hai bên phải **thoả thuận trước tốc độ** (baud rate) để biết mỗi bit dài bao lâu. Vì thế sai baud = nhận rác.

| Lệnh | Ở đâu | Làm gì |
|---|---|---|
| `Serial.begin(9600)` | `setup()` | mở cổng, 9600 bit/giây |
| `Serial.print(x)` / `Serial.println(x)` | `loop()` | gửi ra PC (`ln` thêm xuống dòng) |
| `Serial.available()` | `loop()` | **số byte** đang chờ trong bộ đệm nhận (0 = không có gì) |
| `Serial.read()` | `loop()` | lấy **một byte** ra khỏi bộ đệm |

```cpp
void loop() {
  if (Serial.available() > 0) {   // có dữ liệu từ PC?
    char c = Serial.read();        // đọc 1 ký tự
    if (c == '1') digitalWrite(ledPin1, HIGH);
    else if (c == '2') digitalWrite(ledPin1, LOW);
  }
}
```
Ví dụ slide: gõ `1` bật LED, `2` tắt — **PC điều khiển Arduino bằng ký tự**. Đây là khuôn mẫu sẽ tái dùng y nguyên với Bluetooth ([[giao-tiep-hai-chieu-bang-chuoi]]).

## ⚙️ Bốn ứng dụng (theo slide)

1. **Debug** — `Serial.println` thay cho debugger; in biến ra xem.
2. **Xem dữ liệu cảm biến** — nhiệt độ, độ ẩm, ánh sáng; Practice 2a: quang trở → Serial Monitor.
3. **Gửi lệnh từ máy tính** — bật/tắt LED, nhập số.
4. **Nói chuyện với phần mềm khác** qua cổng COM — Python (`pyserial`), MATLAB, Node-RED. Đây là cửa ngõ để dữ liệu rời khỏi Arduino lên tầng trên.

## 🧩 Trực giác

Serial là một **ống nước hai chiều chứa byte**: Arduino đổ vào một đầu, PC hứng ở đầu kia, và ngược lại. Ống không biết "số" hay "chuỗi" — mọi thứ là byte; `println(27.5)` gửi 4 ký tự `'2' '7' '.' '5'`, không phải một số thực.

## ⚠️ Điều dễ nhầm

- **Baud hai bên phải bằng nhau** — `Serial.begin(9600)` trong code và 9600 ở góc dưới Serial Monitor. Lệch → ký tự lạ, ô vuông.
- `Serial.read()` trả `-1` khi không có gì; luôn kiểm tra `available()` trước.
- Serial Monitor gửi thêm ký tự kết dòng tuỳ chế độ (*No line ending / Newline / Both NL & CR*). Code so `c == '1'` sẽ nhận thêm `'\n'` ở vòng sau — vô hại ở ví dụ này nhưng **bắt buộc đúng** khi nói chuyện với HC-05 AT mode ([[hc05-data-mode-vs-at-mode]]).
- Chân D0 (RX) / D1 (TX) là UART phần cứng duy nhất của Uno, dùng chung với USB → đừng cắm module vào đó; dùng `SoftwareSerial` trên chân khác.

---

## 🔗 Liên kết
- **Tiền đề:** [[adc-analogread]]
- **Dẫn tới:** [[ham-map-va-servo]] · [[bluetooth-hc-05]] · [[giao-tiep-hai-chieu-bang-chuoi]]
- **Liên quan:** [[uart-crossover-va-chia-ap]] — cách nối TX/RX vật lý

## ❓ Câu hỏi mở
- 9600 baud ≈ 960 byte/giây. Gửi `TEMP:27.5\n` (10 byte) mỗi 100 ms thì chiếm 10% băng thông — đến mức nào thì nên tăng lên 115200?

## 📚 Nguồn
- Slide Part 1 — *Serial Monitor* (2 slide), *Hiện ký tự từ Serial Monitor*, *Serial control Arduino*, *Practice 2*
