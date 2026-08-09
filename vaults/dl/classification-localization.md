---
slug: classification-localization
title: Classification + Localization (single object)
vault: dl
type: concept
branch: C
order: 2
status: done
tags: [dl, detection]
prev: [bon-muc-bai-toan-thi-giac]
next: [multitask-loss]
created: 2026-08-02
---

# Classification + Localization (single object)

> Tóm tắt 1 câu: Một backbone, **2 head song song** — và localization là bài **REGRESSION**, không phải classification.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #2 ← cần [[bon-muc-bai-toan-thi-giac]] · → kế tiếp [[multitask-loss]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection

---

## 💡 Ý chính

```
ảnh → CNN backbone → vector đặc trưng ─┬→ Head 1: FC → C lớp   + Softmax loss
                                        └→ Head 2: FC → 4 số   + L2 loss   ← REGRESSION
```

- Head 2 xuất `(x, y, w, h)` — **4 số thực** ⇒ đây là bài **regression**
- Kiến trúc 2 head **bắt buộc Functional API**, không Sequential được

## ⚠️ Lỗi thường gặp

⚠️ **Đính chính slide 6–7**: box regression dùng **L2 Loss**. L2 **nhạy outlier** (box lệch nhiều → gradient nổ). Thực tế:
- Fast R-CNN dùng **Smooth L1**
- Hiện đại dùng **IoU / GIoU / CIoU loss**

⚠️ **Mâu thuẫn nội bộ slide 6 vs 49**: s6 ghi box head là `4096 → 4` (**class-agnostic**), s49 ghi *"Box coordinates (per class): 4 × C"* (**class-specific**). **Cả hai đều tồn tại** — R-CNN/Fast/Faster/Mask dùng **per-class**; s6 là bản rút gọn cho single-object.

---

## 🔗 Liên kết
- **Tiền đề:** [[bon-muc-bai-toan-thi-giac]]
- **Dẫn tới:** [[multitask-loss]] · [[vi-sao-multi-object-kho]]
