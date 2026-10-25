---
slug: du-an-esp32-mcp
title: Dự án của mình — ESP32-S3 là CDA, laptop chạy MCP là GDA
vault: iot
type: concept
branch: H
order: 4
status: learning
tags: [iot, kien-truc, du-an, esp32, mcp]
prev: [cda-gda]
next: []
related: [dinh-nghia-he-thong-iot, edge-tier-cloud-tier, so-do-nguon-2s, ham-map-va-servo, arduino-la-gi]
sources: ["Programming the Internet of Things — Andy King, ch. 1", "Ghi chú buổi học 2026-10-24"]
created: 2026-10-24
---

# Dự án của mình — ESP32-S3 là CDA, laptop chạy MCP là GDA

> Tóm tắt 1 câu: ánh xạ kiến trúc textbook vào phần cứng có sẵn — **ESP32-S3 = thiết bị ràng buộc (chạy CDA)**, **laptop chạy MCP server = gateway (chạy GDA)**, và LLM gọi tool qua MCP đóng vai *analytics / người ra quyết định* — đây là kiểu triển khai *separated physical* của sách.

**Dự án cụ thể:** **NullPet** — robot pet để bàn 4 chân (thân dựa trên quadruped *Sesame* của Dorian Todd), AI điều khiển qua MCP. Repo: `D:\MSA-FPT\IOT\Lab-Link` · thẻ project [[../../projects/nullpet]].

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh H · #4 ← cần [[cda-gda]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #kien-truc #du-an #esp32 #mcp

---

## 💡 Ánh xạ

| Textbook | NullPet | Nhóm hành động | Ghi chú |
|---|---|---|---|
| Constrained device + **CDA** | **LOLIN S3 Mini** (ESP32-S3FH4R2) — firmware Arduino/ESP-IDF: 8 servo, OLED, 2 nút | data collection · system triggers | Class 2+ theo RFC 7228: Wi-Fi, BLE, USB — đủ chạy IP stack, nhưng vẫn giữ nó **ngu**: nhận lệnh pose/emoji, báo nút bấm |
| Gateway device + **GDA** | **Laptop chạy service Python + MCP server** | data management · configuration management · analytics sơ bộ | MCP tools: `set_emoji`, `do_action`, `ask_approval`; có `sim/` giả lập actuator để test không cần board — đúng kiểu *integrated simulated* của sách |
| Cloud services | **LLM agent** (client của MCP) | analytics · quyết định | Về *vị trí* nó ở laptop (Edge), về *vai trò* nó là Cloud Tier: không chạm actuator, chỉ ra lệnh qua GDA |
| Kênh CDA ↔ GDA | **MQTT qua Wi-Fi**, JSON | | topic `nullpet/<id>/cmd` (xuống) · `nullpet/<id>/event` (lên) — bản JSON của [[giao-tiep-hai-chieu-bang-chuoi]] |

```
[2 nút approve/reject] → ESP32-S3 (CDA) ──MQTT event──► laptop: MCP server (GDA) ◄──tool call──► LLM agent
[8 servo · OLED emoji] ◄ ESP32-S3 (CDA) ◄──MQTT cmd────  dịch lệnh · lưu · giả lập            "vẫy tay, mặt vui"
```

Hai nút **approve/reject trên thân robot** là *system trigger* ở đúng tầng Edge: người đứng cạnh robot phê duyệt hành động của agent mà không qua màn hình nào — một lớp an toàn vật lý cho LLM.

## 🧩 Vì sao chia như vậy

- **ESP32 không nối thẳng LLM/cloud** dù có Wi-Fi — đúng nguyên tắc sách: thiết bị ràng buộc đi qua gateway ([[cda-gda]]). GDA là chỗ kiểm soát: LLM gọi `set_servo(90)` thì GDA kiểm tra dải cho phép trước khi chuyển xuống.
- **Trigger khẩn cấp nằm ở ESP32**, không chờ LLM: `if (T > 40) servo.write(0)` chạy tại chỗ ([[edge-tier-cloud-tier]]). LLM chậm (giây), ESP32 nhanh (mili giây).
- **MCP server = configuration management**: ngưỡng, dải servo, tần suất đo sống ở đây dưới dạng tool/resource, LLM đọc và đề xuất đổi, người duyệt.

## ⚙️ Điểm khác Arduino Uno phải nhớ

| | Uno (môn dạy) | ESP32-S3 (mình dùng) |
|---|---|---|
| Mức logic | 5 V | **3,3 V** — GPIO không chịu 5 V |
| ADC | 10-bit, 0–5 V | **12-bit**, 0–3,3 V (thực tế tuyến tính tốt ~0,1–2,5 V) |
| PWM servo | thư viện `Servo` | `ESP32Servo` / LEDC 50 Hz |
| Nguồn | USB 5 V | USB-C 5 V → LDO 3,3 V trên board; **không** cấp 7,4 V thẳng vào |
| Mạng | không | Wi-Fi + BLE tích hợp — thay HC-05 |

Nguồn cho cả bộ ESP32 + servo từ pin 2S: [[so-do-nguon-2s]].

## ⚠️ Điều dễ nhầm

- Để LLM gọi thẳng actuator không qua kiểm tra: một câu trả lời "ảo giác" có thể quay servo quá giới hạn. GDA phải `constrain()` mọi lệnh — cùng bài học với [[ham-map-va-servo]].
- Coi MCP là "giao thức IoT": nó là giao thức **LLM ↔ tool**, không phải thiết bị ↔ gateway. Kênh ESP32 ↔ laptop vẫn cần serial/MQTT riêng.
- Nuôi servo từ chân 3,3 V/5 V của ESP32 board → brownout, reset giữa chừng; xem [[so-do-nguon-2s]].

---

## 🔗 Liên kết
- **Tiền đề:** [[cda-gda]] · [[dinh-nghia-he-thong-iot]]
- **Liên quan:** [[so-do-nguon-2s]] · [[ham-map-va-servo]] · [[arduino-la-gi]]
- **Liên môn:** [[nckh/SECOND_BRAIN_NCKH|nckh]] — MCP/tool-use là đúng chủ đề nhóm F (*Tool-Use & Function Calling*) của đề tài

## ❓ Câu hỏi mở
- Problem statement một câu của NullPet là gì? README mới có kiến trúc, chưa có câu *what/why* — làm theo [[dinh-nghia-he-thong-iot]] trước khi viết firmware.
- 8 servo MG90S kẹt cùng lúc có thể hút > 5 A — UBEC cỡ nào, và có nên chia 2 rail cho 2 cặp chân? → [[so-do-nguon-2s]]
- Audio on-robot hoãn, tạm dùng loa laptop: nghĩa là một phần "actuator" nằm ở GDA — có phá vỡ mô hình CDA/GDA không?

## 📚 Nguồn
- Andy King, *Programming the Internet of Things*, ch. 1 (ba kiểu triển khai, tr. 12–13)
- `D:\MSA-FPT\IOT\Lab-Link\Readme.md` — kiến trúc, phần cứng, schema message của NullPet
- Ghi chú buổi học 2026-10-24
