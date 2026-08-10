---
slug: sgd
title: SGD & Mini-batch
vault: ml
type: concept
branch: A
order: 9
status: learning
tags: [toan, toi-uu-hoa, huan-luyen]
prev: [gradient-descent]
next: [learning-rate]
related: [gradient-descent, adam-optimizer]
created: 2026-08-10
---

# SGD & Mini-batch

> Tóm tắt 1 câu: thay vì tính gradient trên **toàn bộ** dữ liệu mỗi bước, chỉ tính trên một **lô nhỏ** — gradient nhiễu hơn nhưng đi được **nhiều bước hơn rất nhiều** trong cùng thời gian.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A (Giải tích → Tối ưu) · #9 ← cần [[gradient-descent]] · → kế tiếp [[learning-rate]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #toi-uu-hoa #huan-luyen

---

## 💡 Ba biến thể

| Biến thể | Mỗi bước dùng | Số bước/epoch | Gradient |
|---|---|---|---|
| **Batch GD** | **Toàn bộ** `N` mẫu | **1** | Chính xác, mượt |
| **SGD** thuần | **1** mẫu | `N` | Rất nhiễu |
| **Mini-batch** ⭐ | `B` mẫu (32–256) | `N/B` | Nhiễu vừa phải |

**Mini-batch là thứ dùng thực tế.** Khi người ta nói "SGD" trong ngữ cảnh deep learning thì gần như luôn có nghĩa là mini-batch.

## 🧩 Vì sao gradient nhiễu lại thắng gradient chính xác

Với `N = 1.000.000` mẫu:

| | Batch GD | Mini-batch (`B=128`) |
|---|---|---|
| Chi phí mỗi bước | 1.000.000 phép | **128** phép |
| Số bước sau 1 lượt qua dữ liệu | 1 | **7.812** |

Gradient của mini-batch là **ước lượng không chệch** của gradient thật — trung bình thì đúng hướng, chỉ dao động quanh nó. Và **đi 7.812 bước hơi lệch tốt hơn nhiều so với đi 1 bước hoàn hảo**.

> 📌 Đây là một đánh đổi lặp lại khắp ML: **xấp xỉ nhanh thường thắng chính xác chậm**, miễn là xấp xỉ không chệch.

## ⚙️ Nhiễu là tính năng, không phải lỗi

Ba lợi ích của việc gradient bị nhiễu:

**1. Thoát điểm yên ngựa và cực tiểu địa phương nông.** Gradient thật bằng 0 tại yên ngựa → Batch GD **đứng im**. Mini-batch có gradient khác 0 (do nhiễu) → vẫn nhích được và thoát ra. Xem [[toi-uu-hoa]].

**2. Tổng quát hoá tốt hơn.** Nhiễu khiến thuật toán khó rơi vào **cực tiểu hẹp và sâu** (thường ứng với [[overfitting]]) và thiên về **cực tiểu rộng, thoải** — vốn bền hơn với dữ liệu mới.

**3. Vừa bộ nhớ.** Không cần nạp cả dataset vào RAM/VRAM — điều kiện bắt buộc để train trên dữ liệu lớn.

## ⚙️ Chọn batch size

| Batch size | Được | Mất |
|---|---|---|
| **Nhỏ** (8–32) | Nhiễu nhiều → tổng quát tốt hơn; ít bộ nhớ | Chậm (không tận dụng song song GPU); train dao động |
| **Lớn** (512+) | Tận dụng GPU tối đa; gradient ổn định | Tốn bộ nhớ; ⚠️ có xu hướng **tổng quát kém hơn** |

Quy tắc thực dụng: bắt đầu **32 hoặc 64**, tăng dần tới mức GPU chịu được. Tăng batch size thì thường phải **tăng [[learning-rate]] theo** (quy tắc căn bậc hai hoặc tuyến tính) — hai siêu tham số này gắn với nhau, xem [[../vaults/dl/batch-size-va-learning-rate|dl/batch-size-va-learning-rate]].

## ⚠️ Điều dễ nhầm

- **Phải xáo trộn dữ liệu mỗi epoch.** Không shuffle thì các lô luôn giống nhau và thứ tự cố định → thuật toán học cả thứ tự đó. ⚠️ Nhưng shuffle phải tôn trọng cấu trúc nhóm — xem [[../vaults/dsp/fold-va-ro-ri-du-lieu|dsp/fold-va-ro-ri-du-lieu]].
- **Một "epoch" là một lượt qua toàn bộ dữ liệu**, không phải một bước cập nhật. Với `N/B` bước mỗi epoch, số bước cập nhật thật lớn hơn số epoch rất nhiều.
- **Loss dao động khi train là bình thường** với SGD. Đường loss răng cưa không có nghĩa là sai — chỉ khi nó **không giảm theo xu hướng** mới đáng lo.

---

## 🔗 Liên kết
- **Tiền đề:** [[gradient-descent]]
- **Dẫn tới:** [[learning-rate]] · [[adam-optimizer]]
- **Liên quan:** [[toi-uu-hoa]] · [[overfitting]]
- **Liên môn:** [[dl/cac-loai-gradient-descent]] · [[dl/batch-size-va-learning-rate]]

## ❓ Câu hỏi mở
- Batch lớn tổng quát kém hơn — do nhiễu ít, hay do số bước cập nhật ít đi?

## 📚 Nguồn
- `L1_Math_Overview.pdf` · `L8_NeuralNetwork.pdf`
