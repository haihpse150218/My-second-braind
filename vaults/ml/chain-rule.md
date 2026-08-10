---
slug: chain-rule
title: Quy tắc dây chuyền (Chain Rule)
vault: ml
type: concept
branch: A
order: 5
status: learning
tags: [toan, giai-tich, nen-tang]
prev: [dao-ham]
next: [dao-ham-rieng]
related: [gradient, dao-ham]
created: 2026-08-10
---

# Quy tắc dây chuyền (Chain Rule)

> Tóm tắt 1 câu: đạo hàm của **hàm hợp** = **tích** các đạo hàm dọc chuỗi — và đây là toàn bộ cơ sở toán học của backpropagation.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A (Giải tích → Tối ưu) · #5 ← cần [[dao-ham]] · → kế tiếp [[dao-ham-rieng]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #giai-tich #nen-tang

---

## 💡 Ý chính

$$
\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}
$$

Với `y = f(u)` và `u = g(x)`, tức `y = f(g(x))`.

Dạng nhiều tầng — nhân dài ra:
$$
\frac{dy}{dx} = \frac{dy}{du_3}\cdot\frac{du_3}{du_2}\cdot\frac{du_2}{du_1}\cdot\frac{du_1}{dx}
$$

Mẹo nhớ: các `du` **"triệt tiêu"** như phân số. Không phải chứng minh chặt, nhưng nhớ đúng.

## 🧩 Trực giác — dây chuyền bánh răng

Ba bánh răng nối nhau:
- Bánh 1 quay 1 vòng → bánh 2 quay **3** vòng.
- Bánh 2 quay 1 vòng → bánh 3 quay **2** vòng.
- ⇒ Bánh 1 quay 1 vòng → bánh 3 quay **3 × 2 = 6** vòng.

Tốc độ truyền qua chuỗi thì **nhân** với nhau. Đạo hàm là "tốc độ thay đổi", nên nó cũng nhân.

## ⚙️ Vì sao đây là note quan trọng nhất nhánh A

Một mạng nơ-ron **chính là một hàm hợp khổng lồ**:

$$
L = \text{Loss}\big(f_n(f_{n-1}(\cdots f_1(x; w_1) \cdots; w_{n-1}); w_n),\; y\big)
$$

Muốn cập nhật trọng số `w₁` ở tầng **đầu tiên**, cần `∂L/∂w₁` — nhưng `w₁` cách hàm mất mát tận `n` tầng. Chain rule cho phép tính nó bằng cách **nhân các đạo hàm cục bộ dọc đường về**:

$$
\frac{\partial L}{\partial w_1} = \frac{\partial L}{\partial a_n}\cdot\frac{\partial a_n}{\partial a_{n-1}}\cdots\frac{\partial a_2}{\partial a_1}\cdot\frac{\partial a_1}{\partial w_1}
$$

> 📌 **Đó chính là backpropagation.** "Lan truyền ngược" không phải một thuật toán mới — nó là chain rule áp dụng có tổ chức, tính từ cuối về đầu và **lưu lại kết quả trung gian** để không tính lại. Xem [[../vaults/dl/backpropagation|dl/backpropagation]] và [[neural-network]].

**Ví dụ nhỏ** với `L = (σ(wx) − y)²`:
$$
\frac{\partial L}{\partial w} = \underbrace{2(σ(wx)-y)}_{\text{đạo hàm loss}} \cdot \underbrace{σ'(wx)}_{\text{đạo hàm kích hoạt}} \cdot \underbrace{x}_{\text{đạo hàm tuyến tính}}
$$
Ba thừa số, mỗi thừa số ứng với một mắt xích.

## ⚠️ Hệ quả: vanishing & exploding gradient

Nhân `n` số với nhau thì:

| Mỗi đạo hàm cục bộ | Sau `n` tầng | Tên gọi |
|---|---|---|
| `< 1` (vd 0,25 của sigmoid) | `0,25^n → 0` | **Vanishing gradient** |
| `> 1` | `→ ∞` | **Exploding gradient** |

Sigmoid có đạo hàm tối đa `0,25`. Qua 10 tầng: `0,25^10 ≈ 10^{-6}` — tầng đầu **gần như không học được gì**.

Đây là lý do trực tiếp của: **ReLU** (đạo hàm bằng 1 ở nhánh dương), **ResNet** (kết nối tắt cho gradient đi thẳng), **LSTM** (cổng giữ gradient), và **gradient clipping**. Tất cả đều là cách chống lại phép nhân dài này.

Xem [[../vaults/dl/vanishing-gradient|dl/vanishing-gradient]] · [[../vaults/dl/resnet|dl/resnet]] · [[../vaults/dl/exploding-gradient-clipnorm|dl/exploding-gradient-clipnorm]].

## ⚠️ Điều dễ nhầm

- **Thứ tự nhân không quan trọng** (nhân giao hoán), nhưng **thứ tự TÍNH thì có**. Tính từ cuối về đầu (reverse-mode) rẻ hơn nhiều so với từ đầu về cuối khi đầu ra là **một số** còn đầu vào là **hàng triệu tham số** — đúng tình huống của ML.
- **Phải lưu giá trị forward pass.** Đạo hàm cục bộ ở mỗi tầng phụ thuộc giá trị đã tính lúc đi xuôi. Đó là lý do train tốn bộ nhớ hơn inference rất nhiều.
- Với hàm nhiều biến, chain rule có dạng **tổng các đường đi** chứ không chỉ một tích — xem [[dao-ham-rieng]].

---

## 🔗 Liên kết
- **Tiền đề:** [[dao-ham]] · [[ham-so]]
- **Dẫn tới:** [[dao-ham-rieng]] · [[gradient]]
- **Liên quan:** [[neural-network]] · [[deep-learning]] · [[huan-luyen-vs-suy-luan]]
- **Liên môn:** [[dl/backpropagation]] — backprop **chính là** chain rule có tổ chức. · [[dl/vanishing-gradient]]

## ❓ Câu hỏi mở
- Reverse-mode rẻ khi "nhiều vào, một ra". Có bài toán ML nào ngược lại (một vào, nhiều ra) khiến forward-mode tốt hơn không?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Giải tích
- `L8_NeuralNetwork.pdf` — backpropagation
