---
slug: uoc-luong-nhieu
title: Ước lượng loại nhiễu
vault: ivp
type: concept
branch: E
order: 7
status: learning
tags: [ivp, phuc-hoi, chan-doan]
prev: [nhieu-anh]
next: [loc-thong-ke-thu-tu]
related: [histogram-anh, nhieu-anh]
sources: ["L7 — Image Restoration"]
created: 2026-08-10
---

# Ước lượng loại nhiễu

> Tóm tắt 1 câu: crop một **vùng đồng nhất** rồi xem histogram của riêng vùng đó — hình dạng histogram **chính là** PDF của nhiễu.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #7 ← cần [[nhieu-anh]] · → kế tiếp [[loc-thong-ke-thu-tu]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #phuc-hoi #chan-doan

---

## 💡 Ý chính

Bước bị bỏ qua nhiều nhất, mà lại quyết định mọi thứ phía sau.

**Quy trình:**
1. Chọn một **vùng phẳng nhất có thể** trong ảnh — mảng tường, bầu trời, nền đồng màu.
2. Vẽ [[histogram-anh]] **chỉ của vùng đó**.
3. So dáng histogram với bảng PDF ở [[nhieu-anh]] → suy ra loại nhiễu.
4. Chọn bộ lọc tương ứng.

## 🧩 Vì sao phải là vùng đồng nhất

Trong một vùng lý tưởng phẳng, ảnh gốc `f` là **hằng số**. Mô hình [[mo-hinh-suy-hao]] rút gọn còn:

$$
g = c + n
$$

Histogram của `g` khi đó chính là **histogram của `n` bị dịch đi `c`** — dáng giữ nguyên tuyệt đối. Đây là toàn bộ mẹo: chọn vùng mà tín hiệu là hằng số thì cái còn dao động chỉ có thể là nhiễu.

Ngược lại, chọn vùng có texture hay biên thì histogram sẽ trộn lẫn **biến thiên của ảnh thật** với nhiễu → không đọc ra được gì.

## ⚙️ Đọc dáng histogram

| Dáng thấy được | Kết luận | Chọn |
|---|---|---|
| Chuông đối xứng quanh `c` | **Gaussian** | [[loc-lam-min]] |
| Gần phẳng trong một khoảng | **Uniform** | trung bình / midpoint |
| **Hai gai** ở `0` và `255`, giữa gần trống | **Muối tiêu** | [[loc-trung-vi]] |
| Chỉ **một gai** ở `255` | Chỉ có **salt** | lọc **min**, hoặc contraharmonic `R<0` |
| Chỉ **một gai** ở `0` | Chỉ có **pepper** | lọc **max**, hoặc contraharmonic `R>0` |
| Lệch phải, đuôi dài | **Rayleigh / Gamma** | trung bình hình học |

Đo thêm **trung bình** và **phương sai** của vùng đó thì ước lượng luôn được tham số của phân phối — cần cho [[wiener-filter]] (hằng `K` phụ thuộc tỉ lệ nhiễu).

**Nếu miền không gian không cho manh mối gì** thì xem phổ Fourier: nhiễu **tuần hoàn** hiện thành vài đốm sáng rời rạc đối xứng qua tâm, xem [[fourier-2d]].

## ⚠️ Điều dễ nhầm

- **Có ảnh gốc để so thì tốt nhất** (`n = g − f` trực tiếp) — nhưng đó là tình huống thí nghiệm. Thực tế không có `f`, nên mẹo vùng đồng nhất mới là cách dùng được.
- **"Đồng nhất" theo mắt chưa chắc đồng nhất thật.** Bầu trời có gradient sáng nhẹ từ trên xuống — gradient đó sẽ làm histogram giãn ra và trông giống nhiễu uniform. Chọn vùng càng nhỏ càng an toàn.
- **Ảnh thường có nhiều loại nhiễu chồng nhau.** Histogram hình chuông **kèm** hai gai ở hai đầu = Gaussian + muối tiêu → phải chạy [[loc-trung-vi]] trước (bỏ xung), rồi mới [[loc-lam-min]] (giảm Gaussian). Sai thứ tự thì bước trung bình sẽ bôi xung ra trước khi kịp loại.
- Nhiễu **phụ thuộc cường độ** (Poisson) thì mỗi vùng sáng khác nhau cho phương sai khác nhau — phải ước lượng ở **nhiều vùng độ sáng khác nhau** mới thấy.

---

## 🔗 Liên kết
- **Tiền đề:** [[nhieu-anh]] · [[histogram-anh]]
- **Dẫn tới:** [[loc-thong-ke-thu-tu]] · [[wiener-filter]]
- **Liên quan:** [[mo-hinh-suy-hao]] · [[fourier-2d]]
- **Liên môn:** [[ml/eda-checklist]] — cùng nguyên tắc: nhìn dữ liệu trước, chọn công cụ sau.

## ❓ Câu hỏi mở
- Có cách tự động chọn "vùng đồng nhất nhất" trong ảnh thay vì chọn tay không?

## 📚 Nguồn
- Lecture 7 — Image Restoration
