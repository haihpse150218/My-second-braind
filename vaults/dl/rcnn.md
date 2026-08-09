---
slug: rcnn
title: R-CNN (2014)
vault: dl
type: concept
branch: C
order: 6
status: done
tags: [dl, detection]
prev: [selective-search]
next: [fast-rcnn]
created: 2026-08-02
---

# R-CNN (2014)

> Tóm tắt 1 câu: 2000 proposal → warp → **2000 forward pass cho 1 ảnh** — nên nó có biệt danh "Slow R-CNN".

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #6 ← cần [[selective-search]] · → kế tiếp [[fast-rcnn]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection

---

## 💡 Pipeline

```
ảnh → Selective Search → 2000 RoI → warp về 224×224 → ConvNet (pretrain ImageNet)
                                                        ├→ SVM phân loại
                                                        └→ Bbox reg chỉnh (dx,dy,dw,dh)
```

## ⚠️ Nút thắt

💥 **~2000 forward pass / 1 ảnh** → cực chậm. Biệt danh **"Slow R-CNN"**.

## ⚠️ Đính chính

- **s16 ghi warp về 224×224** — R-CNN **gốc** dùng AlexNet nên warp **227×227**. 224 là cỡ của VGG/ResNet. Đừng ghi 224 là "con số của R-CNN".
- **s18 phân loại bằng SVM** — đúng với R-CNN 2014, nhưng đó chính là lý do nó **train rắc rối 3 giai đoạn tách rời**: finetune CNN → train SVM → train bbox reg.
  → **[[fast-rcnn]] thay SVM bằng softmax** ⇒ train **1 lượt**. Slide không nói ra điểm này.

---

## 🔗 Liên kết
- **Tiền đề:** [[selective-search]]
- **Dẫn tới:** [[fast-rcnn]]
