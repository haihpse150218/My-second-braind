---
slug: snr
title: SNR — tỉ số tín hiệu trên nhiễu
vault: dsp
type: concept
branch: E
order: 3
status: learning
tags: [dsp, danh-gia]
prev: [so-sanh-thong-ke]
related: [tien-nhan-manh, phan-loai-am-thanh]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# SNR — tỉ số tín hiệu trên nhiễu

> Tóm tắt 1 câu: thước đo chất lượng tín hiệu — và project này là ví dụ sạch cho thấy **chất lượng tín hiệu tốt hơn không đồng nghĩa kết quả tốt hơn**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #3 ← cần [[so-sanh-thong-ke]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #danh-gia

---

## 💡 Ý chính

$$
\text{SNR}_{\text{dB}} = 10 \log_{10}\frac{P_{\text{signal}}}{P_{\text{noise}}}
$$

| SNR | Nghĩa |
|---|---|
| `0 dB` | Tín hiệu và nhiễu **mạnh ngang nhau** |
| `+10 dB` | Tín hiệu mạnh gấp **10 lần** nhiễu |
| `+20 dB` | Gấp **100 lần** |
| `+3 dB` | Gấp **2 lần** (mốc dễ nhớ) |

Đơn vị **dB là thang logarit**, nên `+6 dB` không phải "gấp đôi 3 dB" mà là gấp **4 lần** công suất.

## ⚙️ Kết quả đo trong project

Chuỗi tiền xử lý ([[tien-nhan-manh]]) **có** cải thiện SNR:

| Lớp | Cải thiện SNR |
|---|---|
| `children_playing` | **+4,5 dB** |
| `jackhammer` | **+2,9 dB** |
| `car_horn`, `gun_shot` | ⚠️ **không đo được đáng tin** |

`+4,5 dB` nghĩa là tỉ số công suất tăng khoảng **2,8 lần** — cải thiện thật, đo được, không phải sai số.

**Vì sao lớp xung không đo được:** ước lượng SNR cần các **khung im lặng** để đo mức nhiễu nền. `gun_shot` là một xung rồi im lặng hoàn toàn; `car_horn` là vài tiếng bóp ngắn. Với chúng, ranh giới "đâu là tín hiệu, đâu là nhiễu" không rõ, và ước lượng thành vô nghĩa. Liên quan trực tiếp tới [[tin-hieu-dung]].

## 💡 Bài học trung tâm

> 🚨 **SNR tăng `+4,5 dB` nhưng accuracy KHÔNG tăng** (`p > 0,05`, `d < 0,2`).

Đây là điều đáng nhớ nhất của cả project, và nó là một bài học tổng quát:

**Chỉ số trung gian tốt lên không đảm bảo chỉ số cuối tốt lên.**

Lý do ở đây: phần nhiễu bị lọc bỏ **vốn đã không nằm trong dải mà đặc trưng quan tâm**. Mel filterbank chỉ lấy `50 Hz–10 kHz`, và bước log trong [[mfcc]] đã nén dải động. Bộ lọc dọn sạch những thứ mà bước sau **đằng nào cũng bỏ qua** — SNR trên toàn phổ đẹp lên, nhưng thông tin đưa vào model không đổi.

Cùng loại sai lầm hay gặp:

| Tối ưu chỉ số trung gian | Nhưng chỉ số cuối là |
|---|---|
| SNR của tín hiệu | Accuracy phân loại |
| PSNR của ảnh khôi phục | Người xem thấy đẹp hơn không |
| Loss trên tập train | Hiệu năng trên dữ liệu thật |
| Perplexity của mô hình ngôn ngữ | Câu trả lời có hữu ích không |

Đây chính là bài học *"chọn sai chỉ số là kết luận sai"* — một trong ba chủ đề lặp lại xuyên các project trong kho, xem [[../../projects/INDEX|📦 chủ đề xuyên suốt]] và [[ml/danh-gia-mo-hinh]].

Cùng hiện tượng ở [[ivp/wiener-filter]]: Wiener tối ưu **MSE** nhưng kết quả thường hơi mờ so với thứ mắt người muốn thấy.

## ⚠️ Điều dễ nhầm

- **Ước lượng SNR cần giả định.** Không có tín hiệu sạch để so, nên phải giả định "khung năng lượng thấp nhất = nhiễu thuần" — giả định này sai với tín hiệu xung.
- **SNR cao không nghĩa là tín hiệu hữu ích.** Một tín hiệu sạch nhưng đã bị lọc mất dải chứa thông tin phân biệt thì SNR đẹp mà vô dụng.
- **dB luôn là tỉ số**, phải nói rõ so với cái gì.

---

## 🔗 Liên kết
- **Tiền đề:** [[so-sanh-thong-ke]] · [[tien-nhan-manh]]
- **Liên quan:** [[phan-loai-am-thanh]] · [[tin-hieu-dung]]
- **Liên môn:** [[ml/danh-gia-mo-hinh]] · [[ivp/wiener-filter]] — cùng bài học: tối ưu đúng chỉ số mới quan trọng.

## ❓ Câu hỏi mở
- Có chỉ số nào đo được "lượng thông tin phân biệt lớp" trong tín hiệu, thay vì chỉ đo độ sạch?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §3.6
