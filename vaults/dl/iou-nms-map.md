---
slug: iou-nms-map
title: IoU · NMS · mAP
vault: dl
type: concept
branch: C
order: 13
status: done
tags: [dl, detection, danh-gia]
prev: [detr]
next: [focal-loss]
created: 2026-08-02
---

# IoU · NMS · mAP

> Tóm tắt 1 câu: Ba khái niệm **cả deck S03 bỏ trắng** — thiếu chúng thì không đánh giá được detection, và accuracy hoàn toàn vô nghĩa ở đây.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #13 ← cần [[detr]] · → kế tiếp [[focal-loss]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection #danh-gia

---

## 🔢 Ba khái niệm

| Khái niệm | Công thức / cách làm | Vai trò |
|---|---|---|
| **IoU** | `diện tích giao / diện tích hợp` của 2 box | Định nghĩa **thế nào là đoán trúng**. Ngưỡng kinh điển **0.5** |
| **NMS** | Sort theo confidence → giữ box cao nhất → **xoá mọi box có IoU > ngưỡng** với nó → lặp | Dọn rừng box chồng chéo → còn 1 box / 1 vật |
| **mAP** | Trung bình **AP** qua **mọi lớp**; AP = diện tích dưới đường **Precision–Recall** | Metric chuẩn |

`mAP@0.5` (Pascal VOC) · `mAP@[.5:.95]` (COCO, trung bình 10 ngưỡng IoU, khắt khe hơn).

## ⚠️ Lỗi thường gặp

- 🚩 **Không bao giờ báo cáo `accuracy` cho detection.** Phải báo **mAP**.
- **Ghi rõ ngưỡng IoU và ngưỡng NMS đã dùng** — đổi ngưỡng là đổi luôn con số, không ghi thì so sánh vô nghĩa.
- **Xem precision/recall theo từng lớp** và **theo kích thước vật** (small/medium/large) — lớp hiếm hoặc vật nhỏ thường là chỗ sập, mà mAP tổng che mất.
- **Quên NMS lúc inference** → mAP tụt thảm dù model tốt. Tune ngưỡng NMS trên **validation**.

---

## 🔗 Liên kết
- **Tiền đề:** [[detr]] · [[yolo-ssd]]
- **Dẫn tới:** [[focal-loss]] · [[fpn]]
- **Liên quan tới:** [[metric-sinh-chuoi]] — cùng bài học "metric phải khớp bài toán"
