---
slug: xgboost
title: Gradient Boosting & XGBoost
vault: ml
type: concept
branch: E
order: 9
status: learning
tags: [ml, thuat-toan, ensemble, boosting]
prev: [ensemble-learning, decision-tree, gradient-descent, adaboost]
sources: [L7_Ensemble.pdf]
created: 2026-06-14
---

# Gradient Boosting & XGBoost

> Tóm tắt 1 câu: Boosting xây **cây NỐI TIẾP** — mỗi cây mới fit vào **residual (sai số còn lại)** của tổ hợp trước, mà residual đó **= −gradient của loss** → mỗi cây là 1 bước **gradient descent trong KHÔNG GIAN HÀM**. **XGBoost** = Gradient Boosting + regularization + Newton (bậc 2) + tối ưu engineering → chuẩn vàng cho dữ liệu bảng.

**Ngày tạo:** 2026-06-14
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E (Thuật toán) · #9 · nhánh Boosting ← cần [[ensemble-learning]] · [[decision-tree]] · [[gradient-descent]] · [[adaboost]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #ml #thuat-toan #ensemble #boosting
**Nguồn slide:** `L7_Ensemble.pdf` — TS. Cao Tiến Dũng

---

## 💡 Ý chính
- Khác [[adaboost]] (reweight **mẫu** sai, chỉ exponential loss) → Gradient Boosting (Friedman 2001) **fit residual** → hoạt động với **BẤT KỲ loss có đạo hàm** (MSE, MAE, Log Loss…).
- Khác hẳn [[random-forest]] (cây độc lập, song song, vote) → boosting cây **nối tiếp sửa lỗi** → giảm **bias**.

## 🥊 AdaBoost vs Gradient Boosting — 2 cách "sửa lỗi"
Cả hai đều boosting (nối tiếp, ↓bias), khác ở **cách model sau biết chỗ nào cần sửa**:

| | **[[adaboost]]** | **Gradient Boosting** |
|--|------------------|------------------------|
| Báo lỗi cho model sau | **tăng TRỌNG SỐ mẫu sai** (wᵢ) | **fit vào RESIDUAL** (sai số còn lại) |
| Mẫu khó được chú ý nhờ | weight lớn → train có trọng số | residual lớn → cây mới ưu tiên giảm |
| Loss hỗ trợ | **chỉ exponential loss** | **BẤT KỲ loss có đạo hàm** (MSE/MAE/LogLoss/Huber) |
| Robust noise | **kém** (mẫu nhiễu weight tăng mãi) | **tốt hơn** (chọn loss robust: Huber/MAE) |
| Gộp | bỏ phiếu trọng số α | cộng dồn η·hₘ |
| Quan hệ | trường hợp riêng | **khung tổng quát** |

> 🔑 Vì sao GB "thắng" AdaBoost: **fit-residual tổng quát hơn reweight-mẫu** → đổi loss tùy bài (robust noise), mở sang regression dễ → nền cho XGBoost. (Thực ra **AdaBoost ≈ GB với exponential loss**.)

## ⚙️ Gradient Boosting — thuật toán (regression)
```
1. Khởi tạo: F₀(x) = argmin_c Σ L(yᵢ, c)   (vd F₀ = mean(y) cho MSE)
2. For m = 1 to M:
   a. pseudo-residual: rᵢₘ = −∂L(yᵢ, F(xᵢ)) / ∂F(xᵢ)     ← negative gradient
   b. fit regression tree hₘ vào rᵢₘ
   c. cập nhật: Fₘ(x) = Fₘ₋₁(x) + η·hₘ(x)               ← η = learning rate
3. Output: Fₘ = F₀ + η·h₁ + η·h₂ + … + η·hₘ
```
> 🔑 **Vì sao tên "Gradient"?** GD thường cập nhật **tham số** `θ ← θ − η·∂L/∂θ`. GB cập nhật **HÀM** `F(x) ← F(x) − η·∂L/∂F`. Vì F là hàm không phải số → **dùng cây hₘ xấp xỉ −∂L/∂F** → mỗi cây = 1 bước gradient descent trong **function space**. Pseudo-residual **chính là** negative gradient.

