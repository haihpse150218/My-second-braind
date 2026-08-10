---
slug: gian-no-va-co-hep
title: Giãn nở & co hẹp
vault: ivp
type: concept
branch: F
order: 3
status: learning
tags: [ivp, hinh-thai]
prev: [phan-tu-cau-truc]
next: [opening-closing]
related: [phan-tu-cau-truc, opening-closing]
sources: ["L8 — Morphological Image Processing"]
created: 2026-08-10
---

# Giãn nở & co hẹp

> Tóm tắt 1 câu: hai phép nguyên thuỷ — **nở** vật ra (dilation) và **co** vật lại (erosion); mọi phép hình thái học khác đều ghép từ hai cái này.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F · #3 ← cần [[phan-tu-cau-truc]] · → kế tiếp [[opening-closing]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #hinh-thai

---

## 💡 Ý chính

| | **Giãn nở** `A ⊕ B` | **Co hẹp** `A ⊖ B` |
|---|---|---|
| Điều kiện giữ pixel | SE **chạm** vật (hit) — ít nhất 1 điểm chung | SE **lọt hẳn** vào vật (fit) — mọi điểm đều thuộc vật |
| Logic tương đương | **OR** trong cửa sổ | **AND** trong cửa sổ |
| Trên ảnh xám | Lấy **max** trong cửa sổ | Lấy **min** trong cửa sổ |
| Vật thể | **To ra** | **Nhỏ lại** |
| Lỗ trong vật | **Bịt lại** | **To ra** |
| Vật nhỏ hơn SE | Vẫn còn, to lên | **Biến mất** |
| Khe hẹp giữa 2 vật | **Nối liền** | Càng tách xa |

Mẹo nhớ: **"chạm là nở, lọt là co"**.

## 🧩 Trực giác

**Giãn nở** — lăn SE dọc theo **mép ngoài** vật, vết mà tâm SE đi qua chính là vật mới. Vật phình ra một lớp dày bằng bán kính SE.

**Co hẹp** — lăn SE dọc theo **mép trong**. Chỗ nào SE không lọt vừa (chi tiết mảnh, gai nhọn) thì bị **cắt bỏ**.

## ⚙️ Dùng riêng lẻ để làm gì

| Phép | Ứng dụng |
|---|---|
| **Giãn nở** | Nối nét chữ đứt trước khi OCR; làm dày đường mảnh cho dễ nhìn; phình mask ra một chút để chắc chắn phủ hết vật |
| **Co hẹp** | Xoá đốm nhiễu nhỏ; **tách hai vật dính nhau** bởi cầu nối mỏng; thu mask lại để chắc chắn nằm trong vật |

**Hai phép ghép lại cho hai công cụ rất hay dùng:**

| Công thức | Tên | Cho ra |
|---|---|---|
| `A − (A ⊖ B)` | **Trích biên** | Đường viền **mỏng** của vật (chỉ lớp trong cùng) |
| `(A ⊕ B) − (A ⊖ B)` | **Gradient hình thái** | Đường viền **dày** hơn, đối xứng hai bên biên thật |

Trích biên bằng hình thái học khác với [[dao-ham-bac-1-anh|dò biên bằng đạo hàm]]: nó cho biên **đúng 1 pixel, khép kín**, còn Sobel cho biên có độ dày thay đổi và có thể đứt đoạn.

## ⚠️ Điều dễ nhầm

- **Không phải phép nghịch đảo của nhau.** Co rồi nở **không** trả lại ảnh gốc — chi tiết đã bị co mất thì không nở lại được. Chính vì **không** nghịch đảo mà [[opening-closing]] mới có ích.
- **Cả hai làm vật dịch đi nếu SE lệch tâm.**
- **Vật chạm mép ảnh** bị ảnh hưởng bởi cách xử lý biên — đệm 0 thì co hẹp cắt cụt vật ở mép.
- **Trên ảnh xám**, dilation = max nên nó **làm sáng** ảnh, erosion = min nên **làm tối** ảnh. Đây là nền của [[top-hat]].

---

## 🔗 Liên kết
- **Tiền đề:** [[phan-tu-cau-truc]]
- **Dẫn tới:** [[opening-closing]] · [[top-hat]]
- **Liên quan:** [[hinh-thai-hoc]] · [[dao-ham-bac-1-anh]]

## ❓ Câu hỏi mở
- Với ảnh xám, "hit/fit" không còn nghĩa nhị phân — cách hiểu trực quan nào thay thế được?

## 📚 Nguồn
- Lecture 8 — Morphological Image Processing
