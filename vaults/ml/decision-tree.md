---
slug: decision-tree
title: Cây quyết định (Decision Tree)
vault: ml
type: concept
branch: E
order: 1
status: learning
tags: [ml, thuat-toan, supervised, white-box, cart]
prev: [entropy]
next: [hyperparameter-tuning]
sources: [L6_DecisionTree.pdf]
created: 2026-06-14
---

# Cây quyết định (Decision Tree)

> Tóm tắt 1 câu: Một chuỗi câu hỏi **if/else** chia dữ liệu thành các nhánh nhỏ dần, tới khi mỗi nhóm đủ **"thuần"** (cùng nhãn) thì dừng và dự đoán — chọn câu hỏi nào dựa vào việc nó làm các nhánh con **tinh khiết hơn nhiều nhất** (giảm [[entropy]] / Gini).

**Ngày tạo:** 2026-06-14
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E (Thuật toán & Mô hình) · #1 ← cần [[entropy]] · → kế tiếp [[hyperparameter-tuning]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #ml #thuat-toan #supervised #white-box #cart
**Nguồn slide:** `L6_DecisionTree.pdf` — TS. Cao Tiến Dũng

---

## 💡 Ý chính
- Giống chơi **"20 câu hỏi"** hoặc sơ đồ chẩn đoán: mỗi nút hỏi 1 đặc trưng → rẽ nhánh → hỏi tiếp → tới **lá** thì kết luận.
- Ví dụ: "Thu nhập > 10tr?" → có → "Đã có nhà?" → không → *cho vay*.
- Mục tiêu: chia sao cho mỗi nhánh càng **tinh khiết** càng tốt (toàn 1 nhãn).
- ⭐ **Hiểu cây = hiểu nền tảng của cả họ Ensemble** ([[random-forest]], Gradient Boosting, [[xgboost]], LightGBM). Đây là lý do đáng học kỹ.

## 🆚 Vì sao học cây? (so với hồi quy tuyến tính / logistic)
| Đặc điểm | Linear / [[logistic-regression]] | **Decision Tree** |
|----------|----------------------------------|-------------------|
| Giải thích | hệ số β (khó hình dung) | **luật If-Then trực quan** (white-box) |
| Feature scaling | **bắt buộc** | **không cần** ([[chuan-hoa-du-lieu]]) |
| Quan hệ phi tuyến | bị giới hạn | **xử lý tốt tự nhiên** |
| Tương tác feature | phải tạo thủ công | **tự động học** |
| Overfitting | ít hơn | **dễ overfit — cần kiểm soát** |

## ⚙️ Cách xây cây (thuật toán CART — Classification And Regression Trees)
```
Tại mỗi node:
1. Duyệt MỌI đặc trưng × MỌI ngưỡng chia
2. Chọn split làm GIẢM độ không-thuần nhiều nhất  → Information Gain lớn nhất
3. Chia thành 2 nhánh (trái: điều kiện đúng, phải: điều kiện sai)
4. Lặp lại ĐỆ QUY trên mỗi nhánh
5. Dừng khi: node thuần (Gini=0) / đạt max_depth / số mẫu < min_samples_split
```
- **Tham lam (greedy):** chọn tốt nhất **tại mỗi bước**, không tối ưu toàn cục → không đảm bảo cây tối ưu nhất.

## 🔢 Đo độ không-thuần: Gini & Entropy
Hai thước đo "node này lộn xộn cỡ nào" (p_i = tỉ lệ lớp i trong node):

$$\text{Gini}(t) = 1 - \sum_{i=1}^{C} p_i^2 \qquad\qquad \text{Entropy}(t) = -\sum_{i=1}^{C} p_i \log_2(p_i)$$

| Thước đo | Min (thuần) | Max (50/50) | sklearn | Đặc điểm |
|----------|-------------|-------------|---------|----------|
| **Gini** | 0.0 | **0.5** | `criterion='gini'` (mặc định) | nhanh (không cần log) |
| **Entropy** | 0.0 bit | **1.0 bit** | `criterion='entropy'` | nhạy hơn khi phân phối lệch |

**Information Gain** = thước đo để chọn split tốt nhất:
$$\text{Gain} = \text{Impurity}(\text{parent}) - \sum_k \frac{n_k}{n}\,\text{Impurity}(\text{child}_k)$$
→ Chọn (feature, ngưỡng) có **Gain LỚN NHẤT**. (Thường 2 thước đo cho cùng 1 lựa chọn split.)

