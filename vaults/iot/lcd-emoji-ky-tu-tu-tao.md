---
slug: lcd-emoji-ky-tu-tu-tao
title: Vẽ mặt emoji lên LCD 1602 bằng ký tự tự tạo
vault: iot
type: concept
branch: C
order: 11
status: done
tags: [iot, arduino, lcd, giao-dien, cgram, serial]
prev: [nhiet-ke-lm35]
next: [bluetooth-hc-05]
related: [lcd-1602-i2c, giao-tiep-hai-chieu-bang-chuoi, uart-serial-monitor, giao-tiep-i2c]
sources: ["Thực hành trên mạch thật 2026-10-25"]
created: 2026-10-25
---

# Vẽ mặt emoji lên LCD 1602 bằng ký tự tự tạo

> Tóm tắt 1 câu: LCD 1602 cho tự vẽ **8 ký tự 5×8 điểm** trong bộ nhớ CGRAM; ghép **6 ký tự thành khung 3 ô × 2 dòng** là vẽ được một khuôn mặt, rồi đổi mặt theo lệnh chữ gõ từ Serial Monitor.

**Ngày tạo:** 2026-10-25
**Trạng thái:** ✅ Đã nắm — chạy được trên mạch thật
**📖 Lộ trình:** Nhánh C · #11 ← cần [[nhiet-ke-lm35]] · → kế tiếp [[bluetooth-hc-05]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #arduino #lcd #giao-dien #cgram #serial

---

## 💡 Ý chính

- Mỗi ô trên LCD 1602 là một lưới **5 cột × 8 dòng** điểm. Chữ cái thường lấy từ bảng ký tự cố định trong ROM.
- LCD còn có **CGRAM**: 8 chỗ trống (mã 0–7) để mình tự vẽ ký tự. Mỗi ký tự là **8 byte**, mỗi byte là một dòng, 5 bit thấp là 5 điểm (1 = sáng).
- Một mặt cần nhiều điểm hơn một ô → ghép **3 ô ngang × 2 dòng = 15 × 16 điểm**, tốn **6 / 8** chỗ CGRAM. Dòng trên vẽ mắt, dòng dưới vẽ miệng.
- Chỉ có 8 chỗ nên **mỗi lần đổi mặt thì nạp lại** 6 ký tự bằng `createChar` — các ô đang hiện mã 0–5 tự đổi hình theo.

| Lệnh Serial | Mặt | Chữ trên LCD |
|---|---|---|
| `vui` | cười mỉm | Vui qua! |
| `cuoi` | cười to, mắt híp | Ha ha ha! |
| `buon` | mếu, lông mày chùng | Buon qua... |
| `khoc` | nhắm mắt, nước mắt | Hu hu hu |
| `gian` | lông mày nhíu, nghiến răng | Tuc qua! |
| `ngac` | mắt tròn, miệng chữ O | Ua?! |

## 🧩 Trực giác / Ví dụ — bản vẽ 15 × 16 điểm

Vẽ bằng `#` và `.` trước, rồi dùng script cắt thành 6 khối 5×8 — đỡ đếm bit bằng tay. Đường chia ô nằm ở cột 5, 10 và dòng 8.

```
vui               cuoi              buon           
...............   ...............   ....##...##....
...............   ...............   ..##.......##..
..##.......##..   ...............   ...............
.####.....####.   ...#.......#...   ..##.......##..
.####.....####.   ..#.#.....#.#..   ..##.......##..
..##.......##..   .#...#...#...#.   ...............
...............   ...............   ...............
...............   ...............   ...............
...............   .#############.   ...............
.#...........#.   .#############.   ...............
.##.........##.   ..###########..   .....#####.....
..##.......##..   ...#########...   ...###...###...
...###...###...   ....#######....   ..##.......##..
.....#####.....   ......###......   .##.........##.
...............   ...............   .#...........#.
...............   ...............   ...............

khoc              gian              ngac           
...............   .#...........#.   ...............
...............   ..##.......##..   ..###.....###..
.#####...#####.   ....#.....#....   .#...#...#...#.
...............   ..##.......##..   .#.#.#...#.#.#.
..#.........#..   ..##.......##..   .#...#...#...#.
..#.........#..   ...............   ..###.....###..
.###.......###.   ...............   ...............
.###.......###.   ...............   ...............
..#.........#..   ...............   ...............
...............   ...............   ......###......
.....#####.....   ...............   .....#...#.....
....#.....#....   ..###########..   .....#...#.....
...#.......#...   ..#.#.#.#.#.#..   .....#...#.....
...#.......#...   ..###########..   ......###......
....#######....   ...............   ...............
...............   ...............   ...............
```

