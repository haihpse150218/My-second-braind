---
slug: ivp-tom-tat-lectures
title: IVP — Tóm tắt Lecture 0→12
vault: ivp
type: inbox
status: todo
tags: [ivp, chua-chung-cat]
sources: [tom-tat-lectures.md]
created: 2026-08-09
---

# IVP — Tóm tắt Lecture 0→12

**Nguồn gốc:** `D:\MSA-FPT\Image and video processing\tom-tat-lectures.md`
**Trạng thái:** ⬜ Chưa chưng cất
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Dự kiến tách:** bảng thuật ngữ L0–L12 → mỗi dòng ~1 atomic note

> ⚠️ **Note thô** — nguyên trạng từ nguồn gốc, chưa chia thành khái niệm nguyên tử.
> Nằm trong `_inbox/` nên app không đọc, không lên graph.

---
# Tóm tắt Lecture — Image & Video Processing (IVP501)

> Bảng tra cứu nhanh: **keyword → ý nghĩa ngắn → ứng dụng / khi nào dùng**.
> ⚠️ = rủi ro tràn số / clip giá trị — nhớ kiểm tra range `[0,255]` (uint8) hoặc `[0,1]` (double).

**Mạch xuyên suốt:**
`Acquisition (L4)` → `Enhancement: point/histogram (L6) + arithmetic (L5)` → `Restoration: khử nhiễu/mờ (L7)` → `Morphology (L8)` → `Edge (L9)` → `Segmentation (L10)` → `Color (L11)` → `Keypoint/tracking (L12)`.

---

## L0 — Course Introduction
| Keyword | Ý nghĩa | Ứng dụng |
|---|---|---|
| DIP (Digital Image Processing) | Dùng máy tính sửa đổi ảnh số bằng thuật toán | Nền tảng cả môn |
| 2 phần khóa học | Part I: Image Processing; Part II: Video Processing | Định hướng nội dung |
| Assessment | Quiz 20% + Project nhóm 30% + Final 40% + chuyên cần 10% | Biết trọng số để ôn |

---

## L1 — Introduction & Overview
| Keyword | Ý nghĩa | Ứng dụng |
|---|---|---|
| Image / Digital image | Ảnh = biểu diễn 2D của vật thể 3D; ảnh số = lưới pixel hữu hạn | Khái niệm gốc |
| Pixel / gray level | Mỗi điểm ảnh; mono = 1 giá trị `[0,255]`, color = R,G,B | Cách ảnh lưu trong bộ nhớ |
| Low / Mid / High level | Low: lọc nhiễu, tăng tương phản (ảnh→ảnh); Mid: trích cạnh/vùng; High: hiểu nội dung | Phân tầng độ phức tạp bài toán |
| Image synthesis vs analysis | Sinh ảnh từ số liệu vs trích số liệu từ ảnh | Phân biệt hướng xử lý |
| **MVS (Machine Vision System)** | Pipeline: Acquisition → Preprocessing → Segmentation → Feature extraction → Classification (+ Knowledge base) | **Khung sườn quan trọng nhất** — ví dụ nhận dạng biển số xe |
| HVS vs MVS | Mắt người mạnh ở: kho ảnh khổng lồ, tốc độ, thích nghi điều kiện | Giải thích vì sao máy khó bằng người |

---

