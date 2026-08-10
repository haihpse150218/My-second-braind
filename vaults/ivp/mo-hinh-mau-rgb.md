---
slug: mo-hinh-mau-rgb
title: Mô hình màu RGB
vault: ivp
type: concept
branch: I
order: 1
status: learning
tags: [ivp, mau]
prev: [watershed]
next: [cmyk-va-mau-tru]
related: [cam-bien-anh, mo-hinh-mau-hsv]
sources: ["L11 — Color Image Processing", "L4 — Image Sensing & Acquisition"]
created: 2026-08-10
---

# Mô hình màu RGB

> Tóm tắt 1 câu: màu là **cảm nhận sinh học**, không phải thuộc tính vật lý — RGB hoạt động được chỉ vì mắt người có đúng **ba loại tế bào nón**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh I · #1 ← cần [[watershed]] · → kế tiếp [[cmyk-va-mau-tru]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #mau

---

## 💡 Vì sao ba kênh là đủ

Ánh sáng thật là **phổ liên tục** — vô hạn bước sóng. Nhưng mắt người chỉ có **ba loại tế bào nón** (L, M, S — nhạy vùng đỏ, lục, lam) và **tế bào que** (chỉ phân biệt sáng tối, dùng ban đêm).

→ Não nhận đúng **ba con số** từ mắt. Nên tái tạo đúng ba con số đó là đủ lừa được thị giác, dù phổ vật lý hoàn toàn khác.

> 📌 Hệ quả gọi là **metamerism**: hai nguồn sáng có **phổ khác hẳn nhau** vẫn trông **cùng một màu**. Màn hình trộn 3 đèn LED cho ra thứ mắt gọi là "vàng", trong khi ánh vàng thật là một bước sóng đơn. Đây là toàn bộ lý do màn hình 3 màu hoạt động.

## 🧩 Khối lập phương RGB

Ba trục `R, G, B ∈ [0,1]` (hoặc `[0,255]`) tạo thành khối lập phương:

| Vị trí | Màu |
|---|---|
| `(0,0,0)` | Đen |
| `(1,1,1)` | Trắng |
| **Đường chéo chính** `R=G=B` | **Thang xám** |
| Ba đỉnh trục | Đỏ, lục, lam |
| Ba đỉnh còn lại | Vàng, lục lam (cyan), đỏ tươi (magenta) |

**Cộng màu** (additive): trộn ánh sáng thì càng trộn càng **sáng**, đủ ba màu ra trắng. Áp dụng cho mọi thứ **phát sáng** — màn hình, đèn chiếu. Đối lập với [[cmyk-va-mau-tru]].

Ảnh RGB trong bộ nhớ là mảng `M×N×3` — ba ma trận xám chồng lên nhau, xem [[kieu-anh-va-do-sau-bit]].

## ⚠️ Nhược điểm lớn của RGB

> 🚨 **Ba kênh RGB tương quan mạnh với nhau.** Vật sáng lên thì **cả ba** kênh cùng tăng.

Hệ quả rất thực tế: **không tách được "màu gì" khỏi "sáng bao nhiêu"**.

| Việc muốn làm | Vì sao RGB gây khó |
|---|---|
| "Tìm mọi pixel màu da" | Da trong bóng râm và da ngoài nắng có giá trị RGB **rất khác nhau** dù cùng một màu |
| "Tăng sáng mà giữ nguyên màu" | Chỉnh cả 3 kênh không đều tay là lệch tông ngay |
| Cân bằng histogram | Equalize riêng từng kênh **phá màu**, xem [[can-bang-histogram]] |

→ Đây chính là lý do [[mo-hinh-mau-hsv]] tồn tại: nó tách **tông màu** khỏi **độ sáng**.

## ⚠️ Điều dễ nhầm

- **RGB không phải một không gian màu duy nhất.** sRGB, Adobe RGB, ProPhoto RGB đều là "RGB" nhưng phủ dải màu khác nhau — cùng bộ ba số cho ra màu **khác nhau** trên hai chuẩn. Xem [[gamut-va-quan-ly-mau]].
- **Giá trị RGB trong file đã mã hoá gamma**, không tuyến tính với cường độ ánh sáng. Trộn ánh sáng đúng vật lý phải khử gamma trước, xem [[gamma-correction]].
- **Ảnh RGB từ máy chụp có 2/3 dữ liệu là nội suy** từ mẫu Bayer, xem [[cam-bien-anh]].
- **Lọc từng kênh RGB riêng** cho kết quả khác lọc trên kênh sáng — và thường sinh viền màu giả ở cạnh sắc.

---

## 🔗 Liên kết
- **Tiền đề:** [[watershed]] · [[cam-bien-anh]]
- **Dẫn tới:** [[cmyk-va-mau-tru]] · [[mo-hinh-mau-hsv]]
- **Liên quan:** [[kieu-anh-va-do-sau-bit]] · [[gamma-correction]] · [[gamut-va-quan-ly-mau]]

## ❓ Câu hỏi mở
- Người tứ sắc (tetrachromat, có 4 loại tế bào nón) nhìn màn hình RGB thấy gì?

## 📚 Nguồn
- Lecture 11 — Color Image Processing
- Lecture 4 — Image Sensing & Acquisition
