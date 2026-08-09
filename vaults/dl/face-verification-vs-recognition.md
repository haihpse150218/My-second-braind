---
slug: face-verification-vs-recognition
title: Face Verification vs Recognition
vault: dl
type: concept
branch: D
order: 2
status: done
tags: [dl, metric-learning, face]
prev: [metric-learning-la-gi]
next: [contrastive-loss]
created: 2026-08-02
---

# Face Verification vs Recognition

> Tóm tắt 1 câu: **1:1** (đúng người này không?) và **1:N** (đây là ai trong N người?) — 2 bài khác nhau, metric khác nhau.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh D · #2 ← cần [[metric-learning-la-gi]] · → kế tiếp [[contrastive-loss]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #metric-learning #face

---

## 💡 Ý chính

| | **Verification (1:1)** | **Recognition (1:N)** |
|---|---|---|
| Câu hỏi | *"2 ảnh này có phải cùng 1 người?"* | *"Ảnh này là ai trong CSDL N người?"* |
| Output | Có / Không | Danh tính (hoặc "không biết") |
| Ví dụ | Mở khoá điện thoại · eKYC | Chấm công · tìm người trong camera |
| Metric | **FAR / FRR · ROC · EER** | **Top-1 / Top-5 accuracy** · CMC curve |

## 🔑 Vì sao KHÔNG dùng classification thường

- Số người **thay đổi liên tục** — thêm nhân viên mới là phải train lại toàn bộ classifier
- Mỗi người thường chỉ có **vài ảnh** — không đủ để train 1 lớp

⇒ Học **không gian nhúng** ([[metric-learning-la-gi]]): người mới chỉ cần **thêm 1 vector vào CSDL**, **không train lại gì cả**.

## ⚠️ Lỗi thường gặp

🚩 **Bắt buộc có ngưỡng từ chối.** Người **ngoài CSDL** phải trả về *"không biết"* — không có ngưỡng thì hệ thống **luôn gán bừa** cho người gần nhất. Chốt ngưỡng trên **validation**, cùng logic với lớp `<không biết>` của chatbot.

🚩 **[[group-leakage]] rất dễ xảy ra**: cùng một người ở cả train lẫn test → accuracy ảo. Split **theo NGƯỜI**, không theo ảnh.

---

## 🔗 Liên kết
- **Tiền đề:** [[metric-learning-la-gi]]
- **Dẫn tới:** [[contrastive-loss]] · [[arcface-cosface-sphereface]]
- **Liên quan tới:** [[group-leakage]]
