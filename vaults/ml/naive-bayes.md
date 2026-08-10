---
slug: naive-bayes
title: Naive Bayes
vault: ml
type: concept
branch: E
order: 15
status: learning
tags: [thuat-toan, phan-loai, xac-suat]
prev: [metric-hoi-quy]
next: [knn]
related: [dinh-ly-bayes, xac-suat-co-dieu-kien]
created: 2026-08-10
---

# Naive Bayes

> Tóm tắt 1 câu: áp [[dinh-ly-bayes]] cộng giả định **các đặc trưng độc lập** — giả định gần như luôn sai, nhưng model vẫn chạy tốt bất ngờ.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E (Thuật toán & Mô hình) · #15 ← cần [[metric-hoi-quy]] · → kế tiếp [[knn]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #thuat-toan #phan-loai #xac-suat

---

## 💡 Ý chính

Cần `P(lớp | đặc trưng)` nhưng dữ liệu chỉ cho `P(đặc trưng | lớp)`. Đảo chiều bằng [[dinh-ly-bayes]]:

$$
P(y \mid x_1,\ldots,x_n) = \frac{P(y)\,P(x_1,\ldots,x_n \mid y)}{P(x_1,\ldots,x_n)}
$$

**Vấn đề:** ước lượng `P(x₁,...,xₙ | y)` cần đếm **mọi tổ hợp** đặc trưng — với 20 đặc trưng nhị phân là hơn một triệu tổ hợp cho **mỗi** lớp. Không dataset nào đủ.

**Giả định "naive":** các đặc trưng **độc lập** khi đã biết lớp →
$$
P(x_1,\ldots,x_n \mid y) = \prod_i P(x_i \mid y)
$$

Bài toán từ "đếm tổ hợp" (bất khả thi) thành "đếm từng đặc trưng riêng" (dễ). Bỏ mẫu số (hằng số với mọi lớp):

$$
\hat{y} = \arg\max_y \; P(y)\prod_i P(x_i \mid y)
$$

## 🧩 Ví dụ: lọc spam

Email chứa "khuyến mãi", "miễn phí", "click":

$$
P(\text{spam}\mid \text{email}) \propto P(\text{spam})\cdot P(\text{"khuyến mãi"}\mid\text{spam})\cdot P(\text{"miễn phí"}\mid\text{spam})\cdots
$$

Mỗi `P(từ | spam)` chỉ là **đếm tần suất** từ đó trong tập email spam. Train xong trong một lượt duyệt dữ liệu.

## ⚠️ Giả định độc lập gần như luôn SAI

Trong email spam, "miễn phí" và "khuyến mãi" **rất hay đi cùng nhau** — chúng không độc lập chút nào. Naive Bayes **đếm bằng chứng đó hai lần**.

**Vậy vì sao vẫn chạy tốt?** Vì để phân loại đúng, model **không cần xác suất chính xác** — nó chỉ cần **xếp đúng thứ tự** giữa các lớp. Xác suất tính ra có thể lệch nhiều (thường bị đẩy về gần 0 hoặc 1), nhưng lớp thắng thường vẫn là lớp đúng.

> 📌 **Bài học rộng hơn:** một model có giả định sai vẫn có thể hữu ích, miễn là sai lệch đó **không làm đảo thứ hạng** giữa các lớp. "Đúng về xác suất" và "đúng về phân loại" là hai tiêu chuẩn khác nhau.

## ⚙️ Ba biến thể

| Biến thể | Giả định về `P(xᵢ|y)` | Dùng cho |
|---|---|---|
| **Multinomial** | Phân phối đa thức (đếm) | ⭐ Văn bản — đếm từ |
| **Bernoulli** | Nhị phân có/không | Văn bản — chỉ quan tâm từ xuất hiện hay không |
| **Gaussian** | Phân phối chuẩn | Đặc trưng **liên tục** |

## ⚙️ Làm mượt Laplace — bắt buộc

Nếu một từ **chưa từng xuất hiện** trong lớp spam thì `P(từ | spam) = 0` → **cả tích bằng 0**, bất kể các từ khác thuyết phục tới đâu. Một từ lạ xoá sạch mọi bằng chứng.

**Sửa:** cộng thêm `α` (thường `= 1`) vào mọi phép đếm:
$$
P(x_i \mid y) = \frac{\text{count}(x_i, y) + \alpha}{\text{count}(y) + \alpha \cdot |V|}
$$

Đây không phải tuỳ chọn mà là **bắt buộc** trong mọi cài đặt thực tế.

**Mẹo thứ hai:** tính bằng **log** (`log Σ` thay vì `Π`) để tránh tràn số dưới — nhân hàng nghìn số nhỏ hơn 1 sẽ về 0 trong dấu phẩy động.

## ⚙️ Khi nào dùng

| ✅ Hợp | ❌ Không hợp |
|---|---|
| Phân loại văn bản, lọc spam | Đặc trưng tương quan mạnh với nhau |
| **Dữ liệu ít** — cần ít mẫu để ước lượng | Cần **xác suất được hiệu chỉnh tốt** |
| Cần **baseline nhanh** — train một lượt duyệt | Quan hệ phi tuyến phức tạp |
| Nhiều chiều (văn bản) | |

Rất đáng làm **baseline đầu tiên** cho bài toán văn bản: nhanh, không siêu tham số, và nếu model phức tạp không thắng được nó thì đó là dấu hiệu có gì đó sai.

## ⚠️ Điều dễ nhầm

- **Xác suất Naive Bayes xuất ra không đáng tin.** Nó hay cho `0,9999` một cách quá tự tin. Muốn dùng xác suất để ra quyết định thì phải **hiệu chỉnh** (Platt scaling, isotonic).
- **"Naive" nói về giả định độc lập, không nói thuật toán đơn giản.**
- **Không có ranh giới quyết định tuyến tính hiển nhiên** — nhưng Gaussian NB với phương sai chung thực ra **tương đương** một bộ phân loại tuyến tính.

---

## 🔗 Liên kết
- **Tiền đề:** [[dinh-ly-bayes]] · [[xac-suat-co-dieu-kien]] · [[phan-phoi-xac-suat]]
- **Dẫn tới:** [[knn]] · [[chon-mo-hinh]]
- **Liên quan:** [[logistic-regression]] · [[danh-gia-mo-hinh]]
- **Liên môn:** [[dl/tf-idf]] · [[dl/one-hot-bag-of-words]] — cùng biểu diễn văn bản dạng đếm từ.

## ❓ Câu hỏi mở
- Naive Bayes cho xác suất tệ nhưng phân loại tốt — có cách đo trước xem giả định độc lập bị vi phạm nặng tới mức nào không?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Xác suất (Bayes)