Trên màn hình thật, giữa các ô có **khe hở 1 điểm**, nên mặt trông hơi bị chia ô — đặc điểm phần cứng, không phải lỗi.

## 🔢 Công thức — đổi bản vẽ thành mảng byte

Ký tự số `c` (0–5) trong khung 3×2: cột khối `cb = c % 3`, dòng khối `rb = c / 3`.
Byte dòng `r` của ký tự đó = 5 điểm `bitmap[rb·8 + r][cb·5 … cb·5 + 4]`.

| Ký hiệu | Ý nghĩa |
|---|---|
| `createChar(i, buf)` | nạp 8 byte `buf` vào chỗ CGRAM số `i` (0–7) |
| `lcd.write(byte(i))` | in ký tự tự tạo số `i` — phải ép `byte(0)`, vì `write(0)` dễ bị hiểu nhầm là con trỏ rỗng |
| `PROGMEM` | để mảng trong flash 32 KB, không tốn RAM 2 KB |
| `memcpy_P(buf, src, 8)` | chép 8 byte từ flash ra RAM trước khi `createChar` |

Script sinh mảng (Python):

```python
for rb in range(2):
    for cb in range(3):
        rows = [bitmap[rb*8 + r][cb*5: cb*5 + 5] for r in range(8)]
        print("{" + ",".join("0b" + s.replace(".", "0").replace("#", "1") for s in rows) + "}")
```

## 💻 Code đầy đủ (đã biên dịch cho Uno)

Thư viện **LiquidCrystal I2C** (Frank de Brabander). LCD nối SDA → A4, SCL → A5. Serial Monitor 9600, chọn **Newline**.

