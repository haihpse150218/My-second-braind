---
slug: n-pair-loss
title: N-pair Loss (2016)
vault: dl
type: concept
branch: D
order: 8
status: done
tags: [dl, metric-learning, loss]
prev: [lifted-structured-loss]
next: [infonce-ntxent]
created: 2026-08-02
---

# N-pair Loss (2016)

> Tóm tắt 1 câu: Đẩy anchor ra xa **N−1 lớp cùng một lúc** thay vì 1 lớp — hội tụ nhanh hơn hẳn triplet.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh D · #8 ← cần [[lifted-structured-loss]] · → kế tiếp [[infonce-ntxent]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #metric-learning #loss

---

## 🔢 Công thức

Đơn vị: 1 anchor + 1 positive + **`N−1` negative, mỗi negative một LỚP KHÁC NHAU**.

```
L = log( 1 + Σ exp( fᵀf_i⁻ − fᵀf⁺ ) )
              i≠y

⇔ chính là SOFTMAX CROSS-ENTROPY trên (N−1) negative
```

## 🧩 Điểm mới

```
TRIPLET:                  N-PAIR:
   A vs 1 lớp khác           A vs lớp 2, lớp 3, lớp 4, ..., lớp N
   ●──►│◄──●                 ●──►│◄──● ● ● ●
```

⭐ [[triplet-loss]] so với **1 lớp khác** mỗi lần; N-pair so với **N−1 lớp khác cùng lúc** ⇒ mỗi bước update đẩy anchor ra xa **nhiều lớp một lúc**.

## 🔗 Cầu nối quan trọng

📌 Đây là **cầu nối sang [[infonce-ntxent]]** — về hình thức gần như **trùng nhau**. Khác biệt chính: N-pair cần **nhãn** để biết lớp nào là negative; InfoNCE **không cần nhãn** (positive = bản augment khác của chính ảnh đó).

---

## 🔗 Liên kết
- **Tiền đề:** [[lifted-structured-loss]]
- **Dẫn tới:** [[infonce-ntxent]]
- **Liên quan tới:** [[negative-sampling]] — cũng là "softmax trên tập negative"
