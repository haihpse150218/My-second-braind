---
slug: tf-idf
title: TF-IDF
vault: dl
type: concept
branch: F
order: 5
status: done
tags: [dl, nlp, tf-idf]
prev: [one-hot-bag-of-words]
next: [distributional-semantics]
created: 2026-08-02
---

# TF-IDF

> Tóm tắt 1 câu: Từ xuất hiện **nhiều trong 1 văn bản** nhưng **hiếm ở các văn bản khác** thì đó là từ đặc trưng — thuần thống kê, không cần train.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh F · #5 ← cần [[one-hot-bag-of-words]] · → kế tiếp [[distributional-semantics]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #tf-idf

---

## 🔢 Công thức (slide 25–26)

```
tf(i,j) = n(i,j) / Σ_k n(k,j)        ← từ i chiếm bao nhiêu % của văn bản j
idf(i)  = log( |D| / số văn bản chứa từ i )
                    ↑ càng nhiều văn bản chứa ⇒ idf càng NHỎ
TF-IDF  = tf(i,j) × idf(i)
```

📌 Ví dụ slide 26: `"apple"` nhiều trong 1 bài ⇒ quan trọng với bài đó. Nhưng nếu **bài nào cũng có** ⇒ **không phân biệt được gì** ⇒ idf kéo điểm xuống.

## 🔢 Ví dụ chạy tay — corpus hỏi đáp học vụ, `|D| = 4`

| | Văn bản (đã tách từ) | Số từ |
|---|---|---|
| D1 | `cho_em hỏi học_phí học_kỳ này bao_nhiêu` | 6 |
| D2 | `cho_em hỏi học_phí nộp trước ngày nào` | 7 |
| **D3** | `cho_em hỏi điều_kiện tốt_nghiệp là gì` | **6** |
| D4 | `cho_em hỏi thủ_tục bảo_lưu là gì` | 6 |

Tính cho **D3** — mọi từ xuất hiện 1 lần nên `tf = 1/6 ≈ 0.167` **như nhau hết** (TF một mình **không phân biệt được gì**):

| Từ | df | idf = log₁₀(4/df) | **TF-IDF** |
|---|---|---|---|
| `điều_kiện` | 1 | 0.602 | **0.100** ⭐ |
| `tốt_nghiệp` | 1 | 0.602 | **0.100** ⭐ |
| `là` | 2 | 0.301 | 0.050 |
| `gì` | 2 | 0.301 | 0.050 |
| `cho_em` | **4** | **0** | **0.000** |
| `hỏi` | **4** | **0** | **0.000** |

🔑 `điều_kiện` + `tốt_nghiệp` lên đầu — **đúng là ý định của câu hỏi**. `cho_em hỏi` về đúng `0` dù chiếm 1/3 số từ, **mà không cần khai báo stopword nào**.

## 💡 Vì sao TF-IDF vẫn sống tới hôm nay

| # | Lý do | Cụ thể |
|---|---|---|
| 1 | **Baseline mạnh khi data ít** | Vài trăm–vài nghìn mẫu → **rất hay thắng** deep learning |
| 2 | **Rẻ** | Không cần train · chạy **CPU** · mili-giây |
| 3 | **Giải thích được** ⭐ | Chỉ thẳng ra từ nào quyết định ⇒ viết được rule / danh sách từ khoá. Embedding `[0.236, -0.141, …]` **không nói cho ai biết điều gì** |
| 4 | **Gốc của retrieval** | **BM25 là hậu duệ trực tiếp**, tới nay vẫn là một nửa của **hybrid search trong RAG** |

## ⚠️ Lỗi thường gặp

🚩 **Gõ vào sklearn ra số KHÁC — không phải mình tính sai:**

| | Công thức slide | `sklearn.TfidfVectorizer` |
|---|---|---|
| TF | chia cho **độ dài văn bản** | **đếm thô**, chuẩn hoá **L2** ở cuối |
| IDF | `log(\|D\|/df)` | `ln((1+\|D\|)/(1+df)) + 1` |
| Từ có ở **mọi** văn bản | idf = **0** → xoá sạch | idf = **1** → **KHÔNG xoá** |

→ Muốn loại `cho_em hỏi` thật thì dùng **`max_df=0.9`** hoặc `stop_words`. Cơ số log **không quan trọng** — chỉ nhân cả cột với hằng số.

🚩 **`fit_transform` trên CẢ tập là leakage** — IDF là thống kê học từ dữ liệu → `.fit()` **chỉ trên train**. Xem [[chong-ro-ri-du-lieu]].

⚠️ **Nhược điểm (slide 27)**: không quan tâm **nghĩa và quan hệ từ trong câu**; **mất thứ tự từ**; vector **thưa và rất dài**.

---

## 🔗 Liên kết
- **Tiền đề:** [[one-hot-bag-of-words]]
- **Dẫn tới:** [[distributional-semantics]]
- **Liên quan tới:** [[chong-ro-ri-du-lieu]] · [[ba-doi-nlp]]
