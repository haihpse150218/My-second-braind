---
slug: contrastive-loss
title: Contrastive Loss (2006)
vault: dl
type: concept
branch: D
order: 3
status: done
tags: [dl, metric-learning, loss]
prev: [face-verification-vs-recognition]
next: [triplet-loss]
created: 2026-08-02
---

# Contrastive Loss (2006)

> Tóm tắt 1 câu: Đơn vị là **CẶP** — cùng lớp kéo về 0, khác lớp đẩy ra tới bán kính `m` rồi thôi.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh D · #3 ← cần [[face-verification-vs-recognition]] · → kế tiếp [[triplet-loss]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #metric-learning #loss

---

## 🔢 Công thức (Hadsell, Chopra & LeCun)

```
L = y · D²  +  (1 − y) · max(0, m − D)²

  y = 1  CÙNG lớp   → chỉ còn D²        → KÉO VỀ 0
  y = 0  KHÁC lớp   → max(0, m − D)²    → ĐẨY RA cho tới khi D ≥ m rồi THÔI
  D = ‖f(x₁) − f(x₂)‖ ,  m = margin
```

## 🧩 Hình học

```
   cùng lớp                        khác lớp
   ●──►◄──●                     ●◄──      ──►●
   kéo sát nhau                 đẩy ra tới bán kính m
   (không có đáy)               |←──── m ────→|
                                vượt m rồi thì KHÔNG đẩy nữa (loss = 0)
```

## ⚠️ Nhược điểm — chính là lý do triplet ra đời

| ✅ Ưu | ❌ Nhược |
|---|---|
| Đơn giản nhất, ít siêu tham số (chỉ `m`) | **Margin TUYỆT ĐỐI** — ép mọi cặp khác lớp cách đúng `m`, **không quan tâm ngữ cảnh** |
| | Cặp cùng lớp bị kéo về **0 tuyệt đối** → **mất biến thiên tự nhiên trong lớp** |
| | Không so sánh **tương đối** giữa positive và negative của cùng một anchor |

---

## 🔗 Liên kết
- **Tiền đề:** [[face-verification-vs-recognition]]
- **Dẫn tới:** [[triplet-loss]]
- **Liên quan tới:** [[negative-sampling]] · [[infonce-ntxent]]
