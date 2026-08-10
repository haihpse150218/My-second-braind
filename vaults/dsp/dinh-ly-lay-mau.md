---
slug: dinh-ly-lay-mau
title: Định lý lấy mẫu Nyquist–Shannon
vault: dsp
type: concept
branch: A
order: 2
status: learning
tags: [dsp, co-ban]
prev: [tin-hieu-roi-rac]
next: [he-thong-lti]
related: [bien-doi-fourier]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# Định lý lấy mẫu Nyquist–Shannon

> Tóm tắt 1 câu: `f_s ≥ 2·f_max`, nếu không thì tần số cao **giả dạng thành tần số thấp** và không có cách nào gỡ ra sau đó.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #2 ← cần [[tin-hieu-roi-rac]] · → kế tiếp [[he-thong-lti]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #co-ban

---

## 💡 Ý chính

$$
f_s \;\ge\; 2 f_{\max}
$$

**Tần số Nyquist** `= f_s / 2` là **tần số cao nhất** biểu diễn được. Mọi thành phần trên nó bị **gập xuống** (fold back) và xuất hiện như một tần số thấp hơn — gọi là **aliasing**.

| `f_s` | Nyquist | Bắt được tới |
|---|---|---|
| 8.000 Hz (điện thoại) | 4.000 Hz | Đủ cho tiếng nói, mất độ "sáng" |
| **22.050 Hz** (project) | **11.025 Hz** | Đủ cho âm thanh môi trường |
| 44.100 Hz (CD) | 22.050 Hz | Phủ hết dải nghe được của người |

## 🧩 Vì sao phải gấp đôi

Một chu kỳ sin cần **ít nhất 2 điểm** để xác định — một cho đỉnh, một cho đáy. Lấy mẫu thưa hơn thì cùng một dãy số khớp với **nhiều sóng khác nhau**, và thuật toán không có cách nào biết sóng nào là thật.

Ví dụ kinh điển: sóng `9 kHz` lấy mẫu ở `10 kHz` → Nyquist `5 kHz` → sóng bị gập thành `1 kHz`. Kết quả không phải "nghe méo mó" mà là **nghe rõ ràng một nốt hoàn toàn khác**. Đó là điều làm aliasing nguy hiểm hơn nhiễu.

Cùng hiện tượng ở hình ảnh: [[ivp/aliasing-anh]] — vân moiré khi chụp áo kẻ sọc, và bánh xe quay ngược trong phim.

## ⚙️ Anti-aliasing filter

> 🚨 **Phải lọc thông thấp TRƯỚC khi lấy mẫu**, cắt mọi tần số trên `f_s/2`.

Bộ lọc này nằm ở **phần cứng, trước ADC** — vì sau khi lấy mẫu thì đã muộn: tần số cao đã trộn lẫn với tần số thấp, không phân tách được nữa.

Cùng nguyên tắc khi **hạ tần số lấy mẫu** (downsampling) một tín hiệu đã số hoá: phải lọc thông thấp trước rồi mới bỏ mẫu. Bỏ mẫu trực tiếp là tự rước aliasing — y hệt chuyện thu nhỏ ảnh phải làm mờ trước.

Trong project, việc chọn passband `50 Hz – 10 kHz` cho [[fir-vs-iir|bộ lọc FIR]] có tính tới điều này: `10 kHz` nằm an toàn dưới Nyquist `11.025 Hz`.

## ⚠️ Điều dễ nhầm

- **Aliasing không sửa được ở hậu kỳ.** Khác hẳn nhiễu — nhiễu còn lọc bớt được, aliasing thì thông tin đã trộn vĩnh viễn.
- **`f_max` là tần số cao nhất CÓ TRONG tín hiệu**, không phải tần số ta quan tâm. Tín hiệu có nhiễu tần số cao thì `f_max` là của nhiễu đó — vẫn gây aliasing dù ta không quan tâm nó.
- **Dấu `≥` là điều kiện lý thuyết với tín hiệu vô hạn.** Thực tế cần `f_s` **lớn hơn hẳn** `2f_max` để bộ lọc anti-aliasing có dải chuyển tiếp — không có bộ lọc nào cắt dựng đứng, xem [[thiet-ke-bo-loc]].

---

## 🔗 Liên kết
- **Tiền đề:** [[tin-hieu-roi-rac]]
- **Dẫn tới:** [[he-thong-lti]] · [[bien-doi-fourier]]
- **Liên môn:** [[ivp/aliasing-anh]] — cùng định lý ở hai trục không gian; triệu chứng là vân moiré thay vì nốt sai.

## ❓ Câu hỏi mở
- Lấy mẫu nén (compressed sensing) khôi phục tín hiệu dưới tốc độ Nyquist — nó thêm giả định gì?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §2.1
