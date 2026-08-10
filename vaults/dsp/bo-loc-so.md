---
slug: bo-loc-so
title: Bộ lọc số
vault: dsp
type: concept
branch: C
order: 1
status: learning
tags: [dsp, loc]
prev: [spectrogram-stft]
next: [fir-vs-iir]
related: [tich-chap, he-thong-lti]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# Bộ lọc số

> Tóm tắt 1 câu: lọc = **nhân phổ với một mặt nạ** = **tích chập với `h[n]`** — hai cách nói của cùng một việc, và biết cả hai mới thiết kế được.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #1 ← cần [[spectrogram-stft]] · → kế tiếp [[fir-vs-iir]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #loc

---

## 💡 Bốn loại theo dải cho qua

| Loại | Cho qua | Dùng để |
|---|---|---|
| **Thông thấp** (low-pass) | Dưới `f_c` | Khử nhiễu tần số cao; **chống aliasing** trước khi hạ tần số mẫu |
| **Thông cao** (high-pass) | Trên `f_c` | Bỏ trôi DC, bỏ ù nguồn tần số thấp |
| **Thông dải** (band-pass) | Giữa `f_l` và `f_h` | ⭐ Giữ đúng dải quan tâm |
| **Chắn dải** (band-stop / notch) | Bỏ một dải hẹp | Khử ù điện lưới 50/60 Hz |

Project dùng **thông dải `50 Hz – 10 kHz`**:
- Cắt dưới `50 Hz` — bỏ tiếng ù nguồn điện, tiếng rung nền, trôi DC.
- Cắt trên `10 kHz` — âm thanh môi trường gần như không có thông tin phân biệt ở trên đó, và `10 kHz` nằm an toàn dưới Nyquist `11.025 Hz`.

## 🧩 Hai cách nhìn cùng một bộ lọc

| Miền | Bộ lọc là gì | Thao tác |
|---|---|---|
| **Thời gian** | Dãy `h[n]` (đáp ứng xung) | [[tich-chap]] với tín hiệu |
| **Tần số** | Hàm `H(ω)` (đáp ứng tần số) | **Nhân** với phổ tín hiệu |

Liên hệ giữa hai cách nhìn chính là [[bien-doi-fourier]] — và định lý tích chập nói chúng tương đương.

**Quy trình thiết kế thường đi từ tần số về thời gian:** vẽ `H(ω)` mong muốn (chỗ nào cho qua, chỗ nào chặn) → biến đổi Fourier ngược → ra `h[n]` cần cài đặt. Xem [[thiet-ke-bo-loc]].

## 🔢 Các thông số của một bộ lọc thực

Bộ lọc lý tưởng (cắt dựng đứng) **không tồn tại** — nó cần `h[n]` dài vô hạn và không nhân quả. Bộ lọc thật luôn có:

| Thông số | Nghĩa | Đánh đổi |
|---|---|---|
| **Dải thông** (passband) | Vùng cho qua | Gợn sóng trong dải thông làm méo tín hiệu |
| **Dải chắn** (stopband) | Vùng chặn | Độ suy giảm càng sâu càng tốt |
| **Dải chuyển tiếp** | Vùng giữa hai dải | **Càng hẹp → bậc lọc càng cao → càng tốn tính toán** |
| **Bậc lọc** | Số hệ số | Cao hơn = dốc hơn nhưng chậm hơn và trễ hơn |

Đây là đánh đổi trung tâm của thiết kế bộ lọc: **độ dốc ↔ chi phí ↔ độ trễ**.

## ⚠️ Điều dễ nhầm

- **Lọc không "làm sạch" tín hiệu.** Nó **bỏ đi** một phần phổ. Nếu tín hiệu có ích cũng nằm trong dải bị cắt thì lọc là **làm mất thông tin**. Đây chính là điều kết quả của project gợi ý: DSP preprocessing cải thiện SNR nhưng **không cải thiện độ chính xác phân loại**.
- **Cắt càng dốc càng gợn (ringing).** Chuyển tiếp gắt ở miền tần số ⇔ dao động ở miền thời gian — cùng bài học với [[ivp/loc-tan-so]] khi bộ lọc "lý tưởng" lại cho kết quả tệ nhất.
- **Bộ lọc gây trễ.** Bao nhiêu và có đều không thì phụ thuộc pha — xem [[pha-tuyen-tinh]].

---

## 🔗 Liên kết
- **Tiền đề:** [[tich-chap]] · [[he-thong-lti]] · [[bien-doi-fourier]]
- **Dẫn tới:** [[fir-vs-iir]] · [[thiet-ke-bo-loc]] · [[pha-tuyen-tinh]]
- **Liên môn:** [[ivp/loc-tan-so]] — cùng bốn loại bộ lọc, cùng vấn đề ringing, ở hai chiều.

## ❓ Câu hỏi mở
- Nếu feature extraction đã ngầm lọc (mel filterbank chỉ giữ 50 Hz–10 kHz) thì lọc trước đó có thừa không?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §3
