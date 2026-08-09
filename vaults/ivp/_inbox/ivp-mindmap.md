---
slug: ivp-mindmap
title: IVP — Mindmap Lecture 0→6
vault: ivp
type: inbox
status: todo
tags: [ivp, chua-chung-cat]
sources: [mindmap.md]
created: 2026-08-09
---

# IVP — Mindmap Lecture 0→6

**Nguồn gốc:** `D:\MSA-FPT\Image and video processing\mindmap.md`
**Trạng thái:** ⬜ Chưa chưng cất
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Dự kiến tách:** sơ đồ mermaid theo lecture

> ⚠️ **Note thô** — nguyên trạng từ nguồn gốc, chưa chia thành khái niệm nguyên tử.
> Nằm trong `_inbox/` nên app không đọc, không lên graph.

---
# MINDMAP — IMAGE AND VIDEO PROCESSING (IVP501)

> Tổng hợp toàn bộ Lecture 0 → Lecture 6 (Part I — Image Processing).
> Instructor: Dr. Nguyen Ngoc Truong Minh — FPT/IU-VNU HCMC

---

## 1. SƠ ĐỒ MINDMAP (Mermaid)

```mermaid
mindmap
  root((IVP501<br/>Image & Video<br/>Processing))
    L0[Lecture 0<br/>Course Intro]
      Mục tiêu
        Master DIP fundamentals
        Python implementations
        Algorithmic behavior
      Đánh giá
        Attendance 10%
        Quiz 20%
        Group Project 30%
        Final Exam 40%
      Textbook
        Oge Marques 2011
        Gonzalez & Woods 2018
        Tekalp 2015
      Lộ trình 10 session
        IVP basics
        Sensing & Geometric
        Histogram & Filter
        Restoration & Morphology
        Segmentation & Color
        Edge & Hough
        Keypoint & Video
    L1[Lecture 1<br/>Introduction<br/>& Overview]
      Motivation
        Medical: MRI, CT, PET, fMRI
        Industrial: QC, AGV
        Military: UAV, missile
        Security: biometrics
        Consumer: camera, web
        Deepfake & Anti-spoofing
      Khái niệm cơ bản
        Image = 2D visual rep
        Digital Image = pixels
        Monochrome vs Grayscale
        RGB color
        DIP = science of modify
      Scope of DIP
        Low: noise, contrast
        Mid: edges, regions
        High: scene interpret
        Synthesis vs Analysis
      Operations
        Sharpening
        Noise Removal
        Deblurring
        Edge Extraction
        Binarization
        Blurring
        Contrast Enhance
        Segmentation
      DIP System
        HW: acquisition/processing/display/storage
        SW: MATLAB, Python
      Machine Vision System
        Acquisition
        Preprocessing
        Segmentation
        Feature Extraction
        Classification
        Knowledge Base
      HVS vs MVS
        HVS: huge DB, fast, robust
        MVS: precise, scalable
    L2[Lecture 2<br/>Image Processing<br/>Basics]
      Digital Image Rep
        f(x,y) ma trận M×N
        Sampling + Quantization
        Raster vs Vector
      Loại ảnh
        Binary 1-bit
        Grayscale 8-bit
        RGB 24-bit
        Indexed + LUT
      Compression
        Lossy
        Lossless
      File Formats
        BMP, GIF, JPEG
        TIFF, PNG, PPM
        imread, imwrite
      Image Topology
        Neighborhood: 4 / 8 / diagonal
        Adjacency: 4/8/m
        Path & Connectivity
        Component labeling
        Distance: De, D4, D8
      Loại Operations
        Spatial: point/local/multi
        Transform domain: FFT, DCT
        Affine: translate/scale/rotate/shear
        Interpolation
        Image Registration
    L3[Lecture 3<br/>MATLAB &<br/>Imaging Toolbox]
      MATLAB Basics
        Matrix-first
        1-based indexing
        Interpreted
      Data Classes
        uint8 0..255
        uint16
        double 0..1
        logical
        single
      Operators
        Arithmetic .*/./
        Relational == ~=
        Logical & | ~ xor
        IPT: imadd, imsubtract
      IPT Functions
        imread / imwrite / imfinfo
        imshow / imagesc / imtool
        Conversion: im2uint8 im2double mat2gray im2bw rgb2gray
        Explore: impixel imdistline improfile
      Display
        subplot
        subimage
        line overlay
    L4[Lecture 4<br/>Image Sensing<br/>& Acquisition]
      Light & EM Spectrum
        λ = v/f
        Visible 400-700nm
        Weber Law
      Loại ảnh vật lý
        Reflection
        Emission
        Absorption
      Color Perception
        SPD
        Hue / Saturation / Brightness
        Tristimulus RGB
      Sensors
        CCD photosites
        Blooming
        Bayer pattern
        3-CCD beam splitter
        CMOS Foveon X3
      Camera Optics
        Magnification m=v/u
        Pincushion / Barrel
        IAT toolbox
      Digitization
        Sampling: Nyquist
        Quantization: N = 2^n
        Spatial resolution dpi
        Gray-level resolution
        Standards: QCIF SDTV HDTV
    L5[Lecture 5<br/>Arithmetic Logic<br/>Geometric Ops]
      Arithmetic
        Addition imadd
          Blend
          Brighten
          Noise simulate
        Subtraction imsubtract
          Change detect
          Motion frames
          imabsdiff
        Mult/Div immultiply imdivide
          Dynamic scaling
          Shading correction
          Background remove
        imlincomb avoid overflow
      Logic Ops bit-wise
        AND OR NOT XOR
        bitand bitor bitxor bitcmp
        ROI masking via roipoly
      Geometric
        Mapping function T
        Affine matrix form
          Translation
          Scaling
          Rotation
          Shear
        maketform + imtransform
      Interpolation
        Nearest neighbor
        Bilinear
        Bicubic
      MATLAB
        imresize
        imrotate
        imcrop
        flipud / fliplr
      Advanced
        Warping
        Nonlinear: fisheye twirl
        Morphing
        Seam carving
        Registration cpselect cp2tform
    L6[Lecture 6<br/>Gray-Level Transform<br/>& Histogram]
      Image Enhancement
        Human viewer
        Machine analysis
        Spatial vs Frequency
      Point Transformations
        s = T(r)
        Linear s=c·r+b
        Negative imcomplement
        Power-law gamma
        Log / Inverse log
        Piecewise linear
        Gray-level slicing
        Autocontrast
        LUT intlut
      Histogram
        h(k) = n_k
        Normalized p = n_k/n
        imhist
        Interpret: dark/bright/lowC/highC
      Histogram Equalization
        CDF: s_k = Σp(r_j)
        Flat histogram target
        False contouring side effect
        histeq
        Local: adapthisteq
      Histogram Specification
        Equalize source
        Equalize target
        Inverse z = G⁻¹(s)
        histeq with target
```

