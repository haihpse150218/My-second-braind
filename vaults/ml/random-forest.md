---
slug: random-forest
title: Rừng ngẫu nhiên (Random Forest)
vault: ml
type: concept
branch: E
order: 7
status: learning
tags: [ml, thuat-toan, ensemble, bagging, supervised]
prev: [decision-tree, ensemble-learning]
sources: [L7_Ensemble.pdf]
created: 2026-06-14
---

# Rừng ngẫu nhiên (Random Forest)

> Tóm tắt 1 câu: **Bagging nhiều cây + thêm Feature Randomness** — mỗi cây học từ một **bootstrap sample** (mẫu lấy-có-hoàn-lại) VÀ tại mỗi split chỉ xét **m đặc trưng ngẫu nhiên** → các cây ĐA DẠNG, **tương quan ρ thấp** → trung bình hóa giảm variance mạnh. "Go-to baseline" cho dữ liệu bảng.

**Ngày tạo:** 2026-06-14
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E (Thuật toán) · #7 nhánh Bagging ← cần [[decision-tree]] · [[ensemble-learning]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #ml #thuat-toan #ensemble #bagging #supervised
**Nguồn slide:** `L7_Ensemble.pdf` — TS. Cao Tiến Dũng

---

## 💡 Ý chính
- Nhiều cây cùng bỏ phiếu → "trí tuệ đám đông" ([[ensemble-learning]]).
- Mỗi cây thấy một **MẪU ngẫu nhiên** của dữ liệu + **tập đặc trưng ngẫu nhiên** → góc nhìn khác nhau → các cây **đa dạng** → triệt tiêu lỗi ngẫu nhiên của nhau.

## 🎲 Nền tảng 1 — Bootstrap Sampling
- **Lấy mẫu CÓ HOÀN LẠI** từ dataset gốc, mỗi bootstrap cùng kích thước n → một số mẫu lặp lại, một số bị bỏ.
- 🔢 P(1 mẫu KHÔNG được chọn) = $(1-\frac{1}{n})^n \to e^{-1} \approx$ **0.368**.
  - → mỗi bootstrap chứa **~63.2% mẫu unique**, **~36.8% bị bỏ** ("Out-of-Bag").
- Mỗi cây train trên 1 bootstrap khác → **diversity** mà không cần thêm data → [[lay-mau]].

## 🆓 Nền tảng 2 — OOB Evaluation (validation MIỄN PHÍ)
- Với mỗi mẫu xᵢ: dùng **~36.8% cây KHÔNG thấy xᵢ** để predict nó → vote → so nhãn thật → **OOB score**.
- = ước lượng test error **không cần tách validation set riêng**.
```python
rf = RandomForestClassifier(n_estimators=200, oob_score=True, random_state=42)
rf.fit(X_train, y_train);  print(rf.oob_score_)
```
| | OOB | [[cross-validation]] |
|--|-----|----|
| Chi phí | **miễn phí** (built-in) | tốn K lần train |
| Phù hợp | RF, Bagging | mọi model |
| Khi nào | nhanh, baseline | chính xác hơn |

## 📉 Vì sao Bagging giảm VARIANCE (mà KHÔNG đổi bias)
- Mỗi cây "grow full" = **low bias, HIGH variance** (đổi chút data → cây khác hẳn). Bagging **cố ý** chọn vậy: để trung bình hóa lo phần variance.
- Mỗi dự đoán = **tín hiệu thật + lỗi ngẫu nhiên** (lỗi khác nhau vì mỗi cây thấy bootstrap khác). Trung bình B cây → **tín hiệu giữ nguyên**, còn **lỗi ngẫu nhiên triệt tiêu nhau** (cái +, cái −).
- 🔢 Nếu B cây **độc lập** (variance σ²): $\text{Var}(\overline{T}) = \sigma^2/B$ → giảm **tuyến tính** theo B.
- 🎯 **Bias KHÔNG đổi:** $E[\overline{T}] = E[T_{\text{1 cây}}]$ → trung bình hóa **chỉ chạm variance, không chạm bias**. (Đây là lý do bagging dùng cây SÂU low-bias — bias đã thấp sẵn.)
- ⚠️ Thực tế cây **tương quan ρ** → variance không xuống tới σ²/B mà chững ở **sàn ρσ²** → xem Nền tảng 3 (động cơ feature randomness).

