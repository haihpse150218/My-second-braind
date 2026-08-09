---
slug: adaboost
title: AdaBoost (Adaptive Boosting)
vault: ml
type: concept
branch: E
order: 8
status: learning
tags: [ml, thuat-toan, ensemble, boosting]
prev: [ensemble-learning, decision-tree]
next: [xgboost]
sources: [L7_Ensemble.pdf]
created: 2026-06-28
---

# AdaBoost (Adaptive Boosting)

> Tóm tắt 1 câu: Boosting đầu tiên thực dụng — train nối tiếp các **weak learner** (thường **decision stump**, cây depth=1); sau mỗi vòng **tăng trọng số các mẫu bị phân loại SAI** để model sau "chú ý" vào ca khó, rồi gộp các stump theo **trọng số α** (model tốt → α lớn).

**Ngày tạo:** 2026-06-28
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E (Thuật toán) · #8 · nhánh Boosting ← cần [[ensemble-learning]] · [[decision-tree]] · → kế tiếp [[xgboost]] (Gradient Boosting)
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #ml #thuat-toan #ensemble #boosting
**Nguồn slide:** `L7_Ensemble.pdf` — TS. Cao Tiến Dũng

---

## 💡 Ý chính
- **Câu hỏi nền (Kearns & Valiant, 1988):** "Nhiều weak learner có tạo thành 1 strong learner không?" → **CÓ** (Schapire, 1990).
- **Weak learner** = model chỉ cần accuracy **> 50%** (hơn random). Ví dụ: **decision stump** (cây depth=1).
- 🎓 Trực giác học sinh: làm 100 câu sai 10 → ôn 10 câu sai → còn 3 → ôn 3 → master. **Mỗi vòng tập trung vào chỗ đang sai.**

## ⚙️ Thuật toán — 4 bước (lặp T vòng)
```
1. Khởi tạo trọng số mẫu: wᵢ = 1/n (mọi mẫu chú ý như nhau)
2. Train weak learner hₜ với trọng số wᵢ
   → tính weighted error: εₜ = Σ wᵢ·I[yᵢ ≠ hₜ(xᵢ)]
3. Tính trọng số model:  αₜ = ½·ln((1−εₜ)/εₜ)
4. Cập nhật trọng số mẫu:
     Sai  → wᵢ × exp(+αₜ)   (TĂNG mạnh → vòng sau chú ý)
     Đúng → wᵢ × exp(−αₜ)   (giảm)
   → normalize để Σwᵢ = 1
Kết quả: H(x) = sign( Σ αₜ·hₜ(x) )
```

## 🔢 Phân tích trọng số model αₜ = ½·ln((1−ε)/ε)
| ε (error) | α | Nghĩa |
|-----------|---|-------|
| → 0 (gần hoàn hảo) | → +∞ | tin tưởng tuyệt đối |
| = 0.5 (random) | 0 | bỏ qua (vô dụng) |
| > 0.5 (tệ hơn random) | < 0 | **đảo ngược** dự đoán |

→ Model càng tốt (ε thấp) → α càng lớn → **đóng góp nhiều hơn** vào tổng. AdaBoost **tự chọn α**, không cần tune learning rate.

## ✅ Ưu / ❌ Nhược
| ✅ Ưu | ❌ Nhược |
|------|---------|
| Ít hyperparameter (chỉ T + base learner) | **Nhạy noise & outlier** — mẫu nhiễu bị tăng weight mãi |
| Tự chọn α, không cần tune learning rate | Chỉ **exponential loss** → kém linh hoạt |
| Dễ implement, lý thuyết vững (Gödel Prize 2003) | Sequential → chậm hơn RF (không song song) |
| Hoạt động với BẤT KỲ weak learner | Thường **kém XGBoost** trên tabular |

## 🐍 sklearn
```python
from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
ada = AdaBoostClassifier(
    estimator=DecisionTreeClassifier(max_depth=1),  # stump
    n_estimators=100, learning_rate=0.1, random_state=42)
ada.fit(X_train, y_train)
```

## ⚠️ Lỗi thường gặp / Điều dễ nhầm
- **Data nhiều noise/outlier → AdaBoost hỏng:** weight mẫu nhiễu tăng vô hạn → model bám lỗi. Data bẩn → ưu tiên RF hoặc Gradient Boosting (robust loss).
- Nhầm AdaBoost (reweight **mẫu**) với Gradient Boosting (fit **residual**) — xem [[xgboost]].
- Base learner quá yếu → cần rất nhiều vòng mới hội tụ.

---

## 🔗 Liên kết
- **Tiền đề:** [[ensemble-learning]] · [[decision-tree]] (stump) · [[bias-variance]]
- **Dẫn tới:** Gradient Boosting → [[xgboost]] (tổng quát hóa: fit residual cho mọi loss)
- **So với:** [[random-forest]] (bagging, song song, giảm variance)

## ❓ Câu hỏi mở
- Vì sao exponential loss làm AdaBoost nhạy outlier hơn log loss?
- SAMME vs SAMME.R khác nhau thế nào trong sklearn?

## 📚 Nguồn
- Slide môn học — TS. Cao Tiến Dũng (`L7_Ensemble.pdf`).
- Freund & Schapire (1996) — "A Decision-Theoretic Generalization..."; StatQuest — "AdaBoost".
