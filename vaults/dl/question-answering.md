---
slug: question-answering
title: "Question Answering — 6 dạng, phân theo NGỮ CẢNH"
vault: dl
type: concept
branch: I
order: 1
status: done
tags: [dl, nlp, qa, s08]
prev: [bert]
next: [squad-em-f1]
created: 2026-08-09
---

# Question Answering — 6 dạng, phân theo NGỮ CẢNH

> Tóm tắt 1 câu: `Câu hỏi → Câu trả lời`. Nghe đơn giản, nhưng **"trả lời từ đâu"** mới là thứ quyết định kiến trúc — và đó là trục phân loại đúng.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh I · #1 ← cần [[bert]] · → kế tiếp [[squad-em-f1]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #qa #s08

---

## 💡 Vì sao QA quan trọng hơn vẻ ngoài của nó

> **Wendy Lehnert 1977**: *"Since questions can be devised to query any aspect of text comprehension, the ability to answer questions is the **strongest possible demonstration of understanding**."*

Câu hỏi có thể hỏi **bất cứ khía cạnh nào** của một văn bản ⇒ trả lời được là bằng chứng mạnh nhất về việc hiểu. Vì thế QA là **testbed**, không chỉ là một ứng dụng.

📌 Slide 20 cho thấy **nhiều bài NLP khác quy được về QA**:
- **Information extraction**: `(Barack Obama, educated_at, ?)` → hỏi *"Where did Barack Obama graduate from?"*
- **Semantic role labeling**: *"Who finished something?"* · *"What did someone finish?"*

## 🔢 Hai trục phân loại

### Trục 1 — Loại câu hỏi

| | **Factoid** | **Non-factoid** |
|---|---|---|
| Hỏi gì | **Sự kiện** có đáp án xác định | Chủ đề, ý nghĩa, tạo sinh nội dung |
| Ví dụ | *"5 ngọn núi cao nhất Trái Đất?"* | *"Chủ đề và biểu tượng trong 'The Raven'?"* · *"Viết CV cho tôi"* |
| Chấm điểm | Dễ — so với đáp án | **Khó** — không có một đáp án đúng |

### Trục 2 — NGỮ CẢNH lấy từ đâu ⭐ (trục quan trọng, quyết định kiến trúc)

| Dạng | Ngữ cảnh | Cách làm |
|---|---|---|
| **Textual QA** (reading comprehension) | **1 đoạn văn cho sẵn** | Trích **span** trong đoạn → [[bert-span-extraction]] |
| **Conversational QA** | Đoạn văn + **lịch sử hội thoại** | 🔑 Phải giải **đại từ qua các lượt**: *"Where?"* · *"his opponent"* · *"which of **them**?"* — chính là coreference resolution ở E0 |
| **Long-form QA** | Đoạn văn | Trả lời dài. **Extractive** (trích nguyên) vs **Abstractive** (viết lại) — cùng phân đôi với summarization ở E0 |
| **Open-domain QA** | **Cả kho / cả web** | Phải **tìm** trước rồi mới đọc → [[rag]] |
| **Knowledge Base QA** | **Đồ thị tri thức** (Freebase: 100M node, 1B cạnh) | **Semantic parsing**: câu hỏi → truy vấn logic → thực thi |
| **Table-based QA** | **Bảng bán cấu trúc** | Suy luận trên dòng/cột |
| **Visual QA** | **Ảnh** | Nối thẳng đồ án — cùng họ với [[show-attend-tell]] |

⚠️ **Lỗi nhãn trong slide**: slide 19 tiêu đề *"Table-based Question Answering"* nhưng nội dung là **Visual QA** (ảnh + ChatGPT). Đọc theo nội dung, đừng theo tiêu đề.

### 🕸️ Knowledge Base QA trong thực tế — công cụ

Slide 17 dùng **Freebase** làm minh hoạ (100M node, 1B cạnh) nhưng Freebase **đã đóng cửa từ 2016**. Muốn tự dựng đồ thị tri thức thì cần một **graph database**:

| Công cụ | Địa chỉ | Ghi chú |
|---|---|---|
| **Neo4j** | https://neo4j.com/ | Graph DB phổ biến nhất; mô hình **property graph** (node – quan hệ – thuộc tính), truy vấn bằng **Cypher**. Có bản community miễn phí và bản cloud dùng thử |

