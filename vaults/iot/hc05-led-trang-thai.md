---
slug: hc05-led-trang-thai
title: Đọc LED trạng thái HC-05
vault: iot
type: concept
branch: D
order: 5
status: learning
tags: [iot, bluetooth, go-loi]
prev: [hc05-lenh-at]
next: [bluetooth-master-slave]
related: [hc05-data-mode-vs-at-mode, go-loi-hc05]
sources: ["IAD_MSA33_Part_1_2.pdf"]
created: 2026-10-24
---

# Đọc LED trạng thái HC-05

> Tóm tắt 1 câu: LED trên HC-05 là **nhịp tim chẩn đoán** — bốn kiểu nháy ứng với bốn trạng thái, nhìn LED là biết module đang ở đâu **trước khi** gõ bất kỳ lệnh nào.

**Ngày tạo:** 2026-10-24
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #5 ← cần [[hc05-lenh-at]] · → kế tiếp [[bluetooth-master-slave]]
**Chủ đề cha:** [[SECOND_BRAIN_IOT]]
**Tags:** #iot #bluetooth #go-loi

---

## 🔢 Bảng nhịp

| Kiểu nháy | Nhịp | Trạng thái | Nghĩa là gì |
|---|---|---|---|
| **Nháy nhanh** | 0,1 s bật / 0,1 s tắt | Đang tìm thiết bị / sẵn sàng ghép đôi | Data Mode, chưa ai kết nối — **bình thường khi mới cấp nguồn** |
| **Nháy chậm** | 2 s bật / 2 s tắt | **AT Command Mode** | đã giữ KEY đúng; mở Serial 38400 được rồi |
| **Sóng thưa** | 1 lần / 2 s | Data Mode, chờ thiết bị **đã lưu** | từng ghép đôi; đang chờ đúng thiết bị cũ |
| **Nháy kép** | 2 lần / 1 s | **Đã kết nối**, đang truyền nhận | điện thoại đã vào; code `bt.available()` sẽ có dữ liệu |

Mẹo chẩn đoán từ slide: *nếu đèn không nháy chậm 2 s/lần, bạn CHƯA vào AT mode* — đừng gõ `AT`, hãy làm lại bước giữ KEY ([[hc05-data-mode-vs-at-mode]]).

## 💡 Ý chính

Nháy là **kênh phản hồi duy nhất không cần Serial** — khi Serial Monitor im lặng, LED vẫn nói. Thứ tự gỡ lỗi đúng: **nhìn LED → suy trạng thái → mới chọn cách xử lý** ([[go-loi-hc05]]).

Chân **STATE** của module xuất đúng thông tin này ra điện: HIGH khi đã kết nối. Nối STATE vào một chân digital thì code Arduino tự biết "có điện thoại hay không" mà không cần đoán.

## 🧩 Trực giác

Giống đèn router Wi-Fi: nhanh = đang tìm, chậm = chế độ cài đặt, kép = đang có dữ liệu chạy. Người sửa mạng nhìn đèn trước khi cắm laptop.

## ⚠️ Điều dễ nhầm

- Nháy nhanh **mãi** dù điện thoại báo "đã ghép đôi": ghép đôi (pairing) ≠ kết nối (connection). Phải **mở app** và chọn thiết bị thì mới nháy kép.
- Nháy chậm khi không định vào AT mode: chân KEY đang bị kéo lên 3,3 V (dây chạm) — rút ra, cấp nguồn lại.
- LED tắt hẳn: thiếu nguồn, hoặc VCC/GND cắm ngược.

---

## 🔗 Liên kết
- **Tiền đề:** [[hc05-lenh-at]] · [[hc05-data-mode-vs-at-mode]]
- **Dẫn tới:** [[bluetooth-master-slave]]
- **Liên quan:** [[go-loi-hc05]]

## ❓ Câu hỏi mở
- Dùng chân STATE để Arduino tự tắt LED/relay khi mất kết nối (fail-safe) — nên làm mặc định trong mọi bài không?

## 📚 Nguồn
- Slide Part 1.2 — *Đọc vị trạng thái đèn LED (Diagnostic Heartbeats)*