```cpp
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// Đổi 0x27 thành địa chỉ i2c_scanner tìm được (thường 0x27 hoặc 0x3F)
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Mỗi mặt gồm 6 ký tự tự tạo, xếp 3 ô ngang x 2 dòng:
//   ô 0 | ô 1 | ô 2   <- dòng trên: mắt
//   ô 3 | ô 4 | ô 5   <- dòng dưới: miệng
const byte MAT_VUI[6][8] PROGMEM = {
  {0b00000,0b00000,0b00110,0b01111,0b01111,0b00110,0b00000,0b00000},
  {0b00000,0b00000,0b00000,0b00000,0b00000,0b00000,0b00000,0b00000},
  {0b00000,0b00000,0b01100,0b11110,0b11110,0b01100,0b00000,0b00000},
  {0b00000,0b01000,0b01100,0b00110,0b00011,0b00000,0b00000,0b00000},
  {0b00000,0b00000,0b00000,0b00000,0b10001,0b11111,0b00000,0b00000},
  {0b00000,0b00010,0b00110,0b01100,0b11000,0b00000,0b00000,0b00000}
};
const byte MAT_CUOI[6][8] PROGMEM = {
  {0b00000,0b00000,0b00000,0b00010,0b00101,0b01000,0b00000,0b00000},
  {0b00000,0b00000,0b00000,0b00000,0b00000,0b10001,0b00000,0b00000},
  {0b00000,0b00000,0b00000,0b01000,0b10100,0b00010,0b00000,0b00000},
  {0b01111,0b01111,0b00111,0b00011,0b00001,0b00000,0b00000,0b00000},
  {0b11111,0b11111,0b11111,0b11111,0b11111,0b01110,0b00000,0b00000},
  {0b11110,0b11110,0b11100,0b11000,0b10000,0b00000,0b00000,0b00000}
};
const byte MAT_BUON[6][8] PROGMEM = {
  {0b00001,0b00110,0b00000,0b00110,0b00110,0b00000,0b00000,0b00000},
  {0b10001,0b00000,0b00000,0b00000,0b00000,0b00000,0b00000,0b00000},
  {0b10000,0b01100,0b00000,0b01100,0b01100,0b00000,0b00000,0b00000},
  {0b00000,0b00000,0b00000,0b00011,0b00110,0b01100,0b01000,0b00000},
  {0b00000,0b00000,0b11111,0b10001,0b00000,0b00000,0b00000,0b00000},
  {0b00000,0b00000,0b00000,0b11000,0b01100,0b00110,0b00010,0b00000}
};
const byte MAT_KHOC[6][8] PROGMEM = {
  {0b00000,0b00000,0b01111,0b00000,0b00100,0b00100,0b01110,0b01110},
  {0b00000,0b00000,0b10001,0b00000,0b00000,0b00000,0b00000,0b00000},
  {0b00000,0b00000,0b11110,0b00000,0b00100,0b00100,0b01110,0b01110},
  {0b00100,0b00000,0b00000,0b00001,0b00010,0b00010,0b00001,0b00000},
  {0b00000,0b00000,0b11111,0b00000,0b00000,0b00000,0b11111,0b00000},
  {0b00100,0b00000,0b00000,0b10000,0b01000,0b01000,0b10000,0b00000}
};
const byte MAT_GIAN[6][8] PROGMEM = {
  {0b01000,0b00110,0b00001,0b00110,0b00110,0b00000,0b00000,0b00000},
  {0b00000,0b00000,0b00000,0b00000,0b00000,0b00000,0b00000,0b00000},
  {0b00010,0b01100,0b10000,0b01100,0b01100,0b00000,0b00000,0b00000},
  {0b00000,0b00000,0b00000,0b00111,0b00101,0b00111,0b00000,0b00000},
  {0b00000,0b00000,0b00000,0b11111,0b01010,0b11111,0b00000,0b00000},
  {0b00000,0b00000,0b00000,0b11100,0b10100,0b11100,0b00000,0b00000}
};
const byte MAT_NGAC[6][8] PROGMEM = {
  {0b00000,0b00111,0b01000,0b01010,0b01000,0b00111,0b00000,0b00000},
  {0b00000,0b00000,0b10001,0b10001,0b10001,0b00000,0b00000,0b00000},
  {0b00000,0b11100,0b00010,0b01010,0b00010,0b11100,0b00000,0b00000},
  {0b00000,0b00000,0b00000,0b00000,0b00000,0b00000,0b00000,0b00000},
  {0b00000,0b01110,0b10001,0b10001,0b10001,0b01110,0b00000,0b00000},
  {0b00000,0b00000,0b00000,0b00000,0b00000,0b00000,0b00000,0b00000}
};

// Nạp 6 ký tự của một mặt vào bộ nhớ LCD rồi vẽ ra góc trái
void veMat(const byte mat[6][8], const char* dong1, const char* dong2) {
  byte buf[8];
  for (byte i = 0; i < 6; i++) {
    memcpy_P(buf, mat[i], 8);   // Đọc từ flash (PROGMEM) ra RAM
    lcd.createChar(i, buf);
  }

  lcd.clear();                  // clear() cũng đưa con trỏ về màn hình
  lcd.setCursor(0, 0);
  lcd.write(byte(0)); lcd.write(byte(1)); lcd.write(byte(2));
  lcd.setCursor(0, 1);
  lcd.write(byte(3)); lcd.write(byte(4)); lcd.write(byte(5));

  lcd.setCursor(4, 0); lcd.print(dong1);
  lcd.setCursor(4, 1); lcd.print(dong2);
}

void inHuongDan() {
  Serial.println(F("Go 1 lenh roi Enter: vui | cuoi | buon | khoc | gian | ngac"));
}

void setup() {
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
  veMat(MAT_VUI, "Xin chao!", "Go lenh...");
  inHuongDan();
}

void loop() {
  if (!Serial.available()) return;

  String lenh = Serial.readStringUntil('\n');
  lenh.trim();                 // Bỏ \r, khoảng trắng thừa
  lenh.toLowerCase();          // VUI, Vui, vui đều được
  if (lenh.length() == 0) return;

  if      (lenh == "vui")  veMat(MAT_VUI,  "Vui qua!",   ":)");
  else if (lenh == "cuoi") veMat(MAT_CUOI, "Ha ha ha!",  ":D");
  else if (lenh == "buon") veMat(MAT_BUON, "Buon qua...", ":(");
  else if (lenh == "khoc") veMat(MAT_KHOC, "Hu hu hu", "T_T");
  else if (lenh == "gian") veMat(MAT_GIAN, "Tuc qua!",   ">:(");
  else if (lenh == "ngac") veMat(MAT_NGAC, "Ua?!",       ":O");
  else {
    Serial.print(F("Khong hieu lenh: "));
    Serial.println(lenh);
    inHuongDan();
    return;
  }

  Serial.print(F("Da ve mat: "));
  Serial.println(lenh);
}
```

