---
slug: neural-network
title: Neural Network / MLP (Mạng Nơ-ron)
vault: ml
type: concept
branch: F
order: 7
status: learning
tags: [deep-learning, neural-network, mlp, backpropagation, supervised]
prev: [logistic-regression, gradient-descent, loss-function, dao-ham]
sources: [L8_NeuralNetwork.pdf]
created: 2026-07-05
---

# Neural Network / MLP (Mạng Nơ-ron)

> Tóm tắt 1 câu: **1 neuron = 1 Logistic Regression thu nhỏ.** Xếp nhiều neuron song song + nhiều tầng nối tiếp → mạng học được **ranh giới phi tuyến** (giải được XOR mà 1 LR chịu thua). Học bằng **Forward Pass** (tính ŷ) → **Loss** (đo sai) → **Backpropagation** (chain rule tính gradient) → **Gradient Descent** (cập nhật W, b).

**Ngày tạo:** 2026-07-05
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F (DL) · #7 · chi tiết hoá [[deep-learning]] ← cần [[logistic-regression]] · [[gradient-descent]] · [[loss-function]] · [[dao-ham]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #deep-learning #neural-network #mlp #backpropagation #supervised
**Nguồn slide:** `L8_NeuralNetwork.pdf` — TS. Cao Tiến Dũng

---

## 💡 Ý chính — "Nhiều Logistic Regression hợp tác"
- **Giới hạn của 1 LR:** chỉ vẽ được **1 đường thẳng** phân tách → chết với **XOR** (4 điểm, không đường thẳng nào tách nổi).

  | x₁ | x₂ | y |
  |----|----|---|
  | 0 | 0 | 0 |
  | 0 | 1 | 1 |
  | 1 | 0 | 1 |
  | 1 | 1 | 0 |

- **Ý tưởng đột phá:** dùng **nhiều LR cùng lúc**, mỗi cái học 1 "góc nhìn" (ranh giới) → kết hợp lại → hiểu cấu trúc phức tạp. 3 neuron = 3 "chuyên gia" tách trên/dưới, trái/phải, góc còn lại → ghép được XOR.
- **Mỗi neuron = 1 Logistic Regression** → $a = \sigma(w^Tx + b)$.

## 🔌 Neuron nhân tạo — 2 bước
1. **Linear combination:** $z = w_1x_1 + \dots + w_nx_n + b = w^Tx + b$
2. **Activation:** $a = \sigma(z)$ → đưa vào phi tuyến

## ⚡ Activation Function — vì sao BẮT BUỘC có (2 vai trò)
- **Vai trò 1 — Tạo phi tuyến:** không có σ thì $W^{[2]}(W^{[1]}x+b^{[1]})+b^{[2]} = W'x+b'$ → **100 tầng cũng chỉ = 1 LR**. σ là thứ khiến chồng tầng có ý nghĩa.
- **Vai trò 2 — On/Off:** $z \in (-\infty, +\infty)$ → σ quyết định neuron "lên tiếng" hay "im lặng" (kiểm soát miền giá trị).

| Hàm | Công thức | Range | Dùng ở đâu | Điểm yếu |
|-----|-----------|-------|-----------|----------|
| **Sigmoid** | $1/(1+e^{-z})$ | (0,1) | output nhị phân | vanishing gradient khi \|z\| lớn |
| **Tanh** | $(e^z-e^{-z})/(e^z+e^{-z})$ | (-1,1) | hidden (mạng cũ) | vẫn vanishing; nhưng zero-centered tốt hơn sigmoid |
| **ReLU** ★ | $\max(0,z)$ | [0,∞) | **hidden — mặc định nay** | Dying ReLU (z<0 mãi → chết) |
| **Softmax** | $e^{z_i}/\sum e^{z_j}$ | (0,1), tổng=1 | output đa lớp | chỉ ở output |

> ReLU On/Off: z=−2.3 → 0 (im lặng), z=+1.7 → 1.7 (lên tiếng nguyên giá trị). Mỗi input kích hoạt 1 **tập con neuron khác nhau** → mạng học "chuyên gia" cho từng vùng dữ liệu.

## 🏗️ Kiến trúc MLP — từ Shallow đến Deep
| Ký hiệu | Ý nghĩa |
|---------|---------|
| $L$ | số lớp |
| $n^{[l]}$ | số neuron lớp $l$ |
| $W^{[l]}, b^{[l]}$ | weight & bias lớp $l$ |
| $a^{[l]}$ | activation lớp $l$; $a^{[0]}=x$ |

