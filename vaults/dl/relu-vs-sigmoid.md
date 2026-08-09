---
slug: relu-vs-sigmoid
title: ReLU vs Sigmoid
vault: dl
type: concept
branch: A
order: 4
status: done
tags: [dl, nen-tang]
prev: [ham-kich-hoat]
next: [forward-pass]
created: 2026-08-02
---

# ReLU vs Sigmoid

> Tóm tắt 1 câu: **Đạo hàm là toàn bộ câu chuyện** — sigmoid ≤ 0.25 nên nhân chồng là tắt ngóm, ReLU = 1 nên gradient đi thẳng.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh A · #4 ← cần [[ham-kich-hoat]] · → kế tiếp [[forward-pass]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nen-tang

---

## 💡 Bảng so sánh

| | **SIGMOID** | **ReLU** |
|---|---|---|
| Công thức | `σ(z) = 1/(1+e⁻ᶻ)` | `f(z) = max(0, z)` |
| Range | `(0, 1)` | `[0, +∞)` |
| **Đạo hàm** | `σ(1−σ)` ← **MAX 0.25** | **1** nếu `z>0` · **0** nếu `z<0` |
| Vanishing gradient | **NẶNG** (≤0.25 mỗi lớp) | **KHÔNG** ở nhánh dương |
| Chi phí tính | `exp()` — đắt | so sánh — **rất rẻ** |
| Bão hoà | **CẢ 2 ĐẦU** | chỉ nhánh âm |
| Sparsity | không | **CÓ** (~50% neuron = 0) |
| Bệnh riêng | vanishing | **DYING ReLU** |
| Dùng ở đâu | **OUTPUT** nhị phân | **HIDDEN LAYER** (mặc định) |

## 🔑 Đạo hàm là toàn bộ câu chuyện

Nhớ backprop: `δ_h = δ_o · v · h(1−h)`

- **sigmoid**: `h(1−h) ≤ 0.25` → qua 10 lớp: `0.25¹⁰ ≈ 0.0000001` → **tắt ngóm** = [[vanishing-gradient]]
- **ReLU**: đạo hàm `= 1` ở nhánh dương → nhân bao nhiêu lớp vẫn là 1 → **gradient đi thẳng về input**

⇒ Đây là **lý do chính mạng sâu train được**.
📌 AlexNet 2012 là mạng lớn đầu tiên dùng ReLU, train nhanh **~6 lần** so với tanh.

## ⚠️ DYING ReLU — bệnh riêng

Neuron rơi vào `z<0` với **MỌI** input → gradient = 0 **vĩnh viễn** → weight không bao giờ update → **chết hẳn**.
Hay xảy ra khi **learning rate quá lớn**.

**Chữa**: Leaky ReLU (`0.01z` khi `z<0`) · PReLU (hệ số học được) · ELU · **GELU** (Transformer/ViT).

⚠️ Nói cho chuẩn: **đạo hàm ReLU là 1 HOẶC 0**, không phải "bằng 1".

## 🚩 Trên RNN, ReLU RỦI RO

`W_hh` **dùng chung** và nhân lại **mỗi bước**. `tanh` **chặn `h` trong [-1,1]** nên nhân nhiều lần vẫn không nổ. **ReLU không chặn trên** → `h` phình dần → **activation nổ → NaN**. Đây là lý do Keras để mặc định `tanh`.

Muốn dùng thì phải kèm: khởi tạo `W_hh` = ma trận đơn vị + clip chặt (**IRNN** — Le, Jaitly & Hinton 2015).

🧭 **Chốt để không nhớ sai: ReLU là thuốc cho chiều SÂU (số tầng), [[lstm-cell-state]] là thuốc cho chiều DÀI (số bước thời gian).**

📝 *Về chữ nghĩa*: ReLU là **hàm kích hoạt**, không phải **hàm lỗi** (cross-entropy, MSE mới là hàm lỗi).

---

## 🔗 Liên kết
- **Tiền đề:** [[ham-kich-hoat]]
- **Dẫn tới:** [[forward-pass]] · [[vanishing-gradient]]
- **Liên quan tới:** [[vanishing-gradient-rnn]] · [[exploding-gradient-clipnorm]]
