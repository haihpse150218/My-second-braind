---
slug: loc-trung-vi
title: Lọc trung vị & thống kê thứ tự
vault: ivp
type: concept
branch: E
order: 3
status: learning
tags: [ivp, loc, phi-tuyen]
prev: [loc-lam-min]
next: [lam-sac-net]
related: [nhieu-anh, loc-lam-min]
sources: ["L6 — Gray-Level Transformations, Histogram, Neighborhood", "L7 — Image Restoration"]
created: 2026-08-10
---

# Lọc trung vị & thống kê thứ tự

> Tóm tắt 1 câu: **sắp xếp** lân cận rồi chọn một phần tử theo thứ hạng — phi tuyến, nhờ vậy khử được muối tiêu mà **vẫn giữ cạnh sắc**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #3 ← cần [[loc-lam-min]] · → kế tiếp [[lam-sac-net]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #loc #phi-tuyen

---

## 💡 Ý chính

Thay vì tính tổng có trọng số, **sắp xếp** các giá trị trong cửa sổ rồi lấy một phần tử theo vị trí:

| Bộ lọc | Lấy phần tử | Khử được |
|---|---|---|
| **Trung vị** (median) | Ở **giữa** | **Muối tiêu** — tốt nhất |
| **Min** | Nhỏ nhất | Nhiễu **salt** (đốm sáng) |
| **Max** | Lớn nhất | Nhiễu **pepper** (đốm tối) |
| **Midpoint** | `(min+max)/2` | Gaussian + uniform |
| **Alpha-trimmed** | Bỏ `d/2` đầu mỗi phía rồi trung bình | Hỗn hợp nhiều loại nhiễu |

Alpha-trimmed là cầu nối đẹp: `d=0` → thành trung bình; `d = k²−1` → thành trung vị. Một núm xoay giữa hai thái cực.

## 🧩 Vì sao trung vị thắng ở nhiễu muối tiêu

Cửa sổ `3×3` trong vùng tối đồng nhất, có một pixel nhiễu:

```
20  22  21
19 [255] 23        ← 255 là nhiễu salt
21  20  22
```

| Cách | Kết quả | Đánh giá |
|---|---|---|
| **Trung bình** | `(20+22+21+19+255+23+21+20+22)/9 = 47` | Sai lệch **hơn gấp đôi** giá trị đúng — nhiễu không mất mà **loang ra cả 9 pixel** |
| **Trung vị** | Sắp xếp: `19,20,20,21,21,22,22,23,255` → lấy `21` | **Đúng gần như hoàn hảo**, nhiễu bị loại hoàn toàn |

Lý do sâu: trung vị là **thống kê bền vững** (robust) — giá trị cực đoan chỉ chiếm **một chỗ trong danh sách sắp xếp**, ảnh hưởng bị chặn. Còn trung bình cộng thì giá trị cực đoan đóng góp theo **độ lớn** của nó, nên một pixel đủ lệch có thể kéo cả kết quả.

## 🧩 Vì sao trung vị lại giữ được cạnh

Đặt cửa sổ ngay trên một cạnh: **quá nửa** số pixel thuộc về một bên. Trung vị vì thế **rơi vào bên đông hơn** — tức là giữ nguyên một trong hai giá trị thật, chứ **không tạo ra giá trị trung gian** như trung bình.

→ Cạnh vẫn là bước nhảy dứt khoát, chỉ dịch vị trí một chút. Đây là ưu thế mà **không** bộ lọc tuyến tính nào có được.

## ⚙️ Contraharmonic — chú ý dấu

$$
g = \frac{\sum f^{\,R+1}}{\sum f^{\,R}}
$$

| `R` | Khử | Cơ chế |
|---|---|---|
| `R > 0` | **Pepper** (đốm tối) | Luỹ thừa dương làm giá trị lớn áp đảo |
| `R < 0` | **Salt** (đốm sáng) | Luỹ thừa âm làm giá trị nhỏ áp đảo |
| `R = 0` | — | Thành trung bình cộng |
| `R = −1` | — | Thành trung bình điều hoà |

> ⚠️ **Chọn sai dấu `R` không phải là "kém hiệu quả" mà là làm hỏng ảnh** — dùng `R>0` cho nhiễu salt sẽ khuếch đại chính đốm sáng đó. Phải [[uoc-luong-nhieu]] trước khi chọn.

## ⚠️ Điều dễ nhầm

- **Trung vị không phải tích chập** — không viết được thành kernel, không có định lý tích chập, không tăng tốc bằng FFT được. Nó phi tuyến.
- **Trung vị bào mòn chi tiết mảnh.** Đường kẻ mảnh hơn nửa cửa sổ sẽ là thiểu số → bị xoá sạch. Với ảnh nhiều texture nhỏ thì đây là mất mát thật.
- **Chạy lặp nhiều lần cho ra ảnh "loang lổ"** như tranh sơn dầu — mỗi vùng bị san về một giá trị.
- **Chậm hơn trung bình** vì phải sắp xếp mỗi cửa sổ, dù có thuật toán histogram trượt để tăng tốc.
- Với nhiễu **Gaussian** thì trung bình **tốt hơn** trung vị. Không có bộ lọc nào thắng mọi loại nhiễu — đó là lý do [[uoc-luong-nhieu]] là bước bắt buộc.

---

## 🔗 Liên kết
- **Tiền đề:** [[loc-lam-min]]
- **Dẫn tới:** [[lam-sac-net]]
- **Liên quan:** [[nhieu-anh]] · [[uoc-luong-nhieu]] · [[hinh-thai-hoc]]

## ❓ Câu hỏi mở
- Trung vị thích nghi (đổi kích thước cửa sổ theo mật độ nhiễu) tốt hơn ở chỗ nào?

## 📚 Nguồn
- Lecture 6 — Gray-Level Transformations, Histogram, Neighborhood
- Lecture 7 — Image Restoration
