---
slug: image-captioning
title: Image Captioning — CNN encoder + RNN decoder
vault: dl
type: concept
branch: E
order: 19
status: done
tags: [dl, rnn, captioning, do-an]
prev: [stacked-rnn, trang-thai-khoi-dong-h0]
next: [teacher-forcing]
created: 2026-08-02
---

# Image Captioning — CNN encoder + RNN decoder

> Tóm tắt 1 câu: CNN nén ảnh thành một vector, tiêm vector đó vào RNN, rồi decoder sinh từng từ tới khi gặp `<END>`.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #19 ← cần [[stacked-rnn]] + [[trang-thai-khoi-dong-h0]] · → kế tiếp [[teacher-forcing]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn #captioning #do-an

---

## 💡 Ý chính — 3 bước (slide 42–49)

**B1 — Encoder**: đưa ảnh qua CNN pretrain (slide dùng VGG), **CẮT BỎ `FC-1000` + `softmax`**, lấy vector `FC-4096` làm `v`.
📌 Bỏ softmax vì ta cần **đặc trưng ảnh**, không cần **nhãn 1000 lớp ImageNet**.

**B2 — Tiêm ảnh vào RNN**: thêm đúng **một số hạng**:
```
trước:  h = tanh(W_xh·x + W_hh·h)
sau:    h = tanh(W_xh·x + W_hh·h + W_ih·v)      ← W_ih·v là ảnh
```

**B3 — Decode từng bước**: `x0 = <START>` → `h0` → `y0` = "straw" → **feed "straw" làm input bước sau** → "hat" → … → sinh ra **`<END>` thì DỪNG**.

## ⚙️ Khi nào dùng

Đây là dạng **one-to-many** ([[nam-dang-bai-sequence]]). Cũng là bộ khung của **đồ án ViIC**.

## ⚠️ Lỗi thường gặp

- ⚠️ **Phải có `max_length` cứng** ngoài `<END>` — model chưa train tốt sẽ **sinh vô hạn**, treo vòng lặp.
- 🚩 **Quên tiêm ảnh vào `h_0`** → vẫn sinh câu trôi chảy nhưng **không liên quan ảnh**. Kiểm: 2 ảnh khác hẳn nhau phải cho 2 caption khác nhau.
- 🚩 **Split theo ẢNH, không theo caption** — 1 ảnh nhiều caption, chia theo caption là [[group-leakage]].
- ⚠️ Chọn best checkpoint theo **CIDEr**, không theo `val_loss` — xem [[metric-sinh-chuoi]].

## 🚀 Nâng cấp so với slide

Slide tiêm `v` **một lần** vào state đầu → tới từ thứ 15 model gần như quên ảnh.
Bản mạnh hơn: **Attention** (*Show, Attend and Tell*) — mỗi bước sinh từ thì **nhìn lại vùng ảnh khác nhau** → [[attention-qkv]].

---

## 🔗 Liên kết
- **Tiền đề:** [[trang-thai-khoi-dong-h0]] · [[nam-dang-bai-sequence]]
- **Dẫn tới:** [[teacher-forcing]] · [[beam-search]] · [[attention-qkv]]
- **Liên quan tới:** [[metric-sinh-chuoi]] · [[transfer-learning]]
