---
slug: nguong-hoa
title: Ngưỡng hoá
vault: ivp
type: concept
branch: H
order: 2
status: learning
tags: [ivp, phan-doan]
prev: [phan-doan-anh]
next: [otsu]
related: [histogram-anh, otsu]
sources: ["L10 — Image Segmentation"]
created: 2026-08-10
---

# Ngưỡng hoá

> Tóm tắt 1 câu: so mỗi pixel với một con số `T` → ảnh nhị phân. Phương pháp phân đoạn **đơn giản nhất**, và vẫn là phương pháp được dùng nhiều nhất.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh H · #2 ← cần [[phan-doan-anh]] · → kế tiếp [[otsu]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #phan-doan

---

## 💡 Ý chính

$$
g(x,y) = \begin{cases} 1 & \text{nếu } f(x,y) > T \\ 0 & \text{nếu } f(x,y) \le T \end{cases}
$$

Toàn bộ bài toán rút về **chọn một con số `T`**. Đó vừa là điểm mạnh (rẻ, dễ hiểu, dễ debug) vừa là điểm yếu (một con số phải đúng cho cả ảnh).

| Kiểu | Cách chọn `T` | Note |
|---|---|---|
| **Toàn cục** | Một `T` cho cả ảnh | ← đang ở đây |
| **Tự động** | Thuật toán tìm `T` từ histogram | [[otsu]] |
| **Cục bộ / thích nghi** | `T` khác nhau ở từng vùng | [[nguong-cuc-bo]] |
| **Nhiều mức** | Nhiều `T` → nhiều lớp | Tổng quát hoá hiển nhiên |

## 🧩 Điều kiện để ngưỡng hoá hoạt động

Ngưỡng toàn cục chỉ đúng khi **histogram bimodal**: hai đỉnh rõ (một của vật, một của nền), giữa là thung lũng.

```
    ▂▅█▅▂        ▂▅█▅▂
   nền        ↑     vật
              T (đáy thung lũng)
```

→ **Luôn xem [[histogram-anh]] trước.** Histogram một đỉnh nghĩa là vật và nền có độ sáng chồng lấn — không ngưỡng nào tách được, phải đổi phương pháp chứ không phải chỉnh `T`.

Đây là ví dụ điển hình cho việc "nhìn dữ liệu trước, chọn công cụ sau".

## ⚙️ Khi nào dùng

- **Hình dạng quan trọng hơn texture**: ảnh văn bản, ảnh hiển vi, kiểm tra công nghiệp, biển số.
- **Bước bắt buộc trước [[hinh-thai-hoc]]** — morphology cần đầu vào nhị phân.
- **Điều kiện chụp kiểm soát được** (đèn cố định, nền chuẩn) → `T` cố định dùng lại được, rất nhanh.

Quy trình thực tế thường là:
```
tăng cường (top-hat / CLAHE) → ngưỡng hoá → opening-closing dọn nhiễu → thành phần liên thông
```

Bước tăng cường **trước** ngưỡng hoá là chỗ quyết định thành bại — làm nền phẳng thì ngưỡng toàn cục mới dùng được.

## ⚠️ Điều dễ nhầm

- **`T` cố định rất mong manh.** Đèn thay đổi, camera đổi phơi sáng, ảnh chụp lúc khác → `T` cũ sai ngay. Đây là nguyên nhân số 1 khiến hệ thị giác chạy tốt trong phòng lab mà hỏng ngoài thực địa.
- **Chiếu sáng không đều giết ngưỡng toàn cục.** Cùng một vật ở góc sáng và góc tối cho hai giá trị pixel khác hẳn → không `T` nào đúng cả hai. Sửa bằng [[nguong-cuc-bo]] hoặc khử nền bằng [[top-hat]] trước.
- **Ngưỡng hoá là phép mất mát cực đoan** — dồn 256 mức về 2. Mọi thông tin sắc độ mất sạch, không có đường về.
- **Kết quả luôn có nhiễu lấm tấm** ở gần ngưỡng. Đừng cố chỉnh `T` cho hết — đó là việc của [[opening-closing]] ngay sau đó.

---

## 🔗 Liên kết
- **Tiền đề:** [[phan-doan-anh]] · [[histogram-anh]]
- **Dẫn tới:** [[otsu]] · [[nguong-cuc-bo]] · [[hinh-thai-hoc]]
- **Liên quan:** [[top-hat]] · [[bien-doi-tung-khuc]] · [[phep-logic-va-roi]]

## ❓ Câu hỏi mở
- Ngưỡng hoá trên ảnh màu nên làm ở không gian màu nào — RGB, HSV hay LAB?

## 📚 Nguồn
- Lecture 10 — Image Segmentation
