---
slug: tien-nhan-manh
title: Pre-emphasis & chuẩn hoá biên độ
vault: dsp
type: concept
branch: D
order: 5
status: learning
tags: [dsp, tien-xu-ly]
prev: [mfcc]
next: [phan-loai-am-thanh]
related: [bo-loc-so, phan-loai-am-thanh]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# Pre-emphasis & chuẩn hoá biên độ

> Tóm tắt 1 câu: hai bước tiền xử lý kinh điển — nâng tần số cao và đưa mọi clip về cùng thang biên độ; đơn giản nhưng mỗi bước đều có cái giá.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #5 ← cần [[mfcc]] · → kế tiếp [[phan-loai-am-thanh]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #tien-xu-ly

---

## 💡 Pre-emphasis

$$
x_p[n] = x[n] - \alpha\, x[n-1], \qquad \alpha = 0{,}97
$$

Đây là một **bộ lọc thông cao FIR bậc 1**:

$$
H(z) = 1 - 0{,}97 z^{-1}
$$

Nó **nâng tần số cao** khoảng `+6 dB/octave`.

**Vì sao cần:** phổ của tiếng nói và nhiều âm thanh tự nhiên **dốc xuống** ở tần số cao (khoảng `−6 dB/octave`), do đặc tính bức xạ của môi và cơ chế phát âm. Kết quả là vùng tần số cao có biên độ rất nhỏ — dễ bị nhiễu lấn và bị lượng tử hoá thô.

Pre-emphasis **làm phẳng lại** phổ, cho các dải tần số đóng góp cân bằng hơn vào [[mfcc]].

`α = 0,97` là giá trị tiêu chuẩn từ thời xử lý tiếng nói; nó gần `1` nên bộ lọc rất dốc ở tần số thấp.

## 💡 Chuẩn hoá đỉnh (peak normalization)

$$
x_{\text{out}}[n] = \frac{x_p[n]}{\max_n |x_p[n]|}
$$

Đưa mọi clip về dải `[−1, 1]`, đỉnh cao nhất đúng bằng `1`.

**Vì sao cần:** clip trong dataset thu ở khoảng cách và mức thu rất khác nhau. Không chuẩn hoá thì model có thể học "âm to = lớp này" — một mối tương quan **không thật**, chỉ phản ánh điều kiện thu.

Đây là cùng lý do phải [[ml/chuan-hoa-du-lieu]] trước khi train.

## ⚠️ Cái giá của mỗi bước

**Pre-emphasis:**
- Khuếch đại **nhiễu tần số cao** cùng với tín hiệu — nếu nhiễu chiếm ưu thế ở vùng đó thì đang làm hại.
- Không phù hợp với âm thanh vốn đã cân bằng phổ hoặc thiên tần số cao.

**Chuẩn hoá đỉnh:**
- ⚠️ **Xoá mất thông tin độ to.** Mà độ to là đặc trưng phân biệt thật: `children_playing` có RMS `0,004` còn `street_music` `0,049` — chênh **12 lần**, xem [[zcr-rms]]. Chuẩn hoá làm hai lớp này khó tách hơn.
- **Không tuyến tính** (hệ số chia phụ thuộc chính tín hiệu) → phá giả định [[he-thong-lti]], không gộp được vào chuỗi tích chập.
- **Rất nhạy với một đỉnh nhiễu duy nhất.** Một xung lỗi biên độ lớn kéo cả clip xuống rất nhỏ. Chuẩn hoá theo **RMS** bền vững hơn nhiều so với theo đỉnh.

## ⚙️ Vị trí trong pipeline

$$
x[n] \xrightarrow{\text{FIR bandpass}} x_f[n] \xrightarrow{\text{pre-emphasis}} x_p[n] \xrightarrow{\text{normalize}} x_{\text{out}}[n]
$$

Thứ tự có lý: lọc dải trước (bỏ nhiễu ngoài dải quan tâm) → nâng tần số cao → chuẩn hoá cuối cùng để đỉnh đúng bằng 1 sau mọi biến đổi.

Đo được là chuỗi này **cải thiện SNR thật**: `children_playing` **+4,5 dB**, `jackhammer` **+2,9 dB**.

Nhưng SNR tốt hơn **không** dẫn tới phân loại chính xác hơn — đó là kết luận trung tâm của cả project, xem [[phan-loai-am-thanh]].

## ⚠️ Điều dễ nhầm

- **Với lớp xung (`car_horn`, `gun_shot`) thì SNR không đo được đáng tin** — không có khung "im lặng" đủ dài để ước lượng mức nhiễu nền.
- **Pre-emphasis đảo ngược được** (de-emphasis) nhưng chuẩn hoá đỉnh thì **không**, vì hệ số chia không được lưu lại.
- **Chuẩn hoá phải làm nhất quán giữa train và test.** Đây là cùng loại lỗi với chuyện fit scaler trên toàn bộ dữ liệu ở [[ml/chuan-hoa-du-lieu]].

---

## 🔗 Liên kết
- **Tiền đề:** [[mfcc]] · [[bo-loc-so]]
- **Dẫn tới:** [[phan-loai-am-thanh]]
- **Liên quan:** [[zcr-rms]] · [[he-thong-lti]]
- **Liên môn:** [[ml/chuan-hoa-du-lieu]] — cùng mục đích và cùng cái bẫy: chuẩn hoá xoá mất một phần thông tin có ích.

## ❓ Câu hỏi mở
- Chuẩn hoá theo RMS thay vì theo đỉnh có giữ được nhiều thông tin phân biệt hơn không?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §3.3–3.6
