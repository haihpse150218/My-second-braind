---
slug: mfcc
title: MFCC
vault: dsp
type: concept
branch: D
order: 4
status: learning
tags: [dsp, dac-trung]
prev: [mel-spectrogram]
next: [tien-nhan-manh]
related: [mel-spectrogram, dac-trung-pho]
sources: ["DSP501 — báo cáo cuối kỳ"]
created: 2026-08-10
---

# MFCC

> Tóm tắt 1 câu: nén hình dạng phổ mel thành **~40 hệ số** bằng DCT — đặc trưng chuẩn của xử lý tiếng nói suốt 40 năm.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh D · #4 ← cần [[mel-spectrogram]] · → kế tiếp [[tien-nhan-manh]]
**Chủ đề cha:** [[SECOND_BRAIN_DSP]]
**Tags:** #dsp #dac-trung

---

## 💡 Quy trình

**M**el-**F**requency **C**epstral **C**oefficients:

```
1. STFT                        → phổ theo khung
2. Mel filterbank              → 128 dải mel
3. log                         → dB
4. DCT (biến đổi cosine)       → giữ ~40 hệ số đầu   ← BƯỚC ĐẶC TRƯNG
```

Ba bước đầu chính là [[mel-spectrogram]]. Bước 4 là thứ làm nên MFCC.

## 🧩 Vì sao có bước DCT

**Hai lý do, cả hai đều quan trọng:**

**1. Khử tương quan.** Các dải mel kề nhau **tương quan rất mạnh** (phổ trơn nên hai dải cạnh nhau giá trị gần nhau). Đặc trưng tương quan là dữ liệu thừa, và làm hỏng các model giả định độc lập (Naive Bayes, GMM với ma trận hiệp phương sai chéo). DCT tách chúng ra gần như độc lập — vai trò giống hệt [[ml/pca]], chỉ khác là dùng cơ sở cố định thay vì học từ dữ liệu.

**2. Tách "hình dạng thô" khỏi "chi tiết mịn".** Đây là ý tưởng sâu hơn:

| Hệ số DCT | Mã hoá | Trong tiếng nói tương ứng |
|---|---|---|
| **Bậc thấp** (1–13) | **Đường bao phổ** — hình dạng tổng thể | Hình dạng **khoang miệng** → âm vị nào |
| **Bậc cao** | Dao động nhanh trong phổ | **Cao độ** (tần số dây thanh) |

Giữ 13 hệ số đầu = giữ *"người này đang nói âm gì"* và **bỏ** *"người này nói giọng cao hay thấp"*. Với nhận dạng tiếng nói thì đó chính xác là điều mong muốn.

> 📌 Từ **"cepstral"** là đảo chữ của **"spectral"**, và trục của nó gọi là **"quefrency"** (đảo của "frequency"). Cepstrum = phổ của log-phổ — một phép biến đổi Fourier áp lên chính kết quả của Fourier.

## ⚙️ Delta & delta-delta

MFCC của một khung chỉ mô tả **một khoảnh khắc tĩnh**. Thêm đạo hàm theo thời gian:

| | Là gì | Bắt được |
|---|---|---|
| **MFCC** | Giá trị | Phổ **tại** khung đó |
| **Δ** (delta) | Đạo hàm bậc 1 | Phổ **đang đổi** theo hướng nào |
| **ΔΔ** (delta-delta) | Đạo hàm bậc 2 | Tốc độ đổi |

Project dùng **40 MFCC + Δ + ΔΔ = 120 giá trị mỗi khung**, rồi × **7 thống kê** = **840 chiều** — chiếm 90% của vector 931 chiều.

Delta đặc biệt quan trọng cho **4 lớp không dừng** (`gun_shot`, `dog_bark`, `car_horn`, `drilling`): với chúng, MFCC trung bình gần như vô nghĩa vì phần lớn clip là im lặng. **Sự thay đổi** mới là đặc trưng. Xem [[tin-hieu-dung]].

## ⚠️ MFCC có còn cần thiết không

Câu hỏi mở đáng suy nghĩ nhất của nhánh này:

| | **MFCC + SVM/RF** | **Mel-spectrogram + CNN** |
|---|---|---|
| Đặc trưng | Người thiết kế | **Mạng tự học** |
| Dữ liệu cần | Ít | Nhiều |
| Diễn giải | Được | Khó |
| Xu hướng hiện nay | Giảm dần | ⭐ Chuẩn mới |

DCT **vứt bỏ thông tin** (giữ 40/128 hệ số). Với CNN có đủ dữ liệu thì việc vứt đó là **mất mát không cần thiết** — mạng tự học được cách nén tốt hơn cho đúng bài toán của nó.

Nhưng MFCC vẫn thắng khi: dữ liệu ít, cần chạy trên thiết bị yếu, hoặc cần giải thích được model.

Kết quả của project cho một manh mối liên quan: **DSP preprocessing không cải thiện độ chính xác** (mọi `p > 0,05`), gợi ý rằng **feature extraction hiện đại đã nắm hết thông tin cần thiết** — bước lọc thủ công trước đó thành thừa. Xem [[phan-loai-am-thanh]].

## ⚠️ Điều dễ nhầm

- **Hệ số thứ 0 (`C0`) là năng lượng tổng**, không phải hình dạng phổ. Thường bị bỏ hoặc thay bằng log-energy riêng.
- **MFCC nhạy với nhiễu và nhiễu kênh** hơn hẳn mel-spectrogram — vì DCT trộn mọi dải mel lại, nhiễu ở một dải lan sang tất cả hệ số.
- **Số hệ số 13 vs 40:** 13 là truyền thống cho tiếng nói; project dùng 40 vì âm thanh môi trường có cấu trúc phổ phức tạp hơn tiếng nói.

---

## 🔗 Liên kết
- **Tiền đề:** [[mel-spectrogram]] · [[dac-trung-pho]]
- **Dẫn tới:** [[tien-nhan-manh]] · [[phan-loai-am-thanh]]
- **Liên môn:** [[ml/pca]] — DCT ở đây đóng vai trò khử tương quan y như PCA, chỉ khác là cơ sở cố định. · [[dl/vi-sao-can-cnn]]

## ❓ Câu hỏi mở
- Nếu DCT vứt thông tin mà vẫn cho kết quả tương đương CNN trên dataset này, phải chăng dataset chưa đủ lớn để CNN phát huy?

## 📚 Nguồn
- DSP501 — báo cáo cuối kỳ, §4.1
