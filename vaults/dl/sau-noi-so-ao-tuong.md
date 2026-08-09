---
slug: sau-noi-so-ao-tuong
title: "6 nỗi sợ \"ảo tưởng thành công\""
vault: dl
type: concept
branch: G
order: 10
status: done
tags: [dl, danh-gia, thuc-chien]
prev: [callbacks-keras]
next: [bay-am-tham]
created: 2026-08-02
---

# 6 nỗi sợ "ảo tưởng thành công"

> Tóm tắt 1 câu: Con số đẹp nhưng dối trá — kiểm hết bảng này **trước khi tin** bất kỳ kết quả nào.

**Ngày tạo:** 2026-08-02
**Trạng thái:** ✅ Đã nắm
**📖 Lộ trình:** Nhánh G · #10 ← cần [[callbacks-keras]] · → kế tiếp [[bay-am-tham]]
**Chủ đề cha:** [[SECOND_BRAIN_DL]]
**Tags:** #dl #danh-gia #thuc-chien

---

## 💡 Bảng 6 nỗi sợ

| Nỗi sợ | Trông thì | Thật ra | Phòng thủ |
|---|---|---|---|
| **Overfitting** | train acc ~100% | Học thuộc nhiễu → test tệ | [[error-chart]] · EarlyStopping · dropout · augmentation |
| **Data leakage** ⚠️ *đáng sợ nhất* | **cả test cũng cao** | Hỏng luôn thước đo → **không biết mình sai** | [[chong-ro-ri-du-lieu]] |
| **Lệch lớp** | Accuracy 99% | Recall 0% | F1 / PR-AUC · `class_weight` · chỉnh threshold |
| **Sampling bias** | Giỏi trên tập của mình | Tập không đại diện thực tế | Tập đủ lớn & đại diện điều kiện deploy |
| **BatchNorm chưa hội tụ** 🆕 | **train `0.9233`** rất đẹp | **test sập `0.2533`** — moving stats còn ở khởi tạo | Đủ update · hạ momentum · hoặc bỏ BN khi train ngắn |
| **Test dễ hơn val** 🆕 | Test score cao bất ngờ | Kết quả **lạc quan giả** | Nghi khi `test_loss < val_loss`. **Ghi rõ trong báo cáo** |

## 📊 Bằng chứng — BatchNorm sập ở test

AlexNet trên MNIST, 6.000 ảnh × 2 epoch:

| Cấu hình | Test Acc | train_acc |
|---|---|---|
| Baseline (Adam 1e-3) | 0.9318 | 0.8383 |
| **+ BatchNorm** | **0.2533** 💥 | 0.9233 |
| + BatchNorm + Dropout 0.5 | 0.8289 | 0.8678 |
| **Head `1024→256→10`** | **0.9571** ⭐ | 0.9548 |

Với `momentum=0.99` và chỉ **170 update**: `0.99¹⁷⁰ ≈ 0.18` → moving stats còn **18% giá trị khởi tạo**. Xem [[batch-normalization]].

## ⚠️ Kim chỉ nam

💡 **Kết quả đẹp bất thường → nghi rò rỉ trước tiên, đừng ăn mừng.**

---

## 🔗 Liên kết
- **Tiền đề:** [[callbacks-keras]] · [[chong-ro-ri-du-lieu]]
- **Dẫn tới:** [[bay-am-tham]]
- **Liên quan tới:** [[batch-normalization]] · [[group-leakage]]