## ⚖️ Gini vs Entropy — chọn cái nào?
> Thực tế: 2 thước đo chỉ **bất đồng ~2% số split** (Raileanu & Stoffel) → chọn cái nào cũng ra cây gần như y hệt. Khác biệt thật là **tốc độ vs diễn giải**, không phải độ chính xác.

| | **Gini** = 1 − Σpᵢ² | **Entropy** = −Σpᵢlog₂pᵢ |
|--|---------------------|--------------------------|
| Ý nghĩa | xác suất **phân loại SAI** nếu gán nhãn theo tỉ lệ node | **lượng thông tin** (bit) |
| Tính toán | chỉ bình phương → **nhanh** | có log → chậm hơn |
| Độ nhạy | "phẳng" hơn | "nhọn" hơn → phạt mạnh hơn khi lệch |
| Thuật toán gốc | **CART** | **ID3 / C4.5** |
| sklearn | `criterion='gini'` (mặc định) | `criterion='entropy'` / `'log_loss'` |

**Quy tắc thực dụng:**
1. **Mặc định / data lớn / ensemble** (RF, [[xgboost]] — train hàng trăm cây) → **Gini** (không cần log → nhanh hơn, cùng kết quả).
2. **Lớp thiểu số quan trọng / cần diễn giải "information gain" / data nhỏ** → **Entropy** (nhạy hơn với phân phối lệch).
3. **Không chắc → để CV tự chọn:** đưa cả hai vào lưới `criterion: ['gini','entropy']` → [[hyperparameter-tuning]].

## ✍️ Tính tay — 10 bệnh nhân (Root: 4 High, 6 Low)
**Root:** Gini = 1−(0.4²+0.6²) = **0.480** · Entropy = **0.971 bit**

Thử split **"Hút thuốc = Yes?"**:
| Nhánh | n | Phân bố | Gini | Entropy |
|-------|---|---------|------|---------|
| YES | 4 | 3H 1L | 1−(0.75²+0.25²)=**0.375** | 0.811 |
| NO | 6 | 1H 5L | 1−(0.167²+0.833²)=**0.278** | 0.650 |

- Weighted Gini = 4/10·0.375 + 6/10·0.278 = **0.317** → **Gini Gain = 0.480 − 0.317 = 0.163**
- Weighted Entropy = 0.714 → **Info Gain = 0.971 − 0.714 = 0.257**
- So sánh: split "BMI > 30?" cho Gini Gain ≈ 0.130 → **chọn "Hút thuốc=Yes?"** (gain cao hơn). ✅

## 📏 Khi feature là SỐ — cách chọn ngưỡng chia
1. **Sắp xếp** giá trị: `[22, 24, 25, 27, 28, 29, 31, 32, 33, 35]`
2. Thử **mọi midpoint** giữa 2 giá trị liên tiếp → `23, 24.5, 26, …, 34` (**n−1 ngưỡng ứng viên**)
3. Tính Gain cho từng ngưỡng → chọn ngưỡng Gain lớn nhất (vd best = BMI>32.5, Gini Gain 0.180)
- ⚠️ **Cardinality bias:** feature liên tục có NHIỀU ngưỡng hơn feature nhị phân → dễ được cây ưu tiên một cách không công bằng.
- 💲 Chi phí: ~O(n·log n × p) mỗi node (sort × số feature).

## 🌲 Phân loại vs Hồi quy
| Loại cây | Dự đoán | Tiêu chí chia |
|----------|---------|---------------|
| **Classification** | nhãn (lớp) | Gini / Entropy |
| **Regression** | số liên tục | giảm phương sai / MSE ([[phuong-sai]]); lá = trung bình |

## ⚠️ Overfitting — điểm yếu chí mạng của cây đơn
Cây để mọc tự do (`max_depth=None`) → **học thuộc lòng** cả nhiễu (thực nghiệm điển hình):

| Cấu hình | Train Acc | Test Acc | Số lá |
|----------|-----------|----------|-------|
| depth=None | **1.000** ⚠️ | 0.728 | 287 |
| depth=3 | 0.794 | 0.754 | 8 |
| **depth=5** | 0.819 | **0.765** ✅ | 26 |

- `depth=None`: Train=100% nhưng Test=72.8% → học vẹt, không tổng quát hoá ([[overfitting]]).
- Tăng `max_depth` = đi từ **High Bias (underfit)** → tối ưu → **High Variance (overfit)** ([[bias-variance]]). Có 1 điểm vàng (vd depth=5).

