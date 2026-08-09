---
slug: entropy
title: Entropy (Độ hỗn tạp / bất định)
vault: ml
type: concept
branch: C
order: 15
status: learning
tags: [toan, xac-suat, information-theory, decision-tree]
next: [xac-suat]
created: 2026-06-14
---

# Entropy (Độ hỗn tạp / bất định)

> Tóm tắt 1 câu: Entropy đo **độ hỗn tạp / khó đoán** của dữ liệu — thấp = chắc chắn, dễ đoán; cao = lộn xộn, ngẫu nhiên. Đo bằng **bit**: cần trung bình bao nhiêu bit để diễn tả một kết quả.

**Ngày tạo:** 2026-06-14
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C (Xác suất) · #15 → cầu sang cây quyết định ← cần [[xac-suat]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #xac-suat #information-theory #decision-tree

---

## 💡 Ý chính
- Entropy = mức **"bất ngờ" trung bình** khi quan sát kết quả.
- **Thấp (≈0):** gần như chắc chắn → ít bất ngờ → dễ đoán (vd 99% mặt ngửa).
- **Cao:** mọi kết quả khả năng ngang nhau → khó đoán nhất → "hỗn tạp" nhất.
- Trong ML hay hiểu là **độ "không thuần"** của một nhóm dữ liệu: nhóm toàn 1 nhãn → entropy 0; nhóm trộn đều nhiều nhãn → entropy cao.

## 🎁 Khối nền 1 — "Độ bất ngờ" của 1 kết quả (information content)
> Phải hiểu cái này TRƯỚC thì công thức entropy mới có nghĩa.

- Biến cố **hiếm** xảy ra → **bất ngờ nhiều** (thông tin lớn); biến cố **chắc chắn** → **không bất ngờ** (thông tin 0).
- Cần hàm `I(p)`: xác suất → độ bất ngờ, thoả 3 tính chất:

| # | Tính chất | Ý nghĩa |
|---|-----------|---------|
| 1 | `I(1) = 0` | chắc chắn → không bất ngờ |
| 2 | p nhỏ → `I` lớn | hiếm → sốc |
| 3 | `I(p·q) = I(p) + I(q)` | 2 biến cố **độc lập** → thông tin **cộng dồn** |

