---
slug: anchor-box
title: Anchor box
vault: dl
type: concept
branch: C
order: 9
status: done
tags: [dl, detection]
prev: [faster-rcnn]
next: [mask-rcnn]
created: 2026-08-02
---

# Anchor box

> Tóm tắt 1 câu: Bộ khung mẫu có sẵn — mạng chỉ học **độ lệch** so với khung, không đoán toạ độ từ số 0.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #9 ← cần [[faster-rcnn]] · → kế tiếp [[mask-rcnn]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection

---

## 💡 Ý chính

Mỗi vị trí trên feature map đặt sẵn **K anchor** — box có kích thước và tỉ lệ khung cố định.

📌 Mạng chỉ học **`(dx, dy, dw, dh)`** — độ lệch so với anchor. **Dễ học hơn nhiều** so với đoán toạ độ tuyệt đối từ con số 0.

## ⚙️ Anchor matching (Faster R-CNN)

| IoU với ground-truth | Nhãn |
|---|---|
| **≥ 0.7** | **positive** |
| **≤ 0.3** | **negative** |
| ở giữa | **bỏ qua, không tính loss** |

Bản gốc dùng **9 anchor / vị trí** = **3 scale × 3 tỉ lệ khung** (1:1, 1:2, 2:1).

## ⚠️ Lỗi thường gặp

🚩 **Anchor phải KHỚP với hình dạng vật trong data của bạn.**
Bài toàn vật **dẹt/dài** (biển số, dòng chữ) mà để anchor mặc định vuông → **recall thấp mà không hiểu vì sao**. Không có lỗi nào báo.

→ Cách kiểm: thống kê tỉ lệ `w/h` của box trong tập train, đối chiếu với anchor đang dùng. Nhiều framework có sẵn bước **anchor clustering** (k-means trên kích thước box).

## 🔗 Liên hệ

[[detr]] **bỏ hẳn anchor** — đó là điểm bán hàng chính của nó.

---

## 🔗 Liên kết
- **Tiền đề:** [[faster-rcnn]]
- **Dẫn tới:** [[yolo-ssd]] · [[detr]]
