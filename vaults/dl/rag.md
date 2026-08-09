---
slug: rag
title: RAG — Retrieval Augmented Generation
vault: dl
type: concept
branch: I
order: 4
status: done
tags: [dl, nlp, qa, llm, s08]
prev: [bert-span-extraction]
next: [lost-in-the-middle]
created: 2026-08-09
---

# RAG — Retrieval Augmented Generation

> Tóm tắt 1 câu: Đừng bắt model **nhớ hết**; hãy **đưa đúng tài liệu cần thiết vào đúng lúc**, rồi để nó đọc và trả lời — kèm trích dẫn.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh I · #4 ← cần [[bert-span-extraction]] · → kế tiếp [[lost-in-the-middle]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #nlp #qa #llm #s08

---

## 🎯 Khung nhìn gọn nhất của cả buổi: NÚT THẮT ĐÃ DI CHUYỂN

```
Question + DOCS   →  đáp án        ✅ đã tốt      (đọc hiểu — SQuAD "almost solved")
Question + KHO    →  đáp án        🔴 chỗ tắc     (biết docs nào liên quan?)
                        ↑
              PHẦN KHÓ NẰM Ở ĐÂY
```

Một khi **"cho sẵn đoạn văn thì trả lời được"** đã giải xong ([[squad-em-f1]] — SOTA còn vượt điểm người), bài toán **không biến mất** mà **dời chỗ**: giờ khó ở khâu **tìm đúng đoạn văn để đưa vào**.

### Vì sao TÌM lại khó hơn ĐỌC

| | **Đọc** (đã có đoạn văn) | **Tìm** (có cả kho) |
|---|---|---|
| Không gian | 1 đoạn, ~150 từ | **hàng triệu** đoạn |
| Đã biết đáp án trông thế nào chưa | gần như thấy trước mắt | ❌ **chưa** — đó chính là thứ đang đi tìm |
| Ngân sách tính toán mỗi ứng viên | thoải mái (1 lượt BERT) | 🔑 **phải cực rẻ**, vì nhân với hàng triệu |

🔑 **Ràng buộc chi phí là gốc rễ.** Vì phải quét cả kho nên retriever **bị ép dùng kiến trúc yếu** (nén tài liệu thành **một vector, trước khi biết câu hỏi**). Chính ràng buộc đó đẻ ra ba khó khăn:

1. **Lệch từ vựng** — câu hỏi *"làm sao chống covid"*, tài liệu viết *"phòng ngừa lây nhiễm SARS-CoV-2"*. Không chung một từ nào mà cùng một ý.
2. **Câu hỏi nhiều bước** — đáp án nằm **rải ở nhiều tài liệu**, không cái nào một mình chứa đủ. Retriever chấm **từng tài liệu độc lập** nên không thấy được sự kết hợp.
3. **Con gà — quả trứng** — muốn biết tài liệu nào liên quan thì phải hiểu đáp án; muốn có đáp án thì phải đọc tài liệu.

### 📌 Đúng khuôn đã gặp ở nhánh THỊ GIÁC

| | Giải xong cái gì | Nút thắt dời sang đâu |
|---|---|---|
| **Vision** | phân loại ảnh (AlexNet, D3) | 🔑 **"nhìn ở ĐÂU"** → region proposal, cả cây R-CNN sinh ra để chữa (D5) |
| **NLP** | đọc hiểu (BERT + SQuAD) | 🔑 **"tìm ở ĐÂU"** → retrieval, RAG sinh ra để chữa |

**Cùng một câu chuyện, hai lĩnh vực.** Và cách chữa cũng cùng khuôn — cái phễu 2 tầng ở [[retrieve-rerank]].

### Đang chữa bằng gì

| Hướng | Ý |
|---|---|
| **Dense retrieval** | Học embedding **chuyên cho việc tìm** thay vì khớp từ khoá (DPR — có trong bảng slide 26) |
| **Hybrid** | Ghép **BM25 (khớp từ)** + **dense (khớp nghĩa)** — bắt cả hai kiểu trùng, chữa lệch từ vựng |
| **Re-rank** | Cross-encoder chấm lại top-100 → [[retrieve-rerank]] |
| **Viết lại câu hỏi** | Sinh câu trả lời **giả định** rồi dùng nó đi tìm — vì đáp án giống tài liệu hơn là câu hỏi giống tài liệu |
| **Truy xuất nhiều vòng** | Tìm → đọc → **tìm tiếp** dựa trên cái vừa đọc — chữa câu hỏi nhiều bước. Bản tinh vi nhất: **FLARE**, xem dưới |
| **Đồ thị tri thức** | Cấu trúc hoá quan hệ rồi **đi theo cạnh** thay vì đoán độ tương đồng — Neo4j, xem [[question-answering]] |

