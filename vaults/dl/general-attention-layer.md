---
slug: general-attention-layer
title: General Attention Layer — Q/K/V ở đâu chui ra
vault: dl
type: concept
branch: H
order: 3
status: done
tags: [dl, attention, s07]
prev: [alignment-score]
next: [self-vs-cross-attention]
created: 2026-08-09
---

# General Attention Layer — Q/K/V ở đâu chui ra

> Tóm tắt 1 câu: Self-attention **không phải một phát minh riêng** — nó là attention của seq2seq sau **5 bước tổng quát hoá liên tiếp**, mỗi bước gỡ đi một ràng buộc.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh H · #3 ← cần [[alignment-score]] · → kế tiếp [[self-vs-cross-attention]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #attention #s07

---

## 💡 Ý chính

Đây là **xương sống của cả buổi S07** (slide 22–32). Ai học Transformer mà thấy `Q = xW_q, K = xW_k, V = xW_v` từ trên trời rơi xuống thì đọc mục này — nó trả lời đúng câu *"vì sao lại là 3 ma trận đó?"*.

Điểm xuất phát: attention cho captioning ở [[show-attend-tell]] — **features `z` (H×W×D)** + **một query `h`** (state của LSTM) → **một context vector `c`**.

## 🔢 5 bước tổng quát hoá

| Bước | Gỡ ràng buộc gì | Sau bước đó |
|---|---|---|
| **1** | Lưới ảnh `H×W×D` chỉ là *"một tập vector"* | Input thành **`x` shape `N × D`** — dùng được cho **mọi thứ**: pixel, từ, node đồ thị |
| **2** | Vì sao chỉ **1** query? | Cho **nhiều query `q_0…q_M`**. 🔑 **Mỗi query sinh ra một context vector đầu ra riêng** ⇒ output thành cả một chuỗi `y_0…y_M` |
| **3** | Cùng một `x` đang phải làm **2 việc**: vừa để **chấm điểm**, vừa để **lấy nội dung** | Tách ra bằng **2 lớp FC**: `k = xW_k` (để so khớp) và `v = xW_v` (để lấy nội dung) |
| **4** | Query vẫn phải **đến từ bên ngoài** (state của decoder) | Cho query **cũng sinh từ chính `x`**: `q = xW_q` |
| **5** | — | Xong. Lớp này **không cần RNN, không cần decoder, không cần gì bên ngoài** — chỉ cần một tập vector. **Đó là self-attention.** |

```
x ──W_k──→ K ┐
             ├─→ e = f_att(Q,K) ──softmax──→ a ──×V──→ y
x ──W_q──→ Q ┘                                  ↑
x ──W_v──────────────────────────────────────────┘
```

## 🧩 Trực giác — vì sao phải tách K và V

Bước 3 là bước tinh tế nhất. Trước đó, `x` vừa là *"nhãn để tìm"* vừa là *"nội dung"* — như một cuốn từ điển mà **tiêu đề mục chính là nội dung mục**.

Tách ra thì model học được những thứ kiểu: *"từ này **hay được hỏi tới** khi đang nói về chủ ngữ (K), nhưng cái **cần lấy về** lại là thông tin số nhiều của nó (V)"*. Hai vai trò khác nhau ⇒ hai phép chiếu khác nhau.

## 🔑 Vì sao `q = xW_q` chứ KHÔNG phải `q = x` luôn?

Ở bước 4, có **hai hướng** để query sinh ra từ `x`:

| | **Hướng 1 — dùng thẳng `q_i = x_i`** | **Hướng 2 — chiếu qua `W_q`** ⭐ |
|---|---|---|
| Tham số học được nằm ở đâu | **chỉ trong `f_att`** | trong **`W_q`, `W_k`, `W_v`** |
| `f_att` phải là gì | một **MLP học được** (kiểu additive) | **phép nhân vô hướng trần trụi**, 0 tham số |
| Chi phí | mỗi cặp `(i,j)` một lần chạy MLP | cả bảng điểm = **1 phép nhân ma trận** |

