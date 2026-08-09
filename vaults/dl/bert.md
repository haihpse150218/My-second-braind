---
slug: bert
title: BERT — Bidirectional Encoder Representations from Transformers
vault: dl
type: concept
branch: H
order: 10
status: done
tags: [dl, transformer, nlp, s07]
prev: [transformer-encoder-vs-decoder]
next: [show-attend-tell]
created: 2026-08-09
---

# BERT — Bidirectional Encoder Representations from Transformers

> Tóm tắt 1 câu: Lấy **encoder** Transformer (không mask ⇒ nhìn được 2 phía), pre-train trên corpus **không nhãn** bằng 2 nhiệm vụ tự chế, rồi fine-tune cho bài cụ thể.

**Ngày tạo:** 2026-08-09
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh H · #10 ← cần [[transformer-encoder-vs-decoder]] · → kế tiếp [[show-attend-tell]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #transformer #nlp #s07

---

## 💡 Bệnh nó chữa

Nối thẳng vào [[contextualized-embedding]] và nhược điểm chí mạng của [[word2vec]]:

> **Một từ chỉ có MỘT vector, không đổi theo ngữ cảnh.**

Slide 45 minh hoạ bằng `banking` trong 3 câu khác nhau, và `mouse` (con chuột / chuột máy tính). Word2Vec/GloVe chỉ **nhớ lịch sử xuất hiện** của từ trong corpus, không biết câu hiện tại đang nói gì.

## 🧩 Ba lời giải trước BERT — và vì sao chưa đủ (slide 46)

| Model | Cách | Vấn đề |
|---|---|---|
| **OpenAI GPT** (2018) | Transformer decoder, **fine-tuning approach** | Chỉ nhìn **trái sang phải** |
| **ELMo** (2018) | 2 LSTM ngược chiều, **feature-based approach** | 2 chiều **học rời rạc rồi nối lại**, không phải 2 chiều thật |
| **BERT** (2018) | Transformer **encoder** | ✅ mỗi từ thấy **cả 2 phía cùng lúc** |

> *"Language models only use left context or right context, but language understanding is bidirectional."*

🔑 **Vì sao trước đó không ai làm 2 chiều thật?** Vì nhiệm vụ pre-train truyền thống là **đoán từ tiếp theo** — mà nếu cho nhìn 2 phía thì từ cần đoán **đã nằm trong input**, model chỉ việc chép. Bế tắc này chính là thứ **Masked LM** gỡ ra.

## 🔢 Hai bước

```
BƯỚC 1 — PRE-TRAIN (corpus không nhãn, rất đắt, làm 1 lần)
   Task #1: Masked LM        Task #2: Next Sentence Prediction

BƯỚC 2 — FINE-TUNE (data có nhãn của mình, rẻ)
   MNLI · NER · SQuAD · sentiment …  → thay head, train tiếp vài epoch
```

### 🔗 Masked LM CHÍNH LÀ CBOW, phóng to lên

Đây không phải nhiệm vụ mới. Nhìn lại [[cbow-vs-skipgram]]:

| | **CBOW** (2013) | **Masked LM** (2018) |
|---|---|---|
| Nhiệm vụ | Che từ giữa, **đoán nó từ hàng xóm** | Che 15% từ, **đoán chúng từ phần còn lại** |
| Ngữ cảnh dùng | **cửa sổ cố định** (±5 từ) | **cả câu / cả đoạn** |
| Model | 1 lớp chiếu **nông** | **12–24 tầng** Transformer |
| Sản phẩm | **ma trận embedding tĩnh** — 1 từ 1 vector | **activation theo ngữ cảnh** — 1 từ n vector |

🔑 **Cùng một mẹo, khác quy mô.** Cả hai đều là **bài điền vào chỗ trống** — cách kinh điển để chế ra nhãn từ dữ liệu **không nhãn** (self-supervised). Cái BERT đổi không phải *ý tưởng*, mà là **cửa sổ → cả câu** và **nông → sâu**. Chính hai thứ đó biến "một từ một vector" thành "một từ n vector".

📌 Nhớ được cái này thì BERT không phải khái niệm mới, chỉ là **[[distributional-semantics]] chạy trên kiến trúc mạnh hơn**: *nghĩa nằm ở hàng xóm* — giờ hàng xóm là **cả câu**, và cách đọc hàng xóm là **self-attention**.

### Task #1 — Masked LM (slide 48)

Che **15%** số từ rồi bắt đoán lại:
```
the man went to the [MASK] to buy a [MASK] of milk
                    store              gallon
```

🚩 **Vấn đề**: token `[MASK]` **chỉ tồn tại lúc pre-train**, lúc fine-tune không bao giờ xuất hiện ⇒ **lệch phân phối train/dùng thật**.

✅ **Giải pháp — trong 15% từ được chọn:**

| Tỉ lệ | Làm gì | Vì sao |
|---|---|---|
| **80%** | thay bằng `[MASK]` | nhiệm vụ chính |
| **10%** | thay bằng **từ ngẫu nhiên** | buộc model **không tin mù** vào token đang thấy, phải kiểm bằng ngữ cảnh |
| **10%** | **giữ nguyên** | buộc model vẫn phải biểu diễn tốt cả token **không bị che** |

