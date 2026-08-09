---
slug: yolo-ssd
title: YOLO / SSD / RetinaNet — 1-stage
vault: dl
type: concept
branch: C
order: 11
status: done
tags: [dl, detection]
prev: [mask-rcnn]
next: [detr]
created: 2026-08-02
---

# YOLO / SSD / RetinaNet — 1-stage

> Tóm tắt 1 câu: Bỏ hẳn bước đề xuất vùng — chia grid, mỗi ô đẻ luôn box + lớp, **1 forward pass**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #11 ← cần [[mask-rcnn]] · → kế tiếp [[detr]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection

---

## 💡 Ý chính

- Chia ảnh thành **grid S×S** (slide: 7×7). Mỗi ô có sẵn **B base box**
- Mỗi ô đẻ: `B × (dx, dy, dw, dh, confidence)` + `C` điểm lớp
- 📐 **Output tensor = `7 × 7 × (5B + C)`** — nhớ công thức này, hay hỏi thi
- Bản chất: **giống RPN nhưng phân loại luôn theo lớp cụ thể**, không chỉ "có vật / không vật"
- Ra rất nhiều box chồng chéo → **bắt buộc lọc bằng NMS** ([[iou-nms-map]])

## ⚠️ Đính chính slide 34

🚩 **Slide gộp YOLO + SSD + RetinaNet vào một mô tả và ghi *"including background as a class"*.**
Đúng với **SSD/RetinaNet**. **YOLOv1 KHÔNG có lớp background** — vai trò đó do **confidence** đảm nhiệm, và `P(class)` là xác suất **có điều kiện** `P(class | object)`.

🚩 **Slide vẽ B = 3.** **YOLOv1 gốc: `S=7, B=2, C=20` → output `7×7×30`.** B=3 chỉ là hình minh hoạ.

## ⚠️ Lỗi thường gặp

- **Lệch foreground/background cực nặng** — one-stage sinh ~100k ứng viên/ảnh, 99%+ là background dễ → cần [[focal-loss]]
- **Quên NMS lúc inference** → mAP tụt thảm dù model tốt

## ⚙️ Khi nào chọn

**Realtime / video / thiết bị biên** → YOLO (bản mới). 1 forward pass.

---

## 🔗 Liên kết
- **Tiền đề:** [[mask-rcnn]] · [[anchor-box]]
- **Dẫn tới:** [[detr]] · [[focal-loss]] · [[iou-nms-map]]
