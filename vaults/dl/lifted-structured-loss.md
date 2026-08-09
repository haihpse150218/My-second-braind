---
slug: lifted-structured-loss
title: Lifted Structured Loss (2016)
vault: dl
type: concept
branch: D
order: 7
status: done
tags: [dl, metric-learning, loss]
prev: [quadruplet-loss]
next: [n-pair-loss]
created: 2026-08-02
---

# Lifted Structured Loss (2016)

> Tóm tắt 1 câu: Triplet dùng **1 negative** mỗi cặp — phí cả batch; loss này dùng **toàn bộ ma trận khoảng cách**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh D · #7 ← cần [[quadruplet-loss]] · → kế tiếp [[n-pair-loss]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #metric-learning #loss

---

## 🔢 Công thức

```
J(i,j) = log[ Σ exp(α − D_ik)  +  Σ exp(α − D_jl) ]  +  D_ij
             k: negative của i    l: negative của j

L = 1/(2|P|) · Σ max(0, J(i,j))²
```

## 🧩 Hình học — khai thác batch

```
TRIPLET:              LIFTED STRUCTURED:
   A ● ── ● N            A ●───● N₁
     │                     │╲ ╲
     ● P                   │ ╲ ╲── ● N₂
                           │  ╲
1 positive, 1 negative     ● P  ╲── ● N₃

                      1 positive vs TẤT CẢ negative trong batch
```

## 🔑 `log Σ exp(·)` là gì

Đó là **xấp xỉ MƯỢT của `max`**. Thay vì chỉ phạt negative **khó nhất** (gãy, khó tối ưu), nó phạt **có trọng số** — negative càng khó trọng số càng lớn.

📌 Cùng ý tưởng "làm mềm phép chọn cứng" đã gặp ở [[cong-trong-rnn]] và [[attention-qkv]].

## ⚠️ Ưu / nhược

| ✅ Ưu | ❌ Nhược |
|---|---|
| Tận dụng **O(B²)** cặp thay vì O(B) | **Phụ thuộc batch size** rất mạnh |
| Không phải đào triplet thủ công | Tốn bộ nhớ cho ma trận khoảng cách |

---

## 🔗 Liên kết
- **Tiền đề:** [[quadruplet-loss]]
- **Dẫn tới:** [[n-pair-loss]]
