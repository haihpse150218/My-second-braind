---
slug: phep-logic-va-roi
title: Phép logic & vùng quan tâm (ROI)
vault: ivp
type: concept
branch: C
order: 3
status: learning
tags: [ivp, mask]
prev: [tran-so-anh]
next: [bien-doi-affine]
related: [hinh-thai-hoc, nguong-hoa]
sources: ["L5 — Arithmetic, Logic & Geometric Operations"]
created: 2026-08-10
---

# Phép logic & vùng quan tâm (ROI)

> Tóm tắt 1 câu: AND/OR/XOR/NOT trên ảnh nhị phân, và ứng dụng thực sự của chúng là **mask** — chỉ xử lý phần ảnh mình quan tâm.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #3 ← cần [[tran-so-anh]] · → kế tiếp [[bien-doi-affine]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #mask

---

## 💡 Ý chính

| Phép | Ý nghĩa hình học | Dùng để |
|---|---|---|
| **AND** | **Giao** hai vùng | Áp mask — giữ vùng quan tâm, xoá phần còn lại |
| **OR** | **Hợp** hai vùng | Gộp nhiều vùng rời rạc thành một mask |
| **NOT** | **Phần bù** | Đảo mask: đang chọn vật → chuyển sang chọn nền |
| **XOR** | Phần **khác nhau** | So sánh hai kết quả phân đoạn, đo sai lệch |

## 🧩 Mask — ý tưởng thực sự đáng học

**Mask** là một ảnh nhị phân cùng kích thước ảnh gốc: `1` ở nơi cần xử lý, `0` ở nơi bỏ qua.

```
ảnh gốc  ×  mask  =  chỉ còn vùng quan tâm
```

Vì mask chỉ chứa `0`/`1` nên **nhân** cũng chính là **AND**. Đây là lý do "nhân với mask" và "AND với mask" là cùng một việc, chỉ khác cách gọi.

Mask sinh ra từ đâu:
- Vẽ tay một đa giác (`roipoly`) — nhanh, dùng khi làm thủ công.
- Từ [[nguong-hoa]] — tự động, dựa vào giá trị pixel.
- Từ [[hinh-thai-hoc]] — làm sạch mask thô, lấp lỗ, bỏ đốm nhiễu.

## ⚙️ Vì sao ROI quan trọng

**1. Tốc độ.** Ảnh y tế 4000×4000 nhưng vùng nghi ngờ chỉ 200×200 — xử lý riêng vùng đó nhanh hơn **400 lần**.

**2. Đúng đắn.** Đây là lý do quan trọng hơn: nhiều phép **phụ thuộc vào thống kê toàn ảnh**. [[can-bang-histogram]] trên cả ảnh chụp X-quang sẽ bị nền đen chiếm đa số kéo lệch, còn equalize **chỉ trong ROI phổi** thì mới ra kết quả dùng được. Cùng logic đó, ngưỡng Otsu tính trên ROI khác hẳn tính trên cả ảnh.

**3. Ghép kết quả.** Làm mờ nền + giữ nét chủ thể = xử lý hai lần rồi ghép bằng mask. Hiệu ứng xoá phông trên điện thoại chính là việc này, chỉ khác là mask do mạng học sâu sinh ra.

## ⚠️ Điều dễ nhầm

- **Mask phải cùng kích thước ảnh** — lệch một pixel là lệch cả biên.
- **Biên mask cứng gây răng cưa.** Ghép hai vùng xử lý khác nhau bằng mask nhị phân sẽ thấy đường nối rõ rệt. Cách sửa: làm mờ nhẹ mask để có biên **chuyển tiếp mềm** (alpha blending) thay vì cắt phập.
- **XOR trên ảnh xám không có ý nghĩa hình học.** Các phép logic chỉ "đúng nghĩa" trên ảnh nhị phân; áp lên ảnh 8-bit thì nó thao tác trên **từng bit** và cho kết quả gần như vô nghĩa về mặt thị giác.
- Mask kiểu `logical` và mask kiểu `uint8` chứa `0`/`1` **nhân ra kết quả khác nhau** — xem [[kieu-du-lieu-anh]].

---

## 🔗 Liên kết
- **Tiền đề:** [[tran-so-anh]]
- **Dẫn tới:** [[bien-doi-affine]] · [[nguong-hoa]]
- **Liên quan:** [[hinh-thai-hoc]] · [[can-bang-histogram]] · [[kieu-du-lieu-anh]]

## ❓ Câu hỏi mở
- Mask mềm (giá trị `[0,1]` liên tục) tổng quát hơn mask nhị phân — vậy có còn gọi là phép logic nữa không?

## 📚 Nguồn
- Lecture 5 — Arithmetic, Logic & Geometric Operations
