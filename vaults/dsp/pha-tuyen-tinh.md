---
slug: pha-tuyen-tinh
title: Pha tuyến tính & độ trễ nhóm
vault: dsp
type: concept
branch: C
order: 3
status: learning
tags: [dsp, loc]
prev: [fir-vs-iir]
next: [thiet-ke-bo-loc]
related: [fir-vs-iir, tin-hieu-dung]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# Pha tuyến tính & độ trễ nhóm

> Tóm tắt 1 câu: mọi tần số **trễ đúng bằng nhau** thì dạng sóng giữ nguyên hình — trễ không đều thì xung nhọn bị **bôi ra thành vệt**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #3 ← cần [[fir-vs-iir]] · → kế tiếp [[thiet-ke-bo-loc]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #loc

---

## 💡 Ý chính

$$
\phi(\omega) = -\frac{M-1}{2}\,\omega
\qquad\Longrightarrow\qquad
\tau_g = -\frac{d\phi}{d\omega} = \frac{M-1}{2} = \text{hằng số}
$$

**Độ trễ nhóm** `τ_g` là **thời gian mà mỗi thành phần tần số bị làm trễ**.

| Pha | `τ_g` | Hậu quả |
|---|---|---|
| **Tuyến tính** | **Hằng số** | Mọi tần số trễ như nhau → dạng sóng chỉ **dịch đi**, không méo |
| **Phi tuyến** | Đổi theo `ω` | Tần số này trễ nhiều hơn tần số kia → dạng sóng **méo** |

Với bộ lọc FIR 101 tap trong project: `τ_g = 50` mẫu = `2,3 ms` ở `f_s = 22.050 Hz` — và **giống hệt nhau** cho mọi tần số.

## 🧩 Vì sao méo pha lại phá hỏng xung

Một xung nhọn (tiếng súng, tiếng gõ) là **tổng của rất nhiều tần số xếp thẳng hàng cùng một thời điểm**. Chính sự xếp thẳng hàng đó tạo ra đỉnh nhọn.

Pha phi tuyến làm các thành phần **trễ khác nhau** → chúng không còn xếp thẳng hàng → đỉnh nhọn **tãi ra thành một vệt thấp và dài**.

Điều đáng chú ý: **phổ biên độ gần như không đổi**. Nhìn phổ thì tưởng bộ lọc không làm gì sai, nhưng dạng sóng đã méo. Đây là lý do phải nhìn cả pha, không chỉ biên độ — cùng bài học với [[ivp/fourier-2d|"pha quan trọng hơn biên độ"]] bên ảnh.

Hệ quả trực tiếp cho project: `gun_shot` và `dog_bark` phân biệt được nhờ **crest factor** cao (`13,99` và `21,28`). Méo pha làm giảm chính chỉ số đó → **xoá mất đặc trưng phân biệt**. Xem [[tin-hieu-dung]].

## ⚙️ Lọc pha-zero (`filtfilt`)

Muốn trễ **bằng 0** thay vì bằng hằng số:

```
1. Lọc xuôi:    x → h → y₁        (trễ +τ)
2. Đảo ngược y₁ theo thời gian
3. Lọc lại:     → h → y₂          (trễ −τ, triệt tiêu)
4. Đảo ngược lần nữa
```

$$
Y(\omega) = |H(\omega)|^{2} X(\omega)
$$

Đáp ứng tổng là **`|H|²` thuần thực** → pha **bằng 0 tuyệt đối**, không trễ chút nào.

| Được | Mất |
|---|---|
| Trễ = 0 | **Bậc lọc hiệu dụng nhân đôi** — dốc gấp đôi dự kiến |
| Pha zero kể cả với IIR | ⚠️ **Không dùng được thời gian thực** — cần toàn bộ tín hiệu |

Project dùng `filtfilt` được vì xử lý **file đã ghi sẵn**. Hệ chạy trực tiếp (micro → xử lý → loa) thì không có "tương lai" để lọc ngược, buộc phải chấp nhận độ trễ.

## ⚠️ Điều dễ nhầm

- **Pha tuyến tính ≠ không trễ.** Vẫn trễ `τ_g`, chỉ là trễ **đều**. Muốn hết trễ phải dùng `filtfilt`.
- **Trễ không đều vẫn nghe "bình thường" trong nhiều trường hợp.** Tai người khá vô cảm với méo pha ở âm thanh liên tục — đó là lý do IIR dùng thoải mái trong audio thông thường. Vấn đề chỉ nghiêm trọng với **tín hiệu xung** và với **đo lường**.
- **FIR chỉ pha tuyến tính khi `h[n]` ĐỐI XỨNG.** Không phải mọi FIR đều có pha tuyến tính — đó là điều kiện phải thiết kế cho có, xem [[thiet-ke-bo-loc]].

---

## 🔗 Liên kết
- **Tiền đề:** [[fir-vs-iir]]
- **Dẫn tới:** [[thiet-ke-bo-loc]]
- **Liên quan:** [[tin-hieu-dung]] · [[tich-chap]]
- **Liên môn:** [[ivp/fourier-2d]] — cùng bài học: pha giữ thông tin **vị trí**, hỏng pha là hỏng cấu trúc dù biên độ vẫn đúng.

## ❓ Câu hỏi mở
- Tai người vô cảm với méo pha ở mức nào? Có ngưỡng đo được không?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §3.1
