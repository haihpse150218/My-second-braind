---
slug: gradient-descent-dl
title: Gradient Descent
vault: dl
type: concept
branch: A
order: 7
status: done
tags: [dl, nen-tang, training]
prev: [loss-function-dl]
next: [cac-loai-gradient-descent]
created: 2026-08-02
---

# Gradient Descent

> Tóm tắt 1 câu: Đi ngược hướng dốc của loss để giảm dần sai số — learning rate quyết định bước đi dài bao nhiêu.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh A · #7 ← cần [[loss-function-dl]] · → kế tiếp [[cac-loai-gradient-descent]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nen-tang #training

---

## 🔢 Công thức

```
w ← w − η · ∂L/∂w
        ↑
   learning rate
```

## ⚙️ Optimizer

| Optimizer | Khi nào |
|---|---|
| **Adam** | Mặc định |
| **AdamW** | **Mặc định hiện đại** cho Transformer / ViT / LLM |
| RMSprop | Phổ biến cho RNN |
| SGD + momentum | Khi cần tinh chỉnh cuối, đôi khi tổng quát hoá tốt hơn |

**Adam vs AdamW** (slide chỉ liệt kê tên):

| | Adam | AdamW |
|---|---|---|
| Weight decay | Nhét vào gradient → bị adaptive LR **làm méo**, L2 hoạt động **sai** | **Tách riêng** khỏi bước adaptive (*decoupled weight decay*) |

## ⚠️ Lỗi thường gặp

- LR **quá lớn** → loss NaN / bùng lên · LR **quá nhỏ** → giảm nhỏ giọt. Xem bảng chẩn đoán ở [[hai-chot-dung-train]].
- 📌 **Bước lớn ≠ học nhanh.** Bằng chứng: AlexNet 30M param, `1e-3` → `0.9318`, `1e-4` → `0.9543`. Xem [[batch-size-va-learning-rate]].
- **Hàm lồi** thì 1 đáy → train nhiều lần ra kết quả giống nhau. DL **không lồi** → phải set seed mới tái lập được.

---

## 🔗 Liên kết
- **Tiền đề:** [[loss-function-dl]]
- **Dẫn tới:** [[cac-loai-gradient-descent]] · [[backpropagation]]
- **Liên quan tới:** [[batch-size-va-learning-rate]]
