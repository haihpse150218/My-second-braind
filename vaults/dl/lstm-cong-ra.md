---
slug: lstm-cong-ra
title: LSTM — Output gate (cổng ra)
vault: dl
type: concept
branch: E
order: 15
status: done
tags: [dl, lstm]
prev: [lstm-cong-vao]
next: [gru]
created: 2026-08-02
---

# LSTM — Output gate (cổng ra)

> Tóm tắt 1 câu: Sổ tay chứa rất nhiều thứ, nhưng bước này chỉ **nói ra một phần** — đó là lý do phải tách `C` và `h`.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #15 ← cần [[lstm-cong-vao]] · → kế tiếp [[gru]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #lstm

---

## 🔢 Công thức (slide 33)

```
o_t = σ(W_o · [h_{t-1}, x_t] + b_o)
h_t = o_t * tanh(C_t)
```

`tanh(C_t)` ép sổ về `[-1, 1]`, rồi `o_t` **lọc** lấy phần cần.

## 🧩 Trực giác / Ví dụ

Sổ đang nhớ: *"chủ ngữ **số ít**"* + *"màu **nâu**"* + *"đang ở **công viên**"*.

Bước này cần sinh **động từ** → `o` chỉ mở ở chiều "số ít" để chia động từ cho đúng, các chiều kia đóng.

📌 **Đây chính là lý do phải tách `C` và `h`: `C` là cái NHỚ, `h` là cái NÓI.** Vanilla RNN gộp làm một nên nhớ gì là phải phun ra hết.

## 🔢 Chạy thử 1 bước bằng số (bộ nhớ 3 chiều)

`C_{t-1} = [0.8, -0.5, 0.2]`

| Bước | Giá trị | Diễn giải |
|---|---|---|
| `f_t` | `[1.0, 0.0, 0.5]` | chiều 1 **giữ hết**, chiều 2 **xoá sạch**, chiều 3 giữ nửa |
| `f * C_{t-1}` | `[0.8, 0.0, 0.1]` | |
| `i_t` | `[0.0, 0.9, 0.0]` | chỉ **ghi vào chiều 2** |
| `C̃_t` | `[0.3, 0.7, -0.4]` | nội dung đề xuất |
| **`C_t`** | **`[0.8, 0.63, 0.1]`** | cộng 2 dòng trên |
| `o_t` | `[1.0, 0.0, 0.0]` | chỉ **nói ra chiều 1** |
| **`h_t`** | **`[0.66, 0.0, 0.0]`** | `o * tanh(C_t)`, `tanh(0.8) ≈ 0.66` |

3 việc xảy ra **độc lập trên từng chiều**: chiều 1 giữ nguyên rồi nói ra · chiều 2 xoá rồi ghi đè nhưng giấu đi · chiều 3 phai một nửa, không nói.

👉 **`units=256` nghĩa là 256 bộ ba như thế chạy song song.**

---

## 🔗 Liên kết
- **Tiền đề:** [[lstm-cong-vao]]
- **Dẫn tới:** [[gru]]
