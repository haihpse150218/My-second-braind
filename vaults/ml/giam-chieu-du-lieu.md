---
slug: giam-chieu-du-lieu
title: Giảm chiều dữ liệu
vault: ml
type: concept
branch: B
order: 7
status: learning
tags: [toan, giam-chieu, xu-ly-du-lieu]
prev: [svd]
next: [pca]
related: [pca, feature-selection]
created: 2026-08-10
---

# Giảm chiều dữ liệu

> Tóm tắt 1 câu: bớt số cột mà giữ được phần lớn thông tin — cần thiết vì ở chiều cao, **khoảng cách mất ý nghĩa** và dữ liệu trở nên quá thưa.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh B (Đại số tuyến tính → PCA) · #7 ← cần [[svd]] · → kế tiếp [[pca]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #giam-chieu #xu-ly-du-lieu

---

## 💡 Vì sao cần — lời nguyền số chiều

Ba hệ quả cụ thể khi số chiều tăng:

**1. Dữ liệu thưa dần theo hàm mũ.** Muốn phủ mỗi chiều bằng 10 mức: 1 chiều cần 10 mẫu, 2 chiều cần 100, **10 chiều cần 10 tỉ**. Dataset thật không bao giờ đủ dày ở chiều cao.

**2. Khoảng cách mất ý nghĩa.** Ở chiều rất cao, tỉ số giữa điểm gần nhất và xa nhất tiến về 1 — **mọi điểm gần như cách đều nhau**. Mọi thuật toán dựa trên khoảng cách ([[knn]], [[k-means]], [[svm]] với RBF) đều suy giảm.

**3. Quá nhiều tham số so với dữ liệu.** Nhiều chiều hơn → model dễ [[overfitting]] hơn.

Ví dụ thật trong kho: vector đặc trưng **931 chiều** của [[../vaults/dsp/dac-trung-pho|dsp501]] với chỉ ~7.800 mẫu train mỗi fold → buộc phải PCA xuống 200.

## ⚙️ Hai họ phương pháp — phân biệt quan trọng

| | **Chọn đặc trưng** (selection) | **Trích xuất đặc trưng** (extraction) |
|---|---|---|
| Làm gì | **Giữ lại** một tập con các cột gốc | **Tạo cột mới** = tổ hợp của cột cũ |
| Diễn giải | ✅ Giữ nguyên ý nghĩa cột | ❌ "PC1" không có ý nghĩa thực tế |
| Ví dụ | [[feature-selection]] — Lasso, RFE, RF importance | [[pca]], [[svd]], [[t-sne]], [[autoencoder]] |

> 📌 **Nếu cần giải thích model cho người khác thì chọn đặc trưng, không trích xuất.** Nói "biến X quan trọng" thì hiểu được; nói "PC3 quan trọng" thì không ai biết PC3 là gì.

## ⚙️ Bảng chọn phương pháp

| Phương pháp | Tuyến tính? | Dùng để | Ghi chú |
|---|---|---|---|
| **[[pca]]** | ✅ | Tiền xử lý, nén | Nhanh, có phép biến đổi ngược, áp được cho dữ liệu mới |
| **[[kernel-pca]]** | ❌ | Dữ liệu cong (xoắn ốc, vòng) | Đắt hơn, phải chọn kernel |
| **[[t-sne]]** | ❌ | ⚠️ **CHỈ để vẽ hình** 2D/3D | Không áp được cho dữ liệu mới |
| **[[autoencoder]]** | ❌ | Dữ liệu lớn, phi tuyến phức tạp | Cần train, cần nhiều dữ liệu |
| **[[svd]] rút gọn** | ✅ | Ma trận thưa, văn bản | Không cần trừ trung bình |

## ⚠️ Ba cái bẫy

**1. Phương sai lớn ≠ hữu ích cho bài toán.** PCA giữ hướng có phương sai lớn nhất — nhưng phương sai đo **độ trải rộng**, không đo **khả năng phân biệt lớp**. Hoàn toàn có thể xảy ra chuyện thông tin phân biệt hai lớp nằm ở thành phần có phương sai bé và bị PCA vứt đi.

→ Nếu mục tiêu là phân loại, cân nhắc **LDA** (tối đa hoá tách lớp) thay vì PCA (tối đa hoá phương sai).

**2. Bắt buộc [[chuan-hoa-du-lieu]] trước PCA.** Cột "thu nhập" (đơn vị triệu) sẽ có phương sai lớn hơn cột "tuổi" hàng tỉ lần → PC1 hoá ra chính là cột thu nhập. Đây **không phải phát hiện gì**, chỉ là hệ quả của đơn vị đo.

**3. 🚨 Rò rỉ dữ liệu.** Fit PCA trên **toàn bộ** dữ liệu rồi mới chia train/test là để thông tin tập test lọt vào. Phải `fit` **chỉ trên train**, rồi `transform` cho test. Cùng cái bẫy ở [[../vaults/dsp/fold-va-ro-ri-du-lieu|dsp/fold-va-ro-ri-du-lieu]].

## ⚙️ Chọn số chiều `k` bao nhiêu

| Cách | Làm sao |
|---|---|
| **Ngưỡng phương sai** | Giữ `k` sao cho tích luỹ đạt 95% (hoặc 99%) |
| **Elbow plot** | Vẽ phương sai giải thích theo `k`, tìm chỗ gãy |
| **Theo hiệu năng cuối** ⭐ | Coi `k` là siêu tham số, chọn bằng [[cross-validation]] |

Cách thứ ba đúng đắn nhất — vì tiêu chí thật là **model chạy tốt tới đâu**, không phải giữ được bao nhiêu phương sai.

---

## 🔗 Liên kết
- **Tiền đề:** [[svd]] · [[vector]]
- **Dẫn tới:** [[pca]] · [[kernel-pca]] · [[t-sne]]
- **Liên quan:** [[feature-selection]] · [[chuan-hoa-du-lieu]] · [[overfitting]] · [[autoencoder]]
- **Liên môn:** [[dsp/dac-trung-pho]] — 931 chiều trên ~7.800 mẫu là ví dụ thật của bài toán này.

## ❓ Câu hỏi mở
- Khi nào LDA thắng PCA rõ rệt, và vì sao PCA vẫn phổ biến hơn nhiều?

## 📚 Nguồn
- `L1_Math_Overview.pdf` · `L5_Regularization_FeatureSelection.pdf`
