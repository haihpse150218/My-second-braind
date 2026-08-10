---
slug: ham-so
title: Hàm số — cỗ máy biến đầu vào thành đầu ra
vault: ml
type: concept
branch: A
order: 2
status: learning
tags: [toan, giai-tich, nen-tang]
prev: [giai-tich]
next: [gioi-han]
related: [dao-ham]
created: 2026-08-10
---

# Hàm số — cỗ máy biến đầu vào thành đầu ra

> Tóm tắt 1 câu: hàm số là một **quy tắc gán**: mỗi đầu vào cho **đúng một** đầu ra — và toàn bộ Machine Learning chỉ là bài toán **đi tìm quy tắc đó**.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A (Giải tích → Tối ưu) · #2 ← cần [[giai-tich]] · → kế tiếp [[gioi-han]]
**Chủ đề cha:** [[SECOND_BRAIN_ML]] · [[note]]
**Tags:** #toan #giai-tich #nen-tang

---

## 💡 Ý chính

$$
f: X \to Y, \qquad x \mapsto y = f(x)
$$

| Thành phần | Tên | Trong ML là gì |
|---|---|---|
| `X` | **Tập xác định** (domain) | Không gian đặc trưng — mọi đầu vào hợp lệ |
| `Y` | **Tập giá trị** (range) | Không gian nhãn — giá số, hoặc xác suất, hoặc lớp |
| `f` | **Quy tắc** | **Chính là mô hình** |

**Điều kiện bắt buộc:** mỗi `x` chỉ được cho **một** `y`. Một đầu vào cho hai đầu ra khác nhau thì đó không phải hàm.

## 🧩 Vì sao khái niệm này đáng viết riêng

Nói *"học máy = tìm hàm f"* nghe trừu tượng cho tới khi thấy nó cụ thể thế nào:

| Bài toán | `X` (vào) | `Y` (ra) | `f` là |
|---|---|---|---|
| Dự đoán giá nhà | (diện tích, số phòng, vị trí) | Số tiền | [[linear-regression]] |
| Lọc spam | Nội dung email | {spam, không spam} | [[naive-bayes]] |
| Nhận dạng ảnh | Ma trận pixel | 1 trong 1000 lớp | [[../vaults/dl/kien-truc-cnn-4-tang\|CNN]] |

Trong cả ba, `f` **không được cho sẵn** — ta chỉ có một số cặp `(x, y)` và phải **dựng lại `f`** từ đó. Đó là toàn bộ nội dung của [[giai-tich]].

## 🔢 Tham số vs biến — phân biệt quan trọng nhất

$$
f(x) = wx + b
$$

Cùng một biểu thức, đọc theo hai cách hoàn toàn khác nhau:

| Góc nhìn | Biến là | Cố định là | Dùng khi |
|---|---|---|---|
| **Dự đoán** (inference) | `x` | `w`, `b` | Đưa dữ liệu mới vào, model đã train xong |
| **Huấn luyện** (training) | **`w`, `b`** | Dữ liệu `(x,y)` | Đang đi tìm bộ trọng số tốt nhất |

> 📌 **Đây là chỗ dễ rối nhất khi mới học.** Lúc train, ta lấy đạo hàm theo **`w`**, không phải theo `x` — vì `w` mới là thứ đang được điều chỉnh. Hàm bị lấy đạo hàm thực ra là **[[loss-function]]** `L(w)`, một hàm của trọng số.

Xem thêm [[huan-luyen-vs-suy-luan]].

## ⚙️ Vài dạng hàm gặp liên tục trong ML

| Hàm | Công thức | Vai trò |
|---|---|---|
| **Tuyến tính** | `wx + b` | Nền của mọi model tuyến tính |
| **Sigmoid** | `1/(1+e^{-x})` | Ép về `(0,1)` → xác suất, xem [[logistic-regression]] |
| **ReLU** | `max(0, x)` | Kích hoạt phi tuyến trong mạng nơ-ron |
| **Softmax** | `e^{x_i}/Σe^{x_j}` | K logit → K xác suất, xem [[softmax]] |
| **Hợp** (composite) | `f(g(x))` | Mạng nhiều tầng — đạo hàm bằng [[chain-rule]] |

Hàm **hợp** đáng chú ý nhất: một mạng nơ-ron 5 tầng chính là `f₅(f₄(f₃(f₂(f₁(x)))))`. Không có quy tắc đạo hàm hàm hợp thì không huấn luyện được — xem [[chain-rule]].

## ⚠️ Điều dễ nhầm

- **Hàm phi tuyến không phải "hàm khó".** Nó là hàm mà đồ thị không phải đường thẳng. Ghép nhiều tầng tuyến tính vẫn ra tuyến tính — chính vì thế mạng nơ-ron **bắt buộc** phải có hàm kích hoạt phi tuyến ở giữa.
- **`f(x) = wx + b` không phải hàm tuyến tính theo nghĩa toán học chặt** (vì có `b`), mà là **hàm affine**. Trong ML người ta vẫn gọi là tuyến tính, quen rồi.
- **Model là hàm, nhưng không phải hàm nào cũng học được.** Hàm phải "đủ trơn" để lấy đạo hàm — đó là lý do bước nhảy dứt khoát (như hàm ngưỡng) bị thay bằng sigmoid.

---

## 🔗 Liên kết
- **Tiền đề:** [[giai-tich]]
- **Dẫn tới:** [[gioi-han]] · [[dao-ham]]
- **Liên quan:** [[loss-function]] · [[chain-rule]] · [[huan-luyen-vs-suy-luan]]

## ❓ Câu hỏi mở
- Nếu mạng nơ-ron xấp xỉ được **mọi** hàm liên tục (định lý xấp xỉ phổ quát), vì sao vẫn cần thiết kế kiến trúc?

## 📚 Nguồn
- `L1_Math_Overview.pdf` — mảng Giải tích
