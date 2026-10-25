---
slug: iot-slide-part1-2-bluetooth
title: "IAD591 — Slide Part 1.2: Bluetooth HC-05"
vault: iot
type: inbox
status: todo
tags: [iot, chua-chung-cat]
sources: ["IAD_MSA33_Part_1_2.pdf"]
created: 2026-10-24
---

# IAD591 — Slide Part 1.2: Bluetooth HC-05

**Nguồn gốc:** `D:\MSA-FPT\IOT\material\IAD_MSA33_Part_1_2.pdf`
**Trạng thái:** ⬜ Chưa chưng cất
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Dự kiến tách:** HC-05 · AT mode vs Data mode · crossover TX/RX · chia áp · master/slave · gỡ lỗi

> ⚠️ **Note thô** — text trích bằng `pdftotext -layout` từ PDF gốc, chưa chia thành khái niệm nguyên tử.
> Nằm trong `_inbox/` nên app không đọc, không lên graph.

---

```text
Bluetooth HC-05

• LED trạng thái: Nhấp nháy
  liên tục khi chưa ghép nối;
  nhấp nháy chậm (khoảng 2      1.5 k

  giây/lần) khi đã ghép nối.
• Mức logic: HC-05 hoạt động
  ở mức logic 3.3V / 5V

      RESET

1. Upload hc05_at_config.ino
2. Giữ nút KEY trên HC-05, bật nguồn → LED chậm
3. Serial Monitor: 38400 baud, Both NL & CR
4. AT → OK ✓
5. AT+NAME=TenNhom_Arduino
6. AT+PSWD=1234
7. AT+UART=9600,0,0
8. AT+ROLE=0
9. AT+RESET → quay về Data Mode

   Một số lệnh AT

AT → OK ✓
AT+NAME=TenNhom_Arduino
AT+PSWD=1234
AT+UART=9600,0,0
AT+ROLE=0
AT+RESET → quay về Data Mode

       Practice 4: Bluetooth control

• Refresh  Chọn bluetooth
• Ghi nhận tín hiệu bluetooth từ điện thoại
• Bật / tắt đèn LED
• hoặc hiển thị thông tin trên LCD
```


---

## 📝 Nội dung đọc từ ảnh slide (pdftotext không lấy được)

- **HC-05**: module Bluetooth chuẩn SPP (Serial Port Protocol), giao tiếp qua UART. Tần số 2.4 GHz (ISM), Bluetooth v2.0 + EDR, khoảng cách ~10 m, nguồn 3.3–5 V, **mức logic 3.3 V**. Chip CSR BC417. Chân: EN/KEY · VCC · GND · TXD · RXD · STATE.
- **UART & chéo dây**: TX Arduino → RX HC-05, RX Arduino ← TX HC-05 (crossover). Tín hiệu 5 V từ TX Arduino sẽ hỏng chân RX của module → **cầu chia áp R1 = 1 kΩ, R2 = 2 kΩ** đưa 5 V xuống 3.3 V. **Ngắt TX/RX khi nạp code** cho Arduino.
- **Đọc LED trạng thái**: nháy nhanh 0.1 s = đang tìm thiết bị / sẵn sàng ghép đôi · nháy chậm 2 s bật / 2 s tắt = **AT Command Mode** · sóng thưa 1 lần / 2 s = Data Mode chờ thiết bị đã lưu · nháy kép 2 lần / 1 s = đã kết nối, đang truyền dữ liệu. Mẹo: nhìn LED trước khi gỡ lỗi; không nháy chậm 2 s = chưa vào AT mode.
- **Data Mode vs AT Command Mode**: Data mode mặc định, baud 9600, cầu nối vô hình, bỏ qua mọi lệnh AT và chuyển tiếp nguyên xi. AT mode để cấu hình tên/PIN/baud, **baud cố định 38400**, kích hoạt bằng mức HIGH (3.3 V) vào chân KEY/EN khi cấp nguồn.
- **Vào AT mode**: (1) giữ nút KEY, (2) cấp nguồn boot → LED nháy chậm 2 s, (3) mở Serial Monitor **38400 baud + Both NL & CR**. Quên NL&CR thì module câm hoặc báo lỗi.
- **Lệnh AT**: `AT`→OK · `AT+NAME="Robot_Alpha"` · `AT+PSWD="8888"` (mặc định 1234) · `AT+UART=9600,0,0` (9600, 1 stop bit, no parity) · `AT+ROLE=0` slave / `=1` master · `AT+ORGL` về mặc định · `AT+RESET` khởi động lại, về Data Mode. Mọi lệnh kết thúc bằng CR+LF.
- **Master vs Slave**: Master chủ động quét và yêu cầu ghép nối (tay cầm điều khiển, `AT+ROLE=1`); Slave nằm im phát tên, chờ kết nối — mặc định của HC-05 (`AT+ROLE=0`). Hai HC-05 tự nối với nhau được nếu một master, một slave và master `AT+PAIR` tới MAC của slave.
- **Sơ đồ nối tổng quát**: HC-05 VCC→5V, GND→GND, TX→Pin 10, RX→Pin 11 *qua cầu chia áp*. LCD I2C: GND/VCC→GND/5V, SDA→A4, SCL→A5. Mọi GND nối chung.
- **App Android**: "Arduino Bluetooth Control" → bật Bluetooth, tìm `HC-05`, PIN `1234` hoặc `0000` → mở app chọn thiết bị → Terminal Mode để gửi chữ.
- **Lưu đồ**: khởi tạo LCD & Serial 9600 → có dữ liệu Bluetooth? (`Bluetooth.available()`) → đọc `Bluetooth.read()` → hiển thị lên LCD → lặp.
- **Giao tiếp 2 chiều PC ↔ Arduino**: uplink Arduino gửi `TEMP:27.5` lên PC (Python) hiển thị; downlink người dùng gõ `LED_ON`, Arduino dùng `if` đọc chuỗi và bật đèn. **Bản chất: HC-05 chỉ là "đường ống"; hai thiết bị nói chuyện thuần bằng chuỗi văn bản.**
- **Điều khiển bằng giọng nói**: app Voice Control → Google Voice API chuyển giọng nói thành String → gửi qua Bluetooth → Arduino `if (voice == "Open Light") {...}` → bật relay / hiển thị LCD.
- **Mở rộng Smart Home**: Smartphone ↔ HC-05 ↔ Arduino UNO; relay module điều khiển tải 220 V (đèn bàn); DHT11 đo nhiệt độ gửi ngược về điện thoại (nhận `30°C`). Hai ý: điều khiển tải lớn qua relay · giao tiếp 2 chiều.
- **Bảng gỡ lỗi**: gõ AT mà im lặng → sai baud hoặc đấu ngược TX/RX → kiểm tra chéo dây, thử 9600 / 38400. Lệnh AT trả ký tự lạ / ô vuông → thiếu ký tự ngắt dòng → bật Both NL & CR. Điện thoại không thấy tên → module kẹt ở AT mode → rút chân KEY khỏi 3.3V/5V, `AT+RESET` hoặc rút điện cắm lại.
- **Practice 4**: Refresh → chọn Bluetooth → ghi nhận tín hiệu từ điện thoại → bật/tắt LED hoặc hiển thị lên LCD.
