---
slug: faster-rcnn
title: Faster R-CNN & RPN (2015)
vault: dl
type: concept
branch: C
order: 8
status: done
tags: [dl, detection]
prev: [fast-rcnn]
next: [anchor-box]
created: 2026-08-02
---

# Faster R-CNN & RPN (2015)

> Tóm tắt 1 câu: 🔑 **RPN** — mạng tự học đề xuất vùng, dùng chung backbone → end-to-end, không còn phụ thuộc CPU.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #8 ← cần [[fast-rcnn]] · → kế tiếp [[anchor-box]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection

---

## 💡 RPN hoạt động — nhớ bằng SHAPE

```
Ảnh 3×640×480 → CNN → feature 512×20×15
   mỗi điểm trên feature map đặt sẵn K anchor box cố định
   conv head đẻ ra 2 thứ:
      objectness    K×20×15    (nhị phân: có vật không)
      box transform 4K×20×15
   sort theo objectness → lấy top ~300 làm proposal
```

## ⚙️ Đặc điểm

- **End-to-end, 4 loss** (RPN class + RPN box + head class + head box)
- Vẫn là **2 giai đoạn**, chưa realtime
- Dùng chung backbone với head ⇒ gần như **miễn phí** so với Selective Search

## ⚠️ Lỗi thường gặp

Bỏ qua [[anchor-box]] matching — anchor không khớp hình dạng vật trong data thì **recall thấp mà không hiểu vì sao**.

Vật nhỏ vẫn mất ở `conv5` (stride 32) → cần [[fpn]].

---

## 🔗 Liên kết
- **Tiền đề:** [[fast-rcnn]] · [[selective-search]]
- **Dẫn tới:** [[anchor-box]] · [[mask-rcnn]] · [[fpn]]
