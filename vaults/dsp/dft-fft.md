---
slug: dft-fft
title: DFT & FFT
vault: dsp
type: concept
branch: B
order: 2
status: learning
tags: [dsp, tan-so]
prev: [bien-doi-fourier]
next: [tin-hieu-dung]
related: [spectrogram-stft, tich-chap]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# DFT & FFT

> Tóm tắt 1 câu: DFT là bản Fourier **máy tính tính được**; FFT là **thuật toán** tính DFT nhanh hơn — hai thứ khác nhau, hay bị gọi lẫn.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B · #2 ← cần [[bien-doi-fourier]] · → kế tiếp [[tin-hieu-dung]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #tan-so

---

## 💡 Phân biệt hai khái niệm

| | **DFT** | **FFT** |
|---|---|---|
| Là gì | Một **phép biến đổi** (định nghĩa toán học) | Một **thuật toán** để tính DFT |
| Chi phí | `O(N²)` nếu tính thô | `O(N log N)` |
| Kết quả | — | **Giống hệt** DFT, không xấp xỉ |

$$
X[k] = \sum_{n=0}^{N-1} x[n]\, e^{-j2\pi kn/N}, \qquad k = 0..N-1
$$

Với `N = 88.200` mẫu: DFT thô ≈ **7,8 tỉ** phép tính; FFT ≈ **1,4 triệu** — nhanh hơn **5.000 lần**. Đây là lý do FFT được xem là một trong những thuật toán quan trọng nhất thế kỷ 20.

## 🔢 Độ phân giải tần số — đánh đổi cốt lõi

$$
\Delta f = \frac{f_s}{N}
$$

| `N` (kích thước FFT) | `Δf` với `f_s = 22050` | Độ dài cửa sổ |
|---|---|---|
| 512 | 43,1 Hz | 23 ms |
| **2048** (project) | **10,8 Hz** | **93 ms** |
| 8192 | 2,7 Hz | 372 ms |

> 📌 **Cửa sổ dài → phân giải tần số tốt, phân giải thời gian kém.** Và ngược lại. Không thể có cả hai — đây là **nguyên lý bất định** của phân tích thời gian–tần số, và là quyết định thiết kế chính của [[spectrogram-stft]].

Project chọn `N = 2048`: `10,8 Hz` đủ tách các tần số trội (`engine_idling` ở 22 Hz và 32 Hz cách nhau 10 Hz — vừa đúng ngưỡng), còn `93 ms` đủ ngắn để bắt được các sự kiện ngắn như tiếng súng.

## ⚠️ Rò rỉ phổ (spectral leakage)

DFT **giả định tín hiệu tuần hoàn** với chu kỳ đúng bằng cửa sổ. Nếu cắt không trọn chu kỳ thì hai đầu **không khớp nhau** → xuất hiện một bước nhảy giả → năng lượng **rò ra** khắp phổ.

Triệu chứng: một sin thuần đáng lẽ cho **một vạch** lại cho một **ngọn núi có chân trải rộng**.

**Cách chữa: hàm cửa sổ.** Nhân tín hiệu với một hàm giảm dần về 0 ở hai đầu (Hann, Hamming, Blackman) trước khi FFT → hai đầu khớp nhau êm.

| Cửa sổ | Búp chính | Búp phụ |
|---|---|---|
| Chữ nhật (không cửa sổ) | Hẹp nhất | **Cao nhất** — rò nhiều |
| **Hann** | Rộng hơn | Thấp hơn nhiều |
| Blackman | Rộng nhất | Thấp nhất |

Lại là một đánh đổi: cửa sổ mượt hơn → ít rò hơn nhưng **phân giải tần số kém đi**. Project dùng **Hann** cho cả STFT lẫn thiết kế bộ lọc — xem [[thiet-ke-bo-loc]].

## ⚠️ Điều dễ nhầm

- **`X[k]` là chỉ số bin, không phải Hz.** Đổi bằng `f = k·f_s/N`.
- **Zero-padding không tăng độ phân giải thật.** Đệm 0 cho `N` lớn hơn làm phổ **trông mượt hơn** (nhiều bin hơn) nhưng **không tách được** hai tần số mà cửa sổ gốc không tách nổi. Nó là nội suy, không phải thông tin mới.
- **FFT nhanh nhất khi `N` là luỹ thừa của 2** — lý do `2048` chứ không phải `2000`.

---

## 🔗 Liên kết
- **Tiền đề:** [[bien-doi-fourier]]
- **Dẫn tới:** [[tin-hieu-dung]] · [[spectrogram-stft]]
- **Liên quan:** [[tich-chap]] · [[thiet-ke-bo-loc]]

## ❓ Câu hỏi mở
- Nguyên lý bất định thời gian–tần số có phải giới hạn vật lý hay chỉ là giới hạn của Fourier? (gợi ý: wavelet)

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §4.2
