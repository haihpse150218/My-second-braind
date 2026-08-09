# 🧠 Second Brain — Deep Learning

> Trang trung tâm (Map of Content) của toàn bộ kiến thức Deep Learning.
> Từ đây liên kết tới mọi atomic note theo đúng thứ tự phụ thuộc.

**Cập nhật lần cuối:** 2026-08-09
**Trạng thái:** 🌱 Đang phát triển
**Nguồn đã học:** ✅ `Session01-Introduction.pdf` · ✅ `Session02-CNN-CaseStudy.pdf` · ✅ `Session03-ObjDetection.pdf` · ✅ `Session05-RNN.pdf` · ✅ `Session06-NLPWordEmbedding.pdf` · ✅ `Session07-Attention&Transformer.pdf` · ✅ `Session08-PromptEngineering.pdf`
**Quay lại:** [[../../hub/MASTER|🏠 MASTER]] · [[../../hub/map-lien-mon|🗺️ Bản đồ liên môn]]

> 🎯 **Kim chỉ nam DL** (khác ML — kiến trúc ở DL quan trọng hơn ở ML bảng):
> 1. **Data + pipeline đúng ăn đứt kiến trúc fancy** — CNN 225K param thắng AlexNet 30M param.
> 2. **Đọc error chart RỒI mới chọn thuốc** — underfit và overfit chữa ngược nhau.
> 3. **Ít data → transfer learning**, đừng train from scratch.
> 4. **Mạng học được sâu/dài là nhờ phép CỘNG, không phải phép nhân** — ResNet · LSTM · GRU · Transformer cùng một mẹo.

> 📋 **Checklist hành động khi làm bài thật:** `D:\MSA-FPT\DeepLearning\second-brain.md` — 9 phase từ xác định bài → data → augment → model → train → error chart → đánh giá.
> File này là **giải thích khái niệm**; file kia là **quy trình thao tác**. Không chép lẫn nhau.

---

## 🧭 Lộ trình đọc

### Nhánh A · Nền tảng NN & Backprop
1. [[hoc-sau-la-gi]] — DL khác ML ở đâu: tự học đặc trưng thay vì người gán
2. [[perceptron]] — đơn vị nhỏ nhất: tổ hợp tuyến tính + hàm kích hoạt
3. [[ham-kich-hoat]] — vì sao bắt buộc phi tuyến, không có thì mạng sâu vô nghĩa
4. [[relu-vs-sigmoid]] — ReLU thắng ở đâu, và cái giá dying ReLU
5. [[forward-pass]] — dữ liệu chảy xuôi qua mạng
6. [[loss-function-dl]] — MSE / Cross-Entropy: chọn theo dạng nhãn
7. [[gradient-descent-dl]] — đi ngược dốc để giảm loss
8. [[cac-loai-gradient-descent]] — batch · stochastic · mini-batch
9. [[backpropagation]] — chain rule đi ngược, gốc của mọi thứ
10. [[vanishing-gradient]] — chuỗi nhân đạo hàm teo dần theo độ sâu

### Nhánh B · CNN & kiến trúc thị giác
1. [[vi-sao-can-cnn]] — Dense trên ảnh nổ số tham số và mất cấu trúc không gian
2. [[phep-tich-chap]] — cửa sổ trượt, chia sẻ trọng số
3. [[filter-va-feature-map]] — filter học gì, feature map là gì
4. [[stride-padding]] — điều khiển kích thước đầu ra
5. [[pooling]] — 5 mục đích, không chỉ giảm size
6. [[kien-truc-cnn-4-tang]] — conv → activation → pooling → FC
7. [[flatten-vs-gap]] — GAP cắt được ~90% param của FC head
8. [[lenet]] — CNN kinh điển đầu tiên
9. [[alexnet]] — bước ngoặt ImageNet 2012
10. [[vgg]] — xếp 3×3, và bài học FC head phình
11. [[resnet]] — skip connection: đổi nhân thành cộng
12. [[batch-normalization]] — chuẩn hoá theo batch, và bẫy moving stats
13. [[transfer-learning]] — ít data thì đừng train from scratch
14. [[data-augmentation]] — dạy bất biến, nhưng phải hỏi "có đổi nhãn không?"

