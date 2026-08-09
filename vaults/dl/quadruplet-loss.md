---
slug: quadruplet-loss
title: Quadruplet Loss (2017)
vault: dl
type: concept
branch: D
order: 6
status: done
tags: [dl, metric-learning, loss]
prev: [hard-negative-mining]
next: [lifted-structured-loss]
created: 2026-08-02
---

# Quadruplet Loss (2017)

> Tóm tắt 1 câu: Thêm một ràng buộc **liên lớp** không phụ thuộc anchor — chữa chỗ triplet chỉ quan tâm khoảng cách "so với A".

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh D · #6 ← cần [[hard-negative-mining]] · → kế tiếp [[lifted-structured-loss]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #metric-learning #loss

---

## 🔢 Công thức

Đơn vị: **BỘ BỐN** — `A`, `P`, `N₁`, `N₂` (`N₁`, `N₂` thuộc 2 lớp khác nhau và khác lớp của A).

```
L = max(0, d(A,P)² − d(A,N₁)² + α₁)        ← y hệt triplet
  + max(0, d(A,P)² − d(N₁,N₂)² + α₂)       ← MỚI: ràng buộc liên lớp
                     └────────┘
              khoảng cách giữa 2 lớp KHÁC, không liên quan A

thường  α₂ < α₁
```

## 💡 Vì sao cần vế thứ 2

[[triplet-loss]] chỉ đảm bảo *"P gần A hơn N"* — **đo mọi thứ tương đối với A**. Kết quả: các lớp khác nhau vẫn có thể **chen sát nhau** ở vùng xa A.

Vế thứ 2 ép **khoảng cách giữa 2 lớp bất kỳ** cũng phải lớn hơn khoảng cách trong lớp ⇒ **cụm chặt hơn, tách rõ hơn** trên toàn không gian.

## ⚠️ Lỗi thường gặp

Thêm một loss là thêm một siêu tham số (`α₂`) — cùng vấn đề "2 loss khác thang" ở [[multitask-loss]]. Nhìn **2 vế riêng**, đừng nhìn tổng.

---

## 🔗 Liên kết
- **Tiền đề:** [[triplet-loss]] · [[hard-negative-mining]]
- **Dẫn tới:** [[lifted-structured-loss]]
