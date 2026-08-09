---
slug: stacked-rnn
title: Stacked (Multi-layer) RNN
vault: dl
type: concept
branch: E
order: 18
status: done
tags: [dl, rnn]
prev: [bidirectional-rnn]
next: [image-captioning]
created: 2026-08-02
---

# Stacked (Multi-layer) RNN

> Tóm tắt 1 câu: Hidden state của tầng `i` là input của tầng `i+1` — mạnh hơn, nhưng sâu quá thì cần skip connection.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #18 ← cần [[bidirectional-rnn]] · → kế tiếp [[image-captioning]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn

---

## 💡 Ý chính

- Còn gọi là **multi-layer RNN**. Xếp nhiều tầng RNN chồng lên nhau.
- Tầng dưới học **mẫu cục bộ**, tầng trên học **mẫu trừu tượng hơn** — cùng logic với xếp tầng conv ở [[kien-truc-cnn-4-tang]].
- Slide 40: mạnh hơn, **nhưng sâu thì cần skip connection**.

## ⚙️ Khi nào dùng

**Thực chiến: 2–3 tầng là đủ.** Sâu hơn thường chỉ đổi lấy thời gian train, không đổi được điểm.

⚠️ Chú ý phân biệt **2 chiều "sâu"** của RNN — chúng vanishing theo 2 kiểu khác nhau:

| Chiều | Chữa bằng |
|---|---|
| **Sâu theo TẦNG** (stacked) | **skip connection** kiểu [[resnet]] |
| **Dài theo THỜI GIAN** | **[[lstm-cell-state]] / [[gru]]** |

🚩 Skip connection giữa các tầng **không giúp gì** cho chuỗi 100 bước thời gian. Đây cũng là lý do slide 24 xếp ResNet ngang hàng LSTM là gây hiểu nhầm.

## ⚠️ Lỗi thường gặp

Ở Keras, tầng RNN **không phải cuối cùng** phải để `return_sequences=True`, nếu không tầng sau không có chuỗi để ăn.

---

## 🔗 Liên kết
- **Tiền đề:** [[bidirectional-rnn]]
- **Liên quan tới:** [[resnet]] · [[nam-dang-bai-sequence]]
