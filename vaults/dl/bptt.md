---
slug: bptt
title: BPTT — Backpropagation Through Time
vault: dl
type: concept
branch: E
order: 7
status: done
tags: [dl, rnn]
prev: [trang-thai-khoi-dong-h0]
next: [vanishing-gradient-rnn]
created: 2026-08-02
---

# BPTT — Backpropagation Through Time

> Tóm tắt 1 câu: Lan ngược qua **thời gian** thay vì qua tầng — và vì quy tắc chuỗi là phép **nhân**, chuỗi càng dài thì tích càng suy biến.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #7 ← cần [[trang-thai-khoi-dong-h0]] · → kế tiếp [[vanishing-gradient-rnn]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn

---

## 💡 Ý chính

- RNN unroll ra `T` bước → coi như một mạng **sâu `T` tầng dùng chung trọng số**.
- Backprop chạy **ngược từ bước cuối về bước đầu** → gọi là *through time*.
- Gradient của `W_hh` là **tổng đóng góp từ mọi bước**.

## 🔢 Công thức / Định nghĩa

Quy tắc chuỗi là phép **NHÂN**:

```
∂J⁽⁴⁾/∂h⁽¹⁾ = (∂h⁽²⁾/∂h⁽¹⁾) × (∂h⁽³⁾/∂h⁽²⁾) × (∂h⁽⁴⁾/∂h⁽³⁾) × (∂J⁽⁴⁾/∂h⁽⁴⁾)
              └──────────── T thừa số, mỗi bước 1 cái ────────────┘
```

Muốn biết bước 1 ảnh hưởng loss ở bước 4 → nhân **3 thừa số**. Cách xa `T` bước → nhân **`T` thừa số**.

## ⚙️ Khi nào dùng

- **Truncated BPTT**: chuỗi rất dài thì chỉ lan ngược `k` bước gần nhất để tiết kiệm bộ nhớ.
- Bộ nhớ BPTT tỉ lệ với `T` — chuỗi dài → giảm batch size.

## ⚠️ Lỗi thường gặp

Chuỗi nhân này chính là gốc của [[vanishing-gradient-rnn]] (thừa số < 1) và [[exploding-gradient-clipnorm]] (thừa số > 1). Slide 21 nói đúng **cả 2 chiều**: *"exponentially decreasing/**increasing**"*.

📖 Đọc thêm (link trong slide 21): `dennybritz.com/posts/wildml/recurrent-neural-networks-tutorial-part-3/` · `mmuratarat.github.io/2019-02-07/bptt-of-rnn`

---

## 🔗 Liên kết
- **Tiền đề:** [[rnn-cong-thuc]] · [[backpropagation]]
- **Dẫn tới:** [[vanishing-gradient-rnn]] · [[exploding-gradient-clipnorm]]
