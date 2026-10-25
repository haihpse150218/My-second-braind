---
slug: arduino-toolchain
title: Arduino toolchain — từ sketch tới file hex
vault: iot
type: concept
branch: C
order: 2
status: learning
tags: [iot, arduino, cong-cu]
prev: [arduino-la-gi]
next: [sketch-setup-loop]
related: [uart-serial-monitor]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# Arduino toolchain — từ sketch tới file hex

> Tóm tắt 1 câu: nút *Upload* giấu bốn bước — **gộp & biến đổi sketch → biên dịch (C++) → liên kết với thư viện → sinh file `.hex`** — rồi đẩy hex qua USB vào Flash của vi điều khiển.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #2 ← cần [[arduino-la-gi]] · → kế tiếp [[sketch-setup-loop]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #arduino #cong-cu

---

## 💡 Ý chính

```
sketch .ino ──► Combine & Transform ──► Compile ──► Link ──► .hex ──► Upload (USB/bootloader)
                (thêm #include, khai báo)   (avr-gcc)   (+ libraries)        (avrdude)
```

| Bước | Làm gì | Hệ quả thực tế |
|---|---|---|
| Combine & Transform | ghép các file `.ino`, tự thêm prototype hàm, `#include <Arduino.h>` | nên khai báo hàm sau vẫn gọi được ở trước |
| Compile | biên dịch C/C++ thành mã máy AVR | lỗi cú pháp dừng ở đây |
| Link | nối với thư viện (`Wire`, `Servo`, `LiquidCrystal_I2C`) | thiếu thư viện → lỗi ở đây |
| Hex creation | file nhị phân Intel HEX | kích thước phải < 32 KB Flash |
| Upload | bootloader trên chip nhận hex qua UART | chân D0/D1 bận → tháo module serial khi nạp |

**Verify** chỉ chạy tới bước hex (kiểm tra lỗi, **không** nạp). **Upload** = Verify + nạp.

## ⚙️ Giao diện IDE cần biết

- **Output**: thông tin biên dịch, lỗi cú pháp, kích thước chương trình. Bật *Show verbose output* trong Preferences để thấy đầy đủ lệnh `avr-gcc` / `avrdude` khi gỡ lỗi nạp.
- **Serial Monitor**: cửa sổ gửi/nhận qua UART → [[uart-serial-monitor]].
- Cài IDE từ `arduino.cc/en/software`; chọn đúng **Board** (Uno) và **Port** (COMx) trước khi Upload.

## ⚠️ Điều dễ nhầm

- "avrdude: stk500_recv(): programmer is not responding" = nạp thất bại, thường do **sai cổng COM**, hoặc **chân D0/D1 đang bị module khác chiếm** (HC-05 cắm vào 0/1). Rút dây TX/RX rồi nạp lại.
- Sketch biên dịch được trong TinkerCAD nhưng lỗi trên IDE thật: thư viện chưa cài → *Library Manager*.
- Flash 32 KB nghe nhiều nhưng `Serial.println` với chuỗi dài và `float` nhanh chóng đầy — Output cho biết "Sketch uses X bytes".

---

## 🔗 Liên kết
- **Tiền đề:** [[arduino-la-gi]]
- **Dẫn tới:** [[sketch-setup-loop]] · [[uart-serial-monitor]]

## ❓ Câu hỏi mở
- Bootloader chiếm ~0.5 KB Flash và thêm độ trễ khởi động — khi nào đáng nạp trực tiếp bằng ISP để bỏ bootloader?

## 📚 Nguồn
- Slide Part 1 — *Arduino toolchain*, *Arduino IDE*, *Biên dịch và upload code trong Arduino IDE*, *Compiling / Upload*
