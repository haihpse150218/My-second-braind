---
slug: padding-masking
title: Padding & Masking cho chuỗi
vault: dl
type: concept
branch: E
order: 5
status: done
tags: [dl, rnn, data]
prev: [nam-dang-bai-sequence]
next: [trang-thai-khoi-dong-h0]
created: 2026-08-02
---

# Padding & Masking cho chuỗi

> Tóm tắt 1 câu: Chuỗi dài ngắn khác nhau phải đệm về cùng độ dài — và **bắt buộc mask**, nếu không model được thưởng vì đoán đúng `<pad>`.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #5 ← cần [[nam-dang-bai-sequence]] · → kế tiếp [[trang-thai-khoi-dong-h0]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn #data

---

## 💡 Ý chính — 4 việc mà bài ảnh không có

1. **Vẽ histogram độ dài chuỗi trước khi chọn `maxlen`.** Cắt ở ~**95th percentile**, đừng lấy max — 1 chuỗi dài bất thường ép cả batch dài theo, đốt VRAM vô ích.
2. **Padding**: chốt `pre` hay `post` và **ghi ra**.
   - **Có `mask_zero=True`** → cả hai đều chạy đúng, chọn kiểu nào cũng được
   - **KHÔNG mask** → với RNN phải dùng **`pre`**: padding dồn về đầu nên **bước cuối vẫn là từ thật**, hidden state cuối không bị hàng chục bước `<PAD>` làm loãng. Đây là công thức kinh điển của IMDB (xem [[thuc-hanh-imdb-simplernn]])
   - `truncating` cũng phải chốt: `pre` = **cắt đầu, giữ cuối**
3. 🚩 **BẮT BUỘC bật masking** — `Embedding(mask_zero=True)` hoặc lớp `Masking`.
4. **Loss phải bỏ qua vị trí pad**.

## 🔑 `mask_zero=True` làm gì, và hỏng thế nào nếu quên

**Không mask thì `0` chỉ là một ID bình thường:** Embedding tra **dòng số 0** trả về **vector thật** (còn được học!), RNN chạy qua **toàn bộ** 200 bước coi `<PAD>` như từ có nghĩa. Review 30 token đệm lên 200 ⇒ **85% công sức của RNN đổ vào chỗ trống**.

**Cơ chế**: Embedding sinh thêm **mask boolean** `(batch, T)`, Keras tự truyền xuống; RNN thấy mask thì **bỏ qua bước đó** — `h_t = h_{t-1}`, giữ nguyên không cập nhật. ⇒ `h` cuối **đúng bằng trạng thái sau token thật cuối cùng**.

**Mức thiệt hại khi quên mask phụ thuộc `pre` hay `post`:**
```
padding='pre'                    padding='post'
[PAD×170][30 từ thật]            [30 từ thật][PAD×170]
              ↑                                    ↑
     h cuối ngay sau từ thật       h cuối cách từ thật CUỐI 170 bước
     → thiệt hại có hạn            → vanishing xoá sạch nội dung
```

**3 lưu ý:**
1. Index `0` thành **chỗ dành riêng cho padding**, không được là từ thật
2. 🚩 **Không phải layer nào cũng hiểu mask** — `Flatten` không truyền mask xuống ⇒ mask **âm thầm mất tác dụng**, không lỗi nào báo
3. 🚩 **`LSTM`/`GRU` trên GPU + mask ⇒ BẮT BUỘC `padding="post"`.** Kernel **cuDNN** chỉ nhận mask **right-padded**. Đưa mask left-padded (`pre`) vào thì **Keras 3 NÉM LỖI THẲNG**, *không* tự chuyển sang bản chậm:
   ```
   InvalidArgumentError: You are passing a RNN mask that does not correspond to
   right-padded sequences, while using cuDNN, which is not supported.
   ```
   2 cách chữa: ✅ **đổi `padding="post"`** (giữ cuDNN, nhanh) · hoặc `use_cudnn=False` (giữ `pre`, chậm hơn nhiều).
   *(`SimpleRNN` **vốn không có** kernel cuDNN nên chạy được cả hai — đây là lý do lỗi chỉ nổ khi đổi sang LSTM/GRU.)*
   ⚠️ Và nhớ: `post` **chỉ an toàn khi CÓ mask**. Bỏ mask thì `post` là lựa chọn **tệ nhất**.

Token đặc biệt: `<PAD>` `<UNK>` `<START>` `<END>` — chốt index và **giữ nguyên** giữa train và inference.

## 🧩 Trực giác / Ví dụ

Câu 5 từ đệm lên `maxlen=50` → **45 bước rỗng**. Không mask thì:
- Model học luôn cách đoán `<pad>` (dễ, luôn đúng) → accuracy đẹp giả
- Ngữ cảnh câu ngắn bị **loãng** bởi hàng chục bước vô nghĩa

## ⚠️ Lỗi thường gặp

| Bẫy | Chết âm thầm thế nào |
|---|---|
| Quên masking | Loss vẫn giảm — model đang học đoán `<pad>` |
| Vocab xây từ **cả tập** | Leakage im lặng → xem [[chong-ro-ri-du-lieu]] |
| `maxlen` lấy max | VRAM nổ hoặc train chậm gấp nhiều lần |

---

## 🔗 Liên kết
- **Tiền đề:** [[nam-dang-bai-sequence]]
- **Liên quan tới:** [[chong-ro-ri-du-lieu]] · [[word-segmentation-tieng-viet]]
