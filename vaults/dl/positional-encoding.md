---
slug: positional-encoding
title: Positional Encoding
vault: dl
type: concept
branch: H
order: 6
status: done
tags: [dl, attention, transformer, s07]
prev: [multi-head-attention]
next: [masked-self-attention]
created: 2026-08-02
updated: 2026-08-09
---

# Positional Encoding

> Tóm tắt 1 câu: Attention nhìn chuỗi như một **cái túi không thứ tự** — phải cộng thêm thông tin vị trí, nếu không *"chó cắn người"* = *"người cắn chó"*.

**Ngày tạo:** 2026-08-02 · **Cập nhật:** 2026-08-09 (đối chiếu slide S07)
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh H · #6 ← cần [[multi-head-attention]] · → kế tiếp [[masked-self-attention]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #attention #transformer #s07

---

## 💡 Ý chính

- Attention tính `Q·Kᵀ` giữa **mọi cặp vị trí** — phép này **hoàn toàn đối xứng**, đảo thứ tự input cho ra kết quả **y hệt** (permutation equivariance, xem [[self-vs-cross-attention]]).
- RNN **không cần** positional encoding vì thứ tự nằm sẵn trong **cách nó chạy** (bước 1 rồi mới bước 2).
- Attention **mất** đặc tính đó khi đổi lấy khả năng song song → phải **nhét thông tin vị trí vào chính dữ liệu** trước khi đưa vào khối attention.

Đây là **cái giá phải trả cho việc song song hoá**. Muốn tính mọi vị trí cùng lúc thì không thể dựa vào "thứ tự chạy" nữa — phải ghi thứ tự thành **số**.

## ❓ Vì sao không lấy luôn SỐ THỨ TỰ cho xong?

Câu hỏi đầu tiên ai cũng hỏi. Thử 2 cách ngây thơ nhất trước, để thấy **các ràng buộc từ đâu ra**:

| Cách ngây thơ | Chết ở đâu |
|---|---|
| **`p(t) = t`** (0, 1, 2, … số nguyên trần) | ❌ **Không chặn.** Câu 500 từ ⇒ `p = 500`, trong khi embedding thường nằm quanh `[-1, 1]` ⇒ vị trí **lấn át hoàn toàn nội dung**. Cộng vào là hỏng vector từ |
| **`p(t) = t / T`** (chuẩn hoá về `[0,1]`) | ❌ **Bước nhảy phụ thuộc độ dài câu.** Câu 10 từ: cách nhau 1 vị trí = `0.1`. Câu 100 từ: = `0.01`. Cùng khái niệm *"kề nhau"* mà mã hoá **khác nhau 10 lần** ⇒ model không học được khái niệm khoảng cách nhất quán |
| Cả hai | ❌ **Chỉ 1 chiều** so với `d = 512` chiều của embedding ⇒ tín hiệu vị trí bị **nuốt chửng** |

### 📋 Từ đó rút ra 5 tiêu chí (slide 35: *"design a fixed function with the desiderata"*)

- [ ] Mỗi vị trí một mã **duy nhất**
- [ ] Giá trị **chặn**, không phình theo độ dài
- [ ] **Khoảng cách giữa 2 vị trí nhất quán** dù câu dài hay ngắn
- [ ] **Ngoại suy** được sang độ dài chưa từng gặp
- [ ] **Tất định** — cùng vị trí luôn cùng mã

🔑 `sin`/`cos` thoả **cả 5**: bản chất tuần hoàn nên luôn nằm trong `[-1, 1]` (chặn), nhiều tần số nên vẫn phân biệt được mọi vị trí (duy nhất), và hàm không phụ thuộc `T` nên khoảng cách nhất quán + ngoại suy được.

## 🔢 Hai lựa chọn (slide 35)

Cần một hàm `pos: ℕ → ℝ^d` biến vị trí `j` thành vector `d` chiều, rồi `p_j = pos(j)` ghép vào `x_j`.

