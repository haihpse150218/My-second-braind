---
slug: hc05-sketch-cau-noi-at
title: Sketch cầu nối AT cho HC-05 — hai cổng serial trên một Uno
vault: iot
type: concept
branch: D
order: 4
status: done
tags: [iot, bluetooth, cau-hinh, uart, softwareserial]
prev: [hc05-data-mode-vs-at-mode]
next: [hc05-lenh-at]
related: [uart-crossover-va-chia-ap, uart-serial-monitor, go-loi-hc05, hc05-led-trang-thai]
sources: ["IAD_MSA33_Part_1_2.pdf", "Thực hành 2026-10-25"]
created: 2026-10-25
---

# Sketch cầu nối AT cho HC-05 — hai cổng serial trên một Uno

> Tóm tắt 1 câu: máy tính không nói thẳng với HC-05 được, nên Arduino đứng giữa làm **phiên dịch**: cổng `Serial` (D0/D1, USB) nói với Serial Monitor, cổng `SoftwareSerial` (D10/D11) nói với HC-05 — mỗi cổng một tốc độ baud riêng.

**Ngày tạo:** 2026-10-25
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh D · #4 ← cần [[hc05-data-mode-vs-at-mode]] · → kế tiếp [[hc05-lenh-at]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #bluetooth #cau-hinh #uart #softwareserial

---

## 💡 Ý chính — vì sao phải tạo cổng serial thứ hai

Uno chỉ có **một UART phần cứng**, nằm ở **D0 (RX) / D1 (TX)**, và hai chân này **đã nối sẵn vào chip USB** trên board.

```
Máy tính ──USB── chip USB ──┬── D0 (RX) ── Arduino
                            └── D1 (TX) ──
                                  │
                          HC-05 cũng cắm vào đây?  → hai bên giành nhau
```

Cắm HC-05 vào D0/D1 trong lúc cắm USB thì:

- **Hai thiết bị cùng đẩy tín hiệu vào chân RX** (chip USB và HC-05) → dữ liệu chồng lên nhau thành rác.
- **Không nạp code được** — bootloader nhận code qua đúng hai chân này.
- **Serial Monitor in lẫn lộn** mọi thứ gửi cho HC-05.

Vì vậy slide nói *"nối thẳng RX/TX vào HC-05 chỉ được khi không dùng cáp USB"* — chạy bằng pin/adapter thì chip USB im lặng, D0/D1 rảnh cho HC-05. Chữ "nguồn USB" thực chất là **kết nối dữ liệu USB**, không phải chuyện điện.

**Cách giải:** thư viện `SoftwareSerial` giả lập UART trên hai chân digital bất kỳ.

| Cổng | Chân | Nối với | Dùng để | Baud trong bài |
|---|---|---|---|---|
| `Serial` (phần cứng) | D0/D1 qua USB | Máy tính | nạp code, Serial Monitor | 38400 |
| `btSerial` (phần mềm) | D10/D11 | HC-05 | lệnh AT / dữ liệu Bluetooth | 38400 (AT) · 9600 (data) |

```
Máy tính ══USB══ D0/D1 [Serial] ── Arduino ── [btSerial] D10/D11 ══ HC-05 ~~~ Điện thoại
```

## 🔌 Nối dây

| HC-05 | Arduino | Ghi chú |
|---|---|---|
| VCC | 5V | module có ổn áp sẵn |
| GND | GND | |
| TXD | D10 | nối thẳng — 3,3 V Arduino vẫn đọc là HIGH |
| RXD | D11 **qua cầu chia áp 1 kΩ / 2 kΩ** | RX chỉ chịu 3,3 V → [[uart-crossover-va-chia-ap]] |
| KEY/EN | **chân 3.3V** của Arduino | **không** nối vào chân digital (5 V) |

## ⚙️ Vào AT mode đúng cách

