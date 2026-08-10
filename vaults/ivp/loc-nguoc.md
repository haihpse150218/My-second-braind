---
slug: loc-nguoc
title: Lọc ngược (inverse filtering)
vault: ivp
type: concept
branch: E
order: 12
status: learning
tags: [ivp, phuc-hoi]
prev: [loc-tan-so]
next: [wiener-filter]
related: [mo-hinh-suy-hao, wiener-filter]
sources: ["L7 — Image Restoration"]
created: 2026-08-10
---

# Lọc ngược (inverse filtering)

> Tóm tắt 1 câu: `F = G/H` — lời giải hiển nhiên cho bài toán khử mờ, và nó **nổ tung** ngay khi có một chút nhiễu.

**Ngày tạo:** 2026-08-10
**Trạng thái:** 🟡 Đang học
**📖 Lộ trình:** Nhánh E · #12 ← cần [[loc-tan-so]] · → kế tiếp [[wiener-filter]]
**Chủ đề cha:** [[SECOND_BRAIN_IVP]]
**Tags:** #ivp #phuc-hoi

---

## 💡 Ý chính

Từ [[mo-hinh-suy-hao]] không nhiễu: `G = F·H` → chia hai vế:

$$
\hat{F}(u,v) = \frac{G(u,v)}{H(u,v)}
$$

Trên giấy là xong. Trong thực tế **gần như không bao giờ dùng được**, và hiểu vì sao mới là giá trị của note này.

## ⚠️ Vì sao nó hỏng

Ảnh thật luôn có nhiễu, nên `G = F·H + N`. Thay vào:

$$
\hat{F} = \frac{F H + N}{H} = F + \frac{N}{H}
$$

Số hạng đầu là ảnh gốc — đúng như mong muốn. Vấn đề nằm ở số hạng thứ hai:

> 🚨 **`H(u,v)` rất nhỏ ở tần số cao** (bản chất của mọi hàm gây mờ: nó *xoá* tần số cao). Mà nhiễu `N` thì **không nhỏ đi** ở tần số cao. Chia một số bình thường cho một số gần `0` → **`N/H` nổ ra vô cùng**.

Kết quả: ảnh phục hồi bị **nhiễu nuốt chửng hoàn toàn** — thường trông như nhiễu thuần tuý, không còn nhận ra cảnh gốc. Và nghịch lý: **ảnh càng mờ nhiều thì `H` càng nhỏ, lọc ngược càng hỏng nặng.**

Chỗ nào `H(u,v) = 0` thì còn tệ hơn — chia cho 0, thông tin ở tần số đó **đã bị xoá vĩnh viễn**, không phép toán nào lấy lại.

## ⚙️ Cách vá tạm

| Cách | Làm gì | Hạn chế |
|---|---|---|
| **Chia có ràng buộc** | Chỉ chia khi `\|H\| > ngưỡng`, còn lại đặt `Ĥ = 0` hoặc giữ `G` | Phải chỉnh ngưỡng bằng tay |
| **Giới hạn bán kính** | Chỉ lọc ngược trong vùng `D < D₀` quanh tâm phổ | Mất chi tiết tần số cao |
| **Kết hợp thông thấp** | Lọc ngược rồi lọc thông thấp để dập nhiễu nổ | Vừa khử mờ vừa làm mờ lại — mâu thuẫn |

Tất cả đều là chắp vá. Lời giải đúng đắn là đưa **thống kê nhiễu vào chính công thức**, và đó là [[wiener-filter]].

## 🧩 Bài học tổng quát

Đây là một minh hoạ rất sạch của **bài toán ngược đặt không chỉnh** (ill-posed inverse problem):

- Phép **thuận** (làm mờ) là ánh xạ **trơn, ổn định** — nhiễu nhỏ ở đầu vào cho sai lệch nhỏ ở đầu ra.
- Phép **ngược** thì **không ổn định** — nhiễu nhỏ ở `g` gây sai lệch **khổng lồ** ở `f̂`.

Đảo ngược một phép làm mất thông tin thì luôn cần **thông tin bổ sung** để bù. Wiener bổ sung bằng **tỉ số tín hiệu/nhiễu**; các phương pháp hiện đại bổ sung bằng **tiên nghiệm về ảnh tự nhiên** (ảnh thật thì trơn từng mảng, không phải nhiễu trắng); mạng học sâu bổ sung bằng **hàng triệu ảnh đã học**.

Cùng một bài học xuất hiện ở [[../../projects/image-super-resolution|📦 image-super-resolution]]: phóng to ảnh cũng là bài toán ngược, và cũng chỉ giải được khi có tiên nghiệm.

## ⚠️ Điều dễ nhầm

- **Lọc ngược ≠ làm sắc nét.** [[lam-sac-net]] chỉ tăng tương phản cạnh, không cần biết `h`; lọc ngược cố **đảo ngược đúng phép suy hao**, cần biết `h` chính xác.
- **Biết `h` sai một chút là hỏng.** Ước lượng lệch chiều dài vệt mờ vài pixel là kết quả đầy artifact.
- **Không bao giờ dùng lọc ngược trần trên ảnh thật.** Nó là bước lý thuyết để dẫn tới Wiener, không phải công cụ thực hành.

---

## 🔗 Liên kết
- **Tiền đề:** [[mo-hinh-suy-hao]] · [[loc-tan-so]]
- **Dẫn tới:** [[wiener-filter]]
- **Liên quan:** [[dinh-ly-tich-chap]] · [[nhieu-anh]]

## ❓ Câu hỏi mở
- Nếu `H(u,v) = 0` ở một số tần số thì thông tin đó mất hẳn — vậy mạng học sâu "khôi phục" chúng bằng cách nào nếu không phải bịa?

## 📚 Nguồn
- Lecture 7 — Image Restoration
