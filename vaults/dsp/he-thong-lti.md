---
slug: he-thong-lti
title: Hệ thống LTI
vault: dsp
type: concept
branch: A
order: 3
status: learning
tags: [dsp, co-ban, nen-tang]
prev: [dinh-ly-lay-mau]
next: [tich-chap]
related: [tich-chap, bo-loc-so]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# Hệ thống LTI

> Tóm tắt 1 câu: **tuyến tính + bất biến thời gian** — hai giả định nghe khiêm tốn nhưng cho phép mô tả **toàn bộ** hệ thống bằng đúng một dãy số.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #3 ← cần [[dinh-ly-lay-mau]] · → kế tiếp [[tich-chap]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #co-ban #nen-tang

---

## 💡 Hai tính chất

| Tính chất | Phát biểu | Nghĩa thực tế |
|---|---|---|
| **Tuyến tính** | `a·x₁ + b·x₂ → a·y₁ + b·y₂` | Trộn hai tín hiệu rồi lọc = lọc riêng rồi trộn |
| **Bất biến thời gian** | `x[n−k] → y[n−k]` | Hệ thống **không đổi hành vi** theo thời gian |

Tuyến tính gồm hai phần: **cộng tính** (đáp ứng tổng = tổng đáp ứng) và **thuần nhất** (nhân đầu vào lên gấp đôi thì đầu ra gấp đôi).

## 🧩 Vì sao hai giả định này quan trọng đến vậy

Hệ quả: **chỉ cần biết đáp ứng với MỘT đầu vào duy nhất là biết hết.**

Đầu vào đó là **xung đơn vị** `δ[n]` (bằng 1 tại `n=0`, bằng 0 ở mọi chỗ khác). Đáp ứng gọi là **đáp ứng xung** `h[n]`.

```
Mọi tín hiệu x[n]  =  tổng các xung đã dịch và nhân hệ số
        ↓ tuyến tính + bất biến
Đáp ứng y[n]       =  tổng các h[n] đã dịch và nhân hệ số
                   =  x[n] * h[n]   ← chính là TÍCH CHẬP
```

> 📌 Đây là lý do [[tich-chap]] là phép toán trung tâm của DSP: nó không phải một công thức tuỳ chọn, mà là **hệ quả bắt buộc** của hai giả định LTI.

`h[n]` là "chứng minh thư" của hệ thống — biết nó là dự đoán được đầu ra cho **bất kỳ** đầu vào nào, không cần biết bên trong hệ thống có gì.

## ⚙️ Hai tính chất kèm theo

**Nhân quả (causal):** `h[n] = 0` với `n < 0` — đầu ra không phụ thuộc đầu vào **tương lai**. Bắt buộc với hệ chạy **thời gian thực**.

Nhưng khi xử lý **file đã ghi sẵn** thì toàn bộ tín hiệu đã có sẵn → dùng được bộ lọc **không nhân quả**. Đó là cơ sở của kỹ thuật **lọc pha-zero** (`filtfilt`) trong project: lọc xuôi rồi lọc ngược, triệt tiêu hoàn toàn độ trễ pha — xem [[pha-tuyen-tinh]].

**Ổn định (stable):** đầu vào bị chặn thì đầu ra bị chặn. Điều kiện: `Σ|h[n]| < ∞`. FIR luôn thoả (h hữu hạn); IIR thì phải kiểm tra, xem [[fir-vs-iir]].

## ⚠️ Điều dễ nhầm

- **Hệ thực tế hiếm khi LTI hoàn hảo.** Loa méo phi tuyến khi vặn to; micro đổi đặc tính theo nhiệt độ. LTI là **mô hình xấp xỉ** — dùng được vì trong dải hoạt động bình thường sai lệch nhỏ.
- **Chuẩn hoá biên độ phá tính tuyến tính.** Bước peak normalization trong project chia tín hiệu cho `max|x[n]|` — hệ số chia **phụ thuộc chính tín hiệu**, nên phép này **không tuyến tính**. Nó nằm ngoài khung LTI và phải xét riêng.
- **Bất biến thời gian ≠ tín hiệu không đổi.** Nó nói về **hệ thống**, không nói về tín hiệu. Tín hiệu có đổi theo thời gian hay không là chuyện của [[tin-hieu-dung]].

---

## 🔗 Liên kết
- **Tiền đề:** [[dinh-ly-lay-mau]]
- **Dẫn tới:** [[tich-chap]] · [[bo-loc-so]]
- **Liên môn:** [[ivp/tich-chap-2d]] — bộ lọc ảnh tuyến tính cũng là hệ LTI, chỉ khác là bất biến theo **vị trí** thay vì thời gian.

## ❓ Câu hỏi mở
- Hệ phi tuyến (như bộ nén động dải) không có đáp ứng xung — mô tả chúng bằng gì?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §3
