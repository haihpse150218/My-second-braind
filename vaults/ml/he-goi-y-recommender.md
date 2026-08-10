---
slug: he-goi-y-recommender
title: Hệ gợi ý (Recommender System)
vault: ml
type: concept
branch: B
order: 12
status: learning
tags: [ung-dung, giam-chieu]
prev: [t-sne]
related: [svd, pca]
created: 2026-08-10
---

# Hệ gợi ý (Recommender System)

> Tóm tắt 1 câu: đoán ô trống trong ma trận **người dùng × sản phẩm** — và lời giải kinh điển là [[svd|phân rã ma trận]], tức đại số tuyến tính đem ra dùng thật.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B (Đại số tuyến tính → PCA) · #12 ← cần [[t-sne]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #ung-dung #giam-chieu

---

## 💡 Bài toán

Ma trận `R` cỡ `người dùng × phim`, ô `(i,j)` là điểm người `i` chấm phim `j`:

```
        Phim1  Phim2  Phim3  Phim4
User A    5      ?      3      ?
User B    ?      4      ?      2
User C    4      ?      ?      1
```

**Mục tiêu:** điền các ô `?`. Ma trận thật **thưa hơn 99%** — Netflix có triệu người dùng × chục nghìn phim, mỗi người xem vài chục phim.

## ⚙️ Ba cách tiếp cận

| Cách | Ý tưởng | Điểm yếu |
|---|---|---|
| **Content-based** | Gợi ý thứ **giống** cái đã thích (thể loại, đạo diễn) | Bong bóng lọc — không bao giờ gợi ý cái mới lạ |
| **Collaborative filtering** ⭐ | "Người giống bạn cũng thích X" — chỉ dùng **hành vi**, không cần biết nội dung | ⚠️ **Cold start** |
| **Hybrid** | Kết hợp cả hai | Phức tạp hơn |

**Collaborative filtering** là cách đáng chú ý nhất: nó **không cần biết phim nói về gì**. Chỉ từ ma trận điểm số, nó phát hiện ra "những người chấm giống nhau ở các phim đã xem thì cũng sẽ chấm giống nhau ở phim chưa xem".

## 💡 Phân rã ma trận — nơi SVD vào cuộc

$$
R \approx U \Sigma V^{T} \qquad\text{hay gọn hơn}\qquad R \approx P Q^{T}
$$

| Ma trận | Kích thước | Ý nghĩa |
|---|---|---|
| `P` | người dùng × `k` | Mỗi người là vector `k` chiều — **sở thích** |
| `Q` | phim × `k` | Mỗi phim là vector `k` chiều — **đặc tính** |

Dự đoán điểm = **tích vô hướng**: `r̂ᵢⱼ = pᵢ · qⱼ`.

> 📌 Điều đẹp nhất: **`k` chiều ẩn tự xuất hiện, không ai định nghĩa trước.** Sau khi train, các chiều thường hoá ra tương ứng với những khái niệm như "mức độ hành động", "phim nghệ thuật vs thương mại", "cũ vs mới" — thuật toán tự tìm ra từ hành vi chấm điểm. Đây chính là ý tưởng **biến tiềm ẩn** (latent factor).

Cùng bản chất với embedding trong NLP: [[../vaults/dl/word2vec|word2vec]] cũng biến từ thành vector `k` chiều mà các chiều mang ngữ nghĩa không ai gán trước.

**Lưu ý cài đặt:** SVD cổ điển cần ma trận **đầy đủ**, nhưng `R` thì thưa. Thực tế người ta không dùng SVD trực tiếp mà **tối ưu trên các ô ĐÃ CÓ**:

$$
\min_{P,Q} \sum_{(i,j)\,\text{đã biết}} (r_{ij} - p_i\cdot q_j)^2 + \lambda(\|p_i\|^2 + \|q_j\|^2)
$$

Giải bằng [[sgd]] hoặc ALS. Số hạng `λ(...)` là [[regularization]] — thiếu nó thì model học thuộc các ô đã biết và [[overfitting]] nặng.

## ⚠️ Cold start — vấn đề khó nhất

| Loại | Vấn đề | Cách chữa |
|---|---|---|
| **Người dùng mới** | Chưa chấm gì → không có `pᵢ` | Hỏi vài câu lúc đăng ký; gợi ý theo phổ biến |
| **Sản phẩm mới** | Chưa ai chấm → không có `qⱼ` | Dùng content-based cho tới khi đủ dữ liệu |

Đây là lý do hầu hết hệ thật là **hybrid** — collaborative filtering thuần không xử lý được cold start.

## ⚠️ Điều dễ nhầm

- **RMSE thấp không đồng nghĩa gợi ý hay.** Cuộc thi Netflix Prize tối ưu RMSE, nhưng thuật toán thắng cuộc **chưa bao giờ được triển khai** — quá phức tạp, và cải thiện RMSE không chuyển thành người dùng xem nhiều hơn. Cùng bài học "chọn sai chỉ số" ở [[danh-gia-mo-hinh]] và [[../vaults/dsp/snr|dsp/snr]].
- **Vòng phản hồi.** Gợi ý ảnh hưởng tới hành vi, hành vi lại thành dữ liệu train → hệ thống **tự củng cố thiên kiến** của chính nó. Phải chủ động chèn khám phá (exploration).
- **Ma trận thưa nên phải bỏ qua ô trống khi tính loss.** Coi ô trống là điểm `0` là sai nghiêm trọng — "chưa xem" khác hẳn "xem và ghét".

---

## 🔗 Liên kết
- **Tiền đề:** [[svd]] · [[pca]] · [[vector]]
- **Liên quan:** [[regularization]] · [[sgd]] · [[danh-gia-mo-hinh]] · [[overfitting]]
- **Liên môn:** [[dl/word2vec]] — cùng ý tưởng biến tiềm ẩn; [[dl/retrieve-rerank]] — kiến trúc hai tầng của hệ gợi ý hiện đại.

## ❓ Câu hỏi mở
- Vòng phản hồi làm hệ tự củng cố thiên kiến — có cách đo mức độ "bong bóng" một cách định lượng không?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Đại số tuyến tính (ứng dụng SVD)
