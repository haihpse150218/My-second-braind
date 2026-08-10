---
slug: hinh-thai-hoc
title: Hình thái học ảnh
vault: ivp
type: concept
branch: F
order: 1
status: learning
tags: [ivp, hinh-thai]
prev: [wiener-filter]
next: [phan-tu-cau-truc]
related: [lan-can-va-lien-thong, nguong-hoa]
sources: ["L8 — Morphological Image Processing"]
created: 2026-08-10
---

# Hình thái học ảnh

> Tóm tắt 1 câu: xử lý ảnh dựa trên **hình dạng** chứ không dựa trên giá trị pixel — ảnh được coi là một **tập hợp**, và mọi phép toán là phép toán tập hợp.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh F · #1 ← cần [[wiener-filter]] · → kế tiếp [[phan-tu-cau-truc]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #hinh-thai

---

## 💡 Ý chính

Đổi cách nhìn: ảnh nhị phân **không phải ma trận số** mà là **tập các toạ độ có giá trị 1**.

$$
A = \{(x,y) \mid f(x,y) = 1\}
$$

Khi đó mọi phép toán tập hợp đều dùng được: hợp `∪`, giao `∩`, phần bù `Aᶜ`, hiệu `A−B`, **tịnh tiến** `A_z`, **phản chiếu** `Â`.

**Toàn bộ nhánh này xây trên hai phép nguyên thuỷ:**

| Phép | Ký hiệu | Tác dụng |
|---|---|---|
| **Giãn nở** (dilation) | `A ⊕ B` | Vật **to ra** |
| **Co hẹp** (erosion) | `A ⊖ B` | Vật **nhỏ lại** |

Mọi phép còn lại — opening, closing, gradient, top-hat, trích biên, skeleton — đều là **tổ hợp của hai phép này**. Đó là điều đáng nhớ nhất về nhánh F.

## 🧩 Vì sao cần một họ phép toán riêng

Bộ lọc tuyến tính ở nhánh E trả lời câu hỏi *"pixel này nên sáng bao nhiêu?"*. Hình thái học trả lời câu hỏi khác hẳn: ***"hình dạng này có vừa vặn vào chỗ đó không?"***

Nhờ vậy nó làm được những việc mà tích chập không làm được:

| Việc | Vì sao lọc tuyến tính bó tay |
|---|---|
| Xoá đốm nhiễu **nhỏ hơn kích thước X** mà giữ nguyên vật lớn | Lọc tuyến tính làm mờ theo cường độ, không theo kích thước |
| **Nối** hai nét đứt cách nhau ≤ 3 pixel | Không có khái niệm "khoảng cách hình học" |
| **Đếm** số vật thể | Cần liên thông, xem [[lan-can-va-lien-thong]] |
| Trích **xương** (skeleton) của hình | Thuần tuý hình học |

## ⚙️ Quy ước và điều kiện đầu vào

- **Đầu vào chuẩn là ảnh nhị phân** — thường lấy từ [[nguong-hoa]]. Nên hình thái học gần như luôn đứng **ngay sau** bước phân đoạn trong pipeline [[he-thi-giac-may]].
- ⚠️ **Vật thể là phần TRẮNG (giá trị 1), nền là ĐEN.** Nếu ảnh của bạn là chữ đen trên nền trắng thì phải [[anh-am-ban|đảo âm bản]] trước, không thì dilation và erosion tác dụng **ngược hoàn toàn**.
- Có bản mở rộng cho **ảnh xám** (grayscale morphology): dilation thành lấy **max** trong cửa sổ, erosion thành lấy **min** — cùng tinh thần, dùng được cho [[top-hat]] mà không cần nhị phân hoá.

## ⚠️ Điều dễ nhầm

- **Hình thái học không phải lọc nhiễu tổng quát.** Nó xoá được đốm nhiễu **theo kích thước và hình dạng**; nhiễu Gaussian rải đều thì nó không giải quyết được — đó là việc của [[loc-lam-min]].
- **Phi tuyến** → không có định lý tích chập, không tăng tốc bằng FFT, không gộp được nhiều bước thành một kernel.
- **Kết quả phụ thuộc hoàn toàn vào [[phan-tu-cau-truc]].** Cùng một ảnh, đổi hình dạng phần tử cấu trúc là ra kết quả khác hẳn — nó không phải tham số phụ mà là **thiết kế chính**.

---

## 🔗 Liên kết
- **Tiền đề:** [[wiener-filter]] · [[nguong-hoa]] · [[lan-can-va-lien-thong]]
- **Dẫn tới:** [[phan-tu-cau-truc]] · [[gian-no-va-co-hep]]
- **Liên quan:** [[phep-logic-va-roi]] · [[anh-am-ban]]

## ❓ Câu hỏi mở
- Hình thái học có tương đương phi tuyến của "định lý tích chập" không?

## 📚 Nguồn
- Lecture 8 — Morphological Image Processing
