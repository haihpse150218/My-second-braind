---
slug: bien-doi-fourier
title: Biến đổi Fourier
vault: dsp
type: concept
branch: B
order: 1
status: learning
tags: [dsp, tan-so]
prev: [tich-chap]
next: [dft-fft]
related: [dft-fft, spectrogram-stft]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# Biến đổi Fourier

> Tóm tắt 1 câu: mọi tín hiệu = **tổng các sin/cos** ở các tần số khác nhau — đổi từ câu hỏi "lúc nào biên độ bao nhiêu" sang "có những tần số nào".

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B · #1 ← cần [[tich-chap]] · → kế tiếp [[dft-fft]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #tan-so

---

## 💡 Ý chính

| Miền | Trục hoành | Trả lời câu hỏi |
|---|---|---|
| **Thời gian** `x[n]` | Thời gian | "Ở giây thứ 2 biên độ bao nhiêu?" |
| **Tần số** `X(ω)` | Tần số | "Trong tín hiệu có bao nhiêu thành phần 440 Hz?" |

Hai cách nhìn **chứa lượng thông tin như nhau** — chuyển qua lại được, không mất mát. Chỉ khác ở chỗ **câu hỏi nào dễ trả lời hơn**.

Mỗi giá trị `X(ω)` là một **số phức**: **biên độ** `|X(ω)|` (thành phần này mạnh cỡ nào) và **pha** `∠X(ω)` (nó lệch đi đâu).

## 🧩 Vì sao miền tần số đáng giá

Bài toán "phân biệt tiếng động cơ với tiếng chó sủa" nhìn ở miền thời gian là hai dãy 88.200 số ngoằn ngoèo — gần như không so sánh được.

Nhìn ở miền tần số thì **mỗi loại âm thanh có một "vân tay tần số"** riêng, đo được bằng số:

| Lớp âm thanh | Tần số trội (Hz) | Giải thích vật lý |
|---|---|---|
| `engine_idling` | **22**, 32, 54 | Hài của tần số quay động cơ (~1320 vòng/phút) |
| `jackhammer` | **75**, 129, 140 | Tần số đập của búa khí nén |
| `car_horn` | **323**, 334, 345 | Tần số thiết kế của còi |
| `dog_bark` | **851**, 1637, 1701 | Cộng hưởng thanh quản chó |
| `siren` | **861**, 829, 807 | Thiết kế cho tai người dễ nghe (1–4 kHz) |
| `drilling` | **1863**, 1949, 1809 | Tần số quay mũi khoan |

> 📌 Đây là **lý do MFCC hoạt động**: nếu mỗi lớp có hình dạng phổ riêng thì một đặc trưng mã hoá hình dạng phổ sẽ phân biệt được chúng. Xem [[mfcc]].

**Băng thông** (dải chứa 90% năng lượng) cũng là một đặc trưng phân biệt: `engine_idling` chỉ **226 Hz** (rất hẹp, tonal) trong khi `jackhammer` tới **6.708 Hz** (rộng, giống nhiễu).

## ⚙️ Bốn biến thể — dùng cái nào

| Biến thể | Tín hiệu | Phổ |
|---|---|---|
| **Chuỗi Fourier** | Liên tục, **tuần hoàn** | Rời rạc (các hài) |
| **Biến đổi Fourier** | Liên tục, không tuần hoàn | Liên tục |
| **DTFT** | **Rời rạc**, vô hạn | Liên tục, tuần hoàn |
| **DFT** ⭐ | **Rời rạc, hữu hạn** | **Rời rạc, hữu hạn** |

Chỉ **DFT** tính được bằng máy tính vì cả hai đầu đều hữu hạn — xem [[dft-fft]].

## ⚠️ Điều dễ nhầm

- **Fourier giả định tín hiệu KHÔNG ĐỔI theo thời gian.** Phổ của cả clip 4 giây là **trung bình** của toàn bộ. Với tiếng chó sủa (im lặng → sủa → im lặng) thì phổ trung bình đó **không mô tả đúng bất kỳ khoảnh khắc nào**. Đây chính là lý do phải có [[spectrogram-stft]], và là hệ quả trực tiếp của việc phân biệt [[tin-hieu-dung]].
- **Pha thường bị bỏ qua nhưng rất quan trọng.** Hầu hết đặc trưng âm thanh chỉ dùng biên độ. Nhưng pha mang thông tin **vị trí theo thời gian** — đúng như thí nghiệm ghép biên độ/pha ở [[ivp/fourier-2d]].
- **Phổ đối xứng** với tín hiệu thực → chỉ nửa đầu (tới Nyquist) mang thông tin.

---

## 🔗 Liên kết
- **Tiền đề:** [[tich-chap]] · [[dinh-ly-lay-mau]]
- **Dẫn tới:** [[dft-fft]] · [[spectrogram-stft]]
- **Liên môn:** [[ivp/fourier-2d]] — cùng biến đổi, mở rộng lên hai chiều không gian.

## ❓ Câu hỏi mở
- Nếu pha mang thông tin vị trí, vì sao bỏ pha mà MFCC vẫn phân loại tốt?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §2.2 Signal Characteristics