### Nhánh C · Detection & Segmentation
1. [[bon-muc-bai-toan-thi-giac]] — classification · semantic · detection · instance
2. [[classification-localization]] — 2 head song song, localization là regression
3. [[multitask-loss]] — cộng 2 loss khác đơn vị, λ là hyperparameter thật
4. [[vi-sao-multi-object-kho]] — số output thay đổi theo ảnh
5. [[selective-search]] — đề xuất vùng bằng thuật toán tay
6. [[rcnn]] — 2000 forward pass / 1 ảnh
7. [[fast-rcnn]] — chạy CNN 1 lần trên cả ảnh rồi crop trên feature map
8. [[faster-rcnn]] — RPN tự học đề xuất vùng
9. [[anchor-box]] — khung mẫu có sẵn, mạng chỉ học độ lệch
10. [[mask-rcnn]] — thêm nhánh mask + RoI Align
11. [[yolo-ssd]] — 1-stage, bỏ hẳn bước proposal
12. [[detr]] — detection bằng Transformer, không anchor không NMS
13. [[iou-nms-map]] — 3 khái niệm bắt buộc để đánh giá detection
14. [[focal-loss]] — chữa lệch foreground/background cực nặng
15. [[fpn]] — cứu vật nhỏ bị mất ở tầng sâu

### Nhánh D · Metric learning & Face
1. [[metric-learning-la-gi]] — học không gian nhúng, không học nhãn
2. [[face-verification-vs-recognition]] — 1:1 và 1:N là 2 bài khác nhau
3. [[contrastive-loss]] — cặp: kéo gần cùng lớp, đẩy xa khác lớp
4. [[triplet-loss]] — anchor · positive · negative + margin
5. [[hard-negative-mining]] — chọn cặp khó, nếu không loss về 0 mà chưa học gì
6. [[quadruplet-loss]] — thêm ràng buộc liên lớp
7. [[lifted-structured-loss]] — dùng hết cặp trong batch
8. [[n-pair-loss]] — 1 positive, N-1 negative
9. [[infonce-ntxent]] — nền của self-supervised (SimCLR, MoCo)
10. [[center-loss]] — kéo về tâm lớp, dùng KÈM softmax
11. [[arcface-cosface-sphereface]] — cùng một ý, khác chỗ đặt margin

### Nhánh E · Chuỗi · RNN · LSTM
1. [[rnn-la-gi]] — dữ liệu có thứ tự, rã ra N bước, mỗi bước 2 tín hiệu vào
2. [[rnn-cong-thuc]] — `h_t = tanh(W_hh·h_{t-1} + W_xh·x_t)`, weight sharing
3. [[rnn-uu-nhuoc]] — 3 điều kiện phải thoả mới nên dùng RNN
4. [[nam-dang-bai-sequence]] — one-to-one … seq2seq, quyết định shape output
5. [[padding-masking]] — 4 việc mà bài ảnh không có
6. [[trang-thai-khoi-dong-h0]] — `h_0` vs `<START>`, và chỗ tiêm ngữ cảnh
7. [[bptt]] — lan ngược qua thời gian
8. [[vanishing-gradient-rnn]] — bảng `γ^T`, vì sao `γ<1` là chết
9. [[exploding-gradient-clipnorm]] — anh em sinh đôi, chữa ngược lại
10. [[loi-tich-luy-chuoi-dai]] — `p^T`: mỗi từ đúng 95% ⇒ câu 20 từ chỉ 36%
11. [[cong-trong-rnn]] — vì sao phải chế ra gate
12. [[lstm-cell-state]] — băng chuyền chỉ có × và +
13. [[lstm-cong-quen]] — giữ lại bao nhiêu bộ nhớ cũ
14. [[lstm-cong-vao]] — ghi vào bao nhiêu, nội dung gì
15. [[lstm-cong-ra]] — nói ra phần nào của bộ nhớ
16. [[gru]] — bỏ cell state, còn 2 cổng
17. [[bidirectional-rnn]] — chỉ dùng khi có trọn chuỗi
18. [[stacked-rnn]] — xếp tầng, sâu thì cần skip
19. [[image-captioning]] — CNN encoder + RNN decoder
20. [[teacher-forcing]] — exposure bias: val loss đẹp mà caption rác
21. [[beam-search]] — giữ k câu ứng viên, chống sai-một-bước-hỏng-cả-câu
22. ⭐ [[thuc-hanh-imdb-simplernn]] — **bài chạy thật** của cả nhánh: SimpleRNN/IMDB đạt 79.4%, thua baseline TF-IDF

→ Nút thắt cổ chai của seq2seq được gỡ ở **Nhánh H**.

