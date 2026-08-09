---
slug: bidirectional-rnn
title: Bidirectional RNN
vault: dl
type: concept
branch: E
order: 17
status: done
tags: [dl, rnn]
prev: [gru]
next: [stacked-rnn]
created: 2026-08-02
---

# Bidirectional RNN

> Tóm tắt 1 câu: 1 RNN xuôi + 1 RNN ngược, nối hidden state lại — nhưng **chỉ dùng được khi có TRỌN chuỗi input ngay từ đầu**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #17 ← cần [[gru]] · → kế tiếp [[stacked-rnn]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn

---

## 💡 Ý chính

- Chạy **2 RNN độc lập**: một xuôi `→`, một ngược `←`
- **Nối (concat)** hidden state của 2 chiều tại mỗi vị trí → mỗi vị trí thấy **cả trái lẫn phải**
- Slide 39 lấy ví dụ **BERT** là model bidirectional mạnh

## 🚩 Ràng buộc cứng — đây là chỗ dễ sai nhất

**Chỉ dùng được khi có TRỌN chuỗi input ngay từ đầu.**

| | Được dùng? |
|---|---|
| Tagging (POS, NER) | ✅ |
| Sentiment / phân loại câu | ✅ |
| **Encoder** của seq2seq | ✅ |
| **Decoder** sinh từng token (caption, dịch) | ❌ **CẤM** |
| Dự báo chuỗi thời gian | ❌ **CẤM** |

Dùng ở bài sinh/dự báo = **nhìn trộm tương lai = leakage**. Val đẹp, deploy sụp.

## ⚙️ Khi nào dùng

Bài **hiểu** (understanding) thì bật, bài **sinh** (generation) thì tắt. Nhớ theo đúng điều kiện #3 ở [[rnn-uu-nhuoc]].

## ⚠️ Lỗi thường gặp

Bật `Bidirectional` cho model dự báo giá/nhu cầu → điểm validation cao bất thường. Nghi ngay leakage, đừng ăn mừng. Xem [[chong-ro-ri-du-lieu]].

---

## 🔗 Liên kết
- **Tiền đề:** [[gru]] · [[rnn-uu-nhuoc]]
- **Dẫn tới:** [[stacked-rnn]] · [[contextualized-embedding]]
- **Liên quan tới:** [[chong-ro-ri-du-lieu]]
