---
slug: phep-bien-doi-tuyen-tinh
title: Phép biến đổi tuyến tính
vault: ml
type: concept
branch: B
order: 3
status: learning
tags: [toan, dai-so-tuyen-tinh]
prev: [ma-tran]
next: [ma-tran-hiep-phuong-sai]
related: [tri-rieng-vector-rieng, ma-tran]
created: 2026-08-10
---

# Phép biến đổi tuyến tính

> Tóm tắt 1 câu: nhân ma trận **chính là** biến đổi không gian — xoay, kéo giãn, chiếu; và trị riêng là những hướng **không bị xoay** bởi phép biến đổi đó.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B (Đại số tuyến tính → PCA) · #3 ← cần [[ma-tran]] · → kế tiếp [[ma-tran-hiep-phuong-sai]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #dai-so-tuyen-tinh

---

## 💡 Ý chính

$$
T(\mathbf{x}) = A\mathbf{x}
$$

Hai điều kiện định nghĩa "tuyến tính":
$$
T(\mathbf{u}+\mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v}), \qquad T(c\mathbf{u}) = c\,T(\mathbf{u})
$$

Hệ quả hình học: **đường thẳng vẫn thẳng, gốc toạ độ đứng yên, lưới song song vẫn song song và cách đều**. Chỉ có kéo giãn và xoay, không có bẻ cong.

## 🧩 Đọc ma trận như một phép biến đổi

| Ma trận `2×2` | Làm gì với mặt phẳng |
|---|---|
| `[[2,0],[0,1]]` | **Kéo giãn** gấp đôi theo trục x |
| `[[cosθ,−sinθ],[sinθ,cosθ]]` | **Xoay** góc `θ` |
| `[[1,0],[0,0]]` | **Chiếu** mọi điểm xuống trục x — **mất một chiều** |
| `[[1,0.5],[0,1]]` | **Trượt** (shear) |

**Mẹo đọc nhanh:** các **cột** của `A` chính là ảnh của các vector đơn vị. Cột 1 cho biết `[1,0]` bay đi đâu, cột 2 cho biết `[0,1]` bay đi đâu. Biết hai cái đó là biết toàn bộ phép biến đổi.

**Nhân hai ma trận = làm hai phép biến đổi liên tiếp.** Và vì thứ tự làm việc có ảnh hưởng nên `AB ≠ BA` — giờ thì lý do hình học đã rõ.

## ⚙️ Vì sao khái niệm này quan trọng với ML

**1. Một tầng Dense là một phép biến đổi tuyến tính.**
$$
h = \sigma(Wx + b)
$$
`Wx` biến đổi không gian đặc trưng; `σ` bẻ cong nó. **Ghép nhiều tầng tuyến tính liên tiếp vẫn ra tuyến tính** (`W₂W₁x = (W₂W₁)x` — một ma trận duy nhất) → đó là chứng minh gọn nhất cho việc mạng nơ-ron **bắt buộc** phải có hàm kích hoạt phi tuyến ở giữa.

**2. Chiếu = giảm chiều.** Ma trận chiếu ép dữ liệu xuống không gian ít chiều hơn. **Chọn chiếu xuống hướng nào** chính là toàn bộ nội dung của [[pca]].

**3. Trị riêng = hướng không bị xoay.** Với hầu hết vector, `Ax` chỉ về hướng khác `x`. Nhưng có vài hướng đặc biệt mà `Ax` **cùng phương** với `x`, chỉ dài ra hoặc ngắn lại:
$$
A\mathbf{v} = \lambda\mathbf{v}
$$
Đó là **vector riêng** `v` với **trị riêng** `λ`. Chúng là "trục tự nhiên" của phép biến đổi — xem [[tri-rieng-vector-rieng]].

## ⚠️ Điều dễ nhầm

- **`Ax + b` không phải biến đổi tuyến tính** (gốc toạ độ bị dịch) mà là **affine**. ML gọi chung là "tuyến tính" cho tiện — chấp nhận được nhưng nên biết.
- **Chiếu là phép mất mát không đảo ngược được.** `det = 0` ⇒ không nghịch đảo ⇒ nhiều điểm khác nhau bị dồn về cùng một chỗ. Đây là bản chất của việc giảm chiều: **luôn mất thông tin**, câu hỏi chỉ là mất cái ít quan trọng nhất.
- **Ma trận trực giao (phép xoay) giữ nguyên khoảng cách và góc** — đó là lý do PCA dùng nó: xoay trục thì hình dạng đám dữ liệu không đổi, chỉ đổi cách nhìn.

---

## 🔗 Liên kết
- **Tiền đề:** [[ma-tran]] · [[vector]]
- **Dẫn tới:** [[ma-tran-hiep-phuong-sai]] · [[tri-rieng-vector-rieng]]
- **Liên quan:** [[pca]] · [[neural-network]]
- **Liên môn:** [[dl/perceptron]] — một neuron chính là một phép biến đổi affine cộng hàm kích hoạt.

## ❓ Câu hỏi mở
- Nếu ghép tầng tuyến tính vẫn ra tuyến tính, vì sao mạng sâu **có** hàm kích hoạt lại mạnh hơn hẳn mạng nông?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Đại số tuyến tính
