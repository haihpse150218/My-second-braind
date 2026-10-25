---
slug: adc-analogread
title: ADC và analogRead — từ điện áp ra con số
vault: iot
type: concept
branch: C
order: 5
status: learning
tags: [iot, arduino, cam-bien, nen-tang]
prev: [chan-digital-vs-analog]
next: [uart-serial-monitor]
related: [cam-bien, nhiet-ke-lm35, ham-map-va-servo]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# ADC và analogRead — từ điện áp ra con số

> Tóm tắt 1 câu: bộ chuyển đổi tương tự–số (ADC) 10-bit của Arduino ánh xạ **0…5 V thành 0…1023**; `analogRead` trả về con số đó, và **tự mình** phải đổi ngược lại thành điện áp rồi thành đại lượng vật lý.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #5 ← cần [[chan-digital-vs-analog]] · → kế tiếp [[uart-serial-monitor]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #arduino #cam-bien #nen-tang

---

## 🔢 Công thức

$$
V = \frac{\text{sensorValue} \times 5{,}0}{1023}
$$

| Ký hiệu | Ý nghĩa |
|---|---|
| `sensorValue` | kết quả `analogRead(A#)`, số nguyên 0…1023 |
| `5,0` | điện áp tham chiếu (AREF) — mặc định bằng nguồn 5 V |
| `1023` | giá trị lớn nhất của 10-bit (`2¹⁰ − 1`) |
| `V` | điện áp thật tại chân, 0…5 V |

Ví dụ slide: cảm biến xuất **2,5 V** → Arduino đọc ≈ **512**. Ngược lại `512 × 5 / 1023 ≈ 2,50 V`. Mỗi bậc ≈ **4,9 mV**.

```cpp
int sensorValue = analogRead(A0);              // 0..1023
float voltage   = sensorValue * 5.0 / 1023.0;  // V
float tempC     = voltage * 100.0;             // LM35: 10 mV/°C
```

## 💡 Ý chính

ADC làm **hai việc** cùng lúc, đúng như số hoá tín hiệu ở DSP:
1. **Lấy mẫu** theo thời gian — mỗi lần gọi `analogRead` là một mẫu (~100 µs/lần trên Uno, tức tối đa ~10 kHz).
2. **Lượng tử hoá** giá trị — làm tròn điện áp về 1 trong 1024 bậc.

Con số 0…1023 **vô nghĩa cho tới khi nhân với datasheet**: LM35 10 mV/°C; biến trở → góc; quang trở → chỉ so ngưỡng.

## ⚙️ Khi nào dùng

- Mọi [[cam-bien]] analog. Bài [[nhiet-ke-lm35]] là ứng dụng trọn vẹn.
- Đổi thang bằng `map()` khi không cần điện áp thật, chỉ cần tỉ lệ → [[ham-map-va-servo]].

## ⚠️ Điều dễ nhầm

- `sensorValue * 5 / 1023` với **số nguyên** → phép chia nguyên, kết quả 0 hoặc 5. Phải viết `5.0` và `1023.0`.
- Nguồn USB thực tế 4,7–5,1 V chứ không đúng 5,0 → sai số hệ thống vài %. Cần chính xác thì dùng `analogReference(INTERNAL)` (1,1 V) cho LM35.
- Đọc một lần rồi tin: nhiễu ±2–3 bậc là bình thường. Trung bình 10 mẫu trước khi so ngưỡng.
- Lấy mẫu quá thưa (một `delay(1000)` giữa hai lần đọc) thì tín hiệu đổi nhanh **bị bỏ lỡ** — đúng định lý lấy mẫu bên DSP.

---

## 🔗 Liên kết
- **Tiền đề:** [[chan-digital-vs-analog]]
- **Dẫn tới:** [[uart-serial-monitor]] · [[nhiet-ke-lm35]] · [[ham-map-va-servo]]
- **Liên môn:** [[dsp/tin-hieu-roi-rac]] — dãy `analogRead` chính là tín hiệu rời rạc `x[n]` · [[dsp/dinh-ly-lay-mau]] — `delay()` giữa hai lần đọc quyết định `f_s` · [[ivp/luong-tu-hoa-anh]] — 1024 mức ADC và 256 mức xám là cùng một phép lượng tử hoá

## ❓ Câu hỏi mở
- Với LM35 ở nhiệt độ phòng (~0,25 V) chỉ dùng 5% dải ADC — tức độ phân giải ~0,5 °C. Có đáng đổi AREF sang 1,1 V để được ~0,1 °C không?

## 📚 Nguồn
- Slide Part 1 — *Analog pins control*, *ADC: chuyển đổi Analog → Digital*
