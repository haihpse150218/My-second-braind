---
slug: exploding-gradient-clipnorm
title: Exploding gradient & gradient clipping
vault: dl
type: concept
branch: E
order: 9
status: done
tags: [dl, rnn, training]
prev: [vanishing-gradient-rnn]
next: [loi-tich-luy-chuoi-dai]
created: 2026-08-02
---

# Exploding gradient & gradient clipping

> Tóm tắt 1 câu: Anh em sinh đôi của vanishing — cùng công thức `γ^T` nhưng `γ > 1`, và chữa bằng cách **hoàn toàn ngược lại**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #9 ← cần [[vanishing-gradient-rnn]] · → kế tiếp [[loi-tich-luy-chuoi-dai]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn #training

---

## 💡 Ý chính

- Cùng công thức `γ^T`, chỉ khác **`γ > 1`** → loss **NaN / bùng lên** giữa chừng.
- **Thuốc: `clipnorm=1.0`** (hoặc `clipvalue`) — chặn **độ dài** vector gradient, **giữ nguyên hướng**.
- Với RNN thì **gần như luôn bật**.

## 🧭 Nhớ đối xứng — đây là chỗ hay lẫn nhất

| | Vanishing | Exploding |
|---|---|---|
| `γ` | **< 1** | **> 1** |
| Triệu chứng | loss **chững sớm**, học rất chậm | loss **NaN / bùng lên** đột ngột |
| Chữa bằng | **KIẾN TRÚC** (LSTM · skip connection) | **CLIPPING** |

**Không đổi chỗ được**: clip không cứu được vanishing, và đổi sang LSTM **không** miễn nhiễm exploding (slide 36 nói rõ).

## ⚙️ Khi nào dùng

```python
optimizer = tf.keras.optimizers.Adam(learning_rate=1e-3, clipnorm=1.0)
```

## ⚠️ Lỗi thường gặp

- Thấy NaN là **đổ tại learning rate cao** rồi hạ LR mãi — trong khi nguyên nhân là exploding gradient, chỉ cần clip.
- Slide S05 **không dạy** phần này, nhưng slide 21 đã ghi *"exponentially decreasing/**increasing**"* — tức là đã ám chỉ cả 2 chiều.

---

## 🔗 Liên kết
- **Tiền đề:** [[vanishing-gradient-rnn]]
- **Liên quan tới:** [[relu-vs-sigmoid]] · [[batch-size-va-learning-rate]]
