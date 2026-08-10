---
slug: bien-doi-log
title: Biến đổi log
vault: ivp
type: concept
branch: D
order: 3
status: learning
tags: [ivp, enhancement]
prev: [anh-am-ban]
next: [gamma-correction]
related: [fourier-2d, gamma-correction]
sources: ["L6 — Gray-Level Transformations, Histogram, Neighborhood"]
created: 2026-08-10
---

# Biến đổi log

> Tóm tắt 1 câu: **nén dải động** — giãn vùng tối, ép vùng sáng, để những giá trị chênh nhau hàng nghìn lần cùng hiện lên được trên một màn hình 256 mức.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #3 ← cần [[anh-am-ban]] · → kế tiếp [[gamma-correction]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #enhancement

---

## 💡 Ý chính

$$
s = c \cdot \log(1 + r)
$$

| Ký hiệu | Ý nghĩa |
|---|---|
| `c` | Hệ số co giãn, chọn `c = 255 / log(1 + r_max)` để lấp đúng dải `[0,255]` |
| `1 + r` | Cộng `1` để tránh `log(0) = −∞` |

**Tác dụng:** khoảng `r ∈ [0,10]` được **giãn rộng** ra, còn khoảng `r ∈ [200,255]` bị **nén lại**. Hàm dốc đứng ở đầu, thoai thoải ở cuối.

Biến đổi ngược `s = e^{r/c} − 1` làm điều ngược lại: nén vùng tối, giãn vùng sáng.

## 🧩 Ứng dụng kinh điển: hiển thị phổ Fourier

Đây là chỗ log **bắt buộc** phải có, không phải tuỳ chọn:

Phổ biên độ của [[fourier-2d]] có thành phần DC (tần số 0) lớn hơn các thành phần khác **hàng triệu lần**. Hiển thị trực tiếp: một chấm trắng ở giữa, còn lại đen thui — không thấy gì.

Sau khi lấy log, toàn bộ cấu trúc phổ hiện ra. Mọi hình ảnh phổ Fourier bạn từng thấy trong sách đều **đã qua log**, không có ngoại lệ.

## ⚙️ Khi nào dùng

- Dữ liệu có **dải động cực rộng**: phổ Fourier, ảnh thiên văn (sao sáng cạnh tinh vân mờ), ảnh HDR.
- Ảnh **tối** cần kéo chi tiết vùng tối lên mà không muốn cháy vùng sáng.

**So với [[gamma-correction]]:** gamma với `γ<1` cũng làm sáng ảnh tối, nhưng log **mạnh tay hơn hẳn** ở vùng rất tối và nén vùng sáng dữ hơn. Gamma có núm chỉnh được (`γ`), log thì cố định. → **Cần điều chỉnh linh hoạt thì dùng gamma; cần nén dải động cực đoan thì dùng log.**

## ⚠️ Điều dễ nhầm

- **Phải chuẩn hoá `c`**, nếu không `log(256) ≈ 5.5` → cả ảnh đen thui. Đây là lỗi thường gặp nhất khi tự cài.
- **Nén dải động là mất tương phản ở vùng sáng.** Nếu chi tiết quan trọng nằm ở vùng sáng thì log làm hỏng chúng.
- **Log khuếch đại nhiễu trong vùng tối.** Vùng tối vốn là nơi nhiễu cảm biến chiếm ưu thế; giãn vùng tối = giãn luôn nhiễu. Nên khử nhiễu trước, xem [[loc-lam-min]].
- Phải tính ở `double` — `log` cho số thực, xem [[kieu-du-lieu-anh]].

---

## 🔗 Liên kết
- **Tiền đề:** [[anh-am-ban]] · [[bien-doi-diem]]
- **Dẫn tới:** [[gamma-correction]]
- **Liên quan:** [[fourier-2d]] · [[loc-lam-min]] · [[lut-bang-tra]]

## ❓ Câu hỏi mở
- Ảnh HDR ngày nay dùng tone mapping phức tạp hơn log nhiều — chúng thêm được gì?

## 📚 Nguồn
- Lecture 6 — Gray-Level Transformations, Histogram, Neighborhood