| Loss L(y,F) | Pseudo-residual rᵢ = −∂L/∂F | Dùng cho |
|-------------|----------------------------|----------|
| MSE ½(y−F)² | **y − F** (residual thường) | Regression |
| MAE \|y−F\| | sign(y − F) | Regression robust |
| Log Loss | **y − p** (probability) | Classification |

## 🎚️ Learning rate (shrinkage) & Regularization
`Fₘ = Fₘ₋₁ + η·hₘ` — η điều tiết mỗi cây đóng góp bao nhiêu:
- **η nhỏ (0.01–0.1):** mỗi cây góp ít → cần **nhiều cây** hơn → **tổng quát hoá TỐT hơn**.
- **η lớn (0.3–1.0):** hội tụ nhanh → **dễ overfit**.
- ⚖️ **Trade-off vàng: η nhỏ + B lớn + early stopping** = tốt nhất (chỉ chậm hơn).

| Kỹ thuật | Range | Tác dụng |
|----------|-------|----------|
| `learning_rate` η | 0.01–0.3 | giảm overfit, cần nhiều cây |
| `subsample` | 0.5–0.8 | Stochastic GB (lấy mẫu hàng như RF) |
| `max_depth` | 3–6 | giới hạn độ sâu tương tác |
| `n_estimators` | 100–1000 | dùng **early stopping** |

## ⏹️ Early Stopping — "phanh" của boosting
Boosting thêm cây mãi → train loss giảm mãi nhưng **val loss tới đáy rồi TĂNG** (bắt đầu overfit). Early stopping = **dừng khi val không cải thiện sau `k` vòng liên tiếp**:
```python
model = XGBClassifier(n_estimators=2000, learning_rate=0.05,
                      early_stopping_rounds=50, eval_metric='logloss')
model.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)
print(model.best_iteration)   # số cây tối ưu = đáy val loss
```
- Đặt `n_estimators` **lớn dư** (vd 2000) → early stopping **tự tìm** số cây tối ưu (`best_iteration`) → **KHỎI grid `n_estimators`**.
- ⚠️ Cần **eval_set riêng (validation)**, **KHÔNG dùng Test** (test chỉ chấm 1 lần cuối → [[cross-validation]] · [[hyperparameter-tuning]]).
- 🤝 Combo vàng: **η nhỏ + n_estimators lớn + early stopping** → chính xác mà không overfit.
- 🆚 Khác [[random-forest]]: RF tăng B **an toàn** (khỏi early stop); boosting tăng cây **nguy hiểm** → bắt buộc có phanh này.

> 🔑 Early stopping **thay việc tune `n_estimators` thủ công** — để model tự dừng ở đáy val loss.

## 🚀 XGBoost = GB + 3 cải tiến (Chen & Guestrin, 2016)
**① Regularized Objective** — phạt độ phức tạp ngay trong hàm mục tiêu:
$$\text{Obj} = \sum_i L(y_i,\hat y_i) + \sum_k \Omega(f_k), \quad \Omega(f) = \gamma T + \tfrac12\lambda\sum_j w_j^2$$
(T = số lá, wⱼ = giá trị lá, γ phạt thêm lá, λ = L2). GB truyền thống **không có** Ω.

**② Newton's method (Taylor bậc 2)** — GB chỉ dùng gradient (bậc 1); XGBoost dùng cả **hessian** (bậc 2):
$$L(y_i,\hat y_i+f_t) \approx L + g_i f_t + \tfrac12 h_i f_t^2,\quad g_i=\partial L/\partial\hat y,\ h_i=\partial^2 L/\partial\hat y^2$$
→ "curvature" cho biết **bước đi bao xa là tối ưu** → hội tụ nhanh hơn, split chính xác hơn.

**③ Engineering** — sparsity-aware (tự xử lý **NaN** = default direction), column block (cache-friendly, sorted), parallel split-finding, out-of-core → **nhanh 10x+**.

