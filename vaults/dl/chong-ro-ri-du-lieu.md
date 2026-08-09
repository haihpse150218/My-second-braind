---
slug: chong-ro-ri-du-lieu
title: Chống rò rỉ dữ liệu (data leakage)
vault: dl
type: concept
branch: G
order: 3
status: done
tags: [dl, pipeline, leakage]
prev: [chia-train-val-test]
next: [group-leakage]
created: 2026-08-02
---

# Chống rò rỉ dữ liệu (data leakage)

> Tóm tắt 1 câu: Mọi thứ **"học từ dữ liệu"** phải học **chỉ từ train** — sai chỗ này là điểm test ảo cao, ra đời sụp.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #3 ← cần [[chia-train-val-test]] · → kế tiếp [[group-leakage]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #pipeline #leakage

---

## 💡 Vì sao đây là nỗi sợ đáng sợ nhất

Overfitting thì **test tệ** — mình biết mình sai. Leakage thì **cả test cũng cao** → **hỏng luôn thước đo, không biết mình sai.**

## ⚠️ Các đường rò của DL

| Đường rò | Phòng thủ |
|---|---|
| Thống kê normalize (mean/std) | Tính **chỉ từ train** |
| **Augmentation** | **CHỈ train** — đặt *trong* model (`x = data_augmentation(inputs)`) để Keras tự tắt khi `predict`/`evaluate` |
| **BatchNorm** moving stats | **Không bao giờ** truyền `training=True` lúc eval |
| `validation_split` của Keras | Cắt 10% CUỐI, không shuffle → tự tách stratified |
| Chọn epoch / threshold / kiến trúc | Dựa **validation**, test chạm 1 lần |

## 🔁 2 đường rò riêng của bài CHUỖI

- **Vocab / tokenizer xây từ cả tập** → phải xây **chỉ từ train**, từ lạ về `<UNK>`
- **Shuffle random dữ liệu có trục thời gian** → split **theo thời gian**; và **KHÔNG dùng [[bidirectional-rnn]]** ở bài sinh/dự báo

## 📝 Đường rò riêng của bài VĂN BẢN

**`TfidfVectorizer.fit_transform()` trên CẢ tập.** IDF là thống kê **học từ dữ liệu** ⇒ `.fit()` **chỉ trên train**, rồi `.transform()` cho val/test. Sai chỗ này điểm test **ảo cao** mà không có dấu hiệu gì.

## 💡 Kim chỉ nam

📌 **Kết quả đẹp bất thường → nghi rò rỉ TRƯỚC TIÊN, đừng ăn mừng.**
Đối xứng: **acc thấp bất thường → nghi cách chia data hoặc bug pipeline**, đừng vội đổ tại model.

---

## 🔗 Liên kết
- **Tiền đề:** [[chia-train-val-test]]
- **Dẫn tới:** [[group-leakage]] · [[sau-noi-so-ao-tuong]]
- **Liên quan tới:** [[tf-idf]] · [[padding-masking]] · [[batch-normalization]]
