---
slug: lost-in-the-middle
title: Lost in the Middle — context dài ≠ dùng được hết context
vault: dl
type: concept
branch: I
order: 5
status: done
tags: [dl, llm, rag, s08]
prev: [rag]
next: [retrieve-rerank]
created: 2026-08-09
---

# Lost in the Middle — context dài ≠ dùng được hết context

> Tóm tắt 1 câu: LLM chú ý tốt vào **đầu** và **cuối** context, còn **khúc giữa thì rơi rụng** — nên nhồi thêm tài liệu vào RAG sẽ **bão hoà sau 10–20 cái**, dù retriever vẫn đang tìm tốt hơn.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh I · #5 ← cần [[rag]] · → kế tiếp [[retrieve-rerank]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #llm #rag #s08

---

## 💡 Phát hiện (slide 33)

**Bố trí thí nghiệm rất sạch**: đưa `N` tài liệu vào context, trong đó **đúng 1 tài liệu chứa đáp án**, còn lại vô quan. Rồi **dời vị trí** tài liệu đúng và đo độ chính xác.

```
Accuracy
  75 │●                                                    ●
     │ ╲                                                  ╱
  65 │  ╲                                                ╱
     │   ╲──────────●────────●────────●─────────●───────╱
  55 │                                                        ← đường võng hình chữ U
     └────┬─────────┬────────┬────────┬─────────┬───────┬──
        1st       5th      10th     15th      20th    30th
              Vị trí của tài liệu chứa đáp án
```

🔑 **Đường cong hình chữ U.** Cùng một tài liệu, cùng một câu hỏi — chỉ **đổi chỗ** mà độ chính xác chênh tới **~20 điểm**. Đúng như slide viết: *"LLMs do not pay attention to its context well!"*

📌 Hiện tượng thấy ở **mọi model** được thử (claude-1.3, gpt-3.5-turbo, longchat, mpt-30b) và **càng nhiều tài liệu càng nặng**.

## 🔢 Hệ quả trực tiếp cho RAG (slide 34)

| Đường | Xu hướng theo số tài liệu |
|---|---|
| **Recall của retriever** (vàng) | **Tăng đều** tới ~90% khi lên 50 tài liệu |
| **Hiệu năng RAG** (các đường còn lại) | 🚩 **Bão hoà rất nhanh — sau 10–20 tài liệu** |

⇒ **Khoảng cách giữa hai đường chính là phần bị bỏ phí.** Retriever đã tìm được đáp án và đặt nó trong context, mà model **không dùng tới**.

## 🧩 Vì sao — nối thẳng về S07

Đây **không phải lỗi vặt của cài đặt**, mà là hệ quả của chính cơ chế attention:

- **Softmax là phép chọn MỀM nhưng vẫn là phép chọn.** Trọng số cộng lại bằng `1` — càng nhiều vị trí thì trung bình mỗi vị trí càng **loãng**. Xem [[attention-qkv]].
- **`O(T²)`** — đã ghi ở [[self-vs-cross-attention]]: chuỗi dài là chỗ đau của Transformer. Đây là **bằng chứng thực nghiệm** của cái giá đó.
- **Vị trí không được đối xử như nhau.** Token đầu (gần `[CLS]`/system prompt) và token cuối (gần chỗ sinh) có lợi thế; khúc giữa yếu nhất. Liên quan tới [[positional-encoding]].

🔑 **Bài học chung**: **cửa sổ context lớn là ĐIỀU KIỆN CẦN, không phải điều kiện đủ.** Model quảng cáo 100k token **không** có nghĩa là nó dùng được đều 100k token đó. Đừng chọn model chỉ theo con số context.

## ⚙️ Làm gì với nó

- [ ] **Đừng nhồi.** Lấy `top-5` đến `top-10` tài liệu chất lượng, đừng lấy `top-50`
- [ ] **Sắp lại VỊ TRÍ**: mạnh nhất ở **ĐẦU**, mạnh nhì ở **CUỐI**, yếu nhất dồn vào giữa — khai thác đúng hình chữ U. Miễn phí, chỉ là hoán vị list
- [ ] **Thêm tầng RE-RANK** để cắt từ 100 xuống 5 mà không mất tài liệu đúng → [[retrieve-rerank]] *(⚠️ đây là việc khác với sắp vị trí ở trên — xem note đó)*
- [ ] **Nén trước khi nhét**: tóm tắt / trích câu liên quan thay vì dán cả tài liệu
- [ ] **Đo, đừng đoán**: thử `k = 3, 5, 10, 20` rồi vẽ đường — điểm bão hoà **khác nhau theo bài**
- [ ] 🧪 **Tự kiểm chứng rẻ tiền**: lấy 1 tài liệu chứa đáp án, đặt lần lượt ở đầu / giữa / cuối, đo chênh lệch. Vài chục lệnh gọi API là ra

## ⚠️ Lỗi thường gặp

- 🚩 **Thấy RAG không lên điểm ⇒ đổ lỗi cho retriever.** Rất có thể retriever **đã tìm đúng** rồi mà tài liệu nằm ở khúc giữa. Phải đo tách bằng [[ragas]] trước khi kết luận.
- ⚠️ **Đây là kết quả năm 2023 trên các model thời đó.** Model mới có cải thiện, nhưng **hiện tượng không biến mất** — vẫn phải kiểm trên model mình đang dùng, đừng cho rằng đã hết.
- ⚠️ **Đừng suy diễn thành "context dài là vô dụng".** Nó **có ích**, chỉ là **lợi ích giảm dần** và không đều theo vị trí.

---

## 🔗 Liên kết
- **Tiền đề:** [[rag]]
- **Dẫn tới:** [[retrieve-rerank]] · [[prompt-engineering]]
- **Liên quan tới:** [[self-vs-cross-attention]] · [[attention-qkv]] · [[positional-encoding]] · [[ragas]] · [[sau-noi-so-ao-tuong]]

## 📚 Nguồn
- `Session08-PromptEngineering.pdf` slide 33–34
