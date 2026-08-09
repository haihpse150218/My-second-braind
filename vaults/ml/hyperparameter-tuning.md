---
slug: hyperparameter-tuning
title: Tinh chỉnh siêu tham số (Hyperparameter Tuning)
vault: ml
type: concept
branch: E
order: 2
status: learning
tags: [ml, danh-gia, cross-validation, lop-lam, tuning]
prev: [cross-validation, bias-variance]
sources: [L6_DecisionTree.pdf]
created: 2026-06-28
---

# Tinh chỉnh siêu tham số (Hyperparameter Tuning)

> Tóm tắt 1 câu: Sau khi chọn mô hình, ta phải **tìm bộ siêu tham số tốt nhất một cách khoa học** — thử nhiều bộ, chấm điểm mỗi bộ bằng [[cross-validation]] (không phải 1 lần chia), rồi chọn bộ điểm cao nhất; dùng **đường cong** (learning / validation curve) để nhìn ra bias-variance và điểm dừng tối ưu.

**Ngày tạo:** 2026-06-28
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E (Thuật toán & Mô hình) · #2 · sau [[decision-tree]] ← cần [[cross-validation]] · [[bias-variance]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #ml #danh-gia #cross-validation #lop-lam #tuning
**Nguồn slide:** `L6_DecisionTree.pdf` — TS. Cao Tiến Dũng

---

## 💡 Ý chính
- **Tham số (parameters)** = cái model **tự học** từ dữ liệu (vd hệ số β, ngưỡng chia của cây).
- **Siêu tham số (hyperparameters)** = cái **bạn đặt TRƯỚC khi train**, model không tự học (vd `max_depth`, `min_samples_leaf`, `λ` regularization, `K` của k-means).
- Tuning = đi tìm bộ siêu tham số cho mô hình **tổng quát hoá tốt nhất** — đo bằng **CV mean ± std**, không phải điểm train (sẽ thiên về overfit) cũng không phải 1 lần chia test (may rủi).
- ⚠️ **Không chạm tập Test trong lúc tuning.** Test chỉ dùng **1 lần cuối**. Tuning dựa trên CV (trên train) hoặc tập validation riêng → tránh [[overfitting]] vào test.

## 🔍 Grid Search vs Random Search
| Tiêu chí | **GridSearchCV** | **RandomizedSearchCV** |
|----------|------------------|------------------------|
| Cách thử | **TẤT CẢ** tổ hợp trong lưới | **NGẪU NHIÊN** n tổ hợp (`n_iter`) |
| Ưu | đảm bảo tìm best trong lưới đã định | nhanh, phủ nhiều vùng tham số hơn |
| Nhược | **chậm** khi nhiều tham số (curse of dimensionality) | không đảm bảo tìm best tuyệt đối |
| Khi nào | ≤ 2–3 tham số, ít giá trị mỗi tham số | ≥ 3 tham số, không gian lớn |

**Lưu ý chi phí:** grid `4×4×2 = 32` tổ hợp `× 5-fold = 160 lần fit`. Số lần fit = (số tổ hợp) × K → bùng nổ rất nhanh → đó là lý do Random Search (cố định `n_iter`) thắng khi không gian lớn.

```python
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
from scipy.stats import randint

# ----- GridSearchCV: thử mọi tổ hợp -----
param_grid = {
    'max_depth': [3, 4, 5, 6, 7],
    'min_samples_leaf': [5, 10, 20, 50],
    'criterion': ['gini', 'entropy'],
}  # 5×4×2 = 40 tổ hợp × 5-fold = 200 lần fit
grid = GridSearchCV(DecisionTreeClassifier(random_state=42),
                    param_grid, cv=5, scoring='accuracy', n_jobs=-1)
grid.fit(X_train, y_train)
print(grid.best_params_, grid.best_score_)

# ----- RandomizedSearchCV: lấy mẫu ngẫu nhiên n_iter bộ -----
param_dist = {
    'max_depth': randint(2, 15),
    'min_samples_leaf': randint(1, 60),
    'criterion': ['gini', 'entropy'],
}
rand = RandomizedSearchCV(DecisionTreeClassifier(random_state=42),
                          param_dist, n_iter=50, cv=5,
                          scoring='accuracy', n_jobs=-1)
rand.fit(X_train, y_train)
print(rand.best_params_)
```

## 📈 Learning Curve vs Validation Curve
Hai đường cong khác nhau ở **trục X** — đừng nhầm:

