---
slug: bien-doi-affine
title: Biến đổi affine
vault: ivp
type: concept
branch: C
order: 4
status: learning
tags: [ivp, hinh-hoc]
prev: [phep-logic-va-roi]
next: [noi-suy-anh]
related: [noi-suy-anh, aliasing-anh]
sources: ["L2 — Image Processing Basics", "L5 — Arithmetic, Logic & Geometric Operations"]
created: 2026-08-10
---

# Biến đổi affine

> Tóm tắt 1 câu: tịnh tiến · co giãn · xoay · trượt — bốn phép gộp chung được vào **một ma trận 3×3**, và cái hay nằm ở chỗ gộp được đó.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #4 ← cần [[phep-logic-va-roi]] · → kế tiếp [[noi-suy-anh]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #hinh-hoc

---

## 💡 Ý chính

Affine biến đổi **toạ độ**, không đụng tới giá trị pixel — ngược hẳn với [[bien-doi-diem]] vốn đổi giá trị mà giữ nguyên toạ độ.

$$
\begin{bmatrix} x' \\ y' \\ 1 \end{bmatrix} =
\begin{bmatrix} a_{11} & a_{12} & t_x \\ a_{21} & a_{22} & t_y \\ 0 & 0 & 1 \end{bmatrix}
\begin{bmatrix} x \\ y \\ 1 \end{bmatrix}
$$

| Phép | Ma trận `2×2` phần trên trái | `t` |
|---|---|---|
| **Tịnh tiến** | `[[1,0],[0,1]]` | `(tₓ, t_y)` |
| **Co giãn** | `[[sₓ,0],[0,s_y]]` | `0` |
| **Xoay** góc θ | `[[cosθ, −sinθ],[sinθ, cosθ]]` | `0` |
| **Trượt** (shear) | `[[1, sh],[0,1]]` | `0` |

## 🧩 Vì sao phải thêm hàng `[0 0 1]` — toạ độ đồng nhất

Tịnh tiến là phép **cộng**, ba phép kia là phép **nhân**. Không gộp chung vào một ma trận `2×2` được.

Mẹo: nâng lên 3 chiều, thêm toạ độ thứ ba luôn bằng `1`. Khi đó **tịnh tiến cũng thành phép nhân ma trận**. Đây gọi là **toạ độ đồng nhất** (homogeneous coordinates).

Lợi ích thật sự: **gộp nhiều phép thành một**. Xoay rồi tịnh tiến rồi co giãn = nhân ba ma trận lại → **một** ma trận duy nhất → ảnh chỉ bị nội suy **một lần** thay vì ba lần. Nội suy nhiều lần là mờ chồng mờ.

⚠️ Thứ tự nhân **không giao hoán**: xoay-rồi-tịnh-tiến ≠ tịnh-tiến-rồi-xoay.

## ⚙️ Forward vs Backward mapping

Đây là điểm dễ làm sai nhất:

| | **Forward** (chiếu xuôi) | **Backward** (chiếu ngược) ✅ |
|---|---|---|
| Cách làm | Với mỗi pixel **nguồn**, tính nó bay đi đâu | Với mỗi pixel **đích**, tính nó đến từ đâu |
| Vấn đề | Toạ độ đích ra **số lẻ** → có ô đích **không ai rơi vào** (lỗ đen) và ô bị **nhiều pixel chồng** | Toạ độ nguồn ra số lẻ → nhưng chỉ cần [[noi-suy-anh]] là xong |
| Kết quả | Ảnh **rỗ lỗ** | Ảnh liền lạc |

**Luật:** luôn duyệt theo ảnh **đích** và tra ngược về nguồn. Mọi thư viện đều làm vậy — dùng ma trận **nghịch đảo** `A⁻¹`.

## ⚙️ Ứng dụng

- **Đăng ký ảnh** (image registration) — khớp hai ảnh cùng cảnh chụp khác góc/thiết bị. Cần trong y tế (so CT trước/sau), viễn thám, ghép ảnh panorama.
- **Chỉnh méo hình học** từ ống kính hoặc góc chụp nghiêng.
- **Tăng cường dữ liệu** — xem [[dl/data-augmentation]]: xoay/lật/co giãn ảnh huấn luyện chính là affine.

Méo ống kính (pincushion, barrel) và hiệu ứng fisheye **không phải affine** — chúng phi tuyến, đường thẳng không còn thẳng, cần mô hình khác.

## ⚠️ Điều dễ nhầm

- **Affine giữ đường thẳng thẳng và giữ song song song song**, nhưng **không** giữ góc và độ dài (trừ phép xoay/tịnh tiến thuần).
- **Xoay ảnh gây aliasing.** Đường chéo sau khi xoay bị lấy mẫu lại → răng cưa. Xem [[aliasing-anh]].
- **Xoay đi rồi xoay lại không cho về ảnh gốc** — mỗi lần đều nội suy, tức là mờ thêm một chút. Đây lại là lý do phải gộp ma trận.

---

## 🔗 Liên kết
- **Tiền đề:** [[phep-logic-va-roi]]
- **Dẫn tới:** [[noi-suy-anh]]
- **Liên quan:** [[aliasing-anh]] · [[cam-bien-anh]]
- **Liên môn:** [[dl/data-augmentation]] — affine là bộ khung của gần như mọi phép augmentation hình học.

## ❓ Câu hỏi mở
- Biến đổi phối cảnh (perspective/homography) cần ma trận `3×3` đầy đủ — khác affine ở đúng chỗ nào?

## 📚 Nguồn
- Lecture 2 — Image Processing Basics
- Lecture 5 — Arithmetic, Logic & Geometric Operations
