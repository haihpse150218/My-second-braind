---
slug: khoang-cach-pixel
title: Khoảng cách pixel — Euclid · D4 · D8
vault: ivp
type: concept
branch: A
order: 7
status: learning
tags: [ivp, topo]
prev: [lan-can-va-lien-thong]
next: [cam-bien-anh]
related: [watershed, hinh-thai-hoc]
sources: ["L2 — Image Processing Basics"]
created: 2026-08-10
---

# Khoảng cách pixel — Euclid · D4 · D8

> Tóm tắt 1 câu: ba cách đo "xa gần" giữa hai pixel, và mỗi cách vẽ ra một **hình tròn** khác nhau — tròn, hình thoi, hay hình vuông.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #7 ← cần [[lan-can-va-lien-thong]] · → kế tiếp [[cam-bien-anh]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #topo

---

## 💡 Ý chính

Với hai pixel `p=(x,y)` và `q=(s,t)`, đặt `Δx = |x−s|`, `Δy = |y−t|`:

| Khoảng cách | Công thức | "Hình tròn" bán kính 1 trông như |
|---|---|---|
| **Euclid** `D_e` | $\sqrt{\Delta x^2 + \Delta y^2}$ | **hình tròn** thật |
| **D4** (city-block) | $\Delta x + \Delta y$ | **hình thoi** ◇ |
| **D8** (chessboard) | $\max(\Delta x, \Delta y)$ | **hình vuông** □ |

Tên gọi nói hết bản chất:
- **City-block** — đi trong phố ô bàn cờ, chỉ được rẽ ngang/dọc, không xuyên nhà. Số ô phải đi = `Δx + Δy`.
- **Chessboard** — quân **vua** trên bàn cờ đi được cả chéo, mỗi nước 1 ô. Số nước = `max(Δx, Δy)`.

## 🧩 Trực giác

Từ `(0,0)` tới `(3,4)`:

| | Giá trị | Vì sao |
|---|---|---|
| `D_e` | **5,0** | đường chim bay |
| `D4` | **7** | 3 bước ngang + 4 bước dọc |
| `D8` | **4** | 3 bước chéo (ăn cả ngang lẫn dọc) + 1 bước dọc |

`D8 ≤ D_e ≤ D4` **luôn đúng** — đi chéo là đường tắt, cấm chéo là đường vòng.

## ⚙️ Khi nào dùng cái nào

- **Euclid** khi cần **đúng về hình học**: đo kích thước vật thật, so khớp hình dạng. Nhược điểm: có căn bậc hai → chậm, kết quả không nguyên.
- **D4 / D8** khi cần **nhanh và nguyên**: chỉ có cộng và so sánh, tính được bằng quét ảnh 2 lượt.
- **Distance transform** (mỗi pixel ← khoảng cách tới pixel nền gần nhất) là đầu vào bắt buộc của [[watershed]] để tách vật dính nhau.
- Hình dạng phần tử cấu trúc trong [[hinh-thai-hoc]] chính là một quả cầu theo các metric này: `disk` ↔ Euclid, `diamond` ↔ D4, `square` ↔ D8.

## ⚠️ Điều dễ nhầm

- **D8 rẻ nhưng méo.** Vì đi chéo cũng tính là 1, vật tròn đo bằng D8 sẽ ra "vuông". Đo đường kính hạt gạo bằng D8 là sai lệch có hệ thống.
- Ba hàm này đều là **metric hợp lệ** (không âm, đối xứng, thoả bất đẳng thức tam giác) — nên dùng cái nào cũng "đúng toán", chỉ khác ở chỗ **hình học nào bị bóp méo**.
- D4 ứng với lân cận 4, D8 ứng với lân cận 8 — nhớ giữ nhất quán với [[lan-can-va-lien-thong]] đã chọn ở bước trước, đổi giữa chừng là kết quả không so sánh được.

---

## 🔗 Liên kết
- **Tiền đề:** [[lan-can-va-lien-thong]]
- **Dẫn tới:** [[cam-bien-anh]] · [[watershed]]
- **Liên quan:** [[hinh-thai-hoc]]
- **Liên môn:** [[ml/k-means]] — cùng bài học: đổi hàm khoảng cách là đổi luôn hình dạng cụm mà thuật toán ưu tiên tìm ra.

## ❓ Câu hỏi mở
- Có metric nào xấp xỉ Euclid tốt hơn D4/D8 mà vẫn chỉ dùng số nguyên không?

## 📚 Nguồn
- Lecture 2 — Image Processing Basics