| | **Learning Curve** | **Validation Curve** |
|--|--------------------|----------------------|
| Trục X | **số mẫu train** (tăng dần) | **giá trị 1 siêu tham số** (vd `max_depth`) |
| Đọc gì | dữ liệu đã đủ chưa? | siêu tham số nào tối ưu? |
| Hai đường **hội tụ, cùng cao** | ✅ tốt | — |
| **Khoảng cách lớn** (train≫val) | overfitting (high variance) | vùng bên phải đỉnh = overfit |
| **Cả 2 cùng thấp** | underfitting (high bias) → thêm dữ liệu vô ích | vùng bên trái = underfit |
| Quyết định | thêm dữ liệu có giúp không | **chọn điểm validation cao nhất TRƯỚC khi giảm** |

→ Validation Curve chính là cách "nhìn thấy" [[bias-variance]] tradeoff theo độ phức tạp (vd best `max_depth=5`).

### 📈 Learning Curve — "đủ DATA chưa?" (đọc bệnh → hành động)
```
Score
1.0 |•__                                  Train: ít mẫu fit dễ (cao) → thêm mẫu → giảm
    |   ‾•──•───•────•─────•
    |          ┌──────────────── hội tụ
    |       __/          Validation: ít mẫu → tổng quát kém (thấp) → thêm mẫu → tăng
0.5 | _/
    |/
    └────────────────────────────→ số mẫu train (10% … 100%)
```
| Dấu hiệu (ở 100% data) | Bệnh | → Hành động |
|------------------------|------|-------------|
| 2 đường **hội tụ + CAO** | ✅ khỏe | giữ nguyên |
| **Khoảng cách LỚN** (train≫val, val còn dốc lên) | overfit (high variance) | **THÊM DỮ LIỆU** giúp được · hoặc giảm độ phức tạp / regularize |
| **Cả 2 THẤP** (hội tụ thấp, phẳng) | underfit (high bias) | thêm data **VÔ ÍCH** → model phức tạp hơn / feature tốt hơn |

### 🎚️ Validation Curve — "chỉnh NÚM tới đâu?" (đọc bệnh → hành động)
```
Score
1.0 |                         __•──•   Train: càng phức tạp càng fit train tốt → leo tới 1.0
    |                   __•--‾
    |        •--‾•‾‾‾•__
    |    •--‾  ↑       ‾‾•--•__        Validation: ∩ NGƯỢC (lên → đỉnh → xuống)
    |  •‾   ĐỈNH=5          ‾‾•--•
    └────────────────────────────→ max_depth
     1    3    5    7    9     15
     └underfit┘ │ └───overfit───┘
            điểm vàng
```
| Vùng | Bệnh | → Hành động |
|------|------|-------------|
| **Trái đỉnh** (cả 2 thấp) | underfit (high bias) | tăng độ phức tạp (depth ↑) |
| **Tại đỉnh validation** | ✅ điểm vàng | **chọn giá trị này** (vd `max_depth=5`) |
| **Phải đỉnh** (train leo, val tụt, gap giãn) | overfit (high variance) | giảm độ phức tạp / siết tham số |
> ⚠️ Bám **đường VALIDATION** để chọn — đường **Train luôn leo = bẫy** (đừng theo); **Test** chỉ chấm 1 lần cuối.
> 🔑 **Learning = trục SỐ MẪU → "đủ data chưa?" · Validation = trục SIÊU THAM SỐ → "chỉnh tới đâu?"** — cả hai chẩn bệnh qua khoảng cách Train–Validation.

```python
from sklearn.model_selection import validation_curve
import numpy as np

param_range = np.arange(1, 16)
train_scores, val_scores = validation_curve(
    DecisionTreeClassifier(random_state=42), X, y,
    param_name='max_depth', param_range=param_range,
    cv=5, scoring='accuracy')
best_d = param_range[np.argmax(val_scores.mean(axis=1))]   # đỉnh đường validation
```

## 🧭 Quy trình thực hành (workflow chuẩn)
> Hai thứ đóng hai vai: **kiến thức cơ bản (prior) khoanh KHÔNG GIAN** tìm · **chiến lược sắp THỨ TỰ** tìm (quét thô rẻ → tinh chỉnh đắt).
```
① Bắt đầu đơn giản: max_depth=3 (hoặc model mặc định)
② Vẽ VALIDATION CURVE trên tham số quan trọng nhất (vd max_depth)
③ Chọn ĐỈNH đường validation (vùng ngay trước khi nó giảm = bắt đầu overfit)
④ GridSearch/RandomSearch QUANH vùng đỉnh + thêm tham số khác (min_samples_leaf, criterion), chấm bằng CV
⑤ Đo Test 1 lần duy nhất → báo cáo
```
> ⚠️ **Đính chính cái bẫy phổ biến:** bước ②③ phải nhìn điểm **VALIDATION** (CV trên train, hoặc 1 fold validation riêng) — **KHÔNG** phải tập **Test**. "Dừng khi *Test* giảm" = chọn tham số dựa trên Test → Test thành "train trá hình" → điểm cuối **ảo (lạc quan giả)**. Test chỉ chấm **1 lần cuối**.
> 🔑 Nhớ gọn: **prior khoanh vùng · curve định hướng · CV chấm điểm · Test chỉ chấm 1 lần cuối.**

