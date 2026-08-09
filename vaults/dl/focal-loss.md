---
slug: focal-loss
title: Focal Loss
vault: dl
type: concept
branch: C
order: 14
status: done
tags: [dl, detection, loss]
prev: [iou-nms-map]
next: [fpn]
created: 2026-08-02
---

# Focal Loss

> Tóm tắt 1 câu: One-stage sinh ~100k ứng viên/ảnh, **99%+ là background dễ** — Focal Loss tự giảm trọng số mẫu dễ để dồn gradient cho mẫu khó.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #14 ← cần [[iou-nms-map]] · → kế tiếp [[fpn]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection #loss

---

## 🔢 Công thức

```
FL(p_t) = −α (1 − p_t)^γ · log(p_t)        thường γ = 2, α = 0.25
                └──────┘
          hệ số tự động giảm trọng số
```

## 💡 Cách nó hoạt động

- **Vấn đề**: tổng loss bị **đám mẫu dễ áp đảo** → model học được rất ít từ mẫu khó
- **Cách chữa**: mẫu đã đoán đúng chắc chắn (`p_t → 1`) thì `(1−p_t)^γ → 0` ⇒ **tự giảm trọng số**
- ⇒ Đây chính là thứ giúp **RetinaNet (one-stage) đuổi kịp độ chính xác của two-stage**

## 🧩 Trực giác

Giống chấm bài: 10.000 câu dễ ai cũng đúng + 100 câu khó. Nếu tính điểm đều nhau thì điểm gần như chỉ phản ánh phần dễ. Focal Loss **hạ trọng số câu dễ xuống gần 0** để điểm phản ánh phần khó.

## ⚙️ Các cách khác cho cùng vấn đề

- **Hard negative mining** — chọn thủ công các negative khó (xem [[hard-negative-mining]])
- Cân tỉ lệ anchor pos/neg

## ⚠️ Lỗi thường gặp

Triệu chứng của bệnh này: **model đoán "background" hết cũng có loss thấp** → mAP gần 0 mà loss trông đẹp. Đúng kiểu [[bay-am-tham]].

---

## 🔗 Liên kết
- **Tiền đề:** [[iou-nms-map]] · [[yolo-ssd]]
- **Dẫn tới:** [[fpn]]
- **Liên quan tới:** [[hard-negative-mining]]
