---
slug: vanishing-gradient
title: Vanishing gradient (theo chiều SÂU)
vault: dl
type: concept
branch: A
order: 10
status: done
tags: [dl, nen-tang, training]
prev: [backpropagation]
created: 2026-08-02
---

# Vanishing gradient (theo chiều SÂU)

> Tóm tắt 1 câu: `0.25¹⁰ ≈ 0.0000001` — sigmoid nhân chồng 10 tầng là gradient tắt ngóm, tầng đầu không học được gì.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh A · #10 ← cần [[backpropagation]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nen-tang #training

---

## 🔢 Con số

Đạo hàm sigmoid `h(1−h)` **tối đa 0.25**:

| Số tầng | Gradient còn lại |
|---|---|
| 5 | `0.25⁵ ≈ 0.001` |
| 10 | `0.25¹⁰ ≈ 0.0000001` |

⇒ Tầng gần input **gần như không nhận được tín hiệu học**.

## ⚙️ 3 cách chữa — nhớ theo CHIỀU

| Chiều bị vanishing | Thuốc |
|---|---|
| **SÂU** (số tầng) | **[[relu-vs-sigmoid]]** (đạo hàm = 1) · **[[resnet]]** (skip = đổi nhân thành cộng) · [[batch-normalization]] |
| **DÀI** (số bước thời gian) | **[[lstm-cell-state]] / [[gru]]** → xem [[vanishing-gradient-rnn]] |

🚩 **Đừng đổi chỗ 2 cột này.** ReLU không cứu được chuỗi 100 bước; LSTM không cứu được mạng 152 tầng.

## ⚠️ Phân biệt với DEGRADATION PROBLEM

🔥 **Bẫy lớn nhất của S02 (slide 46–47)**: 56-layer tệ hơn 20-layer **KHÔNG PHẢI overfitting**.

- Overfit = train **tốt** + test **tệ**
- Ở đây **train cũng tệ** ⇒ **loại**
- Tên đúng: **degradation problem** — đây là bài toán **tối ưu**, không phải bài toán tổng quát hoá

→ Và [[resnet]] chính là lời giải cho nó.

---

## 🔗 Liên kết
- **Tiền đề:** [[backpropagation]]
- **Dẫn tới:** [[resnet]] · [[relu-vs-sigmoid]]
- **Liên quan tới:** [[vanishing-gradient-rnn]]