### 🔁 FLARE — Forward-Looking Active REtrieval *(EMNLP 2023, arXiv 2305.06983)*

RAG chuẩn **tìm ĐÚNG MỘT LẦN, dựa trên câu hỏi đầu vào**. Với hỏi đáp ngắn thì đủ. Với **sinh văn bản DÀI** thì hỏng, vì **nhu cầu thông tin THAY ĐỔI trong lúc viết** — thứ cần cho đoạn 3 không nằm trong câu hỏi ban đầu.

FLARE sửa hai câu hỏi mà RAG chuẩn trả lời cứng nhắc:

| | **RAG chuẩn** | **FLARE** |
|---|---|---|
| **KHI NÀO tìm** | đúng 1 lần, lúc đầu | 🔑 **khi model gặp token ĐỘ TIN CẬY THẤP** — tức lúc nó đang lúng túng |
| **Tìm bằng CÂU GÌ** | câu hỏi gốc | 🔑 **câu model SẮP viết** (tự sinh nháp trước), dùng chính nó làm truy vấn |

Vòng lặp: *sinh nháp câu tiếp theo → xem xác suất token → nếu thấp thì lấy câu nháp đó đi tìm → viết lại câu đó có tài liệu chống lưng.*

🔑 **Vì sao "lấy câu sắp viết làm truy vấn" mới là chỗ hay**: thứ cần tìm là về **cái sắp nói**, không phải **cái đã hỏi**. Và một **câu trả lời nháp** vốn **giống tài liệu đích** hơn nhiều so với một **câu hỏi** — hỏi và đáp dùng từ vựng khác nhau (đúng bệnh **lệch từ vựng** ở trên).

📌 **Cùng MỘT tín hiệu "model đang không chắc", dùng cho BA việc khác nhau** — đáng nhớ như một mẫu hình:

| Kỹ thuật | Đo độ không chắc bằng | Dùng nó để |
|---|---|---|
| [[self-consistency]] | mức **bất đồng giữa `k` lần chạy** | chọn **ĐÁP ÁN** |
| Active prompting ([[advanced-prompting]]) | mức bất đồng giữa `k` lần chạy | chọn **CHỖ ĐÁNG GÁN NHÃN** |
| **FLARE** | **xác suất token thấp** | chọn **LÚC ĐI TÌM** |

⚠️ **Cái giá**: cần **truy cập xác suất token** (logprobs) — nhiều API hộp đen **không trả về**, lúc đó FLARE không cài được. Và mỗi lần tìm giữa chừng là thêm độ trễ.

⚠️ **Nói cho chuẩn: không phải "chưa giải được", mà là "chỗ chứa phần lớn sai số".** Retrieval vẫn chạy được (slide 34: recall ~90% ở 50 tài liệu) — nhưng 10% còn lại là **hết cứu**, và 50 tài liệu thì **LLM không dùng nổi** ([[lost-in-the-middle]]). Đó mới là hình dạng thật của nút thắt.

---

## 💡 Bốn bệnh của "hỏi thẳng LLM" (slide 27–28)

LLM nhét được lượng kiến thức khổng lồ vào tham số. Nhưng:

1. **Không nhớ hết được** — tham số hữu hạn, thế giới thì không
2. **Thế giới thay đổi** — kiến thức đóng băng tại thời điểm train
3. **Không có tài liệu riêng của bạn** — nội bộ công ty, tài liệu chưa công bố
4. 🚩 **Hộp đen, không kiểm chứng được** — *"it produces an answer, but it's difficult to verify if the answer is correct"*

Ví dụ slide 27 rất đắt: hỏi *"Christopher Manning dạy ở đâu?"*, câu trả lời **nghe hoàn toàn hợp lý**, kèm cả trích dẫn — nhưng trích dẫn **sai**. **Bịa mà trông đáng tin** là dạng lỗi nguy hiểm nhất, đúng tinh thần [[sau-noi-so-ao-tuong]].

📌 So sánh nhức nhối: pipeline **IBM Watson** cổ điển ở [[question-answering]] trả về **kèm confidence**. LLM hiện đại giỏi hơn nhiều nhưng **mất đi tính năng đó**.

## 🔢 Lời giải: RETRIEVAL

> *"Instead of asking the LLM to memorize everything, can we provide the LLM with relevant and useful content **just-in-time**?"*

