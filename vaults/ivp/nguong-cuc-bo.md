---
slug: nguong-cuc-bo
title: Ngưỡng cục bộ (thích nghi)
vault: ivp
type: concept
branch: H
order: 4
status: learning
tags: [ivp, phan-doan]
prev: [otsu]
next: [region-growing]
related: [clahe, top-hat]
sources: ["L10 — Image Segmentation"]
created: 2026-08-10
---

# Ngưỡng cục bộ (thích nghi)

> Tóm tắt 1 câu: tính `T` **riêng cho từng vùng nhỏ** thay vì một `T` cho cả ảnh — lời giải cho chiếu sáng không đều.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh H · #4 ← cần [[otsu]] · → kế tiếp [[region-growing]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #phan-doan

---

## 💡 Ý chính

`T` trở thành một **hàm của vị trí**: `T = T(x,y)`.

| Cách tính `T` cục bộ | Công thức |
|---|---|
| **Trung bình** lân cận | `T = mean − C` |
| **Gaussian** có trọng số | `T = weighted_mean − C` |
| **Niblack** | `T = mean + k·std` |
| **Sauvola** | `T = mean·[1 + k(std/R − 1)]` — tốt cho ảnh văn bản |
| **Otsu theo block** | Chạy [[otsu]] riêng từng ô |

Hằng `C` (hoặc `k`) là biên độ dịch: pixel phải sáng hơn trung bình lân cận **một khoảng** mới được coi là vật, tránh việc vùng đồng nhất bị chia đôi ngẫu nhiên.

## 🧩 Vì sao nó giải quyết được chiếu sáng không đều

Ảnh scan có bóng đèn hắt một bên: chữ ở góc sáng có giá trị `180`, nền ở đó `220`; chữ ở góc tối `90`, nền `130`.

- **Ngưỡng toàn cục:** không `T` nào đúng. `T=150` thì góc tối biến thành đen hết (cả chữ lẫn nền), `T=110` thì góc sáng thành trắng hết.
- **Ngưỡng cục bộ:** ở mỗi vùng, chữ **luôn tối hơn nền xung quanh nó** — so sánh cục bộ nắm được điều đó bất kể độ sáng tuyệt đối.

**Điểm mấu chốt:** chuyển từ **so sánh tuyệt đối** ("pixel này có sáng hơn 150 không") sang **so sánh tương đối** ("pixel này có tối hơn hàng xóm không"). Chiếu sáng ảnh hưởng tới giá trị tuyệt đối nhưng gần như không ảnh hưởng quan hệ cục bộ.

## ⚙️ Ba lời giải cho cùng một bài toán

Bài toán "chiếu sáng không đều" xuất hiện ba lần trong kho này với ba cách giải khác nhau:

| Cách | Nguyên lý | Ưu / nhược |
|---|---|---|
| **[[nguong-cuc-bo]]** | Ngưỡng theo vùng | Trực tiếp, gọn — nhưng ⚠️ **vùng trống hoàn toàn sinh nhiễu** |
| **[[top-hat]]** | Ước lượng nền rồi **trừ** | Sạch, giữ ảnh xám — cần nền biến thiên chậm |
| **[[clahe]]** | Equalize theo ô | Tăng tương phản luôn — mất độ sáng tuyệt đối |

Biết cả ba và biết khi nào dùng cái nào là dấu hiệu đã nắm được nhánh này.

## ⚠️ Điều dễ nhầm

- 🚨 **Vùng hoàn toàn đồng nhất sinh nhiễu muối tiêu.** Ô chỉ có nền (không có chữ) thì trung bình cục bộ ≈ giá trị nền, và biến thiên duy nhất còn lại là **nhiễu** → nửa số pixel bị gán thành vật. Đây là artifact đặc trưng của ngưỡng cục bộ. Hằng `C` sinh ra chính để chống điều này — đặt `C` đủ lớn thì vùng phẳng ra toàn nền.
- **Kích thước cửa sổ phải lớn hơn vật thể.** Cửa sổ nhỏ hơn nét chữ thì trung bình cục bộ bị chính nét chữ kéo lên → chữ bị rỗng ruột, chỉ còn viền.
- **Chậm hơn ngưỡng toàn cục** đáng kể, dù dùng ảnh tích phân (integral image) thì chi phí về gần `O(1)` mỗi pixel.
- **Mất thông tin toàn cục.** Hai vùng có độ sáng thật khác nhau đều bị chuẩn hoá về cùng thang → không dùng được nếu độ sáng tuyệt đối mang thông tin.

---

## 🔗 Liên kết
- **Tiền đề:** [[otsu]] · [[nguong-hoa]]
- **Dẫn tới:** [[region-growing]]
- **Liên quan:** [[clahe]] · [[top-hat]] · [[loc-thong-ke-thu-tu]]

## ❓ Câu hỏi mở
- Có cách tự chọn kích thước cửa sổ từ chính ảnh (vd từ cỡ nét chữ ước lượng được) không?

## 📚 Nguồn
- Lecture 10 — Image Segmentation