### Nhánh F · NLP & Word Embedding
1. [[bon-muc-nlp]] — phoneme → từ → cú pháp → ngữ cảnh
2. [[ba-doi-nlp]] — rule-based → statistical → neural
3. [[word-segmentation-tieng-viet]] — bẫy số 1 của tiếng Việt
4. [[one-hot-bag-of-words]] — 3 nhược điểm, gốc của mọi thứ sau
5. [[tf-idf]] — thống kê, giải thích được, vẫn sống tới nay
6. [[distributional-semantics]] — nghĩa nằm ở hàng xóm
7. [[ma-tran-dong-xuat-hien]] — đếm rồi phân rã (SVD/PCA)
8. [[word2vec]] — đoán rồi chỉnh; trọng số chính là sản phẩm
9. [[cbow-vs-skipgram]] — cùng cửa sổ, ngược chiều mũi tên
10. [[negative-sampling]] — vì sao softmax toàn vocab là bất khả thi
11. [[pretrained-embedding]] — Word2Vec/GloVe/fastText và `trainable`
12. [[danh-gia-embedding]] — intrinsic vs extrinsic
13. [[contextualized-embedding]] — một từ một vector là không đủ
14. ⭐ [[pipeline-text-to-tensor]] — ráp cả nhánh lại: chữ → số → nghĩa → thứ tự → quyết định

### Nhánh H · Attention & Transformer *(S07)*
> Mạch của cả nhánh: **gỡ nút thắt cổ chai** → **tổng quát hoá** cho tới khi không cần RNN nữa → **ráp thành Transformer** → **BERT**.

1. [[attention-qkv]] — bỏ nút thắt cổ chai, tra cứu mềm; `c_t = Σ α_{t,i} h_i`
2. [[alignment-score]] — 6 cách chấm điểm Q–K; additive (Bahdanau) vs dot-product (Luong/Vaswani)
3. ⭐ [[general-attention-layer]] — **Q/K/V ở đâu chui ra**: 5 bước tổng quát hoá thành self-attention
4. [[self-vs-cross-attention]] — self · cross · masked, và permutation equivariance
5. [[multi-head-attention]] — 8 đầu × 64 chiều = 1 đầu 512 chiều, nhưng 8 góc nhìn
6. [[positional-encoding]] — attention mù thứ tự; sinusoidal là bộ đếm nhị phân mượt
7. [[masked-self-attention]] — `−∞` trước softmax; causal mask ≠ padding mask
8. [[transformer-block]] — `Attn → Add&Norm → FF → Add&Norm`, ×N; Add chính là skip của ResNet
9. [[transformer-encoder-vs-decoder]] — khác **đúng 1 thứ: masking**; 3 họ kiến trúc
10. [[bert]] — MLM 15% (80/10/10) + NSP; token + segment + position
11. ⭐ [[show-attend-tell]] — attention cho captioning, heatmap để **debug định tính** (đồ án ViIC)

### Nhánh I · QA · RAG · Prompt Engineering *(S08)*
> Mạch: **hỏi đáp là gì** → **BERT trích span** → **LLM bịa** → **RAG** → **context dài vẫn hỏng** → **prompt cho tử tế**.
> 📌 Buổi thực dụng nhất: từ đây phần lớn công việc **không phải train model**, mà là **ghép hệ thống quanh model có sẵn**.

1. [[question-answering]] — 6 dạng QA phân theo **ngữ cảnh lấy từ đâu**; pipeline 4 tầng của Watson
2. [[squad-em-f1]] — EM khắt khe · F1 cho điểm một phần; và *"almost solved" ≠ bài toán đã giải*
3. [[bert-span-extraction]] — trích span = **2 bài phân loại vị trí**, head chỉ có 2 vector
4. [[rag]] — 4 bệnh của LLM; **non-parametric + parametric**; 4 cách thích nghi domain
5. ⭐ [[lost-in-the-middle]] — đường cong **chữ U**: context dài **≠** dùng được hết context
6. ⭐ [[retrieve-rerank]] — cái phễu 2 tầng: bi-encoder rẻ-và-rộng → cross-encoder đắt-và-tinh
7. [[prompt-engineering]] — *"refining a prompt **over time**"* — là vòng lặp có đo, không phải mẹo
8. [[few-shot-prompting]] — in-context learning: học mà **không đụng tham số nào**
9. [[chain-of-thought]] — **giấy nháp**; mua bước suy luận theo trục **ngang** thay vì chiều sâu
10. [[self-consistency]] — sample `k` đường rồi **bỏ phiếu**; cùng nguyên tắc với chạy nhiều seed
11. [[advanced-prompting]] — ToT · APE · Active · Generated Knowledge · Directional Stimulus

