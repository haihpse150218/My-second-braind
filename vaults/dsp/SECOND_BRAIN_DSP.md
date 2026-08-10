# 🧠 Second Brain — Digital Signal Processing

> Trang trung tâm (Map of Content) cho môn Xử lý tín hiệu số.

**Cập nhật lần cuối:** 2026-08-10
**Trạng thái:** ✅ Chưng cất xong `_inbox/` — 21 atomic note, 5 nhánh A–E
**Nguồn:** `D:\MSA-FPT\Digital Signal Processing\Slide` (8 bài giảng PDF) · project `DSP501` (UrbanSound8K)
**Quay lại:** [[../../hub/MASTER|🏠 MASTER]]

> 🎯 **Kim chỉ nam:** tín hiệu là **hàm theo thời gian**; hầu hết mọi thứ hay ho xảy ra khi ta nhìn nó ở **miền tần số**. Học DSP = học cách đi lại giữa hai miền đó và biết khi nào nên đứng ở miền nào.

---

## 🧭 Lộ trình đọc

**Nhánh A · Tín hiệu & hệ thống rời rạc**
1. [[tin-hieu-roi-rac]] — âm thanh = dãy số; clip 4s ở 22.050 Hz = **88.200 số**
2. [[dinh-ly-lay-mau]] — `f_s ≥ 2f_max`; aliasing **không sửa được** ở hậu kỳ
   → 🌉 cùng định lý với [[ivp/aliasing-anh]], khác trục
3. [[he-thong-lti]] — hai giả định cho phép mô tả cả hệ thống bằng **một dãy `h[n]`**
4. [[tich-chap]] — hệ quả **bắt buộc** của LTI, không phải công thức tuỳ chọn
   → 🌉 [[ivp/tich-chap-2d]] (2D) · [[dl/phep-tich-chap]] (kernel **học ra**) — cùng một phép toán, ba môn

**Nhánh B · Phân tích tần số**
1. [[bien-doi-fourier]] — "vân tay tần số" của từng lớp âm thanh
2. [[dft-fft]] — DFT là **phép biến đổi**, FFT là **thuật toán**; `Δf = f_s/N`
3. [[tin-hieu-dung]] — phổ có đổi theo thời gian không; **quyết định mọi lựa chọn sau đó**
4. [[spectrogram-stft]] — cửa sổ trượt; âm thanh 1D → **ảnh 2D**
   → 🌉 [[ivp/anh-so-la-gi]] — từ đây bài toán âm thanh thành bài toán thị giác

**Nhánh C · Lọc số**
1. [[bo-loc-so]] — lọc = nhân phổ = tích chập; bốn loại theo dải
2. [[fir-vs-iir]] — có hồi tiếp hay không; project chọn **FIR 101 tap**
3. [[pha-tuyen-tinh]] — trễ đều thì giữ hình sóng; ⚠️ méo pha **bôi xung thành vệt**
4. [[thiet-ke-bo-loc]] — cắt sinc bằng cửa sổ Hann; hiện tượng Gibbs
   → 🌉 [[ivp/loc-tan-so]] — "bộ lọc lý tưởng cho kết quả tệ nhất" là cùng một Gibbs

**Nhánh D · Đặc trưng âm thanh**
1. [[zcr-rms]] — hai đặc trưng rẻ nhất, không cần FFT
2. [[dac-trung-pho]] — centroid · bandwidth · **flatness** (nhiễu hay nốt nhạc)
3. [[mel-spectrogram]] — thang theo **tai người**; `(128,173)` là một bức ảnh
4. [[mfcc]] — DCT nén phổ mel; tách **đường bao** khỏi **cao độ**
5. [[tien-nhan-manh]] — pre-emphasis + chuẩn hoá; ⚠️ chuẩn hoá **xoá thông tin độ to**
6. [[phan-loai-am-thanh]] — pipeline A vs B; **kết luận trung tâm của project**