## 🎛️ Hyperparameter kiểm soát overfitting
| Tham số | Ý nghĩa | Tăng → | Giảm → | Khuyến nghị |
|---------|---------|--------|--------|-------------|
| `max_depth` | số tầng tối đa | underfit | overfit | thử **3–6** |
| `min_samples_leaf` | số mẫu tối thiểu ở lá | underfit | overfit | thử **10–50** (=1 → overfit mạnh) |
| `min_samples_split` | số mẫu tối thiểu để chia | underfit | overfit | mặc định 2 |
| `max_leaf_nodes` | số lá tối đa | underfit | overfit | thay thế max_depth |
| `ccp_alpha` | hệ số cắt tỉa (cost-complexity pruning) | cây đơn giản | cây đầy đủ | tìm qua CV |

> 🧭 **Chiến lược thực hành:** ① `max_depth=3` → ② tăng dần, vẽ train/test → ③ dừng khi test bắt đầu giảm → ④ `GridSearchCV` tinh chỉnh → xem [[hyperparameter-tuning]].

## 🛡️ Chống overfit — tuyến phòng thủ
- **Cắt tỉa (pruning):** giới hạn `max_depth` / `min_samples_leaf` / `ccp_alpha` ở trên.
- ⭐ **Gộp nhiều cây (ensemble)** → mạnh & ổn định hơn hẳn cây đơn:
  - **[[random-forest]]** (nhiều cây ngẫu nhiên, lấy vote — bagging).
  - **Gradient Boosting / [[xgboost]]** (cây nối tiếp sửa lỗi nhau — boosting).
- **Đánh giá tin cậy:** đo bằng [[cross-validation]] (K-Fold), không tin 1 lần chia.

## ⚠️ Lỗi thường gặp / Điều dễ nhầm
> 🚫 **"Cây không cần *scale*" ✅ — nhưng "cây không cần *xử lý dữ liệu*" ❌.**
> Cây chỉ miễn cho bạn **1 bước** (scaling/chuẩn hoá), vì chia theo ngưỡng/thứ tự → bất biến với biến đổi đơn điệu; cũng ít nhạy outlier & skew ở feature X. Nhưng vẫn **bắt buộc**: encode categorical ([[encode-categorical]] — sklearn chỉ nhận số), xử lý NaN ([[xu-ly-du-lieu-thieu]] — sklearn cũ sẽ lỗi), mất cân bằng lớp ([[class-imbalance]] — cây vẫn thiên lớp đa số), làm sạch, và chia chống rò rỉ. Nhớ **kim chỉ nam 90/10** ([[dinh-huong-hoc]]): đổi sang cây không đổi được bản chất "90% là xử lý dữ liệu".
> Và "đã build được cây thì khỏi xử lý" hiểu sai: tiền xử lý không biến mất — nó **đóng băng thành pipeline** phải áp dụng **y hệt** lên dữ liệu mới lúc dự đoán (cùng cột one-hot, cùng chiến lược impute đã `fit` trên train).

- Để cây mọc **không giới hạn** → overfit gần như chắc chắn (Train=100% là cờ đỏ).
- **Không ổn định:** đổi chút dữ liệu → cây có thể khác hẳn → nên dùng rừng cho bài khó.
- Quên **cardinality bias**: feature nhiều giá trị (ID, liên tục) dễ được ưu tiên giả tạo.
- Dữ liệu **mất cân bằng lớp** → cây thiên về lớp đa số → [[class-imbalance]] (`class_weight`, [[lay-mau]]).

---

## 🔗 Liên kết
- **Tiền đề (cần biết trước):** [[entropy]] · [[phuong-sai]] (cây hồi quy)
- **Liên quan tới:** [[overfitting]] · [[bias-variance]] (max_depth tradeoff) · [[chuan-hoa-du-lieu]] (không cần scale) · [[cross-validation]] (đo tin cậy)
- **Dẫn tới (học tiếp):** [[hyperparameter-tuning]] (GridSearch/curves) · [[random-forest]] · [[xgboost]] · [[feature-selection]] (tree importance)

## ❓ Câu hỏi mở
- Vì sao gộp nhiều cây (rừng) lại ổn định hơn một cây?

## 📚 Nguồn
- 💻 Demo thực hành: `D:\MSA-FPT\Machine learning\code-practice\decision-tree-tuning-practice.ipynb` (Gini tính tay · overfit · bias-variance · learning/validation curve · K-Fold/Stratified · Grid/RandomSearch).
- Slide môn học — TS. Cao Tiến Dũng (`L6_DecisionTree.pdf`).
- StatQuest — "Decision Trees" & "Random Forests".
- scikit-learn — `DecisionTreeClassifier`, `DecisionTreeRegressor`.
- Tham khảo cách tính tay (CART/ID3): xem `D:\MSA-FPT\Machine learning\slide\ref-tree.md`.