| Cấu hình (σ²=1) | Variance | Ghi chú |
|-----------------|----------|---------|
| 1 cây | 1.0 | gốc |
| 100 cây **độc lập** (ρ=0) | 0.01 | σ²/B — lý tưởng |
| 100 cây **tương quan** ρ=0.5 | 0.505 | chững ở sàn ρσ²=0.5 |
| 100 cây + RF hạ **ρ=0.2** | 0.208 | feature randomness kéo sàn xuống |

> 🔑 Bagging **giết phần lỗi ngẫu nhiên** $(1-\rho)/B$, **giữ nguyên bias**; sàn còn lại = **ρσ²** → muốn giảm tiếp phải hạ **ρ**.

## 🔑 Nền tảng 3 — vì sao cần Feature Randomness (không chỉ Bagging)
**Công thức variance của bagging:** $\text{Var} = \rho\sigma^2 + \frac{1-\rho}{B}\sigma^2$ (ρ = tương quan giữa cây, σ² = variance mỗi cây, B = số cây).
- Khi B → ∞: **Var → ρσ²** → còn 1 sàn cứng = ρσ². **Muốn giảm thêm → phải giảm ρ.**
- ⚠️ **Vấn đề Dominant Feature:** nếu 1 feature quá mạnh → **mọi cây bagging đều split nó ở root** → các cây gần giống nhau → **ρ cao** → trung bình hóa giúp ít.
- ✅ **Giải pháp RF:** tại mỗi split chỉ xét **m feature ngẫu nhiên** (≠ tất cả p) → feature mạnh không phải lúc nào cũng được xét → cây KHÁC nhau → **ρ giảm → variance giảm mạnh hơn**.
- → RF = **2 lớp ngẫu nhiên:** ① data (bootstrap) ② feature (random subset).

> 📰 **Ví dụ "tờ báo chung" (vì sao dominant feature phá Bagging):** đoán cân con bò chỉ chính xác khi đám đông **nghĩ ĐỘC LẬP**. Nếu cả 100 người **cùng đọc 1 tờ báo** rồi chép theo → 100 ý kiến **giống hệt** → trung bình = vẫn 1 ý kiến → đám đông không khôn hơn 1 người.
> - **Dominant feature = "tờ báo chung"**: feature quá mạnh → mọi cây cùng split nó ở root → cây giống hệt → **ρ ≈ 1** → sàn variance ρσ² ≈ σ² → trung bình bao nhiêu cây cũng vô ích.
> - **Random Forest ép đọc báo khác nhau**: mỗi split chỉ bốc m feature ngẫu nhiên → nhiều lần feature mạnh **không được xét** → cây buộc dùng feature khác → đa dạng thật → **ρ↓ → variance↓ mạnh**.
> - 🔑 *Wisdom of the crowd chỉ đúng khi đám đông nghĩ độc lập* — feature randomness chính là cách ép sự độc lập đó.

## 🎛️ `max_features` (m) — hyperparameter quan trọng nhất của RF
| m | Trường hợp |
|---|-----------|
| **√p** | classification (mặc định) |
| **p/3** | regression (mặc định) |
| 1 | Extra Trees (ngẫu nhiên tối đa) |
| p | = Bagging (không feature randomness) |
> m **nhỏ** → cây đa dạng, ρ thấp (nhưng mỗi cây yếu hơn → bias hơi tăng) · m **lớn** → mỗi cây mạnh, ρ cao. Trade-off.