### Nhánh G · Thực chiến & pipeline *(xuyên suốt, không thuộc buổi nào)*
1. [[quy-trinh-9-buoc]] — mạch chính từ xác định bài tới test 1 lần
2. [[chia-train-val-test]] — stratified, và bẫy `validation_split` của Keras
3. [[chong-ro-ri-du-lieu]] — mọi thứ học từ dữ liệu phải học chỉ từ train
4. [[group-leakage]] — cùng đối tượng ở cả train lẫn test
5. [[hai-chot-dung-train]] — đừng ngồi chờ hết epoch
6. [[error-chart]] — train xong là vẽ, bắt buộc
7. [[underfit-vs-overfit]] — chữa ngược nhau, đọc chart rồi mới chọn thuốc
8. [[batch-size-va-learning-rate]] — linear scaling rule
9. [[callbacks-keras]] — EarlyStopping · ReduceLROnPlateau · ModelCheckpoint
10. [[sau-noi-so-ao-tuong]] — con số đẹp nhưng dối trá
11. [[bay-am-tham]] — code chạy ngon, metric có số, nhưng sai gốc
12. [[metric-sinh-chuoi]] — BLEU sợ bịa · ROUGE sợ sót · CIDEr cho caption
13. [[llm-as-a-judge]] — 6 thiên vị bắt buộc biết
14. [[ragas]] — tách lỗi retrieval vs generation
15. [[colab-workflow]] — validate rẻ trước, trả tiền sau

---

## 🔗 Tài nguyên khác trong repo

| Cần gì | Xem đâu |
|---|---|
| **Checklist hành động** khi làm bài thật | `D:\MSA-FPT\DeepLearning\second-brain.md` |
| Tóm tắt bài giảng theo buổi | `D:\MSA-FPT\DeepLearning\tom-tat-lectures.md` |
| Ghi chép thô + phần tự nghiên cứu | `D:\MSA-FPT\DeepLearning\note.md` |
| Họ loss metric learning (đầy đủ công thức) | `D:\MSA-FPT\DeepLearning\metric-learning-losses.md` |
| Paper (có paper của giảng viên) | `D:\MSA-FPT\DeepLearning\papers.md` |
| Sơ đồ tổng quan | `D:\MSA-FPT\DeepLearning\mindmap.md` |
| Code mẫu | `D:\MSA-FPT\DeepLearning\practices-code\*.ipynb` |
| Đồ án ViIC | `D:\MSA-FPT\DeepLearning\DoAn-ViIC\` |

## 🌐 Nguồn DATASET tiếng Việt *(ngoài repo)*

> Bài tiếng Việt hay tắc ngay bước đầu vì **không có data**. Tra 2 nguồn học thuật này TRƯỚC khi nghĩ tới tự crawl.

| Nguồn | Địa chỉ | Có gì |
|---|---|---|
| **UIT NLP Group** (ĐH CNTT – ĐHQG TP.HCM) | https://nlp.uit.edu.vn/datasets | Dataset gắn nhãn: **sentiment · QA · NLI · emotion · image captioning** — tiền tố `UIT-*`. 🎯 Là **nhà của `UIT-ViIC`**, bộ dùng cho đồ án |
| **VLSP** (Vietnamese Language and Speech Processing) | https://vlsp.org.vn/resources | Tài nguyên + **shared task** hằng năm: tách từ, POS, NER, dịch máy, tiếng nói |

**Công cụ đi kèm:**

| Công cụ | Địa chỉ | Dùng cho |
|---|---|---|
| **Neo4j** | https://neo4j.com/ | **Graph database** cho **Knowledge Base QA** — property graph + **Cypher**. Freebase (slide S08) đã đóng cửa 2016; muốn tự dựng đồ thị tri thức thì dùng cái này. Xem [[question-answering]] |

- ⭐ **Giá trị riêng của VLSP là có ĐỐI CHỨNG** — shared task công bố kết quả các đội ⇒ biết ngay điểm của mình **có nằm trong khoảng hợp lý không**. Không có mốc so sánh thì con số đẹp cũng chưa kết luận được gì.
- 🚩 Kiểm **giấy phép + cách trích dẫn** trước khi dùng — data học thuật thường yêu cầu đăng ký và trích dẫn đúng paper.
- ⚠️ Kiểm **đơn vị token** (âm tiết hay đã tách từ) trước khi nạp — trộn nhầm với PhoBERT là coverage sập âm thầm, xem [[word-segmentation-tieng-viet]] · [[pretrained-embedding]].

📋 Bản checklist đầy đủ: `D:\MSA-FPT\DeepLearning\second-brain.md` → mục **📚 NGUỒN DATASET TIẾNG VIỆT** (cuối nhánh NLP).

## 🔗 Sang môn Machine Learning
Vault **ML** trong cùng app (nút chuyển ở góc trên) — 72 note về toán nền, thống kê, thuật toán cổ điển.
