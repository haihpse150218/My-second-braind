---
slug: ragas
title: RAGAS — đo hệ RAG
vault: dl
type: concept
branch: G
order: 14
status: done
tags: [dl, danh-gia, rag]
prev: [llm-as-a-judge]
next: [colab-workflow]
created: 2026-08-02
---

# RAGAS — đo hệ RAG

> Tóm tắt 1 câu: RAG có 2 khâu (lấy tài liệu → sinh câu trả lời); RAGAS **tách đôi** để biết hỏng ở khâu nào.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #14 ← cần [[llm-as-a-judge]] · → kế tiếp [[colab-workflow]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #danh-gia #rag

---

## 💡 Vấn đề nó giải

Trả lời sai thì **lỗi ở khâu nào?** Đo BLEU trên câu trả lời cuối **không phân biệt được**.

📌 Đây **đúng y** điều slide 47 cảnh báo về extrinsic evaluation: *"Unclear if the **subsystem** is the problem or its interaction"*. **RAGAS chính là lời giải cho đúng vấn đề đó.**

## 🔢 4 metric chia theo khâu

| Metric | Khâu | Hỏi câu gì | Cần ground truth? |
|---|---|---|---|
| **Faithfulness** ⭐ | Sinh | Câu trả lời có **bám vào tài liệu** lấy được không? → **chống BỊA** | ❌ |
| **Answer Relevancy** | Sinh | Có trả lời **đúng trọng tâm**, không lan man? | ❌ |
| **Context Precision** | Lấy | Đoạn lấy về có **liên quan**, có **xếp lên đầu**? | Một phần |
| **Context Recall** | Lấy | Đã lấy **ĐỦ** thông tin để trả lời chưa? | ✅ |

## 🩺 Bảng chẩn đoán — đọc 2 số là biết sửa ở đâu

| Triệu chứng | Lỗi ở | Thuốc |
|---|---|---|
| **Context Recall thấp** | **RETRIEVAL** | Sửa chunking · đổi embedding · tăng `top-k` · thêm **BM25 hybrid** |
| Recall **cao** + **Faithfulness thấp** | **GENERATION** — có tài liệu đúng mà **vẫn bịa** | Prompt ép trích dẫn · hạ `temperature` · đổi model |
| Faithfulness cao + **Relevancy thấp** | Trung thực nhưng **lạc đề** | Sửa prompt, ép bám câu hỏi |
| **Context Precision thấp** | Lấy về **quá nhiều rác** | Giảm `top-k` · thêm **rerank** |

## ⚠️ Lỗi thường gặp

- 🚩 **RAGAS chạy bằng [[llm-as-a-judge]] dưới nắp** ⇒ **thừa hưởng TOÀN BỘ 6 thiên vị**. Vẫn phải kiểm chứng với người.
- 🇻🇳 **Embedding mặc định của RAGAS là tiếng Anh** → **bắt buộc đổi**, không thì điểm vô nghĩa mà không báo lỗi.
- 🎯 **Đừng dùng thừa**: nếu thiết kế là *"phân loại ý định → trả đáp án soạn sẵn"* thì **KHÔNG có khâu sinh** ⇒ **không cần** Faithfulness/Relevancy. Đúng metric là **macro-F1** + **Recall@k · MRR · nDCG**.

---

## 🔗 Liên kết
- **Tiền đề:** [[llm-as-a-judge]]
- **Liên quan tới:** [[tf-idf]] (BM25) · [[metric-sinh-chuoi]]
