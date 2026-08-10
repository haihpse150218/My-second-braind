---
slug: nhieu-anh
title: Các loại nhiễu ảnh
vault: ivp
type: concept
branch: E
order: 6
status: learning
tags: [ivp, phuc-hoi, nhieu]
prev: [mo-hinh-suy-hao]
next: [uoc-luong-nhieu]
related: [loc-trung-vi, loc-lam-min]
sources: ["L7 — Image Restoration"]
created: 2026-08-10
---

# Các loại nhiễu ảnh

> Tóm tắt 1 câu: mỗi loại nhiễu có một **hàm mật độ xác suất** riêng, và biết đúng loại mới chọn đúng bộ lọc — chọn sai thì làm hỏng ảnh chứ không phải "kém hiệu quả".

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #6 ← cần [[mo-hinh-suy-hao]] · → kế tiếp [[uoc-luong-nhieu]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #phuc-hoi #nhieu

---

## 💡 Bảng tra chính

| Loại nhiễu | PDF | Trông ra sao | Nguồn gốc thật | Bộ lọc hợp |
|---|---|---|---|---|
| **Gaussian** | Chuông đối xứng | "Sạn" li ti khắp ảnh | Nhiễu điện tử cảm biến, thiếu sáng | [[loc-lam-min]] trung bình / Gaussian |
| **Muối tiêu** (impulse) | Hai gai ở `0` và `255` | Chấm **trắng & đen** rời rạc | Lỗi bit, cảm biến chết, truyền lỗi | **[[loc-trung-vi]]** |
| **Uniform** | Phẳng đều | Giống Gaussian nhưng "thô" hơn | Ít gặp thật; hay dùng để **mô phỏng** | Trung bình, midpoint |
| **Rayleigh** | Lệch phải, đuôi dài | — | Ảnh radar, ảnh dải tần | Trung bình hình học |
| **Gamma / Erlang** | Lệch phải | — | Ảnh laser, speckle | Trung bình hình học |
| **Exponential** | Giảm nhanh từ 0 | — | Laser | — |
| **Tuần hoàn** (periodic) | — | **Sọc/vân đều** khắp ảnh | Giao thoa điện, nguồn điện | ⚠️ **Chỉ miền tần số** — [[loc-tan-so]] |

## 🧩 Hai loại đáng nhớ nhất

**Gaussian** — nhiễu mặc định, chiếm đa số trường hợp thực. Bản chất: rất nhiều nguồn nhiễu nhỏ độc lập cộng lại → định lý giới hạn trung tâm cho ra phân phối chuẩn. Nó **cộng vào mọi pixel** với biên độ nhỏ, nên trung bình hoá là cách xử lý đúng.

**Muối tiêu** — khác hẳn về bản chất: chỉ **một số ít pixel** bị hỏng, nhưng hỏng **hoàn toàn** (nhảy về 0 hoặc 255). Giá trị gốc của pixel đó **mất sạch**, không còn dấu vết.

> 📌 Đây là lý do trung bình thất bại còn trung vị thành công: pixel muối tiêu **không mang chút thông tin nào**, nên phải **loại bỏ** nó khỏi phép tính (trung vị làm được) chứ không phải **hoà** nó vào (trung bình làm).

**Nhiễu tuần hoàn** là ngoại lệ về cách xử lý: nó **không ngẫu nhiên** mà có tần số xác định → trong miền Fourier hiện lên thành **vài đốm sáng rời rạc**. Xoá đúng mấy đốm đó (notch filter) là khử sạch nhiễu mà gần như không đụng tới ảnh. Lọc trong miền không gian thì bó tay hoàn toàn.

## ⚙️ Vì sao phải phân loại trước khi lọc

Không có bộ lọc nào tốt cho mọi loại nhiễu:

| Chọn sai | Hậu quả |
|---|---|
| Trung bình cho **muối tiêu** | Nhiễu **loang ra** cả cửa sổ, ảnh mờ mà vẫn bẩn |
| Trung vị cho **Gaussian** | Chạy được nhưng **kém hơn** trung bình, lại bào mòn chi tiết |
| Contraharmonic **sai dấu `R`** | **Khuếch đại** chính loại nhiễu định khử |
| Lọc không gian cho **nhiễu tuần hoàn** | Không khử được, chỉ làm mờ ảnh |

→ [[uoc-luong-nhieu]] là bước bắt buộc, không phải tuỳ chọn.

## ⚠️ Điều dễ nhầm

- **"Nhiễu" trong DIP là biến ngẫu nhiên cộng thêm**, không phải "ảnh xấu". Ảnh mờ **không phải nhiễu** — đó là thành phần `h` trong [[mo-hinh-suy-hao]], xử lý bằng cách hoàn toàn khác.
- **Artifact nén JPEG không phải nhiễu ngẫu nhiên** — nó có cấu trúc khối `8×8` xác định. Khử bằng bộ lọc nhiễu là không đúng công cụ.
- **Speckle không phải nhiễu cộng** mà là **nhiễu nhân** (`g = f·n`). Muốn dùng bộ lọc cộng thì phải **lấy log trước** để biến nhân thành cộng.
- Ảnh chụp thiếu sáng nhiễu nhiều hơn không phải vì "máy kém" mà vì **ít photon → tỉ số tín hiệu/nhiễu thấp**, xem [[cam-bien-anh]].

---

## 🔗 Liên kết
- **Tiền đề:** [[mo-hinh-suy-hao]]
- **Dẫn tới:** [[uoc-luong-nhieu]] · [[loc-thong-ke-thu-tu]]
- **Liên quan:** [[loc-trung-vi]] · [[loc-lam-min]] · [[loc-tan-so]] · [[cam-bien-anh]]
- **Liên môn:** [[ml/phan-phoi-xac-suat]] — mỗi loại nhiễu là một phân phối đã học ở `ml`, chỉ khác bối cảnh áp dụng.

## ❓ Câu hỏi mở
- Ảnh thật thường có **nhiều loại nhiễu cùng lúc** — có quy trình chuẩn để tách và xử lý lần lượt không?

## 📚 Nguồn
- Lecture 7 — Image Restoration