### 1. Learned lookup table
Coi vị trí như một bảng embedding, train bình thường như mọi tham số khác.
- Bảng có **`T × d` tham số** (`T` = độ dài tối đa)
- ✅ Đơn giản, và thực tế **BERT dùng đúng cái này** (xem [[bert]] — lớp "Position Embeddings")
- ❌ **Chết cứng ở `maxlen` đã train** — gặp câu dài hơn thì không có vector

### 2. Fixed function — sinusoidal (bản gốc *Attention is All You Need*)

```
              ⎡ sin(ω₁·t) ⎤
              ⎢ cos(ω₁·t) ⎥
     p(t)  =  ⎢ sin(ω₂·t) ⎥          với   ω_k = 1 / 10000^(2k/d)
              ⎢ cos(ω₂·t) ⎥
              ⎢     ⋮     ⎥
              ⎣ cos(ω_{d/2}·t) ⎦
```

- ✅ **Không tốn tham số**, và **ngoại suy** được sang độ dài chưa từng gặp
- ✅ Hiệu số giữa hai vị trí biểu diễn được bằng phép quay ⇒ model học được **khoảng cách tương đối**

### 🧩 Trực giác: đây là một BỘ ĐẾM NHỊ PHÂN "mượt"

Slide 35 đặt cạnh bảng đếm nhị phân 0–15:

```
 0 : 0 0 0 0        8 : 1 0 0 0
 1 : 0 0 0 1        9 : 1 0 0 1
 2 : 0 0 1 0       10 : 1 0 1 0
 3 : 0 0 1 1       11 : 1 0 1 1
      ↑ ↑ ↑ ↑
      │ │ │ └─ đổi mỗi 1 bước   (tần số CAO)
      │ │ └─── đổi mỗi 2 bước
      │ └───── đổi mỗi 4 bước
      └─────── đổi mỗi 8 bước   (tần số THẤP)
```

Mỗi cột lật với **một tần số khác nhau** — đủ để mã hoá **mọi** số bằng ít chiều. Sinusoidal làm **đúng việc đó nhưng liên tục**: `ω_k` giảm dần theo `k` ⇒ chiều đầu đổi rất nhanh (phân biệt vị trí **kề nhau**), chiều cuối đổi rất chậm (phân biệt **đầu câu với cuối câu**).

## ⚠️ Lỗi thường gặp

- ⚠️ **Slide vẽ "concatenate", cài đặt thực tế gần như luôn "add".** Bản gốc và mọi thư viện đều **CỘNG** `p_j` vào `x_j` (cùng `d` chiều) chứ không nối. Cộng thì không làm phình chiều; nối thì tốn thêm chỗ. Đọc slide nhớ đối chiếu code.
- 🚩 **Bỏ positional encoding** thì Transformer tụt xuống thành một **mô hình bag-of-words đắt tiền** — vẫn chạy, loss vẫn giảm, chỉ là **mất sạch ngữ pháp**. Đúng kiểu [[bay-am-tham]], cùng nhược điểm với [[one-hot-bag-of-words]] và [[tf-idf]].
- ⚠️ **Learned PE + suy luận trên câu dài hơn lúc train** ⇒ lỗi index hoặc (tệ hơn) cắt câu âm thầm. Chốt `max_len` một lần và **kiểm phân bố độ dài thật** trước.
- ⚠️ PE cộng vào **một lần ở đáy stack**, không cộng lại ở từng block.

---

## 🔗 Liên kết
- **Tiền đề:** [[multi-head-attention]] · [[self-vs-cross-attention]]
- **Dẫn tới:** [[masked-self-attention]] · [[transformer-block]]
- **Liên quan tới:** [[one-hot-bag-of-words]] · [[tf-idf]] — cùng nhược điểm "mất thứ tự" · [[bert]]

## 📚 Nguồn
- `Session07-Attention&Transformer.pdf` slide 34–35
