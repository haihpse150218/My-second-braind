---
slug: fir-vs-iir
title: FIR vs IIR
vault: dsp
type: concept
branch: C
order: 2
status: learning
tags: [dsp, loc]
prev: [bo-loc-so]
next: [pha-tuyen-tinh]
related: [pha-tuyen-tinh, tin-hieu-dung]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# FIR vs IIR

> Tóm tắt 1 câu: có **hồi tiếp** hay không — quyết định này kéo theo mọi thứ khác: ổn định, pha, chi phí.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C · #2 ← cần [[bo-loc-so]] · → kế tiếp [[pha-tuyen-tinh]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #loc

---

## 💡 Khác biệt gốc

**FIR** — đầu ra chỉ phụ thuộc **đầu vào**:
$$
y[n] = \sum_{k=0}^{M-1} b_k\, x[n-k]
$$

**IIR** — đầu ra còn phụ thuộc **chính các đầu ra trước** (hồi tiếp):
$$
y[n] = \sum_{k=0}^{M} b_k\, x[n-k] - \sum_{k=1}^{N} a_k\, y[n-k]
$$

Đúng một số hạng khác nhau, nhưng nó đổi mọi thứ.

| | **FIR** | **IIR** |
|---|---|---|
| Hồi tiếp | Không | **Có** |
| Đáp ứng xung | **Hữu hạn** | **Vô hạn** |
| Ổn định | **LUÔN ổn định** (không có cực) | Phải kiểm tra — cực phải nằm **trong** vòng tròn đơn vị |
| Pha | **Tuyến tính được** | Phi tuyến |
| Bậc cần cho cùng độ dốc | **Cao** (project: 101 tap) | **Thấp** (project: bậc 5) |
| Chi phí tính toán | Cao hơn | **Thấp hơn nhiều** |
| Sai số làm tròn | Không tích luỹ | **Tích luỹ qua hồi tiếp** |

## 🧩 Vì sao FIR luôn ổn định

Không có hồi tiếp nghĩa là mỗi mẫu đầu ra chỉ là **tổ hợp hữu hạn** của các mẫu đầu vào. Đầu vào bị chặn thì đầu ra chắc chắn bị chặn — không có đường nào để giá trị tự khuếch đại.

IIR thì đầu ra quay ngược vào đầu vào. Chọn hệ số `a_k` sai là tín hiệu **tự nhân lên mỗi vòng** và nổ. Đây là cái giá của việc đạt độ dốc cao với ít hệ số.

## ⚙️ Quyết định trong project — và lý do

Project thử **cả hai** rồi chọn **FIR**:

| | FIR (đã chọn) | IIR Butterworth (so sánh) |
|---|---|---|
| Bậc | 101 tap | 5 |
| Thiết kế | Phương pháp cửa sổ Hann | Biến đổi song tuyến + pre-warping |
| Ổn định | Luôn | Có (cực trong vòng tròn đơn vị) |
| Pha | **Tuyến tính** | **Phi tuyến** |

> 📌 **Lý do chọn FIR: pha tuyến tính bảo toàn cấu trúc theo thời gian.**

Dataset có 4 lớp **không dừng** với xung nhọn (`gun_shot` crest factor `13,99`, `dog_bark` `21,28` — xem [[tin-hieu-dung]]). Pha phi tuyến của IIR làm **các tần số trễ khác nhau** → một xung nhọn bị **bôi ra thành vệt**, méo đúng cái đặc trưng dùng để phân biệt các lớp đó.

Với lớp dừng thì IIR hoàn toàn dùng được — nó rẻ hơn nhiều. Nhưng phải chọn **một** bộ lọc cho cả 10 lớp, nên chọn theo trường hợp khó nhất.

Chi tiết ở [[pha-tuyen-tinh]].

## ⚠️ Điều dễ nhầm

- **IIR không "kém hơn" FIR.** Nó thắng rõ ở chi phí — bậc 5 so với 101 tap là chênh **20 lần** phép nhân mỗi mẫu. Hệ thời gian thực, tài nguyên hạn chế, tín hiệu dừng → IIR là lựa chọn đúng.
- **"Đáp ứng xung vô hạn" không nghĩa là chạy mãi.** Nó **suy giảm về 0** theo hàm mũ, chỉ là về mặt toán học không bao giờ bằng đúng 0.
- **`filtfilt` biến IIR thành pha-zero** bằng cách lọc xuôi rồi ngược. Nhưng nó **nhân đôi bậc lọc thực tế** và **không dùng được thời gian thực** (cần toàn bộ tín hiệu). Project dùng `filtfilt` cho FIR chính vì lý do này — xử lý file đã ghi sẵn, không phải luồng trực tiếp.

---

## 🔗 Liên kết
- **Tiền đề:** [[bo-loc-so]] · [[he-thong-lti]]
- **Dẫn tới:** [[pha-tuyen-tinh]] · [[thiet-ke-bo-loc]]
- **Liên quan:** [[tin-hieu-dung]]

## ❓ Câu hỏi mở
- Nếu chỉ phân loại 6 lớp dừng thì IIR bậc 5 có cho kết quả tương đương mà nhanh hơn 20 lần không?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §3.1–3.2