---

## 2. CẤU TRÚC NỘI DUNG CHI TIẾT (Vietnamese)

### Lecture 0 — Course Introduction
- **Course**: IVP501 — Master Degree, FPT/IU-VNU HCMC, Fall 2025–2026
- **Hai phần**: Part I — Image Processing | Part II — Video Processing
- **Pipeline DIP**: Acquisition → Filtering/Enhancement → Restoration → Color → Wavelets → Compression → Morphology → Segmentation → Feature → Classification
- **Đánh giá**: Attendance 10% + Quiz 20% + Group Project 30% + Final Exam 40% (≥50 để pass)
- **Yêu cầu nền**: MATLAB/Python, Linear Algebra, DSP

### Lecture 1 — Introduction & Overview
- **Ứng dụng**: Y tế (MRI/CT/PET), công nghiệp (QC, AGV), quân sự (UAV), an ninh (biometrics, anti-spoofing, deepfake), tiêu dùng (camera, web)
- **Định nghĩa**:
  - *Image*: biểu diễn 2D của vật thể/scene từ thiết bị quang học
  - *Digital Image*: tập hữu hạn pixel (mono 0–255 hoặc RGB)
  - *DIP*: khoa học sửa đổi ảnh số bằng máy tính
- **Scope**: Low-level (noise, contrast) | Mid-level (edges, regions) | High-level (interpret)
- **8 phép cơ bản**: Sharpening, Noise Removal, Deblurring, Edge Extraction, Binarization, Blurring, Contrast Enhancement, Object Segmentation & Labeling
- **MVS pipeline**: Acquisition → Preprocessing → Segmentation → Feature Extraction → Classification (kết nối Knowledge Base)
- **3 thách thức HVS → MVS**: database khổng lồ, tốc độ cao, hoạt động được dưới mọi điều kiện

