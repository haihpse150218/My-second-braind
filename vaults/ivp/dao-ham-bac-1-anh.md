---
slug: dao-ham-bac-1-anh
title: Gradient & mask Sobel/Prewitt/Roberts
vault: ivp
type: concept
branch: G
order: 2
status: learning
tags: [ivp, bien]
prev: [bien-anh-la-gi]
next: [laplacian-va-log]
related: [tich-chap-2d, canny]
sources: ["L9 — Edge Detection"]
created: 2026-08-10
---

# Gradient & mask Sobel/Prewitt/Roberts

> Tóm tắt 1 câu: xấp xỉ đạo hàm bằng **hiệu giữa các pixel kề nhau**, đóng gói thành kernel `3×3` — và mọi mask dò biên đều có **tổng hệ số bằng 0**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh G · #2 ← cần [[bien-anh-la-gi]] · → kế tiếp [[laplacian-va-log]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #bien

---

## 💡 Ý chính

Gradient của ảnh là một **vector** tại mỗi pixel:

$$
\nabla f = \begin{bmatrix} G_x \\ G_y \end{bmatrix},
\quad |\nabla f| = \sqrt{G_x^2 + G_y^2} \approx |G_x| + |G_y|,
\quad \theta = \arctan\frac{G_y}{G_x}
$$

| Thành phần | Ý nghĩa |
|---|---|
| **Độ lớn** `\|∇f\|` | Biên **mạnh cỡ nào** |
| **Hướng** `θ` | Hướng biến thiên nhanh nhất — **vuông góc với biên** |

Xấp xỉ `|Gx|+|Gy|` dùng thay căn bậc hai vì rẻ hơn nhiều và sai lệch chấp nhận được.

## 🔢 Ba bộ mask

**Roberts** `2×2` — rẻ nhất, dò theo đường **chéo**:
```
Gx = [ 1  0 ]      Gy = [ 0  1 ]
     [ 0 −1 ]           [−1  0 ]
```

**Prewitt** `3×3` — trung bình đều 3 hàng:
```
Gx = [−1 0 1]      Gy = [−1 −1 −1]
     [−1 0 1]           [ 0  0  0]
     [−1 0 1]           [ 1  1  1]
```

**Sobel** `3×3` — như Prewitt nhưng **nhân đôi hàng/cột giữa**:
```
Gx = [−1 0 1]      Gy = [−1 −2 −1]
     [−2 0 2]           [ 0  0  0]
     [−1 0 1]           [ 1  2  1]
```

> 📌 Hệ số `2` ở giữa của Sobel **không phải tuỳ tiện**: nó tương đương làm mịn nhẹ theo phương vuông góc trước khi lấy đạo hàm. Sobel = đạo hàm **kèm** khử nhiễu — đó là lý do nó gần như luôn được chọn thay Prewitt.

**Tổng hệ số của mọi mask này đều bằng 0** — vùng phẳng cho kết quả `0`, chỉ chỗ có biến thiên mới khác `0`. Đây là dấu hiệu nhận biết kernel dò biên, đối lập với kernel làm mờ (tổng `= 1`), xem [[tich-chap-2d]].

## ⚙️ So sánh nhanh

| Mask | Cỡ | Khử nhiễu | Định vị | Ghi chú |
|---|---|---|---|---|
| **Roberts** | `2×2` | ❌ kém | Tốt | Nhạy nhiễu; tâm nằm giữa 4 pixel → lệch nửa pixel |
| **Prewitt** | `3×3` | Trung bình | Tốt | |
| **Sobel** | `3×3` | **Khá** | Tốt | ⭐ Mặc định thực tế |
| **Compass** (Kirsch, Robinson) | `3×3` ×8 | Trung bình | Tốt | 8 mask cho 8 hướng, lấy max — bắt biên mọi hướng nhưng đắt gấp 8 |

## ⚠️ Điều dễ nhầm

- **Phải tính ở `double`.** Kết quả `Gx`, `Gy` **có dấu âm**; ép về `uint8` giữa chừng là mất một nửa thông tin, xem [[kieu-du-lieu-anh]].
- **Ảnh gradient không phải ảnh biên.** Nó là ảnh **độ lớn gradient** — biên hiện lên dày và mờ. Muốn có biên mảnh 1 pixel thì cần **non-maximum suppression**, bước có trong [[canny]].
- **Ngưỡng là bước riêng và quan trọng ngang thuật toán.** Cùng một ảnh gradient, đổi ngưỡng cho ra kết quả khác hẳn.
- **Sobel vẫn nhạy nhiễu** dù có làm mịn nhẹ. Ảnh nhiễu nhiều thì phải [[loc-lam-min]] mạnh hơn trước.
- **`Gx` bắt cạnh DỌC** (biến thiên theo phương ngang), không phải cạnh ngang. Rất dễ nhớ ngược.

---

## 🔗 Liên kết
- **Tiền đề:** [[bien-anh-la-gi]] · [[tich-chap-2d]]
- **Dẫn tới:** [[laplacian-va-log]] · [[canny]]
- **Liên quan:** [[gian-no-va-co-hep]] · [[kieu-du-lieu-anh]]
- **Liên môn:** [[ml/gradient]] — cùng khái niệm gradient, ở đây lấy theo **toạ độ không gian** thay vì theo tham số mô hình.

## ❓ Câu hỏi mở
- Kernel Sobel có phải xấp xỉ đạo hàm tối ưu không, hay chỉ là lựa chọn thuận tiện?

## 📚 Nguồn
- Lecture 9 — Edge Detection