❓ **Vì sao đúng 15%?** Một đánh đổi hai đầu:

| Che quá **ít** (vd 2%) | Che quá **nhiều** (vd 50%) |
|---|---|
| Loss **chỉ tính trên ô bị che** ⇒ mỗi lần forward chỉ thu được tín hiệu từ 2% số token | Còn quá ít ngữ cảnh để mà suy ra |
| ⇒ **Cực kỳ tốn compute** cho cùng lượng tín hiệu học | ⇒ Bài trở nên **bất khả thi**, model học đoán bừa theo tần suất |

🔑 **Đây là nhược điểm cố hữu của MLM so với language model thường**: LM nhân quả lấy được tín hiệu từ **100%** vị trí mỗi lần forward, MLM chỉ **15%** ⇒ BERT **đắt hơn nhiều** cho cùng một lượng học. 15% là điểm ngọt **tìm bằng thực nghiệm**, không có công thức.

### Task #2 — Next Sentence Prediction (slide 49)

Bài **phân loại nhị phân**: câu B có thật sự đứng sau câu A không?

| Câu A | Câu B | Nhãn |
|---|---|---|
| *I am going outside.* | *I will be back after 6.* | ✅ YES |
| *I am going outside.* | *You know nothing John Snow.* | ❌ NO |

Mục đích: học **quan hệ giữa hai câu** — thứ MLM (làm việc trong một câu) không dạy được. Cần cho QA và inference.

### Input embedding = cộng 3 lớp (slide 50)

```
Input:     [CLS]  my  dog  is  cute  [SEP]  he  likes  play  ##ing  [SEP]
Token   :   E_[CLS] E_my …                        ← từ nào
      +
Segment :   E_A  E_A  E_A  E_A  E_A  E_A   E_B  E_B  …   ← câu A hay câu B
      +
Position:   E_0  E_1  E_2  E_3  E_4  E_5   E_6  E_7  …   ← vị trí thứ mấy
```

| Token đặc biệt | Vai trò |
|---|---|
| `[CLS]` | đứng đầu; vector của nó dùng làm **đại diện cả câu** cho bài phân loại |
| `[SEP]` | ngăn 2 câu |
| `##ing` | **WordPiece** — từ hiếm bị chẻ thành mảnh ⇒ **không còn OOV**, giải quyết nốt vấn đề `<UNK>` ở [[one-hot-bag-of-words]] |

📌 Lớp **Position** chính là [[positional-encoding]] dạng **learned** (bảng tra), không phải sin/cos.

## ⚙️ Ứng dụng — tiếng Việt

- **PhoBERT** = BERT train trên tiếng Việt. 🚩 **Bắt buộc input đã tách từ** — xem [[word-segmentation-tieng-viet]]. Đưa text thô vào: **không lỗi, chỉ kém hẳn**.
- Thứ tự làm việc chuẩn cho một bài NLP tiếng Việt: `tách từ` → `TF-IDF + SVM (baseline)` → `embedding + BiLSTM` → `PhoBERT fine-tune`. Ghi điểm cả 3 mức — đó là phần "so sánh kiến trúc" rubric luôn hỏi.

## ⚠️ Lỗi thường gặp

- ⚠️ **Fine-tune LR quá cao.** BERT fine-tune dùng `2e-5 … 5e-5`, **không phải** `1e-3`. Đặt cao ⇒ **catastrophic forgetting**, phá nát trọng số pretrain, val tụt sau 1–2 epoch. Cùng họ với bẫy `trainable=True` ở [[pretrained-embedding]].
- ⚠️ **Dùng `[CLS]` thô làm câu-embedding để tính cosine similarity** — nghe hợp lý nhưng **kết quả rất tệ**. `[CLS]` chỉ có nghĩa **sau khi đã fine-tune** cho một bài phân loại. Muốn embedding câu thì dùng model kiểu **Sentence-BERT** hoặc mean-pooling.
- ⚠️ **NSP về sau bị bác bỏ.** RoBERTa cho thấy **bỏ NSP đi lại tốt hơn** — nhiệm vụ này quá dễ, model chỉ cần đoán "hai câu có cùng chủ đề không". Ghi nhớ như một ví dụ: **thiết kế nghe hợp lý vẫn phải đo mới biết**.
- ⚠️ **BERT không sinh chuỗi được** — nó là encoder-only. Xem [[transformer-encoder-vs-decoder]].
- 🚩 **Đói data + đắt**: fine-tune vẫn cần vài nghìn mẫu có nhãn. Data vài trăm mẫu thì [[tf-idf]] + SVM rất hay thắng — kiểm baseline trước khi đổ tiền GPU.

---

## 🔗 Liên kết
- **Tiền đề:** [[transformer-encoder-vs-decoder]] · [[contextualized-embedding]]
- **Dẫn tới:** [[show-attend-tell]]
- **Liên quan tới:** [[word2vec]] · [[pretrained-embedding]] · [[word-segmentation-tieng-viet]] · [[positional-encoding]] · [[transfer-learning]]

## 📚 Nguồn
- `Session07-Attention&Transformer.pdf` slide 44–50
