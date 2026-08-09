---
slug: distributional-semantics
title: Distributional Semantics
vault: dl
type: concept
branch: F
order: 6
status: done
tags: [dl, nlp, embedding]
prev: [tf-idf]
next: [ma-tran-dong-xuat-hien]
created: 2026-08-02
---

# Distributional Semantics

> Tóm tắt 1 câu: *"Nghĩa của một từ được quyết định bởi những từ thường xuất hiện quanh nó."*

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh F · #6 ← cần [[tf-idf]] · → kế tiếp [[ma-tran-dong-xuat-hien]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #embedding

---

## 💡 Ý chính (slide 28)

- Khi từ `w` xuất hiện, **ngữ cảnh** của nó là tập các từ nằm gần (trong một **cửa sổ cố định**).
- Dùng **rất nhiều ngữ cảnh** của `w` để dựng nên biểu diễn của `w`.

Ví dụ slide: `banking` luôn đứng cạnh *crises · regulation · system* ⇒ **chính đám từ đó định nghĩa `banking`**.

## 🧭 Mạch suy luận của cả mục

```
Cần biểu diễn QUAN HỆ giữa các từ
   └─→ Distributional semantics: nghĩa nằm ở NGỮ CẢNH   (slide 28)
        └─→ ⇒ dùng WORD VECTOR                          (slide 29)
             ├─→ ① MA TRẬN → SVD/PCA        (ĐẾM)
             └─→ ② NEURAL NETWORK           (ĐOÁN)      (slide 30)
```

## 🧩 Word vector là gì (slide 29)

Còn gọi **word embedding** / **(neural) word representation**. Là **distributed representation** — nghĩa được **trải ra trên nhiều chiều**, không nằm ở một ô duy nhất như one-hot.

| | [[one-hot-bag-of-words]] | Word embedding |
|---|---|---|
| Chiều | `\|V\|` (hàng chục nghìn) | **100–300 cố định** |
| Kiểu vector | thưa | **dày đặc** |
| Biết `mèo ≈ chó`? | ❌ | ✅ |

## ⚠️ Lỗi thường gặp

Tưởng 2 từ giống nhau là 2 từ **hay đứng cạnh nhau** — **sai**. Chúng giống nhau vì **có CHUNG hàng xóm**. Xem ví dụ ma trận ở [[ma-tran-dong-xuat-hien]].

---

## 🔗 Liên kết
- **Tiền đề:** [[tf-idf]]
- **Dẫn tới:** [[ma-tran-dong-xuat-hien]] · [[word2vec]]
