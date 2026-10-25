---
slug: nhiet-ke-lm35
title: Bài tập 1 — Nhiệt kế điện tử với LM35
vault: iot
type: concept
branch: C
order: 10
status: done
tags: [iot, arduino, bai-tap, cam-bien, lcd, buzzer, hysteresis]
prev: [lcd-1602-i2c]
next: [bluetooth-hc-05]
related: [adc-analogread, bon-thanh-phan-iot, co-cau-chap-hanh, giao-tiep-i2c, sketch-setup-loop, uart-serial-monitor]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
updated: 2026-10-25
---

# Bài tập 1 — Nhiệt kế điện tử với LM35

> Tóm tắt 1 câu: đọc LM35 qua ADC, đổi **10 mV/°C** thành nhiệt độ, hiện lên LCD 1602 và cho đèn + còi **nhấp nháy báo động** khi **> 25 °C** — bài đầu tiên gom trọn cả bốn khối IoT trên một bo.

**Ngày tạo:** 2026-10-24
**Trạng thái:** ✅ Đã nắm — làm xong trên mạch thật 2026-10-25
**📖 Lộ trình:** Nhánh C · #10 ← cần [[lcd-1602-i2c]] · → kế tiếp [[bluetooth-hc-05]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #arduino #bai-tap #cam-bien #lcd #buzzer #hysteresis

---

## 🎯 Đề bài (Practice 3 / Assignment 1)

- Hiển thị nhiệt độ từ cảm biến **LM35** trên màn hình **LCD 1602**.
- Điều khiển **LED** dựa trên nhiệt độ đo được: đèn / còi báo khi nhiệt độ **> 25 °C**.
- Thông số: `Vout = 10 mV/°C` (0 °C → 0 V, 25 °C → 0,25 V, 100 °C → 1 V).

## 🔌 Sơ đồ chân (bài làm thực tế)

| Linh kiện | Chân linh kiện | Nối vào Arduino Uno |
|---|---|---|
| LM35 (nhìn mặt phẳng có chữ, chân chĩa xuống) | trái +Vs · giữa Vout · phải GND | 5V · **A0** · GND |
| LCD 1602 + module I2C (PCF8574) | SDA · SCL · VCC · GND | **A4** · **A5** · 5V · GND |
| LED | chân dài qua điện trở 220 Ω · chân ngắn | **D12** · GND |
| Còi **thụ động** (passive buzzer) | + · − | **D12** · GND |

LED và còi mắc **song song trên cùng chân D12** → nháy và kêu cùng nhịp.

## 🔢 Chuỗi quy đổi

$$
T(^\circ C) = \frac{\text{analogRead} \times 5{,}0}{1023} \times 100
$$

| Bước | Công thức | Ví dụ 25 °C |
|---|---|---|
| ADC → điện áp | `V = raw × 5 / 1023` | raw ≈ 51 → 0,249 V |
| điện áp → nhiệt độ | `T = V / 0,010` = `V × 100` | 24,9 °C |

## 💻 Code cuối cùng (đã chạy trên mạch thật)

Ba việc chạy song song bằng `millis()`, **không có `delay()` dài** trong `loop()`:

| Việc | Nhịp |
|---|---|
| Đèn + còi đổi trạng thái khi báo động | 250 ms |
| Đo nhiệt độ, quyết định báo động, cập nhật LCD | 500 ms |
| Khởi động lại LCD để xoá ký tự rác do nhiễu còi | 5 s |

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// ----- Chân kết nối -----
const int lm35Pin    = A0;  // Chân giữa (Vout) của LM35
const int baoDongPin = 12;  // LED (qua điện trở 220 ohm) + còi buzzer thụ động, mắc song song
// LCD I2C: SDA -> A4, SCL -> A5

// ----- Ngưỡng báo động -----
const float NGUONG     = 25.0;  // Báo động khi nhiệt độ > 25 °C
const float TRE_NGUONG = 0.5;   // Hysteresis: chỉ tắt khi nhiệt độ < 24.5 °C

// ----- Nhịp thời gian (ms) -----
const unsigned long NHIP_NHAY   = 250;   // Đèn sáng 250 ms, tắt 250 ms
const unsigned long NHIP_DO     = 500;   // Đo nhiệt độ + cập nhật LCD mỗi 500 ms
const unsigned long NHIP_LAM_MOI = 5000; // Khởi động lại LCD mỗi 5 s phòng nhiễu từ còi

// Đổi 0x27 thành địa chỉ i2c_scanner tìm được (thường 0x27 hoặc 0x3F)
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Dấu độ ° tự vẽ, dùng được với mọi loại LCD
byte dauDo[8] = {0b01100, 0b10010, 0b10010, 0b01100, 0b00000, 0b00000, 0b00000, 0b00000};

