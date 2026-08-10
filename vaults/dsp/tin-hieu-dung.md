---
slug: tin-hieu-dung
title: Tín hiệu dừng vs không dừng
vault: dsp
type: concept
branch: B
order: 3
status: learning
tags: [dsp, phan-tich]
prev: [dft-fft]
next: [spectrogram-stft]
related: [spectrogram-stft, zcr-rms]
sources: ["DSP501 — phân tích tín hiệu"]
created: 2026-08-10
---

# Tín hiệu dừng vs không dừng

> Tóm tắt 1 câu: phổ có **đổi theo thời gian** hay không — câu hỏi này quyết định chọn đặc trưng nào, phân tích bằng gì, và cả loại bộ lọc nào dùng được.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B · #3 ← cần [[dft-fft]] · → kế tiếp [[spectrogram-stft]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #phan-tich

---

## 💡 Ý chính

| | **Dừng** (stationary) | **Không dừng** (non-stationary) |
|---|---|---|
| Phổ tần số | **Không đổi** theo thời gian | **Thay đổi** theo thời gian |
| Dạng sóng | Biên độ ổn định | Xung nhọn xen kẽ im lặng |
| Ví dụ | máy lạnh, động cơ nổ, búa khoan | tiếng súng, chó sủa, còi xe |
| Phân tích bằng | [[dft-fft\|FFT]] toàn clip là đủ | **Bắt buộc** [[spectrogram-stft]] |

## 🔢 Đo bằng CV của RMS

$$
CV = \frac{\sigma_{\text{RMS}}}{\mu_{\text{RMS}}}
$$

Chia clip 4s thành 8 đoạn `0,5s`, tính [[zcr-rms|RMS]] mỗi đoạn, rồi lấy hệ số biến thiên. Ngưỡng: **`CV < 0,3` → dừng**.

Kết quả trên UrbanSound8K:

| Lớp | CV_RMS | Loại | Crest Factor |
|---|---|---|---|
| `engine_idling` | **0,025** | Dừng | 2,67 |
| `air_conditioner` | 0,052 | Dừng | 7,72 |
| `street_music` | 0,080 | Dừng | 5,19 |
| `jackhammer` | 0,083 | Dừng | 4,81 |
| `siren` | 0,142 | Dừng | 4,79 |
| `children_playing` | 0,177 | Dừng | 6,54 |
| `drilling` | 0,518 | **Không dừng** | 5,36 |
| `gun_shot` | 1,393 | **Không dừng** | 13,99 |
| `car_horn` | 1,923 | **Không dừng** | 10,83 |
| `dog_bark` | **2,646** | **Không dừng** | **21,28** |

**Crest factor** (`peak/RMS`) là chỉ số bổ trợ: cao nghĩa là có xung nhọn trội hơn hẳn phần còn lại. `dog_bark` đạt `21,28` — vài cụm sủa nhọn trên nền im lặng.

## ⚙️ Vì sao phân biệt này quyết định thiết kế

Đây là ví dụ đẹp về việc **phân tích tín hiệu dẫn tới quyết định kỹ thuật**, không phải làm cho có:

| Quyết định | Lớp dừng | Lớp không dừng |
|---|---|---|
| **Đặc trưng** | `mean` của MFCC là đủ | **Cần delta + delta²** để bắt biến động theo thời gian |
| **Thống kê gộp** | `mean`, `median` đủ | `std`, `skew`, `kurtosis` mới mã hoá được biến động |
| **Phân tích thời gian–tần số** | FFT/PSD đủ | Cần STFT hoặc wavelet |
| **Loại bộ lọc** | FIR hay IIR đều được | ⚠️ **FIR bắt buộc** — pha tuyến tính bảo toàn **hình dạng xung** |

Dòng cuối là lý do trực tiếp khiến project chọn FIR — xem [[pha-tuyen-tinh]] và [[fir-vs-iir]].

Và vì dataset có **cả hai nhóm**, vector đặc trưng 931 chiều phải phục vụ cả hai: MFCC (cho nhóm dừng) **+** delta/delta² **+** 7 mô-men thống kê (cho nhóm không dừng).

## ⚠️ Điều dễ nhầm

- **Dừng là tính chất theo THANG THỜI GIAN đang xét.** Tiếng nói "không dừng" trên thang giây nhưng "dừng gần đúng" trên thang 20–30 ms. Toàn bộ xử lý tiếng nói dựa vào giả định này — đó là lý do khung phân tích thường 20–40 ms.
- **Dừng ≠ tuần hoàn.** Nhiễu trắng dừng (thống kê không đổi) nhưng không tuần hoàn chút nào.
- **CV chỉ đo năng lượng.** Tiếng còi hụ có năng lượng ổn định (CV thấp → "dừng") nhưng **tần số quét lên xuống liên tục** — về mặt phổ thì rõ ràng là không dừng. Chỉ số nào cũng chỉ nhìn được một khía cạnh.

---

## 🔗 Liên kết
- **Tiền đề:** [[dft-fft]]
- **Dẫn tới:** [[spectrogram-stft]] · [[fir-vs-iir]]
- **Liên quan:** [[zcr-rms]] · [[mfcc]]
- **Liên môn:** [[ml/eda-checklist]] — nhìn dữ liệu trước, quyết định thiết kế sau; đây là bản EDA cho tín hiệu.

## ❓ Câu hỏi mở
- Có nên train **hai model riêng** cho hai nhóm thay vì một model chung cho cả 10 lớp?

## 📚 Nguồn
- DSP501 — `01_signal_analysis.ipynb`, §1
