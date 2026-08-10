---
slug: clahe
title: CLAHE — cân bằng histogram cục bộ
vault: ivp
type: concept
branch: D
order: 9
status: learning
tags: [ivp, enhancement]
prev: [can-bang-histogram]
next: [dac-ta-histogram]
related: [can-bang-histogram, top-hat]
sources: ["L6 — Gray-Level Transformations, Histogram, Neighborhood"]
created: 2026-08-10
---

# CLAHE — cân bằng histogram cục bộ

> Tóm tắt 1 câu: chia ảnh thành ô nhỏ rồi cân bằng **riêng từng ô** — sửa được chiếu sáng không đều, thứ mà cân bằng toàn cục bó tay.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #9 ← cần [[can-bang-histogram]] · → kế tiếp [[dac-ta-histogram]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #enhancement

---

## 💡 Ý chính

Tên đầy đủ: **C**ontrast **L**imited **A**daptive **H**istogram **E**qualization. Ba chữ, ba ý tưởng chồng lên nhau:

| Chữ | Nghĩa | Giải quyết vấn đề gì |
|---|---|---|
| **AHE** (Adaptive) | Equalize theo **từng ô** thay vì cả ảnh | Chiếu sáng không đều |
| **CL** (Contrast Limited) | **Chặn trần** cột histogram trước khi tính CDF | AHE khuếch đại nhiễu quá đà |
| Nội suy giữa các ô | Trộn mượt kết quả các ô lân cận | Ô vuông lộ ranh giới |

## 🧩 Vì sao cần cục bộ

Ảnh X-quang ngực: vùng phổi tối, vùng xương sáng. [[can-bang-histogram]] toàn cục tính **một** CDF chung cho cả hai → được vùng này thì hỏng vùng kia, vì hai vùng có phân bố sáng hoàn toàn khác nhau.

CLAHE tính **CDF riêng cho từng ô** (thường 8×8 ô). Ô nằm trong phổi được giãn theo thống kê của phổi, ô trong xương theo thống kê của xương. Kết quả: chi tiết hiện lên **ở cả hai vùng cùng lúc**.

## 🧩 "Contrast Limited" — chi tiết quan trọng nhất

AHE thuần có một lỗi nặng: ở **ô gần như đồng nhất** (một mảng trời trơn), histogram dồn hết vào một cột hẹp → CDF dốc dựng đứng → **khuếch đại cực mạnh**. Mà thứ duy nhất có trong ô đó là **nhiễu**. Kết quả là vùng phẳng biến thành một mảng sạn kinh khủng.

**Cách chữa:** đặt một **trần** (`clipLimit`). Phần cột histogram vượt trần bị **cắt đi và rải đều** lại cho các mức khác. Độ dốc CDF bị chặn → mức khuếch đại bị chặn theo.

`clipLimit` là núm chính:
- **Thấp** (≈1) → gần như không đổi gì, an toàn.
- **Cao** (≈4+) → giống AHE thuần, chi tiết rõ nhưng **sạn nhiễu**.
- Thực tế `2.0` là điểm khởi đầu hợp lý.

Núm thứ hai là **kích thước ô** (`tileGridSize`): ô nhỏ → thích nghi tốt hơn nhưng dễ mất bối cảnh và tăng artifact; ô lớn → tiến dần về equalize toàn cục.

## ⚙️ Khi nào dùng

- **Ảnh y tế** — X-quang, nội soi, đáy mắt. Đây là ứng dụng CLAHE ra đời để phục vụ.
- **Chiếu sáng không đều** — ảnh chụp tài liệu có bóng đèn hắt một bên, ảnh dưới nước, ảnh sương mù.
- **Tiền xử lý cho OCR / dò biên** khi nền có gradient sáng.
- Trên ảnh màu: chỉ áp cho kênh **L** (LAB) hoặc **V** (HSV), đừng áp cho từng kênh RGB.

## ⚠️ Điều dễ nhầm

- **CLAHE không phải "equalize mạnh hơn".** Nó giải một bài toán **khác**: bài toán cục bộ. Ảnh chiếu sáng đều thì equalize toàn cục cho kết quả tự nhiên hơn.
- **CLAHE làm mất tính nhất quán toàn cục.** Hai vùng có độ sáng thật khác nhau có thể ra cùng độ sáng sau CLAHE → **không dùng được nếu độ sáng tuyệt đối mang thông tin** (ví dụ đo mật độ xương). Đây là cái giá thật sự.
- Nó là phép **cục bộ**, không còn là [[bien-doi-diem]] nữa → **không nén được thành LUT** duy nhất.
- Bài toán chiếu sáng không đều còn một lời giải khác hoàn toàn khác về nguyên lý: [[top-hat]] của hình thái học.

---

## 🔗 Liên kết
- **Tiền đề:** [[can-bang-histogram]]
- **Dẫn tới:** [[dac-ta-histogram]]
- **Liên quan:** [[top-hat]] · [[nguong-cuc-bo]] · [[mo-hinh-mau-hsv]]

## ❓ Câu hỏi mở
- CLAHE với `clipLimit` bao nhiêu là "trung thực"? Có tiêu chí khách quan không hay chỉ chỉnh bằng mắt?

## 📚 Nguồn
- Lecture 6 — Gray-Level Transformations, Histogram, Neighborhood
