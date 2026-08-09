# 🧭 Lộ trình học xuyên môn

> Học theo thứ tự nào khi kiến thức nằm rải ở 5 vault.
> Lộ trình **trong từng vault** đã có ở hub của vault đó — trang này chỉ nói **thứ tự giữa các vault** và chỗ nào phải nhảy môn.

**Cập nhật:** 2026-08-09 · **Quay lại:** [[MASTER|🏠 MASTER]]

---

## Bức tranh lớn

```
   TOÁN NỀN                    LÀM ĐƯỢC VIỆC
   ml · nhánh A,B,C     ──►    ml · nhánh D  (90% công việc thật)
        │                            │
        ▼                            ▼
   THUẬT TOÁN                    HỌC SÂU
   ml · nhánh E,F       ──►    dl · nhánh A→I
        │                            │
        └──────────┬─────────────────┘
                   ▼
        CHUYÊN NGÀNH TÍN HIỆU/ẢNH
        dsp · ivp   (đang dựng)
                   │
                   ▼
        NGHIÊN CỨU
        nckh · 51 paper → luận văn
```

---

## Chặng 1 · Toán vừa đủ để hiểu — `ml` nhánh A · B · C

Mục tiêu: **hiểu model đang làm gì**, không phải tự chứng minh định lý.

| Ưu tiên | Nội dung | Ghi chú |
|---|---|---|
| 🔴 bắt buộc | Nhánh **C · Xác suất → Thống kê** (17 note) | Nhánh nặng nhất và đáng nhất. [[../vaults/ml/overfitting]] và [[../vaults/ml/suy-dien-hoc-may]] là hai note bản lề. |
| 🟡 nên | Nhánh **A · Giải tích → Tối ưu** (8 note) | Đủ để hiểu vì sao train được: đạo hàm → gradient → gradient descent. |
| 🟢 tuỳ | Nhánh **B · Đại số tuyến tính → PCA** (3 note) | Nối sang [[map-lien-mon]] mục *miền tần số*. |

> ⏭️ **Bỏ qua được nếu vội:** chứng minh chi tiết. Quay lại khi gặp lỗi thật cần nó.

## Chặng 2 · Lớp LÀM — `ml` nhánh D ⭐

**90% công việc thật nằm ở đây.** Nếu chỉ có thời gian cho một chặng, chọn chặng này.

[[../vaults/ml/xac-dinh-van-de]] → [[../vaults/ml/xu-ly-du-lieu]] → [[../vaults/ml/feature-engineering]] → [[../vaults/ml/chuan-hoa-du-lieu]] → [[../vaults/ml/encode-categorical]] → [[../vaults/ml/xu-ly-du-lieu-thieu]] → [[../vaults/ml/class-imbalance]] → [[../vaults/ml/feature-selection]]

Kèm quy trình thao tác: [[../vaults/ml/template-checklist]] (8 bước) và [[../vaults/ml/eda-checklist]].

> 💡 [[../projects/dsp-urbansound]] là ví dụ chặng này hỏng thì hỏng hết: shuffle sai bộ dữ liệu → rò rỉ → mọi điểm số phía sau vô nghĩa.

## Chặng 3 · Thuật toán — `ml` nhánh E · F

Từ [[../vaults/ml/decision-tree]] lên [[../vaults/ml/ensemble-learning]] → [[../vaults/ml/xgboost]] (chuẩn vàng cho dữ liệu bảng), rồi [[../vaults/ml/chon-mo-hinh]] để biết chọn cái nào.

Nhánh F là cầu sang học sâu: [[../vaults/ml/neural-network]] là note bản lề — đọc xong thì sang thẳng vault `dl`.

**🔀 Điểm nhảy môn:** [[../vaults/ml/neural-network]] → [[../vaults/dl/backpropagation]] (cùng một cơ chế, dl mổ xẻ kỹ hơn).

## Chặng 4 · Học sâu — `dl` nhánh A → I (123 note)

| Nhánh | Nội dung | Ghi chú |
|---|---|---|
| A | Nền tảng NN & Backprop | vào từ đây |
| B | CNN & kiến trúc thị giác | 🌉 nối sang `ivp` (xem [[map-lien-mon]]) |
| C | Detection & Segmentation | |
| D | Metric learning & Face | |
| E | Chuỗi · RNN · LSTM (22 note) | nhánh dài nhất |
| F | NLP & Word Embedding | |
| **H** | **Attention & Transformer** | 🔴 quan trọng nhất hiện nay |
| I | QA · RAG · Prompt Engineering | 🌉 nối sang `nckh` nhóm E |
| G | Thực chiến & pipeline | xuyên suốt, đọc rải rác |

> Nhánh E → H có mạch truyện rõ: RNN nghẽn cổ chai ở seq2seq → attention gỡ nghẽn → transformer bỏ hẳn hồi quy.

## Chặng 5 · Chuyên ngành — `dsp` · `ivp` 🌱

Hai vault này **chưa có note**, mới có khung + nguyên liệu trong `_inbox/`.

Thứ tự chưng cất nên theo (xem [[nguon-chua-xu-ly]]):
1. `ivp-tom-tat-lectures` — bảng thuật ngữ có sẵn, mỗi dòng ≈ 1 note, tách nhanh nhất
2. `ivp-mindmap-mo-rong` — đã cấu trúc theo chủ đề
3. `dsp501-phan-tich-tin-hieu` — FFT/STFT/ZCR/RMS, sát nhánh B và D của dsp
4. `dsp501-dataset` — fold & rò rỉ dữ liệu, nối thẳng về [[../vaults/ml/xu-ly-du-lieu]]

> 💡 Học chặng này **sau** `dl` thì dễ hơn nhiều: đã biết CNN học kernel rồi mới nhìn Sobel/Gaussian, sẽ thấy ngay chúng là cùng một thứ (xem [[map-lien-mon]] mục *tích chập*).

## Chặng 6 · Nghiên cứu — `nckh` (51 note)

Không đọc tuần tự. Vào [[../vaults/nckh/SECOND_BRAIN_NCKH]], chọn nhóm theo việc đang cần:

| Cần gì | Đọc nhóm |
|---|---|
| Hiểu kiến trúc agent | A · H |
| Thiết kế thực nghiệm / benchmark | C |
| Quản lý context, bộ nhớ | E |
| Tổng quan nhanh một mảng | S (surveys) |

Với mỗi paper, đọc **mục 10 — *Liên quan đến đề tài*** trước để quyết định có cần đọc bản đầy đủ không.

---

## Nếu chỉ có ít thời gian

| Có | Học gì |
|---|---|
| **1 buổi** | [[../vaults/ml/dinh-huong-hoc]] + [[../vaults/ml/template-checklist]] + [[../vaults/ml/chon-mo-hinh]] |
| **1 tuần** | Chặng 2 trọn vẹn (`ml` nhánh D) |
| **1 tháng** | Chặng 1 → 3, tức toàn vault `ml` |
| **1 kỳ** | Thêm `dl` nhánh A · B · E · H |

---

## Ôn tập

- Note đánh 🔁 **Cần ôn** — xem tab Dashboard trên web
- 47 note của `ml` còn 🟡 **Đang học** → đây là chỗ hổng lớn nhất hiện tại
- Cách kiểm tra thật sự hiểu: đọc mục `💡 Ý chính` rồi **gấp lại giải thích bằng lời mình**. Không giải thích được nghĩa là chưa nắm, đổi trạng thái về 🟡.
