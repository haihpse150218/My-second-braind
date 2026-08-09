---
slug: retrieve-rerank
title: Retrieve → Re-rank — cái phễu 2 tầng của RAG
vault: dl
type: concept
branch: I
order: 6
status: done
tags: [dl, llm, rag, s08]
prev: [lost-in-the-middle]
next: [prompt-engineering]
created: 2026-08-09
---

# Retrieve → Re-rank — cái phễu 2 tầng của RAG

> Tóm tắt 1 câu: Một model **rẻ mà thô** quét cả kho lấy ~100 ứng viên, rồi một model **đắt mà tinh** chấm lại đúng 100 cái đó — vì model tinh không thể quét cả kho, còn model thô không đủ chính xác để chọn 5.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh I · #6 ← cần [[lost-in-the-middle]] · → kế tiếp [[prompt-engineering]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #llm #rag #s08

---

## ⚠️ Trước hết: HAI thứ khác nhau cùng tên "re-rank"

| | **① Re-rank như một TẦNG MODEL** | **② Sắp xếp lại VỊ TRÍ trong prompt** |
|---|---|---|
| Đổi cái gì | **CHỌN tài liệu nào** giữ lại | **ĐẶT tài liệu đã chọn ở đâu** |
| Vì sao | retriever rẻ nên chấm không chuẩn | [[lost-in-the-middle]] — đường cong chữ U |
| Chi phí | thêm một model | **miễn phí**, chỉ là hoán vị list |

Phải làm **cả hai**, nhưng chúng chữa **hai bệnh khác nhau**. Mục dưới đây nói về ① trước.

---

## 💡 ① Vì sao cần tầng re-rank — bài toán không thể tránh

Retriever phải **quét cả kho** (hàng triệu đoạn). Nên nó bị ép dùng kiến trúc rẻ, và cái rẻ đó **đánh đổi bằng độ chính xác**.

### Hai kiến trúc, hai thái cực

| | **Bi-encoder** (retriever) | **Cross-encoder** (reranker) |
|---|---|---|
| Cách mã hoá | Câu hỏi và tài liệu mã hoá **RIÊNG** → 2 vector → đo cosine | 🔑 **Ghép chung**: `[CLS] câu hỏi [SEP] tài liệu [SEP]` → self-attention **giữa hai bên** → 1 điểm |
| Tính trước được không | ✅ **Vector tài liệu tính sẵn offline**, nạp vào ANN index | ❌ **Không** — điểm phụ thuộc **cặp**, có câu hỏi mới biết |
| Giá mỗi truy vấn | 1 lần encode + tìm xấp xỉ | **1 lượt forward CHO MỖI CẶP** |
| Quét được 1M tài liệu? | ✅ có | ❌ **1 triệu forward / 1 câu hỏi** — bất khả thi |
| Độ chính xác | Thô | **Cao hơn hẳn** |

🔑 **Vì sao cross-encoder chính xác hơn — lý do nằm ở S07.** Bi-encoder nén cả tài liệu vào **một vector cố định TRƯỚC KHI biết câu hỏi** — đúng **nút thắt cổ chai** ở [[attention-qkv]], chỉ khác chỗ đặt. Cross-encoder cho token của câu hỏi **attend thẳng** vào token của tài liệu ⇒ phân biệt được những thứ mà cosine không thấy:

```
Câu hỏi:  "công ty A KIỆN công ty B"
Tài liệu: "công ty B kiện công ty A"

Bi-encoder   → hai vector gần như trùng nhau (cùng bộ từ)  ⇒ điểm cao, SAI
Cross-encoder→ attention thấy ai là chủ ngữ                ⇒ điểm thấp, ĐÚNG
```

## 🔢 Cái phễu

```
   1.000.000 đoạn
        │  bi-encoder — rẻ, xấp xỉ, ANN index          ← tối ưu RECALL
        ▼
      top-100                     (đừng cắt xuống 5 ở đây)
        │  cross-encoder — đắt, chấm từng cặp          ← tối ưu THỨ TỰ
        ▼
      top-5  ──sắp xếp vị trí ②──→  prompt  →  LLM
```

🔑 **Phân công lao động rất rõ:**

| Tầng | Nhiệm vụ | Sai kiểu nào thì chết |
|---|---|---|
| **Retriever** | **ĐỪNG BỎ SÓT** tài liệu đúng | Bỏ sót ⇒ **hết cứu** |
| **Reranker** | Đưa tài liệu đúng **lên đầu** | Xếp sai thứ tự ⇒ chỉ tệ đi, không mất |

⇒ **Tầng 1 đặt TRẦN cho cả hệ thống.** Tài liệu đúng không nằm trong top-100 thì reranker giỏi mấy cũng vô nghĩa. Vì thế **lấy rộng ở tầng 1, siết chặt ở tầng 2**.

## 🧩 Đây là mẹo cũ — đã gặp 3 lần rồi

📌 **Cùng đúng một khuôn "rẻ-và-rộng → đắt-và-tinh":**

