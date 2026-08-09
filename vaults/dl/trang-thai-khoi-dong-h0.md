---
slug: trang-thai-khoi-dong-h0
title: Trạng thái khởi động `h_0`
vault: dl
type: concept
branch: E
order: 6
status: done
tags: [dl, rnn]
prev: [padding-masking]
next: [bptt]
created: 2026-08-02
---

# Trạng thái khởi động `h_0`

> Tóm tắt 1 câu: Bước đầu tiên chưa có quá khứ nào → phải **chế ra một tín hiệu mặc định**, và đó cũng chính là chỗ tiêm ngữ cảnh vào RNN.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #6 ← cần [[padding-masking]] · → kế tiếp [[bptt]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn

---

## 💡 Ý chính

Công thức cần `h_{t-1}`, nhưng ở `t = 1` **chưa có quá khứ nào cả** → bắt buộc nạp sẵn một `h_0`. Trên slide nó là mũi tên `h_0` đi vào từ bên trái, hoặc ký hiệu `a^<0>`.

**Mặc định `h_0` = vector 0.** Keras/PyTorch tự làm — không cần khai báo.

## ⚠️ Đừng lẫn 2 loại "tín hiệu khởi động" — chúng đi vào 2 cửa khác nhau

| | Đi vào cửa nào | Là gì | Dùng ở đâu |
|---|---|---|---|
| **`h_0`** | cửa **trạng thái** (`h_{t-1}`) | vector số, mặc định **toàn 0** | **Mọi** bài RNN |
| **`<START>`** | cửa **input** (`x_t`) | một **token thật trong vocab**, có embedding riêng | Chỉ bài **sinh chuỗi** |

## 🔑 `h_0` là chỗ "tiêm ngữ cảnh" — 3 cách dùng

- **Bài thường** (sentiment, tagging): `h_0 = 0` — không có gì để tiêm
- **[[image-captioning]]**: `h_0` được nạp **vector ảnh** `v` → `h = tanh(W_xh·x + W_hh·h + W_ih·v)`. **Bức ảnh CHÍNH LÀ tín hiệu khởi động.**
- **Seq2seq** (dịch, tóm tắt): `h_0` của **decoder** = `h` **cuối cùng** của encoder — đây là toàn bộ cách encoder "bàn giao" nghĩa của câu nguồn.

## ⚠️ Lỗi thường gặp

🚩 **`stateful=True` — bẫy im lặng.** Bật cờ này thì `h_0` của batch sau = `h` cuối của batch trước, **không reset về 0**. Chỉ đúng khi các batch là **cùng một chuỗi dài cắt ra**. Nếu là các chuỗi độc lập → phải `model.reset_states()`, không thì **ngữ cảnh câu A rò sang câu B**.

🚩 **Captioning mà quên tiêm ảnh vào `h_0`** → vẫn sinh ra câu trôi chảy nhưng **không liên quan gì đến ảnh**. Kiểm: đưa 2 ảnh khác hẳn nhau vào, caption phải khác nhau.

---

## 🔗 Liên kết
- **Tiền đề:** [[rnn-cong-thuc]] · [[padding-masking]]
- **Dẫn tới:** [[image-captioning]]
