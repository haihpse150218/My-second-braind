---
slug: loi-tich-luy-chuoi-dai
title: "Lỗi tích luỹ — sai 1 bước, hỏng cả câu"
vault: dl
type: concept
branch: E
order: 10
status: done
tags: [dl, rnn, sinh-chuoi]
prev: [exploding-gradient-clipnorm]
next: [cong-trong-rnn]
created: 2026-08-02
---

# Lỗi tích luỹ — sai 1 bước, hỏng cả câu

> Tóm tắt 1 câu: Output bước này là input bước sau ⇒ một bước sai bơm cái sai vào **toàn bộ phần còn lại**; chuỗi càng dài xác suất đúng trọn càng tụt.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #10 ← cần [[exploding-gradient-clipnorm]] · → kế tiếp [[cong-trong-rnn]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn #sinh-chuoi

---

## 🔢 Con số cho dễ nhớ

Mỗi bước đúng với xác suất `p` ⇒ đúng **trọn chuỗi** dài `T` chỉ còn `p^T`:

| `p` mỗi bước | `T=5` | `T=10` | `T=20` | `T=50` |
|---|---|---|---|---|
| 0.99 | 0.95 | 0.90 | 0.82 | 0.61 |
| **0.95** | 0.77 | 0.60 | **0.36** | 0.08 |
| 0.90 | 0.59 | 0.35 | 0.12 | 0.005 |

→ **95% mỗi từ nghe rất giỏi, nhưng caption 20 từ chỉ ~36% đúng trọn vẹn.** Đây là lý do accuracy theo token **luôn đẹp hơn** chất lượng câu thật.

## ⚠️ Đừng lẫn với vanishing gradient — hỏng theo 2 kiểu ngược nhau

| | **Vanishing gradient** | **Lỗi tích luỹ** |
|---|---|---|
| Xảy ra lúc nào | **TRAIN** — lúc lan ngược | **INFERENCE** — lúc sinh xuôi |
| Hỏng cái gì | Model **không học được** phụ thuộc xa | Model học rồi vẫn **sinh ra rác** |
| Triệu chứng | Loss chững sớm | `val_loss` **đẹp** mà caption **lặp từ / lạc đề** |
| Thuốc | LSTM/GRU · skip · clip | Beam search · scheduled sampling · attention |

## ⚙️ Thuốc — xếp theo hiệu quả/công sức

1. **[[beam-search]]** (`k = 3–5`) — giữ nhiều câu ứng viên, một bước lỡ tay không giết cả câu. Rẻ nhất, làm ngay
2. **[[attention-qkv]]** — mỗi bước nhìn thẳng lại input gốc, không chỉ dựa vào `h` đã nhiễm sai
3. **Scheduled sampling** — lúc train thỉnh thoảng feed từ model tự đoán *(chỉnh khó, làm sau)*
4. **Rút ngắn chuỗi** — `T` nhỏ đi là `p^T` lên ngay

## ⚠️ Lỗi thường gặp

✅ **Cách phát hiện duy nhất: chạy vòng lặp inference thật và ĐỌC bằng mắt.** Loss theo token **không bao giờ** lộ ra lỗi này — nó chấm từng bước với input đúng, đúng cái điều kiện mà inference **không có**.

---

## 🔗 Liên kết
- **Tiền đề:** [[exploding-gradient-clipnorm]]
- **Liên quan tới:** [[teacher-forcing]] · [[beam-search]] · [[metric-sinh-chuoi]]
