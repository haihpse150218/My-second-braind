---
slug: otsu
title: Phương pháp Otsu
vault: ivp
type: concept
branch: H
order: 3
status: learning
tags: [ivp, phan-doan]
prev: [nguong-hoa]
next: [nguong-cuc-bo]
related: [histogram-anh, nguong-hoa]
sources: ["L10 — Image Segmentation"]
created: 2026-08-10
---

# Phương pháp Otsu

> Tóm tắt 1 câu: thử **hết 256 ngưỡng**, chọn ngưỡng làm **hai lớp tách xa nhau nhất** — biến việc chọn `T` bằng mắt thành một bài toán tối ưu có lời giải.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh H · #3 ← cần [[nguong-hoa]] · → kế tiếp [[nguong-cuc-bo]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #phan-doan

---

## 💡 Ý chính

Với mỗi ngưỡng `T` khả dĩ, ảnh chia thành hai lớp. Otsu chọn `T` **tối đa hoá phương sai giữa hai lớp**:

$$
\sigma_B^2(T) = \omega_0(T)\,\omega_1(T)\,\big[\mu_0(T) - \mu_1(T)\big]^2
$$

| Ký hiệu | Ý nghĩa |
|---|---|
| `ω₀, ω₁` | **Tỉ lệ** pixel của lớp nền / lớp vật |
| `μ₀, μ₁` | **Trung bình** mức xám của mỗi lớp |

Đọc công thức: giá trị lớn khi **hai trung bình cách xa nhau** `(μ₀−μ₁)²` **và** hai lớp **không quá chênh lệch kích thước** `ω₀ω₁` (tích lớn nhất khi `ω₀ = ω₁ = 0.5`).

## 🧩 Vì sao "tối đa giữa lớp" = "tối thiểu trong lớp"

Phương sai tổng của ảnh là **hằng số**, không phụ thuộc `T`, và tách được:

$$
\sigma_{\text{total}}^2 = \underbrace{\sigma_W^2(T)}_{\text{trong lớp}} + \underbrace{\sigma_B^2(T)}_{\text{giữa lớp}}
$$

Nên **tối đa `σ_B²` ⟺ tối thiểu `σ_W²`** — hai cách phát biểu của cùng một việc.

Điều này khiến thuật toán rẻ bất ngờ: tối thiểu hoá `σ_W²` trực tiếp thì phải tính phương sai từng lớp cho mỗi `T` (đắt), còn tối đa hoá `σ_B²` chỉ cần **trung bình và tỉ lệ** — tính được bằng **tổng tích luỹ trên histogram**, một lượt duyệt 256 bước.

## 🧩 Ý nghĩa thống kê

Đây thực chất là **phân cụm 1 chiều thành 2 cụm**, tối ưu theo đúng tiêu chí mà [[ml/k-means]] dùng: tối thiểu hoá biến thiên trong cụm. Khác biệt: Otsu **duyệt toàn bộ** 256 khả năng nên tìm được **tối ưu toàn cục**, còn k-means lặp và có thể kẹt ở tối ưu cục bộ. Không gian tìm kiếm nhỏ nên vét cạn được — đó là lợi thế của bài toán 1 chiều rời rạc.

## ⚙️ Ưu điểm

- **Hoàn toàn tự động**, không tham số.
- **Rẻ** — chỉ cần histogram, `O(L)` sau khi có nó.
- **Tối ưu toàn cục** theo tiêu chí đã chọn.
- Mở rộng được cho **nhiều ngưỡng** (multi-Otsu) và cho ảnh màu.

## ⚠️ Khi nào Otsu thất bại

| Tình huống | Vì sao | Cách chữa |
|---|---|---|
| Histogram **một đỉnh** | Không có hai cụm để tách; Otsu vẫn trả về một `T` nhưng **vô nghĩa** | Đổi phương pháp |
| Hai lớp **chênh lệch kích thước lớn** (vật chiếm 2% ảnh) | Thừa số `ω₀ω₁` phạt nặng → `T` bị kéo lệch | Ngưỡng cục bộ, hoặc crop ROI trước |
| **Chiếu sáng không đều** | Vẫn chỉ là một `T` toàn cục | [[nguong-cuc-bo]] hoặc [[top-hat]] |
| **Nhiễu nhiều** | Histogram nhoè, thung lũng bị lấp | [[loc-lam-min]] trước |
| Ảnh có **3 lớp trở lên** | Otsu giả định đúng 2 | Multi-Otsu |

> 📌 Điểm chung: **Otsu tự động chọn `T`, nhưng không tự động kiểm tra xem ngưỡng hoá có phải công cụ đúng hay không.** Nó luôn trả về một con số, kể cả khi con số đó vô nghĩa. Nhìn histogram vẫn là bước không bỏ được.

## ⚠️ Điều dễ nhầm

- **Tính Otsu trong ROI cho `T` khác** tính trên cả ảnh — thường tốt hơn nhiều. Xem [[phep-logic-va-roi]].
- **Otsu giả định phân phối hai lớp cân đối.** Với lớp rất lệch thì có biến thể (Kittler–Illingworth, entropy-based) phù hợp hơn.

---

## 🔗 Liên kết
- **Tiền đề:** [[nguong-hoa]] · [[histogram-anh]]
- **Dẫn tới:** [[nguong-cuc-bo]] · [[region-growing]]
- **Liên quan:** [[loc-lam-min]] · [[top-hat]] · [[phep-logic-va-roi]]
- **Liên môn:** [[ml/k-means]] · [[ml/phuong-sai]] — Otsu là phân cụm 1D giải bằng vét cạn.

## ❓ Câu hỏi mở
- Có tiêu chí nào tự phát hiện "ảnh này không nên ngưỡng hoá" trước khi chạy Otsu không?

## 📚 Nguồn
- Lecture 10 — Image Segmentation