- **Vì sao hợp với KBQA**: dữ liệu của slide 17 (`MichelleObama --Spouse--> BarackObama --PlaceOfBirth--> Honolulu`) chính là **property graph**. Câu hỏi nhiều bước (*"vợ của tổng thống sinh ở Honolulu sống ở đâu?"*) là **đi theo cạnh** — thứ graph DB làm rất nhanh, còn SQL phải `JOIN` chồng chất.
- **Mạch semantic parsing thành ra**: `câu hỏi tiếng người` → **LLM sinh câu Cypher** → chạy trên Neo4j → kết quả. Đây là bản hiện đại của *"semantic parsing → execute"* ở slide 17, chỉ khác là khâu parsing giờ do LLM làm.
- 🔑 **Ưu điểm so với [[rag]] thuần vector**: kết quả **chính xác và kiểm chứng được** (truy vấn có kết quả xác định, không phải "tìm đoạn văn na ná"), và **đi được nhiều bước quan hệ** — chỗ mà tìm kiếm theo độ tương đồng hay hụt.
- ⚠️ **Cái giá**: phải **xây được đồ thị trước**. Trích xuất thực thể + quan hệ từ văn bản thô là cả một bài toán (chính là *information extraction* ở trên). Đồ thị sai thì truy vấn đúng vẫn ra đáp án sai.

## 🧩 Kiến trúc kinh điển — IBM Watson thắng Jeopardy (slide 9)

Trước kỷ nguyên deep learning, QA là một **pipeline 4 tầng**:

```
(1) Question Processing  →  (2) Candidate Answer Generation
      focus detection             từ text: retrieve → extract
      answer type detection       từ structured data: DBpedia, Freebase
      parsing, NER, coreference          ↓
                              (3) Candidate Answer Scoring
                                    evidence retrieval + scoring
                                         ↓
                              (4) Confidence Merging & Ranking
                                    → Answer + Confidence
```

- [ ] 📌 **Đáng nhớ vì 2 lý do**: (a) nó **sinh nhiều ứng viên rồi mới chấm điểm** — cùng tinh thần [[beam-search]] và [[self-consistency]]; (b) nó **trả về kèm độ tin cậy**, thứ mà LLM ngày nay lại **không** có — xem [[rag]].

## ⚙️ Kỷ nguyên deep learning

> *"Almost all the state-of-the-art QA systems are built on top of end-to-end training and pre-trained language models (e.g., BERT)!"*

Cách nạp vào BERT — đúng cấu trúc 2 câu đã học ở [[bert]]:
```
[CLS]  How many parameters does BERT-large have?  [SEP]  BERT-large is really big... [SEP]
       └────────── Question (segment A) ─────────┘       └──── Reference (segment B) ────┘
```
Toàn bộ pipeline 4 tầng của Watson **gói lại thành một model duy nhất**.

## ⚠️ Lỗi thường gặp

- ⚠️ **Chốt sai dạng QA là chọn sai kiến trúc.** Có sẵn đoạn văn → span extraction là đủ. Phải tìm trong kho → **bắt buộc** có retriever, thêm cả một hệ thống nữa.
- 🚩 **Non-factoid không đo được bằng EM/F1.** Nhiều bài dùng nhầm metric của factoid cho câu trả lời tự do rồi kết luận sai — xem [[squad-em-f1]] và [[metric-sinh-chuoi]].
- ⚠️ **Conversational QA không phải QA lặp lại nhiều lần.** Câu hỏi thứ 2 thường **không đứng một mình được** (*"Where?"*). Phải nạp lịch sử, hoặc viết lại câu hỏi thành dạng độc lập trước.

---

## 🔗 Liên kết
- **Tiền đề:** [[bert]] · [[transformer-encoder-vs-decoder]]
- **Dẫn tới:** [[squad-em-f1]] · [[bert-span-extraction]] · [[rag]]
- **Liên quan tới:** [[show-attend-tell]] · [[beam-search]] · [[metric-sinh-chuoi]]

## 📚 Nguồn
- `Session08-PromptEngineering.pdf` slide 4–20
