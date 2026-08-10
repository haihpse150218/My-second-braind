---
slug: tin-hieu-roi-rac
title: Tín hiệu rời rạc
vault: dsp
type: concept
branch: A
order: 1
status: learning
tags: [dsp, co-ban]
next: [dinh-ly-lay-mau]
related: [he-thong-lti]
sources: ["DSP501 — báo cáo cuối kỳ", "L1 — Discrete-Time Signals & Systems"]
created: 2026-08-10
---

# Tín hiệu rời rạc

> Tóm tắt 1 câu: âm thanh liên tục ngoài đời được biến thành một **dãy số** `x[n]` — và toàn bộ DSP là các phép toán trên dãy số đó.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #1 → kế tiếp [[dinh-ly-lay-mau]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #co-ban

---

## 💡 Ý chính

Hai bước biến tín hiệu vật lý thành dãy số:

| Bước | Rời rạc hoá | Cho ra |
|---|---|---|
| **Lấy mẫu** (sampling) | **Thời gian** | Tần số lấy mẫu `f_s` (Hz) |
| **Lượng tử hoá** | **Biên độ** | Độ sâu bit (16-bit → 65.536 mức) |

$$
x[n] = x_a(nT), \qquad T = \frac{1}{f_s}
$$

Số nguyên `n` là **chỉ số mẫu**, không phải thời gian. Muốn ra giây thì `t = n/f_s`.

## 🧩 Con số thực tế

Trong project [[../../projects/dsp-urbansound|📦 DSP UrbanSound8K]]:

| Tham số | Giá trị | Nghĩa |
|---|---|---|
| `f_s` | **22.050 Hz** | 22.050 con số cho mỗi giây âm thanh |
| Độ dài clip | **4 giây** | |
| Số mẫu mỗi clip | **88.200** | `4 × 22050` |

→ Một clip 4 giây "chỉ" là một vector **88.200 số thực**. Nghe thì là tiếng chó sủa, với máy thì là một dãy số — hệt như [[ivp/anh-so-la-gi|ảnh chỉ là ma trận số]].

Vì sao chọn `22.050 Hz` chứ không phải `44.100 Hz` như nhạc CD: âm thanh môi trường có thông tin phân biệt nằm dưới `10 kHz`, mà theo [[dinh-ly-lay-mau]] thì `f_s = 22050` đã bắt được tới `11.025 Hz`. Lấy mẫu cao hơn chỉ tăng gấp đôi dữ liệu mà không thêm thông tin hữu ích.

## ⚙️ Chuẩn hoá độ dài — chi tiết thực hành

Clip trong dataset dài từ `0,05` tới `4,00` giây, nhưng mô hình cần **đầu vào cùng kích thước**. Cách xử lý:

| Trường hợp | Làm gì |
|---|---|
| Ngắn hơn 4s | **Pad zero** cho đủ 88.200 mẫu |
| Dài hơn 4s | **Cắt bớt** |

⚠️ Pad zero không phải vô hại: nó thêm những đoạn **im lặng tuyệt đối** không có thật, làm lệch các đặc trưng thống kê như [[zcr-rms|RMS]] trung bình. Với clip `0,05` giây thì **98,7% nội dung là số 0** — đặc trưng tính ra chủ yếu mô tả sự im lặng.

## ⚠️ Điều dễ nhầm

- **`n` không có đơn vị thời gian.** Hai tín hiệu cùng `x[n]` nhưng khác `f_s` là hai âm thanh khác nhau hoàn toàn — nhanh chậm khác nhau. `f_s` phải luôn đi kèm dữ liệu.
- **Đọc lại file với `f_s` khác** (resample) làm đổi cả nội dung lẫn số mẫu. Đây là lỗi âm thầm hay gặp khi trộn dữ liệu từ nhiều nguồn.
- **Lượng tử hoá và lấy mẫu độc lập nhau** — giống hệt phân biệt ở [[ivp/lay-mau-anh]] và [[ivp/luong-tu-hoa-anh]].

---

## 🔗 Liên kết
- **Dẫn tới:** [[dinh-ly-lay-mau]] · [[he-thong-lti]]
- **Liên môn:** [[ivp/lay-mau-anh]] — cùng phép lấy mẫu; DSP theo **thời gian**, IVP theo **không gian 2 chiều**.

## ❓ Câu hỏi mở
- Pad zero làm lệch đặc trưng — pad bằng cách lặp tín hiệu (loop) có tốt hơn không?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §2 Dataset
- Lecture — Discrete-Time Signals & Systems
