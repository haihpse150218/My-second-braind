---
slug: hc05-data-mode-vs-at-mode
title: HC-05 — Data Mode và AT Command Mode
vault: iot
type: concept
branch: D
order: 3
status: learning
tags: [iot, bluetooth, cau-hinh]
prev: [uart-crossover-va-chia-ap]
next: [hc05-sketch-cau-noi-at]
related: [hc05-led-trang-thai, uart-serial-monitor, go-loi-hc05]
sources: ["IAD_MSA33_Part_1_2.pdf"]
created: 2026-10-24
---

# HC-05 — Data Mode và AT Command Mode

> Tóm tắt 1 câu: HC-05 có hai "nhân cách": **Data Mode** (mặc định, 9600 baud, chuyển tiếp mù mọi byte) và **AT Command Mode** (38400 baud, nghe lệnh cấu hình) — vào AT mode bằng cách **giữ KEY khi cấp nguồn**.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #3 ← cần [[uart-crossover-va-chia-ap]] · → kế tiếp [[hc05-sketch-cau-noi-at]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #bluetooth #cau-hinh

---

## 💡 Ma trận chế độ

| | **Data Mode** (vận hành) | **AT Command Mode** (cấu hình) |
|---|---|---|
| Mục đích | cầu nối vô hình, truyền dữ liệu tới thiết bị đã ghép đôi | nói chuyện với chip để đổi tên, PIN, baud, role |
| Baud | mặc định **9600** (đổi được bằng `AT+UART`) | **cố định 38400** |
| Gặp chữ `AT` | **bỏ qua**, chuyển tiếp nguyên xi sang bên kia | thực thi, trả `OK` |
| Kích hoạt | mặc định khi cấp nguồn | chân **KEY/EN ở mức HIGH (3,3 V) lúc cấp nguồn** |
| LED | nháy nhanh / thưa / kép ([[hc05-led-trang-thai]]) | **nháy chậm 2 s bật / 2 s tắt** |

## ⚙️ Quy trình vào AT mode (3 bước slide)

1. **Giữ nút KEY** trên module (hoặc nối chân KEY/EN lên 3,3 V).
2. **Cấp nguồn** (cắm USB) trong khi vẫn giữ → LED chuyển nháy chậm 2 s/lần → thả nút được.
3. **Mở Serial Monitor**: baud **38400**, chế độ kết dòng **Both NL & CR**.
4. Gõ `AT` → phải thấy `OK`. Từ đây dùng [[hc05-lenh-at]].
5. Xong: `AT+RESET` (hoặc rút điện cắm lại, không giữ KEY) → về Data Mode.

Trên Arduino cần một sketch "cầu nối" chuyển byte giữa Serial USB và SoftwareSerial (slide: `hc05_at_config.ino`), vì PC không nối thẳng vào HC-05 → code đã sửa và 4 lỗi của bản phát tay: [[hc05-sketch-cau-noi-at]].

## 🧩 Trực giác

Data Mode là **ống nước**: nước (byte) chảy qua, ống không đọc. AT Mode là **van bảo trì**: tạm khoá dòng chảy để chỉnh ống. Không thể vừa chảy vừa chỉnh, nên **điện thoại không tìm thấy module khi nó đang ở AT mode** — một triệu chứng kinh điển trong [[go-loi-hc05]].

## ⚠️ Điều dễ nhầm

- **Quên Both NL & CR** → module nhận `AT` không có ký tự kết thúc, chờ mãi, "câm" hoặc trả `ERROR`. Slide in đậm cảnh báo này.
- Giữ KEY **sau khi** đã cấp nguồn: một số phiên bản vào "mini AT mode" ở 9600 với tập lệnh thiếu. Phải giữ **trước và trong lúc** cấp nguồn.
- Đổi baud bằng `AT+UART=115200,0,0` rồi quên: Data Mode giờ chạy 115200, code `bt.begin(9600)` nhận rác. Baud AT mode vẫn là 38400 bất kể.
- Module **không tự thoát** AT mode nếu chân KEY vẫn được nối 3,3 V — rút nó ra.

---

## 🔗 Liên kết
- **Tiền đề:** [[uart-crossover-va-chia-ap]] · [[uart-serial-monitor]]
- **Dẫn tới:** [[hc05-sketch-cau-noi-at]] — code cầu nối đã sửa · [[hc05-lenh-at]] · [[hc05-led-trang-thai]]
- **Liên quan:** [[go-loi-hc05]]

## ❓ Câu hỏi mở
- Có thể để Arduino tự chuyển module vào AT mode bằng cách điều khiển chân EN từ một chân digital, rồi tự cấu hình lúc khởi động không?

## 📚 Nguồn
- Slide Part 1.2 — *Ma trận chế độ: Data Mode vs AT Command Mode*, *Quy trình mở khoá: cách vào AT Command Mode*, *RESET*
