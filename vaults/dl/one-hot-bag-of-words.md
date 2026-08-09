---
slug: one-hot-bag-of-words
title: One-hot / Bag-of-Words
vault: dl
type: concept
branch: F
order: 4
status: done
tags: [dl, nlp, embedding]
prev: [word-segmentation-tieng-viet]
next: [tf-idf]
created: 2026-08-02
---

# One-hot / Bag-of-Words

> Tóm tắt 1 câu: Cách biểu diễn từ ngây thơ nhất — và 3 nhược điểm của nó chính là lý do tồn tại của mọi thứ phía sau.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh F · #4 ← cần [[word-segmentation-tieng-viet]] · → kế tiếp [[tf-idf]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #embedding

---

## 💡 Ý chính

Câu hỏi gốc của cả buổi S06 (slide 21): ***"Làm sao biểu diễn NGHĨA của một từ thành số?"***
Ảnh có sẵn pixel là số. **Chữ thì không có gì cả.**

One-hot: mỗi từ = vector toàn `0` trừ đúng 1 vị trí bằng `1`.
```
cat  → [1, 0, 0, 0, 0]
sat  → [0, 0, 0, 1, 0]
```

## ⚠️ 3 nhược điểm (slide 24) — nhớ để trả lời *"vì sao cần embedding?"*

1. **Không mang nghĩa và quan hệ giữa các từ** — `mèo` và `chó` xa nhau **đúng bằng** `mèo` và `ngân hàng`. Mọi cặp từ đều **vuông góc**.
2. **Phụ thuộc kích thước vocab** — vocab 50k thì mỗi từ là vector **50.000 chiều**.
3. **Mọi từ vai trò như nhau** — không phân biệt từ quan trọng với từ vô nghĩa.

Cộng thêm: **mất thứ tự từ** — `"chó cắn người"` = `"người cắn chó"`.

## 🧩 Đời trước nữa: WordNet (slide 21–22)

Từ điển đồng nghĩa **người viết tay**. Chết vì **đắt · dễ lỗi thời · chủ quan**.
📌 Bài học: **đừng gán nghĩa bằng tay, hãy học từ dữ liệu.**

## ⚙️ Khi nào dùng

Vẫn dùng làm **input cho lớp Embedding** — index one-hot chính là chỉ số dòng để tra bảng embedding. Xem [[pretrained-embedding]].

---

## 🔗 Liên kết
- **Tiền đề:** [[word-segmentation-tieng-viet]]
- **Dẫn tới:** [[tf-idf]] · [[distributional-semantics]]
