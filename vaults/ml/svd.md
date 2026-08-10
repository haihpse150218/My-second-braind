---
slug: svd
title: SVD — phân tích giá trị kỳ dị
vault: ml
type: concept
branch: B
order: 6
status: learning
tags: [toan, dai-so-tuyen-tinh, giam-chieu]
prev: [tri-rieng-vector-rieng]
next: [giam-chieu-du-lieu]
related: [pca, he-goi-y-recommender]
created: 2026-08-10
---

# SVD — phân tích giá trị kỳ dị

> Tóm tắt 1 câu: tách **mọi** ma trận thành xoay → kéo giãn → xoay; tổng quát hơn trị riêng vì áp dụng được cả cho ma trận **không vuông**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B (Đại số tuyến tính → PCA) · #6 ← cần [[tri-rieng-vector-rieng]] · → kế tiếp [[giam-chieu-du-lieu]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #dai-so-tuyen-tinh #giam-chieu

---

## 💡 Ý chính

$$
A = U \Sigma V^{T}
$$

| Thành phần | Kích thước | Là gì |
|---|---|---|
| `V^T` | `n×n` | **Xoay** trong không gian nguồn (trực giao) |
| `Σ` | `m×n` | **Kéo giãn** — đường chéo chứa **giá trị kỳ dị** `σ₁ ≥ σ₂ ≥ ... ≥ 0` |
| `U` | `m×m` | **Xoay** trong không gian đích (trực giao) |

> 📌 **Mọi phép biến đổi tuyến tính, dù phức tạp tới đâu, đều gói gọn thành: xoay → kéo giãn theo các trục → xoay.** Đây là một trong những kết quả đẹp nhất của đại số tuyến tính.

Ưu thế lớn nhất so với [[tri-rieng-vector-rieng]]: **SVD tồn tại cho MỌI ma trận**, kể cả không vuông, kể cả suy biến. Trị riêng chỉ định nghĩa cho ma trận vuông và không phải lúc nào cũng chéo hoá được.

## 🧩 Xấp xỉ hạng thấp — vì sao SVD hữu dụng

Giá trị kỳ dị **sắp xếp giảm dần**, và `σᵢ` cho biết thành phần thứ `i` **quan trọng cỡ nào**.

Giữ `k` thành phần đầu:
$$
A \approx A_k = U_k \Sigma_k V_k^{T}
$$

**Định lý Eckart–Young:** `A_k` là **xấp xỉ hạng `k` tốt nhất có thể** của `A` (theo chuẩn Frobenius). Không có cách nào dùng `k` thành phần mà xấp xỉ tốt hơn.

| Ma trận gốc `1000×1000` | Số phần tử |
|---|---|
| Đầy đủ | 1.000.000 |
| Giữ `k=50` | `1000·50 + 50 + 50·1000` = **100.050** — nén **10 lần** |

Đây là ý tưởng nền của nén ảnh bằng SVD, khử nhiễu, và [[he-goi-y-recommender]].

## ⚙️ Quan hệ với PCA

$$
\text{PCA} = \text{SVD của ma trận dữ liệu đã trừ trung bình}
$$

Cụ thể: vector riêng của [[ma-tran-hiep-phuong-sai]] `XᵀX` **chính là** các cột của `V`; và trị riêng `λᵢ = σᵢ²/(n−1)`.

> 📌 **Thư viện tính PCA bằng SVD, không tính hiệp phương sai rồi phân rã.** Lý do: tạo `XᵀX` làm **bình phương số điều kiện** của ma trận → mất chính xác số học nghiêm trọng khi các cột gần phụ thuộc tuyến tính. SVD làm thẳng trên `X`, ổn định hơn nhiều.

Đây là ví dụ tốt cho thấy **"đúng về toán" và "đúng về tính toán" là hai chuyện khác nhau** — cùng tinh thần với lời khuyên đừng dùng `inv()` ở [[ma-tran]].

## ⚙️ Ứng dụng

| Ứng dụng | Cách dùng |
|---|---|
| [[pca]] | Cách cài đặt chuẩn |
| [[he-goi-y-recommender]] | Phân rã ma trận người dùng × sản phẩm, điền ô trống |
| **LSA** (Latent Semantic Analysis) | SVD trên ma trận từ × tài liệu → chủ đề tiềm ẩn |
| Nén ảnh / khử nhiễu | Bỏ các `σ` nhỏ (thường ứng với nhiễu) |
| **Giả nghịch đảo** | `A⁺ = VΣ⁺Uᵀ` — giải hệ khi `A` không khả nghịch |

## ⚠️ Điều dễ nhầm

- **Giá trị kỳ dị `σ` luôn ≥ 0 và thực**; trị riêng `λ` có thể âm hoặc phức. Với ma trận **đối xứng nửa xác định dương** (như hiệp phương sai) thì `σ = λ`.
- **Bỏ `σ` nhỏ ≠ vô hại.** Chúng nhỏ về **năng lượng** nhưng có thể chứa chi tiết quan trọng cho bài toán cụ thể. "Quan trọng theo phương sai" không đồng nghĩa "quan trọng để phân loại" — cái bẫy lớn nhất của PCA, xem [[giam-chieu-du-lieu]].
- **SVD đầy đủ rất đắt** `O(mn·min(m,n))`. Với ma trận lớn dùng **truncated SVD** (chỉ tính `k` thành phần đầu) — rẻ hơn nhiều.

---

## 🔗 Liên kết
- **Tiền đề:** [[tri-rieng-vector-rieng]] · [[ma-tran]]
- **Dẫn tới:** [[giam-chieu-du-lieu]] · [[pca]] · [[he-goi-y-recommender]]
- **Liên quan:** [[phep-bien-doi-tuyen-tinh]]
- **Liên môn:** [[dl/word2vec]] — LSA (SVD trên ma trận đồng xuất hiện) là tiền thân của embedding học được.

## ❓ Câu hỏi mở
- Truncated SVD tính được `k` thành phần đầu mà không cần phân rã đầy đủ — thuật toán làm điều đó thế nào?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Đại số tuyến tính