```
Câu hỏi ──→ [ Retriever ] ──tìm trong kho──→ tài liệu liên quan ──→ [ Reader/LLM ] ──→ Đáp án [1]
                  ↕                                                                        ↑
            Text Collection                                                    kèm TRÍCH DẪN
```

**Hai lợi ích slide nhấn mạnh:**

| | Vì sao quan trọng |
|---|---|
| **Dynamic** | Thêm/sửa tài liệu là xong — **không cần train lại** gì cả |
| **Interpretable** | Model sinh ra **con trỏ tới tài liệu nguồn** ⇒ người **kiểm chứng được** |

### Phả hệ

| Đời | Tên | Cách làm |
|---|---|---|
| 2017 | **DrQA** | `Document Retriever` (tìm trong Wikipedia) + `Document Reader` (trích span) — 2 khối **rời** |
| 2020 | **RAG** | `Query Encoder` → `Retriever p_η` (**non-parametric**, tìm bằng **MIPS** trên document index) → `Generator p_θ` (**parametric**) → **marginalize** qua các tài liệu. 🔑 **Backprop end-to-end xuyên qua cả `q` lẫn `p_θ`** |

- [ ] 🔑 **Cặp khái niệm đáng nhớ**: **non-parametric** (kho tài liệu — sửa được tức thì) + **parametric** (trọng số model — muốn sửa phải train). RAG = ghép hai loại bộ nhớ, mỗi loại làm đúng việc nó giỏi.
- [ ] RAG không chỉ cho QA: slide 30 cho thấy cùng kiến trúc dùng được cho **fact verification** và **question generation**.

## ⚙️ 4 cách làm LLM đúng hơn với một lĩnh vực (slide 37)

| Cách | Làm gì | Khi nào |
|---|---|---|
| **Simple Prompting** | Chỉ sửa prompt | Rẻ nhất, **luôn thử trước** |
| **Finetuned Generation** | Train tiếp trên dataset của bài | Cần **đổi văn phong/định dạng/hành vi** |
| **Simple RAG** | Truy xuất rồi nhét vào prompt | Cần **kiến thức mới / riêng tư / hay đổi** |
| **Adaptive RAG (Chain)** | **Fine-tune + RAG** kết hợp | Cần cả hai |

- [ ] 🔑 **Chọn theo bản chất vấn đề, không theo độ "xịn"**: thiếu **kiến thức** → **RAG**. Sai **hành vi/định dạng** → **fine-tune**. Fine-tune để nhồi kiến thức là **đắt và vẫn lỗi thời**; RAG để dạy văn phong thì **không ăn thua**.

## ⚠️ Lỗi thường gặp

- 🚩 **Nhét càng nhiều tài liệu càng tốt — SAI.** Xem [[lost-in-the-middle]]: hiệu năng **bão hoà sau 10–20 tài liệu** trong khi recall của retriever vẫn đang tăng. Đây là bẫy lớn nhất khi làm RAG.
- 🚩 **Không tách được lỗi retrieval hay lỗi generation.** Trả lời sai có thể do (a) tìm nhầm tài liệu, hoặc (b) tìm đúng mà đọc sai. Đo tách ra bằng [[ragas]] — cùng logic tách lỗi theo khâu như heatmap ở [[show-attend-tell]].
- ⚠️ **RAG không tự động hết bịa.** Nếu tài liệu truy xuất **không chứa** đáp án mà prompt không cho phép nói *"không biết"*, model vẫn bịa như thường. Phải ghi rõ trong prompt: *"chỉ dùng tài liệu được cung cấp; không có thì trả lời không tìm thấy"* — đúng cách slide 32 viết: *"using **only** the provided search results (some of which might be irrelevant)"*.
- ⚠️ **Chất lượng retriever là trần của cả hệ thống.** Slide 32: *"if we have to use only 1 document, then we have to get that right."* Reader giỏi mấy cũng không cứu được tài liệu sai.
- 🇻🇳 **Tiếng Việt**: embedding để tìm kiếm phải hợp tiếng Việt, và **đơn vị token phải khớp** — xem [[word-segmentation-tieng-viet]].

---

## 🔗 Liên kết
- **Tiền đề:** [[bert-span-extraction]] · [[question-answering]]
- **Dẫn tới:** [[lost-in-the-middle]] · [[prompt-engineering]]
- **Liên quan tới:** [[ragas]] · [[sau-noi-so-ao-tuong]] · [[llm-as-a-judge]] · [[transfer-learning]]

## 📚 Nguồn
- `Session08-PromptEngineering.pdf` slide 16, 26–32, 37