bool dangBaoDong = false;
bool dangSang    = false;
float nhietDo    = 0;
unsigned long lanNhay = 0, lanDo = 0, lanLamMoi = 0;

// Đọc LM35 nhiều lần rồi lấy trung bình cho số đỡ nhảy
float docNhietDo() {
  long tong = 0;
  for (int i = 0; i < 20; i++) {
    tong += analogRead(lm35Pin);
    delay(1);
  }
  float dienAp = (tong / 20.0) * 5.0 / 1023.0;  // Đổi số ADC (0..1023) ra volt
  return dienAp * 100.0;                       // LM35: 10 mV/°C  ->  °C = V x 100
}

void khoiDongLcd() {
  lcd.init();
  lcd.backlight();
  lcd.createChar(0, dauDo);
}

void capNhatLcd() {
  // Dòng 1: Temp: 27.78 °C
  lcd.setCursor(0, 0);
  lcd.print("Temp: ");
  lcd.print(nhietDo, 2);
  lcd.write(byte(0));     // Dấu độ
  lcd.print("C    ");     // Khoảng trắng xoá ký tự thừa

  // Dòng 2: trạng thái
  lcd.setCursor(0, 1);
  if (dangBaoDong) lcd.print("CANH BAO: >25   ");
  else             lcd.print("Binh thuong     ");
}

void bat()  { tone(baoDongPin, 2000); dangSang = true;  }  // Đèn sáng + còi kêu
void tat()  { noTone(baoDongPin);     dangSang = false; }  // Đèn tắt + còi im

void setup() {
  pinMode(baoDongPin, OUTPUT);
  tat();

  Serial.begin(9600);
  khoiDongLcd();
  lcd.setCursor(0, 0);
  lcd.print("Nhiet ke LM35");
  lcd.setCursor(0, 1);
  lcd.print("Dang khoi dong..");
  delay(1500);
  lcd.clear();
}