**Nhánh E · Thực nghiệm & đánh giá (DSP501)**
1. [[fold-va-ro-ri-du-lieu]] — ⚠️ **cấm shuffle**; group leakage qua `fsID`
2. [[so-sanh-thong-ke]] — `p` và Cohen's `d` trả lời **hai câu hỏi khác nhau**
3. [[snr]] — SNR **+4,5 dB** mà accuracy **không đổi**; bài học chỉ số trung gian

---

## 💡 Ba điều rút ra đáng nhớ nhất

**1. Tích chập là một phép toán, ba môn.** DSP thiết kế `h[n]` bằng tay, IVP thiết kế kernel 2D bằng tay, CNN **học ra** kernel từ dữ liệu. Khác biệt duy nhất là **ai quyết định kernel** — xem [[../../hub/map-lien-mon|🌉 map liên môn]].

**2. Phân tích tín hiệu dẫn tới quyết định kỹ thuật.** Đo `CV_RMS` phát hiện 4 lớp **không dừng** với xung nhọn → suy ra **bắt buộc dùng FIR** vì pha tuyến tính bảo toàn hình dạng xung. Đây là chuỗi lập luận từ dữ liệu tới thiết kế, không phải chọn theo thói quen.

**3. SNR tốt hơn ≠ kết quả tốt hơn.** Tiền xử lý DSP cải thiện SNR `+4,5 dB` nhưng **không** cải thiện accuracy (mọi `p > 0,05`). Nguyên nhân: mel filterbank + log đã ngầm làm sẵn việc mà bộ lọc định làm. **Trước khi thêm một bước, hỏi xem bước sau đã làm việc đó chưa.**

---

## 📥 Inbox — đã chưng cất xong

| File | Kết quả |
|---|---|
| `_inbox/dsp501-phan-tich-tin-hieu.md` | ✅ nguồn chính cho nhánh B + D |
| `_inbox/dsp501-bao-cao.md` | ✅ công thức LaTeX cho nhánh A, C, D, E |
| `_inbox/dsp501-dataset.md` | ✅ toàn bộ nhánh E.1 (fold & rò rỉ) |
| `_inbox/dsp501-mo-hinh.md` | ✅ phần model → [[phan-loai-am-thanh]] |
| `_inbox/dsp501-tong-quan.md` | ✅ đối chiếu, chống sót |
| `_inbox/dsp501-phan-tich.md` | ✅ confusion matrix → cặp lớp dễ nhầm |

**Chưa lấy được từ nguồn nào** (không có trong 6 file inbox, phải đọc 8 PDF bài giảng gốc):
- `bien-doi-z` — phân tích ổn định hệ rời rạc (cực/không, vòng tròn đơn vị)
- `chuoi-fourier` — bản tuần hoàn liên tục, nền của biến đổi Fourier
- Bài tập chương 1 ở `Baitap/chap1` (ảnh scan)

## ❓ Câu hỏi mở

- STFT chọn độ dài cửa sổ thế nào cho cân giữa phân giải thời gian và tần số?
- MFCC có còn cần thiết khi đã có CNN chạy thẳng trên mel-spectrogram?
- Nếu chỉ phân loại 6 lớp dừng thì IIR bậc 5 có tương đương mà nhanh hơn 20 lần không?
- Hai trục của spectrogram không đối xứng (thời gian ≠ tần số) — có kiến trúc nào khai thác điều đó?

## 🔗 Tài nguyên khác

| Tài nguyên | Mô tả |
|---|---|
| `D:\MSA-FPT\Digital Signal Processing\Slide` | 8 bài giảng PDF |
| `D:\MSA-FPT\Digital Signal Processing\workspaces\final\DSP501` | Bản project đã chốt (docs/ + notebooks/ + results/) |
| `D:\MSA-FPT\Digital Signal Processing\Baitap\chap1` | Bài tập chương 1 (ảnh scan) |
| [[../../projects/dsp-urbansound\|📦 Project DSP UrbanSound8K]] | Thẻ project |

## 🔗 Quy ước liên kết

- `[[slug]]` — note cùng vault · `[[ml/pca]]` — note vault khác (xem `CONVENTIONS.md` §6)
- Trạng thái: ⬜ Chưa học · 🟡 Đang học · ✅ Đã nắm · 🔁 Cần ôn