## L2 — Image Processing Basics
| Keyword | Ý nghĩa | Ứng dụng |
|---|---|---|
| Raster (bitmap) vs Vector | Lưới pixel vs lệnh vẽ | Bitmap: ảnh thật; Vector: phóng to không vỡ |
| Binary / Gray (8-bit) / Color (24-bit) | 1 bit / 8 bit / 3×8 bit | Chọn kiểu ảnh theo nhu cầu |
| Indexed + LUT | Mảng chỉ số trỏ vào bảng màu | Tiết kiệm bộ nhớ (GIF, ≤256 màu) |
| Lossy / Lossless | Nén mất / không mất dữ liệu | JPEG (lossy) vs PNG (lossless) |
| Neighborhood (4/8) | Pixel lân cận trên-dưới-trái-phải (4) hoặc cả chéo (8) | Nền cho mọi phép lân cận |
| Adjacency / Connectivity / Component | Liền kề → liên thông → vùng pixel nối nhau | Đếm vật thể, gán nhãn |
| Distance: Euclidean / D4 (city-block) / D8 (chessboard) | 3 cách đo khoảng cách pixel | Distance transform, watershed |
| Point / Neighborhood / Multi-image ops | Điểm (theo từng pixel) / lân cận (convolution) / kết hợp nhiều ảnh | Phân loại 3 nhóm phép xử lý không gian |
| Transform domain (FT, DCT) | Biến đổi sang miền tần số rồi xử lý | Lọc tần số, nén ảnh |

---

## L3 — MATLAB & Image Processing Toolbox (IPT)
| Keyword | Ý nghĩa | Ứng dụng |
|---|---|---|
| Data class: uint8 / double / logical | `[0,255]` / `[0,1]` / true-false | **Phải hiểu range trước khi tính** |
| `imread` / `imwrite` / `imshow` / `imtool` | Đọc / ghi / hiển thị / khám phá ảnh | Thao tác cơ bản |
| **Typecast vs im2double/im2uint8** | `uint8(A)` chỉ ép kiểu (truncate); `im2*` chuẩn hóa range | ⚠️ Ép kiểu sai → mất dữ liệu/clip. Dùng `im2*` để giữ đúng range |
| `mat2gray` | Co giãn min→0, max→1 | Hiển thị ma trận giá trị lạ |
| `im2bw(I, level)` | Nhị phân hóa theo ngưỡng (level ∈ [0,1]) | Tiền xử lý phân đoạn |
| `rgb2gray` / `ind2rgb` / `gray2ind` | Chuyển đổi giữa các loại ảnh | Chuẩn hóa đầu vào |
| `imhist`/`impixel`/`improfile` | Xem histogram / giá trị pixel / dọc theo đường | Debug & phân tích ảnh |

---

## L4 — Image Sensing & Acquisition
| Keyword | Ý nghĩa | Ứng dụng |
|---|---|---|
| EM spectrum / visible 400–700nm | Ánh sáng là sóng điện từ mắt thấy được | Hiểu nguồn ảnh |
| Reflection / Emission / Absorption image | Phản xạ / tự phát sáng / xuyên qua (X-ray) | Phân loại ảnh theo cơ chế |
| Brightness / Hue / Saturation | Độ sáng / tông màu / độ tinh khiết | Nền cho color models (L11) |
| CCD vs CMOS | Cảm biến: CCD nét hơn / CMOS rẻ, ít điện, nhiễu hơn | Chọn camera |
| Blooming | Photosite bão hòa tràn sang pixel cạnh | Lỗi phơi sáng quá mức |
| Bayer pattern + demosaicing | 1 pixel chỉ ghi 1 màu → nội suy R,G,B | Cách camera 1-CCD tạo ảnh màu |
| **Sampling** | Lấy mẫu không gian (số pixel) | Quyết định độ phân giải |
| **Nyquist / Aliasing** | Lấy mẫu < 2× tần số cao nhất → méo (aliasing) | ⚠️ Giảm size ảnh phải lọc low-pass trước |
| **Quantization** | Rời rạc hóa biên độ thành L=2ᵐ mức xám | Giảm số mức xám (`grayslice`) |
| Spatial vs Gray-level resolution | Mật độ pixel (dpi) vs số mức xám | Đánh giá chất lượng ảnh |

---

