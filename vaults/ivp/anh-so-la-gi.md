---
slug: anh-so-la-gi
title: Ảnh số là gì
vault: ivp
type: concept
branch: A
order: 1
status: learning
tags: [ivp, co-ban]
next: [kieu-anh-va-do-sau-bit, ba-tang-xu-ly-anh]
related: [kieu-du-lieu-anh]
sources: ["L1 — Introduction & Overview", "L2 — Image Processing Basics"]
created: 2026-08-10
---

# Ảnh số là gì

> Tóm tắt 1 câu: ảnh số là một **ma trận số** `f(x,y)` — mọi thuật toán xử lý ảnh, không trừ cái nào, chỉ là phép toán trên ma trận đó.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #1 → kế tiếp [[kieu-anh-va-do-sau-bit]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #co-ban

---

## 💡 Ý chính

- **Ảnh** = biểu diễn 2D của một cảnh 3D, thu qua thiết bị quang học. Việc chiếu 3D → 2D **mất thông tin độ sâu vĩnh viễn** — đây là gốc rễ của gần như mọi bài toán khó trong thị giác máy.
- **Ảnh số** = ảnh đó được rời rạc hoá thành **lưới pixel hữu hạn**, mỗi pixel giữ một con số.
- Nói cách khác: `f(x, y)` với `x, y` là toạ độ nguyên, giá trị trả về là **cường độ sáng**.
- **DIP (Digital Image Processing)** = dùng máy tính sửa đổi ma trận đó bằng thuật toán.

📌 Điều đáng nhớ nhất: khi bí, hãy tự nhắc *"nó chỉ là ma trận số"*. Câu hỏi "làm mờ ảnh thế nào" lập tức thành "biến đổi ma trận thế nào cho các giá trị cạnh nhau gần nhau hơn".

## 🧩 Trực giác

Ảnh xám 8-bit `512×512` là một **bảng Excel 512 dòng × 512 cột**, mỗi ô chứa số từ 0 đến 255. Số 0 = đen tuyệt đối, 255 = trắng tuyệt đối. Bạn nhìn thấy "con mèo" chỉ vì mắt người giỏi gom cụm — máy tính chỉ thấy 262.144 con số.

Ảnh màu thì là **ba bảng chồng lên nhau** (R, G, B) → mảng `M×N×3`.

## 🔢 Định nghĩa

$$
f(x,y), \quad x = 0..M-1,\; y = 0..N-1,\; f \in \{0, 1, ..., L-1\}
$$

| Ký hiệu | Ý nghĩa |
|---|---|
| `M × N` | Kích thước ảnh (số dòng × số cột) — **độ phân giải không gian** |
| `f(x,y)` | Mức xám tại pixel `(x,y)` |
| `L = 2^m` | Số mức xám; ảnh 8-bit → `m=8`, `L=256` |

Hai bước biến ảnh liên tục thành ma trận này: [[lay-mau-anh]] (rời rạc hoá **toạ độ**) và [[luong-tu-hoa-anh]] (rời rạc hoá **giá trị**).

## ⚠️ Điều dễ nhầm

- **Ảnh mono ≠ ảnh grayscale.** Monochrome nghĩa là "một kênh màu"; grayscale là trường hợp riêng khi kênh đó là độ xám. Ảnh nhiệt cũng mono nhưng không phải grayscale theo nghĩa thị giác.
- **Toạ độ ảnh không phải toạ độ toán học.** Gốc `(0,0)` nằm ở **góc trên trái**, trục `x` đi xuống. Vẽ đồ thị theo thói quen toán học là lật ngược ảnh.
- Ảnh trong bộ nhớ **không có đơn vị vật lý**. "Pixel này sáng 200" không nói gì về độ sáng thật ngoài đời — còn phụ thuộc phơi sáng, cảm biến, hậu xử lý.

---

## 🔗 Liên kết
- **Dẫn tới:** [[kieu-anh-va-do-sau-bit]] · [[ba-tang-xu-ly-anh]]
- **Liên quan:** [[kieu-du-lieu-anh]] · [[lay-mau-anh]] · [[luong-tu-hoa-anh]]
- **Liên môn:** [[dl/vi-sao-can-cnn]] — CNN sinh ra chính vì "ma trận số" này có **cấu trúc không gian** mà mạng Dense vứt bỏ mất.

## ❓ Câu hỏi mở
- Chiếu 3D→2D mất độ sâu; vậy con người khôi phục độ sâu từ một mắt bằng manh mối gì?

## 📚 Nguồn
- Lecture 1 — Introduction & Overview
- Lecture 2 — Image Processing Basics
