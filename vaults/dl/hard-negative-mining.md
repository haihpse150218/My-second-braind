---
slug: hard-negative-mining
title: Hard negative mining
vault: dl
type: concept
branch: D
order: 5
status: done
tags: [dl, metric-learning]
prev: [triplet-loss]
next: [quadruplet-loss]
created: 2026-08-02
---

# Hard negative mining

> Tóm tắt 1 câu: Không đào mẫu khó thì triplet loss về 0 mà **chưa học được gì** — nhưng đào khó quá thì model **sập**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh D · #5 ← cần [[triplet-loss]] · → kế tiếp [[quadruplet-loss]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #metric-learning

---

## 🔢 3 loại negative

```
          d(A,P)            d(A,P)+α
   ────────┬─────────────────┬──────────────────►  d(A,N)
           │                 │
   [HARD]  │  [SEMI-HARD]    │   [EASY]
  d(A,N) < │  ở giữa         │  d(A,N) > d(A,P)+α
  d(A,P)   │                 │
  gradient │  gradient tốt   │  loss = 0
  MẠNH     │  ⭐ NÊN DÙNG    │  ❌ VÔ DỤNG
  nhưng dễ │                 │
  sập model│                 │
```

## ⚙️ Quy tắc thực chiến

📌 **FaceNet dùng SEMI-HARD**:
- **Hard** quá → model **sập về nghiệm suy biến** (mọi embedding về cùng 1 điểm)
- **Easy** → không học được gì

📌 **Đào TRONG BATCH (online mining)**, đừng đào toàn tập — vừa rẻ, vừa tự cập nhật theo model hiện tại.

## 🔗 Cùng một vấn đề ở nhánh khác

| Nơi | Bản tương ứng |
|---|---|
| Detection | [[focal-loss]] — tự giảm trọng số mẫu dễ |
| Word2Vec | [[negative-sampling]] — chọn negative ngẫu nhiên theo phân phối tần suất |
| Self-supervised | [[infonce-ntxent]] — dùng `τ` để điều khiển độ "khó" |

📌 Đây là **cùng một bài toán**: dữ liệu ngập mẫu dễ, phải tìm cách dồn gradient cho mẫu khó.

---

## 🔗 Liên kết
- **Tiền đề:** [[triplet-loss]]
- **Dẫn tới:** [[quadruplet-loss]]
- **Liên quan tới:** [[focal-loss]] · [[negative-sampling]]