1. **1 neuron (LR):** 1 đường thẳng (linearly separable)
2. **Shallow NN (1 hidden):** ranh giới cong — **Universal Approximation Theorem** (Cybenko 1989): 1 hidden layer đủ neuron xấp xỉ **bất kỳ hàm liên tục nào**.
3. **Deep NN (nhiều tầng):** biểu diễn **phân cấp** (hierarchical) — tầng nông học cạnh/góc, tầng sâu ghép thành khái niệm.

## ➡️ Forward Pass — "chỉ tính, chưa học"
$$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]} \qquad a^{[l]} = \sigma(z^{[l]})$$
Luồng dữ liệu input → output. **Lưu cache $(z^{[l]}, a^{[l]})$** để Backprop dùng lại.

**Kích thước ma trận (kỹ năng debug số 1):**
- $W^{[l]}$: $(n^{[l]}, n^{[l-1]})$ — *hàng = neuron lớp này, cột = neuron lớp trước*
- $b^{[l]}$: $(n^{[l]}, 1)$
- $Z^{[l]}, A^{[l]}$: $(n^{[l]}, m)$ với $m$ = batch size (vectorized)
> Quy tắc nhớ: $W^{[l]} = (n^{[l]}, n^{[l-1]})$. **In shape từng tensor** trước khi train!

## 📉 Loss Function — đo "mức độ sai" (mục tiêu: minimize L)
| Loss | Bài toán | Công thức | Ghép với |
|------|----------|-----------|----------|
| **MSE** | Regression | $\frac1m\sum(y-\hat y)^2$ | — (nhạy outlier) |
| **BCE** | Nhị phân | $-\frac1m\sum[y\log\hat y+(1-y)\log(1-\hat y)]$ | Sigmoid |
| **CCE** | Đa lớp | $-\frac1m\sum_i\sum_k y_k\log\hat y_k$ | Softmax + one-hot |
> Training = tìm $W, b$ để minimize Loss. Xem [[loss-function]].

## ⛰️ Gradient Descent & Optimizers
$$\theta \leftarrow \theta - \eta \cdot \nabla_\theta L$$
- **η (learning rate):** quá nhỏ → chậm/kẹt local min; quá lớn → dao động, loss nổ. Thường **[0.001, 0.1]**. Chi tiết [[gradient-descent]].
- **Biến thể:** Batch GD (chính xác, chậm) · SGD (1 mẫu, nhiễu) · **Mini-batch ★** (32–256, lũy thừa 2 cho GPU) = chuẩn thực tế.
- **Optimizers nâng cao:** Momentum (quán tính) · RMSprop (adaptive LR) · **Adam ★** (Momentum + RMSprop = mặc định) · LR Schedule (giảm η theo epoch).

## 🔁 Backpropagation — trái tim của việc học
**Vấn đề:** để cập nhật $W^{[l]}$ cần $\partial L/\partial W^{[l]}$, nhưng $W^{[l]}$ **không ảnh hưởng trực tiếp** tới L. Chuỗi phụ thuộc:
$$W^{[l]} \to z^{[l]} \to a^{[l]} \to \dots \to a^{[L]} \to L$$
**Giải pháp — Chain Rule** (nhân chuỗi đạo hàm dọc đường):
$$\frac{\partial L}{\partial W^{[l]}} = \frac{\partial L}{\partial a^{[l]}} \cdot \frac{\partial a^{[l]}}{\partial z^{[l]}} \cdot \frac{\partial z^{[l]}}{\partial W^{[l]}}$$
> Ví von: "dây chuyền truyền trách nhiệm gây lỗi" ngược từ output về input. **1 forward + 1 backward** tính gradient cho TẤT CẢ tham số.

**4 phương trình cốt lõi** (error signal $\delta^{[l]} = \partial L/\partial z^{[l]}$):

| # | Công thức | Ý nghĩa |
|---|-----------|---------|
| **BP1** | $\delta^{[L]} = \nabla_a L \odot \sigma'(z^{[L]})$ | error tại output |
| **BP2** | $\delta^{[l]} = (W^{[l+1]})^T\delta^{[l+1]} \odot \sigma'(z^{[l]})$ | truyền ngược error |
| **BP3** | $\partial L/\partial W^{[l]} = \delta^{[l]}(a^{[l-1]})^T$ | gradient weight |
| **BP4** | $\partial L/\partial b^{[l]} = \delta^{[l]}$ | gradient bias |