Biên dịch cho Uno: 7 038 byte flash (21 %), 566 byte RAM (27 %).

## ⚙️ Khi nào dùng

- Icon nhỏ trên giao diện thiết bị: pin, wifi, dấu độ °, mũi tên, thanh tiến trình.
- Biểu cảm cho robot — cùng ý tưởng với mặt OLED của [[du-an-esp32-mcp]], nhưng ở mức ký tự.
- Lệnh `vui`, `khoc`… là một **giao thức chuỗi tự đặt** đúng kiểu [[giao-tiep-hai-chieu-bang-chuoi]]: đổi Serial Monitor thành HC-05 là điều khiển mặt từ điện thoại.

## ⚠️ Lỗi thường gặp / Điều dễ nhầm

- **Chỉ có 8 chỗ CGRAM.** Thư viện tiếng Việt `LCDI2C_Vietnamese` cũng dùng chính 8 chỗ này để vẽ chữ có dấu → dùng chung với emoji thì hai bên đè nhau. Bài này dùng `LiquidCrystal_I2C` và chữ **không dấu**.
- Sau `createChar` con trỏ đang trỏ vào CGRAM → phải gọi `clear()` hoặc `setCursor()` rồi mới in, nếu không chữ không hiện ra màn hình.
- Mảng 6 mặt × 48 byte để trong RAM vẫn chạy, nhưng thói quen tốt là để **PROGMEM** — Uno chỉ có 2 KB RAM.
- `readStringUntil('\n')` + `trim()` + `toLowerCase()` → gõ `VUI`, `Vui ` hay để Serial Monitor gửi kèm `\r` đều nhận đúng.
- Dấu độ: mã `(char)223` chỉ đúng trên LCD ROM A00 — LCD khác ROM sẽ hiện ký tự lạ; vẽ dấu ° bằng `createChar` như [[nhiet-ke-lm35]] là chắc ăn.

---

## 🔗 Liên kết
- **Tiền đề:** [[lcd-1602-i2c]] · [[nhiet-ke-lm35]] · [[uart-serial-monitor]]
- **Dẫn tới:** [[bluetooth-hc-05]] — gửi lệnh đổi mặt từ điện thoại
- **Liên quan:** [[giao-tiep-hai-chieu-bang-chuoi]] · [[giao-tiep-i2c]] · [[du-an-esp32-mcp]]

## ❓ Câu hỏi mở
- Muốn mặt **chớp mắt** tự động thì chỉ nạp lại 3 ký tự dòng trên theo `millis()` — có bị nháy màn hình không?
- Hai mặt khác nhau cùng lúc trên một LCD cần 12 ký tự > 8 chỗ CGRAM — có cách nào (dùng chung ký tự miệng/mắt)?

## 📚 Nguồn
- Buổi thực hành trên mạch thật 2026-10-25 — Arduino Uno, LCD 1602 I2C địa chỉ 0x27
- Thư viện LiquidCrystal I2C — `createChar`, `write`
