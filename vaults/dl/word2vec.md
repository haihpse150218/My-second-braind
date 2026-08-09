---
slug: word2vec
title: Word2Vec (cách ĐOÁN)
vault: dl
type: concept
branch: F
order: 8
status: done
tags: [dl, nlp, embedding]
prev: [ma-tran-dong-xuat-hien]
next: [cbow-vs-skipgram]
created: 2026-08-02
---

# Word2Vec (cách ĐOÁN)

> Tóm tắt 1 câu: Bài toán "đoán từ" chỉ là **cái cớ** — dựng lên để ép các vector tự sắp xếp cho có nghĩa, xong việc thì vứt luôn bài toán.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh F · #8 ← cần [[ma-tran-dong-xuat-hien]] · → kế tiếp [[cbow-vs-skipgram]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #embedding

---

## 📖 Đọc slide 31 — 5 gạch đầu dòng chính là 5 bước thuật toán

| # | Slide viết | Ý thật sự |
|---|---|---|
| ① | *"We have a large corpus of text"* | **Chỉ cần văn bản thô, KHÔNG cần nhãn người gán** — nhãn nằm sẵn trong text. Đây là chữ **self-supervised** (slide 39). Đổi lại: **cần rất nhiều data** |
| ② | *"Every word in a **fixed** vocabulary is represented by a vector"* | `fixed` ⇒ từ ngoài danh sách **vĩnh viễn không có vector** ⇒ **bài toán OOV**. Vector khởi tạo **NGẪU NHIÊN** — 📌 lúc đầu **mọi vector đều vô nghĩa**, nghĩa **MỌC RA** trong lúc train |
| ③ | *"Go through each position t… center word c and context words o"* | Cửa sổ trượt — băm corpus thành **hàng tỷ bài tập nhỏ** |
| ④ | *"Use the **similarity**… (or vice versa)"* | `similarity` = **tích vô hướng `u_oᵀv_c`**. `(or vice versa)` chính là **2 biến thể**: `P(o\|c)` = Skip-gram · `P(c\|o)` = CBOW |
| ⑤ | *"Keep adjusting the word vectors…"* | Đoán → sai → **chỉnh chính các vector đó** → lặp |

## 🔢 Công thức (slide 33, 35, 37)

```
L(θ) = ∏_t ∏_{-m≤j≤m, j≠0}  P(w_{t+j} | w_t; θ)          ← likelihood
J(θ) = -(1/T) Σ_t Σ_j  log P(w_{t+j} | w_t; θ)            ← loss

            exp(u_oᵀ · v_c)
P(o|c) = ─────────────────────
          Σ_{w∈V} exp(u_wᵀ · v_c)
```

🔑 **MỖI TỪ CÓ 2 VECTOR** (slide 35): `v_w` khi là **từ trung tâm**, `u_w` khi là **từ ngữ cảnh**. Xong việc thường **cộng hoặc trung bình** 2 cái.

3 bước đọc softmax (slide 37): ① tích vô hướng đo **độ giống** → ② `exp` ép **dương** → ③ chia tổng toàn vocab thành **phân phối xác suất**.

## 🔑 ④ + ⑤ nghe LUẨN QUẨN nhưng không phải

```
Corpus có:  "học_phí đóng ..."   và   "học_phí nộp ..."

Đoán trúng "đóng" từ "học_phí"  →  gradient kéo  u_đóng ↔ v_học_phí  lại gần
Đoán trúng "nộp"  từ "học_phí"  →  gradient kéo  u_nộp  ↔ v_học_phí  lại gần
                                        ↓
                  cả hai cùng bị kéo về một chỗ  ⇒  u_đóng ≈ u_nộp
```

→ **`đóng` và `nộp` giống nhau dù CHƯA BAO GIỜ xuất hiện cạnh nhau** — đúng kết luận của ví dụ `mèo`/`chó` ở [[ma-tran-dong-xuat-hien]]. Hai con đường **tìm ra cùng một thứ**.

## ⚠️ Điều dễ bỏ sót nhất

🚩 **Trọng số CHÍNH LÀ sản phẩm.** Ở mọi bài DL khác, trọng số là *phương tiện* để có model tốt. Word2Vec **ngược lại** — train xong **vứt bỏ tầng softmax đầu ra**, chỉ giữ **bảng embedding**.

⚠️ Nhược điểm (slide 39): **train chậm, cần rất nhiều data** (nhất là để học từ hiếm) · **phụ thuộc kích thước vocab** → xem [[negative-sampling]].

---

## 🔗 Liên kết
- **Tiền đề:** [[ma-tran-dong-xuat-hien]] · [[distributional-semantics]]
- **Dẫn tới:** [[cbow-vs-skipgram]] · [[negative-sampling]] · [[pretrained-embedding]]
