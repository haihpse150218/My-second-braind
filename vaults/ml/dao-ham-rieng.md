---
slug: dao-ham-rieng
title: Đạo hàm riêng
vault: ml
type: concept
branch: A
order: 6
status: learning
tags: [toan, giai-tich, nhieu-chieu]
prev: [chain-rule]
next: [gradient]
related: [gradient, dao-ham]
created: 2026-08-10
---

# Đạo hàm riêng

> Tóm tắt 1 câu: đạo hàm theo **một biến**, **giữ nguyên mọi biến còn lại** — cách xử lý hàm nhiều biến bằng cách quy về bài toán một chiều đã biết.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A (Giải tích → Tối ưu) · #6 ← cần [[chain-rule]] · → kế tiếp [[gradient]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #giai-tich #nhieu-chieu

---

## 💡 Ý chính

$$
\frac{\partial f}{\partial x} = \lim_{h \to 0} \frac{f(x+h,\, y) - f(x,\, y)}{h}
$$

So với [[dao-ham]] một chiều, khác đúng một chỗ: **`y` giữ nguyên**, chỉ `x` nhích.

Ký hiệu `∂` (đọc "del" hoặc "đê vòng") thay cho `d` để nhắc rằng hàm còn biến khác.

**Cách tính thực tế:** coi mọi biến khác là **hằng số**, rồi lấy đạo hàm bình thường.

$$
f(x,y) = x^2 y + 3y^2
\;\Rightarrow\;
\frac{\partial f}{\partial x} = 2xy, \qquad
\frac{\partial f}{\partial y} = x^2 + 6y
$$

Khi tính `∂f/∂x`, số hạng `3y²` là **hằng số** nên đạo hàm bằng 0.

## 🧩 Trực giác

Bề mặt `f(x,y)` là một quả đồi. Đứng tại một điểm:

| Đạo hàm riêng | Nghĩa |
|---|---|
| `∂f/∂x` | Độ dốc nếu đi **theo hướng đông–tây** |
| `∂f/∂y` | Độ dốc nếu đi **theo hướng bắc–nam** |

Mỗi đạo hàm riêng là **độ dốc của một lát cắt** — cắt quả đồi bằng một mặt phẳng song song với trục đó rồi nhìn đường cong nhận được. Đường cong đó là hàm một biến, và bài toán quay về [[dao-ham]] đã biết.

## ⚙️ Vì sao ML cần nó

Model thật không có 2 tham số mà có **hàng nghìn tới hàng tỉ**:

$$
L(w_1, w_2, \ldots, w_n)
$$

Câu hỏi *"chỉnh `w₅` lên một chút thì lỗi thay đổi bao nhiêu?"* chính là `∂L/∂w₅` — và nó **không phụ thuộc** vào việc các `w` khác đang là bao nhiêu **trong lúc lấy đạo hàm** (chúng bị coi là hằng).

Gom tất cả đạo hàm riêng lại thành vector thì được **[[gradient]]**:
$$
\nabla L = \left[\frac{\partial L}{\partial w_1}, \frac{\partial L}{\partial w_2}, \ldots, \frac{\partial L}{\partial w_n}\right]
$$

Và [[gradient-descent]] cập nhật **từng tham số một cách độc lập**, mỗi cái theo đạo hàm riêng của nó:
$$
w_i \leftarrow w_i - \eta \frac{\partial L}{\partial w_i}
$$

> 📌 Đây là điều làm huấn luyện mạng tỉ tham số khả thi: **không cần giải hệ phương trình**, chỉ cần biết mỗi tham số nên nhích theo hướng nào. Mỗi tham số tự lo phần của mình.

## ⚙️ Chain rule nhiều biến — tổng theo các đường đi

Khi một biến ảnh hưởng tới đầu ra qua **nhiều đường**, [[chain-rule]] chuyển thành **tổng**:

$$
\frac{\partial L}{\partial x} = \sum_{k} \frac{\partial L}{\partial u_k}\cdot\frac{\partial u_k}{\partial x}
$$

Trong mạng nơ-ron, một neuron ở tầng giữa nối tới **nhiều** neuron tầng sau → gradient của nó là **tổng gradient dội về từ tất cả các nhánh**. Đây là lý do backprop phải cộng dồn chứ không chỉ nhân.

## ⚠️ Điều dễ nhầm

- **`∂f/∂x` vẫn là một hàm của cả `x` và `y`.** Ví dụ `∂f/∂x = 2xy` vẫn chứa `y`. "Giữ `y` cố định" chỉ đúng **trong lúc lấy đạo hàm**, không nghĩa là kết quả hết phụ thuộc `y`.
- **Đạo hàm riêng không cho biết hướng dốc nhất.** Nó chỉ cho độ dốc theo **trục toạ độ**. Hướng dốc nhất là vector [[gradient]] — cần gom cả bộ mới biết.
- **Đạo hàm riêng bằng 0 hết ≠ cực tiểu.** Có thể là cực đại, hoặc **điểm yên ngựa** (saddle point) — dốc lên theo trục này, dốc xuống theo trục kia. Trong không gian nhiều chiều, điểm yên ngựa **phổ biến hơn hẳn** cực tiểu địa phương, và đó mới là trở ngại chính khi tối ưu mạng sâu. Xem [[toi-uu-loi]].

---

## 🔗 Liên kết
- **Tiền đề:** [[chain-rule]] · [[dao-ham]]
- **Dẫn tới:** [[gradient]] · [[gradient-descent]]
- **Liên quan:** [[toi-uu-hoa]] · [[toi-uu-loi]]
- **Liên môn:** [[dl/backpropagation]] — gradient của một neuron là **tổng** các nhánh dội về, đúng dạng chain rule nhiều biến.

## ❓ Câu hỏi mở
- Điểm yên ngựa nhiều hơn cực tiểu địa phương trong chiều cao — vì sao SGD vẫn thoát ra được?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Giải tích