($\odot$ = nhân element-wise / Hadamard). Update: $W \mathrel{-}= \eta\,\partial L/\partial W$, $b \mathrel{-}= \eta\,\partial L/\partial b$.

## ⚠️ Vanishing & Exploding Gradient
- **Vanishing:** Sigmoid/Tanh có $\sigma' \le 0.25$ → nhân qua $L$ tầng: $(0.25)^L \to 0$ → **lớp đầu không học được gì**.
  - **Fix:** ReLU · Batch Normalization · **Residual connection (ResNet)** · khởi tạo He/Xavier.
- **Exploding:** gradient tăng cấp số nhân → weights → ∞, Loss = NaN → training sụp đổ.
  - **Fix:** Gradient Clipping · khởi tạo weights nhỏ · BatchNorm · giảm η.
> 🔗 Đây chính là lý do **ResNet** ra đời (He 2016): skip connection $y = F(x)+x$ cho gradient đi thẳng qua → train được mạng 100+ tầng. Xem [[pytorch-vs-tensorflow]] (dùng lại các model sâu này).

## 🛠️ Chống Overfitting & khởi tạo (thực tế)
- **Overfitting:** train loss ↓ nhưng val loss ↑ → boundary quá phức tạp, học cả noise.
  - **Fix:** L2 reg (luôn thử trước) · **Dropout** (tắt ngẫu nhiên p% neuron) · Early Stopping · Data Augmentation.
  - 📌 **Quy trình:** *overfit trước* (chứng minh mạng đủ capacity) → *rồi mới regularize*. Đừng regularize quá sớm! (liên hệ [[bias-variance]], [[regularization]])
- **Weight Init:** Zero init = tất cả neuron giống nhau (hỏng) → cần random để **phá đối xứng**. Xavier/Glorot (cho Sigmoid/Tanh) · **He** (cho ReLU).
- **Batch Normalization:** chuẩn hoá $z^{[l]}$ theo mini-batch → giảm internal covariate shift, cho phép η lớn hơn, regularize nhẹ. Thêm sau Dense, trước Activation.

## 🔄 Recap pipeline huấn luyện
Khởi tạo W,b → **Forward** (→ ŷ) → **Loss** L(ŷ,y) → **Backward** (∂L/∂W, ∂L/∂b) → **GD Update** → *(hội tụ? → dừng)*.
✅ Checklist: shape ma trận đúng · loss giảm sau epoch 1 · không NaN/Inf · gradient check OK · overfit trước rồi regularize.

## 🌉 Cầu nối — MLP là nền của TẤT CẢ
Dù là **CNN** (chia sẻ trọng số theo không gian — ảnh), **RNN/LSTM/GRU** (chuỗi, có "bộ nhớ"), **Transformer** (attention — ChatGPT/BERT), hay **GNN** (đồ thị) — **tất cả đều học bằng Backprop + Gradient Descent**. Nắm vững MLP là bắt buộc.

## 🧠 Mô hình tư duy (cách nhớ)
- **Neuron = LR nhỏ; NN = nhiều LR hợp tác** qua nhiều tầng.
- **Activation = thứ khiến chồng tầng có nghĩa** (bỏ đi → 100 tầng = 1 LR).
- **Forward tính, Backward học:** backprop = chain rule truyền lỗi ngược, 1 forward + 1 backward là đủ cho mọi tham số.
- **Mạng càng sâu càng khó train** (vanishing gradient) → ReLU + He init + BatchNorm + ResNet là các "liều thuốc".

## 🔗 Liên quan
- [[logistic-regression]] — 1 neuron chính là nó · [[softmax]] — activation output đa lớp
- [[gradient-descent]] · [[loss-function]] · [[dao-ham]] — nền toán để hiểu train
- [[deep-learning]] — note tổng quan (L2); note này là bản chi tiết cơ chế
- [[bias-variance]] · [[regularization]] — khung chống overfit
- [[pytorch-vs-tensorflow]] — framework để LÀM; [[dl/resnet|resnet50]] *(chưa viết)* — kiến trúc dùng skip connection
- *(chưa viết)* `[[dl/vi-sao-can-cnn|cnn]]` · `[[dl/transformer-block|transformer]]` · `[[dl/transfer-learning|transfer-learning]]`
