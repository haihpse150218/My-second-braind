---
slug: hoc-sau-la-gi
title: Deep Learning là gì
vault: dl
type: concept
branch: A
order: 1
status: done
tags: [dl, nen-tang]
next: [perceptron]
created: 2026-08-02
---

# Deep Learning là gì

> Tóm tắt 1 câu: Khác ML cổ điển ở chỗ **tự học đặc trưng** từ dữ liệu thô, thay vì để người ngồi thiết kế feature.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh A · #1 → kế tiếp [[perceptron]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nen-tang

---

## 💡 Ý chính

| | ML cổ điển | Deep Learning |
|---|---|---|
| Đặc trưng | **Người thiết kế** (feature engineering) | **Model tự học** |
| Data cần | Ít cũng chạy | **Nhiều** |
| Dữ liệu thô | Phải xử lý thành bảng | Ăn thẳng ảnh · text · âm thanh |
| Giải thích được | Thường có | Thường **không** |

📌 **DL mạnh nhất ở chỗ xử lý được ĐA DẠNG LOẠI DỮ LIỆU** (multimodal) — cùng một bộ công cụ dùng cho ảnh, chữ, tiếng nói.

## ⚠️ Kim chỉ nam — đừng copy nguyên quy tắc 90/10 của ML

ML có quy tắc **90/10** (90% xử lý data, 10% thuật toán). DL **không copy nguyên** — **kiến trúc ở DL quan trọng hơn ở ML bảng**.

Nhưng vẫn đúng ở điểm cốt lõi: **data + pipeline đúng ăn đứt kiến trúc fancy**.
Bằng chứng tự chạy: CNN `225.034` param → `0.9918` **thắng** AlexNet `29.987.530` param → `0.9564`. Xem [[underfit-vs-overfit]].

## 🧩 3 bậc năng lực generative

1. **Đổi chiều** (discriminative → sinh ngược)
2. **Ra mới** (VAE, GAN, Diffusion) — [[data-augmentation]] **KHÔNG** thuộc bậc này
3. **Cắt ghép** (kết hợp nhiều nguồn)

---

## 🔗 Liên kết
- **Dẫn tới:** [[perceptron]]
- **Liên quan tới:** [[quy-trinh-9-buoc]]
