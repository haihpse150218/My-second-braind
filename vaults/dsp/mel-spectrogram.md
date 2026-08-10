---
slug: mel-spectrogram
title: Thang mel & mel-spectrogram
vault: dsp
type: concept
branch: D
order: 3
status: learning
tags: [dsp, dac-trung]
prev: [dac-trung-pho]
next: [mfcc]
related: [spectrogram-stft, mfcc]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# Thang mel & mel-spectrogram

> Tóm tắt 1 câu: nén trục tần số theo **cách tai người nghe** — dày ở tần số thấp, thưa ở tần số cao.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #3 ← cần [[dac-trung-pho]] · → kế tiếp [[mfcc]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #dac-trung

---

## 💡 Ý chính

$$
m = 2595 \log_{10}\!\left(1 + \frac{f}{700}\right)
$$

Tai người **không nghe tần số theo thang tuyến tính**:

| Cặp tần số | Chênh lệch | Tai nghe thấy |
|---|---|---|
| 100 Hz ↔ 200 Hz | 100 Hz | Khác biệt **rất rõ** — cách nhau một quãng tám |
| 5000 Hz ↔ 5100 Hz | 100 Hz | Gần như **không phân biệt được** |

Thang mel làm trục tần số **giãn ở vùng thấp, nén ở vùng cao** để khoảng cách trên trục mel tương ứng với khoảng cách tai cảm nhận.

Đây là cùng một ý tưởng với **CIELAB** bên ảnh màu ([[ivp/gamut-va-quan-ly-mau]]): xây một thang đo mà **khoảng cách toán học ≈ khác biệt cảm nhận được**.

## ⚙️ Cách tạo mel-spectrogram

```
1. STFT → phổ tuyến tính (1025 bin tần số)
2. Áp mel filterbank — 128 bộ lọc tam giác, đặt CÁCH ĐỀU trên thang mel
   (nên trên thang Hz thì hẹp ở vùng thấp, rộng dần ở vùng cao)
3. Mỗi bộ lọc gộp năng lượng của các bin nằm trong nó → 128 giá trị
4. Chuyển sang dB (log)
```

Tham số trong project:

| Tham số | Giá trị |
|---|---|
| Số dải mel | **128** |
| `f_min` – `f_max` | **50 Hz – 10.000 Hz** (khớp passband bộ lọc) |
| `n_fft` / `hop` | 2048 / 512 |
| Kích thước ra | **(128, 173)** |

**Giảm chiều đáng kể:** từ `(1025, 173)` xuống `(128, 173)` — **nhẹ đi 8 lần**, mà phần bị bỏ chủ yếu là **độ phân giải thừa ở tần số cao** mà tai (và model) không dùng tới.

## 🧩 Vì sao bước log là bắt buộc

Cảm nhận độ to của tai cũng gần **logarit** (định luật Weber–Fechner). Và dải động của âm thanh rất rộng — biên độ chênh hàng nghìn lần.

Không lấy log thì vài thành phần mạnh áp đảo toàn bộ, mọi chi tiết còn lại bị nén về gần 0. Đúng lý do phải [[ivp/bien-doi-log]] khi hiển thị phổ Fourier trong ảnh.

## ⚙️ Vì sao mel-spectrogram hợp với CNN

Ma trận `(128, 173)` **là một bức ảnh** — và có đúng tính chất mà CNN khai thác được:

| Tính chất | Trong mel-spectrogram |
|---|---|
| **Cấu trúc cục bộ** | Các bin tần số kề nhau tương quan mạnh; khung thời gian kề nhau cũng vậy |
| **Mẫu lặp lại theo vị trí** | Vệt hài, vệt quét tần số của còi hụ — xuất hiện ở nhiều chỗ khác nhau |
| **Phân cấp** | Kernel nhỏ bắt vệt ngắn → tầng sâu ghép thành mẫu dài |

Nên [[dl/vi-sao-can-cnn|ba tính chất khiến CNN thắng trên ảnh]] cũng đúng ở đây. Đó là lý do CNN-2D trên mel-spectrogram là kiến trúc chuẩn cho phân loại âm thanh.

⚠️ Có một khác biệt quan trọng: trên ảnh, **bất biến tịnh tiến đúng cả hai trục** (mèo ở góc nào cũng là mèo). Trên spectrogram, dịch theo **thời gian** thì vẫn là cùng âm thanh, nhưng dịch theo **tần số** thì thành âm khác hẳn (cao độ đổi). Hai trục **không đối xứng** — điều mà CNN chuẩn không biết.

## ⚠️ Điều dễ nhầm

- **`f_min`/`f_max` phải khớp với bộ lọc đã dùng.** Project đặt `50–10.000 Hz` đúng bằng passband FIR — đặt lệch thì hoặc lãng phí dải mel cho vùng đã bị lọc sạch, hoặc cắt mất phần có tín hiệu.
- **128 dải mel là lựa chọn, không phải hằng số.** Tiếng nói thường dùng 40; âm nhạc và âm thanh môi trường dùng 64–128 vì cần độ phân giải cao hơn ở vùng tần số cao.
- **Mel filterbank làm mất thông tin không lấy lại được** — nhiều bin tần số gộp vào một dải mel.

---

## 🔗 Liên kết
- **Tiền đề:** [[spectrogram-stft]] · [[dac-trung-pho]]
- **Dẫn tới:** [[mfcc]] · [[phan-loai-am-thanh]]
- **Liên môn:** [[dl/vi-sao-can-cnn]] · [[ivp/bien-doi-log]] · [[ivp/gamut-va-quan-ly-mau]] — thang đo đồng đều cảm nhận là ý tưởng chung của cả âm thanh lẫn màu sắc.

## ❓ Câu hỏi mở
- Hai trục của spectrogram không đối xứng — có kiến trúc nào khai thác điều đó thay vì dùng CNN 2D chuẩn?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §4.2
