---
slug: dac-trung-pho
title: Đặc trưng phổ
vault: dsp
type: concept
branch: D
order: 2
status: learning
tags: [dsp, dac-trung]
prev: [zcr-rms]
next: [mel-spectrogram]
related: [bien-doi-fourier, mfcc]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# Đặc trưng phổ

> Tóm tắt 1 câu: mô tả **hình dạng phổ** bằng vài con số — trọng tâm ở đâu, rộng bao nhiêu, giống tiếng động hay giống nốt nhạc.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #2 ← cần [[zcr-rms]] · → kế tiếp [[mel-spectrogram]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #dac-trung

---

## 💡 Bảng đặc trưng

| Đặc trưng | Đo cái gì | Trực giác |
|---|---|---|
| **Spectral centroid** | **Trọng tâm** của phổ | "Độ sáng" của âm thanh — cao = chói, thấp = trầm |
| **Spectral bandwidth** | Độ **trải rộng** quanh trọng tâm | Hẹp = tonal, rộng = noise-like |
| **Spectral rolloff** | Tần số dưới đó chứa 85% năng lượng | Ranh giới trên của nội dung có ích |
| **Spectral flatness** | Phổ **phẳng** hay có đỉnh | ⭐ Gần 1 = **nhiễu**, gần 0 = **có cao độ rõ** |
| **Spectral contrast** | Chênh đỉnh–đáy trong 7 dải con | Cấu trúc hài rõ hay không |

$$
\text{centroid} = \frac{\sum_k f_k \cdot |X_k|}{\sum_k |X_k|}
$$

Chính là **trung bình có trọng số** của tần số, trọng số là biên độ. Nghe âm thanh "sáng" hay "tối" tương ứng khá tốt với con số này.

## 🧩 Spectral flatness — đặc trưng đáng chú ý nhất

$$
\text{flatness} = \frac{\text{trung bình hình học của } |X_k|}{\text{trung bình cộng của } |X_k|}
$$

Trung bình hình học **luôn ≤** trung bình cộng, bằng nhau **chỉ khi mọi giá trị bằng nhau**. Nên tỉ số này đo trực tiếp mức độ "phẳng":

| Flatness | Phổ | Ví dụ |
|---|---|---|
| **≈ 1** | Phẳng, mọi tần số như nhau | Nhiễu trắng, `air_conditioner` |
| **≈ 0** | Có vài đỉnh nhọn | Nốt nhạc, `siren`, `engine_idling` |

Đây là cách định lượng gọn ghẽ cho câu hỏi "âm này giống tiếng ù hay giống nốt nhạc" — mà không cần phát hiện cao độ.

## ⚙️ Băng thông — đặc trưng phân biệt trong project

Băng thông (dải chứa 90% năng lượng) tách được đúng cặp lớp hay nhầm nhất:

| Lớp | Băng thông | Loại |
|---|---|---|
| `engine_idling` | **226 Hz** | Rất hẹp, tonal |
| `dog_bark` | 1.981 Hz | Trung bình |
| `air_conditioner` | 4.167 Hz | Rộng, giống nhiễu |
| `jackhammer` | **6.708 Hz** | Rộng nhất |

`engine_idling` và `air_conditioner` **cùng là tín hiệu dừng, cùng năng lượng tần số thấp** — nhìn dạng sóng gần như không phân biệt được. Nhưng băng thông chênh **18 lần**. Đây là ví dụ cụ thể cho việc **đặc trưng đúng làm bài toán dễ hẳn đi**.

## ⚙️ Gộp thống kê — từ chuỗi khung về một vector

Mỗi đặc trưng trên tính cho **từng khung** → ra một chuỗi 173 giá trị. Model cần **một vector cố định**, nên phải gộp bằng **7 thống kê**: `mean`, `std`, `min`, `max`, `median`, `skew`, `kurtosis`.

Vì sao 7 chứ không phải chỉ `mean`: với **tín hiệu không dừng**, giá trị trung bình che mất toàn bộ biến động. `std`, `skew`, `kurtosis` mới mã hoá được "âm này có lúc bùng lúc tắt". Xem [[tin-hieu-dung]].

Tổng vector: **931 chiều** — 840 từ MFCC+delta+delta², 49 từ spectral contrast, còn lại 42 từ 6 đặc trưng đơn × 7 thống kê.

## ⚠️ Điều dễ nhầm

- **Đặc trưng phổ nhạy với nhiễu nền.** Nhiễu tần số cao kéo centroid lên; nhiễu nền rộng làm flatness tăng.
- **Tính trên phổ tuyến tính hay log cho kết quả khác nhau** — phải nhất quán giữa train và test.
- **931 chiều là nhiều so với ~7.800 mẫu train mỗi fold.** Đó là lý do project phải PCA xuống 200 chiều cho SVM — vừa vì chi phí `O(n²d)`, vừa vì rủi ro overfit. Xem [[ml/pca]] và [[ml/overfitting]].

---

## 🔗 Liên kết
- **Tiền đề:** [[zcr-rms]] · [[bien-doi-fourier]]
- **Dẫn tới:** [[mel-spectrogram]] · [[mfcc]]
- **Liên môn:** [[ml/feature-engineering]] · [[ml/pca]] — đây là feature engineering cho tín hiệu; cùng bài toán chọn và giảm chiều.

## ❓ Câu hỏi mở
- Trong 931 chiều, bao nhiêu thực sự đóng góp? Có chạy feature importance của Random Forest để biết không?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §4.1
