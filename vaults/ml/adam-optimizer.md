---
slug: adam-optimizer
title: Adam & Momentum
vault: ml
type: concept
branch: A
order: 11
status: learning
tags: [toan, toi-uu-hoa, huan-luyen]
prev: [learning-rate]
next: [loss-function]
related: [sgd, learning-rate]
created: 2026-08-10
---

# Adam & Momentum

> Tóm tắt 1 câu: cộng thêm **quán tính** và **bước riêng cho từng tham số** vào gradient descent — lựa chọn mặc định khi không biết chọn gì.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A (Giải tích → Tối ưu) · #11 ← cần [[learning-rate]] · → kế tiếp [[loss-function]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #toi-uu-hoa #huan-luyen

---

## 💡 Hai ý tưởng ghép lại

**1. Momentum — quán tính.**
$$
v_t = \beta_1 v_{t-1} + (1-\beta_1)\nabla L, \qquad w \leftarrow w - \eta\, v_t
$$

Thay vì đi theo gradient **hiện tại**, đi theo **trung bình trượt** của các gradient gần đây.

Trực giác: **quả bóng lăn xuống dốc**. Nó không đổi hướng đột ngột theo từng mấp mô mà giữ đà. Kết quả:
- **Giảm dao động** ở thung lũng hẹp (hai vách dốc làm gradient đổi hướng liên tục, momentum triệt tiêu chúng).
- **Vượt qua** cực tiểu địa phương nông và vùng phẳng nhờ đà.

**2. Bước thích nghi (RMSProp) — mỗi tham số một bước riêng.**
$$
s_t = \beta_2 s_{t-1} + (1-\beta_2)(\nabla L)^2, \qquad w \leftarrow w - \frac{\eta}{\sqrt{s_t}+\epsilon}\nabla L
$$

Chia cho **căn của trung bình bình phương gradient**:
- Tham số có gradient **lớn liên tục** → mẫu số lớn → **bước ngắn lại**.
- Tham số có gradient **nhỏ/hiếm** → mẫu số nhỏ → **bước dài ra**.

Rất hữu ích với đặc trưng thưa (sparse) — từ hiếm trong NLP vẫn được cập nhật đủ mạnh.

**Adam = Momentum + RMSProp**, cộng thêm **hiệu chỉnh chệch** (bias correction) cho vài bước đầu, khi `v` và `s` còn khởi tạo bằng 0 nên bị lệch về 0.

## ⚙️ Siêu tham số

| Tham số | Mặc định | Vai trò |
|---|---|---|
| `η` | `1e-3` | [[learning-rate]] |
| `β₁` | `0,9` | Độ nhớ của momentum |
| `β₂` | `0,999` | Độ nhớ của thang bước |
| `ε` | `1e-8` | Chống chia cho 0 |

> 📌 Ba tham số sau **gần như không bao giờ cần chỉnh**. Điều đó làm Adam rất tiện: chỉ còn một núm `η`, và nó cũng bớt nhạy hơn so với SGD thuần.

## ⚙️ Adam vs SGD+momentum — chọn cái nào

| | **Adam** | **SGD + momentum** |
|---|---|---|
| Hội tụ ban đầu | **Nhanh hơn** | Chậm hơn |
| Cần tune `η` | Ít nhạy | **Rất nhạy** |
| Tổng quát hoá cuối cùng | Thường **hơi kém hơn** | Thường **tốt hơn** |
| Dùng khi | Prototype, NLP, Transformer, đa số trường hợp | Thị giác máy tính, khi cần vắt kiệt hiệu năng |

Nghịch lý đáng nhớ: **Adam về đích nhanh hơn nhưng SGD về đích tốt hơn.** Nhiều kết quả SOTA trong thị giác vẫn dùng SGD + momentum + lịch cosine. Có cách dung hoà: train bằng Adam rồi **đổi sang SGD** ở giai đoạn cuối.

**AdamW** là bản sửa lỗi của Adam về cách áp weight decay — nên dùng AdamW thay Adam khi có [[regularization]] L2. Đây là mặc định hiện nay cho Transformer.

## ⚠️ Điều dễ nhầm

- **Adam không bỏ được việc chỉnh `η`.** Nó chỉ bớt nhạy, không miễn nhiễm. `η = 1` vẫn hỏng.
- **Adam tốn bộ nhớ gấp 3.** Phải lưu `v` và `s` cho **mỗi** tham số → model 1 tỉ tham số cần chỗ cho 3 tỉ số. Đây là ràng buộc thật khi train model lớn.
- **Không phải "optimizer tốt hơn" là luôn nên dùng.** Nếu train đã ổn định với SGD thì đổi sang Adam chưa chắc cải thiện gì.
- Momentum **không** làm giảm gradient — nó làm mượt **hướng đi**, khác với gradient clipping vốn cắt **độ lớn**. Xem [[../vaults/dl/exploding-gradient-clipnorm|dl/exploding-gradient-clipnorm]].

---

## 🔗 Liên kết
- **Tiền đề:** [[learning-rate]] · [[sgd]]
- **Dẫn tới:** [[loss-function]]
- **Liên quan:** [[toi-uu-hoa]] · [[regularization]] · [[hyperparameter-tuning]]
- **Liên môn:** [[dl/cac-loai-gradient-descent]] · [[dl/exploding-gradient-clipnorm]]

## ❓ Câu hỏi mở
- Vì sao Adam tổng quát hoá kém hơn SGD? Giả thuyết nào hiện được chấp nhận nhất?

## 📚 Nguồn
- `L8_NeuralNetwork.pdf`
