---
slug: pseudocolor
title: Pseudocolor — tô màu ảnh xám
vault: ivp
type: concept
branch: I
order: 6
status: learning
tags: [ivp, mau, hien-thi]
prev: [gamut-va-quan-ly-mau]
next: [keypoint-la-gi]
related: [lut-bang-tra, bien-doi-tung-khuc]
sources: ["L11 — Color Image Processing"]
created: 2026-08-10
---

# Pseudocolor — tô màu ảnh xám

> Tóm tắt 1 câu: gán màu cho từng mức xám để **mắt thấy được chênh lệch** mà thang xám giấu đi — mắt phân biệt được hàng triệu màu nhưng chỉ vài chục mức xám.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh I · #6 ← cần [[gamut-va-quan-ly-mau]] · → kế tiếp [[keypoint-la-gi]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #mau #hien-thi

---

## 💡 Ý chính

Ảnh gốc là ảnh **xám** (một kênh). Pseudocolor gán mỗi mức xám một màu qua một **bảng màu** — chính là [[lut-bang-tra]] cỡ `256×3`.

**Lý do sinh học:** mắt người phân biệt được **hàng triệu sắc màu** nhưng chỉ khoảng **vài chục mức xám** trong một cảnh. Nên chuyển thông tin từ trục xám sang trục màu là **khai thác đúng chỗ mắt mạnh**.

| Kỹ thuật | Cách làm |
|---|---|
| **Intensity slicing** | Chia dải xám thành vài khoảng, mỗi khoảng **một màu duy nhất** → như bản đồ đường đồng mức |
| **Colormap liên tục** | Mỗi mức xám một màu riêng (`jet`, `hot`, `viridis`) |

## ⚙️ Ứng dụng

- **Ảnh y tế** — MRI/CT tô màu để làm nổi vùng bất thường; chênh lệch mật độ vài đơn vị mà mắt bỏ qua trên thang xám thì thành hai màu khác hẳn.
- **Ảnh nhiệt** — dữ liệu vốn không có màu, màu hoàn toàn do bảng màu gán.
- **Ảnh vệ tinh / độ cao** — bản đồ nhiệt độ, độ ẩm, độ cao địa hình.
- **Hiển thị dữ liệu không phải ảnh** — bản đồ khoảng cách, phổ Fourier, bản đồ attention của mạng học sâu.

## ⚠️ Cái bẫy của colormap `jet`

> 🚨 Bảng `jet` (xanh dương → lục → vàng → đỏ) là **mặc định của nhiều thư viện cũ** và cũng là lựa chọn **tệ nhất** cho việc đọc số liệu.

| Vấn đề | Hậu quả |
|---|---|
| **Độ sáng không đơn điệu** | Vùng vàng sáng chói ở giữa dải tạo **ranh giới giả** — người xem tưởng có cấu trúc ở chỗ dữ liệu hoàn toàn trơn |
| **Không đồng đều cảm nhận** | Cùng một bước giá trị, chỗ này đổi màu rõ, chỗ kia gần như không đổi → đọc sai độ dốc |
| **Hỏng khi in đen trắng** | Hai màu khác nhau ra cùng độ xám |
| **Người mù màu không đọc được** | Đỏ-lục là cặp khó phân biệt nhất |

→ Dùng **`viridis`**, `magma`, `cividis`: độ sáng **tăng đơn điệu**, đồng đều cảm nhận, an toàn với mù màu và in đen trắng.

Đây là lỗi trình bày dữ liệu rất phổ biến trong báo cáo kỹ thuật — cùng loại với việc chọn sai chỉ số đánh giá ở [[ml/danh-gia-mo-hinh]]: công cụ trình bày sai làm người đọc rút ra kết luận sai từ dữ liệu đúng.

## ⚠️ Điều dễ nhầm

- **Pseudocolor KHÔNG thêm thông tin.** Dữ liệu vẫn là một kênh; màu chỉ là cách trình bày. Không được coi ảnh đã tô màu là ảnh màu thật.
- **"False color" là chuyện khác.** False color ghép các **kênh phổ thật** (hồng ngoại, tử ngoại) vào R/G/B — dữ liệu **nhiều kênh** thật, chỉ là gán sai chỗ so với mắt. Ảnh vệ tinh "thực vật màu đỏ" là false color, không phải pseudocolor.
- **Luôn kèm thanh màu (colorbar).** Không có nó thì ảnh tô màu là vô nghĩa về mặt định lượng — người xem không biết đỏ nghĩa là bao nhiêu.
- **Bảng màu ảnh hưởng tới kết luận.** Cùng một dữ liệu, đổi bảng màu có thể làm một cấu trúc mờ nhạt trông rõ mồn một hoặc biến mất.

---

## 🔗 Liên kết
- **Tiền đề:** [[gamut-va-quan-ly-mau]] · [[lut-bang-tra]]
- **Dẫn tới:** [[keypoint-la-gi]]
- **Liên quan:** [[bien-doi-tung-khuc]] · [[kieu-anh-va-do-sau-bit]]
- **Liên môn:** [[ml/danh-gia-mo-hinh]] — trình bày sai làm người đọc kết luận sai, dù dữ liệu đúng.

## ❓ Câu hỏi mở
- Colormap tuần hoàn (cho dữ liệu góc, như kênh Hue) cần tính chất gì khác với colormap thường?

## 📚 Nguồn
- Lecture 11 — Color Image Processing
