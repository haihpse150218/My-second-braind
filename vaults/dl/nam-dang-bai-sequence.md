---
slug: nam-dang-bai-sequence
title: 5 dạng bài sequence
vault: dl
type: concept
branch: E
order: 4
status: done
tags: [dl, rnn, sequence]
prev: [rnn-uu-nhuoc]
next: [padding-masking]
created: 2026-08-02
---

# 5 dạng bài sequence

> Tóm tắt 1 câu: Chốt dạng bài **trước khi gõ code** — nó quyết định luôn shape output và `return_sequences`.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #4 ← cần [[rnn-uu-nhuoc]] · → kế tiếp [[padding-masking]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn #sequence

---

## 💡 Ý chính

| Dạng | Input → Output | Ví dụ | Shape output |
|---|---|---|---|
| **one-to-one** | 1 → 1 | ảnh → nhãn (**không cần RNN**) | `(B, C)` |
| **one-to-many** | 1 → N | ⭐ [[image-captioning]], sinh nhạc | `(B, T, V)` |
| **many-to-one** | N → 1 | sentiment, phân loại video, action prediction | `(B, C)` |
| **many-to-many (đồng bộ)** | N → N, khớp từng bước | POS/NER tagging | `(B, T, C)` |
| **many-to-many (seq2seq)** | N → M, độ dài khác nhau | dịch máy, tóm tắt | encoder–decoder |

## ⚙️ Khi nào dùng

- Đọc xong 1 chuỗi mới ra 1 output → **`return_sequences=False`** (lấy `h` cuối)
- Mỗi bước 1 output → **`return_sequences=True`** + `TimeDistributed(Dense)`
- Input/output **khác độ dài** → **bắt buộc encoder–decoder**, không nhét vào 1 RNN được

## ⚠️ Lỗi thường gặp

🚩 **Nhầm `return_sequences` là bug im lặng số 1.** Shape lệch thì Keras báo lỗi — nhưng nếu **tình cờ khớp** thì loss vẫn giảm mà **model đang học sai bài**. Luôn `model.summary()` rồi đối chiếu bảng trên.

---

## 🔗 Liên kết
- **Tiền đề:** [[rnn-uu-nhuoc]]
- **Dẫn tới:** [[padding-masking]] · [[image-captioning]]
