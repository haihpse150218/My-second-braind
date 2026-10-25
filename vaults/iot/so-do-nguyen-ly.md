---
slug: so-do-nguyen-ly
title: Sơ đồ nguyên lý và mô phỏng trên TinkerCAD
vault: iot
type: concept
branch: B
order: 3
status: learning
tags: [iot, dien-tu, cong-cu]
prev: [mach-noi-tiep-song-song]
next: [diode-anode-cathode, arduino-la-gi]
related: [dinh-luat-ohm, sketch-setup-loop]
sources: ["IAD_MSA33_Part_1.pdf"]
created: 2026-10-24
---

# Sơ đồ nguyên lý và mô phỏng trên TinkerCAD

> Tóm tắt 1 câu: sơ đồ nguyên lý (schematic) vẽ **kết nối điện**, không vẽ vị trí vật lý — và TinkerCAD cho phép vẽ, cắm, nạp code và chạy thử mà **chưa cần mua linh kiện**.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B · #3 ← cần [[mach-noi-tiep-song-song]] · → kế tiếp [[diode-anode-cathode]] · [[arduino-la-gi]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #dien-tu #cong-cu

---

## 💡 Ý chính

Ba cách biểu diễn cùng một mạch, dùng ở ba lúc khác nhau:

| Biểu diễn | Cho thấy | Khi nào |
|---|---|---|
| **Schematic** (sơ đồ nguyên lý) | ký hiệu linh kiện + đường nối điện | thiết kế, tính toán Ohm |
| **Breadboard view** (Fritzing/TinkerCAD) | linh kiện cắm trên board, dây màu | lắp ráp thực tế |
| **Code** | hành vi | sau khi mạch đúng |

Bài trên lớp: *vẽ sơ đồ mạch LED với điện trở bằng tay hoặc trên TinkerCAD* — nguồn 5 V → điện trở 150 Ω → LED → GND, giá trị lấy từ [[dinh-luat-ohm]].

## 🧩 Trực giác

Schematic giống bản đồ tàu điện ngầm: chỉ quan tâm **ga nào nối ga nào**, không quan tâm đường ray thật uốn thế nào. Hai dây cùng chạm một nút trên schematic = cùng điện thế, bất kể trên board chúng nằm đâu.

## ⚙️ Quy trình làm việc với TinkerCAD (tinkercad.com → Circuits)

1. Kéo Arduino Uno, breadboard, linh kiện vào canvas.
2. Nối dây; đặt trị số điện trở bằng cách click vào nó.
3. Tab *Code* → viết sketch (hoặc dùng block) → *Start Simulation*.
4. Serial Monitor có sẵn trong mô phỏng → kiểm tra [[uart-serial-monitor]] không cần phần cứng.
5. Các bài thực hành trên lớp lấy từ **Tinker sample**: *LED Blink with pushButton*, *Photoresistor → Serial Monitor*, *Analog Control Servo*, *Arduino Datalogger*.

## ⚠️ Điều dễ nhầm

- Mô phỏng chạy ≠ phần cứng chạy: TinkerCAD không mô phỏng nhiễu, sụt áp dây dài, hay mức logic 3.3 V/5 V của module ngoài (HC-05 không có trong TinkerCAD).
- Breadboard: hai hàng dọc mép là **rail nguồn**, các cột 5 lỗ ở giữa **nối với nhau theo hàng ngang**, rãnh giữa ngắt đôi. Cắm nhầm rail là ngắn mạch.

---

## 🔗 Liên kết
- **Tiền đề:** [[mach-noi-tiep-song-song]] · [[dinh-luat-ohm]]
- **Dẫn tới:** [[arduino-la-gi]] · [[sketch-setup-loop]]

## ❓ Câu hỏi mở
- Có nên vẽ schematic trước cho cả bài tập nhỏ, hay chỉ với mạch > 5 linh kiện?

## 📚 Nguồn
- Slide Part 1 — *Schematic (SĐ nguyên lý)*, *TinkerCad.com*, các slide *Practice 1–2*
