---
slug: negative-sampling
title: Negative Sampling
vault: dl
type: concept
branch: F
order: 10
status: done
tags: [dl, nlp, embedding]
prev: [cbow-vs-skipgram]
next: [pretrained-embedding]
created: 2026-08-02
---

# Negative Sampling

> Tóm tắt 1 câu: Mẫu số softmax phải cộng qua **toàn bộ vocab** mỗi lần cập nhật — bất khả thi, nên chỉ lấy vài từ sai làm đối chứng.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh F · #10 ← cần [[cbow-vs-skipgram]] · → kế tiếp [[pretrained-embedding]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #embedding

---

## 💡 Vấn đề (slide 39 chỉ nói "slow to train", không nói vì sao)

```
            exp(u_oᵀ · v_c)
P(o|c) = ─────────────────────
          Σ_{w∈V} exp(u_wᵀ · v_c)    ← cộng qua TOÀN BỘ vocab
```

Vocab 50k ⇒ **mỗi** lần cập nhật phải tính **50.000 phép `exp`**. Nhân với hàng tỷ cặp huấn luyện → không chạy nổi.

## ⚙️ Lời giải

| Cách | Ý tưởng |
|---|---|
| **Negative Sampling** ⭐ | Thay bài toán "chọn 1 trong 50.000" bằng **nhiều bài nhị phân nhỏ**: cặp thật → nhãn 1; lấy ngẫu nhiên **5–20 từ sai** → nhãn 0 |
| **Hierarchical Softmax** | Xếp vocab thành cây nhị phân → chỉ tính `log₂(V)` ≈ 16 nút thay vì 50.000 |

`gensim` mặc định đã bật negative sampling — nhưng **phải biết để trả lời khi bị hỏi**.

## 🧩 Trực giác

Thay vì hỏi *"trong 50.000 từ thì từ nào đúng?"* → hỏi *"cặp này đúng hay sai?"* rồi lặp lại với vài cặp sai. Rẻ hơn hàng nghìn lần, kết quả gần như tương đương.

📌 **Nối sang metric learning**: `u_oᵀv_c` **kéo cặp đúng lại gần**, negative sampling **đẩy cặp sai ra xa** — đúng tinh thần [[contrastive-loss]] và [[infonce-ntxent]].

## ⚙️ Khoảng khuyến nghị

`negative samples = 5–20` (data nhỏ dùng 15–20).

---

## 🔗 Liên kết
- **Tiền đề:** [[cbow-vs-skipgram]]
- **Dẫn tới:** [[pretrained-embedding]]
- **Liên quan tới:** [[contrastive-loss]] · [[infonce-ntxent]]
