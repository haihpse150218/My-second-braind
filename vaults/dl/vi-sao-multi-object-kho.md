---
slug: vi-sao-multi-object-kho
title: Vì sao MULTI object khó — gốc rễ của mọi kiến trúc
vault: dl
type: concept
branch: C
order: 4
status: done
tags: [dl, detection]
prev: [multitask-loss]
next: [selective-search]
created: 2026-08-02
---

# Vì sao MULTI object khó — gốc rễ của mọi kiến trúc

> Tóm tắt 1 câu: **Số output thay đổi theo từng ảnh** → không thể dùng FC cố định như classification.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #4 ← cần [[multitask-loss]] · → kế tiếp [[selective-search]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection

---

## 💡 Ý chính

| Ảnh | Số output cần |
|---|---|
| 1 mèo | 4 số |
| 2 chó + 1 mèo | 12 số |
| đàn vịt | rất nhiều số |

→ **Không thể dùng FC cố định.** Đây là điểm khác biệt căn bản với classification.

## 🧩 Cách ngây thơ và vì sao nó chết

Cắt nhiều crop, cho CNN phân loại từng crop là *object* hay *background*.

❌ **Chết vì tổ hợp**: phải quét **mọi vị trí × mọi scale × mọi tỉ lệ khung** → cực đắt.

## 🔑 Câu chốt

📌 **Toàn bộ lịch sử detection là cách GIẢM SỐ CROP phải chạy CNN.**

Đọc cây tiến hoá với lăng kính này thì mọi đời đều dễ hiểu:

| Đời | Giảm crop bằng cách |
|---|---|
| [[selective-search]] | Thuật toán tay lọc còn ~2000 vùng khả nghi |
| [[rcnn]] | Vẫn 2000 crop, nhưng chỉ crop vùng khả nghi |
| [[fast-rcnn]] | Chạy CNN **1 lần**, crop trên **feature map** |
| [[faster-rcnn]] | Mạng **tự học** đề xuất vùng |
| [[yolo-ssd]] | Bỏ hẳn bước đề xuất — chia grid, 1 forward pass |

---

## 🔗 Liên kết
- **Tiền đề:** [[multitask-loss]]
- **Dẫn tới:** [[selective-search]] · [[yolo-ssd]]
