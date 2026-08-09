---
slug: rnn-cong-thuc
title: Công thức Vanilla RNN (Elman RNN)
vault: dl
type: concept
branch: E
order: 2
status: done
tags: [dl, rnn]
prev: [rnn-la-gi]
next: [rnn-uu-nhuoc]
created: 2026-08-02
---

# Công thức Vanilla RNN (Elman RNN)

> Tóm tắt 1 câu: Trạng thái mới = hàm của (quá khứ, hiện tại) — và **cùng một bộ trọng số dùng lại cho mọi bước thời gian**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #2 ← cần [[rnn-la-gi]] · → kế tiếp [[rnn-uu-nhuoc]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn

---

## 💡 Ý chính

- Dạng tổng quát: `h_t = f_W(h_{t-1}, x_t)` · `y_t = f_Wo(h_t)`
- Bản Vanilla (còn gọi **Elman RNN**, theo Jeffrey Elman) dùng `tanh`.
- 📌 **Weight sharing là điểm mấu chốt**: `W` **dùng chung cho MỌI bước thời gian** → model size **không tăng** theo độ dài chuỗi. Đây là lý do RNN xử lý được input dài tuỳ ý.

## 🔢 Công thức / Định nghĩa

```
h_t = tanh(W_hh · h_{t-1} + W_xh · x_t)      ← trạng thái mới = f(quá khứ, hiện tại)
y_t = W_hy · h_t
```

| Ký hiệu | Ý nghĩa |
|---|---|
| `W_xh` | input → hidden |
| `W_hh` | hidden → hidden (chỗ mang bộ nhớ qua thời gian) |
| `W_hy` | hidden → output |
| `h_t` | trạng thái ẩn tại bước `t` |

## 🧩 Trực giác / Ví dụ

Nhớ 3 ma trận bằng tên chỉ số: chữ đầu là **từ đâu**, chữ sau là **tới đâu**.

`W_hh` là ma trận **duy nhất** chịu trách nhiệm mang thông tin qua thời gian — và cũng chính nó gây ra [[vanishing-gradient-rnn]].

## ⚠️ Lỗi thường gặp

- Tưởng mỗi bước có một bộ trọng số riêng → sai, **chỉ có một bộ**, dùng lại N lần.
- Quên `h_0` phải được nạp sẵn ở bước đầu → xem [[trang-thai-khoi-dong-h0]].

---

## 🔗 Liên kết
- **Tiền đề:** [[rnn-la-gi]]
- **Dẫn tới:** [[rnn-uu-nhuoc]] · [[bptt]] · [[trang-thai-khoi-dong-h0]]