**Split Gain (quyết định có split không, kèm pruning tự động):**
$$\text{Gain} = \tfrac12\Big[\tfrac{G_L^2}{H_L+\lambda} + \tfrac{G_R^2}{H_R+\lambda} - \tfrac{(G_L+G_R)^2}{H_L+H_R+\lambda}\Big] - \gamma$$
(G = Σgradient, H = Σhessian mỗi nhánh). **Gain ≤ 0 → KHÔNG split** (post-pruning bằng γ — GB truyền thống không có).

## 📊 GB truyền thống vs XGBoost
| Tiêu chí | Gradient Boosting | **XGBoost** |
|----------|-------------------|-------------|
| Objective | Loss only | Loss + **Regularization Ω** |
| Optimization | Gradient (bậc 1) | **Newton** (gradient + hessian bậc 2) |
| Pruning | pre-pruning (max_depth) | **post-pruning** (Gain<0, γ) |
| Missing values | cần impute trước | **tự động** (default direction) |
| Parallel | không (sequential) | **column-parallel** split finding |
| Tốc độ | chậm | **nhanh 10x+** |

## 🎛️ Hyperparameter XGBoost & chiến lược tune
| Tham số | Range | Khuyến nghị |
|---------|-------|-------------|
| `learning_rate` η | 0.01–0.3 | 0.05–0.1 + early stop |
| `max_depth` | 3–10 | **3–6** (tabular) |
| `n_estimators` | 50–1000 | dùng early_stopping |
| `subsample` / `colsample_bytree` | 0.5–1.0 | 0.7–0.8 |
| `reg_lambda` (λ) / `reg_alpha` (α) | 0–10 | λ=1, α=0 |
| `gamma` (γ) / `min_child_weight` | — | tăng nếu overfit |
> 🧭 Chiến lược: ① fix η=0.1, tune `max_depth`+`subsample` → ② tìm `n_estimators` qua early stopping → ③ tune `reg_lambda`+`colsample` → ④ giảm η, tăng n_estimators. (→ [[hyperparameter-tuning]])

## 👨‍👩‍👧 Gia đình boosting
| Thư viện | Điểm nổi bật |
|----------|--------------|
| **XGBoost** ⭐ | regularization + Newton + nuốt NaN; vua Kaggle/tabular |
| **LightGBM** | rất nhanh, leaf-wise, GOSS+EFB; hợp **data lớn (>1M)** |
| **CatBoost** | xử lý **categorical** tốt natively |

## ⚠️ Lỗi thường gặp / Điều dễ nhầm
- **Quá nhiều cây + η lớn → overfit** nặng → cần early stopping + regularization (λ, γ).
- Nhầm với [[random-forest]]: RF song song ↓variance · boosting nối tiếp ↓bias.
- Nhầm reweight-mẫu ([[adaboost]]) với fit-residual (GB) — GB tổng quát hơn (mọi loss).
- "XGBoost luôn nhất" → data nhỏ/đơn giản thì [[logistic-regression]] đã đủ.

---

## 🔗 Liên kết
- **Tiền đề:** [[ensemble-learning]] · [[decision-tree]] · [[gradient-descent]] · [[loss-function]] · [[adaboost]]
- **Liên quan:** [[regularization]] (λ, α) · [[hyperparameter-tuning]] (tune) · [[bias-variance]] (↓bias)
- **So với:** [[random-forest]] (bagging) · [[logistic-regression]] (baseline)
- **Thuộc:** [[chon-mo-hinh]] · [[phan-loai-hoc-may]]

## ❓ Câu hỏi mở
- Khi nào LightGBM (leaf-wise) thắng XGBoost (level-wise)?

## 📚 Nguồn
- Slide môn học — TS. Cao Tiến Dũng (`L7_Ensemble.pdf`).
- Friedman (2001) Gradient Boosting · Chen & Guestrin (2016) XGBoost · StatQuest — "Gradient Boost", "XGBoost".
