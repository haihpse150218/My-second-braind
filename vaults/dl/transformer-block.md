---
slug: transformer-block
title: Khối Transformer — Attn → Add&Norm → FF → Add&Norm
vault: dl
type: concept
branch: H
order: 8
status: done
tags: [dl, transformer, s07]
prev: [masked-self-attention]
next: [transformer-encoder-vs-decoder]
created: 2026-08-09
---

# Khối Transformer — Attn → Add&Norm → FF → Add&Norm

> Tóm tắt 1 câu: Attention chỉ là **một phần tư** của khối; ba phần còn lại (**residual · LayerNorm · feed-forward**) mới là thứ làm cho xếp 6–96 tầng vẫn train được.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh H · #8 ← cần [[masked-self-attention]] · → kế tiếp [[transformer-encoder-vs-decoder]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #transformer #s07

---

## 💡 Ý chính

Slide 42 liệt kê đúng 4 thành phần của một Block, lặp lại `N×`:

```
        ┌──────────── Block (lặp N lần) ────────────┐
input ──┤ Self-Attention → Add & Norm               │
        │ Feed-Forward   → Add & Norm               │──→ output
        └───────────────────────────────────────────┘
```

Toàn cảnh một stack:

```
Inputs → Embeddings → + Position Embeddings → [ Block ] ×N → Linear → Softmax → Probabilities
```

## 🔢 Bốn thành phần

| Thành phần | Làm gì | Vì sao có |
|---|---|---|
| **Self-Attention** | Trộn thông tin **giữa các vị trí** | Phần "nhìn ngang" |
| **Add** (residual) | `x + SubLayer(x)` | 🔑 **Chính là skip connection của [[resnet]]** |
| **Norm** (LayerNorm) | Chuẩn hoá **theo từng token**, qua các chiều feature | Giữ scale ổn định giữa các tầng |
| **Feed-Forward** | 2 lớp Linear + phi tuyến, **áp riêng cho từng vị trí** | Phần "nghĩ sâu" tại chỗ; `d_ff = 4 × d_model` |

## 🧩 Trực giác

### 1. `Add` = kim chỉ nam số 4 của cả môn

> *Mạng học được sâu/dài là nhờ phép **CỘNG**, không phải phép nhân.*

**ResNet · LSTM · GRU · Transformer — cùng đúng một mẹo ở 4 chỗ khác nhau.** Ở đây là chỗ thứ 4: bỏ `Add` đi thì stack 6 tầng attention sẽ [[vanishing-gradient|teo gradient]] y như CNN sâu không có skip. Xem [[lstm-cell-state]] cho cùng mẹo đó ở dạng "băng chuyền".

### 2. Attention trộn ngang, FF nghĩ dọc

Chia việc rất rõ:
- **Attention** = *"lấy thông tin từ các từ khác về"* — trộn **giữa các vị trí**, nhưng bản thân phép trộn là **tuyến tính** (trung bình có trọng số).
- **Feed-Forward** = *"tiêu hoá thông tin vừa lấy về"* — **không nhìn sang từ khác**, chỉ biến đổi phi tuyến tại chỗ.

⚠️ Nếu **không có FF**, cả stack gần như sụp về một phép biến đổi tuyến tính lặp lại — đúng bài học của [[ham-kich-hoat]]: **không có phi tuyến thì mạng sâu vô nghĩa**.

### 3. ❓ Vì sao phải lặp `N` lần? Một tầng đã nhìn thấy hết cả câu rồi mà

Câu hỏi đúng chỗ, và câu trả lời **ngược hẳn với CNN**.

| | **CNN xếp sâu** | **Transformer xếp sâu** |
|---|---|---|
| Tầng 1 nhìn được bao xa | chỉ **cục bộ** (3×3) | 🔑 **TOÀN BỘ chuỗi, ngay lập tức** |
| Xếp thêm tầng mua được gì | **TẦM NHÌN** — receptive field rộng dần | ❌ không mua thêm tầm nhìn (đã tối đa từ tầng 1) |
| | | ✅ mua **SỐ BƯỚC SUY LUẬN** |