## L5 — Arithmetic, Logic & Geometric Operations
| Keyword | Ý nghĩa | Ứng dụng |
|---|---|---|
| **Addition** (`imadd`) | Cộng 2 ảnh (blend) hoặc cộng scalar (tăng sáng) | Trộn ảnh, mô phỏng nhiễu cộng |
| **Subtraction** (`imsubtract`, `imabsdiff`) | Trừ ảnh → phát hiện khác biệt | Tách chuyển động giữa 2 frame, so sánh ảnh |
| Multiply/Divide (`immultiply`,`imdivide`) | Nhân/chia scalar → chỉnh sáng (dynamic scaling) | Sáng/tối tự nhiên hơn addition; chia → tách nền |
| ⚠️ **Overflow/Underflow** | Vượt 255 hoặc âm | **Xử lý bằng normalization / truncation / `imlincomb`** (tính ở double rồi mới ép) |
| Logic AND/OR/XOR/NOT (`bitand`...) | Phép bit | **Masking ROI**, XOR tìm khác biệt |
| ROI + `roipoly` | Tạo mask vùng quan tâm | Xử lý chỉ một phần ảnh |
| Affine transform | Biến đổi tuyến tính: rotation, scaling, translation, shear | Chỉnh méo hình học, special effects |
| Forward vs Backward mapping | Chiếu xuôi (có "lỗ hổng") vs chiếu ngược (chuẩn) | Backward + nội suy là cách đúng |
| **Interpolation: nearest / bilinear / bicubic** | Bậc 0 (nhanh, răng cưa) → bậc 1 → bậc 3 (đẹp, chậm) | `imresize`, `imrotate` chọn method |
| `imcrop`/`imresize`/`imrotate`/`flipud`/`fliplr` | Cắt/đổi cỡ/xoay/lật | Thao tác hình học cơ bản |
| Image registration | Khớp 2 ảnh cùng cảnh khác góc/thiết bị | Ghép ảnh, y tế, viễn thám |

---

## L6 — Gray-Level Transformations, Histogram, Neighborhood
| Keyword | Ý nghĩa | Ứng dụng |
|---|---|---|
| Point/Gray-level transform `s=T(r)` | Giá trị mới chỉ phụ thuộc giá trị cũ | Enhancement cơ bản |
| Linear `s=cr+b` | c = tương phản, b = độ sáng | Chỉnh sáng/tương phản |
| Negative (`imcomplement`) | Đảo `s=255−r` | Nổi bật chi tiết (ảnh y tế) |
| Contrast stretch / Autocontrast (`imadjust`) | Kéo min→0, max→255 | Ảnh tương phản thấp |
| **Power-law / Gamma** `s=cr^γ` | γ<1 sáng hơn, γ>1 tối hơn | Chỉnh gamma màn hình; ⚠️ scale `c` để không tràn |
| **Log / inverse log** | Nén/giãn dynamic range | Hiển thị phổ Fourier (giá trị quá lớn) |
| Piecewise linear / gray-level slicing | Tuyến tính từng khúc; làm nổi 1 dải xám | Làm nổi vùng giá trị cụ thể |
| **LUT (lookup table)** | Bảng 256 phần tử ánh xạ sẵn | Tăng tốc point ops |
| **Histogram** (`imhist`) | Tần suất mỗi mức xám = PMF | Đọc nhanh: tối/sáng/tương phản |
| Bimodal histogram | 2 đỉnh rõ → tương phản cao | Gợi ý ngưỡng phân đoạn |
| **Histogram Equalization** (`histeq`) | Dùng CDF làm hàm biến đổi → histogram phẳng | Tăng tương phản tự động; ⚠️ có thể tạo false contouring |
| Local equalization (`adapthisteq`) | Equalize theo ô (tile) trượt | Làm nổi chi tiết vùng nhỏ (CLAHE) |
| Histogram specification/matching | Ép histogram về dạng mong muốn | Linh hoạt hơn equalization |
| Convolution + mask/kernel | Tích chập với cửa sổ nhỏ | Nền của mọi neighborhood filter |
| Low-pass (averaging) filter | Làm mượt, giảm nhiễu | ⚠️ Làm mờ cạnh |
| Median filter | Lấy trung vị cửa sổ | **Khử salt & pepper, giữ cạnh** |
| High-pass filter | Làm nổi cạnh/chi tiết | Sharpening |

