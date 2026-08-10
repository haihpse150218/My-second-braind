---
slug: vector
title: Vector
vault: ml
type: concept
branch: B
order: 1
status: learning
tags: [toan, dai-so-tuyen-tinh, nen-tang]
next: [ma-tran]
related: [ma-tran, tuong-quan]
created: 2026-08-10
---

# Vector

> Tóm tắt 1 câu: một **danh sách số có thứ tự** — và trong ML, **mọi thứ** đều được biến thành vector trước khi model đụng tới.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B (Đại số tuyến tính → PCA) · #1 → kế tiếp [[ma-tran]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #dai-so-tuyen-tinh #nen-tang

---

## 💡 Ý chính

$$
\mathbf{x} = [x_1, x_2, \ldots, x_n] \in \mathbb{R}^n
$$

Ba cách hiểu, cả ba đều dùng:

| Góc nhìn | Vector là | Hữu ích khi |
|---|---|---|
| **Danh sách** | `n` con số xếp thứ tự | Lập trình, lưu trữ |
| **Mũi tên** | Hướng + độ dài trong không gian `n` chiều | Hình dung phép cộng, chiếu |
| **Điểm** | Một vị trí trong không gian `n` chiều | ⭐ Cách nghĩ của ML |

> 📌 Góc nhìn **"điểm trong không gian"** là cách nghĩ chính của ML: một dòng dữ liệu = một điểm. Dataset 1.000 dòng × 20 cột = **1.000 điểm trong không gian 20 chiều**. Từ đó "phân loại" thành "vẽ mặt phẳng chia đám điểm", "phân cụm" thành "tìm chỗ điểm tụ lại".

## 🔢 Ba phép toán cần nhớ

**Độ dài (chuẩn L2):**
$$
\|\mathbf{x}\| = \sqrt{x_1^2 + \cdots + x_n^2}
$$
Chính là Pythagoras mở rộng. Dùng trong [[regularization]] (phạt `‖w‖`).

**Tích vô hướng:**
$$
\mathbf{a}\cdot\mathbf{b} = \sum_i a_i b_i = \|\mathbf{a}\|\|\mathbf{b}\|\cos\theta
$$

Đây là phép toán **quan trọng nhất** trong ML. Dấu của nó nói lên quan hệ:

| `a·b` | `θ` | Nghĩa |
|---|---|---|
| Lớn dương | ≈ 0° | **Cùng hướng** — rất giống nhau |
| ≈ 0 | 90° | **Vuông góc** — không liên quan |
| Âm | > 90° | **Ngược hướng** |

**Cosine similarity** `= a·b / (‖a‖‖b‖)` bỏ ảnh hưởng của độ dài, chỉ giữ **hướng** — thước đo chuẩn để so hai embedding, xem [[../vaults/dl/word2vec|dl/word2vec]].

## ⚙️ Vector ở đâu trong ML

| Thứ | Thành vector thế nào |
|---|---|
| Một dòng dữ liệu | Mỗi cột là một chiều |
| Bộ trọng số model | `w = [w₁,...,wₙ]` — thứ [[gradient-descent]] cập nhật |
| Gradient | [[gradient]] là vector các đạo hàm riêng |
| Một từ | Word embedding, xem [[../vaults/dl/word2vec\|dl/word2vec]] |
| Một ảnh | Duỗi ma trận pixel thành vector, xem [[../vaults/dl/flatten-vs-gap\|dl/flatten-vs-gap]] |

**Hồi quy tuyến tính viết lại bằng vector**: `ŷ = w·x + b` — gọn hơn hẳn viết tổng `Σwᵢxᵢ`, và đúng cách thư viện cài đặt.

## ⚠️ Điều dễ nhầm

- **Chiều của vector ≠ chiều không gian ta hình dung được.** Vector 300 chiều không "vẽ" ra được, nhưng mọi phép toán vẫn đúng nguyên. Trực giác 2D/3D chỉ dùng để hiểu, không phải để tin.
- 🚨 **Lời nguyền số chiều.** Trong không gian rất nhiều chiều, **mọi cặp điểm gần như cách đều nhau** và **gần như vuông góc** — làm khái niệm "hàng xóm gần nhất" mất ý nghĩa. Đây là lý do [[knn]] hỏng ở chiều cao, và lý do cần [[giam-chieu-du-lieu]].
- **Đơn vị các chiều phải cùng thang.** Cột "tuổi" (0–100) và "thu nhập" (0–10⁹) trong cùng vector thì khoảng cách bị thu nhập chi phối hoàn toàn → phải [[chuan-hoa-du-lieu]].

---

## 🔗 Liên kết
- **Dẫn tới:** [[ma-tran]] · [[phep-bien-doi-tuyen-tinh]]
- **Liên quan:** [[chuan-hoa-du-lieu]] · [[gradient]] · [[knn]] · [[giam-chieu-du-lieu]]
- **Liên môn:** [[dl/word2vec]] · [[dl/danh-gia-embedding]] — embedding là vector, và cosine similarity là thước đo mặc định.

## ❓ Câu hỏi mở
- Ở chiều cao mọi điểm gần như cách đều — vậy vì sao embedding 768 chiều vẫn phân biệt được ngữ nghĩa?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Đại số tuyến tính
