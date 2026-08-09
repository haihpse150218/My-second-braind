---
slug: bon-muc-nlp
title: 4 mức của NLP
vault: dl
type: concept
branch: F
order: 1
status: done
tags: [dl, nlp]
next: [ba-doi-nlp]
created: 2026-08-02
---

# 4 mức của NLP

> Tóm tắt 1 câu: Âm thanh → từ → cú pháp → ngữ cảnh; biết bài mình ở mức nào là biết cần công cụ gì.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh F · #1 → kế tiếp [[ba-doi-nlp]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp

---

## 💡 Ý chính (slide 8)

| Mức | Đơn vị | Ứng dụng |
|---|---|---|
| **Phonemes** | âm thanh | Speech-to-Text · TTS · nhận diện người nói |
| **Morphemes & Lexemes** | **TỪ** | **Tokenization · Word Embedding · POS tagging** ⭐ trọng tâm S06 |
| **Syntax** | cụm từ, câu | Parsing · Entity Extraction · Relation Extraction |
| **Context** | nghĩa toàn văn | Summarization · Topic Modeling · Sentiment |

## 🧩 Các bài tagging hay gặp

- **POS tagging** (slide 9) — gán từ loại: `fox [NN]`, `jumps [VBZ]`
- **NER** (slide 10) — nhận diện thực thể: `Elon Musk [PERSON]`, `Twitter [ORG]`
- **Coreference resolution** (slide 11) — nối đại từ về danh từ nó thay thế: *"he"* → *"Tin Woodman"*

## ⚙️ Khi nào dùng

Bài của mình ở mức nào → quyết định luôn cần bao nhiêu công. Sentiment nằm ở mức **Context** nhưng vẫn làm được bằng embedding + LSTM; Parsing ở mức **Syntax** thì embedding không đủ.

📌 **Summarization có 2 loại** (slide 16):
- **Extractive** — trích nguyên câu có sẵn (an toàn, **không bịa**)
- **Abstractive** — viết lại bằng từ mới (hay hơn nhưng **bịa được**)

## ⚠️ Lỗi thường gặp

Chọn kiến trúc trước khi xác định mức bài toán → làm thừa hoặc làm thiếu.

---

## 🔗 Liên kết
- **Dẫn tới:** [[ba-doi-nlp]] · [[word-segmentation-tieng-viet]]
