---
slug: bon-muc-bai-toan-thi-giac
title: 4 mức bài toán thị giác
vault: dl
type: concept
branch: C
order: 1
status: done
tags: [dl, detection]
next: [classification-localization]
created: 2026-08-02
---

# 4 mức bài toán thị giác

> Tóm tắt 1 câu: Chốt đúng MỨC trước khi chọn model — **cần ĐẾM số vật thì bắt buộc detection/instance**, semantic segmentation không đếm được.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #1 → kế tiếp [[classification-localization]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection

---

## 💡 Ý chính

| Mức | Output | Đếm được số vật? | Câu hỏi tự kiểm |
|---|---|---|---|
| **Classification** | 1 nhãn / ảnh | ❌ | *"Ảnh này là cái gì?"* — no spatial extent |
| **Semantic Segmentation** | nhãn cho **từng pixel** | ❌ | *"Pixel này thuộc lớp nào?"* — 3 con chó dính nhau → **1 vùng CHÓ** |
| **Object Detection** | list `(class, x, y, w, h)` | ✅ | *"Có mấy vật, ở đâu?"* |
| **Instance Segmentation** | mask riêng **mỗi cá thể** | ✅ | *"Vật thứ 2 chiếm đúng những pixel nào?"* |

## ⚙️ Khi nào dùng cái nào

- **Cần ĐẾM số vật → bắt buộc detection/instance.** Semantic segmentation **không đếm được** (2 vật chạm nhau thành 1 vùng)
- Chỉ cần biết **"có/không"** → **classification**, đừng gắn detection cho oai (nhãn đắt gấp ~**10 lần**)
- Cần **diện tích / hình dạng chính xác** (y tế, nông nghiệp) → segmentation
- Cần **vị trí + đếm** → detection

## ⚠️ Lỗi thường gặp

Nhãn detection **đắt hơn classification ~10 lần** → tính công gán nhãn vào kế hoạch, hoặc dùng pretrained COCO + fine-tune.

⚠️ **Chốt format toạ độ và ghi ra giấy** — 3 format hay bị lẫn:
- `(x, y, w, h)` — góc trên-trái + kích thước *(format slide dùng)*
- `(x1, y1, x2, y2)` — 2 góc (Pascal VOC)
- `(cx, cy, w, h)` **normalized 0–1** — tâm + kích thước (YOLO `.txt`)

🚩 **Vẽ box từ file nhãn lên ảnh TRƯỚC KHI TRAIN.** Nhầm format → box lệch hoàn toàn nhưng **code vẫn chạy, loss vẫn giảm**.

---

## 🔗 Liên kết
- **Dẫn tới:** [[classification-localization]] · [[iou-nms-map]]
- **Liên quan tới:** [[quy-trinh-9-buoc]]
