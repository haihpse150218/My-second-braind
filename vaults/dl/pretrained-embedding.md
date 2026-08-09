---
slug: pretrained-embedding
title: Dùng pretrained embedding
vault: dl
type: concept
branch: F
order: 11
status: done
tags: [dl, nlp, embedding]
prev: [negative-sampling]
next: [danh-gia-embedding]
created: 2026-08-02
---

# Dùng pretrained embedding

> Tóm tắt 1 câu: Embedding layer chỉ là **bảng tra cứu** — và quyết định lớn nhất là `trainable=True` hay `False`.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh F · #11 ← cần [[negative-sampling]] · → kế tiếp [[danh-gia-embedding]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #embedding

---

## 💡 Embedding layer làm gì (slide 40)

`từ → index → vector`. Bản chất là một **bảng tra cứu** `(vocab_size × dim)`; lớp `Embedding` chỉ lấy đúng **dòng thứ `index`**. **Không có phép nhân ma trận nào cả.**

## 📚 Các bộ pretrained (slide 41)

| Bộ | Train trên | Điểm riêng |
|---|---|---|
| **Word2Vec** | Google News (**100B** token) | Bản gốc |
| **GloVe** | Common Crawl (**840B** token) | Vector "toàn cục", **mạnh nhất trong bảng slide 46** |
| **fastText** | Wikipedia, skip-gram + **subword** | ⭐ Xử lý được **từ chưa từng thấy** nhờ n-gram ký tự |
| **SL999** | skip-gram + tập **đồng nghĩa** | Thiên về synonym |

📌 **2 loại embedding khác mục đích**: **Relationship/Occurrences** (từ hay đi cùng nhau) vs **Synonym** (từ cùng nghĩa).
⚠️ Loại 1 xếp `tốt` và `tệ` **gần nhau** vì chúng cùng xuất hiện trong câu đánh giá → **làm sentiment mà dùng nhầm loại là hỏng**.

🇻🇳 Tiếng Việt: `fastText` tiếng Việt · **PhoW2V** · tốt nhất là **PhoBERT** ([[contextualized-embedding]]).

## 🔑 `trainable=True` hay `False`?

| | `False` (đóng băng) | `True` (fine-tune) |
|---|---|---|
| Khi nào | **Data ít** (< vài nghìn mẫu) | Data nhiều, domain đặc thù |
| Rủi ro | Không khớp domain | **Overfit, phá nát vector pretrain** |
| Mẹo | | Đóng băng vài epoch đầu **rồi mới** mở |

## ⚠️ Lỗi thường gặp

- ⚠️ **In ra tỉ lệ phủ (`coverage`)** — dưới ~**60%** thì bộ pretrain đó **không hợp domain**, đừng dùng.
- 🚩 **Tách từ phải KHỚP với lúc pretrain.** Bộ pretrain `word-based` mà đưa `syllable` vào → tra không ra, coverage sập, **không có lỗi nào báo**. Xem [[word-segmentation-tieng-viet]].
- ⚠️ **OOV không xử lý** → từ mới, viết tắt, teencode thành `<UNK>` hàng loạt. Dùng **fastText subword** hoặc BPE/WordPiece.
- ⚠️ **Bias trong embedding pretrain** — vector học luôn định kiến giới/nghề từ corpus. Kiểm analogy nhạy cảm trước khi deploy.

## ⚙️ Khoảng khuyến nghị

| Tham số | Khoảng |
|---|---|
| `embedding_dim` | **100–300** (300 là chuẩn pretrained) |
| Cửa sổ ngữ cảnh `m` | **5** — nhỏ → nắm **cú pháp**; lớn → nắm **chủ đề** |
| `min_count` | **2–5** |
| Vocab size | **10k–50k** |

---

## 🔗 Liên kết
- **Tiền đề:** [[negative-sampling]] · [[ma-tran-dong-xuat-hien]]
- **Dẫn tới:** [[danh-gia-embedding]]
- **Liên quan tới:** [[transfer-learning]] · [[word-segmentation-tieng-viet]]
