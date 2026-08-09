---
slug: gru
title: GRU — bản rút gọn của LSTM
vault: dl
type: concept
branch: E
order: 16
status: done
tags: [dl, rnn, gru]
prev: [lstm-cong-ra]
next: [bidirectional-rnn]
created: 2026-08-02
---

# GRU — bản rút gọn của LSTM

> Tóm tắt 1 câu: Bỏ hẳn cell state, chỉ còn `h` gánh cả 2 vai, và gộp forget + input thành **một** núm duy nhất.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #16 ← cần [[lstm-cong-ra]] · → kế tiếp [[bidirectional-rnn]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn #gru

---

## 🔢 Công thức (slide 38)

```
z_t = σ(W_z · [h_{t-1}, x_t])          ← update gate
r_t = σ(W_r · [h_{t-1}, x_t])          ← reset gate
h̃_t = tanh(W · [r_t * h_{t-1}, x_t])   ← candidate, quá khứ đã bị reset lọc
h_t = (1 - z_t) * h_{t-1} + z_t * h̃_t
```

## 💡 Ý chính

- **Bỏ hẳn cell state** — chỉ còn `h` gánh cả 2 vai (bộ nhớ + output)
- Chỉ **2 cổng** thay vì 3 → **ít param hơn ~25%**, train nhanh hơn
- 📌 `z` gộp forget + input thành **một** núm: `(1-z)` giữ cũ, `z` lấy mới, **tổng luôn = 1**. LSTM thì `f` và `i` **độc lập** nhau
- Vẫn cùng mẹo "cộng": `(1-z)·h_{t-1}` là đường đi thẳng cho gradient

## ⚙️ Chọn LSTM hay GRU

| Tình huống | Chọn |
|---|---|
| Data **ít** · chuỗi **ngắn** · cần **nhanh** | **GRU** |
| Data **nhiều** · chuỗi **dài** · cần kiểm soát bộ nhớ kỹ | **LSTM** |

⚠️ Chênh lệch giữa 2 cái thường **nhỏ hơn nhiễu run-to-run** → đừng tốn ngày để so, chạy nhiều seed rồi hãy kết luận.

## ⚠️ Lỗi thường gặp

🚩 **Đính chính slide 38**: slide viết reset gate quyết định *"whether the previous **cell state** is important"* — **GRU không có cell state**. Đúng phải là **previous hidden state**.

---

## 🔗 Liên kết
- **Tiền đề:** [[lstm-cell-state]] · [[lstm-cong-ra]]
- **Dẫn tới:** [[bidirectional-rnn]]