1. Arduino vẫn cắm USB. **Rút riêng dây VCC** của HC-05.
2. Nối **KEY lên 3.3V** (hoặc giữ nút nhỏ trên module).
3. **Cắm lại VCC** của HC-05 trong lúc KEY vẫn ở 3,3 V.
4. LED **nháy chậm ~2 s/lần** = AT mode. Nháy nhanh liên tục = vẫn data mode → làm lại từ bước 1 ([[hc05-led-trang-thai]]).
5. Serial Monitor **38400**, line ending **Newline** hoặc **Both NL & CR** → gõ `AT` → `OK`. Tiếp theo dùng [[hc05-lenh-at]].
6. Xong: rút KEY khỏi 3,3 V, cấp điện lại → module về data mode ở baud vừa đặt bằng `AT+UART`.

## 💻 Code (đã biên dịch cho Uno)

```cpp
/*
 * =====================================================================
 *  Project   : Cấu hình module HC-05 bằng AT Commands
 *  Môn học   : IAD591 - IoT Application Development
 *  Mô tả     : Arduino làm cầu nối giữa Serial Monitor và HC-05
 *              ở chế độ AT Command (đặt tên, PIN, baud, vai trò...)
 *
 *  VÀO AT MODE (bản đầy đủ, baud 38400):
 *    1. Rút dây VCC của HC-05 ra (Arduino vẫn cắm USB).
 *    2. Nối KEY/EN lên chân 3.3V của Arduino (hoặc giữ nút nhỏ trên module).
 *    3. Cắm lại VCC của HC-05 trong lúc KEY vẫn ở 3.3V.
 *    4. LED nháy CHẬM, khoảng 2 giây một lần = đã vào AT mode.
 *    (LED nháy nhanh liên tục = data mode, gõ AT sẽ không có phản hồi.)
 *
 *  Kết nối:
 *    HC-05 VCC  -> 5V
 *    HC-05 GND  -> GND
 *    HC-05 TXD  -> D10 (nối thẳng)
 *    HC-05 RXD  -> D11 qua cầu chia áp 1k / 2k (RX của HC-05 chỉ chịu 3.3V)
 *    HC-05 KEY  -> 3.3V của Arduino (KHÔNG nối vào chân digital 5V)
 *
 *  Serial Monitor: 38400 baud, line ending "Newline" hoặc "Both NL & CR"
 *  Gõ AT -> phải nhận OK
 * =====================================================================
 */

#include <SoftwareSerial.h>

#define RX_BT_PIN   10    // Nhận từ TX của HC-05
#define TX_BT_PIN   11    // Gửi tới RX của HC-05 (qua cầu chia áp)

#define AT_MODE_BAUD   38400  // Baud cố định của AT mode đầy đủ
#define SERIAL_BAUD    38400  // Serial Monitor phải chọn đúng số này

SoftwareSerial btSerial(RX_BT_PIN, TX_BT_PIN);

void setup() {
  Serial.begin(SERIAL_BAUD);
  btSerial.begin(AT_MODE_BAUD);

  Serial.println(F("============================================="));
  Serial.println(F("  HC-05 AT Command Bridge - IAD591"));
  Serial.println(F("  Serial Monitor: 38400 baud, Newline"));
  Serial.println(F("  Go AT de kiem tra -> nhan OK"));
  Serial.println(F("============================================="));
}

// Chỉ viết hoa phần lệnh trước dấu '=', giữ nguyên giá trị phía sau.
// AT+name=NullPet  ->  AT+NAME=NullPet   (tên không bị đổi thành NULLPET)
String chuanHoaLenh(String s) {
  int viTri = s.indexOf('=');
  if (viTri < 0) {
    s.toUpperCase();
    return s;
  }
  String lenh = s.substring(0, viTri);
  lenh.toUpperCase();
  return lenh + s.substring(viTri);
}

void loop() {
  // PC -> HC-05
  if (Serial.available()) {
    String input = Serial.readStringUntil('\n');
    input.trim();                       // Bỏ \r và khoảng trắng thừa
    if (input.length() > 0) {
      input = chuanHoaLenh(input);
      Serial.print(F("[-> HC-05] "));
      Serial.println(input);
      btSerial.print(input);
      btSerial.print("\r\n");           // HC-05 bắt buộc có CR LF cuối lệnh
    }
  }

  // HC-05 -> PC
  if (btSerial.available()) {
    String response = btSerial.readStringUntil('\n');
    response.trim();
    if (response.length() > 0) {
      Serial.print(F("[<- HC-05] "));
      Serial.println(response);
    }
  }
}
```

