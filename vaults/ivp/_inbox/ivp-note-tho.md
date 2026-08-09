---
slug: ivp-note-tho
title: IVP — Ghi chép thô theo buổi
vault: ivp
type: inbox
status: todo
tags: [ivp, chua-chung-cat]
sources: [note.md]
created: 2026-08-09
---

# IVP — Ghi chép thô theo buổi

**Nguồn gốc:** `D:\MSA-FPT\Image and video processing\note.md`
**Trạng thái:** ⬜ Chưa chưng cất
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Dự kiến tách:** brain-dump gốc, nguồn để tách khái niệm

> ⚠️ **Note thô** — nguyên trạng từ nguồn gốc, chưa chia thành khái niệm nguyên tử.
> Nằm trong `_inbox/` nên app không đọc, không lên graph.

---
![alt text](image.png)
Image Acuisition: 
- improve
- enhance image quality
=> Enhanced quality => Morphology/ Edge Detection Reypoint
=> Image Analysis/ synthesis

Too dark:
- positive scalar
- negative scalar
- > 1 factor
- < 1 factor
  | object detection
  | classification
-gray-level tranformation
-histogram => equalifation
==================================
# Image Restoration: Lecture 7
Img Acquisition -> High Quality -> Further
Img Acquisition:
low contrast
power y
add
sub
bright
hitrogram
noise: Lecture 7 (Gaussian Noise, Impulse (Salt and Pepper), Uniform Noise, Rayleigh Noise, Gamma (Erlang) Noise,Exponential Noise, )
blur: rung

# noise: Lecture 7 (Gaussian Noise, Impulse (Salt and Pepper), Uniform Noise, Rayleigh Noise, Gamma (Erlang) Noise,Exponential Noise, )
-> cach xác định histogram thuộc loại nhiễu:
-> dùng Estimating noise
## Estimating noise:
- chọn 2 ảnh 1: gốc và 1: bị noise
- chọn 1 vùng ảnh sao cho đồng nhất nhất có thể trên ảnh
-> xác định được loại nhiễu

## dùng Noise Reduction (đang xem như ảnh không bị suy hao)
- có các hàm: 
Mean Filters:
- Arithmetic Mean Filter: works best for Gaussian, uniform, or Erlang noise (khi sử lý nhiễu thì hình bị mờ đi)
- Geometric Mean Filter: phù hợp Gaussian noise
- Harmonic Mean Filter: Gaussian or salt noise
- Contraharmonic Mean Filter:R > 0 => salt, R < 0 => Pepper

## dùng Band-Reject Filter:
## dùng Band-Pass Filter:
- Butterworth B

Spatial:
  g(x,y)      = f(x, y) * h(x,y) + n(x, y)
  Acquisition   original
Freq:
  G(u,v) = F(u,v)H(u,v) + N(u,v)
            F'(u,v)

-> denoise => thu được F'(u,v) = F.H
-> deblur/Sharpening => thu lại được F(u,v) = F'/H

## BLURRING/Sharpening
+ Wiener filtering
+ inverse filtering
+ Butterworth

#Lecture8: Morphological Image Processing (Phân tích hình thái hình học)
- base on Union, inter, comple
- structuring element
- Dilation: phép OR ((Phép nở / Phép giãn nở))
- erosion: phép AND (Phép sói mòn)
- OPENING: (erosion rồi sau đó Dilation)
- CLOSING: (Dilation rồi erosion)

#Image Segmentation (Phân đoạn ảnh) Lecture 10

#Edge detection (Lecture 9)
- itensity: f(x,y) vs g(x,y)
itensity = |f(x,y) - f(x+1, y)| or |f(x,y) - f(x, y+1)|  > 1 => Edge
=> dùng đạo hàm (derivative) > 0 rất nhiều => Edge



# Laplacian of Gaussian

#Hough tranformation

#Lecture 12: Keypoint Detection
- để tracking sự di chuyển chẵn hạn
https://www.youtube.com/watch?v=Z_HwkG90Yvw



