---
slug: khoang-tin-cay
title: Khoảng tin cậy
vault: ml
type: concept
branch: C
order: 19
status: learning
tags: [toan, thong-ke, suy-dien]
prev: [thong-ke]
related: [kiem-dinh-gia-thuyet, p-value]
created: 2026-08-10
---

# Khoảng tin cậy

> Tóm tắt 1 câu: báo cáo một **khoảng** kèm mức tin cậy thay vì một con số trần trụi — vì ước lượng từ mẫu **luôn có sai số**, và giấu sai số đi là báo cáo sai.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C (Xác suất → Thống kê) · #19 ← cần [[thong-ke]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #thong-ke #suy-dien

---

## 💡 Ý chính

$$
\bar{x} \pm z \cdot \frac{s}{\sqrt{n}}
$$

| Ký hiệu | Ý nghĩa |
|---|---|
| `x̄` | Trung bình mẫu — ước lượng điểm |
| `s/√n` | **Sai số chuẩn** (standard error) |
| `z` | Hệ số theo mức tin cậy: **1,96** cho 95%, 2,58 cho 99% |

Chú ý `√n` ở mẫu số: muốn khoảng **hẹp đi một nửa** thì cần **gấp 4 lần** dữ liệu. Đây là lý do cải thiện độ chính xác ước lượng ngày càng đắt.

## ⚠️ Diễn giải đúng — chỗ gần như ai cũng sai

> 🚨 **SAI:** "có 95% xác suất giá trị thật nằm trong khoảng này."
> ✅ **ĐÚNG:** "nếu lặp lại thí nghiệm nhiều lần, **95% số khoảng** tính được theo cách này sẽ chứa giá trị thật."

Khác biệt tinh tế nhưng quan trọng: theo quan điểm tần suất, **giá trị thật là một hằng số cố định** — nó nằm trong khoảng hoặc không, không có xác suất gì cả. Cái ngẫu nhiên là **khoảng**, vì nó phụ thuộc mẫu ta bốc được.

(Muốn phát biểu kiểu "95% xác suất tham số nằm trong khoảng" thì cần **khoảng khả tín** Bayesian — khái niệm khác.)

## ⚙️ Vì sao ML cần khoảng tin cậy

**1. Báo cáo hiệu năng model.** "Accuracy 87%" là báo cáo thiếu. "Accuracy **87% ± 3%**" mới cho biết con số đáng tin tới đâu.

Với 10-fold [[cross-validation]], ta có 10 số accuracy → tính được khoảng tin cậy cho accuracy thật.

**2. So sánh hai model.** Model A `87%`, model B `89%` — B có thật sự tốt hơn?

| Tình huống | Kết luận |
|---|---|
| Khoảng của A và B **chồng lấn nhiều** | Chưa kết luận được |
| Hai khoảng **tách rời** | Khác biệt nhiều khả năng là thật |

Đây chính là việc mà [[../vaults/dsp/so-sanh-thong-ke|dsp501]] làm khi so hai pipeline — và cho kết luận **không có khác biệt** vì khoảng chồng lấn hoàn toàn.

**3. Quan hệ với [[kiem-dinh-gia-thuyet]].** Hai công cụ là **hai mặt của một đồng xu**:

> Khoảng tin cậy 95% **không chứa** giá trị `H₀` ⟺ `p < 0,05`.

Nhưng khoảng tin cậy nói được nhiều hơn `p`: nó cho biết **độ lớn** của hiệu ứng và **độ chính xác** của ước lượng. Chỉ báo `p` là bỏ mất thông tin đó — cùng lập luận với việc phải kèm Cohen's `d`.

## ⚙️ Bootstrap — khi không biết phân phối

Công thức trên giả định phân phối chuẩn (hoặc `n` đủ lớn). Với chỉ số phức tạp (F1, AUC) thì không có công thức sai số chuẩn.

**Bootstrap** giải quyết bằng cách mô phỏng:
```
1. Lấy mẫu CÓ HOÀN LẠI từ dữ liệu gốc, cùng cỡ n
2. Tính chỉ số trên mẫu đó
3. Lặp 1000 lần → 1000 giá trị
4. Khoảng 95% = phân vị 2,5% và 97,5% của 1000 giá trị đó
```

Không cần giả định gì về phân phối. Đây cũng chính là ý tưởng bootstrap trong [[ensemble-learning|bagging]] — xem [[random-forest]].

## ⚠️ Điều dễ nhầm

- **Khoảng hẹp ≠ ước lượng đúng.** Mẫu bị **thiên lệch** cho khoảng rất hẹp quanh một giá trị **sai**. Khoảng tin cậy chỉ đo sai số **ngẫu nhiên**, không đo sai số **hệ thống**. Xem [[lay-mau]].
- **95% là quy ước**, không thiêng liêng.
- **Nhiều khoảng cùng lúc thì mức tin cậy tổng giảm.** So 20 model, mỗi cái khoảng 95% → xác suất **ít nhất một** khoảng sai lên tới ~64%.

---

## 🔗 Liên kết
- **Tiền đề:** [[thong-ke]] · [[phuong-sai]]
- **Liên quan:** [[kiem-dinh-gia-thuyet]] · [[p-value]] · [[cross-validation]] · [[lay-mau]]
- **Liên môn:** [[dsp/so-sanh-thong-ke]] — dùng đúng công cụ này để kết luận hai pipeline không khác nhau.

## ❓ Câu hỏi mở
- Với accuracy từ 10-fold CV, các fold không hoàn toàn độc lập (chia sẻ dữ liệu train) — điều đó ảnh hưởng khoảng tin cậy thế nào?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Thống kê
