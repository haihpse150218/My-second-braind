---
slug: attention-qkv
title: Attention — Q / K / V
vault: dl
type: concept
branch: H
order: 1
status: done
tags: [dl, attention, s07]
prev: [beam-search]
next: [alignment-score]
created: 2026-08-02
updated: 2026-08-09
---

# Attention — Q / K / V

> Tóm tắt 1 câu: Đừng ép nhớ hết vào một vector — giữ lại **toàn bộ** hidden state của encoder, rồi mỗi bước decode lại hỏi *"bây giờ nên nhìn vào phần nào?"*

**Ngày tạo:** 2026-08-02 · **Cập nhật:** 2026-08-09 (đối chiếu slide S07)
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh H · #1 ← cần [[beam-search]] · → kế tiếp [[alignment-score]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Dùng trong:** [[../../projects/viic-image-captioning|📦 viic-image-captioning]]
**Tags:** #dl #attention #s07

---

## 💡 Bệnh nó chữa: NÚT THẮT CỔ CHAI

Seq2seq: encoder đọc cả câu nguồn rồi **nén tất cả vào MỘT vector `h` cuối cùng**.

```
"Thị_trường chứng_khoán đang đi xuống"  ──encoder──→  [ 1 vector 512 chiều ]  ──decoder──→
                    30 từ                                      ↑
                                              MỌI THỨ phải chui qua đây
```

> Slide 4 hỏi thẳng: *"Some sentences can be really long. **Can we really store all the information in a vector of hidden units?**"*

Cùng một bệnh với 3 chỗ đã gặp: [[vanishing-gradient-rnn]] · [[image-captioning]] (tiêm ảnh 1 lần rồi quên) · [[contextualized-embedding]] (1 từ 1 vector).

**Ý tưởng trong 1 câu (slide 5):** mỗi từ đầu ra thường chỉ đến từ **một hoặc vài** từ đầu vào — vậy hãy **học cách chỉ chú ý vào những từ liên quan** trong lúc sinh.

## 🔢 Công thức gốc (slide 8–9, 19)

```
c_t   = Σ_i  α_{t,i} · h_i                    ← context vector RIÊNG cho mỗi bước t

α_{t,i} = exp(e_{t,i}) / Σ_{i'} exp(e_{t,i'})  ← softmax ⇒ tổng bằng 1

e_{t,i} = attention_net( s_{t-1} , h_i )       ← chấm điểm "hợp nhau tới đâu"
```

| Ký hiệu | Ý nghĩa |
|---|---|
| `h_i` | **annotation** — hidden state của encoder tại vị trí nguồn `i` (giữ lại **hết**, không vứt) |
| `s_{t-1}` | 🔑 state **TRƯỚC** của decoder — cái đang "cần gì" |
| `e_{t,i}` | điểm alignment thô |
| `α_{t,i}` | trọng số 0–1, *"y_t và x_i khớp nhau tới đâu"* |
| `c_t` | trung bình có trọng số ⇒ **đổi theo từng bước decode** |

Decoder giờ là `y_t = g(y_{t-1}, h_{t-1}, c_t)` — **giống hệt seq2seq cũ, chỉ khác `c` không còn cố định**.

## 🧩 Đọc bằng phép tra từ điển

| Ký hiệu | Là gì | Ví von |
|---|---|---|
| **Q** (Query) | *"tôi đang cần gì"* — chính là `s_{t-1}` | **từ khoá đi tìm** |
| **K** (Key) | *"tôi là mục nào"* | **tiêu đề mỗi mục** |
| **V** (Value) | *"nội dung thật của tôi"* | **nội dung mục đó** |

```
Attention(Q,K,V) = softmax( Q·Kᵀ / √d_k ) · V
                   └─ điểm giống nhau ─┘└─ trọng số ─┘└ tổng có trọng số ┘
```

3 bước đọc — **giống hệt cách đọc softmax của [[word2vec]]**:
1. `Q·Kᵀ` — tích vô hướng đo độ giống (có 6 kiểu chấm điểm khác nhau → [[alignment-score]])
2. `softmax` — thành trọng số cộng lại bằng 1
3. Nhân `V` — trung bình có trọng số

📌 Ở bản attention-trên-RNN này, **K và V là cùng một thứ** (`h_i`). Việc tách chúng ra thành 2 phép chiếu riêng là bước sau — xem [[general-attention-layer]].

## 🔑 Ý cốt lõi

**KHÔNG chọn đúng 1 mục, mà lấy trung bình có trọng số của TẤT CẢ** → "tra cứu **mềm**", và **mềm thì mới khả vi, mới học được bằng gradient**.

📌 **Cùng đúng một mẹo với [[cong-trong-rnn]]**: thay `if/else` bằng trọng số 0–1 mượt. LSTM làm mềm phép *chọn theo thời gian*, attention làm mềm phép *chọn theo vị trí*.

📌 **Attention weight vẽ ra được** (slide 6): ma trận `target × source` của bài dịch Đức–Anh sáng gần như **đường chéo**, lệch đúng ở chỗ 2 ngôn ngữ đảo trật tự từ. Đây là **bằng chứng nhìn thấy được** rằng model học đúng alignment — và là gốc của heatmap trong [[show-attend-tell]].

## ⚠️ Lỗi thường gặp

- ❓ **`√d_k` để làm gì**: `d_k` càng lớn thì tích vô hướng càng lớn → softmax **bão hoà** (một ô ≈ 1, còn lại ≈ 0) → **gradient teo**. Chia `√d_k` giữ phương sai ~1. **Bỏ đi vẫn chạy, chỉ học kém hơn** — bẫy im lặng ([[bay-am-tham]]).
- ⚠️ **Attention KHÔNG bỏ được RNN** ở bản này — encoder/decoder vẫn là RNN, attention chỉ thay đường nối giữa hai bên. Bỏ hẳn RNN là chuyện của [[general-attention-layer]] và [[transformer-block]].
- ⚠️ Dùng `s_{t-1}` hay `s_t` làm query là **hai kiến trúc khác nhau** (Bahdanau vs Luong) — xem [[alignment-score]].

---

## 🔗 Liên kết
- **Tiền đề:** [[beam-search]] · [[cong-trong-rnn]] · [[image-captioning]]
- **Dẫn tới:** [[alignment-score]] · [[general-attention-layer]] · [[self-vs-cross-attention]]
- **Liên quan tới:** [[show-attend-tell]] · [[positional-encoding]]

## 📚 Nguồn
- `Session07-Attention&Transformer.pdf` slide 4–9, 19
