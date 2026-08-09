---
slug: lstm-cell-state
title: "LSTM — Cell state, đường cao tốc của bộ nhớ"
vault: dl
type: concept
branch: E
order: 12
status: done
tags: [dl, rnn, lstm]
prev: [cong-trong-rnn]
next: [lstm-cong-quen]
created: 2026-08-02
---

# LSTM — Cell state, đường cao tốc của bộ nhớ

> Tóm tắt 1 câu: Tách **bộ nhớ dài hạn `C`** khỏi **thông tin xuất ra `h`**, và cho `C` chạy trên một đường **chỉ có phép × và +**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #12 ← cần [[cong-trong-rnn]] · → kế tiếp [[lstm-cong-quen]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Dùng trong:** [[../../projects/viic-image-captioning|📦 viic-image-captioning]]
**Tags:** #dl #rnn #lstm

---

## 💡 Ý chính

Ví von dùng xuyên suốt 4 note LSTM:
- **`C` (cell state) = cuốn sổ tay** mang theo suốt hành trình — bộ nhớ dài hạn
- **`h` (hidden state) = câu mình nói ra** ở bước đó — thứ đi ra ngoài và sang bước sau

Vanilla RNN **gộp 2 thứ này làm một** nên nhớ gì là phải phun ra hết. LSTM tách đôi.

## 🧩 Trực giác — băng chuyền chạy trên nóc

Nhìn đường kẻ ngang trên cùng của sơ đồ (slide 28): `C_{t-1} ──×──+──→ C_t`

🔑 **Điều quan trọng nhất của cả bài: trên đường này chỉ có phép `×` và `+`.** Không ma trận, không `tanh`.

→ Đây là lý do bộ nhớ đi xa được — nó **không bị bóp méo** khi đi qua. Vanilla RNN không có đường này, mọi thứ đều phải chui qua `tanh(W·…)`.

## 🔢 Bên trong 1 ô LSTM

Vanilla RNN mỗi ô có **1 lớp** (`tanh`). LSTM mỗi ô có **4 lớp**: 3 hộp `σ` (= 3 cái van) + 1 hộp `tanh` (= nội dung mới).

```
f_t = σ(W_f·[h_{t-1}, x_t] + b_f)        ← [[lstm-cong-quen]]
i_t = σ(W_i·[h_{t-1}, x_t] + b_i)        ← [[lstm-cong-vao]]
C̃_t = tanh(W_C·[h_{t-1}, x_t] + b_C)
C_t = f_t * C_{t-1} + i_t * C̃_t          ← dòng quan trọng nhất
o_t = σ(W_o·[h_{t-1}, x_t] + b_o)        ← [[lstm-cong-ra]]
h_t = o_t * tanh(C_t)
```

Mọi phép nhân là **element-wise (Hadamard ⊙)**, không phải nhân ma trận.

## 🔑 "The + sign is the secret!" (slide 35)

`C_t = f·C_{t-1} + i·C̃` là phép **CỘNG**, không phải nhân chồng ma trận → gradient chảy ngược qua `C` **không bị nhân teo**.

📐 **Nối vào bảng `γ^T`**: đi ngược qua đường `C`, thừa số mỗi bước **chính là `f_t`**. Model **tự học** đặt `f_t ≈ 1` ⇒ `γ ≈ 1` ⇒ `γ^T ≈ 1` dù `T` lớn.
👉 **LSTM thắng không phải vì nó thông minh hơn, mà vì nó ĐƯỢC PHÉP CHỌN `γ`.**

Đây **cùng một mẹo** với [[resnet]] — xem kim chỉ nam #4 ở [[SECOND_BRAIN_DL]].

## ⚠️ Lỗi thường gặp

⚠️ **LSTM KHÔNG "giải quyết" vanishing gradient.** Slide 36 nói thẳng: nó chỉ làm việc học phụ thuộc xa **dễ hơn**, **không đảm bảo** hết vanishing/exploding. Vẫn phải [[exploding-gradient-clipnorm]].

📌 Ví dụ slide 36: **`f=1` và `i=0` → thông tin ô đó giữ VÔ THỜI HẠN**.

⚠️ Hai cách viết `W_f·[h_{t-1}, x_t]` (slide 30–33) và `W_f h^(t-1) + U_f x^(t)` (slide 34) là **MỘT** — nối 2 vector rồi nhân 1 ma trận rộng = nhân riêng 2 ma trận rồi cộng.

---

## 🔗 Liên kết
- **Tiền đề:** [[cong-trong-rnn]]
- **Dẫn tới:** [[lstm-cong-quen]] · [[lstm-cong-vao]] · [[lstm-cong-ra]] · [[gru]]
- **Liên quan tới:** [[resnet]]
