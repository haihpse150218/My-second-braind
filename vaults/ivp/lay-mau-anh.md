---
slug: lay-mau-anh
title: Lấy mẫu ảnh
vault: ivp
type: concept
branch: B
order: 2
status: learning
tags: [ivp, so-hoa]
prev: [cam-bien-anh]
next: [luong-tu-hoa-anh]
related: [aliasing-anh, noi-suy-anh]
sources: ["L2 — Image Processing Basics", "L4 — Image Sensing & Acquisition"]
created: 2026-08-10
---

# Lấy mẫu ảnh

> Tóm tắt 1 câu: rời rạc hoá **toạ độ** — quyết định ảnh có bao nhiêu pixel, tức là quyết định **chi tiết nhỏ nhất còn nhìn thấy được**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B · #2 ← cần [[cam-bien-anh]] · → kế tiếp [[luong-tu-hoa-anh]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #so-hoa

---

## 💡 Ý chính

Số hoá một ảnh liên tục cần **hai** phép rời rạc hoá độc lập nhau:

| Phép | Rời rạc hoá cái gì | Cho ra | Note |
|---|---|---|---|
| **Lấy mẫu** (sampling) | **Toạ độ** `(x,y)` | Số pixel `M×N` | ← đang ở đây |
| **Lượng tử hoá** | **Giá trị** `f` | Số mức xám `L` | [[luong-tu-hoa-anh]] |

Lấy mẫu = đặt một **lưới** lên ảnh liên tục và ở mỗi mắt lưới lấy một giá trị đại diện. Lưới dày → nhiều pixel → giữ được chi tiết nhỏ. Lưới thưa → mất chi tiết, **không lấy lại được**.

## 🧩 Trực giác

Giống chụp lưới ô vuông lên một bức tranh rồi mỗi ô chỉ ghi **một** màu trung bình. Ô càng to, những nét mảnh hơn ô sẽ **biến mất hoặc bị bóp méo** — không phải mờ đi, mà bị thay bằng thứ khác hẳn (xem [[aliasing-anh]]).

## 🔢 Độ phân giải — hai loại khác nhau

| Loại | Đo cái gì | Đơn vị |
|---|---|---|
| **Độ phân giải không gian** | Mật độ mẫu | pixel, hoặc **dpi/ppi** |
| **Độ phân giải mức xám** | Số mức phân biệt được | bit (8-bit = 256 mức) |

⚠️ **"1920×1080" không phải độ phân giải không gian thật.** Nó chỉ là *số pixel*. Độ phân giải thật là **pixel trên đơn vị chiều dài vật lý** — cùng 1920×1080 in ra khổ A4 thì nét, in ra tấm biển 2 m thì thấy rõ từng ô. Đây là lý do máy in nói "dpi" chứ không nói "megapixel".

## ⚙️ Khi nào cần nghĩ tới

- **Thu nhỏ ảnh** — bỏ bớt mẫu, phải [[loc-lam-min]] **trước** khi bỏ, nếu không sẽ dính aliasing.
- **Phóng to ảnh** — thêm mẫu không có thật, phải [[noi-suy-anh]] để đoán giá trị mới.
- **Chọn camera** — độ phân giải cần thiết suy từ **chi tiết nhỏ nhất phải nhìn thấy**: muốn đọc chữ cao 2 mm thì mỗi mm phải có ít nhất vài pixel, không phải cứ mua nhiều MP là xong.

## ⚠️ Điều dễ nhầm

- **Nhiều megapixel ≠ ảnh đẹp hơn.** Nhồi thêm photosite lên cùng diện tích cảm biến → mỗi ô nhỏ hơn → thu ít photon hơn → **nhiễu tăng**. Có một đánh đổi vật lý ở đây, không phải marketing thuần tuý.
- Lấy mẫu và lượng tử hoá **độc lập**: giảm số pixel thì mất chi tiết *hình*; giảm số mức xám thì mất chi tiết *sắc độ* và sinh [[can-bang-histogram|false contouring]]. Hai lỗi trông rất khác nhau.

---

## 🔗 Liên kết
- **Tiền đề:** [[cam-bien-anh]]
- **Dẫn tới:** [[luong-tu-hoa-anh]] · [[aliasing-anh]]
- **Liên quan:** [[noi-suy-anh]]
- **Liên môn:** `dsp/tin-hieu-roi-rac` — cùng một phép lấy mẫu, chỉ khác là DSP lấy mẫu theo **thời gian** còn ở đây theo **không gian 2 chiều**.

## ❓ Câu hỏi mở
- Lưới vuông là lựa chọn phổ biến, nhưng lưới lục giác phủ mặt phẳng hiệu quả hơn — vì sao không ai dùng?

## 📚 Nguồn
- Lecture 2 — Image Processing Basics
- Lecture 4 — Image Sensing & Acquisition