---

## L7 — Image Restoration (noise + blur)
| Keyword | Ý nghĩa | Ứng dụng |
|---|---|---|
| **Mô hình suy hao** `g=f∗h+n` | Ảnh = gốc ⊛ hàm mờ + nhiễu (miền tần số: `G=FH+N`) | Khung cả lecture |
| Restoration vs Enhancement | Restoration cần mô hình ngược của suy hao | Phân biệt mục tiêu |
| **Noise PDFs** | Gaussian, Salt&Pepper (impulse), Uniform, Rayleigh, Gamma/Erlang, Exponential | Mỗi loại có filter phù hợp |
| **Noise estimation** | Crop 1 vùng đồng nhất → xem histogram → đoán loại nhiễu | Bước trước khi chọn filter |
| `imnoise` | Thêm nhiễu (Gaussian, S&P, speckle) | Tạo ảnh test |
| Arithmetic mean filter | Trung bình cửa sổ | Tốt cho Gaussian/uniform/Erlang; ⚠️ làm mờ |
| Geometric mean | Tích lũy thừa | Gaussian, giữ chi tiết tốt hơn |
| Harmonic mean | — | Gaussian + salt; ❌ fail với pepper |
| **Contraharmonic** (bậc R) | R>0 khử pepper, R<0 khử salt | ⚠️ Sai dấu R → hỏng ảnh |
| **Order-statistic / rank filters** | Sắp xếp rồi chọn | Mạnh với salt & pepper |
| Median / Min / Max / Midpoint / Alpha-trimmed | Trung vị / min (khử salt) / max (khử pepper) / midpoint (Gaussian+uniform) / alpha-trim (nhiều loại nhiễu) | Chọn theo loại nhiễu |
| Adaptive (edge-preserving) filter | Đổi hành vi theo lân cận | Làm mượt mà giữ cạnh |
| Periodic noise | Nhiễu tuần hoàn (giao thoa điện) → đốm sáng trong phổ FT | Dùng filter miền tần số |
| Band-reject / Band-pass / Notch | Chặn/cho qua/loại 1 dải tần | Khử nhiễu tuần hoàn |
| Butterworth / Gaussian / Ideal filter | Dạng filter; Ideal → ⚠️ ringing | Chọn để tránh ringing |
| **Inverse filtering** | `F=G/H` (không nhiễu) | ⚠️ Chia cho H nhỏ → nổ; cần constrained division / LPF |
| **Wiener filter** (`deconvwnr`) | Khử mờ + nhiễu, tối thiểu MSE, hằng K ≈ lượng nhiễu | Tốt nhất khi có cả mờ lẫn nhiễu; K cao→giảm nhiễu, K thấp→nét hơn |
| `deconvreg`/`deconvlucy`/`deconvblind` | Các phương pháp deblur khác | Khi biết/không biết hàm mờ |

---

