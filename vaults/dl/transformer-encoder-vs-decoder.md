---
slug: transformer-encoder-vs-decoder
title: Transformer Encoder vs Decoder — khác đúng 1 thứ
vault: dl
type: concept
branch: H
order: 9
status: done
tags: [dl, transformer, s07]
prev: [transformer-block]
next: [bert]
created: 2026-08-09
---

# Transformer Encoder vs Decoder — khác đúng 1 thứ

> Tóm tắt 1 câu: Encoder và Decoder **cùng một khối**, khác biệt duy nhất là **có mask hay không** — và từ đúng một khác biệt đó sinh ra hai dòng model chia đôi cả NLP hiện đại.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh H · #9 ← cần [[transformer-block]] · → kế tiếp [[bert]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #transformer #s07

---

## 💡 Ý chính

Slide 43 nói thẳng:

> *"The only difference is that we remove the masking in the self-attention. **No Masking!**"*

| | **Decoder** | **Encoder** |
|---|---|---|
| Self-attention | **Masked** ([[masked-self-attention]]) | **Không mask** |
| Nhìn được | chỉ **quá khứ** — unidirectional | **cả hai phía** — bidirectional |
| Tương đương RNN | RNN thường | [[bidirectional-rnn]] |
| Model tiêu biểu | **GPT** | **BERT** |
| Hợp bài | **sinh** chuỗi | **hiểu** chuỗi |

📌 Đây là chỗ nối rất gọn với nhánh chuỗi: câu hỏi *"muốn ngữ cảnh 2 chiều thì làm sao?"* ở RNN được trả lời bằng **BiLSTM**; ở Transformer được trả lời bằng **bỏ mask đi**.

## 🔢 Sơ đồ đầy đủ — có ĐÚNG 3 chỗ attention (slide 41)

```
  ENCODER (N×)                    DECODER (N×)
  ┌───────────────┐               ┌──────────────────────┐
  │ Multi-Head    │               │ MASKED Multi-Head    │ ① self, có mask
  │ Attention     │ ② self,       │ Attention            │
  │ Add & Norm    │   không mask  │ Add & Norm           │
  │ Feed Forward  │               │ Multi-Head Attention │ ③ CROSS: Q←decoder,
  │ Add & Norm    │──────────────→│ Add & Norm           │    K,V←encoder
  └───────────────┘               │ Feed Forward         │
       ↑                          │ Add & Norm           │
  + Positional Enc                └──────────────────────┘
       ↑                                    ↑        ↓
  Input Embedding                  + Positional Enc  Linear → Softmax
  Input: (input_seq,)              Output Embedding  → (target_seq, vocab_size)
                                   Outputs (SHIFTED RIGHT)
```

| # | Tên | Q từ đâu | K, V từ đâu |
|---|---|---|---|
| ① | Masked self-attention | decoder | decoder |
| ② | Self-attention | encoder | encoder |
| ③ | **Cross-attention** | **decoder** | **encoder** |

🔑 **③ chính là chỗ nối 2 bên** — là hậu duệ trực tiếp của attention-trên-RNN ở [[attention-qkv]], nơi decoder "hỏi" encoder *"giờ nên nhìn phần nào của câu nguồn?"*.

## ⚙️ 3 họ kiến trúc — chọn theo bài

| Họ | Dùng gì | Hợp bài | Ví dụ |
|---|---|---|---|
| **Encoder-only** | encoder, không mask | **Hiểu**: phân loại, sentiment, NER, QA trích xuất, tìm kiếm ngữ nghĩa | BERT, PhoBERT, RoBERTa |
| **Decoder-only** | decoder, có mask, **bỏ cross** | **Sinh tự do**: language model, chatbot, viết tiếp | GPT, LLaMA, Claude |
| **Encoder-Decoder** | đủ 3 chỗ attention | **Biến chuỗi A → chuỗi B**: dịch máy, tóm tắt, **image captioning** | T5, BART, ViT+Transformer decoder |

📌 **Đồ án ViIC nằm ở dòng thứ 3**: ảnh (encoder) → caption tiếng Việt (decoder). Xem [[show-attend-tell]].

## ⚠️ Lỗi thường gặp

- 🚩 **"Outputs (shifted right)"** không phải chi tiết trang trí. Decoder nhận **câu đích dịch phải 1 bước** (thêm `<START>` đầu, bỏ token cuối) để vị trí `t` **dự đoán** token `t`, chứ không phải **đọc** nó. Quên shift ⇒ model học chép y nguyên input ⇒ **loss gần 0 mà inference ra rác**. Cùng một họ lỗi với quên mask.
- ⚠️ **Encoder-only KHÔNG sinh chuỗi được** dù có thêm head gì. BERT không phải model sinh — muốn sinh thì cần decoder.
- ⚠️ **Đừng nhầm "decoder-only" là thiếu thốn.** Bỏ encoder không phải mất năng lực: prompt được nhét thẳng vào chuỗi, self-attention lo phần nối. Đó là lý do toàn bộ LLM hiện đại là decoder-only.

---

## 🔗 Liên kết
- **Tiền đề:** [[transformer-block]] · [[masked-self-attention]]
- **Dẫn tới:** [[bert]] · [[show-attend-tell]]
- **Liên quan tới:** [[bidirectional-rnn]] · [[self-vs-cross-attention]] · [[attention-qkv]] · [[detr]]

## 📚 Nguồn
- `Session07-Attention&Transformer.pdf` slide 41–43
