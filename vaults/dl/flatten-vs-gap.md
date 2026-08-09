---
slug: flatten-vs-gap
title: Flatten vs Global Average Pooling
vault: dl
type: concept
branch: B
order: 7
status: done
tags: [dl, cnn]
prev: [kien-truc-cnn-4-tang]
next: [lenet]
created: 2026-08-02
---

# Flatten vs Global Average Pooling

> Tóm tắt 1 câu: FC head khổng lồ chiếm ~90% param mà **không học thêm gì** — GAP cắt sạch phần đó.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh B · #7 ← cần [[kien-truc-cnn-4-tang]] · → kế tiếp [[lenet]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #cnn

---

## 💡 Ý chính

| | `Flatten → Dense` | **GAP → Dense nhỏ** |
|---|---|---|
| Làm gì | Duỗi thẳng feature map thành vector dài | Trung bình **mỗi channel** → 1 số |
| Param | **Rất nhiều** | **Rất ít** |
| Dùng ở | VGG (và bị phình) | **ResNet** (và nhẹ hơn hẳn) |

## 📊 Bằng chứng — FC head là chỗ phình

- FC `4096-4096-1000` chiếm **~90% tham số** của VGG (~138M param cho VGG16)
- ResNet bỏ FC khổng lồ, dùng **GAP** ⇒ **nhẹ hơn nhiều** dù **sâu gấp ~8 lần**

## ⚠️ Bài học suýt sai — rất đáng nhớ

Từng đoán *"`4096→10` thả đột ngột gây acc thấp"* → định thêm layer 512 vào giữa cho "thả từ từ".

**Kết quả: TỆ HƠN** — `0.9318 → 0.8136`.

| Cấu hình head | Test Acc |
|---|---|
| `4096→4096→10` (baseline) | 0.9318 |
| `4096→4096→512→10` (thêm taper) | **0.8136** 💥 |
| **`1024→256→10`** (cắt nhỏ, 6,3M param) | **0.9571** ⭐ |

📌 **2 bài học:**
1. **Lớp output LUÔN nhảy thẳng xuống `n_classes`** — đó không phải chỗ để taper
2. **Thuốc đúng là CẮT FC head nhỏ lại**, không phải thêm tầng

## ⚙️ Quy ước

**GAP → 1 Dense nhỏ → `n_classes`**. Tránh `4096→4096` (16,8M param, gần như vô dụng).

---

## 🔗 Liên kết
- **Tiền đề:** [[kien-truc-cnn-4-tang]] · [[pooling]]
- **Dẫn tới:** [[vgg]] · [[resnet]]
