---
slug: opening-closing
title: Opening & Closing
vault: ivp
type: concept
branch: F
order: 4
status: learning
tags: [ivp, hinh-thai]
prev: [gian-no-va-co-hep]
next: [top-hat]
related: [gian-no-va-co-hep, loc-trung-vi]
sources: ["L8 — Morphological Image Processing"]
created: 2026-08-10
---

# Opening & Closing

> Tóm tắt 1 câu: ghép co và nở theo **hai thứ tự** cho hai công cụ ngược nhau — opening dọn **bên ngoài** vật, closing vá **bên trong** vật, và cả hai đều **giữ nguyên kích thước tổng thể**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F · #4 ← cần [[gian-no-va-co-hep]] · → kế tiếp [[top-hat]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #hinh-thai

---

## 💡 Ý chính

| | **Opening** `A ∘ B` | **Closing** `A • B` |
|---|---|---|
| Công thức | **co → nở** `(A ⊖ B) ⊕ B` | **nở → co** `(A ⊕ B) ⊖ B` |
| Xoá | Đốm nhiễu nhỏ **ngoài** vật, gai nhọn, cầu nối mỏng | Lỗ nhỏ **trong** vật, khe nứt, vịnh lõm |
| Tác dụng phụ | **Không** làm vật nhỏ đi rõ rệt | **Không** làm vật phình rõ rệt |
| Mắt thấy | Làm **mượt biên ngoài** | Làm **mượt biên trong** |

**Vì sao kích thước được giữ:** phép thứ hai bù lại phép thứ nhất. Co làm vật nhỏ đi rồi nở lại trả về gần đúng cỡ cũ — nhưng những gì **đã biến mất hẳn** trong bước co (vật nhỏ hơn SE) thì **không quay lại được**. Đó chính là chỗ lọc xảy ra.

Đây là lý do thứ tự quan trọng: opening và closing **không** giao hoán, cho kết quả hoàn toàn khác nhau.

## 🧩 Trực giác hình học

**Opening** — lăn SE ở **mặt trong** đường biên vật. Chỗ nào SE không lọt vào được (mũi nhọn, eo thắt) thì bị gọt đi.

**Closing** — lăn SE ở **mặt ngoài** đường biên. Chỗ nào SE không lách vào được (khe hẹp, lỗ nhỏ) thì bị lấp.

## ⚙️ Ứng dụng

| Bài toán | Cách làm |
|---|---|
| Ảnh nhị phân đầy đốm nhiễu li ti | **Opening** với SE cỡ đốm nhiễu |
| Vật thể bị thủng lỗ sau ngưỡng hoá | **Closing** |
| Có **cả hai** loại lỗi | **Opening rồi Closing** — khử muối tiêu trên ảnh nhị phân |
| Đếm vật thể mà chúng dính nhau | **Opening** với SE lớn để cắt cầu nối, rồi [[thanh-phan-lien-thong]] |
| Tách chữ khỏi đường kẻ bảng | **Opening** với SE `line`, xem [[phan-tu-cau-truc]] |

Chuỗi **opening → closing** trên ảnh nhị phân đóng vai trò như [[loc-trung-vi]] trên ảnh xám: cùng khử nhiễu xung, cùng giữ được cạnh, cùng phi tuyến.

## ⚠️ Điều dễ nhầm

- **Thứ tự quyết định tất cả.** Nhớ theo tên: *open* = "mở ra" = tách rời những chỗ dính; *close* = "đóng lại" = lấp những chỗ hở.
- **Luỹ đẳng (idempotent).** Opening hai lần liên tiếp cùng SE cho kết quả **giống hệt** một lần. Chạy lặp không giúp gì — muốn tác động mạnh hơn thì **tăng cỡ SE**, không phải chạy nhiều lượt. (Khác hẳn [[loc-lam-min]], vốn mờ thêm sau mỗi lượt.)
- **Opening luôn cho tập con của ảnh gốc; closing luôn cho tập cha.** Opening chỉ có thể **bớt** pixel, closing chỉ có thể **thêm**.
- **Xoá đốm nhiễu nhỏ cũng xoá luôn chi tiết thật cùng cỡ.** Chấm trên chữ "i" biến mất là ví dụ kinh điển khi opening ảnh văn bản.

---

## 🔗 Liên kết
- **Tiền đề:** [[gian-no-va-co-hep]] · [[phan-tu-cau-truc]]
- **Dẫn tới:** [[top-hat]] · [[thanh-phan-lien-thong]]
- **Liên quan:** [[loc-trung-vi]] · [[nguong-hoa]]

## ❓ Câu hỏi mở
- Tính luỹ đẳng có còn đúng với morphology trên ảnh xám không?

## 📚 Nguồn
- Lecture 8 — Morphological Image Processing
