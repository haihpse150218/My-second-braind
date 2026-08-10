---
slug: histogram-anh
title: Histogram ảnh
vault: ivp
type: concept
branch: D
order: 7
status: learning
tags: [ivp, chan-doan]
prev: [lut-bang-tra]
next: [can-bang-histogram]
related: [nguong-hoa, luong-tu-hoa-anh]
sources: ["L6 — Gray-Level Transformations, Histogram, Neighborhood"]
created: 2026-08-10
---

# Histogram ảnh

> Tóm tắt 1 câu: đếm xem mỗi mức xám xuất hiện bao nhiêu lần — **công cụ chẩn đoán rẻ nhất và nên nhìn đầu tiên** trước khi quyết định làm gì với ảnh.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #7 ← cần [[lut-bang-tra]] · → kế tiếp [[can-bang-histogram]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #chan-doan

---

## 💡 Ý chính

$$
h(k) = n_k \qquad\text{và bản chuẩn hoá}\qquad p(r_k) = \frac{n_k}{MN}
$$

| Ký hiệu | Ý nghĩa |
|---|---|
| `n_k` | Số pixel có mức xám `k` |
| `MN` | Tổng số pixel |
| `p(r_k)` | Tỉ lệ → đây chính là **hàm khối xác suất (PMF)** của mức xám |

Bản chuẩn hoá quan trọng ở chỗ nó biến ảnh thành một **phân phối xác suất** — nhờ vậy mới nói được về CDF, entropy, và mới có [[can-bang-histogram]].

## 🧩 Đọc histogram — bốn dạng cơ bản

| Hình dạng | Chẩn đoán | Nên làm gì |
|---|---|---|
| Dồn về **trái** | Ảnh **tối** | [[gamma-correction]] `γ<1`, hoặc cộng scalar |
| Dồn về **phải** | Ảnh **sáng/cháy** | `γ>1` |
| Dồn vào **giữa**, hẹp | **Tương phản thấp** (xám lè) | [[bien-doi-tung-khuc|kéo giãn]] hoặc [[can-bang-histogram]] |
| Trải rộng, **2 đỉnh** (bimodal) | Tương phản tốt, **vật tách rõ khỏi nền** | Sẵn sàng cho [[nguong-hoa]] — chọn T ở đáy thung lũng |

Dạng **bimodal** là tín hiệu đáng giá nhất: hai đỉnh nghĩa là ảnh có hai nhóm sáng phân biệt, và ngưỡng đặt ở khe giữa chúng sẽ tách vật khỏi nền gọn ghẽ. Đây chính là giả định mà [[otsu]] dựa vào.

**Dấu hiệu bệnh:** một **cột dựng đứng** ở đúng `0` hoặc `255` → ảnh đã bị kẹp, xem [[tran-so-anh]]. Histogram **có răng lược** (xen kẽ cột cao/trống) → ảnh đã qua kéo giãn, một số mức xám không còn pixel nào ánh xạ tới.

## ⚠️ Điều histogram KHÔNG nói

Đây là giới hạn cốt lõi phải nhớ:

> 🚨 **Histogram vứt bỏ hoàn toàn thông tin không gian.**

Đảo lộn ngẫu nhiên vị trí mọi pixel trong ảnh → **histogram không đổi một chút nào**. Nghĩa là:

- Hai ảnh **hoàn toàn khác nhau** có thể có histogram giống hệt.
- Histogram **không** cho biết ảnh có bị mờ không, có nhiễu không, có bao nhiêu vật thể.
- Ảnh chiếu sáng không đều có thể có histogram trông rất "khoẻ mạnh" — vì trung bình toàn ảnh vẫn ổn, chỉ là cục bộ thì không. Đây chính là lý do có [[clahe]].

## ⚙️ Khi nào dùng

- **Trước mọi thao tác tăng cường** — để chọn đúng phép thay vì thử mò.
- **Chọn ngưỡng** cho phân đoạn.
- **Ước lượng loại nhiễu**: crop một vùng đồng nhất rồi xem histogram của riêng vùng đó, hình dạng của nó chính là PDF của nhiễu. Xem [[uoc-luong-nhieu]].
- **Kiểm soát chất lượng chụp** — máy ảnh hiện histogram trực tiếp để người chụp biết đã cháy sáng chưa.

---

## 🔗 Liên kết
- **Tiền đề:** [[lut-bang-tra]] · [[luong-tu-hoa-anh]]
- **Dẫn tới:** [[can-bang-histogram]] · [[nguong-hoa]]
- **Liên quan:** [[uoc-luong-nhieu]] · [[tran-so-anh]] · [[clahe]]
- **Liên môn:** [[ml/phan-phoi-xac-suat]] — histogram chuẩn hoá chính là PMF thực nghiệm; mọi công cụ thống kê ở `ml` đều dùng được ở đây.

## ❓ Câu hỏi mở
- Histogram 2D của cặp (pixel, hàng xóm) giữ lại được một phần thông tin không gian — nó dùng vào việc gì?

## 📚 Nguồn
- Lecture 6 — Gray-Level Transformations, Histogram, Neighborhood
