---
slug: triplet-loss
title: "Triplet Loss (FaceNet, 2015) ⭐"
vault: dl
type: concept
branch: D
order: 4
status: done
tags: [dl, metric-learning, loss]
prev: [contrastive-loss]
next: [hard-negative-mining]
created: 2026-08-02
---

# Triplet Loss (FaceNet, 2015) ⭐

> Tóm tắt 1 câu: Ràng buộc **TƯƠNG ĐỐI** — chỉ cần P gần hơn N một khoảng `α`, không ép `d(A,P) = 0`.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh D · #4 ← cần [[contrastive-loss]] · → kế tiếp [[hard-negative-mining]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #metric-learning #loss

---

## 🔢 Công thức

Đơn vị: **BỘ BA** — Anchor `A`, Positive `P` (cùng người), Negative `N` (khác người).

```
L = max( 0 ,  ‖f(A) − f(P)‖²  −  ‖f(A) − f(N)‖²  +  α )

⇔  điều kiện muốn đạt:   ‖f(A) − f(P)‖² + α  <  ‖f(A) − f(N)‖²
                          └── gần ──┘  đệm      └──── xa ────┘
```

## 🧩 Hình học — điểm khác cốt tử so với contrastive

```
        TRƯỚC train                          SAU train
           N ●                                  N ●
                                                     ╲
      A ●    ● P                            A ●● P    ╲
   d(A,P) ≈ d(A,N)                     d(A,P) + α  <  d(A,N)
   → chưa phân biệt nổi                → có KHOẢNG ĐỆM α
```

⭐ **Cái hay**: không ép `d(A,P) = 0` như [[contrastive-loss]]. Chỉ cần **P gần hơn N một khoảng α** — cho phép **biến thiên tự nhiên trong lớp** (cùng người nhưng khác góc chụp, ánh sáng).

## ⚠️ Bẫy lớn nhất

🔥 Bốc triplet **ngẫu nhiên** thì **hầu hết đã thoả sẵn** điều kiện ⇒ `loss = 0` ⇒ **gradient ≈ 0** ⇒ **model không học được gì**.

⚠️ **Code chạy trơn tru, loss nhìn "đẹp" vì thấp** — không traceback, không dấu hiệu gì. Đúng kiểu [[bay-am-tham]].

→ Bắt buộc phải [[hard-negative-mining]].

---

## 🔗 Liên kết
- **Tiền đề:** [[contrastive-loss]]
- **Dẫn tới:** [[hard-negative-mining]] · [[quadruplet-loss]]
