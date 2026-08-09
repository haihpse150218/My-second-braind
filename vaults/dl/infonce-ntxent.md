---
slug: infonce-ntxent
title: "InfoNCE / NT-Xent (SimCLR, MoCo, CLIP)"
vault: dl
type: concept
branch: D
order: 9
status: done
tags: [dl, metric-learning, self-supervised]
prev: [n-pair-loss]
next: [center-loss]
created: 2026-08-02
---

# InfoNCE / NT-Xent (SimCLR, MoCo, CLIP)

> Tóm tắt 1 câu: Positive = **bản augment khác của chính ảnh đó** ⇒ **không cần nhãn** — nền của self-supervised và CLIP.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh D · #9 ← cần [[n-pair-loss]] · → kế tiếp [[center-loss]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #metric-learning #self-supervised

---

## 🔢 Công thức

```
                exp( sim(zᵢ, zⱼ) / τ )
L = − log ──────────────────────────────────
           Σ  exp( sim(zᵢ, z_k) / τ )
          k≠i

  sim = COSINE similarity
  τ   = TEMPERATURE (~0.07 – 0.5)  ← siêu tham số quan trọng nhất
  zⱼ  = bản augment KHÁC của CHÍNH ẢNH i  ← chỗ "không cần nhãn"
```

## ⭐ Positive lấy từ đâu khi không có nhãn

**Augment cùng một ảnh 2 lần** → 2 bản đó là **positive của nhau**. Mọi ảnh khác trong batch = **negative**.

📌 Đây là lý do [[data-augmentation]] trở thành **thành phần cốt lõi**, không còn là phụ trợ.

## 🔑 Vai trò của `τ` (nhiệt độ)

```
τ NHỎ  (0.05) → phân phối NHỌN  → dồn sức vào negative KHÓ NHẤT → giống hard mining
τ LỚN  (0.5)  → phân phối PHẲNG → đối xử mọi negative gần như nhau
```

⇒ `τ` là **núm điều khiển độ khó** — thay cho việc đào mẫu thủ công ở [[hard-negative-mining]].

## ⚠️ Ưu / nhược

| ✅ Ưu | ❌ Nhược |
|---|---|
| **Không cần nhãn** — nền của CLIP, SimCLR, MoCo | **Rất đói batch size** (SimCLR dùng batch **4096**) |
| Không phải đào mẫu | MoCo sinh ra để vá điểm này bằng **memory queue** |

🔗 **Đây chính là loss huấn luyện CLIP** — và CLIP là backbone hay dùng nhất cho **multimodal** (ảnh ↔ text), rất liên quan tới [[image-captioning]].

---

## 🔗 Liên kết
- **Tiền đề:** [[n-pair-loss]]
- **Dẫn tới:** [[center-loss]]
- **Liên quan tới:** [[data-augmentation]] · [[negative-sampling]] · [[hard-negative-mining]]
