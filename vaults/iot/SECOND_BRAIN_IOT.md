# 🧠 Second Brain — IoT Application Development (IAD591)

> Trang trung tâm (Map of Content) cho môn Phát triển ứng dụng IoT.

**Cập nhật lần cuối:** 2026-10-25
**Trạng thái:** 🌱 Đang học — Part 1 (Session 1–6) + textbook ch. 1 + bài vẽ nguồn 2S: **33 atomic note**, nhánh A–D và H. Nhánh E–G chờ bài giảng.
**Nguồn:** `D:\MSA-FPT\IOT` — syllabus + 2 bộ slide Part 1 + textbook *Programming the Internet of Things* (Andy King, O'Reilly 2021, 420 trang)
**Giảng viên:** TS. Đoàn Xuân Huy Minh · **Đánh giá:** 3 bài tập × 15% · thuyết trình 15% · project 40% · qua môn ≥ 5/10
**Quay lại:** [[../../hub/MASTER|🏠 MASTER]]

> 🎯 **Kim chỉ nam:** IoT là một **vòng kín** — cảm biến đo → dữ liệu đi qua mạng → xử lý → chấp hành tác động lại thế giới. Môn này đi **từ dưới lên theo đúng đường dữ liệu**: mạch điện → Arduino → không dây → Raspberry Pi → web/database → MQTT → cloud. Ở mỗi tầng, câu hỏi luôn là: *dữ liệu đang ở dạng gì, và ai đọc nó?*

---

## 🧭 Lộ trình đọc

> Nhánh bám theo 3 Part của giảng viên. `` `slug` `` (backtick) = **chưa viết**, `[[slug]]` = đã có note.

### Part 1 · Nhúng & Arduino (Session 1–6) — ✅ đã chưng cất

**Nhánh A · Tổng quan IoT & hệ thống nhúng (S1)**
1. [[iot-la-gi]] — vòng kín đo → mạng → xử lý → tác động; 6 miền ứng dụng
2. [[he-thong-nhung]] — hệ chuyên dụng chạy **một chương trình mãi mãi**; vi điều khiển ≠ vi xử lý
3. [[bon-thanh-phan-iot]] — Sensors/Actuators · Connectivity · Processing · UI — **checklist thiết kế** của cả môn
4. [[cam-bien]] — đại lượng vật lý → tín hiệu điện; analog hay digital quyết định code
   → 🌉 [[ivp/cam-bien-anh]] — camera cũng là cảm biến
5. [[co-cau-chap-hanh]] — LED · motor · servo · relay; chân Arduino chỉ là "ngón tay bấm công tắc"
6. [[co-cau-doi-huong-chuyen-dong]] — servo chỉ cho **xoay**; tịnh tiến · lắc · đổi trục · co rút · từng nấc đều phải qua cơ cấu cơ khí; sổ tay 30+ cơ cấu áp cho NullPet. ⚠️ SG90 là servo **vị trí**, không quay tròn như quạt

**Nhánh B · Điện tử cơ bản & sơ đồ mạch (S1–S2)**
1. [[dinh-luat-ohm]] — `R = (V_nguồn − V_LED)/I` → 150 Ω cho LED; công thức dùng lại ở cầu chia áp
2. [[mach-noi-tiep-song-song]] — chung dòng/chia áp vs chung áp/chia dòng
3. [[so-do-nguyen-ly]] — schematic ≠ breadboard; TinkerCAD mô phỏng trước khi mua linh kiện
4. [[diode-anode-cathode]] — **anode = dương, cathode = âm**; dòng đi A → K; LED chân dài là A; ⚠️ pin đang xả thì ngược
5. [[so-do-nguon-2s]] — pin 2S 6–8,4 V → buck 5 V cho servo + buck riêng cho ESP32; GND chung; diode chống ngược; chia áp đo pin 🖼️

**Nhánh C · Arduino & C (S3–S6)**
1. [[arduino-la-gi]] — board + IDE + shield + cộng đồng; thông số Uno Rev3
2. [[arduino-toolchain]] — combine → compile → link → hex → upload; Verify vs Upload
3. [[sketch-setup-loop]] — `setup()` một lần, `loop()` mãi mãi; Blink; ⚠️ `delay()` chặn tất cả
4. [[chan-digital-vs-analog]] — HIGH/LOW vs 0…1023; PWM không phải điện áp thật
5. [[adc-analogread]] — `V = raw × 5 / 1023`; 2,5 V → 512; **lấy mẫu + lượng tử hoá**
   → 🌉 [[dsp/tin-hieu-roi-rac]] · [[dsp/dinh-ly-lay-mau]] · [[ivp/luong-tu-hoa-anh]]
6. [[uart-serial-monitor]] — không clock → phải khớp baud; `available()` trước `read()`; công cụ debug duy nhất
7. [[ham-map-va-servo]] — `map(0..1023 → 0..180)`; servo theo **vị trí**, không theo tốc độ
8. [[giao-tiep-i2c]] — SDA/SCL (A4/A5), địa chỉ 7-bit; **quét `i2c_scanner` trước**
9. [[lcd-1602-i2c]] — 16×2 ô ký tự; `init · backlight · setCursor · print · clear`
10. [[nhiet-ke-lm35]] — **Bài tập 1** ✅ làm xong trên mạch thật: 10 mV/°C → LCD, đèn + còi nhấp nháy > 25 °C; nhật ký 6 lỗi (A5 đụng I2C · 293 °C · còi thụ động cần `tone()` · ký tự lạ · `millis()`)

**Nhánh D · Giao tiếp không dây — Bluetooth HC-05 (S6)**
1. [[bluetooth-hc-05]] — SPP = **cáp serial không dây**; mức logic 3,3 V; 6 chân
2. [[uart-crossover-va-chia-ap]] — TX→RX chéo; cầu 1 kΩ/2 kΩ hạ 5 V → 3,3 V **chỉ một chiều**
3. [[hc05-data-mode-vs-at-mode]] — 9600 ống nước vs 38400 van bảo trì; giữ KEY lúc cấp nguồn; **Both NL & CR**
4. [[hc05-lenh-at]] — 7 lệnh: `AT · NAME · PSWD · UART · ROLE · ORGL · RESET`
5. [[hc05-led-trang-thai]] — nhanh / chậm 2 s / thưa / kép — nhìn LED trước khi gõ lệnh
6. [[bluetooth-master-slave]] — ai gọi, ai chờ; điện thoại = Master; nối 2 Arduino bằng `BIND`
7. [[giao-tiep-hai-chieu-bang-chuoi]] — `TEMP:27.5` lên / `LED_ON` xuống; **"giao thức" là chuỗi tự đặt** — tiền thân của MQTT
8. [[go-loi-hc05]] — im lặng / ký tự lạ / không thấy tên → dây / NL&CR / kẹt AT mode

### Part 2 · Pi · Linux · Web · Database (Session 7–19) — ⬜ chờ bài giảng

**Nhánh E · Raspberry Pi · Linux · Python (S14–S19)**
1. `raspberry-pi-la-gi` — vi xử lý + hệ điều hành; khi nào thay Arduino
2. `linux-co-ban` — shell, quyền, service
3. `gpio-python` — `RPi.GPIO` / `gpiozero`
4. `lap-trinh-c-tren-linux` — gcc, make
5. `sense-hat-emulator` — textbook ch. 4: giả lập cảm biến khi không có phần cứng

**Nhánh F · Giao diện & dữ liệu — Web · MySQL · MongoDB (S7–S13)**
1. `giao-dien-iot` — từ LCD lên web dashboard
2. `web-front-end` — HTML · CSS · JavaScript
3. `web-backend` — JavaScript (Node) · PHP; REST API nhận dữ liệu cảm biến
4. `co-so-du-lieu-iot` — time-series, lưu gì, giữ bao lâu
5. `mysql-vs-mongodb` — bảng vs document cho dữ liệu cảm biến

### Part 3 · Giao thức · Cloud · Project (Session 20–30) — ⬜ chờ bài giảng

**Nhánh G · Giao thức IoT — MQTT · CoAP · Pub/Sub (S25–S27)**
1. `mqtt` — broker · topic · publish/subscribe · QoS 0/1/2 (textbook ch. 6–7)
2. `coap` — REST cho thiết bị ràng buộc, UDP, OBSERVE (textbook ch. 8–9)
3. `pub-sub` — mô hình nhắn tin tách rời producer/consumer
4. `tls-dtls-cho-iot` — bảo mật kênh (textbook ch. 10)
5. `android-app-iot` — S20–S22, điều khiển từ mobile

**Nhánh H · Kiến trúc device → edge → cloud (textbook Andy King)** — 🟡 ch. 1 xong 2026-10-24
1. [[dinh-nghia-he-thong-iot]] — problem statement 1 câu → **Measure · Model · Manage** → 5 nhóm hành động
2. [[edge-tier-cloud-tier]] — Edge phải ở cạnh vật lý, Cloud ở đâu cũng được; 5 nhóm **cố ý trùng** ở hai tầng; quyết định khẩn cấp làm tại chỗ
3. [[cda-gda]] — CDA = data collection + triggers; GDA = data mgmt + config + analytics, cửa duy nhất ra cloud; RFC 7228 Class 2; 3 kiểu triển khai
4. [[du-an-esp32-mcp]] — **dự án của mình**: ESP32-S3 = CDA · laptop MCP server = GDA · LLM = analytics; *separated physical*
5. `data-simulation-emulation` — ch. 3–4: sinh dữ liệu giả để phát triển không cần phần cứng
6. `hysteresis-threshold` — ch. 3–4: chống nhấp nháy quanh ngưỡng — đã đụng ở [[nhiet-ke-lm35]]
7. `cloud-iot-ubidots-aws` — ch. 11: Ubidots · AWS IoT Core qua MQTT
8. `ba-use-case-iot` — ch. 12: home monitoring · garden · pond

---

## 💡 Ba điều rút ra sau Part 1

**1. Mọi thứ là chuỗi byte qua UART.** Serial Monitor, HC-05, lệnh AT, `TEMP:27.5` — cùng một ống. Hiểu [[uart-serial-monitor]] là hiểu 80% nhánh D; MQTT ở nhánh G chỉ là phiên bản có broker và topic của [[giao-tiep-hai-chieu-bang-chuoi]].

**2. ADC là chỗ DSP và IoT chạm nhau.** `analogRead` vừa **lấy mẫu** (`delay()` quyết định `f_s`) vừa **lượng tử hoá** (10-bit). Hai bài học của DSP — aliasing không sửa được, bậc lượng tử quyết định độ phân giải — áp thẳng vào [[adc-analogread]] và [[nhiet-ke-lm35]].

**3. Hỏng theo tầng, sửa theo tầng.** Điện → dây → baud → ký tự kết dòng → mode. [[go-loi-hc05]] là ma trận, nhưng tư duy đó dùng cho mọi module UART sau này (ESP8266, SIM800, GPS).

---

## 📥 Inbox — note thô

| File | Trạng thái |
|---|---|
| `_inbox/iot-syllabus-iad591.md` | ✅ dùng cho khung nhánh E–H và phần đánh giá ở đầu hub |
| `_inbox/iot-slide-part1-arduino.md` | ✅ chưng cất → nhánh A, B, C (18 note) |
| `_inbox/iot-slide-part1-2-bluetooth.md` | ✅ chưng cất → nhánh D (8 note); slide dạng ảnh, đã chép tay nội dung |
| `_inbox/iot-textbook-andy-king-muc-luc.md` | ⬜ mới có mục lục; nội dung chương trích dần khi học tới nhánh G, H |

**Chưa có nguồn** (chờ slide Part 2, Part 3 của giảng viên): toàn bộ nhánh E–H ở trên.

## ❓ Câu hỏi mở

- Với project cuối kỳ (40%), nên ở lại Uno + HC-05 + Pi làm gateway, hay chuyển ESP32 có Wi-Fi để đi thẳng MQTT?
- Textbook dùng Python (CDA) + Java (GDA); môn dùng C (Arduino) + Python (Pi). Ánh xạ CDA ↔ Arduino, GDA ↔ Raspberry Pi có đúng không?
- Hysteresis ở [[nhiet-ke-lm35]] là xử lý ở thiết bị. Khi lên cloud, ngưỡng nên nằm ở đâu — thiết bị, gateway, hay cloud?

## 📑 Slide gốc

> Giảng viên: TS. Đoàn Xuân Huy Minh · Thư mục: `D:\MSA-FPT\IOT\material\` · mới có Part 1 · ✅ = đã chưng cất thành note

| # | Slide | Trang | Đã học | Nhánh |
|---|---|---:|---|---|
| — | [Syllabus IAD591](<D:\MSA-FPT\IOT\Syllabus_IAD591.22_260303.pdf_1773288514.pdf>) | 7 | ✅ | khung 8 nhánh A–H, đánh giá |
| P1 | [IAD_MSA33_Part_1.pdf](<D:\MSA-FPT\IOT\material\IAD_MSA33_Part_1.pdf>) | 62 | ✅ | A · B · C — Session 1–6, Arduino |
| P1.2 | [IAD_MSA33_Part_1_2.pdf](<D:\MSA-FPT\IOT\material\IAD_MSA33_Part_1_2.pdf>) | 19 | ✅ | D — Bluetooth HC-05 (slide dạng ảnh, đã chép tay vào inbox) |
| P2 | *chưa có* | | ⬜ | E · F — Pi · Linux · Web · DB (S7–S19) |
| P3 | *chưa có* | | ⬜ | G — MQTT · cloud · Android (S20–S30) |
| 📘 | [Programming the Internet of Things — Andy King](<D:\MSA-FPT\IOT\material\IAD_programming-the-internet-of-things-an-introduction-to-building-integrated-device-to-cloud-iot-solutions-1nbsped-1492081418-9781492081418.pdf>) | 420 | 🟡 mục lục | G · H — textbook chính, trích theo chương khi học tới |

## 🔗 Tài nguyên khác

| Tài nguyên | Mô tả |
|---|---|
| https://www.tinkercad.com | Mô phỏng mạch + Arduino |
| https://www.arduino.cc · https://www.raspberrypi.org · http://mqtt.org | Link chính thức trong syllabus |

## 🔗 Quy ước liên kết

- `[[slug]]` — note cùng vault · `[[dsp/tin-hieu-roi-rac]]` — note vault khác (xem `CONVENTIONS.md` §6)
- Trạng thái: ⬜ Chưa học · 🟡 Đang học · ✅ Đã nắm · 🔁 Cần ôn
