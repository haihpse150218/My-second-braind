---
slug: tich-chap
title: Tích chập
vault: dsp
type: concept
branch: A
order: 4
status: learning
tags: [dsp, nen-tang]
prev: [he-thong-lti]
next: [bien-doi-fourier]
related: [he-thong-lti, bo-loc-so]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# Tích chập

> Tóm tắt 1 câu: trượt, nhân, cộng — phép toán mô tả **mọi** hệ LTI, và là **cùng một phép toán** với tích chập 2D trong ảnh và với lớp conv của CNN.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #4 ← cần [[he-thong-lti]] · → kế tiếp [[bien-doi-fourier]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #nen-tang

---

## 💡 Ý chính

$$
y[n] = x[n] * h[n] = \sum_{k=-\infty}^{\infty} x[k]\,h[n-k]
$$

| Ký hiệu | Ý nghĩa |
|---|---|
| `x[n]` | Tín hiệu vào |
| `h[n]` | **Đáp ứng xung** của hệ thống |
| `y[n]` | Tín hiệu ra |

Quy trình cho mỗi `n`: **lật** `h` lại, **dịch** tới vị trí `n`, **nhân** từng cặp với `x`, rồi **cộng** hết.

## 🧩 Trực giác

Coi `h[n]` là **"tiếng vọng"** mà hệ thống tạo ra khi bị gõ một cái. Tín hiệu vào là một chuỗi các cú gõ với cường độ khác nhau. Đầu ra = **chồng chập tất cả các tiếng vọng** ấy lên nhau.

Ví dụ vật lý: `h[n]` của một nhà thờ là tiếng vang khi vỗ tay. Tích chập bản thu giọng hát khô với `h[n]` đó cho ra giọng hát nghe như đang hát trong nhà thờ — đây chính là cách **convolution reverb** hoạt động.

## ⚙️ Ba tính chất khai thác được

| Tính chất | Công thức | Dùng để |
|---|---|---|
| **Giao hoán** | `x * h = h * x` | Đổi vai trò tín hiệu ↔ bộ lọc tuỳ tiện |
| **Kết hợp** | `(x*h₁)*h₂ = x*(h₁*h₂)` | **Gộp nhiều bộ lọc thành một** trước khi chạy |
| **Phân phối** | `x*(h₁+h₂) = x*h₁ + x*h₂` | Lọc song song = lọc bằng tổng đáp ứng |

Tính **kết hợp** rất thực dụng: chuỗi FIR bandpass → pre-emphasis trong project về lý thuyết gộp được thành **một** bộ lọc duy nhất, chạy một lượt thay vì hai.

## ⚙️ Chi phí và định lý tích chập

Tích chập trực tiếp tốn `O(N·M)` — với `N = 88.200` mẫu và `M = 101` tap thì khoảng **8,9 triệu** phép nhân cho mỗi clip.

**Định lý tích chập** cho lối tắt:

$$
x * h \;\Longleftrightarrow\; X(\omega) \cdot H(\omega)
$$

Tích chập trong miền thời gian = **phép nhân** trong miền tần số. Qua [[dft-fft|FFT]] thì chi phí xuống `O(N log N)`.

> 📌 Đây cũng là lý do **"lọc"** và **"nhân phổ"** là hai cách nói của cùng một việc — xem [[bo-loc-so]]. Thiết kế bộ lọc thường bắt đầu từ việc vẽ `H(ω)` mong muốn rồi mới suy ngược ra `h[n]`.

## ⚠️ Điều dễ nhầm

- **Tích chập ≠ tương quan chéo.** Tích chập **lật** `h` trước; tương quan thì không. Với `h` đối xứng (như FIR pha tuyến tính) thì hai phép cho kết quả giống nhau — và đó là lý do nhiều thư viện gọi nhầm lẫn nhau mà vẫn chạy đúng. Lớp "convolution" của CNN thực chất là **tương quan chéo**.
- **Tích chập vòng ≠ tích chập tuyến tính.** Nhân phổ DFT rồi biến đổi ngược cho ra tích chập **vòng** — phần trượt ra khỏi cuối sẽ **quấn về đầu**. Phải đệm 0 đủ dài, đúng như bẫy ở [[ivp/dinh-ly-tich-chap]].
- **Đầu ra dài hơn đầu vào**: `N + M − 1` mẫu. Thư viện thường cắt về `N`, và chỗ cắt ở đâu quyết định độ trễ — liên quan trực tiếp tới [[pha-tuyen-tinh]].

---

## 🔗 Liên kết
- **Tiền đề:** [[he-thong-lti]]
- **Dẫn tới:** [[bien-doi-fourier]] · [[bo-loc-so]]
- **Liên môn:** [[ivp/tich-chap-2d]] (2 chiều) · [[dl/phep-tich-chap]] (kernel **học ra** thay vì thiết kế) — **cùng một phép toán, ba môn**. Khác biệt duy nhất: ai quyết định `h`.

## ❓ Câu hỏi mở
- Nếu CNN học ra `h`, nó có bao giờ học lại đúng những bộ lọc mà DSP thiết kế tay không?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §3.1
