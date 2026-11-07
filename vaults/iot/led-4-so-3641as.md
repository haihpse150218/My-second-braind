---
slug: led-4-so-3641as
title: LED 4 số 3641AS — quét luân phiên (multiplexing)
vault: iot
type: concept
branch: E
order: 9
status: learning
tags: [iot, raspberry-pi, hien-thi, python, bai-tap]
prev: [ic-74hc595]
next: [uart-pi-arduino]
related: [led-7-doan-5161as, hc-sr04-sieu-am, dht11-dht22, adc-analogread]
sources: ["IAD_MSA33_Part_2.pdf"]
created: 2026-11-07
---

# LED 4 số 3641AS — quét luân phiên (multiplexing)

> Tóm tắt 1 câu: 4 chữ số **dùng chung** 8 đường đoạn, nên mỗi lúc chỉ sáng được một chữ số; mắt thấy cả 4 cùng sáng vì Pi **quét luân phiên** thật nhanh.

**Ngày tạo:** 2026-11-07
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #9 ← cần [[ic-74hc595]] · → kế tiếp [[uart-pi-arduino]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #raspberry-pi #hien-thi #python #bai-tap

---

## 💡 Ý chính

3641AS có 12 chân: **8 chân đoạn** (a–g, dp) và **4 chân chọn chữ số**. Đây là loại **cathode chung**, mỗi chữ số có GND riêng, nên chân chọn ở mức **LOW** thì chữ số đó được bật.

| Chân 3641AS | Chức năng | | Chân 3641AS | Chức năng |
|---:|---|---|---:|---|
| 12 | digit 1 | | 1 | E |
| 11 | A | | 2 | D |
| 10 | F | | 3 | DP |
| 9 | digit 2 | | 4 | C |
| 8 | digit 3 | | 5 | G |
| 7 | B | | 6 | digit 4 |

Mạch của slide: đoạn qua [[ic-74hc595]] (Q0–Q7 = a, b, c, d, e, f, g, dp), chữ số qua **GPIO 5, 6, 13, 19** (digit 1–4).

## 🧩 Trực giác / Ví dụ

Như **quạt đèn LED chữ chạy** hay phim điện ảnh: mỗi thời điểm chỉ một hình, nhưng đổi đủ nhanh thì mắt ghép lại thành liên tục.

## 🔢 Công thức / Định nghĩa

Bit 0–6 là a–g, bit 7 là dp. Bảng mã ở đây lấy từ `digit_patterns` của [[led-7-doan-5161as]]:

```python
SEG = [0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x67]   # 0..9
DIGITS = [5, 6, 13, 19]

def show(text):                    # ví dụ show("50.20"), phải gọi lặp lại liên tục
    cells = []
    for ch in text:
        if ch == '.':
            cells[-1] |= 0x80      # bật dp của chữ số vừa rồi
        else:
            cells.append(SEG[int(ch)])
    for pin, value in zip(DIGITS, cells):
        for p in DIGITS:
            GPIO.output(p, 1)      # tắt hết trước khi đổi đoạn, tránh bóng mờ
        shift_out(value)
        GPIO.output(pin, 0)        # LOW = bật chữ số này
        time.sleep(0.002)
```

🔎 Đã chạy trên mô hình giả lập: `show("50.20")` hiện đúng `5`, `0.`, `2`, `0`, mỗi lúc một chữ số. Chưa chạy trên mạch thật. Với 2 ms mỗi chữ số, cả màn hình làm mới khoảng **125 lần/giây**.

## ⚙️ Khi nào dùng / Ứng dụng

- **Practice 5.2 (tr. 45):** GUI có START / STOP. Ban đầu LED hiện `00.00`; START hiện khoảng cách từ [[hc-sr04-sieu-am]] theo cm, ví dụ `50.20`; STOP về `00.00`.
- **Practice 6.3 (tr. 57):** hiện nhiệt độ từ [[dht11-dht22]], ví dụ `25.4`.

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- **Quét phải chạy liên tục.** `sleep(5)` chờ cảm biến thì màn hình đứng ở một chữ số. Nên chạy quét trong một `threading.Thread` riêng *(ngoài slide)*.
- Đảo logic: tưởng HIGH mới bật chữ số. Với cathode chung thì LOW mới bật.
- **Chân chọn chữ số gánh dòng của cả 8 đoạn.** GPIO chịu tối đa 16 mA ([[pi-gpio-pinout]]), nên mỗi đoạn chỉ nên khoảng 2 mA. Dòng lớn hơn thì cần transistor *(ngoài slide)*.
- Python trên Linux không đều nhịp, nên có thể thấy LED hơi rung khi Pi bận.

## 🔗 Liên kết

- **Tiền đề:** [[ic-74hc595]] · [[led-7-doan-5161as]]
- **Dẫn tới:** [[giao-dien-iot]] · [[luu-csv-tren-pi]]
- **Liên quan:** [[adc-analogread]] — cũng là "lấy mẫu đủ nhanh"

## ❓ Câu hỏi mở

- Vì sao slide không dùng IC chuyên dụng như TM1637 để Pi khỏi phải tự quét?

## 📚 Nguồn

- `IAD_MSA33_Part_2.pdf` — tr. 41–42, 44–45, 57
