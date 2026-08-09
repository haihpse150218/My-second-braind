---
slug: self-vs-cross-attention
title: Self · Cross · Masked attention
vault: dl
type: concept
branch: H
order: 4
status: done
tags: [dl, attention, s07]
prev: [general-attention-layer]
next: [multi-head-attention]
created: 2026-08-02
updated: 2026-08-09
---

# Self · Cross · Masked attention

> Tóm tắt 1 câu: Ba thuật ngữ khác nhau ở chỗ **Q lấy từ đâu** và **có che tương lai không**.

**Ngày tạo:** 2026-08-02 · **Cập nhật:** 2026-08-09 (đối chiếu slide S07)
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh H · #4 ← cần [[general-attention-layer]] · → kế tiếp [[multi-head-attention]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #attention #s07

---

## 💡 Ý chính

| Tên | Q lấy từ đâu | K, V lấy từ đâu | Dùng ở |
|---|---|---|---|
| **Self-attention** | **chính chuỗi đó** (`q = xW_q`) | **chính chuỗi đó** | Encoder BERT · trong mỗi khối Transformer |
| **Cross-attention** | **decoder** | **encoder** | Dịch, captioning — **chỗ nối 2 bên** |
| **Masked (causal)** | như self, nhưng **che các vị trí phía sau** | | 🚩 **Decoder sinh chuỗi** — chi tiết ở [[masked-self-attention]] |

Hai khái niệm đi kèm, mỗi cái một note riêng:
- **Multi-head** — chạy nhiều bộ Q/K/V song song rồi nối lại → [[multi-head-attention]]
- **Positional encoding** — bù lại thứ tự đã mất → [[positional-encoding]]

📌 Cả ba đều **cùng một phép tính**, chỉ khác **đầu vào** — xem mạch tổng quát hoá ở [[general-attention-layer]].

## ⚠️ Đừng đóng đinh "attention CŨ vs attention MỚI"

Bài giảng đi theo 2 chặng (`1. Attention với RNN` → `2. Self-Attention`) nên rất dễ nhớ thành *"cũ bị thay bằng mới"*. **Sai ở 2 điểm:**

**1. Cái "cũ" KHÔNG chết — nó chính là cross-attention, vẫn sống trong mọi Transformer.**

Transformer đầy đủ có **3 chỗ attention** ([[transformer-encoder-vs-decoder]]), và một trong ba chính là attention-của-seq2seq ngày xưa:

| # | Chỗ | Là gì |
|---|---|---|
| ① | decoder self-attention (masked) | "mới" |
| ② | encoder self-attention | "mới" |
| ③ | **cross-attention** | 🔑 **chính là cái "cũ"** — decoder hỏi encoder *"giờ nên nhìn phần nào của nguồn?"* |

Thứ **thật sự** bị thay không phải attention, mà là **RNN** — cái vỏ chạy tuần tự bọc quanh nó.

**2. Cách phân loại đúng không phải theo thời gian, mà theo `Q/K/V lấy từ đâu.`**

Đó là toàn bộ nội dung bảng ở trên. Hiểu theo trục *"nguồn của Q/K/V"* thì không cần nhớ mốc lịch sử nào cả, và [[general-attention-layer]] cho thấy cả ba **sinh ra từ cùng một mạch**.

## ⚠️ Mask KHÔNG phải để vá "hạn chế của self-attention"

Cũng dễ nhớ sai thành *"self-attention bị hạn chế ⇒ chế ra mask"*. Nói cho chuẩn:

- 🔑 **Nhìn được toàn bộ chuỗi là TÍNH NĂNG, không phải lỗi.** BERT cần đúng như vậy — nhìn cả 2 phía là thứ làm nên sức mạnh của nó ([[bert]]).
- **Ràng buộc đến từ BÀI TOÁN, không từ kiến trúc**: chỉ khi **sinh chuỗi** (dịch, caption, language model) mới cấm nhìn tương lai. Cùng bài toán đó áp lên RNN cũng phải cấm — xem [[bidirectional-rnn]]. RNN được **miễn phí** luật này vì nó chạy tuần tự; self-attention **phải tự áp đặt**.
- Và mask **không phải cách vá hiển nhiên**: cách hiển nhiên (cắt bớt tập K/V mỗi bước) **giết chết song song hoá**. Mẹo `−∞` mới là phát minh thật — xem [[masked-self-attention]].

⇒ Câu chuyện đúng: **bài toán sinh chuỗi cấm nhìn tương lai → cách vá ngây thơ làm mất song song hoá → mask `−∞` giữ được cả hai.**

## 🧩 Permutation EQUIVARIANCE — đảo input, output đảo theo (slide 34)

```
x0 x1 x2  ──self-attn──→  y0 y1 y2
x2 x1 x0  ──self-attn──→  y2 y1 y0      ← ĐÚNG y đó, chỉ đảo chỗ
x1 x0 x2  ──self-attn──→  y1 y0 y2
```

> *"Self-attention layer doesn't care about the orders of the inputs!"*

### ⚠️ Nói cho chuẩn: **equivariant**, KHÔNG phải **invariant**

| | Nghĩa | Self-attention |
|---|---|---|
| **Invariant** | Đảo input → output **y hệt, không đổi chỗ** | ❌ không phải |
| **Equivariant** | Đảo input → output **đảo theo đúng như vậy** | ✅ đúng cái này |

