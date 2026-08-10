---
slug: top-hat
title: Top-hat & Bottom-hat
vault: ivp
type: concept
branch: F
order: 5
status: learning
tags: [ivp, hinh-thai, enhancement]
prev: [opening-closing]
next: [thanh-phan-lien-thong]
related: [clahe, opening-closing]
sources: ["L8 — Morphological Image Processing"]
created: 2026-08-10
---

# Top-hat & Bottom-hat

> Tóm tắt 1 câu: **ảnh gốc trừ đi bản opening của nó** — cách sạch nhất để sửa chiếu sáng không đều, bằng một đường hoàn toàn khác với CLAHE.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F · #5 ← cần [[opening-closing]] · → kế tiếp [[thanh-phan-lien-thong]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #hinh-thai #enhancement

---

## 💡 Ý chính

| Phép | Công thức | Làm nổi |
|---|---|---|
| **Top-hat** (white) | `A − (A ∘ B)` | Vật **sáng** nhỏ hơn SE, trên nền tối |
| **Bottom-hat** (black) | `(A • B) − A` | Vật **tối** nhỏ hơn SE, trên nền sáng |

Cả hai áp dụng trên **ảnh xám**, dùng grayscale morphology (dilation = max, erosion = min).

## 🧩 Vì sao nó sửa được chiếu sáng không đều

Chìa khoá nằm ở việc **opening với SE lớn cho ra ước lượng của NỀN**:

- SE lớn hơn mọi vật thể → opening **xoá sạch vật thể**, chỉ còn lại thành phần **biến thiên chậm** = chính là nền chiếu sáng.
- Lấy ảnh gốc **trừ** nền đó → vật thể hiện lên trên một nền **phẳng đều**.

```
ảnh gốc  =  vật thể  +  nền sáng không đều
opening  ≈             nền sáng không đều      ← SE lớn nuốt hết vật
top-hat  =  vật thể                            ← hiệu số
```

Chính là ý tưởng "ước lượng nền rồi khử" ở [[phep-toan-so-hoc-anh]], chỉ khác cách ước lượng nền: ở đó dùng làm mờ mạnh, ở đây dùng opening. **Opening tốt hơn** vì nó không bị vật thể kéo lệch — làm mờ thì vật thể vẫn góp vào giá trị nền, còn opening thì loại hẳn.

## ⚙️ Top-hat vs CLAHE — hai lời giải, một bài toán

| | **Top-hat** | **[[clahe]]** |
|---|---|---|
| Nguyên lý | **Trừ** nền ước lượng được | **Equalize** theo từng ô |
| Tham số | Kích thước SE | `clipLimit`, cỡ ô |
| Giữ độ sáng tuyệt đối | **Có** (chỉ trừ nền) | **Không** — mỗi ô bị co giãn riêng |
| Hợp khi | Vật thể **nhỏ, rõ ranh giới** trên nền trơn | Chi tiết trải khắp, cần tăng tương phản cục bộ |
| Rủi ro | SE nhỏ hơn vật → **cắt cụt** chính vật thể | Khuếch đại nhiễu ở vùng phẳng |

Cùng một bài toán "chiếu sáng không đều" nhưng **hai triết lý khác nhau**: một bên mô hình hoá và trừ đi, một bên chuẩn hoá thống kê cục bộ. Đây là ví dụ tốt cho thấy hiểu **nguyên lý** quan trọng hơn thuộc công thức — chọn đúng công cụ dựa trên việc bài toán có nền trơn hay không.

## ⚙️ Ứng dụng

- **Ảnh scan tài liệu** có bóng đèn hắt → top-hat làm chữ đều tông, [[nguong-hoa]] sau đó dùng được **một ngưỡng toàn cục** thay vì phải dùng ngưỡng cục bộ.
- **Đếm tế bào / hạt** trên nền sáng không đều — ứng dụng kinh điển trong ảnh hiển vi.
- **Làm nổi chi tiết nhỏ** trước khi dò biên.
- Bottom-hat cho bài toán ngược: vết tối nhỏ trên nền sáng (vết nứt, lỗi bề mặt trong kiểm tra công nghiệp).

## ⚠️ Điều dễ nhầm

- **Cỡ SE phải LỚN HƠN vật thể cần giữ.** Chọn nhỏ hơn thì opening không xoá hết vật → nền ước lượng dính vật → top-hat **cắt cụt chính vật thể** đó. Đây là lỗi số 1 khi dùng top-hat.
- **Nền phải biến thiên CHẬM.** Nền có texture đổi nhanh thì opening không tách được — top-hat vô dụng.
- **Chỉ giữ chi tiết nhỏ hơn SE.** Nếu vật quan tâm có nhiều cỡ khác nhau, một SE duy nhất không phủ hết.
- Kết quả top-hat có **nền gần 0** nên trông tối; thường phải kéo giãn tương phản sau đó để nhìn, xem [[bien-doi-tung-khuc]].

---

## 🔗 Liên kết
- **Tiền đề:** [[opening-closing]]
- **Dẫn tới:** [[thanh-phan-lien-thong]] · [[nguong-hoa]]
- **Liên quan:** [[clahe]] · [[phep-toan-so-hoc-anh]] · [[bien-doi-tung-khuc]]

## ❓ Câu hỏi mở
- Có cách chọn cỡ SE tự động từ chính ảnh (vd: từ phân bố kích thước vật) không?

## 📚 Nguồn
- Lecture 8 — Morphological Image Processing
