---
slug: alignment-score
title: Alignment Score — 6 cách chấm điểm Q với K
vault: dl
type: concept
branch: H
order: 2
status: done
tags: [dl, attention, s07]
prev: [attention-qkv]
next: [general-attention-layer]
created: 2026-08-09
---

# Alignment Score — 6 cách chấm điểm Q với K

> Tóm tắt 1 câu: `f_att(q, k)` chỉ là **hàm chấm điểm "cặp này hợp nhau tới đâu"** — có 6 kiểu, và cái thắng cuộc thắng vì **chạy được dạng ma trận trên GPU**, không phải vì chính xác hơn.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh H · #2 ← cần [[attention-qkv]] · → kế tiếp [[general-attention-layer]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #attention #s07

---

## 💡 Ý chính

Trong [[attention-qkv]], bước 1 là *"đo Q hợp với từng K tới mức nào"*. Slide 20 cho biết bước đó **không có một công thức duy nhất** — nó là một **chỗ cắm** (`f_att`), và lịch sử đã thử 6 kiểu.

Đọc bảng này để hiểu: `softmax(QKᵀ/√d_k)` của Transformer **không phải trời sinh ra thế**, mà là dòng cuối cùng của một quá trình đơn giản hoá dần.

## 🔢 Bảng 6 hàm (slide 20)

| Tên | Công thức | Ai |
|---|---|---|
| **Content-base** | `score(s_t, h_i) = cosine[s_t, h_i]` | Graves 2014 |
| **Additive** ⭐ | `score = v_aᵀ · tanh( W_a[s_t ; h_i] )` | **Bahdanau 2015** |
| **Location-base** | `α_{t,i} = softmax(W_a · s_t)` — **chỉ phụ thuộc vị trí đích**, không nhìn `h_i` | Luong 2015 |
| **General** | `score = s_tᵀ · W_a · h_i` | Luong 2015 |
| **Dot-Product** | `score = s_tᵀ · h_i` | Luong 2015 |
| **Scaled Dot-Product** ⭐ | `score = s_tᵀ·h_i / √n` | **Vaswani 2017** |

## 🧩 Trực giác — 2 trường phái

| | **Additive (Bahdanau)** | **Multiplicative (Luong / Vaswani)** |
|---|---|---|
| Bản chất | **Nối** `s` và `h` rồi cho qua **một MLP nhỏ** (`W_a`, `tanh`, `v_a`) | **Nhân** hai vector với nhau |
| Có tham số riêng? | ✅ có — mạng con phải học | Dot-product: ❌ không có tham số nào |
| Tốc độ | **Chậm** — mỗi cặp `(t, i)` là một lần chạy MLP | **Nhanh** — cả bảng điểm là **1 phép nhân ma trận** `Q·Kᵀ` |
| Khi `d` lớn | Ổn định | Bão hoà → phải chia `√d_k` |

- **`General`** là bậc thang ở giữa: vẫn nhân, nhưng chèn `W_a` để `s` và `h` **không cần cùng số chiều**.
- **`Location-base`** là kẻ lạc loài: nó **không nhìn nguồn** chút nào, chỉ đoán "đang sinh từ thứ `t` thì chắc phải nhìn khoảng vị trí `t`". Rẻ, nhưng chỉ hợp bài **thứ tự gần như song song** (dịch giữa 2 ngôn ngữ cùng trật tự từ).

## ⚙️ Khi nào dùng gì

- Viết attention **thủ công trên LSTM** (kiểu [[image-captioning]] có attention) → **additive/Bahdanau** vẫn là mặc định tốt, Keras có sẵn `AdditiveAttention`.
- Viết/ dùng **Transformer** → **scaled dot-product**, không có lựa chọn nào khác.
- Chiều của query và key **khác nhau** → dùng `general` (có `W_a` để nắn), hoặc chiếu bằng linear trước.

## ⚠️ Lỗi thường gặp

- 🔑 **Đừng nghĩ "dot-product tốt hơn additive"**. Nhiều thí nghiệm cho thấy chất lượng **xấp xỉ nhau**; dot-product thắng vì **song song hoá được**. Đây đúng bài học của [[self-vs-cross-attention]]: Transformer thắng nhờ **chạy được nhanh**, không nhờ thông minh hơn.
- ⚠️ **Bỏ `√n`** ở dot-product khi `d` lớn ⇒ softmax bão hoà ⇒ gradient teo. **Không nổ lỗi**, chỉ học kém — đúng kiểu [[bay-am-tham]].
- ⚠️ Slide ghi `score(s_t, h_i)` nhưng công thức context vector (slide 19) dùng `s_{t-1}` — **đọc kỹ mình đang dùng state nào**: attention của Bahdanau dùng **state trước** `s_{t-1}`, Luong dùng **state hiện tại** `s_t`. Sai chỗ này thì mạng vẫn train, chỉ khác kiến trúc.

---

## 🔗 Liên kết
- **Tiền đề:** [[attention-qkv]]
- **Dẫn tới:** [[general-attention-layer]]
- **Liên quan tới:** [[image-captioning]] · [[show-attend-tell]] · [[bay-am-tham]]

## 📚 Nguồn
- `Session07-Attention&Transformer.pdf` slide 19–20
