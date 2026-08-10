---
slug: can-bang-histogram
title: Cân bằng histogram
vault: ivp
type: concept
branch: D
order: 8
status: learning
tags: [ivp, enhancement]
prev: [histogram-anh]
next: [clahe]
related: [clahe, dac-ta-histogram]
sources: ["L6 — Gray-Level Transformations, Histogram, Neighborhood"]
created: 2026-08-10
---

# Cân bằng histogram

> Tóm tắt 1 câu: dùng chính **CDF của ảnh** làm hàm biến đổi — mức xám nào đông pixel thì được giãn rộng, mức nào vắng thì bị nén lại, tất cả **tự động**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #8 ← cần [[histogram-anh]] · → kế tiếp [[clahe]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #enhancement

---

## 💡 Ý chính

$$
s_k = T(r_k) = (L-1)\sum_{j=0}^{k} p(r_j)
$$

Tức là: **`T` chính là hàm phân phối tích luỹ (CDF)** của ảnh, nhân với `L−1` để trải ra dải `[0,255]`.

Mục tiêu: histogram đầu ra **phẳng đều** — mọi mức xám dùng số pixel như nhau, tận dụng hết dải động.

## 🧩 Vì sao CDF lại là hàm biến đổi đúng

Trực giác nằm ở **độ dốc của CDF**:

- Ở mức xám **đông pixel** (đỉnh histogram) → CDF **dốc đứng** → hai mức xám gần nhau bị đẩy ra xa → **tương phản tăng** ở đúng nơi có nhiều thông tin.
- Ở mức xám **vắng pixel** → CDF **thoai thoải** → các mức bị dồn lại → nén vùng không có gì.

Nói gọn: **thuật toán tự tìm ra chỗ nào đáng giãn**, thay vì bắt người dùng chọn điểm gãy như [[bien-doi-tung-khuc]]. Đó là toàn bộ giá trị của phương pháp này.

Về mặt lý thuyết, biến đổi một biến ngẫu nhiên bằng chính CDF của nó cho ra **phân phối đều** — đây là kết quả chuẩn trong xác suất, xem [[ml/phan-phoi-xac-suat]].

## ⚠️ Histogram không bao giờ phẳng thật

Đây là điểm hay bị hiểu sai:

Với ảnh **rời rạc**, `T` ánh xạ nhiều mức xám cũ về **cùng một** mức mới (vì phải làm tròn). Các mức đã gộp thì **không tách lại được**. Kết quả: histogram sau khi equalize trông như **răng lược** — vài cột rất cao xen giữa những khoảng trống — chứ không phẳng.

Nó chỉ phẳng đúng nghĩa với biến liên tục. Với ảnh thật, mục tiêu thực tế là **trải rộng**, không phải **phẳng**.

## ⚠️ Ba tác dụng phụ

**1. False contouring.** Giãn một dải hẹp ra rộng làm lộ ranh giới giữa các mức xám — vùng trời mượt thành các mảng có viền. Cùng hiện tượng ở [[luong-tu-hoa-anh]].

**2. Khuếch đại nhiễu.** Vùng tối thường đông pixel → được giãn mạnh → nhiễu trong đó cũng giãn theo. Ảnh sau equalize hay bị "sạn".

**3. Không kiểm soát được kết quả.** Bạn không chọn được ảnh ra trông thế nào — thuật toán quyết. Muốn ép về một dáng histogram cụ thể thì cần [[dac-ta-histogram]].

**Và giới hạn lớn nhất:** equalize dùng **thống kê toàn ảnh**. Ảnh sáng một nửa tối một nửa thì CDF là trung bình của hai vùng → **không vùng nào được xử lý đúng**. Lời giải là [[clahe]].

## ⚙️ Khi nào dùng

- Ảnh **tương phản thấp toàn cục**, dải động hẹp, chiếu sáng tương đối đều.
- Bước **chuẩn hoá** trước khi so khớp: hai ảnh cùng cảnh chụp khác điều kiện sáng, equalize cả hai rồi mới so.
- ⚠️ Trên **ảnh màu**: equalize từng kênh R, G, B riêng sẽ **làm lệch màu** nghiêm trọng. Cách đúng là chuyển sang HSV và chỉ equalize kênh **V**, xem [[mo-hinh-mau-hsv]].

---

## 🔗 Liên kết
- **Tiền đề:** [[histogram-anh]]
- **Dẫn tới:** [[clahe]] · [[dac-ta-histogram]]
- **Liên quan:** [[bien-doi-tung-khuc]] · [[mo-hinh-mau-hsv]] · [[luong-tu-hoa-anh]]
- **Liên môn:** [[ml/phan-phoi-xac-suat]] — biến đổi bằng chính CDF cho ra phân phối đều, đây là ứng dụng trực tiếp của kết quả đó.

## ❓ Câu hỏi mở
- Có cách nào equalize mà khống chế được mức khuếch đại nhiễu không? (gợi ý: chữ "CL" trong CLAHE)

## 📚 Nguồn
- Lecture 6 — Gray-Level Transformations, Histogram, Neighborhood
