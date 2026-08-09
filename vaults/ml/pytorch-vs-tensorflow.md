---
slug: pytorch-vs-tensorflow
title: PyTorch vs TensorFlow (Chọn framework nào?)
vault: ml
type: concept
branch: F
order: 10
status: learning
tags: [cong-cu, framework, deep-learning, pytorch, tensorflow]
prev: [deep-learning, generative-ai]
created: 2026-07-05
---

# PyTorch vs TensorFlow (Chọn framework nào?)

> Tóm tắt 1 câu: Hai framework deep learning lớn nhất. **PyTorch (Meta)** = Pythonic, chạy tuần tự dễ debug, thống trị nghiên cứu + hệ sinh thái model pretrained (HuggingFace). **TensorFlow (Google)** = mạnh về triển khai (mobile/edge/web), có Keras API thân thiện cho người mới. → **Với mục tiêu dùng lại model có sẵn: học PyTorch.**

**Ngày tạo:** 2026-07-05
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F (Công cụ) · #10 · framework để LÀM DL/GenAI ← cần [[deep-learning]] · [[generative-ai]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #cong-cu #framework #deep-learning #pytorch #tensorflow
**Gắn với định hướng:** [[dinh-huong-hoc]] (90/10 — trọng tâm là dùng lại model pretrained)

---

## 💡 Ý chính
- Cả hai đều là thư viện để **xây / train / chạy mạng nơ-ron** (tensor + autograd + GPU).
- Khác biệt lớn nhất KHÔNG phải tốc độ mà là **hệ sinh thái** và **triết lý code**.
- **Với người muốn dùng lại model có sẵn (data-centric):** 90% thời gian ở trong **HuggingFace** — vốn ưu tiên PyTorch → chọn PyTorch, chỉ cần *nhận biết* TensorFlow.

## ⚖️ Bảng đối chiếu (trạng thái 2026)

| Tiêu chí | **PyTorch** (Meta) | **TensorFlow** (Google) |
|---|---|---|
| Model pretrained | 90%+ model mới ra ở đây; HuggingFace ưu tiên PyTorch | Ít model mới hơn; thường port *từ* PyTorch sang |
| Cảm giác code | Pythonic, **imperative** — chạy từng dòng, dễ `print`/debug | Nặng "framework"; Keras phủ lên trên cho dễ |
| Nghiên cứu | **Thống trị** — gần như mọi paper release code PyTorch | Thị phần giảm |
| Triển khai / mobile / edge | Đang cải thiện (ExecuTorch, TorchServe) | **Mạnh hơn** (TF Lite, TF.js, TF Serving) |
| Độ khó khi học | Dễ nếu đã biết Python & NumPy | `tf.keras` rất dễ cho người mới train từ đầu |

## 🎚️ TensorFlow: High-level vs Low-level (2 tầng API)
> Điểm quan trọng dễ nhầm: "TensorFlow" thực ra là **2 tầng**. Cùng 1 thư viện nhưng dùng ở mức trừu tượng khác nhau.

| | **High-level (Keras)** | **Low-level (TF core / thuần)** |
|---|---|---|
| Là gì | API `tf.keras` — xếp layer như Lego | Thao tác trực tiếp tensor, `tf.GradientTape`, tự viết vòng train |
| Code mẫu | `model.fit(X, y, epochs=10)` | tự viết loop: forward → tính loss → `tape.gradient` → `optimizer.apply_gradients` |
| Kiểm soát | Ít — Keras lo hết vòng lặp train | Toàn quyền — chỉnh từng bước gradient |
| Dùng khi | 95% việc thường ngày, prototype nhanh | Nghiên cứu, kiến trúc lạ, loss/train tùy biến |
| Ví von | Lái xe số tự động | Lái xe số sàn |

```python
# ─ High-level (Keras): ngắn gọn, xếp layer ─
import tensorflow as tf
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(1)
])
model.compile(optimizer='adam', loss='mse')
model.fit(X, y, epochs=10)          # Keras lo toàn bộ vòng train

# ─ Low-level: tự viết vòng train, kiểm soát từng bước ─
with tf.GradientTape() as tape:
    pred = model(X)                 # forward thủ công
    loss = tf.reduce_mean((pred - y) ** 2)
grads = tape.gradient(loss, model.trainable_variables)   # tự tính gradient
optimizer.apply_gradients(zip(grads, model.trainable_variables))
```

> 📌 **PyTorch cũng có 2 tầng tương tự:** thuần `torch.nn` (viết vòng train tay — giống TF low-level) vs **PyTorch Lightning / fastai** (bọc lại như Keras). PyTorch mặc định "low-level một chút" → đó chính là lý do dễ debug và được giới nghiên cứu thích.

## 🎯 Ý nghĩa với công việc của mình (dùng model pretrained)
Vì mục tiêu là **tái sử dụng model** chứ không train từ đầu → phần lớn thời gian ở HuggingFace, hiếm khi đụng `torch.nn` thô:

```python
from transformers import AutoModel, AutoTokenizer
tok = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModel.from_pretrained("bert-base-uncased")   # bên dưới là PyTorch
# quy trình: load → tokenize → chạy inference → (nếu cần) fine-tune
```

## 🧠 Mô hình tư duy (cách nhớ)
- **TensorFlow/Keras** = xếp Lego để *xây và train từ đầu* → hợp con đường mình **chủ động không ưu tiên**.
- **PyTorch** = coi model như object Python bình thường, `print`/kiểm tra được → lý do giới nghiên cứu + hệ pretrained chọn nó.
- **High-level vs low-level** = số tự động vs số sàn: dùng cao cho nhanh, tụt xuống thấp khi cần kiểm soát.

## ✅ Chốt
- **Đầu tư: PyTorch + HuggingFace.** Biết TensorFlow tồn tại + vì sao từng mạnh về triển khai là đủ.
- Hiểu khái niệm **2 tầng API (high/low)** vì cả 2 framework đều có — mặc định dùng high-level, chỉ tụt xuống low-level khi cần loss/train tùy biến.

## 🔗 Liên quan
- [[deep-learning]] — mạng nơ-ron nhiều lớp (thứ hai framework này train)
- [[generative-ai]] — GenAI (GAN/VAE/Diffusion/Transformer) đều dựng trên framework này
- [[dinh-huong-hoc]] — vì sao ưu tiên dùng lại model thay vì train từ đầu
- *(chưa viết)* `[[dl/transfer-learning|transfer-learning]]` · `[[fine-tuning]]` — kỹ thuật dùng lại model pretrained
