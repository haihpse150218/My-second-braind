---
slug: masked-self-attention
title: Masked (Causal) Self-Attention
vault: dl
type: concept
branch: H
order: 7
status: done
tags: [dl, attention, transformer, s07]
prev: [positional-encoding]
next: [transformer-block]
created: 2026-08-09
---

# Masked (Causal) Self-Attention

> Tóm tắt 1 câu: Đặt điểm attention của các vị trí **phía sau** thành `−∞` **trước** softmax — đó là cách duy nhất vừa **train song song cả câu** vừa **không lộ tương lai**.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh H · #7 ← cần [[positional-encoding]] · → kế tiếp [[transformer-block]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #attention #transformer #s07

---

## 💡 Bài toán

Self-attention để mỗi vị trí nhìn **toàn bộ** chuỗi. Nhưng khi **sinh chuỗi** (dịch máy, language model, caption), từ ở vị trí `t` **không được phép** nhìn từ `t+1` trở đi — nếu không thì lúc train nó chỉ việc **chép đáp án**.

Đây đúng luật đã gặp ở [[bidirectional-rnn]]: *bidirectional chỉ dùng khi đã có trọn chuỗi*. RNN được miễn phí luật này (nó chạy tuần tự nên không thể thấy tương lai); attention **phải tự áp đặt**.

## 🔢 Hai cách làm — và vì sao chỉ 1 cách dùng được

| Cách | Mô tả | Vấn đề |
|---|---|---|
| **Cắt tập K/V** | Mỗi timestep chỉ đưa vào key/query của các từ **đã qua** | ❌ **Không song song hoá được** — quay lại đúng nhược điểm của RNN. Slide 37 ghi thẳng: *"Inefficient!"* |
| **Mask** ⭐ | Vẫn tính **đủ** ma trận `N×N`, rồi **đặt `−∞`** vào nửa trên bên phải trước khi softmax | ✅ Một phép nhân ma trận duy nhất, chạy hết công suất GPU |

```
score sau khi mask (slide 37):

            [START]   The    chef    who
  [START]     ·      −∞     −∞     −∞
  The         ·       ·     −∞     −∞
  chef        ·       ·      ·     −∞
  who         ·       ·      ·      ·
```

🔑 **Vì sao `−∞` chứ không phải 0**: mask được áp **trước** softmax. `exp(−∞) = 0` ⇒ trọng số đúng bằng **0** sau chuẩn hoá. Nếu đặt 0 vào *score*, `exp(0) = 1` ⇒ vị trí tương lai vẫn **có trọng số dương**. Đặt 0 vào *trọng số sau softmax* thì tổng không còn bằng 1. Cả hai đều sai âm thầm.

## ⚙️ Ứng dụng

- **Decoder** của Transformer (khối `Masked Multi-Head Attention`) và **toàn bộ GPT** — xem [[transformer-encoder-vs-decoder]].
- Bỏ mask đi thì decoder biến thành encoder. Đó là **khác biệt kiến trúc duy nhất** giữa BERT và GPT.

## ⚠️ Lỗi thường gặp

- 🚩 **Hai loại mask khác nhau, phải dùng CẢ HAI và phải GỘP:**

  | | **Causal mask** | **Padding mask** |
  |---|---|---|
  | Che gì | vị trí **tương lai** | ô `<PAD>` — xem [[padding-masking]] |
  | Hình dạng | tam giác, **giống nhau mọi mẫu** | phụ thuộc độ dài **từng câu** |
  | Quên thì sao | **Leak tương lai**: train loss đẹp bất thường, inference sinh ra rác | Model học từ ô rỗng, điểm tụt nhẹ và khó truy |

  Gộp bằng `AND` (chỉ nhìn được ô **vừa ở quá khứ vừa không phải PAD**).

- 🚩 **Bẫy im lặng kinh điển**: quên mask lúc train ⇒ **val loss thấp một cách đáng ngờ**, BLEU/CIDEr trên teacher-forcing thì đẹp, nhưng sinh tự do thì hỏng. Triệu chứng **y hệt** exposure bias ở [[teacher-forcing]] nên rất dễ chẩn nhầm. Cách phân biệt: in thử ma trận attention của một mẫu ra xem nửa trên có bằng 0 không.
- ⚠️ Ở **inference** không có tương lai để mà lộ, nhưng vẫn phải giữ mask để **kiến trúc khớp với lúc train**.

---

## 🔗 Liên kết
- **Tiền đề:** [[positional-encoding]] · [[self-vs-cross-attention]]
- **Dẫn tới:** [[transformer-block]] · [[transformer-encoder-vs-decoder]]
- **Liên quan tới:** [[padding-masking]] · [[bidirectional-rnn]] · [[teacher-forcing]] · [[bay-am-tham]]

## 📚 Nguồn
- `Session07-Attention&Transformer.pdf` slide 36–38