- **Ở CNN**, depth = **với xa hơn**. Phải xếp nhiều tầng thì pixel góc trái mới "thấy" được pixel góc phải.
- **Ở Transformer**, tầng 1 đã có đường đi thẳng tới mọi vị trí (đúng dòng đầu bảng so sánh ở [[self-vs-cross-attention]]: khoảng cách luôn = 1). Xếp thêm tầng **không** để nhìn xa hơn — mà để **suy luận nhiều bước hơn**.

**Ví dụ 2 bước:**
```
"Con mèo mà Lan nuôi bị ốm. NÓ cần đi khám."

Tầng dưới:  NÓ ──attend──→ "con mèo"          (giải đại từ)
Tầng trên:  giờ mới hỏi được: con mèo ĐÓ thế nào? ──attend──→ "bị ốm"
```

Bước 2 **không thể làm cùng lúc** với bước 1 — nó cần **kết quả** của bước 1 làm đầu vào. Một tầng chỉ cho **một vòng** trung bình có trọng số ⇒ chỉ bắt được **quan hệ trực tiếp**. Quan hệ **bắc cầu** phải trả bằng **chiều sâu**.

📌 Đây cũng là lý do người ta hay quan sát thấy tầng thấp của BERT thiên về **hình thái/cú pháp**, tầng cao thiên về **ngữ nghĩa** — thông tin được tinh chế dần qua từng vòng. ⚠️ Nhưng đó là **xu hướng quan sát được**, không phải luật; đừng phát biểu chắc nịch cho một tầng cụ thể, y như cảnh báo ở [[multi-head-attention]] về việc gán nhiệm vụ cho từng head.

### 4. FF là nơi chứa phần lớn tham số

Với `d_model=512`, `d_ff=2048`: khối FF có `512×2048×2 ≈ 2,1M` param, trong khi 4 ma trận Q/K/V/O chỉ `512×512×4 ≈ 1,0M`. **Hơn gấp đôi.** Nên khi bị OOM, cắt `d_ff` thường lời hơn cắt số head.

## ⚙️ Khoảng khuyến nghị (bản gốc *Attention is All You Need*)

| Tham số | Giá trị base | Ghi chú |
|---|---|---|
| `d_model` | **512** | model nhỏ / data ít: 128–256 |
| `N` (số block) | **6** | BERT-base 12 · GPT-3 96 |
| `h` (số head) | **8** | phải chia hết `d_model` — xem [[multi-head-attention]] |
| `d_ff` | **2048** = 4×`d_model` | chỗ tốn param nhất |
| dropout | **0.1** | đặt sau mỗi sublayer |
| Learning rate | **có warmup** | không warmup thì vài trăm step đầu rất dễ nổ |

## ⚠️ Lỗi thường gặp

- 🚩 **Post-LN vs Pre-LN**. Bản gốc là **post-LN** (`Norm(x + Sublayer(x))`) — **bắt buộc phải warmup LR**, không thì loss nổ ngay đầu. Bản hiện đại dùng **pre-LN** (`x + Sublayer(Norm(x))`) — ổn định hơn nhiều, train được không cần warmup. Copy code cũ mà bỏ warmup ⇒ **train hỏng mà tưởng do data**.
- ⚠️ **LayerNorm ≠ [[batch-normalization]]**. LN chuẩn hoá **trong một token**, không dính gì tới batch ⇒ **không có moving statistics**, không có bẫy train/eval mode, chạy được với batch size 1 và chuỗi dài ngắn khác nhau. Đó chính là lý do NLP dùng LN chứ không dùng BN.
- ⚠️ **Đói data.** Không có bias tuần tự sẵn như RNN, Transformer **phải học mọi thứ từ dữ liệu**. Data vài nghìn mẫu thì LSTM thường vẫn thắng — xem bảng chọn kiến trúc ở `D:\MSA-FPT\DeepLearning\second-brain.md`.

---

## 🔗 Liên kết
- **Tiền đề:** [[masked-self-attention]] · [[multi-head-attention]]
- **Dẫn tới:** [[transformer-encoder-vs-decoder]]
- **Liên quan tới:** [[resnet]] · [[lstm-cell-state]] · [[batch-normalization]] · [[ham-kich-hoat]] · [[vanishing-gradient]]

## 📚 Nguồn
- `Session07-Attention&Transformer.pdf` slide 38, 41–42
