---
slug: fpn
title: FPN — Feature Pyramid Network
vault: dl
type: concept
branch: C
order: 15
status: done
tags: [dl, detection]
prev: [focal-loss]
created: 2026-08-02
---

# FPN — Feature Pyramid Network

> Tóm tắt 1 câu: Thuốc cho "vật nhỏ biến mất" — trộn ngữ nghĩa của tầng sâu vào độ phân giải của tầng nông.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh C · #15 ← cần [[focal-loss]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #detection

---

## 💡 Vấn đề

Feature `conv5` có **stride ~32** ⇒ **vật < 32px biến mất** hoàn toàn.

Triệu chứng: **recall lớp vật nhỏ ≈ 0**, nhưng **mAP tổng vẫn trông ổn** → bẫy âm thầm.

## 🔢 Cách FPN chữa (Lin, CVPR 2017)

- Lấy feature ở **nhiều tầng độ phân giải**
- Đường **top-down + lateral connection**: trộn **ngữ nghĩa** của tầng sâu vào **độ phân giải** của tầng nông
- ⇒ **Vật nhỏ dò ở tầng nông, vật lớn ở tầng sâu**

📌 Gần như **mọi detector hiện đại đều có FPN**.

## 🧩 Vì sao SSD chưa đủ

SSD đã đi trước **một nửa bước** — nó dự đoán trên nhiều tầng. Nhưng nó **không trộn ngữ nghĩa xuống**, nên tầng nông tuy nét mà "không hiểu" đang nhìn gì → yếu hơn FPN.

## ⚙️ Cách khác cho cùng vấn đề

Tăng resolution input (đắt hơn nhiều). Ưu tiên FPN.

---

## 🔗 Liên kết
- **Tiền đề:** [[focal-loss]] · [[faster-rcnn]]
- **Liên quan tới:** [[resnet]] — cùng ý tưởng "nối tắt giữa các tầng"
