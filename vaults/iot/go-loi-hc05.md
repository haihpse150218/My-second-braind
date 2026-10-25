---
slug: go-loi-hc05
title: Gỡ lỗi HC-05 — ma trận triệu chứng
vault: iot
type: concept
branch: D
order: 8
status: learning
tags: [iot, bluetooth, go-loi]
prev: [giao-tiep-hai-chieu-bang-chuoi]
next: []
related: [hc05-led-trang-thai, hc05-data-mode-vs-at-mode, uart-crossover-va-chia-ap, uart-serial-monitor]
sources: ["IAD_MSA33_Part_1_2.pdf"]
created: 2026-10-24
---

# Gỡ lỗi HC-05 — ma trận triệu chứng

> Tóm tắt 1 câu: ba triệu chứng kinh điển — **im lặng, ký tự lạ, điện thoại không thấy** — ứng với ba nguyên nhân — **sai baud/đấu ngược, thiếu NL&CR, kẹt AT mode** — và mỗi cái có một thuốc chữa.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #8 ← cần [[giao-tiep-hai-chieu-bang-chuoi]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #bluetooth #go-loi

---

## 🔢 Emergency checklist (slide)

| Triệu chứng | Căn nguyên | Thuốc chữa |
|---|---|---|
| Gõ `AT`, terminal **im lặng** hoàn toàn | sai baud, hoặc **đấu ngược TX/RX** | kiểm tra chéo dây ([[uart-crossover-va-chia-ap]]); thử baud 9600 rồi 38400 |
| Lệnh AT trả **ký tự lạ, ô vuông** | thiếu ký tự ngắt dòng | bật **Both NL & CR** ở góc dưới Serial Monitor ([[uart-serial-monitor]]) |
| Điện thoại **không dò thấy** tên Bluetooth | module **kẹt ở AT mode** | rút chân KEY khỏi 3,3 V/5 V → `AT+RESET` hoặc rút điện cắm lại ([[hc05-data-mode-vs-at-mode]]) |

## 💡 Quy trình gỡ lỗi theo thứ tự

1. **Nhìn LED** trước ([[hc05-led-trang-thai]]) — biết module đang ở mode nào mà không cần gõ gì.
2. **Kiểm tra điện**: VCC 5 V, GND chung, cầu chia áp đúng chiều (chỉ trên dây vào RX của HC-05).
3. **Kiểm tra dây**: TX↔RX chéo; chân trong `SoftwareSerial(10, 11)` khớp dây thật.
4. **Kiểm tra baud**: AT mode 38400 cố định; Data mode = giá trị `AT+UART?`; code `bt.begin()` phải khớp Data mode.
5. **Kiểm tra line ending**: Both NL & CR cho AT; với app điện thoại thì `trim()` trong code.
6. Vẫn không được → `AT+ORGL` đưa về mặc định rồi cấu hình lại từ [[hc05-lenh-at]].

## 🧩 Trực giác

Mỗi tầng chỉ có thể hỏng theo cách của nó: **điện** (không sáng), **dây** (im lặng), **tốc độ** (rác), **ký tự kết dòng** (lệnh không được nhận), **mode** (không thấy tên). Đi từ dưới lên, không nhảy cóc — đổi code khi dây sai là mất cả buổi.

## ⚠️ Những cái bẫy ngoài bảng

- Nạp code **không được** khi HC-05 cắm D0/D1 → tháo dây, nạp, cắm lại. Dùng D10/D11 để khỏi phải tháo.
- Android ghép đôi xong nhưng app không gửi được: pairing ≠ connection, phải chọn thiết bị **trong app**.
- Hai module trong lớp **cùng tên `HC-05`** → điện thoại nối nhầm sang nhóm bên cạnh. Đặt `AT+NAME` theo tên nhóm ngay buổi đầu.
- Servo/relay bật làm sụt áp → HC-05 **reset ngầm**, mất kết nối ngẫu nhiên. Nguồn riêng cho tải, GND chung.
- iPhone: không thấy HC-05 là **đúng**, không phải lỗi — Bluetooth Classic SPP không mở cho app iOS ([[bluetooth-hc-05]]).

---

## 🔗 Liên kết
- **Tiền đề:** [[giao-tiep-hai-chieu-bang-chuoi]]
- **Liên quan:** [[hc05-led-trang-thai]] · [[hc05-data-mode-vs-at-mode]] · [[hc05-lenh-at]] · [[uart-crossover-va-chia-ap]] · [[uart-serial-monitor]]

## ❓ Câu hỏi mở
- Viết một sketch "tự chẩn đoán": thử lần lượt 9600/38400/115200, gửi `AT`, in ra baud nào trả `OK` — có đáng làm thành công cụ chung cho cả lớp?

## 📚 Nguồn
- Slide Part 1.2 — *Ma trận bắt bệnh & gỡ lỗi (Troubleshooting Table)*
