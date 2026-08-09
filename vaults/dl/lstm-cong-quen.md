---
slug: lstm-cong-quen
title: LSTM — Forget gate (cổng quên)
vault: dl
type: concept
branch: E
order: 13
status: done
tags: [dl, lstm]
prev: [lstm-cell-state]
next: [lstm-cong-vao]
created: 2026-08-02
---

# LSTM — Forget gate (cổng quên)

> Tóm tắt 1 câu: Nhìn câu vừa nói và từ đang đọc, quyết định **giữ lại bao nhiêu** của bộ nhớ cũ.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #13 ← cần [[lstm-cell-state]] · → kế tiếp [[lstm-cong-vao]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #lstm

---

## 🔢 Công thức (slide 30)

```
f_t = σ(W_f · [h_{t-1}, x_t] + b_f)
```

Slide ghi rõ: `f = 1` là *"completely keep this"*, `f = 0` là *"completely get rid of this"*.

## 🧩 Trực giác / Ví dụ

Đang kể về **con mèo**, gặp từ mới **"con chó"** → cổng quên bật gần `0` ở những chiều đang lưu "mèo", để xoá đi mà ghi con mới.

Trong ngữ pháp: gặp chủ ngữ mới → quên giới tính/số của chủ ngữ cũ.

## ⚙️ Vì sao nó là cổng quan trọng nhất

Đi ngược qua đường cell state, **thừa số gradient mỗi bước chính là `f_t`**. Model tự đặt `f ≈ 1` cho thông tin cần giữ ⇒ `γ ≈ 1` ⇒ không teo dù chuỗi dài. Xem bảng `γ^T` ở [[vanishing-gradient-rnn]].

## ⚠️ Lỗi thường gặp

- Nhầm chiều: `f = 0` là **xoá**, không phải "quên = 0 nên giữ lại". Đọc là *"giữ lại bao nhiêu phần trăm"*.
- Một số bản cài đặt khởi tạo `b_f = 1` để **ban đầu thiên về GIỮ** — mẹo thực chiến giúp học phụ thuộc xa dễ hơn ở giai đoạn đầu.

---

## 🔗 Liên kết
- **Tiền đề:** [[lstm-cell-state]]
- **Dẫn tới:** [[lstm-cong-vao]]
