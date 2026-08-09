---
slug: word-segmentation-tieng-viet
title: Word segmentation tiếng Việt
vault: dl
type: concept
branch: F
order: 3
status: done
tags: [dl, nlp, tieng-viet]
prev: [ba-doi-nlp]
next: [one-hot-bag-of-words]
created: 2026-08-02
---

# Word segmentation tiếng Việt

> Tóm tắt 1 câu: Tiếng Việt tách theo khoảng trắng là **sai** — đó là bẫy số 1, và nó không nổ lỗi.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh F · #3 ← cần [[ba-doi-nlp]] · → kế tiếp [[one-hot-bag-of-words]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #tieng-viet

---

## 💡 Ý chính (slide 13)

Tiếng Anh: `space` = ranh giới từ, tách xong là chạy. **Tiếng Việt KHÔNG.**

```
"Thị trường chứng khoán đang đi xuống"
   tách theo space  →  7 âm tiết vô nghĩa
   đúng ra           →  5 từ: Thị_trường · chứng_khoán · đang · đi · xuống
```

| Kiểu | Ví dụ | Đánh giá |
|---|---|---|
| **Word-based** | `Thị_trường` | Đúng nghĩa, vocab lớn hơn, **cần bộ tách từ** |
| **Syllable-based** | `Thị`, `trường` | Đơn giản, vocab nhỏ, **mất nghĩa ghép** |

## ⚙️ Công cụ

`underthesea` · `pyvi` · `VnCoreNLP`

## ⚠️ Lỗi thường gặp

- 🚩 **PhoBERT BẮT BUỘC input đã tách từ.** Đưa text thô vào → **không lỗi, chỉ kém hẳn**.
- 🚩 **Tách từ lúc train phải KHỚP với bộ pretrained** đang dùng. Lệch → coverage sập, đa số từ thành `<UNK>`, **không có lỗi nào báo**.
- ⚠️ **Bỏ dấu tiếng Việt** (`má → ma`) là **phá nghĩa** — đừng làm trừ khi data vốn đã không dấu.
- ⚠️ **Bỏ stopword tốt cho [[tf-idf]] nhưng HẠI cho LSTM/BERT** — `"không"` là stopword mà xoá đi thì `"không tốt"` thành `"tốt"`, **đảo ngược nhãn**.
- ⚠️ **Đổi cách tách từ là đổi luôn điểm BLEU/ROUGE** → phải ghi rõ tokenizer trong báo cáo, xem [[metric-sinh-chuoi]].

---

## 🔗 Liên kết
- **Tiền đề:** [[ba-doi-nlp]]
- **Dẫn tới:** [[one-hot-bag-of-words]] · [[pretrained-embedding]]
- **Liên quan tới:** [[padding-masking]] · [[metric-sinh-chuoi]]
