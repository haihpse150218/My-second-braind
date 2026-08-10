---
slug: lan-can-va-lien-thong
title: Lân cận & liên thông
vault: ivp
type: concept
branch: A
order: 6
status: learning
tags: [ivp, topo]
prev: [he-thi-giac-may]
next: [khoang-cach-pixel]
related: [thanh-phan-lien-thong, hinh-thai-hoc]
sources: ["L2 — Image Processing Basics"]
created: 2026-08-10
---

# Lân cận & liên thông

> Tóm tắt 1 câu: định nghĩa "pixel nào là hàng xóm của pixel nào" — nền móng của **mọi** phép xử lý vùng, và chọn 4 hay 8 hàng xóm cho ra kết quả khác hẳn nhau.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh A · #6 ← cần [[he-thi-giac-may]] · → kế tiếp [[khoang-cach-pixel]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #topo

---

## 💡 Ý chính

| Khái niệm | Định nghĩa |
|---|---|
| **Lân cận 4** `N₄` | 4 pixel trên · dưới · trái · phải |
| **Lân cận chéo** `N_D` | 4 pixel ở 4 góc chéo |
| **Lân cận 8** `N₈` | `N₄ ∪ N_D` — cả 8 ô bao quanh |
| **Liền kề** (adjacency) | Hai pixel **là lân cận** và **cùng thuộc tập giá trị** đang xét |
| **Đường đi** (path) | Chuỗi pixel liền kề nối liên tiếp |
| **Liên thông** (connectivity) | Tồn tại đường đi giữa hai pixel |
| **Thành phần liên thông** | Tập lớn nhất các pixel liên thông với nhau = **một vật thể** |

## 🧩 Trực giác — vì sao 4 hay 8 lại quan trọng

Xét mẫu nhị phân này (`1` = vật, `0` = nền):

```
1 0
0 1
```

- Theo **`N₄`**: hai số `1` **không** liền kề (chỉ chạm góc) → **2 vật thể riêng**.
- Theo **`N₈`**: chúng liền kề → **1 vật thể duy nhất**.

Cùng một tấm ảnh, đếm ra 2 hay 1 — chỉ vì đổi định nghĩa hàng xóm. Đây là lý do mọi hàm gán nhãn vùng đều bắt bạn khai báo connectivity.

## ⚠️ Nghịch lý liên thông

Đây là chỗ tinh tế: **không thể dùng cùng một loại lân cận cho cả vật lẫn nền.**

Một đường chéo `1` mảnh dùng `N₈` thì liền mạch (đúng ý) — nhưng nền `0` hai bên đường chéo ấy, cũng theo `N₈`, lại **nối được với nhau xuyên qua đường chéo**. Kết quả: một đường liền mạch nhưng không chia đôi được mặt phẳng — vô lý về mặt hình học.

**Cách xử lý chuẩn:** dùng **`N₈` cho vật thể** và **`N₄` cho nền** (hoặc ngược lại). Đây cũng là lý do sinh ra **m-adjacency** (liền kề hỗn hợp) — chỉ tính chéo khi không có đường đi qua `N₄`, để loại bỏ đường đi mơ hồ.

## ⚙️ Khi nào dùng

- **Đếm vật thể** trong ảnh nhị phân → gán nhãn thành phần liên thông. Xem [[thanh-phan-lien-thong]].
- **Region growing** — tiêu chí lan từ seed chính là liền kề + đồng nhất. Xem [[region-growing]].
- Mọi phép [[hinh-thai-hoc]] — hình dạng phần tử cấu trúc thực chất là một định nghĩa lân cận tổng quát hoá.

## ⚠️ Điều dễ nhầm

- **Liền kề đòi hỏi *cùng tập giá trị*, không chỉ cạnh nhau.** Pixel trắng cạnh pixel đen là lân cận nhưng **không** liền kề trong bài toán đếm vật trắng.
- Đổi từ 4 sang 8 nói chung làm **số vật thể giảm** (dính lại) và **số lỗ trong vật giảm**.

---

## 🔗 Liên kết
- **Tiền đề:** [[he-thi-giac-may]]
- **Dẫn tới:** [[khoang-cach-pixel]] · [[thanh-phan-lien-thong]]
- **Liên quan:** [[hinh-thai-hoc]] · [[region-growing]]

## ❓ Câu hỏi mở
- m-adjacency giải quyết được đường đi mơ hồ, nhưng vì sao thư viện thực tế hầu như chỉ cho chọn 4/8?

## 📚 Nguồn
- Lecture 2 — Image Processing Basics