## 📊 Feature Importance — 2 cách (đừng tin mù 1 cái)
| | **MDI (Gini importance)** | **Permutation importance** |
|--|---------------------------|----------------------------|
| Cách tính | trung bình ΔGini khi feature được split, trên mọi cây | shuffle 1 feature trên test → đo mức tụt accuracy |
| Code | `model.feature_importances_` | `permutation_importance(rf, X_test, y_test)` |
| Ưu | nhanh, built-in | không thiên vị, đo trên test |
| ⚠️ Nhược | **thiên vị feature high-cardinality** | chậm; bị ảnh hưởng bởi correlation |
> 💡 Dùng **CẢ HAI** và so sánh. Nghi ngờ → ưu tiên **Permutation**. (→ [[feature-selection]] embedded importance.)

## ✅ Ưu / ❌ Nhược / 🕐 Khi nào dùng (slide)
| ✅ Ưu | ❌ Nhược |
|------|---------|
| Hiệu suất cao, **ít tuning** · không cần scale | Chậm hơn 1 cây; tốn memory (B cây) |
| Numerical & categorical · robust outlier | **Black-box** (kém giải thích) |
| Feature importance + **OOB miễn phí** · dễ parallel | **Thường kém XGBoost** · extrapolation kém |
| **Khó overfit khi tăng B** (an toàn) | Predict chậm khi deploy |

→ **Khi nào:** baseline nhanh mạnh · nhiều feature cần importance · data noise/outlier · dataset nhỏ (dùng OOB). Cần accuracy tối đa → [[xgboost]].

> 🔧 **RF như CÔNG CỤ PHÂN TÍCH (không chỉ để deploy)** — không phải model nào cũng phải "về đích". RF đóng 3 vai: **sản phẩm cuối** · **baseline** ("bài có học được không, trần ~bao nhiêu") · **kính lúp phân tích**. Vai phân tích đặc biệt mạnh:
> - **Feature importance** → lọc feature rồi đưa vào model cuối (kể cả tuyến tính) = Embedded selection ([[feature-selection]]).
> - **Soi leakage** 🚨: score cao bất thường, hoặc **1 feature chiếm gần hết importance** → nghi rò rỉ.
> - **Hiểu data** nhanh trước khi đầu tư model nặng.
> ⚠️ Dùng đúng: (1) cross-check **Permutation** vì MDI thiên cardinality · (2) chạy importance/selection **chỉ trên train (trong CV)** chống leakage · (3) importance RF **không chuyển 1:1** sang model khác (cây bắt phi tuyến/tương tác) → dùng làm **gợi ý**, không phải luật.
> 🧭 Workflow: **RF (scout: baseline + importance + soi leakage) → model cuối (XGBoost/Logistic) về đích.**

## ⚠️ Lỗi thường gặp / Điều dễ nhầm
- Tưởng mỗi cây chia 1 vùng cố định → thực ra là **mẫu + đặc trưng ngẫu nhiên**.
- Tin `feature_importances_` (MDI) tuyệt đối → nó **thiên vị** → cross-check Permutation.
- Mất cân bằng lớp vẫn lệch → `class_weight='balanced'` ([[class-imbalance]]).
- **Tăng B không gây overfit** (chỉ chậm hơn) — khác với boosting.

---

## 🔗 Liên kết
- **Tiền đề:** [[decision-tree]] · [[ensemble-learning]] · [[lay-mau]] (bootstrap) · [[bias-variance]]
- **Liên quan:** [[overfitting]] (giảm variance) · [[hyperparameter-tuning]] (tune `max_features`+B) · [[feature-selection]] (importance)
- **So với:** [[xgboost]] (boosting, nối tiếp) · [[adaboost]]

## ❓ Câu hỏi mở
- Extra Trees (m=1, split ngẫu nhiên) khi nào thắng RF?

## 📚 Nguồn
- Slide môn học — TS. Cao Tiến Dũng (`L7_Ensemble.pdf`).
- Breiman (1996) Bagging · (2001) Random Forests · StatQuest — "Random Forests".
- 💻 Demo: `D:\MSA-FPT\Machine learning\code-practice\decision-tree-tuning-practice.ipynb` (nền cây + tune).
