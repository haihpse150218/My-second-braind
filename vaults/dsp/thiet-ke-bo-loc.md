---
slug: thiet-ke-bo-loc
title: Thiết kế bộ lọc — phương pháp cửa sổ
vault: dsp
type: concept
branch: C
order: 4
status: learning
tags: [dsp, loc]
prev: [pha-tuyen-tinh]
next: [zcr-rms]
related: [dft-fft, fir-vs-iir]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# Thiết kế bộ lọc — phương pháp cửa sổ

> Tóm tắt 1 câu: bắt đầu từ bộ lọc **lý tưởng** (dài vô hạn), **cắt ngắn** bằng một hàm cửa sổ — và mọi khiếm khuyết của bộ lọc thật đều đến từ bước cắt đó.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #4 ← cần [[pha-tuyen-tinh]] · → kế tiếp [[zcr-rms]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #loc

---

## 💡 Quy trình

```
1. Vẽ H(ω) lý tưởng — cắt dựng đứng tại tần số cắt
2. Fourier ngược → h_d[n], dài VÔ HẠN, không nhân quả
3. Nhân với hàm cửa sổ độ dài M → h[n] hữu hạn
4. Dịch để thành nhân quả
```

Đáp ứng xung lý tưởng của bộ lọc thông dải trong project:

$$
h_d[n] = \frac{\sin(\omega_h n)}{\pi n} - \frac{\sin(\omega_l n)}{\pi n}
$$

với `ω_l = 2π·50/22050` và `ω_h = 2π·10000/22050`.

Đây là **hiệu hai hàm sinc** — thông dải = thông thấp `10 kHz` **trừ** thông thấp `50 Hz`.

## 🧩 Vì sao bộ lọc lý tưởng không cài đặt được

Hàm `sinc` có **đuôi dài vô hạn** và **kéo dài về cả hai phía** của `n = 0`. Nghĩa là:

- Cần **vô hạn** hệ số → không lưu được.
- Cần biết **tương lai** (`n < 0`) → không nhân quả, không chạy thời gian thực được.

Nên bắt buộc phải cắt. Và cắt gây ra:

| Hiện tượng | Nguyên nhân |
|---|---|
| **Gợn sóng** trong dải thông và dải chắn | Cắt = nhân với cửa sổ chữ nhật ⇔ tích chập với sinc trong miền tần số |
| **Dải chuyển tiếp** rộng ra | Không còn cắt dựng đứng được |
| **Hiện tượng Gibbs** | Gợn sát mép **không giảm** dù tăng `M` — chỉ hẹp lại chứ không thấp xuống |

## ⚙️ Vì sao dùng cửa sổ Hann thay vì cắt thẳng

Cắt thẳng = **cửa sổ chữ nhật**, và nó là lựa chọn tệ nhất: chuyển tiếp đột ngột ở hai đầu sinh búp phụ rất cao (Gibbs).

Cửa sổ mượt hơn thì hai đầu **giảm dần về 0**:

| Cửa sổ | Búp chính | Búp phụ cao nhất |
|---|---|---|
| Chữ nhật | Hẹp nhất | **−13 dB** — rò rất nhiều |
| **Hann** ⭐ | Rộng gấp đôi | **−31 dB** |
| Hamming | Tương tự Hann | −41 dB |
| Blackman | Rộng nhất | −57 dB |

> 📌 Đánh đổi lặp lại lần thứ ba trong nhánh này: **búp chính hẹp (chuyển tiếp dốc) ↔ búp phụ thấp (ít rò)**. Không có cửa sổ nào tốt cả hai. Cùng đánh đổi đã gặp ở [[dft-fft]] khi chọn cửa sổ cho FFT.

## 🔢 Chọn bậc lọc

Project chọn **101 tap** — số **lẻ** không phải ngẫu nhiên:

- `M` lẻ → tâm đối xứng rơi đúng vào **một mẫu** (`n = 50`) → `τ_g = 50` mẫu, **số nguyên**.
- `M` chẵn → tâm rơi vào **giữa hai mẫu** → độ trễ là **nửa mẫu**, phải nội suy nếu muốn căn chỉnh chính xác.

Và `h[n]` phải **đối xứng** (`h[n] = h[M−1−n]`) — đây chính là điều kiện để có [[pha-tuyen-tinh]].

Quy tắc chung: **dải chuyển tiếp càng hẹp → `M` càng lớn**, xấp xỉ `M ∝ 1/Δf`.

## ⚙️ Thiết kế IIR đi đường khác

IIR không dùng phương pháp cửa sổ mà **mượn từ bộ lọc analog** đã có sẵn lý thuyết (Butterworth, Chebyshev, Elliptic):

```
1. Thiết kế bộ lọc analog H_a(s)
2. Biến đổi song tuyến (bilinear) s → z
3. Pre-warping tần số để bù méo phi tuyến của phép biến đổi
```

**Butterworth** được chọn trong project vì nó **phẳng tối đa** trong dải thông (không gợn) — đổi lại chuyển tiếp thoải hơn Chebyshev cùng bậc.

$$
|H_a(j\Omega)|^2 = \frac{1}{1 + (\Omega/\Omega_c)^{2N}}
$$

**Pre-warping** cần vì biến đổi song tuyến bóp méo trục tần số phi tuyến — không bù thì tần số cắt thực tế lệch khỏi thiết kế, càng gần Nyquist càng lệch nhiều.

## ⚠️ Điều dễ nhầm

- **Tăng `M` không xoá được Gibbs.** Gợn chỉ **hẹp lại** chứ biên độ đỉnh **không giảm**. Muốn giảm biên độ gợn phải **đổi cửa sổ**, không phải tăng bậc.
- **Bộ lọc dốc hơn không phải lúc nào cũng tốt hơn** — dốc hơn nghĩa là `h[n]` dài hơn, trễ lớn hơn, và gợn (ringing) trong miền thời gian nhiều hơn.
- **Tần số cắt thường định nghĩa ở −3 dB**, không phải chỗ tín hiệu bị chặn hoàn toàn.

---

## 🔗 Liên kết
- **Tiền đề:** [[pha-tuyen-tinh]] · [[fir-vs-iir]]
- **Dẫn tới:** [[zcr-rms]]
- **Liên quan:** [[dft-fft]] · [[bo-loc-so]]
- **Liên môn:** [[ivp/loc-tan-so]] — "bộ lọc lý tưởng cho kết quả tệ nhất" là cùng một hiện tượng Gibbs, biểu hiện thành ringing quanh cạnh ảnh.

## ❓ Câu hỏi mở
- Phương pháp Parks–McClellan tối ưu gợn theo tiêu chí minimax — nó tốt hơn phương pháp cửa sổ ở đâu?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §3.1–3.2
