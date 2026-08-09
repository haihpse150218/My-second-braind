---
slug: thuc-hanh-imdb-simplernn
title: "Thực hành: SimpleRNN trên IMDB"
vault: dl
type: concept
branch: E
order: 25
status: done
tags: [dl, rnn, thuc-hanh, bang-chung]
prev: [stacked-rnn, padding-masking]
created: 2026-08-02
---

# Thực hành: SimpleRNN trên IMDB

> Tóm tắt 1 câu: Bài chạy thật của cả nhánh E — và kết quả `79.4%` cho thấy vanilla RNN **thua cả baseline TF-IDF cổ điển**.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh E · #25 ← cần [[stacked-rnn]] + [[padding-masking]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #rnn #thuc-hanh #bang-chung

---

> 📓 Nguồn: `D:\MSA-FPT\DeepLearning\practices-code\RNN_Text_Classification_Keras_IMDB.ipynb` — TF 2.20, Keras 3.13, GPU.

## 💡 Cấu hình

```
Input IDs (batch, 200)
  → Embedding(10000, 64, mask_zero=True)     640.000 param
  → SimpleRNN(64)                              8.256 param
  → Dropout(0.30)
  → Dense(1, sigmoid)                             65 param
                                    tổng: 648.321 param
```

`VOCAB_SIZE=10.000` · `MAX_LENGTH=200` · `BATCH=64` · Adam `1e-3` · train 20k / val 5k / test 25k

## 📊 Kết quả chạy thật

| Epoch | train_acc | train_loss | **val_loss** | val_acc |
|---|---|---|---|---|
| 1 | 0.6557 | 0.6202 | 0.4883 | 0.7766 |
| **2** | 0.7847 | 0.4668 | **0.4619** ⭐ đáy | 0.8114 |
| 3 | 0.8927 | 0.2690 | 0.4852 ↑ | 0.8286 |
| 4 | 0.9363 | 0.1717 | 0.5058 ↑ | 0.8232 |

EarlyStopping (`patience=2`) dừng ở epoch 4, `restore_best_weights` lấy lại **epoch 2**.

**Test: `accuracy 0.7938` · `loss 0.4884`**

| | |
|---|---|
| Precision | **0.8416** |
| Recall | **0.7239** |
| F1 | 0.7783 |

```
Confusion matrix
                pred_neg   pred_pos
true_neg          10797       1703
true_pos           3451       9049
```

## 🔑 4 điều đọc được từ bảng trên

**1. Overfit lộ rõ từ epoch 3** — train_loss lao từ `0.4668 → 0.2690` trong khi val_loss **ngóc lên** `0.4619 → 0.4852`. Đúng dạng "train xuống, val đi lên" ở [[error-chart]]. Epoch 4 train_acc `0.9363` mà val chẳng khá hơn ⇒ đang học thuộc.

**2. Model THIÊN VỀ đoán negative** — `FN = 3451` gấp **đôi** `FP = 1703`.
⇒ Bỏ sót **27,6%** review positive (`3451/12500`).
📌 IMDB **cân bằng 50/50**, nên đây **không phải lệch lớp** — mà là **bias của model + ngưỡng 0.5 chưa tối ưu**.
→ Đúng tình huống ở [[metric-sinh-chuoi]]/Phase 7: *Precision ≫ Recall ⇒ chỉnh NGƯỠNG trên validation*. Hạ threshold xuống ~0.4 gần như chắc chắn kéo F1 lên.

**3. `79.4%` là con số ĐÁNG THẤT VỌNG, không phải đáng mừng** —
`TF-IDF + LogisticRegression` trên IMDB là baseline kinh điển đạt **~88%** *(con số tham chiếu phổ biến, notebook này chưa chạy để đối chứng)*.
⇒ **Bằng chứng sống cho luật ở [[tf-idf]]**: data vừa phải thì baseline thống kê **thắng** deep learning. Notebook **không có baseline** nên nếu chỉ nhìn `79.4%` sẽ tưởng là ổn.

**4. Vì sao SimpleRNN yếu đúng như lý thuyết** — review IMDB dài trung bình **~230 token**, `MAX_LENGTH=200`. Mà vanilla RNN **mất sạch ngữ cảnh quá ~10 bước** ([[vanishing-gradient-rnn]]) ⇒ nó gần như **chỉ đọc được phần cuối review**.
→ Đổi sang [[lstm-cell-state]] / [[gru]] / [[bidirectional-rnn]] là hướng đúng (bài tập mở rộng #1–#3).

## ⚠️ 3 bẫy có thật trong notebook

| Bẫy | Vấn đề |
|---|---|
| 🚩 **`MODEL_PATH = "/content/..."`** | Lưu checkpoint vào `/content` trên Colab là **MẤT SẠCH** khi runtime ngắt → phải trỏ vào Drive. Đúng bẫy ở [[colab-workflow]] |
| 🚩 **Tokenizer lúc predict ≠ lúc train** | Notebook tự thừa nhận *"không hoàn toàn giống preprocessing gốc của IMDB"*. Đây là **train/serve skew** — câu mới bị encode theo luật khác với data train, dự đoán **không đáng tin** dù nhìn có vẻ hợp lý |
| 🚩 **Không có baseline** | Chưa chạy TF-IDF+SVM để đối chứng ⇒ không biết `79.4%` là tốt hay tệ. Xem [[quy-trinh-9-buoc]] |

## ✅ Những chỗ notebook làm ĐÚNG (đáng bắt chước)

- **Vẽ histogram độ dài review trước khi chọn `MAX_LENGTH`** — đúng bước 1 của [[padding-masking]]
- **`mask_zero=True`** — không bỏ quên masking
- Tự tách validation bằng shuffle + index, **không dùng `validation_split`** của Keras ([[chia-train-val-test]])
- **Set seed** cho `random`, `numpy`, `tf`
- Bộ 3 callbacks đầy đủ ([[callbacks-keras]]), `ReduceLROnPlateau(patience=1)` **nhỏ hơn** EarlyStopping(`patience=2`) → LR kịp giảm trước khi dừng
- Báo **confusion matrix + P/R/F1**, không chỉ accuracy
- **Xem review bị đoán sai** — mẫu #4 (`true=0, pred=1, p=0.8159`) là review chê phim nhưng đầy từ tích cực (*"I generally love this type of movie"*) → đúng loại lỗi mà bag-of-words và RNN ngắn hạn đều mắc

## 🎯 Việc nên làm tiếp

1. **Chạy baseline TF-IDF + LogisticRegression** — bắt buộc, để biết `79.4%` đứng ở đâu
2. Đổi `SimpleRNN` → `LSTM` → `BiLSTM`, giữ nguyên mọi thứ khác
3. **Quét threshold** `0.3–0.6` trên **validation**, chọn theo F1 rồi mới áp lên test
4. Sửa `MODEL_PATH` trỏ vào Drive
5. Dùng đúng tokenizer của IMDB khi predict câu mới

---

## 🔗 Liên kết
- **Tiền đề:** [[stacked-rnn]] · [[padding-masking]] · [[nam-dang-bai-sequence]]
- **Liên quan tới:** [[vanishing-gradient-rnn]] · [[error-chart]] · [[tf-idf]] · [[colab-workflow]] · [[callbacks-keras]]
