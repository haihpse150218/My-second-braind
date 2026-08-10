---
slug: laplacian-va-log
title: Laplacian & LoG
vault: ivp
type: concept
branch: G
order: 3
status: learning
tags: [ivp, bien]
prev: [dao-ham-bac-1-anh]
next: [canny]
related: [lam-sac-net, loc-lam-min]
sources: ["L9 — Edge Detection"]
created: 2026-08-10
---

# Laplacian & LoG

> Tóm tắt 1 câu: đạo hàm bậc 2 định vị **tâm biên** bằng điểm cắt 0, nhưng nhạy nhiễu tới mức **không dùng được một mình** — nên phải gói Gaussian vào cùng, thành LoG.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh G · #3 ← cần [[dao-ham-bac-1-anh]] · → kế tiếp [[canny]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #bien

---

## 💡 Laplacian

$$
\nabla^2 f = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2}
$$

Kernel rời rạc:
```
 0  1  0            1  1  1
 1 −4  1    hoặc    1 −8  1     (bản 8 hướng)
 0  1  0            1  1  1
```

Tổng hệ số `= 0`, và Laplacian là **vô hướng** — khác gradient vốn là vector. Đổi lại nó **đẳng hướng**: xoay ảnh thì kết quả xoay theo, không thiên hướng nào.

Biên nằm ở chỗ Laplacian **đổi dấu** (zero-crossing), không phải chỗ giá trị lớn.

## ⚠️ Hai nhược điểm nặng

**1. Cực kỳ nhạy nhiễu.** Đạo hàm bậc 1 khuếch đại nhiễu; bậc 2 khuếch đại **bình phương lần**. Laplacian trần trên ảnh thật cho ra gần như toàn nhiễu.

**2. Biên đôi (double edge).** Vì hàm đổi dấu, mỗi biên cho **hai vạch** — một dương một âm nằm hai bên. Nhìn ảnh Laplacian thấy mọi biên đều thành cặp đường song song.

→ Vì hai lý do này, **Laplacian gần như không bao giờ dùng đơn lẻ để dò biên**. Nó hữu ích ở chỗ khác: [[lam-sac-net]], nơi biên đôi lại chính là thứ tạo cảm giác sắc nét.

## 💡 LoG — Laplacian of Gaussian

Lời giải: **làm mịn bằng Gaussian trước, rồi mới lấy Laplacian**. Và nhờ tính kết hợp của tích chập, gộp được thành **một kernel duy nhất**:

$$
\text{LoG} = \nabla^2 (G_\sigma * f) = (\nabla^2 G_\sigma) * f
$$

Hình dạng kernel LoG là **"mũ Mexico"** — âm ở tâm, vành dương bao quanh (hoặc ngược dấu).

Lợi ích của việc gộp: chỉ **một lần tích chập** thay vì hai, và kernel tính trước được.

**`σ` là núm điều khiển thang đo:**

| `σ` | Bắt được |
|---|---|
| Nhỏ | Chi tiết mảnh, biên sắc — **nhiễu lọt nhiều hơn** |
| Lớn | Cấu trúc lớn, biên mượt — **bỏ qua chi tiết nhỏ** |

Đây là hiện thân trực tiếp của đánh đổi ở [[bien-anh-la-gi]]. Chạy LoG ở **nhiều `σ`** rồi kết hợp chính là ý tưởng **scale-space**, nền của SIFT.

**DoG** (Difference of Gaussians) — hiệu hai Gaussian khác `σ` — xấp xỉ LoG rất tốt và rẻ hơn nhiều, nên hay được dùng thay.

## ⚠️ Điều dễ nhầm

- **Zero-crossing không phải "giá trị bằng 0".** Vùng phẳng cũng cho `0`. Phải tìm chỗ giá trị **đổi dấu giữa hai pixel kề nhau**, và thường kèm điều kiện độ dốc đủ lớn để loại crossing do nhiễu.
- **LoG cho biên khép kín** (do tính chất của zero-crossing) — nghe hay nhưng thực tế nó **nối cả những chỗ không nên nối**, tạo đường bao quanh cả vùng nhiễu.
- **Vẫn kém [[canny]]** ở độ chính xác định vị và khả năng kiểm soát. LoG/Marr–Hildreth quan trọng về mặt lịch sử và khái niệm hơn là thực dụng.
- **`σ` quan trọng hơn kích thước kernel.** Kernel phải rộng `≈ 6σ`, cắt hẹp hơn là méo hàm.

---

## 🔗 Liên kết
- **Tiền đề:** [[dao-ham-bac-1-anh]] · [[loc-lam-min]]
- **Dẫn tới:** [[canny]]
- **Liên quan:** [[lam-sac-net]] · [[bien-anh-la-gi]]

## ❓ Câu hỏi mở
- Scale-space chạy LoG ở nhiều `σ` — chọn `σ` "đúng" cho một vật thể dựa trên tiêu chí gì?

## 📚 Nguồn
- Lecture 9 — Edge Detection
