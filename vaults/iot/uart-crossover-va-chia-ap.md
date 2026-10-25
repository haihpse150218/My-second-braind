---
slug: uart-crossover-va-chia-ap
title: Nối UART chéo dây và cầu chia áp 5 V → 3,3 V
vault: iot
type: concept
branch: D
order: 2
status: learning
tags: [iot, bluetooth, dien-tu, giao-tiep]
prev: [bluetooth-hc-05]
next: [hc05-data-mode-vs-at-mode]
related: [dinh-luat-ohm, mach-noi-tiep-song-song, uart-serial-monitor]
sources: ["IAD_MSA33_Part_1_2.pdf"]
created: 2026-10-24
---

# Nối UART chéo dây và cầu chia áp 5 V → 3,3 V

> Tóm tắt 1 câu: UART luôn nối **chéo** (TX bên này → RX bên kia), và vì Arduino nói ở 5 V còn HC-05 chỉ nghe được 3,3 V, dây TX Arduino → RX HC-05 phải đi qua **cầu chia áp 1 kΩ / 2 kΩ**.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #2 ← cần [[bluetooth-hc-05]] · → kế tiếp [[hc05-data-mode-vs-at-mode]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #bluetooth #dien-tu #giao-tiep

---

## 💡 Ý chính — hai quy tắc

**1. Crossover.** TX là "miệng", RX là "tai". Miệng người này nối tai người kia:

```
Arduino TX ──────► RX HC-05
Arduino RX ◄────── TX HC-05
```
Nối TX–TX là hai cái miệng nói vào nhau — không ai nghe. Đây là nguyên nhân số 1 trong [[go-loi-hc05]].

**2. Chia áp một chiều.** Chỉ chiều **Arduino → HC-05** cần hạ áp. Chiều ngược lại HC-05 ra 3,3 V, Arduino coi ≥ 3 V là HIGH → nối thẳng được.

## 🔢 Cầu chia áp

$$
V_{out} = V_{in} \cdot \frac{R_2}{R_1 + R_2} = 5 \cdot \frac{2k}{1k + 2k} = 3{,}33\ \text{V}
$$

```
Arduino TX (5 V) ──[ R1 = 1 kΩ ]──┬──► HC-05 RX (3,3 V)
                                  │
                              [ R2 = 2 kΩ ]
                                  │
                                 GND
```
Hai điện trở **nối tiếp** ([[mach-noi-tiep-song-song]]), lấy điện áp ở điểm giữa — đúng [[dinh-luat-ohm]]: dòng chung, áp chia theo tỉ lệ điện trở. Bộ 1 kΩ + 2 kΩ hay 1 kΩ + 2,2 kΩ (→ 3,44 V, vẫn an toàn) đều được.

## ⚙️ Sơ đồ nối tổng quát (slide)

| HC-05 | Arduino |
|---|---|
| VCC | 5 V |
| GND | GND |
| TX | D10 (RX của `SoftwareSerial`) |
| RX | D11 (TX của `SoftwareSerial`) **qua cầu chia áp** |

```cpp
#include <SoftwareSerial.h>
SoftwareSerial bt(10, 11);   // (RX, TX) nhìn từ phía Arduino
void setup() { Serial.begin(9600); bt.begin(9600); }
```
Dùng D10/D11 thay vì D0/D1 để **UART phần cứng rảnh cho USB** → vẫn nạp code và debug qua Serial Monitor được.

## ⚠️ Điều dễ nhầm

- **Ngắt dây TX/RX khi nạp code** nếu lỡ dùng D0/D1 — bootloader cần hai chân đó; HC-05 cắm vào sẽ làm `avrdude` báo "not in sync".
- Không chia áp "vẫn chạy" — một thời gian. Chân RX bị quá áp chết dần, lỗi xuất hiện ngẫu nhiên sau vài tuần.
- Thiếu **GND chung** giữa Arduino, HC-05, LCD: điện áp không có mốc so sánh, tín hiệu "loạn". Slide nhấn: *tất cả chân GND phải nối chung*.
- Dùng điện trở quá lớn (100 kΩ / 200 kΩ) cho cầu chia: tỉ lệ đúng nhưng trở kháng cao làm xung UART méo ở baud cao. Giữ ở mức kΩ.

---

## 🔗 Liên kết
- **Tiền đề:** [[bluetooth-hc-05]] · [[dinh-luat-ohm]] · [[mach-noi-tiep-song-song]]
- **Dẫn tới:** [[hc05-data-mode-vs-at-mode]]
- **Liên quan:** [[uart-serial-monitor]] · [[go-loi-hc05]]

## ❓ Câu hỏi mở
- Khi nào nên thay cầu chia áp bằng IC chuyển mức logic hai chiều (TXS0108)? Với I2C bắt buộc phải vậy — vì sao?

## 📚 Nguồn
- Slide Part 1.2 — *Nguyên lý UART & mạch chia áp*, *Sơ đồ kết nối phần cứng tổng quát*
