---
slug: fast-rcnn
title: Fast R-CNN (2015)
vault: dl
type: concept
branch: C
order: 7
status: done
tags: [dl, detection]
prev: [rcnn]
next: [faster-rcnn]
created: 2026-08-02
---

# Fast R-CNN (2015)

> Tóm tắt 1 câu: 🔑 Chạy CNN **1 lần trên CẢ ẢNH trước**, rồi mới crop trên **feature map** — không crop trên ảnh gốc nữa.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #7 ← cần [[rcnn]] · → kế tiếp [[faster-rcnn]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection

---

## 💡 Ý tưởng cốt lõi

```
ảnh → ConvNet (1 LẦN) → feature map conv5
                          ↓ crop RoI TRÊN FEATURE MAP
                        per-region net nhỏ
                          ├→ Linear + softmax (class)
                          └→ Linear (box offset)
```

Thay vì 2000 lần chạy CNN → **1 lần**. Tăng tốc hàng trăm lần.

Cũng bỏ SVM, dùng **softmax** ⇒ train **1 lượt** thay vì 3 giai đoạn tách rời.

## ⚠️ Nút thắt còn lại

**Selective Search trên CPU giờ là cổ chai** — CNN đã nhanh rồi mà vẫn phải chờ vài giây để có proposal. → [[faster-rcnn]] giải quyết.

## ⚠️ Đính chính

**s25 gọi là *"Crop + Resize features"*** — tên thật là **RoI Pooling**. Mask R-CNN đổi sang **RoI Align**; xem [[mask-rcnn]] để biết khác gì.

---

## 🔗 Liên kết
- **Tiền đề:** [[rcnn]]
- **Dẫn tới:** [[faster-rcnn]] · [[mask-rcnn]]