Biên dịch cho Uno: 6 136 byte flash (19 %), 315 byte RAM (15 %). Chưa thử trên module thật.

## ⚠️ Bốn lỗi của bản sketch gốc (phát tay trên lớp)

| # | Bản gốc | Vì sao sai | Bản sửa |
|---|---|---|---|
| 1 | KEY nối **chân 9**, `digitalWrite(9, HIGH)` trong `setup()` | HC-05 chỉ đọc KEY **đúng lúc vừa có điện**. Uno mất 1–2 s khởi động mới bật chân 9 → HC-05 đã vào data mode 9600 → gõ `AT` ở 38400 không có phản hồi. Chân 9 còn ra **5 V** vào KEY chịu 3,3 V | KEY nối thẳng **3.3V**, cấp điện lại riêng HC-05 |
| 2 | `input.toUpperCase()` cả dòng | `AT+NAME=NullPet` biến thành tên **NULLPET** | Chỉ viết hoa phần **trước dấu `=`** (`chuanHoaLenh()`) |
| 3 | Chú thích "Cách 2: không giữ KEY, gửi AT ở baud data mode" | Ở data mode HC-05 coi `AT` là **dữ liệu** gửi qua Bluetooth, không trả `OK`. LED nháy nhanh = data mode, không phải AT mode | Xoá. "Mini AT mode" ở 9600 có tồn tại nhưng phải **giữ KEY trong lúc gửi từng lệnh** và thiếu lệnh |
| 4 | `btSerial.println(input)` | Đuôi lệnh phụ thuộc `println` | Gửi rõ `"\r\n"` — Serial Monitor để Newline hay Both NL & CR đều chạy |

Hai lỗi 1 và 2 rất khó phát hiện: code **biên dịch sạch, chạy không báo lỗi**, chỉ có module là "câm" hoặc mang tên sai.

## ⚠️ Giới hạn của SoftwareSerial

- Ổn ở **9600–38400**; lên 115200 dễ mất ký tự.
- Nhiều cổng `SoftwareSerial` thì **mỗi lúc chỉ nghe được một** → phải gọi `listen()` để chuyển.
- Arduino tự đọc từng bit bằng phần mềm → tốn CPU. Mega, ESP32 có nhiều UART phần cứng nên không cần thư viện này.

---

## 🔗 Liên kết
- **Tiền đề:** [[hc05-data-mode-vs-at-mode]] · [[uart-crossover-va-chia-ap]] · [[uart-serial-monitor]]
- **Dẫn tới:** [[hc05-lenh-at]] — gõ gì sau khi thấy `OK`
- **Liên quan:** [[go-loi-hc05]] · [[hc05-led-trang-thai]] · [[bluetooth-hc-05]]

## ❓ Câu hỏi mở
- Muốn Arduino **tự** đưa HC-05 vào AT mode lúc khởi động thì phải điều khiển cả **VCC** của module (qua transistor) chứ không chỉ chân KEY — và KEY phải qua cầu chia áp. Có đáng làm cho NullPet không, hay cấu hình tay một lần là đủ?

## 📚 Nguồn
- Slide Part 1.2 — *Quy trình vào AT Command Mode*, *Sơ đồ kết nối phần cứng tổng quát*
- Sketch `hc05_at_config` phát trên lớp, rà và sửa 2026-10-25
