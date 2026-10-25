---
slug: giao-tiep-hai-chieu-bang-chuoi
title: Giao tiếp hai chiều bằng chuỗi — uplink và downlink
vault: iot
type: concept
branch: D
order: 7
status: learning
tags: [iot, bluetooth, giao-tiep, kien-truc]
prev: [bluetooth-master-slave]
next: [go-loi-hc05]
related: [uart-serial-monitor, lcd-1602-i2c, co-cau-chap-hanh, nhiet-ke-lm35]
sources: ["IAD_MSA33_Part_1_2.pdf"]
created: 2026-10-24
---

# Giao tiếp hai chiều bằng chuỗi — uplink và downlink

> Tóm tắt 1 câu: HC-05 chỉ là **đường ống**; hai đầu nói chuyện thuần bằng **chuỗi văn bản** — Arduino đẩy `TEMP:27.5` lên (uplink), người dùng gửi `LED_ON` xuống (downlink), và toàn bộ "giao thức" là **bạn tự đặt ra**.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #7 ← cần [[bluetooth-master-slave]] · → kế tiếp [[go-loi-hc05]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #bluetooth #giao-tiep #kien-truc

---

## 💡 Ý chính — kiến trúc dự án 1 (slide)

```
              Uplink  ◄── "TEMP:27.5\n" ──── Arduino đo cảm biến
PC / điện thoại            ((( HC-05 )))            Arduino Uno
              Downlink ─── "LED_ON\n" ──────►  if (cmd == "LED_ON") digitalWrite(...)
```

| Chiều | Ai gửi | Nội dung | Phía nhận làm gì |
|---|---|---|---|
| **Uplink** | Arduino | dữ liệu cảm biến, dạng `KEY:VALUE` | PC/app hiển thị, vẽ đồ thị, lưu |
| **Downlink** | người dùng (app / Python) | lệnh, dạng từ khoá | Arduino `if/else` → actuator |

Khuôn code — y hệt [[uart-serial-monitor]] nhưng đổi `Serial` thành `bt`:

```cpp
void loop() {
  // uplink mỗi 1 s
  static unsigned long t = 0;
  if (millis() - t > 1000) { t = millis(); bt.print("TEMP:"); bt.println(tempC, 1); }

  // downlink: đọc tới hết dòng rồi so chuỗi
  if (bt.available()) {
    String cmd = bt.readStringUntil('\n'); cmd.trim();
    if      (cmd == "LED_ON")  digitalWrite(ledPin, HIGH);
    else if (cmd == "LED_OFF") digitalWrite(ledPin, LOW);
    lcd.setCursor(0, 1); lcd.print(cmd + "        ");     // hiện lên LCD
  }
}
```
Lưu đồ slide: *khởi tạo LCD & Serial 9600 → có dữ liệu Bluetooth? → đọc → hiển thị LCD → lặp.*

## ⚙️ Ba biến thể cùng một khuôn

1. **Practice 4 — app "Arduino Bluetooth Control"** (Android): ghép đôi `HC-05`, PIN `1234`/`0000`, Terminal Mode gõ chữ → bật/tắt LED hoặc hiện lên [[lcd-1602-i2c]].
2. **Điều khiển bằng giọng nói**: app Voice Control → Google Voice API → chuỗi `"Open Light"` → Bluetooth → `if (voice == "Open Light")` → relay. Arduino **không hề biết** đó là giọng nói — vẫn chỉ là chuỗi.
3. **Smart home mở rộng**: DHT11 → uplink `30°C` lên điện thoại; điện thoại → downlink "bật đèn" → relay đóng đèn bàn 220 V ([[co-cau-chap-hanh]]).

## 🧩 Trực giác

Đây là **giao thức ứng dụng tự chế** — phiên bản thô sơ của thứ MQTT làm bài bản ở nhánh G: `TEMP:27.5` sẽ thành *topic* `home/temp` với *payload* `27.5`; `LED_ON` thành message trên topic `home/led`. Hiểu bản chất "chỉ là chuỗi" ở đây thì MQTT sau này không còn ma thuật.

## ⚠️ Điều dễ nhầm

- Đọc **từng ký tự** (`bt.read()`) rồi so với `"LED_ON"` → không bao giờ khớp. Phải gom tới ký tự kết dòng (`readStringUntil('\n')`) hoặc dùng lệnh 1 ký tự (`'1'`, `'2'`) như slide Part 1.
- App gửi `LED_ON\r\n` còn code so `"LED_ON"` → thừa `\r` → sai. Luôn `trim()`.
- `delay(1000)` trong loop làm **mất lệnh downlink** đến trong lúc chờ (bộ đệm SoftwareSerial 64 byte tràn). Dùng `millis()` như code trên.
- Gửi số nhị phân (`bt.write(27)`) thay vì chuỗi: terminal hiện ký tự lạ. Với người đọc, dùng `print`.

---

## 🔗 Liên kết
- **Tiền đề:** [[bluetooth-master-slave]] · [[uart-serial-monitor]]
- **Dẫn tới:** [[go-loi-hc05]]
- **Liên quan:** [[nhiet-ke-lm35]] (nguồn dữ liệu uplink) · [[lcd-1602-i2c]] · [[co-cau-chap-hanh]]

## ❓ Câu hỏi mở
- Định dạng `KEY:VALUE` tự chế vs JSON (`{"temp":27.5}`): JSON tốn Flash cho thư viện parse trên Uno — đáng không, hay đợi lên Raspberry Pi mới dùng JSON?

## 📚 Nguồn
- Slide Part 1.2 — *Kiến trúc dự án 1: giao tiếp 2 chiều PC & Arduino*, *Lưu đồ thuật toán*, *Ứng dụng: điều khiển bằng giọng nói*, *Mở rộng: mô hình Smart Home*, *Cài đặt app điều khiển (Android)*, *Practice 4*
