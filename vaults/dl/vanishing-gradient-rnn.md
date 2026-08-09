---
slug: vanishing-gradient-rnn
title: Vanishing gradient trong RNN
vault: dl
type: concept
branch: E
order: 8
status: done
tags: [dl, rnn]
prev: [bptt]
next: [exploding-gradient-clipnorm]
created: 2026-08-02
---

# Vanishing gradient trong RNN

> Tóm tắt 1 câu: Chuỗi dài ⇒ đạo hàm nhân dồn qua từng bước ⇒ nhân toàn số nhỏ ⇒ tích **tiến dần về 0**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #8 ← cần [[bptt]] · → kế tiếp [[exploding-gradient-clipnorm]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn

---

## 🔢 Mỗi thừa số `< 1` một chút thôi là chết

Gọi thừa số mỗi bước là `γ`, sau `T` bước tín hiệu còn lại `γ^T`:

| `γ` mỗi bước | `T=10` | `T=20` | `T=50` | |
|---|---|---|---|---|
| 0.9 | 0.35 | 0.12 | 0.005 | ⬇️ **vanishing** |
| **0.5** | 0.001 | 0.0000010 | ~10⁻¹⁶ | ⬇️ chết hẳn |
| 1.1 | 2.6 | 6.7 | 117 | ⬆️ exploding |
| 1.5 | 58 | 3.325 | ~10⁸ | ⬆️ NaN |

## 💡 Ý chính

- **Vì sao `γ` gần như LUÔN < 1 ở vanilla RNN**: đạo hàm `tanh` là `1 - tanh² ∈ (0, 1]`, **càng bão hoà càng gần 0**. Nhân thêm `W_hh` nữa → thừa số bé đi. **Vanishing là mặc định.**
- **Ngưỡng thực chiến**: vanilla RNN gần như **mất sạch ngữ cảnh quá ~10 bước**. Dài hơn → lên thẳng [[lstm-cell-state]] / [[gru]].

## 🧩 Triệu chứng thực chiến

- Loss giảm rồi **chững sớm**
- Model chỉ đoán đúng phần **cuối** chuỗi
- Đổi đầu câu **không đổi** kết quả

## ⚠️ Lỗi thường gặp

⚠️ **Đính chính hiểu nhầm phổ biến (slide 23 nói rõ):** vanishing **KHÔNG phải gradient = 0**. Gradient vẫn khác 0, chỉ là **cực nhỏ** → học **rất chậm**, không phải đứng im hẳn. Đừng đi debug "gradient = 0".

⚠️ **Đừng lẫn với [[loi-tich-luy-chuoi-dai]]** — cùng dạng "mũ T" nhưng khác đại lượng: đây là **độ lớn gradient lúc train**, kia là **xác suất sinh đúng cả câu lúc inference**.

## ⚙️ Thuốc — mổ xẻ 6 gạch đầu dòng của slide 24

Mọi cách chữa đều chỉ làm **một việc**: kéo `γ` **về gần 1**, hoặc **bỏ hẳn phép nhân**.

| Slide đề xuất | Dùng cho RNN được không |
|---|---|
| **LSTM/GRU** | ⭐ **Đúng thuốc nhất** — `γ = f_t` do model tự chọn |
| **ResNet** (skip) | ✅ nhưng cho chiều **SÂU**, không cho chiều thời gian |
| **ReLU** | ⚠️ đúng lý thuyết, **rủi ro trên RNN** → xem [[relu-vs-sigmoid]] |
| Multi-level hierarchy | 🟡 ít dùng thực tế |
| **Batch normalization** | 🚩 **kém trên RNN** → dùng **LayerNorm** |
| **Faster hardware** | 🚩 **không chữa vanishing gì cả** — nó chữa nhược điểm *"computation being slow"*, `γ^T` vẫn về 0 y như cũ |

🚩 Danh sách slide 24 là **list chung cho mạng SÂU**, không phải riêng RNN. Đừng bê nguyên vào báo cáo.

---

## 🔗 Liên kết
- **Tiền đề:** [[bptt]]
- **Dẫn tới:** [[cong-trong-rnn]] · [[lstm-cell-state]]
- **Liên quan tới:** [[vanishing-gradient]] · [[resnet]] · [[exploding-gradient-clipnorm]]
