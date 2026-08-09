---
slug: lstm-cong-vao
title: LSTM — Input gate (cổng vào)
vault: dl
type: concept
branch: E
order: 14
status: done
tags: [dl, lstm]
prev: [lstm-cong-quen]
next: [lstm-cong-ra]
created: 2026-08-02
---

# LSTM — Input gate (cổng vào)

> Tóm tắt 1 câu: Hai phần tách bạch — `i_t` quyết định **ghi bao nhiêu %**, `C̃_t` quyết định **ghi nội dung gì**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #14 ← cần [[lstm-cong-quen]] · → kế tiếp [[lstm-cong-ra]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #lstm

---

## 🔢 Công thức (slide 31–32)

```
i_t = σ(W_i · [h_{t-1}, x_t] + b_i)      ← VAN:  ghi bao nhiêu %
C̃_t = tanh(W_C · [h_{t-1}, x_t] + b_C)   ← HÀNG: nội dung gì, giá trị [-1, 1]

C_t = f_t * C_{t-1}  +  i_t * C̃_t
      └ giữ sổ cũ ┘     └ ghi thêm mới ┘
```

## 💡 Ý chính

Đọc `C_t` thành lời: **"giữ lại phần cũ theo mức `f`, rồi cộng thêm phần mới theo mức `i`."**

Hai nhánh **độc lập nhau** — LSTM có thể vừa giữ hết cái cũ vừa ghi thêm mới (`f=1, i=1`), hoặc giữ nguyên không ghi gì (`f=1, i=0`).

## 🧩 Phân biệt van vs hàng — mẹo nhớ bằng hàm kích hoạt

| Thấy | Là gì | Khoảng giá trị |
|---|---|---|
| **`σ`** | **VAN** (bao nhiêu) | `[0, 1]` |
| **`tanh`** | **NỘI DUNG** (cái gì) | `[-1, 1]` |

Đây là chỗ nhầm nhiều nhất của cả bài LSTM.

## ⚠️ Lỗi thường gặp

Gọi `C̃_t` là "cổng" — **sai**. Nó không phải cổng, nó là **giá trị đề xuất**. Chỉ có 3 cổng: `f`, `i`, `o`.

---

## 🔗 Liên kết
- **Tiền đề:** [[lstm-cong-quen]]
- **Dẫn tới:** [[lstm-cong-ra]]