void loop() {
  unsigned long bayGio = millis();

  // 1. Đo nhiệt độ, quyết định báo động, cập nhật LCD
  if (bayGio - lanDo >= NHIP_DO) {
    lanDo = bayGio;
    nhietDo = docNhietDo();

    if (!dangBaoDong && nhietDo > NGUONG) {
      dangBaoDong = true;
    } else if (dangBaoDong && nhietDo < NGUONG - TRE_NGUONG) {
      dangBaoDong = false;
      tat();                // Hết báo động: tắt hẳn đèn và còi
    }

    capNhatLcd();

    Serial.print("Nhiet do: ");
    Serial.print(nhietDo, 2);
    Serial.println(dangBaoDong ? " C  -> BAO DONG" : " C");
  }

  // 2. Nhấp nháy đèn + còi tít tít khi đang báo động
  if (dangBaoDong && bayGio - lanNhay >= NHIP_NHAY) {
    lanNhay = bayGio;
    if (dangSang) tat();
    else          bat();
  }

  // 3. Khởi động lại LCD định kỳ để xoá ký tự rác do nhiễu
  if (bayGio - lanLamMoi >= NHIP_LAM_MOI) {
    lanLamMoi = bayGio;
    khoiDongLcd();
    capNhatLcd();
  }
}
```

Biên dịch cho Uno: 7 582 byte flash (23 %), 599 byte RAM (29 %).

## 💡 Ý chính — bốn khối trên một bo

| Khối ([[bon-thanh-phan-iot]]) | Ở đây |
|---|---|
| Cảm biến | LM35 → A0 |
| Kết nối | dây tín hiệu + I2C tới LCD + UART tới PC |
| Xử lý | quy đổi + so ngưỡng có hysteresis |
| Giao diện / chấp hành | LCD + LED + còi |

## 🛠️ Nhật ký gỡ lỗi (buổi làm 2026-10-25)

Lỗi gặp theo đúng thứ tự, mỗi lỗi một tầng — đúng tư duy "hỏng theo tầng, sửa theo tầng" của [[go-loi-hc05]].

| # | Triệu chứng | Nguyên nhân | Cách sửa |
|---|---|---|---|
| 1 | LCD không hiện gì | Biến trở bài servo cắm ở **A5** — trên Uno A5 chính là **SCL** của I2C | Dời biến trở sang A0; A4/A5 dành riêng cho I2C → [[giao-tiep-i2c]] |
| 2 | Đèn nền LCD không sáng | Dây nguồn/jumper LED của module I2C | Cắm lại VCC 5V, GND, jumper đèn nền |
| 3 | Serial báo **293 → 298 °C**, tăng dần | Chân A0 nhận ≈ 2,9 V — cảm biến cắm sai (LM35 cắm ngược nóng lên rất nhanh) | Cắm lại đúng thứ tự +Vs · Vout · GND → về **≈ 30 °C** |
| 4 | Báo "BAO DONG" nhưng còi **im** | Còi **thụ động**: HIGH đứng yên không làm màng loa rung | Dùng `tone(pin, 2000)` / `noTone(pin)` thay `digitalWrite` |
| 5 | LCD hiện **ký tự lạ** | Mã `(char)223` không phải dấu độ trên mọi ROM; còi là cuộn dây gây nhiễu I2C | Tự vẽ dấu ° bằng `createChar`; khởi động lại LCD mỗi 5 s; điện trở 100 Ω nối tiếp còi |
| 6 | Đèn **sáng đứng**, không nhấp nháy | Chỉ bật chân D12 một lần; `delay(500)` chặn mọi việc khác | Viết lại bằng `millis()`, đèn + còi đổi trạng thái mỗi 250 ms |

**Bảng tra nhanh điện áp A0** (phòng ~20–30 °C) — đo `V = raw × 5 / 1023` là biết cảm biến đang ở tình trạng nào:

| V đo được | Nghĩa là | Công thức °C |
|---|---|---|
| 0,20–0,35 V | LM35 cắm đúng | `V × 100` |
| 0,70–0,85 V | Cảm biến là **TMP36** (loại có trong TinkerCAD) | `(V − 0,5) × 100` |
| 2,90–3,05 V | **LM335** (10 mV/K) hoặc cảm biến cắm ngược | `V × 100 − 273,15` |
| ≈ 5 V / ≈ 0 V / nhảy lung tung | A0 chạm 5V / chạm GND / bỏ lửng | sửa dây |

## ⚠️ Điều dễ nhầm

- LM35 có 3 chân **+Vs, Vout, GND** nhìn từ mặt phẳng chữ: cắm ngược thì nóng lên rất nhanh — **sờ thử ngay sau khi cấp điện**.
- **Còi chủ động vs thụ động:** chủ động có mạch dao động bên trong, cấp 5V là kêu; thụ động giống loa, phải cấp xung bằng `tone()`. Mẹo nhận biết: đáy bịt kín nhựa đen thường là chủ động, lộ mạch xanh thường là thụ động. `tone()` dùng được cho cả hai.
- LED + còi chung một chân ăn ~40 mA — đúng mức tối đa của một chân Uno. Lab ngắn thì được; dùng lâu cho còi đi qua transistor.
- Ở 25 °C chỉ ~51 bậc ADC → mỗi bậc ≈ 0,5 °C, số nhảy. Trung bình 20 mẫu (như code) hoặc đổi `analogReference(INTERNAL)` (1,1 V → 0,1 °C/bậc) và sửa công thức `V = raw × 1,1 / 1023`.
- So sánh `float` với ngưỡng cứng làm đèn **chập chờn** quanh 25,0 °C → **hysteresis**: bật khi > 25, tắt khi < 24,5. Textbook (ch. 3) gọi đúng tên bài toán này.
- LCD không tự xoá ký tự cũ → luôn in thêm khoảng trắng sau số, nếu không 1023 rút xuống 5 sẽ thành "5023".
- Phòng nóng hơn 25 °C thì vừa cắm điện đã báo động — muốn demo, tạm nâng ngưỡng lên trên nhiệt độ phòng vài độ rồi kẹp tay vào cảm biến.
- Nếu LM35 nằm cạnh Arduino, nhiệt bo mạch làm số cao hơn phòng 1–2 °C.

---

## 🔗 Liên kết
- **Tiền đề:** [[lcd-1602-i2c]] · [[adc-analogread]] · [[giao-tiep-i2c]]
- **Dẫn tới:** [[bluetooth-hc-05]] — bước tiếp theo: gửi nhiệt độ này qua không dây
- **Liên quan:** [[co-cau-chap-hanh]] · [[cam-bien]] · [[sketch-setup-loop]] — vì sao `delay()` chặn tất cả · [[uart-serial-monitor]] — công cụ đã dùng để bắt lỗi 293 °C

## ❓ Câu hỏi mở
- Nếu thay LM35 bằng DHT11 (digital, có cả độ ẩm) thì mất gì? (độ phân giải 1 °C, chậm 1 Hz) — đổi có đáng không?
- Khởi động lại LCD mỗi 5 s là chữa triệu chứng. Đặt tụ lọc 100 µF cạnh còi + diode bảo vệ có đủ để bỏ hẳn bước đó không?

## 📚 Nguồn
- Slide Part 1 — *Practice 3 / Assgm 1: Nhiệt kế điện tử*
- Buổi thực hành trên mạch thật 2026-10-25 (Arduino Uno, LCD I2C 0x27, còi thụ động)