### Lecture 2 — Image Processing Basics
- **Digital Image Representation**: ma trận `f(x,y)` size M×N; uint8 [0,255] hoặc double [0,1]
- **Encoding**: Raster (bitmap, hiển thị nhanh, lớn) vs Vector (lệnh vẽ, lossless resize)
- **3 loại**: Binary 1-bit | Gray-level 8-bit | Color (24-bit RGB hoặc Indexed + LUT)
- **Nén**: lossy vs lossless; tiêu chí: tỉ lệ nén, bpp
- **Topology**:
  - Neighborhood: 4-neigh, 8-neigh, diagonal
  - Adjacency: 4/8/m-adjacency
  - Distance: Euclidean De, City-block D4, Chessboard D8
  - `bwlabel`, `label2rgb`
- **Operations**: Spatial (point, area, multi-image) | Transform (FFT, DCT)
- **Affine**: translation, scale, rotate, shear + interpolation + registration

### Lecture 3 — MATLAB & Imaging Toolbox
- **MATLAB**: matrix-first, 1-based indexing, interpreted
- **Data classes**: `uint8` (1B), `uint16` (2B), `double` (8B, 0–1), `logical` (1B), `single`
- **Operators**: `.*` `./` `.^` (element-wise) vs `*` (matrix); `& | ~`; IPT: `imadd`, `imsubtract`, `immultiply`, `imdivide`, `imabsdiff`, `imcomplement`, `imlincomb`
- **I/O**: `imread`, `imwrite('name.jpg','quality',75)`, `imfinfo`
- **Conversion**: `im2uint8`, `im2double`, `mat2gray`, `im2bw`, `rgb2gray`, `ind2rgb`
- **Display**: `imshow`, `imshow(I,[])`, `imtool`, `imagesc`, `subplot`
- **Explore**: `impixel`, `imdistline`, `improfile`, `imcontrast`

### Lecture 4 — Image Sensing & Acquisition
- **Light**: photons, `λ = v/f`; visible 400–700nm; Weber Law (~1–2%)
- **3 loại ảnh**: Reflection | Emission | Absorption
- **Color**: SPD, Hue/Saturation/Brightness, RGB tristimulus
- **Sensors**:
  - CCD (array silicon photosites, blooming, Bayer/3-CCD)
  - CMOS (rẻ, low-power, nhiều noise)
- **Optics**: magnification `m = v/u`; aberrations (pincushion, barrel)
- **Digitization**:
  - Sampling: square/hex/log-polar; **Nyquist** ≥ 2×f_max → tránh aliasing
  - Quantization: `N = 2^n` levels; 8-bit = 256 levels
  - Spatial resolution (dpi) vs Gray-level resolution
  - Standards: QCIF, SIF, SDTV, HDTV, UXGA

### Lecture 5 — Arithmetic, Logic & Geometric Operations
- **Arithmetic** (pixel-by-pixel, lo overflow/underflow):
  - **+** `imadd` → blend, brighten, simulate noise
  - **−** `imsubtract`/`imabsdiff` → change detect, motion, negative `g = −f + Lmax`
  - **×** `immultiply` → dynamic scaling (brighter/darker)
  - **÷** `imdivide` → shading/background correction, 3D effect
  - `imlincomb` → tổ hợp tuyến tính, tránh overflow trung gian
