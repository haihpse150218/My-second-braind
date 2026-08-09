---
slug: alexnet
title: AlexNet (2012)
vault: dl
type: concept
branch: B
order: 9
status: done
tags: [dl, cnn, kien-truc]
prev: [lenet]
next: [vgg]
created: 2026-08-02
---

# AlexNet (2012)

> Tóm tắt 1 câu: Bước ngoặt ImageNet — mạng lớn đầu tiên dùng **ReLU**, và cũng là bài học sống về "nhiều param ≠ tốt hơn".

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh B · #9 ← cần [[lenet]] · → kế tiếp [[vgg]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #cnn #kien-truc

---

## 💡 Đóng góp

- **Mạng lớn đầu tiên dùng ReLU** → train nhanh **~6 lần** so với tanh
- Dropout · data augmentation · train trên GPU
- Cú nhảy lớn ở **ILSVRC 2012** — mốc khởi đầu kỷ nguyên deep learning cho thị giác

## 📊 Bằng chứng tự chạy — 7 cấu hình, cùng ngân sách 6.000 ảnh × 2 epoch

| Cấu hình | Test Acc | train_acc |
|---|---|---|
| Baseline (Adam 1e-3) | 0.9318 | 0.8383 |
| **+ BatchNorm** | **0.2533** 💥 | 0.9233 |
| + BatchNorm + Dropout 0.5 | 0.8289 | 0.8678 |
| **Adam lr=1e-4** | **0.9543** | 0.9474 |
| Head `4096→4096→512→10` | 0.8136 | 0.4039 |
| **Head `1024→256→10`** (6,3M) | **0.9571** ⭐ | 0.9548 |

## ⚠️ 3 bài học rút ra

1. **[[batch-normalization]] sập ở test (0.2533) dù train tốt (0.9233)** — moving average chưa hội tụ
2. **Thêm layer để "thả từ từ" xuống lớp cuối làm TỆ HƠN** → [[flatten-vs-gap]]
3. **Hạ LR xuống `1e-4` thắng** — bước lớn ≠ học nhanh

⚠️ **Cảnh báo về chính bảng này**: cùng cấu hình baseline chạy 2 seed cho `0.9318` và `0.9564` — **nhiễu ~2,5 điểm**. Chênh lệch nhỏ hơn mức đó thì **không kết luận được**.

📌 AlexNet **29.987.530** param **thua** CNN nhỏ **225.034** param trên MNIST — vì chỉ có **170 update** so với **8.440**. Xem [[underfit-vs-overfit]].

---

## 🔗 Liên kết
- **Tiền đề:** [[lenet]] · [[relu-vs-sigmoid]]
- **Dẫn tới:** [[vgg]] · [[batch-normalization]]
