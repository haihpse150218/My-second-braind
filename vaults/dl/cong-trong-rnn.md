---
slug: cong-trong-rnn
title: Cổng (Gate) trong RNN — vì sao phải chế ra
vault: dl
type: concept
branch: E
order: 11
status: done
tags: [dl, rnn, lstm]
prev: [loi-tich-luy-chuoi-dai]
next: [lstm-cell-state]
created: 2026-08-02
---

# Cổng (Gate) trong RNN — vì sao phải chế ra

> Tóm tắt 1 câu: Vanilla RNN **bắt buộc ghi đè** trạng thái mỗi bước; cổng là cái van cho mạng **tự quyết định cho qua bao nhiêu**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #11 ← cần [[loi-tich-luy-chuoi-dai]] · → kế tiếp [[lstm-cell-state]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn #lstm

---

## 💡 Bệnh của vanilla RNN

```
h_t = tanh(W_hh · h_{t-1} + W_xh · x_t)
      └── h_{t-1} bị nhân ma trận + bóp tanh, MỖI BƯỚC, KHÔNG NGOẠI LỆ ──┘
```

Muốn nhớ 1 thông tin qua 50 bước → nó phải **sống sót qua 50 lần biến dạng**. Không có đường nào để "cứ để yên đấy".

## 🔢 Lời giải: chèn một cái VAN

```
Γ = σ(W·x_t + U·h_{t-1} + b)        (slide 26)
    └── σ ép ra [0, 1] = phần trăm mở van ──┘
```

`Γ = 1` → **mở toang, đi thẳng, y nguyên** · `Γ = 0` → **đóng, chặn sạch** · `Γ = 0.3` → cho qua 30%

## 🔑 Cổng biến `γ` từ "số trời cho" thành "số mạng TỰ CHỌN"

| | Vanilla RNN | Có cổng (LSTM/GRU) |
|---|---|---|
| `γ` mỗi bước | bị `tanh'` và `W_hh` **ép nhỏ**, không cãi được | **= `f_t`, do mạng tự đặt** |
| Giữ thông tin xa | phải may mắn | đặt `f ≈ 1` là **giữ vô thời hạn** |
| Quên thông tin cũ | không chủ động được | đặt `f ≈ 0` là **xoá ngay** |

## ⚠️ Nói cho chuẩn — cổng KHÔNG bỏ việc "truyền liên tiếp"

RNN **vẫn chạy tuần tự**, `h` vẫn đi qua từng mắt xích (nên vẫn chậm). Cái được bỏ là **tính BẮT BUỘC BIẾN DẠNG**: giờ mỗi bước **có thể là phép đồng nhất** (`f=1, i=0` → `C_t = C_{t-1}`). **Truyền vẫn truyền, nhưng được phép truyền y nguyên.**

## 💡 3 tính chất của cổng, hay bị bỏ sót

1. **Học được** — `W, U, b` là tham số train, không phải hyperparameter chỉnh tay
2. **Phụ thuộc ngữ cảnh** — tính từ `x_t` và `h_{t-1}`, nên **cùng một model** giữ một từ suốt 50 bước ở câu này, vứt ngay ở câu khác
3. **Element-wise** — cổng là **vector**. `units=256` nghĩa là **256 cái van độc lập**

## ❓ Vì sao là `σ` mà không phải `if/else`?

Vì `if` **không có đạo hàm** → không backprop được. `σ` là bản "mềm" của công tắc: vẫn cho 0–1 nhưng **mượt và khả vi**.

🧭 **Mọi cổng đều CÙNG MỘT công thức**, chỉ khác bộ trọng số. LSTM 3 cổng + GRU 2 cổng = **1 công thức dùng 5 lần**.

---

## 🔗 Liên kết
- **Tiền đề:** [[vanishing-gradient-rnn]]
- **Dẫn tới:** [[lstm-cell-state]] · [[gru]]
- **Liên quan tới:** [[attention-qkv]] — cũng là phép "chọn mềm", nhưng theo vị trí thay vì theo thời gian
