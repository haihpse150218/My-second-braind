# 🗺️ Bản đồ liên môn

> Chỗ **cùng một ý** xuất hiện ở nhiều môn dưới tên khác nhau.
> Đây là giá trị mà kho gộp tạo ra — từng repo riêng lẻ không thể có.

**Cập nhật:** 2026-08-09 · **Quay lại:** [[MASTER|🏠 MASTER]]

---

## 1. Đã nối thật (link chạy được)

9 cạnh liên môn hiện có, tất cả đều là link chết cũ của `ml` được nối sang note có sẵn bên `dl`:

| Từ (ml) | Sang (dl) | Vì sao cùng một thứ |
|---|---|---|
| `gradient-descent`, `dao-ham`, `gradient` | [[../vaults/dl/backpropagation]] | Backprop **chính là** chain rule áp lên đồ thị tính toán để lấy gradient. ml dừng ở "gradient là gì", dl chỉ ra cách tính nó trong mạng nhiều lớp. |
| `neural-network`, `dinh-huong-hoc`, `pytorch-vs-tensorflow` | [[../vaults/dl/transfer-learning]] | Kim chỉ nam 90/10 của ml ("dùng lại model có sẵn") = transfer learning bên dl. |
| `neural-network` | [[../vaults/dl/transformer-block]] | ml chỉ nhắc tên; dl mổ xẻ khối. |
| `neural-network` | [[../vaults/dl/resnet]] | ResNet50 nhắc trong ml, kiến trúc ở dl. |
| `neural-network` | [[../vaults/dl/vi-sao-can-cnn]] | ml nêu CNN như một loại mạng; dl trả lời vì sao cần. |

---

## 2. Cầu nối chưa nối được (note đích chưa viết)

Danh sách này là **kế hoạch nối**, làm ngay khi chưng cất xong DSP/IVP.

### 🌉 Tích chập — một phép toán, ba môn

| Môn | Note | Góc nhìn |
|---|---|---|
| dsp | `tich-chap` *(chưa viết)* | 1D theo thời gian: đáp ứng xung quyết định cả hệ thống |
| ivp | `tich-chap-2d` *(chưa viết)* | 2D trên ảnh: kernel trượt, người **tự thiết kế** kernel (Sobel, Gaussian) |
| dl | [[../vaults/dl/phep-tich-chap]] | 2D nhưng kernel được **học ra** từ dữ liệu |

> 💡 Đây là cầu nối đáng giá nhất trong cả kho. Cùng một công thức; khác biệt duy nhất là **ai quyết định kernel** — con người (DSP/IVP cổ điển) hay dữ liệu (DL). Hiểu được trục này thì CNN không còn là hộp đen.

### 🌉 Miền tần số

| Môn | Note | Góc nhìn |
|---|---|---|
| dsp | `bien-doi-fourier`, `dft-fft` *(chưa viết)* | Tín hiệu 1D → phổ tần |
| ivp | `fourier-2d`, `loc-tan-so` *(chưa viết)* | Ảnh 2D → phổ; lọc thông thấp = làm mờ |
| ml | [[../vaults/ml/pca]] | Cũng là đổi hệ trục để thấy cấu trúc — khác cơ sở (trục phương sai lớn nhất vs sin/cos) |

### 🌉 Đặc trưng: thủ công vs học ra

| Môn | Note |
|---|---|
| dsp | `mfcc`, `zcr-rms` *(chưa viết)* — kỹ sư chọn đặc trưng |
| ivp | `phat-hien-bien` *(chưa viết)* — Sobel/Canny là đặc trưng thủ công |
| ml | [[../vaults/ml/feature-engineering]] — tạo đặc trưng bằng hiểu biết ngành |
| dl | [[../vaults/dl/vi-sao-can-cnn]] — mạng tự học đặc trưng, khỏi thiết kế tay |

> 💡 [[../projects/dsp-urbansound]] là bằng chứng thực nghiệm cho trục này: **khi dữ liệu ít, đặc trưng thủ công (MFCC) + ML cổ điển thắng CNN học đặc trưng.**

### 🌉 Đánh giá mô hình

| Môn | Note |
|---|---|
| ml | [[../vaults/ml/danh-gia-mo-hinh]] · [[../vaults/ml/metric-hoi-quy]] · [[../vaults/ml/cross-validation]] |
| ivp | PSNR · SSIM · LPIPS → [[../projects/image-super-resolution]] |
| dsp | Accuracy · F1 macro theo fold → [[../projects/dsp-urbansound]] |
| nckh | [[../vaults/nckh/c1-2025-deng-swebenchpro]] và nhóm C — đánh giá agent |

> 💡 Chủ đề chung: **chỉ số quyết định kết luận.** SwinIR thắng PSNR nhưng thua LPIPS; đổi chỉ số là đảo thứ hạng.

### 🌉 Xác suất & kiểm định

| Môn | Note |
|---|---|
| ml | [[../vaults/ml/kiem-dinh-gia-thuyet]] · [[../vaults/ml/p-value]] · [[../vaults/ml/phuong-sai]] |
| nckh | ANOVA trong [[../projects/harness-eval-nckh]] |
| dsp | Khoảng tin cậy giữa các fold (CI 5.2%) → [[../projects/dsp-urbansound]] |

### 🌉 Attention — từ lý thuyết ra ứng dụng

| Môn | Note |
|---|---|
| dl | [[../vaults/dl/attention-qkv]] · [[../vaults/dl/transformer-block]] |
| nckh | Nhóm E (bộ nhớ & quản lý context) — vd [[../vaults/nckh/e1-2025-chhikara-mem0]] |
| project | [[../projects/viic-image-captioning]] — Bahdanau attention là mô hình tốt nhất |

---

## 3. Cách thêm cầu nối mới

1. Thấy hai note ở hai môn nói **cùng một ý** dưới tên khác nhau.
2. Thêm vào mục `## 🔗 Liên kết` của cả hai note: `- **Liên môn:** [[dsp/tich-chap]] — cùng phép toán, 1D`.
3. Thêm 1 dòng vào bảng thích hợp phía trên.
4. Chạy `node app/check-links.js ../vaults/<vault>` — link liên môn được đếm riêng (`xlinks`), không bị báo là link chết.
