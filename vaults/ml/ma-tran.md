---
slug: ma-tran
title: Ma trận
vault: ml
type: concept
branch: B
order: 2
status: learning
tags: [toan, dai-so-tuyen-tinh, nen-tang]
prev: [vector]
next: [phep-bien-doi-tuyen-tinh]
related: [vector, ma-tran-hiep-phuong-sai]
created: 2026-08-10
---

# Ma trận

> Tóm tắt 1 câu: bảng số `m×n` — vừa là **cách lưu cả dataset**, vừa là **một phép biến đổi** biến vector này thành vector khác.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B (Đại số tuyến tính → PCA) · #2 ← cần [[vector]] · → kế tiếp [[phep-bien-doi-tuyen-tinh]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #dai-so-tuyen-tinh #nen-tang

---

## 💡 Hai vai trò

| Vai trò | Ma trận là gì | Ví dụ |
|---|---|---|
| **Chứa dữ liệu** | Bảng: mỗi **dòng** một mẫu, mỗi **cột** một đặc trưng | `X` cỡ `1000×20` |
| **Phép biến đổi** | Một hàm biến vector `n` chiều thành vector `m` chiều | Tầng Dense của mạng nơ-ron |

Vai trò thứ hai là chỗ đại số tuyến tính trở nên thú vị — xem [[phep-bien-doi-tuyen-tinh]].

## 🔢 Nhân ma trận — quy tắc và ý nghĩa

$$
(AB)_{ij} = \sum_k A_{ik}B_{kj}
$$

**Điều kiện kích thước:** `(m×n) · (n×p) = (m×p)` — số cột của cái trước **phải bằng** số dòng của cái sau.

> 🚨 Lỗi `shape mismatch` là lỗi runtime phổ biến nhất khi viết code ML. Mẹo: viết kích thước ra giấy, kiểm hai số ở giữa có khớp không.

**Ý nghĩa:** phần tử `(i,j)` là **tích vô hướng** của dòng `i` (của `A`) với cột `j` (của `B`). Nên nhân ma trận thực chất là **làm hàng loạt phép tích vô hướng cùng lúc** — và đó là lý do GPU tăng tốc ML được: chúng sinh ra để làm đúng việc này song song.

**Toàn bộ dự đoán của hồi quy tuyến tính trên 1000 mẫu** gói trong một phép nhân:
$$
\hat{\mathbf{y}} = X\mathbf{w} + b \qquad (1000\times20)(20\times1) = (1000\times1)
$$

## ⚙️ Các ma trận và phép cần biết

| Thứ | Ký hiệu | Vai trò trong ML |
|---|---|---|
| **Chuyển vị** | `Aᵀ` | Đổi dòng ↔ cột; có mặt khắp nơi (`XᵀX`) |
| **Đơn vị** | `I` | Nhân với nó không đổi gì — như số 1 |
| **Nghịch đảo** | `A⁻¹` | `AA⁻¹ = I`; dùng trong Normal Equation |
| **Đối xứng** | `A = Aᵀ` | [[ma-tran-hiep-phuong-sai]] luôn đối xứng → trị riêng luôn thực |
| **Trực giao** | `QᵀQ = I` | Giữ nguyên độ dài và góc — phép **xoay**; nền của [[pca]] |
| **Định thức** | `det(A)` | Hệ số thay đổi "thể tích"; `det = 0` ⇒ **không nghịch đảo được** |
| **Hạng** | `rank(A)` | Số chiều thật sự mà ma trận trải ra |

**Hạng** là khái niệm đáng chú ý nhất với ML: nếu `rank(X) < số cột` thì có cột **phụ thuộc tuyến tính** vào cột khác — tức **đa cộng tuyến**. Khi đó `XᵀX` không nghịch đảo được và Normal Equation **hỏng**. Đây chính là lý do [[linear-regression]] cảnh báo về đa cộng tuyến, và là một động cơ của [[regularization]] (Ridge cộng `λI` làm ma trận nghịch đảo được trở lại).

## ⚠️ Điều dễ nhầm

- **Nhân ma trận KHÔNG giao hoán**: `AB ≠ BA` nói chung, thậm chí `BA` có thể không tồn tại.
- **Không có phép chia ma trận.** Chỉ có nhân với nghịch đảo, và nghịch đảo **không phải lúc nào cũng tồn tại**.
- **Đừng tính nghịch đảo trong code.** `np.linalg.inv(A) @ b` vừa chậm vừa kém ổn định số học; dùng `np.linalg.solve(A, b)`. Đây là lời khuyên thực hành quan trọng mà sách toán không nói.
- **Ma trận vuông ≠ khả nghịch.** Cần thêm `det ≠ 0`, tương đương `rank` đầy đủ.

---

## 🔗 Liên kết
- **Tiền đề:** [[vector]]
- **Dẫn tới:** [[phep-bien-doi-tuyen-tinh]] · [[ma-tran-hiep-phuong-sai]]
- **Liên quan:** [[linear-regression]] · [[regularization]] · [[svd]]

## ❓ Câu hỏi mở
- Ridge cộng `λI` làm ma trận khả nghịch trở lại — điều đó có ý nghĩa hình học gì?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Đại số tuyến tính