| Chỗ | Tầng rẻ | Tầng đắt |
|---|---|---|
| **Detection** (D5) | [[selective-search]] / RPN đề xuất ~2000 vùng | CNN phân loại từng vùng — [[rcnn]] · [[faster-rcnn]] |
| **QA cổ điển** (slide 9) | *Candidate Answer Generation* | *Candidate Answer Scoring* — [[question-answering]] |
| **Sinh chuỗi** | giữ `k` ứng viên | chấm lại rồi chọn — [[beam-search]] |
| **RAG** | bi-encoder quét kho | cross-encoder chấm lại |

🔑 Nhận ra khuôn này thì retrieve→rerank **không phải khái niệm mới**, chỉ là **kiến trúc 2-stage của detection đặt sang bài text**. Và bài học đi kèm cũng y hệt: **tầng đề xuất quyết định trần, tầng chấm điểm quyết định chất lượng**.

---

## 💡 ② Sắp xếp lại VỊ TRÍ — chuyện hoàn toàn khác

Sau khi đã có top-5 xếp hạng `d1 > d2 > d3 > d4 > d5`, **đừng đổ vào prompt theo đúng thứ tự đó**.

Vì [[lost-in-the-middle]]: attention mạnh ở **đầu** và **cuối**, yếu ở **giữa**. Xếp `d1…d5` tuần tự thì `d2` — tài liệu mạnh thứ nhì — rơi đúng vùng chết.

```
❌ Tuần tự:   d1  d2  d3  d4  d5
                  └─ mạnh nhì mà nằm vùng yếu

✅ Kiểu "bánh mì kẹp":   d1  d3  d5  d4  d2
                         ↑           ↑
                    mạnh nhất    mạnh nhì
                    (đầu)        (cuối)
```

Đặt **mạnh nhất ở đầu**, **mạnh nhì ở cuối**, yếu nhất dồn vào giữa. Không tốn thêm một đồng nào — chỉ là hoán vị một list. LangChain có sẵn `LongContextReorder` làm đúng việc này.

## ⚙️ Con số khởi điểm

| Tham số | Giá trị | Ghi chú |
|---|---|---|
| `top-k` **retriever** | **50–100** | Rộng tay — đây là chỗ quyết định trần |
| `top-k` **sau rerank** | **3–10** | Siết chặt, tránh lost-in-the-middle |
| Reranker | cross-encoder MS MARCO, hoặc API rerank sẵn có | Model nhỏ (vài trăm MB) là đủ |
| Sắp xếp vị trí | mạnh nhất **đầu**, mạnh nhì **cuối** | Miễn phí, luôn bật |

- [ ] 🇻🇳 **Tiếng Việt**: cả bi-encoder lẫn cross-encoder phải là model **hỗ trợ tiếng Việt** (đa ngữ hoặc PhoBERT-based), và **đơn vị token phải khớp** — xem [[word-segmentation-tieng-viet]].

## ⚠️ Lỗi thường gặp

- 🚩 **Cắt xuống `top-5` ngay ở tầng retriever rồi mới rerank.** Rerank 5 cái thì gần như **vô ích** — không còn gì để chọn. Phải lấy rộng (50–100) mới có đất cho reranker làm việc.
- 🚩 **Thêm reranker nhưng vẫn nhét cả 50 tài liệu vào LLM.** Vậy là trả tiền cho tầng 2 mà **không thu lợi**: bệnh lost-in-the-middle vẫn nguyên. Rerank **là để cắt xuống ít hơn**.
- ⚠️ **Reranker thêm độ trễ.** Chấm 100 cặp là 100 forward — thường vài trăm ms. Chatbot thời gian thực thì cân nhắc `top-50` thay vì `top-100`.
- ⚠️ **Đừng dùng cùng một model cho cả 2 tầng.** Chạy bi-encoder hai lần **không phải rerank** — điểm y hệt, thứ tự y hệt, chỉ tốn thêm thời gian.
- 🚩 **Không đo tách 2 tầng.** Retriever tốt hay reranker tốt? Đo **recall@100** cho tầng 1 và **precision/MRR@5** cho tầng 2 — nếu recall@100 đã thấp thì **đừng đụng vào reranker**, sửa retriever trước. Cùng logic tách lỗi theo khâu của [[ragas]].
- ⚠️ **Chunking mới là gốc rễ.** Cắt tài liệu giữa câu / mất tiêu đề thì cả 2 tầng đều bó tay. Sửa chunking trước khi thêm model.

---

## 🔗 Liên kết
- **Tiền đề:** [[rag]] · [[lost-in-the-middle]]
- **Dẫn tới:** [[prompt-engineering]]
- **Liên quan tới:** [[selective-search]] · [[rcnn]] · [[faster-rcnn]] · [[beam-search]] · [[question-answering]] · [[ragas]] · [[attention-qkv]] · [[word-segmentation-tieng-viet]]

## 📚 Nguồn
- `Session08-PromptEngineering.pdf` slide 29–34 (retrieval, lost in the middle) — cấu trúc 2 tầng là kiến thức thực hành, slide chỉ nêu *"the retriever is key"*
