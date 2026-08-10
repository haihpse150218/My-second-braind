---
slug: cmyk-va-mau-tru
title: CMYK & màu trừ
vault: ivp
type: concept
branch: I
order: 2
status: learning
tags: [ivp, mau]
prev: [mo-hinh-mau-rgb]
next: [mo-hinh-mau-hsv]
related: [mo-hinh-mau-rgb, gamut-va-quan-ly-mau]
sources: ["L11 — Color Image Processing"]
created: 2026-08-10
---

# CMYK & màu trừ

> Tóm tắt 1 câu: mực **hấp thụ** ánh sáng thay vì phát ra, nên càng chồng mực càng **tối** — ngược hoàn toàn với RGB.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh I · #2 ← cần [[mo-hinh-mau-rgb]] · → kế tiếp [[mo-hinh-mau-hsv]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #mau

---

## 💡 Ý chính

| | **Cộng màu** (RGB) | **Trừ màu** (CMY) |
|---|---|---|
| Cơ chế | **Phát** ánh sáng | **Hấp thụ** ánh sáng, phản xạ phần còn lại |
| Không trộn gì | **Đen** (không có ánh sáng) | **Trắng** (giấy trắng) |
| Trộn hết | **Trắng** | **Đen** |
| Thiết bị | Màn hình, đèn chiếu | Máy in, sơn, thuốc nhuộm |

$$
C = 1 - R,\qquad M = 1 - G,\qquad Y = 1 - B
$$

CMY là **phần bù** của RGB — mực Cyan hấp thụ đỏ và phản xạ lục+lam, nên mắt thấy màu lục lam.

## 🧩 Vì sao có chữ K

Về lý thuyết `C + M + Y = đen`. Thực tế **không đúng**:

| Vấn đề | Chi tiết |
|---|---|
| Màu ra **nâu bùn** | Mực thật không hấp thụ hoàn hảo dải của nó |
| **Tốn mực** | Ba lớp mực chỉ để in một chữ đen |
| **Giấy ướt, nhoè** | Ba lớp mực ướt chồng lên nhau |
| **Khó canh chồng khít** | Ba bản in lệch nhau vài chục micron là chữ đen viền màu |

→ Thêm mực đen riêng: **K** (key/blacK — gọi "K" chứ không "B" để khỏi lẫn với Blue).

Chữ đen in bằng **một lớp K duy nhất**: sắc nét, rẻ, không lệch bản.

## ⚠️ Vì sao ảnh in ra khác ảnh trên màn hình

Đây là câu hỏi thực tế mà mô hình này trả lời:

**1. Gamut khác nhau.** Màn hình phát ra được những màu **bão hoà rực rỡ** mà mực không tái tạo nổi — xanh neon, lục chói. Chuyển RGB → CMYK thì những màu này bị **ép về màu gần nhất in được**, trông xỉn hẳn đi. Xem [[gamut-va-quan-ly-mau]].

**2. Không có phép chuyển đổi phổ quát.** Công thức `C = 1−R` chỉ là xấp xỉ thô. Chuyển đổi đúng phụ thuộc **loại mực, loại giấy, máy in cụ thể** — nên cần **ICC profile** mô tả từng thiết bị.

**3. Cơ chế nhìn khác nhau.** Màn hình **phát sáng**, giấy **phản xạ ánh sáng môi trường** — cùng một màu nhìn dưới đèn vàng và ánh sáng ban ngày đã khác nhau rồi.

## ⚠️ Điều dễ nhầm

- **CMYK không phải "RGB đảo ngược" đơn giản.** Chuyển đổi thực tế là phi tuyến và phụ thuộc thiết bị.
- **CMYK có gamut NHỎ HƠN RGB** ở vùng màu bão hoà, nhưng **lớn hơn ở một số vùng khác** (một số màu cyan/vàng đậm). Không phải quan hệ bao hàm hoàn toàn.
- **Xử lý ảnh hầu như không làm trên CMYK** — nó là không gian **đầu ra cho máy in**, chuyển sang ở bước cuối cùng. Mọi thao tác nên làm ở RGB hoặc [[mo-hinh-mau-hsv]].
- Thiết kế để in mà làm việc suốt ở RGB rồi cuối cùng mới chuyển thì hay bị "sao in ra xỉn thế" — nên soft-proof (xem trước bằng profile máy in) từ sớm.

---

## 🔗 Liên kết
- **Tiền đề:** [[mo-hinh-mau-rgb]]
- **Dẫn tới:** [[mo-hinh-mau-hsv]] · [[gamut-va-quan-ly-mau]]

## ❓ Câu hỏi mở
- Máy in 6–12 mực mở rộng gamut đáng kể — giới hạn vật lý cuối cùng nằm ở đâu?

## 📚 Nguồn
- Lecture 11 — Color Image Processing
