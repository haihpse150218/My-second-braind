---
slug: hough-transform
title: Biến đổi Hough
vault: ivp
type: concept
branch: G
order: 5
status: learning
tags: [ivp, bien]
prev: [canny]
next: [phan-doan-anh]
related: [canny, bien-anh-la-gi]
sources: ["L9 — Edge Detection"]
created: 2026-08-10
---

# Biến đổi Hough

> Tóm tắt 1 câu: mỗi điểm biên **bỏ phiếu** cho tất cả đường thẳng đi qua nó; đường nào được nhiều phiếu nhất là đường thật — nhờ vậy nối được cả biên **đứt đoạn**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh G · #5 ← cần [[canny]] · → kế tiếp [[phan-doan-anh]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #bien

---

## 💡 Ý chính — đổi vai điểm và đường

Ý tưởng cốt lõi: **một điểm trong ảnh ⟷ một đường cong trong không gian tham số**.

| Không gian ảnh | Không gian Hough `(ρ, θ)` |
|---|---|
| Một **điểm** `(x,y)` | Một **đường cong** (hình sin) |
| Một **đường thẳng** | Một **điểm** |
| Nhiều điểm **thẳng hàng** | Nhiều đường cong **cắt nhau tại 1 điểm** |

→ Bài toán "tìm đường thẳng trong ảnh" (khó, phải thử tổ hợp) biến thành "tìm **điểm sáng nhất** trong mảng tích luỹ" (dễ, chỉ cần tìm cực đại).

## 🔢 Vì sao dùng `(ρ, θ)` chứ không dùng `y = mx + b`

$$
\rho = x\cos\theta + y\sin\theta
$$

| | `y = mx + b` | `(ρ, θ)` |
|---|---|---|
| Đường **thẳng đứng** | `m → ∞` ❌ | `θ = 0`, hoàn toàn bình thường ✅ |
| Miền tham số | **Vô hạn** | `ρ` hữu hạn (≤ đường chéo ảnh), `θ ∈ [0°, 180°)` |

Miền tham số hữu hạn là điều kiện bắt buộc để **rời rạc hoá thành mảng tích luỹ**. Đây là lý do duy nhất nhưng đủ quyết định.

| Ký hiệu | Ý nghĩa hình học |
|---|---|
| `ρ` | Khoảng cách từ **gốc toạ độ** tới đường thẳng |
| `θ` | Góc của đường **pháp tuyến** |

## ⚙️ Thuật toán

```
1. Dò biên (Canny) → ảnh nhị phân các điểm biên
2. Tạo mảng tích luỹ A[ρ][θ] = 0
3. Với MỖI điểm biên (x,y):
     với mỗi θ trong [0°,180°):
         ρ = x·cosθ + y·sinθ
         A[ρ][θ] += 1              ← bỏ phiếu
4. Tìm các cực đại cục bộ trong A → mỗi cực đại là một đường thẳng
5. Truy ngược ra đoạn thẳng trong ảnh
```

**Vì sao chịu được biên đứt:** một đường thẳng bị đứt làm 3 đoạn vẫn có tổng số điểm biên như cũ, nên ô `A[ρ][θ]` tương ứng vẫn nhận đủ phiếu. **Hough không quan tâm các điểm có liền nhau hay không**, chỉ quan tâm chúng có **thẳng hàng** hay không.

Đây là ưu thế mà không phép nối biên cục bộ nào có được — và là lý do Hough là bước 3 trong quy trình dò biên chuẩn.

## ⚙️ Ứng dụng & mở rộng

- **Phát hiện làn đường** cho xe tự lái; **biên bảng/tài liệu** để chỉnh nghiêng ảnh scan; **khung cửa, mép nhà** trong ảnh kiến trúc.
- **Hough tròn** — tham số `(a, b, r)`, mảng tích luỹ **3 chiều**: dò đồng xu, mống mắt, biển báo tròn.
- **Generalized Hough** — dò hình bất kỳ bằng bảng tra R-table.

## ⚠️ Điều dễ nhầm

- **Chi phí bùng nổ theo số tham số.** Đường thẳng 2D đã nặng; đường tròn 3D thì rất nặng; hình tuỳ ý thì không khả thi nếu không có mẹo.
- **Bước rời rạc hoá `ρ`, `θ` là đánh đổi.** Ô quá mịn → phiếu của cùng một đường bị **tán ra nhiều ô lân cận**, không ô nào nổi bật. Ô quá thô → nhiều đường khác nhau gộp làm một.
- **Cho ra đường thẳng VÔ HẠN**, không phải đoạn thẳng. Muốn có điểm đầu/cuối phải truy ngược lại các điểm biên đã bầu cho đường đó (biến thể Probabilistic Hough làm sẵn việc này).
- **Phụ thuộc hoàn toàn vào chất lượng dò biên.** Biên dày (không qua non-maximum suppression) làm phiếu bầu bị nhân lên và mảng tích luỹ nhoè. Biên nhiễu tạo cực đại giả.

---

## 🔗 Liên kết
- **Tiền đề:** [[canny]] · [[bien-anh-la-gi]]
- **Dẫn tới:** [[phan-doan-anh]]
- **Liên quan:** [[bien-doi-affine]] · [[thanh-phan-lien-thong]]

## ❓ Câu hỏi mở
- Hough là "bỏ phiếu trong không gian tham số" — ý tưởng này còn dùng được ở bài toán thị giác nào khác?

## 📚 Nguồn
- Lecture 9 — Edge Detection