## L8 — Morphological Image Processing
| Keyword | Ý nghĩa | Ứng dụng |
|---|---|---|
| Set ops: ∪, ∩, complement, translation, reflection | Nền lý thuyết tập hợp | AND/OR/NOT trên ảnh nhị phân |
| **Structuring Element (SE)** (`strel`) | Ma trận nhỏ định hình phép morphology (square, disk, diamond, line) | Hình + cỡ SE quyết định kết quả |
| **Dilation** (`imdilate`) | "Nở" vật thể (≈ OR) | Nối khe, làm to vật |
| **Erosion** (`imerode`) | "Co" vật thể (≈ AND) | Bỏ chi tiết nhỏ, tách vật dính |
| Hit / Fit | SE chạm / lọt vào vùng | Cách hiểu dilation/erosion |
| **Opening** = erode→dilate (`imopen`) | Bỏ nhô nhỏ, tách cầu nối mỏng, không co vật | Xóa noise nhỏ, làm mượt biên |
| **Closing** = dilate→erode (`imclose`) | Lấp lỗ nhỏ, nối khe, không phình vật | Vá lỗ trong vật |
| Opening rồi Closing | Khử salt & pepper trên ảnh nhị phân | Lọc nhiễu hình thái |
| Hit-or-Miss (`bwhitmiss`) | Khớp đồng thời "hit" SE1 + "miss" SE2 | Tìm hình dạng/mẫu cụ thể |
| Boundary extraction (`bwperim`) | A − erosion(A) | Trích biên vật |
| Morphological gradient | dilation − erosion | Biên dày |
| Region filling (`imfill`) | Lấp lỗ từ điểm seed | Vá lỗ vật thể trước phân đoạn |
| Connected components (`bwlabel`) | Trích & gán nhãn vùng liên thông | **Đếm vật thể** |
| `bwmorph`: skel / thin / thicken / spur / remove | Xương / mảnh hóa / dày hóa / cắt gai | Phân tích hình dạng |
| Grayscale morphology | Mở rộng cho ảnh xám (flat/non-flat SE) | Khử nhiễu ảnh xám |
| **Top-hat / Bottom-hat** (`imtophat`,`imbothat`) | Ảnh − opening / closing − ảnh | **Sửa chiếu sáng không đều (shading)**, tăng tương phản |

---

## L9 — Edge Detection
| Keyword | Ý nghĩa | Ứng dụng |
|---|---|---|
| Edge | Biên giữa 2 vùng khác đặc trưng (xám/màu/texture) = biến thiên cường độ mạnh | Tách vật, tiền xử lý phân đoạn |
| 1st derivative (gradient) | Độ lớn ∝ chênh lệch cường độ → đỉnh tại cạnh | Phát hiện cạnh |
| 2nd derivative | Zero-crossing tại tâm cạnh; ⚠️ rất nhạy nhiễu | Định vị tâm cạnh |
| 3 bước edge detection | 1.Khử nhiễu → 2.Dò điểm cạnh → 3.Định vị/nối cạnh (Hough) | Quy trình chuẩn |
| Roberts / Prewitt / Sobel | Mask 2×2 / 3×3; Sobel nhấn mạnh pixel trục | `edge(I,'sobel')`; hệ số tổng = 0 |
| Compass masks (Kirsch, Robinson) | 8 mask theo 8 hướng | Bắt cạnh mọi hướng |
| Gradient magnitude `|G|=|Gx|+|Gy|` | Gộp 2 hướng | Ảnh cạnh tổng hợp |
| Thresholding cạnh | Ngưỡng để giảm false positive | Cân bằng nhiễu/thiếu cạnh |
| **Laplacian** | Xấp xỉ đạo hàm bậc 2; ⚠️ double edge + nhạy nhiễu | Hiếm dùng đơn lẻ |
| **LoG (Laplacian of Gaussian)** / Marr-Hildreth | Làm mượt Gaussian rồi Laplacian ("mũ Mexican") | `edge(I,'log')`; σ nhỏ→chi tiết, σ lớn→thô |
| DoG | Xấp xỉ LoG bằng hiệu 2 Gaussian | Thay LoG |
| **Canny** | LPF Gaussian → gradient → nonmax suppression → hysteresis 2 ngưỡng → linking | **Tốt nhất hiện nay**; `edge(I,'canny',[Tlow Thigh],σ)` |
| Hysteresis thresholding | Strong > Thigh, weak nối với strong | Giữ cạnh liền mạch |
| **Hough transform** (`hough`,`houghpeaks`,`houghlines`) | Điểm ảnh → đường trong (ρ,θ); giao điểm = đường thẳng | **Nối cạnh gãy thành đường thẳng** |
| ρ = x·cosθ + y·sinθ | Biểu diễn chuẩn (tránh dốc vô hạn) | Bắt cả đường dọc |

---

