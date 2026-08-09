---
slug: ensemble-learning
title: Ensemble Learning (Học kết hợp)
vault: ml
type: concept
branch: E
order: 6
status: learning
tags: [ml, thuat-toan, ensemble, supervised]
prev: [decision-tree, bias-variance]
sources: [L7_Ensemble.pdf]
created: 2026-06-28
---

# Ensemble Learning (Học kết hợp)

> Tóm tắt 1 câu: Thay vì tin 1 model, **kết hợp nhiều model yếu (weak learners) → 1 model mạnh** — như "trí tuệ đám đông" (7 bác sĩ hội chẩn > 1). Hai nhánh chính: **Bagging** (song song → giảm **variance**) và **Boosting** (nối tiếp → giảm **bias**).

**Ngày tạo:** 2026-06-28
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E (Thuật toán) · #6 · hub trước [[random-forest]] · [[xgboost]] ← cần [[decision-tree]] · [[bias-variance]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #ml #thuat-toan #ensemble #supervised
**Nguồn slide:** `L7_Ensemble.pdf` — TS. Cao Tiến Dũng

---

## 💡 Ý chính — "Wisdom of the Crowd"
- Kết hợp nhiều model **đa dạng (diverse)** và **tốt hơn random** → kết quả chung chính xác & ổn định hơn từng cái.
- Ví von: hội đồng 7 bác sĩ hội chẩn > 1 bác sĩ; ban giám khảo 7 người > 1 người.
- **Điều kiện sống còn:** các model phải **ĐA DẠNG** (sai khác nhau thì mới triệt tiêu lỗi cho nhau). Giống hệt nhau → gộp vô ích.

## 🎯 Vì sao hoạt động — gắn với Bias–Variance
$$\text{Error}(x) = \text{Bias}^2 + \text{Variance} + \text{Noise}$$
> 🎯 **Mục tiêu ensemble: giảm 1 thành phần mà KHÔNG tăng cái còn lại.** Hai chiến lược tấn công hai thành phần khác nhau → xem [[bias-variance]].

## 🌳 3 họ ensemble
| Họ | Cách kết hợp | Giảm gì | Ví dụ |
|----|--------------|---------|-------|
| **Bagging** (Parallel) | model train **song song, độc lập** → vote/average | **Variance** ↓ | Bagging, **[[random-forest]]** |
| **Boosting** (Sequential) | model train **nối tiếp**, cái sau **sửa lỗi** cái trước | **Bias** ↓ | [[adaboost]], Gradient Boosting, **[[xgboost]]** |
| **Stacking** (Blending) | gộp output nhiều model **khác loại** bằng 1 **meta-learner** | cả hai | Stacked Generalization |

> 📌 **Stacking — thực tế dùng khi nào (đính chính hiểu nhầm):** Stacking là **kỹ thuật của ML cổ điển / data BẢNG**, KHÔNG phải đặc sản deep learning. Cơ chế: nhiều **base model khác loại** (level-0: XGBoost+LightGBM+RF+Logistic…) → 1 **meta-learner** (level-1) học cách gộp dự đoán out-of-fold.
> - 🏆 Bùng nổ ở **Kaggle tabular** (đua thêm <1% accuracy bằng cách stack 5–10 model đa dạng).
> - 🏭 **Production thường BỎ QUA**: lợi ích nhỏ nhưng chi phí gấp nhiều lần (train/maintain nhiều model, latency, dễ hỏng) → chọn **1 XGBoost tune kỹ**.
> - Deep learning thì dùng averaging/snapshot ensemble đơn giản, hiếm khi stacking meta-learner.

## ⚖️ Bagging vs Boosting — bảng đối chiếu cốt lõi
| | **Bagging / RF** | **Boosting** |
|--|------------------|--------------|
| Chiến lược | song song, độc lập | nối tiếp, phụ thuộc |
| Base learner | cây **SÂU** (low bias, high var) | cây **NÔNG / stump** (high bias, low var) |
| Tấn công | **Variance** (trung bình hóa triệt tiêu dao động) | **Bias** (sửa lỗi tuần tự) |
| Bias sau ensemble | ≈ không đổi | **giảm mạnh** |
| Variance sau ensemble | **giảm mạnh** (÷B) | có thể **tăng** → cần regularization |
| Overfit risk | **thấp** (tăng B an toàn) | **cao** (cần early stopping, η nhỏ) |
| Trọng số model | đều nhau | khác nhau (theo độ tốt) |

## 🧭 Lineage — đọc theo dòng tiến hóa
```
[[decision-tree]] (1 cây, variance cao)
   │  ① data randomness (bootstrap)
   ▼
Bagging  ──② feature randomness──►  [[random-forest]]   (go-to baseline tabular)
   
[[decision-tree]] stump (bias cao)
   │  reweight sample sai
   ▼
[[adaboost]] ──tổng quát hóa (fit residual, any loss)──► Gradient Boosting
                                                              │ + regularization + Newton bậc 2 + engineering
                                                              ▼
                                                          [[xgboost]]  (chuẩn vàng competition)
```

## 🗺️ Chọn ensemble nào? (decision flowchart)
| Nhu cầu | → Chọn |
|---------|--------|
| Baseline nhanh, ít tuning | **Random Forest** |
| Accuracy tối đa trên tabular | **XGBoost / LightGBM** |
| Data ít noise, muốn đơn giản | AdaBoost |
| Cần giải thích | Single [[decision-tree]] hoặc RF + feature importance |
| Có missing values, cần nhanh | XGBoost (xử lý NaN native) |
| Data rất lớn (>1M dòng) | LightGBM (GOSS+EFB) |
> 💡 Thực tế: **thử RF baseline → nếu cần hơn → XGBoost + tuning.** Luôn bắt đầu đơn giản.

## ⚠️ Lỗi thường gặp / Điều dễ nhầm
- Tưởng "ensemble luôn thắng" → nếu các model **không đa dạng** (cùng sai 1 kiểu) thì gộp vô ích.
- Nhầm Bagging với Boosting: **Bagging song song giảm variance · Boosting nối tiếp giảm bias.**
- Boosting **không "miễn nhiễm overfit"** như bagging — quá nhiều vòng/η lớn → overfit.

---

## 🔗 Liên kết
- **Tiền đề:** [[decision-tree]] · [[bias-variance]] · [[lay-mau]] (bootstrap)
- **Nhánh Bagging:** [[random-forest]]
- **Nhánh Boosting:** [[adaboost]] · [[xgboost]] (Gradient Boosting)
- **Thuộc:** [[chon-mo-hinh]] · [[phan-loai-hoc-may]]

## ❓ Câu hỏi mở
- Vì sao cây SÂU cho bagging nhưng cây NÔNG cho boosting?

## 📚 Nguồn
- Slide môn học — TS. Cao Tiến Dũng (`L7_Ensemble.pdf`).
- Breiman (1996) Bagging · (2001) Random Forests · Freund & Schapire (1996) AdaBoost · Friedman (2001) Gradient Boosting · Chen & Guestrin (2016) XGBoost.
