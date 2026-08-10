---
slug: dinh-ly-tich-chap
title: Định lý tích chập
vault: ivp
type: concept
branch: E
order: 10
status: learning
tags: [ivp, tan-so, nen-tang]
prev: [fourier-2d]
next: [loc-tan-so]
related: [tich-chap-2d, mo-hinh-suy-hao]
sources: ["L2 — Image Processing Basics", "L7 — Image Restoration"]
created: 2026-08-10
---

# Định lý tích chập

> Tóm tắt 1 câu: **tích chập trong không gian = phép nhân trong tần số** — cây cầu nối hai nửa của môn học, và lý do bài toán khử mờ giải được.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #10 ← cần [[fourier-2d]] · → kế tiếp [[loc-tan-so]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #tan-so #nen-tang

---

## 💡 Ý chính

$$
f * h \;\Longleftrightarrow\; F \cdot H
$$
$$
f \cdot h \;\Longleftrightarrow\; F * H
$$

Một phép **khó** (tích chập: trượt, nhân, cộng, `O(k²)` mỗi pixel) đổi thành một phép **dễ** (nhân từng phần tử, `O(1)` mỗi phần tử) — chỉ với cái giá là đi qua FFT và về.

## ⚙️ Ba hệ quả

**1. Tăng tốc.**

| Cách | Chi phí |
|---|---|
| Tích chập trực tiếp | `O(MN · k²)` |
| Qua FFT | `O(MN log MN)` |

Điểm hoà vốn quanh kernel `≈ 15×15`. Kernel `3×3` thì làm trực tiếp nhanh hơn; kernel lớn (làm mờ mạnh, mô phỏng bokeh) thì FFT thắng áp đảo.

**2. Hiểu bộ lọc là gì.** Mọi bộ lọc tuyến tính, nhìn từ miền tần số, chỉ là **nhân phổ ảnh với một mặt nạ**:

| Kernel không gian | `H` trong tần số | Tác dụng |
|---|---|---|
| Trung bình / Gaussian | Lớn ở giữa, nhỏ ở rìa | **Thông thấp** → làm mờ |
| Laplacian / Sobel | Nhỏ ở giữa, lớn ở rìa | **Thông cao** → dò biên, làm nét |

Nhờ vậy [[loc-lam-min]] và [[lam-sac-net]] không còn là hai công thức rời rạc mà là **hai đầu của cùng một trục**.

**3. Giải được bài toán ngược.** Đây là hệ quả quan trọng nhất. [[mo-hinh-suy-hao]] trong miền không gian là `g = f∗h + n` — không có phép "chia tích chập". Sang miền tần số nó thành:

$$
G = F\cdot H + N
$$

Phép **nhân** thì chia được. Đó là toàn bộ lý do [[loc-nguoc]] và [[wiener-filter]] tồn tại.

## ⚠️ Cái bẫy: tích chập vòng

> 🚨 DFT giả định tín hiệu **tuần hoàn**. Nên nhân hai phổ rồi biến đổi ngược cho ra **tích chập VÒNG**, không phải tích chập tuyến tính.

Hệ quả thực tế: phần kernel trượt ra khỏi mép phải sẽ **quấn về mép trái**. Ảnh mờ bằng FFT không đệm sẽ có **viền sáng/tối lạ ở bốn cạnh**.

**Cách chữa:** đệm 0 cho cả ảnh và kernel lên kích thước `≥ M + k − 1` trước khi FFT. Mọi thư viện nghiêm túc đều làm bước này ngầm — tự cài thì phải nhớ.

## ⚠️ Điều dễ nhầm

- **Không phải phép lọc nào cũng có phiên bản tần số.** [[loc-trung-vi]] và mọi bộ lọc thống kê thứ tự là **phi tuyến** → định lý này **không áp dụng**. Chúng bắt buộc làm trong miền không gian.
- **Cắt phổ dứt khoát gây ringing.** Nhân với mặt nạ có cạnh sắc trong miền tần số ⇔ tích chập với hàm sinc (dao động, đuôi dài) trong miền không gian → gợn sóng quanh cạnh. Đây là lý do bộ lọc lý tưởng không dùng được, xem [[loc-tan-so]].
- Chiều ngược lại cũng đúng và cũng hữu ích: **nhân trong không gian = tích chập trong tần số**. Đây chính là cơ sở của việc nhân hàm cửa sổ trước khi FFT.

---

## 🔗 Liên kết
- **Tiền đề:** [[fourier-2d]] · [[tich-chap-2d]]
- **Dẫn tới:** [[loc-tan-so]] · [[loc-nguoc]]
- **Liên quan:** [[mo-hinh-suy-hao]] · [[loc-lam-min]] · [[lam-sac-net]]
- **Liên môn:** `dsp/bo-loc-so` — cùng định lý, là nền của toàn bộ lý thuyết lọc số 1 chiều.

## ❓ Câu hỏi mở
- Điểm hoà vốn `≈15×15` phụ thuộc phần cứng thế nào? Trên GPU thì con số đó dịch về đâu?

## 📚 Nguồn
- Lecture 2 — Image Processing Basics
- Lecture 7 — Image Restoration
