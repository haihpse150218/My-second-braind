---
slug: detr
title: DETR (2020) — detection bằng Transformer
vault: dl
type: concept
branch: C
order: 12
status: done
tags: [dl, detection, transformer]
prev: [yolo-ssd]
next: [iou-nms-map]
created: 2026-08-02
---

# DETR (2020) — detection bằng Transformer

> Tóm tắt 1 câu: Không anchor, không NMS — pipeline sạch nhất, đổi lại **đói data và hội tụ rất chậm**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #12 ← cần [[yolo-ssd]] · → kế tiếp [[iou-nms-map]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection #transformer

---

## 💡 Kiến trúc

```
CNN backbone → feature + positional encoding
   → Transformer encoder-decoder → object queries
   → mỗi query 1 FFN → (class, box)  hoặc  "no object" (ø)
```

## ✅ Điểm mạnh

- **Không anchor, không NMS** — pipeline sạch nhất
- Khớp dự đoán với ground-truth bằng **bipartite matching loss**: mỗi GT ghép **đúng 1** dự đoán, phần dư gán `ø` → chính vì ghép 1-1 nên **không cần NMS**

## ⚠️ Điểm yếu

**Đói data, hội tụ rất chậm** — bản gốc train **~500 epoch**. Ít data → đừng chọn DETR.

📌 Cùng logic với "Transformer đói data" ở [[contextualized-embedding]].

## ⚠️ Đính chính slide 42

🚩 Slide ghi *"No anchors, **no regression of box transforms**"* — dễ hiểu nhầm thành "DETR không regress gì".
Thật ra DETR **vẫn regress toạ độ box** (normalized `cx, cy, w, h`) qua FFN. Cái nó bỏ là regress **độ lệch so với ANCHOR**.

---

## 🔗 Liên kết
- **Tiền đề:** [[yolo-ssd]] · [[anchor-box]]
- **Dẫn tới:** [[iou-nms-map]]
- **Liên quan tới:** [[attention-qkv]] · [[positional-encoding]]
