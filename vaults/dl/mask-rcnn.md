---
slug: mask-rcnn
title: Mask R-CNN (2017)
vault: dl
type: concept
branch: C
order: 10
status: done
tags: [dl, detection, segmentation]
prev: [anchor-box]
next: [yolo-ssd]
created: 2026-08-02
---

# Mask R-CNN (2017)

> Tóm tắt 1 câu: Thêm **nhánh mask** vào Faster R-CNN, và đổi RoI Pool → **RoI Align** — chính chỗ đổi đó mới là đóng góp lớn nhất.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #10 ← cần [[anchor-box]] · → kế tiếp [[yolo-ssd]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection #segmentation

---

## 💡 Kiến trúc

```
CNN + RPN → RoI Align → 256×14×14 → conv → 256×14×14 → conv → C×28×28 mask
                      └→ head song song: C class score · 4×C box (box RIÊNG cho từng lớp)
```

## 🔑 RoI Pool vs RoI Align — vì sao BUỘC phải đổi

| | **RoI Pool** (Fast/Faster) | **RoI Align** (Mask R-CNN) |
|---|---|---|
| Toạ độ RoI trên feature map | **Làm tròn** về ô nguyên **2 lần** | **Không làm tròn** — **nội suy bilinear** |
| Sai số | Lệch tới ~nửa ô ⇒ trên ảnh gốc là **hàng chục pixel** | Gần như không |
| Hậu quả | Box vẫn chấp nhận được | 💥 **Mask lệch hẳn** — mask cần đúng **từng pixel** |

📌 Đây là **lý do kỹ thuật chính** khiến Mask R-CNN chạy được, và là đóng góp được trích dẫn nhiều nhất của paper.

## 🔑 Mask branch dùng SIGMOID, không dùng softmax

- Mask head đẻ `C × 28 × 28`, nhưng loss **chỉ tính trên kênh của lớp đúng**, dùng **binary cross-entropy per-pixel (sigmoid)**
- ⇒ **Tách rời** *"vật này là lớp gì"* (head classification lo) khỏi *"pixel nào thuộc vật"* (mask lo)
- ⚠️ Dùng softmax **giữa các lớp** trên mask thì các lớp **cạnh tranh nhau từng pixel** → tệ hơn hẳn. Paper đo và khẳng định điểm này.

## ⚠️ Lỗi thường gặp

⚠️ **Mask chỉ 28×28** → biên thô, phóng lại lên ảnh gốc sẽ **răng cưa**, IoU mask thấp dù box đúng. Cần biên mịn → dùng model segmentation chuyên (U-Net).

---

## 🔗 Liên kết
- **Tiền đề:** [[anchor-box]] · [[faster-rcnn]]
- **Dẫn tới:** [[yolo-ssd]]