## L10 — Image Segmentation
| Keyword | Ý nghĩa | Ứng dụng |
|---|---|---|
| Segmentation | Chia ảnh thành các vùng không chồng nhau (= vật + nền) | Cầu nối low-level → analysis |
| Discontinuity vs Similarity | 2 tính chất gốc: gián đoạn (cạnh) / tương đồng (vùng) | Phân loại phương pháp |
| **Thresholding** (`im2bw`) | So pixel với ngưỡng T → nhị phân | Ảnh ít vật, hình quan trọng hơn texture |
| Global thresholding | 1 ngưỡng cho cả ảnh; cần histogram bimodal | Ảnh nền-vật tách rõ |
| **Otsu** (`graythresh`) | Tự tìm T tối ưu | Tự động hóa thresholding |
| Local/Adaptive thresholding (`blkproc`) | Ngưỡng theo từng block | ⚠️ Chiếu sáng không đều, nền gradient |
| Region growing | Từ seed, lớn dần theo tiêu chí đồng nhất (bottom-up) | ⚠️ Nhạy seed, kém ổn định 4/8-conn |
| Split & Merge | Chia ảnh đến khi đồng nhất rồi gộp (top-down) | Phân đoạn không cần seed |
| **Watershed** (`watershed`) | Coi ảnh như địa hình, "lưu vực" = vùng, "đường phân thủy" = biên | Tách vật dính nhau (vd: coins) |
| Distance transform (`bwdist`) | Khoảng cách mỗi pixel tới pixel nonzero gần nhất | Đi kèm watershed |

---

## L11 — Color Image Processing
| Keyword | Ý nghĩa | Ứng dụng |
|---|---|---|
| Cones & Rods | Cones=màu (L/M/S), Rods=sáng tối | Cơ sở sinh học màu |
| Additive (light) vs Subtractive (pigment) | Ánh sáng cộng→trắng; mực trừ→đen | RGB vs CMYK |
| **RGB** | Khối lập phương 3 trục R,G,B `[0,1]` hoặc `[0,255]` | Hiển thị màn hình; ảnh MxNx3 |
| **CMY / CMYK** | Màu mực in (+ blacK) | Máy in |
| **HSV / HSI / HSL** | Hue (tông) + Saturation (tinh khiết) + Value (sáng) | **Tách độ sáng khỏi màu** → mô tả màu kiểu người |
| YIQ (NTSC) / **YCbCr** | Luminance + color-difference | TV analog / **video số** (tách Y để tương thích B&W) |
| CIE XYZ / chromaticity diagram | Chuẩn hóa màu, sơ đồ móng ngựa | Tham chiếu màu tuyệt đối |
| Gamut | Dải màu thiết bị tái tạo được | So sánh màn hình/máy in |
| CIELAB / CIELUV | Không gian màu đồng đều cảm nhận | Đo khác biệt màu chính xác |
| ICC profile | Mô tả chuẩn màu của thiết bị | Quản lý màu cross-device |
| Indexed image + colormap | Ma trận chỉ số + bảng màu (`jet`,`hsv`,`hot`...) | Tiết kiệm, pseudocolor |
| **Pseudocolor / intensity slicing** (`grayslice`) | Gán màu cho mức xám (LUT) | **Làm nổi chi tiết ảnh xám** (vd: MRI, tumor) |
| Full-color processing | Lọc trên từng kênh | ⚠️ Filter RGB từng kênh ≠ filter chỉ kênh V của HSV (giữ màu) |

---

## L12 — Keypoint Detection
> *(File PDF lỗi font khi trích text; nội dung gốc chủ yếu là hình minh họa.)*

| Keyword | Ý nghĩa | Ứng dụng |
|---|---|---|
| Keypoint / Corner | Điểm đặc trưng nổi bật (góc), ổn định qua biến đổi | Mốc để so khớp ảnh |
| **FAST corner detector** | Dò góc nhanh (so sáng pixel trên vòng tròn) | Real-time trên điện thoại |
| Keypoint tracking | Theo dõi keypoint qua các frame | **Tracking chuyển động**, AR, ghép ảnh, SLAM |
