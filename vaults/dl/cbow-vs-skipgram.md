---
slug: cbow-vs-skipgram
title: CBOW vs Skip-gram
vault: dl
type: concept
branch: F
order: 9
status: done
tags: [dl, nlp, embedding]
prev: [word2vec]
next: [negative-sampling]
created: 2026-08-02
---

# CBOW vs Skip-gram

> Tóm tắt 1 câu: Cùng một cửa sổ, ngược chiều mũi tên — **CBOW = điền vào chỗ trống**, **Skip-gram = nhìn 1 từ, đoán hàng xóm**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh F · #9 ← cần [[word2vec]] · → kế tiếp [[negative-sampling]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #embedding

---

## 💡 Ý chính (slide 38)

Ví dụ: `Thị_trường chứng_khoán đang đi xuống`, cửa sổ `m=2`, từ trung tâm = **`đang`**

| | Input | Output | Số mẫu |
|---|---|---|---|
| **CBOW** | `Thị_trường, chứng_khoán, đi, xuống` (cả 4 **cùng lúc**) | → `đang` | **1** |
| **Skip-gram** | `đang` | → `Thị_trường` · `chứng_khoán` · `đi` · `xuống` (**4 mẫu riêng**) | **4** |

## 📐 Trượt hết câu 5 từ

Skip-gram sinh `2+3+4+3+2 =` **14 mẫu**, CBOW chỉ **5 mẫu** (1 mỗi vị trí).
→ **Cùng một câu, skip-gram tạo gấp ~3 lần lượng mẫu.** Đây là gốc của **mọi** khác biệt phía sau.

## 🔢 Bên trong mỗi kiến trúc

**CBOW** (3 khối `Input → Projection → Output`): 4 từ ngữ cảnh → tra bảng lấy 4 vector → **Projection = lấy TRUNG BÌNH** → softmax đoán từ trung tâm.
📌 *"Bag of Words"* = lấy trung bình nên **mất thứ tự** trong cửa sổ · *"Continuous"* = vector **dày đặc**.

**Skip-gram**: dùng thẳng `P(o|c) = exp(u_oᵀv_c)/Σ_w exp(u_wᵀv_c)` — đây là chỗ **"mỗi từ 2 vector"** phát huy tác dụng.

## 🔑 Vì sao skip-gram tốt hơn cho TỪ HIẾM — lý do nằm ở phép TRUNG BÌNH

Giả sử `bảo_lưu` cả corpus chỉ gặp 3 lần:
- **CBOW**: nó là **1 trong 4** input, bị **trung bình chung với 3 từ phổ biến** ⇒ đóng góp còn ~1/4, gradient rất yếu — **bị số đông lấn át**
- **Skip-gram**: khi nó làm trung tâm, sinh **4 mẫu đều nhắm thẳng vào nó** ⇒ **4 lần cập nhật chuyên biệt**

👉 **Trung bình làm mượt nhiễu (tốt cho từ phổ biến) nhưng làm mượt luôn TÍN HIỆU của từ hiếm.** Cũng vì thế CBOW **nhanh hơn**.

## ⚙️ Chọn cái nào

| | CBOW | Skip-gram |
|---|---|---|
| Corpus **lớn**, từ phổ thông, cần nhanh | ✅ | |
| Corpus **nhỏ**, nhiều **thuật ngữ chuyên ngành** | | ✅ |

🎯 Đề tài hỏi đáp học vụ (corpus nhỏ, đầy từ hiếm như `bảo_lưu`, `tín_chỉ`) → **skip-gram**. Cũng vì lý do này mà **fastText và SL999 ở slide 41 đều train bằng skip-gram**.

## 🔗 Liên hệ đáng nhớ

**Ý tưởng "điền vào chỗ trống" của CBOW chính là tiền thân của Masked Language Model trong BERT.** Khác biệt: BERT dùng **cả câu** làm ngữ cảnh và có Transformer, thay vì lấy trung bình 4 vector → [[contextualized-embedding]].

---

## 🔗 Liên kết
- **Tiền đề:** [[word2vec]]
- **Dẫn tới:** [[negative-sampling]] · [[contextualized-embedding]]