- **Logic bit-wise**: AND/OR/NOT/XOR; IPT `bitand bitor bitxor bitcmp`; dùng cho **ROI mask** (`roipoly`)
- **Geometric Affine** (homogeneous matrix):
  - Translation, Scaling, Rotation (CCW: cosθ, sinθ, −sinθ, cosθ), Shear
  - `maketform('affine', M)` + `imtransform(I, T)`
- **Interpolation**:
  - Nearest-neighbor (fast, blocky)
  - Bilinear (4 pixel, trung bình có trọng số)
  - Bicubic (4×4 cubic, đẹp nhất, đắt nhất)
  - **Backward mapping** ưu tiên hơn forward
- **MATLAB**: `imresize`, `imrotate`, `imcrop`, `flipud`/`fliplr`
- **Advanced**: Warping, Nonlinear (fisheye, twirl, bulge), Morphing, Seam carving
- **Image Registration**: `cpselect` → `cpcorr` → `cp2tform` → `imtransform`

### Lecture 6 — Gray-Level Transformations & Histogram
- **Enhancement**: tăng chất lượng cảm quan / hỗ trợ phân tích máy
- **Point transform**: `g(x,y) = T[f(x,y)]` → `s = T(r)`
  - **Linear**: `s = c·r + b` (c = contrast, b = brightness)
  - **Negative**: `imcomplement` → `s = L−1−r`
  - **Power-law (gamma)**: `s = c·r^γ` (γ<1 sáng lên, γ>1 tối đi)
  - **Log**: `s = c·log(1+r)` (nén dynamic range); inverse log (giãn)
  - **Piecewise linear**: gray-level slicing, contrast stretching, thresholding
  - **Autocontrast**: `s = (L−1)/(r_max−r_min)·(r−r_min)`
  - **LUT**: `intlut(A, LUT)` tăng tốc
- **Histogram**:
  - `h(k) = n_k`; chuẩn hoá `p(r_k) = n_k/n`
  - Đọc histogram: dark / bright / low contrast / high contrast (bimodal)
  - `imhist`
- **Histogram Equalization**:
  - Dùng **CDF**: `s_k = Σ p(r_j)`
  - Mục tiêu: histogram phẳng đều
  - Side effect: **false contouring**
  - `histeq(I, n)`; local: `adapthisteq`
- **Histogram Specification (Matching)**:
  - Equalize source → equalize target → `z = G⁻¹(s)`
  - `histeq(I, h_target)`

---

## 3. KẾT NỐI XUYÊN SUỐT CÁC LECTURE

| Khái niệm | Xuất hiện ở |
|---|---|
| Pixel & data type | L2, L3, L4 |
| Sampling/Quantization | L2 (định nghĩa), L4 (chi tiết) |
| File formats (JPEG/PNG/BMP) | L2 (lý thuyết), L3 (`imread`/`imwrite`) |
| Affine transform | L2 (giới thiệu), L5 (chi tiết + code) |
| Interpolation | L2 (đề cập), L5 (3 phương pháp) |
| Histogram | L1 (contrast enhance), L6 (đầy đủ) |
| Edge & Segmentation | L1 (operations), sẽ học sâu ở L7+ |
| Color (RGB) | L2 (24-bit), L4 (perception), L6 (channel ops) |

---

## 4. CHỦ ĐỀ SẮP TỚI (theo Schedule)

- **Session 4–5**: Histogram Equalization, Frequency-Domain Filtering, Image Restoration
- **Session 6**: Morphology, Compression & Coding
- **Session 7**: Segmentation, Color Image Processing
- **Session 8**: Edge Detection, Hough Transform
- **Session 9**: Keypoint Detection, Video Fundamentals, Sampling Rate Conversion
- **Session 10**: Final Exam

---

*File này tạo từ tổng hợp 7 PDF lecture (~445 trang) — dùng để ôn tập nhanh và xem tổng quan toàn course.*
