---
slug: resnet
title: ResNet — skip connection
vault: dl
type: concept
branch: B
order: 11
status: done
tags: [dl, cnn, kien-truc]
prev: [vgg]
next: [batch-normalization]
created: 2026-08-02
---

# ResNet — skip connection

> Tóm tắt 1 câu: `H(x) = F(x) + x` ⇒ `∂H/∂x = ∂F/∂x + 1` — **số 1 đó luôn có mặt**, mở đường cao tốc cho gradient.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh B · #11 ← cần [[vgg]] · → kế tiếp [[batch-normalization]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #cnn #kien-truc

---

## 💡 Vấn đề nó giải: DEGRADATION, không phải overfitting

🔥 **Bẫy lớn nhất của S02 (slide 46–47)**: 56-layer tệ hơn 20-layer **KHÔNG PHẢI overfitting**.
Overfit = train **tốt** + test **tệ**. Ở đây **train cũng tệ** ⇒ loại. Tên đúng: **degradation problem** — bài toán **tối ưu**.

## 🔢 Cơ chế

```
H(x) = F(x) + x
∂H/∂x = ∂F/∂x + 1
                 ↑
        số 1 này LUÔN có mặt, không ai bóp được
```

| | Không skip | Có skip |
|---|---|---|
| Thừa số mỗi tầng | `γ = ∂F/∂x` (may rủi, thường < 1) | `γ = 1 + ∂F/∂x` (**bảo đảm có số 1**) |
| Qua `T` tầng | `γ^T` → 0 | có **đường đi thẳng `1^T = 1`** |
| `T=50`, `γ=0.9` | `0.005` — mất 99,5% | `≈ 1` — **nguyên vẹn** |

📊 Bằng chứng lịch sử: VGG kịch trần ở **19 tầng**, ResNet nhảy lên **152 tầng** — chỉ nhờ thêm dấu `⊕`.

## 🔑 CÙNG MỘT MẸO ở 4 chỗ — ý lớn nhất của cả môn

| Kiến trúc | Công thức | Đường "cộng" ở đâu |
|---|---|---|
| **ResNet** | `y = x + F(x)` | `x` đi thẳng |
| **[[lstm-cell-state]]** | `C_t = f·C_{t-1} + i·C̃_t` | `C` đi thẳng, `f` là van |
| **[[gru]]** | `h_t = (1-z)·h_{t-1} + z·h̃_t` | `(1-z)·h_{t-1}` |
| **Transformer** | `x + Attention(x)` | y hệt ResNet |

📌 **Chuyển từ NHÂN sang CỘNG = cách duy nhất ngành DL biết để gradient đi xa.** Khác nhau chỉ ở chiều **sâu** (ResNet/Transformer) hay **thời gian** (LSTM/GRU).

## ⚠️ Lỗi thường gặp

⚠️ **Dấu `⊕` phải đặt TRƯỚC relu cuối**: đúng là `conv → relu → conv → ⊕(+x) → relu`.
Đặt sai vẫn train được, **chỉ kém hơn, không ai biết** — đúng kiểu [[bay-am-tham]].

⚠️ Với RNN, skip connection kiểu ResNet chỉ chữa vanishing theo **chiều SÂU** (stacked RNN), **không** chữa được chuỗi 100 bước thời gian → xem [[stacked-rnn]].

---

## 🔗 Liên kết
- **Tiền đề:** [[vgg]] · [[vanishing-gradient]]
- **Dẫn tới:** [[batch-normalization]]
- **Liên quan tới:** [[lstm-cell-state]] · [[fpn]] · [[stacked-rnn]]
