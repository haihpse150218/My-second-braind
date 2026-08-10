---
slug: bien-doi-tung-khuc
title: Biến đổi tuyến tính từng khúc
vault: ivp
type: concept
branch: D
order: 5
status: learning
tags: [ivp, enhancement]
prev: [gamma-correction]
next: [lut-bang-tra]
related: [nguong-hoa, histogram-anh]
sources: ["L6 — Gray-Level Transformations, Histogram, Neighborhood"]
created: 2026-08-10
---

# Biến đổi tuyến tính từng khúc

> Tóm tắt 1 câu: thay vì một công thức cho cả dải, **bẻ đường `T` thành nhiều đoạn thẳng** — linh hoạt nhất trong họ biến đổi điểm, đổi lại phải tự chọn điểm gãy.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #5 ← cần [[gamma-correction]] · → kế tiếp [[lut-bang-tra]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #enhancement

---

## 💡 Ý chính

Hàm `T` được định nghĩa **theo từng đoạn**, mỗi đoạn một độ dốc riêng. Ba biến thể đáng nhớ:

| Biến thể | Hình dạng `T` | Làm gì |
|---|---|---|
| **Kéo giãn tương phản** | Dốc **thoải – đứng – thoải** | Giãn dải giữa (nơi có thông tin), hi sinh hai đầu |
| **Gray-level slicing** | Bậc thang nhô lên ở một dải | Làm **nổi bật** một khoảng mức xám cụ thể |
| **Ngưỡng hoá** | Bậc thang **một nấc** | Trường hợp cực đoan: chỉ còn 0 và 255 |

Ba cái này thực chất là một thang liên tục: dốc càng đứng thì càng tiến về ngưỡng hoá.

## 🧩 Kéo giãn tương phản hoạt động thế nào

Ảnh chụp thiếu sáng có histogram dồn hết vào `[60, 120]` — dải `0..59` và `121..255` **hoàn toàn trống**.

Đặt hai điểm gãy tại `r₁=60` và `r₂=120`, ánh xạ `60→0` và `120→255`. Đoạn giữa có độ dốc `255/60 ≈ 4,25` → **tương phản tăng hơn 4 lần** ở đúng chỗ có dữ liệu.

Khác biệt với [[can-bang-histogram]]: kéo giãn từng khúc là **bạn chọn** điểm gãy dựa trên histogram; cân bằng histogram thì thuật toán **tự quyết** dựa trên CDF. Cái trước kiểm soát được, cái sau tự động.

## ⚙️ Gray-level slicing — hai kiểu

| Kiểu | Ngoài dải quan tâm | Dùng khi |
|---|---|---|
| **Không giữ nền** | Ép về 0 (đen) | Chỉ cần thấy đúng vùng đó, vd: tách xương khỏi mô mềm trong CT |
| **Có giữ nền** | Giữ nguyên giá trị cũ | Cần thấy vùng nổi bật **trong bối cảnh** xung quanh |

Kiểu "giữ nền" thường dùng hơn vì mất bối cảnh thì khó diễn giải. Kết hợp với màu thì thành [[pseudocolor]].

## ⚠️ Điều dễ nhầm

- **Kéo giãn tương phản là mất mát.** Mọi pixel `< r₁` bị dồn về `0`, không phân biệt được nữa. Bạn đang **đánh đổi** chi tiết ở hai đầu để lấy chi tiết ở giữa — chỉ đúng khi hai đầu thật sự không chứa gì.
- **Điểm gãy phải đọc từ histogram**, không đoán. Chọn `r₁`, `r₂` bằng cảm tính là cách nhanh nhất để cắt mất phần dữ liệu có ích. Xem [[histogram-anh]].
- **Cùng một bộ điểm gãy không dùng lại cho ảnh khác được** — trừ khi điều kiện chụp giống hệt. Cần tự động thì dùng [[can-bang-histogram]] hoặc [[otsu]].

---

## 🔗 Liên kết
- **Tiền đề:** [[gamma-correction]] · [[bien-doi-diem]]
- **Dẫn tới:** [[lut-bang-tra]] · [[nguong-hoa]]
- **Liên quan:** [[histogram-anh]] · [[can-bang-histogram]] · [[pseudocolor]]

## ❓ Câu hỏi mở
- Có cách tự động chọn điểm gãy tối ưu theo một tiêu chí định lượng nào không?

## 📚 Nguồn
- Lecture 6 — Gray-Level Transformations, Histogram, Neighborhood
