---
slug: kernel-pca
title: Kernel PCA
vault: ml
type: concept
branch: B
order: 9
status: learning
tags: [toan, giam-chieu, kernel]
prev: [pca]
next: [t-sne]
related: [pca, svm]
created: 2026-08-10
---

# Kernel PCA

> Tóm tắt 1 câu: PCA chỉ **xoay** được nên bó tay với dữ liệu cong; kernel trick đưa dữ liệu lên chiều cao rồi làm PCA ở đó — mà **không cần thực sự tính toạ độ** ở chiều cao.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B (Đại số tuyến tính → PCA) · #9 ← cần [[pca]] · → kế tiếp [[t-sne]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #giam-chieu #kernel

---

## 💡 Vấn đề của PCA

[[pca]] là [[phep-bien-doi-tuyen-tinh|phép biến đổi tuyến tính]] — nó chỉ **xoay trục**. Với dữ liệu nằm trên một **mặt cong**, không có phép xoay nào duỗi thẳng được nó.

Ví dụ kinh điển: hai vòng tròn đồng tâm (lớp trong, lớp ngoài). PCA chiếu xuống 1 chiều theo hướng nào cũng làm hai lớp **chồng lên nhau**. Nhưng chỉ cần thêm một chiều `r = x²+y²` là hai lớp **tách hoàn toàn**.

## 💡 Kernel trick

Ý tưởng: ánh xạ `φ` đưa dữ liệu lên không gian nhiều chiều hơn, nơi cấu trúc cong trở thành **tuyến tính**. Rồi làm PCA ở đó.

**Vấn đề:** không gian đó có thể **vô hạn chiều** — không tính `φ(x)` ra được.

**Lối thoát:** PCA chỉ cần **tích vô hướng** giữa các điểm, không cần toạ độ. Mà tích vô hướng ở không gian mới tính được **trực tiếp từ dữ liệu gốc**:

$$
K(\mathbf{x}_i, \mathbf{x}_j) = \varphi(\mathbf{x}_i)\cdot\varphi(\mathbf{x}_j)
$$

> 📌 **Đây là kernel trick**: tính tích vô hướng ở chiều cao **mà không bao giờ đặt chân tới chiều cao**. Cùng một mẹo làm [[svm]] mạnh lên — hiểu ở một chỗ là hiểu cả hai.

| Kernel | Công thức | Dùng khi |
|---|---|---|
| **Tuyến tính** | `xᵀy` | Thoái hoá về PCA thường |
| **Đa thức** | `(xᵀy + c)^d` | Quan hệ đa thức |
| **RBF / Gaussian** ⭐ | `exp(−γ‖x−y‖²)` | Mặc định — không gian vô hạn chiều |
| **Sigmoid** | `tanh(αxᵀy + c)` | Ít dùng |

## ⚙️ So sánh

| | **PCA** | **Kernel PCA** |
|---|---|---|
| Bắt được | Cấu trúc **tuyến tính** | Cấu trúc **cong** |
| Chi phí | `O(nd²)` | `O(n²)` bộ nhớ, `O(n³)` tính — ⚠️ theo **số mẫu** |
| Áp cho dữ liệu mới | ✅ Dễ | ✅ Được (nhưng cần giữ toàn bộ tập train) |
| Biến đổi ngược | ✅ Có | ❌ Không có công thức đóng |
| Siêu tham số | Chỉ `k` | `k` **+ kernel + `γ`** |

> ⚠️ Chi phí `O(n²)` theo **số mẫu** là hạn chế lớn nhất. PCA thường tăng theo số **chiều**; Kernel PCA tăng theo số **mẫu** — với 100.000 mẫu thì ma trận kernel đã 10 tỉ phần tử, không khả thi.

## ⚙️ Khi nào dùng

- Dữ liệu **rõ ràng có cấu trúc phi tuyến** (nhìn scatter plot thấy vòng, xoắn ốc, hình chữ S).
- Dataset **vừa phải** (dưới ~10.000 mẫu).
- Cần một phép biến đổi **áp được cho dữ liệu mới** — điểm mà [[t-sne]] không làm được.

Nếu dữ liệu lớn và phi tuyến phức tạp thì [[autoencoder]] thường là lựa chọn thực tế hơn: chi phí tăng tuyến tính theo số mẫu, và học được ánh xạ phi tuyến tuỳ ý.

## ⚠️ Điều dễ nhầm

- **`γ` của RBF rất nhạy.** `γ` quá lớn → mỗi điểm thành một cụm riêng (overfit); quá nhỏ → thoái hoá về tuyến tính. Phải tune bằng [[cross-validation]].
- **Không có "phương sai giải thích" hiểu được như PCA.** Trị riêng của ma trận kernel không diễn giải trực tiếp thành % thông tin giữ lại → chọn `k` khó hơn.
- **Phải căn giữa ma trận kernel**, không phải căn giữa dữ liệu gốc — chi tiết cài đặt dễ sai.
- **Kernel PCA ≠ Kernel SVM.** Cùng kernel trick nhưng khác mục tiêu: một bên giảm chiều không giám sát, một bên tìm biên phân lớp.

---

## 🔗 Liên kết
- **Tiền đề:** [[pca]] · [[giam-chieu-du-lieu]]
- **Dẫn tới:** [[t-sne]]
- **Liên quan:** [[svm]] · [[autoencoder]] · [[hyperparameter-tuning]]

## ❓ Câu hỏi mở
- Kernel RBF tương ứng không gian vô hạn chiều — vì sao điều đó không dẫn tới overfit ngay lập tức?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Đại số tuyến tính
