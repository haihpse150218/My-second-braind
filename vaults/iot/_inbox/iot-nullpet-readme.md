# NullPet

Robot pet để bàn, AI điều khiển qua MCP. Thân robot dựa trên quadruped **Sesame** (Dorian Todd), viết lại firmware theo dạng module để nhận lệnh emoji/hành động từ agent.

> Repo này cũng là project thực hành cho môn **IAD591 – IoT Application Development** (FSB), textbook *Programming the Internet of Things* (Andy King).

---

## Kiến trúc

```
┌────────────────────┐   MCP    ┌──────────────────────┐  MQTT/WiFi  ┌──────────────────────┐
│ AI agent (Claude…) │ ───────▶ │ Gateway (laptop)     │ ──────────▶ │ Device (ESP32-S3)    │
│                    │ ◀─────── │ MCP server + GDA     │ ◀────────── │ CDA: servo/OLED/nút  │
└────────────────────┘          └──────────────────────┘             └──────────────────────┘
                                  loa laptop (audio tạm)
```

Theo mô hình của sách:

| Tầng | Vai trò | Ở NullPet |
|---|---|---|
| **CDA** – Constrained Device App | Đọc input, điều khiển actuator | Firmware ESP32-S3: 8 servo, OLED, 2 nút approve |
| **GDA** – Gateway Device App | Gom dữ liệu, dịch lệnh, cầu nối lên cloud/agent | Service Python trên laptop, expose MCP tools |
| Cloud / Agent | Ra quyết định | LLM agent gọi MCP |

## Phần cứng

| Linh kiện | SL | Ghi chú |
|---|---|---|
| LOLIN S3 Mini (ESP32-S3FH4R2) | 1 | Logic 3.3V, ADC 12-bit |
| MG90S 180° servo | 8 | 2 servo/chân × 4 chân |
| SSD1306 OLED (I2C) | 1 | Mặt pet / emoji |
| Nút nhấn | 2 | Approve / reject hành động của agent |
| Pin 2S Li-ion + mạch hạ áp | 1 | Servo phải có nguồn riêng |
| Audio on-robot | — | Hoãn lại, tạm dùng loa laptop |

### Lưu ý điện (đọc trước khi cắm)

- **Không** cấp nguồn servo từ chân 3V3/5V của board. 8× MG90S có thể kéo dòng vài ampe lúc khởi động/kẹt.
- **Nối chung GND** giữa nguồn servo và ESP32.
- ESP32 dùng logic **3.3V**: module 5V cần chuyển mức.
- ADC của ESP32 là **0–4095 / 3.3V**, không phải 0–1023 / 5V như Arduino Uno trong slide.

## Cấu trúc repo (dự kiến)

```
nullpet/
├── firmware/          # CDA – Arduino/ESP-IDF cho ESP32-S3
│   ├── servo/         # điều khiển pose, gait
│   ├── display/       # SSD1306, bộ emoji
│   ├── input/         # nút + debounce
│   └── net/           # WiFi + MQTT client
├── gateway/           # GDA – Python
│   ├── mcp_server/    # MCP tools: set_emoji, do_action, ask_approval
│   ├── sim/           # actuator giả lập để test khi không có board
│   └── schema/        # định nghĩa message JSON
├── docs/              # sơ đồ mạch, ghi chú môn học
└── README.md
```

## Message schema (bản nháp)

Gateway → Device (`nullpet/<id>/cmd`):

```json
{ "type": "action", "action": "wave", "emoji": "happy", "require_approval": false }
```

Device → Gateway (`nullpet/<id>/event`):

```json
{ "type": "button", "button": "approve", "ts": 1729760000 }
```

## Bắt đầu

### Firmware

1. Cài Arduino IDE + board package **esp32** (Espressif).
2. Thư viện: `ESP32Servo`, `Adafruit_SSD1306`, `Adafruit_GFX`, `PubSubClient`.
3. Chạy `i2c_scanner` để kiểm tra địa chỉ OLED (thường là `0x3C`).
4. Flash `firmware/` và mở Serial Monitor ở `115200`.

### Gateway

```bash
cd gateway
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
# MQTT broker local
docker run -d -p 1883:1883 eclipse-mosquitto
python -m mcp_server --sim   # bỏ --sim khi đã cắm robot thật
```

## Lộ trình (bám theo IAD591)

| Giai đoạn | Môn học | Sách | Mốc NullPet |
|---|---|---|---|
| 1 | Intro IoT, schematic | Ch1 | Sơ đồ nguồn + sơ đồ CDA/GDA |
| 2 | Arduino & C, servo, I2C | — | 1 servo + OLED chạy, nút có debounce |
| 3 | Raspberry Pi & Python | Ch2–4 | Gateway chạy actuator giả lập |
| 4 | Interfacing nâng cao | Ch5 | Chốt message schema |
| 5 | Protocols & connection | Ch6, Ch10 | MQTT nối thông 2 chiều |
| 6 | GUI, DB, dashboard | Ch11 | Dashboard trạng thái pet, log sự kiện |
| 7 | Capstone | Ch12 | Agent → MCP → robot cử động + approve bằng nút |

- [ ] Assignment 1: nhiệt kế điện tử (TinkerCAD, LCD I2C)
- [ ] Sơ đồ nguồn 2S → servo / logic
- [ ] Firmware: 1 servo + OLED emoji
- [ ] Gateway: MCP server + chế độ sim
- [ ] MQTT end-to-end
- [ ] Đủ 8 servo + gait cơ bản

## Tham khảo

- Sesame robot – Dorian Todd (thiết kế thân gốc)
- Andy King, *Programming the Internet of Things*, O'Reilly, 2021
- IAD591 – IoT Application Development, Dr Đoàn Xuân Huy Minh

## Ghi chú học thuật

Theo quy định của môn: bài nộp phải là công sức của người học, tài liệu tham khảo phải dẫn nguồn. Được dùng AI hỗ trợ code nhưng phải hiểu và có đóng góp của bản thân.