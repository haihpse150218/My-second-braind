---
slug: bert-span-extraction
title: BERT cho đọc-hiểu — dự đoán START và END
vault: dl
type: concept
branch: I
order: 3
status: done
tags: [dl, nlp, qa, s08]
prev: [squad-em-f1]
next: [rag]
created: 2026-08-09
---

# BERT cho đọc-hiểu — dự đoán START và END

> Tóm tắt 1 câu: Trích một đoạn văn bản **không phải bài sinh chuỗi** — nó là **hai bài phân loại vị trí** chạy song song: đâu là token bắt đầu, đâu là token kết thúc.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh I · #3 ← cần [[squad-em-f1]] · → kế tiếp [[rag]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #qa #s08

---

## 💡 Ý chính

Bài đọc-hiểu ở [[squad-em-f1]] có đáp án **luôn là một span trong đoạn văn**. Nhận ra điều đó thì bài toán **đổi hẳn bản chất**:

> Không cần **sinh** chữ nào cả. Chỉ cần **chỉ ra 2 vị trí**.

Nên [[bert]] — vốn là **encoder-only, không sinh được chuỗi** — lại làm được bài này một cách hoàn hảo.

## 🔢 Công thức (slide 24–25)

```
Input:  [CLS]  Tok₁ … Tok_N  [SEP]  Tok₁' … Tok_M'
        └──── Question ────┘        └── Paragraph ──┘
                    ↓  BERT  ↓
              h_i = vector ẩn của token i

p_start(i) = softmax_i( w_startᵀ · h_i )
p_end(i)   = softmax_i( w_endᵀ   · h_i )

ℒ = − log p_start(s*) − log p_end(e*)
```

| Ký hiệu | Ý nghĩa |
|---|---|
| `h_i` | vector ẩn của token `i`, BERT trả về |
| `w_start`, `w_end` | 🔑 **chỉ 2 vector học được** — toàn bộ phần "head" mới thêm |
| `s*`, `e*` | vị trí bắt đầu / kết thúc **đúng** |

- **Quy mô model**: BERT-base 12 tầng / **110M** param · BERT-large 24 tầng / **330M** param.

## 🧩 Trực giác — vì sao head lại rẻ đến thế

Cả phần thêm mới chỉ là **2 vector** `w_start`, `w_end` (mỗi cái `d_model` chiều, ~768 số). So với 110M tham số của BERT thì gần như **bằng 0**.

Nói cách khác: **BERT đã hiểu sẵn đoạn văn rồi**; head chỉ làm đúng một việc — *"chấm điểm cho mỗi token: mày có giống chỗ-bắt-đầu-đáp-án không?"*

📌 Đây là bức tranh chuẩn của [[transfer-learning]] trong NLP: **thân đắt tiền dùng lại, đầu rẻ tiền thay theo bài** — y hệt việc thay FC head trên CNN pretrained ở nhánh B.

📌 Và `softmax_i` chạy **qua các vị trí** (chọn token nào), không phải qua vocab — cùng dạng phép tính với attention ở [[attention-qkv]], chỉ khác mục đích.

## ⚠️ Lỗi thường gặp

- 🚩 **Không có ràng buộc `end ≥ start`** trong công thức. Model hoàn toàn có thể xuất ra span **ngược** hoặc dài vô lý. Lúc suy luận phải **tự chặn**: duyệt các cặp `(i, j)` với `j ≥ i` và `j − i < max_len`, lấy cặp có `p_start(i) · p_end(j)` lớn nhất. Bỏ qua bước này thì EM tụt mà nhìn loss không thấy gì.
- ⚠️ **Đoạn văn dài hơn `max_len` của BERT (512 token)** ⇒ phải **cắt cửa sổ trượt có chồng lấn**, rồi gộp điểm giữa các cửa sổ. Cắt cụt thẳng tay thì đáp án nằm ở phần bị cắt là mất trắng.
- ⚠️ **Chỉ được phép chọn span trong phần Paragraph.** Phải mask bỏ vùng câu hỏi và `[CLS]`/`[SEP]`, nếu không model có thể "trả lời" bằng chính câu hỏi.
- 🚩 **Câu KHÔNG có đáp án** (SQuAD 2.0): quy ước trỏ span về `[CLS]`. Không xử lý thì model **buộc phải bịa** một span — đúng kiểu bịa của [[sau-noi-so-ao-tuong]].

---

## 🔗 Liên kết
- **Tiền đề:** [[squad-em-f1]] · [[bert]]
- **Dẫn tới:** [[rag]]
- **Liên quan tới:** [[transfer-learning]] · [[transformer-encoder-vs-decoder]] · [[attention-qkv]]

## 📚 Nguồn
- `Session08-PromptEngineering.pdf` slide 24–25
