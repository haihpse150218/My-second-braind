---
slug: contextualized-embedding
title: Contextualized Embedding
vault: dl
type: concept
branch: F
order: 13
status: done
tags: [dl, nlp, embedding, bert]
prev: [danh-gia-embedding]
created: 2026-08-02
---

# Contextualized Embedding

> Tóm tắt 1 câu: Word2Vec/GloVe cho **một từ một vector duy nhất** — nhưng `bank` là ngân hàng hay bờ sông?

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh F · #13 ← cần [[danh-gia-embedding]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #embedding #bert

---

## 💡 Vấn đề (slide 49–50)

- *"Most words have lots of meanings"*
- Slide gọi đúng tên: **one vector for each word TYPE** — vector gắn với **mặt chữ**, không gắn với **lần dùng cụ thể**
- Hệ quả: vector `bank` là **trung bình bị bôi nhoè** của mọi nghĩa → **sai cả hai**

```
v(bank) = (-0.224, 0.130, -0.290, 0.276)     ← dùng chung cho CẢ 2 nghĩa
```

## ✅ Lời giải

**Contextualized Word Embedding** — vector tính **theo ngữ cảnh từng lần xuất hiện**; cùng một từ ở 2 câu khác nhau cho **2 vector khác nhau**.

Dòng đời: **ELMo → BERT → PhoBERT**

## 🔗 Đây chính là cây cầu sang Transformer

- BERT là **bidirectional** — cùng khái niệm đã gặp ở [[bidirectional-rnn]]
- Và nó sinh embedding theo ngữ cảnh nhờ [[self-vs-cross-attention]]
- Cơ chế train của BERT (**Masked Language Model**) chính là **CBOW phóng to** → xem [[cbow-vs-skipgram]]

👉 **S05 + S06 gộp lại = lý do BERT tồn tại.**

## ⚙️ Khi nào dùng

| Tình huống | Chọn |
|---|---|
| Data rất ít, cần baseline | [[tf-idf]] + SVM |
| Có pretrained hợp domain | embedding đóng băng + BiLSTM |
| Nhiều từ mới / viết tắt | **fastText** (subword) |
| Bài có **từ đa nghĩa**, cần chính xác cao | **PhoBERT fine-tune** |

⚠️ **Tách đôi cho đúng** — luật *"data ít thì LSTM thắng Transformer"* chỉ đúng với **Transformer train from scratch**. Với **Transformer PRETRAIN** (PhoBERT, ViT5) thì ngược lại: phần "đói data" đã giải quyết ở bước pretrain.
→ Câu hỏi đúng không phải *"LSTM hay Transformer?"* mà là ***"có checkpoint pretrain tiếng Việt cho bài này không?"***

---

## 🔗 Liên kết
- **Tiền đề:** [[danh-gia-embedding]] · [[pretrained-embedding]]
- **Liên quan tới:** [[bidirectional-rnn]] · [[self-vs-cross-attention]] · [[cbow-vs-skipgram]]
