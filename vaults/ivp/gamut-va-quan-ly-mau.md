---
slug: gamut-va-quan-ly-mau
title: Gamut & quản lý màu
vault: ivp
type: concept
branch: I
order: 5
status: learning
tags: [ivp, mau]
prev: [ycbcr]
next: [pseudocolor]
related: [mo-hinh-mau-rgb, cmyk-va-mau-tru]
sources: ["L11 — Color Image Processing"]
created: 2026-08-10
---

# Gamut & quản lý màu

> Tóm tắt 1 câu: bộ ba số `(120, 200, 80)` **không xác định một màu** cho tới khi biết nó thuộc chuẩn nào — và đó là lý do cần ICC profile.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh I · #5 ← cần [[ycbcr]] · → kế tiếp [[pseudocolor]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #mau

---

## 💡 Ba khái niệm

| Khái niệm | Là gì |
|---|---|
| **CIE XYZ** | Không gian màu **tuyệt đối**, dựa trên đo lường thị giác người — hệ quy chiếu gốc |
| **Sơ đồ sắc độ** | Hình "móng ngựa" — **toàn bộ** màu người nhìn thấy được |
| **Gamut** | Vùng con trong móng ngựa mà **một thiết bị cụ thể** tái tạo được |

Gamut của màn hình là một **tam giác** (ba đỉnh = ba primary RGB); gamut máy in là một đa giác méo. Cả hai đều **nhỏ hơn** móng ngựa — nghĩa là **không thiết bị nào tái tạo được mọi màu mắt thấy**.

| Chuẩn | Gamut | Dùng ở |
|---|---|---|
| **sRGB** | Nhỏ nhất | Web, màn hình phổ thông — **mặc định an toàn** |
| **Adobe RGB** | Rộng hơn ở vùng lục lam | Nhiếp ảnh, in ấn |
| **ProPhoto RGB** | Rất rộng | Lưu trữ, xử lý ở độ sâu bit cao |
| **DCI-P3** | Rộng, thiên đỏ | Điện ảnh, màn hình hiện đại |

## 🧩 Vì sao cần ICC profile

Cùng bộ ba `(255, 0, 0)`:
- Trên màn hình **sRGB** → một màu đỏ nhất định.
- Trên màn hình **Adobe RGB** → một màu đỏ **rực hơn hẳn**, vì đỉnh đỏ của tam giác gamut nằm xa hơn.

→ **Con số không mang ý nghĩa màu nếu thiếu ngữ cảnh.**

**ICC profile** là file mô tả gamut của một thiết bị — nó nói "trên thiết bị này, `(255,0,0)` tương ứng với điểm XYZ nào". Có profile của cả hai đầu thì chuyển đổi qua XYZ làm trung gian và màu giữ nguyên qua các thiết bị.

Đây cũng là lời giải thích cho triệu chứng quen thuộc: **ảnh mở trên hai máy khác nhau ra hai màu khác nhau** — thường do ảnh không gắn profile, mỗi phần mềm tự đoán một chuẩn khác nhau.

## ⚙️ Ép về gamut (gamut mapping)

Khi màu nguồn nằm **ngoài** gamut đích (chuyển ảnh màn hình sang máy in), phải chọn cách ép:

| Cách | Làm gì | Hợp với |
|---|---|---|
| **Perceptual** | Nén **toàn bộ** gamut vào cho vừa | Ảnh chụp — giữ quan hệ giữa các màu, tất cả hơi nhạt đi đều |
| **Relative colorimetric** | Giữ nguyên màu **trong** gamut, chỉ kéo màu ngoài về biên | Logo, thiết kế — màu chính xác quan trọng hơn |

Perceptual đổi cả những màu vốn in được, nhưng giữ được **tương quan** nên ảnh trông tự nhiên. Relative giữ chính xác phần lớn màu nhưng có thể **dồn nhiều màu ngoài gamut về cùng một màu biên** → mất chi tiết ở vùng rực.

## 💡 CIELAB — không gian đồng đều cảm nhận

`L*a*b*` được thiết kế sao cho **khoảng cách Euclid trong không gian màu ≈ khác biệt màu mà mắt cảm nhận**.

Đây là điều mà RGB và [[mo-hinh-mau-hsv]] **không** có: trong RGB, chênh 10 đơn vị ở vùng lục mắt gần như không thấy, còn ở vùng lam thì thấy rõ.

→ Muốn **đo** khác biệt màu (kiểm tra chất lượng in, so màu vải, đánh giá thuật toán tái tạo màu) thì phải dùng LAB, với đơn vị `ΔE`. `ΔE < 1` là ngưỡng mắt thường không phân biệt được.

`L` của LAB cũng là kênh sáng tốt để chạy [[clahe]] — thường tốt hơn kênh V của HSV vì nó đồng đều cảm nhận.

## ⚠️ Điều dễ nhầm

- **Gamut rộng hơn không phải lúc nào cũng tốt.** Ảnh ProPhoto RGB hiển thị trên phần mềm không quản lý màu sẽ trông **nhợt nhạt bất thường**. Web thì cứ sRGB.
- **Gamut rộng ở 8 bit gây banding.** Trải cùng 256 mức trên dải màu rộng hơn → bước nhảy lớn hơn → [[luong-tu-hoa-anh|false contouring]]. Gamut rộng đi kèm yêu cầu 16-bit.
- **Không thiết bị nào phủ hết móng ngựa**, kể cả màn hình đắt nhất. Một số màu chỉ tồn tại ngoài đời.

---

## 🔗 Liên kết
- **Tiền đề:** [[ycbcr]] · [[cmyk-va-mau-tru]]
- **Dẫn tới:** [[pseudocolor]]
- **Liên quan:** [[mo-hinh-mau-rgb]] · [[clahe]] · [[luong-tu-hoa-anh]]

## ❓ Câu hỏi mở
- `ΔE` đo khác biệt màu cho từng cặp — có chỉ số tương đương để đánh giá cả một bức ảnh không?

## 📚 Nguồn
- Lecture 11 — Color Image Processing
