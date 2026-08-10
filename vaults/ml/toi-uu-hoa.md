---
slug: toi-uu-hoa
title: Tối ưu hoá — bài toán gốc của học máy
vault: ml
type: concept
branch: A
order: 13
status: learning
tags: [toan, toi-uu-hoa, nen-tang]
prev: [loss-function]
next: [toi-uu-loi]
related: [gradient-descent, loss-function]
created: 2026-08-10
---

# Tối ưu hoá — bài toán gốc của học máy

> Tóm tắt 1 câu: **huấn luyện = tối ưu hoá** — tìm bộ tham số làm hàm mất mát nhỏ nhất; mọi thuật toán train chỉ khác nhau ở cách đi tìm.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A (Giải tích → Tối ưu) · #13 ← cần [[loss-function]] · → kế tiếp [[toi-uu-loi]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #toi-uu-hoa #nen-tang

---

## 💡 Ý chính

$$
w^* = \arg\min_{w} \; L(w)
$$

Đọc: tìm **bộ tham số `w`** làm cho hàm mất mát `L` nhỏ nhất. Ký hiệu `arg min` trả về **vị trí** đạt cực tiểu, không phải giá trị cực tiểu.

Ba thành phần của mọi bài toán tối ưu:

| Thành phần | Trong ML là |
|---|---|
| **Hàm mục tiêu** | [[loss-function]] — thứ cần làm nhỏ nhất |
| **Biến quyết định** | Trọng số `w` — thứ được phép chỉnh |
| **Ràng buộc** | Thường ngầm: [[regularization]] phạt `w` quá lớn |

> 📌 Nhìn theo góc này thì **mọi thuật toán học có giám sát là cùng một bài toán**, chỉ khác ở `L` và ở cách đi tìm `w*`. Đó là lý do nhánh A xếp giải tích trước thuật toán.

## ⚙️ Hai cách giải — và vì sao ML gần như luôn chọn cách 2

| | **Giải tích** (closed-form) | **Lặp** (iterative) |
|---|---|---|
| Cách làm | Đặt `∇L = 0`, giải phương trình | Đoán rồi chỉnh dần theo [[gradient]] |
| Ví dụ | Normal Equation của [[linear-regression]] | [[gradient-descent]] |
| Ưu | Chính xác tuyệt đối, một bước xong | Chạy được với **mọi** hàm khả vi |
| Nhược | ⚠️ Chỉ có với vài bài toán rất đơn giản; cần **nghịch đảo ma trận** `O(n³)` | Xấp xỉ, cần chọn siêu tham số |

Normal Equation `w = (XᵀX)⁻¹Xᵀy` tồn tại và đúng — nhưng chỉ cho hồi quy tuyến tính. Với `n = 10.000` đặc trưng thì nghịch đảo ma trận `10.000×10.000` đã không khả thi, còn với mạng nơ-ron thì **không có công thức nào cả**.

→ Thực tế: **hầu như luôn dùng phương pháp lặp**.

## ⚙️ Bốn dạng nghiệm

Điều kiện `∇L(w) = 0` gọi là **điểm dừng** — nhưng điểm dừng có nhiều loại:

| Loại | Đặc điểm | Với ML |
|---|---|---|
| **Cực tiểu toàn cục** | Thấp nhất trên toàn miền | Thứ ta muốn |
| **Cực tiểu địa phương** | Thấp nhất trong lân cận | Chấp nhận được nếu đủ tốt |
| **Cực đại** | Cao nhất | Không bao giờ tới (ta đang đi xuống) |
| **Điểm yên ngựa** | Dốc lên hướng này, xuống hướng kia | ⚠️ **Trở ngại chính** trong không gian nhiều chiều |

Trong không gian hàng triệu chiều, **điểm yên ngựa nhiều hơn hẳn cực tiểu địa phương** — vì để là cực tiểu thì **mọi** hướng đều phải dốc lên, xác suất rất thấp. Đây là lý do nỗi lo "kẹt ở cực tiểu địa phương" thường bị phóng đại; vấn đề thật là **vùng phẳng quanh yên ngựa** làm gradient nhỏ và train chậm lại.

Hàm **lồi** đảm bảo chỉ có một đáy → mọi điểm dừng đều là cực tiểu toàn cục. Xem [[toi-uu-loi]].

## ⚠️ Điều dễ nhầm

- **Tối ưu ≠ học tốt.** Tối ưu hoàn hảo trên tập train là [[overfitting]]. Mục tiêu thật là hiệu năng trên dữ liệu **chưa thấy** — nên đôi khi **dừng sớm** lại tốt hơn tối ưu triệt để.
- **Hàm mục tiêu là thứ ta chọn, không phải thứ có sẵn.** Chọn sai `L` thì tối ưu hoàn hảo vẫn ra model vô dụng — cùng bài học ở [[danh-gia-mo-hinh]] và [[../vaults/dsp/snr|dsp/snr]].
- **`arg min` có thể không duy nhất.** Nhiều bộ `w` khác nhau cho cùng loss — hiện tượng thường gặp ở mạng nơ-ron do tính đối xứng giữa các neuron.

---

## 🔗 Liên kết
- **Tiền đề:** [[loss-function]] · [[dao-ham-rieng]]
- **Dẫn tới:** [[toi-uu-loi]] · [[gradient-descent]]
- **Liên quan:** [[regularization]] · [[overfitting]] · [[maximum-likelihood]]

## ❓ Câu hỏi mở
- Nếu điểm yên ngựa phổ biến hơn cực tiểu địa phương, vì sao SGD vẫn thoát ra được mà GD thuần thì chật vật?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Tối ưu hoá
