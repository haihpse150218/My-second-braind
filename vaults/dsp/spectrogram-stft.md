---
slug: spectrogram-stft
title: STFT & spectrogram
vault: dsp
type: concept
branch: B
order: 4
status: learning
tags: [dsp, tan-so]
prev: [tin-hieu-dung]
next: [bo-loc-so]
related: [mel-spectrogram, dft-fft]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# STFT & spectrogram

> Tóm tắt 1 câu: chạy FFT trên **cửa sổ trượt** để thấy tần số **thay đổi theo thời gian** — biến tín hiệu 1 chiều thành một **bức ảnh** 2 chiều.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B · #4 ← cần [[tin-hieu-dung]] · → kế tiếp [[bo-loc-so]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #tan-so

---

## 💡 Ý chính

```
1. Cắt tín hiệu thành các khung ngắn, CHỒNG LẤN nhau
2. Nhân mỗi khung với hàm cửa sổ (Hann)
3. FFT từng khung
4. Xếp các phổ cạnh nhau → ma trận [tần số × thời gian]
```

Kết quả là **spectrogram**: trục ngang = thời gian, trục dọc = tần số, độ sáng = năng lượng.

Đây là chỗ FFT toàn clip thất bại: với tiếng chó sủa (im lặng → sủa → im lặng), phổ trung bình của cả 4 giây **không mô tả đúng khoảnh khắc nào**. STFT giữ được thông tin "lúc nào có gì".

## 🔢 Tham số trong project

| Tham số | Giá trị | Ý nghĩa |
|---|---|---|
| `n_fft` | **2048** | Cửa sổ 93 ms · `Δf = 10,8 Hz` |
| `hop_length` | **512** | Bước nhảy 23 ms → **chồng lấn 75%** |
| Cửa sổ | Hann | Giảm rò rỉ phổ |
| Kích thước ra | **(1025, 173)** | 1025 bin tần số × 173 khung thời gian |

**Vì sao phải chồng lấn:** hàm cửa sổ Hann làm yếu hai đầu mỗi khung. Không chồng lấn thì thông tin ở ranh giới khung bị **triệt tiêu**. Chồng 75% đảm bảo mọi mẫu đều nằm ở giữa ít nhất một khung.

## ⚠️ Đánh đổi thời gian ↔ tần số

> 🚨 **Không có cách chọn độ dài cửa sổ đúng cho mọi tín hiệu.**

| Cửa sổ | Phân giải thời gian | Phân giải tần số | Hợp với |
|---|---|---|---|
| **Ngắn** (23 ms) | Tốt — bắt được xung ngắn | Kém — `Δf = 43 Hz` | `gun_shot`, `dog_bark` |
| **Dài** (372 ms) | Kém — xung bị bôi nhoè | Tốt — `Δf = 2,7 Hz` | `engine_idling` (tần số trội 22 và 32 Hz) |

Với UrbanSound8K có **cả hai nhóm** ([[tin-hieu-dung]]), `n_fft = 2048` là **thoả hiệp** — không tối ưu cho nhóm nào nhưng chấp nhận được cho cả hai.

Đây chính là hệ quả trực tiếp của `Δf = f_s/N` ở [[dft-fft]]. **Wavelet** (CWT) giải bài này bằng cách dùng cửa sổ **thích nghi**: ngắn ở tần số cao, dài ở tần số thấp.

## ⚙️ Từ spectrogram sang bài toán ảnh

Khi tín hiệu đã thành ma trận 2D thì nó **là một bức ảnh** — và mọi công cụ thị giác dùng được:

```
âm thanh 1D  →  STFT  →  ảnh 2D  →  CNN
```

Project dùng đúng đường này: [[mel-spectrogram]] `(128, 173)` làm đầu vào cho CNN-2D. Kernel của CNN trượt trên spectrogram học ra các mẫu **thời gian–tần số** (vệt dốc lên của còi hụ, dải dọc của tiếng gõ).

Đây là một trong những cầu nối liên môn rõ nhất trong kho: [[ivp/anh-so-la-gi]] nói ảnh là ma trận số; STFT biến âm thanh thành đúng loại ma trận đó.

## ⚠️ Điều dễ nhầm

- **Spectrogram thường hiển thị theo dB (log).** Không lấy log thì thành phần mạnh nhất áp đảo, nhìn ra một mảng tối — hệt lý do phải [[ivp/bien-doi-log]] khi hiển thị phổ Fourier.
- **STFT bỏ pha khi vẽ.** Spectrogram chỉ là **biên độ**. Muốn tái tạo lại âm thanh từ spectrogram thì phải ước lượng pha (Griffin–Lim) — và kết quả không bao giờ hoàn hảo.
- **Số khung `173`** = `⌈88200/512⌉` — phụ thuộc `hop_length`, không phải `n_fft`.

---

## 🔗 Liên kết
- **Tiền đề:** [[dft-fft]] · [[tin-hieu-dung]]
- **Dẫn tới:** [[mel-spectrogram]] · [[bo-loc-so]]
- **Liên môn:** [[ivp/anh-so-la-gi]] · [[dl/vi-sao-can-cnn]] — spectrogram biến bài toán âm thanh thành bài toán thị giác.

## ❓ Câu hỏi mở
- CNN trên spectrogram có thực sự "nhìn" được cấu trúc hài không, hay chỉ khớp texture?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §4.2
