---
slug: kieu-du-lieu-anh
title: Kiểu dữ liệu ảnh — uint8 vs double
vault: ivp
type: concept
branch: A
order: 3
status: learning
tags: [ivp, thuc-hanh, bay]
prev: [kieu-anh-va-do-sau-bit]
next: [ba-tang-xu-ly-anh]
related: [tran-so-anh, phep-toan-so-hoc-anh]
sources: ["L3 — MATLAB & Image Processing Toolbox"]
created: 2026-08-10
---

# Kiểu dữ liệu ảnh — uint8 vs double

> Tóm tắt 1 câu: cùng một bức ảnh có thể sống ở dải `[0,255]` hoặc `[0,1]`, và **ép kiểu ≠ đổi dải** — nhầm chỗ này là lỗi thực hành số 1 của cả môn.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #3 ← cần [[kieu-anh-va-do-sau-bit]] · → kế tiếp [[ba-tang-xu-ly-anh]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #thuc-hanh #bay

---

## 💡 Ý chính

| Kiểu | Dải giá trị | Bộ nhớ/pixel | Vai trò |
|---|---|---|---|
| `uint8` | `0 .. 255` (nguyên) | 1 byte | Ảnh **lưu trữ & hiển thị** |
| `double` | `0.0 .. 1.0` (thực) | 8 byte | Ảnh đang **tính toán** |
| `logical` | `false / true` | 1 byte | Ảnh nhị phân, mask |

**Luật vàng:** đọc vào là `uint8` → **đổi sang `double` để tính** → tính xong ép ngược về `uint8` để hiển thị/ghi file.

Lý do: `uint8` không có số âm, không có phần thập phân, và **chặn cứng ở 255**. Mọi phép trung gian (chia, nhân hệ số, cộng nhiều ảnh) đều cần chỗ để tràn ra rồi co về — xem [[tran-so-anh]].

## ⚠️ Cái bẫy: ép kiểu vs chuẩn hoá

Đây là chỗ sai nhiều nhất:

| Cách viết | Nó thực sự làm gì | Kết quả |
|---|---|---|
| `double(A)` | **Chỉ đổi kiểu**, giá trị giữ nguyên | `200` → `200.0` — vẫn nằm ngoài `[0,1]`, hiển thị ra **trắng bệch** |
| `im2double(A)` | Đổi kiểu **và chia 255** | `200` → `0.784` ✅ |
| `uint8(B)` | Cắt cụt phần thập phân, **kẹp** ở `[0,255]` | `0.784` → `0` — **mất trắng ảnh** |
| `im2uint8(B)` | Nhân 255 rồi mới ép | `0.784` → `200` ✅ |

> 🚨 `imshow(double(A))` ra một ô **trắng toàn phần**, và không có lỗi nào được báo. Đây là triệu chứng kinh điển của việc dùng `double()` thay vì `im2double()`.

Còn `mat2gray(A)` là chuyện thứ ba: nó **co giãn theo min/max thực tế** của dữ liệu về `[0,1]`. Dùng khi ma trận có dải giá trị lạ (kết quả gradient, phổ Fourier) chứ không phải để chuyển kiểu ảnh thường.

## 🧩 Trực giác

Coi `uint8` như **cái cốc 255 ml**: rót quá thì tràn ra ngoài và phần tràn **mất luôn**, không lấy lại được. Muốn pha chế (cộng, nhân, chia) thì phải đổ sang **cái xô `double`** làm cho xong, rồi mới rót lại vào cốc.

## ⚙️ Khi nào dùng

- Cộng/trừ/nhân nhiều ảnh, tính trung bình nhiều frame → `im2double` trước.
- Tính gradient, Laplacian (có **giá trị âm**) → bắt buộc `double`, ép `uint8` giữa chừng là mất hết phần âm.
- Chỉ hiển thị hoặc ghi file → `uint8` là đủ và nhẹ hơn 8 lần.
- Ma trận không phải ảnh (bản đồ khoảng cách, phổ) → `imshow(X, [])` hoặc `mat2gray`.

## ⚠️ Điều dễ nhầm

- `uint8(-5)` = `0`, không phải `251`. Kiểu không dấu **kẹp** chứ không quay vòng.
- Chia hai ảnh `uint8`: `100/3` = `33`, phần dư mất luôn. Chia là phép **bắt buộc** phải làm ở `double`.
- `logical` trông giống `uint8` 0/1 nhưng nhân với ảnh thì cho kết quả khác — `logical` dùng làm **mask**, xem [[phep-logic-va-roi]].

---

## 🔗 Liên kết
- **Tiền đề:** [[kieu-anh-va-do-sau-bit]]
- **Dẫn tới:** [[ba-tang-xu-ly-anh]]
- **Liên quan:** [[tran-so-anh]] · [[phep-toan-so-hoc-anh]] · [[phep-logic-va-roi]]
- **Liên môn:** [[ml/chuan-hoa-du-lieu]] — cùng một bài học ở tầng dữ liệu: sai dải giá trị thì thuật toán vẫn chạy, chỉ là cho kết quả vô nghĩa.

## ❓ Câu hỏi mở
- Vì sao thư viện chọn `[0,1]` cho `double` chứ không giữ `[0,255]`?

## 📚 Nguồn
- Lecture 3 — MATLAB & Image Processing Toolbox
