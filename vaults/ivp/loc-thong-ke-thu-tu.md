---
slug: loc-thong-ke-thu-tu
title: Bộ lọc thích nghi & chọn theo loại nhiễu
vault: ivp
type: concept
branch: E
order: 8
status: learning
tags: [ivp, phuc-hoi, loc]
prev: [uoc-luong-nhieu]
next: [fourier-2d]
related: [loc-trung-vi, loc-lam-min]
sources: ["L7 — Image Restoration"]
created: 2026-08-10
---

# Bộ lọc thích nghi & chọn theo loại nhiễu

> Tóm tắt 1 câu: bảng quyết định "nhiễu nào → lọc nào", và ý tưởng vượt lên trên bảng đó: **bộ lọc tự đổi hành vi theo từng vùng ảnh**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #8 ← cần [[uoc-luong-nhieu]] · → kế tiếp [[fourier-2d]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #phuc-hoi #loc

---

## 💡 Bảng quyết định

| Loại nhiễu | Bộ lọc nên dùng | Vì sao |
|---|---|---|
| **Gaussian / uniform / Erlang** | Trung bình cộng, Gaussian | Trung bình hoá đúng bản chất nhiễu cộng nhỏ |
| Gaussian, **cần giữ chi tiết hơn** | Trung bình **hình học** | Ít làm mờ hơn trung bình cộng |
| **Muối tiêu** (cả hai) | **Trung vị** | Bền vững với giá trị cực đoan |
| Chỉ **salt** | **Min**, hoặc contraharmonic `R<0` | Loại giá trị lớn |
| Chỉ **pepper** | **Max**, hoặc contraharmonic `R>0` | Loại giá trị nhỏ |
| Gaussian **+** muối tiêu | **Alpha-trimmed**, hoặc trung vị **rồi** trung bình | Bỏ hai đầu rồi trung bình phần giữa |
| **Tuần hoàn** | ⚠️ **Notch / band-reject** trong miền tần số | Lọc không gian bó tay hoàn toàn |
| Mờ **+** nhiễu | [[wiener-filter]] | Xử lý đồng thời cả hai |

## 🧩 Vấn đề chung của mọi bộ lọc cố định

Tất cả bảng trên đều dùng **cùng một quy tắc cho mọi pixel**. Nhưng ảnh không đồng nhất: có vùng phẳng (cần làm mịn mạnh) và có vùng nhiều cạnh (cần giữ nguyên).

Bộ lọc cố định buộc phải chọn **một** mức thoả hiệp cho cả hai — và thoả hiệp đó tệ ở cả hai nơi.

## ⚙️ Bộ lọc thích nghi — ý tưởng

**Đo phương sai cục bộ** trong cửa sổ rồi quyết định:

| Phương sai cục bộ | Nghĩa là | Hành động |
|---|---|---|
| ≈ phương sai nhiễu | Vùng **phẳng**, biến thiên chỉ do nhiễu | Làm mịn **mạnh** |
| ≫ phương sai nhiễu | Có **cạnh/chi tiết** thật | **Gần như giữ nguyên** |

Công thức tiêu biểu (lọc Lee):

$$
\hat{f} = g - \frac{\sigma_n^2}{\sigma_L^2}\,(g - \bar{g}_L)
$$

Khi `σ_L² ≈ σ_n²` (vùng phẳng) → hệ số ≈ 1 → kết quả ≈ trung bình cục bộ.
Khi `σ_L² ≫ σ_n²` (có cạnh) → hệ số ≈ 0 → kết quả ≈ giữ nguyên `g`.

> 📌 **Đây là bước thoát khỏi đánh đổi "khử nhiễu ↔ giữ cạnh"** mà [[loc-lam-min]] mắc phải. Cái giá: phải biết `σ_n²`, tức là phải làm [[uoc-luong-nhieu]] trước.

**Trung vị thích nghi** đi theo hướng khác: **nới rộng cửa sổ** dần cho tới khi tìm được trung vị không phải giá trị cực đoan. Nhờ vậy xử lý được ảnh có mật độ muối tiêu rất cao, nơi trung vị cửa sổ cố định `3×3` đã thất bại.

## ⚠️ Điều dễ nhầm

- **Không có bộ lọc tốt nhất tuyệt đối.** Bảng trên chỉ đúng khi đã xác định đúng loại nhiễu — nên [[uoc-luong-nhieu]] mới là bước quyết định, không phải việc chọn bộ lọc.
- **Bộ lọc thích nghi đắt hơn nhiều** (tính phương sai ở mỗi cửa sổ) và **nhạy với ước lượng `σ_n²` sai** — đoán nhiễu cao hơn thực tế thì làm mờ oan các vùng có chi tiết.
- **Lọc nhiều lần không tốt hơn lọc một lần đúng cách.** Mỗi lượt lọc là một lần mất chi tiết vĩnh viễn.

---

## 🔗 Liên kết
- **Tiền đề:** [[uoc-luong-nhieu]] · [[nhieu-anh]]
- **Dẫn tới:** [[fourier-2d]] · [[wiener-filter]]
- **Liên quan:** [[loc-trung-vi]] · [[loc-lam-min]] · [[loc-tan-so]]

## ❓ Câu hỏi mở
- Bộ lọc song phương và non-local means cũng "thích nghi" — chúng dùng tiêu chí gì thay cho phương sai cục bộ?

## 📚 Nguồn
- Lecture 7 — Image Restoration
