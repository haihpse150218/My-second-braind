---
slug: pipeline-text-to-tensor
title: "Pipeline: Raw text → Tensor"
vault: dl
type: concept
branch: F
order: 14
status: done
tags: [dl, nlp, pipeline]
prev: [pretrained-embedding]
next: [thuc-hanh-imdb-simplernn]
created: 2026-08-02
---

# Pipeline: Raw text → Tensor

> Tóm tắt 1 câu: 3 bước đầu chỉ là **hành chính** (biến chữ thành số), Embedding mới là chỗ **nghĩa** xuất hiện, RNN là chỗ **thứ tự** được dùng.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh F · #14 ← cần [[pretrained-embedding]] · → kế tiếp [[thuc-hanh-imdb-simplernn]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #pipeline

---

## 🧭 Nhìn tổng thể — 3 LOẠI việc khác hẳn nhau

```
Raw text → Tokenization → Word IDs → Padding → Embedding → RNN → Classification
└──────────── HÀNH CHÍNH ────────────────────┘  └ NGHĨA ┘  └THỨ TỰ┘  └QUYẾT ĐỊNH┘
   biến chữ thành số, CHƯA thêm nghĩa gì
```

📌 Nhìn ra 3 nhóm này thì hết rối: 3 bước đầu **không thêm thông tin nào**, chỉ đổi định dạng.

## 💡 Mục đích từng bước

### 1. Raw text → Tokenization
**Cắt chuỗi ký tự liền mạch thành đơn vị đếm được.**
```
"This film was just brilliant" → ["this","film","was","just","brilliant"]
```
Không có bước này thì **không có gì để đánh số**. Phải chốt: đơn vị là **từ · âm tiết · subword · ký tự**?
🇻🇳 Tiếng Việt là chỗ chết người vì space **không phải** ranh giới từ → [[word-segmentation-tieng-viet]]

### 2. Tokenization → Word IDs
**Mạng nơ-ron chỉ ăn số**, nên mỗi từ cần một số nguyên. Cũng là chỗ chốt **vocab** (`num_words=10_000`, còn lại → `<UNK>`).

⚠️ **ID KHÔNG có nghĩa toán học.** ID `530` không "lớn hơn" ID `43` — nó chỉ là **địa chỉ dòng trong từ điển**.
→ Đây chính là lý do **không được đưa thẳng word ID vào Dense**: mạng sẽ tưởng là số có thứ tự và học ra quan hệ bịa đặt.

### 3. Word IDs → Padding
**GPU tính trên tensor chữ nhật**, không xử lý được list dài ngắn khác nhau.
```
review A: 218 token
review B: 130 token   → không xếp chồng được → ép về 200 → (25000, 200)
```
Kèm 2 quyết định: **`truncating`** (cắt đầu hay đuôi) và **`mask_zero=True`** → [[padding-masking]]

### 4. Padding → Embedding ⭐ bước quan trọng nhất
**Biến ID vô nghĩa thành vector CÓ nghĩa.**
```
(batch, 200) → (batch, 200, 64)
```
Bản chất là **bảng tra cứu `10.000 × 64`**, lấy đúng dòng thứ `ID`. Vector **được HỌC** nên từ giống nghĩa dần dịch về gần nhau.

📊 **Con số đáng giật mình** (từ [[thuc-hanh-imdb-simplernn]]):

| Layer | Param | Tỉ lệ |
|---|---|---|
| **Embedding** | **640.000** | **98,7%** |
| SimpleRNN | 8.256 | 1,3% |
| Dense | 65 | ~0% |

→ **Gần như toàn bộ model KHÔNG phải "mạng nơ-ron" — mà là cái BẢNG TRA TỪ.**

🔑 **Nếu chỉ nhớ một điều từ cả pipeline này thì nhớ con số 98,7%.** Nó giải thích luôn 3 thứ:

1. **Vì sao [[pretrained-embedding]] có tác động lớn đến vậy** — bạn đang thay **98,7% tham số** bằng thứ đã học sẵn từ hàng tỷ token, không phải "tinh chỉnh một chi tiết"
2. **Vocab 10.000 hay 50.000 là quyết định về KÍCH THƯỚC MODEL**, không chỉ về độ phủ từ — tăng vocab gấp 5 là model phình gấp ~5
3. **SimpleRNN với 8.256 param khó mà gánh nổi review 200 token** — phần "hiểu chuỗi" thật sự **quá bé** so với phần tra cứu. Đúng như kết quả `79.4%` ở [[thuc-hanh-imdb-simplernn]]

### 5. Embedding → RNN
**Nén 200 vector thành 1 vector** tóm tắt cả chuỗi → `return_sequences=False`, lấy `h` cuối.
```
(batch, 200, 64) → (batch, 64)
```
🔑 **Đây là bước DUY NHẤT trong cả pipeline quan tâm tới THỨ TỰ.**
Thay RNN bằng phép **lấy trung bình** 200 vector thì được đúng một [[one-hot-bag-of-words]] — `"chó cắn người"` = `"người cắn chó"`.

### 6. RNN → Classification
Từ vector 64 chiều ra **một xác suất**: `Dense(1, sigmoid)` → `(batch, 1)` trong `[0,1]`, rồi so ngưỡng `0.5`.
📌 **Ngưỡng chỉnh được** — ở IMDB nó đang lệch, bỏ sót 27,6% review positive.

## 🔢 Shape đi suốt pipeline — dán đầu notebook để debug

```
(batch,)              chuỗi text
(batch, ~variable)    list word IDs
(batch, 200)          sau padding      ← từ đây mới xếp được thành tensor
(batch, 200, 64)      sau embedding    ← từ đây mới có "nghĩa"
(batch, 64)           sau RNN          ← từ đây MẤT chiều thời gian
(batch, 1)            sau Dense        ← xác suất
```

## ⚠️ Lỗi thường gặp

- **Tokenizer lúc predict ≠ lúc train** → *train/serve skew*, dự đoán không đáng tin dù nhìn hợp lý. Bẫy có thật trong notebook IMDB.
- **Vocab xây từ cả tập** → leakage, xem [[chong-ro-ri-du-lieu]].
- Nhầm `return_sequences` ở bước 5 → xem [[nam-dang-bai-sequence]].

---

## 🔗 Liên kết
- **Tiền đề:** [[pretrained-embedding]] · [[word-segmentation-tieng-viet]]
- **Dẫn tới:** [[thuc-hanh-imdb-simplernn]]
- **Liên quan tới:** [[padding-masking]] · [[nam-dang-bai-sequence]] · [[one-hot-bag-of-words]]
