---
slug: phep-toan-so-hoc-anh
title: Phép toán số học trên ảnh
vault: ivp
type: concept
branch: C
order: 1
status: learning
tags: [ivp, enhancement]
prev: [aliasing-anh]
next: [tran-so-anh]
related: [kieu-du-lieu-anh, bien-doi-diem]
sources: ["L5 — Arithmetic, Logic & Geometric Operations"]
created: 2026-08-10
---

# Phép toán số học trên ảnh

> Tóm tắt 1 câu: cộng/trừ/nhân/chia từng pixel — đơn giản đến mức dễ coi thường, nhưng **cộng và nhân cho ra hai kiểu sáng khác hẳn nhau** và biết chọn cái nào mới là điều đáng học.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #1 ← cần [[aliasing-anh]] · → kế tiếp [[tran-so-anh]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #enhancement

---

## 💡 Ý chính

| Phép | Công thức | Tác dụng | Dùng để |
|---|---|---|---|
| **Cộng** | `s = r + k` | Nâng **đều** mọi pixel | Tăng sáng; trộn 2 ảnh; mô phỏng nhiễu cộng |
| **Trừ** | `s = r₁ − r₂` | Làm nổi **khác biệt** | Phát hiện chuyển động giữa 2 frame; so ảnh trước/sau |
| **Nhân** | `s = r × k` | Giãn **theo tỉ lệ** | Tăng tương phản; áp mask |
| **Chia** | `s = r₁ / r₂` | Chuẩn hoá theo nền | **Sửa chiếu sáng không đều** |

## 🧩 Cộng vs Nhân — khác biệt cốt lõi

Đây là điểm quan trọng nhất của cả lecture:

| | `+ 50` (offset) | `× 1,5` (dynamic scaling) |
|---|---|---|
| Pixel `10` | → `60` (gấp **6 lần**) | → `15` |
| Pixel `200` | → `250` | → `300` → **kẹp 255, mất chi tiết** |
| Hiệu ứng | Ảnh bạc màu, vùng tối **mất chiều sâu** | Tối vẫn tối, sáng sáng hơn → **tương phản tăng** |

**Quy tắc chọn:**
- Ảnh **thiếu sáng đều** → dùng `+`.
- Ảnh **thiếu tương phản** (xám lè, không có đen lẫn trắng) → dùng `×`.

Lý do sâu hơn: `+` **dịch** cả histogram sang phải nhưng không đổi độ rộng; `×` **kéo giãn** histogram. Nhìn [[histogram-anh]] trước khi chọn phép là cách làm đúng, thay vì thử mò.

## ⚙️ Ba ứng dụng đáng nhớ

**1. Trừ ảnh để bắt chuyển động.** Hai khung hình liên tiếp trừ nhau → phần đứng yên triệt tiêu về 0, chỉ còn vật chuyển động. Đây là nền của phát hiện chuyển động, và là bản đơn giản nhất của `uoc-luong-chuyen-dong`.
⚠️ Phải dùng **trị tuyệt đối** của hiệu, nếu không nửa số chênh lệch (phần âm) bị kẹp về 0 và mất luôn.

**2. Chia để sửa chiếu sáng không đều.** Ảnh có bóng đèn hắt một bên: `g = f · illumination`. Nếu ước lượng được nền sáng (chụp riêng ảnh nền, hoặc làm mờ rất mạnh chính ảnh đó) thì **chia** cho nó sẽ khử được thành phần chiếu sáng, còn lại vật thể. Bài này còn có lời giải bằng hình thái học — xem [[top-hat]].

**3. Trung bình nhiều frame để khử nhiễu.** Chụp `N` ảnh cùng cảnh rồi lấy trung bình: tín hiệu giữ nguyên, nhiễu ngẫu nhiên giảm theo `1/√N`. Cách khử nhiễu tốt nhất — nhưng chỉ dùng được khi cảnh **đứng yên**.

## ⚠️ Điều dễ nhầm

- **Tràn số.** Đây là bẫy lớn đến mức có note riêng: [[tran-so-anh]].
- **Trừ ảnh nhạy với rung camera.** Lệch 1 pixel là toàn bộ biên hiện lên như "chuyển động". Phải căn chỉnh (registration) trước khi trừ.
- **Nhân với hệ số nhỏ hơn 1 không phải là "chia cho ảnh"** — nhân scalar là chỉnh sáng, chia cho *một ảnh khác* mới là chuẩn hoá nền. Hai việc khác hẳn nhau.

---

## 🔗 Liên kết
- **Tiền đề:** [[kieu-du-lieu-anh]]
- **Dẫn tới:** [[tran-so-anh]] · [[phep-logic-va-roi]]
- **Liên quan:** [[bien-doi-diem]] · [[histogram-anh]] · [[top-hat]]

## ❓ Câu hỏi mở
- Trung bình `N` frame giảm nhiễu theo `1/√N`; vậy với cảnh có chuyển động nhẹ thì căn chỉnh rồi trung bình có còn lợi không?

## 📚 Nguồn
- Lecture 5 — Arithmetic, Logic & Geometric Operations
