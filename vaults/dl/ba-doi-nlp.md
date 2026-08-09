---
slug: ba-doi-nlp
title: 3 đời NLP
vault: dl
type: concept
branch: F
order: 2
status: done
tags: [dl, nlp, lich-su]
prev: [bon-muc-nlp]
next: [word-segmentation-tieng-viet]
created: 2026-08-02
---

# 3 đời NLP

> Tóm tắt 1 câu: Rule-based → Statistical → Neural; biết mình đang đứng ở đâu để không đặt nhầm công cụ vào nhầm thời kỳ.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh F · #2 ← cần [[bon-muc-nlp]] · → kế tiếp [[word-segmentation-tieng-viet]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #lich-su

---

## 💡 Ý chính (slide 5–6)

| Đời | Thời gian | Cột mốc |
|---|---|---|
| **Rule-based** | 1950 → giữa 1980s | 1957 Chomsky *Syntactic Structures* · 1966 báo cáo **ALPAC** dập tắt kỳ vọng dịch máy |
| **Statistical NLP** | cuối 1980s → 2000 | 1985 RNN · 1989 HMM cho speech · **1997 LSTM** |
| **Neural machines** | 2000s → 2018 | **2013 Word2Vec** · 2014 seq2seq · **2017 Attention is All You Need** · 2018 BERT, GPT |
| **LLM** | 2019 → nay | GPT-3/4, LLaMA, Claude… |

## 🧩 Trực giác

📌 **S05 (LSTM 1997) + S06 (Word2Vec 2013) = đúng 2 viên gạch trước Transformer.** Học 2 buổi này là để hiểu **vì sao Transformer ra đời**, không phải để dùng LSTM đi làm sản phẩm mới.

## ⚠️ Lỗi thường gặp

⚠️ **Xếp nhầm [[tf-idf]] vào đời Rule-based.** TF-IDF thuộc đời **Statistical** (IDF: Spärck Jones 1972 · vector space model: Salton) — nó chính là **thứ đã THAY THẾ việc viết rule bằng tay**: thay vì người ngồi liệt kê "từ nào quan trọng", nó **đếm ra**.

Đời Rule-based là **ngữ pháp và từ điển viết tay**, không phải thống kê.

---

## 🔗 Liên kết
- **Tiền đề:** [[bon-muc-nlp]]
- **Liên quan tới:** [[tf-idf]] · [[word2vec]] · [[attention-qkv]]