## 🪜 Có "chuẩn" nào không? — không phải thử-sai mù
Tuning là bài **tối ưu hộp đen** (không có nghiệm đóng) — nhưng có cả chuẩn quy trình lẫn thuật toán search thông minh, theo thang từ "ngu" → "khôn":

| Cấp | Phương pháp | Ý tưởng | Công cụ |
|-----|-------------|---------|---------|
| 1 | **Grid Search** | thử mọi tổ hợp (vét cạn) — kém thông minh nhất, chỉ hợp ≤2–3 tham số | `GridSearchCV` |
| 2 | **Random Search** | lấy mẫu ngẫu nhiên — **thắng Grid khi ít tham số thực sự quan trọng** (Bergstra & Bengio 2012) | `RandomizedSearchCV` |
| 3 | **Successive Halving / Hyperband** | cấp ít ngân sách cho nhiều cấu hình → **loại sớm cái tệ**, dồn tài nguyên cho cái sống sót | `HalvingGridSearchCV`, `HalvingRandomSearchCV` |
| 4 | **Bayesian Optimization** ⭐ | xây mô hình xác suất *điểm ↔ tham số* → chọn điểm thử kế tiếp **thông minh** (khai thác/khám phá) → ít lần fit hơn nhiều | **Optuna**, Hyperopt, `skopt` |
| 5 | **AutoML** | tự động hoá cả chọn model + tune | FLAML, auto-sklearn |

**Nguyên tắc thu hẹp (để khỏi mò mù):**
- **Khởi đầu bằng khoảng khuyến nghị** (vd cây: `max_depth 3–6`, `min_samples_leaf 10–50`) — không bắt đầu từ số 0.
- **Ưu tiên tham số ảnh hưởng mạnh** (cây: `max_depth`, `min_samples_leaf` ≫ `min_samples_split`; boosting: `learning_rate × n_estimators`) → mò 2–3 chiều, không phải 10 chiều.
- **Coarse-to-fine:** lưới thô tìm vùng → lưới mịn quanh vùng tốt.
- Không gian lớn / tuning đắt → **Random/Halving/Bayesian** thay cho Grid.

## ⚠️ Lỗi thường gặp / Điều dễ nhầm
- **Tuning trên tập Test** → Test thành "train trá hình" → điểm ảo. Dùng CV trên train hoặc validation riêng.
- **Leakage trong CV:** fit scaler/imputer ([[chuan-hoa-du-lieu]]) trên toàn bộ rồi mới chia fold → nên bọc trong `Pipeline` để fit lại trong từng fold.
- **Lưới quá to** → `số tổ hợp × K` bùng nổ. Khởi đầu thô (coarse) rồi mới mịn (fine) quanh vùng tốt; hoặc Random Search.
- **Nhầm 2 đường cong:** Learning = trục số mẫu; Validation = trục giá trị siêu tham số.
- **Chỉ nhìn `mean`, bỏ `std`:** bộ tham số CV cao nhưng std lớn → kém ổn định; cân nhắc bộ ổn định hơn.

---

## 🔗 Liên kết
- **Tiền đề (cần biết trước):** [[cross-validation]] (cách chấm điểm mỗi bộ) · [[bias-variance]] (đọc đường cong) · [[overfitting]]
- **Liên quan tới:** [[decision-tree]] (ví dụ tune `max_depth`) · [[regularization]] (tune `λ`) · [[chon-mo-hinh]]
- **Dẫn tới (học tiếp):** [[random-forest]] · [[xgboost]] (cùng quy trình tune, nhiều siêu tham số hơn)

## ❓ Câu hỏi mở
- Nested CV: vì sao cần để ước lượng hiệu năng *không thiên lệch* khi vừa tune vừa đánh giá?

## 📚 Nguồn
- 💻 Demo thực hành: `D:\MSA-FPT\Machine learning\code-practice\decision-tree-tuning-practice.ipynb` (learning/validation curve · K-Fold/Stratified · GridSearchCV vs RandomizedSearchCV chạy thật).
- Slide môn học — TS. Cao Tiến Dũng (`L6_DecisionTree.pdf`).
- scikit-learn — `GridSearchCV`, `RandomizedSearchCV`, `validation_curve`, `learning_curve`.