→ **Chỉ hàm logarit thoả cả 3** (đặc biệt #3 — biến **nhân thành cộng**). Đây là nguồn gốc của **log** và **dấu trừ** trong entropy:

$$I(p) = \log_2\frac{1}{p} = -\log_2(p)\quad[\text{bit}]$$

| p | I(p) = −log₂p | Nghĩa |
|---|---------------|-------|
| 1 | 0 bit | chắc chắn ✅ |
| 0.5 | 1 bit | như 1 lần tung xu |
| 0.25 | 2 bit | như 2 lần tung xu |
| → 0 | → ∞ | càng hiếm càng sốc |

**Vì sao cơ số 2?** = "cần trung bình bao nhiêu **câu hỏi Yes/No**" để xác định kết quả → đơn vị **bit**.

## 🧮 Khối nền 2 — Entropy = trung bình có trọng số của độ bất ngờ
Entropy = **độ bất ngờ TRUNG BÌNH** khi rút ngẫu nhiên 1 phần tử. Mỗi nhãn đóng góp độ bất ngờ `I(pᵢ)`, **nặng theo tần suất `pᵢ`** của nó:

$$H = \underbrace{\sum_i p_i}_{\text{trọng số}}\cdot\underbrace{I(p_i)}_{\text{bất ngờ}} = \sum_i p_i(-\log_2 p_i) = -\sum_i p_i\log_2 p_i$$

> 🔑 **Đọc thành lời:** "mỗi nhãn → nhân *tần suất* với *độ bất ngờ* của nó → cộng tất cả." Dấu `−` chỉ để ra số dương.
> ⚠️ **Quy ước:** `0·log₂0 := 0` (kết quả không bao giờ xảy ra → không đóng góp) → nhờ vậy nhóm thuần có H = 0 chứ không vô định.

## 🔢 Công thức

$$H = -\sum_i p_i \cdot \log_2(p_i) \quad [\,\text{bit}\,]$$

| Ký hiệu | Ý nghĩa |
|---------|---------|
| $p_i$ | xác suất của kết quả $i$ |
| $\log_2$ | dùng cơ số 2 → đơn vị **bit** |
| dấu $-$ | để $H \ge 0$ (vì log của số $<1$ là âm) |

## 📏 Thang đo (làm rõ ý của bạn)
| Tình huống | Entropy | Nghĩa |
|------------|---------|-------|
| 1 kết quả chắc chắn (p=1) | **0 bit** | Chắc chắn, không bất ngờ |
| Nhị phân 50/50 (2 kết quả) | **1 bit** | Khó đoán nhất khi có **2** lựa chọn |
| 4 kết quả đều nhau (mỗi cái 0.25) | **2 bit** | Khó đoán nhất khi có **4** lựa chọn = rất ngẫu nhiên |

> ❗ Làm rõ: "tối đa" **phụ thuộc số kết quả**: $H_{\max} = \log_2(n)$ khi mọi kết quả đều như nhau.
> - 2 kết quả → max 1 bit; 4 kết quả → max 2 bit; 8 kết quả → max 3 bit.
> - Nên "1 = 50/50" đúng cho **biến nhị phân**; "2 = hoàn toàn ngẫu nhiên" đúng cho **4 nhóm**.

**Kiểm chứng nhanh:**

- **50/50:** $H = -(0.5\cdot\log_2 0.5 + 0.5\cdot\log_2 0.5) = -(0.5\cdot(-1)+0.5\cdot(-1)) = 1$ bit ✅
- **Chắc chắn:** $H = -(1\cdot\log_2 1) = 0$ ✅
- **4 đều:** $H = -4\cdot(0.25\cdot\log_2 0.25) = -4\cdot(0.25\cdot(-2)) = 2$ bit ✅

## ⚙️ Ứng dụng trong ML
- **Cây quyết định (Decision Tree)** — ứng dụng chính:
  - Mỗi lần chia, chọn cột làm **giảm entropy nhiều nhất** → các nhánh "thuần" hơn.
  - Mức giảm đó gọi là **Information Gain** = entropy trước − entropy sau khi chia.
  - (Có lựa chọn thay thế nhẹ hơn: **Gini impurity**.)
- **Cross-entropy loss** — đo phân phối **dự đoán** lệch bao nhiêu so với **thật**; tối thiểu hóa nó = huấn luyện phân loại → [[loss-function]] · [[xac-suat]].

## ⚠️ Lỗi thường gặp / Điều dễ nhầm
- **Đơn vị tùy cơ số log:** $\log_2 \to$ bit; $\ln \to$ nat; $\log_{10} \to$ dit. Cùng ý nghĩa, khác đơn vị.
- **Entropy cao không "xấu" tự thân** — chỉ nói "khó đoán"; với cây quyết định ta *muốn giảm* nó, nhưng dữ liệu đa dạng (entropy cao) chưa chắc tệ.
- Lẫn entropy (bất định của 1 phân phối) với cross-entropy (lệch giữa 2 phân phối).

---

## 🔗 Liên kết
- **Tiền đề (cần biết trước):** [[xac-suat]] · [[phan-phoi-xac-suat]]
- **Dẫn tới (ứng dụng):** [[decision-tree]] (information gain) · [[loss-function]] (cross-entropy)
- **Liên quan:** [[thong-ke]]

## ❓ Câu hỏi mở
- Information Gain và Gini impurity khác nhau thế nào khi xây cây?
- Vì sao cross-entropy là loss tự nhiên cho bài toán phân loại?

## 📚 Nguồn
- StatQuest — "Entropy (for Decision Trees)".
- Shannon — A Mathematical Theory of Communication (1948).
