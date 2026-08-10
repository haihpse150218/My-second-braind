---
slug: phan-loai-am-thanh
title: Pipeline phân loại âm thanh
vault: dsp
type: concept
branch: D
order: 6
status: learning
tags: [dsp, ung-dung, pipeline]
prev: [tien-nhan-manh]
next: [fold-va-ro-ri-du-lieu]
related: [mfcc, mel-spectrogram]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# Pipeline phân loại âm thanh

> Tóm tắt 1 câu: sóng âm → đặc trưng → model → nhãn; và câu hỏi trung tâm của project là **bước tiền xử lý DSP có đáng không**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #6 ← cần [[tien-nhan-manh]] · → kế tiếp [[fold-va-ro-ri-du-lieu]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #ung-dung #pipeline

---

## 💡 Hai pipeline được so sánh

```
Pipeline A (đối chứng):
  âm thanh thô ──────────────────────────→ đặc trưng → model → nhãn

Pipeline B (có DSP):
  âm thanh thô → FIR bandpass → pre-emphasis → chuẩn hoá → đặc trưng → model → nhãn
```

Hai nhánh **giống hệt nhau** ở mọi khâu, khác đúng một chỗ: có tiền xử lý DSP hay không. Đây là thiết kế thí nghiệm đúng — muốn quy kết khác biệt cho một yếu tố thì mọi yếu tố khác phải giữ nguyên.

## ⚙️ Ba model

| Model | Đầu vào | Thư viện | Ghi chú |
|---|---|---|---|
| **SVM** (RBF) | 931 chiều → StandardScaler → PCA(200) | scikit-learn | `C=10`; phải PCA vì RBF-SVM tốn `O(n²d)` |
| **Random Forest** | 931 chiều trực tiếp | scikit-learn | Không cần chuẩn hoá, không cần giảm chiều |
| **CNN-2D** | mel-spectrogram `(128,173)` | PyTorch | Học đặc trưng từ ảnh phổ |

Ba model đại diện ba cách tiếp cận khác nhau: [[ml/svm|biên tối đa]], [[ml/random-forest|ensemble cây]], và học sâu. Chọn nhiều model là để kết luận không phụ thuộc vào một thuật toán cụ thể.

## 💡 Kết quả — và vì sao nó đáng nhớ

> **Không có khác biệt có ý nghĩa thống kê giữa hai pipeline.** Mọi `p > 0,05`, mọi Cohen's `d < 0,2`.

Điều này **ngược với niềm tin phổ biến** rằng "dữ liệu sạch hơn → AI học tốt hơn". Và nó đáng chú ý hơn nữa vì DSP preprocessing **có** cải thiện chất lượng tín hiệu đo được (SNR `+4,5 dB` với `children_playing`).

**Giải thích:** bước trích đặc trưng **đã ngầm làm việc mà bộ lọc định làm**:

| Bộ lọc làm gì | Đặc trưng đã làm sẵn |
|---|---|
| Cắt dưới 50 Hz và trên 10 kHz | Mel filterbank cũng chỉ lấy `f_min=50`, `f_max=10.000` |
| Nâng tần số cao | Bước **log** trong [[mfcc]] đã nén dải động, giảm chênh lệch giữa các dải |
| Chuẩn hoá biên độ | StandardScaler chuẩn hoá lại từng chiều đặc trưng |

→ Pipeline B đang làm **hai lần** cùng một việc. Lần thứ hai không thêm gì.

**Bài học tổng quát:** trước khi thêm một bước tiền xử lý, hỏi *"bước sau đó có đã làm việc này chưa"*. Cải thiện chỉ số trung gian (SNR) **không đảm bảo** cải thiện chỉ số cuối (accuracy) — đúng bài học chọn đúng chỉ số ở [[ml/danh-gia-mo-hinh]].

## ⚙️ Cặp lớp dễ nhầm — giới hạn của đặc trưng phổ

| Cặp | Vì sao nhầm | Phân biệt bằng |
|---|---|---|
| `engine_idling` ↔ `air_conditioner` | Cùng dừng, cùng năng lượng tần số thấp | Băng thông: `226 Hz` vs `4.167 Hz` |
| `dog_bark` ↔ `drilling` | Cùng dải trội 2.756–5.512 Hz | Crest factor: `21,3` vs `5,4` |
| `children_playing` ↔ `street_music` | Cùng broadband, chồng lấn 345–2.412 Hz | RMS: chênh **12 lần** |
| `gun_shot` ↔ `car_horn` | Cùng không dừng, cùng xung nhọn | Gun: **một** xung; horn: **nhiều** xung lặp |

Đọc bảng này ngược lại thì thấy: **đặc trưng phổ đơn thuần không đủ**, phải kèm đặc trưng thời gian (crest factor, delta MFCC, mẫu ZCR). Confusion matrix sẽ dồn lỗi đúng vào các cặp này — và đó là dự đoán kiểm chứng được, không phải nhận xét chung chung.

## ⚠️ Điều dễ nhầm

- **"Không có khác biệt" ≠ "DSP vô dụng".** Kết luận chỉ đúng cho **bài toán này, dataset này, bộ đặc trưng này**. Với âm thanh nhiễu nặng hoặc đặc trưng thô sơ hơn, lọc rất có thể tạo khác biệt.
- **Không bác bỏ được giả thuyết ≠ chứng minh nó sai.** Xem [[so-sanh-thong-ke]].
- **Class imbalance ảnh hưởng tới accuracy.** `gun_shot` chỉ 374 mẫu so với 1.000 — accuracy tổng che mất kết quả kém ở lớp thiểu số. Xem [[ml/class-imbalance]].

---

## 🔗 Liên kết
- **Tiền đề:** [[tien-nhan-manh]] · [[mfcc]] · [[mel-spectrogram]]
- **Dẫn tới:** [[fold-va-ro-ri-du-lieu]] · [[so-sanh-thong-ke]]
- **Liên môn:** [[ml/danh-gia-mo-hinh]] · [[ml/svm]] · [[ml/random-forest]] · [[dl/vi-sao-can-cnn]]
- **Project:** [[../../projects/dsp-urbansound|📦 DSP UrbanSound8K]]

## ❓ Câu hỏi mở
- Nếu bỏ mel filterbank (dùng phổ tuyến tính thô) thì DSP preprocessing có bắt đầu tạo khác biệt không?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §1 · §5 · Abstract
