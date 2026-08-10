---
slug: gioi-han
title: Giới hạn — nền của đạo hàm
vault: ml
type: concept
branch: A
order: 3
status: learning
tags: [toan, giai-tich, nen-tang]
prev: [ham-so]
next: [dao-ham]
related: [dao-ham]
created: 2026-08-10
---

# Giới hạn — nền của đạo hàm

> Tóm tắt 1 câu: giá trị mà hàm **tiến tới** khi đầu vào tiến tới một điểm — công cụ cho phép nói về "nhích một lượng cực nhỏ" mà không phải chia cho 0.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A (Giải tích → Tối ưu) · #3 ← cần [[ham-so]] · → kế tiếp [[dao-ham]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #giai-tich #nen-tang

---

## 💡 Ý chính

$$
\lim_{x \to a} f(x) = L
$$

Đọc là: khi `x` **tiến tới** `a` (nhưng **không bằng** `a`), thì `f(x)` tiến tới `L`.

Chữ quan trọng nhất là **"không bằng"**. Giới hạn nói về **xu hướng khi đến gần**, không quan tâm giá trị tại đúng điểm đó — thậm chí hàm có thể **không xác định** tại `a`.

## 🧩 Vì sao ML cần khái niệm này

Định nghĩa đạo hàm:

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$

Nếu **thay thẳng `h = 0`** thì ra `0/0` — vô nghĩa. Nhưng nếu hỏi *"khi `h` **tiến tới** 0 thì tỉ số này tiến tới đâu"* thì có câu trả lời rõ ràng.

**Ví dụ cụ thể** với `f(x) = x²` tại `x = 3`:

| `h` | `[f(3+h) − f(3)] / h` |
|---|---|
| 1 | 7 |
| 0,1 | 6,1 |
| 0,01 | 6,01 |
| 0,001 | 6,001 |
| → 0 | → **6** |

Tỉ số **không bao giờ** bằng 6 với `h` khác 0, nhưng tiến tới 6. Đó chính là `f'(3) = 6`.

> 📌 Giới hạn là thứ cho phép nói về "tốc độ thay đổi **tại một điểm**" — mà điểm thì không có bề rộng để mà thay đổi. Không có giới hạn thì không có [[dao-ham]], không có [[gradient]], không có [[gradient-descent]], và không huấn luyện được model nào.

## ⚙️ Ba tình huống giới hạn hay gặp trong ML

**1. `x → ∞` — hành vi ở đuôi.**
$$
\lim_{x \to \infty} \frac{1}{1+e^{-x}} = 1, \qquad \lim_{x \to -\infty} \frac{1}{1+e^{-x}} = 0
$$
Đây là lý do sigmoid dùng được làm xác suất — nó **bị chặn** trong `(0,1)` dù đầu vào lớn tới đâu. Xem [[logistic-regression]].

**2. Đạo hàm tiến về 0 — vanishing gradient.** Sigmoid có `σ'(x) → 0` khi `|x|` lớn. Nhân nhiều đạo hàm nhỏ qua nhiều tầng ([[chain-rule]]) → gradient tiêu biến, mạng ngừng học. Đây là lý do ReLU thay sigmoid trong mạng sâu — xem [[../vaults/dl/vanishing-gradient|dl/vanishing-gradient]].

**3. Hội tụ của thuật toán.** "Gradient descent hội tụ" nghĩa là dãy `w₁, w₂, w₃, ...` có giới hạn. Không hội tụ = learning rate quá lớn, xem [[learning-rate]].

## ⚠️ Điều dễ nhầm

- **Giới hạn tồn tại ≠ hàm liên tục tại đó.** Hàm có thể có giới hạn `L` tại `a` nhưng `f(a)` lại bằng số khác, hoặc không xác định.
- **Giới hạn trái ≠ giới hạn phải thì giới hạn KHÔNG tồn tại.** Hàm `ReLU` tại `x=0` có giới hạn (bằng 0) nhưng **đạo hàm** thì trái `=0`, phải `=1` → không khả vi tại 0. Thực tế các thư viện chọn bừa một giá trị (thường 0) và điều đó không gây vấn đề gì.
- **Trong lập trình không tính giới hạn thật.** Thư viện dùng công thức đạo hàm đã có sẵn (autodiff), không xấp xỉ bằng `h` nhỏ — vì `h` quá nhỏ gây sai số làm tròn nghiêm trọng.

---

## 🔗 Liên kết
- **Tiền đề:** [[ham-so]]
- **Dẫn tới:** [[dao-ham]]
- **Liên quan:** [[chain-rule]] · [[learning-rate]]
- **Liên môn:** [[dl/vanishing-gradient]] — gradient tiến về 0 là một bài toán giới hạn có hậu quả rất thực tế.

## ❓ Câu hỏi mở
- ReLU không khả vi tại 0 nhưng vẫn train tốt — vì sao điều đó không gây vấn đề trong thực tế?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Giải tích
