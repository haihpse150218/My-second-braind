---
slug: arcface-cosface-sphereface
title: SphereFace → CosFace → ArcFace
vault: dl
type: concept
branch: D
order: 11
status: done
tags: [dl, metric-learning, loss, face]
prev: [center-loss]
created: 2026-08-02
---

# SphereFace → CosFace → ArcFace

> Tóm tắt 1 câu: **Cùng một ý, khác chỗ đặt margin** — nhân vào góc, trừ trên cosine, hay cộng vào góc.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh D · #11 ← cần [[center-loss]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #metric-learning #loss #face

---

## 💡 Điểm xuất phát: softmax thường KHÔNG đủ cho face

```
Softmax thường chỉ yêu cầu:   phân đúng lớp
                              → chỉ cần nằm ĐÚNG PHÍA của ranh giới

Face recognition cần:         embedding cùng người phải CHỤM
                              và các lớp phải CÁCH XA nhau
                              → cần thêm KHE HỞ (margin)
```

## 🔢 Ba biến thể

Sau khi **chuẩn hoá cả `W` lẫn `f`**, logit của lớp `y` chính là `cos θ_y` (θ = góc giữa embedding và proxy lớp).

| Loss | Năm | Logit của lớp đúng | Kiểu margin |
|---|---|---|---|
| Softmax (chuẩn hoá) | — | `s · cos(θ_y)` | không có |
| **SphereFace** (A-Softmax) | 2017 | `s · cos(m · θ_y)` | **NHÂN** vào góc |
| **CosFace** (LMCL) | 2018 | `s · (cos θ_y − m)` | **TRỪ** trên cosine |
| **ArcFace** ⭐ | 2019 | `s · cos(θ_y + m)` | **CỘNG** vào góc |

Giá trị hay dùng: `s = 64` · **ArcFace `m = 0.5`** · **CosFace `m = 0.35`**

## 🧩 Hình học trên mặt cầu đơn vị

Embedding đã L2-normalize ⇒ mọi thứ nằm **trên mặt cầu**:

```
              W₁ (proxy lớp 1)
                ↑
            θ₁ ╱│
              ╱ │            SOFTMAX  : chỉ cần  θ₁ < θ₂
       f ●───╯  │            ARCFACE  : cần      θ₁ + m < θ₂
              ╲ │                                └─────┘
            θ₂ ╲│                              ép thêm KHE HỞ GÓC
                ↓
              W₂ (proxy lớp 2)
```

## ⚙️ Vì sao họ B thắng họ A trong thực chiến

| | Họ A (pair/tuple) | **Họ B (proxy)** |
|---|---|---|
| Đào mẫu | ⚠️ **Bắt buộc**, mệt, dễ sập | ✅ **Không cần** |
| Ổn định | Phụ thuộc batch | ✅ Train **ổn định như softmax thường** |
| Số lớp | ✅ Không cần biết trước | ⚠️ **Cần biết TRƯỚC** (có ma trận `W`) |

📌 **ArcFace là mặc định thực chiến cho face recognition** khi biết trước số danh tính lúc train.

---

## 🔗 Liên kết
- **Tiền đề:** [[center-loss]] · [[face-verification-vs-recognition]]
- **Liên quan tới:** [[triplet-loss]] · [[loss-function-dl]]
