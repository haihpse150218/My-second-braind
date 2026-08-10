---
slug: wiener-filter
title: Bộ lọc Wiener
vault: ivp
type: concept
branch: E
order: 13
status: learning
tags: [ivp, phuc-hoi]
prev: [loc-nguoc]
next: [hinh-thai-hoc]
related: [mo-hinh-suy-hao, loc-nguoc]
sources: ["L7 — Image Restoration"]
created: 2026-08-10
---

# Bộ lọc Wiener

> Tóm tắt 1 câu: lọc ngược **có phanh** — tự động lùi lại ở những tần số mà nhiễu lấn át tín hiệu, thay vì chia bừa rồi nổ.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #13 ← cần [[loc-nguoc]] · → kế tiếp [[hinh-thai-hoc]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #phuc-hoi

---

## 💡 Ý chính

$$
\hat{F}(u,v) = \left[\frac{1}{H(u,v)} \cdot \frac{|H(u,v)|^{2}}{|H(u,v)|^{2} + K}\right] G(u,v)
$$

Đọc công thức theo **hai thừa số**:

| Thừa số | Vai trò |
|---|---|
| `1/H` | Chính là [[loc-nguoc]] — phần khử mờ |
| `\|H\|² / (\|H\|² + K)` | **Phanh** — hệ số trong `[0,1]` |

Hành vi của phanh:

| Khi | Phanh | Kết quả |
|---|---|---|
| `\|H\|² ≫ K` (tần số tín hiệu mạnh) | ≈ **1** | Khử mờ hết mức |
| `\|H\|² ≪ K` (tần số nhiễu lấn át) | ≈ **0** | **Tự động dập**, không cho nổ |

> 📌 Đây là toàn bộ cái hay: **phanh tự điều chỉnh theo từng tần số**, không cần đặt ngưỡng tay như các cách vá của lọc ngược.

`K = 0` thì công thức thoái hoá về đúng lọc ngược — nên Wiener là bản **tổng quát hoá** của lọc ngược.

## 🧩 `K` là gì và chỉnh thế nào

Về lý thuyết `K` là **tỉ số phổ công suất nhiễu trên tín hiệu** `S_n/S_f`. Thực tế hiếm khi biết cả hai phổ, nên `K` được dùng như **một hằng số chỉnh tay**:

| `K` | Kết quả | Khi nào |
|---|---|---|
| **Nhỏ** | Nét hơn, nhưng **nhiễu nổi rõ** | Ảnh sạch, ít nhiễu |
| **Lớn** | Mượt, ít nhiễu, nhưng **vẫn còn mờ** | Ảnh nhiễu nhiều |

→ `K` chính là **núm đánh đổi giữa "nét" và "sạch"**. Không có giá trị đúng tuyệt đối; ước lượng phương sai nhiễu bằng [[uoc-luong-nhieu]] cho một điểm khởi đầu hợp lý.

## ⚙️ Vì sao gọi là "tối ưu"

Wiener là lời giải **tối thiểu hoá sai số bình phương trung bình**:

$$
E\left[(f - \hat{f})^{2}\right] \to \min
$$

Tức là trong họ bộ lọc tuyến tính, **không có bộ lọc nào cho MSE thấp hơn** (với giả định biết đúng `H` và phổ công suất).

⚠️ Nhưng **"tối ưu MSE" không đồng nghĩa với "trông đẹp nhất"**. MSE trừng phạt sai lệch lớn rất nặng nên nó **thiên về ảnh mượt** — kết quả Wiener thường hơi mờ so với cái mắt người muốn thấy. Đây đúng là bài học lặp lại ở [[ml/danh-gia-mo-hinh]]: **chọn sai chỉ số là tối ưu sai thứ**.

Cùng lý do, các mô hình siêu phân giải tối ưu MSE/PSNR cho ảnh mượt và "an toàn", trong khi tối ưu perceptual loss cho ảnh trông sắc nét hơn dù PSNR thấp hơn — xem [[../../projects/image-super-resolution|📦 image-super-resolution]].

## ⚙️ Khi nào dùng

- Ảnh **vừa mờ vừa nhiễu** — trường hợp thực tế phổ biến nhất.
- **Biết hoặc ước lượng được `h`**: mờ do chuyển động (biết hướng và độ dài vệt), mờ do lệch tiêu cự (đĩa tròn bán kính `r`).
- Không biết `h` thì cần **blind deconvolution** — ước lượng đồng thời `f` và `h`, khó hơn hẳn và kém ổn định.

## ⚠️ Điều dễ nhầm

- **Wiener không phải phép màu.** Tần số nào `H` đã xoá sạch thì Wiener cũng chịu — nó chỉ tránh **khuếch đại nhiễu**, không tạo lại thông tin đã mất.
- **`H` sai thì Wiener sai.** Toàn bộ chất lượng phụ thuộc vào việc ước lượng `h` đúng.
- **Chỉnh `K` bằng mắt là chuyện bình thường**, không phải làm ẩu — vì tiêu chí cuối cùng thường là thị giác chứ không phải MSE.

---

## 🔗 Liên kết
- **Tiền đề:** [[loc-nguoc]] · [[mo-hinh-suy-hao]]
- **Dẫn tới:** [[hinh-thai-hoc]]
- **Liên quan:** [[uoc-luong-nhieu]] · [[loc-tan-so]]
- **Liên môn:** [[ml/danh-gia-mo-hinh]] — "tối ưu theo chỉ số nào" quyết định kết quả trông ra sao, ở đây cũng vậy.

## ❓ Câu hỏi mở
- Wiener tối ưu trong họ **tuyến tính**; mạng phi tuyến vượt qua giới hạn đó bằng cách nào?

## 📚 Nguồn
- Lecture 7 — Image Restoration
