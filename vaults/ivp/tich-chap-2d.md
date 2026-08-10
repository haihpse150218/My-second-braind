---
slug: tich-chap-2d
title: Tích chập 2D
vault: ivp
type: concept
branch: E
order: 1
status: learning
tags: [ivp, loc, nen-tang]
prev: [dac-ta-histogram]
next: [loc-lam-min]
related: [dinh-ly-tich-chap, bien-doi-diem]
sources: ["L6 — Gray-Level Transformations, Histogram, Neighborhood"]
created: 2026-08-10
---

# Tích chập 2D

> Tóm tắt 1 câu: trượt một **kernel nhỏ** khắp ảnh, mỗi vị trí lấy tổng có trọng số của vùng lân cận — **một phép toán duy nhất** sinh ra làm mờ, làm nét, dò biên, và cả CNN.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #1 ← cần [[dac-ta-histogram]] · → kế tiếp [[loc-lam-min]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #loc #nen-tang

---

## 💡 Ý chính

$$
g(x,y) = \sum_{s=-a}^{a}\sum_{t=-b}^{b} w(s,t)\, f(x+s,\, y+t)
$$

| Ký hiệu | Ý nghĩa |
|---|---|
| `w` | **Kernel** (mask, filter) — ma trận nhỏ, thường `3×3` hoặc `5×5` |
| `f` | Ảnh vào |
| `g` | Ảnh ra |

Quy trình cho **mỗi** pixel: đặt kernel tâm vào pixel đó → nhân từng ô kernel với pixel dưới nó → cộng tất cả → ghi vào ảnh ra.

**Đây là phép toán trung tâm của cả môn.** Đổi nội dung `w` là đổi hoàn toàn tác dụng:

| Kernel | Cho ra |
|---|---|
| Toàn `1/9` | Làm mờ — [[loc-lam-min]] |
| Tâm dương lớn, xung quanh âm | Làm sắc nét — [[lam-sac-net]] |
| `[−1 0 1]` theo một trục | Dò biên — [[dao-ham-bac-1-anh]] |

## 🧩 Vì sao "chỉ nhìn hàng xóm" lại đủ mạnh

[[bien-doi-diem]] không làm mờ được vì nó không biết pixel bên cạnh có giá trị gì. Tích chập là bước nhảy về khả năng: nó cho phép **so sánh một pixel với lân cận của nó** — mà mọi thứ đáng quan tâm trong ảnh (cạnh, texture, nhiễu, chi tiết) đều là **quan hệ giữa các pixel kề nhau**.

Cách hiểu thứ hai, sâu hơn: kernel là một **mẫu (pattern)**, và tích chập chính là **đo độ khớp** giữa mẫu đó với từng vùng ảnh. Kernel Sobel ngang khớp mạnh ở nơi có cạnh dọc → ra giá trị lớn. Từ đây đến "học ra kernel nào khớp với mắt mèo" chỉ là một bước, và đó chính là CNN.

## ⚠️ Ba chi tiết kỹ thuật phải nhớ

**1. Tổng hệ số quyết định độ sáng.**

| Tổng `w` | Ảnh ra |
|---|---|
| `= 1` | Giữ nguyên độ sáng trung bình → kernel làm mờ, làm nét |
| `= 0` | Vùng phẳng ra **0**, chỉ chỗ có biến thiên mới khác 0 → kernel dò biên |
| Khác | Ảnh sáng lên hoặc tối đi ngoài ý muốn |

**2. Xử lý biên.** Kernel ở mép ảnh thò ra ngoài. Bốn cách: bỏ mép (ảnh nhỏ đi), đệm 0 (viền tối giả), lặp pixel mép, hoặc phản chiếu. **Phản chiếu** thường tự nhiên nhất. Chọn sai thì có viền lạ quanh ảnh.

**3. Tích chập ≠ tương quan.** Tích chập đúng nghĩa toán học phải **lật kernel 180°** trước. Với kernel đối xứng (Gaussian, trung bình) thì không khác gì; với kernel bất đối xứng (Sobel) thì **đổi dấu kết quả**. Phần lớn thư viện xử lý ảnh thực chất làm **tương quan chéo** và vẫn gọi là convolution — kể cả các framework học sâu.

## ⚙️ Tính chất đáng khai thác

- **Khả tách (separable).** Kernel Gaussian `5×5` tách được thành hai kernel `1×5` và `5×1`. Chi phí giảm từ `25` xuống `10` phép nhân mỗi pixel — với kernel lớn thì tiết kiệm rất đáng kể.
- **Tích chập trong không gian = nhân trong miền tần số.** Đây là [[dinh-ly-tich-chap]], và là lý do kernel lớn nên làm bằng FFT.
- **Tuyến tính và bất biến tịnh tiến** → là một hệ LTI. Toàn bộ lý thuyết bên `dsp` áp dụng được nguyên vẹn.

## ⚠️ Điều dễ nhầm

- **Kernel càng lớn càng chậm** theo `k²`. Muốn mờ mạnh thì dùng Gaussian tách được hoặc lặp kernel nhỏ nhiều lần, đừng nhảy lên `31×31`.
- **Tích chập là phép tuyến tính** → không làm được [[loc-trung-vi]]. Trung vị không viết được dưới dạng tổng có trọng số, đó là lý do nó thuộc họ khác hẳn.
- Phải tính ở `double` vì kernel dò biên cho **giá trị âm**, xem [[kieu-du-lieu-anh]].

---

## 🔗 Liên kết
- **Tiền đề:** [[bien-doi-diem]] · [[dac-ta-histogram]]
- **Dẫn tới:** [[loc-lam-min]] · [[lam-sac-net]] · [[dao-ham-bac-1-anh]]
- **Liên quan:** [[dinh-ly-tich-chap]] · [[loc-tan-so]]
- **Liên môn:** [[dl/phep-tich-chap]] · [[dl/vi-sao-can-cnn]] — **cùng một phép toán**; khác biệt duy nhất là ai quyết định `w`: con người thiết kế (ở đây) hay dữ liệu học ra (CNN).

## ❓ Câu hỏi mở
- Kernel nào là "khả tách"? Có điều kiện toán học gọn để nhận biết không?

## 📚 Nguồn
- Lecture 6 — Gray-Level Transformations, Histogram, Neighborhood
