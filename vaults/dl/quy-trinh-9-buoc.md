---
slug: quy-trinh-9-buoc
title: Quy trình 9 bước cho một bài DL
vault: dl
type: concept
branch: G
order: 1
status: done
tags: [dl, pipeline, thuc-chien]
next: [chia-train-val-test]
created: 2026-08-02
---

# Quy trình 9 bước cho một bài DL

> Tóm tắt 1 câu: Mạch chính từ xác định bài tới chạm test đúng 1 lần — thiếu bước nào là hở chỗ đó.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #1 → kế tiếp [[chia-train-val-test]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #pipeline #thuc-chien

---

## 💡 Mạch chính

```
0 xác định bài (+quét ràng buộc)
1 nhìn data
2 preprocess
3 augment (chỉ train)
4 dựng model
5 compile
6 smoke test 1 epoch
7 train + callbacks
8 error chart
9 test đúng 1 lần
```

## ⚙️ Phase 0 — quét RÀNG BUỘC trước khi đụng data

Ràng buộc **override mọi default**:

| Ràng buộc từ đề / rubric | Override default |
|---|---|
| **Cấm dùng pretrained** | Train from scratch → cần nhiều data + augmentation mạnh hơn |
| **Giới hạn kích thước / tốc độ** | MobileNet/EfficientNet, không VGG |
| **Metric đề ÉP** (F1? AUC? BLEU?) | Ghi ra **TRƯỚC** khi train, chốt luôn cách chọn best checkpoint |
| **Split bắt buộc theo cách riêng** | vd ViIC phải split theo **ảnh** không theo caption |
| **Bắt buộc so sánh ≥ 2 kiến trúc** | Thiết kế **config-driven** ngay từ đầu |

⚠️ **2 loại ràng buộc, đừng gộp**: **Loại 1** = đề ÉP, biết trước → quét ở đây. **Loại 2** = **data tự lộ** (lệch lớp, ảnh trùng, nhãn sai, [[group-leakage]]) — **chỉ nhìn data mới thấy**. Loại 1 quyết định **nhìn data soi chỗ nào** để loại 2 lộ ra.

## 🔀 Rẽ nhánh

- Cần **VỊ TRÍ / ĐẾM SỐ VẬT** → nhãn · augmentation · loss · metric **đổi hết** → [[bon-muc-bai-toan-thi-giac]]
- Input/output là **CHUỖI** → [[nam-dang-bai-sequence]]
- Input là **VĂN BẢN** → chạy [[word-segmentation-tieng-viet]] trước, rồi mới sang chuỗi

## 🪜 Luôn bắt đầu bằng BASELINE ĐƠN GIẢN

`CNN nhỏ 2–3 block` → `thêm block/filter` → `transfer learning` → `fine-tune`.
**Không có baseline thì không biết cải tiến có thật sự cải tiến không.**

---

## 🔗 Liên kết
- **Dẫn tới:** [[chia-train-val-test]] · [[error-chart]]
