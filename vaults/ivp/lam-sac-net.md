---
slug: lam-sac-net
title: Làm sắc nét (thông cao)
vault: ivp
type: concept
branch: E
order: 4
status: learning
tags: [ivp, loc]
prev: [loc-trung-vi]
next: [mo-hinh-suy-hao]
related: [tich-chap-2d, laplacian-va-log]
sources: ["L6 — Gray-Level Transformations, Histogram, Neighborhood"]
created: 2026-08-10
---

# Làm sắc nét (thông cao)

> Tóm tắt 1 câu: **ảnh gốc + phần chi tiết** — và phần chi tiết lấy được bằng cách lấy ảnh gốc **trừ đi bản mờ của chính nó**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #4 ← cần [[loc-trung-vi]] · → kế tiếp [[mo-hinh-suy-hao]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #loc

---

## 💡 Ý chính — unsharp masking

Cái tên nghe ngược đời ("mặt nạ **không sắc nét**") nhưng mô tả đúng quy trình:

$$
g_{\text{sharp}} = f + k\,(f - f_{\text{blur}})
$$

```
1. Làm mờ ảnh                 → f_blur      (giữ lại phần tần số THẤP)
2. Lấy gốc trừ bản mờ         → mask = f − f_blur   (chính là phần tần số CAO: cạnh, chi tiết)
3. Cộng mask trở lại, nhân k  → chi tiết được nhấn mạnh
```

| `k` | Tên gọi | Kết quả |
|---|---|---|
| `k = 1` | Unsharp masking | Nét vừa phải |
| `k > 1` | **High-boost filtering** | Nét mạnh |
| `k` quá lớn | — | ⚠️ **Quầng sáng (halo)** quanh cạnh, nhiễu nổi rõ |

## 🧩 Trực giác

Bản mờ chứa **"phần thô"** của ảnh. Lấy ảnh gốc trừ đi phần thô thì còn lại đúng **"phần tinh"** — cạnh, kết cấu, chi tiết nhỏ. Cộng phần tinh trở lại là nhấn mạnh nó lên.

Nói theo miền tần số: làm mờ = giữ tần số thấp; `f − f_blur` = **giữ tần số cao**; cộng lại = khuếch đại tần số cao. Đây là lý do gọi là **lọc thông cao**.

## 🔢 Kernel Laplacian — cách làm trực tiếp

Không cần làm mờ rồi trừ, có thể dùng thẳng một kernel:

```
 0  −1   0          −1  −1  −1
−1   5  −1    hoặc  −1   9  −1
 0  −1   0          −1  −1  −1
```

Đọc kernel này: **tâm dương lớn, xung quanh âm, tổng bằng 1**.
- Vùng phẳng: phần âm triệt tiêu phần dương → giá trị **giữ nguyên**.
- Vùng có cạnh: hai bên chênh lệch → phần âm không triệt hết → giá trị **bị đẩy xa nhau hơn** → cạnh sắc hơn.

Kernel này chính là `1 + (−∇²)`, tức ảnh gốc cộng với âm của [[laplacian-va-log|Laplacian]].

⚠️ Kernel với tổng `= 0` (bỏ số 1 ở tâm) thì **không** làm sắc nét — nó cho ra **ảnh cạnh** trên nền đen. Khác biệt chỉ nằm ở con số ở tâm.

## ⚠️ Điều dễ nhầm — quan trọng nhất

> 🚨 **Làm sắc nét KHÔNG khôi phục chi tiết đã mất.** Nó chỉ **tăng tương phản cục bộ tại các cạnh còn tồn tại**.

Ảnh chụp out nét thì làm sắc nét cách nào cũng không lấy lại được nét — chỉ làm những cạnh mờ sẵn có trông "gắt" hơn. Muốn thật sự khử mờ thì phải mô hình hoá hàm gây mờ và đảo nó — đó là [[wiener-filter]], việc khác hẳn.

Các lỗi khác:

- **Khuếch đại nhiễu là chắc chắn.** Nhiễu là tần số cao, mà bộ lọc này nhấn mạnh tần số cao. Ảnh nhiễu thì phải [[loc-lam-min]] trước, nếu không sẽ "làm nét nhiễu".
- **Halo/overshoot.** `k` lớn tạo viền sáng và viền tối kèm hai bên mỗi cạnh — dấu hiệu nhận biết ảnh bị làm nét quá tay.
- **Tràn số.** Kết quả dễ vượt `[0,255]` cả hai phía, xem [[tran-so-anh]].

---

## 🔗 Liên kết
- **Tiền đề:** [[loc-lam-min]] · [[tich-chap-2d]]
- **Dẫn tới:** [[mo-hinh-suy-hao]]
- **Liên quan:** [[laplacian-va-log]] · [[loc-tan-so]] · [[wiener-filter]]

## ❓ Câu hỏi mở
- Bao nhiêu là "nét vừa đủ"? Có chỉ số định lượng nào thay cho việc nhìn bằng mắt không?

## 📚 Nguồn
- Lecture 6 — Gray-Level Transformations, Histogram, Neighborhood
