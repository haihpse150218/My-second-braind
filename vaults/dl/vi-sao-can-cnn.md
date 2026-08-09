---
slug: vi-sao-can-cnn
title: Vì sao cần CNN
vault: dl
type: concept
branch: B
order: 1
status: done
tags: [dl, cnn]
next: [phep-tich-chap]
created: 2026-08-02
---

# Vì sao cần CNN

> Tóm tắt 1 câu: Dense trên ảnh **nổ số tham số** và **vứt bỏ cấu trúc không gian** — CNN sửa cả hai.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh B · #1 → kế tiếp [[phep-tich-chap]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Dùng trong:** [[../../projects/image-super-resolution|📦 image-super-resolution]] · [[../../projects/dsp-urbansound|📦 dsp-urbansound]]
**Tags:** #dl #cnn

---

## 💡 2 vấn đề của Dense trên ảnh

**1. Nổ số tham số**
Ảnh `224×224×3` = **150.528** giá trị. Nối full sang 1 tầng 1000 neuron ⇒ **150 triệu** tham số **chỉ cho 1 tầng**.

**2. Vứt bỏ cấu trúc không gian**
`Flatten` biến ảnh thành 1 vector dài ⇒ **pixel cạnh nhau không còn liên quan gì nhau**. Model phải học lại từ đầu rằng "2 pixel kề nhau thì liên quan".

## ⚙️ CNN sửa bằng 3 tính chất

| Tính chất | Nghĩa là gì |
|---|---|
| **Kết nối cục bộ** | Mỗi neuron chỉ nhìn một **vùng nhỏ**, không nhìn cả ảnh |
| **Chia sẻ trọng số** | Cùng một filter trượt khắp ảnh ⇒ **ít param**, và học được đặc trưng **bất kể vị trí** |
| **Bất biến tịnh tiến** | Con mèo ở góc trái hay góc phải đều nhận ra |

📌 **Chia sẻ trọng số** là cùng một ý tưởng với weight sharing trong [[rnn-cong-thuc]] — chỉ khác trục: CNN chia sẻ theo **không gian**, RNN theo **thời gian**.

## ⚠️ Lỗi thường gặp

- **Giữ 2D suốt phần conv**, chỉ `Flatten` ở **cuối**.
- Bằng chứng tự chạy: CNN nhỏ **225.034** param thắng AlexNet **29.987.530** param → xem [[underfit-vs-overfit]].

---

## 🔗 Liên kết
- **Tiền đề:** [[vanishing-gradient]]
- **Dẫn tới:** [[phep-tich-chap]]