🔑 Cách phát biểu đúng: **`y_i` dính chặt vào `x_i`, không dính vào VỊ TRÍ `i`.** Vector đầu ra của chữ `chó` là **y hệt nhau** dù `chó` đứng đầu câu hay cuối câu. Cái mất không phải là output, mà là **thông tin "nó đứng ở đâu"**.

### 🔬 Vì sao mất — 2 lý do, đều nằm ngay trong công thức

1. **Không có chỉ số `i` trong công thức.** `q = xW_q`, `k = xW_k`, `v = xW_v` — **cùng một bộ `W` áp cho MỌI vị trí** (weight sharing). Layer **không có đường nào** để biết token này đứng thứ mấy: đầu vào của nó chỉ là *nội dung* token, không kèm *toạ độ*.
2. **`c_i = Σ_j a_{ij} v_j` là một phép TỔNG.** Cộng thì đổi thứ tự số hạng không đổi kết quả. Self-attention nhìn đầu vào như một **TẬP HỢP** (set), không phải một **DÃY** (sequence).

📌 **Sửa lại chỗ mình từng viết sai**: lý do **không** phải *"`Q·Kᵀ` đối xứng"*. Ma trận điểm `QKᵀ` **không** đối xứng — vì `W_q ≠ W_k` (đúng như đã lập luận ở [[general-attention-layer]]). Cái làm mất thứ tự là **weight sharing + phép tổng**, không phải tính đối xứng.

### 💥 Hậu quả với NLP

```
"chó   cắn   người"   ──self-attn──→   cùng một bộ vector
"người cắn   chó"     ──self-attn──→   cùng một bộ vector      ⇒ KHÔNG PHÂN BIỆT ĐƯỢC
```

Mất sạch ngữ pháp: chủ ngữ/tân ngữ, trật tự bổ nghĩa, phủ định đứng trước hay sau. Model tụt xuống thành một **bag-of-words đắt tiền** — cùng đúng nhược điểm của [[one-hot-bag-of-words]] và [[tf-idf]], chỉ khác là tốn GPU hơn nhiều.

🚩 Và nó **không nổ lỗi**: loss vẫn giảm, vẫn ra số. Đúng kiểu [[bay-am-tham]].

### 🔧 Vì sao phải sửa Ở DỮ LIỆU, không sửa ở layer

Đây là chỗ nhiều người thắc mắc *"sao không vá ngay trong attention?"*.

Vì hai lý do trên là **hệ quả trực tiếp của thứ mình vừa đánh đổi để lấy**: bỏ tính tuần tự để **song song hoá được**. Vá vào layer (kiểu ép nó xử lý theo thứ tự) là **trả lại đúng cái vừa mua** — quay về RNN.

⇒ Chỉ còn một đường: **ghi vị trí thành số rồi nhét thẳng vào chính dữ liệu** trước khi đưa vào layer. Đó là [[positional-encoding]] — **bắt buộc**, không phải tuỳ chọn.

| Kiến trúc | Biết thứ tự nhờ đâu |
|---|---|
| **RNN/LSTM** | **cách nó CHẠY** — bước 1 xong mới tới bước 2 |
| **CNN** | **cửa sổ trượt** — biết cái gì kề cái gì (nhưng chỉ cục bộ) |
| **Self-attention** | ❌ **không gì cả** → phải cộng PE vào dữ liệu |

## ⚙️ Vì sao Attention giết RNN

| | **RNN/LSTM** | **Attention** |
|---|---|---|
| **Đường đi giữa 2 token cách nhau T bước** | **T** phép biến đổi ⇒ `γ^T` teo | **1** ⇒ không vanishing theo khoảng cách |
| **Song song hoá** | ❌ bước `t` đợi `t-1` | ✅ **mọi vị trí tính cùng lúc** |
| Chi phí theo `T` | **O(T)** — rẻ | **O(T²)** — chuỗi dài rất tốn |
| Thứ tự từ | **có sẵn** trong cấu trúc | ❌ mất → cần [[positional-encoding]] |
| Data cần | ít cũng chạy | **đói data** |

🔑 **2 dòng đầu là toàn bộ lý do Transformer thắng** — không phải "thông minh hơn", mà là **rút mọi khoảng cách về 1** và **chạy song song được**.

## ⚠️ Lỗi thường gặp

- 🚩 **Masked attention nối thẳng vào luật ở [[bidirectional-rnn]]**: decoder **cấm nhìn tương lai**. GPT dùng masked, BERT thì không — đó chính là khác biệt kiến trúc **duy nhất** giữa 2 dòng model ([[transformer-encoder-vs-decoder]]).
- ⚠️ **Cái giá `O(T²)`**: chuỗi 1.000 token ⇒ **1 triệu** cặp phải tính. Đây là lý do LLM bị giới hạn context, và là chỗ mọi nghiên cứu tối ưu đang nhắm vào.
- ⚠️ **Cross-attention không đối xứng**: số query (độ dài đích) thường **khác** số key (độ dài nguồn) ⇒ ma trận attention là `M×N`, **không vuông**. Nhầm chỗ này là nhầm shape.

---

## 🔗 Liên kết
- **Tiền đề:** [[general-attention-layer]] · [[attention-qkv]]
- **Dẫn tới:** [[multi-head-attention]] · [[positional-encoding]] · [[masked-self-attention]]
- **Liên quan tới:** [[bidirectional-rnn]] · [[contextualized-embedding]] · [[transformer-encoder-vs-decoder]]

## 📚 Nguồn
- `Session07-Attention&Transformer.pdf` slide 31–34
