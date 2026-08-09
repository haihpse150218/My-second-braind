# 🧠 Second Brain — Digital Signal Processing

> Trang trung tâm (Map of Content) cho môn Xử lý tín hiệu số.
> ⚠️ **Vault này mới dựng khung** — chưa có atomic note nào. Nguyên liệu đang nằm trong `_inbox/`.

**Cập nhật lần cuối:** 2026-08-09
**Trạng thái:** 🌱 Mới dựng khung — 0 atomic note / 6 note thô chờ chưng cất
**Nguồn:** `D:\MSA-FPT\Digital Signal Processing\Slide` (8 bài giảng PDF) · project `DSP501` (UrbanSound8K)
**Quay lại:** [[../../hub/MASTER|🏠 MASTER]]

> 🎯 **Kim chỉ nam:** tín hiệu là **hàm theo thời gian**; hầu hết mọi thứ hay ho xảy ra khi ta nhìn nó ở **miền tần số**. Học DSP = học cách đi lại giữa hai miền đó và biết khi nào nên đứng ở miền nào.

---

## 🧭 Lộ trình đọc (dự kiến)

> Danh sách dưới đây là **kế hoạch**, chưa có note thật.
> Mỗi khi chưng cất xong 1 khái niệm từ `_inbox/`, tạo file `<slug>.md` ở gốc vault này
> rồi đổi `` `slug` `` thành `[[slug]]`. Thứ tự ở đây chính là nguồn để
> `scripts/migrate-frontmatter.mjs dsp --reorder` gán `branch` + `order`.

**Nhánh A · Tín hiệu & hệ thống rời rạc**
1. `tin-hieu-roi-rac` — lấy mẫu, lượng tử hoá: từ tín hiệu liên tục sang dãy số
2. `dinh-ly-lay-mau` — Nyquist–Shannon: vì sao `fs ≥ 2·fmax`, aliasing là gì
3. `he-thong-lti` — tuyến tính + bất biến thời gian: vì sao giả định này làm mọi thứ dễ đi
4. `tich-chap` — convolution: đáp ứng xung quyết định toàn bộ hệ thống
   → 🌉 cầu sang `ivp/tich-chap-2d` và [[dl/vi-sao-can-cnn]] — cùng một phép toán, khác số chiều

**Nhánh B · Biến đổi (Fourier · DFT/FFT · Z)**
1. `chuoi-fourier` — mọi tín hiệu tuần hoàn = tổng các sin/cos
2. `bien-doi-fourier` — từ miền thời gian sang miền tần số
3. `dft-fft` — bản rời rạc + thuật toán nhanh O(n log n)
4. `spectrogram-stft` — cửa sổ trượt: nhìn tần số **thay đổi theo thời gian**
5. `bien-doi-z` — công cụ phân tích ổn định của hệ rời rạc

**Nhánh C · Lọc số (FIR · IIR)**
1. `bo-loc-so` — lọc = nhân trong miền tần số = tích chập trong miền thời gian
2. `fir-vs-iir` — không hồi tiếp (luôn ổn định) vs có hồi tiếp (gọn hơn, có thể mất ổn định)
3. `thiet-ke-bo-loc` — cửa sổ, đáp ứng xung, đánh đổi bậc lọc ↔ độ dốc

**Nhánh D · Đặc trưng âm thanh & ứng dụng**
1. `mfcc` — hệ số cepstral thang mel: đặc trưng chuẩn của xử lý tiếng nói
2. `mel-spectrogram` — thang mel bám theo cảm nhận của tai người
3. `zcr-rms` — zero-crossing rate & năng lượng: đặc trưng miền thời gian rẻ mà hiệu quả
4. `phan-loai-am-thanh` — pipeline: sóng âm → đặc trưng → mô hình
   → 🌉 dùng [[ml/danh-gia-mo-hinh]] để đo, [[dl/vi-sao-can-cnn]] để mô hình hoá phổ

---

## 📥 Inbox — chờ chưng cất

> App **không đọc** `_inbox/`. Note ở đây là nguyên liệu thô, chưa lên graph.

| File | Dự kiến tách ra | Ưu tiên |
|---|---|---|
| `_inbox/dsp501-phan-tich-tin-hieu.md` | miền thời gian vs tần số · FFT · STFT · ZCR · RMS | 🔴 cao — sát Nhánh B/D nhất |
| `_inbox/dsp501-dataset.md` | fold là gì · vì sao KHÔNG tự shuffle · rò rỉ dữ liệu | 🔴 cao — liên môn với [[ml/xu-ly-du-lieu]] |
| `_inbox/dsp501-mo-hinh.md` | MFCC · mel-spectrogram · CNN trên phổ | 🟡 vừa |
| `_inbox/dsp501-tong-quan.md` | bài toán · pipeline tổng thể · thuật ngữ nền | 🟡 vừa |
| `_inbox/dsp501-phan-tich.md` | confusion matrix · so sánh phương pháp | 🟢 thấp |
| `_inbox/dsp501-bao-cao.md` | công thức LaTeX gốc — dùng khi viết note công thức | 🟢 thấp — tra cứu |

## ❓ Câu hỏi mở

- STFT chọn độ dài cửa sổ thế nào cho cân giữa độ phân giải thời gian và tần số?
- MFCC có còn cần thiết khi đã có CNN chạy thẳng trên mel-spectrogram?

## 🔗 Tài nguyên khác

| Tài nguyên | Mô tả |
|---|---|
| `D:\MSA-FPT\Digital Signal Processing\Slide` | 8 bài giảng PDF (Discrete-Time Signals & Systems → …) |
| `D:\MSA-FPT\Digital Signal Processing\workspaces\final\DSP501` | Bản project đã chốt (docs/ + notebooks/ + results/) |
| `D:\MSA-FPT\Digital Signal Processing\Baitap\chap1` | Bài tập chương 1 (ảnh scan) |
| [[../../projects/dsp-urbansound\|📦 Project DSP UrbanSound8K]] | Thẻ project |

## 🔗 Quy ước liên kết

- `[[slug]]` — note cùng vault · `[[ml/pca]]` — note vault khác (xem `CONVENTIONS.md` §6)
- Trạng thái: ⬜ Chưa học · 🟡 Đang học · ✅ Đã nắm · 🔁 Cần ôn
