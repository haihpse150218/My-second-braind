---
slug: mo-hinh-suy-hao
title: Mô hình suy hao ảnh
vault: ivp
type: concept
branch: E
order: 5
status: learning
tags: [ivp, phuc-hoi]
prev: [lam-sac-net]
next: [nhieu-anh]
related: [loc-nguoc, wiener-filter]
sources: ["L7 — Image Restoration"]
created: 2026-08-10
---

# Mô hình suy hao ảnh

> Tóm tắt 1 câu: `g = f∗h + n` — **một phương trình gói gọn cả Lecture 7**, và mọi phương pháp phục hồi ảnh chỉ là những cách khác nhau để giải ngược nó.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #5 ← cần [[lam-sac-net]] · → kế tiếp [[nhieu-anh]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #phuc-hoi

---

## 💡 Ý chính

**Miền không gian:**
$$
g(x,y) = f(x,y) * h(x,y) + n(x,y)
$$

**Miền tần số** (nhờ [[dinh-ly-tich-chap]], tích chập thành phép nhân):
$$
G(u,v) = F(u,v)\,H(u,v) + N(u,v)
$$

| Ký hiệu | Là gì | Ta có nó không? |
|---|---|---|
| `f` | Ảnh **gốc lý tưởng** | ❌ — đây là thứ cần tìm |
| `h` | **Hàm gây mờ** (PSF — point spread function) | ⚠️ đôi khi ước lượng được |
| `n` | **Nhiễu cộng** | ⚠️ chỉ biết đặc tính thống kê |
| `g` | Ảnh **quan sát được** | ✅ — thứ duy nhất chắc chắn có |

**Bài toán:** biết `g`, tìm `f`. Đây là bài toán **ngược** (inverse problem), và nó **đặt không chỉnh** (ill-posed) — nhiều `f` khác nhau cho ra cùng `g`.

## 🧩 Vì sao viết được thành công thức này

Mờ do chuyển động hay lệch tiêu cự đều là hệ **tuyến tính bất biến tịnh tiến**: mỗi điểm sáng trong cảnh biến thành một **vệt** giống nhau trên ảnh (chính là `h`), và các vệt cộng chồng lên nhau. Cộng chồng các bản dịch của cùng một hàm — đó đúng là định nghĩa **tích chập**.

Ví dụ dễ hình dung: chụp một ngôi sao (điểm sáng lý tưởng) mà rung tay theo phương ngang → ảnh ra một **vạch ngang**. Vạch đó **chính là `h`**. Cả bức ảnh bị mờ vì mọi điểm đều bị bôi thành vạch như thế.

Còn `n` cộng vào **sau** khi mờ, vì nhiễu sinh ở cảm biến/mạch điện — tức là **sau** khâu quang học. Thứ tự này quan trọng: nếu nhiễu bị mờ cùng ảnh thì bài toán đã dễ hơn nhiều.

## ⚙️ Phục hồi vs Tăng cường — phân biệt cốt lõi

| | **Tăng cường** (Enhancement) | **Phục hồi** (Restoration) |
|---|---|---|
| Mục tiêu | Ảnh **trông đẹp hơn** | Ảnh **gần bản gốc hơn** |
| Tiêu chí | **Chủ quan** — mắt người khen | **Khách quan** — đo được (MSE, PSNR) |
| Cần gì | Không cần mô hình | **Bắt buộc** có mô hình suy hao |
| Ví dụ | [[can-bang-histogram]], [[lam-sac-net]] | [[loc-nguoc]], [[wiener-filter]] |

Đây là lý do L6 và L7 là hai lecture riêng dù cùng "làm ảnh tốt hơn": L6 không cần biết ảnh hỏng thế nào, L7 thì **phải** biết.

## ⚙️ Ba tình huống, ba lời giải

| Biết gì | Bài toán | Cách giải |
|---|---|---|
| `h = δ` (không mờ), chỉ có `n` | **Khử nhiễu** | Lọc không gian: [[loc-lam-min]], [[loc-trung-vi]] |
| Biết `h`, `n ≈ 0` | **Khử mờ** thuần | [[loc-nguoc]] `F = G/H` |
| Biết `h`, có cả `n` | Thực tế nhất | [[wiener-filter]] |
| **Không biết `h`** | Blind deconvolution | Ước lượng đồng thời `f` và `h` — khó nhất |

## ⚠️ Điều dễ nhầm

- **Mô hình này giả định nhiễu là cộng và độc lập với ảnh.** Nhiễu Poisson (đếm photon) thì **phụ thuộc cường độ** — vùng sáng nhiễu nhiều hơn. Mô hình `g = f∗h + n` khi đó chỉ là xấp xỉ.
- **`h` phải bất biến toàn ảnh.** Ảnh có vật chuyển động riêng lẻ thì mỗi vùng một `h` khác nhau → không dùng công thức này cho cả ảnh được.
- **Biết `h` chính xác vẫn không giải được sạch** khi có nhiễu — đây không phải hạn chế kỹ thuật mà là tính chất toán học của bài toán ngược. Xem [[loc-nguoc]].

---

## 🔗 Liên kết
- **Tiền đề:** [[lam-sac-net]] · [[tich-chap-2d]]
- **Dẫn tới:** [[nhieu-anh]] · [[loc-nguoc]] · [[wiener-filter]]
- **Liên quan:** [[dinh-ly-tich-chap]] · [[fourier-2d]]

## ❓ Câu hỏi mở
- Mạng học sâu khử mờ không cần biết `h` — chúng đang ngầm học `h` hay học thẳng ánh xạ `g → f`?

## 📚 Nguồn
- Lecture 7 — Image Restoration
