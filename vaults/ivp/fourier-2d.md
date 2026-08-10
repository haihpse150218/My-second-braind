---
slug: fourier-2d
title: Fourier 2D — ảnh trong miền tần số
vault: ivp
type: concept
branch: E
order: 9
status: learning
tags: [ivp, tan-so]
prev: [loc-thong-ke-thu-tu]
next: [dinh-ly-tich-chap]
related: [bien-doi-log, loc-tan-so]
sources: ["L2 — Image Processing Basics", "L7 — Image Restoration"]
created: 2026-08-10
---

# Fourier 2D — ảnh trong miền tần số

> Tóm tắt 1 câu: mọi ảnh = **tổng của các sóng sin 2D**; tần số thấp là vùng trơn, tần số cao là cạnh và chi tiết.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #9 ← cần [[loc-thong-ke-thu-tu]] · → kế tiếp [[dinh-ly-tich-chap]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #tan-so

---

## 💡 Ý chính

$$
F(u,v) = \sum_{x=0}^{M-1}\sum_{y=0}^{N-1} f(x,y)\, e^{-j2\pi\left(\frac{ux}{M}+\frac{vy}{N}\right)}
$$

| Ký hiệu | Ý nghĩa |
|---|---|
| `(u,v)` | Tần số theo hai trục — **số chu kỳ trên toàn ảnh** |
| `\|F(u,v)\|` | **Biên độ** — sóng đó mạnh cỡ nào |
| `∠F(u,v)` | **Pha** — sóng đó nằm ở đâu |

## 🧩 Đọc phổ Fourier của ảnh

| Vị trí trong phổ | Ứng với gì trong ảnh |
|---|---|
| **Tâm** `(0,0)` | Thành phần **DC** = độ sáng trung bình. Luôn sáng nhất, thường lớn hơn phần còn lại hàng triệu lần |
| **Gần tâm** — tần số thấp | Vùng **trơn**, biến thiên chậm, hình khối lớn |
| **Xa tâm** — tần số cao | **Cạnh**, chi tiết nhỏ, nhiễu |
| **Vạch sáng theo một hướng** | Ảnh có **cấu trúc lặp** vuông góc với hướng đó |
| **Vài đốm sáng rời rạc** đối xứng qua tâm | ⚠️ **Nhiễu tuần hoàn** — xem [[nhieu-anh]] |

Quy ước hiển thị: dịch tâm về giữa ảnh (`fftshift`) và **lấy log biên độ** — không lấy log thì chỉ thấy một chấm trắng, xem [[bien-doi-log]].

## 🧩 Pha quan trọng hơn biên độ

Thí nghiệm kinh điển: lấy **biên độ của ảnh A** ghép với **pha của ảnh B** rồi biến đổi ngược → ảnh ra trông giống **B**, không giống A.

Lý do: pha mã hoá **vị trí** của mọi cấu trúc. Biên độ chỉ nói "có bao nhiêu sóng tần số này", còn pha nói "chúng xếp thẳng hàng ở đâu" — mà cạnh hình thành chính từ chỗ nhiều sóng xếp thẳng hàng.

Đây là lý do các phương pháp chỉ thao tác trên biên độ (như nhiều bộ lọc) tương đối an toàn, còn làm hỏng pha là hỏng ảnh.

## ⚙️ Vì sao phải qua miền tần số

| Lý do | Chi tiết |
|---|---|
| **Tích chập thành phép nhân** | Kernel lớn: FFT nhanh hơn hẳn. Xem [[dinh-ly-tich-chap]] |
| **Khử nhiễu tuần hoàn** | Nhiễu gom vào vài điểm rời rạc → xoá được chính xác |
| **Thiết kế bộ lọc trực tiếp** | "Cắt mọi tần số trên `D₀`" phát biểu gọn trong miền tần số, xem [[loc-tan-so]] |
| **Giải bài toán ngược** | `G = FH + N` là phép **nhân**, chia được — nền của [[loc-nguoc]] và [[wiener-filter]] |
| **Nén ảnh** | Bỏ tần số cao mà mắt ít nhạy (nguyên lý JPEG, dùng DCT — họ hàng của Fourier) |

## ⚠️ Điều dễ nhầm

- **Phổ Fourier không có "vị trí".** Một đốm sáng ở tần số cao cho biết ảnh **có** chi tiết sắc, nhưng **không** cho biết chi tiết đó nằm ở đâu. Muốn có cả hai thì cần biến đổi cửa sổ trượt (STFT / wavelet) — cùng ý tưởng với `dsp/spectrogram-stft`.
- **DFT giả định ảnh tuần hoàn.** Mép trái và mép phải bị coi như liền nhau; nếu chúng chênh nhau nhiều thì sinh **vạch sáng giả** hình chữ thập trong phổ. Cách chữa: nhân ảnh với hàm cửa sổ (windowing) trước khi FFT.
- **Biên độ đối xứng qua tâm** với ảnh thực — nên nửa phổ đã chứa đủ thông tin biên độ.
- Ảnh xoay `θ` thì **phổ cũng xoay `θ`**; ảnh phóng to thì phổ **co lại**. Quan hệ nghịch đảo này rất hữu dụng khi chẩn đoán.

---

## 🔗 Liên kết
- **Tiền đề:** [[loc-thong-ke-thu-tu]] · [[tich-chap-2d]]
- **Dẫn tới:** [[dinh-ly-tich-chap]] · [[loc-tan-so]]
- **Liên quan:** [[bien-doi-log]] · [[nhieu-anh]] · [[aliasing-anh]]
- **Liên môn:** `dsp/bien-doi-fourier` · `dsp/dft-fft` — cùng một biến đổi, ở đây mở rộng lên hai chiều.

## ❓ Câu hỏi mở
- Vì sao JPEG dùng DCT chứ không dùng thẳng DFT?

## 📚 Nguồn
- Lecture 2 — Image Processing Basics
- Lecture 7 — Image Restoration
