---
slug: zcr-rms
title: ZCR & RMS — đặc trưng miền thời gian
vault: dsp
type: concept
branch: D
order: 1
status: learning
tags: [dsp, dac-trung]
prev: [thiet-ke-bo-loc]
next: [dac-trung-pho]
related: [tin-hieu-dung, mfcc]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# ZCR & RMS — đặc trưng miền thời gian

> Tóm tắt 1 câu: hai con số tính được **không cần FFT** — rẻ nhất trong mọi đặc trưng, và vẫn hữu ích đến ngày nay.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #1 ← cần [[thiet-ke-bo-loc]] · → kế tiếp [[dac-trung-pho]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #dac-trung

---

## 💡 Hai đặc trưng

**RMS (Root Mean Square)** — năng lượng trung bình:
$$
\text{RMS} = \sqrt{\frac{1}{N}\sum_{n} x[n]^2}
$$

**ZCR (Zero-Crossing Rate)** — số lần tín hiệu **đổi dấu** trong một khung:
$$
\text{ZCR} = \frac{1}{2N}\sum_{n} \big|\,\text{sign}(x[n]) - \text{sign}(x[n-1])\,\big|
$$

| Đặc trưng | Đo cái gì | Cao nghĩa là |
|---|---|---|
| **RMS** | Độ to | Âm thanh lớn |
| **ZCR** | Tần số **gián tiếp** | Nhiều thành phần tần số cao, hoặc nhiễu |

## 🧩 ZCR — ước lượng tần số mà không cần FFT

Một sin tần số `f` cắt trục 0 đúng `2f` lần mỗi giây. Nên ZCR là **ước lượng thô của tần số trội** với chi phí gần bằng 0 — chỉ so sánh dấu, không nhân, không FFT.

Ứng dụng kinh điển trong xử lý tiếng nói:

| ZCR | Loại âm |
|---|---|
| **Thấp** | Âm hữu thanh (nguyên âm) — tuần hoàn, năng lượng ở tần số thấp |
| **Cao** | Âm vô thanh (`s`, `f`, `sh`) — giống nhiễu, tần số cao |

Cũng dùng để **phát hiện tiếng nói** (VAD): im lặng có RMS thấp nhưng ZCR **cao** (chỉ có nhiễu nền đổi dấu liên tục) — kết hợp hai chỉ số phân biệt được im lặng với âm thanh thật.

## ⚙️ Vai trò trong project

RMS được dùng để **phân loại tín hiệu dừng/không dừng** — chia clip 4s thành 8 đoạn, tính RMS mỗi đoạn, rồi lấy hệ số biến thiên `CV`. Xem [[tin-hieu-dung]].

RMS cũng là chỉ số phân biệt trực tiếp giữa hai lớp hay nhầm:

| Cặp dễ nhầm | Phân biệt bằng |
|---|---|
| `children_playing` ↔ `street_music` | RMS `0,004` vs `0,049` — **chênh 12 lần** |

Cả ZCR và RMS đều nằm trong vector 931 chiều, mỗi cái đóng góp **7 thống kê** (mean, std, min, max, median, skew, kurtosis).

**Crest factor** = `peak / RMS` là chỉ số dẫn xuất rất hữu ích: cao nghĩa là có xung nhọn trội. `dog_bark` đạt `21,28`, `engine_idling` chỉ `2,67`.

## ⚠️ Điều dễ nhầm

- **ZCR bị nhiễu đánh lừa nặng.** Tín hiệu yếu cộng nhiễu nhỏ quanh 0 sẽ cho ZCR rất cao dù nội dung là tần số thấp. Đây là lý do nên lọc trước khi tính, và là một lập luận ủng hộ bước bandpass `50 Hz–10 kHz`.
- **RMS phụ thuộc mức thu.** Cùng âm thanh thu gần/xa cho RMS khác hẳn. Muốn RMS mang thông tin về **loại** âm thanh thì phải chuẩn hoá — nhưng chuẩn hoá lại **xoá mất** chính khác biệt độ to giữa `children_playing` và `street_music` ở trên. Đây là đánh đổi thật, không có lựa chọn đúng tuyệt đối.
- **Zero-pad làm lệch cả hai.** Clip `0,05` giây pad lên 4 giây có 98,7% là số 0 → RMS trung bình tụt, ZCR trên vùng pad bằng 0. Xem [[tin-hieu-roi-rac]].

---

## 🔗 Liên kết
- **Tiền đề:** [[thiet-ke-bo-loc]] · [[tin-hieu-roi-rac]]
- **Dẫn tới:** [[dac-trung-pho]] · [[mfcc]]
- **Liên quan:** [[tin-hieu-dung]]

## ❓ Câu hỏi mở
- Chuẩn hoá biên độ xoá mất thông tin độ to — có cách giữ cả hai (thêm RMS gốc làm feature riêng) không?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §4.1
