---
slug: nullpet
title: NullPet — robot pet để bàn, AI điều khiển qua MCP
type: project
domain: iot
status: learning
period: 2026-10 → nay
stack: [esp32-s3, arduino, mqtt, python, mcp, ssd1306]
repo_path: "D:\\MSA-FPT\\IOT\\Lab-Link"
artifacts: [Readme.md]
tags: [iot, robot, mcp, agent, esp32, do-an]
related: [iot/du-an-esp32-mcp, iot/cda-gda, iot/so-do-nguon-2s, iot/ham-map-va-servo, iot/giao-tiep-i2c]
created: 2026-10-24
---

# 📦 NullPet — robot pet để bàn, AI điều khiển qua MCP

> Robot 4 chân để bàn (thân dựa trên quadruped **Sesame** của Dorian Todd), firmware viết lại theo module, nhận lệnh emoji/hành động từ LLM agent qua MCP — đồng thời là project thực hành môn **IAD591**.

**Môn:** IoT Application Development (IAD591) · **Thời gian:** 2026-10 → nay · **Vai trò:** cá nhân
**Thư mục gốc:** `D:\MSA-FPT\IOT\Lab-Link`
**Repo GitHub:** chưa có
**Quay lại:** [[INDEX|📦 Tất cả project]]

> ⚠️ Đây là **thẻ tham chiếu**, không phải nơi chứa code. Code vẫn nằm ở `repo_path`. Xem `CONVENTIONS.md` §1.

---

## 🎯 Vấn đề

- Một con robot pet biểu cảm được (OLED emoji + cử động 8 servo), **do AI agent điều khiển** nhưng người đứng cạnh phải **phê duyệt được** bằng nút vật lý.
- Ràng buộc: ESP32-S3 logic 3,3 V; 8 servo MG90S ăn dòng lớn; audio trên robot hoãn, tạm dùng loa laptop.
- Problem statement một câu theo [[../vaults/iot/dinh-nghia-he-thong-iot]]: **chưa viết** — việc đầu tiên.

## 🛠️ Cách làm

Bám đúng mô hình textbook Andy King ([[../vaults/iot/cda-gda]]):

| Tầng | Ở NullPet |
|---|---|
| **CDA** | Firmware ESP32-S3 (Arduino/ESP-IDF): `servo/` pose & gait · `display/` SSD1306 emoji · `input/` 2 nút approve/reject · `net/` Wi-Fi + MQTT |
| **GDA** | Service Python trên laptop: `mcp_server/` (tools `set_emoji`, `do_action`, `ask_approval`) · `sim/` actuator giả lập · `schema/` JSON |
| Agent | LLM gọi MCP tool → quyết định hành động |

Kênh CDA ↔ GDA: MQTT, topic `nullpet/<id>/cmd` (xuống, JSON `{type, action, emoji, require_approval}`) và `nullpet/<id>/event` (lên, `{type:"button", button, ts}`).

| Linh kiện | SL | Ghi chú |
|---|---|---|
| LOLIN S3 Mini (ESP32-S3FH4R2) | 1 | logic 3,3 V, ADC 12-bit |
| MG90S 180° | 8 | 2 servo/chân × 4 chân |
| SSD1306 OLED I2C | 1 | mặt pet |
| Nút nhấn | 2 | approve / reject |
| Pin 2S Li-ion + buck | 1 | sơ đồ ở [[../vaults/iot/so-do-nguon-2s]] |

## 📊 Kết quả
| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| Trạng thái | 🟡 README + kiến trúc | chưa có firmware |

## 💡 Bài học

- Nút approve/reject trên thân robot = *system trigger* ở tầng Edge, là lớp an toàn vật lý cho lệnh của LLM — ý này dùng được cho mọi hệ agent điều khiển phần cứng.
- Có `sim/` giả lập actuator ngay từ đầu = kiểu *integrated simulated deployment* của sách: viết và test GDA không cần board.

## 🔗 Khái niệm đã dùng

- [[../vaults/iot/du-an-esp32-mcp]] — ánh xạ CDA/GDA/agent vào phần cứng
- [[../vaults/iot/edge-tier-cloud-tier]] — vì sao trigger khẩn cấp phải nằm trên ESP32
- [[../vaults/iot/so-do-nguon-2s]] — nguồn 2S cho 8 servo + logic
- [[../vaults/iot/ham-map-va-servo]] — PWM 50 Hz, `constrain()` góc
- [[../vaults/iot/giao-tiep-i2c]] — OLED SSD1306 qua SDA/SCL
- [[../vaults/iot/giao-tiep-hai-chieu-bang-chuoi]] — tiền thân của schema JSON qua MQTT
- [[../vaults/nckh/SECOND_BRAIN_NCKH|nckh nhóm F]] — tool-use / function calling

## 📁 Sản phẩm
| Loại | Đường dẫn |
|---|---|
| README kiến trúc | `D:\MSA-FPT\IOT\Lab-Link\Readme.md` |
| Firmware | `D:\MSA-FPT\IOT\Lab-Link\firmware\` *(dự kiến)* |
| Gateway | `D:\MSA-FPT\IOT\Lab-Link\gateway\` *(dự kiến)* |
| Sơ đồ nguồn | `D:\MSA-FPT\Second-brain\vaults\iot\so-do-nguon-2s.png` |
