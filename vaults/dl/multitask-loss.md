---
slug: multitask-loss
title: Multitask Loss
vault: dl
type: concept
branch: C
order: 3
status: done
tags: [dl, detection, loss]
prev: [classification-localization]
next: [vi-sao-multi-object-kho]
created: 2026-08-02
---

# Multitask Loss

> Tóm tắt 1 câu: `Loss = Softmax loss + λ × L2 loss` — và `λ` là hyperparameter **thật sự**, không phải để mặc định.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #3 ← cần [[classification-localization]] · → kế tiếp [[vi-sao-multi-object-kho]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection #loss

---

## 🔢 Công thức

```
Loss = Softmax loss  +  λ × L2 loss
       └ phân lớp ┘      └ vị trí ┘
```

## ⚠️ Vì sao `λ` khó

**2 loss KHÁC ĐƠN VỊ**: một cái là **xác suất** (0–1), một cái là **pixel** (có thể hàng trăm).

Sai `λ` → model **chỉ học 1 nhánh, nhánh kia đứng im**. Triệu chứng: phân lớp rất tốt mà box lệch tứ tung (hoặc ngược lại).

## ⚙️ Cách dò

- Nhìn **2 thành phần loss riêng** trên TensorBoard, không nhìn tổng — tổng che mất việc một nhánh không giảm
- Chuẩn hoá toạ độ về `[0,1]` trước để 2 loss cùng thang
- Dò `λ` theo bậc 10: `0.1 → 1 → 10`

## 🔗 Liên hệ

Cùng một vấn đề "cộng 2 loss khác đơn vị" xuất hiện ở nhiều chỗ: [[center-loss]] (softmax + center), Faster R-CNN (**4 loss**), Mask R-CNN (class + box + mask).

---

## 🔗 Liên kết
- **Tiền đề:** [[classification-localization]]
- **Dẫn tới:** [[vi-sao-multi-object-kho]]
- **Liên quan tới:** [[faster-rcnn]] · [[mask-rcnn]]
