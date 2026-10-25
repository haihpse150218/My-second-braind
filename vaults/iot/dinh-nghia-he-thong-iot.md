---
slug: dinh-nghia-he-thong-iot
title: Định nghĩa hệ thống IoT — Measure · Model · Manage và 5 nhóm hành động
vault: iot
type: concept
branch: H
order: 1
status: learning
tags: [iot, kien-truc, textbook, thiet-ke]
prev: [bon-thanh-phan-iot]
next: [edge-tier-cloud-tier]
related: [iot-la-gi, du-an-esp32-mcp]
sources: ["Programming the Internet of Things — Andy King, ch. 1 Defining Your System"]
created: 2026-10-24
---

# Định nghĩa hệ thống IoT — Measure · Model · Manage và 5 nhóm hành động

> Tóm tắt 1 câu: trước khi chạm phần cứng, viết **một câu problem statement**, tách nó thành *what · why · how*, rồi quy mọi việc về **3 động từ** (Measure · Model · Manage) và **5 nhóm hành động** — đó là bộ khung thiết kế dùng lại được cho mọi dự án IoT.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh H · #1 ← cần [[bon-thanh-phan-iot]] · → kế tiếp [[edge-tier-cloud-tier]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #kien-truc #textbook #thiet-ke

---

## 💡 Ý chính

Andy King mở sách bằng 5 câu hỏi: *Giải bài toán gì? Bắt đầu và kết thúc ở đâu? Vì sao cần IoT? Các mảnh ghép phối hợp thế nào? Kết quả mong đợi là gì?* — rồi ép tất cả vào một câu:

> *"Tôi muốn hiểu môi trường trong nhà, nó thay đổi ra sao theo thời gian, và điều chỉnh để thoải mái hơn mà tiết kiệm tiền."*

Câu đó được mổ thành **what** (làm gì) và **why** (để được gì), mỗi ý sinh ra một **nhóm hành động** có tên — tên đó sẽ thành tên module trong code.

### What — 3 động từ

| Động từ | Nghĩa | Chuyển đổi | Nhóm hành động |
|---|---|---|---|
| **Measure** | thu dữ liệu từ cảm biến (nhiệt, ẩm, áp suất, hiệu năng CPU/RAM) | → *data* (telemetry) | **data collection** |
| **Model** | lưu chuỗi thời gian, so với baseline, xem thay đổi nào đáng kể | data → *information* | **data management** |
| **Manage** | vượt ngưỡng thì gửi tín hiệu để hành động | information → *knowledge* | **system triggers** |

### Why — 2 kết quả

| Kết quả | Nhóm hành động |
|---|---|
| Tăng thoải mái — giữ nhiệt/ẩm ổn định theo từng phòng | **configuration management** (dải "bình thường" là bao nhiêu) |
| Tiết kiệm tiền — tối ưu không thừa không thiếu, tính cả giá điện, mùa | **analytics** |

**5 nhóm:** data collection · data management · system triggers · configuration management · analytics. Hầu hết hệ IoT cần ít nhất vài nhóm trong số này; chương sau sẽ xếp từng nhóm vào tầng edge hay cloud ([[edge-tier-cloud-tier]]).

## 🧩 Trực giác

Đây chính là [[bon-thanh-phan-iot]] nhìn từ phía **phần mềm**: slide môn học nói về *khối phần cứng* (cảm biến, kết nối, xử lý, giao diện); textbook nói về *loại công việc* phần mềm phải làm. Measure ↔ Sensors, Manage ↔ Actuators, Model/Analytics ↔ Data Processing.

Bài tập [[nhiet-ke-lm35]] theo khung này: **Measure** LM35 → **Model** so với 25 °C → **Manage** bật LED. Cấu hình "25 °C" là *configuration management* nhưng đang hard-code; *analytics* chưa có.

## ⚙️ Khi nào dùng

- Đầu mọi dự án, kể cả project cuối kỳ: viết problem statement **một câu**, kiểm tra xem đã trả lời được 5 câu hỏi chưa, rồi liệt kê 5 nhóm hành động — ô nào trống là ô chưa thiết kế. Áp dụng cho [[du-an-esp32-mcp]].

## ⚠️ Điều dễ nhầm

- Bắt đầu từ linh kiện ("mình có ESP32 và servo") thay vì từ bài toán. Textbook cố ý để chương phần cứng ở Part II.
- Gộp "data management" với "analytics": cái trước là **lưu và so baseline**, cái sau là **tối ưu/dự đoán** có yếu tố ngoài (giá điện, mùa).
- Problem statement quá rộng ("smart home") → không chốt được *ngưỡng* và *hành động*; cần hẹp tới mức nêu được cảm biến và actuator cụ thể.

---

## 🔗 Liên kết
- **Tiền đề:** [[bon-thanh-phan-iot]] · [[iot-la-gi]]
- **Dẫn tới:** [[edge-tier-cloud-tier]] · [[cda-gda]]
- **Liên quan:** [[du-an-esp32-mcp]] — áp khung này vào dự án của mình

## ❓ Câu hỏi mở
- Với project chỉ có một thiết bị, *configuration management* có đáng tách thành module riêng, hay chỉ là một file JSON?

## 📚 Nguồn
- Andy King, *Programming the Internet of Things*, ch. 1 §*Defining Your System* (tr. 4–7), hình 1-1
