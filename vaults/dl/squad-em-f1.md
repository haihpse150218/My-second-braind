---
slug: squad-em-f1
title: SQuAD & Exact Match / F1
vault: dl
type: concept
branch: I
order: 2
status: done
tags: [dl, nlp, qa, metric, s08]
prev: [question-answering]
next: [bert-span-extraction]
created: 2026-08-09
---

# SQuAD & Exact Match / F1

> Tóm tắt 1 câu: Bộ đọc-hiểu chuẩn mực nhất của NLP, và cặp metric `EM` (khắt khe) + `F1` (cho điểm một phần) — kèm bài học **"gần như đã giải xong" KHÔNG có nghĩa là bài toán đã giải xong**.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh I · #2 ← cần [[question-answering]] · → kế tiếp [[bert-span-extraction]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #qa #metric #s08

---

## 💡 SQuAD là gì (slide 21–22)

**Stanford Question Answering Dataset** — `100k` bộ ba **(passage, question, answer)**.

| Thành phần | Chi tiết |
|---|---|
| Đoạn văn | Wikipedia tiếng Anh, thường **100–150 từ** |
| Câu hỏi | **Crowd-sourced** (người thật viết) |
| Đáp án | 🔑 **Một đoạn (span) NẰM TRONG đoạn văn** |

- [ ] 📌 **Bài học đi kèm**: *"Large-scale supervised datasets are also a key ingredient for training effective neural models"* — kiến trúc không tự nhiên tốt lên, **dataset lớn có nhãn** mới là nguyên liệu.
- [ ] 🚩 **Hạn chế slide tự nêu**: *"not all the questions can be answered in this way!"* Ép đáp án phải là **span có sẵn** loại bỏ luôn: câu hỏi **yes/no**, câu cần **tổng hợp nhiều chỗ**, câu cần **tính toán**, câu **không có đáp án** trong đoạn.

## 🔢 Đánh giá: EM và F1 (slide 23)

| Metric | Cách tính | Tính chất |
|---|---|---|
| **Exact Match (EM)** | **0 hoặc 1** — trùng khít hay không | Rất khắt khe, không có điểm giữa |
| **F1** | Trùng nhau bao nhiêu **token** (precision/recall trên tập token) | **Cho điểm một phần** |

**Quy trình chấm (3 bước, dễ làm sai):**
1. Dev/test thu **3 đáp án vàng** — vì *"there could be multiple plausible answers"*
2. **Chuẩn hoá**: bỏ `a`, `an`, `the`, và dấu câu
3. So với **từng** đáp án vàng, **lấy điểm CAO NHẤT**, rồi **trung bình** trên toàn bộ mẫu

```
Q: Rather than taxation, what are private schools largely funded by?
A vàng: { tuition ,  charging their students tuition ,  tuition }

Dự đoán "tuition"                    → EM = 1 (khớp đáp án 1 và 3)
Dự đoán "charging students tuition"  → EM = 0, nhưng F1 CAO
```

🔑 **Vì sao phải lấy max qua nhiều đáp án**: cùng một ý đúng có nhiều cách diễn đạt. Chấm theo **một** đáp án là **phạt oan** model.

## 🧩 "Almost solved" — bài học lớn nhất của mục này

> Slide 22: SQuAD *"is 'almost solved' today (**though the underlying task is not**), and the state-of-the-art **exceeds the estimated human performance**."*

- [ ] 🚩 **Vượt điểm con người trên một benchmark ≠ hiểu ngôn ngữ như con người.** Model có thể khai thác **quy luật riêng của cách xây dataset** (câu hỏi crowd-source thường dùng lại từ trong đoạn ⇒ khớp từ khoá là ra).
- [ ] 📌 Đây đúng **"6 nỗi sợ ảo tưởng thành công"** ở quy mô cả một lĩnh vực: **con số đẹp trên benchmark, năng lực thật thì chưa.** Nhớ khi đọc bảng SOTA của bất cứ paper nào — xem [[sau-noi-so-ao-tuong]].

## ⚠️ Lỗi thường gặp

- ⚠️ **EM/F1 chỉ hợp bài trích SPAN.** Câu trả lời tự do / non-factoid phải dùng metric khác — xem [[metric-sinh-chuoi]] (BLEU sợ bịa · ROUGE sợ sót) hoặc [[llm-as-a-judge]].
- ⚠️ **F1 ở đây là F1 trên TOKEN của một câu trả lời**, không phải F1 phân loại nhị phân. Đừng nhầm với F1 ở bài classification.
- ⚠️ **Quên bước chuẩn hoá** (`a/an/the`, dấu câu) ⇒ EM tụt một cách vô lý mà không hiểu vì sao.
- 🚩 **Chỉ có 1 đáp án vàng** (hay gặp khi tự làm dataset tiếng Việt) ⇒ điểm thấp giả tạo. Nếu ngân sách gán nhãn hạn chế, ưu tiên **F1** hơn **EM**.

---

## 🔗 Liên kết
- **Tiền đề:** [[question-answering]]
- **Dẫn tới:** [[bert-span-extraction]]
- **Liên quan tới:** [[metric-sinh-chuoi]] · [[sau-noi-so-ao-tuong]] · [[llm-as-a-judge]]
- **Nguồn dataset tiếng Việt:** [[SECOND_BRAIN_DL]] → mục *🌐 Nguồn DATASET tiếng Việt* (UIT · VLSP)

## 📚 Nguồn
- `Session08-PromptEngineering.pdf` slide 21–23
