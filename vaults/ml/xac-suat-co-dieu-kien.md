---
slug: xac-suat-co-dieu-kien
title: Xác suất có điều kiện
vault: ml
type: concept
branch: C
order: 2
status: learning
tags: [toan, xac-suat, nen-tang]
prev: [xac-suat]
next: [phan-phoi-xac-suat]
related: [dinh-ly-bayes, naive-bayes]
created: 2026-08-10
---

# Xác suất có điều kiện

> Tóm tắt 1 câu: xác suất của A **khi đã biết** B xảy ra — biết thêm thông tin thì niềm tin phải cập nhật, và đó chính là việc mà mọi model học có giám sát đang làm.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh C (Xác suất → Thống kê) · #2 ← cần [[xac-suat]] · → kế tiếp [[phan-phoi-xac-suat]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #xac-suat #nen-tang

---

## 💡 Ý chính

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \qquad P(B) > 0
$$

Đọc: "xác suất của A **cho trước** B".

**Trực giác:** biết B xảy ra tức là **thu hẹp không gian mẫu** — giờ chỉ còn xét những trường hợp trong B. Mẫu số `P(B)` là để chuẩn hoá lại cho tổng bằng 1 trong thế giới đã thu hẹp đó.

**Ví dụ:** tung 2 xúc xắc, tổng bằng 8. Xác suất có một con là 5?
- Không điều kiện: `P(có con 5) = 11/36`.
- Biết tổng = 8 → chỉ còn 5 trường hợp `{(2,6),(3,5),(4,4),(5,3),(6,2)}`, trong đó 2 trường hợp có con 5 → `P = 2/5`.

Cùng một câu hỏi, **thông tin thêm làm đổi hẳn câu trả lời**.

## ⚙️ Vì sao đây là note nền của cả nhánh C

**Machine learning có giám sát chính là ước lượng một xác suất có điều kiện:**

$$
P(y \mid \mathbf{x})
$$

*"Cho trước đặc trưng `x`, xác suất nhãn là `y` bằng bao nhiêu?"*

| Model | Ước lượng `P(y|x)` bằng cách |
|---|---|
| [[logistic-regression]] | Sigmoid của tổ hợp tuyến tính |
| [[softmax]] | Chuẩn hoá K logit |
| [[naive-bayes]] | Đảo ngược qua [[dinh-ly-bayes]] |
| [[decision-tree]] | Tỉ lệ lớp trong lá |

Nhìn theo góc này thì **mọi bộ phân loại xác suất là cùng một bài toán**, chỉ khác cách mô hình hoá.

## 🔢 Ba công thức phái sinh

**Quy tắc nhân:**
$$
P(A \cap B) = P(A \mid B)\,P(B)
$$

**Độc lập** — trường hợp đặc biệt quan trọng:
$$
A \perp B \iff P(A \mid B) = P(A) \iff P(A \cap B) = P(A)P(B)
$$
Biết B **không nói gì thêm** về A. Giả định độc lập (thường sai nhưng hữu ích) là toàn bộ chữ "Naive" trong [[naive-bayes]].

**Xác suất toàn phần:**
$$
P(A) = \sum_i P(A \mid B_i)P(B_i)
$$
Chia bài toán theo các trường hợp rồi cộng lại — mẫu số của [[dinh-ly-bayes]] chính là công thức này.

## ⚠️ Điều dễ nhầm

- 🚨 **`P(A|B) ≠ P(B|A)`.** Đây là nhầm lẫn nguy hiểm nhất, gọi là **ngộ nhận tỉ lệ nghịch đảo**. `P(dương tính | có bệnh) = 99%` **không** nghĩa là `P(có bệnh | dương tính) = 99%` — nếu bệnh hiếm thì con số thứ hai có thể chỉ vài phần trăm. Chuyển giữa hai chiều **bắt buộc** phải qua [[dinh-ly-bayes]].
- **Điều kiện có thể làm xác suất tăng HOẶC giảm.** Không có quy luật chung.
- **Tương quan ≠ nhân quả.** `P(A|B) ≠ P(A)` chỉ nói A và B **liên quan**, không nói B **gây ra** A. Xem [[tuong-quan]].
- **Nghịch lý Simpson:** một xu hướng đúng trong mọi nhóm con có thể **đảo ngược** khi gộp dữ liệu lại. Điều kiện hoá theo biến khác nhau cho kết luận khác nhau — lý do phải cẩn thận khi gộp nhóm trong phân tích.

---

## 🔗 Liên kết
- **Tiền đề:** [[xac-suat]]
- **Dẫn tới:** [[dinh-ly-bayes]] · [[phan-phoi-xac-suat]] · [[naive-bayes]]
- **Liên quan:** [[logistic-regression]] · [[tuong-quan]] · [[suy-dien-hoc-may]]

## ❓ Câu hỏi mở
- Nghịch lý Simpson: khi gộp và khi tách cho kết luận ngược nhau, cái nào đúng? Dựa vào đâu để quyết định?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Xác suất