**Ba vấn đề của hướng 1** (đúng như trực giác *"phải sửa nhiều ở `f_att`"*):

1. 🚩 **Nếu `f_att` là dot-product trần thì layer KHÔNG CÓ THAM SỐ NÀO.** `q=k=v=x` + dot-product ⇒ toàn bộ layer là một **hàm cố định**, không học được gì. Muốn học thì **bắt buộc** phải nhét tham số vào `f_att` ⇒ quay lại additive ⇒ **mất song song hoá**, mất đúng thứ khiến Transformer thắng ([[alignment-score]]).
2. 🚩 **Điểm số bị ĐỐI XỨNG**: `e_ij = x_i · x_j = x_j · x_i = e_ji`. Tức *"A chú ý B"* bị ép **bằng** *"B chú ý A"*. Ngôn ngữ không như vậy — tính từ phải bám rất chặt vào danh từ nó bổ nghĩa, chiều ngược lại thì không. `W_q ≠ W_k` **phá vỡ đối xứng đó**.
3. 🚩 **Mỗi token chỉ nhìn chính nó.** Theo bất đẳng thức Cauchy–Schwarz, `e_ii = ‖x_i‖²` **luôn là ô lớn nhất trong hàng** ⇒ sau softmax trọng số dồn vào đường chéo ⇒ layer suy biến gần thành phép **copy y nguyên**, chẳng trộn được gì.

### 💡 Đổi mindset — đây mới là bài học lớn

> **Đừng làm cho HÀM CHẤM ĐIỂM thông minh lên. Hãy làm cho BIỂU DIỄN ĐẦU VÀO thông minh lên, rồi chấm điểm bằng phép toán ngu nhất có thể.**

```
Hướng 1:   x  ──────────────→  f_att PHỨC TẠP (có tham số)  →  điểm
                                    ↑ chậm, không song song

Hướng 2:   x ──W_q,W_k──→ q,k  ──→  dot-product NGU (0 tham số)  →  điểm
              ↑ chỗ chứa toàn bộ trí tuệ        ↑ 1 matmul, GPU chạy hết công suất
```

Cùng lượng tham số, nhưng **dời chỗ đặt** từ *hàm* sang *phép chiếu* ⇒ phần đắt tiền trở thành **nhân ma trận**, thứ GPU làm giỏi nhất. Đây chính là lý do dòng cuối bảng [[alignment-score]] (scaled dot-product) thắng, dù chất lượng chỉ **xấp xỉ** additive.

📌 Cùng một tư duy với [[resnet]]: không chế ra tầng nào thông minh hơn, chỉ **đổi đường đi của tín hiệu** rồi để mọi thứ còn lại y nguyên.

## ⚙️ Ứng dụng

- Hiểu đúng mục này thì **cross-attention không cần học lại**: chỉ là bước 4 làm **ngược** — `q` lấy từ chuỗi khác, `k`/`v` lấy từ `x`. Xem [[self-vs-cross-attention]].
- Cũng giải thích luôn vì sao **[[detr]]** dùng được attention cho detection: input chỉ cần là "một tập vector", ảnh hay chữ không quan trọng.

## ⚠️ Lỗi thường gặp

- ⚠️ **Số query không bắt buộc bằng số key.** Self-attention thì bằng (`M = N`), cross-attention thì thường khác. Nhầm chỗ này là nhầm shape ma trận attention (`M × N`, không phải vuông).
- 🚩 Sau bước 5, layer này **hoàn toàn không biết thứ tự** — đó chính là lý do bắt buộc phải có [[positional-encoding]]. Không phải "nên có", mà là **hệ quả trực tiếp** của việc bỏ hết cấu trúc tuần tự đi.

---

## 🔗 Liên kết
- **Tiền đề:** [[alignment-score]] · [[attention-qkv]]
- **Dẫn tới:** [[self-vs-cross-attention]] · [[positional-encoding]]
- **Liên quan tới:** [[show-attend-tell]] · [[detr]]

## 📚 Nguồn
- `Session07-Attention&Transformer.pdf` slide 22–32
